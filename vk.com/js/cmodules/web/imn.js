! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 56)
}([function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return ge("im_dialogs_search", e)
    }

    function i(e, t, n, r, a, i) {
        var o = trim(i);
        if ((0, E.isSearchingValue)(e, o)) {
            var s = f.bind(null, e, n, a, t);
            o ? (e.setState({
                recentSearch: !1
            }), a.stop()) : a.replaceOrAdd(s), cancelStackPush("im_search", s), o && e.set(C.setCurrentSearch.bind(null, o, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
        } else o || (a.stop(), e.set(C.setCurrentSearch.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
    }

    function o(e, t, n) {
        return function() {
            var r = (0, E.getSearchText)(t);
            r === e && n.apply(void 0, arguments)
        }
    }

    function s(e, t, n) {
        var r = t().appendFastDialogs.bind(null, n),
            a = o(e, n, r);
        return (0, C.searchTopConv)(e, n.get()).then(function(e) {
            var t = e;
            return a(t), e
        })
    }

    function l(e, t, n) {
        var r = (0, E.getSearchText)(n);
        return N(.01, "im_search_stat", 1, "search_start"), (0, C.updateSearchQuery)(r), n.setState({
            recentSearch: !1
        }), r ? (n.get().dialog_search_going = !0, s(r, e, n).then(function(a) {
            var i = a.map(function(e) {
                return e.peerId
            });
            return t(r, e, i, n)
        }).then(function(e) {
            n.get().dialog_search_going = !1
        })["catch"](function() {})) : (e().restoreDialogs(n, !1, !0), Promise.resolve(!1))
    }

    function u(e, t, n, r) {
        var a = r.get(),
            i = o(e, r, t().appendDialogs.bind(null, r)),
            s = o(e, r, t().appendSearch);
        return (0, k.isPendingForward)(r) ? (0, C.searchHints)(e, n, "all", a).then(i) : Promise.all([(0, C.searchHints)(e, n, "all", a).then(i), (0, C.searchMessages)(e, a)]).then(function(e) {
            var t = w(e, 2),
                n = w(t[1], 2),
                a = n[0],
                i = n[1];
            s(r, a, i, !0)
        })
    }

    function c(e, t, n) {
        n().showCreation(e)
    }

    function d(e, t, n, r, o) {
        var s = a(t);
        s.value = o, i(e, r, t, s, n, s.value)
    }

    function f(e, t, n, r) {
        cancelStackFilter("im_search");
        var o = a(t);
        uiSearch.reset(o), e.setState({
            recentSearch: !1
        }), i(e, r, t, o, n, o.value)
    }

    function p(e, t, n, r, a, i) {
        (0, E.isSearching)(e) ? (f(e, t, a, n), setTimeout(function() {
            return g(e, i)
        }, 10)) : (window.tooltips && tooltips.hide(i, {
            showsp: 0
        }), c(e, i, r))
    }

    function m(e, t, n, r, a) {
        return (0, k.showFavvedBox)(e, n, O.mount, r)
    }

    function g(e, t) {
        return showTooltip(t, {
            appendEl: bodyNode,
            text: function() {
                return (0, E.isSearching)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion")
            },
            black: 1,
            shift: [3, -1],
            appendCls: "js-im-page"
        })
    }

    function h(e, t, n) {
        var r = n.target;
        e.set(C.toggleCommunityMute.bind(null, t)).then(function() {
            toggleClass(r, "im-page--gim-mute_muted", e.get().mute), t && v(e, {
                target: r
            })
        })
    }

    function _(e, t, n, r, a) {
        if (!(0, E.isSearching)(e)) {
            var o = cur.imDb.select(A.RECENT_SEARCH_OP);
            if (0 !== o.length || (0, x.doPopularSuggExist)(e)) {
                e.setState({
                    recentSearch: !0
                }), i(e, function() {
                    (0, E.isSearching)(e) || (r.stop(), a().restoreDialogs(e, !1, !0))
                }, t, n, r, "");
                var s = o.filter(function(t) {
                        return !(0, k.isTabLoadedWithMessage)(e.get(), t)
                    }),
                    l = o.filter(function(t) {
                        return (0, k.isTabLoadedWithMessage)(e.get(), t)
                    }).reduce(function(t, n) {
                        return t[n] = (0, E.getTab)(e, n), t
                    }, {});
                e.get().topConvTree.then(function(t) {
                    var n = t.list.filter(function(e) {
                            return inArray(e[0], s)
                        }).reduce(function(e, t) {
                            return e[t[0]] = (0, C.localIndexToDialog)(t), e
                        }, {}),
                        r = extend({}, n, l);
                    return a().appendFastDialogs(e, o.map(function(e) {
                        return r[e]
                    })), (0, C.searchHints)(!1, Object.keys(n), !1, e.get())
                }).then(function(t) {
                    a().appendDialogs(e, t)
                })
            }
        }
    }

    function v(e, t) {
        var n = t.target;
        return showTooltip(n, {
            text: function() {
                return e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
            },
            black: 1,
            shift: [13, 9],
            appendCls: "js-im-page"
        })
    }

    function b(e, t, n, r, i, o) {
        return {
            focusInput: function(t) {
                uiSearch.focus(a(e).parentNode)
            },
            createCanceled: function(e, n) {
                removeClass(t, "im-dialog-select_rotated")
            },
            rotateCross: function(e) {
                addClass(t, "im-dialog-select_rotated")
            },
            setSearch: function(t, n) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    i = a ? o : function() {};
                d(t, e, r, i, n)
            },
            clearSearch: function(t) {
                f(t, e, r, function() {})
            },
            updateImportantCnt: function(t) {
                var n = t.get().important_cnt,
                    r = geByClass1(D, e);
                toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
            },
            unmount: function() {
                r.stop(), (0, I.destroyModule)(i), uiSearch.destroy(n), cancelStackFilter("im_search")
            }
        }
    }

    function y(e, t, n) {
        var r = geByClass1("_im_search_croll", e),
            o = a(e),
            s = (0, T["default"])("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
            c = (0, P.debouncedPromise)(u, 300),
            d = l.bind(null, n, c),
            f = i.bind(null, t, d, e, o, s),
            y = p.bind(null, t, e, d, n, s, r),
            w = m.bind(null, t, e, n),
            C = geByClass1("_im_dialogs_search_input", e);
        uiSearch.init(C, {
            onChange: f
        });
        var E = g.bind(null, t, r),
            S = geByClass1(R, e);
        o.value && f(o.value);
        var M = (0, I.createModule)({
            handlers: function(a, i) {
                if (a(geByClass1("_im_av_time", e), "mouseover", function(e) {
                        showTooltip(e.target, {
                            text: getLang("mail_admin_av_time"),
                            dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                            shift: [0, 8]
                        })
                    }), a(r, "click", y), a(r, "mouseover", E), a(geByClass1(D, e), "click", w), (0, k.isClassicInterface)(t)) {
                    var l = h.bind(null, t, !0),
                        u = v.bind(null, t);
                    a(S, "click", l), a(S, "mouseover", u)
                }
                a(o, "focus", function() {
                    t.get().longpoll.push([(0, L.transitionEvent)("search")])
                }), a(o, "click", function() {
                    _(t, e, o, s, n)
                }), a(o, "blur", function() {
                    var e = void 0;
                    e = 0 === t.get().peer ? "search" : (0, k.isPendingForward)(t) ? "search" : "default", t.get().longpoll.push([(0, L.transitionEvent)(e)])
                })
            }
        });
        return (0, k.isClassicInterface)(t) && h(t, !1, {
            target: S
        }), b(e, r, C, s, M, d)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var w = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.mount = y;
    var C = n(28),
        E = n(190),
        k = n(88),
        S = n(189),
        T = r(S),
        I = n(198),
        M = n(96),
        P = n(130),
        L = n(199),
        O = n(84),
        A = n(150),
        x = n(190),
        N = debounce(M.statlogsProbValueEvent, 1e3),
        D = "_im_important_counter",
        R = "_im_gim_mute"
}, function(e, t, n) {
    var r = n(53),
        a = Math.min;
    e.exports = function(e) {
        return e > 0 ? a(r(e), 9007199254740991) : 0
    }
}, , function(e, t, n) {
    "use strict";
    var r = n(128).f,
        a = n(176),
        i = (n(186), n(48)),
        o = n(172),
        s = n(169),
        l = n(19),
        u = n(87),
        c = n(102),
        d = n(122),
        f = n(155),
        p = n(131),
        m = n(32).fastKey,
        g = p ? "_s" : "size",
        h = function(e, t) {
            var n, r = m(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        };
    e.exports = {
        getConstructor: function(e, t, n, c) {
            var d = e(function(e, r) {
                s(e, d, t, "_i"), e._i = a(null), e._f = void 0, e._l = void 0, e[g] = 0, void 0 != r && u(r, n, e[c], e)
            });
            return i(d.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete t[n.i];
                    e._f = e._l = void 0, e[g] = 0
                },
                "delete": function(e) {
                    var t = this,
                        n = h(t, e);
                    if (n) {
                        var r = n.n,
                            a = n.p;
                        delete t._i[n.i], n.r = !0, a && (a.n = r), r && (r.p = a), t._f == n && (t._f = r), t._l == n && (t._l = a), t[g]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    s(this, d, "forEach");
                    for (var t, n = o(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (n(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!h(this, e)
                }
            }), p && r(d.prototype, "size", {
                get: function() {
                    return l(this[g])
                }
            }), d
        },
        def: function(e, t, n) {
            var r, a, i = h(e, t);
            return i ? i.v = n : (e._l = i = {
                i: a = m(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = i), r && (r.n = i), e[g]++, "F" !== a && (e._i[a] = i)), e
        },
        getEntry: h,
        setStrong: function(e, t, n) {
            c(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? d(0, n.k) : "values" == t ? d(0, n.v) : d(0, [n.k, n.v]) : (e._t = void 0, d(1))
            }, n ? "entries" : "values", !n, !0), f(t)
        }
    }
}, function(e, t, n) {
    var r = n(70),
        a = n(81);
    e.exports = Object.keys || function(e) {
        return r(e, a)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = ge("page_header"),
            n = window.clientHeight() - t.offsetHeight - b - 2,
            r = y;
        p(e, {
            height: Math.max(n, r)
        })
    }

    function a() {
        var e = localStorage.getItem("im_sick_timer"),
            t = e ? Math.min(2 * parseInt(e), v) : _;
        return localStorage.setItem("im_sick_timer", t), t
    }

    function i(e) {
        var t = (0, c.formatTimespan)(Math.floor(Math.max(e, 0) / 1e3), !0);
        return t ? m("mail_sick_timer").replace(/{timer}/gi, t) : ""
    }

    function o() {
        f.reload({
            force: !0
        })
    }

    function s(e) {
        return {
            unmount: function() {
                clearInterval(C), clearTimeout(w), (0, u.destroyModule)(e)
            }
        }
    }

    function l(e, t, n) {
        r(e);
        var l = (0, u.createMutations)(s),
            c = l.bindMutations,
            d = (0, u.createModule)({
                handlers: function(t, n) {
                    t(e.querySelector(g), "click", o), t(window, "resize", r.bind(null, e))
                }
            }),
            f = c(d),
            p = a(),
            m = e.querySelector(h),
            _ = +new Date;
        return m.innerHTML = i(p), C = setInterval(function() {
            m.innerHTML = i(_ + p - new Date)
        }, 500), w = setTimeout(o, p), f
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = l;
    var u = n(198),
        c = n(88),
        d = window,
        f = d.nav,
        p = d.setStyle,
        m = d.getLang,
        g = "._im_sick_reload",
        h = "._im_sick_timer",
        _ = 5e3,
        v = 6e5,
        b = 30,
        y = 400,
        w = void 0,
        C = void 0
}, function(e, t, n) {
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
    var i = n(198)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = geByClass("post");
        LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(function(e) {
            return LongView.register(e, "im")
        })
    }

    function a(e) {
        LongView.onScroll(e, window.innerHeight)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = {
        onNewMessagesChunk: r,
        onHistoryScroll: a
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return e.queue || e.key
    }

    function i(e) {
        return window.curNotifier ? !curNotifier.addQueues[a(e)] : !1
    }

    function o(e) {
        return window.curNotifier ? void!curNotifier.addQueues[a(e)] : !1
    }

    function s() {
        h.forEach(function(e, t) {
            var n = e.onData,
                r = e.onUpdateKey,
                a = e.ts;
            i(t) && Notifier.addKey(extend(t, {
                ts: a
            }), d.bind(null, n, r, t))
        })
    }

    function l() {
        _ || (_ = setInterval(s, 3e3))
    }

    function u(e) {
        o(e), h["delete"](e), 0 === h.size && (clearInterval(_), _ = !1)
    }

    function c(e, t, n, r) {
        var a = void 0;
        switch (e) {
            case 1:
            case 2:
            case 3:
            case 5:
                a = r(t, e);
                break;
            case 4:
                a = (0, g.pause)(1).then(function() {
                    return t
                });
                break;
            default:
                throw new Error("Unkonwn error from queue: " + e)
        }(0, g.pause)(3).then(function() {
            return a
        }).then(function(e) {
            h.set(e, {
                onUpdateKey: r,
                onData: n,
                ts: e.ts
            }), s(), l()
        })
    }

    function d(e, t, n, r, a) {
        return a.failed ? (u(n), void c(a.err, n, e, t)) : (h.set(n, {
            onData: e,
            onUpdateKey: t,
            ts: intval(a.ts)
        }), void a.events.map(function(e) {
            return e.split("<!>")
        }).forEach(e))
    }

    function f(e, t, n) {
        return Notifier.addKey(e, d.bind(null, t, n, e)), h.set(e, {
            onData: t,
            onUpdateKey: n,
            ts: e.ts
        }), l(), {
            stop: u.bind(null, e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createWorker = f;
    var p = n(134),
        m = r(p),
        g = n(130),
        h = new m["default"],
        _ = !1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }

    function a() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; 10 > n; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var a = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                a[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, a)).join("") ? !1 : !0
        } catch (i) {
            return !1
        }
    }
    var i = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable;
    e.exports = a() ? Object.assign : function(e, t) {
        for (var n, a, l = r(e), u = 1; u < arguments.length; u++) {
            n = Object(arguments[u]);
            for (var c in n) o.call(n, c) && (l[c] = n[c]);
            if (i) {
                a = i(n);
                for (var d = 0; d < a.length; d++) s.call(n, a[d]) && (l[a[d]] = n[a[d]])
            }
        }
        return l
    }
}, function(e, t, n) {
    "use strict";
    var r = n(47),
        a = n(22),
        i = n(126);
    e.exports = function() {
        function e(e, t, n, r, o, s) {
            s !== i && a(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
        }

        function t() {
            return e
        }
        e.isRequired = e;
        var n = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t
        };
        return n.checkPropTypes = r, n.PropTypes = n, n
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
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
                } catch (l) {
                    a = !0, i = l
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
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(196)),
        f = r(d),
        p = n(101),
        m = r(p),
        g = n(92),
        h = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.checkLoad = (0, f["default"])(function(e) {
                    var t = s(e, 3),
                        n = t[0],
                        a = t[1],
                        i = t[2];
                    if (!r.loading) return r.props.virtualized || r.props.hasMore ? void(a - n - i <= r.props.threshold && (r.loading = !0, r.props.loadMore().then(function() {
                        r.loading = !1
                    }))) : r.detachListeners()
                }, 34), r.onScroll = function(e) {
                    var t = r.getScrollData();
                    r.props.virtualized && r.processChildren(r.props.children, t), r.props.hasMore && r.checkLoad(t)
                }, r.getRef = function(e) {
                    r.container = e, r.props.virtualized && r.setState(r.getChildrenData(r.props.children, r.getScrollData()))
                }, r.useWindowScroll = n.useWindowScroll, n.virtualized && (r.state = {
                    before: 0,
                    after: n.children.length,
                    start: 0,
                    end: 0
                }), r
            }
            return o(t, e), t.prototype.getScrollData = function() {
                var e = this.useWindowScroll ? document.body : this.container;
                return [this.getScrollTop(), e ? e.scrollHeight : 0, e ? e.clientHeight : 0]
            }, t.prototype.getScrollTop = function() {
                var e = document.documentElement || document.body.parentNode || document.body;
                return this.useWindowScroll ? void 0 !== window.pageYOffset ? window.pageYOffset : e.scrollTop : this.container ? this.container.scrollTop : 0
            }, t.prototype.attachListeners = function() {
                var e = this.useWindowScroll ? window : this.container;
                this.container && (e.addEventListener("scroll", this.onScroll, this.props.useCapture), e.addEventListener("resize", this.onScroll, this.props.useCapture))
            }, t.prototype.detachListeners = function() {
                var e = this.useWindowScroll ? window : this.container;
                this.container && (e.removeEventListener("scroll", this.onScroll, this.props.useCapture), e.removeEventListener("resize", this.onScroll, this.props.useCapture))
            }, t.prototype.processChildren = function(e, t) {
                var n = this.state,
                    r = this.getChildrenData(e, t || this.getScrollData()),
                    a = r.start,
                    i = r.end,
                    o = r.before,
                    s = r.after;
                (a !== n.start || i !== n.end || o !== n.before || s !== n.after) && this.setState(r)
            }, t.prototype.getChildrenData = function(e, t) {
                var n = s(t, 3),
                    r = n[0],
                    a = n[1],
                    i = n[2],
                    o = this.useWindowScroll ? window : this.container,
                    l = o && o.offsetHeight;
                if (!o || 0 === a || 0 === i) return {
                    start: 0,
                    end: 0,
                    before: 0,
                    after: e.length
                };
                i = Math.max(i, l);
                var u = e.length,
                    c = Math.max(Math.floor(r / this.props.itemHeight) - 1, 0),
                    d = Math.min(Math.floor((r + 2 * i) / this.props.itemHeight + 1), u),
                    f = {
                        start: c,
                        end: d,
                        before: c,
                        after: u - d
                    };
                return f
            }, t.prototype.componentWillReceiveProps = function(e) {
                this.props.virtualized && this.processChildren(e.children)
            }, t.prototype.componentDidMount = function() {
                this.attachListeners()
            }, t.prototype.componentWillUnmount = function() {
                this.detachListeners()
            }, t.prototype.render = function() {
                return u["default"].createElement("div", {
                    className: (0, g.classNames)("InfiniteScroll", this.props.className),
                    ref: this.getRef,
                    style: this.props.style
                }, this.props.virtualized && this.state.before > 0 && u["default"].createElement("div", {
                    style: {
                        height: this.state.before * this.props.itemHeight
                    },
                    key: "before"
                }), this.props.virtualized ? [].concat(this.props.children).slice(this.state.start, this.state.end) : this.props.children, this.props.virtualized && this.state.after > 0 && u["default"].createElement("div", {
                    style: {
                        height: this.state.after * this.props.itemHeight
                    },
                    key: "after"
                }), this.props.hasMore && (this.props.loader || u["default"].createElement("div", {
                    className: "InfiniteScroll__loader",
                    key: "loader"
                }, u["default"].createElement(m["default"], null))))
            }, t
        }(l.Component);
    t["default"] = h, h.defaultProps = {
        useWindowScroll: !1,
        virtualized: !1,
        hasMore: !0,
        useCapture: !1,
        threshold: 100,
        itemHeight: 55
    }
}, function(e, t, n) {
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
        f && f.apply(this, arguments)
    }

    function a(e) {
        e.preventDefault()
    }

    function i() {
        return !!window.imwl
    }

    function o(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
        i() && (n && window.console && (console.error(e, t), console.trace && console.trace()), (0, d.retryFn)(c.post, 3, function() {
            return 2
        })("al_im.php", {
            act: "a_weird_log",
            kind: e,
            data: JSON.stringify(extend({
                errIdx: p++,
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

    function l() {
        f = window.onerror, window.onerror = r, window.addEventListener("unhandledrejection", a)
    }

    function u() {
        window.onerror = f, f = void 0, window.removeEventListener("unhandledrejection", a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isWeirdLogging = i, t.imWeirdLog = o, t.imWeirdCatch = s, t.startLoggingAllUnhandled = l, t.stopLoggingAllUnhandled = u;
    var c = n(181),
        d = n(130),
        f = void 0,
        p = 1
}, , function(e, t, n) {
    var r = n(170),
        a = n(61)("toStringTag"),
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
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
    }

    function a(e, t) {
        return t = r(t) || document, t.getElementsByTagName(e)
    }

    function i(e, t) {
        return t = r(t) || document, t.querySelector && t.querySelector(e) || a(e, t)[0]
    }

    function o(e, t, n) {
        t = r(t) || document, n = n || "*";
        var i = [];
        if (t.querySelectorAll && "*" != n) return t.querySelectorAll(n + "." + e);
        if (t.getElementsByClassName) {
            var o = t.getElementsByClassName(e);
            if ("*" != n) {
                n = n.toUpperCase();
                for (var s = 0, l = o.length; l > s; ++s) o[s].tagName.toUpperCase() == n && i.push(o[s])
            } else i = Array.prototype.slice.call(o);
            return i
        }
        for (var u = a(n, t), c = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, l = u.length; l > s; ++s) c.test(u[s].className) && i.push(u[s]);
        return i
    }

    function s(e, t, n) {
        return t = r(t) || document, n = n || "*", t.querySelector && t.querySelector(n + "." + e) || o(e, t, n)[0]
    }

    function l(e, t, n) {
        if (t = r(t), !t) return null;
        for (; n !== t && (t = t.parentNode);)
            if (ee(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function c(e, t) {
        return (t || document).querySelector(e)
    }

    function d(e, t) {
        return ee(t, e) ? t : l(e, t)
    }

    function f(e, t) {
        return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : p(e, t)
    }

    function p(e, t) {
        if (t = r(t), !t) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() == e) return t;
        return null
    }

    function m(e, t, n) {
        var r = document.createElement(e);
        return t && extend(r, t), n && ue(r, n), r
    }

    function g(e) {
        return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function h(e) {
        return k(m("div", {
            innerHTML: e
        }))
    }

    function _(e) {
        return I(m("div", {
            innerHTML: e
        }))
    }

    function v(e, t) {
        return each(t, function(t, n) {
            e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof n ? "" : n).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function b(e) {
        return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
    }

    function y(e, t) {
        return isString(t) && (t = h(t)), T(e).replaceChild(t, e), t
    }

    function w(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function C(e) {
        return w((e || {}).nextSibling)
    }

    function E(e) {
        return w((e || {}).previousSibling, 1)
    }

    function k(e) {
        return w((e || {}).firstChild)
    }

    function S(e) {
        return w((e || {}).lastChild, 1)
    }

    function T(e) {
        return (e || {}).parentNode
    }

    function I(e) {
        for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
        return t
    }

    function M(e, t) {
        var n = T(t);
        return n && n.insertBefore(e, t)
    }

    function P(e, t) {
        var n = T(t);
        return n && n.insertBefore(e, C(t))
    }

    function L(e, t) {
        return e ? s(t, e) : e
    }

    function O(e, t, n) {
        return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
    }

    function A(e) {
        for (var t = 0; null != (e = E(e));) t++;
        return t
    }

    function x(e, t) {
        do e = T(e); while (e && !D(e, t));
        return e
    }

    function N(e, t, n) {
        for (var r = null; null === r && e;) e = -1 === n ? E(e) : C(e), e && D(e, t) && (r = e);
        return r
    }

    function D(e, t) {
        if (e = r(e), !e || e == document) return !1;
        var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t[n] !== this;);
            return n > -1
        };
        return n.call(e, t)
    }

    function R(e) {
        return D(e, ":hover")
    }

    function j(e, t) {
        var n = r(e);
        if (t = r(t), !e || !t) return !1;
        for (; n = n.parentNode;)
            if (n == t) return !0;
        return !1
    }

    function B() {
        var e = browser.msie6 ? r("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function F(e, t) {
        t = t || {};
        for (var n = t.fromEl || T(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
            var a = le(n, "position");
            if (inArray(a, r) && (!t.noOverflow || "hidden" != le(n, "overflow"))) break;
            n = T(n)
        }
        return n
    }

    function H(e, t) {
        e = r(e);
        for (var n, a, i, o, s = e; s && s.tagName && s !== bodyNode && (n = le(s, "position"), a = le(s, "overflow"), i = le(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === a || ("static" === n ? o && "relative" !== o : "fixed" === o));) "none" !== i ? o = void 0 : "static" !== n && "fixed" !== o && (o = n), s = T(s);
        return s
    }

    function U(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) U(arguments[n]);
        else if (e = r(e), e && e.style) {
            var a = e.olddisplay,
                i = "block",
                o = e.tagName.toLowerCase();
            e.style.display = a || "", "none" === le(e, "display") && (i = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = i)
        }
    }

    function z(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) z(arguments[n]);
        else if (e = r(e), e && e.style) {
            var a = le(e, "display");
            e.olddisplay = "none" != a ? a : "", e.style.display = "none"
        }
    }

    function G(e) {
        return e = r(e), e && e.style ? "none" != le(e, "display") : !1
    }

    function V() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function q(e, t, n) {
        e = r(e), n = n || 0;
        var a = Q(e)[1],
            i = X(e)[1],
            o = window,
            s = document.documentElement,
            l = Math.max(intval(o.innerHeight), intval(s.clientHeight)),
            u = r("page_header_cont"),
            c = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            d = vk.staticheader ? Math.max(0, X(u)[1] - c) : X(u)[1];
        if (t) {
            if (c + d + n > a + i) return a + i - c - d - n;
            if (a > c + l - n) return a - c - l + n
        } else {
            if (c + d + n > a) return a - c - d - n;
            if (a + i > c + l - n) return a + i - c - l + n
        }
        return 0
    }

    function W(e, t) {
        return void 0 === t && (t = !G(e)), t ? U(e) : z(e), t
    }

    function K(e) {
        return "undefined" != typeof e.getBoundingClientRect
    }

    function Y(e, t) {
        var n;
        if (t && "inline" == le(e, "display")) {
            var r = e.getClientRects();
            n = r && r[0] || e.getBoundingClientRect()
        } else n = e.getBoundingClientRect();
        return n
    }

    function Q(e, t) {
        if (e = r(e), !e) return [0, 0];
        var n, a, i = {
                top: 0,
                left: 0
            },
            o = e.ownerDocument;
        return o ? (n = o.documentElement, K(e) && (i = Y(e, !0)), a = o == o.window ? o : 9 === o.nodeType ? o.defaultView || o.parentWindow : !1, [i.left + (t ? 0 : a.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), i.top + (t ? 0 : a.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
    }

    function $(e) {
        return null != e && e === e.window
    }

    function X(e, t, n) {
        e = r(e);
        var a, i = [0, 0],
            o = document.documentElement;
        if (t && "border-box" === le(e, "boxSizing") && (t = !1), e == document) i = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
        else if (e) {
            var s = function() {
                if (i = K(e) && (a = Y(e, n)) && void 0 !== a.width ? [a.width, a.height] : [e.offsetWidth, e.offsetHeight], t) {
                    each(i, function(t, n) {
                        var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(r, function() {
                            i[t] -= parseFloat(le(e, "padding" + this)) || 0, i[t] -= parseFloat(le(e, "border" + this + "Width")) || 0
                        })
                    })
                }
            };
            if (G(e)) s();
            else {
                var l = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    u = {},
                    c = !1;
                e.style.cssText.indexOf("!important") > -1 && (c = e.style.cssText), each(l, function(t, n) {
                    u[t] = e.style[t], e.style[t] = n
                }), s(), each(l, function(t, n) {
                    e.style[t] = u[t]
                }), c && (e.style.cssText = c)
            }
        }
        return i
    }

    function Z(e) {
        return X(e)[0]
    }

    function J(e) {
        return X(e)[1]
    }

    function ee(e, t) {
        return e = r(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
    }

    function te(e, t) {
        (e = r(e)) && !ee(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
    }

    function ne(e, t) {
        return setTimeout(te.pbind(e, t), 0)
    }

    function re(e, t) {
        (e = r(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }

    function ae(e, t) {
        return setTimeout(re.pbind(e, t), 0)
    }

    function ie(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? te : re)(e, t), n
    }

    function oe(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? ne : ae)(e, t), n
    }

    function se(e, t, n) {
        re(e, t), te(e, n)
    }

    function le(e, t, n) {
        if (e = r(e), isArray(t)) {
            var a = {};
            return each(t, function(t, n) {
                a[n] = le(e, n)
            }), a
        }
        if (!e) return "";
        if (void 0 === n && (n = !0), !n && "opacity" == t && browser.msie) {
            var i = e.style.filter;
            return i ? i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!n && e.style && (e.style[t] || "height" == t)) return e.style[t];
        var o, s = document.defaultView || window;
        if (s.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = s.getComputedStyle(e, null);
            l && (o = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" == t && browser.msie) {
                var i = e.currentStyle.filter;
                return i && i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            o = e.currentStyle[t] || e.currentStyle[u], "auto" == o && (o = 0), o = (o + "").split(" "), each(o, function(t, n) {
                if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                    var r = e.style,
                        a = r.left,
                        i = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, o[t] = r.pixelLeft + "px", r.left = a, e.runtimeStyle.left = i
                }
            }), o = o.join(" ")
        }
        if (n && ("width" == t || "height" == t)) {
            var c = X(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            o = (intval(o) ? Math.max(floatval(o), c) : c) + "px"
        }
        return o
    }

    function ue(e, t, n) {
        if (e = r(e)) {
            if ("object" == ("undefined" == typeof t ? "undefined" : ke(t))) return each(t, function(t, n) {
                ue(e, t, n)
            });
            if ("opacity" == t) browser.msie && ((n + "").length ? 1 !== n ? e.style.filter = "alpha(opacity=" + 100 * n + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var a = "number" == typeof n;
                a && /height|width/i.test(t) && (n = Math.abs(n)), n = a && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (i) {
                debugLog("setStyle error: ", [t, n], i)
            }
        }
    }

    function ce(e, t, n) {
        setTimeout(ue.pbind(e, t, n), 0)
    }

    function de(e, t, n) {
        var a = fe(e, "pseudo-id");
        a || (fe(e, "pseudo-id", a = irand(1e8, 999999999)), te(e, "_pseudo_" + a));
        var i = t + "-style-" + a,
            o = r(i),
            s = "._pseudo_" + a + ":" + t + "{";
        o || (o = headNode.appendChild(m("style", {
            id: i,
            type: "text/css"
        }))), each(n, function(e, t) {
            s += e + ": " + t + " !important;"
        }), s += "}", o.sheet ? (o.sheet.cssRules.length && o.sheet.deleteRule(0), o.sheet.insertRule(s, 0)) : o.styleSheet && (o.styleSheet.cssText = s)
    }

    function fe(e, t, n) {
        if (!e) return !1;
        var r, a = e[vkExpand];
        return a || (a = e[vkExpand] = ++vkUUID), n !== r && (vkCache[a] || (vkCache[a] = {}, __debugMode && (vkCache[a].__elem = e)), vkCache[a][t] = n), t ? vkCache[a] && vkCache[a][t] : a
    }

    function pe(e, t, n) {
        return e = r(e), "undefined" == typeof n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
    }

    function me(e) {
        for (var t = 0, n = arguments.length; n > t; ++t) {
            var r = arguments[t];
            if (void 0 !== e[r]) try {
                delete e[r]
            } catch (a) {
                try {
                    e.removeAttribute(r)
                } catch (a) {}
            }
        }
    }

    function ge(e, t) {
        var n = e ? e[vkExpand] : !1;
        if (n)
            if (t) {
                if (vkCache[n]) {
                    delete vkCache[n][t], t = "";
                    var r = 0;
                    for (t in vkCache[n])
                        if ("__elem" !== t) {
                            r++;
                            break
                        }
                    r || ge(e)
                }
            } else removeEvent(e), me(e, vkExpand), delete vkCache[n]
    }

    function he() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var n = r(e[t]);
            n && (ge(n), me(n, "btnevents"))
        }
    }

    function _e(e, t, n) {
        if (e = r(e), e && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
            else {
                var a = i("b", e);
                a && a.scrollWidth > a.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function ve() {
        var e = r("zoom_test_1") || document.body.appendChild(m("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = r("zoom_test_2") || document.body.appendChild(m("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }));
        return t.offsetLeft / e.offsetLeft
    }

    function be(e, t, n) {
        return (e = r(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
    }

    function ye(e, t, n) {
        e = r(e);
        try {
            if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === n || n === !1) && (n = t), e.createTextRange) {
                var a = e.createTextRange();
                a.collapse(!0), a.moveEnd("character", n), a.moveStart("character", t), a.select()
            } else e.setSelectionRange && e.setSelectionRange(t, n)
        } catch (i) {}
    }

    function we(e, t, n) {
        for (e = r(e), n = n || 999; e && !t(e);) {
            if (n--, 0 == n) return !1;
            try {
                if (e = T(e), e == document) break
            } catch (a) {
                e = !1
            }
        }
        return e
    }

    function Ce(e) {
        return Te ? void 0 : window.document.title = replaceEntities(e)
    }

    function Ee(e) {
        Te = e, e && window.cur && window.cur.destroy.push(function() {
            Ee(!1)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var ke = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.ge = r, t.geByTag = a, t.geByTag1 = i, t.geByClass = o, t.geByClass1 = s, t.gpeByClass = l, t.domQuery = u, t.domQuery1 = c, t.domClosest = d, t.domClosestByTag = f, t.gpeByTag = p, t.ce = m, t.re = g, t.se = h, t.sech = _, t.rs = v, t.psr = b, t.domReplaceEl = y, t.domEL = w, t.domNS = C, t.domPS = E, t.domFC = k, t.domLC = S, t.domPN = T, t.domChildren = I, t.domInsertBefore = M, t.domInsertAfter = P, t.domByClass = L, t.domData = O, t.domChildIndex = A, t.domCA = x, t.domClosestSibling = N, t.matchesSelector = D, t.isHover = R, t.isAncestor = j, t.getScroll = B, t.domClosestPositioned = F, t.domClosestOverflowHidden = H, t.show = U, t.hide = z, t.isVisible = G, t.clientHeight = V, t.getClientRectOffsetY = q, t.toggle = W, t.boundingRectEnabled = K, t.getXYRect = Y, t.getXY = Q, t.isWindow = $, t.getSize = X, t.getW = Z, t.getH = J, t.hasClass = ee, t.addClass = te, t.addClassDelayed = ne, t.removeClass = re, t.removeClassDelayed = ae, t.toggleClass = ie, t.toggleClassDelayed = oe, t.replaceClass = se, t.getStyle = le, t.setStyle = ue,
        t.setStyleDelayed = ce, t.setPseudoStyle = de, t.data = fe, t.attr = pe, t.removeAttr = me, t.removeData = ge, t.cleanElems = he, t.setTitle = _e, t.getZoom = ve, t.val = be, t.elfocus = ye, t.traverseParent = we, t.setDocumentTitle = Ce, t.lockDocumentTitle = Ee;
    var Se = n(179);
    window.cf = function(e) {
        var t = e.createDocumentFragment(),
            n = e.createElement("div"),
            r = e.createRange && e.createRange();
        return t.appendChild(n), r && r.selectNodeContents(n), r && r.createContextualFragment ? function(t) {
            return t ? r.createContextualFragment(t) : e.createDocumentFragment()
        } : function(t) {
            if (!t) return e.createDocumentFragment();
            n.innerHTML = t;
            for (var r = e.createDocumentFragment(); n.firstChild;) r.appendChild(n.firstChild);
            return r
        }
    }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var n in t)
                if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
        }
        return "transform"
    }(), window.vkExpand = window.vkExpand || "VK" + (0, Se.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var Te = !1;
    window.ge = r, window.geByTag = a, window.geByTag1 = i, window.geByClass = o, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = u, window.domQuery1 = c, window.domClosest = d, window.ce = m, window.re = g, window.se = h, window.sech = _, window.rs = v, window.psr = b, window.domReplaceEl = y, window.domEL = w, window.domNS = C, window.domPS = E, window.domFC = k, window.domLC = S, window.domPN = T, window.domChildren = I, window.domInsertBefore = M, window.domInsertAfter = P, window.domByClass = L, window.domData = O, window.domChildIndex = A, window.domCA = x, window.domClosestSibling = N, window.matchesSelector = D, window.isHover = R, window.isAncestor = j, window.getScroll = B, window.domClosestPositioned = F, window.domClosestOverflowHidden = H, window.show = U, window.hide = z, window.isVisible = G, window.clientHeight = V, window.getClientRectOffsetY = q, window.toggle = W, window.boundingRectEnabled = K, window.getXYRect = Y, window.getXY = Q, window.isWindow = $, window.getSize = X, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = ae, window.toggleClass = ie, window.toggleClassDelayed = oe, window.replaceClass = se, window.getStyle = le, window.setStyle = ue, window.setStyleDelayed = ce, window.setPseudoStyle = de, window.data = fe, window.attr = pe, window.removeAttr = me, window.removeData = ge, window.cleanElems = he, window.setTitle = _e, window.getZoom = ve, window.val = be, window.elfocus = ye, window.traverseParent = we, window.getH = J, window.getW = Z, window.domClosestByTag = f, window.setDocumentTitle = Ce, window.lockDocumentTitle = Ee
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(92),
        c = n(27),
        d = r(c),
        f = n(119),
        p = r(f),
        m = n(115),
        g = n(28),
        h = n(12),
        _ = window,
        v = _.unclean,
        b = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onSaveTitle = function(e) {
                    var t = r.props.store,
                        n = t.get(),
                        a = e.value.trim().replace("\n", "");
                    a && a !== v(r.props.title) && (r.setState({
                        titleChanged: !1
                    }), t.set(g.updateChatTopic.bind(null, n.peer, a)))
                }, r.onChangeTitle = function(e) {
                    if (r.state.title !== e.target.value) {
                        var t = e.target.value.replace("\n", "");
                        r.setState({
                            title: t,
                            titleChanged: v(r.props.title) !== t
                        })
                    }
                }, r.onValidateTitle = function(e) {
                    return !!e.trim().replace("\n", "")
                }, r.onCancelTitle = function() {
                    r.setState({
                        title: v(r.props.title),
                        titleChanged: !1
                    })
                }, r.onSaveDescription = function(e) {}, r.onPhotoUpload = function() {
                    var e = r.props.store,
                        t = e.get().peer;
                    (0, m.canChangeTitle)(e) && (cur.recieveCropResult = void 0, Page.ownerPhoto(t))
                }, r.onPhotoRemove = function() {
                    var e = r.props.store,
                        t = e.get().peer;
                    (0, m.canChangeTitle)(e) && e.set(g.removeChatPhoto.bind(null, t)).then(function() {
                        return e.set(g.getChatDetails.bind(null, t))
                    })["catch"](function(e) {
                        return (0, h.imWeirdCatch)("onPhotoRemove", e)
                    })
                }, r.state = {
                    title: v(n.title),
                    titleChanged: !1
                }, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.getLang,
                    n = e.store,
                    r = e.photo,
                    a = e.title,
                    i = e.description,
                    o = e.grid,
                    s = e.meta,
                    c = v(a),
                    f = (0, m.canChangeTitle)(n),
                    g = (0, u.classNames)("ChatSettingsInfo", {
                        "ChatSettingsInfo--editable": f
                    });
                return l["default"].createElement("div", {
                    className: g
                }, l["default"].createElement("header", {
                    className: "ChatSettingsInfo__header"
                }, l["default"].createElement("div", {
                    className: "ChatSettingsInfo__photo"
                }, l["default"].createElement("div", {
                    className: "ChatSettingsInfo__attach nim-peer nim-peer_larger",
                    "data-tip": t("mail_settings_photo"),
                    onClick: this.onPhotoUpload
                }, r ? l["default"].createElement("img", {
                    src: r,
                    width: "80",
                    height: "80",
                    alt: c,
                    className: "ChatSettingsInfo__photoSelf"
                }) : l["default"].createElement("div", {
                    className: "nim-peer--photo-w"
                }, l["default"].createElement("div", {
                    className: "ChatSettingsInfo__photoGrid nim-peer--photo",
                    dangerouslySetInnerHTML: {
                        __html: o
                    }
                }))), r && f && l["default"].createElement(d["default"], {
                    text: t("mail_settings_remove_photo"),
                    position: "t",
                    align: "left"
                }, l["default"].createElement("button", {
                    onClick: this.onPhotoRemove,
                    className: "ChatSettingsInfo__photoRemove"
                }))), l["default"].createElement("h3", {
                    className: "ChatSettingsInfo__title"
                }, f ? l["default"].createElement(p["default"], {
                    value: this.state.title,
                    changed: this.state.titleChanged,
                    useEnter: !0,
                    onSave: this.onSaveTitle,
                    onChange: this.onChangeTitle,
                    onCancel: this.onCancelTitle,
                    validate: this.onValidateTitle
                }) : c), l["default"].createElement("div", {
                    className: "ChatSettingsInfo__meta"
                }, s)), i && l["default"].createElement("div", {
                    className: "ChatSettingsInfo__description"
                }, f ? l["default"].createElement(p["default"], {
                    value: i,
                    onSave: this.onSaveDescription
                }) : i))
            }, t
        }(s.PureComponent);
    t["default"] = b
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, n) {
    e.exports = n(10)()
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i, o, s, l) {
        if (a(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [n, r, i, o, s, l],
                    d = 0;
                u = new Error(t.replace(/%s/g, function() {
                    return c[d++]
                })), u.name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
    var a = function(e) {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = [],
            r = 0;
        return function(a) {
            n.push(a), r || (r = setTimeout(function() {
                r = !1, e(n), n = []
            }, t))
        }
    }

    function a(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function i(e, t) {
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

    function o(e) {
        var t = [];
        if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function s(e) {
        for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
        return n
    }

    function l(e) {
        for (var t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = window.atob(n), a = new Uint8Array(r.length), i = 0; i < r.length; ++i) a[i] = r.charCodeAt(i);
        return a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.throttleAccumulate = r, t.executionStackPop = a, t.lplog = i, t.toArray = o, t.arrayUnique = s, t.urlBase64ToUint8Array = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return e.which || e.keyCode
    }

    function i(e, t) {
        var n = e.get().tabbedPeers[t];
        n && e.get().longpoll.push([(0, p.changePeer)(n.peer, !1, !0, !0)])
    }

    function o(e, t, n) {
        !n || inArray(a(n), c.UNPRINTABLE_KEYS) || (0, d.isSearchingInplace)(e.get().peer, e.get()) || (0, f.isEditableFocused)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
    }

    function s(e, t, n) {
        a(n) === c.ENTER && e.signal(a(n), n)
    }

    function l(e, t, n, r) {
        var o = a(r);
        if (!layers.visible) {
            if (o >= 49 && 57 >= o && (r.ctrlKey || r.metaKey && browser.mac) && (0, f.isClassicInterface)(t)) return i(t, o - 49), cancelEvent(r);
            inArray(o, c.UP_DOWN_CONTROLS) && e.signal(o, r)
        }
    }

    function u(e, t) {
        var n = browser.mozilla ? "keydown" : "keypress",
            r = (0, g["default"])({
                signalTimer: !1
            }),
            a = o.bind(null, e, t),
            i = l.bind(null, t, e, r),
            u = s.bind(null, t, r),
            c = (0, h.createModule)({
                handlers: function(e, t) {
                    e(document, "keydown", i), e(document, "keyup", u), e(document, n, a)
                }
            });
        return {
            unmount: function() {
                (0, h.destroyModule)(c)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = u;
    var c = n(94),
        d = n(28),
        f = n(88),
        p = n(199),
        m = n(112),
        g = r(m),
        h = n(198)
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = (0, d["default"])(e, ["icon", "aside", "chevron", "selectable", "border"]),
            n = {
                "ListItem--chevron": !!e.chevron,
                "ListItem--selectable": !!e.selectable,
                "ListItem--border": !!e.border
            };
        return s["default"].createElement("li", i({}, t, {
            className: (0, l.classNames)("ListItem", n, e.className)
        }), e.icon && s["default"].createElement("div", {
            className: "ListItem__icon"
        }, e.icon), s["default"].createElement("div", {
            className: "ListItem__main"
        }, e.children), s["default"].createElement("div", {
            className: "ListItem__aside"
        }, e.aside))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    };
    t["default"] = a;
    var o = n(180),
        s = r(o),
        l = n(92),
        u = n(21),
        c = (r(u), n(57)),
        d = r(c);
    a.defaultProps = {
        onClick: function() {},
        icon: null,
        aside: null,
        chevron: !1,
        selectable: !0,
        border: !0
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n(180),
        u = r(l),
        c = n(144),
        d = r(c),
        f = n(21),
        p = (r(f), n(92)),
        m = n(54),
        g = r(m),
        h = function() {
            return "undefined" != typeof window
        },
        _ = function(e) {
            function t(n) {
                i(this, t);
                var r = o(this, e.call(this, n));
                return r.onMouseEnter = function(e) {
                    if (r.el) {
                        var t = r.props,
                            n = t.text,
                            a = t.position,
                            i = t.align,
                            o = t.marginTop,
                            s = t.marginLeft,
                            l = (0, g["default"])(r.el);
                        r.update({
                            text: n,
                            position: a,
                            align: i,
                            rect: l,
                            marginTop: o,
                            marginLeft: s
                        })
                    }
                }, r.onMouseLeave = function(e) {
                    return r.update()
                }, r.onTransitionEnd = function(e) {
                    "visibility" === e.propertyName && r.state.tooltip && r.setState({
                        tooltip: void 0
                    })
                }, r.renderTooltip = function() {
                    if (!r.state.tooltip) return null;
                    var e = r.state.tooltip,
                        t = e.x,
                        n = e.y,
                        i = e.position,
                        o = e.align,
                        s = e.text,
                        l = e.removed,
                        c = (0, p.classNames)("Tooltip", "Tooltip--" + i, a({
                            "Tooltip--removed": !!l
                        }, "Tooltip--align-" + o, "t" === i || "b" === i));
                    return u["default"].createElement("div", {
                        className: c,
                        style: {
                            top: n,
                            left: t
                        },
                        onTransitionEnd: r.onTransitionEnd
                    }, u["default"].createElement("div", {
                        className: "Tooltip__in"
                    }, s))
                }, r.state = {}, r
            }
            return s(t, e), t.prototype.componentDidMount = function() {
                this.el = d["default"].findDOMNode(this), this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave)
            }, t.prototype.componentWillUnmount = function() {
                this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("mouseleave", this.onMouseLeave)
            }, t.prototype.update = function(e) {
                if (!e) return this.setState({
                    tooltip: Object.assign({}, this.state.tooltip, {
                        removed: !0
                    })
                });
                var t = e.position,
                    n = e.align,
                    r = e.text,
                    a = e.rect,
                    i = e.marginTop,
                    o = e.marginLeft,
                    s = a.left,
                    l = a.top;
                switch (t) {
                    case "t":
                        s += .5 * a.width;
                        break;
                    case "r":
                        s += a.width, l += .5 * a.height;
                        break;
                    case "b":
                        s += .5 * a.width, l += a.height;
                        break;
                    case "l":
                        l += .5 * a.height
                }
                s = Math.round(s + o), l = Math.round(l + i), this.setState({
                    tooltip: {
                        position: t,
                        align: n,
                        text: r,
                        x: s,
                        y: l
                    }
                })
            }, t.prototype.render = function() {
                var e = this.renderTooltip();
                return e ? (!this.defaultNode && h() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), u["default"].createElement(l.Fragment, null, this.props.children, d["default"].createPortal(e, this.defaultNode))) : this.props.children
            }, t
        }(l.Component);
    t["default"] = _, _.defaultProps = {
        position: "b",
        align: "center",
        marginTop: 0,
        marginLeft: 0
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
                return (0, Yt.isFullyLoadedTab)(e, t)
            });
            e.renew_hashes = (0, Ut.post)(Ut.CONTROLLER, {
                act: "a_renew_hash",
                peers: n.join(","),
                gid: e.gid
            }).then(function(t) {
                var r = Ht(t, 1),
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

    function l(e) {
        return function() {
            var t = arguments,
                n = t[t.length - 1];
            return e.apply(void 0, t)["catch"](function(r) {
                if (r && r.match && r.match(/1001;/)) return s(n, e, t);
                throw r
            })
        }
    }

    function u(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function c(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function d(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function f(e, t, n, r, a) {
        return a.tabHistoryNotChanged = !1, (0, qt.retryFn)(Ut.post, 3, function(e) {
            return e - 1
        })(Ut.CONTROLLER, {
            act: "a_start",
            peer: e,
            msgid: n,
            history: t,
            prevpeer: a.prevPeer,
            gid: a.gid,
            block: r
        }).then(function(t) {
            var r = Ht(t, 5),
                i = r[0],
                o = r[1],
                s = r[2],
                l = r[3],
                u = r[4];
            if (o.forEach(function(e) {
                    return (0, Zt.oCacheAdd)(a, e)
                }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = u, a.tabs[e] || (a.tabs[e] = (0, Yt.normalizeTab)(a, i)), d(l, a), n) {
                if (a.tabs[e]) {
                    var c = a.tabs[e].lastmsg,
                        f = a.tabs[e].lastmsg_meta;
                    extend(a.tabs[e], i), a.tabs[e].lastmsg = c, a.tabs[e].lastmsg_meta = f
                }
            } else extend(a.tabs[e], i);
            return a.admins = extend(a.admins, s), a.imQueue(e, !1), Rt(), p(e, a)
        })["catch"](function(e) {
            return (0, Jt.imWeirdCatch)("loadPeer", e)
        })
    }

    function p(e, t) {
        var n = t.imQueue(e, !1),
            r = t.tabs[e],
            a = n.filter(function(n) {
                return !(0, $t.isRidExist)(t, e, n.rid)
            });
        return r.msgs = a.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, r.msgs), t.imQueueSet(e, a), t.tabs[e].history = (0, Yt.restoreQueue)(a, t, u(t.tabs[e].history)), Promise.resolve(t)
    }

    function m(e, t, n) {
        var r = n.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return n.imQueueSet(e, r), n.tabs[e].history = (0, Yt.removeMessages)([t], u(n.tabs[e].history)), Promise.resolve(n)
    }

    function g(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var n = Ht(e, 1),
                r = n[0];
            return d(r, t)
        })
    }

    function h(e, t) {
        var n = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, (0, Yt.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && g(n, t), Promise.resolve(t).then(w)) : ((0, Yt.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), f(n, e, !1, !0, t))
        }).then(w).then(_.bind(null, n))
    }

    function _(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        return (0, Yt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, Yt.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
    }

    function v(e, t, n) {
        var r = n.msgid,
            a = n.peer;
        return !e && (0, Yt.isFullyLoadedTab)(n, a) && n.tabs[a].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && g(a, n), Promise.resolve(n).then(w).then(_.bind(null, a))) : f(a, !0, r, !0, n).then(w).then(function() {
            var e = (0, $t.getTab)(n, a);
            return e.msgid = r, n
        }).then(_.bind(null, a))
    }

    function b(e, t, n, r) {
        if (Ke(r)) throw (0, Yt.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
        var a = r.gid ? "gim" + r.gid : "im";
        if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, ln({
                sel: e ? (0, Yt.convertPeerToUrl)(e) : null,
                msgid: r.msgid,
                email: "",
                0: a
            }), 0 != r.prevPeer && _(r.prevPeer, r, !0), 0 !== e) {
            var i = [];
            (0, Yt.isTabLoaded)(r, e) && _(e, r, !0), i = r.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), ct(i, !1, r)
        } else ct(r.tabbedPeers, !1, r);
        return un(), fe(r.prevPeer, r)
    }

    function y(e) {
        if (cur.wallMentions = [], (0, Yt.isChatPeer)(e.peer) && (0, Yt.isFullyLoadedTab)(e, e.peer)) {
            var t = e.tabs[e.peer],
                n = [];
            Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                var r = (0, $t.parserMessage)(t.msgs[e]),
                    a = r && r.userId;
                a && a != vk.id && -1 === n.indexOf(a) && (0, Yt.isUserAliveInChat)(t, a) && n.push(a)
            }), (t.memberIds || []).forEach(function(e) {
                -1 === n.indexOf(e) && n.push(e)
            }), n.forEach(function(t) {
                if ((0, Zt.oCacheExists)(e, t)) {
                    var n = (0, Zt.oCacheGet)(e, t),
                        r = n.link.substring(1);
                    cur.wallMentions.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                }
            })
        }
    }

    function w(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var n = e.tabs[t],
            r = [],
            a = (0, Yt.isChatPeer)(t) && (n.data.closed || n.data.kicked);
        n.offset && r.push("photos"), n.offset && r.push("search"), (-2e9 > t || n.offset) && r.push("clear"), (0, Yt.isCommunityInterface)(e) && r.push("block"), (0, Yt.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !(0, Yt.isChatPeer)(t) && !(0, Yt.isUserPeer)(t) || (0, Yt.isCommunityInterface)(e) || (0, Yt.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), (0, Yt.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), !e.chatSettingsAllowed && (0, Yt.isChatPeer)(t) && !a && n.data.link && r.push("invite_link"), (0, Yt.isChatPeer)(t) && !a && (e.chatSettingsAllowed || (0, tn.canChangeTitle)(e) && r.push("topic", "avatar"), (0, tn.canInviteUser)(e) && r.push("invite"), r.push("leave")), (0, Yt.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), (0, Yt.isChatPeer)(t) && e.chatSettingsAllowed && !n.data.closed && !n.data.kicked && r.push("settings"), (0, Yt.isChatPeer)(t) && n.pinned && (r.push((0, en.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), (0, tn.canPinOrUnpin)(e) && r.push("unpin"));
        var i = (0, Yt.chatActions)(e);
        return e.curActions = r.sort(function(e, t) {
            return dn[e] - dn[t]
        }).reduce(function(e, t) {
            return e[t] = i[t], e
        }, {}), Promise.resolve(e)
    }

    function C(e, t, n) {
        var r = n.tabs[n.peer];
        return (0, Ut.post)(Ut.CONTROLLER, {
            peer: n.peer,
            whole: e,
            act: "a_history",
            offset: r.offset + (r.skipped || 0),
            toend: t,
            gid: n.gid
        }).then(function(e) {
            var t = Ht(e, 4),
                a = t[0],
                i = t[1],
                o = t[2],
                s = t[3];
            return r.allShown = o, n.admins = extend(n.admins, s), r.history = a + c(r.history), r.historyToAppend = a, r.offset += Object.keys(i).length, r.msgs = extend(r.msgs, i), n
        })
    }

    function E(e) {
        var t = e.tabs[e.peer];
        return (0, Ut.post)(Ut.CONTROLLER, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(n) {
            var r = Ht(n, 5),
                a = r[0],
                i = r[1],
                o = r[2];
            r[3], r[4];
            t.allShown = t.allShown || o, t.history = c(t.history) + a, t.historyToAppend = a;
            var s = Object.keys(i).length;
            return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, i), e
        })
    }

    function k(e, t, n, r) {
        var a = e.tabs[t];
        return r === Vt.FLAG_OUTBOUND && a.out_up_to > n ? e : (r === Vt.FLAG_OUTBOUND ? a.out_up_to = n : a.in_up_to = n, e)
    }

    function S(e) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var n = Ht(t, 3),
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

    function T(e) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var n = Ht(t, 1),
                r = n[0];
            return extend({}, e, {
                imTs: r
            })
        })
    }

    function I(e, t, n) {
        var r = n.tabs[e];
        return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = (0, Yt.setMessageError)(e, t, u(r.history))), Promise.resolve(n)
    }

    function M(e, t, n, r) {
        var a = r.tabs[e];
        return a.msgs[t] && (a.msgs[t].errored = 0, a.lastmsg_meta = n, a.lastmsg = t, a.history = (0, Yt.startResendMessage)(e, t, u(a.history))), Promise.resolve(r)
    }

    function P(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
            return !n && !Je(i)(t) || a && !a(i, e[i], t) || (e[i] = (0, Wt.arrayUnique)(r(e[i], i))), e
        }, e.dialog_tabs))
    }

    function L(e, t) {
        return 0 === e.length ? Promise.resolve(t) : (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var n = Ht(e, 1),
                r = n[0];
            return t.admins = extend(t.admins, r), t
        })
    }

    function O(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var n = {
                peer: e,
                type: "temp"
            };
            ct(t.tabbedPeers.concat([n]), !1, t)
        }
    }

    function A(e, t, n) {
        return (0, Yt.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
    }

    function x(e, t) {
        var n = (0, $t.getTab)(t, e.peerId);
        if ((0, Yt.isFullyLoadedTab)(t, e.peerId)) {
            var r = u(n.history);
            n.msgs[e.messageId] = extend(!0, {}, e), n.history = (0, Yt.editAndReplaceMessage)(t, e, r)
        }
        n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
        var a = n && n.pinned && (0, $t.parserMessage)(n.pinned);
        return a && a.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
    }

    function N(e, t) {
        var n = e.flags & Vt.FLAG_OUTBOUND,
            r = e.peerId;
        if ((0, Yt.isTabLoaded)(t, r)) {
            var i = t.tabs[r];
            if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = a({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? D(t, 1, e.peerId) : (!i.unread && D(t, 1, e.peerId), i.unread++), O(e.peerId, t)), (0, Yt.isFullyLoadedTab)(t, r)) {
                var o = u(i.history);
                i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, Yt.appendToHistory)(t, e, o, !0, !0, !0), (0, Xt.isOut)(e) && (i.blocked_community = 0, w(t))
            }
            if (i.typing) {
                var s = i.typing.userIds.indexOf(e.userId);
                s >= 0 && i.typing.userIds.splice(s, 1)
            }
            return i.lastmsg = e.messageId, i.lastmsg_meta = e, _(e.peerId, t), P(t, i, !1, A.bind(null, r), rt.bind(null, t)), Promise.resolve(t)
        }
        return f(r, 0, 0, 0, t).then(function(t) {
            var a = t.tabs[r];
            return P(t, a, !1, A.bind(null, r), rt.bind(null, t)), _(e.peerId, t), n || O(e.peerId, t), t
        })
    }

    function D(e, t, n) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
    }

    function R(e, t) {
        if ((0, Yt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = n.unread;
            if (t = k(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : (0, $t.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && D(t, -1, e.peerId), !n.skipped) {
                var a = u(n.history);
                n.history = (0, Yt.removewNewUnreadBarAndMerge)(t, a, e.peerId)
            }
        } else(0, Yt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && D(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return (0, Yt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Qt.FOLDER_UNREAD] = t.dialog_tabs[Qt.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== Qt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : et(Qt.FOLDER_ALL, t)
    }

    function j(e, t) {
        var n = t.tabs[e.peerId];
        if ((0, Yt.isTabLoaded)(t, e.peerId) && k(t, e.peerId, e.upToId, Vt.FLAG_OUTBOUND), (0, Yt.isFullyLoadedTab)(t, e.peerId)) {
            var r = u(n.history);
            n.history = (0, Yt.markMessagesAsRead)(t, e.peerId, r)
        }
        return Promise.resolve(t)
    }

    function B(e, t, n, r, a) {
        return a.text = {}, a.imQueue = e, a.imQueueResend = t, a.imQueueSet = n, a.imQueueComplete = r, Promise.resolve(a)
    }

    function F(e, t, n) {
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
                o = (0, $t.getMessage)(n, t, i),
                s = (0, $t.getAuthorFullName)(n, t, i);
            return s === !1 ? n.set(Me.bind(null, a({}, t, [o.userId]))).then(function(n) {
                var a = (0, $t.getAuthorFullName)(n, t, i);
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

    function H(e, t) {
        (0, Yt.normalizeTabsGotFromServer)(t, e);
        var n = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(n, r) {
            var a = t.tabs[r] ? t.tabs[r].msgs : {},
                i = extend({}, a || {}, e[r].msgs || {});
            return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
        }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
    }

    function U(e, t, n, r) {
        var a = (0, $t.getTab)(r, e);
        if (a) {
            var i = t !== !1 ? t == on ? 2 : mobPlatforms[t] ? 1 : 0 : a.last_seen[2];
            a.online = t, a.last_seen = [t, n || a.last_seen[1], i]
        }
        return Promise.resolve(r)
    }

    function z(e, t) {
        var n = (0, $t.getTab)(t, e.peerId);
        return n && (e.ts = Date.now() / 1e3, n.typing = e), Promise.resolve(t)
    }

    function G(e, t) {
        return (0, qt.pause)(rn + 2).then(function() {
            if ((0, Yt.isTabLoaded)(t, e)) {
                var n = t.tabs[e];
                if (n.typing) {
                    var r = Date.now() - 1e3 * n.typing.ts;
                    r >= 1e3 * rn && (n.typing = void 0)
                }
            }
            return t
        })
    }

    function V(e) {
        return e.map(function(e) {
            return e[0] + ":" + e[1]
        }).join(",")
    }

    function q(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var n = t.selectedMessages.concat(e);
            t.selectedMessages = (0, Wt.arrayUnique)(n).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function W(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function K(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function Y(e, t) {
        if ((0, Yt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
            var a = n.msgs["rid" + e.randomId];
            a && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = (0, Yt.replaceMessageAttrs)(t, u(n.history), e)
        }
        return Promise.resolve(t)
    }

    function Q(e, t) {
        return Promise.resolve()
    }

    function $(e, t) {
        var n = {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        };
        return (0, qt.retryFn)(Ut.post, 3, function(e) {
            return e * e
        })(Ut.CONTROLLER, n).then(function(n) {
            return X(e, n, t)
        })["catch"](function() {
            return X(e, null, t)
        })
    }

    function X(e, t, n) {
        var r = n.tabs[e.peerId];
        return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], Z(e, n)
    }

    function Z(e, t) {
        var n = t.tabs[e.peerId];
        return n.history = (0, Yt.replaceAttaches)(u(n.history), e, t), Promise.resolve(t)
    }

    function J(e, t, n) {
        var r = (0, Yt.dayFromVal)(t),
            a = n.tabs[e];
        return a.searchDay = r, a.searchOffset = 0, a.searchAllLoaded = !1, Promise.resolve(n)
    }

    function ee(e, t, n) {
        var r = n.tabs[t];
        return r.searchText = e, me(t, n), n
    }

    function te(e, t, n) {
        if (t) {
            var r = n.tabs[t];
            r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
        } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
        return Promise.resolve(n)
    }

    function ne(e, t, n, r) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_hints",
            str: e,
            gid: r.gid,
            query: n,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = Ht(e, 3),
                n = t[0],
                a = t[1],
                i = t[2];
            return d(i, r), a.forEach(function(e) {
                return (0, Zt.oCacheAdd)(r, e)
            }), H(n, r), Object.keys(n).sort(function(e, t) {
                return n[e].order - n[t].order
            }).map(function(e) {
                return n[e]
            })
        })
    }

    function re(e, t, n, r) {
        return ne(e, t, n, r).then(function(e) {
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

    function ae(e) {
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

    function ie(e) {
        return function(t, n) {
            return e(n).then(function(e) {
                var r = t ? e.search(t) : e.list,
                    a = r.map(ae);
                return n.mapped_index || (n.mapped_index = {}), a.forEach(function(e) {
                    n.mapped_index[e.peerId] = e
                }), a
            })
        }
    }

    function oe(e, t) {
        var n = void 0,
            r = void 0;
        t.topConvTree = new Promise(function(e) {
            n = e
        }), t.hintsTree = new Promise(function(e) {
            r = e
        });
        var a = e.select(Kt.RECENT_SEARCH_OP);
        return (0, qt.retryFn)(Ut.post, 1, function() {
            return 4
        })(Ut.CONTROLLER, {
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
            var a = Ht(e, 3),
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

    function le(e) {
        var t = e.active_tab,
            n = void 0;
        return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
            return e.tabs[t].lastmsg
        })) : 0, (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_dialogs",
            start_message_id: n,
            tab: t,
            gid: e.gid
        }).then(function(n) {
            var r = Ht(n, 4),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3];
            return o.forEach(function(t) {
                return (0, Zt.oCacheAdd)(e, t)
            }), d(s, e), H(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[t] = !a.has_more, Promise.resolve(e)
        })
    }

    function ue(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_search",
            q: e,
            from: "all",
            gid: t.gid,
            hash: t.writeHash,
            offset: t.searchOffset || 0
        }).then(function(n) {
            var r = Ht(n, 5),
                a = r[0],
                i = r[1],
                o = r[2],
                s = r[3],
                l = r[4];
            return i.forEach(function(e) {
                return (0, Zt.oCacheAdd)(t, e)
            }), (0, Yt.normalizeTabsGotFromServer)(t, a), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = l), Object.keys(a).filter(function(e) {
                return !t.tabs[e]
            }).forEach(function(e) {
                t.tabs[e] = a[e]
            }), [a, o]
        })
    }

    function ce(e, t) {
        var n = t.tabs[e];
        return n.searchAllLoaded
    }

    function de(e, t) {
        if (t.peer === e && (0, Yt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            return n.inplaceSearch
        }
        return !1
    }

    function fe(e, t) {
        if ((0, Yt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, ln({
                st: ""
            }), un()
        }
        return Promise.resolve(t)
    }

    function pe(e, t) {
        if ((0, Yt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function me(e, t) {
        var n = t.tabs[e];
        return n.inplaceSearch = !0, Promise.resolve(t)
    }

    function ge(e, t) {
        var n = t.tabs[e],
            r = "";
        if (me(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
        var a = "in:" + e + " " + r + " " + (n.searchText || "");
        return ln({
            st: n.searchText
        }), un(), (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_search",
            q: a,
            from: "in",
            gid: t.gid,
            hash: t.writeHash,
            offset: n.searchOffset || 0
        }).then(function(e) {
            var t = Ht(e, 3),
                r = t[0],
                a = t[1],
                i = t[2];
            return n.searchOffset = a, n.searchAllLoaded = i, r
        })
    }

    function he(e) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function _e(e, t) {
        var n = (0, $t.getTab)(e, t);
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_load_lastmsg",
            peerId: t,
            gid: e.get().gid
        }).then(function(r) {
            var a = Ht(r, 2),
                i = a[0],
                o = a[1];
            n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
            var s = Ht(o, 3);
            n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[Qt.FOLDER_UNREAD] = e.get().dialog_tabs[Qt.FOLDER_UNREAD].filter(function(e) {
                return e != t
            })), P(e.get(), n, !1, A.bind(null, t), rt.bind(null, e.get()))
        })
    }

    function ve(e, t, n) {
        if ((0, Yt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e
        }
        return Promise.resolve(n)
    }

    function be(e, t, n) {
        if ((0, Yt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.history = (0, Yt.removeMessages)(e, u(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length, e.forEach(function(e) {
                return delete r.msgs[e]
            }), e.forEach(function(e) {
                var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
            })
        }
        return Promise.resolve(n)
    }

    function ye(e, t, n, r, a) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_mark",
            peer: t,
            hash: n,
            gid: a,
            msgs_ids: e.join(","),
            mark: r
        })
    }

    function we(e, t, n, r) {
        if ((0, Yt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            a.deleted = a.deleted ? a.deleted.concat(e) : e, a.history = (0, Yt.removeMessagesWithRestore)(e, t, n, u(a.history)), a.offset -= e.filter(function(e) {
                return a.msgs[e]
            }).length
        }
        return Promise.resolve(r)
    }

    function Ce(e, t, n) {
        if ((0, Yt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted && (r.deleted = r.deleted.filter(function(t) {
                return t !== e
            })), r.history = (0, Yt.restoreMessage)(e, t, u(r.history)), r.offset++
        }
        return Promise.resolve(n)
    }

    function Ee(e, t, n, r) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: n,
            gid: r
        })
    }

    function ke(e, t, n) {
        return t && (n.pendingForward = null, e || (e = {
            msgIds: []
        }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(n)
    }

    function Se(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function Te(e, t, n) {
        if ((0, Yt.isTabLoaded)(n, e)) {
            n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, P(n, n.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), n.tabs[e].unread > 0 && D(n, -1, e);
            var r = n.tabs[e];
            r.deletedDialog = !0;
            var a = n.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return ct(a, !0, n), t.then(function(t) {
                var a = Ht(t, 2);
                a[0], a[1];
                return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
            })
        }
    }

    function Ie(e, t, n) {
        var r = n.tabs[e];
        return r.memberIds = [].concat(r.memberIds, t).filter(function(e, t, n) {
            return n.indexOf(e) === t
        }), Promise.resolve(n)
    }

    function Me(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var n = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_load_member",
            need: n
        }).then(function(e) {
            var n = Ht(e, 1),
                r = n[0];
            return r.forEach(function(e) {
                return (0, Zt.oCacheAdd)(t, e)
            }), t
        })
    }

    function Pe(e, t, n) {
        function r(e, t) {
            (0, Yt.isChatPeer)(e) && t && !(0, Zt.oCacheExists)(i, t) && (a[e] ? -1 === a[e].indexOf(t) && a[e].push(t) : a[e] = [t])
        }
        var a = {},
            i = n.get(),
            o = t.filter(function(e) {
                return !(0, Yt.isTabLoaded)(i, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
        t.forEach(function(e) {
            (0, Yt.isTabLoaded)(i, e.peerId) && r(e.peerId, e.userId)
        }), e.forEach(function(e) {
            r(e.peerId, +e.kludges.source_mid)
        });
        var s = t.filter(function(e) {
            return e.flags & Vt.FLAG_OUTBOUND && !e.local
        }).map(function(e) {
            return e.kludges.from_admin
        }).filter(function(e) {
            return e && !i.admins[e]
        });
        if (0 === Object.keys(a).length && 0 === s.length && 0 === o.length) return Promise.resolve(i);
        var l = Object.keys(a).length > 0 || s.length > 0 || o.length > 0;
        return {
            shouldLoad: l,
            needMembers: a,
            needAdminIds: s,
            needPeers: o
        }
    }

    function Le(e, t, n) {
        var r = e.needMembers,
            a = e.needAdminIds,
            i = e.needPeers;
        return t.pause(), Promise.all([Me(r, n), L(a, n), Promise.all(i.map(function(e) {
            return f(e, 0, 0, 0, n)
        }))])["catch"](function() {
            return n
        }).then(function() {
            return t.resume()
        }).then(function() {
            return n
        })
    }

    function Oe(e, t, n, r) {
        return t !== vk.id ? Promise.resolve(r) : ((0, Yt.isTabLoaded)(r, n) && r.peer == n && (r = w(r)), Promise.resolve(r))
    }

    function Ae(e, t, n) {
        var r = n.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, w(n)
    }

    function xe(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function Ne(e, t, n, r) {
        if ((0, Yt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            e.filter(function(e) {
                return a.msgs[e]
            }).forEach(function(e) {
                var i = (0, $t.getMessage)(r, t, e),
                    o = n ? i.flags | Vt.FLAG_IMPORTANT : i.flags & ~Vt.FLAG_IMPORTANT;
                i.flags = o, a.msgs[e] = i, a.history = (0, Yt.updateStar)(e, n, u(a.history))
            })
        }
        return Promise.resolve(r)
    }

    function De(e, t, n) {
        n.importants || (n.importants = {});
        var r = n.importants[t] || 0;
        return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
    }

    function Re(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function je(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function Be(e, t, n) {
        return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
    }

    function Fe(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function He(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function Ue(e, t, n) {
        return (0, Ut.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return n
        })
    }

    function ze(e, t, n, r) {
        return r.creating = !0, r.longpoll.pause(), (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_multi_start",
            hash: r.writeHash,
            peers: t.join(","),
            title: n
        }).then(function(e) {
            var t = Ht(e, 1),
                n = t[0];
            return r.next_peer = n.peerId, r.tabs[n.peerId] = n, P(r, n, !1, function(e) {
                return [n.peerId].concat(e)
            }), r.longpoll.resume(), r
        }).then(function(t) {
            return e ? Ue(t.next_peer, e, t) : t
        }).then(function(e) {
            return e.creating = !1, e
        })["catch"](function(e) {
            throw r.creating = !1, r.longpoll.resume(), e
        })
    }

    function Ge(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.tabs).length,
            r = e.active_tab;
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: n,
            tab: r,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(n) {
            var i = Ht(n, 5),
                o = i[0],
                s = i[1],
                l = i[2],
                c = i[3],
                d = i[4];
            s.forEach(function(t) {
                return (0, Zt.oCacheAdd)(e, t)
            }), (0, Yt.normalizeTabsGotFromServer)(e, o), l.user_unread && handlePageCount("msg", l.user_unread), (0, Wt.lplog)("Resync success", "success");
            var f = e.peer,
                p = void 0;
            if ((0, Yt.isReservedPeer)(f)) p = Promise.resolve(!1);
            else {
                var m = {
                    tabs: a({}, f, e.tabs[f]),
                    oCache: {}
                };
                p = H(a({}, f, o[f]), m)
            }
            return p.then(function(n) {
                e.tabs = o, e.admins = extend(e.admins, c), n && (e.tabs[f] = n.tabs[f], e.tabs[f].history = (0, Yt.restoreQueue)(f, e, u(e.tabs[f].history))), e.loadingDialogs = !1, e.mutedPeers = l.mutedPeers, e.lastDialogsOptions = {
                    has_more: l.has_more
                }, e.dialog_tab_cts = l.folder_cts, e.dialog_tabs[r] = d.map(intval);
                var a = e.dialog_tabs[r].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != r
                }).forEach(function(t) {
                    r == Qt.FOLDER_ALL ? e.dialog_tabs[t] = a.filter(Je(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ye(intval(l.unread), e)
            })
        })["catch"](function(t) {
            return (0, Wt.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, qt.pause)(2).then(Ge.bind(null, e))
        })
    }

    function Ve(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function qe(e, t, n) {
        return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
    }

    function We() {
        return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
            return Upload.options[e]
        }).filter(function(e) {
            return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
        }).length > 0 : !1
    }

    function Ke(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || We()
    }

    function Ye(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[Qt.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function Qe(e, t) {
        return t.ctrl_submit = !!e, (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function $e(e, t, n) {
        return function() {
            n.update_old_title = e;
            var r = Object.keys(n.cur_unread_cnt).length;
            if (0 === r) return (0, nn.setDocumentTitle)(e ? e : document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
            if (e)(0, nn.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var a = r > 9 ? 10 : r;
                setFavIcon("/images/icons/favicons/fav_im" + a + t + ".ico"), (0, nn.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r)))
            }
        }
    }

    function Xe(e, t, n) {
        n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
        var r = document.title,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !n.update_title_to) {
            var i = $e(r, a, n);
            n.update_title_to = setInterval(i, 1e3), i()
        } else !t && n.update_old_title && ((0, nn.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
        return Promise.resolve(n)
    }

    function Ze(e, t, n, r, a) {
        return (0, Yt.isFullyLoadedTab)(a, e) && (a.tabs[e].scrollTop = intval(t), a.tabs[e].scrollBottom = intval(n), a.tabs[e].contHeight = intval(r)), Promise.resolve(a)
    }

    function Je(e) {
        return e === Qt.FOLDER_ALL ? function() {
            return !0
        } : e === Qt.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : function(t) {
            return t.folders & Qt.FOLDER_MASKS[e]
        }
    }

    function et(e, t) {
        t.active_tab = e, (0, zt.updateLocation)({
            tab: e === Qt.FOLDER_ALL ? null : e
        });
        var n = [];
        if (e !== Qt.FOLDER_ALL && !(0, Yt.isReversedDialogs)(t)) {
            var r = t.dialog_tabs[e];
            n = t.dialog_tabs[Qt.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter(Je(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = r.length >= n.length ? r : n
        }
        return Promise.resolve(t)
    }

    function tt(e, t, n) {
        return e === Vt.SET_DIRECTORIES && n.folders & t ? !1 : e !== Vt.RESET_DIRECTORIES || n.folders & t ? !0 : !1
    }

    function nt(e, t, n) {
        return t !== Vt.RESET_DIRECTORIES || e.folders & Qt.FOLDER_MASKS[n] ? t === Vt.REPLACE_DIRECTORIES ? e.folders & Qt.FOLDER_MASKS[n] ? -1 : 1 : t === Vt.SET_DIRECTORIES ? 1 : -1 : 0
    }

    function rt(e, t, n, r) {
        var a = e.dialog_tabs_all;
        if (a[Qt.FOLDER_ALL] || a[t]) return !0;
        if (n.filter(function(e) {
                return e === r.peerId
            }).length > 0) return !0;
        if ("r" === r.lastmsg[0]) return !0;
        var i = n.map(function(t) {
            return e.tabs[t.toString()]
        }).filter(function(t) {
            return (0, Yt.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
        });
        return i.length > 0 ? !0 : !1
    }

    function at(e, t, n, r, a) {
        if ((0, Yt.isTabLoaded)(a, e)) {
            var i = a.tabs[e];
            return n === Vt.REPLACE_DIRECTORIES && (t ^= i.folders), tt(n, t, i) && Object.keys(Qt.FOLDER_MASKS).filter(function(e) {
                return Qt.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                a.dialog_tab_cts[e] += nt(i, n, e)
            }), n === Vt.SET_DIRECTORIES ? a.tabs[e].folders |= t : n === Vt.RESET_DIRECTORIES ? a.tabs[e].folders &= ~t : a.tabs[e].folders = t ^= i.folders, P(a, a.tabs[e], !0, function(t, n) {
                return t.concat([e]).map(function(e) {
                    return a.tabs[e]
                }).filter(Je(n)).map(function(e) {
                    return e.peerId
                })
            }, rt.bind(null, a)), Promise.resolve(a)
        }
        return f(e, 0, 0, 0, a).then(at.bind(null, e, t, n, a))
    }

    function it(e) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function ot(e, t) {
        return d(a({}, e, {
            free: !0
        }), t), (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function st(e, t) {
        var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
    }

    function lt(e, t, n, r) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_restore_dialog",
            hash: t,
            gid: r.gid,
            spam: n ? 1 : 0,
            peer: e
        }).then(function(t) {
            return r.tabs[e].deletedDialog = !1, P(r, r.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), r.tabs[e].unread = t, r
        })
    }

    function ut(e, t, n) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_spam_dialog",
            peer: e,
            gid: n.gid,
            hash: t
        })
    }

    function ct(e, t, n) {
        return n.tabbedPeers = e, (0, Yt.isClassicInterface)(n) && (ln({
            peers: n.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    r = e.type;
                return t !== n.peer && "perm" === r
            }).map(function(e) {
                return (0, Yt.getBareTab)(e.peer, n)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(Yt.convertPeerToUrl).join("_")
        }), t && un()), Promise.resolve(n)
    }

    function dt(e) {
        return e.peer ? de(e.peer, e) ? ce(e.peer, e) : (0, Yt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function ft(e, t) {
        var n = t.tabs[e];
        return (0, Yt.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
    }

    function pt(e, t) {
        var n = t.tabs[e];
        return (0, Yt.isFullyLoadedTab)(t, e) && (n.history = c(n.history)), Promise.resolve(t)
    }

    function mt(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function gt(e, t, n) {
        if (!(0, Yt.isCommunityPeer)(t)) return Promise.resolve(n);
        var r = (0, $t.getTab)(n, t);
        return r.blocked_community = !e, (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_toggle_community",
            peer_id: t,
            hash: r.hash,
            state: e ? 1 : 0
        }).then(function() {
            return w(n)
        })
    }

    function ht(e, t) {
        if (0 !== t.peer && (0, Yt.isFullyLoadedTab)(t, t.peer)) {
            var n = (0, $t.getTab)(t, t.peer);
            n.history = u(n.history), e(n.history)
        }
        return Promise.resolve(t)
    }

    function _t(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function vt(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function bt(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function yt(e) {
        ln({
            act: e ? "create" : null
        }), un()
    }

    function wt() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        ln({
            q: e
        }), un()
    }

    function Ct(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, Yt.getClassicChatHeight)() > window.clientHeight() && (0, Yt.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function Et(e, t, n) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_join_chat",
            chat_id: e,
            hash: t,
            write_hash: n.writeHash
        }).then(function(e) {
            var t = Ht(e, 4),
                r = t[0],
                a = t[1],
                i = t[2],
                o = t[3];
            return i.forEach(function(e) {
                return (0, Zt.oCacheAdd)(n, e)
            }), n.tabs[r] = a, P(n, a, !1, A.bind(null, r), rt.bind(null, n)), n.admins = extend(n.admins, o), [r]
        })
    }

    function kt(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_link",
            chat_id: e
        })
    }

    function St(e, t) {
        var n = t.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_reset_link",
            chat_id: e - 2e9,
            write_hash: t.writeHash
        }).then(function(e) {
            return n.inviteLink = e[0], e
        })
    }

    function Tt(e) {
        return cn({
            invite_chat_id: null,
            invite_hash: null
        }), e.invitation = void 0, Promise.resolve(e)
    }

    function It(e, t) {
        var n = (0, Wt.arrayUnique)([e].concat(t.select(Kt.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(Kt.RECENT_SEARCH_OP, n)
    }

    function Mt(e) {
        e.update(Kt.RECENT_SEARCH_OP, [])
    }

    function Pt(e, t) {
        var n = t.select(Kt.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(Kt.RECENT_SEARCH_OP, n), n
    }

    function Lt(e, t, n) {
        var r = n.tabs[t],
            a = (0, $t.getMessage)(n, t, e);
        return r.data.kicked || r.data.closed || a.kludges.source_act || (r.pinned = a), Promise.resolve(n)
    }

    function Ot(e, t) {
        var n = t.tabs[e];
        return n.pinned = null, Promise.resolve(t)
    }

    function At(e, t, n) {
        var r = n.tabs[e];
        return r.memberIds = r.memberIds.filter(function(e) {
            return e !== t
        }), r.adminIds = r.adminIds.filter(function(e) {
            return e !== t
        }), Promise.resolve(n)
    }

    function xt(e, t, n, r) {
        var a = r.tabs[e];
        return n ? a.adminIds = [].concat(a.adminIds, t).filter(function(e, t, n) {
            return n.indexOf(e) === t
        }) : a.adminIds = a.adminIds.filter(function(e) {
            return e !== t
        }), Promise.resolve(r)
    }

    function Nt(e, t, n, r) {
        var i = (0, $t.getMessage)(e, n, t),
            o = i.userId;
        return (0, Zt.oCacheGet)(r, o) ? Promise.resolve(r) : Me(a({}, n, [o]), r)
    }

    function Dt() {
        ajax.post("al_im.php", {
            act: "a_hide_promo_tooltip"
        })
    }

    function Rt() {
        cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
    }

    function jt(e, t) {
        return t.tabs[e].top_banner = void 0, (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_hide_banner",
            peer_id: e
        }).then(function() {
            return t
        })
    }

    function Bt(e, t, n) {
        n.tabs[e].top_banner = void 0;
        var r = n.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_callback_banner",
            peer_id: e,
            callback_data: t,
            hash: r.hash
        }).then(function() {
            return n
        })
    }

    function Ft(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_load_banner",
            peer_id: e
        }).then(function(n) {
            var r = Ht(n, 1),
                a = r[0];
            return t.tabs[e].top_banner = a, t
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.toggleAdmin = t.kickUser = t.removeChatPhoto = t.updateFlags = t.getChatDetails = t.getMessageLocalId = t.getPinnedMessage = t.unpinMessage = t.pinMessage = t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.loadChatInfo = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchLocalHints = t.searchTopConv = t.deliverEditedMessage = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
    var Ht = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.strHistory = c, t.updateBlockStates = d, t.loadPeer = f, t.restoreHistoryQueue = p, t.removeFailed = m, t.selectPeer = h, t.selectPeerOnMessage = v, t.changePeer = b, t.updateMentions = y, t.setActions = w, t.loadMoreHistory = C, t.loadLessHistory = E, t.loadLongPollKey = S, t.loadLongPollTs = T, t.setMessageErrored = I, t.resendMessage = M, t.loadAdmins = L, t.editMessage = x, t.addMessage = N, t.markInboundMessagesAsRead = R, t.markOutboundMessagesAsRead = j, t.initTextStore = B, t.processFwd = F, t.mergeTabs = H, t.updateOnline = U, t.setTyping = z, t.waitTyping = G, t.addSelection = q, t.cleanSelected = W, t.dropSelection = K, t.replaceMessage = Y, t.saveMedia = Q, t.loadMedia = $, t.addAttachmentsToStoreData = X, t.replaceMediaAttachesStore = Z, t.setCurrentSearchDate = J, t.setInplaceSearch = ee, t.setCurrentSearch = te, t.searchHints = ne, t.searchHintsIndex = re, t.localIndexToDialog = ae, t.preloadSearchIndex = oe, t.loadDialogs = le, t.searchMessages = ue, t.isSearchAllLoaded = ce, t.isSearchingInplace = de, t.cancelSearch = fe, t.clearDate = pe, t.searchInplaceStart = me, t.searchMessagesInplace = ge, t.loadImportant = he, t.loadActualLastMessage = _e, t.removeMessagesMarkDeleted = ve, t.removeMessages = be, t.removeMessageSend = ye, t.removeMessagesWithRestore = we, t.restoreMessage = Ce, t.restoreMessageSend = Ee, t.forwardMessages = ke, t.prepareForward = Se, t.deletedDialog = Te, t.addNewMemberOptimisticly = Ie, t.loadChatMember = Me, t.checkNewPeople = Pe, t.loadNewPeople = Le, t.updateActions = Oe, t.setMutedPeer = Ae, t.setExecStack = xe, t.updateFavMessage = Ne, t.updateImportant = De, t.loadSpam = Re, t.flushSpam = je, t.setCreationType = Be, t.getOwnerPhoto = Fe, t.presetAvatar = He, t.setChatPhoto = Ue, t.createChat = ze, t.resync = Ge, t.toggleSendingAbility = Ve, t.setDelayedMessage = qe, t.isAnythingLoading = Ke, t.updateUnreadCount = Ye, t.changeSubmitSettings = Qe, t.updateFavAndTitle = Xe, t.saveHistoryScroll = Ze, t.filterFromTab = Je, t.changeDialogsTab = et, t.updateFolderState = at, t.getMutexQueue = it, t.releaseBlock = ot, t.toggleCommunityMute = st, t.restoreDialog = lt, t.spamDialog = ut, t.updateTabbedPeers = ct, t.isEverythingLoaded = dt, t.cleanTab = ft, t.stringifyTab = pt, t.updateGoToEndVisibility = mt, t.toggleCommunityMessages = gt, t.updateHistory = ht, t.startRecording = _t, t.cancelRecording = vt, t.setVoiceMessageAvail = bt, t.toggleConversation = yt, t.updateSearchQuery = wt, t.initializeChatResize = Ct, t.joinChat = Et, t.getInviteLink = kt, t.resetInviteLink = St, t.leaveInvitation = Tt, t.saveRecentSearchPeer = It, t.resetRecentSearch = Mt, t.removeFromRecentSearch = Pt, t.pinMessageOptimistic = Lt, t.unpinMessageOptimistic = Ot, t.kickUserOptimisticly = At, t.toggleAdminOptimisticly = xt, t.checkChatMember = Nt, t.hidePromoTooltip = Dt, t.videoAutoPlayHandler = Rt, t.hideTopBannerAction = jt, t.callbackTopBannerAction = Bt, t.loadBanner = Ft;
    var Ut = n(181),
        zt = n(110),
        Gt = n(199),
        Vt = r(Gt),
        qt = n(130),
        Wt = n(23),
        Kt = n(150),
        Yt = n(88),
        Qt = n(94),
        $t = n(190),
        Xt = n(188),
        Zt = n(121),
        Jt = n(12),
        en = n(37),
        tn = n(115),
        nn = n(15),
        rn = t.TYPING_PERIOD = 5,
        an = 2e4,
        on = 8,
        sn = (0, zt.updateLazyLocation)(),
        ln = sn.scheduleNav,
        un = sn.commitNav,
        cn = sn.scheduleNavWithTimeOut,
        dn = t.ACTION_PRIORITIES = {
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
            "return": 12,
            block_community: 12,
            allow_community: 12
        };
    t.readLastMessages = l(function(e, t) {
        var n = t.tabs[e],
            r = Object.keys(n.msgs).map(function(n) {
                return (0, $t.getMessage)(t, e, n)
            }).filter(function(e) {
                return !(0, Xt.isOut)(e)
            }).map(function(e) {
                return e.messageId
            }).sort(function(e, t) {
                return t - e
            });
        return n.skipped > 0 && (r = r.filter(function(e) {
            return intval(e) <= n.lastmsg - n.skipped
        })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Vt.readInboundEvent([6, e, r])]), (0, Ut.post)(Ut.CONTROLLER, {
            peer: e,
            ids: [r],
            hash: n.hash,
            act: "a_mark_read",
            gid: t.gid
        }).then(function() {
            return k(t, e, r, Vt.FLAG_OUTBOUND)
        }))
    }), t.deliverMessage = l(function(e, t, n) {
        var r = Date.now() + rand(0, 100).toFixed(0),
            a = n.tabs[e];
        return (0, qt.retryFn)(Ut.post, 1)(Ut.CONTROLLER, {
            act: "a_send",
            to: e,
            hash: a.hash,
            msg: t.message,
            media: V(t.attaches),
            guid: r,
            share_url: t.share_url,
            random_id: t.rid,
            gid: n.gid,
            entrypoint: n.currentEntryPoint || "",
            sticker_referrer: t.sticker_referrer
        }, an).then(function(e) {
            var t = Ht(e, 1),
                r = t[0];
            return n.version !== r.version && nav.reload({
                force: !0
            }), n.currentEntryPoint = "", n
        })
    }), t.deliverEditedMessage = l(function(e, t, n) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_edit_message",
            hash: e.hash,
            id: t.messageId,
            peerId: e.peerId,
            gid: n.gid,
            msg: t.origText,
            media: V(t.attaches),
            share_url: t.share_url
        }, an).then(function(e) {
            var t = Ht(e, 1);
            t[0];
            return n
        })
    }), t.searchTopConv = ie(function(e) {
        return e.topConvTree
    }), t.searchLocalHints = ie(function(e) {
        return e.hintsTree
    }), t.sendTyping = l(function(e, t) {
        return t.tabs[e].lastTyping = Date.now(), (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_typing",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function() {
            return t
        }, function() {
            return t
        })
    }), t.flushHistory = l(function(e, t) {
        return Te(e, (0, Ut.post)("al_im.php", {
            act: "a_flush_history",
            id: e,
            from: "im",
            gid: t.gid,
            hash: t.tabs[e].hash
        }), t)
    }), t.updateChatTopic = l(function(e, t, n) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_set_chat_title",
            peer: e,
            new_title: t,
            hash: n.tabs[e].hash
        }).then(function() {
            return n
        })
    }), t.loadChatInfo = l(function(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_load_chat_info",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            var r = Ht(n, 1),
                a = r[0];
            return t.tabs[e] = extend(t.tabs[e], a), t
        })
    }), t.addNewMember = l(function(e, t, n) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_add_chat_members",
            peer: e,
            new_peer: t.join(","),
            hash: n.tabs[e].hash
        }).then(function() {
            return n
        })
    }), t.updateChatPhoto = l(function(e, t) {
        return e.kludges.source_act === Yt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_chat_photo",
            msg_id: e.messageId
        }).then(function(n) {
            var r = Ht(n, 2),
                a = r[0],
                i = r[1];
            t.chat_photo_msg = i;
            var o = t.tabs[e.peerId];
            if (t.tabs[e.peerId].photo = a[0], t.tabs[e.peerId].photoLarge = a[1], (0, Yt.isFullyLoadedTab)(t, e.peerId)) {
                var s = e.kludges.source_act;
                o.history = (0, Yt.addChatPhotoToUpdate)(e, s, t, u(o.history))
            }
            return t
        })
    }), t.leaveChat = l(function(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_leave_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Oe.bind(null, Yt.CHAT_KICK_USER, vk.id, e, t))
    }), t.returnToChat = l(function(e, t) {
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_return_to_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Oe.bind(null, Yt.CHAT_INVITE_USER, vk.id, e, t))
    }), t.toggleMutePeer = l(function(e, t, n) {
        return (0, Ut.post)(Ut.CONTROLLER, {
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
        }).then(Ae.bind(null, e, t))
    }), t.favMessage = l(function(e, t, n, r) {
        return Ne(e, n, t, r), (0, Ut.post)(Ut.CONTROLLER, {
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
    }), t.toggleDialogImportant = l(function(e, t) {
        var n = Qt.FOLDER_MASKS[Qt.FOLDER_IMPORTANT],
            r = t.tabs[e].folders & n,
            a = r ? Vt.resetDirectoriesEvent : Vt.setDirectoriesEvent;
        return t.longpoll.push([a([0, e, n, !0])]), (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_dialog_star",
            val: r ? 0 : 1,
            peer: e,
            hash: t.tabs[e].hash,
            gid: t.gid
        }).then(function() {
            return t
        })
    }), t.markDialogAnswered = l(function(e, t, n) {
        var r = Qt.FOLDER_MASKS[Qt.FOLDER_UNRESPOND];
        return n.longpoll.push([Vt.resetDirectoriesEvent([0, e, r, !0]), Vt.readInboundEvent([6, e, t])]), (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_mark_answered",
            peer: e,
            lastmsg: t,
            hash: n.tabs[e].hash,
            gid: n.gid
        }).then(function() {
            return n
        })
    }), t.deleteDialog = l(function(e, t) {
        return P(t, t.tabs[e], !0, function(t) {
            return t.filter(function(t) {
                return t !== e
            })
        }), t.tabs[e].deletedDialog = !0, (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_delete_dialog",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            return n[0] ? (ct(t.tabbedPeers.filter(function(t) {
                return t.peer !== e
            }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, P(t, t.tabs[e], !1, A.bind(null, e), rt.bind(null, t))), n
        })
    }), t.pinMessage = l(function(e, t, n) {
        var r = n.tabs[t];
        return r.data.kicked || r.data.closed ? Promise.resolve(n) : (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_pin_message",
            msgid: e,
            chat: t,
            hash: n.tabs[t].hash
        }).then(function(e) {
            var a = Ht(e, 1),
                i = a[0];
            return n.tabs[t] = Object.assign({}, r, i), n
        })
    }), t.unpinMessage = l(function(e, t) {
        var n = t.tabs[e];
        return n.data.kicked || n.data.closed ? Promise.resolve(t) : (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_unpin_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(r) {
            var a = Ht(r, 1),
                i = a[0];
            return t.tabs[e] = Object.assign({}, n, i), t
        })
    }), t.getPinnedMessage = l(function(e, t) {
        var n = t.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_pinned_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(e) {
            var r = Ht(e, 1),
                a = r[0];
            return n.pinned = a || null, t
        })
    }), t.getMessageLocalId = l(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_message_local_id",
            chat: e,
            chat_local_id: t,
            hash: r.hash
        })
    }), t.getChatDetails = l(function(e, t) {
        var n = t.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_get_chat_details",
            chat: e,
            hash: n.hash
        }).then(function(e) {
            var r = Ht(e, 1),
                a = r[0];
            return n.photoGrid = a.grid, n.photoLarge = a.photo, n.membersLastSeen = a.lastSeen || null, n.invitedByMe = a.invitedByMe || [], n.inviteLink = a.link || null, n.serverSettings = a.serverSettings || null, t
        })
    }), t.updateFlags = l(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_update_flags",
            chat: e,
            hash: r.hash,
            flags: t
        })
    }), t.removeChatPhoto = l(function(e, t) {
        var n = t.tabs[e];
        return (0, Ut.post)("al_page.php", {
            act: "owner_photo_remove",
            oid: e,
            hash: n.photoHash
        }).then(function() {
            return n.photo = null, n.photoLarge = null, t
        })
    }), t.kickUser = l(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_kick_user",
            chat: e,
            hash: r.hash,
            mid: t
        }).then(function() {
            return r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), n
        })
    }), t.toggleAdmin = l(function(e, t, n, r) {
        var a = r.tabs[e];
        return (0, Ut.post)(Ut.CONTROLLER, {
            act: "a_toggle_admin",
            chat: e,
            hash: a.hash,
            mid: t,
            is_admin: +n
        }).then(function() {
            return xt(e, t, n, r)
        })
    })
}, , function(e, t, n) {
    var r = n(20);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        throw t = Error(n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."), t.name = "Invariant Violation", t.framesToPop = 1, t
    }

    function a(e, t, n) {
        this.props = e, this.context = t, this.refs = b, this.updater = n || M
    }

    function i(e, t, n) {
        this.props = e, this.context = t, this.refs = b, this.updater = n || M
    }

    function o() {}

    function s(e, t, n) {
        this.props = e, this.context = t, this.refs = b, this.updater = n || M
    }

    function l(e, t, n) {
        var r, a = {},
            i = null,
            o = null;
        if (null != t)
            for (r in void 0 !== t.ref && (o = t.ref), void 0 !== t.key && (i = "" + t.key), t) A.call(t, r) && !x.hasOwnProperty(r) && (a[r] = t[r]);
        var s = arguments.length - 2;
        if (1 === s) a.children = n;
        else if (s > 1) {
            for (var l = Array(s), u = 0; s > u; u++) l[u] = arguments[u + 2];
            a.children = l
        }
        if (e && e.defaultProps)
            for (r in s = e.defaultProps) void 0 === a[r] && (a[r] = s[r]);
        return {
            $$typeof: C,
            type: e,
            key: i,
            ref: o,
            props: a,
            _owner: O.current
        }
    }

    function u(e) {
        return "object" == typeof e && null !== e && e.$$typeof === C
    }

    function c(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + ("" + e).replace(/[=:]/g, function(e) {
            return t[e]
        })
    }

    function d(e, t, n, r) {
        if (D.length) {
            var a = D.pop();
            return a.result = e, a.keyPrefix = t, a.func = n, a.context = r, a.count = 0, a
        }
        return {
            result: e,
            keyPrefix: t,
            func: n,
            context: r,
            count: 0
        }
    }

    function f(e) {
        e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > D.length && D.push(e)
    }

    function p(e, t, n, a) {
        var i = typeof e;
        ("undefined" === i || "boolean" === i) && (e = null);
        var o = !1;
        if (null === e) o = !0;
        else switch (i) {
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case C:
                    case E:
                    case k:
                    case S:
                        o = !0
                }
        }
        if (o) return n(a, e, "" === t ? "." + m(e, 0) : t), 1;
        if (o = 0, t = "" === t ? "." : t + ":", Array.isArray(e))
            for (var s = 0; s < e.length; s++) {
                i = e[s];
                var l = t + m(i, s);
                o += p(i, l, n, a)
            } else if (null === e || "undefined" == typeof e ? l = null : (l = I && e[I] || e["@@iterator"], l = "function" == typeof l ? l : null), "function" == typeof l)
                for (e = l.call(e), s = 0; !(i = e.next()).done;) i = i.value, l = t + m(i, s++), o += p(i, l, n, a);
            else "object" === i && (n = "" + e, r("31", "[object Object]" === n ? "object with keys {" + Object.keys(e).join(", ") + "}" : n, ""));
        return o
    }

    function m(e, t) {
        return "object" == typeof e && null !== e && null != e.key ? c(e.key) : t.toString(36)
    }

    function g(e, t) {
        e.func.call(e.context, t, e.count++)
    }

    function h(e, t, n) {
        var r = e.result,
            a = e.keyPrefix;
        e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? _(e, r, n, y.thatReturnsArgument) : null != e && (u(e) && (t = a + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(N, "$&/") + "/") + n, e = {
            $$typeof: C,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        }), r.push(e))
    }

    function _(e, t, n, r, a) {
        var i = "";
        null != n && (i = ("" + n).replace(N, "$&/") + "/"), t = d(t, i, r, a), null == e || p(e, "", h, t), f(t)
    }
    var v = n(111),
        b = n(124),
        y = n(47),
        w = "function" == typeof Symbol && Symbol["for"],
        C = w ? Symbol["for"]("react.element") : 60103,
        E = w ? Symbol["for"]("react.call") : 60104,
        k = w ? Symbol["for"]("react.return") : 60105,
        S = w ? Symbol["for"]("react.portal") : 60106,
        T = w ? Symbol["for"]("react.fragment") : 60107,
        I = "function" == typeof Symbol && Symbol.iterator,
        M = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        };
    a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
        "object" != typeof e && "function" != typeof e && null != e ? r("85") : void 0, this.updater.enqueueSetState(this, e, t, "setState")
    }, a.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    }, o.prototype = a.prototype;
    var P = i.prototype = new o;
    P.constructor = i, v(P, a.prototype), P.isPureReactComponent = !0;
    var L = s.prototype = new o;
    L.constructor = s, v(L, a.prototype), L.unstable_isAsyncReactComponent = !0, L.render = function() {
        return this.props.children
    };
    var O = {
            current: null
        },
        A = Object.prototype.hasOwnProperty,
        x = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        },
        N = /\/+/g,
        D = [],
        R = {
            Children: {
                map: function(e, t, n) {
                    if (null == e) return e;
                    var r = [];
                    return _(e, r, null, t, n), r
                },
                forEach: function(e, t, n) {
                    return null == e ? e : (t = d(null, null, t, n), null == e || p(e, "", g, t), void f(t))
                },
                count: function(e) {
                    return null == e ? 0 : p(e, "", y.thatReturnsNull, null)
                },
                toArray: function(e) {
                    var t = [];
                    return _(e, t, null, y.thatReturnsArgument), t
                },
                only: function(e) {
                    return u(e) ? void 0 : r("143"), e
                }
            },
            Component: a,
            PureComponent: i,
            unstable_AsyncComponent: s,
            Fragment: T,
            createElement: l,
            cloneElement: function(e, t, n) {
                var r = v({}, e.props),
                    a = e.key,
                    i = e.ref,
                    o = e._owner;
                if (null != t) {
                    if (void 0 !== t.ref && (i = t.ref, o = O.current), void 0 !== t.key && (a = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
                    for (l in t) A.call(t, l) && !x.hasOwnProperty(l) && (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l])
                }
                var l = arguments.length - 2;
                if (1 === l) r.children = n;
                else if (l > 1) {
                    s = Array(l);
                    for (var u = 0; l > u; u++) s[u] = arguments[u + 2];
                    r.children = s
                }
                return {
                    $$typeof: C,
                    type: e.type,
                    key: a,
                    ref: i,
                    props: r,
                    _owner: o
                }
            },
            createFactory: function(e) {
                var t = l.bind(null, e);
                return t.type = e, t
            },
            isValidElement: u,
            version: "16.2.0",
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: O,
                assign: v
            }
        },
        j = Object.freeze({
            "default": R
        }),
        B = j && R || j;
    e.exports = B["default"] ? B["default"] : B
}, function(e, t, n) {
    var r = n(104)("meta"),
        a = n(20),
        i = n(18),
        o = n(128).f,
        s = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        u = !n(157)(function() {
            return l(Object.preventExtensions({}))
        }),
        c = function(e) {
            o(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!a(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
                if (!l(e)) return "F";
                if (!t) return "E";
                c(e)
            }
            return e[r].i
        },
        f = function(e, t) {
            if (!i(e, r)) {
                if (!l(e)) return !0;
                if (!t) return !1;
                c(e)
            }
            return e[r].w
        },
        p = function(e) {
            return u && m.NEED && l(e) && !i(e, r) && c(e), e
        },
        m = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: f,
            onFreeze: p
        }
}, function(e, t, n) {
    var r = n(64),
        a = n(186),
        i = n(18),
        o = n(104)("src"),
        s = "toString",
        l = Function[s],
        u = ("" + l).split(s);
    n(41).inspectSource = function(e) {
        return l.call(e)
    }, (e.exports = function(e, t, n, s) {
        var l = "function" == typeof n;
        l && (i(n, "name") || a(n, "name", t)), e[t] !== n && (l && (i(n, o) || a(n, o, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : a(e, t, n) : (delete e[t], a(e, t, n)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[o] || l.call(this)
    })
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(194),
        c = r(u),
        d = n(55),
        f = r(d),
        p = n(140),
        m = r(p),
        g = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onConfirm = function() {
                    r.state.loading || (r.setState({
                        loading: !0
                    }), r.props.onConfirm().then(function() {
                        r.setState({
                            loading: !1
                        }), r.props.onCancel();
                    })["catch"](function() {
                        return r.setState({
                            loading: !1
                        })
                    }))
                }, r.state = {}, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props.getLang;
                return l["default"].createElement("div", {
                    className: "ChatSettingsResetInvitationLink"
                }, l["default"].createElement("div", {
                    className: "ChatSettingsResetInvitationLink__text",
                    dangerouslySetInnerHTML: {
                        __html: e("mail_chat_reset_link_warning")
                    }
                }), l["default"].createElement(m["default"], {
                    alignment: "right"
                }, l["default"].createElement(c["default"], {
                    appearance: "tertiary",
                    onClick: this.props.onCancel
                }, e("global_cancel")), l["default"].createElement(f["default"], {
                    onClick: this.onConfirm,
                    loading: this.state.loading
                }, e("mail_chat_reset_link_confirm"))))
            }, t
        }(s.Component);
    t["default"] = g
}, function(e, t, n) {
    "use strict";
    var r = n(3);
    e.exports = n(168)("Map", function(e) {
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
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ((0, _.unpackStore)(e).searchShown) return !1;
        var n = (0, _.getTab)(e, t),
            r = n && (0, _.parserMessage)(n.pinned);
        return r ? n.pinHideId != r.chat_local_id : !1
    }

    function a(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, _.getTab)(e, t),
            i = a && (0, _.parserMessage)(a.pinned);
        a && i && (a.pinHideId = i.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, a.pinHideId]), l(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 1,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "hide"))
    }

    function i(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, _.getTab)(e, t);
        a && a.pinHideId && (delete a.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, void 0]), l(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 0,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "show"))
    }

    function o(e, t, n) {
        var r = l.bind(null, n, t),
            a = (0, h.showUnpinDialog)(function() {
                a.hideProgress(), a.hide(), e.set(p.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                    return e.set(p.unpinMessage.bind(null, t))
                }).then(r)
            })
    }

    function s(e, t, n) {
        var r = e.get(),
            i = r.peer,
            o = (0, _.parserMessage)((0, _.getTab)(e, i).pinned);
        if (n.target.classList.contains(y)) o && a(e, i, t);
        else if ("A" !== n.target.tagName) {
            var s = o && o.messageId;
            if (s && !(0, h.isAlreadyDeleted)(e, i, s)) {
                var l = e.get(),
                    u = (0, _.getMessage)(e, i, s);
                u ? (e.setState({
                    msgid: s
                }), (0, v.updateLocation)({
                    msgid: s
                }), t().focusOnMessage()) : l.longpoll.push([(0, m.changePeer)(i, s)])
            } else(0, h.showPinnedBox)(e, t, i, g.mount, n);
            statlogsValueEvent("im_pinned_messages", "open")
        }
    }

    function l(e, t, n) {
        return e().updateChatTopic(t, n), (0, p.setActions)(n.get()), e().updateActions(n), n
    }

    function u(e) {
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

    function c(e) {
        return {
            unmount: function() {
                (0, f.destroyModule)(e)
            }
        }
    }

    function d(e, t, n) {
        var r = (0, f.createMutations)(c),
            a = r.bindMutations,
            i = s.bind(null, t, n),
            o = u.bind(null),
            l = (0, f.createModule)({
                handlers: function(t, n) {
                    n(e, "click", w, i), n(e, "mouseover", y, o)
                }
            });
        return a(l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isPinnedMessageVisibleInTab = r, t.pinnedMessageHide = a, t.pinnedMessageUnHide = i, t.pinnedMessageUnpin = o, t.mount = d;
    var f = n(198),
        p = n(28),
        m = n(199),
        g = n(6),
        h = n(88),
        _ = n(190),
        v = n(110),
        b = n(150),
        y = "_im_pin_hide",
        w = "_im_pinned_message"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n(180),
        u = r(l),
        c = n(92),
        d = n(190),
        f = n(28),
        p = n(103),
        m = r(p),
        g = n(183),
        h = r(g),
        _ = n(55),
        v = r(_),
        b = n(140),
        y = r(b),
        w = window,
        C = w.showFastBox,
        E = w.unclean,
        k = function() {},
        S = function(e) {
            function t(n) {
                i(this, t);
                var r = o(this, e.call(this, n));
                return r.onChange = function(e) {
                    var t = r.props.store.get(),
                        n = e.target.value;
                    (0, f.searchLocalHints)(n, t).then(r.setSearchResults.bind(r, {}, !1, n))
                }, r.onRemoveToken = function(e) {
                    return new Promise(function(t) {
                        var n = r.state.selected.filter(function(t) {
                            return t !== e
                        });
                        r.selected = n.reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {}), r.setState({
                            selected: n
                        }, t)
                    })
                }, r.onSelect = function(e) {
                    return new Promise(function(t) {
                        var n = r.selected[e] ? r.state.selected.filter(function(t) {
                            return t !== e
                        }) : [].concat(r.state.selected, e).filter(function(e, t, n) {
                            return n.indexOf(e) === t
                        });
                        r.selected = n.reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {}), r.resetSearch({
                            selected: n,
                            value: ""
                        }, t)
                    })
                }, r.onAddPeople = function() {
                    var e = r.props.store,
                        t = e.get(),
                        n = t.peer,
                        a = r.state.selected.map(function(e) {
                            return parseInt(e)
                        });
                    r.setState({
                        loading: !0
                    }), e.set(f.addNewMemberOptimisticly.bind(null, n, a)), e.set(f.addNewMember.bind(null, n, a)).then(function() {
                        return e.set(f.getChatDetails.bind(null, n)).then(function() {
                            r.selected = {}, r.resetSearch({
                                selected: [],
                                loading: !1
                            })
                        })
                    })["catch"](function(e) {
                        r.selected = {}, r.resetSearch({
                            selected: [],
                            loading: !1
                        }), C(getLang("global_error"), e)
                    })
                }, r.setSearchResults = function(e, t, n, a) {
                    var i = r.props.store,
                        o = i.get(),
                        s = (0, d.getTab)(o, o.peer),
                        l = [];
                    a.forEach(function(e) {
                        r.data[e.peerId] || (r.data[e.peerId] = e), -1 === s.memberIds.indexOf(e.peerId) && l.push(e.peerId)
                    }), r.setState(Object.assign({}, e, {
                        found: l,
                        value: n
                    }), t || k)
                }, r.state = {
                    selected: [],
                    value: "",
                    loading: !1,
                    found: []
                }, r.data = {}, r.selected = {}, r
            }
            return s(t, e), t.prototype.resetSearch = function(e, t) {
                return (0, f.searchLocalHints)("", this.props.store.get()).then(this.setSearchResults.bind(this, e, t, ""))
            }, t.prototype.componentDidMount = function() {
                this.resetSearch()
            }, t.prototype.render = function() {
                var e, t = this,
                    n = this.props.getLang,
                    r = Object.keys(this.state.selected).length,
                    i = "ChatSettingsMembers__entity";
                return u["default"].createElement("div", {
                    className: "ChatSettingsMembers"
                }, u["default"].createElement(h["default"], (e = {
                    className: "ChatSettingsMembers__multiSelect",
                    tokens: this.state.selected.map(function(e) {
                        return {
                            text: E(t.data[e].name),
                            id: e
                        }
                    }),
                    removeTokenPlaceholder: n("mail_create_chat_remove_user"),
                    onRemoveToken: this.onRemoveToken,
                    placeholder: n("mail_search_creation"),
                    value: this.state.value,
                    useInfiniteScroll: !1,
                    onChange: this.onChange,
                    onSelect: this.onSelect
                }, a(e, "useInfiniteScroll", !0), a(e, "hasMore", !1), a(e, "virtualized", !0), a(e, "loadMore", function() {}), a(e, "notFoundText", n("mail_not_found")), e), this.state.found.map(function(e) {
                    return u["default"].createElement("div", {
                        className: (0, c.classNames)(i, a({}, i + "--selected", t.selected[e])),
                        key: e,
                        "data-id": e
                    }, u["default"].createElement(m["default"], {
                        size: "34",
                        title: t.data[e].name,
                        photo: t.data[e].photo
                    }))
                })), u["default"].createElement(y["default"], {
                    alignment: "right"
                }, u["default"].createElement(v["default"], {
                    disabled: 0 === r,
                    onClick: this.onAddPeople,
                    loading: this.state.loading
                }, n(2 > r ? "mail_append_chat" : "mail_im_create_chat_with"))))
            }, t
        }(l.Component);
    t["default"] = S
}, function(e, t, n) {
    var r = n(128),
        a = n(30),
        i = n(4);
    e.exports = n(131) ? Object.defineProperties : function(e, t) {
        a(e);
        for (var n, o = i(t), s = o.length, l = 0; s > l;) r.f(e, n = o[l++], t[n]);
        return e
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        return bodyNode[e] || document.documentElement[e]
    }

    function i(e, t, n) {
        "scrollTop" === e && window.scrollTo(0, t)
    }

    function o(e, t) {
        return t.noScroll ? new c(e) : t.nativeScroll ? new l(e, t) : new u(e, t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getNativeOption = a, t.setNativeOption = i, t.createScroll = o;
    var s = n(198),
        l = function() {
            function e(t, n) {
                var a = this;
                r(this, e), this.el = t, this.opts = n, this.module = (0, s.createModule)({
                    handlers: function(e, t) {
                        e(window, "scroll", a.onScroll.bind(a)), e(window, "resize", a.resize.bind(a))
                    }
                }), this.innerHeight = window.innerHeight, this.prevScroll = this.scrollTop()
            }
            return e.prototype.update = function() {}, e.prototype.resize = function() {
                this.innerHeight = window.innerHeight
            }, e.prototype.scrollTop = function(e) {
                return "undefined" == typeof e ? a("scrollTop", this.el) : void i("scrollTop", e, this.el)
            }, e.prototype.contHeight = function() {
                return a("scrollHeight")
            }, e.prototype.smoothScroll = function(e) {
                scrollToY(e + this.scrollTop(), 300)
            }, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollBottom = function(e) {
                if ("undefined" == typeof e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                var t = this.contHeight() - e - this.getScrollHeight();
                this.scrollTop(t)
            }, e.prototype.scrollBottomFixSave = function(e) {
                this.scrollBottom(e)
            }, e.prototype.onScroll = function(e) {
                var t = this.scrollTop(),
                    n = t - this.prevScroll,
                    r = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && r - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }, e.prototype.getScrollHeight = function() {
                return this.innerHeight
            }, e.prototype.destroy = function() {
                (0, s.destroyModule)(this.module)
            }, e
        }(),
        u = function() {
            function e(t, n) {
                var a = this;
                r(this, e), this.prevTop = 0, this.scroll = new uiScroll(t, {
                    hidden: !0,
                    shadows: n.shadows,
                    stopScrollPropagation: !1,
                    theme: n.scrollTheme,
                    onmore: function() {
                        return n.more && n.more(a)
                    },
                    onscroll: function(e) {
                        var t = a.scrollTop(),
                            r = a.prevTop - t;
                        a.prevTop = t, n.scrollChange && n.scrollChange(t), n.onScroll && n.onScroll(r, a)
                    }
                })
            }
            return e.prototype.update = function() {
                this.scroll.update("sync")
            }, e.prototype.scrollTop = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollTop(e) : this.scroll.data.scrollTop
            }, e.prototype.getContainer = function() {
                return this.scroll.content
            }, e.prototype.contHeight = function() {
                return this.scroll.data.scrollHeight
            }, e.prototype.smoothScroll = function(e) {
                this.scroll.scrollTop(this.scrollTop() + e, 300)
            }, e.prototype.scrollBottom = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollBottom(e) : this.scroll.data.scrollBottom
            }, e.prototype.scrollBottomFixSave = function(e) {
                var t = this,
                    n = function() {
                        Date.now() - r < 500 && t.scroll && t.scrollBottom(e)
                    },
                    r = Date.now();
                this.scroll.emitter.addOnceListener("resize", n), this.scrollBottom(e)
            }, e.prototype.getScrollHeight = function() {
                return this.scroll.data.viewportHeight
            }, e.prototype.destroy = function() {
                this.scroll.destroy()
            }, e
        }(),
        c = function() {
            function e(t, n) {
                r(this, e), this.el = t
            }
            return e.prototype.update = function() {}, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollTop = function(e) {
                return 0
            }, e.prototype.contHeight = function() {
                return 0
            }, e.prototype.smoothScroll = function(e) {}, e.prototype.scrollBottom = function(e) {
                return 0
            }, e.prototype.scrollBottomFixSave = function(e) {}, e.prototype.getScrollHeight = function() {
                return 0
            }, e.prototype.destroy = function() {}, e
        }()
}, function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    var r = n(61)("unscopables"),
        a = Array.prototype;
    void 0 == a[r] && n(186)(a, r, {}), e.exports = function(e) {
        a[r][e] = !0
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.screenfull = function() {
        var e = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            t = function() {
                for (var e = void 0, t = void 0, n = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], r = 0, a = n.length, i = {}; a > r; r++)
                    if (e = n[r], e && e[1] in document) {
                        for (r = 0, t = e.length; t > r; r++) i[n[0][r]] = e[r];
                        return i
                    }
                return !1
            }(),
            n = {
                request: function r(n) {
                    var r = t.requestFullscreen;
                    n = n || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? n[r]() : n[r](e && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[t.exitFullscreen]()
                },
                toggle: function(e) {
                    this.isFullscreen ? this.exit() : this.request(e)
                },
                raw: t
            };
        return t ? (Object.defineProperties(n, {
            isFullscreen: {
                get: function() {
                    return Boolean(document[t.fullscreenElement])
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[t.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return Boolean(document[t.fullscreenEnabled])
                }
            }
        }), n) : !1
    }()
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return o["default"].createElement("header", {
            className: (0, l.classNames)("PopupHeader", e.className),
            style: e.style
        }, e.back && o["default"].createElement("div", {
            className: "PopupHeader__back",
            onClick: e.onBackClick
        }, o["default"].createElement("button", {
            className: "PopupHeader__backBtn",
            onClick: e.onBackClick
        }, e.back)), o["default"].createElement("h2", {
            className: "PopupHeader__title"
        }, e.title), o["default"].createElement("div", {
            className: "PopupHeader__close"
        }, o["default"].createElement("button", {
            className: "PopupHeader__closeBtn",
            onClick: e.onCloseClick
        })))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var i = n(180),
        o = r(i),
        s = n(21),
        l = (r(s), n(92));
    a.defaultProps = {
        back: null,
        title: "",
        onCloseClick: function() {}
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n(180),
        u = r(l),
        c = n(144),
        d = r(c),
        f = n(21),
        p = (r(f), n(92)),
        m = n(54),
        g = r(m),
        h = 80,
        _ = 250,
        v = function() {
            return "undefined" != typeof window
        },
        b = function(e) {
            function t(n) {
                i(this, t);
                var r = o(this, e.call(this, n));
                return r.onClick = function() {
                    if (!r.state.dropdown || r.state.dropdown.removed) {
                        var e = r.props,
                            t = e.text,
                            n = e.position,
                            a = e.align,
                            i = e.marginTop,
                            o = e.marginLeft,
                            s = (0, g["default"])(r.el);
                        r.update({
                            text: t,
                            position: n,
                            align: a,
                            rect: s,
                            marginTop: i,
                            marginLeft: o
                        })
                    } else r.update()
                }, r.onMouseEnter = function(e) {
                    r.callerHovered = !0, r.timeouts.appear = setTimeout(function() {
                        if (r.el && r.callerHovered) {
                            var e = r.props,
                                t = e.position,
                                n = e.align,
                                a = e.marginTop,
                                i = e.marginLeft,
                                o = (0, g["default"])(r.el);
                            r.update({
                                position: t,
                                align: n,
                                rect: o,
                                marginTop: a,
                                marginLeft: i
                            })
                        }
                    }, h)
                }, r.onMouseLeave = function(e) {
                    r.callerHovered = !1, r.timeouts.callerDisappear = setTimeout(function() {
                        r.callerHovered || r.hovered || r.update()
                    }, _)
                }, r.onDropdownMouseEnter = function() {
                    "hover" === r.props.trigger && (r.hovered = !0)
                }, r.onDropdownMouseLeave = function(e) {
                    "hover" === r.props.trigger && (r.hovered = !1, r.timeouts.disappear = setTimeout(function() {
                        r.callerHovered || r.hovered || r.update()
                    }, _))
                }, r.onDocumentClick = function(e) {
                    !r.state.dropdown || r.state.dropdown.removed || r.el.contains(e.target) || r.update()
                }, r.onResize = function(e) {
                    if (r.state.dropdown && !r.state.dropdown.removed) {
                        var t = r.props,
                            n = t.text,
                            a = t.position,
                            i = t.align,
                            o = t.marginTop,
                            s = t.marginLeft,
                            l = (0, g["default"])(r.el);
                        r.update({
                            text: n,
                            position: a,
                            align: i,
                            rect: l,
                            marginTop: o,
                            marginLeft: s
                        })
                    }
                }, r.onTransitionEnd = function(e) {
                    "visibility" === e.propertyName && r.state.dropdown && r.state.dropdown.removed && r.setState({
                        dropdown: void 0
                    })
                }, r.onItemClick = function(e, t) {
                    r.update(), t.onClick(e)
                }, r.state = {}, r.timeouts = {}, r
            }
            return s(t, e), t.prototype.componentDidMount = function() {
                this.el = d["default"].findDOMNode(this), "click" === this.props.trigger ? (this.el.addEventListener("click", this.onClick), document.addEventListener("mousedown", this.onDocumentClick), window.addEventListener("resize", this.onResize)) : (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave))
            }, t.prototype.componentWillUnmount = function() {
                var e = this;
                Object.keys(this.timeouts).forEach(function(t) {
                    clearTimeout(e.timeouts[t])
                }), "click" === this.props.trigger ? (this.el.removeEventListener("click", this.onClick), document.removeEventListener("mousedown", this.onDocumentClick), window.removeEventListener("resize", this.onResize)) : (this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("mouseleave", this.onMouseLeave)), this.defaultNode && (this.defaultNode.parentNode.removeChild(this.defaultNode), delete this.defaultNode)
            }, t.prototype.update = function(e) {
                if (!e) return this.setState({
                    dropdown: Object.assign({}, this.state.dropdown, {
                        removed: !0
                    })
                });
                var t = e.position,
                    n = e.align,
                    r = e.rect,
                    a = e.marginTop,
                    i = e.marginLeft,
                    o = r.left,
                    s = r.top;
                switch (t) {
                    case "t":
                        o += .5 * r.width;
                        break;
                    case "r":
                        o += r.width, s += .5 * r.height;
                        break;
                    case "b":
                        o += .5 * r.width, s += r.height;
                        break;
                    case "l":
                        s += .5 * r.height
                }
                o = Math.round(o + i), s = Math.round(s + a), this.setState({
                    dropdown: {
                        position: t,
                        align: n,
                        x: o,
                        y: s
                    }
                })
            }, t.prototype.renderDropdown = function() {
                var e = this;
                if (!this.state.dropdown) return null;
                var t = this.state.dropdown,
                    n = t.x,
                    r = t.y,
                    i = t.position,
                    o = t.align,
                    s = t.removed,
                    l = (0, p.classNames)("Dropdown", "Dropdown--" + i, a({
                        "Dropdown--removed": !!s
                    }, "Dropdown--align-" + o, "t" === i || "b" === i));
                return u["default"].createElement("div", {
                    className: l,
                    style: {
                        top: r,
                        left: n
                    },
                    onTransitionEnd: function(t) {
                        return e.onTransitionEnd(t)
                    },
                    onMouseEnter: this.onDropdownMouseEnter,
                    onMouseLeave: this.onDropdownMouseLeave
                }, u["default"].createElement("ul", {
                    className: "Dropdown__in"
                }, this.props.data.map(function(t, n) {
                    return u["default"].createElement("li", {
                        className: "Dropdown__item",
                        onClick: function(n) {
                            return e.onItemClick(n, t)
                        },
                        key: t.id || n
                    }, t.text)
                })))
            }, t.prototype.render = function() {
                var e = this.renderDropdown();
                return e ? (!this.defaultNode && v() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), u["default"].createElement(l.Fragment, null, this.props.children, d["default"].createPortal(e, this.defaultNode))) : this.props.children
            }, t
        }(l.Component);
    t["default"] = b, b.defaultProps = {
        position: "b",
        align: "center",
        marginTop: 0,
        marginLeft: 0,
        trigger: "click"
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return function() {
            return e
        }
    }
    var a = function() {};
    a.thatReturns = r, a.thatReturnsFalse = r(!1), a.thatReturnsTrue = r(!0), a.thatReturnsNull = r(null), a.thatReturnsThis = function() {
        return this
    }, a.thatReturnsArgument = function(e) {
        return e
    }, e.exports = a
}, function(e, t, n) {
    var r = n(33);
    e.exports = function(e, t, n) {
        for (var a in t) r(e, a, t[a], n);
        return e
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(92),
        c = n(109),
        d = r(c),
        f = n(123),
        p = r(f),
        m = n(26),
        g = r(m),
        h = n(145),
        _ = r(h),
        v = n(69),
        b = r(v),
        y = n(115),
        w = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onCopyInviteLink = function(e) {
                    r.input && (r.input.focus(), r.input.select(), document.execCommand("copy"), r.setState({
                        copied: !0
                    })), e.preventDefault(), e.stopPropagation()
                }, r.onBlinkTextHide = function() {
                    r.setState({
                        copied: !1
                    })
                }, r.getHiddenInput = function(e) {
                    r.input = e
                }, r.onShowInviteLink = function() {
                    (0, y.canChangeInviteLink)(r.props.store) && r.props.showInvitationLink()
                }, r.state = {
                    copied: !1
                }, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.store,
                    n = e.getLang,
                    r = t.get(),
                    a = r.tabs[r.peer],
                    i = (0, u.classNames)("ChatSettingsMenu", {
                        "ChatSettingsMenu--copied": this.state.copied
                    });
                return l["default"].createElement(p["default"], {
                    className: i
                }, (0, y.canInviteUser)(t) && l["default"].createElement(g["default"], {
                    onClick: this.props.showMembersSettings,
                    chevron: !0
                }, l["default"].createElement(b["default"], {
                    type: "plus"
                }), n("mail_settings_add_members")), l["default"].createElement(g["default"], {
                    onClick: this.props.showAttachments,
                    chevron: !0
                }, l["default"].createElement(b["default"], {
                    type: "attach"
                }), n("mail_im_show_media_history")), (a.inviteLink && (0, y.canSeeInviteLink)(t) || (0, y.canChangeInviteLink)(t)) && l["default"].createElement(g["default"], {
                    onClick: this.onShowInviteLink,
                    chevron: (0, y.canChangeInviteLink)(t)
                }, l["default"].createElement(b["default"], {
                    type: "link"
                }), n("mail_chat_invite_link"), a.inviteLink && l["default"].createElement("span", {
                    className: "ChatSettingsMenu__invite"
                }, l["default"].createElement("span", {
                    className: "ChatSettingsMenu__hidden"
                }, l["default"].createElement("input", {
                    type: "text",
                    readOnly: !0,
                    value: a.inviteLink,
                    ref: this.getHiddenInput
                })), l["default"].createElement(_["default"], {
                    className: "ChatSettingsMenu__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, n("mail_invite_link_copied")), l["default"].createElement(d["default"], {
                    className: "ChatSettingsMenu__copy",
                    onClick: this.onCopyInviteLink
                }, n("mail_get_invite_link_copy")))), (0, y.isUserOwnerInChat)(a, r.id) && l["default"].createElement(g["default"], {
                    onClick: this.props.showSettings,
                    chevron: !0
                }, l["default"].createElement(b["default"], {
                    type: "gear"
                }), n("mail_settings_options")))
            }, t
        }(s.Component);
    t["default"] = w
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

    function i(e, t, n, r, a) {
        var i = a.reduce(function(e, t) {
            return e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e
        }, {});
        Object.keys(i).forEach(function(a) {
            var o = i[a];
            e.set(oe.removeMessages.bind(null, o, a)).then(function() {
                return e.set(oe.removeMessagesMarkDeleted.bind(null, o, a))
            }).then(function() {
                return t.removeMessages(o, +a, e)
            }).then(function() {
                var i = (0, ie.getTab)(e, a),
                    s = i && o.some(function(e) {
                        return e >= i.lastmsg
                    });
                s && (0, oe.loadActualLastMessage)(e, a).then(function() {
                    n.promoteDialog(e, a), r.updateCounter(e, a), t.updateGoToEnd(e, !0)
                })
            })
        })
    }

    function o(e, t, n, r) {
        t.set(oe.updateChatPhoto.bind(null, e)).then(function() {
            var a = e.kludges.source_act;
            n.updateDialog(e.peerId, t), r.updateChatPhoto(e, a, t)
        })
    }

    function s(e, t) {
        "spam" === t ? (0, se.showSpamLayer)(e, ee.mount, {}) : "fav" === t && (0, se.showFavvedBox)(e, {}, ue.mount, {})
    }

    function l(e, t) {
        if (e.get().gid) {
            var n = t.parentNode,
                r = geByClass("_im_right_menu_counter", n),
                a = e.get().dialog_tab_cts;
            r.forEach(function(e) {
                var t = domData(e, "tab");
                val(e, a[t] || "")
            })
        }
    }

    function u(e, t, n, r) {
        e.set(oe.cancelRecording).then(function() {
            n.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(r, "im-page_history-show"), n.stopLoading(), (0, ie.isAnyMessageBeingEdited)(e) && n.cancelEditing();
        var a = e.get().peer;
        e.set(oe.changePeer.bind(null, 0, !1, !1)).then(function() {
            window.tooltips && window.tooltips.hideAll(), w(), (0, se.isClassicInterface)(e) && t.activate(), n.changePeer(e), (0, se.isClassicInterface)(e) && t.restoreScroll(e), setTimeout(function() {
                e.get().longpoll.push([Z.transitionEvent("search")])
            }, 13), (0, se.isLocksAvailable)(e) && (0, se.isPeerBlockedByMe)(a, e) && e.set(oe.releaseBlock.bind(null, a))
        })
    }

    function c(e, t, n, r, a) {
        e.forEach(function(e) {
            var a = e.kludges.source_act;
            switch (a) {
                case se.CHAT_PHOTO_REMOVE:
                case se.CHAT_PHOTO_UPDATE:
                    o(e, t, n, r)
            }
        })
    }

    function d(e, t) {
        return 2e9 > t && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
    }

    function f(e, t) {
        var n = t.flags & Z.FLAG_OUTBOUND,
            r = inArray(t.peerId, e.get().mutedPeers),
            a = t.flags & Z.FLAG_DELETED,
            i = e.get().gid;
        if (!n && !r && !a) {
            var o = d(t.subject, t.peerId) || "",
                s = (o ? o + " " : "") + t.text || "",
                l = t.userId,
                u = t.peerId,
                c = void 0,
                f = void 0,
                p = e.get().tabs[u];
            if (t.kludges && t.kludges.source_act && (s = stripHTML((0, se.renderServiceMsg)(e, t, p, !1))), (!e.get().notify_msg && !(0, se.isChatPeer)(u) || i && !e.get().mute) && window.Notifier && Notifier.playSound({
                    author_id: u
                }), !(0, se.isChatPeer)(u)) return;
            s = trim(replaceEntities(stripHTML(s.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), s = (0, K.replaceMentions)(s, function(e, t, n, r, a) {
                return a
            }), (0, se.isChatPeer)(u) ? (c = (0, de.oCacheGet)(e, l).name, p.tab && (c += " » " + p.tab), f = (0, de.oCacheGet)(e, l).photo) : (c = p.tab, f = p.photo);
            var m = t.attaches[0];
            if (m && "mail" === m.type) s += "\n[" + getLang("mail_added_msgs") + "]";
            else if (m) {
                var g = "doc" === m.type && "graffiti" === m.kind ? "graffiti" : m.type;
                s += "\n[" + getLang("mail_added_" + g) + "]"
            }
            c = trim(replaceEntities(stripHTML((c || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                id: t.messageId,
                text: s,
                author_id: u,
                title: c,
                author_photo: f
            })
        }
    }

    function p(e, t) {
        var n = e.get().longpoll.push.bind(null, [Z.resetPeer()]),
            r = function a() {
                var r = e.get().selectedMessages;
                r && r.length ? (e.setState({
                    selectedMessages: []
                }).then(function() {
                    t.changedMessageSelection(e), t.cleanSelection(r)
                }), setTimeout(function() {
                    return cancelStackPush("im_peer", a)
                }, 0)) : n()
            };
        cancelStackPush("im_peer", r)
    }

    function m(e) {
        e.set(oe.leaveInvitation)
    }

    function g(e, t) {
        var n = e.get().tabs[t.peerId],
            r = e.get().active_tab;
        return r === le.FOLDER_ALL ? !0 : (0, oe.filterFromTab)(r)(n)
    }

    function h(e) {
        var t = e.attaches.filter(function(e) {
            return "sticker" !== e.type
        });
        return (0, se.isServiceMsg)(e) || 0 === t.length
    }

    function _(e, t, n) {
        addClass(n, "im-page_history-show"), t.loadingPeer(e)
    }

    function v(e, t) {
        (0, se.isPendingForward)(e) && (cancelStackFilter("forward"), e.set(oe.forwardMessages.bind(null, e.get().pendingForward, (0, ie.getTabDraft)((0, ie.getTab)(e, t)))))
    }

    function b(e, t) {
        var n = document.querySelector(ke),
            r = (0, se.isCommunityInterface)(e) ? we : Ce,
            a = n ? n.offsetHeight : 0;
        return r += Ee, r += a, Math.floor((t.offsetHeight - r) / ve)
    }

    function y(e, t) {
        var n = b(e, t);
        if (e.get().tabbedPeers.length > n) {
            var r = e.get().tabbedPeers.filter(function(t) {
                    var n = t.peer;
                    return intval(n) !== e.get().peer
                }),
                a = r.map(function(t) {
                    var n = t.peer;
                    return e.get().tabs[n]
                }),
                i = a.sort(function(e, t) {
                    return t.last_touched - e.last_touched
                }),
                o = [];
            0 !== e.get().peer && o.push(e.get().tabs[e.get().peer]);
            var s = o.concat(i).slice(n).map(function(e) {
                    return e.peerId
                }),
                l = e.get().tabbedPeers.filter(function(e) {
                    return !inArray(e.peer, s)
                });
            return e.set(oe.updateTabbedPeers.bind(null, l, !0))
        }
        return Promise.resolve(e)
    }

    function w() {
        for (var e = curBox(); e;) e.hide(), e = curBox()
    }

    function C(e, t, n, r, a, i, o, s, l) {
        e.get().audio_msg.isRecording && e.set(oe.cancelRecording).then(function() {
            r.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.forward && r.hideFwd(e), (0, ie.isAnyMessageBeingEdited)(e) && r.cancelEditing(), (0, ie.isSearching)(e) && t.cancelSearch && (a.clearSearch(e), n.restoreDialogs(e)), E(e, s, l), _(e, r, i);
        var u = e.get().peer;
        (0, oe.updateMentions)(e.get()), (0, oe.videoAutoPlayHandler)(), (0, se.isFullyLoadedTab)(e, t.peerId) && (t.msgid && !(0, ie.getMessage)(e, t.peerId, t.msgid) || !t.msgid && !(0, ie.getMessage)(e, t.peerId, (0, ie.getTab)(e, t.peerId).lastmsg) || (0, ie.getTab)(e, t.peerId).skipped) && e.mutate(function(e) {
            return (0, ie.makeTabNotFullyLoaded)(e, t.peerId)
        });
        var c = e.set(oe.changePeer.bind(null, t.peerId, t.msgid, t.entryPoint)).then(function(e) {
            var n = e.get(),
                r = oe.loadPeer.bind(null, t.peerId, !1, t.msgid, !1, n);
            return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(r)
        }).then(function() {
            n.selectPeer(t.msgid, e), v(e, e.get().peer), window.tooltips && tooltips.hideAll(), w(), r.preparePeer(e), p(e, r), (0, se.isClassicInterface)(e) && (n.deactivate(), y(e, i).then(function() {
                return o.updateMenu(e)
            }))
        });
        return c = t.msgid ? c.then(function() {
            return e.set(oe.selectPeerOnMessage.bind(null, t.peerId === u, u))
        }) : c.then(function() {
            return e.set(oe.selectPeer.bind(null, !0))
        }), c.then(function() {
            if (e.get().peer === t.peerId) {
                if (t.forward) {
                    var n = e.get().tabs[e.get().peer];
                    !n.scrollBottom && n.unread && e.set(oe.readLastMessages.bind(null, e.get().peer))
                }(0, se.isClassicInterface)(e) && o.updateMenu(e), r.changePeer(e, !1), r.updateTyping(t.peerId, e), (0, oe.updateMentions)(e.get())
            }
        })["catch"](function(e) {
            return (0, fe.imWeirdCatch)("applyNewPeer", e)
        })
    }

    function E(e, t, n) {
        t && e.get().shown && (t.hide(e), n().createCanceled(e))
    }

    function k(e, t, n) {
        (0, ie.isSearching)(e) && (t.clearSearch(e), n.restoreDialogs(e))
    }

    function S(e, t, n, r, a, i, o) {
        (0, se.isClassicInterface)(e) && (a.saveScroll(e), i.saveScroll(e)), r.rotateCross(e), addClass(o, "im-page_creating"), e.setState({
            isCreating: !0
        }), n && n.show(e, t), (0, se.isClassicInterface)(e) && (setStyle(o, {
            height: O(o, e).page
        }), setTimeout(function() {
            addClass(o, "im-page_cropped")
        }, 200)), (0, oe.toggleConversation)(!0)
    }

    function T(e, t, n, r) {
        n && n.hide(e, t)
    }

    function I(e) {
        for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== Z.UNREAD_COUNT || t ? e[n].type === Z.UNREAD_COUNT && e.splice(n, 1) : t = !0;
        return e
    }

    function M(e, t, n, r, a) {
        r.updateChatTopic(t, e), (0, se.isClassicInterface)(e) && a.updateName(t, e), e.get().peer == t && ((0, oe.setActions)(e.get()), r.updateActions(e))
    }

    function P(e, t, n, r, i, o, d, p, v, b, w, P, L, O, A, x, N, D, R, B) {
        return {
            changePeer: function(e, n) {
                t.selectPeer(e, n)
            },
            cancelSearch: function(e) {
                k(e, r, t)
            },
            loadingPeer: function(e) {
                _(e, n, i)
            },
            restoreDialogs: function(e, n, r) {
                t.restoreDialogs(e, n, r)
            },
            focusSearch: function(e) {
                r.focusInput(e)
            },
            appendSearch: function(e, n, r, a) {
                t.appendSearch(e, n, r, a)
            },
            appendDialogs: function(e, n) {
                t.appendDialogs(e, n)
            },
            showCreation: function(e, a) {
                S(e, a, b, r, t, n, i)
            },
            updateState: function(e, r) {
                t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
            },
            appendFastDialogs: function(e, n) {
                t.appendFastDialogs(e, n, !0)
            },
            createCanceled: function(e, a) {
                r.createCanceled(e, a), (0, se.isClassicInterface)(e) ? (setStyle(i, {
                    height: "auto"
                }), removeClass(i, "im-page_cropped"), setTimeout(function() {
                    return r.focusInput(e)
                }, 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(function() {
                    0 === e.get().peer ? r.focusInput(e) : n.focustTxt(e)
                }, 0), removeClass(i, "im-page_creating"), e.setState({
                    isCreating: !1
                })
            },
            updateMenu: function(e) {
                x && x.updateMenu(e)
            },
            hideFwd: function(e) {
                n.hideFwd(e)
            },
            goToHistoryEnd: function() {
                n.goToEnd()
            },
            updateDialog: function(e, n) {
                t.updateDialog(e, n)
            },
            focusTxt: function(e) {
                n.focustTxt(e)
            },
            resync: function(e) {
                (0, ie.isSearching)(e) && r.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), b && b.hide(e), (0, se.isCommunityInterface)(e) && l(e, i), (0, se.isClassicInterface)(e) && e.get().tabbedPeers.forEach(function(t) {
                    var n = t.peer;
                    x.updateCounter(e, n), x.updateName(n, e)
                }), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), (0, se.isReservedPeer)(e.get().peer) || n.changePeer(e, !1);
                var a = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                handlePageCount(a, e.get().unread_cnt)
            },
            toggleSettingsLoader: function(e, t) {
                w.toggleLoader(e, t)
            },
            onUserActions: function(e, t) {
                if (!(0, oe.isSearchingInplace)(e.get().peer, e.get())) {
                    var r = e.get(),
                        a = r.peer;
                    if ((0, se.isFullyLoadedTab)(r, a) && !o.is_idle) {
                        var i = (0, ie.countUnread)(e.get().peer, e.get());
                        if (i > 0) {
                            var s = r.tabs[a];
                            !s.skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(oe.readLastMessages.bind(null, a)))
                        }
                    }
                }
            },
            removeSelection: function(e) {
                t.removeSelection(e), r.focusInput(e)
            },
            route: function(e, a, o, l) {
                if ("undefined" != typeof e[0]) return !0;
                e.box && (e = {
                    box: e.box
                });
                var u = !1;
                return e.invite_chat_id && o.invite_hash ? !0 : (l && l.params && "left_nav" === l.params._ref && "undefined" == typeof e.sel && t.scrollUp(!0, !0), Object.keys(e).sort().forEach(function(e) {
                    switch (e) {
                        case "sel":
                            o.q || (u = !0);
                            var c = o.sel ? (0, se.unUrlPeer)(o.sel) : 0,
                                d = l.back;
                            0 === c ? P.get().longpoll.push([Z.resetPeer(!1, d)]) : c !== P.get().peer && P.get().longpoll.push([Z.changePeer(c, o.msgid || !1)]);
                            break;
                        case "invite_chat_id":
                        case "invite_hash":
                            m(P);
                            break;
                        case "tab":
                            E(P, b, v), u = !0;
                            var f = o.tab || le.FOLDER_ALL;
                            P.get().longpoll.push([Z.changeTab(f)]);
                            break;
                        case "act":
                            o.act && "create" === o.act ? S(P, [], b, r, t, n, i) : T(P, [], b, i);
                            break;
                        case "st":
                            o.st && o.sel ? (curBox() && curBox().hide(), P.mutate(oe.setInplaceSearch.bind(null, unescape(o.st), o.sel)), n.startSearch(P)) : (P.mutate(oe.cancelSearch.bind(null, a.sel)), n.cancelSearch(P, !0));
                            break;
                        case "q":
                            o.q ? (curBox() && curBox().hide(), r.setSearch(P, o.q, !0)) : r.clearSearch(P);
                            break;
                        case "box":
                            s(P, o.box)
                    }
                }), (0, se.isClassicInterface)(P) && "undefined" == typeof e.sel && x.updateMenu(P), u && k(P, r, t), !1)
            },
            updateDialogFilters: function(e) {
                (0, ie.isSearching)(e) || t.restoreDialogs(e), w.updateFilter(e)
            },
            removePeer: function(e, n) {
                t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([Z.resetPeer()]), (0, se.isClassicInterface)(e) && x.updateMenu(e)
            },
            newMessage: function(e) {
                (0, se.isClassicInterface)(e) || t.scrollUp(!0)
            },
            onEvents: function(e, o) {
                var s = I(o.filter(function(e) {
                        return e.type !== Z.ADD_MESSAGE || !(e.flags & Z.FLAG_STEALTH)
                    })),
                    m = o.filter(se.isServiceMsg),
                    _ = o.filter(function(e) {
                        return e.type === Z.ADD_MESSAGE
                    });
                c(m, e, t, n, x);
                var E = (0, oe.checkNewPeople)(m, _, e),
                    S = Promise.resolve();
                E.shouldLoad && (S = e.set(oe.loadNewPeople.bind(null, E, d))), S.then(function() {
                    s.forEach(function(o) {
                        switch (o.type) {
                            case Z.ADD_MESSAGE:
                                var s = e.get().tabs[e.get().peer],
                                    c = !s || !s.msgs || 0 == s.msgs.length,
                                    d = (0, se.isDuplicate)(o, e.get()),
                                    m = (0, ie.isCommunityBlocked)(e, o.peerId);
                                if (0 === d) {
                                    o.flags & Z.FLAG_OUTBOUND || e.set(oe.updateFavAndTitle.bind(null, o.peerId, !0)), e.set(oe.addMessage.bind(null, o)), y(e, i), g(e, o) && (f(e, o), t.updateTyping(o.peerId, e), (0, ie.isSearching)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o.peerId));
                                    var _ = (0, ie.isCommunityBlocked)(e, o.peerId);
                                    _ === !1 && m === !0 && n.updateActions(e), (0, se.isClassicInterface)(e) && (x.updateCounter(e, o.peerId), x.updateMenu(e)), n.updateTyping(o.peerId, e), n.addMessage(e, o), (0, se.isClassicInterface)(e) || w.updateFilter(e), h(o) || !(0, se.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(oe.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o), (0, oe.videoAutoPlayHandler)()
                                    })
                                } else 2 === d ? (h(o) || e.set(oe.loadMedia.bind(null, o)).then(function(e) {
                                    n.replaceAttachmentPlaceholders(e, o)
                                }), e.set(oe.replaceMessage.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e)) : (0, ie.isSearching)(e) || t.promoteDialog(e, o.peerId);
                                s && c && B();
                                break;
                            case Z.EDIT_MESSAGE:
                                e.set(oe.editMessage.bind(null, o)).then(function(e) {
                                    t.updateDialog(o.peerId, e), n.updateTyping(o.peerId, e), n.editMessage(e, o), h(o) || !(0, se.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(oe.loadMedia.bind(null, o)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    })
                                });
                                break;
                            case Z.READ_INBOUND:
                                e.set(oe.markInboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o.peerId), n.updateGoToEnd(e, !0), (0, se.isClassicInterface)(e) && x.updateCounter(e, o.peerId), (0, ie.isSearching)(e) || t.restoreDialogs(e), w.updateFilter(e)
                                });
                                break;
                            case Z.READ_OUTBOUND:
                                e.set(oe.markOutboundMessagesAsRead.bind(null, o)).then(function(e) {
                                    t.updateCounter(e, o.peerId), n.markMessagesAsRead(e, o)
                                });
                                break;
                            case Z.UNREAD_COUNT:
                                e.set(oe.updateUnreadCount.bind(null, o.count)).then(function() {
                                    var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                    handlePageCount(t, o.count), w.updateFilter(e), (0, se.isClassicInterface)(e) && l(e, i)
                                });
                                break;
                            case Z.GOT_ONLINE:
                            case Z.GOT_OFFLINE:
                                var E = o.type === Z.GOT_ONLINE;
                                e.set(oe.updateOnline.bind(null, o.userId, E ? o.platform : !1, o.lastSeenTs)).then(function(e) {
                                    (0, se.isTabLoaded)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                });
                                break;
                            case Z.SET_FLAGS:
                            case Z.RESET_FLAGS:
                                if (o.flags & Z.FLAG_DELETED && o.type === Z.SET_FLAGS && !(0, se.isAlreadyDeleted)(e, o.peerId, o.messageId) && !e.get().blockedFlagUpdates[o.peerId] && p(o), o.flags === Z.FLAG_IMPORTANT) {
                                    var S = o.type === Z.SET_FLAGS;
                                    e.set(oe.updateImportant.bind(null, S ? 1 : -1, o.messageId)).then(function() {
                                        (0, se.isClassicInterface)(e) || r.updateImportantCnt(e)
                                    }), e.set(oe.updateFavMessage.bind(null, [o.messageId], o.peerId, S)).then(function(t) {
                                        n.markImportant(o.messageId, S, e)
                                    })
                                }
                                break;
                            case Z.TYPING:
                                (0, se.isSelfMessage)(o.peerId, e.get().gid) || (e.set(oe.setTyping.bind(null, o)).then(function(e) {
                                    (0, se.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o.peerId, e), t.updateTyping(o.peerId, e))
                                }), e.set(oe.waitTyping.bind(null, o.peerId)).then(function(e) {
                                    (0, se.isTabLoaded)(e.get(), o.peerId) && (n.updateTyping(o.peerId, e), t.updateTyping(o.peerId, e))
                                }));
                                break;
                            case Z.NOTIFY_SETTINGS_CHANGED:
                                j(e, v, o.peerId, 0 !== o.disabledUntil);
                                break;
                            case Z.RESYNC:
                                e.get().longpoll.pause(), e.set(oe.resync).then(v().resync).then(function() {
                                    return e.get().longpoll.resume()
                                });
                                break;
                            case Z.TRANSITION:
                                L.transition(o.state);
                                break;
                            case Z.RESET_PEER:
                                if (o.removeActivePeer) {
                                    var T = e.get().tabbedPeers.filter(function(t) {
                                        var n = t.peer,
                                            r = t.type;
                                        return n !== e.get().peer && "perm" === r
                                    });
                                    e.setState({
                                        tabbedPeers: T
                                    })
                                }
                                u(e, t, n, i), o.cancelSearch && k(e, r, t), (0, se.isClassicInterface)(e) && x.updateMenu(e), r.focusInput(e);
                                break;
                            case Z.CHANGE_TAB:
                                (0, se.changeTab)(o.tab, e, v, oe.changeDialogsTab).then(function(e) {
                                    w.updateFilter(e)
                                });
                                break;
                            case Z.RESET_DIRECTORIES:
                            case Z.SET_DIRECTORIES:
                            case Z.REPLACE_DIRECTORIES:
                                if (o.mask === Z.FOLDER_HAS_BANNER) break;
                                e.set(oe.updateFolderState.bind(null, o.peerId, o.mask, o.type, o.local)).then(function(e) {
                                    (0, ie.isSearching)(e) || o.type === Z.RESET_DIRECTORIES && o.mask === Z.FOLDER_IMPORTANT || o.type === Z.REPLACE_DIRECTORIES || t.restoreDialogs(e), t.updateDialog(o.peerId, e), l(e, i), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                });
                                break;
                            case Z.DELETE_DIALOG:
                                e.set(oe.deletedDialog.bind(null, o.peerId, Promise.resolve([]))).then(function() {
                                    v().removePeer(e, o.peerId), v().updateDialogFilters(e)
                                });
                                break;
                            case Z.CHANGE_PEER:
                                C(e, o, t, n, r, i, x, b, v);
                                break;
                            case Z.MUTEX:
                                var I = a({}, o.peerId, o),
                                    M = (0, se.isPeerBlocked)(o.peerId, e);
                                e.set(oe.updateBlockStates.bind(null, I)).then(function() {
                                    t.updateDialog(o.peerId, e);
                                    var r = (0, se.isPeerBlocked)(o.peerId, e);
                                    (0, se.isFullyLoadedTab)(e.get(), o.peerId) && M !== r && n.updateChat(e, o.peerId)
                                });
                                break;
                            case Z.FAILED_MESSAGE:
                                e.set(oe.setMessageErrored.bind(null, o.peer, o.message)).then(function() {
                                    n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                });
                                break;
                            case Z.RESEND:
                                var P = o.message.messageId;
                                e.set(oe.resendMessage.bind(null, o.peerId, P, o.message)).then(function() {
                                    n.resendMessage(o.peerId, P), t.promoteDialog(e, o.peerId)
                                });
                                break;
                            case Z.CONVERSATION_UPDATED:
                                if ((0, se.isTabLoaded)(e.get(), o.peerId)) {
                                    var O = (0, pe.handleEventChatUpdated)(e, o.peerId, o.updateType, o.updateArg, n, t);
                                    O || v().reloadChatInfo(o.peerId)
                                }
                        }
                    })
                })
            },
            updateHistory: function(e) {
                return n.updateHistory(e)
            },
            reloadChatInfo: function(e) {
                (0, se.isTabLoaded)(P.get(), e) && P.set(oe.loadChatInfo.bind(null, e)).then(function() {
                    return M(P, e, t, n, x)
                })
            },
            cancelRecording: function() {
                return P.set(oe.cancelRecording).then(function() {
                    return n.cancelRecording()
                })
            },
            fixHeight: function() {
                B()
            },
            unmount: function() {
                (0, Y.destroyModule)(e), clearInterval(P.get().update_title_to), o.stop(), d.stop(), t.unmount();
                var a = window.devicePixelRatio >= 2 ? "_2x" : "";
                setFavIcon("/images/icons/favicons/fav_logo" + a + ".ico"), n.unmount(), r.unmount(), cancelStackFilter("im_peer"), w.unmount(), b && b.unmount(), x && x.unmount(), N && N(), O && O(), (0, se.isLocksAvailable)(P) && P.get().peer && P.set(oe.releaseBlock.bind(null, P.get().peer)), D.unmount(), x && x.unmount(), R.unmount(), clearInterval(A), cur.imDb.unmount(), cur.imDb = !1
            }
        }
    }

    function L(e, t, n, r) {
        var a = t.get();
        (0, se.isReservedPeer)(a.peer) || e().onUserActions(t, r), a.update_old_title && t.set(oe.updateFavAndTitle.bind(null, !1, !1))
    }

    function O(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_page_history", e),
            a = window.clientHeight() - n.offsetHeight - me - 2,
            i = (0, se.isClassicInterface)(t) ? _e : he,
            o = {
                page: Math.max(a, i)
            };
        if ((0, se.isClassicInterface)(t)) {
            var s = (0, se.getClassicChatHeight)();
            s = s > 0 ? Math.min(s - n.offsetHeight - me - 2, a) : a;
            var l = hasClass(r, "im-page--history_empty-hist") ? s : a;
            o.history = Math.max(s, i), o.chat = Math.max(l, i)
        }
        return o
    }

    function A(e, t, n, r, a) {
        var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !1;
        if (!isFullScreen()) {
            var s = O(e, t);
            if (setStyle(e, {
                    minHeight: s.page
                }), (0, se.isClassicInterface)(t) && ("undefined" == typeof t.get().chatResizeInitialized && t.set(oe.initializeChatResize), setStyle(e, {
                    height: t.get().isCreating ? s.page : "auto"
                }), setStyle(geByClass1("_im_page_dialogs", e), {
                    minHeight: s.page,
                    position: "static",
                    top: 0
                }), setStyle(geByClass1("_im_page_history", e), {
                    minHeight: s.history,
                    position: "relative",
                    top: 0
                }), setStyle(geByClass1("_im_chat_body_abs", e), {
                    minHeight: s.chat,
                    height: s.chat,
                    position: "relative",
                    top: 0
                })), browser.safari && o && "function" == typeof o && o(), r && r.updateScroll(), a && a.updateScroll(), n) {
                var l = n.updateScroll();
                n.scrollFix(t, t.get().peer, l)
            }
            i && setTimeout(function() {
                return A(e, t, n, r, a, !1)
            }, 100)
        }
    }

    function x(e) {
        var t = "safari-repaint";
        e.forEach(function(e) {
            hasClass(e, t) && removeClass(e, t), addClass(e, t)
        }), setTimeout(function() {
            e.forEach(function(e) {
                removeClass(e, t)
            })
        }, 100)
    }

    function N() {
        var e = [geByClass1("_im_dialog_actions"), geByClass1("_im_chat_input_w"), ge("side_bar"), geByClass1("_im_right_menu"), geByClass1("_im_dialogs_settings"), geByClass1("_im_dialogs_search")];
        x(e)
    }

    function D(e, t, n, r) {
        function i() {
            var t = (0, W.getNativeOption)("scrollLeft"),
                n = hasClass(e, "im-page--header_static"),
                r = [];
            u !== t ? r = l.slice().concat([e]) : n !== c && (r = [e]), u = t, c = n, r.length > 0 && r.forEach(function(r) {
                var i = e === r && n ? 0 : -t;
                setStyle(r, a({}, cssTransformProp, 0 === i ? "unset" : "translateX(" + i + "px)"))
            })
        }
        if (browser.mobile) return !1;
        var o = geByClass1("_im_chat_input_w", r),
            s = geByClass1("_im_dialog_actions", r),
            l = [t, n, o, s],
            u = null,
            c = hasClass(e, "im-page--header_static"),
            d = ge("im-group-online-disabled-notice");
        return d && l.push(d), l = l.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", i), i(),
            function() {
                removeEvent(window, "scroll", i)
            }
    }

    function R(e) {
        var t = e.get();
        if (!(0, se.isLocksAvailable)(e)) return null;
        var n = (0, J.createWorker)(t.mutex_key, function(e) {
                t.longpoll.push([Z.mutexEvent(e)])
            }, function(e, n) {
                return (0, oe.getMutexQueue)(t.gid).then(function(e) {
                    var t = F(e, 1),
                        n = t[0];
                    return n
                })
            }),
            r = n.stop;
        return r
    }

    function j(e, t, n, r) {
        e.set(oe.setMutedPeer.bind(null, n, r)).then(t().updateState.bind(null, n))
    }

    function B(e, t) {
        var n = t.get(),
            r = void 0,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), A(e, t, !1, !1, !1, !0), show(e);
        var o = (0, Y.createMutations)(P),
            l = o.callMutations,
            u = o.bindMutations,
            c = (0, $.startLongPoll)(n);
        c.on("data", function() {
            for (var e = arguments.length, n = Array(e), r = 0; e > r; r++) n[r] = arguments[r];
            return l().onEvents(t, n)
        });
        var d = geByClass1("_im_dialogs_search", e),
            f = geByClass1("_im_dialogs_settings", e),
            m = (0, H.mount)(geByClass1("_im_page_dcontent", e), t, l),
            g = (0, U.mount)(geByClass1("_im_page_history", e), t, l),
            h = (0, z.mount)(d, t, l),
            _ = (0, G.mount)(f, t, l),
            v = (0, ne.mount)(t);
        cur.imDb = (0, re.mount)(t.get().gid ? -t.get().gid : vk.id), t.set(oe.preloadSearchIndex.bind(null, cur.imDb)), (0, se.isClassicInterface)(t) && _.updateSettings(t);
        var b = void 0,
            y = void 0;
        if ((0, se.isClassicInterface)(t)) {
            var w = geByClass1("_im_ui_peers_list", e.parentNode);
            b = (0, te.mount)(w, t, l), y = D(d, f, geByClass1("_im_right_menu", e.parentNode), e)
        }(0, se.isClassicInterface)(t) && n.peer && m.deactivate(), n.gid || (r = (0, V.mount)(geByClass1("_im_dialogs_creation", e), t, l));
        var C = n.isCreating,
            E = C ? "create" : 0 === n.peer ? "search" : "default";
        C && r.show(t, []);
        var k = (0, Q.create)(t, E, m, g, h, r),
            S = (0, ce.mount)(t, k);
        g.updateScroll();
        var T = L.bind(null, l, t, k);
        (0, se.isReservedPeer)(n.peer) || setTimeout(function() {
            return p(t, g)
        }, 10);
        var I = new IdleManager({
                id: "im",
                element: document,
                focusElement: window,
                triggerEvents: "mouseover mousedown keypress"
            }),
            M = debounce(N, 300),
            O = A.bind(null, e, t, g, m, r, !1, M);
        t.setState({
            longpoll: c
        }), t.set(oe.setExecStack.bind(null, [])), I.on("unidle", function() {
            c.abortPauses(), T()
        }), I.start(), nav.objLoc.box && (s(t, nav.objLoc.box), (0, q.updateLocation)({
            box: null
        }));
        var x = R(t),
            j = void 0;
        (0, se.isLocksAvailable)(t) && (j = setInterval(se.blockLatencyCompensation.bind(null, t, n.longpoll), 2e3)), t.get().invitation && (0, se.showInvitationBox)(t, t.get().invitation, oe.leaveInvitation);
        var B = (0, ae.throttleAccumulate)(i.bind(null, t, g, m, b), 200),
            F = se.hideTopNotice.bind(null, t),
            W = se.hideAsideNotice.bind(null, t),
            K = (0, Y.createModule)({
                handlers: function(t, n) {
                    t(document, "mousemove mousedown keypress", T), t(window, "resize", O), n(e, "click", se.HIDE_TOP_NOTICE_CLASS, F), n(gpeByClass("_im-page-wrap", e), "click", se.HIDE_ASIDE_NOTICE_CLASS, W), n(gpeByClass("_im-page-wrap", e), "click", se.HIDE_ASIDE_PROMO_BLOCK_CLASS, se.hideAsidePromoBlock), n(gpeByClass("_im-page-wrap", e), "click", se.INSTALL_VKADMIN_LINK, se.installVKAdminApp), browser.safari && t(document, "visibilitychange", N)
                }
            });
        return u(K, m, g, h, e, I, c, B, l, r, _, t, k, x, j, b, y, v, S, O)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var F = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.mount = B;
    var H = n(156),
        U = n(173),
        z = n(0),
        G = n(138),
        V = n(95),
        q = n(110),
        W = n(40),
        K = n(82),
        Y = n(198),
        Q = n(160),
        $ = n(197),
        X = n(199),
        Z = r(X),
        J = n(8),
        ee = n(146),
        te = n(206),
        ne = n(75),
        re = n(150),
        ae = n(23),
        ie = n(190),
        oe = n(28),
        se = n(88),
        le = n(94),
        ue = n(84),
        ce = n(24),
        de = n(121),
        fe = n(12),
        pe = n(99),
        me = 30,
        he = 400,
        _e = 250,
        ve = 32,
        be = 12,
        ye = 52,
        we = 5 * ve + 2 * be + ye,
        Ce = 3 * ve + 2 * be,
        Ee = 10,
        ke = "._im_aside_notice"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(21),
        c = (r(u), n(92)),
        d = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                f.call(r);
                var o = r.getChildrenArray(n)[0];
                return r.refsStore = {}, r.state = {
                    isAnimating: !1,
                    active: o && (o.key || 0)
                }, r
            }
            return o(t, e), t.prototype.getTransform = function(e) {
                var t = e.offsetWidth,
                    n = e.offsetLeft - 50 + .5 * t;
                return "translateX(" + n + "px) scaleX(" + t / 100 + ")"
            }, t.prototype.componentDidMount = function() {
                var e = this.refsStore[this.state.active];
                this.setState({
                    transform: this.getTransform(e)
                })
            }, t.prototype.render = function() {
                var e = this,
                    t = {
                        "Tabs--animating": this.state.isAnimating
                    };
                return l["default"].createElement("nav", {
                    className: (0, c.classNames)("Tabs", this.props.className, t),
                    style: this.props.style
                }, l["default"].createElement("ul", {
                    className: "Tabs__list"
                }, this.props.children.map(function(t, n) {
                    return l["default"].createElement("li", {
                        className: (0, c.classNames)("Tabs__item", {
                            "Tabs__item--active": e.state.active === (t.key || n)
                        }),
                        onClick: function(r) {
                            return e.onClick(r, t.key || n)
                        },
                        ref: function(r) {
                            return e.getRef(t.key || n, r)
                        },
                        key: t.key || n
                    }, t)
                })), l["default"].createElement("div", {
                    style: {
                        transform: this.state.transform
                    },
                    className: "Tabs__divider",
                    onTransitionEnd: this.onTransitionEnd
                }))
            }, t
        }(s.Component),
        f = function() {
            var e = this;
            this.getChildrenArray = function(e) {
                return [].concat(e.children)
            }, this.onClick = function(t, n) {
                if (n !== e.state.active) {
                    var r = e.refsStore[n],
                        a = e.getTransform(r);
                    e.setState({
                        active: n,
                        isAnimating: !0,
                        transform: a
                    }), e.props.onTabClick(t, n)
                }
            }, this.onTransitionEnd = function(t) {
                "transform" === t.propertyName && e.setState({
                    isAnimating: !1
                })
            }, this.getRef = function(t, n) {
                e.refsStore[t] = n
            }
        };
    t["default"] = d, d.defaultProps = {
        onTabClick: function() {}
    }
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.getBoundingClientRect(),
            n = document.body,
            r = document.documentElement,
            a = window.pageYOffset || r.scrollTop || n.scrollTop,
            i = window.pageXOffset || r.scrollLeft || n.scrollLeft,
            o = r.clientTop || n.clientTop || 0,
            s = r.clientLeft || n.clientLeft || 0;
        return {
            top: Math.round(t.top + a - o),
            left: Math.round(t.left + i - s),
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(57)),
        f = r(d),
        p = n(92),
        m = n(143),
        g = r(m),
        h = n(194),
        _ = r(h),
        v = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.needRecalcSize = !1, r.state = {}, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = (0, f["default"])(e, ["className", "loading"]),
                    n = (0, p.classNames)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": e.loading
                    }, e.className);
                return u["default"].createElement(_["default"], s({}, t, {
                    className: n
                }), u["default"].createElement("span", {
                    className: "ButtonWithProgress__content"
                }, e.children), e.loading && u["default"].createElement(g["default"], {
                    inverted: "primary" === e.appearance,
                    className: "ButtonWithProgress__progress"
                }))
            }, t
        }(l.Component);
    t["default"] = v, v.defaultProps = {
        appearance: "primary",
        size: "m",
        wide: !1,
        loading: !1
    }
}, function(e, t, n) {
    e.exports = n(59)
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = Object.assign({}, e);
        return t.forEach(function(e) {
            return delete n[e]
        }), n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e && t ? e === t ? !0 : a(e) ? !1 : a(t) ? r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(16 & e.compareDocumentPosition(t)) : !1 : !1
    }
    var a = n(207);
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    n(137), n(166);
    var a = n(51),
        i = n(5),
        o = n(112),
        s = r(o),
        l = n(167),
        u = n(199),
        c = n(28),
        d = n(121),
        f = n(88),
        p = n(12),
        m = n(65);
    window.IM = {
        init: function(e) {
            if (window.imwl = e.imwl, (0, p.startLoggingAllUnhandled)(), addTemplates(m), window.Promise || (window.Promise = l.Promise), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.failed) return (0, i.mount)(geByClass1("im-sick", ge("page_body")), null);
            localStorage.removeItem("im_sick_timer"), e.tabbedPeers = (e.tabbedPeers || []).map(function(e) {
                return {
                    peer: e,
                    type: "perm"
                }
            }), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                blacklist_hash: e.thash
            };
            var t = 60 * (new Date).getTimezoneOffset(),
                n = -10800,
                r = n - t,
                o = e.timeshift;
            e.timeshift = o - r, e.oCache = {};
            var g = (0, s["default"])(e);
            e.owners.forEach(function(e) {
                return (0, d.oCacheAdd)(g, e)
            }), e.owners = void 0, (0, f.normalizeTabsGotFromServer)(g, g.get().tabs), window.store = g, cur.imClassicInterface = (0, f.isClassicInterface)(g);
            var h = (0, a.mount)(geByClass1("js-im-page", ge("page_body")), g);
            (0, c.updateMentions)(g.get()), window.IMBRIDGE = {
                chatPhotoSaved: function(e) {
                    curBox() && curBox().hide();
                    var t = (e || {})[1];
                    return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || g.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                },
                updateHistory: function(e) {
                    g.set(c.updateHistory.bind(null, e)).then(function() {
                        h.updateHistory(e)
                    })
                },
                activateTab: function(e) {
                    g.get().longpoll.push([(0, u.changePeer)(intval(e), !1, !1, !0)])
                }
            };
            var _ = !1;
            cur.nav.push(function() {
                if (_) return !0;
                g.get().audio_msg && g.get().audio_msg.isRecording && h.cancelRecording(), AudioMessagePlayer.detachPlayer();
                var t = h.route.apply(null, arguments);
                return t !== !1 && (h.unmount(), window.IMBRIDGE = void 0, g.unmount(), window.store = void 0, _ = !0, e = !1, g = !1, h = !1, (0, p.stopLoggingAllUnhandled)()), t
            })
        }
    };
    try {
        stManager.done("imn.js")
    } catch (g) {}
}, function(e, t, n) {
    "use strict";

    function r(e) {
        try {
            e.focus()
        } catch (t) {}
    }
    e.exports = r
}, function(e, t, n) {
    var r = n(202)("wks"),
        a = n(104),
        i = n(64).Symbol,
        o = "function" == typeof i;
    e.exports = function(e) {
        return r[e] || (r[e] = o && i[e] || (o ? i : a)("Symbol." + e))
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(57)),
        f = r(d),
        p = n(92),
        m = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onChange = function(e) {
                    r.isControlledOutside || r.setState({
                        value: e.target.value
                    }), r.props.onChange && r.props.onChange(e)
                }, r.getRef = function(e) {
                    r.element = e
                }, "undefined" != typeof n.value ? r.isControlledOutside = !0 : r.state = {
                    value: n.initialValue || ""
                }, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.alignment,
                    n = e.value,
                    r = {
                        "Input--left": "left" === t,
                        "Input--center": "center" === t,
                        "Input--right": "right" === t
                    };
                return u["default"].createElement("input", s({}, (0, f["default"])(this.props, ["onChange", "initialValue", "alignment", "className"]), {
                    className: (0, p.classNames)("Input", r, this.props.className),
                    ref: this.getRef,
                    value: this.isControlledOutside ? n : this.state.value,
                    onChange: this.onChange
                }))
            }, t
        }(l.Component);
    t["default"] = m, m.defaultProps = {
        type: "text",
        initialValue: "",
        alignment: "left"
    }
}, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t) {
    e.exports = {
        im_img_prebody: '<div class="im-prebody"> <img alt="" src="%photo%" /> </div>',
        im_admin_link: ' (<a href="%href%" class="_im_admin_name" target="_blank">%name%</a>)',
        im_right_menu_tpl: '<a id="ui_rmenu_peer_%peer%" href="%href%" class="_im_peer_tab ui_rmenu_item %cls%"%attrs%>\n  <span>%label%</span>\n</a>',
        im_right_menu_sep: '<div class="ui_rmenu_sep"></div>',
        im_right_menu_ct: '<span class="ui_rmenu_count im-right-menu--count _im_r_ct">%count%</span> <button type="button" class="im-right-menu--close _im_r_cl"></button><span class="im-right-menu--text _im_r_tx">%name%</span>',
        im_dialogs_link_img: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank"><div class="im_grid">%photo%</div></a>',
        im_dialogs_link: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank">%photo%</a>',
        im_peer_photo: '<div class="nim-peer %online_class% %modifier_class%"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> %owner_photo% </div> </div> </div>',
        im_owner_item: '<a href="%link%" class="olist_item_wrap%cls%" id="olist_item_wrap%owner_id%" >\n  <div class="olist_item clear_fix">\n    <div class="olist_item_photo_wrap %img_cls%">\n      <img class="olist_item_photo" src="%photo%"/>\n    </div>\n    <div class="olist_item_name">%name%</div>\n    <div class="olist_checkbox"></div>\n  </div>\n</a>',
        im_simple_name: '<div class="im-page--title %more_cls%"> <span class="im-page--title-main" title="%name_attr%" %ads_union%><span class="im-page--title-main-in"><a href="%href%" target="_blank" class="im-page--title-main-inner _im_page_peer_name">%name%</a><span class="im-page--title-main-verified _im_chat_verified"></span></span></span> <span class="im-page--title-meta _im_page_peer_online">%online%</span> </div>',
        im_simple_link: '<a href="%href%" class="_im_header_link" target="_blank">%content%</a>',
        im_selected_messages: '<span class="im-page--selected-messages-count">%label%</span> <button aria-label="%tip%" type="button" class="im-page--selected-messages-remove"></button>',
        im_topic: "<div class='im-topic %cls%'>%topic%</div>",
        im_stack_date: ' <a href="%link%" class="_im_mess_link" >%date%</a>',
        im_dialogs_none: '<li data-list-id="002300" class="im-page--dialogs-empty"> %msg%</li>',
        im_filter: '<a class="im-page--dialogs-filter %cls%">%filter%</a>',
        im_drow_prebody: '<span class="nim-dialog--who">%prebody%</span> <span class="nim-dialog--inner-text">%body%</span>',
        im_attach_mess: ' <div class="im-fwd %modifier%"> <span class="im-fwd--title"> <span class="im-fwd--title-name">%text%</span> <span class="im-fwd--date">%date%</span></span> <span class="im-fwd--close _im_fwd_close"></span> <div rel="button" tab-index="0" type="button" class="im-fwd--messages _im_will_fwd">%messages%</div> </div>',
        im_preloader: '<div class="im-preloader %cls%"> %preloader%</div>',
        im_service_row: '<ul class="ui_clean_list"> <li class="im-mess im-mess_srv _im_mess _im_mess_srv _im_mess_%message_id%" data-msgid="%message_id%" data-from="%from_id%" data-ts="%date%"> <div class="im-mess--text">%text%</div> </li> </ul>',
        im_chat_members: '<button type="button" class="_im_chat_members im-page--members">%name%</button>',
        im_mess_stack: '<div class="im-mess-stack _im_mess_stack %cls%" data-peer="%peerId%" data-admin="%admin%"> <div class="im-mess-stack--photo"> <div class="nim-peer nim-peer_small fl_l"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> <a target="_blank" class="im_grid" href="%href%"><img alt="%name%" src="%photo%" /></a> </div> </div> </div> </div> <div class="im-mess-stack--content"> <div class="im-mess-stack--info"> <div class="im-mess-stack--pname"> %stack_name% <span class="im-mess-stack--tools">%date%</span> </div> </div> <ul class="ui_clean_list im-mess-stack--mess _im_stack_messages"> %messages% </ul> </div> </div>',
        im_mess_stack_name: '<a href="%link%" class="im-mess-stack--lnk%class%" title="" target="_blank">%name%</a>',
        im_message_media: '<div class="_im_msg_media%messageId%" class="wall_module">%attaches%</div>%text%',
        im_dialog_media: '<span class="nim-dialog--preview nim-dialog--preview-attach">%name%</span>',
        im_typing: '<div class="im-page--typing _im_typing"> <div class="im-typing %cls%"><div class="pr im-typing--icon" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><span class="_im_typing_name">&nbsp;</span></div> </div>',
        ctrl_submit_hint: function() {
            return '<div class="reply_submit_hint_wrap" >\n  <div class="reply_submit_hint_title">' + getLang("wall_reply_submit_settings") + '</div>\n  <div class="reply_submit_hint_opts" id="">\n    <div class="radiobtn %enter_on% _im_submit_btn" data-val="0" onclick="radiobtn(this, 0, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_1") + '</div></div>\n    <div class="radiobtn %ctrl_on% _im_submit_btn" data-val="1" onclick="radiobtn(this, 1, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_2") + "</div></div>\n  </div>\n</div>"
        },
        im_day_bar: '<h5 class="im-page--history-new-bar im-page--history-new-bar_days _im_bar_date %day_class%" data-date="%date%"><span>%day%</span></h5>',
        im_mess_bar: function() {
            return '<h4 class="im-page--history-new-bar _im_unread_bar_row"><span>' + getLang("mail_new_unread_msgs") + "</span></h4>"
        },
        im_drow: function() {
            return '<li data-list-id="%peer%" class="nim-dialog _im_dialog _im_dialog_%peer% %is_unread% %is_unread_out% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <div class="nim-dialog--date _im_dialog_date">%date%</div> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <button type="button" class="nim-dialog--markre _im_dialog_markre"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> <span class="nim-dialog--verfifed _im_dialog_verified"></span> <span class="nim-dialog--mute"></span> <button type="button" class="nim-dialog--star _im_dialog_star"></button> </div> <div class="nim-dialog--text-preview"> <span class="nim-dialog--preview _dialog_body" tabindex="0">%body%</span> <span class="nim-dialog--typing _im_dialog_typing"></span><span class="nim-dialog--typer-el"></span> </div> <label class="blind_label _im_unread_blind_label">%unread_message_string%</label> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_conversation_search_row: function() {
            return '<li data-list-id="%peer%" class="nim-dialog nim-conversation-search-row _im_dialog _im_dialog_%peer% %is_unread% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer nim-peer_search %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> </div> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_delete_actions: function() {
            return '<span class="nim-dialog--who">%text%</span> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="restore" type="button">' + getLang("mail_restore") + '</button> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="spam" type="button">' + getLang("mail_im_mark_spam") + '</button> <button class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="block" type="button">' + getLang("mail_user_black_list") + "</button>"
        },
        im_chat_change_topic: function() {
            return '<div class="im_change_topic_wrap clear_fix"> <div class="im_change_topic_label fl_l ta_r">' + getLang("mail_chat_topic_change_label") + '</div> <div class="im_change_topic_labeled fl_l"> <input class="text _im_chat_topic_change_input" value="%value%"/> </div> </div>'
        },
        im_msg_row: function() {
            return '<li class="im-mess %cls% _im_mess_noa _im_mess_%msg_id%" aria-hidden="%aria_hidden%" data-ts="%ts%" data-msgid="%msg_id%" data-peer="%from_id%"> <div class="im-mess--text wall_module _im_log_body">%text%</div> <span tabindex="0" role="link" aria-label="' + getLang("mail_select_message") + '" class="blind_label im-mess--blind-select _im_mess_blind_label_select"></span> <span class="blind_label im-mess--blind-read _im_mess_blind_unread_marker" %unread_params%></span> <span class="im-mess--marker _im_mess_marker" %marker_params%></span> </li>'
        },
        sImHistoryRowActions: function() {
            return '<div class="im-mess--actions"> <span role="link" aria-label="' + getLang("mail_im_reply") + '" class="im-mess--reply _im_mess_reply"></span><span role="link" aria-label="' + getLang("mail_im_edit") + '" class="im-mess--edit _im_mess_edit"></span><span role="link" aria-label="' + getLang("mail_important_message") + '" class="im-mess--fav _im_mess_fav"></span> </div> <div class="im-mess--check fl_l"></div>';
        },
        im_wrap_mobile: '<b class="mob_onl %class%" %attrs% onmouseover="mobileOnlineTip(this, {%params%})"></b>',
        im_pinned_message: '<div class="im-page-pinned _im_pinned_message"> <button class="im-page-pinned--hide _im_pin_hide"></button> <div class="im-page-pinned--meta"> <a href="%link%" target="_blank" class="im-page-pinned--name">%name%</a> <span class="im-page-pinned--date">%date%</span> </div> <div class="im-page-pinned--content">%content%</div> </div>',
        im_pinned_message_media: '<span class="im-page-pinned--media">%text%</span>',
        im_pinned_message_media_bar: '<div class="im-page-pinned--media-bar">\n  <div class="im-page-pinned--media-bar_progress" style="width: %percent%%;"></div>\n</div>',
        im_pinned_messages_promo: '<div class="im-page--mess-actions-promo-content">%content%</div>',
        im_retry_link: function() {
            return '<button class="im-page--retry _im_retry_media">' + getLang("mail_retry") + "</button>"
        },
        sImLblWasEdited: function() {
            return " <span class='im-mess--lbl-was-edited _im_edit_time' data-time='%update_time%'>" + getLang("mail_was_edited_short") + "</span>"
        },
        im_top_banner: '<div class="im-top-banner">\n  %icon%\n  <div class="im-top-banner--text"><div>%text%</div></div>\n  <div class="im-top-banner--buttons">%buttons%</div>\n</div>',
        im_top_banner_icon: '<div class="im-top-banner--icon">\n  <img src="%icon%" alt=""/>\n</div>',
        im_top_banner_button_link: '<a href="%link%" target="_blank" class="_im_top_banner_button im-top-banner--button %css_class% flat_button">%text%</a>',
        im_top_banner_button: '<button class="_im_top_banner_button im-top-banner--button %css_class% flat_button" data-payload="%callback_data%">%text%</button>',
        im_top_banner_hide_btn: '<button class="im-top-banner--button im-top-banner--button_hide _im_top_banner_hide"></button>'
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = s.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r = void 0, a = 0; a < n.length; a++) {
                    var i = o(n[a], 2),
                        l = i[0],
                        u = i[1],
                        c = void 0;
                    if (hasClass(e.target, l) ? c = u(e, e.target) : (r = gpeByClass(l, e.target, e.currentTarget)) && (c = u(e, r)), c === !1) break
                }
        }
    }

    function a(e, t, n, a) {
        var i = s.get(e);
        i || (s.set(e, {}), i = s.get(e));
        for (var o = t.split(" "), l = 0; l < o.length; l++) {
            var u = o[l];
            i[u] || (i[u] = [], addEvent(e, u, r)), i[u].push([n, a])
        }
    }

    function i(e, t, n, a) {
        var i = s.get(e);
        if (i) {
            t.split(" ").forEach(function(t) {
                i[t] && (i[t] = i[t].filter(function(e) {
                    return e[0] !== n || e[1] !== a
                }), 0 === i[t].length && removeEvent(e, t, r))
            });
            var o = Object.keys(i).map(function(e) {
                return i[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === o && s["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.addDelegateEvent = a, t.removeDelegateEvent = i;
    var s = new window.Map
}, function(e, t, n) {
    var r = n(20),
        a = n(64).document,
        i = r(a) && r(a.createElement);
    e.exports = function(e) {
        return i ? a.createElement(e) : {}
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return o["default"].createElement("div", {
            className: (0, s.classNames)("ChatSettingsRoundedIcon", "ChatSettingsRoundedIcon--" + e.type)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var i = n(180),
        o = r(i),
        s = n(92)
}, function(e, t, n) {
    var r = n(18),
        a = n(164),
        i = n(80)(!1),
        o = n(161)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = a(e),
            l = 0,
            u = [];
        for (n in s) n != o && r(s, n) && u.push(n);
        for (; t.length > l;) r(s, n = t[l++]) && (~i(u, n) || u.push(n));
        return u
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n(180),
        u = r(l),
        c = n(92),
        d = n(88),
        f = n(52),
        p = r(f),
        m = n(123),
        g = r(m),
        h = n(26),
        _ = r(h),
        v = n(103),
        b = r(v),
        y = n(77),
        w = r(y),
        C = 5,
        E = {
            appendParentCls: "ChatSettings"
        },
        k = function(e) {
            function t(n) {
                i(this, t);
                var r = o(this, e.call(this, n));
                r.onToggleSearch = function() {
                    r.state.showSearch ? r.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }) : (r.setState({
                        showSearch: !0
                    }), requestAnimationFrame(function() {
                        r.searchInput.focus()
                    }))
                }, r.onSearchChange = function(e) {
                    e.target.value !== r.state.searchQuery && r.setState({
                        searchQuery: e.target.value
                    })
                }, r.onShowMore = function() {
                    var e = "all" === r.state.current ? "allShowMore" : "adminsShowMore";
                    r.state[e] && r.setState(a({}, e, !1))
                }, r.onTabClick = function(e, t) {
                    e.preventDefault(), r.state.current !== t && r.setState({
                        current: t
                    })
                }, r.handleDocumentClick = function(e) {
                    var t = ".ChatSettingsMembersWidget__search",
                        n = ".ChatSettingsMembersWidget__searchIcon";
                    !r.state.showSearch || r.state.searchQuery || e.target.closest(t) || e.target.closest(n) || r.setState({
                        showSearch: !1
                    })
                }, r.onKeydown = function(e) {
                    r.state.showSearch && 27 === e.keyCode && (r.searchInput.blur(), r.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }), e.preventDefault(), e.stopPropagation())
                }, r.searchInputRef = function(e) {
                    r.searchInput = e
                };
                var s = n.store.get(),
                    l = r.getMembers(s),
                    u = r.getAdmins(s);
                return r.state = {
                    showSearch: !1,
                    searchQuery: "",
                    current: "all",
                    all: l,
                    allShowMore: l.length > 5,
                    admins: u,
                    adminsShowMore: u.length > 5
                }, r.membersMap = l.reduce(function(e, t) {
                    return e[t] = !0, e
                }, {}), r.getSearchIndex(l).then(function(e) {
                    r.searchIndex = e
                }), r
            }
            return s(t, e), t.prototype.componentWillReceiveProps = function(e) {
                var t = this,
                    n = e.store.get(),
                    r = this.getMembers(n),
                    a = this.getAdmins(n),
                    i = {
                        removes: [],
                        additions: []
                    },
                    o = r.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {});
                r.forEach(function(e) {
                    t.membersMap[e] || i.additions.push(e)
                }), Object.keys(this.membersMap).forEach(function(e) {
                    o[e] || i.removes.push(e)
                }), (i.removes.length || i.additions.length) && (this.updateSearchIndex(n, i), this.membersMap = o), this.setState({
                    all: r,
                    allShowMore: this.state.allShowMore && r.length > 5,
                    admins: a,
                    adminsShowMore: this.state.adminsShowMore && a.length > 5
                })
            }, t.prototype.getMembers = function(e) {
                var t = e.peer,
                    n = e.tabs[t],
                    r = -1 !== n.memberIds.indexOf(n.ownerId),
                    a = n.adminIds.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {}),
                    i = r ? [n.ownerId] : [];
                return i.concat(n.adminIds.filter(function(e) {
                    return e !== n.ownerId
                }), n.memberIds.filter(function(e) {
                    return e !== n.ownerId && !a[e]
                }))
            }, t.prototype.getAdmins = function(e) {
                var t = e.peer,
                    n = e.tabs[t],
                    r = -1 !== n.memberIds.indexOf(n.ownerId),
                    a = r ? [n.ownerId] : [];
                return a.concat(n.adminIds.filter(function(e) {
                    return e !== n.ownerId
                }))
            }, t.prototype.getCurrentList = function() {
                var e = this.props.store,
                    t = this.state,
                    n = t.current,
                    r = t.showSearch,
                    a = t.searchQuery;
                if (r && a && this.searchIndex) return this.searchIndex.search(a);
                var i = this.state[n],
                    o = (0, d.getChatMembersByIds)(e.get(), i);
                return this.state[n + "ShowMore"] ? o.slice(0, C) : o
            }, t.prototype.getSearchIndex = function(e) {
                var t = window,
                    n = t.vkIndexer,
                    r = (0, d.getChatMembersByIds)(this.props.store.get(), e);
                return this.membersMap = r.reduce(function(e, t) {
                    return e[t.id] = !0, e
                }, {}), new Promise(function(e, t) {
                    var a = new n(r, function(e) {
                        return e.name
                    }, function() {
                        e(a)
                    })
                })
            }, t.prototype.updateSearchIndex = function(e, t) {
                var n = this,
                    r = (0, d.getChatMembersByIds)(e, t.removes),
                    a = (0, d.getChatMembersByIds)(e, t.additions);
                r.forEach(function(e) {
                    n.searchIndex.remove(e)
                }), a.forEach(function(e) {
                    n.searchIndex.add(e)
                })
            }, t.prototype.componentDidMount = function() {
                this.searchInput.addEventListener("keydown", this.onKeydown)
            }, t.prototype.componentWillUnmount = function() {
                this.searchInput.removeEventListener("keydown", this.onKeydown)
            }, t.prototype.render = function() {
                var e = this,
                    t = this.props.store,
                    n = this.state,
                    r = n.current,
                    a = n.showSearch,
                    i = n.searchQuery,
                    o = n.allShowMore,
                    s = n.adminsShowMore,
                    l = t.get(),
                    f = l.peer,
                    m = l.tabs[f],
                    h = this.getCurrentList(),
                    v = "all" === r ? o : s,
                    y = m.membersLastSeen,
                    C = {
                        "ChatSettingsMembersWidget--search": !!a
                    },
                    k = m.adminIds.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {});
                return u["default"].createElement("div", {
                    className: (0, c.classNames)("ChatSettingsMembersWidget", C)
                }, u["default"].createElement("header", {
                    className: "ChatSettingsMembersWidget__header"
                }, u["default"].createElement("input", {
                    placeholder: getLang("mail_members_search"),
                    className: "ChatSettingsMembersWidget__search",
                    onChange: this.onSearchChange,
                    onInput: this.onSearchChange,
                    onPaste: this.onSearchChange,
                    value: this.state.searchQuery,
                    ref: this.searchInputRef
                }), u["default"].createElement("button", {
                    className: "ChatSettingsMembersWidget__searchIcon",
                    onClick: this.onToggleSearch
                }), u["default"].createElement(p["default"], {
                    className: "ChatSettingsMembersWidget__tabs",
                    onTabClick: this.onTabClick
                }, u["default"].createElement("span", {
                    key: "all"
                }, getLang("mail_settings_everyone") + " ", u["default"].createElement("span", {
                    className: "Tabs__desc"
                }, (0, d.getAliveMembersCount)(m))), m.adminIds.length > 0 && u["default"].createElement("span", {
                    key: "admins"
                }, getLang("mail_settings_admins") + " ", u["default"].createElement("span", {
                    className: "Tabs__desc"
                }, m.adminIds.length)))), u["default"].createElement("div", {
                    className: "ChatSettingsMembersWidget__list"
                }, u["default"].createElement(g["default"], {
                    border: !1
                }, h.length > 0 && h.map(function(n) {
                    return u["default"].createElement(_["default"], {
                        selectable: !1,
                        border: !1,
                        aside: u["default"].createElement(w["default"], {
                            getLang: getLang,
                            adminMap: k,
                            store: t,
                            storeData: l,
                            mid: n.id,
                            onLeave: e.props.onLeave
                        }),
                        key: n.id
                    }, u["default"].createElement(b["default"], {
                        photo: n.photo,
                        title: n.name,
                        description: y && y[n.id] ? (0, d.getLastSeenText)(l, n.id, y[n.id], E) : "",
                        href: n.link
                    }))
                }), !h.length && a && i && u["default"].createElement("div", {
                    className: "ChatSettingsMembersWidget__empty"
                }, getLang("mail_settings_not_found")), !(a && i) && v && u["default"].createElement("div", {
                    className: "ChatSettingsMembersWidget__more",
                    onClick: this.onShowMore
                }, getLang("mail_settings_show_all_members")))))
            }, t
        }(l.Component);
    t["default"] = k
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = parseInt(e / 60),
            n = e % 60;
        return t + ":" + (10 > n ? "0" : "") + n
    }

    function a(e) {
        var t = e.match(/.*\/(\w*).*/);
        switch (t[1]) {
            case "mpeg":
                return "mp3";
            case "ogg":
            case "webm":
            case "wav":
                return t[1]
        }
        return ""
    }

    function i(e) {
        return new Promise(function(t, n) {
            for (var r = new FormData, i = [], o = 0; o < e.wave.length; o++) i.push(parseInt(31 * e.wave[o]));
            r.append("waveform", JSON.stringify(i)), r.append("file", e.buffer, "voice_message." + a(e.mimeType));
            var s = new x;
            s.onload = s.onerror = function(e) {
                var r = e.currentTarget.response;
                200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
            }, s.open("POST", K.upload_url, !0), s.send(r)
        })
    }

    function o(e) {
        if (!Q) {
            Q = !0, (0, O.lockButton)(F);
            var t = {
                peer: G.get().peer,
                from_place: cur.docsChooseFrom,
                imhash: cur.docsChooseImHash,
                blockPersonal: cur.docsChooseBlockPersonal,
                mail_add: cur.docsChooseMailAdd
            };
            i(e).then(function(e) {
                return e.file ? new Promise(function(n, r) {
                    ajax.post("/docs.php", extend({
                        act: "a_save_doc",
                        from: "choose",
                        from_place: t.from_place,
                        imhash: t.imhash,
                        blockPersonal: t.blockPersonal,
                        mail_add: t.mail_add
                    }, e), {
                        onDone: function(e, r) {
                            p(), W([
                                ["doc", e + "_" + r, "audiomsg"]
                            ], {}, t.peer), w(), n()
                        },
                        onFail: function(e) {
                            r(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()
            }).then(function() {
                (0, O.unlockButton)(F), Q = !1
            })["catch"](function() {
                Q = !1, (0, O.unlockButton)(F), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
            })
        }
    }

    function s(e) {
        var t = URL.createObjectURL(Y.buffer);
        domData(V, "duration", Y.duration), domData(V, "ogg", t), domData(V, "mp3", t), geByClass1("audio-msg-track--duration", V).innerHTML = r(Y.duration), geByClass1("audio-msg-track--wave-wrapper", V).innerHTML = AudioMessagePlayer.getWave(Y.wave, $)
    }

    function l() {
        D.innerHTML = r(Y.duration), Y.duration >= A && v()
    }

    function u(e) {
        e.set(P.cancelRecording).then(h)
    }

    function c() {
        stManager.add(["voice_message_player.js", "speech.js"], function() {
            Y || (Y = Speech.newRecorder(), addEvent(Y, "progress", l)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Y.record().then(function() {
                f(G), b(), y(), q = Speech.createVisualization("wave", Y.source, R), q.start();
                var e = R.getBoundingClientRect();
                $ = (e.right - e.left) / 3
            })["catch"](function(e) {
                AudioMessagePlayer.resumeGlobalMedia();
                var t = e.name;
                switch (e.name) {
                    case "DevicesNotFoundError":
                    case "NotFoundError":
                        t = "mail_audio_message_device_error";
                        break;
                    case "PermissionDeniedError":
                    case "PermissionDismissedError":
                        t = "mail_audio_message_permission_error";
                        break;
                    case "Unsupported":
                        t = "mail_audio_message_unsupported_error"
                }
                showFastBox(getLang("global_error"), getLang(t)), console.error(e)
            })
        })
    }

    function d() {
        Y && Y.stop(), q && (q.destroy(), q = null)
    }

    function f(e) {
        K.isRecording = !0, cancelStackPush("audio_message_cancel", u.bind(null, e))
    }

    function p() {
        K.isRecording = !1, cancelStackFilter("audio_message_cancel")
    }

    function m() {
        g(), o(Y)
    }

    function g() {
        AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Y, "finish", g), removeEvent(Y, "finish", m), s(), removeClass(N, "im-audio-message_recording"), addClass(N, "im-audio-message_recorded")
    }

    function h() {
        p(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Y, "finish", g), removeEvent(Y, "finish", m), d(), w()
    }

    function _() {
        Y.isRecording ? (addEvent(Y, "finish", m), removeEvent(Y, "finish", g), d()) : o(Y)
    }

    function v() {
        addEvent(Y, "finish", g), removeEvent(Y, "finish", m), d()
    }

    function b() {
        hideProgress(geByClass1("im-audio-message-send-wrapper", N)), show(F), D.innerHTML = "0:00", addClass(N, "im-audio-message_recording"), removeClass(N, "im-audio-message_recorded")
    }

    function y() {
        show(N), hide(geByClass1("_im_chat_input_parent"))
    }

    function w() {
        removeClass(N, "im-audio-message_recorded"), removeClass(N, "im-audio-message_recording"), hide(N), show(geByClass1("_im_chat_input_parent"))
    }

    function C() {
        U = ge("audiomsg_record"), V = ge("audiomsg_player"), N = geByClass1("im-audio-message-input"), D = geByClass1("audio-msg-track--duration", N), R = geByClass1("audio-msg-track--wave", N), B = geByClass1("im-audio-message--cancel-btn", N), F = geByClass1("_im_audio_send", N), H = geByClass1("audio-msg-track--btn", N), z = geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
        var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
        addClass(e, "_voice_field_wrap"), k()
    }

    function E() {
        S(), U = V = N = D = R = j = B = F = H = null
    }

    function k() {
        addEvent(j, "click", c), addEvent(B, "click", h), addEvent(F, "click", _), addEvent(H, "click", v)
    }

    function S() {
        Y && removeEvent(Y, "progress", l), removeEvent(j, "click", c), removeEvent(B, "click", h), removeEvent(F, "click", _), removeEvent(H, "click", v)
    }

    function T(e, t, n) {
        return {
            cancelRecording: h,
            start: function() {
                c()
            },
            unmount: function() {
                h(), E()
            }
        }
    }

    function I(e, t, n, r) {
        G = t, K = t.get().audio_msg, W = n, (0, L.initFailBack)(), (0, O.getAvailableMicrophones)().then(function(e) {
            var n = e.length > 0;
            n ? (C(), r()) : setCookie("remixvoice", "0", 7), t.set(P.setVoiceMessageAvail.bind(null, n))
        })["catch"](function(e) {
            throw setCookie("remixvoice", "0", 7), e
        });
        var a = (0, M.createMutations)(T),
            i = a.bindMutations;
        return i(e, t, n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = I;
    var M = n(198),
        P = n(28),
        L = n(211),
        O = n(88),
        A = 600,
        x = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
        N = void 0,
        D = void 0,
        R = void 0,
        j = void 0,
        B = void 0,
        F = void 0,
        H = void 0,
        U = void 0,
        z = void 0,
        G = void 0,
        V = void 0,
        q = void 0,
        W = void 0,
        K = void 0,
        Y = !1,
        Q = !1,
        $ = 100
}, , function(e, t, n) {
    var r = n(19);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.get().tabs,
            n = e.get().peer,
            r = Object.keys(t).filter(function(t) {
                return (0, i.isFullyLoadedTab)(e, t) && intval(t) !== n
            }).map(function(e) {
                return t[e]
            });
        r.filter(function(e) {
            return Date.now() - e.last_visited > l
        }).forEach(function(t) {
            return e.set(o.cleanTab.bind(null, t.peerId))
        }), r.filter(function(t) {
            return (0, i.isFullyLoadedTab)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > u
        }).forEach(function(t) {
            return e.set(o.stringifyTab.bind(null, t.peerId))
        })
    }

    function a(e) {
        var t = setInterval(r.bind(null, e), s);
        return {
            unmount: function() {
                clearInterval(t)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = a;
    var i = n(88),
        o = n(28),
        s = 5e3,
        l = 54e6,
        u = 72e5
}, function(e, t, n) {
    var r = n(170);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(46),
        c = r(u),
        d = n(27),
        f = r(d),
        p = n(115),
        m = n(12),
        g = n(28),
        h = function(e) {
            function t() {
                var n, r, o;
                a(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; s > u; u++) l[u] = arguments[u];
                return n = r = i(this, e.call.apply(e, [this].concat(l))), r.toggleAdmin = function() {
                    var e = r.props,
                        t = e.store,
                        n = e.mid,
                        a = e.adminMap,
                        i = t.get().peer,
                        o = !a[n];
                    t.set(g.toggleAdminOptimisticly.bind(null, i, n, o)), t.set(g.toggleAdmin.bind(null, i, n, o))
                }, r.kick = function() {
                    var e = r.props.store,
                        t = e.get().peer,
                        n = r.props.mid;
                    e.set(g.kickUserOptimisticly.bind(null, t, n)), e.set(g.kickUser.bind(null, t, n))["catch"](function(r) {
                        e.set(g.addNewPeopleOptimisticly.bind(null, t, [n])), (0, m.imWeirdCatch)("ChatSettingsMemberEdit.kick", r)
                    })
                }, o = n, i(r, o)
            }
            return o(t, e), t.prototype.getMemberRole = function(e, t) {
                var n = this.props.storeData,
                    r = n.peer,
                    a = n.tabs[r];
                return t === a.ownerId ? getLang("mail_settings_owner") : e[t] ? getLang("mail_settings_admin") : null
            }, t.prototype.getActions = function(e) {
                var t = window.vk.id,
                    n = this.props,
                    r = n.store,
                    a = n.getLang,
                    i = n.mid,
                    o = t === i,
                    s = [];
                return o ? [{
                    text: a("mail_leave_chat"),
                    onClick: this.props.onLeave
                }] : ((0, p.canAddAdmin)(r, i) && s.push({
                    text: a(e[i] ? "mail_chat_remove_admin" : "mail_settings_appoint_admin"),
                    onClick: this.toggleAdmin
                }), (0, p.canKickUser)(r, i) && s.push({
                    text: a("mail_settings_kick"),
                    onClick: this.kick
                }), s)
            }, t.prototype.render = function() {
                var e = window.vk.id,
                    t = this.props,
                    n = t.getLang,
                    r = t.adminMap,
                    a = t.storeData,
                    i = t.mid,
                    o = !!r[e],
                    u = this.getMemberRole(r, i),
                    d = e === i,
                    m = o && this.getActions(r);
                return l["default"].createElement(s.Fragment, null, u && l["default"].createElement("span", {
                    className: "ChatSettingsMembersEdit__role"
                }, u), m && m.length > 0 && l["default"].createElement(c["default"], {
                    position: "b",
                    align: "right",
                    trigger: "hover",
                    marginTop: -8,
                    marginLeft: 1,
                    data: this.getActions(r)
                }, l["default"].createElement("span", {
                    className: "ChatSettingsMembersEdit__actions"
                })), !o && !d && (0, p.canKickUser)(a, i) && l["default"].createElement(f["default"], {
                    text: n("mail_settings_kick"),
                    position: "t",
                    align: "right"
                }, l["default"].createElement("span", {
                    onClick: this.kick,
                    className: "ChatSettingsMembersEdit__kick"
                })), !o && d && l["default"].createElement(f["default"], {
                    text: n("mail_leave_chat"),
                    position: "t",
                    align: "right"
                }, l["default"].createElement("span", {
                    onClick: this.props.onLeave,
                    className: "ChatSettingsMembersEdit__kick"
                })))
            }, t
        }(s.Component);
    t["default"] = h
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = geByClass1("_im_dialog_actions", e);
        toggleClass(n, "im-page--chat-header_top-banner", t)
    }

    function a(e, t) {
        var n = geByClass1(p, e);
        n && window.tooltips && tooltips.hide(n), r(e, !1), t.innerHTML = ""
    }

    function i(e, t, n, r) {
        var i = domData(e, "payload");
        return i ? (t.set(u.callbackTopBannerAction.bind(null, t.get().peer, i)), a(n, r), !0) : !1
    }

    function o(e) {
        var t = e.icon ? getTemplate("im_top_banner_icon", {
                icon: e.icon
            }) : "",
            n = (e.buttons || []).map(function(e) {
                var t = "";
                switch (e.layout) {
                    case "secondary":
                        t = "secondary";
                        break;
                    default:
                        t = "blue_button"
                }
                return "link" === e.type ? getTemplate("im_top_banner_button_link", {
                    link: e.link,
                    text: e.text,
                    css_class: t
                }) : getTemplate("im_top_banner_button", {
                    callback_data: e.callback_data,
                    text: e.text,
                    css_class: t
                })
            });
        return n = n.concat([getTemplate("im_top_banner_hide_btn", {})]), getTemplate("im_top_banner", {
            text: e.text,
            icon: t,
            buttons: n.join("")
        })
    }

    function s(e, t, n) {
        var s = geByClass1("_im_top_banner", e),
            m = (0, l.createModule)({
                handlers: function(r, o) {
                    var l = geByClass1("_im_dialog_actions", e);
                    o(e, "click", p, function(r) {
                        t.set(u.hideTopBannerAction.bind(null, t.get().peer)), a(e, s);
                        var i = !!(0, d.renderPinnedMessage)(t);
                        (0, d.compensateHistoryHeightChange)(t, i, !0, n)
                    }), o(e, "click", f, function(r) {
                        var a = i(r.target, t, e, s),
                            o = !!(0, d.renderPinnedMessage)(t);
                        (0, d.compensateHistoryHeightChange)(t, o, !a, n)
                    }), o(l, "mouseover", p, function(e, t) {
                        showTooltip(t, {
                            text: getLang("mail_top_banner_hide"),
                            black: 1,
                            shift: [8, 4],
                            appendEl: bodyNode
                        })
                    })
                }
            });
        return {
            renderPeer: function(t) {
                var i = (0, c.getTab)(t, t.get().peer),
                    l = i.top_banner,
                    u = s.children.length;
                l && !(0, c.isSearchShown)(t) ? (r(e, !0), s.innerHTML = o(l)) : s.children.length && a(e, s);
                var f = s.children.length;
                (0, d.compensateHistoryHeightChange)(t, f, u, n)
            },
            unmount: function() {
                (0, l.destroyModule)(m)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = s;
    var l = n(198),
        u = n(28),
        c = n(190),
        d = n(88),
        f = "_im_top_banner_button",
        p = "_im_top_banner_hide"
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, n) {
    var r = n(164),
        a = n(1),
        i = n(154);
    e.exports = function(e) {
        return function(t, n, o) {
            var s, l = r(t),
                u = a(l.length),
                c = i(o, u);
            if (e && n != n) {
                for (; u > c;)
                    if (s = l[c++], s != s) return !0
            } else
                for (; u > c; c++)
                    if ((e || c in l) && l[c] === n) return e || c;
            return !e && -1
        }
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = e.split("_"),
            r = h(n, 2),
            a = r[0],
            i = r[1];
        return [a, i, t]
    }

    function a(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if (i > 50) return [
            [], e.length
        ];
        for (var o = [], s = ""; n < e.length;) {
            var l = e[n];
            if ("id" === l) s = t[n];
            else if ("," === l && s) o.push(r(s)), s = "";
            else if ("(" === l) {
                var u = a(e, t, n + 1, i + 1),
                    c = h(u, 2),
                    d = c[0],
                    f = c[1];
                n = f, o.push(r(s, d)), s = ""
            } else if (")" === l) return "" !== s && o.push(r(s)), [o, n];
            n++
        }
        return s && o.push(r(s)), [o, n]
    }

    function i(e) {
        if (E[e]) return E[e];
        for (var t = e ? e.length : 0, n = [], r = [], i = "", o = 0; t > o; o++) {
            var s = e[o],
                l = s.charCodeAt(0);
            l >= 48 && 57 >= l || "_" === s || "-" === s ? i += s : ("(" === s || ")" === s || ":" === s || "," === s) && ("" !== i && (r.push(i), n.push("id"), i = ""), r.push(s), n.push(s))
        }
        i.length > 0 && (r.push(i), n.push("id"));
        var u = a(n, r),
            c = h(u, 1),
            d = c[0];
        return Object.keys(E).length > 300 && (E = {}), E[e] = d, d
    }

    function o(e, t) {
        for (var n = void 0, r = 0, a = e; null !== (n = _.MESSAGE_REGEXP.exec(e));) {
            n = u(n);
            var i = n[0].length,
                o = n.index + i,
                s = e[n.index - 1],
                l = e[o - 1],
                d = void 0 !== s && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(s),
                f = void 0 !== l && /([:;$])/i.test(l);
            if (!d && !f) {
                var p = c(n),
                    m = p.domain;
                if (m.length <= _.MAX_DOMAIN_LENGTH && -1 !== _.TOP_DOMAINS.indexOf(m)) {
                    var g = t(p);
                    a = a.slice(0, n.index + r) + g + a.slice(o + r), r += g.length - i
                }
            }
        }
        return a
    }

    function s(e, t) {
        return e.replace(_.EMAIL, t || function(e) {
            return '<a href="mailto:' + e + '">' + e + "</a>"
        })
    }

    function l(e, t) {
        return e.replace(_.MENTION, t || function(e, t, n, r, a) {
            return '<a href="/' + (t + n) + '" class="mem_link" mention="' + y(r || "") + '" mention_id="' + y(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + a + "</a>"
        })
    }

    function u(e) {
        if (!e[0] || !e[6]) return e;
        var t = e[0].length - 1,
            n = e[6].length - 1;
        return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
    }

    function c(e) {
        return {
            full: e[0],
            protocol: e[1] || "http://",
            url: e[2],
            domain: e[4],
            query: e[6] || ""
        }
    }

    function d() {
        return v || (v = new RegExp(_.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), v
    }

    function f(e, t) {
        return e.replace(d(), function(e, n, r, a, i, o) {
            return (n || "") + t(r + (i || ""))
        })
    }

    function p(e) {
        C("ttl_message_confirm_delivery", e)
    }

    function m(e, t) {
        var n = t.protocol,
            r = t.url,
            a = t.query,
            i = t.domain,
            o = t.full;
        try {
            o = decodeURIComponent(o)
        } catch (s) {}
        if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = y(o).replace(/&amp;/g, "&"), !e && i.match(_.OUR_DOMAINS)) {
            r = w(r).replace(_.ENTITIES, encodeURIComponent);
            var l = r,
                u = r.indexOf("#/"),
                c = "",
                d = void 0;
            return u >= 0 ? l = r.substr(u + 1) : (u = r.indexOf("#!"), u >= 0 && (l = "/" + r.substr(u + 2).replace(/^\//, ""))), d = l.match(_.VK_DOMAIN), d && d[1].length < 32 && (c = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + g(n + r + a) + '" target="_blank"' + c + ">" + o + "</a>"
        }
        var f = "away.php?utf=1&to=" + encodeURIComponent(n + w(r + a)),
            p = y((n + r + a).replace(/'/g, "\\'")),
            m = "return goAway('" + p + "', {}, event);";
        return '<a href="' + f + '" target="_blank" onclick="' + m + '">' + o + "</a>"
    }

    function g(e) {
        return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var h = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.parseFwd = i, t.replaceHyperLinks = o, t.replaceEmailLinks = s, t.replaceMentions = l, t.replaceHashtags = f, t.confirmDelivery = p, t.linksReplacer = m;
    var _ = n(94),
        v = void 0,
        b = window,
        y = b.clean,
        w = b.replaceEntities,
        C = b.statlogsValueEvent,
        E = {}
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(144)),
        f = r(d),
        p = n(92),
        m = "Select...",
        g = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.handleMouseDown = function(e) {
                    r.props.onFocus && "function" == typeof r.props.onFocus && r.props.onFocus(r.state.opened), ("mousedown" !== e.type || 0 === e.button) && (e.stopPropagation(), e.preventDefault(), r.props.disabled || r.setState({
                        opened: !r.state.opened
                    }))
                }, r.setValue = function(e, t) {
                    var n = {
                        selected: {
                            value: e,
                            label: t
                        },
                        opened: !1
                    };
                    r.fireChangeEvent(n), r.setState(n)
                }, r.fireChangeEvent = function(e) {
                    e.selected !== r.state.selected && r.props.onChange && r.props.onChange({
                        name: r.props.name,
                        selected: e.selected
                    })
                }, r.handleDocumentClick = function(e) {
                    r.mounted && r.state.opened && !r.el.contains(e.target) && r.setState({
                        opened: !1
                    })
                }, r.state = {
                    selected: "undefined" != typeof n.value ? r.getOptionByValue(n.options, n.value) : {
                        label: n.placeholder || m,
                        value: ""
                    },
                    opened: !1
                }, r.mounted = !0, r
            }
            return o(t, e), t.prototype.componentWillReceiveProps = function(e) {
                "undefined" != typeof e.value && e.value !== this.state.selected ? this.setState({
                    selected: this.getOptionByValue(e.options, e.value)
                }) : "undefined" == typeof e.value && this.setState({
                    selected: {
                        label: e.placeholder || m,
                        value: ""
                    }
                })
            }, t.prototype.componentDidMount = function() {
                this.el = f["default"].findDOMNode(this), document.addEventListener("click", this.handleDocumentClick, !1), document.addEventListener("touchend", this.handleDocumentClick, !1)
            }, t.prototype.componentWillUnmount = function() {
                this.mounted = !1, document.removeEventListener("click", this.handleDocumentClick, !1), document.removeEventListener("touchend", this.handleDocumentClick, !1)
            }, t.prototype.getOptionByValue = function(e, t) {
                return e.find(function(e) {
                    return "object" !== ("undefined" == typeof e ? "undefined" : s(e)) ? e === t : e.value === t
                })
            }, t.prototype.renderOption = function(e) {
                var t = this,
                    n = (0, p.classNames)("Select__option", {
                        "Select__option--selected": e === this.state.selected
                    }),
                    r = "undefined" != typeof e.value ? e.value : e.label || e,
                    a = "undefined" != typeof e.label ? e.label : e;
                return u["default"].createElement("div", {
                    key: r,
                    className: n,
                    onMouseDown: function() {
                        return t.setValue(r, a)
                    },
                    onClick: function() {
                        return t.setValue(r, a)
                    }
                }, a)
            }, t.prototype.buildMenu = function() {
                var e = this,
                    t = this.props.options.map(function(t) {
                        return "group" === t.type ? u["default"].createElement("div", {
                            className: "Select__group",
                            key: t.name
                        }, t.name && u["default"].createElement("div", {
                            className: "Select__title"
                        }, t.name), t.items.map(function(t) {
                            return e.renderOption(t)
                        })) : e.renderOption(t)
                    });
                return t.length ? t : u["default"].createElement("div", {
                    className: "Select__noresults"
                }, "No options found")
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.style,
                    r = (0, p.classNames)("Select", t, {
                        "Select--opened": this.state.opened,
                        "Select--disabled": this.props.disabled
                    });
                return u["default"].createElement("div", {
                    className: r,
                    style: n
                }, u["default"].createElement("div", {
                    className: "Select__control",
                    onClick: this.handleMouseDown
                }, u["default"].createElement("div", {
                    className: "Select__placeholder"
                }, "string" == typeof this.state.selected ? this.state.selected : this.state.selected.label), u["default"].createElement("span", {
                    className: "Select__arrow"
                })), this.state.opened && u["default"].createElement("div", {
                    className: "Select__menu"
                }, this.buildMenu()))
            }, t
        }(l.Component);
    t["default"] = g
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r) {
        if (!e.loading && !e.all) {
            var a = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (a > -300) {
                var i = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, (0, d.wrapLoading)(i)((0, l.loadImportant)(e.offset).then(function(t) {
                    var n = s(t, 4),
                        a = (n[0], n[1]),
                        o = (n[2], n[3]);
                    e.all = o.all, e.offset = o.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(l.mergeTabs.bind(null, (0, d.tabFromIds)(o.msgs, o.hash)));
                    var u = ce("div");
                    u.innerHTML = a, i.appendChild(u), (0, d.ensureDomHasActions)(i)
                }), "bottom")
            }
        }
    }

    function i(e, t, n) {
        for (var r = arguments.length, a = Array(r > 3 ? r - 3 : 0), i = 3; r > i; i++) a[i - 3] = arguments[i];
        a.filter(function(e) {
            return inArray(e.type, [g.SET_FLAGS, g.RESET_FLAGS, g.CHANGE_PEER])
        }).forEach(function(r) {
            if (r.type === g.CHANGE_PEER) return void n.hide();
            if (r.flags === g.FLAG_IMPORTANT) {
                var a = r.type === g.SET_FLAGS;
                e.set(l.updateFavMessage.bind(null, [r.messageId], 0, a)).then(function(n) {
                    t.markImportant(r.messageId, a, e)
                })
            }
        })
    }

    function o(e, t, n, r) {
        var o = ge("box_layer_wrap"),
            s = t.get().longpoll,
            l = (0, p["default"])({
                peer: 0,
                longpoll: s,
                oCache: {},
                tabs: (0, d.tabFromIds)(r.msgs, r.hash)
            }),
            f = (0, c.mount)(e.bodyNode, l, function() {
                return {}
            }),
            g = (0, u.mount)(e.bodyNode, t);
        (0, d.ensureDomHasActions)(e.bodyNode);
        var h = i.bind(null, t, f, e);
        s.on("data", h);
        var _ = a.bind(null, {
                all: !1,
                loading: r.all,
                offset: r.offset
            }, e, o, l),
            v = (0, m.createModule)({
                handlers: function(e, t) {
                    e(o, "scroll", _)
                }
            });
        return {
            unmount: function() {
                (0, m.destroyModule)(v), g.unmount(), f.unmount(), s.off("data", h)
            }
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
            } catch (l) {
                a = !0, i = l
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
    t.mount = o;
    var l = n(28),
        u = n(171),
        c = n(91),
        d = n(88),
        f = n(112),
        p = r(f),
        m = n(198),
        g = n(199)
}, function(e, t, n) {
    var r = n(30);
    e.exports = function(e, t, n, a) {
        try {
            return a ? t(r(n)[0], n[1]) : t(n)
        } catch (i) {
            var o = e["return"];
            throw void 0 !== o && r(o.call(e)), i
        }
    }
}, , function(e, t, n) {
    var r = n(172),
        a = n(85),
        i = n(192),
        o = n(30),
        s = n(1),
        l = n(117);
    e.exports = function(e, t, n, u, c) {
        var d, f, p, m = c ? function() {
                return e
            } : l(e),
            g = r(n, u, t ? 2 : 1),
            h = 0;
        if ("function" != typeof m) throw TypeError(e + " is not iterable!");
        if (i(m))
            for (d = s(e.length); d > h; h++) t ? g(o(f = e[h])[0], f[1]) : g(e[h]);
        else
            for (p = m.call(e); !(f = p.next()).done;) a(p, g, f.value, t)
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

    function i() {
        var e = tn.get(er);
        return e || 0
    }

    function o(e) {
        e >= window.clientHeight() - 30 && (e = 0), tn.set(er, e)
    }

    function s(e, t) {
        var n = vn(e, t),
            r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
        r && Sn(n.firstElementChild, {
            height: n.parentNode.offsetHeight
        })
    }

    function l(e, t) {
        e && e.innerHTML !== t && (e.innerHTML = t)
    }

    function u(e, t, n, r) {
        var a = t && !n ? 1 : !t && n ? -1 : 0;
        a && !(0, Ct.isClassicInterface)(e) && r().compensateHistoryHeightChange(a)
    }

    function c(e, t, n, r) {
        var a = window.devicePixelRatio >= 2 ? "256" : "128",
            i = "animation" === n,
            o = "im_gift";
        i && (o += " sticker_img");
        var s = "/images/stickers/" + ln(e) + "/" + a + ".png",
            l = '<img height="128" class="' + o + '" src="' + s + '"/>';
        if (i) {
            var u = "/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e,
                c = "animatedSticker" + r;
            l = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + u + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + ln(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + l + "</div>";
            var d = !1;
            browser.msie ? (0 ^ r) === r && (d = !0) : d = Number.isInteger(r), d && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
        }
        return t && (l = '<a onmouseover="return Emoji.stickerOver(' + ln(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + ln(t) + ', this, event);">' + l + "</a>"), l = '<div class="im_sticker_row">' + l + "</div>"
    }

    function d(e, t, n) {
        var r = e.get ? e.get() : e;
        if (x(r, t)) {
            var a = r.tabs[t].deleted || [];
            return sn(n, a)
        }
        return !1
    }

    function f(e, t, n) {
        var r = n.randomId,
            a = vn("_im_mess_rid" + r, t);
        return a && (t = ne([a], t), t = C(e, n, t, !0, !1)), t
    }

    function p(e) {
        var t = (0, Ct.checkVoiceMessageAvailable)(e);
        return browser.mobile && browser.safari ? Promise.resolve(!1) : "undefined" != typeof t ? Promise.resolve(t) : m().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function m() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function g(e) {
        return In("im_preloader", {
            preloader: an(en.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function h(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function _(e) {
        var t = vn("_im_invisible_bar", e);
        t && (wn(t, "_im_invisible_bar"), wn(t, "im-page--history-new-bar_hide"))
    }

    function v(e, t, n) {
        var r = b(e, t),
            a = vn("_im_mess_" + t.messageId, n);
        return a && (a.parentNode.replaceChild(nn(r), a), w(n)), n
    }

    function b(e, t) {
        var n = ["_im_mess"],
            r = (0, Mt.isUnread)(e.tabs[t.peerId], t);
        (0, Mt.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), (0, Mt.isOut)(t) && n.push("im-mess_out"), (0, Mt.wasEdited)(t) && n.push("im-mess_was_edited"), (0, Nt.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), (0, Mt.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
        var a = Date.now() - 1e3 * t.date > 1e3;
        t.local && a && n.push("im-mess_sending"), t.local && n.push("" + jt), t.local && (0, Mt.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + Bt), (0, Mt.isGift)(t) && n.push("im-mess_gift");
        var i = y(t),
            o = B(e, t.text, t.kludges);
        "" != o && (0, Mt.wasEdited)(t) && (o += In("sImLblWasEdited", {
            update_time: t.update_time
        })), t.subject && "..." !== t.subject.trim() && !L(t.peerId) && (o = In("im_topic", {
            topic: t.subject
        }) + o);
        var s = In("im_message_media", {
            messageId: t.messageId,
            attaches: i.join(""),
            text: (0, Mt.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
        });
        return (0, Mt.isGift)(t) || (s = o + s), "" == o && (0, Mt.wasEdited)(t) && (s += In("sImLblWasEdited", {
            update_time: t.update_time
        })), In("im_msg_row", {
            msg_id: t.messageId,
            from_id: t.peerId,
            text: s,
            aria_hidden: t.local && !t.failed ? "true" : "false",
            ts: t.date,
            marker_params: t.failed ? 'aria-label="' + Mn("mail_send_message_error") + '" role="link"' : "",
            unread_params: r ? 'aria-label="' + Mn("mail_unread_message") + '"' : "",
            cls: n.join(" ")
        })
    }

    function y(e) {
        return e.attaches.map(function(t) {
            return "sticker" === t.type ? e.messageId ? c(t.id, t.productId, t.kind, e.messageId) : c(t.id, t.productId) : g(t.type)
        })
    }

    function w(e) {
        for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) En(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", In("sImHistoryRowActions")), wn(t[n], "_im_mess_noa")
    }

    function C(e, t, n) {
        var r = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            i = Date.now() - 1e3 * t.date > 1e3,
            o = e.tabs[t.peerId];
        if (!n || vn("_im_mess", n) || vn("_im_bar_date", n) || (n.innerHTML = ""), o.skipped > 0) return n;
        var s = [];
        t.local || (s = e.imQueue(t.peerId, r)), s.length > 0 && ne(s.map(function(e) {
            return vn("_im_mess_rid" + e.rid, n)
        }, n).filter(function(e) {
            return e
        }));
        var l = b(e, t),
            u = pn(n);
        En(u, "_im_mess_stack") || (u = gn(u, "._im_mess_stack", -1));
        for (var c = (0, Ct.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && c && !vn("_im_mess_" + c.messageId);) c = (0, Ct.getLastMessage)(e, t.peerId, c.messageId);
        var d = vn("_im_unread_bar_row", n),
            f = (0, Mt.getUserId)(t),
            p = c ? D(c.date, e) : 0;
        if (!c || R(o, c, t, e, a)) {
            var m = "",
                g = !1;
            if (d && (0, Mt.isOut)(t) && qe(e, n, t.peerId), 1 === o.unread && !(0, Mt.isOut)(t) && a && (m += In("im_mess_bar", {}), g = !0, qe(e, n, t.peerId)), !Rn(new Date(p))) {
                var h = new Date,
                    _ = g ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                m += In("im_day_bar", {
                    day: Nn(t.date, e.timeshift, !0, Mn("months_of", "raw"), !0),
                    date: t.date,
                    day_class: h.getDate() + h.getMonth() + h.getFullYear() + " " + _
                })
            }
            if (ue(t)) m += In("im_service_row", {
                text: de(e, t, o),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                var v = e.gid && (0, Mt.isOut)(t) ? ln(t.kludges.from_admin) || 0 : 0,
                    y = (0, At.oCacheGet)(e, v ? -e.gid : f) || o,
                    C = L(t.peerId) ? y.name : y.first_name,
                    k = y.link || o.href,
                    S = In("im_mess_stack_name", {
                        name: C,
                        link: k,
                        "class": (0, Mt.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                    });
                if ((0, Mt.isGift)(t)) {
                    var T = Mn("mail_gift_message_sent", "raw");
                    S += ' <span class="im-mess-stack--gift">' + Pn(y.sex || 0, T) + "</span>"
                }
                if ((0, Mt.isMoney)(t)) {
                    var I = (0, Mt.isMoneyRequest)(t) ? Mn("mail_money_request_message_sent", "raw") : Mn("mail_money_tranfer_message_sent", "raw");
                    S += ' <span class="im-mess-stack--money-transfer">' + Pn(y.sex || 0, I) + "</span>"
                }
                var M = e.gid ? "/gim" + e.gid : "/im",
                    P = void 0;
                if (P = t.local ? j(t.date, e.timeshift) : In("im_stack_date", {
                        date: j(t.date, e.timeshift),
                        link: M + "?sel=" + t.peerId + "&msgid=" + t.messageId
                    }), v && e.admins[v]) {
                    var O = e.admins[v],
                        A = v === en.id ? Mn("mail_by_you") : O[0];
                    P = P + " " + In("im_admin_link", {
                        name: A,
                        href: O[1]
                    })
                }
                m += In("im_mess_stack", {
                    photo: y.photo,
                    href: k,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: cn(S),
                    stack_name: S,
                    peerId: f,
                    date: P,
                    messages: l,
                    admin: t.kludges.from_admin || 0
                })
            }(0, Ot.toArray)(on(m)).forEach(function(e) {
                return n && n.appendChild(e)
            })
        } else d && e.peer === t.peerId && !o.inplaceSearch && (0, Mt.isOut)(t) && qe(e, n, t.peerId), vn("_im_stack_messages", u).appendChild(nn(l));
        return (0, Mt.isOut)(t) && !i && setTimeout(function() {
            var e = vn("_im_mess_" + t.messageId, n);
            En(e, jt) && yn(e, "im-mess_sending")
        }, 500), s = s.filter(function(e) {
            return e.rid !== t.randomId
        }), w(n), E(s, e, n)
    }

    function E(e, t, n) {
        var r = void 0;
        return r = "object" === ("undefined" == typeof e ? "undefined" : wt(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return (0, Ct.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return C(t, e, n, !1)
        }), n
    }

    function k(e) {
        var t = vn("_im_mess_blind_unread_marker", e);
        t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
    }

    function S(e, t, n) {
        var r = e.tabs[t];
        return (0, Ot.toArray)(_n("_im_mess_unread", n)).forEach(function(e) {
            var t = ln(hn(e, "msgid"));
            t > 0 && r.out_up_to >= t && (wn(e, "_im_mess_unread"), wn(e, "im-mess_unread"), k(e))
        }), n
    }

    function T(e, t, n) {
        var r = vn("_im_msg_media" + t.messageId, e);
        return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function I(e, t) {
        if (!(0, Ct.isFullyLoadedTab)(t, e.peerId)) return 0;
        var n = t.tabs[e.peerId];
        return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
    }

    function M(e) {
        return 0 == e ? !0 : !1
    }

    function P(e) {
        return e > 0 && 2e9 > e
    }

    function L(e) {
        return e > 2e9
    }

    function O(e) {
        return -2e9 > e
    }

    function A(e, t) {
        return e === t.peer
    }

    function x(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function N(e, t) {
        return x(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function D(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function R(e, t, n, r, a) {
        if ((0, Mt.getUserId)(t) !== (0, Mt.getUserId)(n)) return !0;
        var i = D(t.date, r),
            o = D(n.date, r);
        return Dn(i, o) ? (0, Ct.isCommunityInterface)(r) && ln(t.kludges.from_admin) !== ln(n.kludges.from_admin) ? !0 : n.date - t.date > 300 ? !0 : ue(t) || ue(n) ? !0 : (0, Mt.isGift)(t) || (0, Mt.isGift)(n) ? !0 : (0, Mt.isGraffiti)(t) || (0, Mt.isGraffiti)(n) ? !0 : (0, Mt.isUnread)(e, t) === (0, Mt.isUnread)(e, n) || !a || (0, Mt.isOut)(n) || me(n.peerId, r.gid) ? !1 : !0 : !0
    }

    function j(e, t) {
        return Ln(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function B(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            a = Math.round(1e9 * Math.random()).toString(16),
            i = {},
            o = 0;
        return t = (0, Pt.replaceHyperLinks)(t || "", Pt.linksReplacer.bind(null, r)), t = t.replace(/(<a.+?<\/a>)/gi, function(e) {
            var t = "!link_" + o + "_" + a + "!";
            return i[t] = e, o++, t
        }), t = (0, Pt.replaceMentions)(t), t = (0, Pt.replaceEmailLinks)(t), t = (0, Pt.replaceHashtags)(t, function(t) {
            var n = (0, Ct.getGroupId)(e),
                r = n ? "gim" + n : "im";
            return '<a href="/' + r + "?sel=" + (0, Ct.getPeer)(e) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
        }), Object.keys(i).forEach(function(e) {
            t = t.replace(e, function() {
                return i[e]
            })
        }), n.emoji && (t = qn.emojiToHTML(t, !0)), Qn && (t = Qn(t)), t
    }

    function F(e) {
        return L(e) ? "c" + (e - 2e9) : O(e) ? "e" + Math.abs(e + 2e9) : e
    }

    function H(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "e":
                return -2e9 - ln(e.substr(1));
            case "c":
                return 2e9 + ln(e.substr(1));
            default:
                return ln(e)
        }
    }

    function U(e) {
        return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
    }

    function z(e) {
        return {
            search: {
                name: Mn("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: Mn("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: Mn("mail_allow_comm_messages")
            },
            clear: {
                name: Mn(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: Mn("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: Mn("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: Mn("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: Mn(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: Mn("mail_update_photo_red")
            },
            block: {
                icon: "block",
                name: Mn("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: Mn("mail_im_create_chat_with")
            },
            invite_link: {
                icon: "invite-link",
                name: Mn("mail_chat_invite_link")
            },
            leave: {
                icon: "leave",
                name: Mn("mail_leave_chat")
            },
            topic: {
                icon: "topic",
                name: Mn("mail_change_topic")
            },
            "return": {
                icon: "return",
                name: Mn("mail_return_to_chat")
            },
            pin_hide: {
                icon: "pin_hide",
                name: Mn("mail_menu_pin_hide")
            },
            pin_unhide: {
                icon: "pin_unhide",
                name: Mn("mail_menu_pin_show")
            },
            unpin: {
                icon: "unpin",
                name: Mn("mail_menu_unpin")
            },
            settings: {
                icon: "settings",
                name: Mn("mail_settings")
            }
        }
    }

    function G(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (n = In("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
    }

    function V(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (n = In("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
    }

    function q(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, n) {
                    return G(e, t[n])
                }).join("");
            case 3:
                return G(e[0], t[0]) + e.slice(1).map(function(e, n) {
                    return V(e, t[n + 1])
                }).join("");
            case 4:
                return e.map(function(e, n) {
                    return V(e, t[n])
                }).join("")
        }
    }

    function W(e, t, n) {
        if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
        if (L(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
        if (Array.isArray(t.photo)) return q(t.photo);
        var r = t.data.active.slice(0, 4).map(At.oCacheGet.bind(null, e)),
            a = r.map(function(e) {
                return e.photo
            }),
            i = n ? [] : r.map(function(e) {
                return e.link
            });
        return q(a, i)
    }

    function K(e) {
        var t = Mn(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + Xt + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
    }

    function Y() {
        return '<li class="im-search-results-head">' + Mn("mail_search_messages") + "</li>"
    }

    function Q() {
        return '<li class="im-search-results-head">' + Mn("mail_search_conversations_sep") + "</li>"
    }

    function $() {
        return '<li class="im-search-results-head">' + Mn("mail_search_dialogs_sep") + "</li>"
    }

    function X() {
        return '<li class="im-search-results-head _im_recent_bar">\n    ' + Mn("mail_recent_searches") + '\n    <button type="button" class="' + $t + ' im-page--clear-recent">' + Mn("mail_clear_recent") + "</button>\n  </li>"
    }

    function Z(e) {
        var t = e.get().popular_sugg,
            n = (0, Ct.isClassicInterface)(e) ? 8 : 5;
        return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
            var n = t.peerId,
                r = (0, At.oCacheGet)(e, n) || t,
                a = e.get().tabs[n] || t,
                i = (e.get().mutedPeers || []).indexOf(n) >= 0,
                o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, a.unread > 0 && "sugg-is_unread", i && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ");
            return '<div class="' + o + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Gn(a.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + U(a.unread) + "</span>\n</div>"
        }).join("") + "</li>"
    }

    function J(e, t, n) {
        var r = vn("_im_mess_" + t.messageId, n);
        if (r) {
            kn(r, "aria-hidden", "false"), yn(r, "im-mess_failed " + Bt);
            var a = vn("_im_mess_marker", r);
            kn(a, "aria-label", Mn("mail_send_message_error")), kn(a, "role", "link")
        }
        return n
    }

    function ee(e, t, n) {
        var r = vn("_im_mess_" + t, n);
        if (r) {
            wn(r, "im-mess_failed"), kn(r, "aria-hidden", "true"), wn(r, Bt);
            var a = vn("_im_mess_marker", r);
            kn(a, "aria-label", ""), kn(a, "role", "")
        }
        return n
    }

    function te(e, t) {
        var n = e.map(function(e) {
            return vn("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return ne(n, t)
    }

    function ne(e, t) {
        var n = e.filter(function(e) {
            return !En(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), n.filter(function(e) {
            return 0 === mn(e).length
        }).map(function(e) {
            return bn("_im_mess_stack", e)
        }).forEach(function(e) {
            En(fn(e), "_im_bar_date") && rn(fn(e)), En(fn(e), "_im_unread_bar_row") && rn(fn(e)), rn(e)
        }), t
    }

    function re(e, t, n, r) {
        return e.map(function(e) {
            return vn("_im_mess_" + e, r)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            Tn(e, se(t, e, n)), yn(e, "im-mess_light")
        }), r
    }

    function ae(e, t, n) {
        var r = vn("_im_mess_" + e, n);
        if (r) {
            var a = vn(Ft, r);
            Tn(r, a.innerHTML), wn(r, "im-mess_light")
        }
        return n
    }

    function ie(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
            i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
        if (i) return oe(e, t, n, r, !0, a);
        var o = ((0, Ct.isClassicInterface)(r), 60),
            s = oe(e, t, n, r, !1, a);
        return s.length > o ? oe(e, t, n, r, !0, a) : s
    }

    function oe(e, t, n, r, i, o) {
        var s = [],
            l = (e && e.userIds || []).filter(function(e) {
                var t = (0, At.oCacheExists)(r, e);
                return t || s.push(e), t && e != r.id
            });
        if (s.length && (0, Dt.loadChatMember)(a({}, t, s), r), 0 === l.length) return "";
        var u = P(t) || (0, Ct.isCommunityPeer)(t) ? "first_name" : i ? "short_name" : "name";
        if (1 == l.length) {
            var c = n ? "" : (0, At.oCacheGet)(r, l[0])[u];
            return c + " " + Mn("mail_typing")
        }
        var d = Mn("mail_typing_several", l.length),
            f = l.slice(0, Math.min(l.length - 1, o)),
            p = f.map(function(e) {
                return (0, At.oCacheGet)(r, e)[u]
            }).join(", ");
        if (l.length > o + 1) p += " " + Mn("mail_and_peer").replace("{count}", e.totalCount - o).replace("{typing}", d);
        else {
            var m = (0, At.oCacheGet)(r, l[f.length])[u];
            p += " " + Mn("mail_and_peer_one") + " " + m + " " + d
        }
        return p
    }

    function se(e, t, n) {
        var r = t.innerHTML,
            a = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + Mn(a) + ' <button type="button" data-peer="' + e + '" class="' + Ht + ' im-mess--btn">' + Mn("mail_restore") + '</button>\n    <div class="' + Ft + ' im-mess--original">' + r + "</div>\n  </div>"
    }

    function le() {
        return '<div class="im-page--chat-search-empty">\n    ' + Mn("mail_im_search_empty") + "\n  </div>"
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
            o = ln(a.source_mid),
            s = t.userId,
            l = (0, At.oCacheGet)(e, s),
            u = "",
            c = s === o;
        switch (i) {
            case Ut:
                u = "mail_im_chat_created";
                break;
            case zt:
                u = "mail_im_title_updated_dot";
                break;
            case Gt:
                u = c ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case Vt:
                u = c ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case qt:
                u = "mail_im_photo_set";
                break;
            case Wt:
                u = "mail_im_photo_removed";
                break;
            case Kt:
                u = a.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                break;
            case Yt:
                u = a.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                break;
            case Qt:
                u = "mail_im_invite_by_link";
                break;
            default:
                return "mail_no_support"
        }
        if (u = Pn(l.sex, Mn(u, "raw")), u = u.replace("{from}", ce(l.link, l.name, r)), o && o !== s) {
            var d = a.source_email;
            if (d) u = u.replace("{user}", ce("/im?email=" + encodeURIComponent(d), "email", r));
            else {
                var f = (0, At.oCacheGet)(e, o),
                    p = i === Vt ? f.inv_name : f.kick_name;
                u = u.replace("{user}", ce(f.link, p, r))
            }
        }
        if (a.source_text) {
            var m = a.source_old_text ? '«<b class="im_srv_lnk">' + a.source_old_text + "</b>» &rarr; " : "";
            u = u.replace("{title}", m + ('«<b class="im_srv_lnk">' + a.source_text + "</b>»"))
        }
        if (a.source_act === Kt || a.source_act === Yt)
            if (a.source_message) {
                var g = pe(qn.emojiToHTML(cn(a.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                    h = ce("", g, !1, "im_srv_mess_link");
                u = u.replace("{msg}", h)
            } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                return ce("", t, !1, "im_srv_mess_link")
            });
        return u
    }

    function fe(e, t, n, r) {
        if (t === qt) {
            var a = vn("_im_mess_" + e.messageId, r);
            if (a) {
                var i = n.tabs[e.peerId];
                a.parentNode.innerHTML = In("im_msg_row", {
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

    function pe(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(Tt.MENTION_RAW, "$1$4")
    }

    function me(e, t) {
        return t ? !1 : e === en.id
    }

    function ge(e, t) {
        return Un(e, {
            url: (0, Ct.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

    function he(e) {
        return function(t) {
            function n() {
                o = !0, wn(i, "im-preloader_visible"), i.parentNode && i.parentNode.removeChild(i)
            }
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                i = nn(In("im_preloader", {
                    preloader: an(en.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === r ? "im-preloader_bottom" : "im-preloader_top", a].join(" ")
                })),
                o = !1;
            setTimeout(function() {
                o || ("bottom" === r ? e.appendChild(i) : e.insertBefore(i, dn(e)), yn(i, "im-preloader_visible"))
            }, 0), t.then(n)["catch"](function(e) {
                (0, Rt.imWeirdCatch)("wrapLoading", e), n()
            })
        }
    }

    function _e(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, kt.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function ve(e, t) {
        if (!t && !e) return !1;
        var n = e.target || e.srcElement,
            r = Zn,
            a = !1,
            i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
        do
            if (!n || n.onclick || n.onmousedown || "A" == n.tagName || En(n, "_im_no_select") || En(n, "im_msg_media_link") || "IMG" == n.tagName && !En(n, "_im_graffiti") && !En(n, "emoji") && !En(n, "emoji_css") && !En(n, "im_gift") || "TEXTAREA" == n.tagName || En(n, "play_new") || En(n, "videoplayer") || (a = i.test(n.className))) break; while (r-- && (n = n.parentNode));
        return a ? !!un(be()) : !0
    }

    function be() {
        var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
        return (e || "").toString()
    }

    function ye(e, t) {
        return '<div class="im-mess--text">\n      <span>' + Mn("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + F(e) + "&msgid=" + t + '">' + Mn("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function we(e, t) {
        var n = Mn(L(e) ? "mail_chat_sure_to_delete_all" : (0, Ct.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
        return Fn(Mn("mail_deleteall1"), n, Mn("mail_delete"), t, Mn("global_cancel"))
    }

    function Ce(e) {
        return Fn(Mn("mail_unpin_title"), Mn("mail_unpin_text"), Mn("mail_unpin"), e, Mn("global_cancel"))
    }

    function Ee(e, t, n, r) {
        var a = Mn("mail_dialog_msg_delete_N", t),
            i = Fn(Mn("mail_dialog_msg_delete_title"), a, Mn("mail_delete"), function() {
                return r(isChecked(vn("_check_forall")))
            }, Mn("global_cancel")),
            o = "",
            s = !1;
        return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Mn("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), i.setControlsText(o), s && checkbox(vn("_check_forall")), i
    }

    function ke(e, t, n, r, a) {
        t.showProgress(), e.set(r.bind(null, a)).then(function() {
            t.hideProgress(), t.hide(), n().removePeer(e, a), n().updateDialogFilters(e)
        })
    }

    function Se(e, t, n, r, a) {
        var i = e.get().peer;
        Yn(r), Bn("al_im.php", {
            act: "a_show_members_box",
            chat: i - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(r, a) {
                var i = (0, It.createModule)({
                    handlers: function(a, o) {
                        o(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            r.hide(), Te(e, e.get().peer, t, n), (0, It.destroyModule)(i)
                        }), o(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                            var n = vn("_im_chat_members_w", r.bodyNode.parentNode),
                                a = 160,
                                i = bn("_im_member_item", t),
                                o = i.offsetTop - n.scrollTop + a,
                                s = o > 370;
                            mobileOnlineTip(t, {
                                was: ln(hn(t, "was")),
                                mid: ln(hn(t, "peer")),
                                vk_mobile: ln(hn(t, "vk_mobile")),
                                forcetoup: s
                            })
                        })
                    }
                })
            }
        }, r)
    }

    function Te(e, t, n, r) {
        var a = e.get().tabs[t],
            i = a.memberIds;
        e.set(r.bind(null, "add_member", i)).then(n().showCreation)
    }

    function Ie(e, t, n) {
        if (e.get().active_tab === Tt.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var r = e.get().active_tab === Tt.FOLDER_ALL ? Tt.FOLDER_UNREAD : Tt.FOLDER_ALL;
        return e.set(n.bind(null, r)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function Me(e, t, n, r) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var a = (0, Ct.isReversedDialogs)(t);
        return t.set(r.bind(null, e)).then(function(e) {
            return n().restoreDialogs(e, !0, a !== (0, Ct.isReversedDialogs)(e)), e
        })
    }

    function Pe(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var n = e.get().tabs[t];
        return Tt.FOLDER_MASKS[Tt.FOLDER_IMPORTANT] & n.folders
    }

    function Le(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        if ("undefined" == typeof t && (t = e.get().peer), !(0, Ct.isFoldersAvailable)(e)) return !1;
        var r = n || e.get().tabs[t];
        return Tt.FOLDER_MASKS[Tt.FOLDER_UNRESPOND] & r.folders
    }

    function Oe(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function Ae(e) {
        return null != e.get().pendingForward
    }

    function xe(e, t) {
        return (t.get().block_states[e] || {}).who === en.id
    }

    function Ne(e, t) {
        var n = e.get().block_states;
        Object.keys(n).forEach(function(r) {
            n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([kt.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
        })
    }

    function De(e, t, n) {
        var r = void 0;
        return !Hn("al_im.php", {
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
                    Vn.loaded && Vn.detachPlayer(!0), r.unmount()
                }
            }
        }, n)
    }

    function Re(e, t) {
        return je(e.get(), t, (0, Ct.getTab)(e, t).last_seen)
    }

    function je(e, t, n, r) {
        if (n[0]) return 2 === n[2] ? '<span class="is_vk_mobile is_online">' + Mn("mail_header_online_status") + Be(t, !1, !0, !0, r) + "</span>" : "online" + (zn[n[0]] ? Be(t, !1, !1, !0, r) : "");
        if (!n[1]) return "";
        var a = An(n[1], e.timeshift),
            i = Pn((0, At.oCacheGet)(e, t).sex, Mn("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", a);
        return 2 === n[2] ? i += Be(t, !1, !0, !1, r) : n[2] && (i += Be(t, !1, !1, !1, r)), i
    }

    function Be(e, t, n, r, a) {
        var i = {
            mid: e
        };
        r && (i.was = 1), t ? i.forcetoup = !0 : i.forcetodown = !0, n && (i.vk_mobile = 1), i = Object.assign(i, a);
        var o = Object.keys(i).map(function(e) {
                return e + ": " + i[e]
            }).join(", "),
            s = n ? "" : 'onclick="mobilePromo();"',
            l = n ? " vk_mobile" : "";
        return In("im_wrap_mobile", {
            "class": "im_status_mob_onl" + l,
            params: o,
            attrs: s
        })
    }

    function Fe(e, t) {
        var n = t.get().tabs[e];
        return Bn("al_settings.php", {
            act: "blacklist_box",
            q: n.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function He(e, t) {
        return Bn("groupsedit.php", {
            act: "bl_edit",
            name: "/id" + e,
            gid: t.get().gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    }

    function Ue(e) {
        return e.get().gid ? "/gim" + e.get().gid : "/im"
    }

    function ze(e, t, n, r) {
        var a = void 0,
            i = Hn("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, i) {
                    i && (a = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Vn.loaded && Vn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        a && a.unmount()
                    }
                }
            }, r);
        it(i, e)
    }

    function Ge() {
        var e = document.activeElement;
        return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
    }

    function Ve(e, t, n) {
        var r = vn("_im_mess_" + e, n);
        return r && Cn(r, "im-mess_fav", t), n
    }

    function qe(e, t, n) {
        var r = vn("_im_unread_bar_row", t);
        if (!r) return t;
        var a = gn(r, "._im_mess_stack", -1),
            i = gn(r, "._im_mess_stack"),
            o = a ? _n("_im_mess", a).pop() : null,
            s = i ? vn("_im_mess", i) : null;
        if (rn(r), _(t), !s || !o) return t;
        var l = hn(s, "msgid"),
            u = (0, Ct.getPreviousMessage)(e, n, l),
            c = (0, Ct.getMessage)(e, n, l);
        if (!u || R(e.tabs[n], u, c, e)) return t;
        var d = vn("_im_stack_messages", a),
            f = vn("_im_stack_messages", i).children;
        return (0, Ot.toArray)(f).forEach(function(e) {
            rn(e), d.appendChild(e)
        }), rn(i), t
    }

    function We(e, t, n) {
        var r = (0, Ct.getFirstUnread)(e, e.get().peer);
        if (!r) return [!1, 0];
        var a = vn("_im_mess_" + r, t);
        if (!a) {
            var i = (0, Ct.getLastMessage)(e, e.get().peer, r);
            if (!i) return [!0, 0];
            a = vn("_im_mess_" + i.messageId, t)
        }
        var o = En(a, "_im_mess_srv") ? a : bn("_im_mess_stack", a);
        if (!o) return [!0, 0];
        var s = a ? a.offsetTop : 0,
            l = o.offsetTop + s,
            u = n.contHeight();
        return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - l)]
    }

    function Ke(e, t, n) {
        Yn(t);
        var r = bn("_im_top_notice", n);
        Kn(r, 200, rn.pbind(r));
        var a = bn("_im_page_dialogs", r);
        a && En(a, "im-page--dialogs-notice") && wn(a, "im-page--dialogs-notice"), jn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Ye(e, t, n) {
        Yn(t);
        var r = bn("_im_aside_notice", n);
        Wn(r, 200, rn.pbind(r)), jn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Qe(e, t) {
        Yn(e);
        var n = bn("_im_aside_promo_block", t);
        Wn(n, 200, rn.pbind(n)), jn.post("al_im.php", {
            act: "a_hide_promo_block",
            type: n.getAttribute("data-type"),
            hash: n.getAttribute("data-hash")
        })
    }

    function $e(e, t) {
        var n = bn("_im_aside_promo_block", t);
        n.classList.add("--action-called"), jn.post("al_im.php", {
            act: "a_vkadmin_app_install",
            hash: hn(t, "hash"),
            platform: hn(t, "platform")
        })
    }

    function Xe(e, t, n, r, a) {
        return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = (0, Pt.replaceMentions)(n, function(e, t, n, r, a) {
            return a
        }), r && (n = qn.emojiToHTML(n, !0)), t && "..." !== t.trim() && !L(e) && (n = In("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + n), !n && a.length > 0 && (n = In("im_dialog_media", {
            name: Ze(a[0], a)
        })), n
    }

    function Ze(e, t) {
        var n = {
            photo: Mn("mail_added_photos", "raw"),
            video: Mn("mail_added_videos", "raw"),
            audio: Mn("mail_added_audios", "raw")
        };
        switch (e.type) {
            case "mail":
                return On(e.object.fwd_count, Mn("mail_fwd_msgs", "raw"), !0);
            case "photo":
            case "video":
            case "audio":
                var r = t.filter(function(t) {
                    return t.type === e.type
                }).length;
                return On(r, n[e.type], !0);
            case "audio_playlist":
                return Mn("mail_added_audio_playlist");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return Mn("mail_added_graffiti");
                    case "audiomsg":
                        return Mn("mail_added_audiomsg");
                    default:
                        return Mn("mail_added_docs")
                }
            case "geo":
            case "map":
                return Mn("mail_added_geo");
            case "wall":
                return Mn("mail_added_wall");
            case "wall_reply":
                return Mn("mail_added_wall_reply");
            case "gift":
                return Mn("mail_added_gift");
            case "link":
            case "share":
                return Mn("mail_added_link");
            case "sticker":
                return Mn("mail_added_sticker");
            case "market":
                return Mn("mail_added_market_item");
            case "money_transfer":
                return Mn("mail_added_money_transfer");
            case "money_request":
                return Mn("mail_added_money_request");
            case "story":
                return Mn("mail_added_story");
            case "mask":
                return Mn("mail_added_mask");
            case "article":
                return Mn("mail_added_article");
            default:
                return Mn("mail_added_" + e.type)
        }
        return ""
    }

    function Je(e) {
        yn(e, "im-send-btn_loading")
    }

    function et(e) {
        wn(e, "im-send-btn_loading")
    }

    function tt(e) {
        var t = e.get(),
            n = (0, Ct.getPinnedMessage)(e);
        if (!n || !(0, xt.isPinnedMessageVisibleInTab)(e, (0, Ct.getPeer)(e))) return "";
        var r = (0, At.oCacheGet)(e, n.userId);
        if (!r) return "";
        var a = nt(e, n);
        a || (a = n.text, a = !a && n.attaches.length ? In("im_pinned_message_media", {
            text: Ze(n.attaches[0], n.attaches)
        }) : B(e, a, n && n.kludges || {}) || ""), a = a.replace(/<br\s?\/?>/gi, " ");
        var i = In("im_pinned_message", {
            date: xn(n.date, t.timeshift),
            content: a,
            link: r.link,
            name: r.name
        });
        return i
    }

    function nt(e, t) {
        var n = "";
        if (t && (0, Mt.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
            var r = "%s " + t.kludges.attach1_currency;
            if ("RUB" === t.kludges.attach1_currency && (r = Mn("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                var a = On(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                    i = On(t.kludges.attach1_total_amount / 1e3, r, !0);
                n = Mn("mail_money_request_collected_amount_from").replace("{amount}", a).replace("{total_amount}", i)
            } else {
                var o = On(t.kludges.attach1_tr_amount / 1e3, r, !0);
                n = Mn("mail_money_request_collected_amount").replace("{amount}", o)
            }
            if (ln(t.kludges.attach1_held_amount)) {
                var s = On(t.kludges.attach1_held_amount / 1e3, r, !0);
                n += " " + Mn("mail_money_request_held_amount").replace("{amount}", s)
            }
            t.text && (n += '<span class="divider"></span>' + B(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += In("im_pinned_message_media_bar", {
                percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
            }))
        }
        return n
    }

    function rt(e, t, n) {
        var r = +n.getAttribute("data-time");
        r && Un(n, {
            text: Mn("mail_message_edited") + " " + xn(r, e.get().timeshift),
            className: "_im_history_tooltip",
            appendParentCls: "_im_mess_stack",
            black: 1,
            shift: [0, 4]
        })
    }

    function at() {
        var e = getSize(vn(Zt))[1];
        return e || (e = Jn), e
    }

    function it(e, t) {
        e.bodyNode.addEventListener("mouseover", function(e) {
            En(e.target, "_im_edit_time") && rt(t, e, e.target)
        })
    }

    function ot(e, t, n, r, a) {
        var i = e.get(),
            o = void 0,
            s = Hn("al_im.php", {
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
                        Vn.loaded && Vn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, a);
        it(s, e)
    }

    function st(e, t) {
        return L(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
    }

    function lt(e) {
        return !L(e.peerId) || e.data.kicked ? 0 : e.membersCount
    }

    function ut(e, t) {
        var n = (0, At.oCacheGet)(e, t.peerId),
            r = (0, Ct.getTab)(e, t.peerId) || {};
        return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, L(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
    }

    function ct(e, t) {
        for (var n in t) t.hasOwnProperty(n) && ut(e, t[n])
    }

    function dt(e, t) {
        var n = [],
            r = t.find(function(e) {
                return "mail" === e[0]
            }),
            a = r ? r[1].split(";") : [];
        for (a.length > Xn && (r[1] = a.slice(0, Xn).join(";")); e.length > $n;) {
            var i = e.substr(0, $n).lastIndexOf(" "); - 1 == i && (i = $n), n.push({
                msgText: un(e.substr(0, i))
            }), e = un(e.substr(i))
        }
        for (e.length && n.push({
                msgText: e,
                attaches: t
            }), n.length || n.push({
                attaches: t
            }), a = a.slice(Xn); a.length; a = a.slice(Xn)) n.push({
            attaches: [
                ["mail", a.slice(0, Xn).join(";")]
            ]
        });
        return n
    }

    function ft(e) {
        return e.length > $n
    }

    function pt(e, t, n) {
        var r = !1;
        Bn("al_im.php", {
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
                    return Fn(Mn("global_error"), e)
                }, 0), !0
            },
            onDone: function(t, n) {
                r = (0, Lt.mount)(t.bodyNode, e)
            }
        }, {})
    }

    function mt() {
        Fn(Mn("global_error"), Mn("mail_message_wait_until_uploaded"))
    }

    function gt(e, t) {
        var n = (0, Ct.getTab)(e, t.peerId) || {};
        if (!t || !(0, Mt.isOut)(t)) return !1;
        if (333 == t.peerId) return !1;
        if (Date.now() / 1e3 - t.date > 86400) return !1;
        if (d(e, t.peerId, t.messageId)) return !1;
        if (L(t.peerId)) {
            if (n.data.kicked || n.data.closed) return !1
        } else if (n.block_error > 0) return !1;
        return !0
    }

    function ht(e, t) {
        var n = (0, Ct.getTab)(e, t),
            r = -1 !== n.memberIds.indexOf(n.ownerId),
            a = 5,
            i = r ? [n.ownerId] : [];
        return i = i.concat(n.memberIds.filter(function(t) {
            return t !== n.ownerId && (0, At.oCacheExists)(e, t)
        }).slice(0, r ? a - 1 : a)), i.map(function(t) {
            return (0, At.oCacheGet)(e, t)
        })
    }

    function _t(e, t) {
        return t.map(function(t) {
            return (0, At.oCacheGet)(e, t)
        })
    }

    function vt(e, t) {
        var n = (0, Ct.getTab)(e, t);
        return n.memberIds.reduce(function(t, n) {
            var r = (0, At.oCacheGet)(e, n);
            return t[r.id] = r, t
        }, {})
    }

    function bt(e, t) {
        if ("number" != typeof e || 0 === e) return "";
        var n = 1,
            r = 60,
            a = 3600,
            i = 86400,
            o = 604800,
            s = 2592e3,
            l = 31536e3,
            u = [
                [l, t ? Mn("global_years_accusative", "raw") : Mn("global_age_years", "raw")],
                [s, t ? Mn("global_months_accusative", "raw") : Mn("global_age_months", "raw")],
                [o, t ? Mn("global_weeks_accusative", "raw") : Mn("global_age_weeks", "raw")],
                [i, t ? Mn("global_days_accusative", "raw") : Mn("global_age_days", "raw")],
                [a, t ? Mn("global_hours_accusative", "raw") : Mn("global_hours", "raw")],
                [r, t ? Mn("global_minutes_accusative", "raw") : Mn("global_minutes", "raw")],
                [n, t ? Mn("global_seconds_accusative", "raw") : Mn("global_age_seconds", "raw")]
            ],
            c = e,
            d = [],
            f = void 0;
        if (u.forEach(function(e) {
                var t = yt(e, 2),
                    n = t[0],
                    r = t[1],
                    a = Math.floor(c / n);
                c %= n, a >= 1 && d.push(On(a, r))
            }), f = d.length, 1 === f) return d.pop();
        var p = d.slice(0, f - 1).join(", "),
            m = d.pop();
        return Mn("global_and").replace(/{before}/gi, p).replace(/{after}/gi, m)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PINNED_CONTAINER_CLASS = t.MESSAGE_SEARCH_CLASS = t.CLEAR_RECENT_CLASS = t.INSTALL_VKADMIN_LINK = t.HIDE_ASIDE_PROMO_BLOCK_CLASS = t.HIDE_ASIDE_NOTICE_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_INVITE_BY_LINK = t.CHAT_UNPIN_MESSAGE = t.CHAT_PIN_MESSAGE = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
    var yt = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
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
        wt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Ct = n(190);
    Object.keys(Ct).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return Ct[e]
            }
        })
    }), t.getClassicChatHeight = i, t.setClassicChatHeight = o, t.fixTableCellChildHeight = s, t.applyInnerHtml = l, t.compensateHistoryHeightChange = u, t.renderSticker = c, t.isAlreadyDeleted = d, t.replaceMessageAttrs = f, t.isVoiceMessageAvailable = p, t.getAvailableMicrophones = m, t.renderAttach = g, t.dayFromVal = h, t.showInvisibleBar = _, t.editAndReplaceMessage = v, t.renderMessage = b, t.renderMessageMedia = y, t.ensureDomHasActions = w, t.appendToHistory = C, t.restoreQueue = E, t.markMessagesAsRead = S, t.replaceAttaches = T, t.isDuplicate = I, t.isReservedPeer = M, t.isUserPeer = P, t.isChatPeer = L, t.isPeerActive = A, t.isTabLoaded = x, t.isTabLoadedWithMessage = N, t.parseMessage = B, t.convertPeerToUrl = F, t.unUrlPeer = H, t.simplifyCounter = U, t.chatActions = z, t.renderPhotos = q, t.renderPhotosFromTab = W, t.renderBtnSearchOnlyMessages = K, t.renderMessagesSep = Y, t.renderConversationsSep = Q, t.renderPopularSuggSep = $, t.renderClearRecent = X, t.renderPopularSuggestions = Z, t.setMessageError = J, t.startResendMessage = ee, t.removeMessages = te, t.removeMessagesWithRestore = re, t.restoreMessage = ae, t.formatTyper = ie, t.renderEmptySearch = le, t.isServiceMsg = ue, t.serviceLink = ce, t.renderServiceMsg = de, t.addChatPhotoToUpdate = fe, t.replaceSpecialSymbols = pe, t.isSelfMessage = me, t.showVerifiedTooltip = ge, t.wrapLoading = he, t.tabFromIds = _e, t.checkSelectClick = ve, t.renderGoTo = ye, t.showFlushDialog = we, t.showUnpinDialog = Ce, t.showMsgDeleteDialog = Ee, t.cleanHistory = ke, t.showChatMembers = Se, t.inviteUser = Te, t.showUnreadOnly = Ie, t.changeTab = Me, t.isImportant = Pe, t.isUnrespond = Le, t.isPeerBlocked = Oe, t.isPendingForward = Ae, t.isPeerBlockedByMe = xe, t.blockLatencyCompensation = Ne, t.showSpamLayer = De, t.getLastSeenTextInHeader = Re, t.getLastSeenText = je, t.showBlacklistBoxUser = Fe, t.showBlacklistBox = He, t.getBaseLink = Ue, t.showFavvedBox = ze, t.isEditableFocused = Ge, t.updateStar = Ve, t.removewNewUnreadBarAndMerge = qe, t.isMessagesVisible = We, t.hideTopNotice = Ke, t.hideAsideNotice = Ye, t.hideAsidePromoBlock = Qe, t.installVKAdminApp = $e, t.renderShortText = Xe, t.attachToText = Ze, t.lockButton = Je, t.unlockButton = et, t.renderPinnedMessage = tt, t.renderPinnedMedia = nt, t.showEditTimeTooltip = rt, t.getPinnedMessageHeight = at, t.boxHandleEditTimeTooltips = it, t.showPinnedBox = ot, t.isUserAliveInChat = st, t.getAliveMembersCount = lt, t.normalizeTab = ut, t.normalizeTabsGotFromServer = ct, t.splitMessageToParts = dt, t.isMessageTooLong = ft, t.showInvitationBox = pt, t.showWaitUntilUploadedBox = mt, t.canMessageBeDeletedForAll = gt, t.getTopChatMembers = ht, t.getChatMembersByIds = _t, t.getChatMembers = vt, t.formatTimespan = bt;
    var Et = n(199),
        kt = r(Et),
        St = n(94),
        Tt = r(St),
        It = n(198),
        Mt = n(188),
        Pt = n(82),
        Lt = n(141),
        Ot = n(23),
        At = n(121),
        xt = n(37),
        Nt = n(210),
        Dt = n(28),
        Rt = n(12),
        jt = t.SENDING_CLASS = "_im_mess_sending",
        Bt = t.FAILED_CLASS = "_im_mess_failed",
        Ft = t.ORIGINAL_CLASS = "_im_mess_original",
        Ht = t.RESTORE_CLASS = "_im_mess_restore",
        Ut = (t.TYPING_CLASS = "_im_typing", t.CREATE_CHAT_ACTION = "chat_create"),
        zt = t.CHAT_TITLE_ACTION = "chat_title_update",
        Gt = t.CHAT_INVITE_USER = "chat_invite_user",
        Vt = t.CHAT_KICK_USER = "chat_kick_user",
        qt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
        Wt = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
        Kt = t.CHAT_PIN_MESSAGE = "chat_pin_message",
        Yt = t.CHAT_UNPIN_MESSAGE = "chat_unpin_message",
        Qt = t.CHAT_INVITE_BY_LINK = "chat_invite_user_by_link",
        $t = (t.DESELECT_ALL_CLASS = "_im_deselect_all", t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.HIDE_ASIDE_NOTICE_CLASS = "_im_aside_notice_hide", t.HIDE_ASIDE_PROMO_BLOCK_CLASS = "_im_aside_promo_block_hide", t.INSTALL_VKADMIN_LINK = "_im_vkadmin_promo_link", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
        Xt = t.MESSAGE_SEARCH_CLASS = "_im_mess_search",
        Zt = t.PINNED_CONTAINER_CLASS = "_im_pinned",
        Jt = window,
        en = Jt.vk,
        tn = Jt.ls,
        nn = Jt.se,
        rn = Jt.re,
        an = Jt.rs,
        on = Jt.sech,
        sn = Jt.inArray,
        ln = Jt.intval,
        un = Jt.trim,
        cn = Jt.stripHTML,
        dn = Jt.domFC,
        fn = Jt.domPS,
        pn = Jt.domLC,
        mn = Jt.domChildren,
        gn = Jt.domClosestSibling,
        hn = Jt.domData,
        _n = Jt.geByClass,
        vn = Jt.geByClass1,
        bn = Jt.gpeByClass,
        yn = Jt.addClass,
        wn = Jt.removeClass,
        Cn = Jt.toggleClass,
        En = Jt.hasClass,
        kn = Jt.attr,
        Sn = Jt.setStyle,
        Tn = Jt.val,
        In = Jt.getTemplate,
        Mn = Jt.getLang,
        Pn = Jt.langSex,
        Ln = Jt.langDate,
        On = Jt.langNumeric,
        An = Jt.getDateText,
        xn = Jt.getSmDate,
        Nn = Jt.getShortDate,
        Dn = Jt.isSameDate,
        Rn = Jt.isToday,
        jn = Jt.ajax,
        Bn = Jt.showBox,
        Fn = Jt.showFastBox,
        Hn = Jt.showTabbedBox,
        Un = Jt.showTooltip,
        zn = Jt.mobPlatforms,
        Gn = Jt.onlinePlatformClass,
        Vn = Jt.AudioMessagePlayer,
        qn = Jt.Emoji,
        Wn = Jt.slideUp,
        Kn = Jt.fadeOut,
        Yn = Jt.cancelEvent,
        Qn = Jt.ny2018ReplaceText,
        $n = 4096,
        Xn = 100,
        Zn = 8,
        Jn = 52,
        er = "chatPosition"
}, , , function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        var i = (0, g.getPeer)(e),
            o = (0, g.getTab)(e, i),
            s = (0, v.isPinnedMessageVisibleInTab)(e, (0, g.getPeer)(e)) || o && o.top_banner,
            l = 105 + (s ? (0, p.getPinnedMessageHeight)() : 0);
        showTooltip(t, {
            shift: [n, 10],
            black: 1,
            className: "_im_history_tooltip " + r,
            appendParentCls: "_im_mess_stack",
            toup: t.getBoundingClientRect().top > l + 37,
            text: a
        })
    }

    function a(e, t, n) {
        var r = gpeByClass("_im_mess", n),
            a = intval(domData(r, "msgid")),
            o = e.get().peer,
            s = (0, g.getMessage)(e, o, a),
            l = !(0, m.isImportant)(s);
        return e.get().longpoll.push([{
            peerId: o,
            messageId: a,
            type: l ? _.SET_FLAGS : _.RESET_FLAGS,
            flags: _.FLAG_IMPORTANT
        }]), e.set(f.favMessage.bind(null, [a], l, o)), i(e, -10, t, n), !1
    }

    function i(e, t, n, a) {
        var i = getLang("mail_im_toggle_important").length > 14;
        r(e, a, i ? 84 : 34, i ? "im-star-tt_long" : "im-star-tt", function() {
            var t = domData(gpeByClass("_im_mess", a), "msgid"),
                n = (0, g.getMessage)(e, e.get().peer, t);
            return n ? (0, m.isImportant)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
        })
    }

    function o(e, t, n) {
        var r = e.get().peer,
            a = +domData(domClosest("im-mess", n.target), "msgid");
        return (0, f.processFwd)([a], r, e).then(function(t) {
            return e.set(f.forwardMessages.bind(null, t, e.get().tfdraft))
        }).then(function() {
            return t().respond(e, r)
        }), !1
    }

    function s(e, t, n, a) {
        r(e, a, 18, "im-reply-tt", getLang("mail_im_reply"))
    }

    function l(e, t, n, r) {
        var a = intval(domData(gpeByClass("_im_mess", r), "msgid")),
            i = (0, g.getMessage)(e, e.get().peer, a);
        return i && t().startEditing(i), !1
    }

    function u(e, t, n) {
        r(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
    }

    function c(e, t) {
        return {
            markImportant: function(t, n, r) {
                (0, p.updateStar)(t, n, e)
            },
            unmount: function() {
                (0, h.destroyModule)(t)
            }
        }
    }

    function d(e, t, n) {
        var r = i.bind(null, t, 0),
            d = a.bind(null, t),
            f = s.bind(null, t, 0),
            p = o.bind(null, t, n),
            m = u.bind(null, t),
            g = l.bind(null, t, n),
            _ = (0, h.createModule)({
                handlers: function(t, n) {
                    n(e, "click", b, d), n(e, "mouseover", b, r), n(e, "click", y, p), n(e, "mouseover", y, f), n(e, "click", w, g), n(e, "mouseover", w, m)
                }
            });
        return c(e, _)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = d;
    var f = n(28),
        p = n(88),
        m = n(188),
        g = n(190),
        h = n(198),
        _ = n(199),
        v = n(37),
        b = "_im_mess_fav",
        y = "_im_mess_reply",
        w = "_im_mess_edit"
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = [];
        return [].concat(Array.prototype.slice.call(arguments)).forEach(function(t) {
            if (t) switch ("undefined" == typeof t ? "undefined" : a(t)) {
                case "string":
                    e.push(t);
                    break;
                case "object":
                    Object.keys(t).forEach(function(n) {
                        t[n] && e.push(n)
                    });
                    break;
                default:
                    e.push("" + t)
            }
        }), e.join(" ")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.classNames = r
}, function(e, t, n) {
    "use strict";
    var r = n(14),
        a = {};
    a[n(61)("toStringTag")] = "z", a + "" != "[object z]" && n(33)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
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
    var a, i = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
        o = "(https?:\\/\\/)?",
        s = "((?:[" + i + "\\—\\-\\_]+\\.){1,5})",
        l = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
        u = "(?:\\:(\\d{2,5}))",
        c = "(" + s + l + u + "?)",
        d = "([\\/?#])",
        f = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
        p = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
        m = "　-〿＀-￯",
        g = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
        h = "[" + f + g + p + m + "]",
        _ = "(?:\\(|\\[)[" + i + "\\d&#%;,]+(?:\\)|\\])",
        v = "(" + d + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + h + "+|" + _ + "){0,200})?",
        b = o + c + v,
        y = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
        w = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
        C = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
        E = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
        k = t.ARROW_DOWN = 40,
        S = t.PAGE_UP = 33,
        T = t.PAGE_DOWN = 34,
        I = t.END_KEY = 35,
        M = t.HOME = 36,
        P = t.ENTER = 13,
        L = t.ESC = 27,
        O = (t.UNPRINTABLE_KEYS = [E, k, S, T, P, L, I, M], t.UP_DOWN_CONTROLS = [S, T, k, E, M, I], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
        A = t.FOLDER_ALL = "all",
        x = t.FOLDER_UNRESPOND = "unrespond",
        N = t.FOLDER_IMPORTANT = "important",
        D = (t.FOLDERS = [A, O, x, N], t.FOLDER_MASKS = (a = {}, r(a, x, 2), r(a, N, 1), a), t.TOP_DOMAINS = [].concat(y.split(","), w.split(","), C.split(",").map(function(e) {
            return "xn--" + e
        }))),
        R = (t.MAX_DOMAIN_LENGTH = D.reduce(function(e, t) {
            return Math.max(e, t.length)
        }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + s + l + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(b, "ig"), "#"),
        j = "a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’",
        B = "(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)",
        F = "(?:[" + j + "]|" + B + ")",
        H = "(?:[" + j + "_\\d]|" + B + ")",
        U = "(" + R + H + "{0,100}" + F + H + "{0,100})",
        z = "((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?)";
    t.RE_HASHTAG_EXTRACTION_PATTERN = "(^|[s.,:'\";>)(]?)(" + U + ")(@" + z + ")?(?=$|[s.,:'\"&;?<)(]?)"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r, a, i) {
        (0, T.toggleConversation)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(o.bind(null, t, !1), 100);
        var s = f(i);
        s.map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            removeClass(e, K)
        }), n().createCanceled(e, r), a.resetSelection(), "add_member" === e.get().creationType && e.set(T.setCreationType.bind(null, "chat", [])), e.set(T.presetAvatar.bind(null, !1));
        var u = geByClass1(q, t);
        l(e, i, t), uiSearch.reset(geByClass1(F, t)), uiSearch.reset(geByClass1(H, t)), u && u.parentNode.removeChild(u), l(e, i, t), cancelStackFilter("im_search");
        var c = 0 === e.get().peer ? "search" : "default";
        e.get().longpoll.push([(0, N.transitionEvent)(c)]), attr(t, "aria-hidden", "true")
    }

    function i(e, t, n) {
        return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(function(e) {
            e.then(function(e) {
                e = e.filter(function(e) {
                    return !n.current_create_peer_ids[e.peerId]
                }), n.current_create_peer_ids = e.reduce(function(e, t) {
                    return e[t.peerId] = !0, e
                }, n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
            })
        }), Promise.resolve(n)
    }

    function o(e, t) {
        toggleClass(e, "im-create_material", t)
    }

    function s(e, t, n, r, i, o) {
        a(e, t, n, !1, i, o), e.get().longpoll.push([(0, N.changePeer)(r, !1, !1, !1, "create_conversation")])
    }

    function l(e, t, n) {
        var r = geByClass1(G, n),
            a = t.get().selection.length,
            i = "add_member" === e.get().creationType,
            o = a > 0,
            s = a > 1;
        i ? val(r, 1 === a ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with")) : (val(r, s ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog")), toggleClass(n, "im-create_chat-details", s)), toggleClass(n, "im-create_tools", o), toggleClass(r, "button_disabled", !o)
    }

    function u(e, t, n, r, a, i, o) {
        if (o) {
            var s = intval(domData(o, "list-id")),
                u = f(i),
                c = trim(o.textContent),
                d = geByClass1(H, t),
                p = getSize(d)[1],
                m = void 0;
            inArray(s, u) ? (m = r.removeSelection(s, c), removeClass(o, K)) : (m = r.addSelection(s, c), addClass(o, K)), m.then(function() {
                var e = p - getSize(d)[1],
                    t = a.scrollTop();
                a.scrollTop(t - e)
            }), l(e, i, t);
            var g = geByClass1(H, t);
            uiSearch.reset(g)
        }
    }

    function c(e, t) {
        var n = f(e),
            r = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
            a = [];
        return t.online && a.push("online"), mobPlatforms[t.online] && a.push("mobile"), inArray(t.peerId, n) && r.push(K), getTemplate("im_owner_item", {
            owner_id: t.peerId,
            cls: " " + r.join(" "),
            photo: t.photo,
            name: t.name,
            link: t.href,
            img_cls: a.join(" ")
        })
    }

    function d(e) {
        return (0, I.getSearchText)(e) || !1
    }

    function f(e) {
        return e.get().selection.map(function(e) {
            return e.id
        })
    }

    function p(e, t, n, r) {
        toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
        var a = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
            i = geByClass1("_im_create_title", e);
        val(i, a), val(geByClass1(G, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat"));
        var o = n.get().selection.map(function(e) {
            return e.id
        });
        g(e, r, t, !1, o), (0, P.fixTableCellChildHeight)("_im_create_wrap_safe", e)
    }

    function m(e, t, n) {
        return e.then(function(e) {
            return e.filter(function(e) {
                return e.is_friend && !inArray(e.peerId, n.get().creationFilter)
            })
        })
    }

    function g(e, t, n, r, a) {
        var o = geByClass1(H, e),
            s = void 0,
            l = void 0,
            u = (0, T.searchLocalHints)(r, t.get()),
            c = n.hoverFirstElement.bind(n, W, E(t));
        t.get().creation_shown_all = !1, n.reset(), n.pipe(m(u, r, t), r), n.toTop(), r ? (l = (0, T.searchTopConv)(r, t.get()), s = (0, T.searchHintsIndex)(r, [], "friends", t.get()), n.pipe(m(s, r, t), r).then(c), n.pipe(m(l, r, t), r).then(c)) : (s = Promise.resolve([]), l = Promise.resolve([])), t.set(i.bind(null, [u, l, s], !0)), uiSearch.showProgress(o), Promise.all([u, s, l]).then(function() {
            return uiSearch.hideProgress(o)
        })
    }

    function h(e, t, n, r, a, i, o, s) {
        uiTabs.switchTab(s.firstElementChild);
        var l = domData(s, "type");
        switch (l) {
            case "chat":
                i.restore()
        }
        e.set(T.setCreationType.bind(null, l, [])).then(p.bind(null, t, r, a))
    }

    function _(e, t, n, r) {
        var a = r.get(),
            i = d(a),
            o = a.selection.map(function(e) {
                return e.id
            });
        n.unhoverElements(W), e.get().creationQuery = i, g(t, e, n, i, o)
    }

    function v(e, t, n, r) {
        var a = 2e9 + Math.round(rand(1e6, 2e6));
        cur.recieveCropResult = function(n) {
            cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(T.presetAvatar.bind(null, n)), (0, T.getOwnerPhoto)(n, a).then(function(e) {
                geByClass1(U, t).appendChild(ce("img", {
                    className: "im-chat-placeholder--img " + q,
                    src: e
                }))
            }), addClass(t, "im-create_photo-attached")
        }, Page.ownerPhoto(a)
    }

    function b(e, t) {
        geByClass1(U, t).innerHTML = "", e.set(T.presetAvatar.bind(null, !1)), removeClass(t, "im-create_photo-attached")
    }

    function y(e, t, n, r, i, o) {
        f(t).map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            return removeClass(e, K)
        }), t.reset(), g(n, e, r, !1, f(t)), i.resetSelection(), a(e, n, o, !1, i, t)
    }

    function w(e, t, n, r, i, o, l) {
        function u(a) {
            y(e, t, n, r, i, o), s(e, n, o, a, i, t), unlockButton(p), (0, I.isSearching)(e) ? o().cancelSearch(e) : o().restoreDialogs(e)
        }
        var c = f(t),
            d = e.get(),
            p = geByClass1(G, n),
            m = uiSearch.getFieldEl(geByClass1(F, n)).value;
        return 0 !== c.length ? "add_member" === e.get().creationType ? (e.set(T.addNewMember.bind(null, d.peer, c))["catch"](function(e) {
            return showFastBox(getLang("global_error"), e)
        }), a(e, n, o, "", i, t)) : (lockButton(p), 1 === c.length ? u(c[0]) : void e.set(T.createChat.bind(null, d.next_chat_avatar, c, m)).then(function() {
            return u(d.next_peer)
        })["catch"](function(e) {
            unlockButton(p), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
        })) : void 0
    }

    function C(e, t) {
        return showTooltip(e, {
            text: getLang("mail_cancel"),
            black: 1,
            zIndex: 1e3,
            shift: [3, -2],
            appendCls: "js-im-page"
        })
    }

    function E(e, t) {
        var n = 70,
            r = t && t.get().selection.length;
        return {
            top: -1,
            bottom: (0, P.isClassicInterface)(e) ? r > 0 ? n - 1 : 0 : -1
        }
    }

    function k(e, t, n, r, i, s, l, c) {
        return {
            show: function(t) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                t.setState({
                    shown: !0
                }), o(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown");
                var s = r.get().selection.reduce(function(e, t) {
                    return e[t.id] = !0, e
                }, {});
                a && a.forEach(function(t) {
                    if (!s[t[0]]) {
                        var n = e.querySelector("._im_dialog" + t[0]);
                        i.addSelection(t[0], t[1]), n && !n.classList.contains(K) && n.classList.add(K)
                    }
                }), p(e, n, r, t), setTimeout(function() {
                    t.get().longpoll.push([(0, N.transitionEvent)("create")]), attr(e, "aria-hidden", "false"), i.focus()
                }, 1)
            },
            focusSearch: function(e) {
                i.focus()
            },
            confirmCreate: function(e) {
                c()
            },
            hide: function(n) {
                n.get().shown = !1, a(n, e, t, !1, i, r)
            },
            scroll: function(e) {
                n.scrollPage(e, !0)
            },
            updateScroll: function() {
                (0, P.fixTableCellChildHeight)("_im_create_wrap_safe", e), n.updateScroll()
            },
            selectElement: function(a) {
                u(a, e, t, i, n, r, n.getHoveredElement())
            },
            hoverPrevElement: function(e) {
                n.hoverPrevElement(W, null, E(e, r))
            },
            hoverNextElement: function(e) {
                n.hoverNextElement(W, null, E(e, r))
            },
            unmount: function() {
                (0, O.destroyModule)(s), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
            }
        }
    }

    function S(e, t, n) {
        var r = (0, x["default"])({
                selection: []
            }),
            o = geByClass1(R, e),
            s = (0, M.mount)(o, (0, x["default"])({
                offset: 0,
                limit: Y,
                elements: [],
                elCls: j
            }), function() {
                return {
                    idFn: function(e) {
                        return intval(e.peerId)
                    },
                    hoverableFn: function(e) {
                        return hasClass(e, "_im_dialog")
                    },
                    renderFn: c.bind(null, r),
                    more: function(e, n) {
                        var a = void 0;
                        return t.get().shown ? (t.get().creation_shown_all || d(r) !== !1 ? a = Promise.resolve([]) : (t.get().creation_shown_all = !0, a = (0, T.searchTopConv)(d(r), t.get())), t.set(i.bind(null, [a], !1)), m(a, d(r), t)) : Promise.resolve(!1)
                    },
                    onClick: function(a, i) {
                        checkEvent(a) || (u(t, e, n, p, s, r, i), cancelEvent(a))
                    }
                }
            });
        t.get().creationQuery = !1, t.get().creationType = "chat";
        var f = geByClass1(H, e),
            p = (0, L.mount)(f, r, function() {
                return {
                    selectionDeleted: function(n, r) {
                        l(t, n, e), removeClass(geByClass1("_im_dialog" + r), K)
                    },
                    onChange: _.bind(null, t, e, s)
                }
            }),
            g = a.bind(null, t, e, n, "cross", p, r),
            E = h.bind(null, t, e, n, s, r, p),
            S = v.bind(null, t, e),
            I = b.bind(null, t, e),
            P = y.bind(null, t, r, e, s, p, n),
            A = w.bind(null, t, r, e, s, p, n),
            N = geByClass1(D, e),
            F = (0, O.createModule)({
                handlers: function(t, n) {
                    t(N, "click", g), t(N, "mouseover", C.bind(null, N)), t(geByClass1(U, e), "click", S), t(geByClass1(z, e), "click", I), t(geByClass1(V, e), "click", P), t(geByClass1(G, e), "click", A), t(e, "mouseover", throttle(s.unhoverElements.bind(s, W), 100)),
                        n(e, "click", B, E)
                }
            });
        return k(e, n, s, r, p, F, g, A)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = S;
    var T = n(28),
        I = n(190),
        M = n(178),
        P = n(88),
        L = n(147),
        O = n(198),
        A = n(112),
        x = r(A),
        N = n(199),
        D = "_im_create_cancel",
        R = "_im_create_list",
        j = "_im_dialog",
        B = "_im_create_tab",
        F = "_im_dialogs_creation_name",
        H = "_im_create_select",
        U = "_im_create_avatar",
        z = "_im_create_remove_avatar",
        G = "_im_confirm_creation",
        V = "_im_cancel_creation",
        q = "_im_avatar_img",
        W = ["im-creation--item_hovered"],
        K = "olist_item_wrap_on",
        Y = 100
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        return window.statlogsValueEvent(e, t, n, r, a)
    }

    function a(e) {
        return Math.random() < e
    }

    function i(e, t, n, i, o, s) {
        a(e) && r(n, i, o, s)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.statlogsValueEvent = r, t.randEnabled = a, t.statlogsProbValueEvent = i
}, function(e, t, n) {
    "use strict";
    var r = n(176),
        a = n(44),
        i = n(136),
        o = {};
    n(186)(o, n(61)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(o, {
            next: a(1, n)
        }), i(e, t + " Iterator")
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = (0, b.getTab)(e, e.get().peer);
        t && t.data && !t.data.closed && !t.data.kicked ? i(e) : o()
    }

    function i(e) {
        var t = l();
        t && g["default"].render(p["default"].createElement(_["default"], {
            store: e,
            getLang: S,
            closePopup: o,
            updatePopup: s
        }), t)
    }

    function o() {
        I && I.hide()
    }

    function s() {
        I && I.updateBoxCoords()
    }

    function l() {
        return document.querySelector("#ChatSettings")
    }

    function u(e) {
        var t = document.querySelector("#box_layer_wrap"),
            n = document.querySelector("#box_loader"),
            r = k(t);
        return {
            unmount: function() {
                var t = l();
                t && g["default"].unmountComponentAtNode(t), (0, d.destroyModule)(e)
            },
            showLoader: function() {
                T(n), C(n), r || C(t)
            },
            hideLoader: function() {
                E(n), r || E(t)
            }
        }
    }

    function c(e, t, n) {
        var r = (0, d.createMutations)(u),
            o = r.bindMutations,
            s = t.get(),
            l = (0, d.createModule)({
                handlers: function(e, t) {}
            }),
            c = o(l),
            f = {
                hideButtons: !0,
                bodyStyle: "padding: 0; background: none;",
                width: 560,
                onShow: function() {
                    i(t), t.subscribe(a), requestAnimationFrame(function() {
                        return I.updateBoxCoords()
                    })
                },
                onHideAttempt: function() {
                    return t.unsubscribe(i), c.unmount(), !0
                }
            };
        return c.showLoader(), t.set(v.getChatDetails.bind(null, s.peer)).then(function(e) {
            c.hideLoader(), I = new w(f).content('<div id="ChatSettings"></div>').show()
        }), c
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = c;
    var d = n(198),
        f = n(180),
        p = r(f),
        m = n(144),
        g = r(m),
        h = n(191),
        _ = r(h),
        v = n(28),
        b = n(190),
        y = window,
        w = y.MessageBox,
        C = y.show,
        E = y.hide,
        k = y.isVisible,
        S = y.getLang,
        T = y.boxRefreshCoords,
        I = void 0
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t) {
        var n = e ? e.indexOf(t) : 0;
        return -1 === n ? (e.push(t), !0) : !1
    }

    function i(e, t) {
        var n = e ? e.indexOf(t) : -1;
        return -1 !== n ? (e.splice(n, 1), !0) : !1
    }

    function o(e, t, n) {
        if ((0, d.isTabLoaded)(n.get(), e)) {
            var i = (0, f.getTab)(n, e);
            a(i.memberIds, t) && i.membersCount++, t === vk.id && (i.data.kicked = 0, i.data.closed = 0)
        }
        return n.set(p.loadChatMember.bind(null, r({}, e, [t]))).then(function(r) {
            return t === vk.id && n.get().peer === e ? n.set(p.getPinnedMessage.bind(null, e)) : void 0
        })
    }

    function s(e, t, n, r, a) {
        if ((0, d.isTabLoaded)(r.get(), e)) {
            var o = (0, f.getTab)(r, e);
            i(o.memberIds, t) && o.membersCount--, t === vk.id && (n ? o.data.kicked = 1 : o.data.closed = 1)
        }
        return t === vk.id && r.get().peer === e ? (a.cancelEditing(), r.set(p.unpinMessageOptimistic.bind(null, e))) : Promise.resolve()
    }

    function l(e, t, n, r, l, d) {
        var E = (0, f.getTab)(e, t);
        switch (n) {
            case g:
            case w:
                return n === g ? a(E.adminIds, r) : i(E.adminIds, r), u(e, t, l), !0;
            case h:
                return E.data.flags = r, u(e, t, l), !0;
            case _:
                return delete E.pinHideId, cur.imDb.update(m.PIN_HIDDEN_ID_OP, [E.peerId, void 0]), !1;
            case v:
                return o(t, r, e).then(function() {
                    return c(e, t, l, d)
                }), !0;
            case b:
            case y:
                return s(t, r, n === y, e, l).then(function() {
                    return c(e, t, l, d)
                }), !0;
            case C:
                return e.set(p.loadBanner.bind(null, t)).then(function() {
                    return l.updateBanner(e)
                }), !0;
            default:
                return !1
        }
    }

    function u(e, t, n) {
        e.get().peer === t && ((0, p.setActions)(e.get()), n.updateActions(e))
    }

    function c(e, t, n, r) {
        e.get().peer === t && ((0, p.setActions)(e.get()), n.updateChat(e, t), r.updateDialog(t, e))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.chatUserHasJoined = o, t.chatUserHasLeft = s, t.handleEventChatUpdated = l;
    var d = n(88),
        f = n(190),
        p = n(28),
        m = n(150),
        g = 3,
        h = 4,
        _ = 5,
        v = 6,
        b = 7,
        y = 8,
        w = 9,
        C = 10
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (1, eval)("this")
    } catch (r) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function s(e, t) {
        if (!e || !t) return "";
        var n = Object.keys(t).map(function(e) {
            return e + " {" + Object.keys(t[e]).map(function(n) {
                return n + ":" + t[e][n]
            }).join(";") + "}"
        }).join("");
        return "@-webkit-keyframes " + e + " {" + n + "} @keyframes " + e + " {" + n + "}"
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.id = Math.round(1e6 * Math.random()).toString(16), r.setSpinnerParams(n), r
            }
            return o(t, e), t.prototype.componentWillReceiveProps = function(e) {
                this.setSpinnerParams(e)
            }, t.prototype.setSpinnerParams = function(e) {
                this.offset = Math.round(Math.PI * e.size), this.c = .5 * e.size, this.animation = s("dash" + this.id, {
                    "0%": {
                        "stroke-dashoffset": this.offset
                    },
                    "50%": {
                        "stroke-dashoffset": Math.round(.25 * this.offset),
                        transform: "rotate(135deg)"
                    },
                    "100%": {
                        "stroke-dashoffset": this.offset,
                        transform: "rotate(360deg)"
                    }
                })
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.style,
                    n = e.color,
                    r = e.size,
                    a = e.duration,
                    i = e.strokeWidth,
                    o = this.id,
                    s = this.offset,
                    l = this.animation;
                return u["default"].createElement("div", {
                    className: "Spinner",
                    style: t
                }, u["default"].createElement("svg", {
                    className: "Spinner__svg",
                    width: r,
                    height: r,
                    viewBox: "0 0 " + r + " " + r,
                    xmlns: "http://www.w3.org/2000/svg"
                }, u["default"].createElement("g", {
                    style: {
                        width: r,
                        height: r,
                        transformOrigin: .5 * r + "px " + .5 * r + "px"
                    }
                }, u["default"].createElement("style", {
                    dangerouslySetInnerHTML: {
                        __html: l
                    }
                }), u["default"].createElement("circle", {
                    className: "Spinner__path",
                    fill: "none",
                    stroke: n,
                    strokeDasharray: s,
                    strokeDashoffset: s,
                    strokeWidth: i,
                    style: {
                        animationName: "dash" + o,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: a + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * r,
                    cy: .5 * r,
                    r: .5 * r - .5 * i
                }))))
            }, t
        }(l.Component));
    t["default"] = d, d.defaultProps = {
        color: "#5181b8",
        size: 19,
        strokeWidth: 2,
        duration: 1.4
    }
}, function(e, t, n) {
    "use strict";
    var r = n(66),
        a = n(177),
        i = n(33),
        o = n(186),
        s = n(18),
        l = n(212),
        u = n(97),
        c = n(136),
        d = n(162),
        f = n(61)("iterator"),
        p = !([].keys && "next" in [].keys()),
        m = "@@iterator",
        g = "keys",
        h = "values",
        _ = function() {
            return this
        };
    e.exports = function(e, t, n, v, b, y, w) {
        u(n, t, v);
        var C, E, k, S = function(e) {
                if (!p && e in P) return P[e];
                switch (e) {
                    case g:
                        return function() {
                            return new n(this, e)
                        };
                    case h:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            T = t + " Iterator",
            I = b == h,
            M = !1,
            P = e.prototype,
            L = P[f] || P[m] || b && P[b],
            O = L || S(b),
            A = b ? I ? S("entries") : O : void 0,
            x = "Array" == t ? P.entries || L : L;
        if (x && (k = d(x.call(new e)), k !== Object.prototype && (c(k, T, !0), r || s(k, f) || o(k, f, _))), I && L && L.name !== h && (M = !0, O = function() {
                return L.call(this)
            }), r && !w || !p && !M && P[f] || o(P, f, O), l[t] = O, l[T] = _, b)
            if (C = {
                    values: I ? O : S(h),
                    keys: y ? O : S(g),
                    entries: A
                }, w)
                for (E in C) E in P || i(P, E, C[E]);
            else a(a.P + a.F * (p || M), t, C);
        return C
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(92)),
        f = n(109),
        p = r(f),
        m = "/images/camera_c.gif",
        g = function(e) {
            function t(n) {
                i(this, t);
                var r = o(this, e.call(this, n));
                return r.onError = function() {
                    r.setState({
                        errored: !0
                    })
                }, r.state = {}, r
            }
            return s(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.style,
                    r = e.size,
                    i = e.photo,
                    o = e.href,
                    s = e.title,
                    l = e.description,
                    c = a({}, "Entity--size" + r, !!r);
                return u["default"].createElement("div", {
                    className: (0, d.classNames)("Entity", t, c),
                    style: n
                }, u["default"].createElement("div", {
                    className: "Entity__aside"
                }, i && (o ? u["default"].createElement("a", {
                    href: o
                }, u["default"].createElement("img", {
                    width: r,
                    height: r,
                    src: this.state.errored ? m : i,
                    alt: s,
                    onError: this.onError,
                    className: "Entity__photo"
                })) : u["default"].createElement("img", {
                    width: r,
                    height: r,
                    src: i,
                    alt: s,
                    className: "Entity__photo"
                }))), u["default"].createElement("div", {
                    className: "Entity__main"
                }, s && o ? u["default"].createElement(p["default"], {
                    href: o
                }, u["default"].createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: s
                    }
                })) : u["default"].createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: s
                    }
                }), l && u["default"].createElement("div", {
                    className: "Entity__description",
                    dangerouslySetInnerHTML: {
                        __html: l
                    }
                })))
            }, t
        }(l.PureComponent);
    t["default"] = g, g.defaultProps = {
        size: null,
        photo: "",
        title: "",
        description: "",
        href: ""
    }
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(47),
        a = {
            listen: function(e, t, n) {
                return e.addEventListener ? (e.addEventListener(t, n, !1), {
                    remove: function() {
                        e.removeEventListener(t, n, !1)
                    }
                }) : e.attachEvent ? (e.attachEvent("on" + t, n), {
                    remove: function() {
                        e.detachEvent("on" + t, n)
                    }
                }) : void 0
            },
            capture: function(e, t, n) {
                return e.addEventListener ? (e.addEventListener(t, n, !0), {
                    remove: function() {
                        e.removeEventListener(t, n, !0)
                    }
                }) : {
                    remove: r
                }
            },
            registerDefault: function() {}
        };
    e.exports = a
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = void 0,
            r = void 0,
            a = function(a) {
                n = "undefined" != typeof a.clientX ? a.clientX : a.touches[0].clientX, r = "undefined" != typeof a.clientY ? a.clientY : a.touches[0].clientY, t.onDrag && t.onDrag.call(e, n, r)
            },
            i = function s(i) {
                t.onDrop && t.onDrop.call(e, n, r), removeEvent(document, "mouseup touchend mouseleave", s), removeEvent(document, "mousemove touchmove", a)
            },
            o = function(o) {
                (1 === o.which || o.touches && o.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", i), addEvent(document, "mousemove touchmove", a), n = "undefined" != typeof o.clientX ? o.clientX : o.touches[0].clientX, r = "undefined" != typeof o.clientY ? o.clientY : o.touches[0].clientY, t.onStartDrag && t.onStartDrag.call(e, n, r), t.onDrag && t.onDrag.call(e, n, r), cancelEvent(o))
            };
        e.beginDragHandler = o, addEvent(e, "mousedown touchstart", o)
    }

    function a(e) {
        removeEvent(e, "mousedown touchstart", e.beginDragHandler)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initDraggable = r, t.removeDraggable = a
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t, n) {
        return !e.map(function(e) {
            var r = (0, A.getMessage)(t, n, e);
            return (0, x.isImportant)(r)
        }).reduce(function(e, t) {
            return e && t
        }, !1)
    }

    function i(e, t) {
        var n = t.get(),
            r = n.peer,
            a = n.tabs[r].pinned;
        return 1 === e.length && a && e[0] === (0, A.parserMessage)(a).messageId
    }

    function o(e, t) {
        var n = e.get().peer,
            r = geByClass1("_im_page_peer_online", t);
        r && (0, L.isUserPeer)(n) && (0, A.getTab)(e, n) && (0, L.applyInnerHtml)(r, (0, L.getLastSeenTextInHeader)(e, n))
    }

    function s(e, t, n) {
        geByClass("_im_header_icon", e).forEach(function(e) {
            if (n.length > 0) hide(e);
            else if ("star" === domData(e, "type") && (0, L.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_star-active", (0, L.isImportant)(t)), setStyle(e, {
                    display: "inline-block"
                })), "answer" === domData(e, "type") && (0, L.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", (0, L.isUnrespond)(t)), (0, L.isUnrespond)(t) ? setStyle(e, {
                    display: "inline-block"
                }) : hide(e)), "search" === domData(e, "type") && !(0, L.isCommunityInterface)(t)) {
                var r = (0, L.isFullyLoadedTab)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                setStyle(e, {
                    display: "inline-block"
                }), toggleClass(e, "im-page-header-icon_search-shown", r)
            }
        })
    }

    function l(e, t, n) {
        var r = getLang("mail_selected_shorted", t.length);
        f({
            actions: !0
        }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
            label: r.replace("{count}", t.length),
            tip: getLang("mail_deselect_all")
        }));
        var o = (0, A.getTab)(n, n.get().peer),
            s = geByClass1(z, e),
            l = a(t, n, n.get().peer),
            u = i(t, n),
            c = (0, L.isChatPeer)(o.peerId) && (0, j.canPinOrUnpin)(n, o.peerId);
        toggleClass(s, "im-page--mess-actions_important", !l), toggleClass(s, "im-page--mess-actions_pinned", u), toggleClass(s, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(s, "im-page--mess-actions_no-pin-btn", !c);
        var d = l ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
            p = u ? getLang("mail_unpin") : getLang("mail_pin");
        attr(geByClass1("im-page-action_star", e), "aria-label", d), attr(geByClass1("im-page-action_pin", e), "aria-label", p)
    }

    function u(e, t, n) {
        var a = t.get(),
            i = a.peer,
            o = a.tabs[i],
            l = clean(stripHTML(unclean(o.tab))),
            p = geByClass1(q, e),
            m = geByClass1(L.PINNED_CONTAINER_CLASS);
        p.tt = !1;
        var g = (0, L.renderPhotosFromTab)(t, o, !0),
            h = getTemplate("im_simple_link", {
                href: o.href,
                content: getTemplate("im_peer_photo", {
                    online_class: "",
                    owner_photo: g,
                    modifier_class: "nim-peer_smaller"
                })
            });
        val(geByClass1("im-page--aside-photo", e), h);
        var _ = (0, L.isChatPeer)(i),
            v = _ ? !o.data.closed && !o.data.kicked : 0,
            b = {
                muted: inArray(i, a.mutedPeers),
                verified: !!o.verified,
                chat: _,
                actions: !1,
                derelict: _ && !v,
                pinned: !1
            };
        if (_) {
            var y = (0, A.getPinnedMessage)(t),
                w = d(t);
            y && (0, D.isPinnedMessageVisibleInTab)(t, i) && (w ? t.set(P.loadChatMember.bind(null, r({}, i, [w]))).then(u.bind(null, e, t, n)) : b.pinned = !0)
        }
        var C = "";
        _ ? C = v ? getTemplate("im_chat_members", {
            name: getLang("mail_im_n_chat_members", (0, L.getAliveMembersCount)(o))
        }) : "" : (0, L.isUserPeer)(i) && (C = (0, L.getLastSeenTextInHeader)(t, i));
        var E = getTemplate("im_simple_name", {
            name: o.tab,
            href: o.href,
            name_attr: l,
            ads_union: o.ad_union_ids_attr,
            online: C,
            more_cls: "" === C ? "im-page--title--1line" : ""
        });
        val(geByClass1("im-page--title-wrapper", e), E);
        var k = val(m) && !o.top_banner,
            S = c(t) && !o.top_banner,
            T = geByClass1(F, e);
        if (removeClass(T, L.DESELECT_ALL_CLASS), show(geByClass1(U, e)), removeClass(geByClass1(z, e), "im-page--mess-actions_visible"), removeClass(geByClass1(z, e), "im-page--mess-actions_all-sel"), s(e, t, []), (0, L.isClassicInterface)(t)) {
            var I = geByClass1("_im_page_back", e);
            attr(I, "href", (0, L.getBaseLink)(t) + "?tab=" + a.active_tab)
        }
        f(b, "im-page--chat-header"), (0, L.compensateHistoryHeightChange)(t, S, k, n)
    }

    function c(e) {
        var t = (0, A.getPinnedMessage)(e),
            n = geByClass1(L.PINNED_CONTAINER_CLASS);
        if (removeClass(n, "im-page--pinned_with-bar"), t && (0, x.isMoneyRequest)(t)) {
            if (void 0 === t.kludges.attach1_tr_amount) return;
            t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
        }
        var r = (0, L.renderPinnedMessage)(e);
        return val(n, r), !!r
    }

    function d(e) {
        var t = (0, A.getPinnedMessage)(e);
        return !t || (0, N.oCacheGet)(e, t.userId) ? !1 : t.userId
    }

    function f(e, t) {
        var n = geByClass1(t);
        Object.keys(e).forEach(function(r) {
            toggleClass(n, t + "_" + r, !!e[r])
        })
    }

    function p(e, t, n, r, a) {
        e.set(P.removeMessagesWithRestore.bind(null, n, a, r)).then(t().removeMessagesRestore.bind(null, n, a, r)), (0, P.removeMessageSend)(n, a, (0, A.getTab)(e, a).hash, r, e.get().gid)
    }

    function m(e, t, n, r, o) {
        var s = e.get().selectedMessages,
            l = domData(o, "action"),
            u = e.get().peer,
            c = !0;
        switch (l) {
            case "delete":
                var d = vk.id == u && !e.get().gid,
                    f = !d && s.every(function(t) {
                        return (0, L.canMessageBeDeletedForAll)(e, (0, A.getMessage)(e, u, t))
                    });
                if (f || s.length > 1) {
                    c = !1;
                    var m = (0, L.showMsgDeleteDialog)(u, s.length, f, function(r) {
                        b(e, t, n), m.hide(), cur.imDb.updateByKey("del_forall_checked", r), r ? (0, P.removeMessageSend)(s, u, (0, A.getTab)(e, u).hash, "deleteforall", e.get().gid) : p(e, t, s, l, u)
                    })
                } else p(e, t, s, l, u);
                break;
            case "spam":
                p(e, t, s, l, u);
                break;
            case "forward":
                (0, P.processFwd)(s, e.get().peer, e).then(function(t) {
                    return e.set(P.prepareForward.bind(null, t))
                }).then(function() {
                    (0, L.isClassicInterface)(e) ? (cancelStackPush("forward", function(t) {
                        e.set(P.prepareForward.bind(null, null)).then(function() {
                            e.get().longpoll.push([(0, O.changePeer)(t)])
                        })
                    }.bind(null, e.get().peer)), e.get().longpoll.push([(0, O.resetPeer)(!0)])) : t().startForward(e)
                });
                break;
            case "star":
                var g = a(s, e, u);
                e.set(P.favMessage.bind(null, s, g, u)), e.get().longpoll.push(s.map(function(e) {
                    return {
                        type: g ? O.SET_FLAGS : O.RESET_FLAGS,
                        messageId: e,
                        peerId: u,
                        flags: O.FLAG_IMPORTANT
                    }
                }));
                break;
            case "respond":
                (0, P.processFwd)(s, e.get().peer, e).then(function(t) {
                    return e.set(P.forwardMessages.bind(null, t, e.get().tfdraft))
                }).then(function() {
                    t().respond(e, u)
                });
                break;
            case "pin":
                var h = (0, A.getLocalId)(e, s[0]),
                    _ = i(s, e),
                    v = _ ? P.unpinMessageOptimistic.bind(null, u) : P.pinMessageOptimistic.bind(null, h, u),
                    y = _ ? P.unpinMessage.bind(null, u) : P.pinMessage.bind(null, h, u),
                    w = k.bind(null, t, u);
                e.set(P.checkChatMember.bind(null, e, h, u)).then(function(e) {
                    return e.set(v)
                }).then(w).then(function(e) {
                    return e.set(y)
                }).then(w)
        }
        c && b(e, t, n)
    }

    function g(e, t, n, r, a, i) {
        if ("keydown" !== i.type || 13 === i.which) {
            var o = trim(val(a));
            return o ? (o !== n && e.set(P.updateChatTopic.bind(null, t, o)), !0) : (notaBene(a), !1)
        }
    }

    function h(e, t, n) {
        var r = showFastBox({
            title: getLang("mail_chat_invite_link"),
            dark: 1
        }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(a) {
            var i = gpeByClass("_im_invite_box", n.target),
                o = geByClass1(Q, i),
                s = geByClass1("_im_invite_new", i);
            lockButton(r.btns.ok[0]), (0, P.resetInviteLink)(t, e.get()).then(function(e) {
                var t = I(e, 1),
                    n = t[0];
                unlockButton(r.btns.ok[0]), o.value = n, unlockButton(s), addClass(i, "im-invite-box_reseted"), elfocus(o, 0, n.length), r.hide()
            })
        }, getLang("global_cancel"), function() {
            r.hide()
        })
    }

    function _(e, t, n) {
        if ((0, L.isChatPeer)(t)) {
            var r = e.get().tabs[t].name,
                a = g.bind(null, e, t, r, n),
                i = showFastBox({
                    title: getLang("mail_chat_topic_change_title"),
                    dark: 1
                }, getTemplate("im_chat_change_topic", {
                    value: r
                }), getLang("global_save"), function(e, t) {
                    var n = a(o, t);
                    n && i.hide()
                }, getLang("global_cancel"), function() {
                    i.hide()
                }),
                o = geByClass1(V, i.bodyNode);
            elfocus(o), addEvent(o, "keydown", function(e) {
                var t = a(o, e);
                t && i.hide()
            })
        }
    }

    function v(e, t, n, r, a, i) {
        var o = domData(i, "action"),
            s = geByClass1(H, r).parentNode,
            l = e.get().peer;
        switch (o) {
            case "clear":
                var u = (0, L.showFlushDialog)(l, function() {
                    (0, L.cleanHistory)(e, u, t, P.flushHistory, e.get().peer)
                });
                break;
            case "photos":
            case "media":
                showWiki({
                    w: "history" + (0, L.convertPeerToUrl)(l) + "_photo"
                }, null, {});
                break;
            case "topic":
                _(e, l, t);
                break;
            case "avatar":
                cur.recieveCropResult = void 0, Page.ownerPhoto(l);
                break;
            case "search":
                t().showSearch(e);
                break;
            case "block_community":
                e.set(P.toggleCommunityMessages.bind(null, !1, l)).then(function() {
                    e.get().longpoll.push([(0, O.resetPeer)()]), showDoneBox(getLang("mail_community_was_blocked"))
                });
                break;
            case "allow_community":
                e.set(P.toggleCommunityMessages.bind(null, !0, l)).then(function() {
                    n().changeActions(e)
                });
                break;
            case "block":
                var c = (0, L.showBlacklistBox)(l, e);
                c.once("success", function(t) {
                    t.delta && (showDoneBox(t.msg), e.get().longpoll.push([(0, O.resetPeer)()]))
                });
                break;
            case "leave":
                var d = showFastBox({
                    title: getLang("mail_chat_leave_title"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, getLang("mail_chat_leave_confirm"), getLang("mail_leave_chat"), function() {
                    e.set(P.leaveChat.bind(null, l)), e.set(P.unpinMessageOptimistic.bind(null, l)), d.hide(), e.get().longpoll.push([(0, O.resetPeer)()])
                }, getLang("global_cancel"), function() {
                    d.hide()
                });
                break;
            case "invite_link":
                var f = h.bind(null, e, l),
                    p = !1,
                    m = !1,
                    g = !1,
                    v = function() {
                        elfocus(p, 0, p.value.length), document.execCommand("copy"), setStyle(m, {
                            opacity: 1
                        }), g && (g = clearTimeout(g)), g = setTimeout(function() {
                            return setStyle(m, {
                                opacity: 0
                            })
                        }, 2e3)
                    },
                    b = !1,
                    y = !1;
                showBox("al_im.php", {
                    act: "a_get_link",
                    chat_id: l - 2e9,
                    markup: 1
                }, {
                    onDone: function(e) {
                        p = geByClass1(Q, e.bodyNode), b = geByClass1("_im_reset_link", e.bodyNode), y = geByClass1("_im_invite_copy", e.bodyNode), m = geByClass1("_im_invite_copied", e.bodyNode), elfocus(p, 0, p.value.length), addEvent(b, "click", f), addEvent(y, "click", v)
                    },
                    params: {
                        hideButtons: !0,
                        onHide: function() {
                            removeEvent(b, "click", f), removeEvent(y, "click", v)
                        },
                        onShow: function() {
                            addEvent(b, "click", f), addEvent(y, "click", v)
                        }
                    }
                }, {});
                break;
            case "return":
                e.set(P.returnToChat.bind(null, l)).then(function(e) {
                    return e.set(P.getPinnedMessage.bind(null, l))
                }).then(t().updateChatTopic.bind(null, l))["catch"](function(e) {
                    showFastBox(getLang("global_error"), e)
                });
                break;
            case "unmute":
            case "mute":
                var w = "mute" === o ? 1 : 0;
                e.set(P.toggleMutePeer.bind(null, l, w)).then(t().updateState.bind(null, l));
                break;
            case "chat":
            case "invite":
                if ((0, L.isChatPeer)(l))(0, L.inviteUser)(e, l, t, P.setCreationType);
                else if ((0, L.isUserPeer)(l)) {
                    var C = e.get().tabs[l],
                        E = [
                            [l, C.tab]
                        ];
                    e.set(P.setCreationType.bind(null, "chat", [])).then(function() {
                        return t().showCreation(e, E)
                    })
                }
                break;
            case "pin_hide":
                (0, D.pinnedMessageHide)(e, (0, A.getPeer)(e), t);
                break;
            case "pin_unhide":
                (0, D.pinnedMessageUnHide)(e, (0, A.getPeer)(e), t);
                break;
            case "unpin":
                (0, D.pinnedMessageUnpin)(e, (0, A.getPeer)(e), t);
                break;
            case "settings":
                n().showSettings(e)
        }
        uiActionsMenu.toggle(s, !1), t().cancelEditing()
    }

    function b(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(P.cleanSelected).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
    }

    function y(e, t, n, r) {
        var a = (0, L.isClassicInterface)(e),
            i = void 0,
            o = void 0;
        switch (domData(r, "type")) {
            case "star":
                o = [4, 6], i = function() {
                    return (0, L.isImportant)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                };
                break;
            case "answer":
                o = [4, 6], i = getLang("mail_end_conversation");
                break;
            case "search":
                o = a ? [5, 6] : [4, -9], i = getLang("mail_search_in_peer")
        }
        showTooltip(r, {
            text: i || "",
            black: 1,
            shift: o,
            forcetoup: !0,
            appendParentCls: a ? "_im_dialog_actions" : "_im_mess_actions"
        })
    }

    function w(e, t, n) {
        var r = (0, L.isClassicInterface)(e),
            a = domData(n.target, "action");
        "respond" !== a && "forward" !== a && showTooltip(n.target, {
            text: C.bind(null, e, a) || "",
            black: 1,
            shift: [2, r ? -4 : 11],
            forcetodown: !0,
            appendParentCls: "_im_dialog_actions"
        })
    }

    function C(e, t) {
        var n = e.get(),
            r = n.selectedMessages,
            o = n.peer;
        switch (t) {
            case "pin":
                return i(r, e) ? getLang("mail_unpin") : getLang("mail_pin");
            case "star":
                return a(r, e, o) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
            case "delete":
                return getLang("mail_delete");
            case "spam":
                return getLang("mail_im_mark_spam")
        }
    }

    function E(e, t, n, r, a) {
        var i = domData(a, "type");
        switch (i) {
            case "star":
                e.set(P.toggleDialogImportant.bind(null, e.get().peer)).then(function() {
                    setTimeout(function() {
                        return y(e, t, r, a)
                    }, 40)
                });
                break;
            case "search":
                n().showSearch(e), window.tooltips && tooltips.hide(a, {
                    fasthide: !0
                });
                break;
            case "answer":
                var o = (0, A.getTab)(e, e.get().peer);
                o && (e.set(P.markDialogAnswered.bind(null, e.get().peer, o.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                    out: 1e3
                }), e.get().longpoll.push([(0, O.resetPeer)()]))
        }
    }

    function k(e, t, n) {
        return e().updateChatTopic(t, n), n
    }

    function S(e, t, n, r) {
        return {
            changeActions: function(t) {
                var n = geByClass1(H, e),
                    r = geByClass1(U, e),
                    a = t.get().curActions,
                    i = Object.keys(a).map(function(e, t) {
                        var n = "";
                        return 7 !== P.ACTION_PRIORITIES[e] && 10 !== P.ACTION_PRIORITIES[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs($, {
                            name: a[e].name,
                            icon: a[e].icon,
                            action: e
                        })
                    }).join("");
                0 === Object.keys(a).length ? addClass(r, "im-page--header-more_loading") : (val(n, i), removeClass(r, "im-page--header-more_loading"))
            },
            showSettings: function(n) {
                var a = n.get(),
                    i = a.chatSettingsAllowed,
                    o = (0, A.getTab)(n, a.peer);
                i ? o.data.closed || o.data.kicked || (0, R.mount)(e, n, r) : (0, L.showChatMembers)(n, t, P.setCreationType)
            },
            renderPeer: function(n) {
                u(e, n, t)
            },
            reRenderPinned: function(e) {
                var t = (0, A.getCurrentTab)(e);
                t && t.pinned && c(e)
            },
            renderActions: function(t) {
                var n = t.get().selectedMessages || [];
                n.length > 0 && l(e, n, t)
            },
            hideActions: function(t) {
                if (!(0, L.isFullyLoadedTab)(t, t.get().peer)) {
                    var n = geByClass1(U, e);
                    addClass(n, "im-page--header-more_loading")
                }
            },
            changedMessageSelection: function(n) {
                if (0 !== n.get().peer) {
                    var r = n.get().selectedMessages || [];
                    r.length > 0 ? l(e, r, n) : u(e, n, t)
                }
            },
            updateLastSeen: function(t) {
                o(t, e)
            },
            deselectAll: function(e) {
                b(e, t, r)
            },
            unmount: function() {
                (0, M.destroyModule)(n), cancelStackFilter("fowrward")
            }
        }
    }

    function T(e, t, n) {
        var r = (0, M.createMutations)(S),
            a = r.callMutations,
            i = r.bindMutations,
            o = m.bind(null, t, n, a),
            s = v.bind(null, t, n, a, e),
            l = b.bind(null, t, n, a),
            u = function(e, n) {
                return (0, L.showVerifiedTooltip)(n, t.get().peer)
            },
            c = y.bind(null, t, e),
            d = w.bind(null, t, e),
            f = E.bind(null, t, e, n),
            p = function() {
                return a().showSettings(t)
            },
            g = function(t) {
                gpeByClass(W, t.target, e) && !checkEvent(t) && (p(), cancelEvent(t))
            },
            h = (0, M.createModule)({
                handlers: function(n, r) {
                    r(e, "click", G, o), r(e, "click", B, s), r(e, "click", L.DESELECT_ALL_CLASS, l), r(e, "mouseover", q, u), r(e, "mouseover", "_im_header_icon", c), r(e, "mouseover", G, d), r(e, "click", "_im_header_icon", f), r(e, "click", "_im_header_link", g), r(e, "click", K, g), r(e, "click", Y, p), r(e, "click", "_im_page_back", function(e) {
                        checkEvent(e) || (t.get().longpoll.push([(0, O.resetPeer)()]), cancelEvent(e))
                    })
                }
            });
        return (0, L.isReservedPeer)(t.get().peer) || setTimeout(function() {
            t.set(P.setActions).then(a().changeActions)
        }), i(e, n, h, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var I = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.mount = T;
    var M = n(198),
        P = n(28),
        L = n(88),
        O = n(199),
        A = n(190),
        x = n(188),
        N = n(121),
        D = n(37),
        R = n(98),
        j = n(115),
        B = "_im_action",
        F = "_im_page_peer_name",
        H = "_ui_menu",
        U = "_im_dialog_action_wrapper",
        z = "_im_mess_actions",
        G = "_im_page_action",
        V = "_im_chat_topic_change_input",
        q = "_im_chat_verified",
        W = "im-page--chat-header_chat",
        K = "_im_page_peer_name",
        Y = "_im_chat_members",
        Q = "_im_chat_invite_link",
        $ = '<a tabindex="0" role="link" class="ui_actions_menu_item ' + B + ' im-action im-action_%icon%" data-action="%action%">%name%</a>'
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(92)),
        f = n(57),
        p = r(f),
        m = function(e) {
            function t() {
                return a(this, t), i(this, e.apply(this, arguments))
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.href,
                    n = e.hovered,
                    r = e.className,
                    a = e.children,
                    i = (0, p["default"])(this.props, ["hovered"]),
                    o = (0, d.classNames)("Link", {
                        "Link--hovered": !!n
                    }, r);
                return t ? u["default"].createElement("a", s({}, i, {
                    className: o
                }), a) : u["default"].createElement("span", s({}, i, {
                    className: o
                }), a)
            }, t
        }(l.Component);
    t["default"] = m, m.defaultProps = {
        href: void 0,
        hovered: !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = s({}, o.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var n = o.toStr(t);
        o.setLoc(n)
    }

    function a() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = s(e, t)
            },
            commitNav: function() {
                r(e), e = {}
            },
            scheduleNavWithTimeOut: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                e = s(e, t), setTimeout(function() {
                    r(e), e = {}
                }, n)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateLocation = r, t.updateLazyLocation = a;
    var i = window,
        o = i.nav,
        s = i.extend
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }

    function a() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; 10 > n; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var a = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                a[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, a)).join("") ? !1 : !0
        } catch (i) {
            return !1
        }
    }
    var i = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable;
    e.exports = a() ? Object.assign : function(e, t) {
        for (var n, a, l = r(e), u = 1; u < arguments.length; u++) {
            n = Object(arguments[u]);
            for (var c in n) o.call(n, c) && (l[c] = n[c]);
            if (i) {
                a = i(n);
                for (var d = 0; d < a.length; d++) s.call(n, a[d]) && (l[a[d]] = n[a[d]])
            }
        }
        return l
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t ? void ls.set(e, t) : ls.get(e)
    }

    function a(e) {
        try {
            var t = {};
            return Error.captureStackTrace(t, e), t.stack
        } catch (n) {
            return ""
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = debounce(r, 300),
            o = extend({}, e),
            s = [],
            l = [];
        return t.store && (o = ls.get(t.key) || o), {
            get: function() {
                return o
            },
            set: function(e) {
                var r = this,
                    s = (0, i.isWeirdLogging)() ? a(this.set) : null;
                return e(o).then(function(e) {
                    return o = e, t.store && n(t.key, e), r.emit(), r
                })["catch"](function(e) {
                    return (0, i.imWeirdCatch)("store_set_catch", e, {
                        stack: s
                    })
                })
            },
            setState: function(e) {
                var t = this;
                return this.set(function(n) {
                    return n = extend(n, e), t.emit(), Promise.resolve(n)
                })
            },
            stash: function() {
                s.push(o), o = extend({}, e), this.emit()
            },
            reset: function() {
                o = extend({}, e), this.emit()
            },
            unmount: function() {
                o = {}, e = !1, l = []
            },
            pop: function() {
                s.length > 0 && (o = s.pop(), this.emit())
            },
            emit: function() {
                var e = this;
                l.length > 0 && l.forEach(function(t) {
                    return t(e)
                })
            },
            subscribe: function(e) {
                -1 === l.indexOf(e) && l.push(e)
            },
            unsubscribe: function(e) {
                l = l.filter(function(t) {
                    return t !== e
                })
            },
            mutate: function(e) {
                e(o), t.store && n(t.key, o), this.emit()
            }
        }
    };
    var i = n(12)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(63),
        c = r(u),
        d = n(194),
        f = r(d),
        p = n(145),
        m = r(p),
        g = n(109),
        h = r(g),
        _ = window,
        v = _.elfocus,
        b = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onCopy = function() {
                    r.input && (v(r.input, 0, r.input.value.length), document.execCommand("copy"), r.setState({
                        copied: !0
                    }))
                }, r.onBlinkTextHide = function() {
                    r.setState({
                        copied: !1
                    })
                }, r.getInputRef = function(e) {
                    e && e.element && (r.input = e.element)
                }, r.state = {
                    copied: !1
                }, r
            }
            return o(t, e), t.prototype.componentDidMount = function() {
                this.input && v(this.input, 0, this.input.value.length)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.getLang,
                    n = e.onReset,
                    r = e.invitationLink,
                    a = t("mail_invite_link_reset_explainer").split("{reset_link}");
                return l["default"].createElement("div", {
                    className: "ChatSettingsInvitationLink"
                }, this.props.reseted && l["default"].createElement("div", {
                    className: "ChatSettingsInvitationLink__reseted"
                }, t("mail_invite_link_reseted_explainer")), l["default"].createElement("p", null, t("mail_invite_link_explainer")), l["default"].createElement("div", {
                    className: "ChatSettingsInvitationLink__main"
                }, l["default"].createElement(c["default"], {
                    ref: this.getInputRef,
                    readOnly: "readonly",
                    className: "ChatSettingsInvitationLink__input",
                    value: r
                }), l["default"].createElement(f["default"], {
                    onClick: this.onCopy
                }, t("mail_get_invite_link_copy")), l["default"].createElement(m["default"], {
                    className: "ChatSettingsInvitationLink__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, t("mail_invite_link_copied"))), l["default"].createElement("p", null, a[0], l["default"].createElement(h["default"], {
                    className: "ChatSettingsInvitationLink__reset",
                    onClick: n
                }, t("mail_invite_reset_link")), a[1]))
            }, t
        }(s.Component);
    t["default"] = b
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e !== e && t !== t
    }

    function a(e, t) {
        if (r(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var n = Object.keys(e),
            a = Object.keys(t);
        if (n.length !== a.length) return !1;
        for (var o = 0; o < n.length; o++)
            if (!i.call(t, n[o]) || !r(e[n[o]], t[n[o]])) return !1;
        return !0
    }
    var i = Object.prototype.hasOwnProperty;
    e.exports = a
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t, n) {
        return d(e, k, t, n)
    }

    function i(e, t, n) {
        return d(e, S, t, n)
    }

    function o(e, t, n, r) {
        var a = (0, _.unpackStore)(e),
            i = (0, _.getTab)(a, n || a.peer);
        return m(i, t) ? !1 : d(e, L, n, r)
    }

    function s(e, t, n) {
        return d(e, T, t, n)
    }

    function l(e, t, n, r) {
        var a = (0, _.unpackStore)(e),
            i = (0, _.getTab)(a, n || a.peer),
            o = d(e, I, n, r),
            s = f(i, b);
        return r = "undefined" == typeof r ? window.vk.id : r, m(i, t) ? !1 : s || m(i, r) || p(i, r) ? o : o && !p(i, t) && g(i, t)
    }

    function u(e, t, n) {
        return d(e, M, t, n)
    }

    function c(e, t, n) {
        return d(e, P, t, n)
    }

    function d(e, t, n, r) {
        var a = (0, _.unpackStore)(e);
        r = "undefined" == typeof r ? window.vk.id : r, n = "undefined" == typeof n ? a.peer : n;
        var i = (0, _.getTab)(a, n),
            o = !i.data.kicked && !i.data.closed,
            s = O[t];
        switch (t) {
            case k:
            case S:
            case L:
                return f(i, s) ? p(i, r) && o : m(i, r);
            case T:
            case I:
            case M:
            case P:
                return f(i, s) ? p(i, r) && o : o
        }
        return !1
    }

    function f(e, t) {
        var n = e && e.data && e.data.flags || 0;
        return (n & t) > 0
    }

    function p(e, t) {
        var n = e && e.adminIds || [];
        return n.indexOf(+t) > -1
    }

    function m(e, t) {
        return e.ownerId === t
    }

    function g(e, t) {
        return -1 !== e.invitedByMe.indexOf(t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MAIL_CHATS_ACTION_ADD_ADMIN = t.MAIL_CHATS_ACTION_CHANGE_TITLE = t.MAIL_CHATS_ACTION_PIN_OR_UNPIN = t.MAIL_CHATS_ACTION_KICK_USER = t.MAIL_CHATS_ACTION_INVITE_USER = t.MAIL_CHATS_ACTION_CHANGE_INVITE_LINK = t.MAIL_CHATS_ACTION_SEE_INVITE_LINK = t.MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK = t.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE = void 0;
    var h;
    t.canSeeInviteLink = a, t.canChangeInviteLink = i, t.canAddAdmin = o, t.canInviteUser = s, t.canKickUser = l, t.canPinOrUnpin = u, t.canChangeTitle = c, t.checkChatRights = d, t.doesChatTabHaveFlag = f, t.isUserAdminInChat = p, t.isUserOwnerInChat = m, t.isUserInvitedByMe = g;
    var _ = n(190),
        v = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE = 1,
        b = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK = 2,
        y = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN = 4,
        w = t.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE = 8,
        C = t.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS = 16,
        E = t.MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK = 32,
        k = t.MAIL_CHATS_ACTION_SEE_INVITE_LINK = "see_invite_link",
        S = t.MAIL_CHATS_ACTION_CHANGE_INVITE_LINK = "change_invite_link",
        T = t.MAIL_CHATS_ACTION_INVITE_USER = "invite_user",
        I = t.MAIL_CHATS_ACTION_KICK_USER = "kick_user",
        M = t.MAIL_CHATS_ACTION_PIN_OR_UNPIN = "pin_unpin",
        P = t.MAIL_CHATS_ACTION_CHANGE_TITLE = "change_title",
        L = t.MAIL_CHATS_ACTION_ADD_ADMIN = "add_admin",
        O = (h = {}, r(h, k, E), r(h, S, E), r(h, L, C), r(h, T, v), r(h, I, b), r(h, M, y), r(h, P, w), h)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(123),
        c = r(u),
        d = n(26),
        f = r(d),
        p = n(83),
        m = r(p),
        g = n(194),
        h = r(g),
        _ = n(55),
        v = r(_),
        b = n(140),
        y = r(b),
        w = n(145),
        C = r(w),
        E = n(69),
        k = r(E),
        S = n(115),
        T = Math.log2 || function(e) {
            return Math.log(e) / Math.LN2
        },
        I = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onChange = function(e) {
                    var t = e.name,
                        n = e.selected.value,
                        a = r.state.flags;
                    r.setState({
                        flags: n ? a | 1 << t : a & ~(1 << t)
                    })
                }, r.onCancel = function() {
                    r.setState({
                        flags: r.props.tab.data.flags
                    }), r.props.back()
                }, r.onSave = function() {
                    r.state.loading || (r.setState({
                        loading: !0
                    }), r.props.onSave(r.state.flags).then(function() {
                        r.setState({
                            loading: !1,
                            saved: !0
                        })
                    })["catch"](function(e) {
                        r.setState({
                            loading: !1,
                            flags: r.props.tab.data.flags
                        })
                    }))
                }, r.onBlinkTextHide = function() {
                    r.setState({
                        saved: !1
                    })
                }, r.state = {
                    flags: n.tab.data.flags,
                    loading: !1,
                    saved: !1
                }, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    n = t.getLang,
                    r = t.tab,
                    a = this.state.flags,
                    i = [{
                        value: !0,
                        label: n("mail_settings_only_admins")
                    }, {
                        value: !1,
                        label: n("mail_settings_all_members")
                    }],
                    o = r.serverSettings;
                return l["default"].createElement("div", {
                    className: "ChatSettingsOptions"
                }, l["default"].createElement(c["default"], null, l["default"].createElement(f["default"], {
                    selectable: !1,
                    aside: l["default"].createElement(m["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: T(S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE),
                        options: i,
                        value: !!(a & S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE)
                    })
                }, l["default"].createElement(k["default"], {
                    type: "plus"
                }), n("mail_settings_can_invite")), l["default"].createElement(f["default"], {
                    selectable: !1,
                    aside: l["default"].createElement(m["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: T(S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK),
                        options: i,
                        value: !!(a & S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_KICK)
                    })
                }, l["default"].createElement(k["default"], {
                    type: "remove"
                }), n("mail_settings_can_kick")), l["default"].createElement(f["default"], {
                    selectable: !1,
                    aside: l["default"].createElement(m["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: T(S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE),
                        options: i,
                        value: !!(a & S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE)
                    })
                }, l["default"].createElement(k["default"], {
                    type: "pencil"
                }), n("mail_settings_can_edit_info")), l["default"].createElement(f["default"], {
                    selectable: !1,
                    aside: l["default"].createElement(m["default"], {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: T(S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN),
                        options: i,
                        value: !!(a & S.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN)
                    })
                }, l["default"].createElement(k["default"], {
                    type: "pin"
                }), n("mail_settings_can_pin")), l["default"].createElement(f["default"], {
                    selectable: !1,
                    aside: l["default"].createElement(m["default"], {
                        className: "ChatSettingsOptions__longselect",
                        onChange: this.onChange,
                        name: T(S.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS),
                        options: [{
                            value: !1,
                            label: n("mail_settings_only_owner")
                        }, {
                            value: !0,
                            label: n("mail_settings_owner_and_admins")
                        }],
                        value: !!(a & S.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS)
                    })
                }, l["default"].createElement(k["default"], {
                    type: "user"
                }), n("mail_settings_admins_can_add_admins")), o.map(function(t) {
                    return l["default"].createElement(f["default"], {
                        selectable: !1,
                        key: t.name,
                        aside: l["default"].createElement(m["default"], {
                            className: "ChatSettingsOptions__select",
                            onChange: e.onChange,
                            name: T(t.bit),
                            options: t.options,
                            value: !!(a & t.bit)
                        })
                    }, l["default"].createElement(k["default"], {
                        type: t.icon
                    }), t.name)
                })), l["default"].createElement(y["default"], {
                    alignment: "right"
                }, l["default"].createElement("div", {
                    className: "ChatSettingsOptions__saved"
                }, l["default"].createElement(C["default"], {
                    shown: this.state.saved,
                    callback: this.onBlinkTextHide
                }, n("global_changes_saved"))), l["default"].createElement(h["default"], {
                    appearance: "tertiary",
                    onClick: this.onCancel
                }, n("global_cancel")), l["default"].createElement(v["default"], {
                    onClick: this.onSave,
                    loading: this.state.loading
                }, n("global_save"))))
            }, t
        }(s.Component);
    t["default"] = I
}, function(e, t, n) {
    var r = n(14),
        a = n(61)("iterator"),
        i = n(212);
    e.exports = n(41).getIteratorMethod = function(e) {
        return void 0 != e ? e[a] || e["@@iterator"] || i[r(e)] : void 0
    }
}, function(module, exports, __webpack_require__) {
    "use strict";

    function uploadFailed(e, t, n) {
        var r = void 0 !== t.ind ? t.ind : t,
            a = t.fileName ? r + "_" + t.fileName : t;
        re("upload" + a + "_progress_wrap"), e().unchoose(a);
        var i = geByClass1("popup_box_container");
        if (!i) {
            var o = "photo" == Upload.options[r].file_name ? getLang("mail_add_photo_error") : getLang("mail_add_doc_error");
            setTimeout(showFastBox({
                title: getLang("global_error")
            }, o).hide, 2e3)
        }
        topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + r) || {}).action
        }), Upload.embed(r)
    }

    function onAnyUploaded(e) {
        var t = void 0 !== e.ind ? e.ind : e,
            n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
            r = n ? t + "_" + n : e,
            a = ge("upload" + r + "_progress_wrap");
        return a && hide(geByClass1("progress_x", a)), r
    }

    function onPhotoUploaded(e, t, n, r) {
        var a = onAnyUploaded(e);
        ajax.post("al_photos.php", extend({
            act: "choose_uploaded"
        }, t), {
            onDone: function(e, t) {
                r().choose("photo", e, extend(t, {
                    upload_ind: a
                }))
            },
            onFail: uploadFailed.bind(null, r, e)
        })
    }

    function onDocUploaded(e, t, n, r) {
        var a = onAnyUploaded(e),
            i = {
                act: "a_save_doc",
                from: "choose",
                mail_add: 1
            };
        n.opts.imhash && (i = extend(i, {
            from_place: "from_gim",
            imhash: n.opts.imhash
        })), ajax.post("docs.php", extend(i, t), {
            onDone: function(e, t, n) {
                r().choose("doc", e + "_" + t, extend(n, {
                    upload_ind: a
                }))
            },
            onFail: uploadFailed.bind(null, r, e)
        })
    }

    function detectDropboxMode(e, t) {
        if (!e().canAddMedia()) return "none";
        if (!t.items) return "photo";
        var n = [].slice.call(t.items).every(function(e) {
            var t = e.type.split("/");
            return /^(jpg|jpeg|png|heic|heif)$/i.test(t[1])
        });
        return n ? "photo" : "doc"
    }

    function showDropbox(e) {
        var t = geByClass1(DROPBOX_CLASS),
            n = geByClass1("im-page--chat-header").getBoundingClientRect(),
            r = geByClass1("im-chat-input").getBoundingClientRect();
        (n.width < 10 || r.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = r.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
    }

    function hideDropbox() {
        var e = geByClass1(DROPBOX_CLASS);
        hide(e)
    }

    function parseOnCompleteResponse(res) {
        try {
            return eval("(" + res + ")")
        } catch (e) {
            return q2ajx(res)
        }
    }

    function parseOnUploadProgress(e, t, n) {
        return {
            loaded: t,
            total: n,
            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
        }
    }

    function handleUploadCompleteError(e, t, n, r) {
        var a = "string" == typeof t && t.indexOf("TERMINATED") > -1;
        a || Upload.onUploadError(e), r().reHeight(n)
    }

    function initPhotoUploader(e, t, n, r) {
        var a = t.get().upload_opts,
            i = geByClass1("_im_upload_photo"),
            o = geByClass1("_im_drop_photo");
        return Upload.init(i, a.url, a.params, {
            file_name: "photo",
            file_size_limit: 26214400,
            file_types: "*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF;*.jpeg;*.JPEG;*.heic;*.HEIC;*.heif;*.HEIF",
            accept: "image/jpeg,image/png,image/gif,image/heic,image/heif",
            file_match: a.opts.ext_re,
            lang: a.opts.lang,
            onNoFilteredCallback: function(e) {
                Upload.onFileApiSend(r, e)
            },
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, r) {
                var i = parseOnCompleteResponse(r);
                i.photos ? (statlogsValueEvent("upload_photo_fails", 1, a.opts.server, "success"), onPhotoUploaded(e, i, a, n)) : handleUploadCompleteError(e, r, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var a = void 0 !== e.ind ? e.ind : e;
                n().progress("photo", a, parseOnUploadProgress(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, a.opts.server, t), uploadFailed(n, e, t)
            },
            onDragEnter: function(e) {
                var t = geByClass1("im-audio-message_recording");
                e.dataTransfer && !t && showDropbox(detectDropboxMode(n, e.dataTransfer))
            },
            onDragOut: function() {
                hideDropbox()
            },
            onDrop: function() {
                hideDropbox()
            },
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "photo",
            max_attempts: 3,
            server: a.opts.server,
            error: a.opts.default_error,
            error_hash: a.opts.error_hash,
            dropbox: o,
            dragEl: bodyNode
        })
    }

    function initDocUploader(e, t, n) {
        var r = t.get().upload_doc_opts,
            a = geByClass1("_im_upload_doc"),
            i = geByClass1("_im_drop_doc");
        return Upload.init(a, r.url, r.params, {
            file_name: "file",
            file_size_limit: 209715200,
            file_types: "*.*;",
            lang: r.opts.lang,
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, a) {
                var i = parseOnCompleteResponse(a);
                i.file ? (statlogsValueEvent("upload_photo_fails", 1, r.opts.server, "success"), onDocUploaded(e, i, r, n)) : handleUploadCompleteError(e, a, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var a = void 0 !== e.ind ? e.ind : e;
                n().progress("doc", a, parseOnUploadProgress(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, r.opts.server, t), uploadFailed(n, e, t)
            },
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "doc",
            max_attempts: 3,
            server: r.opts.server,
            error: r.opts.default_error,
            error_hash: r.opts.error_hash,
            dropbox: i,
            dragEl: bodyNode
        })
    }

    function mount(e, t, n) {
        removeEvent(bodyNode, "dragover dragenter");
        var r = initDocUploader(e, t, n),
            a = initPhotoUploader(e, t, n, r);
        cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
        var i = (0, _modules.createModule)({
            handlers: function(e) {
                var t = ge("im_full_upload");
                e(t, "change", function r(o) {
                    n().canAddMedia() ? Upload.onFileApiSend(a, o.target.files) : showFastBox(getLang("global_error"), getLang("global_error")), (0, _modules.destroyModule)(i);
                    var s = t.cloneNode();
                    t.parentNode.replaceChild(s, t), t = s, e(t, "change", r)
                })
            }
        });
        return {
            paste: function(e) {
                Upload.onFileApiSend(a, e)
            },
            unmount: function() {
                (0, _modules.destroyModule)(i), Upload.deinit(a), Upload.deinit(r)
            }
        }
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.mount = mount;
    var _modules = __webpack_require__(198),
        DROPBOX_CLASS = "_im_upload_dropbox"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(180),
        l = r(s),
        u = n(144),
        c = r(u),
        d = n(21),
        f = (r(d), n(92)),
        p = n(120),
        m = r(p),
        g = window,
        h = g.elfocus,
        _ = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onChange = function(e) {
                    r.props.onChange ? r.props.onChange(e) : r.setState({
                        value: e.target.value,
                        changed: r.props.value !== r.state.value
                    })
                }, r.onClick = function() {
                    r.setState({
                        editing: !0
                    }, function() {
                        r.textarea && h(r.textarea)
                    })
                }, r.onBlur = function() {
                    r.state.changed || r.setState({
                        editing: !1
                    })
                }, r.onSave = function() {
                    (!r.props.validate || r.props.validate(r.state.value)) && (r.setState({
                        editing: !1,
                        changed: !1
                    }), r.props.onSave && r.props.onSave({
                        value: r.state.value
                    }))
                }, r.onKeydown = function(e) {
                    r.state.editing && (27 === e.keyCode && (r.props.onCancel && r.props.onCancel(), r.setState({
                        editing: !1,
                        changed: !1,
                        value: r.props.value
                    }), e.preventDefault(), e.stopPropagation()), r.props.useEnter && 13 === e.keyCode && (r.onSave(), e.preventDefault(), e.stopPropagation()))
                }, r.getRef = function(e) {
                    e && e.element && (r.textarea = e.element)
                }, r.state = {
                    value: n.value,
                    editing: !1,
                    changed: n.onChange ? n.changed : !1
                }, r
            }
            return o(t, e), t.prototype.componentWillReceiveProps = function(e) {
                this.setState({
                    value: e.value,
                    changed: e.onChange ? e.changed : e.value === this.state.value
                })
            }, t.prototype.componentDidMount = function() {
                this.el = c["default"].findDOMNode(this), this.el.addEventListener("keydown", this.onKeydown)
            }, t.prototype.componentWillUnmount = function() {
                this.el.removeEventListener("keydown", this.onKeydown)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.validate,
                    r = this.state,
                    a = r.editing,
                    i = r.changed,
                    o = r.value,
                    u = (0, f.classNames)("EditableLabel", {
                        "EditableLabel--editing": a,
                        "EditableLabel--changed": i,
                        "EditableLabel--invalid": n && !n(o)
                    }, t);
                return l["default"].createElement("div", {
                    className: u
                }, a ? l["default"].createElement(s.Fragment, null, l["default"].createElement(m["default"], {
                    className: "EditableLabel__textarea",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: o,
                    onBlur: this.onBlur,
                    style: {
                        height: "auto"
                    },
                    rows: "1",
                    ref: this.getRef
                }), i && l["default"].createElement("button", {
                    className: "EditableLabel__save",
                    onClick: this.onSave
                })) : l["default"].createElement("div", {
                    className: "EditableLabel__text",
                    onClick: this.onClick
                }, o))
            }, t
        }(s.Component);
    t["default"] = _, _.defaultProps = {
        value: "",
        changed: !1,
        useEnter: !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(57)),
        f = r(d),
        p = n(92),
        m = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.getRef = function(e) {
                    r.element = e
                }, r.resize = function() {
                    var e = r.element;
                    if (e) {
                        var t = e.offsetHeight,
                            n = e.scrollHeight,
                            a = 0,
                            i = 0,
                            o = a + i;
                        t >= n + o && (o = 0), e.value && r.setState({
                            height: n - o
                        }), r.setState({
                            height: 0
                        }, function() {
                            var t = e.scrollHeight - o;
                            r.setState({
                                height: t
                            }), r.props.onResize(e)
                        })
                    }
                }, r.onChange = function(e) {
                    r.props.grow && r.resize(), r.isControlledOutside || r.setState({
                        value: e.target.value
                    }), r.props.onChange && r.props.onChange(e)
                }, r.state = {
                    value: "undefined" == typeof n.value ? n.initialValue || "" : void 0
                }, "undefined" != typeof n.value && (r.isControlledOutside = !0), r
            }
            return o(t, e), t.prototype.componentDidMount = function() {
                this.props.grow && this.resize()
            }, t.prototype.render = function() {
                var e = this.props,
                    t = this.isControlledOutside ? e.value : this.state.value,
                    n = this.state.height || this.props.style.height || 66;
                return u["default"].createElement("textarea", s({}, (0, f["default"])(e, ["initialValue", "grow", "style", "onResize"]), {
                    value: t,
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    ref: this.getRef,
                    style: Object.assign({}, e.style, {
                        height: n
                    }),
                    className: (0, p.classNames)("Textarea", e.className)
                }))
            }, t
        }(l.Component);
    t["default"] = m, m.defaultProps = {
        initialValue: "",
        grow: !0,
        onResize: function() {},
        style: {}
    }
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
    var s = n(190)
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = {
            "List--border": !!e.border
        };
        return o["default"].createElement("ul", {
            className: (0, l.classNames)("List", t, e.className),
            style: e.style
        }, e.children)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var i = n(180),
        o = r(i),
        s = n(21),
        l = (r(s), n(92));
    a.defaultProps = {
        border: !0
    }
}, function(e, t, n) {
    "use strict";
    var r = {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        var a = '<td class="im_cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
        return new Promise(function(e) {
            stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                var t = new Datepicker(n, {
                    width: 140,
                    resfmt: "plain",
                    addRows: '<tr id="im_day_clear">' + a + "</tr>",
                    addRowsM: '<tr id="im_month_clear">' + a + "</tr>",
                    onUpdate: r
                });
                e(t)
            })
        })
    }

    function a(e, t, n, r, a, i) {
        return {
            focus: function(e) {
                uiSearch.focus(t), l(e, t, n, r)
            },
            changePeer: function(e, n) {
                uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
            },
            search: function() {
                i({})
            },
            unmount: function() {
                (0, m.destroyModule)(a), cancelStackFilter(g), r.then(function(e) {
                    return e.destroy()
                })
            }
        }
    }

    function i(e, t, n, r) {
        e.set(p.setCurrentSearchDate.bind(null, e.get().peer, r.d + "." + r.m + "." + r.y)).then(s.bind(null, e, t, n))
    }

    function o(e, t) {
        e.then(function(e) {
            triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
        })
    }

    function s(e, t, n) {
        var r = e.get().peer;
        uiSearch.showProgress(n), (0, p.searchMessagesInplace)(r, e.get()).then(function(r) {
            uiSearch.hideProgress(n), t().insertSearch(r, e)
        })["catch"](function() {
            uiSearch.focus(n), uiSearch.hideProgress(n)
        })
    }

    function l(e, t, n, r) {
        cancelStackPush(g, c.bind(null, e, t, n, r))
    }

    function u(e, t, n, r, a, i) {
        if ("keyup" !== i.type || 13 == i.which) {
            var o = clean(uiSearch.getFieldEl(t).value);
            e.set(p.setCurrentSearch.bind(null, o, e.get().peer)).then(a.bind(null, e, r, t))
        }
    }

    function c(e, t, n, r) {
        cancelStackFilter(g), r.then(function(e) {
            e.hide()
        }), e.set(p.cancelSearch.bind(null, e.get().peer)).then(function() {
            uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
        })
    }

    function d(e, t, n, r) {
        n.then(function(e) {
            e.hide()
        }), e.set(p.clearDate.bind(null, e.get().peer)).then(s.bind(null, e, t, r))
    }

    function f(e, t, n) {
        var l = geByClass1(_, e),
            f = geByClass1(v, e),
            p = i.bind(null, t, n, f),
            g = r(t, e, l, p),
            C = o.bind(null, g, e),
            E = u.bind(null, t, f, l, n, debounce(s, 300)),
            k = c.bind(null, t, f, n, g),
            S = d.bind(null, t, n, g, f),
            T = (0, m.createModule)({
                handlers: function(t, n) {
                    t(geByClass1(h, e), "click", C), t(uiSearch.getFieldEl(f), "keyup", E), t(geByClass1(b, e), "click", E), t(geByClass1(y, e), "click", k), n(e, "click", w, S)
                }
            });
        return a(e, f, n, g, T, E)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = f;
    var p = n(28),
        m = n(198),
        g = "im_hist_search",
        h = "_im_search_date",
        _ = "_im_search_date_input",
        v = "_im_search_history_input",
        b = "_im_start_inplace_search",
        y = "_im_cancel_inplace_search",
        w = "_im_clear_date"
}, function(e, t, n) {
    "use strict";
    var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    e.exports = r
}, , function(e, t, n) {
    var r = n(30),
        a = n(201),
        i = n(133),
        o = Object.defineProperty;
    t.f = n(131) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), a) try {
            return o(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t, n) {
    var r = n(53),
        a = n(19);
    e.exports = function(e) {
        return function(t, n) {
            var i, o, s = String(a(t)),
                l = r(n),
                u = s.length;
            return 0 > l || l >= u ? e ? "" : void 0 : (i = s.charCodeAt(l), 55296 > i || i > 56319 || l + 1 === u || (o = s.charCodeAt(l + 1)) < 56320 || o > 57343 ? e ? s.charAt(l) : i : e ? s.slice(l, l + 2) : (i - 55296 << 10) + (o - 56320) + 65536)
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return new Promise(function(n) {
            setTimeout(n.bind(null, t), 1e3 * e)
        })
    }

    function a(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            a = 0;
        return function i() {
            for (var o = arguments.length, s = Array(o), l = 0; o > l; l++) s[l] = arguments[l];
            return Promise.resolve().then(function() {
                return e.apply(void 0, s)
            })["catch"](function(e) {
                if (a++, t >= a) {
                    var o = "function" == typeof n ? n(a) : 0;
                    return 0 === o ? i.apply(void 0, s) : r(o).then(function() {
                        return i.apply(void 0, s)
                    })
                }
                throw e
            })
        }
    }

    function i(e, t, n) {
        var r = void 0,
            a = void 0;
        return function() {
            for (var i = arguments.length, o = Array(i), s = 0; i > s; s++) o[s] = arguments[s];
            return new Promise(function(e, i) {
                var s = function() {
                        r = null, a = null, n || e(o)
                    },
                    l = n && !r;
                clearTimeout(r), a && a.reject("debounce"), r = setTimeout(s, t), l ? e(o) : n && i("debounce"), a = {
                    resolve: e,
                    reject: i
                }
            }).then(function(t) {
                return e.apply(void 0, t)
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
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.pause = r, t.retryFn = a, t.debouncedPromise = i, t.abortablePause = o
}, function(e, t, n) {
    e.exports = !n(157)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, , function(e, t, n) {
    var r = n(20);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, a;
        if (t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        if ("function" == typeof(n = e.valueOf) && !r(a = n.call(e))) return a;
        if (!t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    n(93), n(158), n(182), n(36), e.exports = n(41).Map
}, , function(e, t, n) {
    var r = n(128).f,
        a = n(18),
        i = n(61)("toStringTag");
    e.exports = function(e, t, n) {
        e && !a(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, n) {
    "use strict";
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return n;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return this[n]
        }
    })
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings";
        return getTemplate(e, {
            sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
            browser: i() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off")
        })
    }

    function a(e, t) {
        showTooltip(t.target, {
            content: r("im_settings_pop"),
            dir: "down",
            shift: [220, 9],
            hasover: !0,
            showdt: 300
        })
    }

    function i() {
        return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
    }

    function o(e, t, n, a, o) {
        var s = domData(o, "action"),
            l = gpeByClass("_im_settings_menu", o),
            u = hasClass(l, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
        switch (s) {
            case "spam":
                (0, f.showSpamLayer)(e, c.mount, a);
                break;
            case "sound":
                ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), l.outerHTML = r(u);
                break;
            case "browser":
                i() ? (ls.set("im_ui_notify_off", 1), l.outerHTML = r(u)) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(function() {
                    l.parentNode && (l.outerHTML = r(u))
                }) : (ls.set("im_ui_notify_off", 0), l.outerHTML = r(u))
        }
    }

    function s(e, t) {
        return {
            updateFilter: function(t) {
                var n = void 0,
                    r = t.get().active_tab === p.FOLDER_UNREAD;
                n = t.get().unread_cnt > 0 ? getTemplate("im_filter", {
                    filter: r ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread"),
                    cls: ""
                }) : getTemplate("im_filter", {
                    filter: getLang("mail_all_dialogs"),
                    cls: "im-page--dialogs-filter_disabled"
                }), val(geByClass1(h, e), n)
            },
            toggleLoader: function(t, n) {
                var r = geByClass1(m, e);
                toggleClass(r, "im-page--dialogs-settings_loading", n)
            },
            updateSettings: function(t) {
                var n = geByClass1("_im_settings_menu", e);
                n.outerHTML = r()
            },
            unmount: function() {
                (0, u.destroyModule)(t)
            }
        }
    }

    function l(e, t, n) {
        var r = a.bind(null, t),
            i = o.bind(null, t, n, e),
            l = function(e, r) {
                if ((0, f.showUnreadOnly)(t, n, d.changeDialogsTab)) {
                    var a = t.get().active_tab === p.FOLDER_UNREAD;
                    val(r, getTemplate("im_filter", {
                        filter: a ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                    }))
                }
            },
            c = (0, u.createModule)({
                handlers: function(t, n) {
                    n(e, "mouseover", m, r), n(e, "click", g, i), n(e, "click", h, l)
                }
            });
        return s(e, c)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = l;
    var u = n(198),
        c = n(146),
        d = n(28),
        f = n(88),
        p = n(94),
        m = "_im_dialogs_cog_settings",
        g = "_im_settings_action",
        h = "_im_to_unread"
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = {
            "SubmitArea--left": !e.alignment || "left" === e.alignment,
            "SubmitArea--center": "center" === e.alignment,
            "SubmitArea--right": "right" === e.alignment
        };
        return o["default"].createElement("div", {
            className: (0, s.classNames)("SubmitArea", t),
            style: e.style
        }, e.children)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var i = n(180),
        o = r(i),
        s = n(92)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = domData(t, "chat-id"),
            r = domData(t, "hash");
        return lockButton(t), (0, o.joinChat)(n, r, e.get()).then(function(n) {
            var r = i(n, 1),
                a = r[0];
            unlockButton(t), e.get().longpoll.push([(0, l.changePeer)(a)])
        })["catch"](function(e) {
            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
        })
    }

    function a(e, t) {
        var n = (0, s.createModule)({
            handlers: function(n, a) {
                a(e, "click", u, function(e) {
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
            } catch (l) {
                a = !0, i = l
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
    var o = n(28),
        s = n(198),
        l = n(199),
        u = "_im_join_chat"
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = (0, l.classNames)("Progress", {
            "Progress--inverted": e.inverted
        }, e.className);
        return o["default"].createElement("div", {
            className: t
        }, o["default"].createElement("div", {
            className: "Progress__item"
        }), o["default"].createElement("div", {
            className: "Progress__item"
        }), o["default"].createElement("div", {
            className: "Progress__item"
        }))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var i = n(180),
        o = r(i),
        s = n(21),
        l = (r(s), n(92));
    a.defaultProps = {
        inverted: !1
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
        } catch (e) {
            console.error(e)
        }
    }
    r(), e.exports = n(165)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(57)),
        f = r(d),
        p = n(92),
        m = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onTransitionEnd = function(e) {
                    r.state.shown && "opacity" === e.propertyName && (r.timeout = setTimeout(function() {
                        r.setState({
                            shown: !1
                        }), r.props.callback()
                    }, r.props.duration))
                }, r.state = {
                    shown: n.shown
                }, r
            }
            return o(t, e), t.prototype.componentWillReceiveProps = function(e) {
                !this.props.shown && e.shown && this.setState({
                    shown: !0
                })
            }, t.prototype.componentWillUnmount = function() {
                this.timeout && clearTimeout(this.timeout)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = (0, f["default"])(e, ["shown", "callback", "duration", "className"]),
                    n = (0, p.classNames)("BlinkText", {
                        "BlinkText--shown": this.state.shown
                    }, e.className);
                return u["default"].createElement("span", s({}, t, {
                    className: n,
                    onTransitionEnd: this.onTransitionEnd
                }), e.children)
            }, t
        }(l.Component);
    t["default"] = m, m.defaultProps = {
        duration: 2e3
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r) {
        if (!e.loading && !e.all) {
            var a = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (a > -300) {
                var i = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, (0, _.wrapLoading)(i)((0, h.loadSpam)(e.offset, r.get().gid).then(function(t) {
                    var n = g(t, 4),
                        a = (n[0], n[1]),
                        o = (n[2], n[3]);
                    e.all = o.all, e.offset = o.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(h.mergeTabs.bind(null, (0, _.tabFromIds)(o.msgs, o.hash)));
                    var s = ce("div");
                    s.innerHTML = a, i.appendChild(s), (0, _.ensureDomHasActions)(i)
                }), "bottom")
            }
        }
    }

    function i() {
        return '<button aria-label="' + getLang("mail_deselect_all") + '" type="button" class="im-deselect ' + _.DESELECT_ALL_CLASS + '"></button>'
    }

    function o(e, t) {
        var n = t.get().selectedMessages,
            r = geByClass1("_im_spam_box", e.bodyNode),
            a = geByClass1("ui_tab_sel", e.bodyNode);
        if (n.length > 0) {
            var o = getLang("mail_selected", n.length);
            o = o.replace("{count}", n.length), val(a, o + i())
        } else val(a, getLang("mail_spam"));
        0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(E), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(k), getLang("mail_im_mark_delspam", n.length)))
    }

    function s(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(h.cleanSelected).then(n.cleanSelection.bind(null, r)).then(function(n) {
            return o(t, e)
        })
    }

    function l(e, t, n, r) {
        var a = gpeByClass("_im_mess", r, t);
        if (a) {
            var i = intval(domData(a, "msgid"));
            a && ((0, h.removeMessageSend)([i], 0, e.get().tabs[0].hash, "undel", e.get().gid), (0, _.restoreMessage)(i, 0, t))
        }
    }

    function u(e, t, n) {
        var r = e.get().selectedMessages;
        (0, h.removeMessageSend)(r, 0, e.get().tabs[0].hash, "delete", e.get().gid), (0, _.removeMessagesWithRestore)(r, 0, "delete", t), s(e, t, n)
    }

    function c(e, t, n) {
        var r = e.get().selectedMessages;
        (0, h.removeMessageSend)(r, 0, e.get().tabs[0].hash, "nospam", e.get().gid), r.map(function(e) {
            return geByClass1("_im_mess_" + e)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            var t = intval(domData(e, "peer")),
                n = intval(domData(e, "msgid"));
            val(e, (0, _.renderGoTo)(t, n)), addClass(e, "im-mess_light")
        }), s(e, t, n)
    }

    function d(e, t, n, r, a) {
        var i = gpeByClass("_im_mess", a, t.bodyNode),
            o = intval(domData(i, "peer")),
            s = intval(domData(i, "msgid"));
        return t.hide(), n().unmount(), e.get().longpoll.push([(0, C.changePeer)(o, s)]), stopEvent(r), cancelEvent(r), !1
    }

    function f(e, t, n, r) {
        var a = showFastBox({
            title: getLang("mail_deleteall1"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("mail_delete_all_spam"), getLang("mail_delete"), function() {
            (0, h.flushSpam)(e, r).then(function(e) {
                var t = g(e, 2),
                    n = (t[0], t[1]);
                showDoneBox(n)
            }), a.hide(), t.hide(), n().unmount()
        }, getLang("mail_close"), function() {
            return a.hide()
        })
    }

    function p(e, t) {
        return {
            unmount: function() {
                t.unmount(), (0, v.destroyModule)(e)
            }
        }
    }

    function m(e, t, n) {
        var r = ge("box_layer_wrap"),
            i = (0, v.createMutations)(p),
            m = i.callMutations,
            g = i.bindMutations,
            h = (0, w["default"])({
                peer: 0,
                oCache: {},
                tabs: (0, _.tabFromIds)(n.msgs, n.hash),
                gid: t.get().gid
            }),
            y = a.bind(null, {
                all: n.all,
                loading: !1,
                offset: n.offset
            }, e, r, h),
            C = l.bind(null, h, e.bodyNode),
            S = d.bind(null, t, e, m),
            T = f.bind(null, n.hash, e, m, t.get().gid),
            I = (0, b.mount)(e.bodyNode, h, function(t) {
                return {
                    changedMessageSelection: o.bind(null, e)
                }
            }),
            M = u.bind(null, h, e.bodyNode, I),
            P = c.bind(null, h, e.bodyNode, I),
            L = s.bind(null, h, e, I);
        (0, _.ensureDomHasActions)(e.bodyNode);
        var O = (0, v.createModule)({
            handlers: function(t, n) {
                t(r, "scroll", y), t(geByClass1(k, e.bodyNode), "click", M), t(geByClass1(E, e.bodyNode), "click", P), t(geByClass1("_im_spam_flush", e.bodyNode), "click", T), n(e.bodyNode, "click", "_im_mess_restore", C), n(e.bodyNode, "click", "_im_go_to", S), n(e.bodyNode, "click", _.DESELECT_ALL_CLASS, L)
            }
        });
        return g(O, I)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var g = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.mount = m;
    var h = n(28),
        _ = n(88),
        v = n(198),
        b = n(203),
        y = n(112),
        w = r(y),
        C = n(199),
        E = "_im_spam_not_spam",
        k = "_im_spam_spam"
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
    }

    function a(e) {
        return e.selection = [], Promise.resolve(e)
    }

    function i(e, t) {
        return t.selection = t.selection.filter(function(t) {
            return t.id !== e
        }), Promise.resolve(t)
    }

    function o(e, t, n, r, a, o, s) {
        var l = intval(domData(s, "peer"));
        tooltips.hide(s), t.set(i.bind(null, l)).then(function(i) {
            c(e, r, t, a), n().selectionDeleted(t, l)
        })
    }

    function s(e) {
        var t = 0;
        return function() {
            var n = e.offsetWidth;
            setStyle(e, {
                width: 1
            });
            var r = e.offsetLeft;
            return t === r ? void setStyle(e, {
                width: n
            }) : (t = r, n = e.parentNode.offsetWidth, void setStyle(e, {
                width: Math.max(30, n - r - 20)
            }))
        }
    }

    function l(e, t, n, r) {
        e.set(p.setCurrentSearch.bind(null, n, !1)).then(t().onChange)
    }

    function u(e, t, n, r) {
        e.set(a).then(c.bind(null, t, n, e, r))
    }

    function c(e, t, n, r) {
        var a = n.get().selection,
            i = uiSearch.getFieldEl(e);
        uiSearch.focus(e), a.length > 0 ? attr(i, "placeholder", "") : attr(i, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = a.map(function(e) {
            return '<div class="token">\n      <div class="token_title">' + e.name + '</div>\n      <div data-peer="' + e.id + '" class="token_del ' + g + '"></div>\n    </div>'
        }).join(""), toggleClass(e, "ui_multiselect_has_selection", a.length > 0), domFC(e).scrollTop += 50, r()
    }

    function d(e, t) {
        return showTooltip(t, {
            text: getLang("mail_create_chat_remove_user"),
            black: 1,
            shift: [15, 8],
            appendParentCls: "_wrap"
        })
    }

    function f(e, t, n) {
        uiSearch.init(e, {
            onChange: l.bind(null, t, n)
        });
        var f = uiSearch.getFieldEl(e),
            p = ce("div", {
                className: "_ui_multiselection ui_multiselect_cnt"
            });
        f && f.parentNode.insertBefore(p, f);
        var h = s(f);
        t.set(a);
        var _ = o.bind(null, e, t, n, p, h),
            v = function(t) {
                document.activeElement !== f && uiSearch.focus(e)
            },
            b = (0, m.createModule)({
                handlers: function(t, n) {
                    n(e, "click", g, _), n(e, "mouseover", g, d), t(e, "click", v)
                }
            });
        return {
            addSelection: function(n, a) {
                return t.set(r.bind(null, {
                    id: n,
                    name: a
                })).then(c.bind(null, e, p, t, h))
            },
            removeSelection: function(n) {
                return t.set(i.bind(null, n)).then(c.bind(null, e, p, t, h))
            },
            resetSelection: function() {
                u(t, e, p, h)
            },
            focus: function() {
                uiSearch.focus(e)
            },
            save: function() {
                t.stash(), c(e, p, t, h)
            },
            restore: function() {
                t.pop(), c(e, p, t, h)
            },
            unmount: function() {
                uiSearch.destroy(e), (0, m.destroyModule)(b)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = f;
    var p = n(28),
        m = n(198),
        g = "_ui_multiselect_cancel"
}, function(e, t) {
    function n() {
        throw new Error("setTimeout has not been defined")
    }

    function r() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(e) {
        if (c === setTimeout) return setTimeout(e, 0);
        if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0);
        try {
            return c(e, 0)
        } catch (t) {
            try {
                return c.call(null, e, 0)
            } catch (t) {
                return c.call(this, e, 0)
            }
        }
    }

    function i(e) {
        if (d === clearTimeout) return clearTimeout(e);
        if ((d === r || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
        try {
            return d(e)
        } catch (t) {
            try {
                return d.call(null, e)
            } catch (t) {
                return d.call(this, e)
            }
        }
    }

    function o() {
        g && p && (g = !1, p.length ? m = p.concat(m) : h = -1, m.length && s())
    }

    function s() {
        if (!g) {
            var e = a(o);
            g = !0;
            for (var t = m.length; t;) {
                for (p = m, m = []; ++h < t;) p && p[h].run();
                h = -1, t = m.length
            }
            p = null, g = !1, i(e)
        }
    }

    function l(e, t) {
        this.fun = e, this.array = t
    }

    function u() {}
    var c, d, f = e.exports = {};
    ! function() {
        try {
            c = "function" == typeof setTimeout ? setTimeout : n
        } catch (e) {
            c = n
        }
        try {
            d = "function" == typeof clearTimeout ? clearTimeout : r
        } catch (e) {
            d = r
        }
    }();
    var p, m = [],
        g = !1,
        h = -1;
    f.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        m.push(new l(e, t)), 1 !== m.length || g || a(s)
    }, l.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, f.listeners = function(e) {
        return []
    }, f.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, f.cwd = function() {
        return "/"
    }, f.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, f.umask = function() {
        return 0
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e ? e.ownerDocument || e : document,
            n = t.defaultView || window;
        return !(!e || !("function" == typeof n.Node ? e instanceof n.Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
    }
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return "im_store_" + e
    }

    function a(e) {
        return ls.get(r(e)) || {}
    }

    function i(e, t, n) {
        if (ls.checkVersion()) {
            var a = JSON.stringify(t);
            rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", a.length), n(r(e), a)
        }
    }

    function o(e, t, n) {
        return t === f ? e[t] || [] : t === p ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
    }

    function s(e, t, n) {
        switch (e[t] || (e[t] = {}), t) {
            case f:
                var r = n;
                r && r.length > 0 ? e[t] = r : delete e[t];
                break;
            case p:
                var a = d(n, 2),
                    i = a[0],
                    o = a[1];
                o ? e[t][i] = +o : delete e[t][i]
        }
        return e
    }

    function l(e, t) {
        for (var n = ["fwd", "draft", "bind_attach"], r = a(e), o = !1, s = n.length; s--;) n[s] in r && (delete r[n[s]], o = !0);
        o && i(e, r, t)
    }

    function u(e, t, n) {
        n.key === r(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
    }

    function c(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        ls.checkVersion() && l(e, t);
        var n = {
                db: a(e),
                checkTime: Date.now()
            },
            r = u.bind(null, e, n);
        return window.addEventListener("storage", r, !1), {
            select: function(t, r) {
                return Date.now() - n.checkTime > 1e3 && (n.db = a(e)), o(n.db, t, r)
            },
            selectByKey: function(t) {
                return Date.now() - n.checkTime > 1e3 && (n.db = a(e)), n.db[t]
            },
            update: function(r, a) {
                var o = s(n.db, r, a);
                return n.db = o, n.checkTime = Date.now(), i(e, o, t)
            },
            updateByKey: function(r, a) {
                return n.db[r] = a, n.checkTime = Date.now(), i(e, n.db, t)
            },
            unmount: function() {
                window.removeEventListener("storage", r, !1)
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
            } catch (l) {
                a = !0, i = l
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
    t.deleteOldStoredFormat = l, t.mount = c;
    var f = t.RECENT_SEARCH_OP = "recent_search",
        p = t.PIN_HIDDEN_ID_OP = "pin_hide"
}, function(e, t, n) {
    e.exports = n(64).document && document.documentElement
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        return t.queues[e].currEv = !1, Promise.resolve(t)
    }

    function i(e, t) {
        var n = t.queues[e].currEv;
        return n ? (t.queues[e].errored.push(n), a(e, t)) : Promise.resolve(t)
    }

    function o(e) {
        for (var t = {}, n = Object.keys(e.queues), r = n.length, a = 0; r > a; a++) {
            var i = n[a],
                o = e.queues[i];
            (o.currEv || o.evs.length || o.errored.length) && (t[i] = o)
        }
        return {
            queues: t,
            opts: e.opts
        }
    }

    function s(e, t, n) {
        return n.queues[e] ? (t ? n.queues[e].errored = [] : n.queues[e].errored = n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], a(e, n)) : Promise.resolve(n)
    }

    function l(e, t) {
        var n = f(e, t.get()).errored;
        return n.length > 0 ? n[n.length - 1] : !1
    }

    function u(e, t, n, r) {
        var o = r.get().queues[e];
        if (o && !o.currEv && o.evs.length > 0 && !o.pause) {
            var s = u.bind(null, e, t, n, r),
                c = o.evs.shift();
            o.currEv = c, t(e, c).then(function() {
                r.get().opts.waitCommit || r.set(a.bind(null, e))
            }).then(s)["catch"](function(t) {
                return r.set(i.bind(null, e)).then(function() {
                    n(e, l(e, r), t)
                }).then(s)
            })
        }
    }

    function c(e, t, n) {
        var r = n.queues[e];
        return r.errored.filter(function(e) {
            return e.mess.messageId === t
        }).forEach(function(e) {
            e.failed = !1, r.evs.push(e)
        }), r.errored = r.errored.filter(function(e) {
            return e.mess.messageId !== t
        }), Promise.resolve(n)
    }

    function d() {
        return {
            evs: [],
            pause: !1,
            errored: [],
            currEv: !1
        }
    }

    function f(e, t) {
        return t.queues[e] || (t.queues[e] = d()), t.queues[e]
    }

    function p(e, t, n) {
        var r = f(e, n);
        return r.pause = t, Promise.resolve(n)
    }

    function m(e, t, n) {
        t.ts = Date.now();
        var r = f(e, n);
        return r.evs.push(t), Promise.resolve(n)
    }

    function g(e) {
        var t = Object.keys(e.get().queues);
        t.forEach(function(t) {
            e.set(i.bind(null, t)), e.set(s.bind(null, t, !1))
        })
    }

    function h(e, t, n) {
        var r = (0, v["default"])({
            queues: {},
            debug: n && n.debug,
            opts: extend({}, n)
        }, n);
        return n && n.store ? (r.setState(o(r.get())), g(r)) : g(r), {
            pushMessage: function(n, a) {
                return r.set(m.bind(null, n, a)).then(function(r) {
                    u(n, e, t, r)
                })
            },
            resend: function(n, a) {
                return r.set(c.bind(null, n, a)).then(function(i) {
                    var o = r.get().queues[n].evs.filter(function(e) {
                        return e.mess.messageId === a
                    })[0];
                    return u(n, e, t, r), o
                })
            },
            reset: function(n) {
                return r.set(s.bind(null, n, !0)).then(function(r) {
                    u(n, e, t, r)
                })
            },
            setErrored: function(e, t) {
                return r.set(function(n) {
                    var r = f(e, n);
                    return r.errored = t, Promise.resolve(n)
                })
            },
            pause: function(e) {
                r.set(p.bind(null, e, !0))
            },
            isPaused: function(e) {
                return !!f(e, r.get()).pause
            },
            complete: function(n, i) {
                var o = r.get();
                o.queues[n].currEv && o.queues[n].currEv.rid === i && r.set(a.bind(null, n)).then(function() {
                    u(n, e, t, r)
                })
            },
            resume: function(n) {
                r.set(p.bind(null, n, !1)).then((0, b.pause)(.1)).then(function() {
                    u(n, e, t, r)
                })
            },
            inspectQueue: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                if (!r.get().queues[e]) return [];
                var n = r.get().queues[e],
                    a = t && n.currEv ? [n.currEv] : [];
                return a.concat(n.evs.slice()).concat(n.errored.slice().map(function(e) {
                    return extend({}, e, {
                        failed: !0
                    })
                })).sort(function(e, t) {
                    return e.ts - t.ts
                })
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initQueue = h;
    var _ = n(112),
        v = r(_),
        b = n(130)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t) {
        return e ? void(window.tooltips && tooltips.hide(e, t)) : !1
    }

    function i(e) {
        return e.map(function(e) {
            return {
                id: e[1],
                type: e[0],
                kind: e[2] || null
            }
        })
    }

    function o(e, t, n, r, a, o) {
        var s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !0;
        if (I(t, r)) return Promise.resolve(!1);
        f(r).getBoundAttach(n.message) && (n.message = ""), n.share_url = f(r).getShareUrl();
        var l = (0, q.random)(),
            u = {
                peerId: t,
                messageId: "rid" + l,
                flags: F.FLAG_OUTBOUND,
                date: intval(Date.now() / 1e3) - r.get().timeshift,
                subject: "",
                text: (0, z.replaceSpecialSymbols)(clean(n.message)).replace(/\n/gi, "<br>"),
                local: !0,
                kludges: {
                    emoji: !0,
                    from_admin: r.get().gid ? vk.id : null
                },
                type: F.ADD_MESSAGE,
                attaches: i(n.attaches)
            };
        return n.rid = l, n.mess = u, e(t, n), r.get().longpoll.push([u]), s && o().clearText(t, r), a().newMessage(r), Promise.resolve(!0)
    }

    function s(e, t, n, r, a, i, s) {
        var u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : !1;
        u || (u = e.get().peer);
        var c = {
            message: "",
            attaches: i
        };
        s && extend(c, s), l(e, t, !1).then(function(a) {
            return o(n, u, c, e, t, r, !1)
        })["catch"](function(t) {
            debugLog(t), d(e, a)
        })
    }

    function l(e, t, n) {
        var r = e.get().tabs[e.get().peer];
        return r.skipped > 0 ? (t().loadingPeer(e), e.setState({
            no_moving_down: !0
        }), e.set(U.changePeer.bind(null, e.get().peer, !1, !1)).then(function() {
            return e.set(U.loadPeer.bind(null, e.get().peer, !0, -1, !1))
        }).then(function() {
            return t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n
        })) : Promise.resolve(n)
    }

    function u(e, t, n) {
        var r = !!intval(domData(n, "val"));
        r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(U.changeSubmitSettings.bind(null, r)))
    }

    function c(e, t, n) {
        return e.get().delayed_ts ? !1 : setTimeout(function() {
            e.set(U.setDelayedMessage.bind(null, !1, !1)).then(function() {
                p.apply(void 0, n)
            })
        }, t)
    }

    function d(e, t) {
        document.activeElement && document.activeElement.blur(), showFastBox({
            title: getLang("global_error")
        }, getLang("mail_send_error"), getLang("mail_ok"), function() {
            nav.reload({
                force: !0
            })
        });
        var n = geByClass1("_im_send", t);
        return e.set(U.toggleSendingAbility.bind(null, !0)).then(function() {
            (0, z.lockButton)(n)
        })
    }

    function f(e) {
        var t = e.get().tfdraft;
        return t || new $.ImDraft
    }

    function p(e, t, n, r, a, i) {
        var s = arguments,
            u = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
        return Promise.resolve().then(function() {
            var i = geByClass1("_im_send", r);
            if (!(0, G.isSendingAvailable)(e)) return !1;
            if ((0, U.isAnythingLoading)(e.get()) || !(0, z.isFullyLoadedTab)(e, e.get().peer)) {
                var d = c(e, de, (0, W.toArray)(s));
                return e.set(U.setDelayedMessage.bind(null, !0, d)).then(function() {
                    (0, z.lockButton)(i)
                })
            }
            clearTimeout(e.get().delayed_ts), a().saveText(e);
            var p = e.set(U.setDelayedMessage.bind(null, !1, !1)).then(function() {
                    (0, z.unlockButton)(i)
                }),
                g = (0, G.getPeer)(e);
            return p.then(l.bind(null, e, t)).then(function() {
                var i = f(e),
                    s = i.dData.attaches.map(function(e) {
                        return [e.type, e.id]
                    }).concat(u),
                    l = i.dData.txt,
                    c = t().getEditingMessage();
                if (c || l || s.length) {
                    if (c) return l || s.length ? (0, z.isMessageTooLong)(l) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void((0, Q.wasMessageReallyModified)(e, c, i) && ((0, Q.replaceMsgAfterEdit)(e, c, l, s, i.getShareUrl()), t().sendEditMessage(e, c), e.get().longpoll.push([(0, B.editMessageLocallyEvent)(c)])))) : void m(e, t, r, c.messageId);
                    var d = (0, z.splitMessageToParts)(l, s),
                        p = d.map(function(r) {
                            return o(n, g, {
                                message: r.msgText || "",
                                attaches: r.attaches || []
                            }, e, t, a)
                        });
                    return Promise.all(p)
                }
            })
        })["catch"](function(t) {
            debugLog(t), d(e, r)
        })
    }

    function m(e, t, n, r) {
        var a = e.get(),
            i = a.peer,
            o = showFastBox({
                title: getLang("mail_dialog_msg_delete_title"),
                dark: 1
            }, getLang("mail_dialog_msg_delete_for_all"), getLang("mail_delete"), function(n) {
                (0, U.removeMessageSend)([r], i, (0, G.getTab)(e, i).hash, "deleteforall", a.gid), o.hide(), t().cancelEditing()
            }, getLang("global_cancel"), function() {
                o.hide(), w(geByClass1("_im_text", n))
            })
    }

    function g(e, t, n) {
        return e.set(U.deliverMessage.bind(null, t, n))
    }

    function h(e, t, n, r) {
        e.get().longpoll.push([F.failedMessage(t, n.mess, r)])
    }

    function _(e, t, n, r, a, i, o) {
        function s(n, r) {
            var a = e.get().peer,
                i = Emoji.val(r);
            (0, z.isReservedPeer)(a) || I(a, e) || f(e).dData.txt == i || !i || P(e), N(e, t, i), u(r);
            var s = t.offsetHeight;
            if (l && l !== s) {
                var c = o().updateScroll();
                o().scrollFix(e, e.get().peer, c)
            }
            l = s
        }
        var l = void 0,
            u = debounce(M.bind(null, e, n), 500),
            c = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                ref: "im",
                onSend: function() {
                    return r([])
                },
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: s,
                onStickerSend: function(e, t, n) {
                    return a([
                        ["sticker", e, n]
                    ], {
                        sticker_referrer: t
                    })
                },
                uploadActions: i
            });
        return Emoji.emojiLoadMore(c), e.setState({
            emojiOptId: c
        }), c
    }

    function v(e, t) {
        var n = geByClass1("_im_text", e);
        Wall.initComposer(n, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            toup: !0,
            getValue: function() {
                return t.get().peer > 2e9 ? (window.Emoji && Emoji.editableVal || val)(n) : ""
            },
            onShow: function() {
                addClass(e, "im_mention_shown");
                var t = data(n, "composer");
                if (t && t.wdd && t.wdd.shown) {
                    var r = 0,
                        a = !1,
                        i = function() {
                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                        };
                    each(t.wdd.shown, function() {
                        this[0] && (r++, "@" + t.curTerm == this[2] && (a = !0))
                    }), !r || a && 1 == r ? i() : cancelStackPush("im_mention", i)
                }
            },
            onHide: function() {
                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
            },
            searchKeys: [1, 7],
            wddOpts: {}
        })
    }

    function b(e, t, n, r, a, i, o, s, l) {
        if (!t.get().removingMedias) {
            if ("album" === a || "page" === a || "mail" === a) return !1;
            if ("share" === a && !o.title) return !1;
            show(_e), i && "string" == typeof a ? (s && f(t).addBindUrl(s, a, i), f(t).addAttach(a, i, o)) : f(t).syncWithSelector(l);
            var u = e().updateScroll();
            return e().scrollFix(t, t.get().peer, u), t.get().delayed_message && !(0, U.isAnythingLoading)(t.get()) ? (n([]), !1) : void N(t, r)
        }
    }

    function y(e, t, n) {
        var r = Emoji.val(geByClass1("_im_text", t));
        (0, G.isAnyMessageBeingEdited)(e) && "" !== r || x(e, t).then(function(t) {
            var a = intval(domData(n.target, "tttype"));
            if ((2 === a && t !== !0 || 1 === a && t === !0 || 3 !== a && "" === r) && window.tooltips && tooltips.destroy(n.target, {
                    fasthide: !0
                }), (0, G.isAnyMessageBeingEdited)(e) && "" === r) return domData(n.target, "tttype", 3), showTooltip(n.target, {
                text: getLang("mail_delete_for_all"),
                black: !0,
                force: 3 !== a,
                appendParentCls: "_im_chat_input_parent",
                shift: [-8, -10]
            });
            if (t !== !0) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                text: getLang("mail_added_audiomsg"),
                black: !0,
                force: 1 !== a,
                appendParentCls: "_im_chat_input_parent",
                shift: [-8, -10]
            });
            domData(n.target, "tttype", 2);
            var i = e.get().ctrl_submit ? 1 : 0;
            return showTooltip(n.target, {
                text: getTemplate("ctrl_submit_hint", {
                    enter_on: i ? "" : "on",
                    ctrl_on: i ? "on" : ""
                }),
                dir: "down",
                shift: [-28, -5],
                needLeft: !0,
                className: "im-chat-input--tt",
                hasover: !0,
                force: 2 !== a,
                showdt: 700,
                zIndex: 200,
                hidedt: 700,
                appendParentCls: "_im_chat_input_parent",
                onCreate: function() {
                    radioBtns.im_submit = {
                        els: (0, W.toArray)(geByClass(he)),
                        val: i
                    }
                }
            })
        })
    }

    function w(e) {
        Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
    }

    function C(e, t) {
        Emoji.val(e, clean(t)), w(e)
    }

    function E(e, t, n) {
        var r = e.getFwdRaw(),
            a = geByClass1(pe, t);
        if (r)
            if (r.object && r.object.authorName) {
                var i = r.object,
                    o = (0, z.renderShortText)(0, "", i.text, !0, (0, $.convertKludgesToAttaches)(i.kludges, 0));
                a.innerHTML = getTemplate("im_attach_mess", {
                    messages: o,
                    text: i.authorName,
                    date: getSmDate(i.date, n.get().timeshift),
                    modifier: "im-fwd_msg"
                })
            } else a.innerHTML = getTemplate("im_attach_mess", {
                messages: getLang("mail_title_X_msgs", e.getFwdCount()),
                text: getLang("mail_im_fwd_msgs_title"),
                date: "",
                modifier: ""
            });
        else a.innerHTML = ""
    }

    function k(e, t, n) {
        e.set(U.forwardMessages.bind(null, null, f(e))).then(function() {
            var r = geByClass1(pe, t);
            if (r && r.children.length) {
                r.innerHTML = "";
                var a = n().updateScroll();
                n().scrollFix(e, e.get().peer, a)
            }
            N(e, t)
        })
    }

    function S(e, t, n, r, a, i, o, s, l, u) {
        return {
            restoreDraft: function(e, a) {
                t.chosenMedias.length > 0 && (e.setState({
                    removingMedias: !0
                }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                    removingMedias: !1
                }));
                var o = e.get().peer,
                    s = (0, z.isUserPeer)(o) && o != vk.id && !e.get().gid,
                    l = (0, z.isUserPeer)(o) && o != vk.id && !e.get().gid && !inArray(o, e.get().moneyTransferExcept) || (0, z.isCommunityPeer)(o) && e.get().moneyTransferCommAvail && (0, G.getCurrentTab)(e).moneyTransferAvail && !e.get().gid || e.get().gid && e.get().moneyRequestAvail || (0, z.isChatPeer)(o) && (0, G.getCurrentTab)(e).moneyRequestAvail;
                if (toggle(geByClass1("ms_item_gift", r), s && !(0, G.isAnyMessageBeingEdited)(e)), toggle(geByClass1("ms_item_money", r), l && !(0, G.isAnyMessageBeingEdited)(e)), (0, z.isReservedPeer)(o)) return Promise.resolve();
                var u = f(e);
                return Emoji.val(n) !== u.dData.txt ? C(n, u.dData.txt) : w(n), u.prepareObjects(e.get().gid, a && a.messageId).then(function() {
                    var a = A(e, o, n);
                    if (!a && o == e.get().peer) {
                        for (var s = u.dData.attaches, l = 0; l < s.length; l++) t.chooseMedia(s[l].type, s[l].id, s[l].object || {});
                        E(u, r, e);
                        var c = i().updateScroll();
                        i().scrollFix(e, o, c), N(e, r, u.dData.txt)
                    }
                })
            },
            sendMessage: function() {
                a([])
            },
            choose: function(e, n, r) {
                t.chooseMedia(e, n, r)
            },
            canAddMedia: function() {
                return !t.hasRestrictingAttach()
            },
            isEmpty: function(e) {
                return !trim(Emoji.val(n)) && !f(e).hasAttaches()
            },
            unchoose: function(e) {
                t.unchooseMedia(e)
            },
            attachCount: function() {
                return t.attachCount()
            },
            progress: function(e, n, r) {
                show(_e), t.showMediaProgress(e, n, r)
            },
            updateState: function(e) {
                A(e, e.get().peer, n)
            },
            focusOn: function(e) {
                Emoji.editableFocus(n, !1, !0)
            },
            setDraft: function(e, t) {
                e.setState({
                    tfdraft: t
                }), t && this.restoreDraft(e, i().getEditingMessage())
            },
            clearText: function(e, a) {
                f(a).clear(), t.cancelCheckUrl(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), k(a, r, i);
                var o = i().updateScroll();
                i().scrollFix(a, a.get().peer, o)
            },
            attachMessages: function(e, t) {
                if (e.get().peer === t) {
                    E(f(e), r, e);
                    var n = i().updateScroll();
                    i().scrollFix(e, t, n), N(e, r)
                }
            },
            cancelRecording: function() {
                u.cancelRecording()
            },
            reHeight: function(e) {
                var t = i().updateScroll();
                i().scrollFix(e, e.get().peer, t)
            },
            isBlocked: function() {
                return I(e.get().peer, e)
            },
            toggleStickers: function(e, t) {
                Emoji.toggleStickers(e.get().emojiOptId, !t)
            },
            saveText: function(e) {
                f(e).setText(Emoji.val(geByClass1("_im_text", r)))
            },
            unmount: function() {
                (0, K.destroyModule)(l), t.destroy(), s.unmount(), Emoji.destroy(e.get().emojiOptId), u.unmount()
            }
        }
    }

    function T(e, t) {
        return (0, z.isChatPeer)(e) ? t.get().tabs[e].data.kicked : !1
    }

    function I(e, t) {
        return T(e, t) || (0, G.getTab)(t, e) && (0, G.getTab)(t, e).block_error > 0 || (0, z.isLocksAvailable)(t) && (0, z.isPeerBlocked)(e, t)
    }

    function M(e, t, n) {
        var r = e.get().peer,
            a = Emoji.val(n);
        (0, z.isReservedPeer)(r) || f(e).dData.txt == a || I(r, e) || (t.checkMessageURLs(a, !0, de), f(e).setText(a))
    }

    function P(e) {
        var t = e.get().peer;
        (0, z.isFullyLoadedTab)(e, t) && !(0, G.isAnyMessageBeingEdited)(e) && Date.now() - ((0, G.getTab)(e, t).lastTyping || 0) > 1e3 * U.TYPING_PERIOD && e.set(U.sendTyping.bind(null, t))
    }

    function L(e) {
        var t = f(e).getFwdRaw();
        t && window.showForwardBox({
            act: "a_show_forward_box",
            will_fwd: t.id,
            gid: e.get().gid
        })
    }

    function O(e, t, n) {
        switch (n.block_error) {
            case te:
            case J:
                return getLang("mail_peer_deleted");
            case oe:
                return getLang("mail_community_deleted");
            case re:
                return getLang("mail_group_banned_messages");
            case Z:
            case ee:
            case ne:
            case le:
            case ue:
            case ie:
                return (0, z.isCommunityPeer)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
            case ce:
                var r = (0, X.oCacheGet)(e, t);
                return langSex(r.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", r.kick_name);
            case ae:
                return getLang("mail_cant_send_messages_to_community");
            case se:
                return getLang("mail_chat_youre_kicked");
            case 0:
                if (T(t, e)) return getLang("mail_chat_youre_kicked");
                var a = e.get().block_states[t].name;
                return getLang("mail_community_answering").replace("{username}", a);
            default:
                return getLang("mail_send_privacy_error")
        }
    }

    function A(e, t, n) {
        var r = gpeByClass("_im_chat_input_parent", n),
            a = geByClass1("_im_chat_input_error", r);
        if (I(t, e)) {
            n.disabled = !0;
            var i = O(e, t, (0, G.getTab)(e, t));
            return addClass(n, "im-chat-input--text_disabled"), addClass(r, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked"), n.contentEditable = "false", val(a, i), !0
        }
        return n.disabled && (n.disabled = !1, removeClass(r, "im-chat-input_error"), n.contentEditable = "true", removeClass(n, "im-chat-input--text_disabled"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked"), val(a, "")), !1
    }

    function x(e, t, n) {
        return (0, z.isVoiceMessageAvailable)(e).then(function(r) {
            if (!r && !(0, G.isAnyMessageBeingEdited)(e)) return !0;
            var a = null != n ? n : Emoji.val(geByClass1("_im_text", t));
            return trim(a) ? (0, G.isAnyMessageBeingEdited)(e) ? !(0, z.isMessageTooLong)(a) : !0 : f(e).hasAttaches()
        })
    }

    function N(e, t, n) {
        var r = geByClass1("_im_send", t.parentNode);
        a(r, {
            fasthide: !0
        }), x(e, t, n).then(function(t) {
            if ((0, G.isAnyMessageBeingEdited)(e)) toggleClass(r, "is_input_empty", !t), attr(r, "aria-label", getLang("mail_im_edit"));
            else {
                toggleClass(r, "im-send-btn_audio", !t), toggleClass(r, "im-send-btn_send", t), t && removeClass(r, "im-send-btn_saudio");
                var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                attr(r, "aria-label", n)
            }
        })
    }

    function D(e) {
        var t = ge(_e),
            n = t.offsetHeight;
        toggleClass(e, "im-chat-input--overflowed", n > 400)
    }

    function R(e, t, n, r) {
        if (38 === r.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !(0, U.isAnythingLoading)(e.get())) {
            var a = (0, Q.findLastMessageToEdit)(e, (0, G.getCurrentTab)(e));
            a && t().startEditing((0, G.getMessage)(e, e.get().peer, a))
        }
    }

    function j(e, t, n) {
        cur.share_timehash = t.get().share_timehash;
        var r = (0, K.createMutations)(S),
            i = r.callMutations,
            o = r.bindMutations,
            l = (0, Y.mount)(e, t, i),
            c = g.bind(null, t);
        ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
        var d = (0, V.initQueue)(c, h.bind(null, t), {
                store: "ls",
                key: "im_send_queue_" + vk.id,
                waitCommit: !0
            }),
            f = d.pushMessage,
            m = d.inspectQueue,
            w = d.resend,
            C = d.setErrored,
            E = d.complete,
            T = s.bind(null, t, n, f, i, e),
            I = L.bind(null, t);
        hide(geByClass1("ms_items_more_helper", e));
        var M = [
            ["video", getLang("profile_wall_video")],
            ["audio", getLang("profile_wall_audio")],
            ["doc", getLang("profile_wall_doc")],
            ["map", getLang("profile_wall_map")],
            ["gift", getLang("profile_wall_gift")]
        ];
        (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && M.push(["money", getLang("profile_wall_money")]), M.unshift(["photo", getLang("mail_added_photo")]);
        var P = new MediaSelector(geByClass1(fe, e), _e, M, {
                maxShown: 0,
                vectorIcon: !0,
                ignoreMobile: !0,
                onAddMediaChange: function(r, a, i, o) {
                    return b(n, t, O, e, r, a, i, o, P)
                },
                editable: 1,
                onChangedSize: function() {
                    var r = n().updateScroll();
                    n().scrollFix(t, t.get().peer, r), D(e)
                },
                sortable: 1,
                teWidth: 150,
                mail: 1,
                teHeight: 100,
                forceToUp: !0,
                toId: t.get().gid ? -t.get().gid : void 0,
                blockPersonal: t.get().gid ? 1 : 0,
                docParams: t.get().gid ? {
                    imhash: t.get().upload_doc_opts.opts.imhash,
                    from: "from_gim"
                } : {}
            }),
            O = p.bind(null, t, n, f, e, i, P),
            A = y.bind(null, t, e),
            N = geByClass1("_im_send", e),
            j = s.bind(null, t, n, f, i, e),
            B = (0, H.mount)(e, t, j, function() {
                addClass(N, "im-send-btn_audio"), removeClass(N, "im-send-btn_static")
            });
        v(e, t), t.get().textMediaSelector = P, t.set(U.initTextStore.bind(null, m, w, C, E));
        var z = geByClass1("_im_text", e);
        setTimeout(function() {
            (0, G.getPeer)(t) && i().setDraft(t, (0, G.getTabDraft)((0, G.getCurrentTab)(t))), _(t, e, P, O, T, l, n)
        }, 0);
        var q = k.bind(null, t, e, n),
            W = u.bind(null, t),
            Q = (0, K.createModule)({
                handlers: function(r, o) {
                    r(N, "click", function() {
                        x(t, e).then(function(e) {
                            e || (0, G.isAnyMessageBeingEdited)(t) ? O([]) : (a(N, {
                                fasthide: !0
                            }), B.start(), setTimeout(function() {
                                return removeClass(N, "im-send-btn_saudio")
                            }, 300))
                        })
                    }), r(N, "mouseover", A), r(z, "focus", function() {
                        t.get().longpoll.push([F.transitionEvent("message")]), cur.focused = t.get().peer
                    }), r(z, "blur", function() {
                        var e = 0 === t.get().peer ? "search" : "default";
                        t.get().longpoll.push([F.transitionEvent(e)]), cur.focused = !1
                    }), o(e, "click", me, q), o(e, "click", "_im_will_fwd", I), o(e, "keydown", "_im_text", function(e) {
                        return R(t, n, i, e)
                    }), o(bodyNode, "click", he, W)
                }
            });
        return o(t, P, z, e, O, n, m, l, Q, B)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = j;
    var B = n(199),
        F = r(B),
        H = n(72),
        U = n(28),
        z = n(88),
        G = n(190),
        V = n(152),
        q = n(209),
        W = n(23),
        K = n(198),
        Y = n(118),
        Q = n(210),
        $ = n(187),
        X = n(121),
        Z = 4,
        J = 5,
        ee = 6,
        te = 7,
        ne = 9,
        re = 11,
        ae = 12,
        ie = 13,
        oe = 14,
        se = 16,
        le = 19,
        ue = 20,
        ce = 23,
        de = 2e3,
        fe = "_im_media_selector",
        pe = "_im_media_fwd",
        me = "_im_fwd_close",
        he = "_im_submit_btn",
        _e = "_im_media_preview"
}, function(e, t, n) {
    var r = n(53),
        a = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? a(e + t, 0) : i(e, t)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(64),
        a = n(128),
        i = n(131),
        o = n(61)("species");
    e.exports = function(e) {
        var t = r[e];
        i && t && !t[o] && a.f(t, o, {
            configurable: !0,
            get: function() {
                return this
            }
        })
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
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e, t, n) {
        removeClass(t.parentNode, "im-page--dialogs_with-mess");
        var r = n.getCurrentElements().filter(function(e) {
            return e.message
        });
        n.toTop(), n.reset(), (0, ae.statlogsProbValueEvent)(.01, "im_search_stat", 1, "search_messages_only"), r.length > 0 ? (r = [{
            type: "sep_messages"
        }].concat(r), e.setState({
            searchOnlyMessages: !0
        })) : r = [P()], n.pipeReplace(Promise.resolve(r))
    }

    function o(e) {
        return hasClass(e, "_im_search")
    }

    function s(e, t, n, r) {
        if ((0, Y.isSearching)(e) && e.get().searchAllLoaded || (0, Y.isRecentSearchesActive)(e)) return Promise.resolve([]);
        if (e.get().dialog_search_going || (0, K.isClassicInterface)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
        if ((0, Y.isSearching)(e)) return (0, W.searchMessages)((0, Y.getSearchText)(e), e.get()).then(function(e) {
            var t = q(e, 2),
                n = t[0],
                r = t[1];
            return M(r, n)
        });
        var a = e.get().active_tab,
            i = e.get().dialog_tabs_all;
        return i[$.FOLDER_ALL] && !(0, K.isReversedDialogs)(e) || i[a] ? 0 === z(e).length ? Promise.resolve([{
            type: "empty_dialogs"
        }]) : Promise.resolve([]) : e.set(W.loadDialogs).then(function(t) {
            var n = z(e);
            return 0 === n.length ? [{
                type: "empty_dialogs"
            }] : n
        })
    }

    function l(e, t, n, r, a) {
        if (!gpeByClass("_im_peer_target", r.target)) {
            var i = t.get(),
                s = o(a),
                l = parseInt(domData(a, "peer"), 10),
                u = parseInt(domData(a, "msgid"), 10),
                c = "";
            (0, Y.isSearching)(t) && (c = "conversations_search"), (0, Y.isRecentSearchesActive)(t) && (c = "recent_searches"), hasClass(a, "_im_sugg_" + l) && (c = "popular_suggestions"), s && (c = "message_search");
            var d = (0, Y.getTab)(t, l);
            if (checkEvent(r)) return window.open(_(t, d, u, s));
            if (n.saveScroll("list"), s && i.msgid !== u) i.longpoll.push([te.changePeer(l, u, !1, !1, c)]);
            else if (l !== i.peer) {
                i.longpoll.push([te.changePeer(l, !1, !0, !0, c)]);
                var f = (0, Y.isSearching)(t);
                f && !hasClass(a, "_dont_add_recent") && (0, W.saveRecentSearchPeer)(l, cur.imDb), f && d && !(0, K.isClassicInterface)(t) && setTimeout(function() {
                    var e = d.message ? d.message.messageId : d.peerId;
                    n.scrollToElement(e.toString(), !0, 0, "center")
                }, 100)
            } else l === i.peer && (i.pendingForward ? i.longpoll.push([te.changePeer(l, !1, !0, !s, c)]) : e().goToHistoryEnd());
            cancelEvent(r)
        }
    }

    function u(e, t, n, r) {
        var a = void 0;
        !(0, K.isChatPeer)(t) || "string" == typeof n.photo && "" !== n.photo ? (a = '<img src="' + n.photo + '" alt="">', r && (a = getTemplate("im_dialogs_link_img", {
            href: n.href,
            photo: a
        }))) : a = (0, K.renderPhotosFromTab)(e, n, !r);
        var i = '<span class="_im_dialog_link">' + n.tab + "</span>";
        return {
            photo: a,
            userLink: i
        }
    }

    function c(e) {
        return !(0, K.isPendingForward)(e)
    }

    function d(e, t, n) {
        return n ? getTemplate("im_img_prebody", {
            photo: t
        }) : e + ":"
    }

    function f(e, t, n, r, a, i, o, s, l, u) {
        var c = "",
            f = "";
        return t & te.FLAG_OUTBOUND ? c = d(getLang("mail_by_you"), u, l) : (0, K.isChatPeer)(n) && 0 !== r && (c = d((0, ie.oCacheGet)(e, r).first_name, (0, ie.oCacheGet)(e, r).photo, l)), o = (0, K.renderShortText)(n, s, o, a, i), f = c ? getTemplate("im_drow_prebody", {
            prebody: c,
            body: o
        }) : o
    }

    function p(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            i = [];
        return (0, K.isClassicInterface)(r) && i.push("nim-dialog_classic"), (0, Y.isRecentSearchesActive)(r) && i.push("nim-dialog_recent"), i.push("nim-dialog_empty"), a.search && i.push("_im_search"), getTemplate("im_drow", {
            peer: e.peerId,
            msg_id: "",
            photo: t,
            user_link: n,
            date: "",
            body: "",
            unread: "",
            more: i.join(" "),
            is_star: "",
            unread_message_string: "",
            is_online: onlinePlatformClass(e.online),
            is_unread: "",
            is_unread_out: "",
            is_selected: e.peerId == r.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
        })
    }

    function m(e, t, n) {
        return n & te.FLAG_OUTBOUND ? (0, K.isSelfMessage)(t.peerId, e.get().gid) ? !1 : (0, K.isChatPeer)(t.peerId) && t.data && t.data.closed ? !1 : t.unread ? !1 : t.lastmsg <= t.out_up_to ? !1 : !0 : !1
    }

    function g(e) {
        var t = w(e),
            n = e.unread > 0 ? e.unread : "";
        return n > 0 && t
    }

    function h(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = u(e, t.peerId, t, (0, K.isClassicInterface)(e)),
            i = a.photo,
            o = a.userLink,
            s = n || w(t);
        if (!s) return p(t, i, o, e, r);
        var l = s.flags,
            c = y(t, e, n),
            d = [];
        r.search && d.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && d.push("nim-dialog_muted"), t.verified && d.push("nim-dialog_verified"), (0, Y.isRecentSearchesActive)(e) && d.push("nim-dialog_recent"), -1 === s.messageId && d.push("nim-dialog_empty"), (0, K.isClassicInterface)(e) && d.push("nim-dialog_classic"), t.folders & te.FOLDER_IMPORTANT && d.push("nim-dialog_starred"), !r.search && (0, K.isUnrespond)(e, t.peerId, t) && d.push("nim-dialog_unrespond");
        var f = e.get().timeshift,
            h = m(e, t, l) ? "nim-dialog_unread-out" : "",
            _ = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
        return getTemplate("im_drow", {
            peer: t.peerId,
            msg_id: s.messageId,
            photo: i,
            user_link: o,
            date: s.date ? getShortDateOrTime(s.date, f, !0, getLang("months_sm_of", "raw")) : "",
            body: c,
            unread_message_string: _,
            tab_name: stripHTML(t.tab),
            unread: (0, K.simplifyCounter)(t.unread),
            more: d.join(" "),
            is_online: onlinePlatformClass(t.online),
            is_unread: g(t) ? "nim-dialog_unread" : "",
            is_unread_out: h,
            is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
        })
    }

    function _(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            a = (0, K.getBaseLink)(e),
            i = function() {
                return a + "?sel=" + (0, K.convertPeerToUrl)(t.peerId) + (r && n ? "&msgid=" + n : "")
            };
        return r ? i() : (0, K.isUserPeer)(t.peerId) || (0, K.isCommunityPeer)(t.peerId) ? (0, K.isClassicInterface)(e) ? i() : t.href : i()
    }

    function v(e, t, n, r, a) {
        if (!t.deletedDialog) {
            if (hasClass(e, "nim-conversation-search-row")) return void b(e, t, n);
            var i = w(t),
                o = i.flags,
                s = y(t, n),
                l = u(n, t.peerId, t, (0, K.isClassicInterface)(n)),
                c = l.photo,
                d = n.get().timeshift,
                f = i.date ? getShortDateOrTime(i.date, d, !0, getLang("months_sm_of", "raw")) : "";
            D(e, t), val(geByClass1("_dialog_body", e), s), val(geByClass1("_im_dialog_date", e), f), val(geByClass1("_im_dialog_unread_ct", e), (0, K.simplifyCounter)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
            var p = geByClass1("_im_dialog_photo", e);
            p.innerHTML !== c && val(p, c), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & te.FOLDER_IMPORTANT), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", (0, K.isUnrespond)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", (0, K.isClassicInterface)(n)), toggleClass(e, "nim-dialog_unread", g(t)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", (0, Y.isRecentSearchesActive)(n)), toggleClass(e, "nim-dialog_empty", -1 === i.messageId), m(n, t, o) && addClass(e, "nim-dialog_unread-out"), a && setTimeout(function() {
                addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
            }, 100)
        }
    }

    function b(e, t, n) {
        D(e, t), toggleClass(e, "nim-dialog_recent", (0, Y.isRecentSearchesActive)(n)), val(geByClass1("_im_dialog_unread_ct", e), (0, K.simplifyCounter)(t.unread));
        var r = u(n, t.peerId, t, (0, K.isClassicInterface)(n)),
            a = r.photo,
            i = geByClass1("_im_dialog_photo", e);
        i.innerHTML !== a && val(i, a), toggleOnline(geByClass1("_im_peer_online", e), t.online), g(t) && addClass(e, "nim-dialog_unread")
    }

    function y(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || w(e);
        if ((0, K.isPeerBlocked)(e.peerId, t)) {
            var a = t.get().block_states[e.peerId].name,
                i = getLang("mail_community_answering").replace("{username}", a);
            return getTemplate("im_drow_prebody", {
                prebody: i,
                body: ""
            })
        }
        return (0, K.isServiceMsg)(r) ? (0, K.renderServiceMsg)(t, r, e, !1) : f(t, r.flags, e.peerId, r.userId, !0, r.attaches, r.text, r.subject, (0, K.isClassicInterface)(t), (0, ie.oCacheGet)(t, t.get().id).photo)
    }

    function w(e) {
        var t = e.lastmsg_meta;
        return isArray(t) && (t = (0, ee.addMessageEvent)([4].concat(t))), t ? t : (0, ee.addMessageEvent)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
    }

    function C(e, t, n, r, a) {
        var i = geByClass1("_dialog_body", t);
        addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
            text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
            peer: e,
            spam_id: r
        }))
    }

    function E(e, t, n) {
        var r = (0, K.showFlushDialog)(t, function(a) {
            n().updateMenu(e), (0, K.cleanHistory)(e, r, n, W.flushHistory, t)
        })
    }

    function k(e, t, n, r, a, i) {
        var o = gpeByClass("_im_dialog", i, n);
        if (o) {
            var s = intval(domData(o, "peer"));
            if (t.get().recentSearch) {
                var l = (0, W.removeFromRecentSearch)(s, cur.imDb);
                return re(o), cancelEvent(a), 0 === l.length && H(t, r, e), !1
            }
            var u = (0, K.isCommunityPeer)(s) || (0, K.isUserPeer)(s);
            (0, K.isClassicInterface)(t) && u ? (0, W.deleteDialog)(s, t.get()).then(function(n) {
                var r = q(n, 2),
                    a = r[0],
                    i = r[1];
                a ? (C(s, o, a, i, t), e().updateMenu(t)) : E(t, s, e)
            }) : E(t, s, e)
        }
        return cancelEvent(a), !1
    }

    function S(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
            r = u(e, t.peerId, t, (0, K.isClassicInterface)(e)),
            a = r.photo,
            i = r.userLink,
            o = c(e),
            s = "" === n ? [] : [n];
        return (0, Y.isRecentSearchesActive)(e) && s.push("nim-dialog_recent"), (0, K.isClassicInterface)(e) && s.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && s.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
            peer: t.peerId,
            msg_id: t.lastmsg || "",
            photo: a,
            user_link: i,
            unread: (0, K.simplifyCounter)(t.unread),
            tab_name: stripHTML(t.tab),
            is_unread: g(t) ? "nim-dialog_unread" : "",
            is_online: onlinePlatformClass(t.online),
            is_selected: t.peerId == e.get().peer && o ? "nim-dialog_selected _im_dialog_selected" : "",
            more: s.join(" ")
        })
    }

    function T(e, t) {
        switch (t.type) {
            case "sep_btn_search_msg":
                return (0, K.renderBtnSearchOnlyMessages)(e);
            case "sep_messages":
                return (0, K.renderMessagesSep)();
            case "sep_conversations":
                return (0, K.renderConversationsSep)();
            case "sep_popular":
                return (0, K.renderPopularSuggSep)();
            case "popular_sugg":
                return (0, K.renderPopularSuggestions)(e);
            case "clear_recent":
                return (0, K.renderClearRecent)();
            case "empty_dialogs":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_dialogs_list_empty")
                });
            case "empty":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_im_search_empty")
                });
            default:
                return t.message ? h(e, t, t.message, {
                    noselect: !0,
                    search: !0
                }) : t.local_index || (0, Y.isSearching)(e) ? S(e, t) : h(e, t)
        }
    }

    function I(e, t, n, r, a, i) {
        var o = intval(domData(i, "peer")),
            s = domData(i, "action"),
            l = domData(i, "sid"),
            u = geByClass1("_im_dialog_" + o, t),
            c = intval(domData(i, "spam"));
        switch (s) {
            case "restore":
                u && e.set(W.restoreDialog.bind(null, o, l, c)).then(function() {
                    addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), v(u, e.get().tabs[o], e, t, !1), r().updateMenu(e)
                });
                break;
            case "spam":
                var d = getLang("mail_im_dialog_marked_spam") + '\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="' + l + '" data-peer="' + o + '">\n            ' + getLang("mail_restore") + "\n        </button>";
                if (u) {
                    var f = geByClass1("_dialog_body", u);
                    val(f, d), (0, W.spamDialog)(o, l, e.get())
                }
                break;
            case "block":
                var p = void 0;
                p = (0, K.isCommunityInterface)(e) ? (0, K.showBlacklistBox)(o, e) : (0, K.showBlacklistBoxUser)(o, e), p.once("success", function() {
                    e.set(W.flushHistory.bind(null, o)).then(function() {
                        n().restoreDialogs(e)
                    })
                })
        }
        cancelEvent(a)
    }

    function M(e, t) {
        return e.map(function(e) {
            return (0, ee.addMessageEvent)([4].concat(e))
        }).map(function(e) {
            return extend({}, t[e.peerId], {
                message: e
            })
        })
    }

    function P(e) {
        return {
            type: "empty",
            lang: e
        }
    }

    function L(e, t, n) {
        return (0, K.isClassicInterface)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!(0, K.isClassicInterface)(n)).then(function() {
            (0, K.isClassicInterface)(n) || t().toggleSettingsLoader(n, !1)
        })
    }

    function O(e, t) {
        var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
        return "undefined" != typeof n ? 2e9 + n : t.lastmsg
    }

    function A(e, t, n, r) {
        var a = gpeByClass("_im_dialog", r, t),
            i = intval(domData(a, "peer"));
        return e.set(W.toggleDialogImportant.bind(null, i)), setTimeout(function() {
            N(e, t, n, r)
        }, 100), cancelEvent(n), !1
    }

    function x(e, t, n) {
        var r = void 0;
        return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = (0, K.isReversedDialogs)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = O(e, n) - O(e, t), r = (0, K.isReversedDialogs)(e) ? -r : r), r
    }

    function N(e, t, n, r) {
        var a = r.getBoundingClientRect().top;
        showTooltip(r, {
            text: function() {
                var n = gpeByClass("_im_dialog", r, t),
                    a = domData(n, "peer");
                return e.get().tabs[a].folders & te.FOLDER_IMPORTANT ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
            },
            black: 1,
            zIndex: 1,
            shift: [14, 8],
            toup: (0, Y.isSearching)(e) ? a > 190 : a > 150
        })
    }

    function D(e, t) {
        var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
            r = geByClass1("_im_unread_blind_label", e);
        val(r, n)
    }

    function R(e, t, n, r, a) {
        var i = gpeByClass("_im_dialog", a, t),
            o = intval(domData(i, "peer")),
            s = e.get().tabs[o].lastmsg;
        return e.set(W.markDialogAnswered.bind(null, o, s)).then(function() {
            v(i, e.get().tabs[o], e, t), (0, Y.isRecentSearchesActive)(e) || n().restoreDialogs(e)
        }), showDoneBox(getLang("mail_marked_as_answered"), {
            out: 1e3
        }), cancelEvent(r), !1
    }

    function j(e) {
        var t = 42,
            n = 60,
            r = 45,
            a = 37,
            i = (0, Y.isSearching)(e),
            o = e.get().searchOnlyMessages;
        return (0, K.isClassicInterface)(e) ? {
            top: i && !o ? n + a - 1 : n,
            bottom: (0, K.isCommunityInterface)(e) ? t : t + r
        } : {
            top: i && !o ? a - 1 : 0,
            bottom: 0
        }
    }

    function B(e, t) {
        e.hoverFirstElement(ce, j(t))
    }

    function F(e) {
        e.unhoverElements(ce)
    }

    function H(e, t, n) {
        if ((0, Y.doPopularSuggExist)(e)) {
            var r = [{
                type: "sep_popular"
            }, {
                type: "popular_sugg"
            }];
            t.pipeReplace(Promise.resolve(r)), t.toTop()
        } else n().cancelSearch(e), cancelStackFilter("im_search")
    }

    function U(e, t, n, r, a) {
        return {
            selectPeer: function(t, n) {
                for (var r = geByClass("_im_dialog", e), a = n.get().peer, i = 0; i < r.length; i++) {
                    var s = r[i],
                        l = intval(domData(s, "peer")),
                        u = intval(domData(s, "msgid"));
                    l === a && (!o(s) || t === u && o(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                }
            },
            appendFastDialogs: function(t, r, a) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), a ? (n.reset(), (0, K.isPendingForward)(t) || (0, Y.isRecentSearchesActive)(t) || !(0, Q.doesSearchResultContainConversations)(r) ? (0, Y.isRecentSearchesActive)(t) && ((0, Q.doesSearchResultContainConversations)(r) && (r = [{
                    type: "clear_recent"
                }].concat(r)), (0, Y.doPopularSuggExist)(t) && (r = [{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }].concat(r))) : r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r), t.setState({
                    searchOnlyMessages: !1
                }), n.pipeReplace(Promise.resolve(r)).then(function() {
                    return B(n, t)
                })) : n.pipe(Promise.resolve(r)), (!(0, K.isClassicInterface)(t) || (0, K.isReservedPeer)(t.get().peer)) && n.toTop()
            },
            deactivate: function() {
                n.deactivate()
            },
            activate: function() {
                n.activate()
            },
            hoverFirstDialog: function(e) {
                B(n, e)
            },
            hoverNextDialog: function(e) {
                n.hoverNextElement(ce, ue, j(e))
            },
            hoverPrevDialog: function(e) {
                n.hoverPrevElement(ce, ue, j(e))
            },
            unhoverDialogs: F.bind(n),
            selectHoveredDialog: function(t) {
                var a = geByClass1("_im_dialog_hovered", e);
                a || (a = geByClass1("_im_dialog", e)), a && l(r, t, n, {}, a)
            },
            appendSearch: function(t, r, a) {
                var i = M(a, r);
                a.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                    type: "sep_messages"
                }].concat(i))).then(function() {
                    return B(n, t)
                })) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([P()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
            },
            updateDialog: function(t, n) {
                var r = geByClass1("_im_dialog_" + t);
                r && !o(r) && v(r, n.get().tabs[t], n, e)
            },
            focusOnSelected: function(e) {
                var t = e.get().peer;
                if (t) {
                    var r = geByClass1("_im_dialog_" + t);
                    r ? n.scrollTop(r.offsetTop - r.offsetHeight) : n.toTop()
                }
            },
            restoreScroll: function(e) {
                var t = n.restoreScroll("list");
                t || n.toTop()
            },
            restoreDialogs: function(t, a, i) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                    searchOnlyMessages: !1
                }), 0 !== z(t).length || n.isLoading() || (a = !0), a && n.reset(), i && n.wipe(), n.pipeReplace(Promise.resolve(z(t))).then(function(e) {
                    if (a && (!(0, K.isClassicInterface)(t) || !t.get().peer)) {
                        var i = L(n, r, t);
                        return n.toTop(), i
                    }
                }).then(function() {
                    return F(n)
                })
            },
            appendDialogs: function(t, r) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(function(n) {
                    var r = geByClass1("_im_dialog_" + n.peerId, e);
                    r && b(r, n, t)
                }), (0, K.isPendingForward)(t) || (0, Y.isRecentSearchesActive)(t) || !(0, Q.doesSearchResultContainConversations)(r) || (r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r)), t.setState({
                    searchOnlyMessages: !1
                }), n.isEmpty() && 0 === r.length && (0, K.isPendingForward)(t) && (r = [P(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
            },
            updateCounter: function(t, n) {
                var r = geByClass1("_im_dialog_" + n, e),
                    a = (0, Y.getTab)(t, n);
                if (r && !o(r) && (D(r, a), val(geByClass1("_im_dialog_unread_ct", r), (0, K.simplifyCounter)(a.unread)), toggleClass(r, "nim-dialog_unread", a.unread > 0), toggleClass(r, "nim-dialog_unread-out", m(t, a, w(a).flags))), (0, Y.isRecentSearchesActive)(t)) {
                    var i = geByClass1("_im_sugg_" + n);
                    i && (val(geByClass1("_sugg_unread_ct", i), (0, K.simplifyCounter)(a.unread)), toggleClass(i, "sugg-is_unread", a.unread > 0))
                }
            },
            removeDialog: function(e, t) {
                n.remove(t)
            },
            updateOnline: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r) {
                    var a = n.get().tabs[t],
                        i = geByClass1("_im_peer_online", r);
                    toggleOnline(i, a.online)
                }
            },
            setDialogFailed: function(t, n, r) {
                var a = geByClass1("_im_dialog_" + t, e);
                if (a) {
                    var i = r.get().tabs[t];
                    i.lastmsg === n && (addClass(a, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", a), "!"))
                }
            },
            scrollUp: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                n.toTop(e, t), n.saveScroll("list", !0)
            },
            saveScroll: function(e) {
                n.saveScroll("list", !0)
            },
            promoteDialog: function(r, a) {
                var i = geByClass1("_im_dialog_" + a, e);
                return i && !o(i) || !(0, Y.isSearching)(r) ? (n.pipeReplace(Promise.resolve(z(r)), void 0, !0).then(function(t) {
                    !inArray(a, t) && i && v(i, (0, Y.getTab)(r, a), r, e)
                }), void t().updateTyping(a, r)) : void n.unsetScroll("list")
            },
            removeSelection: function(t) {
                var r = t.get().peer.toString(),
                    a = "._im_dialog_" + r + "." + ue.join("."),
                    i = domQuery(a, e)[0];
                ue.forEach(function(e) {
                    return removeClass(i, e)
                }), (0, K.isClassicInterface)(t) || n.hoverElement(r, ce, j(t))
            },
            updateScroll: function() {
                n.updateScroll()
            },
            updateTyping: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r && !o(r) && !n.get().tabs[t].deletedDialog) {
                    var a = geByClass1("_im_dialog_typing", r),
                        i = !(0, K.isClassicInterface)(n),
                        s = (0, K.formatTyper)(n.get().tabs[t].typing, t, !(0, K.isChatPeer)(t), n.get(), 1, i);
                    val(a, s), toggleClass(r, "nim-dialog_typing", s)
                }
            },
            unmount: function() {
                n.unmount(), (0, ne.destroyModule)(a)
            }
        }
    }

    function z(e) {
        var t = e.get().active_tab,
            n = e.get().dialog_tabs[t],
            r = e.get().tabs;
        return n.map(function(e) {
            return r["" + e]
        }).sort(x.bind(null, e))
    }

    function G(e, t) {
        return t.message ? t.message.messageId : (0, Y.isSearching)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
    }

    function V(e, t, n) {
        var r = (0, ne.createMutations)(U),
            a = r.callMutations,
            o = r.bindMutations,
            u = function(e, n) {
                var r = n.getBoundingClientRect().top;
                showTooltip(n, {
                    text: function() {
                        return (0, Y.isRecentSearchesActive)(t) ? getLang("mail_hide_from_recent") : getLang("mail_delete")
                    },
                    black: 1,
                    center: !0,
                    shift: (0, K.isClassicInterface)(t) ? [-4, 10] : [2, 10],
                    toup: r > 150 || (0, Y.isSearching)(t),
                    zIndex: 1
                })
            },
            c = function(e, t) {
                var n = t.getBoundingClientRect().top;
                showTooltip(t, {
                    text: getLang("mail_end_conversation"),
                    black: 1,
                    center: !0,
                    zIndex: 1,
                    shift: [1, 4],
                    toup: n > 150
                })
            },
            d = N.bind(null, t, e),
            f = A.bind(null, t, e),
            p = R.bind(null, t, e, a),
            m = geByClass1("_im_dialogs_search"),
            g = {
                idFn: function(e) {
                    return G(t, e)
                },
                hoverableFn: function(e) {
                    return hasClass(e, "_im_dialog")
                },
                renderFn: T.bind(null, t),
                more: s.bind(null, t, a),
                onScroll: (0, K.isClassicInterface)(t) ? function() {
                    var e = bodyNode.scrollTop || document.documentElement.scrollTop;
                    0 >= e && !layers.visible && browser.safari ? addClass(m, "im-page--header_static") : removeClass(m, "im-page--header_static")
                } : !1
            },
            h = (0, J.mount)(e, (0, Z["default"])({
                limit: 40,
                offset: 0,
                nativeScroll: !!(0, K.isClassicInterface)(t),
                height: oe,
                elements: z(t)
            }), function() {
                return g
            }),
            _ = l.bind(null, n, t, h),
            v = i.bind(null, t, e, h),
            b = I.bind(null, t, e, a, n),
            y = k.bind(null, n, t, e, h),
            w = (0, ne.createModule)({
                handlers: function(r, a) {
                    a(e, "click", "_im_dialog_close", y), a(e, "click", "_im_dialog_markre", p), a(e, "click", se, f), a(e, "click", "_im_dialog", _), a(e, "click", K.MESSAGE_SEARCH_CLASS, v), a(e, "mouseover", "_im_dialog_close", u), a(e, "mouseover", "_im_dialog_markre", c), a(e, "click", K.CLEAR_RECENT_CLASS, function() {
                        (0, W.resetRecentSearch)(cur.imDb), H(t, h, n)
                    }), a(e, "mouseover", se, d), a(e, "click", le, b), r(e, "mouseover", throttle(h.unhoverElements.bind(h, ce), 100))
                }
            });
        return o(e, a, h, n, w)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var q = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.mount = V;
    var W = n(28),
        K = n(88),
        Y = n(190),
        Q = n(171),
        $ = n(94),
        X = n(112),
        Z = a(X),
        J = n(178),
        ee = n(199),
        te = r(ee),
        ne = n(198),
        ae = n(96),
        ie = n(121),
        oe = 64,
        se = "_im_dialog_star",
        le = "_im_dialog_daction",
        ue = ["_im_dialog_selected", "nim-dialog_selected"],
        ce = ["_im_dialog_hovered", "nim-dialog_hovered"]
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(129)(!0);
    n(102)(String, "String", function(e) {
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
}, function(e, t) {}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        return t.state = e, Promise.resolve(t)
    }

    function i(e, t, n, r, a) {
        switch (t) {
            case p.ARROW_UP:
                (0, f.isEditableFocused)() || (r.scroll(a, "up"), cancelEvent(n));
                break;
            case p.ARROW_DOWN:
                (0, f.isEditableFocused)() || (r.scroll(a, "down"), cancelEvent(n));
                break;
            case p.PAGE_UP:
                n.ctrlKey || (0, f.isClassicInterface)(a) || (r.scroll(a, "up", !0), cancelEvent(n));
                break;
            case p.PAGE_DOWN:
                n.ctrlKey || (0, f.isClassicInterface)(a) || (r.scroll(a, "down", !0), cancelEvent(n));
                break;
            case p.HOME:
                (0, f.isEditableFocused)() || (r.scroll(a, "up", !1, !0), cancelEvent(n));
                break;
            case p.END_KEY:
                (0, f.isEditableFocused)() || (r.scroll(a, "down", !1, !0), cancelEvent(n));
                break;
            case p.PRINTABLE:
                r.focustTxt(e)
        }
    }

    function o(e, t, n, r, a, i) {
        switch (t) {
            case p.ARROW_DOWN:
                r.hoverNextDialog(i), cancelEvent(n);
                break;
            case p.ARROW_UP:
                r.hoverPrevDialog(i), cancelEvent(n);
                break;
            case p.ENTER:
                (!(0, f.isEditableFocused)() || gpeByClass("_im_dialogs_search_input", document.activeElement)) && r.selectHoveredDialog(i);
                break;
            case p.PRINTABLE:
                a.focusInput(i)
        }
    }

    function s(e, t, n, r, a) {
        switch (t) {
            case p.HOME:
            case p.END_KEY:
                r.isEmpty(a) && i(e, t, n, r, a);
                break;
            case p.PAGE_UP:
            case p.PAGE_DOWN:
                i(e, t, n, r, a)
        }
    }

    function l(e, t, n, r, a) {
        switch (t) {
            case p.PAGE_UP:
                !n.ctrlKey && (0, f.isClassicInterface)(a) && (r.scroll("up"), cancelEvent(n));
                break;
            case p.PAGE_DOWN:
                !n.ctrlKey && (0, f.isClassicInterface)(a) && (r.scroll("down"), cancelEvent(n));
                break;
            case p.ARROW_DOWN:
                r.hoverNextElement(a);
                break;
            case p.ARROW_UP:
                r.hoverPrevElement(a);
                break;
            case p.ENTER:
                gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(a) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(a);
                break;
            case p.PRINTABLE:
                r.focusSearch(a)
        }
    }

    function u(e, t, n, r, u, c) {
        var f = (0, d["default"])({
            state: t || "default"
        });
        return {
            signal: function(t, a) {
                if (!(cur.storyLayer || cur.articleEditorLayer || cur.articleLayer)) switch (f.get().state) {
                    case "default":
                        return i(f, t, a, r, e);
                    case "fwd":
                    case "search":
                        return o(f, t, a, n, u, e);
                    case "create":
                        return l(f, t, a, c, e);
                    case "message":
                        return s(f, t, a, r, e);
                    default:
                        throw new Error("Unknown state: " + f.get().state)
                }
            },
            transition: function(e) {
                return f.set(a.bind(null, e))
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.create = u;
    var c = n(112),
        d = r(c),
        f = n(88),
        p = n(94)
}, function(e, t, n) {
    var r = n(202)("keys"),
        a = n(104);
    e.exports = function(e) {
        return r[e] || (r[e] = a(e))
    }
}, function(e, t, n) {
    var r = n(18),
        a = n(74),
        i = n(161)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = a(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
    }
}, , function(e, t, n) {
    var r = n(76),
        a = n(19);
    e.exports = function(e) {
        return r(a(e))
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        throw t = Error(n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."), t.name = "Invariant Violation", t.framesToPop = 1, t
    }

    function a(e, t) {
        return (e & t) === t
    }

    function i(e, t) {
        if (Pn.hasOwnProperty(e) || 2 < e.length && ("o" === e[0] || "O" === e[0]) && ("n" === e[1] || "N" === e[1])) return !1;
        if (null === t) return !0;
        switch (typeof t) {
            case "boolean":
                return Pn.hasOwnProperty(e) ? e = !0 : (t = o(e)) ? e = t.hasBooleanValue || t.hasStringBooleanValue || t.hasOverloadedBooleanValue : (e = e.toLowerCase().slice(0, 5), e = "data-" === e || "aria-" === e), e;
            case "undefined":
            case "number":
            case "string":
            case "object":
                return !0;
            default:
                return !1
        }
    }

    function o(e) {
        return On.hasOwnProperty(e) ? On[e] : null
    }

    function s(e) {
        return e[1].toUpperCase()
    }

    function l(e, t, n, r, a, i, o, s, l) {
        Vn._hasCaughtError = !1, Vn._caughtError = null;
        var u = Array.prototype.slice.call(arguments, 3);
        try {
            t.apply(n, u)
        } catch (c) {
            Vn._caughtError = c, Vn._hasCaughtError = !0
        }
    }

    function u() {
        if (Vn._hasRethrowError) {
            var e = Vn._rethrowError;
            throw Vn._rethrowError = null, Vn._hasRethrowError = !1, e
        }
    }

    function c() {
        if (qn)
            for (var e in Wn) {
                var t = Wn[e],
                    n = qn.indexOf(e);
                if (n > -1 ? void 0 : r("96", e), !Kn[n]) {
                    t.extractEvents ? void 0 : r("97", e), Kn[n] = t, n = t.eventTypes;
                    for (var a in n) {
                        var i = void 0,
                            o = n[a],
                            s = t,
                            l = a;
                        Yn.hasOwnProperty(l) ? r("99", l) : void 0, Yn[l] = o;
                        var u = o.phasedRegistrationNames;
                        if (u) {
                            for (i in u) u.hasOwnProperty(i) && d(u[i], s, l);
                            i = !0
                        } else o.registrationName ? (d(o.registrationName, s, l), i = !0) : i = !1;
                        i ? void 0 : r("98", a, e)
                    }
                }
            }
    }

    function d(e, t, n) {
        Qn[e] ? r("100", e) : void 0, Qn[e] = t, $n[e] = t.eventTypes[n].dependencies
    }

    function f(e) {
        qn ? r("101") : void 0, qn = Array.prototype.slice.call(e), c()
    }

    function p(e) {
        var t, n = !1;
        for (t in e)
            if (e.hasOwnProperty(t)) {
                var a = e[t];
                Wn.hasOwnProperty(t) && Wn[t] === a || (Wn[t] ? r("102", t) : void 0, Wn[t] = a, n = !0)
            }
        n && c()
    }

    function m(e, t, n, r) {
        t = e.type || "unknown-event", e.currentTarget = er(r), Vn.invokeGuardedCallbackAndCatchFirstError(t, n, void 0, e), e.currentTarget = null
    }

    function g(e, t) {
        return null == t ? r("30") : void 0, null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t]
    }

    function h(e, t, n) {
        Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e)
    }

    function _(e, t) {
        if (e) {
            var n = e._dispatchListeners,
                r = e._dispatchInstances;
            if (Array.isArray(n))
                for (var a = 0; a < n.length && !e.isPropagationStopped(); a++) m(e, t, n[a], r[a]);
            else n && m(e, t, n, r);
            e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e)
        }
    }

    function v(e) {
        return _(e, !0)
    }

    function b(e) {
        return _(e, !1)
    }

    function y(e, t) {
        var n = e.stateNode;
        if (!n) return null;
        var a = Zn(n);
        if (!a) return null;
        n = a[t];
        e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
                (a = !a.disabled) || (e = e.type, a = !("button" === e || "input" === e || "select" === e || "textarea" === e)), e = !a;
                break e;
            default:
                e = !1
        }
        return e ? null : (n && "function" != typeof n ? r("231", t, typeof n) : void 0, n)
    }

    function w(e, t, n, r) {
        for (var a, i = 0; i < Kn.length; i++) {
            var o = Kn[i];
            o && (o = o.extractEvents(e, t, n, r)) && (a = g(a, o))
        }
        return a
    }

    function C(e) {
        e && (tr = g(tr, e))
    }

    function E(e) {
        var t = tr;
        tr = null, t && (e ? h(t, v) : h(t, b), tr ? r("95") : void 0, Vn.rethrowCaughtError())
    }

    function k(e) {
        if (e[ir]) return e[ir];
        for (var t = []; !e[ir];) {
            if (t.push(e), !e.parentNode) return null;
            e = e.parentNode
        }
        var n = void 0,
            r = e[ir];
        if (5 === r.tag || 6 === r.tag) return r;
        for (; e && (r = e[ir]); e = t.pop()) n = r;
        return n
    }

    function S(e) {
        return 5 === e.tag || 6 === e.tag ? e.stateNode : void r("33")
    }

    function T(e) {
        return e[or] || null
    }

    function I(e) {
        do e = e["return"]; while (e && 5 !== e.tag);
        return e ? e : null
    }

    function M(e, t, n) {
        for (var r = []; e;) r.push(e), e = I(e);
        for (e = r.length; 0 < e--;) t(r[e], "captured", n);
        for (e = 0; e < r.length; e++) t(r[e], "bubbled", n)
    }

    function P(e, t, n) {
        (t = y(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = g(n._dispatchListeners, t), n._dispatchInstances = g(n._dispatchInstances, e))
    }

    function L(e) {
        e && e.dispatchConfig.phasedRegistrationNames && M(e._targetInst, P, e)
    }

    function O(e) {
        if (e && e.dispatchConfig.phasedRegistrationNames) {
            var t = e._targetInst;
            t = t ? I(t) : null, M(t, P, e)
        }
    }

    function A(e, t, n) {
        e && n && n.dispatchConfig.registrationName && (t = y(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = g(n._dispatchListeners, t), n._dispatchInstances = g(n._dispatchInstances, e))
    }

    function x(e) {
        e && e.dispatchConfig.registrationName && A(e._targetInst, null, e)
    }

    function N(e) {
        h(e, L)
    }

    function D(e, t, n, r) {
        if (n && r) e: {
            for (var a = n, i = r, o = 0, s = a; s; s = I(s)) o++;s = 0;
            for (var l = i; l; l = I(l)) s++;
            for (; o - s > 0;) a = I(a),
            o--;
            for (; s - o > 0;) i = I(i),
            s--;
            for (; o--;) {
                if (a === i || a === i.alternate) break e;
                a = I(a), i = I(i)
            }
            a = null
        }
        else a = null;
        for (i = a, a = []; n && n !== i && (o = n.alternate, null === o || o !== i);) a.push(n), n = I(n);
        for (n = []; r && r !== i && (o = r.alternate, null === o || o !== i);) n.push(r), r = I(r);
        for (r = 0; r < a.length; r++) A(a[r], "bubbled", e);
        for (e = n.length; 0 < e--;) A(n[e], "captured", t)
    }

    function R() {
        return !ur && yn.canUseDOM && (ur = "textContent" in document.documentElement ? "textContent" : "innerText"), ur
    }

    function j() {
        if (cr._fallbackText) return cr._fallbackText;
        var e, t, n = cr._startText,
            r = n.length,
            a = B(),
            i = a.length;
        for (e = 0; r > e && n[e] === a[e]; e++);
        var o = r - e;
        for (t = 1; o >= t && n[r - t] === a[i - t]; t++);
        return cr._fallbackText = a.slice(e, t > 1 ? 1 - t : void 0), cr._fallbackText
    }

    function B() {
        return "value" in cr._root ? cr._root.value : cr._root[R()]
    }

    function F(e, t, n, r) {
        this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface;
        for (var a in e) e.hasOwnProperty(a) && ((t = e[a]) ? this[a] = t(n) : "target" === a ? this.target = r : this[a] = n[a]);
        return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? Cn.thatReturnsTrue : Cn.thatReturnsFalse, this.isPropagationStopped = Cn.thatReturnsFalse, this
    }

    function H(e, t, n, r) {
        if (this.eventPool.length) {
            var a = this.eventPool.pop();
            return this.call(a, e, t, n, r), a
        }
        return new this(e, t, n, r)
    }

    function U(e) {
        e instanceof this ? void 0 : r("223"), e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e)
    }

    function z(e) {
        e.eventPool = [], e.getPooled = H, e.release = U
    }

    function G(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function V(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function q(e, t) {
        switch (e) {
            case "topKeyUp":
                return -1 !== pr.indexOf(t.keyCode);
            case "topKeyDown":
                return 229 !== t.keyCode;
            case "topKeyPress":
            case "topMouseDown":
            case "topBlur":
                return !0;
            default:
                return !1
        }
    }

    function W(e) {
        return e = e.detail, "object" == typeof e && "data" in e ? e.data : null
    }

    function K(e, t) {
        switch (e) {
            case "topCompositionEnd":
                return W(t);
            case "topKeyPress":
                return 32 !== t.which ? null : (Er = !0, wr);
            case "topTextInput":
                return e = t.data, e === wr && Er ? null : e;
            default:
                return null
        }
    }

    function Y(e, t) {
        if (kr) return "topCompositionEnd" === e || !mr && q(e, t) ? (e = j(), cr._root = null, cr._startText = null, cr._fallbackText = null, kr = !1, e) : null;
        switch (e) {
            case "topPaste":
                return null;
            case "topKeyPress":
                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                    if (t["char"] && 1 < t["char"].length) return t["char"];
                    if (t.which) return String.fromCharCode(t.which)
                }
                return null;
            case "topCompositionEnd":
                return yr ? null : t.data;
            default:
                return null
        }
    }

    function Q(e) {
        if (e = Jn(e)) {
            Tr && "function" == typeof Tr.restoreControlledState ? void 0 : r("194");
            var t = Zn(e.stateNode);
            Tr.restoreControlledState(e.stateNode, e.type, t)
        }
    }

    function $(e) {
        Ir ? Mr ? Mr.push(e) : Mr = [e] : Ir = e
    }

    function X() {
        if (Ir) {
            var e = Ir,
                t = Mr;
            if (Mr = Ir = null, Q(e), t)
                for (e = 0; e < t.length; e++) Q(t[e])
        }
    }

    function Z(e, t) {
        return e(t)
    }

    function J(e, t) {
        if (Or) return Z(e, t);
        Or = !0;
        try {
            return Z(e, t)
        } finally {
            Or = !1, X()
        }
    }

    function ee(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return "input" === t ? !!Ar[e.type] : "textarea" === t ? !0 : !1
    }

    function te(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
    }

    function ne(e, t) {
        if (!yn.canUseDOM || t && !("addEventListener" in document)) return !1;
        t = "on" + e;
        var n = t in document;
        return n || (n = document.createElement("div"), n.setAttribute(t, "return;"), n = "function" == typeof n[t]), !n && vr && "wheel" === e && (n = document.implementation.hasFeature("Events.wheel", "3.0")), n
    }

    function re(e) {
        var t = e.type;
        return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
    }

    function ae(e) {
        var t = re(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
        return e.hasOwnProperty(t) || "function" != typeof n.get || "function" != typeof n.set ? void 0 : (Object.defineProperty(e, t, {
            enumerable: n.enumerable,
            configurable: !0,
            get: function() {
                return n.get.call(this)
            },
            set: function(e) {
                r = "" + e, n.set.call(this, e)
            }
        }), {
            getValue: function() {
                return r
            },
            setValue: function(e) {
                r = "" + e
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        })
    }

    function ie(e) {
        e._valueTracker || (e._valueTracker = ae(e))
    }

    function oe(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
            r = "";
        return e && (r = re(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
    }

    function se(e, t, n) {
        return e = F.getPooled(xr.change, e, t, n), e.type = "change", $(n), N(e), e
    }

    function le(e) {
        C(e), E(!1)
    }

    function ue(e) {
        var t = S(e);
        return oe(t) ? e : void 0
    }

    function ce(e, t) {
        return "topChange" === e ? t : void 0
    }

    function de() {
        Nr && (Nr.detachEvent("onpropertychange", fe), Dr = Nr = null)
    }

    function fe(e) {
        "value" === e.propertyName && ue(Dr) && (e = se(Dr, e, te(e)), J(le, e))
    }

    function pe(e, t, n) {
        "topFocus" === e ? (de(), Nr = t, Dr = n, Nr.attachEvent("onpropertychange", fe)) : "topBlur" === e && de()
    }

    function me(e) {
        return "topSelectionChange" === e || "topKeyUp" === e || "topKeyDown" === e ? ue(Dr) : void 0
    }

    function ge(e, t) {
        return "topClick" === e ? ue(t) : void 0
    }

    function he(e, t) {
        return "topInput" === e || "topChange" === e ? ue(t) : void 0
    }

    function _e(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function ve(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = Br[e]) ? !!t[e] : !1
    }

    function be() {
        return ve
    }

    function ye(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function we(e) {
        return e = e.type, "string" == typeof e ? e : "function" == typeof e ? e.displayName || e.name : null
    }

    function Ce(e) {
        var t = e;
        if (e.alternate)
            for (; t["return"];) t = t["return"];
        else {
            if (0 !== (2 & t.effectTag)) return 1;
            for (; t["return"];)
                if (t = t["return"], 0 !== (2 & t.effectTag)) return 1
        }
        return 3 === t.tag ? 2 : 3
    }

    function Ee(e) {
        return (e = e._reactInternalFiber) ? 2 === Ce(e) : !1
    }

    function ke(e) {
        2 !== Ce(e) ? r("188") : void 0
    }

    function Se(e) {
        var t = e.alternate;
        if (!t) return t = Ce(e), 3 === t ? r("188") : void 0, 1 === t ? null : e;
        for (var n = e, a = t;;) {
            var i = n["return"],
                o = i ? i.alternate : null;
            if (!i || !o) break;
            if (i.child === o.child) {
                for (var s = i.child; s;) {
                    if (s === n) return ke(i), e;
                    if (s === a) return ke(i), t;
                    s = s.sibling
                }
                r("188")
            }
            if (n["return"] !== a["return"]) n = i, a = o;
            else {
                s = !1;
                for (var l = i.child; l;) {
                    if (l === n) {
                        s = !0, n = i, a = o;
                        break
                    }
                    if (l === a) {
                        s = !0, a = i, n = o;
                        break
                    }
                    l = l.sibling
                }
                if (!s) {
                    for (l = o.child; l;) {
                        if (l === n) {
                            s = !0, n = o, a = i;
                            break
                        }
                        if (l === a) {
                            s = !0, a = o, n = i;
                            break
                        }
                        l = l.sibling
                    }
                    s ? void 0 : r("189")
                }
            }
            n.alternate !== a ? r("190") : void 0
        }
        return 3 !== n.tag ? r("188") : void 0, n.stateNode.current === n ? e : t
    }

    function Te(e) {
        if (e = Se(e), !e) return null;
        for (var t = e;;) {
            if (5 === t.tag || 6 === t.tag) return t;
            if (t.child) t.child["return"] = t, t = t.child;
            else {
                if (t === e) break;
                for (; !t.sibling;) {
                    if (!t["return"] || t["return"] === e) return null;
                    t = t["return"]
                }
                t.sibling["return"] = t["return"], t = t.sibling
            }
        }
        return null
    }

    function Ie(e) {
        if (e = Se(e), !e) return null;
        for (var t = e;;) {
            if (5 === t.tag || 6 === t.tag) return t;
            if (t.child && 4 !== t.tag) t.child["return"] = t, t = t.child;
            else {
                if (t === e) break;
                for (; !t.sibling;) {
                    if (!t["return"] || t["return"] === e) return null;
                    t = t["return"]
                }
                t.sibling["return"] = t["return"], t = t.sibling
            }
        }
        return null
    }

    function Me(e) {
        var t = e.targetInst;
        do {
            if (!t) {
                e.ancestors.push(t);
                break
            }
            var n;
            for (n = t; n["return"];) n = n["return"];
            if (n = 3 !== n.tag ? null : n.stateNode.containerInfo, !n) break;
            e.ancestors.push(t), t = k(n)
        } while (t);
        for (n = 0; n < e.ancestors.length; n++) t = e.ancestors[n], Vr(e.topLevelType, t, e.nativeEvent, te(e.nativeEvent))
    }

    function Pe(e) {
        Gr = !!e
    }

    function Le(e, t, n) {
        return n ? En.listen(n, t, Ae.bind(null, e)) : null
    }

    function Oe(e, t, n) {
        return n ? En.capture(n, t, Ae.bind(null, e)) : null
    }

    function Ae(e, t) {
        if (Gr) {
            var n = te(t);
            if (n = k(n), null === n || "number" != typeof n.tag || 2 === Ce(n) || (n = null), zr.length) {
                var r = zr.pop();
                r.topLevelType = e, r.nativeEvent = t, r.targetInst = n, e = r
            } else e = {
                topLevelType: e,
                nativeEvent: t,
                targetInst: n,
                ancestors: []
            };
            try {
                J(Me, e)
            } finally {
                e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, 10 > zr.length && zr.push(e)
            }
        }
    }

    function xe(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n
    }

    function Ne(e) {
        if (Kr[e]) return Kr[e];
        if (!Wr[e]) return e;
        var t, n = Wr[e];
        for (t in n)
            if (n.hasOwnProperty(t) && t in Yr) return Kr[e] = n[t];
        return ""
    }

    function De(e) {
        return Object.prototype.hasOwnProperty.call(e, Zr) || (e[Zr] = Xr++, $r[e[Zr]] = {}), $r[e[Zr]]
    }

    function Re(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function je(e, t) {
        var n = Re(e);
        e = 0;
        for (var r; n;) {
            if (3 === n.nodeType) {
                if (r = e + n.textContent.length, t >= e && r >= t) return {
                    node: n,
                    offset: t - e
                };
                e = r
            }
            e: {
                for (; n;) {
                    if (n.nextSibling) {
                        n = n.nextSibling;
                        break e
                    }
                    n = n.parentNode
                }
                n = void 0
            }
            n = Re(n)
        }
    }

    function Be(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && ("input" === t && "text" === e.type || "textarea" === t || "true" === e.contentEditable)
    }

    function Fe(e, t) {
        if (aa || null == ta || ta !== kn()) return null;
        var n = ta;
        return "selectionStart" in n && Be(n) ? n = {
            start: n.selectionStart,
            end: n.selectionEnd
        } : window.getSelection ? (n = window.getSelection(), n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset
        }) : n = void 0, ra && Sn(ra, n) ? null : (ra = n, e = F.getPooled(ea.select, na, e, t), e.type = "select", e.target = ta, N(e), e)
    }

    function He(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function Ue(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function ze(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function Ge(e) {
        var t = e.keyCode;
        return "charCode" in e ? (e = e.charCode, 0 === e && 13 === t && (e = 13)) : e = t, e >= 32 || 13 === e ? e : 0
    }

    function Ve(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function qe(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function We(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function Ke(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function Ye(e, t, n, r) {
        return F.call(this, e, t, n, r)
    }

    function Qe(e) {
        0 > fa || (e.current = da[fa], da[fa] = null, fa--)
    }

    function $e(e, t) {
        fa++, da[fa] = e.current, e.current = t
    }

    function Xe(e) {
        return Je(e) ? ga : pa.current
    }

    function Ze(e, t) {
        var n = e.type.contextTypes;
        if (!n) return Mn;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
        var a, i = {};
        for (a in n) i[a] = t[a];
        return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
    }

    function Je(e) {
        return 2 === e.tag && null != e.type.childContextTypes
    }

    function et(e) {
        Je(e) && (Qe(ma, e), Qe(pa, e))
    }

    function tt(e, t, n) {
        null != pa.cursor ? r("168") : void 0, $e(pa, t, e), $e(ma, n, e)
    }

    function nt(e, t) {
        var n = e.stateNode,
            a = e.type.childContextTypes;
        if ("function" != typeof n.getChildContext) return t;
        n = n.getChildContext();
        for (var i in n) i in a ? void 0 : r("108", we(e) || "Unknown", i);
        return wn({}, t, n)
    }

    function rt(e) {
        if (!Je(e)) return !1;
        var t = e.stateNode;
        return t = t && t.__reactInternalMemoizedMergedChildContext || Mn, ga = pa.current, $e(pa, t, e), $e(ma, ma.current, e), !0
    }

    function at(e, t) {
        var n = e.stateNode;
        if (n ? void 0 : r("169"), t) {
            var a = nt(e, ga);
            n.__reactInternalMemoizedMergedChildContext = a, Qe(ma, e), Qe(pa, e), $e(pa, a, e)
        } else Qe(ma, e);
        $e(ma, t, e)
    }

    function it(e, t, n) {
        this.tag = e, this.key = t, this.stateNode = this.type = null, this.sibling = this.child = this["return"] = null, this.index = 0, this.memoizedState = this.updateQueue = this.memoizedProps = this.pendingProps = this.ref = null, this.internalContextTag = n, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.expirationTime = 0, this.alternate = null
    }

    function ot(e, t, n) {
        var r = e.alternate;
        return null === r ? (r = new it(e.tag, e.key, e.internalContextTag), r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.effectTag = 0, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null), r.expirationTime = n, r.pendingProps = t, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r
    }

    function st(e, t, n) {
        var a = void 0,
            i = e.type,
            o = e.key;
        return "function" == typeof i ? (a = i.prototype && i.prototype.isReactComponent ? new it(2, o, t) : new it(0, o, t), a.type = i, a.pendingProps = e.props) : "string" == typeof i ? (a = new it(5, o, t), a.type = i, a.pendingProps = e.props) : "object" == typeof i && null !== i && "number" == typeof i.tag ? (a = i, a.pendingProps = e.props) : r("130", null == i ? i : typeof i, ""), a.expirationTime = n, a
    }

    function lt(e, t, n, r) {
        return t = new it(10, r, t), t.pendingProps = e, t.expirationTime = n, t
    }

    function ut(e, t, n) {
        return t = new it(6, null, t), t.pendingProps = e, t.expirationTime = n, t
    }

    function ct(e, t, n) {
        return t = new it(7, e.key, t), t.type = e.handler, t.pendingProps = e, t.expirationTime = n, t
    }

    function dt(e, t, n) {
        return e = new it(9, null, t), e.expirationTime = n, e
    }

    function ft(e, t, n) {
        return t = new it(4, e.key, t), t.pendingProps = e.children || [], t.expirationTime = n, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }

    function pt(e) {
        return function(t) {
            try {
                return e(t)
            } catch (n) {}
        }
    }

    function mt(e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
            var n = t.inject(e);
            ha = pt(function(e) {
                return t.onCommitFiberRoot(n, e)
            }), _a = pt(function(e) {
                return t.onCommitFiberUnmount(n, e)
            })
        } catch (r) {}
        return !0
    }

    function gt(e) {
        "function" == typeof ha && ha(e)
    }

    function ht(e) {
        "function" == typeof _a && _a(e)
    }

    function _t(e) {
        return {
            baseState: e,
            expirationTime: 0,
            first: null,
            last: null,
            callbackList: null,
            hasForceUpdate: !1,
            isInitialized: !1
        }
    }

    function vt(e, t) {
        null === e.last ? e.first = e.last = t : (e.last.next = t, e.last = t), (0 === e.expirationTime || e.expirationTime > t.expirationTime) && (e.expirationTime = t.expirationTime)
    }

    function bt(e, t) {
        var n = e.alternate,
            r = e.updateQueue;
        null === r && (r = e.updateQueue = _t(null)), null !== n ? (e = n.updateQueue, null === e && (e = n.updateQueue = _t(null))) : e = null, e = e !== r ? e : null, null === e ? vt(r, t) : null === r.last || null === e.last ? (vt(r, t), vt(e, t)) : (vt(r, t), e.last = t)
    }

    function yt(e, t, n, r) {
        return e = e.partialState, "function" == typeof e ? e.call(t, n, r) : e
    }

    function wt(e, t, n, r, a, i) {
        null !== e && e.updateQueue === n && (n = t.updateQueue = {
            baseState: n.baseState,
            expirationTime: n.expirationTime,
            first: n.first,
            last: n.last,
            isInitialized: n.isInitialized,
            callbackList: null,
            hasForceUpdate: !1
        }), n.expirationTime = 0, n.isInitialized ? e = n.baseState : (e = n.baseState = t.memoizedState, n.isInitialized = !0);
        for (var o = !0, s = n.first, l = !1; null !== s;) {
            var u = s.expirationTime;
            if (u > i) {
                var c = n.expirationTime;
                (0 === c || c > u) && (n.expirationTime = u), l || (l = !0, n.baseState = e)
            } else l || (n.first = s.next, null === n.first && (n.last = null)), s.isReplace ? (e = yt(s, r, e, a), o = !0) : (u = yt(s, r, e, a)) && (e = o ? wn({}, e, u) : wn(e, u), o = !1), s.isForced && (n.hasForceUpdate = !0), null !== s.callback && (u = n.callbackList, null === u && (u = n.callbackList = []), u.push(s));
            s = s.next
        }
        return null !== n.callbackList ? t.effectTag |= 32 : null !== n.first || n.hasForceUpdate || (t.updateQueue = null), l || (n.baseState = e), e
    }

    function Ct(e, t) {
        var n = e.callbackList;
        if (null !== n)
            for (e.callbackList = null, e = 0; e < n.length; e++) {
                var a = n[e],
                    i = a.callback;
                a.callback = null, "function" != typeof i ? r("191", i) : void 0, i.call(t)
            }
    }

    function Et(e, t, n, a) {
        function i(e, t) {
            t.updater = o, e.stateNode = t, t._reactInternalFiber = e
        }
        var o = {
            isMounted: Ee,
            enqueueSetState: function(n, r, a) {
                n = n._reactInternalFiber, a = void 0 === a ? null : a;
                var i = t(n);
                bt(n, {
                    expirationTime: i,
                    partialState: r,
                    callback: a,
                    isReplace: !1,
                    isForced: !1,
                    nextCallback: null,
                    next: null
                }), e(n, i)
            },
            enqueueReplaceState: function(n, r, a) {
                n = n._reactInternalFiber, a = void 0 === a ? null : a;
                var i = t(n);
                bt(n, {
                    expirationTime: i,
                    partialState: r,
                    callback: a,
                    isReplace: !0,
                    isForced: !1,
                    nextCallback: null,
                    next: null
                }), e(n, i)
            },
            enqueueForceUpdate: function(n, r) {
                n = n._reactInternalFiber, r = void 0 === r ? null : r;
                var a = t(n);
                bt(n, {
                    expirationTime: a,
                    partialState: null,
                    callback: r,
                    isReplace: !1,
                    isForced: !0,
                    nextCallback: null,
                    next: null
                }), e(n, a)
            }
        };
        return {
            adoptClassInstance: i,
            constructClassInstance: function(e, t) {
                var n = e.type,
                    r = Xe(e),
                    a = 2 === e.tag && null != e.type.contextTypes,
                    o = a ? Ze(e, r) : Mn;
                return t = new n(t, o), i(e, t), a && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), t
            },
            mountClassInstance: function(e, t) {
                var n = e.alternate,
                    a = e.stateNode,
                    i = a.state || null,
                    s = e.pendingProps;
                s ? void 0 : r("158");
                var l = Xe(e);
                a.props = s, a.state = e.memoizedState = i, a.refs = Mn, a.context = Ze(e, l), null != e.type && null != e.type.prototype && !0 === e.type.prototype.unstable_isAsyncReactComponent && (e.internalContextTag |= 1), "function" == typeof a.componentWillMount && (i = a.state, a.componentWillMount(), i !== a.state && o.enqueueReplaceState(a, a.state, null), i = e.updateQueue, null !== i && (a.state = wt(n, e, i, a, s, t))), "function" == typeof a.componentDidMount && (e.effectTag |= 4)
            },
            updateClassInstance: function(e, t, i) {
                var s = t.stateNode;
                s.props = t.memoizedProps, s.state = t.memoizedState;
                var l = t.memoizedProps,
                    u = t.pendingProps;
                u || (u = l, null == u ? r("159") : void 0);
                var c = s.context,
                    d = Xe(t);
                if (d = Ze(t, d), "function" != typeof s.componentWillReceiveProps || l === u && c === d || (c = s.state, s.componentWillReceiveProps(u, d), s.state !== c && o.enqueueReplaceState(s, s.state, null)), c = t.memoizedState, i = null !== t.updateQueue ? wt(e, t, t.updateQueue, s, u, i) : c, !(l !== u || c !== i || ma.current || null !== t.updateQueue && t.updateQueue.hasForceUpdate)) return "function" != typeof s.componentDidUpdate || l === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 4), !1;
                var f = u;
                if (null === l || null !== t.updateQueue && t.updateQueue.hasForceUpdate) f = !0;
                else {
                    var p = t.stateNode,
                        m = t.type;
                    f = "function" == typeof p.shouldComponentUpdate ? p.shouldComponentUpdate(f, i, d) : m.prototype && m.prototype.isPureReactComponent ? !Sn(l, f) || !Sn(c, i) : !0
                }
                return f ? ("function" == typeof s.componentWillUpdate && s.componentWillUpdate(u, i, d), "function" == typeof s.componentDidUpdate && (t.effectTag |= 4)) : ("function" != typeof s.componentDidUpdate || l === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 4), n(t, u), a(t, i)), s.props = u, s.state = i, s.context = d, f
            }
        }
    }

    function kt(e) {
        return null === e || "undefined" == typeof e ? null : (e = ka && e[ka] || e["@@iterator"], "function" == typeof e ? e : null)
    }

    function St(e, t) {
        var n = t.ref;
        if (null !== n && "function" != typeof n) {
            if (t._owner) {
                t = t._owner;
                var a = void 0;
                t && (2 !== t.tag ? r("110") : void 0, a = t.stateNode), a ? void 0 : r("147", n);
                var i = "" + n;
                return null !== e && null !== e.ref && e.ref._stringRef === i ? e.ref : (e = function(e) {
                    var t = a.refs === Mn ? a.refs = {} : a.refs;
                    null === e ? delete t[i] : t[i] = e
                }, e._stringRef = i, e)
            }
            "string" != typeof n ? r("148") : void 0, t._owner ? void 0 : r("149", n)
        }
        return n
    }

    function Tt(e, t) {
        "textarea" !== e.type && r("31", "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t, "")
    }

    function It(e) {
        function t(t, n) {
            if (e) {
                var r = t.lastEffect;
                null !== r ? (r.nextEffect = n, t.lastEffect = n) : t.firstEffect = t.lastEffect = n, n.nextEffect = null, n.effectTag = 8
            }
        }

        function n(n, r) {
            if (!e) return null;
            for (; null !== r;) t(n, r), r = r.sibling;
            return null
        }

        function a(e, t) {
            for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
            return e
        }

        function i(e, t, n) {
            return e = ot(e, t, n), e.index = 0, e.sibling = null, e
        }

        function o(t, n, r) {
            return t.index = r, e ? (r = t.alternate, null !== r ? (r = r.index, n > r ? (t.effectTag = 2, n) : r) : (t.effectTag = 2, n)) : n
        }

        function s(t) {
            return e && null === t.alternate && (t.effectTag = 2), t
        }

        function l(e, t, n, r) {
            return null === t || 6 !== t.tag ? (t = ut(n, e.internalContextTag, r), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
        }

        function u(e, t, n, r) {
            return null !== t && t.type === n.type ? (r = i(t, n.props, r), r.ref = St(t, n), r["return"] = e, r) : (r = st(n, e.internalContextTag, r), r.ref = St(t, n), r["return"] = e, r)
        }

        function c(e, t, n, r) {
            return null === t || 7 !== t.tag ? (t = ct(n, e.internalContextTag, r), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
        }

        function d(e, t, n, r) {
            return null === t || 9 !== t.tag ? (t = dt(n, e.internalContextTag, r), t.type = n.value, t["return"] = e, t) : (t = i(t, null, r), t.type = n.value, t["return"] = e, t)
        }

        function f(e, t, n, r) {
            return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ft(n, e.internalContextTag, r), t["return"] = e, t) : (t = i(t, n.children || [], r), t["return"] = e, t)
        }

        function p(e, t, n, r, a) {
            return null === t || 10 !== t.tag ? (t = lt(n, e.internalContextTag, r, a), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
        }

        function m(e, t, n) {
            if ("string" == typeof t || "number" == typeof t) return t = ut("" + t, e.internalContextTag, n), t["return"] = e, t;
            if ("object" == typeof t && null !== t) {
                switch (t.$$typeof) {
                    case ba:
                        return t.type === Ea ? (t = lt(t.props.children, e.internalContextTag, n, t.key), t["return"] = e, t) : (n = st(t, e.internalContextTag, n), n.ref = St(null, t), n["return"] = e, n);
                    case ya:
                        return t = ct(t, e.internalContextTag, n), t["return"] = e, t;
                    case wa:
                        return n = dt(t, e.internalContextTag, n), n.type = t.value, n["return"] = e, n;
                    case Ca:
                        return t = ft(t, e.internalContextTag, n), t["return"] = e, t
                }
                if (Sa(t) || kt(t)) return t = lt(t, e.internalContextTag, n, null), t["return"] = e, t;
                Tt(e, t)
            }
            return null
        }

        function g(e, t, n, r) {
            var a = null !== t ? t.key : null;
            if ("string" == typeof n || "number" == typeof n) return null !== a ? null : l(e, t, "" + n, r);
            if ("object" == typeof n && null !== n) {
                switch (n.$$typeof) {
                    case ba:
                        return n.key === a ? n.type === Ea ? p(e, t, n.props.children, r, a) : u(e, t, n, r) : null;
                    case ya:
                        return n.key === a ? c(e, t, n, r) : null;
                    case wa:
                        return null === a ? d(e, t, n, r) : null;
                    case Ca:
                        return n.key === a ? f(e, t, n, r) : null
                }
                if (Sa(n) || kt(n)) return null !== a ? null : p(e, t, n, r, null);
                Tt(e, n)
            }
            return null
        }

        function h(e, t, n, r, a) {
            if ("string" == typeof r || "number" == typeof r) return e = e.get(n) || null, l(t, e, "" + r, a);
            if ("object" == typeof r && null !== r) {
                switch (r.$$typeof) {
                    case ba:
                        return e = e.get(null === r.key ? n : r.key) || null, r.type === Ea ? p(t, e, r.props.children, a, r.key) : u(t, e, r, a);
                    case ya:
                        return e = e.get(null === r.key ? n : r.key) || null, c(t, e, r, a);
                    case wa:
                        return e = e.get(n) || null, d(t, e, r, a);
                    case Ca:
                        return e = e.get(null === r.key ? n : r.key) || null, f(t, e, r, a)
                }
                if (Sa(r) || kt(r)) return e = e.get(n) || null, p(t, e, r, a, null);
                Tt(t, r)
            }
            return null
        }

        function _(r, i, s, l) {
            for (var u = null, c = null, d = i, f = i = 0, p = null; null !== d && f < s.length; f++) {
                d.index > f ? (p = d, d = null) : p = d.sibling;
                var _ = g(r, d, s[f], l);
                if (null === _) {
                    null === d && (d = p);
                    break
                }
                e && d && null === _.alternate && t(r, d), i = o(_, i, f), null === c ? u = _ : c.sibling = _, c = _, d = p
            }
            if (f === s.length) return n(r, d), u;
            if (null === d) {
                for (; f < s.length; f++)(d = m(r, s[f], l)) && (i = o(d, i, f), null === c ? u = d : c.sibling = d, c = d);
                return u
            }
            for (d = a(r, d); f < s.length; f++)(p = h(d, r, f, s[f], l)) && (e && null !== p.alternate && d["delete"](null === p.key ? f : p.key), i = o(p, i, f), null === c ? u = p : c.sibling = p, c = p);
            return e && d.forEach(function(e) {
                return t(r, e)
            }), u
        }

        function v(i, s, l, u) {
            var c = kt(l);
            "function" != typeof c ? r("150") : void 0, l = c.call(l), null == l ? r("151") : void 0;
            for (var d = c = null, f = s, p = s = 0, _ = null, v = l.next(); null !== f && !v.done; p++, v = l.next()) {
                f.index > p ? (_ = f, f = null) : _ = f.sibling;
                var b = g(i, f, v.value, u);
                if (null === b) {
                    f || (f = _);
                    break
                }
                e && f && null === b.alternate && t(i, f), s = o(b, s, p), null === d ? c = b : d.sibling = b, d = b, f = _
            }
            if (v.done) return n(i, f), c;
            if (null === f) {
                for (; !v.done; p++, v = l.next()) v = m(i, v.value, u), null !== v && (s = o(v, s, p), null === d ? c = v : d.sibling = v, d = v);
                return c
            }
            for (f = a(i, f); !v.done; p++, v = l.next()) v = h(f, i, p, v.value, u), null !== v && (e && null !== v.alternate && f["delete"](null === v.key ? p : v.key), s = o(v, s, p), null === d ? c = v : d.sibling = v, d = v);
            return e && f.forEach(function(e) {
                return t(i, e)
            }), c
        }
        return function(e, a, o, l) {
            "object" == typeof o && null !== o && o.type === Ea && null === o.key && (o = o.props.children);
            var u = "object" == typeof o && null !== o;
            if (u) switch (o.$$typeof) {
                case ba:
                    e: {
                        var c = o.key;
                        for (u = a; null !== u;) {
                            if (u.key === c) {
                                if (10 === u.tag ? o.type === Ea : u.type === o.type) {
                                    n(e, u.sibling), a = i(u, o.type === Ea ? o.props.children : o.props, l), a.ref = St(u, o), a["return"] = e, e = a;
                                    break e
                                }
                                n(e, u);
                                break
                            }
                            t(e, u), u = u.sibling
                        }
                        o.type === Ea ? (a = lt(o.props.children, e.internalContextTag, l, o.key), a["return"] = e, e = a) : (l = st(o, e.internalContextTag, l), l.ref = St(a, o), l["return"] = e, e = l)
                    }
                    return s(e);
                case ya:
                    e: {
                        for (u = o.key; null !== a;) {
                            if (a.key === u) {
                                if (7 === a.tag) {
                                    n(e, a.sibling), a = i(a, o, l), a["return"] = e, e = a;
                                    break e
                                }
                                n(e, a);
                                break
                            }
                            t(e, a), a = a.sibling
                        }
                        a = ct(o, e.internalContextTag, l),
                        a["return"] = e,
                        e = a
                    }
                    return s(e);
                case wa:
                    e: {
                        if (null !== a) {
                            if (9 === a.tag) {
                                n(e, a.sibling), a = i(a, null, l), a.type = o.value, a["return"] = e, e = a;
                                break e
                            }
                            n(e, a)
                        }
                        a = dt(o, e.internalContextTag, l),
                        a.type = o.value,
                        a["return"] = e,
                        e = a
                    }
                    return s(e);
                case Ca:
                    e: {
                        for (u = o.key; null !== a;) {
                            if (a.key === u) {
                                if (4 === a.tag && a.stateNode.containerInfo === o.containerInfo && a.stateNode.implementation === o.implementation) {
                                    n(e, a.sibling), a = i(a, o.children || [], l), a["return"] = e, e = a;
                                    break e
                                }
                                n(e, a);
                                break
                            }
                            t(e, a), a = a.sibling
                        }
                        a = ft(o, e.internalContextTag, l),
                        a["return"] = e,
                        e = a
                    }
                    return s(e)
            }
            if ("string" == typeof o || "number" == typeof o) return o = "" + o, null !== a && 6 === a.tag ? (n(e, a.sibling), a = i(a, o, l)) : (n(e, a), a = ut(o, e.internalContextTag, l)), a["return"] = e, e = a, s(e);
            if (Sa(o)) return _(e, a, o, l);
            if (kt(o)) return v(e, a, o, l);
            if (u && Tt(e, o), "undefined" == typeof o) switch (e.tag) {
                case 2:
                case 1:
                    l = e.type, r("152", l.displayName || l.name || "Component")
            }
            return n(e, a)
        }
    }

    function Mt(e, t, n, a, i) {
        function o(e, t, n) {
            var r = t.expirationTime;
            t.child = null === e ? Ia(t, null, n, r) : Ta(t, e.child, n, r)
        }

        function s(e, t) {
            var n = t.ref;
            null === n || e && e.ref === n || (t.effectTag |= 128)
        }

        function l(e, t, n, r) {
            if (s(e, t), !n) return r && at(t, !1), c(e, t);
            n = t.stateNode, Ur.current = t;
            var a = n.render();
            return t.effectTag |= 1, o(e, t, a), t.memoizedState = n.state, t.memoizedProps = n.props, r && at(t, !0), t.child
        }

        function u(e) {
            var t = e.stateNode;
            t.pendingContext ? tt(e, t.pendingContext, t.pendingContext !== t.context) : t.context && tt(e, t.context, !1), h(e, t.containerInfo)
        }

        function c(e, t) {
            if (null !== e && t.child !== e.child ? r("153") : void 0, null !== t.child) {
                e = t.child;
                var n = ot(e, e.pendingProps, e.expirationTime);
                for (t.child = n, n["return"] = t; null !== e.sibling;) e = e.sibling, n = n.sibling = ot(e, e.pendingProps, e.expirationTime), n["return"] = t;
                n.sibling = null
            }
            return t.child
        }

        function d(e, t) {
            switch (t.tag) {
                case 3:
                    u(t);
                    break;
                case 2:
                    rt(t);
                    break;
                case 4:
                    h(t, t.stateNode.containerInfo)
            }
            return null
        }
        var f = e.shouldSetTextContent,
            p = e.useSyncScheduling,
            m = e.shouldDeprioritizeSubtree,
            g = t.pushHostContext,
            h = t.pushHostContainer,
            _ = n.enterHydrationState,
            v = n.resetHydrationState,
            b = n.tryToClaimNextHydratableInstance;
        e = Et(a, i, function(e, t) {
            e.memoizedProps = t
        }, function(e, t) {
            e.memoizedState = t
        });
        var y = e.adoptClassInstance,
            w = e.constructClassInstance,
            C = e.mountClassInstance,
            E = e.updateClassInstance;
        return {
            beginWork: function(e, t, n) {
                if (0 === t.expirationTime || t.expirationTime > n) return d(e, t);
                switch (t.tag) {
                    case 0:
                        null !== e ? r("155") : void 0;
                        var a = t.type,
                            i = t.pendingProps,
                            k = Xe(t);
                        return k = Ze(t, k), a = a(i, k), t.effectTag |= 1, "object" == typeof a && null !== a && "function" == typeof a.render ? (t.tag = 2, i = rt(t), y(t, a), C(t, n), t = l(e, t, !0, i)) : (t.tag = 1, o(e, t, a), t.memoizedProps = i, t = t.child), t;
                    case 1:
                        e: {
                            if (i = t.type, n = t.pendingProps, a = t.memoizedProps, ma.current) null === n && (n = a);
                            else if (null === n || a === n) {
                                t = c(e, t);
                                break e
                            }
                            a = Xe(t),
                            a = Ze(t, a),
                            i = i(n, a),
                            t.effectTag |= 1,
                            o(e, t, i),
                            t.memoizedProps = n,
                            t = t.child
                        }
                        return t;
                    case 2:
                        return i = rt(t), a = void 0, null === e ? t.stateNode ? r("153") : (w(t, t.pendingProps), C(t, n), a = !0) : a = E(e, t, n), l(e, t, a, i);
                    case 3:
                        return u(t), i = t.updateQueue, null !== i ? (a = t.memoizedState, i = wt(e, t, i, null, null, n), a === i ? (v(), t = c(e, t)) : (a = i.element, k = t.stateNode, (null === e || null === e.child) && k.hydrate && _(t) ? (t.effectTag |= 2, t.child = Ia(t, null, a, n)) : (v(), o(e, t, a)), t.memoizedState = i, t = t.child)) : (v(), t = c(e, t)), t;
                    case 5:
                        g(t), null === e && b(t), i = t.type;
                        var S = t.memoizedProps;
                        return a = t.pendingProps, null === a && (a = S, null === a ? r("154") : void 0), k = null !== e ? e.memoizedProps : null, ma.current || null !== a && S !== a ? (S = a.children, f(i, a) ? S = null : k && f(i, k) && (t.effectTag |= 16), s(e, t), 2147483647 !== n && !p && m(i, a) ? (t.expirationTime = 2147483647, t = null) : (o(e, t, S), t.memoizedProps = a, t = t.child)) : t = c(e, t), t;
                    case 6:
                        return null === e && b(t), e = t.pendingProps, null === e && (e = t.memoizedProps), t.memoizedProps = e, null;
                    case 8:
                        t.tag = 7;
                    case 7:
                        return i = t.pendingProps, ma.current ? null === i && (i = e && e.memoizedProps, null === i ? r("154") : void 0) : (null === i || t.memoizedProps === i) && (i = t.memoizedProps), a = i.children, t.stateNode = null === e ? Ia(t, t.stateNode, a, n) : Ta(t, t.stateNode, a, n), t.memoizedProps = i, t.stateNode;
                    case 9:
                        return null;
                    case 4:
                        e: {
                            if (h(t, t.stateNode.containerInfo), i = t.pendingProps, ma.current) null === i && (i = e && e.memoizedProps, null == i ? r("154") : void 0);
                            else if (null === i || t.memoizedProps === i) {
                                t = c(e, t);
                                break e
                            }
                            null === e ? t.child = Ta(t, null, i, n) : o(e, t, i),
                            t.memoizedProps = i,
                            t = t.child
                        }
                        return t;
                    case 10:
                        e: {
                            if (n = t.pendingProps, ma.current) null === n && (n = t.memoizedProps);
                            else if (null === n || t.memoizedProps === n) {
                                t = c(e, t);
                                break e
                            }
                            o(e, t, n),
                            t.memoizedProps = n,
                            t = t.child
                        }
                        return t;
                    default:
                        r("156")
                }
            },
            beginFailedWork: function(e, t, n) {
                switch (t.tag) {
                    case 2:
                        rt(t);
                        break;
                    case 3:
                        u(t);
                        break;
                    default:
                        r("157")
                }
                return t.effectTag |= 64, null === e ? t.child = null : t.child !== e.child && (t.child = e.child), 0 === t.expirationTime || t.expirationTime > n ? d(e, t) : (t.firstEffect = null, t.lastEffect = null, t.child = null === e ? Ia(t, null, null, n) : Ta(t, e.child, null, n), 2 === t.tag && (e = t.stateNode, t.memoizedProps = e.props, t.memoizedState = e.state), t.child)
            }
        }
    }

    function Pt(e, t, n) {
        function a(e) {
            e.effectTag |= 4
        }
        var i = e.createInstance,
            o = e.createTextInstance,
            s = e.appendInitialChild,
            l = e.finalizeInitialChildren,
            u = e.prepareUpdate,
            c = e.persistence,
            d = t.getRootHostContainer,
            f = t.popHostContext,
            p = t.getHostContext,
            m = t.popHostContainer,
            g = n.prepareToHydrateHostInstance,
            h = n.prepareToHydrateHostTextInstance,
            _ = n.popHydrationState,
            v = void 0,
            b = void 0,
            y = void 0;
        return e.mutation ? (v = function() {}, b = function(e, t, n) {
            (t.updateQueue = n) && a(t)
        }, y = function(e, t, n, r) {
            n !== r && a(t)
        }) : r(c ? "235" : "236"), {
            completeWork: function(e, t, n) {
                var c = t.pendingProps;
                switch (null === c ? c = t.memoizedProps : (2147483647 !== t.expirationTime || 2147483647 === n) && (t.pendingProps = null), t.tag) {
                    case 1:
                        return null;
                    case 2:
                        return et(t), null;
                    case 3:
                        return m(t), Qe(ma, t), Qe(pa, t), c = t.stateNode, c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (null === e || null === e.child) && (_(t), t.effectTag &= -3), v(t), null;
                    case 5:
                        f(t), n = d();
                        var w = t.type;
                        if (null !== e && null != t.stateNode) {
                            var C = e.memoizedProps,
                                E = t.stateNode,
                                k = p();
                            E = u(E, w, C, c, n, k), b(e, t, E, w, C, c, n), e.ref !== t.ref && (t.effectTag |= 128)
                        } else {
                            if (!c) return null === t.stateNode ? r("166") : void 0, null;
                            if (e = p(), _(t)) g(t, n, e) && a(t);
                            else {
                                e = i(w, c, n, e, t);
                                e: for (C = t.child; null !== C;) {
                                    if (5 === C.tag || 6 === C.tag) s(e, C.stateNode);
                                    else if (4 !== C.tag && null !== C.child) {
                                        C.child["return"] = C, C = C.child;
                                        continue
                                    }
                                    if (C === t) break;
                                    for (; null === C.sibling;) {
                                        if (null === C["return"] || C["return"] === t) break e;
                                        C = C["return"]
                                    }
                                    C.sibling["return"] = C["return"], C = C.sibling
                                }
                                l(e, w, c, n) && a(t), t.stateNode = e
                            }
                            null !== t.ref && (t.effectTag |= 128)
                        }
                        return null;
                    case 6:
                        if (e && null != t.stateNode) y(e, t, e.memoizedProps, c);
                        else {
                            if ("string" != typeof c) return null === t.stateNode ? r("166") : void 0, null;
                            e = d(), n = p(), _(t) ? h(t) && a(t) : t.stateNode = o(c, e, n, t)
                        }
                        return null;
                    case 7:
                        (c = t.memoizedProps) ? void 0: r("165"), t.tag = 8, w = [];
                        e: for ((C = t.stateNode) && (C["return"] = t); null !== C;) {
                            if (5 === C.tag || 6 === C.tag || 4 === C.tag) r("247");
                            else if (9 === C.tag) w.push(C.type);
                            else if (null !== C.child) {
                                C.child["return"] = C, C = C.child;
                                continue
                            }
                            for (; null === C.sibling;) {
                                if (null === C["return"] || C["return"] === t) break e;
                                C = C["return"]
                            }
                            C.sibling["return"] = C["return"], C = C.sibling
                        }
                        return C = c.handler, c = C(c.props, w), t.child = Ta(t, null !== e ? e.child : null, c, n), t.child;
                    case 8:
                        return t.tag = 7, null;
                    case 9:
                        return null;
                    case 10:
                        return null;
                    case 4:
                        return m(t), v(t), null;
                    case 0:
                        r("167");
                    default:
                        r("156")
                }
            }
        }
    }

    function Lt(e, t) {
        function n(e) {
            var n = e.ref;
            if (null !== n) try {
                n(null)
            } catch (r) {
                t(e, r)
            }
        }

        function a(e) {
            switch ("function" == typeof ht && ht(e), e.tag) {
                case 2:
                    n(e);
                    var r = e.stateNode;
                    if ("function" == typeof r.componentWillUnmount) try {
                        r.props = e.memoizedProps, r.state = e.memoizedState, r.componentWillUnmount()
                    } catch (a) {
                        t(e, a)
                    }
                    break;
                case 5:
                    n(e);
                    break;
                case 7:
                    i(e.stateNode);
                    break;
                case 4:
                    u && s(e)
            }
        }

        function i(e) {
            for (var t = e;;)
                if (a(t), null === t.child || u && 4 === t.tag) {
                    if (t === e) break;
                    for (; null === t.sibling;) {
                        if (null === t["return"] || t["return"] === e) return;
                        t = t["return"]
                    }
                    t.sibling["return"] = t["return"], t = t.sibling
                } else t.child["return"] = t, t = t.child
        }

        function o(e) {
            return 5 === e.tag || 3 === e.tag || 4 === e.tag
        }

        function s(e) {
            for (var t = e, n = !1, o = void 0, s = void 0;;) {
                if (!n) {
                    n = t["return"];
                    e: for (;;) {
                        switch (null === n ? r("160") : void 0, n.tag) {
                            case 5:
                                o = n.stateNode, s = !1;
                                break e;
                            case 3:
                                o = n.stateNode.containerInfo, s = !0;
                                break e;
                            case 4:
                                o = n.stateNode.containerInfo, s = !0;
                                break e
                        }
                        n = n["return"]
                    }
                    n = !0
                }
                if (5 === t.tag || 6 === t.tag) i(t), s ? b(o, t.stateNode) : v(o, t.stateNode);
                else if (4 === t.tag ? o = t.stateNode.containerInfo : a(t), null !== t.child) {
                    t.child["return"] = t, t = t.child;
                    continue
                }
                if (t === e) break;
                for (; null === t.sibling;) {
                    if (null === t["return"] || t["return"] === e) return;
                    t = t["return"], 4 === t.tag && (n = !1)
                }
                t.sibling["return"] = t["return"], t = t.sibling
            }
        }
        var l = e.getPublicInstance,
            u = e.mutation;
        e = e.persistence, u || r(e ? "235" : "236");
        var c = u.commitMount,
            d = u.commitUpdate,
            f = u.resetTextContent,
            p = u.commitTextUpdate,
            m = u.appendChild,
            g = u.appendChildToContainer,
            h = u.insertBefore,
            _ = u.insertInContainerBefore,
            v = u.removeChild,
            b = u.removeChildFromContainer;
        return {
            commitResetTextContent: function(e) {
                f(e.stateNode)
            },
            commitPlacement: function(e) {
                e: {
                    for (var t = e["return"]; null !== t;) {
                        if (o(t)) {
                            var n = t;
                            break e
                        }
                        t = t["return"]
                    }
                    r("160"),
                    n = void 0
                }
                var a = t = void 0;
                switch (n.tag) {
                    case 5:
                        t = n.stateNode, a = !1;
                        break;
                    case 3:
                        t = n.stateNode.containerInfo, a = !0;
                        break;
                    case 4:
                        t = n.stateNode.containerInfo, a = !0;
                        break;
                    default:
                        r("161")
                }
                16 & n.effectTag && (f(t), n.effectTag &= -17);e: t: for (n = e;;) {
                    for (; null === n.sibling;) {
                        if (null === n["return"] || o(n["return"])) {
                            n = null;
                            break e
                        }
                        n = n["return"]
                    }
                    for (n.sibling["return"] = n["return"], n = n.sibling; 5 !== n.tag && 6 !== n.tag;) {
                        if (2 & n.effectTag) continue t;
                        if (null === n.child || 4 === n.tag) continue t;
                        n.child["return"] = n, n = n.child
                    }
                    if (!(2 & n.effectTag)) {
                        n = n.stateNode;
                        break e
                    }
                }
                for (var i = e;;) {
                    if (5 === i.tag || 6 === i.tag) n ? a ? _(t, i.stateNode, n) : h(t, i.stateNode, n) : a ? g(t, i.stateNode) : m(t, i.stateNode);
                    else if (4 !== i.tag && null !== i.child) {
                        i.child["return"] = i, i = i.child;
                        continue
                    }
                    if (i === e) break;
                    for (; null === i.sibling;) {
                        if (null === i["return"] || i["return"] === e) return;
                        i = i["return"]
                    }
                    i.sibling["return"] = i["return"], i = i.sibling
                }
            },
            commitDeletion: function(e) {
                s(e), e["return"] = null, e.child = null, e.alternate && (e.alternate.child = null, e.alternate["return"] = null)
            },
            commitWork: function(e, t) {
                switch (t.tag) {
                    case 2:
                        break;
                    case 5:
                        var n = t.stateNode;
                        if (null != n) {
                            var a = t.memoizedProps;
                            e = null !== e ? e.memoizedProps : a;
                            var i = t.type,
                                o = t.updateQueue;
                            t.updateQueue = null, null !== o && d(n, o, i, e, a, t)
                        }
                        break;
                    case 6:
                        null === t.stateNode ? r("162") : void 0, n = t.memoizedProps, p(t.stateNode, null !== e ? e.memoizedProps : n, n);
                        break;
                    case 3:
                        break;
                    default:
                        r("163")
                }
            },
            commitLifeCycles: function(e, t) {
                switch (t.tag) {
                    case 2:
                        var n = t.stateNode;
                        if (4 & t.effectTag)
                            if (null === e) n.props = t.memoizedProps, n.state = t.memoizedState, n.componentDidMount();
                            else {
                                var a = e.memoizedProps;
                                e = e.memoizedState, n.props = t.memoizedProps, n.state = t.memoizedState, n.componentDidUpdate(a, e)
                            }
                        t = t.updateQueue, null !== t && Ct(t, n);
                        break;
                    case 3:
                        n = t.updateQueue, null !== n && Ct(n, null !== t.child ? t.child.stateNode : null);
                        break;
                    case 5:
                        n = t.stateNode, null === e && 4 & t.effectTag && c(n, t.type, t.memoizedProps, t);
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    default:
                        r("163")
                }
            },
            commitAttachRef: function(e) {
                var t = e.ref;
                if (null !== t) {
                    var n = e.stateNode;
                    switch (e.tag) {
                        case 5:
                            t(l(n));
                            break;
                        default:
                            t(n)
                    }
                }
            },
            commitDetachRef: function(e) {
                e = e.ref, null !== e && e(null)
            }
        }
    }

    function Ot(e) {
        function t(e) {
            return e === Ma ? r("174") : void 0, e
        }
        var n = e.getChildHostContext,
            a = e.getRootHostContext,
            i = {
                current: Ma
            },
            o = {
                current: Ma
            },
            s = {
                current: Ma
            };
        return {
            getHostContext: function() {
                return t(i.current)
            },
            getRootHostContainer: function() {
                return t(s.current)
            },
            popHostContainer: function(e) {
                Qe(i, e), Qe(o, e), Qe(s, e)
            },
            popHostContext: function(e) {
                o.current === e && (Qe(i, e), Qe(o, e))
            },
            pushHostContainer: function(e, t) {
                $e(s, t, e), t = a(t), $e(o, e, e), $e(i, t, e)
            },
            pushHostContext: function(e) {
                var r = t(s.current),
                    a = t(i.current);
                r = n(a, e.type, r), a !== r && ($e(o, e, e), $e(i, r, e))
            },
            resetHostContainer: function() {
                i.current = Ma, s.current = Ma
            }
        }
    }

    function At(e) {
        function t(e, t) {
            var n = new it(5, null, 0);
            n.type = "DELETED", n.stateNode = t, n["return"] = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n
        }

        function n(e, t) {
            switch (e.tag) {
                case 5:
                    return t = o(t, e.type, e.pendingProps), null !== t ? (e.stateNode = t, !0) : !1;
                case 6:
                    return t = s(t, e.pendingProps), null !== t ? (e.stateNode = t, !0) : !1;
                default:
                    return !1
            }
        }

        function a(e) {
            for (e = e["return"]; null !== e && 5 !== e.tag && 3 !== e.tag;) e = e["return"];
            f = e
        }
        var i = e.shouldSetTextContent;
        if (e = e.hydration, !e) return {
            enterHydrationState: function() {
                return !1
            },
            resetHydrationState: function() {},
            tryToClaimNextHydratableInstance: function() {},
            prepareToHydrateHostInstance: function() {
                r("175")
            },
            prepareToHydrateHostTextInstance: function() {
                r("176")
            },
            popHydrationState: function() {
                return !1
            }
        };
        var o = e.canHydrateInstance,
            s = e.canHydrateTextInstance,
            l = e.getNextHydratableSibling,
            u = e.getFirstHydratableChild,
            c = e.hydrateInstance,
            d = e.hydrateTextInstance,
            f = null,
            p = null,
            m = !1;
        return {
            enterHydrationState: function(e) {
                return p = u(e.stateNode.containerInfo), f = e, m = !0
            },
            resetHydrationState: function() {
                p = f = null, m = !1
            },
            tryToClaimNextHydratableInstance: function(e) {
                if (m) {
                    var r = p;
                    if (r) {
                        if (!n(e, r)) {
                            if (r = l(r), !r || !n(e, r)) return e.effectTag |= 2, m = !1, void(f = e);
                            t(f, p)
                        }
                        f = e, p = u(r)
                    } else e.effectTag |= 2, m = !1, f = e
                }
            },
            prepareToHydrateHostInstance: function(e, t, n) {
                return t = c(e.stateNode, e.type, e.memoizedProps, t, n, e), e.updateQueue = t, null !== t ? !0 : !1
            },
            prepareToHydrateHostTextInstance: function(e) {
                return d(e.stateNode, e.memoizedProps, e)
            },
            popHydrationState: function(e) {
                if (e !== f) return !1;
                if (!m) return a(e), m = !0, !1;
                var n = e.type;
                if (5 !== e.tag || "head" !== n && "body" !== n && !i(n, e.memoizedProps))
                    for (n = p; n;) t(e, n), n = l(n);
                return a(e), p = f ? l(e.stateNode) : null, !0
            }
        }
    }

    function xt(e) {
        function t(e) {
            ie = Q = !0;
            var t = e.stateNode;
            if (t.current === e ? r("177") : void 0, t.isReadyForCommit = !1, Ur.current = null, 1 < e.effectTag)
                if (null !== e.lastEffect) {
                    e.lastEffect.nextEffect = e;
                    var n = e.firstEffect
                } else n = e;
            else n = e.firstEffect;
            for (V(), J = n; null !== J;) {
                var a = !1,
                    i = void 0;
                try {
                    for (; null !== J;) {
                        var o = J.effectTag;
                        if (16 & o && x(J), 128 & o) {
                            var s = J.alternate;
                            null !== s && F(s)
                        }
                        switch (-242 & o) {
                            case 2:
                                N(J), J.effectTag &= -3;
                                break;
                            case 6:
                                N(J), J.effectTag &= -3, R(J.alternate, J);
                                break;
                            case 4:
                                R(J.alternate, J);
                                break;
                            case 8:
                                oe = !0, D(J), oe = !1
                        }
                        J = J.nextEffect
                    }
                } catch (u) {
                    a = !0, i = u
                }
                a && (null === J ? r("178") : void 0, l(J, i), null !== J && (J = J.nextEffect))
            }
            for (q(), t.current = e, J = n; null !== J;) {
                n = !1, a = void 0;
                try {
                    for (; null !== J;) {
                        var c = J.effectTag;
                        if (36 & c && j(J.alternate, J), 128 & c && B(J), 64 & c) switch (i = J, o = void 0, null !== ee && (o = ee.get(i), ee["delete"](i), null == o && null !== i.alternate && (i = i.alternate, o = ee.get(i), ee["delete"](i))), null == o ? r("184") : void 0, i.tag) {
                            case 2:
                                i.stateNode.componentDidCatch(o.error, {
                                    componentStack: o.componentStack
                                });
                                break;
                            case 3:
                                null === re && (re = o.error);
                                break;
                            default:
                                r("157")
                        }
                        var d = J.nextEffect;
                        J.nextEffect = null, J = d
                    }
                } catch (u) {
                    n = !0, a = u
                }
                n && (null === J ? r("178") : void 0, l(J, a), null !== J && (J = J.nextEffect))
            }
            return Q = ie = !1, "function" == typeof gt && gt(e.stateNode), ne && (ne.forEach(g), ne = null), null !== re && (e = re, re = null, E(e)), t = t.current.expirationTime, 0 === t && (te = ee = null), t
        }

        function n(e) {
            for (;;) {
                var t = A(e.alternate, e, Z),
                    n = e["return"],
                    r = e.sibling,
                    a = e;
                if (2147483647 === Z || 2147483647 !== a.expirationTime) {
                    if (2 !== a.tag && 3 !== a.tag) var i = 0;
                    else i = a.updateQueue, i = null === i ? 0 : i.expirationTime;
                    for (var o = a.child; null !== o;) 0 !== o.expirationTime && (0 === i || i > o.expirationTime) && (i = o.expirationTime),
                        o = o.sibling;
                    a.expirationTime = i
                }
                if (null !== t) return t;
                if (null !== n && (null === n.firstEffect && (n.firstEffect = e.firstEffect), null !== e.lastEffect && (null !== n.lastEffect && (n.lastEffect.nextEffect = e.firstEffect), n.lastEffect = e.lastEffect), 1 < e.effectTag && (null !== n.lastEffect ? n.lastEffect.nextEffect = e : n.firstEffect = e, n.lastEffect = e)), null !== r) return r;
                if (null === n) {
                    e.stateNode.isReadyForCommit = !0;
                    break
                }
                e = n
            }
            return null
        }

        function a(e) {
            var t = L(e.alternate, e, Z);
            return null === t && (t = n(e)), Ur.current = null, t
        }

        function i(e) {
            var t = O(e.alternate, e, Z);
            return null === t && (t = n(e)), Ur.current = null, t
        }

        function o(e) {
            if (null !== ee) {
                if (!(0 === Z || Z > e))
                    if (K >= Z)
                        for (; null !== $;) $ = u($) ? i($) : a($);
                    else
                        for (; null !== $ && !C();) $ = u($) ? i($) : a($)
            } else if (!(0 === Z || Z > e))
                if (K >= Z)
                    for (; null !== $;) $ = a($);
                else
                    for (; null !== $ && !C();) $ = a($)
        }

        function s(e, t) {
            if (Q ? r("243") : void 0, Q = !0, e.isReadyForCommit = !1, e !== X || t !== Z || null === $) {
                for (; fa > -1;) da[fa] = null, fa--;
                ga = Mn, pa.current = Mn, ma.current = !1, M(), X = e, Z = t, $ = ot(X.current, null, t)
            }
            var n = !1,
                a = null;
            try {
                o(t)
            } catch (s) {
                n = !0, a = s
            }
            for (; n;) {
                if (ae) {
                    re = a;
                    break
                }
                var u = $;
                if (null === u) ae = !0;
                else {
                    var c = l(u, a);
                    if (null === c ? r("183") : void 0, !ae) {
                        try {
                            for (n = c, a = t, c = n; null !== u;) {
                                switch (u.tag) {
                                    case 2:
                                        et(u);
                                        break;
                                    case 5:
                                        I(u);
                                        break;
                                    case 3:
                                        T(u);
                                        break;
                                    case 4:
                                        T(u)
                                }
                                if (u === c || u.alternate === c) break;
                                u = u["return"]
                            }
                            $ = i(n), o(a)
                        } catch (s) {
                            n = !0, a = s;
                            continue
                        }
                        break
                    }
                }
            }
            return t = re, ae = Q = !1, re = null, null !== t && E(t), e.isReadyForCommit ? e.current.alternate : null
        }

        function l(e, t) {
            var n = Ur.current = null,
                r = !1,
                a = !1,
                i = null;
            if (3 === e.tag) n = e, c(e) && (ae = !0);
            else
                for (var o = e["return"]; null !== o && null === n;) {
                    if (2 === o.tag ? "function" == typeof o.stateNode.componentDidCatch && (r = !0, i = we(o), n = o, a = !0) : 3 === o.tag && (n = o), c(o)) {
                        if (oe || null !== ne && (ne.has(o) || null !== o.alternate && ne.has(o.alternate))) return null;
                        n = null, a = !1
                    }
                    o = o["return"]
                }
            if (null !== n) {
                null === te && (te = new Set), te.add(n);
                var s = "";
                o = e;
                do {
                    e: switch (o.tag) {
                        case 0:
                        case 1:
                        case 2:
                        case 5:
                            var l = o._debugOwner,
                                u = o._debugSource,
                                d = we(o),
                                f = null;
                            l && (f = we(l)), l = u, d = "\n    in " + (d || "Unknown") + (l ? " (at " + l.fileName.replace(/^.*[\\\/]/, "") + ":" + l.lineNumber + ")" : f ? " (created by " + f + ")" : "");
                            break e;
                        default:
                            d = ""
                    }
                    s += d,
                    o = o["return"]
                } while (o);
                o = s, e = we(e), null === ee && (ee = new Map), t = {
                    componentName: e,
                    componentStack: o,
                    error: t,
                    errorBoundary: r ? n.stateNode : null,
                    errorBoundaryFound: r,
                    errorBoundaryName: i,
                    willRetry: a
                }, ee.set(n, t);
                try {
                    var p = t.error;
                    p && p.suppressReactErrorLogging || console.error(p)
                } catch (m) {
                    m && m.suppressReactErrorLogging || console.error(m)
                }
                return ie ? (null === ne && (ne = new Set), ne.add(n)) : g(n), n
            }
            return null === re && (re = t), null
        }

        function u(e) {
            return null !== ee && (ee.has(e) || null !== e.alternate && ee.has(e.alternate))
        }

        function c(e) {
            return null !== te && (te.has(e) || null !== e.alternate && te.has(e.alternate))
        }

        function d() {
            return 20 * (((h() + 100) / 20 | 0) + 1)
        }

        function f(e) {
            return 0 !== Y ? Y : Q ? ie ? 1 : Z : !G || 1 & e.internalContextTag ? d() : 1
        }

        function p(e, t) {
            return m(e, t, !1)
        }

        function m(e, t) {
            for (; null !== e;) {
                if ((0 === e.expirationTime || e.expirationTime > t) && (e.expirationTime = t), null !== e.alternate && (0 === e.alternate.expirationTime || e.alternate.expirationTime > t) && (e.alternate.expirationTime = t), null === e["return"]) {
                    if (3 !== e.tag) break;
                    var n = e.stateNode;
                    !Q && n === X && Z > t && ($ = X = null, Z = 0);
                    var a = n,
                        i = t;
                    if (Ce > ye && r("185"), null === a.nextScheduledRoot) a.remainingExpirationTime = i, null === le ? (se = le = a, a.nextScheduledRoot = a) : (le = le.nextScheduledRoot = a, le.nextScheduledRoot = se);
                    else {
                        var o = a.remainingExpirationTime;
                        (0 === o || o > i) && (a.remainingExpirationTime = i)
                    }
                    de || (ve ? be && (fe = a, pe = 1, w(fe, pe)) : 1 === i ? y(1, null) : _(i)), !Q && n === X && Z > t && ($ = X = null, Z = 0)
                }
                e = e["return"]
            }
        }

        function g(e) {
            m(e, 1, !0)
        }

        function h() {
            return K = ((H() - W) / 10 | 0) + 2
        }

        function _(e) {
            if (0 !== ue) {
                if (e > ue) return;
                z(ce)
            }
            var t = H() - W;
            ue = e, ce = U(b, {
                timeout: 10 * (e - 2) - t
            })
        }

        function v() {
            var e = 0,
                t = null;
            if (null !== le)
                for (var n = le, a = se; null !== a;) {
                    var i = a.remainingExpirationTime;
                    if (0 === i) {
                        if (null === n || null === le ? r("244") : void 0, a === a.nextScheduledRoot) {
                            se = le = a.nextScheduledRoot = null;
                            break
                        }
                        if (a === se) se = i = a.nextScheduledRoot, le.nextScheduledRoot = i, a.nextScheduledRoot = null;
                        else {
                            if (a === le) {
                                le = n, le.nextScheduledRoot = se, a.nextScheduledRoot = null;
                                break
                            }
                            n.nextScheduledRoot = a.nextScheduledRoot, a.nextScheduledRoot = null
                        }
                        a = n.nextScheduledRoot
                    } else {
                        if ((0 === e || e > i) && (e = i, t = a), a === le) break;
                        n = a, a = a.nextScheduledRoot
                    }
                }
            n = fe, null !== n && n === t ? Ce++ : Ce = 0, fe = t, pe = e
        }

        function b(e) {
            y(0, e)
        }

        function y(e, t) {
            for (_e = t, v(); null !== fe && 0 !== pe && (0 === e || e >= pe) && !me;) w(fe, pe), v();
            if (null !== _e && (ue = 0, ce = -1), 0 !== pe && _(pe), _e = null, me = !1, Ce = 0, ge) throw e = he, he = null, ge = !1, e
        }

        function w(e, n) {
            if (de ? r("245") : void 0, de = !0, n <= h()) {
                var a = e.finishedWork;
                null !== a ? (e.finishedWork = null, e.remainingExpirationTime = t(a)) : (e.finishedWork = null, a = s(e, n), null !== a && (e.remainingExpirationTime = t(a)))
            } else a = e.finishedWork, null !== a ? (e.finishedWork = null, e.remainingExpirationTime = t(a)) : (e.finishedWork = null, a = s(e, n), null !== a && (C() ? e.finishedWork = a : e.remainingExpirationTime = t(a)));
            de = !1
        }

        function C() {
            return null === _e || _e.timeRemaining() > Ee ? !1 : me = !0
        }

        function E(e) {
            null === fe ? r("246") : void 0, fe.remainingExpirationTime = 0, ge || (ge = !0, he = e)
        }
        var k = Ot(e),
            S = At(e),
            T = k.popHostContainer,
            I = k.popHostContext,
            M = k.resetHostContainer,
            P = Mt(e, k, S, p, f),
            L = P.beginWork,
            O = P.beginFailedWork,
            A = Pt(e, k, S).completeWork;
        k = Lt(e, l);
        var x = k.commitResetTextContent,
            N = k.commitPlacement,
            D = k.commitDeletion,
            R = k.commitWork,
            j = k.commitLifeCycles,
            B = k.commitAttachRef,
            F = k.commitDetachRef,
            H = e.now,
            U = e.scheduleDeferredCallback,
            z = e.cancelDeferredCallback,
            G = e.useSyncScheduling,
            V = e.prepareForCommit,
            q = e.resetAfterCommit,
            W = H(),
            K = 2,
            Y = 0,
            Q = !1,
            $ = null,
            X = null,
            Z = 0,
            J = null,
            ee = null,
            te = null,
            ne = null,
            re = null,
            ae = !1,
            ie = !1,
            oe = !1,
            se = null,
            le = null,
            ue = 0,
            ce = -1,
            de = !1,
            fe = null,
            pe = 0,
            me = !1,
            ge = !1,
            he = null,
            _e = null,
            ve = !1,
            be = !1,
            ye = 1e3,
            Ce = 0,
            Ee = 1;
        return {
            computeAsyncExpiration: d,
            computeExpirationForFiber: f,
            scheduleWork: p,
            batchedUpdates: function(e, t) {
                var n = ve;
                ve = !0;
                try {
                    return e(t)
                } finally {
                    (ve = n) || de || y(1, null)
                }
            },
            unbatchedUpdates: function(e) {
                if (ve && !be) {
                    be = !0;
                    try {
                        return e()
                    } finally {
                        be = !1
                    }
                }
                return e()
            },
            flushSync: function(e) {
                var t = ve;
                ve = !0;
                try {
                    e: {
                        var n = Y;Y = 1;
                        try {
                            var a = e();
                            break e
                        } finally {
                            Y = n
                        }
                        a = void 0
                    }
                    return a
                }
                finally {
                    ve = t, de ? r("187") : void 0, y(1, null)
                }
            },
            deferredUpdates: function(e) {
                var t = Y;
                Y = d();
                try {
                    return e()
                } finally {
                    Y = t
                }
            }
        }
    }

    function Nt(e) {
        function t(e) {
            return e = Te(e), null === e ? null : e.stateNode
        }
        var n = e.getPublicInstance;
        e = xt(e);
        var a = e.computeAsyncExpiration,
            i = e.computeExpirationForFiber,
            o = e.scheduleWork;
        return {
            createContainer: function(e, t) {
                var n = new it(3, null, 0);
                return e = {
                    current: n,
                    containerInfo: e,
                    pendingChildren: null,
                    remainingExpirationTime: 0,
                    isReadyForCommit: !1,
                    finishedWork: null,
                    context: null,
                    pendingContext: null,
                    hydrate: t,
                    nextScheduledRoot: null
                }, n.stateNode = e
            },
            updateContainer: function(e, t, n, s) {
                var l = t.current;
                if (n) {
                    n = n._reactInternalFiber;
                    var u;
                    e: {
                        for (2 === Ce(n) && 2 === n.tag ? void 0 : r("170"), u = n; 3 !== u.tag;) {
                            if (Je(u)) {
                                u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                                break e
                            }(u = u["return"]) ? void 0: r("171")
                        }
                        u = u.stateNode.context
                    }
                    n = Je(n) ? nt(n, u) : u
                } else n = Mn;
                null === t.context ? t.context = n : t.pendingContext = n, t = s, t = void 0 === t ? null : t, s = null != e && null != e.type && null != e.type.prototype && !0 === e.type.prototype.unstable_isAsyncReactComponent ? a() : i(l), bt(l, {
                    expirationTime: s,
                    partialState: {
                        element: e
                    },
                    callback: t,
                    isReplace: !1,
                    isForced: !1,
                    nextCallback: null,
                    next: null
                }), o(l, s)
            },
            batchedUpdates: e.batchedUpdates,
            unbatchedUpdates: e.unbatchedUpdates,
            deferredUpdates: e.deferredUpdates,
            flushSync: e.flushSync,
            getPublicRootInstance: function(e) {
                if (e = e.current, !e.child) return null;
                switch (e.child.tag) {
                    case 5:
                        return n(e.child.stateNode);
                    default:
                        return e.child.stateNode
                }
            },
            findHostInstance: t,
            findHostInstanceWithNoPortals: function(e) {
                return e = Ie(e), null === e ? null : e.stateNode
            },
            injectIntoDevTools: function(e) {
                var n = e.findFiberByHostInstance;
                return mt(wn({}, e, {
                    findHostInstanceByFiber: function(e) {
                        return t(e)
                    },
                    findFiberByHostInstance: function(e) {
                        return n ? n(e) : null
                    }
                }))
            }
        }
    }

    function Dt(e, t, n) {
        var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
            $$typeof: Ca,
            key: null == r ? null : "" + r,
            children: e,
            containerInfo: t,
            implementation: n
        }
    }

    function Rt(e) {
        return Ya.hasOwnProperty(e) ? !0 : Ka.hasOwnProperty(e) ? !1 : Wa.test(e) ? Ya[e] = !0 : (Ka[e] = !0, !1)
    }

    function jt(e, t, n) {
        var r = o(t);
        if (r && i(t, n)) {
            var a = r.mutationMethod;
            a ? a(e, n) : null == n || r.hasBooleanValue && !n || r.hasNumericValue && isNaN(n) || r.hasPositiveNumericValue && 1 > n || r.hasOverloadedBooleanValue && !1 === n ? Ft(e, t) : r.mustUseProperty ? e[r.propertyName] = n : (t = r.attributeName, (a = r.attributeNamespace) ? e.setAttributeNS(a, t, "" + n) : r.hasBooleanValue || r.hasOverloadedBooleanValue && !0 === n ? e.setAttribute(t, "") : e.setAttribute(t, "" + n))
        } else Bt(e, t, i(t, n) ? n : null)
    }

    function Bt(e, t, n) {
        Rt(t) && (null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
    }

    function Ft(e, t) {
        var n = o(t);
        n ? (t = n.mutationMethod) ? t(e, void 0) : n.mustUseProperty ? e[n.propertyName] = n.hasBooleanValue ? !1 : "" : e.removeAttribute(n.attributeName) : e.removeAttribute(t)
    }

    function Ht(e, t) {
        var n = t.value,
            r = t.checked;
        return wn({
            type: void 0,
            step: void 0,
            min: void 0,
            max: void 0
        }, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: null != n ? n : e._wrapperState.initialValue,
            checked: null != r ? r : e._wrapperState.initialChecked
        })
    }

    function Ut(e, t) {
        var n = t.defaultValue;
        e._wrapperState = {
            initialChecked: null != t.checked ? t.checked : t.defaultChecked,
            initialValue: null != t.value ? t.value : n,
            controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
        }
    }

    function zt(e, t) {
        t = t.checked, null != t && jt(e, "checked", t)
    }

    function Gt(e, t) {
        zt(e, t);
        var n = t.value;
        null != n ? 0 === n && "" === e.value ? e.value = "0" : "number" === t.type ? (t = parseFloat(e.value) || 0, (n != t || n == t && e.value != n) && (e.value = "" + n)) : e.value !== "" + n && (e.value = "" + n) : (null == t.value && null != t.defaultValue && e.defaultValue !== "" + t.defaultValue && (e.defaultValue = "" + t.defaultValue), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked))
    }

    function Vt(e, t) {
        switch (t.type) {
            case "submit":
            case "reset":
                break;
            case "color":
            case "date":
            case "datetime":
            case "datetime-local":
            case "month":
            case "time":
            case "week":
                e.value = "", e.value = e.defaultValue;
                break;
            default:
                e.value = e.value
        }
        t = e.name, "" !== t && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !e.defaultChecked, "" !== t && (e.name = t)
    }

    function qt(e) {
        var t = "";
        return bn.Children.forEach(e, function(e) {
            null == e || "string" != typeof e && "number" != typeof e || (t += e)
        }), t
    }

    function Wt(e, t) {
        return e = wn({
            children: void 0
        }, t), (t = qt(t.children)) && (e.children = t), e
    }

    function Kt(e, t, n, r) {
        if (e = e.options, t) {
            t = {};
            for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
            for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0)
        } else {
            for (n = "" + n, t = null, a = 0; a < e.length; a++) {
                if (e[a].value === n) return e[a].selected = !0, void(r && (e[a].defaultSelected = !0));
                null !== t || e[a].disabled || (t = e[a])
            }
            null !== t && (t.selected = !0)
        }
    }

    function Yt(e, t) {
        var n = t.value;
        e._wrapperState = {
            initialValue: null != n ? n : t.defaultValue,
            wasMultiple: !!t.multiple
        }
    }

    function Qt(e, t) {
        return null != t.dangerouslySetInnerHTML ? r("91") : void 0, wn({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        })
    }

    function $t(e, t) {
        var n = t.value;
        null == n && (n = t.defaultValue, t = t.children, null != t && (null != n ? r("92") : void 0, Array.isArray(t) && (1 >= t.length ? void 0 : r("93"), t = t[0]), n = "" + t), null == n && (n = "")), e._wrapperState = {
            initialValue: "" + n
        }
    }

    function Xt(e, t) {
        var n = t.value;
        null != n && (n = "" + n, n !== e.value && (e.value = n), null == t.defaultValue && (e.defaultValue = n)), null != t.defaultValue && (e.defaultValue = t.defaultValue)
    }

    function Zt(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && (e.value = t)
    }

    function Jt(e) {
        switch (e) {
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml"
        }
    }

    function en(e, t) {
        return null == e || "http://www.w3.org/1999/xhtml" === e ? Jt(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
    }

    function tn(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
        }
        e.textContent = t
    }

    function nn(e, t) {
        e = e.style;
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                var r = 0 === n.indexOf("--"),
                    a = n,
                    i = t[n];
                a = null == i || "boolean" == typeof i || "" === i ? "" : r || "number" != typeof i || 0 === i || Za.hasOwnProperty(a) && Za[a] ? ("" + i).trim() : i + "px", "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a
            }
    }

    function rn(e, t, n) {
        t && (ei[e] && (null != t.children || null != t.dangerouslySetInnerHTML ? r("137", e, n()) : void 0), null != t.dangerouslySetInnerHTML && (null != t.children ? r("60") : void 0, "object" == typeof t.dangerouslySetInnerHTML && "__html" in t.dangerouslySetInnerHTML ? void 0 : r("61")), null != t.style && "object" != typeof t.style ? r("62", n()) : void 0)
    }

    function an(e, t) {
        if (-1 === e.indexOf("-")) return "string" == typeof t.is;
        switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0
        }
    }

    function on(e, t) {
        e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument;
        var n = De(e);
        t = $n[t];
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            n.hasOwnProperty(a) && n[a] || ("topScroll" === a ? Oe("topScroll", "scroll", e) : "topFocus" === a || "topBlur" === a ? (Oe("topFocus", "focus", e), Oe("topBlur", "blur", e), n.topBlur = !0, n.topFocus = !0) : "topCancel" === a ? (ne("cancel", !0) && Oe("topCancel", "cancel", e), n.topCancel = !0) : "topClose" === a ? (ne("close", !0) && Oe("topClose", "close", e), n.topClose = !0) : Qr.hasOwnProperty(a) && Le(a, Qr[a], e), n[a] = !0)
        }
    }

    function sn(e, t, n, r) {
        return n = 9 === n.nodeType ? n : n.ownerDocument, r === ti && (r = Jt(e)), r === ti ? "script" === e ? (e = n.createElement("div"), e.innerHTML = "<script></script>", e = e.removeChild(e.firstChild)) : e = "string" == typeof t.is ? n.createElement(e, {
            is: t.is
        }) : n.createElement(e) : e = n.createElementNS(r, e), e
    }

    function ln(e, t) {
        return (9 === t.nodeType ? t : t.ownerDocument).createTextNode(e)
    }

    function un(e, t, n, r) {
        var a = an(t, n);
        switch (t) {
            case "iframe":
            case "object":
                Le("topLoad", "load", e);
                var i = n;
                break;
            case "video":
            case "audio":
                for (i in ri) ri.hasOwnProperty(i) && Le(i, ri[i], e);
                i = n;
                break;
            case "source":
                Le("topError", "error", e), i = n;
                break;
            case "img":
            case "image":
                Le("topError", "error", e), Le("topLoad", "load", e), i = n;
                break;
            case "form":
                Le("topReset", "reset", e), Le("topSubmit", "submit", e), i = n;
                break;
            case "details":
                Le("topToggle", "toggle", e), i = n;
                break;
            case "input":
                Ut(e, n), i = Ht(e, n), Le("topInvalid", "invalid", e), on(r, "onChange");
                break;
            case "option":
                i = Wt(e, n);
                break;
            case "select":
                Yt(e, n), i = wn({}, n, {
                    value: void 0
                }), Le("topInvalid", "invalid", e), on(r, "onChange");
                break;
            case "textarea":
                $t(e, n), i = Qt(e, n), Le("topInvalid", "invalid", e), on(r, "onChange");
                break;
            default:
                i = n
        }
        rn(t, i, ni);
        var o, s = i;
        for (o in s)
            if (s.hasOwnProperty(o)) {
                var l = s[o];
                "style" === o ? nn(e, l, ni) : "dangerouslySetInnerHTML" === o ? (l = l ? l.__html : void 0, null != l && Xa(e, l)) : "children" === o ? "string" == typeof l ? ("textarea" !== t || "" !== l) && tn(e, l) : "number" == typeof l && tn(e, "" + l) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (Qn.hasOwnProperty(o) ? null != l && on(r, o) : a ? Bt(e, o, l) : null != l && jt(e, o, l))
            }
        switch (t) {
            case "input":
                ie(e), Vt(e, n);
                break;
            case "textarea":
                ie(e), Zt(e, n);
                break;
            case "option":
                null != n.value && e.setAttribute("value", n.value);
                break;
            case "select":
                e.multiple = !!n.multiple, t = n.value, null != t ? Kt(e, !!n.multiple, t, !1) : null != n.defaultValue && Kt(e, !!n.multiple, n.defaultValue, !0);
                break;
            default:
                "function" == typeof i.onClick && (e.onclick = Cn)
        }
    }

    function cn(e, t, n, r, a) {
        var i = null;
        switch (t) {
            case "input":
                n = Ht(e, n), r = Ht(e, r), i = [];
                break;
            case "option":
                n = Wt(e, n), r = Wt(e, r), i = [];
                break;
            case "select":
                n = wn({}, n, {
                    value: void 0
                }), r = wn({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                n = Qt(e, n), r = Qt(e, r), i = [];
                break;
            default:
                "function" != typeof n.onClick && "function" == typeof r.onClick && (e.onclick = Cn)
        }
        rn(t, r, ni);
        var o, s;
        e = null;
        for (o in n)
            if (!r.hasOwnProperty(o) && n.hasOwnProperty(o) && null != n[o])
                if ("style" === o)
                    for (s in t = n[o]) t.hasOwnProperty(s) && (e || (e = {}), e[s] = "");
                else "dangerouslySetInnerHTML" !== o && "children" !== o && "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (Qn.hasOwnProperty(o) ? i || (i = []) : (i = i || []).push(o, null));
        for (o in r) {
            var l = r[o];
            if (t = null != n ? n[o] : void 0, r.hasOwnProperty(o) && l !== t && (null != l || null != t))
                if ("style" === o)
                    if (t) {
                        for (s in t) !t.hasOwnProperty(s) || l && l.hasOwnProperty(s) || (e || (e = {}), e[s] = "");
                        for (s in l) l.hasOwnProperty(s) && t[s] !== l[s] && (e || (e = {}), e[s] = l[s])
                    } else e || (i || (i = []), i.push(o, e)), e = l;
            else "dangerouslySetInnerHTML" === o ? (l = l ? l.__html : void 0, t = t ? t.__html : void 0, null != l && t !== l && (i = i || []).push(o, "" + l)) : "children" === o ? t === l || "string" != typeof l && "number" != typeof l || (i = i || []).push(o, "" + l) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && (Qn.hasOwnProperty(o) ? (null != l && on(a, o), i || t === l || (i = [])) : (i = i || []).push(o, l))
        }
        return e && (i = i || []).push("style", e), i
    }

    function dn(e, t, n, r, a) {
        "input" === n && "radio" === a.type && null != a.name && zt(e, a), an(n, r), r = an(n, a);
        for (var i = 0; i < t.length; i += 2) {
            var o = t[i],
                s = t[i + 1];
            "style" === o ? nn(e, s, ni) : "dangerouslySetInnerHTML" === o ? Xa(e, s) : "children" === o ? tn(e, s) : r ? null != s ? Bt(e, o, s) : e.removeAttribute(o) : null != s ? jt(e, o, s) : Ft(e, o)
        }
        switch (n) {
            case "input":
                Gt(e, a);
                break;
            case "textarea":
                Xt(e, a);
                break;
            case "select":
                e._wrapperState.initialValue = void 0, t = e._wrapperState.wasMultiple, e._wrapperState.wasMultiple = !!a.multiple, n = a.value, null != n ? Kt(e, !!a.multiple, n, !1) : t !== !!a.multiple && (null != a.defaultValue ? Kt(e, !!a.multiple, a.defaultValue, !0) : Kt(e, !!a.multiple, a.multiple ? [] : "", !1))
        }
    }

    function fn(e, t, n, r, a) {
        switch (t) {
            case "iframe":
            case "object":
                Le("topLoad", "load", e);
                break;
            case "video":
            case "audio":
                for (var i in ri) ri.hasOwnProperty(i) && Le(i, ri[i], e);
                break;
            case "source":
                Le("topError", "error", e);
                break;
            case "img":
            case "image":
                Le("topError", "error", e), Le("topLoad", "load", e);
                break;
            case "form":
                Le("topReset", "reset", e), Le("topSubmit", "submit", e);
                break;
            case "details":
                Le("topToggle", "toggle", e);
                break;
            case "input":
                Ut(e, n), Le("topInvalid", "invalid", e), on(a, "onChange");
                break;
            case "select":
                Yt(e, n), Le("topInvalid", "invalid", e), on(a, "onChange");
                break;
            case "textarea":
                $t(e, n), Le("topInvalid", "invalid", e), on(a, "onChange")
        }
        rn(t, n, ni), r = null;
        for (var o in n) n.hasOwnProperty(o) && (i = n[o], "children" === o ? "string" == typeof i ? e.textContent !== i && (r = ["children", i]) : "number" == typeof i && e.textContent !== "" + i && (r = ["children", "" + i]) : Qn.hasOwnProperty(o) && null != i && on(a, o));
        switch (t) {
            case "input":
                ie(e), Vt(e, n);
                break;
            case "textarea":
                ie(e), Zt(e, n);
                break;
            case "select":
            case "option":
                break;
            default:
                "function" == typeof n.onClick && (e.onclick = Cn)
        }
        return r
    }

    function pn(e, t) {
        return e.nodeValue !== t
    }

    function mn(e) {
        return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    }

    function gn(e) {
        return e = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null, !(!e || 1 !== e.nodeType || !e.hasAttribute("data-reactroot"))
    }

    function hn(e, t, n, a, i) {
        mn(n) ? void 0 : r("200");
        var o = n._reactRootContainer;
        if (o) si.updateContainer(t, o, e, i);
        else {
            if (a = a || gn(n), !a)
                for (o = void 0; o = n.lastChild;) n.removeChild(o);
            var s = si.createContainer(n, a);
            o = n._reactRootContainer = s, si.unbatchedUpdates(function() {
                si.updateContainer(t, s, e, i)
            })
        }
        return si.getPublicRootInstance(o)
    }

    function _n(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        return mn(t) ? void 0 : r("200"), Dt(e, t, null, n)
    }

    function vn(e, t) {
        this._reactRootContainer = si.createContainer(e, t)
    }
    var bn = n(180),
        yn = n(184),
        wn = n(9),
        Cn = n(47),
        En = n(105),
        kn = n(175),
        Sn = n(114),
        Tn = n(58),
        In = n(60),
        Mn = n(124);
    bn ? void 0 : r("227");
    var Pn = {
            children: !0,
            dangerouslySetInnerHTML: !0,
            defaultValue: !0,
            defaultChecked: !0,
            innerHTML: !0,
            suppressContentEditableWarning: !0,
            suppressHydrationWarning: !0,
            style: !0
        },
        Ln = {
            MUST_USE_PROPERTY: 1,
            HAS_BOOLEAN_VALUE: 4,
            HAS_NUMERIC_VALUE: 8,
            HAS_POSITIVE_NUMERIC_VALUE: 24,
            HAS_OVERLOADED_BOOLEAN_VALUE: 32,
            HAS_STRING_BOOLEAN_VALUE: 64,
            injectDOMPropertyConfig: function(e) {
                var t = Ln,
                    n = e.Properties || {},
                    i = e.DOMAttributeNamespaces || {},
                    o = e.DOMAttributeNames || {};
                e = e.DOMMutationMethods || {};
                for (var s in n) {
                    On.hasOwnProperty(s) ? r("48", s) : void 0;
                    var l = s.toLowerCase(),
                        u = n[s];
                    l = {
                        attributeName: l,
                        attributeNamespace: null,
                        propertyName: s,
                        mutationMethod: null,
                        mustUseProperty: a(u, t.MUST_USE_PROPERTY),
                        hasBooleanValue: a(u, t.HAS_BOOLEAN_VALUE),
                        hasNumericValue: a(u, t.HAS_NUMERIC_VALUE),
                        hasPositiveNumericValue: a(u, t.HAS_POSITIVE_NUMERIC_VALUE),
                        hasOverloadedBooleanValue: a(u, t.HAS_OVERLOADED_BOOLEAN_VALUE),
                        hasStringBooleanValue: a(u, t.HAS_STRING_BOOLEAN_VALUE)
                    }, 1 >= l.hasBooleanValue + l.hasNumericValue + l.hasOverloadedBooleanValue ? void 0 : r("50", s), o.hasOwnProperty(s) && (l.attributeName = o[s]), i.hasOwnProperty(s) && (l.attributeNamespace = i[s]), e.hasOwnProperty(s) && (l.mutationMethod = e[s]), On[s] = l
                }
            }
        },
        On = {},
        An = Ln,
        xn = An.MUST_USE_PROPERTY,
        Nn = An.HAS_BOOLEAN_VALUE,
        Dn = An.HAS_NUMERIC_VALUE,
        Rn = An.HAS_POSITIVE_NUMERIC_VALUE,
        jn = An.HAS_OVERLOADED_BOOLEAN_VALUE,
        Bn = An.HAS_STRING_BOOLEAN_VALUE,
        Fn = {
            Properties: {
                allowFullScreen: Nn,
                async: Nn,
                autoFocus: Nn,
                autoPlay: Nn,
                capture: jn,
                checked: xn | Nn,
                cols: Rn,
                contentEditable: Bn,
                controls: Nn,
                "default": Nn,
                defer: Nn,
                disabled: Nn,
                download: jn,
                draggable: Bn,
                formNoValidate: Nn,
                hidden: Nn,
                loop: Nn,
                multiple: xn | Nn,
                muted: xn | Nn,
                noValidate: Nn,
                open: Nn,
                playsInline: Nn,
                readOnly: Nn,
                required: Nn,
                reversed: Nn,
                rows: Rn,
                rowSpan: Dn,
                scoped: Nn,
                seamless: Nn,
                selected: xn | Nn,
                size: Rn,
                start: Dn,
                span: Rn,
                spellCheck: Bn,
                style: 0,
                tabIndex: 0,
                itemScope: Nn,
                acceptCharset: 0,
                className: 0,
                htmlFor: 0,
                httpEquiv: 0,
                value: Bn
            },
            DOMAttributeNames: {
                acceptCharset: "accept-charset",
                className: "class",
                htmlFor: "for",
                httpEquiv: "http-equiv"
            },
            DOMMutationMethods: {
                value: function(e, t) {
                    return null == t ? e.removeAttribute("value") : void("number" !== e.type || !1 === e.hasAttribute("value") ? e.setAttribute("value", "" + t) : e.validity && !e.validity.badInput && e.ownerDocument.activeElement !== e && e.setAttribute("value", "" + t))
                }
            }
        },
        Hn = An.HAS_STRING_BOOLEAN_VALUE,
        Un = {
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace"
        },
        zn = {
            Properties: {
                autoReverse: Hn,
                externalResourcesRequired: Hn,
                preserveAlpha: Hn
            },
            DOMAttributeNames: {
                autoReverse: "autoReverse",
                externalResourcesRequired: "externalResourcesRequired",
                preserveAlpha: "preserveAlpha"
            },
            DOMAttributeNamespaces: {
                xlinkActuate: Un.xlink,
                xlinkArcrole: Un.xlink,
                xlinkHref: Un.xlink,
                xlinkRole: Un.xlink,
                xlinkShow: Un.xlink,
                xlinkTitle: Un.xlink,
                xlinkType: Un.xlink,
                xmlBase: Un.xml,
                xmlLang: Un.xml,
                xmlSpace: Un.xml
            }
        },
        Gn = /[\-\:]([a-z])/g;
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(e) {
        var t = e.replace(Gn, s);
        zn.Properties[t] = 0, zn.DOMAttributeNames[t] = e
    }), An.injectDOMPropertyConfig(Fn), An.injectDOMPropertyConfig(zn);
    var Vn = {
            _caughtError: null,
            _hasCaughtError: !1,
            _rethrowError: null,
            _hasRethrowError: !1,
            injection: {
                injectErrorUtils: function(e) {
                    "function" != typeof e.invokeGuardedCallback ? r("197") : void 0, l = e.invokeGuardedCallback
                }
            },
            invokeGuardedCallback: function(e, t, n, r, a, i, o, s, u) {
                l.apply(Vn, arguments)
            },
            invokeGuardedCallbackAndCatchFirstError: function(e, t, n, r, a, i, o, s, l) {
                if (Vn.invokeGuardedCallback.apply(this, arguments), Vn.hasCaughtError()) {
                    var u = Vn.clearCaughtError();
                    Vn._hasRethrowError || (Vn._hasRethrowError = !0, Vn._rethrowError = u)
                }
            },
            rethrowCaughtError: function() {
                return u.apply(Vn, arguments)
            },
            hasCaughtError: function() {
                return Vn._hasCaughtError
            },
            clearCaughtError: function() {
                if (Vn._hasCaughtError) {
                    var e = Vn._caughtError;
                    return Vn._caughtError = null, Vn._hasCaughtError = !1, e
                }
                r("198")
            }
        },
        qn = null,
        Wn = {},
        Kn = [],
        Yn = {},
        Qn = {},
        $n = {},
        Xn = Object.freeze({
            plugins: Kn,
            eventNameDispatchConfigs: Yn,
            registrationNameModules: Qn,
            registrationNameDependencies: $n,
            possibleRegistrationNames: null,
            injectEventPluginOrder: f,
            injectEventPluginsByName: p
        }),
        Zn = null,
        Jn = null,
        er = null,
        tr = null,
        nr = {
            injectEventPluginOrder: f,
            injectEventPluginsByName: p
        },
        rr = Object.freeze({
            injection: nr,
            getListener: y,
            extractEvents: w,
            enqueueEvents: C,
            processEventQueue: E
        }),
        ar = Math.random().toString(36).slice(2),
        ir = "__reactInternalInstance$" + ar,
        or = "__reactEventHandlers$" + ar,
        sr = Object.freeze({
            precacheFiberNode: function(e, t) {
                t[ir] = e
            },
            getClosestInstanceFromNode: k,
            getInstanceFromNode: function(e) {
                return e = e[ir], !e || 5 !== e.tag && 6 !== e.tag ? null : e
            },
            getNodeFromInstance: S,
            getFiberCurrentPropsFromNode: T,
            updateFiberProps: function(e, t) {
                e[or] = t
            }
        }),
        lr = Object.freeze({
            accumulateTwoPhaseDispatches: N,
            accumulateTwoPhaseDispatchesSkipTarget: function(e) {
                h(e, O)
            },
            accumulateEnterLeaveDispatches: D,
            accumulateDirectDispatches: function(e) {
                h(e, x)
            }
        }),
        ur = null,
        cr = {
            _root: null,
            _startText: null,
            _fallbackText: null
        },
        dr = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
        fr = {
            type: null,
            target: null,
            currentTarget: Cn.thatReturnsNull,
            eventPhase: null,
            bubbles: null,
            cancelable: null,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: null,
            isTrusted: null
        };
    wn(F.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = Cn.thatReturnsTrue)
        },
        stopPropagation: function() {
            var e = this.nativeEvent;
            e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = Cn.thatReturnsTrue)
        },
        persist: function() {
            this.isPersistent = Cn.thatReturnsTrue
        },
        isPersistent: Cn.thatReturnsFalse,
        destructor: function() {
            var e, t = this.constructor.Interface;
            for (e in t) this[e] = null;
            for (t = 0; t < dr.length; t++) this[dr[t]] = null
        }
    }), F.Interface = fr, F.augmentClass = function(e, t) {
        function n() {}
        n.prototype = this.prototype;
        var r = new n;
        wn(r, e.prototype), e.prototype = r, e.prototype.constructor = e, e.Interface = wn({}, this.Interface, t), e.augmentClass = this.augmentClass, z(e)
    }, z(F), F.augmentClass(G, {
        data: null
    }), F.augmentClass(V, {
        data: null
    });
    var pr = [9, 13, 27, 32],
        mr = yn.canUseDOM && "CompositionEvent" in window,
        gr = null;
    yn.canUseDOM && "documentMode" in document && (gr = document.documentMode);
    var hr;
    if (hr = yn.canUseDOM && "TextEvent" in window && !gr) {
        var _r = window.opera;
        hr = !("object" == typeof _r && "function" == typeof _r.version && 12 >= parseInt(_r.version(), 10))
    }
    var vr, br = hr,
        yr = yn.canUseDOM && (!mr || gr && gr > 8 && 11 >= gr),
        wr = String.fromCharCode(32),
        Cr = {
            beforeInput: {
                phasedRegistrationNames: {
                    bubbled: "onBeforeInput",
                    captured: "onBeforeInputCapture"
                },
                dependencies: ["topCompositionEnd", "topKeyPress", "topTextInput", "topPaste"]
            },
            compositionEnd: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionEnd",
                    captured: "onCompositionEndCapture"
                },
                dependencies: "topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")
            },
            compositionStart: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionStart",
                    captured: "onCompositionStartCapture"
                },
                dependencies: "topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")
            },
            compositionUpdate: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionUpdate",
                    captured: "onCompositionUpdateCapture"
                },
                dependencies: "topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")
            }
        },
        Er = !1,
        kr = !1,
        Sr = {
            eventTypes: Cr,
            extractEvents: function(e, t, n, r) {
                var a;
                if (mr) e: {
                    switch (e) {
                        case "topCompositionStart":
                            var i = Cr.compositionStart;
                            break e;
                        case "topCompositionEnd":
                            i = Cr.compositionEnd;
                            break e;
                        case "topCompositionUpdate":
                            i = Cr.compositionUpdate;
                            break e
                    }
                    i = void 0
                }
                else kr ? q(e, n) && (i = Cr.compositionEnd) : "topKeyDown" === e && 229 === n.keyCode && (i = Cr.compositionStart);
                return i ? (yr && (kr || i !== Cr.compositionStart ? i === Cr.compositionEnd && kr && (a = j()) : (cr._root = r, cr._startText = B(), kr = !0)), i = G.getPooled(i, t, n, r), a ? i.data = a : (a = W(n), null !== a && (i.data = a)), N(i), a = i) : a = null, (e = br ? K(e, n) : Y(e, n)) ? (t = V.getPooled(Cr.beforeInput, t, n, r), t.data = e, N(t)) : t = null, [a, t]
            }
        },
        Tr = null,
        Ir = null,
        Mr = null,
        Pr = {
            injectFiberControlledHostComponent: function(e) {
                Tr = e
            }
        },
        Lr = Object.freeze({
            injection: Pr,
            enqueueStateRestore: $,
            restoreStateIfNeeded: X
        }),
        Or = !1,
        Ar = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        };
    yn.canUseDOM && (vr = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""));
    var xr = {
            change: {
                phasedRegistrationNames: {
                    bubbled: "onChange",
                    captured: "onChangeCapture"
                },
                dependencies: "topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")
            }
        },
        Nr = null,
        Dr = null,
        Rr = !1;
    yn.canUseDOM && (Rr = ne("input") && (!document.documentMode || 9 < document.documentMode));
    var jr = {
        eventTypes: xr,
        _isInputEventSupported: Rr,
        extractEvents: function(e, t, n, r) {
            var a = t ? S(t) : window,
                i = a.nodeName && a.nodeName.toLowerCase();
            if ("select" === i || "input" === i && "file" === a.type) var o = ce;
            else if (ee(a))
                if (Rr) o = he;
                else {
                    o = me;
                    var s = pe
                }
            else i = a.nodeName, !i || "input" !== i.toLowerCase() || "checkbox" !== a.type && "radio" !== a.type || (o = ge);
            return o && (o = o(e, t)) ? se(o, n, r) : (s && s(e, a, t), void("topBlur" === e && null != t && (e = t._wrapperState || a._wrapperState) && e.controlled && "number" === a.type && (e = "" + a.value, a.getAttribute("value") !== e && a.setAttribute("value", e))))
        }
    };
    F.augmentClass(_e, {
        view: null,
        detail: null
    });
    var Br = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    _e.augmentClass(ye, {
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: be,
        button: null,
        buttons: null,
        relatedTarget: function(e) {
            return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
        }
    });
    var Fr = {
            mouseEnter: {
                registrationName: "onMouseEnter",
                dependencies: ["topMouseOut", "topMouseOver"]
            },
            mouseLeave: {
                registrationName: "onMouseLeave",
                dependencies: ["topMouseOut", "topMouseOver"]
            }
        },
        Hr = {
            eventTypes: Fr,
            extractEvents: function(e, t, n, r) {
                if ("topMouseOver" === e && (n.relatedTarget || n.fromElement) || "topMouseOut" !== e && "topMouseOver" !== e) return null;
                var a = r.window === r ? r : (a = r.ownerDocument) ? a.defaultView || a.parentWindow : window;
                if ("topMouseOut" === e ? (e = t, t = (t = n.relatedTarget || n.toElement) ? k(t) : null) : e = null, e === t) return null;
                var i = null == e ? a : S(e);
                a = null == t ? a : S(t);
                var o = ye.getPooled(Fr.mouseLeave, e, n, r);
                return o.type = "mouseleave", o.target = i, o.relatedTarget = a, n = ye.getPooled(Fr.mouseEnter, t, n, r), n.type = "mouseenter", n.target = a, n.relatedTarget = i, D(o, n, e, t), [o, n]
            }
        },
        Ur = bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        zr = [],
        Gr = !0,
        Vr = void 0,
        qr = Object.freeze({
            get _enabled() {
                return Gr
            },
            get _handleTopLevel() {
                return Vr
            },
            setHandleTopLevel: function(e) {
                Vr = e
            },
            setEnabled: Pe,
            isEnabled: function() {
                return Gr
            },
            trapBubbledEvent: Le,
            trapCapturedEvent: Oe,
            dispatchEvent: Ae
        }),
        Wr = {
            animationend: xe("Animation", "AnimationEnd"),
            animationiteration: xe("Animation", "AnimationIteration"),
            animationstart: xe("Animation", "AnimationStart"),
            transitionend: xe("Transition", "TransitionEnd")
        },
        Kr = {},
        Yr = {};
    yn.canUseDOM && (Yr = document.createElement("div").style, "AnimationEvent" in window || (delete Wr.animationend.animation, delete Wr.animationiteration.animation, delete Wr.animationstart.animation), "TransitionEvent" in window || delete Wr.transitionend.transition);
    var Qr = {
            topAbort: "abort",
            topAnimationEnd: Ne("animationend") || "animationend",
            topAnimationIteration: Ne("animationiteration") || "animationiteration",
            topAnimationStart: Ne("animationstart") || "animationstart",
            topBlur: "blur",
            topCancel: "cancel",
            topCanPlay: "canplay",
            topCanPlayThrough: "canplaythrough",
            topChange: "change",
            topClick: "click",
            topClose: "close",
            topCompositionEnd: "compositionend",
            topCompositionStart: "compositionstart",
            topCompositionUpdate: "compositionupdate",
            topContextMenu: "contextmenu",
            topCopy: "copy",
            topCut: "cut",
            topDoubleClick: "dblclick",
            topDrag: "drag",
            topDragEnd: "dragend",
            topDragEnter: "dragenter",
            topDragExit: "dragexit",
            topDragLeave: "dragleave",
            topDragOver: "dragover",
            topDragStart: "dragstart",
            topDrop: "drop",
            topDurationChange: "durationchange",
            topEmptied: "emptied",
            topEncrypted: "encrypted",
            topEnded: "ended",
            topError: "error",
            topFocus: "focus",
            topInput: "input",
            topKeyDown: "keydown",
            topKeyPress: "keypress",
            topKeyUp: "keyup",
            topLoadedData: "loadeddata",
            topLoad: "load",
            topLoadedMetadata: "loadedmetadata",
            topLoadStart: "loadstart",
            topMouseDown: "mousedown",
            topMouseMove: "mousemove",
            topMouseOut: "mouseout",
            topMouseOver: "mouseover",
            topMouseUp: "mouseup",
            topPaste: "paste",
            topPause: "pause",
            topPlay: "play",
            topPlaying: "playing",
            topProgress: "progress",
            topRateChange: "ratechange",
            topScroll: "scroll",
            topSeeked: "seeked",
            topSeeking: "seeking",
            topSelectionChange: "selectionchange",
            topStalled: "stalled",
            topSuspend: "suspend",
            topTextInput: "textInput",
            topTimeUpdate: "timeupdate",
            topToggle: "toggle",
            topTouchCancel: "touchcancel",
            topTouchEnd: "touchend",
            topTouchMove: "touchmove",
            topTouchStart: "touchstart",
            topTransitionEnd: Ne("transitionend") || "transitionend",
            topVolumeChange: "volumechange",
            topWaiting: "waiting",
            topWheel: "wheel"
        },
        $r = {},
        Xr = 0,
        Zr = "_reactListenersID" + ("" + Math.random()).slice(2),
        Jr = yn.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
        ea = {
            select: {
                phasedRegistrationNames: {
                    bubbled: "onSelect",
                    captured: "onSelectCapture"
                },
                dependencies: "topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")
            }
        },
        ta = null,
        na = null,
        ra = null,
        aa = !1,
        ia = {
            eventTypes: ea,
            extractEvents: function(e, t, n, r) {
                var a, i = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;
                if (!(a = !i)) {
                    e: {
                        i = De(i),
                        a = $n.onSelect;
                        for (var o = 0; o < a.length; o++) {
                            var s = a[o];
                            if (!i.hasOwnProperty(s) || !i[s]) {
                                i = !1;
                                break e
                            }
                        }
                        i = !0
                    }
                    a = !i
                }
                if (a) return null;
                switch (i = t ? S(t) : window, e) {
                    case "topFocus":
                        (ee(i) || "true" === i.contentEditable) && (ta = i, na = t, ra = null);
                        break;
                    case "topBlur":
                        ra = na = ta = null;
                        break;
                    case "topMouseDown":
                        aa = !0;
                        break;
                    case "topContextMenu":
                    case "topMouseUp":
                        return aa = !1, Fe(n, r);
                    case "topSelectionChange":
                        if (Jr) break;
                    case "topKeyDown":
                    case "topKeyUp":
                        return Fe(n, r)
                }
                return null
            }
        };
    F.augmentClass(He, {
        animationName: null,
        elapsedTime: null,
        pseudoElement: null
    }), F.augmentClass(Ue, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }), _e.augmentClass(ze, {
        relatedTarget: null
    });
    var oa = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        },
        sa = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        };
    _e.augmentClass(Ve, {
        key: function(e) {
            if (e.key) {
                var t = oa[e.key] || e.key;
                if ("Unidentified" !== t) return t
            }
            return "keypress" === e.type ? (e = Ge(e), 13 === e ? "Enter" : String.fromCharCode(e)) : "keydown" === e.type || "keyup" === e.type ? sa[e.keyCode] || "Unidentified" : ""
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: be,
        charCode: function(e) {
            return "keypress" === e.type ? Ge(e) : 0
        },
        keyCode: function(e) {
            return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
        },
        which: function(e) {
            return "keypress" === e.type ? Ge(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
        }
    }), ye.augmentClass(qe, {
        dataTransfer: null
    }), _e.augmentClass(We, {
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: be
    }), F.augmentClass(Ke, {
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null
    }), ye.augmentClass(Ye, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: null,
        deltaMode: null
    });
    var la = {},
        ua = {};
    "abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(e) {
        var t = e[0].toUpperCase() + e.slice(1),
            n = "on" + t;
        t = "top" + t, n = {
            phasedRegistrationNames: {
                bubbled: n,
                captured: n + "Capture"
            },
            dependencies: [t]
        }, la[e] = n, ua[t] = n
    });
    var ca = {
        eventTypes: la,
        extractEvents: function(e, t, n, r) {
            var a = ua[e];
            if (!a) return null;
            switch (e) {
                case "topKeyPress":
                    if (0 === Ge(n)) return null;
                case "topKeyDown":
                case "topKeyUp":
                    e = Ve;
                    break;
                case "topBlur":
                case "topFocus":
                    e = ze;
                    break;
                case "topClick":
                    if (2 === n.button) return null;
                case "topDoubleClick":
                case "topMouseDown":
                case "topMouseMove":
                case "topMouseUp":
                case "topMouseOut":
                case "topMouseOver":
                case "topContextMenu":
                    e = ye;
                    break;
                case "topDrag":
                case "topDragEnd":
                case "topDragEnter":
                case "topDragExit":
                case "topDragLeave":
                case "topDragOver":
                case "topDragStart":
                case "topDrop":
                    e = qe;
                    break;
                case "topTouchCancel":
                case "topTouchEnd":
                case "topTouchMove":
                case "topTouchStart":
                    e = We;
                    break;
                case "topAnimationEnd":
                case "topAnimationIteration":
                case "topAnimationStart":
                    e = He;
                    break;
                case "topTransitionEnd":
                    e = Ke;
                    break;
                case "topScroll":
                    e = _e;
                    break;
                case "topWheel":
                    e = Ye;
                    break;
                case "topCopy":
                case "topCut":
                case "topPaste":
                    e = Ue;
                    break;
                default:
                    e = F
            }
            return t = e.getPooled(a, t, n, r), N(t), t
        }
    };
    Vr = function(e, t, n, r) {
        e = w(e, t, n, r), C(e), E(!1)
    }, nr.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), Zn = sr.getFiberCurrentPropsFromNode, Jn = sr.getInstanceFromNode, er = sr.getNodeFromInstance, nr.injectEventPluginsByName({
        SimpleEventPlugin: ca,
        EnterLeaveEventPlugin: Hr,
        ChangeEventPlugin: jr,
        SelectEventPlugin: ia,
        BeforeInputEventPlugin: Sr
    });
    var da = [],
        fa = -1;
    new Set;
    var pa = {
            current: Mn
        },
        ma = {
            current: !1
        },
        ga = Mn,
        ha = null,
        _a = null,
        va = "function" == typeof Symbol && Symbol["for"],
        ba = va ? Symbol["for"]("react.element") : 60103,
        ya = va ? Symbol["for"]("react.call") : 60104,
        wa = va ? Symbol["for"]("react.return") : 60105,
        Ca = va ? Symbol["for"]("react.portal") : 60106,
        Ea = va ? Symbol["for"]("react.fragment") : 60107,
        ka = "function" == typeof Symbol && Symbol.iterator,
        Sa = Array.isArray,
        Ta = It(!0),
        Ia = It(!1),
        Ma = {},
        Pa = Object.freeze({
            "default": Nt
        }),
        La = Pa && Nt || Pa,
        Oa = La["default"] ? La["default"] : La,
        Aa = "object" == typeof performance && "function" == typeof performance.now,
        xa = void 0;
    xa = Aa ? function() {
        return performance.now()
    } : function() {
        return Date.now()
    };
    var Na = void 0,
        Da = void 0;
    if (yn.canUseDOM)
        if ("function" != typeof requestIdleCallback || "function" != typeof cancelIdleCallback) {
            var Ra, ja = null,
                Ba = !1,
                Fa = -1,
                Ha = !1,
                Ua = 0,
                za = 33,
                Ga = 33;
            Ra = Aa ? {
                didTimeout: !1,
                timeRemaining: function() {
                    var e = Ua - performance.now();
                    return e > 0 ? e : 0
                }
            } : {
                didTimeout: !1,
                timeRemaining: function() {
                    var e = Ua - Date.now();
                    return e > 0 ? e : 0
                }
            };
            var Va = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
            window.addEventListener("message", function(e) {
                if (e.source === window && e.data === Va) {
                    if (Ba = !1, e = xa(), 0 >= Ua - e) {
                        if (!(-1 !== Fa && e >= Fa)) return void(Ha || (Ha = !0, requestAnimationFrame(qa)));
                        Ra.didTimeout = !0
                    } else Ra.didTimeout = !1;
                    Fa = -1, e = ja, ja = null, null !== e && e(Ra)
                }
            }, !1);
            var qa = function(e) {
                Ha = !1;
                var t = e - Ua + Ga;
                Ga > t && Ga > za ? (8 > t && (t = 8), Ga = za > t ? za : t) : za = t, Ua = e + Ga, Ba || (Ba = !0, window.postMessage(Va, "*"))
            };
            Na = function(e, t) {
                return ja = e, null != t && "number" == typeof t.timeout && (Fa = xa() + t.timeout), Ha || (Ha = !0, requestAnimationFrame(qa)), 0
            }, Da = function() {
                ja = null, Ba = !1, Fa = -1
            }
        } else Na = window.requestIdleCallback, Da = window.cancelIdleCallback;
    else Na = function(e) {
        return setTimeout(function() {
            e({
                timeRemaining: function() {
                    return 1 / 0
                }
            })
        })
    }, Da = function(e) {
        clearTimeout(e)
    };
    var Wa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        Ka = {},
        Ya = {},
        Qa = {
            html: "http://www.w3.org/1999/xhtml",
            mathml: "http://www.w3.org/1998/Math/MathML",
            svg: "http://www.w3.org/2000/svg"
        },
        $a = void 0,
        Xa = function(e) {
            return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
                MSApp.execUnsafeLocalFunction(function() {
                    return e(t, n, r, a)
                })
            } : e
        }(function(e, t) {
            if (e.namespaceURI !== Qa.svg || "innerHTML" in e) e.innerHTML = t;
            else {
                for ($a = $a || document.createElement("div"), $a.innerHTML = "<svg>" + t + "</svg>", t = $a.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                for (; t.firstChild;) e.appendChild(t.firstChild)
            }
        }),
        Za = {
            animationIterationCount: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0
        },
        Ja = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Za).forEach(function(e) {
        Ja.forEach(function(t) {
            t = t + e.charAt(0).toUpperCase() + e.substring(1), Za[t] = Za[e]
        })
    });
    var ei = wn({
            menuitem: !0
        }, {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0
        }),
        ti = Qa.html,
        ni = Cn.thatReturns(""),
        ri = {
            topAbort: "abort",
            topCanPlay: "canplay",
            topCanPlayThrough: "canplaythrough",
            topDurationChange: "durationchange",
            topEmptied: "emptied",
            topEncrypted: "encrypted",
            topEnded: "ended",
            topError: "error",
            topLoadedData: "loadeddata",
            topLoadedMetadata: "loadedmetadata",
            topLoadStart: "loadstart",
            topPause: "pause",
            topPlay: "play",
            topPlaying: "playing",
            topProgress: "progress",
            topRateChange: "ratechange",
            topSeeked: "seeked",
            topSeeking: "seeking",
            topStalled: "stalled",
            topSuspend: "suspend",
            topTimeUpdate: "timeupdate",
            topVolumeChange: "volumechange",
            topWaiting: "waiting"
        },
        ai = Object.freeze({
            createElement: sn,
            createTextNode: ln,
            setInitialProperties: un,
            diffProperties: cn,
            updateProperties: dn,
            diffHydratedProperties: fn,
            diffHydratedText: pn,
            warnForUnmatchedText: function() {},
            warnForDeletedHydratableElement: function() {},
            warnForDeletedHydratableText: function() {},
            warnForInsertedHydratedElement: function() {},
            warnForInsertedHydratedText: function() {},
            restoreControlledState: function(e, t, n) {
                switch (t) {
                    case "input":
                        if (Gt(e, n), t = n.name, "radio" === n.type && null != t) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                var a = n[t];
                                if (a !== e && a.form === e.form) {
                                    var i = T(a);
                                    i ? void 0 : r("90"), oe(a), Gt(a, i)
                                }
                            }
                        }
                        break;
                    case "textarea":
                        Xt(e, n);
                        break;
                    case "select":
                        t = n.value, null != t && Kt(e, !!n.multiple, t, !1)
                }
            }
        });
    Pr.injectFiberControlledHostComponent(ai);
    var ii = null,
        oi = null,
        si = Oa({
            getRootHostContext: function(e) {
                var t = e.nodeType;
                switch (t) {
                    case 9:
                    case 11:
                        e = (e = e.documentElement) ? e.namespaceURI : en(null, "");
                        break;
                    default:
                        t = 8 === t ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = en(e, t)
                }
                return e
            },
            getChildHostContext: function(e, t) {
                return en(e, t)
            },
            getPublicInstance: function(e) {
                return e
            },
            prepareForCommit: function() {
                ii = Gr;
                var e = kn();
                if (Be(e)) {
                    if ("selectionStart" in e) var t = {
                        start: e.selectionStart,
                        end: e.selectionEnd
                    };
                    else e: {
                        var n = window.getSelection && window.getSelection();
                        if (n && 0 !== n.rangeCount) {
                            t = n.anchorNode;
                            var r = n.anchorOffset,
                                a = n.focusNode;
                            n = n.focusOffset;
                            try {
                                t.nodeType, a.nodeType
                            } catch (i) {
                                t = null;
                                break e
                            }
                            var o = 0,
                                s = -1,
                                l = -1,
                                u = 0,
                                c = 0,
                                d = e,
                                f = null;
                            t: for (;;) {
                                for (var p; d !== t || 0 !== r && 3 !== d.nodeType || (s = o + r), d !== a || 0 !== n && 3 !== d.nodeType || (l = o + n), 3 === d.nodeType && (o += d.nodeValue.length), null !== (p = d.firstChild);) f = d, d = p;
                                for (;;) {
                                    if (d === e) break t;
                                    if (f === t && ++u === r && (s = o), f === a && ++c === n && (l = o), null !== (p = d.nextSibling)) break;
                                    d = f, f = d.parentNode
                                }
                                d = p
                            }
                            t = -1 === s || -1 === l ? null : {
                                start: s,
                                end: l
                            }
                        } else t = null
                    }
                    t = t || {
                        start: 0,
                        end: 0
                    }
                } else t = null;
                oi = {
                    focusedElem: e,
                    selectionRange: t
                }, Pe(!1)
            },
            resetAfterCommit: function() {
                var e = oi,
                    t = kn(),
                    n = e.focusedElem,
                    r = e.selectionRange;
                if (t !== n && Tn(document.documentElement, n)) {
                    if (Be(n))
                        if (t = r.start, e = r.end, void 0 === e && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
                        else if (window.getSelection) {
                        t = window.getSelection();
                        var a = n[R()].length;
                        e = Math.min(r.start, a), r = void 0 === r.end ? e : Math.min(r.end, a), !t.extend && e > r && (a = r, r = e, e = a), a = je(n, e);
                        var i = je(n, r);
                        if (a && i && (1 !== t.rangeCount || t.anchorNode !== a.node || t.anchorOffset !== a.offset || t.focusNode !== i.node || t.focusOffset !== i.offset)) {
                            var o = document.createRange();
                            o.setStart(a.node, a.offset), t.removeAllRanges(), e > r ? (t.addRange(o), t.extend(i.node, i.offset)) : (o.setEnd(i.node, i.offset), t.addRange(o))
                        }
                    }
                    for (t = [], e = n; e = e.parentNode;) 1 === e.nodeType && t.push({
                        element: e,
                        left: e.scrollLeft,
                        top: e.scrollTop
                    });
                    for (In(n), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
                }
                oi = null, Pe(ii), ii = null
            },
            createInstance: function(e, t, n, r, a) {
                return e = sn(e, t, n, r), e[ir] = a, e[or] = t, e
            },
            appendInitialChild: function(e, t) {
                e.appendChild(t)
            },
            finalizeInitialChildren: function(e, t, n, r) {
                un(e, t, n, r);
                e: {
                    switch (t) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                            e = !!n.autoFocus;
                            break e
                    }
                    e = !1
                }
                return e
            },
            prepareUpdate: function(e, t, n, r, a) {
                return cn(e, t, n, r, a)
            },
            shouldSetTextContent: function(e, t) {
                return "textarea" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && "string" == typeof t.dangerouslySetInnerHTML.__html
            },
            shouldDeprioritizeSubtree: function(e, t) {
                return !!t.hidden
            },
            createTextInstance: function(e, t, n, r) {
                return e = ln(e, t), e[ir] = r, e
            },
            now: xa,
            mutation: {
                commitMount: function(e) {
                    e.focus()
                },
                commitUpdate: function(e, t, n, r, a) {
                    e[or] = a, dn(e, t, n, r, a)
                },
                resetTextContent: function(e) {
                    e.textContent = ""
                },
                commitTextUpdate: function(e, t, n) {
                    e.nodeValue = n
                },
                appendChild: function(e, t) {
                    e.appendChild(t)
                },
                appendChildToContainer: function(e, t) {
                    8 === e.nodeType ? e.parentNode.insertBefore(t, e) : e.appendChild(t)
                },
                insertBefore: function(e, t, n) {
                    e.insertBefore(t, n)
                },
                insertInContainerBefore: function(e, t, n) {
                    8 === e.nodeType ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n)
                },
                removeChild: function(e, t) {
                    e.removeChild(t)
                },
                removeChildFromContainer: function(e, t) {
                    8 === e.nodeType ? e.parentNode.removeChild(t) : e.removeChild(t)
                }
            },
            hydration: {
                canHydrateInstance: function(e, t) {
                    return 1 !== e.nodeType || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e
                },
                canHydrateTextInstance: function(e, t) {
                    return "" === t || 3 !== e.nodeType ? null : e
                },
                getNextHydratableSibling: function(e) {
                    for (e = e.nextSibling; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
                    return e
                },
                getFirstHydratableChild: function(e) {
                    for (e = e.firstChild; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
                    return e
                },
                hydrateInstance: function(e, t, n, r, a, i) {
                    return e[ir] = i, e[or] = n, fn(e, t, n, a, r)
                },
                hydrateTextInstance: function(e, t, n) {
                    return e[ir] = n, pn(e, t)
                },
                didNotMatchHydratedContainerTextInstance: function() {},
                didNotMatchHydratedTextInstance: function() {},
                didNotHydrateContainerInstance: function() {},
                didNotHydrateInstance: function() {},
                didNotFindHydratableContainerInstance: function() {},
                didNotFindHydratableContainerTextInstance: function() {},
                didNotFindHydratableInstance: function() {},
                didNotFindHydratableTextInstance: function() {}
            },
            scheduleDeferredCallback: Na,
            cancelDeferredCallback: Da,
            useSyncScheduling: !0
        });
    Z = si.batchedUpdates, vn.prototype.render = function(e, t) {
        si.updateContainer(e, this._reactRootContainer, null, t)
    }, vn.prototype.unmount = function(e) {
        si.updateContainer(null, this._reactRootContainer, null, e)
    };
    var li = {
        createPortal: _n,
        findDOMNode: function(e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternalFiber;
            return t ? si.findHostInstance(t) : void("function" == typeof e.render ? r("188") : r("213", Object.keys(e)))
        },
        hydrate: function(e, t, n) {
            return hn(null, e, t, !0, n)
        },
        render: function(e, t, n) {
            return hn(null, e, t, !1, n)
        },
        unstable_renderSubtreeIntoContainer: function(e, t, n, a) {
            return null == e || void 0 === e._reactInternalFiber ? r("38") : void 0, hn(e, t, n, !1, a)
        },
        unmountComponentAtNode: function(e) {
            return mn(e) ? void 0 : r("40"), e._reactRootContainer ? (si.unbatchedUpdates(function() {
                hn(null, null, e, !1, function() {
                    e._reactRootContainer = null
                })
            }), !0) : !1
        },
        unstable_createPortal: _n,
        unstable_batchedUpdates: J,
        unstable_deferredUpdates: si.deferredUpdates,
        flushSync: si.flushSync,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
            EventPluginHub: rr,
            EventPluginRegistry: Xn,
            EventPropagators: lr,
            ReactControlledComponent: Lr,
            ReactDOMComponentTree: sr,
            ReactDOMEventListener: qr
        }
    };
    si.injectIntoDevTools({
        findFiberByHostInstance: k,
        bundleType: 0,
        version: "16.2.0",
        rendererPackageName: "react-dom"
    });
    var ui = Object.freeze({
            "default": li
        }),
        ci = ui && li || ui;
    e.exports = ci["default"] ? ci["default"] : ci
}, function(e, t, n) {
    "use strict";
    Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for (var n = Object(e), r = 1; r < arguments.length; r++) {
                var a = arguments[r];
                if (void 0 !== a && null !== a)
                    for (var i = Object.keys(Object(a)), o = 0, s = i.length; s > o; o++) {
                        var l = i[o],
                            u = Object.getOwnPropertyDescriptor(a, l);
                        void 0 !== u && u.enumerable && (n[l] = a[l])
                    }
            }
            return n
        }
    })
}, function(e, t, n) {
    (function(r, a) {
        var i;
        (function() {
            "use strict";

            function o(e) {
                return "function" == typeof e || "object" == typeof e && null !== e
            }

            function s(e) {
                return "function" == typeof e
            }

            function l(e) {
                K = e
            }

            function u(e) {
                X = e
            }

            function c() {
                return function() {
                    r.nextTick(g)
                }
            }

            function d() {
                return function() {
                    W(g)
                }
            }

            function f() {
                var e = 0,
                    t = new ee(g),
                    n = document.createTextNode("");
                return t.observe(n, {
                        characterData: !0
                    }),
                    function() {
                        n.data = e = ++e % 2
                    }
            }

            function p() {
                var e = new MessageChannel;
                return e.port1.onmessage = g,
                    function() {
                        e.port2.postMessage(0)
                    }
            }

            function m() {
                return function() {
                    setTimeout(g, 1)
                }
            }

            function g() {
                for (var e = 0; $ > e; e += 2) {
                    var t = re[e],
                        n = re[e + 1];
                    t(n), re[e] = void 0, re[e + 1] = void 0
                }
                $ = 0
            }

            function h() {
                try {
                    var e = n(159);
                    return W = e.runOnLoop || e.runOnContext, d()
                } catch (t) {
                    return m()
                }
            }

            function _(e, t) {
                var n = this,
                    r = n._state;
                if (r === se && !e || r === le && !t) return this;
                var a = new this.constructor(b),
                    i = n._result;
                if (r) {
                    var o = arguments[r - 1];
                    X(function() {
                        D(r, a, o, i)
                    })
                } else O(n, a, e, t);
                return a
            }

            function v(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var n = new t(b);
                return I(n, e), n
            }

            function b() {}

            function y() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function w() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function C(e) {
                try {
                    return e.then
                } catch (t) {
                    return ue.error = t, ue
                }
            }

            function E(e, t, n, r) {
                try {
                    e.call(t, n, r)
                } catch (a) {
                    return a
                }
            }

            function k(e, t, n) {
                X(function(e) {
                    var r = !1,
                        a = E(n, t, function(n) {
                            r || (r = !0, t !== n ? I(e, n) : P(e, n))
                        }, function(t) {
                            r || (r = !0, L(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                    !r && a && (r = !0, L(e, a))
                }, e)
            }

            function S(e, t) {
                t._state === se ? P(e, t._result) : t._state === le ? L(e, t._result) : O(t, void 0, function(t) {
                    I(e, t)
                }, function(t) {
                    L(e, t)
                })
            }

            function T(e, t, n) {
                t.constructor === e.constructor && n === ae && constructor.resolve === ie ? S(e, t) : n === ue ? L(e, ue.error) : void 0 === n ? P(e, t) : s(n) ? k(e, t, n) : P(e, t)
            }

            function I(e, t) {
                e === t ? L(e, y()) : o(t) ? T(e, t, C(t)) : P(e, t)
            }

            function M(e) {
                e._onerror && e._onerror(e._result), A(e)
            }

            function P(e, t) {
                e._state === oe && (e._result = t, e._state = se, 0 !== e._subscribers.length && X(A, e))
            }

            function L(e, t) {
                e._state === oe && (e._state = le, e._result = t, X(M, e))
            }

            function O(e, t, n, r) {
                var a = e._subscribers,
                    i = a.length;
                e._onerror = null, a[i] = t, a[i + se] = n, a[i + le] = r, 0 === i && e._state && X(A, e)
            }

            function A(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (var r, a, i = e._result, o = 0; o < t.length; o += 3) r = t[o], a = t[o + n], r ? D(n, r, a, i) : a(i);
                    e._subscribers.length = 0
                }
            }

            function x() {
                this.error = null
            }

            function N(e, t) {
                try {
                    return e(t)
                } catch (n) {
                    return ce.error = n, ce
                }
            }

            function D(e, t, n, r) {
                var a, i, o, l, u = s(n);
                if (u) {
                    if (a = N(n, r), a === ce ? (l = !0, i = a.error, a = null) : o = !0, t === a) return void L(t, w())
                } else a = r, o = !0;
                t._state !== oe || (u && o ? I(t, a) : l ? L(t, i) : e === se ? P(t, a) : e === le && L(t, a))
            }

            function R(e, t) {
                try {
                    t(function(t) {
                        I(e, t)
                    }, function(t) {
                        L(e, t)
                    })
                } catch (n) {
                    L(e, n)
                }
            }

            function j(e) {
                return new he(this, e).promise
            }

            function B(e) {
                function t(e) {
                    I(a, e)
                }

                function n(e) {
                    L(a, e)
                }
                var r = this,
                    a = new r(b);
                if (!Q(e)) return L(a, new TypeError("You must pass an array to race.")), a;
                for (var i = e.length, o = 0; a._state === oe && i > o; o++) O(r.resolve(e[o]), void 0, t, n);
                return a
            }

            function F(e) {
                var t = this,
                    n = new t(b);
                return L(n, e), n
            }

            function H() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function U() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function z(e) {
                this._id = me++, this._state = void 0, this._result = void 0, this._subscribers = [], b !== e && ("function" != typeof e && H(), this instanceof z ? R(this, e) : U())
            }

            function G(e, t) {
                this._instanceConstructor = e, this.promise = new e(b), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? P(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && P(this.promise, this._result))) : L(this.promise, this._validationError())
            }

            function V() {
                var e;
                if ("undefined" != typeof a) e = a;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var n = e.Promise;
                (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = ge)
            }
            var q;
            q = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
            var W, K, Y, Q = q,
                $ = 0,
                X = function(e, t) {
                    re[$] = e, re[$ + 1] = t, $ += 2, 2 === $ && (K ? K(g) : Y())
                },
                Z = "undefined" != typeof window ? window : void 0,
                J = Z || {},
                ee = J.MutationObserver || J.WebKitMutationObserver,
                te = "undefined" != typeof r && "[object process]" === {}.toString.call(r),
                ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                re = new Array(1e3);
            Y = te ? c() : ee ? f() : ne ? p() : void 0 === Z ? h() : m();
            var ae = _,
                ie = v,
                oe = void 0,
                se = 1,
                le = 2,
                ue = new x,
                ce = new x,
                de = j,
                fe = B,
                pe = F,
                me = 0,
                ge = z;
            z.all = de, z.race = fe, z.resolve = ie, z.reject = pe, z._setScheduler = l, z._setAsap = u, z._asap = X, z.prototype = {
                constructor: z,
                then: ae,
                "catch": function(e) {
                    return this.then(null, e)
                }
            };
            var he = G;
            G.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, G.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === oe && e > n; n++) this._eachEntry(t[n], n)
            }, G.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === ie) {
                    var a = C(e);
                    if (a === ae && e._state !== oe) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof a) this._remaining--, this._result[t] = e;
                    else if (n === ge) {
                        var i = new n(b);
                        T(i, e, a), this._willSettleAt(i, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, G.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === oe && (this._remaining--, e === le ? L(r, n) : this._result[t] = n), 0 === this._remaining && P(r, this._result)
            }, G.prototype._willSettleAt = function(e, t) {
                var n = this;
                O(e, void 0, function(e) {
                    n._settledAt(se, t, e)
                }, function(e) {
                    n._settledAt(le, t, e)
                })
            };
            var _e = V,
                ve = {
                    Promise: ge,
                    polyfill: _e
                };
            i = function() {
                return ve
            }.call(t, n, t, e), !(void 0 !== i && (e.exports = i)), _e()
        }).call(this)
    }).call(this, n(148), n(100))
}, function(e, t, n) {
    "use strict";
    var r = n(64),
        a = n(177),
        i = n(33),
        o = n(48),
        s = n(32),
        l = n(87),
        u = n(169),
        c = n(20),
        d = n(157),
        f = n(208),
        p = n(136),
        m = n(195);
    e.exports = function(e, t, n, g, h, _) {
        var v = r[e],
            b = v,
            y = h ? "set" : "add",
            w = b && b.prototype,
            C = {},
            E = function(e) {
                var t = w[e];
                i(w, e, "delete" == e ? function(e) {
                    return _ && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return _ && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return _ && !c(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
        if ("function" == typeof b && (_ || w.forEach && !d(function() {
                (new b).entries().next()
            }))) {
            var k = new b,
                S = k[y](_ ? {} : -0, 1) != k,
                T = d(function() {
                    k.has(1)
                }),
                I = f(function(e) {
                    new b(e)
                }),
                M = !_ && d(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            I || (b = t(function(t, n) {
                u(t, b, e);
                var r = m(new v, t, b);
                return void 0 != n && l(n, h, r[y], r), r
            }), b.prototype = w, w.constructor = b), (T || M) && (E("delete"), E("has"), h && E("get")), (M || S) && E(y), _ && w.clear && delete w.clear
        } else b = g.getConstructor(t, e, h, y), o(b.prototype, n), s.NEED = !0;
        return p(b, e), C[e] = b, a(a.G + a.W + a.F * (b != v), C), _ || g.setStrong(b, e, h), b
    }
}, function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r = intval(domData(n, "msgid"));
        if (!getSelectionText() && !(0, c.checkSelectClick)(t)) {
            var a = intval(domData(n, "peer"));
            return e.set(u.cancelSearch.bind(null, a)), e.get().longpoll.push([(0, d.changePeer)(a, r)]), !1
        }
    }

    function a(e) {
        return (0, u.isSearchAllLoaded)(e.get().peer, e.get()) ? Promise.resolve("") : (0, u.searchMessagesInplace)(e.get().peer, e.get())
    }

    function i(e, t) {
        return {
            isAll: function(e) {
                return (0, u.isSearchAllLoaded)(e.get().peer, e.get())
            },
            loadMore: function(e) {
                return a(e)
            },
            unmount: function() {
                (0, l.destroyModule)(t)
            }
        }
    }

    function o(e) {
        return e.findIndex(function(e) {
            return "number" == typeof e.peerId && e.href
        }) > -1
    }

    function s(e, t) {
        var n = r.bind(null, t),
            a = (0, l.createModule)({
                handlers: function(t, r) {
                    r(e, "click", "_im_mess", n)
                }
            });
        return i(e, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.doesSearchResultContainConversations = o, t.mount = s;
    var l = n(198),
        u = n(28),
        c = n(88),
        d = n(199)
}, function(e, t, n) {
    var r = n(142);
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
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = (0, oe.getTab)(e, e.get().peer);
        return !!(0, oe.getPinnedMessage)(e) || !!t.top_banner
    }

    function i(e, t) {
        var n = (0, oe.unpackStore)(e),
            r = (0, oe.getTab)(n, t);
        return (0, ie.isChatPeer)(t) && (0, be.isPinnedMessageVisibleInTab)(n, t) || !!r.top_banner && !(0, oe.isSearchShown)(t, n)
    }

    function o(e, t) {
        return (0, ie.getPinnedMessageHeight)()
    }

    function s(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_chat_input_w", t),
            a = r.offsetHeight - r.clientHeight;
        return Math.min(window.clientHeight() - a, Math.max(Math.max(0, e), De + n.offsetHeight + t.offsetTop))
    }

    function l(e, t) {
        var n = intval(domData(t.target, "msgid")),
            r = gpeByClass("_im_mess_" + n, t.target),
            a = geByClass1("_im_log_body", r),
            i = geByClass1("_im_mess_susp_cont", r);
        a.innerHTML = i.innerHTML
    }

    function u(e, t) {
        return geByClass1("_im_mess_" + t, e)
    }

    function c(e, t, n) {
        var r = geByClass1(e, t),
            a = void 0,
            i = void 0;
        (0, Ee.initDraggable)(r, {
            onStartDrag: function(e, t) {
                addClass(bodyNode, "cursor_ns_resize"), a = t, i = t
            },
            onDrop: function() {
                removeClass(bodyNode, "cursor_ns_resize")
            },
            onDrag: function(e, r) {
                var o = s(i - a + r, t);
                (0, ie.setClassicChatHeight)(o), n().fixHeight()
            }
        })
    }

    function d(e, t) {
        (0, Ee.removeDraggable)(geByClass1(e, t))
    }

    function f(e) {
        hide(e.target)
    }

    function p(e, t, n, r, a, i, o, s, l, u) {
        removeClass(e, "im-page--history_empty"), y(e, t, n, r, a, i, o, s, l, u)
    }

    function m(e, t, n, r, a) {
        if (checkEvent(r)) return !0;
        var i = q2ajx(a.getAttribute("href")),
            o = intval(i.msgid);
        o && e.set(ae.changePeer.bind(null, e.get().peer, o)).then(function() {
            I(n, t, o, e)
        }), cancelEvent(r)
    }

    function g(e, t, n) {
        var r = (0, oe.getTab)(t, n),
            a = (0, ae.strHistory)(r.history);
        toggleClass(e, "im-page--history_empty-hist", !a)
    }

    function h(e, t, n, r) {
        if (hasClass(n.target, "_im_mess_marker")) {
            var a = n.target;
            window.tooltips && (0, ue.toArray)(geByClass(ie.FAILED_CLASS, t)).map(function(e) {
                return geByClass1("_im_mess_marker", e)
            }).filter(function(e) {
                return e !== a
            }).forEach(function(e) {
                return tooltips.hide(e, {
                    fasthide: !0
                })
            });
            var i = domData(r, "msgid");
            showTooltip(a, {
                content: getTemplate("im_failed_menu", {
                    id: i
                }),
                className: "im-page--failed-tt" + (i > 0 ? " no_delete" : ""),
                appendParentCls: "_chat_body_wrap",
                dir: "down",
                noZIndex: !0,
                shift: [12, 8],
                hasover: !0
            })
        }
    }

    function _(e) {
        return geByClass1("_im_peer_history", e)
    }

    function v(e) {
        addClass(e, "im-page--history_empty"), _(e).innerHTML = ""
    }

    function b(e, t) {
        var n = t.contHeight(),
            r = e.scrollTop + (n - e.contHeight);
        t.scrollTop(r)
    }

    function y(e, t, n, r, a, i, o, s) {
        var l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !0,
            u = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : !1,
            c = (t.get().tabs || {})[n];
        a().hideError(), i.renderPeer(t), s.renderPeer(t);
        var d = geByClass1("_im_peer_history", e);
        if (!t.get().tabHistoryNotChanged) {
            val(geByClass1("_im_page_peer_name", e), c.tab);
            var f = (0, ae.strHistory)(c.history);
            g(e, t, n), f || (f = getLang("mail_im_here_history")), val(d, f), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), (0, ie.isClassicInterface)(t) || (0, ie.fixTableCellChildHeight)("_chat_body_wrap", e), F(t, r, e)
        }
        if ((0, ae.isSearchingInplace)(n, t.get()) ? a().showSearch(t) : a().cancelSearch(t, !1), o.changePeer(n, t), t.get().msgid) I(r, e, t.get().msgid, t);
        else if (c.scrollBottom && l) {
            b(c, r);
            var p = (0, ie.isMessagesVisible)(t, e, r),
                m = re(p, 1),
                h = m[0];
            c.skipped || setTimeout(function() {
                c.unread && !h && O(t, e, !0), E(t, r, e)
            }, 100)
        } else T(r, e, a, t, u) || r.scrollBottom(Ae);
        window.LazyLoad && window.LazyLoad.scan(r.scroll ? r.scroll.scroller : !1)
    }

    function w(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || t.scrollTop(),
            a = t.scrollBottom(),
            i = t.contHeight(),
            o = e.get().peer;
        e.set(ae.saveHistoryScroll.bind(null, o, r, a, i))
    }

    function C() {
        return le.screenfull.isFullscreen
    }

    function E(e, t, n) {
        var r = (0, oe.isGoToEndVisible)(e),
            a = 4 * t.getScrollHeight();
        t.scrollBottom() > a && !r && O(e, n, !0, 2 * t.getScrollHeight())
    }

    function k(e, t, n, r, a, i, o, s) {
        var l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !0;
        if ((e.get().history_init || (e.get().history_init = !0, !(s.scrollTop() >= 0))) && !C()) {
            a.update(s), a.show();
            var u = e.get().peer;
            if (0 !== u && (0, ie.isFullyLoadedTab)(e.get(), u) && (Se["default"].onHistoryScroll(s.scrollTop()), !layers.visible)) {
                var c = (0, oe.isGoToEndVisible)(e),
                    d = (0, oe.getTab)(e, u);
                d && !d.skipped && 0 > o ? E(e, s, i) : o > 0 && !d.skipped && !d.unread && G(e, i), L(e, s) && (c && d && !d.skipped && G(e, i), d.unread > 0 && S(e));
                var f = (0, ie.wrapLoading)(n);
                if (!(0, ae.isSearchingInplace)(u, e.get()) && l && r(s), !Je && (0 > o || 0 === s.scrollBottom()) && s.scrollBottom() < Oe) {
                    if ((0, ae.isSearchingInplace)(u, e.get())) return;
                    if (d.skipped > 0 && !e.get().no_moving_down) {
                        var p = gpeByClass("_im_page_history", p),
                            m = e.get();
                        Je = !0;
                        var g = e.set(ae.loadLessHistory).then(t().loadHistory.bind(null, m.peer, {
                            reversed: !0
                        })).then(function() {
                            S(e), Je = !1, O(e, p), d.skipped || e.set(ae.changePeer.bind(null, e.get().peer, !1, !1))
                        });
                        return j(p, !0), void g.then(j.bind(null, p, !1))
                    }
                }
                if (!Je && s.scrollTop() < Oe) {
                    if ((0, ae.isSearchingInplace)(u, e.get())) {
                        Je = !0;
                        var h = t().getSearchResulstModule();
                        return h.isAll(e) ? void(Je = !1) : void f(h.loadMore(e).then(function(n) {
                            Je = !1, n && (t().loadHistory(e.get().peer, {}, e, n), r(s))
                        }), "up")
                    }
                    var _ = e.get();
                    d.allShown || (Je = !0, f(e.set(ae.loadMoreHistory.bind(null, 0, 0)).then(t().loadHistory.bind(null, _.peer, {})).then(function() {
                        Je = !1, r(s)
                    }), "up"))
                }
                0 > o && ee(e, u, s.scrollBottom(), i, t), (0, ae.videoAutoPlayHandler)()
            }
        }
    }

    function S(e) {
        return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void 0 : e.set(ae.readLastMessages.bind(null, e.get().peer))
    }

    function T(e, t, n, r, a) {
        var s = geByClass1("_im_unread_bar_row", t);
        if (s) {
            var l = r.get(),
                u = l.peer,
                c = s.getBoundingClientRect(),
                d = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
            (0, ie.isClassicInterface)(r) && (d += je + (i(l, u) ? o(l, u) : 0));
            var f = e.scrollTop() - d + c.top;
            return e.scrollTop(f), w(r, e, f), setTimeout(function() {
                u === r.get().peer && k(r, n, _(t), function() {}, a, t, 0, e)
            }, 80), S(r), !0
        }
        return !1
    }

    function I(e, t, n, r) {
        var a = u(t, n);
        if (a) {
            var s = (0, ie.isClassicInterface)(r),
                l = r.get().peer,
                c = s ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                d = a.offsetTop + domPN(a).offsetTop + domPN(domPN(a)).offsetTop + domPN(domPN(domPN(a))).offsetTop;
            s && i(r, l) && (d -= o(r.get(), l)), e.scrollTop(d - e.getScrollHeight() / 2 + c / 2), addClass(a, "im-mess_light"),
                setTimeout(function() {
                    removeClass(a, "im-mess_light")
                }, Ne)
        }
    }

    function M(e, t, n) {
        n.updateLastSeen(e)
    }

    function P(e, t, n, r, a) {
        var i = domData(a, "action"),
            o = domData(a, "msgid"),
            s = geByClass1("_im_mess_marker", u(n, o));
        switch (i) {
            case "resend":
                t(r, a);
                break;
            case "delete":
                e.set(ae.removeFailed.bind(null, e.get().peer, o)).then(function() {
                    (0, ie.removeMessages)([o], _(n))
                })
        }
        tooltips.hide(s, {
            fasthide: !0
        })
    }

    function L(e, t) {
        return (0, oe.getUnreadScrollBottom)(e) >= intval(t.scrollBottom())
    }

    function O(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            a = e.get().peer;
        if (!(0, ie.isReservedPeer)(a)) {
            var i = e.get().tabs[a],
                o = geByClass1(Fe, t),
                s = geByClass1("_im_to_end_label", o);
            n && i.unread > 0 ? val(s, getLang("mail_im_new_messages", i.unread)) : val(s, getLang("mail_im_to_end_new"));
            var l = !1;
            (n || i.skipped > 0) && !(0, ae.isSearchingInplace)(e.get().peer, e.get()) ? (l = !0, addClass(o, "im-to-end_shown")) : z(o, !0), e.set(ae.updateGoToEndVisibility.bind(null, [l, intval(r)]))
        }
    }

    function A(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (0 === e.scrollTop() && 0 === e.scrollBottom()) return !1;
        var n = e.scrollBottom();
        return (t ? xe + t : xe) > n
    }

    function x(e, t, n, r, a) {
        var i = domData(a, "msgid"),
            o = e.get().peer,
            s = (0, oe.getMessage)(e, o, i);
        s.type === Ce.EDIT_MESSAGE ? (n().sendEditMessage(e, s), n().resendMessage(o, i)) : e.get().imQueueResend(o, i).then(function(t) {
            e.get().longpoll.push([(0, Ce.resendEvent)(o, t.mess)])
        })
    }

    function N(e, t, n, r, a) {
        var i = intval(domData(a, "peer")),
            o = intval(domData(gpeByClass("_im_mess", a), "msgid")),
            s = e.get().tabs[i].hash;
        return (0, ae.restoreMessageSend)(o, i, s, e.get().gid), e.set(ae.restoreMessage.bind(null, o, i)).then(ie.restoreMessage.bind(null, o, i, _(t))).then(function() {
            return F(e, n, t)
        }), !1
    }

    function D(e, t) {
        e().showCreation(t)
    }

    function R(e, t, n) {
        cancelStackFilter("forward"), e.set(ae.prepareForward.bind(null, null)).then(function() {
            t().changePeer(!1, e), removeClass(n, "im-page--history_fwd"), e.get().longpoll.push([(0, Ce.transitionEvent)("default")])
        })
    }

    function j(e, t) {
        var n = geByClass1(Fe, e);
        toggleClass(n, "im-to-end_loading", t)
    }

    function B(e, t, n, r) {
        var a = t.get().tabs[t.get().peer];
        return a.skipped ? (j(n, !0), void t.set(ae.changePeer.bind(null, t.get().peer, !1, !1)).then(function() {
            return t.set(ae.loadPeer.bind(null, t.get().peer, !0, -1, !1))
        }).then(function() {
            j(n, !1), e().changePeer(t, !1, !1), S(t)
        })) : (r.scrollBottom(Ae), O(t, n), S(t), void ee(t, t.get().peer, 0, n, e))
    }

    function F(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        if ((0, ie.isClassicInterface)(e)) {
            var a = t.contHeight(),
                i = geByClass1("_im_chat_input_w", n),
                o = i.offsetHeight - i.clientHeight,
                l = geByClass1("_im_chat_resize", n),
                u = geByClass1("_im_chat_input_parent", n),
                c = geByClass1("_im_chat_audio_input_parent", n);
            if (r = r !== !1 ? r : (0, ie.getClassicChatHeight)(), r !== !1 && r > 0) {
                var d = s(r, n),
                    f = hasClass(c, Ye) || hasClass(c, Ke),
                    p = f ? c : u,
                    m = d - p.offsetHeight;
                l.style.height = window.clientHeight() - d - o + "px", setStyle(i, {
                    top: m + "px",
                    bottom: "auto"
                })
            } else l.style.height = "0px", setStyle(i, {
                top: "auto",
                bottom: "0px"
            });
            var g = geByClass1("_im_peer_history_w", n);
            return setStyle(g, {
                borderBottomWidth: i.offsetHeight - Re - 1
            }), t.contHeight() - a
        }(0, ie.fixTableCellChildHeight)("_chat_body_wrap", n);
        var h = t.getScrollHeight();
        t.update(!1, !0);
        var _ = t.getScrollHeight();
        return h - _
    }

    function H(e, t, n, r) {
        var a = t.offsetHeight;
        r(), e.heightIncreased(t.offsetHeight - a, n)
    }

    function U(e, t) {
        var n = t.getBoundingClientRect().top;
        showTooltip(t, {
            className: "im-page--admin-tt",
            text: getLang("mail_only_admin_see"),
            appendParentCls: "_chat_body_wrap",
            shift: [20, 5],
            dir: "auto",
            showdt: 400,
            noZIndex: !0,
            toup: n > 200
        })
    }

    function z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
    }

    function G(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = geByClass1(Fe, t);
        e.set(ae.updateGoToEndVisibility.bind(null, [!1, 0])), z(r, n)
    }

    function V(e, t, n) {
        le.screenfull.isFullscreen || 0 === t.get().peer || (0, ie.isClassicInterface)(t) || e().restoreScroll(t, t.get().peer)
    }

    function q(e, t) {
        var n = e.get(),
            r = n.peer,
            a = domClosest(Qe, t.target),
            i = intval(domData(a, "msgid")),
            o = (0, oe.getMessage)(e, r, i),
            s = o && (0, ie.isServiceMsg)(o) && o.kludges.source_act;
        if (s === ie.CHAT_PIN_MESSAGE || s === ie.CHAT_UNPIN_MESSAGE) {
            var l = a.querySelector("." + $e);
            if (l && "A" !== l.tagName) {
                var u = o.kludges.source_chat_local_id;
                if (!u || et[u]) return;
                et[u] = (0, ae.getMessageLocalId)(r, u, n).then(function(e) {
                    var t = re(e, 1),
                        n = t[0];
                    if (n) {
                        var a = "/im?sel=" + (0, ie.convertPeerToUrl)(r) + "&msgid=" + n,
                            i = l.innerHTML;
                        domReplaceEl(l, (0, ie.serviceLink)(a, i, !0, $e)), delete et[u]
                    }
                })
            }
        }
    }

    function W(e, t, n) {
        var r = e.get(),
            a = r.peer,
            i = n.target.href && n.target.href.match(/msgid=([\d]+)/),
            o = i && i[1];
        if ("A" === n.target.tagName && o && !(0, ie.isAlreadyDeleted)(e, a, o) && !checkEvent(n)) {
            var s = (0, oe.getMessage)(e, a, o);
            s ? (e.setState({
                msgid: o
            }), (0, Te.updateLocation)({
                msgid: o
            }), t().focusOnMessage()) : r.longpoll.push([(0, Ce.changePeer)(a, o)])
        }
        cancelEvent(n)
    }

    function K(e) {
        var t = (0, oe.getCurrentTab)(e);
        (0, ie.isChatPeer)(t.peerId) && (t.pinHideId = cur.imDb.select(Ie.PIN_HIDDEN_ID_OP, t.peerId))
    }

    function Y(e, t, n, r, a) {
        e.setState({
            isEditing: !0
        }), n.saveText(e), addClass(r, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", function() {
            return Q(e, t, n, r, a)
        });
        var i = new Pe.ImDraft;
        i.dData.txt = (0, Me.convertEmojiHtmlToRegularText)(a.text), i.dData.attaches = (0, Pe.convertKludgesToAttaches)(a.kludges, a.messageId), n.toggleStickers(e, !1), n.setDraft(e, i), setTimeout(function() {
            return n.focusOn(e)
        }, 0)
    }

    function Q(e, t, n, r, a) {
        e.setState({
            isEditing: !1
        }), removeClass(r, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, (0, oe.getPeer)(e) ? (0, oe.getTabDraft)((0, oe.getCurrentTab)(e)) : null), n.toggleStickers(e, !0), X(t)
    }

    function $(e) {
        var t = geByClass1("im-mess_is_editing");
        if (!t) return null;
        var n = e.get().tabs[e.get().peer],
            r = (0, oe.parserMessage)(n.msgs[domData(t, "msgid")]);
        return r && r.peerId == e.get().peer ? r : null
    }

    function X(e) {
        (0, ue.toArray)(geByClass("_im_history_tooltip", e)).forEach(hide)
    }

    function Z(e, t, n) {
        var r = e.get(),
            a = domClosest(Ze, n.target),
            i = domData(a, "msgid"),
            o = (0, oe.getMessage)(r, r.peer, i),
            s = function(e) {
                return t().replaceAttachmentPlaceholders(e, o)
            };
        o && (e.set(ae.addAttachmentsToStoreData.bind(null, o, [(0, ie.renderMessageMedia)(o)])).then(s), e.set(ae.loadMedia.bind(null, o)).then(s))
    }

    function J(e, t) {
        (0, ie.boxHandleEditTimeTooltips)(showBox("al_im.php", t, {
            dark: 1
        }), e)
    }

    function ee(e, t, n, r, a) {
        var i = 50,
            o = (0, oe.getTab)(e, t),
            s = o && o.msgs && o.history && !Je && o.offset > 60 && 0 == o.skipped && 50 > n && n >= 0 && 0 === (e.get().selectedMessages || []).length;
        if (s) {
            var l = Object.keys(o.msgs).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return e - t
            }).slice(0, -i);
            e.set(ae.removeMessages.bind(null, l, t)).then(function() {
                return a().removeMessages(l, t, e)
            })
        }
    }

    function te(e, t, n, r, i, s, l, c, f, m, g, h, C, E, k, S) {
        var T = void 0,
            P = throttle(function() {
                n.smoothScroll.apply(n, arguments)
            }, 300);
        return {
            changePeer: function(e) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
                if (0 === e.get().peer && k.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return i.setDraft(e, null), v(t, e);
                if ((0, ie.isFullyLoadedTab)(e.get(), e.get().peer)) {
                    removeClass(t, "im-page--history_search"), e.set(ae.dropSelection), r.changeActions(e);
                    var l = e.get().peer,
                        u = e.get().prevPeer;
                    removeClass(t, "im-page--history_loading"), a ? i.setDraft(e, (0, oe.getTabDraft)((0, oe.getCurrentTab)(e))) : i.updateState(e), O(e, t), s().updateTyping(l, e), k.toggle(!0), M(e, t, r), (0, ie.isReservedPeer)(u) && !(0, ie.isReservedPeer)(l) ? (p(t, e, l, n, s, r, c, S, o, k), k.reset(n)) : (0, ie.isReservedPeer)(u) || (0, ie.isReservedPeer)(l) || (y(t, e, l, n, s, r, c, S, o, k), k.reset(n)), (0, ie.ensureDomHasActions)(t)
                }
            },
            preparePeer: function(e) {
                var n = (0, oe.getPeer)(e);
                K(e), i.setDraft(e, (0, oe.getTabDraft)((0, oe.getTab)(e, n))), s().updateTyping(n, e), s().hideError(), r.renderPeer(e), S.renderPeer(e), r.hideActions(e), c.changePeer(n, e), M(e, t, r), k.toggle(!1), G(e, t, !0)
            },
            saveScroll: function(e) {
                return w(e, n)
            },
            loadingPeer: function(e) {
                (0, ae.isAnythingLoading)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
            },
            stopLoading: function(e) {
                removeClass(t, "im-page--history_loading")
            },
            deselectDialog: function(e) {
                l().removeSelection(e)
            },
            replaceMessageAttrs: function(e, n) {
                (0, ie.replaceMessageAttrs)(n.get(), _(t), e)
            },
            cleanSelection: function(e) {
                m.cleanSelection(e)
            },
            updateDialogFilters: function(e) {
                l().updateDialogFilters(e)
            },
            getSearchResulstModule: function() {
                return T
            },
            insertSearch: function(e, a) {
                T || (r.deselectAll(a), T = (0, he.mount)(t, a, s)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), _(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), _(t).innerHTML = (0, ie.renderEmptySearch)()), F(a, n, t), n.scrollBottom(0), O(a, t), k.reset(n)
            },
            updateChatTopic: function(e, t) {
                l().updateDialog(e, t), e === t.get().peer && (r.renderPeer(t), r.renderActions(t), S.renderPeer(t))
            },
            updateActions: function(e) {
                r.changeActions(e)
            },
            updateChatPhoto: function(e, a, i) {
                if ((0, ie.isPeerActive)(e.peerId, i.get())) {
                    r.renderPeer(i), S.renderPeer(i);
                    var o = A(n);
                    (0, ie.addChatPhotoToUpdate)(e, a, i.get(), _(t)), o && n.scrollBottom(Ae)
                }
            },
            markImportant: function(e, n, a) {
                var i = u(t, e);
                i && (r.changedMessageSelection(a), f.markImportant(e, n, a))
            },
            isNewMessagesVisible: function(e) {
                return L(e, n)
            },
            loadHistory: function(e, r, a) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                    o = a.get();
                if ((0, ie.isPeerActive)(e, o)) {
                    var s = i || o.tabs[e].historyToAppend;
                    if (!s) return;
                    var l = geByClass1("_im_peer_history", t),
                        u = domFC(l),
                        c = n.scrollBottom(),
                        d = r.reversed ? function(e) {
                            return l.appendChild(e)
                        } : function(e) {
                            return l.insertBefore(e, u)
                        },
                        f = 0;
                    r.reversed && (f = l.offsetHeight);
                    var p = sech(s),
                        m = document.createDocumentFragment();
                    p.forEach(function(e) {
                        return m.appendChild(e)
                    }), d(m), r.reversed && k.heightIncreased(l.offsetHeight - f, n), r.reversed || n.scrollBottomFixSave(c), n.update(!1, !0);
                    var g = p.filter(function(e) {
                        return hasClass(e, "_im_bar_date")
                    });
                    k.parseMore(g, n), (0, ie.ensureDomHasActions)(t)
                }
            },
            sendMessage: function(e) {
                0 !== e.get().peer && i.sendMessage()
            },
            editMessage: function(e, a) {
                if ((0, ie.isFullyLoadedTab)(e, a.peerId) && (0, ie.isPeerActive)(a.peerId, e.get())) {
                    var i = u(t, a.messageId);
                    if (!i) return;
                    (0, ie.editAndReplaceMessage)(e.get(), a, t), r.reRenderPinned(e), k.reset(n)
                }
            },
            addMessage: function(e, r) {
                if (!(0, ae.isSearchingInplace)(r.peerId, e.get()) && (0, ie.isFullyLoadedTab)(e, r.peerId) && (0, ie.isPeerActive)(r.peerId, e.get())) {
                    if (u(t, r.messageId)) return;
                    var a = _(t);
                    H(k, a, n, function() {
                        var i = A(n),
                            o = geByClass1("_im_unread_bar_row", t),
                            l = (0, ie.isMessagesVisible)(e, t, n),
                            u = re(l, 2),
                            c = u[0],
                            d = u[1];
                        (0, ie.appendToHistory)(e.get(), r, a, !0, !0, !c && !o), removeClass(t, "im-page--history_empty-hist");
                        var f = (0, oe.getTab)(e, e.get().peer),
                            p = (0, ie.isServiceMsg)(r) && r.userId === vk.id,
                            m = r.kludges && r.kludges.source_act,
                            g = p && m !== ie.CHAT_PIN_MESSAGE && m !== ie.CHAT_UNPIN_MESSAGE;
                        f.skipped || c || !(0, se.isUnread)(f, r) || (0, se.isOut)(r) || O(e, t, !0, d), (r.local || i || g) && n.scrollBottom(0), s().updateTyping(r.peerId, e), X(t)
                    });
                    var i = domPS(domLC(a));
                    if (hasClass(i, "_im_bar_date")) {
                        var o = ce("div");
                        o.innerHTML = i.outerHTML, k.parseMore(o, n)
                    }
                    s().hideError(), k.update(n), (0, ae.updateMentions)(e.get()), ee(e, r.peerId, n.scrollBottom(), t, s)
                }
            },
            setMessageErrored: function(e, n, r, a) {
                r && s().showError(r), (0, ie.setMessageError)(e, n, t)
            },
            markMessagesAsRead: function(e, n) {
                e.get().peer === n.peerId && (0, ie.markMessagesAsRead)(e.get(), n.peerId, t)
            },
            compensateHistoryHeightChange: function(e) {
                n.scrollTop(n.scrollTop() + e * o(h.get(), h.get().peer))
            },
            hideFwd: function(e) {
                removeClass(t, "im-page--history_fwd")
            },
            updateTyping: function(e, n) {
                if (!(0, ae.isSearchingInplace)(e, n.get())) {
                    var r = n.get();
                    if (n.get().peer === e && (0, ie.isFullyLoadedTab)(r, e)) {
                        var a = (0, ie.formatTyper)(n.get().tabs[e].typing, e, !1, n.get()),
                            i = geByClass1(ie.TYPING_CLASS, t);
                        if (i || a) {
                            if (!i) {
                                var o = geByClass1(Ge, t);
                                val(o, getTemplate("im_typing", {
                                    cls: (0, ie.isClassicInterface)(n) ? "im-typing_classic" : ""
                                })), i = geByClass1(ie.TYPING_CLASS, t)
                            }
                            val(geByClass1("_im_typing_name", i), a), a ? (addClass(i, "im-page--typing_vis"), s().hideError()) : removeClass(i, "im-page--typing_vis")
                        }
                    }
                }
            },
            scrollFix: function(e, t, r) {
                k.heightIncreased(r, n), k.update(n), (0, ie.isPeerActive)(t, e.get()) && A(n, r) && n.scrollBottom(Ae)
            },
            goToEnd: function() {
                var e = this;
                B(function() {
                    return e
                }, h, t, n)
            },
            updateGoToEnd: function(e, r) {
                var a = (0, oe.getTab)(e, e.get().peer);
                a && a.skipped ? O(e, t) : G(e, t, r), g(0, n, !1);
                var i = e.get().peer;
                setTimeout(function() {
                    e.get().peer === i && w(e, n)
                })
            },
            newMessage: function(e) {
                l().newMessage(e), G(e, t, !0)
            },
            scroll: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
                if (0 !== e.get().peer) {
                    var i = r ? n.getScrollHeight() : 40;
                    a === !0 && (i = n.contHeight()), i = "up" === t ? -i : i, r || a ? P(i, function() {
                        g(i, n)
                    }) : (n.scrollTop(n.scrollTop() + i), g(i, n))
                }
            },
            showCreation: function(e, t) {
                l().showCreation(e, t)
            },
            updateScroll: function() {
                return F(h, n, t)
            },
            toggleBarDate: function(e) {
                k.toggle(e)
            },
            changedMessageSelection: function(e) {
                r.changedMessageSelection(e)
            },
            updateOnline: function(e, t) {
                (0, ie.isTabLoaded)(t.get(), e) && e === t.get().peer && r.renderPeer(t)
            },
            isEmpty: function(e) {
                return i.isEmpty(e)
            },
            replaceAttachmentPlaceholders: function(e, a) {
                if ((0, ie.isPeerActive)(a.peerId, e.get())) H(k, _(t), n, function() {
                    var i = A(n);
                    (0, ie.replaceAttaches)(t, a, e.get());
                    var o = (0, oe.getTab)(e, a.peerId);
                    if (o.mediacontent[a.messageId].length >= 3 && o.mediacontent[a.messageId][2].pinned) {
                        var s = (0, oe.parserMessage)(o.pinned);
                        s && s.messageId == a.messageId && (o.pinned = o.mediacontent[a.messageId][2].pinned, r.reRenderPinned(e))
                    }
                    i && n.scrollBottom(0)
                }), k.update(n);
                else if ((0, se.isMoneyRequest)(a)) {
                    var i = (0, oe.getTab)(e, a.peerId);
                    if (i.mediacontent[a.messageId].length >= 3 && i.mediacontent[a.messageId][2].pinned) {
                        var o = (0, oe.parserMessage)(i.pinned);
                        o && o.messageId == a.messageId && (i.pinned = i.mediacontent[a.messageId][2].pinned)
                    }
                }
            },
            removeMessages: function(e, a, i) {
                i.get().peer === a && ((0, ie.removeMessages)(e, _(t)), F(i, n, t), r.changedMessageSelection(i))
            },
            hideGoToEnd: function(e) {
                G(h, t, e)
            },
            removeMessagesRestore: function(e, n, r, a) {
                a.get().peer === n && (0, ie.removeMessagesWithRestore)(e, n, r, _(t))
            },
            updateState: function(e, t) {
                l().updateState(e, t)
            },
            updateBanner: function(e) {
                S.renderPeer(e)
            },
            updateChat: function(e, t) {
                e.get().peer === t && (r.changeActions(e), r.renderPeer(e), r.renderActions(e), S.renderPeer(e), i.updateState(e), (0, ae.updateMentions)(e.get()))
            },
            focustTxt: function(e) {
                i.focusOn(e)
            },
            startSearch: function(e) {
                s().showSearch(e), c.changePeer(e.get().peer, e), c.search()
            },
            showSearch: function(e) {
                addClass(t, "im-page--hisory_search-open"), e.setState({
                    searchShown: !0
                }), a(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(function() {
                    return c.focus(e)
                }, 10)
            },
            cancelSearch: function(e) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                        searchShown: !1
                    }), a(e) && this.updateChatTopic(e.get().peer, e), r.changedMessageSelection(e)), i && !(0, ie.isReservedPeer)(e.get().peer) && T) {
                    var o = e.get().tabs[e.get().peer];
                    _(t).innerHTML = (0, ae.strHistory)(o.history), F(e, n, t), n.scrollBottom(0), e.get().msgid && (I(n, t, e.get().msgid, e), O(e, t)), C(n), k.reset(n)
                }
                T && (T.unmount(), T = !1, (0, ie.ensureDomHasActions)(t))
            },
            updateHistory: function(e) {
                0 !== h.get().peer && e(t)
            },
            focusOnMessage: function() {
                I(n, t, h.get().msgid, h)
            },
            sendEditMessage: function(e, t) {
                e.set(ae.deliverEditedMessage.bind(null, (0, oe.getTab)(e, t.peerId), t))["catch"](function(n) {
                    return e.get().longpoll.push([(0, Ce.failedMessage)(t.peerId, t, n)])
                })
            },
            unmount: function() {
                (0, de.destroyModule)(e), n.destroy(), clearInterval(E), i.unmount(), r.unmount(), f.unmount(), m.unmount(), c.unmount(), cancelStackFilter("forward"), d("_im_chat_resize_track", t)
            },
            removePeer: function(e, t) {
                l().removePeer(e, t)
            },
            restoreScroll: function(e, t) {
                var r = e.get().tabs[t];
                r.scrollBottom ? b(r, n) : n.scrollBottom(Ae)
            },
            resendMessage: function(e, n) {
                e === h.get().peer && (0, ie.startResendMessage)(e, n, t)
            },
            respond: function(e, t) {
                i.attachMessages(e, t), i.focusOn(e);
                var r = (0, oe.getTab)(e, t);
                r && !r.skipped && (n.scrollBottom(Ae), C(n))
            },
            startForward: function(e) {
                addClass(t, "im-page--history_fwd"), geByClass1("_im_explain_fwd", t).textContent = getLang("mail_explain_fwd", e.get().pendingForward.msgIds.length), l().cancelSearch(e), l().removeSelection(e), cancelStackPush("forward", function() {
                    return R(e, l, t)
                })
            },
            cancelRecording: function() {
                i.cancelRecording()
            },
            hideError: function() {
                hide(geByClass1(Ve, t))
            },
            showError: function(e) {
                geByClass1(Ve, t).innerHTML = e, show(geByClass1(Ve, t)), n.scrollBottom(Ae)
            },
            startEditing: function(e) {
                if ((0, ae.isAnythingLoading)(h.get())) return void(0, ie.showWaitUntilUploadedBox)();
                e = (0, oe.parserMessage)(e);
                var n = $(h);
                if (!(i.isBlocked() || n && n.messageId == e.messageId)) {
                    n && this.cancelEditing(), X(t), h.get().searchShown && this.cancelSearch(h);
                    var a = u(t, e.messageId);
                    a && (this.cancelRecording(), Y(h, t, i, a, e), r.deselectAll(h))
                }
            },
            cancelEditing: function() {
                var e = $(h);
                e && Q(h, t, i, u(t, e.messageId), e)
            },
            getEditingMessage: function() {
                return $(h)
            },
            focusEditingMessage: function() {
                var e = $(h);
                e && I(n, t, e.messageId, h), i.focusOn(h)
            }
        }
    }

    function ne(e, t, n) {
        var r = geByClass1("_im_peer_history_w", e);
        show(r), hasAccessibilityMode() && addClass(r, "history_a11y");
        var a = (0, de.createMutations)(te),
            i = a.callMutations,
            o = a.bindMutations,
            s = function(e) {
                var t = debounce(e, 100),
                    n = throttle(e, 100);
                return function(e) {
                    t(e), n(e)
                }
            }(w.bind(null, t)),
            u = (0, we.mount)(t, e),
            d = k.bind(null, t, i, r, s, u, e),
            p = (0, ye.createScroll)(geByClass1("_im_chat_body_abs", e), {
                onScroll: d,
                nativeScroll: (0, ie.isClassicInterface)(t),
                shadows: !1
            });
        setTimeout(function() {
            t.get().peer && (K(t), ((0, oe.getCurrentTab)(t).pinned || (0, oe.getCurrentTab)(t).top_banner) && (i().updateChatTopic(t.get().peer, t), t.set(ae.setActions), v.changeActions(t)), t.get().msgid ? I(p, e, t.get().msgid, t) : T(p, e, i, t, u) || p.scrollBottom(Ae), t.get().history_init = !1, u.reset(p), O(t, e), k(t, i, r, s, u, e, 0, p), (0, ie.ensureDomHasActions)(e), nav.objLoc.st && (t.mutate(ae.setInplaceSearch.bind(null, nav.objLoc.st, t.get().peer)), i().startSearch(t)))
        }, 15);
        var v = (0, fe.mount)(geByClass1("_im_dialog_actions", e), t, i),
            b = (0, pe.mount)(geByClass1("_im_text_input", e), t, i),
            y = (0, me.mount)(geByClass1("_im_dialog_actions", e), t, i),
            C = (0, _e.mount)(e, t, i),
            E = (0, ve.mount)(e, t, function() {
                return {
                    changedMessageSelection: v.changedMessageSelection
                }
            });
        (0, be.mount)(e, t, i);
        var S = (0, Le.mount)(e, t, function() {
            return {
                hidePinned: function() {
                    (0, be.pinnedMessageHide)(t, t.get().peer, i, !1)
                },
                compensateHistoryHeightChange: function(e) {
                    i().compensateHistoryHeightChange(e)
                },
                showPinned: function() {
                    (0, be.pinnedMessageUnHide)(t, t.get().peer, i, !1)
                }
            }
        });
        (0, ie.isReservedPeer)(t.get().peer) || t.set(ae.restoreHistoryQueue.bind(null, t.get().peer)).then(function() {
            (0, ie.restoreQueue)(t.get().peer, t.get(), _(e)), g(e, t, t.get().peer)
        }), c("_im_chat_resize_track", e, n);
        var L = x.bind(null, t, e, i),
            A = N.bind(null, t, e, p),
            j = R.bind(null, t, n, e),
            F = D.bind(null, n, t),
            H = B.bind(null, i, t, e, p),
            z = h.bind(null, t, e),
            G = ie.showEditTimeTooltip.bind(null, t),
            Y = P.bind(null, t, L, e),
            Q = ie.showChatMembers.bind(null, t, i, ae.setCreationType),
            $ = m.bind(null, t, e, p),
            X = V.bind(null, i, t, p),
            ee = q.bind(null, t),
            ne = W.bind(null, t, i),
            re = (0, de.createModule)({
                handlers: function(n, r) {
                    r(e, "click", ie.RESTORE_CLASS, A), r(e, "mouseover click", ie.FAILED_CLASS, z), r(e, "mouseover", "_im_edit_time", G), r(e, "click", "_im_mess_susp", l.bind(null, e)), r(e, "click", Be, j), r(e, "click", He, Y), r(e, "click", ie.SHOW_CHAT_MEMBERS_CLASS, Q), r(e, "click", Ue, $), r(e, "mouseover", ze, U), r(e, "mouseover", Qe, ee), r(e, "click", $e, ne), r(e, "click", Ve, f), r(e, "click", Xe, function(e, n) {
                        if (checkEvent(e)) return !0;
                        if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                        var r = geByClass1("flat_button", n),
                            a = {
                                invite_chat_id: domData(r, "inv-id"),
                                invite_hash: domData(r, "hash")
                            };
                        (0, ie.showInvitationBox)(t, a, ae.leaveInvitation), cancelEvent(e)
                    }), r(e, "click", qe, function() {
                        return t.get().longpoll.push([(0, Ce.resetPeer)()])
                    }), r(e, "click", We, function(e) {
                        return Z(t, i, e)
                    }), n(geByClass1("_im_peer_history_w", e), "mousemove", u.show), n(geByClass1("_im_start_new", e), "click", F), n(geByClass1(Fe, e), "click", H), n(geByClass1("_im_cancel_edit", e), "click", function() {
                        return i().cancelEditing(), !1
                    }), n(geByClass1("_im_edit_focus_cur", e), "click", function() {
                        return i().focusEditingMessage(), !1
                    }), le.screenfull.raw && n(document, le.screenfull.raw.fullscreenchange, X)
                }
            });
        curNotifier.recvClbks.pin_hide = [function(e) {
            e.hide ? (0, be.pinnedMessageHide)(t, e.peer, i, !1) : (0, be.pinnedMessageUnHide)(t, e.peer, i, !1)
        }], window.showForwardBox = function(e) {
            return J(t, e)
        };
        var se = setInterval(M.bind(null, t, e, v), 1e4);
        return o(re, e, p, v, b, i, n, y, C, E, d, t, s, se, u, S)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var re = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.mount = ne;
    var ae = n(28),
        ie = n(88),
        oe = n(190),
        se = n(188),
        le = n(43),
        ue = n(23),
        de = n(198),
        fe = n(108),
        pe = n(153),
        me = n(125),
        he = n(171),
        _e = n(91),
        ve = n(203),
        be = n(37),
        ye = n(40),
        we = n(193),
        Ce = n(199),
        Ee = n(107),
        ke = n(7),
        Se = r(ke),
        Te = n(110),
        Ie = n(150),
        Me = n(210),
        Pe = n(187),
        Le = n(78),
        Oe = 1e3,
        Ae = -30,
        xe = 30,
        Ne = 2e3,
        De = 700,
        Re = 15,
        je = 47,
        Be = "_im_cancel_fwd",
        Fe = "_im_to_end",
        He = "_im_failed_action",
        Ue = "_im_mess_link",
        ze = "_im_admin_name",
        Ge = "_im_typer_c",
        Ve = "_im_error",
        qe = "_im_join_cancel",
        We = "_im_retry_media",
        Ke = "im-audio-message_recorded",
        Ye = "im-audio-message_recording",
        Qe = "_im_mess_srv",
        $e = "im_srv_mess_link",
        Xe = "_chat_invitation",
        Ze = "_im_mess",
        Je = !1,
        et = {}
}, function(e, t, n) {
    var r = n(20),
        a = n(30),
        i = function(e, t) {
            if (a(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(172)(Function.call, n(185).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (a) {
                t = !0
            }
            return function(e, n) {
                return i(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: i
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e = e || ("undefined" != typeof document ? document : void 0), "undefined" == typeof e) return null;
        try {
            return e.activeElement || e.body
        } catch (t) {
            return e.body
        }
    }
    e.exports = r
}, function(e, t, n) {
    var r = n(30),
        a = n(39),
        i = n(81),
        o = n(161)("IE_PROTO"),
        s = function() {},
        l = "prototype",
        u = function() {
            var e, t = n(68)("iframe"),
                r = i.length,
                a = ">";
            for (t.style.display = "none", n(151).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + a), e.close(), u = e.F; r--;) delete u[l][i[r]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[l] = r(e), n = new s, s[l] = null, n[o] = e) : n = u(), void 0 === t ? n : a(n, t)
    }
}, function(e, t, n) {
    var r = n(64),
        a = n(41),
        i = n(186),
        o = n(33),
        s = n(172),
        l = "prototype",
        u = function(e, t, n) {
            var c, d, f, p, m = e & u.F,
                g = e & u.G,
                h = e & u.S,
                _ = e & u.P,
                v = e & u.B,
                b = g ? r : h ? r[t] || (r[t] = {}) : (r[t] || {})[l],
                y = g ? a : a[t] || (a[t] = {}),
                w = y[l] || (y[l] = {});
            g && (n = t);
            for (c in n) d = !m && b && void 0 !== b[c], f = (d ? b : n)[c], p = v && d ? s(f, r) : _ && "function" == typeof f ? s(Function.call, f) : f, b && o(b, c, f, e & u.U), y[c] != f && i(y, c, p), _ && w[c] != f && (w[c] = f)
        };
    r.core = a, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t) {
        return (0, P.toArray)(e).find(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function i(e, t) {
        return (0, P.toArray)(e).findIndex(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function o(e, t, n, r) {
        if (n) {
            s(e, t, r);
            var i = domData(n, "list-id"),
                o = i && a(t.children, i);
            o && r.forEach(function(e) {
                return addClass(o, e)
            }), e.setState({
                hoveredListItemId: i
            })
        }
    }

    function s(e, t, n) {
        var r = domQuery("." + n.join("."), t);
        r && (0, P.toArray)(r).forEach(function(e) {
            n.forEach(function(t) {
                return removeClass(e, t)
            })
        }), e.setState({
            hoveredListItemId: null
        })
    }

    function l(e, t) {
        var n = t && domQuery("." + t.join("."), e)[0];
        return n ? domData(n, "list-id") : null
    }

    function u(e, t, n) {
        return e.map(t).reduce(function(e, t) {
            return e[t] = !0, e
        }, n)
    }

    function c(e, t, n) {
        var r = e.filter(function(e) {
            return !n.ids[t(e)]
        });
        return {
            _sortedEls: !1,
            els: r,
            ids: u(r, t, n.ids),
            elements: n.elements.concat(r)
        }
    }

    function d(e, t, n) {
        return {
            ids: u(n.get().elements, e, {}),
            scrolls: t,
            activated: !0
        }
    }

    function f(e, t, n) {
        return n.elements = n.elements.filter(function(n) {
            return t(n) !== e
        }), delete n.ids[e], Promise.resolve(n)
    }

    function p(e, t, n) {
        var r = [];
        n.elements = n.elements.map(function(n) {
            var a = t(n),
                i = e.filter(function(e) {
                    return t(e) === a
                })[0];
            return r.push(a), i || n
        });
        var a = e.filter(function(e) {
            return !inArray(t(e), r)
        });
        return n.elements = n.elements.concat(a), Promise.resolve(n)
    }

    function m(e, t) {
        var n = t.get();
        return !n._sortedEls && e && t.setState({
            elements: n.elements.sort(e),
            _sortedEls: !0
        }), t.get().elements
    }

    function g(e) {
        var t = {};
        return e.forEach(function(e) {
            "r" === e[0] && t["a," + e[1]] ? delete t["a," + e[1]] : t[e[0] + "," + e[1]] = e
        }), Object.keys(t).map(function(e) {
            return t[e]
        })
    }

    function h(e, t) {
        for (var n = [], r = Math.max(e.length, t.length), a = 0; r > a; a++) {
            var i = e[a],
                o = t[a];
            !i && o ? n.push(["a", o, a]) : i && !o ? n.push(["r", i, a]) : i !== o && (n.push(["r", i, a]), n.push(["a", o, a]))
        }
        var s = g(n),
            l = g(n.reverse());
        return s.length > l.length ? l : s
    }

    function _(e, t, n, r, a, i) {
        for (var o = 0; r > o; o++) e = domNS(e);
        var s = se(a(t));
        return domData(s, "list-id", n), e ? i.insertBefore(s, e) : i.appendChild(s), e
    }

    function v(e, t, n, r) {
        if (0 !== t.length) {
            t = t.sort(function(e, t) {
                return e[2] - t[2]
            });
            var a = t.filter(function(e) {
                    return "a" === e[0]
                }),
                i = t.filter(function(e) {
                    return "r" === e[0]
                });
            if (i.map(function(t) {
                    return e.children[t[2]]
                }).forEach(function(e) {
                    return re(e)
                }), 0 !== a.length)
                for (var o = a.shift(), s = o[2], l = _(e.children[s], n[o[2]], o[1], 0, r, e), u = 0; u < a.length; u++) o = a[u], l = _(e.children[s], n[o[2]], o[1], o[2] - s, r, e), s = o[2]
        }
    }

    function b(e, t) {
        e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
    }

    function y(e, t, n, r, a) {
        var i = r.get(),
            o = i.limit,
            s = i.offset,
            l = n().sortFn,
            u = m(l, r).slice(0, s + o),
            c = (0, P.toArray)(e.children).map(function(e) {
                return domData(e, "list-id")
            }).filter(function(e) {
                return !!e
            }),
            d = u.map(function(e) {
                return n().idFn(e).toString()
            }),
            f = h(c, d);
        return v(e, f, u, n().renderFn), b(r, t), a ? f.filter(function(e) {
            return "a" == e[0]
        }).map(function(e) {
            return parseInt(e[1])
        }) : void 0
    }

    function w(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1,
            o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            l = e.get(),
            u = t.getContainer().children,
            c = i(u, r || l.hoveredListItemId);
        if (!(0 > c)) {
            var d = void 0;
            d = l.limit + l.offset < c ? e.setState({
                offset: c - l.limit + 1
            }).then(y.bind(null, t.getContainer(), t, n)) : Promise.resolve(), d.then(function() {
                var e = u[c],
                    n = t.scrollTop(),
                    r = t.getScrollHeight(),
                    i = e.offsetHeight;
                o = "center" === o ? -.5 * t.getScrollHeight() : o, s = "center" === s ? r / 2 : s;
                var l = a ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    d = n + o > e.offsetTop,
                    f = i + e.offsetTop > n + r - s;
                d ? l(e.offsetTop - o) : f && l(e.offsetTop - r + i + s)
            })
        }
    }

    function C(e, t) {
        if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
        e.get().loading = !0;
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), a = 2; n > a; a++) r[a - 2] = arguments[a];
        return t.apply(void 0, r).then(function() {
            e.get().loading = !1
        })
    }

    function E(e, t, n) {
        return n.scrolls || (n.scrolls = {}), (!n.scrolls[e] || t) && (n.scrolls[e] = {
            scrolled: n.scrolled || 0,
            scrollItem: n.scrollItem
        }), Promise.resolve(n)
    }

    function k(e, t, n, r) {
        var a = e.get(),
            i = a.elements,
            o = r.getContainer(),
            s = e.setState({
                offset: a.offset + a.limit
            }).then(function() {
                var n = a.offset,
                    s = a.limit,
                    l = void 0;
                return s + n > i.length ? l = t().more(n, s).then(function(t) {
                    return t === !1 ? [] : (0 === t.length && e.setState({
                        stop: !0
                    }), t)
                }).then(T.bind(null, e, o, r, t, a.pipeId)) : (l = Promise.resolve(), y(o, r, t, e)), l
            });
        if (!n) {
            var l = i.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
            (0, M.wrapLoading)(o)(s, "bottom", l)
        }
        return s
    }

    function S(e, t) {
        var n = e.get().pipeId;
        return !("undefined" != typeof n && "undefined" != typeof t && n !== t)
    }

    function T(e, t, n, r, a, i) {
        return S(e, a) ? e.setState(c(i, r().idFn, e.get())).then(y.bind(null, t, n, r)) : !1
    }

    function I(e, t, n) {
        var c = C.bind(null, t, k.bind(null, t, n)),
            m = function(e, r) {
                (t.get().activated || e) && ("undefined" != typeof r && t.get().elements.length > 0 && t.setState({
                    scrolled: r
                }), n().onScroll && n().onScroll())
            },
            g = (0, L.createScroll)(e, {
                noScroll: t.get().noScroll,
                nativeScroll: t.get().nativeScroll,
                scrollChange: m.bind(null, !1),
                more: n().more ? c.bind(null, !1) : !1
            }),
            h = (0, O.createModule)({
                handlers: function(r, a) {
                    a(e, "click", t.get().elCls, n().onClick)
                }
            });
        return t.setState(d(n().idFn, {}, t)), {
            pipe: function(e, r) {
                return t.setState({
                    pipeId: r
                }), e.then(T.bind(null, t, g.getContainer(), g, n, r))
            },
            replacePreserveOrder: function(e) {
                return t.set(p.bind(null, e, n().idFn)).then(y.bind(null, g.getContainer(), g, n))
            },
            pipeReplace: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
                return t.setState({
                    pipeId: r,
                    stop: !1
                }), e.then(function(e) {
                    return S(t, r) ? t.setState({
                        elements: e,
                        _sortedEls: !1,
                        ids: u(e, n().idFn, {})
                    }).then(y.bind(null, g.getContainer(), g, n, t, a)) : void 0
                })
            },
            wipe: function() {
                g.getContainer().innerHTML = ""
            },
            deactivate: function() {
                t.setState({
                    activated: !1
                })
            },
            activate: function() {
                t.setState({
                    activated: !0
                })
            },
            saveScroll: function(e, n) {
                return t.set(E.bind(null, e, n))
            },
            updateScroll: function() {
                g.update(!1, !0)
            },
            toTop: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                t ? g.smoothScroll(-g.scrollTop()) : g.scrollTop(0), e && m(e, 0)
            },
            scrollTop: function(e) {
                return g.scrollTop(e)
            },
            restoreScroll: function(e) {
                var n = t.get().scrolls,
                    a = n[e];
                return a && (t.setState({
                    scrolls: extend({}, n, r({}, e, null))
                }), g.scrollTop(a.scrolled)), !!a
            },
            unsetScroll: function(e) {
                t.setState({
                    scrolls: extend({}, t.get().scrolls, r({}, e, null))
                })
            },
            scrollPage: function(e, t) {
                var n = g.scroll.scroller,
                    r = g.scrollTop(),
                    a = "up" === e ? -1 : 1,
                    i = r + a * n.clientHeight;
                t ? g.smoothScroll(i - r) : g.scrollTop(i)
            },
            scrollToElement: function(e, r, a, i) {
                w(t, g, n, e, r, a, i)
            },
            checkMore: function(e) {
                return t.get().elements.length < t.get().limit ? c(e, g) : Promise.resolve([])
            },
            add: function(e, r) {
                return T(t, g.getContainer(), g, n, r, e)
            },
            hoverNextElement: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    s = g.getContainer(),
                    u = s.children,
                    c = t.get().hoveredListItemId || l(s, r),
                    d = i(u, c),
                    f = (0, P.toArray)(u).slice(d + 1).find(n().hoverableFn);
                o(t, s, f, e), w(t, g, n, null, !1, a.top, a.bottom)
            },
            hoverPrevElement: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    s = g.getContainer(),
                    u = s.children,
                    c = t.get().hoveredListItemId || l(s, r),
                    d = i(u, c),
                    f = d >= 0 && (0, P.toArray)(u).slice(0, d).reverse().find(n().hoverableFn);
                o(t, s, f, e), w(t, g, n, null, !1, a.top, a.bottom)
            },
            hoverFirstElement: function(e, r) {
                var a = g.getContainer(),
                    i = a.children,
                    s = (0, P.toArray)(i).findIndex(n().hoverableFn),
                    l = i[s];
                !t.get().hoveredListItemId && l && (o(t, a, l, e), w(t, g, n, s, !1, r.top, r.bottom))
            },
            hoverElement: function(e, r, a) {
                var s = g.getContainer(),
                    l = s.children,
                    u = i(l, e),
                    c = l[u];
                c && (o(t, s, c, r), w(t, g, n, u, !1, a.top, a.bottom))
            },
            unhoverElements: function(e) {
                s(t, g.getContainer(), e)
            },
            reset: function() {
                var e = t.get().scrolls;
                t.reset(), t.setState(d(n().idFn, e, t))
            },
            getHoveredElement: function() {
                return a(g.getContainer().children, t.get().hoveredListItemId)
            },
            getCurrentElements: function() {
                return t.get().elements
            },
            isLoading: function() {
                return t.get().loading
            },
            isEmpty: function() {
                return 0 === t.get().elements.length
            },
            remove: function(e) {
                t.set(f.bind(null, e, n().idFn)).then(y.bind(null, g.getContainer(), g, n))
            },
            unmount: function() {
                (0, O.destroyModule)(h), g.destroy()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createIdMap = u, t.addElements = c, t.collapseOps = g, t.distance = h, t.mount = I;
    var M = n(88),
        P = n(23),
        L = n(40),
        O = n(198)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = PageID;
        return function() {
            t == PageID && e.apply(this, arguments)
        }
    }

    function a(e, t) {
        return setTimeout(r(e), t)
    }

    function i(e, t) {
        return Math.random() * (t - e + 1) + e
    }

    function o(e, t) {
        return Math.floor(i(e, t))
    }

    function s(e) {
        return "undefined" == typeof e
    }

    function l(e) {
        return e && "[object Function]" === Object.prototype.toString.call(e)
    }

    function u(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }

    function c(e) {
        return "string" == typeof e
    }

    function d(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }

    function f(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function p() {
        return +new Date
    }

    function m() {
        return window.Image ? new Image : ce("img")
    }

    function g(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function h(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function _(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function v(e) {
        return e === !0 ? 1 : parseInt(e) || 0
    }

    function b(e) {
        return e === !0 ? 1 : parseFloat(e) || 0
    }

    function y(e) {
        return e = v(e), 0 > e ? 0 : e
    }

    function w(e) {
        return !isNaN(e)
    }

    function C(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return t = v(t), t >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function E(e) {
        return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
    }

    function k(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function S(e) {
        return E(e.replace(/\t/g, "\n"))
    }

    function T(e, t) {
        if (d(e) || "undefined" == typeof e.length) {
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && t.call(e[n], n, e[n]) === !1) break
        } else
            for (var r = 0, a = e.length; a > r; r++) {
                var i = e[r];
                if (t.call(i, r, i) === !1) break
            }
        return e
    }

    function I(e, t, n) {
        for (var r = n || 0, a = (e || []).length; a > r; r++)
            if (e[r] == t) return r;
        return -1
    }

    function M(e, t) {
        return -1 != I(t, e)
    }

    function P(e, t) {
        var n = d(e) || "undefined" == typeof e.length ? {} : [];
        for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === j(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = P(e[r]) : n[r] = e[r]);
        return n
    }

    function L(e) {
        var t, n, r = {},
            a = 1,
            i = arguments.length,
            o = arguments;
        for (t in e) {
            for (n = !1, a = 1; i > a; a++) o[a][t] && o[a][t] == e[t] && (n = !0);
            n || (r[t] = e[t])
        }
        return r
    }

    function O() {
        var e, t = arguments,
            n = t[0] || {},
            r = 1,
            a = t.length,
            i = !1;
        for ("boolean" == typeof n && (i = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : j(n)) || l(n) || (n = {}); a > r; ++r)
            if (null != (e = t[r]))
                for (var o in e) {
                    var s = n[o],
                        u = e[o];
                    n !== u && (i && u && "object" === ("undefined" == typeof u ? "undefined" : j(u)) && !u.nodeType ? n[o] = O(i, s || (null != u.length ? [] : {}), u) : void 0 !== u && (n[o] = u))
                }
        return n
    }

    function A(e) {
        window.templates = window.templates || {}, O(window.templates, e)
    }

    function x(e, t) {
        var n = window.templates = window.templates || {},
            r = n[e];
        return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
    }

    function N(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : j(e))) return !1;
        var t = {},
            n = function(t) {
                return geByTag(t, e)
            },
            r = function(n, r) {
                if (r.name)
                    if ("text" != r.type && r.type)
                        if (r.getAttribute("bool")) {
                            var a = val(r);
                            if (!a || "0" === a) return;
                            t[r.name] = 1
                        } else t[r.name] = browser.msie && !r.value && e[r.name] ? e[r.name].value : r.value;
                else t[r.name] = val(r)
            };
        return T(n("input"), function(e, t) {
            return "radio" != t.type && "checkbox" != t.type || t.checked ? r(e, t) : void 0
        }), T(n("select"), r), T(n("textarea"), r), t
    }

    function D(e, t) {
        for (var n, r = t ? F : B, a = []; e && (n = e.match(r));) {
            e = e.substr(n.index + n[0].length);
            var i = 0;
            n[4] || (i = 7), a.push({
                url: n[2 + i],
                query: n[5 + i] || "",
                domain: n[4 + i]
            })
        }
        return a
    }

    function R() {
        return window.devicePixelRatio >= 2
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.vkLocal = r, t.lTimeout = a, t.rand = i, t.irand = o, t.isUndefined = s, t.isFunction = l, t.isArray = u, t.isString = c, t.isObject = d, t.isEmpty = f, t.vkNow = p, t.vkImage = m, t.trim = g, t.stripHTML = h, t.escapeRE = _, t.intval = v, t.floatval = b, t.positive = y, t.isNumeric = w, t.winToUtf = C, t.replaceEntities = E, t.clean = k, t.unclean = S, t.each = T, t.indexOf = I, t.inArray = M, t.clone = P, t.arrayKeyDiff = L, t.extend = O, t.addTemplates = A, t.getTemplate = x, t.serializeForm = N, t.extractUrls = D, t.isRetina = R, window.PageID = window.PageID || 1;
    var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        F = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
    window.isRetina = R, window.extractUrls = D, window.serializeForm = N, window.addTemplates = A, window.getTemplate = x, window.rand = i, window.irand = o, window.isUndefined = s, window.isFunction = l, window.isArray = u, window.isString = c, window.isObject = d, window.isEmpty = f, window.vkNow = p, window.vkImage = m, window.trim = g, window.stripHTML = h, window.escapeRE = _, window.intval = v, window.floatval = b, window.positive = y, window.isNumeric = w, window.winToUtf = C, window.replaceEntities = E, window.clean = k, window.unclean = S, window.each = T, window.indexOf = I, window.inArray = M, window.clone = P, window.arrayKeyDiff = L, window.extend = O, window.vkLocal = r, window.lTimeout = a
}, function(e, t, n) {
    "use strict";
    e.exports = n(31)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t && (t.im_v = o), new Promise(function(r, a) {
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

    function a(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = i(e, t, n),
            a = r.request;
        return a
    }

    function i(e, t) {
        function n() {
            a.abort()
        }
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = void 0;
        a = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var i = new Promise(function(n, i) {
            var o = void 0,
                s = Date.now(),
                l = r.timeout || 60,
                u = ajx2q(t);
            if (window.XDomainRequest) a.open("get", e + "?" + u), a.ontimeout = function() {
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
                    a.open("GET", e + "?" + u, !0)
                } catch (c) {
                    return i([c, a])
                }
                a.send()
            }
            o = setInterval(function() {
                Date.now() - s > 1e3 * l && (i(["", {}]), clearInterval(o))
            }, 1e3)
        });
        return {
            request: i,
            cancel: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.post = r, t.plainget = a, t.plaingetCancelable = i;
    var o = (t.CONTROLLER = "al_im.php", 2)
}, function(e, t, n) {
    for (var r = n(205), a = n(33), i = n(64), o = n(186), s = n(212), l = n(61), u = l("iterator"), c = l("toStringTag"), d = s.Array, f = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; 5 > p; p++) {
        var m, g = f[p],
            h = i[g],
            _ = h && h.prototype;
        if (_) {
            _[u] || o(_, u, d), _[c] || o(_, c, g), s[g] = d;
            for (m in r) _[m] || a(_, m, r[m], !0)
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(92)),
        f = n(11),
        p = r(f),
        m = n(26),
        g = r(m),
        h = n(27),
        _ = r(h),
        v = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.onRemoveToken = function(e) {
                    var t = r.searchContainer.offsetHeight;
                    r.props.onRemoveToken(e.target.getAttribute("data-id")).then(function() {
                        r.updateScroll(t)
                    })
                }, r.onChange = function(e) {
                    var t = e.target.value;
                    t !== r.value && (r.value = t, r.props.onChange(e))
                }, r.onSelect = function(e) {
                    var t = r.searchContainer.offsetHeight;
                    r.props.onSelect(e.currentTarget.getAttribute("data-id")).then(function() {
                        r.updateScroll(t)
                    })
                }, r.updateScroll = function(e) {
                    var t = r.searchContainer.offsetHeight;
                    r.input.focus(), r.searchContainer.scrollTop = r.searchContainer.scrollHeight, e !== t && (r.scrollContainer.scrollTop = r.scrollContainer.scrollTop + t - e)
                }, r.inputRef = function(e) {
                    r.input = e
                }, r.searchContainerRef = function(e) {
                    r.searchContainer = e
                }, r.scrollContainerRef = function(e) {
                    var t = e;
                    if (e && e.container)
                        for (t = e; t.container;) t = t.container;
                    r.scrollContainer = t
                }, r.value = n.value, r
            }
            return o(t, e), t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    n = t.className,
                    r = t.tokens,
                    a = t.removeTokenPlaceholder,
                    i = t.value,
                    o = t.placeholder,
                    l = t.useInfiniteScroll,
                    c = t.loadMore,
                    f = t.hasMore,
                    m = t.virtualized,
                    h = t.notFoundText,
                    v = l ? p["default"] : "div",
                    b = l ? {
                        loadMore: c,
                        hasMore: f,
                        virtualized: m,
                        useCapture: !1
                    } : {},
                    y = [].concat(this.props.children);
                return u["default"].createElement("div", {
                    className: (0, d.classNames)("MultiSelect", n)
                }, u["default"].createElement("div", {
                    className: "MultiSelect__search",
                    ref: this.searchContainerRef
                }, r.map(function(t, n) {
                    return u["default"].createElement("span", {
                        className: "MultiSelect__token",
                        key: t.id
                    }, u["default"].createElement("span", {
                        className: "MultiSelect__tokenTitle"
                    }, t.text), a ? u["default"].createElement(_["default"], {
                        text: a
                    }, u["default"].createElement("span", {
                        className: "MultiSelect__tokenRemove",
                        "data-id": t.id,
                        onClick: e.onRemoveToken
                    })) : u["default"].createElement("span", {
                        className: "MultiSelect__tokenRemove",
                        "data-id": t.id,
                        onClick: e.onRemoveToken
                    }))
                }), u["default"].createElement("div", {
                    className: "MultiSelect__caret"
                }, u["default"].createElement("div", {
                    className: "MultiSelect__caretIn"
                }, u["default"].createElement("input", {
                    type: "text",
                    className: "MultiSelect__input",
                    placeholder: 0 === r.length ? o : "",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: i,
                    ref: this.inputRef
                })))), 0 === y.length && this.props.value && u["default"].createElement("div", {
                    className: "MultiSelect__empty"
                }, u["default"].createElement("div", {
                    className: "MultiSelect__emptyIn"
                }, h)), u["default"].createElement(v, s({
                    className: "MultiSelect__scroll",
                    ref: this.scrollContainerRef
                }, b), y.map(function(t) {
                    return u["default"].createElement(g["default"], {
                        className: "MultiSelect__suggestsItem",
                        "data-id": t.props["data-id"],
                        onClick: e.onSelect,
                        key: t.key
                    }, t)
                })))
            }, t
        }(l.PureComponent);
    t["default"] = v, v.defaultProps = {
        removeTokenPlaceholder: "",
        placeholder: "",
        value: "",
        useInfiniteScroll: !1,
        notFoundText: "Not found"
    }
}, function(e, t, n) {
    "use strict";
    var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
        a = {
            canUseDOM: r,
            canUseWorkers: "undefined" != typeof Worker,
            canUseEventListeners: r && !(!window.addEventListener && !window.attachEvent),
            canUseViewport: r && !!window.screen,
            isInWorker: !r
        };
    e.exports = a
}, function(e, t, n) {
    var r = n(79),
        a = n(44),
        i = n(164),
        o = n(133),
        s = n(18),
        l = n(201),
        u = Object.getOwnPropertyDescriptor;
    t.f = n(131) ? u : function(e, t) {
        if (e = i(e), t = o(t, !0), l) try {
            return u(e, t)
        } catch (n) {}
        return s(e, t) ? a(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    var r = n(128),
        a = n(44);
    e.exports = n(131) ? function(e, t, n) {
        return r.f(e, t, a(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t, n) {
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

    function l(e, t) {
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
                fwd_count: (0, f.parseFwd)(e.fwd).length
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

    function u(e, t) {
        return new a(e, "draft_" + t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.ImDraft = a, t.convertKludgesToAttaches = l, t.loadDraftForPeer = u;
    var d = n(181),
        f = n(82);
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
            var n = c(e, 2),
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
        return r ? (0, d.post)(d.CONTROLLER, {
            act: "draft_medias",
            gid: e,
            messageId: t || 0,
            media: t ? void 0 : this.dData.attaches.map(function(e) {
                return [e.type, e.id]
            }).join("*")
        }).then(function(e) {
            var t = c(e, 1),
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
}, function(e, t, n) {
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

    function l(e) {
        return o(e, "doc") && "audiomsg" === e.attaches[0].kind
    }

    function u(e) {
        return o(e, "sticker")
    }

    function c(e) {
        return o(e, "gift")
    }

    function d(e) {
        return o(e, "money_transfer", "money_request")
    }

    function f(e) {
        return o(e, "money_request")
    }

    function p(e) {
        return o(e, "link") && m(e.kludges.attach1_url)
    }

    function m(e) {
        var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
            n = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
        return t.test(e) || n.test(e)
    }

    function g(e) {
        return e.flags & y.FLAG_IMPORTANT
    }

    function h(e) {
        return i(e) ? vk.id : e.userId
    }

    function _(e) {
        return e.update_time > 0
    }

    function v(e, t) {
        return (e.get().selectedMessages || []).indexOf(t) >= 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isUnread = a, t.isOut = i, t.isGraffiti = s, t.isAudioMsg = l, t.isSticker = u, t.isGift = c, t.isMoney = d, t.isMoneyRequest = f, t.isMessageWithInviteLink = p, t.isImportant = g, t.getUserId = h, t.wasEdited = _, t.isMessageSelected = v;
    var b = n(199),
        y = r(b)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        u = u.reduce(function(t, n) {
            var r = l(n, 2),
                a = r[0],
                i = r[1],
                o = i(e);
            return o ? t : t.concat([
                [a, i]
            ])
        }, [])
    }

    function a(e, t) {
        d === !1 && (d = !0, document.body.addEventListener("click", r, !0)), u = u.concat([
            [e, t]
        ])
    }

    function i(e) {
        u = u.filter(function(t) {
            var n = l(t, 1),
                r = n[0];
            return r !== e
        }), 0 === c && (document.body.removeEventListener("click", r, !0), d = !1)
    }

    function o(e, t) {
        u = u.map(function(n) {
            var r = l(n, 2),
                a = r[0],
                i = r[1];
            return a === e ? [e, t] : [a, i]
        })
    }

    function s(e, t) {
        return 0 === t.length ? function(t) {
            return e(t), !0
        } : function(n) {
            var r = t.reduce(function(e, t) {
                return e && !domClosest(t, n.target)
            }, !0);
            return r && e(n), r
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t["default"] = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return c++, {
            stop: function() {
                c--, i(e)
            },
            replaceOrAdd: function(n) {
                var r = u.filter(function(t) {
                        var n = l(t, 1),
                            r = n[0];
                        return e === r
                    }),
                    i = s(n, t);
                r.length > 0 ? o(e, i) : a(e, i)
            }
        }
    };
    var u = [],
        c = 0,
        d = !1
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
            var a = b(e, t, n);
            return !(0, V.isOut)(a) && intval(n) > r.in_up_to
        })[0]
    }

    function o(e) {
        var t = a(e);
        return t.searchShown
    }

    function s(e) {
        var t = a(e);
        return t.peer
    }

    function l(e, t) {
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
        var r = l(e, t),
            a = c(e)[0];
        if ("undefined" == typeof a) return [n];
        var i = Math.min(n, a),
            o = Math.max(n, a);
        return Object.keys(r.msgs).filter(function(e) {
            return e >= i && o >= e
        }).filter(function(t) {
            return !(0, Y.isServiceMsg)(b(e, e.get().peer, t))
        }).map(intval)
    }

    function f(e, t) {
        var n = a(t),
            r = l(n, e),
            i = 0;
        for (var o in r.msgs)
            if (r.msgs.hasOwnProperty(o)) {
                var s = b(t, e, o);
                (0, V.isOut)(s) || (i += (0, V.isUnread)(r, s) ? 1 : 0)
            }
        return i
    }

    function p(e, t, n) {
        var r = l(e, t);
        return Object.keys(r.msgs).filter(function(r) {
            return intval(b(e, t, r).randomId) === n
        }).length > 0
    }

    function m(e, t, n) {
        var r = p(e, t, n);
        return !!r
    }

    function g(e, t) {
        var n = a(e),
            r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
        return "undefined" != typeof r ? 2e9 + r : t
    }

    function h(e, t, n) {
        var r = l(e, t),
            a = b(e, t, n),
            i = Object.keys(r.msgs).filter(function(n) {
                var r = b(e, t, n),
                    i = r.local && r.type !== q.EDIT_MESSAGE;
                return !a.local && i ? !1 : a.local && !i ? !0 : g(e, a.messageId) > g(e, r.messageId)
            }),
            o = i.pop();
        return o ? b(e, t, o) : null
    }

    function _(e) {
        return e && e.length > 0 ? W.addMessageEvent([0].concat(e)) : e
    }

    function v(e, t, n) {
        var r = l(e, t),
            i = b(e, t, n),
            o = a(e);
        return (0, V.isOut)(i) ? (0, Q.oCacheGet)(e, o.id).name : i.userId !== i.peerId ? (0, Q.oCacheExists)(e, i.userId) ? (0, Q.oCacheGet)(e, i.userId).name : !1 : r.tab
    }

    function b(e, t, n) {
        var r = l(e, t),
            a = r && r.msgs && r.msgs[n];
        return a ? _(a) : null
    }

    function y(e, t, n) {
        var r = l(e, t),
            a = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                return +e - t
            });
        if (!a) return null;
        var i = a && a.indexOf("" + n),
            o = i > -1 ? a[i - 1] : null;
        return r.msgs[o]
    }

    function w(e) {
        var t = a(e);
        return t.gid || t.isClassic
    }

    function C(e) {
        return a(e).gid
    }

    function E(e) {
        return a(e).gid
    }

    function k(e) {
        return a(e).gid
    }

    function S(e, t) {
        var n = a(t);
        return n.tabs[e] || n.mapped_index[e]
    }

    function T(e) {
        var t = a(e);
        return k(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === K.FOLDER_UNRESPOND || t.active_tab === K.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function I(e, t) {
        e = a(e);
        var n = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
        return e.tabs[t] && e.tabs[t].msgs && n ? !0 : !1
    }

    function M(e, t) {
        var n = l(e, t);
        n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
    }

    function P(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function L(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function O(e) {
        var t = a(e);
        return !t.lockedSending
    }

    function A(e) {
        return e > -2e9 && 0 > e
    }

    function x(e, t) {
        return A(t) ? !!l(e, t).blocked_community : !1
    }

    function N(e) {
        var t = a(e);
        return t.voice_message_available
    }

    function D(e) {
        var t = a(e);
        return !(!R(t) && !t.recentSearch)
    }

    function R(e) {
        var t = a(e);
        return t.searchText
    }

    function j(e, t) {
        var n = a(e);
        return t && t !== R(e) || n.recentSearch ? !0 : !1
    }

    function B(e) {
        var t = a(e);
        return t.recentSearch
    }

    function F(e) {
        var t = u(e);
        return t && t.pinned && _(t.pinned)
    }

    function H(e) {
        var t = e.get().popular_sugg;
        return t && t.length > 0
    }

    function U(e) {
        return 1 == a(e).isEditing
    }

    function z(e) {
        return a(e).gid
    }

    function G(e) {
        return e.draft || (e.draft = (0, $.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.unpackStore = a, t.getFirstUnread = i, t.isSearchShown = o, t.getPeer = s, t.getTab = l, t.getCurrentTab = u, t.getSelectedMessages = c, t.getMessageRangeFromSelection = d, t.countUnread = f, t.getMessageByRid = p, t.isRidExist = m, t.getLocalId = g, t.getLastMessage = h, t.parserMessage = _, t.getAuthorFullName = v, t.getMessage = b, t.getPreviousMessage = y, t.isClassicInterface = w, t.isLocksAvailable = C, t.isFoldersAvailable = E, t.isCommunityInterface = k, t.getBareTab = S, t.isReversedDialogs = T, t.isFullyLoadedTab = I, t.makeTabNotFullyLoaded = M, t.isGoToEndVisible = P, t.getUnreadScrollBottom = L, t.isSendingAvailable = O, t.isCommunityPeer = A, t.isCommunityBlocked = x, t.checkVoiceMessageAvailable = N, t.isSearching = D, t.getSearchText = R, t.isSearchingValue = j, t.isRecentSearchesActive = B, t.getPinnedMessage = F, t.doPopularSuggExist = H, t.isAnyMessageBeingEdited = U, t.getGroupId = z, t.getTabDraft = G;
    var V = n(188),
        q = n(199),
        W = r(q),
        K = n(94),
        Y = n(88),
        Q = n(121),
        $ = n(187)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
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
                } catch (l) {
                    a = !0, i = l
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
        l = n(180),
        u = r(l),
        c = n(88),
        d = n(28),
        f = n(199),
        p = n(45),
        m = r(p),
        g = n(194),
        h = r(g),
        _ = n(17),
        v = r(_),
        b = n(113),
        y = r(b),
        w = n(35),
        C = r(w),
        E = n(50),
        k = r(E),
        S = n(71),
        T = r(S),
        I = n(38),
        M = r(I),
        P = n(116),
        L = r(P),
        O = 0,
        A = 1,
        x = 2,
        N = 3,
        D = 6,
        R = function(e) {
            function t(n) {
                a(this, t);
                var r = i(this, e.call(this, n));
                return r.showInvitationLink = function() {
                    var e = r.props.store,
                        t = e.get(),
                        n = t.peer;
                    return r.setState({
                        invitationLoading: !0
                    }), (0, d.getInviteLink)(n - 2e9, t).then(function(e) {
                        var t = s(e, 1),
                            n = t[0];
                        r.setState({
                            section: x,
                            invitationLoading: !1,
                            invitationLink: n
                        })
                    })
                }, r.onUpdateFlags = function(e) {
                    var t = r.props.store,
                        n = t.get(),
                        a = n.peer;
                    return (0, d.updateFlags)(a, e, n)
                }, r.onLeave = function() {
                    var e = r.props,
                        t = e.store,
                        n = e.closePopup,
                        a = t.get(),
                        i = a.peer,
                        o = showFastBox({
                            title: getLang("mail_chat_leave_title"),
                            dark: 1,
                            bodyStyle: "padding: 20px; line-height: 160%;"
                        }, getLang("mail_chat_leave_confirm"), getLang("mail_leave_chat"), function() {
                            t.set(d.unpinMessageOptimistic.bind(null, i)), t.set(d.leaveChat.bind(null, i)), o.hide(), n(), t.get().longpoll.push([(0, f.resetPeer)()])
                        }, getLang("global_cancel"), function() {
                            o.hide()
                        })
                }, r.onResetLink = function() {
                    var e = r.props.store,
                        t = e.get(),
                        n = t.peer;
                    return (0, d.resetInviteLink)(n, t).then(function(e) {
                        var t = s(e, 1),
                            n = t[0];
                        r.setState({
                            invitationLink: n,
                            invitationLinkReseted: !0
                        })
                    })
                }, r.onShowAttachments = function() {
                    var e = r.props.store.get().peer;
                    window.showWiki({
                        w: "history" + (0, c.convertPeerToUrl)(e) + "_photo"
                    }, null, {})
                }, r.state = {
                    section: O,
                    invitationLink: null,
                    invitationLinkReseted: !1
                }, r
            }
            return o(t, e), t.prototype.go = function(e) {
                this.setState({
                    section: e
                }, this.props.updatePopup)
            }, t.prototype.getPopupTitle = function() {
                var e = this.props.getLang;
                switch (this.state.section) {
                    case A:
                        return e("mail_settings_add_members");
                    case x:
                    case N:
                        return e("mail_chat_invite_link");
                    case D:
                        return e("mail_settings_options");
                    default:
                        return e("mail_settings_title")
                }
            }, t.prototype.componentWillReceiveProps = function(e) {
                var t = this,
                    n = e.store.get(),
                    r = n.peer,
                    a = n.tabs[r];
                a.photoLarge || a.photoGrid || this.resync || (this.resync = !0, e.store.set(d.getChatDetails.bind(null, r)).then(function() {
                    t.resync = !0
                }))
            }, t.prototype.componentDidMount = function() {
                this.props.updatePopup()
            }, t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    n = t.store,
                    r = t.getLang,
                    a = t.closePopup,
                    i = n.get(),
                    o = i.peer,
                    s = i.tabs[o];
                return u["default"].createElement("section", {
                    className: "ChatSettings"
                }, u["default"].createElement(m["default"], {
                    title: this.getPopupTitle(),
                    back: this.state.section !== O ? r("global_back") : void 0,
                    onCloseClick: a,
                    onBackClick: function() {
                        return e.go(O)
                    }
                }), this.state.section === O && u["default"].createElement("div", {
                    className: "ChatSettings__content"
                }, u["default"].createElement(v["default"], {
                    store: n,
                    getLang: r,
                    photo: s.photoLarge,
                    grid: s.photoGrid,
                    title: s.name,
                    meta: r("mail_im_n_chat_members", (0, c.getAliveMembersCount)(s)),
                    description: ""
                }), u["default"].createElement(k["default"], {
                    store: n,
                    getLang: r,
                    showNotificationSettings: function() {},
                    showMembersSettings: function() {
                        return e.go(A)
                    },
                    showAttachments: this.onShowAttachments,
                    showInvitationLink: this.showInvitationLink,
                    showSettings: function() {
                        return e.go(D)
                    }
                }), u["default"].createElement("div", {
                    className: "ChatSettings__pane"
                }, u["default"].createElement(T["default"], {
                    store: n,
                    getLang: r,
                    onLeave: this.onLeave
                })), u["default"].createElement("div", {
                    className: "ChatSettings__pane"
                }, u["default"].createElement(h["default"], {
                    appearance: "mobile",
                    className: "ChatSettings__leave",
                    onClick: this.onLeave
                }, r("mail_settings_leave")))), this.state.section === A && u["default"].createElement(M["default"], {
                    store: n,
                    getLang: r
                }), this.state.section === D && u["default"].createElement(L["default"], {
                    tab: s,
                    getLang: r,
                    back: function() {
                        return e.go(O)
                    },
                    onSave: this.onUpdateFlags
                }), this.state.section === x && u["default"].createElement(y["default"], {
                    getLang: r,
                    onReset: function() {
                        return e.go(N)
                    },
                    reseted: this.state.invitationLinkReseted,
                    invitationLink: this.state.invitationLink
                }), this.state.section === N && u["default"].createElement(C["default"], {
                    getLang: r,
                    onConfirm: this.onResetLink,
                    onCancel: function() {
                        return e.go(x)
                    }
                }))
            }, t
        }(l.Component);
    t["default"] = R
}, function(e, t, n) {
    var r = n(212),
        a = n(61)("iterator"),
        i = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[a] === e)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
            visibility: "visible"
        }))
    }

    function o(e, t, n, r) {
        var a = e instanceof Array ? e : geByClass("_im_bar_date", e),
            i = t.contHeight();
        y["default"].onNewMessagesChunk();
        var o = a.reduce(function(e, t) {
                return e[domData(t, "date")] = [t.offsetTop + P, i, t], e
            }, {}),
            s = !n && r.barMap ? r.barMap : {};
        return r.barMap = extend(s, o), r.barMapKeys = Object.keys(r.barMap).sort(), Promise.resolve(r)
    }

    function s(e, t) {
        return t.barMapKeys.forEach(function(n) {
            t.barMap[n][0] -= e
        }), Promise.resolve(t)
    }

    function l(e, t, n, r, a) {
        var i = e.get().barMap[t],
            o = (0, _.isClassicInterface)(a) ? M : I;
        return n - (i[0] + n - i[1]) + r - o
    }

    function u(e, t) {
        var n = e.get().barMap[t][2];
        return {
            text: n.textContent,
            date: domData(n, "date")
        }
    }

    function c(e, t, n, r) {
        return r.barTransition = r.barMap[t][2], n > 0 ? (addClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : 0 > n && (removeClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(r.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(r)
    }

    function d(e, t) {
        return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
    }

    function f(e, t, n, r, a) {
        var i = e.get(),
            o = void 0,
            s = void 0,
            c = n - t;
        i.barMapKeys.forEach(function(t) {
            var i = l(e, t, n, r, a);
            if (i >= c) {
                var u = o ? l(e, o, n, r, a) : n;
                o = u > i ? t : o
            } else if (c > i) {
                var d = s ? l(e, s, n, r, a) : 0;
                s = i > d ? t : s
            }
        });
        var d = {};
        return [
            [s, "prev"],
            [o, "cur"]
        ].forEach(function(t) {
            var i = h(t, 2),
                o = i[0],
                s = i[1];
            o && (d[s + "Bar"] = u(e, o), d[s + "Left"] = l(e, o, n, r, a) - c)
        }), d
    }

    function p(e) {
        var t = geByClass1("_im_mess", e),
            n = domData(t, "ts");
        return t && n ? {
            text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
            date: n
        } : null
    }

    function m(e, t, n, r, o) {
        var s = e.get(),
            l = (0, v.isEverythingLoaded)(s),
            u = t.get(),
            m = o.scrollTop(),
            g = u.lastTop ? u.lastTop - m : 0;
        u.lastTop = m;
        var h = (0, E.isPinnedMessageVisibleInTab)(s, s.peer) ? (0, _.getPinnedMessageHeight)() : 0,
            b = (0, v.isSearchingInplace)(s.peer, s) && s.tabs[s.peer] && s.tabs[s.peer].top_banner ? 50 : 0,
            y = ((0, _.isClassicInterface)(e) ? k + h + b : 0) - S / 2,
            w = o.contHeight(),
            C = f(t, m, w, y, e),
            T = C.prevBar,
            I = C.curBar,
            M = C.prevLeft,
            P = "translateY(0px)",
            L = !1,
            O = !1,
            A = !1;
        I || l || (I = p(r)), I ? L = I : O = !0, T && I && M > -S && 0 > M && (A = !0, O = !1, L = I, P = "translateY(" + (-S - M) + "px)"), L && i(n, L), A ? t.set(c.bind(null, n, T.date, g)) : t.set(d.bind(null, n)), P && setStyle(n, a({}, cssTransformProp, P)), toggleClass(n, "im-page--top-date-bar_no-b", O)
    }

    function g(e, t) {
        var n = geByClass1("_im_top_date_bar"),
            r = (0, C["default"])({
                lastTop: !1,
                barMap: {},
                barMapKeys: []
            }),
            a = null,
            i = null,
            l = null,
            u = debounce(function(e) {
                r.set(o.bind(null, t, e, !1))
            }, 500);
        return {
            reset: function(a) {
                r.set(o.bind(null, t, a, !0)).then(function() {
                    m(e, r, n, t, a)
                })
            },
            disable: function() {
                r.reset()
            },
            heightIncreased: function(e, t) {
                return u(t), r.set(s.bind(null, e))
            },
            parseMore: function(a, i) {
                r.set(o.bind(null, a, i, !1)).then(function() {
                    m(e, r, n, t, i)
                })
            },
            toggle: function(e) {
                e ? setStyle(n, {
                    display: ""
                }) : hide(n)
            },
            show: function() {
                i = Date.now(), l || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), l = setInterval(function() {
                    Date.now() - i > L && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(l), l = null)
                }, O))
            },
            update: function(i) {
                a && (clearTimeout(a), a = null), a = setTimeout(function() {
                    m(e, r, n, t, i)
                }, T), m(e, r, n, t, i)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var h = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.setCurrentDateBar = i, t.mount = g;
    var _ = n(88),
        v = n(28),
        b = n(7),
        y = r(b),
        w = n(112),
        C = r(w),
        E = n(37),
        k = 68,
        S = 32,
        T = 300,
        I = 20,
        M = 68,
        P = 10,
        L = 2e3,
        O = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(180),
        u = r(l),
        c = n(21),
        d = (r(c), n(57)),
        f = r(d),
        p = n(92),
        m = function(e) {
            function t() {
                return a(this, t), i(this, e.apply(this, arguments))
            }
            return o(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = (0, f["default"])(e, ["appearance", "wide", "size"]),
                    n = (0, p.classNames)("Button", "Button--" + e.appearance, "Button--size-" + e.size, {
                        "Button--wide": !!e.wide,
                        "Button--disabled": !!e.disabled,
                        "Button--loading": !!e.loading
                    }, e.className);
                return u["default"].createElement("button", s({}, t, {
                    className: n
                }), e.children)
            }, t
        }(l.Component);
    t["default"] = m, m.defaultProps = {
        appearance: "primary",
        size: "m",
        wide: !1
    }
}, function(e, t, n) {
    var r = n(20),
        a = n(174).set;
    e.exports = function(e, t, n) {
        var i, o = t.constructor;
        return o !== n && "function" == typeof o && (i = o.prototype) !== n.prototype && r(i) && a && a(e, i), e
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        function n() {
            return r ? (a = arguments, void(i = this)) : (e.apply(this, arguments), r = !0, void setTimeout(function() {
                r = !1, a && (n.apply(i, a), a = i = null)
            }, t))
        }
        var r = !1,
            a = void 0,
            i = void 0;
        return n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r
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
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e, t) {
        var n = Math.floor(t.status / 100);
        t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), O[n] = O[n] ? O[n] + 1 : 1, Date.now() - A >= L && (Object.keys(O).forEach(function(e) {
            statlogsValueEvent("im_longpoll", O[e], e + "0x", t.getResponseHeader("x-frontend"))
        }), O = {}, A = Date.now()))
    }

    function o(e) {
        var t = e.updates;
        return t.map(function(e) {
            switch (e[0]) {
                case 0:
                    return E.deleteEvent(e);
                case 1:
                    return E.replaceFlagsEvent(e);
                case 2:
                    return E.setFlagsEvent(e);
                case 3:
                    return E.resetFlagsEvent(e);
                case 4:
                    return E.addMessageEvent(e);
                case 5:
                    return E.editMessageEvent(e);
                case 6:
                    return E.readInboundEvent(e);
                case 7:
                    return E.readOutboundEvent(e);
                case 8:
                    return E.gotOnlineEvent(e);
                case 9:
                    return E.gotOfflineEvent(e);
                case 10:
                    return E.resetDirectoriesEvent(e);
                case 11:
                    return E.replaceDirectoriesEvent(e);
                case 12:
                    return E.setDirectoriesEvent(e);
                case 13:
                    return E.deleteDialogEvent(e);
                case 51:
                    return E.chatChangedEvent(e);
                case 52:
                    return E.chatUpdatedEvent(e);
                case 63:
                    return E.typingEvent(e);
                case 70:
                    return E.videoCallEvent(e);
                case 80:
                    return E.unreadCountEvent(e);
                case 114:
                    return E.notifySettingsChangedEvent(e);
                case 116:
                    return E.refreshMessageEvent(e);
                case -1:
                    return E.resyncEvent();
                default:
                    return E.emptyEvent(e)
            }
        })
    }

    function s(e, t) {
        return Promise.resolve(extend({}, t, {
            timeout: 64 > e ? 2 * e : e
        }))
    }

    function l(e, t) {
        return Promise.resolve(extend({}, t, {
            imTs: e
        }))
    }

    function u(e) {
        e.set(function(e) {
            return Promise.resolve(extend({}, e, {
                stopped: !0
            }))
        }).then(function() {
            e.get().cancelToken()
        })
    }

    function c(e, t) {
        return t.cancelToken = e, Promise.resolve(t)
    }

    function d(e, t) {
        return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
    }

    function f(e) {
        return e.pauses || (e.pauses = []), (0, T.lplog)("Aborting all pauses", "error"), e.pauses.forEach(function(e) {
            return e()
        }), e.pauses = [], Promise.resolve(e)
    }

    function p(e, t, n, r) {
        var a = r.failed ? (0, k.abortablePause)(M, e) : {},
            i = a.abort,
            o = a.pause;
        switch (r.failed) {
            case 1:
                return (0, T.lplog)("Old timestamp, init resync", "error"), e.set(d.bind(null, i)), n([E.resyncEvent()]), e.set(v.loadLongPollTs).then(o).then(m.bind(null, e, t, n));
            case 2:
                return (0, T.lplog)("Key is incorrect", "error"), e.set(d.bind(null, i)), e.set(v.loadLongPollKey).then(o).then(m.bind(null, e, t, n));
            case 3:
                throw nav.reload({
                    force: !0
                }), new Error("ts is very wrong");
            default:
                return e.set(l.bind(null, r.ts)).then(function() {
                    return r
                })
        }
    }

    function m(e, t, n) {
        if (e.get().stopped) return Promise.resolve({
            updates: []
        });
        if (t()) return Promise.reject(new Error("pause"));
        var r = e.get(),
            a = r.imUrl + "/" + r.imPart,
            o = (0, w.plaingetCancelable)(a, {
                act: "a_check",
                key: r.imKey,
                version: P,
                ts: r.imTs,
                wait: 25,
                mode: r.mode
            }),
            l = o.request,
            u = o.cancel;
        return e.set(c.bind(null, u)).then(function() {
            return l
        }).then(function(t) {
            var n = _(t, 2),
                a = n[0],
                o = n[1];
            return o && i(r, o), e.set(s.bind(null, 1)), JSON.parse(a)
        })["catch"](function(e) {
            var t = _(e, 2),
                n = t[0],
                a = t[1];
            throw a && i(r, a), n
        }).then(p.bind(null, e, t, n))
    }

    function g(e, t, n) {
        e.get().stopped || ((0, T.lplog)("New request"), m(e, n, t).then(o).then(function(e) {
            return (0, T.lplog)("Request success", "success"), e
        }).then(t)["catch"](function(t) {
            return e.get().stopped ? void(0, T.lplog)("Stopped longpoll") : ("pause" !== t.message && topError(t), (0, T.lplog)("Error, waiting: " + (t.message || "no message (probably browser reset)"), "error"), e.set(s.bind(null, n() ? M / 2 : e.get().timeout)).then(function() {
                var t = (0, k.abortablePause)(e.get().timeout, e),
                    n = t.abort,
                    r = t.pause;
                return e.set(d.bind(null, n)).then(r)
            }))
        }).then(g.bind(null, e, t, n)))
    }

    function h(e) {
        var t = e.id,
            n = e.gid,
            r = e.key,
            a = e.ts,
            i = e.url,
            o = e.lhost,
            s = e.lpstat,
            l = "main",
            c = new EventEmitter,
            d = (0, S.initQueue)(function(e, t) {
                return c.trigger("data", t), window.vk.lpConfig && window.vk.lpConfig.enabled && window.longpollTesting_onImEvents && window.longpollTesting_onImEvents(t), Promise.resolve({})
            }),
            p = d.pause,
            m = d.resume,
            h = d.pushMessage,
            _ = d.isPaused,
            v = d.reset,
            b = (0, y["default"])({
                id: t,
                gid: n,
                mode: I,
                timeout: 1,
                imKey: r,
                imTs: a,
                imPart: i,
                imUrl: o,
                pause: !1,
                stat: s
            });
        return g(b, h.bind(null, l), _.bind(null, l)), {
            on: c.on.bind(c),
            off: c.off.bind(c),
            abortPauses: function() {
                return b.set(f)
            },
            stop: u.bind(null, b),
            pause: p.bind(null, l),
            resume: m.bind(null, l),
            reset: v.bind(null, l),
            push: function(e) {
                return c.trigger("data", e)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var _ = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.startLongPoll = h;
    var v = n(28),
        b = n(112),
        y = a(b),
        w = n(181),
        C = n(199),
        E = r(C),
        k = n(130),
        S = n(152),
        T = n(23),
        I = 202,
        M = 4,
        P = 5,
        L = 3e4,
        O = {},
        A = Date.now()
}, function(e, t, n) {
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
        c(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
    }

    function i(e, t, n, r, a) {
        (0, l.addDelegateEvent)(t, n, r, a), e._registeredHandlers.push(["delegate", t, n, r, a])
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
            "delegate" === e[0] ? l.removeDelegateEvent.apply(void 0, t) : d.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = r, t.createModule = o, t.destroyModule = s;
    var l = n(67),
        u = window,
        c = u.addEvent,
        d = u.removeEvent
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = D(e, 2),
            n = t[1];
        return {
            type: F,
            localId: n
        }
    }

    function a(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: U,
            messageId: n,
            mask: r,
            peerId: a
        }
    }

    function i(e) {
        var t = D(e, 4),
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

    function o(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: z,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function s(e) {
        var t = D(e, 11),
            n = t[1],
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5],
            s = t[6],
            l = t[7],
            u = t[8],
            c = t[9],
            d = t[10],
            f = extend(s, l || void 0);
        return s || ((0, B.imWeirdLog)("empty_other_kludges", [n, r, a, i, o, s, l, u, c, d]), s = {}), {
            type: G,
            messageId: intval(n),
            flags: intval(r),
            peerId: intval(a),
            date: intval(i),
            attaches: (0, j.convertKludgesToAttaches)(f, n),
            subject: s.title || "",
            text: o,
            kludges: f,
            randomId: intval(u),
            userId: (0, R.isChatPeer)(a) ? intval(f.from) : intval(a),
            update_time: d,
            chat_local_id: c
        }
    }

    function l(e) {
        var t = s(e);
        return t.type = me, t
    }

    function u(e) {
        return extend({}, e, {
            type: me
        })
    }

    function c(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: V,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function d(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: q,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function f(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: W,
            userId: -n,
            platform: r,
            lastSeenTs: a
        }
    }

    function p(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: K,
            userId: -n,
            reason: r,
            lastSeenTs: a
        }
    }

    function m(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: te,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function g(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: ne,
            peerId: n,
            mask: r
        }
    }

    function h(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: re,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function _(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: pe,
            peerId: n,
            localId: r
        }
    }

    function v(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: Y,
            chatId: n,
            self: r
        }
    }

    function b(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: Q,
            peerId: r,
            updateType: n,
            updateArg: a
        }
    }

    function y(e) {
        var t = D(e, 5),
            n = t[1],
            r = t[2],
            a = t[3],
            i = t[4];
        return {
            type: $,
            peerId: n,
            userIds: r,
            totalCount: a,
            ts: i
        }
    }

    function w(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: X,
            userId: n,
            callId: r
        }
    }

    function C(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: Z,
            count: n,
            countNotMuted: r,
            showOnlyNotMuted: a
        }
    }

    function E(e) {
        var t = D(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n;
        return {
            type: J,
            peerId: r.peer_id,
            sound: r.sound,
            disabledUntil: r.disabled_until
        }
    }

    function k(e) {
        var t = D(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n,
            a = s([!1, r.id, r.flags, r.peer_id, r.date, r.message, extend(r.kludges, {
                title: r.title || ""
            }), {}, r.random_id, r.chat_local_id, r.update_time]);
        return a.type = me, a
    }

    function S(e) {
        return {
            type: ee,
            params: e
        }
    }

    function T(e) {
        return {
            type: oe,
            state: e
        }
    }

    function I() {
        return {
            type: ae
        }
    }

    function M(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: ie,
            key: n,
            url: r
        }
    }

    function P() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        return {
            type: se,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function L(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
        return {
            type: ue,
            peerId: e,
            msgid: t,
            forward: n,
            cancelSearch: r,
            entryPoint: a
        }
    }

    function O(e) {
        return {
            type: ce,
            tab: e
        }
    }

    function A(e, t, n) {
        return {
            type: de,
            message: t,
            peer: e,
            error: n
        }
    }

    function x(e) {
        var t = D(e, 6),
            n = (t[0], t[1]),
            r = t[2],
            a = t[3],
            i = t[4],
            o = t[5];
        return {
            type: le,
            free: !!intval(n) || intval(i) === vk.id,
            resource: r,
            peerId: intval(a),
            who: intval(i),
            name: o
        }
    }

    function N(e, t) {
        return {
            type: fe,
            message: t,
            peerId: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FOLDER_HAS_BANNER = t.FOLDER_UNRESPOND = t.FOLDER_IMPORTANT = t.FLAG_STEALTH = t.FLAG_MEDIA = t.FLAG_DELETED = t.FLAG_SPAM = t.FLAG_FRIENDS = t.FLAG_CHAT = t.FLAG_IMPORTANT = t.FLAG_OUTBOUND = t.FLAG_UNREAD = t.EDIT_MESSAGE = t.DELETE_DIALOG = t.RESEND = t.FAILED_MESSAGE = t.CHANGE_TAB = t.CHANGE_PEER = t.MUTEX = t.RESET_PEER = t.TRANSITION = t.REFRESH_LP_KEY = t.RESYNC = t.SET_DIRECTORIES = t.REPLACE_DIRECTORIES = t.RESET_DIRECTORIES = t.EMPTY = t.NOTIFY_SETTINGS_CHANGED = t.UNREAD_COUNT = t.VIDEO_CALL = t.TYPING = t.CONVERSATION_UPDATED = t.CHAT_CHANGED = t.GOT_OFFLINE = t.GOT_ONLINE = t.READ_OUTBOUND = t.READ_INBOUND = t.ADD_MESSAGE = t.RESET_FLAGS = t.REPLACE_FLAGS = t.SET_FLAGS = t.DELETE = void 0;
    var D = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
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
    t.deleteEvent = r, t.replaceFlagsEvent = a, t.setFlagsEvent = i, t.resetFlagsEvent = o, t.addMessageEvent = s, t.editMessageEvent = l, t.editMessageLocallyEvent = u, t.readInboundEvent = c, t.readOutboundEvent = d, t.gotOnlineEvent = f, t.gotOfflineEvent = p, t.resetDirectoriesEvent = m, t.replaceDirectoriesEvent = g, t.setDirectoriesEvent = h, t.deleteDialogEvent = _, t.chatChangedEvent = v, t.chatUpdatedEvent = b, t.typingEvent = y, t.videoCallEvent = w, t.unreadCountEvent = C, t.notifySettingsChangedEvent = E, t.refreshMessageEvent = k, t.emptyEvent = S, t.transitionEvent = T, t.resyncEvent = I, t.refreshLpKeyEvent = M, t.resetPeer = P, t.changePeer = L, t.changeTab = O, t.failedMessage = A, t.mutexEvent = x, t.resendEvent = N;
    var R = n(88),
        j = n(187),
        B = n(12),
        F = t.DELETE = "event_delete",
        H = t.SET_FLAGS = "event_set_flags",
        U = t.REPLACE_FLAGS = "event_replace_flags",
        z = t.RESET_FLAGS = "event_reset_flags",
        G = t.ADD_MESSAGE = "event_add_message",
        V = t.READ_INBOUND = "event_read_inbound",
        q = t.READ_OUTBOUND = "event_read_outbound",
        W = t.GOT_ONLINE = "event_got_online",
        K = t.GOT_OFFLINE = "event_got_offline",
        Y = t.CHAT_CHANGED = "event_chat_changed",
        Q = t.CONVERSATION_UPDATED = "event_chat_updated",
        $ = t.TYPING = "event_typing",
        X = t.VIDEO_CALL = "event_video_call",
        Z = t.UNREAD_COUNT = "event_unread_count",
        J = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
        ee = t.EMPTY = "event_empty",
        te = t.RESET_DIRECTORIES = "event_reset_directories",
        ne = t.REPLACE_DIRECTORIES = "event_replace_directories",
        re = t.SET_DIRECTORIES = "event_set_directories",
        ae = t.RESYNC = "event_resync",
        ie = t.REFRESH_LP_KEY = "event_refresh_lp_key",
        oe = t.TRANSITION = "transition_event",
        se = t.RESET_PEER = "reset_peer",
        le = t.MUTEX = "mutex",
        ue = t.CHANGE_PEER = "change_peer",
        ce = t.CHANGE_TAB = "event_change_tab",
        de = t.FAILED_MESSAGE = "event_failed_message",
        fe = t.RESEND = "event_resend",
        pe = t.DELETE_DIALOG = "event_delete_dialog",
        me = t.EDIT_MESSAGE = "event_edit_message";
    t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FLAG_STEALTH = 65536, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2, t.FOLDER_HAS_BANNER = 8
}, , function(e, t, n) {
    e.exports = !n(131) && !n(157)(function() {
        return 7 != Object.defineProperty(n(68)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, n) {
    var r = n(64),
        a = "__core-js_shared__",
        i = r[a] || (r[a] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function a(e, t, n, a, o) {
        if (!(0, c.isSearchingInplace)(e.get().peer, e.get()) && !(hasClass(o, u.FAILED_CLASS) || hasClass(o, u.SENDING_CLASS) || hasClass(o, "_im_mess_srv") || (0, u.checkSelectClick)(a, o) || (0, d.isAnyMessageBeingEdited)(e) || "A" === a.target.tagName || a.target.classList.contains(f))) {
            var s = intval(domData(o, "msgid")),
                l = e.get().peer;
            if (!(0, u.isAlreadyDeleted)(e, l, s)) {
                var p = void 0,
                    m = void 0;
                p = a.shiftKey ? (0, d.getMessageRangeFromSelection)(e, l, s) : [s], e.set(c.addSelection.bind(null, p)).then(function() {
                    var a = (0, d.getSelectedMessages)(e),
                        i = !1;
                    p.forEach(function(e) {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var r = inArray(e, a);
                            i |= r, toggleClass(t, "im-mess_selected", r);
                            var o = r ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                s = geByClass1("_im_mess_blind_label_select", t);
                            attr(s, "aria-label", o)
                        }
                    }), i && r(), t().changedMessageSelection(e)
                }).then(function() {
                    1 !== e.get().selectedMessages.length || m ? m && m.hide() : m = i(e)
                })
            }
        }
    }

    function i(e) {
        var t = e.get();
        if (t.pinnedMessagesPromo && (0, u.isChatPeer)(t.peer)) {
            var n = geByClass1("_mess-action-promo"),
                r = new ElementTooltip(n, {
                    autoShow: !1,
                    appendTo: n,
                    content: getTemplate("im_pinned_messages_promo", {
                        content: getLang("mail_pinned_messages_promo_tooltip")
                    }),
                    forceSide: "bottom",
                    cls: "feature_intro_tt",
                    width: 260,
                    onHide: function() {
                        e.setState({
                            pinnedMessagesPromo: !1
                        }), (0, c.hidePromoTooltip)()
                    }
                });
            return r.show(), r
        }
    }

    function o(e, t) {
        return {
            cleanSelection: function(t) {
                t.map(function(t) {
                    return geByClass1("_im_mess_" + t, e)
                }).filter(function(e) {
                    return e
                }).forEach(function(e) {
                    return removeClass(e, "im-mess_selected")
                })
            },
            unmount: function() {
                (0, l.destroyModule)(t)
            }
        }
    }

    function s(e, t, n) {
        var r = a.bind(null, t, n, e),
            i = (0, l.createModule)({
                handlers: function(t, n) {
                    n(e, "click", "_im_mess", r)
                }
            });
        return o(e, i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = s;
    var l = n(198),
        u = n(88),
        c = n(28),
        d = n(190),
        f = "_im_retry_media"
}, , function(e, t, n) {
    "use strict";
    var r = n(42),
        a = n(122),
        i = n(212),
        o = n(164);
    e.exports = n(102)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, a(1)) : "keys" == t ? a(0, n) : "values" == t ? a(0, e[n]) : a(0, [n, e[n]])
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = e.get().tabbedPeers.map(function(t) {
            return e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]
        }).filter(function(e) {
            return e
        }).filter(function(e) {
            return !e.deletedDialog
        }).map(function(e) {
            var t = e.peerId;
            return {
                type: "peer",
                peer: t
            }
        });
        return t.length > 0 && (t = [{
            type: "sep"
        }].concat(t)), t
    }

    function i(e, t) {
        if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
        var n = (0, g.getBaseLink)(e) + "?sel=" + t.peer + "&tab=" + e.get().active_tab,
            r = (0, g.getBareTab)(t.peer, e),
            a = r.tab;
        return a = getTemplate("im_right_menu_ct", {
            name: a,
            count: r.unread > 0 ? r.unread : ""
        }), getTemplate("im_right_menu_tpl", {
            href: n,
            label: a,
            peer: t.peer,
            attrs: 'title="' + stripHTML(r.tab) + '"',
            cls: r.unread > 0 ? "im-right-menu--unread" : ""
        })
    }

    function o(e, t, n, r) {
        var a = gpeByClass("_im_peer_tab", r),
            i = intval(domData(a, "list-id")),
            o = e.get().tabbedPeers.filter(function(e) {
                var t = e.peer;
                return t !== i
            });
        return e.set(h.updateTabbedPeers.bind(null, o, !0)).then(function() {
            if (s(t, e), i === e.get().peer) e.get().longpoll.push([(0, _.resetPeer)()]);
            else if (0 !== e.get().peer) {
                var n = gpeByClass("_im_right_menu", r);
                uiRightMenu.hideSliding(n)
            }
        }), cancelEvent(n), !1
    }

    function s(e, t) {
        return e.pipeReplace(Promise.resolve(a(t)))
    }

    function l(e, t) {
        geByClass("_im_peer_tab", e).forEach(function(e) {
            var n = q2ajx(attr(e, "href").split("?")[1]);
            n.tab !== t.get().active_tab && attr(e, "href", (0, g.getBaseLink)(t) + "?sel=" + n.sel + "&tab=" + t.get().active_tab)
        })
    }

    function u(e, t, n, r) {
        return {
            updateMenu: function(t) {
                l(e, t);
                var r = gpeByClass("_im_right_menu", e);
                s(n, t).then(function() {
                    var e = void 0;
                    e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab), e && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(r)
                })
            },
            updateName: function(e, t) {
                var n = ge("ui_rmenu_peer_" + e);
                if (n) {
                    var r = geByClass1("_im_r_tx", n),
                        a = t.get().tabs[e].tab;
                    val(r, a)
                }
            },
            updateCounter: function(e, t) {
                var n = ge("ui_rmenu_peer_" + t);
                if (n) {
                    var r = geByClass1("_im_r_ct", n),
                        a = e.get().tabs[t].unread;
                    val(r, a > 0 ? a : ""), toggleClass(n, "im-right-menu--unread", a > 0)
                }
            },
            unmount: function() {
                (0, v.destroyModule)(r), n.unmount()
            }
        }
    }

    function c(e, t, n) {
        1 === n.which && (e.get().peer && e.get().longpoll.push([(0, _.resetPeer)()]), e.get().longpoll.push([(0, _.changeTab)(t)]), cancelEvent(n))
    }

    function d(e, t, n) {
        var r = (0, f.mount)(e, (0, m["default"])({
                limit: 50,
                offset: 0,
                noScroll: !0,
                elements: a(t)
            }), function() {
                return {
                    idFn: function(e) {
                        return e.peer || "000"
                    },
                    renderFn: i.bind(null, t)
                }
            }),
            s = o.bind(null, t, r),
            l = (0, v.createModule)({
                handlers: function(n, r) {
                    r(e, "click", "_im_r_cl", s), r(e, "click", "_im_peer_tab", function(e, n) {
                        if (!checkEvent(e)) {
                            var r = intval(domData(n, "list-id"));
                            t.get().longpoll.push([(0, _.changePeer)(r, !1, !0, !0)]), cancelEvent(e)
                        }
                    }), b.FOLDERS.forEach(function(r) {
                        n(geByClass1("_ui_item_" + r, e.parentNode), "mousedown", c.bind(null, t, r))
                    })
                }
            });
        return u(e, t, r, l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = d;
    var f = n(178),
        p = n(112),
        m = r(p),
        g = n(88),
        h = n(28),
        _ = n(199),
        v = n(198),
        b = n(94)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return a(e) && 3 == e.nodeType
    }
    var a = n(149);
    e.exports = r
}, function(e, t, n) {
    var r = n(61)("iterator"),
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
}, function(e, t, n) {
    "use strict";

    function r() {
        try {
            if (window.crypto) {
                var e = new Int32Array(1);
                return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                    return e + t
                }))
            }
        } catch (t) {}
        return intval(rand(0, a).toFixed(0))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.random = r;
    var a = (t.MAX_SAFE_INTEGER = 9007199254740991, t.MAX_INTERGER = 2147483647)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        t = (0, l.parserMessage)(t);
        var n = vk.id == t.peerId && !(0, l.unpackStore)(e).gid;
        return 333 == t.peerId ? !1 : n || (0, u.isOut)(t) ? (0, c.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : (0, u.isGift)(t) || (0, u.isSticker)(t) || (0, u.isAudioMsg)(t) || (0, u.isGraffiti)(t) || (0, u.isMoney)(t) || (0, u.isMessageWithInviteLink)(t) ? !1 : (0, l.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : (0, c.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
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
        var r = (0, d.convertKludgesToAttaches)(t.kludges, t.messageId),
            i = n.dData.attaches;
        if (a(t.text) !== n.dData.txt || r.length !== i.length) return !0;
        for (var o = r.length; o--;)
            if (r[o].id != i[o].id || r[o].type != i[o].type) return !0;
        return !1
    }

    function s(e, t, n, r, a) {
        t.origText = n, t.text = (0, c.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = a, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.canMessageBeEdited = r, t.convertEmojiHtmlToRegularText = a, t.findLastMessageToEdit = i, t.wasMessageReallyModified = o, t.replaceMsgAfterEdit = s;
    var l = n(190),
        u = n(188),
        c = n(88),
        d = n(187)
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia,
            t = function(t) {
                return new Promise(function(n, r) {
                    e ? e.call(navigator, t, n, r) : r(new Error("NotSupported"))
                })
            },
            n = function() {
                return new Promise(function(e, t) {
                    if (MediaStreamTrack && MediaStreamTrack.getSources) {
                        var n = {
                            audio: "audioinput",
                            video: "videoinput"
                        };
                        return MediaStreamTrack.getSources(function(t) {
                            e(t.map(function(e) {
                                return {
                                    label: e.label,
                                    kind: n[e.kind],
                                    deviceId: e.id,
                                    groupId: ""
                                }
                            }))
                        })
                    }
                    t(new Error("NotSupported"))
                })
            };
        e && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = t), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = n)), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initFailBack = r
}, function(e, t) {
    e.exports = {}
}]);