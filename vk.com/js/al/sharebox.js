var ShareBox = {
    mrg: function(e) {
        return vk.rtl ? {
            marginRight: e
        } : {
            marginLeft: e
        }
    },
    mediaChange: function() {
        var e = cur.sbField && data(cur.sbField, "composer");
        if (e && e.addMedia) {
            var a = (radioBtns.like_share || {}).val || 0;
            toggle(geByClass1("add_media_type_" + e.addMedia.lnkId + "_postpone", e.addMedia.menu.menuNode, "a"), 1 == a || 0 == a && cur.sbShareOwn)
        }
    },
    show: function(e, a) {
        cur.shareBoxWidth = 450, e.setOptions({
            hideButtons: !0,
            grey: !0,
            width: cur.shareBoxWidth,
            noRefreshCoords: !0,
            bodyStyle: "padding: 0;"
        }), e.removeButtons(), radioBtns.like_share = {
            els: [ge("like_share_my"), ge("like_share_club"), ge("like_share_mail")],
            val: a.rbVal
        }, each(radioBtns.like_share.els, function(e, a) {
            var s = domNS(a);
            hasClass(a, "disabled") && s && (addClass(s, "like_share_disabled"), (geByTag1("input", s) || {}).readOnly = !0)
        }), cur.shareAction = "", cur.lang = extend(cur.lang || {}, a.lang), cur.sbField = ge("like_share_text"), cur.sbField.getValue = Emoji.val.pbind(cur.sbField), extend(cur, {
            sbSettingsBtnEl: ge("like_share_settings_btn"),
            sbFriendsOnlyEl: ge("like_share_friends_only"),
            sbPostCheckboxEl: ge("like_share_post_checkbox"),
            sbAva: ge("like_share_ava"),
            sbTo: [0],
            sbShareHash: a.shHash,
            sbMailHash: a.imHash,
            sbObj: a.shObj,
            sbList: a.shList || "",
            sbShareOwn: a.shOwn,
            sbShParam: a.shParam,
            sbSend: function() {
                if (!buttonLocked("like_share_send")) {
                    hide("like_share_error");
                    var e = radioBtns.like_share.val,
                        s = 0,
                        i = cur.sbField && data(cur.sbField, "composer"),
                        d = i ? Composer.getSendParams(i) : {
                            message: trim(val(cur.sbField))
                        };
                    switch (cur.sbShParam && (d.share_param = cur.sbShParam), e) {
                        case 1:
                            var r = cur.wdd && cur.wdd.like_club_dd;
                            if (!r || !r.selCount) return elfocus("like_club_inp");
                            for (var o in r.selected) s = intval(o.replace(/_$/, ""));
                        case 0:
                            if (vk.widget && 4 !== vk.widget) window.allowCallback = function() {
                                ajax.post("like.php", Wall.fixPostParams(extend(d, {
                                    act: "a_do_publish",
                                    from: "box",
                                    to: s,
                                    hash: cur.sbShareHash,
                                    object: cur.sbObj,
                                    list: cur.sbList,
                                    ref: cur.section,
                                    ret_data: 1
                                })), ShareBox.options()), cur.shareAction = "publish"
                            }, Widgets.popupBoxOpen("like.php", {
                                act: "a_allow_publish_box",
                                to: s,
                                object: cur.sbObj,
                                list: cur.sbList
                            }, "vk_allow", {
                                height: 171
                            });
                            else {
                                var t = 0,
                                    n = 0;
                                isVisible(cur.sbSettingsBtnEl) && (t = isVisible("like_share_mark_as_ads") && isChecked("like_share_mark_as_ads") ? 1 : 0, n = isChecked("like_share_mute_notifications") || t), ajax.post("like.php", Wall.fixPostParams(extend(d, {
                                    act: "a_do_publish",
                                    from: "box",
                                    to: s,
                                    hash: cur.sbShareHash,
                                    object: cur.sbObj,
                                    list: cur.sbList,
                                    ref: a.shRef || cur.section,
                                    ret_data: 1,
                                    friends_only: isVisible(cur.sbFriendsOnlyEl) && isChecked(cur.sbFriendsOnlyEl) ? 1 : 0,
                                    close_comments: isVisible(cur.sbSettingsBtnEl) && isChecked(ge("like_share_close_comments")) ? 1 : 0,
                                    mark_as_ads: t,
                                    mute_notifications: n
                                })), ShareBox.options()), cur.shareAction = "publish"
                            }
                            break;
                        case 2:
                            var r = cur.wdd && cur.wdd.like_mail_dd,
                                d = extend(d, {
                                    act: "a_send_box",
                                    from: "box",
                                    to_ids: [],
                                    entrypoint: "share",
                                    chas: cur.sbMailHash,
                                    ajax: 1,
                                    title: isVisible("like_share_title_wrap") && val("like_share_title") || "",
                                    media: cur.sbObj + (cur.sbList ? "/" + cur.sbList : ""),
                                    ret_data: 1
                                });
                            if (!r || !r.selCount) return elfocus("like_mail_inp");
                            for (var o in r.selected) d.to_ids.push(o.replace(/_$/, ""));
                            d.to_ids = d.to_ids.join(","), ajax.post("al_im.php", Wall.fixPostParams(d), ShareBox.options()), cur.shareAction = "im_send"
                    }
                }
            },
            sbCheckLen: function(e) {
                checkTextLength(4096, e, "like_share_warn");
                var a = cur.wdd && cur.wdd.like_mail_dd,
                    s = a && a.full && 1 == a.selCount;
                toggle("like_share_title_wrap", a && 2 == radioBtns.like_share.val && (e.lastLen > 200 && !s || val("like_share_title")) ? !0 : !1)
            }
        }), cur.sbHidden = !0, setTimeout(elfocus.pbind(cur.sbField), 0), Wall.initComposer(cur.sbField, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            media: isVisible("like_share_add_media") ? {
                lnk: ge("like_share_add_media"),
                preview: ge("like_share_media_preview"),
                types: a.shTypes,
                options: {
                    limit: 1,
                    disabledTypes: ["album", "share", "link", "page", "article", "poll"],
                    toggleLnk: !0,
                    nocl: 1,
                    onAddMediaChange: ShareBox.mediaChange,
                    onMediaChange: ShareBox.mediaChange
                }
            } : void 0
        }), ShareBox.mediaChange(), Emoji.init(cur.sbField, {
            ttDiff: -48,
            rPointer: !0,
            shouldFocus: !0,
            ref: "share",
            noEnterSend: !0,
            noStickers: !0,
            controlsCont: cur.sbField.parentNode,
            checkEditable: function() {
                cur.sbCheckLen(cur.sbField)
            }
        });
        var s = cur.postTo;
        cur.postTo = !1, e.setOptions({
            onClean: function() {
                Wall.deinitComposer(cur.sbField), delete cur.sbField, cur.postTo = s, window.WideDropdown && (WideDropdown.deinit("like_club_dd"), WideDropdown.deinit("like_mail_dd"))
            }
        }), window._mbFriends || ajax.post("hints.php", {
            act: "a_json_friends",
            from: "imwrite",
            str: ""
        }, {
            onDone: function(e) {
                window._sbFriends = e;
                var a = cur.wdd && cur.wdd.like_mail_dd;
                a && WideDropdown.items("like_mail_dd", e)
            }
        }), hasClass(ge("like_share_club"), "disabled") || WideDropdown.init("like_club_dd", {
            defaultItems: a.clubs,
            noResult: getLang("like_club_not_found"),
            img: cur.sbAva,
            noAnim: !0,
            introText: getLang("like_club_choose"),
            onChange: function(e) {
                curBox().changed = !0, ShareBox.rbChanged(ge("like_share_club"), 1, !0);
                var a = cur.wdd.like_club_dd,
                    s = a.selCount,
                    i = !0;
                return 1 == e && setTimeout(elfocus.pbind(cur.sbField), 0), 1 > s && !cur.sbHidden ? (ShareBox.toggleAva(!1), i = 1) : s > 0 && cur.sbHidden && (ShareBox.toggleAva(!0), i = 1), cur.sbCheckLen(cur.sbField), i
            }
        }), hasClass(ge("like_share_mail"), "disabled") || WideDropdown.init("like_mail_dd", {
            defaultItems: window._mbFriends,
            url: "hints.php",
            noAnim: !0,
            params: {
                act: "a_json_friends",
                from: "imwrite"
            },
            noResult: getLang("mail_not_found"),
            img: cur.sbAva,
            introText: getLang("mail_choose_recipient"),
            onChange: function(e) {
                curBox().changed = !0, ShareBox.rbChanged(ge("like_share_mail"), 2, !0);
                var a = cur.wdd.like_mail_dd,
                    s = a.selCount,
                    i = !0;
                return 1 == e && setTimeout(elfocus.pbind(cur.sbField), 0), 1 > s && !cur.sbHidden ? (ShareBox.toggleAva(!1), i = 0) : s > 0 && cur.sbHidden && (ShareBox.toggleAva(!0), i = 1), cur.sbCheckLen(cur.sbField), i
            }
        }), each(geByClass("_like_share_about_select", curBox().bodyNode), function() {
            hide(this)
        });
        var i = radioBtns.like_share.els,
            d = radioBtns.like_share.val;
        ShareBox.rbChanged(i[d], d)
    },
    toggleAva: function(e) {
        var a = Fx.Transitions.easeOutCubic,
            s = 150,
            i = "ease-out";
        return e ? (show(cur.sbAva), cssAnim(cur.sbAva, extend({
            opacity: 1
        }, ShareBox.mrg(0)), {
            duration: s,
            transition: a,
            func: i
        }), cssAnim(ge("dark_box_topic"), ShareBox.mrg(26), {
            duration: s,
            transition: a,
            func: i
        }), cur.sbHidden = !1, 1) : (cssAnim(cur.sbAva, extend({
            opacity: 0
        }, ShareBox.mrg(-26)), {
            duration: s,
            transition: a,
            func: i
        }, hide.pbind(cur.sbAva)), cssAnim(ge("dark_box_topic"), ShareBox.mrg(0), {
            duration: s,
            transition: a,
            func: i
        }), cur.sbHidden = !0, 0)
    },
    rbChanged: function(e, a, s) {
        if (cur.sbPostCheckboxEl) {
            cur.sbFriendsOnlyEl && (0 === a ? cur.sbFriendsOnlyEl.classList.remove("like_share_friends_only_hidden") : cur.sbFriendsOnlyEl.classList.add("like_share_friends_only_hidden"));
            var i = ge("like_share_mark_as_ads"),
                d = ge("like_share_mute_notifications");
            if (0 === a) {
                if (hide(i), isChecked(i)) {
                    var r = +domData(d, "prev-state");
                    disable(d, 0), toggleClass(d, "on", r)
                }
            } else show(i), isChecked(i) && (disable(d, 1), toggleClass(d, "on", 1));
            2 === a ? cur.sbPostCheckboxEl.classList.add("like_share_post_checkbox_hidden") : cur.sbPostCheckboxEl.classList.remove("like_share_post_checkbox_hidden")
        }
        radiobtn(e, a, "like_share"), getLang("title_for_all") && val("dark_box_topic", getLang(2 > a ? "title_for_all" : "title_for_mail")), val("like_share_title_header", getLang(2 > a ? "like_select_comment" : "likes_select_message")), each(geByClass("_like_share_about_select", curBox().bodyNode), function() {
            hide(this)
        }), show(domNS(e));
        var o = cur.sbField && data(cur.sbField, "composer");
        if (o && o.addMedia) {
            var t = o.addMedia.menu;
            if (1 == a || 0 == a && cur.sbShareOwn) {
                var n = [],
                    l = 1 == a;
                each(t.types, function(e, a) {
                    "mark_as_ads" === a[0] && (l && o.addMedia.markAsAds || !l) || n.push(a)
                }), t.setItems(n), show(geByClass1("add_media_type_" + o.addMedia.lnkId + "_postpone", o.addMedia.menu.menuNode, "a")), cur.sbPostponeDate && "postpone" == o.addMedia.chosenMedia[0] && o.addMedia.chosenMediaData && (o.addMedia.chosenMediaData.date = cur.sbPostponeDate, o.addMedia.chooseMedia("postpone", o.addMedia.chosenMedia[1], o.addMedia.chosenMediaData), hide(domFC(ge("like_share_add_media"))), cur.sbPostponeDate = !1), o.addMedia.postponePreview && show(domPN(o.addMedia.postponePreview)), o.addMedia.markAsAds && (l ? show(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview")))) : hide(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview")))))
            } else {
                var n = [];
                each(t.types, function(e, a) {
                    "postpone" !== a[0] && "mark_as_ads" !== a[0] && n.push(a)
                }), t.setItems(n), hide(geByClass1("add_media_type_" + o.addMedia.lnkId + "_postpone", o.addMedia.menu.menuNode, "a")), o.addMedia.chosenMedia && "postpone" == o.addMedia.chosenMedia[0] && (cur.sbPostponeDate = val("postpone_date" + o.addMedia.lnkId), val("like_share_media_preview", ""), show(domFC(ge("like_share_add_media")))), o.addMedia.postponePreview && hide(domPN(o.addMedia.postponePreview)), o.addMedia.markAsAds && hide(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview"))))
            }
        }
        if (s !== !0) switch (a) {
            case 0:
                if (!cur.sbHidden) {
                    var c = Fx.Transitions.easeOutCubic,
                        _ = 150,
                        u = "ease-out";
                    cssAnim(cur.sbAva, extend({
                        opacity: 0
                    }, ShareBox.mrg(-26)), {
                        duration: _,
                        transition: c,
                        func: u
                    }, hide.pbind(cur.sbAva)), cssAnim(ge("dark_box_topic"), ShareBox.mrg(0), {
                        duration: _,
                        transition: c,
                        func: u
                    }), cur.sbHidden = !0
                }
                elfocus(cur.sbField);
                break;
            case 1:
            case 2:
                var h = 1 == a ? "like_club_dd" : "like_mail_dd";
                cur.wdd[h].selCount ? elfocus(cur.sbField) : WideDropdown.focus(h), WideDropdown.updimgs(h)
        }
    },
    options: function() {
        return {
            showProgress: lockButton.pbind("like_share_send"),
            hideProgress: unlockButton.pbind("like_share_send"),
            onDone: function(e, a) {
                cur.likeData = a, curBox().hide(), showDoneBox(e), !cur.sbObj.indexOf(":") && isObject(a) && Likes.update(cur.sbObj, a), window.Videoview && /^video\-?\d+_\d+$/.test(cur.sbObj) && Videoview.onVideoShared(cur.shareAction, cur.sbObj, cur.sbList), delete cur.shareAction
            },
            onFail: function(e) {
                return ge("like_share_error").innerHTML = '<div class="msg_text">' + e + "</div>", show("like_share_error"), !0
            }
        }
    }
};
try {
    stManager.done("sharebox.js")
} catch (e) {}