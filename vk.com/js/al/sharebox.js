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
            var i = domNS(a);
            hasClass(a, "disabled") && i && (addClass(i, "like_share_disabled"), (geByTag1("input", i) || {}).readOnly = !0)
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
                        i = 0,
                        s = cur.sbField && data(cur.sbField, "composer"),
                        d = s ? Composer.getSendParams(s) : {
                            message: trim(val(cur.sbField))
                        };
                    switch (cur.sbShParam && (d.share_param = cur.sbShParam), e) {
                        case 1:
                            var r = cur.wdd && cur.wdd.like_club_dd;
                            if (!r || !r.selCount) return elfocus("like_club_inp");
                            for (var o in r.selected) i = intval(o.replace(/_$/, ""));
                        case 0:
                            if (vk.widget && 4 !== vk.widget) window.allowCallback = function() {
                                ajax.post("like.php", Wall.fixPostParams(extend(d, {
                                    act: "a_do_publish",
                                    from: "box",
                                    to: i,
                                    hash: cur.sbShareHash,
                                    object: cur.sbObj,
                                    list: cur.sbList,
                                    ref: cur.section,
                                    ret_data: 1
                                })), ShareBox.options()), cur.shareAction = "publish"
                            }, Widgets.popupBoxOpen("like.php", {
                                act: "a_allow_publish_box",
                                to: i,
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
                                    to: i,
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
                    i = a && a.full && 1 == a.selCount;
                toggle("like_share_title_wrap", a && 2 == radioBtns.like_share.val && (e.lastLen > 200 && !i || val("like_share_title")) ? !0 : !1)
            },
            sbReInitMediaSelector: function(e) {
                var i = (window.data(cur.sbField, "composer") || {}).addMedia,
                    s = i && i.getMedias(!0),
                    d = a.shMediaOpts || {},
                    r = d.limits || [],
                    o = r[e] || 0;
                cur.sbField && Wall.deinitComposer(cur.sbField), Emoji.init(cur.sbField, {
                    ttDiff: -48,
                    rPointer: !0,
                    ref: "share",
                    noEnterSend: !0,
                    noStickers: !0,
                    controlsCont: cur.sbField.parentNode,
                    checkEditable: function() {
                        cur.sbCheckLen(cur.sbField)
                    }
                }), Wall.initComposer(cur.sbField, {
                    lang: {
                        introText: getLang("profile_mention_start_typing"),
                        noResult: getLang("profile_mention_not_found")
                    },
                    media: isVisible("like_share_add_media") ? {
                        lnk: ge("like_share_add_media"),
                        preview: ge("like_share_media_preview"),
                        types: a.shTypes,
                        options: {
                            limit: o,
                            disabledTypes: ["album", "share", "link", "page", "article", "poll"],
                            toggleLnk: !0,
                            nocl: 1,
                            onAddMediaChange: ShareBox.mediaChange,
                            onMediaChange: ShareBox.mediaChange
                        }
                    } : void 0
                }), isArray(s) && s.length && (i = (window.data(cur.sbField, "composer") || {}).addMedia, s.slice(0, o).forEach(function(e) {
                    i.chooseMedia(e[0], e[1], e[5], null, !0)
                })), ShareBox.mediaChange()
            }
        }), cur.sbHidden = !0, setTimeout(elfocus.pbind(cur.sbField), 0);
        var i = cur.postTo;
        cur.postTo = !1, e.setOptions({
            onClean: function() {
                Wall.deinitComposer(cur.sbField), delete cur.sbField, cur.postTo = i, window.WideDropdown && (WideDropdown.deinit("like_club_dd"), WideDropdown.deinit("like_mail_dd"))
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
                    i = a.selCount,
                    s = !0;
                return 1 == e && setTimeout(elfocus.pbind(cur.sbField), 0), 1 > i && !cur.sbHidden ? (ShareBox.toggleAva(!1), s = 1) : i > 0 && cur.sbHidden && (ShareBox.toggleAva(!0), s = 1), cur.sbCheckLen(cur.sbField), s
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
                    i = a.selCount,
                    s = !0;
                return 1 == e && setTimeout(elfocus.pbind(cur.sbField), 0), 1 > i && !cur.sbHidden ? (ShareBox.toggleAva(!1), s = 0) : i > 0 && cur.sbHidden && (ShareBox.toggleAva(!0), s = 1), cur.sbCheckLen(cur.sbField), s
            }
        }), each(geByClass("_like_share_about_select", curBox().bodyNode), function() {
            hide(this)
        });
        var s = radioBtns.like_share.els,
            d = radioBtns.like_share.val;
        ShareBox.rbChanged(s[d], d)
    },
    toggleAva: function(e) {
        var a = Fx.Transitions.easeOutCubic,
            i = 150,
            s = "ease-out";
        return e ? (show(cur.sbAva), cssAnim(cur.sbAva, extend({
            opacity: 1
        }, ShareBox.mrg(0)), {
            duration: i,
            transition: a,
            func: s
        }), cssAnim(ge("dark_box_topic"), ShareBox.mrg(26), {
            duration: i,
            transition: a,
            func: s
        }), cur.sbHidden = !1, 1) : (cssAnim(cur.sbAva, extend({
            opacity: 0
        }, ShareBox.mrg(-26)), {
            duration: i,
            transition: a,
            func: s
        }, hide.pbind(cur.sbAva)), cssAnim(ge("dark_box_topic"), ShareBox.mrg(0), {
            duration: i,
            transition: a,
            func: s
        }), cur.sbHidden = !0, 0)
    },
    rbChanged: function(e, a, i) {
        if (i || cur.sbReInitMediaSelector(a), cur.sbPostCheckboxEl) {
            cur.sbFriendsOnlyEl && (0 === a ? cur.sbFriendsOnlyEl.classList.remove("like_share_friends_only_hidden") : cur.sbFriendsOnlyEl.classList.add("like_share_friends_only_hidden"));
            var s = ge("like_share_mark_as_ads"),
                d = ge("like_share_mute_notifications");
            if (0 === a) {
                if (hide(s), isChecked(s)) {
                    var r = +domData(d, "prev-state");
                    disable(d, 0), toggleClass(d, "on", r)
                }
            } else show(s), isChecked(s) && (disable(d, 1), toggleClass(d, "on", 1));
            2 === a ? cur.sbPostCheckboxEl.classList.add("like_share_post_checkbox_hidden") : cur.sbPostCheckboxEl.classList.remove("like_share_post_checkbox_hidden")
        }
        radiobtn(e, a, "like_share"), getLang("title_for_all") && val("dark_box_topic", getLang(2 > a ? "title_for_all" : "title_for_mail")), val("like_share_title_header", getLang(2 > a ? "like_select_comment" : "likes_select_message")), each(geByClass("_like_share_about_select", curBox().bodyNode), function() {
            hide(this)
        }), show(domNS(e));
        var o = cur.sbField && data(cur.sbField, "composer");
        if (o && o.addMedia) {
            var t = o.addMedia,
                n = t.menu;
            if (1 == a || 0 == a && cur.sbShareOwn) {
                if (t.limit > (t.getMedias(!0) || []).length) {
                    var l = [],
                        c = 1 == a;
                    each(n.types, function(e, a) {
                        "mark_as_ads" === a[0] && (c && o.addMedia.markAsAds || !c) || l.push(a)
                    }), n.setItems(l)
                }
                show(geByClass1("add_media_type_" + o.addMedia.lnkId + "_postpone", o.addMedia.menu.menuNode, "a")), cur.sbPostponeDate && "postpone" == o.addMedia.chosenMedia[0] && o.addMedia.chosenMediaData && (o.addMedia.chosenMediaData.date = cur.sbPostponeDate, o.addMedia.chooseMedia("postpone", o.addMedia.chosenMedia[1], o.addMedia.chosenMediaData), hide(domFC(ge("like_share_add_media"))), cur.sbPostponeDate = !1), o.addMedia.postponePreview && show(domPN(o.addMedia.postponePreview)), o.addMedia.markAsAds && (c ? show(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview")))) : hide(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview")))))
            } else {
                if (t.limit > (t.getMedias(!0) || []).length) {
                    var l = [];
                    each(n.types, function(e, a) {
                        "postpone" !== a[0] && "mark_as_ads" !== a[0] && l.push(a)
                    }), n.setItems(l)
                }
                hide(geByClass1("add_media_type_" + o.addMedia.lnkId + "_postpone", o.addMedia.menu.menuNode, "a")), o.addMedia.chosenMedia && "postpone" == o.addMedia.chosenMedia[0] && (cur.sbPostponeDate = val("postpone_date" + o.addMedia.lnkId), val("like_share_media_preview", ""), show(domFC(ge("like_share_add_media")))), o.addMedia.postponePreview && hide(domPN(o.addMedia.postponePreview)), o.addMedia.markAsAds && hide(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview"))))
            }
        }
        if (i !== !0) switch (a) {
            case 0:
                if (!cur.sbHidden) {
                    var _ = Fx.Transitions.easeOutCubic,
                        u = 150,
                        h = "ease-out";
                    cssAnim(cur.sbAva, extend({
                        opacity: 0
                    }, ShareBox.mrg(-26)), {
                        duration: u,
                        transition: _,
                        func: h
                    }, hide.pbind(cur.sbAva)), cssAnim(ge("dark_box_topic"), ShareBox.mrg(0), {
                        duration: u,
                        transition: _,
                        func: h
                    }), cur.sbHidden = !0
                }
                elfocus(cur.sbField);
                break;
            case 1:
            case 2:
                var b = 1 == a ? "like_club_dd" : "like_mail_dd";
                cur.wdd[b].selCount ? elfocus(cur.sbField) : WideDropdown.focus(b), WideDropdown.updimgs(b)
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