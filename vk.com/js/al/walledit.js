var WallEdit = {
    handleEditEsc: function(e) {
        e.keyCode == KEY.ESC && WallEdit.cancelEditPost()
    },
    editPostDisableSign: function(e) {
        if (!e.no_sign) {
            var t = ge("wpe_signed");
            e.no_sign = !0, checkbox(t, !1), disable(t, !0)
        }
    },
    editPost: function(e, t, i, o, s, n) {
        if (!window.Emoji) return stManager.add([jsc("web/emoji.js"), "notifier.css"], function() {
            WallEdit.editPost(e, t, i, o, s, n)
        }), !1;
        var a = ge("wpe_text");
        if (cur.editingPost && (cur.editingPost[0] != e || cur.editingPost[1]) && a) return window.Emoji ? Emoji.focus(a) : !1;
        var d, l, r = window.wkcur && wkcur.shown && wkcur.post == e ? geByClass1("_wall_post_cont", wkLayer) : ge("wpt" + e);
        d = "photo_comment" == s.reply ? ge("post" + e) : "video_comment" == s.reply ? ge("mv_comment" + e.replace(/(\d+)video_(\d+)mv/, "$1_$2")) : "market_comment" == s.reply ? ge("market_comment" + e.replace(/(\d+)market_(\d+)/, "$1_$2")) : ge("post" + e), l = s.wkview ? "wl_post_actions_wrap" : s.reply ? "wpe_bottom" + e : geByClass1("ui_actions_menu_wrap", d), addClass(d, "wpe_wrap");
        var c = geByClass1("post_edit_button", d) || geByClass1("reply_edit_button", d);
        c && setStyle(c, {
            visibility: "hidden"
        }), cur.editingPost = [e, r, l, s];
        var p = null;
        s.wkview ? (p = geByClass1("post_author", ge("wl_post"), "div"), WkView.wallOnEdit(e, s)) : p = geByClass1(s.reply ? "reply_author" : "post_author", d), hide(geByClass1("wall_signed", domPN(r)));
        var _ = ce("span", {
                className: "wpe_info"
            }),
            u = geByClass1(s.reply ? "like_wrap" : "post_full_like_wrap", d, "div"),
            w = ge("post_publish_wrap" + e);
        p && (re(geByClass1("wpe_info", p)), cur.editingPost.push(p.appendChild(_))), cur.editingPost.push(u), cur.editingPost.push(w), cur.lang = extend(cur.lang || {}, s.lang), cur.options = extend(cur.options || {}, {
            share: s.share
        }), cur.editHash = o, val(_, " - " + (s.reply ? getLang("wall_editing_reply") : getLang("wall_editing_post"))), addEvent(window, "keydown", WallEdit.handleEditEsc), t = Emoji.emojiToHTML(clean(replaceEntities(t)), !0);
        var g = "";
        s.signed && !s.no_sign && (g += '<div id="wpe_signed" class="checkbox' + (s.signed > 0 ? " on" : "") + '" onclick="checkbox(this)">' + getLang("wall_suggest_subscribe") + "</div>"), s.post_settings && (g += s.post_settings), g && (g = '<div class="post_edit_settings_wrap"><div class="post_settings"><span onmouseover="Wall.showPostSettings(this);" onclick="Wall.showPostSettings(this, event);" class="post_settings checkbox_pic" tabindex="0" role="button"></span><span class="_post_settings_items">' + g + "</span></div></div>");
        browser.opera_mobile ? "blur" : "keyup";
        r.parentNode.insertBefore(ce("div", {
            id: "wpe_cont",
            innerHTML: '<div class="clear_fix"><div class="wpe_text_cont _emoji_field_wrap"><div class="emoji_smile_wrap _emoji_wrap"><div class="emoji_smile _emoji_btn" title="' + stripHTML(getLang("wall_reply_emoji_hint")) + '" onmouseover="return WallEdit.emojiShowTT(this, event);" onmouseout="return WallEdit.emojiHideTT(this, event);" onmousedown="return cancelEvent(event);"><div class="emoji_smile_icon"></div></div></div><div id="wpe_text" class="dark" contenteditable="true">' + t + '</div></div></div><div id="wpe_warn"></div><div id="wpe_media_preview" class="clear_fix media_preview"></div>' + (s.add ? '<div class="wpe_auth">' + s.add + "</div>" : "") + '<div class="wpe_buttons">' + (s.noatt ? "" : '<div id="wpe_add_media" class="page_add_media"><span class="add_media_lnk"></span></div>') + "  " + g + '  <button id="wpe_save" class="flat_button" onclick="WallEdit.savePost()">' + (w && intval(w.getAttribute("data-suggest")) ? getLang("wall_publish_suggest") : getLang("global_save")) + '</button>  <button class="wpe_cancel flat_button secondary button_light" onclick="WallEdit.cancelEditPost()">' + getLang("global_cancel") + "</button></div>"
        }, {
            display: "none"
        }), r), updateAriaElements();
        var m = {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            v = function() {
                var e = ge("wpe_text");
                return Emoji.init(e, {
                    ttDiff: -48,
                    rPointer: !0,
                    controlsCont: e.parentNode,
                    shouldFocus: !0,
                    ref: "post",
                    onChange: s.check_sign && !s.no_sign && WallEdit.editPostDisableSign.pbind(s),
                    onSend: function() {
                        WallEdit.savePost()
                    },
                    noEnterSend: !0,
                    noStickers: !0,
                    checkEditable: function() {
                        Wall.checkPostLen.pbind(e, "wpe_warn", Emoji.val(e))
                    },
                    initUploadForImagePasteCallback: window.Page ? Page.initUploadForImagePaste : void 0
                })
            };
        return s.noatt ? void setTimeout(function() {
            addClass("wpe_media_preview", "med_no_attach"), show(r.previousSibling, "wpe_media_preview"), hide(r, l, u, w), cur.wallEditComposer = Composer.init(ge("wpe_text"), {
                lang: m
            }), Emoji.editableFocus("wpe_text"), cur.weEmoji = v()
        }, 0) : void setTimeout(function() {
            show(r.previousSibling), hide(r, l, u, w);
            var t, o = [],
                a = [];
            s.reply ? (each(n, function() {
                inArray(this[0], ["photo", "video", "audio", "doc", "link"]) && o.push(this)
            }), a = ["album"]) : s.copy ? (each(n, function() {
                inArray(this[0], ["photo", "video", "audio", "doc", "postpone", "mark_as_ads"]) && o.push(this)
            }), a = ["album", "share", "link", "page"]) : o = n, o.length > 0 && (t = {
                lnk: ge("wpe_add_media").firstChild,
                preview: "wpe_media_preview",
                types: o,
                options: extend({
                    toId: e.split("_")[0],
                    disabledTypes: a,
                    limit: s.copy ? 1 : s.reply ? 2 : 10,
                    toggleLnk: s.reply || s.copy,
                    editable: !s.reply && !s.copy,
                    sortable: !s.reply && !s.copy,
                    from: s.reply ? "comment" : "post"
                }, s.media_opts || {})
            }, s.teWidth && (t.options.teWidth = s.teWidth), s.teHeight && (t.options.teHeight = s.teHeight), ("photo_comment" == s.reply || "video_comment" == s.reply) && (t.options.nocl = 1), "photo_comment" == s.reply && (t.options.maxShown = 0, t.options.hideAfterCount = 0));
            var c = ge("wpe_text"),
                p = [];
            if (s.reply || s.copy || !cur.postFieldZoomText || (addEvent(c, "keydown paste", function() {
                    setTimeout(function() {
                        cur.postFieldZoomText(c)
                    }, 0)
                }), p.push(function() {
                    setTimeout(function() {
                        cur.postFieldZoomText(c)
                    }, 10)
                })), s.check_sign && !s.no_sign && p.push(function(e, t) {
                    e._media_added && "postpone" !== t && WallEdit.editPostDisableSign(e)
                }.pbind(s)), p.length && (t.options.onAddMediaChange = function(e, t) {
                    each(e, function(e, i) {
                        i(t)
                    })
                }.pbind(p)), cur.wallEditComposer = Composer.init(c, {
                    lang: m,
                    media: t,
                    edit: !0
                }), t) {
                cur.wallEditMedia = cur.dropboxAddMedia = cur.wallEditComposer.addMedia, WallUpload.attachToEl(d);
                for (var _ = 0, g = i.length; g > _; ++_) cur.wallEditMedia.chooseMedia.apply(cur.wallEditMedia, i[_]), "postpone" == i[_][0] && cur.editingPost.push(i[_][1])
            }
            setTimeout(function(e) {
                e._media_added = !0
            }.pbind(s), 0), cur.weEmoji = v(), cur.onEditFormSizeUpdate && cur.onEditFormSizeUpdate(), !s.reply && !s.copy && cur.postFieldZoomText && cur.postFieldZoomText(c), window._videoLastInlined[0] && isAncestor(window._videoLastInlined[0], d) && revertLastInlineVideo()
        }, 0)
    },
    emojiShowTT: function(e, t) {
        return void 0 === cur.weEmoji ? !1 : Emoji.ttShow(cur.weEmoji, e, t)
    },
    emojiHideTT: function(e, t) {
        return void 0 === cur.weEmoji ? !1 : Emoji.ttHide(cur.weEmoji, e, t)
    },
    cancelEditPost: function(e, t, i) {
        if (cur.editingPost) {
            var o = cur.editingPost[0],
                s = ge(cur.editingPost[1]),
                n = ge(cur.editingPost[2]),
                a = cur.editingPost[3],
                d = ge("wpe_save"),
                l = cur.editingPost[4],
                r = cur.editingPost[5],
                c = cur.editingPost[6],
                p = cur.editingPost[7];
            if (o && s && d && !buttonLocked(d)) {
                var _ = ge("wpe_text");
                if (0 === e) return window.Emoji ? Emoji.focus(_) : !1;
                cur.editingPost = cur.dropboxAddMedia = !1, removeEvent(window, "keydown", WallEdit.handleEditEsc), WallUpload.attachToEl("submit_post_box"), Wall.deinitComposer(_);
                var u = ge("wpe_add_media");
                u && cleanElems(u.firstChild);
                var w = ge("post" + o),
                    g = geByClass1("post_edit_button", w) || geByClass1("reply_edit_button", w);
                if (g && setStyle(g, {
                        visibility: ""
                    }), removeClass(w, "wpe_wrap"), -1 == e) return void Wall.postponedPublished(o);
                if (void 0 !== e) {
                    val(s, e), val(l, " - " + (a && a.reply ? getLang("wall_reply_saved") : getLang("wall_post_saved")));
                    var m = geByClass1("rel_date", w);
                    if (p) {
                        t && m && (m.innerHTML = t);
                        var v = geByClass1("page_fronly", o);
                        i && !v ? l.nextSibling ? l.parentNode.insertBefore(se(i), l.nextSibling) : l.parentNode.appendChild(se(i)) : !i && v && re(v)
                    }
                    setTimeout(animate.pbind(l, {
                        opacity: 0
                    }, 500, re.pbind(l)), 1500), o.match(/^-?\d+photo_/) ? window.Photoview && Photoview.commSaved(o) : o.match(/^-?\d+video_/) && window.Videoview && Videoview.commSaved(o)
                } else re(l);
                show(n, s, r, c), show(geByClass1("wall_signed", domPN(s))), re(s.previousSibling), a.wkview && WkView.wallOnEdited(o), "exchange" == a.from && re("exchange_msg");
                var h = window.audioPlayer;
                h && h.showCurrentTrack && h.showCurrentTrack()
            }
        }
    },
    savePostFailed: function(e) {
        var t = ge("wpe_cont"),
            i = geByClass1("wpe_error", t);
        return i || (i = se('<div class="wpe_error error"><div>'), t.insertBefore(i, domFC(t))), val(i, e || getLang("global_unknown_error")), isVisible(i) || (slideDown(i, 100), vk.widget && cur.scrollbar && cur.scrollbar.scrollIntoView(i, 100)), !0
    },
    savePost: function(e) {
        if (cur.editingPost) {
            var t = cur.editingPost[0],
                i = ge("wpe_save"),
                o = cur.editingPost[3],
                s = cur.editingPost[6];
            if (t && i && !buttonLocked(i)) {
                window.Wall && Wall.updatePostAuthorData(t);
                var n = cur.wallEditComposer,
                    a = cur.wallEditMedia || {},
                    d = Composer.getSendParams(n, WallEdit.savePost.pbind(e)),
                    l = cur.onepost ? "one" : (window.wkcur || {}).shown ? "wk" : "";
                if (o.from ? l = o.from : t.match(/^-?\d+photo_/) && cur.pvShown ? l = "photo" : t.match(/^-?\d+video_/) && window.mvcur && mvcur.mvShown && !mvcur.minimized ? l = "video" : t.match(/^-?\d+market_/) && ge("market_comments_wrap") && (l = "market"), !d.delayed) {
                    var r;
                    if ((r = ge("status_export" + a.lnkId)) && (d.status_export = isChecked(r)), (r = ge("facebook_export" + a.lnkId)) && (d.facebook_export = isChecked(r)), (r = ge("friends_only" + a.lnkId)) && (d.friends_only = isChecked(r)), !d.attach1_type && !d.message && !o.copy) return window.Emoji ? Emoji.focus(ge("wpe_text")) : !1;
                    o.save_result_type && (d.save_result_type = o.save_result_type);
                    var c = ge("wpe_cont"),
                        p = geByClass1("wpe_error", c);
                    p && hide(p), s && intval(s.getAttribute("data-suggest")) ? (extend(d, {
                        act: "post",
                        suggest: t,
                        signed: isChecked("wpe_signed"),
                        close_comments: ge("wpe_close_comments") ? isChecked("wpe_close_comments") ? 1 : 0 : "",
                        mute_notifications: ge("wpe_mute_notifications") ? isChecked("wpe_mute_notifications") ? 1 : 0 : "",
                        hash: cur.editHash,
                        to_id: t.split("_")[0]
                    }), ajax.post("al_wall.php", Wall.fixPostParams(d), {
                        showProgress: lockButton.pbind(i),
                        hideProgress: unlockButton.pbind(i),
                        onDone: Wall.suggestPublished.pbind(t),
                        onFail: WallEdit.savePostFailed,
                        noSort: !0
                    })) : (extend(d, {
                        act: "save",
                        post: t,
                        whole: 1,
                        hash: cur.editHash,
                        signed: isChecked("wpe_signed"),
                        close_comments: ge("wpe_close_comments") ? isChecked("wpe_close_comments") ? 1 : 0 : "",
                        from: l
                    }), vk.widget && cur.options && extend(d, {
                        max_w: cur.options.max_w,
                        reply_max_w: cur.options.reply_max_w,
                        from: cur.options.from
                    }), ajax.post("al_wall.php", Wall.fixPostParams(d), {
                        showProgress: lockButton.pbind(i),
                        hideProgress: unlockButton.pbind(i),
                        onDone: function() {
                            if (ge("wpe_close_comments")) {
                                var i = ge("post" + t);
                                Wall.onCloseComments(d.close_comments, i)
                            }
                            return e ? void e.apply(window, arguments) : void WallEdit.cancelEditPost.apply(window, arguments)
                        },
                        onFail: WallEdit.savePostFailed,
                        noSort: !0
                    }))
                }
            }
        }
    }
};
try {
    stManager.done("walledit.js")
} catch (e) {}