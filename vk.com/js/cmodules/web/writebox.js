! function(e) {
    function t(r) {
        if (a[r]) return a[r].exports;
        var n = a[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports
    }
    var a = {};
    return t.m = e, t.c = a, t.d = function(e, a, r) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(a, "a", a), a
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 79)
}({
    139: function(e, t, a) {
        "use strict";
        a.r(t);
        var r = a(207),
            n = a(166),
            i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = window.WriteBox = {
                mrg: function(e) {
                    return vk.rtl ? {
                        marginRight: e
                    } : {
                        marginLeft: e
                    }
                },
                show: function(e, t) {
                    var a = t.toData[0],
                        n = t.toData[7];
                    if (e.setOptions({
                            hideButtons: !0,
                            width: 502,
                            bodyStyle: "padding: 0px; border: 0px;",
                            title: t.title,
                            titleControls: ('<a class="mail_box_header_link" href="/im?sel=' + a + '" onclick="return WriteBox.toFull(event, ' + a + ')">' + t.mail_go_to_dialog + "</a>").replace("%s", n)
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
                            ldb: Object(r.mount)(vk.id)
                        }), t.emojiRcnt && !cur.mbRcntEmoji) {
                        for (var i = [], c = t.emojiRcnt, s = 0, u = c.length; u > s; ++s) {
                            var l = c[s];
                            l && i.push('<a id="mbe_rc_em_' + l + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + l + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(l, !1, !0) + "</a>")
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
                        ref: "writebox",
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
                            var a = trim(Emoji.editableVal(cur.mbField)),
                                r = cur.mbMedia.getMedias(),
                                n = cur.toData[0];
                            ajax.post("/al_im.php", {
                                act: "a_send_box",
                                to_ids: n,
                                chas: cur.mbHash,
                                msg: "",
                                ts: cur.ts,
                                media: "sticker:" + e,
                                send_sticker: 1,
                                from: "box",
                                sticker_referrer: t
                            }, {
                                onDone: function(e, t) {
                                    a || r.length ? o.send(!1) : (t && ls.set("im_draft" + vk.id + "_" + t, !1), curBox().hide(), showDoneBox(e))
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
                    var d = cur.postTo;
                    cur.postTo = !1, e.setOptions({
                        onHide: function() {
                            removeEvent(document, "keydown", o.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                        },
                        onShow: function() {
                            addEvent(document, "keydown", o.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                        },
                        onClean: function() {
                            clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = d, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
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
                        var a = Object(n.loadDraftForPeer)(cur.ldb, t);
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (a.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), a.removeAllAttaches(), a.addAttach("market", cur.mbForceAttach[1])), o.editableHasVal(cur.mbField) || (cur.mbEditable ? (Emoji.val(cur.mbField, clean(a.dData.txt)), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, clean(a.dData.txt))), a.prepareObjects().then(function() {
                            if (cur.mbField && o.getPeer() == t)
                                for (var e = a.dData.attaches, r = 0; r < e.length; r++) cur.mbMedia.chooseMedia(e[r].type, e[r].id, e[r].object || {}, null, !0)
                        }), o.checkEditable(cur.emojiWId, cur.mbField), o.checkLen(cur.mbField)
                    }
                },
                saveDraft: function() {
                    var e = o.getPeer();
                    if (e && cur.mbField) {
                        var t = Object(n.loadDraftForPeer)(cur.ldb, e);
                        t.setText(unclean(trim(Emoji.val(cur.mbField)))), t.removeAllAttaches(), cur.mbMedia.getMedias().forEach(function(e) {
                            return t.addAttach(e[0], e[1])
                        }), t.destroy()
                    }
                },
                toFull: function(e, t) {
                    if (!checkEvent(e)) {
                        var a = {
                                0: "im",
                                sel: t
                            },
                            r = trim(Emoji.editableVal(cur.mbField));
                        if (r && (a.message = r), cur.mbMedia.chosenMedias) {
                            for (var n = cur.mbMedia.getMedias(), o = [], c = 0, s = n.length; s > c; ++c) {
                                var u = n[c],
                                    l = [];
                                for (var d in u) "object" != i(u[d]) && l.push(u[d]);
                                o.push(l.join(","))
                            }
                            a.media = o.join("*")
                        }
                        return nav.go(a, null, {
                            noback: !0
                        }), !1
                    }
                },
                send: function(e) {
                    if (!buttonLocked("mail_box_send")) {
                        var t = trim(Emoji.editableVal(cur.mbField)),
                            a = cur.mbMedia.getMedias();
                        cur.mbEditable && o.extractEmoji();
                        var r = {
                            act: "a_send_box",
                            chas: cur.mbHash,
                            message: t,
                            title: isVisible("mail_box_title_wrap") && val("mail_box_title") || "",
                            from: "box",
                            entrypoint: "friends" === cur.module ? "friends" : "writebox",
                            media: [],
                            to_ids: []
                        };
                        cur.mbForceAttach && (r.attach1_type = cur.mbForceAttach[0], r.attach1 = cur.mbForceAttach[1], r.attach1_hash = cur.mbForceAttach[2]);
                        for (var i, c = 0, s = a.length; s > c; ++c)(i = a[c]) && r.media.push(i[0] + ":" + i[1]);
                        return r.media = r.media.join(","), t || r.media ? (r.to_ids = cur.toData[0], cur.mbBannedHim == r.to_ids && e !== !0 ? void(showBox("al_profile.php", {
                            act: "banned_him",
                            action: "mail",
                            mid: cur.mbBannedHim
                        }, {
                            dark: 1
                        }).onContinue = o.send.pbind(!0)) : void ajax.post("al_im.php", r, {
                            onDone: function(e, t) {
                                if (t) {
                                    var a = Object(n.loadDraftForPeer)(cur.ldb, t);
                                    a.clear(), a.destroy()
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
                    for (var t = e.length / 4, a = "", r = 0; t--;) a += String.fromCharCode(parseInt(e.substr(r, 4), 16)), r += 4;
                    return a
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
                                var a = cur.mbField;
                                !a.active && elfocus(a)
                            }
                        return !0
                    }
                },
                extractEmoji: function() {
                    var e = ge("mbe_rcemoji");
                    if (e) {
                        var t = "",
                            a = Emoji.getRecentEmojiSorted().slice(0, 7);
                        for (var r in a)
                            if (a.hasOwnProperty(r)) {
                                var n = a[r];
                                t += '<a id="mbe_rc_em_' + n + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + n + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(n, !1, !0) + "</a>"
                            }
                        val(e, t)
                    }
                }
            };
        try {
            stManager.done("writebox.js")
        } catch (c) {}
    },
    162: function(e, t, a) {
        "use strict";

        function r(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                a = e.split("_"),
                r = g(a, 2),
                n = r[0],
                i = r[1];
            return [n, i, t]
        }

        function n(e, t) {
            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            if (i > 50) return [
                [], e.length
            ];
            for (var o = [], c = ""; a < e.length;) {
                var s = e[a];
                if ("id" === s) c = t[a];
                else if ("," === s && c) o.push(r(c)), c = "";
                else if ("(" === s) {
                    var u = n(e, t, a + 1, i + 1),
                        l = g(u, 2),
                        d = l[0],
                        m = l[1];
                    a = m, o.push(r(c, d)), c = ""
                } else if (")" === s) return "" !== c && o.push(r(c)), [o, a];
                a++
            }
            return c && o.push(r(c)), [o, a]
        }

        function i(e) {
            if (x[e]) return x[e];
            for (var t = e ? e.length : 0, a = [], r = [], i = "", o = 0; t > o; o++) {
                var c = e[o],
                    s = c.charCodeAt(0);
                s >= 48 && 57 >= s || "_" === c || "-" === c ? i += c : ("(" === c || ")" === c || ":" === c || "," === c) && ("" !== i && (r.push(i), a.push("id"), i = ""), r.push(c), a.push(c))
            }
            i.length > 0 && (r.push(i), a.push("id"));
            var u = n(a, r),
                l = g(u, 1),
                d = l[0];
            return Object.keys(x).length > 300 && (x = {}), x[e] = d, d
        }

        function o(e, t) {
            for (var a = void 0, r = 0, n = e; null !== (a = p.MESSAGE_REGEXP.exec(e));) {
                a = u(a);
                var i = a[0].length,
                    o = a.index + i,
                    c = e[a.index - 1],
                    s = e[o - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    m = void 0 !== s && /([:;$])/i.test(s);
                if (!d && !m) {
                    var b = l(a),
                        h = b.domain;
                    if (h.length <= p.MAX_DOMAIN_LENGTH && -1 !== p.TOP_DOMAINS.indexOf(h)) {
                        var f = t(b);
                        n = n.slice(0, a.index + r) + f + n.slice(o + r), r += f.length - i
                    }
                }
            }
            return n
        }

        function c(e, t) {
            return e.replace(p.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function s(e, t) {
            return e.replace(p.MENTION, t || function(e, t, a, r, n) {
                return '<a href="/' + (t + a) + '" class="mem_link" mention="' + k(r || "") + '" mention_id="' + k(t + a) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + n + "</a>"
            })
        }

        function u(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                a = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][a] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, a)), e
        }

        function l(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function d() {
            return v || (v = new RegExp(p.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), v
        }

        function m(e, t) {
            return e.replace(d(), function(e, a, r, n, i, o) {
                return (a || "") + t(r + (i || ""))
            })
        }

        function b(e) {
            _("ttl_message_confirm_delivery", e)
        }

        function h(e, t) {
            var a = t.protocol,
                r = t.url,
                n = t.query,
                i = t.domain,
                o = t.full;
            try {
                o = decodeURIComponent(o)
            } catch (c) {}
            if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = k(o).replace(/&amp;/g, "&"), !e && i.match(p.OUR_DOMAINS)) {
                r = w(r).replace(p.ENTITIES, encodeURIComponent);
                var s = r,
                    u = r.indexOf("#/"),
                    l = "",
                    d = void 0;
                return u >= 0 ? s = r.substr(u + 1) : (u = r.indexOf("#!"), u >= 0 && (s = "/" + r.substr(u + 2).replace(/^\//, ""))), d = s.match(p.VK_DOMAIN), d && d[1].length < 32 && (l = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + f(a + r + n) + '" target="_blank"' + l + ">" + o + "</a>"
            }
            var m = "away.php?utf=1&to=" + encodeURIComponent(a + w(r + n)),
                b = k((a + r + n).replace(/'/g, "\\'")),
                h = "return goAway('" + b + "', {}, event);";
            return '<a href="' + m + '" target="_blank" onclick="' + h + '">' + o + "</a>"
        }

        function f(e) {
            return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        a.r(t), a.d(t, "parseFwd", function() {
            return i
        }), a.d(t, "replaceHyperLinks", function() {
            return o
        }), a.d(t, "replaceEmailLinks", function() {
            return c
        }), a.d(t, "replaceMentions", function() {
            return s
        }), a.d(t, "replaceHashtags", function() {
            return m
        }), a.d(t, "confirmDelivery", function() {
            return b
        }), a.d(t, "linksReplacer", function() {
            return h
        });
        var p = a(51),
            g = function() {
                function e(e, t) {
                    var a = [],
                        r = !0,
                        n = !1,
                        i = void 0;
                    try {
                        for (var o, c = e[Symbol.iterator](); !(r = (o = c.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                    } catch (s) {
                        n = !0, i = s
                    } finally {
                        try {
                            !r && c["return"] && c["return"]()
                        } finally {
                            if (n) throw i
                        }
                    }
                    return a
                }
                return function(t, a) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, a);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            v = void 0,
            y = window,
            k = y.clean,
            w = y.replaceEntities,
            _ = y.statlogsValueEvent,
            x = {}
    },
    166: function(e, t, a) {
        "use strict";

        function r() {
            return {
                txt: "",
                attaches: [],
                urlBinds: []
            }
        }

        function n(e, t) {
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

        function c(e) {
            return {
                txt: e.txt,
                attaches: e.attaches || [],
                urlBinds: e.urlBinds || []
            }
        }

        function s(e, t) {
            var a = [];
            e.fwd_count ? a.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: e.fwd_count
                }
            }) : e.fwd && a.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: Object(d.parseFwd)(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? a.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: intval(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: intval(e["attach" + r + "_call_duration"]),
                receiverId: intval(e["attach" + r + "_call_receiver_id"])
            }) : a.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                kind: e["attach" + r + "_kind"],
                productId: e["attach" + r + "_product_id"]
            });
            return e.geo && a.push({
                type: "geo",
                id: e.geo
            }), a
        }

        function u(e, t) {
            return new n(e, "draft_" + t)
        }
        a.r(t), a.d(t, "ImDraft", function() {
            return n
        }), a.d(t, "convertKludgesToAttaches", function() {
            return s
        }), a.d(t, "loadDraftForPeer", function() {
            return u
        });
        var l = a(81),
            d = a(162),
            m = function() {
                function e(e, t) {
                    var a = [],
                        r = !0,
                        n = !1,
                        i = void 0;
                    try {
                        for (var o, c = e[Symbol.iterator](); !(r = (o = c.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                    } catch (s) {
                        n = !0, i = s
                    } finally {
                        try {
                            !r && c["return"] && c["return"]()
                        } finally {
                            if (n) throw i
                        }
                    }
                    return a
                }
                return function(t, a) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, a);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        n.prototype.dump = function() {
            this._key && this._db.updateByKey(this._key, o(this.dData))
        }, n.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = c(e))
            }
        }, n.prototype.clear = function() {
            this.dData = r(), this.dump()
        }, n.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, n.prototype.addAttach = function(e, t, a) {
            if (("share" === e || "mail" === e) && this.removeAttachByType(e), !e || !t) return !1;
            var r = this.dData.attaches.findIndex(function(a) {
                return a.type === e && a.id === t
            }); - 1 === r ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: a
            }), this.dump()) : "video" === e && (this.dData.attaches[r] = {
                type: e,
                id: t,
                object: a
            }, this.dump())
        }, n.prototype.syncWithSelector = function(e) {
            var t = this,
                a = this.getFwdRaw();
            this.dData.attaches = (a ? [a] : []).concat(e.getMedias().map(function(e) {
                var a = m(e, 2),
                    r = a[0],
                    n = a[1],
                    i = t.dData.attaches.find(function(e) {
                        return e.type == r && e.id == n
                    });
                return i || {
                    type: r,
                    id: n
                }
            })), this.dump()
        }, n.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, n.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dump()
        }, n.prototype.addBindUrl = function(e, t, a) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: a
            }), this.dump())
        }, n.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t ? this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null : null
        }, n.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            return e && e.object ? e.object.url : void 0
        }, n.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, n.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, n.prototype.prepareObjects = function(e, t) {
            var a = this,
                r = this.dData.attaches.find(i);
            return r ? Object(l.post)(l.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = m(e, 1),
                    r = t[0];
                a.dData.attaches = r.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, n.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type
            })
        }, n.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    207: function(e, t, a) {
        "use strict";

        function r(e) {
            return "im_store_" + e
        }

        function n(e) {
            return ls.get(r(e)) || {}
        }

        function i(e, t, a) {
            if (ls.checkVersion()) {
                var n = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", n.length), a(r(e), n)
            }
        }

        function o(e, t, a) {
            return t === m ? e[t] || [] : t === b ? e[t] && e[t][a] : e[t] ? extend(!0, {}, e[t][a]) : null
        }

        function c(e, t, a) {
            switch (e[t] || (e[t] = {}), t) {
                case m:
                    var r = a;
                    r && r.length > 0 ? e[t] = r : delete e[t];
                    break;
                case b:
                    var n = d(a, 2),
                        i = n[0],
                        o = n[1];
                    o ? e[t][i] = +o : delete e[t][i]
            }
            return e
        }

        function s(e, t) {
            for (var a = ["fwd", "draft", "bind_attach"], r = n(e), o = !1, c = a.length; c--;) a[c] in r && (delete r[a[c]], o = !0);
            o && i(e, r, t)
        }

        function u(e, t, a) {
            a.key === r(e) && (t.db = JSON.parse(a.newValue), t.checkTime = Date.now())
        }

        function l(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && s(e, t);
            var a = {
                    db: n(e),
                    checkTime: Date.now()
                },
                r = u.bind(null, e, a);
            return window.addEventListener("storage", r, !1), {
                select: function(t, r) {
                    return Date.now() - a.checkTime > 1e3 && (a.db = n(e)), o(a.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - a.checkTime > 1e3 && (a.db = n(e)), a.db[t]
                },
                update: function(r, n) {
                    var o = c(a.db, r, n);
                    return a.db = o, a.checkTime = Date.now(), i(e, o, t)
                },
                updateByKey: function(r, n) {
                    return a.db[r] = n, a.checkTime = Date.now(), i(e, a.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", r, !1)
                }
            }
        }
        a.r(t), a.d(t, "RECENT_SEARCH_OP", function() {
            return m
        }), a.d(t, "PIN_HIDDEN_ID_OP", function() {
            return b
        }), a.d(t, "deleteOldStoredFormat", function() {
            return s
        }), a.d(t, "mount", function() {
            return l
        });
        var d = function() {
                function e(e, t) {
                    var a = [],
                        r = !0,
                        n = !1,
                        i = void 0;
                    try {
                        for (var o, c = e[Symbol.iterator](); !(r = (o = c.next()).done) && (a.push(o.value), !t || a.length !== t); r = !0);
                    } catch (s) {
                        n = !0, i = s
                    } finally {
                        try {
                            !r && c["return"] && c["return"]()
                        } finally {
                            if (n) throw i
                        }
                    }
                    return a
                }
                return function(t, a) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return e(t, a);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            m = "recent_search",
            b = "pin_hide"
    },
    51: function(e, t, a) {
        "use strict";

        function r(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a, e
        }
        a.r(t), a.d(t, "OUR_DOMAINS", function() {
            return x
        }), a.d(t, "ENTITIES", function() {
            return j
        }), a.d(t, "VK_DOMAIN", function() {
            return E
        }), a.d(t, "MENTION", function() {
            return D
        }), a.d(t, "MENTION_RAW", function() {
            return T
        }), a.d(t, "ARROW_UP", function() {
            return A
        }), a.d(t, "ARROW_DOWN", function() {
            return O
        }), a.d(t, "PAGE_UP", function() {
            return z
        }), a.d(t, "PAGE_DOWN", function() {
            return M
        }), a.d(t, "END_KEY", function() {
            return R
        }), a.d(t, "HOME", function() {
            return q
        }), a.d(t, "ENTER", function() {
            return I
        }), a.d(t, "ESC", function() {
            return F
        }), a.d(t, "UNPRINTABLE_KEYS", function() {
            return S
        }), a.d(t, "UP_DOWN_CONTROLS", function() {
            return N
        }), a.d(t, "PRINTABLE", function() {
            return B
        }), a.d(t, "FOLDER_UNREAD", function() {
            return C
        }), a.d(t, "FOLDER_ALL", function() {
            return P
        }), a.d(t, "FOLDER_UNRESPOND", function() {
            return L
        }), a.d(t, "FOLDER_IMPORTANT", function() {
            return H
        }), a.d(t, "FOLDERS", function() {
            return W
        }), a.d(t, "FOLDER_MASKS", function() {
            return K
        }), a.d(t, "TOP_DOMAINS", function() {
            return U
        }), a.d(t, "MAX_DOMAIN_LENGTH", function() {
            return V
        }), a.d(t, "EMAIL", function() {
            return G
        }), a.d(t, "MESSAGE_REGEXP", function() {
            return X
        }), a.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
            return ae
        });
        var n, i = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
            o = "(https?:\\/\\/)?",
            c = "((?:[" + i + "\\—\\-\\_]+\\.){1,5})",
            s = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
            u = "(?:\\:(\\d{2,5}))",
            l = "(" + c + s + u + "?)",
            d = "([\\/?#])",
            m = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
            b = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
            h = "　-〿＀-￯",
            f = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
            p = "[" + m + f + b + h + "]",
            g = "(?:\\(|\\[)[" + i + "\\d&#%;,]+(?:\\)|\\])",
            v = "(" + d + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + p + "+|" + g + "){0,200})?",
            y = o + l + v,
            k = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
            w = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
            _ = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
            x = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            j = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            E = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            D = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            T = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            A = 38,
            O = 40,
            z = 33,
            M = 34,
            R = 35,
            q = 36,
            I = 13,
            F = 27,
            S = [A, O, z, M, I, F, R, q],
            N = [z, M, O, A, q, R],
            B = "printable",
            C = "unread",
            P = "all",
            L = "unrespond",
            H = "important",
            W = [P, C, L, H],
            K = (n = {}, r(n, L, 2), r(n, H, 1), n),
            U = [].concat(k.split(","), w.split(","), _.split(",").map(function(e) {
                return "xn--" + e
            })),
            V = U.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            G = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + c + s + "))", "ig"),
            X = new RegExp(y, "ig"),
            $ = "#",
            Z = "a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’",
            J = "(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)",
            Y = "(?:[" + Z + "]|" + J + ")",
            Q = "(?:[" + Z + "_\\d]|" + J + ")",
            ee = "(" + $ + Q + "{0,100}" + Y + Q + "{0,100})",
            te = "((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?)",
            ae = "(^|[s.,:'\";>)(]?)(" + ee + ")(@" + te + ")?(?=$|[s.,:'\"&;?<)(]?)"
    },
    79: function(e, t, a) {
        e.exports = a(139)
    },
    81: function(e, t, a) {
        "use strict";

        function r(e, t, a) {
            return t && (t.im_v = c), new Promise(function(r, n) {
                ajax.post(e, t, {
                    timeout: a,
                    onDone: function() {
                        r.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return n.apply(null, arguments), !0
                    }
                })
            })
        }

        function n(e, t) {
            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = i(e, t, a),
                n = r.request;
            return n
        }

        function i(e, t) {
            function a() {
                n.abort()
            }
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                n = void 0;
            n = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
            var i = new Promise(function(a, i) {
                var o = void 0,
                    c = Date.now(),
                    s = r.timeout || 60,
                    u = ajx2q(t);
                if (window.XDomainRequest) n.open("get", e + "?" + u), n.ontimeout = function() {
                    i(["", {}])
                }, n.onerror = function() {
                    i(["", {}])
                }, n.onload = function() {
                    a([n.responseText, {}])
                }, setTimeout(function() {
                    n.send()
                }, 0);
                else {
                    n.onreadystatechange = function() {
                        4 == n.readyState && (clearInterval(o), n.status >= 200 && n.status < 300 ? a([n.responseText, n]) : i([n.responseText, n]))
                    };
                    try {
                        n.open("GET", e + "?" + u, !0)
                    } catch (l) {
                        return i([l, n])
                    }
                    n.send()
                }
                o = setInterval(function() {
                    Date.now() - c > 1e3 * s && (i(["", {}]), clearInterval(o))
                }, 1e3)
            });
            return {
                request: i,
                cancel: a
            }
        }
        a.r(t), a.d(t, "CONTROLLER", function() {
            return o
        }), a.d(t, "post", function() {
            return r
        }), a.d(t, "plainget", function() {
            return n
        }), a.d(t, "plaingetCancelable", function() {
            return i
        });
        var o = "al_im.php",
            c = 2
    }
});