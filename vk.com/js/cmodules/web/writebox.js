﻿! function(e) {
    function t(t) {
        for (var o, n, c = t[0], u = t[1], d = t[2], m = 0, s = []; m < c.length; m++) n = c[m], i[n] && s.push(i[n][0]), i[n] = 0;
        for (o in u) Object.prototype.hasOwnProperty.call(u, o) && (e[o] = u[o]);
        for (l && l(t); s.length;) s.shift()();
        return a.push.apply(a, d || []), r()
    }

    function r() {
        for (var e, t = 0; t < a.length; t++) {
            for (var r = a[t], o = !0, c = 1; c < r.length; c++) {
                var u = r[c];
                0 !== i[u] && (o = !1)
            }
            o && (a.splice(t--, 1), e = n(n.s = r[0]))
        }
        return e
    }
    var o = {},
        i = {
            "web/writebox": 0
        },
        a = [];

    function n(t) {
        if (o[t]) return o[t].exports;
        var r = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = o, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "";
    var c = window.webpackJsonp = window.webpackJsonp || [],
        u = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var d = 0; d < c.length; d++) t(c[d]);
    var l = u;
    a.push([173, "bundles/common", "bundles/37d6fe1fee6fb6accf5867cbca2cda9c"]), r()
}({
    173: function(e, t, r) {
        e.exports = r("rUY3")
    },
    N1NS: function(e, t, r) {
        "use strict";
        r("rGqo"), r("Btvt"), r("KKXr");
        var o = new window.Map;

        function i(e) {
            var t = o.get(e.currentTarget);
            if (t) {
                var r = t[e.type];
                if (r)
                    for (var i, a = 0; a < r.length; a++) {
                        var [n, c] = r[a], u = void 0;
                        if (hasClass(e.target, n) ? u = c(e, e.target) : (i = gpeByClass(n, e.target, e.currentTarget)) && (u = c(e, i)), !1 === u) break
                    }
            }
        }
        r.d(t, "b", function() {
            return c
        }), r.d(t, "a", function() {
            return d
        }), r.d(t, "c", function() {
            return l
        });
        var {
            addEvent: a,
            removeEvent: n
        } = window;

        function c(e) {
            return {
                callMutations() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations(...t) {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e(...t)
                }
            }
        }

        function u(e, t, r, a, n) {
            ! function(e, t, r, a) {
                var n = o.get(e);
                n || (o.set(e, {}), n = o.get(e));
                for (var c = t.split(" "), u = 0; u < c.length; u++) {
                    var d = c[u];
                    n[d] || (n[d] = [], addEvent(e, d, i)), n[d].push([r, a])
                }
            }(t, r, a, n), e._registeredHandlers.push(["delegate", t, r, a, n])
        }

        function d(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, r, o) {
                a(t, r, o), e._registeredHandlers.push(["bind", t, r, o])
            }.bind(null, t), u.bind(null, t)), t
        }

        function l(e) {
            e._registeredHandlers.forEach(e => {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, r, a) {
                    var n = o.get(e);
                    n && (t.split(" ").forEach(t => {
                        n[t] && (n[t] = n[t].filter(e => e[0] !== r || e[1] !== a), 0 === n[t].length && removeEvent(e, t, i))
                    }), 0 === Object.keys(n).map(e => n[e].length).reduce((e, t) => e + t) && o.delete(e))
                }(...t) : n(...t)
            }), e._registeredHandlers = []
        }
    },
    rUY3: function(e, t, r) {
        "use strict";
        r.r(t);
        r("pIFo");
        var o = r("uytb"),
            i = r("rjmT"),
            a = window.WriteBox = {
                mrg: function(e) {
                    return vk.rtl ? {
                        marginRight: e
                    } : {
                        marginLeft: e
                    }
                },
                show: function(e, t) {
                    var r = t.toData[0],
                        i = t.toData[7];
                    if (e.setOptions({
                            hideButtons: !0,
                            width: 502,
                            bodyStyle: "padding: 0px; border: 0px;",
                            title: t.title,
                            titleControls: ('<a class="mail_box_header_link" href="/im?sel=' + r + '" onclick="return WriteBox.toFull(event, ' + r + ')">' + t.mail_go_to_dialog + "</a>").replace("%s", i)
                        }), e.removeButtons(), cur.lang = extend(cur.lang || {}, t.lang), extend(cur, {
                            mbTxtInp: {},
                            mbEditable: t.editable,
                            mbSmile: ge("mbe_smile"),
                            toData: t.toData,
                            mbEmoji: t.emoji,
                            mbMedia: null,
                            mbField: ge(t.editable ? "mail_box_editable" : "mail_box_text"),
                            mbAva: ge("mail_box_ava"),
                            mbMediaTypes: t.mediaTypes,
                            mbTo: t.toData,
                            mbHash: t.hash,
                            mbBannedHim: t.bannedhim,
                            ldb: Object(o.c)(vk.id)
                        }), t.emojiRcnt && !cur.mbRcntEmoji) {
                        for (var n = [], c = t.emojiRcnt, u = 0, d = c.length; u < d; ++u) {
                            var l = c[u];
                            l && n.push('<a id="mbe_rc_em_' + l + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + l + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(l, !1, !0) + "</a>")
                        }
                        cur.mbRcntEmoji = n.join("")
                    }
                    cur.nav.push(() => {
                        cur.ldb.unmount()
                    }), val("mbe_rcemoji", cur.mbRcntEmoji || ""), cur.peer = a.getPeer(), cur.sharedImWrite = {}, cur.emojiWId = Emoji.init(cur.mbField, {
                        ttDiff: 1,
                        controlsCont: ge("mbe_emoji_wrap"),
                        shouldFocus: !0,
                        onSend: a.send,
                        rPointer: !0,
                        noEnterSend: 1,
                        ref: "writebox",
                        noStickers: !!t.checkedRecipent,
                        forceTxt: !t.editable,
                        sharedTT: cur.sharedImWrite,
                        txt: ge("mail_box_editable"),
                        checkEditable: a.checkEditable,
                        saveDraft: a.saveDraft,
                        rceCont: ge("mbe_rcemoji_cont"),
                        addMediaBtn: ge("mail_box_add_row"),
                        sendWrap: ge("mail_box_controls"),
                        onKeyAction: function(e) {
                            clearTimeout(cur.saveWriteBoxDraft);
                            var t = "paste" == e.type ? 0 : 300;
                            cur.saveWriteBoxDraft = setTimeout(a.saveDraft, t)
                        },
                        onStickerSend: function(e, t) {
                            var r = trim(Emoji.editableVal(cur.mbField)),
                                o = cur.mbMedia.getMedias(),
                                i = cur.toData[0];
                            ajax.post("/al_im.php", {
                                act: "a_send_box",
                                to_ids: i,
                                chas: cur.mbHash,
                                msg: "",
                                ts: cur.ts,
                                media: "sticker:" + e,
                                send_sticker: 1,
                                from: "box",
                                sticker_referrer: t
                            }, {
                                onDone: function(e, t) {
                                    r || o.length ? a.send(!1) : (t && ls.set("im_draft" + vk.id + "_" + t, !1), curBox().hide(), showDoneBox(e))
                                },
                                showProgress: lockButton.pbind("mail_box_send"),
                                hideProgress: unlockButton.pbind("mail_box_send"),
                                onFail: function(e) {
                                    var t = showFastBox(getLang("global_error"), e).hide;
                                    return setTimeout(t, 3e3), !0
                                }
                            })
                        },
                        onRecentEmojiUpdate: function() {
                            a.extractEmoji()
                        }
                    }), Emoji.emojiLoadMore(cur.emojiWId), cur.mbTo[0] ? cur.mbHidden = !1 : cur.mbHidden = !0, cur.imwEmoji = -1;
                    var m = cur.postTo;
                    cur.postTo = !1, e.setOptions({
                        onHide: function() {
                            removeEvent(document, "keydown", a.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                        },
                        onShow: function() {
                            addEvent(document, "keydown", a.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                        },
                        onClean: function() {
                            clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = m, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
                        }
                    }), addEvent(document, "keydown", a.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), stManager.add(["page.js", "page.css"], function() {
                        var t = {
                            mail: 1,
                            nocl: 1,
                            editable: 1,
                            sortable: 1,
                            teWidth: 150,
                            teHeight: 100,
                            toggleLnk: !0
                        };
                        cur.mbForceAttach && "market_item" == cur.mbForceAttach[0] && (t.onMediaAdd = function() {
                            for (var e in cur.mbMedia.chosenMedias)
                                if ("market" == cur.mbMedia.chosenMedias[e][0]) {
                                    var t = cur.mbMedia.chosenMedias[e][2];
                                    hide(geByClass1("page_media_x_wrap", t))
                                }
                        }), cur.mbMedia = new MediaSelector("mail_box_add_link", "mail_box_added_row", cur.mbMediaTypes, t), cur.mbMedia.onChange = function() {
                            e.changed = !0, setTimeout(function() {
                                a.saveDraft()
                            }, 100)
                        }, ls.checkVersion() && cur.mbTo[0] && a.restoreDraft(cur.mbTo[0])
                    })
                },
                getPeer: function() {
                    return intval(cur.toData[0])
                },
                restoreDraft: function(e) {
                    var t = a.getPeer();
                    if (!(!t || e && t != intval(e) || browser.mobile) && cur.mbMedia) {
                        var r = Object(i.b)(cur.ldb, t);
                        if (cur.mbForceAttach)
                            if ("market_item" == cur.mbForceAttach[0]) r.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), r.removeAllAttaches(), r.addAttach("market", cur.mbForceAttach[1]);
                            else if ("market_order" == cur.mbForceAttach[0]) {
                            var {
                                user_id: o,
                                order_id: n
                            } = cur.mbForceAttach[1];
                            r.setText(unclean(getLang("mail_order_tmpl")).replace(/<br>/g, "\n").replace("{id}", `${o}-${n}`).replace("{href}", `${window.location.host}/orders${o}_${n}`)), r.removeAllAttaches()
                        }
                        a.editableHasVal(cur.mbField) || (cur.mbEditable ? (Emoji.val(cur.mbField, clean(r.dData.txt)), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, clean(r.dData.txt))), r.prepareObjects().then(() => {
                            if (cur.mbField && a.getPeer() == t)
                                for (var e = r.dData.attaches, o = 0; o < e.length; o++) cur.mbMedia.chooseMedia(e[o].type, e[o].id, e[o].object || {}, null, !0)
                        }), a.checkEditable(cur.emojiWId, cur.mbField), a.checkLen(cur.mbField)
                    }
                },
                saveDraft: function() {
                    var e = a.getPeer();
                    if (e && cur.mbField) {
                        var t = Object(i.b)(cur.ldb, e);
                        t.setText(unclean(trim(Emoji.val(cur.mbField)))), t.removeAllAttaches(), cur.mbMedia.getMedias().forEach(e => t.addAttach(e[0], e[1])), t.destroy()
                    }
                },
                toFull: function(e, t) {
                    if (!checkEvent(e)) {
                        var r = {
                                0: "im",
                                sel: t
                            },
                            o = trim(Emoji.editableVal(cur.mbField));
                        if (o && (r.message = o), cur.mbMedia.chosenMedias) {
                            for (var i = cur.mbMedia.getMedias(), a = [], n = 0, c = i.length; n < c; ++n) {
                                var u = i[n],
                                    d = [];
                                for (var l in u) "object" != typeof u[l] && d.push(u[l]);
                                a.push(d.join(","))
                            }
                            r.media = a.join("*")
                        }
                        return nav.go(r, null, {
                            noback: !0
                        }), !1
                    }
                },
                send: function(e) {
                    if (!buttonLocked("mail_box_send")) {
                        var t = trim(Emoji.editableVal(cur.mbField)),
                            r = cur.mbMedia.getMedias();
                        cur.mbEditable && a.extractEmoji();
                        var o = {
                            act: "a_send_box",
                            chas: cur.mbHash,
                            message: t,
                            title: isVisible("mail_box_title_wrap") && val("mail_box_title") || "",
                            from: "box",
                            entrypoint: "friends" === cur.module ? "friends" : "writebox",
                            media: [],
                            to_ids: []
                        };
                        cur.mbForceAttach && (o.attach1_type = cur.mbForceAttach[0], o.attach1 = cur.mbForceAttach[1], o.attach1_hash = cur.mbForceAttach[2]);
                        for (var n, c = 0, u = r.length; c < u; ++c)(n = r[c]) && o.media.push(n[0] + ":" + n[1]);
                        if (o.media = o.media.join(","), !t && !o.media) return cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField);
                        o.to_ids = cur.toData[0], cur.mbBannedHim != o.to_ids || !0 === e ? ajax.post("al_im.php", o, {
                            onDone: function(e, t) {
                                if (t) {
                                    var r = Object(i.b)(cur.ldb, t);
                                    r.clear(), r.destroy()
                                }
                                curBox().hide(), showDoneBox(e)
                            },
                            showProgress: lockButton.pbind("mail_box_send"),
                            hideProgress: unlockButton.pbind("mail_box_send")
                        }) : showBox("al_profile.php", {
                            act: "banned_him",
                            action: "mail",
                            mid: cur.mbBannedHim
                        }, {
                            dark: 1
                        }).onContinue = a.send.pbind(!0)
                    }
                },
                checkLen: function(e) {
                    cur.mbTxtInp.value = Emoji.editableVal(e), checkTextLength(4096, cur.mbTxtInp, "mail_box_warn"), toggle("mail_box_title_wrap", cur.mbTxtInp.lastLen > 200)
                },
                codeToChr: function(e) {
                    for (var t = e.length / 4, r = "", o = 0; t--;) r += String.fromCharCode(parseInt(e.substr(o, 4), 16)), o += 4;
                    return r
                },
                editableHasVal: function(e) {
                    return !!e && ("TEXTAREA" == e.tagName ? !!val(e) : !(!geByTag1("IMG", e) && !stripHTML(val(e)).replace(/[\s\xa0]/g, "").length))
                },
                checkEditable: function(e, t) {
                    cur.mbEditable && Emoji.checkEditable(e, t, {
                        height: 180
                    })
                },
                cssAnimation: function() {
                    var e = intval(browser.version);
                    return !!(browser.chrome && e > 14 || browser.mozilla && e > 13 || browser.opera && e > 2)
                },
                onKey: function(e) {
                    var t = "INPUT" == e.target.tagName || "TEXTAREA" == e.target.tagName || "mail_box_editable" == e.target.id;
                    if (!isInputActive()) {
                        if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && !t)
                            if (cur.mbEditable) Emoji.editableFocus(cur.mbField, !1, !0);
                            else {
                                var r = cur.mbField;
                                !r.active && elfocus(r)
                            }
                        return !0
                    }
                },
                extractEmoji: function() {
                    var e = ge("mbe_rcemoji");
                    if (e) {
                        var t = "",
                            r = Emoji.getRecentEmojiSorted().slice(0, 7);
                        for (var o in r)
                            if (r.hasOwnProperty(o)) {
                                var i = r[o];
                                t += '<a id="mbe_rc_em_' + i + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + i + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(i, !1, !0) + "</a>"
                            }
                        val(e, t)
                    }
                }
            };
        try {
            stManager.done("writebox.js")
        } catch (e) {}
    }
});