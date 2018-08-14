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
                        a = 0,
                        i = cur.sbField && data(cur.sbField, "composer"),
                        s = i ? Composer.getSendParams(i) : {
                            message: trim(val(cur.sbField))
                        };
                    switch (cur.sbShParam && (s.share_param = cur.sbShParam), e) {
                        case 1:
                            var d = cur.wdd && cur.wdd.like_club_dd;
                            if (!d || !d.selCount) return elfocus("like_club_inp");
                            for (var r in d.selected) a = intval(r.replace(/_$/, ""));
                        case 0:
                            vk.widget && 4 !== vk.widget ? (window.allowCallback = function() {
                                ajax.post("like.php", Wall.fixPostParams(extend(s, {
                                    act: "a_do_publish",
                                    from: "box",
                                    to: a,
                                    hash: cur.sbShareHash,
                                    object: cur.sbObj,
                                    list: cur.sbList,
                                    ref: cur.section,
                                    ret_data: 1
                                })), ShareBox.options()), cur.shareAction = "publish"
                            }, Widgets.popupBoxOpen("like.php", {
                                act: "a_allow_publish_box",
                                to: a,
                                object: cur.sbObj,
                                list: cur.sbList
                            }, "vk_allow", {
                                height: 171
                            })) : (ajax.post("like.php", Wall.fixPostParams(extend(s, {
                                act: "a_do_publish",
                                from: "box",
                                to: a,
                                hash: cur.sbShareHash,
                                object: cur.sbObj,
                                list: cur.sbList,
                                ref: cur.section,
                                ret_data: 1
                            })), ShareBox.options()), cur.shareAction = "publish");
                            break;
                        case 2:
                            var d = cur.wdd && cur.wdd.like_mail_dd,
                                s = extend(s, {
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
                            if (!d || !d.selCount) return elfocus("like_mail_inp");
                            for (var r in d.selected) s.to_ids.push(r.replace(/_$/, ""));
                            s.to_ids = s.to_ids.join(","), ajax.post("al_im.php", Wall.fixPostParams(s), ShareBox.options()), cur.shareAction = "im_send"
                    }
                }
            },
            sbCheckLen: function(e) {
                checkTextLength(4096, e, "like_share_warn");
                var a = cur.wdd && cur.wdd.like_mail_dd,
                    i = a && a.full && 1 == a.selCount;
                toggle("like_share_title_wrap", a && 2 == radioBtns.like_share.val && (e.lastLen > 200 && !i || val("like_share_title")) ? !0 : !1)
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
        radiobtn(e, a, "like_share"), getLang("title_for_all") && val("dark_box_topic", getLang(2 > a ? "title_for_all" : "title_for_mail")), val("like_share_title_header", getLang(2 > a ? "like_select_comment" : "likes_select_message")), each(geByClass("_like_share_about_select", curBox().bodyNode), function() {
            hide(this)
        }), show(domNS(e));
        var s = cur.sbField && data(cur.sbField, "composer");
        if (s && s.addMedia) {
            var d = s.addMedia.menu;
            if (1 == a || 0 == a && cur.sbShareOwn) {
                var r = [],
                    o = 1 == a;
                each(d.types, function(e, a) {
                    "mark_as_ads" === a[0] && (o && s.addMedia.markAsAds || !o) || r.push(a)
                }), d.setItems(r), show(geByClass1("add_media_type_" + s.addMedia.lnkId + "_postpone", s.addMedia.menu.menuNode, "a")), cur.sbPostponeDate && "postpone" == s.addMedia.chosenMedia[0] && s.addMedia.chosenMediaData && (s.addMedia.chosenMediaData.date = cur.sbPostponeDate, s.addMedia.chooseMedia("postpone", s.addMedia.chosenMedia[1], s.addMedia.chosenMediaData), hide(domFC(ge("like_share_add_media"))), cur.sbPostponeDate = !1), s.addMedia.postponePreview && show(domPN(s.addMedia.postponePreview)), s.addMedia.markAsAds && (o ? show(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview")))) : hide(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview")))))
            } else {
                var r = [];
                each(d.types, function(e, a) {
                    "postpone" !== a[0] && "mark_as_ads" !== a[0] && r.push(a)
                }), d.setItems(r), hide(geByClass1("add_media_type_" + s.addMedia.lnkId + "_postpone", s.addMedia.menu.menuNode, "a")), s.addMedia.chosenMedia && "postpone" == s.addMedia.chosenMedia[0] && (cur.sbPostponeDate = val("postpone_date" + s.addMedia.lnkId), val("like_share_media_preview", ""), show(domFC(ge("like_share_add_media")))), s.addMedia.postponePreview && hide(domPN(s.addMedia.postponePreview)), s.addMedia.markAsAds && hide(domPN(geByClass1("page_preview_mark_as_ads_wrap", ge("like_share_media_preview"))))
            }
        }
        if (i !== !0) switch (a) {
            case 0:
                if (!cur.sbHidden) {
                    var t = Fx.Transitions.easeOutCubic,
                        n = 150,
                        l = "ease-out";
                    cssAnim(cur.sbAva, extend({
                        opacity: 0
                    }, ShareBox.mrg(-26)), {
                        duration: n,
                        transition: t,
                        func: l
                    }, hide.pbind(cur.sbAva)), cssAnim(ge("dark_box_topic"), ShareBox.mrg(0), {
                        duration: n,
                        transition: t,
                        func: l
                    }), cur.sbHidden = !0
                }
                elfocus(cur.sbField);
                break;
            case 1:
            case 2:
                var c = 1 == a ? "like_club_dd" : "like_mail_dd";
                cur.wdd[c].selCount ? elfocus(cur.sbField) : WideDropdown.focus(c), WideDropdown.updimgs(c)
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