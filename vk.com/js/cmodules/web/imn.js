! function(e) {
    function t(t) {
        for (var r, s, o = t[0], c = t[1], l = t[2], u = 0, m = []; u < o.length; u++) s = o[u], a[s] && m.push(a[s][0]), a[s] = 0;
        for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
        for (d && d(t); m.length;) m.shift()();
        return i.push.apply(i, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], r = !0, o = 1; o < n.length; o++) {
                var c = n[o];
                0 !== a[c] && (r = !1)
            }
            r && (i.splice(t--, 1), e = s(s.s = n[0]))
        }
        return e
    }
    var r = {},
        a = {
            "web/imn": 0
        },
        i = [];

    function s(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, s), n.l = !0, n.exports
    }
    s.m = e, s.c = r, s.d = function(e, t, n) {
        s.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, s.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, s.t = function(e, t) {
        if (1 & t && (e = s(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (s.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) s.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, s.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return s.d(t, "a", t), t
    }, s.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, s.p = "";
    var o = window.webpackJsonp = window.webpackJsonp || [],
        c = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var l = 0; l < o.length; l++) t(o[l]);
    var d = c;
    i.push([99, "bundles/common", "bundles/vendors", "bundles/7435d66133432ce1b1938e7cf450c5d0"]), n()
}({
    "+/AQ": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return c
        });
        var r = n("N1NS");

        function a(e, t) {
            return bodyNode[e] || document.documentElement[e]
        }
        class i {
            constructor(e, t) {
                this.el = e, this.opts = t, this.module = Object(r.a)({
                    handlers: (e, t) => {
                        e(window, "scroll", this.onScroll.bind(this)), e(window, "resize", this.resize.bind(this))
                    }
                }), this.innerHeight = window.innerHeight, this.prevScroll = this.scrollTop()
            }
            update() {}
            resize() {
                this.innerHeight = window.innerHeight
            }
            scrollTop(e) {
                if (void 0 === e) return a("scrollTop", this.el);
                ! function(e, t, n) {
                    "scrollTop" === e && window.scrollTo(0, t)
                }("scrollTop", e, this.el)
            }
            contHeight() {
                return a("scrollHeight")
            }
            smoothScroll(e) {
                scrollToY(e + this.scrollTop(), 300)
            }
            getContainer() {
                return this.el
            }
            scrollBottom(e) {
                if (void 0 === e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                var t = this.contHeight() - e - this.getScrollHeight();
                this.scrollTop(t)
            }
            scrollBottomFixSave(e) {
                var t = () => {
                        Date.now() - n < 500 && this.scrollBottom(e), window.removeEventListener("scroll", t)
                    },
                    n = Date.now();
                window.addEventListener("scroll", t), this.scrollBottom(e)
            }
            onScroll(e) {
                var t = this.scrollTop(),
                    n = t - this.prevScroll,
                    r = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && r - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }
            getScrollHeight() {
                return this.innerHeight
            }
            destroy() {
                Object(r.c)(this.module)
            }
        }
        class s {
            constructor(e, t) {
                this.prevTop = 0, this.scroll = new uiScroll(e, {
                    hidden: void 0 === t.hidden || t.hidden,
                    shadows: t.shadows,
                    stopScrollPropagation: !1,
                    theme: t.scrollTheme,
                    onmore: () => t.more && t.more(this),
                    onscroll: e => {
                        var n = this.scrollTop(),
                            r = this.prevTop - n;
                        this.prevTop = n, t.scrollChange && t.scrollChange(n), t.onScroll && t.onScroll(r, this)
                    }
                })
            }
            update() {
                this.scroll.update("sync")
            }
            scrollTop(e) {
                return void 0 !== e ? this.scroll.scrollTop(e) : this.scroll.data.scrollTop
            }
            getContainer() {
                return this.scroll.content
            }
            contHeight() {
                return this.scroll.data.scrollHeight
            }
            smoothScroll(e) {
                this.scroll.scrollTop(this.scrollTop() + e, 300)
            }
            scrollBottom(e) {
                return void 0 !== e ? this.scroll.scrollBottom(e) : this.scroll.data.scrollBottom
            }
            scrollBottomFixSave(e) {
                var t = Date.now();
                this.scroll.emitter.addOnceListener("resize", () => {
                    Date.now() - t < 500 && this.scroll && this.scrollBottom(e)
                }), this.scrollBottom(e)
            }
            getScrollHeight() {
                return this.scroll.data.viewportHeight
            }
            destroy() {
                this.scroll.destroy()
            }
        }
        class o {
            constructor(e, t) {
                this.el = e
            }
            update() {}
            getContainer() {
                return this.el
            }
            scrollTop(e) {
                return 0
            }
            contHeight() {
                return 0
            }
            smoothScroll(e) {}
            scrollBottom(e) {
                return 0
            }
            scrollBottomFixSave(e) {}
            getScrollHeight() {
                return 0
            }
            destroy() {}
        }

        function c(e, t) {
            return t.noScroll ? new o(e) : t.nativeScroll ? new i(e, t) : new s(e, t)
        }
    },
    "1+Fu": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return u
        });
        n("KKXr"), n("rGqo"), n("Btvt"), n("9AAn");
        var r = n("DM26"),
            a = new Map,
            i = !1;

        function s(e) {
            return e.queue || e.key
        }

        function o() {
            a.forEach((e, t) => {
                var n = e.onData,
                    r = e.onUpdateKey,
                    a = e.ts;
                (function(e) {
                    return !!window.curNotifier && !curNotifier.addQueues[s(e)]
                })(t) && Notifier.addKey(extend(t, {
                    ts: a
                }), d.bind(null, n, r, t))
            })
        }

        function c() {
            i || (i = setInterval(o, 3e3))
        }

        function l(e) {
            ! function(e) {
                if (!window.curNotifier) return !1;
                delete curNotifier.addQueues[s(e)]
            }(e), a.delete(e), 0 === a.size && (clearInterval(i), i = !1)
        }

        function d(e, t, n, i, s) {
            if (s.failed) return l(n), void
            function(e, t, n, i) {
                var s;
                switch (e) {
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                        s = i(t, e);
                        break;
                    case 4:
                        s = Object(r.c)(1).then(() => t);
                        break;
                    default:
                        throw new Error("Unkonwn error from queue: " + e)
                }
                Object(r.c)(3).then(() => s).then(e => {
                    a.set(e, {
                        onUpdateKey: i,
                        onData: n,
                        ts: e.ts
                    }), o(), c()
                })
            }(s.err, n, e, t);
            a.set(n, {
                onData: e,
                onUpdateKey: t,
                ts: intval(s.ts)
            }), s.events.map(e => e.split("<!>")).forEach(e)
        }

        function u(e, t, n) {
            return Notifier.addKey(e, d.bind(null, t, n, e)), a.set(e, {
                onData: t,
                onUpdateKey: n,
                ts: e.ts
            }), c(), {
                stop: l.bind(null, e)
            }
        }
    },
    "1y80": function(e, t, n) {
        "use strict";

        function r(e, t, n, r, a) {
            return window.statlogsValueEvent(e, t, n, r, a)
        }

        function a(e) {
            return Math.random() < e
        }

        function i(e, t, n, i, s, o) {
            a(e) && r(t, n, i, s, o)
        }
        n.d(t, "c", function() {
            return r
        }), n.d(t, "a", function() {
            return a
        }), n.d(t, "b", function() {
            return i
        })
    },
    "4LiD": function(e, t, n) {
        "use strict";
        var r = n("dyZX"),
            a = n("XKFU"),
            i = n("KroJ"),
            s = n("3Lyj"),
            o = n("Z6vF"),
            c = n("SlkY"),
            l = n("9gX7"),
            d = n("0/R4"),
            u = n("eeVq"),
            m = n("XMVh"),
            p = n("fyDq"),
            g = n("Xbzi");
        e.exports = function(e, t, n, h, _, b) {
            var f = r[e],
                v = f,
                y = _ ? "set" : "add",
                j = v && v.prototype,
                O = {},
                w = function(e) {
                    var t = j[e];
                    i(j, e, "delete" == e ? function(e) {
                        return !(b && !d(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "has" == e ? function(e) {
                        return !(b && !d(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "get" == e ? function(e) {
                        return b && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                    } : "add" == e ? function(e) {
                        return t.call(this, 0 === e ? 0 : e), this
                    } : function(e, n) {
                        return t.call(this, 0 === e ? 0 : e, n), this
                    })
                };
            if ("function" == typeof v && (b || j.forEach && !u(function() {
                    (new v).entries().next()
                }))) {
                var k = new v,
                    C = k[y](b ? {} : -0, 1) != k,
                    S = u(function() {
                        k.has(1)
                    }),
                    E = m(function(e) {
                        new v(e)
                    }),
                    I = !b && u(function() {
                        for (var e = new v, t = 5; t--;) e[y](t, t);
                        return !e.has(-0)
                    });
                E || ((v = t(function(t, n) {
                    l(t, v, e);
                    var r = g(new f, t, v);
                    return void 0 != n && c(n, _, r[y], r), r
                })).prototype = j, j.constructor = v), (S || I) && (w("delete"), w("has"), _ && w("get")), (I || C) && w(y), b && j.clear && delete j.clear
            } else v = h.getConstructor(t, e, _, y), s(v.prototype, n), o.NEED = !0;
            return p(v, e), O[e] = v, a(a.G + a.W + a.F * (v != f), O), b || h.setStrong(v, e, _), v
        }
    },
    "6aSF": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = (n("17x9"), n("+/AQ")),
            i = n("pemR");

        function s() {
            return (s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function o(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class c extends r.Component {
            constructor() {
                super(...arguments), this.getWrapperRef = (e => {
                    this.wrapper = e
                })
            }
            componentDidMount() {
                var e = this.props,
                    t = e.isNative,
                    n = e.isShadows,
                    r = e.neverHide,
                    i = e.onScroll;
                this.scroller || (this.scroller = Object(a.a)(this.wrapper, {
                    shadows: n,
                    nativeScroll: t,
                    hidden: !r,
                    onScroll: i
                }))
            }
            componentDidUpdate() {
                this.scroller.update()
            }
            componentWillUnmount() {
                this.scroller.destroy(), this.scroller = null
            }
            render() {
                var e = this.props,
                    t = e.children,
                    n = (e.isNative, e.isShadows, e.neverHide, e.className),
                    a = void 0 === n ? "" : n,
                    c = o(e, ["children", "isNative", "isShadows", "neverHide", "className"]);
                return r.createElement("div", s({}, c, {
                    className: Object(i.a)("Scroll", a),
                    ref: this.getWrapperRef
                }), t)
            }
        }
        c.defaultProps = {
            isNative: !1,
            isShadows: !1,
            neverHide: !1,
            onScroll: null
        }
    },
    "6raB": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return l
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR")),
            i = n("KFTi"),
            s = n("Hx9h");

        function o() {
            return (o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function c(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class l extends r.Component {
            constructor(e) {
                super(e), this.needRecalcSize = !1, this.state = {}
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.loading,
                    l = e.children,
                    d = c(e, ["className", "loading", "children"]),
                    u = Object(a.a)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": n
                    }, t);
                return r.createElement(s.a, o({}, d, {
                    className: u
                }), r.createElement("span", {
                    className: "ButtonWithProgress__content"
                }, l), n && r.createElement(i.a, {
                    inverted: "primary" === e.appearance,
                    className: "ButtonWithProgress__progress"
                }))
            }
        }
        l.defaultProps = {
            appearance: "primary",
            size: "m",
            wide: !1,
            loading: !1
        }
    },
    "7p7+": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = n("pemR");

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }

        function o(e) {
            var t = e.children,
                n = e.className,
                o = s(e, ["children", "className"]);
            return r.createElement("div", i({}, o, {
                className: Object(a.a)("Stub", n)
            }), t || "No results.")
        }
    },
    "86+7": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "c", function() {
            return i
        }), n.d(t, "a", function() {
            return s
        });
        n("KKXr");
        var r = n("aong");

        function a(e, t) {
            return t in Object(r.q)(e).oCache
        }

        function i(e, t) {
            var n = Object(r.q)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function s(e, t) {
            var n = Object(r.q)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    "8h6g": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return r
        }), n.d(t, "c", function() {
            return a
        }), n.d(t, "a", function() {
            return i
        });
        n("KKXr");
        var r = "avi mp4 3gp mpeg mov flv f4v wmv mkv webm vob rm rmvb m4v mpg ogv ts m2ts mts mxf".split(" "),
            a = 5,
            i = 4194304
    },
    99: function(e, t, n) {
        e.exports = n("M24l")
    },
    "9AAn": function(e, t, n) {
        "use strict";
        var r = n("wmvG"),
            a = n("s5qY");
        e.exports = n("4LiD")("Map", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            get: function(e) {
                var t = r.getEntry(a(this, "Map"), e);
                return t && t.v
            },
            set: function(e, t) {
                return r.def(a(this, "Map"), 0 === e ? 0 : e, t)
            }
        }, r, !0)
    },
    "BN/X": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class o extends r.Component {
            render() {
                var e = this.props,
                    t = e.hovered,
                    n = e.className,
                    o = e.children,
                    c = s(e, ["hovered", "className", "children"]),
                    l = Object(a.a)("Link", {
                        "Link--hovered": !!t
                    }, n);
                return this.props.href ? r.createElement("a", i({}, c, {
                    className: l
                }), o) : r.createElement("span", i({}, c, {
                    className: l
                }), o)
            }
        }
        o.defaultProps = {
            href: void 0,
            hovered: !1
        }
    },
    BxOC: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return s
        });
        n("VRzm"), n("Btvt");
        var r = window.ajax,
            a = 2;

        function i(e, t, n) {
            return t && (t.im_v = a), new Promise((a, i) => {
                r.post(e, t, {
                    timeout: n,
                    onDone() {
                        a.apply(null, [
                            [...arguments]
                        ])
                    },
                    onFail() {
                        return i.apply(null, arguments), !0
                    }
                })
            })
        }

        function s(e, t) {
            var n, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return n = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise((r, i) => {
                    var s, o = Date.now(),
                        c = a.timeout || 60,
                        l = ajx2q(t);
                    if (window.XDomainRequest) n.open("get", `${e}?${l}`), n.ontimeout = function(e) {
                        i([e, {}])
                    }, n.onerror = function(e) {
                        i([e, {}])
                    }, n.onload = function() {
                        r([n.responseText, {}])
                    }, setTimeout(function() {
                        n.send()
                    }, 0);
                    else {
                        n.onreadystatechange = function() {
                            4 == n.readyState && (clearInterval(s), n.status >= 200 && n.status < 300 ? r([n.responseText, n]) : i([n.responseText, n]))
                        };
                        try {
                            n.open("GET", `${e}?${l}`, !0)
                        } catch (e) {
                            return i([e, n])
                        }
                        n.send()
                    }
                    s = setInterval(function() {
                        Date.now() - o > 1e3 * c && (window.browser.safari && n.abort(), i(["", {}]), clearInterval(s))
                    }, 1e3)
                }),
                cancel: function() {
                    n.abort()
                }
            }
        }
    },
    DM26: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return r
        }), n.d(t, "e", function() {
            return a
        }), n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return s
        }), n.d(t, "d", function() {
            return o
        });
        n("VRzm"), n("Btvt");

        function r(e, t) {
            return new Promise(n => {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function a(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                a = 0;
            return function i() {
                for (var s = arguments.length, o = new Array(s), c = 0; c < s; c++) o[c] = arguments[c];
                return Promise.resolve().then(() => e(...o)).catch(e => {
                    if (++a <= t) {
                        var s = "function" == typeof n ? n(a) : 0;
                        return 0 === s ? i(...o) : r(s).then(() => i(...o))
                    }
                    throw e
                })
            }
        }

        function i(e, t, n) {
            var r, a;
            return function() {
                for (var i = arguments.length, s = new Array(i), o = 0; o < i; o++) s[o] = arguments[o];
                return new Promise((e, i) => {
                    var o = n && !r;
                    clearTimeout(r), a && a.reject("debounce"), r = setTimeout(function() {
                        r = null, a = null, n || e(s)
                    }, t), o ? e(s) : n && i("debounce"), a = {
                        resolve: e,
                        reject: i
                    }
                }).then(t => e(...t))
            }
        }

        function s(e, t) {
            var n, r = new Promise(r => {
                n = r, setTimeout(r.bind(null, t), 1e3 * e)
            });
            return {
                pause: () => r,
                abort() {
                    n(t)
                }
            }
        }

        function o(e) {
            return function() {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return new Promise(t => e(...n, t))
            }
        }
    },
    ERyv: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return l
        }), n.d(t, "b", function() {
            return d
        }), n.d(t, "a", function() {
            return u
        }), n.d(t, "d", function() {
            return m
        }), n.d(t, "e", function() {
            return p
        });
        n("VRzm"), n("Btvt");
        var r, a = n("BxOC"),
            i = n("DM26"),
            s = 1;

        function o(e, t, n, a, i) {
            if ("Script error." !== e) {
                var s = i ? i.stack || i.message : null;
                d("unhandled_error", s ? {
                    err: e,
                    stack: s
                } : {
                    err: e
                })
            }
            r && r.apply(this, arguments)
        }

        function c(e) {
            e.preventDefault()
        }

        function l() {
            return !!window.imwl
        }

        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            l() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.e)(a.b, 3, () => 2)("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: s++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function u(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function m() {
            r = window.onerror, window.onerror = o, window.addEventListener("unhandledrejection", c)
        }

        function p() {
            window.onerror = r, r = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    EUzL: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        n("rE2o"), n("ioFf"), n("rGqo");

        function r(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function a(e, t, n) {
            var a = 0,
                i = e,
                s = [],
                o = !1;

            function c() {
                !s.length || a > 0 || o || (t(s), s = [])
            }
            return {
                pause() {
                    a++
                },
                resume() {
                    a > 0 && (a--, c())
                },
                onLp(e, t, a) {
                    o || (i >= e ? (i = t, s.push(...a), c()) : n && (o = !0, n(i).then(e => {
                        var t = r(e, 3),
                            n = (t[0], t[1]),
                            a = t[2];
                        i = n, o = !1, s.push(...a), c()
                    })))
                }
            }
        }
    },
    FABD: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return u
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR")),
            i = n("vRp6"),
            s = n("p+C8"),
            o = n("XpgC");

        function c() {
            return (c = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function l(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        var d = 27;
        class u extends r.PureComponent {
            constructor(e) {
                super(e), this.onRemoveToken = (e => {
                    var t = this.searchContainer.offsetHeight;
                    this.props.onRemoveToken(e.target.getAttribute("data-id")).then(() => {
                        this.updateScroll(t)
                    })
                }), this.onChange = (e => {
                    var t = e.target.value;
                    t !== this.value && (this.value = t, this.props.onChange(e), this.scrollContainer.scrollTop = 0)
                }), this.onSelect = (e => {
                    var t = this.searchContainer.offsetHeight;
                    this.props.onSelect(e.currentTarget.getAttribute("data-id")).then(() => {
                        this.updateScroll(t)
                    })
                }), this.onKeydown = (e => {
                    e.keyCode === d && (this.input.value = "", this.input.blur(), this.props.onChange(e), e.stopPropagation())
                }), this.updateScroll = (e => {
                    var t = this.searchContainer.offsetHeight;
                    this.input.focus(), this.searchContainer.scrollTop = this.searchContainer.scrollHeight, e !== t && (this.scrollContainer.scrollTop = this.scrollContainer.scrollTop + t - e)
                }), this.inputRef = (e => {
                    this.input = e
                }), this.searchContainerRef = (e => {
                    this.searchContainer = e
                }), this.scrollContainerRef = (e => {
                    var t = e;
                    if (e && e.container)
                        for (t = e; t.container;) t = t.container;
                    this.scrollContainer = t
                }), this.value = e.value
            }
            componentDidMount() {
                this.input.addEventListener("keydown", this.onKeydown)
            }
            componentWillUnmount() {
                this.input.removeEventListener("keydown", this.onKeydown)
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.tokens,
                    d = (e.onSelect, e.onRemoveToken, e.removeTokenPlaceholder),
                    u = e.value,
                    m = e.placeholder,
                    p = e.useInfiniteScroll,
                    g = e.loadMore,
                    h = e.hasMore,
                    _ = e.virtualized,
                    b = e.notFoundText,
                    f = e.children,
                    v = e.emptyText,
                    y = e.isSearching,
                    j = l(e, ["className", "tokens", "onSelect", "onRemoveToken", "removeTokenPlaceholder", "value", "placeholder", "useInfiniteScroll", "loadMore", "hasMore", "virtualized", "notFoundText", "children", "emptyText", "isSearching"]),
                    O = p ? i.a : "div",
                    w = p ? {
                        loadMore: g,
                        hasMore: h,
                        virtualized: _,
                        useCapture: !1
                    } : {},
                    k = [].concat(f);
                return r.createElement("div", {
                    className: Object(a.a)("MultiSelect", t)
                }, r.createElement("div", {
                    className: "MultiSelect__search",
                    ref: this.searchContainerRef
                }, n.map((e, t) => r.createElement("span", {
                    className: "MultiSelect__token",
                    key: e.id
                }, r.createElement("span", {
                    className: "MultiSelect__tokenTitle"
                }, e.text), d ? r.createElement(o.a, {
                    text: d
                }, r.createElement("span", {
                    className: "MultiSelect__tokenRemove",
                    "data-id": e.id,
                    onClick: this.onRemoveToken
                })) : r.createElement("span", {
                    className: "MultiSelect__tokenRemove",
                    "data-id": e.id,
                    onClick: this.onRemoveToken
                }))), r.createElement("div", {
                    className: "MultiSelect__caret"
                }, r.createElement("div", {
                    className: "MultiSelect__caretIn"
                }, r.createElement("input", c({}, j, {
                    type: "text",
                    className: "MultiSelect__input",
                    placeholder: 0 === n.length ? m : "",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: u,
                    ref: this.inputRef
                }))))), 0 === k.length && (u || v) && !y && r.createElement("div", {
                    className: "MultiSelect__empty"
                }, r.createElement("div", {
                    className: "MultiSelect__emptyIn"
                }, u ? b : v)), r.createElement(O, c({
                    className: "MultiSelect__scroll",
                    ref: this.scrollContainerRef
                }, w), k.map(e => r.createElement(s.a, {
                    className: "MultiSelect__suggestsItem",
                    "data-id": e.props["data-id"],
                    onClick: this.onSelect,
                    key: e.key
                }, e))))
            }
        }
        u.defaultProps = {
            removeTokenPlaceholder: "",
            placeholder: "",
            value: "",
            useInfiniteScroll: !1,
            notFoundText: "Not found"
        }
    },
    KFTi: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));

        function i(e) {
            var t = Object(a.a)("Progress", {
                "Progress--inverted": e.inverted
            }, e.className);
            return r.createElement("div", {
                className: t
            }, r.createElement("div", {
                className: "Progress__item"
            }), r.createElement("div", {
                className: "Progress__item"
            }), r.createElement("div", {
                className: "Progress__item"
            }))
        }
        i.defaultProps = {
            inverted: !1
        }
    },
    M24l: function(e, t, n) {
        "use strict";
        n.r(t);
        n("rE2o"), n("ioFf"), n("91GP"), n("VRzm"), n("Vd3H"), n("pIFo"), n("OEbY"), n("SRfc"), n("rGqo"), n("Btvt"), n("OG14"), n("a1Th");
        var r = n("vT4u"),
            a = n("P13b"),
            i = n("rHUl"),
            s = n("MhhX"),
            o = n("N1NS"),
            c = n("f01n");

        function l(e, t) {
            return {
                isAll: e => Object(r.X)(e.get().peer, e.get()),
                loadMore: e => (function(e) {
                    return Object(r.X)(e.get().peer, e.get()) ? Promise.resolve("") : Object(r.hc)(e.get().peer, e.get())
                })(e),
                unmount() {
                    Object(o.c)(t)
                }
            }
        }

        function d(e) {
            return e.findIndex(e => "number" == typeof e.peerId && e.href) > -1
        }

        function u(e, t) {
            var n = function(e, t, n) {
                var i = intval(domData(n, "msgid"));
                if (!getSelectionText() && !Object(a.F)(t)) {
                    var s = intval(domData(n, "peer"));
                    return e.set(r.m.bind(null, s)), e.get().longpoll.push([Object(c.gb)(s, i)]), !1
                }
            }.bind(null, t);
            return l(0, Object(o.a)({
                handlers: (t, r) => {
                    r(e, "click", "_im_mess", n)
                }
            }))
        }
        var m = n("h++7"),
            p = n("ERyv");

        function g(e, t) {
            if (!t) return ls.get(e);
            ls.set(e, t)
        }
        var h = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = debounce(g, 300),
                    r = extend({}, e),
                    a = [],
                    i = [];
                return t.store && (r = ls.get(t.key) || r), {
                    get: () => r,
                    set(e) {
                        var a = Object(p.c)() ? function(e) {
                            try {
                                var t = {};
                                return Error.captureStackTrace(t, e), t.stack
                            } catch (e) {
                                return ""
                            }
                        }(this.set) : null;
                        return e(r).then(e => (r = e, t.store && n(t.key, e), this.emit(), this)).catch(e => Object(p.a)("store_set_catch", e, {
                            stack: a
                        }))
                    },
                    setState(e) {
                        return this.set(t => (t = extend(t, e), this.emit(), Promise.resolve(t)))
                    },
                    stash() {
                        a.push(r), r = extend({}, e), this.emit()
                    },
                    reset() {
                        r = extend({}, e), this.emit()
                    },
                    unmount() {
                        r = {}, e = !1, i = []
                    },
                    pop() {
                        a.length > 0 && (r = a.pop(), this.emit())
                    },
                    emit() {
                        i.length > 0 && i.forEach(e => e(this))
                    },
                    subscribe(e) {
                        -1 === i.indexOf(e) && i.push(e)
                    },
                    unsubscribe(e) {
                        i = i.filter(t => t !== e)
                    },
                    mutate(e) {
                        e(r), t.store && n(t.key, r), this.emit()
                    }
                }
            },
            _ = n("aong"),
            b = n("+/AQ");

        function f(e, t) {
            return Object(_.o)(e).find(e => domData(e, "list-id") === t)
        }

        function v(e, t) {
            return Object(_.o)(e).findIndex(e => domData(e, "list-id") === t)
        }

        function y(e, t, n, r) {
            if (n) {
                j(e, t, r);
                var a = domData(n, "list-id"),
                    i = a && f(t.children, a);
                i && r.forEach(e => addClass(i, e)), e.setState({
                    hoveredListItemId: a
                })
            }
        }

        function j(e, t, n) {
            var r = domQuery("." + n.join("."), t);
            r && Object(_.o)(r).forEach(e => {
                n.forEach(t => removeClass(e, t))
            }), e.setState({
                hoveredListItemId: null
            })
        }

        function O(e, t) {
            var n = t && domQuery("." + t.join("."), e)[0];
            return n ? domData(n, "list-id") : null
        }

        function w(e, t, n) {
            return e.map(t).reduce((e, t) => (e[t] = !0, e), n)
        }

        function k(e, t, n) {
            return {
                ids: w(n.get().elements, e, {}),
                scrolls: t,
                activated: !0
            }
        }

        function C(e) {
            var t = {};
            return e.forEach(e => {
                "r" === e[0] && t[`a,${e[1]}`] ? delete t[`a,${e[1]}`] : t[`${e[0]},${e[1]}`] = e
            }), Object.keys(t).map(e => t[e])
        }

        function S(e, t, n, r, a, i) {
            for (var s = 0; s < r; s++) e = domNS(e);
            var o = se(a(t));
            return domData(o, "list-id", n), e ? i.insertBefore(o, e) : i.appendChild(o), e
        }

        function E(e, t, n, r, a) {
            var i = r.get(),
                s = i.limit,
                o = i.offset,
                c = function(e, t) {
                    var n = t.get();
                    return !n._sortedEls && e && t.setState({
                        elements: n.elements.sort(e),
                        _sortedEls: !0
                    }), t.get().elements
                }(n().sortFn, r).slice(0, o + s),
                l = function(e, t) {
                    for (var n = [], r = Math.max(e.length, t.length), a = 0; a < r; a++) {
                        var i = e[a],
                            s = t[a];
                        !i && s ? n.push(["a", s, a]) : i && !s ? n.push(["r", i, a]) : i !== s && (n.push(["r", i, a]), n.push(["a", s, a]))
                    }
                    var o = C(n),
                        c = C(n.reverse());
                    return o.length > c.length ? c : o
                }(Object(_.o)(e.children).map(e => domData(e, "list-id")).filter(e => !!e), c.map(e => n().idFn(e).toString()));
            if (function(e, t, n, r) {
                    if (0 !== t.length) {
                        var a = (t = t.sort((e, t) => e[2] - t[2])).filter(e => "a" === e[0]);
                        if (t.filter(e => "r" === e[0]).map(t => e.children[t[2]]).forEach(e => re(e)), 0 !== a.length)
                            for (var i = a.shift(), s = i[2], o = (S(e.children[s], n[i[2]], i[1], 0, r, e), 0); o < a.length; o++) i = a[o], S(e.children[s], n[i[2]], i[1], i[2] - s, r, e), s = i[2]
                    }
                }(e, l, c, n().renderFn), function(e, t) {
                    e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
                }(r, t), a) return l.filter(e => "a" == e[0]).map(e => parseInt(e[1]))
        }

        function I(e, t, n, r) {
            var a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
                s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                o = e.get(),
                c = t.getContainer().children,
                l = v(c, r || o.hoveredListItemId);
            l < 0 || (o.limit + o.offset < l ? e.setState({
                offset: l - o.limit + 1
            }).then(E.bind(null, t.getContainer(), t, n)) : Promise.resolve()).then(() => {
                var e = c[l],
                    n = t.scrollTop(),
                    r = t.getScrollHeight(),
                    o = e.offsetHeight;
                i = "center" === i ? -.5 * t.getScrollHeight() : i, s = "center" === s ? r / 2 : s;
                var d = a ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    u = n + i > e.offsetTop,
                    m = o + e.offsetTop > n + r - s;
                u ? d(e.offsetTop - i) : m && d(e.offsetTop - r + o + s)
            })
        }

        function x(e, t) {
            var n = e.get().pipeId;
            return !(void 0 !== n && void 0 !== t && n !== t)
        }

        function T(e, t, n, r, a, i) {
            return !!x(e, a) && e.setState(function(e, t, n) {
                var r = e.filter(e => !n.ids[t(e)]);
                return {
                    _sortedEls: !1,
                    els: r,
                    ids: w(r, t, n.ids),
                    elements: n.elements.concat(r)
                }
            }(i, r().idFn, e.get())).then(E.bind(null, t, n, r))
        }

        function P(e, t, n) {
            var r = function(e, t) {
                    if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
                    e.get().loading = !0;
                    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
                    return t(...r).then(() => {
                        e.get().loading = !1
                    })
                }.bind(null, t, function(e, t, n, r) {
                    var i = e.get(),
                        s = i.elements,
                        o = r.getContainer(),
                        c = e.setState({
                            offset: i.offset + i.limit
                        }).then(() => {
                            var n, a = i.offset,
                                c = i.limit;
                            return c + a > s.length ? n = t().more(a, c).then(t => !1 === t ? [] : (0 === t.length && e.setState({
                                stop: !0
                            }), t)).then(T.bind(null, e, o, r, t, i.pipeId)) : (n = Promise.resolve(), E(o, r, t, e)), n
                        });
                    if (!n) {
                        var l = s.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
                        Object(a.Oc)(o)(c, "bottom", l)
                    }
                    return c
                }.bind(null, t, n)),
                i = (e, r) => {
                    (t.get().activated || e) && (void 0 !== r && t.get().elements.length > 0 && t.setState({
                        scrolled: r
                    }), n().onScroll && n().onScroll())
                },
                s = Object(b.a)(e, {
                    noScroll: t.get().noScroll,
                    nativeScroll: t.get().nativeScroll,
                    scrollChange: i.bind(null, !1),
                    more: !!n().more && r.bind(null, !1)
                }),
                c = Object(o.a)({
                    handlers: (r, a) => {
                        a(e, "click", t.get().elCls, n().onClick)
                    }
                });
            return t.setState(k(n().idFn, {}, t)), {
                pipe: (e, r) => (t.setState({
                    pipeId: r
                }), e.then(T.bind(null, t, s.getContainer(), s, n, r))),
                replacePreserveOrder: e => t.set(function(e, t, n) {
                    var r = [];
                    n.elements = n.elements.map(n => {
                        var a = t(n),
                            i = e.filter(e => t(e) === a)[0];
                        return r.push(a), i || n
                    });
                    var a = e.filter(e => !inArray(t(e), r));
                    return n.elements = n.elements.concat(a), Promise.resolve(n)
                }.bind(null, e, n().idFn)).then(E.bind(null, s.getContainer(), s, n)),
                pipeReplace(e, r) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return t.setState({
                        pipeId: r,
                        stop: !1
                    }), e.then(e => {
                        if (x(t, r)) return t.setState({
                            elements: e,
                            _sortedEls: !1,
                            ids: w(e, n().idFn, {})
                        }).then(E.bind(null, s.getContainer(), s, n, t, a))
                    })
                },
                wipe() {
                    s.getContainer().innerHTML = ""
                },
                deactivate() {
                    t.setState({
                        activated: !1
                    })
                },
                activate() {
                    t.setState({
                        activated: !0
                    })
                },
                saveScroll: (e, n) => t.set(function(e, t, n) {
                    return n.scrolls || (n.scrolls = {}), n.scrolls[e] && !t || (n.scrolls[e] = {
                        scrolled: n.scrolled || 0,
                        scrollItem: n.scrollItem
                    }), Promise.resolve(n)
                }.bind(null, e, n)),
                updateScroll() {
                    s.update(!1, !0)
                },
                toTop(e) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? s.smoothScroll(-s.scrollTop()) : s.scrollTop(0), e && i(e, 0)
                },
                scrollTop: e => s.scrollTop(e),
                restoreScroll(e) {
                    var n = t.get().scrolls,
                        r = n[e];
                    return r && (t.setState({
                        scrolls: extend({}, n, {
                            [e]: null
                        })
                    }), s.scrollTop(r.scrolled)), !!r
                },
                unsetScroll(e) {
                    t.setState({
                        scrolls: extend({}, t.get().scrolls, {
                            [e]: null
                        })
                    })
                },
                scrollPage(e, t) {
                    var n = s.scroll.scroller,
                        r = s.scrollTop(),
                        a = r + ("up" === e ? -1 : 1) * n.clientHeight;
                    t ? s.smoothScroll(a - r) : s.scrollTop(a)
                },
                scrollToElement(e, r, a, i) {
                    I(t, s, n, e, r, a, i)
                },
                checkMore: e => t.get().elements.length < t.get().limit ? r(e, s) : Promise.resolve([]),
                add: (e, r) => T(t, s.getContainer(), s, n, r, e),
                hoverNextElement(e, r) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = s.getContainer(),
                        o = i.children,
                        c = v(o, t.get().hoveredListItemId || O(i, r)),
                        l = Object(_.o)(o).slice(c + 1).find(n().hoverableFn);
                    y(t, i, l, e), I(t, s, n, null, !1, a.top, a.bottom)
                },
                hoverPrevElement(e, r) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = s.getContainer(),
                        o = i.children,
                        c = v(o, t.get().hoveredListItemId || O(i, r)),
                        l = c >= 0 && Object(_.o)(o).slice(0, c).reverse().find(n().hoverableFn);
                    y(t, i, l, e), I(t, s, n, null, !1, a.top, a.bottom)
                },
                hoverFirstElement(e, r) {
                    var a = s.getContainer(),
                        i = a.children,
                        o = Object(_.o)(i).findIndex(n().hoverableFn),
                        c = i[o];
                    !t.get().hoveredListItemId && c && (y(t, a, c, e), I(t, s, n, o, !1, r.top, r.bottom))
                },
                hoverElement(e, r, a) {
                    var i = s.getContainer(),
                        o = i.children,
                        c = v(o, e),
                        l = o[c];
                    l && (y(t, i, l, r), I(t, s, n, c, !1, a.top, a.bottom))
                },
                unhoverElements(e) {
                    j(t, s.getContainer(), e)
                },
                reset() {
                    var e = t.get().scrolls;
                    t.reset(), t.setState(k(n().idFn, e, t))
                },
                getHoveredElement: () => f(s.getContainer().children, t.get().hoveredListItemId),
                getCurrentElements: () => t.get().elements,
                isLoading: () => t.get().loading,
                isEmpty: () => 0 === t.get().elements.length,
                remove(e) {
                    t.set(function(e, t, n) {
                        return n.elements = n.elements.filter(n => t(n) !== e), delete n.ids[e], Promise.resolve(n)
                    }.bind(null, e, n().idFn)).then(E.bind(null, s.getContainer(), s, n))
                },
                unmount() {
                    Object(o.c)(c), s.destroy()
                }
            }
        }
        var M = n("1y80"),
            L = n("86+7"),
            B = n("lJdi");

        function D(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var N = 64,
            A = "_im_dialog_star",
            q = "_im_dialog_daction",
            H = ["_im_dialog_selected", "nim-dialog_selected"],
            F = ["_im_dialog_hovered", "nim-dialog_hovered"];

        function R(e) {
            return hasClass(e, "_im_search")
        }

        function $(e, t, n, s, o) {
            if (!gpeByClass("_im_peer_target", s.target)) {
                var l = t.get(),
                    d = R(o),
                    u = parseInt(domData(o, "peer"), 10),
                    m = parseInt(domData(o, "msgid"), 10),
                    p = Object(i.u)(t, u),
                    g = "";
                if (Object(i.O)(t) && (g = "conversations_search"), Object(i.K)(t) && (g = "recent_searches"), hasClass(o, "_im_sugg_" + u) && (g = "popular_suggestions"), d && (g = "message_search"), checkEvent(s)) return window.open(function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        i = Object(a.T)(e),
                        s = () => `${i}?sel=${Object(a.I)(t.peerId)}${r&&n?"&msgid="+n:""}`;
                    if (r) return s();
                    if (Object(a.Hb)(t.peerId) || Object(a.lb)(t.peerId)) return Object(a.jb)(e) ? s() : t.href;
                    return s()
                }(t, p, m, d));
                if (n.saveScroll("list"), d && l.msgid !== m) l.longpoll.push([c.gb(u, m, !1, !1, g)]);
                else if (u !== l.peer) {
                    l.longpoll.push([c.gb(u, !1, !0, !0, g)]);
                    var h = Object(i.O)(t);
                    h && !hasClass(o, "_dont_add_recent") && Object(r.bc)(u, cur.imDb), h && p && !Object(a.jb)(t) && setTimeout(() => {
                        var e = p.message ? p.message.messageId : p.peerId;
                        n.scrollToElement(e.toString(), !0, 0, "center")
                    }, 100)
                } else u === l.peer && e().goToHistoryEnd();
                cancelEvent(s)
            }
        }

        function U(e, t, n, r) {
            var i;
            return !Object(a.ib)(t) || "string" == typeof n.photo && "" !== n.photo ? (i = `<img src="${n.photo}" alt="">`, r && (i = getTemplate("im_dialogs_link_img", {
                href: n.href,
                photo: i
            }))) : i = Object(a.Zb)(e, n, !r), {
                photo: i,
                userLink: `<span class="_im_dialog_link">${n.tab}</span>`
            }
        }

        function z(e, t, n, r) {
            return n ? "" : r ? getTemplate("im_img_prebody", {
                photo: t
            }) : e + ":"
        }

        function K(e, t, n) {
            return !!(n & c.m) && (!Object(a.Cb)(t.peerId, e.get().gid) && (!(Object(a.ib)(t.peerId) && t.data && t.data.closed) && (!t.unread && !(t.lastmsg <= t.out_up_to))))
        }

        function W(e) {
            var t = Y(e);
            return (e.unread > 0 ? e.unread : "") > 0 && t
        }

        function V(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                s = U(e, t.peerId, t, Object(a.jb)(e)),
                o = s.photo,
                l = s.userLink,
                d = n || Y(t);
            if (!d) return function(e, t, n, r) {
                var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                    o = [];
                return Object(a.jb)(r) && o.push("nim-dialog_classic"), Object(i.K)(r) && o.push("nim-dialog_recent"), o.push("nim-dialog_empty"), s.search && o.push("_im_search"), getTemplate("im_drow", {
                    peer: e.peerId,
                    msg_id: "",
                    photo: t,
                    user_link: n,
                    date: "",
                    body: "",
                    unread: "",
                    more: o.join(" "),
                    is_star: "",
                    unread_message_string: "",
                    is_online: onlinePlatformClass(e.online),
                    is_unread: "",
                    is_unread_out: "",
                    is_selected: e.peerId == r.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
                })
            }(t, o, l, e, r);
            var u = d.flags,
                m = Object(a.rb)(e, t.peerId),
                p = Q(t, e, n),
                g = [];
            r.search && g.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && g.push("nim-dialog_muted"), t.verified && g.push("nim-dialog_verified"), Object(i.K)(e) && g.push("nim-dialog_recent"), -1 === d.messageId && g.push("nim-dialog_empty"), Object(a.jb)(e) && g.push("nim-dialog_classic"), t.folders & c.q && g.push("nim-dialog_starred"), !r.search && Object(a.Fb)(e, t.peerId, t) && g.push("nim-dialog_unrespond"), m && e.get().gid && g.push("nim-dialog_deny-remove");
            var h = e.get().timeshift,
                _ = K(e, t, u) ? "nim-dialog_unread-out" : "",
                b = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
            return getTemplate("im_drow", {
                peer: t.peerId,
                msg_id: d.messageId,
                photo: o,
                user_link: l,
                date: d.date ? getShortDateOrTime(d.date, h, !0, getLang("months_sm_of", "raw")) : "",
                body: p,
                unread_message_string: b,
                tab_name: stripHTML(t.tab),
                unread: Object(a.Dc)(t.unread),
                more: g.join(" "),
                is_online: onlinePlatformClass(t.online),
                is_unread: W(t) ? "nim-dialog_unread" : "",
                is_unread_out: _,
                is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
            })
        }

        function G(e, t, n, r, s) {
            if (!t.deletedDialog)
                if (hasClass(e, "nim-conversation-search-row")) X(e, t, n);
                else {
                    var o = Y(t),
                        l = o.flags,
                        d = Q(t, n),
                        u = U(n, t.peerId, t, Object(a.jb)(n)).photo,
                        m = n.get().timeshift,
                        p = o.date ? getShortDateOrTime(o.date, m, !0, getLang("months_sm_of", "raw")) : "";
                    oe(e, t), val(geByClass1("_dialog_body", e), d), val(geByClass1("_im_dialog_date", e), p), val(geByClass1("_im_dialog_unread_ct", e), Object(a.Dc)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
                    var g = geByClass1("_im_dialog_photo", e);
                    g.innerHTML !== u && val(g, u), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & c.q), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", Object(a.Fb)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", Object(a.jb)(n)), toggleClass(e, "nim-dialog_unread", W(t)), toggleClass(e, "nim-dialog_deny-remove", n.get().gid > 0 && Object(a.rb)(n, t.peerId)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", Object(i.K)(n)), toggleClass(e, "nim-dialog_empty", -1 === o.messageId), K(n, t, l) && addClass(e, "nim-dialog_unread-out"), s && setTimeout(function() {
                        addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
                    }, 100)
                }
        }

        function X(e, t, n) {
            oe(e, t), toggleClass(e, "nim-dialog_recent", Object(i.K)(n)), val(geByClass1("_im_dialog_unread_ct", e), Object(a.Dc)(t.unread));
            var r = U(n, t.peerId, t, Object(a.jb)(n)).photo,
                s = geByClass1("_im_dialog_photo", e);
            s.innerHTML !== r && val(s, r), toggleOnline(geByClass1("_im_peer_online", e), t.online), W(t) && addClass(e, "nim-dialog_unread")
        }

        function Q(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || Y(e);
            if (Object(a.xb)(e.peerId, t)) {
                var r = t.get().block_states[e.peerId].name,
                    o = getLang("mail_community_answering").replace("{username}", r);
                return getTemplate("im_drow_prebody", {
                    prebody: o,
                    body: ""
                })
            }
            return Object(s.l)(n) ? Object(a.dc)(t, n, e, !1) : function(e, t, n, r, s, o, l, d, u, m) {
                var p = "",
                    g = Object(i.z)(e, Object(i.u)(e, n));
                return t & c.m ? p = z(getLang("mail_by_you"), m, g, u) : Object(a.ib)(n) && 0 !== r && (p = z(Object(L.c)(e, r).first_name, Object(L.c)(e, r).photo, g, u)), l = Object(a.ec)(n, d, l, s, o), p ? getTemplate("im_drow_prebody", {
                    prebody: p,
                    body: l
                }) : l
            }(t, n.flags, e.peerId, n.userId, !0, n.attaches, n.text, n.subject, Object(a.jb)(t), Object(L.c)(t, t.get().id).photo)
        }

        function Y(e) {
            var t = e.lastmsg_meta;
            return isArray(t) && (t = Object(c.eb)([4].concat(t))), t || Object(c.eb)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
        }

        function J(e, t, n) {
            var i = Object(a.tc)(e, t, s => {
                n().updateMenu(e), s && Object(a.G)(e, i, n, r.I, t), Object(a.ib)(t) && e.set(r.cb.bind(null, t)), i.hide()
            })
        }

        function Z(e, t, n, i, s, o) {
            var c = gpeByClass("_im_dialog", o, n);
            if (cancelEvent(s), !c) return !1;
            var l = intval(domData(c, "peer")),
                d = t.get(),
                u = Object(a.lb)(l) || Object(a.Hb)(l);
            if (d.recentSearch) {
                var m = Object(r.Kb)(l, cur.imDb);
                re(c), 0 === m.length && me(t, i, e)
            } else Object(a.jb)(t) && u ? Object(r.y)(l, d).then(n => {
                var r = D(n, 2),
                    a = r[0],
                    i = r[1];
                a ? (! function(e, t, n, r, a) {
                    var i = geByClass1("_dialog_body", t);
                    addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
                        text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
                        peer: e,
                        spam_id: r
                    }))
                }(l, c, a, i), e().updateMenu(t)) : J(t, l, e)
            }) : J(t, l, e);
            return !1
        }

        function ee(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                r = U(e, t.peerId, t, Object(a.jb)(e)),
                s = r.photo,
                o = r.userLink,
                c = function(e) {
                    return !Object(a.zb)(e)
                }(e),
                l = "" === n ? [] : [n];
            return Object(i.K)(e) && l.push("nim-dialog_recent"), Object(a.jb)(e) && l.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && l.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
                peer: t.peerId,
                msg_id: t.lastmsg || "",
                photo: s,
                user_link: o,
                unread: Object(a.Dc)(t.unread),
                tab_name: stripHTML(t.tab),
                is_unread: W(t) ? "nim-dialog_unread" : "",
                is_online: onlinePlatformClass(t.online),
                is_selected: t.peerId == e.get().peer && c ? "nim-dialog_selected _im_dialog_selected" : "",
                more: l.join(" ")
            })
        }

        function te(e, t) {
            return e.map(e => Object(c.eb)([4].concat(e))).map(e => extend({}, t[e.peerId], {
                message: e
            }))
        }

        function ne(e) {
            return {
                type: "empty",
                lang: e
            }
        }

        function ae(e, t) {
            var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
            return void 0 !== n ? 2e9 + n : t.lastmsg
        }

        function ie(e, t, n, r) {
            showTooltip(r, {
                text: function() {
                    var n = gpeByClass("_im_dialog", r, t),
                        a = domData(n, "peer");
                    return e.get().tabs[a].folders & c.q ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                },
                black: 1,
                zIndex: 1,
                shift: [14, 8],
                toup: _e(e, r.getBoundingClientRect().top)
            })
        }

        function oe(e, t) {
            var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
                r = geByClass1("_im_unread_blind_label", e);
            val(r, n)
        }

        function le(e) {
            var t = Object(i.O)(e),
                n = e.get().searchOnlyMessages;
            return Object(a.jb)(e) ? {
                top: t && !n ? 96 : 60,
                bottom: Object(a.kb)(e) ? 42 : 87
            } : {
                top: t && !n ? 36 : 0,
                bottom: 0
            }
        }

        function de(e, t) {
            e.hoverFirstElement(F, le(t))
        }

        function ue(e) {
            e.unhoverElements(F)
        }

        function me(e, t, n) {
            if (Object(i.c)(e)) {
                t.pipeReplace(Promise.resolve([{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }])), t.toTop()
            } else n().cancelSearch(e), cancelStackFilter("im_search")
        }

        function pe(e, t, n, r, s) {
            return {
                selectPeer(t, n) {
                    for (var r = geByClass("_im_dialog", e), a = n.get().peer, i = 0; i < r.length; i++) {
                        var s = r[i],
                            o = intval(domData(s, "peer")),
                            c = intval(domData(s, "msgid"));
                        o === a && (!R(s) || t === c && R(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                    }
                },
                appendFastDialogs(t, r, s) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), s ? (n.reset(), Object(a.zb)(t) || Object(i.K)(t) || !d(r) ? Object(i.K)(t) && (d(r) && (r = [{
                        type: "clear_recent"
                    }].concat(r)), Object(i.c)(t) && (r = [{
                        type: "sep_popular"
                    }, {
                        type: "popular_sugg"
                    }].concat(r))) : r = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(r), t.setState({
                        searchOnlyMessages: !1
                    }), n.pipeReplace(Promise.resolve(r)).then(() => de(n, t))) : n.pipe(Promise.resolve(r)), Object(a.jb)(t) && !Object(a.Ab)(t.get().peer) || n.toTop()
                },
                deactivate() {
                    n.deactivate()
                },
                activate() {
                    n.activate()
                },
                hoverFirstDialog(e) {
                    de(n, e)
                },
                hoverNextDialog(e) {
                    n.hoverNextElement(F, H, le(e))
                },
                hoverPrevDialog(e) {
                    n.hoverPrevElement(F, H, le(e))
                },
                unhoverDialogs: ue.bind(n),
                selectHoveredDialog(t) {
                    var a = geByClass1("_im_dialog_hovered", e);
                    a || (a = geByClass1("_im_dialog", e)), a && $(r, t, n, {}, a)
                },
                appendSearch(t, r, a) {
                    var i = te(a, r);
                    a.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                        type: "sep_messages"
                    }].concat(i))).then(() => de(n, t))) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([ne()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
                },
                update(e) {
                    n.pipeReplace(Promise.resolve(he(e)))
                },
                updateDialog(t, n) {
                    var r = geByClass1("_im_dialog_" + t);
                    r && !R(r) && G(r, n.get().tabs[t], n, e)
                },
                focusOnSelected(e) {
                    var t = e.get().peer;
                    if (t) {
                        var r = geByClass1(`_im_dialog_${t}`);
                        r ? n.scrollTop(r.offsetTop - r.offsetHeight) : n.toTop()
                    }
                },
                restoreScroll(e) {
                    n.restoreScroll("list") || n.toTop()
                },
                restoreDialogs(t, i, s) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                        searchOnlyMessages: !1
                    }), 0 !== he(t).length || n.isLoading() || (i = !0), i && n.reset(), s && n.wipe(), n.pipeReplace(Promise.resolve(he(t))).then(e => {
                        if (i && (!Object(a.jb)(t) || !t.get().peer)) {
                            var s = function(e, t, n) {
                                return Object(a.jb)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!Object(a.jb)(n)).then(() => {
                                    Object(a.jb)(n) || t().toggleSettingsLoader(n, !1)
                                })
                            }(n, r, t);
                            return n.toTop(), s
                        }
                    }).then(() => ue(n))
                },
                appendDialogs(t, r) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(n => {
                        var r = geByClass1("_im_dialog_" + n.peerId, e);
                        r && X(r, n, t)
                    }), Object(a.zb)(t) || Object(i.K)(t) || !d(r) || (r = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(r)), t.setState({
                        searchOnlyMessages: !1
                    }), n.isEmpty() && 0 === r.length && Object(a.zb)(t) && (r = [ne(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
                },
                updateCounter(t, n) {
                    var r = geByClass1("_im_dialog_" + n, e),
                        s = Object(i.u)(t, n);
                    if (r && !R(r) && (oe(r, s), val(geByClass1("_im_dialog_unread_ct", r), Object(a.Dc)(s.unread)), toggleClass(r, "nim-dialog_unread", s.unread > 0), toggleClass(r, "nim-dialog_unread-out", K(t, s, Y(s).flags))), Object(i.K)(t)) {
                        var o = geByClass1("_im_sugg_" + n);
                        o && (val(geByClass1("_sugg_unread_ct", o), Object(a.Dc)(s.unread)), toggleClass(o, "sugg-is_unread", s.unread > 0))
                    }
                },
                removeDialog(e, t) {
                    n.remove(t)
                },
                updateOnline(t, n) {
                    var r = geByClass1("_im_dialog_" + t, e);
                    if (r) {
                        var a = n.get().tabs[t],
                            i = geByClass1("_im_peer_online", r);
                        toggleOnline(i, a.online)
                    }
                },
                setDialogFailed(t, n, r) {
                    var a = geByClass1("_im_dialog_" + t, e);
                    a && (r.get().tabs[t].lastmsg === n && (addClass(a, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", a), "!")))
                },
                scrollUp(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    n.toTop(e, t), n.saveScroll("list", !0)
                },
                saveScroll(e) {
                    n.saveScroll("list", !0)
                },
                promoteDialog(r, a) {
                    var s = geByClass1("_im_dialog_" + a, e);
                    s && !R(s) || !Object(i.O)(r) ? (n.pipeReplace(Promise.resolve(he(r)), void 0, !0).then(t => {
                        !inArray(a, t) && s && G(s, Object(i.u)(r, a), r, e)
                    }), t().updateTyping(a, r)) : n.unsetScroll("list")
                },
                removeSelection(t) {
                    var r = t.get().peer.toString(),
                        i = `._im_dialog_${r}.${H.join(".")}`,
                        s = domQuery(i, e)[0];
                    H.forEach(e => removeClass(s, e)), Object(a.jb)(t) || n.hoverElement(r, F, le(t))
                },
                updateScroll() {
                    n.updateScroll()
                },
                updateTyping(t, n) {
                    var r = geByClass1(`_im_dialog_${t}`, e);
                    if (r && !R(r) && !n.get().tabs[t].deletedDialog) {
                        var s = geByClass1("_im_dialog_typing", r),
                            o = !Object(a.jb)(n),
                            c = Object(a.P)(Object(i.u)(n, t).activity, t, !Object(a.ib)(t), n.get(), 1, o);
                        val(s, c), toggleClass(r, "nim-dialog_typing", c)
                    }
                },
                unmount() {
                    n.unmount(), Object(o.c)(s)
                }
            }
        }

        function he(e) {
            var t = e.get(),
                n = t.active_tab,
                r = t.dialog_tabs[n],
                i = t.tabs,
                s = r.map(e => i["" + e]).sort(function(e, t, n) {
                    var r;
                    return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = Object(a.Bb)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = ae(e, n) - ae(e, t), r = Object(a.Bb)(e) ? -r : r), r
                }.bind(null, e));
            if (t.isIncomingMessageRequestsAllowed) {
                var o = t.dialog_tab_cts.mr;
                if (n === m.k && s.unshift({
                        type: "message_request_notice"
                    }), !Object(a.jb)(e)) switch (n) {
                    case m.h:
                        o > 0 && s.unshift({
                            type: "message_request_button_go"
                        });
                        break;
                    case m.k:
                        s.unshift({
                            type: "message_request_button_return"
                        })
                }
            }
            return s
        }

        function _e(e, t) {
            return t > (e.get().gid ? 220 : 150) || Object(i.O)(e)
        }

        function be(e, t, n) {
            var s = Object(o.b)(pe),
                c = s.callMutations,
                l = s.bindMutations,
                d = function(e, n) {
                    showTooltip(n, {
                        text: () => {
                            if (Object(i.K)(t)) return getLang("mail_hide_from_recent");
                            var e = Number(n.getAttribute("data-peer")),
                                r = Object(i.u)(t, e);
                            return Object(a.ib)(e) ? Object(B.m)(Object(i.u)(t, e), 1024) ? getLang("mail_unfollow_channel") : r.data.closed || r.data.kicked ? getLang("mail_delete") : getLang("mail_leave_chat") : getLang("mail_delete")
                        },
                        black: 1,
                        [Object(a.jb)(t) ? "center" : "needLeft"]: !0,
                        shift: Object(a.jb)(t) ? [-4, 10] : [0, 10],
                        toup: _e(t, n.getBoundingClientRect().top),
                        zIndex: 1
                    })
                },
                u = function(e, n) {
                    showTooltip(n, {
                        text: getLang("mail_end_conversation"),
                        black: 1,
                        center: !0,
                        zIndex: 1,
                        shift: [1, 4],
                        toup: _e(t, n.getBoundingClientRect().top)
                    })
                },
                p = ie.bind(null, t, e),
                g = function(e, t, n, a) {
                    var i = gpeByClass("_im_dialog", a, t),
                        s = intval(domData(i, "peer"));
                    return e.set(r.Jc.bind(null, s)), setTimeout(function() {
                        ie(e, t, 0, a)
                    }, 100), cancelEvent(n), !1
                }.bind(null, t, e),
                _ = function(e, t, n, a, s) {
                    var o = gpeByClass("_im_dialog", s, t),
                        c = intval(domData(o, "peer")),
                        l = e.get().tabs[c].lastmsg;
                    return e.set(r.vb.bind(null, c, l)).then(() => {
                        G(o, e.get().tabs[c], e, t), Object(i.K)(e) || n().restoreDialogs(e)
                    }), showDoneBox(getLang("mail_marked_as_answered"), {
                        out: 1e3
                    }), cancelEvent(a), !1
                }.bind(null, t, e, c),
                b = geByClass1("_im_dialogs_search"),
                f = {
                    idFn: e => (function(e, t) {
                        return t.message ? t.message.messageId : Object(i.O)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
                    })(t, e),
                    hoverableFn: e => hasClass(e, "_im_dialog"),
                    renderFn: function(e, t) {
                        var n = e.get().isIncomingMessageRequestsAllowed;
                        switch (t.type) {
                            case "sep_btn_search_msg":
                                return Object(a.Sb)(e);
                            case "sep_messages":
                                return Object(a.Yb)();
                            case "sep_conversations":
                                return Object(a.Ub)();
                            case "sep_popular":
                                return Object(a.bc)();
                            case "popular_sugg":
                                return Object(a.cc)(e);
                            case "clear_recent":
                                return Object(a.Tb)();
                            case "empty_dialogs":
                                return getTemplate("im_dialogs_none", {
                                    msg: getLang("mail_dialogs_list_empty")
                                });
                            case "empty_message_requests":
                                return getTemplate("im_dialogs_none", {
                                    msg: getLang("mail_dialogs_mr_empty")
                                });
                            case "empty":
                                return getTemplate("im_dialogs_none", {
                                    msg: getLang("mail_im_search_empty")
                                });
                            case "message_request_notice":
                                return n ? getTemplate("im_dialogs_message_requests_notice", {
                                    msg: getLang("mail_message_request_tab_notice")
                                }) : "";
                            case "message_request_button_go":
                                return n ? getTemplate("im_dialogs_message_requests_button", {
                                    msg: getLang("mail_tab_mr")
                                }) : "";
                            case "message_request_button_return":
                                return n ? getTemplate("im_dialogs_message_requests_button", {
                                    msg: getLang("mail_go_to_all_tab")
                                }) : "";
                            default:
                                return t.message ? V(e, t, t.message, {
                                    noselect: !0,
                                    search: !0
                                }) : t.local_index || Object(i.O)(e) ? ee(e, t) : V(e, t)
                        }
                    }.bind(null, t),
                    more: function(e, t, n, s) {
                        if (Object(i.O)(e) && e.get().searchAllLoaded || Object(i.K)(e)) return Promise.resolve([]);
                        if (e.get().dialog_search_going || Object(a.jb)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
                        if (Object(i.O)(e)) return Object(r.gc)(Object(i.s)(e), e.get()).then(e => {
                            var t = D(e, 2),
                                n = t[0];
                            return te(t[1], n)
                        });
                        var o = e.get().active_tab,
                            c = e.get().dialog_tabs_all;
                        return o !== m.k && c[m.h] && !Object(a.Bb)(e) || c[o] ? 0 === he(e).length ? Object(i.J)(e) ? Promise.resolve([{
                            type: "message_request_notice"
                        }, {
                            type: "empty_message_requests"
                        }]) : Promise.resolve([{
                            type: "empty_dialogs"
                        }]) : Promise.resolve([]) : e.set(r.ib).then(t => {
                            var n = he(e);
                            return 0 === n.length ? Object(i.J)(e) ? Promise.resolve([{
                                type: "message_request_notice"
                            }, {
                                type: "empty_message_requests"
                            }]) : [{
                                type: "empty_dialogs"
                            }] : n
                        })
                    }.bind(null, t, c),
                    onScroll: !!Object(a.jb)(t) && (() => {
                        (bodyNode.scrollTop || document.documentElement.scrollTop) <= 0 && !layers.visible && browser.safari ? addClass(b, "im-page--header_static") : removeClass(b, "im-page--header_static")
                    })
                },
                v = P(e, h({
                    limit: 40,
                    offset: 0,
                    nativeScroll: !!Object(a.jb)(t),
                    height: N,
                    elements: he(t)
                }), () => f),
                y = $.bind(null, n, t, v),
                j = function(e, t, n) {
                    removeClass(t.parentNode, "im-page--dialogs_with-mess");
                    var r = n.getCurrentElements().filter(e => e.message);
                    n.toTop(), n.reset(), Object(M.b)(.01, "im_search_stat", 1, "search_messages_only"), r.length > 0 ? (r = [{
                        type: "sep_messages"
                    }].concat(r), e.setState({
                        searchOnlyMessages: !0
                    })) : r = [ne()], n.pipeReplace(Promise.resolve(r))
                }.bind(null, t, e, v),
                O = function(e, t, n, i, s, o) {
                    var c = intval(domData(o, "peer")),
                        l = domData(o, "action"),
                        d = domData(o, "sid"),
                        u = geByClass1("_im_dialog_" + c, t),
                        m = intval(domData(o, "spam"));
                    switch (l) {
                        case "restore":
                            u && e.set(r.Ub.bind(null, c, d, m)).then(() => {
                                addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), G(u, e.get().tabs[c], e, t, !1), i().updateMenu(e)
                            });
                            break;
                        case "spam":
                            var p = `${getLang("mail_im_dialog_marked_spam")}\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="${d}" data-peer="${c}">\n            ${getLang("mail_restore")}\n        </button>`;
                            if (u) {
                                var g = geByClass1("_dialog_body", u);
                                val(g, p), Object(r.Ac)(c, d, e.get())
                            }
                            break;
                        case "block":
                            (Object(a.kb)(e) ? Object(a.nc)(c, e) : Object(a.oc)(c, e)).once("success", function() {
                                e.set(r.I.bind(null, c)).then(() => {
                                    n().restoreDialogs(e)
                                })
                            })
                    }
                    cancelEvent(s)
                }.bind(null, t, e, c, n),
                w = Z.bind(null, n, t, e, v),
                k = function(e, t) {
                    Object(a.Ic)(e, t, r.o)
                }.bind(null, t, n),
                C = Object(o.a)({
                    handlers: (i, s) => {
                        s(e, "click", "_im_dialog_close", w), s(e, "click", "_im_dialog_markre", _), s(e, "click", A, g), s(e, "click", "_im_dialog", y), s(e, "click", a.q, j), s(e, "mouseover", "_im_dialog_close", d), s(e, "mouseover", "_im_dialog_markre", u), s(e, "click", a.i, () => {
                            Object(r.Sb)(cur.imDb), me(t, v, n)
                        }), s(e, "click", a.u, k), s(e, "mouseover", A, p), s(e, "click", q, O), i(e, "mouseover", throttle(v.unhoverElements.bind(v, F), 100))
                    }
                });
            return l(e, c, v, n, C)
        }
        var fe = n("O8ze"),
            ve = n("QOPk"),
            ye = n("Wu9C"),
            je = n("q1tI"),
            Oe = n("i8i4"),
            we = n("T/g7"),
            ke = (n("17x9"), n("pemR"));

        function Ce(e) {
            return je.createElement("header", {
                className: Object(ke.a)("PopupHeader", e.className),
                style: e.style
            }, e.back && je.createElement("div", {
                className: "PopupHeader__back",
                onClick: e.onBackClick
            }, je.createElement("button", {
                className: "PopupHeader__backBtn",
                onClick: e.onBackClick
            }, e.back)), je.createElement("h2", {
                className: "PopupHeader__title"
            }, e.title), je.createElement("div", {
                className: "PopupHeader__close"
            }, je.createElement("button", {
                className: "PopupHeader__closeBtn",
                onClick: e.onCloseClick
            })))
        }
        Ce.defaultProps = {
            back: null,
            title: "",
            onCloseClick: () => {}
        };
        var Se = n("Hx9h"),
            Ee = n("XpgC"),
            Ie = n("WDXI"),
            xe = window.unclean,
            Te = we.a.getLang;
        class Pe extends je.PureComponent {
            constructor(e) {
                super(e), this.onSaveTitle = (e => {
                    var t = this.props.store,
                        n = t.get(),
                        a = e.value.trim().replace("\n", "");
                    a && a !== xe(this.props.title) && (this.setState({
                        titleChanged: !1
                    }), t.set(r.Sc.bind(null, n.peer, a)))
                }), this.onChangeTitle = (e => {
                    if (this.state.title !== e.target.value) {
                        var t = e.target.value.replace("\n", "");
                        this.setState({
                            title: t,
                            titleChanged: xe(this.props.title) !== t
                        })
                    }
                }), this.onValidateTitle = (e => !!e.trim().replace("\n", "")), this.onCancelTitle = (() => {
                    this.setState({
                        title: xe(this.props.title),
                        titleChanged: !1
                    })
                }), this.onSaveDescription = (e => {}), this.onPhotoUpload = (() => {
                    var e = this.props.store,
                        t = e.get().peer;
                    Object(B.g)(e) && (cur.recieveCropResult = void 0, Page.ownerPhoto(t, {
                        gid: e.get().gid
                    }))
                }), this.onPhotoRemove = (() => {
                    var e = this.props.store,
                        t = e.get().peer;
                    Object(B.g)(e) && e.set(r.Ib.bind(null, t)).then(() => e.set(r.L.bind(null, t))).catch(e => Object(p.a)("onPhotoRemove", e))
                }), this.state = {
                    title: xe(e.title),
                    titleChanged: !1
                }
            }
            render() {
                var e = this.props,
                    t = e.store,
                    n = e.photo,
                    r = e.title,
                    a = e.description,
                    i = e.grid,
                    s = e.meta,
                    o = xe(r),
                    c = Object(B.g)(t),
                    l = Object(ke.a)("ChatSettingsInfo", {
                        "ChatSettingsInfo--editable": c
                    }),
                    d = Object(ke.a)("ChatSettingsInfo__title", {
                        "ChatSettingsInfo__title-service": 64 & this.props.flags
                    });
                return je.createElement("div", {
                    className: l
                }, je.createElement("header", {
                    className: "ChatSettingsInfo__header"
                }, je.createElement("div", {
                    className: "ChatSettingsInfo__photo"
                }, je.createElement("div", {
                    className: "ChatSettingsInfo__attach nim-peer nim-peer_larger",
                    "data-tip": Te("mail_settings_photo"),
                    onClick: this.onPhotoUpload
                }, n ? je.createElement("img", {
                    src: n,
                    width: "80",
                    height: "80",
                    alt: o,
                    className: "ChatSettingsInfo__photoSelf"
                }) : je.createElement("div", {
                    className: "nim-peer--photo-w"
                }, je.createElement("div", {
                    className: "ChatSettingsInfo__photoGrid nim-peer--photo",
                    dangerouslySetInnerHTML: {
                        __html: i
                    }
                }))), n && c && je.createElement(Ee.a, {
                    text: Te("mail_settings_remove_photo"),
                    position: "t",
                    align: "left"
                }, je.createElement("button", {
                    onClick: this.onPhotoRemove,
                    className: "ChatSettingsInfo__photoRemove"
                }))), je.createElement("h3", {
                    className: d
                }, c ? je.createElement(Ie.a, {
                    value: this.state.title,
                    changed: this.state.titleChanged,
                    useEnter: !0,
                    onSave: this.onSaveTitle,
                    onChange: this.onChangeTitle,
                    onCancel: this.onCancelTitle,
                    validate: this.onValidateTitle
                }) : o), je.createElement("div", {
                    className: "ChatSettingsInfo__meta"
                }, s)), a && je.createElement("div", {
                    className: "ChatSettingsInfo__description"
                }, c ? je.createElement(Ie.a, {
                    value: a,
                    onSave: this.onSaveDescription
                }) : a))
            }
        }
        n("KKXr");
        var Me = n("dLHM"),
            Le = n("XTb9"),
            Be = n("BN/X"),
            De = window.elfocus,
            Ne = we.a.getLang;
        class Ae extends je.Component {
            constructor(e) {
                super(e), this.onCopy = (() => {
                    this.input && (De(this.input, 0, this.input.value.length), document.execCommand("copy"), this.setState({
                        copied: !0
                    }))
                }), this.onBlinkTextHide = (() => {
                    this.setState({
                        copied: !1
                    })
                }), this.getInputRef = (e => {
                    e && e.element && (this.input = e.element)
                }), this.state = {
                    copied: !1
                }
            }
            componentDidMount() {
                this.input && De(this.input, 0, this.input.value.length)
            }
            render() {
                var e = this.props,
                    t = e.onReset,
                    n = e.invitationLink,
                    r = e.store,
                    i = Ne("mail_invite_link_reset_explainer").split("{reset_link}"),
                    s = !Object(a.rb)(r, r.get().peer);
                return je.createElement("div", {
                    className: "ChatSettingsInvitationLink"
                }, this.props.reseted && je.createElement("div", {
                    className: "ChatSettingsInvitationLink__reseted"
                }, Ne("mail_invite_link_reseted_explainer")), je.createElement("p", null, Ne("mail_invite_link_explainer")), je.createElement("div", {
                    className: "ChatSettingsInvitationLink__main"
                }, je.createElement(Me.a, {
                    ref: this.getInputRef,
                    readOnly: "readonly",
                    className: "ChatSettingsInvitationLink__input",
                    value: n
                }), je.createElement(Se.a, {
                    onClick: this.onCopy
                }, Ne("mail_get_invite_link_copy")), je.createElement(Le.a, {
                    className: "ChatSettingsInvitationLink__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, Ne("mail_invite_link_copied"))), s && je.createElement("p", null, i[0], je.createElement(Be.a, {
                    className: "ChatSettingsInvitationLink__reset",
                    onClick: t
                }, Ne("mail_invite_reset_link")), i[1]))
            }
        }
        var qe = n("6raB"),
            He = n("hIV1"),
            Fe = we.a.getLang;
        class Re extends je.Component {
            constructor(e) {
                super(e), this.onConfirm = (() => {
                    this.state.loading || (this.setState({
                        loading: !0
                    }), this.props.onConfirm().then(() => {
                        this.setState({
                            loading: !1
                        }), this.props.onCancel()
                    }).catch(() => this.setState({
                        loading: !1
                    })))
                }), this.state = {}
            }
            render() {
                return je.createElement("div", {
                    className: "ChatSettingsResetInvitationLink"
                }, je.createElement("div", {
                    className: "ChatSettingsResetInvitationLink__text",
                    dangerouslySetInnerHTML: {
                        __html: Fe("mail_chat_reset_link_warning")
                    }
                }), je.createElement(He.a, {
                    alignment: "right"
                }, je.createElement(Se.a, {
                    appearance: "tertiary",
                    onClick: this.props.onCancel
                }, Fe("global_cancel")), je.createElement(qe.a, {
                    onClick: this.onConfirm,
                    loading: this.state.loading
                }, Fe("mail_chat_reset_link_confirm"))))
            }
        }
        var $e = n("enZq"),
            Ue = n("p+C8");

        function ze(e) {
            return je.createElement("div", {
                className: Object(ke.a)("ChatSettingsRoundedIcon", `ChatSettingsRoundedIcon--${e.type}`)
            })
        }
        var Ke = we.a.getLang;
        class We extends je.Component {
            constructor(e) {
                super(e), this.onCopyInviteLink = (e => {
                    this.input && (this.input.focus(), this.input.select(), document.execCommand("copy"), this.setState({
                        copied: !0
                    })), e.preventDefault(), e.stopPropagation()
                }), this.onBlinkTextHide = (() => {
                    this.setState({
                        copied: !1
                    })
                }), this.getHiddenInput = (e => {
                    this.input = e
                }), this.onShowInviteLink = (() => {
                    Object(B.f)(this.props.store) && this.props.showInvitationLink()
                }), this.state = {
                    copied: !1
                }
            }
            render() {
                var e = this.props,
                    t = e.store,
                    n = e.flagsUpdated,
                    r = e.onHideStatus,
                    i = t.get(),
                    s = i.tabs[i.peer],
                    o = Object(a.rb)(i, i.peer),
                    c = s.inviteLink && Object(B.l)(t) || Object(B.f)(t),
                    l = Object(B.o)(s, i.id) && !o,
                    d = Object(ke.a)("ChatSettingsMenu", {
                        "ChatSettingsMenu--copied": this.state.copied
                    });
                return je.createElement("div", {
                    className: "ChatSettings__pane"
                }, je.createElement($e.a, {
                    className: d
                }, je.createElement(Ue.a, {
                    onClick: this.props.showAttachments,
                    chevron: !0
                }, je.createElement(ze, {
                    type: "attach"
                }), Ke("mail_im_show_media_history"))), (c || l) && je.createElement($e.a, {
                    className: d
                }, c && je.createElement(Ue.a, {
                    onClick: this.onShowInviteLink,
                    chevron: Object(B.f)(t)
                }, je.createElement(ze, {
                    type: "link"
                }), Ke(o ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link"), s.inviteLink && je.createElement("span", {
                    className: "ChatSettingsMenu__invite"
                }, je.createElement("span", {
                    className: "ChatSettingsMenu__hidden"
                }, je.createElement("input", {
                    type: "text",
                    readOnly: !0,
                    value: s.inviteLink,
                    ref: this.getHiddenInput
                })), je.createElement(Le.a, {
                    className: "ChatSettingsMenu__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, Ke("mail_invite_link_copied")), je.createElement(Be.a, {
                    className: "ChatSettingsMenu__copy",
                    onClick: this.onCopyInviteLink
                }, Ke("mail_get_invite_link_copy")))), l && je.createElement(Ue.a, {
                    onClick: this.props.showSettings,
                    chevron: !0,
                    aside: je.createElement(Le.a, {
                        shown: n,
                        callback: r
                    }, Ke("global_changes_saved"))
                }, je.createElement(ze, {
                    type: "gear"
                }), Ke("mail_settings_options"))))
            }
        }
        n("tUrg");
        var Ve = n("uW+i"),
            Ge = n("NsuH"),
            Xe = n("As6E"),
            Qe = we.a.getLang;
        class Ye extends je.Component {
            constructor() {
                super(...arguments), this.toggleAdmin = (() => {
                    var e = this.props,
                        t = e.store,
                        n = e.mid,
                        a = e.adminMap,
                        i = t.get().peer,
                        s = !a[n];
                    t.set(r.Fc.bind(null, i, n, s)), t.set(r.Ec.bind(null, i, n, s))
                }), this.kick = (() => {
                    var e = this.props.store,
                        t = e.get().peer,
                        n = this.props.mid;
                    e.set(r.bb.bind(null, t, n)), e.set(r.ab.bind(null, t, n)).catch(e => {
                        Object(p.a)("ChatSettingsMemberEdit.kick", e)
                    })
                }), this.changeAccess = (e => {
                    var t = this.props.store,
                        n = t.get().peer,
                        a = this.props.mid;
                    t.set(r.n.bind(null, n, a, !e)).catch(e => {
                        Object(p.a)("ChatSettingsMemberEdit.changeAccess", e)
                    })
                })
            }
            getMemberRole(e, t) {
                var n = this.props.storeData,
                    r = n.peer;
                return t === n.tabs[r].ownerId ? Qe("mail_settings_owner") : e[t] ? Qe("mail_settings_admin") : null
            }
            getActions(e) {
                var t = window.vk.id,
                    n = this.props,
                    r = n.store,
                    a = n.mid,
                    s = [];
                if (t === a) return [{
                    text: Qe("mail_leave_chat"),
                    onClick: this.props.onLeave
                }];
                if (Object(B.e)(r, a) && s.push({
                        text: e[a] ? Qe("mail_chat_remove_admin") : Qe("mail_settings_appoint_admin"),
                        onClick: this.toggleAdmin
                    }), Object(B.i)(r, a) && s.push({
                        text: Qe("mail_settings_kick"),
                        onClick: this.kick
                    }), Object(i.D)(a) && !e[a]) {
                    var o = Object(B.k)(r, r.get().peer, a),
                        c = o ? "mail_settings_community_mentions_only" : "mail_settings_community_full_access";
                    s.push({
                        text: Qe(c),
                        onClick: this.changeAccess.bind(this, o)
                    })
                }
                return s
            }
            render() {
                var e = window.vk.id,
                    t = this.props,
                    n = t.adminMap,
                    r = t.storeData,
                    a = t.mid,
                    i = !!n[e],
                    s = this.getMemberRole(n, a),
                    o = e === a,
                    c = i && this.getActions(n);
                return je.createElement(je.Fragment, null, s && je.createElement("span", {
                    className: "ChatSettingsMembersEdit__role"
                }, s), c && c.length > 0 && je.createElement(Xe.a, {
                    position: "b",
                    align: "right",
                    trigger: "hover",
                    marginTop: -8,
                    marginLeft: 1,
                    data: this.getActions(n)
                }, je.createElement("span", {
                    className: "ChatSettingsMembersEdit__actions"
                })), !i && !o && Object(B.i)(r, a) && je.createElement(Ee.a, {
                    text: Qe("mail_settings_kick"),
                    position: "t",
                    align: "right"
                }, je.createElement("span", {
                    onClick: this.kick,
                    className: "ChatSettingsMembersEdit__kick"
                })), !i && o && je.createElement(Ee.a, {
                    text: Qe("mail_leave_chat"),
                    position: "t",
                    align: "right"
                }, je.createElement("span", {
                    onClick: this.props.onLeave,
                    className: "ChatSettingsMembersEdit__kick"
                })))
            }
        }
        var Je = 50,
            Ze = {
                appendParentCls: "ChatSettingsWrapper"
            },
            et = window,
            tt = et.langSex,
            nt = et.langNumeric,
            rt = et.getSmDate,
            at = we.a.getLang;
        class it extends je.Component {
            constructor(e) {
                super(e), this.onToggleSearch = (() => {
                    this.state.showSearch ? this.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }) : (this.setState({
                        showSearch: !0
                    }), requestAnimationFrame(() => {
                        this.searchInput.focus()
                    }))
                }), this.onSearchChange = (e => {
                    e.target.value !== this.state.searchQuery && this.setState({
                        searchQuery: e.target.value
                    })
                }), this.onShowMore = (() => {
                    var e = "all" === this.state.current ? "allShowMore" : "adminsShowMore";
                    this.state[e] && this.setState({
                        [e]: !1
                    })
                }), this.onTabClick = ((e, t) => {
                    e.preventDefault(), this.state.current !== t && this.setState({
                        current: t
                    })
                }), this.handleDocumentClick = (e => {
                    !this.state.showSearch || this.state.searchQuery || e.target.closest(".ChatSettingsMembersWidget__search") || e.target.closest(".ChatSettingsMembersWidget__searchIcon") || this.setState({
                        showSearch: !1
                    })
                }), this.onKeydown = (e => {
                    this.state.showSearch && 27 === e.keyCode && (this.searchInput.blur(), this.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }), e.preventDefault(), e.stopPropagation())
                }), this.getInviter = (e => {
                    if (this.invitersCache[e]) return this.invitersCache[e];
                    var t = this.props.store.get(),
                        n = t.peer,
                        r = t.tabs[n],
                        i = r.inviters;
                    if (!i[e]) return "";
                    var s = Object(a.U)(t, [i[e][0]])[0],
                        o = rt(i[e][2], t.timeshift, !0);
                    if (Object(B.o)(r, e)) return this.invitersCache[e] = at("mail_settings_owner"), at("mail_settings_owner");
                    if (!s) return this.invitersCache[e] = o, o;
                    var c = tt(i[e][1], at("mail_chat_member_invited_by_X", "raw")).replace(/{inviter}/, replaceEntities(s.name)) + " " + o;
                    return this.invitersCache[e] = c, c
                }), this.isAddMemberWidgetShown = (() => {
                    var e = window.vk.id,
                        t = this.props.store,
                        n = t.get().peer,
                        r = this.state,
                        a = r.current,
                        i = r.showSearch,
                        s = r.searchQuery;
                    return "all" === a && !(i && "" !== s) && Object(B.h)(t, n, e)
                }), this.searchInputRef = (e => {
                    this.searchInput = e
                });
                var t = e.store.get(),
                    n = this.getMembers(t),
                    r = this.getAdmins(t);
                this.state = {
                    showSearch: !1,
                    searchQuery: "",
                    current: "all",
                    all: n,
                    allShowMore: n.length > Je,
                    admins: r,
                    adminsShowMore: r.length > Je
                }, this.membersMap = n.reduce((e, t) => (e[t] = !0, e), {}), this.searchIndexPromise = this.getSearchIndex(n).then(e => {
                    this.searchIndex = e
                }), this.invitersCache = {}
            }
            componentWillReceiveProps(e) {
                var t = e.store.get(),
                    n = this.getMembers(t),
                    r = this.getAdmins(t),
                    a = {
                        removes: [],
                        additions: []
                    },
                    i = n.reduce((e, t) => (e[t] = !0, e), {});
                n.forEach(e => {
                    this.membersMap[e] || a.additions.push(e)
                }), Object.keys(this.membersMap).forEach(e => {
                    i[e] || a.removes.push(e)
                }), (a.removes.length || a.additions.length) && (this.updateSearchIndex(t, a), this.membersMap = i), this.setState({
                    all: n,
                    allShowMore: this.state.allShowMore && n.length > Je,
                    admins: r,
                    adminsShowMore: this.state.adminsShowMore && r.length > Je
                })
            }
            getMembers(e) {
                var t = e.peer,
                    n = e.tabs[t],
                    r = -1 !== (n.memberIds || []).indexOf(n.ownerId),
                    a = (n.adminIds || []).reduce((e, t) => (e[t] = !0, e), {});
                return (r ? [n.ownerId] : []).concat((n.adminIds || []).filter(e => e !== n.ownerId), (n.memberIds || []).filter(e => e !== n.ownerId && !a[e]))
            }
            getAdmins(e) {
                var t = e.peer,
                    n = e.tabs[t];
                return (-1 !== (n.memberIds || []).indexOf(n.ownerId) ? [n.ownerId] : []).concat((n.adminIds || []).filter(e => e !== n.ownerId))
            }
            getCurrentList() {
                var e = this.props.store,
                    t = this.state,
                    n = t.current,
                    r = t.showSearch,
                    i = t.searchQuery;
                if (r && i && this.searchIndex) return this.searchIndex.search(i);
                var s = this.state[n],
                    o = Object(a.U)(e.get(), s);
                return this.state[`${n}ShowMore`] ? o.slice(0, Je) : o
            }
            getSearchIndex(e) {
                var t = window.vkIndexer,
                    n = Object(a.U)(this.props.store.get(), e);
                return this.membersMap = n.reduce((e, t) => (e[t.id] = !0, e), {}), new Promise((e, r) => {
                    var a = new t(n, e => e.name, () => {
                        e(a)
                    })
                })
            }
            updateSearchIndex(e, t) {
                var n = Object(a.U)(e, t.removes),
                    r = Object(a.U)(e, t.additions);
                (this.searchIndex ? Promise.resolve(this.searchIndex) : this.searchIndexPromise).then(e => {
                    n.forEach(t => {
                        e.remove(t)
                    }), r.forEach(t => {
                        e.add(t)
                    })
                })
            }
            componentDidMount() {
                this.searchInput.addEventListener("keydown", this.onKeydown)
            }
            componentWillUnmount() {
                this.searchInput.removeEventListener("keydown", this.onKeydown)
            }
            render() {
                var e = this.props,
                    t = e.store,
                    n = e.membersCount,
                    r = e.membersAdded,
                    i = e.onHideStatus,
                    s = this.state,
                    o = s.current,
                    c = s.showSearch,
                    l = s.searchQuery,
                    d = s.allShowMore,
                    u = s.adminsShowMore,
                    m = t.get(),
                    p = m.peer,
                    g = m.tabs[p],
                    h = this.getCurrentList(),
                    _ = this.isAddMemberWidgetShown() ? ["add"].concat(h) : h,
                    b = "all" === o ? d : u,
                    f = g.membersLastSeen,
                    v = {
                        "ChatSettingsMembersWidget--search": !!c
                    },
                    y = g.adminIds.reduce((e, t) => (e[t] = !0, e), {});
                return je.createElement("div", {
                    className: Object(ke.a)("ChatSettingsMembersWidget", v)
                }, je.createElement("header", {
                    className: "ChatSettingsMembersWidget__header"
                }, je.createElement("input", {
                    placeholder: at("mail_members_search"),
                    className: "ChatSettingsMembersWidget__search",
                    onChange: this.onSearchChange,
                    onInput: this.onSearchChange,
                    onPaste: this.onSearchChange,
                    value: this.state.searchQuery,
                    ref: this.searchInputRef
                }), je.createElement("button", {
                    className: "ChatSettingsMembersWidget__searchIcon",
                    onClick: this.onToggleSearch
                }), je.createElement(Ve.a, {
                    className: "ChatSettingsMembersWidget__tabs",
                    onTabClick: this.onTabClick
                }, je.createElement("span", {
                    key: "all"
                }, at("mail_settings_everyone") + " ", je.createElement("span", {
                    className: "Tabs__desc"
                }, Object(a.Q)(g))), g.adminIds.length > 0 && je.createElement("span", {
                    key: "admins"
                }, at("mail_settings_admins") + " ", je.createElement("span", {
                    className: "Tabs__desc"
                }, g.adminIds.length)))), je.createElement("div", {
                    className: "ChatSettingsMembersWidget__list"
                }, je.createElement($e.a, {
                    border: !1
                }, _.length > 0 && _.map(e => {
                    if ("add" === e) return je.createElement(Ue.a, {
                        selectable: !1,
                        border: !1,
                        key: "add",
                        onClick: this.props.showMembersSettings,
                        aside: je.createElement(Le.a, {
                            className: "ChatSettingsMembersWidget__blink",
                            shown: r,
                            callback: i
                        }, nt(n || 0, at("mail_settings_members_added", "raw")))
                    }, je.createElement("span", {
                        className: "ChatSettingsMembersWidget__add"
                    }, je.createElement("span", null, at("mail_settings_add_members"))));
                    var s = this.getInviter(e.id),
                        o = f && f[e.id] ? Object(a.W)(m, e.id, f[e.id], Ze) : "";
                    return je.createElement(Ue.a, {
                        selectable: !1,
                        border: !1,
                        aside: je.createElement(Ye, {
                            adminMap: y,
                            store: t,
                            storeData: m,
                            mid: e.id,
                            onLeave: this.props.onLeave
                        }),
                        key: e.id
                    }, je.createElement(Ge.a, {
                        photo: e.photo,
                        title: e.name,
                        description: je.createElement("span", {
                            title: s,
                            dangerouslySetInnerHTML: {
                                __html: o
                            }
                        }),
                        href: e.link
                    }))
                }), !_.length && c && l && je.createElement("div", {
                    className: "ChatSettingsMembersWidget__empty"
                }, at("mail_settings_not_found")), !(c && l) && b && je.createElement("div", {
                    className: "ChatSettingsMembersWidget__more",
                    onClick: this.onShowMore
                }, at("mail_settings_show_all_members")))))
            }
        }
        var st = n("FABD"),
            ot = n("DM26"),
            ct = we.a.getLang,
            lt = window,
            dt = lt.showFastBox,
            ut = lt.unclean,
            mt = () => {};
        class pt extends je.Component {
            constructor(e) {
                super(e), this.onChange = (e => {
                    var t = this.props.store.get(),
                        n = e.target.value;
                    Object(r.fc)(n, t).then(e => (this.setSearchResults({}, !1, n, e), n ? (this.isSearching = !0, this.serverSearch(n, e.map(e => e.peerId))) : Promise.resolve([]))).then(this.appendSearchResults).catch(() => {})
                }), this.serverSearch = Object(ot.b)((e, t) => {
                    var n = this.props.store;
                    return Object(r.cc)(e, t, "friends", n.get())
                }, 300), this.onRemoveToken = (e => new Promise(t => {
                    var n = this.state.selected.filter(t => t !== e);
                    this.selected = n.reduce((e, t) => (e[t] = !0, e), {}), this.setState({
                        selected: n
                    }, t)
                })), this.onSelect = (e => new Promise(t => {
                    var n = this.selected[e] ? this.state.selected.filter(t => t !== e) : [].concat(this.state.selected, e).filter((e, t, n) => n.indexOf(e) === t);
                    this.selected = n.reduce((e, t) => (e[t] = !0, e), {}), this.resetSearch({
                        selected: n,
                        value: ""
                    }, t)
                })), this.onAddPeople = (() => {
                    var e = this.props.store,
                        t = e.get().peer,
                        n = this.state.selected.map(e => parseInt(e));
                    this.setState({
                        loading: !0
                    }), e.set(r.i.bind(null, t, n)).then(() => e.set(r.L.bind(null, t)).then(() => {
                        this.selected = {}, this.resetSearch({
                            selected: [],
                            loading: !1
                        }, () => {
                            this.props.afterSave(n.length)
                        })
                    })).catch(e => {
                        this.selected = {}, this.resetSearch({
                            selected: [],
                            loading: !1
                        }), dt(ct("global_error"), e)
                    })
                }), this.setSearchResults = ((e, t, n, r) => {
                    var a = this.props.store.get(),
                        s = Object(i.u)(a, a.peer),
                        o = [];
                    r.forEach(e => {
                        this.data[e.peerId] || (this.data[e.peerId] = e), -1 === s.memberIds.indexOf(e.peerId) && o.push(e.peerId)
                    }), this.setState(Object.assign({}, e, {
                        found: o,
                        value: n
                    }), t || mt)
                }), this.appendSearchResults = (e => {
                    var t = this.props.store.get(),
                        n = Object(i.u)(t, t.peer),
                        r = this.state.found;
                    e.forEach(e => {
                        this.data[e.peerId] || (this.data[e.peerId] = e), -1 === n.memberIds.indexOf(e.peerId) && -1 === r.indexOf(e.peerId) && r.push(e.peerId)
                    }), this.isSearching = !1, this.setState({
                        found: r
                    })
                }), this.state = {
                    selected: [],
                    value: "",
                    loading: !1,
                    found: []
                }, this.data = {}, this.selected = {}
            }
            resetSearch(e, t) {
                return Object(r.fc)("", this.props.store.get()).then(this.setSearchResults.bind(this, e, t, ""))
            }
            componentDidMount() {
                this.resetSearch()
            }
            render() {
                var e = Object.keys(this.state.selected).length;
                return je.createElement("div", {
                    className: "ChatSettingsMembers"
                }, je.createElement(st.a, {
                    className: "ChatSettingsMembers__multiSelect",
                    tokens: this.state.selected.map(e => ({
                        text: ut(this.data[e].name),
                        id: e
                    })),
                    removeTokenPlaceholder: ct("mail_create_chat_remove_user"),
                    onRemoveToken: this.onRemoveToken,
                    placeholder: ct("mail_search_creation"),
                    value: this.state.value,
                    useInfiniteScroll: !1,
                    onChange: this.onChange,
                    onSelect: this.onSelect,
                    useInfiniteScroll: !0,
                    hasMore: !1,
                    virtualized: !0,
                    loadMore: () => {},
                    notFoundText: ct("mail_not_found"),
                    autoFocus: !0,
                    isSearching: this.isSearching
                }, this.state.found.map(e => je.createElement("div", {
                    className: Object(ke.a)("ChatSettingsMembers__entity", {
                        "ChatSettingsMembers__entity--selected": this.selected[e]
                    }),
                    key: e,
                    "data-id": e
                }, je.createElement(Ge.a, {
                    size: "34",
                    title: this.data[e].name,
                    photo: this.data[e].photo
                })))), je.createElement(He.a, {
                    alignment: "right"
                }, je.createElement(qe.a, {
                    disabled: 0 === e,
                    onClick: this.onAddPeople,
                    loading: this.state.loading
                }, ct(e < 2 ? "mail_append_chat" : "mail_im_create_chat_with"))))
            }
        }
        var gt = n("mSoV"),
            ht = Math.log2 || (e => Math.log(e) / Math.LN2),
            _t = we.a.getLang;
        class bt extends je.Component {
            constructor(e) {
                super(e), this.onChange = (e => {
                    var t = e.name,
                        n = e.selected.value,
                        r = this.state.flags;
                    this.setState({
                        flags: n ? r | 1 << t : r & ~(1 << t)
                    })
                }), this.onCancel = (() => {
                    this.setState({
                        flags: this.props.tab.data.flags
                    }), this.props.back()
                }), this.onSave = (() => {
                    this.state.loading || (this.setState({
                        loading: !0
                    }), this.props.onSave(this.state.flags).then(() => {
                        this.setState({
                            loading: !1
                        }, this.props.afterSave)
                    }).catch(e => {
                        this.setState({
                            loading: !1,
                            flags: this.props.tab.data.flags
                        })
                    }))
                }), this.state = {
                    flags: e.tab.data.flags,
                    loading: !1
                }
            }
            render() {
                var e = this.props.tab,
                    t = this.state.flags,
                    n = [{
                        value: !0,
                        label: _t("mail_settings_only_admins")
                    }, {
                        value: !1,
                        label: _t("mail_settings_all_members")
                    }],
                    r = e.serverSettings;
                return je.createElement("div", {
                    className: "ChatSettingsOptions"
                }, je.createElement($e.a, null, je.createElement(Ue.a, {
                    selectable: !1,
                    aside: je.createElement(gt.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: ht(B.c),
                        options: n,
                        value: !!(t & B.c)
                    })
                }, je.createElement(ze, {
                    type: "plus"
                }), _t("mail_settings_can_invite")), je.createElement(Ue.a, {
                    selectable: !1,
                    aside: je.createElement(gt.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: ht(B.b),
                        options: n,
                        value: !!(t & B.b)
                    })
                }, je.createElement(ze, {
                    type: "pencil"
                }), _t("mail_settings_can_edit_info")), je.createElement(Ue.a, {
                    selectable: !1,
                    aside: je.createElement(gt.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: ht(B.d),
                        options: n,
                        value: !!(t & B.d)
                    })
                }, je.createElement(ze, {
                    type: "pin"
                }), _t("mail_settings_can_pin")), je.createElement(Ue.a, {
                    selectable: !1,
                    aside: je.createElement(gt.a, {
                        className: "ChatSettingsOptions__longselect",
                        onChange: this.onChange,
                        name: ht(B.a),
                        options: [{
                            value: !1,
                            label: _t("mail_settings_only_owner")
                        }, {
                            value: !0,
                            label: _t("mail_settings_owner_and_admins")
                        }],
                        value: !!(t & B.a)
                    })
                }, je.createElement(ze, {
                    type: "user"
                }), _t("mail_settings_admins_can_add_admins")), r.map(e => je.createElement(Ue.a, {
                    selectable: !1,
                    key: e.name,
                    aside: je.createElement(gt.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: ht(e.bit),
                        options: e.options,
                        value: !!(t & e.bit)
                    })
                }, je.createElement(ze, {
                    type: e.icon
                }), e.name))), je.createElement(He.a, {
                    alignment: "right"
                }, je.createElement(Se.a, {
                    appearance: "tertiary",
                    onClick: this.onCancel
                }, _t("global_cancel")), je.createElement(qe.a, {
                    onClick: this.onSave,
                    loading: this.state.loading
                }, _t("global_save"))))
            }
        }

        function ft(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var vt = 0,
            yt = 1,
            jt = 2,
            Ot = 3,
            wt = 6,
            kt = 300,
            Ct = we.a.getLang;
        class St extends je.Component {
            constructor(e) {
                super(e), this.showInvitationLink = (() => {
                    var e = this.props.store.get(),
                        t = e.peer;
                    return this.setState({
                        invitationLoading: !0
                    }), Object(r.M)(t - 2e9, e).then(e => {
                        var t = ft(e, 1)[0];
                        this.setState({
                            section: jt,
                            invitationLoading: !1,
                            invitationLink: t
                        })
                    })
                }), this.onUpdateFlags = (e => {
                    var t = this.props.store.get(),
                        n = t.peer;
                    return Object(r.Vc)(n, e, t)
                }), this.afterUpdateFlags = (() => {
                    this.go(vt, () => this.setBlinkStatus({
                        flagsUpdated: !0
                    }))
                }), this.afterMembersAdded = (e => {
                    this.go(vt, () => this.setBlinkStatus({
                        membersAdded: !0,
                        membersCount: e
                    }))
                }), this.setBlinkStatus = (e => {
                    this.timers.push(setTimeout(() => this.setState(e), kt))
                }), this.onHideStatus = (() => {
                    this.setState({
                        membersAdded: !1,
                        flagsUpdated: !1
                    })
                }), this.onLeave = (() => {
                    var e = this.props,
                        t = e.store,
                        n = e.closePopup,
                        i = t.get().peer,
                        s = Object(a.rb)(t, i),
                        o = showFastBox({
                            title: Ct(s ? "mail_leave_channel" : "mail_chat_leave_title"),
                            dark: 1
                        }, Ct(s ? "mail_vkcomgroup_leave_confirm" : "mail_chat_leave_confirm"), Ct(s ? "mail_leave_channel" : "mail_leave_chat"), function() {
                            t.set(r.Oc.bind(null, i)), t.set(r.cb.bind(null, i)), o.hide(), n(), t.get().longpoll.push([Object(c.Hb)()])
                        }, Ct("global_cancel"), function() {
                            o.hide()
                        })
                }), this.onResetLink = (() => {
                    var e = this.props.store.get(),
                        t = e.peer;
                    return Object(r.Rb)(t, e).then(e => {
                        var t = ft(e, 1)[0];
                        this.setState({
                            invitationLink: t,
                            invitationLinkReseted: !0
                        })
                    })
                }), this.onShowAttachments = (() => {
                    var e = this.props.store.get().peer;
                    window.showWiki({
                        w: "history" + Object(a.I)(e) + "_photo"
                    }, null, {})
                }), this.state = {
                    section: vt,
                    invitationLink: null,
                    invitationLinkReseted: !1,
                    membersAdded: !1,
                    flagsUpdated: !1
                }, this.timers = []
            }
            go(e, t) {
                this.setState({
                    section: e
                }, () => {
                    this.props.updatePopup(), t && t()
                })
            }
            getPopupTitle() {
                switch (this.state.section) {
                    case yt:
                        return Ct("mail_settings_add_members");
                    case jt:
                    case Ot:
                        return Ct("mail_chat_invite_link");
                    case wt:
                        return Ct("mail_settings_options");
                    default:
                        return Ct("mail_settings_title")
                }
            }
            componentWillReceiveProps(e) {
                var t = e.store.get(),
                    n = t.peer,
                    a = t.tabs[n];
                a.photoLarge || a.photoGrid || this.resync || (this.resync = !0, e.store.set(r.L.bind(null, n)).then(() => {
                    this.resync = !0
                }))
            }
            componentDidMount() {
                this.props.updatePopup()
            }
            componentWillUnmount() {
                this.timers.forEach(clearTimeout)
            }
            render() {
                var e = this.props,
                    t = e.store,
                    n = e.closePopup,
                    r = t.get(),
                    i = r.peer,
                    s = r.tabs[i],
                    o = Object(a.rb)(t, i),
                    c = !o || !t.get().gid,
                    l = Ct(o ? "mail_im_n_vkcomgroup_members" : "mail_im_n_chat_members", Object(a.Q)(s));
                return je.createElement("section", {
                    className: "ChatSettings"
                }, je.createElement(Ce, {
                    title: this.getPopupTitle(),
                    back: this.state.section !== vt ? Ct("global_back") : void 0,
                    onCloseClick: n,
                    onBackClick: () => this.go(vt)
                }), this.state.section === vt && je.createElement("div", {
                    className: "ChatSettings__content"
                }, je.createElement(Pe, {
                    store: t,
                    photo: s.photoLarge,
                    grid: s.photoGrid,
                    title: s.name,
                    flags: s.data.flags,
                    meta: l,
                    description: ""
                }), je.createElement(We, {
                    store: t,
                    showNotificationSettings: () => {},
                    showMembersSettings: () => this.go(yt),
                    showAttachments: this.onShowAttachments,
                    showInvitationLink: this.showInvitationLink,
                    showSettings: () => this.go(wt),
                    membersAdded: this.state.membersAdded,
                    membersCount: this.state.membersCount,
                    flagsUpdated: this.state.flagsUpdated,
                    onHideStatus: this.onHideStatus
                }), o ? null : je.createElement("div", {
                    className: "ChatSettings__pane"
                }, je.createElement(it, {
                    store: t,
                    onLeave: this.onLeave,
                    showMembersSettings: () => this.go(yt),
                    membersAdded: this.state.membersAdded,
                    onHideStatus: this.onHideStatus,
                    membersCount: this.state.membersCount
                })), c && je.createElement("div", {
                    className: "ChatSettings__pane"
                }, je.createElement(Se.a, {
                    appearance: ["link", "mobile"],
                    className: "ChatSettings__leave",
                    onClick: this.onLeave
                }, Ct(o ? "mail_leave_channel" : "mail_settings_leave")))), this.state.section === yt && je.createElement(pt, {
                    store: t,
                    afterSave: this.afterMembersAdded
                }), this.state.section === wt && je.createElement(bt, {
                    tab: s,
                    back: () => this.go(vt),
                    onSave: this.onUpdateFlags,
                    afterSave: this.afterUpdateFlags
                }), this.state.section === jt && je.createElement(Ae, {
                    store: t,
                    onReset: () => this.go(Ot),
                    reseted: this.state.invitationLinkReseted,
                    invitationLink: this.state.invitationLink
                }), this.state.section === Ot && je.createElement(Re, {
                    onConfirm: this.onResetLink,
                    onCancel: () => this.go(jt)
                }))
            }
        }
        var Et, It = window,
            xt = It.MessageBox,
            Tt = It.show,
            Pt = It.hide,
            Mt = It.isVisible,
            Lt = It.boxRefreshCoords;

        function Bt(e) {
            var t = At();
            t && Oe.render(je.createElement(St, {
                store: e,
                closePopup: Dt,
                updatePopup: Nt
            }), t)
        }

        function Dt() {
            Et && Et.hide()
        }

        function Nt() {
            Et && Et.updateBoxCoords()
        }

        function At() {
            return document.querySelector("#ChatSettings")
        }

        function qt(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                r = Mt(t);
            return {
                unmount() {
                    var t = At();
                    t && Oe.unmountComponentAtNode(t), Object(o.c)(e)
                },
                showLoader() {
                    Lt(n), Tt(n), r || Tt(t)
                },
                hideLoader() {
                    Pt(n), r || Pt(t)
                }
            }
        }

        function Ht(e, t, n) {
            var a = Object(o.b)(qt).bindMutations,
                s = t.get(),
                c = Object(o.a)({
                    handlers: (e, t) => {}
                }),
                l = s.peer,
                d = a(c);
            var u = function(e, t) {
                    t.get().peer === l ? function(e) {
                        var t = Object(i.u)(e, e.get().peer);
                        t && t.data && !t.data.closed && !t.data.kicked ? Bt(e) : Dt()
                    }(t) : e.unmount()
                }.bind(null, d),
                m = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 560,
                    onShow() {
                        Bt(t), t.subscribe(u), requestAnimationFrame(() => Et.updateBoxCoords())
                    },
                    onHideAttempt: () => (t.unsubscribe(u), d.unmount(), !0)
                };
            return d.showLoader(), t.set(r.L.bind(null, l)).then(e => {
                d.hideLoader();
                var t = Object(_.q)(e).peer;
                t && t === l ? Et = new xt(m).content('<div id="ChatSettings" class="ChatSettingsWrapper"></div>').show() : d.unmount()
            }), d
        }

        function Ft() {
            return (Ft = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }
        var Rt = je.createContext(),
            $t = Rt.Provider,
            Ut = Rt.Consumer,
            zt = $t;

        function Kt(e) {
            return class extends je.Component {
                constructor() {
                    super(...arguments), this.onUpdate = (() => {
                        this.setState({})
                    })
                }
                componentDidMount() {
                    this.store.subscribe(this.onUpdate)
                }
                componentWillUnmount() {
                    this.store.unsubscribe(this.onUpdate)
                }
                render() {
                    return je.createElement(Ut, null, t => (this.store || (this.store = t), je.createElement(e, Ft({}, this.props, {
                        store: t
                    }))))
                }
            }
        }
        var Wt = n("vRp6");

        function Vt() {
            return (Vt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function Gt(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class Xt extends je.Component {
            constructor() {
                super(...arguments), this.getRef = (e => {
                    this.element = e && e.element
                })
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = Gt(e, ["className"]);
                return je.createElement(Me.a, Vt({}, n, {
                    className: Object(ke.a)(t, "BlockSearchInput"),
                    ref: this.getRef
                }))
            }
        }
        Xt.defaultProps = Me.a.defaultProps;
        var Qt = "/images/camera_c.gif";
        class Yt extends je.Component {
            constructor(e) {
                super(e), this.onError = (() => {
                    this.setState({
                        errored: !0
                    })
                }), this.state = {}
            }
            render() {
                var e = this.props,
                    t = e.photo,
                    n = e.title,
                    r = e.online;
                return je.createElement("div", {
                    className: Object(ke.a)("Avatar", {
                        "Avatar--online": r,
                        "Avatar--mobile": mobPlatforms[r]
                    })
                }, je.createElement("div", {
                    className: "Avatar__wrapper"
                }, je.createElement("img", {
                    onError: this.onError,
                    className: "Avatar__img",
                    src: this.state.errored ? Qt : t,
                    alt: n
                })))
            }
        }
        var Jt = n("ThPM"),
            Zt = n("7p7+"),
            en = n("PjZB"),
            tn = n("rjmT");

        function nn() {
            return (nn = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function rn(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var an = Object(ot.b)(r.cc, 300),
            sn = window,
            on = sn.Emoji,
            cn = sn.langNumeric,
            ln = we.a.getLang,
            dn = 38,
            un = 27,
            mn = 40,
            pn = 13;
        var gn, hn = Kt(class extends je.Component {
                constructor(e) {
                    var t;
                    super(e), t = this, this.toggleMode = (() => {
                        var e = this.props.store;
                        if (Object(i.C)(e)) {
                            var t = 0 === this.state.mode ? 1 : 0,
                                n = 0 === t ? r.ec : r.ic;
                            this.setState({
                                value: "",
                                mode: t,
                                loading: !0,
                                selected: null,
                                found: []
                            }, () => n("", e.get()).then(e => this.setSearchResults(this.filterResults(e))).then(() => this.searchInput.focus()).catch(e => console.error(e)))
                        }
                    }), this.onChange = (e => {
                        this.setState({
                            value: e.target.value,
                            loading: !0,
                            error: null
                        });
                        var t = e.target.value;
                        this.searchQuery !== t && (this.searchQuery = t, this.onSearch(t))
                    }), this.filterResults = (e => {
                        var t = Object(i.C)(this.props.store) && 1 === this.state.mode;
                        return e.filter(e => {
                            var n = e.peerId;
                            return !(t && n < 0 || t && n > 2e9 && !Object(B.m)(e, 1024) || !t && n > 2e9 && Object(B.m)(e, 1024))
                        })
                    }), this.onSearch = (e => {
                        var t = this.props.store,
                            n = t.get(),
                            a = Object(i.C)(t) && 0 === this.state.mode,
                            s = a ? r.ec : r.ic;
                        return 1 === this.state.mode && "" === e ? this.emptySearch().then(e => {
                            this.setSearchResults(this.filterResults(e))
                        }) : s(e, n).then(t => {
                            var r = t.map(e => e.peerId);
                            return t = this.filterResults(t), this.setSearchResults(t, !1, !t.length), e ? an(e, r, "all", {
                                hidegid: a
                            }, n) : Promise.resolve([])
                        }).then(t => {
                            e === this.state.value && this.setSearchResults(this.filterResults(t), !0)
                        }).catch(() => {})
                    }), this.emptySearch = (() => {
                        var e = this.props.store,
                            t = e.get(),
                            n = t.dialog_tabs.all,
                            a = {},
                            s = {};
                        return Object(r.ic)("", t).then(r => (r.forEach(e => {
                            s[e.peerId] = e
                        }), [t.peer].concat(n.filter(e => e != t.peer)).map(t => {
                            var n = Object(i.u)(e, t);
                            return a[t] = !0, {
                                name: s[t] && s[t].name || n.name,
                                photo: s[t] && s[t].photo || n.photo,
                                data: n.data,
                                peerId: t
                            }
                        }).concat(r.filter(e => !a[e.peerId]))))
                    }), this.sendRecipient = (e => {
                        var t = this.props.store,
                            n = t.get();
                        1 === this.state.mode ? (n.longpoll.push([Object(c.gb)(e, !1, !0, !0, "forward_messages_popup")]), Object(fe.e)(t), Object(i.C)(t) && Object(fe.g)(t, !1)) : this.setState({
                            selected: e,
                            error: null
                        }, () => {
                            on.focus(this.input)
                        })
                    }), this.cleanSelectedRecipient = (() => {
                        this.setState({
                            activeElement: -1
                        })
                    }), this.scrollToSelectedUser = (() => {
                        var e = this.state,
                            t = e.found,
                            n = e.activeElement,
                            r = this.scrollContainer;
                        if (r) {
                            var a = r.querySelector(`[data-id="${t[n].peerId}"]`);
                            if (a)
                                if (a.offsetTop < r.scrollTop) r.scrollTop = a.offsetTop;
                                else {
                                    var i = a.offsetTop + a.offsetHeight;
                                    i > r.scrollTop + r.offsetHeight && (r.scrollTop = i - r.offsetHeight)
                                }
                            else r.scrollTop = (r.childNodes[1].offsetHeight || 0) * n
                        }
                    }), this.selectRecipient = function(e) {
                        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                            r = t.validateActiveElement(e);
                        t.state.activeElement !== r && t.setState({
                            activeElement: r
                        }, () => {
                            n && t.scrollToSelectedUser()
                        })
                    }, this.onClick = (e => this.sendRecipient(Number(e.currentTarget.getAttribute("data-id")))), this.loadMore = (() => {}), this.setSearchResults = function(e, n) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        if (!t.unmounted)
                            if (n) {
                                var a = e.filter(e => !t.found[e.peerId]);
                                a.forEach(e => {
                                    t.found[e.peerId] = !0
                                }), t.setState({
                                    found: [].concat(t.state.found, a),
                                    loading: r
                                })
                            } else t.found = e.reduce((e, t) => (e[t.peerId] = !0, e), {}), t.setState({
                                found: e,
                                loading: r,
                                activeElement: 0
                            })
                    }, this.getFormRef = (e => {
                        this.form = e
                    }), this.getInputRef = (e => {
                        this.input = e
                    }), this.getSearchRef = (e => {
                        this.searchInput = e && e.element
                    }), this.getScrollContainerRef = (e => {
                        this.scrollContainer = Oe.findDOMNode(e)
                    }), this.getEmojiButtonRef = (e => {
                        this.emojiButton = e
                    }), this.onEmojiButtonMouseOver = (e => {
                        e.persist(), on.show(this.emojiButton, e)
                    }), this.onEmojiButtonMouseOut = (e => {
                        e.persist(), on.hide(this.emojiButton, e)
                    }), this.send = (() => {
                        var e = this.props.store,
                            t = this.state.selected,
                            n = on.val(this.input).trim(),
                            s = new tn.a({}, 0),
                            o = e.get().pendingForward;
                        if (t && !Object(a.ub)(val)) {
                            this.setState({
                                sending: !0
                            });
                            var c = Object(i.C)(e) && 0 === this.state.mode;
                            c || s.addAttach("mail", o.msgIds.join(";"), o.object || null);
                            var l = {
                                    message: n,
                                    attaches: s.dData.attaches.map(e => [e.type, e.id]) || []
                                },
                                d = {
                                    hidegid: !0,
                                    external: {
                                        original_gid: e.get().id,
                                        fwd_group_msg_ids: c ? o.msgIds.join(";") : void 0
                                    }
                                };
                            new Promise(n => {
                                Object(r.jb)([t], {
                                    hidegid: !0
                                }, e.get()).then(e => {
                                    var r = rn(e, 1)[0];
                                    return n(r[t])
                                })
                            }).then(n => e.set(r.lc.bind(null, t, l, nn({
                                hash: n
                            }, d)))).then(() => {
                                Object(fe.g)(e, !0), e.setState({
                                    pendingForward: null
                                }), this.props.closePopup(), showDoneBox(ln("mail_send3"))
                            }).catch(e => {
                                this.unmounted || this.setState({
                                    sending: !1
                                }, () => {
                                    showFastBox(ln("mail_error"), e)
                                })
                            })
                        }
                    }), this.onSearchKeyDown = (e => {
                        e.keyCode === un && this.state.value && (this.searchInput.blur(), this.searchQuery = "", this.setState({
                            value: "",
                            loading: !0,
                            error: null
                        }, this.onSearch.bind(this, "")), e.stopPropagation())
                    }), this.onMessageInputKeyDown = (e => {
                        e.keyCode === un && (this.state.sending || (on.val(this.input, ""), this.setState({
                            selected: null
                        }), this.searchInput.focus()), e.stopPropagation())
                    }), this.onKeydown = (e => {
                        var t = this.state.activeElement;
                        switch (e.which || e.keyCode) {
                            case dn:
                                this.selectRecipient(t - 1), e.preventDefault();
                                break;
                            case mn:
                                this.selectRecipient(t + 1), e.preventDefault();
                                break;
                            case pn:
                                var n = this.state,
                                    r = n.found,
                                    a = n.activeElement;
                                r[a] && (this.sendRecipient(r[a].peerId), e.preventDefault())
                        }
                    }), this.state = {
                        value: "",
                        found: [],
                        mode: 1,
                        loading: !0,
                        sending: !1,
                        selected: null,
                        activeElement: 0
                    }, this.emptySearch().then(e => {
                        this.setSearchResults(this.filterResults(e))
                    }).catch(e => console.error(e))
                }
                getMembersCount(e) {
                    if (!Object(a.ib)(e)) return "";
                    var t = this.props.store,
                        n = Object(i.u)(t, e);
                    return n && n.membersCount ? cn(n.membersCount, ln("mail_im_n_chat_members", "raw")) : ""
                }
                validateActiveElement(e) {
                    return e > this.state.found.length - 1 ? this.state.found.length - 1 : e < 0 ? 0 : e
                }
                componentDidMount() {
                    this.props.updatePopup(), on.init(this.input, {
                        noStickers: !0,
                        onSend: this.send
                    }), this.input.addEventListener("keydown", this.onMessageInputKeyDown), this.searchInput.addEventListener("keydown", this.onKeydown), this.searchInput.addEventListener("keydown", this.onSearchKeyDown)
                }
                componentWillUnmount() {
                    this.input.removeEventListener("keydown", this.onMessageInputKeyDown), this.searchInput.removeEventListener("keydown", this.onKeydown), this.searchInput.removeEventListener("keydown", this.onSearchKeyDown), this.unmounted = !0
                }
                render() {
                    var e = this.props,
                        t = e.store,
                        n = e.closePopup,
                        r = this.state,
                        a = r.mode,
                        s = r.loading,
                        o = r.selected,
                        c = r.found,
                        l = r.sending,
                        d = r.activeElement;
                    return je.createElement("section", {
                        className: Object(ke.a)("MessageForward", {
                            "MessageForward--form": 0 === a && !!o
                        })
                    }, je.createElement(Ce, {
                        title: je.createElement(je.Fragment, null, je.createElement("span", {
                            className: "MessageForward__title"
                        }, ln("mail_forward_messages")), Object(i.C)(t) && je.createElement("span", {
                            className: "MessageForward__switch",
                            onClick: this.toggleMode
                        }, ln(0 === a ? "mail_forward_to_community_messages" : "mail_forward_to_im"))),
                        onCloseClick: n
                    }), je.createElement("div", {
                        className: "MessageForward__content",
                        onMouseLeave: this.cleanSelectedRecipient
                    }, je.createElement(Xt, {
                        value: this.state.value,
                        onChange: this.onChange,
                        placeholder: ln("mail_top_search"),
                        autoFocus: !0,
                        key: "search",
                        ref: this.getSearchRef
                    }), s && je.createElement("div", {
                        className: "MessageForward__results",
                        key: "loading"
                    }, je.createElement(Zt.a, {
                        className: "MessageForward__stub"
                    }, je.createElement(en.a, null))), !s && 0 === c.length && je.createElement("div", {
                        className: "MessageForward__results",
                        key: "no-results"
                    }, je.createElement(Zt.a, null, ln("mail_im_search_empty_chats"))), !s && c.length > 0 && je.createElement(Wt.a, {
                        virtualized: !0,
                        className: "MessageForward__results",
                        loadMore: this.loadMore,
                        hasMore: !1,
                        ref: this.getScrollContainerRef,
                        key: "results"
                    }, c.map((e, n) => {
                        var r = e.peerId,
                            s = e.name,
                            c = e.photo,
                            l = e.online;
                        return je.createElement(Ue.a, {
                            key: r,
                            "data-id": r,
                            onClick: this.onClick,
                            chevron: 1 === a,
                            active: n === d,
                            canBeHovered: !1,
                            onMouseEnter: this.selectRecipient.bind(null, n, !1),
                            aside: 0 === a ? je.createElement("span", {
                                className: Object(ke.a)("MessageForward__radio", {
                                    "MessageForward__radio--selected": +o === r
                                })
                            }) : ""
                        }, je.createElement(Ge.a, {
                            size: "34",
                            title: s,
                            photo: Array.isArray(c) ? je.createElement(Jt.a, {
                                photos: c
                            }) : je.createElement(Yt, {
                                online: (Object(i.u)(t, r) || {}).online || l,
                                title: s,
                                photo: c
                            }),
                            description: this.getMembersCount(r)
                        }))
                    })), je.createElement("footer", {
                        className: "MessageForward__footer",
                        ref: this.getFormRef,
                        key: "footer"
                    }, je.createElement("div", {
                        className: "MessageForward__form _emoji_field_wrap"
                    }, je.createElement("div", {
                        className: "MessageForward__input",
                        tabIndex: "0",
                        contentEditable: !0,
                        role: "textbox",
                        "aria-multiline": !0,
                        ref: this.getInputRef,
                        placeholder: ln("mail_im_enter_msg")
                    }), je.createElement("div", {
                        className: "MessageForward__emoji emoji_smile_wrap _emoji_wrap"
                    }, je.createElement("div", {
                        ref: this.getEmojiButtonRef,
                        className: "emoji_smile _emoji_btn",
                        title: ln("global_emoji_hint"),
                        onMouseOver: this.onEmojiButtonMouseOver,
                        onMouseOut: this.onEmojiButtonMouseOut,
                        onClick: this.onEmojiButtonClick
                    }, je.createElement("div", {
                        className: "emoji_smile_icon_vector emoji_smile_icon"
                    })))), l ? je.createElement("div", {
                        className: "MessageForward__send-spinner"
                    }, je.createElement(en.a, null)) : je.createElement("button", {
                        className: "MessageForward__send",
                        onClick: this.send
                    }))))
                }
            }),
            _n = window,
            bn = _n.MessageBox,
            fn = _n.show,
            vn = _n.hide,
            yn = _n.isVisible,
            jn = _n.getLang,
            On = _n.boxRefreshCoords;

        function wn() {
            gn && gn.hide()
        }

        function kn() {
            gn && gn.updateBoxCoords()
        }

        function Cn() {
            return document.querySelector("#MessageForward")
        }

        function Sn(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                r = yn(t);
            return {
                unmount() {
                    var t = Cn();
                    t && Oe.unmountComponentAtNode(t), Object(o.c)(e)
                },
                showLoader() {
                    On(n), fn(n), r || fn(t)
                },
                hideLoader() {
                    vn(n), r || vn(t)
                }
            }
        }

        function En(e, t, n) {
            var a = (0, Object(o.b)(Sn).bindMutations)(Object(o.a)({
                    handlers: (e, t) => {}
                })),
                i = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 500,
                    onShow() {
                        ! function(e) {
                            var t = Cn();
                            t && Oe.render(je.createElement(zt, {
                                value: e
                            }, je.createElement(hn, {
                                getLang: jn,
                                closePopup: wn,
                                updatePopup: kn
                            })), t)
                        }(t), requestAnimationFrame(() => gn.updateBoxCoords())
                    },
                    onHideAttempt: () => (t.set(r.Cb.bind(null, null)), a.unmount(), !0)
                };
            return a.showLoader(), Promise.resolve().then(e => {
                a.hideLoader(), gn = new bn(i).content('<div id="MessageForward"></div>').show()
            }), a
        }

        function In(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var xn = "_im_action",
            Tn = "_im_page_peer_name",
            Pn = "_ui_menu",
            Mn = "_im_dialog_action_wrapper",
            Ln = "_im_mess_actions",
            Bn = "_im_page_action",
            Dn = "_im_chat_topic_change_input",
            Nn = "_im_chat_verified",
            An = "im-page--chat-header_chat",
            qn = "im-page--chat-header_vkcomgroup",
            Hn = "_im_page_peer_name",
            Fn = "_im_chat_members",
            Rn = "_im_chat_invite_link",
            $n = "_im_page_reconnect",
            Un = "._im_page_status",
            zn = "im-page--chat-header_reconnected",
            Kn = `<a tabindex="0" role="link" class="ui_actions_menu_item ${xn} im-action im-action_%icon%" data-action="%action%">%name%</a>`;

        function Wn(e, t, n) {
            return !e.map(e => {
                var r = Object(i.n)(t, n, e);
                return Object(s.h)(r)
            }).reduce((e, t) => e && t, !0)
        }

        function Vn(e, t) {
            var n = t.get(),
                r = n.peer,
                a = n.tabs[r].pinned;
            return 1 === e.length && a && e[0] === Object(i.S)(a).messageId
        }

        function Gn(e, t, n) {
            var r = getLang("mail_selected_shorted", t.length);
            Yn({
                actions: !0
            }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
                label: r.replace("{count}", t.length),
                tip: getLang("mail_deselect_all")
            }));
            var s = Object(i.u)(n, n.get().peer),
                o = e.querySelector("." + Ln),
                c = Wn(t, n, n.get().peer),
                l = Vn(t, n),
                d = Object(a.ib)(s.peerId) && Object(B.j)(n, s.peerId),
                u = Object(a.rb)(n, s.peerId),
                m = e.querySelector(`.${Bn}[data-action="respond"]`),
                p = Boolean(Object(i.V)(s)),
                g = Boolean(Object(i.U)(s));
            toggleClass(o, "im-page--mess-actions_important", !c), toggleClass(o, "im-page--mess-actions_pinned", l), toggleClass(o, "im-page--mess-actions_vkcomgroup", u && !n.get().gid), toggleClass(o, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(o, "im-page--mess-actions_no-pin-btn", !d), toggleClass(o, "im-page--mess-actions_out-mr", p), toggleClass(o, "im-page--mess-actions_in-mr", g), t.length > 1 ? m.innerHTML = getLang("mail_forward_here") : m.innerHTML = getLang("mail_im_mark_reply");
            var h = c ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
                _ = l ? getLang("mail_unpin") : getLang("mail_pin");
            attr(geByClass1("im-page-action_star", e), "aria-label", h), attr(geByClass1("im-page-action_pin", e), "aria-label", _)
        }

        function Xn(e, t, n) {
            var s = t.get(),
                o = s.peer,
                c = s.tabs[o],
                l = clean(stripHTML(unclean(c.tab))),
                d = geByClass1(Nn, e),
                u = geByClass1(a.r),
                m = Object(a.ib)(o),
                p = m && Object(a.rb)(t, o);
            d.tt = !1;
            var g = Object(a.Zb)(t, c, !0),
                h = getTemplate("im_simple_link", {
                    href: p ? "/club" + -c.ownerId : c.href,
                    content: getTemplate("im_peer_photo", {
                        online_class: "",
                        owner_photo: g,
                        modifier_class: "nim-peer_smaller"
                    })
                });
            val(geByClass1("im-page--aside-photo", e), h);
            var _ = m ? !c.data.closed && !c.data.kicked : 0,
                b = {
                    muted: inArray(o, s.mutedPeers),
                    verified: !!c.verified,
                    chat: m,
                    vkcomgroup: p,
                    actions: !1,
                    derelict: m && !_ && !p,
                    pinned: !1
                };
            if (m) {
                var f = Object(i.q)(t),
                    v = function(e) {
                        var t = Object(i.q)(e);
                        if (!t || Object(L.c)(e, t.userId)) return !1;
                        return t.userId
                    }(t);
                f && Object(ye.a)(t, o) && (v ? t.set(r.hb.bind(null, {
                    [o]: [v]
                })).then(Xn.bind(null, e, t, n)) : b.pinned = !0)
            }
            var y = "";
            m ? y = p ? getTemplate("im_vkcomgroup_members", {
                name: getLang("mail_im_n_vkcomgroup_members", Object(a.Q)(c))
            }) : _ ? getTemplate("im_chat_members", {
                name: getLang("mail_im_n_chat_members", Object(a.Q)(c))
            }) : "" : Object(a.Hb)(o) && (y = Object(a.X)(t, o));
            var j = getTemplate("im_simple_name", {
                name: c.tab,
                href: p ? "/club" + -c.ownerId : c.href,
                name_attr: l,
                ads_union: c.ad_union_ids_attr,
                online: y,
                more_cls: "" === y ? "im-page--title--1line" : ""
            });
            val(geByClass1("im-page--title-wrapper", e), j);
            var O = val(u) && !c.top_banner,
                w = Qn(t) && !c.top_banner,
                k = geByClass1(Tn, e);
            if (removeClass(k, a.k), show(geByClass1(Mn, e)), removeClass(geByClass1(Ln, e), "im-page--mess-actions_visible"), removeClass(geByClass1(Ln, e), "im-page--mess-actions_all-sel"), function(e, t, n) {
                    geByClass("_im_header_icon", e).forEach(e => {
                        if (n.length > 0) hide(e);
                        else if ("star" === domData(e, "type") && Object(a.pb)(t) && (toggleClass(e, "im-page--header-icon_star-active", Object(a.sb)(t)), setStyle(e, {
                                display: "inline-block"
                            })), "answer" === domData(e, "type") && Object(a.pb)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", Object(a.Fb)(t)), Object(a.Fb)(t) ? setStyle(e, {
                                display: "inline-block"
                            }) : hide(e)), "search" === domData(e, "type") && !Object(a.kb)(t)) {
                            var r = Object(a.qb)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                            setStyle(e, {
                                display: "inline-block"
                            }), toggleClass(e, "im-page-header-icon_search-shown", r)
                        }
                    })
                }(e, t, []), Object(a.jb)(t)) {
                var C = geByClass1("_im_page_back", e);
                attr(C, "href", `${Object(a.T)(t)}?tab=${s.active_tab}`)
            }
            Yn(b, "im-page--chat-header"), Object(a.H)(t, w, O, n)
        }

        function Qn(e) {
            var t = Object(i.q)(e),
                n = geByClass1(a.r);
            if (removeClass(n, "im-page--pinned_with-bar"), t && Object(s.j)(t)) {
                if (void 0 === t.kludges.attach1_tr_amount) return;
                t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
            }
            var r = Object(a.ac)(e);
            return val(n, r), !!r
        }

        function Yn(e, t) {
            var n = geByClass1(t);
            Object.keys(e).forEach(r => {
                toggleClass(n, `${t}_${r}`, !!e[r])
            })
        }

        function Jn(e, t, n, a, i) {
            e.set(r.Ob.bind(null, n, i, a)).then(t().removeMessagesRestore.bind(null, n, i, a)), Object(r.Lb)(n, i, null, a, e.get())
        }

        function Zn(e, t, n) {
            if (Object(a.ib)(t)) {
                var i = e.get().tabs[t].name,
                    s = function(e, t, n, a, i, s) {
                        if ("keydown" !== s.type || 13 === s.which) {
                            var o = trim(val(i));
                            return o ? (o !== n && e.set(r.Sc.bind(null, t, o)), !0) : (notaBene(i), !1)
                        }
                    }.bind(null, e, t, i, n),
                    o = showFastBox({
                        title: getLang("mail_chat_topic_change_title"),
                        dark: 1
                    }, getTemplate("im_chat_change_topic", {
                        value: i
                    }), getLang("global_save"), function(e, t) {
                        s(c, t) && o.hide()
                    }, getLang("global_cancel"), function() {
                        o.hide()
                    }),
                    c = geByClass1(Dn, o.bodyNode);
                elfocus(c), addEvent(c, "keydown", function(e) {
                    s(c, e) && o.hide()
                })
            }
        }

        function er(e, t, n, s, o, l) {
            var d = domData(l, "action"),
                u = geByClass1(Pn, s).parentNode,
                m = e.get().peer;
            switch (d) {
                case "clear":
                    var p = Object(i.u)(e, m),
                        g = Object(a.rc)(p, m, () => {
                            Object(a.G)(e, g, t, r.I, e.get().peer)
                        });
                    break;
                case "photos":
                case "media":
                    showWiki({
                        w: "history" + Object(a.I)(m) + "_photo"
                    }, null, {});
                    break;
                case "topic":
                    Zn(e, m, t);
                    break;
                case "avatar":
                    cur.recieveCropResult = void 0, Page.ownerPhoto(m, {
                        gid: e.get().gid
                    });
                    break;
                case "search":
                    t().showSearch(e);
                    break;
                case "block_notify":
                case "block_community":
                    e.set(r.Gc.bind(null, !1, m)).then(() => {
                        e.get().longpoll.push([Object(c.Hb)()]), showDoneBox(getLang("mail_community_was_blocked"))
                    });
                    break;
                case "allow_community":
                    e.set(r.Gc.bind(null, !0, m)).then(() => {
                        n().changeActions(e)
                    });
                    break;
                case "block":
                    Object(a.nc)(m, e).once("success", t => {
                        t.delta && (showDoneBox(t.msg), e.get().longpoll.push([Object(c.Hb)()]))
                    });
                    break;
                case "leave":
                    var h = Object(a.tc)(e, m, n => {
                        n && Object(a.G)(e, h, t, r.I, m), e.set(r.cb.bind(null, m)), e.set(r.Oc.bind(null, m)), h.hide(), e.get().longpoll.push([Object(c.Hb)()])
                    });
                    break;
                case "invite_link":
                    var _ = function(e, t, n) {
                            var a = showFastBox({
                                title: getLang("mail_chat_invite_link"),
                                dark: 1
                            }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(i) {
                                var s = gpeByClass("_im_invite_box", n.target),
                                    o = geByClass1(Rn, s),
                                    c = geByClass1("_im_invite_new", s);
                                lockButton(a.btns.ok[0]), Object(r.Rb)(t, e.get()).then(e => {
                                    var t = In(e, 1)[0];
                                    unlockButton(a.btns.ok[0]), o.value = t, unlockButton(c), addClass(s, "im-invite-box_reseted"), elfocus(o, 0, t.length), a.hide()
                                })
                            }, getLang("global_cancel"), function() {
                                a.hide()
                            })
                        }.bind(null, e, m),
                        b = !1,
                        f = !1,
                        v = !1,
                        y = () => {
                            elfocus(b, 0, b.value.length), document.execCommand("copy"), setStyle(f, {
                                opacity: 1
                            }), v && (v = clearTimeout(v)), v = setTimeout(() => setStyle(f, {
                                opacity: 0
                            }), 2e3)
                        },
                        j = !1,
                        O = !1;
                    showBox("al_im.php", {
                        act: "a_get_link",
                        gid: e.get().gid,
                        chat_id: m - 2e9,
                        markup: 1
                    }, {
                        onDone: e => {
                            b = geByClass1(Rn, e.bodyNode), j = geByClass1("_im_reset_link", e.bodyNode), O = geByClass1("_im_invite_copy", e.bodyNode), f = geByClass1("_im_invite_copied", e.bodyNode), elfocus(b, 0, b.value.length), addEvent(j, "click", _), addEvent(O, "click", y)
                        },
                        params: {
                            hideButtons: !0,
                            onHide: () => {
                                removeEvent(j, "click", _), removeEvent(O, "click", y)
                            },
                            onShow: () => {
                                addEvent(j, "click", _), addEvent(O, "click", y)
                            }
                        }
                    }, {});
                    break;
                case "return":
                    e.set(r.Zb.bind(null, m)).then(e => e.set(r.Q.bind(null, m))).then(t().updateChatTopic.bind(null, m)).catch(e => {
                        showFastBox(getLang("global_error"), e)
                    });
                    break;
                case "unmute":
                case "mute":
                    e.set(r.Lc.bind(null, m, "mute" === d)).then(t().updateState.bind(null, m));
                    break;
                case "chat":
                case "invite":
                    if (Object(a.ib)(m)) Object(a.fb)(e, m, t, r.qc);
                    else if (Object(a.Hb)(m)) {
                        var w = e.get().tabs[m],
                            k = [
                                [m, w.tab]
                            ];
                        e.set(r.qc.bind(null, "chat", [])).then(() => t().showCreation(e, k))
                    }
                    break;
                case "pin_hide":
                    Object(ye.c)(e, Object(i.p)(e), t);
                    break;
                case "pin_unhide":
                    Object(ye.d)(e, Object(i.p)(e), t);
                    break;
                case "unpin":
                    Object(ye.e)(e, Object(i.p)(e), t);
                    break;
                case "settings":
                    n().showSettings(e)
            }
            uiActionsMenu.toggle(u, !1), t().cancelEditing()
        }

        function tr(e, t, n) {
            var a = e.get().selectedMessages;
            e.set(r.t).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, a))
        }

        function nr(e, t, n, r) {
            var i, s, o = Object(a.jb)(e);
            switch (domData(r, "type")) {
                case "star":
                    s = [4, 6], i = (() => Object(a.sb)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important"));
                    break;
                case "answer":
                    s = [4, 6], i = getLang("mail_end_conversation");
                    break;
                case "search":
                    s = o ? [5, 6] : [4, -9], i = getLang("mail_search_in_peer")
            }
            showTooltip(r, {
                text: i || "",
                black: 1,
                shift: s,
                forcetoup: !0,
                appendParentCls: o ? "_im_dialog_actions" : "_im_mess_actions"
            })
        }

        function rr(e, t, n) {
            var r = Object(a.jb)(e),
                i = domData(n.target, "action");
            "respond" !== i && "forward" !== i && showTooltip(n.target, {
                text: function(e, t) {
                    var n = e.get(),
                        r = n.selectedMessages,
                        a = n.peer;
                    switch (t) {
                        case "pin":
                            return Vn(r, e) ? getLang("mail_unpin") : getLang("mail_pin");
                        case "star":
                            return Wn(r, e, a) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
                        case "delete":
                            return getLang("mail_delete");
                        case "spam":
                            return getLang("mail_im_mark_spam")
                    }
                }.bind(null, e, i) || "",
                black: 1,
                shift: [2, r ? -4 : 11],
                forcetodown: !0,
                appendParentCls: "_im_dialog_actions"
            })
        }

        function ar(e, t) {
            var n = Number(t),
                r = Object(a.O)(n, !0),
                i = getLang("mail_network_waiting").replace(/{timer}/gi, r);
            e.querySelector(Un).innerHTML = i
        }

        function ir(e, t, n, s) {
            var c = {};
            return {
                changeActions(t) {
                    var n = geByClass1(Pn, e),
                        a = geByClass1(Mn, e),
                        i = t.get().curActions,
                        s = Object.keys(i).map((e, t) => {
                            var n = "";
                            return 7 !== r.a[e] && 10 !== r.a[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(Kn, {
                                name: i[e].name,
                                icon: i[e].icon,
                                action: e
                            })
                        }).join("");
                    0 === Object.keys(i).length ? addClass(a, "im-page--header-more_loading") : (val(n, s), removeClass(a, "im-page--header-more_loading"))
                },
                setNetworkWaitingStatus(t) {
                    c.interval && clearInterval(c.interval), ar(e, t), c.timeout = t, c.interval = setInterval(() => {
                        c.timeout > 1 ? (c.timeout--, ar(e, c.timeout)) : (clearInterval(c.interval), c = {})
                    }, 1e3)
                },
                setNetworkReconnectingStatus() {
                    c.interval && clearInterval(c.interval), c = {},
                        function(e) {
                            var t = e.querySelector(Un),
                                n = getLang("mail_network_reconnecting");
                            t && (t.innerHTML = n)
                        }(e)
                },
                clearNetworkStatus() {
                    c.interval && clearInterval(c.interval), c = {}, e.querySelector(Un).innerHTML = ""
                },
                showSettings(e) {
                    var t = e.get(),
                        n = Object(i.u)(e, t.peer);
                    n.data.closed || n.data.kicked || Ht(0, e)
                },
                showForward(e) {
                    En(0, e)
                },
                renderPeer(n) {
                    Xn(e, n, t)
                },
                reRenderPinned(e) {
                    var t = Object(i.h)(e);
                    t && t.pinned && Qn(e)
                },
                renderActions(t) {
                    var n = t.get().selectedMessages || [];
                    n.length > 0 && Gn(e, n, t)
                },
                hideActions(t) {
                    if (!Object(a.qb)(t, t.get().peer)) {
                        var n = geByClass1(Mn, e);
                        addClass(n, "im-page--header-more_loading")
                    }
                },
                changedMessageSelection(n) {
                    if (0 !== n.get().peer) {
                        var r = n.get().selectedMessages || [];
                        r.length > 0 ? Gn(e, r, n) : Xn(e, n, t)
                    }
                },
                updateLastSeen(t) {
                    ! function(e, t) {
                        var n = e.get().peer,
                            r = geByClass1("_im_page_peer_online", t);
                        r && Object(a.Hb)(n) && Object(i.u)(e, n) && Object(a.y)(r, Object(a.X)(e, n))
                    }(t, e)
                },
                deselectAll(e) {
                    tr(e, t, s)
                },
                unmount() {
                    Object(o.c)(n), cancelStackFilter("fowrward")
                }
            }
        }

        function sr(e, t, n) {
            var s = Object(o.b)(ir),
                l = s.callMutations,
                d = s.bindMutations,
                u = function(e, t, n, s, o) {
                    var l = e.get().selectedMessages,
                        d = domData(o, "action"),
                        u = e.get().peer,
                        m = !0,
                        p = Object(i.u)(e, u);
                    if ("star" !== d && Object(i.V)(p)) return tr(e, t, n);
                    switch (d) {
                        case "delete":
                            var g = !(vk.id == u && !e.get().gid) && l.every(t => Object(a.B)(e, Object(i.n)(e, u, t)));
                            if (g || l.length > 1) {
                                m = !1;
                                var h = Object(a.vc)(u, l.length, g, a => {
                                    tr(e, t, n), h.hide(), cur.imDb.updateByKey("del_forall_checked", a), a ? Object(r.Lb)(l, u, null, "deleteforall", e.get()) : Jn(e, t, l, d, u)
                                })
                            } else Jn(e, t, l, d, u);
                            break;
                        case "spam":
                            Jn(e, t, l, d, u);
                            break;
                        case "forward":
                            Object(r.Eb)(l, e.get().peer, e).then(t => e.set(r.Cb.bind(null, t))).then(() => n().showForward(e)).catch(e => console.error(e));
                            break;
                        case "star":
                            var _ = Wn(l, e, u);
                            e.set(r.G.bind(null, l, _, u)), e.get().longpoll.push(l.map(e => ({
                                type: _ ? c.Y : c.U,
                                messageId: e,
                                peerId: u,
                                flags: c.l
                            })));
                            break;
                        case "respond":
                            var b = e.get(),
                                f = 1 === l.length;
                            Object(r.Eb)(l, b.peer, e).then(t => e.set(r.K.bind(null, t, b.tfdraft, f))).then(() => {
                                t().respond(e, u)
                            });
                            break;
                        case "pin":
                            var v = Object(i.m)(e, l[0]),
                                y = Vn(l, e),
                                j = y ? r.Oc.bind(null, u) : r.Ab.bind(null, v, u),
                                O = y ? r.Nc.bind(null, u) : r.zb.bind(null, v, u),
                                w = function(e, t, n) {
                                    return e().updateChatTopic(t, n), n
                                }.bind(null, t, u);
                            e.set(r.r.bind(null, e, v, u)).then(e => e.set(j)).then(w).then(e => e.set(O)).then(w)
                    }
                    m && tr(e, t, n)
                }.bind(null, t, n, l),
                m = er.bind(null, t, n, l, e),
                p = tr.bind(null, t, n, l),
                g = (e, n) => Object(a.Bc)(n, t.get().peer),
                h = nr.bind(null, t, e),
                _ = rr.bind(null, t, e),
                b = function(e, t, n, a, s) {
                    switch (domData(s, "type")) {
                        case "star":
                            e.set(r.Jc.bind(null, e.get().peer)).then(() => {
                                setTimeout(() => nr(e, 0, 0, s), 40)
                            });
                            break;
                        case "search":
                            n().showSearch(e), window.tooltips && tooltips.hide(s, {
                                fasthide: !0
                            });
                            break;
                        case "answer":
                            var o = Object(i.u)(e, e.get().peer);
                            o && (e.set(r.vb.bind(null, e.get().peer, o.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                                out: 1e3
                            }), e.get().longpoll.push([Object(c.Hb)()]))
                    }
                }.bind(null, t, e, n),
                f = () => l().showSettings(t),
                v = t => {
                    !gpeByClass(An, t.target, e) || gpeByClass(qn, t.target, e) || checkEvent(t) || (f(), cancelEvent(t))
                },
                y = () => (function(e) {
                    var t = () => {
                        e && (e.classList.remove(zn), e.removeEventListener("mouseleave", t))
                    };
                    e && (e.classList.add(zn), e.addEventListener("mouseleave", t)), window.lpConnect.abortWaiting()
                })(e),
                j = Object(o.a)({
                    handlers: (n, r) => {
                        r(e, "click", Bn, u), r(e, "click", xn, m), r(e, "click", a.k, p), r(e, "mouseover", Nn, g), r(e, "mouseover", "_im_header_icon", h), r(e, "mouseover", Bn, _), r(e, "click", "_im_header_icon", b), r(e, "click", "_im_header_link", v), r(e, "click", Hn, v), r(e, "click", Fn, f), r(e, "click", $n, y), r(e, "click", "_im_page_back", e => {
                            checkEvent(e) || (t.get().longpoll.push([Object(c.Hb)()]), cancelEvent(e))
                        })
                    }
                });
            return Object(a.Ab)(t.get().peer) || setTimeout(() => {
                t.set(r.oc).then(l().changeActions)
            }), d(e, n, j, l)
        }
        var or, cr, lr, dr, ur, mr, pr, gr, hr, _r, br, fr, vr, yr, jr = n("g6Ay"),
            Or = 600,
            wr = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest;

        function kr(e) {
            var t = e % 60;
            return parseInt(e / 60) + ":" + (t < 10 ? "0" : "") + t
        }
        var Cr = !1,
            Sr = !1,
            Er = 100;

        function Ir(e) {
            if (!Sr) {
                Sr = !0, Object(a.Kb)(mr);
                var t = {
                    peer: gr.get().peer,
                    from_place: cur.docsChooseFrom,
                    imhash: cur.docsChooseImHash,
                    blockPersonal: cur.docsChooseBlockPersonal,
                    mail_add: cur.docsChooseMailAdd
                };
                (function(e) {
                    return new Promise((t, n) => {
                        for (var r = new FormData, a = [], i = 0; i < e.wave.length; i++) a.push(parseInt(31 * e.wave[i]));
                        r.append("waveform", JSON.stringify(a)), r.append("file", e.buffer, "voice_message." + function(e) {
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
                        }(e.mimeType));
                        var s = new wr;
                        s.onload = s.onerror = function(e) {
                            var r = e.currentTarget.response;
                            200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
                        }, s.open("POST", yr.upload_url, !0), s.send(r)
                    })
                })(e).then(e => e.file ? new Promise((n, r) => {
                    ajax.post("/docs.php", extend({
                        act: "a_save_doc",
                        from: "choose",
                        from_place: t.from_place,
                        imhash: t.imhash,
                        blockPersonal: t.blockPersonal,
                        mail_add: t.mail_add
                    }, e), {
                        onDone: (e, r) => {
                            Mr(), br([
                                ["doc", e + "_" + r, "audiomsg"]
                            ], {}, t.peer), qr(), n()
                        },
                        onFail: function(e) {
                            r(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()).then(() => {
                    Object(a.Kc)(mr), Sr = !1
                }).catch(() => {
                    Sr = !1, Object(a.Kc)(mr), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
                })
            }
        }

        function xr() {
            vr(), cr.innerHTML = kr(Cr.duration), Cr.duration >= Or && Ar()
        }

        function Tr() {
            vr(), stManager.add(["voice_message_player.js", "speech.js"], function() {
                Cr || (Cr = Speech.newRecorder(), addEvent(Cr, "progress", xr)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Cr.record().then(() => {
                    ! function(e) {
                        yr.isRecording = !0, cancelStackPush("audio_message_cancel", function(e) {
                            e.set(r.l).then(Dr)
                        }.bind(null, e))
                    }(gr), hideProgress(geByClass1("im-audio-message-send-wrapper", or)), show(mr), cr.innerHTML = "0:00", addClass(or, "im-audio-message_recording"), removeClass(or, "im-audio-message_recorded"), show(or), hide(geByClass1("_im_chat_input_parent")), (_r = Speech.createVisualization("wave", Cr.source, lr)).start();
                    var e = lr.getBoundingClientRect();
                    Er = (e.right - e.left) / 3
                }).catch(e => {
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

        function Pr() {
            Cr && Cr.stop(), _r && (_r.destroy(), _r = null)
        }

        function Mr() {
            yr.isRecording = !1, cancelStackFilter("audio_message_cancel")
        }

        function Lr() {
            Br(), Ir(Cr)
        }

        function Br() {
            AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Cr, "finish", Br), removeEvent(Cr, "finish", Lr),
                function(e) {
                    var t = URL.createObjectURL(Cr.buffer);
                    domData(hr, "duration", Cr.duration), domData(hr, "ogg", t), domData(hr, "mp3", t), geByClass1("audio-msg-track--duration", hr).innerHTML = kr(Cr.duration), geByClass1("audio-msg-track--wave-wrapper", hr).innerHTML = AudioMessagePlayer.getWave(Cr.wave, Er)
                }(), removeClass(or, "im-audio-message_recording"), addClass(or, "im-audio-message_recorded")
        }

        function Dr() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            Mr(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Cr, "finish", Br), removeEvent(Cr, "finish", Lr), Pr(), qr(), e && fr()
        }

        function Nr() {
            Cr.isRecording ? (addEvent(Cr, "finish", Lr), removeEvent(Cr, "finish", Br), Pr()) : Ir(Cr)
        }

        function Ar() {
            addEvent(Cr, "finish", Br), removeEvent(Cr, "finish", Lr), Pr()
        }

        function qr() {
            removeClass(or, "im-audio-message_recorded"), removeClass(or, "im-audio-message_recording"), hide(or), show(geByClass1("_im_chat_input_parent"))
        }

        function Hr() {
            ge("audiomsg_record"), hr = ge("audiomsg_player"), or = geByClass1("im-audio-message-input"), cr = geByClass1("audio-msg-track--duration", or), lr = geByClass1("audio-msg-track--wave", or), ur = geByClass1("im-audio-message--cancel-btn", or), mr = geByClass1("_im_audio_send", or), pr = geByClass1("audio-msg-track--btn", or), geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
            var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
            addClass(e, "_voice_field_wrap"), addEvent(dr, "click", Tr), addEvent(ur, "click", Dr), addEvent(mr, "click", Nr), addEvent(pr, "click", Ar)
        }

        function Fr() {
            ! function() {
                Cr && removeEvent(Cr, "progress", xr);
                removeEvent(dr, "click", Tr), removeEvent(ur, "click", Dr), removeEvent(mr, "click", Nr), removeEvent(pr, "click", Ar)
            }(), hr = or = cr = lr = dr = ur = mr = pr = null
        }

        function Rr(e, t, n) {
            return {
                cancelRecording: Dr,
                start: function() {
                    Tr()
                },
                unmount() {
                    Dr(!1), Fr()
                }
            }
        }

        function $r(e, t, n, i, s) {
            return gr = t, yr = t.get().audio_msg, vr = function(e) {
                var t = e.get().peer;
                Object(a.qb)(e, t) && !Object(a.hb)(e) && Date.now() - (Object(a.ab)(e, t).lastTyping || 0) > 1e3 * r.b && e.set(r.mc.bind(null, t))
            }.bind(null, t), br = n, fr = s, Object(jr.a)(), Object(a.R)().then(e => {
                var n = e.length > 0;
                n ? (Hr(), i()) : setCookie("remixvoice", "0", 7), t.set(r.zc.bind(null, n))
            }).catch(e => {
                throw setCookie("remixvoice", "0", 7), e
            }), (0, Object(o.b)(Rr).bindMutations)(e, t, n)
        }
        var Ur = n("6aSF"),
            zr = n("nAFc"),
            Kr = n("/PiP"),
            Wr = n("EasH"),
            Vr = n("t7n3");

        function Gr() {
            return (Gr = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function Xr(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        var Qr = 6217559,
            Yr = "vkpay",
            Jr = "location",
            Zr = "open_app";
        class ea extends je.Component {
            constructor() {
                super(...arguments), this.onButtonClick = (() => {
                    var e = this.props,
                        t = e.action,
                        n = e.sendMessage,
                        r = e.appHash;
                    switch (t.type) {
                        case Yr:
                            t.app_id = Qr;
                        case Zr:
                            var a = t.app_id;
                            t.owner_id && (a += "_" + t.owner_id), Object(Kr.C)({
                                w: "app" + a + encodeURIComponent("#" + t.hash),
                                from_keyboard: 1,
                                app_hash: r
                            });
                            break;
                        case Jr:
                            cur.sendLocation = function(e, r) {
                                r(), n({
                                    action: {
                                        label: "",
                                        attaches: [e],
                                        payload: t.payload
                                    }
                                })
                            }, Object(Wr.b)("al_places.php", {
                                act: "a_choose_place_box",
                                from_keyboard: 1
                            }, {
                                stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js", "boxes.css"],
                                width: 640,
                                bodyStyle: "padding: 0px;",
                                dark: 1
                            });
                            break;
                        default:
                            return n(e)
                    }
                }), this.getButtonAppearance = (() => {
                    var e = this.props.action.app_id,
                        t = this.props.action.type,
                        n = this.props.color;
                    return n = (n = n.toLowerCase()).replace("default", "secondary"), t === Zr && e === Qr && (t = Yr), t === Yr && (n = "primary"), ["keyboard-button", n, t]
                }), this.getButtonLabel = (e => {
                    var t = e.label;
                    switch (e.type) {
                        case Jr:
                            t = getLang("mail_keyboard_label_location");
                            break;
                        case Yr:
                            t = (t = getLang("mail_keyboard_label_vkpay")).replace(/ VK Pay$/, "");
                            break;
                        default:
                            t = Object(zr.a)(t || ""), t = Object(Vr.c)(t).replace(/\n(\r)?/gi, " "), t = Emoji.emojiToHTML(t, !0)
                    }
                    return t
                })
            }
            render() {
                var e = this.props,
                    t = e.action,
                    n = (e.sendMessage, e.appHash, Xr(e, ["action", "sendMessage", "appHash"])),
                    r = this.getButtonAppearance(),
                    a = this.getButtonLabel(t);
                return je.createElement(Se.a, Gr({
                    wide: !0,
                    overflow: !0
                }, n, {
                    type: t.type,
                    appearance: r,
                    onClick: this.onButtonClick,
                    dangerouslySetInnerHTML: {
                        __html: a
                    }
                }))
            }
        }
        var ta = Kt(class extends je.Component {
            render() {
                var e = this.props.store,
                    t = Object(i.g)(e),
                    n = e.get().keyboard_app_hash;
                return t && t.buttons ? je.createElement("div", {
                    className: Object(ke.a)("Keyboard", {
                        "Keyboard--hidden": t.hide
                    })
                }, je.createElement(Ur.a, {
                    className: "Keyboard__scroll-wrapper"
                }, je.createElement("div", {
                    className: "Keyboard__container"
                }, t.buttons.map((e, t) => je.createElement("div", {
                    key: `row-${t}`,
                    className: "Keyboard__row"
                }, e.map((t, r) => je.createElement("div", {
                    className: "Keyboard__button",
                    key: `row-${r}`,
                    style: {
                        width: (e => `calc(100% / ${e} - 10px)`)(e.length)
                    }
                }, je.createElement(ea, Gr({
                    sendMessage: this.props.send,
                    appHash: n
                }, t))))))))) : null
            }
        });

        function na() {
            return document.getElementById("_im_keyboard_container")
        }

        function ra(e, t, n) {
            return {
                init() {
                    return new Promise(e => {
                        this.isMounted = !0,
                            function(e, t, n) {
                                var r = na();
                                if (r) {
                                    var a = je.createElement(zt, {
                                        value: e
                                    }, je.createElement(ta, {
                                        send: t
                                    }));
                                    Oe.render(a, r, n)
                                }
                            }(t, n, e)
                    })
                },
                toggle: (e, n, a) => t.set(r.Kc.bind(null, e, n, a)),
                unmount() {
                    var t = na();
                    t && this.isMounted && Oe.unmountComponentAtNode(t), this.isMounted = !1, Object(o.c)(e)
                }
            }
        }
        n("Oyvg");
        var aa = we.a.getLang;
        var ia = Kt(class extends je.Component {
            constructor() {
                super(...arguments), this.elementOnClick = ((e, t) => {
                    t.preventDefault(), t.stopPropagation(), this.props.applyTemplate(e), this.toggleDropdown(!1)
                }), this.toggleDropdown = (e => {
                    this.setState({
                        isShowDropDown: e
                    })
                }), this.state = {
                    isShowDropDown: !1
                }
            }
            render() {
                var e = this.props,
                    t = e.getTemplates,
                    n = e.showSettingsPopup,
                    r = e.showCreatingTemplatePopup,
                    a = e.isNeededRendering,
                    i = this.state.isShowDropDown;
                if (!a()) return null;
                var s = t();
                return je.createElement("div", {
                    className: "TemplatesDropDown",
                    onMouseOver: this.toggleDropdown.bind(this, !0),
                    onMouseOut: this.toggleDropdown.bind(this, !1)
                }, je.createElement("div", {
                    className: Object(ke.a)("TemplatesDropDown__wrapper", {
                        "TemplatesDropDown__wrapper--show": i
                    }),
                    "aria-hidden": i
                }, je.createElement("div", {
                    className: "TemplatesDropDown__container"
                }, je.createElement(Ur.a, {
                    className: "TemplatesDropDown__scroll-wrapper"
                }, je.createElement("div", null, " ", je.createElement("header", {
                    className: "TemplatesDropDown__header"
                }, je.createElement("h2", {
                    className: "TemplatesDropDown__title"
                }, aa("mail_community_templates")), je.createElement("a", {
                    role: "button",
                    className: "TemplatesDropDown__setting-button",
                    onClick: n
                }, aa("mail_settings_configure"))), s.length ? je.createElement("ul", {
                    className: "TemplatesDropDown__list"
                }, s.map(e => je.createElement("li", {
                    key: e.id,
                    className: "TemplatesDropDown__item",
                    onMouseDown: this.elementOnClick.bind(null, e.id)
                }, je.createElement("h3", {
                    className: "TemplatesDropDown__item-name",
                    dangerouslySetInnerHTML: {
                        __html: e.name
                    }
                }), je.createElement("div", {
                    className: "TemplatesDropDown__item-content",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                })))) : je.createElement("div", {
                    className: "TemplatesDropDown__not-found-container"
                }, je.createElement("span", null, aa("mail_community_templates_not_found")), je.createElement(Be.a, {
                    onClick: r
                }, aa("mail_add_community_template"))))))), je.createElement("button", {
                    className: "TemplatesDropDown__icon"
                }))
            }
        });

        function sa() {
            return (sa = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function oa(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }

        function ca(e, t) {
            var n = !!window.getSelection && window.getSelection(),
                r = !1;
            if (n && n.rangeCount) {
                var a = n.getRangeAt(0);
                r = a.commonAncestorContainer ? a.commonAncestorContainer : a.parentElement ? a.parentElement() : a.item(0)
            }
            for (var i = r; i && i != e;) i = i.parentNode;
            i || Emoji.editableFocus(e, !1, !0), Emoji.insertHTML(t)
        }
        class la extends je.Component {
            constructor() {
                super(...arguments), this.onChange = (() => {
                    this.props.onChange && this.props.onChange(Emoji.val(this.container))
                }), this.containerRef = je.createRef(), this.state = {
                    value: this.props.initialValue
                }
            }
            componentDidMount() {
                if (this.container = this.containerRef.current, this.container && !this.isMount) {
                    this.isMount = !0;
                    var e = this.props.initialValue;
                    Emoji.val(this.container, Emoji.emojiToHTML(e)), Emoji.init(this.container, {
                        noStickers: !0,
                        onSend: () => {},
                        ctrlSend: () => !0,
                        onChange: this.onChange,
                        noLineBreaks: !this.props.isMultiLine
                    })
                }
            }
            componentWillUnmount() {
                this.container && this.isMount && (this.isMount = !1)
            }
            render() {
                var e = this.props,
                    t = e.tabIndex,
                    n = e.isMultiLine,
                    r = (e.initialValue, oa(e, ["tabIndex", "isMultiLine", "initialValue"]));
                return je.createElement("div", sa({
                    role: "textbox",
                    ref: this.containerRef,
                    tabIndex: t,
                    contentEditable: !0,
                    "aria-multiline": n
                }, r))
            }
        }
        la.defaultProps = {
            isMultiLine: !1,
            tabIndex: 0,
            initialValue: ""
        };
        var da = la,
            ua = we.a.getLang,
            ma = () => [{
                id: "user name",
                label: ua("mail_community_templates_hint_name"),
                process: e => Object(L.c)(e, Object(i.p)(e)).first_name
            }, {
                id: "user surname",
                label: ua("mail_community_templates_hint_last_name"),
                process(e) {
                    var t = Object(L.c)(e, Object(i.p)(e));
                    return t.name.replace(t.first_name, "").trim()
                }
            }, {
                id: "admin name",
                label: ua("mail_community_templates_hint_your_name"),
                process: e => Object(L.c)(e, vk.id).first_name
            }, {
                id: "admin surname",
                label: ua("mail_community_templates_hint_your_last_name"),
                process(e) {
                    var t = Object(L.c)(e, vk.id);
                    return t.name.replace(t.first_name, "").trim()
                }
            }, {
                id: "community",
                label: ua("mail_community_templates_hint_community"),
                process: e => Object(L.c)(e, e.get().id).name
            }, {
                id: "greeting",
                label: ua("mail_community_templates_hint_greeting"),
                process(e) {
                    var t = (new Date).getHours();
                    return ua(t >= 3 && t < 12 ? "mail_greeting_good_morning" : t >= 12 && t < 17 ? "mail_greeting_good_afternoon" : t >= 17 && t <= 23 ? "mail_greeting_good_evening" : "mail_greeting_good_night")
                }
            }],
            pa = we.a.getLang,
            ga = "main",
            ha = "edit";
        class _a extends je.Component {
            constructor() {
                super(...arguments), this.setEditableMessage = (e => {
                    var t = e.id,
                        n = e.name,
                        r = e.text;
                    return new Promise(e => this.setState({
                        editableMessage: {
                            id: t,
                            name: n,
                            text: r
                        }
                    }, e))
                }), this.onChangeEditableMessage = ((e, t) => this.setEditableMessage(Object.assign({}, this.state.editableMessage, {
                    [e]: Object(zr.c)(t)
                }))), this.deleteTemplate = (e => Promise.resolve().then(() => this.state.section !== ga ? this.go(ga) : Promise.resolve()).then(() => this.props.store.set(r.A.bind(null, e))).catch(() => {
                    showFastBox(pa("mail_error"), pa("mail_community_templates_delete_error"))
                })), this.saveTemplate = (e => {
                    e.preventDefault();
                    var t = this.state.editableMessage,
                        n = t.name,
                        r = t.text;
                    n.length > 200 || n.length < 2 || n.length > 2e3 || r.length < 5 ? showFastBox(pa("mail_error"), pa("mail_form_is_filled_in_incorrectly")) : this.props.saveTemplate(t).catch(() => {
                        showFastBox(pa("mail_error"), pa("mail_community_templates_save_error"))
                    }).then(() => this.go(ga))
                }), this.addHint = ((e, t) => {
                    t.preventDefault();
                    var n = this.state.editableMessage,
                        r = n.id,
                        a = void 0 === r ? null : r,
                        i = n.name,
                        s = n.text;
                    return ca(this.textarea, `{${e.id}}`), this.setEditableMessage({
                        id: a,
                        name: i,
                        text: `${s}{${e.id}} `
                    })
                }), this.getTextAreaRef = (e => {
                    this.textarea = (e || {}).container
                }), this.state = {
                    section: this.props.section,
                    editableMessage: {
                        id: null,
                        name: "",
                        text: ""
                    }
                }
            }
            go(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = t.id,
                    r = void 0 === n ? null : n,
                    a = t.name,
                    i = void 0 === a ? "" : a,
                    s = t.text,
                    o = void 0 === s ? "" : s;
                return new Promise(t => {
                    this.state.section !== e ? this.setState({
                        section: e,
                        editableMessage: {
                            id: r,
                            name: i,
                            text: o
                        }
                    }, () => {
                        this.props.popup.updateBoxCoords(), t()
                    }) : t()
                })
            }
            render() {
                var e = this.props,
                    t = e.getTemplates,
                    n = e.closePopup,
                    r = this.state,
                    a = r.section,
                    i = r.editableMessage,
                    s = t();
                return je.createElement("section", {
                    className: "TemplatesSettings"
                }, je.createElement(Ce, {
                    title: je.createElement("span", {
                        className: "TemplatesSettings__title"
                    }, a === ga && pa("mail_community_templates"), a === ha && pa("mail_add_community_template")),
                    onCloseClick: n
                }), je.createElement("main", {
                    className: "TemplatesSettings__content"
                }, a === ga && (s.length ? je.createElement(Ur.a, {
                    className: "TemplatesSettings__scroll-wrapper"
                }, je.createElement("div", {
                    className: "TemplatesSettings__list"
                }, s.map(e => je.createElement("section", {
                    key: e.id,
                    className: "TemplatesSettings__item"
                }, je.createElement("h3", {
                    className: "TemplatesSettings__item-name",
                    dangerouslySetInnerHTML: {
                        __html: e.name
                    }
                }), je.createElement("div", {
                    className: "TemplatesSettings__item-content",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                }), je.createElement("div", {
                    className: "TemplatesSettings__buttons-row"
                }, je.createElement(Be.a, {
                    onClick: () => this.go(ha, e),
                    className: "TemplatesSettings__item-button"
                }, pa("mail_settings_edit")), je.createElement("span", {
                    className: "TemplatesSettings__buttons-splitter",
                    "aria-hidden": "true"
                }, " · "), je.createElement(Be.a, {
                    onClick: this.deleteTemplate.bind(null, e.id),
                    className: "TemplatesSettings__item-button"
                }, pa("mail_delete"))))))) : je.createElement("div", {
                    className: "TemplatesSettings__not-found-container"
                }, je.createElement("span", null, pa("mail_community_templates_not_found")), je.createElement(Be.a, {
                    onClick: () => this.go(ha)
                }, pa("mail_add_community_template")))), a === ha && je.createElement("form", {
                    className: "TemplatesSettings__form",
                    id: "create_template_form",
                    onSubmit: this.saveTemplate
                }, je.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, je.createElement("label", {
                    className: "TemplatesSettings__label",
                    htmlFor: "name"
                }, pa("mail_name"), ":"), je.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, je.createElement(da, {
                    id: "name",
                    type: "text",
                    initialValue: i.name,
                    className: "TemplatesSettings__input",
                    onChange: this.onChangeEditableMessage.bind(null, "name")
                }), je.createElement("span", {
                    className: "TemplatesSettings__notice"
                }, pa("mail_community_templates_input_size").replace("{min}", 2).replace("{max}", "200")))), je.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, je.createElement("label", {
                    className: "TemplatesSettings__label",
                    htmlFor: "text"
                }, pa("mail_text"), ":"), je.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, je.createElement(da, {
                    id: "text",
                    name: "text",
                    isMultiLine: !0,
                    ref: this.getTextAreaRef,
                    initialValue: i.text,
                    className: "TemplatesSettings__textarea",
                    onChange: this.onChangeEditableMessage.bind(null, "text")
                }), je.createElement("span", {
                    className: "TemplatesSettings__notice"
                }, pa("mail_community_templates_input_size").replace("{min}", 5).replace("{max}", "2 000")))), je.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, je.createElement("label", {
                    className: "TemplatesSettings__label"
                }, pa("mail_hints"), ":"), je.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, ma().map(e => je.createElement(Se.a, {
                    type: "button",
                    onMouseDown: this.addHint.bind(null, e),
                    appearance: "secondary",
                    className: "TemplatesSettings__hint",
                    key: e.id
                }, e.label)))))), je.createElement("footer", {
                    className: "TemplatesSettings__footer"
                }, a === ga && je.createElement(je.Fragment, null, je.createElement(Be.a, {
                    onClick: () => this.go(ha)
                }, pa("mail_add_community_template")), je.createElement(Se.a, {
                    onClick: n
                }, pa("mail_close"))), a === ha && je.createElement(je.Fragment, null, je.createElement("div", null, i.id && je.createElement(Be.a, {
                    onClick: this.deleteTemplate.bind(null, i.id)
                }, pa("mail_delete_community_template"))), je.createElement("div", null, je.createElement(Se.a, {
                    appearance: "tertiary",
                    onClick: () => this.go(ga)
                }, pa("mail_cancel")), je.createElement(Se.a, {
                    onClick: this.saveTemplate,
                    form: "create_template_form",
                    type: "submit"
                }, pa("mail_save"))))))
            }
        }
        _a.defaultProps = {
            section: ga
        };
        var ba = Kt(_a),
            fa = window.MessageBox;

        function va(e, t) {
            return ma().reduce((t, n) => t.replace(new RegExp(`({${n.id}})`, "gi"), n.process(e)), t).replace(/&lt;br&gt;/gi, "<br>")
        }

        function ya(e, t, n, a, s) {
            var o;
            return {
                closeSettingsPopup() {
                    o && o.hide()
                },
                showSettingsPopup(e) {
                    (o = new fa({
                        hideButtons: !0,
                        bodyStyle: "padding: 0; background: none;",
                        width: 500,
                        onShow: () => {
                            var n = document.getElementById("TemplatesSettings");
                            n && Oe.render(je.createElement(zt, {
                                value: t
                            }, je.createElement(ba, {
                                popup: o,
                                section: e,
                                getTemplates: () => Object(i.w)(t),
                                saveTemplate: this.saveTemplate.bind(this),
                                deleteTemplate: this.deleteTemplate.bind(this),
                                closePopup: this.closeSettingsPopup.bind(this)
                            })), n), requestAnimationFrame(() => o.updateBoxCoords())
                        }
                    }).content('<div id="TemplatesSettings"></div>')).show()
                },
                applyTemplate(e) {
                    var n = Object(i.w)(t).find(t => {
                        return t.id === e
                    });
                    Object(fe.d)(t, n.id), a(va(t, Object(zr.d)(n.text)))
                },
                getPreparedTemplates: () => Object(i.w)(t).map(e => Object.assign({}, e, {
                    name: e.name,
                    text: va(t, e.text)
                })),
                saveTemplate(e) {
                    var n = Object(zr.a)(e.name),
                        a = Object(zr.a)(e.text);
                    return t.set(e.id ? r.fd.bind(null, e.id, n, a) : r.x.bind(null, n, a))
                },
                deleteTemplate: e => t.set(r.A.bind(null, e)),
                isNeedRenderTemplates: () => !!Object(i.p)(t) && (!!Object(i.C)(t) && !(Object(i.p)(t) > 2e9 && Object(B.m)(Object(i.h)(t), 1024))),
                toggleImText() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.isNeedRenderTemplates();
                    s(e)
                },
                update() {
                    this.toggleImText()
                },
                unmount() {
                    this.toggleImText(!1)
                }
            }
        }

        function ja(e, t) {
            return t.queues[e].currEv = !1, Promise.resolve(t)
        }

        function Oa(e, t) {
            var n = t.queues[e].currEv;
            return n ? (t.queues[e].errored.push(n), ja(e, t)) : Promise.resolve(t)
        }

        function wa(e, t, n) {
            return n.queues[e] ? (n.queues[e].errored = t ? [] : n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], ja(e, n)) : Promise.resolve(n)
        }

        function ka(e, t, n, r) {
            var a = r.get().queues[e];
            if (a && !a.currEv && a.evs.length > 0 && !a.pause) {
                var i = ka.bind(null, e, t, n, r),
                    s = a.evs.shift();
                a.currEv = s, t(e, s).then(() => {
                    r.get().opts.waitCommit || r.set(ja.bind(null, e))
                }).then(i).catch(t => r.set(Oa.bind(null, e)).then(() => {
                    n(e, function(e, t) {
                        var n = Ca(e, t.get()).errored;
                        return n.length > 0 && n[n.length - 1]
                    }(e, r), t)
                }).then(i))
            }
        }

        function Ca(e, t) {
            return t.queues[e] || (t.queues[e] = {
                evs: [],
                pause: !1,
                errored: [],
                currEv: !1
            }), t.queues[e]
        }

        function Sa(e, t, n) {
            return Ca(e, n).pause = t, Promise.resolve(n)
        }

        function Ea(e) {
            Object.keys(e.get().queues).forEach(t => {
                e.set(Oa.bind(null, t)), e.set(wa.bind(null, t, !1))
            })
        }

        function Ia(e, t, n) {
            var r = h({
                queues: {},
                debug: n && n.debug,
                opts: extend({}, n)
            }, n);
            return n && n.store ? (r.setState(function(e) {
                for (var t = {}, n = Object.keys(e.queues), r = n.length, a = 0; a < r; a++) {
                    var i = n[a],
                        s = e.queues[i];
                    (s.currEv || s.evs.length || s.errored.length) && (t[i] = s)
                }
                return {
                    queues: t,
                    opts: e.opts
                }
            }(r.get())), Ea(r)) : Ea(r), {
                pushMessage: (n, a) => r.set(function(e, t, n) {
                    return t.ts = Date.now(), Ca(e, n).evs.push(t), Promise.resolve(n)
                }.bind(null, n, a)).then(r => {
                    ka(n, e, t, r)
                }),
                resend: (n, a) => r.set(function(e, t, n) {
                    var r = n.queues[e];
                    return r.errored.filter(e => e.mess.messageId === t).forEach(e => {
                        e.failed = !1, r.evs.push(e)
                    }), r.errored = r.errored.filter(e => e.mess.messageId !== t), Promise.resolve(n)
                }.bind(null, n, a)).then(i => {
                    var s = r.get().queues[n].evs.filter(e => e.mess.messageId === a)[0];
                    return ka(n, e, t, r), s
                }),
                reset: n => r.set(wa.bind(null, n, !0)).then(r => {
                    ka(n, e, t, r)
                }),
                setErrored: (e, t) => r.set(n => {
                    return Ca(e, n).errored = t, Promise.resolve(n)
                }),
                pause(e) {
                    r.set(Sa.bind(null, e, !0))
                },
                isPaused: e => !!Ca(e, r.get()).pause,
                complete(n, a) {
                    var i = r.get();
                    i.queues[n].currEv && i.queues[n].currEv.rid === a && r.set(ja.bind(null, n)).then(() => {
                        ka(n, e, t, r)
                    })
                },
                resume(n) {
                    r.set(Sa.bind(null, n, !1)).then(Object(ot.c)(.1)).then(() => {
                        ka(n, e, t, r)
                    })
                },
                inspectQueue(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (!r.get().queues[e]) return [];
                    var n = r.get().queues[e];
                    return (t && n.currEv ? [n.currEv] : []).concat(n.evs.slice()).concat(n.errored.slice().map(e => extend({}, e, {
                        failed: !0
                    }))).sort((e, t) => e.ts - t.ts)
                }
            }
        }
        var xa = n("hOuX"),
            Ta = (n("HEwt"), n("rCUf")),
            Pa = "_im_upload_dropbox",
            Ma = "jpg jpeg png gif heic heif".split(" "),
            La = ["application/vnd.rn-realmedia-vbr", "application/vnd.rn-realmedia"];

        function Ba(e) {
            var t = Ma.slice(0, Ma.length);
            if ("types" === e) {
                for (var n = t.length, r = 0; r < n; ++r) t.push(t[r].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + Ma.join(",.") : "mask" === e ? Ma.join("|") : ""
        }

        function Da(e, t, n) {
            var r = void 0 !== t.ind ? t.ind : t,
                a = t.fileName ? r + "_" + t.fileName : t;
            if (re("upload" + a + "_progress_wrap"), e().unchoose(a), !geByClass1("popup_box_container")) {
                var i = getLang("mail_add_doc_error");
                "photo" === Upload.options[r].file_name ? i = getLang("mail_add_photo_error") : "video_file" === Upload.options[r].file_name && (i = getLang("video_upload_error")), setTimeout(showFastBox({
                    title: getLang("global_error")
                }, i).hide, 2e3)
            }
            topError("Upload failed", {
                dt: -1,
                type: 102,
                url: (ge("file_uploader_form" + r) || {}).action
            }), Upload.embed(r)
        }

        function Na(e) {
            var t = void 0 !== e.ind ? e.ind : e,
                n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                r = n ? t + "_" + n : e,
                a = ge("upload" + r + "_progress_wrap");
            return a && hide(geByClass1("progress_x", a)), r
        }

        function Aa(e, t) {
            if (!e().canAddMedia()) return "none";
            if (!t.items || !t.items.length) return "media";
            var n = "^(" + Ba("mask") + ")";
            return [].slice.call(t.items).every(e => {
                var t = e.type.split("/");
                return new RegExp(n, "i").test(t[1])
            }) ? "photo" : [].slice.call(t.items).every(e => {
                return "video" === e.type.split("/")[0] || ~La.indexOf(e.type)
            }) ? "video" : "doc"
        }

        function qa(e) {
            var t = geByClass1(Pa),
                n = geByClass1("im-page--chat-header").getBoundingClientRect(),
                r = geByClass1("im-chat-input").getBoundingClientRect();
            (n.width < 10 || r.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = r.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
        }

        function Ha() {
            var e = geByClass1(Pa);
            hide(e)
        }

        function Fa(e, t, n) {
            return {
                loaded: t,
                total: n,
                fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
            }
        }

        function Ra(e, t, n, r) {
            "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e), r().reHeight(n)
        }

        function $a(e, t, n, r) {
            var a = t.get().upload_opts,
                i = geByClass1("_im_upload_photo"),
                s = geByClass1("_im_drop_photo");
            return Upload.init(i, a.url, a.params, {
                accept: Ba("accept"),
                file_name: "photo",
                file_size_limit: 26214400,
                file_types: Ba("types"),
                file_match: a.opts.ext_re,
                lang: a.opts.lang,
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
                dropbox: s,
                dragEl: bodyNode,
                onNoFilteredCallback(e) {
                    Upload.onFileApiSend(r, e)
                },
                onUploadStart(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete(e, r) {
                    var a = window.parseJSON(r);
                    a.photos ? function(e, t, n, r) {
                        var a = Na(e);
                        ajax.post("al_photos.php", extend({
                            act: "choose_uploaded"
                        }, t), {
                            onDone: function(e, t) {
                                r().choose("photo", e, extend(t, {
                                    upload_ind: a
                                }))
                            },
                            onFail: Da.bind(null, r, e)
                        })
                    }(e, a, 0, n) : Ra(e, r, t, n)
                },
                onUploadProgress(e, t, r) {
                    var a = void 0 !== e.ind ? e.ind : e;
                    n().progress("photo", a, Fa(e, t, r))
                },
                onUploadError(e, t) {
                    statlogsValueEvent("upload_photo_fails", 1, a.opts.server, t), Da(n, e)
                },
                onDragEnter(e) {
                    var t = geByClass1("im-audio-message_recording");
                    e.dataTransfer && !t && qa(Aa(n, e.dataTransfer))
                },
                onDragOut() {
                    Ha()
                },
                onDrop() {
                    Ha()
                }
            })
        }

        function Ua(e, t, n) {
            var r = t.get().upload_doc_opts,
                a = geByClass1("_im_upload_doc"),
                i = geByClass1("_im_drop_doc");
            return Upload.init(a, r.url, r.params, {
                file_name: "file",
                file_size_limit: 209715200,
                file_types: "*.*;",
                lang: r.opts.lang,
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
                dragEl: bodyNode,
                onUploadStart(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete(e, a) {
                    var i = window.parseJSON(a);
                    i.file ? function(e, t, n, r) {
                        var a = Na(e),
                            i = {
                                act: "a_save_doc",
                                blockPersonal: 1,
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
                            onFail: Da.bind(null, r, e)
                        })
                    }(e, i, r, n) : Ra(e, a, t, n)
                },
                onUploadProgress(e, t, r) {
                    var a = void 0 !== e.ind ? e.ind : e;
                    n().progress("doc", a, Fa(e, t, r))
                },
                onUploadError(e, t) {
                    statlogsValueEvent("upload_doc_fails", 1, r.opts.server, t), Da(n, e)
                }
            })
        }

        function za(e, t, n) {
            removeEvent(bodyNode, "dragover dragenter");
            var a = Ua(0, t, n),
                i = function(e, t, n, a) {
                    var i = t.get().upload_video_params;
                    if (i) {
                        var s = geByClass1("_im_upload_video"),
                            o = geByClass1("_im_drop_video");
                        return i.options.visible_dropbox = !1, Object(Ta.b)(s, o, i, null, {
                            onUploadStart: function(e, t) {
                                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                            },
                            onUploadComplete: function(e, a) {
                                var i = window.parseJSON(a);
                                i.video_id ? Object(Ta.d)(e, i, t.get().textMediaSelector, (e, n) => {
                                    var a = document.querySelector('[data-video="' + n + '"]'),
                                        i = e.editable.sizes.x[0] || e.thumb;
                                    if (a && i) {
                                        a.style.backgroundImage = `url(${i})`;
                                        var s = gpeByClass("_im_mess", a);
                                        "im" === cur.module && s && Object(r.hd)(t, s)
                                    }
                                }) : Ra(e, a, t, n)
                            },
                            onUploadProgress: function(e, t, r) {
                                var a = void 0 !== e.ind ? e.ind : e;
                                n().progress("video", a, Fa(e, t, r))
                            },
                            onUploadError: function(e, t) {
                                statlogsValueEvent("upload_video_fails", 1, i.options.server, t), Da(n, e)
                            },
                            onNoFilteredCallback: function(e) {
                                Upload.onFileApiSend(a, e)
                            },
                            onDragEnter: function(e) {
                                var t = geByClass1("im-audio-message_recording");
                                e.dataTransfer && !t && qa(Aa(n, e.dataTransfer))
                            },
                            onDragOut: function() {
                                Ha()
                            },
                            onDrop: function() {
                                Ha()
                            }
                        })
                    }
                }(0, t, n, a),
                s = $a(0, t, n, i);
            cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
            var c = Object(o.a)({
                handlers: e => {
                    var t = ge("im_full_upload");
                    e(t, "change", function r(a) {
                        if (window.Upload && a.target.files) {
                            if (n().canAddMedia()) {
                                var l = Array.from(a.target.files),
                                    d = l.filter(e => Upload.checkFileType(e.name, Ba("types"))),
                                    u = l.filter(e => Upload.checkFileType(e.name, Object(Ta.c)("types")));
                                Upload.onFileApiSend(s, d), Upload.onFileApiSend(i, u)
                            } else showFastBox(getLang("global_error"), getLang("global_error"));
                            Object(o.c)(c);
                            var m = t.cloneNode();
                            t.parentNode.replaceChild(m, t), e(t = m, "change", r)
                        }
                    })
                }
            });
            return {
                paste(e) {
                    Upload.onFileApiSend(s, e)
                },
                unmount() {
                    Object(o.c)(c), Upload.deinit(s), Upload.deinit(i), Upload.deinit(a)
                }
            }
        }
        var Ka = n("wSs/"),
            Wa = n("eTng"),
            Va = 4,
            Ga = 5,
            Xa = 6,
            Qa = 7,
            Ya = 9,
            Ja = 11,
            Za = 12,
            ei = 13,
            ti = 14,
            ni = 16,
            ri = 19,
            ai = 20,
            ii = 23,
            si = 2e3,
            oi = "_im_media_selector",
            ci = "_im_media_fwd",
            li = "_im_replied_content",
            di = "_im_fwd_close",
            ui = "_im_remove_replied",
            mi = "_im_peer_mute_unmute",
            pi = "_im_peer_return_to_chat",
            gi = "_mr_button_accept",
            hi = "_mr_button_reject",
            _i = "_im_submit_btn",
            bi = "_im_media_preview",
            fi = "_im_chat_audio_input_parent";

        function vi(e, t) {
            if (!e) return !1;
            window.tooltips && tooltips.hide(e, t)
        }

        function yi(e, t, n, r, i, s) {
            var o = !(arguments.length > 6 && void 0 !== arguments[6]) || arguments[6];
            if ($i(t, r)) return Promise.resolve(!1);
            var l = Ei(r);
            l.getBoundAttach(n.message) && (n.message = ""), n.share_url = l.getShareUrl(), n.cancelled_shares = l.getCancelledShares();
            var d = Object(xa.a)(),
                u = {
                    peerId: t,
                    messageId: "rid" + d,
                    flags: c.m,
                    date: intval(Date.now() / 1e3) - r.get().timeshift,
                    subject: "",
                    text: Object(a.hc)(clean(n.message)).replace(/\n/gi, "<br>"),
                    local: !0,
                    kludges: {
                        emoji: !0,
                        from_admin: r.get().gid ? vk.id : null
                    },
                    type: c.a,
                    attaches: function(e) {
                        return e.map(e => ({
                            id: e[1],
                            type: e[0],
                            kind: e[2] || null
                        }))
                    }(n.attaches)
                };
            return n.rid = d, n.mess = u, e(t, n), r.get().longpoll.push([u]), o && s().clearText(t, r), i().newMessage(r), Promise.resolve(!0)
        }

        function ji(e, t, n, r, a, i, s) {
            var o = arguments.length > 7 && void 0 !== arguments[7] && arguments[7];
            o || (o = e.get().peer);
            var c = Ei(e),
                l = Oi(c, s),
                d = l ? c.dData.attaches.map(e => [e.type, e.id]) : [],
                u = {
                    message: "",
                    attaches: [].concat(d, i)
                };
            s && extend(u, s), wi(e, t, !1).then(() => yi(n, o, u, e, t, r, !1).then(n => (l && Bi(e, a, t), Promise.resolve(n)))).catch(t => {
                debugLog(t), Si(e, a)
            })
        }

        function Oi(e, t) {
            var n = e.dData,
                r = t && t.sticker_referrer,
                a = r && 0 === r.indexOf("suggestion");
            return (!n.txt.trim() || a) && 0 === n.attaches.filter(e => "reply" !== e.type).length
        }

        function wi(e, t, n) {
            return e.get().tabs[e.get().peer].skipped > 0 ? (t().loadingPeer(e), e.setState({
                no_moving_down: !0
            }), e.set(r.p.bind(null, e.get().peer, !1, !1)).then(() => e.set(r.sb.bind(null, e.get().peer, !0, -1, !1))).then(() => (t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n))) : Promise.resolve(n)
        }

        function ki(e, t, n, a) {
            return !e.get().delayed_ts && setTimeout(() => {
                e.set(r.tc.bind(null, !1, !1)).then(() => {
                    n(...a)
                })
            }, t)
        }

        function Ci() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getLang("mail_send_error"),
                t = getLang("global_error");
            showFastBox({
                title: t
            }, e, getLang("mail_ok"), () => {
                nav.reload({
                    force: !0
                })
            })
        }

        function Si(e, t) {
            document.activeElement && document.activeElement.blur(), Ci();
            var n = geByClass1("_im_send", t);
            return e.set(r.Mc.bind(null, !0)).then(() => {
                Object(a.Kb)(n)
            })
        }

        function Ei(e) {
            return e.get().tfdraft || new tn.a
        }

        function Ii(e, t, n, s, o, c) {
            var l = Object(i.p)(e),
                d = Object(i.g)(e) || {},
                u = d.one_time,
                m = void 0 !== u && u,
                p = d.author_id,
                g = geByClass1("_im_send", s);
            return Promise.resolve().then(() => {
                if (Object(i.Q)(e)) {
                    if (Object(r.V)(e.get()) || !Object(a.qb)(e, e.get().peer)) {
                        var s = ki(e, si, Ii, Object(_.o)(arguments));
                        return e.set(r.tc.bind(null, !0, s)).then(() => {
                            Object(a.Kb)(g)
                        })
                    }
                    return clearTimeout(e.get().delayed_ts), e.set(r.tc.bind(null, !1, !1)).then(() => Object(a.Kc)(g)).then(wi.bind(null, e, t)).then(() => {
                        var r = c.action || {},
                            i = r.attaches || [],
                            s = Object(zr.a)(r.payload || ""),
                            d = Object(zr.a)(r.label || "");
                        Object(a.ib)(l) && (d = `@${Object(L.c)(e,p).link.slice(1)} ${d}`);
                        return Object(M.c)("message_send_from_keyboard", 0, e.get().id, l, p), yi(n, l, {
                            message: d,
                            attaches: i,
                            payload: s
                        }, e, t, o, !1)
                    }).then(() => m ? e.set(r.z.bind(null, l)) : Promise.resolve()).then(() => o().fixKeyboard())
                }
            }).catch(t => {
                debugLog(t), Si(e, s)
            })
        }

        function xi(e, t, n, s, o, l) {
            var d = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
            return Promise.resolve().then(() => {
                var u = geByClass1("_im_send", s);
                if (!Object(i.Q)(e)) return !1;
                if (Object(r.V)(e.get()) || !Object(a.qb)(e, e.get().peer)) {
                    var m = ki(e, si, xi, Object(_.o)(arguments));
                    return e.set(r.tc.bind(null, !0, m)).then(() => {
                        Object(a.Kb)(u)
                    })
                }
                clearTimeout(e.get().delayed_ts), o().saveText(e);
                var p = !1,
                    g = Ei(e),
                    h = g.dData.attaches.map(e => {
                        if ("poll" == e.type) {
                            var t = l.pollData();
                            return t || (p = !0), [e.type, e.id, t]
                        }
                        return [e.type, e.id]
                    }).concat(d);
                if (p) return !1;
                var b = e.set(r.tc.bind(null, !1, !1)).then(() => {
                        Object(a.Kc)(u)
                    }),
                    f = Object(i.p)(e);
                return b.then(wi.bind(null, e, t)).then(() => {
                    var i = g.dData.txt,
                        l = t().getEditingMessage();
                    if (l || i || h.length) {
                        if (l) return i || h.length && !g.hasOnlyReplies(l) ? Object(a.ub)(i) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void(Object(Ka.e)(e, l, g) && (Object(Ka.d)(e, l, i, h, g.getShareUrl(), g.getCancelledShares()), t().sendEditMessage(e, l), e.get().longpoll.push([Object(c.nb)(l)])))) : void
                        function(e, t, n, a) {
                            var i = e.get(),
                                s = i.peer,
                                o = showFastBox({
                                    title: getLang("mail_dialog_msg_delete_title"),
                                    dark: 1
                                }, getLang("mail_dialog_msg_delete_for_all"), getLang("mail_delete"), function(e) {
                                    Object(r.Lb)([a], s, null, "deleteforall", i), o.hide(), t().cancelEditing()
                                }, getLang("global_cancel"), function() {
                                    o.hide(), Pi(geByClass1("_im_text", n))
                                })
                        }(e, t, s, l.messageId);
                        var d = Object(a.Ec)(i, h).map(r => yi(n, f, {
                            message: r.msgText || "",
                            attaches: r.attaches || []
                        }, e, t, o));
                        return Promise.all(d)
                    }
                })
            }).catch(t => {
                debugLog(t), Si(e, s)
            })
        }

        function Ti(e, t, n, s, o, c, l) {
            var d, u = debounce(function(e, t, n) {
                var r = e.get().peer,
                    i = Emoji.val(n);
                Object(a.Ab)(r) || Ei(e).dData.txt == i || $i(r, e) || (t.checkMessageURLs(i, !0, si), Ei(e).setText(i))
            }.bind(null, e, n), 500);
            var m = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                ref: "im",
                onSend: () => Wi(e, t).then(e => e && s([])),
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: function(n, s) {
                    var o = e.get().peer,
                        c = Emoji.val(s);
                    Object(a.Ab)(o) || $i(o, e) || Ei(e).dData.txt == c || !c || function(e) {
                        var t = e.get().peer;
                        Object(a.qb)(e, t) && !Object(i.y)(e) && Date.now() - (Object(i.u)(e, t).lastTyping || 0) > 1e3 * r.b && e.set(r.nc.bind(null, t))
                    }(e), Vi(e, t, c), u(s);
                    var m = t.offsetHeight;
                    if (d && d !== m) {
                        var p = l().updateScroll();
                        l().scrollFix(e, e.get().peer, p)
                    }
                    d = m
                },
                onStickerSend: (e, t, n) => o([
                    ["sticker", e, n]
                ], {
                    sticker_referrer: t
                }),
                uploadActions: c
            });
            return Emoji.emojiLoadMore(m), e.setState({
                emojiOptId: m
            }), m
        }

        function Pi(e) {
            Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
        }

        function Mi(e, t, n, r) {
            var o = e.getFwdRaw(),
                c = t.querySelector(`.${ci}`),
                l = t.parentNode.querySelector(`.${li}`);
            if (!(Object(i.g)(r) || {}).hide && o && n.toggleKeyboard(!0), c.innerHTML = "", l.innerHTML = "", o) {
                var d = function(e, t) {
                        if (e.get().isEditing) {
                            var n = Object(a.Y)(e);
                            return n && Object(s.c)(n)
                        }
                        return "reply" === t.type
                    }(r, o),
                    u = d ? l : c,
                    m = o.object;
                u.innerHTML = d ? Li(m) : function(e, t, n, r) {
                    if (n.object && n.object.authorName) {
                        var i = Object(a.ec)(0, "", r.text, !0, Object(Wa.a)(r.kludges, 0));
                        return getTemplate("im_attach_mess", {
                            messages: i,
                            text: r.authorName,
                            date: getSmDate(r.date, e.get().timeshift),
                            modifier: "im-fwd_msg"
                        })
                    }
                    return getTemplate("im_attach_mess", {
                        messages: getLang("mail_title_X_msgs", t.getFwdCount()),
                        text: getLang("mail_im_fwd_msgs_title"),
                        date: "",
                        modifier: ""
                    })
                }(r, e, o, m)
            }
        }

        function Li(e) {
            var t = Object(a.ec)(0, "", e.text, !0, Object(Wa.a)(e.kludges, 0));
            return getTemplate("im_replied_message", {
                authorName: e.authorName,
                text: t
            })
        }

        function Bi(e, t, n) {
            e.set(r.K.bind(null, null, Ei(e), !1)).then(() => {
                var r = t.querySelector(`.${ci}`),
                    a = t.parentNode.querySelector(`.${li}`),
                    i = document.querySelector(`.${fi} .${li}`);
                a && a.children.length && (a.innerHTML = "", Di(e, n)), i && i.children.length && (i.innerHTML = "", Di(e, n)), r && r.children.length && (r.innerHTML = "", Di(e, n)), Vi(e, t)
            })
        }

        function Di(e, t) {
            var n = t().updateScroll();
            t().scrollFix(e, e.get().peer, n)
        }
        var Ni = "close",
            Ai = "open",
            qi = "hide";

        function Hi(e, t, n, r, s, o, c) {
            if (c !== Ni && c !== Ai && c !== qi) throw new Error(`Action "${c}" not found`);
            var l = e.get(),
                d = Object(i.g)(e);
            (Object(a.kb)(e) || !d || l.isEditing) && (c = qi);
            var u = c === Ni || c === qi,
                m = Promise.resolve();
            return u || n.isMounted || (m = n.init()), m.then(() => (toggleClass(t, "im-chat-input_open-keyboard", !u), toggleClass(t, "im-chat-input_close-keyboard", u && c !== qi), toggleClass(r, "im_chat-input--keyboard-button_hidden", c === qi), n.toggle(l.peer, u, o))).then(() => {
                var t = s().updateScroll();
                return s().scrollFix(e, l.peer, t)
            })
        }

        function Fi(e, t, n, r, s, c, l, d, u, m, p, g, h) {
            return {
                restoreKeyboard() {
                    this.toggleKeyboard(!!(ls.get("is_keyboards_hide") || {})[Object(i.p)(e)])
                },
                toggleKeyboard() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !Object(i.g)(e).hide,
                        n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return Hi(e, r, g, p, c, n, t ? Ni : Ai)
                },
                initKeyboard() {
                    if (!e.get().peer || !Object(i.g)(e)) return Promise.resolve();
                    var t = !!(ls.get("is_keyboards_hide") || {})[Object(i.p)(e)];
                    return Hi(e, r, g, p, c, !0, t ? Ni : Ai)
                },
                fixKeyboard() {
                    var t, n = Object(i.g)(e);
                    return t = n ? n.hide ? Ni : Ai : qi, Hi(e, r, g, p, c, !0, t)
                },
                hideKeyboard: () => Hi(e, r, g, p, c, !1, qi),
                restoreDraft(e, s) {
                    t.chosenMedias.length > 0 && (e.setState({
                        removingMedias: !0
                    }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                        removingMedias: !1
                    }));
                    var o = e.get().peer,
                        l = Object(a.Hb)(o) && o != vk.id && !e.get().gid && !Object(a.mb)(o),
                        d = Object(a.Hb)(o) && o != vk.id && !e.get().gid && !inArray(o, e.get().moneyTransferExcept) && !Object(a.mb)(o) || Object(a.lb)(o) && e.get().moneyTransferCommAvail && Object(i.h)(e).moneyTransferAvail && !e.get().gid || e.get().gid && e.get().moneyRequestAvail || Object(a.ib)(o) && Object(i.h)(e).moneyRequestAvail;
                    if (toggle(geByClass1("ms_item_gift", r), l && !Object(i.y)(e)), toggle(geByClass1("ms_item_money", r), d && !Object(i.y)(e)), toggle(geByClass1("ms_item_poll", r), Object(a.ib)(o)), Object(a.Ab)(o)) return Promise.resolve();
                    var u = Ei(e);
                    return Emoji.val(n) !== u.dData.txt ? function(e, t) {
                        Emoji.val(e, clean(t)), Pi(e)
                    }(n, u.dData.txt) : Pi(n), u.prepareObjects(e.get().gid, s && s.messageId).then(() => {
                        if (!Ki(e, o, n) && o == e.get().peer) {
                            for (var a = u.dData.attaches, i = 0; i < a.length; i++) t.chooseMedia(a[i].type, a[i].id, a[i].object || {});
                            Mi(u, r, this, e);
                            var s = c().updateScroll();
                            c().scrollFix(e, o, s), Vi(e, r, u.dData.txt)
                        }
                    })
                },
                sendMessage() {
                    s([])
                },
                choose(e, n, r) {
                    t.chooseMedia(e, n, r)
                },
                updateChosenMedia(e, n, r) {
                    t.updateChosenMedia(e, n, r)
                },
                canAddMedia: () => !t.hasRestrictingAttach() && !$i(e.get().peer, e),
                isEmpty: e => !trim(Emoji.val(n)) && !Ei(e).hasAttaches(),
                unchoose(e) {
                    t.unchooseMedia(e)
                },
                attachCount: () => t.attachCount(),
                progress(e, n, r) {
                    show(bi), t.showMediaProgress(e, n, r)
                },
                updateState(e) {
                    this.restoreKeyboard(), Ki(e, e.get().peer, n)
                },
                focusOn(e) {
                    Emoji.editableFocus(n, !1, !0)
                },
                setDraft(e, t) {
                    var n = Object(i.u)(e, e.get().peer);
                    Object(B.m)(n, 1024) && !e.get().gid || (h.update(), e.setState({
                        tfdraft: t
                    }), t && this.restoreDraft(e, c().getEditingMessage()))
                },
                clearText(e, a) {
                    Ei(a).clear(), t.cancelCheckUrl(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), Bi(a, r, c);
                    var i = c().updateScroll();
                    c().scrollFix(a, a.get().peer, i)
                },
                attachMessages(e, t) {
                    if (e.get().peer === t) {
                        Mi(Ei(e), r, this, e);
                        var n = c().updateScroll();
                        c().scrollFix(e, t, n), Vi(e, r)
                    }
                },
                cancelRecording() {
                    m.cancelRecording()
                },
                reHeight(e) {
                    var t = c().updateScroll();
                    c().scrollFix(e, e.get().peer, t)
                },
                isBlocked: () => $i(e.get().peer, e),
                toggleStickers(e, t) {
                    Emoji.toggleStickers(e.get().emojiOptId, !t)
                },
                saveText(e) {
                    Ei(e).setText(Emoji.val(geByClass1("_im_text", r)))
                },
                unmount() {
                    Object(o.c)(u), t.destroy(), d.unmount(), g.unmount(), h.unmount(), Emoji.destroy(e.get().emojiOptId), m.unmount()
                }
            }
        }

        function Ri(e, t) {
            return !!Object(a.ib)(e) && t.get().tabs[e].data.kicked
        }

        function $i(e, t) {
            return Ri(e, t) || Object(i.u)(t, e) && Object(i.u)(t, e).block_error > 0 || Object(a.tb)(t) && Object(a.xb)(e, t)
        }

        function Ui(e, t) {
            e.disabled = !0, e.contentEditable = "false", addClass(e, "im-chat-input--text_disabled"), addClass(t, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function zi(e, t) {
            e.disabled = !1, e.contentEditable = "true", removeClass(e, "im-chat-input--text_disabled"), removeClass(t, "im-chat-input_error"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Ki(e, t, n) {
            var r = gpeByClass("_im_chat_input_parent", n),
                s = geByClass1("_im_chat_input_error", r),
                o = Object(i.u)(e, t);
            if ($i(t, e)) {
                Ui(n, r);
                var c = function(e, t, n) {
                    switch (n.block_error) {
                        case Qa:
                        case Ga:
                            return getLang("mail_peer_deleted");
                        case ti:
                            return getLang("mail_community_deleted");
                        case Ja:
                            return getLang("mail_group_banned_messages");
                        case Va:
                        case Xa:
                        case Ya:
                        case ri:
                        case ai:
                        case ei:
                            return Object(a.lb)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
                        case ii:
                            var r = Object(L.c)(e, t);
                            return langSex(r.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", r.kick_name);
                        case Za:
                            return getLang("mail_cant_send_messages_to_community");
                        case ni:
                            return getLang("mail_chat_youre_kicked");
                        case 0:
                            if (Ri(t, e)) return getLang("mail_chat_youre_kicked");
                            var i = e.get().block_states[t].name;
                            return getLang("mail_community_answering").replace("{username}", i);
                        default:
                            return getLang("mail_send_privacy_error")
                    }
                }(e, t, o);
                if (Object(i.z)(e, Object(i.u)(e, t)) && addClass(geByClass1("_im_page_history"), "is_channel"), Object(a.rb)(e, t) && !e.get().gid) {
                    addClass(r, "is-f-vkcomgroup");
                    var l = inArray(t, e.get().mutedPeers);
                    c = o.data.closed || o.data.kicked ? getTemplate("sImPeerReturnToChat", {
                        text: getLang("mail_return_to_vkcomgroup")
                    }) : getTemplate("sImPeerMuteUnmute", {
                        text: l ? getLang("mail_im_unmute") : getLang("mail_im_mute"),
                        cls: l ? "im-action_unmute" : "im-action_mute"
                    })
                } else removeClass(r, "is-f-vkcomgroup");
                return val(s, c), !0
            }
            return o && Object(a.Hc)(o) ? (Ui(n, r), addClass(r, "is-message_request"), val(s, getTemplate("sImPeerAcceptOrRejectMessageRequest", {
                cls_accept: gi,
                cls_reject: hi
            })), !0) : (r.classList.contains("is-message_request") && (zi(n, r), removeClass(r, "is-message_request"), val(s, "")), n.disabled && (removeClass(r, "is-f-vkcomgroup"), removeClass(geByClass1("_im_page_history"), "is_channel"), zi(n, r), removeClass(r, "is-message_request"), val(s, "")), !1)
        }

        function Wi(e, t, n) {
            return Object(a.Ib)(e).then(r => {
                if (!r && !Object(i.y)(e)) return !0;
                var s = null != n ? n : Emoji.val(geByClass1("_im_text", t));
                if (trim(s)) return !Object(i.y)(e) || !Object(a.ub)(s);
                var o = Ei(e),
                    c = Object(a.Y)(e);
                return o.hasAttaches() && !o.hasOnlyReplies(c)
            })
        }

        function Vi(e, t, n) {
            var r = geByClass1("_im_send", t.parentNode);
            vi(r, {
                fasthide: !0
            }), Wi(e, t, n).then(t => {
                if (Object(i.y)(e)) toggleClass(r, "is_input_empty", !t), attr(r, "aria-label", getLang("mail_im_edit"));
                else {
                    toggleClass(r, "im-send-btn_audio", !t), toggleClass(r, "im-send-btn_send", t), t && removeClass(r, "im-send-btn_saudio");
                    var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                    attr(r, "aria-label", n)
                }
            })
        }

        function Gi(e, t, n, s, l) {
            cur.share_timehash = t.get().share_timehash;
            var d = Object(o.b)(Fi),
                u = d.callMutations,
                m = d.bindMutations,
                p = za(0, t, u),
                g = function(e, t, n) {
                    return e.set(r.D.bind(null, t, n, {}))
                }.bind(null, t);
            ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
            var h = Ia(g, function(e, t, n, r) {
                    e.get().longpoll.push([c.pb(t, n.mess, r)])
                }.bind(null, t), {
                    store: "ls",
                    key: "im_send_queue_" + vk.id,
                    waitCommit: !0
                }),
                b = h.pushMessage,
                f = h.inspectQueue,
                v = h.resend,
                y = h.setErrored,
                j = h.complete,
                O = ji.bind(null, t, l, b, u, e),
                w = function(e) {
                    var t = Ei(e).getFwdRaw();
                    t && window.showForwardBox({
                        act: "a_show_forward_box",
                        will_fwd: t.id,
                        gid: e.get().gid
                    })
                }.bind(null, t);
            hide(geByClass1("ms_items_more_helper", e));
            var k = t.get().mediaTypes || [
                ["photo", getLang("mail_added_photo")],
                ["video", getLang("profile_wall_video")],
                ["audio", getLang("profile_wall_audio")],
                ["doc", getLang("profile_wall_doc")],
                ["map", getLang("profile_wall_map")],
                ["gift", getLang("profile_wall_gift")]
            ];
            (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && k.push(["money", getLang("profile_wall_money")]);
            var C = new MediaSelector(geByClass1(oi, e), bi, k, {
                    from: "message",
                    maxShown: 0,
                    vectorIcon: !0,
                    ignoreMobile: !0,
                    onAddMediaChange: function(n, a, i, s) {
                        return n && u().toggleKeyboard(!0),
                            function(e, t, n, a, i, s, o, c, l) {
                                if (!t.get().removingMedias) {
                                    if ("album" === i || "page" === i || "mail" === i || "reply" === i) return !1;
                                    if ("share" === i && !o.title) return !1;
                                    show(bi), s && "string" == typeof i ? (c && Ei(t).addBindUrl(c, i, s), Ei(t).addAttach(i, s, o)) : (Ei(t).syncWithSelector(l), "number" == typeof s && l.chosenMedias[s] && function(e, t) {
                                        "string" == typeof e[0] && "string" == typeof e[1] && e[1] && t.dData.cancelled.push(`${e[0]},${e[1]}`)
                                    }(l.chosenMedias[s], Ei(t)));
                                    var d = e().updateScroll();
                                    if (e().scrollFix(t, t.get().peer, d), t.get().delayed_message && !Object(r.V)(t.get())) return n([]), !1;
                                    Vi(t, a)
                                }
                            }(l, t, S, e, n, a, i, s, C)
                    },
                    onMediaChange: function() {
                        return function(e, t, n, r, a) {
                            if (!t.get().removingMedias) {
                                var i = a.getMedias().find(e => "poll" === e[0]);
                                i && Ei(t).addAttach(i[0], i[1], a.pollData(!0, !0)), Vi(t, r)
                            }
                        }(0, t, 0, e, C)
                    },
                    editable: 1,
                    onChangedSize: function() {
                        var n = l().updateScroll();
                        l().scrollFix(t, t.get().peer, n),
                            function(e) {
                                var t = ge(bi).offsetHeight;
                                toggleClass(e, "im-chat-input--overflowed", t > 400)
                            }(e)
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
                S = xi.bind(null, t, l, b, e, u, C),
                E = function(e, t, n) {
                    var r = Emoji.val(geByClass1("_im_text", t));
                    Object(i.y)(e) && "" !== r || Wi(e, t).then(t => {
                        var a = intval(domData(n.target, "tttype"));
                        (2 === a && !0 !== t || 1 === a && !0 === t || 3 !== a && "" === r) && window.tooltips && tooltips.destroy(n.target, {
                            fasthide: !0
                        });
                        var s = Ei(e).dData.attaches.length > 0;
                        if (Object(i.y)(e) && "" === r && !s) return domData(n.target, "tttype", 3), showTooltip(n.target, {
                            text: getLang("mail_delete_for_all"),
                            black: !0,
                            force: 3 !== a,
                            appendParentCls: "_im_chat_input_parent",
                            shift: [-8, -10]
                        });
                        if (!0 !== t) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                            text: getLang("mail_added_audiomsg"),
                            black: !0,
                            force: 1 !== a,
                            appendParentCls: "_im_chat_input_parent",
                            shift: [-8, -10]
                        });
                        domData(n.target, "tttype", 2);
                        var o = e.get().ctrl_submit ? 1 : 0;
                        return showTooltip(n.target, {
                            text: getTemplate("ctrl_submit_hint", {
                                enter_on: o ? "" : "on",
                                ctrl_on: o ? "on" : ""
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
                            onCreate() {
                                radioBtns.im_submit = {
                                    els: Object(_.o)(geByClass(_i)),
                                    val: o
                                }
                            }
                        })
                    })
                }.bind(null, t, e),
                I = geByClass1("_im_send", e),
                x = ji.bind(null, t, l, b, u, e),
                T = $r(e, t, x, () => {
                    addClass(I, "im-send-btn_audio"), removeClass(I, "im-send-btn_static")
                }, () => {
                    u().restoreKeyboard()
                });
            toggle(geByClass1("ms_item_poll", e), Object(a.ib)(Object(i.p)(t))),
                function(e, t) {
                    var n = geByClass1("_im_text", e),
                        r = Object(ot.d)(stManager.add);
                    (window.Wall ? Promise.resolve() : r(["page.js"])).then(function() {
                        Wall.initComposer(n, {
                            lang: {
                                introText: getLang("profile_mention_start_typing"),
                                noResult: getLang("profile_mention_not_found")
                            },
                            toup: !0,
                            getValue: () => t.get().peer > 2e9 ? (window.Emoji && Emoji.editableVal || val)(n) : "",
                            onShow: () => {
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
                            onHide: () => {
                                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
                            },
                            searchKeys: [1, 7],
                            wddOpts: {}
                        })
                    })
                }(e, t), t.get().textMediaSelector = C, t.set(r.T.bind(null, f, v, y, j));
            var P = geByClass1("_im_text", e);
            setTimeout(() => {
                Object(i.p)(t) && u().setDraft(t, Object(i.v)(Object(i.h)(t))), Ti(t, e, C, S, O, p, l)
            }, 0);
            var M = Bi.bind(null, t, e, l),
                L = function(e, t, n) {
                    var a = Object(i.p)(e);
                    e.set(r.f.bind(null, a)).then(() => {
                        Ki(e, a, t), n()
                    }).catch(() => Ci())
                }.bind(null, t, P, () => {
                    var e = l().updateScroll();
                    l().scrollFix(t, Object(i.p)(t), e)
                }),
                B = function(e, t, n) {
                    var s = Object(i.p)(e);
                    e.set(r.Gb.bind(null, s)).then(() => {
                        var t = e.get().tabbedPeers.filter(e => e.peer !== s);
                        return e.set(r.ed.bind(null, t, !0))
                    }).then(() => {
                        Object(a.kb)(e) && t(e), n(e, s), s === e.get().peer && e.get().longpoll.push([Object(c.Hb)()])
                    }).catch(() => Ci())
                }.bind(null, t, n, s),
                D = function(e, t, n, a) {
                    var i = e.get().peer,
                        s = inArray(i, e.get().mutedPeers);
                    e.set(r.Lc.bind(null, i, !s)).then(n().updateState.bind(null, i)), cancelEvent(a)
                }.bind(null, t, e, l),
                N = function(e, t, n, a) {
                    var i = e.get().peer;
                    e.set(r.Zb.bind(null, i)).then(e => e.set(r.Q.bind(null, i))).then(n().updateChatTopic.bind(null, i)), cancelEvent(a)
                }.bind(null, t, e, l),
                A = function(e, t, n) {
                    var a = !!intval(domData(n, "val"));
                    a !== cur.ctrl_submit && (cur.ctrl_submit = a, e.set(r.q.bind(null, a)))
                }.bind(null, t);
            Ki(t, t.get().peer, P);
            var q = e.querySelector("._im_keyboard_button"),
                H = function(e, t, n, r, a) {
                    return (0, Object(o.b)(ra).bindMutations)(Object(o.a)({
                        handlers: (e, t) => {}
                    }), t, r)
                }(0, t, 0, Ii.bind(null, t, l, b, e, u)),
                F = function(e, t, n, r) {
                    var a = (0, Object(o.b)(ya).bindMutations)(Object(o.a)({
                        handlers: (e, t) => {}
                    }), e, t, n, r);
                    a.toggleImText();
                    var i = je.createElement(zt, {
                        value: e
                    }, je.createElement(ia, {
                        getTemplates: a.getPreparedTemplates,
                        applyTemplate: a.applyTemplate.bind(a),
                        isNeededRendering: a.isNeedRenderTemplates,
                        showSettingsPopup: a.showSettingsPopup.bind(a, ga),
                        showCreatingTemplatePopup: a.showSettingsPopup.bind(a, ha)
                    }));
                    return Oe.render(i, t), a
                }(t, e.querySelector("._message_templates_container"), e => ca(P, e), t => toggleClass(e, "im-chat-input--textarea_show-templates", t)),
                R = Object(o.a)({
                    handlers: (n, a) => {
                        n(I, "click", () => {
                            Promise.resolve().then(() => Wi(t, e)).then(e => {
                                if (e || Object(i.y)(t)) S([]);
                                else {
                                    var n = Ei(t);
                                    Oi(n) && function(e) {
                                        var t = document.querySelector(`.${fi} .${li}`),
                                            n = e.getFwdRaw();
                                        if (n) {
                                            var r = n.object;
                                            t && (t.innerHTML = Li(r))
                                        } else t.innerHTML = ""
                                    }(n), vi(I, {
                                        fasthide: !0
                                    }), T.start(), setTimeout(() => removeClass(I, "im-send-btn_saudio"), 300)
                                }
                            })
                        }), n(I, "mouseover", E), n(P, "focus", () => {
                            t.get().longpoll.push([c.Lb("message")]), cur.focused = t.get().peer
                        }), n(P, "blur", () => {
                            var e = 0 === t.get().peer ? "search" : "default";
                            t.get().longpoll.push([c.Lb(e)]), cur.focused = !1
                        }), n(q, "click", () => u().toggleKeyboard(void 0)), n(q, "mouseover", () => {
                            showTooltip(q, {
                                text() {
                                    var e = Object(i.g)(t);
                                    return !e || e.hide ? getLang("mail_show_keyboard") : getLang("mail_hide_keyboard")
                                },
                                black: !0,
                                shift: [4, 5]
                            })
                        }), a(e.parentNode, "click", mi, D), a(e.parentNode, "click", pi, N), a(e.parentNode, "click", ui, M), a(e.parentNode, "click", gi, L), a(e.parentNode, "click", hi, B), a(e, "click", di, M), a(e, "click", "_im_will_fwd", w), a(e, "keydown", "_im_text", e => (function(e, t, n, a) {
                            if (38 === a.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !Object(r.V)(e.get())) {
                                var s = Object(Ka.c)(e, Object(i.h)(e));
                                s && t().startEditing(Object(i.n)(e, e.get().peer, s))
                            }
                        })(t, l, u, e)), a(bodyNode, "click", _i, A)
                    }
                }),
                $ = m(t, C, P, e, S, l, f, p, R, T, q, H, F);
            return $.initKeyboard(), $
        }
        var Xi = "im_hist_search",
            Qi = "_im_search_date",
            Yi = "_im_search_date_input",
            Ji = "_im_search_history_input",
            Zi = "_im_start_inplace_search",
            es = "_im_cancel_inplace_search",
            ts = "_im_clear_date";

        function ns(e, t, n, r, a, i) {
            return {
                focus(e) {
                    uiSearch.focus(t),
                        function(e, t, n, r) {
                            cancelStackPush(Xi, is.bind(null, e, t, n, r))
                        }(e, t, n, r)
                },
                changePeer(e, n) {
                    uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
                },
                search() {
                    i({})
                },
                unmount() {
                    Object(o.c)(a), cancelStackFilter(Xi), r.then(e => e.destroy())
                }
            }
        }

        function as(e, t, n) {
            var a = e.get().peer;
            uiSearch.showProgress(n), Object(r.hc)(a, e.get()).then(r => {
                uiSearch.hideProgress(n), t().insertSearch(r, e)
            }).catch(() => {
                uiSearch.focus(n), uiSearch.hideProgress(n)
            })
        }

        function is(e, t, n, a) {
            cancelStackFilter(Xi), a.then(e => {
                e.hide()
            }), e.set(r.m.bind(null, e.get().peer)).then(() => {
                uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
            })
        }

        function ss(e, t, n) {
            var a = geByClass1(Yi, e),
                i = geByClass1(Ji, e),
                s = function(e, t, n, r) {
                    var a = '<td class="cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
                    return new Promise(e => {
                        stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                            var t = new Datepicker(n, {
                                width: 140,
                                resfmt: "plain",
                                addRows: '<tr id="im_day_clear">' + a + "</tr>",
                                addRowsM: '<tr id="im_month_clear">' + a + "</tr>",
                                onUpdate: r,
                                pastActive: !0,
                                noFuture: !0
                            });
                            e(t)
                        })
                    })
                }(0, 0, a, function(e, t, n, a) {
                    e.set(r.sc.bind(null, e.get().peer, `${a.d}.${a.m}.${a.y}`)).then(as.bind(null, e, t, n))
                }.bind(null, t, n, i)),
                c = function(e, t) {
                    e.then(e => {
                        triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
                    })
                }.bind(null, s, e),
                l = function(e, t, n, a, i, s) {
                    if ("keyup" !== s.type || 13 == s.which) {
                        var o = clean(uiSearch.getFieldEl(t).value);
                        e.set(r.rc.bind(null, o, e.get().peer)).then(i.bind(null, e, a, t))
                    }
                }.bind(null, t, i, a, n, debounce(as, 300)),
                d = is.bind(null, t, i, n, s),
                u = function(e, t, n, a) {
                    n.then(e => {
                        e.hide()
                    }), e.set(r.v.bind(null, e.get().peer)).then(as.bind(null, e, t, a))
                }.bind(null, t, n, s, i),
                m = Object(o.a)({
                    handlers: (t, n) => {
                        t(geByClass1(Qi, e), "click", c), t(uiSearch.getFieldEl(i), "keyup", l), t(geByClass1(Zi, e), "click", l), t(geByClass1(es, e), "click", d), n(e, "click", ts, u)
                    }
                });
            return ns(0, i, n, s, m, l)
        }
        var os = "_im_mess_fav",
            cs = "_im_mess_reply",
            ds = "_im_mess_forward",
            us = "_im_mess_edit";

        function ms(e, t, n, r, s) {
            var o = Object(i.p)(e),
                c = Object(i.u)(e, o),
                l = 105 + (Object(ye.a)(e, Object(i.p)(e)) || c && c.top_banner ? Object(a.Z)() : 0);
            showTooltip(t, {
                shift: [n, 10],
                black: 1,
                className: "_im_history_tooltip " + r,
                appendParentCls: "_im_mess_stack",
                toup: t.getBoundingClientRect().top > l + 37,
                text: s
            })
        }

        function ps(e, t, n, r) {
            var a = getLang("mail_im_toggle_important").length > 14;
            ms(e, r, a ? 84 : 34, a ? "im-star-tt_long" : "im-star-tt", () => {
                var t = domData(gpeByClass("_im_mess", r), "msgid"),
                    n = Object(i.n)(e, e.get().peer, t);
                return n ? Object(s.h)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
            })
        }

        function gs(e, t, n) {
            var l = ps.bind(null, t, 0),
                d = function(e, t, n) {
                    var a = gpeByClass("_im_mess", n),
                        o = intval(domData(a, "msgid")),
                        l = e.get().peer,
                        d = Object(i.n)(e, l, o),
                        u = !Object(s.h)(d);
                    return e.get().longpoll.push([{
                        peerId: l,
                        messageId: o,
                        type: u ? c.Y : c.U,
                        flags: c.l
                    }]), e.set(r.G.bind(null, [o], u, l)), ps(e, 0, 0, n), !1
                }.bind(null, t),
                u = function(e, t, n, r) {
                    ms(e, r, 18, "im-reply-tt", getLang("mail_im_mark_forward"))
                }.bind(null, t, 0),
                m = function(e, t, n, a) {
                    var i = e.get().peer,
                        s = +domData(domClosest("im-mess", a.target), "msgid");
                    return Object(fe.f)(), Object(r.Eb)([s], i, e).then(t => e.set(r.Cb.bind(null, t))).then(() => {
                        En(0, e)
                    }), !1
                }.bind(null, t, e.querySelector("_im_dialog_actions"), n),
                p = function(e, t, n, r) {
                    ms(e, r, 18, "im-reply-tt", getLang("mail_im_reply"))
                }.bind(null, t, 0),
                g = function(e, t, n) {
                    var a = e.get().peer,
                        i = +domData(domClosest("im-mess", n.target), "msgid");
                    return Object(r.Eb)([i], a, e).then(t => e.set(r.K.bind(null, t, e.get().tfdraft, !0))).then(() => t().respond(e, a)), !1
                }.bind(null, t, n),
                h = function(e, t, n) {
                    ms(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
                }.bind(null, t),
                _ = function(e, t, n, r) {
                    var a = intval(domData(gpeByClass("_im_mess", r), "msgid")),
                        s = Object(i.n)(e, e.get().peer, a);
                    return s && t().startEditing(s), !1
                }.bind(null, t, n),
                b = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "click", os, d), n(e, "mouseover", os, l), n(e, "click", ds, m), n(e, "mouseover", ds, u), n(e, "click", cs, g), n(e, "mouseover", cs, p), n(e, "click", us, _), n(e, "mouseover", us, h)
                    }
                });
            return function(e, t) {
                return {
                    markImportant(t, n, r) {
                        Object(a.Nc)(t, n, e)
                    },
                    unmount() {
                        Object(o.c)(t)
                    }
                }
            }(e, b)
        }
        var hs = "_im_retry_media",
            _s = "_im_replied_message";

        function bs(e, t, n, s, o) {
            if (!Object(r.Y)(e.get().peer, e.get()) && !(hasClass(o, a.l) || hasClass(o, a.t) || hasClass(o, "_im_mess_srv") || Object(a.F)(s, o) || Object(i.y)(e) || "A" === s.target.tagName || domClosest(_s, s.target) || s.target.classList.contains(hs))) {
                var c, l, d = intval(domData(o, "msgid")),
                    u = e.get().peer;
                if (!Object(a.gb)(e, u, d)) c = s.shiftKey ? Object(i.o)(e, u, d) : [d], e.set(r.j.bind(null, c)).then(() => {
                    var r = Object(i.t)(e),
                        a = !1;
                    c.forEach(e => {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var i = inArray(e, r);
                            a |= i, toggleClass(t, "im-mess_selected", i);
                            var s = i ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                o = geByClass1("_im_mess_blind_label_select", t);
                            attr(o, "aria-label", s)
                        }
                    }), a && (window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()), t().changedMessageSelection(e)
                }).then(() => {
                    1 !== e.get().selectedMessages.length || l ? l && l.hide() : l = function(e) {
                        var t = e.get();
                        if (t.pinnedMessagesPromo && Object(a.ib)(t.peer)) {
                            var n = geByClass1("_mess-action-promo"),
                                i = new ElementTooltip(n, {
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
                                        }), Object(r.R)()
                                    }
                                });
                            return i.show(), i
                        }
                    }(e)
                })
            }
        }

        function fs(e, t, n) {
            var r = bs.bind(null, t, n, e),
                a = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "click", "_im_mess", r)
                    }
                });
            return function(e, t) {
                return {
                    cleanSelection(t) {
                        t && Array.isArray(t) && t.length && t.map(t => geByClass1("_im_mess_" + t, e)).filter(e => e).forEach(e => removeClass(e, "im-mess_selected"))
                    },
                    unmount() {
                        Object(o.c)(t)
                    }
                }
            }(e, a)
        }
        var vs = {
            onNewMessagesChunk: function(e) {
                var t = geByClass("post");
                LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(e => LongView.register(e, "im"))
            },
            onHistoryScroll: function(e) {
                LongView.onScroll(e, window.innerHeight)
            }
        };

        function ys(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var js = 68,
            Os = 32,
            ws = 300,
            ks = 20,
            Cs = 68,
            Ss = 10,
            Es = 2e3,
            Is = 100;

        function xs(e, t, n, r) {
            var a = e instanceof Array ? e : geByClass("_im_bar_date", e),
                i = t.contHeight();
            vs.onNewMessagesChunk();
            var s = a.reduce((e, t) => (e[domData(t, "date")] = [t.offsetTop + Ss, i, t], e), {}),
                o = !n && r.barMap ? r.barMap : {};
            return r.barMap = extend(o, s), r.barMapKeys = Object.keys(r.barMap).sort(), Promise.resolve(r)
        }

        function Ts(e, t, n, r, i) {
            var s = e.get().barMap[t],
                o = Object(a.jb)(i) ? Cs : ks;
            return n - (s[0] + n - s[1]) + r - o
        }

        function Ps(e, t, n, r, a) {
            var i, s, o = e.get(),
                c = n - t;
            o.barMapKeys.forEach(t => {
                var o = Ts(e, t, n, r, a);
                if (o >= c) {
                    var l = i ? Ts(e, i, n, r, a) : n;
                    i = l > o ? t : i
                } else if (o < c) {
                    var d = s ? Ts(e, s, n, r, a) : 0;
                    s = o > d ? t : s
                }
            });
            var l = {};
            return [
                [s, "prev"],
                [i, "cur"]
            ].forEach(t => {
                var i = ys(t, 2),
                    s = i[0],
                    o = i[1];
                s && (l[o + "Bar"] = function(e, t) {
                    var n = e.get().barMap[t][2];
                    return {
                        text: n.textContent,
                        date: domData(n, "date")
                    }
                }(e, s), l[o + "Left"] = Ts(e, s, n, r, a) - c)
            }), l
        }

        function Ms(e, t, n, i, s) {
            var o = e.get(),
                c = Object(r.W)(o),
                l = t.get(),
                d = s.scrollTop(),
                u = l.lastTop ? l.lastTop - d : 0;
            l.lastTop = d;
            var m = Object(ye.a)(o, o.peer) ? Object(a.Z)() : 0,
                p = Object(r.Y)(o.peer, o) && o.tabs[o.peer] && o.tabs[o.peer].top_banner ? 50 : 0,
                g = (Object(a.jb)(e) ? js + m + p : 0) - Os / 2,
                h = Ps(t, d, s.contHeight(), g, e),
                _ = h.prevBar,
                b = h.curBar,
                f = h.prevLeft,
                v = "translateY(0px)",
                y = !1,
                j = !1,
                O = !1;
            b || c || (b = function(e) {
                var t = geByClass1("_im_mess", e),
                    n = domData(t, "ts");
                return t && n ? {
                    text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
                    date: n
                } : null
            }(i)), b ? y = b : j = !0, _ && b && f > -Os && f < 0 && (O = !0, j = !1, y = b, v = `translateY(${-Os-f}px)`), y && function(e, t) {
                domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
                    visibility: "visible"
                }))
            }(n, y), O ? t.set(function(e, t, n, r) {
                return r.barTransition = r.barMap[t][2], n > 0 ? (addClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : n < 0 && (removeClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(r.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(r)
            }.bind(null, n, _.date, u)) : t.set(function(e, t) {
                return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
            }.bind(null, n)), v && setStyle(n, {
                [cssTransformProp]: v
            }), toggleClass(n, "im-page--top-date-bar_no-b", j)
        }

        function Ls(e, t) {
            var n = geByClass1("_im_top_date_bar"),
                r = h({
                    lastTop: !1,
                    barMap: {},
                    barMapKeys: []
                }),
                a = null,
                i = null,
                s = null,
                o = debounce(e => {
                    r.set(xs.bind(null, t, e, !1))
                }, 500);
            return {
                reset(a) {
                    r.set(xs.bind(null, t, a, !0)).then(() => {
                        Ms(e, r, n, t, a)
                    })
                },
                disable() {
                    r.reset()
                },
                heightIncreased: (e, t) => (o(t), r.set(function(e, t) {
                    return t.barMapKeys.forEach(n => {
                        t.barMap[n][0] -= e
                    }), Promise.resolve(t)
                }.bind(null, e))),
                parseMore(a, i) {
                    r.set(xs.bind(null, a, i, !1)).then(() => {
                        Ms(e, r, n, t, i)
                    })
                },
                toggle(e) {
                    e ? setStyle(n, {
                        display: ""
                    }) : hide(n)
                },
                show() {
                    i = Date.now(), s || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), s = setInterval(function() {
                        Date.now() - i > Es && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(s), s = null)
                    }, Is))
                },
                update(i) {
                    a && (clearTimeout(a), a = null), a = setTimeout(function() {
                        Ms(e, r, n, t, i)
                    }, ws), Ms(e, r, n, t, i)
                }
            }
        }
        var Bs = n("nyd8"),
            Ds = n("uytb"),
            Ns = n("p3re"),
            As = n("FWc3"),
            qs = n("zxIV"),
            Hs = "_im_top_banner_button",
            Fs = "_im_top_banner_hide";

        function Rs(e, t) {
            var n = geByClass1("_im_dialog_actions", e);
            Object(qs.wb)(n, "im-page--chat-header_top-banner", t)
        }

        function $s(e, t) {
            var n = geByClass1(Fs, e);
            n && window.tooltips && tooltips.hide(n), Rs(e, !1), t.innerHTML = ""
        }

        function Us(e, t, n) {
            var s = geByClass1("_im_top_banner", e),
                c = Object(o.a)({
                    handlers: (i, o) => {
                        var c = geByClass1("_im_dialog_actions", e);
                        o(e, "click", Fs, () => {
                            t.set(r.S.bind(null, t.get().peer)), $s(e, s);
                            var i = !!Object(a.ac)(t);
                            Object(a.H)(t, i, !0, n)
                        }), o(e, "click", Hs, i => {
                            var o = function(e, t, n, a) {
                                    var i = Object(qs.s)(e, "payload");
                                    return !!i && (t.set(r.k.bind(null, t.get().peer, i)), $s(n, a), !0)
                                }(i.target, t, e, s),
                                c = !!Object(a.ac)(t);
                            Object(a.H)(t, c, !o, n)
                        }), o(c, "mouseover", Fs, (e, t) => {
                            Object(As.c)(t, {
                                text: getLang("mail_top_banner_hide"),
                                black: 1,
                                shift: [8, 4],
                                appendEl: bodyNode
                            })
                        })
                    }
                });
            return {
                renderPeer(t) {
                    var r = Object(i.u)(t, t.get().peer).top_banner,
                        o = s.children.length;
                    r && !Object(i.N)(t) ? (Rs(e, !0), s.innerHTML = function(e) {
                        var t = e.icon ? Object(Vr.n)("im_top_banner_icon", {
                                icon: e.icon
                            }) : "",
                            n = e.text;
                        "employees_banner" === e.name && (n = Object(Ns.e)(n, Ns.b.bind(null, !1)), n = Object(Ns.f)(n));
                        var r = (e.buttons || []).map(e => {
                            var t = "";
                            switch (e.layout) {
                                case "secondary":
                                    t = "secondary";
                                    break;
                                default:
                                    t = "blue_button"
                            }
                            return "link" === e.type ? Object(Vr.n)("im_top_banner_button_link", {
                                link: e.link,
                                text: e.text,
                                css_class: t
                            }) : Object(Vr.n)("im_top_banner_button", {
                                callback_data: e.callback_data,
                                text: e.text,
                                css_class: t
                            })
                        });
                        return r = r.concat([Object(Vr.n)("im_top_banner_hide_btn", {})]), Object(Vr.n)("im_top_banner", {
                            text: n,
                            icon: t,
                            buttons: r.join("")
                        })
                    }(r)) : s.children.length && $s(e, s);
                    var c = s.children.length;
                    Object(a.H)(t, c, o, n)
                },
                unmount() {
                    Object(o.c)(c)
                }
            }
        }

        function zs(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Ks = window.formatCount,
            Ws = 1e3,
            Vs = -30,
            Gs = 30,
            Xs = 2e3,
            Qs = 700,
            Ys = 15,
            Js = 47,
            Zs = "._im_to_end",
            eo = "_im_failed_action",
            to = "_im_mess_link",
            no = "_im_admin_name",
            ro = "_im_typer_c",
            ao = "_im_error",
            io = "_im_join_cancel",
            so = "_im_retry_media",
            oo = "im-audio-message_recorded",
            co = "im-audio-message_recording",
            lo = "_im_mess_srv",
            uo = "im_srv_mess_link",
            mo = "_chat_invitation",
            po = "_im_mess",
            go = "_im_replied_message",
            ho = "_im_replied_author_link",
            _o = !1,
            bo = {};

        function fo(e) {
            var t = Object(i.u)(e, e.get().peer);
            return !!Object(i.q)(e) || !!t.top_banner
        }

        function vo(e, t) {
            var n = Object(_.q)(e),
                r = Object(i.u)(n, t);
            return Object(a.ib)(t) && Object(ye.a)(n, t) || !!r.top_banner && !Object(i.N)(t, n)
        }

        function yo(e, t) {
            return Object(a.Z)()
        }

        function jo(e, t) {
            var n = ge("page_header"),
                r = geByClass1("_im_chat_input_w", t),
                a = r.offsetHeight - r.clientHeight;
            return Math.min(window.clientHeight() - a, Math.max(Math.max(0, e), Qs + n.offsetHeight + t.offsetTop))
        }

        function Oo(e, t) {
            return geByClass1("_im_mess_" + t, e)
        }

        function wo(e, t, n) {
            var r, i;
            ! function(e, t) {
                var n, r, a = function(a) {
                        n = void 0 !== a.clientX ? a.clientX : a.touches[0].clientX, r = void 0 !== a.clientY ? a.clientY : a.touches[0].clientY, t.onDrag && t.onDrag.call(e, n, r)
                    },
                    i = function i(s) {
                        t.onDrop && t.onDrop.call(e, n, r), removeEvent(document, "mouseup touchend mouseleave", i), removeEvent(document, "mousemove touchmove", a)
                    },
                    s = function(s) {
                        (1 === s.which || s.touches && s.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", i), addEvent(document, "mousemove touchmove", a), n = void 0 !== s.clientX ? s.clientX : s.touches[0].clientX, r = void 0 !== s.clientY ? s.clientY : s.touches[0].clientY, t.onStartDrag && t.onStartDrag.call(e, n, r), t.onDrag && t.onDrag.call(e, n, r), cancelEvent(s))
                    };
                e.beginDragHandler = s, addEvent(e, "mousedown touchstart", s)
            }(geByClass1(e, t), {
                onStartDrag: (e, t) => {
                    addClass(bodyNode, "cursor_ns_resize"), r = t, i = t
                },
                onDrop: () => {
                    removeClass(bodyNode, "cursor_ns_resize")
                },
                onDrag: (e, s) => {
                    var o = jo(i - r + s, t);
                    Object(a.lc)(o), n().fixHeight()
                }
            })
        }

        function ko(e, t) {
            ! function(e) {
                removeEvent(e, "mousedown touchstart", e.beginDragHandler)
            }(geByClass1(e, t))
        }

        function Co(e) {
            hide(e.target)
        }

        function So(e, t, n) {
            var a = Object(i.u)(t, n),
                s = Object(r.Bc)(a.history);
            toggleClass(e, "im-page--history_empty-hist", !s)
        }

        function Eo(e) {
            return geByClass1("_im_peer_history", e)
        }

        function Io(e, t) {
            var n = t.contHeight(),
                r = e.scrollTop + (n - e.contHeight);
            t.scrollTop(r)
        }

        function xo(e, t, n, i, s, o, c, l) {
            var d = !(arguments.length > 8 && void 0 !== arguments[8]) || arguments[8],
                u = arguments.length > 9 && void 0 !== arguments[9] && arguments[9],
                m = (t.get().tabs || {})[n];
            s().hideError(), o.renderPeer(t), l.renderPeer(t);
            var p = geByClass1("_im_peer_history", e);
            if (!t.get().tabHistoryNotChanged) {
                val(geByClass1("_im_page_peer_name", e), m.tab);
                var g = Object(r.Bc)(m.history);
                So(e, t, n), g || (g = getLang("mail_im_here_history")), val(p, g), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), Object(a.jb)(t) || Object(a.M)("_chat_body_wrap", e), Uo(t, i, e)
            }
            if (Object(r.Y)(n, t.get()) ? s().showSearch(t) : s().cancelSearch(t, !1), c.changePeer(n, t), t.get().msgid) Do(i, e, t.get().msgid, t);
            else if (m.scrollBottom && d) {
                Io(m, i);
                var h = zs(Object(a.vb)(t, e, i), 1)[0];
                m.skipped || setTimeout(() => {
                    m.unread && !h && qo(t, e, !0), Po(t, i, e)
                }, 100)
            } else Bo(i, e, s, t, u) || i.scrollBottom(Vs);
            window.LazyLoad && window.LazyLoad.scan(!!i.scroll && i.scroll.scroller)
        }

        function To(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || t.scrollTop(),
                a = t.scrollBottom(),
                i = t.contHeight(),
                s = e.get().peer;
            e.set(r.ac.bind(null, s, n, a, i))
        }

        function Po(e, t, n) {
            var r = Object(i.G)(e),
                a = 4 * t.getScrollHeight();
            t.scrollBottom() > a && !r && qo(e, n, !0, 2 * t.getScrollHeight())
        }

        function Mo(e, t, n, s, o, c, l, d) {
            var u = !(arguments.length > 8 && void 0 !== arguments[8]) || arguments[8];
            if ((e.get().history_init || (e.get().history_init = !0, !(d.scrollTop() > 0))) && !ve.a.isFullscreen) {
                o.update(d), o.show();
                var m = e.get().peer;
                if (0 !== m && Object(a.qb)(e.get(), m) && (vs.onHistoryScroll(d.scrollTop()), !layers.visible)) {
                    var p = Object(i.G)(e),
                        g = Object(i.u)(e, m);
                    g && !g.skipped && l < 0 ? Po(e, d, c) : l > 0 && !g.skipped && !g.unread && Vo(e, c), Ao(e, d) && (p && g && !g.skipped && Vo(e, c), g.unread > 0 && Lo(e));
                    var h = Object(a.Oc)(n);
                    if (!Object(r.Y)(m, e.get()) && u && s(d), !_o && (l < 0 || 0 === d.scrollBottom()) && d.scrollBottom() < Ws) {
                        if (Object(r.Y)(m, e.get())) return;
                        if (g.skipped > 0 && !e.get().no_moving_down) {
                            var _ = gpeByClass("_im_page_history", c),
                                b = e.get();
                            _o = !0;
                            var f = e.set(r.mb).then(t().loadHistory.bind(null, b.peer, {
                                reversed: !0
                            })).then(() => {
                                Lo(e), _o = !1, qo(e, _), g.skipped || e.set(r.p.bind(null, e.get().peer, !1, !1))
                            });
                            return Ro(_, !0), void f.then(Ro.bind(null, _, !1))
                        }
                    }
                    if (!_o && d.scrollTop() < Ws) {
                        if (Object(r.Y)(m, e.get())) {
                            _o = !0;
                            var v = t().getSearchResulstModule();
                            return v.isAll(e) ? void(_o = !1) : void h(v.loadMore(e).then(n => {
                                _o = !1, n && (t().loadHistory(e.get().peer, {}, e, n), s(d))
                            }), "up")
                        }
                        var y = e.get();
                        g.allShown || (_o = !0, h(e.set(r.qb.bind(null, 0, 0)).then(t().loadHistory.bind(null, y.peer, {})).then(() => {
                            _o = !1, s(d)
                        }), "up"))
                    }
                    l < 0 && Yo(e, m, d.scrollBottom(), c, t), Object(r.id)()
                }
            }
        }

        function Lo(e) {
            if (!(window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle)) return e.set(r.Fb.bind(null, e.get().peer))
        }

        function Bo(e, t, n, r, i) {
            var s = geByClass1("_im_unread_bar_row", t);
            if (s) {
                var o = r.get(),
                    c = o.peer,
                    l = s.getBoundingClientRect(),
                    d = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
                Object(a.jb)(r) && (d += Js + (vo(o, c) ? yo() : 0));
                var u = e.scrollTop() - d + l.top;
                return e.scrollTop(u), To(r, e, u), setTimeout(() => {
                    c === r.get().peer && Mo(r, n, Eo(t), function() {}, i, t, 0, e)
                }, 80), Lo(r), !0
            }
            return !1
        }

        function Do(e, t, n, r) {
            var i = Oo(t, n);
            if (i) {
                var s = Object(a.jb)(r),
                    o = r.get().peer,
                    c = s ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                    l = i.offsetTop + domPN(i).offsetTop + domPN(domPN(i)).offsetTop + domPN(domPN(domPN(i))).offsetTop;
                s && vo(r, o) && (l -= yo(r.get())), e.scrollTop(l - e.getScrollHeight() / 2 + c / 2), addClass(i, "im-mess_light"), setTimeout(() => {
                    removeClass(i, "im-mess_light")
                }, Xs)
            }
        }

        function No(e, t, n) {
            n.updateLastSeen(e)
        }

        function Ao(e, t) {
            return Object(i.x)(e) >= intval(t.scrollBottom())
        }

        function qo(e, t, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                s = e.get().peer;
            if (!Object(a.Ab)(s)) {
                var o = e.get().tabs[s],
                    c = (t || document).querySelector(Zs);
                Ho(t, e);
                var l = !1;
                (n || o.skipped > 0) && !Object(r.Y)(s, e.get()) ? (l = !0, addClass(c, "im-to-end_shown")) : Wo(c, !0), e.set(r.Xc.bind(null, [l, intval(i)]))
            }
        }

        function Ho(e, t) {
            var n = t.get(),
                r = n.peer,
                a = n.tabs[r];
            (e || document).querySelector(Zs).querySelector("._im_to_end_label").innerHTML = Number(a.unread) > 0 ? Ks(a.unread) : ""
        }

        function Fo(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return (0 !== e.scrollTop() || 0 !== e.scrollBottom()) && e.scrollBottom() < (t ? Gs + t : Gs)
        }

        function Ro(e, t) {
            if (e) {
                var n = e.querySelector(Zs);
                toggleClass(n, "im-to-end_loading", t)
            }
        }

        function $o(e, t, n, a) {
            if (!t.get().tabs[t.get().peer].skipped) return a.scrollBottom(Vs), qo(t, n), Lo(t), void Yo(t, t.get().peer, 0, n, e);
            Ro(n, !0), t.set(r.p.bind(null, t.get().peer, !1, !1)).then(() => t.set(r.sb.bind(null, t.get().peer, !0, -1, !1))).then(() => {
                Ro(n, !1), e().changePeer(t, !1, !1), Lo(t)
            })
        }

        function Uo(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (Object(a.jb)(e)) {
                var i = t.contHeight(),
                    s = geByClass1("_im_chat_input_w", n),
                    o = s.offsetHeight - s.clientHeight,
                    c = geByClass1("_im_chat_resize", n),
                    l = geByClass1("_im_chat_input_parent", n),
                    d = geByClass1("_im_chat_audio_input_parent", n);
                if (!1 !== (r = !1 !== r ? r : Object(a.V)()) && r > 0) {
                    var u = jo(r, n),
                        m = u - (hasClass(d, co) || hasClass(d, oo) ? d : l).offsetHeight;
                    c.style.height = window.clientHeight() - u - o + "px", setStyle(s, {
                        top: m + "px",
                        bottom: "auto"
                    })
                } else c.style.height = "0px", setStyle(s, {
                    top: "auto",
                    bottom: "0px"
                });
                var p = geByClass1("_im_peer_history_w", n);
                return setStyle(p, {
                    borderBottomWidth: s.offsetHeight - Ys - 1
                }), t.contHeight() - i
            }
            Object(a.M)("_chat_body_wrap", n);
            var g = t.getScrollHeight();
            return t.update(!1, !0), g - t.getScrollHeight()
        }

        function zo(e, t, n, r) {
            var a = t.offsetHeight;
            r(), e.heightIncreased(t.offsetHeight - a, n)
        }

        function Ko(e, t) {
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

        function Wo(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
        }

        function Vo(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                a = t.querySelector(Zs);
            e.set(r.Xc.bind(null, [!1, 0])), Wo(a, n)
        }

        function Go(e) {
            var t = Object(i.h)(e);
            Object(a.ib)(t.peerId) && (t.pinHideId = cur.imDb.select(Ds.a, t.peerId))
        }

        function Xo(e, t, n, r, a) {
            e.setState({
                isEditing: !1
            }), removeClass(r, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, Object(i.p)(e) ? Object(i.v)(Object(i.h)(e)) : null), n.toggleStickers(e, !0), n.restoreKeyboard(), Qo(t)
        }

        function Qo(e) {
            Object(_.o)(geByClass("_im_history_tooltip", e)).forEach(hide)
        }

        function Yo(e, t, n, a, s) {
            var o = Object(i.u)(e, t);
            if (!(Date.now() - (o.lastReset || 0) < 1e3) && (o && o.msgs && o.history && !_o && o.offset > 300 && 0 == o.skipped && n < 50 && n >= 0 && 0 === (e.get().selectedMessages || []).length)) {
                var c = Object.keys(o.msgs).filter(e => e > 0).sort((e, t) => e - t).slice(0, -50),
                    l = c.slice(-1)[0];
                e.mutate(r.Tb.bind(null, t)), e.set(r.Mb.bind(null, c, t)).then(() => s().removeStartingFromMessage(l, t, e))
            }
        }

        function Jo(e) {
            checkEvent(e) || cancelEvent(e)
        }

        function Zo(e, t, n, l, d, m, p, g, h, _, b, f, v, y, j, O) {
            var w, k = throttle(function() {
                n.smoothScroll(...arguments)
            }, 300);
            return {
                fixKeyboard() {
                    d.fixKeyboard()
                },
                changePeer(e) {
                    var s = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    if (0 === e.get().peer && j.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return d.setDraft(e, null),
                        function(e) {
                            addClass(e, "im-page--history_empty"), Eo(e).innerHTML = ""
                        }(t);
                    if (Object(a.qb)(e.get(), e.get().peer)) {
                        removeClass(t, "im-page--history_search"), e.set(r.E), l.changeActions(e);
                        var c = e.get().peer,
                            u = e.get().prevPeer;
                        removeClass(t, "im-page--history_loading"), toggleClass(t, "im-page--history_vkcomgroup", Object(a.rb)(e, c)), s ? d.setDraft(e, Object(i.v)(Object(i.h)(e))) : d.updateState(e), qo(e, t), m().updateTyping(c, e), j.toggle(!0), No(e, 0, l), Object(a.Ab)(u) && !Object(a.Ab)(c) ? (! function(e, t, n, r, a, i, s, o, c, l) {
                            removeClass(e, "im-page--history_empty"), xo(e, t, n, r, a, i, s, o, c, l)
                        }(t, e, c, n, m, l, g, O, o, j), j.reset(n)) : Object(a.Ab)(u) || Object(a.Ab)(c) || (xo(t, e, c, n, m, l, g, O, o, j), j.reset(n)), Object(a.Ab)(c) || Mo(e, m, Eo(t), v, j, t, 0, n), Object(a.L)(t)
                    }
                },
                preparePeer(e) {
                    var n = Object(i.p)(e);
                    Go(e), d.setDraft(e, Object(i.v)(Object(i.u)(e, n))), m().updateTyping(n, e), m().hideError(), l.renderPeer(e), O.renderPeer(e), l.hideActions(e), g.changePeer(n, e), No(e, 0, l), j.toggle(!1), Vo(e, t, !0)
                },
                saveScroll: e => To(e, n),
                loadingPeer(e) {
                    Object(r.V)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
                },
                stopLoading(e) {
                    removeClass(t, "im-page--history_loading")
                },
                deselectDialog(e) {
                    p().removeSelection(e)
                },
                replaceMessageAttrs(e, n) {
                    Object(a.gc)(n.get(), Eo(t), e)
                },
                cleanSelection(e) {
                    _.cleanSelection(e)
                },
                updateDialogFilters(e) {
                    p().updateDialogFilters(e)
                },
                getSearchResulstModule: () => w,
                insertSearch(e, r) {
                    w || (l.deselectAll(r), w = u(t, r)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), Eo(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), Eo(t).innerHTML = Object(a.Vb)()), Uo(r, n, t), n.scrollBottom(0), qo(r, t), j.reset(n)
                },
                updateChatTopic(e, t) {
                    p().updateDialog(e, t), e === t.get().peer && (l.renderPeer(t), l.renderActions(t), O.renderPeer(t))
                },
                updateActions(e) {
                    l.changeActions(e)
                },
                updateChatPhoto(e, r, i) {
                    if (Object(a.wb)(e.peerId, i.get())) {
                        l.renderPeer(i), O.renderPeer(i);
                        var s = Fo(n);
                        Object(a.w)(e, r, i.get(), Eo(t)), s && n.scrollBottom(Vs)
                    }
                },
                markImportant(e, n, r) {
                    Oo(t, e) && (l.changedMessageSelection(r), h.markImportant(e, n, r))
                },
                isNewMessagesVisible: e => Ao(e, n),
                loadHistory(e, r, i) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        o = i.get();
                    if (Object(a.wb)(e, o)) {
                        var c = s || o.tabs[e].historyToAppend;
                        if (!c) return;
                        var l = geByClass1("_im_peer_history", t),
                            d = domFC(l),
                            u = n.scrollBottom(),
                            m = r.reversed ? e => l.appendChild(e) : e => l.insertBefore(e, d),
                            p = 0;
                        r.reversed && (p = l.offsetHeight);
                        var g = sech(c),
                            h = document.createDocumentFragment();
                        g.forEach(e => h.appendChild(e)), m(h), r.reversed && j.heightIncreased(l.offsetHeight - p, n), r.reversed || n.scrollBottomFixSave(u), n.update(!1, !0);
                        var _ = g.filter(e => hasClass(e, "_im_bar_date"));
                        j.parseMore(_, n), Object(a.L)(t)
                    }
                },
                sendMessage(e) {
                    0 !== e.get().peer && d.sendMessage()
                },
                editMessage(e, r) {
                    if (Object(a.qb)(e, r.peerId) && Object(a.wb)(r.peerId, e.get())) {
                        if (!Oo(t, r.messageId)) return;
                        To(e, n), Object(a.K)(e.get(), r, t), Io(Object(i.u)(e, r.peerId), n), l.reRenderPinned(e), j.reset(n)
                    }
                },
                addMessage(e, o) {
                    if (!Object(r.Y)(o.peerId, e.get()) && Object(a.qb)(e, o.peerId) && Object(a.wb)(o.peerId, e.get())) {
                        if (Oo(t, o.messageId)) return;
                        var c = Eo(t);
                        zo(j, c, n, () => {
                            var r = Fo(n),
                                l = geByClass1("_im_unread_bar_row", t),
                                d = zs(Object(a.vb)(e, t, n), 2),
                                u = d[0],
                                p = d[1];
                            Object(a.x)(e.get(), o, c, !0, !0, !u && !l), removeClass(t, "im-page--history_empty-hist");
                            var g = Object(i.u)(e, e.get().peer),
                                h = Object(s.l)(o) && o.userId === vk.id,
                                _ = o.kludges && o.kludges.source_act,
                                b = h && _ !== a.f && _ !== a.h;
                            g.skipped || u || !Object(s.n)(g, o) || Object(s.k)(o) || qo(e, t, !0, p), (o.local || r || b) && n.scrollBottom(0), m().updateTyping(o.peerId, e), Ho(t, e), Qo(t)
                        });
                        var l = domPS(domLC(c));
                        if (hasClass(l, "_im_bar_date")) {
                            var d = ce("div");
                            d.innerHTML = l.outerHTML, j.parseMore(d, n)
                        }
                        m().hideError(), j.update(n), Object(r.ad)(e.get()), Yo(e, o.peerId, n.scrollBottom(), 0, m)
                    }
                },
                setMessageErrored(e, n, r, i) {
                    r && m().showError(r), Object(a.mc)(e, n, t)
                },
                markMessagesAsRead(e, n) {
                    e.get().peer === n.peerId && Object(a.Lb)(e.get(), n.peerId, t)
                },
                compensateHistoryHeightChange(e) {
                    n.scrollTop(n.scrollTop() + e * yo(f.get(), f.get().peer))
                },
                updateTyping(e, n) {
                    if (!Object(r.Y)(e, n.get())) {
                        var s = n.get();
                        if (s.peer === e && Object(a.qb)(s, e)) {
                            var o = Object(a.P)(Object(i.u)(n, e).activity, e, !1, s),
                                c = geByClass1(a.v, t);
                            if (c || o) {
                                if (!c) {
                                    var l = geByClass1(ro, t);
                                    val(l, getTemplate("im_typing", {
                                        cls: Object(a.jb)(n) ? "im-activity_classic" : ""
                                    })), c = geByClass1(a.v, t)
                                }
                                val(geByClass1("_im_typing_name", c), o);
                                var d = Object(a.Jb)(Object(i.u)(n, e).activity || {}) === r.c;
                                c.setAttribute("data-activity-type", d ? "recording" : "typing"), o ? (addClass(c, "im-page--typing_vis"), m().hideError()) : removeClass(c, "im-page--typing_vis")
                            }
                        }
                    }
                },
                scrollFix(e, t, r) {
                    j.heightIncreased(r, n), j.update(n), Object(a.wb)(t, e.get()) && Fo(n, r) && n.scrollBottom(Vs)
                },
                goToEnd() {
                    $o(() => this, f, t, n)
                },
                updateGoToEnd(e, r) {
                    var a = Object(i.u)(e, e.get().peer);
                    a && a.skipped ? qo(e, t) : Vo(e, t, r), b(0, n, !1);
                    var s = e.get().peer;
                    setTimeout(() => {
                        e.get().peer === s && To(e, n)
                    })
                },
                newMessage(e) {
                    p().newMessage(e), Vo(e, t, !0)
                },
                scroll(e, t) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (0 !== e.get().peer) {
                        var i = r ? n.getScrollHeight() : 40;
                        !0 === a && (i = n.contHeight()), i = "up" === t ? -i : i, r || a ? k(i, () => {
                            b(i, n)
                        }) : (n.scrollTop(n.scrollTop() + i), b(i, n))
                    }
                },
                showCreation(e, t) {
                    p().showCreation(e, t)
                },
                updateScroll: () => Uo(f, n, t),
                toggleBarDate(e) {
                    j.toggle(e)
                },
                changedMessageSelection(e) {
                    l.changedMessageSelection(e)
                },
                updateOnline(e, t) {
                    Object(a.Db)(t.get(), e) && e === t.get().peer && l.renderPeer(t)
                },
                isEmpty: e => d.isEmpty(e),
                replaceAttachmentPlaceholders(e, r) {
                    if (Object(a.wb)(r.peerId, e.get())) zo(j, Eo(t), n, () => {
                        var s = Fo(n);
                        Object(a.fc)(t, r, e.get());
                        var o = Object(i.u)(e, r.peerId);
                        if (o.mediacontent[r.messageId].length >= 3 && o.mediacontent[r.messageId][2].pinned) {
                            var c = Object(i.S)(o.pinned);
                            c && c.messageId == r.messageId && (o.pinned = o.mediacontent[r.messageId][2].pinned, l.reRenderPinned(e))
                        }
                        s && n.scrollBottom(0)
                    }), j.update(n);
                    else if (Object(s.j)(r)) {
                        var o = Object(i.u)(e, r.peerId);
                        if (o.mediacontent[r.messageId].length >= 3 && o.mediacontent[r.messageId][2].pinned) {
                            var c = Object(i.S)(o.pinned);
                            c && c.messageId == r.messageId && (o.pinned = o.mediacontent[r.messageId][2].pinned)
                        }
                    }
                },
                removeMessages(e, r, i) {
                    i.get().peer === r && (Object(a.Ob)(e, Eo(t)), Uo(i, n, t), l.changedMessageSelection(i))
                },
                removeStartingFromMessage(e, r, i) {
                    if (i.get().peer === r) {
                        var s = Eo(t),
                            o = geByClass1("_im_mess_" + e, s);
                        Object(a.Qb)(o, s), Uo(i, n, t), l.changedMessageSelection(i)
                    }
                },
                hideGoToEnd(e) {
                    Vo(f, t, e)
                },
                removeMessagesRestore(e, n, r, i) {
                    i.get().peer === n && Object(a.Pb)(e, n, r, Eo(t))
                },
                updateState(e, t) {
                    p().updateState(e, t)
                },
                updateBanner(e) {
                    O.renderPeer(e)
                },
                updateChat(e, t) {
                    e.get().peer === t && (l.changeActions(e), l.renderPeer(e), l.renderActions(e), O.renderPeer(e), d.updateState(e), Object(r.ad)(e.get()))
                },
                focustTxt(e) {
                    d.focusOn(e)
                },
                startSearch(e) {
                    m().showSearch(e), g.changePeer(e.get().peer, e), g.search()
                },
                showSearch(e) {
                    addClass(t, "im-page--hisory_search-open"), e.setState({
                        searchShown: !0
                    }), fo(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(() => g.focus(e), 10)
                },
                cancelSearch(e) {
                    var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                            searchShown: !1
                        }), fo(e) && this.updateChatTopic(e.get().peer, e), l.changedMessageSelection(e)), i && !Object(a.Ab)(e.get().peer) && w) {
                        var s = e.get().tabs[e.get().peer];
                        Eo(t).innerHTML = Object(r.Bc)(s.history), Uo(e, n, t), n.scrollBottom(0), e.get().msgid && (Do(n, t, e.get().msgid, e), qo(e, t)), v(n), j.reset(n)
                    }
                    w && (w.unmount(), w = !1, Object(a.L)(t))
                },
                updateHistory(e) {
                    0 !== f.get().peer && e(t)
                },
                focusOnMessage() {
                    Do(n, t, f.get().msgid, f)
                },
                sendEditMessage(e, t) {
                    e.set(r.C.bind(null, Object(i.u)(e, t.peerId), t)).catch(n => e.get().longpoll.push([Object(c.pb)(t.peerId, t, n)]))
                },
                unmount() {
                    Object(o.c)(e), n.destroy(), clearInterval(y), d.unmount(), l.unmount(), h.unmount(), _.unmount(), g.unmount(), cancelStackFilter("forward"), ko("_im_chat_resize_track", t)
                },
                removePeer(e, t) {
                    p().removePeer(e, t)
                },
                restoreScroll(e, t) {
                    var r = e.get().tabs[t];
                    r.scrollBottom ? Io(r, n) : n.scrollBottom(Vs)
                },
                resendMessage(e, n) {
                    e === f.get().peer && Object(a.Fc)(e, n, t)
                },
                respond(e, t) {
                    d.attachMessages(e, t), d.focusOn(e);
                    var r = Object(i.u)(e, t);
                    r && !r.skipped && (n.scrollBottom(Vs), v(n))
                },
                cancelRecording() {
                    d.cancelRecording()
                },
                hideError() {
                    hide(geByClass1(ao, t))
                },
                showError(e) {
                    geByClass1(ao, t).innerHTML = e, show(geByClass1(ao, t)), n.scrollBottom(Vs)
                },
                startEditing(e) {
                    if (Object(r.V)(f.get())) Object(a.Cc)();
                    else {
                        e = Object(i.S)(e);
                        var n = Object(a.Y)(f);
                        if (!(d.isBlocked() || n && n.messageId == e.messageId)) {
                            n && this.cancelEditing(), Qo(t), f.get().searchShown && this.cancelSearch(f);
                            var s = Oo(t, e.messageId);
                            s && (this.cancelRecording(), function(e, t, n, r, a) {
                                e.setState({
                                    isEditing: !0
                                }), n.saveText(e), addClass(r, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", () => Xo(e, t, n, r));
                                var i = new tn.a;
                                i.dData.txt = Object(Ka.b)(a.text), i.dData.attaches = Object(Wa.a)(a.kludges, a.messageId), n.toggleStickers(e, !1), n.setDraft(e, i), setTimeout(() => n.focusOn(e), 0)
                            }(f, t, d, s, e), d.hideKeyboard(), l.deselectAll(f))
                        }
                    }
                },
                cancelEditing() {
                    var e = Object(a.Y)(f);
                    e && Xo(f, t, d, Oo(t, e.messageId))
                },
                getEditingMessage: () => Object(a.Y)(f),
                focusEditingMessage() {
                    var e = Object(a.Y)(f);
                    e && Do(n, t, e.messageId, f), d.focusOn(f)
                },
                setNetworkWaitingStatus(e) {
                    l.setNetworkWaitingStatus(e)
                },
                setNetworkReconnectingStatus() {
                    l.setNetworkReconnectingStatus()
                },
                clearNetworkStatus() {
                    l.clearNetworkStatus()
                }
            }
        }

        function ec(e, t, n, l, d) {
            var u = geByClass1("_im_peer_history_w", e);
            show(u), hasAccessibilityMode() && addClass(u, "history_a11y");
            var m = Object(o.b)(Zo),
                p = m.callMutations,
                g = m.bindMutations,
                h = (e => {
                    var t = debounce(e, 100),
                        n = throttle(e, 100);
                    return e => {
                        t(e), n(e)
                    }
                })(To.bind(null, t)),
                f = Ls(t, e),
                v = Mo.bind(null, t, p, u, h, f, e),
                y = Object(b.a)(geByClass1("_im_chat_body_abs", e), {
                    onScroll: v,
                    nativeScroll: Object(a.jb)(t),
                    shadows: !1
                });
            setTimeout(function() {
                t.get().peer && (Go(t), (Object(i.h)(t).pinned || Object(i.h)(t).top_banner) && (p().updateChatTopic(t.get().peer, t), t.set(r.oc), j.changeActions(t)), t.get().msgid ? Do(y, e, t.get().msgid, t) : Bo(y, e, p, t, f) || y.scrollBottom(Vs), t.get().history_init = !1, f.reset(y), qo(t, e), Mo(t, p, u, h, f, e, 0, y), Object(a.L)(e), nav.objLoc.st && (t.mutate(r.vc.bind(null, nav.objLoc.st, t.get().peer)), p().startSearch(t)))
            }, 15);
            var j = sr(geByClass1("_im_dialog_actions", e), t, p),
                O = Gi(geByClass1("_im_text_input", e), t, Object(a.jb)(t) ? l.updateMenu : void 0, (e, t) => {
                    n.removeDialog(e, t), n.restoreDialogs(e, !0)
                }, p),
                w = ss(geByClass1("_im_dialog_actions", e), t, p),
                k = gs(e, t, p),
                C = fs(e, t, () => ({
                    changedMessageSelection: j.changedMessageSelection
                }));
            Object(ye.b)(e, t, p);
            var S = Us(e, t, () => ({
                hidePinned() {
                    Object(ye.c)(t, t.get().peer, p, !1)
                },
                compensateHistoryHeightChange(e) {
                    p().compensateHistoryHeightChange(e)
                },
                showPinned() {
                    Object(ye.d)(t, t.get().peer, p, !1)
                }
            }));
            Object(a.Ab)(t.get().peer) || t.set(r.Vb.bind(null, t.get().peer)).then(() => {
                Object(a.jc)(t.get().peer, t.get(), Eo(e)), So(e, t, t.get().peer)
            }), wo("_im_chat_resize_track", e, d);
            var E = function(e, t, n, r, a) {
                    var s = domData(a, "msgid"),
                        o = e.get().peer,
                        l = Object(i.n)(e, o, s);
                    l.type === c.g ? (n().sendEditMessage(e, l), n().resendMessage(o, s)) : e.get().imQueueResend(o, s).then(t => {
                        e.get().longpoll.push([Object(c.Eb)(o, t.mess)])
                    })
                }.bind(null, t, e, p),
                I = function(e, t, n, i, s) {
                    var o = intval(domData(s, "peer")),
                        c = intval(domData(gpeByClass("_im_mess", s), "msgid")),
                        l = e.get().tabs[o].hash;
                    return Object(r.Xb)(c, o, l, e.get().gid), e.set(r.Wb.bind(null, c, o)).then(a.ic.bind(null, c, o, Eo(t))).then(() => Uo(e, n, t)), !1
                }.bind(null, t, e, y),
                x = function(e, t) {
                    e().showCreation(t)
                }.bind(null, d, t),
                T = $o.bind(null, p, t, e, y),
                P = function(e, t, n, r) {
                    if (hasClass(n.target, "_im_mess_marker")) {
                        var i = n.target;
                        window.tooltips && Object(_.o)(geByClass(a.l, t)).map(e => geByClass1("_im_mess_marker", e)).filter(e => e !== i).forEach(e => tooltips.hide(e, {
                            fasthide: !0
                        }));
                        var s = domData(r, "msgid");
                        showTooltip(i, {
                            content: getTemplate("im_failed_menu", {
                                id: s
                            }),
                            className: "im-page--failed-tt" + (s > 0 ? " no_delete" : ""),
                            appendParentCls: "_chat_body_wrap",
                            dir: "down",
                            noZIndex: !0,
                            shift: [12, 8],
                            hasover: !0
                        })
                    }
                }.bind(null, t, e),
                M = a.pc.bind(null, t),
                L = a.uc.bind(null, t),
                B = function(e, t, n, i, s) {
                    var o = domData(s, "action"),
                        c = domData(s, "msgid"),
                        l = geByClass1("_im_mess_marker", Oo(n, c)),
                        d = Number(c) > 0 ? "edit" : "send";
                    switch (o) {
                        case "resend":
                            Object(fe.j)("retry", d), t(i, s);
                            break;
                        case "delete":
                            Object(fe.j)("delete", d), e.set(r.Jb.bind(null, e.get().peer, c)).then(() => {
                                Object(a.Ob)([c], Eo(n))
                            })
                    }
                    tooltips.hide(l, {
                        fasthide: !0
                    })
                }.bind(null, t, E, e),
                D = function(e, t, n, a, i) {
                    if (checkEvent(a)) return !0;
                    var s = q2ajx(i.getAttribute("href")),
                        o = intval(s.msgid);
                    o && e.set(r.p.bind(null, e.get().peer, o, !1)).then(() => Do(n, t, o, e)), cancelEvent(a)
                }.bind(null, t, e, y),
                N = function(e, t, n) {
                    ve.a.isFullscreen || 0 === t.get().peer || Object(a.jb)(t) || e().restoreScroll(t, t.get().peer)
                }.bind(null, p, t, y),
                A = function(e, t) {
                    var n = e.get(),
                        o = n.peer,
                        c = domClosest(lo, t.target),
                        l = intval(domData(c, "msgid")),
                        d = Object(i.n)(e, o, l),
                        u = d && Object(s.l)(d) && d.kludges.source_act;
                    if (u === a.f || u === a.h) {
                        var m = c.querySelector("." + uo);
                        if (m && "A" !== m.tagName) {
                            var p = d.kludges.source_chat_local_id;
                            if (!p || bo[p]) return;
                            bo[p] = Object(r.N)(o, p, n).then(e => {
                                var t = zs(e, 1)[0];
                                if (t) {
                                    var n = `/im?sel=${Object(a.I)(o)}&msgid=${t}`,
                                        r = m.innerHTML;
                                    domReplaceEl(m, Object(a.kc)(n, r, !0, uo)), delete bo[p]
                                }
                            })
                        }
                    }
                }.bind(null, t),
                q = function(e, t, n) {
                    var r = e.get(),
                        s = r.peer,
                        o = n.target.href && n.target.href.match(/msgid=([\d]+)/),
                        l = o && o[1];
                    "A" !== n.target.tagName || !l || Object(a.gb)(e, s, l) || checkEvent(n) || (Object(i.n)(e, s, l) ? (e.setState({
                        msgid: l
                    }), Object(Bs.b)({
                        msgid: l
                    }), t().focusOnMessage()) : r.longpoll.push([Object(c.gb)(s, l)])), cancelEvent(n)
                }.bind(null, t, p),
                H = function(e, t, n, r) {
                    var i = r.target,
                        s = domClosest(go, i),
                        o = Number(s.getAttribute("data-msgid")),
                        c = domClosest("im-mess", i),
                        l = Number(c.getAttribute("data-msgid")),
                        d = e.get().peer;
                    o && !Object(a.gb)(e, d, o) ? (e.setState({
                        msgid: o
                    }), Object(Bs.b)({
                        msgid: o
                    }), Object(a.N)(e, t().focusOnMessage, d, o)) : l && Object(a.xc)(e, l, r)
                }.bind(null, t, p, e),
                F = Object(o.a)({
                    handlers: (n, s) => {
                        s(e, "click", a.s, I), s(e, "mouseover click", a.l, P), s(e, "mouseover", "_im_edit_time", M), s(e, "mouseover", "_im_page_info", L), s(e, "click", "_im_mess_susp", function(e, t) {
                            var n = intval(domData(t.target, "msgid")),
                                r = gpeByClass(`_im_mess_${n}`, t.target),
                                a = geByClass1("_im_log_body", r),
                                i = geByClass1("_im_mess_susp_cont", r);
                            a.innerHTML = i.innerHTML
                        }.bind(null, e)), s(e, "click", eo, B), s(e, "click", to, D), s(e, "mouseover", no, Ko), s(e, "mouseover", lo, A), s(e, "click", uo, q), s(e, "click", ao, Co), s(e, "click", go, H), s(e, "click", ho, Jo), s(e, "click", mo, (e, n) => {
                            if (checkEvent(e)) return !0;
                            if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                            var i = geByClass1("flat_button", n),
                                s = {
                                    invite_chat_id: domData(i, "inv-id"),
                                    invite_hash: domData(i, "hash")
                                };
                            Object(a.sc)(t, s, r.db), cancelEvent(e)
                        }), s(e, "click", io, () => t.get().longpoll.push([Object(c.Hb)()])), s(e, "click", so, e => (function(e, t, n) {
                            var s = e.get(),
                                o = domClosest(po, n.target),
                                c = domData(o, "msgid"),
                                l = Object(i.n)(s, s.peer, c),
                                d = e => t().replaceAttachmentPlaceholders(e, l);
                            l && (Object(fe.j)("retry_attach"), e.set(r.g.bind(null, l, [Object(a.Xb)(e, l)])).then(d), e.set(r.pb.bind(null, l)).then(d))
                        })(t, p, e)), n(geByClass1("_im_peer_history_w", e), "mousemove", f.show), n(geByClass1("_im_start_new", e), "click", x), n(e.querySelector(Zs), "click", T), n(geByClass1("_im_cancel_edit", e), "click", () => (p().cancelEditing(), !1)), n(geByClass1("_im_edit_focus_cur", e), "click", () => (p().focusEditingMessage(), !1)), ve.a.raw && n(document, ve.a.raw.fullscreenchange, N), n(window, "im_goToMessage", e => {
                            var n = intval(e.msgid);
                            if (n) return window.statlogsValueEvent("im_links_to_attachments", 1, "to_message"), t.set(r.p.bind(null, e.sel, n, !1)).then(() => Object(a.N)(t, p().focusOnMessage, t.get().peer, n))
                        })
                    }
                });
            curNotifier.recvClbks.pin_hide = [function(e) {
                e.hide ? Object(ye.c)(t, e.peer, p, !1) : Object(ye.d)(t, e.peer, p, !1)
            }], window.showForwardBox = (e => (function(e, t) {
                Object(a.A)(showBox("al_im.php", t, {
                    dark: 1
                }), e)
            })(t, e));
            var R = setInterval(No.bind(null, t, e, j), 1e4);
            return g(F, e, y, j, O, p, d, w, k, C, v, t, h, R, f, S)
        }

        function tc(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var nc = [],
            rc = 0,
            ac = !1;

        function ic(e) {
            nc = nc.reduce((t, n) => {
                var r = tc(n, 2),
                    a = r[0],
                    i = r[1];
                return i(e) ? t : t.concat([
                    [a, i]
                ])
            }, [])
        }
        var sc = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return rc++, {
                stop() {
                    rc--,
                    function(e) {
                        nc = nc.filter(t => tc(t, 1)[0] !== e), 0 === rc && (document.body.removeEventListener("click", ic, !0), ac = !1)
                    }(e)
                },
                replaceOrAdd(n) {
                    var r = nc.filter(t => {
                            var n = tc(t, 1)[0];
                            return e === n
                        }),
                        a = function(e, t) {
                            return 0 === t.length ? t => (e(t), !0) : n => {
                                var r = t.reduce((e, t) => e && !domClosest(t, n.target), !0);
                                return r && e(n), r
                            }
                        }(n, t);
                    r.length > 0 ? function(e, t) {
                        nc = nc.map(n => {
                            var r = tc(n, 2),
                                a = r[0],
                                i = r[1];
                            return a === e ? [e, t] : [a, i]
                        })
                    }(e, a) : function(e, t) {
                        !1 === ac && (ac = !0, document.body.addEventListener("click", ic, !0)), nc = nc.concat([
                            [e, t]
                        ])
                    }(e, a)
                }
            }
        };

        function oc(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function cc(e, t, n, i) {
            var s = ge("box_layer_wrap"),
                l = t.get().longpoll,
                d = h({
                    peer: 0,
                    longpoll: l,
                    oCache: {},
                    tabs: Object(a.Gc)(i.msgs, i.hash)
                }),
                m = gs(e.bodyNode, d, () => ({})),
                p = u(e.bodyNode, t);
            Object(a.L)(e.bodyNode);
            var g = function(e, t, n) {
                for (var a = arguments.length, i = new Array(a > 3 ? a - 3 : 0), s = 3; s < a; s++) i[s - 3] = arguments[s];
                i.filter(e => inArray(e.type, [c.Y, c.U, c.b])).forEach(a => {
                    if (a.type !== c.b) {
                        if (a.flags === c.l) {
                            var i = a.type === c.Y;
                            e.set(r.Uc.bind(null, [a.messageId], 0, i)).then(n => {
                                t.markImportant(a.messageId, i, e)
                            })
                        }
                    } else n.hide()
                })
            }.bind(null, t, m, e);
            l.onData(g);
            var _ = function(e, t, n, i) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var s = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(a.Oc)(s)(Object(r.kb)(e.offset).then(t => {
                            var n = oc(t, 4),
                                o = (n[0], n[1]),
                                c = (n[2], n[3]);
                            e.all = c.all, e.offset = c.offset, e.all ? addClass(s, "im-important_all") : e.loading = !1, i.set(r.yb.bind(null, Object(a.Gc)(c.msgs, c.hash)));
                            var l = ce("div");
                            l.innerHTML = o, s.appendChild(l), Object(a.L)(s)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: !1,
                    loading: i.all,
                    offset: i.offset
                }, e, s, d),
                b = Object(o.a)({
                    handlers: (e, t) => {
                        e(s, "scroll", _)
                    }
                });
            return {
                unmount() {
                    Object(o.c)(b), p.unmount(), m.unmount(), l.offData(g)
                }
            }
        }
        var lc = n("XzvV");

        function dc(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var uc = debounce(M.b, 1e3),
            mc = "_im_important_counter",
            pc = "_im_gim_mute";

        function gc(e) {
            return ge("im_dialogs_search", e)
        }

        function hc(e, t, n, a, s, o) {
            var c = trim(o);
            if (Object(i.P)(e, c)) {
                var l = vc.bind(null, e, n, s, t);
                c ? (e.setState({
                    recentSearch: !1
                }), s.stop()) : s.replaceOrAdd(l), cancelStackPush("im_search", l), c && e.set(r.rc.bind(null, c, !1)).then(t), addClass(a, "im-page--dialogs-search_fill"), addClass(a, "_im_d_search")
            } else c || (s.stop(), e.set(r.rc.bind(null, "", !1)).then(t), removeClass(a, "im-page--dialogs-search_fill"), removeClass(a, "_im_d_search"))
        }

        function _c(e, t, n) {
            return function() {
                Object(i.s)(t) === e && n(...arguments)
            }
        }

        function bc(e, t, n) {
            var a = Object(i.s)(n);
            return uc(.01, "im_search_stat", 1, "search_start"), Object(r.dd)(a), n.setState({
                recentSearch: !1
            }), e().toggleSettingsButton(n, !!a), a ? (n.get().dialog_search_going = !0, function(e, t, n) {
                var a = _c(e, n, t().appendFastDialogs.bind(null, n));
                return Object(r.ic)(e, n.get()).then(e => (a(e), e))
            }(a, e, n).then(r => {
                var i = r.map(e => e.peerId);
                return t(a, e, i, n)
            }).then(e => {
                n.get().dialog_search_going = !1
            }).catch(() => {})) : (e().restoreDialogs(n, !1, !0), Object(lc.b)("messages"), Promise.resolve(!1))
        }

        function fc(e, t, n, i) {
            var s = i.get(),
                o = _c(e, i, t().appendDialogs.bind(null, i)),
                c = _c(e, i, t().appendSearch);
            return Object(a.zb)(i) ? Object(r.cc)(e, n, "all", {}, s).then(o) : Promise.all([Object(r.cc)(e, n, "all", {}, s).then(o), Object(r.gc)(e, s)]).then(e => {
                var t = dc(dc(e, 2)[1], 2),
                    n = t[0],
                    r = t[1];
                c(i, n, r, !0)
            })
        }

        function vc(e, t, n, r) {
            cancelStackFilter("im_search");
            var a = gc(t);
            uiSearch.reset(a), e.setState({
                recentSearch: !1
            }), hc(e, r, t, a, n, a.value)
        }

        function yc(e, t) {
            return showTooltip(t, {
                appendEl: bodyNode,
                text: () => Object(i.O)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion"),
                black: 1,
                shift: [3, -1],
                appendCls: "js-im-page"
            })
        }

        function jc(e, t, n) {
            var a = n.target;
            e.set(r.Hc.bind(null, t)).then(() => {
                toggleClass(a, "im-page--gim-mute_muted", e.get().mute), t && Oc(e, {
                    target: a
                })
            })
        }

        function Oc(e, t) {
            var n = t.target;
            return showTooltip(n, {
                text: () => e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
                black: 1,
                shift: [13, 9],
                appendCls: "js-im-page"
            })
        }

        function wc(e, t, n, r, a, i) {
            return {
                focusInput(t) {
                    uiSearch.focus(gc(e).parentNode)
                },
                createCanceled(e, n) {
                    removeClass(t, "im-dialog-select_rotated")
                },
                rotateCross(e) {
                    addClass(t, "im-dialog-select_rotated")
                },
                setSearch(t, n) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    ! function(e, t, n, r, a) {
                        var i = gc(t);
                        i.value = a, hc(e, r, t, i, n, i.value)
                    }(t, e, r, a ? i : () => {}, n)
                },
                clearSearch(t) {
                    vc(t, e, r, () => {})
                },
                updateImportantCnt(t) {
                    var n = t.get().important_cnt,
                        r = geByClass1(mc, e);
                    toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
                },
                unmount() {
                    r.stop(), Object(o.c)(a), uiSearch.destroy(n), cancelStackFilter("im_search")
                }
            }
        }

        function kc(e, t, n) {
            var s = geByClass1("_im_search_croll", e),
                l = gc(e),
                d = sc("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
                u = Object(ot.b)(fc, 300),
                m = bc.bind(null, n, u),
                p = hc.bind(null, t, m, e, l, d),
                g = function(e, t, n, r, a, s) {
                    Object(i.O)(e) ? (vc(e, t, a, n), setTimeout(() => yc(e, s), 10)) : (window.tooltips && tooltips.hide(s, {
                        showsp: 0
                    }), function(e, t, n) {
                        n().showCreation(e)
                    }(e, 0, r))
                }.bind(null, t, e, m, n, d, s),
                h = function(e, t, n, r, i) {
                    return Object(a.qc)(e, n, cc, r)
                }.bind(null, t, e, n),
                _ = geByClass1("_im_dialogs_search_input", e);
            uiSearch.init(_, {
                onChange: p
            });
            var b = yc.bind(null, t, s),
                f = geByClass1(pc, e);
            l.value && p(l.value);
            var v = Object(o.a)({
                handlers: (o, u) => {
                    if (o(geByClass1("_im_av_time", e), "mouseover", e => {
                            showTooltip(e.target, {
                                text: getLang("mail_admin_av_time"),
                                dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                                shift: [0, 8]
                            })
                        }), o(s, "click", g), o(s, "mouseover", b), o(geByClass1(mc, e), "click", h), Object(a.jb)(t)) {
                        var m = jc.bind(null, t, !0),
                            p = Oc.bind(null, t);
                        o(f, "click", m), o(f, "mouseover", p)
                    }
                    o(l, "focus", () => {
                        t.get().longpoll.push([Object(c.Lb)("search")])
                    }), o(l, "click", () => {
                        Object(i.O)(t) && n().toggleSettingsButton(t, !0),
                            function(e, t, n, s, o) {
                                if (!Object(i.O)(e)) {
                                    var c = cur.imDb.select(Ds.b);
                                    if (0 !== c.length || Object(i.c)(e)) {
                                        e.setState({
                                            recentSearch: !0
                                        }), hc(e, () => {
                                            Object(i.O)(e) || (s.stop(), o().toggleSettingsButton(e, !1), o().restoreDialogs(e, !1, !0))
                                        }, t, n, s, "");
                                        var l = c.filter(t => !Object(a.Eb)(e.get(), t)),
                                            d = c.filter(t => Object(a.Eb)(e.get(), t)).reduce((t, n) => (t[n] = Object(i.u)(e, n), t), {});
                                        e.get().topConvTree.then(t => {
                                            var n = t.list.filter(e => inArray(e[0], l)).reduce((e, t) => (e[t[0]] = Object(r.ub)(t), e), {}),
                                                a = extend({}, n, d);
                                            return o().appendFastDialogs(e, c.map(e => a[e])), Object(r.cc)(!1, Object.keys(n), !1, {}, e.get())
                                        }).then(t => {
                                            o().appendDialogs(e, t)
                                        })
                                    }
                                }
                            }(t, e, l, d, n)
                    }), o(l, "blur", () => {
                        var e;
                        e = 0 === t.get().peer ? "search" : Object(a.zb)(t) ? "search" : "default", Object(i.O)(t) || n().toggleSettingsButton(t, !1), t.get().longpoll.push([Object(c.Lb)(e)])
                    })
                }
            });
            return Object(a.jb)(t) && jc(t, !1, {
                target: f
            }), wc(e, s, _, d, v, m)
        }
        var Cc = n("W9Tc");

        function Sc(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Ec = "_im_spam_not_spam",
            Ic = "_im_spam_spam";

        function xc(e, t) {
            var n = t.get().selectedMessages,
                r = geByClass1("_im_spam_box", e.bodyNode),
                i = geByClass1("ui_tab_sel", e.bodyNode);
            if (n.length > 0) {
                var s = getLang("mail_selected", n.length);
                s = s.replace("{count}", n.length), val(i, s + `<button aria-label="${getLang("mail_deselect_all")}" type="button" class="im-deselect ${a.k}"></button>`)
            } else val(i, getLang("mail_spam"));
            0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(Ec), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(Ic), getLang("mail_im_mark_delspam", n.length)))
        }

        function Tc(e, t, n) {
            var a = e.get().selectedMessages;
            e.set(r.t).then(n.cleanSelection.bind(null, a)).then(n => xc(t, e))
        }

        function Pc(e, t) {
            return {
                unmount() {
                    t.unmount(), Object(o.c)(e)
                }
            }
        }

        function Mc(e, t, n) {
            var i = ge("box_layer_wrap"),
                s = Object(o.b)(Pc),
                l = s.callMutations,
                d = s.bindMutations,
                u = h({
                    peer: 0,
                    oCache: {},
                    tabs: Object(a.Gc)(n.msgs, n.hash),
                    gid: t.get().gid
                }),
                m = function(e, t, n, i) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var s = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(a.Oc)(s)(Object(r.tb)(e.offset, i.get().gid).then(t => {
                            var n = Sc(t, 4),
                                o = (n[0], n[1]),
                                c = (n[2], n[3]);
                            e.all = c.all, e.offset = c.offset, e.all ? addClass(s, "im-important_all") : e.loading = !1, i.set(r.yb.bind(null, Object(a.Gc)(c.msgs, c.hash)));
                            var l = ce("div");
                            l.innerHTML = o, s.appendChild(l), Object(a.L)(s)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: n.all,
                    loading: !1,
                    offset: n.offset
                }, e, i, u),
                p = function(e, t, n, i) {
                    var s = gpeByClass("_im_mess", i, t);
                    if (s) {
                        var o = intval(domData(s, "msgid"));
                        s && (Object(r.Lb)([o], 0, e.get().tabs[0].hash, "undel", e.get()), Object(a.ic)(o, 0, t))
                    }
                }.bind(null, u, e.bodyNode),
                g = function(e, t, n, r, a) {
                    var i = gpeByClass("_im_mess", a, t.bodyNode),
                        s = intval(domData(i, "peer")),
                        o = intval(domData(i, "msgid"));
                    return t.hide(), n().unmount(), e.get().longpoll.push([Object(c.gb)(s, o)]), stopEvent(r), cancelEvent(r), !1
                }.bind(null, t, e, l),
                _ = function(e, t, n, a) {
                    var i = showFastBox({
                        title: getLang("mail_deleteall1"),
                        dark: 1,
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, getLang("mail_delete_all_spam"), getLang("mail_delete"), () => {
                        Object(r.J)(e, a).then(e => {
                            var t = Sc(e, 2),
                                n = (t[0], t[1]);
                            showDoneBox(n)
                        }), i.hide(), t.hide(), n().unmount()
                    }, getLang("mail_close"), () => i.hide())
                }.bind(null, n.hash, e, l, t.get().gid),
                b = fs(e.bodyNode, u, t => ({
                    changedMessageSelection: xc.bind(null, e)
                })),
                f = function(e, t, n) {
                    var i = e.get().selectedMessages;
                    Object(r.Lb)(i, 0, e.get().tabs[0].hash, "delete", e.get()), Object(a.Pb)(i, 0, "delete", t), Tc(e, t, n)
                }.bind(null, u, e.bodyNode, b),
                v = function(e, t, n) {
                    var i = e.get().selectedMessages;
                    Object(r.Lb)(i, 0, e.get().tabs[0].hash, "nospam", e.get()), i.map(e => geByClass1("_im_mess_" + e)).filter(e => e).forEach(e => {
                        var t = intval(domData(e, "peer")),
                            n = intval(domData(e, "msgid"));
                        val(e, Object(a.Wb)(t, n)), addClass(e, "im-mess_light")
                    }), Tc(e, t, n)
                }.bind(null, u, e.bodyNode, b),
                y = Tc.bind(null, u, e, b);
            return Object(a.L)(e.bodyNode), d(Object(o.a)({
                handlers: (t, n) => {
                    t(i, "scroll", m), t(geByClass1(Ic, e.bodyNode), "click", f), t(geByClass1(Ec, e.bodyNode), "click", v), t(geByClass1("_im_spam_flush", e.bodyNode), "click", _), n(e.bodyNode, "click", "_im_mess_restore", p), n(e.bodyNode, "click", "_im_go_to", g), n(e.bodyNode, "click", a.k, y)
                }
            }), b)
        }
        var Lc = "_im_dialogs_cog_settings",
            Bc = "_im_settings_action",
            Dc = "_im_to_unread";

        function Nc() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings",
                t = {
                    sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
                };
            return window.pushNotifier && window.pushNotifier.loadEndpoint() || Object(Cc.a)("push_notifier") && ls.get("im_ui_notify_off") ? t.browser = getLang("mail_notification_settings") : t.browser = Ac() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off"), getTemplate(e, t)
        }

        function Ac() {
            return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
        }

        function qc(e, t, n) {
            var s = function(e, t) {
                    showTooltip(t.target, {
                        content: Nc("im_settings_pop"),
                        dir: "down",
                        shift: [220, 9],
                        hasover: !0,
                        showdt: 300
                    })
                }.bind(null, t),
                c = function(e, t, n, r, i) {
                    var s = domData(i, "action"),
                        o = gpeByClass("_im_settings_menu", i),
                        c = hasClass(o, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
                    switch (s) {
                        case "spam":
                            Object(a.yc)(e, Mc, r);
                            break;
                        case "sound":
                            ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), o.outerHTML = Nc(c);
                            break;
                        case "browser":
                            Ac() ? (ls.set("im_ui_notify_off", 1), o.outerHTML = Nc(c), Object(fe.a)()) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(() => {
                                o.parentNode && (o.outerHTML = Nc(c))
                            }) : Object(Cc.a)("push_notifier") ? nav.go("/settings?act=notify") : (ls.set("im_ui_notify_off", 0), o.outerHTML = Nc(c), Object(fe.b)())
                    }
                }.bind(null, t, n, e),
                l = function(e, i) {
                    if (Object(a.Ac)(t, n, r.o)) {
                        var s = t.get().active_tab === m.m;
                        val(i, getTemplate("im_filter", {
                            filter: s ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                        }))
                    }
                },
                d = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "mouseover", Lc, s), n(e, "click", Bc, c), n(e, "click", Dc, l)
                    }
                });
            return function(e, t) {
                return {
                    updateFilter(t) {
                        var n, r = t.get().active_tab === m.m,
                            a = [];
                        Object(i.O)(t) && a.push("im-page--dialogs-filter_hidden"), t.get().unread_cnt > 0 ? n = r ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread") : (n = getLang("mail_all_dialogs"), a.push("im-page--dialogs-filter_disabled")), val(geByClass1(Dc, e), getTemplate("im_filter", {
                            filter: n,
                            cls: a.join(" ")
                        }))
                    },
                    toggleButton(t, n) {
                        var r = geByClass1("im-page--dialogs-filter", e);
                        toggleClass(r, "im-page--dialogs-filter_hidden", n)
                    },
                    toggleLoader(t, n) {
                        var r = geByClass1(Lc, e);
                        toggleClass(r, "im-page--dialogs-settings_loading", n)
                    },
                    updateSettings(t) {
                        geByClass1("_im_settings_menu", e).outerHTML = Nc()
                    },
                    unmount() {
                        Object(o.c)(t)
                    }
                }
            }(e, d)
        }
        var Hc = "_ui_multiselect_cancel";

        function Fc(e) {
            return e.selection = [], Promise.resolve(e)
        }

        function Rc(e, t) {
            return t.selection = t.selection.filter(t => t.id !== e), Promise.resolve(t)
        }

        function $c(e, t, n, r) {
            var a = n.get().selection,
                i = uiSearch.getFieldEl(e);
            uiSearch.focus(e), a.length > 0 ? attr(i, "placeholder", "") : attr(i, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = a.map(e => `<div class="token">\n      <div class="token_title">${e.name}</div>\n      <div data-peer="${e.id}" class="token_del ${Hc}"></div>\n    </div>`).join(""), toggleClass(e, "ui_multiselect_has_selection", a.length > 0), domFC(e).scrollTop += 50, r()
        }

        function Uc(e, t) {
            return showTooltip(t, {
                text: getLang("mail_create_chat_remove_user"),
                black: 1,
                shift: [15, 8],
                appendParentCls: "_wrap"
            })
        }

        function zc(e, t, n) {
            uiSearch.init(e, {
                onChange: function(e, t, n, a) {
                    e.set(r.rc.bind(null, n, !1)).then(t().onChange)
                }.bind(null, t, n)
            });
            var a = uiSearch.getFieldEl(e),
                i = ce("div", {
                    className: "_ui_multiselection ui_multiselect_cnt"
                });
            a && a.parentNode.insertBefore(i, a);
            var s = function(e) {
                var t = 0;
                return function() {
                    var n = e.offsetWidth;
                    setStyle(e, {
                        width: 1
                    });
                    var r = e.offsetLeft;
                    t !== r ? (t = r, n = e.parentNode.offsetWidth, setStyle(e, {
                        width: Math.max(30, n - r - 20)
                    })) : setStyle(e, {
                        width: n
                    })
                }
            }(a);
            t.set(Fc);
            var c = function(e, t, n, r, a, i, s) {
                    var o = intval(domData(s, "peer"));
                    tooltips.hide(s), t.set(Rc.bind(null, o)).then(i => {
                        $c(e, r, t, a), n().selectionDeleted(t, o)
                    })
                }.bind(null, e, t, n, i, s),
                l = t => {
                    document.activeElement !== a && uiSearch.focus(e)
                },
                d = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "click", Hc, c), n(e, "mouseover", Hc, Uc), t(e, "click", l)
                    }
                });
            return {
                addSelection: (n, r) => t.set(function(e, t) {
                    return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
                }.bind(null, {
                    id: n,
                    name: r
                })).then($c.bind(null, e, i, t, s)),
                removeSelection: n => t.set(Rc.bind(null, n)).then($c.bind(null, e, i, t, s)),
                resetSelection() {
                    ! function(e, t, n, r) {
                        e.set(Fc).then($c.bind(null, t, n, e, r))
                    }(t, e, i, s)
                },
                focus() {
                    uiSearch.focus(e)
                },
                save() {
                    t.stash(), $c(e, i, t, s)
                },
                restore() {
                    t.pop(), $c(e, i, t, s)
                },
                unmount() {
                    uiSearch.destroy(e), Object(o.c)(d)
                }
            }
        }
        var Kc = "_im_create_cancel",
            Wc = "_im_create_list",
            Vc = "_im_dialog",
            Gc = "_im_create_tab",
            Xc = "_im_dialogs_creation_name",
            Qc = "_im_create_select",
            Yc = "_im_create_avatar",
            Jc = "_im_create_remove_avatar",
            Zc = "_im_confirm_creation",
            el = "_im_cancel_creation",
            tl = "_im_avatar_img",
            nl = ["im-creation--item_hovered"],
            rl = "olist_item_wrap_on",
            al = "ui_search_reset",
            il = 100;

        function sl(e, t, n, a, i, s) {
            Object(r.Ic)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(cl.bind(null, t, !1), 100), ml(s).map(e => geByClass1("_im_dialog" + e)).forEach(e => {
                removeClass(e, rl)
            }), n().createCanceled(e, a), i.resetSelection(), "add_member" === e.get().creationType && e.set(r.qc.bind(null, "chat", [])), e.set(r.Db.bind(null, !1));
            var o = geByClass1(tl, t);
            ll(e, s, t), uiSearch.reset(geByClass1(Xc, t)), uiSearch.reset(geByClass1(Qc, t)), o && o.parentNode.removeChild(o), ll(e, s, t), cancelStackFilter("im_search");
            var l = 0 === e.get().peer ? "search" : "default";
            e.get().longpoll.push([Object(c.Lb)(l)]), attr(t, "aria-hidden", "true")
        }

        function ol(e, t, n) {
            return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(e => {
                e.then(e => {
                    e = e.filter(e => !n.current_create_peer_ids[e.peerId]), n.current_create_peer_ids = e.reduce((e, t) => (e[t.peerId] = !0, e), n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
                })
            }), Promise.resolve(n)
        }

        function cl(e, t) {
            toggleClass(e, "im-create_material", t)
        }

        function ll(e, t, n) {
            var r = geByClass1(Zc, n),
                a = t.get().selection.length,
                i = "add_member" === e.get().creationType,
                s = a > 0,
                o = uiSearch.getFieldEl(geByClass1(Xc, n)).value.length > 0,
                c = !s && (i || !o),
                l = i ? 1 === a ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with") : o || a > 1 ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog");
            val(r, l), toggleClass(r, "button_disabled", c)
        }

        function dl(e, t, n, r, a, i, s) {
            if (s) {
                var o, c = intval(domData(s, "list-id")),
                    l = ml(i),
                    d = trim(s.textContent),
                    u = geByClass1(Qc, t),
                    m = getSize(u)[1];
                inArray(c, l) ? (o = r.removeSelection(c, d), removeClass(s, rl)) : (o = r.addSelection(c, d), addClass(s, rl)), o.then(() => {
                    var e = m - getSize(u)[1],
                        t = a.scrollTop();
                    a.scrollTop(t - e)
                }), ll(e, i, t);
                var p = geByClass1(Qc, t);
                uiSearch.reset(p)
            }
        }

        function ul(e) {
            return Object(i.s)(e) || !1
        }

        function ml(e) {
            return e.get().selection.map(e => e.id)
        }

        function pl(e, t, n, r) {
            toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
            var i = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
                s = geByClass1("_im_create_title", e);
            val(s, i), val(geByClass1(Zc, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat")), hl(e, r, t, !1, n.get().selection.map(e => e.id)), Object(a.M)("_im_create_wrap_safe", e)
        }

        function gl(e, t, n) {
            return e.then(e => e.filter(e => e.is_friend && !inArray(e.peerId, n.get().creationFilter)))
        }

        function hl(e, t, n, a, i) {
            var s, o, c = geByClass1(Qc, e),
                l = Object(r.fc)(a, t.get()),
                d = n.hoverFirstElement.bind(n, nl, fl(t));
            t.get().creation_shown_all = !1, n.reset(), n.pipe(gl(l, 0, t), a), n.toTop(), a ? (o = Object(r.ic)(a, t.get()), s = Object(r.dc)(a, [], "friends", t.get()), n.pipe(gl(s, 0, t), a).then(d), n.pipe(gl(o, 0, t), a).then(d)) : (s = Promise.resolve([]), o = Promise.resolve([])), t.set(ol.bind(null, [l, o, s], !0)), uiSearch.showProgress(c), Promise.all([l, s, o]).then(() => uiSearch.hideProgress(c))
        }

        function _l(e, t, n, r, a, i) {
            ml(t).map(e => geByClass1("_im_dialog" + e)).forEach(e => removeClass(e, rl)), t.reset(), hl(n, e, r, !1, ml(t)), a.resetSelection(), sl(e, n, i, !1, a, t)
        }

        function bl(e, t, n, a, s, o, l) {
            var d = ml(t),
                u = e.get(),
                m = geByClass1(Zc, n),
                p = uiSearch.getFieldEl(geByClass1(Xc, n)).value,
                g = "add_member" === e.get().creationType,
                h = !g && (p.length || d.length > 1);
            if (g) return e.set(r.i.bind(null, u.peer, d)).catch(e => showFastBox(getLang("global_error"), e)), sl(e, n, o, "", s, t);
            if (lockButton(m), !h) return _(d[0]);

            function _(r) {
                _l(e, t, n, a, s, o),
                    function(e, t, n, r, a, i) {
                        sl(e, t, n, !1, a, i), e.get().longpoll.push([Object(c.gb)(r, !1, !1, !1, "create_conversation")])
                    }(e, n, o, r, s, t), unlockButton(m), Object(i.O)(e) ? o().cancelSearch(e) : o().restoreDialogs(e)
            }
            e.set(r.w.bind(null, u.next_chat_avatar, d, p)).then(() => _(u.next_peer)).catch(e => {
                unlockButton(m), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
            })
        }

        function fl(e, t) {
            var n = t && t.get().selection.length;
            return {
                top: -1,
                bottom: Object(a.jb)(e) ? n > 0 ? 69 : 0 : -1
            }
        }

        function vl(e, t, n) {
            var i = h({
                    selection: []
                }),
                s = P(geByClass1(Wc, e), h({
                    offset: 0,
                    limit: il,
                    elements: [],
                    elCls: Vc
                }), () => ({
                    idFn: e => intval(e.peerId),
                    hoverableFn: e => hasClass(e, "_im_dialog"),
                    renderFn: function(e, t) {
                        var n = ml(e),
                            r = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
                            a = [];
                        return t.online && a.push("online"), mobPlatforms[t.online] && a.push("mobile"), inArray(t.peerId, n) && r.push(rl), getTemplate("im_owner_item", {
                            owner_id: t.peerId,
                            cls: " " + r.join(" "),
                            photo: t.photo,
                            name: t.name,
                            link: t.href,
                            img_cls: a.join(" ")
                        })
                    }.bind(null, i),
                    more(e, n) {
                        var a;
                        return t.get().shown ? (t.get().creation_shown_all || !1 !== ul(i) ? a = Promise.resolve([]) : (t.get().creation_shown_all = !0, a = Object(r.ic)(ul(i), t.get())), t.set(ol.bind(null, [a], !1)), gl(a, ul(i), t)) : Promise.resolve(!1)
                    },
                    onClick(n, r) {
                        checkEvent(n) || (dl(t, e, 0, l, s, i, r), cancelEvent(n))
                    }
                }));
            t.get().creationQuery = !1, t.get().creationType = "chat";
            var l = zc(geByClass1(Qc, e), i, () => ({
                    selectionDeleted(n, r) {
                        ll(t, n, e), removeClass(geByClass1("_im_dialog" + r), rl)
                    },
                    onChange: function(e, t, n, r) {
                        var a = r.get(),
                            i = ul(a);
                        a.selection.map(e => e.id), n.unhoverElements(nl), e.get().creationQuery = i, hl(t, e, n, i)
                    }.bind(null, t, e, s)
                })),
                d = sl.bind(null, t, e, n, "cross", l, i),
                u = function(e, t, n, a, i, s, o, c) {
                    uiTabs.switchTab(c.firstElementChild);
                    var l = domData(c, "type");
                    switch (l) {
                        case "chat":
                            s.restore()
                    }
                    e.set(r.qc.bind(null, l, [])).then(pl.bind(null, t, a, i))
                }.bind(null, t, e, n, s, i, l),
                m = function(e, t, n, a) {
                    var i = 2e9 + Math.round(rand(1e6, 2e6));
                    cur.recieveCropResult = (n => {
                        cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(r.Db.bind(null, n)), Object(r.P)(n, i).then(e => {
                            geByClass1(Yc, t).appendChild(ce("img", {
                                className: `im-chat-placeholder--img ${tl}`,
                                src: e
                            }))
                        }), addClass(t, "im-create_photo-attached")
                    }), Page.ownerPhoto(i)
                }.bind(null, t, e),
                p = function(e, t) {
                    geByClass1(Yc, t).innerHTML = "", e.set(r.Db.bind(null, !1)), removeClass(t, "im-create_photo-attached")
                }.bind(null, t, e),
                g = _l.bind(null, t, i, e, s, l, n),
                _ = bl.bind(null, t, i, e, s, l, n),
                b = function(e, t, n) {
                    ll(e, t, n)
                }.bind(null, t, i, e),
                f = geByClass1(Kc, e),
                v = geByClass1(Xc, e),
                y = v.querySelector("." + al),
                j = Object(o.a)({
                    handlers: (t, n) => {
                        t(f, "click", d), t(f, "mouseover", function(e, t) {
                            return showTooltip(e, {
                                text: getLang("mail_cancel"),
                                black: 1,
                                zIndex: 1e3,
                                shift: [3, -2],
                                appendCls: "js-im-page"
                            })
                        }.bind(null, f)), t(geByClass1(Yc, e), "click", m), t(geByClass1(Jc, e), "click", p), t(geByClass1(el, e), "click", g), t(v, "change", b), t(v, "input", b), t(v, "paste", b), t(y, "click", b), t(geByClass1(Zc, e), "click", _), t(e, "mouseover", throttle(s.unhoverElements.bind(s, nl), 100)), n(e, "click", Gc, u)
                    }
                });
            return function(e, t, n, r, i, s, l, d) {
                return {
                    show(t) {
                        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                        t.setState({
                            shown: !0
                        }), cl(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown");
                        var s = r.get().selection.reduce((e, t) => (e[t.id] = !0, e), {});
                        a && a.forEach(t => {
                            if (!s[t[0]]) {
                                var n = e.querySelector(`._im_dialog${t[0]}`);
                                i.addSelection(t[0], t[1]), n && !n.classList.contains(rl) && n.classList.add(rl)
                            }
                        }), pl(e, n, r, t), setTimeout(() => {
                            t.get().longpoll.push([Object(c.Lb)("create")]), attr(e, "aria-hidden", "false"), i.focus()
                        }, 1)
                    },
                    focusSearch(e) {
                        i.focus()
                    },
                    confirmCreate(e) {
                        d()
                    },
                    hide(n) {
                        n.get().shown = !1, sl(n, e, t, !1, i, r)
                    },
                    scroll(e) {
                        n.scrollPage(e, !0)
                    },
                    updateScroll() {
                        Object(a.M)("_im_create_wrap_safe", e), n.updateScroll()
                    },
                    selectElement(t) {
                        dl(t, e, 0, i, n, r, n.getHoveredElement())
                    },
                    hoverPrevElement(e) {
                        n.hoverPrevElement(nl, null, fl(e, r))
                    },
                    hoverNextElement(e) {
                        n.hoverNextElement(nl, null, fl(e, r))
                    },
                    unmount() {
                        Object(o.c)(s), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
                    }
                }
            }(e, n, s, i, l, j, d, _)
        }

        function yl(e, t, n, r, i) {
            switch (t) {
                case m.b:
                    Object(a.ob)() || (r.scroll(i, "up"), cancelEvent(n));
                    break;
                case m.a:
                    Object(a.ob)() || (r.scroll(i, "down"), cancelEvent(n));
                    break;
                case m.v:
                    n.ctrlKey || Object(a.jb)(i) || (r.scroll(i, "up", !0), cancelEvent(n));
                    break;
                case m.u:
                    n.ctrlKey || Object(a.jb)(i) || (r.scroll(i, "down", !0), cancelEvent(n));
                    break;
                case m.o:
                    Object(a.ob)() || (r.scroll(i, "up", !1, !0), cancelEvent(n));
                    break;
                case m.d:
                    Object(a.ob)() || (r.scroll(i, "down", !1, !0), cancelEvent(n));
                    break;
                case m.w:
                    r.focustTxt(e)
            }
        }

        function jl(e, t, n, r, i, s) {
            var o = h({
                state: t || "default"
            });
            return {
                signal(t, c) {
                    if (!(cur.storyLayer || cur.articleEditorLayer || window.isArticleLayerOpen())) switch (o.get().state) {
                        case "default":
                            return yl(o, t, c, r, e);
                        case "fwd":
                        case "search":
                            return function(e, t, n, r, i, s) {
                                switch (t) {
                                    case m.a:
                                        r.hoverNextDialog(s), cancelEvent(n);
                                        break;
                                    case m.b:
                                        r.hoverPrevDialog(s), cancelEvent(n);
                                        break;
                                    case m.e:
                                        Object(a.ob)() && !gpeByClass("_im_dialogs_search_input", document.activeElement) || r.selectHoveredDialog(s);
                                        break;
                                    case m.w:
                                        i.focusInput(s)
                                }
                            }(0, t, c, n, i, e);
                        case "create":
                            return function(e, t, n, r, i) {
                                switch (t) {
                                    case m.v:
                                        !n.ctrlKey && Object(a.jb)(i) && (r.scroll("up"), cancelEvent(n));
                                        break;
                                    case m.u:
                                        !n.ctrlKey && Object(a.jb)(i) && (r.scroll("down"), cancelEvent(n));
                                        break;
                                    case m.a:
                                        r.hoverNextElement(i);
                                        break;
                                    case m.b:
                                        r.hoverPrevElement(i);
                                        break;
                                    case m.e:
                                        gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(i) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(i);
                                        break;
                                    case m.w:
                                        r.focusSearch(i)
                                }
                            }(0, t, c, s, e);
                        case "message":
                            return function(e, t, n, r, a) {
                                switch (t) {
                                    case m.o:
                                    case m.d:
                                        r.isEmpty(a) && yl(e, t, n, r, a);
                                        break;
                                    case m.v:
                                    case m.u:
                                        yl(e, t, n, r, a)
                                }
                            }(o, t, c, r, e);
                        default:
                            throw new Error("Unknown state: " + o.get().state)
                    }
                },
                transition: e => o.set(function(e, t) {
                    return t.state = e, Promise.resolve(t)
                }.bind(null, e))
            }
        }
        var Ol = n("BxOC"),
            wl = n("iN1s"),
            kl = n("EUzL");

        function Cl(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Sl = 202,
            El = 4,
            Il = 5,
            xl = 3e4,
            Tl = {},
            Pl = Date.now();

        function Ml(e, t) {
            var n = Math.floor(t.status / 100);
            t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), Tl[n] = Tl[n] ? Tl[n] + 1 : 1, Date.now() - Pl >= xl && (Object.keys(Tl).forEach(e => {
                statlogsValueEvent("im_longpoll", Tl[e], e + "0x", t.getResponseHeader("x-frontend"))
            }), Tl = {}, Pl = Date.now()))
        }

        function Ll(e) {
            return e.updates.map(e => {
                switch (e[0]) {
                    case 0:
                        return c.lb(e);
                    case 1:
                        return c.Cb(e);
                    case 2:
                        return c.Kb(e);
                    case 3:
                        return c.Gb(e);
                    case 4:
                        return c.eb(e);
                    case 5:
                        return c.mb(e);
                    case 6:
                        return c.ub(e);
                    case 7:
                        return c.vb(e);
                    case 8:
                        return c.rb(e);
                    case 9:
                        return c.qb(e);
                    case 10:
                        return c.Fb(e);
                    case 11:
                        return c.Bb(e);
                    case 12:
                        return c.Jb(e);
                    case 13:
                        return c.kb(e);
                    case 18:
                        return c.Db(e);
                    case 51:
                        return c.ib(e);
                    case 52:
                        return c.jb(e);
                    case 63:
                        return c.Mb(e);
                    case 64:
                        return c.yb(e);
                    case 70:
                        return c.Ob(e);
                    case 80:
                        return c.Nb(e);
                    case 114:
                        return c.tb(e);
                    case 116:
                        return c.Ab(e);
                    case -1:
                        return c.Ib();
                    default:
                        return c.ob(e)
                }
            })
        }

        function Bl(e, t) {
            return Promise.resolve(extend({}, t, {
                timeout: e < 64 ? 2 * e : e
            }))
        }

        function Dl(e, t) {
            return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
        }

        function Nl(e) {
            return e.pauses || (e.pauses = []), Object(_.h)("Aborting all pauses", "error"), e.pauses.forEach(e => e()), e.pauses = [], Promise.resolve(e)
        }

        function Al(e, t, n, a) {
            var i = a.failed ? Object(ot.a)(El, e) : {},
                s = i.abort,
                o = i.pause;
            switch (a.failed) {
                case 1:
                    return Object(_.h)("Old timestamp, init resync", "error"), e.set(Dl.bind(null, s)), n([c.Ib()]), e.set(r.ob).then(o).then(ql.bind(null, e, t, n));
                case 2:
                    return Object(_.h)("Key is incorrect", "error"), e.set(Dl.bind(null, s)), e.set(r.nb).then(o).then(ql.bind(null, e, t, n));
                case 3:
                    throw Object(p.b)("im_longpoll_force_reload", a, !1), nav.reload({
                        force: !0
                    }), new Error("ts is very wrong");
                default:
                    return e.set(function(e, t) {
                        return Promise.resolve(extend({}, t, {
                            imTs: e
                        }))
                    }.bind(null, a.ts)).then(() => a)
            }
        }

        function ql(e, t, n) {
            if (e.get().stopped) return Promise.resolve({
                updates: []
            });
            if (t()) return Promise.reject(new Error("pause"));
            var r = e.get(),
                a = `${r.imUrl}/${r.imPart}`,
                i = Object(Ol.a)(a, {
                    act: "a_check",
                    key: r.imKey,
                    version: Il,
                    ts: r.imTs,
                    wait: 25,
                    mode: r.mode
                }),
                s = i.request,
                o = i.cancel;
            return e.set(function(e, t) {
                return t.cancelToken = e, Promise.resolve(t)
            }.bind(null, o)).then(() => s).then(t => {
                var n = Cl(t, 2),
                    a = n[0],
                    i = n[1];
                return i && Ml(r, i), e.set(Bl.bind(null, 1)), JSON.parse(a)
            }).catch(e => {
                var t = Cl(e, 2),
                    n = (t[0], t[1]);
                throw n && Ml(r, n), ""
            }).then(Al.bind(null, e, t, n))
        }

        function Hl(e) {
            var t = e.id,
                n = e.gid,
                r = e.key,
                a = e.ts,
                i = e.url,
                s = e.lhost,
                o = e.lpstat,
                c = new EventEmitter,
                l = window.vk.lpConfig && window.vk.lpConfig.enabled && window.longpollTesting_onImEvents,
                d = Ia(function(e, t) {
                    return l && window.longpollTesting_onImEvents(t), c.trigger("data", t), Promise.resolve({})
                }),
                u = d.pause,
                m = d.resume,
                p = d.pushMessage,
                g = d.isPaused,
                b = d.reset,
                f = h({
                    id: t,
                    gid: n,
                    mode: Sl,
                    timeout: 1,
                    imKey: r,
                    imTs: a,
                    imPart: i,
                    imUrl: s,
                    pause: !1,
                    stat: o
                });
            return function e(t, n, r) {
                t.get().stopped || (Object(_.h)("New request"), ql(t, r, n).then(Ll).then(e => (Object(_.h)("Request success", "success"), e)).then(n).catch(e => {
                    if (!t.get().stopped) return Object(_.h)("Error, waiting: " + (e.message || "no message (probably browser reset)"), "error"), t.set(Bl.bind(null, r() ? El / 2 : t.get().timeout)).then(() => {
                        var e = Object(ot.a)(t.get().timeout, t),
                            n = e.abort,
                            r = e.pause;
                        return t.set(Dl.bind(null, n)).then(r)
                    });
                    Object(_.h)("Stopped longpoll")
                }).then(e.bind(null, t, n, r)))
            }(f, p.bind(null, "main"), g.bind(null, "main")), {
                onData: e => c.on("data", e),
                offData: e => c.off("data", e),
                abortWaiting: () => f.set(Nl),
                stop: function(e) {
                    e.set(e => Promise.resolve(extend({}, e, {
                        stopped: !0
                    }))).then(() => {
                        e.get().cancelToken()
                    })
                }.bind(null, f),
                pause: u.bind(null, "main"),
                resume: m.bind(null, "main"),
                reset: b.bind(null, "main"),
                push: e => c.trigger("data", e),
                isEnabled: () => !f.get().pause && !f.get().stopped
            }
        }
        var Fl = n("1+Fu");

        function Rl(e) {
            var t = e.get().tabbedPeers.map(t => e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]).filter(e => e).filter(e => !e.deletedDialog).map(e => {
                return {
                    type: "peer",
                    peer: e.peerId
                }
            });
            return t.length > 0 && (t = [{
                type: "sep"
            }].concat(t)), t
        }

        function $l(e, t) {
            return e.pipeReplace(Promise.resolve(Rl(t)))
        }

        function Ul(e, t, n, r) {
            return {
                updateMenu(t) {
                    ! function(e, t) {
                        geByClass("_im_peer_tab", e).forEach(e => {
                            var n = q2ajx(attr(e, "href").split("?")[1]);
                            n.tab !== t.get().active_tab && attr(e, "href", `${Object(a.T)(t)}?sel=${n.sel}&tab=${t.get().active_tab}`)
                        })
                    }(e, t);
                    var r = gpeByClass("_im_right_menu", e);
                    $l(n, t).then(() => {
                        var e;
                        (e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab)) && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(r)
                    })
                },
                updateName(e, t) {
                    var n = ge("ui_rmenu_peer_" + e);
                    if (n) {
                        var r = geByClass1("_im_r_tx", n),
                            a = t.get().tabs[e].tab;
                        val(r, a)
                    }
                },
                updateCounter(e, t) {
                    var n = ge("ui_rmenu_peer_" + t);
                    if (n) {
                        var r = geByClass1("_im_r_ct", n),
                            a = e.get().tabs[t].unread;
                        val(r, a > 0 ? a : ""), toggleClass(n, "im-right-menu--unread", a > 0)
                    }
                },
                unmount() {
                    Object(o.c)(r), n.unmount()
                }
            }
        }

        function zl(e, t, n) {
            var i = P(e, h({
                    limit: 50,
                    offset: 0,
                    noScroll: !0,
                    elements: Rl(t)
                }), () => ({
                    idFn: e => e.peer || "000",
                    renderFn: function(e, t) {
                        if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
                        var n = `${Object(a.T)(e)}?sel=${t.peer}&tab=${e.get().active_tab}`,
                            r = Object(a.S)(t.peer, e),
                            i = r.tab;
                        return i = getTemplate("im_right_menu_ct", {
                            name: i,
                            count: r.unread > 0 ? r.unread : ""
                        }), getTemplate("im_right_menu_tpl", {
                            href: n,
                            label: i,
                            peer: t.peer,
                            attrs: `title="${stripHTML(r.tab)}"`,
                            cls: r.unread > 0 ? "im-right-menu--unread" : ""
                        })
                    }.bind(null, t)
                })),
                s = function(e, t, n, a) {
                    var i = gpeByClass("_im_peer_tab", a),
                        s = intval(domData(i, "list-id")),
                        o = e.get().tabbedPeers.filter(e => e.peer !== s);
                    return e.set(r.ed.bind(null, o, !0)).then(() => {
                        if ($l(t, e), s === e.get().peer) e.get().longpoll.push([Object(c.Hb)()]);
                        else if (0 !== e.get().peer) {
                            var n = gpeByClass("_im_right_menu", a);
                            uiRightMenu.hideSliding(n)
                        }
                    }), cancelEvent(n), !1
                }.bind(null, t, i),
                l = Object(o.a)({
                    handlers: (n, r) => {
                        r(e, "click", "_im_r_cl", s), r(e, "click", "_im_peer_tab", (e, n) => {
                            if (!checkEvent(e)) {
                                var r = intval(domData(n, "list-id"));
                                t.get().longpoll.push([Object(c.gb)(r, !1, !0, !0)]), cancelEvent(e)
                            }
                        }), m.g.forEach(r => {
                            n(geByClass1(`_ui_item_${r}`, e.parentNode), "mousedown", function(e, t, n) {
                                1 === n.which && (e.get().peer && e.get().longpoll.push([Object(c.Hb)()]), e.get().longpoll.push([Object(c.hb)(t)]), cancelEvent(n))
                            }.bind(null, t, r))
                        })
                    }
                });
            return Ul(e, 0, i, l)
        }
        var Kl = 5e3,
            Wl = 54e6,
            Vl = 72e5;

        function Gl(e) {
            var t = setInterval(function(e) {
                var t = e.get().tabs,
                    n = e.get().peer,
                    i = Object.keys(t).filter(t => Object(a.qb)(e, t) && intval(t) !== n).map(e => t[e]);
                i.filter(e => Date.now() - e.last_visited > Wl).forEach(t => e.set(r.u.bind(null, t.peerId))), i.filter(t => Object(a.qb)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > Vl).forEach(t => e.set(r.Cc.bind(null, t.peerId)))
            }.bind(null, e), Kl);
            return {
                unmount() {
                    clearInterval(t)
                }
            }
        }

        function Xl(e) {
            return e.which || e.keyCode
        }

        function Ql(e, t, n, r) {
            var i = Xl(r);
            if (!layers.visible) {
                if (i >= 49 && i <= 57 && (r.ctrlKey || r.metaKey && browser.mac) && Object(a.jb)(t)) return function(e, t) {
                    var n = e.get().tabbedPeers[t];
                    n && e.get().longpoll.push([Object(c.gb)(n.peer, !1, !0, !0)])
                }(t, i - 49), cancelEvent(r);
                inArray(i, m.A) && e.signal(i, r)
            }
        }

        function Yl(e, t) {
            var n = browser.mozilla ? "keydown" : "keypress",
                i = h({
                    signalTimer: !1
                }),
                s = function(e, t, n) {
                    !n || inArray(Xl(n), m.z) || Object(r.Y)(e.get().peer, e.get()) || Object(a.ob)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
                }.bind(null, e, t),
                c = Ql.bind(null, t, e, i),
                l = function(e, t, n) {
                    Xl(n) === m.e && e.signal(Xl(n), n)
                }.bind(null, t, i),
                d = Object(o.a)({
                    handlers: (e, t) => {
                        e(document, "keydown", c), e(document, "keyup", l), e(document, n, s)
                    }
                });
            return {
                unmount() {
                    Object(o.c)(d)
                }
            }
        }

        function Jl(e, t) {
            return -1 === (e ? e.indexOf(t) : 0) && (e.push(t), !0)
        }

        function Zl(e, t) {
            var n = e ? e.indexOf(t) : -1;
            return -1 !== n && (e.splice(n, 1), !0)
        }

        function ed(e, t, n, s, o, l) {
            var d = Object(i.u)(e, t);
            switch (n) {
                case c.t:
                case c.u:
                    return n === c.t ? Jl(d.adminIds, s) : Zl(d.adminIds, s), td(e, t, o), !0;
                case c.y:
                    return d.data.flags = s, td(e, t, o), !0;
                case c.B:
                    return delete d.pinHideId, cur.imDb.update(Ds.a, [d.peerId, void 0]), !1;
                case c.D:
                    return function(e, t, n) {
                        if (Object(a.Db)(n.get(), e)) {
                            var s = Object(i.u)(n, e);
                            Jl(s.memberIds, t) && s.membersCount++, -1 === s.data.active.indexOf(t) && s.data.active.push(t), t === vk.id && (s.data.kicked = 0, s.data.closed = 0)
                        }
                        return n.set(r.hb.bind(null, {
                            [e]: [t]
                        })).then(a => {
                            if (t === vk.id && n.get().peer === e) return Promise.all([n.set(r.Q.bind(null, e)), n.set(r.lb.bind(null, e))])
                        })
                    }(t, s, e).then(() => (nd(e, t, o, l), o.fixKeyboard())), !0;
                case c.F:
                case c.E:
                    return function(e, t, n, s, o) {
                        if (Object(a.Db)(s.get(), e)) {
                            var c = Object(i.u)(s, e);
                            Zl(c.memberIds, t) && c.membersCount--, c.data.active = c.data.active.filter(e => e !== t), t === vk.id && (n ? c.data.kicked = 1 : c.data.closed = 1)
                        }
                        return t === vk.id && s.get().peer === e ? (o.cancelEditing(), s.set(r.Oc.bind(null, e))) : Promise.resolve()
                    }(t, s, n === c.E, e, o).then(() => nd(e, t, o, l)), e.get().id !== s && (Object(i.k)(e, t) || {}).author_id !== s || e.set(r.z.bind(null, t)).then(() => o.fixKeyboard()), !0;
                case c.w:
                    return e.set(r.fb.bind(null, t)).then(() => o.updateBanner(e)), !0;
                case c.z:
                case c.A:
                    return !0;
                default:
                    return !1
            }
        }

        function td(e, t, n) {
            e.get().peer === t && (Object(r.oc)(e.get()), n.updateActions(e))
        }

        function nd(e, t, n, a) {
            e.get().peer === t && (Object(r.oc)(e.get()), n.updateChat(e, t), a.updateDialog(t, e))
        }
        var rd = n("gF8j");

        function ad(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var id = 30,
            sd = 400,
            od = 250,
            cd = 32,
            ld = 5 * cd + 24 + 52,
            dd = 3 * cd + 24,
            ud = 10,
            md = "._im_aside_notice";

        function pd(e, t) {
            "spam" === t ? Object(a.yc)(e, Mc, {}) : "fav" === t && Object(a.qc)(e, {}, cc, {})
        }

        function gd(e, t) {
            if (e.get().gid) {
                var n = t.parentNode,
                    r = geByClass("_im_right_menu_counter", n),
                    a = e.get().dialog_tab_cts;
                r.forEach(e => {
                    var t = domData(e, "tab");
                    val(e, a[t] || "")
                })
            }
        }

        function hd(e, t, n, i, s) {
            e.forEach(e => {
                switch (e.kludges.source_act) {
                    case a.d:
                    case a.e:
                        ! function(e, t, n, a) {
                            t.set(r.Rc.bind(null, e)).then(() => {
                                var r = e.kludges.source_act;
                                n.updateDialog(e.peerId, t), a.updateChatPhoto(e, r, t)
                            })
                        }(e, t, n, i)
                }
            })
        }

        function _d(e, t) {
            var n = e.get().longpoll.push.bind(null, [c.Hb()]),
                r = () => {
                    var a = e.get().selectedMessages;
                    a && a.length ? (e.setState({
                        selectedMessages: []
                    }).then(() => {
                        t.changedMessageSelection(e), t.cleanSelection(a)
                    }), setTimeout(() => cancelStackPush("im_peer", r), 0)) : n()
                };
            cancelStackPush("im_peer", r)
        }

        function bd(e) {
            var t = e.attaches.filter(e => "sticker" !== e.type);
            return Object(s.l)(e) || 0 === t.length
        }

        function fd(e, t, n) {
            addClass(n, "im-page_history-show"), t.loadingPeer(e)
        }

        function vd(e, t) {
            var n = function(e, t) {
                var n = document.querySelector(md),
                    r = Object(a.kb)(e) ? ld : dd,
                    i = n ? n.offsetHeight : 0;
                return r += ud, r += i, Math.floor((t.offsetHeight - r) / cd)
            }(e, t);
            if (e.get().tabbedPeers.length > n) {
                var i = e.get().tabbedPeers.filter(t => {
                        var n = t.peer;
                        return intval(n) !== e.get().peer
                    }).map(t => {
                        var n = t.peer;
                        return e.get().tabs[n]
                    }).sort((e, t) => t.last_touched - e.last_touched),
                    s = [];
                0 !== e.get().peer && s.push(e.get().tabs[e.get().peer]);
                var o = s.concat(i).slice(n).map(e => e.peerId),
                    c = e.get().tabbedPeers.filter(e => !inArray(e.peer, o));
                return e.set(r.ed.bind(null, c, !0))
            }
            return Promise.resolve(e)
        }

        function yd() {
            for (var e = curBox(); e;) e.hide(), e = curBox()
        }

        function jd(e, t, n, s, o, c, l, d, u) {
            e.get().audio_msg.isRecording && e.set(r.l).then(() => {
                s.cancelRecording()
            }), AudioMessagePlayer.detachPlayer(), Object(i.y)(e) && s.cancelEditing(), Object(i.O)(e) && t.cancelSearch && (o.clearSearch(e), n.restoreDialogs(e), u().toggleSettingsButton(e, !1)), Od(e, d, u), fd(e, s, c);
            var m = e.get().peer;
            Object(r.ad)(e.get()), Object(r.id)(), Object(a.qb)(e, t.peerId) && (t.msgid && !Object(i.n)(e, t.peerId, t.msgid) || !t.msgid && !Object(i.n)(e, t.peerId, Object(i.u)(e, t.peerId).lastmsg) || Object(i.u)(e, t.peerId).skipped) && e.mutate(e => Object(i.R)(e, t.peerId));
            var g = e.set(r.p.bind(null, t.peerId, t.msgid, t.entryPoint)).then(e => {
                var n = e.get(),
                    a = r.sb.bind(null, t.peerId, !1, t.msgid, !1, n);
                return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(a)
            }).then(() => {
                n.selectPeer(t.msgid, e),
                    function(e, t) {
                        Object(a.zb)(e) && (cancelStackFilter("forward"), e.set(r.K.bind(null, e.get().pendingForward, Object(i.v)(Object(i.u)(e, t)), !1)))
                    }(e, e.get().peer), window.tooltips && tooltips.hideAll(), yd(), s.preparePeer(e), _d(e, s), Object(a.jb)(e) && (n.deactivate(), vd(e, c).then(() => l.updateMenu(e)), Object(a.Mc)(e))
            });
            return (g = t.msgid ? g.then(() => e.set(r.kc.bind(null, t.peerId === m, m))) : g.then(() => e.set(r.jc.bind(null, !0)))).then(() => {
                if (e.get().peer === t.peerId) {
                    if (t.forward) {
                        var n = e.get().tabs[e.get().peer];
                        !n.scrollBottom && n.unread && e.set(r.Fb.bind(null, e.get().peer))
                    }
                    Object(a.jb)(e) && l.updateMenu(e), s.changePeer(e, !1), s.updateTyping(t.peerId, e), Object(r.ad)(e.get())
                }
            }).catch(e => Object(p.a)("applyNewPeer", e))
        }

        function Od(e, t, n) {
            t && e.get().shown && (t.hide(e), n().createCanceled(e))
        }

        function wd(e, t, n) {
            Object(i.O)(e) && (t.clearSearch(e), n.restoreDialogs(e))
        }

        function kd(e, t, n, i, s, o, c) {
            Object(a.jb)(e) && (s.saveScroll(e), o.saveScroll(e)), i.rotateCross(e), addClass(c, "im-page_creating"), e.setState({
                isCreating: !0
            }), n && n.show(e, t), Object(a.jb)(e) && (setStyle(c, {
                height: xd(c, e).page
            }), setTimeout(function() {
                addClass(c, "im-page_cropped")
            }, 200)), Object(r.Ic)(!0)
        }

        function Cd(e, t, n, r) {
            Object(a.Db)(e.get(), r) && (t.updateTyping(r, e), n.updateTyping(r, e))
        }

        function Sd(e, t, n, i, s) {
            i.activityType || (i.activityType = s);
            var o = e => Cd(e, t, n, i.peerId);
            Object(a.Cb)(i.peerId, e.get().gid) || (e.set(r.pc.bind(null, i, s)).then(o), e.set(r.jd.bind(null, i, s)).then(o))
        }

        function Ed(e, t) {
            t ? e.classList.add("im-page_reconnecting") : e.classList.remove("im-page_reconnecting")
        }

        function Id(e, t, n, l, d, u, p, g, h, _, b, f, v, y, j, O, w, k, C, S, E) {
            return {
                changePeer(e, n) {
                    t.selectPeer(e, n)
                },
                cancelSearch(e) {
                    wd(e, l, t)
                },
                loadingPeer(e) {
                    fd(e, n, d)
                },
                restoreDialogs(e, n, r) {
                    t.restoreDialogs(e, n, r)
                },
                toggleSettingsButton(e, t) {
                    b.toggleButton(e, t)
                },
                focusSearch(e) {
                    l.focusInput(e)
                },
                appendSearch(e, n, r, a) {
                    t.appendSearch(e, n, r, a)
                },
                appendDialogs(e, n) {
                    t.appendDialogs(e, n)
                },
                showCreation(e, r) {
                    kd(e, r, _, l, t, n, d)
                },
                updateState(e, r) {
                    t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
                },
                appendFastDialogs(e, n) {
                    t.appendFastDialogs(e, n, !0)
                },
                createCanceled(e, r) {
                    l.createCanceled(e, r), Object(a.jb)(e) ? (setStyle(d, {
                        height: "auto"
                    }), removeClass(d, "im-page_cropped"), setTimeout(() => l.focusInput(e), 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(() => {
                        0 === e.get().peer ? l.focusInput(e) : n.focustTxt(e)
                    }, 0), removeClass(d, "im-page_creating"), e.setState({
                        isCreating: !1
                    })
                },
                updateMenu(e) {
                    O && O.updateMenu(e)
                },
                goToHistoryEnd() {
                    n.goToEnd()
                },
                updateDialog(e, n) {
                    t.updateDialog(e, n)
                },
                focusTxt(e) {
                    n.focustTxt(e)
                },
                resync(e) {
                    Object(i.O)(e) && l.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), _ && _.hide(e), Object(a.kb)(e) && gd(e, d), Object(a.jb)(e) && (e.get().tabbedPeers.forEach(t => {
                        var n = t.peer;
                        O.updateCounter(e, n), O.updateName(n, e)
                    }), Object(a.Mc)(e)), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), Object(a.Ab)(e.get().peer) || n.changePeer(e, !1);
                    var r = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                    handlePageCount(r, e.get().unread_cnt)
                },
                toggleSettingsLoader(e, t) {
                    b.toggleLoader(e, t)
                },
                onUserActions(e, t) {
                    if (!Object(r.Y)(e.get().peer, e.get())) {
                        var s = e.get(),
                            o = s.peer;
                        if (Object(a.qb)(s, o))
                            if (!u.is_idle)
                                if (Object(i.b)(e.get().peer, e.get()) > 0) !s.tabs[o].skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(r.Fb.bind(null, o)))
                    }
                },
                removeSelection(e) {
                    t.removeSelection(e), l.focusInput(e)
                },
                route(e, i, s, o) {
                    if (void 0 !== e[0]) return !0;
                    e.box && (e = {
                        box: e.box
                    });
                    var u = !1;
                    return !(!e.invite_chat_id || !s.invite_hash) || (o && o.params && "left_nav" === o.params._ref && void 0 === e.sel && t.scrollUp(!0, !0), Object.keys(e).sort().forEach(e => {
                        switch (e) {
                            case "sel":
                                s.q || (u = !0);
                                var p = s.sel ? Object(a.Jc)(s.sel) : 0,
                                    g = o.back;
                                0 === p ? f.get().longpoll.push([c.Hb(!1, g)]) : p !== f.get().peer && f.get().longpoll.push([c.gb(p, s.msgid || !1)]);
                                break;
                            case "invite_chat_id":
                            case "invite_hash":
                                ! function(e) {
                                    e.set(r.db)
                                }(f);
                                break;
                            case "tab":
                                Od(f, _, h), u = !0;
                                var b = s.tab || m.h;
                                f.get().longpoll.push([c.hb(b)]);
                                break;
                            case "act":
                                s.act && "create" === s.act ? kd(f, [], _, l, t, n, d) : function(e, t, n, r) {
                                    n && n.hide(e, t)
                                }(f, [], _);
                                break;
                            case "st":
                                s.st && s.sel ? (curBox() && curBox().hide(), f.mutate(r.vc.bind(null, unescape(s.st), s.sel)), n.startSearch(f)) : (f.mutate(r.m.bind(null, i.sel)), n.cancelSearch(f, !0));
                                break;
                            case "q":
                                s.q ? (curBox() && curBox().hide(), l.setSearch(f, s.q, !0)) : l.clearSearch(f);
                                break;
                            case "box":
                                pd(f, s.box)
                        }
                    }), Object(a.jb)(f) && void 0 === e.sel && O.updateMenu(f), u && wd(f, l, t), !1)
                },
                updateDialogFilters(e) {
                    Object(i.O)(e) || t.restoreDialogs(e), b.updateFilter(e)
                },
                removePeer(e, n) {
                    t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([c.Hb()]), Object(a.jb)(e) && O.updateMenu(e)
                },
                newMessage(e) {
                    Object(a.jb)(e) || t.scrollUp(!0)
                },
                onEvents(e, o) {
                    var u = function(e) {
                            for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== c.bb || t ? e[n].type === c.bb && e.splice(n, 1) : t = !0;
                            return e
                        }(o.filter(e => e.type !== c.a || !(e.flags & c.o))),
                        f = o.filter(s.l),
                        y = o.filter(e => e.type === c.a);
                    hd(f, e, t, n);
                    var j = Object(r.s)(f, y, e),
                        w = Promise.resolve();
                    j.shouldLoad && (w = e.set(r.rb.bind(null, j, p))), w.then(() => {
                        u.forEach(o => {
                            switch (o.type) {
                                case c.a:
                                    var u = Object(i.u)(e, o.peerId),
                                        p = !u || !u.msgs || 0 == u.msgs.length,
                                        f = Object(a.nb)(o, e.get()),
                                        y = Object(i.B)(e, o.peerId);
                                    if (!e.get().isIncomingMessageRequestsAllowed && Object(i.U)(u)) break;
                                    var j = null;
                                    if (o.kludges.keyboard) {
                                        var w = Object.assign(o.kludges.keyboard, {
                                            author_id: o.userId
                                        });
                                        j = e.set(r.wc.bind(null, o.peerId, w))
                                    } else {
                                        var k = Object(i.k)(e, o.peerId);
                                        k && k.one_time && k.author_id !== Object(s.a)(e, o) && (j = e.set(r.z.bind(null, o.peerId)))
                                    }
                                    if (o.peerId === Object(i.p)(e) && j && j.then(() => n.fixKeyboard()), 0 === f) e.set(r.h.bind(null, o)), vd(e, d),
                                        function(e, t) {
                                            var n = e.get().tabs[t.peerId],
                                                a = e.get().active_tab;
                                            return a === m.h || Object(r.H)(a)(n)
                                        }(e, o) && (Object(i.U)(u) || (o.flags & c.m || e.set(r.Tc.bind(null, o.peerId, !0)), function(e, t) {
                                            var n = t.flags & c.m,
                                                r = inArray(t.peerId, e.get().mutedPeers),
                                                i = t.flags & c.j,
                                                s = e.get().gid;
                                            if (!n && !r && !i) {
                                                var o, l, d = function(e, t) {
                                                        return t < 2e9 && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
                                                    }(t.subject, t.peerId) || "",
                                                    u = (d ? d + " " : "") + t.text || "",
                                                    m = t.userId,
                                                    p = t.peerId,
                                                    g = e.get().tabs[p];
                                                if (t.kludges && t.kludges.source_act && (u = stripHTML(Object(a.dc)(e, t, g, !1))), (!e.get().notify_msg && !Object(a.ib)(p) || s && !e.get().mute) && window.Notifier && Notifier.playSound({
                                                        author_id: p
                                                    }), !Object(a.ib)(p)) return;
                                                u = trim(replaceEntities(stripHTML(u.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), u = Object(Ns.f)(u, (e, t, n, r, a) => a), Object(a.ib)(p) ? (o = Object(L.c)(e, m).name, g.tab && (o += " » " + g.tab), l = Object(L.c)(e, m).photo) : (o = g.tab, l = g.photo);
                                                var h = t.attaches[0];
                                                if (h && "mail" === h.type) u += "\n[" + getLang("mail_added_msgs") + "]";
                                                else if (h) {
                                                    var _ = "doc" === h.type && "graffiti" === h.kind ? "graffiti" : h.type;
                                                    u += "\n[" + getLang("mail_added_" + _) + "]"
                                                }
                                                o = trim(replaceEntities(stripHTML((o || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                                                    id: t.messageId,
                                                    text: u,
                                                    author_id: p,
                                                    title: o,
                                                    author_photo: l
                                                })
                                            }
                                        }(e, o)), t.updateTyping(o.peerId, e), Object(i.O)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o.peerId)), !1 === Object(i.B)(e, o.peerId) && !0 === y && n.updateActions(e), Object(a.jb)(e) && (O.updateCounter(e, o.peerId), O.updateMenu(e)), e.set(r.Pc.bind(null, o)).then(Cd.bind(null, e, n, t, o.peerId)), n.addMessage(e, o), Object(a.jb)(e) || b.updateFilter(e), bd(o) || !Object(a.qb)(e, o.peerId) || o.local || e.set(r.pb.bind(null, o)).then(e => {
                                            n.replaceAttachmentPlaceholders(e, o), Object(r.id)()
                                        }), Object(fe.m)(e, o, "send", "opt_to_lp");
                                    else 2 === f ? (bd(o) || e.set(r.pb.bind(null, o)).then(e => {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    }), e.set(r.Pb.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e), o.randomId && Object(fe.l)(e, o, "send", "opt_to_lp")) : Object(i.O)(e) || t.promoteDialog(e, o.peerId);
                                    Object(i.U)(u) && Object(a.E)(e, t.update), u && p && u.peerId === Object(i.p)(e) && S();
                                    break;
                                case c.g:
                                case c.R:
                                    e.set(r.F.bind(null, o)).then(e => {
                                        t.updateDialog(o.peerId, e), n.updateTyping(o.peerId, e), n.editMessage(e, o), bd(o) || !Object(a.qb)(e, o.peerId) || o.local || e.set(r.pb.bind(null, o)).then(e => {
                                            n.replaceAttachmentPlaceholders(e, o)
                                        })
                                    });
                                    break;
                                case c.J:
                                    e.set(r.wb.bind(null, o)).then(e => {
                                        t.updateCounter(e, o.peerId), n.updateGoToEnd(e, !0), Object(a.jb)(e) && O.updateCounter(e, o.peerId), Object(i.O)(e) || t.restoreDialogs(e), b.updateFilter(e)
                                    });
                                    break;
                                case c.K:
                                    e.set(r.xb.bind(null, o)).then(e => {
                                        t.updateCounter(e, o.peerId), n.markMessagesAsRead(e, o)
                                    });
                                    break;
                                case c.bb:
                                    e.set(r.gd.bind(null, o.count)).then(() => {
                                        var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                        handlePageCount(t, o.count), b.updateFilter(e), Object(a.jb)(e) && gd(e, d)
                                    });
                                    break;
                                case c.s:
                                case c.r:
                                    var C = o.type === c.s;
                                    e.set(r.cd.bind(null, o.userId, !!C && o.platform, o.lastSeenTs)).then(e => {
                                        Object(a.Db)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                    });
                                    break;
                                case c.Y:
                                case c.Q:
                                case c.U:
                                    if (!(o.flags & c.j || o.flags & c.n) || o.type !== c.Y || Object(a.gb)(e, o.peerId, o.messageId) || e.get().blockedFlagUpdates[o.peerId] || g(o), o.flags === c.l) {
                                        var E = o.type === c.Y;
                                        e.set(r.Zc.bind(null, E ? 1 : -1, o.messageId)).then(() => {
                                            Object(a.jb)(e) || l.updateImportantCnt(e)
                                        }), e.set(r.Uc.bind(null, [o.messageId], o.peerId, E)).then(() => {
                                            n.markImportant(o.messageId, E, e)
                                        })
                                    }
                                    break;
                                case c.N:
                                    Sd(e, n, t, o, r.c);
                                    break;
                                case c.ab:
                                    Sd(e, n, t, o, r.d);
                                    break;
                                case c.I:
                                    ! function(e, t, n, a) {
                                        e.set(r.yc.bind(null, n, a)).then(t().updateState.bind(null, n))
                                    }(e, h, o.peerId, 0 !== o.disabledUntil);
                                    break;
                                case c.W:
                                    e.get().longpoll.pause(), e.set(r.Yb).then(h().resync).then(() => e.get().longpoll.resume());
                                    break;
                                case c.Z:
                                    v.transition(o.state);
                                    break;
                                case c.V:
                                    if (o.removeActivePeer) {
                                        var I = e.get().tabbedPeers.filter(t => {
                                            var n = t.peer,
                                                r = t.type;
                                            return n !== e.get().peer && "perm" === r
                                        });
                                        e.setState({
                                            tabbedPeers: I
                                        })
                                    }! function(e, t, n, s) {
                                        e.set(r.l).then(() => {
                                            n.cancelRecording()
                                        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(s, "im-page_history-show"), n.stopLoading(), Object(i.y)(e) && n.cancelEditing();
                                        var o = e.get().peer;
                                        e.set(r.p.bind(null, 0, !1, !1)).then(() => {
                                            window.tooltips && window.tooltips.hideAll(), yd(), Object(a.jb)(e) && t.activate(), n.changePeer(e), Object(a.jb)(e) && t.restoreScroll(e), setTimeout(() => {
                                                e.get().longpoll.push([c.Lb("search")])
                                            }, 13), Object(a.tb)(e) && Object(a.yb)(o, e) && e.set(r.Hb.bind(null, o))
                                        })
                                    }(e, t, n, d), o.cancelSearch && wd(e, l, t), Object(a.jb)(e) && O.updateMenu(e), l.focusInput(e);
                                    break;
                                case c.c:
                                    Object(a.C)(o.tab, e, h, r.o).then(e => {
                                        b.updateFilter(e)
                                    });
                                    break;
                                case c.T:
                                case c.X:
                                case c.P:
                                    if (o.mask === c.p) break;
                                    e.set(r.Wc.bind(null, o.peerId, o.mask, o.type, o.local)).then(e => {
                                        Object(i.O)(e) || o.type === c.T && o.mask === c.q || o.type === c.P || t.restoreDialogs(e), t.updateDialog(o.peerId, e), gd(e, d), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                    });
                                    break;
                                case c.f:
                                    e.set(r.B.bind(null, o.peerId, Promise.resolve([]))).then(() => {
                                        h().removePeer(e, o.peerId), h().updateDialogFilters(e)
                                    });
                                    break;
                                case c.b:
                                    jd(e, o, t, n, l, d, O, _, h);
                                    break;
                                case c.H:
                                    var x = {
                                            [o.peerId]: o
                                        },
                                        T = Object(a.xb)(o.peerId, e);
                                    e.set(r.Qc.bind(null, x)).then(() => {
                                        t.updateDialog(o.peerId, e);
                                        var r = Object(a.xb)(o.peerId, e);
                                        Object(a.qb)(e.get(), o.peerId) && T !== r && n.updateChat(e, o.peerId)
                                    });
                                    break;
                                case c.i:
                                    e.set(r.xc.bind(null, o.peer, o.message)).then(() => {
                                        n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                    });
                                    break;
                                case c.S:
                                    var P = o.message.messageId;
                                    e.set(r.Qb.bind(null, o.peerId, P, o.message)).then(() => {
                                        n.resendMessage(o.peerId, P), t.promoteDialog(e, o.peerId)
                                    });
                                    break;
                                case c.e:
                                    if (Object(a.Db)(e.get(), o.peerId)) ed(e, o.peerId, o.updateType, o.updateArg, n, t) || h().reloadChatInfo(o.peerId);
                                    Object(i.I)(o) && e.set(r.bd.bind(null, o)).then(() => {
                                        Object(a.Mc)(e), Object(a.E)(e, t.update)
                                    });
                                    break;
                                case c.db:
                                    setTimeout(() => {
                                        Ed(d, !0), n.setNetworkWaitingStatus(o.timeout - 1)
                                    }, 1e3);
                                    break;
                                case c.M:
                                    Ed(d, !0), n.setNetworkReconnectingStatus();
                                    break;
                                case c.L:
                                    Ed(d, !1), setTimeout(n.clearNetworkStatus, 0)
                            }
                        })
                    })
                },
                updateHistory: e => n.updateHistory(e),
                reloadChatInfo(e) {
                    Object(a.Db)(f.get(), e) && f.set(r.gb.bind(null, e)).then(() => (function(e, t, n, i, s) {
                        i.updateChatTopic(t, e), Object(a.jb)(e) && s.updateName(t, e), e.get().peer == t && (Object(r.oc)(e.get()), i.updateActions(e))
                    })(f, e, 0, n, O))
                },
                cancelRecording: () => f.set(r.l).then(() => n.cancelRecording()),
                fixHeight() {
                    S()
                },
                unmount() {
                    Object(o.c)(e), clearInterval(f.get().update_title_to), u.stop(), E(), t.unmount();
                    var i = window.devicePixelRatio >= 2 ? "_2x" : "";
                    setFavIcon("/images/icons/favicons/fav_logo" + i + ".ico"), n.unmount(), l.unmount(), cancelStackFilter("im_peer"), b.unmount(), _ && _.unmount(), O && O.unmount(), w && w(), y && y(), Object(a.tb)(f) && f.get().peer && f.set(r.Hb.bind(null, f.get().peer)), k.unmount(), O && O.unmount(), C.unmount(), clearInterval(j), cur.imDb.unmount(), cur.imDb = !1
                }
            }
        }

        function xd(e, t) {
            var n = ge("page_header"),
                r = geByClass1("_im_page_history", e),
                i = window.clientHeight() - n.offsetHeight - id - 2,
                s = Object(a.jb)(t) ? od : sd,
                o = {
                    page: Math.max(i, s)
                };
            if (Object(a.jb)(t)) {
                var c = Object(a.V)();
                c = c > 0 ? Math.min(c - n.offsetHeight - id - 2, i) : i;
                var l = hasClass(r, "im-page--history_empty-hist") ? c : i;
                o.history = Math.max(c, s), o.chat = Math.max(l, s)
            }
            return o
        }

        function Td(e, t, n, i, s) {
            var o = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                c = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
            if (!isFullScreen()) {
                var l = xd(e, t);
                if (setStyle(e, {
                        minHeight: l.page
                    }), Object(a.jb)(t) && (void 0 === t.get().chatResizeInitialized && t.set(r.U), setStyle(e, {
                        height: t.get().isCreating ? l.page : "auto"
                    }), setStyle(geByClass1("_im_page_dialogs", e), {
                        minHeight: l.page,
                        position: "static",
                        top: 0
                    }), setStyle(geByClass1("_im_page_history", e), {
                        minHeight: l.history,
                        position: "relative",
                        top: 0
                    }), setStyle(geByClass1("_im_chat_body_abs", e), {
                        minHeight: l.chat,
                        height: l.chat,
                        position: "relative",
                        top: 0
                    })), browser.safari && c && "function" == typeof c && c(), i && i.updateScroll(), s && s.updateScroll(), n) {
                    var d = n.updateScroll();
                    n.scrollFix(t, t.get().peer, d)
                }
                o && setTimeout(() => Td(e, t, n, i, s, !1), 100)
            }
        }

        function Pd() {
            ! function(e) {
                var t = "safari-repaint";
                e.forEach(function(e) {
                    hasClass(e, t) && removeClass(e, t), addClass(e, t)
                }), setTimeout(function() {
                    e.forEach(function(e) {
                        removeClass(e, t)
                    })
                }, 100)
            }([geByClass1("_im_dialog_actions"), geByClass1("_im_chat_input_w"), ge("side_bar"), geByClass1("_im_right_menu"), geByClass1("_im_dialogs_settings"), geByClass1("_im_dialogs_search")])
        }

        function Md(e, t) {
            var n, s = t.get(),
                l = window.devicePixelRatio >= 2 ? "_2x" : "";
            setFavIcon("/images/icons/favicons/fav_im" + l + ".ico"), Td(e, t, !1, !1, !1, !0), show(e), Object(fe.c)();
            var d = Object(o.b)(Id),
                u = d.callMutations,
                m = d.bindMutations,
                g = s.useFcLongpoll && vk.lpConfig.enabled && Notifier.getLpInstance && Notifier.getLpInstance(),
                h = g ? Notifier.getLpInstance() : t.get().gid ? function(e) {
                    Object(p.b)("im_start_longpoll_group", {}, !1);
                    var t = Object(kl.a)(e.ts, e => {
                            r.trigger("data", e)
                        }),
                        n = Object(wl.a)(e, t.onLp),
                        r = new window.EventEmitter;
                    return {
                        onData: e => r.on("data", e),
                        offData: e => r.off("data", e),
                        push: e => r.trigger("data", e),
                        pause: t.pause.bind(t),
                        resume: t.resume.bind(t),
                        abortWaiting: n.abortWaiting.bind(n),
                        onLp: t.onLp.bind(t),
                        stop: n.stopConnection.bind(n),
                        isEnabled: () => !(!n || n.isStopped())
                    }
                }(s.lpConfig) : Hl(s);

            function f() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                u().onEvents(t, n)
            }
            h.onData(f), g && Object(p.b)("im_use_fc_longpoll", {}, !1);
            var v, y, j = geByClass1("_im_dialogs_search", e),
                O = geByClass1("_im_dialogs_settings", e),
                w = be(geByClass1("_im_page_dcontent", e), t, u),
                k = kc(j, t, u),
                C = qc(O, t, u),
                S = Gl(t);
            (cur.imDb = Object(Ds.c)(t.get().gid ? -t.get().gid : vk.id), t.set(r.Bb.bind(null, cur.imDb)), Object(a.jb)(t) && C.updateSettings(t), Object(a.jb)(t)) && (v = zl(geByClass1("_im_ui_peers_list", e.parentNode), t), y = function(e, t, n, r) {
                if (browser.mobile) return !1;
                var a = [t, n, geByClass1("_im_chat_input_w", r), geByClass1("_im_dialog_actions", r)],
                    i = null,
                    s = hasClass(e, "im-page--header_static"),
                    o = ge("im-group-online-disabled-notice");

                function c() {
                    var t = Object(b.b)("scrollLeft"),
                        n = hasClass(e, "im-page--header_static"),
                        r = [];
                    i !== t ? r = a.slice().concat([e]) : n !== s && (r = [e]), i = t, s = n, r.length > 0 && r.forEach(r => {
                        var a = e === r && n ? 0 : -t;
                        setStyle(r, {
                            [cssTransformProp]: 0 === a ? "unset" : "translateX(" + a + "px)"
                        })
                    })
                }
                return o && a.push(o), a = a.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", c), c(), () => {
                    removeEvent(window, "scroll", c)
                }
            }(j, O, geByClass1("_im_right_menu", e.parentNode), e));
            Object(a.jb)(t) && s.peer && w.deactivate(), s.gid || (n = vl(geByClass1("_im_dialogs_creation", e), t, u));
            var E = ec(geByClass1("_im_page_history", e), t, w, v, u),
                I = s.isCreating,
                x = I ? "create" : 0 === s.peer ? "search" : "default";
            I && n.show(t, []);
            var T = jl(t, x, w, E, k, n),
                P = Yl(t, T);
            E.updateScroll();
            var M = function(e, t, n, i) {
                var s = t.get();
                Object(a.Ab)(s.peer) || e().onUserActions(t, i), s.update_old_title && t.set(r.Tc.bind(null, !1, !1))
            }.bind(null, u, t, T);
            Object(a.Ab)(s.peer) || setTimeout(() => _d(t, E), 10);
            var L = new rd.a({
                    id: "im",
                    element: document,
                    focusElement: window,
                    triggerEvents: "mouseover mousedown keypress"
                }),
                B = debounce(Pd, 300),
                D = Td.bind(null, e, t, E, w, n, !1, B);
            t.setState({
                longpoll: h
            }), t.set(r.uc.bind(null, [])), L.on("unidle", function() {
                h.abortWaiting(), M()
            }), L.start(), nav.objLoc.box && (pd(t, nav.objLoc.box), Object(Bs.b)({
                box: null
            }));
            var N, A = function(e) {
                var t = e.get();
                return Object(a.tb)(e) ? Object(Fl.a)(t.mutex_key, function(e) {
                    t.longpoll.push([c.sb(e)])
                }, function(e, n) {
                    return Object(r.O)(t.gid).then(e => ad(e, 1)[0])
                }).stop : null
            }(t);
            if (Object(a.tb)(t) && (N = setInterval(a.z.bind(null, t, s.longpoll), 2e3)), t.get().invitation && Object(a.sc)(t, t.get().invitation, r.db), Object(a.jb)(t) && Object(i.d)(t)) {
                var q = document.getElementById("ui_rmenu_mr");
                q && q.classList.remove("unshown")
            }
            var H = Object(_.n)(function(e, t, n, a, s) {
                    var o = s.reduce((e, t) => (e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e), {});
                    Object.keys(o).forEach(s => {
                        var c = o[s];
                        e.set(r.Mb.bind(null, c, s)).then(() => e.set(r.Nb.bind(null, c, s))).then(() => t.removeMessages(c, +s, e)).then(() => {
                            var o = Object(i.u)(e, s);
                            o && c.some(e => e >= o.lastmsg) && Object(r.eb)(e, +s).then(() => {
                                n.promoteDialog(e, s), a && a.updateCounter(e, s), t.updateGoToEnd(e, !0)
                            })
                        })
                    })
                }.bind(null, t, E, w, v), 200),
                F = a.db.bind(null, t),
                R = a.bb.bind(null, t);
            return m(Object(o.a)({
                handlers: (t, n) => {
                    t(document, "mousemove mousedown keypress", M), t(window, "resize", D), n(e, "click", a.o, F), n(gpeByClass("_im-page-wrap", e), "click", a.m, R), n(gpeByClass("_im-page-wrap", e), "click", a.n, a.cb), n(gpeByClass("_im-page-wrap", e), "click", a.p, a.eb), browser.safari && t(document, "visibilitychange", Pd)
                }
            }), w, E, k, e, L, h, H, u, n, C, t, T, A, N, v, y, S, P, D, function() {
                g ? h.offData(f) : h.stop()
            })
        }
        var Ld, Bd, Dd = window,
            Nd = Dd.nav,
            Ad = Dd.setStyle,
            qd = Dd.getLang,
            Hd = "._im_sick_reload",
            Fd = "._im_sick_timer",
            Rd = 5e3,
            $d = 6e5,
            Ud = 30,
            zd = 400;

        function Kd(e) {
            var t = ge("page_header"),
                n = window.clientHeight() - t.offsetHeight - Ud - 2,
                r = zd;
            Ad(e, {
                height: Math.max(n, r)
            })
        }

        function Wd(e) {
            var t = Object(a.O)(Math.floor(Math.max(e, 0) / 1e3), !0);
            return t ? qd("mail_sick_timer").replace(/{timer}/gi, t) : ""
        }

        function Vd() {
            Nd.reload({
                force: !0
            })
        }

        function Gd(e) {
            return {
                unmount() {
                    clearInterval(Bd), clearTimeout(Ld), Object(o.c)(e)
                }
            }
        }

        function Xd(e, t, n) {
            Kd(e);
            var r = (0, Object(o.b)(Gd).bindMutations)(Object(o.a)({
                    handlers: (t, n) => {
                        t(e.querySelector(Hd), "click", Vd), t(window, "resize", Kd.bind(null, e))
                    }
                })),
                a = function() {
                    var e = localStorage.getItem("im_sick_timer"),
                        t = e ? Math.min(2 * parseInt(e), $d) : Rd;
                    return localStorage.setItem("im_sick_timer", t), t
                }(),
                i = e.querySelector(Fd),
                s = +new Date;
            return i.innerHTML = Wd(a), Bd = setInterval(() => {
                i.innerHTML = Wd(s + a - new Date)
            }, 500), Ld = setTimeout(Vd, a), r
        }
        var Qd = n("E2g8"),
            Yd = n("f4YT"),
            Jd = Qd.Promise;
        window.IM = {
            init(e) {
                if (window.imwl = e.imwl, Object(p.d)(), addTemplates(Yd), window.Promise || (window.Promise = Jd), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.failed) return Xd(geByClass1("im-sick", ge("page_body")));
                localStorage.removeItem("im_sick_timer"), e.tabbedPeers = (e.tabbedPeers || []).map(e => ({
                    peer: e,
                    type: "perm"
                })), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                    blacklist_hash: e.thash
                };
                var t = -10800 - 60 * (new Date).getTimezoneOffset(),
                    n = e.timeshift;
                e.timeshift = n - t, e.oCache = {}, e.ref_id = nav.objLoc.ref, e.ref_source = nav.objLoc.ref_source;
                var i = e.owners;
                e.owners = void 0;
                var s = h(e);
                i.forEach(e => Object(L.a)(s, e)), i = void 0, Object(a.Nb)(s, s.get().tabs), cur.imClassicInterface = Object(a.jb)(s);
                var o = Md(geByClass1("js-im-page", ge("page_body")), s);
                Object(r.ad)(s.get()), window.IMBRIDGE = {
                    chatPhotoSaved(e) {
                        curBox() && curBox().hide();
                        var t = (e || {})[1];
                        return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || s.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                    },
                    updateHistory(e) {
                        s.set(r.Yc.bind(null, e)).then(() => {
                            o.updateHistory(e)
                        })
                    },
                    syncHistory(e) {
                        isFunction(e) || (e = function() {}), s.set(r.Dc.bind(null, e)).then(() => {
                            o.syncHistory(e)
                        })
                    },
                    activateTab(e) {
                        s.get().gid || s.get().longpoll.push([Object(c.gb)(intval(e), !1, !1, !0)])
                    }
                };
                var l = !1;
                cur.nav.push(function() {
                    if (l) return !0;
                    s.get().audio_msg && s.get().audio_msg.isRecording && o.cancelRecording(), AudioMessagePlayer.detachPlayer();
                    var t = o.route.apply(null, arguments);
                    return !1 !== t && (o.unmount(), window.IMBRIDGE = void 0, s.unmount(), window.store = void 0, l = !0, e = !1, s = !1, o = !1, Object(p.e)()), t
                })
            }
        };
        try {
            stManager.done("imn.js")
        } catch (e) {}
    },
    "MV/q": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        n("ioFf"), n("rGqo"), n("Btvt"), n("91GP");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class o extends r.Component {
            constructor(e) {
                super(e), this.getRef = (e => {
                    this.element = e
                }), this.resize = (() => {
                    var e = this.element;
                    if (e) {
                        var t = e.offsetHeight,
                            n = e.scrollHeight,
                            r = 0;
                        n + r <= t && (r = 0), e.value && this.setState({
                            height: n - r
                        }), this.setState({
                            height: 0
                        }, () => {
                            var t = e.scrollHeight - r;
                            this.setState({
                                height: t
                            }), this.props.onResize(e)
                        })
                    }
                }), this.onChange = (e => {
                    this.props.grow && this.resize(), this.isControlledOutside || this.setState({
                        value: e.target.value
                    }), this.props.onChange && this.props.onChange(e)
                }), this.state = {
                    value: void 0 === e.value ? e.initialValue || "" : void 0
                }, void 0 !== e.value && (this.isControlledOutside = !0)
            }
            componentDidMount() {
                this.props.grow && this.resize()
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = (e.initialValue, e.grow, e.style),
                    o = (e.onResize, e.value),
                    c = s(e, ["className", "initialValue", "grow", "style", "onResize", "value"]),
                    l = this.isControlledOutside ? o : this.state.value,
                    d = this.state.height || n.height || 66;
                return r.createElement("textarea", i({}, c, {
                    value: l,
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    ref: this.getRef,
                    style: Object.assign({
                        height: d
                    }, n),
                    className: Object(a.a)("Textarea", t)
                }))
            }
        }
        o.defaultProps = {
            initialValue: "",
            grow: !0,
            onResize: () => {},
            style: {}
        }
    },
    MhhX: function(e, t, n) {
        "use strict";
        n.d(t, "n", function() {
            return i
        }), n.d(t, "l", function() {
            return s
        }), n.d(t, "e", function() {
            return o
        }), n.d(t, "k", function() {
            return c
        }), n.d(t, "c", function() {
            return l
        }), n.d(t, "g", function() {
            return u
        }), n.d(t, "d", function() {
            return m
        }), n.d(t, "m", function() {
            return p
        }), n.d(t, "f", function() {
            return g
        }), n.d(t, "i", function() {
            return h
        }), n.d(t, "j", function() {
            return _
        }), n.d(t, "o", function() {
            return b
        }), n.d(t, "h", function() {
            return f
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return y
        }), n.d(t, "p", function() {
            return j
        });
        n("OEbY");
        var r = n("f01n"),
            a = n("aong");

        function i(e, t) {
            return "number" != typeof t.messageId || (c(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function s(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function o(e) {
            return "call" == e.kludges.attach1_type
        }

        function c(e) {
            return e.flags & r.m
        }

        function l(e) {
            var t = e.attaches.filter(e => "mail" === e.type).length > 0;
            return e.attaches.filter(e => "reply" === e.type).length > 0 || e.flags & r.k && t
        }

        function d(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function u(e) {
            return d(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function m(e) {
            return Boolean(e.attaches.find(e => "doc" === e.type && "audiomsg" === e.kind))
        }

        function p(e) {
            return Boolean(e.attaches.find(e => "sticker" === e.type))
        }

        function g(e) {
            return d(e, "gift")
        }

        function h(e) {
            return d(e, "money_transfer", "money_request")
        }

        function _(e) {
            return d(e, "money_request")
        }

        function b(e) {
            return d(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function f(e) {
            return e.flags & r.l
        }

        function v(e) {
            return c(e) ? vk.id : e.userId
        }

        function y(e, t) {
            var n = Object(a.q)(e);
            return c(t) ? n.id : t.userId
        }

        function j(e) {
            return e.update_time > 0
        }
    },
    N1NS: function(e, t, n) {
        "use strict";
        n("rE2o"), n("ioFf"), n("rGqo"), n("Btvt"), n("KKXr");

        function r(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var a = new window.Map;

        function i(e) {
            var t = a.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var i, s = 0; s < n.length; s++) {
                        var o = r(n[s], 2),
                            c = o[0],
                            l = o[1],
                            d = void 0;
                        if (hasClass(e.target, c) ? d = l(e, e.target) : (i = gpeByClass(c, e.target, e.currentTarget)) && (d = l(e, i)), !1 === d) break
                    }
            }
        }
        n.d(t, "b", function() {
            return l
        }), n.d(t, "a", function() {
            return u
        }), n.d(t, "c", function() {
            return m
        });
        var s = window,
            o = s.addEvent,
            c = s.removeEvent;

        function l(e) {
            return {
                callMutations() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations() {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e(...arguments)
                }
            }
        }

        function d(e, t, n, r, s) {
            ! function(e, t, n, r) {
                var s = a.get(e);
                s || (a.set(e, {}), s = a.get(e));
                for (var o = t.split(" "), c = 0; c < o.length; c++) {
                    var l = o[c];
                    s[l] || (s[l] = [], addEvent(e, l, i)), s[l].push([n, r])
                }
            }(t, n, r, s), e._registeredHandlers.push(["delegate", t, n, r, s])
        }

        function u(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                o(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), d.bind(null, t)), t
        }

        function m(e) {
            e._registeredHandlers.forEach(e => {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, n, r) {
                    var s = a.get(e);
                    s && (t.split(" ").forEach(t => {
                        s[t] && (s[t] = s[t].filter(e => e[0] !== n || e[1] !== r), 0 === s[t].length && removeEvent(e, t, i))
                    }), 0 === Object.keys(s).map(e => s[e].length).reduce((e, t) => e + t) && a.delete(e))
                }(...t) : c(...t)
            }), e._registeredHandlers = []
        }
    },
    NsuH: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR")),
            i = n("BN/X"),
            s = "/images/camera_c.gif";
        class o extends r.PureComponent {
            constructor(e) {
                super(e), this.onError = (() => {
                    this.setState({
                        errored: !0
                    })
                }), this.state = {}
            }
            getPhotoImage() {
                var e = this.props,
                    t = e.size,
                    n = e.photo,
                    a = e.title;
                return r.createElement("img", {
                    width: t,
                    height: t,
                    src: this.state.errored ? s : n,
                    alt: a,
                    onError: this.onError,
                    className: "Entity__photo"
                })
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.style,
                    s = e.size,
                    o = e.photo,
                    c = e.href,
                    l = e.title,
                    d = e.description,
                    u = e.target,
                    m = {
                        [`Entity--size${s}`]: !!s
                    };
                return r.createElement("div", {
                    className: Object(a.a)("Entity", t, m),
                    style: n
                }, r.createElement("div", {
                    className: "Entity__aside"
                }, "string" == typeof o ? c ? r.createElement("a", {
                    href: c
                }, this.getPhotoImage()) : this.getPhotoImage() : o), r.createElement("div", {
                    className: "Entity__main"
                }, l && c ? r.createElement("div", {
                    className: "Entity__title"
                }, r.createElement(i.a, {
                    href: c,
                    dangerouslySetInnerHTML: {
                        __html: l
                    },
                    target: u
                })) : r.createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: l
                    }
                }), "string" != typeof d ? r.createElement("div", {
                    className: "Entity__description"
                }, d) : r.createElement("div", {
                    className: "Entity__description",
                    dangerouslySetInnerHTML: {
                        __html: d
                    }
                })))
            }
        }
        o.defaultProps = {
            size: null,
            photo: "",
            title: "",
            description: "",
            href: "",
            target: null
        }
    },
    O8ze: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return s
        }), n.d(t, "g", function() {
            return o
        }), n.d(t, "d", function() {
            return c
        }), n.d(t, "f", function() {
            return l
        }), n.d(t, "k", function() {
            return u
        }), n.d(t, "m", function() {
            return m
        }), n.d(t, "l", function() {
            return p
        }), n.d(t, "h", function() {
            return g
        }), n.d(t, "i", function() {
            return _
        }), n.d(t, "j", function() {
            return b
        }), n.d(t, "c", function() {
            return f
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return y
        });
        n("pIFo");
        var r = n("1y80"),
            a = n("aong"),
            i = {};

        function s(e) {
            Object(r.b)(.1, "im_forward_stat", d(e), !!e.get().gid)
        }

        function o(e, t) {
            Object(r.b)(.1, "im_forward_from_community_stat", d(e), !!e.get().gid, +t)
        }

        function c() {
            Object(r.b)(1, "im_apply_community_template_stat", 1)
        }

        function l() {
            Object(r.b)(1, "messages_channel_forward_click", 1)
        }

        function d(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function u(e, t, n) {
            var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(r.a)(1)) return () => {};
            var i = +new Date,
                s = h(e);
            return function() {
                var e = +new Date - i;
                Object(r.c)("messages_send_time_web", e, t, n, s, a)
            }
        }

        function m(e, t, n, r) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var a = [t.messageId.replace("rid", ""), n, r].join("_"),
                    s = t.attaches.length > 0;
                i[a] = u(e, n, r, s)
            }
        }

        function p(e, t, n, r) {
            var a = [t.randomId, n, r].join("_"),
                s = i[a];
            s && (s(), delete i[a])
        }

        function g(e, t, n, a) {
            var i = h(e),
                s = "" === t ? "network" : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_errors_web", s, n, a, i)
        }

        function h(e) {
            var t = Object(a.q)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function _(e) {
            var t = Object(a.q)(e),
                n = t.imQueue(t.peer).length;
            Object(r.a)(1) && Object(r.c)("messages_send_queue_size", n)
        }

        function b(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_retry", 1, t, e)
        }

        function f() {
            var e = "im_browser_notifications_users";
            ls.get(e) || ls.get("im_ui_notify_off") || (ls.set(e, 1), Object(r.c)(e, 1))
        }

        function v() {
            Object(r.b)(1, "im_browser_notifications_on", 1)
        }

        function y() {
            Object(r.b)(1, "im_browser_notifications_off", 1)
        }
    },
    "P+eJ": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return u
        });
        var r = n("ERyv");

        function a(e, t) {
            if (window.vk.lpConfig.debug) {
                for (var n = `background: ${e}; color: white`, r = new Date, a = e => e < 10 ? "0" + e : e, i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++) s[o - 2] = arguments[o];
                console.log(`%c ${r.getHours()}:${a(r.getMinutes())}:${a(r.getSeconds())}:${r.getMilliseconds()} ${t} `, n, ...s)
            }
        }

        function i() {
            return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
        }

        function s() {
            return window.lpBufferIm || (window.lpBufferIm = []), window.lpBufferIm
        }

        function o(e, t) {
            window.lpWeird || (window.lpWeird = []), window.lpWeird.push({
                msg: e,
                ev: t,
                is_master: window.curNotifier.is_server
            }), setTimeout(c, 1e4)
        }

        function c() {
            window.lpWeird.length && (Object(r.b)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function l() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function d() {
            l() && (s().forEach(e => {
                    !i().find(t => e.ev === t.ev) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, a("red", "im not fc", e.ev), Object(r.c)() && o("im not fc", e.ev))
                }), i().forEach(e => {
                    var t = s().find(t => t.ev === e.ev);
                    t && t.warned && !e.warned && (e.warned = !0, a("red", "now fc like im", e.ev), Object(r.c)() && o("now fc like im", e.ev))
                })),
                function() {
                    var e = Date.now() - 3e4;
                    window.lpBufferFc = i().filter(t => t.time > e), window.lpBufferIm = s().filter(t => t.time > e)
                }()
        }

        function u(e) {
            l() && (i().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 0)), a("green", "fc", ...e)
        }
        window.longpollTesting_onImEvents = function(e) {
            l() && (s().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 1100)), a("blue", "im", ...e)
        }
    },
    P13b: function(e, t, n) {
        "use strict";
        n("rE2o"), n("ioFf"), n("91GP"), n("Vd3H"), n("rGqo"), n("a1Th"), n("tUrg"), n("pIFo"), n("KKXr"), n("VRzm"), n("Btvt");
        var r = n("f01n"),
            a = n("h++7"),
            i = n("nyd8"),
            s = n("rHUl"),
            o = n("MhhX"),
            c = n("p3re"),
            l = n("eTng"),
            d = n("vT4u"),
            u = n("N1NS");

        function m(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var p = "_im_join_chat";

        function g(e, t) {
            var n = Object(u.a)({
                handlers: (n, a) => {
                    a(e, "click", p, e => (function(e, t) {
                        var n = domData(t, "chat-id"),
                            a = domData(t, "hash");
                        return lockButton(t), Object(d.Z)(n, a, e.get()).then(n => {
                            var a = m(n, 1)[0];
                            unlockButton(t), e.get().longpoll.push([Object(r.gb)(a)])
                        }).catch(e => {
                            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                        })
                    })(t, e.target))
                }
            });
            return {
                unmount() {
                    Object(u.c)(n)
                }
            }
        }
        var h = n("aong"),
            _ = n("86+7"),
            b = n("Wu9C"),
            f = n("wSs/"),
            v = n("ERyv"),
            y = n("lJdi"),
            j = n("t7n3");

        function O(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        n.d(t, "t", function() {
            return w
        }), n.d(t, "l", function() {
            return k
        }), n.d(t, "s", function() {
            return S
        }), n.d(t, "v", function() {
            return E
        }), n.d(t, "j", function() {
            return I
        }), n.d(t, "g", function() {
            return x
        }), n.d(t, "b", function() {
            return T
        }), n.d(t, "c", function() {
            return P
        }), n.d(t, "e", function() {
            return M
        }), n.d(t, "d", function() {
            return L
        }), n.d(t, "f", function() {
            return B
        }), n.d(t, "h", function() {
            return D
        }), n.d(t, "a", function() {
            return N
        }), n.d(t, "k", function() {
            return A
        }), n.d(t, "o", function() {
            return q
        }), n.d(t, "m", function() {
            return H
        }), n.d(t, "n", function() {
            return F
        }), n.d(t, "p", function() {
            return R
        }), n.d(t, "i", function() {
            return $
        }), n.d(t, "u", function() {
            return U
        }), n.d(t, "q", function() {
            return z
        }), n.d(t, "r", function() {
            return K
        }), n.d(t, "V", function() {
            return We
        }), n.d(t, "lc", function() {
            return Ve
        }), n.d(t, "M", function() {
            return Ge
        }), n.d(t, "y", function() {
            return Xe
        }), n.d(t, "H", function() {
            return Qe
        }), n.d(t, "gb", function() {
            return Je
        }), n.d(t, "gc", function() {
            return Ze
        }), n.d(t, "Ib", function() {
            return et
        }), n.d(t, "R", function() {
            return tt
        }), n.d(t, "J", function() {
            return rt
        }), n.d(t, "Lc", function() {
            return at
        }), n.d(t, "K", function() {
            return it
        }), n.d(t, "Xb", function() {
            return ot
        }), n.d(t, "L", function() {
            return ct
        }), n.d(t, "x", function() {
            return dt
        }), n.d(t, "jc", function() {
            return ut
        }), n.d(t, "Lb", function() {
            return mt
        }), n.d(t, "fc", function() {
            return pt
        }), n.d(t, "nb", function() {
            return gt
        }), n.d(t, "mb", function() {
            return ht
        }), n.d(t, "wb", function() {
            return _t
        }), n.d(t, "rb", function() {
            return bt
        }), n.d(t, "Db", function() {
            return ft
        }), n.d(t, "Eb", function() {
            return vt
        }), n.d(t, "I", function() {
            return kt
        }), n.d(t, "Jc", function() {
            return Ct
        }), n.d(t, "Dc", function() {
            return St
        }), n.d(t, "D", function() {
            return Et
        }), n.d(t, "Zb", function() {
            return Pt
        }), n.d(t, "Sb", function() {
            return Mt
        }), n.d(t, "Yb", function() {
            return Lt
        }), n.d(t, "Ub", function() {
            return Bt
        }), n.d(t, "bc", function() {
            return Dt
        }), n.d(t, "Tb", function() {
            return Nt
        }), n.d(t, "cc", function() {
            return At
        }), n.d(t, "mc", function() {
            return qt
        }), n.d(t, "Fc", function() {
            return Ht
        }), n.d(t, "Ob", function() {
            return Ft
        }), n.d(t, "Qb", function() {
            return $t
        }), n.d(t, "Pb", function() {
            return Ut
        }), n.d(t, "ic", function() {
            return zt
        }), n.d(t, "P", function() {
            return Kt
        }), n.d(t, "Jb", function() {
            return Wt
        }), n.d(t, "Vb", function() {
            return Gt
        }), n.d(t, "kc", function() {
            return Xt
        }), n.d(t, "dc", function() {
            return Qt
        }), n.d(t, "w", function() {
            return Yt
        }), n.d(t, "hc", function() {
            return Jt
        }), n.d(t, "Cb", function() {
            return Zt
        }), n.d(t, "Bc", function() {
            return en
        }), n.d(t, "Oc", function() {
            return tn
        }), n.d(t, "Gc", function() {
            return nn
        }), n.d(t, "F", function() {
            return rn
        }), n.d(t, "Wb", function() {
            return an
        }), n.d(t, "rc", function() {
            return sn
        }), n.d(t, "tc", function() {
            return on
        }), n.d(t, "zc", function() {
            return cn
        }), n.d(t, "vc", function() {
            return ln
        }), n.d(t, "G", function() {
            return dn
        }), n.d(t, "fb", function() {
            return un
        }), n.d(t, "Ic", function() {
            return mn
        }), n.d(t, "Ac", function() {
            return pn
        }), n.d(t, "C", function() {
            return gn
        }), n.d(t, "sb", function() {
            return hn
        }), n.d(t, "Fb", function() {
            return _n
        }), n.d(t, "xb", function() {
            return bn
        }), n.d(t, "zb", function() {
            return fn
        }), n.d(t, "yb", function() {
            return vn
        }), n.d(t, "z", function() {
            return yn
        }), n.d(t, "yc", function() {
            return jn
        }), n.d(t, "X", function() {
            return On
        }), n.d(t, "W", function() {
            return wn
        }), n.d(t, "oc", function() {
            return Cn
        }), n.d(t, "nc", function() {
            return Sn
        }), n.d(t, "T", function() {
            return En
        }), n.d(t, "qc", function() {
            return In
        }), n.d(t, "ob", function() {
            return xn
        }), n.d(t, "Nc", function() {
            return Tn
        }), n.d(t, "Rb", function() {
            return Pn
        }), n.d(t, "vb", function() {
            return Mn
        }), n.d(t, "db", function() {
            return Ln
        }), n.d(t, "bb", function() {
            return Bn
        }), n.d(t, "cb", function() {
            return Dn
        }), n.d(t, "eb", function() {
            return Nn
        }), n.d(t, "ec", function() {
            return qn
        }), n.d(t, "Kb", function() {
            return Fn
        }), n.d(t, "Kc", function() {
            return Rn
        }), n.d(t, "ac", function() {
            return $n
        }), n.d(t, "uc", function() {
            return Un
        }), n.d(t, "pc", function() {
            return zn
        }), n.d(t, "Z", function() {
            return Kn
        }), n.d(t, "A", function() {
            return Wn
        }), n.d(t, "wc", function() {
            return Vn
        }), n.d(t, "xc", function() {
            return Gn
        }), n.d(t, "Gb", function() {
            return Xn
        }), n.d(t, "Q", function() {
            return Qn
        }), n.d(t, "Mb", function() {
            return Yn
        }), n.d(t, "Nb", function() {
            return Jn
        }), n.d(t, "Ec", function() {
            return Zn
        }), n.d(t, "ub", function() {
            return er
        }), n.d(t, "sc", function() {
            return tr
        }), n.d(t, "Cc", function() {
            return nr
        }), n.d(t, "B", function() {
            return rr
        }), n.d(t, "U", function() {
            return ar
        }), n.d(t, "O", function() {
            return ir
        }), n.d(t, "N", function() {
            return sr
        }), n.d(t, "Y", function() {
            return or
        }), n.d(t, "E", function() {
            return cr
        }), n.d(t, "Mc", function() {
            return lr
        }), n.d(t, "ab", function() {
            return s.u
        }), n.d(t, "jb", function() {
            return s.A
        }), n.d(t, "tb", function() {
            return s.H
        }), n.d(t, "pb", function() {
            return s.E
        }), n.d(t, "kb", function() {
            return s.C
        }), n.d(t, "S", function() {
            return s.f
        }), n.d(t, "Bb", function() {
            return s.L
        }), n.d(t, "qb", function() {
            return s.F
        }), n.d(t, "lb", function() {
            return s.D
        }), n.d(t, "hb", function() {
            return s.y
        }), n.d(t, "Hc", function() {
            return s.U
        }), n.d(t, "ib", function() {
            return l.b
        }), n.d(t, "Hb", function() {
            return l.d
        }), n.d(t, "Ab", function() {
            return l.c
        });
        var w = "_im_mess_sending",
            k = "_im_mess_failed",
            C = "_im_mess_original",
            S = "_im_mess_restore",
            E = "_im_typing",
            I = "chat_create",
            x = "chat_title_update",
            T = "chat_invite_user",
            P = "chat_kick_user",
            M = "chat_photo_update",
            L = "chat_photo_remove",
            B = "chat_pin_message",
            D = "chat_unpin_message",
            N = "chat_invite_user_by_link",
            A = "_im_deselect_all",
            q = "_im_top_notice_hide",
            H = "_im_aside_notice_hide",
            F = "_im_aside_promo_block_hide",
            R = "_im_vkadmin_promo_link",
            $ = "_im_clear_recent",
            U = "_im_toggle_mr_tab",
            z = "_im_mess_search",
            K = "_im_pinned",
            W = window,
            V = W.vk,
            G = W.ls,
            X = W.se,
            Q = W.re,
            Y = W.rs,
            J = W.sech,
            Z = W.inArray,
            ee = W.intval,
            te = W.trim,
            ne = W.stripHTML,
            re = W.domFC,
            ae = W.domPS,
            ie = W.domLC,
            se = W.domChildren,
            oe = W.domClosestSibling,
            ce = W.domData,
            le = W.geByClass,
            de = W.geByClass1,
            ue = W.gpeByClass,
            me = W.addClass,
            pe = W.removeClass,
            ge = W.toggleClass,
            he = W.hasClass,
            _e = W.attr,
            be = W.setStyle,
            fe = W.val,
            ve = W.getTemplate,
            ye = W.getLang,
            je = W.langSex,
            Oe = W.langDate,
            we = W.langNumeric,
            ke = W.getDateText,
            Ce = W.getSmDate,
            Se = W.getShortDate,
            Ee = W.isSameDate,
            Ie = W.isToday,
            xe = W.ajax,
            Te = W.showBox,
            Pe = W.showFastBox,
            Me = W.showTabbedBox,
            Le = W.showTooltip,
            Be = W.mobPlatforms,
            De = W.onlinePlatformClass,
            Ne = W.AudioMessagePlayer,
            Ae = W.Emoji,
            qe = W.slideUp,
            He = W.fadeOut,
            Fe = W.cancelEvent,
            Re = 4096,
            $e = 100,
            Ue = 8,
            ze = 52,
            Ke = "chatPosition";

        function We() {
            return G.get(Ke) || 0
        }

        function Ve(e) {
            e >= window.clientHeight() - 30 && (e = 0), G.set(Ke, e)
        }

        function Ge(e, t) {
            var n = de(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && be(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Xe(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Qe(e, t, n, r) {
            var a = t && !n ? 1 : !t && n ? -1 : 0;
            a && !Object(s.A)(e) && r().compensateHistoryHeightChange(a)
        }

        function Ye(e, t, n, r) {
            var a = window.devicePixelRatio >= 2 ? "256" : "128",
                i = "animation" === n,
                s = "im_gift";
            i && (s += " sticker_img");
            var o = `<img height="128" class="${s}" src="${Stickers.getStickerUrl(ee(e),a)}"/>`;
            if (i) {
                var c = "animatedSticker" + r;
                o = `<div id="${c}" data-loop-count=3 data-animation-path="${"/stickers.php?act=proxy_animation&product_id="+t+"&sticker_id="+e}" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="${r}" data-sticker-id="${ee(e)}" class="sticker_animation sticker_animation_128 im_gift">${o}</div>`;
                var l = !1;
                browser.msie ? (0 ^ r) === r && (l = !0) : l = Number.isInteger(r), l && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (o = `<a onmouseover="return Emoji.stickerOver(${ee(e)}, this);"\n        onclick="return Emoji.clickSticker(${ee(t)}, this, event);">${o}</a>`), o = `<div class="im_sticker_row">${o}</div>`
        }

        function Je(e, t, n) {
            var r = e.get ? e.get() : e;
            if (ft(r, t)) {
                var a = r.tabs[t].deleted || [];
                return Z(n, a)
            }
            return !1
        }

        function Ze(e, t, n) {
            var r = n.randomId,
                a = de(`_im_mess_rid${r}`, t);
            return a && (t = dt(e, n, t = Rt([a], t), !0, !1)), t
        }

        function et(e) {
            var t = Object(s.a)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : tt().then(e => e.length > 0).catch(e => !1)
        }

        function tt() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function nt(e) {
            return ve("im_preloader", {
                preloader: Y(V.pr_tpl, {
                    id: ""
                }),
                cls: `im-preloader_attach im-preloader_visible im-preloader_${e}`
            })
        }

        function rt(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function at(e, t, n) {
            var r = ce(n, "msgid"),
                a = de(`_im_mess_${r}`, t),
                i = n.cloneNode(!0);
            return a && (a.parentNode.replaceChild(i, a), ct(t)), t
        }

        function it(e, t, n) {
            var r = st(e, t),
                a = de(`_im_mess_${t.messageId}`, n);
            return a && (a.parentNode.replaceChild(X(r), a), ct(n)), n
        }

        function st(e, t) {
            var n = ["_im_mess"],
                r = Object(o.n)(e.tabs[t.peerId], t),
                a = Object(o.c)(t) ? ve("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: nt("reply"),
                    text: ""
                }) : "";
            Object(o.k)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(o.k)(t) && n.push("im-mess_out"), Object(o.p)(t) && n.push("im-mess_was_edited"), Object(f.a)(e, t) && n.push("im-mess_editable"), Object(o.h)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var i = Date.now() - 1e3 * t.date > 1e3;
            t.local && i && n.push("im-mess_sending"), t.local && n.push(`${w}`), t.local && Object(o.p)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push(`im-mess_failed ${k}`), Object(o.f)(t) && n.push("im-mess_gift");
            var d = ot(t),
                u = function(e, t) {
                    var n = "",
                        r = Object(h.q)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(o.p)(t) && (n += ve("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(s.C)(e) && r) {
                        var a = t.kludges.ref_source,
                            i = {};
                        try {
                            (i = JSON.parse(Object(j.I)(a))).link && i.info && (i.link = Object(c.e)(Object(j.c)(i.link), c.b.bind(null, !1)), i = Object(j.c)(langStr(ye("mail_source_info"), "link", i.link, "info", Object(j.c)(i.info))), n += ve("sImLblWasSourceInfo", {
                                source: i
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                m = a + wt(e, t.text, t.kludges, !1, t.peerId);
            "" != m && (m += u), t.subject && "..." !== t.subject.trim() && !Object(l.b)(t.peerId) && (m = ve("im_topic", {
                topic: t.subject
            }) + m);
            var p = ve("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: d.join(""),
                text: Object(o.f)(t) ? `<div class="im-mess--gift-lbl">${m}</div>` : ""
            });
            return Object(o.f)(t) || (p = m + p), "" == m && (p += u), ve("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? `aria-label="${ye("mail_send_message_error")}" role="link"` : "",
                unread_params: r ? `aria-label="${ye("mail_unread_message")}"` : "",
                cls: n.join(" ")
            }).replace("%text%", () => p)
        }

        function ot(e) {
            return e.attaches.reduce((t, n) => !Object(o.c)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push(Ye(n.id, n.productId, n.kind, e.messageId)) : t.push(Ye(n.id, n.productId)) : t.push(nt(n.type)), t) : t, [])
        }

        function ct(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) he(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", ve("sImHistoryRowActions")), pe(t[n], "_im_mess_noa")
        }

        function lt(e, t, n) {
            var r, a = V.id,
                i = e.attaches[0],
                s = i.initiatorId,
                o = i.state,
                c = i.receiverId;
            switch (o) {
                case "reached":
                    r = ye(a === s ? "mail_call_outgoing" : "mail_call_incoming");
                    var l = t ? "" : function(e) {
                        var t = Math.floor(e / 3600),
                            n = Math.floor(e / 60) - 60 * t,
                            r = !1,
                            a = !1;
                        return [t, n, e - 3600 * t - 60 * n].reduce((e, t) => {
                            if (0 === t && !a) return a = !0, e;
                            r && (t = t < 10 ? "0" + t : t);
                            var n = `${e}${""!==e?":":""}${t}`;
                            return r = !0, a = !0, n
                        }, "")
                    }(i.duration);
                    r = r.replace("{duration}", l);
                    break;
                case "canceled_by_initiator":
                    r = ye(a === s ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (a === s) {
                        if (t) return ye("mail_call_declined");
                        var d = Object(_.c)(n, c);
                        return d ? je(d.sex, ye("mail_call_declined_by", "raw")).replace("{user_name}", d.first_name) : ye("mail_call_declined")
                    }
                    return ye("mail_call_canceled");
                default:
                    r = ye("mail_added_call")
            }
            return ve("im_calls_link", {
                text: r
            })
        }

        function dt(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                a = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                i = Date.now() - 1e3 * t.date > 1e3,
                c = e.tabs[t.peerId];
            if (!n || de("_im_mess", n) || de("_im_bar_date", n) || (n.innerHTML = ""), c.skipped > 0) return n;
            var d = [];
            t.local || (d = e.imQueue(t.peerId, r)), d.length > 0 && Rt(d.map(e => de("_im_mess_rid" + e.rid, n), n).filter(e => e));
            var u = st(e, t),
                m = ie(n);
            he(m, "_im_mess_stack") || (m = oe(m, "._im_mess_stack", -1));
            for (var p = Object(s.l)(e, t.peerId, t.messageId); t.peerId === e.peer && p && !de("_im_mess_" + p.messageId);) p = Object(s.l)(e, t.peerId, p.messageId);
            var g = de("_im_unread_bar_row", n),
                b = Object(o.b)(t),
                f = p ? yt(p.date, e) : 0;
            if (!p || jt(c, p, t, e, a)) {
                var v = "",
                    y = !1;
                if (g && Object(o.k)(t) && Pn(e, n, t.peerId), 1 === c.unread && !Object(o.k)(t) && a && (v += ve("im_mess_bar", {}), y = !0, Pn(e, n, t.peerId)), !Ie(new Date(f))) {
                    var j = new Date,
                        O = y ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += ve("im_day_bar", {
                        day: Se(t.date, e.timeshift, !0, ye("months_of", "raw"), !0),
                        date: t.date,
                        day_class: j.getDate() + j.getMonth() + j.getFullYear() + " " + O
                    })
                }
                if (Object(o.l)(t)) v += ve("im_service_row", {
                    text: Qt(e, t, c),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(o.e)(t)) v += ve("im_service_row", {
                    text: Xt("", lt(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var k = e.gid && Object(o.k)(t) ? ee(t.kludges.from_admin) || -e.gid : 0,
                        C = Object(_.c)(e, k ? -e.gid : b) || c,
                        S = Object(l.b)(t.peerId) ? C.name : C.first_name,
                        E = C.link || c.href,
                        I = ve("im_mess_stack_name", {
                            name: S,
                            link: E,
                            class: Object(o.i)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(o.f)(t)) {
                        var x = ye("mail_gift_message_sent", "raw");
                        I += ` <span class="im-mess-stack--gift">${je(C.sex||0,x)}</span>`
                    }
                    if (Object(o.i)(t)) {
                        var T = Object(o.j)(t) ? ye("mail_money_request_message_sent", "raw") : ye("mail_money_tranfer_message_sent", "raw");
                        I += ` <span class="im-mess-stack--money-transfer">${je(C.sex||0,T)}</span>`
                    }
                    var P, M = e.gid ? "/gim" + e.gid : "/im";
                    if (P = t.local ? Ot(t.date, e.timeshift) : ve("im_stack_date", {
                            date: Ot(t.date, e.timeshift),
                            link: `${M}?sel=${t.peerId}&msgid=${t.messageId}`
                        }), k && e.admins[k]) {
                        var L = e.admins[k],
                            B = k === V.id ? ye("mail_by_you") : L[0];
                        P = P + " " + ve("im_admin_link", {
                            name: B,
                            href: L[1]
                        })
                    }
                    v += ve("im_mess_stack", {
                        photo: C.photo,
                        href: E,
                        cls: "",
                        date_attr: "",
                        link: `/im?sel=${t.peerId}&msgid=${t.messageId}`,
                        name: ne(I),
                        stack_name: I,
                        peerId: b,
                        date: P,
                        messages: u,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(h.o)(J(v)).forEach(e => n && n.appendChild(e))
            } else g && e.peer === t.peerId && !c.inplaceSearch && Object(o.k)(t) && Pn(e, n, t.peerId), de("_im_stack_messages", m).appendChild(X(u));
            return Object(o.k)(t) && !i && setTimeout(() => {
                var e = de("_im_mess_" + t.messageId, n);
                he(e, w) && me(e, "im-mess_sending")
            }, 500), d = d.filter(e => e.rid !== t.randomId), ct(n), ut(d, e, n)
        }

        function ut(e, t, n) {
            var r;
            return (r = "object" == typeof e ? e : t.imQueue(e, !1)).length > 0 && r.map(e => (e.mess.failed = !!e.failed, e.mess)).filter(e => Object(s.n)(t, e.peerId, e.messageId)).forEach(e => dt(t, e, n, !1)), n
        }

        function mt(e, t, n) {
            var r = e.tabs[t];
            return Object(h.o)(le("_im_mess_unread", n)).forEach(e => {
                var t = ee(ce(e, "msgid"));
                t > 0 && r.out_up_to >= t && (pe(e, "_im_mess_unread"), pe(e, "im-mess_unread"), function(e) {
                    var t = de("_im_mess_blind_unread_marker", e);
                    t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
                }(e))
            }), n
        }

        function pt(e, t, n) {
            var r = t.peerId,
                a = t.messageId,
                i = de("_im_msg_reply" + a, e),
                s = de("_im_msg_media" + a, e),
                o = n.tabs[r].mediacontent[a][0];
            return i && (i.innerHTML = o[0]), s && (s.innerHTML = o[1]), e
        }

        function gt(e, t) {
            if (!Object(s.F)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function ht(e) {
            return e > 19e8 && e < 2e9
        }

        function _t(e, t) {
            return e === t.peer
        }

        function bt(e, t) {
            return Object(y.m)(Object(s.u)(e, t), 1024)
        }

        function ft(e, t) {
            return !!e.tabs[t]
        }

        function vt(e, t) {
            return !!ft(e, t) && null !== e.tabs[t].lastmsg
        }

        function yt(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function jt(e, t, n, r, a) {
            if (Object(o.b)(t) !== Object(o.b)(n)) return !0;
            var i = yt(t.date, r),
                c = yt(n.date, r);
            return !Ee(i, c) || (!(!Object(s.C)(r) || ee(t.kludges.from_admin) === ee(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(o.l)(t) && !Object(o.l)(n)) || (!(!Object(o.e)(n) && !Object(o.e)(t)) || (!(!Object(o.f)(t) && !Object(o.f)(n)) || (!(!Object(o.g)(t) && !Object(o.g)(n)) || (!!Object(o.c)(n) || !(Object(o.n)(e, t) === Object(o.n)(e, n) || !a || Object(o.k)(n) || Zt(n.peerId, r.gid)))))))))
        }

        function Ot(e, t) {
            return Oe(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function wt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = Math.round(1e9 * Math.random()).toString(16),
                o = {},
                l = 0;
            return t = (t = Object(c.e)(t || "", c.b.bind(null, r))).replace(/(<a.+?<\/a>)/gi, e => {
                var t = `!link_${l}_${i}!`;
                return o[t] = e, l++, t
            }), t = Object(c.f)(t), t = Object(c.c)(t), t = Object(c.d)(t, t => {
                var n = Object(s.j)(e);
                return `<a href="/${n?"gim"+n:"im"}?sel=${a||Object(s.p)(e)}&st=${encodeURIComponent(t)}">${t}</a>`
            }), Object.keys(o).forEach(e => {
                t = t.replace(e, () => o[e])
            }), n.emoji && (t = Ae.emojiToHTML(t, !0)), t
        }

        function kt(e) {
            return Object(l.b)(e) ? "c" + (e - 2e9) : function(e) {
                return e < -2e9
            }(e) ? "e" + Math.abs(e + 2e9) : ht(e) ? "mr" + (e - 19e8) : e
        }

        function Ct(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - ee(e.substr(1));
                case "c":
                    return 2e9 + ee(e.substr(1));
                default:
                    return ee(e)
            }
        }

        function St(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function Et(e, t) {
            return {
                search: {
                    name: ye("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: ye("mail_block_comm_messages")
                },
                block_notify: {
                    icon: "block",
                    name: ye("mail_block_notify_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: ye("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? ye("mail_im_delete_email_contact") : ye("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: ye("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: ye("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: ye("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? ye("mail_im_show_media_history_group") : ye("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: ye("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: ye("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: ye("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: ye(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: ye(t ? "mail_leave_channel" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: ye("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: ye(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: ye("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: ye("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: ye("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: ye(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function It(e, t) {
            var n = `<img src="${e}" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>`;
            return t && (n = ve("im_dialogs_link", {
                href: t,
                photo: n
            })), `<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ${n}\n    </div>\n  </div>`
        }

        function xt(e, t) {
            var n = `<img src="${e}" alt="" class="dialogs_inline_chatter"/>`;
            return t && (n = ve("im_dialogs_link", {
                href: t,
                photo: n
            })), `<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ${n}\n    </div>\n  </div>`
        }

        function Tt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return `<div class="im_grid"><img src="${e}" alt=""/></div>`;
            switch (e.length) {
                case 1:
                    return `<div class="im_grid"><img src="${e[0]}" alt=""/></div>`;
                case 2:
                    return e.map((e, n) => It(e, t[n])).join("");
                case 3:
                    return It(e[0], t[0]) + e.slice(1).map((e, n) => xt(e, t[n + 1])).join("");
                case 4:
                    return e.map((e, n) => xt(e, t[n])).join("")
            }
        }

        function Pt(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return `<div class="im_grid"><img src="${t.photo}" alt=""></div>`;
            if (Object(l.b)(t.peerId) && t.membersCount < 2) return `<div class="im_grid"><img src="${e.get().default_chat_photo}" alt=""></div>`;
            if (Array.isArray(t.photo)) return Tt(t.photo);
            var r = t.data.active.slice(0, 4).map(_.c.bind(null, e));
            return Tt(r.map(e => e.photo), n ? [] : r.map(e => e.link))
        }

        function Mt(e) {
            var t = e.get().gid ? ye("mail_search_only_messages_comm") : ye("mail_search_only_messages");
            return `<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ${z}">\n      <button type="button" class="im-i--messages-search"></button>${t}\n    </div>\n  </li>`
        }

        function Lt() {
            return `<li class="im-search-results-head">${ye("mail_search_messages")}</li>`
        }

        function Bt() {
            return `<li class="im-search-results-head">${ye("mail_search_conversations_sep")}</li>`
        }

        function Dt() {
            return `<li class="im-search-results-head">${ye("mail_search_dialogs_sep")}</li>`
        }

        function Nt() {
            return `<li class="im-search-results-head _im_recent_bar">\n    ${ye("mail_recent_searches")}\n    <button type="button" class="${$} im-page--clear-recent">${ye("mail_clear_recent")}</button>\n  </li>`
        }

        function At(e) {
            var t = e.get().popular_sugg,
                n = Object(s.A)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(t => {
                var n = t.peerId,
                    r = Object(_.c)(e, n) || t,
                    a = e.get().tabs[n] || t,
                    i = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return `<div class="${["im-popular--item","fl_l","_im_dialog","_dont_add_recent","_im_sugg_"+n,a.unread>0&&"sugg-is_unread",i&&"sugg-is_muted"].filter(e=>!!e).join(" ")}" data-peer="${n}">\n    <a class="im-popular--avatar-w ${De(a.online)}" href="${r.link}"><img class="im-popular--avatar" src="${r.photo}"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="${r.link}">${r.first_name||r.name}</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">${St(a.unread)}</span>\n</div>`
            }).join("") + "</li>"
        }

        function qt(e, t, n) {
            var r = de("_im_mess_" + t.messageId, n);
            if (r) {
                _e(r, "aria-hidden", "false"), me(r, `im-mess_failed ${k}`);
                var a = de("_im_mess_marker", r);
                _e(a, "aria-label", ye("mail_send_message_error")), _e(a, "role", "link")
            }
            return n
        }

        function Ht(e, t, n) {
            var r = de("_im_mess_" + t, n);
            if (r) {
                pe(r, "im-mess_failed"), _e(r, "aria-hidden", "true"), pe(r, k);
                var a = de("_im_mess_marker", r);
                _e(a, "aria-label", ""), _e(a, "role", "")
            }
            return n
        }

        function Ft(e, t) {
            return Rt(e.map(e => de("_im_mess_" + e, t)).filter(e => e), t)
        }

        function Rt(e, t) {
            var n = e.filter(e => !he(e, "im-mess_srv")).map(e => e.parentNode);
            return e.forEach(e => {
                he(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(e => 0 === se(e).length).map(e => ue("_im_mess_stack", e)).forEach(e => {
                he(ae(e), "_im_bar_date") && Q(ae(e)), he(ae(e), "_im_unread_bar_row") && Q(ae(e)), Q(e)
            }), t
        }

        function $t(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    he(n, "mess_srv") && (t = n.parentNode);
                    var r = ue("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === se(n.parentNode).length && r.parentNode.removeChild(r))
                }
                he(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function Ut(e, t, n, r) {
            return e.map(e => de("_im_mess_" + e, r)).filter(e => e).forEach(e => {
                fe(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return `<div class="im-mess--text">\n    ${ye("delete"===n?"mail_deleted_stop":"mail_marked_as_spam")} <button type="button" data-peer="${e}" class="${S} im-mess--btn">${ye("mail_restore")}</button>\n    <div class="${C} im-mess--original">${r}</div>\n  </div>`
                }(t, e, n)), me(e, "im-mess_light")
            }), r
        }

        function zt(e, t, n) {
            var r = de("_im_mess_" + e, n);
            if (r) {
                var a = de(C, r);
                fe(r, a.innerHTML), pe(r, "im-mess_light")
            }
            return n
        }

        function Kt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments.length > 1 ? arguments[1] : void 0,
                n = arguments.length > 2 ? arguments[2] : void 0,
                r = arguments.length > 3 ? arguments[3] : void 0,
                a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Vt(e, t, n, r, !0, a);
            var i = Vt(e, t, n, r, !1, a);
            return i.length > 60 ? Vt(e, t, n, r, !0, a) : i
        }

        function Wt(e) {
            var t = {
                    [d.d]: 1,
                    [d.c]: 2
                },
                n = Object.keys(e).sort((e, n) => t[n] - t[e]),
                r = {},
                a = n.reduce((t, n) => {
                    var a = (e[n] || {}).userIds;
                    return (void 0 === a ? [] : a).forEach(e => {
                        r[e] || (r[e] = !0, t[n] = !0)
                    }), t
                }, {}),
                i = n.filter(e => !!a[e]);
            return i.length > 1 ? "" : i[0]
        }

        function Vt(e, t, n, r, a, i) {
            var o = function(e, t, n) {
                var r = [],
                    a = {};
                return Object.keys(t).map(n => {
                    ((t[n] || {}).userIds || []).forEach(t => {
                        Object(_.b)(e, t) ? parseInt(t, 10) !== e.id && (a[t] = n) : r.push(t)
                    })
                }), r.length && Object(d.hb)({
                    [n]: r
                }, e), Object.keys(a).sort((e, n) => t[a[e]].ts - t[a[n]].ts)
            }(r, e, t);
            if (0 === o.length) return "";
            var c = Object(l.d)(t) || Object(s.D)(t) ? "first_name" : a ? "short_name" : "name",
                u = Wt(e),
                m = "";
            u === d.c ? m = ye("mail_recording_audio_several", o.length) : u === d.d && (m = ye("mail_typing_several", o.length));
            var p = o.slice(0, Math.min(o.length - 1, i)),
                g = p.map(e => Object(_.c)(r, e)[c]).join(", ");
            if (o.length > i + 1) {
                var h = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(n => {
                        var r = e[n].userIds;
                        (void 0 === r ? [] : r).forEach(e => {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                g += " " + ye("mail_and_peer").replace("{count}", h - i).replace("{typing}", m)
            } else {
                if (o.length > 1 && (g += ` ${ye("mail_and_peer_one")}`), !Object(l.b)(t) && n) g += ` ${m}`;
                else g += ` ${Object(_.c)(r,o[p.length])[c]} ${m}`
            }
            return g.trim()
        }

        function Gt() {
            return `<div class="im-page--chat-search-empty">\n    ${ye("mail_im_search_empty")}\n  </div>`
        }

        function Xt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? `<a class="im_srv_lnk ${r}" target="_blank" rel="noopener" href="${e}">${t}</a>` : `<span class="${r}">${t}</span>`
        }

        function Qt(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                a = t.kludges,
                i = a.source_act,
                s = ee(a.source_mid),
                o = t.userId,
                c = Object(_.c)(e, o),
                l = "",
                d = o === s;
            switch (i) {
                case I:
                    l = "mail_im_chat_created";
                    break;
                case x:
                    l = a.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case T:
                    l = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case P:
                    l = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case M:
                    l = "mail_im_photo_set";
                    break;
                case L:
                    l = a.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case B:
                    l = a.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case D:
                    l = a.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case N:
                    l = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (l = (l = je(c.sex, ye(l, "raw"))).replace("{from}", Xt(c.link, c.name, r)), s && s !== o) {
                var u = a.source_email;
                if (u) l = l.replace("{user}", Xt(`/im?email=${encodeURIComponent(u)}`, "email", r));
                else {
                    var m = Object(_.c)(e, s),
                        p = i === P ? m.inv_name : m.kick_name;
                    l = l.replace("{user}", Xt(m.link, p, r))
                }
            }
            if (a.source_text) {
                var g = a.source_old_text ? `«<b class="im_srv_lnk">${a.source_old_text}</b>» &rarr; ` : "";
                l = l.replace("{title}", g + `«<b class="im_srv_lnk">${a.source_text}</b>»`)
            }
            if (a.source_act === B || a.source_act === D)
                if (a.source_message) {
                    var h = Xt("", Jt(Ae.emojiToHTML(ne(a.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    l = l.replace("{msg}", h)
                } else l = l.replace(/{link}(.+){\/link}/i, (e, t) => Xt("", t, !1, "im_srv_mess_link"));
            return l
        }

        function Yt(e, t, n, r) {
            if (t === M) {
                var a = de("_im_mess_" + e.messageId, r);
                if (a) {
                    var i = n.tabs[e.peerId];
                    a.parentNode.innerHTML = ve("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Qt(n, e, i) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function Jt(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(a.r, "$1$4")
        }

        function Zt(e, t) {
            return !t && e === V.id
        }

        function en(e, t) {
            return Le(e, {
                url: Object(s.D)(t) ? "al_groups.php" : "al_profile.php",
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

        function tn(e) {
            return function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    a = X(ve("im_preloader", {
                        preloader: Y(V.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    i = !1;

                function s() {
                    i = !0, pe(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
                }
                setTimeout(() => {
                    i || ("bottom" === n ? e.appendChild(a) : e.insertBefore(a, re(e)), me(a, "im-preloader_visible"))
                }, 0), t.then(s).catch(e => {
                    Object(v.a)("wrapLoading", e), s()
                })
            }
        }

        function nn(e, t) {
            return {
                0: {
                    msgs: e.reduce((e, t) => (e[t] = [t, r.l, 0, 0, "", {}, {}, 0, 0, 0], e), {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function rn(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = Ue,
                a = !1,
                i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || he(n, "_im_no_select") || he(n, "im_msg_media_link") || "IMG" == n.tagName && !he(n, "_im_graffiti") && !he(n, "emoji") && !he(n, "emoji_css") && !he(n, "im_gift") || "TEXTAREA" == n.tagName || he(n, "play_new") || he(n, "videoplayer") || (a = i.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !a || !!te((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function an(e, t) {
            return `<div class="im-mess--text">\n      <span>${ye("mail_restored")}</span>\n      <a class="_im_go_to" href="/im?sel=${kt(e)}&msgid=${t}">${ye("mail_im_goto_conversation")}</a>\n    </div>`
        }

        function sn(e, t, n) {
            var r = ye("mail_deleteall1"),
                a = ye("mail_sure_to_delete_all"),
                i = ye("mail_delete");
            return Object(l.b)(t) && (Object(y.m)(e, 1024) ? (r = ye("mail_leave_channel"), a = ye("mail_unfollow_channel_confirmation"), i = ye("mail_unfollow_channel")) : a = ye("mail_chat_sure_to_delete_all")), Object(s.D)(t) && (a = ye("mail_group_sure_to_delete_all")), Pe(r, a, i, n, ye("global_cancel"))
        }

        function on(e, t, n) {
            var r = Object(s.u)(e, t),
                a = Object(l.b)(t),
                i = a && Object(y.m)(r, 1024),
                o = ye("mail_deleteall1"),
                c = ye("mail_sure_to_delete_all"),
                d = ye("mail_delete");
            if (a) {
                if (r.data.closed || r.data.kicked) return sn(r, t, n.bind(null, !0));
                i ? (o = ye("mail_leave_channel"), c = ye("mail_vkcomgroup_leave_confirm"), d = ye("mail_leave_channel")) : (o = ye("mail_leave_chat"), c = ye("mail_chat_leave_confirm"), d = ye("mail_leave_chat"))
            }
            Object(s.D)(t) && (c = ye("mail_group_sure_to_delete_all"));
            var u = new MessageBox({
                title: o,
                width: i ? 450 : 500
            }).content(c).setButtons(d, () => n(!!isChecked(de("_check_is_delete")) || !a), ye("global_cancel")).show();
            return a && !i && u.setControlsText(`<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">${ye("mail_deleteall1")}</div>`), u
        }

        function cn(e) {
            return Pe(ye("mail_unpin_title"), ye("mail_unpin_text"), ye("mail_unpin"), e, ye("global_cancel"))
        }

        function ln(e, t, n, r) {
            var a = ye("mail_dialog_msg_delete_N", t),
                i = Pe(ye("mail_dialog_msg_delete_title"), a, ye("mail_delete"), () => r(isChecked(de("_check_forall"))), ye("global_cancel")),
                s = "",
                o = !1;
            return n && (s = `<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">${ye("mail_delete_for_all")}</div>`, o = cur.imDb.selectByKey("del_forall_checked")), i.setControlsText(s), o && checkbox(de("_check_forall")), i
        }

        function dn(e, t, n, r, a) {
            t.showProgress(), e.set(r.bind(null, a)).then(() => {
                t.hideProgress(), t.hide(), n().removePeer(e, a), n().updateDialogFilters(e)
            })
        }

        function un(e, t, n, r) {
            var a = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", a)).then(n().showCreation)
        }

        function mn(e, t, n) {
            var r = e.get();
            if (r.active_tab === a.h && 0 === r.dialog_tab_cts.mr) return !1;
            var i = r.active_tab === a.k ? a.h : a.k;
            return e.set(n.bind(null, i)).then(e => {
                t().restoreDialogs(e, !0)
            })
        }

        function pn(e, t, n) {
            if (e.get().active_tab === a.h && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === a.m ? a.h : a.m;
            return e.set(n.bind(null, r)).then(e => {
                t().restoreDialogs(e, !0)
            })
        }

        function gn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var a = Object(s.L)(t);
            return t.set(r.bind(null, e)).then(e => (n().restoreDialogs(e, !0, a !== Object(s.L)(e)), e))
        }

        function hn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return a.j[a.i] & n.folders
        }

        function _n(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(s.E)(e)) return !1;
            var r = n || e.get().tabs[t];
            return a.j[a.n] & r.folders
        }

        function bn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function fn(e) {
            return null != e.get().pendingForward
        }

        function vn(e, t) {
            return (t.get().block_states[e] || {}).who === V.id
        }

        function yn(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(a => {
                n[a].time ? !1 === n[a].free && Date.now() - n[a].time >= 5e4 && t.push([r.sb([, 1, "gim" + e.get().gid, a, 0, ""])]) : n[a].time = Date.now()
            })
        }

        function jn(e, t, n) {
            var r;
            return !Me("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: (n, a) => {
                    a && (r = t(n, e, a))
                },
                params: {
                    width: 638,
                    onHide: () => {
                        Ne.loaded && Ne.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function On(e, t) {
            return wn(e.get(), t, Object(s.u)(e, t).last_seen)
        }

        function wn(e, t, n, r) {
            if (n[0]) return ye("mail_header_online_status") + (Be[n[0]] ? kn(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var a = ke(n[1], e.timeshift),
                i = je(Object(_.c)(e, t).sex, ye("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", a);
            return n[2] && (i += kn(t, !1, !1, r)), i
        }

        function kn(e, t, n, r) {
            var a = {
                mid: e
            };
            n || (a.was = 1), t ? a.forcetoup = !0 : a.forcetodown = !0, a = Object.assign(a, r);
            var i = JSON.stringify(a).slice(1, -1).replace(/"/g, "&quot;");
            return ve("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: i
            })
        }

        function Cn(e, t) {
            var n = t.get().tabs[e];
            return Te("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function Sn(e, t) {
            return Te("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function En(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function In(e, t, n, r) {
            var a;
            Wn(Me("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: (r, i) => {
                    i && (a = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: () => {
                        Ne.loaded && Ne.detachPlayer(!0)
                    },
                    onDestroy: () => {
                        a && a.unmount()
                    }
                }
            }, r), e)
        }

        function xn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function Tn(e, t, n) {
            var r = de("_im_mess_" + e, n);
            return r && ge(r, "im-mess_fav", t), n
        }

        function Pn(e, t, n) {
            var r = de("_im_unread_bar_row", t);
            if (!r) return t;
            var a = oe(r, "._im_mess_stack", -1),
                i = oe(r, "._im_mess_stack"),
                o = a ? le("_im_mess", a).pop() : null,
                c = i ? de("_im_mess", i) : null;
            if (Q(r), function(e) {
                    var t = de("_im_invisible_bar", e);
                    t && (pe(t, "_im_invisible_bar"), pe(t, "im-page--history-new-bar_hide"))
                }(t), !c || !o) return t;
            var l = ce(c, "msgid"),
                d = Object(s.r)(e, n, l),
                u = Object(s.n)(e, n, l);
            if (!d || jt(e.tabs[n], d, u, e)) return t;
            var m = de("_im_stack_messages", a),
                p = de("_im_stack_messages", i).children;
            return Object(h.o)(p).forEach(e => {
                Q(e), m.appendChild(e)
            }), Q(i), t
        }

        function Mn(e, t, n) {
            var r = Object(s.i)(e, e.get().peer);
            if (!r) return [!1, 0];
            var a = de(`_im_mess_${r}`, t);
            if (!a) {
                var i = Object(s.l)(e, e.get().peer, r);
                if (!i) return [!0, 0];
                a = de(`_im_mess_${i.messageId}`, t)
            }
            var o = he(a, "_im_mess_srv") ? a : ue("_im_mess_stack", a);
            if (!o) return [!0, 0];
            var c = a ? a.offsetTop : 0,
                l = o.offsetTop + c,
                d = n.contHeight();
            return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - l)]
        }

        function Ln(e, t, n) {
            Fe(t);
            var r = ue("_im_top_notice", n);
            He(r, 200, Q.pbind(r));
            var a = ue("_im_page_dialogs", r);
            a && he(a, "im-page--dialogs-notice") && pe(a, "im-page--dialogs-notice"), xe.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Bn(e, t, n) {
            Fe(t);
            var r = ue("_im_aside_notice", n);
            qe(r, 200, Q.pbind(r)), xe.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Dn(e, t) {
            Fe(e);
            var n = ue("_im_aside_promo_block", t);
            qe(n, 200, Q.pbind(n)), xe.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Nn(e, t) {
            ue("_im_aside_promo_block", t).classList.add("--action-called"), xe.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: ce(t, "hash"),
                platform: ce(t, "platform")
            })
        }

        function An(e) {
            return e.length > 1 ? function(e) {
                return [].concat(e).sort((e, t) => "mail" !== e.type ? "mail" === t.type ? -1 : 1 : 0)
            }(e) : e
        }

        function qn(e, t, n, r, a) {
            if (n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(c.f)(n, (e, t, n, r, a) => a), r && (n = Ae.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(l.b)(e) && (n = ve("im_topic", {
                    topic: t,
                    cls: "im-topic_dialog"
                }) + n), !n && a.length > 0) {
                var i = An(a);
                n = ve("im_dialog_media", {
                    name: Hn(i[0], i)
                })
            }
            return n
        }

        function Hn(e, t) {
            var n = {
                photo: ye("mail_added_photos", "raw"),
                video: ye("mail_added_videos", "raw"),
                audio: ye("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return we(r, ye("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var a = t.filter(t => t.type === e.type).length;
                    return we(a, n[e.type], !0);
                case "audio_playlist":
                    return "audio_album" === e.kind ? ye("mail_added_audio_album") : ye("mail_added_audio_playlist");
                case "artist":
                    return ye("mail_added_artist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return ye("mail_added_graffiti");
                        case "audiomsg":
                            return ye("mail_added_audiomsg");
                        default:
                            return ye("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return ye("mail_added_geo");
                case "wall":
                    return ye("mail_added_wall");
                case "wall_reply":
                    return ye("mail_added_wall_reply");
                case "gift":
                    return ye("mail_added_gift");
                case "link":
                case "share":
                    return ye("mail_added_link");
                case "sticker":
                    return ye("mail_added_sticker");
                case "market":
                    return ye("mail_added_market_item");
                case "money_transfer":
                    return ye("mail_added_money_transfer");
                case "money_request":
                    return ye("mail_added_money_request");
                case "story":
                    return ye("mail_added_story");
                case "mask":
                    return ye("mail_added_mask");
                case "article":
                    return ye("mail_added_article");
                case "call":
                    return ye("mail_added_call");
                case "poll":
                    return ye("mail_added_poll");
                case "podcast":
                    return ye("mail_added_podcast");
                default:
                    return ye("mail_added_" + e.type)
            }
            return ""
        }

        function Fn(e) {
            me(e, "im-send-btn_loading")
        }

        function Rn(e) {
            pe(e, "im-send-btn_loading")
        }

        function $n(e) {
            var t = e.get(),
                n = Object(s.q)(e);
            if (!n || !Object(b.a)(e, Object(s.p)(e))) return "";
            var r = Object(_.c)(e, n.userId);
            if (!r) return "";
            var a = function(e, t) {
                var n = "";
                if (t && Object(o.j)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                    var r = "%s " + t.kludges.attach1_currency;
                    if ("RUB" === t.kludges.attach1_currency && (r = ye("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                        var a = we(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                            i = we(t.kludges.attach1_total_amount / 1e3, r, !0);
                        n = ye("mail_money_request_collected_amount_from").replace("{amount}", a).replace("{total_amount}", i)
                    } else {
                        var s = we(t.kludges.attach1_tr_amount / 1e3, r, !0);
                        n = ye("mail_money_request_collected_amount").replace("{amount}", s)
                    }
                    if (ee(t.kludges.attach1_held_amount)) {
                        var c = we(t.kludges.attach1_held_amount / 1e3, r, !0);
                        n += " " + ye("mail_money_request_held_amount").replace("{amount}", c)
                    }
                    t.text && (n += '<span class="divider"></span>' + wt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += ve("im_pinned_message_media_bar", {
                        percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                    }))
                }
                return n
            }(e, n);
            if (!a)
                if (!(a = n.text) && n.attaches.length) {
                    var i = An(n.attaches);
                    a = ve("im_pinned_message_media", {
                        text: Hn(i[0], i)
                    })
                } else a = wt(e, a, n && n.kludges || {}) || "";
            return a = a.replace(/<br\s?\/?>/gi, " "), ve("im_pinned_message", {
                date: Ce(n.date, t.timeshift),
                content: a,
                link: r.link,
                name: r.name
            })
        }

        function Un(e, t, n) {
            var r = n.getAttribute("data-info");
            r && Le(n, {
                text: r,
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                hidedt: 1e3,
                shift: [0, 4]
            })
        }

        function zn(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && Le(n, {
                text: ye("mail_message_edited") + " " + Ce(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Kn() {
            var e = getSize(de(K))[1];
            return e || (e = ze), e
        }

        function Wn(e, t) {
            e.bodyNode.addEventListener("mouseover", e => {
                he(e.target, "_im_edit_time") ? zn(t, 0, e.target) : he(e.target, "_im_page_info") && Un(0, 0, e.target)
            })
        }

        function Vn(e, t, n, r, a) {
            var i, s = e.get();
            Wn(Me("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                gid: e.get().gid,
                hash: s.tabs[n].hash
            }, {
                onDone: (n, a) => {
                    a && (i = r(n, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: () => {
                        Ne.loaded && Ne.detachPlayer(!0)
                    },
                    onDestroy: () => {
                        i && i.unmount()
                    }
                }
            }, a), e)
        }

        function Gn(e, t, n) {
            var r = e.get();
            Wn(Me("al_im.php", {
                act: "a_get_replied_message_box",
                chat: r.peer,
                msgid: t,
                gid: r.gid,
                hash: r.tabs[r.peer].hash
            }, {
                onDone: (e, t) => {},
                params: {
                    width: 638,
                    onHide: () => {
                        Ne.loaded && Ne.detachPlayer(!0)
                    },
                    onDestroy: () => {}
                }
            }, n), e)
        }

        function Xn(e, t) {
            return !(!Object(l.b)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Qn(e) {
            return !Object(l.b)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Yn(e, t) {
            var n = Object(_.c)(e, t.peerId),
                r = Object(s.u)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(l.b)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function Jn(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Yn(e, t[n])
        }

        function Zn(e, t) {
            var n = [],
                r = t.find(e => "mail" === e[0]),
                a = r ? r[1].split(";") : [];
            for (a.length > $e && (r[1] = a.slice(0, $e).join(";")); e.length > Re;) {
                var i = e.substr(0, Re).lastIndexOf(" "); - 1 == i && (i = Re), n.push({
                    msgText: te(e.substr(0, i))
                }), e = te(e.substr(i))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), a = a.slice($e); a.length; a = a.slice($e)) n.push({
                attaches: [
                    ["mail", a.slice(0, $e).join(";")]
                ]
            });
            return n
        }

        function er(e) {
            return e.length > Re
        }

        function tr(e, t, n) {
            var r = !1;
            Te("al_im.php", {
                act: "a_chat_preview",
                chat_id: t.invite_chat_id,
                hash: t.invite_hash
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1,
                    hideButtons: !0,
                    onHide() {
                        e.set(n), r && r.unmount()
                    }
                },
                onFail: e => (setTimeout(() => Pe(ye("global_error"), e), 0), !0),
                onDone(t, n) {
                    r = g(t.bodyNode, e)
                }
            }, {})
        }

        function nr() {
            Pe(ye("global_error"), ye("mail_message_wait_until_uploaded"))
        }

        function rr(e, t) {
            var n = Object(s.u)(e, t.peerId) || {},
                r = e.get(),
                a = Object(l.b)(t.peerId) && Object(y.n)(n, r.id),
                i = Object(l.b)(t.peerId) && Object(y.n)(n, t.userId);
            if (!t) return !1;
            if (!Object(o.k)(t) && (!a || i)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (Je(e, t.peerId, t.messageId)) return !1;
            if (Object(l.b)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ar(e, t) {
            return t.map(t => Object(_.c)(e, t))
        }

        function ir(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                a = [];
            if ([
                    [31536e3, ye(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, ye(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, ye(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, ye(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, ye(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, ye(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, ye(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(e => {
                    var t = O(e, 2),
                        n = t[0],
                        i = t[1],
                        s = Math.floor(r / n);
                    r %= n, s >= 1 && a.push(we(s, i))
                }), 1 === (n = a.length)) return a.pop();
            var i = a.slice(0, n - 1).join(", "),
                s = a.pop();
            return ye("global_and").replace(/{before}/gi, i).replace(/{after}/gi, s)
        }

        function sr(e, t, n, a) {
            a && !Je(e, n, a) && (Object(s.n)(e, n, a) ? (e.setState({
                msgid: a
            }), Object(i.b)({
                msgid: a
            }), t()) : e.get().longpoll.push([Object(r.gb)(n, a)]))
        }

        function or(e) {
            var t = de("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                r = Object(s.S)(n.msgs[ce(t, "msgid")]);
            return r && r.peerId == e.get().peer ? r : null
        }

        function cr(e, t) {
            if (Object(s.A)(e)) {
                var n = document.getElementById("ui_rmenu_mr");
                n && (Object(s.d)(e) ? n.classList.remove("unshown") : n.classList.add("unshown"))
            } else t(e)
        }

        function lr(e) {
            var t = Object(h.q)(e),
                n = Number(t.dialog_tab_cts[a.k]),
                r = n > 0 ? n : "",
                i = document.querySelector('._im_right_menu_counter[data-tab="mr"]');
            i && (i.innerHTML = r)
        }
    },
    PjZB: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        n("rGqo"), n("a1Th"), n("Btvt");
        var r = n("q1tI");
        n("17x9");
        class a extends r.Component {
            constructor(e) {
                super(e), this.id = Math.round(1e6 * Math.random()).toString(16), this.setSpinnerParams(e)
            }
            componentWillReceiveProps(e) {
                this.setSpinnerParams(e)
            }
            setSpinnerParams(e) {
                this.offset = Math.round(Math.PI * e.size), this.c = .5 * e.size, this.animation = function(e, t) {
                    if (!e || !t) return "";
                    var n = Object.keys(t).map(e => e + " {" + Object.keys(t[e]).map(n => n + ":" + t[e][n]).join(";") + "}").join("");
                    return `@-webkit-keyframes ${e} {${n}} @keyframes ${e} {${n}}`
                }("dash" + this.id, {
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
            }
            render() {
                var e = this.props,
                    t = e.style,
                    n = e.color,
                    a = e.size,
                    i = e.duration,
                    s = e.strokeWidth,
                    o = this.id,
                    c = this.offset,
                    l = this.animation;
                return r.createElement("div", {
                    className: "Spinner",
                    style: t
                }, r.createElement("svg", {
                    className: "Spinner__svg",
                    width: a,
                    height: a,
                    viewBox: `0 0 ${a} ${a}`,
                    xmlns: "http://www.w3.org/2000/svg"
                }, r.createElement("g", {
                    style: {
                        width: a,
                        height: a,
                        transformOrigin: .5 * a + "px " + .5 * a + "px"
                    }
                }, r.createElement("style", {
                    dangerouslySetInnerHTML: {
                        __html: l
                    }
                }), r.createElement("circle", {
                    className: "Spinner__path",
                    fill: "none",
                    stroke: n,
                    strokeDasharray: c,
                    strokeDashoffset: c,
                    strokeWidth: s,
                    style: {
                        animationName: "dash" + o,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: i + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * a,
                    cy: .5 * a,
                    r: .5 * a - .5 * s
                }))))
            }
        }
        a.defaultProps = {
            color: "#5181b8",
            size: 19,
            strokeWidth: 2,
            duration: 1.4
        }
    },
    QOPk: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return r
        });
        var r = function() {
            var e = function() {
                    for (var e, t, n = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], r = 0, a = n.length, i = {}; r < a; r++)
                        if ((e = n[r]) && e[1] in document) {
                            for (r = 0, t = e.length; r < t; r++) i[n[0][r]] = e[r];
                            return i
                        }
                    return !1
                }(),
                t = {
                    request: function(t) {
                        var n = e.requestFullscreen;
                        (t = t || document.documentElement)[n]()
                    },
                    exit: function() {
                        document[e.exitFullscreen]()
                    },
                    toggle: function(e) {
                        this.isFullscreen ? this.exit() : this.request(e)
                    },
                    raw: e
                };
            return !!e && (Object.defineProperties(t, {
                isFullscreen: {
                    get: function() {
                        return Boolean(document[e.fullscreenElement])
                    }
                },
                element: {
                    enumerable: !0,
                    get: function() {
                        return document[e.fullscreenElement]
                    }
                },
                enabled: {
                    enumerable: !0,
                    get: function() {
                        return Boolean(document[e.fullscreenEnabled])
                    }
                }
            }), t)
        }()
    },
    "T/g7": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return o
        });
        var r = n("nAFc"),
            a = {},
            i = window.getLang,
            s = window.langNumeric;

        function o(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 ? arguments[2] : void 0,
                o = "number" == typeof t,
                c = e + (t || o ? ".raw" : "");
            if (void 0 === a[c]) {
                var l = t || o ? i(e, "raw") : i(e);
                "string" == typeof l ? a[c] = Object(r.a)(l) : Array.isArray(l) && (a[c] = l.map(r.a))
            }
            return o ? s(t, a[c], n) : a[c] || ""
        }
        t.a = {
            getLang: o
        }
    },
    ThPM: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));
        class i extends r.Component {
            render() {
                var e = this.props,
                    t = e.photos,
                    n = e.links,
                    i = e.className,
                    s = Object(a.a)("MembersGrid", `MembersGrid--${Math.min(t.length,4)}`, i);
                return r.createElement("div", {
                    className: s
                }, t.map((e, t) => {
                    var a = n && n[t] ? n[t] : void 0,
                        i = a ? "a" : "span";
                    return r.createElement(i, {
                        key: t,
                        href: a,
                        className: "MembersGrid__i",
                        style: {
                            backgroundImage: `url(${e})`
                        }
                    })
                }))
            }
        }
        i.defaultProps = {
            links: [],
            className: ""
        }
    },
    UlUB: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n, r, a = !1;
            return function i() {
                if (a) return n = arguments, void(r = this);
                e.apply(this, arguments), a = !0, setTimeout(function() {
                    a = !1, n && (i.apply(r, n), n = r = null)
                }, t)
            }
        }
        n.d(t, "a", function() {
            return r
        })
    },
    WDXI: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return l
        });
        n("91GP");
        var r = n("q1tI"),
            a = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("MV/q"),
            o = window.elfocus,
            c = {
                height: "auto"
            };
        class l extends r.Component {
            constructor(e) {
                super(e), this.onChange = (e => {
                    this.props.onChange ? this.props.onChange(e) : this.setState({
                        value: e.target.value,
                        changed: this.props.value !== this.state.value
                    })
                }), this.onClick = (() => {
                    this.setState({
                        editing: !0
                    }, () => {
                        this.textarea && o(this.textarea), this.props.onStartEdit && this.props.onStartEdit()
                    })
                }), this.onBlur = (() => {
                    this.state.changed || this.setState({
                        editing: !1
                    })
                }), this.onSave = (() => {
                    this.props.validate && !this.props.validate(this.state.value) || (this.setState({
                        editing: !1,
                        changed: !1
                    }), this.props.onSave && this.props.onSave({
                        value: this.state.value
                    }))
                }), this.onKeydown = (e => {
                    this.state.editing && (27 === e.keyCode && (this.props.onCancel && this.props.onCancel(), this.setState({
                        editing: !1,
                        changed: !1,
                        value: this.props.value
                    }), e.preventDefault(), e.stopPropagation()), this.props.useEnter && 13 === e.keyCode && (this.onSave(), e.preventDefault(), e.stopPropagation()))
                }), this.getRef = (e => {
                    e && e.element && (this.textarea = e.element)
                }), this.state = {
                    value: e.value,
                    editing: !1,
                    changed: !!e.onChange && e.changed
                }
            }
            componentWillReceiveProps(e) {
                this.setState({
                    value: e.value,
                    changed: e.onChange ? e.changed : e.value === this.state.value
                })
            }
            componentDidMount() {
                this.el = a.findDOMNode(this), this.el.addEventListener("keydown", this.onKeydown)
            }
            componentWillUnmount() {
                this.el.removeEventListener("keydown", this.onKeydown)
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.validate,
                    a = e.placeholder,
                    o = this.state,
                    l = o.editing,
                    d = o.changed,
                    u = o.value,
                    m = Object(i.a)("EditableLabel", {
                        "EditableLabel--editing": l,
                        "EditableLabel--changed": d,
                        "EditableLabel--invalid": n && !n(u)
                    }, t);
                return r.createElement("div", {
                    className: m
                }, l ? r.createElement(r.Fragment, null, r.createElement(s.a, {
                    className: "EditableLabel__textarea",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: u,
                    onBlur: this.onBlur,
                    style: Object.assign({}, c, this.props.textareaStyles),
                    rows: "1",
                    ref: this.getRef,
                    placeholder: a
                }), d && r.createElement("button", {
                    className: "EditableLabel__save",
                    onClick: this.onSave
                })) : r.createElement("div", {
                    className: "EditableLabel__text",
                    onClick: this.onClick
                }, u))
            }
        }
        l.defaultProps = {
            value: "",
            changed: !1,
            useEnter: !1,
            textareaStyles: {},
            placeholder: ""
        }
    },
    Wu9C: function(e, t, n) {
        "use strict";
        var r = n("N1NS"),
            a = n("vT4u");

        function i(e) {
            return {
                unmount() {
                    Object(r.c)(e)
                }
            }
        }

        function s(e, t, n) {
            return (0, Object(r.b)(i).bindMutations)(Object(r.a)({
                handlers: (e, t) => {}
            }))
        }
        var o = n("P13b"),
            c = n("rHUl"),
            l = n("aong"),
            d = n("uytb");
        n.d(t, "a", function() {
            return p
        }), n.d(t, "c", function() {
            return g
        }), n.d(t, "d", function() {
            return h
        }), n.d(t, "e", function() {
            return _
        }), n.d(t, "b", function() {
            return v
        });
        var u = "_im_pin_hide",
            m = "_im_pinned_message";

        function p(e, t) {
            if (Object(l.q)(e).searchShown) return !1;
            var n = Object(c.u)(e, t),
                r = n && Object(c.S)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function g(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                a = Object(c.u)(e, t),
                i = a && Object(c.S)(a.pinned);
            a && i && (a.pinHideId = i.chat_local_id, cur.imDb.update(d.a, [a.peerId, a.pinHideId]), b(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function h(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                a = Object(c.u)(e, t);
            a && a.pinHideId && (delete a.pinHideId, cur.imDb.update(d.a, [a.peerId, void 0]), b(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function _(e, t, n) {
            var r = b.bind(null, n, t),
                i = Object(o.zc)(() => {
                    i.hideProgress(), i.hide(), e.set(a.Oc.bind(null, t)).then(r).then(e => e.set(a.Nc.bind(null, t))).then(r)
                })
        }

        function b(e, t, n) {
            return e().updateChatTopic(t, n), Object(a.oc)(n.get()), e().updateActions(n), n
        }

        function f(e) {
            return {
                unmount() {
                    Object(r.c)(e)
                }
            }
        }

        function v(e, t, n) {
            var a = Object(r.b)(f).bindMutations,
                i = function(e, t, n) {
                    var r = e.get().peer,
                        a = Object(c.S)(Object(c.u)(e, r).pinned);
                    if (n.target.classList.contains(u)) a && g(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var i = a && a.messageId;
                        i && !Object(o.gb)(e, r, i) ? Object(o.N)(e, t().focusOnMessage, r, i) : Object(o.wc)(e, t, r, s, n), statlogsValueEvent("im_pinned_messages", "open")
                    }
                }.bind(null, t, n),
                l = function(e) {
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
            return a(Object(r.a)({
                handlers: (t, n) => {
                    n(e, "click", m, i), n(e, "mouseover", u, l)
                }
            }))
        }
    },
    XTb9: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class o extends r.Component {
            constructor(e) {
                super(e), this.onTransitionEnd = (e => {
                    this.state.shown && "opacity" === e.propertyName && (this.timeout = setTimeout(() => {
                        this.setState({
                            shown: !1
                        }), this.props.callback()
                    }, this.props.duration))
                }), this.state = {
                    shown: e.shown
                }
            }
            componentWillReceiveProps(e) {
                !this.props.shown && e.shown && this.setState({
                    shown: !0
                })
            }
            componentWillUnmount() {
                this.timeout && clearTimeout(this.timeout)
            }
            render() {
                var e = this.props,
                    t = (e.shown, e.callback, e.duration, e.className),
                    n = e.children,
                    o = s(e, ["shown", "callback", "duration", "className", "children"]),
                    c = Object(a.a)("BlinkText", {
                        "BlinkText--shown": this.state.shown
                    }, t);
                return r.createElement("span", i({}, o, {
                    className: c,
                    onTransitionEnd: this.onTransitionEnd,
                    "aria-hidden": !0
                }), n)
            }
        }
        o.defaultProps = {
            duration: 2e3
        }
    },
    XpgC: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        });
        n("91GP");
        var r = n("q1tI"),
            a = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("clTp"),
            o = () => "undefined" != typeof window;
        class c extends r.Component {
            constructor(e) {
                super(e), this.onMouseEnter = (e => {
                    if (this.el) {
                        var t = this.props,
                            n = t.text,
                            r = t.position,
                            a = t.align,
                            i = t.marginTop,
                            o = t.marginLeft,
                            c = t.maxWidth,
                            l = t.appearance,
                            d = Object(s.a)(this.el);
                        this.update({
                            text: n,
                            position: r,
                            align: a,
                            rect: d,
                            marginTop: i,
                            marginLeft: o,
                            maxWidth: c,
                            appearance: l
                        })
                    }
                }), this.onMouseLeave = (e => this.update()), this.onTransitionEnd = (e => {
                    "visibility" === e.propertyName && this.state.tooltip && this.setState({
                        tooltip: void 0
                    })
                }), this.renderTooltip = (() => {
                    if (!this.state.tooltip) return null;
                    var e = this.state.tooltip,
                        t = e.x,
                        n = e.y,
                        a = e.position,
                        s = e.align,
                        o = e.text,
                        c = e.removed,
                        l = e.maxWidth,
                        d = e.appearance,
                        u = Object(i.a)("Tooltip", `Tooltip--${a}`, `Tooltip--${d}`, {
                            "Tooltip--removed": !!c,
                            [`Tooltip--align-${s}`]: "t" === a || "b" === a
                        });
                    return r.createElement("div", {
                        className: u,
                        style: {
                            top: n,
                            left: t
                        },
                        onTransitionEnd: this.onTransitionEnd
                    }, r.createElement("div", {
                        className: "Tooltip__in",
                        style: {
                            maxWidth: l
                        },
                        dangerouslySetInnerHTML: {
                            __html: o
                        }
                    }))
                }), this.state = {}
            }
            componentDidMount() {
                this.el = a.findDOMNode(this), this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave)
            }
            componentWillUnmount() {
                this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("mouseleave", this.onMouseLeave)
            }
            update(e) {
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
                    s = e.marginLeft,
                    o = e.maxWidth,
                    c = e.appearance,
                    l = a.left,
                    d = a.top;
                switch (t) {
                    case "t":
                        l += .5 * a.width;
                        break;
                    case "r":
                        l += a.width, d += .5 * a.height;
                        break;
                    case "b":
                        l += .5 * a.width, d += a.height;
                        break;
                    case "l":
                        d += .5 * a.height
                }
                l = Math.round(l + s), d = Math.round(d + i), this.setState({
                    tooltip: {
                        position: t,
                        align: n,
                        text: r,
                        x: l,
                        y: d,
                        maxWidth: o,
                        appearance: c
                    }
                })
            }
            render() {
                var e = this.renderTooltip();
                return e ? (!this.defaultNode && o() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), r.createElement(r.Fragment, null, this.props.children, a.createPortal(e, this.defaultNode))) : this.props.children
            }
        }
        c.defaultProps = {
            position: "b",
            align: "center",
            marginTop: 0,
            marginLeft: 0,
            appearance: "dark"
        }
    },
    dLHM: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }
        class o extends r.Component {
            constructor(e) {
                super(e), this.onChange = (e => {
                    this.isControlledOutside || this.setState({
                        value: e.target.value
                    }), this.props.onChange && this.props.onChange(e)
                }), this.getRef = (e => {
                    this.element = e
                }), void 0 !== e.value || e.isControlledOutside ? this.isControlledOutside = !0 : this.state = {
                    value: e.initialValue || ""
                }
            }
            render() {
                var e = this.props,
                    t = e.alignment,
                    n = e.value,
                    o = (e.onChange, e.initialValue, e.className),
                    c = (e.isControlledOutside, s(e, ["alignment", "value", "onChange", "initialValue", "className", "isControlledOutside"])),
                    l = {
                        "Input--left": "left" === t,
                        "Input--center": "center" === t,
                        "Input--right": "right" === t
                    };
                return r.createElement("input", i({}, c, {
                    className: Object(a.a)("Input", l, o),
                    ref: this.getRef,
                    value: this.isControlledOutside ? n : this.state.value,
                    onChange: this.onChange
                }))
            }
        }
        o.defaultProps = {
            type: "text",
            initialValue: "",
            alignment: "left"
        }
    },
    eTng: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "c", function() {
            return l
        }), n.d(t, "d", function() {
            return d
        }), n.d(t, "b", function() {
            return u
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("Btvt"), n("KKXr");

        function r(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var a = window.intval;

        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = r(e.split("_"), 2);
            return [n[0], n[1], t]
        }
        var s = {};

        function o(e) {
            if (s[e]) return s[e];
            for (var t = e ? e.length : 0, n = [], a = [], o = "", c = 0; c < t; c++) {
                var l = e[c],
                    d = l.charCodeAt(0);
                d >= 48 && d <= 57 || "_" === l || "-" === l ? o += l : "(" !== l && ")" !== l && ":" !== l && "," !== l || ("" !== o && (a.push(o), n.push("id"), o = ""), a.push(l), n.push(l))
            }
            o.length > 0 && (a.push(o), n.push("id"));
            var u = r(function e(t, n) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                if (s > 50) return [
                    [], t.length
                ];
                for (var o = [], c = ""; a < t.length;) {
                    var l = t[a];
                    if ("id" === l) c = n[a];
                    else if ("," === l && c) o.push(i(c)), c = "";
                    else if ("(" === l) {
                        var d = r(e(t, n, a + 1, s + 1), 2),
                            u = d[0];
                        a = d[1], o.push(i(c, u)), c = ""
                    } else if (")" === l) return "" !== c && o.push(i(c)), [o, a];
                    a++
                }
                return c && o.push(i(c)), [o, a]
            }(n, a), 1)[0];
            return Object.keys(s).length > 300 && (s = {}), s[e] = u, u
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
                    fwd_count: o(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: a(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: a(e["attach" + r + "_call_duration"]),
                receiverId: a(e["attach" + r + "_call_receiver_id"])
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

        function l(e) {
            return 0 == e
        }

        function d(e) {
            return e > 0 && e < 2e9
        }

        function u(e) {
            return e > 2e9
        }
    },
    enZq: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));

        function i(e) {
            var t = {
                "List--border": !!e.border
            };
            return r.createElement("ul", {
                className: Object(a.a)("List", t, e.className),
                style: e.style
            }, e.children)
        }
        i.defaultProps = {
            border: !0
        }
    },
    f01n: function(e, t, n) {
        "use strict";
        n.d(t, "Y", function() {
            return s
        }), n.d(t, "Q", function() {
            return o
        }), n.d(t, "U", function() {
            return c
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "J", function() {
            return d
        }), n.d(t, "K", function() {
            return u
        }), n.d(t, "s", function() {
            return m
        }), n.d(t, "r", function() {
            return p
        }), n.d(t, "d", function() {
            return g
        }), n.d(t, "e", function() {
            return h
        }), n.d(t, "ab", function() {
            return _
        }), n.d(t, "N", function() {
            return b
        }), n.d(t, "cb", function() {
            return f
        }), n.d(t, "bb", function() {
            return v
        }), n.d(t, "I", function() {
            return y
        }), n.d(t, "h", function() {
            return j
        }), n.d(t, "T", function() {
            return O
        }), n.d(t, "P", function() {
            return w
        }), n.d(t, "X", function() {
            return k
        }), n.d(t, "W", function() {
            return C
        }), n.d(t, "O", function() {
            return S
        }), n.d(t, "Z", function() {
            return E
        }), n.d(t, "V", function() {
            return I
        }), n.d(t, "H", function() {
            return x
        }), n.d(t, "b", function() {
            return T
        }), n.d(t, "c", function() {
            return P
        }), n.d(t, "i", function() {
            return M
        }), n.d(t, "S", function() {
            return L
        }), n.d(t, "f", function() {
            return B
        }), n.d(t, "g", function() {
            return D
        }), n.d(t, "R", function() {
            return N
        }), n.d(t, "db", function() {
            return q
        }), n.d(t, "M", function() {
            return H
        }), n.d(t, "L", function() {
            return F
        }), n.d(t, "m", function() {
            return R
        }), n.d(t, "l", function() {
            return $
        }), n.d(t, "n", function() {
            return U
        }), n.d(t, "j", function() {
            return z
        }), n.d(t, "o", function() {
            return K
        }), n.d(t, "k", function() {
            return W
        }), n.d(t, "q", function() {
            return V
        }), n.d(t, "p", function() {
            return G
        }), n.d(t, "C", function() {
            return X
        }), n.d(t, "v", function() {
            return Q
        }), n.d(t, "t", function() {
            return Y
        }), n.d(t, "y", function() {
            return J
        }), n.d(t, "B", function() {
            return Z
        }), n.d(t, "D", function() {
            return ee
        }), n.d(t, "F", function() {
            return te
        }), n.d(t, "E", function() {
            return ne
        }), n.d(t, "u", function() {
            return re
        }), n.d(t, "w", function() {
            return ae
        }), n.d(t, "z", function() {
            return ie
        }), n.d(t, "A", function() {
            return se
        }), n.d(t, "x", function() {
            return oe
        }), n.d(t, "G", function() {
            return ce
        }), n.d(t, "lb", function() {
            return le
        }), n.d(t, "Cb", function() {
            return de
        }), n.d(t, "Kb", function() {
            return ue
        }), n.d(t, "Gb", function() {
            return me
        }), n.d(t, "eb", function() {
            return pe
        }), n.d(t, "mb", function() {
            return ge
        }), n.d(t, "Db", function() {
            return he
        }), n.d(t, "nb", function() {
            return _e
        }), n.d(t, "ub", function() {
            return be
        }), n.d(t, "vb", function() {
            return fe
        }), n.d(t, "rb", function() {
            return ve
        }), n.d(t, "qb", function() {
            return ye
        }), n.d(t, "Fb", function() {
            return je
        }), n.d(t, "Bb", function() {
            return Oe
        }), n.d(t, "Jb", function() {
            return we
        }), n.d(t, "kb", function() {
            return ke
        }), n.d(t, "ib", function() {
            return Ce
        }), n.d(t, "jb", function() {
            return Se
        }), n.d(t, "Mb", function() {
            return Ee
        }), n.d(t, "yb", function() {
            return Ie
        }), n.d(t, "Ob", function() {
            return xe
        }), n.d(t, "Nb", function() {
            return Te
        }), n.d(t, "tb", function() {
            return Pe
        }), n.d(t, "Ab", function() {
            return Me
        }), n.d(t, "fb", function() {
            return Le
        }), n.d(t, "ob", function() {
            return Be
        }), n.d(t, "Lb", function() {
            return De
        }), n.d(t, "Ib", function() {
            return Ne
        }), n.d(t, "zb", function() {
            return Ae
        }), n.d(t, "Pb", function() {
            return qe
        }), n.d(t, "xb", function() {
            return He
        }), n.d(t, "wb", function() {
            return Fe
        }), n.d(t, "Hb", function() {
            return Re
        }), n.d(t, "gb", function() {
            return $e
        }), n.d(t, "hb", function() {
            return Ue
        }), n.d(t, "pb", function() {
            return ze
        }), n.d(t, "sb", function() {
            return Ke
        }), n.d(t, "Eb", function() {
            return We
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("OEbY");
        var r = n("eTng");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var i = "event_delete",
            s = "event_set_flags",
            o = "event_replace_flags",
            c = "event_reset_flags",
            l = "event_add_message",
            d = "event_read_inbound",
            u = "event_read_outbound",
            m = "event_got_online",
            p = "event_got_offline",
            g = "event_chat_changed",
            h = "event_chat_updated",
            _ = "event_typing",
            b = "event_recoding_audio",
            f = "event_video_call",
            v = "event_unread_count",
            y = "event_notify_settings_changed",
            j = "event_empty",
            O = "event_reset_directories",
            w = "event_replace_directories",
            k = "event_set_directories",
            C = "event_resync",
            S = "event_refresh_lp_key",
            E = "transition_event",
            I = "reset_peer",
            x = "mutex",
            T = "change_peer",
            P = "event_change_tab",
            M = "event_failed_message",
            L = "event_resend",
            B = "event_delete_dialog",
            D = "event_edit_message",
            N = "event_replace_message",
            A = "event_audio_start",
            q = "event_waiting_for_reconnect",
            H = "event_reconnecting",
            F = "event_reconnected",
            R = 2,
            $ = 8,
            U = 64,
            z = 128,
            K = 65536,
            W = 1 << 21,
            V = 1,
            G = 8,
            X = 1,
            Q = 2,
            Y = 3,
            J = 4,
            Z = 5,
            ee = 6,
            te = 7,
            ne = 8,
            re = 9,
            ae = 10,
            ie = 11,
            se = 12,
            oe = 13,
            ce = 3;

        function le(e) {
            var t = a(e, 2)[1];
            return {
                type: i,
                localId: t
            }
        }

        function de(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: o,
                messageId: n,
                mask: r,
                peerId: i
            }
        }

        function ue(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: s,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function me(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: c,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function pe(e) {
            var t = a(e, 11),
                n = t[1],
                i = t[2],
                s = t[3],
                o = t[4],
                c = t[5],
                d = t[6],
                u = t[7],
                m = t[8],
                p = t[9],
                g = t[10],
                h = extend(d, u || void 0);
            return {
                type: l,
                messageId: intval(n),
                flags: intval(i),
                peerId: intval(s),
                date: intval(o),
                attaches: Object(r.a)(h, n),
                subject: d.title || "",
                text: c,
                kludges: h,
                randomId: intval(m),
                userId: Object(r.b)(s) ? intval(h.from) : intval(s),
                update_time: g,
                chat_local_id: p
            }
        }

        function ge(e) {
            var t = pe(e);
            return t.type = D, t
        }

        function he(e) {
            var t = pe(e);
            return t.type = N, t
        }

        function _e(e) {
            return extend({}, e, {
                type: D
            })
        }

        function be(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: d,
                peerId: n,
                upToId: r,
                unread: i
            }
        }

        function fe(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: u,
                peerId: n,
                upToId: r,
                unread: i
            }
        }

        function ve(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: m,
                userId: -n,
                platform: r,
                lastSeenTs: i
            }
        }

        function ye(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: p,
                userId: -n,
                reason: r,
                lastSeenTs: i
            }
        }

        function je(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: O,
                peerId: n,
                mask: r,
                local: void 0 !== i && i
            }
        }

        function Oe(e) {
            var t = a(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: w,
                peerId: n,
                mask: r
            }
        }

        function we(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: k,
                peerId: n,
                mask: r,
                local: void 0 !== i && i
            }
        }

        function ke(e) {
            var t = a(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: B,
                peerId: n,
                localId: r
            }
        }

        function Ce(e) {
            var t = a(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: g,
                chatId: n,
                self: r
            }
        }

        function Se(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: h,
                peerId: r,
                updateType: n,
                updateArg: i
            }
        }

        function Ee(e) {
            var t = a(e, 5),
                n = t[1],
                r = t[2],
                i = t[3],
                s = t[4];
            return {
                type: _,
                peerId: n,
                userIds: r,
                totalCount: i,
                ts: s
            }
        }

        function Ie(e) {
            var t = a(e, 5),
                n = t[1],
                r = t[2],
                i = t[3],
                s = t[4];
            return {
                type: b,
                peerId: n,
                userIds: r,
                totalCount: i,
                ts: s
            }
        }

        function xe(e) {
            var t = a(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: f,
                userId: n,
                callId: r
            }
        }

        function Te(e) {
            var t = a(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: v,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: i
            }
        }

        function Pe(e) {
            var t = a(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: y,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function Me(e) {
            var t = a(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = pe([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = D, r
        }

        function Le(e) {
            var t = a(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: A,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Be(e) {
            return {
                type: j,
                params: e
            }
        }

        function De(e) {
            return {
                type: E,
                state: e
            }
        }

        function Ne() {
            return {
                type: C
            }
        }

        function Ae(e) {
            var t = a(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: S,
                key: n,
                url: r
            }
        }

        function qe(e) {
            var t = a(e, 2)[1];
            return {
                type: q,
                timeout: t
            }
        }

        function He() {
            return {
                type: H
            }
        }

        function Fe() {
            return {
                type: F
            }
        }

        function Re() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: I,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function $e(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: T,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: a
            }
        }

        function Ue(e) {
            return {
                type: P,
                tab: e
            }
        }

        function ze(e, t, n) {
            return {
                type: M,
                message: t,
                peer: e,
                error: n
            }
        }

        function Ke(e) {
            var t = a(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                i = t[3],
                s = t[4],
                o = t[5];
            return {
                type: x,
                free: !!intval(n) || intval(s) === vk.id,
                resource: r,
                peerId: intval(i),
                who: intval(s),
                name: o
            }
        }

        function We(e, t) {
            return {
                type: L,
                message: t,
                peerId: e
            }
        }
    },
    f4YT: function(e, t) {
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
            im_simple_name: function() {
                return '<div class="im-page--title %more_cls%"> <span class="im-page--title-main" title="%name_attr%" %ads_union%><span class="im-page--title-main-in"><a href="%href%" target="_blank" class="im-page--title-main-inner _im_page_peer_name">%name%</a><span class="im-page--title-main-verified _im_chat_verified"></span></span></span> <span class="im-page--title-meta _im_page_peer_online">%online%</span> <span class="im-page--title-status _im_page_status"></span> <button class="im-page--title-reconnect _im_page_reconnect">' + getLang("mail_network_reconnect") + "</button> </div>"
            },
            im_simple_link: '<a href="%href%" class="_im_header_link" target="_blank">%content%</a>',
            im_selected_messages: '<span class="im-page--selected-messages-count">%label%</span> <button aria-label="%tip%" type="button" class="im-page--selected-messages-remove"></button>',
            im_topic: "<div class='im-topic %cls%'>%topic%</div>",
            im_stack_date: ' <a href="%link%" class="_im_mess_link" >%date%</a>',
            im_dialogs_none: '<li data-list-id="002300" class="im-page--dialogs-empty"> %msg%</li>',
            im_dialogs_message_requests_button: '<li class="im-page--dialogs-message-requests-button _im_toggle_mr_tab" data-list-id="%list_id%"> %msg%</li>',
            im_dialogs_message_requests_notice: '<li class="im-page--dialogs-message-requests-notice-w" data-list-id="message_request_notice"> <div class="im-page--dialogs-message-requests-notice"> %msg% </div> </li>',
            im_filter: '<a class="im-page--dialogs-filter %cls%">%filter%</a>',
            im_drow_prebody: '<span class="nim-dialog--who">%prebody%</span> <span class="nim-dialog--inner-text">%body%</span>',
            im_attach_mess: ' <div class="im-fwd %modifier%"> <span class="im-fwd--title"> <span class="im-fwd--title-name">%text%</span> <span class="im-fwd--date">%date%</span></span> <span class="im-fwd--close _im_fwd_close"></span> <div rel="button" tab-index="0" type="button" class="im-fwd--messages _im_will_fwd">%messages%</div> </div>',
            im_preloader: '<div class="im-preloader %cls%"> %preloader%</div>',
            im_service_row: '<ul class="ui_clean_list"> <li class="im-mess im-mess_srv _im_mess _im_mess_srv _im_mess_%message_id%" data-msgid="%message_id%" data-from="%from_id%" data-ts="%date%"> <div class="im-mess--text">%text%</div> </li> </ul>',
            im_chat_members: '<button type="button" class="_im_chat_members im-page--members">%name%</button>',
            im_vkcomgroup_members: '<span class="im-page--members im-page--members--nohover">%name%</span>',
            im_mess_stack: '<div class="im-mess-stack _im_mess_stack %cls%" data-peer="%peerId%" data-admin="%admin%"> <div class="im-mess-stack--photo"> <div class="nim-peer nim-peer_small fl_l"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> <a target="_blank" class="im_grid" href="%href%"><img alt="%name%" src="%photo%" /></a> </div> </div> </div> </div> <div class="im-mess-stack--content"> <div class="im-mess-stack--info"> <div class="im-mess-stack--pname"> %stack_name% <span class="im-mess-stack--tools">%date%</span> </div> </div> <ul class="ui_clean_list im-mess-stack--mess _im_stack_messages"> %messages% </ul> </div> </div>',
            im_mess_stack_name: '<a href="%link%" class="im-mess-stack--lnk%class%" title="" target="_blank">%name%</a>',
            im_message_media: '<div class="_im_msg_%type%%messageId%" class="wall_module">%attaches%</div>%text%',
            im_dialog_media: '<span class="nim-dialog--preview nim-dialog--preview-attach">%name%</span>',
            im_typing: '<div class="im-page--typing _im_typing"> <div class="im-activity %cls%"><div class="pr im-activity--icon"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><span class="_im_typing_name">&nbsp;</span></div> </div>',
            ctrl_submit_hint: function() {
                return '<div class="reply_submit_hint_wrap" >\n  <div class="reply_submit_hint_title">' + getLang("wall_reply_submit_settings") + '</div>\n  <div class="reply_submit_hint_opts" id="">\n    <div class="radiobtn %enter_on% _im_submit_btn" data-val="0" onclick="radiobtn(this, 0, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_1") + '</div></div>\n    <div class="radiobtn %ctrl_on% _im_submit_btn" data-val="1" onclick="radiobtn(this, 1, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_2") + "</div></div>\n  </div>\n</div>"
            },
            im_day_bar: '<h5 class="im-page--history-new-bar im-page--history-new-bar_days _im_bar_date %day_class%" data-date="%date%"><span>%day%</span></h5>',
            im_mess_bar: function() {
                return '<h4 class="im-page--history-new-bar _im_unread_bar_row"><span>' + getLang("mail_new_unread_msgs") + "</span></h4>"
            },
            im_replied_message: '<div class="im-replied"> <div class="im-replied--photo-wrapper"></div> <div class="im-replied--content"> <div class="im-replied--author"> <span class="im-replied--author-link">%authorName%</span> </div> <div class="im-replied--text">%text%</div> </div> </div>',
            im_drow: function() {
                return '<li data-list-id="%peer%" class="nim-dialog _im_dialog _im_dialog_%peer% %is_unread% %is_unread_out% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <div class="nim-dialog--date _im_dialog_date">%date%</div> <button type="button" class="nim-dialog--close _im_dialog_close" data-peer="%peer%"></button> <button type="button" class="nim-dialog--markre _im_dialog_markre"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> <span class="nim-dialog--verfifed _im_dialog_verified"></span> <span class="nim-dialog--mute"></span> <button type="button" class="nim-dialog--star _im_dialog_star"></button> </div> <div class="nim-dialog--text-preview"> <span class="nim-dialog--preview _dialog_body" tabindex="0">%body%</span> <span class="nim-dialog--typing _im_dialog_typing"></span><span class="nim-dialog--typer-el"></span> </div> <label class="blind_label _im_unread_blind_label">%unread_message_string%</label> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
            },
            im_conversation_search_row: function() {
                return '<li data-list-id="%peer%" class="nim-dialog nim-conversation-search-row _im_dialog _im_dialog_%peer% %is_unread% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer nim-peer_search %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <button type="button" class="nim-dialog--close _im_dialog_close" data-peer="%peer%"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> </div> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
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
                return '<div class="im-mess--actions"> <span role="link" aria-label="' + getLang("mail_im_mark_forward") + '" class="im-mess--forward _im_mess_forward"></span> <span role="link" aria-label="' + getLang("mail_im_reply") + '" class="im-mess--reply _im_mess_reply"></span> <span role="link" aria-label="' + getLang("mail_im_edit") + '" class="im-mess--edit _im_mess_edit"></span> <span role="link" aria-label="' + getLang("mail_important_message") + '" class="im-mess--fav _im_mess_fav"></span> </div> <div class="im-mess--check fl_l"></div>'
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
            sImLblWasSourceInfo: function() {
                return " <span class='im-mess--lbl-was-edited _im_page_info' data-info='%source%'>" + getLang("mail_was_source_short") + "</span>"
            },
            im_top_banner: '<div class="im-top-banner">\n  %icon%\n  <div class="im-top-banner--text"><div>%text%</div></div>\n  <div class="im-top-banner--buttons">%buttons%</div>\n</div>',
            im_top_banner_icon: '<div class="im-top-banner--icon">\n  <img src="%icon%" alt=""/>\n</div>',
            im_top_banner_button_link: '<a href="%link%" target="_blank" class="_im_top_banner_button im-top-banner--button %css_class% flat_button">%text%</a>',
            im_top_banner_button: '<button class="_im_top_banner_button im-top-banner--button %css_class% flat_button" data-payload="%callback_data%">%text%</button>',
            im_top_banner_hide_btn: '<button class="im-top-banner--button im-top-banner--button_hide _im_top_banner_hide"></button>',
            im_calls_link: '<a href="/calls" class="im_srv_lnk_light" onclick="return showWiki({ w: \'calls\'});">%text%</a>',
            sImPeerMuteUnmute: '<a href="#" class="_im_peer_mute_unmute ui_actions_menu_item im-action nohover %cls%">%text%</a>',
            sImPeerAcceptOrRejectMessageRequest: function() {
                return "<p>" + getLang("mail_message_request_user_notice") + '</p> <p> <button type="button" class="flat_button %cls_accept%">' + getLang("mail_message_request_accept") + '</button> <button type="button" class="flat_button secondary %cls_reject%">' + getLang("mail_message_request_reject") + "</button> </p>"
            },
            sImPeerReturnToChat: '<a href="#" class="_im_peer_return_to_chat">%text%</a>'
        }
    },
    g6Ay: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return r
        });
        n("VRzm"), n("Btvt");

        function r() {
            var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia;
            e && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = function(t) {
                return new Promise(function(n, r) {
                    e ? e.call(navigator, t, n, r) : r(new Error("NotSupported"))
                })
            }), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = function() {
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
            })), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
        }
    },
    gF8j: function(e, t, n) {
        "use strict";
        var r = n("uQjJ");

        function a() {
            return !!window.isMVK
        }
        n.d(t, "a", function() {
            return s
        });
        var i = browser.iphone || browser.ipad || browser.ipod;

        function s(e) {
            this.started = !1, this.is_idle = !0, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.onVisiblityChange = this.onVisiblityChange.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }

        function o(e, t, n) {
            a() ? window.addEvent(e, t, n, {
                passive: !0
            }) : window.addEvent(e, t, n)
        }

        function c(e, t, n) {
            a() ? window.removeEvent(e, t, n, {
                passive: !0
            }) : window.removeEvent(e, t, n)
        }

        function l() {
            return document.visibilityState || document.webkitVisibilityState
        }

        function d() {
            var e = "visibilitychange";
            return document.visibilityState || (document.webkitVisibilityState ? e += "webkit" : e = ""), e
        }
        extend(s.prototype, r.a.prototype), extend(s.prototype, {
            stop: function() {
                this.started = !1, c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), a() && this._isTopLevel() && d() && c(document, d(), this.onVisiblityChange), a() && i || (c(this.opts.focusElement, "focus", this.cbActiveB), c(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
            },
            idle: function(e) {
                this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
            },
            unidle: function(e) {
                this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
            },
            start: function() {
                this.started = !0, !a() && browser.mobile || (this.is_idle = !this._isFocused(), this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), a() && this._isTopLevel() && d() && o(document, d(), this.onVisiblityChange), a() && i || (o(this.opts.focusElement, "focus", this.cbActiveB), o(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            checkIdleCb: function() {
                this.started && (o(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
            },
            cbActive: function() {
                this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
                }.bind(this), 100)), c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            cbInactive: function() {
                this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
                }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), o(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
            },
            getActiveTime() {
                return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
            },
            onVisiblityChange() {
                "visible" === l() ? this.cbActiveB() : this.cbInactiveB()
            },
            _isTopLevel() {
                var e = this.opts.focusElement;
                return e === window || e === document
            },
            _isFocused() {
                var e = this.opts.focusElement;
                if (this._isTopLevel()) {
                    var t = l();
                    return "string" == typeof t && "visible" === t
                }
                return document.activeElement === e
            }
        })
    },
    "h++7": function(e, t, n) {
        "use strict";
        n.d(t, "t", function() {
            return r
        }), n.d(t, "f", function() {
            return a
        }), n.d(t, "B", function() {
            return i
        }), n.d(t, "q", function() {
            return s
        }), n.d(t, "r", function() {
            return o
        }), n.d(t, "b", function() {
            return c
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "v", function() {
            return d
        }), n.d(t, "u", function() {
            return u
        }), n.d(t, "d", function() {
            return m
        }), n.d(t, "o", function() {
            return p
        }), n.d(t, "e", function() {
            return g
        }), n.d(t, "z", function() {
            return h
        }), n.d(t, "A", function() {
            return _
        }), n.d(t, "w", function() {
            return b
        }), n.d(t, "m", function() {
            return f
        }), n.d(t, "h", function() {
            return v
        }), n.d(t, "n", function() {
            return y
        }), n.d(t, "i", function() {
            return j
        }), n.d(t, "k", function() {
            return O
        }), n.d(t, "l", function() {
            return w
        }), n.d(t, "g", function() {
            return k
        }), n.d(t, "j", function() {
            return C
        }), n.d(t, "y", function() {
            return S
        }), n.d(t, "p", function() {
            return E
        }), n.d(t, "c", function() {
            return I
        }), n.d(t, "s", function() {
            return x
        }), n.d(t, "x", function() {
            return P
        });
        n("Oyvg");
        var r = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            a = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            i = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            s = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            o = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            c = 38,
            l = 40,
            d = 33,
            u = 34,
            m = 35,
            p = 36,
            g = 13,
            h = [c, l, d, u, g, 27, m, p],
            _ = [d, u, l, c, p, m],
            b = "printable",
            f = "unread",
            v = "all",
            y = "unrespond",
            j = "important",
            O = "mr",
            w = "mr_rejected",
            k = [v, f, y, j, O],
            C = {
                [y]: 2,
                [j]: 1,
                [O]: 256,
                [w]: 512
            },
            S = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(e => "xn--" + e)),
            E = S.reduce((e, t) => Math.max(e, t.length), 0),
            I = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            x = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            T = "(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))",
            P = `(^|[s.,:'";>)(]?)(${`(#${T}{0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))${T}{0,100})`})(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'"&;?<)(]?)`
    },
    hIV1: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var r = n("q1tI"),
            a = n("pemR");

        function i(e) {
            var t = {
                "SubmitArea--left": !e.alignment || "left" === e.alignment,
                "SubmitArea--center": "center" === e.alignment,
                "SubmitArea--right": "right" === e.alignment
            };
            return r.createElement("div", {
                className: Object(a.a)("SubmitArea", t),
                style: e.style
            }, e.children)
        }
    },
    hOuX: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        n("tuSo");
        var r = 2147483647;

        function a() {
            try {
                if (window.crypto) {
                    var e = new Int32Array(1);
                    return crypto.getRandomValues(e), Math.abs(e.reduce((e, t) => e + t))
                }
            } catch (e) {}
            return intval(rand(0, r).toFixed(0))
        }
    },
    hhXQ: function(e, t, n) {
        var r = n("XKFU"),
            a = n("UExd")(!1);
        r(r.S, "Object", {
            values: function(e) {
                return a(e)
            }
        })
    },
    iN1s: function(e, t, n) {
        "use strict";
        n("rGqo"), n("Btvt"), n("rE2o"), n("ioFf"), n("VRzm");
        var r = n("DM26"),
            a = n("BxOC"),
            i = n("f01n");

        function s(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var o = 202,
            c = 7,
            l = 4,
            d = -3,
            u = -4,
            m = -5;

        function p(e, t) {
            e.waitAbortFns.push(t)
        }

        function g(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(a.a)(e.url, {
                    act: "a_check",
                    key: e.key,
                    version: e.version,
                    ts: e.ts,
                    wait: 25,
                    mode: e.mode
                }),
                n = t.request,
                i = t.cancel;
            return e.stopFn = i, n.then(t => {
                var n = s(t, 2),
                    r = n[0],
                    a = n[1];
                return e.onData(e, a), e.waitTimeout = 2, JSON.parse(r)
            }).catch(t => {
                var n = s(t, 2),
                    r = (n[0], n[1]);
                throw e.onData(e, r), ""
            }).then(t => (function(e, t) {
                var n = t.failed ? Object(r.a)(l, null) : {},
                    a = n.abort,
                    i = n.pause;
                switch (t.failed) {
                    case 1:
                        return p(e, a), e.onHistoryLost(e, t).then(() => e.onResult({
                            ts: t.ts,
                            updates: [
                                [-1]
                            ]
                        })).then(i).then(() => g(e));
                    case 2:
                        return p(e, a), e.onKeyExpired(e, t).then(t => {
                            var n = s(t, 4),
                                r = n[0],
                                a = n[1],
                                i = n[2],
                                o = n[3];
                            return e.onResult({
                                ts: +o,
                                updates: [
                                    [-2, r, `${a}/${i}`],
                                    [-1]
                                ]
                            })
                        }).then(i).then(() => g(e));
                    case 3:
                        return e.onLpBroken(e, t);
                    default:
                        return t
                }
            })(e, t))
        }

        function h(e) {
            e.isStoppedFn() || g(e).then(e.onResult).then(() => e.isReconnecting && _(e, m)).catch(t => (function(e, t) {
                if (e.isStoppedFn()) return;
                e.onRequestError(t), e.waitTimeout = Math.min(60, 2 * e.waitTimeout), _(e, d);
                var n = Object(r.a)(e.waitTimeout, null),
                    a = n.abort,
                    i = n.pause;
                return p(e, a), i().then(() => _(e, u))
            })(e, t)).then(() => h(e))
        }

        function _(e, t) {
            e.isReconnecting = t === u, e.onResult({
                ts: e.ts,
                updates: [
                    [t, e.waitTimeout]
                ]
            })
        }

        function b(e, t) {
            var n = !!e.stopped,
                r = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: e.version || c,
                    mode: o,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: () => n,
                    onResult: e => {
                        e.ts && s(r.ts, e.ts, function(e) {
                            return e.map(e => {
                                switch (e[0]) {
                                    case 0:
                                        return i.lb(e);
                                    case 1:
                                        return i.Cb(e);
                                    case 2:
                                        return i.Kb(e);
                                    case 3:
                                        return i.Gb(e);
                                    case 4:
                                        return i.eb(e);
                                    case 5:
                                        return i.mb(e);
                                    case 6:
                                        return i.ub(e);
                                    case 7:
                                        return i.vb(e);
                                    case 8:
                                        return i.rb(e);
                                    case 9:
                                        return i.qb(e);
                                    case 10:
                                        return i.Fb(e);
                                    case 11:
                                        return i.Bb(e);
                                    case 12:
                                        return i.Jb(e);
                                    case 13:
                                        return i.kb(e);
                                    case 18:
                                        return i.Db(e);
                                    case 51:
                                        return i.ib(e);
                                    case 52:
                                        return i.jb(e);
                                    case 63:
                                        return i.Mb(e);
                                    case 64:
                                        return i.yb(e);
                                    case 70:
                                        return i.Ob(e);
                                    case 80:
                                        return i.Nb(e);
                                    case 114:
                                        return i.tb(e);
                                    case 116:
                                        return i.Ab(e);
                                    case 117:
                                        return i.fb(e);
                                    case -1:
                                        return i.Ib();
                                    case -2:
                                        return i.zb(e);
                                    case d:
                                        return i.Pb(e);
                                    case u:
                                        return i.xb();
                                    case m:
                                        return i.wb();
                                    default:
                                        return i.ob(e)
                                }
                            })
                        }(e.updates))
                    },
                    onData: f(t.onData),
                    onRequestError: f(t.onRequestError),
                    onHistoryLost: v(t.onHistoryLost),
                    onKeyExpired: v(t.onKeyExpired),
                    onLpBroken: v(t.onHistoryLost)
                },
                a = t.onEvents;

            function s(e, t, n) {
                r.ts = t;
                for (var s = 0; s < n.length; ++s) n[s].type === i.O && (r.key = n[s].key, r.url = n[s].url);
                a(e, t, n)
            }
            var l = {
                options: r,
                isStopped: () => n,
                stopConnection() {
                    n = !0, r.stopFn && r.stopFn(), r.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection() {
                    this.stopConnection(), _(r, u), n = !1, h(r)
                },
                abortWaiting() {
                    r.waitAbortFns.forEach(e => e()), r.waitAbortFns = [], r.waitTimeout = 2
                },
                onLp: s
            };
            return h(r), l
        }

        function f(e) {
            return e || (() => {})
        }

        function v(e) {
            return e ? function() {
                return Promise.resolve(e(...arguments))
            } : () => Promise.reject()
        }
        var y = n("P+eJ"),
            j = n("vT4u");

        function O(e, t) {
            return b(e, {
                onEvents: t,
                onData: S,
                onRequestError: E,
                onHistoryLost: I,
                onKeyExpired: x,
                onLpBroken: T
            })
        }
        n.d(t, "a", function() {
            return O
        });
        var w = 3e4,
            k = {},
            C = Date.now();

        function S(e, t) {
            if (t && t.status && e.lpstat) {
                var n = t.status;
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, n, t.getResponseHeader("x-frontend")), k[n] = n in k ? k[n] + 1 : 1, Date.now() - C >= w && (Object.keys(k).forEach(e => {
                    statlogsValueEvent("fc_longpoll", k[e], e, t.getResponseHeader("x-frontend"))
                }), k = {}, C = Date.now())
            }
        }

        function E(e) {
            Object(y.b)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function I(e, t) {
            Object(y.b)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function x(e) {
            return Object(y.b)("red", "LP failed: key is incorrect; refresh key"), Object(a.b)(j.e, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function T() {
            throw window.nav.reload({
                force: !0
            }), new Error("ts is very wrong")
        }
    },
    lJdi: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return s
        }), n.d(t, "d", function() {
            return o
        }), n.d(t, "b", function() {
            return c
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "l", function() {
            return f
        }), n.d(t, "f", function() {
            return v
        }), n.d(t, "e", function() {
            return y
        }), n.d(t, "h", function() {
            return j
        }), n.d(t, "i", function() {
            return O
        }), n.d(t, "j", function() {
            return w
        }), n.d(t, "g", function() {
            return k
        }), n.d(t, "k", function() {
            return C
        }), n.d(t, "m", function() {
            return E
        }), n.d(t, "n", function() {
            return I
        }), n.d(t, "o", function() {
            return x
        });
        n("OEbY");
        var r = n("rHUl"),
            a = n("aong"),
            i = n("P13b"),
            s = 1,
            o = 4,
            c = 8,
            l = 16,
            d = "see_invite_link",
            u = "change_invite_link",
            m = "invite_user",
            p = "pin_unpin",
            g = "change_title",
            h = "add_admin",
            _ = {
                [d]: 32,
                [u]: 32,
                [h]: l,
                [m]: s,
                [p]: o,
                [g]: c
            },
            b = 1;

        function f(e, t, n) {
            return S(e, d, t, n)
        }

        function v(e, t, n) {
            return S(e, u, t, n)
        }

        function y(e, t, n, i) {
            var s = Object(a.q)(e);
            return !x(Object(r.u)(s, n || s.peer), t) && S(e, h, n, i)
        }

        function j(e, t, n) {
            return S(e, m, t, n)
        }

        function O(e, t, n, s) {
            var o = Object(a.q)(e);
            if (function(e, t) {
                    var n = Object(a.q)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, b)) return !0;
            var c = Object(r.u)(o, n || o.peer);
            return !(c.data.kicked && !c.data.closed) && (!Object(i.rb)(e, n) && (!x(c, t) && (!!x(c, s = void 0 === s ? window.vk.id : s) || (I(c, s) ? !I(c, t) : function(e, t) {
                return -1 !== e.invitedByMe.indexOf(t)
            }(c, t) && !I(c, t)))))
        }

        function w(e, t, n) {
            return S(e, p, t, n)
        }

        function k(e, t, n) {
            return S(e, g, t, n)
        }

        function C(e, t, n) {
            return !Object(r.D)(n) || !!Object(r.u)(e, t).caccess[n]
        }

        function S(e, t, n, s) {
            var o = Object(a.q)(e);
            s = void 0 === s ? window.vk.id : s, n = void 0 === n ? o.peer : n;
            var c = Object(r.u)(o, n),
                l = !c.data.kicked && !c.data.closed,
                b = _[t];
            if (Object(i.rb)(e, n)) switch (t) {
                case h:
                case m:
                    return !1;
                case d:
                    return l;
                default:
                    return o.gid > 0
            }
            switch (t) {
                case d:
                case u:
                case h:
                    return E(c, b) ? I(c, s) && l : x(c, s);
                case m:
                case p:
                case g:
                    return E(c, b) ? I(c, s) && l : l
            }
            return !1
        }

        function E(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function I(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function x(e, t) {
            return e.ownerId === t
        }
    },
    mSoV: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var r = n("q1tI"),
            a = (n("17x9"), n("i8i4")),
            i = n("pemR"),
            s = "Select...";
        class o extends r.Component {
            constructor(e) {
                super(e), this.handleMouseDown = (e => {
                    this.props.onFocus && "function" == typeof this.props.onFocus && this.props.onFocus(this.state.opened), "mousedown" === e.type && 0 !== e.button || (e.stopPropagation(), e.preventDefault(), this.props.disabled || this.setState({
                        opened: !this.state.opened
                    }))
                }), this.setValue = ((e, t) => {
                    var n = {
                        selected: {
                            value: e,
                            label: t
                        },
                        opened: !1
                    };
                    this.fireChangeEvent(n), this.setState(n)
                }), this.fireChangeEvent = (e => {
                    e.selected !== this.state.selected && this.props.onChange && this.props.onChange({
                        name: this.props.name,
                        selected: e.selected
                    })
                }), this.filterOptions = ((e, t) => {
                    var n = e.toLowerCase();
                    return t.filter(e => "object" != typeof e ? e.toLowerCase().indexOf(n) >= 0 : e.label.toLowerCase().indexOf(n) >= 0)
                }), this.handleDocumentClick = (e => {
                    this.mounted && this.state.opened && !this.el.contains(e.target) && this.setState({
                        opened: !1
                    })
                }), this.state = {
                    filteredOptions: e.options,
                    allOptions: e.options,
                    selected: void 0 !== e.value ? this.getOptionByValue(e.options, e.value) : {
                        label: this.getLabel(e),
                        value: ""
                    },
                    opened: !1
                }, this.mounted = !0
            }
            getLabel(e) {
                return this.props.searchable ? this.props.value || "" : e.placeholder || s
            }
            componentWillReceiveProps(e) {
                this.setState({
                    filteredOptions: e.options,
                    allOptions: e.options
                }), void 0 !== e.value && e.value !== this.state.selected ? this.setState({
                    selected: this.getOptionByValue(e.options, e.value)
                }) : void 0 === e.value && this.setState({
                    selected: {
                        label: this.getLabel(e),
                        value: ""
                    }
                })
            }
            componentDidMount() {
                this.el = a.findDOMNode(this), document.addEventListener("click", this.handleDocumentClick, !1), document.addEventListener("touchend", this.handleDocumentClick, !1)
            }
            componentWillUnmount() {
                this.mounted = !1, document.removeEventListener("click", this.handleDocumentClick, !1), document.removeEventListener("touchend", this.handleDocumentClick, !1)
            }
            getOptionByValue(e, t) {
                return e.find(e => "object" != typeof e ? e === t : e.value === t)
            }
            renderOption(e) {
                var t = Object(i.a)("Select__option", {
                        "Select__option--selected": e === this.state.selected
                    }),
                    n = void 0 !== e.value ? e.value : e.label || e,
                    a = void 0 !== e.label ? e.label : e;
                return r.createElement("div", {
                    key: n,
                    className: t,
                    onMouseDown: () => this.setValue(n, a),
                    onClick: () => this.setValue(n, a)
                }, a)
            }
            buildMenu() {
                var e = this.state.filteredOptions.map(e => "group" === e.type ? r.createElement("div", {
                    className: "Select__group",
                    key: e.name
                }, e.name && r.createElement("div", {
                    className: "Select__title"
                }, e.name), e.items.map(e => this.renderOption(e))) : this.renderOption(e));
                return e.length ? e : r.createElement("div", {
                    className: "Select__noresults"
                }, "No options found")
            }
            handleSearchType(e) {
                var t = this.filterOptions(e.target.value, this.state.allOptions);
                this.setState({
                    selected: {
                        value: e.target.value,
                        label: e.target.value
                    },
                    filteredOptions: t
                }), this.props.onType && this.props.onType(e.target.value)
            }
            buildControl(e) {
                return this.props.searchable ? r.createElement("input", {
                    placeholder: this.props.placeholder,
                    className: "Select__input",
                    value: e,
                    onClick: this.handleMouseDown,
                    onChange: this.handleSearchType.bind(this)
                }) : r.createElement("div", {
                    className: "Select__control",
                    onClick: this.handleMouseDown
                }, r.createElement("div", {
                    className: "Select__placeholder"
                }, e), r.createElement("span", {
                    className: "Select__arrow"
                }))
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.appearance,
                    a = e.style,
                    s = e.searchable ? "secondary" : n,
                    o = Object(i.a)("Select", `Select--${s}`, t, {
                        "Select--opened": this.state.opened,
                        "Select--disabled": this.props.disabled,
                        "Select--empty": !this.state.selected.value
                    }),
                    c = "string" == typeof this.state.selected ? this.state.selected : this.state.selected.label,
                    l = this.buildControl(c);
                return r.createElement("div", {
                    className: o,
                    style: a
                }, l, this.state.opened && r.createElement("div", {
                    className: "Select__menu"
                }, this.buildMenu()))
            }
        }
        o.defaultProps = {
            appearance: "primary",
            searchable: !1
        }
    },
    nAFc: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return s
        }), n.d(t, "a", function() {
            return o
        }), n.d(t, "b", function() {
            return c
        }), n.d(t, "d", function() {
            return l
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("Oyvg"), n("pIFo");

        function r(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var a = window.Emoji,
            i = [
                ["&amp;", "&"],
                ["&lt;", "<"],
                ["&gt;", ">"],
                ["&quot;", '"']
            ];

        function s(e) {
            return i.reduce((e, t) => {
                var n = r(t, 2),
                    a = n[0],
                    i = n[1];
                return e.replace(new RegExp(i, "ig"), a)
            }, e)
        }

        function o(e) {
            return i.reduce((e, t) => {
                var n = r(t, 2),
                    a = n[0],
                    i = n[1];
                return e.replace(new RegExp(a, "ig"), i)
            }, e).replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(t))
        }

        function c(e) {
            return s(e).replace(/[\u00A0-\u9999<>\&]/gim, e => `&#${e.charCodeAt(0)};`)
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.lineBreak,
                r = void 0 !== n && n,
                i = t.convertEmoji,
                c = void 0 === i || i,
                l = o(e);
            return l = l.replace(/\n\r/gi, "\n"), "oneline" === r ? l = l.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === r && (l = l.replace(/\n/gi, "<br>")), l = s(l), c && (l = a.emojiToHTML(l, !0)), l
        }
    },
    nyd8: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return s
        }), n.d(t, "a", function() {
            return o
        });
        n("rGqo"), n("Btvt");
        var r = window,
            a = r.nav,
            i = r.extend;

        function s(e) {
            var t = i({}, a.objLoc, e);
            Object.keys(t).filter(e => "" === t[e]).forEach(e => {
                delete t[e]
            });
            var n = a.toStr(t);
            a.setLoc(n)
        }

        function o() {
            var e = {};
            return {
                scheduleNav(t) {
                    e = i(e, t)
                },
                commitNav() {
                    s(e), e = {}
                },
                scheduleNavWithTimeOut(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = i(e, t), setTimeout(() => {
                        s(e), e = {}
                    }, n)
                }
            }
        }
    },
    "p+C8": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var r = n("q1tI"),
            a = n("pemR");
        n("17x9");

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, r, a = function(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    i = Object.keys(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
            }
            return a
        }

        function o(e) {
            var t = e.icon,
                n = e.aside,
                o = e.chevron,
                c = e.selectable,
                l = e.border,
                d = e.className,
                u = e.children,
                m = e.active,
                p = e.canBeHovered,
                g = void 0 === p || p,
                h = s(e, ["icon", "aside", "chevron", "selectable", "border", "className", "children", "active", "canBeHovered"]),
                _ = {
                    "ListItem--chevron": !!o,
                    "ListItem--selectable": !!c,
                    "ListItem--border": !!l,
                    "ListItem--active": !!m,
                    "ListItem--can-be-hovered": g
                };
            return r.createElement("li", i({}, h, {
                className: Object(a.a)("ListItem", _, d)
            }), t && r.createElement("div", {
                className: "ListItem__icon"
            }, t), r.createElement("div", {
                className: "ListItem__main"
            }, u), r.createElement("div", {
                className: "ListItem__aside"
            }, n))
        }
        o.defaultProps = {
            onClick: () => {},
            icon: null,
            aside: null,
            chevron: !1,
            selectable: !0,
            border: !0
        }
    },
    p3re: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return l
        }), n.d(t, "c", function() {
            return d
        }), n.d(t, "f", function() {
            return u
        }), n.d(t, "d", function() {
            return g
        }), n.d(t, "a", function() {
            return h
        }), n.d(t, "b", function() {
            return _
        });
        n("SRfc"), n("Oyvg"), n("pIFo");
        var r, a = n("h++7"),
            i = window,
            s = i.clean,
            o = i.replaceEntities,
            c = i.statlogsValueEvent;

        function l(e, t) {
            for (var n, r = 0, i = e; null !== (n = a.s.exec(e));) {
                var s = (n = m(n))[0].length,
                    o = n.index + s,
                    c = e[n.index - 1],
                    l = e[o - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    u = void 0 !== l && /([:;$])/i.test(l);
                if (!d && !u) {
                    var g = p(n),
                        h = g.domain.toLowerCase();
                    if (h.length <= a.p && -1 !== a.y.indexOf(h)) {
                        var _ = t(g);
                        i = i.slice(0, n.index + r) + _ + i.slice(o + r), r += _.length - s
                    }
                }
            }
            return i
        }

        function d(e, t) {
            return e.replace(a.c, t || function(e) {
                return `<a href="mailto:${e}">${e}</a>`
            })
        }

        function u(e, t) {
            return e.replace(a.q, t || function(e, t, n, r, a) {
                return `<a href="/${t+n}" class="mem_link" mention="${s(r||"")}" mention_id="${s(t+n)}" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">${a}</a>`
            })
        }

        function m(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function p(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function g(e, t) {
            return e.replace((r || (r = new RegExp(a.x, "ig")), r), (e, n, r, a, i, s) => (n || "") + t(r + (i || "")))
        }

        function h(e) {
            c("ttl_message_confirm_delivery", e)
        }

        function _(e, t) {
            var n = t.protocol,
                r = t.url,
                i = t.query,
                c = t.domain,
                l = t.full;
            try {
                l = decodeURIComponent(l)
            } catch (e) {}
            if (l.length > 55 && (l = l.substr(0, 53) + ".."), l = s(l).replace(/&amp;/g, "&"), !e && c.match(a.t)) {
                var d, u = r = o(r).replace(a.f, encodeURIComponent),
                    m = r.indexOf("#/"),
                    p = "";
                return m >= 0 ? u = r.substr(m + 1) : (m = r.indexOf("#!")) >= 0 && (u = "/" + r.substr(m + 2).replace(/^\//, "")), (d = u.match(a.B)) && d[1].length < 32 && (p = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + r + i) + '" target="_blank" rel="noopener"' + p + ">" + l + "</a>"
            }
            return `<a href="${`away.php?utf=1&to=${encodeURIComponent(n+o(r+i))}`}" target="_blank" rel="noopener" onclick="${`return goAway('${s((n+r+i).replace(/'/g,"\\'"))}', {}, event);`}">${l}</a>`
        }
    },
    rCUf: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return a
        }), n.d(t, "b", function() {
            return s
        }), n.d(t, "d", function() {
            return o
        });
        n("91GP"), n("pIFo");
        var r = n("8h6g");

        function a(e) {
            var t = r.b.slice(0, r.b.length);
            if ("types" === e) {
                for (var n = t.length, a = 0; a < n; ++a) t.push(t[a].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + r.b.join(",.") : ""
        }

        function i(e) {
            if (!cur.leaving) {
                var t = getLang("video_upload_changed"),
                    n = !1;
                if (each(window.cur.videoUploaders, (e, t) => {
                        Upload.isSomethingUploading(t) && (n = !0)
                    }), 1 === e) {
                    if (!n) return !0;
                    var r = showFastBox({
                        title: getLang("global_warning"),
                        dark: !0
                    }, t, getLang("global_continue"), function() {
                        cur.leaving = !0, r.hide(), cur.onContinueCb && cur.onContinueCb()
                    }, getLang("global_cancel"), function() {
                        r.hide(), nav.objLoc.section = "upload", nav.setLoc(nav.objLoc)
                    });
                    return !1
                }
                return n ? winToUtf(t.replace(/<\/?b>/g, "").replace(/<br\s*\/?>/g, "\n")) : void 0
            }
        }

        function s(e, t, n, s, c) {
            if (n) {
                s = s || cur, (c = c || {}).onUploadStart || (c.onUploadStart = (e => {
                    boxQueue.hideLast(), cur.nav.push(function(e, t, n) {
                        if (!1 === i(1)) return cur.onContinueCb = nav.go.pbind(n), !1
                    }), cur.prevBefUnload = window.onbeforeunload, window.onbeforeunload = i, c.onUploadProgress(e, 0, 0), Wall.showEditPost && Wall.showEditPost(), c.onUploadStartDone && c.onUploadStartDone()
                })), c.onUploadComplete || (c.onUploadComplete = ((e, t) => {
                    var n = window.parseJSON(t);
                    n.video_id ? o(e, n, s) : "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e);
                    c.onUploadCompleteDone && c.onUploadCompleteDone(), setTimeout(() => {
                        c.onUploadAllCompleteDone && !window.Upload.isSomethingUploading(e.ind) && c.onUploadAllCompleteDone()
                    })
                })), c.onUploadProgress || (c.onUploadProgress = ((e, t, n) => {
                    var r = void 0 !== e.ind ? e.ind : e;
                    show("_im_media_preview"), s.showMediaProgress && s.showMediaProgress("video", r, function(e, t, n) {
                        return {
                            loaded: t,
                            total: n,
                            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
                        }
                    }(e, t, n))
                })), c.onUploadError || (c.onUploadError = ((e, t) => {
                    statlogsValueEvent("upload_video_fails", 1, n.options.server, t),
                        function(e) {
                            var t = void 0 !== e.ind ? e.ind : e,
                                n = e.fileName ? t + "_" + e.fileName : e;
                            if (re("upload" + n + "_progress_wrap"), !geByClass1("popup_box_container")) {
                                var r = getLang("video_upload_error");
                                setTimeout(showFastBox({
                                    title: getLang("global_error")
                                }, r).hide, 2e3)
                            }
                            topError("Upload failed", {
                                dt: -1,
                                type: 102,
                                url: (ge("file_uploader_form" + t) || {}).action
                            }), Upload.embed(t)
                        }(e)
                })), cur.maxFiles = (cur.chooseParams || {}).maxFiles || 10;
                var l = cur.maxFiles - (cur.savedVideos || []).length,
                    d = browser.safari ? "" : "video/*," + a("accept");
                n.lang && (cur.lang = extend(cur.lang || {}, n.lang));
                var u = {
                        accept: d,
                        file_input: null,
                        file_name: "video_file",
                        file_size_limit: 1024 * (n.options.file_size_limit_in_GB || r.c) * 1024 * 1024,
                        file_types_description: "Video files",
                        file_types: a("types"),
                        chooseBox: 1,
                        chunked: 1,
                        chunkSize: r.a,
                        clear: 1,
                        dragEl: t === boxLayerWrap ? boxLayerWrap : bodyNode,
                        dropbox: t,
                        from: n.vars.from,
                        lang: n.lang,
                        max_attempts: 3,
                        max_files: l,
                        multiple: 1,
                        multi_progress: 1,
                        requestOptionsForFile: !0,
                        type: "video",
                        visibleDropbox: !n.options.hasOwnProperty("visible_dropbox") || n.options.visible_dropbox
                    },
                    m = Upload.init(e, "", {}, Object.assign(u, c));
                return window.cur.videoUploaders || (window.cur.videoUploaders = []), window.cur.videoUploaders.push(m), m
            }
        }

        function o(e, t, n, r) {
            n = n || cur;
            var a = void 0 !== e.ind ? e.ind : e,
                i = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                s = i ? a + "_" + i : e,
                o = t.owner_id + "_" + t.video_id,
                c = ge("upload" + s + "_progress_wrap");
            c && hide(geByClass1("progress_x", c)), ajax.post("al_video.php?act=a_videos_attach_info", {
                videos: o
            }, {
                onDone: e => {
                    n.chooseMedia("video", o, extend(e[o], {
                        upload_ind: s,
                        upload_new: !0
                    }));
                    var a = t.owner_id,
                        i = t.video_id,
                        c = t.video_hash,
                        l = 0,
                        d = () => {
                            ajax.post("al_video.php?act=encode_progress", {
                                oid: a,
                                vid: i,
                                hash: c,
                                need_thumb: 1
                            }, {
                                onDone: t => {
                                    var c = !0;
                                    if (t) {
                                        if (t.error) return void
                                        function(e) {
                                            setTimeout(showFastBox({
                                                title: getLang("global_error")
                                            }, e).hide, 2e3)
                                        }(getLang("video_upload_encode_error"));
                                        t.thumb && (c = !1, ajax.post("al_video.php", {
                                            act: "a_video_photo_sizes",
                                            oid: a,
                                            vid: i
                                        }, {
                                            onDone: t => {
                                                n.hasChosenMedia("video", o) ? n.updateChosenMedia("video", o, extend(t, {
                                                    upload_ind: s,
                                                    upload_new: !0
                                                })) : r && r(e, o)
                                            }
                                        }))
                                    }
                                    c && n.hasChosenMedia("video", o) && setTimeout(d, 1e3)
                                },
                                onFail: () => {
                                    ++l < 3 && setTimeout(d, 2e3 * l)
                                }
                            })
                        };
                    d()
                }
            })
        }
        t.a = {
            getUploadModule: (e, t, n, r, a) => s(e, t, n, r, a),
            initModalVideoUploader() {
                var e = cur.videoUploadParams,
                    t = ge("choose_video_upload");
                return !!t && (this.initDragEvents(), s(t, boxLayerWrap, e))
            },
            initDragEvents() {
                var e = e => {
                        cur.dragTimeout && (clearTimeout(cur.dragTimeout), delete cur.dragTimeout);
                        var t = ge("video_choose_upload_area_wrap");
                        if (!hasClass(t, "video_choose_upload_area_enter")) {
                            addClass(t, "video_choose_upload_area_enter");
                            var n = ge("video_choose_wrap"),
                                r = getXY(n)[1],
                                a = getSize(t)[1];
                            return hide("video_choose_wrap"), setStyle(t, "height", scrollGetY() + window.clientHeight() - r + a), cancelEvent(e)
                        }
                    },
                    t = e => cancelEvent(e),
                    n = e => {
                        if (t(), e.dataTransfer.files.length && Upload.checkFilesSizes(window.videoInlineUploader, e.dataTransfer.files)) return window.Upload && Upload.checked && Upload.checked[window.videoInlineUploader] && Upload.onFileApiSend(window.videoInlineUploader, e.dataTransfer.files), cancelEvent(e)
                    },
                    r = () => {
                        addEvent(boxLayerWrap, "dragenter dragover", e), addEvent(boxLayerWrap, "dragleave", t), addEvent(boxLayerWrap, "drop", n)
                    };
                r(), setTimeout(curBox().setOptions.pbind({
                    onHide: () => {
                        removeEvent(boxLayerWrap, "dragenter dragover", e), removeEvent(boxLayerWrap, "dragleave", t), removeEvent(boxLayerWrap, "drop", n)
                    },
                    onShow: () => {
                        r()
                    }
                }), 0)
            }
        }
    },
    rHUl: function(e, t, n) {
        "use strict";
        n.d(t, "i", function() {
            return d
        }), n.d(t, "N", function() {
            return u
        }), n.d(t, "p", function() {
            return m
        }), n.d(t, "g", function() {
            return p
        }), n.d(t, "k", function() {
            return g
        }), n.d(t, "u", function() {
            return h
        }), n.d(t, "h", function() {
            return _
        }), n.d(t, "t", function() {
            return b
        }), n.d(t, "o", function() {
            return f
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "M", function() {
            return y
        }), n.d(t, "m", function() {
            return j
        }), n.d(t, "l", function() {
            return O
        }), n.d(t, "S", function() {
            return w
        }), n.d(t, "e", function() {
            return k
        }), n.d(t, "n", function() {
            return C
        }), n.d(t, "r", function() {
            return S
        }), n.d(t, "A", function() {
            return E
        }), n.d(t, "H", function() {
            return I
        }), n.d(t, "E", function() {
            return x
        }), n.d(t, "C", function() {
            return T
        }), n.d(t, "z", function() {
            return P
        }), n.d(t, "f", function() {
            return M
        }), n.d(t, "L", function() {
            return L
        }), n.d(t, "F", function() {
            return B
        }), n.d(t, "R", function() {
            return D
        }), n.d(t, "G", function() {
            return N
        }), n.d(t, "x", function() {
            return A
        }), n.d(t, "Q", function() {
            return q
        }), n.d(t, "D", function() {
            return H
        }), n.d(t, "B", function() {
            return F
        }), n.d(t, "a", function() {
            return R
        }), n.d(t, "O", function() {
            return $
        }), n.d(t, "s", function() {
            return U
        }), n.d(t, "P", function() {
            return z
        }), n.d(t, "K", function() {
            return K
        }), n.d(t, "q", function() {
            return W
        }), n.d(t, "c", function() {
            return V
        }), n.d(t, "y", function() {
            return G
        }), n.d(t, "j", function() {
            return X
        }), n.d(t, "v", function() {
            return Q
        }), n.d(t, "w", function() {
            return Y
        }), n.d(t, "U", function() {
            return J
        }), n.d(t, "T", function() {
            return Z
        }), n.d(t, "J", function() {
            return ee
        }), n.d(t, "V", function() {
            return te
        }), n.d(t, "d", function() {
            return ne
        }), n.d(t, "I", function() {
            return re
        });
        n("Vd3H"), n("rGqo"), n("Btvt");
        var r = n("MhhX"),
            a = n("f01n"),
            i = n("h++7"),
            s = n("86+7"),
            o = n("rjmT"),
            c = n("aong"),
            l = n("lJdi");

        function d(e, t) {
            var n = Object(c.q)(e),
                a = n.tabs[n.peer];
            return Object.keys(a.msgs).filter(n => {
                var i = C(e, t, n);
                return !Object(r.k)(i) && intval(n) > a.in_up_to
            })[0]
        }

        function u(e) {
            return Object(c.q)(e).searchShown
        }

        function m(e) {
            return Object(c.q)(e).peer
        }

        function p(e) {
            return g(e, m(e))
        }

        function g(e, t) {
            return (h(e, t) || {}).keyboard
        }

        function h(e, t) {
            var n = Object(c.q)(e);
            return n.tabs && n.tabs[t]
        }

        function _(e) {
            var t = Object(c.q)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function b(e) {
            return Object(c.q)(e).selectedMessages
        }

        function f(e, t, n) {
            var a = h(e, t),
                i = b(e)[0];
            if (void 0 === i) return [n];
            var s = Math.min(n, i),
                o = Math.max(n, i);
            return Object.keys(a.msgs).filter(e => e >= s && e <= o).filter(t => {
                var n = C(e, e.get().peer, t);
                return !Object(r.l)(n) && !Object(r.e)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = h(Object(c.q)(t), e),
                a = 0;
            for (var i in n.msgs)
                if (n.msgs.hasOwnProperty(i)) {
                    var s = C(t, e, i);
                    Object(r.k)(s) || (a += Object(r.n)(n, s) ? 1 : 0)
                }
            return a
        }

        function y(e, t, n) {
            return !! function(e, t, n) {
                var r = h(e, t);
                return Object.keys(r.msgs).filter(r => intval(C(e, t, r).randomId) === n).length > 0
            }(e, t, n)
        }

        function j(e, t) {
            var n = Object(c.q)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function O(e, t, n) {
            var r = h(e, t),
                i = C(e, t, n),
                s = Object.keys(r.msgs).filter(n => {
                    var r = C(e, t, n),
                        s = r.local && r.type !== a.g;
                    return !(!i.local && s) && (!(!i.local || s) || j(e, i.messageId) > j(e, r.messageId))
                }).pop();
            return s ? C(e, t, s) : null
        }

        function w(e) {
            return e && e.length > 0 ? a.eb([0].concat(e)) : e
        }

        function k(e, t, n) {
            var a = h(e, t),
                i = C(e, t, n),
                o = Object(c.q)(e);
            return Object(r.k)(i) ? Object(s.c)(e, o.id).name : i.userId !== i.peerId ? !!Object(s.b)(e, i.userId) && Object(s.c)(e, i.userId).name : a.tab
        }

        function C(e, t, n) {
            var r = h(e, t),
                a = r && r.msgs && r.msgs[n];
            return a ? w(a) : null
        }

        function S(e, t, n) {
            var r = h(e, t),
                a = r && r.msgs && Object.keys(r.msgs).sort((e, t) => +e - t);
            if (!a) return null;
            var i = a && a.indexOf("" + n),
                s = i > -1 ? a[i - 1] : null;
            return r.msgs[s]
        }

        function E(e) {
            var t = Object(c.q)(e);
            return t.gid || t.isClassic
        }

        function I(e) {
            return Object(c.q)(e).gid
        }

        function x(e) {
            return Object(c.q)(e).gid
        }

        function T(e) {
            return !!Object(c.q)(e).gid
        }

        function P(e, t) {
            return !!(t.peerId > 2e9 && Object(l.m)(t, 1024))
        }

        function M(e, t) {
            var n = Object(c.q)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function L(e) {
            var t = Object(c.q)(e);
            return !!T(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === i.n || t.active_tab === i.m))
        }

        function B(e, t) {
            var n = (e = Object(c.q)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function D(e, t) {
            var n = h(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function N(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function A(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function q(e) {
            return !Object(c.q)(e).lockedSending
        }

        function H(e) {
            return e > -2e9 && e < 0
        }

        function F(e, t) {
            return !!H(t) && !!h(e, t).blocked_community
        }

        function R(e) {
            return Object(c.q)(e).voice_message_available
        }

        function $(e) {
            var t = Object(c.q)(e);
            return !(!U(t) && !t.recentSearch)
        }

        function U(e) {
            return Object(c.q)(e).searchText
        }

        function z(e, t) {
            var n = Object(c.q)(e);
            return !!(t && t !== U(e) || n.recentSearch)
        }

        function K(e) {
            return Object(c.q)(e).recentSearch
        }

        function W(e) {
            var t = _(e);
            return t && t.pinned && w(t.pinned)
        }

        function V(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function G(e) {
            return 1 == Object(c.q)(e).isEditing
        }

        function X(e) {
            return Object(c.q)(e).gid
        }

        function Q(e) {
            return e.draft || (e.draft = Object(o.b)(cur.imDb, e.peerId)), e.draft
        }

        function Y(e) {
            return (Object(c.q)(e).templates || []).filter(e => !e.deleted)
        }

        function J(e) {
            return !!e && (e.is_message_request || e.folders & i.j[i.k] || e.folders & i.j[i.l])
        }

        function Z(e) {
            return e & ~i.j[i.k] & ~i.j[i.l]
        }

        function ee(e) {
            return Object(c.q)(e).active_tab === i.k
        }

        function te(e) {
            return e.peerId > 19e8 && e.peerId < 2e9
        }

        function ne(e) {
            return !!Object(c.q)(e).dialog_tab_cts[i.k]
        }

        function re(e) {
            var t = e.type,
                n = e.updateType;
            return t === a.e && (n === a.A || n === a.x)
        }
    },
    rjmT: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        }), n.d(t, "b", function() {
            return l
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("KKXr"), n("VRzm"), n("Btvt"), n("OEbY"), n("pIFo");
        var r = n("BxOC"),
            a = n("f01n"),
            i = n("vT4u");

        function s(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function o(e, t) {
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

        function l(e, t) {
            return new o(e, "draft_" + t)
        }
        o.prototype.dump = function() {
            this._key && this._db.updateByKey(this._key, function(e) {
                return {
                    txt: e.txt,
                    attaches: e.attaches.length ? e.attaches : void 0,
                    urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                    cancelled: e.cancelled.length ? e.cancelled : void 0
                }
            }(this.dData))
        }, o.prototype.load = function() {
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
        }, o.prototype.clear = function() {
            this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.dump()
        }, o.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, o.prototype.addAttach = function(e, t, n) {
            if (("share" === e && this.removeAttachByType(e), "mail" !== e && "reply" !== e || (this.removeAttachByType("mail"), this.removeAttachByType("reply")), "audio_playlist" === e || "artist" === e) && this.dData.attaches.find(t => t.type === e)) return !1;
            if (!e || !t && "poll" !== e) return !1;
            var r = this.dData.attaches.findIndex(n => n.type === e && n.id === t); - 1 === r ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: n
            }), this.dump()) : "video" !== e && "poll" !== e || (this.dData.attaches[r] = {
                type: e,
                id: t,
                object: n
            }, this.dump())
        }, o.prototype.syncWithSelector = function(e) {
            var t = this.getFwdRaw();
            this.dData.attaches = (t ? [t] : []).concat(e.getMedias().map(e => {
                var t = s(e, 2),
                    n = t[0],
                    r = t[1];
                return this.dData.attaches.find(e => e.type == n && e.id == r) || {
                    type: n,
                    id: r
                }
            })), this.dump()
        }, o.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, o.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dData.cancelled = [], this.dump()
        }, o.prototype.addBindUrl = function(e, t, n) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: n
            }), this.dump())
        }, o.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(t => t.url === e);
            return t && this.dData.attaches.find(e => e.type === t.type && e.id === t.id) || null
        }, o.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(e => "share" === e.type);
            if (e && e.object) return e.object.url.replace(/&amp;/g, "&")
        }, o.prototype.hasOnlyReplies = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return e ? e.flags & a.k && !this.dData.attaches.find(e => "mail" !== e.type) : this.hasAttaches() && !this.dData.attaches.find(e => "reply" !== e.type)
        }, o.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, o.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, o.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, o.prototype.prepareObjects = function(e, t) {
            return this.dData.attaches.find(c) ? Object(r.b)(i.e, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(e => [e.type, e.id]).join("*")
            }).then(e => {
                var t = s(e, 1)[0];
                this.dData.attaches = t.map(e => ({
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }))
            }) : Promise.resolve()
        }, o.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(e => "mail" === e.type || "reply" === e.type)
        }, o.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    s5qY: function(e, t, n) {
        var r = n("0/R4");
        e.exports = function(e, t) {
            if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
            return e
        }
    },
    tuSo: function(e, t, n) {
        n("7DDg")("Int32", 4, function(e) {
            return function(t, n, r) {
                return e(this, t, n, r)
            }
        })
    },
    "uW+i": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        n("rGqo"), n("Btvt"), n("hhXQ");
        var r = n("q1tI"),
            a = (n("17x9"), n("pemR"));
        class i extends r.Component {
            constructor(e) {
                super(e), this.getActiveTab = (() => {
                    var e = this.props.active,
                        t = [],
                        n = null;
                    return this.props.children.forEach(r => {
                        r.key === e ? n = r : t.push(r)
                    }), n || (Number.isInteger(e) && t.length > e ? t[e] : t[0])
                }), this.onClick = ((e, t) => {
                    if (t !== this.state.active) {
                        var n = this.refsStore[t],
                            r = this.getTransform(n);
                        this.setState({
                            active: t,
                            isAnimating: !0,
                            transform: r
                        }), this.props.onTabClick(e, t)
                    }
                }), this.onTransitionEnd = (e => {
                    "transform" === e.propertyName && this.setState({
                        isAnimating: !1
                    })
                }), this.getRef = ((e, t) => {
                    this.refsStore[e] = t
                });
                var t = this.getActiveTab();
                this.refsStore = {}, this.state = {
                    isAnimating: !1,
                    active: t.key
                }
            }
            static reactifyTabs(e) {
                return (Array.isArray(e) ? e : Object.values(e)).map(e => r.createElement("a", {
                    key: e[0],
                    href: e[2],
                    onClick: () => {}
                }, e[1] ? unclean(e[1]) : ""))
            }
            componentDidUpdate(e, t, n) {
                this.props.active !== e.active && this.setState({
                    active: this.props.active
                })
            }
            getTransform(e) {
                var t = e.offsetWidth;
                return `translateX(${e.offsetLeft-50+.5*t}px) scaleX(${t/100})`
            }
            componentDidMount() {
                var e = this.refsStore[this.state.active];
                this.setState({
                    transform: this.getTransform(e)
                })
            }
            render() {
                var e = {
                    "Tabs--animating": this.state.isAnimating
                };
                return r.createElement("nav", {
                    className: Object(a.a)("Tabs", this.props.className, e),
                    style: this.props.style
                }, r.createElement("ul", {
                    className: "Tabs__list"
                }, this.props.children.map((e, t) => r.createElement("li", {
                    className: Object(a.a)("Tabs__item", {
                        "Tabs__item--active": this.state.active === (e.key || t)
                    }),
                    onClick: n => this.onClick(n, e.key || t),
                    ref: n => this.getRef(e.key || t, n),
                    key: e.key || t
                }, e))), r.createElement("div", {
                    style: {
                        transform: this.state.transform
                    },
                    className: "Tabs__divider",
                    onTransitionEnd: this.onTransitionEnd
                }))
            }
        }
        i.defaultProps = {
            onTabClick: () => {},
            active: 0
        }
    },
    uytb: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return i
        }), n.d(t, "c", function() {
            return l
        });
        n("rE2o"), n("ioFf"), n("rGqo");

        function r(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var a = "recent_search",
            i = "pin_hide";

        function s(e) {
            return "im_store_" + e
        }

        function o(e) {
            return ls.get(s(e)) || {}
        }

        function c(e, t, n) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), n(s(e), r)
            }
        }

        function l(e) {
            var t = debounce((e, t) => {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && function(e, t) {
                for (var n = ["fwd", "draft", "bind_attach"], r = o(e), a = !1, i = n.length; i--;) n[i] in r && (delete r[n[i]], a = !0);
                a && c(e, r, t)
            }(e, t);
            var n = {
                    db: o(e),
                    checkTime: Date.now()
                },
                l = function(e, t, n) {
                    n.key === s(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", l, !1), {
                select: (t, r) => (Date.now() - n.checkTime > 1e3 && (n.db = o(e)), function(e, t, n) {
                    return t === a ? e[t] || [] : t === i ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                }(n.db, t, r)),
                selectByKey: t => (Date.now() - n.checkTime > 1e3 && (n.db = o(e)), n.db[t]),
                update(s, o) {
                    var l = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case a:
                                var s = n;
                                s && s.length > 0 ? e[t] = s : delete e[t];
                                break;
                            case i:
                                var o = r(n, 2),
                                    c = o[0],
                                    l = o[1];
                                l ? e[t][c] = +l : delete e[t][c]
                        }
                        return e
                    }(n.db, s, o);
                    return n.db = l, n.checkTime = Date.now(), c(e, l, t)
                },
                updateByKey: (r, a) => (n.db[r] = a, n.checkTime = Date.now(), c(e, n.db, t)),
                unmount() {
                    window.removeEventListener("storage", l, !1)
                }
            }
        }
    },
    vRp6: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        });
        n("rE2o"), n("ioFf"), n("rGqo");
        var r = n("q1tI"),
            a = (n("17x9"), n("UlUB")),
            i = n("PjZB"),
            s = n("pemR");

        function o(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class c extends r.Component {
            constructor(e) {
                super(e), this.checkLoad = Object(a.a)(e => {
                    var t = o(e, 3),
                        n = t[0],
                        r = t[1],
                        a = t[2];
                    if (!this.loading) return this.props.virtualized || this.props.hasMore ? void(r - n - a <= this.props.threshold && (this.loading = !0, this.props.loadMore().then(() => {
                        this.loading = !1
                    }))) : this.detachListeners()
                }, 34), this.onScroll = (e => {
                    var t = this.getScrollData();
                    this.props.virtualized && this.processChildren(this.props.children, t), this.props.hasMore && this.checkLoad(t)
                }), this.getRef = (e => {
                    this.container = e, this.props.virtualized && this.setState(this.getChildrenData(this.props.children, this.getScrollData()))
                }), this.useWindowScroll = e.useWindowScroll, e.virtualized && (this.state = {
                    before: 0,
                    after: e.children.length,
                    start: 0,
                    end: 0
                })
            }
            getScrollData() {
                var e = this.useWindowScroll ? document.documentElement : this.container;
                return [this.getScrollTop(), e ? e.scrollHeight : 0, e ? e.clientHeight : 0]
            }
            getScrollTop() {
                var e = document.documentElement || document.body.parentNode || document.body;
                return this.useWindowScroll ? void 0 !== window.pageYOffset ? window.pageYOffset : e.scrollTop : this.container ? this.container.scrollTop : 0
            }
            attachListeners() {
                var e = this.useWindowScroll ? window : this.container;
                this.container && (e.addEventListener("scroll", this.onScroll, this.props.useCapture), e.addEventListener("resize", this.onScroll, this.props.useCapture))
            }
            detachListeners() {
                var e = this.useWindowScroll ? window : this.container;
                this.container && (e.removeEventListener("scroll", this.onScroll, this.props.useCapture), e.removeEventListener("resize", this.onScroll, this.props.useCapture))
            }
            processChildren(e, t) {
                var n = this.state,
                    r = this.getChildrenData(e, t || this.getScrollData()),
                    a = r.start,
                    i = r.end,
                    s = r.before,
                    o = r.after;
                a === n.start && i === n.end && s === n.before && o === n.after || this.setState(r)
            }
            getChildrenData(e, t) {
                var n = o(t, 3),
                    r = n[0],
                    a = n[1],
                    i = n[2],
                    s = this.useWindowScroll ? window : this.container,
                    c = s && s.offsetHeight;
                if (!s || 0 === a || 0 === i) return {
                    start: 0,
                    end: 0,
                    before: 0,
                    after: e.length
                };
                i = Math.max(i, c);
                var l = e.length,
                    d = Math.max(Math.floor(r / this.props.itemHeight) - 1, 0),
                    u = Math.min(Math.floor((r + 2 * i) / this.props.itemHeight + 1), l);
                return {
                    start: d,
                    end: u,
                    before: d,
                    after: l - u
                }
            }
            componentWillReceiveProps(e) {
                this.props.virtualized && this.processChildren(e.children)
            }
            componentDidMount() {
                this.attachListeners()
            }
            componentWillUnmount() {
                this.detachListeners()
            }
            render() {
                return r.createElement("div", {
                    className: Object(s.a)("InfiniteScroll", this.props.className),
                    ref: this.getRef,
                    style: this.props.style
                }, this.props.virtualized && this.state.before > 0 && r.createElement("div", {
                    style: {
                        height: this.state.before * this.props.itemHeight
                    },
                    key: "before"
                }), this.props.virtualized ? [].concat(this.props.children).slice(this.state.start, this.state.end) : this.props.children, this.props.virtualized && this.state.after > 0 && r.createElement("div", {
                    style: {
                        height: this.state.after * this.props.itemHeight
                    },
                    key: "after"
                }), this.props.hasMore && (this.props.loader || r.createElement("div", {
                    className: "InfiniteScroll__loader",
                    key: "loader"
                }, r.createElement(i.a, null))))
            }
        }
        c.defaultProps = {
            useWindowScroll: !1,
            virtualized: !1,
            hasMore: !0,
            useCapture: !1,
            threshold: 100,
            itemHeight: 55
        }
    },
    vT4u: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return O
        }), n.d(t, "b", function() {
            return w
        }), n.d(t, "d", function() {
            return k
        }), n.d(t, "c", function() {
            return C
        }), n.d(t, "a", function() {
            return T
        }), n.d(t, "jb", function() {
            return P
        }), n.d(t, "Bc", function() {
            return D
        }), n.d(t, "Qc", function() {
            return N
        }), n.d(t, "sb", function() {
            return A
        }), n.d(t, "Vb", function() {
            return q
        }), n.d(t, "Jb", function() {
            return H
        }), n.d(t, "jc", function() {
            return R
        }), n.d(t, "kc", function() {
            return U
        }), n.d(t, "p", function() {
            return z
        }), n.d(t, "ad", function() {
            return K
        }), n.d(t, "oc", function() {
            return W
        }), n.d(t, "qb", function() {
            return V
        }), n.d(t, "mb", function() {
            return G
        }), n.d(t, "Fb", function() {
            return Q
        }), n.d(t, "nb", function() {
            return Y
        }), n.d(t, "ob", function() {
            return J
        }), n.d(t, "xc", function() {
            return Z
        }), n.d(t, "Qb", function() {
            return ee
        }), n.d(t, "hd", function() {
            return ae
        }), n.d(t, "F", function() {
            return ie
        }), n.d(t, "h", function() {
            return se
        }), n.d(t, "wb", function() {
            return ce
        }), n.d(t, "xb", function() {
            return le
        }), n.d(t, "T", function() {
            return de
        }), n.d(t, "Eb", function() {
            return ue
        }), n.d(t, "yb", function() {
            return me
        }), n.d(t, "cd", function() {
            return pe
        }), n.d(t, "pc", function() {
            return ge
        }), n.d(t, "Pc", function() {
            return he
        }), n.d(t, "jd", function() {
            return _e
        }), n.d(t, "lc", function() {
            return ve
        }), n.d(t, "D", function() {
            return ye
        }), n.d(t, "C", function() {
            return je
        }), n.d(t, "j", function() {
            return Oe
        }), n.d(t, "t", function() {
            return we
        }), n.d(t, "E", function() {
            return ke
        }), n.d(t, "Pb", function() {
            return Ce
        }), n.d(t, "pb", function() {
            return Se
        }), n.d(t, "g", function() {
            return Ee
        }), n.d(t, "sc", function() {
            return Ie
        }), n.d(t, "vc", function() {
            return xe
        }), n.d(t, "rc", function() {
            return Te
        }), n.d(t, "cc", function() {
            return Pe
        }), n.d(t, "dc", function() {
            return Me
        }), n.d(t, "ub", function() {
            return Le
        }), n.d(t, "ic", function() {
            return De
        }), n.d(t, "ec", function() {
            return Ne
        }), n.d(t, "fc", function() {
            return Ae
        }), n.d(t, "Bb", function() {
            return qe
        }), n.d(t, "ib", function() {
            return He
        }), n.d(t, "gc", function() {
            return Fe
        }), n.d(t, "X", function() {
            return Re
        }), n.d(t, "Y", function() {
            return $e
        }), n.d(t, "m", function() {
            return Ue
        }), n.d(t, "v", function() {
            return ze
        }), n.d(t, "hc", function() {
            return We
        }), n.d(t, "kb", function() {
            return Ve
        }), n.d(t, "eb", function() {
            return Ge
        }), n.d(t, "Nb", function() {
            return Xe
        }), n.d(t, "Mb", function() {
            return Qe
        }), n.d(t, "Lb", function() {
            return Ye
        }), n.d(t, "Ob", function() {
            return Je
        }), n.d(t, "Wb", function() {
            return Ze
        }), n.d(t, "Xb", function() {
            return et
        }), n.d(t, "f", function() {
            return nt
        }), n.d(t, "Gb", function() {
            return rt
        }), n.d(t, "nc", function() {
            return at
        }), n.d(t, "mc", function() {
            return it
        }), n.d(t, "K", function() {
            return st
        }), n.d(t, "Cb", function() {
            return ot
        }), n.d(t, "B", function() {
            return ct
        }), n.d(t, "I", function() {
            return lt
        }), n.d(t, "Sc", function() {
            return dt
        }), n.d(t, "gb", function() {
            return ut
        }), n.d(t, "i", function() {
            return mt
        }), n.d(t, "hb", function() {
            return pt
        }), n.d(t, "s", function() {
            return gt
        }), n.d(t, "rb", function() {
            return ht
        }), n.d(t, "Rc", function() {
            return _t
        }), n.d(t, "cb", function() {
            return ft
        }), n.d(t, "Zb", function() {
            return vt
        }), n.d(t, "Lc", function() {
            return yt
        }), n.d(t, "yc", function() {
            return jt
        }), n.d(t, "uc", function() {
            return Ot
        }), n.d(t, "G", function() {
            return wt
        }), n.d(t, "Uc", function() {
            return kt
        }), n.d(t, "Zc", function() {
            return Ct
        }), n.d(t, "tb", function() {
            return St
        }), n.d(t, "J", function() {
            return Et
        }), n.d(t, "qc", function() {
            return It
        }), n.d(t, "P", function() {
            return xt
        }), n.d(t, "Db", function() {
            return Tt
        }), n.d(t, "w", function() {
            return Pt
        }), n.d(t, "Yb", function() {
            return Mt
        }), n.d(t, "Mc", function() {
            return Lt
        }), n.d(t, "tc", function() {
            return Bt
        }), n.d(t, "V", function() {
            return Dt
        }), n.d(t, "gd", function() {
            return Nt
        }), n.d(t, "q", function() {
            return At
        }), n.d(t, "Tc", function() {
            return qt
        }), n.d(t, "ac", function() {
            return Ht
        }), n.d(t, "H", function() {
            return Ft
        }), n.d(t, "o", function() {
            return Rt
        }), n.d(t, "Wc", function() {
            return Ut
        }), n.d(t, "Jc", function() {
            return zt
        }), n.d(t, "vb", function() {
            return Kt
        }), n.d(t, "O", function() {
            return Wt
        }), n.d(t, "Hb", function() {
            return Vt
        }), n.d(t, "Hc", function() {
            return Gt
        }), n.d(t, "y", function() {
            return Xt
        }), n.d(t, "Ub", function() {
            return Qt
        }), n.d(t, "Ac", function() {
            return Yt
        }), n.d(t, "ed", function() {
            return Jt
        }), n.d(t, "W", function() {
            return Zt
        }), n.d(t, "u", function() {
            return en
        }), n.d(t, "Cc", function() {
            return tn
        }), n.d(t, "Xc", function() {
            return nn
        }), n.d(t, "Gc", function() {
            return rn
        }), n.d(t, "Yc", function() {
            return an
        }), n.d(t, "Dc", function() {
            return sn
        }), n.d(t, "l", function() {
            return on
        }), n.d(t, "zc", function() {
            return cn
        }), n.d(t, "Ic", function() {
            return ln
        }), n.d(t, "dd", function() {
            return dn
        }), n.d(t, "U", function() {
            return un
        }), n.d(t, "Z", function() {
            return mn
        }), n.d(t, "M", function() {
            return pn
        }), n.d(t, "Rb", function() {
            return gn
        }), n.d(t, "db", function() {
            return hn
        }), n.d(t, "bc", function() {
            return _n
        }), n.d(t, "Sb", function() {
            return bn
        }), n.d(t, "Kb", function() {
            return fn
        }), n.d(t, "Ab", function() {
            return vn
        }), n.d(t, "Oc", function() {
            return yn
        }), n.d(t, "zb", function() {
            return jn
        }), n.d(t, "Nc", function() {
            return On
        }), n.d(t, "Q", function() {
            return wn
        }), n.d(t, "N", function() {
            return kn
        }), n.d(t, "L", function() {
            return Sn
        }), n.d(t, "Vc", function() {
            return En
        }), n.d(t, "Ib", function() {
            return In
        }), n.d(t, "bb", function() {
            return xn
        }), n.d(t, "ab", function() {
            return Tn
        }), n.d(t, "Fc", function() {
            return Pn
        }), n.d(t, "Ec", function() {
            return Mn
        }), n.d(t, "r", function() {
            return Ln
        }), n.d(t, "R", function() {
            return Bn
        }), n.d(t, "id", function() {
            return Dn
        }), n.d(t, "S", function() {
            return Nn
        }), n.d(t, "k", function() {
            return An
        }), n.d(t, "fb", function() {
            return qn
        }), n.d(t, "wc", function() {
            return Hn
        }), n.d(t, "z", function() {
            return Fn
        }), n.d(t, "Kc", function() {
            return Rn
        }), n.d(t, "lb", function() {
            return $n
        }), n.d(t, "n", function() {
            return Un
        }), n.d(t, "A", function() {
            return zn
        }), n.d(t, "x", function() {
            return Kn
        }), n.d(t, "fd", function() {
            return Wn
        }), n.d(t, "Tb", function() {
            return Vn
        }), n.d(t, "bd", function() {
            return Gn
        });
        n("rE2o"), n("ioFf"), n("a1Th"), n("OG14"), n("OEbY"), n("Vd3H"), n("tUrg"), n("91GP"), n("SRfc"), n("rGqo"), n("VRzm"), n("Btvt");
        var r = n("BxOC"),
            a = n("nyd8"),
            i = n("f01n"),
            s = n("DM26"),
            o = n("aong"),
            c = n("uytb"),
            l = n("P13b"),
            d = n("h++7"),
            u = n("rHUl"),
            m = n("MhhX"),
            p = n("86+7"),
            g = n("ERyv"),
            h = n("Wu9C"),
            _ = n("lJdi"),
            b = n("O8ze"),
            f = n("zxIV"),
            v = n("XzvV");

        function y() {
            return (y = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function j(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        r || null == o.return || o.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var O = "al_im.php",
            w = 5,
            k = "typing",
            C = "audiomessage",
            S = Object(a.a)(),
            E = S.scheduleNav,
            I = S.commitNav,
            x = S.scheduleNavWithTimeOut;
        var T = {
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
            allow_community: 12,
            block_notify: 12
        };

        function P(e, t, n) {
            return Object(r.b)(O, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function M(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(r => r ? t(...n) : function(e) {
                if (!e.renew_hashes) {
                    var t = e.last_hashes_update || 0;
                    if (Date.now() - t < 1e4) return Promise.resolve();
                    var n = Object.keys(e.tabs).filter(t => Object(l.qb)(e, t));
                    e.renew_hashes = P(n, {}, e).then(t => {
                        var r = j(t, 2),
                            a = r[0],
                            i = r[1];
                        return n.forEach(t => {
                            e.tabs[t].hash = a[t]
                        }), e.writeHash = i, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                    })
                }
                return e.renew_hashes
            }(e).then(e => t(...n)))
        }

        function L(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e(...t).catch(r => {
                    if (r && r.match && r.match(/1001;/)) return M(n, e, t);
                    throw r
                })
            }
        }

        function B(e) {
            return "string" == typeof e ? Object(f.mb)(`<div>${e}</div>`) : e
        }

        function D(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function N(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function A(e, t, n, a, i) {
            return i.tabHistoryNotChanged = !1, Object(s.e)(r.b, 3, e => e - 1)(O, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: i.prevPeer,
                gid: i.gid,
                block: a
            }).then(t => {
                var r = j(t, 5),
                    a = r[0],
                    s = r[1],
                    o = r[2],
                    c = r[3],
                    u = r[4];
                if (s.forEach(e => Object(p.a)(i, e)), i.tabs || (i.tabs = {}), i.dialog_tab_cts = Object.assign({}, u, {
                        [d.k]: i.dialog_tab_cts[d.k]
                    }), i.tabs[e] || (i.tabs[e] = Object(l.Mb)(i, a)), N(c, i), n) {
                    if (i.tabs[e]) {
                        var m = i.tabs[e].lastmsg,
                            g = i.tabs[e].lastmsg_meta;
                        extend(i.tabs[e], a), i.tabs[e].lastmsg = m, i.tabs[e].lastmsg_meta = g
                    }
                } else extend(i.tabs[e], a);
                return i.admins = extend(i.admins, o), i.imQueue(e, !1), Dn(), q(e, i)
            }).catch(e => Object(g.a)("loadPeer", e))
        }

        function q(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                a = n.filter(n => !Object(u.M)(t, e, n.rid));
            return r.msgs = a.reduce((e, t) => (e["rid" + t.rid] = t.mess, e), r.msgs), t.imQueueSet(e, a), t.tabs[e].history = Object(l.jc)(a, t, B(t.tabs[e].history)), Promise.resolve(t)
        }

        function H(e, t, n) {
            var r = n.imQueue(e, !1).filter(e => e.failed && e.mess.messageId !== t);
            return n.imQueueSet(e, r), n.tabs[e].history = Object(l.Ob)([t], B(n.tabs[e].history)), Promise.resolve(n)
        }

        function F(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.b)(O, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(e => {
                return N(j(e, 1)[0], t)
            })
        }

        function R(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(t => (t.tabHistoryNotChanged = !1, Object(l.qb)(t, n) && !t.tabs[n].msgid ? (t.gid && F(n, t), Promise.resolve(t).then(W)) : (Object(l.qb)(t, n) && (t.tabs[n].msgid = !1), A(n, e, !1, !0, t)))).then(W).then($.bind(null, n))
        }

        function $(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(l.Db)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(l.Db)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function U(e, t, n) {
            var r = n.msgid,
                a = n.peer;
            return !e && Object(l.qb)(n, a) && n.tabs[a].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && F(a, n), Promise.resolve(n).then(W).then($.bind(null, a))) : A(a, !0, r, !0, n).then(W).then(() => {
                return Object(u.u)(n, a).msgid = r, n
            }).then($.bind(null, a))
        }

        function z(e, t, n, r) {
            if (Dt(r)) throw Object(l.Cc)(), new Error("Cant change peer while loading something");
            var a = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, E({
                    sel: e ? Object(l.I)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: a
                }), 0 != r.prevPeer && $(r.prevPeer, r, !0), 0 !== e) {
                Object(l.Db)(r, e) && $(e, r, !0), Jt(r.tabbedPeers.map(e => e.peer).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(t => (t.peer == e && "perm" !== t.type && (t.type = "perm"), t)), !1, r)
            } else Jt(r.tabbedPeers, !1, r);
            return I(), Ue(r.prevPeer, r)
        }

        function K(e) {
            cur.wallMentions = (() => new Promise((t, n) => {
                if (cur.wallMentions = [], !Object(l.ib)(e.peer) || !Object(l.qb)(e, e.peer) || Object(l.rb)(e, e.peer)) return n();
                var r = e.tabs[e.peer];

                function a() {
                    var n = [];
                    Object.keys(r.msgs || {}).reverse().forEach(e => {
                        var t = Object(u.S)(r.msgs[e]),
                            a = t && t.userId;
                        a && a != vk.id && -1 === n.indexOf(a) && Object(l.Gb)(r, a) && n.push(a)
                    }), (r.memberIds || []).forEach(e => {
                        -1 === n.indexOf(e) && n.push(e)
                    });
                    var a = [];
                    n.forEach(t => {
                        if (Object(p.b)(e, t)) {
                            var n = Object(p.c)(e, t),
                                r = n.link.substring(1);
                            a.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                        }
                    }), t(a)
                }
                r.membersLoaded ? a() : Cn(e.peer, e).then(a)
            }))
        }

        function W(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                a = Object(l.ib)(t) && (n.data.closed || n.data.kicked),
                i = Object(l.rb)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !i && r.push("clear"), Object(l.kb)(e) && !i && r.push("block"), i && !a && r.push("settings"), Object(l.lb)(t) && (n.can_send_notify ? r.push("block_notify") : r.push(n.blocked_community ? "allow_community" : "block_community")), (Object(l.ib)(t) || Object(l.Hb)(t) || Object(l.lb)(t)) && !Object(l.kb)(e) && (Object(l.ib)(t) && (n.data.kicked || n.data.closed) || r.push(inArray(t, e.mutedPeers) ? "unmute" : "mute")), Object(l.Hb)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), Object(l.ib)(t) && !a && (Object(_.h)(e) && r.push("invite"), e.gid || r.push("leave")), Object(l.ib)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(l.ib)(t) && n.pinned && (r.push(Object(h.a)(e, t) ? "pin_hide" : "pin_unhide"), Object(_.j)(e) && r.push("unpin"));
            var s = Object(l.D)(e, i);
            return e.curActions = r.sort((e, t) => T[e] - T[t]).reduce((e, t) => (e[t] = s[t], e), {}), Promise.resolve(e)
        }

        function V(e, t, n) {
            var a = n.tabs[n.peer];
            return Object(r.b)(O, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: a.offset + (a.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(e => {
                var t = j(e, 4),
                    r = t[0],
                    i = t[1],
                    s = t[2],
                    o = t[3];
                return a.allShown = s, n.admins = extend(n.admins, o), a.history = r + D(a.history), a.historyToAppend = r, a.offset += Object.keys(i).length, a.msgs = extend(a.msgs, i), n
            })
        }

        function G(e) {
            var t = e.tabs[e.peer];
            return Object(r.b)(O, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(n => {
                var r = j(n, 5),
                    a = r[0],
                    i = r[1],
                    s = r[2];
                r[3], r[4];
                t.allShown = t.allShown || s, t.history = D(t.history) + a, t.historyToAppend = a;
                var o = Object.keys(i).length;
                return t.skipped -= o, t.offset += o, t.msgs = extend(t.msgs, i), e
            })
        }

        function X(e, t, n, r) {
            var a = e.tabs[t];
            return r === i.m && a.out_up_to > n ? e : (r === i.m ? a.out_up_to = n : a.in_up_to = n, e)
        }
        var Q = L(function(e, t) {
            if (Object(l.Hc)(t.tabs[e])) return Promise.resolve(t);
            var n = t.tabs[e],
                a = n.msgs || {},
                s = Object.keys(a).map(n => Object(u.n)(t, e, n)).filter(e => !Object(m.k)(e)).map(e => e.messageId).sort((e, t) => t - e);
            return n.skipped > 0 && (s = s.filter(e => intval(e) <= n.lastmsg - n.skipped)), (s = intval(s.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([i.ub([6, e, s])]), Object(r.b)(O, {
                peer: e,
                ids: [s],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(() => X(t, e, s, i.m)))
        });

        function Y(e) {
            return Object(r.b)(O, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(t => {
                var n = j(t, 3),
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

        function J(e) {
            return Object(r.b)(O, {
                act: "a_get_ts",
                gid: e.gid
            }).then(t => {
                var n = j(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function Z(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(l.mc)(e, t, B(r.history))), Promise.resolve(n)
        }

        function ee(e, t, n, r) {
            var a = r.tabs[e];
            return a.msgs[t] && (a.msgs[t].errored = 0, a.lastmsg_meta = n, a.lastmsg = t, a.history = Object(l.Fc)(e, t, B(a.history))), Promise.resolve(r)
        }

        function te(e, t, n, r) {
            var a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce((e, i) => (!n && !Ft(i)(t) || a && !a(i, e[i], t) || (e[i] = Object(o.a)(r(e[i], i))), e), e.dialog_tabs))
        }

        function ne(e, t) {
            if (!inArray(e, t.tabbedPeers.map(e => e.peer)) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                Jt(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function re(e, t, n) {
            return Object(l.Bb)(n) ? t.concat([e]) : [e].concat(t)
        }

        function ae(e, t) {
            var n = e.get().peer,
                r = Object(u.u)(e, n);
            if (Object(l.qb)(e, n)) {
                var a = B(r.history);
                r.history = Object(l.Lc)(e, a, t)
            }
        }

        function ie(e, t) {
            var n = Object(u.u)(t, e.peerId);
            if (Object(l.qb)(t, e.peerId)) {
                var r = B(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(l.K)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var a = n && n.pinned && Object(u.S)(n.pinned);
            return a && a.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function se(e, t) {
            var n = e.flags & i.m,
                r = e.peerId;
            if (Object(l.Db)(t, r)) {
                var a = t.tabs[r];
                if (a.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = {
                        [e.messageId]: 0
                    } : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n || Object(l.Hc)(a) ? a.unread = 0 : (a.lastmsg == e.messageId && a.unread ? oe(t, 1, e.peerId) : (!a.unread && oe(t, 1, e.peerId), a.unread++), ne(e.peerId, t)), Object(l.qb)(t, r)) {
                    var s = B(a.history);
                    a.skipped > 0 && a.skipped++, a.offset++, a.msgs[e.messageId] = extend(!0, {}, e), a.history = Object(l.x)(t, e, s, !0, !0, !0), Object(m.k)(e) && (a.blocked_community = 0, W(t))
                }
                if (a.typing) {
                    var o = a.typing.userIds.indexOf(e.userId);
                    o >= 0 && a.typing.userIds.splice(o, 1)
                }
                return a.lastmsg = e.messageId, a.lastmsg_meta = e, $(e.peerId, t), te(t, a, !1, re.bind(null, r), $t.bind(null, t)), Promise.resolve(t)
            }
            return A(r, 0, 0, 0, t).then(t => {
                return te(t, t.tabs[r], !1, re.bind(null, r), $t.bind(null, t)), $(e.peerId, t), n || ne(e.peerId, t), t
            })
        }

        function oe(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function ce(e, t) {
            if (Object(l.qb)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = X(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(u.b)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && oe(t, -1, e.peerId), !n.skipped) {
                    var a = B(n.history);
                    n.history = Object(l.Rb)(t, a, e.peerId)
                }
            } else Object(l.Db)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && oe(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(l.Db)(t, e.peerId) && (t.dialog_tabs[d.m] = t.dialog_tabs[d.m].filter(t => intval(t) !== e.peerId)), 0 !== t.unread_cnt || t.active_tab !== d.m || t.gid ? Promise.resolve(t) : Rt(d.h, t)
        }

        function le(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(l.Db)(t, e.peerId) && X(t, e.peerId, e.upToId, i.m), Object(l.qb)(t, e.peerId)) {
                var r = B(n.history);
                n.history = Object(l.Lb)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function de(e, t, n, r, a) {
            return a.text = {}, a.imQueue = e, a.imQueueResend = t, a.imQueueSet = n, a.imQueueComplete = r, Promise.resolve(a)
        }

        function ue(e, t, n) {
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
                var a = e[0],
                    i = Object(u.n)(n, t, a),
                    s = Object(u.e)(n, t, a);
                return !1 === s ? n.set(pt.bind(null, {
                    [t]: [i.userId]
                })).then(n => {
                    var s = Object(u.e)(n, t, a);
                    return {
                        msgIds: e,
                        object: r(i, s)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: r(i, s)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function me(e, t) {
            Object(l.Nb)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce((n, r) => {
                var a = t.tabs[r] ? t.tabs[r].msgs : {},
                    i = extend({}, a || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function pe(e, t, n, r) {
            var a = Object(u.u)(r, e);
            if (a) {
                var i = !1 !== t ? mobPlatforms[t] ? 1 : 0 : a.last_seen[2];
                a.online = t, a.last_seen = [t, n || a.last_seen[1], i]
            }
            return Promise.resolve(r)
        }

        function ge(e, t, n) {
            var r = Object(u.u)(n, e.peerId);
            return r && (e.ts = Date.now() / 1e3, r.activity || (r.activity = {}), r.activity[t] = e, r.typing === k && (r.typing = e)), Promise.resolve(n)
        }

        function he(e, t) {
            var n = Object(u.u)(t, e.peerId),
                r = Object(m.d)(e) ? "audiomessage" : "typing";
            return n && n.activity && n.activity[r] && (n.activity[r].userIds = n.activity[r].userIds.filter(t => t !== e.userId)), Promise.resolve(t)
        }

        function _e(e, t, n) {
            var r = e.peerId;
            return Object(s.c)(w + 2).then(() => {
                if (Object(l.Db)(n, r)) {
                    var e = n.tabs[r];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * w && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * w && (e.typing = void 0)
                }
                return n
            })
        }

        function be(e) {
            var t = {},
                n = e.find(e => "poll" === e[0]);
            if (n) {
                var r = j(n, 3)[2];
                Object.assign(t, r)
            }
            return t
        }

        function fe(e) {
            return e.map(e => {
                var t = "audiomsg" === e[2] ? "audio_message" : e[2];
                return `${e[0]}:${e[1]}:${t}`
            }).join(",")
        }
        var ve = function(e, t, n, a) {
                var i = Date.now() + rand(0, 100).toFixed(0),
                    s = a.ref_id,
                    o = a.ref_source;
                a.ref_source = void 0, a.ref_id = void 0, (o || s) && (E({
                    ref_source: null,
                    ref: null
                }), I()), Object(b.i)(a);
                var c = t.attaches.length > 0,
                    l = Object(b.k)(a, "send", "server", c),
                    d = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: o,
                        ref: s,
                        msg: t.message,
                        payload: t.payload,
                        media: fe(t.attaches),
                        guid: i,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : a.gid,
                        entrypoint: a.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, be(t.attaches));
                return Object(r.b)(O, d, 2e4).then(e => {
                    var t = j(e, 1)[0];
                    return l(), a.version !== t.version && nav.reload({
                        force: !0
                    }), a.currentEntryPoint = "", a
                }).catch(e => {
                    throw Object(b.h)(a, e, "send", "server_send"), e
                })
            },
            ye = L(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments.length > 3 ? arguments[3] : void 0,
                    a = r.tabs[e];
                return ve(e, t, y({
                    hash: a.hash
                }, n), r)
            }),
            je = L(function(e, t, n) {
                var a = t.attaches.length > 0,
                    i = Object(b.k)(n, "edit", "server", a);
                return Object(r.b)(O, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: fe(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, be(t.attaches)), 2e4).then(e => {
                    j(e, 1)[0];
                    return i(), n
                }).catch(e => {
                    throw Object(b.h)(n, e, "edit", "server_send"), e
                })
            });

        function Oe(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(t => t !== e[0]);
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(o.a)(n).sort((e, t) => e - t)
            }
            return Promise.resolve(t)
        }

        function we(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function ke(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Ce(e, t) {
            if (Object(l.qb)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(t => t.failed && t.rid !== e.randomId);
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(l.gc)(t, B(n.history), e)
            }
            return Promise.resolve(t)
        }

        function Se(e, t) {
            var n = Object(b.k)(t, "unknown", "attach"),
                a = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(s.e)(r.b, 3, e => e * e)(O, a).then(r => (n(), Ee(e, r, t))).catch(n => (Object(b.h)(t, n, "unknown", "server_load_attach"), Ee(e, null, t)))
        }

        function Ee(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")],
                function(e, t) {
                    var n = t.tabs[e.peerId];
                    return n.history = Object(l.fc)(B(n.history), e, t), Promise.resolve(t)
                }(e, n)
        }

        function Ie(e, t, n) {
            var r = Object(l.J)(t),
                a = n.tabs[e];
            return a.searchDay = r, a.searchOffset = 0, a.searchAllLoaded = !1, Promise.resolve(n)
        }

        function xe(e, t, n) {
            return n.tabs[t].searchText = e, Ke(t, n), n
        }

        function Te(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function Pe(e, t, n, a, i) {
            var s = +new Date;
            return Object(r.b)(O, {
                act: "a_hints",
                str: e,
                gid: a.hidegid ? 0 : i.gid,
                query: n,
                peerIds: t.join(",")
            }).then(t => {
                var n = j(t, 3),
                    r = n[0],
                    a = n[1];
                return N(n[2], i), a.forEach(e => Object(p.a)(i, e)), me(r, i), Object(v.c)("messages", s, r && r.length, e), Object.keys(r).sort((e, t) => r[e].order - r[t].order).map(e => r[e])
            })
        }

        function Me(e, t, n, r) {
            return Pe(e, t, n, {}, r).then(e => e.map(e => ({
                peerId: e.peerId,
                name: e.tab,
                photo: e.photo,
                online: e.online,
                is_friend: "friends" === n
            })))
        }

        function Le(e) {
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

        function Be(e) {
            return (t, n) => e(n).then(e => {
                var r = (t ? e.search(t) : e.list).map(Le);
                return n.mapped_index || (n.mapped_index = {}), r.forEach(e => {
                    n.mapped_index[e.peerId] = e
                }), r
            })
        }
        var De = Be(e => e.topConvTree),
            Ne = Be(e => e.imTopConvTree),
            Ae = Be(e => e.hintsTree);

        function qe(e, t) {
            var n, a, i;
            t.topConvTree = new Promise(e => {
                n = e
            }), t.hintsTree = new Promise(e => {
                a = e
            }), t.imTopConvTree = new Promise(e => {
                i = e
            });
            var o = e.select(c.b);
            return Object(s.e)(r.b, 1, () => 4)(O, {
                act: "a_dialogs_preload",
                rs: o.join(","),
                gid: t.gid
            }).catch(e => [
                [],
                [],
                []
            ]).then(e => {
                var r = j(e, 4),
                    s = r[0],
                    o = r[1],
                    c = r[2],
                    l = r[3];
                return t.popular_sugg = c, new vkIndexer(s, e => e[1], n), new vkIndexer(o, e => e[1], a), l && l.length > 0 ? new vkIndexer(l, e => e[1], i) : i(), t
            })
        }

        function He(e) {
            var t, n = e.active_tab;
            return t = e.dialog_tabs[n].length > 0 ? Math.min.apply(null, e.dialog_tabs[n].map(t => e.tabs[t].lastmsg)) : 0, Object(r.b)(O, {
                act: "a_get_dialogs",
                start_message_id: t,
                tab: n,
                gid: e.gid
            }).then(t => {
                var r = j(t, 4),
                    a = r[0],
                    i = r[1],
                    s = r[2],
                    o = r[3];
                return s.forEach(t => Object(p.a)(e, t)), N(o, e), me(i, e), e.dialog_tabs[n] = e.dialog_tabs[n].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[n] = !a.has_more, Promise.resolve(e)
            })
        }
        var Fe = L(function(e, t) {
            return Object(r.b)(O, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(n => {
                var r = j(n, 5),
                    a = r[0],
                    i = r[1],
                    s = r[2],
                    o = r[3],
                    c = r[4];
                return i.forEach(e => Object(p.a)(t, e)), Object(l.Nb)(t, a), e === t.searchText && (t.searchOffset = o, t.searchAllLoaded = c), Object.keys(a).filter(e => !t.tabs[e]).forEach(e => {
                    t.tabs[e] = a[e]
                }), [a, s]
            })
        });

        function Re(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function $e(e, t) {
            return !(t.peer !== e || !Object(l.qb)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Ue(e, t) {
            if (Object(l.qb)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, E({
                    st: ""
                }), I()
            }
            return Promise.resolve(t)
        }

        function ze(e, t) {
            if (Object(l.qb)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Ke(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var We = L(function(e, t) {
            var n = t.tabs[e],
                a = "";
            if (Ke(e, t), n.searchDay && (a = `day:${n.searchDay}`), !a && !n.searchText) return Promise.reject();
            var i = `in:${e} ${a} ${n.searchText||""}`;
            return E({
                st: n.searchText
            }), I(), Object(r.b)(O, {
                act: "a_search",
                q: i,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(e => {
                var t = j(e, 3),
                    r = t[0],
                    a = t[1],
                    i = t[2];
                return n.searchOffset = a, n.searchAllLoaded = i, r
            })
        });

        function Ve(e) {
            return Object(r.b)(O, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Ge(e, t) {
            var n = Object(u.u)(e, t);
            return Object(r.b)(O, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(r => {
                var a = j(r, 2),
                    i = a[0],
                    s = a[1];
                n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
                var o = j(s, 3);
                n.unread = o[0], n.in_up_to = o[1], n.out_up_to = o[2], n.unread || (e.get().dialog_tabs[d.m] = e.get().dialog_tabs[d.m].filter(e => e != t)), te(e.get(), n, !1, re.bind(null, t), $t.bind(null, e.get()))
            })
        }

        function Xe(e, t, n) {
            if (Object(l.qb)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function Qe(e, t, n) {
            if (Object(l.qb)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(l.Ob)(e, B(r.history)), r.offset -= e.filter(e => r.msgs[e]).length, e.forEach(e => delete r.msgs[e]), e.forEach(e => {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var Ye = L(function(e, t, n, a, i) {
            return Object(r.b)(O, {
                act: "a_mark",
                peer: t,
                hash: n || i.tabs[t].hash,
                gid: i.gid,
                msgs_ids: e.join(","),
                mark: a
            })
        });

        function Je(e, t, n, r) {
            if (Object(l.qb)(r, t)) {
                var a = r.tabs[t];
                a.deleted = a.deleted ? a.deleted.concat(e) : e, a.history = Object(l.Pb)(e, t, n, B(a.history)), a.offset -= e.filter(e => a.msgs[e]).length
            }
            return Promise.resolve(r)
        }

        function Ze(e, t, n) {
            if (Object(l.qb)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(t => t !== e)), r.history = Object(l.ic)(e, t, B(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function et(e, t, n, a) {
            return Object(r.b)(O, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: a
            })
        }
        var tt = L(function(e, t, n) {
                return Object(l.Hc)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(r.b)(O, {
                    act: "a_activity",
                    type: t,
                    peer: e,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(() => n, () => n))
            }),
            nt = L((e, t) => Object(r.b)(O, {
                act: "a_accept_message_request",
                user_id: e,
                hash: t.tabs[e].hash
            }).then(() => {
                var n = t.tabs[e];
                return n.is_message_request = !1, n.folders = Object(u.T)(n.folders), t
            })),
            rt = L((e, t) => Object(r.b)(O, {
                act: "a_reject_message_request",
                user_id: e,
                hash: t.tabs[e].hash
            }).then(() => (te(t, t.tabs[e], !0, t => t.filter(t => t !== e)), Jt(t.tabbedPeers.filter(t => t.peer !== e), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null, t))),
            at = L(function(e, t) {
                return tt(e, k, t)
            }),
            it = L(function(e, t) {
                return tt(e, C, t)
            });

        function st(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function ot(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function ct(e, t, n) {
            if (Object(l.Db)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, te(n, n.tabs[e], !0, t => t.filter(t => t !== e)), n.tabs[e].unread > 0 && oe(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, Jt(n.tabbedPeers.filter(t => t.peer !== e), !0, n), t.then(t => {
                    var a = j(t, 2);
                    a[0], a[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var lt = L(function(e, t) {
                return ct(e, Object(r.b)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            dt = L(function(e, t, n) {
                return Object(r.b)(O, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(() => n)
            }),
            ut = L(function(e, t) {
                return Object(r.b)(O, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(n => {
                    var r = j(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });
        var mt = L(function(e, t, n) {
            return Object(r.b)(O, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(e => n)
        });

        function pt(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(t => `${t}:${e[t].join(",")}`).join(";");
            return Object(r.b)(O, {
                act: "a_load_member",
                need: n
            }).then(e => {
                return j(e, 1)[0].forEach(e => Object(p.a)(t, e)), t
            })
        }

        function gt(e, t, n) {
            var r = {},
                a = n.get();

            function s(e, t) {
                Object(l.ib)(e) && t && !Object(p.b)(a, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var o = t.filter(e => !Object(l.Db)(a, e.peerId)).map(e => e.peerId);
            t.forEach(e => {
                s(e.peerId, e.userId)
            }), e.forEach(e => {
                s(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(e => e.flags & i.m && !e.local).map(e => e.kludges.from_admin).filter(e => e && !a.admins[e]);
            return 0 === Object.keys(r).length && 0 === c.length && 0 === o.length ? Promise.resolve(a) : {
                shouldLoad: Object.keys(r).length > 0 || c.length > 0 || o.length > 0,
                needMembers: r,
                needAdminIds: c,
                needPeers: o
            }
        }

        function ht(e, t, n) {
            var a = e.needMembers,
                i = e.needAdminIds,
                s = e.needPeers;
            return t.pause(), Promise.all([pt(a, n), function(e, t) {
                return 0 === e.length ? Promise.resolve(t) : Object(r.b)(O, {
                    act: "a_get_admin",
                    admins: e.join(","),
                    gid: t.gid
                }).then(e => {
                    var n = j(e, 1)[0];
                    return t.admins = extend(t.admins, n), t
                })
            }(i, n), Promise.all(s.map(e => A(e, 0, 0, 0, n)))]).catch(() => n).then(() => t.resume()).then(() => n)
        }
        var _t = L(function(e, t) {
            return e.kludges.source_act === l.d ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.b)(O, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(n => {
                var r = j(n, 2),
                    a = r[0],
                    i = r[1];
                t.chat_photo_msg = i;
                var s = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = a[0], t.tabs[e.peerId].photoLarge = a[1], Object(l.qb)(t, e.peerId)) {
                    var o = e.kludges.source_act;
                    s.history = Object(l.w)(e, o, t, B(s.history))
                }
                return t
            })
        });

        function bt(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(l.Db)(r, n) && r.peer == n && (r = W(r)), Promise.resolve(r))
        }
        var ft = L(function(e, t) {
                return Object(r.b)(O, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(bt.bind(null, l.c, vk.id, e, t))
            }),
            vt = L(function(e, t) {
                return Object(r.b)(O, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(bt.bind(null, l.b, vk.id, e, t))
            }),
            yt = L(function(e, t, n) {
                return Object(r.b)(O, {
                    act: "a_mute",
                    peer: e,
                    hash: n.tabs[e].hash,
                    gid: n.gid,
                    value: t ? 1 : 0
                }).then(() => {
                    var r = t ? "mute" : "unmute";
                    return window.Notifier && Notifier.lcSend("im", {
                        act: r,
                        peer: e
                    }), n
                }).then(jt.bind(null, e, t))
            });

        function jt(e, t, n) {
            var r = n.mutedPeers.filter(t => t !== e);
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, W(n)
        }

        function Ot(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var wt = L(function(e, t, n, a) {
            return kt(e, n, t, a), Object(r.b)(O, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: a.gid,
                peer: n,
                hash: a.tabs[n].hash
            }).then(() => a)
        });

        function kt(e, t, n, r) {
            if (Object(l.qb)(r, t)) {
                var a = r.tabs[t];
                e.filter(e => a.msgs[e]).forEach(e => {
                    var s = Object(u.n)(r, t, e),
                        o = n ? s.flags | i.l : s.flags & ~i.l;
                    s.flags = o, a.msgs[e] = s, a.history = Object(l.Nc)(e, n, B(a.history))
                })
            }
            return Promise.resolve(r)
        }

        function Ct(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function St(e, t) {
            return Object(r.b)(O, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Et(e, t) {
            return Object(r.b)(O, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function It(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function xt(e, t) {
            return Object(r.b)(O, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Tt(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }
        var Pt = L(function(e, t, n, a) {
            return a.creating = !0, a.longpoll.pause(), Object(r.b)(O, {
                act: "a_multi_start",
                hash: a.writeHash,
                peers: t.join(","),
                title: n
            }).then(e => {
                var t = j(e, 1)[0];
                return a.next_peer = t.peerId, a.tabs[t.peerId] = t, te(a, t, !1, e => [t.peerId].concat(e)), a.longpoll.resume(), a
            }).then(t => e ? function(e, t, n) {
                return Object(r.b)("al_page.php", {
                    act: "owner_photo_save",
                    peer: e,
                    _query: t
                }).then(e => n)
            }(t.next_peer, e, t) : t).then(e => (e.creating = !1, e)).catch(e => {
                throw a.creating = !1, a.longpoll.resume(), e
            })
        });

        function Mt(e) {
            var t;
            e.resync_in_process = new Promise(e => {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                a = e.active_tab;
            return Object(r.b)(O, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: a,
                add_peers: e.tabbedPeers.map(e => e.peer).join(",")
            }).then(n => {
                var r = j(n, 5),
                    i = r[0],
                    s = r[1],
                    c = r[2],
                    u = r[3],
                    m = r[4];
                s.forEach(t => Object(p.a)(e, t)), Object(l.Nb)(e, i), c.user_unread && handlePageCount("msg", c.user_unread), Object(o.h)("Resync success", "success");
                var g, h = e.peer;
                if (Object(l.Ab)(h)) g = Promise.resolve(!1);
                else {
                    var _ = {
                        tabs: {
                            [h]: e.tabs[h]
                        },
                        oCache: {}
                    };
                    g = me({
                        [h]: i[h]
                    }, _)
                }
                return g.then(n => {
                    e.tabs = i, e.admins = extend(e.admins, u), n && (e.tabs[h] = n.tabs[h], e.tabs[h].history = Object(l.jc)(h, e, B(e.tabs[h].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = Object.assign({}, c.folder_cts, {
                        [d.k]: e.dialog_tab_cts[d.k]
                    }), e.dialog_tabs[a] = m.map(intval);
                    var r = e.dialog_tabs[a].map(t => e.tabs[t]);
                    return Object.keys(e.dialog_tabs).filter(e => e != a).forEach(t => {
                        a == d.h ? e.dialog_tabs[t] = r.filter(Ft(t)).map(e => e.peerId) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Nt(intval(c.unread), e)
                })
            }).catch(t => (Object(o.h)("Resync error: " + t.message + " " + t.stack, "error"), Object(s.c)(2).then(Mt.bind(null, e))))
        }

        function Lt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Bt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Dt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(e => Upload.isSomethingUploading(e)).length > 0
        }

        function Nt(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[d.m] = e, Promise.resolve(t)
        }

        function At(e, t) {
            return t.ctrl_submit = !!e, Object(r.b)(O, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(e => t)
        }

        function qt(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                a = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var i = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(f.ob)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(f.ob)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(f.ob)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, a, n);
                n.update_title_to = setInterval(i, 1e3), i()
            } else !t && n.update_old_title && (Object(f.ob)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function Ht(e, t, n, r, a) {
            return Object(l.qb)(a, e) && (a.tabs[e].scrollTop = intval(t), a.tabs[e].scrollBottom = intval(n), a.tabs[e].contHeight = intval(r)), Promise.resolve(a)
        }

        function Ft(e) {
            return e === d.h ? e => !Object(l.Hc)(e) : e === d.m ? e => !Object(l.Hc)(e) && e.unread > 0 : t => t.folders & d.j[e]
        }

        function Rt(e, t) {
            t.active_tab = e, Object(a.b)({
                tab: e === d.h ? null : e
            });
            var n = [];
            if (e !== d.h && !Object(l.Bb)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[d.h].map(e => t.tabs[e]).filter(Ft(e)).map(e => e.peerId), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function $t(e, t, n, r) {
            var a = e.dialog_tabs_all;
            return !(!a[d.h] && !a[t]) || (n.filter(e => e === r.peerId).length > 0 || ("r" === r.lastmsg[0] || n.map(t => e.tabs[t.toString()]).filter(t => Object(l.Bb)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg).length > 0))
        }

        function Ut(e, t, n, r, a) {
            if (Object(l.Db)(a, e)) {
                var s = a.tabs[e];
                return n === i.P && (t ^= s.folders),
                    function(e, t, n) {
                        return !(e === i.X && n.folders & t || !(e !== i.T || n.folders & t))
                    }(n, t, s) && Object.keys(d.j).filter(e => d.j[e] & t).forEach(e => {
                        a.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== i.T || e.folders & d.j[n] ? t === i.P ? e.folders & d.j[n] ? -1 : 1 : t === i.X ? 1 : -1 : 0
                        }(s, n, e)
                    }), n === i.X ? a.tabs[e].folders |= t : n === i.T ? a.tabs[e].folders &= ~t : a.tabs[e].folders = t ^= s.folders, te(a, a.tabs[e], !0, (t, n) => t.concat([e]).map(e => a.tabs[e]).filter(Ft(n)).map(e => e.peerId), $t.bind(null, a)), Promise.resolve(a)
            }
            return A(e, 0, 0, 0, a).then(Ut.bind(null, e, t, n, a))
        }
        var zt = L(function(e, t) {
                var n = d.j[d.i],
                    a = t.tabs[e].folders & n,
                    s = a ? i.Fb : i.Jb;
                return t.longpoll.push([s([0, e, n, !0])]), Object(r.b)(O, {
                    act: "a_dialog_star",
                    val: a ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(() => t)
            }),
            Kt = L(function(e, t, n) {
                var a = d.j[d.n];
                return n.longpoll.push([i.Fb([0, e, a, !0]), i.ub([6, e, t])]), Object(r.b)(O, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(() => n)
            });

        function Wt(e) {
            return Object(r.b)(O, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Vt(e, t) {
            return N({
                [e]: {
                    free: !0
                }
            }, t), Object(r.b)(O, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(() => t)
        }

        function Gt(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var Xt = L(function(e, t) {
            return te(t, t.tabs[e], !0, t => t.filter(t => t !== e)), t.tabs[e].deletedDialog = !0, Object(r.b)(O, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(n => (n[0] ? (Jt(t.tabbedPeers.filter(t => t.peer !== e), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, te(t, t.tabs[e], !1, re.bind(null, e), $t.bind(null, t))), n))
        });

        function Qt(e, t, n, a) {
            return Object(r.b)(O, {
                act: "a_restore_dialog",
                hash: t,
                gid: a.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(t => (a.tabs[e].deletedDialog = !1, te(a, a.tabs[e], !1, t => [e].concat(t)), a.tabs[e].unread = t, a))
        }

        function Yt(e, t, n) {
            return Object(r.b)(O, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function Jt(e, t, n) {
            return n.tabbedPeers = e, Object(l.jb)(n) && (E({
                peers: n.tabbedPeers.filter(e => {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(e => Object(l.S)(e.peer, n)).filter(e => !e.deletedDialog).map(e => e.peerId).map(l.I).join("_"),
                to: ""
            }), t && I()), Promise.resolve(n)
        }

        function Zt(e) {
            return !e.peer || ($e(e.peer, e) ? Re(e.peer, e) : !!Object(l.qb)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function en(e, t) {
            var n = t.tabs[e];
            return Object(l.qb)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function tn(e, t) {
            var n = t.tabs[e];
            return Object(l.qb)(t, e) && (n.history = D(n.history)), Promise.resolve(t)
        }

        function nn(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function rn(e, t, n) {
            if (!Object(l.lb)(t)) return Promise.resolve(n);
            var a = Object(u.u)(n, t);
            return a.blocked_community = !e, !1 === e && (a.can_send_notify = !1), Object(r.b)(O, {
                act: "a_toggle_community",
                peer_id: t,
                hash: a.hash,
                state: e ? 1 : 0
            }).then(() => W(n))
        }

        function an(e, t) {
            if (0 !== t.peer && Object(l.qb)(t, t.peer)) {
                var n = Object(u.u)(t, t.peer);
                n.history = B(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function sn(e, t) {
            if (0 !== t.peer && Object(l.qb)(t, t.peer)) {
                var n = Object(u.u)(t, t.peer),
                    r = geByClass1("_im_peer_history");
                r && (n.history = B(r.innerHTML)), e(n.history)
            }
            return Promise.resolve(t)
        }

        function on(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function cn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function ln(e) {
            E({
                act: e ? "create" : null
            }), I()
        }

        function dn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            E({
                q: e
            }), I()
        }

        function un(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(l.V)() > window.clientHeight() && Object(l.lc)(0)), Promise.resolve(e)
        }
        var mn = L(function(e, t, n) {
            return Object(r.b)(O, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(e => {
                var t = j(e, 4),
                    r = t[0],
                    a = t[1],
                    i = t[2],
                    s = t[3];
                return i.forEach(e => Object(p.a)(n, e)), n.tabs[r] = a, te(n, a, !1, re.bind(null, r), $t.bind(null, n)), n.admins = extend(n.admins, s), [r]
            })
        });

        function pn(e, t) {
            return Object(r.b)(O, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var gn = L(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(O, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(e => (n.inviteLink = e[0], e))
        });

        function hn(e) {
            return x({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function _n(e, t) {
            var n = Object(o.a)([e].concat(t.select(c.b))).slice(0, 500);
            t.update(c.b, n)
        }

        function bn(e) {
            e.update(c.b, [])
        }

        function fn(e, t) {
            var n = t.select(c.b).filter(t => t !== e);
            return t.update(c.b, n), n
        }

        function vn(e, t, n) {
            var r = n.tabs[t],
                a = Object(u.n)(n, t, e);
            return r.data.kicked || r.data.closed || a.kludges.source_act || (r.pinned = a), Promise.resolve(n)
        }

        function yn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var jn = L(function(e, t, n) {
                var a = n.tabs[t];
                return a.data.kicked || a.data.closed ? Promise.resolve(n) : Object(r.b)(O, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(e => {
                    var r = j(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, a, r), n
                })
            }),
            On = L(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.b)(O, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(r => {
                    var a = j(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, a), t
                })
            }),
            wn = L(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)(O, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(e => {
                    var r = j(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            kn = L(function(e, t, n) {
                var a = n.tabs[e];
                return Object(r.b)(O, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: a.hash
                })
            }),
            Cn = L(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.b)(O, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(e => {
                    var r = j(j(e, 1)[0], 3),
                        a = r[0],
                        i = r[1],
                        s = r[2];
                    return n.memberIds = a, n.adminIds = i, s.forEach(e => Object(p.a)(t, e)), n.membersLoaded = !0, t
                })
            }),
            Sn = L(function(e, t) {
                return Promise.all([Cn(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.b)(O, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(e => {
                        var r = j(e, 1)[0];
                        return n.photoGrid = r.grid, n.photoLarge = r.photo, n.membersLastSeen = r.lastSeen || null, n.inviters = r.inviters, n.caccess = r.caccess, n.invitedByMe = r.invitedByMe || [], n.inviteLink = r.link || null, n.serverSettings = r.serverSettings || null, t
                    })
                }(e, t)]).then(() => t)
            }),
            En = L(function(e, t, n) {
                var a = n.tabs[e];
                return Object(r.b)(O, {
                    act: "a_update_flags",
                    chat: e,
                    hash: a.hash,
                    flags: t
                })
            }),
            In = L(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(() => (n.photo = null, n.photoLarge = null, t))
            });

        function xn(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(e => e !== t), r.adminIds = r.adminIds.filter(e => e !== t), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var Tn = L(function(e, t, n) {
            var a = n.tabs[e];
            return Object(r.b)(O, {
                act: "a_kick_user",
                chat: e,
                hash: a.hash,
                mid: t
            }).then(() => (a.memberIds = a.memberIds.filter(e => e !== t), a.adminIds = a.adminIds.filter(e => e !== t), a.membersCount = a.memberIds.length, n))
        });

        function Pn(e, t, n, r) {
            var a = r.tabs[e];
            return a.adminIds = n ? [].concat(a.adminIds, t).filter((e, t, n) => n.indexOf(e) === t) : a.adminIds.filter(e => e !== t), Promise.resolve(r)
        }
        var Mn = L(function(e, t, n, a) {
            var i = a.tabs[e];
            return Object(r.b)(O, {
                act: "a_toggle_admin",
                chat: e,
                hash: i.hash,
                mid: t,
                is_admin: +n
            }).then(() => Pn(e, t, n, a))
        });

        function Ln(e, t, n, r) {
            var a = Object(u.n)(e, n, t).userId;
            return Object(p.c)(r, a) ? Promise.resolve(r) : pt({
                [n]: [a]
            }, r)
        }

        function Bn() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Dn() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Nn = L(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.b)(O, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(() => t)
            }),
            An = L(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var a = n.tabs[e];
                return Object(r.b)(O, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: a.hash
                }).then(() => n)
            });

        function qn(e, t) {
            return Object(r.b)(O, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(n => {
                var r = j(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function Hn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Rn(e, !1, !0, n)
        }

        function Fn(e, t) {
            return Hn(e, null, t)
        }

        function Rn(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, {
                [e]: t
            }))), Promise.resolve(r)
        }
        var $n = L(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(O, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(n => {
                var r = j(n, 1)[0];
                return Hn(e, r, t)
            })
        });

        function Un(e, t, n, a) {
            var i = a.tabs[e];
            return i.caccess[t] = n, Object(r.b)(O, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: i.hash,
                access: n ? 1 : 0
            }).then(() => a).catch(e => {
                throw i.caccess[t] = !n, e
            })
        }
        var zn = L(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.b)(O, {
                act: "a_delete_template",
                template_id: e,
                hash: n.hash,
                gid: t.gid,
                peer_id: t.peer
            }).then(() => {
                var n = t.templates.find(t => t.id === e);
                return n && (n.deleted = !0), t
            })
        });

        function Kn(e, t, n) {
            var a = n.tabs[n.peer];
            return Object(r.b)(O, {
                act: "a_create_template",
                hash: a.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(e => (n.templates.unshift(e[0]), n))
        }

        function Wn(e, t, n, a) {
            var i = a.tabs[a.peer];
            return Object(r.b)(O, {
                act: "a_update_template",
                template_id: e,
                hash: i.hash,
                gid: a.gid,
                peer_id: a.peer,
                group_id: a.gid,
                name: t,
                text: n
            }).then(t => {
                var n = a.templates.find(t => t.id === e);
                return n && Object.assign(n, t[0]), a
            })
        }

        function Vn(e, t) {
            if (Object(l.qb)(t, e)) {
                var n = Object(u.u)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }

        function Gn(e, t) {
            var n = e.updateType,
                r = e.updateArg,
                a = 0;
            return n === i.A && (a = r === i.G ? 1 : -1), n === i.x && (a = -1), t.dialog_tab_cts[d.k] += a, Promise.resolve(t)
        }
    },
    "wSs/": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "b", function() {
            return l
        }), n.d(t, "c", function() {
            return d
        }), n.d(t, "e", function() {
            return u
        }), n.d(t, "d", function() {
            return m
        });
        n("Vd3H"), n("rGqo"), n("Btvt"), n("pIFo");
        var r = n("rHUl"),
            a = n("MhhX"),
            i = n("P13b"),
            s = n("eTng"),
            o = n("aong");

        function c(e, t) {
            t = Object(r.S)(t);
            var n = vk.id == t.peerId && !Object(o.q)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(a.k)(t)) && (!Object(a.l)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(a.f)(t) || Object(a.m)(t) || Object(a.d)(t) || Object(a.g)(t) || Object(a.i)(t) || Object(a.o)(t)) && !Object(i.gb)(e, t.peerId, t.messageId)))))
        }

        function l(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : `@${e} (${t})`
            }), t.innerHTML = e, Emoji.val(t)
        }

        function d(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(e => e > 0).sort((e, t) => t - e).find(n => c(e, t.msgs[n])) || null
        }

        function u(e, t, n) {
            var r = Object(s.a)(t.kludges, t.messageId),
                a = n.dData.attaches;
            if (l(t.text) !== n.dData.txt || r.length !== a.length) return !0;
            for (var i = r.length; i--;) {
                var o = r[i],
                    c = a[i];
                if (o.id != c.id || o.type != c.type || "poll" == o.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function m(e, t, n, r, a, s) {
            t.origText = n, t.text = Object(i.hc)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = a, t.cancelled_shares = s, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    },
    wmvG: function(e, t, n) {
        "use strict";
        var r = n("hswa").f,
            a = n("Kuth"),
            i = n("3Lyj"),
            s = n("m0Pp"),
            o = n("9gX7"),
            c = n("SlkY"),
            l = n("Afnz"),
            d = n("1TsA"),
            u = n("elZq"),
            m = n("nh4g"),
            p = n("Z6vF").fastKey,
            g = n("s5qY"),
            h = m ? "_s" : "size",
            _ = function(e, t) {
                var n, r = p(t);
                if ("F" !== r) return e._i[r];
                for (n = e._f; n; n = n.n)
                    if (n.k == t) return n
            };
        e.exports = {
            getConstructor: function(e, t, n, l) {
                var d = e(function(e, r) {
                    o(e, d, t, "_i"), e._t = t, e._i = a(null), e._f = void 0, e._l = void 0, e[h] = 0, void 0 != r && c(r, n, e[l], e)
                });
                return i(d.prototype, {
                    clear: function() {
                        for (var e = g(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
                        e._f = e._l = void 0, e[h] = 0
                    },
                    delete: function(e) {
                        var n = g(this, t),
                            r = _(n, e);
                        if (r) {
                            var a = r.n,
                                i = r.p;
                            delete n._i[r.i], r.r = !0, i && (i.n = a), a && (a.p = i), n._f == r && (n._f = a), n._l == r && (n._l = i), n[h]--
                        }
                        return !!r
                    },
                    forEach: function(e) {
                        g(this, t);
                        for (var n, r = s(e, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;)
                            for (r(n.v, n.k, this); n && n.r;) n = n.p
                    },
                    has: function(e) {
                        return !!_(g(this, t), e)
                    }
                }), m && r(d.prototype, "size", {
                    get: function() {
                        return g(this, t)[h]
                    }
                }), d
            },
            def: function(e, t, n) {
                var r, a, i = _(e, t);
                return i ? i.v = n : (e._l = i = {
                    i: a = p(t, !0),
                    k: t,
                    v: n,
                    p: r = e._l,
                    n: void 0,
                    r: !1
                }, e._f || (e._f = i), r && (r.n = i), e[h]++, "F" !== a && (e._i[a] = i)), e
            },
            getEntry: _,
            setStrong: function(e, t, n) {
                l(e, t, function(e, n) {
                    this._t = g(e, t), this._k = n, this._l = void 0
                }, function() {
                    for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                    return this._t && (this._l = t = t ? t.n : this._t._f) ? d(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, d(1))
                }, n ? "entries" : "values", !n, !0), u(t)
            }
        }
    }
});