﻿! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    e.exports = n(5)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        for (var n = void 0, r = 0, a = e; null !== (n = d.MESSAGE_REGEXP.exec(e));) {
            var i = n[0].length,
                s = n.index + i,
                u = e[n.index - 1],
                c = e[s - 1],
                l = void 0 !== u && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(u),
                m = void 0 !== c && /([:;$])/i.test(c);
            if (!l && !m) {
                var f = o(n),
                    _ = f.domain;
                if (_.length <= d.MAX_DOMAIN_LENGTH && -1 !== d.TOP_DOMAINS.indexOf(_)) {
                    var p = t(f);
                    a = a.slice(0, n.index + r) + p + a.slice(s + r), r += p.length - i
                }
            }
        }
        return a
    }

    function a(e, t) {
        return e.replace(d.EMAIL, t || function(e) {
            return '<a href="mailto:' + e + '">' + e + "</a>"
        })
    }

    function i(e, t) {
        return e.replace(d.MENTION, t || function(e, t, n, r, a) {
            return '<a href="/' + (t + n) + '" class="mem_link" mention="' + m(r || "") + '" mention_id="' + m(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + a + "</a>"
        })
    }

    function o(e) {
        return {
            full: e[0],
            protocol: e[1] || "http://",
            url: e[2],
            domain: e[4],
            query: e[6] || ""
        }
    }

    function s(e) {
        _("ttl_message_confirm_delivery", e)
    }

    function u(e, t) {
        var n = t.protocol,
            r = t.url,
            a = t.query,
            i = t.domain,
            o = t.full;
        try {
            o = decodeURIComponent(o)
        } catch (s) {}
        if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = m(o).replace(/&amp;/g, "&"), !e && i.match(d.OUR_DOMAINS)) {
            r = f(r).replace(d.ENTITIES, encodeURIComponent);
            var u = r,
                l = r.indexOf("#/"),
                _ = "",
                p = void 0;
            return l >= 0 ? u = r.substr(l + 1) : (l = r.indexOf("#!"), l >= 0 && (u = "/" + r.substr(l + 2).replace(/^\//, ""))), p = u.match(d.VK_DOMAIN), p && p[1].length < 32 && (_ = ' mention_id="' + p[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + c(n + r + a) + '" target="_blank"' + _ + ">" + o + "</a>"
        }
        var g = "away.php?utf=1&to=" + encodeURIComponent(n + f(r + a)),
            h = m(n + r + a).replace(/'/g, "\\'"),
            v = "return goAway('" + h + "', {}, event);";
        return '<a href="' + g + '" target="_blank" onclick="' + v + '">' + o + "</a>"
    }

    function c(e) {
        return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.replaceHyperLinks = r, t.replaceEmailLinks = a, t.replaceMentions = i, t.confirmDelivery = s, t.linksReplacer = u;
    var d = n(122),
        l = window,
        m = l.clean,
        f = l.replaceEntities,
        _ = l.statlogsValueEvent
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, , , function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = n(98),
        i = n(37),
        o = window.WriteBox = {
            mrg: function(e) {
                return vk.rtl ? {
                    marginRight: e
                } : {
                    marginLeft: e
                }
            },
            show: function(e, t) {
                var n = t.toData[0],
                    r = t.toData[7];
                if (e.setOptions({
                        hideButtons: !0,
                        width: 502,
                        bodyStyle: "padding: 0px; border: 0px;",
                        title: t.title,
                        titleControls: ('<a class="mail_box_header_link" href="/im?sel=' + n + '" onclick="return WriteBox.toFull(event, ' + n + ')">' + t.mail_go_to_dialog + "</a>").replace("%s", r)
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
                        ldb: (0, a.mount)(vk.id)
                    }), t.emojiRcnt && !cur.mbRcntEmoji) {
                    for (var i = [], s = t.emojiRcnt, u = 0, c = s.length; c > u; ++u) {
                        var d = s[u];
                        d && i.push('<a id="mbe_rc_em_' + d + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + d + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(d, !1, !0) + "</a>")
                    }
                    cur.mbRcntEmoji = i.join("")
                }
                cur.nav.push(function() {
                    cur.ldb.unmount()
                }), val("mbe_rcemoji", cur.mbRcntEmoji || ""), cur.peer = o.getPeer(), cur.sharedImWrite = {}, cur.emojiWId = Emoji.init(cur.mbField, {
                    ttDiff: 1,
                    controlsCont: ge("mbe_emoji_wrap"),
                    shouldFocus: !0,
                    onSend: o.send,
                    rPointer: !0,
                    noEnterSend: 1,
                    noStickers: !!t.checkedRecipent,
                    forceTxt: !t.editable,
                    sharedTT: cur.sharedImWrite,
                    txt: ge("mail_box_editable"),
                    checkEditable: o.checkEditable,
                    saveDraft: o.saveDraft,
                    rceCont: ge("mbe_rcemoji_cont"),
                    addMediaBtn: ge("mail_box_add_row"),
                    sendWrap: ge("mail_box_controls"),
                    onKeyAction: function(e) {
                        clearTimeout(cur.saveWriteBoxDraft);
                        var t = "paste" == e.type ? 0 : 300;
                        cur.saveWriteBoxDraft = setTimeout(o.saveDraft, t)
                    },
                    onStickerSend: function(e, t) {
                        var n = trim(Emoji.editableVal(cur.mbField)),
                            r = cur.mbMedia.getMedias(),
                            a = cur.toData[0];
                        ajax.post("/al_im.php", {
                            act: "a_send_box",
                            to_ids: a,
                            chas: cur.mbHash,
                            msg: "",
                            ts: cur.ts,
                            media: "sticker:" + e,
                            send_sticker: 1,
                            from: "box",
                            sticker_referrer: t
                        }, {
                            onDone: function(e, t) {
                                n || r.length ? o.send(!1) : (t && ls.set("im_draft" + vk.id + "_" + t, !1), curBox().hide(), showDoneBox(e))
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
                        o.extractEmoji()
                    }
                }), Emoji.emojiLoadMore(cur.emojiWId), cur.mbTo[0] ? cur.mbHidden = !1 : cur.mbHidden = !0, cur.imwEmoji = -1;
                var l = cur.postTo;
                cur.postTo = !1, e.setOptions({
                    onHide: function() {
                        removeEvent(document, "keydown", o.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                    },
                    onShow: function() {
                        addEvent(document, "keydown", o.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                    },
                    onClean: function() {
                        clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = l, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
                    }
                }), addEvent(document, "keydown", o.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), stManager.add(["page.js", "page.css"], function() {
                    var t = {
                        mail: 1,
                        nocl: 1,
                        editable: 1,
                        sortable: 1,
                        teWidth: 150,
                        teHeight: 100,
                        toggleLnk: !0
                    };
                    cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (t.onMediaAdd = function() {
                        for (var e in cur.mbMedia.chosenMedias)
                            if ("market" == cur.mbMedia.chosenMedias[e][0]) {
                                var t = cur.mbMedia.chosenMedias[e][2];
                                hide(geByClass1("page_media_x_wrap", t))
                            }
                    }), cur.mbMedia = new MediaSelector("mail_box_add_link", "mail_box_added_row", cur.mbMediaTypes, t), cur.mbMedia.onChange = function() {
                        e.changed = !0, setTimeout(function() {
                            o.saveDraft()
                        }, 100)
                    }, ls.checkVersion() && cur.mbTo[0] && o.restoreDraft(cur.mbTo[0])
                })
            },
            getPeer: function() {
                return intval(cur.toData[0])
            },
            restoreDraft: function(e) {
                var t = o.getPeer();
                if (!(!t || e && t != intval(e) || browser.mobile) && cur.mbMedia) {
                    var n = (0, i.loadDraftForPeer)(cur.ldb, t);
                    cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (n.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), n.removeAllAttaches(), n.addAttach("market", cur.mbForceAttach[1])), o.editableHasVal(cur.mbField) || (cur.mbEditable ? (val(cur.mbField, n.dData.txt.replace(/\n/g, "<br/>")), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, n.dData.txt)), n.prepareObjects().then(function() {
                        if (cur.mbField && o.getPeer() == t)
                            for (var e = n.dData.attaches, r = 0; r < e.length; r++) cur.mbMedia.chooseMedia(e[r].type, e[r].id, e[r].object || {}, null, !0)
                    }), o.checkEditable(cur.emojiWId, cur.mbField), o.checkLen(cur.mbField)
                }
            },
            saveDraft: function() {
                var e = o.getPeer();
                if (e) {
                    var t = (0, i.loadDraftForPeer)(cur.ldb, e);
                    t.setText(trim(Emoji.val(cur.mbField))), t.removeAllAttaches(), cur.mbMedia.getMedias().forEach(function(e) {
                        return t.addAttach(e[0], e[1])
                    }), t.destroy()
                }
            },
            toFull: function(e, t) {
                if (!checkEvent(e)) {
                    var n = {
                            0: "im",
                            sel: t
                        },
                        a = trim(Emoji.editableVal(cur.mbField));
                    if (a && (n.message = a), cur.mbMedia.chosenMedias) {
                        for (var i = cur.mbMedia.getMedias(), o = [], s = 0, u = i.length; u > s; ++s) {
                            var c = i[s],
                                d = [];
                            for (var l in c) "object" != r(c[l]) && d.push(c[l]);
                            o.push(d.join(","))
                        }
                        n.media = o.join("*")
                    }
                    return nav.go(n, null, {
                        noback: !0
                    }), !1
                }
            },
            send: function(e) {
                if (!buttonLocked("mail_box_send")) {
                    var t = trim(Emoji.editableVal(cur.mbField)),
                        n = cur.mbMedia.getMedias();
                    cur.mbEditable && o.extractEmoji();
                    var r = {
                        act: "a_send_box",
                        chas: cur.mbHash,
                        message: t,
                        title: isVisible("mail_box_title_wrap") && val("mail_box_title") || "",
                        from: "box",
                        media: [],
                        to_ids: []
                    };
                    cur.mbForceAttach && (r.attach1_type = cur.mbForceAttach[0], r.attach1 = cur.mbForceAttach[1], r.attach1_hash = cur.mbForceAttach[2]);
                    for (var a, s = 0, u = n.length; u > s; ++s)(a = n[s]) && r.media.push(a[0] + ":" + a[1]);
                    return r.media = r.media.join(","), t || r.media ? (r.to_ids = cur.toData[0], cur.mbBannedHim == r.to_ids && e !== !0 ? void(showBox("al_profile.php", {
                        act: "banned_him",
                        action: "mail",
                        mid: cur.mbBannedHim
                    }, {
                        dark: 1
                    }).onContinue = o.send.pbind(!0)) : void ajax.post("al_im.php", r, {
                        onDone: function(e, t) {
                            if (t) {
                                var n = (0, i.loadDraftForPeer)(cur.ldb, t);
                                n.clear(), n.destroy()
                            }
                            curBox().hide(), showDoneBox(e)
                        },
                        showProgress: lockButton.pbind("mail_box_send"),
                        hideProgress: unlockButton.pbind("mail_box_send")
                    })) : cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField)
                }
            },
            checkLen: function(e) {
                cur.mbTxtInp.value = Emoji.editableVal(e), checkTextLength(4096, cur.mbTxtInp, "mail_box_warn"), toggle("mail_box_title_wrap", cur.mbTxtInp.lastLen > 200)
            },
            codeToChr: function(e) {
                for (var t = e.length / 4, n = "", r = 0; t--;) n += String.fromCharCode(parseInt(e.substr(r, 4), 16)), r += 4;
                return n
            },
            editableHasVal: function(e) {
                return e ? "TEXTAREA" == e.tagName ? !!val(e) : !(!geByTag1("IMG", e) && !stripHTML(val(e)).replace(/[\s\xa0]/g, "").length) : !1
            },
            checkEditable: function(e, t) {
                cur.mbEditable && Emoji.checkEditable(e, t, {
                    height: 180
                })
            },
            cssAnimation: function() {
                var e = intval(browser.version);
                return browser.chrome && e > 14 || browser.mozilla && e > 13 || browser.opera && e > 2 ? !0 : !1
            },
            onKey: function(e) {
                var t = "INPUT" == e.target.tagName || "TEXTAREA" == e.target.tagName || "mail_box_editable" == e.target.id;
                if (!isInputActive()) {
                    if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && !t)
                        if (cur.mbEditable) Emoji.editableFocus(cur.mbField, !1, !0);
                        else {
                            var n = cur.mbField;
                            !n.active && elfocus(n)
                        }
                    return !0
                }
            },
            extractEmoji: function() {
                var e = ge("mbe_rcemoji");
                if (e) {
                    var t = "",
                        n = Emoji.getRecentEmojiSorted().slice(0, 7);
                    for (var r in n)
                        if (n.hasOwnProperty(r)) {
                            var a = n[r];
                            t += '<a id="mbe_rc_em_' + a + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + a + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(a, !1, !0) + "</a>"
                        }
                    val(e, t)
                }
            }
        };
    try {
        stManager.done("writebox.js")
    } catch (s) {}
}, , , , function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ((0, h.unpackStore)(e).searchShown) return !1;
        var n = (0, h.getTab)(e, t),
            r = n && (0, h.parserMessage)(n.pinned);
        return r ? n.pinHideId != r.chat_local_id : !1
    }

    function a(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, h.getTab)(e, t),
            i = a && (0, h.parserMessage)(a.pinned);
        a && i && (a.pinHideId = i.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, a.pinHideId]), u(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 1,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "hide"))
    }

    function i(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, h.getTab)(e, t);
        a && (delete a.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, void 0]), u(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 0,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "show"))
    }

    function o(e, t, n) {
        var r = u.bind(null, n, t),
            a = (0, g.showUnpinDialog)(function() {
                a.hideProgress(), a.hide(), e.set(f.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                    return e.set(f.unpinMessage.bind(null, t))
                }).then(r)
            })
    }

    function s(e, t, n) {
        var r = e.get(),
            i = r.peer,
            o = (0, h.parserMessage)((0, h.getTab)(e, i).pinned);
        if (n.target.classList.contains(y)) o && a(e, i, t);
        else if ("A" !== n.target.tagName) {
            var s = o && o.messageId;
            if (s && !(0, g.isAlreadyDeleted)(e, i, s)) {
                var u = e.get(),
                    c = (0, h.getMessage)(e, i, s);
                c ? (e.setState({
                    msgid: s
                }), (0, v.updateLocation)({
                    msgid: s
                }), t().focusOnMessage()) : u.longpoll.push([(0, _.changePeer)(i, s)])
            } else(0, g.showPinnedBox)(e, t, i, p.mount, n);
            statlogsValueEvent("im_pinned_messages", "open")
        }
    }

    function u(e, t, n) {
        return e().updateChatTopic(t, n), (0, f.setActions)(n.get()), e().updateActions(n), n
    }

    function c(e) {
        showTooltip(e.target, {
            text: getLang("mail_hide_unpin_hover"),
            black: 1,
            needLeft: 1,
            shift: [8, 4],
            forcetoup: !0,
            className: "_im_pinned_tt",
            appendEl: bodyNode
        })
    }

    function d(e) {
        return {
            unmount: function() {
                (0, m.destroyModule)(e)
            }
        }
    }

    function l(e, t, n) {
        var r = (0, m.createMutations)(d),
            a = r.bindMutations,
            i = s.bind(null, t, n),
            o = c.bind(null),
            u = (0, m.createModule)({
                handlers: function(t, n) {
                    n(e, "click", E, i), n(e, "mouseover", y, o)
                }
            });
        return a(u)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isPinnedMessageVisibleInTab = r, t.pinnedMessageHide = a, t.pinnedMessageUnHide = i, t.pinnedMessageUnpin = o, t.mount = l;
    var m = n(63),
        f = n(24),
        _ = n(87),
        p = n(111),
        g = n(143),
        h = n(117),
        v = n(141),
        b = n(98),
        y = "_im_pin_hide",
        E = "_im_pinned_message"
}, function(e, t, n) {
    var r = n(128),
        a = n(53)("iterator"),
        i = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[a] === e)
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, , function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(22),
        a = n(84),
        i = n(105),
        o = n(53)("species");
    e.exports = function(e) {
        var t = r[e];
        i && t && !t[o] && a.f(t, o, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = d.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r = void 0, a = 0; a < n.length; a++) {
                    var i = s(n[a], 2),
                        o = i[0],
                        u = i[1],
                        c = void 0;
                    if (hasClass(e.target, o) ? c = u(e, e.target) : (r = gpeByClass(o, e.target, e.currentTarget)) && (c = u(e, r)), c === !1) break
                }
        }
    }

    function i(e, t, n, r) {
        var i = d.get(e);
        i || (d.set(e, {}), i = d.get(e));
        for (var o = t.split(" "), s = 0; s < o.length; s++) {
            var u = o[s];
            i[u] || (i[u] = [], addEvent(e, u, a)), i[u].push([n, r])
        }
    }

    function o(e, t, n, r) {
        var i = d.get(e);
        if (i) {
            t.split(" ").forEach(function(t) {
                i[t] && (i[t] = i[t].filter(function(e) {
                    return e[0] !== n || e[1] !== r
                }), 0 === i[t].length && removeEvent(e, t, a))
            });
            var o = Object.keys(i).map(function(e) {
                return i[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === o && d["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.addDelegateEvent = i, t.removeDelegateEvent = o;
    var u = n(104),
        c = r(u),
        d = new c["default"]
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, , , function(e, t, n) {
    "use strict";
    var r = n(50);
    e.exports = n(115)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = r.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return r.def(this, 0 === e ? 0 : e, t)
        }
    }, r, !0)
}, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t, n) {
    var r = n(2),
        a = n(46),
        i = n(146)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = a(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e) {
        return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
    }

    function o(e) {
        if (!e.renew_hashes) {
            var t = e.last_hashes_update || 0;
            if (Date.now() - t < 1e4) return Promise.resolve();
            var n = Object.keys(e.tabs).filter(function(t) {
                return (0, qt.isFullyLoadedTab)(e, t)
            });
            e.renew_hashes = (0, Nt.post)(Nt.CONTROLLER, {
                act: "a_renew_hash",
                peers: n.join(","),
                gid: e.gid
            }).then(function(t) {
                var r = Dt(t, 1),
                    a = r[0];
                return n.forEach(function(t) {
                    e.tabs[t].hash = a[t]
                }), delete e.renew_hashes, e.last_hashes_update = Date.now(), e
            })
        }
        return e.renew_hashes
    }

    function s(e, t, n) {
        return i(e).then(function(r) {
            return r ? t.apply(void 0, n) : o(e).then(function(e) {
                return t.apply(void 0, n)
            })
        })
    }

    function u(e) {
        return function() {
            var t = arguments,
                n = t[t.length - 1];
            return e.apply(void 0, t)["catch"](function(r) {
                if (r && r.match && r.match(/1001;/)) return s(n, e, t);
                throw r
            })
        }
    }

    function c(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function d(e, t) {
        var n = e ? e.indexOf(t) : 0; - 1 === n && e.push(t)
    }

    function l(e, t) {
        var n = e ? e.indexOf(t) : -1; - 1 !== n && e.splice(n, 1)
    }

    function m(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function f(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function _(e, t, n, r, a) {
        return a.tabHistoryNotChanged = !1, (0, Ut.retryFn)(Nt.post, 3, function(e) {
            return e - 1
        })(Nt.CONTROLLER, {
            act: "a_start",
            peer: e,
            msgid: n,
            history: t,
            prevpeer: a.prevPeer,
            gid: a.gid,
            block: r
        }).then(function(t) {
            var r = Dt(t, 5),
                i = r[0],
                o = r[1],
                s = r[2],
                u = r[3],
                c = r[4];
            if (o.forEach(function(e) {
                    return (0, Vt.oCacheAdd)(a, e)
                }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = c, a.tabs[e] || (a.tabs[e] = (0, qt.normalizeTab)(a, i)), f(u, a), n) {
                if (a.tabs[e]) {
                    var d = a.tabs[e].lastmsg,
                        l = a.tabs[e].lastmsg_meta;
                    extend(a.tabs[e], i), a.tabs[e].lastmsg = d, a.tabs[e].lastmsg_meta = l
                }
            } else extend(a.tabs[e], i);
            return a.admins = extend(a.admins, s), a.imQueue(e, !1), p(e, a)
        })["catch"](function(e) {
            return (0, Qt.imWeirdCatch)("loadPeer", e)
        })
    }

    function p(e, t) {
        var n = t.imQueue(e, !1),
            r = t.tabs[e],
            a = n.filter(function(n) {
                return !(0, Wt.isRidExist)(t, e, n.rid)
            });
        return r.msgs = a.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, r.msgs), t.imQueueSet(e, a), t.tabs[e].history = (0, qt.restoreQueue)(a, t, c(t.tabs[e].history)), Promise.resolve(t)
    }

    function g(e, t, n) {
        var r = n.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return n.imQueueSet(e, r), n.tabs[e].history = (0, qt.removeMessages)([t], c(n.tabs[e].history)), Promise.resolve(n)
    }

    function h(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var n = Dt(e, 1),
                r = n[0];
            return f(r, t)
        })
    }

    function v(e, t) {
        var n = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, (0, qt.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && h(n, t), Promise.resolve(t).then(k)) : ((0, qt.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), _(n, e, !1, !0, t))
        }).then(k).then(b.bind(null, n))
    }

    function b(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        return (0, qt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, qt.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
    }

    function y(e, t, n) {
        var r = n.msgid,
            a = n.peer;
        return !e && (0, qt.isFullyLoadedTab)(n, a) && n.tabs[a].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && h(a, n), Promise.resolve(n).then(k).then(b.bind(null, a))) : _(a, !0, r, !0, n).then(k).then(function() {
            var e = (0, Wt.getTab)(n, a);
            return e.msgid = r, n
        }).then(b.bind(null, a))
    }

    function E(e, t, n) {
        if (Ye(n)) throw (0, qt.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
        var r = n.gid ? "gim" + n.gid : "im";
        if (n.prevPeer = n.peer, n.peer = e, n.msgid = t || "", cur.peer = e, en({
                sel: e ? (0, qt.convertPeerToUrl)(e) : null,
                msgid: n.msgid,
                email: "",
                0: r
            }), 0 != n.prevPeer && b(n.prevPeer, n, !0), 0 !== e) {
            var a = [];
            (0, qt.isTabLoaded)(n, e) && b(e, n, !0), a = n.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(n.tabbedPeers) : n.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), mt(a, !1, n)
        } else mt(n.tabbedPeers, !1, n);
        return tn(), _e(n.prevPeer, n)
    }

    function T(e) {
        if (cur.wallMentions = [], (0, qt.isChatPeer)(e.peer) && (0, qt.isFullyLoadedTab)(e, e.peer)) {
            var t = e.tabs[e.peer],
                n = [];
            Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                var r = (0, Wt.parserMessage)(t.msgs[e]),
                    a = r && r.userId;
                a && a != vk.id && -1 === n.indexOf(a) && (0, qt.isUserAliveInChat)(t, a) && n.push(a)
            }), (t.memberIds || []).forEach(function(e) {
                -1 === n.indexOf(e) && n.push(e)
            }), n.forEach(function(t) {
                if ((0, Vt.oCacheExists)(e, t)) {
                    var n = (0, Vt.oCacheGet)(e, t),
                        r = n.link.substring(1);
                    cur.wallMentions.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                }
            })
        }
    }

    function k(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var n = e.tabs[t],
            r = [];
        n.offset && r.push("photos"), n.offset && r.push("search"), (-2e9 > t || n.offset) && r.push("clear"), (0, qt.isCommunityInterface)(e) && r.push("block"), (0, qt.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !(0, qt.isChatPeer)(t) && !(0, qt.isUserPeer)(t) || (0, qt.isCommunityInterface)(e) || (0, qt.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), (0, qt.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), (0, qt.isChatPeer)(t) && !n.data.closed && !n.data.kicked && n.data.link && r.push("invite_link"), !(0, qt.isChatPeer)(t) || n.data.closed || n.data.kicked || r.push("topic", "avatar", "invite", "leave"), (0, qt.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), (0, qt.isChatPeer)(t) && n.pinned && (geByClass1("im-page--chat-header_hide-pin-actions") || (r.push((0, Yt.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), r.push("unpin")));
        var a = (0, qt.chatActions)(e);
        return e.curActions = r.sort(function(e, t) {
            return rn[e] - rn[t]
        }).reduce(function(e, t) {
            return e[t] = a[t], e
        }, {}), Promise.resolve(e)
    }

    function I(e, t, n) {
        var r = n.tabs[n.peer];
        return (0, Nt.post)(Nt.CONTROLLER, {
            peer: n.peer,
            whole: e,
            act: "a_history",
            offset: r.offset + (r.skipped || 0),
            toend: t,
            gid: n.gid
        }).then(function(e) {
            var t = Dt(e, 4),
                a = t[0],
                i = t[1],
                o = t[2],
                s = t[3];
            return r.allShown = o, n.admins = extend(n.admins, s), r.history = a + m(r.history), r.historyToAppend = a, r.offset += Object.keys(i).length, r.msgs = extend(r.msgs, i), n
        })
    }

    function O(e) {
        var t = e.tabs[e.peer];
        return (0, Nt.post)(Nt.CONTROLLER, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(n) {
            var r = Dt(n, 5),
                a = r[0],
                i = r[1],
                o = r[2];
            r[3], r[4], t.allShown = t.allShown || o, t.history = m(t.history) + a, t.historyToAppend = a;
            var s = Object.keys(i).length;
            return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, i), e
        })
    }

    function L(e, t, n, r) {
        var a = e.tabs[t];
        return r === Ht.FLAG_OUTBOUND ? a.out_up_to = n : a.in_up_to = n, e
    }

    function w(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_email_start",
            email: e,
            hash: t.writeHash
        }).then(function(e) {
            var n = Dt(e, 2),
                r = n[0],
                a = n[1];
            return q(r, t), a
        })
    }

    function A(e) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var n = Dt(t, 3),
                r = n[0],
                a = n[1],
                i = n[2];
            return extend({}, e, {
                imKey: r,
                imUrl: a,
                imPart: i
            })
        })
    }

    function S(e) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var n = Dt(t, 1),
                r = n[0];
            return extend({}, e, {
                imTs: r
            })
        })
    }

    function M(e, t, n) {
        var r = n.tabs[e];
        return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = (0, qt.setMessageError)(e, t, c(r.history))), Promise.resolve(n)
    }

    function C(e, t, n, r) {
        var a = r.tabs[e];
        return a.msgs[t] && (a.msgs[t].errored = 0, a.lastmsg_meta = n, a.lastmsg = t, a.history = (0, qt.startResendMessage)(e, t, c(a.history))), Promise.resolve(r)
    }

    function R(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
            return !n && !tt(i)(t) || a && !a(i, e[i], t) || (e[i] = (0, Gt.arrayUnique)(r(e[i], i))), e
        }, e.dialog_tabs))
    }

    function P(e, t) {
        return 0 === e.length ? Promise.resolve(t) : (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var n = Dt(e, 1),
                r = n[0];
            return t.admins = extend(t.admins, r), t
        })
    }

    function x(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var n = {
                peer: e,
                type: "temp"
            };
            mt(t.tabbedPeers.concat([n]), !1, t)
        }
    }

    function D(e, t, n) {
        return (0, qt.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
    }

    function N(e, t) {
        var n = (0, Wt.getTab)(t, e.peerId);
        if ((0, qt.isFullyLoadedTab)(t, e.peerId)) {
            var r = c(n.history);
            n.msgs[e.messageId] = extend(!0, {}, e), n.history = (0, qt.editAndReplaceMessage)(t, e, r)
        }
        n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
        var a = n && n.pinned && (0, Wt.parserMessage)(n.pinned);
        return a && a.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
    }

    function j(e, t) {
        var n = e.flags & Ht.FLAG_OUTBOUND,
            r = e.peerId;
        if ((0, qt.isTabLoaded)(t, r)) {
            var i = t.tabs[r];
            if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = a({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? F(t, 1, e.peerId) : (!i.unread && F(t, 1, e.peerId), i.unread++), x(e.peerId, t)), (0, qt.isFullyLoadedTab)(t, r)) {
                var o = c(i.history);
                i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, qt.appendToHistory)(t, e, o, !0, !0, !0), (0, Kt.isOut)(e) && (i.blocked_community = 0, k(t))
            }
            return i.typing && i.typing[e.userId] && delete i.typing[e.userId], i.lastmsg = e.messageId, i.lastmsg_meta = e, b(e.peerId, t), R(t, i, !1, D.bind(null, r), it.bind(null, t)), Promise.resolve(t)
        }
        return _(r, 0, 0, 0, t).then(function(t) {
            var a = t.tabs[r];
            return R(t, a, !1, D.bind(null, r), it.bind(null, t)), b(e.peerId, t), n || x(e.peerId, t), t
        })
    }

    function F(e, t, n) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
    }

    function H(e, t) {
        if ((0, qt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = n.unread;
            if (t = L(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : (0, Wt.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && F(t, -1, e.peerId), !n.skipped) {
                var a = c(n.history);
                n.history = (0, qt.removewNewUnreadBarAndMerge)(t, a, e.peerId)
            }
        } else(0, qt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && F(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return (0, qt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[zt.FOLDER_UNREAD] = t.dialog_tabs[zt.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== zt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : nt(zt.FOLDER_ALL, t)
    }

    function U(e, t) {
        var n = t.tabs[e.peerId];
        if ((0, qt.isTabLoaded)(t, e.peerId) && L(t, e.peerId, e.upToId, Ht.FLAG_OUTBOUND), (0, qt.isFullyLoadedTab)(t, e.peerId)) {
            var r = c(n.history);
            n.history = (0, qt.markMessagesAsRead)(t, e.peerId, r)
        }
        return Promise.resolve(t)
    }

    function G(e, t, n, r, a) {
        return a.text = {}, a.imQueue = e, a.imQueueResend = t, a.imQueueSet = n, a.imQueueComplete = r, Promise.resolve(a)
    }

    function B(e, t, n) {
        function r(e, t) {
            return {
                id: e.messageId,
                text: e.text,
                date: e.date,
                kludges: e.kludges,
                authorName: t
            }
        }
        if (1 === e.length) {
            var i = e[0],
                o = (0, Wt.getMessage)(n, t, i),
                s = (0, Wt.getAuthorFullName)(n, t, i);
            return s === !1 ? n.set(Se.bind(null, a({}, t, [o.userId]))).then(function(n) {
                var a = (0, Wt.getAuthorFullName)(n, t, i);
                return {
                    msgIds: e,
                    object: r(o, a)
                }
            }) : Promise.resolve({
                msgIds: e,
                object: r(o, s)
            })
        }
        return Promise.resolve({
            msgIds: e
        })
    }

    function q(e, t) {
        (0, qt.normalizeTabsGotFromServer)(t, e);
        var n = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(n, r) {
            var a = t.tabs[r] ? t.tabs[r].msgs : {},
                i = extend({}, a || {}, e[r].msgs || {});
            return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
        }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
    }

    function z(e, t, n, r) {
        var a = (0, Wt.getTab)(r, e);
        if (a) {
            var i = t !== !1 ? t == Zt ? 2 : mobPlatforms[t] ? 1 : 0 : a.last_seen[2];
            a.online = t, a.last_seen = [t, n || a.last_seen[1], i]
        }
        return Promise.resolve(r)
    }

    function W(e, t, n) {
        var r = (0, Wt.getTab)(n, e);
        return r && (r.typing || (r.typing = {}), r.typing[t] = Date.now()), Promise.resolve(n)
    }

    function K(e, t, n) {
        return (0, Ut.pause)($t + 2).then(function() {
            if ((0, qt.isTabLoaded)(n, e)) {
                var r = n.tabs[e];
                if (r.typing) {
                    var a = Date.now() - (r.typing[t] || 0);
                    a >= 1e3 * $t && delete r.typing[t]
                }
            }
            return n
        })
    }

    function V(e) {
        return e.map(function(e) {
            return e[0] + ":" + e[1]
        }).join(",")
    }

    function Q(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var n = t.selectedMessages.concat(e);
            t.selectedMessages = (0, Gt.arrayUnique)(n).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function Y(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function $(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function X(e, t) {
        if ((0, qt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
            var a = n.msgs["rid" + e.randomId];
            a && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = (0, qt.replaceMessageAttrs)(t, c(n.history), e)
        }
        return Promise.resolve(t)
    }

    function Z(e, t) {
        return Promise.resolve()
    }

    function J(e, t) {
        var n = {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        };
        return (0, Ut.retryFn)(Nt.post, 3, function(e) {
            return e * e
        })(Nt.CONTROLLER, n).then(function(n) {
            return ee(e, n, t)
        })["catch"](function() {
            return ee(e, null, t)
        })
    }

    function ee(e, t, n) {
        var r = n.tabs[e.peerId];
        return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], te(e, n)
    }

    function te(e, t) {
        var n = t.tabs[e.peerId];
        return n.history = (0, qt.replaceAttaches)(c(n.history), e, t), Promise.resolve(t)
    }

    function ne(e, t, n) {
        var r = (0, qt.dayFromVal)(t),
            a = n.tabs[e];
        return a.searchDay = r, a.searchOffset = 0, a.searchAllLoaded = !1, Promise.resolve(n)
    }

    function re(e, t, n) {
        if (t) {
            var r = n.tabs[t];
            r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
        } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
        return Promise.resolve(n)
    }

    function ae(e, t, n, r) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_hints",
            str: e,
            gid: r.gid,
            query: n,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = Dt(e, 3),
                n = t[0],
                a = t[1],
                i = t[2];
            return f(i, r), a.forEach(function(e) {
                return (0, Vt.oCacheAdd)(r, e)
            }), q(n, r), Object.keys(n).sort(function(e, t) {
                return n[e].order - n[t].order
            }).map(function(e) {
                return n[e]
            })
        })
    }

    function ie(e, t, n, r) {
        return ae(e, t, n, r).then(function(e) {
            return e.map(function(e) {
                return {
                    peerId: e.peerId,
                    name: e.tab,
                    photo: e.photo,
                    online: e.online,
                    is_friend: "friends" === n ? !0 : !1
                }
            })
        })
    }

    function oe(e) {
        return {
            peerId: e[0],
            name: e[1],
            tab: e[1],
            photo: e[2],
            href: e[3],
            online: e[4],
            is_friend: e[5],
            local_index: !0
        }
    }

    function ue(e) {
        return function(t, n) {
            return e(n).then(function(e) {
                var r = t ? e.search(t) : e.list,
                    a = r.map(oe);
                return n.mapped_index || (n.mapped_index = {}), a.forEach(function(e) {
                    n.mapped_index[e.peerId] = e
                }), a
            })
        }
    }

    function ce(e, t) {
        var n = void 0,
            r = void 0;
        t.topConvTree = new Promise(function(e) {
            n = e
        }), t.hintsTree = new Promise(function(e) {
            r = e
        });
        var a = e.select(Bt.RECENT_SEARCH_OP);
        return (0, Ut.retryFn)(Nt.post, 1, function() {
            return 4
        })(Nt.CONTROLLER, {
            act: "a_dialogs_preload",
            rs: a.join(","),
            gid: t.gid
        })["catch"](function(e) {
            return [
                [],
                [],
                []
            ]
        }).then(function(e) {
            var a = Dt(e, 3),
                i = a[0],
                o = a[1],
                s = a[2];
            return t.popular_sugg = s, new vkIndexer(i, function(e) {
                return e[1]
            }, n), new vkIndexer(o, function(e) {
                return e[1]
            }, r), t
        })
    }

    function de(e) {
        var t = e.active_tab;
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_dialogs",
            offset: e.offset,
            tab: t,
            gid: e.gid
        }).then(function(n) {
            var r = Dt(n, 4),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3];
            return o.forEach(function(t) {
                return (0, Vt.oCacheAdd)(e, t)
            }), f(s, e), q(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.offset = a.offset, e.dialog_tabs_all[t] = !a.has_more, Promise.resolve(e)
        })
    }

    function le(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_search",
            q: e,
            from: "all",
            gid: t.gid,
            hash: t.writeHash,
            offset: t.searchOffset || 0
        }).then(function(n) {
            var r = Dt(n, 5),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3],
                u = r[4];
            return i.forEach(function(e) {
                return (0, Vt.oCacheAdd)(t, e)
            }), (0, qt.normalizeTabsGotFromServer)(t, a), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = u), Object.keys(a).filter(function(e) {
                return !t.tabs[e]
            }).forEach(function(e) {
                t.tabs[e] = a[e]
            }), [a, o]
        })
    }

    function me(e, t) {
        var n = t.tabs[e];
        return n.searchAllLoaded
    }

    function fe(e, t) {
        if (t.peer === e && (0, qt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            return n.inplaceSearch
        }
        return !1
    }

    function _e(e, t) {
        if ((0, qt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay
        }
        return Promise.resolve(t)
    }

    function pe(e, t) {
        if ((0, qt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.searchDay, n.searchOffset = 0,
                n.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function ge(e, t) {
        var n = t.tabs[e];
        return n.inplaceSearch = !0, Promise.resolve(t)
    }

    function he(e, t) {
        var n = t.tabs[e],
            r = "";
        if (ge(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
        var a = "in:" + e + " " + r + " " + (n.searchText || "");
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_search",
            q: a,
            from: "in",
            gid: t.gid,
            hash: t.writeHash,
            offset: n.searchOffset || 0
        }).then(function(e) {
            var t = Dt(e, 3),
                r = t[0],
                a = t[1],
                i = t[2];
            return n.searchOffset = a, n.searchAllLoaded = i, r
        })
    }

    function ve(e) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function be(e, t) {
        var n = (0, Wt.getTab)(e, t);
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_load_lastmsg",
            peerId: t,
            gid: e.get().gid
        }).then(function(r) {
            var a = Dt(r, 2),
                i = a[0],
                o = a[1];
            n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
            var s = Dt(o, 3);
            n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[zt.FOLDER_UNREAD] = e.get().dialog_tabs[zt.FOLDER_UNREAD].filter(function(e) {
                return e != t
            })), R(e.get(), n, !1, D.bind(null, t), it.bind(null, e.get()))
        })
    }

    function ye(e, t, n) {
        if ((0, qt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e, r.history = (0, qt.removeMessages)(e, c(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length, e.forEach(function(e) {
                return delete r.msgs[e]
            }), e.forEach(function(e) {
                var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
            })
        }
        return Promise.resolve(n)
    }

    function Ee(e, t, n, r, a) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_mark",
            peer: t,
            hash: n,
            gid: a,
            msgs_ids: e.join(","),
            mark: r
        })
    }

    function Te(e, t, n, r) {
        if ((0, qt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            a.deleted = a.deleted ? a.deleted.concat(e) : e, a.history = (0, qt.removeMessagesWithRestore)(e, t, n, c(a.history)), a.offset -= e.filter(function(e) {
                return a.msgs[e]
            }).length
        }
        return Promise.resolve(r)
    }

    function ke(e, t, n) {
        if ((0, qt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted && (r.deleted = r.deleted.filter(function(t) {
                return t !== e
            })), r.history = (0, qt.restoreMessage)(e, t, c(r.history)), r.offset++
        }
        return Promise.resolve(n)
    }

    function Ie(e, t, n, r) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: n,
            gid: r
        })
    }

    function Oe(e, t, n) {
        return t && (n.pendingForward = null, e || (e = {
            msgIds: []
        }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(n)
    }

    function Le(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function we(e, t, n) {
        if ((0, qt.isTabLoaded)(n, e)) {
            n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, R(n, n.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), n.tabs[e].unread > 0 && F(n, -1, e);
            var r = n.tabs[e];
            r.deletedDialog = !0;
            var a = n.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return mt(a, !0, n), t.then(function(t) {
                var a = Dt(t, 2);
                return a[0], a[1], delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
            })
        }
    }

    function Ae(e, t, n) {
        return n.tabs[e].tab = t, Promise.resolve(n)
    }

    function Se(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var n = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_load_member",
            need: n
        }).then(function(e) {
            var n = Dt(e, 1),
                r = n[0];
            return r.forEach(function(e) {
                return (0, Vt.oCacheAdd)(t, e)
            }), t
        })
    }

    function Me(e, t, n, r) {
        function a(e, t) {
            (0, qt.isChatPeer)(e) && t && !(0, Vt.oCacheExists)(r, t) && (i[e] ? -1 === i[e].indexOf(t) && i[e].push(t) : i[e] = [t])
        }
        var i = {},
            o = t.filter(function(e) {
                return !(0, qt.isTabLoaded)(r, e.peerId)
            }).map(function(e) {
                return _(e.peerId, 0, 0, 0, r)
            });
        t.forEach(function(e) {
            (0, qt.isTabLoaded)(r, e.peerId) && a(e.peerId, e.userId)
        }), e.forEach(function(e) {
            a(e.peerId, +e.kludges.source_mid)
        });
        var s = t.filter(function(e) {
            return e.flags & Ht.FLAG_OUTBOUND && !e.local
        }).map(function(e) {
            return e.kludges.from_admin
        }).filter(function(e) {
            return e && !r.admins[e]
        });
        return 0 === Object.keys(i).length && 0 === s.length && 0 === o.length ? Promise.resolve(r) : (n.pause(), Promise.all([Se(i, r), P(s, r), Promise.all(o)])["catch"](function() {
            return r
        }).then(function() {
            return n.resume()
        }).then(function() {
            return r
        }))
    }

    function Ce(e, t, n, r) {
        return t !== vk.id ? Promise.resolve(r) : ((0, qt.isTabLoaded)(r, n) && r.peer == n && (r = k(r)), Promise.resolve(r))
    }

    function Re(e, t, n) {
        var r = n.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, k(n)
    }

    function Pe(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function xe(e, t, n, r) {
        if ((0, qt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            e.filter(function(e) {
                return a.msgs[e]
            }).forEach(function(e) {
                var i = (0, Wt.getMessage)(r, t, e),
                    o = n ? i.flags | Ht.FLAG_IMPORTANT : i.flags & ~Ht.FLAG_IMPORTANT;
                i.flags = o, a.msgs[e] = i, a.history = (0, qt.updateStar)(e, n, c(a.history))
            })
        }
        return Promise.resolve(r)
    }

    function De(e, t, n) {
        n.importants || (n.importants = {});
        var r = n.importants[t] || 0;
        return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
    }

    function Ne(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function je(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function Fe(e, t, n) {
        return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
    }

    function He(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function Ue(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function Ge(e, t, n) {
        return (0, Nt.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return n
        })
    }

    function Be(e, t, n, r) {
        return r.creating = !0, r.longpoll.pause(), (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_multi_start",
            hash: r.writeHash,
            peers: t.join(","),
            title: n
        }).then(function(e) {
            var t = Dt(e, 1),
                n = t[0];
            return r.next_peer = n.peerId, r.tabs[n.peerId] = n, R(r, n, !1, function(e) {
                return [n.peerId].concat(e)
            }), r.longpoll.resume(), r
        }).then(function(t) {
            return e ? Ge(t.next_peer, e, t) : t
        }).then(function(e) {
            return e.creating = !1, e
        })["catch"](function(e) {
            throw r.creating = !1, r.longpoll.resume(), e
        })
    }

    function qe(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.tabs).length,
            r = e.active_tab;
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: n,
            tab: r,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(n) {
            var i = Dt(n, 5),
                o = i[0],
                s = i[1],
                u = i[2],
                d = i[3],
                l = i[4];
            s.forEach(function(t) {
                return (0, Vt.oCacheAdd)(e, t)
            }), (0, qt.normalizeTabsGotFromServer)(e, o), u.user_unread && handlePageCount("msg", u.user_unread), (0, Gt.lplog)("Resync success", "success");
            var m = e.peer,
                f = void 0;
            if ((0, qt.isReservedPeer)(m)) f = Promise.resolve(!1);
            else {
                var _ = {
                    tabs: a({}, m, e.tabs[m]),
                    oCache: {}
                };
                f = q(a({}, m, o[m]), _)
            }
            return f.then(function(n) {
                e.tabs = o, e.admins = extend(e.admins, d), n && (e.tabs[m] = n.tabs[m], e.tabs[m].history = (0, qt.restoreQueue)(m, e, c(e.tabs[m].history))), e.loadingDialogs = !1, e.offset = Object.keys(o).length, e.mutedPeers = u.mutedPeers, e.lastDialogsOptions = {
                    has_more: u.has_more
                }, e.dialog_tab_cts = u.folder_cts, e.dialog_tabs[r] = l.map(intval);
                var a = e.dialog_tabs[r].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != r
                }).forEach(function(t) {
                    r == zt.FOLDER_ALL ? e.dialog_tabs[t] = a.filter(tt(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), $e(intval(u.unread), e)
            })
        })["catch"](function(t) {
            return (0, Gt.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, Ut.pause)(2).then(qe.bind(null, e))
        })
    }

    function ze(e, t, n, r) {
        if ((0, qt.isTabLoaded)(r, e)) {
            var a = r.tabs[e];
            d(a.memberIds, n), a.membersCount++, n === vk.id && (a.data.kicked = 0, a.data.closed = 0)
        }
        return Promise.resolve(r)
    }

    function We(e, t, n, r) {
        if ((0, qt.isTabLoaded)(r, e)) {
            var a = r.tabs[e];
            l(a.memberIds, n), a.membersCount--, n === vk.id && (t == n ? a.data.closed = 1 : a.data.kicked = 1)
        }
        return Promise.resolve(r)
    }

    function Ke(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function Ve(e, t, n) {
        return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
    }

    function Qe() {
        return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
            return Upload.options[e]
        }).filter(function(e) {
            return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
        }).length > 0 : !1
    }

    function Ye(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || Qe()
    }

    function $e(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[zt.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function Xe(e, t) {
        return t.ctrl_submit = !!e, (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function Ze(e, t, n) {
        return function() {
            n.update_old_title = e;
            var r = Object.keys(n.cur_unread_cnt).length;
            if (0 === r) return document.title = e ? e : document.title, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
            if (e) document.title = e, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var a = r > 9 ? 10 : r;
                setFavIcon("/images/icons/favicons/fav_im" + a + t + ".ico"), document.title = winToUtf(getLang("mail_im_new_messages", r))
            }
        }
    }

    function Je(e, t, n) {
        n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
        var r = document.title,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !n.update_title_to) {
            var i = Ze(r, a, n);
            n.update_title_to = setInterval(i, 1e3), i()
        } else !t && n.update_old_title && (document.title = n.update_old_title, n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
        return Promise.resolve(n)
    }

    function et(e, t, n, r, a) {
        return (0, qt.isFullyLoadedTab)(a, e) && (a.tabs[e].scrollTop = intval(t), a.tabs[e].scrollBottom = intval(n), a.tabs[e].contHeight = intval(r)), Promise.resolve(a)
    }

    function tt(e) {
        return e === zt.FOLDER_ALL ? function() {
            return !0
        } : e === zt.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : function(t) {
            return t.folders & zt.FOLDER_MASKS[e]
        }
    }

    function nt(e, t) {
        t.active_tab = e, (0, jt.updateLocation)({
            tab: e === zt.FOLDER_ALL ? null : e
        });
        var n = [];
        if (e !== zt.FOLDER_ALL && !(0, qt.isReversedDialogs)(t)) {
            var r = t.dialog_tabs[e];
            n = t.dialog_tabs[zt.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter(tt(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = r.length >= n.length ? r : n
        }
        return t.offset = t.dialog_tabs[e].length, Promise.resolve(t)
    }

    function rt(e, t, n) {
        return e === Ht.SET_DIRECTORIES && n.folders & t ? !1 : e !== Ht.RESET_DIRECTORIES || n.folders & t ? !0 : !1
    }

    function at(e, t, n) {
        return t !== Ht.RESET_DIRECTORIES || e.folders & zt.FOLDER_MASKS[n] ? t === Ht.REPLACE_DIRECTORIES ? e.folders & zt.FOLDER_MASKS[n] ? -1 : 1 : t === Ht.SET_DIRECTORIES ? 1 : -1 : 0
    }

    function it(e, t, n, r) {
        var a = e.dialog_tabs_all;
        if (a[zt.FOLDER_ALL] || a[t]) return !0;
        if (n.filter(function(e) {
                return e === r.peerId
            }).length > 0) return !0;
        if ("r" === r.lastmsg[0]) return !0;
        var i = n.map(function(t) {
            return e.tabs[t.toString()]
        }).filter(function(t) {
            return (0, qt.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
        });
        return i.length > 0 ? !0 : !1
    }

    function ot(e, t, n, r, a) {
        if ((0, qt.isTabLoaded)(a, e)) {
            var i = a.tabs[e];
            return n === Ht.REPLACE_DIRECTORIES && (t ^= i.folders), rt(n, t, i) && Object.keys(zt.FOLDER_MASKS).filter(function(e) {
                return zt.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                a.dialog_tab_cts[e] += at(i, n, e)
            }), n === Ht.SET_DIRECTORIES ? a.tabs[e].folders |= t : n === Ht.RESET_DIRECTORIES ? a.tabs[e].folders &= ~t : a.tabs[e].folders = t ^= i.folders, R(a, a.tabs[e], !0, function(t, n) {
                return t.concat([e]).map(function(e) {
                    return a.tabs[e]
                }).filter(tt(n)).map(function(e) {
                    return e.peerId
                })
            }, it.bind(null, a)), Promise.resolve(a)
        }
        return _(e, 0, 0, 0, a).then(ot.bind(null, e, t, n, a))
    }

    function st(e) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function ut(e, t) {
        return f(a({}, e, {
            free: !0
        }), t), (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function ct(e, t) {
        var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
    }

    function dt(e, t, n, r) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_restore_dialog",
            hash: t,
            gid: r.gid,
            spam: n ? 1 : 0,
            peer: e
        }).then(function(t) {
            return r.tabs[e].deletedDialog = !1, R(r, r.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), r.tabs[e].unread = t, r
        })
    }

    function lt(e, t, n) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_spam_dialog",
            peer: e,
            gid: n.gid,
            hash: t
        })
    }

    function mt(e, t, n) {
        return n.tabbedPeers = e, (0, qt.isClassicInterface)(n) && (en({
            peers: n.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    r = e.type;
                return t !== n.peer && "perm" === r
            }).map(function(e) {
                return (0, qt.getBareTab)(e.peer, n)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(qt.convertPeerToUrl).join("_")
        }), t && tn()), Promise.resolve(n)
    }

    function ft(e) {
        return e.peer ? fe(e.peer, e) ? me(e.peer, e) : (0, qt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function _t(e, t) {
        var n = t.tabs[e];
        return (0, qt.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
    }

    function pt(e, t) {
        var n = t.tabs[e];
        return (0, qt.isFullyLoadedTab)(t, e) && (n.history = m(n.history)), Promise.resolve(t)
    }

    function gt(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function ht(e, t, n) {
        if (!(0, qt.isCommunityPeer)(t)) return Promise.resolve(n);
        var r = (0, Wt.getTab)(n, t);
        return r.blocked_community = !e, (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_toggle_community",
            peer_id: t,
            hash: r.hash,
            state: e ? 1 : 0
        }).then(function() {
            return k(n)
        })
    }

    function vt(e, t) {
        if (0 !== t.peer && (0, qt.isFullyLoadedTab)(t, t.peer)) {
            var n = (0, Wt.getTab)(t, t.peer);
            n.history = c(n.history), e(n.history)
        }
        return Promise.resolve(t)
    }

    function bt(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function yt(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function Et(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function Tt(e) {
        en({
            act: e ? "create" : null
        }), tn()
    }

    function kt() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        en({
            q: e
        }), tn()
    }

    function It(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, qt.getClassicChatHeight)() > window.clientHeight() && (0, qt.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function Ot(e, t, n) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_join_chat",
            chat_id: e,
            hash: t,
            write_hash: n.writeHash
        }).then(function(e) {
            var t = Dt(e, 4),
                r = t[0],
                a = t[1],
                i = t[2],
                o = t[3];
            return i.forEach(function(e) {
                return (0, Vt.oCacheAdd)(n, e)
            }), n.tabs[r] = a, R(n, a, !1, D.bind(null, r), it.bind(null, n)), n.admins = extend(n.admins, o), [r]
        })
    }

    function Lt(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_reset_link",
            chat_id: e,
            write_hash: t.writeHash
        })
    }

    function wt(e) {
        return nn({
            invite_chat_id: null,
            invite_hash: null
        }), e.invitation = void 0, Promise.resolve(e)
    }

    function At(e, t) {
        var n = (0, Gt.arrayUnique)([e].concat(t.select(Bt.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(Bt.RECENT_SEARCH_OP, n)
    }

    function St(e) {
        e.update(Bt.RECENT_SEARCH_OP, [])
    }

    function Mt(e, t) {
        var n = t.select(Bt.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(Bt.RECENT_SEARCH_OP, n), n
    }

    function Ct(e, t, n) {
        var r = n.tabs[t],
            a = (0, Wt.getMessage)(n, t, e);
        return r.data.kicked || r.data.closed || a.kludges.source_act || (r.pinned = a), Promise.resolve(n)
    }

    function Rt(e, t) {
        var n = t.tabs[e];
        return n.pinned = null, Promise.resolve(t)
    }

    function Pt(e, t, n, r) {
        var i = (0, Wt.getMessage)(e, n, t),
            o = i.userId;
        return (0, Vt.oCacheGet)(r, o) ? Promise.resolve(r) : Se(a({}, n, [o]), r)
    }

    function xt() {
        ajax.post("al_im.php", {
            act: "a_hide_promo_tooltip"
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getMessageLocalId = t.getPinnedMessage = t.unpinMessage = t.pinMessage = t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchLocalHints = t.searchTopConv = t.deliverEditedMessage = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
    var Dt = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.strHistory = m, t.updateBlockStates = f, t.loadPeer = _, t.restoreHistoryQueue = p, t.removeFailed = g, t.selectPeer = v, t.selectPeerOnMessage = y, t.changePeer = E, t.updateMentions = T, t.setActions = k, t.loadMoreHistory = I, t.loadLessHistory = O, t.createEmailChat = w, t.loadLongPollKey = A, t.loadLongPollTs = S, t.setMessageErrored = M, t.resendMessage = C, t.loadAdmins = P, t.editMessage = N, t.addMessage = j, t.markInboundMessagesAsRead = H, t.markOutboundMessagesAsRead = U, t.initTextStore = G, t.processFwd = B, t.mergeTabs = q, t.updateOnline = z, t.setTyping = W, t.waitTyping = K, t.addSelection = Q, t.cleanSelected = Y, t.dropSelection = $, t.replaceMessage = X, t.saveMedia = Z, t.loadMedia = J, t.addAttachmentsToStoreData = ee, t.replaceMediaAttachesStore = te, t.setCurrentSearchDate = ne, t.setCurrentSearch = re, t.searchHints = ae, t.searchHintsIndex = ie, t.localIndexToDialog = oe, t.preloadSearchIndex = ce, t.loadDialogs = de, t.searchMessages = le, t.isSearchAllLoaded = me, t.isSearchingInplace = fe, t.cancelSearch = _e, t.clearDate = pe, t.searchInplaceStart = ge, t.searchMessagesInplace = he, t.loadImportant = ve, t.loadActualLastMessage = be, t.removeMessages = ye, t.removeMessageSend = Ee, t.removeMessagesWithRestore = Te, t.restoreMessage = ke, t.restoreMessageSend = Ie, t.forwardMessages = Oe, t.prepareForward = Le, t.deletedDialog = we, t.setChatTitle = Ae, t.loadChatMember = Se, t.checkNewPeople = Me, t.updateActions = Ce, t.setMutedPeer = Re, t.setExecStack = Pe, t.updateFavMessage = xe, t.updateImportant = De, t.loadSpam = Ne, t.flushSpam = je, t.setCreationType = Fe, t.getOwnerPhoto = He, t.presetAvatar = Ue, t.setChatPhoto = Ge, t.createChat = Be, t.resync = qe, t.chatUserHasJoined = ze, t.chatUserHasLeft = We, t.toggleSendingAbility = Ke, t.setDelayedMessage = Ve, t.isAnythingLoading = Ye, t.updateUnreadCount = $e, t.changeSubmitSettings = Xe, t.updateFavAndTitle = Je, t.saveHistoryScroll = et, t.filterFromTab = tt, t.changeDialogsTab = nt, t.updateFolderState = ot, t.getMutexQueue = st, t.releaseBlock = ut, t.toggleCommunityMute = ct, t.restoreDialog = dt, t.spamDialog = lt, t.updateTabbedPeers = mt, t.isEverythingLoaded = ft, t.cleanTab = _t, t.stringifyTab = pt, t.updateGoToEndVisibility = gt, t.toggleCommunityMessages = ht, t.updateHistory = vt, t.startRecording = bt, t.cancelRecording = yt, t.setVoiceMessageAvail = Et, t.toggleConversation = Tt, t.updateSearchQuery = kt, t.initializeChatResize = It, t.joinChat = Ot, t.resetInviteLink = Lt, t.leaveInvitation = wt, t.saveRecentSearchPeer = At, t.resetRecentSearch = St, t.removeFromRecentSearch = Mt, t.pinMessageOptimistic = Ct, t.unpinMessageOptimistic = Rt, t.checkChatMember = Pt, t.hidePromoTooltip = xt;
    var Nt = n(69),
        jt = n(141),
        Ft = n(87),
        Ht = r(Ft),
        Ut = n(70),
        Gt = n(56),
        Bt = n(98),
        qt = n(143),
        zt = n(122),
        Wt = n(117),
        Kt = n(140),
        Vt = n(33),
        Qt = n(130),
        Yt = n(9),
        $t = t.TYPING_PERIOD = 5,
        Xt = 2e4,
        Zt = 8,
        Jt = (0, jt.updateLazyLocation)(),
        en = Jt.scheduleNav,
        tn = Jt.commitNav,
        nn = Jt.scheduleNavWithTimeOut,
        rn = t.ACTION_PRIORITIES = {
            block: 1,
            fav: 1,
            chat: 2,
            invite: 2,
            invite_link: 3,
            topic: 3,
            avatar: 4,
            photos: 5,
            search: 6,
            pin_hide: 7,
            pin_unhide: 7,
            unpin: 8,
            mute: 10,
            unmute: 10,
            clear: 11,
            leave: 12,
            "return": 12,
            block_community: 12,
            allow_community: 12
        };
    t.readLastMessages = u(function(e, t) {
        var n = t.tabs[e],
            r = Object.keys(n.msgs).map(function(n) {
                return (0, Wt.getMessage)(t, e, n)
            }).filter(function(e) {
                return !(0, Kt.isOut)(e)
            }).map(function(e) {
                return e.messageId
            }).sort(function(e, t) {
                return t - e
            });
        return n.skipped > 0 && (r = r.filter(function(e) {
            return intval(e) <= n.lastmsg - n.skipped
        })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Ht.readInboundEvent([6, e, r])]), (0, Nt.post)(Nt.CONTROLLER, {
            peer: e,
            ids: [r],
            hash: n.hash,
            act: "a_mark_read",
            gid: t.gid
        }).then(function() {
            return L(t, e, r, Ht.FLAG_OUTBOUND)
        }))
    }), t.deliverMessage = u(function(e, t, n) {
        var r = Date.now() + rand(0, 100).toFixed(0),
            a = n.tabs[e];
        return (0, Ut.retryFn)(Nt.post, 1)(Nt.CONTROLLER, {
            act: "a_send",
            to: e,
            hash: a.hash,
            msg: t.message,
            media: V(t.attaches),
            guid: r,
            share_url: t.share_url,
            random_id: t.rid,
            gid: n.gid,
            sticker_referrer: t.sticker_referrer
        }, Xt).then(function(e) {
            var t = Dt(e, 1),
                r = t[0];
            return n.version !== r.version && nav.reload({
                force: !0
            }), n
        })
    }), t.deliverEditedMessage = u(function(e, t, n) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_edit_message",
            hash: e.hash,
            id: t.messageId,
            peerId: e.peerId,
            gid: n.gid,
            msg: t.origText,
            media: V(t.attaches),
            share_url: t.share_url
        }, Xt).then(function(e) {
            var t = Dt(e, 1);
            return t[0], n
        })
    }), t.searchTopConv = ue(function(e) {
        return e.topConvTree
    }), t.searchLocalHints = ue(function(e) {
        return e.hintsTree
    }), t.sendTyping = u(function(e, t) {
        return t.tabs[e].lastTyping = Date.now(), (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_typing",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(e) {
            return t
        }, function(e) {
            return t
        })
    }), t.flushHistory = u(function(e, t) {
        return we(e, (0, Nt.post)("al_im.php", {
            act: "a_flush_history",
            id: e,
            from: "im",
            gid: t.gid,
            hash: t.tabs[e].hash
        }), t)
    }), t.updateChatTopic = u(function(e, t, n) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_chat",
            chat: e - 2e9,
            new_title: t,
            hash: n.tabs[e].hash
        }).then(function(t) {
            var r = Dt(t, 2),
                a = (r[0], r[1]);
            return n.tabs[e] = extend(n.tabs[e], (0, qt.normalizeTab)(n, a)), n
        })
    }), t.addNewMember = u(function(e, t, n) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_chat",
            chat: e - 2e9,
            new_peer: t.join(","),
            hash: n.tabs[e].hash
        }).then(function(t) {
            var r = Dt(t, 2),
                a = (r[0], r[1]);
            return n.tabs[e] = extend(n.tabs[e], (0, qt.normalizeTab)(n, a)), n
        })
    }), t.updateChatPhoto = u(function(e, t) {
        return e.kludges.source_act === qt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, Promise.resolve(t)) : (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_chat_photo",
            msg_id: e.messageId
        }).then(function(n) {
            var r = Dt(n, 2),
                a = r[0],
                i = r[1];
            t.chat_photo_msg = i;
            var o = t.tabs[e.peerId];
            if (t.tabs[e.peerId].photo = a, (0, qt.isFullyLoadedTab)(t, e.peerId)) {
                var s = e.kludges.source_act;
                o.history = (0, qt.addChatPhotoToUpdate)(e, s, t, c(o.history))
            }
            return t
        })
    }), t.leaveChat = u(function(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_leave_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Ce.bind(null, qt.CHAT_KICK_USER, vk.id, e, t))
    }), t.returnToChat = u(function(e, t) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_return_to_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Ce.bind(null, qt.CHAT_INVITE_USER, vk.id, e, t))
    }), t.toggleMutePeer = u(function(e, t, n) {
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_mute",
            peer: e,
            hash: n.tabs[e].hash,
            gid: n.gid,
            value: t
        }).then(function() {
            var r = t ? "mute" : "unmute";
            return window.Notifier && Notifier.lcSend("im", {
                act: r,
                peer: e
            }), n
        }).then(Re.bind(null, e, t))
    }), t.favMessage = u(function(e, t, n, r) {
        return xe(e, n, t, r), (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_mark_important",
            ids: e,
            val: t ? 1 : 0,
            from: "im",
            gid: r.gid,
            peer: n,
            hash: r.tabs[n].hash
        }).then(function(e) {
            return r
        })
    }), t.toggleDialogImportant = u(function(e, t) {
        var n = zt.FOLDER_MASKS[zt.FOLDER_IMPORTANT],
            r = t.tabs[e].folders & n,
            a = r ? Ht.resetDirectoriesEvent : Ht.setDirectoriesEvent;
        return t.longpoll.push([a([0, e, n, !0])]), (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_dialog_star",
            val: r ? 0 : 1,
            peer: e,
            hash: t.tabs[e].hash,
            gid: t.gid
        }).then(function() {
            return t
        })
    }), t.markDialogAnswered = u(function(e, t, n) {
        var r = zt.FOLDER_MASKS[zt.FOLDER_UNRESPOND];
        return n.longpoll.push([Ht.resetDirectoriesEvent([0, e, r, !0]), Ht.readInboundEvent([6, e, t])]), (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_mark_answered",
            peer: e,
            lastmsg: t,
            hash: n.tabs[e].hash,
            gid: n.gid
        }).then(function() {
            return n
        })
    }), t.deleteDialog = u(function(e, t) {
        return R(t, t.tabs[e], !0, function(t) {
            return t.filter(function(t) {
                return t !== e
            })
        }), t.tabs[e].deletedDialog = !0, (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_delete_dialog",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            return n[0] ? (mt(t.tabbedPeers.filter(function(t) {
                return t.peer !== e
            }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, R(t, t.tabs[e], !1, D.bind(null, e), it.bind(null, t))), n
        })
    }), t.pinMessage = u(function(e, t, n) {
        var r = n.tabs[t];
        return r.data.kicked || r.data.closed ? Promise.resolve(n) : (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_pin_message",
            msgid: e,
            chat: t,
            hash: n.tabs[t].hash
        }).then(function(e) {
            var a = Dt(e, 1),
                i = a[0];
            return n.tabs[t] = Object.assign({}, r, i), n
        })
    }), t.unpinMessage = u(function(e, t) {
        var n = t.tabs[e];
        return n.data.kicked || n.data.closed ? Promise.resolve(t) : (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_unpin_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(r) {
            var a = Dt(r, 1),
                i = a[0];
            return t.tabs[e] = Object.assign({}, n, i), t
        })
    }), t.getPinnedMessage = u(function(e, t) {
        var n = t.tabs[e];
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_pinned_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(e) {
            var r = Dt(e, 1),
                a = r[0];
            return n.pinned = a || null, t
        })
    }), t.getMessageLocalId = u(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Nt.post)(Nt.CONTROLLER, {
            act: "a_get_message_local_id",
            chat: e,
            chat_local_id: t,
            hash: r.hash
        })
    })
}, function(e, t, n) {
    var r = n(40),
        a = n(89);
    e.exports = function(e) {
        return r(a(e))
    }
}, function(e, t, n) {
    var r = n(84),
        a = n(11);
    e.exports = n(105) ? function(e, t, n) {
        return r.f(e, t, a(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t, n) {
    var r = n(84),
        a = n(127),
        i = n(136);
    e.exports = n(105) ? Object.defineProperties : function(e, t) {
        a(e);
        for (var n, o = i(t), s = o.length, u = 0; s > u;) r.f(e, n = o[u++], t[n]);
        return e
    }
}, , , function(e, t, n) {
    var r = n(127),
        a = n(27),
        i = n(12),
        o = n(146)("IE_PROTO"),
        s = function() {},
        u = "prototype",
        c = function() {
            var e, t = n(97)("iframe"),
                r = i.length,
                a = ">";
            for (t.style.display = "none", n(44).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + a), e.close(), c = e.F; r--;) delete c[u][i[r]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[u] = r(e), n = new s, s[u] = null, n[o] = e) : n = c(), void 0 === t ? n : a(n, t)
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(58),
        a = {};
    a[n(53)("toStringTag")] = "z", a + "" != "[object z]" && n(125)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (!e.first_name) {
            var t = e.name.split(" ", 2);
            e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
        }
        e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
    }

    function a(e, t) {
        var n = (0, s.unpackStore)(e);
        return t in n.oCache
    }

    function i(e, t) {
        var n = (0, s.unpackStore)(e).oCache[t];
        return n && !n._n && (r(n), n._n = 1), n
    }

    function o(e, t) {
        var n = (0, s.unpackStore)(e);
        n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.oCacheExists = a, t.oCacheGet = i, t.oCacheAdd = o;
    var s = n(117)
}, , , , function(e, t, n) {
    "use strict";

    function r() {
        return {
            txt: "",
            attaches: [],
            urlBinds: []
        }
    }

    function a(e, t) {
        this._db = e, this._key = t, this.dData = r(), this.load()
    }

    function i(e) {
        switch (e.type) {
            case "mail":
                return e.id < 0 && 1 == e.object.fwd_count;
            default:
                return !e.object
        }
    }

    function o(e) {
        return {
            txt: e.txt,
            attaches: e.attaches.length ? e.attaches : void 0,
            urlBinds: e.urlBinds.length ? e.urlBinds : void 0
        }
    }

    function s(e) {
        return {
            txt: e.txt,
            attaches: e.attaches || [],
            urlBinds: e.urlBinds || []
        }
    }

    function u(e, t) {
        var n = [];
        e.fwd_count ? n.push({
            type: "mail",
            id: -t,
            object: {
                fwd_count: e.fwd_count
            }
        }) : e.fwd && n.push({
            type: "mail",
            id: -t,
            object: {
                fwd_count: (0, m.parseFwd)(e.fwd).length
            }
        });
        for (var r = 1; e["attach" + r + "_type"]; ++r) n.push({
            type: e["attach" + r + "_type"],
            id: e["attach" + r],
            kind: e["attach" + r + "_kind"],
            productId: e["attach" + r + "_product_id"]
        });
        return e.geo && n.push({
            type: "geo",
            id: e.geo
        }), n
    }

    function c(e, t) {
        return new a(e, "draft_" + t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var d = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.ImDraft = a, t.convertKludgesToAttaches = u, t.loadDraftForPeer = c;
    var l = n(69),
        m = n(143);
    a.prototype.dump = function() {
        this._key && this._db.updateByKey(this._key, o(this.dData))
    }, a.prototype.load = function() {
        if (this._key) {
            var e = this._db.selectByKey(this._key);
            e && (this.dData = s(e))
        }
    }, a.prototype.clear = function() {
        this.dData = r(), this.dump()
    }, a.prototype.setText = function(e) {
        this.dData.txt = trim(e), this.dump()
    }, a.prototype.addAttach = function(e, t, n) {
        ("share" === e || "mail" === e) && this.removeAttachByType(e);
        var r = this.dData.attaches.find(function(n) {
            return n.type === e && n.id === t
        });
        !r && e && t && (this.dData.attaches.push({
            type: e,
            id: t,
            object: n
        }), this.dump())
    }, a.prototype.syncWithSelector = function(e) {
        var t = this,
            n = this.getFwdRaw();
        this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
            var n = d(e, 2),
                r = n[0],
                a = n[1],
                i = t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == a
                });
            return i || {
                type: r,
                id: a
            }
        })), this.dump()
    }, a.prototype.removeAttachByType = function(e) {
        for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
        this.dump()
    }, a.prototype.removeAllAttaches = function() {
        this.dData.attaches = [], this.dump()
    }, a.prototype.addBindUrl = function(e, t, n) {
        this.getBoundAttach(e) || (this.dData.urlBinds.push({
            url: e,
            type: t,
            id: n
        }), this.dump())
    }, a.prototype.getBoundAttach = function(e) {
        var t = this.dData.urlBinds.find(function(t) {
            return t.url === e
        });
        return t ? this.dData.attaches.find(function(e) {
            return e.type === t.type && e.id === t.id
        }) || null : null
    }, a.prototype.getShareUrl = function() {
        var e = this.dData.attaches.find(function(e) {
            return "share" === e.type
        });
        return e && e.object ? e.object.url : void 0
    }, a.prototype.hasAttaches = function() {
        return this.dData.attaches.length > 0
    }, a.prototype.destroy = function() {
        this.dData = {}, this._key = this._db = null
    }, a.prototype.prepareObjects = function(e, t) {
        var n = this,
            r = this.dData.attaches.find(i);
        return r ? (0, l.post)(l.CONTROLLER, {
            act: "draft_medias",
            gid: e,
            messageId: t || 0,
            media: t ? void 0 : this.dData.attaches.map(function(e) {
                return [e.type, e.id]
            }).join("*")
        }).then(function(e) {
            var t = d(e, 1),
                r = t[0];
            n.dData.attaches = r.map(function(e) {
                return {
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }
            })
        }) : Promise.resolve()
    }, a.prototype.getFwdRaw = function() {
        return this.dData.attaches.find(function(e) {
            return "mail" === e.type
        })
    }, a.prototype.getFwdCount = function() {
        var e = this.getFwdRaw();
        return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
    }
}, function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(30),
        a = n(11),
        i = n(132),
        o = {};
    n(26)(o, n(53)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(o, {
            next: a(1, n)
        }), i(e, t + " Iterator")
    }
}, function(e, t, n) {
    var r = n(124);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, , , function(e, t, n) {
    var r = n(25),
        a = n(120),
        i = n(116);
    e.exports = function(e) {
        return function(t, n, o) {
            var s, u = r(t),
                c = a(u.length),
                d = i(o, c);
            if (e && n != n) {
                for (; c > d;)
                    if (s = u[d++], s != s) return !0
            } else
                for (; c > d; d++)
                    if ((e || d in u) && u[d] === n) return e || d;
            return !e && -1
        }
    }
}, function(e, t, n) {
    e.exports = n(22).document && document.documentElement
}, function(e, t, n) {
    var r = n(114),
        a = n(11),
        i = n(25),
        o = n(72),
        s = n(2),
        u = n(134),
        c = Object.getOwnPropertyDescriptor;
    t.f = n(105) ? c : function(e, t) {
        if (e = i(e), t = o(t, !0), u) try {
            return c(e, t)
        } catch (n) {}
        return s(e, t) ? a(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    var r = n(89);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    var r = n(92),
        a = n(127),
        i = function(e, t) {
            if (a(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(81)(Function.call, n(45).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (a) {
                t = !0
            }
            return function(e, n) {
                return i(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: i
    }
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(84).f,
        a = n(30),
        i = (n(26), n(82)),
        o = n(81),
        s = n(38),
        u = n(89),
        c = n(68),
        d = n(94),
        l = n(102),
        m = n(15),
        f = n(105),
        _ = n(119).fastKey,
        p = f ? "_s" : "size",
        g = function(e, t) {
            var n, r = _(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        };
    e.exports = {
        getConstructor: function(e, t, n, d) {
            var l = e(function(e, r) {
                s(e, l, t, "_i"), e._i = a(null), e._f = void 0, e._l = void 0, e[p] = 0, void 0 != r && c(r, n, e[d], e)
            });
            return i(l.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete t[n.i];
                    e._f = e._l = void 0, e[p] = 0
                },
                "delete": function(e) {
                    var t = this,
                        n = g(t, e);
                    if (n) {
                        var r = n.n,
                            a = n.p;
                        delete t._i[n.i], n.r = !0, a && (a.n = r), r && (r.p = a), t._f == n && (t._f = r), t._l == n && (t._l = a), t[p]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    s(this, l, "forEach");
                    for (var t, n = o(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (n(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!g(this, e)
                }
            }), f && r(l.prototype, "size", {
                get: function() {
                    return u(this[p])
                }
            }), l
        },
        def: function(e, t, n) {
            var r, a, i = g(e, t);
            return i ? i.v = n : (e._l = i = {
                i: a = _(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = i), r && (r.n = i), e[p]++, "F" !== a && (e._i[a] = i)), e
        },
        getEntry: g,
        setStrong: function(e, t, n) {
            d(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? l(0, n.k) : "values" == t ? l(0, n.v) : l(0, [n.k, n.v]) : (e._t = void 0, l(1))
            }, n ? "entries" : "values", !n, !0), m(t)
        }
    }
}, , function(e, t, n) {
    var r = n(127);
    e.exports = function(e, t, n, a) {
        try {
            return a ? t(r(n)[0], n[1]) : t(n)
        } catch (i) {
            var o = e["return"];
            throw void 0 !== o && r(o.call(e)), i
        }
    }
}, function(e, t, n) {
    var r = n(91)("wks"),
        a = n(18),
        i = n(22).Symbol,
        o = "function" == typeof i;
    e.exports = function(e) {
        return r[e] || (r[e] = o && i[e] || (o ? i : a)("Symbol." + e))
    }
}, function(e, t, n) {
    var r = n(48),
        a = n(89);
    e.exports = function(e) {
        return function(t, n) {
            var i, o, s = String(a(t)),
                u = r(n),
                c = s.length;
            return 0 > u || u >= c ? e ? "" : void 0 : (i = s.charCodeAt(u), 55296 > i || i > 56319 || u + 1 === c || (o = s.charCodeAt(u + 1)) < 56320 || o > 57343 ? e ? s.charAt(u) : i : e ? s.slice(u, u + 2) : (i - 55296 << 10) + (o - 56320) + 65536)
        }
    }
}, , function(e, t) {
    "use strict";

    function n(e, t) {
        var n = [],
            r = 0;
        return function(a) {
            n.push(a), r || (r = setTimeout(function() {
                r = !1, e(n), n = []
            }, t))
        }
    }

    function r(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function a(e, t) {
        var n = void 0,
            r = void 0;
        if (window.__debugMode) {
            switch (t) {
                case "error":
                    n = "color: red", r = "background: red; color: white";
                    break;
                case "success":
                    n = "color: green", r = "background: green; color: white";
                    break;
                default:
                    n = "color: blue;", r = "background: #000; color: #fff;"
            }
            try {
                var a = new Date;
                console.debug("%cLP:[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ":" + a.getMilliseconds() + "]%c " + e, r, n)
            } catch (i) {}
        }
    }

    function i(e) {
        var t = [];
        if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function o(e) {
        for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
        return n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.throttleAccumulate = n, t.executionStackPop = r, t.lplog = a, t.toArray = i, t.arrayUnique = o
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var r = n(124),
        a = n(53)("toStringTag"),
        i = "Arguments" == r(function() {
            return arguments
        }()),
        o = function(e, t) {
            try {
                return e[t]
            } catch (n) {}
        };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = o(t = Object(e), a)) ? n : i ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, , , , , function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            callMutations: function() {
                if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                return e
            },
            bindMutations: function() {
                if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                return e = e.apply(void 0, arguments)
            }
        }
    }

    function a(e, t, n, r) {
        d(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
    }

    function i(e, t, n, r, a) {
        (0, u.addDelegateEvent)(t, n, r, a), e._registeredHandlers.push(["delegate", t, n, r, a])
    }

    function o(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(a.bind(null, t), i.bind(null, t)), t
    }

    function s(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? u.removeDelegateEvent.apply(void 0, t) : l.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = r, t.createModule = o, t.destroyModule = s;
    var u = n(17),
        c = window,
        d = c.addEvent,
        l = c.removeEvent
}, , function(e, t, n) {
    for (var r = n(73), a = n(125), i = n(22), o = n(26), s = n(128), u = n(53), c = u("iterator"), d = u("toStringTag"), l = s.Array, m = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], f = 0; 5 > f; f++) {
        var _, p = m[f],
            g = i[p],
            h = g && g.prototype;
        if (h) {
            h[c] || o(h, c, l), h[d] || o(h, d, p), s[p] = l;
            for (_ in r) h[_] || a(h, _, r[_], !0)
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = domData(t, "chat-id"),
            r = domData(t, "hash");
        return lockButton(t), (0, o.joinChat)(n, r, e.get()).then(function(n) {
            var r = i(n, 1),
                a = r[0];
            unlockButton(t), e.get().longpoll.push([(0, u.changePeer)(a)])
        })["catch"](function(e) {
            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
        })
    }

    function a(e, t) {
        var n = (0, s.createModule)({
            handlers: function(n, a) {
                a(e, "click", c, function(e) {
                    return r(t, e.target)
                })
            }
        });
        return {
            unmount: function() {
                (0, s.destroyModule)(n)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = a;
    var o = n(24),
        s = n(63),
        u = n(87),
        c = "_im_join_chat"
}, function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    var r = n(81),
        a = n(52),
        i = n(10),
        o = n(127),
        s = n(120),
        u = n(79);
    e.exports = function(e, t, n, c, d) {
        var l, m, f, _ = d ? function() {
                return e
            } : u(e),
            p = r(n, c, t ? 2 : 1),
            g = 0;
        if ("function" != typeof _) throw TypeError(e + " is not iterable!");
        if (i(_))
            for (l = s(e.length); l > g; g++) t ? p(o(m = e[g])[0], m[1]) : p(e[g]);
        else
            for (f = _.call(e); !(m = f.next()).done;) a(f, p, m.value, t)
    }
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        return t && (t.im_v = i), new Promise(function(r, a) {
            ajax.post(e, t, {
                timeout: n,
                onDone: function() {
                    r.apply(null, [
                        [].concat(Array.prototype.slice.call(arguments))
                    ])
                },
                onFail: function() {
                    return a.apply(null, arguments), !0
                }
            })
        })
    }

    function r(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = a(e, t, n),
            i = r.request;
        return i
    }

    function a(e, t) {
        function n() {
            a.abort()
        }
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = void 0;
        a = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var i = new Promise(function(n, i) {
            var o = void 0,
                s = Date.now(),
                u = r.timeout || 60,
                c = ajx2q(t);
            if (window.XDomainRequest) a.open("get", e + "?" + c), a.ontimeout = function() {
                i(["", {}])
            }, a.onerror = function() {
                i(["", {}])
            }, a.onload = function() {
                n([a.responseText, {}])
            }, setTimeout(function() {
                a.send()
            }, 0);
            else {
                a.onreadystatechange = function() {
                    4 == a.readyState && (clearInterval(o), a.status >= 200 && a.status < 300 ? n([a.responseText, a]) : i([a.responseText, a]))
                };
                try {
                    a.open("GET", e + "?" + c, !0)
                } catch (d) {
                    return i([d, a])
                }
                a.send()
            }
            o = setInterval(function() {
                Date.now() - s > 1e3 * u && (i(["", {}]), clearInterval(o))
            }, 1e3)
        });
        return {
            request: i,
            cancel: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.post = n, t.plainget = r, t.plaingetCancelable = a;
    var i = (t.CONTROLLER = "al_im.php", 1)
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return new Promise(function(n) {
            setTimeout(n.bind(null, t), 1e3 * e)
        })
    }

    function r(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            a = 0;
        return function i() {
            for (var o = arguments.length, s = Array(o), u = 0; o > u; u++) s[u] = arguments[u];
            return Promise.resolve().then(function() {
                return e.apply(void 0, s)
            })["catch"](function(e) {
                if (a++, t >= a) {
                    var o = "function" == typeof r ? r(a) : 0;
                    return 0 === o ? i.apply(void 0, s) : n(o).then(function() {
                        return i.apply(void 0, s)
                    })
                }
                throw e
            })
        }
    }

    function a(e, t, n) {
        var r = void 0,
            a = void 0;
        return function() {
            for (var i = arguments.length, o = Array(i), s = 0; i > s; s++) o[s] = arguments[s];
            return new Promise(function(e, i) {
                var s = function() {
                        r = null, a = null, n || e(o)
                    },
                    u = n && !r;
                clearTimeout(r), a && a.reject("debounce"), r = setTimeout(s, t), u ? e(o) : n && i("debounce"), a = {
                    resolve: e,
                    reject: i
                }
            }).then(function(t) {
                return e.apply(void 0, t)
            })
        }
    }

    function i(e, t) {
        var n = void 0,
            r = new Promise(function(r) {
                n = r, setTimeout(r.bind(null, t), 1e3 * e)
            });
        return {
            pause: function() {
                return r
            },
            abort: function() {
                n(t)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.pause = n, t.retryFn = r, t.debouncedPromise = a, t.abortablePause = i
}, , function(e, t, n) {
    var r = n(92);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, a;
        if (t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        if ("function" == typeof(n = e.valueOf) && !r(a = n.call(e))) return a;
        if (!t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    "use strict";
    var r = n(103),
        a = n(102),
        i = n(128),
        o = n(25);
    e.exports = n(94)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, a(1)) : "keys" == t ? a(0, n) : "values" == t ? a(0, e[n]) : a(0, [n, e[n]])
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
}, , , , , , function(e, t, n) {
    var r = n(58),
        a = n(53)("iterator"),
        i = n(128);
    e.exports = n(67).getIteratorMethod = function(e) {
        return void 0 != e ? e[a] || e["@@iterator"] || i[r(e)] : void 0
    }
}, , function(e, t, n) {
    var r = n(57);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, a) {
                    return e.call(t, n, r, a)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, n) {
    var r = n(125);
    e.exports = function(e, t, n) {
        for (var a in t) r(e, a, t[a], n);
        return e
    }
}, , function(e, t, n) {
    var r = n(127),
        a = n(134),
        i = n(72),
        o = Object.defineProperty;
    t.f = n(105) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), a) try {
            return o(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, , function(e, t, n) {
    var r = n(22),
        a = n(67),
        i = n(26),
        o = n(125),
        s = n(81),
        u = "prototype",
        c = function(e, t, n) {
            var d, l, m, f, _ = e & c.F,
                p = e & c.G,
                g = e & c.S,
                h = e & c.P,
                v = e & c.B,
                b = p ? r : g ? r[t] || (r[t] = {}) : (r[t] || {})[u],
                y = p ? a : a[t] || (a[t] = {}),
                E = y[u] || (y[u] = {});
            p && (n = t);
            for (d in n) l = !_ && b && void 0 !== b[d], m = (l ? b : n)[d], f = v && l ? s(m, r) : h && "function" == typeof m ? s(Function.call, m) : m, b && o(b, d, m, e & c.U), y[d] != m && i(y, d, f), h && E[d] != m && (E[d] = m)
        };
    r.core = a, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = P(e, 2),
            n = t[1];
        return {
            type: N,
            localId: n
        }
    }

    function a(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: F,
            messageId: n,
            mask: r,
            peerId: a
        }
    }

    function i(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: j,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function o(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: H,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function s(e) {
        var t = P(e, 11),
            n = t[1],
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5],
            s = t[6],
            u = t[7],
            c = t[8],
            d = t[9],
            l = t[10],
            m = extend(s, u || void 0);
        return {
            type: U,
            messageId: intval(n),
            flags: intval(r),
            peerId: intval(a),
            date: intval(i),
            attaches: (0, D.convertKludgesToAttaches)(m, n),
            subject: s.title || "",
            text: o,
            kludges: m,
            randomId: intval(c),
            userId: (0, x.isChatPeer)(a) ? intval(m.from) : intval(a),
            update_time: l,
            chat_local_id: d
        }
    }

    function u(e) {
        var t = s(e);
        return t.type = ce, t
    }

    function c(e) {
        return extend({}, e, {
            type: ce
        })
    }

    function d(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: G,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function l(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: B,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function m(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: q,
            userId: -n,
            platform: r,
            lastSeenTs: a
        }
    }

    function f(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: z,
            userId: -n,
            reason: r,
            lastSeenTs: a
        }
    }

    function _(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: X,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function p(e) {
        var t = P(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: Z,
            peerId: n,
            mask: r
        }
    }

    function g(e) {
        var t = P(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: J,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function h(e) {
        var t = P(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: ue,
            peerId: n,
            localId: r
        }
    }

    function v(e) {
        var t = P(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: W,
            chatId: n,
            self: r
        }
    }

    function b(e) {
        var t = P(e, 2),
            n = t[1];
        return {
            type: K,
            userId: n,
            peerId: n
        }
    }

    function y(e) {
        var t = P(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: K,
            userId: n,
            peerId: r + 2e9
        }
    }

    function E(e) {
        var t = P(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: V,
            userId: n,
            callId: r
        }
    }

    function T(e) {
        var t = P(e, 2),
            n = t[1];
        return {
            type: Q,
            count: n
        }
    }

    function k(e) {
        var t = P(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n;
        return {
            type: Y,
            peerId: r.peer_id,
            sound: r.sound,
            disabledUntil: r.disabled_until
        }
    }

    function I(e) {
        return {
            type: $,
            params: e
        }
    }

    function O(e) {
        return {
            type: te,
            state: e
        }
    }

    function L() {
        return {
            type: ee
        }
    }

    function w() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        return {
            type: ne,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function A(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        return {
            type: ae,
            peerId: e,
            msgid: t,
            forward: n,
            cancelSearch: r
        }
    }

    function S(e) {
        return {
            type: ie,
            tab: e
        }
    }

    function M(e, t, n) {
        return {
            type: oe,
            message: t,
            peer: e,
            error: n
        }
    }

    function C(e) {
        var t = P(e, 6),
            n = (t[0], t[1]),
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5];
        return {
            type: re,
            free: !!intval(n) || intval(i) === vk.id,
            resource: r,
            peerId: intval(a),
            who: intval(i),
            name: o
        }
    }

    function R(e, t) {
        return {
            type: se,
            message: t,
            peerId: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FOLDER_UNRESPOND = t.FOLDER_IMPORTANT = t.FLAG_STEALTH = t.FLAG_MEDIA = t.FLAG_DELETED = t.FLAG_SPAM = t.FLAG_FRIENDS = t.FLAG_CHAT = t.FLAG_IMPORTANT = t.FLAG_OUTBOUND = t.FLAG_UNREAD = t.EDIT_MESSAGE = t.DELETE_DIALOG = t.RESEND = t.FAILED_MESSAGE = t.CHANGE_TAB = t.CHANGE_PEER = t.MUTEX = t.RESET_PEER = t.TRANSITION = t.RESYNC = t.SET_DIRECTORIES = t.REPLACE_DIRECTORIES = t.RESET_DIRECTORIES = t.EMPTY = t.NOTIFY_SETTINGS_CHANGED = t.UNREAD_COUNT = t.VIDEO_CALL = t.TYPING = t.CHAT_CHANGED = t.GOT_OFFLINE = t.GOT_ONLINE = t.READ_OUTBOUND = t.READ_INBOUND = t.ADD_MESSAGE = t.RESET_FLAGS = t.REPLACE_FLAGS = t.SET_FLAGS = t.DELETE = void 0;
    var P = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.deleteEvent = r, t.replaceFlagsEvent = a, t.setFlagsEvent = i, t.resetFlagsEvent = o, t.addMessageEvent = s, t.editMessageEvent = u, t.editMessageLocallyEvent = c, t.readInboundEvent = d, t.readOutboundEvent = l, t.gotOnlineEvent = m, t.gotOfflineEvent = f, t.resetDirectoriesEvent = _, t.replaceDirectoriesEvent = p, t.setDirectoriesEvent = g, t.deleteDialogEvent = h, t.chatChangedEvent = v, t.typingUserEvent = b, t.typingChatEvent = y, t.videoCallEvent = E, t.unreadCountEvent = T, t.notifySettingsChangedEvent = k, t.emptyEvent = I, t.transitionEvent = O, t.resyncEvent = L, t.resetPeer = w, t.changePeer = A, t.changeTab = S, t.failedMessage = M, t.mutexEvent = C, t.resendEvent = R;
    var x = n(143),
        D = n(37),
        N = t.DELETE = "event_delete",
        j = t.SET_FLAGS = "event_set_flags",
        F = t.REPLACE_FLAGS = "event_replace_flags",
        H = t.RESET_FLAGS = "event_reset_flags",
        U = t.ADD_MESSAGE = "event_add_message",
        G = t.READ_INBOUND = "event_read_inbound",
        B = t.READ_OUTBOUND = "event_read_outbound",
        q = t.GOT_ONLINE = "event_got_online",
        z = t.GOT_OFFLINE = "event_got_offline",
        W = t.CHAT_CHANGED = "event_chat_changed",
        K = t.TYPING = "event_typing",
        V = t.VIDEO_CALL = "event_video_call",
        Q = t.UNREAD_COUNT = "event_unread_count",
        Y = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
        $ = t.EMPTY = "event_empty",
        X = t.RESET_DIRECTORIES = "event_reset_directories",
        Z = t.REPLACE_DIRECTORIES = "event_replace_directories",
        J = t.SET_DIRECTORIES = "event_set_directories",
        ee = t.RESYNC = "event_resync",
        te = t.TRANSITION = "transition_event",
        ne = t.RESET_PEER = "reset_peer",
        re = t.MUTEX = "mutex",
        ae = t.CHANGE_PEER = "change_peer",
        ie = t.CHANGE_TAB = "event_change_tab",
        oe = t.FAILED_MESSAGE = "event_failed_message",
        se = t.RESEND = "event_resend",
        ue = t.DELETE_DIALOG = "event_delete_dialog",
        ce = t.EDIT_MESSAGE = "event_edit_message";
    t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FLAG_STEALTH = 65536, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2
}, , function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, , function(e, t, n) {
    var r = n(22),
        a = "__core-js_shared__",
        i = r[a] || (r[a] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(108),
        a = n(86),
        i = n(125),
        o = n(26),
        s = n(2),
        u = n(128),
        c = n(39),
        d = n(132),
        l = n(23),
        m = n(53)("iterator"),
        f = !([].keys && "next" in [].keys()),
        _ = "@@iterator",
        p = "keys",
        g = "values",
        h = function() {
            return this
        };
    e.exports = function(e, t, n, v, b, y, E) {
        c(n, t, v);
        var T, k, I, O = function(e) {
                if (!f && e in S) return S[e];
                switch (e) {
                    case p:
                        return function() {
                            return new n(this, e)
                        };
                    case g:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            L = t + " Iterator",
            w = b == g,
            A = !1,
            S = e.prototype,
            M = S[m] || S[_] || b && S[b],
            C = M || O(b),
            R = b ? w ? O("entries") : C : void 0,
            P = "Array" == t ? S.entries || M : M;
        if (P && (I = l(P.call(new e)), I !== Object.prototype && (d(I, L, !0), r || s(I, m) || o(I, m, h))), w && M && M.name !== g && (A = !0, C = function() {
                return M.call(this)
            }), r && !E || !f && !A && S[m] || o(S, m, C), u[t] = C, u[L] = h, b)
            if (T = {
                    values: w ? C : O(g),
                    keys: y ? C : O(p),
                    entries: R
                }, E)
                for (k in T) k in S || i(S, k, T[k]);
            else a(a.P + a.F * (f || A), t, T);
        return T
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(54)(!0);
    n(94)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, n) {
    var r = n(92),
        a = n(22).document,
        i = r(a) && r(a.createElement);
    e.exports = function(e) {
        return i ? a.createElement(e) : {}
    }
}, function(e, t) {
    "use strict";

    function n(e) {
        return "im_store_" + e
    }

    function r(e) {
        return ls.get(n(e)) || {}
    }

    function a(e, t, r) {
        if (ls.checkVersion()) {
            var a = JSON.stringify(t);
            rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", a.length), r(n(e), a)
        }
    }

    function i(e, t, n) {
        return t === l ? e[t] || [] : t === m ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
    }

    function o(e, t, n) {
        switch (e[t] || (e[t] = {}), t) {
            case l:
                var r = n;
                r && r.length > 0 ? e[t] = r : delete e[t];
                break;
            case m:
                var a = d(n, 2),
                    i = a[0],
                    o = a[1];
                o ? e[t][i] = +o : delete e[t][i]
        }
        return e
    }

    function s(e, t) {
        for (var n = ["fwd", "draft", "bind_attach"], i = r(e), o = !1, s = n.length; s--;) n[s] in i && (delete i[n[s]], o = !0);
        o && a(e, i, t)
    }

    function u(e, t, r) {
        r.key === n(e) && (t.db = JSON.parse(r.newValue), t.checkTime = Date.now())
    }

    function c(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        ls.checkVersion() && s(e, t);
        var n = {
                db: r(e),
                checkTime: Date.now()
            },
            c = u.bind(null, e, n);
        return window.addEventListener("storage", c, !1), {
            select: function(t, a) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), i(n.db, t, a)
            },
            selectByKey: function(t) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), n.db[t]
            },
            update: function(r, i) {
                var s = o(n.db, r, i);
                return n.db = s, n.checkTime = Date.now(), a(e, s, t)
            },
            updateByKey: function(r, i) {
                return n.db[r] = i, n.checkTime = Date.now(), a(e, n.db, t)
            },
            unmount: function() {
                window.removeEventListener("storage", c, !1)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var d = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.deleteOldStoredFormat = s, t.mount = c;
    var l = t.RECENT_SEARCH_OP = "recent_search",
        m = t.PIN_HIDDEN_ID_OP = "pin_hide"
}, , function(e, t, n) {
    var r = n(53)("iterator"),
        a = !1;
    try {
        var i = [7][r]();
        i["return"] = function() {
            a = !0
        }, Array.from(i, function() {
            throw 2
        })
    } catch (o) {}
    e.exports = function(e, t) {
        if (!t && !a) return !1;
        var n = !1;
        try {
            var i = [7],
                o = i[r]();
            o.next = function() {
                n = !0
            }, i[r] = function() {
                return o
            }, e(i)
        } catch (s) {}
        return n
    }
}, , function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, n) {
    var r = n(53)("unscopables"),
        a = Array.prototype;
    void 0 == a[r] && n(26)(a, r, {}), e.exports = function(e) {
        a[r][e] = !0
    }
}, function(e, t, n) {
    n(32), n(96), n(65), n(21), e.exports = n(67).Map
}, function(e, t, n) {
    e.exports = !n(14)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, , , function(e, t) {
    e.exports = !1
}, , , function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            unmount: function() {
                (0, i.destroyModule)(e)
            }
        }
    }

    function a(e, t, n) {
        var a = (0, i.createMutations)(r),
            o = a.bindMutations,
            s = (0, i.createModule)({
                handlers: function(e, t) {}
            });
        return o(s)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = a;
    var i = n(63)
}, , , function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, n) {
    "use strict";
    var r = n(22),
        a = n(86),
        i = n(125),
        o = n(82),
        s = n(119),
        u = n(68),
        c = n(38),
        d = n(92),
        l = n(14),
        m = n(100),
        f = n(132),
        _ = n(126);
    e.exports = function(e, t, n, p, g, h) {
        var v = r[e],
            b = v,
            y = g ? "set" : "add",
            E = b && b.prototype,
            T = {},
            k = function(e) {
                var t = E[e];
                i(E, e, "delete" == e ? function(e) {
                    return h && !d(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return h && !d(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return h && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
        if ("function" == typeof b && (h || E.forEach && !l(function() {
                (new b).entries().next()
            }))) {
            var I = new b,
                O = I[y](h ? {} : -0, 1) != I,
                L = l(function() {
                    I.has(1)
                }),
                w = m(function(e) {
                    new b(e)
                }),
                A = !h && l(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            w || (b = t(function(t, n) {
                c(t, b, e);
                var r = _(new v, t, b);
                return void 0 != n && u(n, g, r[y], r), r
            }), b.prototype = E, E.constructor = b), (L || A) && (k("delete"), k("has"), g && k("get")), (A || O) && k(y), h && E.clear && delete E.clear
        } else b = p.getConstructor(t, e, g, y), o(b.prototype, n), s.NEED = !0;
        return f(b, e), T[e] = b, a(a.G + a.W + a.F * (b != v), T), h || p.setStrong(b, e, g), b
    }
}, function(e, t, n) {
    var r = n(48),
        a = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? a(e + t, 0) : i(e, t)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e) {
        return e.get ? e.get() : e
    }

    function i(e, t) {
        var n = a(e),
            r = n.tabs[n.peer];
        return Object.keys(r.msgs).filter(function(n) {
            var a = v(e, t, n);
            return !(0, G.isOut)(a) && intval(n) > r.in_up_to
        })[0]
    }

    function o(e) {
        var t = a(e);
        return t.peer
    }

    function s(e, t) {
        var n = a(e);
        return n.tabs[t]
    }

    function u(e) {
        var t = a(e);
        return t.peer ? t.tabs[t.peer] : null
    }

    function c(e) {
        var t = a(e);
        return t.selectedMessages
    }

    function d(e, t, n) {
        var r = s(e, t),
            a = c(e)[0];
        if ("undefined" == typeof a) return [n];
        var i = Math.min(n, a),
            o = Math.max(n, a);
        return Object.keys(r.msgs).filter(function(e) {
            return e >= i && o >= e
        }).filter(function(t) {
            return !(0, W.isServiceMsg)(v(e, e.get().peer, t))
        }).map(intval)
    }

    function l(e, t) {
        var n = a(t),
            r = s(n, e),
            i = 0;
        for (var o in r.msgs)
            if (r.msgs.hasOwnProperty(o)) {
                var u = v(t, e, o);
                (0, G.isOut)(u) || (i += (0, G.isUnread)(r, u) ? 1 : 0)
            }
        return i
    }

    function m(e, t, n) {
        var r = s(e, t);
        return Object.keys(r.msgs).filter(function(r) {
            return intval(v(e, t, r).randomId) === n
        }).length > 0
    }

    function f(e, t, n) {
        var r = m(e, t, n);
        return !!r
    }

    function _(e, t) {
        var n = a(e),
            r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
        return "undefined" != typeof r ? 2e9 + r : t
    }

    function p(e, t, n) {
        var r = s(e, t),
            a = v(e, t, n),
            i = Object.keys(r.msgs).filter(function(n) {
                var r = v(e, t, n),
                    i = r.local && r.type !== B.EDIT_MESSAGE;
                return !a.local && i ? !1 : a.local && !i ? !0 : _(e, a.messageId) > _(e, r.messageId)
            }),
            o = i.pop();
        return o ? v(e, t, o) : null
    }

    function g(e) {
        return e && e.length > 0 ? q.addMessageEvent([0].concat(e)) : e
    }

    function h(e, t, n) {
        var r = s(e, t),
            i = v(e, t, n),
            o = a(e);
        return (0, G.isOut)(i) ? (0, K.oCacheGet)(e, o.id).name : i.userId !== i.peerId ? (0, K.oCacheExists)(e, i.userId) ? (0, K.oCacheGet)(e, i.userId).name : !1 : r.tab
    }

    function v(e, t, n) {
        var r = s(e, t),
            a = r && r.msgs && r.msgs[n];
        return a ? g(a) : null
    }

    function b(e) {
        var t = a(e);
        return t.gid || t.isClassic
    }

    function y(e) {
        return a(e).gid
    }

    function E(e) {
        return a(e).gid
    }

    function T(e) {
        return a(e).gid
    }

    function k(e, t) {
        var n = a(t);
        return n.tabs[e] || n.mapped_index[e]
    }

    function I(e) {
        var t = a(e);
        return T(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === z.FOLDER_UNRESPOND || t.active_tab === z.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function O(e, t) {
        e = a(e);
        var n = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
        return e.tabs[t] && e.tabs[t].msgs && n ? !0 : !1
    }

    function L(e, t) {
        var n = s(e, t);
        n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
    }

    function w(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function A(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function S(e) {
        var t = a(e);
        return !t.lockedSending
    }

    function M(e) {
        return e > -2e9 && 0 > e
    }

    function C(e, t) {
        return M(t) ? !!s(e, t).blocked_community : !1
    }

    function R(e) {
        var t = a(e);
        return t.voice_message_available
    }

    function P(e) {
        var t = a(e);
        return !(!x(t) && !t.recentSearch)
    }

    function x(e) {
        var t = a(e);
        return t.searchText
    }

    function D(e, t) {
        var n = a(e);
        return t && t !== x(e) || n.recentSearch ? !0 : !1
    }

    function N(e) {
        var t = a(e);
        return t.recentSearch
    }

    function j(e) {
        var t = u(e);
        return t && t.pinned && g(t.pinned)
    }

    function F(e) {
        var t = e.get().popular_sugg;
        return t && t.length > 0
    }

    function H(e) {
        return 1 == a(e).isEditing
    }

    function U(e) {
        return e.draft || (e.draft = (0, V.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.unpackStore = a, t.getFirstUnread = i, t.getPeer = o, t.getTab = s, t.getCurrentTab = u, t.getSelectedMessages = c, t.getMessageRangeFromSelection = d, t.countUnread = l, t.getMessageByRid = m, t.isRidExist = f, t.getLocalId = _, t.getLastMessage = p, t.parserMessage = g, t.getAuthorFullName = h, t.getMessage = v, t.isClassicInterface = b, t.isLocksAvailable = y, t.isFoldersAvailable = E, t.isCommunityInterface = T, t.getBareTab = k, t.isReversedDialogs = I, t.isFullyLoadedTab = O, t.makeTabNotFullyLoaded = L, t.isGoToEndVisible = w, t.getUnreadScrollBottom = A, t.isSendingAvailable = S, t.isCommunityPeer = M, t.isCommunityBlocked = C, t.checkVoiceMessageAvailable = R, t.isSearching = P, t.getSearchText = x, t.isSearchingValue = D, t.isRecentSearchesActive = N, t.getPinnedMessage = j, t.doPopularSuggExist = F, t.isAnyMessageBeingEdited = H, t.getTabDraft = U;
    var G = n(140),
        B = n(87),
        q = r(B),
        z = n(122),
        W = n(143),
        K = n(33),
        V = n(37)
}, , function(e, t, n) {
    var r = n(18)("meta"),
        a = n(92),
        i = n(2),
        o = n(84).f,
        s = 0,
        u = Object.isExtensible || function() {
            return !0
        },
        c = !n(14)(function() {
            return u(Object.preventExtensions({}))
        }),
        d = function(e) {
            o(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        l = function(e, t) {
            if (!a(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
                if (!u(e)) return "F";
                if (!t) return "E";
                d(e)
            }
            return e[r].i
        },
        m = function(e, t) {
            if (!i(e, r)) {
                if (!u(e)) return !0;
                if (!t) return !1;
                d(e)
            }
            return e[r].w
        },
        f = function(e) {
            return c && _.NEED && u(e) && !i(e, r) && d(e), e
        },
        _ = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: l,
            getWeak: m,
            onFreeze: f
        }
}, function(e, t, n) {
    var r = n(48),
        a = Math.min;
    e.exports = function(e) {
        return e > 0 ? a(r(e), 9007199254740991) : 0
    }
}, , function(e, t) {
    "use strict";

    function n(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, a = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
        i = "(https?:\\/\\/)?",
        o = "((?:[" + a + "\\—\\-\\_]+\\.){1,5})",
        s = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
        u = "(?:\\:(\\d{2,5}))",
        c = "(" + o + s + u + "?)",
        d = "([\\/?#])",
        l = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
        m = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
        f = "　-〿＀-￯",
        _ = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
        p = "[" + l + _ + m + f + "]",
        g = "(?:\\(|\\[)[" + a + "\\d&#%;,]+(?:\\)|\\])",
        h = "(" + d + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + p + "+|" + g + "){0,200})?",
        v = i + c + h,
        b = "ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,arpa,aero,asia,biz,cat,com,coop,info,int,jobs,media,mobi,museum,name,net,org,place,post,pro,tattoo,tel,travel,xxx,club,academy,camera,edu,gov,mil,local,international,bar,design",
        y = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
        E = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
        T = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
        k = t.ARROW_DOWN = 40,
        I = t.PAGE_UP = 33,
        O = t.PAGE_DOWN = 34,
        L = t.END_KEY = 35,
        w = t.HOME = 36,
        A = t.ENTER = 13,
        S = t.ESC = 27,
        M = (t.UNPRINTABLE_KEYS = [T, k, I, O, A, S, L, w], t.UP_DOWN_CONTROLS = [I, O, k, T, w, L], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
        C = t.FOLDER_ALL = "all",
        R = t.FOLDER_UNRESPOND = "unrespond",
        P = t.FOLDER_IMPORTANT = "important",
        x = (t.FOLDERS = [C, M, R, P], t.FOLDER_MASKS = (r = {}, n(r, R, 2), n(r, P, 1), r), t.TOP_DOMAINS = [].concat(b.split(","), y.split(","), E.split(",").map(function(e) {
            return "xn--" + e
        })));
    t.MAX_DOMAIN_LENGTH = x.reduce(function(e, t) {
        return Math.max(e, t.length)
    }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + o + s + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(v, "ig")
}, , function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var r = n(22),
        a = n(26),
        i = n(2),
        o = n(18)("src"),
        s = "toString",
        u = Function[s],
        c = ("" + u).split(s);
    n(67).inspectSource = function(e) {
        return u.call(e)
    }, (e.exports = function(e, t, n, s) {
        var u = "function" == typeof n;
        u && (i(n, "name") || a(n, "name", t)), e[t] !== n && (u && (i(n, o) || a(n, o, e[t] ? "" + e[t] : c.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : a(e, t, n) : (delete e[t], a(e, t, n)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[o] || u.call(this)
    })
}, function(e, t, n) {
    var r = n(92),
        a = n(47).set;
    e.exports = function(e, t, n) {
        var i, o = t.constructor;
        return o !== n && "function" == typeof o && (i = o.prototype) !== n.prototype && r(i) && a && a(e, i), e
    }
}, function(e, t, n) {
    var r = n(92);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t) {
    e.exports = {}
}, , function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        if ("Script error." !== e) {
            var i = a ? a.stack || a.message : null;
            o("unhandled_error", i ? {
                err: e,
                stack: i
            } : {
                err: e
            })
        }
        m && m.apply(this, arguments)
    }

    function a(e) {
        e.preventDefault()
    }

    function i() {
        return !!window.imwl
    }

    function o(e, t) {
        i() && (console.error(e, t),
            console.trace(), (0, l.retryFn)(d.post, 3, function() {
                return 2
            })("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: f++,
                    ua: navigator.userAgent,
                    noSh: 1
                }, t))
            }))
    }

    function s(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return o(e, extend({
            err: t && t.message || t
        }, n)), Promise.reject(t)
    }

    function u() {
        m = window.onerror, window.onerror = r, window.addEventListener("unhandledrejection", a)
    }

    function c() {
        window.onerror = m, m = void 0, window.removeEventListener("unhandledrejection", a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isWeirdLogging = i, t.imWeirdLog = o, t.imWeirdCatch = s, t.startLoggingAllUnhandled = u, t.stopLoggingAllUnhandled = c;
    var d = n(69),
        l = n(70),
        m = void 0,
        f = 1
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        t = (0, u.parserMessage)(t);
        var n = vk.id == t.peerId && !(0, u.unpackStore)(e).gid;
        return 333 == t.peerId ? !1 : n || (0, c.isOut)(t) ? (0, d.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : (0, c.isGift)(t) || (0, c.isSticker)(t) || (0, c.isAudioMsg)(t) || (0, c.isGraffiti)(t) || (0, c.isMoney)(t) || (0, c.isMessageWithInviteLink)(t) ? !1 : (0, u.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : (0, d.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
    }

    function a(e) {
        var t = document.createElement("div");
        return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
    }

    function i(e, t) {
        var n = t && t.msgs ? Object.keys(t.msgs) : [],
            a = n.filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return r(e, t.msgs[n])
            });
        return +a || null
    }

    function o(e, t, n) {
        var r = (0, l.convertKludgesToAttaches)(t.kludges, t.messageId),
            i = n.dData.attaches;
        if (a(t.text) !== n.dData.txt || r.length !== i.length) return !0;
        for (var o = r.length; o--;)
            if (r[o].id != i[o].id || r[o].type != i[o].type) return !0;
        return !1
    }

    function s(e, t, n, r, a) {
        t.origText = n, t.text = (0, d.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = a, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.canMessageBeEdited = r, t.convertEmojiHtmlToRegularText = a, t.findLastMessageToEdit = i, t.wasMessageReallyModified = o, t.replaceMsgAfterEdit = s;
    var u = n(117),
        c = n(140),
        d = n(143),
        l = n(37)
}, function(e, t, n) {
    var r = n(84).f,
        a = n(2),
        i = n(53)("toStringTag");
    e.exports = function(e, t, n) {
        e && !a(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}, , function(e, t, n) {
    e.exports = !n(105) && !n(14)(function() {
        return 7 != Object.defineProperty(n(97)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, , function(e, t, n) {
    var r = n(147),
        a = n(12);
    e.exports = Object.keys || function(e) {
        return r(e, a)
    }
}, , , , function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t) {
        return "number" != typeof t.messageId ? !0 : i(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
    }

    function i(e) {
        return e.flags & y.FLAG_OUTBOUND
    }

    function o(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = e.attaches[0];
        return r && (r.type === t || r.type === n)
    }

    function s(e) {
        return o(e, "doc") && "graffiti" === e.attaches[0].kind
    }

    function u(e) {
        return o(e, "doc") && "audiomsg" === e.attaches[0].kind
    }

    function c(e) {
        return o(e, "sticker")
    }

    function d(e) {
        return o(e, "gift")
    }

    function l(e) {
        return o(e, "money_transfer", "money_request")
    }

    function m(e) {
        return o(e, "money_request")
    }

    function f(e) {
        return o(e, "link") && _(e.kludges.attach1_url)
    }

    function _(e) {
        var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
            n = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
        return t.test(e) || n.test(e)
    }

    function p(e) {
        return e.flags & y.FLAG_IMPORTANT
    }

    function g(e) {
        return i(e) ? vk.id : e.userId
    }

    function h(e) {
        return e.update_time > 0
    }

    function v(e, t) {
        return (e.get().selectedMessages || []).indexOf(t) >= 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isUnread = a, t.isOut = i, t.isGraffiti = s, t.isAudioMsg = u, t.isSticker = c, t.isGift = d, t.isMoney = l, t.isMoneyRequest = m, t.isMessageWithInviteLink = f, t.isImportant = p, t.getUserId = g, t.wasEdited = h, t.isMessageSelected = v;
    var b = n(87),
        y = r(b)
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = o({}, i.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var n = i.toStr(t);
        i.setLoc(n)
    }

    function r() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = o(e, t)
            },
            commitNav: function() {
                n(e), e = {}
            },
            scheduleNavWithTimeOut: function(t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                e = o(e, t), setTimeout(function() {
                    n(e), e = {}
                }, r)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateLocation = n, t.updateLazyLocation = r;
    var a = window,
        i = a.nav,
        o = a.extend
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i() {
        var e = Kt.get(zn);
        return e || 0
    }

    function o(e) {
        e >= window.clientHeight() - 30 && (e = 0), Kt.set(zn, e)
    }

    function s(e, t) {
        var n = cn(e, t),
            r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
        r && gn(n.firstElementChild, {
            height: n.parentNode.offsetHeight
        })
    }

    function u(e, t) {
        e && e.innerHTML !== t && (e.innerHTML = t)
    }

    function c(e, t) {
        var n = window.devicePixelRatio >= 2 ? "256" : "128";
        return t ? '<div class="im_sticker_row">\n      <a onmouseover="return Emoji.stickerOver(' + Zt(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + Zt(t) + ', this, event);">\n          <img height="128"\n            class="im_gift"\n            src="/images/stickers/' + Zt(e) + "/" + n + '.png"/>\n      </a>\n    </div>' : '<div class="im_sticker_row">\n      <img height="128"\n        class="im_gift"\n        src="/images/stickers/' + Zt(e) + "/" + n + '.png"/>\n    </div>'
    }

    function d(e, t, n) {
        var r = e.get ? e.get() : e;
        if (R(r, t)) {
            var a = r.tabs[t].deleted || [];
            return Xt(n, a)
        }
        return !1
    }

    function l(e, t, n) {
        var r = n.randomId,
            a = cn("_im_mess_rid" + r, t);
        return a && (t = te([a], t), t = E(e, n, t, !0, !1)), t
    }

    function m(e) {
        var t = (0, pt.checkVoiceMessageAvailable)(e);
        return "undefined" != typeof t ? Promise.resolve(t) : f().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function f() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function _(e) {
        return vn("im_preloader", {
            preloader: Yt(Wt.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function p(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function g(e) {
        var t = cn("_im_invisible_bar", e);
        t && (mn(t, "_im_invisible_bar"), mn(t, "im-page--history-new-bar_hide"))
    }

    function h(e, t, n) {
        var r = v(e, t),
            a = cn("_im_mess_" + t.messageId, n);
        return a && a.parentNode.replaceChild(Vt(r), a), n
    }

    function v(e, t) {
        var n = ["_im_mess"],
            r = (0, yt.isUnread)(e.tabs[t.peerId], t);
        (0, yt.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), (0, yt.isOut)(t) && n.push("im-mess_out"), (0, yt.wasEdited)(t) && n.push("im-mess_was_edited"), (0, wt.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), (0, yt.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
        var a = Date.now() - 1e3 * t.date > 1e3;
        t.local && a && n.push("im-mess_sending"), t.local && n.push("" + St), t.local && (0, yt.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + Mt), (0, yt.isGift)(t) && n.push("im-mess_gift");
        var i = b(t),
            o = j(t.text, t.kludges);
        "" != o && (0, yt.wasEdited)(t) && (o += vn("sImLblWasEdited", {
            update_time: t.update_time
        })), t.subject && "..." !== t.subject.trim() && !S(t.peerId) && (o = vn("im_topic", {
            topic: t.subject
        }) + o);
        var s = vn("im_message_media", {
            messageId: t.messageId,
            attaches: i.join(""),
            text: (0, yt.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
        });
        return (0, yt.isGift)(t) || (s = o + s), "" == o && (0, yt.wasEdited)(t) && (s += vn("sImLblWasEdited", {
            update_time: t.update_time
        })), vn("im_msg_row", {
            msg_id: t.messageId,
            from_id: t.peerId,
            text: s,
            aria_hidden: t.local && !t.failed ? "true" : "false",
            ts: t.date,
            marker_params: t.failed ? 'aria-label="' + bn("mail_send_message_error") + '" role="link"' : "",
            unread_params: r ? 'aria-label="' + bn("mail_unread_message") + '"' : "",
            cls: n.join(" ")
        })
    }

    function b(e) {
        return e.attaches.map(function(e) {
            return "sticker" === e.type ? c(e.id, e.productId) : _(e.type)
        })
    }

    function y(e) {
        for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) _n(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", vn("sImHistoryRowActions")), mn(t[n], "_im_mess_noa")
    }

    function E(e, t, n) {
        var r = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            i = Date.now() - 1e3 * t.date > 1e3,
            o = e.tabs[t.peerId];
        if (!n || cn("_im_mess", n) || cn("_im_bar_date", n) || (n.innerHTML = ""), o.skipped > 0) return n;
        var s = [];
        t.local || (s = e.imQueue(t.peerId, r)), s.length > 0 && te(s.map(function(e) {
            return cn("_im_mess_rid" + e.rid, n)
        }, n).filter(function(e) {
            return e
        }));
        var u = v(e, t),
            c = rn(n);
        _n(c, "_im_mess_stack") || (c = on(c, "._im_mess_stack", -1));
        var d = (0, pt.getLastMessage)(e, t.peerId, t.messageId),
            l = cn("_im_unread_bar_row", n),
            m = (0, yt.getUserId)(t),
            f = d ? x(d.date, e) : 0;
        if (!d || D(o, d, t, e, a)) {
            var _ = "",
                p = !1;
            if (l && (0, yt.isOut)(t) && qe(e, n, t.peerId), 1 === o.unread && !(0, yt.isOut)(t) && a && (_ += vn("im_mess_bar", {}), p = !0, qe(e, n, t.peerId)), !wn(new Date(f))) {
                var g = new Date,
                    h = p ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                _ += vn("im_day_bar", {
                    day: On(t.date, e.timeshift, !0, bn("months_of", "raw"), !0),
                    date: t.date,
                    day_class: g.getDate() + g.getMonth() + g.getFullYear() + " " + h
                })
            }
            if (ue(t)) _ += vn("im_service_row", {
                text: de(e, t, o),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                var b = e.gid && (0, yt.isOut)(t) ? Zt(t.kludges.from_admin) || 0 : 0,
                    E = (0, Ot.oCacheGet)(e, b ? -e.gid : m) || o,
                    k = S(t.peerId) ? E.name : E.first_name,
                    I = E.link || o.href,
                    O = vn("im_mess_stack_name", {
                        name: k,
                        link: I,
                        "class": (0, yt.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                    });
                if ((0, yt.isGift)(t)) {
                    var L = bn("mail_gift_message_sent", "raw");
                    O += ' <span class="im-mess-stack--gift">' + yn(E.sex || 0, L) + "</span>"
                }
                if ((0, yt.isMoney)(t)) {
                    var w = (0, yt.isMoneyRequest)(t) ? bn("mail_money_request_message_sent", "raw") : bn("mail_money_tranfer_message_sent", "raw");
                    O += ' <span class="im-mess-stack--money-transfer">' + yn(E.sex || 0, w) + "</span>"
                }
                t.attaches[0] && "chronicle_invite" === t.attaches[0].type && (O += " " + bn("mail_chronicle_invite_inf"));
                var A = e.gid ? "/gim" + e.gid : "/im",
                    M = void 0;
                if (M = t.local ? N(t.date, e.timeshift) : vn("im_stack_date", {
                        date: N(t.date, e.timeshift),
                        link: A + "?sel=" + t.peerId + "&msgid=" + t.messageId
                    }), b && e.admins[b]) {
                    var C = e.admins[b],
                        R = b === Wt.id ? bn("mail_by_you") : C[0];
                    M = M + " " + vn("im_admin_link", {
                        name: R,
                        href: C[1]
                    })
                }
                _ += vn("im_mess_stack", {
                    photo: E.photo,
                    href: I,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: en(O),
                    stack_name: O,
                    peerId: m,
                    date: M,
                    messages: u,
                    admin: t.kludges.from_admin || 0
                })
            }(0, It.toArray)($t(_)).forEach(function(e) {
                return n && n.appendChild(e)
            })
        } else l && e.peer === t.peerId && !o.inplaceSearch && (0, yt.isOut)(t) && qe(e, n, t.peerId), cn("_im_stack_messages", c).appendChild(Vt(u));
        return (0, yt.isOut)(t) && !i && setTimeout(function() {
            var e = cn("_im_mess_" + t.messageId, n);
            _n(e, St) && ln(e, "im-mess_sending")
        }, 500), s = s.filter(function(e) {
            return e.rid !== t.randomId
        }), y(n), T(s, e, n)
    }

    function T(e, t, n) {
        var r = void 0;
        return r = "object" === ("undefined" == typeof e ? "undefined" : _t(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return (0, pt.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return E(t, e, n, !1)
        }), n
    }

    function k(e) {
        var t = cn("_im_mess_blind_unread_marker", e);
        t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
    }

    function I(e, t, n) {
        var r = e.tabs[t];
        return (0, It.toArray)(un("_im_mess_unread", n)).forEach(function(e) {
            var t = Zt(sn(e, "msgid"));
            t > 0 && r.out_up_to >= t && (mn(e, "_im_mess_unread"), mn(e, "im-mess_unread"), k(e))
        }), n
    }

    function O(e, t, n) {
        var r = cn("_im_msg_media" + t.messageId, e);
        return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function L(e, t) {
        if (!(0, pt.isFullyLoadedTab)(t, e.peerId)) return 0;
        var n = t.tabs[e.peerId];
        return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
    }

    function w(e) {
        return 0 == e ? !0 : !1
    }

    function A(e) {
        return e > 0 && 2e9 > e
    }

    function S(e) {
        return e > 2e9
    }

    function M(e) {
        return -2e9 > e
    }

    function C(e, t) {
        return e === t.peer
    }

    function R(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function P(e, t) {
        return R(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function x(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function D(e, t, n, r, a) {
        if ((0, yt.getUserId)(t) !== (0, yt.getUserId)(n)) return !0;
        var i = x(t.date, r),
            o = x(n.date, r);
        return Ln(i, o) ? (0, pt.isCommunityInterface)(r) && Zt(t.kludges.from_admin) !== Zt(n.kludges.from_admin) ? !0 : n.date - t.date > 300 ? !0 : ue(t) || ue(n) ? !0 : (0, yt.isGift)(t) || (0, yt.isGift)(n) ? !0 : (0, yt.isGraffiti)(t) || (0, yt.isGraffiti)(n) ? !0 : (0, yt.isUnread)(e, t) === (0, yt.isUnread)(e, n) || !a || (0, yt.isOut)(n) || fe(n.peerId, r.gid) ? !1 : !0 : !0
    }

    function N(e, t) {
        return En(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function j(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = Math.round(1e9 * Math.random()).toString(16),
            a = {},
            i = 0;
        return e = (0, Et.replaceHyperLinks)(e || "", Et.linksReplacer.bind(null, n)), e = e.replace(/(<a.+?<\/a>)/gi, function(e) {
            var t = "!link_" + i + "_" + r + "!";
            return a[t] = e, i++, t
        }), e = (0, Et.replaceMentions)(e), e = (0, Et.replaceEmailLinks)(e), Object.keys(a).forEach(function(t) {
            e = e.replace(t, function() {
                return a[t]
            })
        }), t.emoji && (e = jn.emojiToHTML(e, !0)), e
    }

    function F(e) {
        return S(e) ? "c" + (e - 2e9) : M(e) ? "e" + Math.abs(e + 2e9) : e
    }

    function H(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "e":
                return -2e9 - Zt(e.substr(1));
            case "c":
                return 2e9 + Zt(e.substr(1));
            default:
                return Zt(e)
        }
    }

    function U(e) {
        return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
    }

    function G(e) {
        return {
            search: {
                name: bn("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: bn("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: bn("mail_allow_comm_messages")
            },
            clear: {
                name: bn(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: bn("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: bn("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: bn("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: bn(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: bn("mail_update_photo_red")
            },
            block: {
                icon: "block",
                name: bn("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: bn("mail_im_create_chat_with")
            },
            invite_link: {
                icon: "invite-link",
                name: bn("mail_chat_invite_link")
            },
            leave: {
                icon: "leave",
                name: bn("mail_leave_chat")
            },
            topic: {
                icon: "topic",
                name: bn("mail_change_topic")
            },
            "return": {
                icon: "return",
                name: bn("mail_return_to_chat")
            },
            pin_hide: {
                icon: "pin_hide",
                name: bn("mail_menu_pin_hide")
            },
            pin_unhide: {
                icon: "pin_unhide",
                name: bn("mail_menu_pin_show")
            },
            unpin: {
                icon: "unpin",
                name: bn("mail_menu_unpin")
            }
        }
    }

    function B(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (n = vn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
    }

    function q(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (n = vn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
    }

    function z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, n) {
                    return B(e, t[n])
                }).join("");
            case 3:
                return B(e[0], t[0]) + e.slice(1).map(function(e, n) {
                    return q(e, t[n + 1])
                }).join("");
            case 4:
                return e.map(function(e, n) {
                    return q(e, t[n])
                }).join("")
        }
    }

    function W(e, t, n) {
        if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
        if (S(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
        if (Array.isArray(t.photo)) return z(t.photo);
        var r = t.data.active.slice(0, 4).map(Ot.oCacheGet.bind(null, e)),
            a = r.map(function(e) {
                return e.photo
            }),
            i = n ? [] : r.map(function(e) {
                return e.link
            });
        return z(a, i)
    }

    function K(e) {
        var t = bn(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + qt + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
    }

    function V() {
        return '<li class="im-search-results-head">' + bn("mail_search_messages") + "</li>"
    }

    function Q() {
        return '<li class="im-search-results-head">' + bn("mail_search_conversations_sep") + "</li>"
    }

    function Y() {
        return '<li class="im-search-results-head">' + bn("mail_search_dialogs_sep") + "</li>"
    }

    function $() {
        return '<li class="im-search-results-head _im_recent_bar">\n    ' + bn("mail_recent_searches") + '\n    <button type="button" class="' + Bt + ' im-page--clear-recent">' + bn("mail_clear_recent") + "</button>\n  </li>"
    }

    function X(e) {
        var t = e.get().popular_sugg,
            n = (0, pt.isClassicInterface)(e) ? 8 : 5;
        return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
            var n = t.peerId,
                r = (0, Ot.oCacheGet)(e, n) || t,
                a = e.get().tabs[n] || t,
                i = (e.get().mutedPeers || []).indexOf(n) >= 0,
                o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, a.unread > 0 && "sugg-is_unread", i && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ");
            return '<div class="' + o + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Dn(a.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + U(a.unread) + "</span>\n</div>"
        }).join("") + "</li>"
    }

    function Z(e, t, n) {
        var r = cn("_im_mess_" + t.messageId, n);
        if (r) {
            pn(r, "aria-hidden", "false"), ln(r, "im-mess_failed " + Mt);
            var a = cn("_im_mess_marker", r);
            pn(a, "aria-label", bn("mail_send_message_error")), pn(a, "role", "link")
        }
        return n
    }

    function J(e, t, n) {
        var r = cn("_im_mess_" + t, n);
        if (r) {
            mn(r, "im-mess_failed"), pn(r, "aria-hidden", "true"), mn(r, Mt);
            var a = cn("_im_mess_marker", r);
            pn(a, "aria-label", ""), pn(a, "role", "")
        }
        return n
    }

    function ee(e, t) {
        var n = e.map(function(e) {
            return cn("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return te(n, t)
    }

    function te(e, t) {
        var n = e.filter(function(e) {
            return !_n(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), n.filter(function(e) {
            return 0 === an(e).length
        }).map(function(e) {
            return dn("_im_mess_stack", e)
        }).forEach(function(e) {
            _n(nn(e), "_im_bar_date") && Qt(nn(e)), _n(nn(e), "_im_unread_bar_row") && Qt(nn(e)), Qt(e)
        }), t
    }

    function ne(e, t, n, r) {
        return e.map(function(e) {
            return cn("_im_mess_" + e, r)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            hn(e, oe(t, e, n)), ln(e, "im-mess_light")
        }), r
    }

    function re(e, t, n) {
        var r = cn("_im_mess_" + e, n);
        if (r) {
            var a = cn(Ct, r);
            hn(r, a.innerHTML), mn(r, "im-mess_light")
        }
        return n
    }

    function ae(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
            i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
        if (i) return ie(e, t, n, r, !0, a);
        var o = ((0, pt.isClassicInterface)(r), 60),
            s = ie(e, t, n, r, !1, a);
        return s.length > o ? ie(e, t, n, r, !0, a) : s
    }

    function ie(e, t, n, r, i, o) {
        var s = [],
            u = Object.keys(e || {}).sort(function(t, n) {
                return e[n] - e[t]
            }).filter(function(e) {
                var t = (0, Ot.oCacheExists)(r, e);
                return t || s.push(e), t
            });
        if (s.length && (0, At.loadChatMember)(a({}, t, s), r), 0 === u.length) return "";
        var c = A(t) || (0, pt.isCommunityPeer)(t) ? "first_name" : i ? "short_name" : "name";
        if (1 == u.length) {
            var d = n ? "" : (0, Ot.oCacheGet)(r, u[0])[c];
            return d + " " + bn("mail_typing")
        }
        var l = bn("mail_typing_several", u.length),
            m = u.slice(0, Math.min(u.length - 1, o)),
            f = m.map(function(e) {
                return (0, Ot.oCacheGet)(r, e)[c]
            }).join(", ");
        if (u.length > o + 1) f += " " + bn("mail_and_peer").replace("{count}", u.length - o).replace("{typing}", l);
        else {
            var _ = (0, Ot.oCacheGet)(r, u[m.length])[c];
            f += " " + bn("mail_and_peer_one") + " " + _ + " " + l
        }
        return f
    }

    function oe(e, t, n) {
        var r = t.innerHTML,
            a = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + bn(a) + ' <button type="button" data-peer="' + e + '" class="' + Rt + ' im-mess--btn">' + bn("mail_restore") + '</button>\n    <div class="' + Ct + ' im-mess--original">' + r + "</div>\n  </div>"
    }

    function se() {
        return '<div class="im-page--chat-search-empty">\n    ' + bn("mail_im_search_empty") + "\n  </div>"
    }

    function ue(e) {
        return e.kludges && "undefined" != typeof e.kludges.source_act
    }

    function ce(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
    }

    function de(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = t.kludges,
            i = a.source_act,
            o = Zt(a.source_mid),
            s = t.userId,
            u = (0, Ot.oCacheGet)(e, s),
            c = "",
            d = s === o;
        switch (i) {
            case Pt:
                c = "mail_im_chat_created";
                break;
            case xt:
                c = "mail_im_title_updated_dot";
                break;
            case Dt:
                c = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case Nt:
                c = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case jt:
                c = "mail_im_photo_set";
                break;
            case Ft:
                c = "mail_im_photo_removed";
                break;
            case Ht:
                c = a.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                break;
            case Ut:
                c = a.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                break;
            case Gt:
                c = "mail_im_invite_by_link";
                break;
            default:
                return "mail_no_support"
        }
        if (c = yn(u.sex, bn(c, "raw")), c = c.replace("{from}", ce(u.link, u.name, r)), o && o !== s) {
            var l = a.source_email;
            if (l) c = c.replace("{user}", ce("/im?email=" + encodeURIComponent(l), "email", r));
            else {
                var m = (0, Ot.oCacheGet)(e, o),
                    f = i === Nt ? m.inv_name : m.kick_name;
                c = c.replace("{user}", ce(m.link, f, r))
            }
        }
        if (a.source_text) {
            var _ = a.source_old_text ? '«<b class="im_srv_lnk">' + a.source_old_text + "</b>» &rarr; " : "";
            c = c.replace("{title}", _ + ('«<b class="im_srv_lnk">' + a.source_text + "</b>»"))
        }
        if (a.source_act === Ht || a.source_act === Ut)
            if (a.source_message) {
                var p = me(jn.emojiToHTML(en(a.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                    g = ce("", p, !1, "im_srv_mess_link");
                c = c.replace("{msg}", g)
            } else c = c.replace(/{link}(.+){\/link}/i, function(e, t) {
                return ce("", t, !1, "im_srv_mess_link")
            });
        return c
    }

    function le(e, t, n, r) {
        if (t === jt) {
            var a = cn("_im_mess_" + e.messageId, r);
            if (a) {
                var i = n.tabs[e.peerId];
                a.parentNode.innerHTML = vn("im_msg_row", {
                    msg_id: e.messageId,
                    from_id: e.peerId,
                    text: de(n, e, i) + n.chat_photo_msg,
                    ts: e.date,
                    cls: "im-mess_srv"
                })
            }
        }
        return r
    }

    function me(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(bt.MENTION_RAW, "$1$4")
    }

    function fe(e, t) {
        return t ? !1 : e === Wt.id
    }

    function _e(e, t) {
        return Rn(e, {
            url: (0, pt.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
            params: {
                act: "verified_tt",
                mid: t,
                gid: t
            },
            slide: 15,
            ajxdt: 200,
            showdt: 200,
            hidedt: 200,
            dir: "auto",
            shift: [94, 7, 7],
            className: "verified_tt"
        })
    }

    function pe(e) {
        return function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                a = Vt(vn("im_preloader", {
                    preloader: Yt(Wt.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                })),
                i = !1;
            setTimeout(function() {
                i || ("bottom" === n ? e.appendChild(a) : e.insertBefore(a, tn(e)), ln(a, "im-preloader_visible"))
            }, 0), t.then(function() {
                i = !0, mn(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
            })
        }
    }

    function ge(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, ht.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function he(e, t) {
        if (!t && !e) return !1;
        var n = e.target || e.srcElement,
            r = qn,
            a = !1,
            i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
        do
            if (!n || n.onclick || n.onmousedown || "A" == n.tagName || _n(n, "_im_no_select") || _n(n, "im_msg_media_link") || "IMG" == n.tagName && !_n(n, "_im_graffiti") && !_n(n, "emoji") && !_n(n, "emoji_css") && !_n(n, "im_gift") || "TEXTAREA" == n.tagName || _n(n, "play_new") || _n(n, "videoplayer") || (a = i.test(n.className))) break; while (r-- && (n = n.parentNode));
        return a ? !!Jt(ve()) : !0
    }

    function ve() {
        var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
        return (e || "").toString()
    }

    function be(e, t) {
        return '<div class="im-mess--text">\n      <span>' + bn("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + F(e) + "&msgid=" + t + '">' + bn("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function ye(e, t) {
        var n = bn(S(e) ? "mail_chat_sure_to_delete_all" : (0, pt.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
        return Mn(bn("mail_deleteall1"), n, bn("mail_delete"), t, bn("global_cancel"))
    }

    function Ee(e) {
        return Mn(bn("mail_unpin_title"), bn("mail_unpin_text"), bn("mail_unpin"), e, bn("global_cancel"))
    }

    function Te(e, t, n) {
        var r = Tn(t, bn("mail_dialog_msg_delete_N", "raw"));
        1 == t && (r = r.replace("1 ", ""));
        var a = Mn(bn("mail_dialog_msg_delete_title"), r, bn("mail_delete"), function() {
                return n(isChecked(cn("_check_forall")))
            }, bn("global_cancel")),
            i = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + bn("mail_delete_for_all") + "</div>",
            o = cur.imDb.selectByKey("del_forall_checked");
        return a.setControlsText(i), o && checkbox(cn("_check_forall")), a
    }

    function ke(e, t, n, r, a) {
        t.showProgress(), e.set(r.bind(null, a)).then(function() {
            t.hideProgress(), t.hide(), n().removePeer(e, a), n().updateDialogFilters(e)
        })
    }

    function Ie(e, t, n, r, a) {
        var i = e.get().peer;
        Un(r), Sn("al_im.php", {
            act: "a_show_members_box",
            chat: i - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(r, a) {
                var i = (0, kt.createModule)({
                    handlers: function(a, o) {
                        o(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            r.hide(), Oe(e, e.get().peer, t, n), (0, kt.destroyModule)(i)
                        }), o(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                            var n = cn("_im_chat_members_w", r.bodyNode.parentNode),
                                a = 160,
                                i = dn("_im_member_item", t),
                                o = i.offsetTop - n.scrollTop + a,
                                s = o > 370;
                            Pn(t, {
                                was: Zt(sn(t, "was")),
                                mid: Zt(sn(t, "peer")),
                                vk_mobile: Zt(sn(t, "vk_mobile")),
                                forcetoup: s
                            })
                        })
                    }
                })
            }
        }, r)
    }

    function Oe(e, t, n, r) {
        var a = e.get().tabs[t],
            i = a.memberIds;
        e.set(r.bind(null, "add_member", i)).then(n().showCreation)
    }

    function Le(e, t, n) {
        if (e.get().active_tab === bt.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var r = e.get().active_tab === bt.FOLDER_ALL ? bt.FOLDER_UNREAD : bt.FOLDER_ALL;
        return e.set(n.bind(null, r)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function we(e, t, n, r) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var a = (0, pt.isReversedDialogs)(t);
        return t.set(r.bind(null, e)).then(function(e) {
            return n().restoreDialogs(e, !0, a !== (0, pt.isReversedDialogs)(e)), e
        })
    }

    function Ae(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var n = e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_IMPORTANT] & n.folders
    }

    function Se(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        if ("undefined" == typeof t && (t = e.get().peer), !(0, pt.isFoldersAvailable)(e)) return !1;
        var r = n || e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_UNRESPOND] & r.folders
    }

    function Me(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function Ce(e) {
        return null != e.get().pendingForward
    }

    function Re(e, t) {
        return (t.get().block_states[e] || {}).who === Wt.id
    }

    function Pe(e, t) {
        var n = e.get().block_states;
        Object.keys(n).forEach(function(r) {
            n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([ht.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
        })
    }

    function xe(e, t, n) {
        var r = void 0;
        return !Cn("al_im.php", {
            act: "a_spam",
            offset: "0",
            gid: e.get().gid
        }, {
            onDone: function(n, a) {
                a && (r = t(n, e, a))
            },
            params: {
                width: 638,
                onHide: function() {
                    Nn.loaded && Nn.detachPlayer(!0), r.unmount()
                }
            }
        }, n)
    }

    function De(e, t) {
        var n = (0, pt.getTab)(e, t).last_seen;
        if (n[0]) return 2 === n[2] ? '<span class="is_vk_mobile is_online">' + bn("mail_header_online_status") + Ne(t, !1, !0) + "</span>" : "online" + (xn[n[0]] ? Ne(t) : "");
        if (!n[1]) return "";
        var r = kn(n[1], e.get().timeshift),
            a = yn((0, Ot.oCacheGet)(e, t).sex, bn("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", r);
        return 2 === n[2] ? a += Ne(t, !1, !0) : n[2] && (a += Ne(t, !1)), a
    }

    function Ne(e, t, n) {
        var r = n ? "" : 'onclick="mobilePromo();"',
            a = n ? ", vk_mobile: 1" : "",
            i = n ? " vk_mobile" : "";
        return vn("im_wrap_mobile", {
            "class": "im_status_mob_onl" + i,
            params: "mid: " + e + ", was: 1," + (t ? "forcetoup: true" : "forcetodown: true") + a,
            attrs: r
        })
    }

    function je(e, t) {
        var n = t.get().tabs[e];
        return Sn("al_settings.php", {
            act: "blacklist_box",
            q: n.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function Fe(e, t) {
        return Sn("groupsedit.php", {
            act: "bl_edit",
            name: "/id" + e,
            gid: t.get().gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    }

    function He(e) {
        return e.get().gid ? "/gim" + e.get().gid : "/im"
    }

    function Ue(e, t, n, r) {
        var a = void 0,
            i = Cn("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, i) {
                    i && (a = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Nn.loaded && Nn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        a && a.unmount()
                    }
                }
            }, r);
        nt(i, e)
    }

    function Ge() {
        var e = document.activeElement;
        return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
    }

    function Be(e, t, n) {
        var r = cn("_im_mess_" + e, n);
        return r && fn(r, "im-mess_fav", t), n
    }

    function qe(e, t, n) {
        var r = cn("_im_unread_bar_row", t);
        if (!r) return t;
        var a = on(r, "._im_mess_stack", -1),
            i = on(r, "._im_mess_stack"),
            o = a ? un("_im_mess", a).pop() : null,
            s = i ? cn("_im_mess", i) : null;
        if (Qt(r), g(t), !s || !o) return t;
        var u = sn(o, "msgid"),
            c = sn(s, "msgid"),
            d = (0, pt.getMessage)(e, n, u),
            l = (0, pt.getMessage)(e, n, c);
        if (D(e.tabs[n], d, l, e)) return t;
        var m = cn("_im_stack_messages", a),
            f = cn("_im_stack_messages", i).children;
        return (0, It.toArray)(f).forEach(function(e) {
            Qt(e), m.appendChild(e)
        }), Qt(i), t
    }

    function ze(e, t, n) {
        var r = (0, pt.getFirstUnread)(e, e.get().peer);
        if (!r) return [!1, 0];
        var a = cn("_im_mess_" + r, t);
        if (!a) {
            var i = (0, pt.getLastMessage)(e, e.get().peer, r);
            if (!i) return [!0, 0];
            a = cn("_im_mess_" + i.messageId, t)
        }
        var o = _n(a, "_im_mess_srv") ? a : dn("_im_mess_stack", a);
        if (!o) return [!0, 0];
        var s = a ? a.offsetTop : 0,
            u = o.offsetTop + s,
            c = n.contHeight();
        return u <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, c - u)]
    }

    function We(e, t, n) {
        Un(t);
        var r = dn("_im_top_notice", n);
        Hn(r, 200, Qt.pbind(r));
        var a = dn("_im_page_dialogs", r);
        a && _n(a, "im-page--dialogs-notice") && mn(a, "im-page--dialogs-notice"), An.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Ke(e, t, n) {
        Un(t);
        var r = dn("_im_aside_notice", n);
        Fn(r, 200, Qt.pbind(r)), An.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Ve(e, t, n, r, a) {
        return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = (0, Et.replaceMentions)(n, function(e, t, n, r, a) {
            return a
        }), r && (n = jn.emojiToHTML(n, !0)), t && "..." !== t.trim() && !S(e) && (n = vn("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + n), !n && a.length > 0 && (n = vn("im_dialog_media", {
            name: Xe(a[0], a)
        })), n
    }

    function Qe(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = e.split("_"),
            r = ft(n, 2),
            a = r[0],
            i = r[1];
        return [a, i, t]
    }

    function Ye(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if (r > 50) return [
            [], e.length
        ];
        for (var a = [], i = ""; n < e.length;) {
            var o = e[n];
            if ("id" === o) i = t[n];
            else if ("," === o && i) a.push(Qe(i)), i = "";
            else if ("(" === o) {
                var s = Ye(e, t, n + 1, r + 1),
                    u = ft(s, 2),
                    c = u[0],
                    d = u[1];
                n = d, a.push(Qe(i, c)), i = ""
            } else if (")" === o) return "" !== i && a.push(Qe(i)), [a, n];
            n++
        }
        return i && a.push(Qe(i)), [a, n]
    }

    function $e(e) {
        if (Wn[e]) return Wn[e];
        for (var t = e ? e.length : 0, n = [], r = [], a = "", i = 0; t > i; i++) {
            var o = e[i],
                s = o.charCodeAt(0);
            s >= 48 && 57 >= s || "_" === o || "-" === o ? a += o : ("(" === o || ")" === o || ":" === o || "," === o) && ("" !== a && (r.push(a), n.push("id"), a = ""), r.push(o), n.push(o))
        }
        a.length > 0 && (r.push(a), n.push("id"));
        var u = Ye(n, r),
            c = ft(u, 1),
            d = c[0];
        return Object.keys(Wn).length > 300 && (Wn = {}), Wn[e] = d, d
    }

    function Xe(e, t) {
        var n = {
            photo: bn("mail_added_photos", "raw"),
            video: bn("mail_added_videos", "raw"),
            audio: bn("mail_added_audios", "raw")
        };
        switch (e.type) {
            case "mail":
                return Tn(e.object.fwd_count, bn("mail_fwd_msgs", "raw"), !0);
            case "photo":
            case "video":
            case "audio":
                var r = t.filter(function(t) {
                    return t.type === e.type
                }).length;
                return Tn(r, n[e.type], !0);
            case "audio_playlist":
                return bn("mail_added_audio_playlist");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return bn("mail_added_graffiti");
                    case "audiomsg":
                        return bn("mail_added_audiomsg");
                    default:
                        return bn("mail_added_docs")
                }
            case "geo":
            case "map":
                return bn("mail_added_geo");
            case "wall":
                return bn("mail_added_wall");
            case "wall_reply":
                return bn("mail_added_wall_reply");
            case "gift":
                return bn("mail_added_gift");
            case "link":
            case "share":
                return bn("mail_added_link");
            case "sticker":
                return bn("mail_added_sticker");
            case "chronicle":
                return bn("mail_added_chronicle");
            case "chronicle_invite":
                return bn("mail_invite_chronice");
            case "market":
                return bn("mail_added_market_item");
            case "money_transfer":
                return bn("mail_added_money_transfer");
            case "money_request":
                return bn("mail_added_money_request");
            case "story":
                return bn("mail_added_story");
            case "mask":
                return bn("mail_added_mask")
        }
        return ""
    }

    function Ze(e) {
        ln(e, "im-send-btn_loading")
    }

    function Je(e) {
        mn(e, "im-send-btn_loading")
    }

    function et(e) {
        var t = e.get(),
            n = (0, pt.getPinnedMessage)(e);
        if (!n || !(0, Lt.isPinnedMessageVisibleInTab)(e, (0, pt.getPeer)(e))) return "";
        var r = (0, Ot.oCacheGet)(e, n.userId);
        if (!r) return "";
        var a = n.text;
        a = !a && n.attaches.length ? vn("im_pinned_message_media", {
            text: Xe(n.attaches[0], n.attaches)
        }) : j(a, n && n.kludges || {}) || "", a = a.replace(/<br\s?\/?>/gi, " ");
        var i = vn("im_pinned_message", {
            date: In(n.date, t.timeshift),
            content: a,
            link: r.link,
            name: r.name
        });
        return i
    }

    function tt(e, t, n) {
        var r = +n.getAttribute("data-time");
        r && Rn(n, {
            text: In(r, e.get().timeshift),
            className: "_im_history_tooltip",
            appendParentCls: "_im_mess_stack",
            black: 1,
            shift: [0, 4]
        })
    }

    function nt(e, t) {
        e.bodyNode.addEventListener("mouseover", function(e) {
            _n(e.target, "_im_edit_time") && tt(t, e, e.target)
        })
    }

    function rt(e, t, n, r, a) {
        var i = e.get(),
            o = void 0,
            s = Cn("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                hash: i.tabs[n].hash
            }, {
                onDone: function(n, a) {
                    a && (o = r(n, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Nn.loaded && Nn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, a);
        nt(s, e)
    }

    function at(e, t) {
        return S(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
    }

    function it(e) {
        return !S(e.peerId) || e.data.kicked ? 0 : e.membersCount
    }

    function ot(e, t) {
        var n = (0, Ot.oCacheGet)(e, t.peerId),
            r = (0, pt.getTab)(e, t.peerId) || {};
        return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, S(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
    }

    function st(e, t) {
        for (var n in t) t.hasOwnProperty(n) && ot(e, t[n])
    }

    function ut(e, t) {
        var n = [],
            r = t.find(function(e) {
                return "mail" === e[0]
            }),
            a = r ? r[1].split(";") : [];
        for (a.length > Bn && (r[1] = a.slice(0, Bn).join(";")); e.length > Gn;) {
            var i = e.substr(0, Gn).lastIndexOf(" "); - 1 == i && (i = Gn), n.push({
                msgText: Jt(e.substr(0, i))
            }), e = Jt(e.substr(i))
        }
        for (e.length && n.push({
                msgText: e,
                attaches: t
            }), n.length || n.push({
                attaches: t
            }), a = a.slice(Bn); a.length; a = a.slice(Bn)) n.push({
            attaches: [
                ["mail", a.slice(0, Bn).join(";")]
            ]
        });
        return n
    }

    function ct(e) {
        return e.length > Gn
    }

    function dt(e, t, n) {
        var r = !1;
        Sn("al_im.php", {
            act: "a_chat_preview",
            chat_id: t.invite_chat_id,
            hash: t.invite_hash
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1,
                hideButtons: !0,
                onHide: function() {
                    e.set(n), r && r.unmount()
                }
            },
            onFail: function(e) {
                return setTimeout(function() {
                    return Mn(bn("global_error"), e)
                }, 0), !0
            },
            onDone: function(t, n) {
                r = (0, Tt.mount)(t.bodyNode, e)
            }
        }, {})
    }

    function lt() {
        Mn(bn("global_error"), bn("mail_message_wait_until_uploaded"))
    }

    function mt(e, t) {
        var n = (0, pt.getTab)(e, t.peerId) || {};
        if (!t || !(0, yt.isOut)(t)) return !1;
        if (333 == t.peerId) return !1;
        if (Date.now() / 1e3 - t.date > 86400) return !1;
        if (d(e, t.peerId, t.messageId)) return !1;
        if (S(t.peerId)) {
            if (n.data.kicked || n.data.closed) return !1
        } else if (n.block_error > 0) return !1;
        return !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MESSAGE_SEARCH_CLASS = t.CLEAR_RECENT_CLASS = t.HIDE_ASIDE_NOTICE_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_INVITE_BY_LINK = t.CHAT_UNPIN_MESSAGE = t.CHAT_PIN_MESSAGE = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
    var ft = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (u) {
                    a = !0, i = u
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        _t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        pt = n(117);
    Object.keys(pt).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return pt[e]
            }
        })
    }), t.getClassicChatHeight = i, t.setClassicChatHeight = o, t.fixTableCellChildHeight = s, t.applyInnerHtml = u, t.renderSticker = c, t.isAlreadyDeleted = d, t.replaceMessageAttrs = l, t.isVoiceMessageAvailable = m, t.getAvailableMicrophones = f, t.renderAttach = _, t.dayFromVal = p, t.showInvisibleBar = g, t.editAndReplaceMessage = h, t.renderMessage = v, t.renderMessageMedia = b, t.ensureDomHasActions = y, t.appendToHistory = E, t.restoreQueue = T, t.markMessagesAsRead = I, t.replaceAttaches = O, t.isDuplicate = L, t.isReservedPeer = w, t.isUserPeer = A, t.isChatPeer = S, t.isPeerActive = C, t.isTabLoaded = R, t.isTabLoadedWithMessage = P, t.parseMessage = j, t.convertPeerToUrl = F, t.unUrlPeer = H, t.simplifyCounter = U, t.chatActions = G, t.renderPhotos = z, t.renderPhotosFromTab = W, t.renderBtnSearchOnlyMessages = K, t.renderMessagesSep = V, t.renderConversationsSep = Q, t.renderPopularSuggSep = Y, t.renderClearRecent = $, t.renderPopularSuggestions = X, t.setMessageError = Z, t.startResendMessage = J, t.removeMessages = ee, t.removeMessagesWithRestore = ne, t.restoreMessage = re, t.formatTyper = ae, t.formatTyperHelper = ie, t.renderEmptySearch = se, t.isServiceMsg = ue, t.serviceLink = ce, t.renderServiceMsg = de, t.addChatPhotoToUpdate = le, t.replaceSpecialSymbols = me, t.isSelfMessage = fe, t.showVerifiedTooltip = _e, t.wrapLoading = pe, t.tabFromIds = ge, t.checkSelectClick = he, t.renderGoTo = be, t.showFlushDialog = ye, t.showUnpinDialog = Ee, t.showMsgDeleteDialog = Te, t.cleanHistory = ke, t.showChatMembers = Ie, t.inviteUser = Oe, t.showUnreadOnly = Le, t.changeTab = we, t.isImportant = Ae, t.isUnrespond = Se, t.isPeerBlocked = Me, t.isPendingForward = Ce, t.isPeerBlockedByMe = Re, t.blockLatencyCompensation = Pe, t.showSpamLayer = xe, t.getLastSeenTextInHeader = De, t.getMobileIcon = Ne, t.showBlacklistBoxUser = je, t.showBlacklistBox = Fe, t.getBaseLink = He, t.showFavvedBox = Ue, t.isEditableFocused = Ge, t.updateStar = Be, t.removewNewUnreadBarAndMerge = qe, t.isMessagesVisible = ze, t.hideTopNotice = We, t.hideAsideNotice = Ke, t.renderShortText = Ve, t.parseFwd = $e, t.attachToText = Xe, t.lockButton = Ze, t.unlockButton = Je, t.renderPinnedMessage = et, t.showEditTimeTooltip = tt, t.boxHandleEditTimeTooltips = nt, t.showPinnedBox = rt, t.isUserAliveInChat = at, t.getAliveMembersCount = it, t.normalizeTab = ot, t.normalizeTabsGotFromServer = st, t.splitMessageToParts = ut, t.isMessageTooLong = ct, t.showInvitationBox = dt, t.showWaitUntilUploadedBox = lt, t.canMessageBeDeletedForAll = mt;
    var gt = n(87),
        ht = r(gt),
        vt = n(122),
        bt = r(vt),
        yt = n(140),
        Et = n(1),
        Tt = n(66),
        kt = n(63),
        It = n(56),
        Ot = n(33),
        Lt = n(9),
        wt = n(131),
        At = n(24),
        St = t.SENDING_CLASS = "_im_mess_sending",
        Mt = t.FAILED_CLASS = "_im_mess_failed",
        Ct = t.ORIGINAL_CLASS = "_im_mess_original",
        Rt = t.RESTORE_CLASS = "_im_mess_restore",
        Pt = (t.TYPING_CLASS = "_im_typing", t.CREATE_CHAT_ACTION = "chat_create"),
        xt = t.CHAT_TITLE_ACTION = "chat_title_update",
        Dt = t.CHAT_INVITE_USER = "chat_invite_user",
        Nt = t.CHAT_KICK_USER = "chat_kick_user",
        jt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
        Ft = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
        Ht = t.CHAT_PIN_MESSAGE = "chat_pin_message",
        Ut = t.CHAT_UNPIN_MESSAGE = "chat_unpin_message",
        Gt = t.CHAT_INVITE_BY_LINK = "chat_invite_user_by_link",
        Bt = (t.DESELECT_ALL_CLASS = "_im_deselect_all", t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.HIDE_ASIDE_NOTICE_CLASS = "_im_aside_notice_hide", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
        qt = t.MESSAGE_SEARCH_CLASS = "_im_mess_search",
        zt = window,
        Wt = zt.vk,
        Kt = zt.ls,
        Vt = zt.se,
        Qt = zt.re,
        Yt = zt.rs,
        $t = zt.sech,
        Xt = zt.inArray,
        Zt = zt.intval,
        Jt = zt.trim,
        en = zt.stripHTML,
        tn = zt.domFC,
        nn = zt.domPS,
        rn = zt.domLC,
        an = zt.domChildren,
        on = zt.domClosestSibling,
        sn = zt.domData,
        un = zt.geByClass,
        cn = zt.geByClass1,
        dn = zt.gpeByClass,
        ln = zt.addClass,
        mn = zt.removeClass,
        fn = zt.toggleClass,
        _n = zt.hasClass,
        pn = zt.attr,
        gn = zt.setStyle,
        hn = zt.val,
        vn = zt.getTemplate,
        bn = zt.getLang,
        yn = zt.langSex,
        En = zt.langDate,
        Tn = zt.langNumeric,
        kn = zt.getDateText,
        In = zt.getSmDate,
        On = zt.getShortDate,
        Ln = zt.isSameDate,
        wn = zt.isToday,
        An = zt.ajax,
        Sn = zt.showBox,
        Mn = zt.showFastBox,
        Cn = zt.showTabbedBox,
        Rn = zt.showTooltip,
        Pn = zt.mobileOnlineTip,
        xn = zt.mobPlatforms,
        Dn = zt.onlinePlatformClass,
        Nn = zt.AudioMessagePlayer,
        jn = zt.Emoji,
        Fn = zt.slideUp,
        Hn = zt.fadeOut,
        Un = zt.cancelEvent,
        Gn = 4096,
        Bn = 100,
        qn = 8,
        zn = "chatPosition",
        Wn = {}
}, , , function(e, t, n) {
    var r = n(91)("keys"),
        a = n(18);
    e.exports = function(e) {
        return r[e] || (r[e] = a(e))
    }
}, function(e, t, n) {
    var r = n(2),
        a = n(25),
        i = n(43)(!1),
        o = n(146)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = a(e),
            u = 0,
            c = [];
        for (n in s) n != o && r(s, n) && c.push(n);
        for (; t.length > u;) r(s, n = t[u++]) && (~i(c, n) || c.push(n));
        return c
    }
}]);