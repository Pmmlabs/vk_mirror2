! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
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
            for (var i in e) n.d(r, i, function(t) {
                return e[t]
            }.bind(null, i));
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
    }, n.p = "", n(n.s = 176)
}({
    0: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "post", function() {
            return a
        }), n.d(t, "plainget", function() {
            return o
        }), n.d(t, "plaingetCancelable", function() {
            return s
        });
        var r = window.ajax,
            i = 2;

        function a(e, t, n) {
            return t && (t.im_v = i), new Promise(function(i, a) {
                r.post(e, t, {
                    timeout: n,
                    onDone: function() {
                        i.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return a.apply(null, arguments), !0
                    }
                })
            })
        }

        function o(e, t) {
            return s(e, t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).request
        }

        function s(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                i = void 0;
            return i = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise(function(r, a) {
                    var o = void 0,
                        s = Date.now(),
                        c = n.timeout || 60,
                        u = ajx2q(t);
                    if (window.XDomainRequest) i.open("get", e + "?" + u), i.ontimeout = function(e) {
                        a([e, {}])
                    }, i.onerror = function(e) {
                        a([e, {}])
                    }, i.onload = function() {
                        r([i.responseText, {}])
                    }, setTimeout(function() {
                        i.send()
                    }, 0);
                    else {
                        i.onreadystatechange = function() {
                            4 == i.readyState && (clearInterval(o), i.status >= 200 && i.status < 300 ? r([i.responseText, i]) : a([i.responseText, i]))
                        };
                        try {
                            i.open("GET", e + "?" + u, !0)
                        } catch (e) {
                            return a([e, i])
                        }
                        i.send()
                    }
                    o = setInterval(function() {
                        Date.now() - s > 1e3 * c && (a(["", {}]), clearInterval(o))
                    }, 1e3)
                }),
                cancel: function() {
                    i.abort()
                }
            }
        }
    },
    10: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isUnread", function() {
            return a
        }), n.d(t, "isServiceMsg", function() {
            return o
        }), n.d(t, "isCallMessage", function() {
            return s
        }), n.d(t, "isOut", function() {
            return c
        }), n.d(t, "hasReply", function() {
            return u
        }), n.d(t, "isGraffiti", function() {
            return l
        }), n.d(t, "isAudioMsg", function() {
            return f
        }), n.d(t, "isSticker", function() {
            return _
        }), n.d(t, "isGift", function() {
            return h
        }), n.d(t, "isMoney", function() {
            return p
        }), n.d(t, "isMoneyRequest", function() {
            return m
        }), n.d(t, "isVKPay", function() {
            return g
        }), n.d(t, "isImportant", function() {
            return v
        }), n.d(t, "getUserId", function() {
            return b
        }), n.d(t, "getAuthorId", function() {
            return y
        }), n.d(t, "wasEdited", function() {
            return w
        }), n.d(t, "isMessageSelected", function() {
            return C
        });
        var r = n(136),
            i = n(214);

        function a(e, t) {
            return "number" != typeof t.messageId || (c(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function o(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function s(e) {
            return "call" == e.kludges.attach1_type
        }

        function c(e) {
            return e.flags & r.FLAG_OUTBOUND
        }

        function u(e) {
            var t = e.attaches.filter(function(e) {
                return "mail" === e.type
            }).length > 0;
            return e.attaches.filter(function(e) {
                return "reply" === e.type
            }).length > 0 || e.flags & r.FLAG_HAS_REPLY && t
        }

        function d(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function l(e) {
            return d(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function f(e) {
            return Boolean(e.attaches.find(function(e) {
                return "doc" === e.type && "audiomsg" === e.kind
            }))
        }

        function _(e) {
            return Boolean(e.attaches.find(function(e) {
                return "sticker" === e.type
            }))
        }

        function h(e) {
            return d(e, "gift")
        }

        function p(e) {
            return d(e, "money_transfer", "money_request")
        }

        function m(e) {
            return d(e, "money_request")
        }

        function g(e) {
            return d(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function v(e) {
            return e.flags & r.FLAG_IMPORTANT
        }

        function b(e) {
            return c(e) ? vk.id : e.userId
        }

        function y(e, t) {
            var n = Object(i.unpackStore)(e);
            return c(t) ? n.id : t.userId
        }

        function w(e) {
            return e.update_time > 0
        }

        function C(e, t) {
            return (e.get().selectedMessages || []).indexOf(t) >= 0
        }
    },
    106: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "KEY", function() {
            return a
        }), n.d(t, "addEvent", function() {
            return o
        }), n.d(t, "removeEvent", function() {
            return s
        }), n.d(t, "triggerEvent", function() {
            return c
        }), n.d(t, "cancelEvent", function() {
            return u
        }), n.d(t, "stopEvent", function() {
            return d
        }), n.d(t, "normEvent", function() {
            return l
        }), n.d(t, "checkEvent", function() {
            return f
        }), n.d(t, "checkKeyboardEvent", function() {
            return _
        }), n.d(t, "checkOver", function() {
            return h
        });
        var r = n(213),
            i = n(6),
            a = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DEL: 8,
                TAB: 9,
                RETURN: 13,
                ENTER: 13,
                ESC: 27,
                PAGEUP: 33,
                PAGEDOWN: 34,
                SPACE: 32,
                CTRL: 17,
                ALT: 18,
                SHIFT: 16
            };

        function o(e, t, n, a, o, s) {
            if ((e = Object(r.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
                var c, d = o ? ((c = function(e) {
                    var t = e.data;
                    e.data = o;
                    var r = n.apply(this, [e]);
                    return e.data = t, r
                }).handler = n, c) : n;
                e.setInterval && e !== window && (e = window);
                var f = Object(r.data)(e, "events") || Object(r.data)(e, "events", {}),
                    _ = Object(r.data)(e, "handle") || Object(r.data)(e, "handle", function(e) {
                        return function() {
                            (function(e) {
                                e = l(e);
                                var t = Array.from(arguments);
                                t[0] = e;
                                var n = Object(r.data)(this, "events");
                                if (!n || "string" != typeof e.type || !n[e.type] || !n[e.type].length) return;
                                var i = (n[e.type] || []).slice();
                                for (var a in i)
                                    if (i.hasOwnProperty(a)) {
                                        if ("mouseover" === e.type || "mouseout" === e.type) {
                                            for (var o = e.relatedElement; o && o !== this;) o = o.parentNode;
                                            if (o === this) continue
                                        }
                                        var s = i[a].apply(this, t);
                                        if (!1 !== s && -1 !== s || u(e), -1 === s) return !1
                                    }
                            }).apply(e, arguments)
                        }
                    }(e));
                Object(i.each)(t.split(/\s+/), function(t, n) {
                    f[n] || (f[n] = [], !a && e.addEventListener ? e.addEventListener(n, _, s) : !a && e.attachEvent && e.attachEvent("on" + n, _)), f[n].push(d)
                })
            }
        }

        function s(e, t, n, a) {
            if (void 0 === a && (a = !1), e = Object(r.ge)(e)) {
                var o = Object(r.data)(e, "events");
                if (o)
                    if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, s) {
                        if (Object(i.isArray)(o[s])) {
                            var c = o[s].length;
                            if (Object(i.isFunction)(n)) {
                                for (var u = c - 1; u >= 0; u--)
                                    if (o[s][u] && (o[s][u] === n || o[s][u].handler === n)) {
                                        o[s].splice(u, 1), c--;
                                        break
                                    }
                            } else {
                                for (var d = 0; d < c; d++) delete o[s][d];
                                c = 0
                            }
                            c || (e.removeEventListener ? e.removeEventListener(s, Object(r.data)(e, "handle"), a) : e.detachEvent && e.detachEvent("on" + s, Object(r.data)(e, "handle")), delete o[s])
                        }
                    }), Object(i.isEmpty)(o) && (Object(r.removeData)(e, "events"), Object(r.removeData)(e, "handle"));
                    else
                        for (var c in o) o.hasOwnProperty(c) && s(e, c)
            }
        }

        function c(e, t, n, a) {
            e = Object(r.ge)(e);
            var o = Object(r.data)(e, "handle");
            if (o) {
                var s = function() {
                    return o.call(e, Object(i.extend)(n || {}, {
                        type: t,
                        target: e
                    }))
                };
                a ? s() : setTimeout(s, 0)
            }
        }

        function u(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
        }

        function d(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
        }

        function l(e) {
            var t = e = e || window.event;
            if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
                var n = document.documentElement,
                    r = bodyNode;
                e.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n.clientTop || 0)
            }
            return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
        }

        function f(e) {
            var t = e || window.event;
            return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
        }

        function _(e) {
            if (!(e = l(e)) || !e.target) return !1;
            if (!e.screenX) return !0;
            var t = Object(r.getSize)(e.target),
                n = Object(r.getXY)(e.target),
                i = e.pageX - n[0],
                a = e.pageY - n[1];
            return i < -1 || i > t[0] + 1 || a < -1 || a > t[1] + 1 || Math.abs(e.pageX - n[0] - t[0] / 2) < 1 && Math.abs(e.pageY - n[1] - t[1] / 2) < 1
        }

        function h(e, t) {
            if (!e) return !0;
            e = e.originalEvent || e, t = t || e.target;
            var n = e.fromElement || e.relatedTarget;
            if (!n || n === t || n === t.parentNode) return !0;
            for (; n !== t && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
            return n !== t
        }
        window.KEY = a, window.addEvent = o, window.removeEvent = s, window.triggerEvent = c, window.cancelEvent = u, window.stopEvent = d, window.normEvent = l, window.checkEvent = f, window.checkKeyboardEvent = _, window.checkOver = h
    },
    113: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createLongpollConnect", function() {
            return _
        });
        var r = n(164),
            i = n(0),
            a = n(136),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = 202,
            c = 5,
            u = 4;

        function d(e, t) {
            e.waitAbortFns.push(t)
        }

        function l(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(i.plaingetCancelable)(e.url, {
                    act: "a_check",
                    key: e.key,
                    version: e.version,
                    ts: e.ts,
                    wait: 25,
                    mode: e.mode
                }),
                n = t.request,
                a = t.cancel;
            return e.stopFn = a, n.then(function(t) {
                var n = o(t, 2),
                    r = n[0],
                    i = n[1];
                return e.onData(e, i), e.waitTimeout = 2, JSON.parse(r)
            }).catch(function(t) {
                var n = o(t, 2),
                    r = (n[0], n[1]);
                throw e.onData(e, r), ""
            }).then(function(t) {
                return function(e, t) {
                    var n = t.failed ? Object(r.abortablePause)(u, null) : {},
                        i = n.abort,
                        a = n.pause;
                    switch (t.failed) {
                        case 1:
                            return d(e, i), e.onHistoryLost(e, t).then(function() {
                                return e.onResult({
                                    ts: t.ts,
                                    updates: [
                                        [-1]
                                    ]
                                })
                            }).then(a).then(function() {
                                return l(e)
                            });
                        case 2:
                            return d(e, i), e.onKeyExpired(e, t).then(function(t) {
                                var n = o(t, 4),
                                    r = n[0],
                                    i = n[1],
                                    a = n[2],
                                    s = n[3];
                                return e.onResult({
                                    ts: +s,
                                    updates: [
                                        [-2, r, i + "/" + a],
                                        [-1]
                                    ]
                                })
                            }).then(a).then(function() {
                                return l(e)
                            });
                        case 3:
                            return e.onLpBroken(e, t);
                        default:
                            return t
                    }
                }(e, t)
            })
        }

        function f(e) {
            e.isStoppedFn() || l(e).then(e.onResult).catch(function(t) {
                return function(e, t) {
                    if (e.isStoppedFn()) return;
                    e.onRequestError(t), e.waitTimeout = Math.min(64, 2 * e.waitTimeout);
                    var n = Object(r.abortablePause)(e.waitTimeout, null),
                        i = n.abort,
                        a = n.pause;
                    return d(e, i), a()
                }(e, t)
            }).then(function() {
                return f(e)
            })
        }

        function _(e, t) {
            var n = !!e.stopped,
                r = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: c,
                    mode: s,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: function() {
                        return n
                    },
                    onResult: function(e) {
                        e.ts && o(r.ts, e.ts, e.updates.map(function(e) {
                            switch (e[0]) {
                                case 0:
                                    return a.deleteEvent(e);
                                case 1:
                                    return a.replaceFlagsEvent(e);
                                case 2:
                                    return a.setFlagsEvent(e);
                                case 3:
                                    return a.resetFlagsEvent(e);
                                case 4:
                                    return a.addMessageEvent(e);
                                case 5:
                                    return a.editMessageEvent(e);
                                case 6:
                                    return a.readInboundEvent(e);
                                case 7:
                                    return a.readOutboundEvent(e);
                                case 8:
                                    return a.gotOnlineEvent(e);
                                case 9:
                                    return a.gotOfflineEvent(e);
                                case 10:
                                    return a.resetDirectoriesEvent(e);
                                case 11:
                                    return a.replaceDirectoriesEvent(e);
                                case 12:
                                    return a.setDirectoriesEvent(e);
                                case 13:
                                    return a.deleteDialogEvent(e);
                                case 18:
                                    return a.replaceMessageEvent(e);
                                case 51:
                                    return a.chatChangedEvent(e);
                                case 52:
                                    return a.chatUpdatedEvent(e);
                                case 63:
                                    return a.typingEvent(e);
                                case 64:
                                    return a.recordingAudioEvent(e);
                                case 70:
                                    return a.videoCallEvent(e);
                                case 80:
                                    return a.unreadCountEvent(e);
                                case 114:
                                    return a.notifySettingsChangedEvent(e);
                                case 116:
                                    return a.refreshMessageEvent(e);
                                case 117:
                                    return a.audioStartEvent(e);
                                case -1:
                                    return a.resyncEvent();
                                case -2:
                                    return a.refreshLpKeyEvent(e);
                                default:
                                    return a.emptyEvent(e)
                            }
                        }))
                    },
                    onData: h(t.onData),
                    onRequestError: h(t.onRequestError),
                    onHistoryLost: p(t.onHistoryLost),
                    onKeyExpired: p(t.onKeyExpired),
                    onLpBroken: p(t.onHistoryLost)
                },
                i = t.onEvents;

            function o(e, t, n) {
                r.ts = t;
                for (var o = 0; o < n.length; ++o) n[o].type === a.REFRESH_LP_KEY && (r.key = n[o].key, r.url = n[o].url);
                i(e, t, n)
            }
            var u = {
                options: r,
                isStopped: function() {
                    return n
                },
                stopConnection: function() {
                    n = !0, r.stopFn && r.stopFn(), r.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection: function() {
                    this.stopConnection(), n = !1, f(r)
                },
                abortWaiting: function() {
                    r.waitAbortFns.forEach(function(e) {
                        return e()
                    }), r.waitAbortFns = [], r.waitTimeout = 2
                },
                onLp: o
            };
            return f(r), u
        }

        function h(e) {
            return e || function() {}
        }

        function p(e) {
            return e ? function() {
                return Promise.resolve(e.apply(void 0, arguments))
            } : function() {
                return Promise.reject()
            }
        }
    },
    115: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "RECENT_SEARCH_OP", function() {
            return i
        }), n.d(t, "PIN_HIDDEN_ID_OP", function() {
            return a
        }), n.d(t, "deleteOldStoredFormat", function() {
            return u
        }), n.d(t, "mount", function() {
            return d
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = "recent_search",
            a = "pin_hide";

        function o(e) {
            return "im_store_" + e
        }

        function s(e) {
            return ls.get(o(e)) || {}
        }

        function c(e, t, n) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), n(o(e), r)
            }
        }

        function u(e, t) {
            for (var n = ["fwd", "draft", "bind_attach"], r = s(e), i = !1, a = n.length; a--;) n[a] in r && (delete r[n[a]], i = !0);
            i && c(e, r, t)
        }

        function d(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && u(e, t);
            var n = {
                    db: s(e),
                    checkTime: Date.now()
                },
                d = function(e, t, n) {
                    n.key === o(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", d, !1), {
                select: function(t, r) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = s(e)),
                        function(e, t, n) {
                            return t === i ? e[t] || [] : t === a ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                        }(n.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = s(e)), n.db[t]
                },
                update: function(o, s) {
                    var u = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case i:
                                var o = n;
                                o && o.length > 0 ? e[t] = o : delete e[t];
                                break;
                            case a:
                                var s = r(n, 2),
                                    c = s[0],
                                    u = s[1];
                                u ? e[t][c] = +u : delete e[t][c]
                        }
                        return e
                    }(n.db, o, s);
                    return n.db = u, n.checkTime = Date.now(), c(e, u, t)
                },
                updateByKey: function(r, i) {
                    return n.db[r] = i, n.checkTime = Date.now(), c(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", d, !1)
                }
            }
        }
    },
    120: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE", function() {
            return c
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN", function() {
            return u
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE", function() {
            return d
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS", function() {
            return l
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK", function() {
            return f
        }), n.d(t, "MAIL_CHATS_ACTION_SEE_INVITE_LINK", function() {
            return _
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_INVITE_LINK", function() {
            return h
        }), n.d(t, "MAIL_CHATS_ACTION_INVITE_USER", function() {
            return p
        }), n.d(t, "MAIL_CHATS_ACTION_PIN_OR_UNPIN", function() {
            return m
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_TITLE", function() {
            return g
        }), n.d(t, "MAIL_CHATS_ACTION_ADD_ADMIN", function() {
            return v
        }), n.d(t, "canSeeInviteLink", function() {
            return w
        }), n.d(t, "canChangeInviteLink", function() {
            return C
        }), n.d(t, "canAddAdmin", function() {
            return k
        }), n.d(t, "canInviteUser", function() {
            return T
        }), n.d(t, "canKickUser", function() {
            return E
        }), n.d(t, "canPinOrUnpin", function() {
            return O
        }), n.d(t, "canChangeTitle", function() {
            return N
        }), n.d(t, "canChangeAvatar", function() {
            return S
        }), n.d(t, "canSeeAllMessages", function() {
            return j
        }), n.d(t, "checkChatRights", function() {
            return I
        }), n.d(t, "doesChatTabHaveFlag", function() {
            return x
        }), n.d(t, "isUserAdminInChat", function() {
            return F
        }), n.d(t, "isUserOwnerInChat", function() {
            return A
        }), n.d(t, "isUserInvitedByMe", function() {
            return M
        });
        var r, i = n(160),
            a = n(214),
            o = n(33);

        function s(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var c = 1,
            u = 4,
            d = 8,
            l = 16,
            f = 32,
            _ = "see_invite_link",
            h = "change_invite_link",
            p = "invite_user",
            m = "pin_unpin",
            g = "change_title",
            v = "add_admin",
            b = (s(r = {}, _, f), s(r, h, f), s(r, v, l), s(r, p, c), s(r, m, u), s(r, g, d), r),
            y = 1;

        function w(e, t, n) {
            return I(e, _, t, n)
        }

        function C(e, t, n) {
            return I(e, h, t, n)
        }

        function k(e, t, n, r) {
            var o = Object(a.unpackStore)(e);
            return !A(Object(i.getTab)(o, n || o.peer), t) && I(e, v, n, r)
        }

        function T(e, t, n) {
            return I(e, p, t, n)
        }

        function E(e, t, n, r) {
            var s = Object(a.unpackStore)(e);
            if (function(e, t) {
                    var n = Object(a.unpackStore)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, y)) return !0;
            var c = Object(i.getTab)(s, n || s.peer);
            return !(c.data.kicked && !c.data.closed) && (!Object(o.isFvkcomgroup)(e, n) && (!A(c, t) && (!!A(c, r = void 0 === r ? window.vk.id : r) || (F(c, r) ? !F(c, t) : M(c, t) && !F(c, t)))))
        }

        function O(e, t, n) {
            return I(e, m, t, n)
        }

        function N(e, t, n) {
            return I(e, g, t, n)
        }

        function S(e, t, n) {
            return N(e, t, n) && !Object(o.isFvkcomgroup)(e, t)
        }

        function j(e, t, n) {
            return !Object(i.isCommunityPeer)(n) || !!Object(i.getTab)(e, t).caccess[n]
        }

        function I(e, t, n, r) {
            var s = Object(a.unpackStore)(e);
            r = void 0 === r ? window.vk.id : r, n = void 0 === n ? s.peer : n;
            var c = Object(i.getTab)(s, n),
                u = !c.data.kicked && !c.data.closed,
                d = b[t];
            if (Object(o.isFvkcomgroup)(e, n)) switch (t) {
                case v:
                case p:
                    return !1;
                case _:
                    return u;
                default:
                    return s.gid > 0
            }
            switch (t) {
                case _:
                case h:
                case v:
                    return x(c, d) ? F(c, r) && u : A(c, r);
                case p:
                case m:
                case g:
                    return x(c, d) ? F(c, r) && u : u
            }
            return !1
        }

        function x(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function F(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function A(e, t) {
            return e.ownerId === t
        }

        function M(e, t) {
            return -1 !== e.invitedByMe.indexOf(t)
        }
    },
    124: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(115),
            i = n(150),
            a = n(196),
            o = n(136),
            s = n(174),
            c = n(0),
            u = n(164),
            d = n(10),
            l = n(33),
            f = n(92),
            _ = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function h() {
            return !curFastChat.version || !curFastChat.tabs
        }
        window.curFastChat || (window.curFastChat = {}), window.FastChat = {
            init: function(e) {
                var t = this;
                0 !== vk.id && (extend(curFastChat, {
                    tabs: {},
                    needPeers: {},
                    gotPeers: {},
                    needMedia: {},
                    gotMedia: {},
                    ldb: Object(r.mount)(vk.id),
                    myTypingEvents: {},
                    typingEvents: {},
                    inited: !0,
                    options: e,
                    posSeq: 0,
                    error_timeout: 1,
                    lpInstance: Notifier.getLpInstance()
                }), delete curFastChat.standby, delete curFastChat.standbyTO, curFastChat.lpInstance.onData(function() {
                    for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    var i = t.getResourcesThatShouldBeLoaded(n);
                    (i.shouldLoad ? t.loadResources(i) : Promise.resolve()).then(function() {
                        n.forEach(function(e) {
                            switch (e.type) {
                                case o.TYPING:
                                    var n = t.getTab(e.peerId);
                                    t.setTyping(e), n && (t.updateTypings(), t.waitTyping(e).then(t.updateTypings)), t.blinkTyping(e.peerId);
                                    break;
                                case o.ADD_MESSAGE:
                                    var r = t.getTab(e.peerId);
                                    t.setTyping(e), r && (t.addMessage(t.prepareMessageData(e)), t.scroll(e.peerId), t.blinkTab(e.peerId), t.updateTypings(), t.waitTyping(e).then(t.updateTypings)), t.updateTabUnreadCounter(r, e);
                                    break;
                                case o.EDIT_MESSAGE:
                                case o.REPLACE_MESSAGE:
                                    var i = e.peerId,
                                        a = e.messageId,
                                        s = t.getTab(i);
                                    s && s.msgs[a] && (delete curFastChat.gotMedia[a], t.editMessage(t.prepareMessageData(e)));
                                    break;
                                case o.REPLACE_FLAGS:
                                case o.SET_FLAGS:
                                case o.RESET_FLAGS:
                                    e.flags & o.FLAG_DELETED && t.deleteMessage(t.prepareMessageData(e));
                                    break;
                                case o.READ_INBOUND:
                                case o.READ_OUTBOUND:
                                    t.markMessagesAsRead(e);
                                    break;
                                case o.CHAT_CHANGED:
                                case o.CONVERSATION_UPDATED:
                                    var c = t.getTab(e.peerId);
                                    t.handleEventChatUpdated(c, e);
                                    break;
                                case o.VIDEO_CALL:
                                case o.UNREAD_COUNT:
                                case o.NOTIFY_SETTINGS_CHANGED:
                                case o.EMPTY:
                                case o.RESYNC:
                                case o.REFRESH_LP_KEY:
                                case o.TRANSITION:
                                case o.RESET_PEER:
                                case o.MUTEX:
                                case o.CHANGE_PEER:
                                case o.CHANGE_TAB:
                                case o.FAILED_MESSAGE:
                                case o.RESEND:
                                case o.DELETE_DIALOG:
                            }
                        })
                    })
                }), Notifier.addRecvClbk("fastchat", 0, FastChat.lcRecv, !0), Notifier.addRecvClbk("logged_off", 0, FastChat.standby, !0), FastChat.lcSend("needSettings", {
                    version: e.version,
                    lang_id: langConfig.id
                }), clearTimeout(curFastChat.getSettingsTO), curFastChat.getSettingsTO = setTimeout(FastChat.getSettings, 300))
            },
            getSettings: function() {
                var e = ls.get("fcFriends" + vk.id);
                ajax.post("al_im.php", {
                    act: "a_get_fast_chat",
                    friends: e && e.version,
                    cache_time: FastChat.cachedStickersKeywordsTime()
                }, {
                    onDone: function(t) {
                        -1 == t.friends ? (t.friends_version = e.version, t.friends = e.list) : ls.set("fcFriends" + vk.id, {
                            version: t.friends_version,
                            list: t.friends
                        }), FastChat.gotSettings(t), FastChat.sendSettings()
                    },
                    onFail: function() {
                        return !0
                    }
                })
            },
            cachedStickersKeywordsTime: function() {
                var e = ls.get("stickers_keywords");
                return e && e.time ? Math.floor(e.time / 1e3) : 0
            },
            gotSettings: function(e) {
                e.emoji_stickers && (window.emojiStickers = e.emoji_stickers), window.Emoji && Emoji.updateTabs(), e.autoplay_animations && window.StickersSettings.setAutoplay(e.autoplay_animations), clearTimeout(curFastChat.getSettingsTO), window.lang = extend(window.lang || {}, e.lang), extend(curFastChat, e, {
                    lang_id: langConfig.id
                }), curFastChat.friendsCnt = Object.keys(curFastChat.friends), setTimeout(FastChat.clistCache.pbind(!1), 10), FastChat.initUI()
            },
            sendSettings: function() {
                clearTimeout(curFastChat.sendSettingsTO);
                var e = ["friends", "friends_version", "onlines", "tpl", "lang", "me", "version"].reduce(function(e, t) {
                    return e[t] = curFastChat[t], e
                }, {});
                curFastChat.sendSettingsTO = setTimeout(function() {
                    FastChat.lcSend("settings", {
                        settings: e
                    })
                }, curNotifier.is_server ? 0 : irand(50, 100))
            },
            destroy: function() {
                return !!curFastChat.inited && (curFastChat.ldb.unmount(), each(curFastChat.tabs || {}, function(e, t) {
                    t.box.destroy()
                }), curFastChat.clistBox && curFastChat.clistBox.destroy(), each(curFastChat.el || {}, function() {
                    cleanElems(this)
                }), clearInterval(curFastChat.updateFriendsInt), clearTimeout(curFastChat.correspondentsTO), clearTimeout(curFastChat.lp_error_to), curFastChat = {
                    inited: !1
                }, !0)
            },
            isChatOpen: function(e) {
                return !!(window.curFastChat && curFastChat.inited && e && (curFastChat.tabs && curFastChat.tabs[e] && curFastChat.tabs[e].box.visible || curFastChat.clistBox && curFastChat.clistBox.visible))
            },
            standby: function(e) {
                FastChat.destroy(), curFastChat.standby = !0;
                var t = 1;
                ! function n() {
                    if (!curNotifier.is_server) return clearTimeout(curFastChat.standbyTO), void(curFastChat.standbyTO = setTimeout(n, 1e3 * t));
                    ajax.post("notifier.php?act=a_get_reload", {
                        version: e
                    }, {
                        onDone: function(e, t) {
                            FastChat.lcSend("gotConfig", {
                                navVersion: e,
                                config: t
                            }), FastChat.gotConfig(e, t)
                        },
                        onFail: function() {
                            return t *= 2, clearTimeout(curFastChat.standbyTO), curFastChat.standbyTO = setTimeout(n, 1e3 * t), !0
                        }
                    })
                }()
            },
            gotConfig: function(e, t) {
                clearTimeout(curFastChat.standbyTO), curFastChat.standby && setTimeout(function() {
                    e > stVersions.nav && (debugLog("appending al loader"), headNode.appendChild(ce("script", {
                        type: "text/javascript",
                        src: "/js/loader_nav" + e + "_" + vk.lang + ".js"
                    }))), setTimeout(function() {
                        e <= stVersions.nav ? stManager.add(["notifier.js", "notifier.css", jsc("web/emoji.js")], function() {
                            FastChat.init(t)
                        }) : setTimeout(arguments.callee, 100)
                    }, 0)
                }, curNotifier.is_server ? 0 : irand(1e3, 2e3))
            },
            updateVersion: function(e) {
                FastChat.lcSend("standby", {
                    version: e
                }), FastChat.standby(e)
            },
            lcSend: function(e, t) {
                Notifier.lcSend("fastchat", extend({
                    act: e,
                    __id: curFastChat.me && curFastChat.me.id || vk.id
                }, t))
            },
            lcRecv: function(e) {
                if (!isEmpty(e)) {
                    var t = e.act;
                    e.__id == (curFastChat.me && curFastChat.me.id || vk.id) && (delete e.act, delete e.__id, FastChat.lcFeed(t, e))
                }
            },
            lcFeed: function(e, t) {
                switch (e) {
                    case "needSettings":
                        curFastChat.version < t.version || t.lang_id == curFastChat.lang_id && FastChat.sendSettings();
                        break;
                    case "settings":
                        !curFastChat.version && curFastChat.options && t.settings.version == curFastChat.options.version && FastChat.gotSettings(t.settings), clearTimeout(curFastChat.sendSettingsTO);
                        break;
                    case "standby":
                        if (h()) break;
                        FastChat.standby(t.version);
                        break;
                    case "gotConfig":
                        FastChat.gotConfig(t.navVersion, t.config);
                        break;
                    case "clistOnlines":
                        if (h()) break;
                        FastChat.clistGotOnlines(t);
                        break;
                    case "needPeer":
                        if (h()) break;
                        var n = t.id,
                            r = curFastChat.tabs[n],
                            i = !1,
                            a = void 0;
                        if (void 0 !== r)
                            for (var o in i = {
                                    name: r.name,
                                    photo: r.photo,
                                    fname: r.fname,
                                    hash: r.hash,
                                    sex: r.sex,
                                    data: r.data,
                                    online: r.online
                                }, r.msgs) {
                                i.history = [r.log.innerHTML, r.msgs];
                                break
                            } else(a = curFastChat.friends[n + "_"]) && (i = {
                                name: a[0],
                                photo: a[1],
                                fname: a[2],
                                hash: a[3],
                                data: a[4],
                                online: curFastChat.onlines[n]
                            });
                        if (!1 === i) break;
                        curFastChat.gotPeers[n] = setTimeout(function() {
                            var e = {};
                            e[n] = i, FastChat.lcSend("gotPeers", e)
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingPeers":
                        if (h()) break;
                        each(t, function(e, t) {
                            var n = curFastChat.needPeers[e];
                            n && (t & n[0]) == n[0] && clearTimeout(n[2])
                        });
                        break;
                    case "gotPeers":
                        if (h()) break;
                        FastChat.gotPeers(t);
                        break;
                    case "stateChange":
                        if (h()) break;
                        FastChat.onStateChanged(t);
                        break;
                    case "needMedia":
                        var s = t.msgId;
                        if (void 0 === (u = curFastChat.gotMedia[s]) || 0 === u) break;
                        curFastChat.gotMedia[s][3] = setTimeout(function() {
                            FastChat.lcSend("gotMedia", {
                                msgId: s,
                                peer: u[0],
                                text: u[1],
                                msgOpts: u[2]
                            })
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingMedia":
                        s = t.msgId;
                        var c = curFastChat.needMedia[s];
                        if (void 0 === c || 0 === curFastChat.gotMedia[s]) break;
                        clearTimeout(c[1]), c[1] = setTimeout(FastChat.loadMsgMedia.pbind(c[0], s), 1e3);
                        break;
                    case "gotMedia":
                        s = t.msgId;
                        var u = curFastChat.gotMedia[s];
                        isArray(u) && clearTimeout(u[3]), FastChat.gotMsgMedia(t.peer, s, t.text, t.msgOpts)
                }
            },
            getResourcesThatShouldBeLoaded: function(e) {
                var t = this,
                    n = {},
                    r = e.filter(function(e) {
                        return e.type === o.ADD_MESSAGE
                    }),
                    i = e.filter(d.isServiceMsg),
                    a = r.filter(function(e) {
                        return !t.isTabLoaded(e.peerId)
                    }).map(function(e) {
                        return e.peerId
                    });

                function s(e, t) {
                    var r = FastChat.getTab(e);
                    Object(l.isChatPeer)(e) && t && r && !r.data.members[t] && (n[e] ? -1 === n[e].indexOf(t) && n[e].push(t) : n[e] = [t])
                }
                return r.forEach(function(e) {
                    t.isTabLoaded(e.peerId) && s(e.peerId, e.userId)
                }), i.forEach(function(e) {
                    s(e.peerId, +e.kludges.source_mid)
                }), {
                    shouldLoad: Object.keys(n).length > 0 || a.length > 0,
                    needPeers: a,
                    needMembers: n
                }
            },
            loadResources: function(e) {
                var t = e.needMembers,
                    n = curFastChat.lpInstance;
                return n.pause(), this.loadMembers(t).then(function() {
                    return n.resume()
                })
            },
            loadMembers: function(e) {
                var t = this;
                if (0 === Object.keys(e).length) return Promise.resolve();
                var n = Object.keys(e).map(function(t) {
                    return t + ":" + e[t].join(",")
                }).join(";");
                return Object(c.post)(f.CONTROLLER, {
                    act: "a_load_member",
                    need: n
                }).then(function(n) {
                    var r = _(n, 1)[0];
                    Object.keys(e).forEach(function(n) {
                        var i = t.getTab(n);
                        i && i.data && i.data.members && (i.data.members = e[n].reduce(function(e, t) {
                            var n = r.find(function(e) {
                                return e.id === t
                            });
                            return e[t] = Object.assign({
                                name_inv_case: n.inv_name,
                                name_kick_case: n.kick_name
                            }, n), e
                        }, i.data.members))
                    })
                })
            },
            handleEventChatUpdated: function(e, t) {
                var n = this;
                switch (t.updateType) {
                    case o.MAIL_CHAT_UPDATE_TYPE_TITLE_CHANGED:
                    case o.MAIL_CHAT_UPDATE_TYPE_AVATAR_CHANGED:
                        var r = [t.peerId, 0].join(",");
                        this.loadPeers(r, function(e) {
                            n.updateChatInfo(t.peerId, e)
                        });
                        break;
                    case o.MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED:
                    case o.MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED:
                    case o.MAIL_CHAT_UPDATE_TYPE_PINNED:
                    case o.MAIL_CHAT_UPDATE_TYPE_USER_JOINED:
                    case o.MAIL_CHAT_UPDATE_TYPE_USER_LEFT:
                    case o.MAIL_CHAT_UPDATE_TYPE_USER_KICKED:
                    case o.MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED:
                    case o.MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED:
                    case o.MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED:
                }
            },
            updateChatInfo: function(e, t) {
                var n = this.getTab(e),
                    r = t[e],
                    i = r.photo,
                    a = r.grid,
                    o = r.name,
                    s = document.querySelector("#chat_tab_icon_" + e + " .chat_tab_img"),
                    c = document.createElement(i ? "img" : "div"),
                    u = n && n.unread ? " (" + n.unread + ")" : "";
                n && n.title && (n.name = o, n.title.innerHTML = o + u), c.classList.add("chat_tab_img"), a ? c.innerHTML = '<div class="chat_tab_grid">' + a + "</div>" : i && (c.id = "im_dialog_ph" + (e - 2e9), c.src = i), s && s.parentNode.replaceChild(c, s)
            },
            blinkEl: function(e, t, n) {
                if (t > 10) return n(), !1;
                t % 2 == 0 ? animate(e, {
                    opacity: 0
                }, 400, function() {
                    FastChat.blinkEl(e, t + 1, n)
                }) : animate(e, {
                    opacity: 1
                }, 400, function() {
                    setTimeout(function() {
                        FastChat.blinkEl(e, t + 1, n)
                    }, 400)
                })
            },
            blinkTyping: function(e) {
                var t = ge("chat_tab_icon_" + e);
                if (t) {
                    var n = geByClass1("chat_tab_typing_wrap", t);
                    fadeIn(n, 150, function() {
                        FastChat.blinkEl(n.firstChild, 0, function() {
                            fadeOut(n, 150)
                        })
                    })
                }
            },
            imFeed: function(e, t) {
                var n = this.getTab(e);
                if (!n) return !1;
                n.auto && !n.unread && (n.box._close(!0), delete curFastChat.tabs[e])
            },
            tabNotify: function(e, t, n) {
                var r = curFastChat.tabs[e],
                    i = void 0;
                if (e > 0 && e < 2e9 && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, n), !(e <= 0) && r && r.box && !r.box.minimized) {
                    switch (clearTimeout(r.hideNotifyTO), t) {
                        case "online":
                            i = getLang("mail_im_user_became_online", 3 - r.sex), FastChat.blinkTab(e);
                            break;
                        case "offline":
                            i = getLang("mail_im_user_became_offline", 3 - r.sex), FastChat.blinkTab(e);
                            break;
                        case "unavail":
                            i = getLang("mail_im_not_online", 3 - r.sex).replace(/\.$/, "")
                    }
                    i = i.replace("{user}", r.fname), val(r.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + i + "</div>");
                    var a = r.notify.firstChild;
                    clearTimeout(r.hideNotifyTO), r.hideNotifyTO = setTimeout(function() {
                        fadeOut(a, 200, function() {
                            val(r.notify, "")
                        })
                    }, 5e3)
                }
            },
            hideChatCtrl: function() {
                removeClass(Chat.wrap, "chat_active"), removeEvent(document, "mousedown", FastChat.onDocClick)
            },
            showChatCtrl: function() {
                addClass(Chat.wrap, "chat_active"), setTimeout(function() {
                    addEvent(document, "mousedown", FastChat.onDocClick)
                }, 0)
            },
            hideUI: function() {
                addClass(bodyNode, "chat_onl_hidden")
            },
            showUI: function() {
                removeClass(bodyNode, "chat_onl_hidden")
            },
            initUI: function() {
                if (curFastChat.options) {
                    var e = curFastChat.el = {},
                        t = getWndInner();
                    re("rb_box_fc_clist"), e.clistWrap = se(curFastChat.tpl.clist), e.clist = geByClass1("fc_contacts", e.clistWrap, "div"), e.clistTitle = geByClass1("fc_tab_title", e.clistWrap, "div"), e.clistOnline = geByClass1("fc_clist_online", e.clistWrap, "div");
                    var n = curFastChat.options.state || !1,
                        r = !curFastChat.friendsCnt || (n && void 0 !== n.clist.min ? n.clist.min : t[1] < 1200 || curFastChat.friendsCnt < 5);
                    curFastChat.clistW = 270, curFastChat.clistH = 299;
                    var i = {
                        id: "fc_clist",
                        movable: geByClass1("fc_tab_head", e.clistWrap),
                        hider: geByClass1("fc_tab_close_wrap", e.clistWrap, "a"),
                        startHeight: curFastChat.clistH,
                        startWidth: curFastChat.clistW,
                        resizeableH: e.clist,
                        resize: !1,
                        minH: 150,
                        fixed: r,
                        onHide: function(t) {
                            val("fc_clist_filter", curFastChat.q = ""), addClass(curFastChat.clistBox.wrap, "fc_fixed"), curFastChat.clistBox.fixed = !0, FastChat.stateChange({
                                op: "clist_toggled",
                                val: 0
                            }), setStyle(curFastChat.clistBox.wrap, {
                                top: "auto",
                                bottom: 0,
                                right: 72,
                                left: "auto"
                            }), show(e.topLink), FastChat.hideChatCtrl()
                        },
                        onShow: function() {
                            FastChat.showChatCtrl()
                        },
                        onDragEnd: function(e, t) {
                            FastChat.stateChange({
                                op: "clist_moved",
                                y: e,
                                x: t
                            })
                        },
                        onResize: function(e, t) {
                            curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0)
                        }
                    };
                    n && !r && (!1 !== n.clist.x && (-1 == n.clist.x ? i.startRight = 0 : i.startLeft = t[1] * n.clist.x), !1 !== n.clist.y && (-1 == n.clist.y ? i.startBottom = 0 : i.startTop = t[0] * n.clist.y)), r && (i.noshow = !0), void 0 === i.startTop && void 0 === i.startBottom && (i.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === i.startLeft && void 0 === i.startRight && (i.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, i), i.noshow || void 0 === i.startLeft && void 0 === i.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                        prefix: "fc_",
                        scrollChange: FastChat.clistShowMore,
                        nomargin: !0,
                        global: !0,
                        nokeys: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto"
                    }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4);
                    var a, o = ge("fc_clist_filter");
                    if (placeholderInit(o, {
                            global: !0
                        }), curFastChat.q = "", addEvent(o, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
                            if (e.keyCode == KEY.ESC) return FastChat.clistHide(), cancelEvent(e);
                            var t = FastChat.clistFilterKey(e);
                            if (void 0 !== t) return t;
                            curFastChat.q = trim(val(this)), FastChat.clistRender()
                        }), e.clistOnline) bodyNode.appendChild(a = ce("nobr", {
                        className: "fl_l",
                        innerHTML: getLang("mail_im_clist_onlines")
                    }, {
                        visibility: "hidden",
                        position: "absolute"
                    })), re(a), addEvent(e.clistOnline, "mouseover", function(t) {
                        showTooltip(this, {
                            text: getLang("mail_im_clist_onlines"),
                            forcetoup: 1,
                            shift: [12, 4, 3],
                            className: "tt_fc_onlines",
                            init: function() {
                                browser.msie && (e.clistOnline.tt.isFixed = !1)
                            },
                            black: 1
                        })
                    }), addEvent(e.clistOnline, "click", function(e) {
                        (e.originalEvent || e).cancelBubble = !0, FastChat.clistToggleOnlines(), FastChat.clistRender()
                    }), n && n.clist && n.clist.onlines && FastChat.clistToggleOnlines(!0);
                    r ? FastChat.clistUpdateTitle() : FastChat.clistRender(), curFastChat.ready = !0, n && n.tabs && each(n.tabs, function(e, n) {
                        e = intval(e);
                        var r = {
                            nofocus: 1
                        };
                        this.min && (r.minimized = !0), this.h && (r.startHeight = this.h * t[0]), this.w && (r.startWidth = this.w * t[1]), void 0 !== this.x && this.x <= 1 && (this.x < 0 ? r.startRight = 0 : r.startLeft = t[1] * this.x), void 0 !== this.y && this.y <= 1 && (this.y < 0 ? r.startBottom = 0 : r.startTop = t[0] * this.y), n.fx ? (r.fixedLoad = !0, FastChat.prepareTabIcon(e, r, !0)) : (r.noAnim = !0, FastChat.addPeer(e, !1, !1, r))
                    }), addEvent(Chat.itemsCont, "mousemove mouseover", FastChat.itemsTT), addEvent(Chat.itemsCont, "mouseout", FastChat.itemsOut)
                }
            },
            itemsOffset: 12,
            itemsTT: function(e) {
                for (var t = e.target, n = !1; t && t != Chat.itemsCont;) {
                    if (hasClass(t, "chat_tab_wrap")) {
                        n = t;
                        break
                    }
                    t = t.parentNode
                }
                if (!n) return clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, !1;
                var r = n.id.split("_")[3],
                    i = Chat.tabs[r];
                return !!i && (curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == r ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(n, {
                    text: i.name,
                    slideX: 15,
                    black: 1,
                    asrtl: 1,
                    appendEl: Chat.ttNode,
                    className: "tt_black_side",
                    shift: [-58, -37, 0]
                }), void(Chat.ttPeer = n)))
            },
            itemsOut: function() {
                if (Chat.ttOutTimeout) return !1;
                Chat.ttOutTimeout = setTimeout(function() {
                    if (Chat.ttOutTimeout = !1, !Chat.ttPeer) return !1;
                    triggerEvent(Chat.ttPeer, "mouseout"), Chat.ttPeer = !1
                }, 0)
            },
            stateChange: function(e) {
                ajax.post("al_im.php", extend({
                    act: "a_state_fc",
                    hash: curFastChat.options.state_hash || ""
                }, e), {
                    onFail: function() {
                        return !0
                    }
                }), FastChat.lcSend("stateChange", e)
            },
            onStateChanged: function(e) {
                var t = !!e.peer && curFastChat.tabs[e.peer],
                    n = e.peer ? t && t.box : curFastChat.clistBox,
                    r = getWndInner();
                switch (e.op) {
                    case "added":
                        if (t) {
                            delete t.auto;
                            break
                        }
                        e.fixed ? FastChat.prepareTabIcon(e.peer, {
                            fixedLoad: !0
                        }) : FastChat.addPeer(e.peer);
                        break;
                    case "unfixed":
                        var i = {
                            startHeight: intval(r[0] * e.h),
                            startWidth: intval(r[1] * e.w)
                        }; - 1 == e.y ? i.startBottom = 0 : i.startTop = intval(r[0] * e.y), -1 == e.x ? i.startRight = 0 : i.startLeft = intval(r[1] * e.x), FastChat.addPeer(e.peer, !1, !1, i);
                        break;
                    case "closed":
                        if (Chat.tabs[e.peer] && FastChat.closeTabIcon(e.peer), !t || !n) break;
                        n.close();
                        break;
                    case "hidden":
                        if (!t || !n) break;
                        n.close();
                        break;
                    case "minimized":
                        if (!t || !n) break;
                        e.val ? n.unminimize() : n.minimize();
                        break;
                    case "moved":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        break;
                    case "resized":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        var a = intval(r[1] * e.w);
                        setStyle(n.resizeableH, "height", intval(r[0] * e.h)), setStyle(n.resizeableW, "width", a), FastChat.fixResized(t, a);
                        break;
                    case "clist_toggled":
                        e.val ? n.show(0, !0) : n.hide(0, !0), toggle(curFastChat.el.topLink, !e.val);
                        break;
                    case "clist_moved":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        break;
                    case "onlines_toggled":
                        FastChat.clistToggleOnlines(e.val), FastChat.clistRender()
                }
            },
            onUnidle: function() {
                curNotifier.version && curFastChat.clistBox && (curFastChat.clistBox.visible && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle(), each(curFastChat.tabs, function(e) {
                    FastChat.restoreDraft(e)
                }))
            },
            clistUpdate: function() {
                var e = vkNow();
                if (curNotifier.is_server && !(curFastChat.clistUpdatedTs && e - curFastChat.clistUpdatedTs < 6e4)) {
                    curFastChat.clistUpdatedTs = e;
                    var t, n = [];
                    for (t in curFastChat.tabs) n.push(t);
                    for (t in Chat.tabs) n.push(t);
                    ajax.post("al_im.php", {
                        act: "a_onlines",
                        peer: n.join(",")
                    }, {
                        onDone: function(e) {
                            FastChat.clistGotOnlines(e), FastChat.lcSend("clistOnlines", e)
                        }
                    })
                }
            },
            clistGotOnlines: function(e) {
                var t = curFastChat.onlines,
                    n = [];
                curFastChat.onlines = e, curNotifier.idle_manager && curNotifier.idle_manager.is_idle || !curFastChat.tabs && Chat.tabs || (each(curFastChat.tabs, function(r) {
                    curFastChat.onlines[r] != t[r] && (FastChat.tabNotify(r, e[r] ? "online" : "offline", e[r]), e[r] || (n[r] = 1))
                }), each(Chat.tabs, function(n) {
                    if (curFastChat.onlines[n] != t[n]) {
                        var r = geByClass1("_chat_tab_image", ge("chat_tab_icon_" + n));
                        toggleClass(r, "online", e[n]), toggleClass(r, "mobile", e[n] && mobPlatforms[e[n]])
                    }
                }), n = arrayKeyDiff(t, e, n), each(n, function(e) {
                    FastChat.tabNotify(e, "offline")
                }), FastChat.clistRender())
            },
            clistShow: function() {
                var e = hasClass(Chat.wrap, "chat_active");
                FastChat.clistRender(), curFastChat.clistBox.visible ? curFastChat.clistBox.focus() : (curFastChat.activeBox && curFastChat.activeBox != curFastChat.clistBox && curFastChat.activeBox.hide(), curFastChat.clistBox.show(), FastChat.setActive(curFastChat.clistBox), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0), curFastChat.el.topLink && hide(curFastChat.el.topLink)), elfocus("fc_clist_filter"), FastChat.movePointer(!1, e)
            },
            clistHide: function() {
                curFastChat.clistBox.hide(), curFastChat.activeBox == curFastChat.clistBox && FastChat.setActive(!1)
            },
            clistRender: function(e) {
                var t = [],
                    n = !e,
                    r = 1 + (e ? 40 : 20),
                    i = curFastChat.q,
                    a = !1,
                    o = !1,
                    s = !1;
                if (i ? (s = [], each(FastChat.clistCache(i), function() {
                        s.push(escapeRE(this))
                    }), s = new RegExp("([ -]|^|s|&nbsp;|\b)(" + s.join("|") + ")", "gi"), a = curFastChat.clistCache[i] || {}) : curFastChat.clOnlines && (a = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                        var i = intval(e),
                            c = !a || a[i];
                        if (n) {
                            if (c) {
                                if (!--r) return curFastChat.clHasMore = !0, !1;
                                t.push(FastChat.clistWrapPeer(i, this, s)), o = i
                            }
                        } else i == curFastChat.clOffset && (n = !0)
                    }), !1 !== o || e || i ? i && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(i, s, !1 === o)) : t.push('<div class="fc_clist_empty">' + getLang(i ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = o, e) {
                    for (var c = ce("div", {
                            innerHTML: t.join("")
                        }), u = document.createDocumentFragment(); c.firstChild;) u.appendChild(c.firstChild);
                    curFastChat.el.clist.appendChild(u), curFastChat.clHasMore || FastChat.clistUpdateTitle(!0)
                } else val(curFastChat.el.clist, t.join("")), FastChat.clistUpdateTitle(!0), (browser.chrome || browser.safari) && setTimeout(function() {
                    setStyle(curFastChat.el.clist.firstChild, {
                        width: curFastChat.el.clist.firstChild.clientWidth
                    }), setTimeout(function() {
                        setStyle(curFastChat.el.clist.firstChild, {
                            width: ""
                        })
                    }, 0)
                }, 0);
                if (curFastChat.clSel) {
                    (d = ge("fc_contact" + curFastChat.clSel)) ? FastChat.clistPeerOver(d, 1): curFastChat.clSel = !1
                } else {
                    var d = geByClass1("fc_contact", curFastChat.el.clist);
                    FastChat.clistPeerOver(d, 1)
                }
                curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
            },
            clistWrapPeer: function(e, t, n) {
                var r, i, a = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                    o = curFastChat.onlines[e],
                    s = onlinePlatformClass(o),
                    c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                if (n && (c = c.replace(n, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && e < 2e9 ? (r = "/id" + e, i = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (r = "/im?sel=" + e, i = ""), e > 2e9 && t[3]) var u = t[3];
                else u = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
                return '<a href="' + r + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event, { entrypoint: \'fastchat_search\' });" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + s + '" ' + i + ">" + u + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (a ? " <b>+" + a + "</b>" : "") + "</span></span></a>"
            },
            clistPeerOver: function(e, t, n) {
                if (e && checkOver(n, e)) {
                    var r = e.id.substr(10);
                    curFastChat.clSel && t && curFastChat.clSel != r && FastChat.clistPeerOver(ge("fc_contact" + curFastChat.clSel), 0), toggleClass(e, "fc_contact_over", t), t ? curFastChat.clSel = r : curFastChat.clSel == r && (curFastChat.clSel = !1)
                }
            },
            authorOver: function(e, t) {
                var n = e.getAttribute("data-title"),
                    r = gpeByClass("fc_tab_log", e),
                    i = !1;
                if (e.getBoundingClientRect().top - r.getBoundingClientRect().top < 10 && (i = !0), n) {
                    var a = e.getAttribute("data-date");
                    a && (n += "<br>" + a), showTooltip(e, {
                        text: '<div class="fc_author_tt">' + n + "</div>",
                        black: 1,
                        center: 1,
                        forcetodown: i,
                        shift: [1, 8, 0]
                    })
                }
            },
            getCorrespondents: function(e, t, n) {
                return clearTimeout(curFastChat.correspondentsTO), curFastChat.correspondents && void 0 !== curFastChat.correspondents[e] ? FastChat.wrapCorrespondents(curFastChat.correspondents[e]) || n && '<div class="fc_clist_empty">' + getLang("mail_im_clist_notfound") + "</div>" || "" : (curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(e, t), 100), '<div id="fc_correspondents"></div>')
            },
            loadCorrespondents: function(e, t) {
                e == curFastChat.q && ajax.post("hints.php", {
                    act: "a_json_friends",
                    str: e,
                    from: "fc",
                    allow_multi: 1
                }, {
                    onDone: function(n) {
                        curFastChat.correspondents || (curFastChat.correspondents = {});
                        var r, i = {};
                        if (each(n, function() {
                                r = this[3] + "_", curFastChat.friends[r] || (i[r] = [this[1], this[2], this[3], this[4] || ""])
                            }), curFastChat.correspondents[e] = i, e == curFastChat.q) {
                            var a = ge("fc_correspondents");
                            if (a) {
                                var o = a.parentNode,
                                    s = ce("div", {
                                        innerHTML: FastChat.wrapCorrespondents(i, t)
                                    }),
                                    c = document.createDocumentFragment();
                                if (s.firstChild)
                                    for (; s.firstChild;) c.appendChild(s.firstChild);
                                else o.firstChild == a && c.appendChild(ce("div", {
                                    className: "fc_clist_empty",
                                    innerHTML: getLang("mail_im_clist_notfound")
                                }));
                                o.replaceChild(c, a), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
                            }
                        }
                    }
                })
            },
            wrapCorrespondents: function(e, t) {
                var n = [];
                return each(e, function(e) {
                    n.push(FastChat.clistWrapPeer(intval(e), this, t))
                }), n.join("")
            },
            updateFriends: function(e) {
                if (window.Chat && Chat.inited) {
                    var t = Chat.onl;
                    t && (e > 0 ? (val(t, e), show(Chat.wrap)) : hide(Chat.wrap))
                }
            },
            onDocClick: function(e) {
                if (curFastChat.activeBox) {
                    var t = e.target;
                    if (curBox()) return !0;
                    for (; t;) {
                        if ("fc_tab_wrap" == t.className || "chat_onl_wrap" == t.id || "custom_menu_cont" == t.id || "layer_wrap" == t.id || "box_layer_wrap" == t.id || "wk_layer_wrap" == t.id) return !0;
                        t = t.parentNode
                    }
                    var n = curFastChat.tabs[curFastChat.activeBox.options.peer];
                    if (n && (trim(Emoji.editableVal(n.txt)) || n.imMedia && n.imMedia.getMedias().length)) return !0;
                    curFastChat.activeBox.hide()
                }
            },
            clistCache: function(e) {
                if (e) {
                    var t, n, r, i, a, o, s, c, u = [e];
                    if ((n = parseLatin(e)) && u.push(n), (n = parseLatKeys(e)) && u.push(n), (n = parseCyr(e)) && u.push(n), void 0 !== curFastChat.clistCache[e]) return u;
                    for (r in c = curFastChat.clistCache[e] = {}, u)
                        if (t = u[r], a = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()])
                            for (i in o = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi"), a) s = curFastChat.friends[i + "_"], isArray(s) && null !== s[0].match(o) && (c[i] = 1);
                    for (r in i = 0, c) i++;
                    return c._num = i, u
                }
                var d, l, f;
                for (r in curFastChat.clistCache = {}, curFastChat.friends)
                    for (d = curFastChat.friends[r][0], r = intval(r), l = 0; f = " " + d.charAt(l).toLowerCase(), curFastChat.clistCache[f] || (curFastChat.clistCache[f] = {}), curFastChat.clistCache[f][r] = 1, -1 != (l = d.indexOf(" ", l + 1));) ++l
            },
            clistShowMore: function() {
                if (curFastChat.clHasMore) {
                    var e = curFastChat.el.clist;
                    e.scrollTop + 3 * e.clientHeight > e.scrollHeight && FastChat.clistRender(!0)
                }
            },
            clistUpdateTitle: function(e) {
                var t, n = 0,
                    r = 0;
                for (t in curFastChat.friends) curFastChat.onlines[intval(t)] ? (r++, n++) : curFastChat.clOnlines || n++;
                var i = window.newVal = (r ? getLang("mail_im_X_onlines_title", r) : getLang("mail_im_onlines_title")).toString();
                FastChat.updateFriends(r), val(curFastChat.el.clistTitle, i), val(curFastChat.el.topLink, i.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? n = curFastChat.el.clist.childNodes.length : curFastChat.q && (n = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * n)
            },
            clistToggleOnlines: function(e) {
                void 0 === e && (e = !curFastChat.clOnlines, FastChat.stateChange({
                    op: "onlines_toggled",
                    val: e ? 1 : 0
                })), toggleClass(curFastChat.el.clistOnline, "fc_clist_online_active", e), curFastChat.clOnlines = e
            },
            clistFilterKey: function(e) {
                var t;
                switch (e.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                        if ("keyup" != e.type) {
                            if (t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel)) {
                                var n = e.keyCode == KEY.DOWN ? "nextSibling" : "previousSibling",
                                    r = t;
                                do {
                                    r = r[n]
                                } while (r && (1 != r.nodeType || !hasClass(r, "fc_contact")))
                            } else curFastChat.clSel || e.keyCode != KEY.DOWN || (r = geByClass1("fc_contact", curFastChat.el.clist, "a"));
                            if (r && r != t) {
                                FastChat.clistPeerOver(r, 1);
                                var i = curFastChat.el.clist;
                                r.offsetTop + 16 > i.clientHeight + i.scrollTop ? (i.scrollTop = r.offsetTop + 16 - i.clientHeight, curFastChat.clistBoxScroll.update()) : r.offsetTop - 36 < i.scrollTop && (i.scrollTop = r.offsetTop - 36, curFastChat.clistBoxScroll.update())
                            }
                        }
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        return !0;
                    case KEY.ENTER:
                        if ("keyup" == e.type || !(t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel))) break;
                        e.ctrlKey || e.metaKey && browser.mac ? nav.go(t.href.match(/\b(vkontakte\.ru|vk\.com)(\/[^\/]+?)$/)[2]) : FastChat.selectPeer(curFastChat.clSel);
                    case KEY.ESC:
                        if ("keyup" != e.type) {
                            var a = ge("fc_clist_filter"),
                                o = val(a) || curFastChat.clSel;
                            a.blur(), val(a, curFastChat.q = ""), curFastChat.clSel = !1, o && FastChat.clistRender()
                        }
                        break;
                    default:
                        return
                }
                return cancelEvent(e)
            },
            prepareTabIcon: function(e, t, n) {
                var r = curFastChat.friends && curFastChat.friends[e + "_"];
                if (r) {
                    var i = {
                        name: r[0],
                        photo: r[1],
                        online: curFastChat.onlines[e]
                    };
                    FastChat.addTabIcon(e, i, n)
                } else {
                    curFastChat.needPeers[e] = [3, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t]
                }
            },
            addTabIcon: function(e, t, n) {
                if (Chat.itemsCont && !Chat.tabs[e]) {
                    if (e > 2e9) var r = t.data.members_grid_fc || "";
                    else r = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                    if (e > 2e9) var i = "im?sel=c" + (e - 2e9);
                    else i = t.alink || "/id" + e;
                    var a = onlinePlatformClass(t.online),
                        o = se('<a class="chat_tab_wrap' + (n ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + i + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + a + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + r + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div><div class="chat_tab_counter"></div></a>');
                    Chat.itemsCont.insertBefore(o, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                        el: o,
                        name: t.name
                    }, addClass(Chat.wrap, "chat_expand"), n || removeClass(o, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
                }
            },
            checkChatHeight: function() {
                var e = getSize(Chat.itemsCont)[1];

                function t() {
                    addEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }

                function n() {
                    removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }
                Chat.lastHeight = e, e > Chat.maxHeight ? (Chat.fixH || (Chat.fixH = !0, addClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: Chat.maxHeight
                }), addEvent(Chat.scrollNode, "mouseenter", t), addEvent(Chat.scrollNode, "mouseleave", n), FastChat.checkShadow()), Chat.scrollNode.scrollTop = e - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: "auto"
                }), removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap), removeEvent(Chat.scrollNode, "mouseenter", t), removeEvent(Chat.scrollNode, "mouseleave", n), FastChat.checkShadow())
            },
            checkShadow: function() {
                var e = intval(Chat.scrollNode.scrollTop);
                e && Chat.fixH ? Chat.shadowTop || (addClass(Chat.wrap, "chat_scroll_top"), fadeIn(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !0) : Chat.shadowTop && (fadeOut(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !1), Chat.lastHeight - e > Chat.maxHeight && Chat.fixH ? Chat.shadowBottom || (fadeIn(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !0) : Chat.shadowBottom && (fadeOut(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !1)
            },
            scrollWrap: function(e) {
                e || (e = window.event);
                var t = 0;
                return e.wheelDeltaY || e.wheelDelta ? t = (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && (t = 10 * -e.detail), Chat.scrollNode.scrollTop -= t, curFastChat.activeBox == curFastChat.clistBox ? (curFastChat.pointerMargin = 0, FastChat.setPointer(!1, curFastChat.pointerMargin, curFastChat.prevPointer)) : (curFastChat.pointerMargin = -Chat.scrollNode.scrollTop, FastChat.setPointer(!0, curFastChat.pointerMargin, curFastChat.prevPointer)), FastChat.checkShadow(), setStyle(Chat.ttNode, {
                    top: -Chat.scrollNode.scrollTop
                }), cancelEvent(e)
            },
            togglePeer: function(e, t) {
                return curFastChat.activeBox && curFastChat.activeBox.options.peer == e ? (curFastChat.activeBox.hide(), FastChat.setActive(!1), !1) : FastChat.selectPeer(e, t, {
                    entrypoint: "fastchat_icon"
                })
            },
            selectPeer: function(e, t, n) {
                if (checkEvent(t)) return !0;
                var r = hasClass(Chat.wrap, "chat_active");
                if (curFastChat.tabs && curFastChat.tabs[e]) {
                    var i = curFastChat.tabs[e].box;
                    i.minimized && i.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, r)
                } else n || (n = {}), n.fixed = !0, n.onPeerAdded = function() {
                    FastChat.movePointer(e, r)
                }, n.onHistoryLoaded = FastChat.readLastMessages.pbind(e), FastChat.addPeer(e, !1, !0, n);
                return curFastChat.tabs[e] && curFastChat.tabs[e].iman && (curFastChat.tabs[e].entrypoint = n && n.entrypoint, curFastChat.tabs[e].iman.unidle()), !1
            },
            closeTabIcon: function(e, t, n) {
                curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !n && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
                var r = ge("chat_tab_icon_" + e);
                addClass(r, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
                return animate(r, {
                    height: 0,
                    opacity: 0
                }, {
                    duration: 100,
                    onComplete: function() {
                        re(r), r && (r = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                        var e = Chat.scrollNode.scrollTop;
                        FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
                    }
                }), n || FastChat.stateChange({
                    op: "closed",
                    peer: e
                }), Object.keys(Chat.tabs).length || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
            },
            getPointerShift: function(e, t, n) {
                var r = n - t,
                    i = Chat.maxHeight + 32;
                return e && r < 62 ? r - 62 : e && r > i ? r - i : 0
            },
            setPointer: function(e, t, n) {
                if (!curFastChat.activeBox) return !1;
                var r = FastChat.getPointerShift(e, t, n),
                    i = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
                return setStyle(i, {
                    marginTop: t + r
                }), r
            },
            movePointer: function(e, t) {
                if (!curFastChat.activeBox) return !1;
                var n = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
                if (e) {
                    var r = ge("chat_tab_icon_" + e);
                    if (!r) return !1;
                    if (!Chat.fixH && r.nextSibling) var i = getXY(r.nextSibling)[1] - 50;
                    else if (r.nextSibling || Chat.fixH) i = getXY(r)[1] + Chat.scrollNode.scrollTop;
                    else i = getXY(ge("chat_tab_wrap"))[1] - 50;
                    var a = 23 + getXY(Chat.cont)[1] - i,
                        o = -Chat.scrollNode.scrollTop
                } else a = 28, o = 0;
                var s = FastChat.setPointer(e, o, a);
                if (t) {
                    if (curFastChat.prevPointer) {
                        var c = FastChat.getPointerShift(!0, o + s, curFastChat.prevPointer);
                        setStyle(n, {
                            bottom: curFastChat.prevPointer - c + s
                        })
                    }
                    animate(n, {
                        bottom: a
                    }, {
                        duration: 100
                    })
                } else setStyle(n, {
                    bottom: a
                });
                curFastChat.prevPointer = a
            },
            setActive: function(e) {
                curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
            },
            moveBoxesLeft: function(e, t) {
                e -= 8;
                var n = !1,
                    r = 0;
                for (var i in curFastChat.tabs) {
                    var a = curFastChat.tabs[i];
                    if (t || (a.box.movedLeft = !1), a && !a.box.options.fixed && a.box.toBottom && !a.box.movedLeft && !a.box.noMove) {
                        var o = a.box.pos;
                        o[1] + o[3] >= e && o[1] > r && (n = a, r = o[1])
                    }
                }
                if (n) {
                    var s = e - n.box.pos[3],
                        c = n.box.pos[0];
                    s < 0 && (s = 0), n.box.movedLeft = !0, animate(n.box.wrap, {
                        left: s
                    }, 200), n.box.pos = [c, s, n.box.pos[2], n.box.pos[3]];
                    var u = getWndInner();
                    FastChat.stateChange({
                        op: "moved",
                        peer: n.box.options.peer,
                        y: c / u[0],
                        x: s / u[1]
                    }), s && FastChat.moveBoxesLeft(s, !0)
                } else FastChat.moveLeftY = 0
            },
            moveBoxAway: function(e, t) {
                for (var n = t - e.pos[3] - 20, r = e.pos[3], i = e.pos[0], a = !1; n > 0 && !a;)
                    for (var o in a = !0, curFastChat.tabs) {
                        var s = curFastChat.tabs[o].box.pos;
                        s[0] + s[2] / 2 > i && s[1] + s[3] > n && s[1] < n + r && (n -= s[3], a = !1)
                    }
                n < 0 && (n = positive(Math.random() * t)), animate(e.wrap, {
                    left: n
                }, 300);
                var c = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: e.options.peer,
                    y: i / c[0],
                    x: n / c[1]
                })
            },
            pinTab: function(e, t, n) {
                if (-1 == e) var r = curFastChat.clistBox;
                else r = curFastChat.tabs[e].box;
                r.options.fixed = !1, removeClass(r.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
                var i = r.wrap.offsetTop,
                    a = r.wrap.offsetLeft - 10;
                setStyle(r.wrap, {
                    left: r.wrap.offsetLeft,
                    top: r.wrap.offsetTop,
                    right: "auto",
                    bottom: "auto"
                }), n || animate(r.wrap, {
                    left: a,
                    top: i
                }, 300), r.pos = [i, a, r.pos[2], r.pos[3]], r.toRight = !1, r.toBottom = !0, addClass(r.wrap, "fc_tobottom");
                var o = r.resizeableW.clientWidth - intval(getStyle(r.resizeableW, "paddingRight")) - intval(getStyle(r.resizeableW, "paddingLeft")),
                    s = r.resizeableH.clientHeight - intval(getStyle(r.resizeableH, "paddingBottom")) - intval(getStyle(r.resizeableH, "paddingTop")),
                    c = getWndInner(); - 1 == e ? FastChat.stateChange({
                    op: "clist_toggled",
                    val: 1,
                    y: r.toBottom ? -1 : r.pos[0] / c[0],
                    x: r.toRight ? -1 : r.pos[1] / c[1]
                }) : FastChat.stateChange({
                    op: "unfixed",
                    peer: e,
                    y: r.toBottom ? -1 : r.pos[0] / c[0],
                    x: r.toRight ? -1 : r.pos[1] / c[1],
                    h: s / c[0],
                    w: o / c[1]
                }), r.noMove = !0, FastChat.moveBoxesLeft(a), r.noMove = !1
            },
            addPeer: function(e, t, n, r) {
                r || (r = {});
                var i = curFastChat.friends && curFastChat.friends[e + "_"],
                    a = 0;
                if (n ? FastChat.stateChange({
                        op: "added",
                        peer: e,
                        fixed: r.fixed
                    }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (n = !0), i) {
                    var o = {
                        name: i[0],
                        photo: i[1],
                        fname: i[2],
                        hash: i[3],
                        online: curFastChat.onlines[e],
                        sex: i[4]
                    };
                    FastChat.addTabIcon(e, o, r.noAnim), FastChat.addBox(e, o, r), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (r && r.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), a |= 2)
                } else a = 3;
                a && (n ? (curFastChat.needPeers[e] = [a, t, !1, r], FastChat.getPeers()) : (curFastChat.needPeers[e] = [a, t, setTimeout(FastChat.getPeers, irand(150, 200)), r], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: a
                })))
            },
            getPeers: function() {
                var e = [],
                    t = {};
                Object.keys(curFastChat.needPeers || {}).forEach(function(n) {
                    var r = _(curFastChat.needPeers[n], 3),
                        i = r[0],
                        a = r[2];
                    e.push(n, i), a && clearTimeout(a), t[n] = i
                }), e.length && (FastChat.lcSend("fetchingPeers", t), FastChat.loadPeers(e.join(","), function(e) {
                    FastChat.gotPeers(e), FastChat.lcSend("gotPeers", e)
                }))
            },
            gotPeers: function(e) {
                h() || each(curFastChat.needPeers, function(t) {
                    if (e[t]) {
                        e[t] < 2e9 && (curFastChat.friends[t + "_"] = [e[t].name, e[t].photo, e[t].fname, e[t].hash, intval(e[t].sex)]);
                        var n = this[1],
                            r = this[3];
                        2 & this[0] && void 0 === e[t].history || (clearTimeout(this[2]), delete curFastChat.needPeers[t]), curFastChat.tabs[t] ? FastChat.gotHistory(t, e[t].history) : r.fixedLoad ? FastChat.addTabIcon(t, e[t]) : (FastChat.addTabIcon(t, e[t]), FastChat.addBox(t, e[t], r), n ? (curFastChat.tabs[t].auto = 1, FastChat.imFeed(t, n)) : (2 & this[0] && FastChat.gotHistory(t, e[t].history), r && r.nofocus || FastChat.activateTab(t))), r.onHistoryLoaded && r.onHistoryLoaded()
                    }
                })
            },
            gotHistory: function(e, t) {
                if (isArray(t) && t.length && t[0]) {
                    var n = curFastChat.tabs[e],
                        r = t[0],
                        i = t[1];
                    n.offset = t[2], extend(n.msgs, i), each(i, function(e, t) {
                        !t[0] && t[1] && n.unread++
                    }), val(n.log, r), n.logWrap.scrollTop = n.logWrap.scrollHeight, setTimeout(function() {
                        n.logWrap.scrollTop = n.logWrap.scrollHeight, n.scroll && n.scroll.update(!1, !0)
                    }, 10)
                }
            },
            decHashCb: function(e) {
                var t;
                t = e, curFastChat.decodedHashes[t] = function(e) {
                    for (var t = ge ? "" : "___", n = 0; n < e.length; ++n) t += e.charAt(e.length - n - 1);
                    return geByClass ? t : "___"
                }(t.substr(t.length - 5) + t.substr(4, t.length - 12))
            },
            decodehash: function(e) {
                return curFastChat.decodedHashes || (curFastChat.decodedHashes = {}), curFastChat.decodedHashes[e] || FastChat.decHashCb(e), curFastChat.decodedHashes[e]
            },
            loadPeers: function(e, t) {
                ajax.post("al_im.php", {
                    act: "a_get_fc_peers",
                    peers: e
                }, {
                    onDone: t
                })
            },
            sendTyping: function(e) {
                var t = intval(e),
                    n = this.getTab(t),
                    r = Date.now();
                t <= -2e9 || !n || curFastChat.myTypingEvents[t] && r - curFastChat.myTypingEvents[t] < 5e3 || (curFastChat.myTypingEvents[t] = r, ajax.post("al_im.php", {
                    act: "a_activity",
                    type: "typing",
                    peer: t,
                    hash: n.sendhash,
                    from: "fc"
                }))
            },
            setTyping: function(e) {
                var t = this.getTab(e.peerId),
                    n = e.type === o.ADD_MESSAGE;
                if (t && t.typing && n) {
                    var r = t.typing.userIds.filter(function(t, n) {
                        return t !== e.userId
                    });
                    0 === r.length ? delete t.typing : t.typing = Object.assign(t.typing, {
                        userIds: r
                    })
                } else t && !n && (e.ts = Date.now() / 1e3, t.typing = Object.assign(e, {
                    userIds: (e.userIds || []).filter(function(e, t) {
                        return e !== vk.id
                    })
                }))
            },
            waitTyping: function(e) {
                var t = this;
                return Object(u.pause)(f.ACTIVITY_PERIOD + 2).then(function() {
                    var n = t.getTab(e.peerId);
                    n && n.typing && (Date.now() - 1e3 * n.typing.ts >= 1e3 * f.ACTIVITY_PERIOD && delete n.typing)
                })
            },
            updateTypings: function() {
                var e = curFastChat.tabs || {};
                Object.keys(e).forEach(function(e) {
                    FastChat.updateTyping(e)
                })
            },
            updateTyping: function(e, t) {
                var n = this.getTab(e),
                    r = ge("fc_tab_typing" + e),
                    i = geByClass1("_fc_tab_typing_progress", r),
                    a = geByClass1("_fc_tab_typing_name", r);
                if (n.typing && n.typing.userIds.length > 0) {
                    var o = this.formatTyping(n.typing);
                    val(a, o), show(i)
                } else val(a, ""), hide(i);
                t ? setStyle(r, "opacity", 1) : fadeTo(r, 200, 1)
            },
            formatTyping: function(e) {
                var t = e.peerId,
                    n = e.userIds,
                    r = this.getTab(t),
                    i = n[0],
                    a = Object(l.isChatPeer)(t) ? r.data.members[i] : r,
                    o = function(e) {
                        return e.fname || e.name || ""
                    };
                if (1 === n.length || !Object(l.isChatPeer)(t)) return langSex(a.sex, getLang("mail_im_typing")).replace("{user}", o(a));
                var s = n[n.length - 1],
                    c = Object(l.isChatPeer)(t) ? r.data.members[s] : r;
                return getLang("mail_im_multi_typing").replace("{users}", o(a)).replace("{last_user}", o(c))
            },
            markMessagesAsRead: function(e) {
                var t = e.type,
                    n = e.peerId,
                    r = e.upToId,
                    i = e.unread,
                    a = this.getTab(n);
                a && (t === o.READ_INBOUND && (a.inUpTo = r), t === o.READ_OUTBOUND && (a.outUpTo = r), a.unread = i, this.updateUnreadMessagesInTab(n, r, t === o.READ_OUTBOUND)), this.updateTabUnreadCounterElement(a || {
                    unread: 0
                }, n)
            },
            updateUnreadMessagesInTab: function(e, t, n) {
                var r = this.getTab(e),
                    i = n ? ".fc_msgs_unread.fc_msgs_out" : ".fc_msgs_unread:not(.fc_msgs_out)";
                if (r && r.log) {
                    var a = r.log.querySelectorAll(i);
                    Array.prototype.forEach.call(a, function(e) {
                        +e.getAttribute("data-message-id") <= t && e.classList.remove("fc_msgs_unread")
                    })
                }
            },
            readLastMessages: function(e) {
                var t = FastChat.getTab(e);
                if (e && t) {
                    if (!t.markingRead && t.unread) {
                        var n = [];
                        for (var r in t.msgs) !t.msgs[r][0] && t.msgs[r][1] && n.push(r);
                        n.length > 0 && FastChat.markRead(e, n)
                    }
                    t.unread = 0, FastChat.updateTabUnreadCounterElement(t, e)
                }
            },
            markRead: function(e, t) {
                var n = this.getTab(e);
                n.markingRead = !0, ajax.post("al_im.php", {
                    act: "a_mark_read",
                    peer: e,
                    ids: t,
                    hash: n.sendhash,
                    from: "fc"
                }, {
                    onDone: function(r) {
                        for (var i in n.markingRead = !1, t) {
                            var a = t[i],
                                o = ge("fc_msg" + a),
                                s = o && o.parentNode;
                            o && (n.msgs[a] && n.msgs[a][1] && (n.msgs[a][1] = 0, n.msgs[a][0] || n.unread--), removeClass(o, "fc_msg_unread"), hasClass(s.parentNode, "fc_msgs_unread") && each(s.childNodes, function() {
                                if (!hasClass(this, "fc_msg_unread")) return removeClass(s.parentNode, "fc_msgs_unread"), !1
                            }))
                        }
                        n.unread = 0, FastChat.updateTabUnreadCounterElement(n, e)
                    },
                    onFail: function() {
                        n.markingRead = !1
                    }
                })
            },
            getMessageText: function(e, t) {
                var n = e || "";
                return n = Object(a.replaceHyperLinks)(n, a.linksReplacer.bind(null, !1)), n = Object(a.replaceMentions)(n), n = Object(a.replaceEmailLinks)(n), n = Object(a.replaceHashtags)(n, function(e) {
                    return '<a href="/im?sel=' + t + "&st=" + encodeURIComponent(e) + '">' + e + "</a>"
                }), n = Emoji.emojiToHTML(n, 1)
            },
            getEditCont: function(e) {
                return stManager.add([jsc("web/emoji.js")]), '<div class="emoji_cont _emoji_field_wrap">' + Emoji.tplSmile(getLang("mail_emoji_hint")) + '<div class="fc_editable dark" tabindex="0" contenteditable="true" placeholder="' + getLang("mail_chat_placeholder") + '"></div></div>'
            },
            getInputValue: function(e) {
                return Emoji ? Emoji.editableVal(e) : ""
            },
            onTxtResize: function(e) {
                var t = curFastChat.tabs[e],
                    n = geByClass1("fc_tab_txt", t.wrap),
                    r = getSize(n)[1];
                if (r > 40) {
                    var i = positive(r - 40);
                    (a = intval(getSize(t.box.resizeableH)[1])) + t.hDiff - i < 40 && (i = a + t.hDiff - 40), setStyle(t.box.resizeableH, {
                        height: a + (t.hDiff || 0) - i
                    }), t.hDiff = i, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                } else if (t.hDiff) {
                    var a = intval(getSize(t.box.resizeableH)[1]);
                    setStyle(t.box.resizeableH, {
                        height: a + t.hDiff
                    }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                }
            },
            initTab: function(e, t, n) {
                var r = geByClass1("fc_editable", n),
                    a = curFastChat.tabs[e] = {
                        name: t.name,
                        fname: t.fname,
                        photo: t.photo,
                        link: t.alink || "/id" + e,
                        hash: t.hash,
                        sendhash: FastChat.decodehash(t.hash),
                        sex: t.sex || 0,
                        data: t.data || {},
                        online: t.online,
                        msgs: {},
                        msgscount: 0,
                        unread: 0,
                        box: !1,
                        wrap: n,
                        editable: 1,
                        txt: r,
                        txtWrap: r.parentNode.parentNode,
                        logWrap: geByClass1("fc_tab_log", n),
                        log: geByClass1("fc_tab_log_msgs", n),
                        notify: geByClass1("fc_tab_notify_wrap", n),
                        title: geByClass1("fc_tab_title", n)
                    },
                    o = 30;
                if (a.addMediaBtn = geByClass1("fc_tab_attach", n), a.editable) cur.t = a, a.emojiId = Emoji.init(a.txt, {
                    controlsCont: geByClass1("fc_tab_txt_wrap", n),
                    ttDiff: -46,
                    ttShift: 0,
                    rPointer: !0,
                    global: !0,
                    noRce: !0,
                    peer: e,
                    isChat: !0,
                    noCtrlSend: !0,
                    ref: "fast_chat",
                    onSend: FastChat.send.pbind(e),
                    checkEditable: FastChat.checkEditable,
                    onResize: function() {
                        FastChat.onTxtResize(e)
                    },
                    addMediaBtn: a.addMediaBtn,
                    onShow: function() {
                        cssAnim(a.scroll.scrollbar, {
                            opacity: 0
                        }, {
                            duration: 400
                        })
                    },
                    onHide: function() {
                        cssAnim(a.scroll.scrollbar, {
                            opacity: 1
                        }, {
                            duration: 400
                        })
                    },
                    onEsc: function(e) {
                        return a.box.hide(), cancelEvent(e)
                    },
                    onStickerSend: function(t, n) {
                        FastChat.send(e, t, n)
                    }
                });
                else {
                    autosizeSetup(a.txt, {
                        minHeight: 15,
                        maxHeight: 42
                    }), a.txt.autosize.options.onResize = function(e) {
                        if (!a.box.minimized) {
                            var t = 42 == e ? 42 : 15;
                            t != e && setStyle(a.txt, "height", t), t != o && (setStyle(a.logWrap, "height", a.logWrap.clientHeight - t + o), o = t, a.scroll && a.scroll.update(!1, !0))
                        }
                    }
                }
                return a.imPeerMedias = {}, a.imSortedMedias = {}, a.previewEl = geByClass1("fc_tab_preview", n), stManager.add(["page.js", "page.css", jsc("web/ui_media_selector.js"), "ui_media_selector.css"], function() {
                    a.imMedia = new MediaSelector(a.addMediaBtn, a.previewEl, [
                        ["photo", getLang("profile_wall_photo")],
                        ["video", getLang("profile_wall_video")],
                        ["audio", getLang("profile_wall_audio")],
                        ["doc", getLang("profile_wall_doc")],
                        ["map", getLang("profile_wall_map")]
                    ], {
                        limit: 10,
                        hideAfterCount: 0,
                        maxShown: 0,
                        mail: 1,
                        tooltip: 1,
                        topOffset: 0,
                        forceUp: 1,
                        global: 1,
                        toId: vk.id
                    }), a.imMedia.onChange = setTimeout.pbind(function() {
                        if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                        else {
                            var t = Object(i.loadDraftForPeer)(curFastChat.ldb, e);
                            t.removeAllAttaches(), a.imMedia.getMedias().forEach(function(e) {
                                return t.addAttach(e[0], e[1])
                            }), t.destroy()
                        }
                        FastChat.onTxtResize(e)
                    }, 0)
                }), a
            },
            addBox: function(e, t, n) {
                if (void 0 === curFastChat.tabs[e]) {
                    var r = FastChat.getEditCont(Emoji.last);
                    n = n || {}, curFastChat.tabs[e] = {};
                    var i = se(rs(FastChat.tplBox, {
                        id: e,
                        name: t.name,
                        myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                        cont: r
                    }));
                    n.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                        noState: !0
                    });
                    var a = FastChat.initTab(e, t, i),
                        o = getWndInner(),
                        s = {
                            id: "fc_peer" + e,
                            marginFixedToLayer: !0,
                            peer: e,
                            movable: geByClass1("fc_tab_head", i),
                            closer: geByClass1("fc_tab_close_wrap", i, "a"),
                            resizeableH: a.logWrap,
                            startHeight: 250,
                            startWidth: 270,
                            fixed: n.fixed,
                            minH: 150,
                            minW: 270,
                            nofocus: !0,
                            onFocus: function(t) {
                                a.auto && (FastChat.stateChange({
                                    op: "added",
                                    peer: e
                                }), delete a.auto), FastChat.restoreDraft(e), a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt), a.wrap.clientWidth && setStyle(a.title, {
                                    maxWidth: a.wrap.clientWidth - 71
                                }), a.editable || setStyle(a.txt.autosize.helper, {
                                    width: getStyle(a.txt, "width", !1)
                                }), a.scroll && a.scroll.update(!1, !0), setTimeout(elfocus.pbind(a.txt), 10)
                            },
                            onHide: function() {
                                n.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                            },
                            onClose: function(t) {
                                AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), n && n.beforeClose && n.beforeClose();
                                var r = curFastChat.tabs,
                                    i = r[e].posSeq;
                                if (delete r[e], curNotifier.isIdle || FastChat.stateChange({
                                        op: "hidden",
                                        peer: e
                                    }), i) {
                                    var a, o, s, c, u, d = {},
                                        l = [];
                                    for (each(r, function() {
                                            this.posSeq > i && (d[this.posSeq] = this, l.push(this.posSeq))
                                        }), l.unshift(i), l.sort(), u = !browser.msie && l.length < 10, a = 1; a < l.length; a++) o = l[a], s = d[o].box, c = a > 1 ? d[l[a - 1]].box.pos : t, u ? animate(s.wrap, {
                                        left: c[1]
                                    }, 100, function(e) {
                                        e._update_pos()
                                    }.pbind(s)) : setStyle(s.wrap, {
                                        left: c[1]
                                    });
                                    if (!u)
                                        for (a = 1; a < l.length; a++)(s = d[l[a]].box)._update_pos()
                                }
                            },
                            onMinimize: function(t) {
                                FastChat.stateChange({
                                    op: "minimized",
                                    peer: e,
                                    val: t
                                }), FastChat.fixResized(a, a.wrap.clientWidth, !0), t || (a.txt.blur(), FastChat.restoreDraft(e))
                            },
                            onResizeEnd: function(t, n) {
                                var r = getWndInner(),
                                    i = a.box.pos;
                                a.scroll && a.scroll.show(), FastChat.fixResized(a, n, !0), FastChat.stateChange({
                                    op: "resized",
                                    peer: e,
                                    h: t / r[0],
                                    w: n / r[1],
                                    y: a.box.toBottom ? -1 : i[0] / r[0],
                                    x: a.box.toRight ? -1 : i[1] / r[1]
                                })
                            },
                            onResize: function(e, t) {
                                FastChat.fixResized(a, t);
                                var n = geByClass1("fc_tab_title", a.box.content);
                                setStyle(n, {
                                    width: t - 78
                                })
                            },
                            onResizeStart: function() {
                                delete a.posSeq, a.scroll && a.scroll.hide(), val(a.notify, ""), clearTimeout(a.hideNotifyTO)
                            },
                            onDragEnd: function(t, n) {
                                delete a.posSeq, FastChat.stateChange({
                                    op: "moved",
                                    peer: e,
                                    y: t,
                                    x: n
                                })
                            }
                        };
                    if (n && extend(s, n), void 0 === s.startLeft && void 0 === s.startRight) {
                        var c = [],
                            u = o[0] - 350,
                            d = curFastChat.clistBox.pos,
                            l = !1;
                        if (window.Call && (Call.box || Call.invitation)) {
                            var f = Call.calcBoxPos();
                            c.push([f.x, f.x + f.w]), l = !0
                        }
                        d[0] + d[2] > u && (curFastChat.clistBox.visible || !l) && c.push([d[1], d[1] + d[3]]), each(curFastChat.tabs, function(t) {
                            (d = this.box && this.box.pos) && t != e && d[0] + d[2] > u && c.push([d[1], d[1] + d[3]])
                        });
                        var _, h, p, m = lastWindowWidth - 262 - sbWidth(),
                            g = !1,
                            v = !1,
                            b = 0 > m ? 1 : -1;
                        for (_ = m; b * _ < 0 * b; _ += 135 * b) {
                            for (h = 0, p = 0; p < c.length; p++) _ > c[p][0] - 260 && _ < c[p][1] && h++, _ > c[p][0] - 10 && _ < c[p][0] + 10 && (h += 1.1);
                            (!1 === g || h < v) && (g = _, v = h)
                        }
                        l && v && (g = m), extend(s, {
                            startBottom: 0,
                            startLeft: g
                        })
                    }
                    var y, w = !0;
                    for (y in n || {})
                        if ("nofocus" != y) {
                            w = !1;
                            break
                        }
                    w && (a.posSeq = ++curFastChat.posSeq), s.fixed && (s.startHeight = curFastChat.clistH, s.startWidth = curFastChat.clistW, s.onShow = FastChat.showChatCtrl), a.box = new RBox(i, s), a.iman = new IdleManager({
                        id: "tab" + e,
                        element: a.box.content,
                        onUnIdleCb: function() {
                            FastChat.readLastMessages(e)
                        },
                        parentManager: curNotifier.idle_manager,
                        idleTimeout: 1e4
                    }), curFastChat.tabs[e].iman.start(), s.fixed && FastChat.setActive(a.box), a.scroll = new Scrollbar(a.logWrap, {
                        prefix: "fc_",
                        nomargin: !0,
                        nokeys: !0,
                        global: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto",
                        onScroll: FastChat.onScroll.pbind(a)
                    }), s.minimized || !n || void 0 === n.startLeft && void 0 === n.startTop && void 0 === n.startWidth && void 0 === n.startHeight || a.box._wnd_resize(o[0], o[1], !0), a.wrap.clientWidth && setStyle(a.title, {
                        maxWidth: a.wrap.clientWidth - 71
                    }), addEvent(a.txt, "keydown", this.onInputKeydown.bind(this, a)), addEvent(a.txt, "keyup", this.onInputKeyUp.bind(this, a, e)), addEvent(a.txt, "focus", this.onInputFocus.bind(this, e)), FastChat.restoreDraft(e), s.onPeerAdded && s.onPeerAdded()
                }
            },
            onInputFocus: function(e) {
                curFastChat.peer = e
            },
            onInputKeydown: function(e, t) {
                if (t.ctrlKey && t.keyCode === KEY.RETURN) {
                    var n = t.target,
                        r = n.value;
                    if ("number" == typeof n.selectionStart && "number" == typeof n.selectionEnd) {
                        var i = n.selectionStart;
                        n.value = r.slice(0, i) + "\n" + r.slice(n.selectionEnd), n.selectionStart = n.selectionEnd = i + 1
                    } else if (document.selection && document.selection.createRange) {
                        n.focus(t);
                        var a = document.selection.createRange();
                        a.text = "\r\n", a.collapse(!1), browser.opera && (a.moveEnd("character", 0), a.moveStart("character", 0)), a.select()
                    }
                    e.editable ? this.checkEditable(e.emojiId, e.txt) : (e.txt.autosize.update(), setTimeout(function() {
                        return e.txt.autosize.update()
                    }, 0))
                }
            },
            onInputKeyUp: function(e, t) {
                var n = e.lastValue || "",
                    r = this.getInputValue(e.txt);
                r.length === n.length && r === n || (r && this.sendTyping(t), e.lastValue = r), clearTimeout(e.saveDraftTO), e.saveDraftTO = setTimeout(this.saveDraft.pbind(t), r.length ? 300 : 0), this.checkEditable(e.emojiId, e.txt)
            },
            onScroll: function(e) {
                var t = e.scroll.obj.scrollTop,
                    n = geByClass1("_fc_msgs_more", e.logWrap);
                t < 200 && isVisible(n) && n.click()
            },
            loadMore: function(e, t) {
                var n = curFastChat.tabs[e],
                    r = n.offset;
                if (n.moreLoading) return !1;
                n.moreLoading = !0, ajax.post("al_im.php", {
                    act: "a_history",
                    peer: e,
                    offset: r,
                    from: "fc"
                }, {
                    onDone: function(e) {
                        e[3] || hide(t);
                        var r = t.parentNode,
                            i = r.clientHeight;
                        r.insertBefore(cf(e[0]), t.nextSibling);
                        var a = r.clientHeight - i;
                        a && (n.logWrap.scrollTop += a), n.scroll.update(), n.offset = e[2], n.moreLoading = !1, FastChat.onScroll(n)
                    },
                    onFail: function() {
                        n.moreLoading = !1
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            },
            sendOnResponse: function(e, t, n) {
                if (e.version && intval(e.version) > curFastChat.version) FastChat.updateVersion(e.version);
                else {
                    var r = ge("fc_msg" + t),
                        i = e.msg_id,
                        a = indexOf(t, n.newmsgs);
                    if (r) {
                        if (e.media) {
                            var o = {
                                sticker: intval(e.sticker)
                            };
                            FastChat.lcSend("gotMedia", {
                                msgId: t,
                                peer: n.box.options.peer,
                                text: e.media,
                                msgOpts: o
                            }), FastChat.gotMsgMedia(n.box.options.peer, t, e.media, o)
                        }++n.msgscount, -1 != a && n.newmsgs.splice(a, 1), r.id = "fc_msg" + i, n.msgs[i] = [1, 1]
                    }
                }
            },
            checkEditable: function(e, t) {
                Emoji.checkEditable(e, t, {
                    height: 52
                })
            },
            fixResized: function(e, t, n) {
                e && (e.logWrap.scrollTop = e.logWrap.scrollHeight, t > 0 && setStyle(e.title, {
                    maxWidth: t - 71
                }), n && (e.editable || setStyle(e.txt.autosize.helper, {
                    width: getStyle(e.txt, "width", !1)
                }), e.scroll && e.scroll.update(!1, !0)))
            },
            activateTab: function(e) {
                var t = curFastChat.tabs[e].box;
                curFastChat.activeBox && curFastChat.activeBox != t && curFastChat.activeBox.hide(0, !1, {
                    noState: !0
                }), t.show(), t.options.fixed && FastChat.setActive(t)
            },
            blinkTab: function(e) {
                var t = this.getTab(e);
                if (!t.blinking && curFastChat.peer != e) {
                    t.blinking = !0, clearTimeout(t.blinkingTO);
                    var n = t.box.wrap,
                        r = n.className,
                        i = Math.min(1e4, intval(getStyle(n, "zIndex")));
                    setStyle(n, {
                        zIndex: 1e4
                    }), removeClass(n, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                        delete t.blinking, delete t.blinkingTO, 1e4 == getStyle(n, "zIndex") && (setStyle(n, {
                            zIndex: i
                        }), n.className = r)
                    }, 2e3)
                }
            },
            createProgress: function(e, t, n) {
                var r = ce("span", {
                    innerHTML: rs(vk.pr_tpl, {
                        id: "",
                        cls: ""
                    }),
                    className: "fc_msg_progress",
                    id: "fc_msg_progress" + t
                });
                return e.insertBefore(r, n), r
            },
            removeProgress: function(e) {
                re("fc_msg_progress" + e)
            },
            send: function(e, t, n) {
                var r = curFastChat.tabs[e],
                    i = trim(r.editable ? Emoji.editableVal(r.txt) : val(r.txt)),
                    a = "";
                t ? (a = [
                    ["sticker", t]
                ], i = "") : a = r.imMedia ? r.imMedia.getMedias() : [];
                var o = ge("fc_tab_typing" + e),
                    c = geByClass1("page_progress_preview", r.wrap);
                if (c && c.childNodes.length > 0) {
                    curFastChat.sendOnUpload = e;
                    var u = geByClass("fc_tab_log", r.wrap)[0];
                    return FastChat.createProgress(u, e, u.lastChild), void(o.style.visibility = "hidden")
                }
                if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), o.style.visibility = "visible", i || a.length) {
                    var d = Object(s.random)(),
                        l = {
                            act: "a_send",
                            to: e,
                            hash: r.sendhash,
                            msg: i,
                            from: "fc",
                            entrypoint: curFastChat.tabs[e].entrypoint,
                            media: [],
                            random_id: d
                        };
                    n && (l.sticker_referrer = n);
                    for (var f, _ = 0, h = a.length; _ < h; ++_)(f = a[_]) && l.media.push(f[0] + ":" + f[1]);
                    l.media = l.media.join(","), r.sending = !0, Emoji.ttHide(r.emojiId), curFastChat.tabs[e].entrypoint = !1, ajax.post("al_im.php", l, {
                        onDone: function(t) {
                            clearTimeout(r.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, d, r)
                        },
                        onFail: function(t) {
                            FastChat.error(e, t || getLang("global_unknown_error")), elfocus(r.txt), val(r.txt, i), r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : r.txt.autosize.update();
                            var n = ge("fc_msg" + d);
                            if (n) return n.appendChild(ce("span", {
                                className: "fc_msg_error",
                                innerHTML: getLang("global_error")
                            })), FastChat.scroll(e), !0
                        },
                        showProgress: function() {
                            r.sending = !0, r.sendProgressTO = setTimeout(function() {
                                var e = ge("fc_msg" + d);
                                e && FastChat.createProgress(e, d, e.firstChild)
                            }, 2e3)
                        },
                        hideProgress: function() {
                            r.sending = !1, clearTimeout(r.sendProgressTO), FastChat.removeProgress(d)
                        }
                    }), re("fc_error" + e), t || (val(r.txt, ""), r.imMedia && r.imMedia.unchooseMedia()), FastChat.addMessage(FastChat.prepareMessageData({
                        messageId: d,
                        text: clean(i).replace(/\n/g, "<br>"),
                        peerId: e,
                        flags: 3,
                        randomId: l.random_id,
                        attaches: []
                    })), delete curFastChat.myTypingEvents[e], r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : r.txt.autosize.update(!1, !0), elfocus(r.txt), FastChat.scroll(e)
                } else r.editable ? Emoji.editableFocus(r.txt, !1, !0) : elfocus(r.txt)
            },
            saveDraft: function(e) {
                var t = curFastChat.tabs[e],
                    n = (t || {}).txt;
                if (n && t) {
                    var r = Emoji.editableVal(n),
                        a = Object(i.loadDraftForPeer)(curFastChat.ldb, e);
                    a.setText(trim(r) || ""), a.destroy()
                }
            },
            restoreDraft: function(e) {
                var t = curFastChat.tabs[e],
                    n = t.txt,
                    r = Object(i.loadDraftForPeer)(curFastChat.ldb, e);
                return !(!n || !t || val(n).length > r.dData.txt.length && !r.hasAttaches()) && (t.editable ? n.innerHTML = Emoji.emojiToHTML(clean(r.dData.txt), 1) : val(n, clean(r.dData.txt)), setTimeout(function() {
                    for (var e = r.dData.attaches, n = 0; n < e.length; n++) t.imMedia && t.imMedia.chooseMedia(e[n].type, e[n].id, e[n].object || {});
                    r.destroy()
                }, 40), FastChat.checkEditable(t.emojiId, n), setTimeout(function() {
                    n.scrollTop = n.scrollHeight
                }, 10), !0)
            },
            error: function(e, t) {
                e = e || curFastChat.peer;
                var n = curFastChat.tabs[e];
                re("fc_error" + e), n.log.appendChild(ce("div", {
                    id: "fc_error" + e,
                    className: "fc_msgs_error",
                    innerHTML: t || getLang("global_error")
                })), FastChat.scroll(e)
            },
            scroll: function(e) {
                e = e || curFastChat.peer;
                var t = curFastChat.tabs[e];
                t && (t.logWrap.scrollTop = t.logWrap.scrollHeight, t.scroll && t.scroll.update(!1, !0))
            },
            mkdate: function(e) {
                var t = new Date(1e3 * e),
                    n = new Date,
                    r = function(e) {
                        return (e + "").length < 2 ? "0" + e : e
                    };
                if (t.getDay() == n.getDay()) return r(t.getHours()) + ":" + r(t.getMinutes());
                var i = r(t.getDate()) + "." + r(t.getMonth() + 1);
                return t.getFullYear() != n.getFullYear() && (i += "." + (t.getFullYear() + "").substr(2)), i
            },
            prepareMessageData: function(e) {
                var t = e.peerId,
                    n = e.flags,
                    r = e.messageId,
                    i = e.text,
                    a = e.date,
                    o = Object(d.getUserId)(e),
                    s = this.getMessageMedia(e),
                    c = _(s, 2),
                    u = c[0],
                    l = c[1],
                    f = "",
                    h = e.randomId;
                return Object(d.isServiceMsg)(e) && (f = this.renderServiceMessage(e)), -1 !== String(r).indexOf("rid") && (h = Number(r.slice(3))), Object.assign({
                    id: r,
                    peer: t,
                    from_id: o,
                    text: Object(d.isServiceMsg)(e) ? f : this.getMessageText(i, t) + u,
                    out: Object(d.isOut)(e),
                    unread: Boolean(1 & n),
                    date: a,
                    date_str: FastChat.mkdate(a),
                    randomId: h,
                    isServiceMessage: Object(d.isServiceMsg)(e)
                }, this.getMessageAuthor(e), l)
            },
            getMessageAuthor: function(e) {
                var t = e.peerId,
                    n = Object(d.getUserId)(e),
                    r = this.getTab(e.peerId);
                if (!r || !n) return {};
                var i = Object(d.isOut)(e) ? curFastChat.me : Object(l.isChatPeer)(t) ? r.data.members[n] : r,
                    a = i.name,
                    o = i.link,
                    s = i.photo,
                    c = i.fname,
                    u = i.first_name;
                return {
                    fname: Object(l.isChatPeer)(t) ? c || u : "",
                    name: a,
                    link: o,
                    photo: s,
                    from_id: n
                }
            },
            getMessageMedia: function(e) {
                var t = this,
                    n = e.peerId,
                    r = e.messageId,
                    i = "",
                    a = {};
                return !Object(d.isServiceMsg)(e) && Array.isArray(e.attaches) && (e.attaches.forEach(function(e) {
                    switch (e.type) {
                        case "sticker":
                            i += r ? t.renderSticker(e.id, e.productId, e.kind, r) : t.renderSticker(e.id, e.productId), a.sticker = !0;
                            break;
                        case "mail":
                            var o = e.object ? e.object.fwd_count : e.id.split(";").length;
                            i += rs(curFastChat.tpl.msg_fwd, {
                                msg_id: r,
                                peerId_nice: Object(l.convertPeerToUrl)(n),
                                label: getLang(o > 1 ? "mail_im_fwd_msgs" : "mail_im_fwd_msg")
                            });
                            break;
                        default:
                            i += rs(vk.pr_tpl, {
                                id: "",
                                cls: ""
                            }), r > 0 && setTimeout(FastChat.needMsgMedia.pbind(n, r), 5)
                    }
                }), i && (i = '<div class="fc_msg_attachments" id="fc_msg_attachments' + r + '">' + i + "</div>")), [i, a]
            },
            renderSticker: function(e, t, n, r) {
                var i = window.devicePixelRatio >= 2 ? "256" : "128",
                    a = void 0;
                return "animation" === n ? (a = rs(curFastChat.tpl.animatedSticker, {
                    id: e,
                    size: i,
                    productId: t,
                    messageId: r
                }), Number.isInteger(r) && this.loadStickersModuleIfNeed().then(function() {
                    window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer("animatedSticker" + r, 10)
                })) : a = rs(curFastChat.tpl.sticker, {
                    id: e,
                    size: i
                }), a
            },
            loadStickersModuleIfNeed: function() {
                return new Promise(function(e) {
                    var t = Boolean(window.StickersSettings && window.StickersAnimation);
                    curFastChat.stickersLoading || t ? e() : (curFastChat.stickersLoading = !0, stManager.add([jsc("web/stickers.js")], function() {
                        curFastChat.stickersLoading = !1, e()
                    }))
                })
            },
            renderServiceMessage: function(e) {
                var t = e.kludges,
                    n = e.peerId,
                    r = e.userId,
                    i = t.source_act,
                    a = Number(t.source_mid),
                    o = this.getMember(n, r),
                    s = "",
                    c = r === a;
                switch (i) {
                    case l.CREATE_CHAT_ACTION:
                        s = "mail_im_chat_created";
                        break;
                    case l.CHAT_TITLE_ACTION:
                        s = t.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                        break;
                    case l.CHAT_INVITE_USER:
                        s = c ? "mail_im_returned_to_chat" : "mail_im_invited";
                        break;
                    case l.CHAT_KICK_USER:
                        s = c ? "mail_im_left" : "mail_im_kicked_from_chat";
                        break;
                    case l.CHAT_PHOTO_UPDATE:
                        s = "mail_im_photo_set";
                        break;
                    case l.CHAT_PHOTO_REMOVE:
                        s = t.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                        break;
                    case l.CHAT_PIN_MESSAGE:
                        s = t.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                        break;
                    case l.CHAT_UNPIN_MESSAGE:
                        s = t.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                        break;
                    case l.CHAT_INVITE_BY_LINK:
                        s = "mail_im_invite_by_link";
                        break;
                    default:
                        return "mail_no_support"
                }
                if (s = (s = langSex(o.sex, getLang(s, "raw"))).replace("{from}", Object(l.serviceLink)(o.link, o.name, !0)), a && a !== r) {
                    var u = t.source_email;
                    if (u) s = s.replace("{user}", Object(l.serviceLink)("/im?email=" + encodeURIComponent(u), "email", !0));
                    else {
                        var d = this.getMember(n, a) || {
                                name_inv_case: "",
                                name_kick_case: "",
                                link: ""
                            },
                            f = i === l.CHAT_KICK_USER ? d.name_kick_case : d.name_inv_case;
                        s = s.replace("{user}", Object(l.serviceLink)(d.link, f, !0))
                    }
                }
                if (t.source_text) {
                    var _ = t.source_old_text ? '«<b class="im_srv_lnk">' + t.source_old_text + "</b>» &rarr; " : "";
                    s = s.replace("{title}", _ + '«<b class="im_srv_lnk">' + t.source_text + "</b>»")
                }
                if (t.source_act === l.CHAT_PIN_MESSAGE || t.source_act === l.CHAT_UNPIN_MESSAGE)
                    if (t.source_message) {
                        var h = Object(l.replaceSpecialSymbols)(Emoji.emojiToHTML(stripHTML(t.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                            p = Object(l.serviceLink)("", h, !1, "im_srv_mess_link");
                        s = s.replace("{msg}", p)
                    } else s = s.replace(/{link}(.+){\/link}/i, function(e, t) {
                        return Object(l.serviceLink)("", t, !1, "im_srv_mess_link")
                    });
                return s
            },
            getMember: function(e, t) {
                var n = this.getTab(e);
                return Object(l.isChatPeer)(e) && n ? n.data.members[t] : n || null
            },
            needMsgMedia: function(e, t) {
                t <= 0 || (FastChat.lcSend("needMedia", {
                    msgId: t
                }), curFastChat.needMedia[t] = [e, setTimeout(FastChat.loadMsgMedia.pbind(e, t), curNotifier.is_server ? 0 : irand(150, 250))])
            },
            loadMsgMedia: function(e, t) {
                t <= 0 || void 0 !== curFastChat.gotMedia[t] && 0 !== curFastChat.gotMedia[t] || (FastChat.lcSend("fetchingMedia", {
                    msgId: t
                }), curFastChat.gotMedia[t] = 0, ajax.post("al_im.php", {
                    act: "a_get_media",
                    id: t,
                    from: "fc"
                }, {
                    onDone: function(n, r, i) {
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: e,
                            text: n[1],
                            msgOpts: i
                        }), FastChat.gotMsgMedia(e, t, n[1], i)
                    }
                }))
            },
            gotMsgMedia: function(e, t, n, r) {
                if (val("fc_msg_attachments" + t, n), r && r.sticker) {
                    var i = ge("fc_msg" + t),
                        a = i && i.parentNode;
                    i && addClass(a.parentNode, "fc_msg_sticker"), window.StickersAnimation && window.StickersAnimation.checkSettingsAndLoadInWeb(t, !1, !1, !0)
                }
                FastChat.scroll(e), curFastChat.gotMedia[t] = [e, n, r], r.stickers && window.Emoji && Emoji.updateTabs(r.stickers, r.keywords), void 0 !== curFastChat.needMedia[t] && (clearTimeout(curFastChat.needMedia[t][1]), delete curFastChat.needMedia[t])
            },
            replaceSpecialSymbols: function(e) {
                return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(/(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, "$1$4")
            },
            addMessage: function(e) {
                var t = e.peer,
                    n = this.getTab(t),
                    r = n.log,
                    i = void 0;
                if (!n || e.out || !n.box.visible || n.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), e.randomId && re(document.querySelector('[data-random-id="' + e.randomId + '"]')), n.msgs[e.id] = [e.out, e.unread], this.isNewStack(e)) {
                    re("fc_log_empty" + t);
                    var a = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                    e.sticker && (a += " fc_msg_sticker"), e.isServiceMessage && (a += " fc_srv_msg");
                    var o = e.isServiceMessage ? curFastChat.tpl.msgs_service : e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                    i = se(rs(o, {
                        from_id: e.from_id,
                        link: e.link,
                        photo: Notifier.fixPhoto(e.photo),
                        name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                        classname: a,
                        date: e.date,
                        date_str: e.date_str,
                        msgs: "",
                        randomId: e.randomId || 0,
                        messageId: e.id
                    })), r.appendChild(i)
                } else e.unread || removeClass(i, "fc_msgs_unread");
                var s = geByClass1("fc_msgs_list", i, "div"),
                    c = geByClass1("fc_msgs_date", s),
                    u = geByClass1("fc_msg_last", s);
                u && removeClass(u, "fc_msg_last");
                var d = se(rs(curFastChat.tpl.msg, {
                    msg_id: e.id,
                    classname: (e.unread ? "fc_msg_unread" : "") + (e.isServiceMessage ? " fc_srv_msg" : "") + " fc_msg_last",
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                domFC(s) && "BR" == domFC(s).tagName && re(domFC(s)), c ? s.insertBefore(d, c) : s.appendChild(d), vk.id != e.from_id && (delete curFastChat.typingEvents[t], FastChat.updateTyping(t, 1)), n.scroll && n.scroll.update()
            },
            getTab: function(e) {
                return curFastChat.tabs[e]
            },
            isTabLoaded: function(e) {
                return !!this.getTab(e)
            },
            isNewStack: function(e) {
                var t = this.getTab(e.peer).log.lastChild;
                return t && "fc_msgs_error" == t.className && (t = t.previousSibling), !t || (!hasClass(t, "fc_msgs_wrap") || (!hasClass(t, "fc_msgs_unread") && !0 === e.unread || (t.getAttribute("data-from") !== e.from_id || (e.date - intval(t.getAttribute("data-date")) >= 300 || !(!e.sticker && !hasClass(t, "fc_msg_sticker"))))))
            },
            editMessage: function(e) {
                var t = e.id,
                    n = ge("fc_msg" + t);
                if (n) {
                    var r = se(rs(curFastChat.tpl.msg, {
                        msg_id: t,
                        classname: n.getAttribute("class"),
                        text: FastChat.replaceSpecialSymbols(e.text)
                    }));
                    n.parentNode.replaceChild(r, n)
                }
            },
            deleteMessage: function(e) {
                var t = e.id,
                    n = ge("fc_msg" + t);
                if (n) {
                    var r = !domNS(n) && !domPS(n),
                        i = domClosest("fc_tab_log_msgs", n);
                    for (re(r ? domClosest("fc_msgs_wrap", n) : n); hasClass(domLC(i), "fc_msgs_date");) re(domLC(i))
                }
            },
            updateTabUnreadCounter: function(e, t) {
                if (!e) {
                    var n = document.querySelector("#chat_tab_icon_" + t.peerId),
                        r = n && n.querySelector(".chat_tab_counter");
                    e = {
                        unread: r && Math.max(+r.innerHTML, 0) || 0
                    }
                }
                Object(d.isOut)(t) ? e.unread = 0 : e.unread++, this.updateTabUnreadCounterElement(e, t.peerId)
            },
            updateTabUnreadCounterElement: function(e, t) {
                if (e) {
                    var n = document.querySelector("#chat_tab_icon_" + t),
                        r = n && n.querySelector(".chat_tab_counter");
                    r && (r.innerHTML = e.unread > 0 ? e.unread : ""), e.title && e.name && (val(e.title, e.name + (e.unread ? ' <span class="fc_tab_count">(' + e.unread + ")</span>" : "")), val("fc_contact_unread" + t, e.unread ? " <b>+" + e.unread + "</b>" : ""))
                }
            },
            showMsgFwd: function(e) {
                return !showBox("al_im.php", {
                    act: "a_show_forward_box",
                    id: vk.id + "_" + e,
                    from: "mail"
                }, {
                    stat: ["im.css"],
                    dark: 1,
                    params: {
                        onHide: function() {
                            AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(!0)
                        }
                    }
                })
            },
            closeTab: function(e) {
                curFastChat.tabs[e].box.close()
            },
            updateQueueKeys: function() {
                location.reload(!0)
            },
            toggleFastChats: function(e) {
                var t = this,
                    n = !e;
                toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", n), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", n), each(geByClass("rb_box_wrap"), function() {
                    return toggleClass(t, "fast_chats_toggle_hide", n)
                })
            },
            tplBox: '<div class="fc_tab_wrap"><div class="fc_tab_head clear_fix"><a class="fc_tab_close_wrap"><div class="chats_sp fc_tab_close"></div></a><a class="fc_tab_max_wrap" href="/im?sel=%id%" onmousedown="event.cancelBubble = true;" onclick="return nav.go(this, event);"><div class="chats_sp fc_tab_max"></div></a><a class="fc_tab_pin_wrap" onmousedown="event.cancelBubble = true;" onclick="return FastChat.pinTab(%id%, event);"><div class="chats_sp fc_tab_pin"></div></a><div class="fc_tab_title noselect">%name%</div></div><div class="fc_tab"><div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><a class="fc_tab_attach"></a><div class="fc_tab_txt">%cont%<div class="fc_tab_preview"></div></div></div></div><div class="fc_pointer_offset"><div class="fc_tab_pointer fc_tab_pointer_peer"></div></div></div>',
            tplTab: '<div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><div class="fc_tab_txt">%cont%</div></div>'
        }
    },
    129: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "addDelegateEvent", function() {
            return o
        }), n.d(t, "removeDelegateEvent", function() {
            return s
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = new window.Map;

        function a(e) {
            var t = i.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var a = void 0, o = 0; o < n.length; o++) {
                        var s = r(n[o], 2),
                            c = s[0],
                            u = s[1],
                            d = void 0;
                        if (hasClass(e.target, c) ? d = u(e, e.target) : (a = gpeByClass(c, e.target, e.currentTarget)) && (d = u(e, a)), !1 === d) break
                    }
            }
        }

        function o(e, t, n, r) {
            var o = i.get(e);
            o || (i.set(e, {}), o = i.get(e));
            for (var s = t.split(" "), c = 0; c < s.length; c++) {
                var u = s[c];
                o[u] || (o[u] = [], addEvent(e, u, a)), o[u].push([n, r])
            }
        }

        function s(e, t, n, r) {
            var o = i.get(e);
            o && (t.split(" ").forEach(function(t) {
                o[t] && (o[t] = o[t].filter(function(e) {
                    return e[0] !== n || e[1] !== r
                }), 0 === o[t].length && removeEvent(e, t, a))
            }), 0 === Object.keys(o).map(function(e) {
                return o[e].length
            }).reduce(function(e, t) {
                return e + t
            }) && i.delete(e))
        }
    },
    136: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "DELETE", function() {
            return a
        }), n.d(t, "SET_FLAGS", function() {
            return o
        }), n.d(t, "REPLACE_FLAGS", function() {
            return s
        }), n.d(t, "RESET_FLAGS", function() {
            return c
        }), n.d(t, "ADD_MESSAGE", function() {
            return u
        }), n.d(t, "READ_INBOUND", function() {
            return d
        }), n.d(t, "READ_OUTBOUND", function() {
            return l
        }), n.d(t, "GOT_ONLINE", function() {
            return f
        }), n.d(t, "GOT_OFFLINE", function() {
            return _
        }), n.d(t, "CHAT_CHANGED", function() {
            return h
        }), n.d(t, "CONVERSATION_UPDATED", function() {
            return p
        }), n.d(t, "TYPING", function() {
            return m
        }), n.d(t, "RECORDING_AUDIO", function() {
            return g
        }), n.d(t, "VIDEO_CALL", function() {
            return v
        }), n.d(t, "UNREAD_COUNT", function() {
            return b
        }), n.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
            return y
        }), n.d(t, "EMPTY", function() {
            return w
        }), n.d(t, "RESET_DIRECTORIES", function() {
            return C
        }), n.d(t, "REPLACE_DIRECTORIES", function() {
            return k
        }), n.d(t, "SET_DIRECTORIES", function() {
            return T
        }), n.d(t, "RESYNC", function() {
            return E
        }), n.d(t, "REFRESH_LP_KEY", function() {
            return O
        }), n.d(t, "TRANSITION", function() {
            return N
        }), n.d(t, "RESET_PEER", function() {
            return S
        }), n.d(t, "MUTEX", function() {
            return j
        }), n.d(t, "CHANGE_PEER", function() {
            return I
        }), n.d(t, "CHANGE_TAB", function() {
            return x
        }), n.d(t, "FAILED_MESSAGE", function() {
            return F
        }), n.d(t, "RESEND", function() {
            return A
        }), n.d(t, "DELETE_DIALOG", function() {
            return M
        }), n.d(t, "EDIT_MESSAGE", function() {
            return P
        }), n.d(t, "REPLACE_MESSAGE", function() {
            return L
        }), n.d(t, "AUDIO_START", function() {
            return D
        }), n.d(t, "FLAG_UNREAD", function() {
            return R
        }), n.d(t, "FLAG_OUTBOUND", function() {
            return B
        }), n.d(t, "FLAG_IMPORTANT", function() {
            return H
        }), n.d(t, "FLAG_CHAT", function() {
            return U
        }), n.d(t, "FLAG_FRIENDS", function() {
            return q
        }), n.d(t, "FLAG_SPAM", function() {
            return z
        }), n.d(t, "FLAG_DELETED", function() {
            return W
        }), n.d(t, "FLAG_MEDIA", function() {
            return G
        }), n.d(t, "FLAG_STEALTH", function() {
            return K
        }), n.d(t, "FLAG_HAS_REPLY", function() {
            return V
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return Y
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return Q
        }), n.d(t, "FOLDER_HAS_BANNER", function() {
            return X
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_TITLE_CHANGED", function() {
            return $
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_AVATAR_CHANGED", function() {
            return J
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED", function() {
            return Z
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED", function() {
            return ee
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_PINNED", function() {
            return te
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_JOINED", function() {
            return ne
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_LEFT", function() {
            return re
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_KICKED", function() {
            return ie
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED", function() {
            return ae
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED", function() {
            return oe
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED", function() {
            return se
        }), n.d(t, "deleteEvent", function() {
            return ce
        }), n.d(t, "replaceFlagsEvent", function() {
            return ue
        }), n.d(t, "setFlagsEvent", function() {
            return de
        }), n.d(t, "resetFlagsEvent", function() {
            return le
        }), n.d(t, "addMessageEvent", function() {
            return fe
        }), n.d(t, "editMessageEvent", function() {
            return _e
        }), n.d(t, "replaceMessageEvent", function() {
            return he
        }), n.d(t, "editMessageLocallyEvent", function() {
            return pe
        }), n.d(t, "readInboundEvent", function() {
            return me
        }), n.d(t, "readOutboundEvent", function() {
            return ge
        }), n.d(t, "gotOnlineEvent", function() {
            return ve
        }), n.d(t, "gotOfflineEvent", function() {
            return be
        }), n.d(t, "resetDirectoriesEvent", function() {
            return ye
        }), n.d(t, "replaceDirectoriesEvent", function() {
            return we
        }), n.d(t, "setDirectoriesEvent", function() {
            return Ce
        }), n.d(t, "deleteDialogEvent", function() {
            return ke
        }), n.d(t, "chatChangedEvent", function() {
            return Te
        }), n.d(t, "chatUpdatedEvent", function() {
            return Ee
        }), n.d(t, "typingEvent", function() {
            return Oe
        }), n.d(t, "recordingAudioEvent", function() {
            return Ne
        }), n.d(t, "videoCallEvent", function() {
            return Se
        }), n.d(t, "unreadCountEvent", function() {
            return je
        }), n.d(t, "notifySettingsChangedEvent", function() {
            return Ie
        }), n.d(t, "refreshMessageEvent", function() {
            return xe
        }), n.d(t, "audioStartEvent", function() {
            return Fe
        }), n.d(t, "emptyEvent", function() {
            return Ae
        }), n.d(t, "transitionEvent", function() {
            return Me
        }), n.d(t, "resyncEvent", function() {
            return Pe
        }), n.d(t, "refreshLpKeyEvent", function() {
            return Le
        }), n.d(t, "resetPeer", function() {
            return De
        }), n.d(t, "changePeer", function() {
            return Re
        }), n.d(t, "changeTab", function() {
            return Be
        }), n.d(t, "failedMessage", function() {
            return He
        }), n.d(t, "mutexEvent", function() {
            return Ue
        }), n.d(t, "resendEvent", function() {
            return qe
        });
        var r = n(140),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = "event_delete",
            o = "event_set_flags",
            s = "event_replace_flags",
            c = "event_reset_flags",
            u = "event_add_message",
            d = "event_read_inbound",
            l = "event_read_outbound",
            f = "event_got_online",
            _ = "event_got_offline",
            h = "event_chat_changed",
            p = "event_chat_updated",
            m = "event_typing",
            g = "event_recoding_audio",
            v = "event_video_call",
            b = "event_unread_count",
            y = "event_notify_settings_changed",
            w = "event_empty",
            C = "event_reset_directories",
            k = "event_replace_directories",
            T = "event_set_directories",
            E = "event_resync",
            O = "event_refresh_lp_key",
            N = "transition_event",
            S = "reset_peer",
            j = "mutex",
            I = "change_peer",
            x = "event_change_tab",
            F = "event_failed_message",
            A = "event_resend",
            M = "event_delete_dialog",
            P = "event_edit_message",
            L = "event_replace_message",
            D = "event_audio_start",
            R = 1,
            B = 2,
            H = 8,
            U = 16,
            q = 32,
            z = 64,
            W = 128,
            G = 512,
            K = 65536,
            V = 1 << 21,
            Y = 1,
            Q = 2,
            X = 8,
            $ = 1,
            J = 2,
            Z = 3,
            ee = 4,
            te = 5,
            ne = 6,
            re = 7,
            ie = 8,
            ae = 9,
            oe = 10,
            se = 11;

        function ce(e) {
            var t = i(e, 2)[1];
            return {
                type: a,
                localId: t
            }
        }

        function ue(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: s,
                messageId: n,
                mask: r,
                peerId: a
            }
        }

        function de(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: o,
                messageId: n,
                flags: r,
                peerId: a
            }
        }

        function le(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: c,
                messageId: n,
                flags: r,
                peerId: a
            }
        }

        function fe(e) {
            var t = i(e, 11),
                n = t[1],
                a = t[2],
                o = t[3],
                s = t[4],
                c = t[5],
                d = t[6],
                l = t[7],
                f = t[8],
                _ = t[9],
                h = t[10],
                p = extend(d, l || void 0);
            return {
                type: u,
                messageId: intval(n),
                flags: intval(a),
                peerId: intval(o),
                date: intval(s),
                attaches: Object(r.convertKludgesToAttaches)(p, n),
                subject: d.title || "",
                text: c,
                kludges: p,
                randomId: intval(f),
                userId: Object(r.isChatPeer)(o) ? intval(p.from) : intval(o),
                update_time: h,
                chat_local_id: _
            }
        }

        function _e(e) {
            var t = fe(e);
            return t.type = P, t
        }

        function he(e) {
            var t = fe(e);
            return t.type = L, t
        }

        function pe(e) {
            return extend({}, e, {
                type: P
            })
        }

        function me(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: d,
                peerId: n,
                upToId: r,
                unread: a
            }
        }

        function ge(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: l,
                peerId: n,
                upToId: r,
                unread: a
            }
        }

        function ve(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: f,
                userId: -n,
                platform: r,
                lastSeenTs: a
            }
        }

        function be(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: _,
                userId: -n,
                reason: r,
                lastSeenTs: a
            }
        }

        function ye(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: C,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function we(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: k,
                peerId: n,
                mask: r
            }
        }

        function Ce(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: T,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function ke(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: M,
                peerId: n,
                localId: r
            }
        }

        function Te(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: h,
                chatId: n,
                self: r
            }
        }

        function Ee(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: p,
                peerId: r,
                updateType: n,
                updateArg: a
            }
        }

        function Oe(e) {
            var t = i(e, 5),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4];
            return {
                type: m,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function Ne(e) {
            var t = i(e, 5),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4];
            return {
                type: g,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function Se(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: v,
                userId: n,
                callId: r
            }
        }

        function je(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: b,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: a
            }
        }

        function Ie(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: y,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function xe(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = fe([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = P, r
        }

        function Fe(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: D,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Ae(e) {
            return {
                type: w,
                params: e
            }
        }

        function Me(e) {
            return {
                type: N,
                state: e
            }
        }

        function Pe() {
            return {
                type: E
            }
        }

        function Le(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: O,
                key: n,
                url: r
            }
        }

        function De() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: S,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Re(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: I,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: i
            }
        }

        function Be(e) {
            return {
                type: x,
                tab: e
            }
        }

        function He(e, t, n) {
            return {
                type: F,
                message: t,
                peer: e,
                error: n
            }
        }

        function Ue(e) {
            var t = i(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                a = t[3],
                o = t[4],
                s = t[5];
            return {
                type: j,
                free: !!intval(n) || intval(o) === vk.id,
                resource: r,
                peerId: intval(a),
                who: intval(o),
                name: s
            }
        }

        function qe(e, t) {
            return {
                type: A,
                message: t,
                peerId: e
            }
        }
    },
    140: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseFwd", function() {
            return s
        }), n.d(t, "convertKludgesToAttaches", function() {
            return c
        }), n.d(t, "isReservedPeer", function() {
            return u
        }), n.d(t, "isUserPeer", function() {
            return d
        }), n.d(t, "isChatPeer", function() {
            return l
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = window.intval;

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = e.split("_"),
                i = r(n, 2);
            return [i[0], i[1], t]
        }
        var o = {};

        function s(e) {
            if (o[e]) return o[e];
            for (var t = e ? e.length : 0, n = [], i = [], s = "", c = 0; c < t; c++) {
                var u = e[c],
                    d = u.charCodeAt(0);
                d >= 48 && d <= 57 || "_" === u || "-" === u ? s += u : "(" !== u && ")" !== u && ":" !== u && "," !== u || ("" !== s && (i.push(s), n.push("id"), s = ""), i.push(u), n.push(u))
            }
            s.length > 0 && (i.push(s), n.push("id"));
            var l = function e(t, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (o > 50) return [
                        [], t.length
                    ];
                    for (var s = [], c = ""; i < t.length;) {
                        var u = t[i];
                        if ("id" === u) c = n[i];
                        else if ("," === u && c) s.push(a(c)), c = "";
                        else if ("(" === u) {
                            var d = e(t, n, i + 1, o + 1),
                                l = r(d, 2),
                                f = l[0];
                            i = l[1], s.push(a(c, f)), c = ""
                        } else if (")" === u) return "" !== c && s.push(a(c)), [s, i];
                        i++
                    }
                    return c && s.push(a(c)), [s, i]
                }(n, i),
                f = r(l, 1)[0];
            return Object.keys(o).length > 300 && (o = {}), o[e] = f, f
        }

        function c(e, t) {
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
                    fwd_count: s(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: i(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: i(e["attach" + r + "_call_duration"]),
                receiverId: i(e["attach" + r + "_call_receiver_id"])
            }) : n.push({
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

        function u(e) {
            return 0 == e
        }

        function d(e) {
            return e > 0 && e < 2e9
        }

        function l(e) {
            return e > 2e9
        }
    },
    147: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
        window.TopNotifierCur || (window.TopNotifierCur = {
            link: "top_notify_btn",
            count: "top_notify_count",
            _qParams: {
                section: "notifications",
                _tb: 1,
                list: ""
            },
            loaded: !1,
            loading: !1,
            from: ""
        }), window.TopNotifier = {
            onLoad: function onLoad(rows, js, from, header) {
                if (TopNotifierCur.loading = !1, !from || TopNotifierCur.from !== from) {
                    void 0 !== rows && "undefined" !== rows || ajax.plainpost("/errors.php", {
                        msg: ajax.lastResp || "TopNotifier load undefinded response",
                        module: "top_notify",
                        id: vk.id,
                        host: locHost,
                        lang: vk.lang,
                        loc: (window.nav || {}).strLoc,
                        realloc: location.toString()
                    });
                    var evalExpr = "(function(){" + js + ";})()";
                    try {
                        eval(evalExpr)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.logEvalError)(e, evalExpr)
                    }
                    TopNotifierCur.loaded = !0, val(TopNotifier.getContentNode(), rows), TopNotifier.refreshHeader(header), TopNotifier.cleanCount(), TopNotifier.refreshCounters(), TopNotifierCur.from = from
                }
            },
            refreshHeader: function(e) {
                var t = void 0,
                    n = geByClass1("_notify_unread"),
                    r = e && !geByClass1("_top_notify_header"),
                    i = n && n.offsetHeight;
                if (r ? (TopNotifierCur.header = se(e), t = ce("div", {
                        className: "top_notify_header_label"
                    }), TopNotifierCur.header.appendChild(t)) : t = geByClass1("top_notify_header_label", TopNotifierCur.header), 1 === cur.groupNotify_enabled) {
                    if (r) {
                        val(t, "");
                        var a = "";
                        TopNotifierCur.notify_sources.forEach(function(e) {
                            "" !== e.list && e.list === TopNotifierCur._qParams.list && (a = e.name)
                        }), "" === a && (a = getLang("global_notifications_user"));
                        var o, s = ce("div", {
                                className: "top_notify_header_sup_label"
                            }),
                            c = ce("span", {
                                className: "top_notify_header_label_user",
                                innerHTML: a
                            }),
                            u = ce("span", {
                                className: "top_notify_header_label_groups"
                            }),
                            d = ce("a", {
                                onmouseover: function(e) {
                                    TopNotifier.getSourcesTip(this, e)
                                },
                                className: "top_notify_header_label_groups_link",
                                innerHTML: getLang("global_notifications_groups")
                            });
                        if (u.appendChild(d), o = ce("span", {
                                className: "top_notify_header_label_groups_counter",
                                innerHTML: ""
                            }), s.appendChild(c), cur.user_has_admined_groups > 0 && (s.appendChild(u), s.appendChild(o)), t.appendChild(s), i) {
                            var l = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                            t.appendChild(l)
                        }
                    }
                } else if (i) {
                    if (r || !geByClass1("top_notify_header_sup_label", t)) {
                        var f = ce("div", {
                                className: "top_notify_header_sup_label",
                                innerHTML: getLang("global_unread_notifications")
                            }),
                            _ = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                        val(t, ""), t.appendChild(f), t.appendChild(_)
                    }
                } else(r || geByClass1("top_notify_header_sup_label", t)) && val(t, getLang("global_notifitications"));
                r && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (i ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
                    if (TopNotifierCur.header_unread) {
                        var t = TopNotifierCur.header_unread.offsetTop + TopNotifierCur.header_unread_height < e.data.scrollTop;
                        t != TopNotifierCur.swaped && (toggleClass(TopNotifierCur.header, "top_notify_header_swap_labels", t), TopNotifierCur.swaped = t)
                    }
                }, TopNotifierCur.scrollbar.emitter.addListener("update", TopNotifierCur.header_unread_handler))) : (TopNotifierCur.header_unread_hidden || slideUp(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !0, TopNotifierCur.header_unread_handler && (TopNotifierCur.scrollbar.emitter.removeListener("update", TopNotifierCur.header_unread_handler), TopNotifierCur.header_unread_handler = null)))
            },
            preload: function() {
                TopNotifier.shown() || vk.isBanned || TopNotifierCur.loaded || ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                    _preload: 1
                }), {
                    cache: 1,
                    onDone: function(e, t, n, r) {
                        TopNotifier.shown() && geByClass1("pr", "top_notify_cont") && (TopNotifier.onLoad(e, t, n, r), TopNotifierCur.loaded = !0)
                    },
                    stat: ["feed.css", "page.css", "post.css"]
                })
            },
            loadMore: function loadMore() {
                var btn = ge("ui_top_notify_load_more");
                btn && !isButtonLocked(btn) && (TopNotifierCur.ajax = ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                    from: TopNotifierCur.from,
                    more: 1,
                    need_header: intval(!(geByClass1("_notify_header") || !geByClass1("_notify_sticky") && !geByClass1("_notify_unread")))
                }), {
                    onDone: function onDone(rows, js, newFrom) {
                        if (TopNotifierCur.scrollbar) {
                            var evalExpr = "(function(){" + js + ";})()";
                            try {
                                eval(evalExpr)
                            } catch (e) {
                                Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.logEvalError)(e, evalExpr)
                            }
                            if (rows) {
                                for (var row = null, cont = TopNotifier.getContentNode(), au = cf(rows); row = au.firstChild;) cont.insertBefore(row, btn);
                                TopNotifier.refreshHeader()
                            }
                            newFrom ? TopNotifierCur.from = newFrom : re(btn)
                        }
                    },
                    showProgress: function() {
                        show(btn), lockButton(btn)
                    },
                    hideProgress: function() {
                        hide(btn), unlockButton(btn)
                    }
                }))
            },
            updateTimes: function(e) {
                each(geByClass("rel_date_needs_update", e, "span"), function(e, t) {
                    if (t) {
                        var n = intval(t.getAttribute("time")),
                            r = 60 * ((new Date).getTimezoneOffset() + 180),
                            i = getDateText(n, r);
                        !0 === hasClass(this, "ucfirst") && (i = i.charAt(0).toUpperCase() + i.slice(1)), t.innerHTML = i
                    }
                })
            },
            show: function(e) {
                if (!0 !== checkEvent(e) && !vk.isBanned) {
                    if (TopNotifier.shown()) return gpeByClass("top_notify_wrap", e.target, ge("top_nav")) || TopNotifier.hide(), cancelEvent(e);
                    var t = ge(TopNotifierCur.link),
                        n = ge("top_notify_cont");
                    TopNotifier.updateTimes(n), TopNotifierCur.timeUpdateInt = setInterval(function() {
                        TopNotifier.updateTimes(n)
                    }, 1e4), cur.introNotifyTooltipHide && (cur.introNotifyTooltipHide(), delete cur.introNotifyTooltipHide), t.tt && t.tt.hide && t.tt.hide(), n || (TopNotifierCur.wrapper = ce("div", {
                        innerHTML: '<div id="top_notify_cont" class="top_notify_cont wall_module" ontouchstart="event.cancelBubble = true;" onmousedown="event.cancelBubble = true;"></div><a href="/feed?section=notifications' + (TopNotifierCur._qParams.list ? "&list=" + TopNotifierCur._qParams.list : "") + '" class="top_notify_show_all" onmousedown="event.cancelBubble = true;" onclick="TopNotifier.hide(); return nav.go(this, event);">' + getLang("global_notify_show_all") + "</a>",
                        id: "top_notify_wrap",
                        className: "scroll_fix_wrap top_notify_wrap"
                    }), t.appendChild(TopNotifierCur.wrapper), n = ge("top_notify_cont"));
                    var r = window.innerHeight || document.documentElement.clientHeight;
                    setStyle(n, {
                        maxHeight: Math.min(Math.max(r - 200, 300), 600)
                    }), addClass(TopNotifierCur.link, "active");
                    var i = uiScroll;
                    return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new i(n, {
                        global: !0,
                        stopScrollPropagationAlways: !0,
                        onmore: TopNotifier.loadMore
                    })), TopNotifierCur.loaded || TopNotifier.refresh(), cancelStackPush("top_notifier", TopNotifier.hide.bind(TopNotifier), !0), cancelEvent(e)
                }
            },
            hide: function() {
                TopNotifier.shown() && (removeClass(TopNotifierCur.link, "active"), clearInterval(TopNotifierCur.timeUpdateInt), cancelStackFilter("top_notifier", !0), 1 === cur.groupNotify_enabled && "" !== TopNotifierCur._qParams.list && (TopNotifierCur._qParams.list = "", TopNotifier.invalidate()))
            },
            shown: function() {
                return hasClass(TopNotifierCur.link, "active")
            },
            getContentNode: function() {
                return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.content && TopNotifierCur.scrollbar.container.__uiScroll__ ? TopNotifierCur.scrollbar.content : ge("top_notify_cont")
            },
            showProgress: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                var e = TopNotifier.getContentNode();
                geByClass1("pr", e) || (val(e, ""), showProgress(e))
            }),
            hideProgress: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                var e = TopNotifier.getContentNode();
                val(e, ""), hideProgress(e)
            }),
            showTooltip: function(e) {
                function t(t, n) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                if (!TopNotifier.shown() && !isVisible("dev_top_nav")) {
                    var n = ge(TopNotifierCur.link),
                        r = {};
                    if (n) {
                        if ("shownow" == n.tt && removeAttr(n, "tt"), e) r.text = function() {
                            return e
                        }, t && (r.onHide = o.pbind(t));
                        else {
                            n.tt && n.tt.destroy && n.tt.destroy();
                            var i = ls.get("ntfseen") || {},
                                a = [];
                            each(i, function(e, t) {
                                a.push(e + ":" + t)
                            }), r = extend(r, {
                                url: "al_feed.php",
                                params: {
                                    act: "a_last_notify",
                                    seen: a.join(";")
                                },
                                ajaxdt: 2e3,
                                noload: 1,
                                onHide: o
                            })
                        }
                        showTooltip(n, extend(r, {
                            typeClass: "top_notify_tt",
                            dir: "up",
                            width: 250,
                            shift: [0, 0],
                            nohideover: 1,
                            nohide: 1,
                            onShowStart: function(e) {
                                TopNotifier.shown() && (e.opts.onHide = !1, e.hide()), addEvent(e.container, "mousedown", function(e) {
                                        if (!e || !inArray(e.target.tagName, ["A", "IMG"])) return TopNotifier.show(e), cancelEvent(e)
                                    }),
                                    function e(t) {
                                        setTimeout(function() {
                                            window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? e(t) : (t && t.hide(), Notifier.lcSend("hide_notify_tt"))
                                        }, 6e3)
                                    }(e), Notifier.setRecvClbk("hide_notify_tt", e.hide)
                            }
                        }))
                    }
                }

                function o(e) {
                    if (!e && cur.topNotifyTTKey && (e = cur.topNotifyTTKey, delete cur.topNotifyTTKey), e) {
                        var t = e.split(":"),
                            n = ls.get("ntfseen") || {};
                        2 == t.length && (n[0] = parseInt((new Date).getTime() / 1e3), n[t[0]] = t[1], ls.set("ntfseen", n))
                    }
                }
            }),
            invalidate: function() {
                TopNotifierCur.loaded = !1, ajax.invalidate("/al_feed.php", TopNotifierCur._qParams), TopNotifierCur.ajax && TopNotifierCur.ajax.abort()
            },
            setCount: function(e, t) {
                isString(e) && (e = trim(e)), parseInt(e) >= 100 && (e = "+99"), hasClass(TopNotifierCur.link, "has_notify") && e ? animateCount(TopNotifierCur.count, e, {
                    str: "auto"
                }) : val(TopNotifierCur.count, e), toggleClass(TopNotifierCur.link, "has_notify", !!e), t || TopNotifier.invalidate()
            },
            cleanCount: function() {
                cur.topNotifyHash && (1 === cur.groupNotify_enabled && TopNotifierCur.notify_sources.forEach(function(e, t) {
                    e.list === TopNotifierCur._qParams.list && (TopNotifierCur.notify_sources[t].counter = 0)
                }), ajax.post("/al_feed.php", {
                    act: "a_clean_notify",
                    hash: cur.topNotifyHash,
                    list: TopNotifierCur._qParams.list
                }))
            },
            refresh: function() {
                TopNotifier.invalidate(), TopNotifierCur.wrapper && !TopNotifierCur.loading && (TopNotifierCur.loading = !0, re(geByClass1("_notify_header")), re(geByClass1("_top_notify_header")), TopNotifierCur.from = 0, ajax.post("/al_feed.php", TopNotifierCur._qParams, {
                    cache: 1,
                    onDone: TopNotifier.onLoad,
                    showProgress: TopNotifier.showProgress,
                    stat: ["feed.css"],
                    onFail: function() {
                        TopNotifierCur.loading = !1, TopNotifier.hideProgress(), val(ge("top_notify_cont"), '<div class="top_notify_empty no_rows">' + getLang("global_error_occured") + "</div>")
                    }
                }))
            },
            unifiedDeleteRow: function(e, t, n, r) {
                cancelEvent(e);
                var i = gpeByClass("feedback_row_wrap", r),
                    a = domPN(i),
                    o = geByClass1("post_actions", a);
                ajax.post("al_feed.php", {
                    act: "a_feedback_unified_delete",
                    query: t,
                    hash: n,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", i),
                            n = geByClass1("_feedback_deleted", a);
                        n ? (n.innerHTML = '<span class="dld_inner">' + e + "</span>", show(n)) : a.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(a, "feedback_row_clickable") && addClass(a, "feedback_row_touched")
                    },
                    showProgress: addClass.pbind(o, "post_actions_progress"),
                    hideProgress: removeClass.pbind(o, "post_actions_progress")
                })
            },
            checkClick: function(e, t) {
                if (t = t || window.event, !e || !t) return !0;
                var n = t.target || t.srcElement,
                    r = 8,
                    i = !1,
                    a = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
                do {
                    if (!n || n == e || n.onclick || n.onmousedown || inArray(n.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (i = n.className.match(a))) break
                } while (r-- && (n = n.parentNode));
                if (!i) return !1;
                if (n && n.className) {
                    var o = n.className.split(" "),
                        s = "unknown",
                        c = -1,
                        u = geByClass("feedback_row");
                    for (r = 0; r < o.length; ++r) {
                        var d = o[r].match("feedback_(.+)_row");
                        if (o[r] && d && d[1]) {
                            s = d[1];
                            break
                        }
                    }
                    for (r = 0; r < u.length; ++r)
                        if (u[r] == n) {
                            c = r;
                            break
                        }
                    hasClass(e, "feed_row_from_group") ? statlogsValueEvent("feed_group_notify", 0, "click", s, c) : statlogsValueEvent("feed_top_notify", 0, "click", s, c)
                }
                return n || !0
            },
            ungroup: function ungroup(item, event) {
                var el = ge("top_feedback_row" + item);
                if (event = event || window.event, el && !hasClass(el, "feedback_row_expanded") && !checkEvent(event) && TopNotifier.checkClick(el, event)) {
                    var hid = domNS(domPN(el)),
                        names = geByClass1("_header", el),
                        text = domData(names, "text");
                    show(hid), removeClass(el, "feedback_row_grouped"), addClass(el, "feedback_row_expanded"), val(names, text);
                    var evalExpr = "(function(){ if (!TopNotifier.checkClick(this, event)) return; " + unclean(domData(names, "click")) + ";})";
                    try {
                        el.onclick = eval(evalExpr)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.logEvalError)(e, evalExpr)
                    }
                }
            },
            ungroupUnified: function(e, t) {
                var n = ge("top_feedback_row" + e);
                if (t = t || window.event, n && !hasClass(n, "feedback_row_expanded") && !checkEvent(t) && TopNotifier.checkClick(n, t)) {
                    var r = domNS(domPN(n));
                    show(r), re(domPN(n)), t.stopPropagation(), t.preventDefault()
                }
            },
            showActionsMenu: function(e) {
                var t = !1,
                    n = domClosest("_feed_row", e),
                    r = domPN(n);
                hasClass(r, "_notify_unread") && (r = domPN(r)), r.lastChild != n || hasClass(r, "feed_row_fb_hidden") || hasClass(r, "feedback_sticky_rows") && domPN(r).lastChild != r || (t = {
                    appendParentCls: "top_notify_wrap",
                    processHoverCls: hasClass(domPN(e), "post_actions") ? "feedback_row" : "feedback_sticky_row"
                }), uiActionsMenu.show(e, !1, t)
            },
            hideActionsMenu: function(e) {
                uiActionsMenu.hide(e)
            },
            frProcess: function(e, t, n, r) {
                var i;
                isButtonLocked(n) || (i = r ? {
                    act: "add",
                    mid: e,
                    hash: t,
                    request: 1,
                    from: "top_notifier"
                } : {
                    act: "remove",
                    mid: e,
                    hash: t,
                    report_spam: 1,
                    from: "top_notifier"
                }, statlogsValueEvent("feed_top_notify", 0, "friends", i.act), ajax.post("/al_friends.php", i, {
                    onDone: function(t) {
                        var i = domPN(n);
                        val(i, t), addClass(i, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, r))
                    },
                    onFail: function(e) {
                        if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                    },
                    showProgress: lockButton.pbind(n),
                    hideProgress: unlockButton.pbind(n)
                }))
            },
            grProcess: function(e, t, n, r) {
                if (!(hasClass(n, "flat_button") && isButtonLocked(n) || domFC(n) && "progress_inline" == domFC(n))) {
                    var i = -2 == r ? "spam" : r ? "enter" : "leave",
                        a = -1 == r ? "_decline" : "";
                    ajax.post("/al_groups.php", {
                        act: i,
                        gid: e,
                        hash: t,
                        from: "top_notifier",
                        context: a
                    }, {
                        onDone: function(e) {
                            var t = domPN(n);
                            val(t, e), addClass(t, "feedback_buttons_response")
                        },
                        onFail: function(e) {
                            if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                        },
                        showProgress: function() {
                            if (-2 == r) {
                                n.oldhtml = n.innerHTML;
                                var e = getSize(n)[0];
                                n.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(n), {
                                    width: e
                                })
                            } else lockButton(n)
                        },
                        hideProgress: function() {
                            -2 == r ? n.innerHTML = n.oldhtml : unlockButton(n)
                        }
                    })
                }
            },
            gn_grProcess: function(e, t, n, r, i) {
                hasClass(r, "flat_button") && isButtonLocked(r) || domFC(r) && "progress_inline" == domFC(r) || ajax.post("groupsedit.php", {
                    act: "user_action",
                    id: e,
                    addr: t,
                    hash: n,
                    from: "top_notifier",
                    action: i
                }, {
                    onDone: function(e) {
                        var t = domPN(r);
                        val(t, e), addClass(t, "feedback_buttons_response")
                    },
                    onFail: function(e) {
                        if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                    },
                    showProgress: function() {
                        lockButton(r)
                    },
                    hideProgress: function() {
                        unlockButton(r)
                    }
                })
            },
            showGiftBox: function(e, t) {
                return !showBox("al_gifts.php", {
                    act: "get_gift_box",
                    fids: e,
                    fr: 1
                }, {
                    stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
                    cache: 1,
                    dark: 1
                }, t)
            },
            getSourcesTip: function(e, t) {
                return cancelEvent(t), showTooltip(e, {
                    url: "/al_page.php",
                    params: {
                        act: "notify_get_sources",
                        cur_list: TopNotifierCur._qParams.list
                    },
                    slide: 15,
                    ajxdt: 200,
                    hidedt: 200,
                    dir: "bottom",
                    shift: [100, 10],
                    id: "notify_sources",
                    className: "notify_sources",
                    onShowStart: function() {
                        TopNotifierCur.notify_sources.forEach(function(e) {
                            val(geByClass1("notify_tooltip_counter" + e.list), e.counter > 0 ? e.counter : "")
                        }), TopNotifier.refreshTooltip()
                    }
                }), !1
            },
            changeSource: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                null !== n && cancelEvent(n), e !== TopNotifierCur._qParams.list ? (re(geByClass1("notify_sources")), t && val(geByClass1("ui_rmenu_count", t), ""), geByClass1("top_notify_show_all") && attr(geByClass1("top_notify_show_all"), "href", "/feed?section=notifications" + (e ? "&list=" + e : "")), TopNotifierCur._qParams.list = e, TopNotifier.refresh()) : hide(geByClass1("notify_sources"))
            },
            changeSourceFullCallback: function() {
                1 === cur.groupNotify_enabled && (TopNotifier.refreshCounters(), TopNotifierCur.notify_sources.forEach(function(e) {
                    val(geByClass1("ui_rmenu_count", geByClass1("feed_section_" + e.list)), e.counter > 0 ? e.counter : "")
                }), attr(geByTag1("a", geByClass1("header_side_link", geByClass1("feed_notifications"))), "href", TopNotifierCur.settings_url), TopNotifierCur.source_name || (TopNotifierCur.source_name = getLang("news_title_notifications")), val(geByClass1("page_block_header_inner", geByClass1("feed_notifications")), TopNotifierCur.source_name))
            },
            addNewSource: function(e, t, n) {
                return ajax.post("al_settings.php", {
                    act: "a_group_notify_add_source",
                    gid: e,
                    from: n,
                    hash: t
                }, {
                    onDone: function(t) {
                        nav.go("/settings?act=group_notify&gid=" + e), TopNotifier.changeSource("group-" + e, null, null)
                    },
                    showProgress: lockButton.pbind(cur.popupSubmitBtnEl),
                    hideProgress: unlockButton.pbind(cur.popupSubmitBtnEl)
                }), !0
            },
            refreshCounters: function() {
                var e = 0,
                    t = 0;
                1 === cur.groupNotify_enabled && TopNotifierCur.notify_sources.forEach(function(n) {
                    "" !== n.list && n.counter > 0 && 1 === n.unmuted && (e++, t++), "" === n.list && (t += n.counter)
                }), vk.counts.ntf = t, TopNotifier.setCount(t, !0), val(geByClass1("top_notify_header_label_groups_counter"), e > 0 ? e : "")
            },
            refreshTooltip: function() {
                var e = [],
                    t = [],
                    n = geByClass1("groups", geByClass1("notify_sources")),
                    r = ce("div");
                n && (geByClass("line_cell", n).forEach(function(n, r) {
                    val(geByClass1("ui_rmenu_count", n)) > 0 ? e.push(n) : t.push(n)
                }), e.concat(t).forEach(function(e) {
                    r.appendChild(e)
                }), val(n, ""), n.appendChild(r))
            }
        }
    },
    15: function(e, t, n) {
        "use strict";

        function r(e, t, n, r, i) {
            return window.statlogsValueEvent(e, t, n, r, i)
        }

        function i(e) {
            return Math.random() < e
        }

        function a(e, t, n, a, o, s) {
            i(e) && r(t, n, a, o, s)
        }
        n.r(t), n.d(t, "statlogsValueEvent", function() {
            return r
        }), n.d(t, "randEnabled", function() {
            return i
        }), n.d(t, "statlogsProbValueEvent", function() {
            return a
        })
    },
    150: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ImDraft", function() {
            return s
        }), n.d(t, "loadDraftForPeer", function() {
            return u
        });
        var r = n(0),
            i = n(136),
            a = n(92),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function s(e, t) {
            this._db = e, this._key = t, this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.load()
        }

        function c(e) {
            switch (e.type) {
                case "mail":
                case "reply":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function u(e, t) {
            return new s(e, "draft_" + t)
        }
        s.prototype.dump = function() {
            var e;
            this._key && this._db.updateByKey(this._key, {
                txt: (e = this.dData).txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                cancelled: e.cancelled.length ? e.cancelled : void 0
            })
        }, s.prototype.load = function() {
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
        }, s.prototype.clear = function() {
            this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.dump()
        }, s.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, s.prototype.addAttach = function(e, t, n) {
            if ("share" === e && this.removeAttachByType(e), "mail" !== e && "reply" !== e || (this.removeAttachByType("mail"), this.removeAttachByType("reply")), !e || !t && "poll" !== e) return !1;
            var r = this.dData.attaches.findIndex(function(n) {
                return n.type === e && n.id === t
            }); - 1 === r ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: n
            }), this.dump()) : "video" !== e && "poll" !== e || (this.dData.attaches[r] = {
                type: e,
                id: t,
                object: n
            }, this.dump())
        }, s.prototype.syncWithSelector = function(e) {
            var t = this,
                n = this.getFwdRaw();
            this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
                var n = o(e, 2),
                    r = n[0],
                    i = n[1];
                return t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == i
                }) || {
                    type: r,
                    id: i
                }
            })), this.dump()
        }, s.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, s.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dData.cancelled = [], this.dump()
        }, s.prototype.addBindUrl = function(e, t, n) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: n
            }), this.dump())
        }, s.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t && this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null
        }, s.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            if (e && e.object) return e.object.url
        }, s.prototype.hasOnlyReplies = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return e ? e.flags & i.FLAG_HAS_REPLY && !this.dData.attaches.find(function(e) {
                return "mail" !== e.type
            }) : this.hasAttaches() && !this.dData.attaches.find(function(e) {
                return "reply" !== e.type
            })
        }, s.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, s.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, s.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, s.prototype.prepareObjects = function(e, t) {
            var n = this;
            return this.dData.attaches.find(c) ? Object(r.post)(a.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = o(e, 1)[0];
                n.dData.attaches = t.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, s.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type || "reply" === e.type
            })
        }, s.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    157: function(e, t, n) {
        "use strict";
        n.r(t), window.curRBox || (window.curRBox = {
            guid: 0,
            active: !1,
            focused: [],
            tabs: {}
        });

        function r(e, t) {
            var n = this;
            n.options = t = extend({
                minH: 50,
                minW: 50
            }, t), n.content = e;
            var r = n.id = "rb_box_" + (t.id || curRBox.guid++);
            n.wrap = ce("div", {
                id: r,
                className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
            });
            var i = {};
            n.toBottom = n.toRight = !1, t.fixed ? (i.bottom = 0, i.right = 72) : (void 0 !== t.startTop ? i.top = t.startTop : void 0 !== t.startBottom && (i.bottom = t.startBottom), void 0 !== t.startLeft ? i.left = t.startLeft : void 0 !== t.startRight && (i.right = t.startRight)), setStyle(n.wrap, i), t.movable && addEvent(t.movable, "mousedown", n._head_mdown.bind(n)), n.resizeableH = t.resizeableH || e, t.startHeight && setStyle(n.resizeableH, "height", t.startHeight), n.resizeableW = t.resizeableW || e, t.startWidth && setStyle(n.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", n._cont_mdown.bind(n)), t.closer && (addEvent(t.closer, "mousedown", n._close_mdown.bind(n)), addEvent(t.closer, "click", n._close_click.bind(n))), t.hider && (addEvent(t.hider, "mousedown", n._close_mdown.bind(n)), addEvent(t.hider, "click", n._hide_click.bind(n))), t.minimizer && !0 !== t.minimizer && (addEvent(t.minimizer, "mousedown", n._close_mdown.bind(n)), addEvent(t.minimizer, "click", n._min_toggle.bind(n))), n.wrap.appendChild(e), !1 !== t.resize && (n.resizeWrap = ce("div", {
                className: "rb_resize_wrap",
                innerHTML: '<div class="chats_sp rb_resize"></div>'
            }), n.wrap.appendChild(n.resizeWrap), addEvent(n.resizeWrap, "mousedown", n._resize_mdown.bind(n))), t.minimized && (addClass(n.wrap, "rb_minimized"), n.minimized = !0), bodyNode.insertBefore(n.wrap, ge("page_wrap"));
            var a = getStyle(n.wrap, "top"),
                o = getStyle(n.wrap, "bottom"),
                s = getStyle(n.wrap, "left"),
                c = getStyle(n.wrap, "right");
            this.toBottom = ("auto" === a || "" === a || browser.msie && 0 === a) && "auto" != o && "" !== o && !(browser.msie && 0 === o), this.toRight = ("auto" === s || "" === s || browser.msie && 0 === s) && "auto" != c && "" !== c && !(browser.msie && 0 === c), this.toRight && setStyle(n.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), (t.nofocus || t.noshow) && addClass(n.wrap, "rb_inactive"), this.toBottom && (setStyle(n.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), addClass(n.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(n.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            }), curRBox.tabs[r] = n, n.pos = !1, t.noshow ? (setStyle(n.wrap, {
                visibility: "hidden",
                display: "block"
            }), n._update_pos(), setStyle(n.wrap, {
                visibility: "",
                display: ""
            })) : n.show(!1, t.nofocus)
        }
        extend(r.prototype, {
            show: function(e) {
                function t(t, n) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                var n = this;
                void 0 === e && (e = 0), e ? (setStyle(n.wrap, {
                    opacity: 0,
                    display: "block"
                }), n.visible = !0, !t && n.focus(), animate(n.wrap, {
                    opacity: 1
                }, e, function() {
                    setStyle(n.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    }), n._update_pos()
                })) : (show(n.wrap), n.visible = !0, !t && n.focus(), n._update_pos()), n.options.onShow && n.options.onShow()
            }),
            hide: function(e) {
                function t(t, n, r) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t, n) {
                var r = this;
                if (!t && r.options.onBeforeHide && r.options.onBeforeHide()) return !0;
                void 0 === e && (e = 0), e ? (setStyle(r.wrap, {
                    opacity: 1,
                    display: "block"
                }), animate(r.wrap, {
                    opacity: 0
                }, e, function() {
                    hide(r.wrap), setStyle(r.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    })
                })) : hide(r.wrap), r.visible = !1, !t && r.options.onHide && r.options.onHide(n || {})
            }),
            _head_mdown: function(e) {
                if (!checkEvent(e)) {
                    (e.originalEvent || e).cancelBubble = !0;
                    var t, n, r = this,
                        i = e.target,
                        a = getWndInner(),
                        o = curRBox.active == r.id,
                        s = e.pageY,
                        c = e.pageX,
                        u = r.wrap.offsetHeight,
                        d = r.wrap.offsetWidth,
                        l = 0,
                        f = 0,
                        _ = a[0] - u,
                        h = a[1] - d,
                        p = browser.msie ? "selectstart" : "mousedown";
                    r.options.fixed && FastChat.pinTab(r.options.peer || -1, e, !0), o || r.focus(e), r.toBottom ? (r.toBottom = !1, t = a[0] - intval(getStyle(r.wrap, "bottom")) - u, setStyle(r.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(r.wrap, "fc_tobottom")) : t = intval(getStyle(r.wrap, "top")), r.toRight ? (r.toRight = !1, n = a[1] - intval(getStyle(r.wrap, "right")) - d, setStyle(r.wrap, {
                        left: n,
                        right: "auto"
                    })) : n = intval(getStyle(r.wrap, "left")), l = t, f = n, cur._fcdrag = 1;
                    var m = function(e) {
                        return l = Math.max(0, Math.min(_, t + e.pageY - s)), _ - l < 10 ? l = _ : l < 10 && (l = 0), r.wrap.style.top = l + "px", f = Math.max(0, Math.min(h, n + e.pageX - c)), h - f < 10 ? f = h : f < 10 && (f = 0), r.wrap.style.left = f + "px", cancelEvent(e)
                    };
                    return addEvent(document, "mousemove", m), addEvent(document, "mouseup", function e(t) {
                        cur._fcdrag = 0, removeEvent(document, "mousemove", m), removeEvent(document, "mouseup", e), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(i, "cursor", ""), (r.toBottom = l >= _ - 5) && (setStyle(r.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(r.wrap, "fc_tobottom")), (r.toRight = f >= h - 5) && setStyle(r.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), r._update_pos();
                        var n = Math.abs(t.pageY - s) < 3 && Math.abs(t.pageX - c) < 3;
                        cur._fcpromo > 0 ? cur._fcpromo = n ? 0 : -1 : r.options.minimizer && n ? !r.minimized && o ? r.minimize(!0) : r.minimized && r.unminimize(!0) : r.options.onDragEnd && r.options.onDragEnd(r.toBottom ? -1 : l / a[0], r.toRight ? -1 : f / a[1])
                    }), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(i, "cursor", "move"), !1
                }
            },
            _resize_mdown: function(e) {
                if (!checkEvent(e)) {
                    this.focus(e);
                    var t, n, r = this,
                        i = e.target,
                        a = getWndInner(),
                        o = e.pageY,
                        s = e.pageX,
                        c = r.wrap.offsetHeight,
                        u = r.wrap.offsetWidth,
                        d = 0,
                        l = 0,
                        f = r.resizeableH.clientHeight - intval(getStyle(r.resizeableH, "paddingBottom")) - intval(getStyle(r.resizeableH, "paddingTop")),
                        _ = r.resizeableW.clientWidth - intval(getStyle(r.resizeableW, "paddingRight")) - intval(getStyle(r.resizeableW, "paddingLeft")),
                        h = browser.msie ? "selectstart" : "mousedown",
                        p = !browser.msie && r.options.onResize || !1;
                    r.toBottom ? (r.toBottom = !1, t = a[0] - intval(getStyle(r.wrap, "bottom")) - c, setStyle(r.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(r.wrap, "fc_tobottom")) : t = intval(getStyle(r.wrap, "top")), r.toRight ? (r.toRight = !1, n = a[1] - intval(getStyle(r.wrap, "right")) - u, setStyle(r.wrap, {
                        left: n,
                        right: "auto"
                    })) : n = intval(getStyle(r.wrap, "left")), r.options.onResizeStart && r.options.onResizeStart(f, _);
                    var m = f + a[0] - t - c,
                        g = _ + a[1] - n - u,
                        v = function(e) {
                            return d = Math.max(r.options.minH, Math.min(m, f + e.pageY - o)), m - d < 10 && (d = m), r.resizeableH.style.height = d + "px", l = Math.max(r.options.minW, Math.min(g, _ + e.pageX - s)), g - l < 10 && (l = g), r.resizeableW.style.width = l + "px", p && p(d, l), cancelEvent(e)
                        };
                    return addEvent(document, "mousemove", v), addEvent(document, "mouseup", function e(t) {
                        removeEvent(document, "mousemove", v), removeEvent(document, "mouseup", e), removeEvent(document, h, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(i, "cursor", ""), (r.toBottom = d == m) && (setStyle(r.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(r.wrap, "fc_tobottom")), (r.toRight = l == g) && setStyle(r.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), r._update_pos(), r.options.onResizeEnd && r.options.onResizeEnd(d, l, a[0], a[1], r.toBottom, r.toRight)
                    }), addEvent(document, h, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(i, "cursor", "move"), !1
                }
            },
            _update_pos: function() {
                var e = this;
                e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
            },
            _wnd_resize: function(e, t, n) {
                var r = this;
                r.toBottom && (r.pos[0] = r.wrap.offsetTop), r.toRight && (r.pos[1] = r.wrap.offsetLeft);
                var i = {},
                    a = !1,
                    o = !1,
                    s = r.pos[0] + r.pos[2] - e,
                    c = r.pos[0],
                    u = r.resizeableH.clientHeight - r.options.minH,
                    d = r.pos[1] + r.pos[3] - t,
                    l = r.pos[1],
                    f = !1 !== r.options.resize ? r.resizeableW.clientWidth - r.options.minW : 0;
                n && (f < 0 && setStyle(r.resizeableW, r.options.minW), u < 0 && setStyle(r.resizeableH, r.options.minH)), (s <= 0 || c <= 0 && u <= 0) && (d <= 0 || l <= 0 && f <= 0) || (s > 0 && c > 0 && (s -= c = Math.min(s, c), i.top = r.pos[0] - c, i.bottom = ""), s > 0 && u > 0 && (u = Math.min(s, u), a = r.resizeableH.clientHeight - u), d > 0 && l > 0 && (d -= l = Math.min(d, l), i.left = r.pos[1] - l, i.right = ""), d > 0 && f > 0 && (f = Math.min(d, f), o = r.resizeableW.clientWidth - f), !1 !== o && setStyle(r.resizeableW, "width", o), !1 !== a && setStyle(r.resizeableH, "height", a), setStyle(r.wrap, i), r._update_pos(), r.options.onResize && r.options.onResize(r.resizeableH.clientHeight, r.resizeableW.clientWidth))
            },
            _cont_mdown: function(e) {
                if (curRBox.active != this.id && (this.focus(e), !hasClass(e.target, "fc_editable"))) return cancelEvent(e)
            },
            _focus: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id),
                    n = curRBox.active,
                    r = n && curRBox.tabs[n];
                if (n != e.id) {
                    r && isFunction(r.options.onBlur) && r.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                    var i = 1e4 + curRBox.focused.length,
                        a = !0;
                    each(curRBox.focused, function(e, t) {
                        var n = curRBox.tabs[t].wrap;
                        a ? (addClass(n, "rb_active"), removeClass(n, "rb_inactive"), curRBox.active = t, a = !1) : (removeClass(n, "rb_active"), addClass(n, "rb_inactive")), setStyle(n, "zIndex", i), i--
                    })
                }
            },
            _hide_click: function() {
                this.hide()
            },
            minimize: function(e) {
                var t = this,
                    n = t.wrap;
                if (t.options.fixed) return !1;
                addClass(n, "rb_minimized"), t.minimized = !0, t._update_pos(), e && t.options.onMinimize && t.options.onMinimize(0)
            },
            unminimize: function(e) {
                var t = this,
                    n = t.wrap,
                    r = getWndInner();
                removeClass(n, "rb_minimized"), t.minimized = !1, t._update_pos(), t._wnd_resize(r[0], r[1], !0), curRBox.active = !1, t.focus(), e && t.options.onMinimize && t.options.onMinimize(1)
            },
            _min_toggle: function(e) {
                var t = this;
                setTimeout(function() {
                    t.minimized ? t.unminimize(!0) : t.minimize(!0)
                }, 50)
            },
            destroy: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id); - 1 != t && curRBox.focused.splice(t, 1), cleanElems(e.wrap, e.resizeWrap, e.content, e.options.movable, e.options.closer, e.options.hider), re(e.wrap), delete curRBox.tabs[e.id]
            },
            _close_mdown: function(e) {
                (e.originalEvent || e).cancelBubble = !0
            },
            _close_click: function(e) {
                this.close()
            },
            _close: function(e) {
                this.destroy(), curRBox.focused[0] && !0 !== e && curRBox.tabs[curRBox.focused[0]].focus()
            },
            focus: function(e) {
                var t = this,
                    n = curRBox.active != t.id || !0;
                return t._focus(), n && isFunction(t.options.onFocus) && t.options.onFocus(e), n
            },
            close: function() {
                var e = this,
                    t = e.pos;
                e._close(), isFunction(e.options.onClose) && e.options.onClose(t)
            }
        }), window.RBox = r
    },
    16: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isPinnedMessageVisibleInTab", function() {
            return f
        }), n.d(t, "pinnedMessageHide", function() {
            return _
        }), n.d(t, "pinnedMessageUnHide", function() {
            return h
        }), n.d(t, "pinnedMessageUnpin", function() {
            return p
        }), n.d(t, "mount", function() {
            return v
        });
        var r = n(179),
            i = n(92),
            a = n(76),
            o = n(33),
            s = n(160),
            c = n(214),
            u = n(115),
            d = "_im_pin_hide",
            l = "_im_pinned_message";

        function f(e, t) {
            if (Object(c.unpackStore)(e).searchShown) return !1;
            var n = Object(s.getTab)(e, t),
                r = n && Object(s.parserMessage)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function _(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(s.getTab)(e, t),
                a = i && Object(s.parserMessage)(i.pinned);
            i && a && (i.pinHideId = a.chat_local_id, cur.imDb.update(u.PIN_HIDDEN_ID_OP, [i.peerId, i.pinHideId]), m(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function h(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(s.getTab)(e, t);
            i && i.pinHideId && (delete i.pinHideId, cur.imDb.update(u.PIN_HIDDEN_ID_OP, [i.peerId, void 0]), m(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function p(e, t, n) {
            var r = m.bind(null, n, t),
                a = Object(o.showUnpinDialog)(function() {
                    a.hideProgress(), a.hide(), e.set(i.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                        return e.set(i.unpinMessage.bind(null, t))
                    }).then(r)
                })
        }

        function m(e, t, n) {
            return e().updateChatTopic(t, n), Object(i.setActions)(n.get()), e().updateActions(n), n
        }

        function g(e) {
            return {
                unmount: function() {
                    Object(r.destroyModule)(e)
                }
            }
        }

        function v(e, t, n) {
            var i = Object(r.createMutations)(g).bindMutations,
                c = function(e, t, n) {
                    var r = e.get().peer,
                        i = Object(s.parserMessage)(Object(s.getTab)(e, r).pinned);
                    if (n.target.classList.contains(d)) i && _(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var c = i && i.messageId;
                        c && !Object(o.isAlreadyDeleted)(e, r, c) ? Object(o.focusOnMessage)(e, t().focusOnMessage, r, c) : Object(o.showPinnedBox)(e, t, r, a.mount, n), statlogsValueEvent("im_pinned_messages", "open")
                    }
                }.bind(null, t, n),
                u = function(e) {
                    showTooltip(e.target, {
                        text: getLang("mail_hide_unpin_hover"),
                        black: 1,
                        needLeft: 1,
                        shift: [8, 4],
                        forcetoup: !0,
                        className: "_im_pinned_tt",
                        appendEl: bodyNode
                    })
                }.bind(null);
            return i(Object(r.createModule)({
                handlers: function(t, n) {
                    n(e, "click", l, c), n(e, "mouseover", d, u)
                }
            }))
        }
    },
    160: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getFirstUnread", function() {
            return d
        }), n.d(t, "isSearchShown", function() {
            return l
        }), n.d(t, "getPeer", function() {
            return f
        }), n.d(t, "getCurrentKeyboard", function() {
            return _
        }), n.d(t, "getKeyboard", function() {
            return h
        }), n.d(t, "getTab", function() {
            return p
        }), n.d(t, "getCurrentTab", function() {
            return m
        }), n.d(t, "getSelectedMessages", function() {
            return g
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return v
        }), n.d(t, "countUnread", function() {
            return b
        }), n.d(t, "getMessageByRid", function() {
            return y
        }), n.d(t, "isRidExist", function() {
            return w
        }), n.d(t, "getLocalId", function() {
            return C
        }), n.d(t, "getLastMessage", function() {
            return k
        }), n.d(t, "parserMessage", function() {
            return T
        }), n.d(t, "getAuthorFullName", function() {
            return E
        }), n.d(t, "getMessage", function() {
            return O
        }), n.d(t, "getPreviousMessage", function() {
            return N
        }), n.d(t, "isClassicInterface", function() {
            return S
        }), n.d(t, "isLocksAvailable", function() {
            return j
        }), n.d(t, "isFoldersAvailable", function() {
            return I
        }), n.d(t, "isCommunityInterface", function() {
            return x
        }), n.d(t, "isChannel", function() {
            return F
        }), n.d(t, "getBareTab", function() {
            return A
        }), n.d(t, "isReversedDialogs", function() {
            return M
        }), n.d(t, "isFullyLoadedTab", function() {
            return P
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return L
        }), n.d(t, "isGoToEndVisible", function() {
            return D
        }), n.d(t, "getUnreadScrollBottom", function() {
            return R
        }), n.d(t, "isSendingAvailable", function() {
            return B
        }), n.d(t, "isCommunityPeer", function() {
            return H
        }), n.d(t, "isCommunityBlocked", function() {
            return U
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return q
        }), n.d(t, "isSearching", function() {
            return z
        }), n.d(t, "getSearchText", function() {
            return W
        }), n.d(t, "isSearchingValue", function() {
            return G
        }), n.d(t, "isRecentSearchesActive", function() {
            return K
        }), n.d(t, "getPinnedMessage", function() {
            return V
        }), n.d(t, "doPopularSuggExist", function() {
            return Y
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return Q
        }), n.d(t, "getGroupId", function() {
            return X
        }), n.d(t, "getTabDraft", function() {
            return $
        }), n.d(t, "getTemplates", function() {
            return J
        });
        var r = n(10),
            i = n(136),
            a = n(207),
            o = n(208),
            s = n(150),
            c = n(214),
            u = n(120);

        function d(e, t) {
            var n = Object(c.unpackStore)(e),
                i = n.tabs[n.peer];
            return Object.keys(i.msgs).filter(function(n) {
                var a = O(e, t, n);
                return !Object(r.isOut)(a) && intval(n) > i.in_up_to
            })[0]
        }

        function l(e) {
            return Object(c.unpackStore)(e).searchShown
        }

        function f(e) {
            return Object(c.unpackStore)(e).peer
        }

        function _(e) {
            return h(e, f(e))
        }

        function h(e, t) {
            return (p(e, t) || {}).keyboard
        }

        function p(e, t) {
            var n = Object(c.unpackStore)(e);
            return n.tabs && n.tabs[t]
        }

        function m(e) {
            var t = Object(c.unpackStore)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function g(e) {
            return Object(c.unpackStore)(e).selectedMessages
        }

        function v(e, t, n) {
            var i = p(e, t),
                a = g(e)[0];
            if (void 0 === a) return [n];
            var o = Math.min(n, a),
                s = Math.max(n, a);
            return Object.keys(i.msgs).filter(function(e) {
                return e >= o && e <= s
            }).filter(function(t) {
                var n = O(e, e.get().peer, t);
                return !Object(r.isServiceMsg)(n) && !Object(r.isCallMessage)(n)
            }).map(intval)
        }

        function b(e, t) {
            var n = p(Object(c.unpackStore)(t), e),
                i = 0;
            for (var a in n.msgs)
                if (n.msgs.hasOwnProperty(a)) {
                    var o = O(t, e, a);
                    Object(r.isOut)(o) || (i += Object(r.isUnread)(n, o) ? 1 : 0)
                }
            return i
        }

        function y(e, t, n) {
            var r = p(e, t);
            return Object.keys(r.msgs).filter(function(r) {
                return intval(O(e, t, r).randomId) === n
            }).length > 0
        }

        function w(e, t, n) {
            return !!y(e, t, n)
        }

        function C(e, t) {
            var n = Object(c.unpackStore)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function k(e, t, n) {
            var r = p(e, t),
                a = O(e, t, n),
                o = Object.keys(r.msgs).filter(function(n) {
                    var r = O(e, t, n),
                        o = r.local && r.type !== i.EDIT_MESSAGE;
                    return !(!a.local && o) && (!(!a.local || o) || C(e, a.messageId) > C(e, r.messageId))
                }).pop();
            return o ? O(e, t, o) : null
        }

        function T(e) {
            return e && e.length > 0 ? i.addMessageEvent([0].concat(e)) : e
        }

        function E(e, t, n) {
            var i = p(e, t),
                a = O(e, t, n),
                s = Object(c.unpackStore)(e);
            return Object(r.isOut)(a) ? Object(o.oCacheGet)(e, s.id).name : a.userId !== a.peerId ? !!Object(o.oCacheExists)(e, a.userId) && Object(o.oCacheGet)(e, a.userId).name : i.tab
        }

        function O(e, t, n) {
            var r = p(e, t),
                i = r && r.msgs && r.msgs[n];
            return i ? T(i) : null
        }

        function N(e, t, n) {
            var r = p(e, t),
                i = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!i) return null;
            var a = i && i.indexOf("" + n),
                o = a > -1 ? i[a - 1] : null;
            return r.msgs[o]
        }

        function S(e) {
            var t = Object(c.unpackStore)(e);
            return t.gid || t.isClassic
        }

        function j(e) {
            return Object(c.unpackStore)(e).gid
        }

        function I(e) {
            return Object(c.unpackStore)(e).gid
        }

        function x(e) {
            return !!Object(c.unpackStore)(e).gid
        }

        function F(e, t) {
            return !!(t.peerId > 2e9 && Object(u.doesChatTabHaveFlag)(t, 1024))
        }

        function A(e, t) {
            var n = Object(c.unpackStore)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function M(e) {
            var t = Object(c.unpackStore)(e);
            return !!x(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === a.FOLDER_UNRESPOND || t.active_tab === a.FOLDER_UNREAD))
        }

        function P(e, t) {
            var n = (e = Object(c.unpackStore)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function L(e, t) {
            var n = p(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function D(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function R(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function B(e) {
            return !Object(c.unpackStore)(e).lockedSending
        }

        function H(e) {
            return e > -2e9 && e < 0
        }

        function U(e, t) {
            return !!H(t) && !!p(e, t).blocked_community
        }

        function q(e) {
            return Object(c.unpackStore)(e).voice_message_available
        }

        function z(e) {
            var t = Object(c.unpackStore)(e);
            return !(!W(t) && !t.recentSearch)
        }

        function W(e) {
            return Object(c.unpackStore)(e).searchText
        }

        function G(e, t) {
            var n = Object(c.unpackStore)(e);
            return !!(t && t !== W(e) || n.recentSearch)
        }

        function K(e) {
            return Object(c.unpackStore)(e).recentSearch
        }

        function V(e) {
            var t = m(e);
            return t && t.pinned && T(t.pinned)
        }

        function Y(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function Q(e) {
            return 1 == Object(c.unpackStore)(e).isEditing
        }

        function X(e) {
            return Object(c.unpackStore)(e).gid
        }

        function $(e) {
            return e.draft || (e.draft = Object(s.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
        }

        function J(e) {
            return (Object(c.unpackStore)(e).templates || []).filter(function(e) {
                return !e.deleted
            })
        }
    },
    164: function(e, t, n) {
        "use strict";

        function r(e, t) {
            return new Promise(function(n) {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function i(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                i = 0;
            return function a() {
                for (var o = arguments.length, s = Array(o), c = 0; c < o; c++) s[c] = arguments[c];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, s)
                }).catch(function(e) {
                    if (++i <= t) {
                        var o = "function" == typeof n ? n(i) : 0;
                        return 0 === o ? a.apply(void 0, s) : r(o).then(function() {
                            return a.apply(void 0, s)
                        })
                    }
                    throw e
                })
            }
        }

        function a(e, t, n) {
            var r = void 0,
                i = void 0;
            return function() {
                for (var a = arguments.length, o = Array(a), s = 0; s < a; s++) o[s] = arguments[s];
                return new Promise(function(e, a) {
                    var s = n && !r;
                    clearTimeout(r), i && i.reject("debounce"), r = setTimeout(function() {
                        r = null, i = null, n || e(o)
                    }, t), s ? e(o) : n && a("debounce"), i = {
                        resolve: e,
                        reject: a
                    }
                }).then(function(t) {
                    return e.apply(void 0, function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                            return n
                        }
                        return Array.from(e)
                    }(t))
                })
            }
        }

        function o(e, t) {
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
        n.r(t), n.d(t, "pause", function() {
            return r
        }), n.d(t, "retryFn", function() {
            return i
        }), n.d(t, "debouncedPromise", function() {
            return a
        }), n.d(t, "abortablePause", function() {
            return o
        })
    },
    169: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }

        function i(e) {
            return r(new Date(e.getTime() + 864e5))
        }

        function a(e) {
            return r(new Date(e.getTime() - 864e5))
        }

        function o(e, t) {
            var n = new Date(e),
                r = new Date(t);
            return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth() && n.getDate() === r.getDate()
        }

        function s(e) {
            return e >= 10 ? e : "0" + e
        }

        function c(e, t) {
            var n = void 0;
            e = Math.max(e, 0);
            var r = Math.floor(e % 60);
            n = r < 10 ? "0" + r : r;
            var i = (e = Math.floor(e / 60)) % 60;
            return n = i + ":" + n, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (n = "0" + n), n = e + ":" + n), n
        }
        n.r(t), n.d(t, "isToday", function() {
            return r
        }), n.d(t, "isYesterday", function() {
            return i
        }), n.d(t, "isTomorrow", function() {
            return a
        }), n.d(t, "isSameDate", function() {
            return o
        }), n.d(t, "leadingZero", function() {
            return s
        }), n.d(t, "formatTime", function() {
            return c
        })
    },
    174: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MAX_SAFE_INTEGER", function() {
            return r
        }), n.d(t, "MAX_INTERGER", function() {
            return i
        }), n.d(t, "random", function() {
            return a
        });
        var r = 9007199254740991,
            i = 2147483647;

        function a() {
            try {
                if (window.crypto) {
                    var e = new Int32Array(1);
                    return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                        return e + t
                    }))
                }
            } catch (e) {}
            return intval(rand(0, i).toFixed(0))
        }
    },
    176: function(e, t, n) {
        e.exports = n(86)
    },
    179: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createMutations", function() {
            return c
        }), n.d(t, "createModule", function() {
            return u
        }), n.d(t, "destroyModule", function() {
            return d
        });
        var r = n(129);

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var a = window,
            o = a.addEvent,
            s = a.removeEvent;

        function c(e) {
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

        function u(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                o(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), function(e, t, n, i, a) {
                Object(r.addDelegateEvent)(t, n, i, a), e._registeredHandlers.push(["delegate", t, n, i, a])
            }.bind(null, t)), t
        }

        function d(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? r.removeDelegateEvent.apply(void 0, i(t)) : s.apply(void 0, i(t))
            }), e._registeredHandlers = []
        }
    },
    185: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseLatin", function() {
            return a
        }), n.d(t, "parseCyr", function() {
            return o
        }), n.d(t, "parseLatKeys", function() {
            return s
        }), n.d(t, "langNumeric", function() {
            return c
        }), n.d(t, "langSex", function() {
            return u
        }), n.d(t, "langStr", function() {
            return d
        }), n.d(t, "addLangKeys", function() {
            return l
        }), n.d(t, "getLang", function() {
            return f
        }), n.d(t, "langDate", function() {
            return _
        }), n.d(t, "getShortDate", function() {
            return h
        }), n.d(t, "getShortDateOrTime", function() {
            return p
        }), n.d(t, "langWordNumeric", function() {
            return m
        }), n.d(t, "getDateText", function() {
            return g
        }), n.d(t, "getBigDateNew", function() {
            return v
        }), n.d(t, "getSmDate", function() {
            return b
        });
        var r = n(169),
            i = n(6);

        function a(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = e, i = 0, a = t.length; i < a; i++) r = r.split(t[i]).join(n[i]);
            for (var o = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, c = o.length; s < c; s++) r = r.split(o.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
            return r === e ? null : r
        }

        function o(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, a = 0; a < n.length; a++) i = i.split(n[a]).join(t[a]);
            for (var o = 0; o < r.length; o++) i = i.split(r.charAt(o)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(o));
            return i === e ? null : i
        }

        function s(e) {
            for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, r = 0; r < t.length; r++) n = n.split(t.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
            return n == e ? null : n
        }

        function c(e, t, n) {
            if (!t || !window.langConfig) return e;
            var r = void 0;
            if (Object(i.isArray)(t) ? (r = t[1], e != Math.floor(e) ? r = t[langConfig.numRules.float] : Object(i.each)(langConfig.numRules.int, function(n, a) {
                    if ("*" == a[0]) return r = t[a[2]], !1;
                    var o = a[0] ? e % a[0] : e;
                    return -1 != Object(i.indexOf)(a[1], o) ? (r = t[a[2]], !1) : void 0
                })) : r = t, n) {
                for (var a = e.toString().split("."), o = [], s = a[0].length - 3; s > -3; s -= 3) o.unshift(a[0].slice(s > 0 ? s : 0, s + 3));
                a[0] = o.join(langConfig.numDel), e = a.join(langConfig.numDec)
            }
            return r = (r || "%s").replace("%s", e)
        }

        function u(e, t) {
            if (!Object(i.isArray)(t)) return t;
            var n = t[1];
            return window.langConfig ? (Object(i.each)(langConfig.sexRules, function(r, i) {
                return "*" == i[0] ? (n = t[i[1]], !1) : e == i[0] && t[i[1]] ? (n = t[i[1]], !1) : void 0
            }), n) : n
        }

        function d(e) {
            for (var t = arguments, n = t.length, r = e + "", i = 1; i < n; i += 2) {
                var a = "%" === t[i][0] ? t[i] : "{" + t[i] + "}";
                r = r.replace(a, t[i + 1])
            }
            return r
        }

        function l(e, t) {
            var n = t ? window : window.cur;
            n.lang ? Object(i.extend)(n.lang, e) : n.lang = e
        }

        function f() {
            try {
                var e = Array.from(arguments),
                    t = e.shift();
                if (!t) return "...";
                var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
                if (!n) {
                    var r = t.split("_");
                    return r.shift(), r.join(" ")
                }
                return Object(i.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(n) || "raw" === e[0] ? n : c(e[0], n, e[1])
            } catch (e) {
                debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
            }
        }

        function _(e, t, n, a, o, s) {
            var c = void 0;
            if (s || (s = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, c = new Date(e)) : c = e, o) t = t[1];
            else {
                var u = "";
                !(u = Object(r.isToday)(c) ? t[3] : Object(r.isYesterday)(c) ? t[2] : Object(r.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (u = t[1]), t = u
            }
            var d = {
                    hours: c.getHours(),
                    minutes: c.getMinutes(),
                    seconds: c.getSeconds(),
                    day: c.getDate(),
                    month: c.getMonth() + 1,
                    year: c.getFullYear()
                },
                l = "";
            switch (3 === vk.lang && (l = c.getHours() > 11 ? "pm" : "am", d.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
                case 1:
                    switch (c.getHours()) {
                        case 11:
                            t = t.replace(" о ", " об ");
                            break;
                        case 0:
                            t = t.replace(" о ", " в ")
                    }
                    break;
                case 3:
                    !Object(r.isToday)(c) || Object(r.isYesterday)(c) || Object(r.isTomorrow)(c) || (t = s + t);
                    break;
                case 12:
                case 73:
                    1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", Object(r.leadingZero)(d.hours)).replace("{minute}", Object(r.leadingZero)(d.minutes)).replace("{day}", d.day).replace("{num_day}", Object(r.leadingZero)(d.day)).replace("{month}", a[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", Object(r.leadingZero)(d.seconds)).replace("{am_pm}", l)
        }

        function h(e, t, n, r, i) {
            e *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = f("months_of", "raw")), t *= 1e3;
            var a = Date.now(),
                o = new Date(a),
                s = new Date(e + t);
            return !i && e > a && e - a < 864e5 && o.getDate() === s.getDate() ? _(e, "{hour}:{minute} {am_pm}", t, [], !n) : s.getYear() !== o.getYear() || e < a - 157248e5 ? _(e, f("global_date", "raw"), t, r, !n) : _(e, f("global_short_date", "raw"), t, r, !n)
        }

        function p(e, t, n, i) {
            return Object(r.isToday)(new Date(1e3 * e + 1e3 * t)) ? _(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : h(e, t, n, i)
        }

        function m(e, t, n) {
            return Object(i.isArray)(t) && e < t.length ? t[e] : c(e, n)
        }

        function g(e, t) {
            e += t;
            var n = parseInt(Date.now() / 1e3) - e,
                r = "";
            if (n < 60) r = f("global_just_now");
            else if (n < 3600) {
                r = m(Object(i.intval)(n / 60), f("global_word_mins_ago", "raw"), f("global_mins_ago", "raw"))
            } else if (n < 14400) {
                r = m(Object(i.intval)(n / 3600), f("global_word_hours_ago", "raw"), f("global_hours_ago", "raw"))
            } else r = v(e, 0, !0, "_l");
            return r
        }

        function v(e, t, n, r) {
            void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === r && (r = ""), t *= 1e3;
            var i = new Date(1e3 * e),
                a = new Date;
            return i.getFullYear() !== a.getFullYear() && i.getTime() < a.getTime() - 1728e5 || Math.abs(i.getTime() - a.getTime()) > 157248e5 ? _(1e3 * e, f("global_date", "raw"), t, f("months_sm_of"), !n) : _(1e3 * e, f("global_short_date_time" + r, "raw"), t, f("months_sm_of"), !n)
        }

        function b(e, t, n) {
            void 0 === n && (n = !0), void 0 === t && (t = 0);
            var r = new Date,
                i = r.getFullYear(),
                a = r.getMonth(),
                o = new Date(1e3 * e),
                s = o.getFullYear(),
                c = o.getMonth();
            return _(1e3 * e, f(s < i && (a > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, f("months_sm_of", "raw"), !n)
        }
        window.parseLatin = a, window.parseCyr = o, window.parseLatKeys = s, window.langNumeric = c, window.langSex = u, window.langStr = d, window.addLangKeys = l, window.getLang = f, window.langDate = _, window.getShortDate = h, window.getShortDateOrTime = p, window.langWordNumeric = m, window.getDateText = g, window.getBigDateNew = v, window.getSmDate = b
    },
    196: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "replaceHyperLinks", function() {
            return u
        }), n.d(t, "replaceEmailLinks", function() {
            return d
        }), n.d(t, "replaceMentions", function() {
            return l
        }), n.d(t, "replaceHashtags", function() {
            return h
        }), n.d(t, "confirmDelivery", function() {
            return p
        }), n.d(t, "linksReplacer", function() {
            return m
        });
        var r = n(207),
            i = void 0,
            a = window,
            o = a.clean,
            s = a.replaceEntities,
            c = a.statlogsValueEvent;

        function u(e, t) {
            for (var n = void 0, i = 0, a = e; null !== (n = r.MESSAGE_REGEXP.exec(e));) {
                var o = (n = f(n))[0].length,
                    s = n.index + o,
                    c = e[n.index - 1],
                    u = e[s - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    l = void 0 !== u && /([:;$])/i.test(u);
                if (!d && !l) {
                    var h = _(n),
                        p = h.domain.toLowerCase();
                    if (p.length <= r.MAX_DOMAIN_LENGTH && -1 !== r.TOP_DOMAINS.indexOf(p)) {
                        var m = t(h);
                        a = a.slice(0, n.index + i) + m + a.slice(s + i), i += m.length - o
                    }
                }
            }
            return a
        }

        function d(e, t) {
            return e.replace(r.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function l(e, t) {
            return e.replace(r.MENTION, t || function(e, t, n, r, i) {
                return '<a href="/' + (t + n) + '" class="mem_link" mention="' + o(r || "") + '" mention_id="' + o(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + i + "</a>"
            })
        }

        function f(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function _(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function h(e, t) {
            return e.replace((i || (i = new RegExp(r.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), i), function(e, n, r, i, a, o) {
                return (n || "") + t(r + (a || ""))
            })
        }

        function p(e) {
            c("ttl_message_confirm_delivery", e)
        }

        function m(e, t) {
            var n = t.protocol,
                i = t.url,
                a = t.query,
                c = t.domain,
                u = t.full;
            try {
                u = decodeURIComponent(u)
            } catch (e) {}
            if (u.length > 55 && (u = u.substr(0, 53) + ".."), u = o(u).replace(/&amp;/g, "&"), !e && c.match(r.OUR_DOMAINS)) {
                var d, l = i = s(i).replace(r.ENTITIES, encodeURIComponent),
                    f = i.indexOf("#/"),
                    _ = "";
                return f >= 0 ? l = i.substr(f + 1) : (f = i.indexOf("#!")) >= 0 && (l = "/" + i.substr(f + 2).replace(/^\//, "")), (d = l.match(r.VK_DOMAIN)) && d[1].length < 32 && (_ = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + i + a) + '" target="_blank"' + _ + ">" + u + "</a>"
            }
            return '<a href="' + ("away.php?utf=1&to=" + encodeURIComponent(n + s(i + a))) + '" target="_blank" onclick="' + ("return goAway('" + o((n + i + a).replace(/'/g, "\\'")) + "', {}, event);") + '">' + u + "</a>"
        }
    },
    197: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createLongpollEventsQueue", function() {
            return a
        });
        var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function a(e, t, n) {
            var a = 0,
                o = e,
                s = [],
                c = !1;

            function u() {
                !s.length || a > 0 || c || (t(s), s = [])
            }
            return {
                pause: function() {
                    a++
                },
                resume: function() {
                    a > 0 && (a--, u())
                },
                onLp: function(e, t, a) {
                    var d;
                    c || (o >= e ? (o = t, (d = s).push.apply(d, i(a)), u()) : n && (c = !0, n(o).then(function(e) {
                        var t, n = r(e, 3),
                            a = (n[0], n[1]),
                            d = n[2];
                        o = a, c = !1, (t = s).push.apply(t, i(d)), u()
                    })))
                }
            }
        }
    },
    205: function(e, t, n) {
        "use strict";

        function r(e) {
            this.started = !1, this.is_idle = !0, this.is_activated = !1, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }
        n.r(t), extend(r.prototype, EventEmitter.prototype), extend(r.prototype, {
            stop: function() {
                this.started = !1, removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), removeEvent(this.opts.focusElement, "focus", this.cbActiveB), removeEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
            },
            idle: function(e) {
                this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
            },
            unidle: function(e) {
                this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
            },
            activate: function() {
                this.is_idle = !1, this.is_activated = !0
            },
            start: function() {
                this.started = !0, browser.mobile || (this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), addEvent(this.opts.focusElement, "focus", this.cbActiveB), addEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            checkIdleCb: function() {
                this.started && (addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
            },
            cbActive: function() {
                this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
                }.bind(this), 100)), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            cbInactive: function() {
                this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
                }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
            },
            getActiveTime: function() {
                return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
            }
        }), window.IdleManager = r
    },
    207: function(e, t, n) {
        "use strict";
        var r;

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        n.r(t), n.d(t, "OUR_DOMAINS", function() {
            return a
        }), n.d(t, "ENTITIES", function() {
            return o
        }), n.d(t, "VK_DOMAIN", function() {
            return s
        }), n.d(t, "MENTION", function() {
            return c
        }), n.d(t, "MENTION_RAW", function() {
            return u
        }), n.d(t, "ARROW_UP", function() {
            return d
        }), n.d(t, "ARROW_DOWN", function() {
            return l
        }), n.d(t, "PAGE_UP", function() {
            return f
        }), n.d(t, "PAGE_DOWN", function() {
            return _
        }), n.d(t, "END_KEY", function() {
            return h
        }), n.d(t, "HOME", function() {
            return p
        }), n.d(t, "ENTER", function() {
            return m
        }), n.d(t, "ESC", function() {
            return g
        }), n.d(t, "UNPRINTABLE_KEYS", function() {
            return v
        }), n.d(t, "UP_DOWN_CONTROLS", function() {
            return b
        }), n.d(t, "PRINTABLE", function() {
            return y
        }), n.d(t, "FOLDER_UNREAD", function() {
            return w
        }), n.d(t, "FOLDER_ALL", function() {
            return C
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return k
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return T
        }), n.d(t, "FOLDERS", function() {
            return E
        }), n.d(t, "FOLDER_MASKS", function() {
            return O
        }), n.d(t, "TOP_DOMAINS", function() {
            return N
        }), n.d(t, "MAX_DOMAIN_LENGTH", function() {
            return S
        }), n.d(t, "EMAIL", function() {
            return j
        }), n.d(t, "MESSAGE_REGEXP", function() {
            return I
        }), n.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
            return x
        });
        var a = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            o = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            s = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            c = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            u = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            d = 38,
            l = 40,
            f = 33,
            _ = 34,
            h = 35,
            p = 36,
            m = 13,
            g = 27,
            v = [d, l, f, _, m, g, h, p],
            b = [f, _, l, d, p, h],
            y = "printable",
            w = "unread",
            C = "all",
            k = "unrespond",
            T = "important",
            E = [C, w, k, T],
            O = (i(r = {}, k, 2), i(r, T, 1), r),
            N = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(function(e) {
                return "xn--" + e
            })),
            S = N.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            j = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            I = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            x = "(^|[s.,:'\";>)(]?)((#(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}))(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'\"&;?<)(]?)"
    },
    208: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "oCacheExists", function() {
            return i
        }), n.d(t, "oCacheGet", function() {
            return a
        }), n.d(t, "oCacheAdd", function() {
            return o
        });
        var r = n(214);

        function i(e, t) {
            return t in Object(r.unpackStore)(e).oCache
        }

        function a(e, t) {
            var n = Object(r.unpackStore)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function o(e, t) {
            var n = Object(r.unpackStore)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    21: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "statlogsForwardEvent", function() {
            return o
        }), n.d(t, "statlogsForwardFromCommunityEvent", function() {
            return s
        }), n.d(t, "statlogsCommunityTemplatesClickEvent", function() {
            return c
        }), n.d(t, "statlogsForwardFromChannel", function() {
            return u
        }), n.d(t, "statlogsSendingTime", function() {
            return l
        }), n.d(t, "statlogsSendingTimeStart", function() {
            return f
        }), n.d(t, "statlogsSendingTimeEnd", function() {
            return _
        }), n.d(t, "statlogsSendingError", function() {
            return h
        }), n.d(t, "statlogsSendingQueueLength", function() {
            return m
        }), n.d(t, "statlogsSendingRetry", function() {
            return g
        });
        var r = n(15),
            i = n(214),
            a = {};

        function o(e) {
            Object(r.statlogsProbValueEvent)(.1, "im_forward_stat", d(e), !!e.get().gid)
        }

        function s(e, t) {
            Object(r.statlogsProbValueEvent)(.1, "im_forward_from_community_stat", d(e), !!e.get().gid, +t)
        }

        function c() {
            Object(r.statlogsProbValueEvent)(1, "im_apply_community_template_stat", 1)
        }

        function u() {
            Object(r.statlogsProbValueEvent)(1, "messages_channel_forward_click", 1)
        }

        function d(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function l(e, t, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(r.randEnabled)(1)) return function() {};
            var a = +new Date,
                o = p(e);
            return function() {
                var e = +new Date - a;
                statlogsValueEvent("messages_send_time_web", e, t, n, o, i)
            }
        }

        function f(e, t, n, r) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var i = [t.messageId.replace("rid", ""), n, r].join("_"),
                    o = t.attaches.length > 0;
                a[i] = l(e, n, r, o)
            }
        }

        function _(e, t, n, r) {
            var i = [t.randomId, n, r].join("_"),
                o = a[i];
            o && (o(), delete a[i])
        }

        function h(e, t, n, i) {
            var a = p(e),
                o = "" === t ? "network" : "unknown";
            Object(r.randEnabled)(1) && statlogsValueEvent("messages_send_errors_web", o, n, i, a)
        }

        function p(e) {
            var t = Object(i.unpackStore)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function m(e) {
            var t = Object(i.unpackStore)(e),
                n = t.imQueue(t.peer).length;
            Object(r.randEnabled)(1) && statlogsValueEvent("messages_send_queue_size", n)
        }

        function g(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "unknown";
            Object(r.randEnabled)(1) && statlogsValueEvent("messages_send_retry", 1, t, e)
        }
    },
    213: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ge", function() {
            return a
        }), n.d(t, "geByTag", function() {
            return o
        }), n.d(t, "geByTag1", function() {
            return s
        }), n.d(t, "geByClass", function() {
            return c
        }), n.d(t, "geByClass1", function() {
            return u
        }), n.d(t, "gpeByClass", function() {
            return d
        }), n.d(t, "domQuery", function() {
            return l
        }), n.d(t, "domQuery1", function() {
            return f
        }), n.d(t, "domClosest", function() {
            return _
        }), n.d(t, "domClosestByTag", function() {
            return h
        }), n.d(t, "gpeByTag", function() {
            return p
        }), n.d(t, "ce", function() {
            return m
        }), n.d(t, "re", function() {
            return C
        }), n.d(t, "se", function() {
            return k
        }), n.d(t, "sech", function() {
            return T
        }), n.d(t, "rs", function() {
            return E
        }), n.d(t, "psr", function() {
            return O
        }), n.d(t, "domReplaceEl", function() {
            return N
        }), n.d(t, "domEL", function() {
            return S
        }), n.d(t, "domNS", function() {
            return j
        }), n.d(t, "domPS", function() {
            return I
        }), n.d(t, "domFC", function() {
            return x
        }), n.d(t, "domLC", function() {
            return F
        }), n.d(t, "domPN", function() {
            return A
        }), n.d(t, "domChildren", function() {
            return M
        }), n.d(t, "domInsertBefore", function() {
            return P
        }), n.d(t, "domInsertAfter", function() {
            return L
        }), n.d(t, "domByClass", function() {
            return D
        }), n.d(t, "domData", function() {
            return R
        }), n.d(t, "domChildIndex", function() {
            return B
        }), n.d(t, "domCA", function() {
            return H
        }), n.d(t, "domClosestSibling", function() {
            return U
        }), n.d(t, "matchesSelector", function() {
            return q
        }), n.d(t, "isHover", function() {
            return z
        }), n.d(t, "isAncestor", function() {
            return W
        }), n.d(t, "getScroll", function() {
            return G
        }), n.d(t, "domClosestPositioned", function() {
            return K
        }), n.d(t, "domClosestOverflowHidden", function() {
            return V
        }), n.d(t, "show", function() {
            return Y
        }), n.d(t, "hide", function() {
            return Q
        }), n.d(t, "isVisible", function() {
            return X
        }), n.d(t, "clientHeight", function() {
            return $
        }), n.d(t, "getClientRectOffsetY", function() {
            return J
        }), n.d(t, "toggle", function() {
            return Z
        }), n.d(t, "boundingRectEnabled", function() {
            return ee
        }), n.d(t, "getXYRect", function() {
            return te
        }), n.d(t, "getXY", function() {
            return ne
        }), n.d(t, "isWindow", function() {
            return re
        }), n.d(t, "getSize", function() {
            return ie
        }), n.d(t, "getW", function() {
            return ae
        }), n.d(t, "getH", function() {
            return oe
        }), n.d(t, "hasClass", function() {
            return se
        }), n.d(t, "addClass", function() {
            return ce
        }), n.d(t, "addClassDelayed", function() {
            return ue
        }), n.d(t, "removeClass", function() {
            return de
        }), n.d(t, "removeClassDelayed", function() {
            return le
        }), n.d(t, "toggleClass", function() {
            return fe
        }), n.d(t, "toggleClassDelayed", function() {
            return _e
        }), n.d(t, "replaceClass", function() {
            return he
        }), n.d(t, "getStyle", function() {
            return pe
        }), n.d(t, "setStyle", function() {
            return me
        }), n.d(t, "setStyleDelayed", function() {
            return ge
        }), n.d(t, "setPseudoStyle", function() {
            return ve
        }), n.d(t, "data", function() {
            return be
        }), n.d(t, "attr", function() {
            return ye
        }), n.d(t, "removeAttr", function() {
            return we
        }), n.d(t, "removeData", function() {
            return Ce
        }), n.d(t, "cleanElems", function() {
            return ke
        }), n.d(t, "setTitle", function() {
            return Te
        }), n.d(t, "getZoom", function() {
            return Ee
        }), n.d(t, "val", function() {
            return Oe
        }), n.d(t, "elfocus", function() {
            return Ne
        }), n.d(t, "traverseParent", function() {
            return Se
        }), n.d(t, "setDocumentTitle", function() {
            return Ie
        }), n.d(t, "lockDocumentTitle", function() {
            return xe
        }), n.d(t, "initDomScripts", function() {
            return Fe
        });
        var r = n(6),
            i = n(106),
            a = function(e) {
                return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
            };

        function o(e, t) {
            return (t = a(t) || document).getElementsByTagName(e)
        }

        function s(e, t) {
            return (t = a(t) || document).querySelector && t.querySelector(e) || o(e, t)[0]
        }

        function c(e, t, n) {
            return t = a(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
        }

        function u(e, t, n) {
            return t = a(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || c(e, t, n)[0]
        }

        function d(e, t, n) {
            if (!(t = a(t))) return null;
            for (; n !== t && (t = t.parentNode);)
                if (se(t, e)) return t;
            return null
        }

        function l(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function f(e, t) {
            return (t || document).querySelector(e)
        }

        function _(e, t) {
            return se(t, e) ? t : d(e, t)
        }

        function h(e, t) {
            return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : p(e, t)
        }

        function p(e, t) {
            if (!(t = a(t))) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() === e) return t;
            return null
        }

        function m(e, t, n) {
            var i = document.createElement(e);
            return t && Object(r.extend)(i, t), n && me(i, n), i
        }
        var g, v, b, y, w = (g = document, v = g.createDocumentFragment(), b = g.createElement("div"), y = g.createRange && g.createRange(), v.appendChild(b), y && y.selectNodeContents(b), y && y.createContextualFragment ? function(e) {
            return e ? y.createContextualFragment(e) : g.createDocumentFragment()
        } : function(e) {
            if (!e) return g.createDocumentFragment();
            b.innerHTML = e;
            for (var t = g.createDocumentFragment(); b.firstChild;) t.appendChild(b.firstChild);
            return t
        });

        function C(e) {
            return (e = a(e)) && e.parentNode && e.parentNode.removeChild(e), e
        }
        var k = function(e) {
                return x(m("div", {
                    innerHTML: e
                }))
            },
            T = function(e) {
                return M(m("div", {
                    innerHTML: e
                }))
            };

        function E(e, t) {
            return Object(r.each)(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function O(e) {
            return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function N(e, t) {
            return Object(r.isString)(t) && (t = k(t)), A(e).replaceChild(t, e), t
        }

        function S(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }
        var j = function(e) {
                return S((e || {}).nextSibling)
            },
            I = function(e) {
                return S((e || {}).previousSibling, 1)
            },
            x = function(e) {
                return S((e || {}).firstChild)
            },
            F = function(e) {
                return S((e || {}).lastChild, 1)
            },
            A = function(e) {
                return (e || {}).parentNode
            };

        function M(e) {
            for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
            return t
        }

        function P(e, t) {
            var n = A(t);
            return n && n.insertBefore(e, t)
        }

        function L(e, t) {
            var n = A(t);
            return n && n.insertBefore(e, j(t))
        }

        function D(e, t) {
            return e ? u(t, e) : e
        }

        function R(e, t, n) {
            return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function B(e) {
            for (var t = 0; null != (e = I(e));) t++;
            return t
        }

        function H(e, t) {
            do {
                e = A(e)
            } while (e && !q(e, t));
            return e
        }

        function U(e, t, n) {
            for (var r = null; null === r && e;)(e = -1 === n ? I(e) : j(e)) && q(e, t) && (r = e);
            return r
        }

        function q(e, t) {
            return !(!(e = a(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
                for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
                return n > -1
            }).call(e, t)
        }

        function z(e) {
            return q(e, ":hover")
        }

        function W(e, t) {
            var n = a(e);
            if (t = a(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n === t) return !0;
            return !1
        }

        function G() {
            var e = browser.msie6 ? a("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function K(e, t) {
            for (var n = (t = t || {}).fromEl || A(e), i = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
                var a = pe(n, "position");
                if (Object(r.inArray)(a, i) && (!t.noOverflow || "hidden" !== pe(n, "overflow"))) break;
                n = A(n)
            }
            return n
        }

        function V(e, t) {
            for (var n = e = a(e), r = void 0, i = void 0, o = void 0, s = !1; n && n.tagName && n !== bodyNode;) {
                if (r = pe(n, "position"), i = pe(n, "overflow"), o = pe(n, "transform"), t && browser.mozilla) {
                    if ("page_wrap" != n.id && n !== e && "visible" !== i && ("static" === r ? !s || "relative" === s : "fixed" !== s)) break
                } else if (n !== e && "visible" !== i && ("static" === r ? !s || "relative" === s : "fixed" !== s)) break;
                "none" !== o ? s = void 0 : "static" !== r && "fixed" !== s && (s = r), n = A(n)
            }
            return n
        }

        function Y(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) Y(arguments[n]);
            else if ((e = a(e)) && e.style) {
                var r = e.olddisplay,
                    i = e.tagName.toLowerCase(),
                    o = "block";
                e.style.display = r || "", "none" === pe(e, "display") && (o = se(e, "inline") || se(e, "_inline") ? "inline" : se(e, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = o)
            }
        }

        function Q(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) Q(arguments[n]);
            else if ((e = a(e)) && e.style) {
                var r = pe(e, "display");
                e.olddisplay = "none" !== r ? r : "", e.style.display = "none"
            }
        }

        function X(e) {
            return !(!(e = a(e)) || !e.style) && "none" !== pe(e, "display")
        }

        function $() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function J(e, t, n) {
            e = a(e), n = n || 0;
            var i = ne(e)[1],
                o = ie(e)[1],
                s = window,
                c = document.documentElement,
                u = Math.max(Object(r.intval)(s.innerHeight), Object(r.intval)(c.clientHeight)),
                d = a("page_header_cont"),
                l = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                f = vk.staticheader ? Math.max(0, ie(d)[1] - l) : ie(d)[1];
            if (t) {
                if (i + o < l + f + n) return i + o - l - f - n;
                if (i > l + u - n) return i - l - u + n
            } else {
                if (i < l + f + n) return i - l - f - n;
                if (i + o > l + u - n) return i + o - l - u + n
            }
            return 0
        }

        function Z(e, t) {
            return void 0 === t && (t = !X(e)), t ? Y(e) : Q(e), t
        }

        function ee(e) {
            return void 0 !== e.getBoundingClientRect
        }

        function te(e, t) {
            var n = void 0;
            if (t && "inline" === pe(e, "display")) {
                var r = e.getClientRects();
                n = r && r[0] || e.getBoundingClientRect()
            } else n = e.getBoundingClientRect();
            return n
        }

        function ne(e, t) {
            if (!(e = a(e))) return [0, 0];
            var n = e.ownerDocument,
                r = {
                    top: 0,
                    left: 0
                };
            if (!n) return [0, 0];
            var i = n.documentElement;
            ee(e) && (r = te(e, !0));
            var o = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
            return [r.left + (t ? 0 : o.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), r.top + (t ? 0 : o.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
        }

        function re(e) {
            return null != e && e === e.window
        }

        function ie(e, t, n) {
            e = a(e);
            var i = document.documentElement,
                o = [0, 0],
                s = void 0;
            if (t && "border-box" === pe(e, "boxSizing") && (t = !1), e === document) o = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
            else if (e) {
                var c = function() {
                    o = ee(e) && (s = te(e, n)) && void 0 !== s.width ? [s.width, s.height] : [e.offsetWidth, e.offsetHeight], t && Object(r.each)(o, function(t, n) {
                        var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        Object(r.each)(i, function() {
                            o[t] -= parseFloat(pe(e, "padding" + this)) || 0, o[t] -= parseFloat(pe(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (X(e)) c();
                else {
                    var u = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        d = {},
                        l = !1;
                    e.style.cssText.indexOf("!important") > -1 && (l = e.style.cssText), Object(r.each)(u, function(t, n) {
                        d[t] = e.style[t], e.style[t] = n
                    }), c(), Object(r.each)(u, function(t, n) {
                        e.style[t] = d[t]
                    }), l && (e.style.cssText = l)
                }
            }
            return o
        }

        function ae(e) {
            return ie(e)[0]
        }

        function oe(e) {
            return ie(e)[1]
        }

        function se(e, t) {
            var n = a(e);
            return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
        }

        function ce(e, t) {
            var n = a(e);
            n && !se(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
        }
        window.whitespaceRegex = /[\t\r\n\f]/g;
        var ue = function(e, t) {
            return setTimeout(ce.pbind(e, t), 0)
        };

        function de(e, t) {
            var n = a(e);
            n && (n.className = Object(r.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }
        var le = function(e, t) {
            return setTimeout(de.pbind(e, t), 0)
        };

        function fe(e, t, n) {
            return void 0 === n && (n = !se(e, t)), (n ? ce : de)(e, t), n
        }

        function _e(e, t, n) {
            return void 0 === n && (n = !se(e, t)), (n ? ue : le)(e, t), n
        }

        function he(e, t, n) {
            de(e, t), ce(e, n)
        }

        function pe(e, t, n) {
            if (e = a(e), Object(r.isArray)(t)) {
                var i = {};
                return Object(r.each)(t, function(t, n) {
                    return i[n] = pe(e, n)
                }), i
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" === t && browser.msie) {
                var o = e.style.filter;
                return o ? o.indexOf("opacity=") >= 0 ? parseFloat(o.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
            var s = void 0,
                c = document.defaultView || window;
            if (c.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var u = c.getComputedStyle(e, null);
                u && (s = u.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" === t && browser.msie) {
                    var d = e.currentStyle.filter;
                    return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var l = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                "auto" === (s = e.currentStyle[t] || e.currentStyle[l]) && (s = 0), s = (s + "").split(" "), Object(r.each)(s, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = e.style,
                            i = r.left,
                            a = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, s[t] = r.pixelLeft + "px", r.left = i, e.runtimeStyle.left = a
                    }
                }), s = s.join(" ")
            }
            if (n && ("width" === t || "height" === t)) {
                var f = ie(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                s = (Object(r.intval)(s) ? Math.max(Object(r.floatval)(s), f) : f) + "px"
            }
            return s
        }

        function me(e, t, n) {
            if (e = a(e))
                if (Object(r.isObject)(t)) Object(r.each)(t, function(t, n) {
                    return me(e, t, n)
                });
                else if ("opacity" === t) browser.msie && ((n + "").length ? e.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var i = "number" == typeof n;
                i && /height|width/i.test(t) && (n = Math.abs(n)), n = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (e) {
                debugLog("setStyle error: ", [t, n], e)
            }
        }
        window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var n in t)
                    if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
            }
            return "transform"
        }();
        var ge = function(e, t, n) {
            return setTimeout(me.pbind(e, t, n), 0)
        };

        function ve(e, t, n) {
            var i = be(e, "pseudo-id");
            i || (be(e, "pseudo-id", i = Object(r.irand)(1e8, 999999999)), ce(e, "_pseudo_" + i));
            var o = t + "-style-" + i,
                s = a(o),
                c = "._pseudo_" + i + ":" + t + "{";
            s || (s = headNode.appendChild(m("style", {
                id: o,
                type: "text/css"
            }))), Object(r.each)(n, function(e, t) {
                c += e + ": " + t + " !important;"
            }), c += "}", s.sheet ? (s.sheet.cssRules.length && s.sheet.deleteRule(0), s.sheet.insertRule(c, 0)) : s.styleSheet && (s.styleSheet.cssText = c)
        }

        function be(e, t, n) {
            if (!e) return !1;
            var r = e[vkExpand];
            return r || (r = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = e)), vkCache[r][t] = n), t ? vkCache[r] && vkCache[r][t] : r
        }

        function ye(e, t, n) {
            return e = a(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function we(e) {
            for (var t = 0, n = arguments.length; t < n; ++t) {
                var r = arguments[t];
                if (void 0 !== e[r]) try {
                    delete e[r]
                } catch (t) {
                    try {
                        e.removeAttribute(r)
                    } catch (e) {}
                }
            }
        }

        function Ce(e, t) {
            var n = !!e && e[vkExpand];
            if (n)
                if (t) {
                    if (vkCache[n]) {
                        delete vkCache[n][t], t = "";
                        var r = 0;
                        for (var a in vkCache[n])
                            if ("__elem" !== a) {
                                r++;
                                break
                            }
                        r || Ce(e)
                    }
                } else Object(i.removeEvent)(e), we(e, vkExpand), delete vkCache[n]
        }

        function ke() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = a(e[t]);
                n && (Ce(n), we(n, "btnevents"))
            }
        }

        function Te(e, t, n) {
            if ((e = a(e)) && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
                else {
                    var r = s("b", e);
                    r && r.scrollWidth > r.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function Ee() {
            var e = a("zoom_test_1") || document.body.appendChild(m("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (a("zoom_test_2") || document.body.appendChild(m("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / e.offsetLeft
        }

        function Oe(e, t, n) {
            if (e = a(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
        }

        function Ne(e, t, n) {
            e = a(e);
            try {
                if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== n && !1 !== n || (n = t), e.setSelectionRange) e.setSelectionRange(t, n);
                else if (window.getSelection && document.createRange) {
                    var r = document.createRange();
                    r.selectNodeContents(e), r.collapse(!1);
                    var i = window.getSelection();
                    i.removeAllRanges(), i.addRange(r)
                }
            } catch (e) {}
        }

        function Se(e, t, n) {
            for (e = a(e), n = n || 999; e && !t(e);) {
                if (0 === --n) return !1;
                try {
                    if ((e = A(e)) === document) break
                } catch (t) {
                    e = !1
                }
            }
            return e
        }
        var je = !1;

        function Ie(e) {
            if (!je) return window.document.title = Object(r.replaceEntities)(e)
        }

        function xe(e) {
            je = e, e && window.cur && window.cur.destroy.push(function() {
                xe(!1)
            })
        }

        function Fe() {
            window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
        }
        window.ge = a, window.geByTag = o, window.geByTag1 = s, window.geByClass = c, window.geByClass1 = u, window.gpeByClass = d, window.domQuery = l, window.domQuery1 = f, window.domClosest = _, window.ce = m, window.cf = w, window.re = C, window.se = k, window.sech = T, window.rs = E, window.psr = O, window.domReplaceEl = N, window.domEL = S, window.domNS = j, window.domPS = I, window.domFC = x, window.domLC = F, window.domPN = A, window.domChildren = M, window.domInsertBefore = P, window.domInsertAfter = L, window.domByClass = D, window.domData = R, window.domChildIndex = B, window.domCA = H, window.domClosestSibling = U, window.matchesSelector = q, window.isHover = z, window.isAncestor = W, window.getScroll = G, window.domClosestPositioned = K, window.domClosestOverflowHidden = V, window.show = Y, window.hide = Q, window.isVisible = X, window.clientHeight = $, window.getClientRectOffsetY = J, window.toggle = Z, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = ne, window.isWindow = re, window.getSize = ie, window.hasClass = se, window.addClass = ce, window.addClassDelayed = ue, window.removeClass = de, window.removeClassDelayed = le, window.toggleClass = fe, window.toggleClassDelayed = _e, window.replaceClass = he, window.getStyle = pe, window.setStyle = me, window.setStyleDelayed = ge, window.setPseudoStyle = ve, window.data = be, window.attr = ye, window.removeAttr = we, window.removeData = Ce, window.cleanElems = ke, window.setTitle = Te, window.getZoom = Ee, window.val = Oe, window.elfocus = Ne, window.traverseParent = Se, window.getH = oe, window.getW = ae, window.domClosestByTag = h, window.setDocumentTitle = Ie, window.lockDocumentTitle = xe
    },
    214: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "throttleAccumulate", function() {
            return throttleAccumulate
        }), __webpack_require__.d(__webpack_exports__, "executionStackPop", function() {
            return executionStackPop
        }), __webpack_require__.d(__webpack_exports__, "lplog", function() {
            return lplog
        }), __webpack_require__.d(__webpack_exports__, "toArray", function() {
            return toArray
        }), __webpack_require__.d(__webpack_exports__, "arrayUnique", function() {
            return arrayUnique
        }), __webpack_require__.d(__webpack_exports__, "unpackStore", function() {
            return unpackStore
        }), __webpack_require__.d(__webpack_exports__, "debounce", function() {
            return debounce
        }), __webpack_require__.d(__webpack_exports__, "throttle", function() {
            return throttle
        }), __webpack_require__.d(__webpack_exports__, "shuffle", function() {
            return shuffle
        }), __webpack_require__.d(__webpack_exports__, "parallel", function() {
            return parallel
        }), __webpack_require__.d(__webpack_exports__, "hashCode", function() {
            return hashCode
        }), __webpack_require__.d(__webpack_exports__, "parseJSON", function() {
            return parseJSON
        }), __webpack_require__.d(__webpack_exports__, "checkTextLength", function() {
            return checkTextLength
        });
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6),
            _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81),
            _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);

        function throttleAccumulate(e, t) {
            var n = [],
                r = 0;
            return function(i) {
                n.push(i), r || (r = setTimeout(function() {
                    r = !1, e(n), n = []
                }, t))
            }
        }

        function executionStackPop(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function lplog(e, t) {
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
                    var i = new Date;
                    console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, r, n)
                } catch (e) {}
            }
        }

        function toArray(e) {
            var t = [];
            if (void 0 === e.length) return Object.keys(e).map(function(t) {
                return e[t]
            });
            for (var n = 0; n < e.length; n++) t.push(e[n]);
            return t
        }

        function arrayUnique(e) {
            for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
            return n
        }

        function unpackStore(e) {
            return e.get ? e.get() : e
        }

        function debounce(e, t, n) {
            var r = void 0;
            return function() {
                var i = this,
                    a = arguments,
                    o = n && !r;
                clearTimeout(r), r = setTimeout(function() {
                    r = null, n || e.apply(i, a)
                }, t), o && e.apply(this, a)
            }
        }

        function throttle(e, t) {
            var n = void 0;
            return function() {
                n || (e.apply(this, arguments), n = setTimeout(function() {
                    n = !1
                }, t))
            }
        }

        function shuffle(e) {
            for (var t = e.length; t > 0;) {
                var n = Math.floor(Math.random() * t),
                    r = e[--t];
                e[t] = e[n], e[n] = r
            }
            return e
        }

        function parallel() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                n = new CallHub(t, e.length);
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, t) {
                return t(function() {
                    return n.done()
                })
            })
        }

        function hashCode(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var n = 0, r = e.length; n < r; n++) {
                t = (t << 5) - t + e.charCodeAt(n), t |= 0
            }
            return t
        }

        function parseJSON(obj) {
            if (window.JSON && JSON.parse) try {
                return JSON.parse(obj)
            } catch (e) {
                Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__.topError)("<b>parseJSON:</b> " + e.message, {
                    dt: -1,
                    type: 5,
                    answer: obj
                });
                var evalString = "(" + obj + ")";
                try {
                    return eval(evalString)
                } catch (e) {
                    if (__debugMode) throw e;
                    Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, evalString)
                }
            } else {
                var _evalString = "(" + obj + ")";
                try {
                    return eval(_evalString)
                } catch (e) {
                    if (__debugMode) throw e;
                    Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, _evalString)
                }
            }
        }

        function checkTextLength(e, t, n, r, i, a, o) {
            var s = t.getValue ? t.getValue() : t.value,
                c = t.lastLen || 0;
            if (t.lastLen !== s.length || a) {
                t.lastLen = s.length;
                var u = {
                        "&": 5,
                        "<": 4,
                        ">": 4,
                        '"': 6,
                        "\n": r ? 1 : 4,
                        "\r": 0,
                        "!": 5,
                        "'": 5,
                        $: 6,
                        "\\": 6
                    },
                    d = {
                        1168: 1,
                        1169: 1,
                        8211: 1,
                        8212: 1,
                        8216: 1,
                        8217: 1,
                        8218: 1,
                        8230: 1,
                        8240: 1,
                        8249: 1,
                        8250: 1,
                        8364: 1,
                        8470: 1,
                        8482: 1,
                        65533: 1
                    },
                    l = {
                        1037: 1,
                        1104: 1,
                        1117: 1
                    };
                i && (u[","] = 5);
                var f = function(e) {
                    for (var t = 0, n = 0, r = e.length; n < r; n++) {
                        var i = u[e.charAt(n)],
                            a = e.charCodeAt(n);
                        t += void 0 !== i ? i : !o && a >= 128 && (a < 1025 || l[a] || a > 1119) && !d[a] && (a < 8220 || a > 8222) && (a < 8224 || a > 8226) ? ("&#" + a + ";").length : 1
                    }
                    return t
                }(s);
                if (n = ge(n), f > Math.max(e - 100, .75 * e))
                    if (show(n), f > e)
                        if (i) {
                            var _ = val(t, function(e, t) {
                                for (var n = 0, r = "", i = 0, a = e.length; i < a; i++) {
                                    var s = e.charAt(i),
                                        c = u[s],
                                        f = e.charCodeAt(i);
                                    if ((n += void 0 !== c ? c : !o && f >= 128 && (f < 1025 || l[f] || f > 1119) && !d[f] && (f < 8220 || f > 8222) && (f < 8224 || f > 8226) ? ("&#" + f + ";").length : 1) > t) break;
                                    r += s
                                }
                                return r
                            }(s, Math.min(e, c)));
                            t.lastLen = _.length, n.innerHTML = getLang("text_N_symbols_remain", 0)
                        } else n.innerHTML = getLang("text_exceeds_symbol_limit", f - e);
                else n.innerHTML = getLang("text_N_symbols_remain", e - f);
                else hide(n)
            }
        }
    },
    219: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "canMessageBeEdited", function() {
            return c
        }), n.d(t, "convertEmojiHtmlToRegularText", function() {
            return u
        }), n.d(t, "findLastMessageToEdit", function() {
            return d
        }), n.d(t, "wasMessageReallyModified", function() {
            return l
        }), n.d(t, "replaceMsgAfterEdit", function() {
            return f
        });
        var r = n(160),
            i = n(10),
            a = n(33),
            o = n(140),
            s = n(214);

        function c(e, t) {
            t = Object(r.parserMessage)(t);
            var n = vk.id == t.peerId && !Object(s.unpackStore)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(i.isOut)(t)) && (!Object(i.isServiceMsg)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(i.isGift)(t) || Object(i.isSticker)(t) || Object(i.isAudioMsg)(t) || Object(i.isGraffiti)(t) || Object(i.isMoney)(t) || Object(i.isVKPay)(t)) && !Object(a.isAlreadyDeleted)(e, t.peerId, t.messageId)))))
        }

        function u(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : "@" + e + " (" + t + ")"
            }), t.innerHTML = e, Emoji.val(t)
        }

        function d(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return c(e, t.msgs[n])
            }) || null
        }

        function l(e, t, n) {
            var r = Object(o.convertKludgesToAttaches)(t.kludges, t.messageId),
                i = n.dData.attaches;
            if (u(t.text) !== n.dData.txt || r.length !== i.length) return !0;
            for (var a = r.length; a--;) {
                var s = r[a],
                    c = i[a];
                if (s.id != c.id || s.type != c.type || "poll" == s.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function f(e, t, n, r, i, o) {
            t.origText = n, t.text = Object(a.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = i, t.cancelled_shares = o, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    },
    221: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isWeirdLogging", function() {
            return u
        }), n.d(t, "imWeirdLog", function() {
            return d
        }), n.d(t, "imWeirdCatch", function() {
            return l
        }), n.d(t, "startLoggingAllUnhandled", function() {
            return f
        }), n.d(t, "stopLoggingAllUnhandled", function() {
            return _
        });
        var r = n(0),
            i = n(164),
            a = void 0,
            o = 1;

        function s(e, t, n, r, i) {
            if ("Script error." !== e) {
                var o = i ? i.stack || i.message : null;
                d("unhandled_error", o ? {
                    err: e,
                    stack: o
                } : {
                    err: e
                })
            }
            a && a.apply(this, arguments)
        }

        function c(e) {
            e.preventDefault()
        }

        function u() {
            return !!window.imwl
        }

        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            u() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.retryFn)(r.post, 3, function() {
                return 2
            })("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: o++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function l(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function f() {
            a = window.onerror, window.onerror = s, window.addEventListener("unhandledrejection", c)
        }

        function _() {
            window.onerror = a, a = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    23: function(e, t, n) {
        "use strict";

        function r() {
            window._logTimer = (new Date).getTime()
        }

        function i(e, t) {
            window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
        }

        function a(e) {
            try {
                window.debuglogClient && debuglogClient(e);
                var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
                if (window.console && console.log) {
                    var n = Array.prototype.slice.call(arguments);
                    n.unshift(t), browser.msie || browser.mobile ? console.log(n.join(" ")) : console.log.apply(console, n)
                }
            } catch (e) {}
        }

        function o(e) {
            if (!e) return !1;
            var t = e.tagName,
                n = e.id,
                r = e.className,
                i = (t || "").toLowerCase();
            return r && (i += "." + e.className.replace(/\s+/g, ".")), n && !/^__vk/.test(n) && (i += "#" + e.id), i || (e.toString() || "[NULL]")
        }
        n.r(t), n.d(t, "initDebugTools", function() {
            return r
        }), n.d(t, "logEvalError", function() {
            return i
        }), n.d(t, "debugLog", function() {
            return a
        }), n.d(t, "debugEl", function() {
            return o
        })
    },
    3: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(196),
            _longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93),
            _lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23),
            ACTIVE_TAB_SWITCH_SERVER_TIMEOUT = browser.safari ? 3e3 : 1e4,
            LC_SERVER_SWITCH_TO_ACTIVE_FLAG = "lc_server_switch_to_active_flag";
        window.curNotifier || (window.curNotifier = {
            addQueues: {},
            recvClbks: {},
            recvData: {},
            onConnectionId: []
        }), window.Notifier = {
            debug: !1,
            init: function(e) {
                if (!window.curNotifier || !curNotifier.connection_id) {
                    if (Notifier.notificationsGc(), curNotifier = extend({
                            q_events: [],
                            q_shown: [],
                            q_closed: [],
                            negotiations: {},
                            currentIm: {},
                            q_max: 3,
                            uiNotifications: [],
                            q_idle_max: 5,
                            browser_shown: {},
                            done_events: {},
                            addQueues: curNotifier.addQueues || {},
                            recvClbks: curNotifier.recvClbks || {},
                            recvData: curNotifier.recvData || {},
                            error_timeout: 1,
                            request_timeout: 1e3,
                            sound: new Sound("mp3/bb1"),
                            sound_im: new Sound("mp3/bb2"),
                            sound_im_current: new Sound("mp3/bb3"),
                            onConnectionId: []
                        }, e), !this.initFrameTransport()) return !1;
                    this.initIdleMan(), this.initCommunityQueues(), Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_onTabInitialLoaded)(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
                        id: "notifiers_wrap",
                        className: "fixed"
                    }), ge("page_wrap"))
                }
            },
            initCommunityQueues: function(e) {
                var t = ls.get("im_m_comms_key"),
                    n = t && t.split ? t.split(";") : [];
                if ("empty" === n[0] && n[1] && Date.now() - n[1] < 6e4 ? t = "empty" : "empty" === n[0] && (t = !1), t) return Notifier.proccessCommunityQueues(t, e || 0);
                ajax.post("al_im.php", {
                    act: "a_get_comms_key"
                }, {
                    onDone: function(t) {
                        "empty" === t ? t += ";" + Date.now() : Notifier.proccessCommunityQueues(t, e || 0), ls.set("im_m_comms_key", t)
                    },
                    onFail: function() {
                        return !0
                    }
                })
            },
            notificationsGc: function() {
                curNotifier.uiGcTo = setTimeout(function() {
                    for (var e = curNotifier.uiNotifications, t = [], n = 0; n < e.length; n++) {
                        var r = e[n];
                        vkNow() - r[1] > 1e4 ? r[0].close() : t.push(r)
                    }
                    curNotifier.uiNotifications = t, Notifier.notificationsGc()
                }, 5e3)
            },
            resetCommConnection: function(e) {
                var t = ls.get("im_m_comms_key");
                t && delete curNotifier.addQueues[t.queue], ls.set("im_m_comms_key", !1), Notifier.initCommunityQueues(e || 0)
            },
            proccessCommunityQueues: function(e, t) {
                if ("empty" === e || !e) return !1;
                Notifier.addKey(e, function(e, n) {
                    if (n.failed) ++t < 50 && setTimeout(Notifier.resetCommConnection.pbind(t), 100);
                    else {
                        (e = ls.get("im_m_comms_key")) && (e.ts = n.ts, ls.set("im_m_comms_key", e));
                        var r = n.events;
                        r && r.map(function(e) {
                            return e.split("<!>")
                        }).forEach(function(e) {
                            if ("update_cnt" === e[1]) {
                                var t = e[5],
                                    n = e[4];
                                handlePageCount("mgid" + t, n)
                            }
                        })
                    }
                })
            },
            destroy: function() {
                Notifier.hideAllEvents(), curNotifier.idle_manager.stop(), curNotifier.uiGcTo && clearTimeout(curNotifier.uiGcTo), curNotifier = {}, re("notifiers_wrap"), re("queue_transport_wrap")
            },
            reinit: function() {
                ajax.post("notifier.php?act=a_get_params", {}, {
                    onDone: function(e) {
                        e ? (curNotifier.error_timeout = 1, this.init(e)) : (curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2))
                    }.bind(this),
                    onFail: function() {
                        return curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2), !0
                    }.bind(this)
                })
            },
            standby: function(e) {
                this.destroy(), curNotifier.error_timeout = e || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout)
            },
            freezeEvents: function() {
                curNotifier.frozen = !0, each(curNotifier.q_shown, function() {
                    clearTimeout(this.fadeTO), getStyle(this.baloonEl, "opacity") < 1 && animate(this.baloonEl, {
                        opacity: 1
                    }, 100)
                })
            },
            unfreezeEvents: function() {
                curNotifier.frozen = !1, each(curNotifier.q_shown, function() {
                    this.fadeTO = setTimeout(this.startFading, hasAccessibilityMode() ? 3e4 : 5e3)
                })
            },
            getTransportWrap: function() {
                return ge("queue_transport_wrap") || utilsNode.appendChild(ce("div", {
                    id: "queue_transport_wrap"
                }))
            },
            setFocus: function(e) {
                var t = (e ? "1" : "0") + curNotifier.instance_id;
                "flash" == curNotifier.transport && curNotifier.flash_transport ? curNotifier.flash_transport.setInstanceFocused(t) : "frame" == curNotifier.transport && (Notifier.lcSend("focus", {
                    instance_id: t
                }), this.onInstanceFocus(t))
            },
            initIdleMan: function() {
                curNotifier.idle_manager && curNotifier.idle_manager.started || (curNotifier.idle_manager = new IdleManager({
                    onIdleCb: function() {
                        Notifier.freezeEvents(), Notifier.setFocus(0), cur.onIdle && each(cur.onIdle, function(e, t) {
                            t()
                        })
                    },
                    onUnIdleCb: function() {
                        Notifier.unfreezeEvents(), Notifier.setFocus(1), cur.onUnidle && each(cur.onUnidle, function(e, t) {
                            t()
                        }), FastChat && FastChat.onUnidle(), vk.spentLastSendTS = vkNow()
                    },
                    id: "window",
                    element: document,
                    focusElement: window
                }), curNotifier.idle_manager.start())
            },
            initFrameTransport: function() {
                if (!ls.checkVersion() || browser.msie8 || !("onmessage" in window || "postMessage" in window)) return !1;
                curNotifier.connection_id = "queue_connection_" + curNotifier.queue_id, curNotifier.lc_prev_value = "", curNotifier.is_server = !1, curNotifier.lp_connected = !1, curNotifier.error_timeout = 1;
                var e = browser.version.split("."),
                    t = intval(e[0]),
                    n = intval(e[1]);
                for (var r in curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && t >= 31 || browser.safari && (t > 7 || 7 == t && n >= 1)), curNotifier.transport = "frame", this.lcInit(), curNotifier.onConnectionId) curNotifier.onConnectionId[r]();
                return curNotifier.onConnectionId = [], !0
            },
            onActivated: function() {
                curNotifier.idle_manager && !curNotifier.idle_manager.is_activated ? curNotifier.idle_manager.activate() : curNotifier.idle_manager && curNotifier.idle_manager.is_idle || Notifier.setFocus(1), removeEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
            },
            onConnectionInit: function() {
                addEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
            },
            onConnectionFailed: function() {},
            onRelogin: function() {
                setTimeout(function() {
                    Notifier.standby()
                }, 0)
            },
            onMessage: function onMessage(msg) {
                if (!curNotifier.focus_instance || curNotifier.focus_instance == curNotifier.instance_id) try {
                    var events = eval("(" + msg + ")");
                    Notifier.pushEvents(events)
                } catch (e) {
                    debugLog(e.message)
                }
            },
            onInstanceFocus: function(e) {
                var t = e.charAt(0);
                e = e.substr(1), "1" == t ? (curNotifier.focus_instance = e, e != curNotifier.instance_id && (curNotifier.idle_manager.is_idle || curNotifier.idle_manager.idle(), Notifier.hideAllEvents())) : curNotifier.focus_instance == e && (curNotifier.focus_instance = "")
            },
            onInstanceServer: function(e) {
                curNotifier.is_server = !!e, Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_syncWithNotifier)()
            },
            getLpInstance: function() {
                return Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_getInstance)()
            },
            pushEvents: function(e, t) {
                var n = 0;
                each(e, function(e, r) {
                    n |= Notifier.pushEvent(r, t)
                }), n && !ls.get("sound_notify_off") && curNotifier.is_server && (2 & n ? curNotifier.sound_im.play() : curNotifier.sound.play())
            },
            pushEvent: function pushEvent(msg, cnt) {
                if ("nop" != msg) {
                    try {
                        msg = JSON.parse(msg)
                    } catch (e) {
                        msg = msg.split("<!>")
                    }
                    if (msg[0] != curNotifier.version) return debugLog("Notifier old version"), !1;
                    if ("update_cnt" == msg[1]) return "nws" === msg[3] ? (handlePageCount("ntf", msg[9]), 0) : (handlePageCount(msg[3], msg[4], msg[5], msg[6]), 0);
                    var ev = {
                            type: msg[1],
                            title: msg[2],
                            author_photo: psr(msg[3] || ""),
                            author_link: msg[4] || "",
                            text: psr(msg[5]),
                            add_photo: psr(msg[6]) || "",
                            link: msg[7],
                            onclick: msg[8],
                            add: msg[9],
                            id: msg[10],
                            author_id: msg[11],
                            top_count: msg[12],
                            icon_type: msg[14]
                        },
                        push = cnt ? 0 : 1;
                    if (msg[13]) {
                        var evalExpr = "(" + msg[13] + ")";
                        try {
                            ev.custom = eval(evalExpr)
                        } catch (e) {
                            Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, evalExpr)
                        }
                    }
                    if (!curNotifier.done_events[ev.id]) {
                        switch (curNotifier.done_events[ev.id] = 1, void 0 !== ev.top_count && -1 != ev.top_count && handlePageCount("ntf", ev.top_count), ev.type) {
                            case "video_process_ready":
                                if (ev.add && window.Video && Video.isVideoPlayerOpen(ev.add)) return;
                                break;
                            case "mail":
                                handlePageCount("msg", ev.add);
                                break;
                            case "friend_request":
                                handlePageCount("fr", ev.add);
                                break;
                            case "ach_achieved":
                                handlePageCount("ach", ev.add), ev.author_photo = ev.custom[0];
                                break;
                            case "ach_achieved_upd":
                                handlePageCount("ach", ev.add), push = 0;
                                break;
                            case "bt_upd":
                            case "bt_upd_upd":
                                handlePageCount("bt", ev.add, ev.custom[0], ev.custom[1]), "bt_upd_upd" == ev.type && (push = 0);
                                var bt = ge("bt_tab_updates");
                                bt && val(geByClass1("ui_tab_count", bt), ev.add > 0 ? ev.add : "");
                                break;
                            case "push_settings":
                                push = 0;
                                var muted = JSON.parse(ev.add);
                                curNotifier.mutedPeers = curNotifier.mutedPeers.filter(function(e) {
                                    return e !== muted.peer_id
                                }), 0 !== muted.disabled_until && curNotifier.mutedPeers.push(muted.peer_id);
                                break;
                            case "mail_cnt":
                                handlePageCount("msg", ev.add), push = 0;
                                break;
                            case "clear_notify":
                                TopNotifier && TopNotifier.invalidate(), Notifier.hideAllEvents(), push = 0;
                                break;
                            case "support_reply":
                                handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0);
                                break;
                            case "support_cnt":
                                handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0), push = 0;
                                break;
                            case "balance_changed":
                                updateMoney(ev.add), ev.custom && "app" == ev.custom[0] && cur.app && cur.app.params.api_id == ev.custom[1] && cur.app.balanceUpdated(ev.custom[2]);
                                break;
                            case "gift_sent":
                                re("left_block10_0");
                                var left_block = ev.add;
                                if (left_block) {
                                    var leftBlocksElem = ge("left_blocks"),
                                        left_unpaid_gifts = se(left_block);
                                    leftBlocksElem && (leftBlocksElem.firstChild ? leftBlocksElem.insertBefore(left_unpaid_gifts, leftBlocksElem.firstChild) : leftBlocksElem.appendChild(left_unpaid_gifts))
                                }
                                break;
                            case "call_start":
                                window.Call ? Call.incomingReceive(ev) : stManager.add(["call.js", "call.css", "notifier.css"], function() {
                                    Call.incomingReceive(ev)
                                }), push = 0;
                                break;
                            case "call":
                                window.Call ? Call.processNotify(ev) : debugLog("wnd Call event without call obj"), push = 0;
                                break;
                            case "call_app":
                                var callId = ev.custom.call_id,
                                    onScriptCame = function onScriptCame(script) {
                                        clearTimeout(curNotifier.appCallTimeout), script = !(!script || script[0] != callId) && script[1], script && -1 != script && stManager.add(["call.js", "call.css", "apps.js", "apps.css"], function() {
                                            try {
                                                eval(script)
                                            } catch (e) {
                                                Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, script)
                                            }
                                        })
                                    };
                                curNotifier.appCallTimeout = setTimeout(function() {
                                    var e = curNotifier.recvData.apps_call_receive;
                                    (e = !(!e || e[0] != callId) && e[1]) || (ajax.post("/al_apps.php", {
                                        act: "call_receive"
                                    }, {
                                        onDone: function(e) {
                                            debugLog("script came"), e = [callId, e], Notifier.lcSend("apps_call_receive", e), onScriptCame(e)
                                        },
                                        stat: ["call.js", "call.css", "apps.js", "apps.css"]
                                    }), Notifier.lcSend("apps_call_receive", [callId, -1]))
                                }, 0), Notifier.setRecvClbk("apps_call_receive", onScriptCame), push = 0;
                                break;
                            case "call_app_reject":
                                "app" == cur.module && cur.aid == ev.custom.aid && cur.app.runCallback("onCallReject", ev.custom.key), push = 0;
                                break;
                            case "call_app_accept":
                                "app" == cur.module && cur.aid == ev.custom.aid && cur.app.runCallback("onCallAccept", ev.custom.key), push = 0;
                                break;
                            case "notify_tt":
                            case "login_attempt":
                                if (ev.add) {
                                    var evalText = "(" + ev.add + ")";
                                    try {
                                        ev.add = eval(evalText), TopNotifier.showTooltip(ev.add.text, ev.add.key)
                                    } catch (e) {
                                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, evalText)
                                    }
                                }
                                push = 0;
                                break;
                            case "reload_stickers":
                                window.Emoji && window.Emoji.stickers && (Emoji.stickers = !1), push = 0
                        }
                        return "mail" === ev.type && (push = this.sendMailNotification(ev)), 1 & push && (curNotifier.q_events.push(ev), curNotifier.q_events.length > 30 && curNotifier.q_events.splice(0, curNotifier.q_events.length - 30), this.checkEvents()), push
                    }
                }
            },
            isActive: function() {
                return window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle
            },
            sendImProxy: function(e) {
                e.text = winToUtf(e.text), curNotifier.browser_shown[e.id] || (curNotifier.browser_shown[e.id] = !0, Notifier.trySendBrowserNotification(e, !0), setTimeout(function() {
                    curNotifier.browser_shown[e.id] = void 0
                }, 2e3))
            },
            shouldShowNotification: function(e) {
                return "im" !== cur.module && !FastChat.isChatOpen(e.author_id)
            },
            sendSimpleNotification: function(e) {
                return Notifier.playSound(e), Notifier.shouldShowNotification(e) ? 3 : 0
            },
            sendBrowserNotification: function(e) {
                "im" !== cur.module ? Notifier.negotiate({
                    message: "send_im_notification",
                    onSuccess: function(t) {
                        Notifier.lcSend("negotiate_back", {
                            token: t.msg,
                            ev: e
                        })
                    },
                    onFail: function() {
                        Notifier.showBrowserNotification(e)
                    }
                }) : (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", Notifier.showBrowserNotification(e))
            },
            shouldPlaySound: function(e) {
                return !ls.get("sound_notify_off") && Notifier.shouldDisturb(e)
            },
            shouldDisturb: function(e) {
                return !cur.noDisturbMode && (cur.focused != e.author_id && !inArray(e.author_id, cur.mutedPeers) && !inArray(e.author_id, curNotifier.mutedPeers))
            },
            shouldPlayCurrentSound: function(e) {
                return !ls.get("sound_notify_off") && cur.focused == e.author_id && hasAccessibilityMode() && !inArray(e.author_id, cur.mutedPeers)
            },
            playSound: function(e) {
                curNotifier.sound_im && curNotifier.sound_im.play && Notifier.shouldPlaySound(e) ? e.author_id == cur.peer && hasAccessibilityMode() ? curNotifier.sound_im_current.play() : curNotifier.sound_im.play() : Notifier.shouldPlayCurrentSound(e) && curNotifier.sound_im_current && curNotifier.sound_im_current.play()
            },
            trySendBrowserNotification: function(e, t) {
                Notifier.negotiate({
                    message: "who_is_active",
                    msg: e.author_id,
                    onFail: function() {
                        !Notifier.canNotifyUi() || cur.peer == e.author_id && Notifier.isActive() ? t ? Notifier.playSound(e) : (Notifier.lcSend("show_notification", e), Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0), Notifier.playSound(e)) : Notifier.sendBrowserNotification(e)
                    }
                })
            },
            showBrowserNotification: function(e) {
                Notifier.showEventUi(e), Notifier.playSound(e)
            },
            proxyIm: function(e) {
                if (this.isActive()) return this.playSound(e), void(Notifier.canNotifyUi() && cur.peer != e.author_id && Notifier.shouldDisturb(e) && (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", Notifier.showEventUi(e)));
                curNotifier.is_server ? (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", this.sendImProxy(e)) : curNotifier.is_server || this.lcSend("message_from_im", e)
            },
            sendMailNotification: function(e) {
                if (e.custom.is_call) return 0;
                if ("im" == cur.module ? e.onclick = "IMBRIDGE.activateTab('" + e.author_id + "');" : e.onclick = "FastChat.selectPeer('" + e.author_id + "');", this.isActive() && Notifier.canNotifyUi()) this.playSound(e), this.shouldDisturb(e) && cur.peer != e.author_id && this.showEventUi(e);
                else {
                    if (this.isActive() && this.shouldDisturb(e)) return this.sendSimpleNotification(e);
                    curNotifier.is_server && this.shouldDisturb(e) && this.trySendBrowserNotification(e)
                }
                return 0
            },
            checkEvents: function() {
                if (!(!curNotifier.q_events.length || curNotifier.q_shown.length >= (curNotifier.idle_manager.is_idle ? curNotifier.q_idle_max : curNotifier.q_max) || !curNotifier.idle_manager.is_idle && curNotifier.frozen || cur.noDisturbMode)) {
                    var e = curNotifier.q_events.shift();
                    this.showEvent(e)
                }
            },
            showEvent: function showEvent(ev, force) {
                ev.custom && ev.custom.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__.confirmDelivery)(ev.custom.id), "mail" !== ev.type && Math.random() < .1 && statlogsValueEvent("feed_top_notify_popup", 1, "show", ev.type), curNotifier.q_shown.push(ev);
                var thumbEl = "";
                thumbEl = "video_process_ready" == ev.type ? '<div class="notifier_video_thumb" style="background-image: url(' + Notifier.fixPhoto(ev.author_photo) + ')"></div>' : '<img src="' + Notifier.fixPhoto(ev.author_photo) + '" class="notifier_image" />';
                var typeClassName = "notifier_type_" + ev.type;
                ev.baloonWrapEl = ce("div", {
                    className: "notifier_baloon_wrap",
                    innerHTML: '<div class="notifier_baloon ' + typeClassName + '"><div class="notifier_baloon_head clear_fix"><a class="notifier_close_wrap" role="link" title="' + getLang("global_close") + '" aria-label="' + getLang("global_close") + '"></a><h4 class="notifier_baloon_title">' + ev.title + '</h4></div><div class="notifier_baloon_body clear_fix">' + (ev.author_photo && '<div class="notifier_image_wrap">' + (ev.author_link && '<a href="' + ev.author_link + '">') + thumbEl + (ev.author_link && "</a>") + "</div>") + (ev.add_photo && '<div class="notifier_add_image_wrap"><img src="' + ev.add_photo + '" class="notifier_add_image" /></div>') + '<div class="notifier_baloon_msg wrapped">' + ev.text + "</div></div></div>"
                }), ev.baloonEl = ev.baloonWrapEl.firstChild, ev.closeEl = geByClass1("notifier_close_wrap", ev.baloonEl), addEvent(ev.baloonEl, "mouseover mouseout", function(e) {
                    ev.over = "mouseover" == e.type, ev.over ? Notifier.freezeEvents() : Notifier.unfreezeEvents()
                }), addEvent(ev.baloonEl, "mousedown click", function(event) {
                    event = event.originalEvent || event || window.event;
                    var btn = event.which,
                        nohide = !1;
                    if (1 == btn && (event.ctrlKey || browser.mac && event.metaKey) && (btn = 2, browser.mac && (nohide = !0)), "A" != (event.target || event.srcElement).tagName) {
                        switch ("mail" !== ev.type && Math.random() < .1 && statlogsValueEvent("feed_top_notify_popup", 1, "click", ev.type), btn) {
                            case 1:
                                try {
                                    eval(ev.onclick)
                                } catch (e) {
                                    Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, ev.onclick)
                                }
                                Notifier.trackEvent("click", {
                                    event_id: ev.id
                                }), Notifier.hideEvent(ev);
                                break;
                            case 2:
                                var wnd = window.open(ev.link, "_blank");
                                try {
                                    wnd.blur(), window.focus()
                                } catch (e) {}
                                Notifier.trackEvent("click", {
                                    event_id: ev.id
                                }), nohide || Notifier.hideEvent(ev);
                                break;
                            case 3:
                                if (browser.mozilla) return
                        }
                        return cancelEvent(event)
                    }
                }), addEvent(ev.baloonEl, "contextmenu", function(e) {
                    return setTimeout(function() {
                        Notifier.hideEvent(ev, !1, !1, !0)
                    }, 10), cancelEvent(e)
                }), addEvent(ev.closeEl, "mousedown click", function(e) {
                    return Notifier.hideEvent(ev, !1, !1, !0), cancelEvent(e)
                }), ev.startFading = function() {
                    ev.fading = animate(ev.baloonEl, {
                        opacity: 0
                    }, 1e3, Notifier.hideEvent.bind(Notifier).pbind(ev, !1)), ev.over && ev.fading.stop()
                }, curNotifier.cont.insertBefore(ev.baloonWrapEl, curNotifier.cont.firstChild);
                var h = ev.baloonWrapEl.offsetHeight;
                re(ev.baloonWrapEl), curNotifier.cont.appendChild(ev.baloonWrapEl), setStyle(curNotifier.cont, {
                    bottom: -h
                }), setStyle(ev.baloonWrapEl, {
                    visibility: "visible"
                }), animate(curNotifier.cont, {
                    bottom: 0
                }, 200), curNotifier.idle_manager.is_idle && !force || (ev.fadeTO = setTimeout(ev.startFading, hasAccessibilityMode() ? 35e3 : 7e3))
            },
            trackEvent: function(e, t) {
                ajax.post("al_feed.php", extend({
                    act: "a_feedback_track_event",
                    event: e
                }, t || {}))
            },
            canNotifyUi: function() {
                return !ls.get("im_ui_notify_off") && DesktopNotifications.supported() && DesktopNotifications.checkPermission() <= 0 && !cur.noDisturbMode
            },
            showEventUi: function showEventUi(ev) {
                if (!this.canNotifyUi()) return !1;
                var title, text;
                if (ev.custom && ev.custom.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__.confirmDelivery)(ev.custom.id), "mail" === ev.type) {
                    var div = ce("div");
                    div.innerHTML = ev.text, title = div.firstChild.textContent.trim(), text = stripHTML(replaceEntities(ev.text.replace(/<br\/?>/g, "\n")).replace(/<span class='notifier_author_quote'.*<\/span>(.*?)/, "$1").replace(/<img.*?alt="(.*?)".*?>/gi, "$1")).replace(/&laquo;|&raquo;/gi, '"').trim()
                } else title = ev.title, text = ev.text;
                var notification = ev.uiNotification = DesktopNotifications.createNotification(ev.author_photo, title, text);
                return curNotifier.uiNotifications.push([notification, vkNow()]), notification.onclick = function(e) {
                    if (window.focus(), ev.onclick || ("im" === cur.module ? ev.onclick = "IMBRIDGE.activateTab(" + ev.author_id + ");" : ev.onclick = "FastChat.selectPeer('" + ev.author_id + "');"), "IM" === ev.onclick.substr(0, 2) && "im" !== cur.module) FastChat.selectPeer(intval(ev.author_id));
                    else try {
                        eval(ev.onclick)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, ev.onclick)
                    }
                    Notifier.hideEvent(ev)
                }, notification.onclose = function() {
                    Notifier.hideEvent(ev, !0)
                }, notification.show(), ev.closeTO = setTimeout(Notifier.hideEvent.bind(Notifier).pbind(ev), 5e3), !0
            },
            hideEvent: function(e, t, n, r) {
                clearTimeout(e.closeTO), clearTimeout(e.fadeTO), e.fading && e.fading.stop();
                var i, a = indexOf(curNotifier.q_shown, e); - 1 != a && curNotifier.q_shown.splice(a, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), !0 === r && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (i = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, i - 3), i = 3), 3 == i && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != r && this.checkEvents(), "frame" != curNotifier.transport || n || this.lcSend("hide", {
                    event_id: e.id
                }), !0 !== r && curNotifier.idle_manager.is_idle || curNotifier.q_events.length || curNotifier.q_shown.length || ajax.post("notifier.php", {
                    act: "a_clear_notifier"
                })
            },
            hideAllEvents: function() {
                curNotifier.q_events = [], each(clone(curNotifier.q_shown), function() {
                    Notifier.hideEvent(this, !1, !0, -1)
                }), curNotifier.q_shown = [], curNotifier.q_closed = []
            },
            onEventHide: function(e) {
                e && (each(curNotifier.q_shown, function() {
                    if (this.id == e) return Notifier.hideEvent(this, !1, !0), !1
                }), each(curNotifier.q_events, function(t) {
                    if (this.id == e) return curNotifier.q_events.splice(t, 1), !1
                }))
            },
            lcInit: function() {
                if (curNotifier.post_message) {
                    addEvent(window, "message", this.lcOnMessage.bind(this));
                    var e = curNotifier.storage_el = ce("iframe", {
                        id: "queue_storage_frame",
                        name: "queue_storage_frame",
                        src: "/notifier.php?act=storage_frame&from=" + location.host + (Notifier.debug ? "&debug=" + vkNow() : "&4") + "#" + curNotifier.connection_id
                    });
                    Notifier.getTransportWrap().appendChild(e), curNotifier.storage_frame = e.contentWindow, curNotifier.storage_frame_origin = location.protocol + "//" + locHost
                } else browser.msie && intval(browser.version) < 9 ? addEvent(document, "storage", this.lcOnStorage.bind(this)) : addEvent(window, "storage", this.lcOnStorage.bind(this)), this.lcStart()
            },
            lcStart: function() {
                Notifier.lcCheckServer() ? this.lcServer() : (this.lcSend("check"), clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = setTimeout(this.lcServer.bind(this).pbind(!0), 500)), curNotifier.checkServerInt = setInterval(function() {
                    curNotifier.is_server || (!curNotifier.idle_manager.is_idle && curNotifier.idle_manager.getActiveTime() > ACTIVE_TAB_SWITCH_SERVER_TIMEOUT && (Notifier.debug && debugLog("this tab wants to become server"), ls.set(LC_SERVER_SWITCH_TO_ACTIVE_FLAG, !0), this.lcServer(!0)), vkNow() - curNotifier.last_succ > 8e3 && Notifier.lcCheckServer() && (Notifier.debug && debugLog("timeout"), this.lcServer(!0)))
                }.bind(this), 1e3 + intval(rand(-100, 100))), curNotifier.isServerBroadcastInt = setInterval(function() {
                    curNotifier.is_server && (Notifier.lcCheckServer() ? this.lcSend("check_ok") : (Notifier.debug && debugLog("no server from server broadcast"), this.lcNoServer()))
                }.bind(this), 5e3 + intval(rand(-100, 100))), void 0 !== curNotifier.fc && stManager.add([jsc("web/emoji.js")], function() {
                    FastChat.init(curNotifier.fc)
                })
            },
            lcStop: function() {
                clearInterval(curNotifier.isServerBroadcastInt), clearInterval(curNotifier.checkServerInt), clearTimeout(curNotifier.becomeServerTO)
            },
            lcSend: function(e, t) {
                if (!curNotifier.connection_id) return curNotifier.onConnectionId.push(Notifier.lcSend.pbind(e, t)), !1;
                Notifier.debug && debugLog(curNotifier.instance_id + ": sending", e, t || "");
                var n = extend({
                    __client: curNotifier.instance_id,
                    __act: e,
                    __rnd: Math.random()
                }, t || {});
                if (curNotifier.post_message) try {
                    curNotifier.storage_frame.postMessage(curNotifier.connection_id + ":" + JSON.stringify(n), curNotifier.storage_frame_origin)
                } catch (e) {
                    debugLog(e, e.message, e.stack)
                } else ls.set(curNotifier.connection_id, n)
            },
            lcRecv: function(e) {
                if (!isEmpty(e) && e.__client != curNotifier.instance_id) {
                    var t = e.__act;
                    switch (delete e.__client, delete e.__act, delete e.__rnd, Notifier.debug && debugLog(curNotifier.instance_id + ": recv", t, e), t) {
                        case "new_server":
                            curNotifier.last_succ = vkNow() + 1e3;
                            break;
                        case "feed":
                            curNotifier.timestamp = e.ts, curNotifier.key = e.key, Notifier.pushEvents(e.events, !e.full);
                            break;
                        case "addfeed":
                            Notifier.addFeed(e[0], e[1]);
                            break;
                        case "new_key":
                            debugLog("new key", e), curNotifier.timestamp = e.ts, curNotifier.key = e.key;
                            break;
                        case "new_addkey":
                            var n = e.queue || e.key,
                                r = curNotifier.addQueues[n],
                                i = !r && curNotifier.is_server;
                            r ? r[0] = vkNow() : curNotifier.addQueues[n] = [vkNow(), e.ts, e.key], i && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
                            break;
                        case "clear_addkeys":
                            curNotifier.addQueues = {};
                            break;
                        case "check_ok":
                            curNotifier.last_succ = vkNow(), curNotifier.becomeServerTO && (clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = !1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit());
                            break;
                        case "focus":
                            Notifier.onInstanceFocus(e.instance_id);
                            break;
                        case "hide":
                            Notifier.onEventHide(e.event_id);
                            break;
                        case "check_playlist":
                            var a = ls.get("pad_playlist");
                            a && a.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
                            break;
                        case "who_is_active":
                            Notifier.isActive() && (intval(e.msg) > 2e9 && "im" === cur.module || intval(e.msg) < 2e9) && this.lcSend("negotiate_back", e);
                            break;
                        case "show_notification":
                            Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0);
                            break;
                        case "send_im_notification":
                            if ("im" === cur.module) {
                                var o = Notifier.createNegotiationSlot({
                                    onSuccess: function(e) {
                                        e.ev.onclick = "IMBRIDGE.activateTab(" + e.ev.author_id + ");", Notifier.showBrowserNotification(e.ev)
                                    }
                                });
                                Notifier.lcSend("negotiate_back", {
                                    msg: o.token,
                                    token: e.token
                                })
                            }
                            break;
                        case "negotiate_back":
                            Notifier.endNegotiation(e);
                            break;
                        case "recent_emoji_set":
                            window.Emoji && Emoji.setRecentEmojiList(e);
                            break;
                        case "lp_data":
                            Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.lpSingleton_onNotifierRecv)(e);
                            break;
                        default:
                            if (curNotifier.recvClbks && curNotifier.recvClbks[t])
                                for (var s in curNotifier.recvClbks[t]) curNotifier.recvClbks[t][s](e);
                            else curNotifier.recvData[t] = e
                    }
                    if (curNotifier.is_server) switch (t) {
                        case "new_server":
                        case "new_key":
                        case "check_ok":
                            Notifier.debug && debugLog("no server from lcRecv", t), Notifier.lcNoServer();
                            break;
                        case "check":
                            this.lcSend("check_ok");
                            break;
                        case "message_from_im":
                            Notifier.sendImProxy(e)
                    }
                }
            },
            negotiate: function(e) {
                e = this.createNegotiationSlot(e), this.lcSend(e.message, {
                    token: e.token,
                    msg: e.msg
                })
            },
            createNegotiationSlot: function(e) {
                var t = "negotiations_" + Date.now() + Math.round(rand(0, 1e4));
                return e = extend({
                    timeout: 3e3,
                    token: t,
                    msg: ""
                }, e), curNotifier.negotiations[e.token] = {}, curNotifier.negotiations[e.token].timer = setTimeout(function() {
                    e.onFail && e.onFail(), curNotifier.negotiations[e.token] && (curNotifier.negotiations[e.token] = void 0)
                }, e.timeout), curNotifier.negotiations[e.token].success = e.onSuccess, e
            },
            endNegotiation: function(e) {
                var t = e.token,
                    n = curNotifier.negotiations[t];
                n && (clearTimeout(n.timer), curNotifier.negotiations[t].success && curNotifier.negotiations[t].success(e), curNotifier.negotiations[t] = void 0)
            },
            lcOnStorage: function(e) {
                e = e || window.event, Notifier.debug && debugLog("onstorage", e.key, e.newValue, e);
                var t = e.key,
                    n = e.newValue;
                if (n) {
                    if (t) {
                        if (e.key != curNotifier.connection_id) return
                    } else {
                        if (t = curNotifier.connection_id, (n = localStorage.getItem(t)) == curNotifier.lc_prev_value) return;
                        curNotifier.lc_prev_value = n
                    }
                    this.lcRecv(JSON.parse(n) || {})
                }
            },
            lcOnMessage: function(e) {
                if (e = e || window.event, Notifier.debug && debugLog("onmessage", e.data, e.origin, e), !(e.origin && e.origin != curNotifier.storage_frame_origin || "string" != typeof e.data || e.data.indexOf("q_st"))) {
                    var t, n = e.data.substr(4);
                    if ("ready" == n) curNotifier.storage_frame = e.source, this.lcStart();
                    else {
                        if (-1 == (t = n.indexOf(":")) || n.substr(0, t) != curNotifier.connection_id || !n.substr(t + 1)) return;
                        this.lcRecv(JSON.parse(n.substr(t + 1)))
                    }
                }
            },
            lcServer: function(e) {
                Notifier.debug && debugLog("becoming server"), this.lpInit(), this.lcSend("new_server"), Notifier.lcCheckServer(!0), Notifier.onInstanceServer(1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit()), this.lpStop(), e ? this.lpReset(this.lpStart.bind(this)) : this.lpStart()
            },
            lcNoServer: function() {
                this.lpStop(), curNotifier.is_server && (Notifier.debug && debugLog("not server now"), this.onInstanceServer(0))
            },
            lcCheckServer: function(e) {
                var t, n = "server_" + curNotifier.connection_id,
                    r = vkNow();
                return !(!e && isArray(t = ls.get(n)) && t[0] != curNotifier.instance_id && r - t[1] < 8e3) && (ls.set(n, [curNotifier.instance_id, r]), !0)
            },
            lpInit: function() {
                curNotifier.lpMakeRequest || (delete curNotifier.lpMakeRequest, re("queue_transport_frame"), Notifier.getTransportWrap().appendChild(ce("iframe", {
                    id: "queue_transport_frame",
                    name: "queue_transport_frame",
                    src: curNotifier.frame_path
                })))
            },
            lpStart: function() {
                curNotifier.lp_started = !0, curNotifier.lpInvalid ? Notifier.lpGetKey() : Notifier.lpCheck()
            },
            lpStop: function() {
                curNotifier.lp_started = !1, clearTimeout(curNotifier.lp_check_to), clearTimeout(curNotifier.lp_error_to), clearTimeout(curNotifier.lp_req_check_to)
            },
            lpCheck: function lpCheck() {
                if (curNotifier.lp_started && !curNotifier.lpActive && !curNotifier.lpInvalid) {
                    if (!curNotifier.lpMakeRequest) return clearTimeout(curNotifier.lp_check_to), void(curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1e3));
                    if (!Notifier.lcCheckServer()) return Notifier.debug && debugLog("no server from check"), void this.lcNoServer();
                    var now = vkNow(),
                        add_queues = [],
                        completed = !1,
                        params = {
                            act: "a_check",
                            ts: curNotifier.timestamp,
                            key: curNotifier.key,
                            id: curNotifier.uid,
                            wait: 25
                        };
                    each(curNotifier.addQueues, function(e, t) {
                        if (now - t[0] > 3e4 && !e.match(/nccts/)) return debugLog("drop key", e, now - t[0]), void delete curNotifier.addQueues[e];
                        add_queues.push(e), params.ts += "_" + t[1], params.key += t[2]
                    });
                    var onFail = function(e) {
                        completed || (completed = !0, curNotifier.lpActive = !1, clearTimeout(curNotifier.lp_req_check_to), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout + irand(1e3, 1e4)), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2))
                    }.bind(this);
                    curNotifier.lpActive = !0, clearTimeout(curNotifier.lp_req_check_to), curNotifier.lp_req_check_to = setTimeout(onFail, 1e3 * (params.wait + 5)), curNotifier.lpMakeRequest(curNotifier.frame_url, params, function(text) {
                        if (!completed && (completed = !0, curNotifier.lpActive = !1, curNotifier.lp_started)) {
                            this.lcSend("check_ok");
                            try {
                                var response = eval("(" + text + ")"),
                                    main_response = response,
                                    add_response, add_queue, busy = 0;
                                if (isArray(response))
                                    for (main_response = response.shift();
                                        (add_response = response.shift()) && (add_queue = add_queues.shift(), add_queue);) 2 != add_response.failed || 4 != add_response.err ? (this.lcSend("addfeed", [add_queue, add_response]), this.addFeed(add_queue, add_response), add_response.failed && delete curNotifier.addQueues[add_queue]) : (Notifier.debug && debugLog("!!notifier key busy!! " + curNotifier.instance_id), busy |= 1);
                                else if (response.failed) {
                                    for (; add_queue = add_queues.shift();) this.lcSend("addfeed", [add_queue, response]), this.addFeed(add_queue, response), delete curNotifier.addQueues[add_queue];
                                    this.lcSend("clear_addkeys")
                                }
                                switch (this.lpChecked(main_response)) {
                                    case 0:
                                        break;
                                    case 1:
                                        return;
                                    case 2:
                                        busy |= 2;
                                        break;
                                    default:
                                        return
                                }
                                busy ? ls.get(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) ? ls.remove(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) : this.lcNoServer() : (clearTimeout(curNotifier.lpCheckTO), curNotifier.lpCheckTO = setTimeout(this.lpCheck.bind(this), curNotifier.request_timeout || 1e3), curNotifier.error_timeout = Math.max(1, (curNotifier.error_timeout || 1) / 1.5))
                            } catch (e) {
                                text && -1 == text.indexOf("Ad Muncher") && (topError("Notifier error: " + e.message, {
                                    dt: -1,
                                    type: 5,
                                    stack: e.stack,
                                    answer: text + "\n\nbusy:" + busy + "\nserver:" + curNotifier.is_server + "\ninstance:" + curNotifier.instance_id,
                                    url: curNotifier.frame_url,
                                    query: params && ajx2q(params)
                                }), debugLog(e.message, e.stack, e)), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2)
                            }
                        }
                    }.bind(this), onFail)
                }
            },
            lpChecked: function(e) {
                var t = e.failed;
                if (2 == t) return 4 == e.err ? 2 : (curNotifier.lpInvalid = !0, debugLog("notifier lpCheck error", e), clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), 1 == e.err ? 1 : 3);
                if (t) throw getLang("global_unknown_error");
                return this.lcSend("feed", extend({
                    full: curNotifier.idle_manager && curNotifier.idle_manager.is_idle && !this.canNotifyUi(),
                    key: curNotifier.key
                }, e)), curNotifier.timestamp = e.ts, Notifier.pushEvents(e.events), 0
            },
            lpOnReset: function() {
                curNotifier.lpOnReset && curNotifier.lpOnReset()
            },
            lpReset: function(e) {
                curNotifier.lpOnReset = e, clearTimeout(curNotifier.resetTO), curNotifier.resetTO = setTimeout(function() {
                    if (!curNotifier.is_server || curNotifier.lp_started)
                        if (curNotifier.lpMakeRequest && !curNotifier.lpInvalid) {
                            var e = curNotifier.key,
                                t = curNotifier.timestamp;
                            each(curNotifier.addQueues, function(n, r) {
                                e += r[2], t += "_" + r[1]
                            }), curNotifier.lpMakeRequest(curNotifier.frame_url, {
                                act: "a_release",
                                key: e,
                                ts: t,
                                id: curNotifier.uid,
                                wait: 25
                            }, Notifier.lpOnReset, Notifier.lpOnReset)
                        } else ajax.post("notifier.php?act=a_reset", !1, {
                            onDone: Notifier.lpOnReset,
                            onFail: function() {
                                return Notifier.lpOnReset(), !0
                            }
                        });
                    else Notifier.lpStart()
                }, 100)
            },
            lpGetKey: function() {
                ajax.post("notifier.php?act=a_get_key", {
                    id: curNotifier.uid
                }, {
                    onDone: function(e, t) {
                        curNotifier.timestamp = t, curNotifier.key = e, curNotifier.lpInvalid = !1, debugLog("notifier lpGetKey done"), this.lcSend("new_key", {
                            ts: t,
                            key: e
                        }), this.lpCheck()
                    }.bind(this),
                    onFail: function(e) {
                        switch (debugLog("notifier lpGetKey fail", e), e) {
                            case 1:
                            case 3:
                                return void Notifier.standby();
                            case 4:
                                return void Notifier.standby(300);
                            case 2:
                                return void Notifier.onRelogin()
                        }
                        return curNotifier.error_timeout = 64, clearTimeout(this.lp_error_to), this.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), !0
                    }.bind(this)
                })
            },
            addKey: function(e, t, n) {
                if (curNotifier.flash_transport || !e) return !1;
                var r = e.queue || e.key,
                    i = curNotifier.addQueues[r],
                    a = !i && curNotifier.is_server;
                return i ? (i[0] = vkNow(), i[3] = t, i[4] = n) : curNotifier.addQueues[r] = [vkNow(), e.ts, e.key, t, n], n || Notifier.lcSend("new_addkey", e), a && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
            },
            addFeed: function(e, t) {
                var n = curNotifier.addQueues[e];
                isArray(n) && n.length && (n[1] = t.ts, isFunction(n[3]) && n[3](e, t))
            },
            addRecvClbk: function(e, t, n, r) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] || (curNotifier.recvClbks[e] = {}), curNotifier.recvClbks[e][t] && !r || (curNotifier.recvClbks[e][t] = n)
            },
            setRecvClbk: function(e, t) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] = [t]
            },
            fixPhoto: function(e, t) {
                return -1 == (e = clean(e)).indexOf("question_c.gif") ? e : t ? "/images/question_inv_xc.png" : "/images/question_inv_c.png"
            }
        }
    },
    30: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "lpLogFc", function() {
            return a
        }), n.d(t, "longpollTesting_onFcEvents", function() {
            return f
        }), n.d(t, "longpollTesting_onImEvents", function() {
            return _
        });
        var r = n(221);

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function a(e, t) {
            var n;
            if (window.vk.lpConfig.debug) {
                for (var r = "background: " + e + "; color: white", i = new Date, a = function(e) {
                        return e < 10 ? "0" + e : e
                    }, o = arguments.length, s = Array(o > 2 ? o - 2 : 0), c = 2; c < o; c++) s[c - 2] = arguments[c];
                (n = console).log.apply(n, ["%c " + i.getHours() + ":" + a(i.getMinutes()) + ":" + a(i.getSeconds()) + ":" + i.getMilliseconds() + " " + t + " ", r].concat(s))
            }
        }

        function o() {
            return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
        }

        function s() {
            return window.lpBufferIm || (window.lpBufferIm = []), window.lpBufferIm
        }

        function c(e, t) {
            window.lpWeird || (window.lpWeird = []), window.lpWeird.push({
                msg: e,
                ev: t,
                is_master: window.curNotifier.is_server
            }), setTimeout(u, 1e4)
        }

        function u() {
            window.lpWeird.length && (Object(r.imWeirdLog)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function d() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function l() {
            var e;
            d() && (s().forEach(function(e) {
                !o().find(function(t) {
                    return e.ev === t.ev
                }) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, a("red", "im not fc", e.ev), Object(r.isWeirdLogging)() && c("im not fc", e.ev))
            }), o().forEach(function(e) {
                var t = s().find(function(t) {
                    return t.ev === e.ev
                });
                t && t.warned && !e.warned && (e.warned = !0, a("red", "now fc like im", e.ev), Object(r.isWeirdLogging)() && c("now fc like im", e.ev))
            })), e = Date.now() - 3e4, window.lpBufferFc = o().filter(function(t) {
                return t.time > e
            }), window.lpBufferIm = s().filter(function(t) {
                return t.time > e
            })
        }

        function f(e) {
            var t;
            d() && ((t = o()).push.apply(t, i(e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            }))), setTimeout(l, 0));
            a.apply(void 0, ["green", "fc"].concat(i(e)))
        }

        function _(e) {
            var t;
            d() && ((t = s()).push.apply(t, i(e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            }))), setTimeout(l, 1100));
            a.apply(void 0, ["blue", "im"].concat(i(e)))
        }
        window.longpollTesting_onImEvents = _
    },
    33: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "SENDING_CLASS", function() {
            return C
        }), n.d(t, "FAILED_CLASS", function() {
            return k
        }), n.d(t, "ORIGINAL_CLASS", function() {
            return T
        }), n.d(t, "RESTORE_CLASS", function() {
            return E
        }), n.d(t, "TYPING_CLASS", function() {
            return O
        }), n.d(t, "CREATE_CHAT_ACTION", function() {
            return N
        }), n.d(t, "CHAT_TITLE_ACTION", function() {
            return S
        }), n.d(t, "CHAT_INVITE_USER", function() {
            return j
        }), n.d(t, "CHAT_KICK_USER", function() {
            return I
        }), n.d(t, "CHAT_PHOTO_UPDATE", function() {
            return x
        }), n.d(t, "CHAT_PHOTO_REMOVE", function() {
            return F
        }), n.d(t, "CHAT_PIN_MESSAGE", function() {
            return A
        }), n.d(t, "CHAT_UNPIN_MESSAGE", function() {
            return M
        }), n.d(t, "CHAT_INVITE_BY_LINK", function() {
            return P
        }), n.d(t, "DESELECT_ALL_CLASS", function() {
            return L
        }), n.d(t, "SHOW_CHAT_MEMBERS_CLASS", function() {
            return D
        }), n.d(t, "HIDE_TOP_NOTICE_CLASS", function() {
            return R
        }), n.d(t, "HIDE_ASIDE_NOTICE_CLASS", function() {
            return B
        }), n.d(t, "HIDE_ASIDE_PROMO_BLOCK_CLASS", function() {
            return H
        }), n.d(t, "INSTALL_VKADMIN_LINK", function() {
            return U
        }), n.d(t, "CLEAR_RECENT_CLASS", function() {
            return q
        }), n.d(t, "MESSAGE_SEARCH_CLASS", function() {
            return z
        }), n.d(t, "PINNED_CONTAINER_CLASS", function() {
            return W
        }), n.d(t, "getClassicChatHeight", function() {
            return Ke
        }), n.d(t, "setClassicChatHeight", function() {
            return Ve
        }), n.d(t, "fixTableCellChildHeight", function() {
            return Ye
        }), n.d(t, "applyInnerHtml", function() {
            return Qe
        }), n.d(t, "compensateHistoryHeightChange", function() {
            return Xe
        }), n.d(t, "renderSticker", function() {
            return $e
        }), n.d(t, "isAlreadyDeleted", function() {
            return Je
        }), n.d(t, "replaceMessageAttrs", function() {
            return Ze
        }), n.d(t, "isVoiceMessageAvailable", function() {
            return et
        }), n.d(t, "getAvailableMicrophones", function() {
            return tt
        }), n.d(t, "renderAttach", function() {
            return nt
        }), n.d(t, "dayFromVal", function() {
            return rt
        }), n.d(t, "showInvisibleBar", function() {
            return it
        }), n.d(t, "updateMessageInCache", function() {
            return at
        }), n.d(t, "editAndReplaceMessage", function() {
            return ot
        }), n.d(t, "renderMessage", function() {
            return st
        }), n.d(t, "renderMessageMedia", function() {
            return ct
        }), n.d(t, "ensureDomHasActions", function() {
            return ut
        }), n.d(t, "renderCallMessage", function() {
            return dt
        }), n.d(t, "appendToHistory", function() {
            return lt
        }), n.d(t, "restoreQueue", function() {
            return ft
        }), n.d(t, "markMessagesAsRead", function() {
            return _t
        }), n.d(t, "replaceAttaches", function() {
            return ht
        }), n.d(t, "isDuplicate", function() {
            return pt
        }), n.d(t, "isContactPeer", function() {
            return mt
        }), n.d(t, "isPeerActive", function() {
            return gt
        }), n.d(t, "isFvkcomgroup", function() {
            return vt
        }), n.d(t, "isTabLoaded", function() {
            return bt
        }), n.d(t, "isTabLoadedWithMessage", function() {
            return yt
        }), n.d(t, "parseMessage", function() {
            return Tt
        }), n.d(t, "convertPeerToUrl", function() {
            return Et
        }), n.d(t, "unUrlPeer", function() {
            return Ot
        }), n.d(t, "simplifyCounter", function() {
            return Nt
        }), n.d(t, "chatActions", function() {
            return St
        }), n.d(t, "renderPhotos", function() {
            return xt
        }), n.d(t, "renderPhotosFromTab", function() {
            return Ft
        }), n.d(t, "renderBtnSearchOnlyMessages", function() {
            return At
        }), n.d(t, "renderMessagesSep", function() {
            return Mt
        }), n.d(t, "renderConversationsSep", function() {
            return Pt
        }), n.d(t, "renderPopularSuggSep", function() {
            return Lt
        }), n.d(t, "renderClearRecent", function() {
            return Dt
        }), n.d(t, "renderPopularSuggestions", function() {
            return Rt
        }), n.d(t, "setMessageError", function() {
            return Bt
        }), n.d(t, "startResendMessage", function() {
            return Ht
        }), n.d(t, "removeMessages", function() {
            return Ut
        }), n.d(t, "removeStartingFromMessage", function() {
            return zt
        }), n.d(t, "removeMessagesWithRestore", function() {
            return Wt
        }), n.d(t, "restoreMessage", function() {
            return Gt
        }), n.d(t, "formatTyper", function() {
            return Kt
        }), n.d(t, "loadSummaryActivityType", function() {
            return Vt
        }), n.d(t, "renderEmptySearch", function() {
            return Qt
        }), n.d(t, "serviceLink", function() {
            return Xt
        }), n.d(t, "renderServiceMsg", function() {
            return $t
        }), n.d(t, "addChatPhotoToUpdate", function() {
            return Jt
        }), n.d(t, "replaceSpecialSymbols", function() {
            return Zt
        }), n.d(t, "isSelfMessage", function() {
            return en
        }), n.d(t, "showVerifiedTooltip", function() {
            return tn
        }), n.d(t, "wrapLoading", function() {
            return nn
        }), n.d(t, "tabFromIds", function() {
            return rn
        }), n.d(t, "checkSelectClick", function() {
            return an
        }), n.d(t, "renderGoTo", function() {
            return on
        }), n.d(t, "showFlushChat", function() {
            return sn
        }), n.d(t, "showLeaveDialog", function() {
            return cn
        }), n.d(t, "showUnpinDialog", function() {
            return un
        }), n.d(t, "showMsgDeleteDialog", function() {
            return dn
        }), n.d(t, "cleanHistory", function() {
            return ln
        }), n.d(t, "showChatMembers", function() {
            return fn
        }), n.d(t, "inviteUser", function() {
            return _n
        }), n.d(t, "showUnreadOnly", function() {
            return hn
        }), n.d(t, "changeTab", function() {
            return pn
        }), n.d(t, "isImportant", function() {
            return mn
        }), n.d(t, "isUnrespond", function() {
            return gn
        }), n.d(t, "isPeerBlocked", function() {
            return vn
        }), n.d(t, "isPendingForward", function() {
            return bn
        }), n.d(t, "isPeerBlockedByMe", function() {
            return yn
        }), n.d(t, "blockLatencyCompensation", function() {
            return wn
        }), n.d(t, "showSpamLayer", function() {
            return Cn
        }), n.d(t, "getLastSeenTextInHeader", function() {
            return kn
        }), n.d(t, "getLastSeenText", function() {
            return Tn
        }), n.d(t, "showBlacklistBoxUser", function() {
            return On
        }), n.d(t, "showBlacklistBox", function() {
            return Nn
        }), n.d(t, "getBaseLink", function() {
            return Sn
        }), n.d(t, "showFavvedBox", function() {
            return jn
        }), n.d(t, "isEditableFocused", function() {
            return In
        }), n.d(t, "updateStar", function() {
            return xn
        }), n.d(t, "removewNewUnreadBarAndMerge", function() {
            return Fn
        }), n.d(t, "isMessagesVisible", function() {
            return An
        }), n.d(t, "hideTopNotice", function() {
            return Mn
        }), n.d(t, "hideAsideNotice", function() {
            return Pn
        }), n.d(t, "hideAsidePromoBlock", function() {
            return Ln
        }), n.d(t, "installVKAdminApp", function() {
            return Dn
        }), n.d(t, "renderShortText", function() {
            return Rn
        }), n.d(t, "attachToText", function() {
            return Bn
        }), n.d(t, "lockButton", function() {
            return Hn
        }), n.d(t, "unlockButton", function() {
            return Un
        }), n.d(t, "renderPinnedMessage", function() {
            return qn
        }), n.d(t, "renderPinnedMedia", function() {
            return zn
        }), n.d(t, "showEditTimeTooltip", function() {
            return Wn
        }), n.d(t, "getPinnedMessageHeight", function() {
            return Gn
        }), n.d(t, "boxHandleEditTimeTooltips", function() {
            return Kn
        }), n.d(t, "showPinnedBox", function() {
            return Vn
        }), n.d(t, "showRepliedBox", function() {
            return Yn
        }), n.d(t, "isUserAliveInChat", function() {
            return Qn
        }), n.d(t, "getAliveMembersCount", function() {
            return Xn
        }), n.d(t, "normalizeTab", function() {
            return $n
        }), n.d(t, "normalizeTabsGotFromServer", function() {
            return Jn
        }), n.d(t, "splitMessageToParts", function() {
            return Zn
        }), n.d(t, "isMessageTooLong", function() {
            return er
        }), n.d(t, "showInvitationBox", function() {
            return tr
        }), n.d(t, "showWaitUntilUploadedBox", function() {
            return nr
        }), n.d(t, "canMessageBeDeletedForAll", function() {
            return rr
        }), n.d(t, "getTopChatMembers", function() {
            return ir
        }), n.d(t, "getChatMembersByIds", function() {
            return ar
        }), n.d(t, "getChatMembers", function() {
            return or
        }), n.d(t, "formatTimespan", function() {
            return sr
        }), n.d(t, "focusOnMessage", function() {
            return cr
        }), n.d(t, "getNowEditingMessage", function() {
            return ur
        });
        var r = n(136),
            i = n(207),
            a = n(179),
            o = n(40),
            s = n(160);
        n.d(t, "getFirstUnread", function() {
            return s.getFirstUnread
        }), n.d(t, "isSearchShown", function() {
            return s.isSearchShown
        }), n.d(t, "getPeer", function() {
            return s.getPeer
        }), n.d(t, "getCurrentKeyboard", function() {
            return s.getCurrentKeyboard
        }), n.d(t, "getKeyboard", function() {
            return s.getKeyboard
        }), n.d(t, "getTab", function() {
            return s.getTab
        }), n.d(t, "getCurrentTab", function() {
            return s.getCurrentTab
        }), n.d(t, "getSelectedMessages", function() {
            return s.getSelectedMessages
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return s.getMessageRangeFromSelection
        }), n.d(t, "countUnread", function() {
            return s.countUnread
        }), n.d(t, "getMessageByRid", function() {
            return s.getMessageByRid
        }), n.d(t, "isRidExist", function() {
            return s.isRidExist
        }), n.d(t, "getLocalId", function() {
            return s.getLocalId
        }), n.d(t, "getLastMessage", function() {
            return s.getLastMessage
        }), n.d(t, "parserMessage", function() {
            return s.parserMessage
        }), n.d(t, "getAuthorFullName", function() {
            return s.getAuthorFullName
        }), n.d(t, "getMessage", function() {
            return s.getMessage
        }), n.d(t, "getPreviousMessage", function() {
            return s.getPreviousMessage
        }), n.d(t, "isClassicInterface", function() {
            return s.isClassicInterface
        }), n.d(t, "isLocksAvailable", function() {
            return s.isLocksAvailable
        }), n.d(t, "isFoldersAvailable", function() {
            return s.isFoldersAvailable
        }), n.d(t, "isCommunityInterface", function() {
            return s.isCommunityInterface
        }), n.d(t, "isChannel", function() {
            return s.isChannel
        }), n.d(t, "getBareTab", function() {
            return s.getBareTab
        }), n.d(t, "isReversedDialogs", function() {
            return s.isReversedDialogs
        }), n.d(t, "isFullyLoadedTab", function() {
            return s.isFullyLoadedTab
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return s.makeTabNotFullyLoaded
        }), n.d(t, "isGoToEndVisible", function() {
            return s.isGoToEndVisible
        }), n.d(t, "getUnreadScrollBottom", function() {
            return s.getUnreadScrollBottom
        }), n.d(t, "isSendingAvailable", function() {
            return s.isSendingAvailable
        }), n.d(t, "isCommunityPeer", function() {
            return s.isCommunityPeer
        }), n.d(t, "isCommunityBlocked", function() {
            return s.isCommunityBlocked
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return s.checkVoiceMessageAvailable
        }), n.d(t, "isSearching", function() {
            return s.isSearching
        }), n.d(t, "getSearchText", function() {
            return s.getSearchText
        }), n.d(t, "isSearchingValue", function() {
            return s.isSearchingValue
        }), n.d(t, "isRecentSearchesActive", function() {
            return s.isRecentSearchesActive
        }), n.d(t, "getPinnedMessage", function() {
            return s.getPinnedMessage
        }), n.d(t, "doPopularSuggExist", function() {
            return s.doPopularSuggExist
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return s.isAnyMessageBeingEdited
        }), n.d(t, "getGroupId", function() {
            return s.getGroupId
        }), n.d(t, "getTabDraft", function() {
            return s.getTabDraft
        }), n.d(t, "getTemplates", function() {
            return s.getTemplates
        });
        var c = n(10),
            u = n(196),
            d = n(140);
        n.d(t, "isChatPeer", function() {
            return d.isChatPeer
        }), n.d(t, "isUserPeer", function() {
            return d.isUserPeer
        }), n.d(t, "isReservedPeer", function() {
            return d.isReservedPeer
        });
        var l = n(37),
            f = n(214),
            _ = n(208),
            h = n(16),
            p = n(219),
            m = n(92),
            g = n(221),
            v = n(120),
            b = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function w(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var C = "_im_mess_sending",
            k = "_im_mess_failed",
            T = "_im_mess_original",
            E = "_im_mess_restore",
            O = "_im_typing",
            N = "chat_create",
            S = "chat_title_update",
            j = "chat_invite_user",
            I = "chat_kick_user",
            x = "chat_photo_update",
            F = "chat_photo_remove",
            A = "chat_pin_message",
            M = "chat_unpin_message",
            P = "chat_invite_user_by_link",
            L = "_im_deselect_all",
            D = "_im_show_chat_mems",
            R = "_im_top_notice_hide",
            B = "_im_aside_notice_hide",
            H = "_im_aside_promo_block_hide",
            U = "_im_vkadmin_promo_link",
            q = "_im_clear_recent",
            z = "_im_mess_search",
            W = "_im_pinned",
            G = window,
            K = G.vk,
            V = G.ls,
            Y = G.se,
            Q = G.re,
            X = G.rs,
            $ = G.sech,
            J = G.inArray,
            Z = G.intval,
            ee = G.trim,
            te = G.stripHTML,
            ne = G.domFC,
            re = G.domPS,
            ie = G.domLC,
            ae = G.domChildren,
            oe = G.domClosestSibling,
            se = G.domData,
            ce = G.geByClass,
            ue = G.geByClass1,
            de = G.gpeByClass,
            le = G.addClass,
            fe = G.removeClass,
            _e = G.toggleClass,
            he = G.hasClass,
            pe = G.attr,
            me = G.setStyle,
            ge = G.val,
            ve = G.getTemplate,
            be = G.getLang,
            ye = G.langSex,
            we = G.langDate,
            Ce = G.langNumeric,
            ke = G.getDateText,
            Te = G.getSmDate,
            Ee = G.getShortDate,
            Oe = G.isSameDate,
            Ne = G.isToday,
            Se = G.ajax,
            je = G.showBox,
            Ie = G.showFastBox,
            xe = G.showTabbedBox,
            Fe = G.showTooltip,
            Ae = G.mobPlatforms,
            Me = G.onlinePlatformClass,
            Pe = G.AudioMessagePlayer,
            Le = G.Emoji,
            De = G.slideUp,
            Re = G.fadeOut,
            Be = G.cancelEvent,
            He = G.fifaReplaceText,
            Ue = 4096,
            qe = 100,
            ze = 8,
            We = 52,
            Ge = "chatPosition";

        function Ke() {
            return V.get(Ge) || 0
        }

        function Ve(e) {
            e >= window.clientHeight() - 30 && (e = 0), V.set(Ge, e)
        }

        function Ye(e, t) {
            var n = ue(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && me(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Qe(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Xe(e, t, n, r) {
            var i = t && !n ? 1 : !t && n ? -1 : 0;
            i && !Object(s.isClassicInterface)(e) && r().compensateHistoryHeightChange(i)
        }

        function $e(e, t, n, r) {
            var i = window.devicePixelRatio >= 2 ? "256" : "128",
                a = "animation" === n,
                o = "im_gift";
            a && (o += " sticker_img");
            var s = '<img height="128" class="' + o + '" src="' + Stickers.getStickerUrl(Z(e), i) + '"/>';
            if (a) {
                var c = "animatedSticker" + r;
                s = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + ("/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e) + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + Z(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + s + "</div>";
                var u = !1;
                browser.msie ? (0 ^ r) === r && (u = !0) : u = Number.isInteger(r), u && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (s = '<a onmouseover="return Emoji.stickerOver(' + Z(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + Z(t) + ', this, event);">' + s + "</a>"), s = '<div class="im_sticker_row">' + s + "</div>"
        }

        function Je(e, t, n) {
            var r = e.get ? e.get() : e;
            if (bt(r, t)) {
                var i = r.tabs[t].deleted || [];
                return J(n, i)
            }
            return !1
        }

        function Ze(e, t, n) {
            var r = n.randomId,
                i = ue("_im_mess_rid" + r, t);
            return i && (t = lt(e, n, t = qt([i], t), !0, !1)), t
        }

        function et(e) {
            var t = Object(s.checkVoiceMessageAvailable)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : tt().then(function(e) {
                return e.length > 0
            }).catch(function(e) {
                return !1
            })
        }

        function tt() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function nt(e) {
            return ve("im_preloader", {
                preloader: X(K.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function rt(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function it(e) {
            var t = ue("_im_invisible_bar", e);
            t && (fe(t, "_im_invisible_bar"), fe(t, "im-page--history-new-bar_hide"))
        }

        function at(e, t, n) {
            var r = se(n, "msgid"),
                i = ue("_im_mess_" + r, t),
                a = n.cloneNode(!0);
            return i && (i.parentNode.replaceChild(a, i), ut(t)), t
        }

        function ot(e, t, n) {
            var r = st(e, t),
                i = ue("_im_mess_" + t.messageId, n);
            return i && (i.parentNode.replaceChild(Y(r), i), ut(n)), n
        }

        function st(e, t) {
            var n = ["_im_mess"],
                r = Object(c.isUnread)(e.tabs[t.peerId], t),
                i = Object(c.hasReply)(t) ? ve("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: nt("reply"),
                    text: ""
                }) : "";
            Object(c.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(c.isOut)(t) && n.push("im-mess_out"), Object(c.wasEdited)(t) && n.push("im-mess_was_edited"), Object(p.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), Object(c.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var a = Date.now() - 1e3 * t.date > 1e3;
            t.local && a && n.push("im-mess_sending"), t.local && n.push("" + C), t.local && Object(c.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + k), Object(c.isGift)(t) && n.push("im-mess_gift");
            var o = ct(t),
                s = i + Tt(e, t.text, t.kludges, !1, t.peerId);
            "" != s && Object(c.wasEdited)(t) && (s += ve("sImLblWasEdited", {
                update_time: t.update_time
            })), t.subject && "..." !== t.subject.trim() && !Object(d.isChatPeer)(t.peerId) && (s = ve("im_topic", {
                topic: t.subject
            }) + s);
            var u = ve("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: o.join(""),
                text: Object(c.isGift)(t) ? '<div class="im-mess--gift-lbl">' + s + "</div>" : ""
            });
            return Object(c.isGift)(t) || (u = s + u), "" == s && Object(c.wasEdited)(t) && (u += ve("sImLblWasEdited", {
                update_time: t.update_time
            })), ve("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                text: u,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + be("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + be("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            })
        }

        function ct(e) {
            return e.attaches.reduce(function(t, n) {
                return !Object(c.hasReply)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push($e(n.id, n.productId, n.kind, e.messageId)) : t.push($e(n.id, n.productId)) : t.push(nt(n.type)), t) : t
            }, [])
        }

        function ut(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) he(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", ve("sImHistoryRowActions")), fe(t[n], "_im_mess_noa")
        }

        function dt(e, t, n) {
            var r, i, a, o, s, c = K.id,
                u = e.attaches[0],
                d = u.initiatorId,
                l = u.state,
                f = u.receiverId,
                h = void 0;
            switch (l) {
                case "reached":
                    h = be(c === d ? "mail_call_outgoing" : "mail_call_incoming");
                    var p = t ? "" : (r = u.duration, i = Math.floor(r / 3600), a = Math.floor(r / 60) - 60 * i, o = !1, s = !1, [i, a, r - 3600 * i - 60 * a].reduce(function(e, t) {
                        return 0 !== t || s ? (o && (t = t < 10 ? "0" + t : t), o = !0, s = !0, e + ("" !== e ? ":" : "") + t) : (s = !0, e)
                    }, ""));
                    h = h.replace("{duration}", p);
                    break;
                case "canceled_by_initiator":
                    h = be(c === d ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (c === d) {
                        if (t) return be("mail_call_declined");
                        var m = Object(_.oCacheGet)(n, f);
                        return m ? ye(m.sex, be("mail_call_declined_by", "raw")).replace("{user_name}", m.first_name) : be("mail_call_declined")
                    }
                    return be("mail_call_canceled");
                default:
                    h = be("mail_added_call")
            }
            return ve("im_calls_link", {
                text: h
            })
        }

        function lt(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                i = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                a = Date.now() - 1e3 * t.date > 1e3,
                o = e.tabs[t.peerId];
            if (!n || ue("_im_mess", n) || ue("_im_bar_date", n) || (n.innerHTML = ""), o.skipped > 0) return n;
            var u = [];
            t.local || (u = e.imQueue(t.peerId, r)), u.length > 0 && qt(u.map(function(e) {
                return ue("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var l = st(e, t),
                h = ie(n);
            he(h, "_im_mess_stack") || (h = oe(h, "._im_mess_stack", -1));
            for (var p = Object(s.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && p && !ue("_im_mess_" + p.messageId);) p = Object(s.getLastMessage)(e, t.peerId, p.messageId);
            var m = ue("_im_unread_bar_row", n),
                g = Object(c.getUserId)(t),
                v = p ? wt(p.date, e) : 0;
            if (!p || Ct(o, p, t, e, i)) {
                var b = "",
                    y = !1;
                if (m && Object(c.isOut)(t) && Fn(e, n, t.peerId), 1 === o.unread && !Object(c.isOut)(t) && i && (b += ve("im_mess_bar", {}), y = !0, Fn(e, n, t.peerId)), !Ne(new Date(v))) {
                    var w = new Date,
                        k = y ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    b += ve("im_day_bar", {
                        day: Ee(t.date, e.timeshift, !0, be("months_of", "raw"), !0),
                        date: t.date,
                        day_class: w.getDate() + w.getMonth() + w.getFullYear() + " " + k
                    })
                }
                if (Object(c.isServiceMsg)(t)) b += ve("im_service_row", {
                    text: $t(e, t, o),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(c.isCallMessage)(t)) b += ve("im_service_row", {
                    text: Xt("", dt(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var T = e.gid && Object(c.isOut)(t) ? Z(t.kludges.from_admin) || -e.gid : 0,
                        E = Object(_.oCacheGet)(e, T ? -e.gid : g) || o,
                        O = Object(d.isChatPeer)(t.peerId) ? E.name : E.first_name,
                        N = E.link || o.href,
                        S = ve("im_mess_stack_name", {
                            name: O,
                            link: N,
                            class: Object(c.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(c.isGift)(t)) {
                        var j = be("mail_gift_message_sent", "raw");
                        S += ' <span class="im-mess-stack--gift">' + ye(E.sex || 0, j) + "</span>"
                    }
                    if (Object(c.isMoney)(t)) {
                        var I = Object(c.isMoneyRequest)(t) ? be("mail_money_request_message_sent", "raw") : be("mail_money_tranfer_message_sent", "raw");
                        S += ' <span class="im-mess-stack--money-transfer">' + ye(E.sex || 0, I) + "</span>"
                    }
                    var x = e.gid ? "/gim" + e.gid : "/im",
                        F = void 0;
                    if (F = t.local ? kt(t.date, e.timeshift) : ve("im_stack_date", {
                            date: kt(t.date, e.timeshift),
                            link: x + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), T && e.admins[T]) {
                        var A = e.admins[T],
                            M = T === K.id ? be("mail_by_you") : A[0];
                        F = F + " " + ve("im_admin_link", {
                            name: M,
                            href: A[1]
                        })
                    }
                    b += ve("im_mess_stack", {
                        photo: E.photo,
                        href: N,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: te(S),
                        stack_name: S,
                        peerId: g,
                        date: F,
                        messages: l,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(f.toArray)($(b)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else m && e.peer === t.peerId && !o.inplaceSearch && Object(c.isOut)(t) && Fn(e, n, t.peerId), ue("_im_stack_messages", h).appendChild(Y(l));
            return Object(c.isOut)(t) && !a && setTimeout(function() {
                var e = ue("_im_mess_" + t.messageId, n);
                he(e, C) && le(e, "im-mess_sending")
            }, 500), u = u.filter(function(e) {
                return e.rid !== t.randomId
            }), ut(n), ft(u, e, n)
        }

        function ft(e, t, n) {
            var r = void 0;
            return (r = "object" === (void 0 === e ? "undefined" : y(e)) ? e : t.imQueue(e, !1)).length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(s.getMessage)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return lt(t, e, n, !1)
            }), n
        }

        function _t(e, t, n) {
            var r = e.tabs[t];
            return Object(f.toArray)(ce("_im_mess_unread", n)).forEach(function(e) {
                var t, n = Z(se(e, "msgid"));
                n > 0 && r.out_up_to >= n && (fe(e, "_im_mess_unread"), fe(e, "im-mess_unread"), (t = ue("_im_mess_blind_unread_marker", e)) && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex")))
            }), n
        }

        function ht(e, t, n) {
            var r = t.peerId,
                i = t.messageId,
                a = ue("_im_msg_reply" + i, e),
                o = ue("_im_msg_media" + i, e),
                s = n.tabs[r].mediacontent[i][0];
            return a && (a.innerHTML = s[0]), o && (o.innerHTML = s[1]), e
        }

        function pt(e, t) {
            if (!Object(s.isFullyLoadedTab)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function mt(e) {
            return e > 19e8 && e < 2e9
        }

        function gt(e, t) {
            return e === t.peer
        }

        function vt(e, t) {
            return Object(v.doesChatTabHaveFlag)(Object(s.getTab)(e, t), 1024)
        }

        function bt(e, t) {
            return !!e.tabs[t]
        }

        function yt(e, t) {
            return !!bt(e, t) && null !== e.tabs[t].lastmsg
        }

        function wt(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function Ct(e, t, n, r, i) {
            if (Object(c.getUserId)(t) !== Object(c.getUserId)(n)) return !0;
            var a = wt(t.date, r),
                o = wt(n.date, r);
            return !Oe(a, o) || (!(!Object(s.isCommunityInterface)(r) || Z(t.kludges.from_admin) === Z(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(c.isServiceMsg)(t) && !Object(c.isServiceMsg)(n)) || (!(!Object(c.isCallMessage)(n) && !Object(c.isCallMessage)(t)) || (!(!Object(c.isGift)(t) && !Object(c.isGift)(n)) || (!(!Object(c.isGraffiti)(t) && !Object(c.isGraffiti)(n)) || (!!Object(c.hasReply)(n) || !(Object(c.isUnread)(e, t) === Object(c.isUnread)(e, n) || !i || Object(c.isOut)(n) || en(n.peerId, r.gid)))))))))
        }

        function kt(e, t) {
            return we(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function Tt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = Math.round(1e9 * Math.random()).toString(16),
                o = {},
                c = 0;
            return t = (t = Object(u.replaceHyperLinks)(t || "", u.linksReplacer.bind(null, r))).replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + c + "_" + a + "!";
                return o[t] = e, c++, t
            }), t = Object(u.replaceMentions)(t), t = Object(u.replaceEmailLinks)(t), t = Object(u.replaceHashtags)(t, function(t) {
                var n = Object(s.getGroupId)(e);
                return '<a href="/' + (n ? "gim" + n : "im") + "?sel=" + (i || Object(s.getPeer)(e)) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(o).forEach(function(e) {
                t = t.replace(e, function() {
                    return o[e]
                })
            }), n.emoji && (t = Le.emojiToHTML(t, !0)), He && (t = He(t)), t
        }

        function Et(e) {
            return Object(d.isChatPeer)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : mt(e) ? "mr" + (e - 19e8) : e
        }

        function Ot(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - Z(e.substr(1));
                case "c":
                    return 2e9 + Z(e.substr(1));
                default:
                    return Z(e)
            }
        }

        function Nt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function St(e, t) {
            return {
                search: {
                    name: be("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: be("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: be("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? be("mail_im_delete_email_contact") : be("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: be("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: be("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: be("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? be("mail_im_show_media_history_group") : be("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: be("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: be("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: be("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: be(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: be(t ? "mail_leave_channel" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: be("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: be(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: be("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: be("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: be("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: be(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function jt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = ve("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function It(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = ve("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function xt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return jt(e, t[n])
                    }).join("");
                case 3:
                    return jt(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return It(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return It(e, t[n])
                    }).join("")
            }
        }

        function Ft(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (Object(d.isChatPeer)(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return xt(t.photo);
            var r = t.data.active.slice(0, 4).map(_.oCacheGet.bind(null, e));
            return xt(r.map(function(e) {
                return e.photo
            }), n ? [] : r.map(function(e) {
                return e.link
            }))
        }

        function At(e) {
            var t = e.get().gid ? be("mail_search_only_messages_comm") : be("mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + z + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Mt() {
            return '<li class="im-search-results-head">' + be("mail_search_messages") + "</li>"
        }

        function Pt() {
            return '<li class="im-search-results-head">' + be("mail_search_conversations_sep") + "</li>"
        }

        function Lt() {
            return '<li class="im-search-results-head">' + be("mail_search_dialogs_sep") + "</li>"
        }

        function Dt() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + be("mail_recent_searches") + '\n    <button type="button" class="' + q + ' im-page--clear-recent">' + be("mail_clear_recent") + "</button>\n  </li>"
        }

        function Rt(e) {
            var t = e.get().popular_sugg,
                n = Object(s.isClassicInterface)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(_.oCacheGet)(e, n) || t,
                    i = e.get().tabs[n] || t,
                    a = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return '<div class="' + ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, i.unread > 0 && "sugg-is_unread", a && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ") + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Me(i.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + Nt(i.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function Bt(e, t, n) {
            var r = ue("_im_mess_" + t.messageId, n);
            if (r) {
                pe(r, "aria-hidden", "false"), le(r, "im-mess_failed " + k);
                var i = ue("_im_mess_marker", r);
                pe(i, "aria-label", be("mail_send_message_error")), pe(i, "role", "link")
            }
            return n
        }

        function Ht(e, t, n) {
            var r = ue("_im_mess_" + t, n);
            if (r) {
                fe(r, "im-mess_failed"), pe(r, "aria-hidden", "true"), fe(r, k);
                var i = ue("_im_mess_marker", r);
                pe(i, "aria-label", ""), pe(i, "role", "")
            }
            return n
        }

        function Ut(e, t) {
            return qt(e.map(function(e) {
                return ue("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            }), t)
        }

        function qt(e, t) {
            var n = e.filter(function(e) {
                return !he(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                he(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === ae(e).length
            }).map(function(e) {
                return de("_im_mess_stack", e)
            }).forEach(function(e) {
                he(re(e), "_im_bar_date") && Q(re(e)), he(re(e), "_im_unread_bar_row") && Q(re(e)), Q(e)
            }), t
        }

        function zt(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    he(n, "mess_srv") && (t = n.parentNode);
                    var r = de("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === ae(n.parentNode).length && r.parentNode.removeChild(r))
                }
                he(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function Wt(e, t, n, r) {
            return e.map(function(e) {
                return ue("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                ge(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return '<div class="im-mess--text">\n    ' + be("delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam") + ' <button type="button" data-peer="' + e + '" class="' + E + ' im-mess--btn">' + be("mail_restore") + '</button>\n    <div class="' + T + ' im-mess--original">' + r + "</div>\n  </div>"
                }(t, e, n)), le(e, "im-mess_light")
            }), r
        }

        function Gt(e, t, n) {
            var r = ue("_im_mess_" + e, n);
            if (r) {
                var i = ue(T, r);
                ge(r, i.innerHTML), fe(r, "im-mess_light")
            }
            return n
        }

        function Kt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1],
                n = arguments[2],
                r = arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Yt(e, t, n, r, !0, i);
            var a = Yt(e, t, n, r, !1, i);
            return a.length > 60 ? Yt(e, t, n, r, !0, i) : a
        }

        function Vt(e) {
            var t, n = (w(t = {}, m.ACTIVITY_TYPE_TYPING, 1), w(t, m.ACTIVITY_TYPE_RECORDING_AUDIO, 2), t),
                r = Object.keys(e).sort(function(e, t) {
                    return n[t] - n[e]
                }),
                i = {},
                a = r.reduce(function(t, n) {
                    var r = (e[n] || {}).userIds;
                    return (void 0 === r ? [] : r).forEach(function(e) {
                        i[e] || (i[e] = !0, t[n] = !0)
                    }), t
                }, {}),
                o = r.filter(function(e) {
                    return !!a[e]
                });
            return o.length > 1 ? "" : o[0]
        }

        function Yt(e, t, n, r, i, a) {
            var o = function(e, t, n) {
                var r = [],
                    i = {};
                return Object.keys(t).map(function(n) {
                    ((t[n] || {}).userIds || []).forEach(function(t) {
                        Object(_.oCacheExists)(e, t) ? parseInt(t, 10) !== e.id && (i[t] = n) : r.push(t)
                    })
                }), r.length && Object(m.loadChatMember)(w({}, n, r), e), Object.keys(i).sort(function(e, n) {
                    return t[i[e]].ts - t[i[n]].ts
                })
            }(r, e, t);
            if (0 === o.length) return "";
            var c = Object(d.isUserPeer)(t) || Object(s.isCommunityPeer)(t) ? "first_name" : i ? "short_name" : "name",
                u = Vt(e),
                l = "";
            u === m.ACTIVITY_TYPE_RECORDING_AUDIO ? l = be("mail_recording_audio_several", o.length) : u === m.ACTIVITY_TYPE_TYPING && (l = be("mail_typing_several", o.length));
            var f = o.slice(0, Math.min(o.length - 1, a)),
                h = f.map(function(e) {
                    return Object(_.oCacheGet)(r, e)[c]
                }).join(", ");
            if (o.length > a + 1) {
                var p = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(function(n) {
                        var r = e[n].userIds;
                        (void 0 === r ? [] : r).forEach(function(e) {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                h += " " + be("mail_and_peer").replace("{count}", p - a).replace("{typing}", l)
            } else {
                if (o.length > 1 && (h += " " + be("mail_and_peer_one")), !Object(d.isChatPeer)(t) && n) h += " " + l;
                else h += " " + Object(_.oCacheGet)(r, o[f.length])[c] + " " + l
            }
            return h.trim()
        }

        function Qt() {
            return '<div class="im-page--chat-search-empty">\n    ' + be("mail_im_search_empty") + "\n  </div>"
        }

        function Xt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function $t(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = t.kludges,
                a = i.source_act,
                o = Z(i.source_mid),
                s = t.userId,
                c = Object(_.oCacheGet)(e, s),
                u = "",
                d = s === o;
            switch (a) {
                case N:
                    u = "mail_im_chat_created";
                    break;
                case S:
                    u = i.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case j:
                    u = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case I:
                    u = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case x:
                    u = "mail_im_photo_set";
                    break;
                case F:
                    u = i.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case A:
                    u = i.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case M:
                    u = i.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case P:
                    u = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (u = (u = ye(c.sex, be(u, "raw"))).replace("{from}", Xt(c.link, c.name, r)), o && o !== s) {
                var l = i.source_email;
                if (l) u = u.replace("{user}", Xt("/im?email=" + encodeURIComponent(l), "email", r));
                else {
                    var f = Object(_.oCacheGet)(e, o),
                        h = a === I ? f.inv_name : f.kick_name;
                    u = u.replace("{user}", Xt(f.link, h, r))
                }
            }
            if (i.source_text) {
                var p = i.source_old_text ? '«<b class="im_srv_lnk">' + i.source_old_text + "</b>» &rarr; " : "";
                u = u.replace("{title}", p + '«<b class="im_srv_lnk">' + i.source_text + "</b>»")
            }
            if (i.source_act === A || i.source_act === M)
                if (i.source_message) {
                    var m = Xt("", Zt(Le.emojiToHTML(te(i.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    u = u.replace("{msg}", m)
                } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return Xt("", t, !1, "im_srv_mess_link")
                });
            return u
        }

        function Jt(e, t, n, r) {
            if (t === x) {
                var i = ue("_im_mess_" + e.messageId, r);
                if (i) {
                    var a = n.tabs[e.peerId];
                    i.parentNode.innerHTML = ve("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: $t(n, e, a) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function Zt(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(i.MENTION_RAW, "$1$4")
        }

        function en(e, t) {
            return !t && e === K.id
        }

        function tn(e, t) {
            return Fe(e, {
                url: Object(s.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

        function nn(e) {
            return function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    i = Y(ve("im_preloader", {
                        preloader: X(K.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    a = !1;

                function o() {
                    a = !0, fe(i, "im-preloader_visible"), i.parentNode && i.parentNode.removeChild(i)
                }
                setTimeout(function() {
                    a || ("bottom" === n ? e.appendChild(i) : e.insertBefore(i, ne(e)), le(i, "im-preloader_visible"))
                }, 0), t.then(o).catch(function(e) {
                    Object(g.imWeirdCatch)("wrapLoading", e), o()
                })
            }
        }

        function rn(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, r.FLAG_IMPORTANT, 0, 0, "", {}, {}, 0, 0, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function an(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = ze,
                i = !1,
                a = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || he(n, "_im_no_select") || he(n, "im_msg_media_link") || "IMG" == n.tagName && !he(n, "_im_graffiti") && !he(n, "emoji") && !he(n, "emoji_css") && !he(n, "im_gift") || "TEXTAREA" == n.tagName || he(n, "play_new") || he(n, "videoplayer") || (i = a.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !i || !!ee((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function on(e, t) {
            return '<div class="im-mess--text">\n      <span>' + be("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + Et(e) + "&msgid=" + t + '">' + be("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function sn(e, t, n) {
            var r = be("mail_deleteall1"),
                i = be("mail_sure_to_delete_all"),
                a = be("mail_delete");
            return Object(d.isChatPeer)(t) && (Object(v.doesChatTabHaveFlag)(e, 1024) ? (r = be("mail_leave_channel"), i = be("mail_unfollow_channel_confirmation"), a = be("mail_unfollow_channel")) : i = be("mail_chat_sure_to_delete_all")), Object(s.isCommunityPeer)(t) && (i = be("mail_group_sure_to_delete_all")), Ie(r, i, a, n, be("global_cancel"))
        }

        function cn(e, t, n) {
            var r = Object(s.getTab)(e, t),
                i = Object(d.isChatPeer)(t),
                a = i && Object(v.doesChatTabHaveFlag)(r, 1024),
                o = be("mail_deleteall1"),
                c = be("mail_sure_to_delete_all"),
                u = be("mail_delete");
            if (i) {
                if (r.data.closed || r.data.kicked) return sn(r, t, n.bind(null, !0));
                a ? (o = be("mail_leave_channel"), c = be("mail_vkcomgroup_leave_confirm"), u = be("mail_leave_channel")) : (o = be("mail_leave_chat"), c = be("mail_chat_leave_confirm"), u = be("mail_leave_chat"))
            }
            Object(s.isCommunityPeer)(t) && (c = be("mail_group_sure_to_delete_all"));
            var l = new MessageBox({
                title: o,
                width: a ? 450 : 500
            }).content(c).setButtons(u, function() {
                return n(!!isChecked(ue("_check_is_delete")) || !i)
            }, be("global_cancel")).show();
            return i && !a && l.setControlsText('<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + be("mail_deleteall1") + "</div>"), l
        }

        function un(e) {
            return Ie(be("mail_unpin_title"), be("mail_unpin_text"), be("mail_unpin"), e, be("global_cancel"))
        }

        function dn(e, t, n, r) {
            var i = be("mail_dialog_msg_delete_N", t),
                a = Ie(be("mail_dialog_msg_delete_title"), i, be("mail_delete"), function() {
                    return r(isChecked(ue("_check_forall")))
                }, be("global_cancel")),
                o = "",
                s = !1;
            return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + be("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), a.setControlsText(o), s && checkbox(ue("_check_forall")), a
        }

        function ln(e, t, n, r, i) {
            t.showProgress(), e.set(r.bind(null, i)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, i), n().updateDialogFilters(e)
            })
        }

        function fn(e, t, n, r, i) {
            var o = e.get().peer;
            Be(r), je("al_im.php", {
                act: "a_show_members_box",
                chat: o - 2e9
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1
                },
                onDone: function(r, i) {
                    var o = Object(a.createModule)({
                        handlers: function(i, s) {
                            s(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                                r.hide(), _n(e, e.get().peer, t, n), Object(a.destroyModule)(o)
                            }), s(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                                var n = ue("_im_chat_members_w", r.bodyNode.parentNode),
                                    i = de("_im_member_item", t).offsetTop - n.scrollTop + 160 > 370;
                                mobileOnlineTip(t, {
                                    was: Z(se(t, "was")),
                                    mid: Z(se(t, "peer")),
                                    forcetoup: i
                                })
                            })
                        }
                    })
                }
            }, r)
        }

        function _n(e, t, n, r) {
            var i = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", i)).then(n().showCreation)
        }

        function hn(e, t, n) {
            if (e.get().active_tab === i.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === i.FOLDER_ALL ? i.FOLDER_UNREAD : i.FOLDER_ALL;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function pn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var i = Object(s.isReversedDialogs)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, i !== Object(s.isReversedDialogs)(e)), e
            })
        }

        function mn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return i.FOLDER_MASKS[i.FOLDER_IMPORTANT] & n.folders
        }

        function gn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(s.isFoldersAvailable)(e)) return !1;
            var r = n || e.get().tabs[t];
            return i.FOLDER_MASKS[i.FOLDER_UNRESPOND] & r.folders
        }

        function vn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function bn(e) {
            return null != e.get().pendingForward
        }

        function yn(e, t) {
            return (t.get().block_states[e] || {}).who === K.id
        }

        function wn(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(i) {
                n[i].time ? !1 === n[i].free && Date.now() - n[i].time >= 5e4 && t.push([r.mutexEvent([, 1, "gim" + e.get().gid, i, 0, ""])]) : n[i].time = Date.now()
            })
        }

        function Cn(e, t, n) {
            var r = void 0;
            return !xe("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: function(n, i) {
                    i && (r = t(n, e, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Pe.loaded && Pe.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function kn(e, t) {
            return Tn(e.get(), t, Object(s.getTab)(e, t).last_seen)
        }

        function Tn(e, t, n, r) {
            if (n[0]) return be("mail_header_online_status") + (Ae[n[0]] ? En(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var i = ke(n[1], e.timeshift),
                a = ye(Object(_.oCacheGet)(e, t).sex, be("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", i);
            return n[2] && (a += En(t, !1, !1, r)), a
        }

        function En(e, t, n, r) {
            var i = {
                mid: e
            };
            n || (i.was = 1), t ? i.forcetoup = !0 : i.forcetodown = !0, i = Object.assign(i, r);
            var a = JSON.stringify(i).slice(1, -1).replace(/"/g, "&quot;");
            return ve("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: a
            })
        }

        function On(e, t) {
            var n = t.get().tabs[e];
            return je("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function Nn(e, t) {
            return je("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function Sn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function jn(e, t, n, r) {
            var i = void 0;
            Kn(xe("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, a) {
                    a && (i = n(r, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Pe.loaded && Pe.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        i && i.unmount()
                    }
                }
            }, r), e)
        }

        function In() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function xn(e, t, n) {
            var r = ue("_im_mess_" + e, n);
            return r && _e(r, "im-mess_fav", t), n
        }

        function Fn(e, t, n) {
            var r = ue("_im_unread_bar_row", t);
            if (!r) return t;
            var i = oe(r, "._im_mess_stack", -1),
                a = oe(r, "._im_mess_stack"),
                o = i ? ce("_im_mess", i).pop() : null,
                c = a ? ue("_im_mess", a) : null;
            if (Q(r), it(t), !c || !o) return t;
            var u = se(c, "msgid"),
                d = Object(s.getPreviousMessage)(e, n, u),
                l = Object(s.getMessage)(e, n, u);
            if (!d || Ct(e.tabs[n], d, l, e)) return t;
            var _ = ue("_im_stack_messages", i),
                h = ue("_im_stack_messages", a).children;
            return Object(f.toArray)(h).forEach(function(e) {
                Q(e), _.appendChild(e)
            }), Q(a), t
        }

        function An(e, t, n) {
            var r = Object(s.getFirstUnread)(e, e.get().peer);
            if (!r) return [!1, 0];
            var i = ue("_im_mess_" + r, t);
            if (!i) {
                var a = Object(s.getLastMessage)(e, e.get().peer, r);
                if (!a) return [!0, 0];
                i = ue("_im_mess_" + a.messageId, t)
            }
            var o = he(i, "_im_mess_srv") ? i : de("_im_mess_stack", i);
            if (!o) return [!0, 0];
            var c = i ? i.offsetTop : 0,
                u = o.offsetTop + c,
                d = n.contHeight();
            return u <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - u)]
        }

        function Mn(e, t, n) {
            Be(t);
            var r = de("_im_top_notice", n);
            Re(r, 200, Q.pbind(r));
            var i = de("_im_page_dialogs", r);
            i && he(i, "im-page--dialogs-notice") && fe(i, "im-page--dialogs-notice"), Se.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Pn(e, t, n) {
            Be(t);
            var r = de("_im_aside_notice", n);
            De(r, 200, Q.pbind(r)), Se.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Ln(e, t) {
            Be(e);
            var n = de("_im_aside_promo_block", t);
            De(n, 200, Q.pbind(n)), Se.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Dn(e, t) {
            de("_im_aside_promo_block", t).classList.add("--action-called"), Se.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: se(t, "hash"),
                platform: se(t, "platform")
            })
        }

        function Rn(e, t, n, r, i) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(u.replaceMentions)(n, function(e, t, n, r, i) {
                return i
            }), r && (n = Le.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(d.isChatPeer)(e) && (n = ve("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && i.length > 0 && (n = ve("im_dialog_media", {
                name: Bn(i[0], i)
            })), n
        }

        function Bn(e, t) {
            var n = {
                photo: be("mail_added_photos", "raw"),
                video: be("mail_added_videos", "raw"),
                audio: be("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return Ce(r, be("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var i = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return Ce(i, n[e.type], !0);
                case "audio_playlist":
                    return be("mail_added_audio_playlist");
                case "artist":
                    return be("mail_added_artist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return be("mail_added_graffiti");
                        case "audiomsg":
                            return be("mail_added_audiomsg");
                        default:
                            return be("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return be("mail_added_geo");
                case "wall":
                    return be("mail_added_wall");
                case "wall_reply":
                    return be("mail_added_wall_reply");
                case "gift":
                    return be("mail_added_gift");
                case "link":
                case "share":
                    return be("mail_added_link");
                case "sticker":
                    return be("mail_added_sticker");
                case "market":
                    return be("mail_added_market_item");
                case "money_transfer":
                    return be("mail_added_money_transfer");
                case "money_request":
                    return be("mail_added_money_request");
                case "story":
                    return be("mail_added_story");
                case "mask":
                    return be("mail_added_mask");
                case "article":
                    return be("mail_added_article");
                case "call":
                    return be("mail_added_call");
                case "poll":
                    return be("mail_added_poll");
                case "podcast":
                    return be("mail_added_podcast");
                default:
                    return be("mail_added_" + e.type)
            }
            return ""
        }

        function Hn(e) {
            le(e, "im-send-btn_loading")
        }

        function Un(e) {
            fe(e, "im-send-btn_loading")
        }

        function qn(e) {
            var t = e.get(),
                n = Object(s.getPinnedMessage)(e);
            if (!n || !Object(h.isPinnedMessageVisibleInTab)(e, Object(s.getPeer)(e))) return "";
            var r = Object(_.oCacheGet)(e, n.userId);
            if (!r) return "";
            var i = zn(e, n);
            return i || (i = !(i = n.text) && n.attaches.length ? ve("im_pinned_message_media", {
                text: Bn(n.attaches[0], n.attaches)
            }) : Tt(e, i, n && n.kludges || {}) || ""), i = i.replace(/<br\s?\/?>/gi, " "), ve("im_pinned_message", {
                date: Te(n.date, t.timeshift),
                content: i,
                link: r.link,
                name: r.name
            })
        }

        function zn(e, t) {
            var n = "";
            if (t && Object(c.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                var r = "%s " + t.kludges.attach1_currency;
                if ("RUB" === t.kludges.attach1_currency && (r = be("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                    var i = Ce(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                        a = Ce(t.kludges.attach1_total_amount / 1e3, r, !0);
                    n = be("mail_money_request_collected_amount_from").replace("{amount}", i).replace("{total_amount}", a)
                } else {
                    var o = Ce(t.kludges.attach1_tr_amount / 1e3, r, !0);
                    n = be("mail_money_request_collected_amount").replace("{amount}", o)
                }
                if (Z(t.kludges.attach1_held_amount)) {
                    var s = Ce(t.kludges.attach1_held_amount / 1e3, r, !0);
                    n += " " + be("mail_money_request_held_amount").replace("{amount}", s)
                }
                t.text && (n += '<span class="divider"></span>' + Tt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += ve("im_pinned_message_media_bar", {
                    percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                }))
            }
            return n
        }

        function Wn(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && Fe(n, {
                text: be("mail_message_edited") + " " + Te(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Gn() {
            var e = getSize(ue(W))[1];
            return e || (e = We), e
        }

        function Kn(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                he(e.target, "_im_edit_time") && Wn(t, 0, e.target)
            })
        }

        function Vn(e, t, n, r, i) {
            var a = e.get(),
                o = void 0;
            Kn(xe("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                gid: e.get().gid,
                hash: a.tabs[n].hash
            }, {
                onDone: function(n, i) {
                    i && (o = r(n, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Pe.loaded && Pe.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, i), e)
        }

        function Yn(e, t, n) {
            var r = e.get();
            Kn(xe("al_im.php", {
                act: "a_get_replied_message_box",
                chat: r.peer,
                msgid: t,
                gid: r.gid,
                hash: r.tabs[r.peer].hash
            }, {
                onDone: function(e, t) {},
                params: {
                    width: 638,
                    onHide: function() {
                        Pe.loaded && Pe.detachPlayer(!0)
                    },
                    onDestroy: function() {}
                }
            }, n), e)
        }

        function Qn(e, t) {
            return !(!Object(d.isChatPeer)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Xn(e) {
            return !Object(d.isChatPeer)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function $n(e, t) {
            var n = Object(_.oCacheGet)(e, t.peerId),
                r = Object(s.getTab)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(d.isChatPeer)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function Jn(e, t) {
            for (var n in t) t.hasOwnProperty(n) && $n(e, t[n])
        }

        function Zn(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                i = r ? r[1].split(";") : [];
            for (i.length > qe && (r[1] = i.slice(0, qe).join(";")); e.length > Ue;) {
                var a = e.substr(0, Ue).lastIndexOf(" "); - 1 == a && (a = Ue), n.push({
                    msgText: ee(e.substr(0, a))
                }), e = ee(e.substr(a))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), i = i.slice(qe); i.length; i = i.slice(qe)) n.push({
                attaches: [
                    ["mail", i.slice(0, qe).join(";")]
                ]
            });
            return n
        }

        function er(e) {
            return e.length > Ue
        }

        function tr(e, t, n) {
            var r = !1;
            je("al_im.php", {
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
                        return Ie(be("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = Object(l.mount)(t.bodyNode, e)
                }
            }, {})
        }

        function nr() {
            Ie(be("global_error"), be("mail_message_wait_until_uploaded"))
        }

        function rr(e, t) {
            var n = Object(s.getTab)(e, t.peerId) || {};
            if (!t || !Object(c.isOut)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (Je(e, t.peerId, t.messageId)) return !1;
            if (Object(d.isChatPeer)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ir(e, t) {
            var n = Object(s.getTab)(e, t),
                r = -1 !== n.memberIds.indexOf(n.ownerId),
                i = r ? [n.ownerId] : [];
            return (i = i.concat(n.memberIds.filter(function(t) {
                return t !== n.ownerId && Object(_.oCacheExists)(e, t)
            }).slice(0, r ? 4 : 5))).map(function(t) {
                return Object(_.oCacheGet)(e, t)
            })
        }

        function ar(e, t) {
            return t.map(function(t) {
                return Object(_.oCacheGet)(e, t)
            })
        }

        function or(e, t) {
            return Object(s.getTab)(e, t).memberIds.reduce(function(t, n) {
                var r = Object(_.oCacheGet)(e, n);
                return t[r.id] = r, t
            }, {})
        }

        function sr(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                i = [];
            if ([
                    [31536e3, be(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, be(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, be(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, be(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, be(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, be(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, be(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(function(e) {
                    var t = b(e, 2),
                        n = t[0],
                        a = t[1],
                        o = Math.floor(r / n);
                    r %= n, o >= 1 && i.push(Ce(o, a))
                }), 1 === (n = i.length)) return i.pop();
            var a = i.slice(0, n - 1).join(", "),
                o = i.pop();
            return be("global_and").replace(/{before}/gi, a).replace(/{after}/gi, o)
        }

        function cr(e, t, n, i) {
            i && !Je(e, n, i) && (Object(s.getMessage)(e, n, i) ? (e.setState({
                msgid: i
            }), Object(o.updateLocation)({
                msgid: i
            }), t()) : e.get().longpoll.push([Object(r.changePeer)(n, i)]))
        }

        function ur(e) {
            var t = ue("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                r = Object(s.parserMessage)(n.msgs[se(t, "msgid")]);
            return r && r.peerId == e.get().peer ? r : null
        }
    },
    37: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mount", function() {
            return c
        });
        var r = n(92),
            i = n(179),
            a = n(136),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = "_im_join_chat";

        function c(e, t) {
            var n = Object(i.createModule)({
                handlers: function(n, i) {
                    i(e, "click", s, function(e) {
                        return function(e, t) {
                            var n = domData(t, "chat-id"),
                                i = domData(t, "hash");
                            return lockButton(t), Object(r.joinChat)(n, i, e.get()).then(function(n) {
                                var r = o(n, 1)[0];
                                unlockButton(t), e.get().longpoll.push([Object(a.changePeer)(r)])
                            }).catch(function(e) {
                                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                            })
                        }(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(i.destroyModule)(n)
                }
            }
        }
    },
    40: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "updateLocation", function() {
            return o
        }), n.d(t, "updateLazyLocation", function() {
            return s
        });
        var r = window,
            i = r.nav,
            a = r.extend;

        function o(e) {
            var t = a({}, i.objLoc, e);
            Object.keys(t).filter(function(e) {
                return "" === t[e]
            }).forEach(function(e) {
                delete t[e]
            });
            var n = i.toStr(t);
            i.setLoc(n)
        }

        function s() {
            var e = {};
            return {
                scheduleNav: function(t) {
                    e = a(e, t)
                },
                commitNav: function() {
                    o(e), e = {}
                },
                scheduleNavWithTimeOut: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = a(e, t), setTimeout(function() {
                        o(e), e = {}
                    }, n)
                }
            }
        }
    },
    6: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "vkLocal", function() {
            return s
        }), n.d(t, "lTimeout", function() {
            return c
        }), n.d(t, "rand", function() {
            return u
        }), n.d(t, "irand", function() {
            return d
        }), n.d(t, "isUndefined", function() {
            return l
        }), n.d(t, "isFunction", function() {
            return f
        }), n.d(t, "isArray", function() {
            return _
        }), n.d(t, "isString", function() {
            return h
        }), n.d(t, "isObject", function() {
            return p
        }), n.d(t, "isEmpty", function() {
            return m
        }), n.d(t, "vkNow", function() {
            return g
        }), n.d(t, "vkImage", function() {
            return v
        }), n.d(t, "trim", function() {
            return b
        }), n.d(t, "stripHTML", function() {
            return y
        }), n.d(t, "escapeRE", function() {
            return w
        }), n.d(t, "intval", function() {
            return C
        }), n.d(t, "floatval", function() {
            return k
        }), n.d(t, "positive", function() {
            return T
        }), n.d(t, "isNumeric", function() {
            return E
        }), n.d(t, "winToUtf", function() {
            return O
        }), n.d(t, "replaceEntities", function() {
            return N
        }), n.d(t, "clean", function() {
            return S
        }), n.d(t, "unclean", function() {
            return j
        }), n.d(t, "each", function() {
            return I
        }), n.d(t, "indexOf", function() {
            return x
        }), n.d(t, "inArray", function() {
            return F
        }), n.d(t, "clone", function() {
            return A
        }), n.d(t, "arrayKeyDiff", function() {
            return M
        }), n.d(t, "extend", function() {
            return P
        }), n.d(t, "addTemplates", function() {
            return L
        }), n.d(t, "getTemplate", function() {
            return D
        }), n.d(t, "serializeForm", function() {
            return R
        }), n.d(t, "extractUrls", function() {
            return B
        }), n.d(t, "isRetina", function() {
            return H
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return U
        }), n.d(t, "formatCount", function() {
            return q
        }), n.d(t, "encodeHtml", function() {
            return G
        }), n.d(t, "decodeHtml", function() {
            return K
        });
        var r = n(213),
            i = n(185),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function s(e) {
            var t = PageID;
            return function() {
                t === PageID && e.apply(this, arguments)
            }
        }

        function c(e, t) {
            return setTimeout(s(e), t)
        }
        window.PageID = window.PageID || 1;
        var u = function(e, t) {
                return Math.random() * (t - e + 1) + e
            },
            d = function(e, t) {
                return Math.floor(u(e, t))
            },
            l = function(e) {
                return void 0 === e
            },
            f = function(e) {
                return e && "[object Function]" === Object.prototype.toString.call(e)
            },
            _ = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            h = function(e) {
                return "string" == typeof e
            },
            p = function(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            };

        function m(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        var g = function() {
                return +new Date
            },
            v = function() {
                return window.Image ? new Image : ce("img")
            },
            b = function(e) {
                return (e || "").replace(/^\s+|\s+$/g, "")
            },
            y = function(e) {
                return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            w = function(e) {
                return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function C(e) {
            return !0 === e ? 1 : parseInt(e) || 0
        }

        function k(e) {
            return !0 === e ? 1 : parseFloat(e) || 0
        }

        function T(e) {
            return (e = C(e)) < 0 ? 0 : e
        }

        function E(e) {
            return !isNaN(e)
        }

        function O(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return (t = C(t)) >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function N() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(r.se)("<textarea>" + e + "</textarea>").value
        }

        function S(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function j(e) {
            return N(e.replace(/\t/g, "\n"))
        }

        function I(e, t) {
            if (p(e) || void 0 === e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
            } else
                for (var r = 0, i = e.length; r < i; r++) {
                    var a = e[r];
                    if (!1 === t.call(a, r, a)) break
                }
            return e
        }

        function x(e, t, n) {
            for (var r = n || 0, i = (e || []).length; r < i; r++)
                if (e[r] == t) return r;
            return -1
        }

        function F(e, t) {
            return -1 !== x(t, e)
        }

        function A(e, t) {
            var n = p(e) || void 0 === e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === o(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = A(e[r]) : n[r] = e[r]);
            return n
        }

        function M(e) {
            var t = {},
                n = arguments.length,
                r = arguments;
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    for (var a = !1, o = 1; o < n; o++) r[o][i] && r[o][i] === e[i] && (a = !0);
                    a || (t[i] = e[i])
                }
            return t
        }

        function P() {
            var e = arguments,
                t = e.length,
                n = e[0] || {},
                r = 1,
                i = !1;
            for ("boolean" == typeof n && (i = n, n = e[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : o(n)) || f(n) || (n = {}); r < t; r++) {
                var a = e[r];
                if (null != a)
                    for (var s in a)
                        if (a.hasOwnProperty(s)) {
                            var c = n[s],
                                u = a[s];
                            n !== u && (i && u && "object" === (void 0 === u ? "undefined" : o(u)) && !u.nodeType ? n[s] = P(i, c || (null != u.length ? [] : {}), u) : void 0 !== u && (n[s] = u))
                        }
            }
            return n
        }

        function L(e) {
            window.templates = window.templates || {}, P(window.templates, e)
        }

        function D(e, t) {
            var n = (window.templates = window.templates || {})[e];
            return "function" == typeof n && (n = n()), n && t ? Object(r.rs)(n, t) : n || ""
        }

        function R(e) {
            if ("object" !== (void 0 === e ? "undefined" : o(e))) return !1;
            var t = {},
                n = function(t) {
                    return Object(r.geByTag)(t, e)
                },
                i = function(n, i) {
                    if (i.name)
                        if ("text" !== i.type && i.type)
                            if (i.getAttribute("bool")) {
                                var a = Object(r.val)(i);
                                if (!a || "0" === a) return;
                                t[i.name] = 1
                            } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                    else t[i.name] = Object(r.val)(i)
                };
            return I(n("input"), function(e, t) {
                if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
            }), I(n("select"), i), I(n("textarea"), i), t
        }

        function B(e, t) {
            for (var n = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, r = void 0, i = []; e && (r = e.match(n));) {
                e = e.substr(r.index + r[0].length);
                var a = 0;
                r[4] || (a = 7), i.push({
                    url: r[2 + a],
                    query: r[5 + a] || "",
                    domain: r[4 + a]
                })
            }
            return i
        }
        var H = function() {
            return window.devicePixelRatio >= 2
        };

        function U(e) {
            var t = 0,
                n = 0,
                r = e.ownerDocument || e.document,
                i = r.defaultView || r.parentWindow;
            if (i.getSelection().rangeCount > 0) {
                var a = i.getSelection().getRangeAt(0),
                    o = a.cloneRange();
                o.selectNodeContents(e), o.setEnd(a.startContainer, a.startOffset), t = o.toString().length, o.setEnd(a.endContainer, a.endOffset), n = o.toString().length
            }
            return [t, n]
        }

        function q(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.kLimit || 1e3;
            return e >= (t.mLimit || 1e6) && !t.noCheck ? q(e = (e = C(e / 1e5)) > 1e3 ? C(e / 10) : e / 10, P(t, {
                noCheck: !0
            }), !0) + "M" : e >= n && !t.noCheck ? q(e = (e = C(e / 100)) > 100 ? C(e / 10) : e / 10, P(t, {
                noCheck: !0
            }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
        }
        var z, W = a((z = null, [function(e) {
                return z || (z = Object(r.se)("<span> </span>")), z.innerText = e, z.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }, function(e) {
                return z || (z = Object(r.se)("<span> </span>")), z.innerHTML = e, z.innerText
            }]), 2),
            G = W[0],
            K = W[1];
        window.isRetina = H, window.extractUrls = B, window.serializeForm = R, window.addTemplates = L, window.getTemplate = D, window.rand = u, window.irand = d, window.isUndefined = l, window.isFunction = f, window.isArray = _, window.isString = h, window.isObject = p, window.isEmpty = m, window.vkNow = g, window.vkImage = v, window.trim = b, window.stripHTML = y, window.escapeRE = w, window.intval = C, window.floatval = k, window.positive = T, window.isNumeric = E, window.winToUtf = O, window.replaceEntities = N, window.clean = S, window.unclean = j, window.each = I, window.indexOf = x, window.inArray = F, window.clone = A, window.arrayKeyDiff = M, window.extend = P, window.vkLocal = s, window.lTimeout = c, window.getCaretCharacterOffsetWithin = U, window.formatCount = q, window.encodeHtml = G, window.decodeHtml = K
    },
    64: function(e, t, n) {
        "use strict";
        n.r(t), window.DesktopNotifications = {
            supported: function() {
                return !(!window.webkitNotifications && !window.Notification)
            },
            checkPermission: function() {
                return window.webkitNotifications ? webkitNotifications.checkPermission() : "granted" == Notification.permission ? 0 : 1
            },
            requestPermission: function(e) {
                (window.webkitNotifications || window.Notification).requestPermission(e)
            },
            createNotification: function(e, t, n) {
                var r = void 0;
                return window.webkitNotifications ? r = webkitNotifications.createNotification(e, t, n) : ((r = new Notification(t, {
                    icon: e,
                    body: n
                })).cancel = function() {
                    this.close()
                }, r.show = function() {}), vk.id % 100 < 10 && statlogsValueEvent("browser_notification", 0), r
            }
        }
    },
    7: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = !1,
                r = void 0,
                i = void 0;
            if (!e) throw new Error("Undefined filename");
            t = t || {};
            try {
                n = !!(i = ce("audio")).canPlayType, "no" != i.canPlayType("audio/mpeg") && "" != i.canPlayType("audio/mpeg") ? r = ".mp3?1" : "no" == i.canPlayType('audio/ogg; codecs="vorbis"') || "" == i.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? n = !1 : r = ".ogg?1"
            } catch (e) {}
            var a = t.forcePath || "/" + e + r;
            if (n) {
                i.src = a;
                var o = !1;
                i.addEventListener("ended", function() {
                    o = !0
                }, !0), i.load(), this.playSound = function() {
                    o && i.load();
                    try {
                        var e = i.play();
                        e && e.catch(function(e) {
                            debugLog(e)
                        })
                    } catch (e) {}
                    o = !1
                }, this.pauseSound = function() {
                    var e = i.pause();
                    e && e.catch(function(e) {
                        debugLog(e)
                    })
                }
            } else {
                cur.__sound_guid = cur.__sound_guid || 0;
                var s = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                        id: "flash_sounds_wrap"
                    })),
                    c = "flash_sound_" + cur.__sound_guid++;
                if (renderFlash(s, {
                        url: "/swf/audio_lite.swf?4",
                        id: c
                    }, {
                        swliveconnect: "true",
                        allowscriptaccess: "always",
                        wmode: "opaque"
                    }, {})) {
                    var u = browser.msie ? window[c] : document[c],
                        d = !1,
                        l = setInterval(function() {
                            if (u && u.paused) try {
                                u.setVolume(1), u.loadAudio(a), u.pauseAudio()
                            } catch (e) {
                                debugLog(e)
                            }
                            d = !0, clearInterval(l)
                        }, 300);
                    this.playSound = function() {
                        d && u.playAudio(0)
                    }, this.pauseSound = function() {
                        d && u.pauseAudio()
                    }
                }
            }
        }
        n.r(t), r.prototype = {
            play: function() {
                try {
                    this.playSound()
                } catch (e) {}
            },
            pause: function() {
                try {
                    this.pauseSound()
                } catch (e) {}
            }
        }, window.Sound = r
    },
    76: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mount", function() {
            return a
        });
        var r = n(179);

        function i(e) {
            return {
                unmount: function() {
                    Object(r.destroyModule)(e)
                }
            }
        }

        function a(e, t, n) {
            return (0, Object(r.createMutations)(i).bindMutations)(Object(r.createModule)({
                handlers: function(e, t) {}
            }))
        }
    },
    81: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
            return topMsg
        }), __webpack_require__.d(__webpack_exports__, "topError", function() {
            return topError
        }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
            return showMsg
        }), __webpack_require__.d(__webpack_exports__, "showGlobalPrg", function() {
            return showGlobalPrg
        });
        var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(213),
            _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);

        function topMsg(e, t, n) {
            if (n || (n = "#D6E5F7"), e) {
                clearTimeout(window.topMsgTimer);
                var r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("system_msg");
                r.style.backgroundColor = n, r.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.show)(r), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
            } else Object(_dom__WEBPACK_IMPORTED_MODULE_0__.hide)("system_msg")
        }

        function topError(text, opts) {
            if (opts || (opts = {}), text.message) {
                var error = text;
                text = "<b>JavaScript error:</b> " + error.message, opts.stack = error.stack, error.stack && __debugMode && (text += "<br/>" + error.stack.replace(/\n/g, "<br/>"));
                try {
                    console.log(error.stack)
                } catch (e) {}
            }
            if (!opts.stack) try {
                eval("0 = 1")
            } catch (e) {
                opts.stack = e.stack
            } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(opts, {
                msg: opts.msg || text,
                module: (window.cur || {}).module,
                id: vk.id,
                host: locHost,
                lang: vk.lang,
                loc: (window.nav || {}).strLoc,
                realloc: location.toString()
            })))
        }

        function showMsg(e, t, n, r) {
            var i = "msg" + ("msg" !== n ? " " + n : "");
            r && (i += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)(e);
            var a = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.geByClass1)(n, e),
                o = a || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.domFC)(e),
                s = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ce)("div", {
                    className: i,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), o);
            a && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.re)(a), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.removeClass.pbind(s, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getXY)(e),
                r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getSize)(e),
                i = t || {},
                a = i.w,
                o = void 0 === a ? 32 : a,
                s = i.h,
                c = void 0 === s ? 13 : s,
                u = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
            u.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(u, {
                left: n[0] + Math.floor((r[0] - o) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[0] : 0),
                top: n[1] + Math.floor((r[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[1] : 0),
                width: o,
                height: c,
                display: "block",
                "z-index": i.zIndex ? i.zIndex : null
            }), i.hide && (e.style.visibility = "hidden")
        }
    },
    84: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createLongpoll", function() {
            return s
        });
        var r = n(113),
            i = n(30),
            a = n(0),
            o = n(92);

        function s(e, t) {
            return Object(r.createLongpollConnect)(e, {
                onEvents: t,
                onData: l,
                onRequestError: f,
                onHistoryLost: _,
                onKeyExpired: h,
                onLpBroken: p
            })
        }
        var c = 3e4,
            u = {},
            d = Date.now();

        function l(e, t) {
            if (t && t.status && e.lpstat) {
                var n = Math.floor(t.status / 100);
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), u[n] = n in u ? u[n] + 1 : 1, Date.now() - d >= c && (Object.keys(u).forEach(function(e) {
                    statlogsValueEvent("fc_longpoll", u[e], e + "0x", t.getResponseHeader("x-frontend"))
                }), u = {}, d = Date.now())
            }
        }

        function f(e) {
            Object(i.lpLogFc)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function _(e, t) {
            Object(i.lpLogFc)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function h(e) {
            return Object(i.lpLogFc)("red", "LP failed: key is incorrect; refresh key"), Object(a.post)(o.CONTROLLER, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function p() {
            throw window.nav.reload({
                force: !0
            }), new Error("ts is very wrong")
        }
    },
    86: function(e, t, n) {
        "use strict";
        n.r(t);
        n(205), n(7), n(157), n(3), n(124), n(64), n(147);
        window.getWndInner = function() {
            var e = lastWindowWidth,
                t = lastWindowHeight,
                n = sbWidth();
            return (!1 !== lastWndScroll[0] ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= n + (n ? 1 : 0)), [t, e]
        }, window.lastWndScroll = [!1, !1], window.updateWndVScroll = function() {
            var e = window,
                t = !1;
            t = e.boxLayerWrap && isVisible(boxLayerWrap) ? boxLayerWrap.scrollHeight > boxLayerWrap.clientHeight ? 1 : 0 : e.layerWrap && isVisible(layerWrap) ? layerWrap.scrollHeight > layerWrap.clientHeight ? 1 : 0 : !(!e.mvLayerWrap || !isVisible(mvLayerWrap)) && (mvLayerWrap.scrollHeight > mvLayerWrap.clientHeight ? 1 : 0), each(curRBox.tabs, function(e) {
                this.options.marginFixedToLayer && setStyle(this.wrap, {
                    marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
                })
            }), t !== lastWndScroll[0] && (lastWndScroll[0] = t, each(curRBox.tabs, function(e) {
                this.toRight && !this.options.marginFixedToLayer && setStyle(this.wrap, {
                    marginRight: t ? sbWidth() : 0
                })
            }))
        }, window.defBox = function(e, t) {
            var n = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>',
                r = void 0;
            r = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
            var i = se(rs(n, {
                title: e.title,
                content: r
            }));
            r = geByClass1("fc_content", i, "div");
            var a = {
                    movable: geByClass1("fc_tab_head", i),
                    hider: geByClass1("fc_tab_close_wrap", i, "a"),
                    startLeft: e.x,
                    startTop: e.y,
                    startHeight: e.height,
                    startWidth: e.width,
                    resizeableH: r,
                    resize: !1,
                    minH: e.minH,
                    onBeforeHide: e.onBeforeHide || function() {},
                    onHide: e.onHide || function() {},
                    onDragEnd: function(e, t) {},
                    onResize: function(e, t) {}
                },
                o = new RBox(i, extend(a, e)),
                s = void 0;
            return e.content && (s = new Scrollbar(r, {
                prefix: "fc_",
                more: debugLog,
                nomargin: !0,
                global: !0,
                nokeys: !0,
                right: vk.rtl ? "auto" : 0,
                left: vk.rtl ? 0 : "auto",
                onHold: e.onHold
            })), t({
                id: o.id,
                cont: r,
                update: function() {
                    s && s.update()
                }
            }), o
        };
        try {
            stManager.done("notifier.js")
        } catch (e) {}
    },
    92: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "CONTROLLER", function() {
            return k
        }), n.d(t, "ACTIVITY_PERIOD", function() {
            return T
        }), n.d(t, "ACTIVITY_TYPE_TYPING", function() {
            return E
        }), n.d(t, "ACTIVITY_TYPE_RECORDING_AUDIO", function() {
            return O
        }), n.d(t, "ACTION_PRIORITIES", function() {
            return x
        }), n.d(t, "loadHashes", function() {
            return F
        }), n.d(t, "strHistory", function() {
            return L
        }), n.d(t, "updateBlockStates", function() {
            return D
        }), n.d(t, "loadPeer", function() {
            return R
        }), n.d(t, "restoreHistoryQueue", function() {
            return B
        }), n.d(t, "removeFailed", function() {
            return H
        }), n.d(t, "selectPeer", function() {
            return q
        }), n.d(t, "selectPeerOnMessage", function() {
            return W
        }), n.d(t, "changePeer", function() {
            return G
        }), n.d(t, "updateMentions", function() {
            return K
        }), n.d(t, "setActions", function() {
            return V
        }), n.d(t, "loadMoreHistory", function() {
            return Y
        }), n.d(t, "loadLessHistory", function() {
            return Q
        }), n.d(t, "readLastMessages", function() {
            return $
        }), n.d(t, "loadLongPollKey", function() {
            return J
        }), n.d(t, "loadLongPollTs", function() {
            return Z
        }), n.d(t, "setMessageErrored", function() {
            return ee
        }), n.d(t, "resendMessage", function() {
            return te
        }), n.d(t, "loadAdmins", function() {
            return re
        }), n.d(t, "updateVideoThumb", function() {
            return oe
        }), n.d(t, "editMessage", function() {
            return ce
        }), n.d(t, "addMessage", function() {
            return ue
        }), n.d(t, "markInboundMessagesAsRead", function() {
            return le
        }), n.d(t, "markOutboundMessagesAsRead", function() {
            return fe
        }), n.d(t, "initTextStore", function() {
            return _e
        }), n.d(t, "processFwd", function() {
            return he
        }), n.d(t, "mergeTabs", function() {
            return pe
        }), n.d(t, "updateOnline", function() {
            return me
        }), n.d(t, "setActivity", function() {
            return ge
        }), n.d(t, "waitActivity", function() {
            return ve
        }), n.d(t, "sendMessage", function() {
            return we
        }), n.d(t, "deliverMessage", function() {
            return Ce
        }), n.d(t, "deliverEditedMessage", function() {
            return ke
        }), n.d(t, "addSelection", function() {
            return Te
        }), n.d(t, "cleanSelected", function() {
            return Ee
        }), n.d(t, "dropSelection", function() {
            return Oe
        }), n.d(t, "replaceMessage", function() {
            return Ne
        }), n.d(t, "saveMedia", function() {
            return Se
        }), n.d(t, "loadMedia", function() {
            return je
        }), n.d(t, "addAttachmentsToStoreData", function() {
            return Ie
        }), n.d(t, "replaceMediaAttachesStore", function() {
            return xe
        }), n.d(t, "setCurrentSearchDate", function() {
            return Fe
        }), n.d(t, "setInplaceSearch", function() {
            return Ae
        }), n.d(t, "setCurrentSearch", function() {
            return Me
        }), n.d(t, "searchHints", function() {
            return Pe
        }), n.d(t, "searchHintsIndex", function() {
            return Le
        }), n.d(t, "localIndexToDialog", function() {
            return De
        }), n.d(t, "searchTopConv", function() {
            return Be
        }), n.d(t, "searchImTopConv", function() {
            return He
        }), n.d(t, "searchLocalHints", function() {
            return Ue
        }), n.d(t, "preloadSearchIndex", function() {
            return qe
        }), n.d(t, "loadDialogs", function() {
            return ze
        }), n.d(t, "searchMessages", function() {
            return We
        }), n.d(t, "isSearchAllLoaded", function() {
            return Ge
        }), n.d(t, "isSearchingInplace", function() {
            return Ke
        }), n.d(t, "cancelSearch", function() {
            return Ve
        }), n.d(t, "clearDate", function() {
            return Ye
        }), n.d(t, "searchInplaceStart", function() {
            return Qe
        }), n.d(t, "searchMessagesInplace", function() {
            return Xe
        }), n.d(t, "loadImportant", function() {
            return $e
        }), n.d(t, "loadActualLastMessage", function() {
            return Je
        }), n.d(t, "removeMessagesMarkDeleted", function() {
            return Ze
        }), n.d(t, "removeMessages", function() {
            return et
        }), n.d(t, "removeMessageSend", function() {
            return tt
        }), n.d(t, "removeMessagesWithRestore", function() {
            return nt
        }), n.d(t, "restoreMessage", function() {
            return rt
        }), n.d(t, "restoreMessageSend", function() {
            return it
        }), n.d(t, "sendTyping", function() {
            return ot
        }), n.d(t, "sendRecordingAudio", function() {
            return st
        }), n.d(t, "forwardMessages", function() {
            return ct
        }), n.d(t, "prepareForward", function() {
            return ut
        }), n.d(t, "deletedDialog", function() {
            return dt
        }), n.d(t, "flushHistory", function() {
            return lt
        }), n.d(t, "updateChatTopic", function() {
            return ft
        }), n.d(t, "loadChatInfo", function() {
            return _t
        }), n.d(t, "addNewMemberOptimisticly", function() {
            return ht
        }), n.d(t, "addNewMember", function() {
            return pt
        }), n.d(t, "loadChatMember", function() {
            return mt
        }), n.d(t, "checkNewPeople", function() {
            return gt
        }), n.d(t, "loadNewPeople", function() {
            return vt
        }), n.d(t, "updateChatPhoto", function() {
            return bt
        }), n.d(t, "updateActions", function() {
            return yt
        }), n.d(t, "leaveChat", function() {
            return wt
        }), n.d(t, "returnToChat", function() {
            return Ct
        }), n.d(t, "toggleMutePeer", function() {
            return kt
        }), n.d(t, "setMutedPeer", function() {
            return Tt
        }), n.d(t, "setExecStack", function() {
            return Et
        }), n.d(t, "favMessage", function() {
            return Ot
        }), n.d(t, "updateFavMessage", function() {
            return Nt
        }), n.d(t, "updateImportant", function() {
            return St
        }), n.d(t, "loadSpam", function() {
            return jt
        }), n.d(t, "flushSpam", function() {
            return It
        }), n.d(t, "setCreationType", function() {
            return xt
        }), n.d(t, "getOwnerPhoto", function() {
            return Ft
        }), n.d(t, "presetAvatar", function() {
            return At
        }), n.d(t, "setChatPhoto", function() {
            return Mt
        }), n.d(t, "createChat", function() {
            return Pt
        }), n.d(t, "resync", function() {
            return Lt
        }), n.d(t, "toggleSendingAbility", function() {
            return Dt
        }), n.d(t, "setDelayedMessage", function() {
            return Rt
        }), n.d(t, "isAnythingLoading", function() {
            return Bt
        }), n.d(t, "updateUnreadCount", function() {
            return Ht
        }), n.d(t, "changeSubmitSettings", function() {
            return Ut
        }), n.d(t, "updateFavAndTitle", function() {
            return qt
        }), n.d(t, "saveHistoryScroll", function() {
            return zt
        }), n.d(t, "filterFromTab", function() {
            return Wt
        }), n.d(t, "changeDialogsTab", function() {
            return Gt
        }), n.d(t, "updateFolderState", function() {
            return Vt
        }), n.d(t, "toggleDialogImportant", function() {
            return Yt
        }), n.d(t, "markDialogAnswered", function() {
            return Qt
        }), n.d(t, "getMutexQueue", function() {
            return Xt
        }), n.d(t, "releaseBlock", function() {
            return $t
        }), n.d(t, "toggleCommunityMute", function() {
            return Jt
        }), n.d(t, "deleteDialog", function() {
            return Zt
        }), n.d(t, "restoreDialog", function() {
            return en
        }), n.d(t, "spamDialog", function() {
            return tn
        }), n.d(t, "updateTabbedPeers", function() {
            return nn
        }), n.d(t, "isEverythingLoaded", function() {
            return rn
        }), n.d(t, "cleanTab", function() {
            return an
        }), n.d(t, "stringifyTab", function() {
            return on
        }), n.d(t, "updateGoToEndVisibility", function() {
            return sn
        }), n.d(t, "toggleCommunityMessages", function() {
            return cn
        }), n.d(t, "updateHistory", function() {
            return un
        }), n.d(t, "startRecording", function() {
            return dn
        }), n.d(t, "cancelRecording", function() {
            return ln
        }), n.d(t, "setVoiceMessageAvail", function() {
            return fn
        }), n.d(t, "toggleConversation", function() {
            return _n
        }), n.d(t, "updateSearchQuery", function() {
            return hn
        }), n.d(t, "initializeChatResize", function() {
            return pn
        }), n.d(t, "joinChat", function() {
            return mn
        }), n.d(t, "getInviteLink", function() {
            return gn
        }), n.d(t, "resetInviteLink", function() {
            return vn
        }), n.d(t, "leaveInvitation", function() {
            return bn
        }), n.d(t, "saveRecentSearchPeer", function() {
            return yn
        }), n.d(t, "resetRecentSearch", function() {
            return wn
        }), n.d(t, "removeFromRecentSearch", function() {
            return Cn
        }), n.d(t, "pinMessageOptimistic", function() {
            return kn
        }), n.d(t, "unpinMessageOptimistic", function() {
            return Tn
        }), n.d(t, "pinMessage", function() {
            return En
        }), n.d(t, "unpinMessage", function() {
            return On
        }), n.d(t, "getPinnedMessage", function() {
            return Nn
        }), n.d(t, "getMessageLocalId", function() {
            return Sn
        }), n.d(t, "getChatMembers", function() {
            return jn
        }), n.d(t, "getChatDetails", function() {
            return In
        }), n.d(t, "updateFlags", function() {
            return xn
        }), n.d(t, "removeChatPhoto", function() {
            return Fn
        }), n.d(t, "kickUserOptimisticly", function() {
            return An
        }), n.d(t, "kickUser", function() {
            return Mn
        }), n.d(t, "toggleAdminOptimisticly", function() {
            return Pn
        }), n.d(t, "toggleAdmin", function() {
            return Ln
        }), n.d(t, "checkChatMember", function() {
            return Dn
        }), n.d(t, "hidePromoTooltip", function() {
            return Rn
        }), n.d(t, "videoAutoPlayHandler", function() {
            return Bn
        }), n.d(t, "hideTopBannerAction", function() {
            return Hn
        }), n.d(t, "callbackTopBannerAction", function() {
            return Un
        }), n.d(t, "loadBanner", function() {
            return qn
        }), n.d(t, "setKeyboard", function() {
            return zn
        }), n.d(t, "deleteKeyboard", function() {
            return Wn
        }), n.d(t, "toggleKeyboard", function() {
            return Gn
        }), n.d(t, "loadKeyboard", function() {
            return Kn
        }), n.d(t, "changeCommunityAccess", function() {
            return Vn
        }), n.d(t, "deleteTemplate", function() {
            return Yn
        }), n.d(t, "createTemplate", function() {
            return Qn
        }), n.d(t, "updateTemplate", function() {
            return Xn
        }), n.d(t, "resetTabAll", function() {
            return $n
        });
        var r = n(0),
            i = n(40),
            a = n(136),
            o = n(164),
            s = n(214),
            c = n(115),
            u = n(33),
            d = n(207),
            l = n(160),
            f = n(10),
            _ = n(208),
            h = n(221),
            p = n(16),
            m = n(120),
            g = n(21),
            v = n(213),
            b = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            y = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function w(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function C(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var k = "al_im.php",
            T = 5,
            E = "typing",
            O = "audiomessage",
            N = Object(i.updateLazyLocation)(),
            S = N.scheduleNav,
            j = N.commitNav,
            I = N.scheduleNavWithTimeOut;
        var x = {
            settings: 0,
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
            return: 12,
            block_community: 12,
            allow_community: 12
        };

        function F(e, t, n) {
            return Object(r.post)(k, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function A(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(function(r) {
                return r ? t.apply(void 0, C(n)) : function(e) {
                    if (!e.renew_hashes) {
                        var t = e.last_hashes_update || 0;
                        if (Date.now() - t < 1e4) return Promise.resolve();
                        var n = Object.keys(e.tabs).filter(function(t) {
                            return Object(u.isFullyLoadedTab)(e, t)
                        });
                        e.renew_hashes = F(n, {}, e).then(function(t) {
                            var r = y(t, 2),
                                i = r[0],
                                a = r[1];
                            return n.forEach(function(t) {
                                e.tabs[t].hash = i[t]
                            }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                        })
                    }
                    return e.renew_hashes
                }(e).then(function(e) {
                    return t.apply(void 0, C(n))
                })
            })
        }

        function M(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, C(t)).catch(function(r) {
                    if (r && r.match && r.match(/1001;/)) return A(n, e, t);
                    throw r
                })
            }
        }

        function P(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function L(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function D(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function R(e, t, n, i, a) {
            return a.tabHistoryNotChanged = !1, Object(o.retryFn)(r.post, 3, function(e) {
                return e - 1
            })(k, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: a.prevPeer,
                gid: a.gid,
                block: i
            }).then(function(t) {
                var r = y(t, 5),
                    i = r[0],
                    o = r[1],
                    s = r[2],
                    c = r[3],
                    d = r[4];
                if (o.forEach(function(e) {
                        return Object(_.oCacheAdd)(a, e)
                    }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = d, a.tabs[e] || (a.tabs[e] = Object(u.normalizeTab)(a, i)), D(c, a), n) {
                    if (a.tabs[e]) {
                        var l = a.tabs[e].lastmsg,
                            f = a.tabs[e].lastmsg_meta;
                        extend(a.tabs[e], i), a.tabs[e].lastmsg = l, a.tabs[e].lastmsg_meta = f
                    }
                } else extend(a.tabs[e], i);
                return a.admins = extend(a.admins, s), a.imQueue(e, !1), Bn(), B(e, a)
            }).catch(function(e) {
                return Object(h.imWeirdCatch)("loadPeer", e)
            })
        }

        function B(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                i = n.filter(function(n) {
                    return !Object(l.isRidExist)(t, e, n.rid)
                });
            return r.msgs = i.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, i), t.tabs[e].history = Object(u.restoreQueue)(i, t, P(t.tabs[e].history)), Promise.resolve(t)
        }

        function H(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(u.removeMessages)([t], P(n.tabs[e].history)), Promise.resolve(n)
        }

        function U(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.post)(k, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                return D(y(e, 1)[0], t)
            })
        }

        function q(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(u.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && U(n, t), Promise.resolve(t).then(V)) : (Object(u.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), R(n, e, !1, !0, t))
            }).then(V).then(z.bind(null, n))
        }

        function z(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(u.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(u.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function W(e, t, n) {
            var r = n.msgid,
                i = n.peer;
            return !e && Object(u.isFullyLoadedTab)(n, i) && n.tabs[i].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && U(i, n), Promise.resolve(n).then(V).then(z.bind(null, i))) : R(i, !0, r, !0, n).then(V).then(function() {
                return Object(l.getTab)(n, i).msgid = r, n
            }).then(z.bind(null, i))
        }

        function G(e, t, n, r) {
            if (Bt(r)) throw Object(u.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading something");
            var i = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, S({
                    sel: e ? Object(u.convertPeerToUrl)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: i
                }), 0 != r.prevPeer && z(r.prevPeer, r, !0), 0 !== e) {
                Object(u.isTabLoaded)(r, e) && z(e, r, !0), nn(r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), !1, r)
            } else nn(r.tabbedPeers, !1, r);
            return j(), Ve(r.prevPeer, r)
        }

        function K(e) {
            cur.wallMentions = function() {
                return new Promise(function(t, n) {
                    if (cur.wallMentions = [], !Object(u.isChatPeer)(e.peer) || !Object(u.isFullyLoadedTab)(e, e.peer) || Object(u.isFvkcomgroup)(e, e.peer)) return n();
                    var r = e.tabs[e.peer];

                    function i() {
                        var n = [];
                        Object.keys(r.msgs || {}).reverse().forEach(function(e) {
                            var t = Object(l.parserMessage)(r.msgs[e]),
                                i = t && t.userId;
                            i && i != vk.id && -1 === n.indexOf(i) && Object(u.isUserAliveInChat)(r, i) && n.push(i)
                        }), (r.memberIds || []).forEach(function(e) {
                            -1 === n.indexOf(e) && n.push(e)
                        });
                        var i = [];
                        n.forEach(function(t) {
                            if (Object(_.oCacheExists)(e, t)) {
                                var n = Object(_.oCacheGet)(e, t),
                                    r = n.link.substring(1);
                                i.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                            }
                        }), t(i)
                    }
                    r.membersLoaded ? i() : jn(e.peer, e).then(i)
                })
            }
        }

        function V(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                i = Object(u.isChatPeer)(t) && (n.data.closed || n.data.kicked),
                a = Object(u.isFvkcomgroup)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !a && r.push("clear"), Object(u.isCommunityInterface)(e) && !a && r.push("block"), Object(u.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), (Object(u.isChatPeer)(t) || Object(u.isUserPeer)(t) || Object(u.isCommunityPeer)(t)) && !Object(u.isCommunityInterface)(e) && (Object(u.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute"))), Object(u.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), !e.chatSettingsAllowed && Object(u.isChatPeer)(t) && !i && n.data.link && r.push("invite_link"), Object(u.isChatPeer)(t) && !i && (e.chatSettingsAllowed || (Object(m.canChangeTitle)(e) && r.push("topic"), Object(m.canChangeAvatar)(e) && r.push("avatar")), Object(m.canInviteUser)(e) && r.push("invite"), e.gid || r.push("leave")), Object(u.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(u.isChatPeer)(t) && e.chatSettingsAllowed && !n.data.closed && !n.data.kicked && r.push("settings"), Object(u.isChatPeer)(t) && n.pinned && (r.push(Object(p.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), Object(m.canPinOrUnpin)(e) && r.push("unpin"));
            var o = Object(u.chatActions)(e, a);
            return e.curActions = r.sort(function(e, t) {
                return x[e] - x[t]
            }).reduce(function(e, t) {
                return e[t] = o[t], e
            }, {}), Promise.resolve(e)
        }

        function Y(e, t, n) {
            var i = n.tabs[n.peer];
            return Object(r.post)(k, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: i.offset + (i.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(function(e) {
                var t = y(e, 4),
                    r = t[0],
                    a = t[1],
                    o = t[2],
                    s = t[3];
                return i.allShown = o, n.admins = extend(n.admins, s), i.history = r + L(i.history), i.historyToAppend = r, i.offset += Object.keys(a).length, i.msgs = extend(i.msgs, a), n
            })
        }

        function Q(e) {
            var t = e.tabs[e.peer];
            return Object(r.post)(k, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(n) {
                var r = y(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2];
                r[3], r[4];
                t.allShown = t.allShown || o, t.history = L(t.history) + i, t.historyToAppend = i;
                var s = Object.keys(a).length;
                return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, a), e
            })
        }

        function X(e, t, n, r) {
            var i = e.tabs[t];
            return r === a.FLAG_OUTBOUND && i.out_up_to > n ? e : (r === a.FLAG_OUTBOUND ? i.out_up_to = n : i.in_up_to = n, e)
        }
        var $ = M(function(e, t) {
            var n = t.tabs[e],
                i = n.msgs || {},
                o = Object.keys(i).map(function(n) {
                    return Object(l.getMessage)(t, e, n)
                }).filter(function(e) {
                    return !Object(f.isOut)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (o = o.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), (o = intval(o.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([a.readInboundEvent([6, e, o])]), Object(r.post)(k, {
                peer: e,
                ids: [o],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return X(t, e, o, a.FLAG_OUTBOUND)
            }))
        });

        function J(e) {
            return Object(r.post)(k, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var n = y(t, 3),
                    r = n[0],
                    i = n[1],
                    a = n[2];
                return extend({}, e, {
                    imKey: r,
                    imUrl: i,
                    imPart: a
                })
            })
        }

        function Z(e) {
            return Object(r.post)(k, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var n = y(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function ee(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(u.setMessageError)(e, t, P(r.history))), Promise.resolve(n)
        }

        function te(e, t, n, r) {
            var i = r.tabs[e];
            return i.msgs[t] && (i.msgs[t].errored = 0, i.lastmsg_meta = n, i.lastmsg = t, i.history = Object(u.startResendMessage)(e, t, P(i.history))), Promise.resolve(r)
        }

        function ne(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, a) {
                return !n && !Wt(a)(t) || i && !i(a, e[a], t) || (e[a] = Object(s.arrayUnique)(r(e[a], a))), e
            }, e.dialog_tabs))
        }

        function re(e, t) {
            return 0 === e.length ? Promise.resolve(t) : Object(r.post)(k, {
                act: "a_get_admin",
                admins: e.join(","),
                gid: t.gid
            }).then(function(e) {
                var n = y(e, 1)[0];
                return t.admins = extend(t.admins, n), t
            })
        }

        function ie(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                nn(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function ae(e, t, n) {
            return Object(u.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
        }

        function oe(e, t) {
            var n = e.get().peer,
                r = Object(l.getTab)(e, n);
            if (Object(u.isFullyLoadedTab)(e, n)) {
                var i = P(r.history);
                r.history = Object(u.updateMessageInCache)(e, i, t)
            }
        }

        function ce(e, t) {
            var n = Object(l.getTab)(t, e.peerId);
            if (Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var r = P(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(u.editAndReplaceMessage)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var i = n && n.pinned && Object(l.parserMessage)(n.pinned);
            return i && i.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function ue(e, t) {
            var n = e.flags & a.FLAG_OUTBOUND,
                r = e.peerId;
            if (Object(u.isTabLoaded)(t, r)) {
                var i = t.tabs[r];
                if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = w({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? de(t, 1, e.peerId) : (!i.unread && de(t, 1, e.peerId), i.unread++), ie(e.peerId, t)), Object(u.isFullyLoadedTab)(t, r)) {
                    var o = P(i.history);
                    i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = Object(u.appendToHistory)(t, e, o, !0, !0, !0), Object(f.isOut)(e) && (i.blocked_community = 0, V(t))
                }
                if (i.typing) {
                    var s = i.typing.userIds.indexOf(e.userId);
                    s >= 0 && i.typing.userIds.splice(s, 1)
                }
                return i.lastmsg = e.messageId, i.lastmsg_meta = e, z(e.peerId, t), ne(t, i, !1, ae.bind(null, r), Kt.bind(null, t)), Promise.resolve(t)
            }
            return R(r, 0, 0, 0, t).then(function(t) {
                return ne(t, t.tabs[r], !1, ae.bind(null, r), Kt.bind(null, t)), z(e.peerId, t), n || ie(e.peerId, t), t
            })
        }

        function de(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function le(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = X(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(l.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && de(t, -1, e.peerId), !n.skipped) {
                    var i = P(n.history);
                    n.history = Object(u.removewNewUnreadBarAndMerge)(t, i, e.peerId)
                }
            } else Object(u.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && de(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(u.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[d.FOLDER_UNREAD] = t.dialog_tabs[d.FOLDER_UNREAD].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== d.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : Gt(d.FOLDER_ALL, t)
        }

        function fe(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(u.isTabLoaded)(t, e.peerId) && X(t, e.peerId, e.upToId, a.FLAG_OUTBOUND), Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var r = P(n.history);
                n.history = Object(u.markMessagesAsRead)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function _e(e, t, n, r, i) {
            return i.text = {}, i.imQueue = e, i.imQueueResend = t, i.imQueueSet = n, i.imQueueComplete = r, Promise.resolve(i)
        }

        function he(e, t, n) {
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
                    a = Object(l.getMessage)(n, t, i),
                    o = Object(l.getAuthorFullName)(n, t, i);
                return !1 === o ? n.set(mt.bind(null, w({}, t, [a.userId]))).then(function(n) {
                    var o = Object(l.getAuthorFullName)(n, t, i);
                    return {
                        msgIds: e,
                        object: r(a, o)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: r(a, o)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function pe(e, t) {
            Object(u.normalizeTabsGotFromServer)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var i = t.tabs[r] ? t.tabs[r].msgs : {},
                    a = extend({}, i || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), a && (n[r].msgs = a), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function me(e, t, n, r) {
            var i = Object(l.getTab)(r, e);
            if (i) {
                var a = !1 !== t ? mobPlatforms[t] ? 1 : 0 : i.last_seen[2];
                i.online = t, i.last_seen = [t, n || i.last_seen[1], a]
            }
            return Promise.resolve(r)
        }

        function ge(e, t, n) {
            var r = Object(l.getTab)(n, e.peerId);
            return r && (e.ts = Date.now() / 1e3, r.activity || (r.activity = {}), r.activity[t] = e, r.typing === E && (r.typing = e)), Promise.resolve(n)
        }

        function ve(e, t, n) {
            var r = e.peerId;
            return Object(o.pause)(T + 2).then(function() {
                if (Object(u.isTabLoaded)(n, r)) {
                    var e = n.tabs[r];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * T && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * T && (e.typing = void 0)
                }
                return n
            })
        }

        function be(e) {
            var t = {},
                n = e.find(function(e) {
                    return "poll" === e[0]
                });
            if (n) {
                var r = y(n, 3)[2];
                Object.assign(t, r)
            }
            return t
        }

        function ye(e) {
            return e.map(function(e) {
                return e[0] + ":" + e[1]
            }).join(",")
        }
        var we = function(e, t, n, i) {
                var a = Date.now() + rand(0, 100).toFixed(0),
                    o = i.ref_id,
                    s = i.ref_source;
                i.ref_source = void 0, i.ref_id = void 0, (s || o) && (S({
                    ref_source: null,
                    ref: null
                }), j()), Object(g.statlogsSendingQueueLength)(i);
                var c = t.attaches.length > 0,
                    u = Object(g.statlogsSendingTime)(i, "send", "server", c),
                    d = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: s,
                        ref: o,
                        msg: t.message,
                        payload: t.payload,
                        media: ye(t.attaches),
                        guid: a,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : i.gid,
                        entrypoint: i.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, be(t.attaches));
                return Object(r.post)(k, d, 2e4).then(function(e) {
                    var t = y(e, 1)[0];
                    return u(), i.version !== t.version && nav.reload({
                        force: !0
                    }), i.currentEntryPoint = "", i
                }).catch(function(e) {
                    throw Object(g.statlogsSendingError)(i, e, "send", "server_send"), e
                })
            },
            Ce = M(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments[3],
                    i = r.tabs[e];
                return we(e, t, b({
                    hash: i.hash
                }, n), r)
            }),
            ke = M(function(e, t, n) {
                var i = t.attaches.length > 0,
                    a = Object(g.statlogsSendingTime)(n, "edit", "server", i);
                return Object(r.post)(k, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: ye(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, be(t.attaches)), 2e4).then(function(e) {
                    y(e, 1)[0];
                    return a(), n
                }).catch(function(e) {
                    throw Object(g.statlogsSendingError)(n, e, "edit", "server_send"), e
                })
            });

        function Te(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(s.arrayUnique)(n).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function Ee(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Oe(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Ne(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(u.replaceMessageAttrs)(t, P(n.history), e)
            }
            return Promise.resolve(t)
        }

        function Se(e, t) {
            return Promise.resolve()
        }

        function je(e, t) {
            var n = Object(g.statlogsSendingTime)(t, "unknown", "attach"),
                i = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(o.retryFn)(r.post, 3, function(e) {
                return e * e
            })(k, i).then(function(r) {
                return n(), Ie(e, r, t)
            }).catch(function(n) {
                return Object(g.statlogsSendingError)(t, n, "unknown", "server_load_attach"), Ie(e, null, t)
            })
        }

        function Ie(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], xe(e, n)
        }

        function xe(e, t) {
            var n = t.tabs[e.peerId];
            return n.history = Object(u.replaceAttaches)(P(n.history), e, t), Promise.resolve(t)
        }

        function Fe(e, t, n) {
            var r = Object(u.dayFromVal)(t),
                i = n.tabs[e];
            return i.searchDay = r, i.searchOffset = 0, i.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Ae(e, t, n) {
            return n.tabs[t].searchText = e, Qe(t, n), n
        }

        function Me(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function Pe(e, t, n, i, a) {
            return Object(r.post)(k, {
                act: "a_hints",
                str: e,
                gid: i.hidegid ? 0 : a.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = y(e, 3),
                    n = t[0],
                    r = t[1];
                return D(t[2], a), r.forEach(function(e) {
                    return Object(_.oCacheAdd)(a, e)
                }), pe(n, a), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function Le(e, t, n, r) {
            return Pe(e, t, n, {}, r).then(function(e) {
                return e.map(function(e) {
                    return {
                        peerId: e.peerId,
                        name: e.tab,
                        photo: e.photo,
                        online: e.online,
                        is_friend: "friends" === n
                    }
                })
            })
        }

        function De(e) {
            var t = {
                peerId: e[0],
                name: e[1],
                tab: e[1],
                photo: e[2],
                href: e[3],
                online: e[4],
                is_friend: e[5],
                local_index: !0
            };
            return e[6] && (t.data = {
                flags: e[6]
            }), t
        }

        function Re(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = (t ? e.search(t) : e.list).map(De);
                    return n.mapped_index || (n.mapped_index = {}), r.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }
        var Be = Re(function(e) {
                return e.topConvTree
            }),
            He = Re(function(e) {
                return e.imTopConvTree
            }),
            Ue = Re(function(e) {
                return e.hintsTree
            });

        function qe(e, t) {
            var n = void 0,
                i = void 0,
                a = void 0;
            t.topConvTree = new Promise(function(e) {
                n = e
            }), t.hintsTree = new Promise(function(e) {
                i = e
            }), t.imTopConvTree = new Promise(function(e) {
                a = e
            });
            var s = e.select(c.RECENT_SEARCH_OP);
            return Object(o.retryFn)(r.post, 1, function() {
                return 4
            })(k, {
                act: "a_dialogs_preload",
                rs: s.join(","),
                gid: t.gid
            }).catch(function(e) {
                return [
                    [],
                    [],
                    []
                ]
            }).then(function(e) {
                var r = y(e, 4),
                    o = r[0],
                    s = r[1],
                    c = r[2],
                    u = r[3];
                return t.popular_sugg = c, new vkIndexer(o, function(e) {
                    return e[1]
                }, n), new vkIndexer(s, function(e) {
                    return e[1]
                }, i), u && u.length > 0 ? new vkIndexer(u, function(e) {
                    return e[1]
                }, a) : a(), t
            })
        }

        function ze(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(r.post)(k, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = y(n, 4),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3];
                return o.forEach(function(t) {
                    return Object(_.oCacheAdd)(e, t)
                }), D(s, e), pe(a, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[t] = !i.has_more, Promise.resolve(e)
            })
        }
        var We = M(function(e, t) {
            return Object(r.post)(k, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(n) {
                var r = y(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3],
                    c = r[4];
                return a.forEach(function(e) {
                    return Object(_.oCacheAdd)(t, e)
                }), Object(u.normalizeTabsGotFromServer)(t, i), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(i).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = i[e]
                }), [i, o]
            })
        });

        function Ge(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function Ke(e, t) {
            return !(t.peer !== e || !Object(u.isFullyLoadedTab)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Ve(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, S({
                    st: ""
                }), j()
            }
            return Promise.resolve(t)
        }

        function Ye(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Qe(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Xe = M(function(e, t) {
            var n = t.tabs[e],
                i = "";
            if (Qe(e, t), n.searchDay && (i = "day:" + n.searchDay), !i && !n.searchText) return Promise.reject();
            var a = "in:" + e + " " + i + " " + (n.searchText || "");
            return S({
                st: n.searchText
            }), j(), Object(r.post)(k, {
                act: "a_search",
                q: a,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(function(e) {
                var t = y(e, 3),
                    r = t[0],
                    i = t[1],
                    a = t[2];
                return n.searchOffset = i, n.searchAllLoaded = a, r
            })
        });

        function $e(e) {
            return Object(r.post)(k, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Je(e, t) {
            var n = Object(l.getTab)(e, t);
            return Object(r.post)(k, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var i = y(r, 2),
                    a = i[0],
                    o = i[1];
                n.lastmsg = a[0] || !1, n.lastmsg_meta = a;
                var s = y(o, 3);
                n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[d.FOLDER_UNREAD] = e.get().dialog_tabs[d.FOLDER_UNREAD].filter(function(e) {
                    return e != t
                })), ne(e.get(), n, !1, ae.bind(null, t), Kt.bind(null, e.get()))
            })
        }

        function Ze(e, t, n) {
            if (Object(u.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function et(e, t, n) {
            if (Object(u.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(u.removeMessages)(e, P(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var tt = M(function(e, t, n, i, a) {
            return Object(r.post)(k, {
                act: "a_mark",
                peer: t,
                hash: n || a.tabs[t].hash,
                gid: a.gid,
                msgs_ids: e.join(","),
                mark: i
            })
        });

        function nt(e, t, n, r) {
            if (Object(u.isFullyLoadedTab)(r, t)) {
                var i = r.tabs[t];
                i.deleted = i.deleted ? i.deleted.concat(e) : e, i.history = Object(u.removeMessagesWithRestore)(e, t, n, P(i.history)), i.offset -= e.filter(function(e) {
                    return i.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function rt(e, t, n) {
            if (Object(u.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(u.restoreMessage)(e, t, P(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function it(e, t, n, i) {
            return Object(r.post)(k, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: i
            })
        }
        var at = M(function(e, t, n) {
                return n.tabs[e].lastTyping = Date.now(), Object(r.post)(k, {
                    act: "a_activity",
                    type: t,
                    peer: e,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                }, function() {
                    return n
                })
            }),
            ot = M(function(e, t) {
                return at(e, E, t)
            }),
            st = M(function(e, t) {
                return at(e, O, t)
            });

        function ct(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function ut(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function dt(e, t, n) {
            if (Object(u.isTabLoaded)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, ne(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && de(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, nn(n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, n), t.then(function(t) {
                    var i = y(t, 2);
                    i[0], i[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var lt = M(function(e, t) {
                return dt(e, Object(r.post)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            ft = M(function(e, t, n) {
                return Object(r.post)(k, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            _t = M(function(e, t) {
                return Object(r.post)(k, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = y(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });

        function ht(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = [].concat(r.memberIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var pt = M(function(e, t, n) {
            return Object(r.post)(k, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function(e) {
                return n
            })
        });

        function mt(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(r.post)(k, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                return y(e, 1)[0].forEach(function(e) {
                    return Object(_.oCacheAdd)(t, e)
                }), t
            })
        }

        function gt(e, t, n) {
            var r = {},
                i = n.get();

            function o(e, t) {
                Object(u.isChatPeer)(e) && t && !Object(_.oCacheExists)(i, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var s = t.filter(function(e) {
                return !Object(u.isTabLoaded)(i, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
            t.forEach(function(e) {
                o(e.peerId, e.userId)
            }), e.forEach(function(e) {
                o(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(function(e) {
                return e.flags & a.FLAG_OUTBOUND && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !i.admins[e]
            });
            return 0 === Object.keys(r).length && 0 === c.length && 0 === s.length ? Promise.resolve(i) : {
                shouldLoad: Object.keys(r).length > 0 || c.length > 0 || s.length > 0,
                needMembers: r,
                needAdminIds: c,
                needPeers: s
            }
        }

        function vt(e, t, n) {
            var r = e.needMembers,
                i = e.needAdminIds,
                a = e.needPeers;
            return t.pause(), Promise.all([mt(r, n), re(i, n), Promise.all(a.map(function(e) {
                return R(e, 0, 0, 0, n)
            }))]).catch(function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }
        var bt = M(function(e, t) {
            return e.kludges.source_act === u.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.post)(k, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = y(n, 2),
                    i = r[0],
                    a = r[1];
                t.chat_photo_msg = a;
                var o = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = i[0], t.tabs[e.peerId].photoLarge = i[1], Object(u.isFullyLoadedTab)(t, e.peerId)) {
                    var s = e.kludges.source_act;
                    o.history = Object(u.addChatPhotoToUpdate)(e, s, t, P(o.history))
                }
                return t
            })
        });

        function yt(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(u.isTabLoaded)(r, n) && r.peer == n && (r = V(r)), Promise.resolve(r))
        }
        var wt = M(function(e, t) {
                return Object(r.post)(k, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(yt.bind(null, u.CHAT_KICK_USER, vk.id, e, t))
            }),
            Ct = M(function(e, t) {
                return Object(r.post)(k, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(yt.bind(null, u.CHAT_INVITE_USER, vk.id, e, t))
            }),
            kt = M(function(e, t, n) {
                return Object(r.post)(k, {
                    act: "a_mute",
                    peer: e,
                    hash: n.tabs[e].hash,
                    gid: n.gid,
                    value: t ? 1 : 0
                }).then(function() {
                    var r = t ? "mute" : "unmute";
                    return window.Notifier && Notifier.lcSend("im", {
                        act: r,
                        peer: e
                    }), n
                }).then(Tt.bind(null, e, t))
            });

        function Tt(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, V(n)
        }

        function Et(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var Ot = M(function(e, t, n, i) {
            return Nt(e, n, t, i), Object(r.post)(k, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: i.gid,
                peer: n,
                hash: i.tabs[n].hash
            }).then(function() {
                return i
            })
        });

        function Nt(e, t, n, r) {
            if (Object(u.isFullyLoadedTab)(r, t)) {
                var i = r.tabs[t];
                e.filter(function(e) {
                    return i.msgs[e]
                }).forEach(function(e) {
                    var o = Object(l.getMessage)(r, t, e),
                        s = n ? o.flags | a.FLAG_IMPORTANT : o.flags & ~a.FLAG_IMPORTANT;
                    o.flags = s, i.msgs[e] = o, i.history = Object(u.updateStar)(e, n, P(i.history))
                })
            }
            return Promise.resolve(r)
        }

        function St(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function jt(e, t) {
            return Object(r.post)(k, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function It(e, t) {
            return Object(r.post)(k, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function xt(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Ft(e, t) {
            return Object(r.post)(k, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function At(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }

        function Mt(e, t, n) {
            return Object(r.post)("al_page.php", {
                act: "owner_photo_save",
                peer: e,
                _query: t
            }).then(function(e) {
                return n
            })
        }
        var Pt = M(function(e, t, n, i) {
            return i.creating = !0, i.longpoll.pause(), Object(r.post)(k, {
                act: "a_multi_start",
                hash: i.writeHash,
                peers: t.join(","),
                title: n
            }).then(function(e) {
                var t = y(e, 1)[0];
                return i.next_peer = t.peerId, i.tabs[t.peerId] = t, ne(i, t, !1, function(e) {
                    return [t.peerId].concat(e)
                }), i.longpoll.resume(), i
            }).then(function(t) {
                return e ? Mt(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            }).catch(function(e) {
                throw i.creating = !1, i.longpoll.resume(), e
            })
        });

        function Lt(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                i = e.active_tab;
            return Object(r.post)(k, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: i,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(n) {
                var r = y(n, 5),
                    a = r[0],
                    o = r[1],
                    c = r[2],
                    l = r[3],
                    f = r[4];
                o.forEach(function(t) {
                    return Object(_.oCacheAdd)(e, t)
                }), Object(u.normalizeTabsGotFromServer)(e, a), c.user_unread && handlePageCount("msg", c.user_unread), Object(s.lplog)("Resync success", "success");
                var h = e.peer,
                    p = void 0;
                if (Object(u.isReservedPeer)(h)) p = Promise.resolve(!1);
                else {
                    var m = {
                        tabs: w({}, h, e.tabs[h]),
                        oCache: {}
                    };
                    p = pe(w({}, h, a[h]), m)
                }
                return p.then(function(n) {
                    e.tabs = a, e.admins = extend(e.admins, l), n && (e.tabs[h] = n.tabs[h], e.tabs[h].history = Object(u.restoreQueue)(h, e, P(e.tabs[h].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[i] = f.map(intval);
                    var r = e.dialog_tabs[i].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != i
                    }).forEach(function(t) {
                        i == d.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(Wt(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ht(intval(c.unread), e)
                })
            }).catch(function(t) {
                return Object(s.lplog)("Resync error: " + t.message + " " + t.stack, "error"), Object(o.pause)(2).then(Lt.bind(null, e))
            })
        }

        function Dt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Rt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Bt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0
        }

        function Ht(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[d.FOLDER_UNREAD] = e, Promise.resolve(t)
        }

        function Ut(e, t) {
            return t.ctrl_submit = !!e, Object(r.post)(k, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function qt(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                i = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var a = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(v.setDocumentTitle)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(v.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(v.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, i, n);
                n.update_title_to = setInterval(a, 1e3), a()
            } else !t && n.update_old_title && (Object(v.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + i + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function zt(e, t, n, r, i) {
            return Object(u.isFullyLoadedTab)(i, e) && (i.tabs[e].scrollTop = intval(t), i.tabs[e].scrollBottom = intval(n), i.tabs[e].contHeight = intval(r)), Promise.resolve(i)
        }

        function Wt(e) {
            return e === d.FOLDER_ALL ? function() {
                return !0
            } : e === d.FOLDER_UNREAD ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & d.FOLDER_MASKS[e]
            }
        }

        function Gt(e, t) {
            t.active_tab = e, Object(i.updateLocation)({
                tab: e === d.FOLDER_ALL ? null : e
            });
            var n = [];
            if (e !== d.FOLDER_ALL && !Object(u.isReversedDialogs)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[d.FOLDER_ALL].map(function(e) {
                    return t.tabs[e]
                }).filter(Wt(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function Kt(e, t, n, r) {
            var i = e.dialog_tabs_all;
            return !(!i[d.FOLDER_ALL] && !i[t]) || (n.filter(function(e) {
                return e === r.peerId
            }).length > 0 || ("r" === r.lastmsg[0] || n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(u.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            }).length > 0))
        }

        function Vt(e, t, n, r, i) {
            if (Object(u.isTabLoaded)(i, e)) {
                var o = i.tabs[e];
                return n === a.REPLACE_DIRECTORIES && (t ^= o.folders),
                    function(e, t, n) {
                        return !(e === a.SET_DIRECTORIES && n.folders & t || !(e !== a.RESET_DIRECTORIES || n.folders & t))
                    }(n, t, o) && Object.keys(d.FOLDER_MASKS).filter(function(e) {
                        return d.FOLDER_MASKS[e] & t
                    }).forEach(function(e) {
                        i.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== a.RESET_DIRECTORIES || e.folders & d.FOLDER_MASKS[n] ? t === a.REPLACE_DIRECTORIES ? e.folders & d.FOLDER_MASKS[n] ? -1 : 1 : t === a.SET_DIRECTORIES ? 1 : -1 : 0
                        }(o, n, e)
                    }), n === a.SET_DIRECTORIES ? i.tabs[e].folders |= t : n === a.RESET_DIRECTORIES ? i.tabs[e].folders &= ~t : i.tabs[e].folders = t ^= o.folders, ne(i, i.tabs[e], !0, function(t, n) {
                        return t.concat([e]).map(function(e) {
                            return i.tabs[e]
                        }).filter(Wt(n)).map(function(e) {
                            return e.peerId
                        })
                    }, Kt.bind(null, i)), Promise.resolve(i)
            }
            return R(e, 0, 0, 0, i).then(Vt.bind(null, e, t, n, i))
        }
        var Yt = M(function(e, t) {
                var n = d.FOLDER_MASKS[d.FOLDER_IMPORTANT],
                    i = t.tabs[e].folders & n,
                    o = i ? a.resetDirectoriesEvent : a.setDirectoriesEvent;
                return t.longpoll.push([o([0, e, n, !0])]), Object(r.post)(k, {
                    act: "a_dialog_star",
                    val: i ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            Qt = M(function(e, t, n) {
                var i = d.FOLDER_MASKS[d.FOLDER_UNRESPOND];
                return n.longpoll.push([a.resetDirectoriesEvent([0, e, i, !0]), a.readInboundEvent([6, e, t])]), Object(r.post)(k, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(function() {
                    return n
                })
            });

        function Xt(e) {
            return Object(r.post)(k, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function $t(e, t) {
            return D(w({}, e, {
                free: !0
            }), t), Object(r.post)(k, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(function() {
                return t
            })
        }

        function Jt(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var Zt = M(function(e, t) {
            return ne(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(r.post)(k, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? (nn(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, ne(t, t.tabs[e], !1, ae.bind(null, e), Kt.bind(null, t))), n
            })
        });

        function en(e, t, n, i) {
            return Object(r.post)(k, {
                act: "a_restore_dialog",
                hash: t,
                gid: i.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(function(t) {
                return i.tabs[e].deletedDialog = !1, ne(i, i.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), i.tabs[e].unread = t, i
            })
        }

        function tn(e, t, n) {
            return Object(r.post)(k, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function nn(e, t, n) {
            return n.tabbedPeers = e, Object(u.isClassicInterface)(n) && (S({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(u.getBareTab)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(u.convertPeerToUrl).join("_")
            }), t && j()), Promise.resolve(n)
        }

        function rn(e) {
            return !e.peer || (Ke(e.peer, e) ? Ge(e.peer, e) : !!Object(u.isFullyLoadedTab)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function an(e, t) {
            var n = t.tabs[e];
            return Object(u.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function on(e, t) {
            var n = t.tabs[e];
            return Object(u.isFullyLoadedTab)(t, e) && (n.history = L(n.history)), Promise.resolve(t)
        }

        function sn(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function cn(e, t, n) {
            if (!Object(u.isCommunityPeer)(t)) return Promise.resolve(n);
            var i = Object(l.getTab)(n, t);
            return i.blocked_community = !e, Object(r.post)(k, {
                act: "a_toggle_community",
                peer_id: t,
                hash: i.hash,
                state: e ? 1 : 0
            }).then(function() {
                return V(n)
            })
        }

        function un(e, t) {
            if (0 !== t.peer && Object(u.isFullyLoadedTab)(t, t.peer)) {
                var n = Object(l.getTab)(t, t.peer);
                n.history = P(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function dn(e) {
            return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
        }

        function ln(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function fn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function _n(e) {
            S({
                act: e ? "create" : null
            }), j()
        }

        function hn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            S({
                q: e
            }), j()
        }

        function pn(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(u.getClassicChatHeight)() > window.clientHeight() && Object(u.setClassicChatHeight)(0)), Promise.resolve(e)
        }
        var mn = M(function(e, t, n) {
            return Object(r.post)(k, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(function(e) {
                var t = y(e, 4),
                    r = t[0],
                    i = t[1],
                    a = t[2],
                    o = t[3];
                return a.forEach(function(e) {
                    return Object(_.oCacheAdd)(n, e)
                }), n.tabs[r] = i, ne(n, i, !1, ae.bind(null, r), Kt.bind(null, n)), n.admins = extend(n.admins, o), [r]
            })
        });

        function gn(e, t) {
            return Object(r.post)(k, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var vn = M(function(e, t) {
            var n = t.tabs[e];
            return Object(r.post)(k, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        });

        function bn(e) {
            return I({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function yn(e, t) {
            var n = Object(s.arrayUnique)([e].concat(t.select(c.RECENT_SEARCH_OP))).slice(0, 500);
            t.update(c.RECENT_SEARCH_OP, n)
        }

        function wn(e) {
            e.update(c.RECENT_SEARCH_OP, [])
        }

        function Cn(e, t) {
            var n = t.select(c.RECENT_SEARCH_OP).filter(function(t) {
                return t !== e
            });
            return t.update(c.RECENT_SEARCH_OP, n), n
        }

        function kn(e, t, n) {
            var r = n.tabs[t],
                i = Object(l.getMessage)(n, t, e);
            return r.data.kicked || r.data.closed || i.kludges.source_act || (r.pinned = i), Promise.resolve(n)
        }

        function Tn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var En = M(function(e, t, n) {
                var i = n.tabs[t];
                return i.data.kicked || i.data.closed ? Promise.resolve(n) : Object(r.post)(k, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(function(e) {
                    var r = y(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, i, r), n
                })
            }),
            On = M(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.post)(k, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var i = y(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, i), t
                })
            }),
            Nn = M(function(e, t) {
                var n = t.tabs[e];
                return Object(r.post)(k, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = y(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            Sn = M(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.post)(k, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: i.hash
                })
            }),
            jn = M(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.post)(k, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(function(e) {
                    var r = y(e, 1),
                        i = y(r[0], 3),
                        a = i[0],
                        o = i[1],
                        s = i[2];
                    return n.memberIds = a, n.adminIds = o, s.forEach(function(e) {
                        return Object(_.oCacheAdd)(t, e)
                    }), n.membersLoaded = !0, t
                })
            }),
            In = M(function(e, t) {
                return Promise.all([jn(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.post)(k, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(function(e) {
                        var r = y(e, 1)[0];
                        return n.photoGrid = r.grid, n.photoLarge = r.photo, n.membersLastSeen = r.lastSeen || null, n.inviters = r.inviters, n.caccess = r.caccess, n.invitedByMe = r.invitedByMe || [], n.inviteLink = r.link || null, n.serverSettings = r.serverSettings || null, t
                    })
                }(e, t)]).then(function() {
                    return t
                })
            }),
            xn = M(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.post)(k, {
                    act: "a_update_flags",
                    chat: e,
                    hash: i.hash,
                    flags: t
                })
            }),
            Fn = M(function(e, t) {
                var n = t.tabs[e];
                return Object(r.post)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(function() {
                    return n.photo = null, n.photoLarge = null, t
                })
            });

        function An(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var Mn = M(function(e, t, n) {
            var i = n.tabs[e];
            return Object(r.post)(k, {
                act: "a_kick_user",
                chat: e,
                hash: i.hash,
                mid: t
            }).then(function() {
                return i.memberIds = i.memberIds.filter(function(e) {
                    return e !== t
                }), i.adminIds = i.adminIds.filter(function(e) {
                    return e !== t
                }), i.membersCount = i.memberIds.length, n
            })
        });

        function Pn(e, t, n, r) {
            var i = r.tabs[e];
            return i.adminIds = n ? [].concat(i.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : i.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }
        var Ln = M(function(e, t, n, i) {
            var a = i.tabs[e];
            return Object(r.post)(k, {
                act: "a_toggle_admin",
                chat: e,
                hash: a.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return Pn(e, t, n, i)
            })
        });

        function Dn(e, t, n, r) {
            var i = Object(l.getMessage)(e, n, t).userId;
            return Object(_.oCacheGet)(r, i) ? Promise.resolve(r) : mt(w({}, n, [i]), r)
        }

        function Rn() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Bn() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Hn = M(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.post)(k, {
                    act: "a_hide_banner",
                    peer_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Un = M(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var i = n.tabs[e];
                return Object(r.post)(k, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: i.hash
                }).then(function() {
                    return n
                })
            });

        function qn(e, t) {
            return Object(r.post)(k, {
                act: "a_load_banner",
                peer_id: e
            }).then(function(n) {
                var r = y(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function zn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Gn(e, !1, !0, n)
        }

        function Wn(e, t) {
            return zn(e, null, t)
        }

        function Gn(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, w({}, e, t)))), Promise.resolve(r)
        }
        var Kn = M(function(e, t) {
            var n = t.tabs[e];
            return Object(r.post)(k, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(function(n) {
                var r = y(n, 1)[0];
                return zn(e, r, t)
            })
        });

        function Vn(e, t, n, i) {
            var a = i.tabs[e];
            return a.caccess[t] = n, Object(r.post)(k, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: a.hash,
                access: n ? 1 : 0
            }).then(function() {
                return i
            }).catch(function(e) {
                throw a.caccess[t] = !n, e
            })
        }
        var Yn = M(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.post)(k, {
                act: "a_delete_template",
                template_id: e,
                hash: n.hash,
                gid: t.gid,
                peer_id: t.peer
            }).then(function() {
                var n = t.templates.find(function(t) {
                    return t.id === e
                });
                return n && (n.deleted = !0), t
            })
        });

        function Qn(e, t, n) {
            var i = n.tabs[n.peer];
            return Object(r.post)(k, {
                act: "a_create_template",
                hash: i.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(function(e) {
                return n.templates.unshift(e[0]), n
            })
        }

        function Xn(e, t, n, i) {
            var a = i.tabs[i.peer];
            return Object(r.post)(k, {
                act: "a_update_template",
                template_id: e,
                hash: a.hash,
                gid: i.gid,
                peer_id: i.peer,
                group_id: i.gid,
                name: t,
                text: n
            }).then(function(t) {
                var n = i.templates.find(function(t) {
                    return t.id === e
                });
                return n && Object.assign(n, t[0]), i
            })
        }

        function $n(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e)) {
                var n = Object(l.getTab)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }
    },
    93: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "lpSingleton_getInstance", function() {
            return h
        }), n.d(t, "lpSingleton_onTabInitialLoaded", function() {
            return p
        }), n.d(t, "lpSingleton_syncWithNotifier", function() {
            return m
        }), n.d(t, "lpSingleton_onNotifierRecv", function() {
            return g
        });
        var r = n(84),
            i = n(197),
            a = n(30),
            o = n(221),
            s = window.vk,
            c = window.lpConnect,
            u = window.lpInstance;

        function d() {
            return s.id > 0
        }

        function l() {
            return window.curNotifier && window.curNotifier.lp_connected
        }

        function f() {
            return window.curNotifier && window.curNotifier.is_server || window.browser.safari
        }

        function _(e, t, n) {
            u.onLp(e, t, n), l() && f() && (e != t || n.length) && function(e, t, n) {
                window.Notifier.lcSend("lp_data", {
                    tsOld: e,
                    tsNow: t,
                    evs: n
                }), Object(a.lpLogFc)("silver", "broadcast to others", e, t, n)
            }(e, t, n)
        }

        function h() {
            return d() ? (u || (s.lpConfig.id = s.id, window.lpConnect = c = Object(r.createLongpoll)(s.lpConfig, _), e = Object(i.createLongpollEventsQueue)(s.lpConfig.ts, function(e) {
                Object(a.longpollTesting_onFcEvents)(e), t.trigger("data", e)
            }, v), t = new window.EventEmitter, window.lpInstance = u = {
                onData: function(e) {
                    t.on("data", e)
                },
                offData: function(e) {
                    t.off("data", e)
                },
                pause: function() {
                    e.pause()
                },
                resume: function() {
                    e.resume()
                },
                push: function(e) {
                    t.trigger("data", e)
                },
                abortWaiting: function() {
                    c.abortWaiting()
                },
                onLp: function(t, n, r) {
                    e.onLp(t, n, r)
                },
                isEnabled: function() {
                    return !(!c || c.isStopped())
                }
            }), u) : null;
            var e, t
        }

        function p() {
            d() && (Object(a.lpLogFc)("orange", "init longpoll connection on load"), h(), window.curNotifier.idle_manager.on("unidle", function() {
                c.abortWaiting()
            }), m())
        }

        function m() {
            d() && (l() ? c.isStopped() && f() ? (Object(a.lpLogFc)("orange", "now master, init connection"), Object(o.imWeirdLog)("fc_longpoll_master", {}, !1), c.reinitConnection()) : c.isStopped() || f() || (Object(a.lpLogFc)("orange", "now slave, stop connection"), Object(o.imWeirdLog)("fc_longpoll_slave", {}, !1), c.stopConnection()) : setTimeout(m, 500))
        }

        function g(e) {
            l() && !f() && d() && (Object(a.lpLogFc)("silver", "recv from master", e.tsOld, e.tsNow, e.evs), c.onLp(e.tsOld, e.tsNow, e.evs))
        }

        function v(e) {
            var t = window.extend({}, window.lpConnect.options, {
                ts: e
            });
            return Object(a.lpLogFc)("orange", "createLongpoll to load from", e), new Promise(function(e) {
                var n = Object(r.createLongpoll)(t, function(t, r, i) {
                    Object(a.lpLogFc)("orange", "Loaded [" + t + "," + r + ")"), n.stopConnection(), e([t, r, i])
                })
            })
        }
    }
});