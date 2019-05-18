var ShareBox = {
    radioBtnOptions: {
        WALL: 0,
        COMMUNITY: 1,
        IM: 2
    },
    mrg: function(pixels) {
        return vk.rtl ? {
            marginRight: pixels
        } : {
            marginLeft: pixels
        };
    },
    mediaChange: function() {
        var composer = cur.sbField && data(cur.sbField, 'composer');
        if (composer && composer.addMedia) {
            var v = (radioBtns['like_share'] || {}).val || 0;
            toggle(geByClass1('add_media_type_' + composer.addMedia.lnkId + '_postpone', composer.addMedia.menu.menuNode, 'a'), (v == 1 || v == 0 && cur.sbShareOwn));
        }
    },
    show: function(box, opts) {
        var tmpPostTo = cur.postTo;
        cur.postTo = false;

        cur.shareBoxWidth = 450;

        box.setOptions({
            hideButtons: true,
            grey: true,
            width: cur.shareBoxWidth,
            noRefreshCoords: true,
            bodyStyle: 'padding: 0;'
        });
        box.removeButtons();

        radioBtns['like_share'] = {
            els: [ge('like_share_my'), ge('like_share_club'), ge('like_share_mail')],
            val: opts.rbVal
        };
        each(radioBtns['like_share'].els, function(i, v) {
            var ns = domNS(v);
            if (hasClass(v, 'disabled') && ns) {
                addClass(ns, 'like_share_disabled');
                (geByTag1('input', ns) || {}).readOnly = true;
            }
        });

        cur.shareAction = '';

        cur.lang = extend(cur.lang || {}, opts.lang);
        cur.sbField = ge('like_share_text');
        cur.sbField.getValue = Emoji.val.pbind(cur.sbField);
        extend(cur, {
            sbSettingsBtnEl: ge('like_share_settings_btn'),
            sbFriendsOnlyEl: ge('like_share_friends_only'),
            sbPostCheckboxEl: ge('like_share_post_checkbox'),
            sbAva: ge('like_share_ava'),
            sbTo: [0],
            sbShareHash: opts.shHash,
            sbMailHash: opts.imHash,
            sbObj: opts.shObj,
            sbList: opts.shList || '',
            sbShareOwn: opts.shOwn,
            sbShParam: opts.shParam,
            shNewUi: opts.shNewUi,
            sbSend: function() {
                if (buttonLocked('like_share_send')) return;
                hide('like_share_error');

                var v = radioBtns['like_share'].val,
                    to = ShareBox.radioBtnOptions.WALL,
                    composer = cur.sbField && data(cur.sbField, 'composer'),
                    params = composer ? Composer.getSendParams(composer) : {
                        message: trim(val(cur.sbField))
                    };
                if (cur.sbShParam) {
                    params.share_param = cur.sbShParam;
                }
                switch (v) {
                    case ShareBox.radioBtnOptions.COMMUNITY:
                        var dd = cur.wdd && cur.wdd['like_club_dd'];
                        if (!dd || !dd.selCount) return elfocus('like_club_inp');
                        for (var i in dd.selected) {
                            to = intval(i.replace(/_$/, ''));
                        }
                    case ShareBox.radioBtnOptions.WALL:

                        if (vk.widget && vk.widget !== 4) {
                            window.allowCallback = function() {
                                ajax.post('like.php', Wall.fixPostParams(extend(params, {
                                    act: 'a_do_publish',
                                    from: 'box',
                                    to: to,
                                    hash: cur.sbShareHash,
                                    object: cur.sbObj,
                                    list: cur.sbList,
                                    ref: cur.section,
                                    ret_data: 1
                                })), ShareBox.options());
                                cur.shareAction = 'publish';
                            };

                            Widgets.popupBoxOpen('like.php', {
                                act: 'a_allow_publish_box',
                                to: to,
                                object: cur.sbObj,
                                list: cur.sbList
                            }, 'vk_allow', {
                                height: 171
                            });
                        } else {
                            var markAsAdsChecked = 0;
                            var muteNotificationChecked = 0;

                            if (isVisible(cur.sbSettingsBtnEl)) {
                                markAsAdsChecked = isVisible('like_share_mark_as_ads') && isChecked('like_share_mark_as_ads') ? 1 : 0;
                                muteNotificationChecked = (isChecked('like_share_mute_notifications') || markAsAdsChecked)
                            }

                            ajax.post('like.php', Wall.fixPostParams(extend(params, {
                                act: 'a_do_publish',
                                from: 'box',
                                to: to,
                                hash: cur.sbShareHash,
                                object: cur.sbObj,
                                list: cur.sbList,
                                ref: opts.shRef || cur.section,
                                ret_data: 1,
                                friends_only: isVisible(cur.sbFriendsOnlyEl) && isChecked(cur.sbFriendsOnlyEl) ? 1 : 0,
                                close_comments: isVisible(cur.sbSettingsBtnEl) && isChecked(ge('like_share_close_comments')) ? 1 : 0,
                                mark_as_ads: markAsAdsChecked,
                                mute_notifications: muteNotificationChecked
                            })), ShareBox.options());
                            cur.shareAction = 'publish';
                        }
                        break;

                    case ShareBox.radioBtnOptions.IM:
                        var dd = cur.wdd && cur.wdd['like_mail_dd'],
                            params =
                            extend(params, {
                                act: 'a_send_box',
                                from: 'box',
                                to_ids: [],
                                entrypoint: 'share',
                                chas: cur.sbMailHash,
                                ajax: 1,
                                title: (isVisible('like_share_title_wrap') && val('like_share_title') || ''),
                                media: cur.sbObj + (cur.sbList ? ('/' + cur.sbList) : ''),
                                ret_data: 1
                            });
                        if (!dd || !dd.selCount) return elfocus('like_im_inp');

                        for (var i in dd.selected) {
                            params.to_ids.push(i.replace(/_$/, ''));
                        }
                        params.to_ids = params.to_ids.join(',');
                        ajax.post('al_im.php', Wall.fixPostParams(params), ShareBox.options());
                        cur.shareAction = 'im_send';
                        break;
                }
            },
            sbCheckLen: function(inp) {
                checkTextLength(4096, inp, 'like_share_warn');
                var dd = cur.wdd && cur.wdd['like_mail_dd'],
                    mchat = dd && dd.full && (dd.selCount == 1);
                toggle('like_share_title_wrap', dd && (radioBtns['like_share'].val == ShareBox.radioBtnOptions.IM) && (inp.lastLen > 200 && !mchat || val('like_share_title')) ? true : false);
            },
            sbReInitMediaSelector: function(version) {
                var addMedia = (window.data(cur.sbField, 'composer') || {}).addMedia;
                var medias = addMedia && addMedia.getMedias(true);
                var shMediaOpts = opts.shMediaOpts || {};
                var limits = shMediaOpts['limits'] || [];
                var limit = limits[version] || 0;

                if (cur.sbField) {
                    Wall.deinitComposer(cur.sbField);
                }

                Emoji.init(cur.sbField, {
                    ttDiff: -48,
                    rPointer: true,
                    ref: 'share',
                    noEnterSend: true,
                    noStickers: true,
                    controlsCont: cur.sbField.parentNode,
                    checkEditable: function() {
                        cur.sbCheckLen(cur.sbField);
                    },
                });

                Wall.initComposer(cur.sbField, {
                    lang: {
                        introText: getLang('profile_mention_start_typing'),
                        noResult: getLang('profile_mention_not_found')
                    },
                    media: isVisible('like_share_add_media') ? {
                        lnk: ge('like_share_add_media'),
                        preview: ge('like_share_media_preview'),
                        gearEl: ge('like_share_settings_btn'),
                        actionsEl: false,
                        types: opts.shTypes,
                        options: {
                            limit: limit,
                            disabledTypes: ['album', 'share', 'link', 'page', 'article', 'poll'],
                            toggleLnk: true,
                            nocl: 1,
                            toId: tmpPostTo,
                            onAddMediaChange: ShareBox.mediaChange,
                            onMediaChange: ShareBox.mediaChange,
                        }
                    } : undefined
                });

                if (isArray(medias) && medias.length) {
                    addMedia = (window.data(cur.sbField, 'composer') || {}).addMedia;

                    medias
                        .slice(0, limit)
                        .forEach(function(media) {
                            addMedia.chooseMedia(media[0], media[1], media[5], null, true)
                        });
                }

                ShareBox.mediaChange();
            }
        });

        cur.sbHidden = true;
        setTimeout(elfocus.pbind(cur.sbField), 0);

        box.setOptions({
            onClean: function() {
                Wall.deinitComposer(cur.sbField);
                delete cur.sbField;
                cur.postTo = tmpPostTo;
                if (window.WideDropdown) {
                    WideDropdown.deinit('like_club_dd');
                    WideDropdown.deinit('like_mail_dd');
                }
            }
        });

        if (!window._mbFriends) { // is used in writebox.js too!
            ajax.post('hints.php', {
                act: 'a_json_friends',
                from: 'imwrite',
                str: ''
            }, {
                onDone: function(arr) {
                    window._sbFriends = arr;
                    var dd = (cur.wdd && cur.wdd['like_mail_dd']);
                    if (dd) {
                        WideDropdown.items('like_mail_dd', arr);
                    }
                }
            });
        }
        if (!hasClass(ge('like_share_club'), 'disabled')) WideDropdown.init('like_club_dd', {
            defaultItems: opts.clubs,
            noResult: getLang('like_club_not_found'),
            img: cur.sbAva,
            noAnim: true,
            introText: getLang('like_club_choose'),
            onChange: function(act) {
                curBox().changed = true;
                ShareBox.rbChanged(ge('like_share_club'), ShareBox.radioBtnOptions.COMMUNITY, true);
                var dd = cur.wdd['like_club_dd'],
                    sel = dd.selCount,
                    peer = false,
                    draft, ret = true;
                if (act == 1) { // added
                    setTimeout(elfocus.pbind(cur.sbField), 0);
                }
                if (sel < 1 && !cur.sbHidden) {
                    ShareBox.toggleAva(false);
                    ret = 1;
                } else if (sel > 0 && cur.sbHidden) {
                    ShareBox.toggleAva(true);
                    ret = 1;
                }
                cur.sbCheckLen(cur.sbField);
                return ret;
            }
        });
        if (!hasClass(ge('like_share_mail'), 'disabled')) WideDropdown.init('like_mail_dd', {
            defaultItems: window._mbFriends,
            url: 'hints.php',
            noAnim: true,
            params: {
                act: 'a_json_friends',
                from: 'imwrite'
            },
            noResult: getLang('mail_not_found'),
            img: cur.sbAva,
            introText: getLang('mail_choose_recipient'),
            onChange: function(act) {
                curBox().changed = true;
                ShareBox.rbChanged(ge('like_share_mail'), ShareBox.radioBtnOptions.IM, true);
                var dd = cur.wdd['like_mail_dd'],
                    sel = dd.selCount,
                    peer = false,
                    draft, ret = true;
                if (act == 1) { // added
                    setTimeout(elfocus.pbind(cur.sbField), 0);
                }
                if (sel < 1 && !cur.sbHidden) {
                    ShareBox.toggleAva(false);
                    ret = 0;
                } else if (sel > 0 && cur.sbHidden) {
                    ShareBox.toggleAva(true);
                    ret = 1;
                }
                cur.sbCheckLen(cur.sbField);
                ShareBox.updateButtonLabel(ShareBox.radioBtnOptions.IM, dd.selCount);
                return ret;
            },
            allowMultiselectAll: !!cur.shNewUi,
        });
        each(geByClass('_like_share_about_select', curBox().bodyNode), function() {
            hide(this);
        });
        var radioEls = radioBtns['like_share'].els,
            radioVal = radioBtns['like_share'].val;
        ShareBox.rbChanged(radioEls[radioVal], radioVal);
    },
    toggleAva: function(vis) {
        var t = Fx.Transitions.easeOutCubic,
            d = 150,
            f = 'ease-out';
        if (vis) {
            show(cur.sbAva);
            cssAnim(cur.sbAva, extend({
                opacity: 1
            }, ShareBox.mrg(0)), {
                duration: d,
                transition: t,
                func: f
            });
            cssAnim(ge('dark_box_topic'), ShareBox.mrg(26), {
                duration: d,
                transition: t,
                func: f
            });
            cur.sbHidden = false;
            return 1;
        } else {
            cssAnim(cur.sbAva, extend({
                opacity: 0
            }, ShareBox.mrg(-26)), {
                duration: d,
                transition: t,
                func: f
            }, hide.pbind(cur.sbAva));
            cssAnim(ge('dark_box_topic'), ShareBox.mrg(0), {
                duration: d,
                transition: t,
                func: f
            });
            cur.sbHidden = true;
            return 0;
        }
    },
    rbChanged: function(el, rbOption, fromDD) {
        if (!fromDD) {
            cur.sbReInitMediaSelector(rbOption);
        }

        if (cur.sbPostCheckboxEl) {
            if (cur.sbFriendsOnlyEl) {
                if (rbOption === ShareBox.radioBtnOptions.WALL) {
                    cur.sbFriendsOnlyEl.classList.remove('like_share_friends_only_hidden');
                } else {
                    cur.sbFriendsOnlyEl.classList.add('like_share_friends_only_hidden');
                }
            }

            var markAsAdsCheckbox = ge('like_share_mark_as_ads');
            var muteNotificationsCheckbox = ge('like_share_mute_notifications');

            if (rbOption === ShareBox.radioBtnOptions.WALL) {
                hide(markAsAdsCheckbox);

                if (isChecked(markAsAdsCheckbox)) {
                    var prevState = +domData(muteNotificationsCheckbox, 'prev-state');
                    disable(muteNotificationsCheckbox, 0);
                    toggleClass(muteNotificationsCheckbox, 'on', prevState);
                }
            } else {
                show(markAsAdsCheckbox);

                if (isChecked(markAsAdsCheckbox)) {
                    disable(muteNotificationsCheckbox, 1);
                    toggleClass(muteNotificationsCheckbox, 'on', 1);
                }
            }

            if (rbOption === ShareBox.radioBtnOptions.IM) {
                cur.sbPostCheckboxEl.classList.add('like_share_post_checkbox_hidden');
            } else {
                cur.sbPostCheckboxEl.classList.remove('like_share_post_checkbox_hidden');
            }
        }

        radiobtn(el, rbOption, 'like_share');
        if (getLang('title_for_all')) {
            val('dark_box_topic', getLang((rbOption === ShareBox.radioBtnOptions.IM) ? 'title_for_mail' : 'title_for_all'));
        }
        val('like_share_title_header', getLang((rbOption === ShareBox.radioBtnOptions.IM) ? 'likes_select_message' : 'like_select_comment'));
        each(geByClass('_like_share_about_select', curBox().bodyNode), function() {
            hide(this);
        });
        show(domNS(el));
        var composer = cur.sbField && data(cur.sbField, 'composer');
        if (composer && composer.addMedia) {
            var addMedia = composer.addMedia;
            var menu = addMedia.menu;
            if (rbOption === ShareBox.radioBtnOptions.COMMUNITY || rbOption === ShareBox.radioBtnOptions.WALL && cur.sbShareOwn) {
                if (addMedia.limit > (addMedia.getMedias(true) || []).length) {
                    var newTypes = [];
                    var toGroup = rbOption === ShareBox.radioBtnOptions.COMMUNITY;
                    each(menu.types, function(i, v) {
                        if (v[0] === 'mark_as_ads') {
                            if ((toGroup && composer.addMedia.markAsAds) || !toGroup) {
                                return;
                            }
                        }

                        newTypes.push(v);
                    });
                    menu.setItems(newTypes);
                }
                show(geByClass1('add_media_type_' + composer.addMedia.lnkId + '_postpone', composer.addMedia.menu.menuNode, 'a'));
                if (cur.sbPostponeDate && composer.addMedia.chosenMedia[0] == 'postpone' && composer.addMedia.chosenMediaData) {
                    composer.addMedia.chosenMediaData.date = cur.sbPostponeDate;
                    composer.addMedia.chooseMedia('postpone', composer.addMedia.chosenMedia[1], composer.addMedia.chosenMediaData);
                    hide(domFC(ge('like_share_add_media')));
                    cur.sbPostponeDate = false;
                }
                if (composer.addMedia.postponePreview) {
                    show(domPN(composer.addMedia.postponePreview));
                }

                if (composer.addMedia.markAsAds) {
                    if (toGroup) {
                        show(domPN(geByClass1('page_preview_mark_as_ads_wrap', ge('like_share_media_preview'))));
                    } else {
                        hide(domPN(geByClass1('page_preview_mark_as_ads_wrap', ge('like_share_media_preview'))));
                    }
                }
            } else {
                if (addMedia.limit > (addMedia.getMedias(true) || []).length) {
                    var newTypes = [];
                    each(menu.types, function(i, v) {
                        if (v[0] !== 'postpone' && v[0] !== 'mark_as_ads') {
                            newTypes.push(v);
                        }
                    });
                    menu.setItems(newTypes);
                }
                hide(geByClass1('add_media_type_' + composer.addMedia.lnkId + '_postpone', composer.addMedia.menu.menuNode, 'a'));
                if (composer.addMedia.chosenMedia && composer.addMedia.chosenMedia[0] == 'postpone') {
                    cur.sbPostponeDate = val('postpone_date' + composer.addMedia.lnkId)
                    val('like_share_media_preview', '');
                    show(domFC(ge('like_share_add_media')));
                }
                if (composer.addMedia.postponePreview) {
                    hide(domPN(composer.addMedia.postponePreview));
                }
                if (composer.addMedia.markAsAds) {
                    hide(domPN(geByClass1('page_preview_mark_as_ads_wrap', ge('like_share_media_preview'))));
                }
            }
        }
        if (fromDD === true) return;

        switch (rbOption) {
            case ShareBox.radioBtnOptions.WALL:
                if (!cur.sbHidden) {
                    var t = Fx.Transitions.easeOutCubic,
                        d = 150,
                        f = 'ease-out';
                    cssAnim(cur.sbAva, extend({
                        opacity: 0
                    }, ShareBox.mrg(-26)), {
                        duration: d,
                        transition: t,
                        func: f
                    }, hide.pbind(cur.sbAva));
                    cssAnim(ge('dark_box_topic'), ShareBox.mrg(0), {
                        duration: d,
                        transition: t,
                        func: f
                    });
                    cur.sbHidden = true;
                }
                elfocus(cur.sbField);
                break;

            case ShareBox.radioBtnOptions.COMMUNITY:
            case ShareBox.radioBtnOptions.IM:
                var dd = (rbOption == ShareBox.radioBtnOptions.COMMUNITY) ? 'like_club_dd' : 'like_mail_dd';
                cur.wdd[dd].selCount ? elfocus(cur.sbField) : WideDropdown.focus(dd);
                WideDropdown.updimgs(dd);
                break;
        }
        var selCount = cur.wdd['like_mail_dd'] ? cur.wdd['like_mail_dd'].selCount : 0;
        ShareBox.updateButtonLabel(rbOption, selCount);
    },
    options: function() {
        return {
            showProgress: lockButton.pbind('like_share_send'),
            hideProgress: unlockButton.pbind('like_share_send'),
            onDone: function(text, likeData) {
                cur.likeData = likeData;
                curBox().hide();
                showDoneBox(text);
                !cur.sbObj.indexOf(':') && isObject(likeData) && Likes.update(cur.sbObj, likeData);

                if (window.Videoview && /^video\-?\d+_\d+$/.test(cur.sbObj)) {
                    Videoview.onVideoShared(cur.shareAction, cur.sbObj, cur.sbList);
                }
                delete cur.shareAction;
            },
            onFail: function(text) {
                ge('like_share_error').innerHTML = '<div class="msg_text">' + text + '</div>';
                show('like_share_error');
                return true;
            }
        };
    },
    updateButtonLabel: function(selectedOption, selectedItemsCount) {
        if (!cur.shNewUi) {
            return; //temp A/B test VKRED-13227
        }
        if (!cur.shButtonLabelBackup) {
            cur.shButtonLabelBackup = ge('like_share_send').innerHTML;
        }
        if (selectedOption === ShareBox.radioBtnOptions.IM) {
            if (selectedItemsCount > 1) {
                ge('like_share_send').innerHTML = getLang('mail_send_separate');
            } else {
                ge('like_share_send').innerHTML = getLang('mail_send2');
            }
        } else {
            ge('like_share_send').innerHTML = cur.shButtonLabelBackup;
        }
    }
};

try {
    stManager.done('sharebox.js');
} catch (e) {}