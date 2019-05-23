! function(t) {
    function e(e) {
        for (var o, n, a = e[0], l = e[1], c = e[2], h = 0, u = []; h < a.length; h++) n = a[h], i[n] && u.push(i[n][0]), i[n] = 0;
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (t[o] = l[o]);
        for (d && d(e); u.length;) u.shift()();
        return s.push.apply(s, c || []), r()
    }

    function r() {
        for (var t, e = 0; e < s.length; e++) {
            for (var r = s[e], o = !0, a = 1; a < r.length; a++) {
                var l = r[a];
                0 !== i[l] && (o = !1)
            }
            o && (s.splice(e--, 1), t = n(n.s = r[0]))
        }
        return t
    }
    var o = {},
        i = {
            "web/stories": 0
        },
        s = [];

    function n(e) {
        if (o[e]) return o[e].exports;
        var r = o[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = o, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(r, o, function(e) {
                return t[e]
            }.bind(null, o));
        return r
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "";
    var a = window.webpackJsonp = window.webpackJsonp || [],
        l = a.push.bind(a);
    a.push = e, a = a.slice();
    for (var c = 0; c < a.length; c++) e(a[c]);
    var d = l;
    s.push([138, "common", "bundles/vendors"]), r()
}({
    "+wdc": function(t, e, r) {
        "use strict";
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = null,
                o = !1,
                i = 3,
                s = -1,
                n = -1,
                a = !1,
                l = !1;

            function c() {
                if (!a) {
                    var t = r.expirationTime;
                    l ? k() : l = !0, S(u, t)
                }
            }

            function d() {
                var t = r,
                    e = r.next;
                if (r === e) r = null;
                else {
                    var o = r.previous;
                    r = o.next = e, e.previous = o
                }
                t.next = t.previous = null, o = t.callback, e = t.expirationTime, t = t.priorityLevel;
                var s = i,
                    a = n;
                i = t, n = e;
                try {
                    var l = o()
                } finally {
                    i = s, n = a
                }
                if ("function" == typeof l)
                    if (l = {
                            callback: l,
                            priorityLevel: t,
                            expirationTime: e,
                            next: null,
                            previous: null
                        }, null === r) r = l.next = l.previous = l;
                    else {
                        o = null, t = r;
                        do {
                            if (t.expirationTime >= e) {
                                o = t;
                                break
                            }
                            t = t.next
                        } while (t !== r);
                        null === o ? o = r : o === r && (r = l, c()), (e = o.previous).next = o.previous = l, l.next = o, l.previous = e
                    }
            }

            function h() {
                if (-1 === s && null !== r && 1 === r.priorityLevel) {
                    a = !0;
                    try {
                        do {
                            d()
                        } while (null !== r && 1 === r.priorityLevel)
                    } finally {
                        a = !1, null !== r ? c() : l = !1
                    }
                }
            }

            function u(t) {
                a = !0;
                var i = o;
                o = t;
                try {
                    if (t)
                        for (; null !== r;) {
                            var s = e.unstable_now();
                            if (!(r.expirationTime <= s)) break;
                            do {
                                d()
                            } while (null !== r && r.expirationTime <= s)
                        } else if (null !== r)
                            do {
                                d()
                            } while (null !== r && !E())
                } finally {
                    a = !1, o = i, null !== r ? c() : l = !1, h()
                }
            }
            var p, _, y = Date,
                v = "function" == typeof setTimeout ? setTimeout : void 0,
                f = "function" == typeof clearTimeout ? clearTimeout : void 0,
                m = "function" == typeof requestAnimationFrame ? requestAnimationFrame : void 0,
                g = "function" == typeof cancelAnimationFrame ? cancelAnimationFrame : void 0;

            function w(t) {
                p = m(function(e) {
                    f(_), t(e)
                }), _ = v(function() {
                    g(p), t(e.unstable_now())
                }, 100)
            }
            if ("object" == typeof performance && "function" == typeof performance.now) {
                var b = performance;
                e.unstable_now = function() {
                    return b.now()
                }
            } else e.unstable_now = function() {
                return y.now()
            };
            var S, k, E, L = null;
            if ("undefined" != typeof window ? L = window : void 0 !== t && (L = t), L && L._schedMock) {
                var T = L._schedMock;
                S = T[0], k = T[1], E = T[2], e.unstable_now = T[3]
            } else if ("undefined" == typeof window || "function" != typeof MessageChannel) {
                var C = null,
                    x = function(t) {
                        if (null !== C) try {
                            C(t)
                        } finally {
                            C = null
                        }
                    };
                S = function(t) {
                    null !== C ? setTimeout(S, 0, t) : (C = t, setTimeout(x, 0, !1))
                }, k = function() {
                    C = null
                }, E = function() {
                    return !1
                }
            } else {
                "undefined" != typeof console && ("function" != typeof m && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" != typeof g && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));
                var B = null,
                    P = !1,
                    j = -1,
                    N = !1,
                    F = !1,
                    I = 0,
                    O = 33,
                    A = 33;
                E = function() {
                    return I <= e.unstable_now()
                };
                var D = new MessageChannel,
                    R = D.port2;
                D.port1.onmessage = function() {
                    P = !1;
                    var t = B,
                        r = j;
                    B = null, j = -1;
                    var o = e.unstable_now(),
                        i = !1;
                    if (0 >= I - o) {
                        if (!(-1 !== r && r <= o)) return N || (N = !0, w(M)), B = t, void(j = r);
                        i = !0
                    }
                    if (null !== t) {
                        F = !0;
                        try {
                            t(i)
                        } finally {
                            F = !1
                        }
                    }
                };
                var M = function(t) {
                    if (null !== B) {
                        w(M);
                        var e = t - I + A;
                        e < A && O < A ? (8 > e && (e = 8), A = e < O ? O : e) : O = e, I = t + A, P || (P = !0, R.postMessage(void 0))
                    } else N = !1
                };
                S = function(t, e) {
                    B = t, j = e, F || 0 > e ? R.postMessage(void 0) : N || (N = !0, w(M))
                }, k = function() {
                    B = null, P = !1, j = -1
                }
            }
            e.unstable_ImmediatePriority = 1, e.unstable_UserBlockingPriority = 2, e.unstable_NormalPriority = 3, e.unstable_IdlePriority = 5, e.unstable_LowPriority = 4, e.unstable_runWithPriority = function(t, r) {
                switch (t) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    default:
                        t = 3
                }
                var o = i,
                    n = s;
                i = t, s = e.unstable_now();
                try {
                    return r()
                } finally {
                    i = o, s = n, h()
                }
            }, e.unstable_next = function(t) {
                switch (i) {
                    case 1:
                    case 2:
                    case 3:
                        var r = 3;
                        break;
                    default:
                        r = i
                }
                var o = i,
                    n = s;
                i = r, s = e.unstable_now();
                try {
                    return t()
                } finally {
                    i = o, s = n, h()
                }
            }, e.unstable_scheduleCallback = function(t, o) {
                var n = -1 !== s ? s : e.unstable_now();
                if ("object" == typeof o && null !== o && "number" == typeof o.timeout) o = n + o.timeout;
                else switch (i) {
                    case 1:
                        o = n + -1;
                        break;
                    case 2:
                        o = n + 250;
                        break;
                    case 5:
                        o = n + 1073741823;
                        break;
                    case 4:
                        o = n + 1e4;
                        break;
                    default:
                        o = n + 5e3
                }
                if (t = {
                        callback: t,
                        priorityLevel: i,
                        expirationTime: o,
                        next: null,
                        previous: null
                    }, null === r) r = t.next = t.previous = t, c();
                else {
                    n = null;
                    var a = r;
                    do {
                        if (a.expirationTime > o) {
                            n = a;
                            break
                        }
                        a = a.next
                    } while (a !== r);
                    null === n ? n = r : n === r && (r = t, c()), (o = n.previous).next = n.previous = t, t.next = n, t.previous = o
                }
                return t
            }, e.unstable_cancelCallback = function(t) {
                var e = t.next;
                if (null !== e) {
                    if (e === t) r = null;
                    else {
                        t === r && (r = e);
                        var o = t.previous;
                        o.next = e, e.previous = o
                    }
                    t.next = t.previous = null
                }
            }, e.unstable_wrapCallback = function(t) {
                var r = i;
                return function() {
                    var o = i,
                        n = s;
                    i = r, s = e.unstable_now();
                    try {
                        return t.apply(this, arguments)
                    } finally {
                        i = o, s = n, h()
                    }
                }
            }, e.unstable_getCurrentPriorityLevel = function() {
                return i
            }, e.unstable_shouldYield = function() {
                return !o && (null !== r && r.expirationTime < n || E())
            }, e.unstable_continueExecution = function() {
                null !== r && c()
            }, e.unstable_pauseExecution = function() {}, e.unstable_getFirstCallbackNode = function() {
                return r
            }
        }).call(this, r("yLpj"))
    },
    138: function(t, e, r) {
        t.exports = r("EJ7F")
    },
    "16Al": function(t, e, r) {
        "use strict";
        var o = r("ohE5"),
            i = r("2NuI"),
            s = r("WbBG");
        t.exports = function() {
            function t(t, e, r, o, n, a) {
                a !== s && i(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
            }

            function e() {
                return t
            }
            t.isRequired = t;
            var r = {
                array: t,
                bool: t,
                func: t,
                number: t,
                object: t,
                string: t,
                symbol: t,
                any: t,
                arrayOf: e,
                element: t,
                instanceOf: e,
                node: t,
                objectOf: e,
                oneOf: e,
                oneOfType: e,
                shape: e,
                exact: e
            };
            return r.checkPropTypes = o, r.PropTypes = r, r
        }
    },
    "17x9": function(t, e, r) {
        t.exports = r("16Al")()
    },
    EJ7F: function(t, e, r) {
        "use strict";
        r.r(e);
        var o = r("q1tI"),
            i = r("i8i4"),
            s = r("E2g8"),
            n = s.Promise,
            a = {},
            l = {},
            c = [],
            d = !1,
            h = !1;

        function u(t, e, r) {
            var o = l[t];
            if (o)
                for (var i = 0; i < o.length; i++) {
                    var s = o[i];
                    e ? s.resolve(r) : s.reject(), o.splice(i, 1), i--
                }
        }

        function p(t, e) {
            d.postMessage({
                cmd: "load",
                url: t
            })
        }

        function _(t) {
            return d || ((d = new Worker("/js/al/stories_loader_worker.js")).onmessage = function(t) {
                var e = t.data;
                switch (e.type) {
                    case "loaded":
                        a[e.url] = e.data, u(e.url, !0, e.data);
                        break;
                    case "error":
                        u(e.url, !1);
                        break;
                    case "inited":
                        h = !0;
                        for (var r = 0; r < c.length; r++) p(c[r])
                }
            }), new n(function(e, r) {
                if (t || e(""), a[t]) return e(a[t]);
                switch (function(t) {
                    return t.match(/\.mp4/) ? "video" : t.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
                }(t)) {
                    case "video":
                    case "image":
                        l[t] || (l[t] = []);
                        var o = 0 === l[t].length;
                        if (l[t].push({
                                resolve: e,
                                reject: r
                            }), !o) return;
                        h ? p(t) : c.push(t);
                        break;
                    default:
                        vk.dev && console.error("wrong media url")
                }
            })
        }
        var y = !1;

        function v(t) {
            return y || function() {
                var t = function(t) {
                    try {
                        return t.contentDocument ? t.contentDocument : t.contentWindow && t.contentWindow.document ? t.contentWindow.document : t.document
                    } catch (t) {}
                    return !1
                }(utilsNode.appendChild(ce("iframe")));
                y = t && t.body ? t.body : utilsNode.appendChild(ce("div", {}, {
                    display: "none"
                }))
            }(), t.match(/\.mp4/) ? function(t) {
                return new n(function(e, r) {
                    var o = ce("video");
                    o.oncanplay = function() {
                        e(), re(o)
                    }, o.onerror = function() {
                        r(), re(o)
                    }, y.appendChild(o), o.src = t
                })
            }(t) : function(t) {
                return new n(function(e, r) {
                    var o = vkImage();
                    o.onload = function() {
                        e(), re(o)
                    }, o.onerror = function() {
                        r(), re(o)
                    }, y.appendChild(o), o.src = t
                })
            }(t)
        }
        var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };

        function m() {
            var t = ls.get("video_volume");
            return "number" == typeof t ? Math.min(1, Math.max(0, t)) : 1
        }

        function g(t) {
            ls.set("video_volume", t)
        }

        function w() {
            var t = [];
            return [].concat(Array.prototype.slice.call(arguments)).forEach(function(e) {
                if (e) switch (void 0 === e ? "undefined" : f(e)) {
                    case "string":
                        t.push(e);
                        break;
                    case "object":
                        Object.keys(e).forEach(function(r) {
                            e[r] && t.push(r)
                        });
                        break;
                    default:
                        t.push("" + e)
                }
            }), t.join(" ")
        }
        var b = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            S = [];

        function k(t, e) {
            var r = arguments;
            cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = t, ge("stories_layers_background") || (bodyNode.appendChild(ce("div", {
                id: "stories_layers_background",
                className: "stories_layers_background"
            })), layerQueue.hide(), layerQueue.push(), layers.fullhide = L, addEvent(window, "visibilitychange", x.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", x.resize), addEvent(document, "keydown", x.keydown), addEvent(document, "keyup", x.keyup)), t.animateStory("expand", e.fromEl), S.push(t), t.length > 1 && addClass(t.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + S.length, function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    o = b(e, 1)[0],
                    i = r[0] && r[0].isCloseBtnClick;
                o ? t._sendNavigationStatEvents("close_auto_by_time") : t._sendNavigationStatEvents("close_tap"), S.length > 1 && !i ? t.back(!0) : (t.hideAllLayers = i, t.hide(!1, !0))
            })
        }

        function E() {
            S.length > 1 ? S[S.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
        }

        function L(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = 0; r < S.length; r++) S[r].hide(!0);
            if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), removeEvent(window, "visibilitychange", x.visibilitychange), removeEvent(window, "resize", x.resize), removeEvent(document, "keydown", x.keydown), removeEvent(document, "keyup", x.keyup), e) {
                var o = nav.objLoc;
                delete o.w, nav.setLoc(o)
            }
            cur.needUpdateFeedStories && Stories.updateFeedStories(), S = []
        }

        function T() {
            return S[S.length - 2]
        }

        function C(t) {
            for (var e = 0; e < S.length; e++) S[e].onReplyDeleted(t)
        }
        var x = {
                visibilitychange: function(t) {
                    cur.storyLayer && cur.storyLayer.onVisibilityChange(t)
                },
                resize: function(t) {
                    cur.storyLayer && cur.storyLayer.onResize(t)
                },
                keydown: function(t) {
                    cur.storyLayer && cur.storyLayer.onKeyDown(t)
                },
                keyup: function(t) {
                    cur.storyLayer && cur.storyLayer.onKeyUp(t)
                }
            },
            B = (r("17x9"), r("T/g7")),
            P = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function j(t) {
            var e = t.story,
                r = e.getCurStoryData().hide_settings,
                i = window.uiActionsMenu;
            if (r) return null;
            var s = function(t) {
                var e = [],
                    r = t.getCurStoryData(),
                    o = r.raw_id,
                    i = r.can_hide_reply,
                    s = r.report_hash,
                    n = r.can_remove,
                    a = r.can_share,
                    l = r.narrative,
                    c = r.is_ads,
                    d = t.data.can_blacklist,
                    h = o.split("_").map(function(t) {
                        return intval(t)
                    }),
                    u = P(h, 1)[0],
                    p = l && !l.is_cover;
                !d || p || c || e.push({
                    label: Object(B.b)("stories_add_blacklist_button"),
                    onClick: function() {
                        return t._addToBlacklist()
                    }
                });
                i && e.push({
                    label: Object(B.b)("stories_hide_reply_button"),
                    onClick: function() {
                        return t._hideReply()
                    }
                });
                l && e.push({
                    label: l.is_bookmarked ? Object(B.b)("stories_narrative_remove_bookmark_button") : Object(B.b)("stories_narrative_add_bookmark_button"),
                    onClick: function() {
                        return t._sendNarrativeBookmarkButtonDidPress()
                    }
                });
                a && e.push({
                    label: Object(B.b)("stories_share"),
                    onClick: function() {
                        return t.shareBox()
                    }
                });
                l && l.can_edit && e.push({
                    label: Object(B.b)("stories_narrative_edit_button"),
                    onClick: function() {
                        return t._sendNarrativeEditButtonDidPress()
                    }
                });
                n && t.getOwnerId() < 0 && e.push({
                    label: l ? Object(B.b)("global_narrative_delete") : Object(B.b)("global_delete"),
                    onClick: function() {
                        return l ? t.removeNarrativeBox() : t.removeStoryBox()
                    }
                });
                s && e.push({
                    label: Object(B.b)("stories_report"),
                    onClick: function() {
                        return t.report()
                    }
                });
                u === vk.id || p || e.push({
                    label: Object(B.b)("stories_settings"),
                    onClick: function() {
                        return window.Stories.showBlackList()
                    }
                });
                return e
            }(e);
            if (0 === s.length) return null;
            var n = void 0,
                a = void 0;
            return o.createElement("div", {
                className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
                onMouseEnter: function(t) {
                    clearTimeout(n), e.pauseStory(), i.show(a, t)
                },
                onMouseLeave: function() {
                    i.hide(a), clearTimeout(n), n = setTimeout(function() {
                        return e.autoResumeStory()
                    }, 300)
                },
                ref: function(t) {
                    a = t
                }
            }, o.createElement("div", {
                className: "ui_actions_menu _ui_menu"
            }, s.map(function(t) {
                var e = t.label,
                    r = (t.className, t.onClick);
                return o.createElement("div", {
                    key: e,
                    className: "ui_actions_menu_item",
                    onClick: r
                }, e)
            })))
        }

        function N(t) {
            var e = t.story,
                r = e.getReplies(),
                i = e.getViews() || "",
                s = e.getCurStoryData(),
                n = s.can_manage,
                a = s.narrative,
                l = r.count || "",
                c = a && !a.is_cover,
                d = !(!n || !i),
                h = e.isActiveLive();
            if (c || h || !i && !l) return null;
            return o.createElement("div", {
                className: "stories_button views _views_button",
                onClick: function(t) {
                    e._hideTooltip(), e.showFeedbackTooltip(), t.stopPropagation()
                }
            }, d && o.createElement("div", {
                className: "stories_button_views"
            }, i), l && o.createElement("div", {
                className: "stories_button_replies",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(l, "%s", !0)
                }
            }))
        }
        var F = window,
            I = F.getLang,
            O = F.showTooltip,
            A = F.trim,
            D = F.addEvent,
            R = F.removeEvent,
            M = F.cancelEvent,
            H = F.isObject,
            W = F.showNarrative,
            K = function(t) {
                function e(r) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var o = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r));
                    return o.emojiId = !1, o.state = {
                        story: r.story,
                        sendFormHasText: !1,
                        sendFormFocused: !1,
                        linkObjectAudioPlaying: !1
                    }, o
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.componentDidMount = function() {
                    this.emojiInit()
                }, e.prototype.componentWillUnmount = function() {
                    this.emojiId && (Emoji.destroy(this.emojiId), delete this.emojiId)
                }, e.prototype.componentDidUpdate = function() {
                    this.emojiInit()
                }, e.prototype.render = function() {
                    var t = this.props.story;
                    if (!t.story || !this.props.story.getCurStoryData()) return "";
                    var e = {
                        left_side_empty: this._leftSideIsEmpty()
                    };
                    return o.createElement("div", {
                        className: w("stories_story_bottom", e)
                    }, o.createElement("div", {
                        className: "stories_story_bottom_controls",
                        ref: "controls"
                    }, o.createElement(N, {
                        story: t
                    }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), o.createElement(j, {
                        story: t
                    })))
                }, e.prototype._renderLink = function() {
                    var t = this,
                        e = this.props.story.getCurStoryData().link;
                    if (!H(e)) return "";
                    var r = "stories_link";
                    return e.object_type && (r += " story_link_object_" + e.object_type), this.state.linkObjectAudioPlaying && (r += " story_link_object_audio_playing"), o.createElement("div", {
                        className: "stories_link_wrap"
                    }, o.createElement("a", {
                        target: "_blank",
                        rel: "noopener",
                        className: r,
                        href: e.url,
                        title: e.text,
                        onClick: function(r) {
                            t._linkDidPress(r, e)
                        }
                    }, o.createElement("span", {
                        className: "stories_link__inner",
                        dangerouslySetInnerHTML: {
                            __html: e.text
                        }
                    })))
                }, e.prototype._renderMask = function() {
                    return this.props.story.getCurStoryData().mask_id ? o.createElement("div", {
                        className: "stories_button mask _mask_button",
                        onMouseOver: function(t) {
                            return O(t.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: I("stories_mask_tooltip")
                            })
                        },
                        onClick: this._maskButtonDidPress.bind(this)
                    }) : ""
                }, e.prototype._renderShare = function() {
                    return !0 !== this.props.story.getCurStoryData().can_share ? "" : o.createElement("div", {
                        className: "stories_button share _share_button",
                        onMouseOver: function(t) {
                            return O(t.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: I("stories_share")
                            })
                        },
                        onClick: this._shareButtonDidPress.bind(this)
                    })
                }, e.prototype._renderRemove = function() {
                    var t = this.props.story;
                    return !t.getCurStoryData().can_remove || t.getOwnerId() < 0 ? "" : o.createElement("div", {
                        className: "stories_button remove _remove_button",
                        onMouseOver: function(t) {
                            return O(t.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: I("global_delete")
                            })
                        },
                        onClick: this._removeButtonDidPress.bind(this)
                    })
                }, e.prototype._canMessage = function() {
                    var t = this.props.story.getCurStoryData(),
                        e = t.link,
                        r = t.can_comment;
                    return !(H(e) || !r || this.props.story.isLiveEnded())
                }, e.prototype._renderMessageForm = function() {
                    var t = this,
                        e = this.props.story;
                    if (this._canMessage()) return o.createElement("div", {
                        ref: "sendForm",
                        className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                    }, o.createElement("div", {
                        className: "stories_send_form_text_wrap"
                    }, o.createElement("div", {
                        contentEditable: !0,
                        ref: "messageInput",
                        className: "stories_send_form_text",
                        placeholder: I("stories_answer_placeholder"),
                        onFocus: this._sendFormDidFocus.bind(this),
                        onBlur: this._sendFormDidBlur.bind(this),
                        onKeyUp: function() {
                            return e._onSendFormKeyUp()
                        }
                    })), o.createElement("div", {
                        className: "stories_send_form_helper"
                    }, o.createElement("div", {
                        className: w("stories_send_form_buttons _emoji_wrap", {
                            shown: this.state.sendFormFocused || this.state.sendFormHasText
                        })
                    }, o.createElement("div", {
                        ref: "smileButton",
                        className: "stories_send_form_button smile _emoji_btn emoji_smile",
                        onMouseEnter: function(e) {
                            Emoji.clearSizeCached(t.refs.smileButton), Emoji.show(t.refs.smileButton, e.nativeEvent)
                        },
                        onMouseLeave: function(e) {
                            return Emoji.hide(t.refs.smileButton, e.nativeEvent)
                        },
                        onMouseDown: function(t) {
                            return M(t.nativeEvent)
                        }
                    }), o.createElement("div", {
                        className: w("stories_send_form_button send", {
                            active: this.state.sendFormHasText
                        }),
                        onClick: this._sendMessageButtonDidPress.bind(this)
                    }))))
                }, e.prototype.emojiInit = function() {
                    var t = this;
                    !this.emojiId && this.refs.messageInput ? (this.emojiId = Emoji.init(this.refs.messageInput, {
                        ttDiff: 29,
                        noStickers: !0,
                        noStickersStore: !0,
                        ref: "stories",
                        ttWrap: this.refs.controls,
                        checkEditable: function() {
                            t.props.story.isActiveLive() && VideoChat.checkTextLen(t.refs.messageInput)
                        },
                        onSend: function() {
                            return t.props.story._onAnswerSend(void 0, function() {
                                return t._emojiDidKeyAction()
                            })
                        },
                        forceUp: !0,
                        controlsCont: this.refs.sendForm,
                        onKeyAction: function() {
                            return t._emojiDidKeyAction()
                        },
                        onEmojiAdded: function() {
                            return t._emojiDidKeyAction()
                        }
                    }), D(this.refs.smileButton, "click", M), placeholderInit(this.refs.messageInput, {
                        editable: !0
                    })) : this.emojiId && !this.refs.messageInput && (R(this.refs.smileButton, "click", M), Emoji.destroy(this.emojiId), delete this.emojiId)
                }, e.prototype._leftSideIsEmpty = function() {
                    var t = this.props.story,
                        e = this.props.story.getCurStoryData(),
                        r = e.can_manage,
                        o = e.link,
                        i = e.can_comment,
                        s = e.narrative,
                        n = t.getReplies(),
                        a = t.getViews();
                    return !(a && 0 !== parseInt(a) && !s) && (!n.count || !r) && !H(o) && !i || t.isLiveEnded()
                }, e.prototype._sendFormDidFocus = function() {
                    var t = this.props.story;
                    this.setState({
                        sendFormFocused: !0
                    }), t._onSendFormFocus(), t.layer._sendNavigationStatEvents("comment_tap")
                }, e.prototype._sendFormDidBlur = function() {
                    this.props.story._onSendFormBlur(), this.setState({
                        sendFormFocused: !1
                    }), this._emojiDidKeyAction()
                }, e.prototype._emojiDidKeyAction = function() {
                    var t = A(Emoji.editableVal(this.refs.messageInput));
                    this.setState({
                        sendFormHasText: t.length > 0
                    }), this.refs.messageInput.check()
                }, e.prototype._viewsButtonDidPress = function(t) {
                    this.props.story.showFeedbackTooltip(), t.stopPropagation()
                }, e.prototype._shareButtonDidPress = function() {
                    this.props.story.shareBox()
                }, e.prototype._removeButtonDidPress = function() {
                    this.props.story.removeStoryBox()
                }, e.prototype._maskButtonDidPress = function() {
                    this.props.story.sendMask()
                }, e.prototype._linkDidPress = function(t, e) {
                    if (e) {
                        var r = e.object_type,
                            o = e.object,
                            i = e.url.match(/\/narrative(-?\d+_\d+)/);
                        if (i) {
                            t.preventDefault();
                            var s = i[1];
                            s && (this.props.story.pauseStory(), W(s, {
                                fromEl: this.props.story.wrapEl,
                                isOpenNarrativeFromFeed: !0,
                                source: "narrative_story"
                            }))
                        } else this.props.story._sendStatEvent("url_view");
                        switch (r) {
                            case "audio":
                                this.state.linkObjectAudioPlaying ? (getAudioPlayer().pause(), this.state.story.audioPlaying = !1, cur.storyLayer.resumeLayer()) : (getAudioPlayer().playAudio(o), this.state.story.audioPlaying = !0, cur.storyLayer.pauseLayer()), this.setState({
                                    linkObjectAudioPlaying: !this.state.linkObjectAudioPlaying
                                }), t.preventDefault()
                        }
                    }
                }, e.prototype._sendMessageButtonDidPress = function() {
                    var t = this;
                    this.props.story._onAnswerSend(void 0, function() {
                        return t._emojiDidKeyAction()
                    })
                }, e
            }(o.Component);
        var V = function() {
            function t(e, r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.data = e, this.opts = r, this.paused = !0, this.loaded = !1, this.elems = {}, this.startTs = 0;
                var o = e.is_expired,
                    i = e.is_deleted,
                    s = e.can_view_deleted,
                    n = e.is_private,
                    a = e.narrative;
                s || (o ? this._error("expired") : i ? a ? this._error("deleted-narrative") : this._error("deleted") : n && (a ? this._error("private-narrative") : this._error("private")), (o || i || n) && (this.failed = !0))
            }
            return t.prototype.render = function() {
                var t = this;
                this._isFailed() && this.isNarrativeMetaStory || (this.longLoadingTimer = setTimeout(function() {
                    t.isLoaded() || t.opts.onLongLoading()
                }, 1e3), this.opts.onLoadingStart())
            }, t.prototype.renderNarrativeCover = function() {
                var t = this.data,
                    e = t.narrative,
                    r = t.photo_url,
                    o = e && e.views ? winToUtf(" · " + e.views) : "";
                return this.NarrativeCover = se('\n      <div class="stories_narrative_cover">\n        <div class="stories_narrative_cover_photo" id="stories_narrative_cover_photo" style="background-image: url(' + data + ')"></div>\n        <div class="stories_narrative_cover__info">\n          <span class="stories_narrative_cover__label">' + getLang("global_type_narrative") + '</span>\n          <span class="stories_narrative_cover__views">' + o + '</span>\n        </div>\n        <div class="stories_narrative_cover__title">' + e.title + '</div>\n        <div class="stories_narrative_cover__author">' + e.owner_name + "</div>\n      </div>\n    "), _(r).then(function(t) {
                    var e = geByClass1("stories_narrative_cover_photo");
                    e && setStyle(e, "backgroundImage", "url(" + t + ")")
                }), this.NarrativeCover
            }, t.prototype.renderNarrativeMetaStory = function() {
                var t = this,
                    e = !(!cur.storyLayer || !cur.storyLayer.isOpenNarrativeFromFeed),
                    r = cur.storyLayer.list,
                    o = r + "_recommendations",
                    i = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    s = ce("div", {
                        className: "narrative-meta-story"
                    }),
                    n = ce("div", {
                        className: "narrative-meta-story__buttons"
                    });
                n.appendChild(this.renderNarrativeButton("replay", function() {
                    cur.storyLayer._sendNavigationStatEvents("narrative_replay", !1), cur.storyLayer.changeStory(0)
                })), e && n.appendChild(this.renderNarrativeButton("go_to_stories", function() {
                    cur.storyLayer._sendNavigationStatEvents("narrative_go_to_stories", !1), cur.storyLayer.nextStory()
                })), s.appendChild(n);
                var a = Stories._getList(o);
                return r.match(/narrative-?\d+_\d+$/) && a && (this.coverItems = a.map(function(t) {
                    return t.narrative_cover
                }), this.coverCount = this.coverItems ? this.coverItems.length : 0, this.coverRowsCount = Math.ceil(this.coverCount / 3), this.elems.recBlock = ce("div", {
                    className: "narrative-meta-story__rec"
                }), this.elems.recInner = ce("div", {
                    className: "narrative-meta-story__rec-inner"
                }), this.elems.recItems = ce("div", {
                    className: "narrative-meta-story__rec-items"
                }), this.elems.recTitle = ce("div", {
                    className: "narrative-meta-story__rec-title",
                    innerHTML: getLang("stories_narrative_more")
                }), this.elemOffset = 0, 1 === this.coverRowsCount ? this.elemOffset = 26.4 : this.coverRowsCount > 1 && (this.elemOffset = 26.4 * 1.5), this.scrollOffset = i / 100 * this.elemOffset + 53, setStyle(n, {
                    paddingBottom: this.elemOffset + "vh"
                }), setStyle(this.elems.recTitle, {
                    marginTop: "calc(100vh - " + this.elemOffset + "vh - 53px - 70px)"
                }), this.coverItems.forEach(function(e) {
                    var r = ce("span", {
                            className: "narrative-preview",
                            onclick: function(t) {
                                var r = t.target;
                                Stories.show(cur.storyLayer.getBlockKey(e) + "/" + o, {
                                    fromEl: r,
                                    narrativeId: e.narrative.id,
                                    source: "narrative_recommendations"
                                })
                            }
                        }, {
                            backgroundImage: "url('" + e.preview_url + "')"
                        }),
                        i = ce("div", {
                            className: "narrative-preview__inner",
                            innerHTML: '\n            <a href="' + a[0].author.href + '" class="narrative-preview__author" style="background-image: url(\'' + a[0].author.photo + '\')"></a>\n            <span class="narrative-preview__title">' + e.narrative.title + "</span>\n          "
                        }, {
                            backgroundImage: "url('" + e.small_preview + "')"
                        });
                    r.appendChild(i), t.elems.recItems.appendChild(r)
                }), addEvent(this.elems.recBlock, "scroll wheel touchmove", this.handleRecommendationsScroll.bind(this)), this.elems.recInner.appendChild(this.elems.recTitle), this.elems.recInner.appendChild(this.elems.recItems), this.elems.recBlock.appendChild(this.elems.recInner), s.appendChild(this.elems.recBlock)), s
            }, t.prototype.renderNarrativeButton = function(t, e) {
                if (!t) return "";
                var r = "",
                    o = "";
                switch (e = isFunction(e) ? e : function() {}, t) {
                    case "replay":
                        r = "replay", o = getLang("stories_narrative_repeat_bottom");
                        break;
                    case "go_to_stories":
                        r = "back", o = getLang("stories_narrative_back_bottom")
                }
                var i = ce("div", {
                        className: "narrative-meta-button__circle narrative-meta-button__circle_" + r,
                        onclick: e
                    }),
                    s = ce("div", {
                        className: "narrative-meta-button__text",
                        innerHTML: o
                    }),
                    n = ce("div", {
                        className: "narrative-meta-button"
                    });
                return n.appendChild(i), n.appendChild(s), n
            }, t.prototype.handleRecommendationsScroll = function() {
                var t = Math.min(this.elems.recInner.scrollTop / (this.scrollOffset / 100), 70) / 100;
                setStyle(this.elems.recBlock, {
                    backgroundColor: "rgba(0, 0, 0, " + t + ")"
                }), this.elems.recInner.scrollTop ? (addClass(this.elems.recBlock, "scroll"), this.pause()) : (this.play(), removeClass(this.elems.recBlock, "scroll"))
            }, t.prototype.getContainer = function() {}, t.prototype.play = function() {
                this.paused = !1, this.isLoaded() && this.opts.onPlay()
            }, t.prototype.pause = function() {
                this.paused = !0, this.opts.onPause()
            }, t.prototype.setCurrentTime = function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
            }, t.prototype.destroy = function() {
                removeEvent(this.elems.recBlock), clearTimeout(this.longLoadingTimer)
            }, t.prototype.isPaused = function() {
                return this.paused
            }, t.prototype.isLoaded = function() {
                return this.loaded
            }, t.prototype.getCurrentTime = function() {
                return 0
            }, t.prototype.getDuration = function() {
                return 0
            }, t.prototype.getId = function() {
                return this.data.raw_id
            }, t.prototype.getTrackCode = function() {
                return this.data.track_code
            }, t.prototype.getDate = function() {
                return this.data.date
            }, t.prototype.getViews = function() {
                return this.data.views
            }, t.prototype.getReplies = function() {
                return this.data.answers ? this.data.answers : {
                    count: "",
                    count_str: "",
                    users: []
                }
            }, t.prototype.setViews = function(t) {
                this.data.views = t
            }, t.prototype.setReplies = function(t) {
                this.data.answers = t
            }, t.prototype._onCanPlay = function() {
                if (clearTimeout(this.longLoadingTimer), this.loaded = !0, this.opts.onLoadingEnd(), this.startTs = Date.now(), !this.isPaused()) {
                    var t = document.visibilityState;
                    if (t && "visible" !== t) return;
                    this.play()
                }
            }, t.prototype._loadingError = function() {
                this._error("load")
            }, t.prototype._error = function(t) {
                clearTimeout(this.longLoadingTimer), this.opts.onError(t)
            }, t.prototype._isFailed = function() {
                return this.failed
            }, t
        }();
        var U = function(t) {
            function e(r, o, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var s = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, r, o, i));
                return s.wrapEl = i, s.videoRaw = s.data.video.owner_id + "_" + s.data.video.video_id, s
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.render = function() {
                var e = this;
                t.prototype.render.call(this), this.el = ce("div", {
                    className: "stories_live"
                });
                var r = ce("div", {
                    className: "stories_live_player"
                }, {
                    height: "100%",
                    width: "100%"
                });
                return this.el.appendChild(r), this.chatEl = se('\n      <div class="stories_live_chat">\n        <div class="mv_chat_messages_wrap">\n          <div class="mv_chat_messages"></div>\n        </div>\n        <div class="mv_chat_stickers_wrap"></div>\n      </div>\n    '), this.el.appendChild(this.chatEl), window.mvcur && window.mvcur.player && Videoview.hide(!1, !0), setTimeout(function() {
                    showInlineVideo(e.videoRaw, "", {
                        autoplay: 1,
                        module: "story",
                        onLoaded: function() {
                            e._onPlayerInited()
                        }
                    }, !1, r)
                }), this.el
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this._resetTimer(), window.mvcur = {}, this.player && (this.player.destroy(), VideoChat.destroy()), cur.storyLayer._sendNavigationStatEvents("live_player_close", !1), delete this.el
            }, e.prototype.getContainer = function() {
                return this.el || this.render()
            }, e.prototype.onLiveEnded = function() {
                var t = this;
                this.liveEnded = !0, hide(geByClass1("_error_msg", geByClass1("videoplayer_error")));
                var e = this.mvData.oid < 0 ? getLang("stories_live_ended_desc_club") : langSex(this.mvData.author_sex, getLang("stories_live_ended_desc_user", "raw"));
                e = e.replace("{name}", this.mvData.md_author);
                var r = this.mvData.oid < 0 ? getLang("stories_live_ended_open_club") : getLang("stories_live_ended_open_user");
                hide(this.chatEl), hide(domByClass(this.player.ui.thumb, "videoplayer_big_play_btn"));
                var o = cur.storyLayer.storiesBlocks.length > 1;
                this.el.appendChild(se('\n    <div class="stories_live_end">\n      <div class="stories_live_end_author_photo" style="background-image: url(' + this.mvData.author_photo + ')"></div>\n      <div class="stories_live_end_title">' + getLang("stories_live_ended_title") + '</div>\n      <div class="stories_live_end_desc">' + e + '</div>\n      <a href="' + this.mvData.author_href + '" class="stories_live_end_open_owner">' + r + '</a>\n      <div class="stories_live_end_timer" onclick="cur.storyLayer.nextStory()" style="' + (o ? "" : "display: none;") + '">\n        <canvas class="_timer_canvas" width="100" height="100"></canvas>\n        <div class="stories_live_end_timer_text">' + getLang("stories_live_ended_watch_next") + "</div>\n      </div>\n    </div>\n    ")), o && setTimeout(function() {
                    t._startTimer()
                })
            }, e.prototype.pause = function() {}, e.prototype.play = function() {
                this.player && !this.liveEnded && (t.prototype.play.call(this), this.player && this.player.play())
            }, e.prototype.sendMessage = function(t, e) {
                t.length > mvcur.maxChatReplyLength || (ajax.post("al_video.php?act=post_comment", {
                    comment: t,
                    video: this.videoRaw,
                    hash: this.mvData.hash,
                    videoviewer_chat: 1
                }), cur.storyLayer.activeStory._onAnswerSended(e))
            }, e.prototype.volumeUpdate = function() {
                this.player.setVolume(m())
            }, e.prototype._onCanPlay = function() {
                t.prototype._onCanPlay.call(this), setStyle(this.el, "opacity", 1)
            }, e.prototype._onPlayerInited = function() {
                this._onCanPlay(), this.player = window.cur.videoInlinePlayer, this.play(), cur.storyLayer._sendNavigationStatEvents("live_player_show", !1), browser.safari && this.player.toggleMute(!0, !1), this.mvData = Videoview.getMvData(), window.mvcur = {
                    chatMode: !0,
                    maxChatReplyLength: this.mvData.maxChatReplyLength,
                    mvData: this.mvData,
                    mvShown: !0,
                    queueKey: this.mvData.queue_params.key,
                    qversion: this.mvData.qversion
                }, VideoChat.init(this.chatEl, {
                    scrollHidden: !0
                }), Videoview.queueCheckUpdates(this.mvData.queue_params)
            }, e.prototype._startTimer = function() {
                var t = this;
                if (window.CanvasRenderingContext2D) {
                    var e = domByClass(this.el, "_timer_canvas"),
                        r = e.getContext("2d");
                    r.lineWidth = 6, r.lineCap = "round", r.strokeStyle = "#fff";
                    var o = Date.now();
                    show(e), this.timerInProgress = !0,
                        function e() {
                            var i = (Date.now() - o) / 5e3;
                            i < 1 ? (r.clearRect(0, 0, 100, 100), r.beginPath(), r.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * i), r.stroke(), t._nextTO = setTimeout(e, 16)) : cur.storyLayer.nextStory()
                        }()
                }
            }, e.prototype._resetTimer = function() {
                window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this.el, "_timer_canvas")))
            }, e
        }(V);
        var z = function(t) {
            function e(r, o) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, r, o));
                return i.isFirstChunkLoaded = !1, i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.render = function() {
                var e = this;
                if (t.prototype.render.call(this), this.video) return this.video;
                var r = this.data.video_url;
                return this.video = ce("video", {
                    className: "stories_video",
                    autoplay: !1,
                    volume: getAudioPlayer().getVolume()
                }), addEvent(this.video, "error", function() {
                    e._loadingError()
                }), this._isFailed() ? this.video : (this.loaded && (this.video.currentTime = 0), addEvent(this.video, "canplay", this._onCanPlay.bind(this)), this.video.src = r, this.volumeUpdate(), this.video)
            }, e.prototype.getContainer = function() {
                return this.video || this.render()
            }, e.prototype.getImage = function() {
                var t = getSize(this.video),
                    e = ce("canvas", {
                        width: t[0],
                        height: t[1]
                    });
                return e.getContext("2d").drawImage(this.video, 0, 0, t[0], t[1]), e.toDataURL()
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), removeEvent(this.video), delete this.video
            }, e.prototype.play = function() {
                var e = this;
                if (t.prototype.play.call(this), this.loaded && this.video) {
                    var r = this.video.play();
                    void 0 !== r && r.catch(function(t) {
                        e.opts.onAutoPlayFail()
                    })
                }
            }, e.prototype.pause = function() {
                t.prototype.pause.call(this), this.video && this.video.pause()
            }, e.prototype.setCurrentTime = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.loaded && (this.video.currentTime = t)
            }, e.prototype.getCurrentTime = function() {
                return 1e3 * this.video.currentTime
            }, e.prototype.getDuration = function() {
                return 1e3 * this.video.duration
            }, e.prototype._onCanPlay = function(e) {
                t.prototype._onCanPlay.call(this, e), this.isFirstChunkLoaded || (this.isFirstChunkLoaded = !0, cur.storyLayer._sendNavigationStatEvents("view_story")), setStyle(this.video, "opacity", 1)
            }, e.prototype.volumeUpdate = function() {
                this.video.volume = m()
            }, e
        }(V);
        var q = function(t) {
                function e(r, o) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var i = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, r, o));
                    return i.pauseTime = 0, i
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.render = function() {
                    var e = this;
                    if (t.prototype.render.call(this), this.photo) return this.photo;
                    var r = this.data,
                        o = r.photo_url,
                        i = r.narrative;
                    return this.photo = ce("div", {
                        className: "stories_photo"
                    }), this._isFailed() ? this.photo : (_(o).then(function(t) {
                        e.photo && (i && i.is_cover ? addClass(e.photo, "stories_narrative_cover_blur") : setStyle(e.photo, "backgroundImage", "url(" + t + ")"), e._onCanPlay())
                    }).catch(function() {
                        e._loadingError()
                    }), this.photo)
                }, e.prototype.getContainer = function() {
                    return this.isNarrativeMetaStory || this.photo || this.render()
                }, e.prototype.destroy = function() {
                    t.prototype.destroy.call(this), delete this.photo
                }, e.prototype.play = function() {
                    (0 === this.startTs || this.pauseTime > 0) && (this.startTs = Date.now() - this.pauseTime, this.pauseTime = 0), t.prototype.play.call(this)
                }, e.prototype.pause = function() {
                    this.isPaused() || (t.prototype.pause.call(this), this.pauseTime = this.getCurrentTime())
                }, e.prototype.setCurrentTime = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    this.startTs = Date.now() + t, this.isPaused() && (this.pauseTime = t)
                }, e.prototype.getCurrentTime = function() {
                    return Date.now() - this.startTs || 0
                }, e.prototype.getDuration = function() {
                    return 5e3
                }, e.prototype._onCanPlay = function() {
                    t.prototype._onCanPlay.call(this), cur.storyLayer._sendNavigationStatEvents("view_story"), setStyle(this.photo, "opacity", 1)
                }, e
            }(V),
            Y = "stories_manage",
            X = 1,
            G = 2,
            Q = r("zxIV"),
            J = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var $ = window,
            Z = $.radioBtns,
            tt = $.getLang,
            et = $.lockButton,
            rt = $.unlockButton,
            ot = $.removeEvent,
            it = $.addEvent,
            st = $.addClass,
            nt = $.removeClass,
            at = $.toggleClass,
            lt = $.geByClass1,
            ct = $.geByClass,
            dt = $.ge,
            ht = $.se,
            ut = $.domQuery,
            pt = $.curBox,
            _t = $.showBox,
            yt = $.extend,
            vt = $.setStyle,
            ft = function() {
                function t(e, r) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.data = e, this.opts = r, this.id = r.id, this.isActive = !1, this.story = !1, this.index = 0, this.preloadedStories = {}, this.layer = r.layer, this._onResizeHandle = this._onResizeHandle.bind(this), this.longTapTimer
                }
                return t.prototype.destroy = function() {
                    this._destroyStory(), ot(this.contWrap, "click", this._onClickHandle.bind(this)), ot(lt("stories_item_cont", this.contWrap)), ot(lt("stories_reply_to", this.replyToWrap)), ot(this.shareButton), delete this.shareButton, ot(this.followBtn), delete this.followBtn, ot(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                    for (var t = ct("stories_time_line", this.timeLineEl), e = 0; e < t.length; e++) ot(t[e]);
                    ot(this.viewsButton), ot(lt("stories_feedback_close", this.wrapEl)), ot(lt("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.descEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                    for (var r = !1, o = 0; o < this.data.items.length; o++)
                        if (this.data.items[o].unread) {
                            r = !0;
                            break
                        }
                    var i = T();
                    if (!r && i && i.activeStory) {
                        var s = ut("#feed_story_" + this.layer.getBlockKey(this.data), i.activeStory.wrapEl)[0];
                        nt(s, "story_feed_new_item"), nt(s, "story_feed_new_item_promo")
                    }
                }, t.prototype._destroyTimeLine = function() {
                    for (var t = ct("stories_time_line", this.timeLineEl), e = 0; e < t.length; e++) ot(t[e])
                }, t.prototype.getOwnerId = function() {
                    return this.data.author.id
                }, t.prototype.getIndex = function() {
                    return this.index
                }, t.prototype.isLastStory = function() {
                    return this.index >= this.data.items.length - 1
                }, t.prototype.getRawId = function() {
                    return !!this.story && this.story.getId()
                }, t.prototype.getTrackCode = function() {
                    return !!this.story && this.story.getTrackCode()
                }, t.prototype.getReadHash = function() {
                    return this.data.read_hash
                }, t.prototype.getType = function() {
                    return this.data.type
                }, t.prototype.getItems = function() {
                    return this.data.items
                }, t.prototype.getItemsLength = function() {
                    return this.getItems().length
                }, t.prototype.render = function() {
                    this.wrapEl = ce("div", {
                        className: "stories_item"
                    }), this.contWrap = ce("div", {
                        className: "stories_item_cont_wrap"
                    }), this.contStickers = ce("div", {
                        className: "stories_item_cont_sticker"
                    }), this.contWrap.appendChild(this.contStickers), this.wrapEl.appendChild(this.contWrap), it(this.contWrap, "click", this._onClickHandle.bind(this));
                    var t = ce("div", {
                        className: "stories_item_cont"
                    });
                    return it(t, "mousedown", this._onMouseDownHandle.bind(this)), it(t, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(t), t.appendChild(this._renderAuthor()), this.contWrap.appendChild(ce("div", {
                        className: "stories_bottom_wrap"
                    })), this.contWrap.appendChild(this._renderPreview()), this.indexToUnread(), cur.noStoriesBack || (this.backButton = ce("div", {
                        className: "stories_item_back"
                    }), t.appendChild(this.backButton)), this.replyToWrap = t.appendChild(ce("div", {
                        className: "stories_reply_to_wrap"
                    })), this.inlineLoader = t.appendChild(ce("div", {
                        className: "stories_inline_loader",
                        innerHTML: getProgressHtml()
                    })), t.appendChild(ce("div", {
                        className: "stories_play_button video_thumb_play"
                    })), this.isActiveLive() ? st(this.wrapEl, "live") : this._initTimeLine(), at(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
                }, t.prototype.updateBottom = function(t) {
                    var e = lt("stories_bottom_wrap", this.wrapEl);
                    !this.isActive || t || this.story.isNarrativeMetaStory ? (i.unmountComponentAtNode(e), val(e, "")) : i.render(o.createElement(K, {
                        story: this
                    }), e)
                }, t.prototype._canForceDeleteStories = function() {
                    return this.data.moder_remove_hash && !this.data.items[0].is_deleted
                }, t.prototype._initTimeLine = function() {
                    this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl)), lt("stories_item_cont", this.contWrap).appendChild(this._renderTimeLine())
                }, t.prototype._isActionsShown = function() {
                    var t = domClosest("_ui_menu_wrap", this.wrapEl);
                    return hasClass(t, "shown")
                }, t.prototype._renderPreview = function() {
                    return ht('<div class="stories_preview"></div>')
                }, t.prototype._renderMessage = function(t) {
                    return ht('<div class="stories_message">\n  <div class="stories_message_text">' + t + "</div>\n</div>")
                }, t.prototype._showMessage = function(t) {
                    var e = this;
                    re(lt("stories_message", this.contWrap));
                    var r = this._renderMessage(t);
                    return this.contWrap.appendChild(r), clearTimeout(this.showMessageTimer), new Promise(function(t) {
                        e.showMessageTimer = setTimeout(function() {
                            e.contWrap.removeChild(r), t()
                        }, 3e3)
                    })
                }, t.prototype._setPreview = function(t, e) {
                    var r = this,
                        o = this.index,
                        i = this.data.items[o].preview_url;
                    i !== this.curPreviewUrl && i && (e = e || function() {}, t = t || lt("stories_preview", this.contWrap), _(i).then(function(s) {
                        o === r.index && i !== r.curPreviewUrl && (r.curPreviewUrl = i, vt(t, "backgroundImage", "url(" + s + ")")), vt(t, "opacity", 1), setTimeout(e, 0)
                    }))
                }, t.prototype.getPreview = function() {
                    return this.data.items[this.index].preview_url
                }, t.prototype._renderAuthor = function() {
                    var t = this,
                        e = this.data.author,
                        r = e.photo,
                        o = e.href,
                        i = e.name,
                        s = e.verify,
                        n = this.data && this.data.items[0] && this.data.items[0].narrative,
                        a = void 0;
                    this.data.is_narrative && n && !n.is_cover ? a = '\n      <div>\n          <div class="stories_narrative_title">' + n.title + '</div>\n          <span class="stories_narrative_author"><a href="' + o + '" class="stories_narrative_author_link">' + i + "</a> · " + tt("global_type_narrative") + "</span>\n      </div>" : a = '\n      <div class="stories_author_cont">\n        ' + ('<a href="' + o + '" class="stories_author_photo_wrap"><img src="' + r + '" class="stories_author_photo" /></a>') + '\n        <a href="' + o + '" class="stories_author_name"><span>' + i + "</span></a>\n        " + (s || "") + '\n        <div class="stories_desc"></div>\n      </div>';
                    var l = ht('\n      <div class="stories_author">\n        <div class="stories_author_cont_wrap">\n          <div class="stories_author_inner">' + a + '</div>\n          <div class="stories_author_buttons"></div>\n         </div>\n      </div>\n    ');
                    return it(l, "click", function(e) {
                        Object(Q.o)("a", e.target) && t.layer._sendNavigationStatEvents("go_to_author")
                    }), !0 === this.data.hide_owner && val(lt("stories_author_cont", l), ""), at(this.wrapEl, "hide_owner", !0 === this.data.hide_owner), this.descEl = lt("stories_desc", l), this.authorButtons = lt("stories_author_buttons", l), l
                }, t.prototype._renderFollowButton = function() {
                    var t = this;
                    return this.followBtn = ce("div", {
                        className: "stories_author_button stories_follow"
                    }), it(this.followBtn, "click", this._onFollowBtnClick.bind(this)), it(this.followBtn, "mouseover", function() {
                        var e = hasClass(t.followBtn, "followed") ? tt("stories_unfollow") : tt("stories_follow");
                        showTooltip(t.followBtn, {
                            black: 1,
                            center: 1,
                            shift: [0, 5, 0],
                            text: e,
                            appendEl: t.contWrap
                        })
                    }), this.followBtn
                }, t.prototype._renderTimeLine = function() {
                    var t = this;
                    return this.timeLineEl = ce("div", {
                        className: "stories_time_line"
                    }), this.data.items.map(function(e, r) {
                        var o = ce("div", {
                            className: "stories_time_line_item"
                        });
                        it(o, "click", function() {
                            t.layer._sendNavigationStatEvents("go_to_story_click"), t.changeStory(r)
                        });
                        var i = ce("div", {
                            className: "stories_time_line_item_cont"
                        });
                        i.appendChild(ce("div", {
                            className: "stories_time_line_item_cont_active"
                        })), o.appendChild(i), t.timeLineEl.appendChild(o)
                    }), this.timeLineEl
                }, t.prototype.isPaused = function() {
                    return !this.story || this.story.isPaused()
                }, t.prototype.isLoaded = function() {
                    return !this.story || this.story.isLoaded()
                }, t.prototype._onMouseDownHandle = function(t) {
                    this.isActive && (this.isLocked() || !hasClass(t.target, "stories_item_cont") && !hasClass(t.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.longTapTimer = setTimeout(this._longTapHandle.bind(this), 200)))
                }, t.prototype._onMouseUpHandle = function(t) {
                    clearTimeout(this.longTapTimer);
                    var e = this.downTs;
                    delete this.downTs;
                    var r = !(vkNow() - e < 200 && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                    if (this.isActive && hasClass(t.target, "stories_item_back") && !r && !this.tooltip) return this.prevStory();
                    if (hasClass(t.target, "stories_item_cont") || hasClass(t.target, "stories_item_back"))
                        if (this._feedbackTTShown && this.hideFeedbackTooltip(), nt(this.wrapEl, "paused"), this.tooltip) this._hideTooltip();
                        else {
                            if (!this.isActive) {
                                this.id >= this.layer.activeStory.id && this.layer._markStoryAsSkipped();
                                var o = this.layer.storiesBlocks;
                                return o.indexOf(this.layer.getBlockKey(this)) > o.indexOf(this.layer.blockKey) ? this.layer._sendNavigationStatEvents("go_to_next_author") : this.layer._sendNavigationStatEvents("go_to_previous_author"), void this.opts.onSelect(this)
                            }
                            r ? this.isPaused() && this.playStory(!1, !!e) : this._onPlayEnd()
                        }
                }, t.prototype._longTapHandle = function() {
                    this.story && this.story.pause(), st(this.wrapEl, "paused"), this.tooltip || this.layer._sendNavigationStatEvents("pause_long_tap")
                }, t.prototype.isLocked = function() {
                    return !!(pt() || this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply"))
                }, t.prototype.autoResumeStory = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.audioPlaying || this.story && this.story.isNarrativeMetaStory || this.tooltip || this.playStory(!1, t)
                }, t.prototype.playStory = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = arguments[1];
                    this.isLocked() || (nt(this.wrapEl, "paused"), this.story && !t || this._initStory(), this.story.play(), e && this.layer._sendNavigationStatEvents("resume_release"), delete this.downTs)
                }, t.prototype.pauseStory = function(t) {
                    this.story && (this.isPaused() || (t && st(this.wrapEl, "paused"), this.story.pause()))
                }, t.prototype.changeStory = function(t) {
                    if (this.index !== t && !this.formLocked) {
                        this._destroyStory(), this.index = t, this._hideTooltip();
                        var e = this.getCurStoryData();
                        e.narrative && e.narrative.is_cover ? this._setPreview(!1, this.playStory.bind(this)) : (this._setPreview(), this.playStory())
                    }
                }, t.prototype.getWrap = function() {
                    return this.wrapEl
                }, t.prototype.stop = function() {
                    this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(lt("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), nt(this.wrapEl, "autoplay_failed")
                }, t.prototype.getCurStoryData = function() {
                    var t = this.data.items[this.index];
                    return t || {}
                }, t.prototype.isActiveLive = function() {
                    return "live" === this.getCurStoryData().type
                }, t.prototype.isLiveEnded = function() {
                    return this.isActiveLive() && this.story.liveEnded
                }, t.prototype._initStory = function() {
                    var t = this,
                        e = this.getCurStoryData(),
                        r = e.type;
                    this.story && this._destroyStory();
                    var o = {
                        onLoadingStart: this._onLoadingStart.bind(this),
                        onLoadingEnd: this._onLoadingEnd.bind(this),
                        onPlay: this._onPlay.bind(this),
                        onPause: this._onPause.bind(this),
                        onError: this._showError.bind(this),
                        onLongLoading: this._showLoader.bind(this),
                        onAutoPlayFail: this._onAutoPlayFail.bind(this)
                    };
                    ("live" === r ? this.story = new U(e, o, this.wrapEl) : ("video" === r ? (this.story = new z(e, o), st(this.wrapEl, "video")) : (this.story = new q(e, o), this.opts.onVideoEnd(), nt(this.wrapEl, "video")), val(this.descEl, e.is_ads ? tt("stories_is_ad") : this.story.getDate()), this.fillTimeLine()), "live" === r || "video" === r) && (m() > 0 && this.opts.onVideoPlay());
                    this.opts.onStartStory(), at(this.wrapEl, "stories_can_comment", !0 === e.can_comment), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), !this.data.author.can_follow || this.data.is_promo || this.isActiveLive() || this.authorButtons.appendChild(this._renderFollowButton()), this.story.isNarrativeMetaStory = e.isNarrativeMetaStory, this._destroyFeedBackTT(), this.story.isNarrativeMetaStory || (this.updateBottom(), this.contWrap.appendChild(this.story.render())), e.clickable_stickers && this.renderStickersLayer(), this.story.data && this.story.data.narrative && this.story.data.narrative.is_cover && (this.contWrap.appendChild(this.story.renderNarrativeCover()), it(lt("stories_narrative_cover", this.contWrap), "click", function(e) {
                        t._showTooltip(e, t._createNarrativeTooltipLink())
                    })), this.story.isNarrativeMetaStory && !this.story.failed && (re(lt("stories_photo", this.contWrap)), re(lt("stories_video", this.contWrap)), st(this.contWrap, "stories_item_cont_wrap_meta_story"), this.contWrap.appendChild(this.story.renderNarrativeMetaStory()), this.story._onCanPlay())
                }, t.prototype._getStickerStyle = function(t, e) {
                    var r = this.getCurStoryData().clickable_stickers,
                        o = r.original_width,
                        i = r.original_height,
                        s = t.top,
                        n = t.left,
                        a = t.width,
                        l = t.height,
                        c = t.rotate,
                        d = getSize(e),
                        h = J(d, 2),
                        u = h[0],
                        p = h[1],
                        _ = u,
                        y = p;
                    return p / u > 1.77 ? _ = o * p / i : y = i * u / o, {
                        top: s * y - (y - p) / 2 + "px",
                        left: n * _ - (_ - u) / 2 + "px",
                        width: a * _ + "px",
                        height: l * y + "px",
                        transform: "rotate(" + c + "deg)"
                    }
                }, t.prototype.renderStickersLayer = function() {
                    var t = this,
                        e = this.getCurStoryData().clickable_stickers,
                        r = (isObject(e) ? e : {}).stickers;
                    this.stickers = [], isArray(r) && r.forEach(function(e) {
                        var r = e.type,
                            o = e.hashtag,
                            i = e.mention,
                            s = e.style;
                        if (inArray(r, [X, G])) {
                            var n = ce("div", {
                                className: "stories_sticker"
                            }, t._getStickerStyle(e, t.contWrap));
                            switch (domData(n, "type", r), domData(n, "style", s), r) {
                                case X:
                                    domData(n, "hashtag", o);
                                    break;
                                case G:
                                    domData(n, "mention", i)
                            }
                            t.contStickers.appendChild(n), t.stickers.push(n)
                        }
                    }), it(window, "resize", this._onResizeHandle)
                }, t.prototype._onResizeHandle = function() {
                    var t = this,
                        e = this.getCurStoryData().clickable_stickers,
                        r = (isObject(e) ? e : {}).stickers;
                    isArray(r) && r.forEach(function(e, r) {
                        inArray(e.type, [X, G]) && t.stickers && t.stickers[r] && vt(t.stickers[r], t._getStickerStyle(e, t.contWrap))
                    }), this._hideTooltip()
                }, t.prototype._onClickHandle = function(t) {
                    hasClass(t.target, "stories_sticker") && (this.hideFeedbackTooltip(), this.tooltip ? this._hideTooltip() : (this.layer._sendNavigationStatEvents("click_on_clickable_sticker"), this._showTooltip(t, this._createStickerLink(t.target))))
                }, t.prototype._createStickerLink = function(t) {
                    var e = this,
                        r = intval(domData(t, "type"));
                    if (r) {
                        var o = void 0,
                            i = void 0,
                            s = void 0,
                            n = {
                                type: r,
                                style: domData(t, "style")
                            };
                        switch (r) {
                            case X:
                                var a = domData(t, "hashtag") || "";
                                o = "/feed?q=" + a.replace("#", "%23") + "&section=search", i = tt("stories_show_hashtag_link"), s = "search", n.text = a;
                                break;
                            case G:
                                var l = (domData(t, "mention") || "").slice(1, -1).split("|");
                                o = "/" + l[0], i = l[0].startsWith("id") ? tt("stories_go_to_profile") : tt("stories_go_to_group"), s = "profile"
                        }
                        return this._sendStatStickerEvent("click", n), ce("a", {
                            href: o,
                            innerHTML: i,
                            className: "stories_tooltip_link",
                            target: "_blank",
                            onclick: function() {
                                e._sendStatStickerEvent(s, n)
                            }
                        })
                    }
                }, t.prototype._createNarrativeTooltipLink = function() {
                    var t = this;
                    return ce("div", {
                        className: "stories_tooltip_link",
                        innerHTML: tt("stories_narrative_show"),
                        onclick: function() {
                            t._hideTooltip(!0), showNarrative(t.story.data.narrative.owner_id + "_" + t.story.data.narrative.id, {
                                isOpenNarrativeFromFeed: !0,
                                source: "narrative_story"
                            })
                        }
                    })
                }, t.prototype._showTooltip = function(t, e) {
                    if (this.tooltip) this._hideTooltip();
                    else {
                        this.tooltip = ce("div", {
                            className: "stories_tooltip"
                        }, {
                            top: 0,
                            left: 0
                        }), this.tooltip.appendChild(e), this.layer.layerEl.appendChild(this.tooltip);
                        var r = getSize(this.tooltip),
                            o = J(r, 2),
                            i = o[0],
                            s = o[1],
                            n = t.clientX,
                            a = void 0 === n ? 0 : n,
                            l = t.clientY,
                            c = void 0 === l ? 0 : l;
                        vt(this.tooltip, {
                            top: c - s - 10,
                            left: a - i / 2
                        }), this.pauseStory()
                    }
                }, t.prototype._hideTooltip = function(t) {
                    this.tooltip && (t || this.playStory(), this.layer.layerEl.removeChild(this.tooltip), delete this.tooltip)
                }, t.prototype.getReplies = function() {
                    return this.story.getReplies()
                }, t.prototype.getViews = function() {
                    return this.story.getViews()
                }, t.prototype.indexToUnread = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = this.data.items,
                        r = 0;
                    for (var o in e)
                        if (e[o].unread && !this.layer._hasContext("all")) {
                            r = intval(o);
                            break
                        }
                    if (t) return r;
                    this.index = r, this._setPreview()
                }, t.prototype.indexToStoryById = function(t) {
                    var e = this.data.items,
                        r = -1;
                    for (var o in e)
                        if (e[o].raw_id === t) {
                            r = intval(o);
                            break
                        }
                    this.layer._hasContext("all") && (r = 0), r > -1 ? (this.index = r, this._setPreview()) : this.indexToUnread()
                }, t.prototype.fillTimeLine = function() {
                    for (var t = this.timeLineEl, e = 0; e < t.children.length; e++) {
                        var r = lt("stories_time_line_item_cont_active", t.children[e]);
                        e === this.index && (this.currentTimeLineEl = r);
                        var o = e < this.index ? 100 : 0;
                        vt(r, "transform", "translateX(" + o + "%)")
                    }
                }, t.prototype._destroyStory = function() {
                    if (this.story) {
                        this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._hideTooltip(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), nt(this.contWrap, "stories_item_cont_wrap_meta_story"), re(lt("narrative-meta-story", this.contWrap)), nt(this.contWrap, "stories_narrative_cover_blur"), re(lt("stories_narrative_cover", this.contWrap)), ot(lt("stories_narrative_cover", this.contWrap)), ot(window, "resize", this._onResizeHandle), this.contStickers.innerHTML = "", cancelAnimationFrame(this.timeLineAnim);
                        try {
                            this.contWrap.removeChild(this.story.getContainer()), this.story.destroy()
                        } catch (t) {}
                        this._replyHideEnd(), ot(this.followBtn), val(this.authorButtons, ""), ot(this.answersEl), ot(lt("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                    }
                }, t.prototype._timeLineUpdate = function() {
                    var t = this.story;
                    if (t && !t.isPaused() && !this.isActiveLive()) {
                        var e = t.getCurrentTime(),
                            r = t.getDuration(),
                            o = Math.max(0, Math.min(100, e / r * 100));
                        vt(this.currentTimeLineEl, "transform", "translateX(" + o + "%) translateZ(0)"), o < 100 ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd(!0)
                    }
                }, t.prototype._onLoadingStart = function() {
                    this._loadingStartTime = new Date
                }, t.prototype._onLoadingEnd = function() {
                    this._loadingStartTime && (this.loadingTime = Date.now() - this._loadingStartTime, this.layer._sendViewerStartTime(this.getRawId(), this.loadingTime), this._loadingStartTime = 0)
                }, t.prototype._onPlay = function() {
                    this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), nt(this.wrapEl, "animate_story"), nt(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
                }, t.prototype._onPause = function() {
                    cancelAnimationFrame(this.timeLineAnim)
                }, t.prototype._onPlayEnd = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.nextStory(t)
                }, t.prototype.nextStory = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (!this.isLocked()) {
                        var e = this.data.items;
                        t || this.layer._sendNavigationStatEvents("go_to_next_story_tap");
                        var r = this.index + 1;
                        r < e.length ? (t && this.layer._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this.changeStory(r)) : (this.opts.onStoriesEnd(t), this._destroyStory())
                    }
                }, t.prototype.prevStory = function() {
                    if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                        this.layer._sendNavigationStatEvents("go_to_previous_story");
                        var t = this.index - 1;
                        t >= 0 ? this.changeStory(t) : (this._destroyStory(), this.opts.playPrevOwner())
                    }
                }, t.prototype.getOffsetLeft = function() {
                    return this.wrapEl.offsetLeft + this.wrapEl.offsetWidth / 2
                }, t.prototype.getWidth = function() {
                    return this.wrapEl.offsetWidth
                }, t.prototype.removeStoryBox = function() {
                    var t = this;
                    this.pauseStory(), showFastBox({
                        title: tt("global_warning"),
                        onHide: function() {
                            t.playStory()
                        }
                    }, tt("stories_remove_warning"), tt("stories_remove_confirm"), this.removeStory.bind(this), tt("global_cancel"))
                }, t.prototype.removeStory = function(t) {
                    var e = this;
                    this.pauseStory();
                    var r = this.getIndex(),
                        o = this.getRawId();
                    ajax.post("al_stories.php", {
                        act: "remove_story",
                        story_raw: o,
                        hash: this.data.remove_hash,
                        moder_remove_hash: this.data.moder_remove_hash
                    }, {
                        onDone: function(t) {
                            window.cur.module === Y && window.GeStories.storyDidRemove(o, t), pt().hide(), e._popStoryAndClearList(r)
                        },
                        showProgress: et.pbind(t),
                        hideProgress: rt.pbind(t)
                    })
                }, t.prototype.removeNarrativeBox = function() {
                    var t = this;
                    this.pauseStory(), showFastBox({
                        title: tt("global_warning"),
                        onHide: function() {
                            t.playStory()
                        }
                    }, tt("stories_narrative_remove_warning"), tt("stories_remove_confirm"), this.removeNarrative.bind(this), tt("global_cancel"))
                }, t.prototype.removeNarrative = function(t) {
                    var e = this;
                    this.pauseStory();
                    var r = this.getCurStoryData().narrative,
                        o = r.raw_id;
                    ajax.post("al_stories.php", {
                        act: "remove_narrative",
                        narrative_raw: o,
                        hash: this.data.remove_hash,
                        moder_remove_hash: this.data.moder_remove_hash
                    }, {
                        onDone: function() {
                            pt().hide(), e._popCoverAndCleanNarrativeList(r)
                        },
                        showProgress: et.pbind(t),
                        hideProgress: rt.pbind(t)
                    })
                }, t.prototype._popCoverAndCleanNarrativeList = function(t) {
                    if (t.is_cover) this._popStoryAndClearList(this.getIndex());
                    else {
                        this.opts.removeList(), this._remove(!1, function() {
                            cur.storyLayer.activeStory._popStoryAndClearList(cur.storyLayer.activeStory.getIndex())
                        }.bind(this))
                    }
                }, t.prototype._sendNarrativeBookmarkButtonDidPress = function() {
                    var t = this,
                        e = this.getCurStoryData().narrative;
                    this.updateBottom = this.updateBottom.bind(this), ajax.post("al_bookmarks.php", {
                        act: "bookmark",
                        owner_id: e.owner_id,
                        object_id: e.id,
                        type: "narrative",
                        state: e.is_bookmarked ? 1 : 0,
                        hash: e.bookmark_hash
                    }, {
                        onDone: function(r) {
                            showDoneBox(r || tt("stories_narrative_bookmark_deleted"), {
                                className: "stories_done_msg"
                            }), e.is_bookmarked = !e.is_bookmarked, t.updateBottom()
                        }
                    })
                }, t.prototype._sendNarrativeEditButtonDidPress = function() {
                    var t = this.getCurStoryData().narrative;
                    window.open("https://" + location.hostname + this.data.author.href + "?act=narrative_edit&nid=" + t.id)
                }, t.prototype._popStoryAndClearList = function(t) {
                    this._removeStoryFromMemoryByIndex(t), 0 === this.data.items.length && C(this.getOwnerId())
                }, t.prototype._removeStoryFromMemoryByIndex = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.data.items.splice(t, 1), this.opts.removeList();
                    var r = this.data.items.length;
                    r ? (this._initTimeLine(), r > t ? this.isActive && this.playStory(!0) : this.isActive && this.nextStory()) : this._remove(e)
                }, t.prototype._remove = function(t, e) {
                    this.opts.onStoryRemoved(t, e)
                }, t.prototype.shareBox = function() {
                    var t = this,
                        e = this.getCurStoryData().narrative,
                        r = void 0;
                    r = e ? "narrative" + e.raw_id : "story" + this.story.getId(), this.pauseStory(), _t("like.php", {
                        act: "publish_box",
                        object: r,
                        from: "wkview"
                    }, {
                        onDone: function() {
                            t.autoResumeStory()
                        },
                        params: {
                            onHide: function() {
                                t.autoResumeStory()
                            }
                        }
                    })
                }, t.prototype._onAnswerSend = function(t, e) {
                    var r = this,
                        o = this._getSendText();
                    if (!o || !this.story) return cancelEvent(t);
                    if (this.isActiveLive()) this.story.sendMessage(o, e);
                    else {
                        var i = this.story.data.narrative,
                            s = void 0;
                        s = i ? "narrative:" + i.raw_id : "story:" + this.story.getId(), ajax.post("al_im.php", {
                            act: "a_send",
                            msg: o,
                            hash: this.data.send_hash,
                            media: s,
                            entrypoint: "stories_comment",
                            to: this.getOwnerId()
                        }, {
                            onDone: function() {
                                r._onAnswerSended(e)
                            },
                            showProgress: function() {
                                val(r.sendFormButton, r._getLoaderHtml()), st(r.sendFormButton, "sending")
                            },
                            hideProgress: function() {
                                val(r.sendFormButton, ""), nt(r.sendFormButton, "sending")
                            }
                        })
                    }
                }, t.prototype._onAnswerSended = function(t) {
                    var e = this;
                    this.isActiveLive() || (this.layer._sendNavigationStatEvents("comment_send"), this._showMessage(tt("stories_answer_sent")).then(function() {
                        e._unlockSendForm(), e.playStory()
                    })), val(lt("stories_send_form_text", this.wrapEl), ""), this._blurSendForm(), this.updateFeedbackTTPos(), this.pauseStory(), t && t()
                }, t.prototype._onSendFormFocus = function() {
                    var t = this;
                    this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", function() {
                        Emoji.shown || (t._resetFendForm(), t._blurSendForm()), t.updateFeedbackTTPos()
                    })
                }, t.prototype._blurSendForm = function() {
                    var t = lt("stories_send_form_text", this.wrapEl);
                    t && t.blur()
                }, t.prototype._getSendText = function() {
                    var t = Emoji.editableVal(lt("stories_send_form_text", this.wrapEl));
                    return trim(t)
                }, t.prototype._onSendFormBlur = function() {
                    this._getSendText() || this._resetFendForm()
                }, t.prototype._onSendFormKeyUp = function() {
                    this.updateFeedbackTTPos()
                }, t.prototype._unlockSendForm = function() {
                    this.formLocked && (this.formLocked = !1)
                }, t.prototype._resetFendForm = function() {
                    this._unlockSendForm(), this.playStory(), val(lt("stories_send_form_text", this.wrapEl), "")
                }, t.prototype._emojiOnKeyAction = function() {
                    this._getSendText() ? st(this.sendFormButton, "active") : nt(this.sendFormButton, "active")
                }, t.prototype._getLoaderHtml = function() {
                    return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
                }, t.prototype.preloadNextStory = function(t) {
                    if (t = isUndefined(t) ? this.index + 1 : t, !this.preloadedStories[t]) {
                        var e = this.data.items[t];
                        if (e) {
                            this.preloadedStories[t] = !0;
                            var r = e[e.type + "_url"];
                            r && ("video" === e.type ? v(r) : _(r))
                        }
                    }
                }, t.prototype._addToBlacklist = function() {
                    cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                        title: tt("stories_add_blacklist_title"),
                        onHide: function() {
                            cur.storyLayer && cur.storyLayer.playStory()
                        }
                    }, this.getOwnerId() < 0 ? tt("stories_add_blacklist_message_group") : tt("stories_add_blacklist_message"), tt("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), tt("global_cancel"))
                }, t.prototype._doAddToBlacklist = function(t) {
                    var e = this;
                    ajax.post("al_stories.php", {
                        act: "blacklist_add",
                        owner_id: this.getOwnerId(),
                        hash: this.data.blacklist_hash,
                        source_story: this.getRawId()
                    }, {
                        onDone: function() {
                            e.data.can_blacklist = !1, e.layer._sendNavigationStatEvents("hide_from_stories"), pt().hide(), e.opts.removeList(), e._remove()
                        },
                        showProgress: et.pbind(t),
                        hideProgress: rt.pbind(t)
                    })
                }, t.prototype._resetErrors = function() {
                    var t = lt("stories_error_wrap", this.contWrap);
                    t && (ot(lt("stories_error_button", t)), re(t)), nt(this.wrapEl, "failed"), nt(this.wrapEl, "fatal_error")
                }, t.prototype._showError = function(t) {
                    var e = this;
                    if (this.contWrap) {
                        var r = t,
                            o = void 0,
                            i = void 0;
                        switch (t) {
                            case "load":
                                o = tt("stories_error_cant_load"), i = ce("div", {
                                    className: "stories_error_button",
                                    innerHTML: tt("stories_try_again")
                                }), it(i, "click", function() {
                                    e._destroyStory(), e.playStory()
                                });
                                break;
                            case "expired":
                                o = tt("stories_error_expired");
                                break;
                            case "deleted":
                                o = tt("stories_error_deleted");
                                break;
                            case "private":
                                o = tt("stories_error_private");
                                break;
                            case "deleted-narrative":
                                o = tt("stories_error_deleted_narrative");
                                break;
                            case "private-narrative":
                                o = tt("stories_error_private_narrative");
                                break;
                            default:
                                o = tt("global_unknown_error")
                        }
                        this._resetErrors(), this._stopLoader();
                        var s = ce("div", {
                                className: "stories_error_wrap"
                            }),
                            n = ce("div", {
                                className: "stories_error"
                            }),
                            a = ce("div", {
                                className: "stories_error_cont"
                            });
                        n.appendChild(a), a.appendChild(ce("div", {
                            className: "stories_error_icon " + r
                        })), a.appendChild(ce("div", {
                            className: "stories_error_caption",
                            innerHTML: o
                        })), i && a.appendChild(i), s.appendChild(n), this.contWrap.appendChild(s), st(this.wrapEl, "failed"), inArray(t, ["expired", "deleted", "private", "deleted-narrative", "private-narrative"]) && st(this.wrapEl, "fatal_error")
                    }
                }, t.prototype._stopLoader = function() {
                    var t = this;
                    setTimeout(function() {
                        re(lt("stories_loader", t.contWrap))
                    }, 0)
                }, t.prototype._showLoader = function() {
                    if (this._stopLoader(), this.isActive && (!this.isLoaded() || this.isPaused()) && this.contWrap) {
                        var t = ce("div", {
                            className: "stories_loader",
                            innerHTML: this._getLoaderHtml()
                        });
                        this.contWrap.appendChild(t)
                    }
                }, t.prototype._onFollowBtnClick = function() {
                    var t = this;
                    if (this.pauseStory(), !this.followBtnLock) {
                        this.followBtnLock = !0;
                        var e = void 0,
                            r = void 0;
                        this.data.author.id > 0 ? (r = "al_friends", e = this.data.author.can_follow ? "add" : "remove") : (r = "al_groups", e = this.data.author.can_follow ? "a_enter" : "a_leave"), ajax.post(r + ".php", {
                            act: e,
                            mid: this.getOwnerId(),
                            gid: -this.getOwnerId(),
                            hash: this.data.author.hash,
                            from: "stories"
                        }, {
                            onDone: function() {
                                t.data.author.can_follow && t._sendStatEvent("follow"), t.data.author.can_follow = !t.data.author.can_follow, at(t.followBtn, "followed", !t.data.author.can_follow), t._showMessage(tt(t.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(function() {
                                    return t.playStory()
                                }), window.tooltips && tooltips.destroy(t.followBtn), triggerEvent(t.followBtn, "mouseover")
                            },
                            showProgress: function() {
                                return t.showInlineLoader()
                            },
                            hideProgress: function() {
                                t.hideInlineLoader(), t.followBtnLock = !1
                            }
                        })
                    }
                }, t.prototype._getDimensions = function() {
                    var t = getSize(this.wrapEl),
                        e = J(t, 2),
                        r = e[0],
                        o = e[1],
                        i = getXY(this.wrapEl),
                        s = J(i, 2),
                        n = s[0];
                    return {
                        width: r,
                        height: o,
                        top: s[1] - scrollGetY(),
                        left: n - scrollGetX()
                    }
                }, t.prototype.markAsActive = function() {
                    this.isActive = !0, st(this.wrapEl, "animate_story")
                }, t.prototype._renderReplyTo = function() {
                    var t = this,
                        e = this.getCurStoryData().reply_to,
                        r = e.list,
                        o = e.photo_url,
                        i = e.name,
                        s = e.can_view_deleted,
                        n = e.is_deleted,
                        a = e.is_private,
                        l = e.raw_id,
                        c = ht('<div class="stories_reply_to" style="background-image: url(' + o + ')">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">' + i + "</div>\n  </div>\n</div>");
                    if (it(c, "click", function() {
                            t.layer._sendNavigationStatEvents("open_parent_story");
                            var e = T();
                            S.length > 1 && e.getStoryRaw() === l ? cancelStackPop() : showStory(r, {
                                fromEl: c,
                                source: "reply_story"
                            })
                        }), s) return c;
                    var d = !1;
                    return n ? (st(c, "deleted"), d = tt("stories_deleted_story")) : a && (st(c, "private"), d = tt("stories_private_story")), d && (val(lt("stories_reply_to_error_msg", c), d), re(lt("stories_reply_to_owner_name_wrap", c))), c
                }, t.prototype.sendMask = function() {
                    var t = this;
                    if (!this._maskSending) {
                        this._maskSending = !0, this.pauseStory();
                        var e = this.getCurStoryData();
                        ajax.post("al_stories.php", {
                            act: "send_mask",
                            mask_id: e.mask_id,
                            hash: this.data.send_mask_hash
                        }, {
                            onDone: function(e, r, o, i) {
                                "cant_send" === e ? showFastBox({
                                    title: r,
                                    width: 460,
                                    onHide: function() {
                                        t.playStory()
                                    }
                                }, o, i) : t._showMessage(tt("stories_mask_sent")).then(function() {
                                    return t.playStory()
                                })
                            },
                            showProgress: function() {
                                return t.showInlineLoader()
                            },
                            hideProgress: function() {
                                t._maskSending = !1, t.hideInlineLoader()
                            }
                        })
                    }
                }, t.prototype._getFeedbackTTElem = function() {
                    return lt("stories_answers_tt_arrow", this.wrapEl) || lt("_views_button", this.wrapEl)
                }, t.prototype._destroyFeedBackTT = function() {
                    var t = this._getFeedbackTTElem();
                    t && t.tt && t.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1
                }, t.prototype.hideFeedbackTooltip = function() {
                    if (this._feedbackTTShown) {
                        var t = this._getFeedbackTTElem();
                        t && t.tt && (t.tt.hide(), this._feedbackTTShown = !1, this.autoResumeStory())
                    }
                }, t.prototype.updateFeedbackTTArrow = function() {
                    var t = this._getFeedbackTTElem();
                    if (hasClass(t, "stories_answers_tt_arrow")) {
                        var e = lt("stories_feedback_tt_arrow", this.wrapEl),
                            r = t.offsetLeft + getSize(t)[0] / 2 - getSize(e)[0] / 2 - 1;
                        vt(e, "left", r + "px")
                    }
                }, t.prototype.showFeedbackTooltip = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this._hideTooltip();
                    var r = this._getFeedbackTTElem();
                    if (r)
                        if (this._feedbackTTShown && !0 !== e) cancelStackPop();
                        else {
                            this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", function() {
                                t.hideFeedbackTooltip(!1, !0)
                            }), this._feedbackTTLoaded && (this._feedbackTTShown = !0), this.layer._sendNavigationStatEvents("open_replies_list");
                            var o = 8;
                            if (hasClass(r, "stories_answers_tt_arrow")) {
                                o = getSize(domPN(r))[0] - 39
                            }
                            showTooltip(r, {
                                className: "stories_feedback_tt",
                                forcetoup: !0,
                                nohide: !0,
                                forceNoHide: !0,
                                nohideover: !0,
                                content: '<div class="stories_feedback_content">\n          <div class="stories_feedback_loader">' + this._getLoaderHtml() + '</div>\n        </div>\n        <div class="stories_feedback_headers"></div>\n        <div class="stories_feedback_close"></div>',
                                slide: 15,
                                zIndex: 100,
                                shift: [o, 19, 0],
                                appendEl: lt("stories_bottom_wrap", this.wrapEl),
                                onHide: function() {
                                    t._feedbackTTShown = !1
                                },
                                onShowStart: function() {
                                    t.isActive && (t._feedbackTTShown = !0, t._feedbackTTLoaded ? t._feedbackRequestEnd && (t.feedbackScroll.update(), t._feedbackTooltipInitHeaders(), tooltips.rePositionTT(r.tt), t._onFeedbackScroll(), setTimeout(function() {
                                        return tooltips.rePositionTT(r.tt)
                                    }, 200)) : (lt("stories_feedback_tt", t.wrapEl).appendChild(ht('<div class="stories_feedback_tt_arrow"></div>')), t._feedbackTTLoaded = !0, t._feedbackRequestEnd = !1, t._feedbackTooltipHeadersInited = !1, it(lt("stories_feedback_close", t.wrapEl), "click", function() {
                                        return t.showFeedbackTooltip()
                                    }), setTimeout(function() {
                                        ajax.post("al_stories.php", {
                                            act: "feedback",
                                            story_raw: t.getRawId()
                                        }, {
                                            onDone: function(e, o, i, s, n) {
                                                if (t.isActive) {
                                                    t.story.setViews(s), t.story.setReplies(n), t._feedbackRequestEnd = !0;
                                                    var a = lt("stories_feedback_content", t.wrapEl);
                                                    val(a, e), t.feedbackScroll = new uiScroll(lt("stories_feedback_content", t.wrapEl), {
                                                        theme: "default emoji no_transition",
                                                        onmore: function() {
                                                            return t._onMoreFeedBack()
                                                        },
                                                        onscroll: function() {
                                                            return t._onFeedbackScroll()
                                                        }
                                                    }), t.feedbackScroll.scrollTop(0), st(t.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), lt("ui_scroll_overflow", t.feedbackScroll.container).appendChild(ce("div", {
                                                        className: "ui_scroll_shadow_bottom"
                                                    })), t.feedbackNextFrom = o, r.tt.shown && t._feedbackTooltipInitHeaders(), t.updateBottom(), t.updateFeedbackTTPos(), cur = yt(cur, i), t.updateFeedbackTTArrow()
                                                }
                                            }
                                        })
                                    }, 200)), t.updateFeedbackTTArrow())
                                }
                            })
                        }
                }, t.prototype.updateFeedbackTTPos = function() {
                    var t = this._getFeedbackTTElem();
                    this._feedbackTTShown && t && t.tt && tooltips.rePositionTT(t.tt)
                }, t.prototype._feedbackTooltipInitHeaders = function() {
                    if (!this._feedbackTooltipHeadersInited) {
                        this._feedbackTooltipHeadersInited = !0;
                        var t = lt("stories_feedback_content", this.wrapEl),
                            e = lt("stories_feedback_headers", this.wrapEl),
                            r = ct("stories_feedback_title", t);
                        show(r[0]), this.feedbackHeaders = [];
                        for (var o = r.length + 1, i = 0; i < r.length; i++) {
                            var s = r[i],
                                n = e.appendChild(ce("div", {
                                    className: "stories_feedback_title",
                                    innerHTML: val(s)
                                }, {
                                    top: s.offsetTop,
                                    zIndex: o - i
                                }));
                            this.feedbackHeaders.push({
                                top: s.offsetTop,
                                height: s.offsetHeight,
                                el: n
                            })
                        }
                        vt(t, "margin-top", r[0].offsetHeight), hide(r[0])
                    }
                }, t.prototype.feedbackTooltipReInitHeaders = function() {
                    this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(lt("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
                }, t.prototype._onFeedbackScroll = function() {
                    if (this._feedbackTooltipHeadersInited)
                        for (var t = this.feedbackScroll.data.scrollTop, e = !1, r = 0, o = this.feedbackHeaders.length - 1; o >= 0; o--) {
                            var i = this.feedbackHeaders[o],
                                s = i.top,
                                n = i.height,
                                a = i.el,
                                l = s,
                                c = t;
                            e && (c -= r - (l += n));
                            var d = c >= s - n;
                            a.classList.toggle("active", !e && d && c > 0), d && (e = !0), r = s;
                            var h = -Math.min(c, l);
                            a.style.transform = "translateY(" + h + "px)"
                        }
                }, t.prototype._onMoreFeedBack = function() {
                    var t = this;
                    !this.feedbackLoadingMore && this.feedbackNextFrom && (this.feedbackLoadingMore = !0, ajax.post("al_stories.php", {
                        act: "feedback",
                        story_raw: this.getRawId(),
                        offset: this.feedbackNextFrom
                    }, {
                        onDone: function(e, r) {
                            t.feedbackNextFrom = r, r && (t.feedbackLoadingMore = !1);
                            for (var o = lt("stories_feedback_views", t.wrapEl), i = ce("div", {
                                    innerHTML: e
                                }), s = void 0; s = i.firstChild;) o.appendChild(s)
                        }
                    }))
                }, t.prototype.showInlineLoader = function() {
                    show(this.inlineLoader)
                }, t.prototype.hideInlineLoader = function() {
                    hide(this.inlineLoader)
                }, t.prototype.volumeUpdate = function() {
                    this.story && this.story.volumeUpdate && this.story.volumeUpdate()
                }, t.prototype._onAutoPlayFail = function() {
                    st(this.wrapEl, "autoplay_failed")
                }, t.prototype._hideReply = function() {
                    var t = this;
                    showFastBox({
                        title: tt("global_warning"),
                        onHide: function() {
                            t.autoResumeStory()
                        }
                    }, tt("stories_hide_reply_warning"), tt("global_continue"), this._doHideReply.bind(this), tt("global_cancel"))
                }, t.prototype._doHideReply = function() {
                    var t = this;
                    this.pauseStory(), st(this.wrapEl, "hiding_reply"), pt().hide();
                    var e = this.getIndex(),
                        r = this.data.author.gender,
                        o = ht('<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">' + getProgressHtml() + '</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">' + tt("stories_reply_hidden") + '</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">' + tt("stories_hide_reply_continue") + '</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">' + langSex(r, window.lang.stories_hide_all_replies) + '</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">' + tt("stories_reply_add_to_blacklist") + "</div>\n  </div>\n</div>");
                    it(lt("_stories_reply_restore", o), "click", this._restoreReply.bind(this)), it(lt("_stories_reply_continue", o), "click", function() {
                        return t._replyHideEnd(e)
                    }), it(lt("_stories_hide_replies", o), "click", this._hideAllReplies.bind(this)), it(lt("_stories_reply_ban", o), "click", this._ban.bind(this)), this.contWrap.appendChild(o), ajax.post("al_stories.php", {
                        act: "hide_reply",
                        raw_id: this.getRawId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            t.opts.removeList(), cur.needUpdateFeedStories = !0, nt(o, "loading")
                        },
                        onFail: function() {
                            t._resetReplyHide(), t.playStory()
                        }
                    })
                }, t.prototype._restoreReply = function(t) {
                    var e = this;
                    cancelEvent(t);
                    var r = lt("stories_hide_reply_wrap", this.contWrap);
                    ajax.post("al_stories.php", {
                        act: "restore_reply",
                        raw_id: this.getRawId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            e._resetReplyHide(), e.playStory()
                        },
                        showProgress: function() {
                            return st(r, "loading")
                        },
                        hideProgress: function() {
                            return nt(r, "loading")
                        }
                    })
                }, t.prototype._resetReplyHide = function() {
                    re(lt("stories_hide_reply_wrap", this.contWrap)), nt(this.wrapEl, "hiding_reply")
                }, t.prototype._hideAllReplies = function() {
                    var t = this.data.author.first_name_gen;
                    showFastBox({
                        title: tt("global_warning")
                    }, tt("stories_delete_all_replies_confirm").replace("{name}", t), tt("global_continue"), this._doHideAllReplies.bind(this), tt("global_cancel"))
                }, t.prototype._doHideAllReplies = function(t) {
                    var e = this;
                    ajax.post("al_stories.php", {
                        act: "hide_all_replies",
                        owner_id: this.getOwnerId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            pt().hide(), e.opts.removeList(), e.data.items = [];
                            var t = lt("_stories_hide_replies", e.contWrap);
                            val(t, tt("stories_all_replies_hidden")), st(t, "disabled")
                        },
                        showProgress: et.pbind(t),
                        hideProgress: rt.pbind(t)
                    })
                }, t.prototype._ban = function() {
                    var t = this.data.author.first_name_gen;
                    showFastBox({
                        title: tt("global_warning")
                    }, tt("stories_ban_confirm").replace("{name}", t), tt("global_continue"), this._doBan.bind(this), tt("global_cancel"))
                }, t.prototype._doBan = function(t) {
                    var e = this;
                    ajax.post("al_stories.php", {
                        act: "ban",
                        owner_id: this.getOwnerId(),
                        hash: this.data.stories_ban_hash
                    }, {
                        onDone: function() {
                            pt().hide(), e.opts.removeList(), e.data.items = [];
                            var t = lt("_stories_reply_ban", e.contWrap);
                            val(t, tt("stories_banned")), st(t, "disabled")
                        },
                        showProgress: et.pbind(t),
                        hideProgress: rt.pbind(t)
                    })
                }, t.prototype._replyHideEnd = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                    lt("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && C(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(t || this.getIndex(), !isNumeric(t)))
                }, t.prototype._feedbackRemoveReplyFromDom = function(t) {
                    var e = lt("stories_feedback_content", this.wrapEl);
                    if (e) {
                        var r = e.querySelector("#feed_story_" + t);
                        r && st(r, "removed")
                    }
                }, t.prototype.onReplyDeleted = function(t) {
                    this._feedbackRemoveReplyFromDom(t)
                }, t.prototype._updateFeedStoryPreview = function() {
                    var t = dt("feed_story_" + this.layer.getBlockKey(this.data));
                    if (t && !hasClass(t, "stories_feed_reply_item")) {
                        var e = this.indexToUnread(!0),
                            r = this.data.items[e];
                        r && r.small_preview && vt(t, "background-image", "url(" + r.small_preview + ")")
                    }
                }, t.prototype._sendStatEvent = function(t) {
                    var e = this.getCurStoryData();
                    ajax.post("al_stories.php", yt({
                        act: "stat",
                        source_story: this.getRawId()
                    }, e.stats[t]))
                }, t.prototype._sendStatStickerEvent = function(t, e) {
                    var r = this.getCurStoryData().clickable_stickers;
                    ajax.post("al_stories.php", yt({
                        act: "stickers_stat",
                        story_raw_id: this.getRawId(),
                        action: t,
                        hash: r.hash
                    }, e))
                }, t.prototype.report = function() {
                    var t = this,
                        e = this.getCurStoryData(),
                        r = "story";
                    this.isActiveLive() ? r = "live" : e.narrative && (r = "narrative");
                    var o = _t("al_stories.php", {
                        act: "report_box",
                        type: r
                    }, {
                        onDone: function() {
                            var t = ct("radiobtn", "stories_report");
                            Z.stories_report = {
                                val: 0,
                                els: t
                            }
                        },
                        params: {
                            onClean: function() {
                                delete Z.stories_report, t.playStory()
                            }
                        }
                    });
                    o.removeButtons(), o.addButton(tt("box_send"), this._sendReportButtonDidPress.bind(this)), o.addButton(tt("global_cancel"), !1, "no")
                }, t.prototype._sendReportButtonDidPress = function(t) {
                    var e = this,
                        r = this.index,
                        o = this.getCurStoryData(),
                        i = o.narrative,
                        s = o.report_hash,
                        n = !!i,
                        a = void 0,
                        l = void 0;
                    n ? (a = i.raw_id, l = i.report_hash) : (a = this.getRawId(), l = s), ajax.post("al_stories.php", {
                        act: "report",
                        type: n ? "narrative" : "story",
                        item_raw: a,
                        reason: Z.stories_report.val,
                        hash: l
                    }, {
                        onDone: function() {
                            pt().hide(), e.layer._sendNavigationStatEvents("claim"), n ? e._popCoverAndCleanNarrativeList(i) : e._popStoryAndClearList(r), showDoneBox(tt("stories_report_sent"), {
                                className: "stories_done_msg"
                            })
                        },
                        showProgress: et.pbind(t),
                        hideProgress: rt.pbind(t)
                    })
                }, t.prototype.onLiveEnded = function(t) {
                    this.isActiveLive() && (this.data.items[this.index].can_share = !t, this.story.onLiveEnded(), this.updateBottom())
                }, t.prototype.updateLiveViewersCount = function(t) {
                    val(this.descEl, t)
                }, t
            }(),
            mt = "user_personal_card",
            gt = "group_personal_card",
            wt = r("Tn+0"),
            bt = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var St = [];
        var kt = [];
        var Et = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var r = [],
                        o = !0,
                        i = !1,
                        s = void 0;
                    try {
                        for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                    } catch (t) {
                        i = !0, s = t
                    } finally {
                        try {
                            !o && a.return && a.return()
                        } finally {
                            if (i) throw s
                        }
                    }
                    return r
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        var Lt = function() {
                function t(e, r, o, i, s) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.queue = [], this.storiesToRead = [], this.storiesSkip = [];
                    try {
                        window.Videoview && Videoview.togglePlay(!1)
                    } catch (t) {}
                    this.initDOM(), this.show(), this._init(e, r, o, i), addClass(this.layerEl, "shown"), this._source = s.source, this._initViewerSource(), this._sendOpeningEvents(), s.isOpenNarrativeFromFeed && (this.isOpenNarrativeFromFeed = s.isOpenNarrativeFromFeed)
                }
                return t.prototype._init = function(t, e, r, o) {
                    var i = t.split("&"),
                        s = Et(i, 2),
                        n = s[0],
                        a = s[1],
                        l = void 0 === a ? "" : a,
                        c = n.split("_"),
                        d = Et(c, 2),
                        h = d[0],
                        u = d[1];
                    this.storyRaw = n, this.storyOwner = h, this.storyId = u, this.blockKey = "" + h + l, this.list = e, this.storiesList = r, this.extra = this.parseExtra(o), this.initStories()
                }, t.prototype.initStories = function() {
                    var t = this;
                    return new Promise(function(e) {
                        t.storiesBlocks = t.storiesList.map(function(e) {
                            return t.getBlockKey(e)
                        });
                        var r = !1,
                            o = t.storiesBlocks.indexOf(t.blockKey);
                        if (o > -1) {
                            var i = t.storiesList[o];
                            r = i.items[i.items.length - 1].unread
                        }
                        if (t.extra) switch (t.extra.context) {
                            case "new":
                                r = !0;
                                break;
                            case "all":
                                r = !1
                        }
                        if (r && "replies" === t.list.substr(0, 7) && (r = !1), r) {
                            for (var s = [], n = 0; n < t.storiesList.length; n++) {
                                var a = t.storiesList[n],
                                    l = a.items[a.items.length - 1];
                                a.is_narrative && !l.isNarrativeMetaStory && a.items.push({
                                    type: "photo",
                                    raw_id: l.raw_id,
                                    narrative: l.narrative,
                                    isNarrativeMetaStory: !0
                                }), (a.items[a.items.length - 1].unread || 0 === n && t._hasContext("new")) && s.push(a)
                            }
                            s.length && (t.storiesList = s, t.storiesBlocks = t.storiesList.map(function(e) {
                                return t.getBlockKey(e)
                            }))
                        }
                        t.renderedStories = {};
                        var c = t._renderStories().activeStory;
                        t.scrollToStory(c, !0), 1 === t.storiesList.length && addClass(t.stories, "one_story"), t._startFirstStory(c, t.extra.story_id), addClass(t.stories, "inited"), e()
                    })
                }, t.prototype.getBlockKey = function(t) {
                    return t.hasOwnProperty("data") && (t = t.data), t.items && t.items.length && "live" === t.items[0].type ? t.author.id + "live" : t.narrative || t.is_narrative ? (t.author ? t.author.id : t.narrative.owner_id) + "narrative" + (t.items ? t.items[0].narrative.id : t.narrative.id) : "" + t.author.id
                }, t.prototype._renderStories = function() {
                    for (var t = this, e = [], r = 0; r < this.storiesList.length; r++) this.storiesList[r] && e.push(this.storiesList[r]);
                    var o = this._getScreenStoriesCount(),
                        i = this._getCurStoryPos(e.map(function(e) {
                            return t.getBlockKey(e)
                        })),
                        s = Math.floor(o / 2),
                        n = e.slice(Math.max(0, i - s)).slice(0, o),
                        a = n.map(function(e) {
                            return t.getBlockKey(e)
                        });
                    for (var l in this.renderedStories)
                        if (this.renderedStories.hasOwnProperty(l)) {
                            var c = this.renderedStories[l]; - 1 === a.indexOf(l) && (c.story.destroy(), delete this.renderedStories[l])
                        }
                    var d = void 0;
                    if (n.map(function(e, r) {
                            var o = t.getBlockKey(e);
                            if (!t.renderedStories[o]) {
                                var i = t.storiesBlocks.indexOf(o),
                                    n = e.author.id,
                                    a = new ft(e, {
                                        id: r,
                                        layer: t,
                                        onSelect: t._onSelectStory.bind(t),
                                        onStoriesEnd: t._onStoriesEnd.bind(t, i),
                                        onStoryRemoved: function(e, r) {
                                            return t._onStoryRemoved(n, i, e, r)
                                        },
                                        playPrevOwner: t._playPrevOwner.bind(t, i),
                                        onPlayStory: t._onPlayStory.bind(t, i),
                                        onVideoPlay: t._onVideoPlay.bind(t),
                                        onVideoEnd: t._onVideoEnd.bind(t),
                                        onStartStory: t._onStartStory.bind(t),
                                        removeList: function() {
                                            return Stories.removeList(t.list)
                                        }
                                    });
                                r <= s && t.stories.children[r] ? t.stories.insertBefore(a.render(), t.stories.children[r]) : t.stories.appendChild(a.render()), t.renderedStories[o] = {
                                    story: a,
                                    index: i
                                }, o === t.blockKey && (d = a)
                            }
                        }), !d) {
                        var h = a[0];
                        d = this.renderedStories[h].story
                    }
                    return {
                        activeStory: d
                    }
                }, t.prototype._sendOpeningEvents = function() {
                    if (this._source) {
                        var t = void 0;
                        switch (this._source) {
                            case "narrative_story":
                                t = "narrative_open_stories";
                                break;
                            case "narrative_snippet":
                            case "narrative_link":
                                t = "narrative_open";
                                break;
                            case "narrative_recommendations":
                                t = "narrative_other"
                        }
                        t && this._sendNavigationStatEvents(t, !1)
                    }
                }, t.prototype._destroyStories = function() {
                    for (var t in this.renderedStories) {
                        if (this.renderedStories.hasOwnProperty(t)) this.renderedStories[t].story.destroy()
                    }
                }, t.prototype.destroy = function() {
                    clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), this._onVideoEnd(), removeEvent(this.volumeControl), removeEvent(this.layerEl), delete this.activeStory, delete this.volumeControl, delete this.renderedStories;
                    try {
                        this.layerEl && bodyNode.removeChild(this.layerEl)
                    } catch (t) {}
                    delete cur.storyLayer
                }, t.prototype.getList = function() {
                    return "story" + this.activeStory.getRawId() + "/" + this.list
                }, t.prototype.getStoryRaw = function() {
                    return !!this.activeStory && this.activeStory.getRawId()
                }, t.prototype.initDOM = function() {
                    this.layerEl = ce("div", {
                        className: "stories_layer"
                    });
                    var t = ce("div", {
                        className: "stories_layer_cont"
                    });
                    this.layerEl.appendChild(t), t.appendChild(this._renderBackButton()), t.appendChild(this._renderVolumeControl()), this._updateVolumeButton(), this.stories = ce("div", {
                        id: "stories_list",
                        className: "stories_list"
                    }), t.appendChild(this.stories), t.appendChild(ce("div", {
                        className: "stories_layer_close"
                    })), addEvent(this.layerEl, "click", this._onLayerClick.bind(this)), bodyNode.appendChild(this.layerEl)
                }, t.prototype.show = function() {
                    onBodyResize()
                }, t.prototype.hide = function(t) {
                    addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && E(), this._source && this._source.indexOf("narrative") > -1 && this._sendNavigationStatEvents("narrative_close", !1), !0 !== t && this.activeStory ? this.animateStory("minimize").then(this.doHide.bind(this)) : this.doHide(t), removeClass(this.layerEl, "shown"), this.activeStory && (this.activeStory.pauseStory(), this.activeStory._hideTooltip(), this.activeStory.isActiveLive() && this._sendNavigationStatEvents("live_player_close", !1))
                }, t.prototype.doHide = function(t) {
                    this._readStories(), this.destroy(), !t && (S.pop(), cur.storyLayer = S[S.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())), window.wkcur && window.wkcur.shown && WkView.restoreLayer({}), "group_stories" === this.list && Stories.groupStoriesBlockUpdate()
                }, t.prototype.back = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.hideAllLayers = !1;
                    var e = cancelStack[cancelStack.length - 1];
                    e && "stories_form_focus" === e.name && cancelStackPop(), this.hide(!1, t)
                }, t.prototype._getScreenStoriesCount = function() {
                    return 2 * Math.floor(window.innerWidth / (.563 * window.innerHeight)) + 1
                }, t.prototype._getCurStoryPos = function(t) {
                    return (t || this.storiesBlocks).indexOf(this.blockKey)
                }, t.prototype._startFirstStory = function(t, e) {
                    var r = this;
                    this.activeStory = t, addClass(t.getWrap(), "active"), this.scrollToStory(), e || (e = this._hasContext("new") ? e : this.storyRaw), t.indexToStoryById(e), this._startActiveStory(), setTimeout(function() {
                        addClass(r.stories, "animated"), r.inited = !0, "open" === r.extra.replies && r.activeStory.showFeedbackTooltip()
                    })
                }, t.prototype._markReadRestStories = function(t) {
                    this._markReadStoriesInRange(t, t.index, t.data.items.length), this._updateBadge(t)
                }, t.prototype._onSelectStory = function(t) {
                    var e = this,
                        r = void 0;
                    this.activeStory && (r = this.activeStory.getWrap(), this.activeStory.stop()), t.id - this.activeStory.id > 0 && this._markReadRestStories(this.activeStory), this.activeStory = t, t.indexToUnread(), t.isActiveLive() || t.fillTimeLine(), this.blockKey = this.getBlockKey(t), clearTimeout(this.timer), addClass(this.stories, "animated"), this.timer = setTimeout(function() {
                        removeClass(r, "active"), addClass(t.getWrap(), "active"), e.scrollToStory(), e.timer = setTimeout(function() {
                            e.activeStory && t.id !== e.activeStory.id || !e.activeStory || (t.indexToUnread(), e._startActiveStory(), e._renderStories(), e.scrollToStory(t, !0))
                        }, 200)
                    })
                }, t.prototype._startActiveStory = function() {
                    var t = this.activeStory;
                    t.markAsActive(), t.playStory(!0)
                }, t.prototype._onStartStory = function() {
                    var t = this.activeStory,
                        e = this.list;
                    if (t) {
                        var r = nav.objLoc;
                        r.w = "story" + t.getRawId(), e.match(/^-?(\d+)_(\d+)$/) || (r.w += "/" + e), e.match(/^narrative-?\d+_\d+/) && (r.w = "narrative" + this.activeStory.getCurStoryData().narrative.raw_id), nav.setLoc(nav.toStr(r))
                    }
                }, t.prototype.scrollToStory = function(t, e) {
                    var r = this,
                        o = this._getScrollLeft(t);
                    e ? (removeClass(this.stories, "animated"), this._setScrollLeft(o)) : this.inited && addClass(this.stories, "animated"), setTimeout(function() {
                        r._setScrollLeft(o)
                    })
                }, t.prototype._setScrollLeft = function(t) {
                    setStyle(this.stories, "transform", "translateX(" + t + "px) translateZ(0)")
                }, t.prototype._getScrollLeft = function(t) {
                    return t = t || this.activeStory, window.innerWidth / 2 - t.getOffsetLeft()
                }, t.prototype._onStoriesEnd = function(t, e) {
                    for (var r = -1, o = t + 1; o < this.storiesList.length; o++) {
                        if (this.storiesList[o]) {
                            r = o;
                            break
                        }
                    }
                    r > -1 ? (e && this._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this._onSelectStory(this._getStoryInstanceByIndex(r))) : cancelStackPop(e)
                }, t.prototype._playPrevOwner = function(t) {
                    for (var e = -1, r = t - 1; r >= 0; r--) {
                        if (this.storiesList[r]) {
                            e = r;
                            break
                        }
                    }
                    e > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(e)) : cancelStackPop()
                }, t.prototype._markReadStoriesInRange = function(t, e, r) {
                    for (var o = t.data.items, i = e; i < r; i++) {
                        var s = o[i];
                        s.unread && (s.unread = !1)
                    }
                }, t.prototype._markReadPrevStories = function(t) {
                    this._markReadStoriesInRange(t, 0, t.index)
                }, t.prototype._updateBadge = function(t) {
                    var e = ge("feed_story_" + this.getBlockKey(t)),
                        r = geByClass1("_stories_feed_item_replies", e);
                    if (hasClass(e, "story_feed_new_item") || "" !== val(r)) {
                        var o = t.data.items || [],
                            i = o[t.index] || {};
                        (i.answers || {}).new_count = 0, i.unread = !1;
                        var s = !0,
                            n = 0;
                        o.forEach(function(t) {
                            var e = t.answers || {};
                            n += e.new_count || 0, t.unread && (s = !1)
                        }), n > 0 ? val(r, n) : (val(r, ""), s && (removeClass(e, "story_feed_new_item"), removeClass(e, "story_feed_new_item_promo")))
                    }
                }, t.prototype._onPlayStory = function(t) {
                    var e = this._getStoryInstanceByIndex(t);
                    if (e) {
                        this.storiesReadHash = e.getReadHash();
                        var r = e.getRawId(),
                            o = e.getTrackCode();
                        o && (r += "_" + o), this.storiesToRead.push(r), this._markReadPrevStories(e), this.storiesToRead > 10 && this._readStories(), this._updateBadge(e)
                    }
                    var i = this._getStoryInstanceByIndex(t + 1);
                    i && i.preloadNextStory(i.getIndex())
                }, t.prototype._getStoryInstanceByIndex = function(t) {
                    var e = this.storiesList[t];
                    if (!e) return !1;
                    var r = this.getBlockKey(e);
                    return this.renderedStories[r].story
                }, t.prototype._onStoryRemoved = function(t, e, r, o) {
                    for (var i = 0; i < this.storiesList.length; i++) this.storiesList[i] && this.storiesList[i].author.id === t && (this.storiesList[i] = !1);
                    !r && this._onStoriesEnd(e), Stories.updateFeedStories(null, {
                        cb: o
                    })
                }, t.prototype.onVisibilityChange = function() {
                    "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
                }, t.prototype.onResize = function() {
                    var t = cur.storyLayer.activeStory;
                    t && cur.storyLayer.scrollToStory(t, !0)
                }, t.prototype.pauseStory = function(t) {
                    this.activeStory && this.activeStory.pauseStory(t)
                }, t.prototype.playStory = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.activeStory && this.activeStory.autoResumeStory(t)
                }, t.prototype._onLayerClick = function(t) {
                    var e = hasClass(t.target, "stories_layer_close");
                    (hasClass(t.target, "stories_layer_cont") || e) && (e ? this.isCloseBtnClick = !0 : this.storiesBlocks.length - 1 === this._getCurStoryPos() && (this._markReadRestStories(this.activeStory), this._markStoryAsSkipped()), cancelStackPop())
                }, t.prototype._checkKeyEvents = function(t) {
                    return !(attr(t.target, "contenteditable") || inArray(t.target.tagName, ["INPUT", "TEXTAREA"]) || curBox())
                }, t.prototype.onKeyDown = function(t) {
                    if (cur.storiesKeyDown) cur.storyLayer && cur.storyLayer._checkKeyEvents(t) && cancelEvent(t);
                    else {
                        if (cur.storiesKeyDown = t.keyCode !== KEY.ESC, [KEY.PAGEDOWN, KEY.PAGEUP].indexOf(t.keyCode) > -1) return cancelEvent(t);
                        if (cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(t)) {
                            switch (t.keyCode) {
                                case KEY.LEFT:
                                    cur.storyLayer.prevStory();
                                    break;
                                case KEY.RIGHT:
                                    cur.storyLayer.nextStory();
                                    break;
                                case KEY.SPACE:
                                    cancelEvent(t);
                                    var e = cur.storyLayer.activeStory;
                                    cur.storiesKeyDownLong = setTimeout(e._longTapHandle.bind(e), 200)
                            }
                            cur.storiesKeyDownTs = vkNow()
                        }
                    }
                }, t.prototype.onKeyUp = function(t) {
                    cur.storiesKeyDown = !1, clearTimeout(cur.storiesKeyDownLong), cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(t) && t.keyCode === KEY.SPACE && (cancelEvent(t), vkNow() - cur.storiesKeyDownTs > 200 ? cur.storyLayer.playStory(!0) : cur.storyLayer.nextStory())
                }, t.prototype.nextStory = function() {
                    this.activeStory && this.activeStory.nextStory()
                }, t.prototype.prevStory = function() {
                    this.activeStory && this.activeStory.prevStory()
                }, t.prototype.changeStory = function(t) {
                    this.activeStory && this.activeStory.changeStory(t)
                }, t.prototype._readStories = function() {
                    if (this.storiesToRead.length && (kt.length || St.length)) {
                        var t = this._getSource(),
                            e = this.storiesToRead.join(","),
                            r = this.storiesSkip.join(",");
                        this.storiesToRead = [], ajax.post("al_stories.php", {
                            act: "read_stories",
                            stories: e,
                            source: t,
                            stories_skip: r,
                            navigation_stats: function() {
                                var t = St.map(function(t) {
                                    return [t.ownerId, t.storyId, t.source, t.action].join(",")
                                }).join(";");
                                return St = [], t
                            }(),
                            loading_stats: function() {
                                var t = kt.map(function(t) {
                                    return [t.ownerId, t.storyId, t.source, t.time].join(",")
                                }).join(";");
                                return kt = [], t
                            }(),
                            connection_type: function() {
                                var t = navigator.connection;
                                if (!t) return "";
                                var e = t.effectiveType,
                                    r = t.downlink;
                                switch (e) {
                                    case "slow-2g":
                                        return "GPRS";
                                    case "2g":
                                        return "EDGE";
                                    case "3g":
                                        return "3G";
                                    case "4g":
                                        return r > 8 ? "wi-fi" : "LTE"
                                }
                                return ""
                            }(),
                            hash: this.storiesReadHash
                        })
                    }
                }, t.prototype._getSource = function() {
                    var t = "list";
                    return this._source ? this._source : (-1 !== [mt, gt, Y, wt.b].indexOf(cur.module) && (t = cur.module), t)
                }, t.prototype._sendNavigationStatEvents = function(t) {
                    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        r = this.activeStory,
                        o = this.getStoryRaw() || r.getCurStoryData().raw_id,
                        i = this._getSource();
                    e && this._sendProductAnalyticEvents(t), this._updateLastStoryOpenAction(t),
                        function(t) {
                            var e = t.storyRawId,
                                r = t.source,
                                o = t.action,
                                i = e.split("_"),
                                s = bt(i, 2),
                                n = s[0],
                                a = s[1];
                            "reply" === r && (r = "replies_list");
                            var l = {
                                ownerId: n,
                                storyId: a,
                                source: r,
                                action: o
                            };
                            St.push(l)
                        }({
                            storyRawId: o,
                            source: i,
                            action: t
                        })
                }, t.prototype._sendProductAnalyticEvents = function(t) {
                    var e = this.activeStory,
                        r = (this.getStoryRaw() || e.getCurStoryData().raw_id).split("_"),
                        o = Et(r, 2),
                        i = o[0],
                        s = o[1],
                        n = e.getIndex(),
                        a = e.getItemsLength() - n,
                        l = e.story,
                        c = this._getSource();
                    if (t && e && l && i && s) {
                        var d = {
                            event_type: t,
                            story_owner_id: i,
                            story_id: s,
                            time: vk.ts + Math.floor(((new Date).getTime() - vk.started) / 1e3),
                            volume: 100 * m(),
                            view_entry_point: c,
                            stories_author_before: n,
                            stories_author_after: a,
                            nav_screen: cur.module,
                            view_event_timeline_position: l.getCurrentTime()
                        };
                        "view_story" === t && (d.preloading_duration = e.loadingTime || 0), statlogsValueEvent("story_product_analytics", d)
                    }
                }, t.prototype._updateLastStoryOpenAction = function(t) {
                    switch (t) {
                        case "go_to_next_story_tap":
                        case "go_to_next_story_click":
                        case "go_to_next_story_auto_by_time":
                            this.viewerSource = "next_story";
                            break;
                        case "go_to_previous_story":
                            this.viewerSource = "previous_story";
                            break;
                        case "go_to_next_author":
                            this.viewerSource = "next_author";
                            break;
                        case "go_to_previous_author":
                            this.viewerSource = "previous_author"
                    }
                }, t.prototype._initViewerSource = function() {
                    var t = this._getSource();
                    switch (t) {
                        case "reply":
                            this.viewerSource = "replies_list";
                            break;
                        case "feed":
                            this.viewerSource = cur.section;
                            break;
                        default:
                            this.viewerSource = t
                    }
                }, t.prototype._sendViewerStartTime = function(t, e) {
                    ! function(t) {
                        var e = t.storyRawId,
                            r = t.source,
                            o = t.time,
                            i = e.split("_"),
                            s = bt(i, 2),
                            n = {
                                ownerId: s[0],
                                storyId: s[1],
                                source: r,
                                time: o
                            };
                        kt.push(n)
                    }({
                        storyRawId: t,
                        source: this.viewerSource,
                        time: e
                    })
                }, t.prototype._onVideoPlay = function() {
                    getAudioPlayer().isPlaying() && (this.needAudioReset = !0, getAudioPlayer().pause()), Notifier.lcSend("stories_video_start")
                }, t.prototype._onVideoEnd = function() {
                    this.needAudioReset && (delete this.needAudioReset, getAudioPlayer().play()), Notifier.lcSend("stories_video_end")
                }, t.prototype._renderBackButton = function() {
                    return this.backButton = se('<div class="stories_back_button_wrap">\n  <div class="stories_back_button">\n    <div class="stories_back_button_icon"></div>\n    <div class="stories_back_button_text">' + getLang("global_back") + "</div>\n  </div>\n</div>"), addEvent(this.backButton, "click", function() {
                        cancelStackPop()
                    }), this.backButton
                }, t.prototype.showBackButton = function() {
                    show(this.backButton), this.hideAllLayers = !0, addClass(this.layerEl, "with_back_button")
                }, t.prototype.parseExtra = function(t) {
                    var e = {},
                        r = String(t).split(";");
                    for (var o in r)
                        if (r.hasOwnProperty(o)) {
                            var i = r[o].split(":"),
                                s = Et(i, 2),
                                n = s[0],
                                a = s[1];
                            e[n] = a
                        }
                    return e
                }, t.prototype.getAnimateFromElem = function() {
                    if (!this.hideAllLayers) {
                        var t = this.getBlockKey(this.activeStory);
                        if (hasClass(this.animateFromEl, "stories_feed_reply_item")) {
                            var e = domQuery("#feed_story_" + t, domPN(this.animateFromEl))[0];
                            if (e) return e
                        } else if ("feed" === cur.module && !isVisible(this.backButton)) {
                            var r = ge("feed_story_" + t);
                            if (r) return Stories.feedScrollToOwner(t), r
                        }
                    }
                    return this.animateFromEl
                }, t.prototype.animateStory = function(t, e) {
                    var r = this;
                    return new Promise(function(o) {
                        if ("expand" === t && !e || "minimize" === t && !r.animateFromEl) return setStyle("stories_layers_background", "opacity", 1), o();
                        r.pauseStory(), addClass(r.layerEl, "animation"), removeClass(r.stories, "animated");
                        var i = "expand" === t ? e : r.getAnimateFromElem();
                        if (r.hideAllLayers && "minimize" === t) {
                            var s = S[0];
                            i = s.getAnimateFromElem(),
                                function() {
                                    for (var t = S.length - 2; t >= 0; t--) S[t].doHide(!0);
                                    S.splice(0, S.length - 1)
                                }(), E()
                        }
                        removeClass(i, "stories_feed_item_ava_animate");
                        var n = getXY(i),
                            a = Et(n, 2),
                            l = a[0],
                            c = a[1],
                            d = getSize(i),
                            h = window.innerHeight,
                            u = Math.min(540, Math.max(320, .563 * h)),
                            p = 1.78 * u,
                            _ = Math.max(0, (h - p) / 2),
                            y = Math.max(0, (window.innerWidth - u) / 2);
                        l = y - l + u / 2 - d[0] / 2 + scrollGetX(), c = _ - c + p / 2 - d[1] / 2 + scrollGetY(), l = -l, c = -c;
                        var v = {};
                        "expand" === t && (v.transform = "translate(" + l + "px, " + c + "px) scale(0)", r.animateFromEl = e), setStyle(r.activeStory.wrapEl, v), "minimize" === t && setStyle(i, "transform", "scale(0)"), r.animationTimer = setTimeout(function() {
                            addClass(r.stories, "animated"), addClass(i, "stories_feed_item_ava_animate"), r.animationTimer = setTimeout(function() {
                                "expand" === t ? (setStyle("stories_layers_background", "opacity", 1), setStyle(r.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(r.activeStory.wrapEl, "transform", "translate(" + l + "px, " + c + "px) scale(0.01)"), setStyle(i, "transform", "scale(1)")), r.animationTimer = setTimeout(function() {
                                    o(), "expand" === t ? (setStyle(r.activeStory.wrapEl, "transform", ""), removeClass(r.layerEl, "animation"), removeClass(r.stories, "animated"), r.playStory(), S.length > 1 && (S[S.length - 2].setLayerVisibility(!1), S[S.length - 1].showBackButton())) : (removeClass(i, "stories_feed_item_ava_animate"), setStyle(i, "transform", ""))
                                }, 330)
                            }, 30)
                        }, 30)
                    })
                }, t.prototype.pauseLayer = function() {
                    this.pauseStory(), addClass(this.layerEl, "paused")
                }, t.prototype.resumeLayer = function() {
                    this._updateVolumeButton(), this.activeStory.volumeUpdate(), this.activeStory && !this.activeStory.story.isNarrativeMetaStory && (this.playStory(), removeClass(this.layerEl, "paused"), this.activeStory.feedbackScroll && this.activeStory.feedbackScroll.update())
                }, t.prototype.setLayerVisibility = function(t) {
                    toggle(this.layerEl, t)
                }, t.prototype._renderVolumeControl = function() {
                    return this.volumeControl = se('<div class="stories_volume_control">\n  <div class="stories_volume_control_slide_wrap">\n    <div class="stories_volume_control_slide">\n      <div class="stories_volume_control_slide_indicator"></div>\n    </div>\n  </div>\n</div>'), addEvent(geByClass1("stories_volume_control_slide_wrap", this.volumeControl), "mousedown", this._volumeControlOnMouseDown.bind(this)), addEvent(this.volumeControl, "mousedown", this._volumeControlOnClick.bind(this)), this.volumeControlContainer = ce("div", {
                        className: "stories_volume_control_container"
                    }), this.volumeControlContainer.appendChild(this.volumeControl), this.volumeControlContainer
                }, t.prototype._volumeControlOnMouseDown = function(t) {
                    var e = this;
                    addClass(this.volumeControlContainer, "changing");
                    var r = geByClass1("stories_volume_control_slide", this.volumeControl),
                        o = geByClass1("stories_volume_control_slide_indicator", r),
                        i = getXY(r),
                        s = Et(i, 1)[0],
                        n = getSize(r),
                        a = Et(n, 1)[0],
                        l = function(t) {
                            var r = Math.max(0, Math.min(t.pageX - s, a)) / a * 100;
                            setStyle(o, "width", r + "%"), g(r / 100), e.activeStory.volumeUpdate()
                        };
                    addEvent(window, "mousemove", l), addEvent(window, "mouseup", function t() {
                        removeEvent(window, "mousemove", l), removeEvent(window, "mouseup", t), e._updateVolumeButton(), removeClass(e.volumeControlContainer, "changing")
                    }), l(t)
                }, t.prototype._updateVolumeButton = function() {
                    var t = 100 * m();
                    toggleClass(this.volumeControl, "low", t > 0 && t < 50), toggleClass(this.volumeControl, "high", t >= 50);
                    var e = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
                    setStyle(e, "width", t + "%")
                }, t.prototype._volumeControlOnClick = function(t) {
                    if (!hasClass(t.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControlContainer, "changing")) {
                        var e = m();
                        g(e = e ? 0 : 1), this._updateVolumeButton(), this.activeStory.volumeUpdate()
                    }
                }, t.prototype.onReplyDeleted = function(t) {
                    this.activeStory && this.activeStory.onReplyDeleted(t)
                }, t.prototype._markStoryAsSkipped = function() {
                    this.storiesSkip.push(this.getStoryRaw())
                }, t.prototype._hasContext = function(t) {
                    return !(!this.extra || !this.extra.context || this.extra.context !== t)
                }, t
            }(),
            Tt = r("4+be"),
            Ct = r("t7n3"),
            xt = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            Bt = s.Promise,
            Pt = {
                show: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (t.match(/story/) && (t = this._parseList(t)), cur.storyLayer && cur.storyLayer.list === t.split("/")[1]) return !1;
                    this.getList(t).then(function(t) {
                        var r = t.blockKey,
                            o = t.list,
                            i = t.items,
                            s = t.extra;
                        k(new Lt(r, o, i, s, e), e)
                    }).catch(function(t) {
                        vk.dev && debugLog(t), showFastBox(Object(Tt.d)("global_error"), Object(Tt.d)("global_unknown_error"))
                    })
                },
                _getUnreadStory: function(t, e) {
                    t = intval(t);
                    for (var r = !1, o = 0; o < e.length; o++)
                        if (e[o].author.id === t) {
                            for (var i = e[o].items, s = 0; s < i.length; s++)
                                if (i[s].unread) {
                                    r = i[s];
                                    break
                                }
                            r || (r = i[0]);
                            break
                        }
                    return r
                },
                getList: function(t, e) {
                    return new Bt(function(r, o) {
                        var i = t.split("/"),
                            s = xt(i, 3),
                            n = s[0],
                            a = s[1],
                            l = s[2],
                            c = {
                                blockKey: n,
                                list: a,
                                extra: l
                            },
                            d = Pt._getList(a);
                        isArray(d) ? (c.items = d, r(c)) : ajax.post("al_stories.php", {
                            act: "get_list",
                            list: a,
                            story_raw: n,
                            extra: l,
                            from_manage: window.cur.module === Y ? 1 : 0
                        }, {
                            loader: !e,
                            onDone: function(t) {
                                cur["stories_list_" + a] = t.list, c.items = t.list, t.recommendations && (cur["stories_list_" + a + "_recommendations"] = t.recommendations), r(c)
                            },
                            onFail: function() {
                                return o(), !0
                            }
                        })
                    })
                },
                _getList: function(t) {
                    return cur["stories_list_" + t]
                },
                _setList: function(t, e) {
                    cur["stories_list_" + t] = e
                },
                removeList: function(t) {
                    delete cur["stories_list_" + t]
                },
                _parseList: function(t) {
                    var e = (t = decodeURIComponent(t)).match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\:\;\-]+))?$/i),
                        r = xt(e, 7),
                        o = r[1],
                        i = r[2],
                        s = r[4],
                        n = r[6],
                        a = o + "_" + i;
                    return t.match(/from_feed\=1/) ? s = "feed" : t.match(/profile\=1/) ? s = "profile" : s || (s = a), a + "/" + s + "/" + n
                },
                initFeed: function() {
                    var t = Object(Q.F)("stories_feed_items_container");

                    function e() {
                        addEvent(t, browserFeatures.wheelEvent, Pt.feedMouseWheel)
                    }

                    function r() {
                        removeEvent(t, browserFeatures.wheelEvent, Pt.feedMouseWheel)
                    }
                    Pt.updateFeedArrows(), addEvent(t, "mouseenter", e), addEvent(t, "mouseleave", r), cur.destroy.push(function() {
                        removeEvent(t, browserFeatures.wheelEvent, Pt.feedMouseWheel), removeEvent(t, "mouseenter", e), removeEvent(t, "mouseleave", r)
                    })
                },
                feedNext: function() {
                    return this.feedPaging("next")
                },
                feedPrev: function() {
                    return this.feedPaging("prev")
                },
                feedPaging: function(t, e) {
                    var r = Object(Q.H)("stories_feed_wrap"),
                        o = Object(Q.F)("stories_feed_items"),
                        i = getSize(r)[0],
                        s = cur.storiesPos || 0;
                    if (isNumeric(t)) s += t;
                    else {
                        var n = i - 100;
                        "next" === t ? s += n : s -= n
                    }
                    cur.storiesPos = Math.max(0, Math.min(s, o.scrollWidth - i)), e ? Object(Q.hb)(o, "animated") : Object(Q.a)(o, "animated"), setStyle(o, "transform", "translateX(-" + cur.storiesPos + "px)"), Pt.updateFeedArrows()
                },
                feedScrollToOwner: function(t) {
                    var e = Object(Q.F)("stories_feed_items").offsetWidth,
                        r = Object(Q.F)("feed_story_" + t);
                    if (r) {
                        var o = r.offsetWidth,
                            i = r.offsetLeft;
                        cur.storiesPos = i - e + e / 2 + o / 2, Pt.feedPaging(0, !0)
                    }
                },
                updateFeedStories: function(t, e) {
                    var r = this;
                    if (t = t || "news", Object(Q.F)("stories_feed_items"))
                        if (inArray(t, ["news", "search"])) {
                            var o = function(t, o) {
                                e && e.cb && e.cb(), r._setList("feed", o);
                                var i = Object(Q.F)("stories_feed_items");
                                i && (t ? (setStyle(i, "transform", "translateX(0px)"), Object(Q.yb)(i, t), i.children.length < 6 ? Object(Q.a)("stories_feed_wrap", "stories_feed_not_nav_buttons") : Object(Q.hb)("stories_feed_wrap", "stories_feed_not_nav_buttons"), cur.storiesPos = 0, Pt.updateFeedArrows(), show("stories_feed_wrap")) : hide("stories_feed_wrap"))
                            };
                            if (e && e.stories) {
                                var i = e.section,
                                    s = e.q,
                                    n = e.stories,
                                    a = n.html,
                                    l = n.js;
                                return "search" !== i || s && l.length ? void o(a, l) : void hide("stories_feed_wrap")
                            }
                            ajax.post("al_stories.php", {
                                act: "feed_stories"
                            }, {
                                onDone: o
                            })
                        } else hide("stories_feed_wrap")
                },
                feedMouseWheel: function(t) {
                    if (!hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) {
                        cancelEvent(t);
                        var e = Math.abs(t.deltaY) > Math.abs(t.deltaX) ? t.deltaY : t.deltaX;
                        Pt.feedPaging(e, 1)
                    }
                },
                updateFeedArrows: function() {
                    var t = Object(Q.F)("stories_feed_items");
                    if (t) {
                        cur.storiesPos || (cur.storiesPos = 0);
                        var e = Object(Q.H)("stories_feed_wrap").offsetWidth,
                            r = t.scrollWidth - e;
                        0 === cur.storiesPos ? Object(Q.a)("stories_feed_arrow_left", "disabled") : Object(Q.hb)("stories_feed_arrow_left", "disabled"), cur.storiesPos === r || r <= 0 ? Object(Q.a)("stories_feed_arrow_right", "disabled") : Object(Q.hb)("stories_feed_arrow_right", "disabled")
                    }
                },
                showBlackList: function() {
                    cur.storyLayer && cur.storyLayer.pauseStory(), showBox("al_stories.php", {
                        act: "black_list"
                    }, {
                        onDone: function() {
                            cur.storiesBlackListScroll = new uiScroll("stories_black_list_result")
                        },
                        params: {
                            onHide: function() {
                                cur.storyLayer && cur.storyLayer.playStory()
                            }
                        }
                    })
                },
                blackListItemClick: function(t, e) {
                    cancelEvent(e);
                    var r = intval(attr(t, "data-id"));
                    cur.storiesBlackListShown[r] ? (delete cur.storiesBlackListShown[r], Object(Q.hb)(t, "olist_item_wrap_on")) : (cur.storiesBlackListShown[r] = 1, Object(Q.a)(t, "olist_item_wrap_on"))
                },
                saveBlackList: function(t) {
                    var e = Object.keys(cur.storiesBlackListShown);
                    0 !== e.length ? ajax.post("al_stories.php", {
                        act: "save_blacklist",
                        hash: cur.storiesBlackList.hash,
                        list: e.join(",")
                    }, {
                        onDone: function() {
                            curBox().hide(), Pt.updateFeedStories()
                        },
                        showProgress: lockButton.pbind(t),
                        hideProgress: unlockButton.pbind(t)
                    }) : curBox().hide()
                },
                blacklistUpdateUsers: function(t) {
                    var e = t;
                    if (t = trim(t).toLowerCase(), cur.storiesBlacklistLastQ !== t) {
                        cur.storiesBlacklistLastQ = t;
                        var r = t ? cur.storiesIndexer.search(t) : cur.storiesBlackList.users,
                            o = [];
                        if (t)
                            for (var i = 0; i < t.length; i++) o.push(t.substr(i, 1));
                        for (var s = new RegExp(o.join(".*?"), "i"), n = "", a = 0; a < r.length; a++) {
                            var l = r[a],
                                c = t ? l.name.replace(s, function(t) {
                                    return "<em>" + t + "</em>"
                                }) : l.name;
                            n += cur.storiesBlackList.tpl.replace(/\{id\}/g, l.id).replace("{photo}", l.photo).replace("{name}", c).replace("{href}", l.href).replace("{class_name}", cur.storiesBlackListShown[l.id] ? " olist_item_wrap_on" : "")
                        }
                        n || (n = '<div class="no_rows">' + Object(Tt.d)("global_search_not_found").replace("{search}", clean(e)) + "</div>"), Object(Q.yb)(Object(Q.H)("olist", "stories_black_list_result"), n)
                    }
                },
                blackListInit: function(t) {
                    cur.storiesBlackListShown = {}, cur.storiesBlackList = t, curBox().setOptions({
                        width: 450,
                        bodyStyle: "padding: 0px",
                        onClean: function() {
                            this.storyLayer && this.storyLayer.playStory(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
                        }
                    }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, function(t) {
                        return t.name
                    }, function() {
                        Pt.blacklistUpdateUsers("")
                    }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), curBox().addButton(Object(Tt.d)("global_save"), Pt.saveBlackList).addButton(Object(Tt.d)("global_cancel"), void 0, "no")) : curBox().addButton(Object(Tt.d)("global_close"))
                },
                preloadUrl: function(t) {
                    _(t)
                },
                showNextRepliesChunk: function(t) {
                    var e = gpeByClass("stories_feedback_replies_items", t);
                    Object(Q.hb)(Object(Q.H)("stories_replies_chunk_hidden", e), "stories_replies_chunk_hidden");
                    var r = Object(Q.H)("stories_replies_chunk_hidden", e);
                    r ? Object(Q.yb)(t, langNumeric(Object(Tt.d)("stories_replies_more_button", intval(attr(r, "data-size"))))) : re(t), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
                },
                groupStoriesBlockUpdate: function() {
                    var t = Pt._getList("group_stories"),
                        e = t && t[0] && t[0].items;
                    if (e) {
                        for (var r = 0, o = 0; o < e.length; o++) {
                            e[o].unread && r++
                        }
                        var i = Object(Q.H)("stories_groups_block_stories_wrap"),
                            s = Object(Q.H)("stories_groups_block_stories_button", i);
                        Object(Q.vb)(i, "has_unread", r > 0), Object(Q.vb)(i, "has_stories", e.length > 0), Object(Q.vb)(s, "has_stories", e.length > 0);
                        var n = Object(Ct.d)(cur.storiesPreviews),
                            a = n.splice(n.length - r, 3);
                        a.length < 3 && (a = a.concat(n.slice(0, 3 - a.length))), a.reverse();
                        for (var l = "", c = a.length - 1; c >= 0; c--) l += cur.storiesPreviewsRowHtml.replace("{url}", a[c]);
                        Object(Q.yb)(Object(Q.H)("stories_groups_block_stories_rows", i), l)
                    }
                },
                isLiveShown: function(t) {
                    return !!(cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.isActiveLive()) && cur.storyLayer.activeStory.story.videoRaw === t
                },
                activeLiveEnded: function(t) {
                    cur.storyLayer.activeStory.onLiveEnded(t)
                },
                updateLiveViewersCount: function(t) {
                    var e = t ? Object(Tt.d)("stories_live_N_watching", t, !0) : "";
                    cur.storyLayer.activeStory.updateLiveViewersCount(e)
                }
            };
        window.Stories = Pt;
        try {
            stManager.done("stories.js")
        } catch (t) {}
    },
    QCnb: function(t, e, r) {
        "use strict";
        t.exports = r("+wdc")
    },
    "T/g7": function(t, e, r) {
        "use strict";
        r.d(e, "b", function() {
            return a
        });
        var o = r("nAFc"),
            i = {},
            s = window.getLang,
            n = window.langNumeric;

        function a(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                r = arguments[2],
                a = "number" == typeof e,
                l = t + (e || a ? ".raw" : "");
            if (void 0 === i[l]) {
                var c = e || a ? s(t, "raw") : s(t);
                "string" == typeof c ? i[l] = Object(o.a)(c) : Array.isArray(c) && (i[l] = c.map(o.a))
            }
            return a ? n(e, i[l], r) : i[l] || ""
        }
        e.a = {
            getLang: a
        }
    },
    "Tn+0": function(t, e, r) {
        "use strict";
        r.d(e, "b", function() {
            return o
        }), r.d(e, "c", function() {
            return i
        }), r.d(e, "a", function() {
            return s
        }), r.d(e, "e", function() {
            return n
        }), r.d(e, "d", function() {
            return a
        });
        var o = "sf",
            i = "sf_report",
            s = 1e3;

        function n(t) {
            return gpeByClass(i, t).id.replace("report", "")
        }

        function a(t) {
            var e = gpeByClass(i, t),
                r = geByClass1("decision_result", e);
            return domData(r, "decision_raw_id")
        }
    },
    WbBG: function(t, e, r) {
        "use strict";
        t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    },
    nAFc: function(t, e, r) {
        "use strict";
        r.d(e, "c", function() {
            return n
        }), r.d(e, "a", function() {
            return a
        }), r.d(e, "b", function() {
            return l
        }), r.d(e, "d", function() {
            return c
        });
        var o = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var r = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var n, a = t[Symbol.iterator](); !(o = (n = a.next()).done) && (r.push(n.value), !e || r.length !== e); o = !0);
                        } catch (t) {
                            i = !0, s = t
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return r
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = window.Emoji,
            s = [
                ["&amp;", "&"],
                ["&lt;", "<"],
                ["&gt;", ">"],
                ["&quot;", '"']
            ];

        function n(t) {
            return s.reduce(function(t, e) {
                var r = o(e, 2),
                    i = r[0],
                    s = r[1];
                return t.replace(new RegExp(s, "ig"), i)
            }, t)
        }

        function a(t) {
            return s.reduce(function(t, e) {
                var r = o(e, 2),
                    i = r[0],
                    s = r[1];
                return t.replace(new RegExp(i, "ig"), s)
            }, t).replace(/&#(\d+);/g, function(t, e) {
                return String.fromCodePoint(e)
            })
        }

        function l(t) {
            return n(t).replace(/[\u00A0-\u9999<>\&]/gim, function(t) {
                return "&#" + t.charCodeAt(0) + ";"
            })
        }

        function c(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = e.lineBreak,
                o = void 0 !== r && r,
                s = e.convertEmoji,
                l = void 0 === s || s,
                c = a(t);
            return c = c.replace(/\n\r/gi, "\n"), "oneline" === o ? c = c.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === o && (c = c.replace(/\n/gi, "<br>")), c = n(c), l && (c = i.emojiToHTML(c, !0)), c
        }
    }
});