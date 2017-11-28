var PostBox = {
    mrg: function(e) {
        return vk.rtl ? {
            marginRight: e
        } : {
            marginLeft: e
        }
    },
    show: function(e) {
        wkcur.noClickHide = !1, cur.lang = extend(cur.lang || {}, e.lang), extend(cur, {
            pbField: ge("pb_text"),
            pbAva: ge("dark_box_ava"),
            pbClubs: e.clubs,
            pbMyHash: e.hash,
            pbError: ge("pb_error"),
            pbSent: !1,
            pbSaved: ge("pb_saved"),
            pbShown: !0
        }), autosizeSetup(cur.pbField, {
            minHeight: 80
        }), setTimeout(elfocus.pbind(cur.pbField), 0), Wall.initComposer(cur.pbField, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            media: {
                lnk: domFC(ge("pb_add_media")),
                preview: ge("pb_media_preview"),
                types: e.media,
                options: {
                    limit: 10,
                    toggleLnk: !0,
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
            var o = e.draft,
                r = data(cur.pbField, "composer"),
                d = cur.pbNoteAdded;
            if ((o[0] || o[1]) && (val(cur.pbField, replaceEntities(o[0] || "")), (r || {}).addMedia)) {
                for (var a in o[1] || []) cur.pbNoDraftSave = 1, r.addMedia.chooseMedia.apply(r.addMedia, o[1][a]);
                d && (cur.pbNoDraftSave = 0, r.addMedia.chooseMedia("note", d.raw, d))
            }
        });
        var o = cur.postTo;
        cur.postTo = !1, wkcur._hide.push(function() {
            if (cur.pbShown = !1, cur.pbField) {
                cur.pbAfterPost ? cur.pbAfterPost = !1 : PostBox.postChanged(!0);
                var e = data(cur.pbField, "composer");
                (e || {}).addMedia && (e.addMedia.onChange = function() {
                    return !1
                }), Wall.deinitComposer(cur.pbField), delete cur.pbField, cur.postTo = o, window.WideDropdown && WideDropdown.deinit("pb_club_dd")
            }
        })
    },
    send: function() {
        if (cur.pbCustomSend) return void cur.pbCustomSend();
        if (!buttonLocked("pb_send")) {
            var e = isVisible("pb_choose_club"),
                o = cur.pbMyHash,
                r = 0,
                d = cur.wdd && cur.wdd.pb_club_dd;
            if (e) {
                if (!d || !d.selCount) return elfocus("pb_club_inp");
                for (var a in d.selected) r = intval(a.replace(/_$/, "")), o = d.selected[a][9]
            }
            var t = cur.pbField && data(cur.pbField, "composer"),
                n = t ? Composer.getSendParams(t, PostBox.send) : {
                    message: trim(val(cur.pbField))
                };
            return e ? extend(n, {
                to_id: r,
                official: 1,
                signed: isChecked("pb_signed")
            }) : extend(n, {
                to_id: vk.id,
                friends_only: isChecked("pb_friends_only"),
                status_export: isChecked("pb_status_export"),
                facebook_export: isChecked("pb_facebook_export")
            }), n.message || n.attach1_type ? void(n.delayed || (cur.pbSent = !0, ajax.post("al_wall.php", Wall.fixPostParams(extend(n, {
                act: "post",
                from: "postbox",
                hash: o
            })), {
                onDone: function(e) {
                    WkView.hide(), showDoneBox(e)
                },
                onFail: function(e) {
                    return cur.pbSent = !1, e ? (val(cur.pbError, e), cur.pbErrShown || (show(cur.pbError), cur.pbErrShown = !0), setTimeout(animate.pbind(cur.pbError, {
                        backgroundColor: "#FCEBA7"
                    }, 100, animate.pbind(cur.pbError, {
                        backgroundColor: "#F4EBBD"
                    }, 2e3)), 0), !0) : void 0
                },
                showProgress: lockButton.pbind("pb_send"),
                hideProgress: unlockButton.pbind("pb_send")
            }))) : elfocus(cur.pbField)
        }
    },
    postChanged: function(e) {
        cur.pbNoDraftSave || (wkcur.noClickHide = !0), clearTimeout(cur.pbSaveDraftTO), e === !0 ? PostBox.saveDraft() : cur.pbSaveDraftTO = setTimeout(PostBox.saveDraft, 10 === e ? 10 : 3e3), cur.pbErrShown && (cur.pbErrShown = !1, hide(cur.pbError))
    },
    saveDraft: function() {
        if (!cur.pbDraftDisabled) {
            if (cur.pbNoDraftSave) return void(cur.pbNoDraftSave = !1);
            if (!cur.pbSent && cur.pbShown) {
                var e = cur.pbField && data(cur.pbField, "composer"),
                    o = e ? Composer.getSendParams(e, PostBox.postChanged.pbind(10), !0) : {
                        message: trim(val(cur.pbField))
                    };
                o.delayed || ajax.post("al_wall.php", Wall.fixPostParams(extend(o, {
                    act: "save_draft",
                    hash: cur.pbMyHash
                })), {
                    onDone: function() {
                        clearTimeout(cur.pbSavedTO), show(cur.pbSaved), animate(cur.pbSaved, {
                            opacity: 1
                        }, 100), cur.pbSavedTO = setTimeout(animate.pbind(cur.pbSaved, {
                            opacity: 0
                        }, 1e3, hide.pbind(cur.pbSaved)), 3e3)
                    },
                    onFail: function() {
                        return !0
                    }
                })
            }
        }
    },
    showClubs: function() {
        if (window.WideDropdown) {
            hide("pb_choose_club_link", "pb_user_options"), show("pb_choose_club", "pb_cancel_club", "pb_club_options"), val("pb_send", getLang("wall_post_box_sendclub")), elfocus("pb_club_inp"), WideDropdown.init("pb_club_dd", {
                defaultItems: cur.pbClubs,
                noResult: getLang("like_club_not_found"),
                img: cur.pbAva,
                introText: getLang("like_club_choose"),
                defImgText: val(cur.pbAva),
                onChange: function(e) {
                    var o = cur.wdd.pb_club_dd,
                        r = (o.selCount, !0);
                    return 1 == e && setTimeout(elfocus.pbind(cur.pbField), 0), r
                }
            }), cur.pbTo && each(cur.pbClubs, function(e, o) {
                return o[0] == cur.pbTo ? (WideDropdown.select("pb_club_dd", !1, o), !1) : void 0
            });
            var e = cur.pbField && data(cur.pbField, "composer");
            e && e.addMedia && hide(geByClass1("add_media_type_" + e.addMedia.lnkId + "_note", e.addMedia.menu.menuNode, "a")), cur.pbErrShown && (cur.pbErrShown = !1, hide(cur.pbError))
        }
    },
    hideClubs: function() {
        show("pb_choose_club_link", "pb_user_options"), hide("pb_choose_club", "pb_cancel_club", "pb_club_options"), val("pb_send", getLang("wall_post_box_publish")), window.WideDropdown && WideDropdown.deselect("pb_club_dd");
        var e = cur.pbField && data(cur.pbField, "composer");
        e && e.addMedia && show(geByClass1("add_media_type_" + e.addMedia.lnkId + "_note", e.addMedia.menu.menuNode, "a")), cur.pbErrShown && (cur.pbErrShown = !1, hide(cur.pbError))
    }
};
try {
    stManager.done("postbox.js")
} catch (e) {}