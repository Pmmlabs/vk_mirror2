var PostBox = {

    mrg: function(v) {
        return vk.rtl ? {
            marginRight: v
        } : {
            marginLeft: v
        };
    },
    show: function(opts) {
        wkcur.noClickHide = false;

        cur.lang = extend(cur.lang || {}, opts.lang);
        extend(cur, {
            pbField: ge('pb_text'),
            pbAva: ge('dark_box_ava'),
            pbClubs: opts.clubs,
            pbMyHash: opts.hash,
            pbError: ge('pb_error'),
            pbSent: false,
            pbSaved: ge('pb_saved'),
            pbShown: true
        });

        autosizeSetup(cur.pbField, {
            minHeight: 80
        })
        setTimeout(elfocus.pbind(cur.pbField), 0);

        Wall.initComposer(cur.pbField, {
            lang: {
                introText: getLang('profile_mention_start_typing'),
                noResult: getLang('profile_mention_not_found')
            },
            media: {
                lnk: domFC(ge('pb_add_media')),
                preview: ge('pb_media_preview'),
                types: opts.media,
                options: {
                    limit: 10,
                    toggleLnk: true,
                    editable: 1,
                    sortable: 1,
                    teWidth: 450,
                    teHeight: 260,
                    onAddMediaChange: PostBox.postChanged.pbind(10),
                    onMediaChange: PostBox.postChanged
                }
            },
            checkLen: PostBox.postChanged
        }, function() {
            var draft = opts.draft,
                composer = data(cur.pbField, 'composer'),
                note = cur.pbNoteAdded;
            if (!draft[0] && !draft[1]) return;

            val(cur.pbField, replaceEntities(draft[0] || ''));
            if (!(composer || {}).addMedia) return;
            for (var i in (draft[1] || [])) {
                cur.pbNoDraftSave = 1;
                composer.addMedia.chooseMedia.apply(composer.addMedia, draft[1][i]);
            }
            if (note) {
                cur.pbNoDraftSave = 0;
                composer.addMedia.chooseMedia('note', note.raw, note);
            }
        });

        var tmp = cur.postTo;
        cur.postTo = false;
        wkcur._hide.push(function() {
            cur.pbShown = false;
            if (!cur.pbField) return;
            if (cur.pbAfterPost) {
                cur.pbAfterPost = false;
            } else {
                PostBox.postChanged(true);
            }
            var composer = data(cur.pbField, 'composer');
            if ((composer || {}).addMedia) {
                composer.addMedia.onChange = function() {
                    return false;
                };
            }
            Wall.deinitComposer(cur.pbField);
            delete cur.pbField;
            cur.postTo = tmp;
            if (window.WideDropdown) {
                WideDropdown.deinit('pb_club_dd');
            }
        });
    },
    send: function() {
        if (cur.pbCustomSend) {
            cur.pbCustomSend();
            return;
        }
        if (buttonLocked('pb_send')) return;

        var toClub = isVisible('pb_choose_club'),
            hash = cur.pbMyHash,
            toClubId = 0;
        var dd = cur.wdd && cur.wdd['pb_club_dd'];
        if (toClub) {
            if (!dd || !dd.selCount) {
                return elfocus('pb_club_inp');
            }
            for (var i in dd.selected) {
                toClubId = intval(i.replace(/_$/, ''));
                hash = dd.selected[i][9];
            }
        }
        var composer = cur.pbField && data(cur.pbField, 'composer'),
            params = composer ? Composer.getSendParams(composer, PostBox.send) : {
                message: trim(val(cur.pbField))
            };
        if (toClub) {
            extend(params, {
                to_id: toClubId,
                official: 1,
                signed: isChecked('pb_signed')
            });
        } else {
            extend(params, {
                to_id: vk.id,
                friends_only: isChecked('pb_friends_only'),
                status_export: isChecked('pb_status_export'),
                facebook_export: isChecked('pb_facebook_export')
            });
        }
        if (!params.message && !params.attach1_type) {
            return elfocus(cur.pbField);
        }
        if (params.delayed) {
            return;
        }
        cur.pbSent = true;
        ajax.post('al_wall.php', Wall.fixPostParams(extend(params, {
            act: 'post',
            from: 'postbox',
            hash: hash
        })), {
            onDone: function(text) {
                WkView.hide();
                showDoneBox(text);
            },
            onFail: function(text) {
                cur.pbSent = false;
                if (!text) return;
                val(cur.pbError, text);
                if (!cur.pbErrShown) {
                    show(cur.pbError);
                    cur.pbErrShown = true;
                }
                setTimeout(animate.pbind(cur.pbError, {
                    backgroundColor: '#FCEBA7'
                }, 100, animate.pbind(cur.pbError, {
                    backgroundColor: '#F4EBBD'
                }, 2000)), 0);
                return true;
            },
            showProgress: lockButton.pbind('pb_send'),
            hideProgress: unlockButton.pbind('pb_send')
        });
    },
    postChanged: function(force) {
        if (!cur.pbNoDraftSave) wkcur.noClickHide = true;
        clearTimeout(cur.pbSaveDraftTO);
        if (force === true) {
            PostBox.saveDraft();
        } else {
            cur.pbSaveDraftTO = setTimeout(PostBox.saveDraft, (force === 10) ? 10 : 3000);
        }
        if (cur.pbErrShown) {
            cur.pbErrShown = false;
            hide(cur.pbError);
        }
    },
    saveDraft: function() {
        if (cur.pbDraftDisabled) return;
        if (cur.pbNoDraftSave) {
            cur.pbNoDraftSave = false;
            return;
        }
        if (cur.pbSent || !cur.pbShown) return;
        var composer = cur.pbField && data(cur.pbField, 'composer'),
            params = composer ? Composer.getSendParams(composer, PostBox.postChanged.pbind(10), true) : {
                message: trim(val(cur.pbField))
            };
        if (params.delayed) return;

        ajax.post('al_wall.php', Wall.fixPostParams(extend(params, {
            act: 'save_draft',
            hash: cur.pbMyHash
        })), {
            onDone: function() {
                clearTimeout(cur.pbSavedTO);
                show(cur.pbSaved);
                animate(cur.pbSaved, {
                    opacity: 1
                }, 100);
                cur.pbSavedTO = setTimeout(animate.pbind(cur.pbSaved, {
                    opacity: 0
                }, 1000, hide.pbind(cur.pbSaved)), 3000);
            },
            onFail: function() {
                return true;
            }
        });
    },
    showClubs: function() {
        if (!window.WideDropdown) return;

        hide('pb_choose_club_link', 'pb_user_options');
        show('pb_choose_club', 'pb_cancel_club', 'pb_club_options');
        val('pb_send', getLang('wall_post_box_sendclub'));
        elfocus('pb_club_inp');
        WideDropdown.init('pb_club_dd', {
            defaultItems: cur.pbClubs,
            noResult: getLang('like_club_not_found'),
            img: cur.pbAva,
            introText: getLang('like_club_choose'),
            defImgText: val(cur.pbAva),
            onChange: function(act) {
                var dd = cur.wdd['pb_club_dd'],
                    sel = dd.selCount,
                    peer = false,
                    draft, ret = true;
                if (act == 1) { // added
                    setTimeout(elfocus.pbind(cur.pbField), 0);
                }
                return ret;
            }
        });
        if (cur.pbTo) {
            each(cur.pbClubs, function(k, v) {
                if (v[0] == cur.pbTo) {
                    WideDropdown.select('pb_club_dd', false, v);
                    return false;
                }
            })
        }
        var composer = cur.pbField && data(cur.pbField, 'composer');
        if (composer && composer.addMedia) {
            hide(geByClass1('add_media_type_' + composer.addMedia.lnkId + '_note', composer.addMedia.menu.menuNode, 'a'));
        }
        if (cur.pbErrShown) {
            cur.pbErrShown = false;
            hide(cur.pbError);
        }
    },
    hideClubs: function() {
        show('pb_choose_club_link', 'pb_user_options');
        hide('pb_choose_club', 'pb_cancel_club', 'pb_club_options');
        val('pb_send', getLang('wall_post_box_publish'));
        window.WideDropdown && WideDropdown.deselect('pb_club_dd');
        var composer = cur.pbField && data(cur.pbField, 'composer');
        if (composer && composer.addMedia) {
            show(geByClass1('add_media_type_' + composer.addMedia.lnkId + '_note', composer.addMedia.menu.menuNode, 'a'));
        }
        if (cur.pbErrShown) {
            cur.pbErrShown = false;
            hide(cur.pbError);
        }
    }

};

try {
    stManager.done('postbox.js');
} catch (e) {}