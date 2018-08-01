! function(e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 485)
}({
    245: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "ImDraft", function() {
            return i
        }), r.d(t, "loadDraftForPeer", function() {
            return c
        });
        var n = r(277),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            n = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(n = (a = c.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !n && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function i(e, t) {
            this._db = e, this._key = t, this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.load()
        }

        function a(e) {
            switch (e.type) {
                case "mail":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function c(e, t) {
            return new i(e, "draft_" + t)
        }
        i.prototype.dump = function() {
            var e;
            this._key && this._db.updateByKey(this._key, {
                txt: (e = this.dData).txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                cancelled: e.cancelled.length ? e.cancelled : void 0
            })
        }, i.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = function(e) {
                    return {
                        txt: e.txt,
                        attaches: e.attaches || [],
                        urlBinds: e.urlBinds || [],
                        cancelled: e.cancelled || []
                    }
                }(e))
            }
        }, i.prototype.clear = function() {
            this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.dump()
        }, i.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, i.prototype.addAttach = function(e, t, r) {
            if ("share" !== e && "mail" !== e || this.removeAttachByType(e), !e || !t && "poll" !== e) return !1;
            var n = this.dData.attaches.findIndex(function(r) {
                return r.type === e && r.id === t
            }); - 1 === n ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: r
            }), this.dump()) : "video" !== e && "poll" !== e || (this.dData.attaches[n] = {
                type: e,
                id: t,
                object: r
            }, this.dump())
        }, i.prototype.syncWithSelector = function(e) {
            var t = this,
                r = this.getFwdRaw();
            this.dData.attaches = (r ? [r] : []).concat(e.getMedias().map(function(e) {
                var r = o(e, 2),
                    n = r[0],
                    i = r[1];
                return t.dData.attaches.find(function(e) {
                    return e.type == n && e.id == i
                }) || {
                    type: n,
                    id: i
                }
            })), this.dump()
        }, i.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, i.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dData.cancelled = [], this.dump()
        }, i.prototype.addBindUrl = function(e, t, r) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: r
            }), this.dump())
        }, i.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t && this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null
        }, i.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            if (e && e.object) return e.object.url
        }, i.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, i.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, i.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, i.prototype.prepareObjects = function(e, t) {
            var r = this;
            return this.dData.attaches.find(a) ? Object(n.post)(n.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = o(e, 1)[0];
                r.dData.attaches = t.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, i.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type
            })
        }, i.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    277: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "CONTROLLER", function() {
            return n
        }), r.d(t, "post", function() {
            return i
        }), r.d(t, "plainget", function() {
            return a
        }), r.d(t, "plaingetCancelable", function() {
            return c
        });
        var n = "al_im.php",
            o = 2;

        function i(e, t, r) {
            return t && (t.im_v = o), new Promise(function(n, o) {
                ajax.post(e, t, {
                    timeout: r,
                    onDone: function() {
                        n.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return o.apply(null, arguments), !0
                    }
                })
            })
        }

        function a(e, t) {
            return c(e, t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).request
        }

        function c(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                n = void 0;
            return n = window.XDomainRequest ? new XDomainRequest : ajax._getreq(), {
                request: new Promise(function(o, i) {
                    var a = void 0,
                        c = Date.now(),
                        u = r.timeout || 60,
                        d = ajx2q(t);
                    if (window.XDomainRequest) n.open("get", e + "?" + d), n.ontimeout = function(e) {
                        i([e, {}])
                    }, n.onerror = function(e) {
                        i([e, {}])
                    }, n.onload = function() {
                        o([n.responseText, {}])
                    }, setTimeout(function() {
                        n.send()
                    }, 0);
                    else {
                        n.onreadystatechange = function() {
                            4 == n.readyState && (clearInterval(a), n.status >= 200 && n.status < 300 ? o([n.responseText, n]) : i([n.responseText, n]))
                        };
                        try {
                            n.open("GET", e + "?" + d, !0)
                        } catch (e) {
                            return i([e, n])
                        }
                        n.send()
                    }
                    a = setInterval(function() {
                        Date.now() - c > 1e3 * u && (i(["", {}]), clearInterval(a))
                    }, 1e3)
                }),
                cancel: function() {
                    n.abort()
                }
            }
        }
    },
    373: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(459),
            o = r(245),
            i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
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
                        o = t.toData[7];
                    if (e.setOptions({
                            hideButtons: !0,
                            width: 502,
                            bodyStyle: "padding: 0px; border: 0px;",
                            title: t.title,
                            titleControls: ('<a class="mail_box_header_link" href="/im?sel=' + r + '" onclick="return WriteBox.toFull(event, ' + r + ')">' + t.mail_go_to_dialog + "</a>").replace("%s", o)
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
                            ldb: Object(n.mount)(vk.id)
                        }), t.emojiRcnt && !cur.mbRcntEmoji) {
                        for (var i = [], c = t.emojiRcnt, u = 0, d = c.length; u < d; ++u) {
                            var l = c[u];
                            l && i.push('<a id="mbe_rc_em_' + l + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + l + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(l, !1, !0) + "</a>")
                        }
                        cur.mbRcntEmoji = i.join("")
                    }
                    cur.nav.push(function() {
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
                                n = cur.mbMedia.getMedias(),
                                o = cur.toData[0];
                            ajax.post("/al_im.php", {
                                act: "a_send_box",
                                to_ids: o,
                                chas: cur.mbHash,
                                msg: "",
                                ts: cur.ts,
                                media: "sticker:" + e,
                                send_sticker: 1,
                                from: "box",
                                sticker_referrer: t
                            }, {
                                onDone: function(e, t) {
                                    r || n.length ? a.send(!1) : (t && ls.set("im_draft" + vk.id + "_" + t, !1), curBox().hide(), showDoneBox(e))
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
                    var s = cur.postTo;
                    cur.postTo = !1, e.setOptions({
                        onHide: function() {
                            removeEvent(document, "keydown", a.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                        },
                        onShow: function() {
                            addEvent(document, "keydown", a.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                        },
                        onClean: function() {
                            clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = s, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
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
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (t.onMediaAdd = function() {
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
                        var r = Object(o.loadDraftForPeer)(cur.ldb, t);
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (r.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), r.removeAllAttaches(), r.addAttach("market", cur.mbForceAttach[1])), a.editableHasVal(cur.mbField) || (cur.mbEditable ? (Emoji.val(cur.mbField, clean(r.dData.txt)), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, clean(r.dData.txt))), r.prepareObjects().then(function() {
                            if (cur.mbField && a.getPeer() == t)
                                for (var e = r.dData.attaches, n = 0; n < e.length; n++) cur.mbMedia.chooseMedia(e[n].type, e[n].id, e[n].object || {}, null, !0)
                        }), a.checkEditable(cur.emojiWId, cur.mbField), a.checkLen(cur.mbField)
                    }
                },
                saveDraft: function() {
                    var e = a.getPeer();
                    if (e && cur.mbField) {
                        var t = Object(o.loadDraftForPeer)(cur.ldb, e);
                        t.setText(unclean(trim(Emoji.val(cur.mbField)))), t.removeAllAttaches(), cur.mbMedia.getMedias().forEach(function(e) {
                            return t.addAttach(e[0], e[1])
                        }), t.destroy()
                    }
                },
                toFull: function(e, t) {
                    if (!checkEvent(e)) {
                        var r = {
                                0: "im",
                                sel: t
                            },
                            n = trim(Emoji.editableVal(cur.mbField));
                        if (n && (r.message = n), cur.mbMedia.chosenMedias) {
                            for (var o = cur.mbMedia.getMedias(), a = [], c = 0, u = o.length; c < u; ++c) {
                                var d = o[c],
                                    l = [];
                                for (var s in d) "object" != i(d[s]) && l.push(d[s]);
                                a.push(l.join(","))
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
                        var n = {
                            act: "a_send_box",
                            chas: cur.mbHash,
                            message: t,
                            title: isVisible("mail_box_title_wrap") && val("mail_box_title") || "",
                            from: "box",
                            entrypoint: "friends" === cur.module ? "friends" : "writebox",
                            media: [],
                            to_ids: []
                        };
                        cur.mbForceAttach && (n.attach1_type = cur.mbForceAttach[0], n.attach1 = cur.mbForceAttach[1], n.attach1_hash = cur.mbForceAttach[2]);
                        for (var i, c = 0, u = r.length; c < u; ++c)(i = r[c]) && n.media.push(i[0] + ":" + i[1]);
                        if (n.media = n.media.join(","), !t && !n.media) return cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField);
                        n.to_ids = cur.toData[0], cur.mbBannedHim != n.to_ids || !0 === e ? ajax.post("al_im.php", n, {
                            onDone: function(e, t) {
                                if (t) {
                                    var r = Object(o.loadDraftForPeer)(cur.ldb, t);
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
                    for (var t = e.length / 4, r = "", n = 0; t--;) r += String.fromCharCode(parseInt(e.substr(n, 4), 16)), n += 4;
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
                        for (var n in r)
                            if (r.hasOwnProperty(n)) {
                                var o = r[n];
                                t += '<a id="mbe_rc_em_' + o + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + o + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(o, !1, !0) + "</a>"
                            }
                        val(e, t)
                    }
                }
            };
        try {
            stManager.done("writebox.js")
        } catch (e) {}
    },
    459: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "RECENT_SEARCH_OP", function() {
            return o
        }), r.d(t, "PIN_HIDDEN_ID_OP", function() {
            return i
        }), r.d(t, "deleteOldStoredFormat", function() {
            return d
        }), r.d(t, "mount", function() {
            return l
        });
        var n = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var r = [],
                            n = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(n = (a = c.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !n && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return r
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = "recent_search",
            i = "pin_hide";

        function a(e) {
            return "im_store_" + e
        }

        function c(e) {
            return ls.get(a(e)) || {}
        }

        function u(e, t, r) {
            if (ls.checkVersion()) {
                var n = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", n.length), r(a(e), n)
            }
        }

        function d(e, t) {
            for (var r = ["fwd", "draft", "bind_attach"], n = c(e), o = !1, i = r.length; i--;) r[i] in n && (delete n[r[i]], o = !0);
            o && u(e, n, t)
        }

        function l(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && d(e, t);
            var r = {
                    db: c(e),
                    checkTime: Date.now()
                },
                l = function(e, t, r) {
                    r.key === a(e) && (t.db = JSON.parse(r.newValue), t.checkTime = Date.now())
                }.bind(null, e, r);
            return window.addEventListener("storage", l, !1), {
                select: function(t, n) {
                    return Date.now() - r.checkTime > 1e3 && (r.db = c(e)),
                        function(e, t, r) {
                            return t === o ? e[t] || [] : t === i ? e[t] && e[t][r] : e[t] ? extend(!0, {}, e[t][r]) : null
                        }(r.db, t, n)
                },
                selectByKey: function(t) {
                    return Date.now() - r.checkTime > 1e3 && (r.db = c(e)), r.db[t]
                },
                update: function(a, c) {
                    var d = function(e, t, r) {
                        switch (e[t] || (e[t] = {}), t) {
                            case o:
                                var a = r;
                                a && a.length > 0 ? e[t] = a : delete e[t];
                                break;
                            case i:
                                var c = n(r, 2),
                                    u = c[0],
                                    d = c[1];
                                d ? e[t][u] = +d : delete e[t][u]
                        }
                        return e
                    }(r.db, a, c);
                    return r.db = d, r.checkTime = Date.now(), u(e, d, t)
                },
                updateByKey: function(n, o) {
                    return r.db[n] = o, r.checkTime = Date.now(), u(e, r.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", l, !1)
                }
            }
        }
    },
    485: function(e, t, r) {
        e.exports = r(373)
    }
});