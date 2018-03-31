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
    editPost: function(e, t, i, o, n, a) {
        if (!window.Emoji) return stManager.add(["emoji.js", "notifier.css"], function() {
            WallEdit.editPost(e, t, i, o, n, a)
        }), !1;
        var s = ge("wpe_text");
        if (cur.editingPost && (cur.editingPost[0] != e || cur.editingPost[1]) && s) return window.Emoji ? Emoji.focus(s) : !1;
        var d, r, l = window.wkcur && wkcur.shown && wkcur.post == e ? geByClass1("_wall_post_cont", wkLayer) : ge("wpt" + e);
        d = "photo_comment" == n.reply ? ge("post" + e) : "video_comment" == n.reply ? ge("mv_comment" + e.replace(/(\d+)video_(\d+)mv/, "$1_$2")) : "market_comment" == n.reply ? ge("market_comment" + e.replace(/(\d+)market_(\d+)/, "$1_$2")) : ge("post" + e), r = n.wkview ? "wl_post_actions_wrap" : n.reply ? "wpe_bottom" + e : geByClass1("ui_actions_menu_wrap", d), addClass(d, "wpe_wrap");
        var p = geByClass1("post_edit_button", d) || geByClass1("reply_edit_button", d);
        p && setStyle(p, {
            visibility: "hidden"
        }), cur.editingPost = [e, l, r, n];
        var c = null;
        n.wkview ? (c = geByClass1("post_author", ge("wl_post"), "div"), WkView.wallOnEdit(e, n)) : c = geByClass1(n.reply ? "reply_author" : "post_author", d), hide(geByClass1("wall_signed", domPN(l)));
        var u = ce("span", {
                className: "wpe_info"
            }),
            _ = geByClass1(n.reply ? "like_wrap" : "post_full_like_wrap", d, "div"),
            w = ge("post_publish_wrap" + e);
        c && (re(geByClass1("wpe_info", c)), cur.editingPost.push(c.appendChild(u))), cur.editingPost.push(_), cur.editingPost.push(w), cur.lang = extend(cur.lang || {}, n.lang), cur.options = extend(cur.options || {}, {
            share: n.share
        }), cur.editHash = o, val(u, " - " + (n.reply ? getLang("wall_editing_reply") : getLang("wall_editing_post"))), addEvent(window, "keydown", WallEdit.handleEditEsc), t = Emoji.emojiToHTML(clean(replaceEntities(t)), !0);
        browser.opera_mobile ? "blur" : "keyup";
        l.parentNode.insertBefore(ce("div", {
            id: "wpe_cont",
            innerHTML: '<div class="clear_fix"><div class="wpe_text_cont _emoji_field_wrap"><div class="emoji_smile_wrap _emoji_wrap"><div class="emoji_smile _emoji_btn" title="' + stripHTML(getLang("wall_reply_emoji_hint")) + '" onmouseover="return WallEdit.emojiShowTT(this, event);" onmouseout="return WallEdit.emojiHideTT(this, event);" onmousedown="return cancelEvent(event);"><div class="emoji_smile_icon"></div></div></div><div id="wpe_text" class="dark" contenteditable="true">' + t + '</div></div></div><div id="wpe_warn"></div><div id="wpe_media_preview" class="clear_fix media_preview"></div>' + (n.signed && !n.no_sign ? '<div id="wpe_signed" class="checkbox' + (n.signed > 0 ? " on" : "") + '" onclick="checkbox(this)">' + getLang("wall_suggest_subscribe") + "</div>" : "") + (n.add ? '<div class="wpe_auth">' + n.add + "</div>" : "") + '<div class="wpe_buttons">' + (n.noatt ? "" : '<div id="wpe_add_media" class="page_add_media"><span class="add_media_lnk"></span></div>') + '<button id="wpe_save" class="flat_button" onclick="WallEdit.savePost()">' + (w && intval(w.getAttribute("data-suggest")) ? getLang("wall_publish_suggest") : getLang("global_save")) + '</button>  <button class="wpe_cancel flat_button secondary button_light" onclick="WallEdit.cancelEditPost()">' + getLang("global_cancel") + "</button></div>"
        }, {
            display: "none"
        }), l);
        var g = {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            m = function() {
                var e = ge("wpe_text");
                return Emoji.init(e, {
                    ttDiff: -48,
                    rPointer: !0,
                    controlsCont: e.parentNode,
                    shouldFocus: !0,
                    ref: "post",
                    onChange: n.check_sign && !n.no_sign && WallEdit.editPostDisableSign.pbind(n),
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
        return n.noatt ? void setTimeout(function() {
            addClass("wpe_media_preview", "med_no_attach"), show(l.previousSibling, "wpe_media_preview"), hide(l, r, _, w), cur.wallEditComposer = Composer.init(ge("wpe_text"), {
                lang: g
            }), Emoji.editableFocus("wpe_text"), cur.weEmoji = m()
        }, 0) : void setTimeout(function() {
            show(l.previousSibling), hide(l, r, _, w);
            var t, o = [],
                s = [];
            n.reply ? (each(a, function() {
                inArray(this[0], ["photo", "video", "audio", "doc", "link"]) && o.push(this)
            }), s = ["album"]) : n.copy ? (each(a, function() {
                inArray(this[0], ["photo", "video", "audio", "doc", "postpone", "mark_as_ads"]) && o.push(this)
            }), s = ["album", "share", "link", "page"]) : o = a, o.length > 0 && (t = {
                lnk: ge("wpe_add_media").firstChild,
                preview: "wpe_media_preview",
                types: o,
                options: extend({
                    toId: e.split("_")[0],
                    disabledTypes: s,
                    limit: n.copy ? 1 : n.reply ? 2 : 10,
                    toggleLnk: n.reply || n.copy,
                    editable: !n.reply && !n.copy,
                    sortable: !n.reply && !n.copy
                }, n.media_opts || {})
            }, n.teWidth && (t.options.teWidth = n.teWidth), n.teHeight && (t.options.teHeight = n.teHeight), ("photo_comment" == n.reply || "video_comment" == n.reply) && (t.options.nocl = 1), "photo_comment" == n.reply && (t.options.maxShown = 0, t.options.hideAfterCount = 0));
            var p = ge("wpe_text"),
                c = [];
            if (n.reply || n.copy || !cur.postFieldZoomText || (addEvent(p, "keydown paste", function() {
                    setTimeout(function() {
                        cur.postFieldZoomText(p)
                    }, 0)
                }), c.push(function() {
                    setTimeout(function() {
                        cur.postFieldZoomText(p)
                    }, 10)
                })), n.check_sign && !n.no_sign && c.push(function(e, t) {
                    e._media_added && "postpone" !== t && WallEdit.editPostDisableSign(e)
                }.pbind(n)), c.length && (t.options.onAddMediaChange = function(e, t) {
                    each(e, function(e, i) {
                        i(t)
                    })
                }.pbind(c)), cur.wallEditComposer = Composer.init(p, {
                    lang: g,
                    media: t,
                    edit: !0
                }), t) {
                cur.wallEditMedia = cur.dropboxAddMedia = cur.wallEditComposer.addMedia, WallUpload.attachToEl(d);
                for (var u = 0, v = i.length; v > u; ++u) cur.wallEditMedia.chooseMedia.apply(cur.wallEditMedia, i[u]), "postpone" == i[u][0] && cur.editingPost.push(i[u][1])
            }
            setTimeout(function(e) {
                e._media_added = !0
            }.pbind(n), 0), cur.weEmoji = m(), cur.onEditFormSizeUpdate && cur.onEditFormSizeUpdate(), !n.reply && !n.copy && cur.postFieldZoomText && cur.postFieldZoomText(p), window._videoLastInlined[0] && isAncestor(window._videoLastInlined[0], d) && revertLastInlineVideo()
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
                n = ge(cur.editingPost[1]),
                a = ge(cur.editingPost[2]),
                s = cur.editingPost[3],
                d = ge("wpe_save"),
                r = cur.editingPost[4],
                l = cur.editingPost[5],
                p = cur.editingPost[6],
                c = cur.editingPost[7];
            if (o && n && d && !buttonLocked(d)) {
                var u = ge("wpe_text");
                if (0 === e) return window.Emoji ? Emoji.focus(u) : !1;
                cur.editingPost = cur.dropboxAddMedia = !1, removeEvent(window, "keydown", WallEdit.handleEditEsc), WallUpload.attachToEl("submit_post_box"), Wall.deinitComposer(u);
                var _ = ge("wpe_add_media");
                _ && cleanElems(_.firstChild);
                var w = ge("post" + o),
                    g = geByClass1("post_edit_button", w) || geByClass1("reply_edit_button", w);
                if (g && setStyle(g, {
                        visibility: ""
                    }), removeClass(w, "wpe_wrap"), -1 == e) return void Wall.postponedPublished(o);
                if (void 0 !== e) {
                    val(n, e), val(r, " - " + (s && s.reply ? getLang("wall_reply_saved") : getLang("wall_post_saved")));
                    var m = geByClass1("rel_date", w);
                    if (c) {
                        t && m && (m.innerHTML = t);
                        var v = geByClass1("page_fronly", o);
                        i && !v ? r.nextSibling ? r.parentNode.insertBefore(se(i), r.nextSibling) : r.parentNode.appendChild(se(i)) : !i && v && re(v)
                    }
                    setTimeout(animate.pbind(r, {
                        opacity: 0
                    }, 500, re.pbind(r)), 1500), o.match(/^-?\d+photo_/) ? window.Photoview && Photoview.commSaved(o) : o.match(/^-?\d+video_/) && window.Videoview && Videoview.commSaved(o)
                } else re(r);
                show(a, n, l, p), show(geByClass1("wall_signed", domPN(n))), re(n.previousSibling), s.wkview && WkView.wallOnEdited(o), "exchange" == s.from && re("exchange_msg");
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
                n = cur.editingPost[6];
            if (t && i && !buttonLocked(i)) {
                window.Wall && Wall.updatePostAuthorData(t);
                var a = cur.wallEditComposer,
                    s = cur.wallEditMedia || {},
                    d = Composer.getSendParams(a, WallEdit.savePost.pbind(e)),
                    r = cur.onepost ? "one" : (window.wkcur || {}).shown ? "wk" : "";
                if (o.from ? r = o.from : t.match(/^-?\d+photo_/) && cur.pvShown ? r = "photo" : t.match(/^-?\d+video_/) && window.mvcur && mvcur.mvShown && !mvcur.minimized ? r = "video" : t.match(/^-?\d+market_/) && ge("market_comments_wrap") && (r = "market"), !d.delayed) {
                    var l;
                    if ((l = ge("status_export" + s.lnkId)) && (d.status_export = isChecked(l)), (l = ge("facebook_export" + s.lnkId)) && (d.facebook_export = isChecked(l)), (l = ge("friends_only" + s.lnkId)) && (d.friends_only = isChecked(l)), !d.attach1_type && !d.message && !o.copy) return window.Emoji ? Emoji.focus(ge("wpe_text")) : !1;
                    o.save_result_type && (d.save_result_type = o.save_result_type);
                    var p = ge("wpe_cont"),
                        c = geByClass1("wpe_error", p);
                    c && hide(c), n && intval(n.getAttribute("data-suggest")) ? (extend(d, {
                        act: "post",
                        suggest: t,
                        signed: isChecked("wpe_signed"),
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
                        from: r
                    }), vk.widget && cur.options && extend(d, {
                        max_w: cur.options.max_w,
                        reply_max_w: cur.options.reply_max_w,
                        from: cur.options.from
                    }), ajax.post("al_wall.php", Wall.fixPostParams(d), {
                        showProgress: lockButton.pbind(i),
                        hideProgress: unlockButton.pbind(i),
                        onDone: function() {
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