! function(e) {
    function t(t) {
        for (var a, s, o = t[0], l = t[1], c = t[2], u = 0, m = []; u < o.length; u++) s = o[u], r[s] && m.push(r[s][0]), r[s] = 0;
        for (a in l) Object.prototype.hasOwnProperty.call(l, a) && (e[a] = l[a]);
        for (d && d(t); m.length;) m.shift()();
        return i.push.apply(i, c || []), n()
    }

    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], a = !0, o = 1; o < n.length; o++) {
                var l = n[o];
                0 !== r[l] && (a = !1)
            }
            a && (i.splice(t--, 1), e = s(s.s = n[0]))
        }
        return e
    }
    var a = {},
        r = {
            "web/imn": 0
        },
        i = [];

    function s(t) {
        if (a[t]) return a[t].exports;
        var n = a[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, s), n.l = !0, n.exports
    }
    s.m = e, s.c = a, s.d = function(e, t, n) {
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
            for (var a in e) s.d(n, a, function(t) {
                return e[t]
            }.bind(null, a));
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
        l = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var c = 0; c < o.length; c++) t(o[c]);
    var d = l;
    i.push([103, "bundles/common", "bundles/vendors", "bundles/9c0282ff4a5b8fc91220de5adca84442"]), n()
}({
    "+/AQ": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getNativeOption", function() {
            return r
        }), n.d(t, "setNativeOption", function() {
            return i
        }), n.d(t, "createScroll", function() {
            return c
        });
        var a = n("N1NS");

        function r(e, t) {
            return bodyNode[e] || document.documentElement[e]
        }

        function i(e, t, n) {
            "scrollTop" === e && window.scrollTo(0, t)
        }
        class s {
            constructor(e, t) {
                this.el = e, this.opts = t, this.module = Object(a.createModule)({
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
                if (void 0 === e) return r("scrollTop", this.el);
                i("scrollTop", e, this.el)
            }
            contHeight() {
                return r("scrollHeight")
            }
            smoothScroll(e) {
                scrollToY(e + this.scrollTop(), 300)
            }
            getContainer() {
                return this.el
            }
            getScroller() {
                return null
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
                    a = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && a - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }
            getScrollHeight() {
                return this.innerHeight
            }
            destroy() {
                Object(a.destroyModule)(this.module)
            }
        }
        class o {
            constructor(e, t) {
                this.prevTop = 0, this.scroll = new uiScroll(e, {
                    hidden: void 0 === t.hidden || t.hidden,
                    shadows: t.shadows,
                    stopScrollPropagation: !1,
                    theme: t.scrollTheme,
                    onmore: () => t.more && t.more(this),
                    onscroll: e => {
                        var n = this.scrollTop(),
                            a = this.prevTop - n;
                        this.prevTop = n, t.scrollChange && t.scrollChange(n), t.onScroll && t.onScroll(a, this)
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
            getScroller() {
                return this.scroll.scroller
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
        class l {
            constructor(e, t) {
                this.el = e
            }
            update() {}
            getContainer() {
                return this.el
            }
            getScroller() {
                return null
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
            return t.noScroll ? new l(e) : t.nativeScroll ? new s(e, t) : new o(e, t)
        }
    },
    "1+Fu": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createWorker", function() {
            return u
        });
        n("KKXr"), n("rGqo"), n("Btvt"), n("9AAn");
        var a = n("DM26"),
            r = new Map,
            i = !1;

        function s(e) {
            return e.queue || e.key
        }

        function o() {
            r.forEach((e, t) => {
                var n = e.onData,
                    a = e.onUpdateKey,
                    r = e.ts;
                (function(e) {
                    return !!window.curNotifier && !curNotifier.addQueues[s(e)]
                })(t) && Notifier.addKey(extend(t, {
                    ts: r
                }), d.bind(null, n, a, t))
            })
        }

        function l() {
            i || (i = setInterval(o, 3e3))
        }

        function c(e) {
            ! function(e) {
                if (!window.curNotifier) return !1;
                delete curNotifier.addQueues[s(e)]
            }(e), r.delete(e), 0 === r.size && (clearInterval(i), i = !1)
        }

        function d(e, t, n, i, s) {
            if (s.failed) return c(n), void
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
                        s = Object(a.pause)(1).then(() => t);
                        break;
                    default:
                        throw new Error("Unkonwn error from queue: " + e)
                }
                Object(a.pause)(3).then(() => s).then(e => {
                    r.set(e, {
                        onUpdateKey: i,
                        onData: n,
                        ts: e.ts
                    }), o(), l()
                })
            }(s.err, n, e, t);
            r.set(n, {
                onData: e,
                onUpdateKey: t,
                ts: intval(s.ts)
            }), s.events.map(e => e.split("<!>")).forEach(e)
        }

        function u(e, t, n) {
            return Notifier.addKey(e, d.bind(null, t, n, e)), r.set(e, {
                onData: t,
                onUpdateKey: n,
                ts: e.ts
            }), l(), {
                stop: c.bind(null, e)
            }
        }
    },
    103: function(e, t, n) {
        e.exports = n("M24l")
    },
    "1y80": function(e, t, n) {
        "use strict";

        function a(e, t, n, a, r) {
            return window.statlogsValueEvent(e, t, n, a, r)
        }

        function r(e) {
            return Math.random() < e
        }

        function i(e, t, n, i, s, o) {
            r(e) && a(t, n, i, s, o)
        }
        n.r(t), n.d(t, "statlogsValueEvent", function() {
            return a
        }), n.d(t, "randEnabled", function() {
            return r
        }), n.d(t, "statlogsProbValueEvent", function() {
            return i
        })
    },
    "4LiD": function(e, t, n) {
        "use strict";
        var a = n("dyZX"),
            r = n("XKFU"),
            i = n("KroJ"),
            s = n("3Lyj"),
            o = n("Z6vF"),
            l = n("SlkY"),
            c = n("9gX7"),
            d = n("0/R4"),
            u = n("eeVq"),
            m = n("XMVh"),
            g = n("fyDq"),
            p = n("Xbzi");
        e.exports = function(e, t, n, h, _, f) {
            var b = a[e],
                v = b,
                y = _ ? "set" : "add",
                O = v && v.prototype,
                E = {},
                C = function(e) {
                    var t = O[e];
                    i(O, e, "delete" == e ? function(e) {
                        return !(f && !d(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "has" == e ? function(e) {
                        return !(f && !d(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "get" == e ? function(e) {
                        return f && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                    } : "add" == e ? function(e) {
                        return t.call(this, 0 === e ? 0 : e), this
                    } : function(e, n) {
                        return t.call(this, 0 === e ? 0 : e, n), this
                    })
                };
            if ("function" == typeof v && (f || O.forEach && !u(function() {
                    (new v).entries().next()
                }))) {
                var w = new v,
                    j = w[y](f ? {} : -0, 1) != w,
                    S = u(function() {
                        w.has(1)
                    }),
                    k = m(function(e) {
                        new v(e)
                    }),
                    T = !f && u(function() {
                        for (var e = new v, t = 5; t--;) e[y](t, t);
                        return !e.has(-0)
                    });
                k || ((v = t(function(t, n) {
                    c(t, v, e);
                    var a = p(new b, t, v);
                    return null != n && l(n, _, a[y], a), a
                })).prototype = O, O.constructor = v), (S || T) && (C("delete"), C("has"), _ && C("get")), (T || j) && C(y), f && O.clear && delete O.clear
            } else v = h.getConstructor(t, e, _, y), s(v.prototype, n), o.NEED = !0;
            return g(v, e), E[e] = v, r(r.G + r.W + r.F * (v != b), E), f || h.setStrong(v, e, _), v
        }
    },
    "6aSF": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return l
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("+/AQ")),
            i = n("pemR");

        function s() {
            return (s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function o(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class l extends a.Component {
            constructor() {
                super(...arguments), this.getWrapperRef = e => {
                    this.wrapper = e
                }
            }
            componentDidMount() {
                var e = this.props,
                    t = e.isNative,
                    n = e.isShadows,
                    a = e.neverHide,
                    i = e.onScroll;
                this.scroller || (this.scroller = Object(r.createScroll)(this.wrapper, {
                    shadows: n,
                    nativeScroll: t,
                    hidden: !a,
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
                    r = void 0 === n ? "" : n,
                    l = o(e, ["children", "isNative", "isShadows", "neverHide", "className"]);
                return a.createElement("div", s({}, l, {
                    className: Object(i.classNames)("Scroll", r),
                    ref: this.getWrapperRef
                }), t)
            }
        }
        l.defaultProps = {
            isNative: !1,
            isShadows: !1,
            neverHide: !1,
            onScroll: null
        }
    },
    "6raB": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return c
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR")),
            i = n("KFTi"),
            s = n("Hx9h");

        function o() {
            return (o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function l(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class c extends a.Component {
            constructor(e) {
                super(e), this.needRecalcSize = !1, this.state = {}
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.loading,
                    c = e.children,
                    d = l(e, ["className", "loading", "children"]),
                    u = Object(r.classNames)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": n
                    }, t);
                return a.createElement(s.default, o({}, d, {
                    className: u
                }), a.createElement("span", {
                    className: "ButtonWithProgress__content"
                }, c), n && a.createElement(i.default, {
                    inverted: "primary" === e.appearance,
                    className: "ButtonWithProgress__progress"
                }))
            }
        }
        c.defaultProps = {
            appearance: "primary",
            size: "m",
            wide: !1,
            loading: !1
        }
    },
    "7p7+": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = n("pemR");

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }

        function o(e) {
            var t = e.children,
                n = e.className,
                o = s(e, ["children", "className"]);
            return a.createElement("div", i({}, o, {
                className: Object(r.classNames)("Stub", n)
            }), t || "No results.")
        }
    },
    "86+7": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "oCacheExists", function() {
            return r
        }), n.d(t, "oCacheGet", function() {
            return i
        }), n.d(t, "oCacheAdd", function() {
            return s
        });
        n("KKXr");
        var a = n("aong");

        function r(e, t) {
            return t in Object(a.unpackStore)(e).oCache
        }

        function i(e, t) {
            var n = Object(a.unpackStore)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function s(e, t) {
            var n = Object(a.unpackStore)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    "8h6g": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "VIDEO_UPLOAD_EXTS", function() {
            return a
        }), n.d(t, "VIDEO_UPLOAD_MAX_FILE_SIZE_IN_GB", function() {
            return r
        }), n.d(t, "VIDEO_UPLOAD_CHUNK_SIZE", function() {
            return i
        });
        n("KKXr");
        var a = "avi mp4 3gp mpeg mov flv f4v wmv mkv webm vob rm rmvb m4v mpg ogv ts m2ts mts mxf".split(" "),
            r = 5,
            i = 4194304
    },
    "9AAn": function(e, t, n) {
        "use strict";
        var a = n("wmvG"),
            r = n("s5qY");
        e.exports = n("4LiD")("Map", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            get: function(e) {
                var t = a.getEntry(r(this, "Map"), e);
                return t && t.v
            },
            set: function(e, t) {
                return a.def(r(this, "Map"), 0 === e ? 0 : e, t)
            }
        }, a, !0)
    },
    As6E: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return d
        });
        n("91GP"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("clTp"),
            o = 80,
            l = 250,
            c = () => "undefined" != typeof window;
        class d extends a.Component {
            constructor(e) {
                super(e), this.onClick = () => {
                    if (!this.state.dropdown || this.state.dropdown.removed) {
                        var e = this.props,
                            t = e.text,
                            n = e.position,
                            a = e.align,
                            r = e.marginTop,
                            i = e.marginLeft,
                            o = Object(s.default)(this.el);
                        this.update({
                            text: t,
                            position: n,
                            align: a,
                            rect: o,
                            marginTop: r,
                            marginLeft: i
                        })
                    } else this.update()
                }, this.onMouseEnter = e => {
                    this.callerHovered = !0, this.timeouts.appear = setTimeout(() => {
                        if (this.el && this.callerHovered) {
                            var e = this.props,
                                t = e.position,
                                n = e.align,
                                a = e.marginTop,
                                r = e.marginLeft,
                                i = Object(s.default)(this.el);
                            this.update({
                                position: t,
                                align: n,
                                rect: i,
                                marginTop: a,
                                marginLeft: r
                            })
                        }
                    }, o)
                }, this.onMouseLeave = e => {
                    this.callerHovered = !1, this.timeouts.callerDisappear = setTimeout(() => {
                        this.callerHovered || this.hovered || this.update()
                    }, l)
                }, this.onDropdownMouseEnter = () => {
                    "hover" === this.props.trigger && (this.hovered = !0)
                }, this.onDropdownMouseLeave = e => {
                    "hover" === this.props.trigger && (this.hovered = !1, this.timeouts.disappear = setTimeout(() => {
                        this.callerHovered || this.hovered || this.update()
                    }, l))
                }, this.onDocumentClick = e => {
                    !this.state.dropdown || this.state.dropdown.removed || this.el.contains(e.target) || this.update()
                }, this.onResize = e => {
                    if (this.state.dropdown && !this.state.dropdown.removed) {
                        var t = this.props,
                            n = t.text,
                            a = t.position,
                            r = t.align,
                            i = t.marginTop,
                            o = t.marginLeft,
                            l = Object(s.default)(this.el);
                        this.update({
                            text: n,
                            position: a,
                            align: r,
                            rect: l,
                            marginTop: i,
                            marginLeft: o
                        })
                    }
                }, this.onTransitionEnd = e => {
                    "visibility" === e.propertyName && this.state.dropdown && this.state.dropdown.removed && this.setState({
                        dropdown: void 0
                    })
                }, this.onItemClick = (e, t) => {
                    t.separator || (this.update(), t.onClick(e))
                }, this.state = {}, this.timeouts = {}
            }
            componentDidMount() {
                this.el = r.findDOMNode(this), "click" === this.props.trigger ? (this.el.addEventListener("click", this.onClick), document.addEventListener("mousedown", this.onDocumentClick), window.addEventListener("resize", this.onResize)) : (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave))
            }
            componentWillUnmount() {
                Object.keys(this.timeouts).forEach(e => {
                    clearTimeout(this.timeouts[e])
                }), "click" === this.props.trigger ? (this.el.removeEventListener("click", this.onClick), document.removeEventListener("mousedown", this.onDocumentClick), window.removeEventListener("resize", this.onResize)) : (this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("mouseleave", this.onMouseLeave)), this.defaultNode && (this.defaultNode.parentNode.removeChild(this.defaultNode), delete this.defaultNode)
            }
            update(e) {
                if (!e) return this.setState({
                    dropdown: Object.assign({}, this.state.dropdown, {
                        removed: !0
                    })
                });
                var t = e.position,
                    n = e.align,
                    a = e.rect,
                    r = e.marginTop,
                    i = e.marginLeft,
                    s = a.left,
                    o = a.top;
                switch (t) {
                    case "t":
                        s += .5 * a.width;
                        break;
                    case "r":
                        s += a.width, o += .5 * a.height;
                        break;
                    case "b":
                        s += .5 * a.width, o += a.height;
                        break;
                    case "l":
                        o += .5 * a.height
                }
                s = Math.round(s + i), o = Math.round(o + r), this.setState({
                    dropdown: {
                        position: t,
                        align: n,
                        x: s,
                        y: o
                    }
                })
            }
            renderDropdown() {
                if (!this.state.dropdown) return null;
                var e = this.state.dropdown,
                    t = e.x,
                    n = e.y,
                    r = e.position,
                    s = e.align,
                    o = e.removed,
                    l = Object(i.classNames)("Dropdown", `Dropdown--${r}`, {
                        "Dropdown--removed": !!o,
                        [`Dropdown--align-${s}`]: "t" === r || "b" === r
                    }, this.props.className);
                return a.createElement("div", {
                    className: l,
                    style: {
                        top: n,
                        left: t
                    },
                    onTransitionEnd: e => this.onTransitionEnd(e),
                    onMouseEnter: this.onDropdownMouseEnter,
                    onMouseLeave: this.onDropdownMouseLeave
                }, a.createElement("ul", {
                    className: "Dropdown__in"
                }, this.props.data.map((e, t) => a.createElement("li", {
                    className: Object(i.classNames)("Dropdown__item", {
                        Dropdown__item_separator: e.separator
                    }),
                    onClick: t => this.onItemClick(t, e),
                    key: void 0 !== e.id ? e.id : t
                }, e.text))))
            }
            render() {
                var e = this.renderDropdown();
                return e ? (!this.defaultNode && c() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), a.createElement(a.Fragment, null, this.props.children, r.createPortal(e, this.defaultNode))) : this.props.children
            }
        }
        d.defaultProps = {
            position: "b",
            align: "center",
            marginTop: 0,
            marginLeft: 0,
            trigger: "click",
            className: ""
        }
    },
    "BN/X": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class o extends a.Component {
            render() {
                var e = this.props,
                    t = e.hovered,
                    n = e.className,
                    o = e.children,
                    l = s(e, ["hovered", "className", "children"]),
                    c = Object(r.classNames)("Link", {
                        "Link--hovered": !!t
                    }, n);
                return this.props.href ? a.createElement("a", i({}, l, {
                    className: c
                }), o) : a.createElement("span", i({}, l, {
                    className: c
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
        n.r(t), n.d(t, "post", function() {
            return s
        }), n.d(t, "plainget", function() {
            return o
        }), n.d(t, "plaingetCancelable", function() {
            return l
        });
        n("VRzm"), n("Btvt");
        var a = n("cGUQ"),
            r = window.ajax,
            i = 2;

        function s(e, t, n) {
            return t && (t.im_v = i), new Promise((a, i) => {
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

        function o(e, t) {
            return l(e, t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).request
        }

        function l(e, t) {
            var n, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return n = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise((r, s) => {
                    var o, l = Date.now(),
                        c = i.timeout || 60,
                        d = Object(a.toQueryString)(t);
                    if (window.XDomainRequest) n.open("get", `${e}?${d}`), n.ontimeout = function(e) {
                        s([e, {}])
                    }, n.onerror = function(e) {
                        s([e, {}])
                    }, n.onload = function() {
                        r([n.responseText, {}])
                    }, setTimeout(function() {
                        n.send()
                    }, 0);
                    else {
                        n.onreadystatechange = function() {
                            4 == n.readyState && (clearInterval(o), n.status >= 200 && n.status < 300 ? r([n.responseText, n]) : s([n.responseText, n]))
                        };
                        try {
                            n.open("GET", `${e}?${d}`, !0)
                        } catch (e) {
                            return s([e, n])
                        }
                        n.send()
                    }
                    o = setInterval(function() {
                        Date.now() - l > 1e3 * c && (window.browser.safari && n.abort(), s(["", {}]), clearInterval(o))
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
        n.r(t), n.d(t, "pause", function() {
            return a
        }), n.d(t, "retryFn", function() {
            return r
        }), n.d(t, "debouncedPromise", function() {
            return i
        }), n.d(t, "abortablePause", function() {
            return s
        }), n.d(t, "promisify", function() {
            return o
        });
        n("VRzm"), n("Btvt");

        function a(e, t) {
            return new Promise(n => {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function r(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = 0;
            return function i() {
                for (var s = arguments.length, o = new Array(s), l = 0; l < s; l++) o[l] = arguments[l];
                return Promise.resolve().then(() => e(...o)).catch(e => {
                    if (++r <= t) {
                        var s = "function" == typeof n ? n(r) : 0;
                        return 0 === s ? i(...o) : a(s).then(() => i(...o))
                    }
                    throw e
                })
            }
        }

        function i(e, t, n) {
            var a, r;
            return function() {
                for (var i = arguments.length, s = new Array(i), o = 0; o < i; o++) s[o] = arguments[o];
                return new Promise((e, i) => {
                    var o = n && !a;
                    clearTimeout(a), r && r.reject("debounce"), a = setTimeout(function() {
                        a = null, r = null, n || e(s)
                    }, t), o ? e(s) : n && i("debounce"), r = {
                        resolve: e,
                        reject: i
                    }
                }).then(t => e(...t))
            }
        }

        function s(e, t) {
            var n, a = new Promise(a => {
                n = a, setTimeout(a.bind(null, t), 1e3 * e)
            });
            return {
                pause: () => a,
                abort() {
                    n(t)
                }
            }
        }

        function o(e) {
            return function() {
                for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                return new Promise(t => e(...n, t))
            }
        }
    },
    ERyv: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isWeirdLogging", function() {
            return c
        }), n.d(t, "imWeirdLog", function() {
            return d
        }), n.d(t, "imWeirdCatch", function() {
            return u
        }), n.d(t, "startLoggingAllUnhandled", function() {
            return m
        }), n.d(t, "stopLoggingAllUnhandled", function() {
            return g
        });
        n("VRzm"), n("Btvt");
        var a, r = n("BxOC"),
            i = n("DM26"),
            s = 1;

        function o(e, t, n, r, i) {
            if ("Script error." !== e) {
                var s = i ? i.stack || i.message : null;
                d("unhandled_error", s ? {
                    err: e,
                    stack: s
                } : {
                    err: e
                })
            }
            a && a.apply(this, arguments)
        }

        function l(e) {
            e.preventDefault()
        }

        function c() {
            return !!window.imwl
        }

        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            c() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.retryFn)(r.post, 3, () => 2)("al_im.php", {
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
            a = window.onerror, window.onerror = o, window.addEventListener("unhandledrejection", l)
        }

        function g() {
            window.onerror = a, a = void 0, window.removeEventListener("unhandledrejection", l)
        }
    },
    EUzL: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createLongpollEventsQueue", function() {
            return r
        });
        n("rE2o"), n("ioFf"), n("rGqo");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function r(e, t, n) {
            var r = 0,
                i = e,
                s = [],
                o = !1;

            function l() {
                !s.length || r > 0 || o || (t(s), s = [])
            }
            return {
                pause() {
                    r++
                },
                resume() {
                    r > 0 && (r--, l())
                },
                onLp(e, t, r) {
                    o || (i >= e ? (i = t, s.push(...r), l()) : n && (o = !0, n(i).then(e => {
                        var t = a(e, 3),
                            n = (t[0], t[1]),
                            r = t[2];
                        i = n, o = !1, s.push(...r), l()
                    })))
                }
            }
        }
    },
    FABD: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return u
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR")),
            i = n("vRp6"),
            s = n("p+C8"),
            o = n("XpgC");

        function l() {
            return (l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function c(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        var d = 27;
        class u extends a.PureComponent {
            constructor(e) {
                super(e), this.onRemoveToken = e => {
                    var t = this.searchContainer.offsetHeight;
                    this.props.onRemoveToken(e.target.getAttribute("data-id")).then(() => {
                        this.updateScroll(t)
                    })
                }, this.onChange = e => {
                    var t = e.target.value;
                    t !== this.value && (this.value = t, this.props.onChange(e), this.scrollContainer.scrollTop = 0)
                }, this.onSelect = e => {
                    var t = this.searchContainer.offsetHeight;
                    this.props.onSelect(e.currentTarget.getAttribute("data-id")).then(() => {
                        this.updateScroll(t)
                    })
                }, this.onKeydown = e => {
                    e.keyCode === d && (this.input.value = "", this.input.blur(), this.props.onChange(e), e.stopPropagation())
                }, this.updateScroll = e => {
                    var t = this.searchContainer.offsetHeight;
                    this.input.focus(), this.searchContainer.scrollTop = this.searchContainer.scrollHeight, e !== t && (this.scrollContainer.scrollTop = this.scrollContainer.scrollTop + t - e)
                }, this.inputRef = e => {
                    this.input = e
                }, this.searchContainerRef = e => {
                    this.searchContainer = e
                }, this.scrollContainerRef = e => {
                    var t = e;
                    if (e && e.container)
                        for (t = e; t.container;) t = t.container;
                    this.scrollContainer = t
                }, this.value = e.value
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
                    g = e.useInfiniteScroll,
                    p = e.loadMore,
                    h = e.hasMore,
                    _ = e.virtualized,
                    f = e.notFoundText,
                    b = e.children,
                    v = e.emptyText,
                    y = e.isSearching,
                    O = c(e, ["className", "tokens", "onSelect", "onRemoveToken", "removeTokenPlaceholder", "value", "placeholder", "useInfiniteScroll", "loadMore", "hasMore", "virtualized", "notFoundText", "children", "emptyText", "isSearching"]),
                    E = g ? i.default : "div",
                    C = g ? {
                        loadMore: p,
                        hasMore: h,
                        virtualized: _,
                        useCapture: !1
                    } : {},
                    w = [].concat(b);
                return a.createElement("div", {
                    className: Object(r.classNames)("MultiSelect", t)
                }, a.createElement("div", {
                    className: "MultiSelect__search",
                    ref: this.searchContainerRef
                }, n.map((e, t) => a.createElement("span", {
                    className: "MultiSelect__token",
                    key: e.id
                }, a.createElement("span", {
                    className: "MultiSelect__tokenTitle"
                }, e.text), d ? a.createElement(o.default, {
                    text: d
                }, a.createElement("span", {
                    className: "MultiSelect__tokenRemove",
                    "data-id": e.id,
                    onClick: this.onRemoveToken
                })) : a.createElement("span", {
                    className: "MultiSelect__tokenRemove",
                    "data-id": e.id,
                    onClick: this.onRemoveToken
                }))), a.createElement("div", {
                    className: "MultiSelect__caret"
                }, a.createElement("div", {
                    className: "MultiSelect__caretIn"
                }, a.createElement("input", l({}, O, {
                    type: "text",
                    className: "MultiSelect__input",
                    placeholder: 0 === n.length ? m : "",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: u,
                    ref: this.inputRef
                }))))), 0 === w.length && (u || v) && !y && a.createElement("div", {
                    className: "MultiSelect__empty"
                }, a.createElement("div", {
                    className: "MultiSelect__emptyIn"
                }, u ? f : v)), a.createElement(E, l({
                    className: "MultiSelect__scroll",
                    ref: this.scrollContainerRef
                }, C), w.map(e => a.createElement(s.default, {
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
    Hx9h: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class o extends a.Component {
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.appearance,
                    o = e.wide,
                    l = e.overflow,
                    c = e.size,
                    d = s(e, ["className", "appearance", "wide", "overflow", "size"]),
                    u = Object(r.classNames)("Button", ...Array.isArray(n) ? n.map(e => `Button--${e}`) : [`Button--${n}`], `Button--size-${c}`, {
                        "Button--wide": !!o,
                        "Button--overflow": !!l,
                        "Button--disabled": !!e.disabled
                    }, t);
                return a.createElement("button", i({}, d, {
                    className: u
                }), e.children)
            }
        }
        o.defaultProps = {
            appearance: "primary",
            size: "m",
            wide: !1,
            disabled: !1
        }
    },
    KFTi: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return i
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i(e) {
            var t = Object(r.classNames)("Progress", {
                "Progress--inverted": e.inverted
            }, e.className);
            return a.createElement("div", {
                className: t
            }, a.createElement("div", {
                className: "Progress__item"
            }), a.createElement("div", {
                className: "Progress__item"
            }), a.createElement("div", {
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
        var a = n("vT4u"),
            r = n("P13b"),
            i = n("rHUl"),
            s = n("MhhX"),
            o = n("N1NS"),
            l = n("f01n");

        function c(e, t) {
            return {
                isAll: e => Object(a.isSearchAllLoaded)(e.get().peer, e.get()),
                loadMore: e => (function(e) {
                    return Object(a.isSearchAllLoaded)(e.get().peer, e.get()) ? Promise.resolve("") : Object(a.searchMessagesInplace)(e.get().peer, e.get())
                })(e),
                unmount() {
                    Object(o.destroyModule)(t)
                }
            }
        }

        function d(e) {
            return e.findIndex(e => "number" == typeof e.peerId && e.href) > -1
        }

        function u(e, t) {
            var n = function(e, t, n) {
                var i = intval(domData(n, "msgid"));
                if (!getSelectionText() && !Object(r.checkSelectClick)(t)) {
                    var s = intval(domData(n, "peer"));
                    return e.set(a.cancelSearch.bind(null, s)), e.get().longpoll.push([Object(l.changePeer)(s, i)]), !1
                }
            }.bind(null, t);
            return c(0, Object(o.createModule)({
                handlers: (t, a) => {
                    a(e, "click", "_im_mess", n)
                }
            }))
        }
        var m = n("h++7"),
            g = n("ERyv");

        function p(e, t) {
            if (!t) return ls.get(e);
            ls.set(e, t)
        }

        function h(e) {
            try {
                var t = {};
                return Error.captureStackTrace(t, e), t.stack
            } catch (e) {
                return ""
            }
        }
        var _ = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = debounce(p, 300),
                    a = extend({}, e),
                    r = [],
                    i = [];
                return t.store && (a = ls.get(t.key) || a), {
                    get: () => a,
                    set(e) {
                        var r = Object(g.isWeirdLogging)() ? h(this.set) : null;
                        return e(a).then(e => (a = e, t.store && n(t.key, e), this.emit(), this)).catch(e => Object(g.imWeirdCatch)("store_set_catch", e, {
                            stack: r
                        }))
                    },
                    setState(e) {
                        return this.set(t => (t = extend(t, e), this.emit(), Promise.resolve(t)))
                    },
                    stash() {
                        r.push(a), a = extend({}, e), this.emit()
                    },
                    reset() {
                        a = extend({}, e), this.emit()
                    },
                    unmount() {
                        a = {}, e = !1, i = []
                    },
                    pop() {
                        r.length > 0 && (a = r.pop(), this.emit())
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
                        e(a), t.store && n(t.key, a), this.emit()
                    }
                }
            },
            f = n("aong"),
            b = n("+/AQ");

        function v(e, t) {
            return Object(f.toArray)(e).find(e => domData(e, "list-id") === t)
        }

        function y(e, t) {
            return Object(f.toArray)(e).findIndex(e => domData(e, "list-id") === t)
        }

        function O(e, t, n, a) {
            if (n) {
                E(e, t, a);
                var r = domData(n, "list-id"),
                    i = r && v(t.children, r);
                i && a.forEach(e => addClass(i, e)), e.setState({
                    hoveredListItemId: r
                })
            }
        }

        function E(e, t, n) {
            var a = domQuery("." + n.join("."), t);
            a && Object(f.toArray)(a).forEach(e => {
                n.forEach(t => removeClass(e, t))
            }), e.setState({
                hoveredListItemId: null
            })
        }

        function C(e, t) {
            var n = t && domQuery("." + t.join("."), e)[0];
            return n ? domData(n, "list-id") : null
        }

        function w(e, t, n) {
            return e.map(t).reduce((e, t) => (e[t] = !0, e), n)
        }

        function j(e, t, n) {
            return {
                ids: w(n.get().elements, e, {}),
                scrolls: t,
                activated: !0
            }
        }

        function S(e) {
            var t = {};
            return e.forEach(e => {
                "r" === e[0] && t[`a,${e[1]}`] ? delete t[`a,${e[1]}`] : t[`${e[0]},${e[1]}`] = e
            }), Object.keys(t).map(e => t[e])
        }

        function k(e, t, n, a, r, i) {
            for (var s = 0; s < a; s++) e = domNS(e);
            var o = se(r(t));
            return domData(o, "list-id", n), e ? i.insertBefore(o, e) : i.appendChild(o), e
        }

        function T(e, t, n, a, r) {
            var i = a.get(),
                s = i.limit,
                o = i.offset,
                l = function(e, t) {
                    var n = t.get();
                    return !n._sortedEls && e && t.setState({
                        elements: n.elements.sort(e),
                        _sortedEls: !0
                    }), t.get().elements
                }(n().sortFn, a).slice(0, o + s),
                c = function(e, t) {
                    for (var n = [], a = Math.max(e.length, t.length), r = 0; r < a; r++) {
                        var i = e[r],
                            s = t[r];
                        !i && s ? n.push(["a", s, r]) : i && !s ? n.push(["r", i, r]) : i !== s && (n.push(["r", i, r]), n.push(["a", s, r]))
                    }
                    var o = S(n),
                        l = S(n.reverse());
                    return o.length > l.length ? l : o
                }(Object(f.toArray)(e.children).map(e => domData(e, "list-id")).filter(e => !!e), l.map(e => n().idFn(e).toString()));
            if (function(e, t, n, a) {
                    if (0 !== t.length) {
                        var r = (t = t.sort((e, t) => e[2] - t[2])).filter(e => "a" === e[0]);
                        if (t.filter(e => "r" === e[0]).map(t => e.children[t[2]]).forEach(e => re(e)), 0 !== r.length)
                            for (var i = r.shift(), s = i[2], o = (k(e.children[s], n[i[2]], i[1], 0, a, e), 0); o < r.length; o++) i = r[o], k(e.children[s], n[i[2]], i[1], i[2] - s, a, e), s = i[2]
                    }
                }(e, c, l, n().renderFn), function(e, t) {
                    e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
                }(a, t), r) return c.filter(e => "a" == e[0]).map(e => parseInt(e[1]))
        }

        function I(e, t, n, a) {
            var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
                s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                o = e.get(),
                l = t.getContainer().children,
                c = y(l, a || o.hoveredListItemId);
            c < 0 || (o.limit + o.offset < c ? e.setState({
                offset: c - o.limit + 1
            }).then(T.bind(null, t.getContainer(), t, n)) : Promise.resolve()).then(() => {
                var e = l[c],
                    n = t.scrollTop(),
                    a = t.getScrollHeight(),
                    o = e.offsetHeight;
                i = "center" === i ? -.5 * t.getScrollHeight() : i, s = "center" === s ? a / 2 : s;
                var d = r ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    u = n + i > e.offsetTop,
                    m = o + e.offsetTop > n + a - s;
                u ? d(e.offsetTop - i) : m && d(e.offsetTop - a + o + s)
            })
        }

        function M(e, t) {
            var n = e.get().pipeId;
            return !(void 0 !== n && void 0 !== t && n !== t)
        }

        function A(e, t, n, a, r, i) {
            return !!M(e, r) && e.setState(function(e, t, n) {
                var a = e.filter(e => !n.ids[t(e)]);
                return {
                    _sortedEls: !1,
                    els: a,
                    ids: w(a, t, n.ids),
                    elements: n.elements.concat(a)
                }
            }(i, a().idFn, e.get())).then(T.bind(null, t, n, a))
        }

        function L(e, t, n) {
            var a = function(e, t) {
                    if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
                    e.get().loading = !0;
                    for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) a[r - 2] = arguments[r];
                    return t(...a).then(() => {
                        e.get().loading = !1
                    })
                }.bind(null, t, function(e, t, n, a) {
                    var i = e.get(),
                        s = i.elements,
                        o = a.getContainer(),
                        l = e.setState({
                            offset: i.offset + i.limit
                        }).then(() => {
                            var n, r = i.offset,
                                l = i.limit;
                            return l + r > s.length ? n = t().more(r, l).then(t => !1 === t ? [] : (0 === t.length && e.setState({
                                stop: !0
                            }), t)).then(A.bind(null, e, o, a, t, i.pipeId)) : (n = Promise.resolve(), T(o, a, t, e)), n
                        });
                    if (!n) {
                        var c = s.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
                        Object(r.wrapLoading)(o)(l, "bottom", c)
                    }
                    return l
                }.bind(null, t, n)),
                i = (e, a) => {
                    (t.get().activated || e) && (void 0 !== a && t.get().elements.length > 0 && t.setState({
                        scrolled: a
                    }), n().onScroll && n().onScroll())
                },
                s = Object(b.createScroll)(e, {
                    noScroll: t.get().noScroll,
                    nativeScroll: t.get().nativeScroll,
                    scrollChange: i.bind(null, !1),
                    more: !!n().more && a.bind(null, !1)
                }),
                l = Object(o.createModule)({
                    handlers: (a, r) => {
                        r(e, "click", t.get().elCls, n().onClick)
                    }
                });
            return t.setState(j(n().idFn, {}, t)), {
                pipe: (e, a) => (t.setState({
                    pipeId: a
                }), e.then(A.bind(null, t, s.getContainer(), s, n, a))),
                replacePreserveOrder: e => t.set(function(e, t, n) {
                    var a = [];
                    n.elements = n.elements.map(n => {
                        var r = t(n),
                            i = e.filter(e => t(e) === r)[0];
                        return a.push(r), i || n
                    });
                    var r = e.filter(e => !inArray(t(e), a));
                    return n.elements = n.elements.concat(r), Promise.resolve(n)
                }.bind(null, e, n().idFn)).then(T.bind(null, s.getContainer(), s, n)),
                pipeReplace(e, a) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return t.setState({
                        pipeId: a,
                        stop: !1
                    }), e.then(e => {
                        if (M(t, a)) return t.setState({
                            elements: e,
                            _sortedEls: !1,
                            ids: w(e, n().idFn, {})
                        }).then(T.bind(null, s.getContainer(), s, n, t, r))
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
                        a = n[e];
                    return a && (t.setState({
                        scrolls: extend({}, n, {
                            [e]: null
                        })
                    }), s.scrollTop(a.scrolled)), !!a
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
                        a = s.scrollTop(),
                        r = a + ("up" === e ? -1 : 1) * n.clientHeight;
                    t ? s.smoothScroll(r - a) : s.scrollTop(r)
                },
                scrollToElement(e, a, r, i) {
                    I(t, s, n, e, a, r, i)
                },
                getScroller: () => s.getScroller(),
                checkMore: e => t.get().elements.length < t.get().limit ? a(e, s) : Promise.resolve([]),
                add: (e, a) => A(t, s.getContainer(), s, n, a, e),
                hoverNextElement(e, a) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = s.getContainer(),
                        o = i.children,
                        l = y(o, t.get().hoveredListItemId || C(i, a)),
                        c = Object(f.toArray)(o).slice(l + 1).find(n().hoverableFn);
                    O(t, i, c, e), I(t, s, n, null, !1, r.top, r.bottom)
                },
                hoverPrevElement(e, a) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = s.getContainer(),
                        o = i.children,
                        l = y(o, t.get().hoveredListItemId || C(i, a)),
                        c = l >= 0 && Object(f.toArray)(o).slice(0, l).reverse().find(n().hoverableFn);
                    O(t, i, c, e), I(t, s, n, null, !1, r.top, r.bottom)
                },
                hoverFirstElement(e, a) {
                    var r = s.getContainer(),
                        i = r.children,
                        o = Object(f.toArray)(i).findIndex(n().hoverableFn),
                        l = i[o];
                    !t.get().hoveredListItemId && l && (O(t, r, l, e), I(t, s, n, o, !1, a.top, a.bottom))
                },
                hoverElement(e, a, r) {
                    var i = s.getContainer(),
                        o = i.children,
                        l = y(o, e),
                        c = o[l];
                    c && (O(t, i, c, a), I(t, s, n, l, !1, r.top, r.bottom))
                },
                unhoverElements(e) {
                    E(t, s.getContainer(), e)
                },
                reset() {
                    var e = t.get().scrolls;
                    t.reset(), t.setState(j(n().idFn, e, t))
                },
                getHoveredElement: () => v(s.getContainer().children, t.get().hoveredListItemId),
                getCurrentElements: () => t.get().elements,
                isLoading: () => t.get().loading,
                isEmpty: () => 0 === t.get().elements.length,
                remove(e) {
                    t.set(function(e, t, n) {
                        return n.elements = n.elements.filter(n => t(n) !== e), delete n.ids[e], Promise.resolve(n)
                    }.bind(null, e, n().idFn)).then(T.bind(null, s.getContainer(), s, n))
                },
                unmount() {
                    Object(o.destroyModule)(l), s.destroy()
                }
            }
        }
        var P = n("1y80"),
            D = n("86+7"),
            x = n("lJdi");

        function N(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var R = 64,
            B = "_im_dialog_star",
            F = "_im_dialog_daction",
            H = ["_im_dialog_selected", "nim-dialog_selected"],
            U = ["_im_dialog_hovered", "nim-dialog_hovered"];

        function G(e) {
            return hasClass(e, "_im_search")
        }

        function q(e, t, n, s) {
            if (Object(i.isSearching)(e) && e.get().searchAllLoaded || Object(i.isRecentSearchesActive)(e)) return Promise.resolve([]);
            if (e.get().dialog_search_going || Object(r.isClassicInterface)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
            if (Object(i.isSearching)(e)) return Object(a.searchMessages)(Object(i.getSearchText)(e), e.get()).then(e => {
                var t = N(e, 2),
                    n = t[0];
                return ie(t[1], n)
            });
            var o = e.get().active_tab,
                l = e.get().dialog_tabs_all;
            return o !== m.FOLDER_MESSAGE_REQUEST && l[m.FOLDER_ALL] && !Object(r.isReversedDialogs)(e) || l[o] ? 0 === be(e).length ? Object(i.isMessageRequestFolder)(e) ? Promise.resolve([{
                type: "message_request_notice"
            }, {
                type: "empty_message_requests"
            }]) : Promise.resolve([{
                type: "empty_dialogs"
            }]) : Promise.resolve([]) : e.set(a.loadDialogs).then(t => {
                var n = be(e);
                return 0 === n.length ? Object(i.isMessageRequestFolder)(e) ? Promise.resolve([{
                    type: "message_request_notice"
                }, {
                    type: "empty_message_requests"
                }]) : [{
                    type: "empty_dialogs"
                }] : n
            })
        }

        function $(e, t, n, s, o) {
            if (!gpeByClass("_im_peer_target", s.target)) {
                var c = t.get(),
                    d = G(o),
                    u = parseInt(domData(o, "peer"), 10),
                    m = parseInt(domData(o, "msgid"), 10),
                    g = Object(i.getTab)(t, u),
                    p = "";
                if (Object(i.isSearching)(t) && (p = "conversations_search"), Object(i.isRecentSearchesActive)(t) && (p = "recent_searches"), hasClass(o, "_im_sugg_" + u) && (p = "popular_suggestions"), d && (p = "message_search"), checkEvent(s)) return window.open(function(e, t, n) {
                    var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        i = Object(r.getBaseLink)(e),
                        s = () => `${i}?sel=${Object(r.convertPeerToUrl)(t.peerId)}${a&&n?"&msgid="+n:""}`;
                    if (a) return s();
                    if (Object(r.isUserPeer)(t.peerId) || Object(r.isCommunityPeer)(t.peerId)) return Object(r.isClassicInterface)(e) ? s() : t.href;
                    return s()
                }(t, g, m, d));
                if (n.saveScroll("list"), d && c.msgid !== m) c.longpoll.push([l.changePeer(u, m, !1, !1, p)]);
                else if (u !== c.peer) {
                    c.longpoll.push([l.changePeer(u, !1, !0, !0, p)]);
                    var h = Object(i.isSearching)(t);
                    h && !hasClass(o, "_dont_add_recent") && Object(a.saveRecentSearchPeer)(u, cur.imDb), h && g && !Object(r.isClassicInterface)(t) && setTimeout(() => {
                        var e = g.message ? g.message.messageId : g.peerId;
                        n.scrollToElement(e.toString(), !0, 0, "center")
                    }, 100)
                } else u === c.peer && e().goToHistoryEnd();
                cancelEvent(s)
            }
        }

        function z(e, t, n, a) {
            var i;
            return !Object(r.isChatPeer)(t) || "string" == typeof n.photo && "" !== n.photo ? (i = `<img src="${n.photo}" alt="">`, a && (i = getTemplate("im_dialogs_link_img", {
                href: n.href,
                photo: i
            }))) : i = Object(r.renderPhotosFromTab)(e, n, !a), {
                photo: i,
                userLink: `<span class="_im_dialog_link">${n.tab}</span>`
            }
        }

        function K(e, t, n, a) {
            return n ? "" : a ? getTemplate("im_img_prebody", {
                photo: t
            }) : e + ":"
        }

        function V(e, t, n) {
            return !!(n & l.FLAG_OUTBOUND) && (!Object(r.isSelfMessage)(t.peerId, e.get().gid) && (!(Object(r.isChatPeer)(t.peerId) && t.data && t.data.closed) && (!t.unread && !(t.lastmsg <= t.out_up_to))))
        }

        function W(e) {
            var t = Z(e);
            return (e.unread > 0 ? e.unread : "") > 0 && t
        }

        function Y(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                s = z(e, t.peerId, t, Object(r.isClassicInterface)(e)),
                o = s.photo,
                c = s.userLink,
                d = n || Z(t);
            if (!d) return function(e, t, n, a) {
                var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                    o = [];
                return Object(r.isClassicInterface)(a) && o.push("nim-dialog_classic"), Object(i.isRecentSearchesActive)(a) && o.push("nim-dialog_recent"), o.push("nim-dialog_empty"), s.search && o.push("_im_search"), getTemplate("im_drow", {
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
                    is_selected: e.peerId == a.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
                })
            }(t, o, c, e, a);
            var u = d.flags,
                m = Object(r.isFvkcomgroup)(e, t.peerId),
                g = J(t, e, n),
                p = [];
            a.search && p.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && p.push("nim-dialog_muted"), t.verified && p.push("nim-dialog_verified"), Object(i.isRecentSearchesActive)(e) && p.push("nim-dialog_recent"), -1 === d.messageId && p.push("nim-dialog_empty"), Object(r.isClassicInterface)(e) && p.push("nim-dialog_classic"), t.folders & l.FOLDER_IMPORTANT && p.push("nim-dialog_starred"), !a.search && Object(r.isUnrespond)(e, t.peerId, t) && p.push("nim-dialog_unrespond"), m && e.get().gid && p.push("nim-dialog_deny-remove");
            var h = e.get().timeshift,
                _ = V(e, t, u) ? "nim-dialog_unread-out" : "",
                f = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
            return getTemplate("im_drow", {
                peer: t.peerId,
                msg_id: d.messageId,
                photo: o,
                user_link: c,
                date: d.date ? getShortDateOrTime(d.date, h, !0, getLang("months_sm_of", "raw")) : "",
                body: g,
                unread_message_string: f,
                tab_name: stripHTML(t.tab),
                unread: Object(r.simplifyCounter)(t.unread),
                more: p.join(" "),
                is_online: onlinePlatformClass(t.online),
                is_unread: W(t) ? "nim-dialog_unread" : "",
                is_unread_out: _,
                is_selected: a.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
            })
        }

        function Q(e, t, n, a, s) {
            if (!t.deletedDialog)
                if (hasClass(e, "nim-conversation-search-row")) X(e, t, n);
                else {
                    var o = Z(t),
                        c = o.flags,
                        d = J(t, n),
                        u = z(n, t.peerId, t, Object(r.isClassicInterface)(n)).photo,
                        m = n.get().timeshift,
                        g = o.date ? getShortDateOrTime(o.date, m, !0, getLang("months_sm_of", "raw")) : "";
                    ue(e, t), val(geByClass1("_dialog_body", e), d), val(geByClass1("_im_dialog_date", e), g), val(geByClass1("_im_dialog_unread_ct", e), Object(r.simplifyCounter)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
                    var p = geByClass1("_im_dialog_photo", e);
                    p.innerHTML !== u && val(p, u), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & l.FOLDER_IMPORTANT), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", Object(r.isUnrespond)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", Object(r.isClassicInterface)(n)), toggleClass(e, "nim-dialog_unread", W(t)), toggleClass(e, "nim-dialog_deny-remove", n.get().gid > 0 && Object(r.isFvkcomgroup)(n, t.peerId)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", Object(i.isRecentSearchesActive)(n)), toggleClass(e, "nim-dialog_empty", -1 === o.messageId), V(n, t, c) && addClass(e, "nim-dialog_unread-out"), s && setTimeout(function() {
                        addClass(geByClass1("_im_dialog_" + t.peerId, a), "nim-dialog_injected")
                    }, 100)
                }
        }

        function X(e, t, n) {
            ue(e, t), toggleClass(e, "nim-dialog_recent", Object(i.isRecentSearchesActive)(n)), val(geByClass1("_im_dialog_unread_ct", e), Object(r.simplifyCounter)(t.unread));
            var a = z(n, t.peerId, t, Object(r.isClassicInterface)(n)).photo,
                s = geByClass1("_im_dialog_photo", e);
            s.innerHTML !== a && val(s, a), toggleOnline(geByClass1("_im_peer_online", e), t.online), W(t) && addClass(e, "nim-dialog_unread")
        }

        function J(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || Z(e);
            if (Object(r.isPeerBlocked)(e.peerId, t)) {
                var a = t.get().block_states[e.peerId].name,
                    o = getLang("mail_community_answering").replace("{username}", a);
                return getTemplate("im_drow_prebody", {
                    prebody: o,
                    body: ""
                })
            }
            return Object(s.isServiceMsg)(n) ? Object(r.renderServiceMsg)(t, n, e, !1) : function(e, t, n, a, s, o, c, d, u, m) {
                var g = "",
                    p = Object(i.isChannel)(e, Object(i.getTab)(e, n));
                return t & l.FLAG_OUTBOUND ? g = K(getLang("mail_by_you"), m, p, u) : Object(r.isChatPeer)(n) && 0 !== a && (g = K(Object(D.oCacheGet)(e, a).first_name, Object(D.oCacheGet)(e, a).photo, p, u)), c = Object(r.renderShortText)(n, d, c, s, o), g ? getTemplate("im_drow_prebody", {
                    prebody: g,
                    body: c
                }) : c
            }(t, n.flags, e.peerId, n.userId, !0, n.attaches, n.text, n.subject, Object(r.isClassicInterface)(t), Object(D.oCacheGet)(t, t.get().id).photo)
        }

        function Z(e) {
            var t = e.lastmsg_meta;
            return isArray(t) && (t = Object(l.addMessageEvent)([4].concat(t))), t || Object(l.addMessageEvent)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
        }

        function ee(e, t, n) {
            var i = Object(r.showLeaveDialog)(e, t, s => {
                n().updateMenu(e), s && Object(r.cleanHistory)(e, i, n, a.flushHistory, t), Object(r.isChatPeer)(t) && e.set(a.leaveChat.bind(null, t)), i.hide()
            })
        }

        function te(e, t, n, i, s, o) {
            var l = gpeByClass("_im_dialog", o, n);
            if (cancelEvent(s), !l) return !1;
            var c = intval(domData(l, "peer")),
                d = t.get(),
                u = Object(r.isCommunityPeer)(c) || Object(r.isUserPeer)(c);
            if (d.recentSearch) {
                var m = Object(a.removeFromRecentSearch)(c, cur.imDb);
                re(l), 0 === m.length && _e(t, i, e)
            } else Object(r.isClassicInterface)(t) && u ? Object(a.deleteDialog)(c, d).then(n => {
                var a = N(n, 2),
                    r = a[0],
                    i = a[1];
                r ? (! function(e, t, n, a, r) {
                    var i = geByClass1("_dialog_body", t);
                    addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
                        text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
                        peer: e,
                        spam_id: a
                    }))
                }(c, l, r, i), e().updateMenu(t)) : ee(t, c, e)
            }) : ee(t, c, e);
            return !1
        }

        function ne(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                a = z(e, t.peerId, t, Object(r.isClassicInterface)(e)),
                s = a.photo,
                o = a.userLink,
                l = function(e) {
                    return !Object(r.isPendingForward)(e)
                }(e),
                c = "" === n ? [] : [n];
            return Object(i.isRecentSearchesActive)(e) && c.push("nim-dialog_recent"), Object(r.isClassicInterface)(e) && c.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && c.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
                peer: t.peerId,
                msg_id: t.lastmsg || "",
                photo: s,
                user_link: o,
                unread: Object(r.simplifyCounter)(t.unread),
                tab_name: stripHTML(t.tab),
                is_unread: W(t) ? "nim-dialog_unread" : "",
                is_online: onlinePlatformClass(t.online),
                is_selected: t.peerId == e.get().peer && l ? "nim-dialog_selected _im_dialog_selected" : "",
                more: c.join(" ")
            })
        }

        function ae(e, t) {
            var n = e.get().isIncomingMessageRequestsAllowed;
            switch (t.type) {
                case "sep_btn_search_msg":
                    return Object(r.renderBtnSearchOnlyMessages)(e);
                case "sep_messages":
                    return Object(r.renderMessagesSep)();
                case "sep_conversations":
                    return Object(r.renderConversationsSep)();
                case "sep_popular":
                    return Object(r.renderPopularSuggSep)();
                case "popular_sugg":
                    return Object(r.renderPopularSuggestions)(e);
                case "clear_recent":
                    return Object(r.renderClearRecent)();
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
                    return t.message ? Y(e, t, t.message, {
                        noselect: !0,
                        search: !0
                    }) : t.local_index || Object(i.isSearching)(e) ? ne(e, t) : Y(e, t)
            }
        }

        function ie(e, t) {
            return e.map(e => Object(l.addMessageEvent)([4].concat(e))).map(e => extend({}, t[e.peerId], {
                message: e
            }))
        }

        function oe(e) {
            return {
                type: "empty",
                lang: e
            }
        }

        function le(e, t) {
            var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
            return void 0 !== n ? 2e9 + n : t.lastmsg
        }

        function de(e, t, n, a) {
            showTooltip(a, {
                text: function() {
                    var n = gpeByClass("_im_dialog", a, t),
                        r = domData(n, "peer");
                    return e.get().tabs[r].folders & l.FOLDER_IMPORTANT ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                },
                black: 1,
                zIndex: 1,
                shift: [14, 8],
                toup: ve(e, a.getBoundingClientRect().top)
            })
        }

        function ue(e, t) {
            var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
                a = geByClass1("_im_unread_blind_label", e);
            val(a, n)
        }

        function me(e) {
            var t = Object(i.isSearching)(e),
                n = e.get().searchOnlyMessages;
            return Object(r.isClassicInterface)(e) ? {
                top: t && !n ? 96 : 60,
                bottom: Object(r.isCommunityInterface)(e) ? 42 : 87
            } : {
                top: t && !n ? 36 : 0,
                bottom: 0
            }
        }

        function pe(e, t) {
            e.hoverFirstElement(U, me(t))
        }

        function he(e) {
            e.unhoverElements(U)
        }

        function _e(e, t, n) {
            if (Object(i.doPopularSuggExist)(e)) {
                t.pipeReplace(Promise.resolve([{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }])), t.toTop()
            } else n().cancelSearch(e), cancelStackFilter("im_search")
        }

        function fe(e, t, n, a, s) {
            return {
                selectPeer(t, n) {
                    for (var a = geByClass("_im_dialog", e), r = n.get().peer, i = 0; i < a.length; i++) {
                        var s = a[i],
                            o = intval(domData(s, "peer")),
                            l = intval(domData(s, "msgid"));
                        o === r && (!G(s) || t === l && G(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                    }
                },
                appendFastDialogs(t, a, s) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), s ? (n.reset(), Object(r.isPendingForward)(t) || Object(i.isRecentSearchesActive)(t) || !d(a) ? Object(i.isRecentSearchesActive)(t) && (d(a) && (a = [{
                        type: "clear_recent"
                    }].concat(a)), Object(i.doPopularSuggExist)(t) && (a = [{
                        type: "sep_popular"
                    }, {
                        type: "popular_sugg"
                    }].concat(a))) : a = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(a), t.setState({
                        searchOnlyMessages: !1
                    }), n.pipeReplace(Promise.resolve(a)).then(() => pe(n, t))) : n.pipe(Promise.resolve(a)), Object(r.isClassicInterface)(t) && !Object(r.isReservedPeer)(t.get().peer) || n.toTop()
                },
                deactivate() {
                    n.deactivate()
                },
                activate() {
                    n.activate()
                },
                hoverFirstDialog(e) {
                    pe(n, e)
                },
                hoverNextDialog(e) {
                    n.hoverNextElement(U, H, me(e))
                },
                hoverPrevDialog(e) {
                    n.hoverPrevElement(U, H, me(e))
                },
                unhoverDialogs: he.bind(n),
                selectHoveredDialog(t) {
                    var r = geByClass1("_im_dialog_hovered", e);
                    r || (r = geByClass1("_im_dialog", e)), r && $(a, t, n, {}, r)
                },
                appendSearch(t, a, r) {
                    var i = ie(r, a);
                    r.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                        type: "sep_messages"
                    }].concat(i))).then(() => pe(n, t))) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([oe()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
                },
                update(e) {
                    n.pipeReplace(Promise.resolve(be(e)))
                },
                updateDialog(t, n) {
                    var a = geByClass1("_im_dialog_" + t);
                    a && !G(a) && Q(a, n.get().tabs[t], n, e)
                },
                focusOnSelected(e) {
                    var t = e.get().peer;
                    if (t) {
                        var a = geByClass1(`_im_dialog_${t}`);
                        a ? n.scrollTop(a.offsetTop - a.offsetHeight) : n.toTop()
                    }
                },
                restoreScroll(e) {
                    n.restoreScroll("list") || n.toTop()
                },
                forceScrollReinit() {
                    var e = n.getScroller();
                    e && (e.style.overflowY = "hidden", setTimeout(() => e.style.overflowY = "", 0))
                },
                restoreDialogs(t, i, s) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                        searchOnlyMessages: !1
                    }), 0 !== be(t).length || n.isLoading() || (i = !0), i && n.reset(), s && n.wipe(), n.pipeReplace(Promise.resolve(be(t))).then(e => {
                        if (i && (!Object(r.isClassicInterface)(t) || !t.get().peer)) {
                            var s = function(e, t, n) {
                                return Object(r.isClassicInterface)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!Object(r.isClassicInterface)(n)).then(() => {
                                    Object(r.isClassicInterface)(n) || t().toggleSettingsLoader(n, !1)
                                })
                            }(n, a, t);
                            return n.toTop(), s
                        }
                    }).then(() => he(n))
                },
                appendDialogs(t, a) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), a.forEach(n => {
                        var a = geByClass1("_im_dialog_" + n.peerId, e);
                        a && X(a, n, t)
                    }), Object(r.isPendingForward)(t) || Object(i.isRecentSearchesActive)(t) || !d(a) || (a = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(a)), t.setState({
                        searchOnlyMessages: !1
                    }), n.isEmpty() && 0 === a.length && Object(r.isPendingForward)(t) && (a = [oe(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(a)
                },
                updateCounter(t, n) {
                    var a = geByClass1("_im_dialog_" + n, e),
                        s = Object(i.getTab)(t, n);
                    if (a && !G(a) && (ue(a, s), val(geByClass1("_im_dialog_unread_ct", a), Object(r.simplifyCounter)(s.unread)), toggleClass(a, "nim-dialog_unread", s.unread > 0), toggleClass(a, "nim-dialog_unread-out", V(t, s, Z(s).flags))), Object(i.isRecentSearchesActive)(t)) {
                        var o = geByClass1("_im_sugg_" + n);
                        o && (val(geByClass1("_sugg_unread_ct", o), Object(r.simplifyCounter)(s.unread)), toggleClass(o, "sugg-is_unread", s.unread > 0))
                    }
                },
                removeDialog(e, t) {
                    n.remove(t)
                },
                updateOnline(t, n) {
                    var a = geByClass1("_im_dialog_" + t, e);
                    if (a) {
                        var r = n.get().tabs[t],
                            i = geByClass1("_im_peer_online", a);
                        toggleOnline(i, r.online)
                    }
                },
                setDialogFailed(t, n, a) {
                    var r = geByClass1("_im_dialog_" + t, e);
                    r && (a.get().tabs[t].lastmsg === n && (addClass(r, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", r), "!")))
                },
                scrollUp(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    n.toTop(e, t), n.saveScroll("list", !0)
                },
                saveScroll(e) {
                    n.saveScroll("list", !0)
                },
                promoteDialog(a, r) {
                    var s = geByClass1("_im_dialog_" + r, e);
                    s && !G(s) || !Object(i.isSearching)(a) ? (n.pipeReplace(Promise.resolve(be(a)), void 0, !0).then(t => {
                        !inArray(r, t) && s && Q(s, Object(i.getTab)(a, r), a, e)
                    }), t().updateTyping(r, a)) : n.unsetScroll("list")
                },
                removeSelection(t) {
                    var a = t.get().peer.toString(),
                        i = `._im_dialog_${a}.${H.join(".")}`,
                        s = domQuery(i, e)[0];
                    H.forEach(e => removeClass(s, e)), Object(r.isClassicInterface)(t) || n.hoverElement(a, U, me(t))
                },
                updateScroll() {
                    n.updateScroll()
                },
                updateTyping(t, n) {
                    var a = geByClass1(`_im_dialog_${t}`, e);
                    if (a && !G(a) && !n.get().tabs[t].deletedDialog) {
                        var s = geByClass1("_im_dialog_typing", a),
                            o = !Object(r.isClassicInterface)(n),
                            l = Object(r.formatTyper)(Object(i.getTab)(n, t).activity, t, !Object(r.isChatPeer)(t), n.get(), 1, o);
                        val(s, l), toggleClass(a, "nim-dialog_typing", l)
                    }
                },
                unmount() {
                    n.unmount(), Object(o.destroyModule)(s)
                }
            }
        }

        function be(e) {
            var t = e.get(),
                n = t.active_tab,
                a = t.dialog_tabs[n],
                i = t.tabs,
                s = a.map(e => i["" + e]).sort(function(e, t, n) {
                    var a;
                    return t.message && n.message ? (a = n.message.messageId - t.message.messageId, a = Object(r.isReversedDialogs)(e) ? -a : a) : t.message && !n.message ? a = 1 : n.message && !t.message ? a = -1 : (a = le(e, n) - le(e, t), a = Object(r.isReversedDialogs)(e) ? -a : a), a
                }.bind(null, e));
            if (t.isIncomingMessageRequestsAllowed) {
                var o = t.dialog_tab_cts.mr;
                if (n === m.FOLDER_MESSAGE_REQUEST && s.unshift({
                        type: "message_request_notice"
                    }), !Object(r.isClassicInterface)(e)) switch (n) {
                    case m.FOLDER_ALL:
                        o > 0 && s.unshift({
                            type: "message_request_button_go"
                        });
                        break;
                    case m.FOLDER_MESSAGE_REQUEST:
                        s.unshift({
                            type: "message_request_button_return"
                        })
                }
            }
            return s
        }

        function ve(e, t) {
            return t > (e.get().gid ? 220 : 150) || Object(i.isSearching)(e)
        }

        function ye(e, t, n) {
            var s = Object(o.createMutations)(fe),
                l = s.callMutations,
                c = s.bindMutations,
                d = function(e, n) {
                    showTooltip(n, {
                        text: () => {
                            if (Object(i.isRecentSearchesActive)(t)) return getLang("mail_hide_from_recent");
                            var e = Number(n.getAttribute("data-peer")),
                                a = Object(i.getTab)(t, e);
                            return Object(r.isChatPeer)(e) ? Object(x.doesChatTabHaveFlag)(Object(i.getTab)(t, e), 1024) ? getLang("mail_unfollow_channel") : a.data.closed || a.data.kicked ? getLang("mail_delete") : getLang("mail_leave_chat") : getLang("mail_delete")
                        },
                        black: 1,
                        [Object(r.isClassicInterface)(t) ? "center" : "needLeft"]: !0,
                        shift: Object(r.isClassicInterface)(t) ? [-4, 10] : [0, 10],
                        toup: ve(t, n.getBoundingClientRect().top),
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
                        toup: ve(t, n.getBoundingClientRect().top)
                    })
                },
                m = de.bind(null, t, e),
                g = function(e, t, n, r) {
                    var i = gpeByClass("_im_dialog", r, t),
                        s = intval(domData(i, "peer"));
                    return e.set(a.toggleDialogImportant.bind(null, s)), setTimeout(function() {
                        de(e, t, n, r)
                    }, 100), cancelEvent(n), !1
                }.bind(null, t, e),
                p = function(e, t, n, r, s) {
                    var o = gpeByClass("_im_dialog", s, t),
                        l = intval(domData(o, "peer")),
                        c = e.get().tabs[l].lastmsg;
                    return e.set(a.markDialogAnswered.bind(null, l, c)).then(() => {
                        Q(o, e.get().tabs[l], e, t), Object(i.isRecentSearchesActive)(e) || n().restoreDialogs(e)
                    }), showDoneBox(getLang("mail_marked_as_answered"), {
                        out: 1e3
                    }), cancelEvent(r), !1
                }.bind(null, t, e, l),
                h = geByClass1("_im_dialogs_search"),
                f = {
                    idFn: e => (function(e, t) {
                        return t.message ? t.message.messageId : Object(i.isSearching)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
                    })(t, e),
                    hoverableFn: e => hasClass(e, "_im_dialog"),
                    renderFn: ae.bind(null, t),
                    more: q.bind(null, t, l),
                    onScroll: !!Object(r.isClassicInterface)(t) && (() => {
                        (bodyNode.scrollTop || document.documentElement.scrollTop) <= 0 && !layers.visible && browser.safari ? addClass(h, "im-page--header_static") : removeClass(h, "im-page--header_static")
                    })
                },
                b = L(e, _({
                    limit: 40,
                    offset: 0,
                    nativeScroll: !!Object(r.isClassicInterface)(t),
                    height: R,
                    elements: be(t)
                }), () => f),
                v = $.bind(null, n, t, b),
                y = function(e, t, n) {
                    removeClass(t.parentNode, "im-page--dialogs_with-mess");
                    var a = n.getCurrentElements().filter(e => e.message);
                    n.toTop(), n.reset(), Object(P.statlogsProbValueEvent)(.01, "im_search_stat", 1, "search_messages_only"), a.length > 0 ? (a = [{
                        type: "sep_messages"
                    }].concat(a), e.setState({
                        searchOnlyMessages: !0
                    })) : a = [oe()], n.pipeReplace(Promise.resolve(a))
                }.bind(null, t, e, b),
                O = function(e, t, n, i, s, o) {
                    var l = intval(domData(o, "peer")),
                        c = domData(o, "action"),
                        d = domData(o, "sid"),
                        u = geByClass1("_im_dialog_" + l, t),
                        m = intval(domData(o, "spam"));
                    switch (c) {
                        case "restore":
                            u && e.set(a.restoreDialog.bind(null, l, d, m)).then(() => {
                                addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), Q(u, e.get().tabs[l], e, t, !1), i().updateMenu(e)
                            });
                            break;
                        case "spam":
                            var g = `${getLang("mail_im_dialog_marked_spam")}\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="${d}" data-peer="${l}">\n            ${getLang("mail_restore")}\n        </button>`;
                            if (u) {
                                var p = geByClass1("_dialog_body", u);
                                val(p, g), Object(a.spamDialog)(l, d, e.get())
                            }
                            break;
                        case "block":
                            (Object(r.isCommunityInterface)(e) ? Object(r.showBlacklistBox)(l, e) : Object(r.showBlacklistBoxUser)(l, e)).once("success", function() {
                                e.set(a.flushHistory.bind(null, l)).then(() => {
                                    n().restoreDialogs(e)
                                })
                            })
                    }
                    cancelEvent(s)
                }.bind(null, t, e, l, n),
                E = te.bind(null, n, t, e, b),
                C = function(e, t) {
                    Object(r.toggleMessageRequestsTab)(e, t, a.changeDialogsTab)
                }.bind(null, t, n),
                w = Object(o.createModule)({
                    handlers: (i, s) => {
                        s(e, "click", "_im_dialog_close", E), s(e, "click", "_im_dialog_markre", p), s(e, "click", B, g), s(e, "click", "_im_dialog", v), s(e, "click", r.MESSAGE_SEARCH_CLASS, y), s(e, "mouseover", "_im_dialog_close", d), s(e, "mouseover", "_im_dialog_markre", u), s(e, "click", r.CLEAR_RECENT_CLASS, () => {
                            Object(a.resetRecentSearch)(cur.imDb), _e(t, b, n)
                        }), s(e, "click", r.TOGGLE_MR_TAB, C), s(e, "mouseover", B, m), s(e, "click", F, O), i(e, "mouseover", throttle(b.unhoverElements.bind(b, U), 100))
                    }
                });
            return c(e, l, b, n, w)
        }
        var Oe = n("O8ze"),
            Ee = n("QOPk"),
            Ce = n("Wu9C"),
            we = n("q1tI"),
            je = n("i8i4"),
            Se = n("T/g7"),
            ke = (n("17x9"), n("pemR"));

        function Te(e) {
            return we.createElement("header", {
                className: Object(ke.classNames)("PopupHeader", e.className),
                style: e.style
            }, e.back && we.createElement("div", {
                className: "PopupHeader__back",
                onClick: e.onBackClick
            }, we.createElement("button", {
                className: "PopupHeader__backBtn",
                onClick: e.onBackClick
            }, e.back)), we.createElement("h2", {
                className: "PopupHeader__title"
            }, e.title), we.createElement("div", {
                className: "PopupHeader__close"
            }, we.createElement("button", {
                className: "PopupHeader__closeBtn",
                onClick: e.onCloseClick
            })))
        }
        Te.defaultProps = {
            back: null,
            title: "",
            onCloseClick: () => {}
        };
        var Ie = n("Hx9h"),
            Me = n("XpgC"),
            Ae = n("WDXI"),
            Le = window.unclean,
            Pe = Se.default.getLang;
        class De extends we.PureComponent {
            constructor(e) {
                super(e), this.onSaveTitle = e => {
                    var t = this.props.store,
                        n = t.get(),
                        r = e.value.trim().replace("\n", "");
                    r && r !== Le(this.props.title) && (this.setState({
                        titleChanged: !1
                    }), t.set(a.updateChatTopic.bind(null, n.peer, r)))
                }, this.onChangeTitle = e => {
                    if (this.state.title !== e.target.value) {
                        var t = e.target.value.replace("\n", "");
                        this.setState({
                            title: t,
                            titleChanged: Le(this.props.title) !== t
                        })
                    }
                }, this.onValidateTitle = e => !!e.trim().replace("\n", ""), this.onCancelTitle = () => {
                    this.setState({
                        title: Le(this.props.title),
                        titleChanged: !1
                    })
                }, this.onSaveDescription = e => {}, this.onPhotoUpload = () => {
                    var e = this.props.store,
                        t = e.get().peer;
                    Object(x.canChangeTitle)(e) && (cur.recieveCropResult = void 0, Page.ownerPhoto(t, {
                        gid: e.get().gid
                    }))
                }, this.onPhotoRemove = () => {
                    var e = this.props.store,
                        t = e.get().peer;
                    Object(x.canChangeTitle)(e) && e.set(a.removeChatPhoto.bind(null, t)).then(() => e.set(a.getChatDetails.bind(null, t))).catch(e => Object(g.imWeirdCatch)("onPhotoRemove", e))
                }, this.state = {
                    title: Le(e.title),
                    titleChanged: !1
                }
            }
            render() {
                var e = this.props,
                    t = e.store,
                    n = e.photo,
                    a = e.title,
                    r = e.description,
                    i = e.grid,
                    s = e.meta,
                    o = Le(a),
                    l = Object(x.canChangeTitle)(t),
                    c = Object(ke.classNames)("ChatSettingsInfo", {
                        "ChatSettingsInfo--editable": l
                    }),
                    d = Object(ke.classNames)("ChatSettingsInfo__title", {
                        "ChatSettingsInfo__title-service": 64 & this.props.flags
                    });
                return we.createElement("div", {
                    className: c
                }, we.createElement("header", {
                    className: "ChatSettingsInfo__header"
                }, we.createElement("div", {
                    className: "ChatSettingsInfo__photo"
                }, we.createElement("div", {
                    className: "ChatSettingsInfo__attach nim-peer nim-peer_larger",
                    "data-tip": Pe("mail_settings_photo"),
                    onClick: this.onPhotoUpload
                }, n ? we.createElement("img", {
                    src: n,
                    width: "80",
                    height: "80",
                    alt: o,
                    className: "ChatSettingsInfo__photoSelf"
                }) : we.createElement("div", {
                    className: "nim-peer--photo-w"
                }, we.createElement("div", {
                    className: "ChatSettingsInfo__photoGrid nim-peer--photo",
                    dangerouslySetInnerHTML: {
                        __html: i
                    }
                }))), n && l && we.createElement(Me.default, {
                    text: Pe("mail_settings_remove_photo"),
                    position: "t",
                    align: "left"
                }, we.createElement("button", {
                    onClick: this.onPhotoRemove,
                    className: "ChatSettingsInfo__photoRemove"
                }))), we.createElement("h3", {
                    className: d
                }, l ? we.createElement(Ae.default, {
                    value: this.state.title,
                    changed: this.state.titleChanged,
                    useEnter: !0,
                    onSave: this.onSaveTitle,
                    onChange: this.onChangeTitle,
                    onCancel: this.onCancelTitle,
                    validate: this.onValidateTitle
                }) : o), we.createElement("div", {
                    className: "ChatSettingsInfo__meta"
                }, s)), r && we.createElement("div", {
                    className: "ChatSettingsInfo__description"
                }, l ? we.createElement(Ae.default, {
                    value: r,
                    onSave: this.onSaveDescription
                }) : r))
            }
        }
        n("KKXr");
        var xe = n("dLHM"),
            Ne = n("XTb9"),
            Re = n("BN/X"),
            Be = window.elfocus,
            Fe = Se.default.getLang;
        class He extends we.Component {
            constructor(e) {
                super(e), this.onCopy = () => {
                    this.input && (Be(this.input, 0, this.input.value.length), document.execCommand("copy"), this.setState({
                        copied: !0
                    }))
                }, this.onBlinkTextHide = () => {
                    this.setState({
                        copied: !1
                    })
                }, this.getInputRef = e => {
                    e && e.element && (this.input = e.element)
                }, this.state = {
                    copied: !1
                }
            }
            componentDidMount() {
                this.input && Be(this.input, 0, this.input.value.length)
            }
            render() {
                var e = this.props,
                    t = e.onReset,
                    n = e.invitationLink,
                    a = e.store,
                    i = Fe("mail_invite_link_reset_explainer").split("{reset_link}"),
                    s = !Object(r.isFvkcomgroup)(a, a.get().peer);
                return we.createElement("div", {
                    className: "ChatSettingsInvitationLink"
                }, this.props.reseted && we.createElement("div", {
                    className: "ChatSettingsInvitationLink__reseted"
                }, Fe("mail_invite_link_reseted_explainer")), we.createElement("p", null, Fe("mail_invite_link_explainer")), we.createElement("div", {
                    className: "ChatSettingsInvitationLink__main"
                }, we.createElement(xe.default, {
                    ref: this.getInputRef,
                    readOnly: "readonly",
                    className: "ChatSettingsInvitationLink__input",
                    value: n
                }), we.createElement(Ie.default, {
                    onClick: this.onCopy
                }, Fe("mail_get_invite_link_copy")), we.createElement(Ne.default, {
                    className: "ChatSettingsInvitationLink__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, Fe("mail_invite_link_copied"))), s && we.createElement("p", null, i[0], we.createElement(Re.default, {
                    className: "ChatSettingsInvitationLink__reset",
                    onClick: t
                }, Fe("mail_invite_reset_link")), i[1]))
            }
        }
        var Ue = n("6raB"),
            Ge = n("hIV1"),
            qe = Se.default.getLang;
        class $e extends we.Component {
            constructor(e) {
                super(e), this.onConfirm = () => {
                    this.state.loading || (this.setState({
                        loading: !0
                    }), this.props.onConfirm().then(() => {
                        this.setState({
                            loading: !1
                        }), this.props.onCancel()
                    }).catch(() => this.setState({
                        loading: !1
                    })))
                }, this.state = {}
            }
            render() {
                return we.createElement("div", {
                    className: "ChatSettingsResetInvitationLink"
                }, we.createElement("div", {
                    className: "ChatSettingsResetInvitationLink__text",
                    dangerouslySetInnerHTML: {
                        __html: qe("mail_chat_reset_link_warning")
                    }
                }), we.createElement(Ge.default, {
                    alignment: "right"
                }, we.createElement(Ie.default, {
                    appearance: "tertiary",
                    onClick: this.props.onCancel
                }, qe("global_cancel")), we.createElement(Ue.default, {
                    onClick: this.onConfirm,
                    loading: this.state.loading
                }, qe("mail_chat_reset_link_confirm"))))
            }
        }
        var ze = n("enZq"),
            Ke = n("p+C8");

        function Ve(e) {
            return we.createElement("div", {
                className: Object(ke.classNames)("ChatSettingsRoundedIcon", `ChatSettingsRoundedIcon--${e.type}`)
            })
        }
        var We = Se.default.getLang;
        class Ye extends we.Component {
            constructor(e) {
                super(e), this.onCopyInviteLink = e => {
                    this.input && (this.input.focus(), this.input.select(), document.execCommand("copy"), this.setState({
                        copied: !0
                    })), e.preventDefault(), e.stopPropagation()
                }, this.onBlinkTextHide = () => {
                    this.setState({
                        copied: !1
                    })
                }, this.getHiddenInput = e => {
                    this.input = e
                }, this.onShowInviteLink = () => {
                    Object(x.canChangeInviteLink)(this.props.store) && this.props.showInvitationLink()
                }, this.state = {
                    copied: !1
                }
            }
            render() {
                var e = this.props,
                    t = e.store,
                    n = e.flagsUpdated,
                    a = e.onHideStatus,
                    i = t.get(),
                    s = i.tabs[i.peer],
                    o = Object(r.isFvkcomgroup)(i, i.peer),
                    l = s.inviteLink && Object(x.canSeeInviteLink)(t) || Object(x.canChangeInviteLink)(t),
                    c = Object(x.isUserOwnerInChat)(s, i.id) && !o,
                    d = Object(ke.classNames)("ChatSettingsMenu", {
                        "ChatSettingsMenu--copied": this.state.copied
                    });
                return we.createElement("div", {
                    className: "ChatSettings__pane"
                }, we.createElement(ze.default, {
                    className: d
                }, we.createElement(Ke.default, {
                    onClick: this.props.showAttachments,
                    chevron: !0
                }, we.createElement(Ve, {
                    type: "attach"
                }), We("mail_im_show_media_history"))), (l || c) && we.createElement(ze.default, {
                    className: d
                }, l && we.createElement(Ke.default, {
                    onClick: this.onShowInviteLink,
                    chevron: Object(x.canChangeInviteLink)(t)
                }, we.createElement(Ve, {
                    type: "link"
                }), We(o ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link"), s.inviteLink && we.createElement("span", {
                    className: "ChatSettingsMenu__invite"
                }, we.createElement("span", {
                    className: "ChatSettingsMenu__hidden"
                }, we.createElement("input", {
                    type: "text",
                    readOnly: !0,
                    value: s.inviteLink,
                    ref: this.getHiddenInput
                })), we.createElement(Ne.default, {
                    className: "ChatSettingsMenu__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, We("mail_invite_link_copied")), we.createElement(Re.default, {
                    className: "ChatSettingsMenu__copy",
                    onClick: this.onCopyInviteLink
                }, We("mail_get_invite_link_copy")))), c && we.createElement(Ke.default, {
                    onClick: this.props.showSettings,
                    chevron: !0,
                    aside: we.createElement(Ne.default, {
                        shown: n,
                        callback: a
                    }, We("global_changes_saved"))
                }, we.createElement(Ve, {
                    type: "gear"
                }), We("mail_settings_options"))))
            }
        }
        n("tUrg");
        var Qe = n("uW+i"),
            Xe = n("NsuH"),
            Je = n("As6E"),
            Ze = Se.default.getLang;
        class et extends we.Component {
            constructor() {
                super(...arguments), this.toggleAdmin = () => {
                    var e = this.props,
                        t = e.store,
                        n = e.mid,
                        r = e.adminMap,
                        i = t.get().peer,
                        s = !r[n];
                    t.set(a.toggleAdminOptimisticly.bind(null, i, n, s)), t.set(a.toggleAdmin.bind(null, i, n, s))
                }, this.kick = () => {
                    var e = this.props.store,
                        t = e.get().peer,
                        n = this.props.mid;
                    e.set(a.kickUserOptimisticly.bind(null, t, n)), e.set(a.kickUser.bind(null, t, n)).catch(e => {
                        Object(g.imWeirdCatch)("ChatSettingsMemberEdit.kick", e)
                    })
                }, this.changeAccess = e => {
                    var t = this.props.store,
                        n = t.get().peer,
                        r = this.props.mid;
                    t.set(a.changeCommunityAccess.bind(null, n, r, !e)).catch(e => {
                        Object(g.imWeirdCatch)("ChatSettingsMemberEdit.changeAccess", e)
                    })
                }
            }
            getMemberRole(e, t) {
                var n = this.props.storeData,
                    a = n.peer;
                return t === n.tabs[a].ownerId ? Ze("mail_settings_owner") : e[t] ? Ze("mail_settings_admin") : null
            }
            getActions(e) {
                var t = window.vk.id,
                    n = this.props,
                    a = n.store,
                    r = n.mid,
                    s = [];
                if (t === r) return [{
                    text: Ze("mail_leave_chat"),
                    onClick: this.props.onLeave
                }];
                if (Object(x.canAddAdmin)(a, r) && s.push({
                        text: e[r] ? Ze("mail_chat_remove_admin") : Ze("mail_settings_appoint_admin"),
                        onClick: this.toggleAdmin
                    }), Object(x.canKickUser)(a, r) && s.push({
                        text: Ze("mail_settings_kick"),
                        onClick: this.kick
                    }), Object(i.isCommunityPeer)(r) && !e[r]) {
                    var o = Object(x.canSeeAllMessages)(a, a.get().peer, r),
                        l = o ? "mail_settings_community_mentions_only" : "mail_settings_community_full_access";
                    s.push({
                        text: Ze(l),
                        onClick: this.changeAccess.bind(this, o)
                    })
                }
                return s
            }
            render() {
                var e = window.vk.id,
                    t = this.props,
                    n = t.adminMap,
                    a = t.storeData,
                    r = t.mid,
                    i = !!n[e],
                    s = this.getMemberRole(n, r),
                    o = e === r,
                    l = i && this.getActions(n);
                return we.createElement(we.Fragment, null, s && we.createElement("span", {
                    className: "ChatSettingsMembersEdit__role"
                }, s), l && l.length > 0 && we.createElement(Je.default, {
                    position: "b",
                    align: "right",
                    trigger: "hover",
                    marginTop: -8,
                    marginLeft: 1,
                    data: this.getActions(n)
                }, we.createElement("span", {
                    className: "ChatSettingsMembersEdit__actions"
                })), !i && !o && Object(x.canKickUser)(a, r) && we.createElement(Me.default, {
                    text: Ze("mail_settings_kick"),
                    position: "t",
                    align: "right"
                }, we.createElement("span", {
                    onClick: this.kick,
                    className: "ChatSettingsMembersEdit__kick"
                })), !i && o && we.createElement(Me.default, {
                    text: Ze("mail_leave_chat"),
                    position: "t",
                    align: "right"
                }, we.createElement("span", {
                    onClick: this.props.onLeave,
                    className: "ChatSettingsMembersEdit__kick"
                })))
            }
        }
        var tt = 50,
            nt = {
                appendParentCls: "ChatSettingsWrapper"
            },
            at = window,
            rt = at.langSex,
            it = at.langNumeric,
            st = at.getSmDate,
            ot = Se.default.getLang;
        class lt extends we.Component {
            constructor(e) {
                super(e), this.onToggleSearch = () => {
                    this.state.showSearch ? this.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }) : (this.setState({
                        showSearch: !0
                    }), requestAnimationFrame(() => {
                        this.searchInput.focus()
                    }))
                }, this.onSearchChange = e => {
                    e.target.value !== this.state.searchQuery && this.setState({
                        searchQuery: e.target.value
                    })
                }, this.onShowMore = () => {
                    var e = "all" === this.state.current ? "allShowMore" : "adminsShowMore";
                    this.state[e] && this.setState({
                        [e]: !1
                    })
                }, this.onTabClick = (e, t) => {
                    e.preventDefault(), this.state.current !== t && this.setState({
                        current: t
                    })
                }, this.handleDocumentClick = e => {
                    !this.state.showSearch || this.state.searchQuery || e.target.closest(".ChatSettingsMembersWidget__search") || e.target.closest(".ChatSettingsMembersWidget__searchIcon") || this.setState({
                        showSearch: !1
                    })
                }, this.onKeydown = e => {
                    this.state.showSearch && 27 === e.keyCode && (this.searchInput.blur(), this.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }), e.preventDefault(), e.stopPropagation())
                }, this.getInviter = e => {
                    if (this.invitersCache[e]) return this.invitersCache[e];
                    var t = this.props.store.get(),
                        n = t.peer,
                        a = t.tabs[n],
                        i = a.inviters;
                    if (!i[e]) return "";
                    var s = Object(r.getChatMembersByIds)(t, [i[e][0]])[0],
                        o = st(i[e][2], t.timeshift, !0);
                    if (Object(x.isUserOwnerInChat)(a, e)) return this.invitersCache[e] = ot("mail_settings_owner"), ot("mail_settings_owner");
                    if (!s) return this.invitersCache[e] = o, o;
                    var l = rt(i[e][1], ot("mail_chat_member_invited_by_X", "raw")).replace(/{inviter}/, replaceEntities(s.name)) + " " + o;
                    return this.invitersCache[e] = l, l
                }, this.isAddMemberWidgetShown = () => {
                    var e = window.vk.id,
                        t = this.props.store,
                        n = t.get().peer,
                        a = this.state,
                        r = a.current,
                        i = a.showSearch,
                        s = a.searchQuery;
                    return "all" === r && !(i && "" !== s) && Object(x.canInviteUser)(t, n, e)
                }, this.searchInputRef = e => {
                    this.searchInput = e
                };
                var t = e.store.get(),
                    n = this.getMembers(t),
                    a = this.getAdmins(t);
                this.state = {
                    showSearch: !1,
                    searchQuery: "",
                    current: "all",
                    all: n,
                    allShowMore: n.length > tt,
                    admins: a,
                    adminsShowMore: a.length > tt
                }, this.membersMap = n.reduce((e, t) => (e[t] = !0, e), {}), this.searchIndexPromise = this.getSearchIndex(n).then(e => {
                    this.searchIndex = e
                }), this.invitersCache = {}
            }
            componentWillReceiveProps(e) {
                var t = e.store.get(),
                    n = this.getMembers(t),
                    a = this.getAdmins(t),
                    r = {
                        removes: [],
                        additions: []
                    },
                    i = n.reduce((e, t) => (e[t] = !0, e), {});
                n.forEach(e => {
                    this.membersMap[e] || r.additions.push(e)
                }), Object.keys(this.membersMap).forEach(e => {
                    i[e] || r.removes.push(e)
                }), (r.removes.length || r.additions.length) && (this.updateSearchIndex(t, r), this.membersMap = i), this.setState({
                    all: n,
                    allShowMore: this.state.allShowMore && n.length > tt,
                    admins: a,
                    adminsShowMore: this.state.adminsShowMore && a.length > tt
                })
            }
            getMembers(e) {
                var t = e.peer,
                    n = e.tabs[t],
                    a = -1 !== (n.memberIds || []).indexOf(n.ownerId),
                    r = (n.adminIds || []).reduce((e, t) => (e[t] = !0, e), {});
                return (a ? [n.ownerId] : []).concat((n.adminIds || []).filter(e => e !== n.ownerId), (n.memberIds || []).filter(e => e !== n.ownerId && !r[e]))
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
                    a = t.showSearch,
                    i = t.searchQuery;
                if (a && i && this.searchIndex) return this.searchIndex.search(i);
                var s = this.state[n],
                    o = Object(r.getChatMembersByIds)(e.get(), s);
                return this.state[`${n}ShowMore`] ? o.slice(0, tt) : o
            }
            getSearchIndex(e) {
                var t = window.vkIndexer,
                    n = Object(r.getChatMembersByIds)(this.props.store.get(), e);
                return this.membersMap = n.reduce((e, t) => (e[t.id] = !0, e), {}), new Promise((e, a) => {
                    var r = new t(n, e => e.name, () => {
                        e(r)
                    })
                })
            }
            updateSearchIndex(e, t) {
                var n = Object(r.getChatMembersByIds)(e, t.removes),
                    a = Object(r.getChatMembersByIds)(e, t.additions);
                (this.searchIndex ? Promise.resolve(this.searchIndex) : this.searchIndexPromise).then(e => {
                    n.forEach(t => {
                        e.remove(t)
                    }), a.forEach(t => {
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
                    a = e.membersAdded,
                    i = e.onHideStatus,
                    s = this.state,
                    o = s.current,
                    l = s.showSearch,
                    c = s.searchQuery,
                    d = s.allShowMore,
                    u = s.adminsShowMore,
                    m = s.admins,
                    g = t.get(),
                    p = g.peer,
                    h = g.tabs[p],
                    _ = this.getCurrentList(),
                    f = this.isAddMemberWidgetShown() ? ["add"].concat(_) : _,
                    b = "all" === o ? d : u,
                    v = h.membersLastSeen,
                    y = {
                        "ChatSettingsMembersWidget--search": !!l
                    },
                    O = h.adminIds.reduce((e, t) => (e[t] = !0, e), {});
                return we.createElement("div", {
                    className: Object(ke.classNames)("ChatSettingsMembersWidget", y)
                }, we.createElement("header", {
                    className: "ChatSettingsMembersWidget__header"
                }, we.createElement("input", {
                    placeholder: ot("mail_members_search"),
                    className: "ChatSettingsMembersWidget__search",
                    onChange: this.onSearchChange,
                    onInput: this.onSearchChange,
                    onPaste: this.onSearchChange,
                    value: this.state.searchQuery,
                    ref: this.searchInputRef
                }), we.createElement("button", {
                    className: "ChatSettingsMembersWidget__searchIcon",
                    onClick: this.onToggleSearch
                }), we.createElement(Qe.default, {
                    className: "ChatSettingsMembersWidget__tabs",
                    onTabClick: this.onTabClick
                }, we.createElement("span", {
                    key: "all"
                }, ot("mail_settings_everyone") + " ", we.createElement("span", {
                    className: "Tabs__desc"
                }, Object(r.getAliveMembersCount)(h))), m.length > 0 && we.createElement("span", {
                    key: "admins"
                }, ot("mail_settings_admins") + " ", we.createElement("span", {
                    className: "Tabs__desc"
                }, m.length)))), we.createElement("div", {
                    className: "ChatSettingsMembersWidget__list"
                }, we.createElement(ze.default, {
                    border: !1
                }, f.length > 0 && f.map(e => {
                    if ("add" === e) return we.createElement(Ke.default, {
                        selectable: !1,
                        border: !1,
                        key: "add",
                        onClick: this.props.showMembersSettings,
                        aside: we.createElement(Ne.default, {
                            className: "ChatSettingsMembersWidget__blink",
                            shown: a,
                            callback: i
                        }, it(n || 0, ot("mail_settings_members_added", "raw")))
                    }, we.createElement("span", {
                        className: "ChatSettingsMembersWidget__add"
                    }, we.createElement("span", null, ot("mail_settings_add_members"))));
                    var s = this.getInviter(e.id),
                        o = v && v[e.id] ? Object(r.getLastSeenText)(g, e.id, v[e.id], nt) : "";
                    return we.createElement(Ke.default, {
                        selectable: !1,
                        border: !1,
                        aside: we.createElement(et, {
                            adminMap: O,
                            store: t,
                            storeData: g,
                            mid: e.id,
                            onLeave: this.props.onLeave
                        }),
                        key: e.id
                    }, we.createElement(Xe.default, {
                        photo: e.photo,
                        title: e.name,
                        description: we.createElement("span", {
                            title: s,
                            dangerouslySetInnerHTML: {
                                __html: o
                            }
                        }),
                        href: e.link
                    }))
                }), !f.length && l && c && we.createElement("div", {
                    className: "ChatSettingsMembersWidget__empty"
                }, ot("mail_settings_not_found")), !(l && c) && b && we.createElement("div", {
                    className: "ChatSettingsMembersWidget__more",
                    onClick: this.onShowMore
                }, ot("mail_settings_show_all_members")))))
            }
        }
        var ct = n("FABD"),
            dt = n("DM26"),
            ut = Se.default.getLang,
            mt = window,
            gt = mt.showFastBox,
            pt = mt.unclean,
            ht = () => {};
        class _t extends we.Component {
            constructor(e) {
                super(e), this.onChange = e => {
                    var t = this.props.store.get(),
                        n = e.target.value;
                    Object(a.searchLocalHints)(n, t).then(e => (this.setSearchResults({}, !1, n, e), n ? (this.isSearching = !0, this.serverSearch(n, e.map(e => e.peerId))) : Promise.resolve([]))).then(this.appendSearchResults).catch(() => {})
                }, this.serverSearch = Object(dt.debouncedPromise)((e, t) => {
                    var n = this.props.store;
                    return Object(a.searchHints)(e, t, "friends", n.get())
                }, 300), this.onRemoveToken = e => new Promise(t => {
                    var n = this.state.selected.filter(t => t !== e);
                    this.selected = n.reduce((e, t) => (e[t] = !0, e), {}), this.setState({
                        selected: n
                    }, t)
                }), this.onSelect = e => new Promise(t => {
                    var n = this.selected[e] ? this.state.selected.filter(t => t !== e) : [].concat(this.state.selected, e).filter((e, t, n) => n.indexOf(e) === t);
                    this.selected = n.reduce((e, t) => (e[t] = !0, e), {}), this.resetSearch({
                        selected: n,
                        value: ""
                    }, t)
                }), this.onAddPeople = () => {
                    var e = this.props.store,
                        t = e.get().peer,
                        n = this.state.selected.map(e => parseInt(e));
                    this.setState({
                        loading: !0
                    }), e.set(a.addNewMember.bind(null, t, n)).then(() => e.set(a.getChatDetails.bind(null, t)).then(() => {
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
                        }), gt(ut("global_error"), e)
                    })
                }, this.setSearchResults = (e, t, n, a) => {
                    var r = this.props.store.get(),
                        s = Object(i.getTab)(r, r.peer),
                        o = [];
                    a.forEach(e => {
                        this.data[e.peerId] || (this.data[e.peerId] = e), -1 === s.memberIds.indexOf(e.peerId) && o.push(e.peerId)
                    }), this.setState(Object.assign({}, e, {
                        found: o,
                        value: n
                    }), t || ht)
                }, this.appendSearchResults = e => {
                    var t = this.props.store.get(),
                        n = Object(i.getTab)(t, t.peer),
                        a = this.state.found;
                    e.forEach(e => {
                        this.data[e.peerId] || (this.data[e.peerId] = e), -1 === n.memberIds.indexOf(e.peerId) && -1 === a.indexOf(e.peerId) && a.push(e.peerId)
                    }), this.isSearching = !1, this.setState({
                        found: a
                    })
                }, this.state = {
                    selected: [],
                    value: "",
                    loading: !1,
                    found: []
                }, this.data = {}, this.selected = {}
            }
            resetSearch(e, t) {
                return Object(a.searchLocalHints)("", this.props.store.get()).then(this.setSearchResults.bind(this, e, t, ""))
            }
            componentDidMount() {
                this.resetSearch()
            }
            render() {
                var e = Object.keys(this.state.selected).length;
                return we.createElement("div", {
                    className: "ChatSettingsMembers"
                }, we.createElement(ct.default, {
                    className: "ChatSettingsMembers__multiSelect",
                    tokens: this.state.selected.map(e => ({
                        text: pt(this.data[e].name),
                        id: e
                    })),
                    removeTokenPlaceholder: ut("mail_create_chat_remove_user"),
                    onRemoveToken: this.onRemoveToken,
                    placeholder: ut("mail_search_creation"),
                    value: this.state.value,
                    useInfiniteScroll: !1,
                    onChange: this.onChange,
                    onSelect: this.onSelect,
                    useInfiniteScroll: !0,
                    hasMore: !1,
                    virtualized: !0,
                    loadMore: () => {},
                    notFoundText: ut("mail_not_found"),
                    autoFocus: !0,
                    isSearching: this.isSearching
                }, this.state.found.map(e => we.createElement("div", {
                    className: Object(ke.classNames)("ChatSettingsMembers__entity", {
                        "ChatSettingsMembers__entity--selected": this.selected[e]
                    }),
                    key: e,
                    "data-id": e
                }, we.createElement(Xe.default, {
                    size: "34",
                    title: this.data[e].name,
                    photo: this.data[e].photo
                })))), we.createElement(Ge.default, {
                    alignment: "right"
                }, we.createElement(Ue.default, {
                    disabled: 0 === e,
                    onClick: this.onAddPeople,
                    loading: this.state.loading
                }, ut(e < 2 ? "mail_append_chat" : "mail_im_create_chat_with"))))
            }
        }
        var ft = n("mSoV"),
            bt = Math.log2 || (e => Math.log(e) / Math.LN2),
            vt = Se.default.getLang;
        class yt extends we.Component {
            constructor(e) {
                super(e), this.onChange = e => {
                    var t = e.name,
                        n = e.selected.value,
                        a = this.state.flags;
                    this.setState({
                        flags: n ? a | 1 << t : a & ~(1 << t)
                    })
                }, this.onCancel = () => {
                    this.setState({
                        flags: this.props.tab.data.flags
                    }), this.props.back()
                }, this.onSave = () => {
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
                }, this.state = {
                    flags: e.tab.data.flags,
                    loading: !1
                }
            }
            render() {
                var e = this.props.tab,
                    t = this.state.flags,
                    n = [{
                        value: !0,
                        label: vt("mail_settings_only_admins")
                    }, {
                        value: !1,
                        label: vt("mail_settings_all_members")
                    }],
                    a = e.serverSettings;
                return we.createElement("div", {
                    className: "ChatSettingsOptions"
                }, we.createElement(ze.default, null, we.createElement(Ke.default, {
                    selectable: !1,
                    aside: we.createElement(ft.default, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: bt(x.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE),
                        options: n,
                        value: !!(t & x.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE)
                    })
                }, we.createElement(Ve, {
                    type: "plus"
                }), vt("mail_settings_can_invite")), we.createElement(Ke.default, {
                    selectable: !1,
                    aside: we.createElement(ft.default, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: bt(x.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE),
                        options: n,
                        value: !!(t & x.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE)
                    })
                }, we.createElement(Ve, {
                    type: "pencil"
                }), vt("mail_settings_can_edit_info")), we.createElement(Ke.default, {
                    selectable: !1,
                    aside: we.createElement(ft.default, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: bt(x.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN),
                        options: n,
                        value: !!(t & x.MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN)
                    })
                }, we.createElement(Ve, {
                    type: "pin"
                }), vt("mail_settings_can_pin")), we.createElement(Ke.default, {
                    selectable: !1,
                    aside: we.createElement(ft.default, {
                        className: "ChatSettingsOptions__longselect",
                        onChange: this.onChange,
                        name: bt(x.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS),
                        options: [{
                            value: !1,
                            label: vt("mail_settings_only_owner")
                        }, {
                            value: !0,
                            label: vt("mail_settings_owner_and_admins")
                        }],
                        value: !!(t & x.MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS)
                    })
                }, we.createElement(Ve, {
                    type: "user"
                }), vt("mail_settings_admins_can_add_admins")), a.map(e => we.createElement(Ke.default, {
                    selectable: !1,
                    key: e.name,
                    aside: we.createElement(ft.default, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: bt(e.bit),
                        options: e.options,
                        value: !!(t & e.bit)
                    })
                }, we.createElement(Ve, {
                    type: e.icon
                }), e.name))), we.createElement(Ge.default, {
                    alignment: "right"
                }, we.createElement(Ie.default, {
                    appearance: "tertiary",
                    onClick: this.onCancel
                }, vt("global_cancel")), we.createElement(Ue.default, {
                    onClick: this.onSave,
                    loading: this.state.loading
                }, vt("global_save"))))
            }
        }

        function Ot(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Et = 0,
            Ct = 1,
            wt = 2,
            jt = 3,
            St = 6,
            kt = 300,
            Tt = Se.default.getLang;
        class It extends we.Component {
            constructor(e) {
                super(e), this.showInvitationLink = () => {
                    var e = this.props.store.get(),
                        t = e.peer;
                    return this.setState({
                        invitationLoading: !0
                    }), Object(a.getInviteLink)(t - 2e9, e).then(e => {
                        var t = Ot(e, 1)[0];
                        this.setState({
                            section: wt,
                            invitationLoading: !1,
                            invitationLink: t
                        })
                    })
                }, this.onUpdateFlags = e => {
                    var t = this.props.store.get(),
                        n = t.peer;
                    return Object(a.updateFlags)(n, e, t)
                }, this.afterUpdateFlags = () => {
                    this.go(Et, () => this.setBlinkStatus({
                        flagsUpdated: !0
                    }))
                }, this.afterMembersAdded = e => {
                    this.go(Et, () => this.setBlinkStatus({
                        membersAdded: !0,
                        membersCount: e
                    }))
                }, this.setBlinkStatus = e => {
                    this.timers.push(setTimeout(() => this.setState(e), kt))
                }, this.onHideStatus = () => {
                    this.setState({
                        membersAdded: !1,
                        flagsUpdated: !1
                    })
                }, this.onLeave = () => {
                    var e = this.props,
                        t = e.store,
                        n = e.closePopup,
                        i = t.get().peer,
                        s = Object(r.isFvkcomgroup)(t, i),
                        o = showFastBox({
                            title: Tt(s ? "mail_leave_channel" : "mail_chat_leave_title"),
                            dark: 1
                        }, Tt(s ? "mail_vkcomgroup_leave_confirm" : "mail_chat_leave_confirm"), Tt(s ? "mail_leave_channel" : "mail_leave_chat"), function() {
                            t.set(a.unpinMessageOptimistic.bind(null, i)), t.set(a.leaveChat.bind(null, i)), o.hide(), n(), t.get().longpoll.push([Object(l.resetPeer)()])
                        }, Tt("global_cancel"), function() {
                            o.hide()
                        })
                }, this.onResetLink = () => {
                    var e = this.props.store.get(),
                        t = e.peer;
                    return Object(a.resetInviteLink)(t, e).then(e => {
                        var t = Ot(e, 1)[0];
                        this.setState({
                            invitationLink: t,
                            invitationLinkReseted: !0
                        })
                    })
                }, this.onShowAttachments = () => {
                    var e = this.props.store.get().peer;
                    window.showWiki({
                        w: "history" + Object(r.convertPeerToUrl)(e) + "_photo"
                    }, null, {})
                }, this.state = {
                    section: Et,
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
                    case Ct:
                        return Tt("mail_settings_add_members");
                    case wt:
                    case jt:
                        return Tt("mail_chat_invite_link");
                    case St:
                        return Tt("mail_settings_options");
                    default:
                        return Tt("mail_settings_title")
                }
            }
            componentWillReceiveProps(e) {
                var t = e.store.get(),
                    n = t.peer,
                    r = t.tabs[n];
                r.photoLarge || r.photoGrid || this.resync || (this.resync = !0, e.store.set(a.getChatDetails.bind(null, n)).then(() => {
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
                    a = t.get(),
                    i = a.peer,
                    s = a.tabs[i],
                    o = Object(r.isFvkcomgroup)(t, i),
                    l = !o || !t.get().gid,
                    c = Tt(o ? "mail_im_n_vkcomgroup_members" : "mail_im_n_chat_members", Object(r.getAliveMembersCount)(s));
                return we.createElement("section", {
                    className: "ChatSettings"
                }, we.createElement(Te, {
                    title: this.getPopupTitle(),
                    back: this.state.section !== Et ? Tt("global_back") : void 0,
                    onCloseClick: n,
                    onBackClick: () => this.go(Et)
                }), this.state.section === Et && we.createElement("div", {
                    className: "ChatSettings__content"
                }, we.createElement(De, {
                    store: t,
                    photo: s.photoLarge,
                    grid: s.photoGrid,
                    title: s.name,
                    flags: s.data.flags,
                    meta: c,
                    description: ""
                }), we.createElement(Ye, {
                    store: t,
                    showNotificationSettings: () => {},
                    showMembersSettings: () => this.go(Ct),
                    showAttachments: this.onShowAttachments,
                    showInvitationLink: this.showInvitationLink,
                    showSettings: () => this.go(St),
                    membersAdded: this.state.membersAdded,
                    membersCount: this.state.membersCount,
                    flagsUpdated: this.state.flagsUpdated,
                    onHideStatus: this.onHideStatus
                }), o ? null : we.createElement("div", {
                    className: "ChatSettings__pane"
                }, we.createElement(lt, {
                    store: t,
                    onLeave: this.onLeave,
                    showMembersSettings: () => this.go(Ct),
                    membersAdded: this.state.membersAdded,
                    onHideStatus: this.onHideStatus,
                    membersCount: this.state.membersCount
                })), l && we.createElement("div", {
                    className: "ChatSettings__pane"
                }, we.createElement(Ie.default, {
                    appearance: ["link", "mobile"],
                    className: "ChatSettings__leave",
                    onClick: this.onLeave
                }, Tt(o ? "mail_leave_channel" : "mail_settings_leave")))), this.state.section === Ct && we.createElement(_t, {
                    store: t,
                    afterSave: this.afterMembersAdded
                }), this.state.section === St && we.createElement(yt, {
                    tab: s,
                    back: () => this.go(Et),
                    onSave: this.onUpdateFlags,
                    afterSave: this.afterUpdateFlags
                }), this.state.section === wt && we.createElement(He, {
                    store: t,
                    onReset: () => this.go(jt),
                    reseted: this.state.invitationLinkReseted,
                    invitationLink: this.state.invitationLink
                }), this.state.section === jt && we.createElement($e, {
                    onConfirm: this.onResetLink,
                    onCancel: () => this.go(wt)
                }))
            }
        }
        var Mt, At = window,
            Lt = At.MessageBox,
            Pt = At.show,
            Dt = At.hide,
            xt = At.isVisible,
            Nt = At.boxRefreshCoords;

        function Rt(e) {
            var t = Ht();
            t && je.render(we.createElement(It, {
                store: e,
                closePopup: Bt,
                updatePopup: Ft
            }), t)
        }

        function Bt() {
            Mt && Mt.hide()
        }

        function Ft() {
            Mt && Mt.updateBoxCoords()
        }

        function Ht() {
            return document.querySelector("#ChatSettings")
        }

        function Ut(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                a = xt(t);
            return {
                unmount() {
                    var t = Ht();
                    t && je.unmountComponentAtNode(t), Object(o.destroyModule)(e)
                },
                showLoader() {
                    Nt(n), Pt(n), a || Pt(t)
                },
                hideLoader() {
                    Dt(n), a || Dt(t)
                }
            }
        }

        function Gt(e, t, n) {
            var r = Object(o.createMutations)(Ut).bindMutations,
                s = t.get(),
                l = Object(o.createModule)({
                    handlers: (e, t) => {}
                }),
                c = s.peer,
                d = r(l);
            var u = function(e, t) {
                    t.get().peer === c ? function(e) {
                        var t = Object(i.getTab)(e, e.get().peer);
                        t && t.data && !t.data.closed && !t.data.kicked ? Rt(e) : Bt()
                    }(t) : e.unmount()
                }.bind(null, d),
                m = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 560,
                    onShow() {
                        Rt(t), t.subscribe(u), requestAnimationFrame(() => Mt.updateBoxCoords())
                    },
                    onHideAttempt: () => (t.unsubscribe(u), d.unmount(), !0)
                };
            return d.showLoader(), t.set(a.getChatDetails.bind(null, c)).then(e => {
                d.hideLoader();
                var t = Object(f.unpackStore)(e).peer;
                t && t === c ? Mt = new Lt(m).content('<div id="ChatSettings" class="ChatSettingsWrapper"></div>').show() : d.unmount()
            }), d
        }

        function qt() {
            return (qt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        var $t = we.createContext(),
            zt = $t.Provider,
            Kt = $t.Consumer,
            Vt = zt;

        function Wt(e) {
            return class extends we.Component {
                constructor() {
                    super(...arguments), this.onUpdate = () => {
                        this.setState({})
                    }
                }
                componentDidMount() {
                    this.store.subscribe(this.onUpdate)
                }
                componentWillUnmount() {
                    this.store.unsubscribe(this.onUpdate)
                }
                render() {
                    return we.createElement(Kt, null, t => (this.store || (this.store = t), we.createElement(e, qt({}, this.props, {
                        store: t
                    }))))
                }
            }
        }
        var Yt = n("vRp6");

        function Qt() {
            return (Qt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function Xt(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class Jt extends we.Component {
            constructor() {
                super(...arguments), this.getRef = e => {
                    this.element = e && e.element
                }
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = Xt(e, ["className"]);
                return we.createElement(xe.default, Qt({}, n, {
                    className: Object(ke.classNames)(t, "BlockSearchInput"),
                    ref: this.getRef
                }))
            }
        }
        Jt.defaultProps = xe.default.defaultProps;
        var Zt = "/images/camera_c.gif";
        class en extends we.Component {
            constructor(e) {
                super(e), this.onError = () => {
                    this.setState({
                        errored: !0
                    })
                }, this.state = {}
            }
            render() {
                var e = this.props,
                    t = e.photo,
                    n = e.title,
                    a = e.isOnline,
                    r = e.isMobile,
                    i = Object(ke.classNames)("Avatar", {
                        "Avatar--online": a,
                        "Avatar--mobile": r
                    });
                return we.createElement("div", {
                    className: i
                }, we.createElement("div", {
                    className: "Avatar__wrapper"
                }, we.createElement("img", {
                    onError: this.onError,
                    className: "Avatar__img",
                    src: this.state.errored ? Zt : t,
                    alt: n
                })))
            }
        }
        en.defaultProps = {
            isOnline: !1,
            isMobile: !1
        };
        var tn = n("ThPM"),
            nn = n("7p7+"),
            an = n("PjZB"),
            rn = n("rjmT");

        function sn() {
            return (sn = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function on(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var ln = Object(dt.debouncedPromise)(a.searchHints, 300),
            cn = window,
            dn = cn.Emoji,
            un = cn.langNumeric,
            mn = Se.default.getLang,
            gn = 38,
            pn = 27,
            hn = 40,
            _n = 13;
        var fn, bn = Wt(class extends we.Component {
                constructor(e) {
                    var t;
                    super(e), t = this, this.toggleMode = () => {
                        var e = this.props.store;
                        if (Object(i.isCommunityInterface)(e)) {
                            var t = 0 === this.state.mode ? 1 : 0,
                                n = 0 === t ? a.searchImTopConv : a.searchTopConv;
                            this.setState({
                                value: "",
                                mode: t,
                                loading: !0,
                                selected: null,
                                found: []
                            }, () => n("", e.get()).then(e => this.setSearchResults(this.filterResults(e))).then(() => this.searchInput.focus()).catch(e => console.error(e)))
                        }
                    }, this.onChange = e => {
                        this.setState({
                            value: e.target.value,
                            loading: !0,
                            error: null
                        });
                        var t = e.target.value;
                        this.searchQuery !== t && (this.searchQuery = t, this.onSearch(t))
                    }, this.filterResults = e => {
                        var t = Object(i.isCommunityInterface)(this.props.store) && 1 === this.state.mode;
                        return e.filter(e => {
                            var n = e.peerId;
                            return !(t && n < 0) && (!(t && n > 2e9 && !Object(x.doesChatTabHaveFlag)(e, 1024)) && !(!t && n > 2e9 && Object(x.doesChatTabHaveFlag)(e, 1024)))
                        })
                    }, this.onSearch = e => {
                        var t = this.props.store,
                            n = t.get(),
                            r = Object(i.isCommunityInterface)(t) && 0 === this.state.mode,
                            s = r ? a.searchImTopConv : a.searchTopConv;
                        return 1 === this.state.mode && "" === e ? this.emptySearch().then(e => {
                            this.setSearchResults(this.filterResults(e))
                        }) : s(e, n).then(t => {
                            var a = t.map(e => e.peerId);
                            return t = this.filterResults(t), this.setSearchResults(t, !1, !t.length), e ? ln(e, a, "all", {
                                hidegid: r
                            }, n) : Promise.resolve([])
                        }).then(t => {
                            e === this.state.value && this.setSearchResults(this.filterResults(t), !0)
                        }).catch(() => {})
                    }, this.emptySearch = () => {
                        var e = this.props.store,
                            t = e.get(),
                            n = t.dialog_tabs.all,
                            r = {},
                            s = {};
                        return Object(a.searchTopConv)("", t).then(a => (a.forEach(e => {
                            s[e.peerId] = e
                        }), [t.peer].concat(n.filter(e => e != t.peer)).map(t => {
                            var n = Object(i.getTab)(e, t);
                            return r[t] = !0, {
                                name: s[t] && s[t].name || n.name,
                                photo: s[t] && s[t].photo || n.photo,
                                data: n.data,
                                peerId: t
                            }
                        }).concat(a.filter(e => !r[e.peerId]))))
                    }, this.sendRecipient = e => {
                        var t = this.props.store,
                            n = t.get();
                        1 === this.state.mode ? (n.longpoll.push([Object(l.changePeer)(e, !1, !0, !0, "forward_messages_popup")]), Object(Oe.statlogsForwardEvent)(t), Object(i.isCommunityInterface)(t) && Object(Oe.statlogsForwardFromCommunityEvent)(t, !1)) : this.setState({
                            selected: e,
                            error: null
                        }, () => {
                            dn.focus(this.input)
                        })
                    }, this.cleanSelectedRecipient = () => {
                        this.setState({
                            activeElement: -1
                        })
                    }, this.scrollToSelectedUser = () => {
                        var e = this.state,
                            t = e.found,
                            n = e.activeElement,
                            a = this.scrollContainer;
                        if (a) {
                            var r = a.querySelector(`[data-id="${t[n].peerId}"]`);
                            if (r)
                                if (r.offsetTop < a.scrollTop) a.scrollTop = r.offsetTop;
                                else {
                                    var i = r.offsetTop + r.offsetHeight;
                                    i > a.scrollTop + a.offsetHeight && (a.scrollTop = i - a.offsetHeight)
                                }
                            else a.scrollTop = (a.childNodes[1].offsetHeight || 0) * n
                        }
                    }, this.selectRecipient = function(e) {
                        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                            a = t.validateActiveElement(e);
                        t.state.activeElement !== a && t.setState({
                            activeElement: a
                        }, () => {
                            n && t.scrollToSelectedUser()
                        })
                    }, this.onClick = e => this.sendRecipient(Number(e.currentTarget.getAttribute("data-id"))), this.loadMore = () => {}, this.setSearchResults = function(e, n) {
                        var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        if (!t.unmounted)
                            if (n) {
                                var r = e.filter(e => !t.found[e.peerId]);
                                r.forEach(e => {
                                    t.found[e.peerId] = !0
                                }), t.setState({
                                    found: [].concat(t.state.found, r),
                                    loading: a
                                })
                            } else t.found = e.reduce((e, t) => (e[t.peerId] = !0, e), {}), t.setState({
                                found: e,
                                loading: a,
                                activeElement: 0
                            })
                    }, this.getFormRef = e => {
                        this.form = e
                    }, this.getInputRef = e => {
                        this.input = e
                    }, this.getSearchRef = e => {
                        this.searchInput = e && e.element
                    }, this.getScrollContainerRef = e => {
                        this.scrollContainer = je.findDOMNode(e)
                    }, this.getEmojiButtonRef = e => {
                        this.emojiButton = e
                    }, this.onEmojiButtonMouseOver = e => {
                        e.persist(), dn.show(this.emojiButton, e)
                    }, this.onEmojiButtonMouseOut = e => {
                        e.persist(), dn.hide(this.emojiButton, e)
                    }, this.send = () => {
                        var e = this.props.store,
                            t = this.state.selected,
                            n = dn.val(this.input).trim(),
                            s = new rn.ImDraft({}, 0),
                            o = e.get().pendingForward;
                        if (t && !Object(r.isMessageTooLong)(val)) {
                            this.setState({
                                sending: !0
                            });
                            var l = Object(i.isCommunityInterface)(e) && 0 === this.state.mode;
                            l || s.addAttach("mail", o.msgIds.join(";"), o.object || null);
                            var c = {
                                    message: n,
                                    attaches: s.dData.attaches.map(e => [e.type, e.id]) || []
                                },
                                d = {
                                    hidegid: !0,
                                    external: {
                                        original_gid: e.get().id,
                                        fwd_group_msg_ids: l ? o.msgIds.join(";") : void 0
                                    }
                                };
                            new Promise(n => {
                                Object(a.loadHashes)([t], {
                                    hidegid: !0
                                }, e.get()).then(e => {
                                    var a = on(e, 1)[0];
                                    return n(a[t])
                                })
                            }).then(n => e.set(a.sendMessage.bind(null, t, c, sn({
                                hash: n
                            }, d)))).then(() => {
                                Object(Oe.statlogsForwardFromCommunityEvent)(e, !0), e.setState({
                                    pendingForward: null
                                }), this.props.closePopup(), showDoneBox(mn("mail_send3"))
                            }).catch(e => {
                                this.unmounted || this.setState({
                                    sending: !1
                                }, () => {
                                    showFastBox(mn("mail_error"), e)
                                })
                            })
                        }
                    }, this.onSearchKeyDown = e => {
                        e.keyCode === pn && this.state.value && (this.searchInput.blur(), this.searchQuery = "", this.setState({
                            value: "",
                            loading: !0,
                            error: null
                        }, this.onSearch.bind(this, "")), e.stopPropagation())
                    }, this.onMessageInputKeyDown = e => {
                        e.keyCode === pn && (this.state.sending || (dn.val(this.input, ""), this.setState({
                            selected: null
                        }), this.searchInput.focus()), e.stopPropagation())
                    }, this.onKeydown = e => {
                        var t = this.state.activeElement;
                        switch (e.which || e.keyCode) {
                            case gn:
                                this.selectRecipient(t - 1), e.preventDefault();
                                break;
                            case hn:
                                this.selectRecipient(t + 1), e.preventDefault();
                                break;
                            case _n:
                                var n = this.state,
                                    a = n.found,
                                    r = n.activeElement;
                                a[r] && (this.sendRecipient(a[r].peerId), e.preventDefault())
                        }
                    }, this.state = {
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
                    if (!Object(r.isChatPeer)(e)) return "";
                    var t = this.props.store,
                        n = Object(i.getTab)(t, e);
                    return n && n.membersCount ? un(n.membersCount, mn("mail_im_n_chat_members", "raw")) : ""
                }
                validateActiveElement(e) {
                    return e > this.state.found.length - 1 ? this.state.found.length - 1 : e < 0 ? 0 : e
                }
                componentDidMount() {
                    this.props.updatePopup(), dn.init(this.input, {
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
                        a = this.state,
                        r = a.mode,
                        s = a.loading,
                        o = a.selected,
                        l = a.found,
                        c = a.sending,
                        d = a.activeElement;
                    return we.createElement("section", {
                        className: Object(ke.classNames)("MessageForward", {
                            "MessageForward--form": 0 === r && !!o
                        })
                    }, we.createElement(Te, {
                        title: we.createElement(we.Fragment, null, we.createElement("span", {
                            className: "MessageForward__title"
                        }, mn("mail_forward_messages")), Object(i.isCommunityInterface)(t) && we.createElement("span", {
                            className: "MessageForward__switch",
                            onClick: this.toggleMode
                        }, mn(0 === r ? "mail_forward_to_community_messages" : "mail_forward_to_im"))),
                        onCloseClick: n
                    }), we.createElement("div", {
                        className: "MessageForward__content",
                        onMouseLeave: this.cleanSelectedRecipient
                    }, we.createElement(Jt, {
                        value: this.state.value,
                        onChange: this.onChange,
                        placeholder: mn("mail_top_search"),
                        autoFocus: !0,
                        key: "search",
                        ref: this.getSearchRef
                    }), s && we.createElement("div", {
                        className: "MessageForward__results",
                        key: "loading"
                    }, we.createElement(nn.default, {
                        className: "MessageForward__stub"
                    }, we.createElement(an.default, null))), !s && 0 === l.length && we.createElement("div", {
                        className: "MessageForward__results",
                        key: "no-results"
                    }, we.createElement(nn.default, null, mn("mail_im_search_empty_chats"))), !s && l.length > 0 && we.createElement(Yt.default, {
                        virtualized: !0,
                        className: "MessageForward__results",
                        loadMore: this.loadMore,
                        hasMore: !1,
                        ref: this.getScrollContainerRef,
                        key: "results"
                    }, l.map((e, n) => {
                        var a = e.peerId,
                            s = e.name,
                            l = e.photo,
                            c = e.online,
                            u = (Object(i.getTab)(t, a) || {}).online || c;
                        return we.createElement(Ke.default, {
                            key: a,
                            "data-id": a,
                            onClick: this.onClick,
                            chevron: 1 === r,
                            active: n === d,
                            canBeHovered: !1,
                            onMouseEnter: this.selectRecipient.bind(null, n, !1),
                            aside: 0 === r ? we.createElement("span", {
                                className: Object(ke.classNames)("MessageForward__radio", {
                                    "MessageForward__radio--selected": +o === a
                                })
                            }) : ""
                        }, we.createElement(Xe.default, {
                            size: "34",
                            title: s,
                            photo: Array.isArray(l) ? we.createElement(tn.default, {
                                photos: l
                            }) : we.createElement(en, {
                                isOnline: !!u,
                                isMobile: !!mobPlatforms[u],
                                title: s,
                                photo: l
                            }),
                            description: this.getMembersCount(a)
                        }))
                    })), we.createElement("footer", {
                        className: "MessageForward__footer",
                        ref: this.getFormRef,
                        key: "footer"
                    }, we.createElement("div", {
                        className: "MessageForward__form _emoji_field_wrap"
                    }, we.createElement("div", {
                        className: "MessageForward__input",
                        tabIndex: "0",
                        contentEditable: !0,
                        role: "textbox",
                        "aria-multiline": !0,
                        ref: this.getInputRef,
                        placeholder: mn("mail_im_enter_msg")
                    }), we.createElement("div", {
                        className: "MessageForward__emoji emoji_smile_wrap _emoji_wrap"
                    }, we.createElement("div", {
                        ref: this.getEmojiButtonRef,
                        className: "emoji_smile _emoji_btn",
                        title: mn("global_emoji_hint"),
                        onMouseOver: this.onEmojiButtonMouseOver,
                        onMouseOut: this.onEmojiButtonMouseOut,
                        onClick: this.onEmojiButtonClick
                    }, we.createElement("div", {
                        className: "emoji_smile_icon_vector emoji_smile_icon"
                    })))), c ? we.createElement("div", {
                        className: "MessageForward__send-spinner"
                    }, we.createElement(an.default, null)) : we.createElement("button", {
                        className: "MessageForward__send",
                        onClick: this.send
                    }))))
                }
            }),
            vn = window,
            yn = vn.MessageBox,
            On = vn.show,
            En = vn.hide,
            Cn = vn.isVisible,
            wn = vn.getLang,
            jn = vn.boxRefreshCoords;

        function Sn() {
            fn && fn.hide()
        }

        function kn() {
            fn && fn.updateBoxCoords()
        }

        function Tn() {
            return document.querySelector("#MessageForward")
        }

        function In(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                a = Cn(t);
            return {
                unmount() {
                    var t = Tn();
                    t && je.unmountComponentAtNode(t), Object(o.destroyModule)(e)
                },
                showLoader() {
                    jn(n), On(n), a || On(t)
                },
                hideLoader() {
                    En(n), a || En(t)
                }
            }
        }

        function Mn(e, t, n) {
            var r = (0, Object(o.createMutations)(In).bindMutations)(Object(o.createModule)({
                    handlers: (e, t) => {}
                })),
                i = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 500,
                    onShow() {
                        ! function(e) {
                            var t = Tn();
                            t && je.render(we.createElement(Vt, {
                                value: e
                            }, we.createElement(bn, {
                                getLang: wn,
                                closePopup: Sn,
                                updatePopup: kn
                            })), t)
                        }(t), requestAnimationFrame(() => fn.updateBoxCoords())
                    },
                    onHideAttempt: () => (t.set(a.prepareForward.bind(null, null)), r.unmount(), !0)
                };
            return r.showLoader(), Promise.resolve().then(e => {
                r.hideLoader(), fn = new yn(i).content('<div id="MessageForward"></div>').show()
            }), r
        }

        function An(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Ln = "_im_action",
            Pn = "_im_page_peer_name",
            Dn = "_ui_menu",
            xn = "_im_dialog_action_wrapper",
            Nn = "_im_mess_actions",
            Rn = "_im_page_action",
            Bn = "_im_chat_topic_change_input",
            Fn = "_im_chat_verified",
            Hn = "im-page--chat-header_chat",
            Un = "im-page--chat-header_vkcomgroup",
            Gn = "_im_page_peer_name",
            qn = "_im_chat_members",
            $n = "_im_chat_invite_link",
            zn = "_im_page_reconnect",
            Kn = "._im_page_status",
            Vn = "im-page--chat-header_reconnected",
            Wn = `<a tabindex="0" role="link" class="ui_actions_menu_item ${Ln} im-action im-action_%icon%" data-action="%action%">%name%</a>`;

        function Yn(e, t, n) {
            return !e.map(e => {
                var a = Object(i.getMessage)(t, n, e);
                return Object(s.isImportant)(a)
            }).reduce((e, t) => e && t, !0)
        }

        function Qn(e, t) {
            var n = t.get(),
                a = n.peer,
                r = n.tabs[a].pinned;
            return 1 === e.length && r && e[0] === Object(i.parserMessage)(r).messageId
        }

        function Xn(e, t, n) {
            var a = getLang("mail_selected_shorted", t.length);
            ea({
                actions: !0
            }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
                label: a.replace("{count}", t.length),
                tip: getLang("mail_deselect_all")
            }));
            var s = Object(i.getTab)(n, n.get().peer),
                o = e.querySelector("." + Nn),
                l = Yn(t, n, n.get().peer),
                c = Qn(t, n),
                d = Object(r.isChatPeer)(s.peerId) && Object(x.canPinOrUnpin)(n, s.peerId),
                u = Object(r.isFvkcomgroup)(n, s.peerId),
                m = e.querySelector(`.${Rn}[data-action="respond"]`),
                g = Boolean(Object(i.tabIsOutgoingMessageRequest)(s)),
                p = Boolean(Object(i.tabIsMessageRequest)(s));
            toggleClass(o, "im-page--mess-actions_important", !l), toggleClass(o, "im-page--mess-actions_pinned", c), toggleClass(o, "im-page--mess-actions_vkcomgroup", u && !n.get().gid), toggleClass(o, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(o, "im-page--mess-actions_no-pin-btn", !d), toggleClass(o, "im-page--mess-actions_out-mr", g), toggleClass(o, "im-page--mess-actions_in-mr", p), t.length > 1 ? m.innerHTML = getLang("mail_forward_here") : m.innerHTML = getLang("mail_im_mark_reply");
            var h = l ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
                _ = c ? getLang("mail_unpin") : getLang("mail_pin");
            attr(geByClass1("im-page-action_star", e), "aria-label", h), attr(geByClass1("im-page-action_pin", e), "aria-label", _)
        }

        function Jn(e, t, n) {
            var s = t.get(),
                o = s.peer,
                l = s.tabs[o],
                c = clean(stripHTML(unclean(l.tab))),
                d = geByClass1(Fn, e),
                u = geByClass1(r.PINNED_CONTAINER_CLASS),
                m = Object(r.isChatPeer)(o),
                g = m && Object(r.isFvkcomgroup)(t, o);
            d.tt = !1;
            var p = Object(r.renderPhotosFromTab)(t, l, !0),
                h = getTemplate("im_simple_link", {
                    href: g ? "/club" + -l.ownerId : l.href,
                    content: getTemplate("im_peer_photo", {
                        online_class: "",
                        owner_photo: p,
                        modifier_class: "nim-peer_smaller"
                    })
                });
            val(geByClass1("im-page--aside-photo", e), h);
            var _ = m ? !l.data.closed && !l.data.kicked : 0,
                f = {
                    muted: inArray(o, s.mutedPeers),
                    verified: !!l.verified,
                    chat: m,
                    vkcomgroup: g,
                    actions: !1,
                    derelict: m && !_ && !g,
                    pinned: !1
                };
            if (m) {
                var b = Object(i.getPinnedMessage)(t),
                    v = function(e) {
                        var t = Object(i.getPinnedMessage)(e);
                        if (!t || Object(D.oCacheGet)(e, t.userId)) return !1;
                        return t.userId
                    }(t);
                b && Object(Ce.isPinnedMessageVisibleInTab)(t, o) && (v ? t.set(a.loadChatMember.bind(null, {
                    [o]: [v]
                })).then(Jn.bind(null, e, t, n)) : f.pinned = !0)
            }
            var y = "";
            m ? y = g ? getTemplate("im_vkcomgroup_members", {
                name: getLang("mail_im_n_vkcomgroup_members", Object(r.getAliveMembersCount)(l))
            }) : _ ? getTemplate("im_chat_members", {
                name: getLang("mail_im_n_chat_members", Object(r.getAliveMembersCount)(l))
            }) : "" : Object(r.isUserPeer)(o) && (y = Object(r.getLastSeenTextInHeader)(t, o));
            var O = getTemplate("im_simple_name", {
                name: l.tab,
                href: g ? "/club" + -l.ownerId : l.href,
                name_attr: c,
                ads_union: l.ad_union_ids_attr,
                online: y,
                more_cls: "" === y ? "im-page--title--1line" : ""
            });
            val(geByClass1("im-page--title-wrapper", e), O);
            var E = val(u) && !l.top_banner,
                C = Zn(t) && !l.top_banner,
                w = geByClass1(Pn, e);
            if (removeClass(w, r.DESELECT_ALL_CLASS), show(geByClass1(xn, e)), removeClass(geByClass1(Nn, e), "im-page--mess-actions_visible"), removeClass(geByClass1(Nn, e), "im-page--mess-actions_all-sel"), function(e, t, n) {
                    geByClass("_im_header_icon", e).forEach(e => {
                        if (n.length > 0) hide(e);
                        else if ("star" === domData(e, "type") && Object(r.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_star-active", Object(r.isImportant)(t)), setStyle(e, {
                                display: "inline-block"
                            })), "answer" === domData(e, "type") && Object(r.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", Object(r.isUnrespond)(t)), Object(r.isUnrespond)(t) ? setStyle(e, {
                                display: "inline-block"
                            }) : hide(e)), "search" === domData(e, "type") && !Object(r.isCommunityInterface)(t)) {
                            var a = Object(r.isFullyLoadedTab)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                            setStyle(e, {
                                display: "inline-block"
                            }), toggleClass(e, "im-page-header-icon_search-shown", a)
                        }
                    })
                }(e, t, []), Object(r.isClassicInterface)(t)) {
                var j = geByClass1("_im_page_back", e);
                attr(j, "href", `${Object(r.getBaseLink)(t)}?tab=${s.active_tab}`)
            }
            ea(f, "im-page--chat-header"), Object(r.compensateHistoryHeightChange)(t, C, E, n)
        }

        function Zn(e) {
            var t = Object(i.getPinnedMessage)(e),
                n = geByClass1(r.PINNED_CONTAINER_CLASS);
            if (removeClass(n, "im-page--pinned_with-bar"), t && Object(s.isMoneyRequest)(t)) {
                if (void 0 === t.kludges.attach1_tr_amount) return;
                t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
            }
            var a = Object(r.renderPinnedMessage)(e);
            return val(n, a), !!a
        }

        function ea(e, t) {
            var n = geByClass1(t);
            Object.keys(e).forEach(a => {
                toggleClass(n, `${t}_${a}`, !!e[a])
            })
        }

        function ta(e, t, n, r, i) {
            e.set(a.removeMessagesWithRestore.bind(null, n, i, r)).then(t().removeMessagesRestore.bind(null, n, i, r)), Object(a.removeMessageSend)(n, i, null, r, e.get())
        }

        function na(e, t, n) {
            if (Object(r.isChatPeer)(t)) {
                var i = e.get().tabs[t].name,
                    s = function(e, t, n, r, i, s) {
                        if ("keydown" !== s.type || 13 === s.which) {
                            var o = trim(val(i));
                            return o ? (o !== n && e.set(a.updateChatTopic.bind(null, t, o)), !0) : (notaBene(i), !1)
                        }
                    }.bind(null, e, t, i, n),
                    o = showFastBox({
                        title: getLang("mail_chat_topic_change_title"),
                        dark: 1
                    }, getTemplate("im_chat_change_topic", {
                        value: i
                    }), getLang("global_save"), function(e, t) {
                        s(l, t) && o.hide()
                    }, getLang("global_cancel"), function() {
                        o.hide()
                    }),
                    l = geByClass1(Bn, o.bodyNode);
                elfocus(l), addEvent(l, "keydown", function(e) {
                    s(l, e) && o.hide()
                })
            }
        }

        function aa(e, t, n, s, o, c) {
            var d = domData(c, "action"),
                u = geByClass1(Dn, s).parentNode,
                m = e.get().peer;
            switch (d) {
                case "clear":
                    var g = Object(i.getTab)(e, m),
                        p = Object(r.showFlushChat)(g, m, () => {
                            Object(r.cleanHistory)(e, p, t, a.flushHistory, e.get().peer)
                        });
                    break;
                case "photos":
                case "media":
                    showWiki({
                        w: "history" + Object(r.convertPeerToUrl)(m) + "_photo"
                    }, null, {});
                    break;
                case "topic":
                    na(e, m, t);
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
                    e.set(a.toggleCommunityMessages.bind(null, !1, m)).then(() => {
                        e.get().longpoll.push([Object(l.resetPeer)()]), showDoneBox(getLang("mail_community_was_blocked"))
                    });
                    break;
                case "allow_community":
                    e.set(a.toggleCommunityMessages.bind(null, !0, m)).then(() => {
                        n().changeActions(e)
                    });
                    break;
                case "block":
                    Object(r.showBlacklistBox)(m, e).once("success", t => {
                        t.delta && (showDoneBox(t.msg), e.get().longpoll.push([Object(l.resetPeer)()]))
                    });
                    break;
                case "leave":
                    var h = Object(r.showLeaveDialog)(e, m, n => {
                        n && Object(r.cleanHistory)(e, h, t, a.flushHistory, m), e.set(a.leaveChat.bind(null, m)), e.set(a.unpinMessageOptimistic.bind(null, m)), h.hide(), e.get().longpoll.push([Object(l.resetPeer)()])
                    });
                    break;
                case "invite_link":
                    var _ = function(e, t, n) {
                            var r = showFastBox({
                                title: getLang("mail_chat_invite_link"),
                                dark: 1
                            }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(i) {
                                var s = gpeByClass("_im_invite_box", n.target),
                                    o = geByClass1($n, s),
                                    l = geByClass1("_im_invite_new", s);
                                lockButton(r.btns.ok[0]), Object(a.resetInviteLink)(t, e.get()).then(e => {
                                    var t = An(e, 1)[0];
                                    unlockButton(r.btns.ok[0]), o.value = t, unlockButton(l), addClass(s, "im-invite-box_reseted"), elfocus(o, 0, t.length), r.hide()
                                })
                            }, getLang("global_cancel"), function() {
                                r.hide()
                            })
                        }.bind(null, e, m),
                        f = !1,
                        b = !1,
                        v = !1,
                        y = () => {
                            elfocus(f, 0, f.value.length), document.execCommand("copy"), setStyle(b, {
                                opacity: 1
                            }), v && (v = clearTimeout(v)), v = setTimeout(() => setStyle(b, {
                                opacity: 0
                            }), 2e3)
                        },
                        O = !1,
                        E = !1;
                    showBox("al_im.php", {
                        act: "a_get_link",
                        gid: e.get().gid,
                        chat_id: m - 2e9,
                        markup: 1
                    }, {
                        onDone: e => {
                            f = geByClass1($n, e.bodyNode), O = geByClass1("_im_reset_link", e.bodyNode), E = geByClass1("_im_invite_copy", e.bodyNode), b = geByClass1("_im_invite_copied", e.bodyNode), elfocus(f, 0, f.value.length), addEvent(O, "click", _), addEvent(E, "click", y)
                        },
                        params: {
                            hideButtons: !0,
                            onHide: () => {
                                removeEvent(O, "click", _), removeEvent(E, "click", y)
                            },
                            onShow: () => {
                                addEvent(O, "click", _), addEvent(E, "click", y)
                            }
                        }
                    }, {});
                    break;
                case "return":
                    e.set(a.returnToChat.bind(null, m)).then(e => e.set(a.getPinnedMessage.bind(null, m))).then(t().updateChatTopic.bind(null, m)).catch(e => {
                        showFastBox(getLang("global_error"), e)
                    });
                    break;
                case "unmute":
                case "mute":
                    e.set(a.toggleMutePeer.bind(null, m, "mute" === d)).then(t().updateState.bind(null, m));
                    break;
                case "chat":
                case "invite":
                    if (Object(r.isChatPeer)(m)) Object(r.inviteUser)(e, m, t, a.setCreationType);
                    else if (Object(r.isUserPeer)(m)) {
                        var C = e.get().tabs[m],
                            w = [
                                [m, C.tab]
                            ];
                        e.set(a.setCreationType.bind(null, "chat", [])).then(() => t().showCreation(e, w))
                    }
                    break;
                case "pin_hide":
                    Object(Ce.pinnedMessageHide)(e, Object(i.getPeer)(e), t);
                    break;
                case "pin_unhide":
                    Object(Ce.pinnedMessageUnHide)(e, Object(i.getPeer)(e), t);
                    break;
                case "unpin":
                    Object(Ce.pinnedMessageUnpin)(e, Object(i.getPeer)(e), t);
                    break;
                case "settings":
                    n().showSettings(e)
            }
            uiActionsMenu.toggle(u, !1), t().cancelEditing()
        }

        function ra(e, t, n) {
            var r = e.get().selectedMessages;
            e.set(a.cleanSelected).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
        }

        function ia(e, t, n, a) {
            var i, s, o = Object(r.isClassicInterface)(e);
            switch (domData(a, "type")) {
                case "star":
                    s = [4, 6], i = () => Object(r.isImportant)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important");
                    break;
                case "answer":
                    s = [4, 6], i = getLang("mail_end_conversation");
                    break;
                case "search":
                    s = o ? [5, 6] : [4, -9], i = getLang("mail_search_in_peer")
            }
            showTooltip(a, {
                text: i || "",
                black: 1,
                shift: s,
                forcetoup: !0,
                appendParentCls: o ? "_im_dialog_actions" : "_im_mess_actions"
            })
        }

        function sa(e, t) {
            var n = e.get(),
                a = n.selectedMessages,
                r = n.peer;
            switch (t) {
                case "pin":
                    return Qn(a, e) ? getLang("mail_unpin") : getLang("mail_pin");
                case "star":
                    return Yn(a, e, r) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
                case "delete":
                    return getLang("mail_delete");
                case "spam":
                    return getLang("mail_im_mark_spam")
            }
        }

        function oa(e, t) {
            var n = Number(t),
                a = Object(r.formatTimespan)(n, !0),
                i = getLang("mail_network_waiting").replace(/{timer}/gi, a);
            e.querySelector(Kn).innerHTML = i
        }

        function la(e, t, n, s) {
            var l = {};
            return {
                changeActions(t) {
                    var n = geByClass1(Dn, e),
                        r = geByClass1(xn, e),
                        i = t.get().curActions,
                        s = Object.keys(i).map((e, t) => {
                            var n = "";
                            return 7 !== a.ACTION_PRIORITIES[e] && 10 !== a.ACTION_PRIORITIES[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(Wn, {
                                name: i[e].name,
                                icon: i[e].icon,
                                action: e
                            })
                        }).join("");
                    0 === Object.keys(i).length ? addClass(r, "im-page--header-more_loading") : (val(n, s), removeClass(r, "im-page--header-more_loading"))
                },
                setNetworkWaitingStatus(t) {
                    l.interval && clearInterval(l.interval), oa(e, t), l.timeout = t, l.interval = setInterval(() => {
                        l.timeout > 1 ? (l.timeout--, oa(e, l.timeout)) : (clearInterval(l.interval), l = {})
                    }, 1e3)
                },
                setNetworkReconnectingStatus() {
                    var t, n;
                    l.interval && clearInterval(l.interval), l = {}, t = e.querySelector(Kn), n = getLang("mail_network_reconnecting"), t && (t.innerHTML = n)
                },
                clearNetworkStatus() {
                    l.interval && clearInterval(l.interval), l = {}, e.querySelector(Kn).innerHTML = ""
                },
                showSettings(e) {
                    var t = e.get(),
                        n = Object(i.getTab)(e, t.peer);
                    n.data.closed || n.data.kicked || Gt(0, e)
                },
                showForward(e) {
                    Mn(0, e)
                },
                renderPeer(n) {
                    Jn(e, n, t)
                },
                reRenderPinned(e) {
                    var t = Object(i.getCurrentTab)(e);
                    t && t.pinned && Zn(e)
                },
                renderActions(t) {
                    var n = t.get().selectedMessages || [];
                    n.length > 0 && Xn(e, n, t)
                },
                hideActions(t) {
                    if (!Object(r.isFullyLoadedTab)(t, t.get().peer)) {
                        var n = geByClass1(xn, e);
                        addClass(n, "im-page--header-more_loading")
                    }
                },
                changedMessageSelection(n) {
                    if (0 !== n.get().peer) {
                        var a = n.get().selectedMessages || [];
                        a.length > 0 ? Xn(e, a, n) : Jn(e, n, t)
                    }
                },
                updateLastSeen(t) {
                    ! function(e, t) {
                        var n = e.get().peer,
                            a = geByClass1("_im_page_peer_online", t);
                        a && Object(r.isUserPeer)(n) && Object(i.getTab)(e, n) && Object(r.applyInnerHtml)(a, Object(r.getLastSeenTextInHeader)(e, n))
                    }(t, e)
                },
                deselectAll(e) {
                    ra(e, t, s)
                },
                unmount() {
                    Object(o.destroyModule)(n), cancelStackFilter("fowrward")
                }
            }
        }

        function ca(e, t, n) {
            var s = Object(o.createMutations)(la),
                c = s.callMutations,
                d = s.bindMutations,
                u = function(e, t, n, s, o) {
                    var c = e.get().selectedMessages,
                        d = domData(o, "action"),
                        u = e.get().peer,
                        m = !0,
                        g = Object(i.getTab)(e, u);
                    if ("star" !== d && Object(i.tabIsOutgoingMessageRequest)(g)) return ra(e, t, n);
                    switch (d) {
                        case "delete":
                            var p = !(vk.id == u && !e.get().gid) && c.every(t => Object(r.canMessageBeDeletedForAll)(e, Object(i.getMessage)(e, u, t)));
                            if (p || c.length > 1) {
                                m = !1;
                                var h = Object(r.showMsgDeleteDialog)(u, c.length, p, r => {
                                    ra(e, t, n), h.hide(), cur.imDb.updateByKey("del_forall_checked", r), r ? Object(a.removeMessageSend)(c, u, null, "deleteforall", e.get()) : ta(e, t, c, d, u)
                                })
                            } else ta(e, t, c, d, u);
                            break;
                        case "spam":
                            ta(e, t, c, d, u);
                            break;
                        case "forward":
                            Object(a.processFwd)(c, e.get().peer, e).then(t => e.set(a.prepareForward.bind(null, t))).then(() => n().showForward(e)).catch(e => console.error(e));
                            break;
                        case "star":
                            var _ = Yn(c, e, u);
                            e.set(a.favMessage.bind(null, c, _, u)), e.get().longpoll.push(c.map(e => ({
                                type: _ ? l.SET_FLAGS : l.RESET_FLAGS,
                                messageId: e,
                                peerId: u,
                                flags: l.FLAG_IMPORTANT
                            })));
                            break;
                        case "respond":
                            var f = e.get(),
                                b = 1 === c.length;
                            Object(a.processFwd)(c, f.peer, e).then(t => e.set(a.forwardMessages.bind(null, t, f.tfdraft, b))).then(() => {
                                t().respond(e, u)
                            });
                            break;
                        case "pin":
                            var v = Object(i.getLocalId)(e, c[0]),
                                y = Qn(c, e),
                                O = y ? a.unpinMessageOptimistic.bind(null, u) : a.pinMessageOptimistic.bind(null, v, u),
                                E = y ? a.unpinMessage.bind(null, u) : a.pinMessage.bind(null, v, u),
                                C = function(e, t, n) {
                                    return e().updateChatTopic(t, n), n
                                }.bind(null, t, u);
                            e.set(a.checkChatMember.bind(null, e, v, u)).then(e => e.set(O)).then(C).then(e => e.set(E)).then(C)
                    }
                    m && ra(e, t, n)
                }.bind(null, t, n, c),
                m = aa.bind(null, t, n, c, e),
                g = ra.bind(null, t, n, c),
                p = (e, n) => Object(r.showVerifiedTooltip)(n, t.get().peer),
                h = ia.bind(null, t, e),
                _ = function(e, t, n) {
                    var a = Object(r.isClassicInterface)(e),
                        i = domData(n.target, "action");
                    "respond" !== i && "forward" !== i && showTooltip(n.target, {
                        text: sa.bind(null, e, i) || "",
                        black: 1,
                        shift: [2, a ? -4 : 11],
                        forcetodown: !0,
                        appendParentCls: "_im_dialog_actions"
                    })
                }.bind(null, t, e),
                f = function(e, t, n, r, s) {
                    switch (domData(s, "type")) {
                        case "star":
                            e.set(a.toggleDialogImportant.bind(null, e.get().peer)).then(() => {
                                setTimeout(() => ia(e, 0, 0, s), 40)
                            });
                            break;
                        case "search":
                            n().showSearch(e), window.tooltips && tooltips.hide(s, {
                                fasthide: !0
                            });
                            break;
                        case "answer":
                            var o = Object(i.getTab)(e, e.get().peer);
                            o && (e.set(a.markDialogAnswered.bind(null, e.get().peer, o.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                                out: 1e3
                            }), e.get().longpoll.push([Object(l.resetPeer)()]))
                    }
                }.bind(null, t, e, n),
                b = () => c().showSettings(t),
                v = t => {
                    !gpeByClass(Hn, t.target, e) || gpeByClass(Un, t.target, e) || checkEvent(t) || (b(), cancelEvent(t))
                },
                y = () => (function(e) {
                    var t = () => {
                        e && (e.classList.remove(Vn), e.removeEventListener("mouseleave", t))
                    };
                    e && (e.classList.add(Vn), e.addEventListener("mouseleave", t)), window.lpConnect.abortWaiting()
                })(e),
                O = Object(o.createModule)({
                    handlers: (n, a) => {
                        a(e, "click", Rn, u), a(e, "click", Ln, m), a(e, "click", r.DESELECT_ALL_CLASS, g), a(e, "mouseover", Fn, p), a(e, "mouseover", "_im_header_icon", h), a(e, "mouseover", Rn, _), a(e, "click", "_im_header_icon", f), a(e, "click", "_im_header_link", v), a(e, "click", Gn, v), a(e, "click", qn, b), a(e, "click", zn, y), a(e, "click", "_im_page_back", e => {
                            checkEvent(e) || (t.get().longpoll.push([Object(l.resetPeer)()]), cancelEvent(e))
                        })
                    }
                });
            return Object(r.isReservedPeer)(t.get().peer) || setTimeout(() => {
                t.set(a.setActions).then(c().changeActions)
            }), d(e, n, O, c)
        }
        var da, ua, ma, ga, pa, ha, _a, fa, ba, va, ya, Oa, Ea, Ca, wa = n("g6Ay"),
            ja = 600,
            Sa = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest;

        function ka(e) {
            var t = e % 60;
            return parseInt(e / 60) + ":" + (t < 10 ? "0" : "") + t
        }
        var Ta = !1,
            Ia = !1,
            Ma = 100;

        function Aa(e) {
            if (!Ia) {
                Ia = !0, Object(r.lockButton)(ha);
                var t = {
                    peer: fa.get().peer,
                    from_place: cur.docsChooseFrom,
                    imhash: cur.docsChooseImHash,
                    blockPersonal: cur.docsChooseBlockPersonal,
                    mail_add: cur.docsChooseMailAdd
                };
                (function(e) {
                    return new Promise((t, n) => {
                        for (var a = new FormData, r = [], i = 0; i < e.wave.length; i++) r.push(parseInt(31 * e.wave[i]));
                        a.append("waveform", JSON.stringify(r)), a.append("file", e.buffer, "voice_message." + function(e) {
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
                        var s = new Sa;
                        s.onload = s.onerror = function(e) {
                            var a = e.currentTarget.response;
                            200 == this.status && a.length > 0 && "{" == a[0] ? (a = JSON.parse(a), t(a)) : n()
                        }, s.open("POST", Ca.upload_url, !0), s.send(a)
                    })
                })(e).then(e => e.file ? new Promise((n, a) => {
                    ajax.post("/docs.php", extend({
                        act: "a_save_doc",
                        from: "choose",
                        from_place: t.from_place,
                        imhash: t.imhash,
                        blockPersonal: t.blockPersonal,
                        mail_add: t.mail_add
                    }, e), {
                        onDone: (e, a) => {
                            xa(), ya([
                                ["doc", e + "_" + a, "audiomsg"]
                            ], {}, t.peer), Ua(), n()
                        },
                        onFail: function(e) {
                            a(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()).then(() => {
                    Object(r.unlockButton)(ha), Ia = !1
                }).catch(() => {
                    Ia = !1, Object(r.unlockButton)(ha), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
                })
            }
        }

        function La() {
            Ea(), ua.innerHTML = ka(Ta.duration), Ta.duration >= ja && Ha()
        }

        function Pa() {
            Ea(), stManager.add(["voice_message_player.js", "speech.js"], function() {
                Ta || (Ta = Speech.newRecorder(), addEvent(Ta, "progress", La)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Ta.record().then(() => {
                    ! function(e) {
                        Ca.isRecording = !0, cancelStackPush("audio_message_cancel", function(e) {
                            e.set(a.cancelRecording).then(Ba)
                        }.bind(null, e))
                    }(fa), hideProgress(geByClass1("im-audio-message-send-wrapper", da)), show(ha), ua.innerHTML = "0:00", addClass(da, "im-audio-message_recording"), removeClass(da, "im-audio-message_recorded"), show(da), hide(geByClass1("_im_chat_input_parent")), (va = Speech.createVisualization("wave", Ta.source, ma)).start();
                    var e = ma.getBoundingClientRect();
                    Ma = (e.right - e.left) / 3
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

        function Da() {
            Ta && Ta.stop(), va && (va.destroy(), va = null)
        }

        function xa() {
            Ca.isRecording = !1, cancelStackFilter("audio_message_cancel")
        }

        function Na() {
            Ra(), Aa(Ta)
        }

        function Ra() {
            var e;
            AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Ta, "finish", Ra), removeEvent(Ta, "finish", Na), e = URL.createObjectURL(Ta.buffer), domData(ba, "duration", Ta.duration), domData(ba, "ogg", e), domData(ba, "mp3", e), geByClass1("audio-msg-track--duration", ba).innerHTML = ka(Ta.duration), geByClass1("audio-msg-track--wave-wrapper", ba).innerHTML = AudioMessagePlayer.getWave(Ta.wave, Ma), removeClass(da, "im-audio-message_recording"), addClass(da, "im-audio-message_recorded")
        }

        function Ba() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            xa(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Ta, "finish", Ra), removeEvent(Ta, "finish", Na), Da(), Ua(), e && Oa()
        }

        function Fa() {
            Ta.isRecording ? (addEvent(Ta, "finish", Na), removeEvent(Ta, "finish", Ra), Da()) : Aa(Ta)
        }

        function Ha() {
            addEvent(Ta, "finish", Ra), removeEvent(Ta, "finish", Na), Da()
        }

        function Ua() {
            removeClass(da, "im-audio-message_recorded"), removeClass(da, "im-audio-message_recording"), hide(da), show(geByClass1("_im_chat_input_parent"))
        }

        function Ga() {
            ge("audiomsg_record"), ba = ge("audiomsg_player"), da = geByClass1("im-audio-message-input"), ua = geByClass1("audio-msg-track--duration", da), ma = geByClass1("audio-msg-track--wave", da), pa = geByClass1("im-audio-message--cancel-btn", da), ha = geByClass1("_im_audio_send", da), _a = geByClass1("audio-msg-track--btn", da), geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
            var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
            addClass(e, "_voice_field_wrap"), addEvent(ga, "click", Pa), addEvent(pa, "click", Ba), addEvent(ha, "click", Fa), addEvent(_a, "click", Ha)
        }

        function qa() {
            ! function() {
                Ta && removeEvent(Ta, "progress", La);
                removeEvent(ga, "click", Pa), removeEvent(pa, "click", Ba), removeEvent(ha, "click", Fa), removeEvent(_a, "click", Ha)
            }(), ba = da = ua = ma = ga = pa = ha = _a = null
        }

        function $a(e, t, n) {
            return {
                cancelRecording: Ba,
                start: function() {
                    Pa()
                },
                unmount() {
                    Ba(!1), qa()
                }
            }
        }

        function za(e, t, n, i, s) {
            return fa = t, Ca = t.get().audio_msg, Ea = function(e) {
                var t = e.get().peer;
                Object(r.isFullyLoadedTab)(e, t) && !Object(r.isAnyMessageBeingEdited)(e) && Date.now() - (Object(r.getTab)(e, t).lastTyping || 0) > 1e3 * a.ACTIVITY_PERIOD && e.set(a.sendRecordingAudio.bind(null, t))
            }.bind(null, t), ya = n, Oa = s, Object(wa.initFailBack)(), Object(r.getAvailableMicrophones)().then(e => {
                var n = e.length > 0;
                n ? (Ga(), i()) : setCookie("remixvoice", "0", 7), t.set(a.setVoiceMessageAvail.bind(null, n))
            }).catch(e => {
                throw setCookie("remixvoice", "0", 7), e
            }), (0, Object(o.createMutations)($a).bindMutations)(e, t, n)
        }
        var Ka = n("6aSF"),
            Va = n("nAFc"),
            Wa = n("/PiP"),
            Ya = n("EasH"),
            Qa = n("t7n3");

        function Xa() {
            return (Xa = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function Ja(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        var Za = 6217559,
            er = "vkpay",
            tr = "location",
            nr = "open_app";
        class ar extends we.Component {
            constructor() {
                super(...arguments), this.onButtonClick = () => {
                    var e = this.props,
                        t = e.action,
                        n = e.sendMessage,
                        a = e.appHash;
                    switch (t.type) {
                        case er:
                            t.app_id = Za;
                        case nr:
                            var r = t.app_id;
                            t.owner_id && (r += "_" + t.owner_id), Object(Wa.showWiki)({
                                w: "app" + r + encodeURIComponent("#" + t.hash),
                                from_keyboard: 1,
                                app_hash: a
                            });
                            break;
                        case tr:
                            cur.sendLocation = function(e, a) {
                                a(), n({
                                    action: {
                                        label: "",
                                        attaches: [e],
                                        payload: t.payload
                                    }
                                })
                            }, Object(Ya.showBox)("al_places.php", {
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
                }, this.getButtonAppearance = () => {
                    var e = this.props.action.app_id,
                        t = this.props.action.type,
                        n = this.props.color;
                    return n = (n = n.toLowerCase()).replace("default", "secondary"), t === nr && e === Za && (t = er), t === er && (n = "primary"), ["keyboard-button", n, t]
                }, this.getButtonLabel = e => {
                    var t = e.label;
                    switch (e.type) {
                        case tr:
                            t = getLang("mail_keyboard_label_location");
                            break;
                        case er:
                            t = (t = getLang("mail_keyboard_label_vkpay")).replace(/ VK Pay$/, "");
                            break;
                        default:
                            t = Object(Va.decodeHTMLEntities)(t || ""), t = Object(Qa.clean)(t).replace(/\n(\r)?/gi, " "), t = Emoji.emojiToHTML(t, !0)
                    }
                    return t
                }
            }
            render() {
                var e = this.props,
                    t = e.action,
                    n = (e.sendMessage, e.appHash, Ja(e, ["action", "sendMessage", "appHash"])),
                    a = this.getButtonAppearance(),
                    r = this.getButtonLabel(t);
                return we.createElement(Ie.default, Xa({
                    wide: !0,
                    overflow: !0
                }, n, {
                    type: t.type,
                    appearance: a,
                    onClick: this.onButtonClick,
                    dangerouslySetInnerHTML: {
                        __html: r
                    }
                }))
            }
        }
        var rr = Wt(class extends we.Component {
            render() {
                var e = this.props.store,
                    t = Object(i.getCurrentKeyboard)(e),
                    n = e.get().keyboard_app_hash;
                if (!t || !t.buttons) return null;
                var a = e => `calc(100% / ${e} - 10px)`;
                return we.createElement("div", {
                    className: Object(ke.classNames)("Keyboard", {
                        "Keyboard--hidden": t.hide
                    })
                }, we.createElement(Ka.default, {
                    className: "Keyboard__scroll-wrapper"
                }, we.createElement("div", {
                    className: "Keyboard__container"
                }, t.buttons.map((e, t) => we.createElement("div", {
                    key: `row-${t}`,
                    className: "Keyboard__row"
                }, e.map((t, r) => we.createElement("div", {
                    className: "Keyboard__button",
                    key: `row-${r}`,
                    style: {
                        width: a(e.length)
                    }
                }, we.createElement(ar, Xa({
                    sendMessage: this.props.send,
                    appHash: n
                }, t)))))))))
            }
        });

        function ir() {
            return document.getElementById("_im_keyboard_container")
        }

        function sr(e, t, n) {
            return {
                init() {
                    return new Promise(e => {
                        this.isMounted = !0,
                            function(e, t, n) {
                                var a = ir();
                                if (a) {
                                    var r = we.createElement(Vt, {
                                        value: e
                                    }, we.createElement(rr, {
                                        send: t
                                    }));
                                    je.render(r, a, n)
                                }
                            }(t, n, e)
                    })
                },
                toggle: (e, n, r) => t.set(a.toggleKeyboard.bind(null, e, n, r)),
                unmount() {
                    var t = ir();
                    t && this.isMounted && je.unmountComponentAtNode(t), this.isMounted = !1, Object(o.destroyModule)(e)
                }
            }
        }
        n("Oyvg");
        var or = Se.default.getLang;
        var lr = Wt(class extends we.Component {
            constructor() {
                super(...arguments), this.elementOnClick = (e, t) => {
                    t.preventDefault(), t.stopPropagation(), this.props.applyTemplate(e), this.toggleDropdown(!1)
                }, this.toggleDropdown = e => {
                    this.setState({
                        isShowDropDown: e
                    })
                }, this.state = {
                    isShowDropDown: !1
                }
            }
            render() {
                var e = this.props,
                    t = e.getTemplates,
                    n = e.showSettingsPopup,
                    a = e.showCreatingTemplatePopup,
                    r = e.isNeededRendering,
                    i = this.state.isShowDropDown;
                if (!r()) return null;
                var s = t();
                return we.createElement("div", {
                    className: "TemplatesDropDown",
                    onMouseOver: this.toggleDropdown.bind(this, !0),
                    onMouseOut: this.toggleDropdown.bind(this, !1)
                }, we.createElement("div", {
                    className: Object(ke.classNames)("TemplatesDropDown__wrapper", {
                        "TemplatesDropDown__wrapper--show": i
                    }),
                    "aria-hidden": i
                }, we.createElement("div", {
                    className: "TemplatesDropDown__container"
                }, we.createElement(Ka.default, {
                    className: "TemplatesDropDown__scroll-wrapper"
                }, we.createElement("div", null, " ", we.createElement("header", {
                    className: "TemplatesDropDown__header"
                }, we.createElement("h2", {
                    className: "TemplatesDropDown__title"
                }, or("mail_community_templates")), we.createElement("a", {
                    role: "button",
                    className: "TemplatesDropDown__setting-button",
                    onClick: n
                }, or("mail_settings_configure"))), s.length ? we.createElement("ul", {
                    className: "TemplatesDropDown__list"
                }, s.map(e => we.createElement("li", {
                    key: e.id,
                    className: "TemplatesDropDown__item",
                    onMouseDown: this.elementOnClick.bind(null, e.id)
                }, we.createElement("h3", {
                    className: "TemplatesDropDown__item-name",
                    dangerouslySetInnerHTML: {
                        __html: e.name
                    }
                }), we.createElement("div", {
                    className: "TemplatesDropDown__item-content",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                })))) : we.createElement("div", {
                    className: "TemplatesDropDown__not-found-container"
                }, we.createElement("span", null, or("mail_community_templates_not_found")), we.createElement(Re.default, {
                    onClick: a
                }, or("mail_add_community_template"))))))), we.createElement("button", {
                    className: "TemplatesDropDown__icon"
                }))
            }
        });

        function cr() {
            return (cr = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function dr(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }

        function ur(e, t) {
            var n = !!window.getSelection && window.getSelection(),
                a = !1;
            if (n && n.rangeCount) {
                var r = n.getRangeAt(0);
                a = r.commonAncestorContainer ? r.commonAncestorContainer : r.parentElement ? r.parentElement() : r.item(0)
            }
            for (var i = a; i && i != e;) i = i.parentNode;
            i || Emoji.editableFocus(e, !1, !0), Emoji.insertHTML(t)
        }
        class mr extends we.Component {
            constructor() {
                super(...arguments), this.onChange = () => {
                    this.props.onChange && this.props.onChange(Emoji.val(this.container))
                }, this.containerRef = we.createRef(), this.state = {
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
                    a = (e.initialValue, dr(e, ["tabIndex", "isMultiLine", "initialValue"]));
                return we.createElement("div", cr({
                    role: "textbox",
                    ref: this.containerRef,
                    tabIndex: t,
                    contentEditable: !0,
                    "aria-multiline": n
                }, a))
            }
        }
        mr.defaultProps = {
            isMultiLine: !1,
            tabIndex: 0,
            initialValue: ""
        };
        var gr = mr,
            pr = Se.default.getLang,
            hr = () => [{
                id: "user name",
                label: pr("mail_community_templates_hint_name"),
                process: e => Object(D.oCacheGet)(e, Object(i.getPeer)(e)).first_name
            }, {
                id: "user surname",
                label: pr("mail_community_templates_hint_last_name"),
                process(e) {
                    var t = Object(D.oCacheGet)(e, Object(i.getPeer)(e));
                    return t.name.replace(t.first_name, "").trim()
                }
            }, {
                id: "admin name",
                label: pr("mail_community_templates_hint_your_name"),
                process: e => Object(D.oCacheGet)(e, vk.id).first_name
            }, {
                id: "admin surname",
                label: pr("mail_community_templates_hint_your_last_name"),
                process(e) {
                    var t = Object(D.oCacheGet)(e, vk.id);
                    return t.name.replace(t.first_name, "").trim()
                }
            }, {
                id: "community",
                label: pr("mail_community_templates_hint_community"),
                process: e => Object(D.oCacheGet)(e, e.get().id).name
            }, {
                id: "greeting",
                label: pr("mail_community_templates_hint_greeting"),
                process(e) {
                    var t = (new Date).getHours();
                    return pr(t >= 3 && t < 12 ? "mail_greeting_good_morning" : t >= 12 && t < 17 ? "mail_greeting_good_afternoon" : t >= 17 && t <= 23 ? "mail_greeting_good_evening" : "mail_greeting_good_night")
                }
            }],
            _r = Se.default.getLang,
            fr = "main",
            br = "edit";
        class vr extends we.Component {
            constructor() {
                super(...arguments), this.setEditableMessage = e => {
                    var t = e.id,
                        n = e.name,
                        a = e.text;
                    return new Promise(e => this.setState({
                        editableMessage: {
                            id: t,
                            name: n,
                            text: a
                        }
                    }, e))
                }, this.onChangeEditableMessage = (e, t) => this.setEditableMessage(Object.assign({}, this.state.editableMessage, {
                    [e]: Object(Va.escape)(t)
                })), this.deleteTemplate = e => Promise.resolve().then(() => this.state.section !== fr ? this.go(fr) : Promise.resolve()).then(() => this.props.store.set(a.deleteTemplate.bind(null, e))).catch(() => {
                    showFastBox(_r("mail_error"), _r("mail_community_templates_delete_error"))
                }), this.saveTemplate = e => {
                    e.preventDefault();
                    var t = this.state.editableMessage,
                        n = t.name,
                        a = t.text;
                    n.length > 200 || n.length < 2 || n.length > 2e3 || a.length < 5 ? showFastBox(_r("mail_error"), _r("mail_form_is_filled_in_incorrectly")) : this.props.saveTemplate(t).catch(() => {
                        showFastBox(_r("mail_error"), _r("mail_community_templates_save_error"))
                    }).then(() => this.go(fr))
                }, this.addHint = (e, t) => {
                    t.preventDefault();
                    var n = this.state.editableMessage,
                        a = n.id,
                        r = void 0 === a ? null : a,
                        i = n.name,
                        s = n.text;
                    return ur(this.textarea, `{${e.id}}`), this.setEditableMessage({
                        id: r,
                        name: i,
                        text: `${s}{${e.id}} `
                    })
                }, this.getTextAreaRef = e => {
                    this.textarea = (e || {}).container
                }, this.state = {
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
                    a = void 0 === n ? null : n,
                    r = t.name,
                    i = void 0 === r ? "" : r,
                    s = t.text,
                    o = void 0 === s ? "" : s;
                return new Promise(t => {
                    this.state.section !== e ? this.setState({
                        section: e,
                        editableMessage: {
                            id: a,
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
                    a = this.state,
                    r = a.section,
                    i = a.editableMessage,
                    s = t();
                return we.createElement("section", {
                    className: "TemplatesSettings"
                }, we.createElement(Te, {
                    title: we.createElement("span", {
                        className: "TemplatesSettings__title"
                    }, r === fr && _r("mail_community_templates"), r === br && _r("mail_add_community_template")),
                    onCloseClick: n
                }), we.createElement("main", {
                    className: "TemplatesSettings__content"
                }, r === fr && (s.length ? we.createElement(Ka.default, {
                    className: "TemplatesSettings__scroll-wrapper"
                }, we.createElement("div", {
                    className: "TemplatesSettings__list"
                }, s.map(e => we.createElement("section", {
                    key: e.id,
                    className: "TemplatesSettings__item"
                }, we.createElement("h3", {
                    className: "TemplatesSettings__item-name",
                    dangerouslySetInnerHTML: {
                        __html: e.name
                    }
                }), we.createElement("div", {
                    className: "TemplatesSettings__item-content",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                }), we.createElement("div", {
                    className: "TemplatesSettings__buttons-row"
                }, we.createElement(Re.default, {
                    onClick: () => this.go(br, e),
                    className: "TemplatesSettings__item-button"
                }, _r("mail_settings_edit")), we.createElement("span", {
                    className: "TemplatesSettings__buttons-splitter",
                    "aria-hidden": "true"
                }, " · "), we.createElement(Re.default, {
                    onClick: this.deleteTemplate.bind(null, e.id),
                    className: "TemplatesSettings__item-button"
                }, _r("mail_delete"))))))) : we.createElement("div", {
                    className: "TemplatesSettings__not-found-container"
                }, we.createElement("span", null, _r("mail_community_templates_not_found")), we.createElement(Re.default, {
                    onClick: () => this.go(br)
                }, _r("mail_add_community_template")))), r === br && we.createElement("form", {
                    className: "TemplatesSettings__form",
                    id: "create_template_form",
                    onSubmit: this.saveTemplate
                }, we.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, we.createElement("label", {
                    className: "TemplatesSettings__label",
                    htmlFor: "name"
                }, _r("mail_name"), ":"), we.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, we.createElement(gr, {
                    id: "name",
                    type: "text",
                    initialValue: i.name,
                    className: "TemplatesSettings__input",
                    onChange: this.onChangeEditableMessage.bind(null, "name")
                }), we.createElement("span", {
                    className: "TemplatesSettings__notice"
                }, _r("mail_community_templates_input_size").replace("{min}", 2).replace("{max}", "200")))), we.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, we.createElement("label", {
                    className: "TemplatesSettings__label",
                    htmlFor: "text"
                }, _r("mail_text"), ":"), we.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, we.createElement(gr, {
                    id: "text",
                    name: "text",
                    isMultiLine: !0,
                    ref: this.getTextAreaRef,
                    initialValue: i.text,
                    className: "TemplatesSettings__textarea",
                    onChange: this.onChangeEditableMessage.bind(null, "text")
                }), we.createElement("span", {
                    className: "TemplatesSettings__notice"
                }, _r("mail_community_templates_input_size").replace("{min}", 5).replace("{max}", "2 000")))), we.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, we.createElement("label", {
                    className: "TemplatesSettings__label"
                }, _r("mail_hints"), ":"), we.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, hr().map(e => we.createElement(Ie.default, {
                    type: "button",
                    onMouseDown: this.addHint.bind(null, e),
                    appearance: "secondary",
                    className: "TemplatesSettings__hint",
                    key: e.id
                }, e.label)))))), we.createElement("footer", {
                    className: "TemplatesSettings__footer"
                }, r === fr && we.createElement(we.Fragment, null, we.createElement(Re.default, {
                    onClick: () => this.go(br)
                }, _r("mail_add_community_template")), we.createElement(Ie.default, {
                    onClick: n
                }, _r("mail_close"))), r === br && we.createElement(we.Fragment, null, we.createElement("div", null, i.id && we.createElement(Re.default, {
                    onClick: this.deleteTemplate.bind(null, i.id)
                }, _r("mail_delete_community_template"))), we.createElement("div", null, we.createElement(Ie.default, {
                    appearance: "tertiary",
                    onClick: () => this.go(fr)
                }, _r("mail_cancel")), we.createElement(Ie.default, {
                    onClick: this.saveTemplate,
                    form: "create_template_form",
                    type: "submit"
                }, _r("mail_save"))))))
            }
        }
        vr.defaultProps = {
            section: fr
        };
        var yr = Wt(vr),
            Or = window.MessageBox;

        function Er(e, t) {
            return hr().reduce((t, n) => t.replace(new RegExp(`({${n.id}})`, "gi"), n.process(e)), t).replace(/&lt;br&gt;/gi, "<br>")
        }

        function Cr(e, t, n, r, s) {
            var o;
            return {
                closeSettingsPopup() {
                    o && o.hide()
                },
                showSettingsPopup(e) {
                    var n = {
                        hideButtons: !0,
                        bodyStyle: "padding: 0; background: none;",
                        width: 500,
                        onShow: () => {
                            var n = document.getElementById("TemplatesSettings");
                            n && je.render(we.createElement(Vt, {
                                value: t
                            }, we.createElement(yr, {
                                popup: o,
                                section: e,
                                getTemplates: () => Object(i.getTemplates)(t),
                                saveTemplate: this.saveTemplate.bind(this),
                                deleteTemplate: this.deleteTemplate.bind(this),
                                closePopup: this.closeSettingsPopup.bind(this)
                            })), n), requestAnimationFrame(() => o.updateBoxCoords())
                        }
                    };
                    (o = new Or(n).content('<div id="TemplatesSettings"></div>')).show()
                },
                applyTemplate(e) {
                    var n = Object(i.getTemplates)(t).find(t => {
                        return t.id === e
                    });
                    Object(Oe.statlogsCommunityTemplatesClickEvent)(t, n.id), r(Er(t, Object(Va.prepareToWriting)(n.text)))
                },
                getPreparedTemplates: () => Object(i.getTemplates)(t).map(e => Object.assign({}, e, {
                    name: e.name,
                    text: Er(t, e.text)
                })),
                saveTemplate(e) {
                    var n = Object(Va.decodeHTMLEntities)(e.name),
                        r = Object(Va.decodeHTMLEntities)(e.text);
                    return t.set(e.id ? a.updateTemplate.bind(null, e.id, n, r) : a.createTemplate.bind(null, n, r))
                },
                deleteTemplate: e => t.set(a.deleteTemplate.bind(null, e)),
                isNeedRenderTemplates: () => !!Object(i.getPeer)(t) && (!!Object(i.isCommunityInterface)(t) && !(Object(i.getPeer)(t) > 2e9 && Object(x.doesChatTabHaveFlag)(Object(i.getCurrentTab)(t), 1024))),
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

        function wr(e, t) {
            return t.queues[e].currEv = !1, Promise.resolve(t)
        }

        function jr(e, t) {
            var n = t.queues[e].currEv;
            return n ? (t.queues[e].errored.push(n), wr(e, t)) : Promise.resolve(t)
        }

        function Sr(e, t, n) {
            return n.queues[e] ? (n.queues[e].errored = t ? [] : n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], wr(e, n)) : Promise.resolve(n)
        }

        function kr(e, t, n, a) {
            var r = a.get().queues[e];
            if (r && !r.currEv && r.evs.length > 0 && !r.pause) {
                var i = kr.bind(null, e, t, n, a),
                    s = r.evs.shift();
                r.currEv = s, t(e, s).then(() => {
                    a.get().opts.waitCommit || a.set(wr.bind(null, e))
                }).then(i).catch(t => a.set(jr.bind(null, e)).then(() => {
                    n(e, function(e, t) {
                        var n = Tr(e, t.get()).errored;
                        return n.length > 0 && n[n.length - 1]
                    }(e, a), t)
                }).then(i))
            }
        }

        function Tr(e, t) {
            return t.queues[e] || (t.queues[e] = {
                evs: [],
                pause: !1,
                errored: [],
                currEv: !1
            }), t.queues[e]
        }

        function Ir(e, t, n) {
            return Tr(e, n).pause = t, Promise.resolve(n)
        }

        function Mr(e) {
            Object.keys(e.get().queues).forEach(t => {
                e.set(jr.bind(null, t)), e.set(Sr.bind(null, t, !1))
            })
        }

        function Ar(e, t, n) {
            var a = _({
                queues: {},
                debug: n && n.debug,
                opts: extend({}, n)
            }, n);
            return n && n.store ? (a.setState(function(e) {
                for (var t = {}, n = Object.keys(e.queues), a = n.length, r = 0; r < a; r++) {
                    var i = n[r],
                        s = e.queues[i];
                    (s.currEv || s.evs.length || s.errored.length) && (t[i] = s)
                }
                return {
                    queues: t,
                    opts: e.opts
                }
            }(a.get())), Mr(a)) : Mr(a), {
                pushMessage: (n, r) => a.set(function(e, t, n) {
                    return t.ts = Date.now(), Tr(e, n).evs.push(t), Promise.resolve(n)
                }.bind(null, n, r)).then(a => {
                    kr(n, e, t, a)
                }),
                resend: (n, r) => a.set(function(e, t, n) {
                    var a = n.queues[e];
                    return a.errored.filter(e => e.mess.messageId === t).forEach(e => {
                        e.failed = !1, a.evs.push(e)
                    }), a.errored = a.errored.filter(e => e.mess.messageId !== t), Promise.resolve(n)
                }.bind(null, n, r)).then(i => {
                    var s = a.get().queues[n].evs.filter(e => e.mess.messageId === r)[0];
                    return kr(n, e, t, a), s
                }),
                reset: n => a.set(Sr.bind(null, n, !0)).then(a => {
                    kr(n, e, t, a)
                }),
                setErrored: (e, t) => a.set(n => {
                    return Tr(e, n).errored = t, Promise.resolve(n)
                }),
                pause(e) {
                    a.set(Ir.bind(null, e, !0))
                },
                isPaused: e => !!Tr(e, a.get()).pause,
                complete(n, r) {
                    var i = a.get();
                    i.queues[n].currEv && i.queues[n].currEv.rid === r && a.set(wr.bind(null, n)).then(() => {
                        kr(n, e, t, a)
                    })
                },
                resume(n) {
                    a.set(Ir.bind(null, n, !1)).then(Object(dt.pause)(.1)).then(() => {
                        kr(n, e, t, a)
                    })
                },
                inspectQueue(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (!a.get().queues[e]) return [];
                    var n = a.get().queues[e];
                    return (t && n.currEv ? [n.currEv] : []).concat(n.evs.slice()).concat(n.errored.slice().map(e => extend({}, e, {
                        failed: !0
                    }))).sort((e, t) => e.ts - t.ts)
                }
            }
        }
        var Lr = n("hOuX"),
            Pr = (n("HEwt"), n("rCUf")),
            Dr = "_im_upload_dropbox",
            xr = "jpg jpeg png gif heic heif".split(" "),
            Nr = ["application/vnd.rn-realmedia-vbr", "application/vnd.rn-realmedia"];

        function Rr(e) {
            var t = xr.slice(0, xr.length);
            if ("types" === e) {
                for (var n = t.length, a = 0; a < n; ++a) t.push(t[a].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + xr.join(",.") : "mask" === e ? xr.join("|") : ""
        }

        function Br(e, t, n) {
            var a = void 0 !== t.ind ? t.ind : t,
                r = t.fileName ? a + "_" + t.fileName : t;
            if (re("upload" + r + "_progress_wrap"), e().unchoose(r), !geByClass1("popup_box_container")) {
                var i = getLang("mail_add_doc_error");
                "photo" === Upload.options[a].file_name ? i = getLang("mail_add_photo_error") : "video_file" === Upload.options[a].file_name && (i = getLang("video_upload_error")), setTimeout(showFastBox({
                    title: getLang("global_error")
                }, i).hide, 2e3)
            }
            topError("Upload failed", {
                dt: -1,
                type: 102,
                url: (ge("file_uploader_form" + a) || {}).action
            }), Upload.embed(a)
        }

        function Fr(e) {
            var t = void 0 !== e.ind ? e.ind : e,
                n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                a = n ? t + "_" + n : e,
                r = ge("upload" + a + "_progress_wrap");
            return r && hide(geByClass1("progress_x", r)), a
        }

        function Hr(e, t) {
            if (!e().canAddMedia()) return "none";
            if (!t.items || !t.items.length) return "media";
            var n = "^(" + Rr("mask") + ")";
            return [].slice.call(t.items).every(e => {
                var t = e.type.split("/");
                return new RegExp(n, "i").test(t[1])
            }) ? "photo" : [].slice.call(t.items).every(e => {
                return "video" === e.type.split("/")[0] || ~Nr.indexOf(e.type)
            }) ? "video" : "doc"
        }

        function Ur(e) {
            var t = geByClass1(Dr),
                n = geByClass1("im-page--chat-header").getBoundingClientRect(),
                a = geByClass1("im-chat-input").getBoundingClientRect();
            (n.width < 10 || a.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = a.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
        }

        function Gr() {
            var e = geByClass1(Dr);
            hide(e)
        }

        function qr(e, t, n) {
            return {
                loaded: t,
                total: n,
                fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
            }
        }

        function $r(e, t, n, a) {
            "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e), a().reHeight(n)
        }

        function zr(e, t, n, a) {
            var r = t.get().upload_opts,
                i = geByClass1("_im_upload_photo"),
                s = geByClass1("_im_drop_photo");
            return Upload.init(i, r.url, r.params, {
                accept: Rr("accept"),
                file_name: "photo",
                file_size_limit: 26214400,
                file_types: Rr("types"),
                file_match: r.opts.ext_re,
                lang: r.opts.lang,
                multiple: 1,
                multi_progress: 1,
                max_files: 10,
                chooseBox: 1,
                clear: 1,
                type: "photo",
                max_attempts: 3,
                server: r.opts.server,
                error: r.opts.default_error,
                error_hash: r.opts.error_hash,
                dropbox: s,
                dragEl: bodyNode,
                onNoFilteredCallback(e) {
                    Upload.onFileApiSend(a, e)
                },
                onUploadStart(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete(e, a) {
                    var r = window.parseJSON(a);
                    r.photos ? function(e, t, n, a) {
                        var r = Fr(e);
                        ajax.post("al_photos.php", extend({
                            act: "choose_uploaded"
                        }, t), {
                            onDone: function(e, t) {
                                a().choose("photo", e, extend(t, {
                                    upload_ind: r
                                }))
                            },
                            onFail: Br.bind(null, a, e)
                        })
                    }(e, r, 0, n) : $r(e, a, t, n)
                },
                onUploadProgress(e, t, a) {
                    var r = void 0 !== e.ind ? e.ind : e;
                    n().progress("photo", r, qr(e, t, a))
                },
                onUploadError(e, t) {
                    statlogsValueEvent("upload_photo_fails", 1, r.opts.server, t), Br(n, e)
                },
                onDragEnter(e) {
                    var t = geByClass1("im-audio-message_recording");
                    e.dataTransfer && !t && Ur(Hr(n, e.dataTransfer))
                },
                onDragOut() {
                    Gr()
                },
                onDrop() {
                    Gr()
                }
            })
        }

        function Kr(e, t, n) {
            var a = t.get().upload_doc_opts,
                r = geByClass1("_im_upload_doc"),
                i = geByClass1("_im_drop_doc");
            return Upload.init(r, a.url, a.params, {
                file_name: "file",
                file_size_limit: 209715200,
                file_types: "*.*;",
                lang: a.opts.lang,
                multiple: 1,
                multi_progress: 1,
                max_files: 10,
                chooseBox: 1,
                clear: 1,
                type: "doc",
                max_attempts: 3,
                server: a.opts.server,
                error: a.opts.default_error,
                error_hash: a.opts.error_hash,
                dropbox: i,
                dragEl: bodyNode,
                onUploadStart(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete(e, r) {
                    var i = window.parseJSON(r);
                    i.file ? function(e, t, n, a) {
                        var r = Fr(e),
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
                                a().choose("doc", e + "_" + t, extend(n, {
                                    upload_ind: r
                                }))
                            },
                            onFail: Br.bind(null, a, e)
                        })
                    }(e, i, a, n) : $r(e, r, t, n)
                },
                onUploadProgress(e, t, a) {
                    var r = void 0 !== e.ind ? e.ind : e;
                    n().progress("doc", r, qr(e, t, a))
                },
                onUploadError(e, t) {
                    statlogsValueEvent("upload_doc_fails", 1, a.opts.server, t), Br(n, e)
                }
            })
        }

        function Vr(e, t, n) {
            removeEvent(bodyNode, "dragover dragenter");
            var r = Kr(0, t, n),
                i = function(e, t, n, r) {
                    var i = t.get().upload_video_params;
                    if (i) {
                        var s = geByClass1("_im_upload_video"),
                            o = geByClass1("_im_drop_video");
                        return i.options.visible_dropbox = !1, Object(Pr.getUploadModule)(s, o, i, null, {
                            onUploadStart: function(e, t) {
                                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                            },
                            onUploadComplete: function(e, r) {
                                var i = window.parseJSON(r);
                                i.video_id ? Object(Pr.onVideoUploaded)(e, i, t.get().textMediaSelector, (e, n) => {
                                    var r = document.querySelector('[data-video="' + n + '"]'),
                                        i = e.editable.sizes.x[0] || e.thumb;
                                    if (r && i) {
                                        r.style.backgroundImage = `url(${i})`;
                                        var s = gpeByClass("_im_mess", r);
                                        "im" === cur.module && s && Object(a.updateVideoThumb)(t, s)
                                    }
                                }) : $r(e, r, t, n)
                            },
                            onUploadProgress: function(e, t, a) {
                                var r = void 0 !== e.ind ? e.ind : e;
                                n().progress("video", r, qr(e, t, a))
                            },
                            onUploadError: function(e, t) {
                                statlogsValueEvent("upload_video_fails", 1, i.options.server, t), Br(n, e)
                            },
                            onNoFilteredCallback: function(e) {
                                Upload.onFileApiSend(r, e)
                            },
                            onDragEnter: function(e) {
                                var t = geByClass1("im-audio-message_recording");
                                e.dataTransfer && !t && Ur(Hr(n, e.dataTransfer))
                            },
                            onDragOut: function() {
                                Gr()
                            },
                            onDrop: function() {
                                Gr()
                            }
                        })
                    }
                }(0, t, n, r),
                s = zr(0, t, n, i);
            cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
            var l = Object(o.createModule)({
                handlers: e => {
                    var t = ge("im_full_upload");
                    e(t, "change", function a(r) {
                        if (window.Upload && r.target.files) {
                            if (n().canAddMedia()) {
                                var c = Array.from(r.target.files),
                                    d = c.filter(e => Upload.checkFileType(e.name, Rr("types"))),
                                    u = c.filter(e => Upload.checkFileType(e.name, Object(Pr.getUploadVideoExtMasks)("types")));
                                Upload.onFileApiSend(s, d), Upload.onFileApiSend(i, u)
                            } else showFastBox(getLang("global_error"), getLang("global_error"));
                            Object(o.destroyModule)(l);
                            var m = t.cloneNode();
                            t.parentNode.replaceChild(m, t), e(t = m, "change", a)
                        }
                    })
                }
            });
            return {
                paste(e) {
                    Upload.onFileApiSend(s, e)
                },
                unmount() {
                    Object(o.destroyModule)(l), Upload.deinit(s), Upload.deinit(i), Upload.deinit(r)
                }
            }
        }
        var Wr = n("wSs/"),
            Yr = n("eTng"),
            Qr = 4,
            Xr = 5,
            Jr = 6,
            Zr = 7,
            ei = 9,
            ti = 11,
            ni = 12,
            ai = 13,
            ri = 14,
            ii = 16,
            si = 19,
            oi = 20,
            li = 23,
            ci = 2e3,
            di = "_im_media_selector",
            ui = "_im_media_fwd",
            mi = "_im_replied_content",
            gi = "_im_fwd_close",
            pi = "_im_remove_replied",
            hi = "_im_peer_mute_unmute",
            _i = "_im_peer_return_to_chat",
            fi = "_mr_button_accept",
            bi = "_mr_button_reject",
            vi = "_im_submit_btn",
            yi = "_im_media_preview",
            Oi = "_im_chat_audio_input_parent";

        function Ei(e, t) {
            if (!e) return !1;
            window.tooltips && tooltips.hide(e, t)
        }

        function Ci(e, t, n, a, i, s) {
            var o = !(arguments.length > 6 && void 0 !== arguments[6]) || arguments[6];
            if (zi(t, a)) return Promise.resolve(!1);
            var c = Mi(a);
            c.getBoundAttach(n.message) && (n.message = ""), n.share_url = c.getShareUrl(), n.cancelled_shares = c.getCancelledShares();
            var d, u = Object(Lr.random)(),
                m = {
                    peerId: t,
                    messageId: "rid" + u,
                    flags: l.FLAG_OUTBOUND,
                    date: intval(Date.now() / 1e3) - a.get().timeshift,
                    subject: "",
                    text: Object(r.replaceSpecialSymbols)(clean(n.message)).replace(/\n/gi, "<br>"),
                    local: !0,
                    kludges: {
                        emoji: !0,
                        from_admin: a.get().gid ? vk.id : null
                    },
                    type: l.ADD_MESSAGE,
                    attaches: (d = n.attaches, d.map(e => ({
                        id: e[1],
                        type: e[0],
                        kind: e[2] || null
                    })))
                };
            return n.rid = u, n.mess = m, e(t, n), a.get().longpoll.push([m]), o && s().clearText(t, a), i().newMessage(a), Promise.resolve(!0)
        }

        function wi(e, t, n, a, r, i, s) {
            var o = arguments.length > 7 && void 0 !== arguments[7] && arguments[7];
            o || (o = e.get().peer);
            var l = Mi(e),
                c = ji(l, s),
                d = c ? l.dData.attaches.map(e => [e.type, e.id]) : [],
                u = {
                    message: "",
                    attaches: [].concat(d, i)
                };
            s && extend(u, s), Si(e, t, !1).then(() => Ci(n, o, u, e, t, a, !1).then(n => (c && Ri(e, r, t), Promise.resolve(n)))).catch(t => {
                debugLog(t), Ii(e, r)
            })
        }

        function ji(e, t) {
            var n = e.dData,
                a = t && t.sticker_referrer,
                r = a && 0 === a.indexOf("suggestion");
            return (!n.txt.trim() || r) && 0 === n.attaches.filter(e => "reply" !== e.type).length
        }

        function Si(e, t, n) {
            return e.get().tabs[e.get().peer].skipped > 0 ? (t().loadingPeer(e), e.setState({
                no_moving_down: !0
            }), e.set(a.changePeer.bind(null, e.get().peer, !1, !1)).then(() => e.set(a.loadPeer.bind(null, e.get().peer, !0, -1, !1))).then(() => (t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n))) : Promise.resolve(n)
        }

        function ki(e, t, n, r) {
            return !e.get().delayed_ts && setTimeout(() => {
                e.set(a.setDelayedMessage.bind(null, !1, !1)).then(() => {
                    n(...r)
                })
            }, t)
        }

        function Ti() {
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

        function Ii(e, t) {
            document.activeElement && document.activeElement.blur(), Ti();
            var n = geByClass1("_im_send", t);
            return e.set(a.toggleSendingAbility.bind(null, !0)).then(() => {
                Object(r.lockButton)(n)
            })
        }

        function Mi(e) {
            return e.get().tfdraft || new rn.ImDraft
        }

        function Ai(e, t, n, s, o, l) {
            var c = Object(i.getPeer)(e),
                d = Object(i.getCurrentKeyboard)(e) || {},
                u = d.one_time,
                m = void 0 !== u && u,
                g = d.author_id,
                p = geByClass1("_im_send", s);
            return Promise.resolve().then(() => {
                if (Object(i.isSendingAvailable)(e)) {
                    if (Object(a.isAnythingLoading)(e.get()) || !Object(r.isFullyLoadedTab)(e, e.get().peer)) {
                        var s = ki(e, ci, Ai, Object(f.toArray)(arguments));
                        return e.set(a.setDelayedMessage.bind(null, !0, s)).then(() => {
                            Object(r.lockButton)(p)
                        })
                    }
                    return clearTimeout(e.get().delayed_ts), e.set(a.setDelayedMessage.bind(null, !1, !1)).then(() => Object(r.unlockButton)(p)).then(Si.bind(null, e, t)).then(() => {
                        var a = l.action || {},
                            i = a.attaches || [],
                            s = Object(Va.decodeHTMLEntities)(a.payload || ""),
                            d = Object(Va.decodeHTMLEntities)(a.label || "");
                        Object(r.isChatPeer)(c) && (d = `@${Object(D.oCacheGet)(e,g).link.slice(1)} ${d}`);
                        return Object(P.statlogsValueEvent)("message_send_from_keyboard", 0, e.get().id, c, g), Ci(n, c, {
                            message: d,
                            attaches: i,
                            payload: s
                        }, e, t, o, !1)
                    }).then(() => m ? e.set(a.deleteKeyboard.bind(null, c)) : Promise.resolve()).then(() => o().fixKeyboard())
                }
            }).catch(t => {
                debugLog(t), Ii(e, s)
            })
        }

        function Li(e, t, n, s, o, c) {
            var d = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
            return Promise.resolve().then(() => {
                var u = geByClass1("_im_send", s);
                if (!Object(i.isSendingAvailable)(e)) return !1;
                if (Object(a.isAnythingLoading)(e.get()) || !Object(r.isFullyLoadedTab)(e, e.get().peer)) {
                    var m = ki(e, ci, Li, Object(f.toArray)(arguments));
                    return e.set(a.setDelayedMessage.bind(null, !0, m)).then(() => {
                        Object(r.lockButton)(u)
                    })
                }
                clearTimeout(e.get().delayed_ts), o().saveText(e);
                var g = !1,
                    p = Mi(e),
                    h = p.dData.attaches.map(e => {
                        if ("poll" == e.type) {
                            var t = c.pollData();
                            return t || (g = !0), [e.type, e.id, t]
                        }
                        return [e.type, e.id]
                    }).concat(d);
                if (g) return !1;
                var _ = e.set(a.setDelayedMessage.bind(null, !1, !1)).then(() => {
                        Object(r.unlockButton)(u)
                    }),
                    b = Object(i.getPeer)(e);
                return _.then(Si.bind(null, e, t)).then(() => {
                    var i = p.dData.txt,
                        c = t().getEditingMessage();
                    if (c || i || h.length) {
                        if (c) return i || h.length && !p.hasOnlyReplies(c) ? Object(r.isMessageTooLong)(i) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void(Object(Wr.wasMessageReallyModified)(e, c, p) && (Object(Wr.replaceMsgAfterEdit)(e, c, i, h, p.getShareUrl(), p.getCancelledShares()), t().sendEditMessage(e, c), e.get().longpoll.push([Object(l.editMessageLocallyEvent)(c)])))) : void
                        function(e, t, n, r) {
                            var i = e.get(),
                                s = i.peer,
                                o = showFastBox({
                                    title: getLang("mail_dialog_msg_delete_title"),
                                    dark: 1
                                }, getLang("mail_dialog_msg_delete_for_all"), getLang("mail_delete"), function(e) {
                                    Object(a.removeMessageSend)([r], s, null, "deleteforall", i), o.hide(), t().cancelEditing()
                                }, getLang("global_cancel"), function() {
                                    o.hide(), Di(geByClass1("_im_text", n))
                                })
                        }(e, t, s, c.messageId);
                        var d = Object(r.splitMessageToParts)(i, h).map(a => Ci(n, b, {
                            message: a.msgText || "",
                            attaches: a.attaches || []
                        }, e, t, o));
                        return Promise.all(d)
                    }
                })
            }).catch(t => {
                debugLog(t), Ii(e, s)
            })
        }

        function Pi(e, t, n, s, o, l, c, d) {
            var u, m = debounce(function(e, t, n) {
                var a = e.get().peer,
                    i = Emoji.val(n);
                Object(r.isReservedPeer)(a) || Mi(e).dData.txt == i || zi(a, e) || (t.checkMessageURLs(i, !0, ci), Mi(e).setText(i))
            }.bind(null, e, n), 500);
            var g = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                ref: "im",
                onSend: () => Yi(e, t).then(e => e && s([])),
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: function(n, s) {
                    var o = e.get().peer,
                        l = Emoji.val(s);
                    Object(r.isReservedPeer)(o) || zi(o, e) || Mi(e).dData.txt == l || !l || function(e) {
                        var t = e.get().peer;
                        Object(r.isFullyLoadedTab)(e, t) && !Object(i.isAnyMessageBeingEdited)(e) && Date.now() - (Object(i.getTab)(e, t).lastTyping || 0) > 1e3 * a.ACTIVITY_PERIOD && e.set(a.sendTyping.bind(null, t))
                    }(e), Qi(e, t, l), m(s);
                    var c = t.offsetHeight;
                    if (u && u !== c) {
                        var g = d().updateScroll();
                        d().scrollFix(e, e.get().peer, g)
                    }
                    u = c
                },
                onStickerSend: (e, t, n) => o([
                    ["sticker", e, n]
                ], {
                    sticker_referrer: t
                }),
                onHintachSend: (e, t) => l([
                    [e, t]
                ]),
                uploadActions: c
            });
            return Emoji.emojiLoadMore(g), e.setState({
                emojiOptId: g
            }), g
        }

        function Di(e) {
            Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
        }

        function xi(e, t, n, a) {
            var o = e.getFwdRaw(),
                l = t.querySelector(`.${ui}`),
                c = t.parentNode.querySelector(`.${mi}`);
            if (!(Object(i.getCurrentKeyboard)(a) || {}).hide && o && n.toggleKeyboard(!0), l.innerHTML = "", c.innerHTML = "", o) {
                var d = function(e, t) {
                        if (e.get().isEditing) {
                            var n = Object(r.getNowEditingMessage)(e);
                            return n && Object(s.hasReply)(n)
                        }
                        return "reply" === t.type
                    }(a, o),
                    u = d ? c : l,
                    m = o.object;
                u.innerHTML = d ? Ni(m) : function(e, t, n, a) {
                    if (n.object && n.object.authorName) {
                        var i = Object(r.renderShortText)(0, "", a.text, !0, Object(Yr.convertKludgesToAttaches)(a.kludges, 0));
                        return getTemplate("im_attach_mess", {
                            messages: i,
                            text: a.authorName,
                            date: getSmDate(a.date, e.get().timeshift),
                            modifier: "im-fwd_msg"
                        })
                    }
                    return getTemplate("im_attach_mess", {
                        messages: getLang("mail_title_X_msgs", t.getFwdCount()),
                        text: getLang("mail_im_fwd_msgs_title"),
                        date: "",
                        modifier: ""
                    })
                }(a, e, o, m)
            }
        }

        function Ni(e) {
            var t = Object(r.renderShortText)(0, "", e.text, !0, Object(Yr.convertKludgesToAttaches)(e.kludges, 0));
            return getTemplate("im_replied_message", {
                authorName: e.authorName,
                text: t
            })
        }

        function Ri(e, t, n) {
            e.set(a.forwardMessages.bind(null, null, Mi(e), !1)).then(() => {
                var a = t.querySelector(`.${ui}`),
                    r = t.parentNode.querySelector(`.${mi}`),
                    i = document.querySelector(`.${Oi} .${mi}`);
                r && r.children.length && (r.innerHTML = "", Bi(e, n)), i && i.children.length && (i.innerHTML = "", Bi(e, n)), a && a.children.length && (a.innerHTML = "", Bi(e, n)), Qi(e, t)
            })
        }

        function Bi(e, t) {
            var n = t().updateScroll();
            t().scrollFix(e, e.get().peer, n)
        }
        var Fi = "close",
            Hi = "open",
            Ui = "hide";

        function Gi(e, t, n, a, s, o, l) {
            if (l !== Fi && l !== Hi && l !== Ui) throw new Error(`Action "${l}" not found`);
            var c = e.get(),
                d = Object(i.getCurrentKeyboard)(e);
            (Object(r.isCommunityInterface)(e) || !d || c.isEditing) && (l = Ui);
            var u = l === Fi || l === Ui,
                m = Promise.resolve();
            return u || n.isMounted || (m = n.init()), m.then(() => (toggleClass(t, "im-chat-input_open-keyboard", !u), toggleClass(t, "im-chat-input_close-keyboard", u && l !== Ui), toggleClass(a, "im_chat-input--keyboard-button_hidden", l === Ui), n.toggle(c.peer, u, o))).then(() => {
                var t = s().updateScroll();
                return s().scrollFix(e, c.peer, t)
            })
        }

        function qi(e, t, n, a, s, l, c, d, u, m, g, p, h) {
            return {
                restoreKeyboard() {
                    this.toggleKeyboard(!!(ls.get("is_keyboards_hide") || {})[Object(i.getPeer)(e)])
                },
                toggleKeyboard() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !Object(i.getCurrentKeyboard)(e).hide,
                        n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return Gi(e, a, p, g, l, n, t ? Fi : Hi)
                },
                initKeyboard() {
                    if (!e.get().peer || !Object(i.getCurrentKeyboard)(e)) return Promise.resolve();
                    var t = !!(ls.get("is_keyboards_hide") || {})[Object(i.getPeer)(e)];
                    return Gi(e, a, p, g, l, !0, t ? Fi : Hi)
                },
                fixKeyboard() {
                    var t, n = Object(i.getCurrentKeyboard)(e);
                    return t = n ? n.hide ? Fi : Hi : Ui, Gi(e, a, p, g, l, !0, t)
                },
                hideKeyboard: () => Gi(e, a, p, g, l, !1, Ui),
                restoreDraft(e, s) {
                    t.chosenMedias.length > 0 && (e.setState({
                        removingMedias: !0
                    }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                        removingMedias: !1
                    }));
                    var o = e.get().peer,
                        c = Object(r.isUserPeer)(o) && o != vk.id && !e.get().gid && !Object(r.isContactPeer)(o),
                        d = Object(r.isUserPeer)(o) && o != vk.id && !e.get().gid && !inArray(o, e.get().moneyTransferExcept) && !Object(r.isContactPeer)(o) || Object(r.isCommunityPeer)(o) && e.get().moneyTransferCommAvail && Object(i.getCurrentTab)(e).moneyTransferAvail && !e.get().gid || e.get().gid && e.get().moneyRequestAvail || Object(r.isChatPeer)(o) && Object(i.getCurrentTab)(e).moneyRequestAvail;
                    if (toggle(geByClass1("ms_item_gift", a), c && !Object(i.isAnyMessageBeingEdited)(e)), toggle(geByClass1("ms_item_money", a), d && !Object(i.isAnyMessageBeingEdited)(e)), toggle(geByClass1("ms_item_poll", a), Object(r.isChatPeer)(o)), Object(r.isReservedPeer)(o)) return Promise.resolve();
                    var u = Mi(e);
                    return Emoji.val(n) !== u.dData.txt ? function(e, t) {
                        Emoji.val(e, clean(t)), Di(e)
                    }(n, u.dData.txt) : Di(n), u.prepareObjects(e.get().gid, s && s.messageId).then(() => {
                        if (!Wi(e, o, n) && o == e.get().peer) {
                            for (var r = u.dData.attaches, i = 0; i < r.length; i++) t.chooseMedia(r[i].type, r[i].id, r[i].object || {});
                            xi(u, a, this, e);
                            var s = l().updateScroll();
                            l().scrollFix(e, o, s), Qi(e, a, u.dData.txt)
                        }
                    })
                },
                sendMessage() {
                    s([])
                },
                choose(e, n, a) {
                    t.chooseMedia(e, n, a)
                },
                updateChosenMedia(e, n, a) {
                    t.updateChosenMedia(e, n, a)
                },
                canAddMedia: () => !t.hasRestrictingAttach() && !zi(e.get().peer, e),
                isEmpty: e => !trim(Emoji.val(n)) && !Mi(e).hasAttaches(),
                unchoose(e) {
                    t.unchooseMedia(e)
                },
                attachCount: () => t.attachCount(),
                progress(e, n, a) {
                    show(yi), t.showMediaProgress(e, n, a)
                },
                updateState(e) {
                    this.restoreKeyboard(), Wi(e, e.get().peer, n)
                },
                focusOn(e) {
                    Emoji.editableFocus(n, !1, !0)
                },
                setDraft(e, t) {
                    var n = Object(i.getTab)(e, e.get().peer);
                    Object(x.doesChatTabHaveFlag)(n, 1024) && !e.get().gid || (h.update(), e.setState({
                        tfdraft: t
                    }), t && this.restoreDraft(e, l().getEditingMessage()))
                },
                clearText(e, r) {
                    Mi(r).clear(), t.cancelCheckUrl(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), Ri(r, a, l);
                    var i = l().updateScroll();
                    l().scrollFix(r, r.get().peer, i)
                },
                attachMessages(e, t) {
                    if (e.get().peer === t) {
                        xi(Mi(e), a, this, e);
                        var n = l().updateScroll();
                        l().scrollFix(e, t, n), Qi(e, a)
                    }
                },
                cancelRecording() {
                    m.cancelRecording()
                },
                reHeight(e) {
                    var t = l().updateScroll();
                    l().scrollFix(e, e.get().peer, t)
                },
                isBlocked: () => zi(e.get().peer, e),
                toggleStickers(e, t) {
                    Emoji.toggleStickers(e.get().emojiOptId, !t)
                },
                saveText(e) {
                    Mi(e).setText(Emoji.val(geByClass1("_im_text", a)))
                },
                unmount() {
                    Object(o.destroyModule)(u), t.destroy(), d.unmount(), p.unmount(), h.unmount(), Emoji.destroy(e.get().emojiOptId), m.unmount()
                }
            }
        }

        function $i(e, t) {
            return !!Object(r.isChatPeer)(e) && t.get().tabs[e].data.kicked
        }

        function zi(e, t) {
            return $i(e, t) || Object(i.getTab)(t, e) && Object(i.getTab)(t, e).block_error > 0 || Object(r.isLocksAvailable)(t) && Object(r.isPeerBlocked)(e, t)
        }

        function Ki(e, t) {
            e.disabled = !0, e.contentEditable = "false", addClass(e, "im-chat-input--text_disabled"), addClass(t, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Vi(e, t) {
            e.disabled = !1, e.contentEditable = "true", removeClass(e, "im-chat-input--text_disabled"), removeClass(t, "im-chat-input_error"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Wi(e, t, n) {
            var a = gpeByClass("_im_chat_input_parent", n),
                s = geByClass1("_im_chat_input_error", a),
                o = Object(i.getTab)(e, t);
            if (zi(t, e)) {
                Ki(n, a);
                var l = function(e, t, n) {
                    switch (n.block_error) {
                        case Zr:
                        case Xr:
                            return getLang("mail_peer_deleted");
                        case ri:
                            return getLang("mail_community_deleted");
                        case ti:
                            return getLang("mail_group_banned_messages");
                        case Qr:
                        case Jr:
                        case ei:
                        case si:
                        case oi:
                        case ai:
                            return Object(r.isCommunityPeer)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
                        case li:
                            var a = Object(D.oCacheGet)(e, t);
                            return langSex(a.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", a.kick_name);
                        case ni:
                            return getLang("mail_cant_send_messages_to_community");
                        case ii:
                            return getLang("mail_chat_youre_kicked");
                        case 0:
                            if ($i(t, e)) return getLang("mail_chat_youre_kicked");
                            var i = e.get().block_states[t].name;
                            return getLang("mail_community_answering").replace("{username}", i);
                        default:
                            return getLang("mail_send_privacy_error")
                    }
                }(e, t, o);
                if (Object(i.isChannel)(e, Object(i.getTab)(e, t)) && addClass(geByClass1("_im_page_history"), "is_channel"), Object(r.isFvkcomgroup)(e, t) && !e.get().gid) {
                    addClass(a, "is-f-vkcomgroup");
                    var c = inArray(t, e.get().mutedPeers);
                    l = o.data.closed || o.data.kicked ? getTemplate("sImPeerReturnToChat", {
                        text: getLang("mail_return_to_vkcomgroup")
                    }) : getTemplate("sImPeerMuteUnmute", {
                        text: c ? getLang("mail_im_unmute") : getLang("mail_im_mute"),
                        cls: c ? "im-action_unmute" : "im-action_mute"
                    })
                } else removeClass(a, "is-f-vkcomgroup");
                return val(s, l), !0
            }
            return o && Object(r.tabIsMessageRequest)(o) ? (Ki(n, a), addClass(a, "is-message_request"), val(s, getTemplate("sImPeerAcceptOrRejectMessageRequest", {
                cls_accept: fi,
                cls_reject: bi
            })), !0) : (a.classList.contains("is-message_request") && (Vi(n, a), removeClass(a, "is-message_request"), val(s, "")), n.disabled && (removeClass(a, "is-f-vkcomgroup"), removeClass(geByClass1("_im_page_history"), "is_channel"), Vi(n, a), removeClass(a, "is-message_request"), val(s, "")), !1)
        }

        function Yi(e, t, n) {
            return Object(r.isVoiceMessageAvailable)(e).then(a => {
                if (!a && !Object(i.isAnyMessageBeingEdited)(e)) return !0;
                var s = null != n ? n : Emoji.val(geByClass1("_im_text", t));
                if (trim(s)) return !Object(i.isAnyMessageBeingEdited)(e) || !Object(r.isMessageTooLong)(s);
                var o = Mi(e),
                    l = Object(r.getNowEditingMessage)(e);
                return o.hasAttaches() && !o.hasOnlyReplies(l)
            })
        }

        function Qi(e, t, n) {
            var a = geByClass1("_im_send", t.parentNode);
            Ei(a, {
                fasthide: !0
            }), Yi(e, t, n).then(t => {
                if (Object(i.isAnyMessageBeingEdited)(e)) toggleClass(a, "is_input_empty", !t), attr(a, "aria-label", getLang("mail_im_edit"));
                else {
                    toggleClass(a, "im-send-btn_audio", !t), toggleClass(a, "im-send-btn_send", t), t && removeClass(a, "im-send-btn_saudio");
                    var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                    attr(a, "aria-label", n)
                }
            })
        }

        function Xi(e, t, n, s, c) {
            cur.share_timehash = t.get().share_timehash;
            var d = Object(o.createMutations)(qi),
                u = d.callMutations,
                m = d.bindMutations,
                g = Vr(0, t, u),
                p = function(e, t, n) {
                    return e.set(a.deliverMessage.bind(null, t, n, {}))
                }.bind(null, t);
            ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
            var h = Ar(p, function(e, t, n, a) {
                    e.get().longpoll.push([l.failedMessage(t, n.mess, a)])
                }.bind(null, t), {
                    store: "ls",
                    key: "im_send_queue_" + vk.id,
                    waitCommit: !0
                }),
                _ = h.pushMessage,
                b = h.inspectQueue,
                v = h.resend,
                y = h.setErrored,
                O = h.complete,
                E = wi.bind(null, t, c, _, u, e),
                C = wi.bind(null, t, c, _, u, e),
                w = function(e) {
                    var t = Mi(e).getFwdRaw();
                    t && window.showForwardBox({
                        act: "a_show_forward_box",
                        will_fwd: t.id,
                        gid: e.get().gid
                    })
                }.bind(null, t);
            hide(geByClass1("ms_items_more_helper", e));
            var j = t.get().mediaTypes || [
                ["photo", getLang("mail_added_photo")],
                ["video", getLang("profile_wall_video")],
                ["audio", getLang("profile_wall_audio")],
                ["doc", getLang("profile_wall_doc")],
                ["map", getLang("profile_wall_map")],
                ["gift", getLang("profile_wall_gift")]
            ];
            (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && j.push(["money", getLang("profile_wall_money")]);
            var S = new MediaSelector(geByClass1(di, e), yi, j, {
                    from: "message",
                    maxShown: 0,
                    vectorIcon: !0,
                    ignoreMobile: !0,
                    onAddMediaChange: function(n, r, i, s) {
                        return n && u().toggleKeyboard(!0),
                            function(e, t, n, r, i, s, o, l, c) {
                                if (!t.get().removingMedias) {
                                    if ("album" === i || "page" === i || "mail" === i || "reply" === i) return !1;
                                    if ("share" === i && !o.title) return !1;
                                    var d, u;
                                    show(yi), s && "string" == typeof i ? (l && Mi(t).addBindUrl(l, i, s), Mi(t).addAttach(i, s, o)) : (Mi(t).syncWithSelector(c), "number" == typeof s && c.chosenMedias[s] && (d = c.chosenMedias[s], u = Mi(t), "string" == typeof d[0] && "string" == typeof d[1] && d[1] && u.dData.cancelled.push(`${d[0]},${d[1]}`)));
                                    var m = e().updateScroll();
                                    if (e().scrollFix(t, t.get().peer, m), t.get().delayed_message && !Object(a.isAnythingLoading)(t.get())) return n([]), !1;
                                    Qi(t, r)
                                }
                            }(c, t, k, e, n, r, i, s, S)
                    },
                    onMediaChange: function() {
                        return function(e, t, n, a, r) {
                            if (!t.get().removingMedias) {
                                var i = r.getMedias().find(e => "poll" === e[0]);
                                i && Mi(t).addAttach(i[0], i[1], r.pollData(!0, !0)), Qi(t, a)
                            }
                        }(0, t, 0, e, S)
                    },
                    editable: 1,
                    onChangedSize: function() {
                        var n, a, r = c().updateScroll();
                        c().scrollFix(t, t.get().peer, r), n = e, a = ge(yi).offsetHeight, toggleClass(n, "im-chat-input--overflowed", a > 400)
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
                k = Li.bind(null, t, c, _, e, u, S),
                T = function(e, t, n) {
                    var a = Emoji.val(geByClass1("_im_text", t));
                    Object(i.isAnyMessageBeingEdited)(e) && "" !== a || Yi(e, t).then(t => {
                        var r = intval(domData(n.target, "tttype"));
                        (2 === r && !0 !== t || 1 === r && !0 === t || 3 !== r && "" === a) && window.tooltips && tooltips.destroy(n.target, {
                            fasthide: !0
                        });
                        var s = Mi(e).dData.attaches.length > 0;
                        if (Object(i.isAnyMessageBeingEdited)(e) && "" === a && !s) return domData(n.target, "tttype", 3), showTooltip(n.target, {
                            text: getLang("mail_delete_for_all"),
                            black: !0,
                            force: 3 !== r,
                            appendParentCls: "_im_chat_input_parent",
                            shift: [-8, -10]
                        });
                        if (!0 !== t) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                            text: getLang("mail_added_audiomsg"),
                            black: !0,
                            force: 1 !== r,
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
                            force: 2 !== r,
                            showdt: 700,
                            zIndex: 200,
                            hidedt: 700,
                            appendParentCls: "_im_chat_input_parent",
                            onCreate() {
                                radioBtns.im_submit = {
                                    els: Object(f.toArray)(geByClass(vi)),
                                    val: o
                                }
                            }
                        })
                    })
                }.bind(null, t, e),
                I = geByClass1("_im_send", e),
                M = wi.bind(null, t, c, _, u, e),
                A = za(e, t, M, () => {
                    addClass(I, "im-send-btn_audio"), removeClass(I, "im-send-btn_static")
                }, () => {
                    u().restoreKeyboard()
                });
            toggle(geByClass1("ms_item_poll", e), Object(r.isChatPeer)(Object(i.getPeer)(t))),
                function(e, t) {
                    var n = geByClass1("_im_text", e),
                        a = Object(dt.promisify)(stManager.add);
                    (window.Wall ? Promise.resolve() : a(["page.js"])).then(function() {
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
                                    var a = 0,
                                        r = !1,
                                        i = function() {
                                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                                        };
                                    each(t.wdd.shown, function() {
                                        this[0] && (a++, "@" + t.curTerm == this[2] && (r = !0))
                                    }), !a || r && 1 == a ? i() : cancelStackPush("im_mention", i)
                                }
                            },
                            onHide: () => {
                                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
                            },
                            searchKeys: [1, 7],
                            wddOpts: {}
                        })
                    })
                }(e, t), t.get().textMediaSelector = S, t.set(a.initTextStore.bind(null, b, v, y, O));
            var L = geByClass1("_im_text", e);
            setTimeout(() => {
                Object(i.getPeer)(t) && u().setDraft(t, Object(i.getTabDraft)(Object(i.getCurrentTab)(t))), Pi(t, e, S, k, E, C, g, c)
            }, 0);
            var P = Ri.bind(null, t, e, c),
                D = function(e, t, n) {
                    var r = Object(i.getPeer)(e);
                    e.set(a.acceptMessageRequest.bind(null, r)).then(() => {
                        Wi(e, r, t), n()
                    }).catch(() => Ti())
                }.bind(null, t, L, () => {
                    var e = c().updateScroll();
                    c().scrollFix(t, Object(i.getPeer)(t), e)
                }),
                x = function(e, t, n) {
                    var s = Object(i.getPeer)(e);
                    e.set(a.rejectMessageRequest.bind(null, s)).then(() => {
                        var t = e.get().tabbedPeers.filter(e => {
                            return e.peer !== s
                        });
                        return e.set(a.updateTabbedPeers.bind(null, t, !0))
                    }).then(() => {
                        Object(r.isCommunityInterface)(e) && t(e), n(e, s), s === e.get().peer && e.get().longpoll.push([Object(l.resetPeer)()])
                    }).catch(() => Ti())
                }.bind(null, t, n, s),
                N = function(e, t, n, r) {
                    var i = e.get().peer,
                        s = inArray(i, e.get().mutedPeers);
                    e.set(a.toggleMutePeer.bind(null, i, !s)).then(n().updateState.bind(null, i)), cancelEvent(r)
                }.bind(null, t, e, c),
                R = function(e, t, n, r) {
                    var i = e.get().peer;
                    e.set(a.returnToChat.bind(null, i)).then(e => e.set(a.getPinnedMessage.bind(null, i))).then(n().updateChatTopic.bind(null, i)), cancelEvent(r)
                }.bind(null, t, e, c),
                B = function(e, t, n) {
                    var r = !!intval(domData(n, "val"));
                    r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(a.changeSubmitSettings.bind(null, r)))
                }.bind(null, t);
            Wi(t, t.get().peer, L);
            var F = e.querySelector("._im_keyboard_button"),
                H = function(e, t, n, a, r) {
                    return (0, Object(o.createMutations)(sr).bindMutations)(Object(o.createModule)({
                        handlers: (e, t) => {}
                    }), t, a)
                }(0, t, 0, Ai.bind(null, t, c, _, e, u)),
                U = function(e, t, n, a) {
                    var r = (0, Object(o.createMutations)(Cr).bindMutations)(Object(o.createModule)({
                        handlers: (e, t) => {}
                    }), e, t, n, a);
                    r.toggleImText();
                    var i = we.createElement(Vt, {
                        value: e
                    }, we.createElement(lr, {
                        getTemplates: r.getPreparedTemplates,
                        applyTemplate: r.applyTemplate.bind(r),
                        isNeededRendering: r.isNeedRenderTemplates,
                        showSettingsPopup: r.showSettingsPopup.bind(r, fr),
                        showCreatingTemplatePopup: r.showSettingsPopup.bind(r, br)
                    }));
                    return je.render(i, t), r
                }(t, e.querySelector("._message_templates_container"), e => ur(L, e), t => toggleClass(e, "im-chat-input--textarea_show-templates", t)),
                G = Object(o.createModule)({
                    handlers: (n, r) => {
                        n(I, "click", () => {
                            Promise.resolve().then(() => Yi(t, e)).then(e => {
                                if (e || Object(i.isAnyMessageBeingEdited)(t)) k([]);
                                else {
                                    var n = Mi(t);
                                    ji(n) && function(e) {
                                        var t = document.querySelector(`.${Oi} .${mi}`),
                                            n = e.getFwdRaw();
                                        if (n) {
                                            var a = n.object;
                                            t && (t.innerHTML = Ni(a))
                                        } else t.innerHTML = ""
                                    }(n), Ei(I, {
                                        fasthide: !0
                                    }), A.start(), setTimeout(() => removeClass(I, "im-send-btn_saudio"), 300)
                                }
                            })
                        }), n(I, "mouseover", T), n(L, "focus", () => {
                            t.get().longpoll.push([l.transitionEvent("message")]), cur.focused = t.get().peer
                        }), n(L, "blur", () => {
                            var e = 0 === t.get().peer ? "search" : "default";
                            t.get().longpoll.push([l.transitionEvent(e)]), cur.focused = !1
                        }), n(F, "click", () => u().toggleKeyboard(void 0)), n(F, "mouseover", () => {
                            showTooltip(F, {
                                text() {
                                    var e = Object(i.getCurrentKeyboard)(t);
                                    return !e || e.hide ? getLang("mail_show_keyboard") : getLang("mail_hide_keyboard")
                                },
                                black: !0,
                                shift: [4, 5]
                            })
                        }), r(e.parentNode, "click", hi, N), r(e.parentNode, "click", _i, R), r(e.parentNode, "click", pi, P), r(e.parentNode, "click", fi, D), r(e.parentNode, "click", bi, x), r(e, "click", gi, P), r(e, "click", "_im_will_fwd", w), r(e, "keydown", "_im_text", e => (function(e, t, n, r) {
                            if (38 === r.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !Object(a.isAnythingLoading)(e.get())) {
                                var s = Object(Wr.findLastMessageToEdit)(e, Object(i.getCurrentTab)(e));
                                s && t().startEditing(Object(i.getMessage)(e, e.get().peer, s))
                            }
                        })(t, c, u, e)), r(bodyNode, "click", vi, B)
                    }
                }),
                q = m(t, S, L, e, k, c, b, g, G, A, F, H, U);
            return q.initKeyboard(), q
        }
        var Ji = "im_hist_search",
            Zi = "_im_search_date",
            es = "_im_search_date_input",
            ts = "_im_search_history_input",
            ns = "_im_start_inplace_search",
            as = "_im_cancel_inplace_search",
            is = "_im_clear_date";

        function ss(e, t, n, a, r, i) {
            return {
                focus(e) {
                    uiSearch.focus(t),
                        function(e, t, n, a) {
                            cancelStackPush(Ji, cs.bind(null, e, t, n, a))
                        }(e, t, n, a)
                },
                changePeer(e, n) {
                    uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
                },
                search() {
                    i({})
                },
                unmount() {
                    Object(o.destroyModule)(r), cancelStackFilter(Ji), a.then(e => e.destroy())
                }
            }
        }

        function os(e, t, n) {
            var r = e.get().peer;
            uiSearch.showProgress(n), Object(a.searchMessagesInplace)(r, e.get()).then(a => {
                uiSearch.hideProgress(n), t().insertSearch(a, e)
            }).catch(() => {
                uiSearch.focus(n), uiSearch.hideProgress(n)
            })
        }

        function cs(e, t, n, r) {
            cancelStackFilter(Ji), r.then(e => {
                e.hide()
            }), e.set(a.cancelSearch.bind(null, e.get().peer)).then(() => {
                uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
            })
        }

        function ds(e, t, n) {
            var r = geByClass1(es, e),
                i = geByClass1(ts, e),
                s = function(e, t, n, a) {
                    var r = '<td class="cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
                    return new Promise(e => {
                        stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                            var t = new Datepicker(n, {
                                width: 140,
                                resfmt: "plain",
                                addRows: '<tr id="im_day_clear">' + r + "</tr>",
                                addRowsM: '<tr id="im_month_clear">' + r + "</tr>",
                                onUpdate: a,
                                pastActive: !0,
                                noFuture: !0
                            });
                            e(t)
                        })
                    })
                }(0, 0, r, function(e, t, n, r) {
                    e.set(a.setCurrentSearchDate.bind(null, e.get().peer, `${r.d}.${r.m}.${r.y}`)).then(os.bind(null, e, t, n))
                }.bind(null, t, n, i)),
                l = function(e, t) {
                    e.then(e => {
                        triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
                    })
                }.bind(null, s, e),
                c = function(e, t, n, r, i, s) {
                    if ("keyup" !== s.type || 13 == s.which) {
                        var o = clean(uiSearch.getFieldEl(t).value);
                        e.set(a.setCurrentSearch.bind(null, o, e.get().peer)).then(i.bind(null, e, r, t))
                    }
                }.bind(null, t, i, r, n, debounce(os, 300)),
                d = cs.bind(null, t, i, n, s),
                u = function(e, t, n, r) {
                    n.then(e => {
                        e.hide()
                    }), e.set(a.clearDate.bind(null, e.get().peer)).then(os.bind(null, e, t, r))
                }.bind(null, t, n, s, i),
                m = Object(o.createModule)({
                    handlers: (t, n) => {
                        t(geByClass1(Zi, e), "click", l), t(uiSearch.getFieldEl(i), "keyup", c), t(geByClass1(ns, e), "click", c), t(geByClass1(as, e), "click", d), n(e, "click", is, u)
                    }
                });
            return ss(0, i, n, s, m, c)
        }
        var us = "_im_mess_fav",
            ms = "_im_mess_reply",
            gs = "_im_mess_forward",
            ps = "_im_mess_edit";

        function hs(e, t, n, a, s) {
            var o = Object(i.getPeer)(e),
                l = Object(i.getTab)(e, o),
                c = 105 + (Object(Ce.isPinnedMessageVisibleInTab)(e, Object(i.getPeer)(e)) || l && l.top_banner ? Object(r.getPinnedMessageHeight)() : 0);
            showTooltip(t, {
                shift: [n, 10],
                black: 1,
                className: "_im_history_tooltip " + a,
                appendParentCls: "_im_mess_stack",
                toup: t.getBoundingClientRect().top > c + 37,
                text: s
            })
        }

        function _s(e, t, n, a) {
            var r = getLang("mail_im_toggle_important").length > 14;
            hs(e, a, r ? 84 : 34, r ? "im-star-tt_long" : "im-star-tt", () => {
                var t = domData(gpeByClass("_im_mess", a), "msgid"),
                    n = Object(i.getMessage)(e, e.get().peer, t);
                return n ? Object(s.isImportant)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
            })
        }

        function fs(e, t, n) {
            var c = _s.bind(null, t, 0),
                d = function(e, t, n) {
                    var r = gpeByClass("_im_mess", n),
                        o = intval(domData(r, "msgid")),
                        c = e.get().peer,
                        d = Object(i.getMessage)(e, c, o),
                        u = !Object(s.isImportant)(d);
                    return e.get().longpoll.push([{
                        peerId: c,
                        messageId: o,
                        type: u ? l.SET_FLAGS : l.RESET_FLAGS,
                        flags: l.FLAG_IMPORTANT
                    }]), e.set(a.favMessage.bind(null, [o], u, c)), _s(e, -10, t, n), !1
                }.bind(null, t),
                u = function(e, t, n, a) {
                    hs(e, a, 18, "im-reply-tt", getLang("mail_im_mark_forward"))
                }.bind(null, t, 0),
                m = function(e, t, n, r) {
                    var i = e.get().peer,
                        s = +domData(domClosest("im-mess", r.target), "msgid");
                    return Object(Oe.statlogsForwardFromChannel)(), Object(a.processFwd)([s], i, e).then(t => e.set(a.prepareForward.bind(null, t))).then(() => {
                        Mn(0, e)
                    }), !1
                }.bind(null, t, e.querySelector("_im_dialog_actions"), n),
                g = function(e, t, n, a) {
                    hs(e, a, 18, "im-reply-tt", getLang("mail_im_reply"))
                }.bind(null, t, 0),
                p = function(e, t, n) {
                    var r = e.get().peer,
                        i = +domData(domClosest("im-mess", n.target), "msgid");
                    return Object(a.processFwd)([i], r, e).then(t => e.set(a.forwardMessages.bind(null, t, e.get().tfdraft, !0))).then(() => t().respond(e, r)), !1
                }.bind(null, t, n),
                h = function(e, t, n) {
                    hs(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
                }.bind(null, t),
                _ = function(e, t, n, a) {
                    var r = intval(domData(gpeByClass("_im_mess", a), "msgid")),
                        s = Object(i.getMessage)(e, e.get().peer, r);
                    return s && t().startEditing(s), !1
                }.bind(null, t, n),
                f = Object(o.createModule)({
                    handlers: (t, n) => {
                        n(e, "click", us, d), n(e, "mouseover", us, c), n(e, "click", gs, m), n(e, "mouseover", gs, u), n(e, "click", ms, p), n(e, "mouseover", ms, g), n(e, "click", ps, _), n(e, "mouseover", ps, h)
                    }
                });
            return function(e, t) {
                return {
                    markImportant(t, n, a) {
                        Object(r.updateStar)(t, n, e)
                    },
                    unmount() {
                        Object(o.destroyModule)(t)
                    }
                }
            }(e, f)
        }
        var bs = "_im_retry_media",
            vs = "_im_replied_message";

        function ys(e, t, n, s, o) {
            if (!Object(a.isSearchingInplace)(e.get().peer, e.get()) && !(hasClass(o, r.FAILED_CLASS) || hasClass(o, r.SENDING_CLASS) || hasClass(o, "_im_mess_srv") || Object(r.checkSelectClick)(s, o) || Object(i.isAnyMessageBeingEdited)(e) || "A" === s.target.tagName || domClosest(vs, s.target) || s.target.classList.contains(bs))) {
                var l, c, d = intval(domData(o, "msgid")),
                    u = e.get().peer;
                if (!Object(r.isAlreadyDeleted)(e, u, d)) l = s.shiftKey ? Object(i.getMessageRangeFromSelection)(e, u, d) : [d], e.set(a.addSelection.bind(null, l)).then(() => {
                    var a = Object(i.getSelectedMessages)(e),
                        r = !1;
                    l.forEach(e => {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var i = inArray(e, a);
                            r |= i, toggleClass(t, "im-mess_selected", i);
                            var s = i ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                o = geByClass1("_im_mess_blind_label_select", t);
                            attr(o, "aria-label", s)
                        }
                    }), r && (window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()), t().changedMessageSelection(e)
                }).then(() => {
                    1 !== e.get().selectedMessages.length || c ? c && c.hide() : c = function(e) {
                        var t = e.get();
                        if (t.pinnedMessagesPromo && Object(r.isChatPeer)(t.peer)) {
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
                                        }), Object(a.hidePromoTooltip)()
                                    }
                                });
                            return i.show(), i
                        }
                    }(e)
                })
            }
        }

        function Os(e, t, n) {
            var a = ys.bind(null, t, n, e),
                r = Object(o.createModule)({
                    handlers: (t, n) => {
                        n(e, "click", "_im_mess", a)
                    }
                });
            return function(e, t) {
                return {
                    cleanSelection(t) {
                        t && Array.isArray(t) && t.length && t.map(t => geByClass1("_im_mess_" + t, e)).filter(e => e).forEach(e => removeClass(e, "im-mess_selected"))
                    },
                    unmount() {
                        Object(o.destroyModule)(t)
                    }
                }
            }(e, r)
        }
        var Es = {
            onNewMessagesChunk: function(e) {
                var t = geByClass("post");
                LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(e => LongView.register(e, "im"))
            },
            onHistoryScroll: function(e) {
                LongView.onScroll(e, window.innerHeight)
            }
        };

        function Cs(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var ws = 68,
            js = 32,
            Ss = 300,
            ks = 20,
            Ts = 68,
            Is = 10,
            Ms = 2e3,
            As = 100;

        function Ls(e, t, n, a) {
            var r = e instanceof Array ? e : geByClass("_im_bar_date", e),
                i = t.contHeight();
            Es.onNewMessagesChunk();
            var s = r.reduce((e, t) => (e[domData(t, "date")] = [t.offsetTop + Is, i, t], e), {}),
                o = !n && a.barMap ? a.barMap : {};
            return a.barMap = extend(o, s), a.barMapKeys = Object.keys(a.barMap).sort(), Promise.resolve(a)
        }

        function Ps(e, t, n, a, i) {
            var s = e.get().barMap[t],
                o = Object(r.isClassicInterface)(i) ? Ts : ks;
            return n - (s[0] + n - s[1]) + a - o
        }

        function Ds(e, t, n, a, r) {
            var i, s, o = e.get(),
                l = n - t;
            o.barMapKeys.forEach(t => {
                var o = Ps(e, t, n, a, r);
                if (o >= l) {
                    var c = i ? Ps(e, i, n, a, r) : n;
                    i = c > o ? t : i
                } else if (o < l) {
                    var d = s ? Ps(e, s, n, a, r) : 0;
                    s = o > d ? t : s
                }
            });
            var c = {};
            return [
                [s, "prev"],
                [i, "cur"]
            ].forEach(t => {
                var i = Cs(t, 2),
                    s = i[0],
                    o = i[1];
                s && (c[o + "Bar"] = function(e, t) {
                    var n = e.get().barMap[t][2];
                    return {
                        text: n.textContent,
                        date: domData(n, "date")
                    }
                }(e, s), c[o + "Left"] = Ps(e, s, n, a, r) - l)
            }), c
        }

        function xs(e, t, n, i, s) {
            var o = e.get(),
                l = Object(a.isEverythingLoaded)(o),
                c = t.get(),
                d = s.scrollTop(),
                u = c.lastTop ? c.lastTop - d : 0;
            c.lastTop = d;
            var m = Object(Ce.isPinnedMessageVisibleInTab)(o, o.peer) ? Object(r.getPinnedMessageHeight)() : 0,
                g = Object(a.isSearchingInplace)(o.peer, o) && o.tabs[o.peer] && o.tabs[o.peer].top_banner ? 50 : 0,
                p = (Object(r.isClassicInterface)(e) ? ws + m + g : 0) - js / 2,
                h = Ds(t, d, s.contHeight(), p, e),
                _ = h.prevBar,
                f = h.curBar,
                b = h.prevLeft,
                v = "translateY(0px)",
                y = !1,
                O = !1,
                E = !1;
            f || l || (f = function(e) {
                var t = geByClass1("_im_mess", e),
                    n = domData(t, "ts");
                return t && n ? {
                    text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
                    date: n
                } : null
            }(i)), f ? y = f : O = !0, _ && f && b > -js && b < 0 && (E = !0, O = !1, y = f, v = `translateY(${-js-b}px)`), y && function(e, t) {
                domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
                    visibility: "visible"
                }))
            }(n, y), E ? t.set(function(e, t, n, a) {
                return a.barTransition = a.barMap[t][2], n > 0 ? (addClass(a.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : n < 0 && (removeClass(a.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(a.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(a)
            }.bind(null, n, _.date, u)) : t.set(function(e, t) {
                return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
            }.bind(null, n)), v && setStyle(n, {
                [cssTransformProp]: v
            }), toggleClass(n, "im-page--top-date-bar_no-b", O)
        }

        function Ns(e, t) {
            var n = geByClass1("_im_top_date_bar"),
                a = _({
                    lastTop: !1,
                    barMap: {},
                    barMapKeys: []
                }),
                r = null,
                i = null,
                s = null,
                o = debounce(e => {
                    a.set(Ls.bind(null, t, e, !1))
                }, 500);
            return {
                reset(r) {
                    a.set(Ls.bind(null, t, r, !0)).then(() => {
                        xs(e, a, n, t, r)
                    })
                },
                disable() {
                    a.reset()
                },
                heightIncreased: (e, t) => (o(t), a.set(function(e, t) {
                    return t.barMapKeys.forEach(n => {
                        t.barMap[n][0] -= e
                    }), Promise.resolve(t)
                }.bind(null, e))),
                parseMore(r, i) {
                    a.set(Ls.bind(null, r, i, !1)).then(() => {
                        xs(e, a, n, t, i)
                    })
                },
                toggle(e) {
                    e ? setStyle(n, {
                        display: ""
                    }) : hide(n)
                },
                show() {
                    i = Date.now(), s || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), s = setInterval(function() {
                        Date.now() - i > Ms && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(s), s = null)
                    }, As))
                },
                update(i) {
                    r && (clearTimeout(r), r = null), r = setTimeout(function() {
                        xs(e, a, n, t, i)
                    }, Ss), xs(e, a, n, t, i)
                }
            }
        }
        var Rs = n("nyd8"),
            Bs = n("uytb"),
            Fs = n("p3re"),
            Hs = n("FWc3"),
            Us = n("zxIV"),
            Gs = "_im_top_banner_button",
            qs = "_im_top_banner_hide";

        function $s(e, t) {
            var n = geByClass1("_im_dialog_actions", e);
            Object(Us.toggleClass)(n, "im-page--chat-header_top-banner", t)
        }

        function zs(e, t) {
            var n = geByClass1(qs, e);
            n && window.tooltips && tooltips.hide(n), $s(e, !1), t.innerHTML = ""
        }

        function Ks(e, t, n) {
            var s = geByClass1("_im_top_banner", e),
                l = Object(o.createModule)({
                    handlers: (i, o) => {
                        var l = geByClass1("_im_dialog_actions", e);
                        o(e, "click", qs, () => {
                            t.set(a.hideTopBannerAction.bind(null, t.get().peer)), zs(e, s);
                            var i = !!Object(r.renderPinnedMessage)(t);
                            Object(r.compensateHistoryHeightChange)(t, i, !0, n)
                        }), o(e, "click", Gs, i => {
                            var o = function(e, t, n, r) {
                                    var i = Object(Us.domData)(e, "payload");
                                    return !!i && (t.set(a.callbackTopBannerAction.bind(null, t.get().peer, i)), zs(n, r), !0)
                                }(i.target, t, e, s),
                                l = !!Object(r.renderPinnedMessage)(t);
                            Object(r.compensateHistoryHeightChange)(t, l, !o, n)
                        }), o(l, "mouseover", qs, (e, t) => {
                            Object(Hs.showTooltip)(t, {
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
                    var a = Object(i.getTab)(t, t.get().peer).top_banner,
                        o = s.children.length;
                    a && !Object(i.isSearchShown)(t) ? ($s(e, !0), s.innerHTML = function(e) {
                        var t = e.icon ? Object(Qa.getTemplate)("im_top_banner_icon", {
                                icon: e.icon
                            }) : "",
                            n = e.text;
                        "employees_banner" === e.name && (n = Object(Fs.replaceHyperLinks)(n, Fs.linksReplacer.bind(null, !1)), n = Object(Fs.replaceMentions)(n));
                        var a = (e.buttons || []).map(e => {
                            var t = "";
                            switch (e.layout) {
                                case "secondary":
                                    t = "secondary";
                                    break;
                                default:
                                    t = "blue_button"
                            }
                            return "link" === e.type ? Object(Qa.getTemplate)("im_top_banner_button_link", {
                                link: e.link,
                                text: e.text,
                                css_class: t
                            }) : Object(Qa.getTemplate)("im_top_banner_button", {
                                callback_data: e.callback_data,
                                text: e.text,
                                css_class: t
                            })
                        });
                        return a = a.concat([Object(Qa.getTemplate)("im_top_banner_hide_btn", {})]), Object(Qa.getTemplate)("im_top_banner", {
                            text: n,
                            icon: t,
                            buttons: a.join("")
                        })
                    }(a)) : s.children.length && zs(e, s);
                    var l = s.children.length;
                    Object(r.compensateHistoryHeightChange)(t, l, o, n)
                },
                unmount() {
                    Object(o.destroyModule)(l)
                }
            }
        }
        var Vs = n("cGUQ");

        function Ws(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Ys = window.formatCount,
            Qs = 1e3,
            Xs = -30,
            Js = 30,
            Zs = 2e3,
            eo = 700,
            to = 15,
            no = 47,
            ao = "._im_to_end",
            ro = "_im_failed_action",
            io = "_im_mess_link",
            so = "_im_admin_name",
            oo = "_im_typer_c",
            lo = "_im_error",
            co = "_im_join_cancel",
            uo = "_im_retry_media",
            mo = "im-audio-message_recorded",
            go = "im-audio-message_recording",
            po = "_im_mess_srv",
            ho = "im_srv_mess_link",
            _o = "_chat_invitation",
            fo = "_im_mess",
            bo = "_im_replied_message",
            vo = "_im_replied_author_link",
            yo = !1,
            Oo = {};

        function Eo(e) {
            var t = Object(i.getTab)(e, e.get().peer);
            return !!Object(i.getPinnedMessage)(e) || !!t.top_banner
        }

        function Co(e, t) {
            var n = Object(f.unpackStore)(e),
                a = Object(i.getTab)(n, t);
            return Object(r.isChatPeer)(t) && Object(Ce.isPinnedMessageVisibleInTab)(n, t) || !!a.top_banner && !Object(i.isSearchShown)(t, n)
        }

        function wo(e, t) {
            return Object(r.getPinnedMessageHeight)()
        }

        function jo(e, t) {
            var n = ge("page_header"),
                a = geByClass1("_im_chat_input_w", t),
                r = a.offsetHeight - a.clientHeight;
            return Math.min(window.clientHeight() - r, Math.max(Math.max(0, e), eo + n.offsetHeight + t.offsetTop))
        }

        function So(e, t) {
            return geByClass1("_im_mess_" + t, e)
        }

        function ko(e, t, n) {
            var a, i, s, o, l, c, d, u, m, g = geByClass1(e, t);
            o = {
                onStartDrag: (e, t) => {
                    addClass(bodyNode, "cursor_ns_resize"), a = t, i = t
                },
                onDrop: () => {
                    removeClass(bodyNode, "cursor_ns_resize")
                },
                onDrag: (e, s) => {
                    var o = jo(i - a + s, t);
                    Object(r.setClassicChatHeight)(o), n().fixHeight()
                }
            }, d = function(e) {
                l = void 0 !== e.clientX ? e.clientX : e.touches[0].clientX, c = void 0 !== e.clientY ? e.clientY : e.touches[0].clientY, o.onDrag && o.onDrag.call(s, l, c)
            }, u = function e(t) {
                o.onDrop && o.onDrop.call(s, l, c), removeEvent(document, "mouseup touchend mouseleave", e), removeEvent(document, "mousemove touchmove", d)
            }, m = function(e) {
                (1 === e.which || e.touches && e.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", u), addEvent(document, "mousemove touchmove", d), l = void 0 !== e.clientX ? e.clientX : e.touches[0].clientX, c = void 0 !== e.clientY ? e.clientY : e.touches[0].clientY, o.onStartDrag && o.onStartDrag.call(s, l, c), o.onDrag && o.onDrag.call(s, l, c), cancelEvent(e))
            }, (s = g).beginDragHandler = m, addEvent(s, "mousedown touchstart", m)
        }

        function To(e, t) {
            var n;
            n = geByClass1(e, t), removeEvent(n, "mousedown touchstart", n.beginDragHandler)
        }

        function Io(e) {
            hide(e.target)
        }

        function Mo(e, t, n) {
            var r = Object(i.getTab)(t, n),
                s = Object(a.strHistory)(r.history);
            toggleClass(e, "im-page--history_empty-hist", !s)
        }

        function Ao(e) {
            return geByClass1("_im_peer_history", e)
        }

        function Lo(e, t) {
            var n = t.contHeight(),
                a = e.scrollTop + (n - e.contHeight);
            t.scrollTop(a)
        }

        function Po(e, t, n, i, s, o, l, c) {
            var d = !(arguments.length > 8 && void 0 !== arguments[8]) || arguments[8],
                u = arguments.length > 9 && void 0 !== arguments[9] && arguments[9],
                m = (t.get().tabs || {})[n];
            s().hideError(), o.renderPeer(t), c.renderPeer(t);
            var g = geByClass1("_im_peer_history", e);
            if (!t.get().tabHistoryNotChanged) {
                val(geByClass1("_im_page_peer_name", e), m.tab);
                var p = Object(a.strHistory)(m.history);
                Mo(e, t, n), p || (p = getLang("mail_im_here_history")), val(g, p), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), Object(r.isClassicInterface)(t) || Object(r.fixTableCellChildHeight)("_chat_body_wrap", e), Vo(t, i, e)
            }
            if (Object(a.isSearchingInplace)(n, t.get()) ? s().showSearch(t) : s().cancelSearch(t, !1), l.changePeer(n, t), t.get().msgid) Fo(i, e, t.get().msgid, t);
            else if (m.scrollBottom && d) {
                Lo(m, i);
                var h = Ws(Object(r.isMessagesVisible)(t, e, i), 1)[0];
                m.skipped || setTimeout(() => {
                    m.unread && !h && Go(t, e, !0), xo(t, i, e)
                }, 100)
            } else Bo(i, e, s, t, u) || i.scrollBottom(Xs);
            window.LazyLoad && window.LazyLoad.scan(!!i.scroll && i.scroll.scroller)
        }

        function Do(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || t.scrollTop(),
                r = t.scrollBottom(),
                i = t.contHeight(),
                s = e.get().peer;
            e.set(a.saveHistoryScroll.bind(null, s, n, r, i))
        }

        function xo(e, t, n) {
            var a = Object(i.isGoToEndVisible)(e),
                r = 4 * t.getScrollHeight();
            t.scrollBottom() > r && !a && Go(e, n, !0, 2 * t.getScrollHeight())
        }

        function No(e, t, n, s, o, l, c, d) {
            var u = !(arguments.length > 8 && void 0 !== arguments[8]) || arguments[8];
            if ((e.get().history_init || (e.get().history_init = !0, !(d.scrollTop() > 0))) && !Ee.screenfull.isFullscreen) {
                o.update(d), o.show();
                var m = e.get().peer;
                if (0 !== m && Object(r.isFullyLoadedTab)(e.get(), m) && (Es.onHistoryScroll(d.scrollTop()), !layers.visible)) {
                    var g = Object(i.isGoToEndVisible)(e),
                        p = Object(i.getTab)(e, m);
                    p && !p.skipped && c < 0 ? xo(e, d, l) : c > 0 && !p.skipped && !p.unread && Xo(e, l), Uo(e, d) && (g && p && !p.skipped && Xo(e, l), p.unread > 0 && Ro(e));
                    var h = Object(r.wrapLoading)(n);
                    if (!Object(a.isSearchingInplace)(m, e.get()) && u && s(d), !yo && (c < 0 || 0 === d.scrollBottom()) && d.scrollBottom() < Qs) {
                        if (Object(a.isSearchingInplace)(m, e.get())) return;
                        if (p.skipped > 0 && !e.get().no_moving_down) {
                            var _ = gpeByClass("_im_page_history", l),
                                f = e.get();
                            yo = !0;
                            var b = e.set(a.loadLessHistory).then(t().loadHistory.bind(null, f.peer, {
                                reversed: !0
                            })).then(() => {
                                Ro(e), yo = !1, Go(e, _), p.skipped || e.set(a.changePeer.bind(null, e.get().peer, !1, !1))
                            });
                            return zo(_, !0), void b.then(zo.bind(null, _, !1))
                        }
                    }
                    if (!yo && d.scrollTop() < Qs) {
                        if (Object(a.isSearchingInplace)(m, e.get())) {
                            yo = !0;
                            var v = t().getSearchResulstModule();
                            return v.isAll(e) ? void(yo = !1) : void h(v.loadMore(e).then(n => {
                                yo = !1, n && (t().loadHistory(e.get().peer, {}, e, n), s(d))
                            }), "up")
                        }
                        var y = e.get();
                        p.allShown || (yo = !0, h(e.set(a.loadMoreHistory.bind(null, 0, 0)).then(t().loadHistory.bind(null, y.peer, {})).then(() => {
                            yo = !1, s(d)
                        }), "up"))
                    }
                    c < 0 && tl(e, m, d.scrollBottom(), l, t), Object(a.videoAutoPlayHandler)()
                }
            }
        }

        function Ro(e) {
            if (!(window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle)) return e.set(a.readLastMessages.bind(null, e.get().peer))
        }

        function Bo(e, t, n, a, i) {
            var s = geByClass1("_im_unread_bar_row", t);
            if (s) {
                var o = a.get(),
                    l = o.peer,
                    c = s.getBoundingClientRect(),
                    d = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
                Object(r.isClassicInterface)(a) && (d += no + (Co(o, l) ? wo() : 0));
                var u = e.scrollTop() - d + c.top;
                return e.scrollTop(u), Do(a, e, u), setTimeout(() => {
                    l === a.get().peer && No(a, n, Ao(t), function() {}, i, t, 0, e)
                }, 80), Ro(a), !0
            }
            return !1
        }

        function Fo(e, t, n, a) {
            var i = So(t, n);
            if (i) {
                var s = Object(r.isClassicInterface)(a),
                    o = a.get().peer,
                    l = s ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                    c = i.offsetTop + domPN(i).offsetTop + domPN(domPN(i)).offsetTop + domPN(domPN(domPN(i))).offsetTop;
                s && Co(a, o) && (c -= wo(a.get())), e.scrollTop(c - e.getScrollHeight() / 2 + l / 2), addClass(i, "im-mess_light"), setTimeout(() => {
                    removeClass(i, "im-mess_light")
                }, Zs)
            }
        }

        function Ho(e, t, n) {
            n.updateLastSeen(e)
        }

        function Uo(e, t) {
            return Object(i.getUnreadScrollBottom)(e) >= intval(t.scrollBottom())
        }

        function Go(e, t, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                s = e.get().peer;
            if (!Object(r.isReservedPeer)(s)) {
                var o = e.get().tabs[s],
                    l = (t || document).querySelector(ao);
                qo(t, e);
                var c = !1;
                (n || o.skipped > 0) && !Object(a.isSearchingInplace)(s, e.get()) ? (c = !0, addClass(l, "im-to-end_shown")) : Qo(l, !0), e.set(a.updateGoToEndVisibility.bind(null, [c, intval(i)]))
            }
        }

        function qo(e, t) {
            var n = t.get(),
                a = n.peer,
                r = n.tabs[a];
            (e || document).querySelector(ao).querySelector("._im_to_end_label").innerHTML = Number(r.unread) > 0 ? Ys(r.unread) : ""
        }

        function $o(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return (0 !== e.scrollTop() || 0 !== e.scrollBottom()) && e.scrollBottom() < (t ? Js + t : Js)
        }

        function zo(e, t) {
            if (e) {
                var n = e.querySelector(ao);
                toggleClass(n, "im-to-end_loading", t)
            }
        }

        function Ko(e, t, n, r) {
            if (!t.get().tabs[t.get().peer].skipped) return r.scrollBottom(Xs), Go(t, n), Ro(t), void tl(t, t.get().peer, 0, n, e);
            zo(n, !0), t.set(a.changePeer.bind(null, t.get().peer, !1, !1)).then(() => t.set(a.loadPeer.bind(null, t.get().peer, !0, -1, !1))).then(() => {
                zo(n, !1), e().changePeer(t, !1, !1), Ro(t)
            })
        }

        function Vo(e, t, n) {
            var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (Object(r.isClassicInterface)(e)) {
                var i = t.contHeight(),
                    s = geByClass1("_im_chat_input_w", n),
                    o = s.offsetHeight - s.clientHeight,
                    l = geByClass1("_im_chat_resize", n),
                    c = geByClass1("_im_chat_input_parent", n),
                    d = geByClass1("_im_chat_audio_input_parent", n);
                if (!1 !== (a = !1 !== a ? a : Object(r.getClassicChatHeight)()) && a > 0) {
                    var u = jo(a, n),
                        m = u - (hasClass(d, go) || hasClass(d, mo) ? d : c).offsetHeight;
                    l.style.height = window.clientHeight() - u - o + "px", setStyle(s, {
                        top: m + "px",
                        bottom: "auto"
                    })
                } else l.style.height = "0px", setStyle(s, {
                    top: "auto",
                    bottom: "0px"
                });
                var g = geByClass1("_im_peer_history_w", n);
                return setStyle(g, {
                    borderBottomWidth: s.offsetHeight - to - 1
                }), t.contHeight() - i
            }
            Object(r.fixTableCellChildHeight)("_chat_body_wrap", n);
            var p = t.getScrollHeight();
            return t.update(!1, !0), p - t.getScrollHeight()
        }

        function Wo(e, t, n, a) {
            var r = t.offsetHeight;
            a(), e.heightIncreased(t.offsetHeight - r, n)
        }

        function Yo(e, t) {
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

        function Qo(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
        }

        function Xo(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = t.querySelector(ao);
            e.set(a.updateGoToEndVisibility.bind(null, [!1, 0])), Qo(r, n)
        }

        function Jo(e) {
            var t = Object(i.getCurrentTab)(e);
            Object(r.isChatPeer)(t.peerId) && (t.pinHideId = cur.imDb.select(Bs.PIN_HIDDEN_ID_OP, t.peerId))
        }

        function Zo(e, t, n, a, r) {
            e.setState({
                isEditing: !1
            }), removeClass(a, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, Object(i.getPeer)(e) ? Object(i.getTabDraft)(Object(i.getCurrentTab)(e)) : null), n.toggleStickers(e, !0), n.restoreKeyboard(), el(t)
        }

        function el(e) {
            Object(f.toArray)(geByClass("_im_history_tooltip", e)).forEach(hide)
        }

        function tl(e, t, n, r, s) {
            var o = Object(i.getTab)(e, t);
            if (!(Date.now() - (o.lastReset || 0) < 1e3) && (o && o.msgs && o.history && !yo && o.offset > 300 && 0 == o.skipped && n < 50 && n >= 0 && 0 === (e.get().selectedMessages || []).length)) {
                var l = Object.keys(o.msgs).filter(e => e > 0).sort((e, t) => e - t).slice(0, -50),
                    c = l.slice(-1)[0];
                e.mutate(a.resetTabAll.bind(null, t)), e.set(a.removeMessages.bind(null, l, t)).then(() => s().removeStartingFromMessage(c, t, e))
            }
        }

        function nl(e) {
            checkEvent(e) || cancelEvent(e)
        }

        function al(e, t, n, c, d, m, g, p, h, _, f, b, v, y, O, E) {
            var C, w = throttle(function() {
                n.smoothScroll(...arguments)
            }, 300);
            return {
                fixKeyboard() {
                    d.fixKeyboard()
                },
                changePeer(e) {
                    var s = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    if (0 === e.get().peer && O.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return d.setDraft(e, null),
                        function(e) {
                            addClass(e, "im-page--history_empty"), Ao(e).innerHTML = ""
                        }(t);
                    if (Object(r.isFullyLoadedTab)(e.get(), e.get().peer)) {
                        removeClass(t, "im-page--history_search"), e.set(a.dropSelection), c.changeActions(e);
                        var l = e.get().peer,
                            u = e.get().prevPeer;
                        removeClass(t, "im-page--history_loading"), toggleClass(t, "im-page--history_vkcomgroup", Object(r.isFvkcomgroup)(e, l)), s ? d.setDraft(e, Object(i.getTabDraft)(Object(i.getCurrentTab)(e))) : d.updateState(e), Go(e, t), m().updateTyping(l, e), O.toggle(!0), Ho(e, 0, c), Object(r.isReservedPeer)(u) && !Object(r.isReservedPeer)(l) ? (! function(e, t, n, a, r, i, s, o, l, c) {
                            removeClass(e, "im-page--history_empty"), Po(e, t, n, a, r, i, s, o, l, c)
                        }(t, e, l, n, m, c, p, E, o, O), O.reset(n)) : Object(r.isReservedPeer)(u) || Object(r.isReservedPeer)(l) || (Po(t, e, l, n, m, c, p, E, o, O), O.reset(n)), Object(r.isReservedPeer)(l) || No(e, m, Ao(t), v, O, t, 0, n), Object(r.ensureDomHasActions)(t)
                    }
                },
                preparePeer(e) {
                    var n = Object(i.getPeer)(e);
                    Jo(e), d.setDraft(e, Object(i.getTabDraft)(Object(i.getTab)(e, n))), m().updateTyping(n, e), m().hideError(), c.renderPeer(e), E.renderPeer(e), c.hideActions(e), p.changePeer(n, e), Ho(e, 0, c), O.toggle(!1), Xo(e, t, !0)
                },
                saveScroll: e => Do(e, n),
                loadingPeer(e) {
                    Object(a.isAnythingLoading)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
                },
                stopLoading(e) {
                    removeClass(t, "im-page--history_loading")
                },
                deselectDialog(e) {
                    g().removeSelection(e)
                },
                replaceMessageAttrs(e, n) {
                    Object(r.replaceMessageAttrs)(n.get(), Ao(t), e)
                },
                cleanSelection(e) {
                    _.cleanSelection(e)
                },
                updateDialogFilters(e) {
                    g().updateDialogFilters(e)
                },
                getSearchResulstModule: () => C,
                insertSearch(e, a) {
                    C || (c.deselectAll(a), C = u(t, a)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), Ao(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), Ao(t).innerHTML = Object(r.renderEmptySearch)()), Vo(a, n, t), n.scrollBottom(0), Go(a, t), O.reset(n)
                },
                updateChatTopic(e, t) {
                    g().updateDialog(e, t), e === t.get().peer && (c.renderPeer(t), c.renderActions(t), E.renderPeer(t))
                },
                updateActions(e) {
                    c.changeActions(e)
                },
                updateChatPhoto(e, a, i) {
                    if (Object(r.isPeerActive)(e.peerId, i.get())) {
                        c.renderPeer(i), E.renderPeer(i);
                        var s = $o(n);
                        Object(r.addChatPhotoToUpdate)(e, a, i.get(), Ao(t)), s && n.scrollBottom(Xs)
                    }
                },
                markImportant(e, n, a) {
                    So(t, e) && (c.changedMessageSelection(a), h.markImportant(e, n, a))
                },
                isNewMessagesVisible: e => Uo(e, n),
                loadHistory(e, a, i) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        o = i.get();
                    if (Object(r.isPeerActive)(e, o)) {
                        var l = s || o.tabs[e].historyToAppend;
                        if (!l) return;
                        var c = geByClass1("_im_peer_history", t),
                            d = domFC(c),
                            u = n.scrollBottom(),
                            m = a.reversed ? e => c.appendChild(e) : e => c.insertBefore(e, d),
                            g = 0;
                        a.reversed && (g = c.offsetHeight);
                        var p = sech(l),
                            h = document.createDocumentFragment();
                        p.forEach(e => h.appendChild(e)), m(h), a.reversed && O.heightIncreased(c.offsetHeight - g, n), a.reversed || n.scrollBottomFixSave(u), n.update(!1, !0);
                        var _ = p.filter(e => hasClass(e, "_im_bar_date"));
                        O.parseMore(_, n), Object(r.ensureDomHasActions)(t)
                    }
                },
                sendMessage(e) {
                    0 !== e.get().peer && d.sendMessage()
                },
                editMessage(e, a) {
                    if (Object(r.isFullyLoadedTab)(e, a.peerId) && Object(r.isPeerActive)(a.peerId, e.get())) {
                        if (!So(t, a.messageId)) return;
                        Do(e, n), Object(r.editAndReplaceMessage)(e.get(), a, t), Lo(Object(i.getTab)(e, a.peerId), n), c.reRenderPinned(e), O.reset(n)
                    }
                },
                addMessage(e, o) {
                    if (!Object(a.isSearchingInplace)(o.peerId, e.get()) && Object(r.isFullyLoadedTab)(e, o.peerId) && Object(r.isPeerActive)(o.peerId, e.get())) {
                        if (So(t, o.messageId)) return;
                        var l = Ao(t);
                        Wo(O, l, n, () => {
                            var a = $o(n),
                                c = geByClass1("_im_unread_bar_row", t),
                                d = Ws(Object(r.isMessagesVisible)(e, t, n), 2),
                                u = d[0],
                                g = d[1];
                            Object(r.appendToHistory)(e.get(), o, l, !0, !0, !u && !c), removeClass(t, "im-page--history_empty-hist");
                            var p = Object(i.getTab)(e, e.get().peer),
                                h = Object(s.isServiceMsg)(o) && o.userId === vk.id,
                                _ = o.kludges && o.kludges.source_act,
                                f = h && _ !== r.CHAT_PIN_MESSAGE && _ !== r.CHAT_UNPIN_MESSAGE;
                            p.skipped || u || !Object(s.isUnread)(p, o) || Object(s.isOut)(o) || Go(e, t, !0, g), (o.local || a || f) && n.scrollBottom(0), m().updateTyping(o.peerId, e), qo(t, e), el(t)
                        });
                        var c = domPS(domLC(l));
                        if (hasClass(c, "_im_bar_date")) {
                            var d = ce("div");
                            d.innerHTML = c.outerHTML, O.parseMore(d, n)
                        }
                        m().hideError(), O.update(n), Object(a.updateMentions)(e.get()), tl(e, o.peerId, n.scrollBottom(), 0, m)
                    }
                },
                setMessageErrored(e, n, a, i) {
                    a && "string" == typeof a && m().showError(a), Object(r.setMessageError)(e, n, t)
                },
                markMessagesAsRead(e, n) {
                    e.get().peer === n.peerId && Object(r.markMessagesAsRead)(e.get(), n.peerId, t)
                },
                compensateHistoryHeightChange(e) {
                    n.scrollTop(n.scrollTop() + e * wo(b.get(), b.get().peer))
                },
                updateTyping(e, n) {
                    if (!Object(a.isSearchingInplace)(e, n.get())) {
                        var s = n.get();
                        if (s.peer === e && Object(r.isFullyLoadedTab)(s, e)) {
                            var o = Object(r.formatTyper)(Object(i.getTab)(n, e).activity, e, !1, s),
                                l = geByClass1(r.TYPING_CLASS, t);
                            if (l || o) {
                                if (!l) {
                                    var c = geByClass1(oo, t);
                                    val(c, getTemplate("im_typing", {
                                        cls: Object(r.isClassicInterface)(n) ? "im-activity_classic" : ""
                                    })), l = geByClass1(r.TYPING_CLASS, t)
                                }
                                val(geByClass1("_im_typing_name", l), o);
                                var d = Object(r.loadSummaryActivityType)(Object(i.getTab)(n, e).activity || {}) === a.ACTIVITY_TYPE_RECORDING_AUDIO;
                                l.setAttribute("data-activity-type", d ? "recording" : "typing"), o ? (addClass(l, "im-page--typing_vis"), m().hideError()) : removeClass(l, "im-page--typing_vis")
                            }
                        }
                    }
                },
                scrollFix(e, t, a) {
                    O.heightIncreased(a, n), O.update(n), Object(r.isPeerActive)(t, e.get()) && $o(n, a) && n.scrollBottom(Xs)
                },
                goToEnd() {
                    Ko(() => this, b, t, n)
                },
                updateGoToEnd(e, a) {
                    var r = Object(i.getTab)(e, e.get().peer);
                    r && r.skipped ? Go(e, t) : Xo(e, t, a), f(0, n, !1);
                    var s = e.get().peer;
                    setTimeout(() => {
                        e.get().peer === s && Do(e, n)
                    })
                },
                newMessage(e) {
                    g().newMessage(e), Xo(e, t, !0)
                },
                scroll(e, t) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (0 !== e.get().peer) {
                        var i = a ? n.getScrollHeight() : 40;
                        !0 === r && (i = n.contHeight()), i = "up" === t ? -i : i, a || r ? w(i, () => {
                            f(i, n)
                        }) : (n.scrollTop(n.scrollTop() + i), f(i, n))
                    }
                },
                showCreation(e, t) {
                    g().showCreation(e, t)
                },
                updateScroll: () => Vo(b, n, t),
                toggleBarDate(e) {
                    O.toggle(e)
                },
                changedMessageSelection(e) {
                    c.changedMessageSelection(e)
                },
                updateOnline(e, t) {
                    Object(r.isTabLoaded)(t.get(), e) && e === t.get().peer && c.renderPeer(t)
                },
                isEmpty: e => d.isEmpty(e),
                replaceAttachmentPlaceholders(e, a) {
                    if (Object(r.isPeerActive)(a.peerId, e.get())) Wo(O, Ao(t), n, () => {
                        var s = $o(n);
                        Object(r.replaceAttaches)(t, a, e.get());
                        var o = Object(i.getTab)(e, a.peerId);
                        if (o.mediacontent[a.messageId].length >= 3 && o.mediacontent[a.messageId][2].pinned) {
                            var l = Object(i.parserMessage)(o.pinned);
                            l && l.messageId == a.messageId && (o.pinned = o.mediacontent[a.messageId][2].pinned, c.reRenderPinned(e))
                        }
                        s && n.scrollBottom(0)
                    }), O.update(n);
                    else if (Object(s.isMoneyRequest)(a)) {
                        var o = Object(i.getTab)(e, a.peerId);
                        if (o.mediacontent[a.messageId].length >= 3 && o.mediacontent[a.messageId][2].pinned) {
                            var l = Object(i.parserMessage)(o.pinned);
                            l && l.messageId == a.messageId && (o.pinned = o.mediacontent[a.messageId][2].pinned)
                        }
                    }
                },
                removeMessages(e, a, i) {
                    i.get().peer === a && (Object(r.removeMessages)(e, Ao(t)), Vo(i, n, t), c.changedMessageSelection(i))
                },
                removeStartingFromMessage(e, a, i) {
                    if (i.get().peer === a) {
                        var s = Ao(t),
                            o = geByClass1("_im_mess_" + e, s);
                        Object(r.removeStartingFromMessage)(o, s), Vo(i, n, t), c.changedMessageSelection(i)
                    }
                },
                hideGoToEnd(e) {
                    Xo(b, t, e)
                },
                removeMessagesRestore(e, n, a, i) {
                    i.get().peer === n && Object(r.removeMessagesWithRestore)(e, n, a, Ao(t))
                },
                updateState(e, t) {
                    g().updateState(e, t)
                },
                updateBanner(e) {
                    E.renderPeer(e)
                },
                updateChat(e, t) {
                    e.get().peer === t && (c.changeActions(e), c.renderPeer(e), c.renderActions(e), E.renderPeer(e), d.updateState(e), Object(a.updateMentions)(e.get()))
                },
                focustTxt(e) {
                    d.focusOn(e)
                },
                startSearch(e) {
                    m().showSearch(e), p.changePeer(e.get().peer, e), p.search()
                },
                showSearch(e) {
                    addClass(t, "im-page--hisory_search-open"), e.setState({
                        searchShown: !0
                    }), Eo(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(() => p.focus(e), 10)
                },
                cancelSearch(e) {
                    var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                            searchShown: !1
                        }), Eo(e) && this.updateChatTopic(e.get().peer, e), c.changedMessageSelection(e)), i && !Object(r.isReservedPeer)(e.get().peer) && C) {
                        var s = e.get().tabs[e.get().peer];
                        Ao(t).innerHTML = Object(a.strHistory)(s.history), Vo(e, n, t), n.scrollBottom(0), e.get().msgid && (Fo(n, t, e.get().msgid, e), Go(e, t)), v(n), O.reset(n)
                    }
                    C && (C.unmount(), C = !1, Object(r.ensureDomHasActions)(t))
                },
                updateHistory(e) {
                    0 !== b.get().peer && e(t)
                },
                focusOnMessage() {
                    Fo(n, t, b.get().msgid, b)
                },
                sendEditMessage(e, t) {
                    e.set(a.deliverEditedMessage.bind(null, Object(i.getTab)(e, t.peerId), t)).catch(n => e.get().longpoll.push([Object(l.failedMessage)(t.peerId, t, n)]))
                },
                unmount() {
                    Object(o.destroyModule)(e), n.destroy(), clearInterval(y), d.unmount(), c.unmount(), h.unmount(), _.unmount(), p.unmount(), cancelStackFilter("forward"), To("_im_chat_resize_track", t)
                },
                removePeer(e, t) {
                    g().removePeer(e, t)
                },
                restoreScroll(e, t) {
                    var a = e.get().tabs[t];
                    a.scrollBottom ? Lo(a, n) : n.scrollBottom(Xs)
                },
                resendMessage(e, n) {
                    e === b.get().peer && Object(r.startResendMessage)(e, n, t)
                },
                respond(e, t) {
                    d.attachMessages(e, t), d.focusOn(e);
                    var a = Object(i.getTab)(e, t);
                    a && !a.skipped && (n.scrollBottom(Xs), v(n))
                },
                cancelRecording() {
                    d.cancelRecording()
                },
                hideError() {
                    hide(geByClass1(lo, t))
                },
                showError(e) {
                    geByClass1(lo, t).innerHTML = e, show(geByClass1(lo, t)), n.scrollBottom(Xs)
                },
                startEditing(e) {
                    if (Object(a.isAnythingLoading)(b.get())) Object(r.showWaitUntilUploadedBox)();
                    else {
                        e = Object(i.parserMessage)(e);
                        var n = Object(r.getNowEditingMessage)(b);
                        if (!(d.isBlocked() || n && n.messageId == e.messageId)) {
                            n && this.cancelEditing(), el(t), b.get().searchShown && this.cancelSearch(b);
                            var s = So(t, e.messageId);
                            s && (this.cancelRecording(), function(e, t, n, a, r) {
                                e.setState({
                                    isEditing: !0
                                }), n.saveText(e), addClass(a, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", () => Zo(e, t, n, a, r));
                                var i = new rn.ImDraft;
                                i.dData.txt = Object(Wr.convertEmojiHtmlToRegularText)(r.text), i.dData.attaches = Object(Yr.convertKludgesToAttaches)(r.kludges, r.messageId), n.toggleStickers(e, !1), n.setDraft(e, i), setTimeout(() => n.focusOn(e), 0)
                            }(b, t, d, s, e), d.hideKeyboard(), c.deselectAll(b))
                        }
                    }
                },
                cancelEditing() {
                    var e = Object(r.getNowEditingMessage)(b);
                    e && Zo(b, t, d, So(t, e.messageId))
                },
                getEditingMessage: () => Object(r.getNowEditingMessage)(b),
                focusEditingMessage() {
                    var e = Object(r.getNowEditingMessage)(b);
                    e && Fo(n, t, e.messageId, b), d.focusOn(b)
                },
                setNetworkWaitingStatus(e) {
                    c.setNetworkWaitingStatus(e)
                },
                setNetworkReconnectingStatus() {
                    c.setNetworkReconnectingStatus()
                },
                clearNetworkStatus() {
                    c.clearNetworkStatus()
                }
            }
        }

        function rl(e, t, n, c, d) {
            var u = geByClass1("_im_peer_history_w", e);
            show(u), hasAccessibilityMode() && addClass(u, "history_a11y");
            var m, g, p, h = Object(o.createMutations)(al),
                _ = h.callMutations,
                v = h.bindMutations,
                y = (m = Do.bind(null, t), g = debounce(m, 100), p = throttle(m, 100), e => {
                    g(e), p(e)
                }),
                O = Ns(t, e),
                E = No.bind(null, t, _, u, y, O, e),
                C = Object(b.createScroll)(geByClass1("_im_chat_body_abs", e), {
                    onScroll: E,
                    nativeScroll: Object(r.isClassicInterface)(t),
                    shadows: !1
                });
            setTimeout(function() {
                t.get().peer && (Jo(t), (Object(i.getCurrentTab)(t).pinned || Object(i.getCurrentTab)(t).top_banner) && (_().updateChatTopic(t.get().peer, t), t.set(a.setActions), w.changeActions(t)), t.get().msgid ? Fo(C, e, t.get().msgid, t) : Bo(C, e, _, t, O) || C.scrollBottom(Xs), t.get().history_init = !1, O.reset(C), Go(t, e), No(t, _, u, y, O, e, 0, C), Object(r.ensureDomHasActions)(e), nav.objLoc.st && (t.mutate(a.setInplaceSearch.bind(null, nav.objLoc.st, t.get().peer)), _().startSearch(t)))
            }, 15);
            var w = ca(geByClass1("_im_dialog_actions", e), t, _),
                j = Xi(geByClass1("_im_text_input", e), t, Object(r.isClassicInterface)(t) ? c.updateMenu : void 0, (e, t) => {
                    n.removeDialog(e, t), n.restoreDialogs(e, !0)
                }, _),
                S = ds(geByClass1("_im_dialog_actions", e), t, _),
                k = fs(e, t, _),
                T = Os(e, t, () => ({
                    changedMessageSelection: w.changedMessageSelection
                }));
            Object(Ce.mount)(e, t, _);
            var I = Ks(e, t, () => ({
                hidePinned() {
                    Object(Ce.pinnedMessageHide)(t, t.get().peer, _, !1)
                },
                compensateHistoryHeightChange(e) {
                    _().compensateHistoryHeightChange(e)
                },
                showPinned() {
                    Object(Ce.pinnedMessageUnHide)(t, t.get().peer, _, !1)
                }
            }));
            Object(r.isReservedPeer)(t.get().peer) || t.set(a.restoreHistoryQueue.bind(null, t.get().peer)).then(() => {
                Object(r.restoreQueue)(t.get().peer, t.get(), Ao(e)), Mo(e, t, t.get().peer)
            }), AudioMessagePlayer.events.on("listened", function(e, t) {
                var n = domClosest(fo, t);
                if (n) {
                    var r = Number(n.getAttribute("data-msgid")),
                        o = e.get().peer,
                        l = Object(i.getMessage)(e, o, r);
                    r && l && !Object(s.isOut)(l) && Object(a.markAudioMessageAsListened)(o, r, e.get())
                }
            }.bind(null, t)), ko("_im_chat_resize_track", e, d);
            var M = function(e, t, n, a, r) {
                    var s = domData(r, "msgid"),
                        o = e.get().peer,
                        c = Object(i.getMessage)(e, o, s);
                    c.type === l.EDIT_MESSAGE ? (n().sendEditMessage(e, c), n().resendMessage(o, s)) : e.get().imQueueResend(o, s).then(t => {
                        e.get().longpoll.push([Object(l.resendEvent)(o, t.mess)])
                    })
                }.bind(null, t, e, _),
                A = function(e, t, n, i, s) {
                    var o = intval(domData(s, "peer")),
                        l = intval(domData(gpeByClass("_im_mess", s), "msgid")),
                        c = e.get().tabs[o].hash;
                    return Object(a.restoreMessageSend)(l, o, c, e.get().gid), e.set(a.restoreMessage.bind(null, l, o)).then(r.restoreMessage.bind(null, l, o, Ao(t))).then(() => Vo(e, n, t)), !1
                }.bind(null, t, e, C),
                L = function(e, t) {
                    e().showCreation(t)
                }.bind(null, d, t),
                P = Ko.bind(null, _, t, e, C),
                D = function(e, t, n, a) {
                    if (hasClass(n.target, "_im_mess_marker")) {
                        var i = n.target;
                        window.tooltips && Object(f.toArray)(geByClass(r.FAILED_CLASS, t)).map(e => geByClass1("_im_mess_marker", e)).filter(e => e !== i).forEach(e => tooltips.hide(e, {
                            fasthide: !0
                        }));
                        var s = domData(a, "msgid");
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
                x = r.showEditTimeTooltip.bind(null, t),
                N = r.showMessageInfoTooltip.bind(null, t),
                R = function(e, t, n, i, s) {
                    var o = domData(s, "action"),
                        l = domData(s, "msgid"),
                        c = geByClass1("_im_mess_marker", So(n, l)),
                        d = Number(l) > 0 ? "edit" : "send";
                    switch (o) {
                        case "resend":
                            Object(Oe.statlogsSendingRetry)("retry", d), t(i, s);
                            break;
                        case "delete":
                            Object(Oe.statlogsSendingRetry)("delete", d), e.set(a.removeFailed.bind(null, e.get().peer, l)).then(() => {
                                Object(r.removeMessages)([l], Ao(n))
                            })
                    }
                    tooltips.hide(c, {
                        fasthide: !0
                    })
                }.bind(null, t, M, e),
                B = function(e, t, n, r, i) {
                    if (checkEvent(r)) return !0;
                    var s = Object(Vs.fromQueryString)(i.getAttribute("href")),
                        o = intval(s.msgid);
                    o && e.set(a.changePeer.bind(null, e.get().peer, o, !1)).then(() => Fo(n, t, o, e)), cancelEvent(r)
                }.bind(null, t, e, C),
                F = function(e, t, n) {
                    Ee.screenfull.isFullscreen || 0 === t.get().peer || Object(r.isClassicInterface)(t) || e().restoreScroll(t, t.get().peer)
                }.bind(null, _, t, C),
                H = function(e, t) {
                    var n = e.get(),
                        o = n.peer,
                        l = domClosest(po, t.target),
                        c = intval(domData(l, "msgid")),
                        d = Object(i.getMessage)(e, o, c),
                        u = d && Object(s.isServiceMsg)(d) && d.kludges.source_act;
                    if (u === r.CHAT_PIN_MESSAGE || u === r.CHAT_UNPIN_MESSAGE) {
                        var m = l.querySelector("." + ho);
                        if (m && "A" !== m.tagName) {
                            var g = d.kludges.source_chat_local_id;
                            if (!g || Oo[g]) return;
                            Oo[g] = Object(a.getMessageLocalId)(o, g, n).then(e => {
                                var t = Ws(e, 1)[0];
                                if (t) {
                                    var n = `/im?sel=${Object(r.convertPeerToUrl)(o)}&msgid=${t}`,
                                        a = m.innerHTML;
                                    domReplaceEl(m, Object(r.serviceLink)(n, a, !0, ho)), delete Oo[g]
                                }
                            })
                        }
                    }
                }.bind(null, t),
                U = function(e, t, n) {
                    var a = e.get(),
                        s = a.peer,
                        o = n.target.href && n.target.href.match(/msgid=([\d]+)/),
                        c = o && o[1];
                    "A" !== n.target.tagName || !c || Object(r.isAlreadyDeleted)(e, s, c) || checkEvent(n) || (Object(i.getMessage)(e, s, c) ? (e.setState({
                        msgid: c
                    }), Object(Rs.updateLocation)({
                        msgid: c
                    }), t().focusOnMessage()) : a.longpoll.push([Object(l.changePeer)(s, c)])), cancelEvent(n)
                }.bind(null, t, _),
                G = function(e, t, n, a) {
                    var i = a.target,
                        s = domClosest(bo, i),
                        o = Number(s.getAttribute("data-msgid")),
                        l = domClosest("im-mess", i),
                        c = Number(l.getAttribute("data-msgid")),
                        d = e.get().peer;
                    o && !Object(r.isAlreadyDeleted)(e, d, o) ? (e.setState({
                        msgid: o
                    }), Object(Rs.updateLocation)({
                        msgid: o
                    }), Object(r.focusOnMessage)(e, t().focusOnMessage, d, o)) : c && Object(r.showRepliedBox)(e, c, a)
                }.bind(null, t, _, e),
                q = Object(o.createModule)({
                    handlers: (n, s) => {
                        s(e, "click", r.RESTORE_CLASS, A), s(e, "mouseover click", r.FAILED_CLASS, D), s(e, "mouseover", "_im_edit_time", x), s(e, "mouseover", "_im_page_info", N), s(e, "click", "_im_mess_susp", function(e, t) {
                            var n = intval(domData(t.target, "msgid")),
                                a = gpeByClass(`_im_mess_${n}`, t.target),
                                r = geByClass1("_im_log_body", a),
                                i = geByClass1("_im_mess_susp_cont", a);
                            r.innerHTML = i.innerHTML
                        }.bind(null, e)), s(e, "click", ro, R), s(e, "click", io, B), s(e, "mouseover", so, Yo), s(e, "mouseover", po, H), s(e, "click", ho, U), s(e, "click", lo, Io), s(e, "click", bo, G), s(e, "click", vo, nl), s(e, "click", _o, (e, n) => {
                            if (checkEvent(e)) return !0;
                            if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                            var i = geByClass1("flat_button", n),
                                s = {
                                    invite_chat_id: domData(i, "inv-id"),
                                    invite_hash: domData(i, "hash")
                                };
                            Object(r.showInvitationBox)(t, s, a.leaveInvitation), cancelEvent(e)
                        }), s(e, "click", co, () => t.get().longpoll.push([Object(l.resetPeer)()])), s(e, "click", uo, e => (function(e, t, n) {
                            var s = e.get(),
                                o = domClosest(fo, n.target),
                                l = domData(o, "msgid"),
                                c = Object(i.getMessage)(s, s.peer, l),
                                d = e => t().replaceAttachmentPlaceholders(e, c);
                            c && (Object(Oe.statlogsSendingRetry)("retry_attach"), e.set(a.addAttachmentsToStoreData.bind(null, c, [Object(r.renderMessageMedia)(e, c)])).then(d), e.set(a.loadMedia.bind(null, c)).then(d))
                        })(t, _, e)), n(geByClass1("_im_peer_history_w", e), "mousemove", O.show), n(geByClass1("_im_start_new", e), "click", L), n(e.querySelector(ao), "click", P), n(geByClass1("_im_cancel_edit", e), "click", () => (_().cancelEditing(), !1)), n(geByClass1("_im_edit_focus_cur", e), "click", () => (_().focusEditingMessage(), !1)), Ee.screenfull.raw && n(document, Ee.screenfull.raw.fullscreenchange, F), n(window, "im_goToMessage", e => {
                            var n = intval(e.msgid);
                            if (n) return window.statlogsValueEvent("im_links_to_attachments", 1, "to_message"), t.set(a.changePeer.bind(null, e.sel, n, !1)).then(() => Object(r.focusOnMessage)(t, _().focusOnMessage, t.get().peer, n))
                        })
                    }
                });
            curNotifier.recvClbks.pin_hide = [function(e) {
                e.hide ? Object(Ce.pinnedMessageHide)(t, e.peer, _, !1) : Object(Ce.pinnedMessageUnHide)(t, e.peer, _, !1)
            }], window.showForwardBox = e => (function(e, t) {
                Object(r.boxHandleMessagesLabelsTooltips)(showBox("al_im.php", t, {
                    dark: 1
                }), e)
            })(t, e);
            var $ = setInterval(Ho.bind(null, t, e, w), 1e4);
            return v(q, e, C, w, j, _, d, S, k, T, E, t, y, $, O, I)
        }

        function il(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var sl = [],
            ol = 0,
            ll = !1;

        function cl(e) {
            sl = sl.reduce((t, n) => {
                var a = il(n, 2),
                    r = a[0],
                    i = a[1];
                return i(e) ? t : t.concat([
                    [r, i]
                ])
            }, [])
        }

        function dl(e, t) {
            !1 === ll && (ll = !0, document.body.addEventListener("click", cl, !0)), sl = sl.concat([
                [e, t]
            ])
        }

        function ul(e) {
            sl = sl.filter(t => {
                return il(t, 1)[0] !== e
            }), 0 === ol && (document.body.removeEventListener("click", cl, !0), ll = !1)
        }

        function ml(e, t) {
            sl = sl.map(n => {
                var a = il(n, 2),
                    r = a[0],
                    i = a[1];
                return r === e ? [e, t] : [r, i]
            })
        }

        function gl(e, t) {
            return 0 === t.length ? t => (e(t), !0) : n => {
                var a = t.reduce((e, t) => e && !domClosest(t, n.target), !0);
                return a && e(n), a
            }
        }
        var pl = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return ol++, {
                stop() {
                    ol--, ul(e)
                },
                replaceOrAdd(n) {
                    var a = sl.filter(t => {
                            var n = il(t, 1)[0];
                            return e === n
                        }),
                        r = gl(n, t);
                    a.length > 0 ? ml(e, r) : dl(e, r)
                }
            }
        };

        function hl(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function _l(e, t, n, i) {
            var s = ge("box_layer_wrap"),
                c = t.get().longpoll,
                d = _({
                    peer: 0,
                    longpoll: c,
                    oCache: {},
                    tabs: Object(r.tabFromIds)(i.msgs, i.hash)
                }),
                m = fs(e.bodyNode, d, () => ({})),
                g = u(e.bodyNode, t);
            Object(r.ensureDomHasActions)(e.bodyNode);
            var p = function(e, t, n) {
                for (var r = arguments.length, i = new Array(r > 3 ? r - 3 : 0), s = 3; s < r; s++) i[s - 3] = arguments[s];
                i.filter(e => inArray(e.type, [l.SET_FLAGS, l.RESET_FLAGS, l.CHANGE_PEER])).forEach(r => {
                    if (r.type !== l.CHANGE_PEER) {
                        if (r.flags === l.FLAG_IMPORTANT) {
                            var i = r.type === l.SET_FLAGS;
                            e.set(a.updateFavMessage.bind(null, [r.messageId], 0, i)).then(n => {
                                t.markImportant(r.messageId, i, e)
                            })
                        }
                    } else n.hide()
                })
            }.bind(null, t, m, e);
            c.onData(p);
            var h = function(e, t, n, i) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var s = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(r.wrapLoading)(s)(Object(a.loadImportant)(e.offset).then(t => {
                            var n = hl(t, 4),
                                o = (n[0], n[1]),
                                l = (n[2], n[3]);
                            e.all = l.all, e.offset = l.offset, e.all ? addClass(s, "im-important_all") : e.loading = !1, i.set(a.mergeTabs.bind(null, Object(r.tabFromIds)(l.msgs, l.hash)));
                            var c = ce("div");
                            c.innerHTML = o, s.appendChild(c), Object(r.ensureDomHasActions)(s)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: !1,
                    loading: i.all,
                    offset: i.offset
                }, e, s, d),
                f = Object(o.createModule)({
                    handlers: (e, t) => {
                        e(s, "scroll", h)
                    }
                });
            return {
                unmount() {
                    Object(o.destroyModule)(f), g.unmount(), m.unmount(), c.offData(p)
                }
            }
        }
        var fl = n("XzvV");

        function bl(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var vl = debounce(P.statlogsProbValueEvent, 1e3),
            yl = "_im_important_counter",
            Ol = "_im_gim_mute";

        function El(e) {
            return ge("im_dialogs_search", e)
        }

        function Cl(e, t, n, r, s, o) {
            var l = trim(o);
            if (Object(i.isSearchingValue)(e, l)) {
                var c = kl.bind(null, e, n, s, t);
                l ? (e.setState({
                    recentSearch: !1
                }), s.stop()) : s.replaceOrAdd(c), cancelStackPush("im_search", c), l && e.set(a.setCurrentSearch.bind(null, l, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
            } else l || (s.stop(), e.set(a.setCurrentSearch.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
        }

        function wl(e, t, n) {
            return function() {
                var a = Object(i.getSearchText)(t);
                a === e && n(...arguments)
            }
        }

        function jl(e, t, n) {
            var r = Object(i.getSearchText)(n);
            return vl(.01, "im_search_stat", 1, "search_start"), Object(a.updateSearchQuery)(r), n.setState({
                recentSearch: !1
            }), e().toggleSettingsButton(n, !!r), r ? (n.get().dialog_search_going = !0, function(e, t, n) {
                var r = wl(e, n, t().appendFastDialogs.bind(null, n));
                return Object(a.searchTopConv)(e, n.get()).then(e => {
                    return r(e), e
                })
            }(r, e, n).then(a => {
                var i = a.map(e => e.peerId);
                return t(r, e, i, n)
            }).then(e => {
                n.get().dialog_search_going = !1
            }).catch(() => {})) : (e().restoreDialogs(n, !1, !0), Object(fl.removeSearchPositionTracker)("messages"), Promise.resolve(!1))
        }

        function Sl(e, t, n, i) {
            var s = i.get(),
                o = wl(e, i, t().appendDialogs.bind(null, i)),
                l = wl(e, i, t().appendSearch);
            return Object(r.isPendingForward)(i) ? Object(a.searchHints)(e, n, "all", {}, s).then(o) : Promise.all([Object(a.searchHints)(e, n, "all", {}, s).then(o), Object(a.searchMessages)(e, s)]).then(e => {
                var t = bl(e, 2),
                    n = bl(t[1], 2),
                    a = n[0],
                    r = n[1];
                l(i, a, r, !0)
            })
        }

        function kl(e, t, n, a) {
            cancelStackFilter("im_search");
            var r = El(t);
            uiSearch.reset(r), e.setState({
                recentSearch: !1
            }), Cl(e, a, t, r, n, r.value)
        }

        function Tl(e, t) {
            return showTooltip(t, {
                appendEl: bodyNode,
                text: () => Object(i.isSearching)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion"),
                black: 1,
                shift: [3, -1],
                appendCls: "js-im-page"
            })
        }

        function Il(e, t, n) {
            var r = n.target;
            e.set(a.toggleCommunityMute.bind(null, t)).then(() => {
                toggleClass(r, "im-page--gim-mute_muted", e.get().mute), t && Ml(e, {
                    target: r
                })
            })
        }

        function Ml(e, t) {
            var n = t.target;
            return showTooltip(n, {
                text: () => e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
                black: 1,
                shift: [13, 9],
                appendCls: "js-im-page"
            })
        }

        function Al(e, t, n, a, r, i) {
            return {
                focusInput(t) {
                    uiSearch.focus(El(e).parentNode)
                },
                createCanceled(e, n) {
                    removeClass(t, "im-dialog-select_rotated")
                },
                rotateCross(e) {
                    addClass(t, "im-dialog-select_rotated")
                },
                setSearch(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    ! function(e, t, n, a, r) {
                        var i = El(t);
                        i.value = r, Cl(e, a, t, i, n, i.value)
                    }(t, e, a, r ? i : () => {}, n)
                },
                clearSearch(t) {
                    kl(t, e, a, () => {})
                },
                updateImportantCnt(t) {
                    var n = t.get().important_cnt,
                        a = geByClass1(yl, e);
                    toggleClass(a, "im-page--stars_hidden", 0 === n), a.innerHTML = "<i></i> " + n
                },
                unmount() {
                    a.stop(), Object(o.destroyModule)(r), uiSearch.destroy(n), cancelStackFilter("im_search")
                }
            }
        }

        function Ll(e, t, n) {
            var s = geByClass1("_im_search_croll", e),
                c = El(e),
                d = pl("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
                u = Object(dt.debouncedPromise)(Sl, 300),
                m = jl.bind(null, n, u),
                g = Cl.bind(null, t, m, e, c, d),
                p = function(e, t, n, a, r, s) {
                    Object(i.isSearching)(e) ? (kl(e, t, r, n), setTimeout(() => Tl(e, s), 10)) : (window.tooltips && tooltips.hide(s, {
                        showsp: 0
                    }), function(e, t, n) {
                        n().showCreation(e)
                    }(e, 0, a))
                }.bind(null, t, e, m, n, d, s),
                h = function(e, t, n, a, i) {
                    return Object(r.showFavvedBox)(e, n, _l, a)
                }.bind(null, t, e, n),
                _ = geByClass1("_im_dialogs_search_input", e);
            uiSearch.init(_, {
                onChange: g
            });
            var f = Tl.bind(null, t, s),
                b = geByClass1(Ol, e);
            c.value && g(c.value);
            var v = Object(o.createModule)({
                handlers: (o, u) => {
                    if (o(geByClass1("_im_av_time", e), "mouseover", e => {
                            showTooltip(e.target, {
                                text: getLang("mail_admin_av_time"),
                                dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                                shift: [0, 8]
                            })
                        }), o(s, "click", p), o(s, "mouseover", f), o(geByClass1(yl, e), "click", h), Object(r.isClassicInterface)(t)) {
                        var m = Il.bind(null, t, !0),
                            g = Ml.bind(null, t);
                        o(b, "click", m), o(b, "mouseover", g)
                    }
                    o(c, "focus", () => {
                        t.get().longpoll.push([Object(l.transitionEvent)("search")])
                    }), o(c, "click", () => {
                        Object(i.isSearching)(t) && n().toggleSettingsButton(t, !0),
                            function(e, t, n, s, o) {
                                if (!Object(i.isSearching)(e)) {
                                    var l = cur.imDb.select(Bs.RECENT_SEARCH_OP);
                                    if (0 !== l.length || Object(i.doPopularSuggExist)(e)) {
                                        e.setState({
                                            recentSearch: !0
                                        }), Cl(e, () => {
                                            Object(i.isSearching)(e) || (s.stop(), o().toggleSettingsButton(e, !1), o().restoreDialogs(e, !1, !0))
                                        }, t, n, s, "");
                                        var c = l.filter(t => !Object(r.isTabLoadedWithMessage)(e.get(), t)),
                                            d = l.filter(t => Object(r.isTabLoadedWithMessage)(e.get(), t)).reduce((t, n) => (t[n] = Object(i.getTab)(e, n), t), {});
                                        e.get().topConvTree.then(t => {
                                            var n = t.list.filter(e => inArray(e[0], c)).reduce((e, t) => (e[t[0]] = Object(a.localIndexToDialog)(t), e), {}),
                                                r = extend({}, n, d);
                                            return o().appendFastDialogs(e, l.map(e => r[e])), Object(a.searchHints)(!1, Object.keys(n), !1, {}, e.get())
                                        }).then(t => {
                                            o().appendDialogs(e, t)
                                        })
                                    }
                                }
                            }(t, e, c, d, n)
                    }), o(c, "blur", () => {
                        var e;
                        e = 0 === t.get().peer ? "search" : Object(r.isPendingForward)(t) ? "search" : "default", Object(i.isSearching)(t) || n().toggleSettingsButton(t, !1), t.get().longpoll.push([Object(l.transitionEvent)(e)])
                    })
                }
            });
            return Object(r.isClassicInterface)(t) && Il(t, !1, {
                target: b
            }), Al(e, s, _, d, v, m)
        }
        var Pl = n("W9Tc");

        function Dl(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var xl = "_im_spam_not_spam",
            Nl = "_im_spam_spam";

        function Rl(e, t) {
            var n = t.get().selectedMessages,
                a = geByClass1("_im_spam_box", e.bodyNode),
                i = geByClass1("ui_tab_sel", e.bodyNode);
            if (n.length > 0) {
                var s = getLang("mail_selected", n.length);
                s = s.replace("{count}", n.length), val(i, s + `<button aria-label="${getLang("mail_deselect_all")}" type="button" class="im-deselect ${r.DESELECT_ALL_CLASS}"></button>`)
            } else val(i, getLang("mail_spam"));
            0 === n.length ? removeClass(a, "im-important-box_with-sel") : (addClass(a, "im-important-box_with-sel"), val(geByClass1(xl), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(Nl), getLang("mail_im_mark_delspam", n.length)))
        }

        function Bl(e, t, n) {
            var r = e.get().selectedMessages;
            e.set(a.cleanSelected).then(n.cleanSelection.bind(null, r)).then(n => Rl(t, e))
        }

        function Fl(e, t) {
            return {
                unmount() {
                    t.unmount(), Object(o.destroyModule)(e)
                }
            }
        }

        function Hl(e, t, n) {
            var i = ge("box_layer_wrap"),
                s = Object(o.createMutations)(Fl),
                c = s.callMutations,
                d = s.bindMutations,
                u = _({
                    peer: 0,
                    oCache: {},
                    tabs: Object(r.tabFromIds)(n.msgs, n.hash),
                    gid: t.get().gid
                }),
                m = function(e, t, n, i) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var s = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(r.wrapLoading)(s)(Object(a.loadSpam)(e.offset, i.get().gid).then(t => {
                            var n = Dl(t, 4),
                                o = (n[0], n[1]),
                                l = (n[2], n[3]);
                            e.all = l.all, e.offset = l.offset, e.all ? addClass(s, "im-important_all") : e.loading = !1, i.set(a.mergeTabs.bind(null, Object(r.tabFromIds)(l.msgs, l.hash)));
                            var c = ce("div");
                            c.innerHTML = o, s.appendChild(c), Object(r.ensureDomHasActions)(s)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: n.all,
                    loading: !1,
                    offset: n.offset
                }, e, i, u),
                g = function(e, t, n, i) {
                    var s = gpeByClass("_im_mess", i, t);
                    if (s) {
                        var o = intval(domData(s, "msgid"));
                        s && (Object(a.removeMessageSend)([o], 0, e.get().tabs[0].hash, "undel", e.get()), Object(r.restoreMessage)(o, 0, t))
                    }
                }.bind(null, u, e.bodyNode),
                p = function(e, t, n, a, r) {
                    var i = gpeByClass("_im_mess", r, t.bodyNode),
                        s = intval(domData(i, "peer")),
                        o = intval(domData(i, "msgid"));
                    return t.hide(), n().unmount(), e.get().longpoll.push([Object(l.changePeer)(s, o)]), stopEvent(a), cancelEvent(a), !1
                }.bind(null, t, e, c),
                h = function(e, t, n, r) {
                    var i = showFastBox({
                        title: getLang("mail_deleteall1"),
                        dark: 1,
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, getLang("mail_delete_all_spam"), getLang("mail_delete"), () => {
                        Object(a.flushSpam)(e, r).then(e => {
                            var t = Dl(e, 2),
                                n = (t[0], t[1]);
                            showDoneBox(n)
                        }), i.hide(), t.hide(), n().unmount()
                    }, getLang("mail_close"), () => i.hide())
                }.bind(null, n.hash, e, c, t.get().gid),
                f = Os(e.bodyNode, u, t => ({
                    changedMessageSelection: Rl.bind(null, e)
                })),
                b = function(e, t, n) {
                    var i = e.get().selectedMessages;
                    Object(a.removeMessageSend)(i, 0, e.get().tabs[0].hash, "delete", e.get()), Object(r.removeMessagesWithRestore)(i, 0, "delete", t), Bl(e, t, n)
                }.bind(null, u, e.bodyNode, f),
                v = function(e, t, n) {
                    var i = e.get().selectedMessages;
                    Object(a.removeMessageSend)(i, 0, e.get().tabs[0].hash, "nospam", e.get()), i.map(e => geByClass1("_im_mess_" + e)).filter(e => e).forEach(e => {
                        var t = intval(domData(e, "peer")),
                            n = intval(domData(e, "msgid"));
                        val(e, Object(r.renderGoTo)(t, n)), addClass(e, "im-mess_light")
                    }), Bl(e, t, n)
                }.bind(null, u, e.bodyNode, f),
                y = Bl.bind(null, u, e, f);
            return Object(r.ensureDomHasActions)(e.bodyNode), d(Object(o.createModule)({
                handlers: (t, n) => {
                    t(i, "scroll", m), t(geByClass1(Nl, e.bodyNode), "click", b), t(geByClass1(xl, e.bodyNode), "click", v), t(geByClass1("_im_spam_flush", e.bodyNode), "click", h), n(e.bodyNode, "click", "_im_mess_restore", g), n(e.bodyNode, "click", "_im_go_to", p), n(e.bodyNode, "click", r.DESELECT_ALL_CLASS, y)
                }
            }), f)
        }
        var Ul = "_im_dialogs_cog_settings",
            Gl = "_im_settings_action",
            ql = "_im_to_unread";

        function $l() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings",
                t = {
                    sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
                };
            return window.pushNotifier && window.pushNotifier.loadEndpoint() || Object(Pl.partConfigEnabled)("push_notifier") && ls.get("im_ui_notify_off") ? t.browser = getLang("mail_notification_settings") : t.browser = zl() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off"), getTemplate(e, t)
        }

        function zl() {
            return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
        }

        function Kl(e, t, n) {
            var s = function(e, t) {
                    showTooltip(t.target, {
                        content: $l("im_settings_pop"),
                        dir: "down",
                        shift: [220, 9],
                        hasover: !0,
                        showdt: 300
                    })
                }.bind(null, t),
                l = function(e, t, n, a, i) {
                    var s = domData(i, "action"),
                        o = gpeByClass("_im_settings_menu", i),
                        l = hasClass(o, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
                    switch (s) {
                        case "spam":
                            Object(r.showSpamLayer)(e, Hl, a);
                            break;
                        case "sound":
                            ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), o.outerHTML = $l(l);
                            break;
                        case "browser":
                            zl() ? (ls.set("im_ui_notify_off", 1), o.outerHTML = $l(l), Object(Oe.statlogsBrowserNotificationsOff)()) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(() => {
                                o.parentNode && (o.outerHTML = $l(l))
                            }) : Object(Pl.partConfigEnabled)("push_notifier") ? nav.go("/settings?act=notify") : (ls.set("im_ui_notify_off", 0), o.outerHTML = $l(l), Object(Oe.statlogsBrowserNotificationsOn)())
                    }
                }.bind(null, t, n, e),
                c = function(e, i) {
                    if (Object(r.showUnreadOnly)(t, n, a.changeDialogsTab)) {
                        var s = t.get().active_tab === m.FOLDER_UNREAD;
                        val(i, getTemplate("im_filter", {
                            filter: s ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                        }))
                    }
                },
                d = Object(o.createModule)({
                    handlers: (t, n) => {
                        n(e, "mouseover", Ul, s), n(e, "click", Gl, l), n(e, "click", ql, c)
                    }
                });
            return function(e, t) {
                return {
                    updateFilter(t) {
                        var n, a = t.get().active_tab === m.FOLDER_UNREAD,
                            r = [];
                        Object(i.isSearching)(t) && r.push("im-page--dialogs-filter_hidden"), t.get().unread_cnt > 0 ? n = a ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread") : (n = getLang("mail_all_dialogs"), r.push("im-page--dialogs-filter_disabled")), val(geByClass1(ql, e), getTemplate("im_filter", {
                            filter: n,
                            cls: r.join(" ")
                        }))
                    },
                    toggleButton(t, n) {
                        var a = geByClass1("im-page--dialogs-filter", e);
                        toggleClass(a, "im-page--dialogs-filter_hidden", n)
                    },
                    toggleLoader(t, n) {
                        var a = geByClass1(Ul, e);
                        toggleClass(a, "im-page--dialogs-settings_loading", n)
                    },
                    updateSettings(t) {
                        geByClass1("_im_settings_menu", e).outerHTML = $l()
                    },
                    unmount() {
                        Object(o.destroyModule)(t)
                    }
                }
            }(e, d)
        }
        var Vl = "_ui_multiselect_cancel";

        function Wl(e) {
            return e.selection = [], Promise.resolve(e)
        }

        function Yl(e, t) {
            return t.selection = t.selection.filter(t => t.id !== e), Promise.resolve(t)
        }

        function Ql(e, t, n, r) {
            e.set(a.setCurrentSearch.bind(null, n, !1)).then(t().onChange)
        }

        function Xl(e, t, n, a) {
            var r = n.get().selection,
                i = uiSearch.getFieldEl(e);
            uiSearch.focus(e), r.length > 0 ? attr(i, "placeholder", "") : attr(i, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = r.map(e => `<div class="token">\n      <div class="token_title">${e.name}</div>\n      <div data-peer="${e.id}" class="token_del ${Vl}"></div>\n    </div>`).join(""), toggleClass(e, "ui_multiselect_has_selection", r.length > 0), domFC(e).scrollTop += 50, a()
        }

        function Jl(e, t) {
            return showTooltip(t, {
                text: getLang("mail_create_chat_remove_user"),
                black: 1,
                shift: [15, 8],
                appendParentCls: "_wrap"
            })
        }

        function Zl(e, t, n) {
            uiSearch.init(e, {
                onChange: Ql.bind(null, t, n)
            });
            var a = uiSearch.getFieldEl(e),
                r = ce("div", {
                    className: "_ui_multiselection ui_multiselect_cnt"
                });
            a && a.parentNode.insertBefore(r, a);
            var i, s, l = (i = a, s = 0, function() {
                var e = i.offsetWidth;
                setStyle(i, {
                    width: 1
                });
                var t = i.offsetLeft;
                s !== t ? (s = t, e = i.parentNode.offsetWidth, setStyle(i, {
                    width: Math.max(30, e - t - 20)
                })) : setStyle(i, {
                    width: e
                })
            });
            t.set(Wl);
            var c = function(e, t, n, a, r, i, s) {
                    var o = intval(domData(s, "peer"));
                    tooltips.hide(s), t.set(Yl.bind(null, o)).then(i => {
                        Xl(e, a, t, r), n().selectionDeleted(t, o)
                    })
                }.bind(null, e, t, n, r, l),
                d = t => {
                    document.activeElement !== a && uiSearch.focus(e)
                },
                u = Object(o.createModule)({
                    handlers: (t, n) => {
                        n(e, "click", Vl, c), n(e, "mouseover", Vl, Jl), t(e, "click", d)
                    }
                });
            return {
                addSelection: (n, a) => t.set(function(e, t) {
                    return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
                }.bind(null, {
                    id: n,
                    name: a
                })).then(Xl.bind(null, e, r, t, l)),
                removeSelection: n => t.set(Yl.bind(null, n)).then(Xl.bind(null, e, r, t, l)),
                resetSelection() {
                    ! function(e, t, n, a) {
                        e.set(Wl).then(Xl.bind(null, t, n, e, a))
                    }(t, e, r, l)
                },
                focus() {
                    uiSearch.focus(e)
                },
                save() {
                    t.stash(), Xl(e, r, t, l)
                },
                restore() {
                    t.pop(), Xl(e, r, t, l)
                },
                unmount() {
                    uiSearch.destroy(e), Object(o.destroyModule)(u)
                }
            }
        }
        var ec = "_im_create_cancel",
            tc = "_im_create_list",
            nc = "_im_dialog",
            ac = "_im_create_tab",
            rc = "_im_dialogs_creation_name",
            ic = "_im_create_select",
            sc = "_im_create_avatar",
            oc = "_im_create_remove_avatar",
            lc = "_im_confirm_creation",
            cc = "_im_cancel_creation",
            dc = "_im_avatar_img",
            uc = ["im-creation--item_hovered"],
            mc = "olist_item_wrap_on",
            gc = "ui_search_reset",
            pc = 100;

        function hc(e, t, n, r, i, s) {
            Object(a.toggleConversation)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(fc.bind(null, t, !1), 100), Ec(s).map(e => geByClass1("_im_dialog" + e)).forEach(e => {
                removeClass(e, mc)
            }), n().createCanceled(e, r), i.resetSelection(), "add_member" === e.get().creationType && e.set(a.setCreationType.bind(null, "chat", [])), e.set(a.presetAvatar.bind(null, !1));
            var o = geByClass1(dc, t);
            bc(e, s, t), uiSearch.reset(geByClass1(rc, t)), uiSearch.reset(geByClass1(ic, t)), o && o.parentNode.removeChild(o), bc(e, s, t), cancelStackFilter("im_search");
            var c = 0 === e.get().peer ? "search" : "default";
            e.get().longpoll.push([Object(l.transitionEvent)(c)]), attr(t, "aria-hidden", "true")
        }

        function _c(e, t, n) {
            return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(e => {
                e.then(e => {
                    e = e.filter(e => !n.current_create_peer_ids[e.peerId]), n.current_create_peer_ids = e.reduce((e, t) => (e[t.peerId] = !0, e), n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
                })
            }), Promise.resolve(n)
        }

        function fc(e, t) {
            toggleClass(e, "im-create_material", t)
        }

        function bc(e, t, n) {
            var a = geByClass1(lc, n),
                r = t.get().selection.length,
                i = "add_member" === e.get().creationType,
                s = r > 0,
                o = uiSearch.getFieldEl(geByClass1(rc, n)).value.length > 0,
                l = !s && (i || !o),
                c = i ? 1 === r ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with") : o || r > 1 ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog");
            val(a, c), toggleClass(a, "button_disabled", l)
        }

        function vc(e, t, n, a, r, i, s) {
            if (s) {
                var o, l = intval(domData(s, "list-id")),
                    c = Ec(i),
                    d = trim(s.textContent),
                    u = geByClass1(ic, t),
                    m = getSize(u)[1];
                inArray(l, c) ? (o = a.removeSelection(l, d), removeClass(s, mc)) : (o = a.addSelection(l, d), addClass(s, mc)), o.then(() => {
                    var e = m - getSize(u)[1],
                        t = r.scrollTop();
                    r.scrollTop(t - e)
                }), bc(e, i, t);
                var g = geByClass1(ic, t);
                uiSearch.reset(g)
            }
        }

        function yc(e, t) {
            var n = Ec(e),
                a = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
                r = [];
            return t.online && r.push("online"), mobPlatforms[t.online] && r.push("mobile"), inArray(t.peerId, n) && a.push(mc), getTemplate("im_owner_item", {
                owner_id: t.peerId,
                cls: " " + a.join(" "),
                photo: t.photo,
                name: t.name,
                link: t.href,
                img_cls: r.join(" ")
            })
        }

        function Oc(e) {
            return Object(i.getSearchText)(e) || !1
        }

        function Ec(e) {
            return e.get().selection.map(e => e.id)
        }

        function Cc(e, t, n, a) {
            toggleClass(e, "im-create_chat", "chat" === a.get().creationType), toggleClass(e, "im-create_invite", "add_member" === a.get().creationType);
            var i = "chat" === a.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
                s = geByClass1("_im_create_title", e);
            val(s, i), val(geByClass1(lc, e), "add_member" === a.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat")), jc(e, a, t, !1, n.get().selection.map(e => e.id)), Object(r.fixTableCellChildHeight)("_im_create_wrap_safe", e)
        }

        function wc(e, t, n) {
            return e.then(e => e.filter(e => e.is_friend && !inArray(e.peerId, n.get().creationFilter)))
        }

        function jc(e, t, n, r, i) {
            var s, o, l = geByClass1(ic, e),
                c = Object(a.searchLocalHints)(r, t.get()),
                d = n.hoverFirstElement.bind(n, uc, Ic(t));
            t.get().creation_shown_all = !1, n.reset(), n.pipe(wc(c, 0, t), r), n.toTop(), r ? (o = Object(a.searchTopConv)(r, t.get()), s = Object(a.searchHintsIndex)(r, [], "friends", t.get()), n.pipe(wc(s, 0, t), r).then(d), n.pipe(wc(o, 0, t), r).then(d)) : (s = Promise.resolve([]), o = Promise.resolve([])), t.set(_c.bind(null, [c, o, s], !0)), uiSearch.showProgress(l), Promise.all([c, s, o]).then(() => uiSearch.hideProgress(l))
        }

        function Sc(e, t, n, a) {
            var r = a.get(),
                i = Oc(r);
            r.selection.map(e => e.id);
            n.unhoverElements(uc), e.get().creationQuery = i, jc(t, e, n, i)
        }

        function kc(e, t, n, a, r, i) {
            Ec(t).map(e => geByClass1("_im_dialog" + e)).forEach(e => removeClass(e, mc)), t.reset(), jc(n, e, a, !1, Ec(t)), r.resetSelection(), hc(e, n, i, !1, r, t)
        }

        function Tc(e, t, n, r, s, o, c) {
            var d = Ec(t),
                u = e.get(),
                m = geByClass1(lc, n),
                g = uiSearch.getFieldEl(geByClass1(rc, n)).value,
                p = "add_member" === e.get().creationType,
                h = !p && (g.length || d.length > 1);
            if (p) return e.set(a.addNewMember.bind(null, u.peer, d)).catch(e => showFastBox(getLang("global_error"), e)), hc(e, n, o, "", s, t);
            if (lockButton(m), !h) return _(d[0]);

            function _(a) {
                kc(e, t, n, r, s, o),
                    function(e, t, n, a, r, i) {
                        hc(e, t, n, !1, r, i), e.get().longpoll.push([Object(l.changePeer)(a, !1, !1, !1, "create_conversation")])
                    }(e, n, o, a, s, t), unlockButton(m), Object(i.isSearching)(e) ? o().cancelSearch(e) : o().restoreDialogs(e)
            }
            e.set(a.createChat.bind(null, u.next_chat_avatar, d, g)).then(() => _(u.next_peer)).catch(e => {
                unlockButton(m), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
            })
        }

        function Ic(e, t) {
            var n = t && t.get().selection.length;
            return {
                top: -1,
                bottom: Object(r.isClassicInterface)(e) ? n > 0 ? 69 : 0 : -1
            }
        }

        function Mc(e, t, n) {
            var i = _({
                    selection: []
                }),
                s = L(geByClass1(tc, e), _({
                    offset: 0,
                    limit: pc,
                    elements: [],
                    elCls: nc
                }), () => ({
                    idFn: e => intval(e.peerId),
                    hoverableFn: e => hasClass(e, "_im_dialog"),
                    renderFn: yc.bind(null, i),
                    more(e, n) {
                        var r;
                        return t.get().shown ? (t.get().creation_shown_all || !1 !== Oc(i) ? r = Promise.resolve([]) : (t.get().creation_shown_all = !0, r = Object(a.searchTopConv)(Oc(i), t.get())), t.set(_c.bind(null, [r], !1)), wc(r, Oc(i), t)) : Promise.resolve(!1)
                    },
                    onClick(n, a) {
                        checkEvent(n) || (vc(t, e, 0, c, s, i, a), cancelEvent(n))
                    }
                }));
            t.get().creationQuery = !1, t.get().creationType = "chat";
            var c = Zl(geByClass1(ic, e), i, () => ({
                    selectionDeleted(n, a) {
                        bc(t, n, e), removeClass(geByClass1("_im_dialog" + a), mc)
                    },
                    onChange: Sc.bind(null, t, e, s)
                })),
                d = hc.bind(null, t, e, n, "cross", c, i),
                u = function(e, t, n, r, i, s, o, l) {
                    uiTabs.switchTab(l.firstElementChild);
                    var c = domData(l, "type");
                    switch (c) {
                        case "chat":
                            s.restore()
                    }
                    e.set(a.setCreationType.bind(null, c, [])).then(Cc.bind(null, t, r, i))
                }.bind(null, t, e, n, s, i, c),
                m = function(e, t, n, r) {
                    var i = 2e9 + Math.round(rand(1e6, 2e6));
                    cur.recieveCropResult = n => {
                        cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(a.presetAvatar.bind(null, n)), Object(a.getOwnerPhoto)(n, i).then(e => {
                            geByClass1(sc, t).appendChild(ce("img", {
                                className: `im-chat-placeholder--img ${dc}`,
                                src: e
                            }))
                        }), addClass(t, "im-create_photo-attached")
                    }, Page.ownerPhoto(i)
                }.bind(null, t, e),
                g = function(e, t) {
                    geByClass1(sc, t).innerHTML = "", e.set(a.presetAvatar.bind(null, !1)), removeClass(t, "im-create_photo-attached")
                }.bind(null, t, e),
                p = kc.bind(null, t, i, e, s, c, n),
                h = Tc.bind(null, t, i, e, s, c, n),
                f = function(e, t, n) {
                    bc(e, t, n)
                }.bind(null, t, i, e),
                b = geByClass1(ec, e),
                v = geByClass1(rc, e),
                y = v.querySelector("." + gc),
                O = Object(o.createModule)({
                    handlers: (t, n) => {
                        t(b, "click", d), t(b, "mouseover", function(e, t) {
                            return showTooltip(e, {
                                text: getLang("mail_cancel"),
                                black: 1,
                                zIndex: 1e3,
                                shift: [3, -2],
                                appendCls: "js-im-page"
                            })
                        }.bind(null, b)), t(geByClass1(sc, e), "click", m), t(geByClass1(oc, e), "click", g), t(geByClass1(cc, e), "click", p), t(v, "change", f), t(v, "input", f), t(v, "paste", f), t(y, "click", f), t(geByClass1(lc, e), "click", h), t(e, "mouseover", throttle(s.unhoverElements.bind(s, uc), 100)), n(e, "click", ac, u)
                    }
                });
            return function(e, t, n, a, i, s, c, d) {
                return {
                    show(t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                        t.setState({
                            shown: !0
                        }), fc(e, !0), cancelStackPush("im_create", c), addClass(e, "im-create_shown");
                        var s = a.get().selection.reduce((e, t) => (e[t.id] = !0, e), {});
                        r && r.forEach(t => {
                            if (!s[t[0]]) {
                                var n = e.querySelector(`._im_dialog${t[0]}`);
                                i.addSelection(t[0], t[1]), n && !n.classList.contains(mc) && n.classList.add(mc)
                            }
                        }), Cc(e, n, a, t), setTimeout(() => {
                            t.get().longpoll.push([Object(l.transitionEvent)("create")]), attr(e, "aria-hidden", "false"), i.focus()
                        }, 1)
                    },
                    focusSearch(e) {
                        i.focus()
                    },
                    confirmCreate(e) {
                        d()
                    },
                    hide(n) {
                        n.get().shown = !1, hc(n, e, t, !1, i, a)
                    },
                    scroll(e) {
                        n.scrollPage(e, !0)
                    },
                    updateScroll() {
                        Object(r.fixTableCellChildHeight)("_im_create_wrap_safe", e), n.updateScroll()
                    },
                    selectElement(t) {
                        vc(t, e, 0, i, n, a, n.getHoveredElement())
                    },
                    hoverPrevElement(e) {
                        n.hoverPrevElement(uc, null, Ic(e, a))
                    },
                    hoverNextElement(e) {
                        n.hoverNextElement(uc, null, Ic(e, a))
                    },
                    unmount() {
                        Object(o.destroyModule)(s), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
                    }
                }
            }(e, n, s, i, c, O, d, h)
        }

        function Ac(e, t, n, a, i) {
            switch (t) {
                case m.ARROW_UP:
                    Object(r.isEditableFocused)() || (a.scroll(i, "up"), cancelEvent(n));
                    break;
                case m.ARROW_DOWN:
                    Object(r.isEditableFocused)() || (a.scroll(i, "down"), cancelEvent(n));
                    break;
                case m.PAGE_UP:
                    n.ctrlKey || Object(r.isClassicInterface)(i) || (a.scroll(i, "up", !0), cancelEvent(n));
                    break;
                case m.PAGE_DOWN:
                    n.ctrlKey || Object(r.isClassicInterface)(i) || (a.scroll(i, "down", !0), cancelEvent(n));
                    break;
                case m.HOME:
                    Object(r.isEditableFocused)() || (a.scroll(i, "up", !1, !0), cancelEvent(n));
                    break;
                case m.END_KEY:
                    Object(r.isEditableFocused)() || (a.scroll(i, "down", !1, !0), cancelEvent(n));
                    break;
                case m.PRINTABLE:
                    a.focustTxt(e)
            }
        }

        function Lc(e, t, n, a, i, s) {
            var o = _({
                state: t || "default"
            });
            return {
                signal(t, l) {
                    if (!(cur.storyLayer || cur.articleEditorLayer || window.isArticleLayerOpen())) switch (o.get().state) {
                        case "default":
                            return Ac(o, t, l, a, e);
                        case "fwd":
                        case "search":
                            return function(e, t, n, a, i, s) {
                                switch (t) {
                                    case m.ARROW_DOWN:
                                        a.hoverNextDialog(s), cancelEvent(n);
                                        break;
                                    case m.ARROW_UP:
                                        a.hoverPrevDialog(s), cancelEvent(n);
                                        break;
                                    case m.ENTER:
                                        Object(r.isEditableFocused)() && !gpeByClass("_im_dialogs_search_input", document.activeElement) || a.selectHoveredDialog(s);
                                        break;
                                    case m.PRINTABLE:
                                        i.focusInput(s)
                                }
                            }(0, t, l, n, i, e);
                        case "create":
                            return function(e, t, n, a, i) {
                                switch (t) {
                                    case m.PAGE_UP:
                                        !n.ctrlKey && Object(r.isClassicInterface)(i) && (a.scroll("up"), cancelEvent(n));
                                        break;
                                    case m.PAGE_DOWN:
                                        !n.ctrlKey && Object(r.isClassicInterface)(i) && (a.scroll("down"), cancelEvent(n));
                                        break;
                                    case m.ARROW_DOWN:
                                        a.hoverNextElement(i);
                                        break;
                                    case m.ARROW_UP:
                                        a.hoverPrevElement(i);
                                        break;
                                    case m.ENTER:
                                        gpeByClass("_im_dialogs_creation_name", document.activeElement) ? a.confirmCreate(i) : gpeByClass("im-create--search", document.activeElement) && a.selectElement(i);
                                        break;
                                    case m.PRINTABLE:
                                        a.focusSearch(i)
                                }
                            }(0, t, l, s, e);
                        case "message":
                            return function(e, t, n, a, r) {
                                switch (t) {
                                    case m.HOME:
                                    case m.END_KEY:
                                        a.isEmpty(r) && Ac(e, t, n, a, r);
                                        break;
                                    case m.PAGE_UP:
                                    case m.PAGE_DOWN:
                                        Ac(e, t, n, a, r)
                                }
                            }(o, t, l, a, e);
                        default:
                            throw new Error("Unknown state: " + o.get().state)
                    }
                },
                transition: e => o.set(function(e, t) {
                    return t.state = e, Promise.resolve(t)
                }.bind(null, e))
            }
        }
        var Pc = n("BxOC"),
            Dc = n("iN1s"),
            xc = n("EUzL");

        function Nc(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Rc = 202,
            Bc = 4,
            Fc = 5,
            Hc = 3e4,
            Uc = {},
            Gc = Date.now();

        function qc(e, t) {
            var n = Math.floor(t.status / 100);
            t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), Uc[n] = Uc[n] ? Uc[n] + 1 : 1, Date.now() - Gc >= Hc && (Object.keys(Uc).forEach(e => {
                statlogsValueEvent("im_longpoll", Uc[e], e + "0x", t.getResponseHeader("x-frontend"))
            }), Uc = {}, Gc = Date.now()))
        }

        function $c(e) {
            return e.updates.map(e => {
                switch (e[0]) {
                    case 0:
                        return l.deleteEvent(e);
                    case 1:
                        return l.replaceFlagsEvent(e);
                    case 2:
                        return l.setFlagsEvent(e);
                    case 3:
                        return l.resetFlagsEvent(e);
                    case 4:
                        return l.addMessageEvent(e);
                    case 5:
                        return l.editMessageEvent(e);
                    case 6:
                        return l.readInboundEvent(e);
                    case 7:
                        return l.readOutboundEvent(e);
                    case 8:
                        return l.gotOnlineEvent(e);
                    case 9:
                        return l.gotOfflineEvent(e);
                    case 10:
                        return l.resetDirectoriesEvent(e);
                    case 11:
                        return l.replaceDirectoriesEvent(e);
                    case 12:
                        return l.setDirectoriesEvent(e);
                    case 13:
                        return l.deleteDialogEvent(e);
                    case 18:
                        return l.replaceMessageEvent(e);
                    case 51:
                        return l.chatChangedEvent(e);
                    case 52:
                        return l.chatUpdatedEvent(e);
                    case 63:
                        return l.typingEvent(e);
                    case 64:
                        return l.recordingAudioEvent(e);
                    case 70:
                        return l.videoCallEvent(e);
                    case 80:
                        return l.unreadCountEvent(e);
                    case 114:
                        return l.notifySettingsChangedEvent(e);
                    case 116:
                        return l.refreshMessageEvent(e);
                    case -1:
                        return l.resyncEvent();
                    default:
                        return l.emptyEvent(e)
                }
            })
        }

        function zc(e, t) {
            return Promise.resolve(extend({}, t, {
                timeout: e < 64 ? 2 * e : e
            }))
        }

        function Kc(e) {
            e.set(e => Promise.resolve(extend({}, e, {
                stopped: !0
            }))).then(() => {
                e.get().cancelToken()
            })
        }

        function Vc(e, t) {
            return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
        }

        function Wc(e) {
            return e.pauses || (e.pauses = []), Object(f.lplog)("Aborting all pauses", "error"), e.pauses.forEach(e => e()), e.pauses = [], Promise.resolve(e)
        }

        function Yc(e, t, n, r) {
            var i = r.failed ? Object(dt.abortablePause)(Bc, e) : {},
                s = i.abort,
                o = i.pause;
            switch (r.failed) {
                case 1:
                    return Object(f.lplog)("Old timestamp, init resync", "error"), e.set(Vc.bind(null, s)), n([l.resyncEvent()]), e.set(a.loadLongPollTs).then(o).then(Qc.bind(null, e, t, n));
                case 2:
                    return Object(f.lplog)("Key is incorrect", "error"), e.set(Vc.bind(null, s)), e.set(a.loadLongPollKey).then(o).then(Qc.bind(null, e, t, n));
                case 3:
                    throw Object(g.imWeirdLog)("im_longpoll_force_reload", r, !1), nav.reload({
                        force: !0
                    }), new Error("ts is very wrong");
                default:
                    return e.set(function(e, t) {
                        return Promise.resolve(extend({}, t, {
                            imTs: e
                        }))
                    }.bind(null, r.ts)).then(() => r)
            }
        }

        function Qc(e, t, n) {
            if (e.get().stopped) return Promise.resolve({
                updates: []
            });
            if (t()) return Promise.reject(new Error("pause"));
            var a = e.get(),
                r = `${a.imUrl}/${a.imPart}`,
                i = Object(Pc.plaingetCancelable)(r, {
                    act: "a_check",
                    key: a.imKey,
                    version: Fc,
                    ts: a.imTs,
                    wait: 25,
                    mode: a.mode
                }),
                s = i.request,
                o = i.cancel;
            return e.set(function(e, t) {
                return t.cancelToken = e, Promise.resolve(t)
            }.bind(null, o)).then(() => s).then(t => {
                var n = Nc(t, 2),
                    r = n[0],
                    i = n[1];
                return i && qc(a, i), e.set(zc.bind(null, 1)), JSON.parse(r)
            }).catch(e => {
                var t = Nc(e, 2),
                    n = (t[0], t[1]);
                throw n && qc(a, n), ""
            }).then(Yc.bind(null, e, t, n))
        }

        function Xc(e) {
            var t = e.id,
                n = e.gid,
                a = e.key,
                r = e.ts,
                i = e.url,
                s = e.lhost,
                o = e.lpstat,
                l = new EventEmitter,
                c = window.vk.lpConfig && window.vk.lpConfig.enabled && window.longpollTesting_onImEvents,
                d = Ar(function(e, t) {
                    return c && window.longpollTesting_onImEvents(t), l.trigger("data", t), Promise.resolve({})
                }),
                u = d.pause,
                m = d.resume,
                g = d.pushMessage,
                p = d.isPaused,
                h = d.reset,
                b = _({
                    id: t,
                    gid: n,
                    mode: Rc,
                    timeout: 1,
                    imKey: a,
                    imTs: r,
                    imPart: i,
                    imUrl: s,
                    pause: !1,
                    stat: o
                });
            return function e(t, n, a) {
                t.get().stopped || (Object(f.lplog)("New request"), Qc(t, a, n).then($c).then(e => (Object(f.lplog)("Request success", "success"), e)).then(n).catch(e => {
                    if (!t.get().stopped) return Object(f.lplog)("Error, waiting: " + (e.message || "no message (probably browser reset)"), "error"), t.set(zc.bind(null, a() ? Bc / 2 : t.get().timeout)).then(() => {
                        var e = Object(dt.abortablePause)(t.get().timeout, t),
                            n = e.abort,
                            a = e.pause;
                        return t.set(Vc.bind(null, n)).then(a)
                    });
                    Object(f.lplog)("Stopped longpoll")
                }).then(e.bind(null, t, n, a)))
            }(b, g.bind(null, "main"), p.bind(null, "main")), {
                onData: e => l.on("data", e),
                offData: e => l.off("data", e),
                abortWaiting: () => b.set(Wc),
                stop: Kc.bind(null, b),
                pause: u.bind(null, "main"),
                resume: m.bind(null, "main"),
                reset: h.bind(null, "main"),
                push: e => l.trigger("data", e),
                isEnabled: () => !b.get().pause && !b.get().stopped
            }
        }
        var Jc = n("1+Fu");

        function Zc(e) {
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

        function ed(e, t) {
            if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
            var n = `${Object(r.getBaseLink)(e)}?sel=${t.peer}&tab=${e.get().active_tab}`,
                a = Object(r.getBareTab)(t.peer, e),
                i = a.tab;
            return i = getTemplate("im_right_menu_ct", {
                name: i,
                count: a.unread > 0 ? a.unread : ""
            }), getTemplate("im_right_menu_tpl", {
                href: n,
                label: i,
                peer: t.peer,
                attrs: `title="${stripHTML(a.tab)}"`,
                cls: a.unread > 0 ? "im-right-menu--unread" : ""
            })
        }

        function td(e, t) {
            return e.pipeReplace(Promise.resolve(Zc(t)))
        }

        function nd(e, t, n, a) {
            return {
                updateMenu(t) {
                    ! function(e, t) {
                        geByClass("_im_peer_tab", e).forEach(e => {
                            var n = Object(Vs.fromQueryString)(attr(e, "href").split("?")[1]);
                            n.tab !== t.get().active_tab && attr(e, "href", `${Object(r.getBaseLink)(t)}?sel=${n.sel}&tab=${t.get().active_tab}`)
                        })
                    }(e, t);
                    var a = gpeByClass("_im_right_menu", e);
                    td(n, t).then(() => {
                        var e;
                        (e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab)) && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(a)
                    })
                },
                updateName(e, t) {
                    var n = ge("ui_rmenu_peer_" + e);
                    if (n) {
                        var a = geByClass1("_im_r_tx", n),
                            r = t.get().tabs[e].tab;
                        val(a, r)
                    }
                },
                updateCounter(e, t) {
                    var n = ge("ui_rmenu_peer_" + t);
                    if (n) {
                        var a = geByClass1("_im_r_ct", n),
                            r = e.get().tabs[t].unread;
                        val(a, r > 0 ? r : ""), toggleClass(n, "im-right-menu--unread", r > 0)
                    }
                },
                unmount() {
                    Object(o.destroyModule)(a), n.unmount()
                }
            }
        }

        function ad(e, t, n) {
            var r = L(e, _({
                    limit: 50,
                    offset: 0,
                    noScroll: !0,
                    elements: Zc(t)
                }), () => ({
                    idFn: e => e.peer || "000",
                    renderFn: ed.bind(null, t)
                })),
                i = function(e, t, n, r) {
                    var i = gpeByClass("_im_peer_tab", r),
                        s = intval(domData(i, "list-id")),
                        o = e.get().tabbedPeers.filter(e => {
                            return e.peer !== s
                        });
                    return e.set(a.updateTabbedPeers.bind(null, o, !0)).then(() => {
                        if (td(t, e), s === e.get().peer) e.get().longpoll.push([Object(l.resetPeer)()]);
                        else if (0 !== e.get().peer) {
                            var n = gpeByClass("_im_right_menu", r);
                            uiRightMenu.hideSliding(n)
                        }
                    }), cancelEvent(n), !1
                }.bind(null, t, r),
                s = Object(o.createModule)({
                    handlers: (n, a) => {
                        a(e, "click", "_im_r_cl", i), a(e, "click", "_im_peer_tab", (e, n) => {
                            if (!checkEvent(e)) {
                                var a = intval(domData(n, "list-id"));
                                t.get().longpoll.push([Object(l.changePeer)(a, !1, !0, !0)]), cancelEvent(e)
                            }
                        }), m.FOLDERS.forEach(a => {
                            n(geByClass1(`_ui_item_${a}`, e.parentNode), "mousedown", function(e, t, n) {
                                1 === n.which && (e.get().peer && e.get().longpoll.push([Object(l.resetPeer)()]), e.get().longpoll.push([Object(l.changeTab)(t)]), cancelEvent(n))
                            }.bind(null, t, a))
                        })
                    }
                });
            return nd(e, 0, r, s)
        }
        var rd = 5e3,
            id = 54e6,
            sd = 72e5;

        function od(e) {
            var t = setInterval(function(e) {
                var t = e.get().tabs,
                    n = e.get().peer,
                    i = Object.keys(t).filter(t => Object(r.isFullyLoadedTab)(e, t) && intval(t) !== n).map(e => t[e]);
                i.filter(e => Date.now() - e.last_visited > id).forEach(t => e.set(a.cleanTab.bind(null, t.peerId))), i.filter(t => Object(r.isFullyLoadedTab)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > sd).forEach(t => e.set(a.stringifyTab.bind(null, t.peerId)))
            }.bind(null, e), rd);
            return {
                unmount() {
                    clearInterval(t)
                }
            }
        }

        function ld(e) {
            return e.which || e.keyCode
        }

        function cd(e, t, n, a) {
            var i = ld(a);
            if (!layers.visible) {
                if (i >= 49 && i <= 57 && (a.ctrlKey || a.metaKey && browser.mac) && Object(r.isClassicInterface)(t)) return function(e, t) {
                    var n = e.get().tabbedPeers[t];
                    n && e.get().longpoll.push([Object(l.changePeer)(n.peer, !1, !0, !0)])
                }(t, i - 49), cancelEvent(a);
                inArray(i, m.UP_DOWN_CONTROLS) && e.signal(i, a)
            }
        }

        function dd(e, t) {
            var n = browser.mozilla ? "keydown" : "keypress",
                i = _({
                    signalTimer: !1
                }),
                s = function(e, t, n) {
                    !n || inArray(ld(n), m.UNPRINTABLE_KEYS) || Object(a.isSearchingInplace)(e.get().peer, e.get()) || Object(r.isEditableFocused)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
                }.bind(null, e, t),
                l = cd.bind(null, t, e, i),
                c = function(e, t, n) {
                    ld(n) === m.ENTER && e.signal(ld(n), n)
                }.bind(null, t, i),
                d = Object(o.createModule)({
                    handlers: (e, t) => {
                        e(document, "keydown", l), e(document, "keyup", c), e(document, n, s)
                    }
                });
            return {
                unmount() {
                    Object(o.destroyModule)(d)
                }
            }
        }

        function ud(e, t) {
            return -1 === (e ? e.indexOf(t) : 0) && (e.push(t), !0)
        }

        function md(e, t) {
            var n = e ? e.indexOf(t) : -1;
            return -1 !== n && (e.splice(n, 1), !0)
        }

        function gd(e, t, n, s, o, c) {
            var d = Object(i.getTab)(e, t);
            switch (n) {
                case l.MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED:
                case l.MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED:
                    return n === l.MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED ? ud(d.adminIds, s) : md(d.adminIds, s), pd(e, t, o), !0;
                case l.MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED:
                    return d.data.flags = s, pd(e, t, o), !0;
                case l.MAIL_CHAT_UPDATE_TYPE_PINNED:
                    return delete d.pinHideId, cur.imDb.update(Bs.PIN_HIDDEN_ID_OP, [d.peerId, void 0]), !1;
                case l.MAIL_CHAT_UPDATE_TYPE_USER_JOINED:
                    return function(e, t, n) {
                        if (Object(r.isTabLoaded)(n.get(), e)) {
                            var s = Object(i.getTab)(n, e);
                            ud(s.memberIds, t) && s.membersCount++, -1 === s.data.active.indexOf(t) && s.data.active.push(t), t === vk.id && (s.data.kicked = 0, s.data.closed = 0)
                        }
                        return n.set(a.loadChatMember.bind(null, {
                            [e]: [t]
                        })).then(r => {
                            if (t === vk.id && n.get().peer === e) return Promise.all([n.set(a.getPinnedMessage.bind(null, e)), n.set(a.loadKeyboard.bind(null, e))])
                        })
                    }(t, s, e).then(() => (hd(e, t, o, c), o.fixKeyboard())), !0;
                case l.MAIL_CHAT_UPDATE_TYPE_USER_LEFT:
                case l.MAIL_CHAT_UPDATE_TYPE_USER_KICKED:
                    return function(e, t, n, s, o) {
                        if (Object(r.isTabLoaded)(s.get(), e)) {
                            var l = Object(i.getTab)(s, e);
                            md(l.memberIds, t) && l.membersCount--, l.data.active = l.data.active.filter(e => e !== t), t === vk.id && (n ? l.data.kicked = 1 : l.data.closed = 1)
                        }
                        return t === vk.id && s.get().peer === e ? (o.cancelEditing(), s.set(a.unpinMessageOptimistic.bind(null, e))) : Promise.resolve()
                    }(t, s, n === l.MAIL_CHAT_UPDATE_TYPE_USER_KICKED, e, o).then(() => hd(e, t, o, c)), e.get().id !== s && (Object(i.getKeyboard)(e, t) || {}).author_id !== s || e.set(a.deleteKeyboard.bind(null, t)).then(() => o.fixKeyboard()), !0;
                case l.MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED:
                    return e.set(a.loadBanner.bind(null, t)).then(() => o.updateBanner(e)), !0;
                case l.MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED:
                case l.MAIL_CHAT_UPDATE_TYPE_MESSAGE_REQUEST_CHANGED:
                    return !0;
                default:
                    return !1
            }
        }

        function pd(e, t, n) {
            e.get().peer === t && (Object(a.setActions)(e.get()), n.updateActions(e))
        }

        function hd(e, t, n, r) {
            e.get().peer === t && (Object(a.setActions)(e.get()), n.updateChat(e, t), r.updateDialog(t, e))
        }
        var _d = n("gF8j");

        function fd(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var bd = 30,
            vd = 400,
            yd = 250,
            Od = 32,
            Ed = 5 * Od + 24 + 52,
            Cd = 3 * Od + 24,
            wd = 10,
            jd = "._im_aside_notice";

        function Sd(e, t) {
            "spam" === t ? Object(r.showSpamLayer)(e, Hl, {}) : "fav" === t && Object(r.showFavvedBox)(e, {}, _l, {})
        }

        function kd(e, t) {
            if (e.get().gid) {
                var n = t.parentNode,
                    a = geByClass("_im_right_menu_counter", n),
                    r = e.get().dialog_tab_cts;
                a.forEach(e => {
                    var t = domData(e, "tab");
                    val(e, r[t] || "")
                })
            }
        }

        function Td(e, t, n, i, s) {
            e.forEach(e => {
                switch (e.kludges.source_act) {
                    case r.CHAT_PHOTO_REMOVE:
                    case r.CHAT_PHOTO_UPDATE:
                        ! function(e, t, n, r) {
                            t.set(a.updateChatPhoto.bind(null, e)).then(() => {
                                var a = e.kludges.source_act;
                                n.updateDialog(e.peerId, t), r.updateChatPhoto(e, a, t)
                            })
                        }(e, t, n, i)
                }
            })
        }

        function Id(e, t) {
            var n = e.get().longpoll.push.bind(null, [l.resetPeer()]),
                a = () => {
                    var r = e.get().selectedMessages;
                    r && r.length ? (e.setState({
                        selectedMessages: []
                    }).then(() => {
                        t.changedMessageSelection(e), t.cleanSelection(r)
                    }), setTimeout(() => cancelStackPush("im_peer", a), 0)) : n()
                };
            cancelStackPush("im_peer", a)
        }

        function Md(e) {
            var t = e.attaches.filter(e => "sticker" !== e.type && "call" !== e.type);
            return Object(s.isServiceMsg)(e) || 0 === t.length
        }

        function Ad(e, t, n) {
            addClass(n, "im-page_history-show"), t.loadingPeer(e)
        }

        function Ld(e, t) {
            var n = function(e, t) {
                var n = document.querySelector(jd),
                    a = Object(r.isCommunityInterface)(e) ? Ed : Cd,
                    i = n ? n.offsetHeight : 0;
                return a += wd, a += i, Math.floor((t.offsetHeight - a) / Od)
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
                    l = e.get().tabbedPeers.filter(e => !inArray(e.peer, o));
                return e.set(a.updateTabbedPeers.bind(null, l, !0))
            }
            return Promise.resolve(e)
        }

        function Pd() {
            for (var e = curBox(); e;) e.hide(), e = curBox()
        }

        function Dd(e, t, n, s, o, l, c, d, u) {
            e.get().audio_msg.isRecording && e.set(a.cancelRecording).then(() => {
                s.cancelRecording()
            }), AudioMessagePlayer.detachPlayer(), Object(i.isAnyMessageBeingEdited)(e) && s.cancelEditing(), Object(i.isSearching)(e) && t.cancelSearch && (o.clearSearch(e), n.restoreDialogs(e), u().toggleSettingsButton(e, !1)), xd(e, d, u), Ad(e, s, l);
            var m = e.get().peer;
            Object(a.updateMentions)(e.get()), Object(a.videoAutoPlayHandler)(), Object(r.isFullyLoadedTab)(e, t.peerId) && (t.msgid && !Object(i.getMessage)(e, t.peerId, t.msgid) || !t.msgid && !Object(i.getMessage)(e, t.peerId, Object(i.getTab)(e, t.peerId).lastmsg) || Object(i.getTab)(e, t.peerId).skipped) && e.mutate(e => Object(i.makeTabNotFullyLoaded)(e, t.peerId));
            var p = e.set(a.changePeer.bind(null, t.peerId, t.msgid, t.entryPoint)).then(e => {
                var n = e.get(),
                    r = a.loadPeer.bind(null, t.peerId, !1, t.msgid, !1, n);
                return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(r)
            }).then(() => {
                n.selectPeer(t.msgid, e),
                    function(e, t) {
                        Object(r.isPendingForward)(e) && (cancelStackFilter("forward"), e.set(a.forwardMessages.bind(null, e.get().pendingForward, Object(i.getTabDraft)(Object(i.getTab)(e, t)), !1)))
                    }(e, e.get().peer), window.tooltips && tooltips.hideAll(), Pd(), s.preparePeer(e), Id(e, s), Object(r.isClassicInterface)(e) && (n.deactivate(), Ld(e, l).then(() => c.updateMenu(e)), Object(r.updateMessageRequestsCounterInDOM)(e))
            });
            return (p = t.msgid ? p.then(() => e.set(a.selectPeerOnMessage.bind(null, t.peerId === m, m))) : p.then(() => e.set(a.selectPeer.bind(null, !0)))).then(() => {
                if (e.get().peer === t.peerId) {
                    if (t.forward) {
                        var n = e.get().tabs[e.get().peer];
                        !n.scrollBottom && n.unread && e.set(a.readLastMessages.bind(null, e.get().peer))
                    }
                    Object(r.isClassicInterface)(e) && c.updateMenu(e), s.changePeer(e, !1), s.updateTyping(t.peerId, e), Object(a.updateMentions)(e.get())
                }
            }).catch(e => Object(g.imWeirdCatch)("applyNewPeer", e))
        }

        function xd(e, t, n) {
            t && e.get().shown && (t.hide(e), n().createCanceled(e))
        }

        function Nd(e, t, n) {
            Object(i.isSearching)(e) && (t.clearSearch(e), n.restoreDialogs(e))
        }

        function Rd(e, t, n, i, s, o, l) {
            Object(r.isClassicInterface)(e) && (s.saveScroll(e), o.saveScroll(e)), i.rotateCross(e), addClass(l, "im-page_creating"), e.setState({
                isCreating: !0
            }), n && n.show(e, t), Object(r.isClassicInterface)(e) && (setStyle(l, {
                height: Gd(l, e).page
            }), setTimeout(function() {
                addClass(l, "im-page_cropped")
            }, 200)), Object(a.toggleConversation)(!0)
        }

        function Bd(e, t, n, a) {
            Object(r.isTabLoaded)(e.get(), a) && (t.updateTyping(a, e), n.updateTyping(a, e))
        }

        function Fd(e, t, n, i, s) {
            i.activityType || (i.activityType = s);
            var o = e => Bd(e, t, n, i.peerId);
            Object(r.isSelfMessage)(i.peerId, e.get().gid) || (e.set(a.setActivity.bind(null, i, s)).then(o), e.set(a.waitActivity.bind(null, i, s)).then(o))
        }

        function Hd(e, t) {
            t ? e.classList.add("im-page_reconnecting") : e.classList.remove("im-page_reconnecting")
        }

        function Ud(e, t, n, c, d, u, g, p, h, _, f, b, v, y, O, E, C, w, j, S, k) {
            var T = !1;
            return {
                changePeer(e, n) {
                    t.selectPeer(e, n)
                },
                cancelSearch(e) {
                    Nd(e, c, t)
                },
                loadingPeer(e) {
                    Ad(e, n, d)
                },
                restoreDialogs(e, n, a) {
                    t.restoreDialogs(e, n, a)
                },
                toggleSettingsButton(e, t) {
                    f.toggleButton(e, t)
                },
                focusSearch(e) {
                    c.focusInput(e)
                },
                appendSearch(e, n, a, r) {
                    t.appendSearch(e, n, a, r)
                },
                appendDialogs(e, n) {
                    t.appendDialogs(e, n)
                },
                showCreation(e, a) {
                    Rd(e, a, _, c, t, n, d)
                },
                updateState(e, a) {
                    t.updateDialog(e, a), a.get().peer === e && n.updateChat(a, e)
                },
                appendFastDialogs(e, n) {
                    t.appendFastDialogs(e, n, !0)
                },
                createCanceled(e, a) {
                    c.createCanceled(e, a), Object(r.isClassicInterface)(e) ? (setStyle(d, {
                        height: "auto"
                    }), removeClass(d, "im-page_cropped"), setTimeout(() => c.focusInput(e), 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(() => {
                        0 === e.get().peer ? c.focusInput(e) : n.focustTxt(e)
                    }, 0), removeClass(d, "im-page_creating"), e.setState({
                        isCreating: !1
                    })
                },
                updateMenu(e) {
                    E && E.updateMenu(e)
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
                    Object(i.isSearching)(e) && c.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), _ && _.hide(e), Object(r.isCommunityInterface)(e) && kd(e, d), Object(r.isClassicInterface)(e) && (e.get().tabbedPeers.forEach(t => {
                        var n = t.peer;
                        E.updateCounter(e, n), E.updateName(n, e)
                    }), Object(r.updateMessageRequestsCounterInDOM)(e)), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), Object(r.isReservedPeer)(e.get().peer) || n.changePeer(e, !1);
                    var a = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                    handlePageCount(a, e.get().unread_cnt)
                },
                toggleSettingsLoader(e, t) {
                    f.toggleLoader(e, t)
                },
                onUserActions(e, t) {
                    if (!Object(a.isSearchingInplace)(e.get().peer, e.get())) {
                        var s = e.get(),
                            o = s.peer;
                        if (Object(r.isFullyLoadedTab)(s, o))
                            if (!u.is_idle)
                                if (Object(i.countUnread)(e.get().peer, e.get()) > 0) !s.tabs[o].skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(a.readLastMessages.bind(null, o)))
                    }
                },
                removeSelection(e) {
                    t.removeSelection(e), c.focusInput(e)
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
                                var g = s.sel ? Object(r.unUrlPeer)(s.sel) : 0,
                                    p = o.back;
                                0 === g ? b.get().longpoll.push([l.resetPeer(!1, p)]) : g !== b.get().peer && b.get().longpoll.push([l.changePeer(g, s.msgid || !1)]);
                                break;
                            case "invite_chat_id":
                            case "invite_hash":
                                ! function(e) {
                                    e.set(a.leaveInvitation)
                                }(b);
                                break;
                            case "tab":
                                xd(b, _, h), u = !0;
                                var f = s.tab || m.FOLDER_ALL;
                                b.get().longpoll.push([l.changeTab(f)]);
                                break;
                            case "act":
                                s.act && "create" === s.act ? Rd(b, [], _, c, t, n, d) : function(e, t, n, a) {
                                    n && n.hide(e, t)
                                }(b, [], _);
                                break;
                            case "st":
                                s.st && s.sel ? (curBox() && curBox().hide(), b.mutate(a.setInplaceSearch.bind(null, unescape(s.st), s.sel)), n.startSearch(b)) : (b.mutate(a.cancelSearch.bind(null, i.sel)), n.cancelSearch(b, !0));
                                break;
                            case "q":
                                s.q ? (curBox() && curBox().hide(), c.setSearch(b, s.q, !0)) : c.clearSearch(b);
                                break;
                            case "box":
                                Sd(b, s.box)
                        }
                    }), Object(r.isClassicInterface)(b) && void 0 === e.sel && E.updateMenu(b), u && Nd(b, c, t), !1)
                },
                updateDialogFilters(e) {
                    Object(i.isSearching)(e) || t.restoreDialogs(e), f.updateFilter(e)
                },
                removePeer(e, n) {
                    t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([l.resetPeer()]), Object(r.isClassicInterface)(e) && E.updateMenu(e)
                },
                newMessage(e) {
                    Object(r.isClassicInterface)(e) || t.scrollUp(!0)
                },
                onEvents(e, o) {
                    var b = function(e) {
                            for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== l.UNREAD_COUNT || t ? e[n].type === l.UNREAD_COUNT && e.splice(n, 1) : t = !0;
                            return e
                        }(o.filter(e => e.type !== l.ADD_MESSAGE || !(e.flags & l.FLAG_STEALTH))),
                        y = o.filter(s.isServiceMsg),
                        O = o.filter(e => e.type === l.ADD_MESSAGE);
                    Td(y, e, t, n);
                    var C = Object(a.checkNewPeople)(y, O, e),
                        w = Promise.resolve();
                    C.shouldLoad && (w = e.set(a.loadNewPeople.bind(null, C, g))), w.then(() => {
                        b.forEach(o => {
                            switch (o.type) {
                                case l.ADD_MESSAGE:
                                    var g = Object(i.getTab)(e, o.peerId),
                                        b = !g || !g.msgs || 0 == g.msgs.length,
                                        y = Object(r.isDuplicate)(o, e.get()),
                                        O = Object(i.isCommunityBlocked)(e, o.peerId);
                                    if (!e.get().isIncomingMessageRequestsAllowed && Object(i.tabIsMessageRequest)(g)) break;
                                    var C = null;
                                    if (o.kludges.keyboard) {
                                        var w = Object.assign(o.kludges.keyboard, {
                                            author_id: o.userId
                                        });
                                        C = e.set(a.setKeyboard.bind(null, o.peerId, w))
                                    } else {
                                        var j = Object(i.getKeyboard)(e, o.peerId);
                                        j && j.one_time && j.author_id !== Object(s.getAuthorId)(e, o) && (C = e.set(a.deleteKeyboard.bind(null, o.peerId)))
                                    }
                                    if (o.peerId === Object(i.getPeer)(e) && C && C.then(() => n.fixKeyboard()), 0 === y) e.set(a.addMessage.bind(null, o)), Ld(e, d),
                                        function(e, t) {
                                            var n = e.get().tabs[t.peerId],
                                                r = e.get().active_tab;
                                            return r === m.FOLDER_ALL || Object(a.filterFromTab)(r)(n)
                                        }(e, o) && (Object(i.tabIsMessageRequest)(g) || (o.flags & l.FLAG_OUTBOUND || e.set(a.updateFavAndTitle.bind(null, o.peerId, !0)), function(e, t) {
                                            var n = t.flags & l.FLAG_OUTBOUND,
                                                a = inArray(t.peerId, e.get().mutedPeers),
                                                i = t.flags & l.FLAG_DELETED,
                                                s = e.get().gid;
                                            if (!n && !a && !i) {
                                                var o, c, d = function(e, t) {
                                                        return t < 2e9 && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
                                                    }(t.subject, t.peerId) || "",
                                                    u = (d ? d + " " : "") + t.text || "",
                                                    m = t.userId,
                                                    g = t.peerId,
                                                    p = e.get().tabs[g];
                                                if (t.kludges && t.kludges.source_act && (u = stripHTML(Object(r.renderServiceMsg)(e, t, p, !1))), (!e.get().notify_msg && !Object(r.isChatPeer)(g) || s && !e.get().mute) && window.Notifier && Notifier.playSound({
                                                        author_id: g
                                                    }), !Object(r.isChatPeer)(g)) return;
                                                u = trim(replaceEntities(stripHTML(u.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), u = Object(Fs.replaceMentions)(u, (e, t, n, a, r) => r), Object(r.isChatPeer)(g) ? (o = Object(D.oCacheGet)(e, m).name, p.tab && (o += " » " + p.tab), c = Object(D.oCacheGet)(e, m).photo) : (o = p.tab, c = p.photo);
                                                var h = t.attaches[0];
                                                if (h && "mail" === h.type) u += "\n[" + getLang("mail_added_msgs") + "]";
                                                else if (h) {
                                                    var _ = "doc" === h.type && "graffiti" === h.kind ? "graffiti" : h.type;
                                                    u += "\n[" + getLang("mail_added_" + _) + "]"
                                                }
                                                o = trim(replaceEntities(stripHTML((o || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                                                    id: t.messageId,
                                                    text: u,
                                                    author_id: g,
                                                    title: o,
                                                    author_photo: c
                                                })
                                            }
                                        }(e, o)), t.updateTyping(o.peerId, e), Object(i.isSearching)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o.peerId)), !1 === Object(i.isCommunityBlocked)(e, o.peerId) && !0 === O && n.updateActions(e), Object(r.isClassicInterface)(e) && (E.updateCounter(e, o.peerId), E.updateMenu(e)), e.set(a.updateActivity.bind(null, o)).then(Bd.bind(null, e, n, t, o.peerId)), n.addMessage(e, o), Object(r.isClassicInterface)(e) || f.updateFilter(e), Md(o) || !Object(r.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(a.loadMedia.bind(null, o)).then(e => {
                                            n.replaceAttachmentPlaceholders(e, o), Object(a.videoAutoPlayHandler)()
                                        }), Object(Oe.statlogsSendingTimeStart)(e, o, "send", "opt_to_lp");
                                    else 2 === y ? (Md(o) || e.set(a.loadMedia.bind(null, o)).then(e => {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    }), e.set(a.replaceMessage.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e), o.randomId && Object(Oe.statlogsSendingTimeEnd)(e, o, "send", "opt_to_lp")) : Object(i.isSearching)(e) || t.promoteDialog(e, o.peerId);
                                    Object(i.tabIsMessageRequest)(g) && Object(r.checkMessageRequestsTab)(e, t.update), g && b && g.peerId === Object(i.getPeer)(e) && S();
                                    break;
                                case l.EDIT_MESSAGE:
                                case l.REPLACE_MESSAGE:
                                    e.set(a.editMessage.bind(null, o)).then(e => {
                                        t.updateDialog(o.peerId, e), n.updateTyping(o.peerId, e), n.editMessage(e, o), Md(o) || !Object(r.isFullyLoadedTab)(e, o.peerId) || o.local || e.set(a.loadMedia.bind(null, o)).then(e => {
                                            n.replaceAttachmentPlaceholders(e, o)
                                        })
                                    });
                                    break;
                                case l.READ_INBOUND:
                                    e.set(a.markInboundMessagesAsRead.bind(null, o)).then(e => {
                                        t.updateCounter(e, o.peerId), n.updateGoToEnd(e, !0), Object(r.isClassicInterface)(e) && E.updateCounter(e, o.peerId), Object(i.isSearching)(e) || t.restoreDialogs(e), f.updateFilter(e)
                                    });
                                    break;
                                case l.READ_OUTBOUND:
                                    e.set(a.markOutboundMessagesAsRead.bind(null, o)).then(e => {
                                        t.updateCounter(e, o.peerId), n.markMessagesAsRead(e, o)
                                    });
                                    break;
                                case l.UNREAD_COUNT:
                                    e.set(a.updateUnreadCount.bind(null, o.count)).then(() => {
                                        var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                        handlePageCount(t, o.count), f.updateFilter(e), Object(r.isClassicInterface)(e) && kd(e, d)
                                    });
                                    break;
                                case l.GOT_ONLINE:
                                case l.GOT_OFFLINE:
                                    var k = o.type === l.GOT_ONLINE;
                                    e.set(a.updateOnline.bind(null, o.userId, !!k && o.platform, o.lastSeenTs)).then(e => {
                                        Object(r.isTabLoaded)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                    });
                                    break;
                                case l.SET_FLAGS:
                                case l.REPLACE_FLAGS:
                                case l.RESET_FLAGS:
                                    if (!(o.flags & l.FLAG_DELETED || o.flags & l.FLAG_SPAM) || o.type !== l.SET_FLAGS || Object(r.isAlreadyDeleted)(e, o.peerId, o.messageId) || e.get().blockedFlagUpdates[o.peerId] || p(o), o.flags === l.FLAG_IMPORTANT) {
                                        var I = o.type === l.SET_FLAGS;
                                        e.set(a.updateImportant.bind(null, I ? 1 : -1, o.messageId)).then(() => {
                                            Object(r.isClassicInterface)(e) || c.updateImportantCnt(e)
                                        }), e.set(a.updateFavMessage.bind(null, [o.messageId], o.peerId, I)).then(() => {
                                            n.markImportant(o.messageId, I, e)
                                        })
                                    }
                                    break;
                                case l.RECORDING_AUDIO:
                                    Fd(e, n, t, o, a.ACTIVITY_TYPE_RECORDING_AUDIO);
                                    break;
                                case l.TYPING:
                                    Fd(e, n, t, o, a.ACTIVITY_TYPE_TYPING);
                                    break;
                                case l.NOTIFY_SETTINGS_CHANGED:
                                    ! function(e, t, n, r) {
                                        e.set(a.setMutedPeer.bind(null, n, r)).then(t().updateState.bind(null, n))
                                    }(e, h, o.peerId, 0 !== o.disabledUntil);
                                    break;
                                case l.RESYNC:
                                    e.get().longpoll.pause(), e.set(a.resync).then(h().resync).then(() => e.get().longpoll.resume());
                                    break;
                                case l.TRANSITION:
                                    v.transition(o.state);
                                    break;
                                case l.RESET_PEER:
                                    if (o.removeActivePeer) {
                                        var M = e.get().tabbedPeers.filter(t => {
                                            var n = t.peer,
                                                a = t.type;
                                            return n !== e.get().peer && "perm" === a
                                        });
                                        e.setState({
                                            tabbedPeers: M
                                        })
                                    }! function(e, t, n, s) {
                                        e.set(a.cancelRecording).then(() => {
                                            n.cancelRecording()
                                        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(s, "im-page_history-show"), n.stopLoading(), Object(i.isAnyMessageBeingEdited)(e) && n.cancelEditing();
                                        var o = e.get().peer;
                                        e.set(a.changePeer.bind(null, 0, !1, !1)).then(() => {
                                            window.tooltips && window.tooltips.hideAll(), Pd(), Object(r.isClassicInterface)(e) && t.activate(), n.changePeer(e), Object(r.isClassicInterface)(e) && t.restoreScroll(e), setTimeout(() => {
                                                e.get().longpoll.push([l.transitionEvent("search")])
                                            }, 13), Object(r.isLocksAvailable)(e) && Object(r.isPeerBlockedByMe)(o, e) && e.set(a.releaseBlock.bind(null, o))
                                        })
                                    }(e, t, n, d), o.cancelSearch && Nd(e, c, t), Object(r.isClassicInterface)(e) && E.updateMenu(e), c.focusInput(e);
                                    break;
                                case l.CHANGE_TAB:
                                    Object(r.changeTab)(o.tab, e, h, a.changeDialogsTab).then(e => {
                                        f.updateFilter(e)
                                    });
                                    break;
                                case l.RESET_DIRECTORIES:
                                case l.SET_DIRECTORIES:
                                case l.REPLACE_DIRECTORIES:
                                    if (o.mask === l.FOLDER_HAS_BANNER) break;
                                    e.set(a.updateFolderState.bind(null, o.peerId, o.mask, o.type, o.local)).then(e => {
                                        Object(i.isSearching)(e) || o.type === l.RESET_DIRECTORIES && o.mask === l.FOLDER_IMPORTANT || o.type === l.REPLACE_DIRECTORIES || t.restoreDialogs(e), t.updateDialog(o.peerId, e), kd(e, d), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                    });
                                    break;
                                case l.DELETE_DIALOG:
                                    e.set(a.deletedDialog.bind(null, o.peerId, Promise.resolve([]))).then(() => {
                                        h().removePeer(e, o.peerId), h().updateDialogFilters(e)
                                    });
                                    break;
                                case l.CHANGE_PEER:
                                    Dd(e, o, t, n, c, d, E, _, h);
                                    break;
                                case l.MUTEX:
                                    var A = {
                                            [o.peerId]: o
                                        },
                                        L = Object(r.isPeerBlocked)(o.peerId, e);
                                    e.set(a.updateBlockStates.bind(null, A)).then(() => {
                                        t.updateDialog(o.peerId, e);
                                        var a = Object(r.isPeerBlocked)(o.peerId, e);
                                        Object(r.isFullyLoadedTab)(e.get(), o.peerId) && L !== a && n.updateChat(e, o.peerId)
                                    });
                                    break;
                                case l.FAILED_MESSAGE:
                                    e.set(a.setMessageErrored.bind(null, o.peer, o.message)).then(() => {
                                        n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                    });
                                    break;
                                case l.RESEND:
                                    var P = o.message.messageId;
                                    e.set(a.resendMessage.bind(null, o.peerId, P, o.message)).then(() => {
                                        n.resendMessage(o.peerId, P), t.promoteDialog(e, o.peerId)
                                    });
                                    break;
                                case l.CONVERSATION_UPDATED:
                                    if (Object(r.isTabLoaded)(e.get(), o.peerId)) gd(e, o.peerId, o.updateType, o.updateArg, n, t) || h().reloadChatInfo(o.peerId);
                                    Object(i.isMessageRequestChangedEvent)(o) && e.set(a.updateMessageRequestsCounter.bind(null, o)).then(() => {
                                        Object(r.updateMessageRequestsCounterInDOM)(e), Object(r.checkMessageRequestsTab)(e, t.update)
                                    });
                                    break;
                                case l.WAITING_FOR_RECONNECT:
                                    setTimeout(() => {
                                        Hd(d, !0), n.setNetworkWaitingStatus(o.timeout - 1)
                                    }, 1e3);
                                    break;
                                case l.RECONNECTING:
                                    Hd(d, !0), n.setNetworkReconnectingStatus();
                                    break;
                                case l.RECONNECTED:
                                    Hd(d, !1), setTimeout(n.clearNetworkStatus, 0), browser.chrome && !Object(r.isClassicInterface)(e) && e.get().peer && (u.is_idle ? T || (u.once("unidle", () => {
                                        T = !1, t.forceScrollReinit()
                                    }), T = !0) : t.forceScrollReinit())
                            }
                        })
                    })
                },
                updateHistory: e => n.updateHistory(e),
                reloadChatInfo(e) {
                    Object(r.isTabLoaded)(b.get(), e) && b.set(a.loadChatInfo.bind(null, e)).then(() => (function(e, t, n, i, s) {
                        i.updateChatTopic(t, e), Object(r.isClassicInterface)(e) && s.updateName(t, e), e.get().peer == t && (Object(a.setActions)(e.get()), i.updateActions(e))
                    })(b, e, 0, n, E))
                },
                cancelRecording: () => b.set(a.cancelRecording).then(() => n.cancelRecording()),
                fixHeight() {
                    S()
                },
                unmount() {
                    Object(o.destroyModule)(e), clearInterval(b.get().update_title_to), u.stop(), k(), t.unmount();
                    var i = window.devicePixelRatio >= 2 ? "_2x" : "";
                    setFavIcon("/images/icons/favicons/fav_logo" + i + ".ico"), n.unmount(), c.unmount(), cancelStackFilter("im_peer"), f.unmount(), _ && _.unmount(), E && E.unmount(), C && C(), y && y(), Object(r.isLocksAvailable)(b) && b.get().peer && b.set(a.releaseBlock.bind(null, b.get().peer)), w.unmount(), E && E.unmount(), j.unmount(), clearInterval(O), cur.imDb.unmount(), cur.imDb = !1
                }
            }
        }

        function Gd(e, t) {
            var n = ge("page_header"),
                a = geByClass1("_im_page_history", e),
                i = window.clientHeight() - n.offsetHeight - bd - 2,
                s = Object(r.isClassicInterface)(t) ? yd : vd,
                o = {
                    page: Math.max(i, s)
                };
            if (Object(r.isClassicInterface)(t)) {
                var l = Object(r.getClassicChatHeight)();
                l = l > 0 ? Math.min(l - n.offsetHeight - bd - 2, i) : i;
                var c = hasClass(a, "im-page--history_empty-hist") ? l : i;
                o.history = Math.max(l, s), o.chat = Math.max(c, s)
            }
            return o
        }

        function qd(e, t, n, i, s) {
            var o = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                l = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
            if (!isFullScreen()) {
                var c = Gd(e, t);
                if (setStyle(e, {
                        minHeight: c.page
                    }), Object(r.isClassicInterface)(t) && (void 0 === t.get().chatResizeInitialized && t.set(a.initializeChatResize), setStyle(e, {
                        height: t.get().isCreating ? c.page : "auto"
                    }), setStyle(geByClass1("_im_page_dialogs", e), {
                        minHeight: c.page,
                        position: "static",
                        top: 0
                    }), setStyle(geByClass1("_im_page_history", e), {
                        minHeight: c.history,
                        position: "relative",
                        top: 0
                    }), setStyle(geByClass1("_im_chat_body_abs", e), {
                        minHeight: c.chat,
                        height: c.chat,
                        position: "relative",
                        top: 0
                    })), browser.safari && l && "function" == typeof l && l(), i && i.updateScroll(), s && s.updateScroll(), n) {
                    var d = n.updateScroll();
                    n.scrollFix(t, t.get().peer, d)
                }
                o && setTimeout(() => qd(e, t, n, i, s, !1), 100)
            }
        }

        function $d() {
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

        function zd(e, t) {
            var n, s = t.get(),
                c = window.devicePixelRatio >= 2 ? "_2x" : "";
            setFavIcon("/images/icons/favicons/fav_im" + c + ".ico"), qd(e, t, !1, !1, !1, !0), show(e), Object(Oe.statlogsBrowserNotificationsUser)();
            var d = Object(o.createMutations)(Ud),
                u = d.callMutations,
                m = d.bindMutations,
                p = s.useFcLongpoll && vk.lpConfig.enabled && Notifier.getLpInstance && Notifier.getLpInstance(),
                h = p ? Notifier.getLpInstance() : t.get().gid ? function(e) {
                    Object(g.imWeirdLog)("im_start_longpoll_group", {}, !1);
                    var t = Object(xc.createLongpollEventsQueue)(e.ts, e => {
                            a.trigger("data", e)
                        }),
                        n = Object(Dc.createLongpoll)(e, t.onLp),
                        a = new window.EventEmitter;
                    return {
                        onData: e => a.on("data", e),
                        offData: e => a.off("data", e),
                        push: e => a.trigger("data", e),
                        pause: t.pause.bind(t),
                        resume: t.resume.bind(t),
                        abortWaiting: n.abortWaiting.bind(n),
                        onLp: t.onLp.bind(t),
                        stop: n.stopConnection.bind(n),
                        isEnabled: () => !(!n || n.isStopped())
                    }
                }(s.lpConfig) : Xc(s);

            function _() {
                for (var e = arguments.length, n = new Array(e), a = 0; a < e; a++) n[a] = arguments[a];
                u().onEvents(t, n)
            }
            h.onData(_), p && Object(g.imWeirdLog)("im_use_fc_longpoll", {}, !1);
            var v, y, O = geByClass1("_im_dialogs_search", e),
                E = geByClass1("_im_dialogs_settings", e),
                C = ye(geByClass1("_im_page_dcontent", e), t, u),
                w = Ll(O, t, u),
                j = Kl(E, t, u),
                S = od(t);
            (cur.imDb = Object(Bs.mount)(t.get().gid ? -t.get().gid : vk.id), t.set(a.preloadSearchIndex.bind(null, cur.imDb)), Object(r.isClassicInterface)(t) && j.updateSettings(t), Object(r.isClassicInterface)(t)) && (v = ad(geByClass1("_im_ui_peers_list", e.parentNode), t), y = function(e, t, n, a) {
                if (browser.mobile) return !1;
                var r = [t, n, geByClass1("_im_chat_input_w", a), geByClass1("_im_dialog_actions", a)],
                    i = null,
                    s = hasClass(e, "im-page--header_static"),
                    o = ge("im-group-online-disabled-notice");

                function l() {
                    var t = Object(b.getNativeOption)("scrollLeft"),
                        n = hasClass(e, "im-page--header_static"),
                        a = [];
                    i !== t ? a = r.slice().concat([e]) : n !== s && (a = [e]), i = t, s = n, a.length > 0 && a.forEach(a => {
                        var r = e === a && n ? 0 : -t;
                        setStyle(a, {
                            [cssTransformProp]: 0 === r ? "unset" : "translateX(" + r + "px)"
                        })
                    })
                }
                return o && r.push(o), r = r.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", l), l(), () => {
                    removeEvent(window, "scroll", l)
                }
            }(O, E, geByClass1("_im_right_menu", e.parentNode), e));
            Object(r.isClassicInterface)(t) && s.peer && C.deactivate(), s.gid || (n = Mc(geByClass1("_im_dialogs_creation", e), t, u));
            var k = rl(geByClass1("_im_page_history", e), t, C, v, u),
                T = s.isCreating,
                I = T ? "create" : 0 === s.peer ? "search" : "default";
            T && n.show(t, []);
            var M = Lc(t, I, C, k, w, n),
                A = dd(t, M);
            k.updateScroll();
            var L = function(e, t, n, i) {
                var s = t.get();
                Object(r.isReservedPeer)(s.peer) || e().onUserActions(t, i), s.update_old_title && t.set(a.updateFavAndTitle.bind(null, !1, !1))
            }.bind(null, u, t, M);
            Object(r.isReservedPeer)(s.peer) || setTimeout(() => Id(t, k), 10);
            var P = new _d.default({
                    id: "im",
                    element: document,
                    focusElement: window,
                    triggerEvents: "mouseover mousedown keypress"
                }),
                D = debounce($d, 300),
                x = qd.bind(null, e, t, k, C, n, !1, D);
            t.setState({
                longpoll: h
            }), t.set(a.setExecStack.bind(null, [])), P.on("unidle", function() {
                h.abortWaiting(), L()
            }), P.start(), nav.objLoc.box && (Sd(t, nav.objLoc.box), Object(Rs.updateLocation)({
                box: null
            }));
            var N, R = function(e) {
                var t = e.get();
                return Object(r.isLocksAvailable)(e) ? Object(Jc.createWorker)(t.mutex_key, function(e) {
                    t.longpoll.push([l.mutexEvent(e)])
                }, function(e, n) {
                    return Object(a.getMutexQueue)(t.gid).then(e => {
                        return fd(e, 1)[0]
                    })
                }).stop : null
            }(t);
            if (Object(r.isLocksAvailable)(t) && (N = setInterval(r.blockLatencyCompensation.bind(null, t, s.longpoll), 2e3)), t.get().invitation && Object(r.showInvitationBox)(t, t.get().invitation, a.leaveInvitation), Object(r.isClassicInterface)(t) && Object(i.existsIncomingMessageRequest)(t)) {
                var B = document.getElementById("ui_rmenu_mr");
                B && B.classList.remove("unshown")
            }
            var F = Object(f.throttleAccumulate)(function(e, t, n, r, s) {
                    var o = s.reduce((e, t) => (e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e), {});
                    Object.keys(o).forEach(s => {
                        var l = o[s];
                        e.set(a.removeMessages.bind(null, l, s)).then(() => e.set(a.removeMessagesMarkDeleted.bind(null, l, s))).then(() => t.removeMessages(l, +s, e)).then(() => {
                            var o = Object(i.getTab)(e, s);
                            o && l.some(e => e >= o.lastmsg) && Object(a.loadActualLastMessage)(e, +s).then(() => {
                                n.promoteDialog(e, s), r && r.updateCounter(e, s), t.updateGoToEnd(e, !0)
                            })
                        })
                    })
                }.bind(null, t, k, C, v), 200),
                H = r.hideTopNotice.bind(null, t),
                U = r.hideAsideNotice.bind(null, t);
            return m(Object(o.createModule)({
                handlers: (t, n) => {
                    t(document, "mousemove mousedown keypress", L), t(window, "resize", x), n(e, "click", r.HIDE_TOP_NOTICE_CLASS, H), n(gpeByClass("_im-page-wrap", e), "click", r.HIDE_ASIDE_NOTICE_CLASS, U), n(gpeByClass("_im-page-wrap", e), "click", r.HIDE_ASIDE_PROMO_BLOCK_CLASS, r.hideAsidePromoBlock), n(gpeByClass("_im-page-wrap", e), "click", r.INSTALL_VKADMIN_LINK, r.installVKAdminApp), browser.safari && t(document, "visibilitychange", $d)
                }
            }), C, k, w, e, P, h, F, u, n, j, t, M, R, N, v, y, S, A, x, function() {
                p ? h.offData(_) : h.stop()
            })
        }
        var Kd, Vd, Wd = window,
            Yd = Wd.nav,
            Qd = Wd.setStyle,
            Xd = Wd.getLang,
            Jd = "._im_sick_reload",
            Zd = "._im_sick_timer",
            eu = 5e3,
            tu = 6e5,
            nu = 30,
            au = 400;

        function ru(e) {
            var t = ge("page_header"),
                n = window.clientHeight() - t.offsetHeight - nu - 2,
                a = au;
            Qd(e, {
                height: Math.max(n, a)
            })
        }

        function iu(e) {
            var t = Object(r.formatTimespan)(Math.floor(Math.max(e, 0) / 1e3), !0);
            return t ? Xd("mail_sick_timer").replace(/{timer}/gi, t) : ""
        }

        function su() {
            Yd.reload({
                force: !0
            })
        }

        function ou(e) {
            return {
                unmount() {
                    clearInterval(Vd), clearTimeout(Kd), Object(o.destroyModule)(e)
                }
            }
        }

        function lu(e, t, n) {
            ru(e);
            var a, r, i = (0, Object(o.createMutations)(ou).bindMutations)(Object(o.createModule)({
                    handlers: (t, n) => {
                        t(e.querySelector(Jd), "click", su), t(window, "resize", ru.bind(null, e))
                    }
                })),
                s = (a = localStorage.getItem("im_sick_timer"), r = a ? Math.min(2 * parseInt(a), tu) : eu, localStorage.setItem("im_sick_timer", r), r),
                l = e.querySelector(Zd),
                c = +new Date;
            return l.innerHTML = iu(s), Vd = setInterval(() => {
                l.innerHTML = iu(c + s - new Date)
            }, 500), Kd = setTimeout(su, s), i
        }
        var cu = n("E2g8"),
            du = n("f4YT"),
            uu = cu.Promise;
        window.IM = {
            init(e) {
                if (window.imwl = e.imwl, Object(g.startLoggingAllUnhandled)(), addTemplates(du), window.Promise || (window.Promise = uu), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.failed) return lu(geByClass1("im-sick", ge("page_body")));
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
                var s = _(e);
                i.forEach(e => Object(D.oCacheAdd)(s, e)), i = void 0, Object(r.normalizeTabsGotFromServer)(s, s.get().tabs), cur.imClassicInterface = Object(r.isClassicInterface)(s);
                var o = zd(geByClass1("js-im-page", ge("page_body")), s);
                Object(a.updateMentions)(s.get()), window.IMBRIDGE = {
                    chatPhotoSaved(e) {
                        curBox() && curBox().hide();
                        var t = (e || {})[1];
                        return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || s.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                    },
                    updateHistory(e) {
                        s.set(a.updateHistory.bind(null, e)).then(() => {
                            o.updateHistory(e)
                        })
                    },
                    syncHistory(e) {
                        isFunction(e) || (e = function() {}), s.set(a.syncHistory.bind(null, e)).then(() => {
                            o.syncHistory(e)
                        })
                    },
                    activateTab(e) {
                        s.get().gid || s.get().longpoll.push([Object(l.changePeer)(intval(e), !1, !1, !0)])
                    }
                };
                var c = !1;
                cur.nav.push(function() {
                    if (c) return !0;
                    s.get().audio_msg && s.get().audio_msg.isRecording && o.cancelRecording(), AudioMessagePlayer.detachPlayer();
                    var t = o.route.apply(null, arguments);
                    return !1 !== t && (o.unmount(), window.IMBRIDGE = void 0, s.unmount(), window.store = void 0, c = !0, e = !1, s = !1, o = !1, Object(g.stopLoggingAllUnhandled)()), t
                })
            }
        };
        try {
            stManager.done("imn.js")
        } catch (e) {}
    },
    "MV/q": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return o
        });
        n("ioFf"), n("rGqo"), n("Btvt"), n("91GP");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class o extends a.Component {
            constructor(e) {
                super(e), this.getRef = e => {
                    this.element = e
                }, this.resize = () => {
                    var e = this.element;
                    if (e) {
                        var t = e.offsetHeight,
                            n = e.scrollHeight,
                            a = 0;
                        n + a <= t && (a = 0), e.value && this.setState({
                            height: n - a
                        }), this.setState({
                            height: 0
                        }, () => {
                            var t = e.scrollHeight - a;
                            this.setState({
                                height: t
                            }), this.props.onResize(e)
                        })
                    }
                }, this.onChange = e => {
                    this.props.grow && this.resize(), this.isControlledOutside || this.setState({
                        value: e.target.value
                    }), this.props.onChange && this.props.onChange(e)
                }, this.state = {
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
                    l = s(e, ["className", "initialValue", "grow", "style", "onResize", "value"]),
                    c = this.isControlledOutside ? o : this.state.value,
                    d = this.state.height || n.height || 66;
                return a.createElement("textarea", i({}, l, {
                    value: c,
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    ref: this.getRef,
                    style: Object.assign({
                        height: d
                    }, n),
                    className: Object(r.classNames)("Textarea", t)
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
        n.r(t), n.d(t, "isUnread", function() {
            return i
        }), n.d(t, "isServiceMsg", function() {
            return s
        }), n.d(t, "isCallMessage", function() {
            return o
        }), n.d(t, "isOut", function() {
            return l
        }), n.d(t, "hasReply", function() {
            return c
        }), n.d(t, "isGraffiti", function() {
            return u
        }), n.d(t, "isAudioMsg", function() {
            return m
        }), n.d(t, "isSticker", function() {
            return g
        }), n.d(t, "isGift", function() {
            return p
        }), n.d(t, "isMoney", function() {
            return h
        }), n.d(t, "isMoneyRequest", function() {
            return _
        }), n.d(t, "isVKPay", function() {
            return f
        }), n.d(t, "isImportant", function() {
            return b
        }), n.d(t, "getUserId", function() {
            return v
        }), n.d(t, "getAuthorId", function() {
            return y
        }), n.d(t, "wasEdited", function() {
            return O
        }), n.d(t, "isMessageSelected", function() {
            return E
        });
        n("OEbY");
        var a = n("f01n"),
            r = n("aong");

        function i(e, t) {
            return "number" != typeof t.messageId || (l(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function s(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function o(e) {
            return "call" == e.kludges.attach1_type
        }

        function l(e) {
            return e.flags & a.FLAG_OUTBOUND
        }

        function c(e) {
            var t = e.attaches.filter(e => "mail" === e.type).length > 0;
            return e.attaches.filter(e => "reply" === e.type).length > 0 || e.flags & a.FLAG_HAS_REPLY && t
        }

        function d(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                a = e.attaches[0];
            return a && (a.type === t || a.type === n)
        }

        function u(e) {
            return d(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function m(e) {
            return Boolean(e.attaches.find(e => "doc" === e.type && "audiomsg" === e.kind))
        }

        function g(e) {
            return Boolean(e.attaches.find(e => "sticker" === e.type))
        }

        function p(e) {
            return d(e, "gift")
        }

        function h(e) {
            return d(e, "money_transfer", "money_request")
        }

        function _(e) {
            return d(e, "money_request")
        }

        function f(e) {
            return d(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function b(e) {
            return e.flags & a.FLAG_IMPORTANT
        }

        function v(e) {
            return l(e) ? vk.id : e.userId
        }

        function y(e, t) {
            var n = Object(r.unpackStore)(e);
            return l(t) ? n.id : t.userId
        }

        function O(e) {
            return e.update_time > 0
        }

        function E(e, t) {
            return (e.get().selectedMessages || []).indexOf(t) >= 0
        }
    },
    N1NS: function(e, t, n) {
        "use strict";
        n.r(t);
        n("rE2o"), n("ioFf"), n("rGqo"), n("Btvt"), n("KKXr");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var r = new window.Map;

        function i(e) {
            var t = r.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var i, s = 0; s < n.length; s++) {
                        var o = a(n[s], 2),
                            l = o[0],
                            c = o[1],
                            d = void 0;
                        if (hasClass(e.target, l) ? d = c(e, e.target) : (i = gpeByClass(l, e.target, e.currentTarget)) && (d = c(e, i)), !1 === d) break
                    }
            }
        }
        n.d(t, "createMutations", function() {
            return c
        }), n.d(t, "createModule", function() {
            return u
        }), n.d(t, "destroyModule", function() {
            return m
        });
        var s = window,
            o = s.addEvent,
            l = s.removeEvent;

        function c(e) {
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

        function d(e, t, n, a, s) {
            ! function(e, t, n, a) {
                var s = r.get(e);
                s || (r.set(e, {}), s = r.get(e));
                for (var o = t.split(" "), l = 0; l < o.length; l++) {
                    var c = o[l];
                    s[c] || (s[c] = [], addEvent(e, c, i)), s[c].push([n, a])
                }
            }(t, n, a, s), e._registeredHandlers.push(["delegate", t, n, a, s])
        }

        function u(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, a) {
                o(t, n, a), e._registeredHandlers.push(["bind", t, n, a])
            }.bind(null, t), d.bind(null, t)), t
        }

        function m(e) {
            e._registeredHandlers.forEach(e => {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, n, a) {
                    var s = r.get(e);
                    s && (t.split(" ").forEach(t => {
                        s[t] && (s[t] = s[t].filter(e => e[0] !== n || e[1] !== a), 0 === s[t].length && removeEvent(e, t, i))
                    }), 0 === Object.keys(s).map(e => s[e].length).reduce((e, t) => e + t) && r.delete(e))
                }(...t) : l(...t)
            }), e._registeredHandlers = []
        }
    },
    NsuH: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return o
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR")),
            i = n("BN/X"),
            s = "/images/camera_c.gif";
        class o extends a.PureComponent {
            constructor(e) {
                super(e), this.onError = () => {
                    this.setState({
                        errored: !0
                    })
                }, this.state = {}
            }
            getPhotoImage() {
                var e = this.props,
                    t = e.size,
                    n = e.photo,
                    r = e.title;
                return a.createElement("img", {
                    width: t,
                    height: t,
                    src: this.state.errored ? s : n,
                    alt: r,
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
                    l = e.href,
                    c = e.title,
                    d = e.description,
                    u = e.target,
                    m = {
                        [`Entity--size${s}`]: !!s
                    };
                return a.createElement("div", {
                    className: Object(r.classNames)("Entity", t, m),
                    style: n
                }, a.createElement("div", {
                    className: "Entity__aside"
                }, "string" == typeof o ? l ? a.createElement("a", {
                    href: l
                }, this.getPhotoImage()) : this.getPhotoImage() : o), a.createElement("div", {
                    className: "Entity__main"
                }, c && l ? a.createElement("div", {
                    className: "Entity__title"
                }, a.createElement(i.default, {
                    href: l,
                    dangerouslySetInnerHTML: {
                        __html: c
                    },
                    target: u
                })) : a.createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: c
                    }
                }), "string" != typeof d ? a.createElement("div", {
                    className: "Entity__description"
                }, d) : a.createElement("div", {
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
        n.r(t), n.d(t, "statlogsForwardEvent", function() {
            return s
        }), n.d(t, "statlogsForwardFromCommunityEvent", function() {
            return o
        }), n.d(t, "statlogsCommunityTemplatesClickEvent", function() {
            return l
        }), n.d(t, "statlogsForwardFromChannel", function() {
            return c
        }), n.d(t, "statlogsSendingTime", function() {
            return u
        }), n.d(t, "statlogsSendingTimeStart", function() {
            return m
        }), n.d(t, "statlogsSendingTimeEnd", function() {
            return g
        }), n.d(t, "statlogsSendingError", function() {
            return p
        }), n.d(t, "statlogsSendingQueueLength", function() {
            return _
        }), n.d(t, "statlogsSendingRetry", function() {
            return f
        }), n.d(t, "statlogsBrowserNotificationsUser", function() {
            return b
        }), n.d(t, "statlogsBrowserNotificationsOn", function() {
            return v
        }), n.d(t, "statlogsBrowserNotificationsOff", function() {
            return y
        });
        n("pIFo");
        var a = n("1y80"),
            r = n("aong"),
            i = {};

        function s(e) {
            Object(a.statlogsProbValueEvent)(.1, "im_forward_stat", d(e), !!e.get().gid)
        }

        function o(e, t) {
            Object(a.statlogsProbValueEvent)(.1, "im_forward_from_community_stat", d(e), !!e.get().gid, +t)
        }

        function l() {
            Object(a.statlogsProbValueEvent)(1, "im_apply_community_template_stat", 1)
        }

        function c() {
            Object(a.statlogsProbValueEvent)(1, "messages_channel_forward_click", 1)
        }

        function d(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function u(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(a.randEnabled)(1)) return () => {};
            var i = +new Date,
                s = h(e);
            return function() {
                var e = +new Date - i;
                Object(a.statlogsValueEvent)("messages_send_time_web", e, t, n, s, r)
            }
        }

        function m(e, t, n, a) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var r = [t.messageId.replace("rid", ""), n, a].join("_"),
                    s = t.attaches.length > 0;
                i[r] = u(e, n, a, s)
            }
        }

        function g(e, t, n, a) {
            var r = [t.randomId, n, a].join("_"),
                s = i[r];
            s && (s(), delete i[r])
        }

        function p(e, t, n, r) {
            var i = h(e),
                s = "" === t ? "network" : "unknown";
            Object(a.randEnabled)(1) && Object(a.statlogsValueEvent)("messages_send_errors_web", s, n, r, i)
        }

        function h(e) {
            var t = Object(r.unpackStore)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function _(e) {
            var t = Object(r.unpackStore)(e),
                n = t.imQueue(t.peer).length;
            Object(a.randEnabled)(1) && Object(a.statlogsValueEvent)("messages_send_queue_size", n)
        }

        function f(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "unknown";
            Object(a.randEnabled)(1) && Object(a.statlogsValueEvent)("messages_send_retry", 1, t, e)
        }

        function b() {
            var e = "im_browser_notifications_users";
            ls.get(e) || ls.get("im_ui_notify_off") || (ls.set(e, 1), Object(a.statlogsValueEvent)(e, 1))
        }

        function v() {
            Object(a.statlogsProbValueEvent)(1, "im_browser_notifications_on", 1)
        }

        function y() {
            Object(a.statlogsProbValueEvent)(1, "im_browser_notifications_off", 1)
        }
    },
    "P+eJ": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "lpLogFc", function() {
            return r
        }), n.d(t, "longpollTesting_onFcEvents", function() {
            return u
        }), n.d(t, "longpollTesting_onImEvents", function() {
            return m
        });
        var a = n("ERyv");

        function r(e, t) {
            if (window.vk.lpConfig.debug) {
                for (var n = `background: ${e}; color: white`, a = new Date, r = e => e < 10 ? "0" + e : e, i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++) s[o - 2] = arguments[o];
                console.log(`%c ${a.getHours()}:${r(a.getMinutes())}:${r(a.getSeconds())}:${a.getMilliseconds()} ${t} `, n, ...s)
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
            }), setTimeout(l, 1e4)
        }

        function l() {
            window.lpWeird.length && (Object(a.imWeirdLog)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function c() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function d() {
            var e;
            c() && (s().forEach(e => {
                !i().find(t => e.ev === t.ev) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, r("red", "im not fc", e.ev), Object(a.isWeirdLogging)() && o("im not fc", e.ev))
            }), i().forEach(e => {
                var t = s().find(t => t.ev === e.ev);
                t && t.warned && !e.warned && (e.warned = !0, r("red", "now fc like im", e.ev), Object(a.isWeirdLogging)() && o("now fc like im", e.ev))
            })), e = Date.now() - 3e4, window.lpBufferFc = i().filter(t => t.time > e), window.lpBufferIm = s().filter(t => t.time > e)
        }

        function u(e) {
            c() && (i().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 0)), r("green", "fc", ...e)
        }

        function m(e) {
            c() && (s().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 1100)), r("blue", "im", ...e)
        }
        window.longpollTesting_onImEvents = m
    },
    P13b: function(e, t, n) {
        "use strict";
        n.r(t);
        n("rE2o"), n("ioFf"), n("91GP"), n("Vd3H"), n("rGqo"), n("a1Th"), n("tUrg"), n("pIFo"), n("KKXr"), n("VRzm"), n("Btvt");
        var a = n("f01n"),
            r = n("h++7"),
            i = n("nyd8"),
            s = n("rHUl"),
            o = n("MhhX"),
            l = n("p3re"),
            c = n("eTng"),
            d = n("vT4u"),
            u = n("N1NS");

        function m(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var g = "_im_join_chat";

        function p(e, t) {
            var n = Object(u.createModule)({
                handlers: (n, r) => {
                    r(e, "click", g, e => (function(e, t) {
                        var n = domData(t, "chat-id"),
                            r = domData(t, "hash");
                        return lockButton(t), Object(d.joinChat)(n, r, e.get()).then(n => {
                            var r = m(n, 1)[0];
                            unlockButton(t), e.get().longpoll.push([Object(a.changePeer)(r)])
                        }).catch(e => {
                            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                        })
                    })(t, e.target))
                }
            });
            return {
                unmount() {
                    Object(u.destroyModule)(n)
                }
            }
        }
        var h = n("aong"),
            _ = n("86+7"),
            f = n("Wu9C"),
            b = n("wSs/"),
            v = n("ERyv"),
            y = n("lJdi"),
            O = n("t7n3");

        function E(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        n.d(t, "SENDING_CLASS", function() {
            return C
        }), n.d(t, "FAILED_CLASS", function() {
            return w
        }), n.d(t, "ORIGINAL_CLASS", function() {
            return j
        }), n.d(t, "RESTORE_CLASS", function() {
            return S
        }), n.d(t, "TYPING_CLASS", function() {
            return k
        }), n.d(t, "CREATE_CHAT_ACTION", function() {
            return T
        }), n.d(t, "CHAT_TITLE_ACTION", function() {
            return I
        }), n.d(t, "CHAT_INVITE_USER", function() {
            return M
        }), n.d(t, "CHAT_KICK_USER", function() {
            return A
        }), n.d(t, "CHAT_PHOTO_UPDATE", function() {
            return L
        }), n.d(t, "CHAT_PHOTO_REMOVE", function() {
            return P
        }), n.d(t, "CHAT_PIN_MESSAGE", function() {
            return D
        }), n.d(t, "CHAT_UNPIN_MESSAGE", function() {
            return x
        }), n.d(t, "CHAT_INVITE_BY_LINK", function() {
            return N
        }), n.d(t, "DESELECT_ALL_CLASS", function() {
            return R
        }), n.d(t, "HIDE_TOP_NOTICE_CLASS", function() {
            return B
        }), n.d(t, "HIDE_ASIDE_NOTICE_CLASS", function() {
            return F
        }), n.d(t, "HIDE_ASIDE_PROMO_BLOCK_CLASS", function() {
            return H
        }), n.d(t, "INSTALL_VKADMIN_LINK", function() {
            return U
        }), n.d(t, "CLEAR_RECENT_CLASS", function() {
            return G
        }), n.d(t, "TOGGLE_MR_TAB", function() {
            return q
        }), n.d(t, "MESSAGE_SEARCH_CLASS", function() {
            return $
        }), n.d(t, "PINNED_CONTAINER_CLASS", function() {
            return z
        }), n.d(t, "getClassicChatHeight", function() {
            return Ke
        }), n.d(t, "setClassicChatHeight", function() {
            return Ve
        }), n.d(t, "fixTableCellChildHeight", function() {
            return We
        }), n.d(t, "applyInnerHtml", function() {
            return Ye
        }), n.d(t, "compensateHistoryHeightChange", function() {
            return Qe
        }), n.d(t, "renderSticker", function() {
            return Xe
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
            return at
        }), n.d(t, "showInvisibleBar", function() {
            return rt
        }), n.d(t, "updateMessageInCache", function() {
            return it
        }), n.d(t, "editAndReplaceMessage", function() {
            return st
        }), n.d(t, "renderMessage", function() {
            return ot
        }), n.d(t, "renderMessageMedia", function() {
            return lt
        }), n.d(t, "ensureDomHasActions", function() {
            return ct
        }), n.d(t, "renderCallMessage", function() {
            return dt
        }), n.d(t, "appendToHistory", function() {
            return ut
        }), n.d(t, "restoreQueue", function() {
            return mt
        }), n.d(t, "markMessagesAsRead", function() {
            return gt
        }), n.d(t, "replaceAttaches", function() {
            return pt
        }), n.d(t, "isDuplicate", function() {
            return ht
        }), n.d(t, "isContactPeer", function() {
            return _t
        }), n.d(t, "isPeerActive", function() {
            return ft
        }), n.d(t, "isFvkcomgroup", function() {
            return bt
        }), n.d(t, "isTabLoaded", function() {
            return vt
        }), n.d(t, "isTabLoadedWithMessage", function() {
            return yt
        }), n.d(t, "parseMessage", function() {
            return wt
        }), n.d(t, "convertPeerToUrl", function() {
            return jt
        }), n.d(t, "unUrlPeer", function() {
            return St
        }), n.d(t, "simplifyCounter", function() {
            return kt
        }), n.d(t, "chatActions", function() {
            return Tt
        }), n.d(t, "renderPhotos", function() {
            return At
        }), n.d(t, "renderPhotosFromTab", function() {
            return Lt
        }), n.d(t, "renderBtnSearchOnlyMessages", function() {
            return Pt
        }), n.d(t, "renderMessagesSep", function() {
            return Dt
        }), n.d(t, "renderConversationsSep", function() {
            return xt
        }), n.d(t, "renderPopularSuggSep", function() {
            return Nt
        }), n.d(t, "renderClearRecent", function() {
            return Rt
        }), n.d(t, "renderPopularSuggestions", function() {
            return Bt
        }), n.d(t, "setMessageError", function() {
            return Ft
        }), n.d(t, "startResendMessage", function() {
            return Ht
        }), n.d(t, "removeMessages", function() {
            return Ut
        }), n.d(t, "removeStartingFromMessage", function() {
            return qt
        }), n.d(t, "removeMessagesWithRestore", function() {
            return $t
        }), n.d(t, "restoreMessage", function() {
            return zt
        }), n.d(t, "formatTyper", function() {
            return Kt
        }), n.d(t, "loadSummaryActivityType", function() {
            return Vt
        }), n.d(t, "renderEmptySearch", function() {
            return Yt
        }), n.d(t, "serviceLink", function() {
            return Qt
        }), n.d(t, "renderServiceMsg", function() {
            return Xt
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
            return an
        }), n.d(t, "checkSelectClick", function() {
            return rn
        }), n.d(t, "renderGoTo", function() {
            return sn
        }), n.d(t, "showFlushChat", function() {
            return on
        }), n.d(t, "showLeaveDialog", function() {
            return ln
        }), n.d(t, "showUnpinDialog", function() {
            return cn
        }), n.d(t, "showMsgDeleteDialog", function() {
            return dn
        }), n.d(t, "cleanHistory", function() {
            return un
        }), n.d(t, "inviteUser", function() {
            return mn
        }), n.d(t, "toggleMessageRequestsTab", function() {
            return gn
        }), n.d(t, "showUnreadOnly", function() {
            return pn
        }), n.d(t, "changeTab", function() {
            return hn
        }), n.d(t, "isImportant", function() {
            return _n
        }), n.d(t, "isUnrespond", function() {
            return fn
        }), n.d(t, "isPeerBlocked", function() {
            return bn
        }), n.d(t, "isPendingForward", function() {
            return vn
        }), n.d(t, "isPeerBlockedByMe", function() {
            return yn
        }), n.d(t, "blockLatencyCompensation", function() {
            return On
        }), n.d(t, "showSpamLayer", function() {
            return En
        }), n.d(t, "getLastSeenTextInHeader", function() {
            return Cn
        }), n.d(t, "getLastSeenText", function() {
            return wn
        }), n.d(t, "showBlacklistBoxUser", function() {
            return Sn
        }), n.d(t, "showBlacklistBox", function() {
            return kn
        }), n.d(t, "getBaseLink", function() {
            return Tn
        }), n.d(t, "showFavvedBox", function() {
            return In
        }), n.d(t, "isEditableFocused", function() {
            return Mn
        }), n.d(t, "updateStar", function() {
            return An
        }), n.d(t, "removewNewUnreadBarAndMerge", function() {
            return Ln
        }), n.d(t, "isMessagesVisible", function() {
            return Pn
        }), n.d(t, "hideTopNotice", function() {
            return Dn
        }), n.d(t, "hideAsideNotice", function() {
            return xn
        }), n.d(t, "hideAsidePromoBlock", function() {
            return Nn
        }), n.d(t, "installVKAdminApp", function() {
            return Rn
        }), n.d(t, "renderShortText", function() {
            return Fn
        }), n.d(t, "attachToText", function() {
            return Hn
        }), n.d(t, "lockButton", function() {
            return Un
        }), n.d(t, "unlockButton", function() {
            return Gn
        }), n.d(t, "renderPinnedMessage", function() {
            return qn
        }), n.d(t, "renderPinnedMedia", function() {
            return $n
        }), n.d(t, "showMessageInfoTooltip", function() {
            return zn
        }), n.d(t, "showEditTimeTooltip", function() {
            return Kn
        }), n.d(t, "getPinnedMessageHeight", function() {
            return Vn
        }), n.d(t, "boxHandleMessagesLabelsTooltips", function() {
            return Wn
        }), n.d(t, "showPinnedBox", function() {
            return Yn
        }), n.d(t, "showRepliedBox", function() {
            return Qn
        }), n.d(t, "isUserAliveInChat", function() {
            return Xn
        }), n.d(t, "getAliveMembersCount", function() {
            return Jn
        }), n.d(t, "normalizeTab", function() {
            return Zn
        }), n.d(t, "normalizeTabsGotFromServer", function() {
            return ea
        }), n.d(t, "splitMessageToParts", function() {
            return ta
        }), n.d(t, "isMessageTooLong", function() {
            return na
        }), n.d(t, "showInvitationBox", function() {
            return aa
        }), n.d(t, "showWaitUntilUploadedBox", function() {
            return ra
        }), n.d(t, "canMessageBeDeletedForAll", function() {
            return ia
        }), n.d(t, "getTopChatMembers", function() {
            return sa
        }), n.d(t, "getChatMembersByIds", function() {
            return oa
        }), n.d(t, "getChatMembers", function() {
            return la
        }), n.d(t, "formatTimespan", function() {
            return ca
        }), n.d(t, "focusOnMessage", function() {
            return da
        }), n.d(t, "getNowEditingMessage", function() {
            return ua
        }), n.d(t, "checkMessageRequestsTab", function() {
            return ma
        }), n.d(t, "updateMessageRequestsCounterInDOM", function() {
            return ga
        }), n.d(t, "getFirstUnread", function() {
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
        }), n.d(t, "tabIsMessageRequest", function() {
            return s.tabIsMessageRequest
        }), n.d(t, "removeMessageRequestFolderFlags", function() {
            return s.removeMessageRequestFolderFlags
        }), n.d(t, "isMessageRequestFolder", function() {
            return s.isMessageRequestFolder
        }), n.d(t, "tabIsOutgoingMessageRequest", function() {
            return s.tabIsOutgoingMessageRequest
        }), n.d(t, "existsIncomingMessageRequest", function() {
            return s.existsIncomingMessageRequest
        }), n.d(t, "isMessageRequestChangedEvent", function() {
            return s.isMessageRequestChangedEvent
        }), n.d(t, "isChatPeer", function() {
            return c.isChatPeer
        }), n.d(t, "isUserPeer", function() {
            return c.isUserPeer
        }), n.d(t, "isReservedPeer", function() {
            return c.isReservedPeer
        });
        var C = "_im_mess_sending",
            w = "_im_mess_failed",
            j = "_im_mess_original",
            S = "_im_mess_restore",
            k = "_im_typing",
            T = "chat_create",
            I = "chat_title_update",
            M = "chat_invite_user",
            A = "chat_kick_user",
            L = "chat_photo_update",
            P = "chat_photo_remove",
            D = "chat_pin_message",
            x = "chat_unpin_message",
            N = "chat_invite_user_by_link",
            R = "_im_deselect_all",
            B = "_im_top_notice_hide",
            F = "_im_aside_notice_hide",
            H = "_im_aside_promo_block_hide",
            U = "_im_vkadmin_promo_link",
            G = "_im_clear_recent",
            q = "_im_toggle_mr_tab",
            $ = "_im_mess_search",
            z = "_im_pinned",
            K = window,
            V = K.vk,
            W = K.ls,
            Y = K.se,
            Q = K.re,
            X = K.rs,
            J = K.sech,
            Z = K.inArray,
            ee = K.intval,
            te = K.trim,
            ne = K.stripHTML,
            ae = K.domFC,
            re = K.domPS,
            ie = K.domLC,
            se = K.domChildren,
            oe = K.domClosestSibling,
            le = K.domData,
            ce = K.geByClass,
            de = K.geByClass1,
            ue = K.gpeByClass,
            me = K.addClass,
            ge = K.removeClass,
            pe = K.toggleClass,
            he = K.hasClass,
            _e = K.attr,
            fe = K.setStyle,
            be = K.val,
            ve = K.getTemplate,
            ye = K.getLang,
            Oe = K.langSex,
            Ee = K.langDate,
            Ce = K.langNumeric,
            we = K.getDateText,
            je = K.getSmDate,
            Se = K.getShortDate,
            ke = K.isSameDate,
            Te = K.isToday,
            Ie = K.ajax,
            Me = K.showBox,
            Ae = K.showFastBox,
            Le = K.showTabbedBox,
            Pe = K.showTooltip,
            De = K.mobPlatforms,
            xe = K.onlinePlatformClass,
            Ne = K.AudioMessagePlayer,
            Re = K.Emoji,
            Be = K.slideUp,
            Fe = K.fadeOut,
            He = K.cancelEvent,
            Ue = 4096,
            Ge = 100,
            qe = 8,
            $e = 52,
            ze = "chatPosition";

        function Ke() {
            return W.get(ze) || 0
        }

        function Ve(e) {
            e >= window.clientHeight() - 30 && (e = 0), W.set(ze, e)
        }

        function We(e, t) {
            var n = de(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && fe(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Ye(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Qe(e, t, n, a) {
            var r = t && !n ? 1 : !t && n ? -1 : 0;
            r && !Object(s.isClassicInterface)(e) && a().compensateHistoryHeightChange(r)
        }

        function Xe(e, t, n, a) {
            var r = window.devicePixelRatio >= 2 ? "256" : "128",
                i = "animation" === n,
                s = "im_gift";
            i && (s += " sticker_img");
            var o = `<img height="128" class="${s}" src="${Stickers.getStickerUrl(ee(e),r)}"/>`;
            if (i) {
                var l = "animatedSticker" + a;
                o = `<div id="${l}" data-loop-count=3 data-animation-path="${"/stickers.php?act=proxy_animation&product_id="+t+"&sticker_id="+e}" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="${a}" data-sticker-id="${ee(e)}" class="sticker_animation sticker_animation_128 im_gift">${o}</div>`;
                var c = !1;
                browser.msie ? (0 ^ a) === a && (c = !0) : c = Number.isInteger(a), c && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(l, 10)
            }
            return t && (o = `<a onmouseover="return Emoji.stickerOver(${ee(e)}, this);"\n        onclick="return Emoji.clickSticker(${ee(t)}, this, event);">${o}</a>`), o = `<div class="im_sticker_row">${o}</div>`
        }

        function Je(e, t, n) {
            var a = e.get ? e.get() : e;
            if (vt(a, t)) {
                var r = a.tabs[t].deleted || [];
                return Z(n, r)
            }
            return !1
        }

        function Ze(e, t, n) {
            var a = n.randomId,
                r = de(`_im_mess_rid${a}`, t);
            return r && (t = ut(e, n, t = Gt([r], t), !0, !1)), t
        }

        function et(e) {
            var t = Object(s.checkVoiceMessageAvailable)(e);
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
                preloader: X(V.pr_tpl, {
                    id: ""
                }),
                cls: `im-preloader_attach im-preloader_visible im-preloader_${e}`
            })
        }

        function at(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function rt(e) {
            var t = de("_im_invisible_bar", e);
            t && (ge(t, "_im_invisible_bar"), ge(t, "im-page--history-new-bar_hide"))
        }

        function it(e, t, n) {
            var a = le(n, "msgid"),
                r = de(`_im_mess_${a}`, t),
                i = n.cloneNode(!0);
            return r && (r.parentNode.replaceChild(i, r), ct(t)), t
        }

        function st(e, t, n) {
            var a = ot(e, t),
                r = de(`_im_mess_${t.messageId}`, n);
            return r && (r.parentNode.replaceChild(Y(a), r), ct(n)), n
        }

        function ot(e, t) {
            var n = [],
                a = Object(o.isUnread)(e.tabs[t.peerId], t),
                r = Object(o.isCallMessage)(t),
                i = Object(o.hasReply)(t) ? ve("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: nt("reply"),
                    text: ""
                }) : "";
            r || n.push("_im_mess"), Object(o.isOut)(t) && a && !r && n.push("im-mess_unread _im_mess_unread"), Object(o.isOut)(t) && !r && n.push("im-mess_out"), Object(o.wasEdited)(t) && n.push("im-mess_was_edited"), Object(b.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), Object(o.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var d = Date.now() - 1e3 * t.date > 1e3;
            t.local && d && n.push("im-mess_sending"), t.local && n.push(`${C}`), t.local && Object(o.wasEdited)(t) && !a && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push(`im-mess_failed ${w}`), Object(o.isGift)(t) && n.push("im-mess_gift"), r && n.push("_im_mess_callsnippet");
            var u = lt(t),
                m = function(e, t) {
                    var n = "",
                        a = Object(h.unpackStore)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(o.wasEdited)(t) && (n += ve("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(s.isCommunityInterface)(e) && a) {
                        var r = t.kludges.ref_source,
                            i = {};
                        try {
                            (i = JSON.parse(Object(O.unclean)(r))).link && i.info && (i.link = Object(l.replaceHyperLinks)(Object(O.clean)(i.link), l.linksReplacer.bind(null, !1)), i = Object(O.clean)(langStr(ye("mail_source_info"), "link", i.link, "info", Object(O.clean)(i.info))), n += ve("sImLblWasSourceInfo", {
                                source: i
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                g = i + wt(e, t.text, t.kludges, !1, t.peerId);
            t.subject && "..." !== t.subject.trim() && !Object(c.isChatPeer)(t.peerId) && (g = ve("im_topic", {
                topic: t.subject
            }) + g);
            var p = Object(o.isGift)(t) ? `<div class="im-mess--gift-lbl">${g}</div>` : "",
                _ = u.length ? ve("im_message_media", {
                    type: "media",
                    messageId: t.messageId,
                    attaches: u.join(""),
                    text: p
                }) : "";
            return Object(o.isGift)(t) || (_ = g + _), Object(o.isCallMessage)(t) && (_ += ve("sImCallSnippet", dt(t, !1, !0, e))), _ += m, ve("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? `aria-label="${ye("mail_send_message_error")}" role="link"` : "",
                unread_params: a ? `aria-label="${ye("mail_unread_message")}"` : "",
                cls: n.join(" ")
            }).replace("%text%", () => _)
        }

        function lt(e) {
            return e.attaches.reduce((t, n) => !Object(o.hasReply)(e) || "mail" !== n.type && "reply" !== n.type ? "call" === n.type ? t : ("sticker" === n.type ? e.messageId ? t.push(Xe(n.id, n.productId, n.kind, e.messageId)) : t.push(Xe(n.id, n.productId)) : t.push(nt(n.type)), t) : t, [])
        }

        function ct(e) {
            for (var t = e.querySelectorAll("._im_mess_noa:not(._im_mess_callsnippet)"), n = t.length; n--;) he(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", ve("sImHistoryRowActions")), ge(t[n], "_im_mess_noa")
        }

        function dt(e, t, n, a) {
            var r, i, s, o, l, c, d = V.id,
                u = e.attaches[0],
                m = u.initiatorId,
                g = u.state,
                p = u.receiverId,
                h = d === m,
                f = Boolean(u.video),
                b = {
                    title: "",
                    description: "",
                    modifier: ""
                };
            switch (g) {
                case "reached":
                    var v = t ? "" : (i = u.duration, s = Math.floor(i / 3600), o = Math.floor(i / 60) - 60 * s, l = !1, c = !1, [s, o, i - 3600 * s - 60 * o].reduce((e, t) => {
                        if (0 === t && !c) return c = !0, e;
                        l && (t = t < 10 ? "0" + t : t);
                        var n = `${e}${""!==e?":":""}${t}`;
                        return l = !0, c = !0, n
                    }, ""));
                    r = (r = ye(h ? "mail_call_outgoing" : "mail_call_incoming")).replace("{duration}", v), b.title = ye(h ? "mail_call_snippet_outgoing" : "mail_call_snippet_incoming"), b.description = v;
                    break;
                case "canceled_by_initiator":
                    h ? (r = ye("mail_call_canceled"), b = {
                        title: ye("mail_call_snippet_outgoing"),
                        description: ve("sImCallSnippetCanceled", {
                            text: ye("mail_call_snippet_canceled")
                        })
                    }) : (r = ye("mail_call_missed"), b = {
                        title: ye("mail_call_snippet_missed_call"),
                        description: ve("sImCallSnippetDMLink")
                    });
                    break;
                case "canceled_by_receiver":
                    if (h) {
                        if (t) return ye("mail_call_declined");
                        var y = Object(_.oCacheGet)(a, p);
                        r = y ? Oe(y.sex, ye("mail_call_declined_by", "raw")).replace("{user_name}", y.first_name) : ye("mail_call_declined"), b = {
                            title: ye("mail_call_snippet_outgoing"),
                            description: ve("sImCallSnippetCanceled", {
                                text: ye("mail_call_snippet_declined")
                            })
                        }
                    } else r = ye("mail_call_canceled"), b = {
                        title: ye("mail_call_snippet_incoming"),
                        description: ve("sImCallSnippetCanceled", {
                            text: ye("mail_call_snippet_canceled")
                        })
                    };
                    break;
                default:
                    r = ye("mail_added_call"), b.title = ye("mail_added_call")
            }
            return f && (b.modifier = "im-call-snippet_video"), n ? b : ve("im_calls_link", {
                text: r
            })
        }

        function ut(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                r = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                i = Date.now() - 1e3 * t.date > 1e3,
                l = e.tabs[t.peerId];
            if (!n || de("_im_mess", n) || de("_im_bar_date", n) || (n.innerHTML = ""), l.skipped > 0) return n;
            var d = [];
            t.local || (d = e.imQueue(t.peerId, a)), d.length > 0 && Gt(d.map(e => de("_im_mess_rid" + e.rid, n), n).filter(e => e));
            var u = ot(e, t),
                m = ie(n);
            he(m, "_im_mess_stack") || (m = oe(m, "._im_mess_stack", -1));
            for (var g = Object(s.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && g && !de("_im_mess_" + g.messageId);) g = Object(s.getLastMessage)(e, t.peerId, g.messageId);
            var p = de("_im_unread_bar_row", n),
                f = Object(o.getUserId)(t),
                b = g ? Ot(g.date, e) : 0;
            if (!g || Et(l, g, t, e, r)) {
                var v = "",
                    y = !1;
                if (p && Object(o.isOut)(t) && Ln(e, n, t.peerId), 1 === l.unread && !Object(o.isOut)(t) && r && (v += ve("im_mess_bar", {}), y = !0, Ln(e, n, t.peerId)), !Te(new Date(b))) {
                    var O = new Date,
                        E = y ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += ve("im_day_bar", {
                        day: Se(t.date, e.timeshift, !0, ye("months_of", "raw"), !0),
                        date: t.date,
                        day_class: O.getDate() + O.getMonth() + O.getFullYear() + " " + E
                    })
                }
                if (Object(o.isServiceMsg)(t)) v += ve("im_service_row", {
                    text: Xt(e, t, l),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var w = e.gid && Object(o.isOut)(t) ? ee(t.kludges.from_admin) || -e.gid : 0,
                        j = Object(_.oCacheGet)(e, w ? -e.gid : f) || l,
                        S = Object(c.isChatPeer)(t.peerId) ? j.name : j.first_name,
                        k = j.link || l.href,
                        T = ve("im_mess_stack_name", {
                            name: S,
                            link: k,
                            class: Object(o.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(o.isGift)(t)) {
                        var I = ye("mail_gift_message_sent", "raw");
                        T += ` <span class="im-mess-stack--gift">${Oe(j.sex||0,I)}</span>`
                    }
                    if (Object(o.isMoney)(t)) {
                        var M = Object(o.isMoneyRequest)(t) ? ye("mail_money_request_message_sent", "raw") : ye("mail_money_tranfer_message_sent", "raw");
                        T += ` <span class="im-mess-stack--money-transfer">${Oe(j.sex||0,M)}</span>`
                    }
                    var A, L = e.gid ? "/gim" + e.gid : "/im";
                    if (A = t.local ? Ct(t.date, e.timeshift) : ve("im_stack_date", {
                            date: Ct(t.date, e.timeshift),
                            link: `${L}?sel=${t.peerId}&msgid=${t.messageId}`
                        }), w && e.admins[w]) {
                        var P = e.admins[w],
                            D = w === V.id ? ye("mail_by_you") : P[0];
                        A = A + " " + ve("im_admin_link", {
                            name: D,
                            href: P[1]
                        })
                    }
                    v += ve("im_mess_stack", {
                        photo: j.photo,
                        href: k,
                        cls: "",
                        date_attr: "",
                        link: `/im?sel=${t.peerId}&msgid=${t.messageId}`,
                        name: ne(T),
                        stack_name: T,
                        peerId: f,
                        date: A,
                        messages: u,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(h.toArray)(J(v)).forEach(e => n && n.appendChild(e))
            } else p && e.peer === t.peerId && !l.inplaceSearch && Object(o.isOut)(t) && Ln(e, n, t.peerId), de("_im_stack_messages", m).appendChild(Y(u));
            return Object(o.isOut)(t) && !i && setTimeout(() => {
                var e = de("_im_mess_" + t.messageId, n);
                he(e, C) && me(e, "im-mess_sending")
            }, 500), d = d.filter(e => e.rid !== t.randomId), ct(n), mt(d, e, n)
        }

        function mt(e, t, n) {
            var a;
            return (a = "object" == typeof e ? e : t.imQueue(e, !1)).length > 0 && a.map(e => (e.mess.failed = !!e.failed, e.mess)).filter(e => Object(s.getMessage)(t, e.peerId, e.messageId)).forEach(e => ut(t, e, n, !1)), n
        }

        function gt(e, t, n) {
            var a = e.tabs[t];
            return Object(h.toArray)(ce("_im_mess_unread", n)).forEach(e => {
                var t = ee(le(e, "msgid"));
                t > 0 && a.out_up_to >= t && (ge(e, "_im_mess_unread"), ge(e, "im-mess_unread"), function(e) {
                    var t = de("_im_mess_blind_unread_marker", e);
                    t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
                }(e))
            }), n
        }

        function pt(e, t, n) {
            var a = t.peerId,
                r = t.messageId,
                i = de("_im_msg_reply" + r, e),
                s = de("_im_msg_media" + r, e),
                o = n.tabs[a].mediacontent[r][0];
            return i && (i.innerHTML = o[0]), s && (s.innerHTML = o[1]), e
        }

        function ht(e, t) {
            if (!Object(s.isFullyLoadedTab)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function _t(e) {
            return e > 19e8 && e < 2e9
        }

        function ft(e, t) {
            return e === t.peer
        }

        function bt(e, t) {
            return Object(y.doesChatTabHaveFlag)(Object(s.getTab)(e, t), 1024)
        }

        function vt(e, t) {
            return !!e.tabs[t]
        }

        function yt(e, t) {
            return !!vt(e, t) && null !== e.tabs[t].lastmsg
        }

        function Ot(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function Et(e, t, n, a, r) {
            if (Object(o.getUserId)(t) !== Object(o.getUserId)(n)) return !0;
            var i = Ot(t.date, a),
                l = Ot(n.date, a);
            return !ke(i, l) || (!(!Object(s.isCommunityInterface)(a) || ee(t.kludges.from_admin) === ee(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(o.isServiceMsg)(t) && !Object(o.isServiceMsg)(n)) || (!(!Object(o.isCallMessage)(n) && !Object(o.isCallMessage)(t)) || (!(!Object(o.isGift)(t) && !Object(o.isGift)(n)) || (!(!Object(o.isGraffiti)(t) && !Object(o.isGraffiti)(n)) || (!!Object(o.hasReply)(n) || !(Object(o.isUnread)(e, t) === Object(o.isUnread)(e, n) || !r || Object(o.isOut)(n) || en(n.peerId, a.gid)))))))))
        }

        function Ct(e, t) {
            return Ee(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function wt(e, t, n) {
            var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = Math.round(1e9 * Math.random()).toString(16),
                o = {},
                c = 0;
            return t = (t = Object(l.replaceHyperLinks)(t || "", l.linksReplacer.bind(null, a))).replace(/(<a.+?<\/a>)/gi, e => {
                var t = `!link_${c}_${i}!`;
                return o[t] = e, c++, t
            }), t = Object(l.replaceMentions)(t), t = Object(l.replaceEmailLinks)(t), t = Object(l.replaceHashtags)(t, t => {
                var n = Object(s.getGroupId)(e);
                return `<a href="/${n?"gim"+n:"im"}?sel=${r||Object(s.getPeer)(e)}&st=${encodeURIComponent(t)}">${t}</a>`
            }), Object.keys(o).forEach(e => {
                t = t.replace(e, () => o[e])
            }), n.emoji && (t = Re.emojiToHTML(t, !0)), t
        }

        function jt(e) {
            return Object(c.isChatPeer)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : _t(e) ? "mr" + (e - 19e8) : e
        }

        function St(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - ee(e.substr(1));
                case "c":
                    return 2e9 + ee(e.substr(1));
                default:
                    return ee(e)
            }
        }

        function kt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function Tt(e, t) {
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

        function Mt(e, t) {
            var n = `<img src="${e}" alt="" class="dialogs_inline_chatter"/>`;
            return t && (n = ve("im_dialogs_link", {
                href: t,
                photo: n
            })), `<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ${n}\n    </div>\n  </div>`
        }

        function At(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return `<div class="im_grid"><img src="${e}" alt=""/></div>`;
            switch (e.length) {
                case 1:
                    return `<div class="im_grid"><img src="${e[0]}" alt=""/></div>`;
                case 2:
                    return e.map((e, n) => It(e, t[n])).join("");
                case 3:
                    return It(e[0], t[0]) + e.slice(1).map((e, n) => Mt(e, t[n + 1])).join("");
                case 4:
                    return e.map((e, n) => Mt(e, t[n])).join("")
            }
        }

        function Lt(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return `<div class="im_grid"><img src="${t.photo}" alt=""></div>`;
            if (Object(c.isChatPeer)(t.peerId) && t.membersCount < 2) return `<div class="im_grid"><img src="${e.get().default_chat_photo}" alt=""></div>`;
            if (Array.isArray(t.photo)) return At(t.photo);
            var a = t.data.active.slice(0, 4).map(_.oCacheGet.bind(null, e));
            return At(a.map(e => e.photo), n ? [] : a.map(e => e.link))
        }

        function Pt(e) {
            var t = e.get().gid ? ye("mail_search_only_messages_comm") : ye("mail_search_only_messages");
            return `<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ${$}">\n      <button type="button" class="im-i--messages-search"></button>${t}\n    </div>\n  </li>`
        }

        function Dt() {
            return `<li class="im-search-results-head">${ye("mail_search_messages")}</li>`
        }

        function xt() {
            return `<li class="im-search-results-head">${ye("mail_search_conversations_sep")}</li>`
        }

        function Nt() {
            return `<li class="im-search-results-head">${ye("mail_search_dialogs_sep")}</li>`
        }

        function Rt() {
            return `<li class="im-search-results-head _im_recent_bar">\n    ${ye("mail_recent_searches")}\n    <button type="button" class="${G} im-page--clear-recent">${ye("mail_clear_recent")}</button>\n  </li>`
        }

        function Bt(e) {
            var t = e.get().popular_sugg,
                n = Object(s.isClassicInterface)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(t => {
                var n = t.peerId,
                    a = Object(_.oCacheGet)(e, n) || t,
                    r = e.get().tabs[n] || t,
                    i = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return `<div class="${["im-popular--item","fl_l","_im_dialog","_dont_add_recent","_im_sugg_"+n,r.unread>0&&"sugg-is_unread",i&&"sugg-is_muted"].filter(e=>!!e).join(" ")}" data-peer="${n}">\n    <a class="im-popular--avatar-w ${xe(r.online)}" href="${a.link}"><img class="im-popular--avatar" src="${a.photo}"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="${a.link}">${a.first_name||a.name}</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">${kt(r.unread)}</span>\n</div>`
            }).join("") + "</li>"
        }

        function Ft(e, t, n) {
            var a = de("_im_mess_" + t.messageId, n);
            if (a) {
                _e(a, "aria-hidden", "false"), me(a, `im-mess_failed ${w}`);
                var r = de("_im_mess_marker", a);
                _e(r, "aria-label", ye("mail_send_message_error")), _e(r, "role", "link")
            }
            return n
        }

        function Ht(e, t, n) {
            var a = de("_im_mess_" + t, n);
            if (a) {
                ge(a, "im-mess_failed"), _e(a, "aria-hidden", "true"), ge(a, w);
                var r = de("_im_mess_marker", a);
                _e(r, "aria-label", ""), _e(r, "role", "")
            }
            return n
        }

        function Ut(e, t) {
            return Gt(e.map(e => de("_im_mess_" + e, t)).filter(e => e), t)
        }

        function Gt(e, t) {
            var n = e.filter(e => !he(e, "im-mess_srv")).map(e => e.parentNode);
            return e.forEach(e => {
                he(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(e => 0 === se(e).length).map(e => ue("_im_mess_stack", e)).forEach(e => {
                he(re(e), "_im_bar_date") && Q(re(e)), he(re(e), "_im_unread_bar_row") && Q(re(e)), Q(e)
            }), t
        }

        function qt(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    he(n, "mess_srv") && (t = n.parentNode);
                    var a = ue("_im_mess_stack", n);
                    a && (t = a.previousElementSibling, 1 === se(n.parentNode).length && a.parentNode.removeChild(a))
                }
                he(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function $t(e, t, n, a) {
            return e.map(e => de("_im_mess_" + e, a)).filter(e => e).forEach(e => {
                be(e, function(e, t, n) {
                    var a = t.innerHTML;
                    return `<div class="im-mess--text">\n    ${ye("delete"===n?"mail_deleted_stop":"mail_marked_as_spam")} <button type="button" data-peer="${e}" class="${S} im-mess--btn">${ye("mail_restore")}</button>\n    <div class="${j} im-mess--original">${a}</div>\n  </div>`
                }(t, e, n)), me(e, "im-mess_light")
            }), a
        }

        function zt(e, t, n) {
            var a = de("_im_mess_" + e, n);
            if (a) {
                var r = de(j, a);
                be(a, r.innerHTML), ge(a, "im-mess_light")
            }
            return n
        }

        function Kt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments.length > 1 ? arguments[1] : void 0,
                n = arguments.length > 2 ? arguments[2] : void 0,
                a = arguments.length > 3 ? arguments[3] : void 0,
                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Wt(e, t, n, a, !0, r);
            var i = Wt(e, t, n, a, !1, r);
            return i.length > 60 ? Wt(e, t, n, a, !0, r) : i
        }

        function Vt(e) {
            var t = {
                    [d.ACTIVITY_TYPE_TYPING]: 1,
                    [d.ACTIVITY_TYPE_RECORDING_AUDIO]: 2
                },
                n = Object.keys(e).sort((e, n) => t[n] - t[e]),
                a = {},
                r = n.reduce((t, n) => {
                    var r = (e[n] || {}).userIds;
                    return (void 0 === r ? [] : r).forEach(e => {
                        a[e] || (a[e] = !0, t[n] = !0)
                    }), t
                }, {}),
                i = n.filter(e => !!r[e]);
            return i.length > 1 ? "" : i[0]
        }

        function Wt(e, t, n, a, r, i) {
            var o = function(e, t, n) {
                var a = [],
                    r = {};
                return Object.keys(t).map(n => {
                    ((t[n] || {}).userIds || []).forEach(t => {
                        Object(_.oCacheExists)(e, t) ? parseInt(t, 10) !== e.id && (r[t] = n) : a.push(t)
                    })
                }), a.length && Object(d.loadChatMember)({
                    [n]: a
                }, e), Object.keys(r).sort((e, n) => t[r[e]].ts - t[r[n]].ts)
            }(a, e, t);
            if (0 === o.length) return "";
            var l = Object(c.isUserPeer)(t) || Object(s.isCommunityPeer)(t) ? "first_name" : r ? "short_name" : "name",
                u = Vt(e),
                m = "";
            u === d.ACTIVITY_TYPE_RECORDING_AUDIO ? m = ye("mail_recording_audio_several", o.length) : u === d.ACTIVITY_TYPE_TYPING && (m = ye("mail_typing_several", o.length));
            var g = o.slice(0, Math.min(o.length - 1, i)),
                p = g.map(e => Object(_.oCacheGet)(a, e)[l]).join(", ");
            if (o.length > i + 1) {
                var h = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(n => {
                        var a = e[n].userIds;
                        (void 0 === a ? [] : a).forEach(e => {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                p += " " + ye("mail_and_peer").replace("{count}", h - i).replace("{typing}", m)
            } else {
                if (o.length > 1 && (p += ` ${ye("mail_and_peer_one")}`), !Object(c.isChatPeer)(t) && n) p += ` ${m}`;
                else p += ` ${Object(_.oCacheGet)(a,o[g.length])[l]} ${m}`
            }
            return p.trim()
        }

        function Yt() {
            return `<div class="im-page--chat-search-empty">\n    ${ye("mail_im_search_empty")}\n  </div>`
        }

        function Qt(e, t, n) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? `<a class="im_srv_lnk ${a}" target="_blank" rel="noopener" href="${e}">${t}</a>` : `<span class="${a}">${t}</span>`
        }

        function Xt(e, t, n) {
            var a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                r = t.kludges,
                i = r.source_act,
                s = ee(r.source_mid),
                o = t.userId,
                l = Object(_.oCacheGet)(e, o),
                c = "",
                d = o === s;
            switch (i) {
                case T:
                    c = "mail_im_chat_created";
                    break;
                case I:
                    c = r.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case M:
                    c = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case A:
                    c = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case L:
                    c = "mail_im_photo_set";
                    break;
                case P:
                    c = r.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case D:
                    c = r.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case x:
                    c = r.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case N:
                    c = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (c = (c = Oe(l.sex, ye(c, "raw"))).replace("{from}", Qt(l.link, l.name, a)), s && s !== o) {
                var u = r.source_email;
                if (u) c = c.replace("{user}", Qt(`/im?email=${encodeURIComponent(u)}`, "email", a));
                else {
                    var m = Object(_.oCacheGet)(e, s),
                        g = i === A ? m.inv_name : m.kick_name;
                    c = c.replace("{user}", Qt(m.link, g, a))
                }
            }
            if (r.source_text) {
                var p = r.source_old_text ? `«<b class="im_srv_lnk">${r.source_old_text}</b>» &rarr; ` : "";
                c = c.replace("{title}", p + `«<b class="im_srv_lnk">${r.source_text}</b>»`)
            }
            if (r.source_act === D || r.source_act === x)
                if (r.source_message) {
                    var h = Qt("", Zt(Re.emojiToHTML(ne(r.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    c = c.replace("{msg}", h)
                } else c = c.replace(/{link}(.+){\/link}/i, (e, t) => Qt("", t, !1, "im_srv_mess_link"));
            return c
        }

        function Jt(e, t, n, a) {
            if (t === L) {
                var r = de("_im_mess_" + e.messageId, a);
                if (r) {
                    var i = n.tabs[e.peerId];
                    r.parentNode.innerHTML = ve("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Xt(n, e, i) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return a
        }

        function Zt(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(r.MENTION_RAW, "$1$4")
        }

        function en(e, t) {
            return !t && e === V.id
        }

        function tn(e, t) {
            return Pe(e, {
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
                    a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    r = Y(ve("im_preloader", {
                        preloader: X(V.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", a].join(" ")
                    })),
                    i = !1;

                function s() {
                    i = !0, ge(r, "im-preloader_visible"), r.parentNode && r.parentNode.removeChild(r)
                }
                setTimeout(() => {
                    i || ("bottom" === n ? e.appendChild(r) : e.insertBefore(r, ae(e)), me(r, "im-preloader_visible"))
                }, 0), t.then(s).catch(e => {
                    Object(v.imWeirdCatch)("wrapLoading", e), s()
                })
            }
        }

        function an(e, t) {
            return {
                0: {
                    msgs: e.reduce((e, t) => (e[t] = [t, a.FLAG_IMPORTANT, 0, 0, "", {}, {}, 0, 0, 0], e), {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function rn(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                a = qe,
                r = !1,
                i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || he(n, "_im_no_select") || he(n, "im_msg_media_link") || "IMG" == n.tagName && !he(n, "_im_graffiti") && !he(n, "emoji") && !he(n, "emoji_css") && !he(n, "im_gift") || "TEXTAREA" == n.tagName || he(n, "play_new") || he(n, "videoplayer") || (r = i.test(n.className))) break
            } while (a-- && (n = n.parentNode));
            return !r || !!te((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function sn(e, t) {
            return `<div class="im-mess--text">\n      <span>${ye("mail_restored")}</span>\n      <a class="_im_go_to" href="/im?sel=${jt(e)}&msgid=${t}">${ye("mail_im_goto_conversation")}</a>\n    </div>`
        }

        function on(e, t, n) {
            var a = ye("mail_deleteall1"),
                r = ye("mail_sure_to_delete_all"),
                i = ye("mail_delete");
            return Object(c.isChatPeer)(t) && (Object(y.doesChatTabHaveFlag)(e, 1024) ? (a = ye("mail_leave_channel"), r = ye("mail_unfollow_channel_confirmation"), i = ye("mail_unfollow_channel")) : r = ye("mail_chat_sure_to_delete_all")), Object(s.isCommunityPeer)(t) && (r = ye("mail_group_sure_to_delete_all")), Ae(a, r, i, n, ye("global_cancel"))
        }

        function ln(e, t, n) {
            var a = Object(s.getTab)(e, t),
                r = Object(c.isChatPeer)(t),
                i = r && Object(y.doesChatTabHaveFlag)(a, 1024),
                o = ye("mail_deleteall1"),
                l = ye("mail_sure_to_delete_all"),
                d = ye("mail_delete");
            if (r) {
                if (a.data.closed || a.data.kicked) return on(a, t, n.bind(null, !0));
                i ? (o = ye("mail_leave_channel"), l = ye("mail_vkcomgroup_leave_confirm"), d = ye("mail_leave_channel")) : (o = ye("mail_leave_chat"), l = ye("mail_chat_leave_confirm"), d = ye("mail_leave_chat"))
            }
            Object(s.isCommunityPeer)(t) && (l = ye("mail_group_sure_to_delete_all"));
            var u = new MessageBox({
                title: o,
                width: i ? 450 : 500
            }).content(l).setButtons(d, () => n(!!isChecked(de("_check_is_delete")) || !r), ye("global_cancel")).show();
            return r && !i && u.setControlsText(`<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">${ye("mail_deleteall1")}</div>`), u
        }

        function cn(e) {
            return Ae(ye("mail_unpin_title"), ye("mail_unpin_text"), ye("mail_unpin"), e, ye("global_cancel"))
        }

        function dn(e, t, n, a) {
            var r = ye("mail_dialog_msg_delete_N", t),
                i = Ae(ye("mail_dialog_msg_delete_title"), r, ye("mail_delete"), () => a(isChecked(de("_check_forall"))), ye("global_cancel")),
                s = "",
                o = !1;
            return n && (s = `<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">${ye("mail_delete_for_all")}</div>`, o = cur.imDb.selectByKey("del_forall_checked")), i.setControlsText(s), o && checkbox(de("_check_forall")), i
        }

        function un(e, t, n, a, r) {
            t.showProgress(), e.set(a.bind(null, r)).then(() => {
                t.hideProgress(), t.hide(), n().removePeer(e, r), n().updateDialogFilters(e)
            })
        }

        function mn(e, t, n, a) {
            var r = e.get().tabs[t].memberIds;
            e.set(a.bind(null, "add_member", r)).then(n().showCreation)
        }

        function gn(e, t, n) {
            var a = e.get();
            if (a.active_tab === r.FOLDER_ALL && 0 === a.dialog_tab_cts.mr) return !1;
            var i = a.active_tab === r.FOLDER_MESSAGE_REQUEST ? r.FOLDER_ALL : r.FOLDER_MESSAGE_REQUEST;
            return e.set(n.bind(null, i)).then(e => {
                t().restoreDialogs(e, !0)
            })
        }

        function pn(e, t, n) {
            if (e.get().active_tab === r.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
            var a = e.get().active_tab === r.FOLDER_UNREAD ? r.FOLDER_ALL : r.FOLDER_UNREAD;
            return e.set(n.bind(null, a)).then(e => {
                t().restoreDialogs(e, !0)
            })
        }

        function hn(e, t, n, a) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var r = Object(s.isReversedDialogs)(t);
            return t.set(a.bind(null, e)).then(e => (n().restoreDialogs(e, !0, r !== Object(s.isReversedDialogs)(e)), e))
        }

        function _n(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return r.FOLDER_MASKS[r.FOLDER_IMPORTANT] & n.folders
        }

        function fn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(s.isFoldersAvailable)(e)) return !1;
            var a = n || e.get().tabs[t];
            return r.FOLDER_MASKS[r.FOLDER_UNRESPOND] & a.folders
        }

        function bn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function vn(e) {
            return null != e.get().pendingForward
        }

        function yn(e, t) {
            return (t.get().block_states[e] || {}).who === V.id
        }

        function On(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(r => {
                n[r].time ? !1 === n[r].free && Date.now() - n[r].time >= 5e4 && t.push([a.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
            })
        }

        function En(e, t, n) {
            var a;
            return !Le("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: (n, r) => {
                    r && (a = t(n, e, r))
                },
                params: {
                    width: 638,
                    onHide: () => {
                        Ne.loaded && Ne.detachPlayer(!0), a.unmount()
                    }
                }
            }, n)
        }

        function Cn(e, t) {
            return wn(e.get(), t, Object(s.getTab)(e, t).last_seen)
        }

        function wn(e, t, n, a) {
            if (n[0]) return ye("mail_header_online_status") + (De[n[0]] ? jn(t, !1, !1, !0) : "");
            if (!n[1] || Date.now() - 1e3 * n[1] > 7776e6) return "";
            var r = we(n[1], e.timeshift),
                i = Oe(Object(_.oCacheGet)(e, t).sex, ye("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", r);
            return n[2] && (i += jn(t, !1, !1, a)), i
        }

        function jn(e, t, n, a) {
            var r = {
                mid: e
            };
            n || (r.was = 1), t ? r.forcetoup = !0 : r.forcetodown = !0, r = Object.assign(r, a);
            var i = JSON.stringify(r).slice(1, -1).replace(/"/g, "&quot;");
            return ve("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: i
            })
        }

        function Sn(e, t) {
            var n = t.get().tabs[e];
            return Me("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function kn(e, t) {
            return Me("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function Tn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function In(e, t, n, a) {
            var r;
            Wn(Le("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: (a, i) => {
                    i && (r = n(a, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: () => {
                        Ne.loaded && Ne.detachPlayer(!0)
                    },
                    onDestroy: () => {
                        r && r.unmount()
                    }
                }
            }, a), e)
        }

        function Mn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function An(e, t, n) {
            var a = de("_im_mess_" + e, n);
            return a && pe(a, "im-mess_fav", t), n
        }

        function Ln(e, t, n) {
            var a = de("_im_unread_bar_row", t);
            if (!a) return t;
            var r = oe(a, "._im_mess_stack", -1),
                i = oe(a, "._im_mess_stack"),
                o = r ? ce("_im_mess", r).pop() : null,
                l = i ? de("_im_mess", i) : null;
            if (Q(a), rt(t), !l || !o) return t;
            var c = le(l, "msgid"),
                d = Object(s.getPreviousMessage)(e, n, c),
                u = Object(s.getMessage)(e, n, c);
            if (!d || Et(e.tabs[n], d, u, e)) return t;
            var m = de("_im_stack_messages", r),
                g = de("_im_stack_messages", i).children;
            return Object(h.toArray)(g).forEach(e => {
                Q(e), m.appendChild(e)
            }), Q(i), t
        }

        function Pn(e, t, n) {
            var a = Object(s.getFirstUnread)(e, e.get().peer);
            if (!a) return [!1, 0];
            var r = de(`_im_mess_${a}`, t);
            if (!r) {
                var i = Object(s.getLastMessage)(e, e.get().peer, a);
                if (!i) return [!0, 0];
                r = de(`_im_mess_${i.messageId}`, t)
            }
            var o = he(r, "_im_mess_srv") ? r : ue("_im_mess_stack", r);
            if (!o) return [!0, 0];
            var l = r ? r.offsetTop : 0,
                c = o.offsetTop + l,
                d = n.contHeight();
            return c <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - c)]
        }

        function Dn(e, t, n) {
            He(t);
            var a = ue("_im_top_notice", n);
            Fe(a, 200, Q.pbind(a));
            var r = ue("_im_page_dialogs", a);
            r && he(r, "im-page--dialogs-notice") && ge(r, "im-page--dialogs-notice"), Ie.post("al_im.php", {
                act: "a_hide_top_notice",
                type: a.getAttribute("data-type"),
                hash: a.getAttribute("data-hash")
            })
        }

        function xn(e, t, n) {
            He(t);
            var a = ue("_im_aside_notice", n);
            Be(a, 200, Q.pbind(a)), Ie.post("al_im.php", {
                act: "a_hide_top_notice",
                type: a.getAttribute("data-type"),
                hash: a.getAttribute("data-hash")
            })
        }

        function Nn(e, t) {
            He(e);
            var n = ue("_im_aside_promo_block", t);
            Be(n, 200, Q.pbind(n)), Ie.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Rn(e, t) {
            ue("_im_aside_promo_block", t).classList.add("--action-called"), Ie.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: le(t, "hash"),
                platform: le(t, "platform")
            })
        }

        function Bn(e) {
            return e.length > 1 ? function(e) {
                return [].concat(e).sort((e, t) => "mail" !== e.type ? "mail" === t.type ? -1 : 1 : 0)
            }(e) : e
        }

        function Fn(e, t, n, a, r) {
            if (n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(l.replaceMentions)(n, (e, t, n, a, r) => r), a && (n = Re.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(c.isChatPeer)(e) && (n = ve("im_topic", {
                    topic: t,
                    cls: "im-topic_dialog"
                }) + n), !n && r.length > 0) {
                var i = Bn(r);
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
                    var a = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return Ce(a, ye("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var r = t.filter(t => t.type === e.type).length;
                    return Ce(r, n[e.type], !0);
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

        function Un(e) {
            me(e, "im-send-btn_loading")
        }

        function Gn(e) {
            ge(e, "im-send-btn_loading")
        }

        function qn(e) {
            var t = e.get(),
                n = Object(s.getPinnedMessage)(e);
            if (!n || !Object(f.isPinnedMessageVisibleInTab)(e, Object(s.getPeer)(e))) return "";
            var a = Object(_.oCacheGet)(e, n.userId);
            if (!a) return "";
            var r = $n(e, n);
            if (!r)
                if (!(r = n.text) && n.attaches.length) {
                    var i = Bn(n.attaches);
                    r = ve("im_pinned_message_media", {
                        text: Hn(i[0], i)
                    })
                } else r = wt(e, r, n && n.kludges || {}) || "";
            return r = r.replace(/<br\s?\/?>/gi, " "), ve("im_pinned_message", {
                date: je(n.date, t.timeshift),
                content: r,
                link: a.link,
                name: a.name
            })
        }

        function $n(e, t) {
            var n = "";
            if (t && Object(o.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                var a = "%s " + t.kludges.attach1_currency;
                if ("RUB" === t.kludges.attach1_currency && (a = ye("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                    var r = Ce(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                        i = Ce(t.kludges.attach1_total_amount / 1e3, a, !0);
                    n = ye("mail_money_request_collected_amount_from").replace("{amount}", r).replace("{total_amount}", i)
                } else {
                    var s = Ce(t.kludges.attach1_tr_amount / 1e3, a, !0);
                    n = ye("mail_money_request_collected_amount").replace("{amount}", s)
                }
                if (ee(t.kludges.attach1_held_amount)) {
                    var l = Ce(t.kludges.attach1_held_amount / 1e3, a, !0);
                    n += " " + ye("mail_money_request_held_amount").replace("{amount}", l)
                }
                t.text && (n += '<span class="divider"></span>' + wt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += ve("im_pinned_message_media_bar", {
                    percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                }))
            }
            return n
        }

        function zn(e, t, n) {
            var a = n.getAttribute("data-info");
            a && Pe(n, {
                text: a,
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                hidedt: 1e3,
                shift: [0, 4]
            })
        }

        function Kn(e, t, n) {
            var a = +n.getAttribute("data-time");
            a && Pe(n, {
                text: ye("mail_message_edited") + " " + je(a, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Vn() {
            var e = getSize(de(z))[1];
            return e || (e = $e), e
        }

        function Wn(e, t) {
            e.bodyNode.addEventListener("mouseover", e => {
                he(e.target, "_im_edit_time") ? Kn(t, 0, e.target) : he(e.target, "_im_page_info") && zn(0, 0, e.target)
            })
        }

        function Yn(e, t, n, a, r) {
            var i, s = e.get();
            Wn(Le("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                gid: e.get().gid,
                hash: s.tabs[n].hash
            }, {
                onDone: (n, r) => {
                    r && (i = a(n, e, t, r))
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
            }, r), e)
        }

        function Qn(e, t, n) {
            var a = e.get();
            Wn(Le("al_im.php", {
                act: "a_get_replied_message_box",
                chat: a.peer,
                msgid: t,
                gid: a.gid,
                hash: a.tabs[a.peer].hash
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
            return !(!Object(c.isChatPeer)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Jn(e) {
            return !Object(c.isChatPeer)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Zn(e, t) {
            var n = Object(_.oCacheGet)(e, t.peerId),
                a = Object(s.getTab)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = a.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(c.isChatPeer)(t.peerId) && (t.memberIds = t.memberIds || a.memberIds || null), t
        }

        function ea(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Zn(e, t[n])
        }

        function ta(e, t) {
            var n = [],
                a = t.find(e => "mail" === e[0]),
                r = a ? a[1].split(";") : [];
            for (r.length > Ge && (a[1] = r.slice(0, Ge).join(";")); e.length > Ue;) {
                var i = e.substr(0, Ue).lastIndexOf(" "); - 1 == i && (i = Ue), n.push({
                    msgText: te(e.substr(0, i))
                }), e = te(e.substr(i))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), r = r.slice(Ge); r.length; r = r.slice(Ge)) n.push({
                attaches: [
                    ["mail", r.slice(0, Ge).join(";")]
                ]
            });
            return n
        }

        function na(e) {
            return e.length > Ue
        }

        function aa(e, t, n) {
            var a = !1;
            Me("al_im.php", {
                act: "a_chat_preview",
                chat_id: t.invite_chat_id,
                hash: t.invite_hash
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1,
                    hideButtons: !0,
                    onHide() {
                        e.set(n), a && a.unmount()
                    }
                },
                onFail: e => (setTimeout(() => Ae(ye("global_error"), e), 0), !0),
                onDone(t, n) {
                    a = p(t.bodyNode, e)
                }
            }, {})
        }

        function ra() {
            Ae(ye("global_error"), ye("mail_message_wait_until_uploaded"))
        }

        function ia(e, t) {
            var n = Object(s.getTab)(e, t.peerId) || {},
                a = e.get(),
                r = Object(c.isChatPeer)(t.peerId) && Object(y.isUserAdminInChat)(n, a.id),
                i = Object(c.isChatPeer)(t.peerId) && Object(y.isUserAdminInChat)(n, t.userId);
            if (!t) return !1;
            if (!Object(o.isOut)(t) && (!r || i)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (Je(e, t.peerId, t.messageId)) return !1;
            if (Object(c.isChatPeer)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function sa(e, t) {
            var n = Object(s.getTab)(e, t),
                a = -1 !== n.memberIds.indexOf(n.ownerId),
                r = a ? [n.ownerId] : [];
            return (r = r.concat(n.memberIds.filter(t => t !== n.ownerId && Object(_.oCacheExists)(e, t)).slice(0, a ? 4 : 5))).map(t => Object(_.oCacheGet)(e, t))
        }

        function oa(e, t) {
            return t.map(t => Object(_.oCacheGet)(e, t))
        }

        function la(e, t) {
            return Object(s.getTab)(e, t).memberIds.reduce((t, n) => {
                var a = Object(_.oCacheGet)(e, n);
                return t[a.id] = a, t
            }, {})
        }

        function ca(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, a = [
                    [31536e3, ye(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, ye(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, ye(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, ye(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, ye(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, ye(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, ye(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ],
                r = e,
                i = [];
            if (a.forEach(e => {
                    var t = E(e, 2),
                        n = t[0],
                        a = t[1],
                        s = Math.floor(r / n);
                    r %= n, s >= 1 && i.push(Ce(s, a))
                }), 1 === (n = i.length)) return i.pop();
            var s = i.slice(0, n - 1).join(", "),
                o = i.pop();
            return ye("global_and").replace(/{before}/gi, s).replace(/{after}/gi, o)
        }

        function da(e, t, n, r) {
            r && !Je(e, n, r) && (Object(s.getMessage)(e, n, r) ? (e.setState({
                msgid: r
            }), Object(i.updateLocation)({
                msgid: r
            }), t()) : e.get().longpoll.push([Object(a.changePeer)(n, r)]))
        }

        function ua(e) {
            var t = de("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                a = Object(s.parserMessage)(n.msgs[le(t, "msgid")]);
            return a && a.peerId == e.get().peer ? a : null
        }

        function ma(e, t) {
            if (Object(s.isClassicInterface)(e)) {
                var n = document.getElementById("ui_rmenu_mr");
                n && (Object(s.existsIncomingMessageRequest)(e) ? n.classList.remove("unshown") : n.classList.add("unshown"))
            } else t(e)
        }

        function ga(e) {
            var t = Object(h.unpackStore)(e),
                n = Number(t.dialog_tab_cts[r.FOLDER_MESSAGE_REQUEST]),
                a = n > 0 ? n : "",
                i = document.querySelector('._im_right_menu_counter[data-tab="mr"]');
            i && (i.innerHTML = a)
        }
    },
    PjZB: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return r
        });
        n("rGqo"), n("a1Th"), n("Btvt");
        var a = n("q1tI");
        n("17x9");
        class r extends a.Component {
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
                    r = e.size,
                    i = e.duration,
                    s = e.strokeWidth,
                    o = this.id,
                    l = this.offset,
                    c = this.animation;
                return a.createElement("div", {
                    className: "Spinner",
                    style: t
                }, a.createElement("svg", {
                    className: "Spinner__svg",
                    width: r,
                    height: r,
                    viewBox: `0 0 ${r} ${r}`,
                    xmlns: "http://www.w3.org/2000/svg"
                }, a.createElement("g", {
                    style: {
                        width: r,
                        height: r,
                        transformOrigin: .5 * r + "px " + .5 * r + "px"
                    }
                }, a.createElement("style", {
                    dangerouslySetInnerHTML: {
                        __html: c
                    }
                }), a.createElement("circle", {
                    className: "Spinner__path",
                    fill: "none",
                    stroke: n,
                    strokeDasharray: l,
                    strokeDashoffset: l,
                    strokeWidth: s,
                    style: {
                        animationName: "dash" + o,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: i + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * r,
                    cy: .5 * r,
                    r: .5 * r - .5 * s
                }))))
            }
        }
        r.defaultProps = {
            color: "#5181b8",
            size: 19,
            strokeWidth: 2,
            duration: 1.4
        }
    },
    QOPk: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "screenfull", function() {
            return a
        });
        var a = function() {
            var e = function() {
                    for (var e, t, n = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], a = 0, r = n.length, i = {}; a < r; a++)
                        if ((e = n[a]) && e[1] in document) {
                            for (a = 0, t = e.length; a < t; a++) i[n[0][a]] = e[a];
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
        n.r(t), n.d(t, "getLang", function() {
            return o
        });
        var a = n("nAFc"),
            r = {},
            i = window.getLang,
            s = window.langNumeric;

        function o(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 ? arguments[2] : void 0,
                o = "number" == typeof t,
                l = e + (t || o ? ".raw" : "");
            if (void 0 === r[l]) {
                var c = t || o ? i(e, "raw") : i(e);
                "string" == typeof c ? r[l] = Object(a.decodeHTMLEntities)(c) : Array.isArray(c) && (r[l] = c.map(a.decodeHTMLEntities))
            }
            return o ? s(t, r[l], n) : r[l] || ""
        }
        t.default = {
            getLang: o
        }
    },
    ThPM: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return i
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));
        class i extends a.Component {
            render() {
                var e = this.props,
                    t = e.photos,
                    n = e.links,
                    i = e.className,
                    s = Object(r.classNames)("MembersGrid", `MembersGrid--${Math.min(t.length,4)}`, i);
                return a.createElement("div", {
                    className: s
                }, t.map((e, t) => {
                    var r = n && n[t] ? n[t] : void 0,
                        i = r ? "a" : "span";
                    return a.createElement(i, {
                        key: t,
                        href: r,
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

        function a(e, t) {
            var n, a, r = !1;
            return function i() {
                if (r) return n = arguments, void(a = this);
                e.apply(this, arguments), r = !0, setTimeout(function() {
                    r = !1, n && (i.apply(a, n), n = a = null)
                }, t)
            }
        }
        n.r(t), n.d(t, "default", function() {
            return a
        })
    },
    WDXI: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return c
        });
        n("91GP");
        var a = n("q1tI"),
            r = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("MV/q"),
            o = window.elfocus,
            l = {
                height: "auto"
            };
        class c extends a.Component {
            constructor(e) {
                super(e), this.onChange = e => {
                    this.props.onChange ? this.props.onChange(e) : this.setState({
                        value: e.target.value,
                        changed: this.props.value !== this.state.value
                    })
                }, this.onClick = () => {
                    this.setState({
                        editing: !0
                    }, () => {
                        this.textarea && o(this.textarea), this.props.onStartEdit && this.props.onStartEdit()
                    })
                }, this.onBlur = () => {
                    this.state.changed || this.setState({
                        editing: !1
                    })
                }, this.onSave = () => {
                    this.props.validate && !this.props.validate(this.state.value) || (this.setState({
                        editing: !1,
                        changed: !1
                    }), this.props.onSave && this.props.onSave({
                        value: this.state.value
                    }))
                }, this.onKeydown = e => {
                    this.state.editing && (27 === e.keyCode && (this.props.onCancel && this.props.onCancel(), this.setState({
                        editing: !1,
                        changed: !1,
                        value: this.props.value
                    }), e.preventDefault(), e.stopPropagation()), this.props.useEnter && 13 === e.keyCode && (this.onSave(), e.preventDefault(), e.stopPropagation()))
                }, this.getRef = e => {
                    e && e.element && (this.textarea = e.element)
                }, this.state = {
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
                this.el = r.findDOMNode(this), this.el.addEventListener("keydown", this.onKeydown)
            }
            componentWillUnmount() {
                this.el.removeEventListener("keydown", this.onKeydown)
            }
            render() {
                var e = this.props,
                    t = e.className,
                    n = e.validate,
                    r = e.placeholder,
                    o = this.state,
                    c = o.editing,
                    d = o.changed,
                    u = o.value,
                    m = Object(i.classNames)("EditableLabel", {
                        "EditableLabel--editing": c,
                        "EditableLabel--changed": d,
                        "EditableLabel--invalid": n && !n(u)
                    }, t);
                return a.createElement("div", {
                    className: m
                }, c ? a.createElement(a.Fragment, null, a.createElement(s.default, {
                    className: "EditableLabel__textarea",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: u,
                    onBlur: this.onBlur,
                    style: Object.assign({}, l, this.props.textareaStyles),
                    rows: "1",
                    ref: this.getRef,
                    placeholder: r
                }), d && a.createElement("button", {
                    className: "EditableLabel__save",
                    onClick: this.onSave
                })) : a.createElement("div", {
                    className: "EditableLabel__text",
                    onClick: this.onClick
                }, u))
            }
        }
        c.defaultProps = {
            value: "",
            changed: !1,
            useEnter: !1,
            textareaStyles: {},
            placeholder: ""
        }
    },
    Wu9C: function(e, t, n) {
        "use strict";
        n.r(t);
        var a = n("N1NS"),
            r = n("vT4u");

        function i(e) {
            return {
                unmount() {
                    Object(a.destroyModule)(e)
                }
            }
        }

        function s(e, t, n) {
            return (0, Object(a.createMutations)(i).bindMutations)(Object(a.createModule)({
                handlers: (e, t) => {}
            }))
        }
        var o = n("P13b"),
            l = n("rHUl"),
            c = n("aong"),
            d = n("uytb");
        n.d(t, "isPinnedMessageVisibleInTab", function() {
            return g
        }), n.d(t, "pinnedMessageHide", function() {
            return p
        }), n.d(t, "pinnedMessageUnHide", function() {
            return h
        }), n.d(t, "pinnedMessageUnpin", function() {
            return _
        }), n.d(t, "mount", function() {
            return v
        });
        var u = "_im_pin_hide",
            m = "_im_pinned_message";

        function g(e, t) {
            if (Object(c.unpackStore)(e).searchShown) return !1;
            var n = Object(l.getTab)(e, t),
                a = n && Object(l.parserMessage)(n.pinned);
            return !!a && n.pinHideId != a.chat_local_id
        }

        function p(e, t, n) {
            var a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                r = Object(l.getTab)(e, t),
                i = r && Object(l.parserMessage)(r.pinned);
            r && i && (r.pinHideId = i.chat_local_id, cur.imDb.update(d.PIN_HIDDEN_ID_OP, [r.peerId, r.pinHideId]), f(n, t, e), re(geByClass1("_im_pinned_tt")), a && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function h(e, t, n) {
            var a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                r = Object(l.getTab)(e, t);
            r && r.pinHideId && (delete r.pinHideId, cur.imDb.update(d.PIN_HIDDEN_ID_OP, [r.peerId, void 0]), f(n, t, e), a && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function _(e, t, n) {
            var a = f.bind(null, n, t),
                i = Object(o.showUnpinDialog)(() => {
                    i.hideProgress(), i.hide(), e.set(r.unpinMessageOptimistic.bind(null, t)).then(a).then(e => e.set(r.unpinMessage.bind(null, t))).then(a)
                })
        }

        function f(e, t, n) {
            return e().updateChatTopic(t, n), Object(r.setActions)(n.get()), e().updateActions(n), n
        }

        function b(e) {
            return {
                unmount() {
                    Object(a.destroyModule)(e)
                }
            }
        }

        function v(e, t, n) {
            var r = Object(a.createMutations)(b).bindMutations,
                i = function(e, t, n) {
                    var a = e.get().peer,
                        r = Object(l.parserMessage)(Object(l.getTab)(e, a).pinned);
                    if (n.target.classList.contains(u)) r && p(e, a, t);
                    else if ("A" !== n.target.tagName) {
                        var i = r && r.messageId;
                        i && !Object(o.isAlreadyDeleted)(e, a, i) ? Object(o.focusOnMessage)(e, t().focusOnMessage, a, i) : Object(o.showPinnedBox)(e, t, a, s, n), statlogsValueEvent("im_pinned_messages", "open")
                    }
                }.bind(null, t, n),
                c = function(e) {
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
            return r(Object(a.createModule)({
                handlers: (t, n) => {
                    n(e, "click", m, i), n(e, "mouseover", u, c)
                }
            }))
        }
    },
    XTb9: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }
        class o extends a.Component {
            constructor(e) {
                super(e), this.onTransitionEnd = e => {
                    this.state.shown && "opacity" === e.propertyName && (this.timeout = setTimeout(() => {
                        this.setState({
                            shown: !1
                        }), this.props.callback()
                    }, this.props.duration))
                }, this.state = {
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
                    l = Object(r.classNames)("BlinkText", {
                        "BlinkText--shown": this.state.shown
                    }, t);
                return a.createElement("span", i({}, o, {
                    className: l,
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
        n.r(t), n.d(t, "default", function() {
            return l
        });
        n("91GP");
        var a = n("q1tI"),
            r = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("clTp"),
            o = () => "undefined" != typeof window;
        class l extends a.Component {
            constructor(e) {
                super(e), this.onMouseEnter = e => {
                    if (this.el) {
                        var t = this.props,
                            n = t.text,
                            a = t.position,
                            r = t.align,
                            i = t.marginTop,
                            o = t.marginLeft,
                            l = t.maxWidth,
                            c = t.appearance,
                            d = Object(s.default)(this.el);
                        this.update({
                            text: n,
                            position: a,
                            align: r,
                            rect: d,
                            marginTop: i,
                            marginLeft: o,
                            maxWidth: l,
                            appearance: c
                        })
                    }
                }, this.onMouseLeave = e => this.update(), this.onTransitionEnd = e => {
                    "visibility" === e.propertyName && this.state.tooltip && this.setState({
                        tooltip: void 0
                    })
                }, this.renderTooltip = () => {
                    if (!this.state.tooltip) return null;
                    var e = this.state.tooltip,
                        t = e.x,
                        n = e.y,
                        r = e.position,
                        s = e.align,
                        o = e.text,
                        l = e.removed,
                        c = e.maxWidth,
                        d = e.appearance,
                        u = Object(i.classNames)("Tooltip", `Tooltip--${r}`, `Tooltip--${d}`, {
                            "Tooltip--removed": !!l,
                            [`Tooltip--align-${s}`]: "t" === r || "b" === r
                        });
                    return a.createElement("div", {
                        className: u,
                        style: {
                            top: n,
                            left: t
                        },
                        onTransitionEnd: this.onTransitionEnd
                    }, a.createElement("div", {
                        className: "Tooltip__in",
                        style: {
                            maxWidth: c
                        },
                        dangerouslySetInnerHTML: {
                            __html: o
                        }
                    }))
                }, this.state = {}
            }
            componentDidMount() {
                this.el = r.findDOMNode(this), this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave)
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
                    a = e.text,
                    r = e.rect,
                    i = e.marginTop,
                    s = e.marginLeft,
                    o = e.maxWidth,
                    l = e.appearance,
                    c = r.left,
                    d = r.top;
                switch (t) {
                    case "t":
                        c += .5 * r.width;
                        break;
                    case "r":
                        c += r.width, d += .5 * r.height;
                        break;
                    case "b":
                        c += .5 * r.width, d += r.height;
                        break;
                    case "l":
                        d += .5 * r.height
                }
                c = Math.round(c + s), d = Math.round(d + i), this.setState({
                    tooltip: {
                        position: t,
                        align: n,
                        text: a,
                        x: c,
                        y: d,
                        maxWidth: o,
                        appearance: l
                    }
                })
            }
            render() {
                var e = this.renderTooltip();
                return e ? (!this.defaultNode && o() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), a.createElement(a.Fragment, null, this.props.children, r.createPortal(e, this.defaultNode))) : this.props.children
            }
        }
        l.defaultProps = {
            position: "b",
            align: "center",
            marginTop: 0,
            marginLeft: 0,
            appearance: "dark"
        }
    },
    clTp: function(e, t, n) {
        "use strict";

        function a(e) {
            var t = e.getBoundingClientRect(),
                n = document.body,
                a = document.documentElement,
                r = window.pageYOffset || a.scrollTop || n.scrollTop,
                i = window.pageXOffset || a.scrollLeft || n.scrollLeft,
                s = a.clientTop || n.clientTop || 0,
                o = a.clientLeft || n.clientLeft || 0;
            return {
                top: Math.round(t.top + r - s),
                left: Math.round(t.left + i - o),
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
        n.r(t), n.d(t, "default", function() {
            return a
        })
    },
    eTng: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseFwd", function() {
            return o
        }), n.d(t, "convertKludgesToAttaches", function() {
            return l
        }), n.d(t, "isReservedPeer", function() {
            return c
        }), n.d(t, "isUserPeer", function() {
            return d
        }), n.d(t, "isChatPeer", function() {
            return u
        }), n.d(t, "convertAttachesToPhpMedia", function() {
            return m
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("Btvt"), n("KKXr");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var r = window.intval;

        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = a(e.split("_"), 2);
            return [n[0], n[1], t]
        }
        var s = {};

        function o(e) {
            if (s[e]) return s[e];
            for (var t = e ? e.length : 0, n = [], r = [], o = "", l = 0; l < t; l++) {
                var c = e[l],
                    d = c.charCodeAt(0);
                d >= 48 && d <= 57 || "_" === c || "-" === c ? o += c : "(" !== c && ")" !== c && ":" !== c && "," !== c || ("" !== o && (r.push(o), n.push("id"), o = ""), r.push(c), n.push(c))
            }
            o.length > 0 && (r.push(o), n.push("id"));
            var u = function e(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (s > 50) return [
                        [], t.length
                    ];
                    for (var o = [], l = ""; r < t.length;) {
                        var c = t[r];
                        if ("id" === c) l = n[r];
                        else if ("," === c && l) o.push(i(l)), l = "";
                        else if ("(" === c) {
                            var d = a(e(t, n, r + 1, s + 1), 2),
                                u = d[0];
                            r = d[1], o.push(i(l, u)), l = ""
                        } else if (")" === c) return "" !== l && o.push(i(l)), [o, r];
                        r++
                    }
                    return l && o.push(i(l)), [o, r]
                }(n, r),
                m = a(u, 1)[0];
            return Object.keys(s).length > 300 && (s = {}), s[e] = m, m
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
                    fwd_count: o(e.fwd).length
                }
            });
            for (var a = 1; e["attach" + a + "_type"]; ++a) "call" === e["attach" + a + "_type"] ? n.push({
                type: e["attach" + a + "_type"],
                id: e["attach" + a],
                initiatorId: r(e["attach" + a + "_call_initiator_id"]),
                state: e["attach" + a + "_call_state"],
                duration: r(e["attach" + a + "_call_duration"]),
                receiverId: r(e["attach" + a + "_call_receiver_id"])
            }) : n.push({
                type: e["attach" + a + "_type"],
                id: e["attach" + a],
                kind: e["attach" + a + "_kind"],
                productId: e["attach" + a + "_product_id"]
            });
            return e.geo && n.push({
                type: "geo",
                id: e.geo
            }), n
        }

        function c(e) {
            return 0 == e
        }

        function d(e) {
            return e > 0 && e < 2e9
        }

        function u(e) {
            return e > 2e9
        }

        function m(e) {
            return e.map(e => {
                var t = "audiomsg" === e[2] ? "audio_message" : e[2];
                return `${e[0]}:${e[1]}:${t}`
            }).join(",")
        }
    },
    enZq: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return i
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i(e) {
            var t = {
                "List--border": !!e.border
            };
            return a.createElement("ul", {
                className: Object(r.classNames)("List", t, e.className),
                style: e.style
            }, e.children)
        }
        i.defaultProps = {
            border: !0
        }
    },
    f01n: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "DELETE", function() {
            return i
        }), n.d(t, "SET_FLAGS", function() {
            return s
        }), n.d(t, "REPLACE_FLAGS", function() {
            return o
        }), n.d(t, "RESET_FLAGS", function() {
            return l
        }), n.d(t, "ADD_MESSAGE", function() {
            return c
        }), n.d(t, "READ_INBOUND", function() {
            return d
        }), n.d(t, "READ_OUTBOUND", function() {
            return u
        }), n.d(t, "GOT_ONLINE", function() {
            return m
        }), n.d(t, "GOT_OFFLINE", function() {
            return g
        }), n.d(t, "CHAT_CHANGED", function() {
            return p
        }), n.d(t, "CONVERSATION_UPDATED", function() {
            return h
        }), n.d(t, "TYPING", function() {
            return _
        }), n.d(t, "RECORDING_AUDIO", function() {
            return f
        }), n.d(t, "VIDEO_CALL", function() {
            return b
        }), n.d(t, "UNREAD_COUNT", function() {
            return v
        }), n.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
            return y
        }), n.d(t, "EMPTY", function() {
            return O
        }), n.d(t, "RESET_DIRECTORIES", function() {
            return E
        }), n.d(t, "REPLACE_DIRECTORIES", function() {
            return C
        }), n.d(t, "SET_DIRECTORIES", function() {
            return w
        }), n.d(t, "RESYNC", function() {
            return j
        }), n.d(t, "REFRESH_LP_KEY", function() {
            return S
        }), n.d(t, "TRANSITION", function() {
            return k
        }), n.d(t, "RESET_PEER", function() {
            return T
        }), n.d(t, "MUTEX", function() {
            return I
        }), n.d(t, "CHANGE_PEER", function() {
            return M
        }), n.d(t, "CHANGE_TAB", function() {
            return A
        }), n.d(t, "FAILED_MESSAGE", function() {
            return L
        }), n.d(t, "RESEND", function() {
            return P
        }), n.d(t, "DELETE_DIALOG", function() {
            return D
        }), n.d(t, "EDIT_MESSAGE", function() {
            return x
        }), n.d(t, "REPLACE_MESSAGE", function() {
            return N
        }), n.d(t, "AUDIO_START", function() {
            return R
        }), n.d(t, "WAITING_FOR_RECONNECT", function() {
            return B
        }), n.d(t, "RECONNECTING", function() {
            return F
        }), n.d(t, "RECONNECTED", function() {
            return H
        }), n.d(t, "FLAG_UNREAD", function() {
            return U
        }), n.d(t, "FLAG_OUTBOUND", function() {
            return G
        }), n.d(t, "FLAG_IMPORTANT", function() {
            return q
        }), n.d(t, "FLAG_CHAT", function() {
            return $
        }), n.d(t, "FLAG_FRIENDS", function() {
            return z
        }), n.d(t, "FLAG_SPAM", function() {
            return K
        }), n.d(t, "FLAG_DELETED", function() {
            return V
        }), n.d(t, "FLAG_MEDIA", function() {
            return W
        }), n.d(t, "FLAG_STEALTH", function() {
            return Y
        }), n.d(t, "FLAG_HAS_REPLY", function() {
            return Q
        }), n.d(t, "FLAG_AUDIO_MESSAGE_LISTENED", function() {
            return X
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return J
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return Z
        }), n.d(t, "FOLDER_HAS_BANNER", function() {
            return ee
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_TITLE_CHANGED", function() {
            return te
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_AVATAR_CHANGED", function() {
            return ne
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED", function() {
            return ae
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED", function() {
            return re
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_PINNED", function() {
            return ie
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_JOINED", function() {
            return se
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_LEFT", function() {
            return oe
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_KICKED", function() {
            return le
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED", function() {
            return ce
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED", function() {
            return de
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED", function() {
            return ue
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_MESSAGE_REQUEST_CHANGED", function() {
            return me
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_CONTACT_CONVERTED", function() {
            return ge
        }), n.d(t, "MESSAGE_REQUEST_STATUS_NEW", function() {
            return pe
        }), n.d(t, "deleteEvent", function() {
            return he
        }), n.d(t, "replaceFlagsEvent", function() {
            return _e
        }), n.d(t, "setFlagsEvent", function() {
            return fe
        }), n.d(t, "resetFlagsEvent", function() {
            return be
        }), n.d(t, "addMessageEvent", function() {
            return ve
        }), n.d(t, "editMessageEvent", function() {
            return ye
        }), n.d(t, "replaceMessageEvent", function() {
            return Oe
        }), n.d(t, "editMessageLocallyEvent", function() {
            return Ee
        }), n.d(t, "readInboundEvent", function() {
            return Ce
        }), n.d(t, "readOutboundEvent", function() {
            return we
        }), n.d(t, "gotOnlineEvent", function() {
            return je
        }), n.d(t, "gotOfflineEvent", function() {
            return Se
        }), n.d(t, "resetDirectoriesEvent", function() {
            return ke
        }), n.d(t, "replaceDirectoriesEvent", function() {
            return Te
        }), n.d(t, "setDirectoriesEvent", function() {
            return Ie
        }), n.d(t, "deleteDialogEvent", function() {
            return Me
        }), n.d(t, "chatChangedEvent", function() {
            return Ae
        }), n.d(t, "chatUpdatedEvent", function() {
            return Le
        }), n.d(t, "typingEvent", function() {
            return Pe
        }), n.d(t, "recordingAudioEvent", function() {
            return De
        }), n.d(t, "videoCallEvent", function() {
            return xe
        }), n.d(t, "unreadCountEvent", function() {
            return Ne
        }), n.d(t, "notifySettingsChangedEvent", function() {
            return Re
        }), n.d(t, "refreshMessageEvent", function() {
            return Be
        }), n.d(t, "audioStartEvent", function() {
            return Fe
        }), n.d(t, "emptyEvent", function() {
            return He
        }), n.d(t, "transitionEvent", function() {
            return Ue
        }), n.d(t, "resyncEvent", function() {
            return Ge
        }), n.d(t, "refreshLpKeyEvent", function() {
            return qe
        }), n.d(t, "waitingForReconnectEvent", function() {
            return $e
        }), n.d(t, "reconnectingEvent", function() {
            return ze
        }), n.d(t, "reconnectedEvent", function() {
            return Ke
        }), n.d(t, "resetPeer", function() {
            return Ve
        }), n.d(t, "changePeer", function() {
            return We
        }), n.d(t, "changeTab", function() {
            return Ye
        }), n.d(t, "failedMessage", function() {
            return Qe
        }), n.d(t, "mutexEvent", function() {
            return Xe
        }), n.d(t, "resendEvent", function() {
            return Je
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("OEbY");
        var a = n("eTng");

        function r(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
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
            l = "event_reset_flags",
            c = "event_add_message",
            d = "event_read_inbound",
            u = "event_read_outbound",
            m = "event_got_online",
            g = "event_got_offline",
            p = "event_chat_changed",
            h = "event_chat_updated",
            _ = "event_typing",
            f = "event_recoding_audio",
            b = "event_video_call",
            v = "event_unread_count",
            y = "event_notify_settings_changed",
            O = "event_empty",
            E = "event_reset_directories",
            C = "event_replace_directories",
            w = "event_set_directories",
            j = "event_resync",
            S = "event_refresh_lp_key",
            k = "transition_event",
            T = "reset_peer",
            I = "mutex",
            M = "change_peer",
            A = "event_change_tab",
            L = "event_failed_message",
            P = "event_resend",
            D = "event_delete_dialog",
            x = "event_edit_message",
            N = "event_replace_message",
            R = "event_audio_start",
            B = "event_waiting_for_reconnect",
            F = "event_reconnecting",
            H = "event_reconnected",
            U = 1,
            G = 2,
            q = 8,
            $ = 16,
            z = 32,
            K = 64,
            V = 128,
            W = 512,
            Y = 65536,
            Q = 1 << 21,
            X = 4096,
            J = 1,
            Z = 2,
            ee = 8,
            te = 1,
            ne = 2,
            ae = 3,
            re = 4,
            ie = 5,
            se = 6,
            oe = 7,
            le = 8,
            ce = 9,
            de = 10,
            ue = 11,
            me = 12,
            ge = 13,
            pe = 3;

        function he(e) {
            var t = r(e, 2)[1];
            return {
                type: i,
                localId: t
            }
        }

        function _e(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: o,
                messageId: n,
                mask: a,
                peerId: i
            }
        }

        function fe(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: s,
                messageId: n,
                flags: a,
                peerId: i
            }
        }

        function be(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: l,
                messageId: n,
                flags: a,
                peerId: i
            }
        }

        function ve(e) {
            var t = r(e, 11),
                n = t[1],
                i = t[2],
                s = t[3],
                o = t[4],
                l = t[5],
                d = t[6],
                u = t[7],
                m = t[8],
                g = t[9],
                p = t[10],
                h = extend(d, u || void 0);
            return {
                type: c,
                messageId: intval(n),
                flags: intval(i),
                peerId: intval(s),
                date: intval(o),
                attaches: Object(a.convertKludgesToAttaches)(h, n),
                subject: d.title || "",
                text: l,
                kludges: h,
                randomId: intval(m),
                userId: Object(a.isChatPeer)(s) ? intval(h.from) : intval(s),
                update_time: p,
                chat_local_id: g
            }
        }

        function ye(e) {
            var t = ve(e);
            return t.type = x, t
        }

        function Oe(e) {
            var t = ve(e);
            return t.type = N, t
        }

        function Ee(e) {
            return extend({}, e, {
                type: x
            })
        }

        function Ce(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: d,
                peerId: n,
                upToId: a,
                unread: i
            }
        }

        function we(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: u,
                peerId: n,
                upToId: a,
                unread: i
            }
        }

        function je(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: m,
                userId: -n,
                platform: a,
                lastSeenTs: i
            }
        }

        function Se(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: g,
                userId: -n,
                reason: a,
                lastSeenTs: i
            }
        }

        function ke(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: E,
                peerId: n,
                mask: a,
                local: void 0 !== i && i
            }
        }

        function Te(e) {
            var t = r(e, 3),
                n = t[1],
                a = t[2];
            return {
                type: C,
                peerId: n,
                mask: a
            }
        }

        function Ie(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: w,
                peerId: n,
                mask: a,
                local: void 0 !== i && i
            }
        }

        function Me(e) {
            var t = r(e, 3),
                n = t[1],
                a = t[2];
            return {
                type: D,
                peerId: n,
                localId: a
            }
        }

        function Ae(e) {
            var t = r(e, 3),
                n = t[1],
                a = t[2];
            return {
                type: p,
                chatId: n,
                self: a
            }
        }

        function Le(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: h,
                peerId: a,
                updateType: n,
                updateArg: i
            }
        }

        function Pe(e) {
            var t = r(e, 5),
                n = t[1],
                a = t[2],
                i = t[3],
                s = t[4];
            return {
                type: _,
                peerId: n,
                userIds: a,
                totalCount: i,
                ts: s
            }
        }

        function De(e) {
            var t = r(e, 5),
                n = t[1],
                a = t[2],
                i = t[3],
                s = t[4];
            return {
                type: f,
                peerId: n,
                userIds: a,
                totalCount: i,
                ts: s
            }
        }

        function xe(e) {
            var t = r(e, 3),
                n = t[1],
                a = t[2];
            return {
                type: b,
                userId: n,
                callId: a
            }
        }

        function Ne(e) {
            var t = r(e, 4),
                n = t[1],
                a = t[2],
                i = t[3];
            return {
                type: v,
                count: n,
                countNotMuted: a,
                showOnlyNotMuted: i
            }
        }

        function Re(e) {
            var t = r(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: y,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function Be(e) {
            var t = r(e, 2)[1],
                n = void 0 === t ? {} : t,
                a = ve([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return a.type = x, a
        }

        function Fe(e) {
            var t = r(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: R,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function He(e) {
            return {
                type: O,
                params: e
            }
        }

        function Ue(e) {
            return {
                type: k,
                state: e
            }
        }

        function Ge() {
            return {
                type: j
            }
        }

        function qe(e) {
            var t = r(e, 3),
                n = t[1],
                a = t[2];
            return {
                type: S,
                key: n,
                url: a
            }
        }

        function $e(e) {
            var t = r(e, 2)[1];
            return {
                type: B,
                timeout: t
            }
        }

        function ze() {
            return {
                type: F
            }
        }

        function Ke() {
            return {
                type: H
            }
        }

        function Ve() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: T,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function We(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: M,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: a,
                entryPoint: r
            }
        }

        function Ye(e) {
            return {
                type: A,
                tab: e
            }
        }

        function Qe(e, t, n) {
            return {
                type: L,
                message: t,
                peer: e,
                error: n
            }
        }

        function Xe(e) {
            var t = r(e, 6),
                n = (t[0], t[1]),
                a = t[2],
                i = t[3],
                s = t[4],
                o = t[5];
            return {
                type: I,
                free: !!intval(n) || intval(s) === vk.id,
                resource: a,
                peerId: intval(i),
                who: intval(s),
                name: o
            }
        }

        function Je(e, t) {
            return {
                type: P,
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
            sImPeerReturnToChat: '<a href="#" class="_im_peer_return_to_chat">%text%</a>',
            sImCallSnippet: ' <a href="/calls" onclick="return showWiki({ w: \'calls\'});" class="im-call-snippet %modifier%"> <div class="im-call-snippet--title">%title%</div> <div class="im-call-snippet--desc">%description%</div> </a>',
            sImCallSnippetDMLink: function() {
                return ' <object type="internal/link" class="im-call-snippet--guard"> <a href="/messenger" target="_blank" onclick="return event.stopPropagation();" class="im-call-snippet--link"> ' + getLang("mail_call_snippet_call_back") + " </a> </object>"
            },
            sImCallSnippetCanceled: '<span class="im-call-snippet--canceled">%text%</span>'
        }
    },
    g6Ay: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "initFailBack", function() {
            return a
        });
        n("VRzm"), n("Btvt");

        function a() {
            var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia;
            e && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = function(t) {
                return new Promise(function(n, a) {
                    e ? e.call(navigator, t, n, a) : a(new Error("NotSupported"))
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
        n.r(t);
        var a = n("uQjJ");

        function r() {
            return !!window.isMVK
        }
        n.d(t, "default", function() {
            return s
        }), n.d(t, "getVisibilityState", function() {
            return c
        }), n.d(t, "getVisiblityEvent", function() {
            return d
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
            r() ? window.addEvent(e, t, n, {
                passive: !0
            }) : window.addEvent(e, t, n)
        }

        function l(e, t, n) {
            r() ? window.removeEvent(e, t, n, {
                passive: !0
            }) : window.removeEvent(e, t, n)
        }

        function c() {
            return document.visibilityState || document.webkitVisibilityState
        }

        function d() {
            var e = "visibilitychange";
            return document.visibilityState || (document.webkitVisibilityState ? e += "webkit" : e = ""), e
        }
        extend(s.prototype, a.default.prototype), extend(s.prototype, {
            stop: function() {
                this.started = !1, l(this.opts.element, this.opts.triggerEvents, this.cbActiveB), r() && this._isTopLevel() && d() && l(document, d(), this.onVisiblityChange), r() && i || (l(this.opts.focusElement, "focus", this.cbActiveB), l(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
            },
            idle: function(e) {
                this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
            },
            unidle: function(e) {
                this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
            },
            start: function() {
                this.started = !0, !r() && browser.mobile || (this.is_idle = !this._isFocused(), this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), r() && this._isTopLevel() && d() && o(document, d(), this.onVisiblityChange), r() && i || (o(this.opts.focusElement, "focus", this.cbActiveB), o(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            checkIdleCb: function() {
                this.started && (o(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
            },
            cbActive: function() {
                this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
                }.bind(this), 100)), l(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            cbInactive: function() {
                this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
                }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), l(this.opts.element, this.opts.triggerEvents, this.cbActiveB), o(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
            },
            getActiveTime() {
                return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
            },
            onVisiblityChange() {
                "visible" === c() ? this.cbActiveB() : this.cbInactiveB()
            },
            _isTopLevel() {
                var e = this.opts.focusElement;
                return e === window || e === document
            },
            _isFocused() {
                var e = this.opts.focusElement;
                if (this._isTopLevel()) {
                    var t = c();
                    return "string" == typeof t && "visible" === t
                }
                return document.activeElement === e
            }
        })
    },
    "h++7": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "OUR_DOMAINS", function() {
            return a
        }), n.d(t, "ENTITIES", function() {
            return r
        }), n.d(t, "VK_DOMAIN", function() {
            return i
        }), n.d(t, "MENTION", function() {
            return s
        }), n.d(t, "MENTION_RAW", function() {
            return o
        }), n.d(t, "ARROW_UP", function() {
            return l
        }), n.d(t, "ARROW_DOWN", function() {
            return c
        }), n.d(t, "PAGE_UP", function() {
            return d
        }), n.d(t, "PAGE_DOWN", function() {
            return u
        }), n.d(t, "END_KEY", function() {
            return m
        }), n.d(t, "HOME", function() {
            return g
        }), n.d(t, "ENTER", function() {
            return p
        }), n.d(t, "ESC", function() {
            return h
        }), n.d(t, "UNPRINTABLE_KEYS", function() {
            return _
        }), n.d(t, "UP_DOWN_CONTROLS", function() {
            return f
        }), n.d(t, "PRINTABLE", function() {
            return b
        }), n.d(t, "FOLDER_UNREAD", function() {
            return v
        }), n.d(t, "FOLDER_ALL", function() {
            return y
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return O
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return E
        }), n.d(t, "FOLDER_MESSAGE_REQUEST", function() {
            return C
        }), n.d(t, "FOLDER_MESSAGE_REQUEST_REJECTED", function() {
            return w
        }), n.d(t, "FOLDERS", function() {
            return j
        }), n.d(t, "FOLDER_MASKS", function() {
            return S
        }), n.d(t, "TOP_DOMAINS", function() {
            return k
        }), n.d(t, "MAX_DOMAIN_LENGTH", function() {
            return T
        }), n.d(t, "EMAIL", function() {
            return I
        }), n.d(t, "MESSAGE_REGEXP", function() {
            return M
        }), n.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
            return L
        }), n.d(t, "LINE_FEED", function() {
            return P
        });
        n("Oyvg");
        var a = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            r = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            i = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            s = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            o = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            l = 38,
            c = 40,
            d = 33,
            u = 34,
            m = 35,
            g = 36,
            p = 13,
            h = 27,
            _ = [l, c, d, u, p, h, m, g],
            f = [d, u, c, l, g, m],
            b = "printable",
            v = "unread",
            y = "all",
            O = "unrespond",
            E = "important",
            C = "mr",
            w = "mr_rejected",
            j = [y, v, O, E, C],
            S = {
                [O]: 2,
                [E]: 1,
                [C]: 256,
                [w]: 512
            },
            k = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(e => "xn--" + e)),
            T = k.reduce((e, t) => Math.max(e, t.length), 0),
            I = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            M = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            A = "(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))",
            L = `(^|[s.,:'";>)(]?)(${`(#${A}{0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))${A}{0,100})`})(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'"&;?<)(]?)`,
            P = 10
    },
    hIV1: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return i
        });
        var a = n("q1tI"),
            r = n("pemR");

        function i(e) {
            var t = {
                "SubmitArea--left": !e.alignment || "left" === e.alignment,
                "SubmitArea--center": "center" === e.alignment,
                "SubmitArea--right": "right" === e.alignment
            };
            return a.createElement("div", {
                className: Object(r.classNames)("SubmitArea", t),
                style: e.style
            }, e.children)
        }
    },
    hOuX: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MAX_SAFE_INTEGER", function() {
            return a
        }), n.d(t, "MAX_INTERGER", function() {
            return r
        }), n.d(t, "random", function() {
            return i
        });
        n("tuSo");
        var a = 9007199254740991,
            r = 2147483647;

        function i() {
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
        var a = n("XKFU"),
            r = n("UExd")(!1);
        a(a.S, "Object", {
            values: function(e) {
                return r(e)
            }
        })
    },
    iN1s: function(e, t, n) {
        "use strict";
        n.r(t);
        n("rGqo"), n("Btvt"), n("rE2o"), n("ioFf"), n("VRzm");
        var a = n("DM26"),
            r = n("BxOC"),
            i = n("f01n");

        function s(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var o = 202,
            l = 7,
            c = 4,
            d = -3,
            u = -4,
            m = -5;

        function g(e, t) {
            e.waitAbortFns.push(t)
        }

        function p(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(r.plaingetCancelable)(e.url, {
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
                    a = n[0],
                    r = n[1];
                return e.onData(e, r), e.waitTimeout = 2, JSON.parse(a)
            }).catch(t => {
                var n = s(t, 2),
                    a = (n[0], n[1]);
                throw e.onData(e, a), ""
            }).then(t => (function(e, t) {
                var n = t.failed ? Object(a.abortablePause)(c, null) : {},
                    r = n.abort,
                    i = n.pause;
                switch (t.failed) {
                    case 1:
                        return g(e, r), e.onHistoryLost(e, t).then(() => e.onResult({
                            ts: t.ts,
                            updates: [
                                [-1]
                            ]
                        })).then(i).then(() => p(e));
                    case 2:
                        return g(e, r), e.onKeyExpired(e, t).then(t => {
                            var n = s(t, 4),
                                a = n[0],
                                r = n[1],
                                i = n[2],
                                o = n[3];
                            return e.onResult({
                                ts: +o,
                                updates: [
                                    [-2, a, `${r}/${i}`],
                                    [-1]
                                ]
                            })
                        }).then(i).then(() => p(e));
                    case 3:
                        return e.onLpBroken(e, t);
                    default:
                        return t
                }
            })(e, t))
        }

        function h(e) {
            e.isStoppedFn() || p(e).then(e.onResult).then(() => e.isReconnecting && _(e, m)).catch(t => (function(e, t) {
                if (e.isStoppedFn()) return;
                e.onRequestError(t), e.waitTimeout = Math.min(60, 2 * e.waitTimeout), _(e, d);
                var n = Object(a.abortablePause)(e.waitTimeout, null),
                    r = n.abort,
                    i = n.pause;
                return g(e, r), i().then(() => _(e, u))
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

        function f(e, t) {
            var n = !!e.stopped,
                a = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: e.version || l,
                    mode: o,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: () => n,
                    onResult: e => {
                        e.ts && s(a.ts, e.ts, function(e) {
                            return e.map(e => {
                                switch (e[0]) {
                                    case 0:
                                        return i.deleteEvent(e);
                                    case 1:
                                        return i.replaceFlagsEvent(e);
                                    case 2:
                                        return i.setFlagsEvent(e);
                                    case 3:
                                        return i.resetFlagsEvent(e);
                                    case 4:
                                        return i.addMessageEvent(e);
                                    case 5:
                                        return i.editMessageEvent(e);
                                    case 6:
                                        return i.readInboundEvent(e);
                                    case 7:
                                        return i.readOutboundEvent(e);
                                    case 8:
                                        return i.gotOnlineEvent(e);
                                    case 9:
                                        return i.gotOfflineEvent(e);
                                    case 10:
                                        return i.resetDirectoriesEvent(e);
                                    case 11:
                                        return i.replaceDirectoriesEvent(e);
                                    case 12:
                                        return i.setDirectoriesEvent(e);
                                    case 13:
                                        return i.deleteDialogEvent(e);
                                    case 18:
                                        return i.replaceMessageEvent(e);
                                    case 51:
                                        return i.chatChangedEvent(e);
                                    case 52:
                                        return i.chatUpdatedEvent(e);
                                    case 63:
                                        return i.typingEvent(e);
                                    case 64:
                                        return i.recordingAudioEvent(e);
                                    case 70:
                                        return i.videoCallEvent(e);
                                    case 80:
                                        return i.unreadCountEvent(e);
                                    case 114:
                                        return i.notifySettingsChangedEvent(e);
                                    case 116:
                                        return i.refreshMessageEvent(e);
                                    case 117:
                                        return i.audioStartEvent(e);
                                    case -1:
                                        return i.resyncEvent();
                                    case -2:
                                        return i.refreshLpKeyEvent(e);
                                    case d:
                                        return i.waitingForReconnectEvent(e);
                                    case u:
                                        return i.reconnectingEvent();
                                    case m:
                                        return i.reconnectedEvent();
                                    default:
                                        return i.emptyEvent(e)
                                }
                            })
                        }(e.updates))
                    },
                    onData: b(t.onData),
                    onRequestError: b(t.onRequestError),
                    onHistoryLost: v(t.onHistoryLost),
                    onKeyExpired: v(t.onKeyExpired),
                    onLpBroken: v(t.onHistoryLost)
                },
                r = t.onEvents;

            function s(e, t, n) {
                a.ts = t;
                for (var s = 0; s < n.length; ++s) n[s].type === i.REFRESH_LP_KEY && (a.key = n[s].key, a.url = n[s].url);
                r(e, t, n)
            }
            var c = {
                options: a,
                isStopped: () => n,
                stopConnection() {
                    n = !0, a.stopFn && a.stopFn(), a.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection() {
                    this.stopConnection(), _(a, u), n = !1, h(a)
                },
                abortWaiting() {
                    a.waitAbortFns.forEach(e => e()), a.waitAbortFns = [], a.waitTimeout = 2
                },
                onLp: s
            };
            return h(a), c
        }

        function b(e) {
            return e || (() => {})
        }

        function v(e) {
            return e ? function() {
                return Promise.resolve(e(...arguments))
            } : () => Promise.reject()
        }
        var y = n("P+eJ"),
            O = n("vT4u");

        function E(e, t) {
            return f(e, {
                onEvents: t,
                onData: S,
                onRequestError: k,
                onHistoryLost: T,
                onKeyExpired: I,
                onLpBroken: M
            })
        }
        n.d(t, "createLongpoll", function() {
            return E
        });
        var C = 3e4,
            w = {},
            j = Date.now();

        function S(e, t) {
            if (t && t.status && e.lpstat) {
                var n = t.status;
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, n, t.getResponseHeader("x-frontend")), w[n] = n in w ? w[n] + 1 : 1, Date.now() - j >= C && (Object.keys(w).forEach(e => {
                    statlogsValueEvent("fc_longpoll", w[e], e, t.getResponseHeader("x-frontend"))
                }), w = {}, j = Date.now())
            }
        }

        function k(e) {
            Object(y.lpLogFc)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function T(e, t) {
            Object(y.lpLogFc)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function I(e) {
            return Object(y.lpLogFc)("red", "LP failed: key is incorrect; refresh key"), Object(r.post)(O.CONTROLLER, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function M() {
            throw window.nav.reload({
                force: !0
            }), new Error("ts is very wrong")
        }
    },
    lJdi: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE", function() {
            return s
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN", function() {
            return o
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE", function() {
            return l
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS", function() {
            return c
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK", function() {
            return d
        }), n.d(t, "MAIL_CHATS_ACTION_SEE_INVITE_LINK", function() {
            return u
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_INVITE_LINK", function() {
            return m
        }), n.d(t, "MAIL_CHATS_ACTION_INVITE_USER", function() {
            return g
        }), n.d(t, "MAIL_CHATS_ACTION_PIN_OR_UNPIN", function() {
            return p
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_TITLE", function() {
            return h
        }), n.d(t, "MAIL_CHATS_ACTION_ADD_ADMIN", function() {
            return _
        }), n.d(t, "canSeeInviteLink", function() {
            return v
        }), n.d(t, "canChangeInviteLink", function() {
            return y
        }), n.d(t, "canAddAdmin", function() {
            return O
        }), n.d(t, "canInviteUser", function() {
            return E
        }), n.d(t, "canKickUser", function() {
            return C
        }), n.d(t, "canPinOrUnpin", function() {
            return w
        }), n.d(t, "canChangeTitle", function() {
            return j
        }), n.d(t, "canChangeAvatar", function() {
            return S
        }), n.d(t, "canSeeAllMessages", function() {
            return k
        }), n.d(t, "checkChatRights", function() {
            return T
        }), n.d(t, "doesChatTabHaveFlag", function() {
            return I
        }), n.d(t, "isUserAdminInChat", function() {
            return M
        }), n.d(t, "isUserOwnerInChat", function() {
            return A
        }), n.d(t, "isUserInvitedByMe", function() {
            return L
        });
        n("OEbY");
        var a = n("rHUl"),
            r = n("aong"),
            i = n("P13b"),
            s = 1,
            o = 4,
            l = 8,
            c = 16,
            d = 32,
            u = "see_invite_link",
            m = "change_invite_link",
            g = "invite_user",
            p = "pin_unpin",
            h = "change_title",
            _ = "add_admin",
            f = {
                [u]: d,
                [m]: d,
                [_]: c,
                [g]: s,
                [p]: o,
                [h]: l
            },
            b = 1;

        function v(e, t, n) {
            return T(e, u, t, n)
        }

        function y(e, t, n) {
            return T(e, m, t, n)
        }

        function O(e, t, n, i) {
            var s = Object(r.unpackStore)(e);
            return !A(Object(a.getTab)(s, n || s.peer), t) && T(e, _, n, i)
        }

        function E(e, t, n) {
            return T(e, g, t, n)
        }

        function C(e, t, n, s) {
            var o = Object(r.unpackStore)(e);
            if (function(e, t) {
                    var n = Object(r.unpackStore)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, b)) return !0;
            var l = Object(a.getTab)(o, n || o.peer);
            return !(l.data.kicked && !l.data.closed) && (!Object(i.isFvkcomgroup)(e, n) && (!A(l, t) && (!!A(l, s = void 0 === s ? window.vk.id : s) || (M(l, s) ? !M(l, t) : L(l, t) && !M(l, t)))))
        }

        function w(e, t, n) {
            return T(e, p, t, n)
        }

        function j(e, t, n) {
            return T(e, h, t, n)
        }

        function S(e, t, n) {
            return j(e, t, n) && !Object(i.isFvkcomgroup)(e, t)
        }

        function k(e, t, n) {
            return !Object(a.isCommunityPeer)(n) || !!Object(a.getTab)(e, t).caccess[n]
        }

        function T(e, t, n, s) {
            var o = Object(r.unpackStore)(e);
            s = void 0 === s ? window.vk.id : s, n = void 0 === n ? o.peer : n;
            var l = Object(a.getTab)(o, n),
                c = !l.data.kicked && !l.data.closed,
                d = f[t];
            if (Object(i.isFvkcomgroup)(e, n)) switch (t) {
                case _:
                case g:
                    return !1;
                case u:
                    return c;
                default:
                    return o.gid > 0
            }
            switch (t) {
                case u:
                case m:
                case _:
                    return I(l, d) ? M(l, s) && c : A(l, s);
                case g:
                case p:
                case h:
                    return I(l, d) ? M(l, s) && c : c
            }
            return !1
        }

        function I(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function M(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function A(e, t) {
            return e.ownerId === t
        }

        function L(e, t) {
            return -1 !== e.invitedByMe.indexOf(t)
        }
    },
    nAFc: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "escape", function() {
            return s
        }), n.d(t, "decodeHTMLEntities", function() {
            return o
        }), n.d(t, "encodeHTMLEntities", function() {
            return l
        }), n.d(t, "prepareToWriting", function() {
            return c
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("Oyvg"), n("pIFo");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var r = window.Emoji,
            i = [
                ["&amp;", "&"],
                ["&lt;", "<"],
                ["&gt;", ">"],
                ["&quot;", '"']
            ];

        function s(e) {
            return i.reduce((e, t) => {
                var n = a(t, 2),
                    r = n[0],
                    i = n[1];
                return e.replace(new RegExp(i, "ig"), r)
            }, e)
        }

        function o(e) {
            return i.reduce((e, t) => {
                var n = a(t, 2),
                    r = n[0],
                    i = n[1];
                return e.replace(new RegExp(r, "ig"), i)
            }, e).replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(t))
        }

        function l(e) {
            return s(e).replace(/[\u00A0-\u9999<>\&]/gim, e => `&#${e.charCodeAt(0)};`)
        }

        function c(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.lineBreak,
                a = void 0 !== n && n,
                i = t.convertEmoji,
                l = void 0 === i || i,
                c = o(e);
            return c = c.replace(/\n\r/gi, "\n"), "oneline" === a ? c = c.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === a && (c = c.replace(/\n/gi, "<br>")), c = s(c), l && (c = r.emojiToHTML(c, !0)), c
        }
    },
    nyd8: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "updateLocation", function() {
            return s
        }), n.d(t, "updateLazyLocation", function() {
            return o
        });
        n("rGqo"), n("Btvt");
        var a = window,
            r = a.nav,
            i = a.extend;

        function s(e) {
            var t = i({}, r.objLoc, e);
            Object.keys(t).filter(e => "" === t[e]).forEach(e => {
                delete t[e]
            });
            var n = r.toStr(t);
            r.setLoc(n)
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
        n.r(t), n.d(t, "default", function() {
            return o
        });
        n("91GP"), n("ioFf"), n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = n("pemR");
        n("17x9");

        function i() {
            return (i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function s(e, t) {
            if (null == e) return {};
            var n, a, r = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
            }
            return r
        }

        function o(e) {
            var t = e.icon,
                n = e.aside,
                o = e.chevron,
                l = e.selectable,
                c = e.border,
                d = e.className,
                u = e.children,
                m = e.active,
                g = e.canBeHovered,
                p = void 0 === g || g,
                h = s(e, ["icon", "aside", "chevron", "selectable", "border", "className", "children", "active", "canBeHovered"]),
                _ = {
                    "ListItem--chevron": !!o,
                    "ListItem--selectable": !!l,
                    "ListItem--border": !!c,
                    "ListItem--active": !!m,
                    "ListItem--can-be-hovered": p
                };
            return a.createElement("li", i({}, h, {
                className: Object(r.classNames)("ListItem", _, d)
            }), t && a.createElement("div", {
                className: "ListItem__icon"
            }, t), a.createElement("div", {
                className: "ListItem__main"
            }, u), a.createElement("div", {
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
        n.r(t), n.d(t, "replaceHyperLinks", function() {
            return c
        }), n.d(t, "replaceEmailLinks", function() {
            return d
        }), n.d(t, "replaceMentions", function() {
            return u
        }), n.d(t, "replaceHashtags", function() {
            return p
        }), n.d(t, "confirmDelivery", function() {
            return h
        }), n.d(t, "linksReplacer", function() {
            return _
        });
        n("SRfc"), n("Oyvg"), n("pIFo");
        var a, r = n("h++7"),
            i = window,
            s = i.clean,
            o = i.replaceEntities,
            l = i.statlogsValueEvent;

        function c(e, t) {
            for (var n, a = 0, i = e; null !== (n = r.MESSAGE_REGEXP.exec(e));) {
                var s = (n = m(n))[0].length,
                    o = n.index + s,
                    l = e[n.index - 1],
                    c = e[o - 1],
                    d = void 0 !== l && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(l),
                    u = void 0 !== c && /([:;$])/i.test(c);
                if (!d && !u) {
                    var p = g(n),
                        h = p.domain.toLowerCase();
                    if (h.length <= r.MAX_DOMAIN_LENGTH && -1 !== r.TOP_DOMAINS.indexOf(h)) {
                        var _ = t(p);
                        i = i.slice(0, n.index + a) + _ + i.slice(o + a), a += _.length - s
                    }
                }
            }
            return i
        }

        function d(e, t) {
            return e.replace(r.EMAIL, t || function(e) {
                return `<a href="mailto:${e}">${e}</a>`
            })
        }

        function u(e, t) {
            return e.replace(r.MENTION, t || function(e, t, n, a, r) {
                return `<a href="/${t+n}" class="mem_link" mention="${s(a||"")}" mention_id="${s(t+n)}" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">${r}</a>`
            })
        }

        function m(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function g(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function p(e, t) {
            return e.replace((a || (a = new RegExp(r.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), a), (e, n, a, r, i, s) => (n || "") + t(a + (i || "")))
        }

        function h(e) {
            l("ttl_message_confirm_delivery", e)
        }

        function _(e, t) {
            var n = t.protocol,
                a = t.url,
                i = t.query,
                l = t.domain,
                c = t.full;
            try {
                c = decodeURIComponent(c)
            } catch (e) {}
            if (c.length > 55 && (c = c.substr(0, 53) + ".."), c = s(c).replace(/&amp;/g, "&"), !e && l.match(r.OUR_DOMAINS)) {
                var d, u = a = o(a).replace(r.ENTITIES, encodeURIComponent),
                    m = a.indexOf("#/"),
                    g = "";
                return m >= 0 ? u = a.substr(m + 1) : (m = a.indexOf("#!")) >= 0 && (u = "/" + a.substr(m + 2).replace(/^\//, "")), (d = u.match(r.VK_DOMAIN)) && d[1].length < 32 && (g = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + a + i) + '" target="_blank" rel="noopener"' + g + ">" + c + "</a>"
            }
            return `<a href="${`away.php?utf=1&to=${encodeURIComponent(n+o(a+i))}`}" target="_blank" rel="noopener" onclick="${`return goAway('${s((n+a+i).replace(/'/g,"\\'"))}', {}, event);`}">${c}</a>`
        }
    },
    rCUf: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getUploadVideoExtMasks", function() {
            return r
        }), n.d(t, "getUploadModule", function() {
            return s
        }), n.d(t, "onVideoUploaded", function() {
            return o
        });
        n("91GP"), n("pIFo");
        var a = n("8h6g");

        function r(e) {
            var t = a.VIDEO_UPLOAD_EXTS.slice(0, a.VIDEO_UPLOAD_EXTS.length);
            if ("types" === e) {
                for (var n = t.length, r = 0; r < n; ++r) t.push(t[r].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + a.VIDEO_UPLOAD_EXTS.join(",.") : ""
        }

        function i(e) {
            if (!cur.leaving) {
                var t = getLang("video_upload_changed"),
                    n = !1;
                if (each(window.cur.videoUploaders, (e, t) => {
                        Upload.isSomethingUploading(t) && (n = !0)
                    }), 1 === e) {
                    if (!n) return !0;
                    var a = showFastBox({
                        title: getLang("global_warning"),
                        dark: !0
                    }, t, getLang("global_continue"), function() {
                        cur.leaving = !0, a.hide(), cur.onContinueCb && cur.onContinueCb()
                    }, getLang("global_cancel"), function() {
                        a.hide(), nav.objLoc.section = "upload", nav.setLoc(nav.objLoc)
                    });
                    return !1
                }
                return n ? winToUtf(t.replace(/<\/?b>/g, "").replace(/<br\s*\/?>/g, "\n")) : void 0
            }
        }

        function s(e, t, n, s, l) {
            if (n) {
                s = s || cur, (l = l || {}).onUploadStart || (l.onUploadStart = e => {
                    boxQueue.hideLast(), cur.nav.push(function(e, t, n) {
                        if (!1 === i(1)) return cur.onContinueCb = nav.go.pbind(n), !1
                    }), cur.prevBefUnload = window.onbeforeunload, window.onbeforeunload = i, l.onUploadProgress(e, 0, 0), Wall.showEditPost && Wall.showEditPost(), l.onUploadStartDone && l.onUploadStartDone()
                }), l.onUploadComplete || (l.onUploadComplete = (e, t) => {
                    var n = window.parseJSON(t);
                    n.video_id ? o(e, n, s) : "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e);
                    l.onUploadCompleteDone && l.onUploadCompleteDone(), setTimeout(() => {
                        l.onUploadAllCompleteDone && !window.Upload.isSomethingUploading(e.ind) && l.onUploadAllCompleteDone()
                    })
                }), l.onUploadProgress || (l.onUploadProgress = (e, t, n) => {
                    var a = void 0 !== e.ind ? e.ind : e;
                    show("_im_media_preview"), s.showMediaProgress && s.showMediaProgress("video", a, function(e, t, n) {
                        return {
                            loaded: t,
                            total: n,
                            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
                        }
                    }(e, t, n))
                }), l.onUploadError || (l.onUploadError = (e, t) => {
                    statlogsValueEvent("upload_video_fails", 1, n.options.server, t),
                        function(e) {
                            var t = void 0 !== e.ind ? e.ind : e,
                                n = e.fileName ? t + "_" + e.fileName : e;
                            if (re("upload" + n + "_progress_wrap"), !geByClass1("popup_box_container")) {
                                var a = getLang("video_upload_error");
                                setTimeout(showFastBox({
                                    title: getLang("global_error")
                                }, a).hide, 2e3)
                            }
                            topError("Upload failed", {
                                dt: -1,
                                type: 102,
                                url: (ge("file_uploader_form" + t) || {}).action
                            }), Upload.embed(t)
                        }(e)
                }), cur.maxFiles = (cur.chooseParams || {}).maxFiles || 10;
                var c = cur.maxFiles - (cur.savedVideos || []).length,
                    d = browser.safari ? "" : "video/*," + r("accept");
                n.lang && (cur.lang = extend(cur.lang || {}, n.lang));
                var u = {
                        accept: d,
                        file_input: null,
                        file_name: "video_file",
                        file_size_limit: 1024 * (n.options.file_size_limit_in_GB || a.VIDEO_UPLOAD_MAX_FILE_SIZE_IN_GB) * 1024 * 1024,
                        file_types_description: "Video files",
                        file_types: r("types"),
                        chooseBox: 1,
                        chunked: 1,
                        chunkSize: a.VIDEO_UPLOAD_CHUNK_SIZE,
                        clear: 1,
                        dragEl: t === boxLayerWrap ? boxLayerWrap : bodyNode,
                        dropbox: t,
                        from: n.vars.from,
                        lang: n.lang,
                        max_attempts: 3,
                        max_files: c,
                        multiple: 1,
                        multi_progress: 1,
                        requestOptionsForFile: !0,
                        type: "video",
                        visibleDropbox: !n.options.hasOwnProperty("visible_dropbox") || n.options.visible_dropbox
                    },
                    m = Upload.init(e, "", {}, Object.assign(u, l));
                return window.cur.videoUploaders || (window.cur.videoUploaders = []), window.cur.videoUploaders.push(m), m
            }
        }

        function o(e, t, n, a) {
            n = n || cur;
            var r = void 0 !== e.ind ? e.ind : e,
                i = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                s = i ? r + "_" + i : e,
                o = t.owner_id + "_" + t.video_id,
                l = ge("upload" + s + "_progress_wrap");
            l && hide(geByClass1("progress_x", l)), ajax.post("al_video.php?act=a_videos_attach_info", {
                videos: o
            }, {
                onDone: e => {
                    n.chooseMedia("video", o, extend(e[o], {
                        upload_ind: s,
                        upload_new: !0
                    }));
                    var r = t.owner_id,
                        i = t.video_id,
                        l = t.video_hash,
                        c = 0,
                        d = () => {
                            ajax.post("al_video.php?act=encode_progress", {
                                oid: r,
                                vid: i,
                                hash: l,
                                need_thumb: 1
                            }, {
                                onDone: t => {
                                    var l = !0;
                                    if (t) {
                                        if (t.error) return void
                                        function(e) {
                                            setTimeout(showFastBox({
                                                title: getLang("global_error")
                                            }, e).hide, 2e3)
                                        }(getLang("video_upload_encode_error"));
                                        t.thumb && (l = !1, ajax.post("al_video.php", {
                                            act: "a_video_photo_sizes",
                                            oid: r,
                                            vid: i
                                        }, {
                                            onDone: t => {
                                                n.hasChosenMedia("video", o) ? n.updateChosenMedia("video", o, extend(t, {
                                                    upload_ind: s,
                                                    upload_new: !0
                                                })) : a && a(e, o)
                                            }
                                        }))
                                    }
                                    l && n.hasChosenMedia("video", o) && setTimeout(d, 1e3)
                                },
                                onFail: () => {
                                    ++c < 3 && setTimeout(d, 2e3 * c)
                                }
                            })
                        };
                    d()
                }
            })
        }
        t.default = {
            getUploadModule: (e, t, n, a, r) => s(e, t, n, a, r),
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
                                a = getXY(n)[1],
                                r = getSize(t)[1];
                            return hide("video_choose_wrap"), setStyle(t, "height", scrollGetY() + window.clientHeight() - a + r), cancelEvent(e)
                        }
                    },
                    t = e => cancelEvent(e),
                    n = e => {
                        if (t(), e.dataTransfer.files.length && Upload.checkFilesSizes(window.videoInlineUploader, e.dataTransfer.files)) return window.Upload && Upload.checked && Upload.checked[window.videoInlineUploader] && Upload.onFileApiSend(window.videoInlineUploader, e.dataTransfer.files), cancelEvent(e)
                    },
                    a = () => {
                        addEvent(boxLayerWrap, "dragenter dragover", e), addEvent(boxLayerWrap, "dragleave", t), addEvent(boxLayerWrap, "drop", n)
                    };
                a(), setTimeout(curBox().setOptions.pbind({
                    onHide: () => {
                        removeEvent(boxLayerWrap, "dragenter dragover", e), removeEvent(boxLayerWrap, "dragleave", t), removeEvent(boxLayerWrap, "drop", n)
                    },
                    onShow: () => {
                        a()
                    }
                }), 0)
            }
        }
    },
    rHUl: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getFirstUnread", function() {
            return d
        }), n.d(t, "isSearchShown", function() {
            return u
        }), n.d(t, "getPeer", function() {
            return m
        }), n.d(t, "getCurrentKeyboard", function() {
            return g
        }), n.d(t, "getKeyboard", function() {
            return p
        }), n.d(t, "getTab", function() {
            return h
        }), n.d(t, "getCurrentTab", function() {
            return _
        }), n.d(t, "getSelectedMessages", function() {
            return f
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return b
        }), n.d(t, "countUnread", function() {
            return v
        }), n.d(t, "getMessageByRid", function() {
            return y
        }), n.d(t, "isRidExist", function() {
            return O
        }), n.d(t, "getLocalId", function() {
            return E
        }), n.d(t, "getLastMessage", function() {
            return C
        }), n.d(t, "parserMessage", function() {
            return w
        }), n.d(t, "getAuthorFullName", function() {
            return j
        }), n.d(t, "getMessage", function() {
            return S
        }), n.d(t, "getPreviousMessage", function() {
            return k
        }), n.d(t, "isClassicInterface", function() {
            return T
        }), n.d(t, "isLocksAvailable", function() {
            return I
        }), n.d(t, "isFoldersAvailable", function() {
            return M
        }), n.d(t, "isCommunityInterface", function() {
            return A
        }), n.d(t, "isChannel", function() {
            return L
        }), n.d(t, "getBareTab", function() {
            return P
        }), n.d(t, "isReversedDialogs", function() {
            return D
        }), n.d(t, "isFullyLoadedTab", function() {
            return x
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return N
        }), n.d(t, "isGoToEndVisible", function() {
            return R
        }), n.d(t, "getUnreadScrollBottom", function() {
            return B
        }), n.d(t, "isSendingAvailable", function() {
            return F
        }), n.d(t, "isCommunityPeer", function() {
            return H
        }), n.d(t, "isCommunityBlocked", function() {
            return U
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return G
        }), n.d(t, "isSearching", function() {
            return q
        }), n.d(t, "getSearchText", function() {
            return $
        }), n.d(t, "isSearchingValue", function() {
            return z
        }), n.d(t, "isRecentSearchesActive", function() {
            return K
        }), n.d(t, "getPinnedMessage", function() {
            return V
        }), n.d(t, "doPopularSuggExist", function() {
            return W
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return Y
        }), n.d(t, "getGroupId", function() {
            return Q
        }), n.d(t, "getTabDraft", function() {
            return X
        }), n.d(t, "getTemplates", function() {
            return J
        }), n.d(t, "tabIsMessageRequest", function() {
            return Z
        }), n.d(t, "removeMessageRequestFolderFlags", function() {
            return ee
        }), n.d(t, "isMessageRequestFolder", function() {
            return te
        }), n.d(t, "tabIsOutgoingMessageRequest", function() {
            return ne
        }), n.d(t, "existsIncomingMessageRequest", function() {
            return ae
        }), n.d(t, "isMessageRequestChangedEvent", function() {
            return re
        });
        n("Vd3H"), n("rGqo"), n("Btvt");
        var a = n("MhhX"),
            r = n("f01n"),
            i = n("h++7"),
            s = n("86+7"),
            o = n("rjmT"),
            l = n("aong"),
            c = n("lJdi");

        function d(e, t) {
            var n = Object(l.unpackStore)(e),
                r = n.tabs[n.peer];
            return Object.keys(r.msgs).filter(n => {
                var i = S(e, t, n);
                return !Object(a.isOut)(i) && intval(n) > r.in_up_to
            })[0]
        }

        function u(e) {
            return Object(l.unpackStore)(e).searchShown
        }

        function m(e) {
            return Object(l.unpackStore)(e).peer
        }

        function g(e) {
            return p(e, m(e))
        }

        function p(e, t) {
            return (h(e, t) || {}).keyboard
        }

        function h(e, t) {
            var n = Object(l.unpackStore)(e);
            return n.tabs && n.tabs[t]
        }

        function _(e) {
            var t = Object(l.unpackStore)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function f(e) {
            return Object(l.unpackStore)(e).selectedMessages
        }

        function b(e, t, n) {
            var r = h(e, t),
                i = f(e)[0];
            if (void 0 === i) return [n];
            var s = Math.min(n, i),
                o = Math.max(n, i);
            return Object.keys(r.msgs).filter(e => e >= s && e <= o).filter(t => {
                var n = S(e, e.get().peer, t);
                return !Object(a.isServiceMsg)(n) && !Object(a.isCallMessage)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = h(Object(l.unpackStore)(t), e),
                r = 0;
            for (var i in n.msgs)
                if (n.msgs.hasOwnProperty(i)) {
                    var s = S(t, e, i);
                    Object(a.isOut)(s) || (r += Object(a.isUnread)(n, s) ? 1 : 0)
                }
            return r
        }

        function y(e, t, n) {
            var a = h(e, t);
            return Object.keys(a.msgs).filter(a => intval(S(e, t, a).randomId) === n).length > 0
        }

        function O(e, t, n) {
            return !!y(e, t, n)
        }

        function E(e, t) {
            var n = Object(l.unpackStore)(e),
                a = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== a ? 2e9 + a : t
        }

        function C(e, t, n) {
            var a = h(e, t),
                i = S(e, t, n),
                s = Object.keys(a.msgs).filter(n => {
                    var a = S(e, t, n),
                        s = a.local && a.type !== r.EDIT_MESSAGE;
                    return !(!i.local && s) && (!(!i.local || s) || E(e, i.messageId) > E(e, a.messageId))
                }).pop();
            return s ? S(e, t, s) : null
        }

        function w(e) {
            return e && e.length > 0 ? r.addMessageEvent([0].concat(e)) : e
        }

        function j(e, t, n) {
            var r = h(e, t),
                i = S(e, t, n),
                o = Object(l.unpackStore)(e);
            return Object(a.isOut)(i) ? Object(s.oCacheGet)(e, o.id).name : i.userId !== i.peerId ? !!Object(s.oCacheExists)(e, i.userId) && Object(s.oCacheGet)(e, i.userId).name : r.tab
        }

        function S(e, t, n) {
            var a = h(e, t),
                r = a && a.msgs && a.msgs[n];
            return r ? w(r) : null
        }

        function k(e, t, n) {
            var a = h(e, t),
                r = a && a.msgs && Object.keys(a.msgs).sort((e, t) => +e - t);
            if (!r) return null;
            var i = r && r.indexOf("" + n),
                s = i > -1 ? r[i - 1] : null;
            return a.msgs[s]
        }

        function T(e) {
            var t = Object(l.unpackStore)(e);
            return t.gid || t.isClassic
        }

        function I(e) {
            return Object(l.unpackStore)(e).gid
        }

        function M(e) {
            return Object(l.unpackStore)(e).gid
        }

        function A(e) {
            return !!Object(l.unpackStore)(e).gid
        }

        function L(e, t) {
            return !!(t.peerId > 2e9 && Object(c.doesChatTabHaveFlag)(t, 1024))
        }

        function P(e, t) {
            var n = Object(l.unpackStore)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function D(e) {
            var t = Object(l.unpackStore)(e);
            return !!A(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === i.FOLDER_UNRESPOND || t.active_tab === i.FOLDER_UNREAD))
        }

        function x(e, t) {
            var n = (e = Object(l.unpackStore)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function N(e, t) {
            var n = h(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function R(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function B(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function F(e) {
            return !Object(l.unpackStore)(e).lockedSending
        }

        function H(e) {
            return e > -2e9 && e < 0
        }

        function U(e, t) {
            return !!H(t) && !!h(e, t).blocked_community
        }

        function G(e) {
            return Object(l.unpackStore)(e).voice_message_available
        }

        function q(e) {
            var t = Object(l.unpackStore)(e);
            return !(!$(t) && !t.recentSearch)
        }

        function $(e) {
            return Object(l.unpackStore)(e).searchText
        }

        function z(e, t) {
            var n = Object(l.unpackStore)(e);
            return !!(t && t !== $(e) || n.recentSearch)
        }

        function K(e) {
            return Object(l.unpackStore)(e).recentSearch
        }

        function V(e) {
            var t = _(e);
            return t && t.pinned && w(t.pinned)
        }

        function W(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function Y(e) {
            return 1 == Object(l.unpackStore)(e).isEditing
        }

        function Q(e) {
            return Object(l.unpackStore)(e).gid
        }

        function X(e) {
            return e.draft || (e.draft = Object(o.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
        }

        function J(e) {
            return (Object(l.unpackStore)(e).templates || []).filter(e => !e.deleted)
        }

        function Z(e) {
            return !!e && (e.is_message_request || e.folders & i.FOLDER_MASKS[i.FOLDER_MESSAGE_REQUEST] || e.folders & i.FOLDER_MASKS[i.FOLDER_MESSAGE_REQUEST_REJECTED])
        }

        function ee(e) {
            return e & ~i.FOLDER_MASKS[i.FOLDER_MESSAGE_REQUEST] & ~i.FOLDER_MASKS[i.FOLDER_MESSAGE_REQUEST_REJECTED]
        }

        function te(e) {
            return Object(l.unpackStore)(e).active_tab === i.FOLDER_MESSAGE_REQUEST
        }

        function ne(e) {
            return e.peerId > 19e8 && e.peerId < 2e9
        }

        function ae(e) {
            return !!Object(l.unpackStore)(e).dialog_tab_cts[i.FOLDER_MESSAGE_REQUEST]
        }

        function re(e) {
            var t = e.type,
                n = e.updateType;
            return t === r.CONVERSATION_UPDATED && (n === r.MAIL_CHAT_UPDATE_TYPE_MESSAGE_REQUEST_CHANGED || n === r.MAIL_CHAT_UPDATE_TYPE_CONTACT_CONVERTED)
        }
    },
    rjmT: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ImDraft", function() {
            return o
        }), n.d(t, "loadDraftForPeer", function() {
            return c
        });
        n("rE2o"), n("ioFf"), n("rGqo"), n("KKXr"), n("VRzm"), n("Btvt"), n("OEbY"), n("pIFo");
        var a = n("BxOC"),
            r = n("f01n"),
            i = n("vT4u");

        function s(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
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

        function l(e) {
            switch (e.type) {
                case "mail":
                case "reply":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function c(e, t) {
            return new o(e, "draft_" + t)
        }
        o.prototype.dump = function() {
            var e;
            this._key && this._db.updateByKey(this._key, {
                txt: (e = this.dData).txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                cancelled: e.cancelled.length ? e.cancelled : void 0
            })
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
            var a = this.dData.attaches.findIndex(n => n.type === e && n.id === t); - 1 === a ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: n
            }), this.dump()) : "video" !== e && "poll" !== e || (this.dData.attaches[a] = {
                type: e,
                id: t,
                object: n
            }, this.dump())
        }, o.prototype.syncWithSelector = function(e) {
            var t = this.getFwdRaw();
            this.dData.attaches = (t ? [t] : []).concat(e.getMedias().map(e => {
                var t = s(e, 2),
                    n = t[0],
                    a = t[1];
                return this.dData.attaches.find(e => e.type == n && e.id == a) || {
                    type: n,
                    id: a
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
            return e ? e.flags & r.FLAG_HAS_REPLY && !this.dData.attaches.find(e => "mail" !== e.type) : this.hasAttaches() && !this.dData.attaches.find(e => "reply" !== e.type)
        }, o.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, o.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, o.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, o.prototype.prepareObjects = function(e, t) {
            return this.dData.attaches.find(l) ? Object(a.post)(i.CONTROLLER, {
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
        var a = n("0/R4");
        e.exports = function(e, t) {
            if (!a(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
            return e
        }
    },
    tuSo: function(e, t, n) {
        n("7DDg")("Int32", 4, function(e) {
            return function(t, n, a) {
                return e(this, t, n, a)
            }
        })
    },
    "uW+i": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return i
        });
        n("rGqo"), n("Btvt"), n("hhXQ");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));
        class i extends a.Component {
            constructor(e) {
                super(e), this.getActiveTab = () => {
                    var e = this.props.active,
                        t = [],
                        n = null;
                    return this.props.children.forEach(a => {
                        a.key === e ? n = a : t.push(a)
                    }), n || (Number.isInteger(e) && t.length > e ? t[e] : t[0])
                }, this.onClick = (e, t) => {
                    if (t !== this.state.active) {
                        var n = this.refsStore[t],
                            a = this.getTransform(n);
                        this.setState({
                            active: t,
                            isAnimating: !0,
                            transform: a
                        }), this.props.onTabClick(e, t)
                    }
                }, this.onTransitionEnd = e => {
                    "transform" === e.propertyName && this.setState({
                        isAnimating: !1
                    })
                }, this.getRef = (e, t) => {
                    this.refsStore[e] = t
                };
                var t = this.getActiveTab();
                this.refsStore = {}, this.state = {
                    isAnimating: !1,
                    active: t.key
                }
            }
            static reactifyTabs(e) {
                return (Array.isArray(e) ? e : Object.values(e)).map(e => a.createElement("a", {
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
                return a.createElement("nav", {
                    className: Object(r.classNames)("Tabs", this.props.className, e),
                    style: this.props.style
                }, a.createElement("ul", {
                    className: "Tabs__list"
                }, this.props.children.map((e, t) => a.createElement("li", {
                    className: Object(r.classNames)("Tabs__item", {
                        "Tabs__item--active": this.state.active === (e.key || t)
                    }),
                    onClick: n => this.onClick(n, e.key || t),
                    ref: n => this.getRef(e.key || t, n),
                    key: e.key || t
                }, e))), a.createElement("div", {
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
        n.r(t), n.d(t, "RECENT_SEARCH_OP", function() {
            return r
        }), n.d(t, "PIN_HIDDEN_ID_OP", function() {
            return i
        }), n.d(t, "deleteOldStoredFormat", function() {
            return c
        }), n.d(t, "mount", function() {
            return d
        });
        n("rE2o"), n("ioFf"), n("rGqo");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var r = "recent_search",
            i = "pin_hide";

        function s(e) {
            return "im_store_" + e
        }

        function o(e) {
            return ls.get(s(e)) || {}
        }

        function l(e, t, n) {
            if (ls.checkVersion()) {
                var a = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", a.length), n(s(e), a)
            }
        }

        function c(e, t) {
            for (var n = ["fwd", "draft", "bind_attach"], a = o(e), r = !1, i = n.length; i--;) n[i] in a && (delete a[n[i]], r = !0);
            r && l(e, a, t)
        }

        function d(e) {
            var t = debounce((e, t) => {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && c(e, t);
            var n = {
                    db: o(e),
                    checkTime: Date.now()
                },
                d = function(e, t, n) {
                    n.key === s(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", d, !1), {
                select: (t, a) => (Date.now() - n.checkTime > 1e3 && (n.db = o(e)), function(e, t, n) {
                    return t === r ? e[t] || [] : t === i ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                }(n.db, t, a)),
                selectByKey: t => (Date.now() - n.checkTime > 1e3 && (n.db = o(e)), n.db[t]),
                update(s, o) {
                    var c = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case r:
                                var s = n;
                                s && s.length > 0 ? e[t] = s : delete e[t];
                                break;
                            case i:
                                var o = a(n, 2),
                                    l = o[0],
                                    c = o[1];
                                c ? e[t][l] = +c : delete e[t][l]
                        }
                        return e
                    }(n.db, s, o);
                    return n.db = c, n.checkTime = Date.now(), l(e, c, t)
                },
                updateByKey: (a, r) => (n.db[a] = r, n.checkTime = Date.now(), l(e, n.db, t)),
                unmount() {
                    window.removeEventListener("storage", d, !1)
                }
            }
        }
    },
    vRp6: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "default", function() {
            return l
        });
        n("rE2o"), n("ioFf"), n("rGqo");
        var a = n("q1tI"),
            r = (n("17x9"), n("UlUB")),
            i = n("PjZB"),
            s = n("pemR");

        function o(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class l extends a.Component {
            constructor(e) {
                super(e), this.checkLoad = Object(r.default)(e => {
                    var t = o(e, 3),
                        n = t[0],
                        a = t[1],
                        r = t[2];
                    if (!this.loading) return this.props.virtualized || this.props.hasMore ? void(a - n - r <= this.props.threshold && (this.loading = !0, this.props.loadMore().then(() => {
                        this.loading = !1
                    }))) : this.detachListeners()
                }, 34), this.onScroll = e => {
                    var t = this.getScrollData();
                    this.props.virtualized && this.processChildren(this.props.children, t), this.props.hasMore && this.checkLoad(t)
                }, this.getRef = e => {
                    this.container = e, this.props.virtualized && this.setState(this.getChildrenData(this.props.children, this.getScrollData()))
                }, this.useWindowScroll = e.useWindowScroll, e.virtualized && (this.state = {
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
                    a = this.getChildrenData(e, t || this.getScrollData()),
                    r = a.start,
                    i = a.end,
                    s = a.before,
                    o = a.after;
                r === n.start && i === n.end && s === n.before && o === n.after || this.setState(a)
            }
            getChildrenData(e, t) {
                var n = o(t, 3),
                    a = n[0],
                    r = n[1],
                    i = n[2],
                    s = this.useWindowScroll ? window : this.container,
                    l = s && s.offsetHeight;
                if (!s || 0 === r || 0 === i) return {
                    start: 0,
                    end: 0,
                    before: 0,
                    after: e.length
                };
                i = Math.max(i, l);
                var c = e.length,
                    d = Math.max(Math.floor(a / this.props.itemHeight) - 1, 0),
                    u = Math.min(Math.floor((a + 2 * i) / this.props.itemHeight + 1), c);
                return {
                    start: d,
                    end: u,
                    before: d,
                    after: c - u
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
                return a.createElement("div", {
                    className: Object(s.classNames)("InfiniteScroll", this.props.className),
                    ref: this.getRef,
                    style: this.props.style
                }, this.props.virtualized && this.state.before > 0 && a.createElement("div", {
                    style: {
                        height: this.state.before * this.props.itemHeight
                    },
                    key: "before"
                }), this.props.virtualized ? [].concat(this.props.children).slice(this.state.start, this.state.end) : this.props.children, this.props.virtualized && this.state.after > 0 && a.createElement("div", {
                    style: {
                        height: this.state.after * this.props.itemHeight
                    },
                    key: "after"
                }), this.props.hasMore && (this.props.loader || a.createElement("div", {
                    className: "InfiniteScroll__loader",
                    key: "loader"
                }, a.createElement(i.default, null))))
            }
        }
        l.defaultProps = {
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
        n.r(t), n.d(t, "CONTROLLER", function() {
            return C
        }), n.d(t, "ACTIVITY_PERIOD", function() {
            return w
        }), n.d(t, "ACTIVITY_TYPE_TYPING", function() {
            return j
        }), n.d(t, "ACTIVITY_TYPE_RECORDING_AUDIO", function() {
            return S
        }), n.d(t, "ACTION_PRIORITIES", function() {
            return A
        }), n.d(t, "loadHashes", function() {
            return L
        }), n.d(t, "strHistory", function() {
            return N
        }), n.d(t, "updateBlockStates", function() {
            return R
        }), n.d(t, "loadPeer", function() {
            return B
        }), n.d(t, "restoreHistoryQueue", function() {
            return F
        }), n.d(t, "removeFailed", function() {
            return H
        }), n.d(t, "selectPeer", function() {
            return G
        }), n.d(t, "selectPeerOnMessage", function() {
            return $
        }), n.d(t, "changePeer", function() {
            return z
        }), n.d(t, "updateMentions", function() {
            return K
        }), n.d(t, "setActions", function() {
            return V
        }), n.d(t, "loadMoreHistory", function() {
            return W
        }), n.d(t, "loadLessHistory", function() {
            return Y
        }), n.d(t, "readLastMessages", function() {
            return X
        }), n.d(t, "markAudioMessageAsListened", function() {
            return J
        }), n.d(t, "loadLongPollKey", function() {
            return Z
        }), n.d(t, "loadLongPollTs", function() {
            return ee
        }), n.d(t, "setMessageErrored", function() {
            return te
        }), n.d(t, "resendMessage", function() {
            return ne
        }), n.d(t, "loadAdmins", function() {
            return re
        }), n.d(t, "updateVideoThumb", function() {
            return oe
        }), n.d(t, "editMessage", function() {
            return le
        }), n.d(t, "addMessage", function() {
            return ce
        }), n.d(t, "markInboundMessagesAsRead", function() {
            return ue
        }), n.d(t, "markOutboundMessagesAsRead", function() {
            return me
        }), n.d(t, "initTextStore", function() {
            return ge
        }), n.d(t, "processFwd", function() {
            return pe
        }), n.d(t, "mergeTabs", function() {
            return he
        }), n.d(t, "updateOnline", function() {
            return _e
        }), n.d(t, "setActivity", function() {
            return fe
        }), n.d(t, "updateActivity", function() {
            return be
        }), n.d(t, "waitActivity", function() {
            return ve
        }), n.d(t, "sendMessage", function() {
            return Oe
        }), n.d(t, "deliverMessage", function() {
            return Ee
        }), n.d(t, "deliverEditedMessage", function() {
            return Ce
        }), n.d(t, "addSelection", function() {
            return we
        }), n.d(t, "cleanSelected", function() {
            return je
        }), n.d(t, "dropSelection", function() {
            return Se
        }), n.d(t, "replaceMessage", function() {
            return ke
        }), n.d(t, "saveMedia", function() {
            return Te
        }), n.d(t, "loadMedia", function() {
            return Ie
        }), n.d(t, "addAttachmentsToStoreData", function() {
            return Me
        }), n.d(t, "replaceMediaAttachesStore", function() {
            return Ae
        }), n.d(t, "setCurrentSearchDate", function() {
            return Le
        }), n.d(t, "setInplaceSearch", function() {
            return Pe
        }), n.d(t, "setCurrentSearch", function() {
            return De
        }), n.d(t, "searchHints", function() {
            return xe
        }), n.d(t, "searchHintsIndex", function() {
            return Ne
        }), n.d(t, "localIndexToDialog", function() {
            return Re
        }), n.d(t, "searchTopConv", function() {
            return Fe
        }), n.d(t, "searchImTopConv", function() {
            return He
        }), n.d(t, "searchLocalHints", function() {
            return Ue
        }), n.d(t, "preloadSearchIndex", function() {
            return Ge
        }), n.d(t, "loadDialogs", function() {
            return qe
        }), n.d(t, "searchMessages", function() {
            return $e
        }), n.d(t, "isSearchAllLoaded", function() {
            return ze
        }), n.d(t, "isSearchingInplace", function() {
            return Ke
        }), n.d(t, "cancelSearch", function() {
            return Ve
        }), n.d(t, "clearDate", function() {
            return We
        }), n.d(t, "searchInplaceStart", function() {
            return Ye
        }), n.d(t, "searchMessagesInplace", function() {
            return Qe
        }), n.d(t, "loadImportant", function() {
            return Xe
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
            return at
        }), n.d(t, "restoreMessageSend", function() {
            return rt
        }), n.d(t, "acceptMessageRequest", function() {
            return st
        }), n.d(t, "rejectMessageRequest", function() {
            return ot
        }), n.d(t, "sendTyping", function() {
            return lt
        }), n.d(t, "sendRecordingAudio", function() {
            return ct
        }), n.d(t, "forwardMessages", function() {
            return dt
        }), n.d(t, "prepareForward", function() {
            return ut
        }), n.d(t, "deletedDialog", function() {
            return mt
        }), n.d(t, "flushHistory", function() {
            return gt
        }), n.d(t, "updateChatTopic", function() {
            return pt
        }), n.d(t, "loadChatInfo", function() {
            return ht
        }), n.d(t, "addNewMemberOptimisticly", function() {
            return _t
        }), n.d(t, "addNewMember", function() {
            return ft
        }), n.d(t, "loadChatMember", function() {
            return bt
        }), n.d(t, "checkNewPeople", function() {
            return vt
        }), n.d(t, "loadNewPeople", function() {
            return yt
        }), n.d(t, "updateChatPhoto", function() {
            return Ot
        }), n.d(t, "updateActions", function() {
            return Et
        }), n.d(t, "leaveChat", function() {
            return Ct
        }), n.d(t, "returnToChat", function() {
            return wt
        }), n.d(t, "toggleMutePeer", function() {
            return jt
        }), n.d(t, "setMutedPeer", function() {
            return St
        }), n.d(t, "setExecStack", function() {
            return kt
        }), n.d(t, "favMessage", function() {
            return Tt
        }), n.d(t, "updateFavMessage", function() {
            return It
        }), n.d(t, "updateImportant", function() {
            return Mt
        }), n.d(t, "loadSpam", function() {
            return At
        }), n.d(t, "flushSpam", function() {
            return Lt
        }), n.d(t, "setCreationType", function() {
            return Pt
        }), n.d(t, "getOwnerPhoto", function() {
            return Dt
        }), n.d(t, "presetAvatar", function() {
            return xt
        }), n.d(t, "setChatPhoto", function() {
            return Nt
        }), n.d(t, "createChat", function() {
            return Rt
        }), n.d(t, "resync", function() {
            return Bt
        }), n.d(t, "toggleSendingAbility", function() {
            return Ft
        }), n.d(t, "setDelayedMessage", function() {
            return Ht
        }), n.d(t, "isAnythingLoading", function() {
            return Ut
        }), n.d(t, "updateUnreadCount", function() {
            return Gt
        }), n.d(t, "changeSubmitSettings", function() {
            return qt
        }), n.d(t, "updateFavAndTitle", function() {
            return $t
        }), n.d(t, "saveHistoryScroll", function() {
            return zt
        }), n.d(t, "filterFromTab", function() {
            return Kt
        }), n.d(t, "changeDialogsTab", function() {
            return Vt
        }), n.d(t, "updateFolderState", function() {
            return Yt
        }), n.d(t, "toggleDialogImportant", function() {
            return Qt
        }), n.d(t, "markDialogAnswered", function() {
            return Xt
        }), n.d(t, "getMutexQueue", function() {
            return Jt
        }), n.d(t, "releaseBlock", function() {
            return Zt
        }), n.d(t, "toggleCommunityMute", function() {
            return en
        }), n.d(t, "deleteDialog", function() {
            return tn
        }), n.d(t, "restoreDialog", function() {
            return nn
        }), n.d(t, "spamDialog", function() {
            return an
        }), n.d(t, "updateTabbedPeers", function() {
            return rn
        }), n.d(t, "isEverythingLoaded", function() {
            return sn
        }), n.d(t, "cleanTab", function() {
            return on
        }), n.d(t, "stringifyTab", function() {
            return ln
        }), n.d(t, "updateGoToEndVisibility", function() {
            return cn
        }), n.d(t, "toggleCommunityMessages", function() {
            return dn
        }), n.d(t, "updateHistory", function() {
            return un
        }), n.d(t, "syncHistory", function() {
            return mn
        }), n.d(t, "startRecording", function() {
            return gn
        }), n.d(t, "cancelRecording", function() {
            return pn
        }), n.d(t, "setVoiceMessageAvail", function() {
            return hn
        }), n.d(t, "toggleConversation", function() {
            return _n
        }), n.d(t, "updateSearchQuery", function() {
            return fn
        }), n.d(t, "initializeChatResize", function() {
            return bn
        }), n.d(t, "joinChat", function() {
            return vn
        }), n.d(t, "getInviteLink", function() {
            return yn
        }), n.d(t, "resetInviteLink", function() {
            return On
        }), n.d(t, "leaveInvitation", function() {
            return En
        }), n.d(t, "saveRecentSearchPeer", function() {
            return Cn
        }), n.d(t, "resetRecentSearch", function() {
            return wn
        }), n.d(t, "removeFromRecentSearch", function() {
            return jn
        }), n.d(t, "pinMessageOptimistic", function() {
            return Sn
        }), n.d(t, "unpinMessageOptimistic", function() {
            return kn
        }), n.d(t, "pinMessage", function() {
            return Tn
        }), n.d(t, "unpinMessage", function() {
            return In
        }), n.d(t, "getPinnedMessage", function() {
            return Mn
        }), n.d(t, "getMessageLocalId", function() {
            return An
        }), n.d(t, "getChatMembers", function() {
            return Ln
        }), n.d(t, "getChatDetails", function() {
            return Pn
        }), n.d(t, "updateFlags", function() {
            return Dn
        }), n.d(t, "removeChatPhoto", function() {
            return xn
        }), n.d(t, "kickUserOptimisticly", function() {
            return Nn
        }), n.d(t, "kickUser", function() {
            return Rn
        }), n.d(t, "toggleAdminOptimisticly", function() {
            return Bn
        }), n.d(t, "toggleAdmin", function() {
            return Fn
        }), n.d(t, "checkChatMember", function() {
            return Hn
        }), n.d(t, "hidePromoTooltip", function() {
            return Un
        }), n.d(t, "videoAutoPlayHandler", function() {
            return Gn
        }), n.d(t, "hideTopBannerAction", function() {
            return qn
        }), n.d(t, "callbackTopBannerAction", function() {
            return $n
        }), n.d(t, "loadBanner", function() {
            return zn
        }), n.d(t, "setKeyboard", function() {
            return Kn
        }), n.d(t, "deleteKeyboard", function() {
            return Vn
        }), n.d(t, "toggleKeyboard", function() {
            return Wn
        }), n.d(t, "loadKeyboard", function() {
            return Yn
        }), n.d(t, "changeCommunityAccess", function() {
            return Qn
        }), n.d(t, "deleteTemplate", function() {
            return Xn
        }), n.d(t, "createTemplate", function() {
            return Jn
        }), n.d(t, "updateTemplate", function() {
            return Zn
        }), n.d(t, "resetTabAll", function() {
            return ea
        }), n.d(t, "updateMessageRequestsCounter", function() {
            return ta
        });
        n("rE2o"), n("ioFf"), n("a1Th"), n("OG14"), n("OEbY"), n("Vd3H"), n("tUrg"), n("91GP"), n("SRfc"), n("rGqo"), n("VRzm"), n("Btvt");
        var a = n("BxOC"),
            r = n("nyd8"),
            i = n("f01n"),
            s = n("DM26"),
            o = n("eTng"),
            l = n("aong"),
            c = n("uytb"),
            d = n("P13b"),
            u = n("h++7"),
            m = n("rHUl"),
            g = n("MhhX"),
            p = n("86+7"),
            h = n("ERyv"),
            _ = n("Wu9C"),
            f = n("lJdi"),
            b = n("O8ze"),
            v = n("zxIV"),
            y = n("XzvV");

        function O() {
            return (O = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function E(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(a = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
                } catch (e) {
                    r = !0, i = e
                } finally {
                    try {
                        a || null == o.return || o.return()
                    } finally {
                        if (r) throw i
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var C = "al_im.php",
            w = 5,
            j = "typing",
            S = "audiomessage",
            k = Object(r.updateLazyLocation)(),
            T = k.scheduleNav,
            I = k.commitNav,
            M = k.scheduleNavWithTimeOut;
        var A = {
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

        function L(e, t, n) {
            return Object(a.post)(C, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function P(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(a => a ? t(...n) : function(e) {
                if (!e.renew_hashes) {
                    var t = e.last_hashes_update || 0;
                    if (Date.now() - t < 1e4) return Promise.resolve();
                    var n = Object.keys(e.tabs).filter(t => Object(d.isFullyLoadedTab)(e, t));
                    e.renew_hashes = L(n, {}, e).then(t => {
                        var a = E(t, 2),
                            r = a[0],
                            i = a[1];
                        return n.forEach(t => {
                            e.tabs[t].hash = r[t]
                        }), e.writeHash = i, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                    })
                }
                return e.renew_hashes
            }(e).then(e => t(...n)))
        }

        function D(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e(...t).catch(a => {
                    if (a && a.match && a.match(/1001;/)) return P(n, e, t);
                    throw a
                })
            }
        }

        function x(e) {
            return "string" == typeof e ? Object(v.se)(`<div>${e}</div>`) : e
        }

        function N(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function R(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function B(e, t, n, r, i) {
            return i.tabHistoryNotChanged = !1, Object(s.retryFn)(a.post, 3, e => e - 1)(C, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: i.prevPeer,
                gid: i.gid,
                block: r
            }).then(t => {
                var a = E(t, 5),
                    r = a[0],
                    s = a[1],
                    o = a[2],
                    l = a[3],
                    c = a[4];
                if (s.forEach(e => Object(p.oCacheAdd)(i, e)), i.tabs || (i.tabs = {}), i.dialog_tab_cts = Object.assign({}, c, {
                        [u.FOLDER_MESSAGE_REQUEST]: i.dialog_tab_cts[u.FOLDER_MESSAGE_REQUEST]
                    }), i.tabs[e] || (i.tabs[e] = Object(d.normalizeTab)(i, r)), R(l, i), n) {
                    if (i.tabs[e]) {
                        var m = i.tabs[e].lastmsg,
                            g = i.tabs[e].lastmsg_meta;
                        extend(i.tabs[e], r), i.tabs[e].lastmsg = m, i.tabs[e].lastmsg_meta = g
                    }
                } else extend(i.tabs[e], r);
                return i.admins = extend(i.admins, o), i.imQueue(e, !1), Gn(), F(e, i)
            }).catch(e => Object(h.imWeirdCatch)("loadPeer", e))
        }

        function F(e, t) {
            var n = t.imQueue(e, !1),
                a = t.tabs[e],
                r = n.filter(n => !Object(m.isRidExist)(t, e, n.rid));
            return a.msgs = r.reduce((e, t) => (e["rid" + t.rid] = t.mess, e), a.msgs), t.imQueueSet(e, r), t.tabs[e].history = Object(d.restoreQueue)(r, t, x(t.tabs[e].history)), Promise.resolve(t)
        }

        function H(e, t, n) {
            var a = n.imQueue(e, !1).filter(e => e.failed && e.mess.messageId !== t);
            return n.imQueueSet(e, a), n.tabs[e].history = Object(d.removeMessages)([t], x(n.tabs[e].history)), Promise.resolve(n)
        }

        function U(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(a.post)(C, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(e => {
                return R(E(e, 1)[0], t)
            })
        }

        function G(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(t => (t.tabHistoryNotChanged = !1, Object(d.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && U(n, t), Promise.resolve(t).then(V)) : (Object(d.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), B(n, e, !1, !0, t)))).then(V).then(q.bind(null, n))
        }

        function q(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(d.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(d.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function $(e, t, n) {
            var a = n.msgid,
                r = n.peer;
            return !e && Object(d.isFullyLoadedTab)(n, r) && n.tabs[r].msgs[a] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && U(r, n), Promise.resolve(n).then(V).then(q.bind(null, r))) : B(r, !0, a, !0, n).then(V).then(() => {
                return Object(m.getTab)(n, r).msgid = a, n
            }).then(q.bind(null, r))
        }

        function z(e, t, n, a) {
            if (Ut(a)) throw Object(d.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading something");
            var r = a.gid ? "gim" + a.gid : "im";
            if (a.prevPeer = a.peer, a.peer = e, a.msgid = t || "", a.currentEntryPoint = n, cur.peer = e, T({
                    sel: e ? Object(d.convertPeerToUrl)(e) : null,
                    msgid: a.msgid,
                    email: "",
                    0: r
                }), 0 != a.prevPeer && q(a.prevPeer, a, !0), 0 !== e) {
                Object(d.isTabLoaded)(a, e) && q(e, a, !0), rn(a.tabbedPeers.map(e => e.peer).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(a.tabbedPeers) : a.tabbedPeers.map(t => (t.peer == e && "perm" !== t.type && (t.type = "perm"), t)), !1, a)
            } else rn(a.tabbedPeers, !1, a);
            return I(), Ve(a.prevPeer, a)
        }

        function K(e) {
            cur.wallMentions = () => new Promise((t, n) => {
                if (cur.wallMentions = [], !Object(d.isChatPeer)(e.peer) || !Object(d.isFullyLoadedTab)(e, e.peer) || Object(d.isFvkcomgroup)(e, e.peer)) return n();
                var a = e.tabs[e.peer];

                function r() {
                    var n = [];
                    Object.keys(a.msgs || {}).reverse().forEach(e => {
                        var t = Object(m.parserMessage)(a.msgs[e]),
                            r = t && t.userId;
                        r && r != vk.id && -1 === n.indexOf(r) && Object(d.isUserAliveInChat)(a, r) && n.push(r)
                    }), (a.memberIds || []).forEach(e => {
                        -1 === n.indexOf(e) && n.push(e)
                    });
                    var r = [];
                    n.forEach(t => {
                        if (Object(p.oCacheExists)(e, t)) {
                            var n = Object(p.oCacheGet)(e, t),
                                a = n.link.substring(1);
                            r.push([n.id, n.name, "@" + a, n.photo, void 0, void 0, void 0, a, n.first_name])
                        }
                    }), t(r)
                }
                a.membersLoaded ? r() : Ln(e.peer, e).then(r)
            })
        }

        function V(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                a = [],
                r = Object(d.isChatPeer)(t) && (n.data.closed || n.data.kicked),
                i = Object(d.isFvkcomgroup)(e, t);
            n.offset && a.push("photos"), n.offset && a.push("search"), (t < -2e9 || n.offset) && !i && a.push("clear"), Object(d.isCommunityInterface)(e) && !i && a.push("block"), i && !r && a.push("settings"), Object(d.isCommunityPeer)(t) && (n.can_send_notify ? a.push("block_notify") : a.push(n.blocked_community ? "allow_community" : "block_community")), (Object(d.isChatPeer)(t) || Object(d.isUserPeer)(t) || Object(d.isCommunityPeer)(t)) && !Object(d.isCommunityInterface)(e) && (Object(d.isChatPeer)(t) && (n.data.kicked || n.data.closed) || a.push(inArray(t, e.mutedPeers) ? "unmute" : "mute")), Object(d.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && a.push("invite"), Object(d.isChatPeer)(t) && !r && (Object(f.canInviteUser)(e) && a.push("invite"), e.gid || a.push("leave")), Object(d.isChatPeer)(t) && n.data.closed && !n.data.kicked && a.push("return"), Object(d.isChatPeer)(t) && n.pinned && (a.push(Object(_.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), Object(f.canPinOrUnpin)(e) && a.push("unpin"));
            var s = Object(d.chatActions)(e, i);
            return e.curActions = a.sort((e, t) => A[e] - A[t]).reduce((e, t) => (e[t] = s[t], e), {}), Promise.resolve(e)
        }

        function W(e, t, n) {
            var r = n.tabs[n.peer];
            return Object(a.post)(C, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: r.offset + (r.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(e => {
                var t = E(e, 4),
                    a = t[0],
                    i = t[1],
                    s = t[2],
                    o = t[3];
                return r.allShown = s, n.admins = extend(n.admins, o), r.history = a + N(r.history), r.historyToAppend = a, r.offset += Object.keys(i).length, r.msgs = extend(r.msgs, i), n
            })
        }

        function Y(e) {
            var t = e.tabs[e.peer];
            return Object(a.post)(C, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(n => {
                var a = E(n, 5),
                    r = a[0],
                    i = a[1],
                    s = a[2];
                a[3], a[4];
                t.allShown = t.allShown || s, t.history = N(t.history) + r, t.historyToAppend = r;
                var o = Object.keys(i).length;
                return t.skipped -= o, t.offset += o, t.msgs = extend(t.msgs, i), e
            })
        }

        function Q(e, t, n, a) {
            var r = e.tabs[t];
            return a === i.FLAG_OUTBOUND && r.out_up_to > n ? e : (a === i.FLAG_OUTBOUND ? r.out_up_to = n : r.in_up_to = n, e)
        }
        var X = D(function(e, t) {
                if (Object(d.tabIsMessageRequest)(t.tabs[e])) return Promise.resolve(t);
                var n = t.tabs[e],
                    r = n.msgs || {},
                    s = Object.keys(r).map(n => Object(m.getMessage)(t, e, n)).filter(e => !Object(g.isOut)(e)).map(e => e.messageId).sort((e, t) => t - e);
                return n.skipped > 0 && (s = s.filter(e => intval(e) <= n.lastmsg - n.skipped)), (s = intval(s.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([i.readInboundEvent([6, e, s])]), Object(a.post)(C, {
                    peer: e,
                    ids: [s],
                    hash: n.hash,
                    act: "a_mark_read",
                    gid: t.gid
                }).then(() => Q(t, e, s, i.FLAG_OUTBOUND)))
            }),
            J = D(function(e, t, n) {
                var r = n.tabs[e];
                return Object(a.post)(C, {
                    peer: e,
                    id: t,
                    hash: r.hash,
                    act: "a_mark_listened",
                    gid: n.gid
                })
            });

        function Z(e) {
            return Object(a.post)(C, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(t => {
                var n = E(t, 3),
                    a = n[0],
                    r = n[1],
                    i = n[2];
                return extend({}, e, {
                    imKey: a,
                    imUrl: r,
                    imPart: i
                })
            })
        }

        function ee(e) {
            return Object(a.post)(C, {
                act: "a_get_ts",
                gid: e.gid
            }).then(t => {
                var n = E(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function te(e, t, n) {
            var a = n.tabs[e];
            return a.msgs[t.messageId] && (a.msgs[t.messageId].errored = 1, a.history = Object(d.setMessageError)(e, t, x(a.history))), Promise.resolve(n)
        }

        function ne(e, t, n, a) {
            var r = a.tabs[e];
            return r.msgs[t] && (r.msgs[t].errored = 0, r.lastmsg_meta = n, r.lastmsg = t, r.history = Object(d.startResendMessage)(e, t, x(r.history))), Promise.resolve(a)
        }

        function ae(e, t, n, a) {
            var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce((e, i) => (!n && !Kt(i)(t) || r && !r(i, e[i], t) || (e[i] = Object(l.arrayUnique)(a(e[i], i))), e), e.dialog_tabs))
        }

        function re(e, t) {
            return 0 === e.length ? Promise.resolve(t) : Object(a.post)(C, {
                act: "a_get_admin",
                admins: e.join(","),
                gid: t.gid
            }).then(e => {
                var n = E(e, 1)[0];
                return t.admins = extend(t.admins, n), t
            })
        }

        function ie(e, t) {
            if (!inArray(e, t.tabbedPeers.map(e => e.peer)) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                rn(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function se(e, t, n) {
            return Object(d.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
        }

        function oe(e, t) {
            var n = e.get().peer,
                a = Object(m.getTab)(e, n);
            if (Object(d.isFullyLoadedTab)(e, n)) {
                var r = x(a.history);
                a.history = Object(d.updateMessageInCache)(e, r, t)
            }
        }

        function le(e, t) {
            var n = Object(m.getTab)(t, e.peerId);
            if (Object(d.isFullyLoadedTab)(t, e.peerId)) {
                var a = x(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(d.editAndReplaceMessage)(t, e, a)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var r = n && n.pinned && Object(m.parserMessage)(n.pinned);
            return r && r.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function ce(e, t) {
            var n = e.flags & i.FLAG_OUTBOUND,
                a = e.peerId;
            if (Object(d.isTabLoaded)(t, a)) {
                var r = t.tabs[a];
                if (r.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = {
                        [e.messageId]: 0
                    } : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n || Object(d.tabIsMessageRequest)(r) ? r.unread = 0 : (r.lastmsg == e.messageId && r.unread ? de(t, 1, e.peerId) : (!r.unread && de(t, 1, e.peerId), r.unread++), ie(e.peerId, t)), Object(d.isFullyLoadedTab)(t, a)) {
                    var s = x(r.history);
                    r.skipped > 0 && r.skipped++, r.offset++, r.msgs[e.messageId] = extend(!0, {}, e), r.history = Object(d.appendToHistory)(t, e, s, !0, !0, !0), Object(g.isOut)(e) && (r.blocked_community = 0, V(t))
                }
                if (r.typing) {
                    var o = r.typing.userIds.indexOf(e.userId);
                    o >= 0 && r.typing.userIds.splice(o, 1)
                }
                return r.lastmsg = e.messageId, r.lastmsg_meta = e, q(e.peerId, t), ae(t, r, !1, se.bind(null, a), Wt.bind(null, t)), Promise.resolve(t)
            }
            return B(a, 0, 0, 0, t).then(t => {
                return ae(t, t.tabs[a], !1, se.bind(null, a), Wt.bind(null, t)), q(e.peerId, t), n || ie(e.peerId, t), t
            })
        }

        function de(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function ue(e, t) {
            if (Object(d.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    a = n.unread;
                if (t = Q(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(m.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), a > 0 && !n.unread && de(t, -1, e.peerId), !n.skipped) {
                    var r = x(n.history);
                    n.history = Object(d.removewNewUnreadBarAndMerge)(t, r, e.peerId)
                }
            } else Object(d.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && de(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(d.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[u.FOLDER_UNREAD] = t.dialog_tabs[u.FOLDER_UNREAD].filter(t => intval(t) !== e.peerId)), 0 !== t.unread_cnt || t.active_tab !== u.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : Vt(u.FOLDER_ALL, t)
        }

        function me(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(d.isTabLoaded)(t, e.peerId) && Q(t, e.peerId, e.upToId, i.FLAG_OUTBOUND), Object(d.isFullyLoadedTab)(t, e.peerId)) {
                var a = x(n.history);
                n.history = Object(d.markMessagesAsRead)(t, e.peerId, a)
            }
            return Promise.resolve(t)
        }

        function ge(e, t, n, a, r) {
            return r.text = {}, r.imQueue = e, r.imQueueResend = t, r.imQueueSet = n, r.imQueueComplete = a, Promise.resolve(r)
        }

        function pe(e, t, n) {
            function a(e, t) {
                return {
                    id: e.messageId,
                    text: e.text,
                    date: e.date,
                    kludges: e.kludges,
                    authorName: t
                }
            }
            if (1 === e.length) {
                var r = e[0],
                    i = Object(m.getMessage)(n, t, r),
                    s = Object(m.getAuthorFullName)(n, t, r);
                return !1 === s ? n.set(bt.bind(null, {
                    [t]: [i.userId]
                })).then(n => {
                    var s = Object(m.getAuthorFullName)(n, t, r);
                    return {
                        msgIds: e,
                        object: a(i, s)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: a(i, s)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function he(e, t) {
            Object(d.normalizeTabsGotFromServer)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce((n, a) => {
                var r = t.tabs[a] ? t.tabs[a].msgs : {},
                    i = extend({}, r || {}, e[a].msgs || {});
                return n[a] = extend(t.tabs[a] || {}, e[a]), i && (n[a].msgs = i), e[a].lastmsg || (n[a].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function _e(e, t, n, a) {
            var r = Object(m.getTab)(a, e);
            if (r) {
                var i = !1 !== t ? mobPlatforms[t] ? 1 : 0 : r.last_seen[2];
                r.online = t, r.last_seen = [t, n || r.last_seen[1], i]
            }
            return Promise.resolve(a)
        }

        function fe(e, t, n) {
            var a = Object(m.getTab)(n, e.peerId);
            return a && (e.ts = Date.now() / 1e3, a.activity || (a.activity = {}), a.activity[t] = e, a.typing === j && (a.typing = e)), Promise.resolve(n)
        }

        function be(e, t) {
            var n = Object(m.getTab)(t, e.peerId),
                a = Object(g.isAudioMsg)(e) ? "audiomessage" : "typing";
            return n && n.activity && n.activity[a] && (n.activity[a].userIds = n.activity[a].userIds.filter(t => t !== e.userId)), Promise.resolve(t)
        }

        function ve(e, t, n) {
            var a = e.peerId;
            return Object(s.pause)(w + 2).then(() => {
                if (Object(d.isTabLoaded)(n, a)) {
                    var e = n.tabs[a];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * w && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * w && (e.typing = void 0)
                }
                return n
            })
        }

        function ye(e) {
            var t = {},
                n = e.find(e => "poll" === e[0]);
            if (n) {
                var a = E(n, 3)[2];
                Object.assign(t, a)
            }
            return t
        }
        var Oe = function(e, t, n, r) {
                var i = Date.now() + rand(0, 100).toFixed(0),
                    s = r.ref_id,
                    l = r.ref_source;
                r.ref_source = void 0, r.ref_id = void 0, (l || s) && (T({
                    ref_source: null,
                    ref: null
                }), I()), Object(b.statlogsSendingQueueLength)(r);
                var c = t.attaches.length > 0,
                    d = Object(b.statlogsSendingTime)(r, "send", "server", c),
                    u = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: l,
                        ref: s,
                        msg: t.message,
                        payload: t.payload,
                        media: Object(o.convertAttachesToPhpMedia)(t.attaches),
                        guid: i,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : r.gid,
                        entrypoint: r.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, ye(t.attaches));
                return Object(a.post)(C, u, 2e4).then(e => {
                    var t = E(e, 1)[0];
                    return d(), r.version !== t.version && nav.reload({
                        force: !0
                    }), r.currentEntryPoint = "", r
                }).catch(e => {
                    throw Object(b.statlogsSendingError)(r, e, "send", "server_send"), e
                })
            },
            Ee = D(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    a = arguments.length > 3 ? arguments[3] : void 0,
                    r = a.tabs[e];
                return Oe(e, t, O({
                    hash: r.hash
                }, n), a)
            }),
            Ce = D(function(e, t, n) {
                var r = t.attaches.length > 0,
                    i = Object(b.statlogsSendingTime)(n, "edit", "server", r);
                return Object(a.post)(C, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: Object(o.convertAttachesToPhpMedia)(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, ye(t.attaches)), 2e4).then(e => {
                    E(e, 1)[0];
                    return i(), n
                }).catch(e => {
                    throw Object(b.statlogsSendingError)(n, e, "edit", "server_send"), e
                })
            });

        function we(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(t => t !== e[0]);
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(l.arrayUnique)(n).sort((e, t) => e - t)
            }
            return Promise.resolve(t)
        }

        function je(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Se(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function ke(e, t) {
            if (Object(d.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    a = t.imQueue(e.peerId).filter(t => t.failed && t.rid !== e.randomId);
                t.imQueueSet(e.peerId, a), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(d.replaceMessageAttrs)(t, x(n.history), e)
            }
            return Promise.resolve(t)
        }

        function Te(e, t) {
            return Promise.resolve()
        }

        function Ie(e, t) {
            var n = Object(b.statlogsSendingTime)(t, "unknown", "attach"),
                r = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(s.retryFn)(a.post, 3, e => e * e)(C, r).then(a => (n(), Me(e, a, t))).catch(n => (Object(b.statlogsSendingError)(t, n, "unknown", "server_load_attach"), Me(e, null, t)))
        }

        function Me(e, t, n) {
            var a = n.tabs[e.peerId];
            return a.mediacontent || (a.mediacontent = {}), a.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], Ae(e, n)
        }

        function Ae(e, t) {
            var n = t.tabs[e.peerId];
            return n.history = Object(d.replaceAttaches)(x(n.history), e, t), Promise.resolve(t)
        }

        function Le(e, t, n) {
            var a = Object(d.dayFromVal)(t),
                r = n.tabs[e];
            return r.searchDay = a, r.searchOffset = 0, r.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Pe(e, t, n) {
            return n.tabs[t].searchText = e, Ye(t, n), n
        }

        function De(e, t, n) {
            if (t) {
                var a = n.tabs[t];
                a.searchText = e, a.searchOffset = 0, a.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function xe(e, t, n, r, i) {
            var s = +new Date;
            return Object(a.post)(C, {
                act: "a_hints",
                str: e,
                gid: r.hidegid ? 0 : i.gid,
                query: n,
                peerIds: t.join(",")
            }).then(t => {
                var n = E(t, 3),
                    a = n[0],
                    r = n[1];
                return R(n[2], i), r.forEach(e => Object(p.oCacheAdd)(i, e)), he(a, i), Object(y.saveSearchAttemptStats)("messages", s, a && a.length, e), Object.keys(a).sort((e, t) => a[e].order - a[t].order).map(e => a[e])
            })
        }

        function Ne(e, t, n, a) {
            return xe(e, t, n, {}, a).then(e => e.map(e => ({
                peerId: e.peerId,
                name: e.tab,
                photo: e.photo,
                online: e.online,
                is_friend: "friends" === n
            })))
        }

        function Re(e) {
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
                var a = (t ? e.search(t) : e.list).map(Re);
                return n.mapped_index || (n.mapped_index = {}), a.forEach(e => {
                    n.mapped_index[e.peerId] = e
                }), a
            })
        }
        var Fe = Be(e => e.topConvTree),
            He = Be(e => e.imTopConvTree),
            Ue = Be(e => e.hintsTree);

        function Ge(e, t) {
            var n, r, i;
            t.topConvTree = new Promise(e => {
                n = e
            }), t.hintsTree = new Promise(e => {
                r = e
            }), t.imTopConvTree = new Promise(e => {
                i = e
            });
            var o = e.select(c.RECENT_SEARCH_OP);
            return Object(s.retryFn)(a.post, 1, () => 4)(C, {
                act: "a_dialogs_preload",
                rs: o.join(","),
                gid: t.gid
            }).catch(e => [
                [],
                [],
                []
            ]).then(e => {
                var a = E(e, 4),
                    s = a[0],
                    o = a[1],
                    l = a[2],
                    c = a[3];
                return t.popular_sugg = l, new vkIndexer(s, e => e[1], n), new vkIndexer(o, e => e[1], r), c && c.length > 0 ? new vkIndexer(c, e => e[1], i) : i(), t
            })
        }

        function qe(e) {
            var t, n = e.active_tab;
            return t = e.dialog_tabs[n].length > 0 ? Math.min.apply(null, e.dialog_tabs[n].map(t => e.tabs[t].lastmsg)) : 0, Object(a.post)(C, {
                act: "a_get_dialogs",
                start_message_id: t,
                tab: n,
                gid: e.gid
            }).then(t => {
                var a = E(t, 4),
                    r = a[0],
                    i = a[1],
                    s = a[2],
                    o = a[3];
                return s.forEach(t => Object(p.oCacheAdd)(e, t)), R(o, e), he(i, e), e.dialog_tabs[n] = e.dialog_tabs[n].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[n] = !r.has_more, Promise.resolve(e)
            })
        }
        var $e = D(function(e, t) {
            return Object(a.post)(C, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(n => {
                var a = E(n, 5),
                    r = a[0],
                    i = a[1],
                    s = a[2],
                    o = a[3],
                    l = a[4];
                return i.forEach(e => Object(p.oCacheAdd)(t, e)), Object(d.normalizeTabsGotFromServer)(t, r), e === t.searchText && (t.searchOffset = o, t.searchAllLoaded = l), Object.keys(r).filter(e => !t.tabs[e]).forEach(e => {
                    t.tabs[e] = r[e]
                }), [r, s]
            })
        });

        function ze(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function Ke(e, t) {
            return !(t.peer !== e || !Object(d.isFullyLoadedTab)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Ve(e, t) {
            if (Object(d.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, T({
                    st: ""
                }), I()
            }
            return Promise.resolve(t)
        }

        function We(e, t) {
            if (Object(d.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Ye(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Qe = D(function(e, t) {
            var n = t.tabs[e],
                r = "";
            if (Ye(e, t), n.searchDay && (r = `day:${n.searchDay}`), !r && !n.searchText) return Promise.reject();
            var i = `in:${e} ${r} ${n.searchText||""}`;
            return T({
                st: n.searchText
            }), I(), Object(a.post)(C, {
                act: "a_search",
                q: i,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(e => {
                var t = E(e, 3),
                    a = t[0],
                    r = t[1],
                    i = t[2];
                return n.searchOffset = r, n.searchAllLoaded = i, a
            })
        });

        function Xe(e) {
            return Object(a.post)(C, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Je(e, t) {
            var n = Object(m.getTab)(e, t);
            return Object(a.post)(C, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(a => {
                var r = E(a, 2),
                    i = r[0],
                    s = r[1];
                n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
                var o = E(s, 3);
                n.unread = o[0], n.in_up_to = o[1], n.out_up_to = o[2], n.unread || (e.get().dialog_tabs[u.FOLDER_UNREAD] = e.get().dialog_tabs[u.FOLDER_UNREAD].filter(e => e != t)), ae(e.get(), n, !1, se.bind(null, t), Wt.bind(null, e.get()))
            })
        }

        function Ze(e, t, n) {
            if (Object(d.isFullyLoadedTab)(n, t)) {
                var a = n.tabs[t];
                a.deleted = a.deleted ? a.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function et(e, t, n) {
            if (Object(d.isFullyLoadedTab)(n, t)) {
                var a = n.tabs[t];
                a.history = Object(d.removeMessages)(e, x(a.history)), a.offset -= e.filter(e => a.msgs[e]).length, e.forEach(e => delete a.msgs[e]), e.forEach(e => {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var tt = D(function(e, t, n, r, i) {
            return Object(a.post)(C, {
                act: "a_mark",
                peer: t,
                hash: n || i.tabs[t].hash,
                gid: i.gid,
                msgs_ids: e.join(","),
                mark: r
            })
        });

        function nt(e, t, n, a) {
            if (Object(d.isFullyLoadedTab)(a, t)) {
                var r = a.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e, r.history = Object(d.removeMessagesWithRestore)(e, t, n, x(r.history)), r.offset -= e.filter(e => r.msgs[e]).length
            }
            return Promise.resolve(a)
        }

        function at(e, t, n) {
            if (Object(d.isFullyLoadedTab)(n, t)) {
                var a = n.tabs[t];
                a.deleted && (a.deleted = a.deleted.filter(t => t !== e)), a.history = Object(d.restoreMessage)(e, t, x(a.history)), a.offset++
            }
            return Promise.resolve(n)
        }

        function rt(e, t, n, r) {
            return Object(a.post)(C, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: r
            })
        }
        var it = D(function(e, t, n) {
                return Object(d.tabIsMessageRequest)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(a.post)(C, {
                    act: "a_activity",
                    type: t,
                    peer: e,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(() => n, () => n))
            }),
            st = D((e, t) => Object(a.post)(C, {
                act: "a_accept_message_request",
                user_id: e,
                hash: t.tabs[e].hash
            }).then(() => {
                var n = t.tabs[e];
                return n.is_message_request = !1, n.folders = Object(m.removeMessageRequestFolderFlags)(n.folders), t
            })),
            ot = D((e, t) => Object(a.post)(C, {
                act: "a_reject_message_request",
                user_id: e,
                hash: t.tabs[e].hash
            }).then(() => (ae(t, t.tabs[e], !0, t => t.filter(t => t !== e)), rn(t.tabbedPeers.filter(t => t.peer !== e), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null, t))),
            lt = D(function(e, t) {
                return it(e, j, t)
            }),
            ct = D(function(e, t) {
                return it(e, S, t)
            });

        function dt(e, t, n, a) {
            return t && (a.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(a)
        }

        function ut(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function mt(e, t, n) {
            if (Object(d.isTabLoaded)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, ae(n, n.tabs[e], !0, t => t.filter(t => t !== e)), n.tabs[e].unread > 0 && de(n, -1, e);
                var a = n.tabs[e];
                return a.deletedDialog = !0, rn(n.tabbedPeers.filter(t => t.peer !== e), !0, n), t.then(t => {
                    var r = E(t, 2);
                    r[0], r[1];
                    return delete n.blockedFlagUpdates[e], a.msgs = null, a.history = null, a.unread = 0, a.lastmsg = !1, a.lastmsg_meta = null, n
                })
            }
        }
        var gt = D(function(e, t) {
                return mt(e, Object(a.post)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            pt = D(function(e, t, n) {
                return Object(a.post)(C, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(() => n)
            }),
            ht = D(function(e, t) {
                return Object(a.post)(C, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(n => {
                    var a = E(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], a), t
                })
            });

        function _t(e, t, n) {
            var a = n.tabs[e];
            return a.memberIds = [].concat(a.memberIds, t).filter((e, t, n) => n.indexOf(e) === t), a.membersCount = a.memberIds.length, Promise.resolve(n)
        }
        var ft = D(function(e, t, n) {
            return Object(a.post)(C, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(e => n)
        });

        function bt(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(t => `${t}:${e[t].join(",")}`).join(";");
            return Object(a.post)(C, {
                act: "a_load_member",
                need: n
            }).then(e => {
                return E(e, 1)[0].forEach(e => Object(p.oCacheAdd)(t, e)), t
            })
        }

        function vt(e, t, n) {
            var a = {},
                r = n.get();

            function s(e, t) {
                Object(d.isChatPeer)(e) && t && !Object(p.oCacheExists)(r, t) && (a[e] ? -1 === a[e].indexOf(t) && a[e].push(t) : a[e] = [t])
            }
            var o = t.filter(e => !Object(d.isTabLoaded)(r, e.peerId)).map(e => e.peerId);
            t.forEach(e => {
                s(e.peerId, e.userId)
            }), e.forEach(e => {
                s(e.peerId, +e.kludges.source_mid)
            });
            var l = t.filter(e => e.flags & i.FLAG_OUTBOUND && !e.local).map(e => e.kludges.from_admin).filter(e => e && !r.admins[e]);
            return 0 === Object.keys(a).length && 0 === l.length && 0 === o.length ? Promise.resolve(r) : {
                shouldLoad: Object.keys(a).length > 0 || l.length > 0 || o.length > 0,
                needMembers: a,
                needAdminIds: l,
                needPeers: o
            }
        }

        function yt(e, t, n) {
            var a = e.needMembers,
                r = e.needAdminIds,
                i = e.needPeers;
            return t.pause(), Promise.all([bt(a, n), re(r, n), Promise.all(i.map(e => B(e, 0, 0, 0, n)))]).catch(() => n).then(() => t.resume()).then(() => n)
        }
        var Ot = D(function(e, t) {
            return e.kludges.source_act === d.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(a.post)(C, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(n => {
                var a = E(n, 2),
                    r = a[0],
                    i = a[1];
                t.chat_photo_msg = i;
                var s = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = r[0], t.tabs[e.peerId].photoLarge = r[1], Object(d.isFullyLoadedTab)(t, e.peerId)) {
                    var o = e.kludges.source_act;
                    s.history = Object(d.addChatPhotoToUpdate)(e, o, t, x(s.history))
                }
                return t
            })
        });

        function Et(e, t, n, a) {
            return t !== vk.id ? Promise.resolve(a) : (Object(d.isTabLoaded)(a, n) && a.peer == n && (a = V(a)), Promise.resolve(a))
        }
        var Ct = D(function(e, t) {
                return Object(a.post)(C, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(Et.bind(null, d.CHAT_KICK_USER, vk.id, e, t))
            }),
            wt = D(function(e, t) {
                return Object(a.post)(C, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(Et.bind(null, d.CHAT_INVITE_USER, vk.id, e, t))
            }),
            jt = D(function(e, t, n) {
                return Object(a.post)(C, {
                    act: "a_mute",
                    peer: e,
                    hash: n.tabs[e].hash,
                    gid: n.gid,
                    value: t ? 1 : 0
                }).then(() => {
                    var a = t ? "mute" : "unmute";
                    return window.Notifier && Notifier.lcSend("im", {
                        act: a,
                        peer: e
                    }), n
                }).then(St.bind(null, e, t))
            });

        function St(e, t, n) {
            var a = n.mutedPeers.filter(t => t !== e);
            return t && a.push(e), n.mutedPeers = a, cur.mutedPeers = n.mutedPeers, V(n)
        }

        function kt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var Tt = D(function(e, t, n, r) {
            return It(e, n, t, r), Object(a.post)(C, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: r.gid,
                peer: n,
                hash: r.tabs[n].hash
            }).then(() => r)
        });

        function It(e, t, n, a) {
            if (Object(d.isFullyLoadedTab)(a, t)) {
                var r = a.tabs[t];
                e.filter(e => r.msgs[e]).forEach(e => {
                    var s = Object(m.getMessage)(a, t, e),
                        o = n ? s.flags | i.FLAG_IMPORTANT : s.flags & ~i.FLAG_IMPORTANT;
                    s.flags = o, r.msgs[e] = s, r.history = Object(d.updateStar)(e, n, x(r.history))
                })
            }
            return Promise.resolve(a)
        }

        function Mt(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function At(e, t) {
            return Object(a.post)(C, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Lt(e, t) {
            return Object(a.post)(C, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function Pt(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Dt(e, t) {
            return Object(a.post)(C, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function xt(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }

        function Nt(e, t, n) {
            return Object(a.post)("al_page.php", {
                act: "owner_photo_save",
                peer: e,
                _query: t
            }).then(e => n)
        }
        var Rt = D(function(e, t, n, r) {
            return r.creating = !0, r.longpoll.pause(), Object(a.post)(C, {
                act: "a_multi_start",
                hash: r.writeHash,
                peers: t.join(","),
                title: n
            }).then(e => {
                var t = E(e, 1)[0];
                return r.next_peer = t.peerId, r.tabs[t.peerId] = t, ae(r, t, !1, e => [t.peerId].concat(e)), r.longpoll.resume(), r
            }).then(t => e ? Nt(t.next_peer, e, t) : t).then(e => (e.creating = !1, e)).catch(e => {
                throw r.creating = !1, r.longpoll.resume(), e
            })
        });

        function Bt(e) {
            var t;
            e.resync_in_process = new Promise(e => {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                r = e.active_tab;
            return Object(a.post)(C, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: r,
                add_peers: e.tabbedPeers.map(e => e.peer).join(",")
            }).then(n => {
                var a = E(n, 5),
                    i = a[0],
                    s = a[1],
                    o = a[2],
                    c = a[3],
                    m = a[4];
                s.forEach(t => Object(p.oCacheAdd)(e, t)), Object(d.normalizeTabsGotFromServer)(e, i), o.user_unread && handlePageCount("msg", o.user_unread), Object(l.lplog)("Resync success", "success");
                var g, h = e.peer;
                if (Object(d.isReservedPeer)(h)) g = Promise.resolve(!1);
                else {
                    var _ = {
                        tabs: {
                            [h]: e.tabs[h]
                        },
                        oCache: {}
                    };
                    g = he({
                        [h]: i[h]
                    }, _)
                }
                return g.then(n => {
                    e.tabs = i, e.admins = extend(e.admins, c), n && (e.tabs[h] = n.tabs[h], e.tabs[h].history = Object(d.restoreQueue)(h, e, x(e.tabs[h].history))), e.loadingDialogs = !1, e.mutedPeers = o.mutedPeers, e.lastDialogsOptions = {
                        has_more: o.has_more
                    }, e.dialog_tab_cts = Object.assign({}, o.folder_cts, {
                        [u.FOLDER_MESSAGE_REQUEST]: e.dialog_tab_cts[u.FOLDER_MESSAGE_REQUEST]
                    }), e.dialog_tabs[r] = m.map(intval);
                    var a = e.dialog_tabs[r].map(t => e.tabs[t]);
                    return Object.keys(e.dialog_tabs).filter(e => e != r).forEach(t => {
                        r == u.FOLDER_ALL ? e.dialog_tabs[t] = a.filter(Kt(t)).map(e => e.peerId) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Gt(intval(o.unread), e)
                })
            }).catch(t => (Object(l.lplog)("Resync error: " + t.message + " " + t.stack, "error"), Object(s.pause)(2).then(Bt.bind(null, e))))
        }

        function Ft(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Ht(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Ut(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(e => Upload.isSomethingUploading(e)).length > 0
        }

        function Gt(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[u.FOLDER_UNREAD] = e, Promise.resolve(t)
        }

        function qt(e, t) {
            return t.ctrl_submit = !!e, Object(a.post)(C, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(e => t)
        }

        function $t(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var a = document.title,
                r = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var i = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var a = Object.keys(n.cur_unread_cnt).length;
                        if (0 === a) return Object(v.setDocumentTitle)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(v.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (a > 9 ? 10 : a) + t + ".ico"), Object(v.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", a))))
                    }
                }(a, r, n);
                n.update_title_to = setInterval(i, 1e3), i()
            } else !t && n.update_old_title && (Object(v.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, a = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + r + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function zt(e, t, n, a, r) {
            return Object(d.isFullyLoadedTab)(r, e) && (r.tabs[e].scrollTop = intval(t), r.tabs[e].scrollBottom = intval(n), r.tabs[e].contHeight = intval(a)), Promise.resolve(r)
        }

        function Kt(e) {
            return e === u.FOLDER_ALL ? e => !Object(d.tabIsMessageRequest)(e) : e === u.FOLDER_UNREAD ? e => !Object(d.tabIsMessageRequest)(e) && e.unread > 0 : t => t.folders & u.FOLDER_MASKS[e]
        }

        function Vt(e, t) {
            t.active_tab = e, Object(r.updateLocation)({
                tab: e === u.FOLDER_ALL ? null : e
            });
            var n = [];
            if (e !== u.FOLDER_ALL && !Object(d.isReversedDialogs)(t)) {
                var a = t.dialog_tabs[e];
                n = t.dialog_tabs[u.FOLDER_ALL].map(e => t.tabs[e]).filter(Kt(e)).map(e => e.peerId), t.dialog_tabs[e] = a.length >= n.length ? a : n
            }
            return Promise.resolve(t)
        }

        function Wt(e, t, n, a) {
            var r = e.dialog_tabs_all;
            return !(!r[u.FOLDER_ALL] && !r[t]) || (n.filter(e => e === a.peerId).length > 0 || ("r" === a.lastmsg[0] || n.map(t => e.tabs[t.toString()]).filter(t => Object(d.isReversedDialogs)(e) ? t.lastmsg > a.lastmsg : t.lastmsg < a.lastmsg).length > 0))
        }

        function Yt(e, t, n, a, r) {
            if (Object(d.isTabLoaded)(r, e)) {
                var s = r.tabs[e];
                return n === i.REPLACE_DIRECTORIES && (t ^= s.folders),
                    function(e, t, n) {
                        return !(e === i.SET_DIRECTORIES && n.folders & t) && !!(e !== i.RESET_DIRECTORIES || n.folders & t)
                    }(n, t, s) && Object.keys(u.FOLDER_MASKS).filter(e => u.FOLDER_MASKS[e] & t).forEach(e => {
                        r.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== i.RESET_DIRECTORIES || e.folders & u.FOLDER_MASKS[n] ? t === i.REPLACE_DIRECTORIES ? e.folders & u.FOLDER_MASKS[n] ? -1 : 1 : t === i.SET_DIRECTORIES ? 1 : -1 : 0
                        }(s, n, e)
                    }), n === i.SET_DIRECTORIES ? r.tabs[e].folders |= t : n === i.RESET_DIRECTORIES ? r.tabs[e].folders &= ~t : r.tabs[e].folders = t ^= s.folders, ae(r, r.tabs[e], !0, (t, n) => t.concat([e]).map(e => r.tabs[e]).filter(Kt(n)).map(e => e.peerId), Wt.bind(null, r)), Promise.resolve(r)
            }
            return B(e, 0, 0, 0, r).then(Yt.bind(null, e, t, n, r))
        }
        var Qt = D(function(e, t) {
                var n = u.FOLDER_MASKS[u.FOLDER_IMPORTANT],
                    r = t.tabs[e].folders & n,
                    s = r ? i.resetDirectoriesEvent : i.setDirectoriesEvent;
                return t.longpoll.push([s([0, e, n, !0])]), Object(a.post)(C, {
                    act: "a_dialog_star",
                    val: r ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(() => t)
            }),
            Xt = D(function(e, t, n) {
                var r = u.FOLDER_MASKS[u.FOLDER_UNRESPOND];
                return n.longpoll.push([i.resetDirectoriesEvent([0, e, r, !0]), i.readInboundEvent([6, e, t])]), Object(a.post)(C, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(() => n)
            });

        function Jt(e) {
            return Object(a.post)(C, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Zt(e, t) {
            return R({
                [e]: {
                    free: !0
                }
            }, t), Object(a.post)(C, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(() => t)
        }

        function en(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var tn = D(function(e, t) {
            return ae(t, t.tabs[e], !0, t => t.filter(t => t !== e)), t.tabs[e].deletedDialog = !0, Object(a.post)(C, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(n => (n[0] ? (rn(t.tabbedPeers.filter(t => t.peer !== e), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, ae(t, t.tabs[e], !1, se.bind(null, e), Wt.bind(null, t))), n))
        });

        function nn(e, t, n, r) {
            return Object(a.post)(C, {
                act: "a_restore_dialog",
                hash: t,
                gid: r.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(t => (r.tabs[e].deletedDialog = !1, ae(r, r.tabs[e], !1, t => [e].concat(t)), r.tabs[e].unread = t, r))
        }

        function an(e, t, n) {
            return Object(a.post)(C, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function rn(e, t, n) {
            return n.tabbedPeers = e, Object(d.isClassicInterface)(n) && (T({
                peers: n.tabbedPeers.filter(e => {
                    var t = e.peer,
                        a = e.type;
                    return t !== n.peer && "perm" === a
                }).map(e => Object(d.getBareTab)(e.peer, n)).filter(e => !e.deletedDialog).map(e => e.peerId).map(d.convertPeerToUrl).join("_"),
                to: ""
            }), t && I()), Promise.resolve(n)
        }

        function sn(e) {
            return !e.peer || (Ke(e.peer, e) ? ze(e.peer, e) : !!Object(d.isFullyLoadedTab)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function on(e, t) {
            var n = t.tabs[e];
            return Object(d.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function ln(e, t) {
            var n = t.tabs[e];
            return Object(d.isFullyLoadedTab)(t, e) && (n.history = N(n.history)), Promise.resolve(t)
        }

        function cn(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function dn(e, t, n) {
            if (!Object(d.isCommunityPeer)(t)) return Promise.resolve(n);
            var r = Object(m.getTab)(n, t);
            return r.blocked_community = !e, !1 === e && (r.can_send_notify = !1), Object(a.post)(C, {
                act: "a_toggle_community",
                peer_id: t,
                hash: r.hash,
                state: e ? 1 : 0
            }).then(() => V(n))
        }

        function un(e, t) {
            if (0 !== t.peer && Object(d.isFullyLoadedTab)(t, t.peer)) {
                var n = Object(m.getTab)(t, t.peer);
                n.history = x(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function mn(e, t) {
            if (0 !== t.peer && Object(d.isFullyLoadedTab)(t, t.peer)) {
                var n = Object(m.getTab)(t, t.peer),
                    a = geByClass1("_im_peer_history");
                a && (n.history = x(a.innerHTML)), e(n.history)
            }
            return Promise.resolve(t)
        }

        function gn(e) {
            return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
        }

        function pn(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function hn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function _n(e) {
            T({
                act: e ? "create" : null
            }), I()
        }

        function fn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            T({
                q: e
            }), I()
        }

        function bn(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(d.getClassicChatHeight)() > window.clientHeight() && Object(d.setClassicChatHeight)(0)), Promise.resolve(e)
        }
        var vn = D(function(e, t, n) {
            return Object(a.post)(C, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(e => {
                var t = E(e, 4),
                    a = t[0],
                    r = t[1],
                    i = t[2],
                    s = t[3];
                return i.forEach(e => Object(p.oCacheAdd)(n, e)), n.tabs[a] = r, ae(n, r, !1, se.bind(null, a), Wt.bind(null, n)), n.admins = extend(n.admins, s), [a]
            })
        });

        function yn(e, t) {
            return Object(a.post)(C, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var On = D(function(e, t) {
            var n = t.tabs[e];
            return Object(a.post)(C, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(e => (n.inviteLink = e[0], e))
        });

        function En(e) {
            return M({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function Cn(e, t) {
            var n = Object(l.arrayUnique)([e].concat(t.select(c.RECENT_SEARCH_OP))).slice(0, 500);
            t.update(c.RECENT_SEARCH_OP, n)
        }

        function wn(e) {
            e.update(c.RECENT_SEARCH_OP, [])
        }

        function jn(e, t) {
            var n = t.select(c.RECENT_SEARCH_OP).filter(t => t !== e);
            return t.update(c.RECENT_SEARCH_OP, n), n
        }

        function Sn(e, t, n) {
            var a = n.tabs[t],
                r = Object(m.getMessage)(n, t, e);
            return a.data.kicked || a.data.closed || r.kludges.source_act || (a.pinned = r), Promise.resolve(n)
        }

        function kn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var Tn = D(function(e, t, n) {
                var r = n.tabs[t];
                return r.data.kicked || r.data.closed ? Promise.resolve(n) : Object(a.post)(C, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(e => {
                    var a = E(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, r, a), n
                })
            }),
            In = D(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(a.post)(C, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(a => {
                    var r = E(a, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, r), t
                })
            }),
            Mn = D(function(e, t) {
                var n = t.tabs[e];
                return Object(a.post)(C, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(e => {
                    var a = E(e, 1)[0];
                    return n.pinned = a || null, t
                })
            }),
            An = D(function(e, t, n) {
                var r = n.tabs[e];
                return Object(a.post)(C, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: r.hash
                })
            }),
            Ln = D(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(a.post)(C, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(e => {
                    var a = E(e, 1),
                        r = E(a[0], 3),
                        i = r[0],
                        s = r[1],
                        o = r[2];
                    return n.memberIds = i, n.adminIds = s, o.forEach(e => Object(p.oCacheAdd)(t, e)), n.membersLoaded = !0, t
                })
            }),
            Pn = D(function(e, t) {
                return Promise.all([Ln(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(a.post)(C, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(e => {
                        var a = E(e, 1)[0];
                        return n.photoGrid = a.grid, n.photoLarge = a.photo, n.membersLastSeen = a.lastSeen || null, n.inviters = a.inviters, n.caccess = a.caccess, n.invitedByMe = a.invitedByMe || [], n.inviteLink = a.link || null, n.serverSettings = a.serverSettings || null, t
                    })
                }(e, t)]).then(() => t)
            }),
            Dn = D(function(e, t, n) {
                var r = n.tabs[e];
                return Object(a.post)(C, {
                    act: "a_update_flags",
                    chat: e,
                    hash: r.hash,
                    flags: t
                })
            }),
            xn = D(function(e, t) {
                var n = t.tabs[e];
                return Object(a.post)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(() => (n.photo = null, n.photoLarge = null, t))
            });

        function Nn(e, t, n) {
            var a = n.tabs[e];
            return a.memberIds = a.memberIds.filter(e => e !== t), a.adminIds = a.adminIds.filter(e => e !== t), a.membersCount = a.memberIds.length, Promise.resolve(n)
        }
        var Rn = D(function(e, t, n) {
            var r = n.tabs[e];
            return Object(a.post)(C, {
                act: "a_kick_user",
                chat: e,
                hash: r.hash,
                mid: t
            }).then(() => (r.memberIds = r.memberIds.filter(e => e !== t), r.adminIds = r.adminIds.filter(e => e !== t), r.membersCount = r.memberIds.length, n))
        });

        function Bn(e, t, n, a) {
            var r = a.tabs[e];
            return r.adminIds = n ? [].concat(r.adminIds, t).filter((e, t, n) => n.indexOf(e) === t) : r.adminIds.filter(e => e !== t), Promise.resolve(a)
        }
        var Fn = D(function(e, t, n, r) {
            var i = r.tabs[e];
            return Object(a.post)(C, {
                act: "a_toggle_admin",
                chat: e,
                hash: i.hash,
                mid: t,
                is_admin: +n
            }).then(() => Bn(e, t, n, r))
        });

        function Hn(e, t, n, a) {
            var r = Object(m.getMessage)(e, n, t).userId;
            return Object(p.oCacheGet)(a, r) ? Promise.resolve(a) : bt({
                [n]: [r]
            }, a)
        }

        function Un() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Gn() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var qn = D(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(a.post)(C, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(() => t)
            }),
            $n = D(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var r = n.tabs[e];
                return Object(a.post)(C, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: r.hash
                }).then(() => n)
            });

        function zn(e, t) {
            return Object(a.post)(C, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(n => {
                var a = E(n, 1)[0];
                return t.tabs[e].top_banner = a, t
            })
        }

        function Kn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Wn(e, !1, !0, n)
        }

        function Vn(e, t) {
            return Kn(e, null, t)
        }

        function Wn(e, t, n, a) {
            return ((a.tabs || {})[e] || {}).keyboard && (a.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, {
                [e]: t
            }))), Promise.resolve(a)
        }
        var Yn = D(function(e, t) {
            var n = t.tabs[e];
            return Object(a.post)(C, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(n => {
                var a = E(n, 1)[0];
                return Kn(e, a, t)
            })
        });

        function Qn(e, t, n, r) {
            var i = r.tabs[e];
            return i.caccess[t] = n, Object(a.post)(C, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: i.hash,
                access: n ? 1 : 0
            }).then(() => r).catch(e => {
                throw i.caccess[t] = !n, e
            })
        }
        var Xn = D(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(a.post)(C, {
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

        function Jn(e, t, n) {
            var r = n.tabs[n.peer];
            return Object(a.post)(C, {
                act: "a_create_template",
                hash: r.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(e => (n.templates.unshift(e[0]), n))
        }

        function Zn(e, t, n, r) {
            var i = r.tabs[r.peer];
            return Object(a.post)(C, {
                act: "a_update_template",
                template_id: e,
                hash: i.hash,
                gid: r.gid,
                peer_id: r.peer,
                group_id: r.gid,
                name: t,
                text: n
            }).then(t => {
                var n = r.templates.find(t => t.id === e);
                return n && Object.assign(n, t[0]), r
            })
        }

        function ea(e, t) {
            if (Object(d.isFullyLoadedTab)(t, e)) {
                var n = Object(m.getTab)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }

        function ta(e, t) {
            var n = e.updateType,
                a = e.updateArg,
                r = 0;
            return n === i.MAIL_CHAT_UPDATE_TYPE_MESSAGE_REQUEST_CHANGED && (r = a === i.MESSAGE_REQUEST_STATUS_NEW ? 1 : -1), n === i.MAIL_CHAT_UPDATE_TYPE_CONTACT_CONVERTED && (r = -1), t.dialog_tab_cts[u.FOLDER_MESSAGE_REQUEST] += r, Promise.resolve(t)
        }
    },
    "wSs/": function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "canMessageBeEdited", function() {
            return l
        }), n.d(t, "convertEmojiHtmlToRegularText", function() {
            return c
        }), n.d(t, "findLastMessageToEdit", function() {
            return d
        }), n.d(t, "wasMessageReallyModified", function() {
            return u
        }), n.d(t, "replaceMsgAfterEdit", function() {
            return m
        });
        n("Vd3H"), n("rGqo"), n("Btvt"), n("pIFo");
        var a = n("rHUl"),
            r = n("MhhX"),
            i = n("P13b"),
            s = n("eTng"),
            o = n("aong");

        function l(e, t) {
            t = Object(a.parserMessage)(t);
            var n = vk.id == t.peerId && !Object(o.unpackStore)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(r.isOut)(t)) && (!Object(r.isServiceMsg)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(r.isGift)(t) || Object(r.isSticker)(t) || Object(r.isAudioMsg)(t) || Object(r.isGraffiti)(t) || Object(r.isMoney)(t) || Object(r.isVKPay)(t) || Object(r.isCallMessage)(t)) && !Object(i.isAlreadyDeleted)(e, t.peerId, t.messageId)))))
        }

        function c(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : `@${e} (${t})`
            }), t.innerHTML = e, Emoji.val(t)
        }

        function d(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(e => e > 0).sort((e, t) => t - e).find(n => l(e, t.msgs[n])) || null
        }

        function u(e, t, n) {
            var a = Object(s.convertKludgesToAttaches)(t.kludges, t.messageId),
                r = n.dData.attaches;
            if (c(t.text) !== n.dData.txt || a.length !== r.length) return !0;
            for (var i = a.length; i--;) {
                var o = a[i],
                    l = r[i];
                if (o.id != l.id || o.type != l.type || "poll" == o.type && l.object && l.object.poll_is_edited) return !0
            }
            return !1
        }

        function m(e, t, n, a, r, s) {
            t.origText = n, t.text = Object(i.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = a, t.kludges.emoji = 1, t.local = 1, t.share_url = r, t.cancelled_shares = s, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    },
    wmvG: function(e, t, n) {
        "use strict";
        var a = n("hswa").f,
            r = n("Kuth"),
            i = n("3Lyj"),
            s = n("m0Pp"),
            o = n("9gX7"),
            l = n("SlkY"),
            c = n("Afnz"),
            d = n("1TsA"),
            u = n("elZq"),
            m = n("nh4g"),
            g = n("Z6vF").fastKey,
            p = n("s5qY"),
            h = m ? "_s" : "size",
            _ = function(e, t) {
                var n, a = g(t);
                if ("F" !== a) return e._i[a];
                for (n = e._f; n; n = n.n)
                    if (n.k == t) return n
            };
        e.exports = {
            getConstructor: function(e, t, n, c) {
                var d = e(function(e, a) {
                    o(e, d, t, "_i"), e._t = t, e._i = r(null), e._f = void 0, e._l = void 0, e[h] = 0, null != a && l(a, n, e[c], e)
                });
                return i(d.prototype, {
                    clear: function() {
                        for (var e = p(this, t), n = e._i, a = e._f; a; a = a.n) a.r = !0, a.p && (a.p = a.p.n = void 0), delete n[a.i];
                        e._f = e._l = void 0, e[h] = 0
                    },
                    delete: function(e) {
                        var n = p(this, t),
                            a = _(n, e);
                        if (a) {
                            var r = a.n,
                                i = a.p;
                            delete n._i[a.i], a.r = !0, i && (i.n = r), r && (r.p = i), n._f == a && (n._f = r), n._l == a && (n._l = i), n[h]--
                        }
                        return !!a
                    },
                    forEach: function(e) {
                        p(this, t);
                        for (var n, a = s(e, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;)
                            for (a(n.v, n.k, this); n && n.r;) n = n.p
                    },
                    has: function(e) {
                        return !!_(p(this, t), e)
                    }
                }), m && a(d.prototype, "size", {
                    get: function() {
                        return p(this, t)[h]
                    }
                }), d
            },
            def: function(e, t, n) {
                var a, r, i = _(e, t);
                return i ? i.v = n : (e._l = i = {
                    i: r = g(t, !0),
                    k: t,
                    v: n,
                    p: a = e._l,
                    n: void 0,
                    r: !1
                }, e._f || (e._f = i), a && (a.n = i), e[h]++, "F" !== r && (e._i[r] = i)), e
            },
            getEntry: _,
            setStrong: function(e, t, n) {
                c(e, t, function(e, n) {
                    this._t = p(e, t), this._k = n, this._l = void 0
                }, function() {
                    for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                    return this._t && (this._l = t = t ? t.n : this._t._f) ? d(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, d(1))
                }, n ? "entries" : "values", !n, !0), u(t)
            }
        }
    }
});