! function(e) {
    function t(t) {
        for (var a, s, o = t[0], c = t[1], l = t[2], u = 0, m = []; u < o.length; u++) s = o[u], r[s] && m.push(r[s][0]), r[s] = 0;
        for (a in c) Object.prototype.hasOwnProperty.call(c, a) && (e[a] = c[a]);
        for (d && d(t); m.length;) m.shift()();
        return i.push.apply(i, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], a = !0, o = 1; o < n.length; o++) {
                var c = n[o];
                0 !== r[c] && (a = !1)
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
        c = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var l = 0; l < o.length; l++) t(o[l]);
    var d = c;
    i.push([98, "bundles/common", "bundles/vendors", "bundles/ac99d2ffeaccefc84858f73dcbf7df37"]), n()
}({
    "1+Fu": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return u
        });
        n("KKXr"), n("rGqo"), n("Btvt");
        var a = n("DM26"),
            r = new Map,
            i = !1;

        function s(e) {
            return e.queue || e.key
        }

        function o() {
            r.forEach(({
                onData: e,
                onUpdateKey: t,
                ts: n
            }, a) => {
                (function(e) {
                    return !!window.curNotifier && !curNotifier.addQueues[s(e)]
                })(a) && Notifier.addKey(extend(a, {
                    ts: n
                }), d.bind(null, e, t, a))
            })
        }

        function c() {
            i || (i = setInterval(o, 3e3))
        }

        function l(e) {
            ! function(e) {
                if (!window.curNotifier) return !1;
                delete curNotifier.addQueues[s(e)]
            }(e), r.delete(e), 0 === r.size && (clearInterval(i), i = !1)
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
                        s = Object(a.c)(1).then(() => t);
                        break;
                    default:
                        throw new Error("Unkonwn error from queue: " + e)
                }
                Object(a.c)(3).then(() => s).then(e => {
                    r.set(e, {
                        onUpdateKey: i,
                        onData: n,
                        ts: e.ts
                    }), o(), c()
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
            }), c(), {
                stop: l.bind(null, e)
            }
        }
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
        n.d(t, "c", function() {
            return a
        }), n.d(t, "a", function() {
            return r
        }), n.d(t, "b", function() {
            return i
        })
    },
    "6raB": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        });
        n("rGqo"), n("Btvt");
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
        class c extends a.Component {
            constructor(e) {
                super(e), this.needRecalcSize = !1, this.state = {}
            }
            render() {
                var e = this.props,
                    {
                        className: t,
                        loading: n,
                        children: c
                    } = e,
                    l = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["className", "loading", "children"]),
                    d = Object(r.a)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": n
                    }, t);
                return a.createElement(s.a, o({}, l, {
                    className: d
                }), a.createElement("span", {
                    className: "ButtonWithProgress__content"
                }, c), n && a.createElement(i.a, {
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
        n.d(t, "a", function() {
            return s
        });
        n("rGqo"), n("Btvt");
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

        function s(e) {
            var {
                children: t,
                className: n
            } = e, s = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, ["children", "className"]);
            return a.createElement("div", i({}, s, {
                className: Object(r.a)("Stub", n)
            }), t || "No results.")
        }
    },
    "86+7": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return r
        }), n.d(t, "c", function() {
            return i
        }), n.d(t, "a", function() {
            return s
        });
        n("KKXr");
        var a = n("aong");

        function r(e, t) {
            return t in Object(a.q)(e).oCache
        }

        function i(e, t) {
            var n = Object(a.q)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function s(e, t) {
            var n = Object(a.q)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    "8h6g": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "c", function() {
            return r
        }), n.d(t, "a", function() {
            return i
        });
        n("KKXr");
        var a = "avi mp4 3gp mpeg mov flv f4v wmv mkv webm vob rm rmvb m4v mpg ogv ts m2ts mts mxf".split(" "),
            r = 5,
            i = 4194304
    },
    98: function(e, t, n) {
        e.exports = n("M24l")
    },
    As6E: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return d
        });
        n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("clTp"),
            o = 80,
            c = 250,
            l = () => "undefined" != typeof window;
        class d extends a.Component {
            constructor(e) {
                super(e), this.onClick = (() => {
                    if (!this.state.dropdown || this.state.dropdown.removed) {
                        var {
                            text: e,
                            position: t,
                            align: n,
                            marginTop: a,
                            marginLeft: r
                        } = this.props, i = Object(s.a)(this.el);
                        this.update({
                            text: e,
                            position: t,
                            align: n,
                            rect: i,
                            marginTop: a,
                            marginLeft: r
                        })
                    } else this.update()
                }), this.onMouseEnter = (e => {
                    this.callerHovered = !0, this.timeouts.appear = setTimeout(() => {
                        if (this.el && this.callerHovered) {
                            var {
                                position: e,
                                align: t,
                                marginTop: n,
                                marginLeft: a
                            } = this.props, r = Object(s.a)(this.el);
                            this.update({
                                position: e,
                                align: t,
                                rect: r,
                                marginTop: n,
                                marginLeft: a
                            })
                        }
                    }, o)
                }), this.onMouseLeave = (e => {
                    this.callerHovered = !1, this.timeouts.callerDisappear = setTimeout(() => {
                        this.callerHovered || this.hovered || this.update()
                    }, c)
                }), this.onDropdownMouseEnter = (() => {
                    "hover" === this.props.trigger && (this.hovered = !0)
                }), this.onDropdownMouseLeave = (e => {
                    "hover" === this.props.trigger && (this.hovered = !1, this.timeouts.disappear = setTimeout(() => {
                        this.callerHovered || this.hovered || this.update()
                    }, c))
                }), this.onDocumentClick = (e => {
                    !this.state.dropdown || this.state.dropdown.removed || this.el.contains(e.target) || this.update()
                }), this.onResize = (e => {
                    if (this.state.dropdown && !this.state.dropdown.removed) {
                        var {
                            text: t,
                            position: n,
                            align: a,
                            marginTop: r,
                            marginLeft: i
                        } = this.props, o = Object(s.a)(this.el);
                        this.update({
                            text: t,
                            position: n,
                            align: a,
                            rect: o,
                            marginTop: r,
                            marginLeft: i
                        })
                    }
                }), this.onTransitionEnd = (e => {
                    "visibility" === e.propertyName && this.state.dropdown && this.state.dropdown.removed && this.setState({
                        dropdown: void 0
                    })
                }), this.onItemClick = ((e, t) => {
                    t.separator || (this.update(), t.onClick(e))
                }), this.state = {}, this.timeouts = {}
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
                var {
                    position: t,
                    align: n,
                    rect: a,
                    marginTop: r,
                    marginLeft: i
                } = e, s = a.left, o = a.top;
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
                var {
                    x: e,
                    y: t,
                    position: n,
                    align: r,
                    removed: s
                } = this.state.dropdown, o = Object(i.a)("Dropdown", `Dropdown--${n}`, {
                    "Dropdown--removed": !!s,
                    [`Dropdown--align-${r}`]: "t" === n || "b" === n
                }, this.props.className);
                return a.createElement("div", {
                    className: o,
                    style: {
                        top: t,
                        left: e
                    },
                    onTransitionEnd: e => this.onTransitionEnd(e),
                    onMouseEnter: this.onDropdownMouseEnter,
                    onMouseLeave: this.onDropdownMouseLeave
                }, a.createElement("ul", {
                    className: "Dropdown__in"
                }, this.props.data.map((e, t) => a.createElement("li", {
                    className: Object(i.a)("Dropdown__item", {
                        Dropdown__item_separator: e.separator
                    }),
                    onClick: t => this.onItemClick(t, e),
                    key: void 0 !== e.id ? e.id : t
                }, e.text))))
            }
            render() {
                var e = this.renderDropdown();
                return e ? (!this.defaultNode && l() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), a.createElement(a.Fragment, null, this.props.children, r.createPortal(e, this.defaultNode))) : this.props.children
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
        n.d(t, "a", function() {
            return s
        });
        n("rGqo"), n("Btvt");
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
        class s extends a.Component {
            render() {
                var e = this.props,
                    {
                        hovered: t,
                        className: n,
                        children: s
                    } = e,
                    o = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["hovered", "className", "children"]),
                    c = Object(r.a)("Link", {
                        "Link--hovered": !!t
                    }, n);
                return this.props.href ? a.createElement("a", i({}, o, {
                    className: c
                }), s) : a.createElement("span", i({}, o, {
                    className: c
                }), s)
            }
        }
        s.defaultProps = {
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
        var {
            ajax: a
        } = window, r = (n("Btvt"), 2);

        function i(e, t, n) {
            return t && (t.im_v = r), new Promise((r, i) => {
                a.post(e, t, {
                    timeout: n,
                    onDone() {
                        r.apply(null, [
                            [...arguments]
                        ])
                    },
                    onFail() {
                        return i.apply(null, arguments), !0
                    }
                })
            })
        }

        function s(e, t, n = {}) {
            var r;
            return r = window.XDomainRequest ? new XDomainRequest : a._getreq(), {
                request: new Promise((a, i) => {
                    var s, o = Date.now(),
                        c = n.timeout || 60,
                        l = ajx2q(t);
                    if (window.XDomainRequest) r.open("get", `${e}?${l}`), r.ontimeout = function(e) {
                        i([e, {}])
                    }, r.onerror = function(e) {
                        i([e, {}])
                    }, r.onload = function() {
                        a([r.responseText, {}])
                    }, setTimeout(function() {
                        r.send()
                    }, 0);
                    else {
                        r.onreadystatechange = function() {
                            4 == r.readyState && (clearInterval(s), r.status >= 200 && r.status < 300 ? a([r.responseText, r]) : i([r.responseText, r]))
                        };
                        try {
                            r.open("GET", `${e}?${l}`, !0)
                        } catch (e) {
                            return i([e, r])
                        }
                        r.send()
                    }
                    s = setInterval(function() {
                        Date.now() - o > 1e3 * c && (window.browser.safari && r.abort(), i(["", {}]), clearInterval(s))
                    }, 1e3)
                }),
                cancel: function() {
                    r.abort()
                }
            }
        }
    },
    DM26: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return a
        }), n.d(t, "e", function() {
            return r
        }), n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return s
        }), n.d(t, "d", function() {
            return o
        });
        n("Btvt");

        function a(e, t) {
            return new Promise(n => {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function r(e, t, n = null) {
            var r = 0;
            return function i(...s) {
                return Promise.resolve().then(() => e(...s)).catch(e => {
                    if (++r <= t) {
                        var o = "function" == typeof n ? n(r) : 0;
                        return 0 === o ? i(...s) : a(o).then(() => i(...s))
                    }
                    throw e
                })
            }
        }

        function i(e, t, n) {
            var a, r;
            return function(...i) {
                return new Promise((e, s) => {
                    var o = n && !a;
                    clearTimeout(a), r && r.reject("debounce"), a = setTimeout(function() {
                        a = null, r = null, n || e(i)
                    }, t), o ? e(i) : n && s("debounce"), r = {
                        resolve: e,
                        reject: s
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
            return (...t) => new Promise(n => e(...t, n))
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
        n("Btvt");
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

        function c(e) {
            e.preventDefault()
        }

        function l() {
            return !!window.imwl
        }

        function d(e, t, n = !0) {
            l() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.e)(r.b, 3, () => 2)("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: s++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function u(e, t, n = {}) {
            return d(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function m() {
            a = window.onerror, window.onerror = o, window.addEventListener("unhandledrejection", c)
        }

        function p() {
            window.onerror = a, a = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    EUzL: function(e, t, n) {
        "use strict";

        function a(e, t, n) {
            var a = 0,
                r = e,
                i = [],
                s = !1;

            function o() {
                !i.length || a > 0 || s || (t(i), i = [])
            }
            return {
                pause() {
                    a++
                },
                resume() {
                    a > 0 && (a--, o())
                },
                onLp(e, t, a) {
                    s || (r >= e ? (r = t, i.push(...a), o()) : n && (s = !0, n(r).then(([e, t, n]) => {
                        r = t, s = !1, i.push(...n), o()
                    })))
                }
            }
        }
        n.d(t, "a", function() {
            return a
        })
    },
    FABD: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return d
        });
        n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR")),
            i = n("vRp6"),
            s = n("p+C8"),
            o = n("XpgC");

        function c() {
            return (c = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        var l = 27;
        class d extends a.PureComponent {
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
                    e.keyCode === l && (this.input.value = "", this.input.blur(), this.props.onChange(e), e.stopPropagation())
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
                    {
                        className: t,
                        tokens: n,
                        removeTokenPlaceholder: l,
                        value: d,
                        placeholder: u,
                        useInfiniteScroll: m,
                        loadMore: p,
                        hasMore: g,
                        virtualized: h,
                        notFoundText: _,
                        children: b,
                        emptyText: f,
                        isSearching: v
                    } = e,
                    y = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["className", "tokens", "onSelect", "onRemoveToken", "removeTokenPlaceholder", "value", "placeholder", "useInfiniteScroll", "loadMore", "hasMore", "virtualized", "notFoundText", "children", "emptyText", "isSearching"]),
                    j = m ? i.a : "div",
                    O = m ? {
                        loadMore: p,
                        hasMore: g,
                        virtualized: h,
                        useCapture: !1
                    } : {},
                    w = [].concat(b);
                return a.createElement("div", {
                    className: Object(r.a)("MultiSelect", t)
                }, a.createElement("div", {
                    className: "MultiSelect__search",
                    ref: this.searchContainerRef
                }, n.map((e, t) => a.createElement("span", {
                    className: "MultiSelect__token",
                    key: e.id
                }, a.createElement("span", {
                    className: "MultiSelect__tokenTitle"
                }, e.text), l ? a.createElement(o.a, {
                    text: l
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
                }, a.createElement("input", c({}, y, {
                    type: "text",
                    className: "MultiSelect__input",
                    placeholder: 0 === n.length ? u : "",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: d,
                    ref: this.inputRef
                }))))), 0 === w.length && (d || f) && !v && a.createElement("div", {
                    className: "MultiSelect__empty"
                }, a.createElement("div", {
                    className: "MultiSelect__emptyIn"
                }, d ? _ : f)), a.createElement(j, c({
                    className: "MultiSelect__scroll",
                    ref: this.scrollContainerRef
                }, O), w.map(e => a.createElement(s.a, {
                    className: "MultiSelect__suggestsItem",
                    "data-id": e.props["data-id"],
                    onClick: this.onSelect,
                    key: e.key
                }, e))))
            }
        }
        d.defaultProps = {
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
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i(e) {
            var t = Object(r.a)("Progress", {
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
        n("Vd3H"), n("pIFo"), n("OEbY"), n("SRfc"), n("rGqo"), n("Btvt"), n("OG14"), n("a1Th");
        var a = n("vT4u"),
            r = n("P13b"),
            i = n("rHUl"),
            s = n("MhhX"),
            o = n("N1NS"),
            c = n("f01n");

        function l(e, t) {
            return {
                isAll: e => Object(a.X)(e.get().peer, e.get()),
                loadMore: e => (function(e) {
                    return Object(a.X)(e.get().peer, e.get()) ? Promise.resolve("") : Object(a.hc)(e.get().peer, e.get())
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
                if (!getSelectionText() && !Object(r.F)(t)) {
                    var s = intval(domData(n, "peer"));
                    return e.set(a.m.bind(null, s)), e.get().longpoll.push([Object(c.gb)(s, i)]), !1
                }
            }.bind(null, t);
            return l(0, Object(o.a)({
                handlers: (t, a) => {
                    a(e, "click", "_im_mess", n)
                }
            }))
        }
        var m = n("h++7"),
            p = n("ERyv");

        function g(e, t) {
            if (!t) return ls.get(e);
            ls.set(e, t)
        }
        var h = function(e = {}, t = {}) {
                var n = debounce(g, 300),
                    a = extend({}, e),
                    r = [],
                    i = [];
                return t.store && (a = ls.get(t.key) || a), {
                    get: () => a,
                    set(e) {
                        var r = Object(p.c)() ? function(e) {
                            try {
                                var t = {};
                                return Error.captureStackTrace(t, e), t.stack
                            } catch (e) {
                                return ""
                            }
                        }(this.set) : null;
                        return e(a).then(e => (a = e, t.store && n(t.key, e), this.emit(), this)).catch(e => Object(p.a)("store_set_catch", e, {
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
            _ = n("aong"),
            b = n("+/AQ");

        function f(e, t) {
            return Object(_.o)(e).find(e => domData(e, "list-id") === t)
        }

        function v(e, t) {
            return Object(_.o)(e).findIndex(e => domData(e, "list-id") === t)
        }

        function y(e, t, n, a) {
            if (n) {
                j(e, t, a);
                var r = domData(n, "list-id"),
                    i = r && f(t.children, r);
                i && a.forEach(e => addClass(i, e)), e.setState({
                    hoveredListItemId: r
                })
            }
        }

        function j(e, t, n) {
            var a = domQuery("." + n.join("."), t);
            a && Object(_.o)(a).forEach(e => {
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

        function S(e, t, n, a, r, i) {
            for (var s = 0; s < a; s++) e = domNS(e);
            var o = se(r(t));
            return domData(o, "list-id", n), e ? i.insertBefore(o, e) : i.appendChild(o), e
        }

        function E(e, t, n, a, r) {
            var i = a.get(),
                s = i.limit,
                o = i.offset,
                c = function(e, t) {
                    var n = t.get();
                    return !n._sortedEls && e && t.setState({
                        elements: n.elements.sort(e),
                        _sortedEls: !0
                    }), t.get().elements
                }(n().sortFn, a).slice(0, o + s),
                l = function(e, t) {
                    for (var n = [], a = Math.max(e.length, t.length), r = 0; r < a; r++) {
                        var i = e[r],
                            s = t[r];
                        !i && s ? n.push(["a", s, r]) : i && !s ? n.push(["r", i, r]) : i !== s && (n.push(["r", i, r]), n.push(["a", s, r]))
                    }
                    var o = C(n),
                        c = C(n.reverse());
                    return o.length > c.length ? c : o
                }(Object(_.o)(e.children).map(e => domData(e, "list-id")).filter(e => !!e), c.map(e => n().idFn(e).toString()));
            if (function(e, t, n, a) {
                    if (0 !== t.length) {
                        var r = (t = t.sort((e, t) => e[2] - t[2])).filter(e => "a" === e[0]);
                        if (t.filter(e => "r" === e[0]).map(t => e.children[t[2]]).forEach(e => re(e)), 0 !== r.length)
                            for (var i = r.shift(), s = i[2], o = (S(e.children[s], n[i[2]], i[1], 0, a, e), 0); o < r.length; o++) i = r[o], S(e.children[s], n[i[2]], i[1], i[2] - s, a, e), s = i[2]
                    }
                }(e, l, c, n().renderFn), function(e, t) {
                    e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
                }(a, t), r) return l.filter(e => "a" == e[0]).map(e => parseInt(e[1]))
        }

        function I(e, t, n, a, r = !1, i = 0, s = 0) {
            var o = e.get(),
                c = t.getContainer().children,
                l = v(c, a || o.hoveredListItemId);
            l < 0 || (o.limit + o.offset < l ? e.setState({
                offset: l - o.limit + 1
            }).then(E.bind(null, t.getContainer(), t, n)) : Promise.resolve()).then(() => {
                var e = c[l],
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

        function x(e, t) {
            var n = e.get().pipeId;
            return !(void 0 !== n && void 0 !== t && n !== t)
        }

        function T(e, t, n, a, r, i) {
            return !!x(e, r) && e.setState(function(e, t, n) {
                var a = e.filter(e => !n.ids[t(e)]);
                return {
                    _sortedEls: !1,
                    els: a,
                    ids: w(a, t, n.ids),
                    elements: n.elements.concat(a)
                }
            }(i, a().idFn, e.get())).then(E.bind(null, t, n, a))
        }

        function M(e, t, n) {
            var a = function(e, t, ...n) {
                    return e.get().loading || e.get().stop || !e.get().activated ? Promise.resolve([]) : (e.get().loading = !0, t(...n).then(() => {
                        e.get().loading = !1
                    }))
                }.bind(null, t, function(e, t, n, a) {
                    var i = e.get(),
                        s = i.elements,
                        o = a.getContainer(),
                        c = e.setState({
                            offset: i.offset + i.limit
                        }).then(() => {
                            var n, r = i.offset,
                                c = i.limit;
                            return c + r > s.length ? n = t().more(r, c).then(t => !1 === t ? [] : (0 === t.length && e.setState({
                                stop: !0
                            }), t)).then(T.bind(null, e, o, a, t, i.pipeId)) : (n = Promise.resolve(), E(o, a, t, e)), n
                        });
                    if (!n) {
                        var l = s.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
                        Object(r.Oc)(o)(c, "bottom", l)
                    }
                    return c
                }.bind(null, t, n)),
                i = (e, a) => {
                    (t.get().activated || e) && (void 0 !== a && t.get().elements.length > 0 && t.setState({
                        scrolled: a
                    }), n().onScroll && n().onScroll())
                },
                s = Object(b.a)(e, {
                    noScroll: t.get().noScroll,
                    nativeScroll: t.get().nativeScroll,
                    scrollChange: i.bind(null, !1),
                    more: !!n().more && a.bind(null, !1)
                }),
                c = Object(o.a)({
                    handlers: (a, r) => {
                        r(e, "click", t.get().elCls, n().onClick)
                    }
                });
            return t.setState(k(n().idFn, {}, t)), {
                pipe: (e, a) => (t.setState({
                    pipeId: a
                }), e.then(T.bind(null, t, s.getContainer(), s, n, a))),
                replacePreserveOrder: e => t.set(function(e, t, n) {
                    var a = [];
                    n.elements = n.elements.map(n => {
                        var r = t(n),
                            i = e.filter(e => t(e) === r)[0];
                        return a.push(r), i || n
                    });
                    var r = e.filter(e => !inArray(t(e), a));
                    return n.elements = n.elements.concat(r), Promise.resolve(n)
                }.bind(null, e, n().idFn)).then(E.bind(null, s.getContainer(), s, n)),
                pipeReplace: (e, a, r = !1) => (t.setState({
                    pipeId: a,
                    stop: !1
                }), e.then(e => {
                    if (x(t, a)) return t.setState({
                        elements: e,
                        _sortedEls: !1,
                        ids: w(e, n().idFn, {})
                    }).then(E.bind(null, s.getContainer(), s, n, t, r))
                })),
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
                toTop(e, t = !1) {
                    t ? s.smoothScroll(-s.scrollTop()) : s.scrollTop(0), e && i(e, 0)
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
                checkMore: e => t.get().elements.length < t.get().limit ? a(e, s) : Promise.resolve([]),
                add: (e, a) => T(t, s.getContainer(), s, n, a, e),
                hoverNextElement(e, a, r = {}) {
                    var i = s.getContainer(),
                        o = i.children,
                        c = v(o, t.get().hoveredListItemId || O(i, a)),
                        l = Object(_.o)(o).slice(c + 1).find(n().hoverableFn);
                    y(t, i, l, e), I(t, s, n, null, !1, r.top, r.bottom)
                },
                hoverPrevElement(e, a, r = {}) {
                    var i = s.getContainer(),
                        o = i.children,
                        c = v(o, t.get().hoveredListItemId || O(i, a)),
                        l = c >= 0 && Object(_.o)(o).slice(0, c).reverse().find(n().hoverableFn);
                    y(t, i, l, e), I(t, s, n, null, !1, r.top, r.bottom)
                },
                hoverFirstElement(e, a) {
                    var r = s.getContainer(),
                        i = r.children,
                        o = Object(_.o)(i).findIndex(n().hoverableFn),
                        c = i[o];
                    !t.get().hoveredListItemId && c && (y(t, r, c, e), I(t, s, n, o, !1, a.top, a.bottom))
                },
                hoverElement(e, a, r) {
                    var i = s.getContainer(),
                        o = i.children,
                        c = v(o, e),
                        l = o[c];
                    l && (y(t, i, l, a), I(t, s, n, c, !1, r.top, r.bottom))
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
        var L = n("1y80"),
            P = n("86+7"),
            B = n("lJdi"),
            D = 64,
            N = "_im_dialog_star",
            q = "_im_dialog_daction",
            A = ["_im_dialog_selected", "nim-dialog_selected"],
            H = ["_im_dialog_hovered", "nim-dialog_hovered"];

        function F(e) {
            return hasClass(e, "_im_search")
        }

        function R(e, t, n, s, o) {
            if (!gpeByClass("_im_peer_target", s.target)) {
                var l = t.get(),
                    d = F(o),
                    u = parseInt(domData(o, "peer"), 10),
                    m = parseInt(domData(o, "msgid"), 10),
                    p = Object(i.u)(t, u),
                    g = "";
                if (Object(i.O)(t) && (g = "conversations_search"), Object(i.K)(t) && (g = "recent_searches"), hasClass(o, "_im_sugg_" + u) && (g = "popular_suggestions"), d && (g = "message_search"), checkEvent(s)) return window.open(function(e, t, n, a = !1) {
                    var i = Object(r.T)(e),
                        s = () => `${i}?sel=${Object(r.I)(t.peerId)}${a&&n?"&msgid="+n:""}`;
                    if (a) return s();
                    if (Object(r.Hb)(t.peerId) || Object(r.lb)(t.peerId)) return Object(r.jb)(e) ? s() : t.href;
                    return s()
                }(t, p, m, d));
                if (n.saveScroll("list"), d && l.msgid !== m) l.longpoll.push([c.gb(u, m, !1, !1, g)]);
                else if (u !== l.peer) {
                    l.longpoll.push([c.gb(u, !1, !0, !0, g)]);
                    var h = Object(i.O)(t);
                    h && !hasClass(o, "_dont_add_recent") && Object(a.bc)(u, cur.imDb), h && p && !Object(r.jb)(t) && setTimeout(() => {
                        var e = p.message ? p.message.messageId : p.peerId;
                        n.scrollToElement(e.toString(), !0, 0, "center")
                    }, 100)
                } else u === l.peer && e().goToHistoryEnd();
                cancelEvent(s)
            }
        }

        function $(e, t, n, a) {
            var i;
            return !Object(r.ib)(t) || "string" == typeof n.photo && "" !== n.photo ? (i = `<img src="${n.photo}" alt="">`, a && (i = getTemplate("im_dialogs_link_img", {
                href: n.href,
                photo: i
            }))) : i = Object(r.Zb)(e, n, !a), {
                photo: i,
                userLink: `<span class="_im_dialog_link">${n.tab}</span>`
            }
        }

        function U(e, t, n, a) {
            return n ? "" : a ? getTemplate("im_img_prebody", {
                photo: t
            }) : e + ":"
        }

        function z(e, t, n) {
            return !!(n & c.m) && (!Object(r.Cb)(t.peerId, e.get().gid) && (!(Object(r.ib)(t.peerId) && t.data && t.data.closed) && (!t.unread && !(t.lastmsg <= t.out_up_to))))
        }

        function K(e) {
            var t = Q(e);
            return (e.unread > 0 ? e.unread : "") > 0 && t
        }

        function W(e, t, n = !1, a = {}) {
            var {
                photo: s,
                userLink: o
            } = $(e, t.peerId, t, Object(r.jb)(e)), l = n || Q(t);
            if (!l) return function(e, t, n, a, s = {}) {
                var o = [];
                return Object(r.jb)(a) && o.push("nim-dialog_classic"), Object(i.K)(a) && o.push("nim-dialog_recent"), o.push("nim-dialog_empty"), s.search && o.push("_im_search"), getTemplate("im_drow", {
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
            }(t, s, o, e, a);
            var d = l.flags,
                u = Object(r.rb)(e, t.peerId),
                m = X(t, e, n),
                p = [];
            a.search && p.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && p.push("nim-dialog_muted"), t.verified && p.push("nim-dialog_verified"), Object(i.K)(e) && p.push("nim-dialog_recent"), -1 === l.messageId && p.push("nim-dialog_empty"), Object(r.jb)(e) && p.push("nim-dialog_classic"), t.folders & c.q && p.push("nim-dialog_starred"), !a.search && Object(r.Fb)(e, t.peerId, t) && p.push("nim-dialog_unrespond"), u && e.get().gid && p.push("nim-dialog_deny-remove");
            var g = e.get().timeshift,
                h = z(e, t, d) ? "nim-dialog_unread-out" : "",
                _ = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
            return getTemplate("im_drow", {
                peer: t.peerId,
                msg_id: l.messageId,
                photo: s,
                user_link: o,
                date: l.date ? getShortDateOrTime(l.date, g, !0, getLang("months_sm_of", "raw")) : "",
                body: m,
                unread_message_string: _,
                tab_name: stripHTML(t.tab),
                unread: Object(r.Dc)(t.unread),
                more: p.join(" "),
                is_online: onlinePlatformClass(t.online),
                is_unread: K(t) ? "nim-dialog_unread" : "",
                is_unread_out: h,
                is_selected: a.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
            })
        }

        function V(e, t, n, a, s) {
            if (!t.deletedDialog)
                if (hasClass(e, "nim-conversation-search-row")) G(e, t, n);
                else {
                    var o = Q(t),
                        l = o.flags,
                        d = X(t, n),
                        {
                            photo: u
                        } = $(n, t.peerId, t, Object(r.jb)(n)),
                        m = n.get().timeshift,
                        p = o.date ? getShortDateOrTime(o.date, m, !0, getLang("months_sm_of", "raw")) : "";
                    ie(e, t), val(geByClass1("_dialog_body", e), d), val(geByClass1("_im_dialog_date", e), p), val(geByClass1("_im_dialog_unread_ct", e), Object(r.Dc)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
                    var g = geByClass1("_im_dialog_photo", e);
                    g.innerHTML !== u && val(g, u), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & c.q), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", Object(r.Fb)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", Object(r.jb)(n)), toggleClass(e, "nim-dialog_unread", K(t)), toggleClass(e, "nim-dialog_deny-remove", n.get().gid > 0 && Object(r.rb)(n, t.peerId)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", Object(i.K)(n)), toggleClass(e, "nim-dialog_empty", -1 === o.messageId), z(n, t, l) && addClass(e, "nim-dialog_unread-out"), s && setTimeout(function() {
                        addClass(geByClass1("_im_dialog_" + t.peerId, a), "nim-dialog_injected")
                    }, 100)
                }
        }

        function G(e, t, n) {
            ie(e, t), toggleClass(e, "nim-dialog_recent", Object(i.K)(n)), val(geByClass1("_im_dialog_unread_ct", e), Object(r.Dc)(t.unread));
            var {
                photo: a
            } = $(n, t.peerId, t, Object(r.jb)(n)), s = geByClass1("_im_dialog_photo", e);
            s.innerHTML !== a && val(s, a), toggleOnline(geByClass1("_im_peer_online", e), t.online), K(t) && addClass(e, "nim-dialog_unread")
        }

        function X(e, t, n = !1) {
            var a = n || Q(e);
            if (Object(r.xb)(e.peerId, t)) {
                var o = t.get().block_states[e.peerId].name,
                    l = getLang("mail_community_answering").replace("{username}", o);
                return getTemplate("im_drow_prebody", {
                    prebody: l,
                    body: ""
                })
            }
            return Object(s.l)(a) ? Object(r.dc)(t, a, e, !1) : function(e, t, n, a, s, o, l, d, u, m) {
                var p = "",
                    g = Object(i.z)(e, Object(i.u)(e, n));
                return t & c.m ? p = U(getLang("mail_by_you"), m, g, u) : Object(r.ib)(n) && 0 !== a && (p = U(Object(P.c)(e, a).first_name, Object(P.c)(e, a).photo, g, u)), l = Object(r.ec)(n, d, l, s, o), p ? getTemplate("im_drow_prebody", {
                    prebody: p,
                    body: l
                }) : l
            }(t, a.flags, e.peerId, a.userId, !0, a.attaches, a.text, a.subject, Object(r.jb)(t), Object(P.c)(t, t.get().id).photo)
        }

        function Q(e) {
            var t = e.lastmsg_meta;
            return isArray(t) && (t = Object(c.eb)([4].concat(t))), t || Object(c.eb)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
        }

        function Y(e, t, n) {
            var i = Object(r.tc)(e, t, s => {
                n().updateMenu(e), s && Object(r.G)(e, i, n, a.I, t), Object(r.ib)(t) && e.set(a.cb.bind(null, t)), i.hide()
            })
        }

        function J(e, t, n, i, s, o) {
            var c = gpeByClass("_im_dialog", o, n);
            if (cancelEvent(s), !c) return !1;
            var l = intval(domData(c, "peer")),
                d = t.get(),
                u = Object(r.lb)(l) || Object(r.Hb)(l);
            if (d.recentSearch) {
                var m = Object(a.Kb)(l, cur.imDb);
                re(c), 0 === m.length && ue(t, i, e)
            } else Object(r.jb)(t) && u ? Object(a.y)(l, d).then(([n, a]) => {
                n ? (! function(e, t, n, a, r) {
                    var i = geByClass1("_dialog_body", t);
                    addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
                        text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
                        peer: e,
                        spam_id: a
                    }))
                }(l, c, n, a), e().updateMenu(t)) : Y(t, l, e)
            }) : Y(t, l, e);
            return !1
        }

        function Z(e, t, n = "") {
            var {
                photo: a,
                userLink: s
            } = $(e, t.peerId, t, Object(r.jb)(e)), o = function(e) {
                return !Object(r.zb)(e)
            }(e), c = "" === n ? [] : [n];
            return Object(i.K)(e) && c.push("nim-dialog_recent"), Object(r.jb)(e) && c.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && c.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
                peer: t.peerId,
                msg_id: t.lastmsg || "",
                photo: a,
                user_link: s,
                unread: Object(r.Dc)(t.unread),
                tab_name: stripHTML(t.tab),
                is_unread: K(t) ? "nim-dialog_unread" : "",
                is_online: onlinePlatformClass(t.online),
                is_selected: t.peerId == e.get().peer && o ? "nim-dialog_selected _im_dialog_selected" : "",
                more: c.join(" ")
            })
        }

        function ee(e, t) {
            return e.map(e => Object(c.eb)([4].concat(e))).map(e => extend({}, t[e.peerId], {
                message: e
            }))
        }

        function te(e) {
            return {
                type: "empty",
                lang: e
            }
        }

        function ne(e, t) {
            var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
            return void 0 !== n ? 2e9 + n : t.lastmsg
        }

        function ae(e, t, n, a) {
            showTooltip(a, {
                text: function() {
                    var n = gpeByClass("_im_dialog", a, t),
                        r = domData(n, "peer");
                    return e.get().tabs[r].folders & c.q ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                },
                black: 1,
                zIndex: 1,
                shift: [14, 8],
                toup: he(e, a.getBoundingClientRect().top)
            })
        }

        function ie(e, t) {
            var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
                a = geByClass1("_im_unread_blind_label", e);
            val(a, n)
        }

        function oe(e) {
            var t = Object(i.O)(e),
                n = e.get().searchOnlyMessages;
            return Object(r.jb)(e) ? {
                top: t && !n ? 96 : 60,
                bottom: Object(r.kb)(e) ? 42 : 87
            } : {
                top: t && !n ? 36 : 0,
                bottom: 0
            }
        }

        function le(e, t) {
            e.hoverFirstElement(H, oe(t))
        }

        function de(e) {
            e.unhoverElements(H)
        }

        function ue(e, t, n) {
            if (Object(i.c)(e)) {
                t.pipeReplace(Promise.resolve([{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }])), t.toTop()
            } else n().cancelSearch(e), cancelStackFilter("im_search")
        }

        function me(e, t, n, a, s) {
            return {
                selectPeer(t, n) {
                    for (var a = geByClass("_im_dialog", e), r = n.get().peer, i = 0; i < a.length; i++) {
                        var s = a[i],
                            o = intval(domData(s, "peer")),
                            c = intval(domData(s, "msgid"));
                        o === r && (!F(s) || t === c && F(s)) ? (addClass(s, "nim-dialog_selected"), addClass(s, "_im_dialog_selected")) : hasClass(s, "_im_dialog_selected") && (removeClass(s, "nim-dialog_selected"), removeClass(s, "_im_dialog_selected"))
                    }
                },
                appendFastDialogs(t, a, s) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), s ? (n.reset(), Object(r.zb)(t) || Object(i.K)(t) || !d(a) ? Object(i.K)(t) && (d(a) && (a = [{
                        type: "clear_recent"
                    }].concat(a)), Object(i.c)(t) && (a = [{
                        type: "sep_popular"
                    }, {
                        type: "popular_sugg"
                    }].concat(a))) : a = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(a), t.setState({
                        searchOnlyMessages: !1
                    }), n.pipeReplace(Promise.resolve(a)).then(() => le(n, t))) : n.pipe(Promise.resolve(a)), Object(r.jb)(t) && !Object(r.Ab)(t.get().peer) || n.toTop()
                },
                deactivate() {
                    n.deactivate()
                },
                activate() {
                    n.activate()
                },
                hoverFirstDialog(e) {
                    le(n, e)
                },
                hoverNextDialog(e) {
                    n.hoverNextElement(H, A, oe(e))
                },
                hoverPrevDialog(e) {
                    n.hoverPrevElement(H, A, oe(e))
                },
                unhoverDialogs: de.bind(n),
                selectHoveredDialog(t) {
                    var r = geByClass1("_im_dialog_hovered", e);
                    r || (r = geByClass1("_im_dialog", e)), r && R(a, t, n, {}, r)
                },
                appendSearch(t, a, r) {
                    var i = ee(r, a);
                    r.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                        type: "sep_messages"
                    }].concat(i))).then(() => le(n, t))) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([te()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
                },
                update(e) {
                    n.pipeReplace(Promise.resolve(pe(e)))
                },
                updateDialog(t, n) {
                    var a = geByClass1("_im_dialog_" + t);
                    a && !F(a) && V(a, n.get().tabs[t], n, e)
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
                restoreDialogs(t, i, s) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                        searchOnlyMessages: !1
                    }), 0 !== pe(t).length || n.isLoading() || (i = !0), i && n.reset(), s && n.wipe(), n.pipeReplace(Promise.resolve(pe(t))).then(e => {
                        if (i && (!Object(r.jb)(t) || !t.get().peer)) {
                            var s = function(e, t, n) {
                                return Object(r.jb)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!Object(r.jb)(n)).then(() => {
                                    Object(r.jb)(n) || t().toggleSettingsLoader(n, !1)
                                })
                            }(n, a, t);
                            return n.toTop(), s
                        }
                    }).then(() => de(n))
                },
                appendDialogs(t, a) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), a.forEach(n => {
                        var a = geByClass1("_im_dialog_" + n.peerId, e);
                        a && G(a, n, t)
                    }), Object(r.zb)(t) || Object(i.K)(t) || !d(a) || (a = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(a)), t.setState({
                        searchOnlyMessages: !1
                    }), n.isEmpty() && 0 === a.length && Object(r.zb)(t) && (a = [te(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(a)
                },
                updateCounter(t, n) {
                    var a = geByClass1("_im_dialog_" + n, e),
                        s = Object(i.u)(t, n);
                    if (a && !F(a) && (ie(a, s), val(geByClass1("_im_dialog_unread_ct", a), Object(r.Dc)(s.unread)), toggleClass(a, "nim-dialog_unread", s.unread > 0), toggleClass(a, "nim-dialog_unread-out", z(t, s, Q(s).flags))), Object(i.K)(t)) {
                        var o = geByClass1("_im_sugg_" + n);
                        o && (val(geByClass1("_sugg_unread_ct", o), Object(r.Dc)(s.unread)), toggleClass(o, "sugg-is_unread", s.unread > 0))
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
                scrollUp(e, t = !1) {
                    n.toTop(e, t), n.saveScroll("list", !0)
                },
                saveScroll(e) {
                    n.saveScroll("list", !0)
                },
                promoteDialog(a, r) {
                    var s = geByClass1("_im_dialog_" + r, e);
                    s && !F(s) || !Object(i.O)(a) ? (n.pipeReplace(Promise.resolve(pe(a)), void 0, !0).then(t => {
                        !inArray(r, t) && s && V(s, Object(i.u)(a, r), a, e)
                    }), t().updateTyping(r, a)) : n.unsetScroll("list")
                },
                removeSelection(t) {
                    var a = t.get().peer.toString(),
                        i = `._im_dialog_${a}.${A.join(".")}`,
                        s = domQuery(i, e)[0];
                    A.forEach(e => removeClass(s, e)), Object(r.jb)(t) || n.hoverElement(a, H, oe(t))
                },
                updateScroll() {
                    n.updateScroll()
                },
                updateTyping(t, n) {
                    var a = geByClass1(`_im_dialog_${t}`, e);
                    if (a && !F(a) && !n.get().tabs[t].deletedDialog) {
                        var s = geByClass1("_im_dialog_typing", a),
                            o = !Object(r.jb)(n),
                            c = Object(r.P)(Object(i.u)(n, t).activity, t, !Object(r.ib)(t), n.get(), 1, o);
                        val(s, c), toggleClass(a, "nim-dialog_typing", c)
                    }
                },
                unmount() {
                    n.unmount(), Object(o.c)(s)
                }
            }
        }

        function pe(e) {
            var t = e.get(),
                n = t.active_tab,
                a = t.dialog_tabs[n],
                i = t.tabs,
                s = a.map(e => i["" + e]).sort(function(e, t, n) {
                    var a;
                    return t.message && n.message ? (a = n.message.messageId - t.message.messageId, a = Object(r.Bb)(e) ? -a : a) : t.message && !n.message ? a = 1 : n.message && !t.message ? a = -1 : (a = ne(e, n) - ne(e, t), a = Object(r.Bb)(e) ? -a : a), a
                }.bind(null, e));
            if (t.isIncomingMessageRequestsAllowed) {
                var o = t.dialog_tab_cts.mr;
                if (n === m.k && s.unshift({
                        type: "message_request_notice"
                    }), !Object(r.jb)(e)) switch (n) {
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

        function he(e, t) {
            return t > (e.get().gid ? 220 : 150) || Object(i.O)(e)
        }

        function _e(e, t, n) {
            var {
                callMutations: s,
                bindMutations: c
            } = Object(o.b)(me), l = function(e, n) {
                showTooltip(n, {
                    text: () => {
                        if (Object(i.K)(t)) return getLang("mail_hide_from_recent");
                        var e = Number(n.getAttribute("data-peer")),
                            a = Object(i.u)(t, e);
                        return Object(r.ib)(e) ? Object(B.m)(Object(i.u)(t, e), 1024) ? getLang("mail_unfollow_channel") : a.data.closed || a.data.kicked ? getLang("mail_delete") : getLang("mail_leave_chat") : getLang("mail_delete")
                    },
                    black: 1,
                    [Object(r.jb)(t) ? "center" : "needLeft"]: !0,
                    shift: Object(r.jb)(t) ? [-4, 10] : [0, 10],
                    toup: he(t, n.getBoundingClientRect().top),
                    zIndex: 1
                })
            }, d = function(e, n) {
                showTooltip(n, {
                    text: getLang("mail_end_conversation"),
                    black: 1,
                    center: !0,
                    zIndex: 1,
                    shift: [1, 4],
                    toup: he(t, n.getBoundingClientRect().top)
                })
            }, u = ae.bind(null, t, e), p = function(e, t, n, r) {
                var i = gpeByClass("_im_dialog", r, t),
                    s = intval(domData(i, "peer"));
                return e.set(a.Jc.bind(null, s)), setTimeout(function() {
                    ae(e, t, 0, r)
                }, 100), cancelEvent(n), !1
            }.bind(null, t, e), g = function(e, t, n, r, s) {
                var o = gpeByClass("_im_dialog", s, t),
                    c = intval(domData(o, "peer")),
                    l = e.get().tabs[c].lastmsg;
                return e.set(a.vb.bind(null, c, l)).then(() => {
                    V(o, e.get().tabs[c], e, t), Object(i.K)(e) || n().restoreDialogs(e)
                }), showDoneBox(getLang("mail_marked_as_answered"), {
                    out: 1e3
                }), cancelEvent(r), !1
            }.bind(null, t, e, s), _ = geByClass1("_im_dialogs_search"), b = {
                idFn: e => (function(e, t) {
                    return t.message ? t.message.messageId : Object(i.O)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
                })(t, e),
                hoverableFn: e => hasClass(e, "_im_dialog"),
                renderFn: function(e, t) {
                    var {
                        isIncomingMessageRequestsAllowed: n
                    } = e.get();
                    switch (t.type) {
                        case "sep_btn_search_msg":
                            return Object(r.Sb)(e);
                        case "sep_messages":
                            return Object(r.Yb)();
                        case "sep_conversations":
                            return Object(r.Ub)();
                        case "sep_popular":
                            return Object(r.bc)();
                        case "popular_sugg":
                            return Object(r.cc)(e);
                        case "clear_recent":
                            return Object(r.Tb)();
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
                            return t.message ? W(e, t, t.message, {
                                noselect: !0,
                                search: !0
                            }) : t.local_index || Object(i.O)(e) ? Z(e, t) : W(e, t)
                    }
                }.bind(null, t),
                more: function(e, t, n, s) {
                    if (Object(i.O)(e) && e.get().searchAllLoaded || Object(i.K)(e)) return Promise.resolve([]);
                    if (e.get().dialog_search_going || Object(r.jb)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
                    if (Object(i.O)(e)) return Object(a.gc)(Object(i.s)(e), e.get()).then(([e, t]) => ee(t, e));
                    var o = e.get().active_tab,
                        c = e.get().dialog_tabs_all;
                    return o !== m.k && c[m.h] && !Object(r.Bb)(e) || c[o] ? 0 === pe(e).length ? Object(i.J)(e) ? Promise.resolve([{
                        type: "message_request_notice"
                    }, {
                        type: "empty_message_requests"
                    }]) : Promise.resolve([{
                        type: "empty_dialogs"
                    }]) : Promise.resolve([]) : e.set(a.ib).then(t => {
                        var n = pe(e);
                        return 0 === n.length ? Object(i.J)(e) ? Promise.resolve([{
                            type: "message_request_notice"
                        }, {
                            type: "empty_message_requests"
                        }]) : [{
                            type: "empty_dialogs"
                        }] : n
                    })
                }.bind(null, t, s),
                onScroll: !!Object(r.jb)(t) && (() => {
                    (bodyNode.scrollTop || document.documentElement.scrollTop) <= 0 && !layers.visible && browser.safari ? addClass(_, "im-page--header_static") : removeClass(_, "im-page--header_static")
                })
            }, f = M(e, h({
                limit: 40,
                offset: 0,
                nativeScroll: !!Object(r.jb)(t),
                height: D,
                elements: pe(t)
            }), () => b), v = R.bind(null, n, t, f), y = function(e, t, n) {
                removeClass(t.parentNode, "im-page--dialogs_with-mess");
                var a = n.getCurrentElements().filter(e => e.message);
                n.toTop(), n.reset(), Object(L.b)(.01, "im_search_stat", 1, "search_messages_only"), a.length > 0 ? (a = [{
                    type: "sep_messages"
                }].concat(a), e.setState({
                    searchOnlyMessages: !0
                })) : a = [te()], n.pipeReplace(Promise.resolve(a))
            }.bind(null, t, e, f), j = function(e, t, n, i, s, o) {
                var c = intval(domData(o, "peer")),
                    l = domData(o, "action"),
                    d = domData(o, "sid"),
                    u = geByClass1("_im_dialog_" + c, t),
                    m = intval(domData(o, "spam"));
                switch (l) {
                    case "restore":
                        u && e.set(a.Ub.bind(null, c, d, m)).then(() => {
                            addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), V(u, e.get().tabs[c], e, t, !1), i().updateMenu(e)
                        });
                        break;
                    case "spam":
                        var p = `${getLang("mail_im_dialog_marked_spam")}\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="${d}" data-peer="${c}">\n            ${getLang("mail_restore")}\n        </button>`;
                        if (u) {
                            var g = geByClass1("_dialog_body", u);
                            val(g, p), Object(a.Ac)(c, d, e.get())
                        }
                        break;
                    case "block":
                        (Object(r.kb)(e) ? Object(r.nc)(c, e) : Object(r.oc)(c, e)).once("success", function() {
                            e.set(a.I.bind(null, c)).then(() => {
                                n().restoreDialogs(e)
                            })
                        })
                }
                cancelEvent(s)
            }.bind(null, t, e, s, n), O = J.bind(null, n, t, e, f), w = function(e, t) {
                Object(r.Ic)(e, t, a.o)
            }.bind(null, t, n), k = Object(o.a)({
                handlers: (i, s) => {
                    s(e, "click", "_im_dialog_close", O), s(e, "click", "_im_dialog_markre", g), s(e, "click", N, p), s(e, "click", "_im_dialog", v), s(e, "click", r.q, y), s(e, "mouseover", "_im_dialog_close", l), s(e, "mouseover", "_im_dialog_markre", d), s(e, "click", r.i, () => {
                        Object(a.Sb)(cur.imDb), ue(t, f, n)
                    }), s(e, "click", r.u, w), s(e, "mouseover", N, u), s(e, "click", q, j), i(e, "mouseover", throttle(f.unhoverElements.bind(f, H), 100))
                }
            });
            return c(e, s, f, n, k)
        }
        var be = n("O8ze"),
            fe = n("QOPk"),
            ve = n("Wu9C"),
            ye = n("q1tI"),
            je = n("i8i4"),
            Oe = n("T/g7"),
            we = (n("17x9"), n("pemR"));

        function ke(e) {
            return ye.createElement("header", {
                className: Object(we.a)("PopupHeader", e.className),
                style: e.style
            }, e.back && ye.createElement("div", {
                className: "PopupHeader__back",
                onClick: e.onBackClick
            }, ye.createElement("button", {
                className: "PopupHeader__backBtn",
                onClick: e.onBackClick
            }, e.back)), ye.createElement("h2", {
                className: "PopupHeader__title"
            }, e.title), ye.createElement("div", {
                className: "PopupHeader__close"
            }, ye.createElement("button", {
                className: "PopupHeader__closeBtn",
                onClick: e.onCloseClick
            })))
        }
        ke.defaultProps = {
            back: null,
            title: "",
            onCloseClick: () => {}
        };
        var Ce = n("Hx9h"),
            Se = n("XpgC"),
            Ee = n("WDXI"),
            {
                unclean: Ie
            } = window,
            xe = Oe.a.getLang;
        class Te extends ye.PureComponent {
            constructor(e) {
                super(e), this.onSaveTitle = (e => {
                    var t = this.props.store,
                        n = t.get(),
                        r = e.value.trim().replace("\n", "");
                    r && r !== Ie(this.props.title) && (this.setState({
                        titleChanged: !1
                    }), t.set(a.Sc.bind(null, n.peer, r)))
                }), this.onChangeTitle = (e => {
                    if (this.state.title !== e.target.value) {
                        var t = e.target.value.replace("\n", "");
                        this.setState({
                            title: t,
                            titleChanged: Ie(this.props.title) !== t
                        })
                    }
                }), this.onValidateTitle = (e => !!e.trim().replace("\n", "")), this.onCancelTitle = (() => {
                    this.setState({
                        title: Ie(this.props.title),
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
                    Object(B.g)(e) && e.set(a.Ib.bind(null, t)).then(() => e.set(a.L.bind(null, t))).catch(e => Object(p.a)("onPhotoRemove", e))
                }), this.state = {
                    title: Ie(e.title),
                    titleChanged: !1
                }
            }
            render() {
                var {
                    store: e,
                    photo: t,
                    title: n,
                    description: a,
                    grid: r,
                    meta: i
                } = this.props, s = Ie(n), o = Object(B.g)(e), c = Object(we.a)("ChatSettingsInfo", {
                    "ChatSettingsInfo--editable": o
                }), l = Object(we.a)("ChatSettingsInfo__title", {
                    "ChatSettingsInfo__title-service": 64 & this.props.flags
                });
                return ye.createElement("div", {
                    className: c
                }, ye.createElement("header", {
                    className: "ChatSettingsInfo__header"
                }, ye.createElement("div", {
                    className: "ChatSettingsInfo__photo"
                }, ye.createElement("div", {
                    className: "ChatSettingsInfo__attach nim-peer nim-peer_larger",
                    "data-tip": xe("mail_settings_photo"),
                    onClick: this.onPhotoUpload
                }, t ? ye.createElement("img", {
                    src: t,
                    width: "80",
                    height: "80",
                    alt: s,
                    className: "ChatSettingsInfo__photoSelf"
                }) : ye.createElement("div", {
                    className: "nim-peer--photo-w"
                }, ye.createElement("div", {
                    className: "ChatSettingsInfo__photoGrid nim-peer--photo",
                    dangerouslySetInnerHTML: {
                        __html: r
                    }
                }))), t && o && ye.createElement(Se.a, {
                    text: xe("mail_settings_remove_photo"),
                    position: "t",
                    align: "left"
                }, ye.createElement("button", {
                    onClick: this.onPhotoRemove,
                    className: "ChatSettingsInfo__photoRemove"
                }))), ye.createElement("h3", {
                    className: l
                }, o ? ye.createElement(Ee.a, {
                    value: this.state.title,
                    changed: this.state.titleChanged,
                    useEnter: !0,
                    onSave: this.onSaveTitle,
                    onChange: this.onChangeTitle,
                    onCancel: this.onCancelTitle,
                    validate: this.onValidateTitle
                }) : s), ye.createElement("div", {
                    className: "ChatSettingsInfo__meta"
                }, i)), a && ye.createElement("div", {
                    className: "ChatSettingsInfo__description"
                }, o ? ye.createElement(Ee.a, {
                    value: a,
                    onSave: this.onSaveDescription
                }) : a))
            }
        }
        n("KKXr");
        var Me = n("dLHM"),
            Le = n("XTb9"),
            Pe = n("BN/X"),
            {
                elfocus: Be
            } = window,
            De = Oe.a.getLang;
        class Ne extends ye.Component {
            constructor(e) {
                super(e), this.onCopy = (() => {
                    this.input && (Be(this.input, 0, this.input.value.length), document.execCommand("copy"), this.setState({
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
                this.input && Be(this.input, 0, this.input.value.length)
            }
            render() {
                var {
                    onReset: e,
                    invitationLink: t,
                    store: n
                } = this.props, a = De("mail_invite_link_reset_explainer").split("{reset_link}"), i = !Object(r.rb)(n, n.get().peer);
                return ye.createElement("div", {
                    className: "ChatSettingsInvitationLink"
                }, this.props.reseted && ye.createElement("div", {
                    className: "ChatSettingsInvitationLink__reseted"
                }, De("mail_invite_link_reseted_explainer")), ye.createElement("p", null, De("mail_invite_link_explainer")), ye.createElement("div", {
                    className: "ChatSettingsInvitationLink__main"
                }, ye.createElement(Me.a, {
                    ref: this.getInputRef,
                    readOnly: "readonly",
                    className: "ChatSettingsInvitationLink__input",
                    value: t
                }), ye.createElement(Ce.a, {
                    onClick: this.onCopy
                }, De("mail_get_invite_link_copy")), ye.createElement(Le.a, {
                    className: "ChatSettingsInvitationLink__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, De("mail_invite_link_copied"))), i && ye.createElement("p", null, a[0], ye.createElement(Pe.a, {
                    className: "ChatSettingsInvitationLink__reset",
                    onClick: e
                }, De("mail_invite_reset_link")), a[1]))
            }
        }
        var qe = n("6raB"),
            Ae = n("hIV1"),
            He = Oe.a.getLang;
        class Fe extends ye.Component {
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
                return ye.createElement("div", {
                    className: "ChatSettingsResetInvitationLink"
                }, ye.createElement("div", {
                    className: "ChatSettingsResetInvitationLink__text",
                    dangerouslySetInnerHTML: {
                        __html: He("mail_chat_reset_link_warning")
                    }
                }), ye.createElement(Ae.a, {
                    alignment: "right"
                }, ye.createElement(Ce.a, {
                    appearance: "tertiary",
                    onClick: this.props.onCancel
                }, He("global_cancel")), ye.createElement(qe.a, {
                    onClick: this.onConfirm,
                    loading: this.state.loading
                }, He("mail_chat_reset_link_confirm"))))
            }
        }
        var Re = n("enZq"),
            $e = n("p+C8");

        function Ue(e) {
            return ye.createElement("div", {
                className: Object(we.a)("ChatSettingsRoundedIcon", `ChatSettingsRoundedIcon--${e.type}`)
            })
        }
        var ze = Oe.a.getLang;
        class Ke extends ye.Component {
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
                var {
                    store: e,
                    flagsUpdated: t,
                    onHideStatus: n
                } = this.props, a = e.get(), i = a.tabs[a.peer], s = Object(r.rb)(a, a.peer), o = i.inviteLink && Object(B.l)(e) || Object(B.f)(e), c = Object(B.o)(i, a.id) && !s, l = Object(we.a)("ChatSettingsMenu", {
                    "ChatSettingsMenu--copied": this.state.copied
                });
                return ye.createElement("div", {
                    className: "ChatSettings__pane"
                }, ye.createElement(Re.a, {
                    className: l
                }, ye.createElement($e.a, {
                    onClick: this.props.showAttachments,
                    chevron: !0
                }, ye.createElement(Ue, {
                    type: "attach"
                }), ze("mail_im_show_media_history"))), (o || c) && ye.createElement(Re.a, {
                    className: l
                }, o && ye.createElement($e.a, {
                    onClick: this.onShowInviteLink,
                    chevron: Object(B.f)(e)
                }, ye.createElement(Ue, {
                    type: "link"
                }), ze(s ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link"), i.inviteLink && ye.createElement("span", {
                    className: "ChatSettingsMenu__invite"
                }, ye.createElement("span", {
                    className: "ChatSettingsMenu__hidden"
                }, ye.createElement("input", {
                    type: "text",
                    readOnly: !0,
                    value: i.inviteLink,
                    ref: this.getHiddenInput
                })), ye.createElement(Le.a, {
                    className: "ChatSettingsMenu__copied",
                    shown: this.state.copied,
                    callback: this.onBlinkTextHide
                }, ze("mail_invite_link_copied")), ye.createElement(Pe.a, {
                    className: "ChatSettingsMenu__copy",
                    onClick: this.onCopyInviteLink
                }, ze("mail_get_invite_link_copy")))), c && ye.createElement($e.a, {
                    onClick: this.props.showSettings,
                    chevron: !0,
                    aside: ye.createElement(Le.a, {
                        shown: t,
                        callback: n
                    }, ze("global_changes_saved"))
                }, ye.createElement(Ue, {
                    type: "gear"
                }), ze("mail_settings_options"))))
            }
        }
        n("tUrg");
        var We = n("uW+i"),
            Ve = n("NsuH"),
            Ge = n("As6E"),
            Xe = Oe.a.getLang;
        class Qe extends ye.Component {
            constructor(...e) {
                super(...e), this.toggleAdmin = (() => {
                    var {
                        store: e,
                        mid: t,
                        adminMap: n
                    } = this.props, r = e.get().peer, i = !n[t];
                    e.set(a.Fc.bind(null, r, t, i)), e.set(a.Ec.bind(null, r, t, i))
                }), this.kick = (() => {
                    var e = this.props.store,
                        t = e.get().peer,
                        n = this.props.mid;
                    e.set(a.bb.bind(null, t, n)), e.set(a.ab.bind(null, t, n)).catch(e => {
                        Object(p.a)("ChatSettingsMemberEdit.kick", e)
                    })
                }), this.changeAccess = (e => {
                    var t = this.props.store,
                        n = t.get().peer,
                        r = this.props.mid;
                    t.set(a.n.bind(null, n, r, !e)).catch(e => {
                        Object(p.a)("ChatSettingsMemberEdit.changeAccess", e)
                    })
                })
            }
            getMemberRole(e, t) {
                var {
                    storeData: n
                } = this.props, a = n.peer;
                return t === n.tabs[a].ownerId ? Xe("mail_settings_owner") : e[t] ? Xe("mail_settings_admin") : null
            }
            getActions(e) {
                var t = window.vk.id,
                    {
                        store: n,
                        mid: a
                    } = this.props,
                    r = [];
                if (t === a) return [{
                    text: Xe("mail_leave_chat"),
                    onClick: this.props.onLeave
                }];
                if (Object(B.e)(n, a) && r.push({
                        text: e[a] ? Xe("mail_chat_remove_admin") : Xe("mail_settings_appoint_admin"),
                        onClick: this.toggleAdmin
                    }), Object(B.i)(n, a) && r.push({
                        text: Xe("mail_settings_kick"),
                        onClick: this.kick
                    }), Object(i.D)(a) && !e[a]) {
                    var s = Object(B.k)(n, n.get().peer, a),
                        o = s ? "mail_settings_community_mentions_only" : "mail_settings_community_full_access";
                    r.push({
                        text: Xe(o),
                        onClick: this.changeAccess.bind(this, s)
                    })
                }
                return r
            }
            render() {
                var e = window.vk.id,
                    {
                        adminMap: t,
                        storeData: n,
                        mid: a
                    } = this.props,
                    r = !!t[e],
                    i = this.getMemberRole(t, a),
                    s = e === a,
                    o = r && this.getActions(t);
                return ye.createElement(ye.Fragment, null, i && ye.createElement("span", {
                    className: "ChatSettingsMembersEdit__role"
                }, i), o && o.length > 0 && ye.createElement(Ge.a, {
                    position: "b",
                    align: "right",
                    trigger: "hover",
                    marginTop: -8,
                    marginLeft: 1,
                    data: this.getActions(t)
                }, ye.createElement("span", {
                    className: "ChatSettingsMembersEdit__actions"
                })), !r && !s && Object(B.i)(n, a) && ye.createElement(Se.a, {
                    text: Xe("mail_settings_kick"),
                    position: "t",
                    align: "right"
                }, ye.createElement("span", {
                    onClick: this.kick,
                    className: "ChatSettingsMembersEdit__kick"
                })), !r && s && ye.createElement(Se.a, {
                    text: Xe("mail_leave_chat"),
                    position: "t",
                    align: "right"
                }, ye.createElement("span", {
                    onClick: this.props.onLeave,
                    className: "ChatSettingsMembersEdit__kick"
                })))
            }
        }
        var Ye = 50,
            Je = {
                appendParentCls: "ChatSettingsWrapper"
            },
            {
                langSex: Ze,
                langNumeric: et,
                getSmDate: tt
            } = window,
            nt = Oe.a.getLang;
        class at extends ye.Component {
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
                    var {
                        store: t
                    } = this.props, n = t.get(), a = n.peer, i = n.tabs[a], s = i.inviters;
                    if (!s[e]) return "";
                    var o = Object(r.U)(n, [s[e][0]])[0],
                        c = tt(s[e][2], n.timeshift, !0);
                    if (Object(B.o)(i, e)) return this.invitersCache[e] = nt("mail_settings_owner"), nt("mail_settings_owner");
                    if (!o) return this.invitersCache[e] = c, c;
                    var l = Ze(s[e][1], nt("mail_chat_member_invited_by_X", "raw")).replace(/{inviter}/, replaceEntities(o.name)) + " " + c;
                    return this.invitersCache[e] = l, l
                }), this.isAddMemberWidgetShown = (() => {
                    var e = window.vk.id,
                        t = this.props.store,
                        n = t.get().peer,
                        {
                            current: a,
                            showSearch: r,
                            searchQuery: i
                        } = this.state;
                    return "all" === a && !(r && "" !== i) && Object(B.h)(t, n, e)
                }), this.searchInputRef = (e => {
                    this.searchInput = e
                });
                var t = e.store.get(),
                    n = this.getMembers(t),
                    a = this.getAdmins(t);
                this.state = {
                    showSearch: !1,
                    searchQuery: "",
                    current: "all",
                    all: n,
                    allShowMore: n.length > Ye,
                    admins: a,
                    adminsShowMore: a.length > Ye
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
                    allShowMore: this.state.allShowMore && n.length > Ye,
                    admins: a,
                    adminsShowMore: this.state.adminsShowMore && a.length > Ye
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
                var {
                    store: e
                } = this.props, {
                    current: t,
                    showSearch: n,
                    searchQuery: a
                } = this.state;
                if (n && a && this.searchIndex) return this.searchIndex.search(a);
                var i = this.state[t],
                    s = Object(r.U)(e.get(), i);
                return this.state[`${t}ShowMore`] ? s.slice(0, Ye) : s
            }
            getSearchIndex(e) {
                var {
                    vkIndexer: t
                } = window, n = Object(r.U)(this.props.store.get(), e);
                return this.membersMap = n.reduce((e, t) => (e[t.id] = !0, e), {}), new Promise((e, a) => {
                    var r = new t(n, e => e.name, () => {
                        e(r)
                    })
                })
            }
            updateSearchIndex(e, t) {
                var n = Object(r.U)(e, t.removes),
                    a = Object(r.U)(e, t.additions);
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
                var {
                    store: e,
                    membersCount: t,
                    membersAdded: n,
                    onHideStatus: a
                } = this.props, {
                    current: i,
                    showSearch: s,
                    searchQuery: o,
                    allShowMore: c,
                    adminsShowMore: l
                } = this.state, d = e.get(), u = d.peer, m = d.tabs[u], p = this.getCurrentList(), g = this.isAddMemberWidgetShown() ? ["add"].concat(p) : p, h = "all" === i ? c : l, _ = m.membersLastSeen, b = {
                    "ChatSettingsMembersWidget--search": !!s
                }, f = m.adminIds.reduce((e, t) => (e[t] = !0, e), {});
                return ye.createElement("div", {
                    className: Object(we.a)("ChatSettingsMembersWidget", b)
                }, ye.createElement("header", {
                    className: "ChatSettingsMembersWidget__header"
                }, ye.createElement("input", {
                    placeholder: nt("mail_members_search"),
                    className: "ChatSettingsMembersWidget__search",
                    onChange: this.onSearchChange,
                    onInput: this.onSearchChange,
                    onPaste: this.onSearchChange,
                    value: this.state.searchQuery,
                    ref: this.searchInputRef
                }), ye.createElement("button", {
                    className: "ChatSettingsMembersWidget__searchIcon",
                    onClick: this.onToggleSearch
                }), ye.createElement(We.a, {
                    className: "ChatSettingsMembersWidget__tabs",
                    onTabClick: this.onTabClick
                }, ye.createElement("span", {
                    key: "all"
                }, nt("mail_settings_everyone") + " ", ye.createElement("span", {
                    className: "Tabs__desc"
                }, Object(r.Q)(m))), m.adminIds.length > 0 && ye.createElement("span", {
                    key: "admins"
                }, nt("mail_settings_admins") + " ", ye.createElement("span", {
                    className: "Tabs__desc"
                }, m.adminIds.length)))), ye.createElement("div", {
                    className: "ChatSettingsMembersWidget__list"
                }, ye.createElement(Re.a, {
                    border: !1
                }, g.length > 0 && g.map(i => {
                    if ("add" === i) return ye.createElement($e.a, {
                        selectable: !1,
                        border: !1,
                        key: "add",
                        onClick: this.props.showMembersSettings,
                        aside: ye.createElement(Le.a, {
                            className: "ChatSettingsMembersWidget__blink",
                            shown: n,
                            callback: a
                        }, et(t || 0, nt("mail_settings_members_added", "raw")))
                    }, ye.createElement("span", {
                        className: "ChatSettingsMembersWidget__add"
                    }, ye.createElement("span", null, nt("mail_settings_add_members"))));
                    var s = this.getInviter(i.id),
                        o = _ && _[i.id] ? Object(r.W)(d, i.id, _[i.id], Je) : "";
                    return ye.createElement($e.a, {
                        selectable: !1,
                        border: !1,
                        aside: ye.createElement(Qe, {
                            adminMap: f,
                            store: e,
                            storeData: d,
                            mid: i.id,
                            onLeave: this.props.onLeave
                        }),
                        key: i.id
                    }, ye.createElement(Ve.a, {
                        photo: i.photo,
                        title: i.name,
                        description: ye.createElement("span", {
                            title: s,
                            dangerouslySetInnerHTML: {
                                __html: o
                            }
                        }),
                        href: i.link
                    }))
                }), !g.length && s && o && ye.createElement("div", {
                    className: "ChatSettingsMembersWidget__empty"
                }, nt("mail_settings_not_found")), !(s && o) && h && ye.createElement("div", {
                    className: "ChatSettingsMembersWidget__more",
                    onClick: this.onShowMore
                }, nt("mail_settings_show_all_members")))))
            }
        }
        var rt = n("FABD"),
            it = n("DM26"),
            st = Oe.a.getLang,
            {
                showFastBox: ot,
                unclean: ct
            } = window,
            lt = () => {};
        class dt extends ye.Component {
            constructor(e) {
                super(e), this.onChange = (e => {
                    var t = this.props.store.get(),
                        n = e.target.value;
                    Object(a.fc)(n, t).then(e => (this.setSearchResults({}, !1, n, e), n ? (this.isSearching = !0, this.serverSearch(n, e.map(e => e.peerId))) : Promise.resolve([]))).then(this.appendSearchResults).catch(() => {})
                }), this.serverSearch = Object(it.b)((e, t) => {
                    var n = this.props.store;
                    return Object(a.cc)(e, t, "friends", n.get())
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
                    }), e.set(a.i.bind(null, t, n)).then(() => e.set(a.L.bind(null, t)).then(() => {
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
                        }), ot(st("global_error"), e)
                    })
                }), this.setSearchResults = ((e, t, n, a) => {
                    var r = this.props.store.get(),
                        s = Object(i.u)(r, r.peer),
                        o = [];
                    a.forEach(e => {
                        this.data[e.peerId] || (this.data[e.peerId] = e), -1 === s.memberIds.indexOf(e.peerId) && o.push(e.peerId)
                    }), this.setState(Object.assign({}, e, {
                        found: o,
                        value: n
                    }), t || lt)
                }), this.appendSearchResults = (e => {
                    var t = this.props.store.get(),
                        n = Object(i.u)(t, t.peer),
                        a = this.state.found;
                    e.forEach(e => {
                        this.data[e.peerId] || (this.data[e.peerId] = e), -1 === n.memberIds.indexOf(e.peerId) && -1 === a.indexOf(e.peerId) && a.push(e.peerId)
                    }), this.isSearching = !1, this.setState({
                        found: a
                    })
                }), this.state = {
                    selected: [],
                    value: "",
                    loading: !1,
                    found: []
                }, this.data = {}, this.selected = {}
            }
            resetSearch(e, t) {
                return Object(a.fc)("", this.props.store.get()).then(this.setSearchResults.bind(this, e, t, ""))
            }
            componentDidMount() {
                this.resetSearch()
            }
            render() {
                var e = Object.keys(this.state.selected).length;
                return ye.createElement("div", {
                    className: "ChatSettingsMembers"
                }, ye.createElement(rt.a, {
                    className: "ChatSettingsMembers__multiSelect",
                    tokens: this.state.selected.map(e => ({
                        text: ct(this.data[e].name),
                        id: e
                    })),
                    removeTokenPlaceholder: st("mail_create_chat_remove_user"),
                    onRemoveToken: this.onRemoveToken,
                    placeholder: st("mail_search_creation"),
                    value: this.state.value,
                    useInfiniteScroll: !1,
                    onChange: this.onChange,
                    onSelect: this.onSelect,
                    useInfiniteScroll: !0,
                    hasMore: !1,
                    virtualized: !0,
                    loadMore: () => {},
                    notFoundText: st("mail_not_found"),
                    autoFocus: !0,
                    isSearching: this.isSearching
                }, this.state.found.map(e => ye.createElement("div", {
                    className: Object(we.a)("ChatSettingsMembers__entity", {
                        "ChatSettingsMembers__entity--selected": this.selected[e]
                    }),
                    key: e,
                    "data-id": e
                }, ye.createElement(Ve.a, {
                    size: "34",
                    title: this.data[e].name,
                    photo: this.data[e].photo
                })))), ye.createElement(Ae.a, {
                    alignment: "right"
                }, ye.createElement(qe.a, {
                    disabled: 0 === e,
                    onClick: this.onAddPeople,
                    loading: this.state.loading
                }, st(e < 2 ? "mail_append_chat" : "mail_im_create_chat_with"))))
            }
        }
        var ut = n("mSoV"),
            mt = Math.log2 || (e => Math.log(e) / Math.LN2),
            pt = Oe.a.getLang;
        class gt extends ye.Component {
            constructor(e) {
                super(e), this.onChange = (e => {
                    var t = e.name,
                        {
                            value: n
                        } = e.selected,
                        {
                            flags: a
                        } = this.state;
                    this.setState({
                        flags: n ? a | 1 << t : a & ~(1 << t)
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
                var {
                    tab: e
                } = this.props, t = this.state.flags, n = [{
                    value: !0,
                    label: pt("mail_settings_only_admins")
                }, {
                    value: !1,
                    label: pt("mail_settings_all_members")
                }], a = e.serverSettings;
                return ye.createElement("div", {
                    className: "ChatSettingsOptions"
                }, ye.createElement(Re.a, null, ye.createElement($e.a, {
                    selectable: !1,
                    aside: ye.createElement(ut.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: mt(B.c),
                        options: n,
                        value: !!(t & B.c)
                    })
                }, ye.createElement(Ue, {
                    type: "plus"
                }), pt("mail_settings_can_invite")), ye.createElement($e.a, {
                    selectable: !1,
                    aside: ye.createElement(ut.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: mt(B.b),
                        options: n,
                        value: !!(t & B.b)
                    })
                }, ye.createElement(Ue, {
                    type: "pencil"
                }), pt("mail_settings_can_edit_info")), ye.createElement($e.a, {
                    selectable: !1,
                    aside: ye.createElement(ut.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: mt(B.d),
                        options: n,
                        value: !!(t & B.d)
                    })
                }, ye.createElement(Ue, {
                    type: "pin"
                }), pt("mail_settings_can_pin")), ye.createElement($e.a, {
                    selectable: !1,
                    aside: ye.createElement(ut.a, {
                        className: "ChatSettingsOptions__longselect",
                        onChange: this.onChange,
                        name: mt(B.a),
                        options: [{
                            value: !1,
                            label: pt("mail_settings_only_owner")
                        }, {
                            value: !0,
                            label: pt("mail_settings_owner_and_admins")
                        }],
                        value: !!(t & B.a)
                    })
                }, ye.createElement(Ue, {
                    type: "user"
                }), pt("mail_settings_admins_can_add_admins")), a.map(e => ye.createElement($e.a, {
                    selectable: !1,
                    key: e.name,
                    aside: ye.createElement(ut.a, {
                        className: "ChatSettingsOptions__select",
                        onChange: this.onChange,
                        name: mt(e.bit),
                        options: e.options,
                        value: !!(t & e.bit)
                    })
                }, ye.createElement(Ue, {
                    type: e.icon
                }), e.name))), ye.createElement(Ae.a, {
                    alignment: "right"
                }, ye.createElement(Ce.a, {
                    appearance: "tertiary",
                    onClick: this.onCancel
                }, pt("global_cancel")), ye.createElement(qe.a, {
                    onClick: this.onSave,
                    loading: this.state.loading
                }, pt("global_save"))))
            }
        }
        var ht = 0,
            _t = 1,
            bt = 2,
            ft = 3,
            vt = 6,
            yt = 300,
            jt = Oe.a.getLang;
        class Ot extends ye.Component {
            constructor(e) {
                super(e), this.showInvitationLink = (() => {
                    var {
                        store: e
                    } = this.props, t = e.get(), n = t.peer;
                    return this.setState({
                        invitationLoading: !0
                    }), Object(a.M)(n - 2e9, t).then(([e]) => {
                        this.setState({
                            section: bt,
                            invitationLoading: !1,
                            invitationLink: e
                        })
                    })
                }), this.onUpdateFlags = (e => {
                    var {
                        store: t
                    } = this.props, n = t.get(), r = n.peer;
                    return Object(a.Vc)(r, e, n)
                }), this.afterUpdateFlags = (() => {
                    this.go(ht, () => this.setBlinkStatus({
                        flagsUpdated: !0
                    }))
                }), this.afterMembersAdded = (e => {
                    this.go(ht, () => this.setBlinkStatus({
                        membersAdded: !0,
                        membersCount: e
                    }))
                }), this.setBlinkStatus = (e => {
                    this.timers.push(setTimeout(() => this.setState(e), yt))
                }), this.onHideStatus = (() => {
                    this.setState({
                        membersAdded: !1,
                        flagsUpdated: !1
                    })
                }), this.onLeave = (() => {
                    var {
                        store: e,
                        closePopup: t
                    } = this.props, n = e.get().peer, i = Object(r.rb)(e, n), s = showFastBox({
                        title: jt(i ? "mail_leave_channel" : "mail_chat_leave_title"),
                        dark: 1
                    }, jt(i ? "mail_vkcomgroup_leave_confirm" : "mail_chat_leave_confirm"), jt(i ? "mail_leave_channel" : "mail_leave_chat"), function() {
                        e.set(a.Oc.bind(null, n)), e.set(a.cb.bind(null, n)), s.hide(), t(), e.get().longpoll.push([Object(c.Hb)()])
                    }, jt("global_cancel"), function() {
                        s.hide()
                    })
                }), this.onResetLink = (() => {
                    var {
                        store: e
                    } = this.props, t = e.get(), n = t.peer;
                    return Object(a.Rb)(n, t).then(([e]) => {
                        this.setState({
                            invitationLink: e,
                            invitationLinkReseted: !0
                        })
                    })
                }), this.onShowAttachments = (() => {
                    var e = this.props.store.get().peer;
                    window.showWiki({
                        w: "history" + Object(r.I)(e) + "_photo"
                    }, null, {})
                }), this.state = {
                    section: ht,
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
                    case _t:
                        return jt("mail_settings_add_members");
                    case bt:
                    case ft:
                        return jt("mail_chat_invite_link");
                    case vt:
                        return jt("mail_settings_options");
                    default:
                        return jt("mail_settings_title")
                }
            }
            componentWillReceiveProps(e) {
                var t = e.store.get(),
                    n = t.peer,
                    r = t.tabs[n];
                r.photoLarge || r.photoGrid || this.resync || (this.resync = !0, e.store.set(a.L.bind(null, n)).then(() => {
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
                var {
                    store: e,
                    closePopup: t
                } = this.props, n = e.get(), a = n.peer, i = n.tabs[a], s = Object(r.rb)(e, a), o = !s || !e.get().gid, c = jt(s ? "mail_im_n_vkcomgroup_members" : "mail_im_n_chat_members", Object(r.Q)(i));
                return ye.createElement("section", {
                    className: "ChatSettings"
                }, ye.createElement(ke, {
                    title: this.getPopupTitle(),
                    back: this.state.section !== ht ? jt("global_back") : void 0,
                    onCloseClick: t,
                    onBackClick: () => this.go(ht)
                }), this.state.section === ht && ye.createElement("div", {
                    className: "ChatSettings__content"
                }, ye.createElement(Te, {
                    store: e,
                    photo: i.photoLarge,
                    grid: i.photoGrid,
                    title: i.name,
                    flags: i.data.flags,
                    meta: c,
                    description: ""
                }), ye.createElement(Ke, {
                    store: e,
                    showNotificationSettings: () => {},
                    showMembersSettings: () => this.go(_t),
                    showAttachments: this.onShowAttachments,
                    showInvitationLink: this.showInvitationLink,
                    showSettings: () => this.go(vt),
                    membersAdded: this.state.membersAdded,
                    membersCount: this.state.membersCount,
                    flagsUpdated: this.state.flagsUpdated,
                    onHideStatus: this.onHideStatus
                }), s ? null : ye.createElement("div", {
                    className: "ChatSettings__pane"
                }, ye.createElement(at, {
                    store: e,
                    onLeave: this.onLeave,
                    showMembersSettings: () => this.go(_t),
                    membersAdded: this.state.membersAdded,
                    onHideStatus: this.onHideStatus,
                    membersCount: this.state.membersCount
                })), o && ye.createElement("div", {
                    className: "ChatSettings__pane"
                }, ye.createElement(Ce.a, {
                    appearance: ["link", "mobile"],
                    className: "ChatSettings__leave",
                    onClick: this.onLeave
                }, jt(s ? "mail_leave_channel" : "mail_settings_leave")))), this.state.section === _t && ye.createElement(dt, {
                    store: e,
                    afterSave: this.afterMembersAdded
                }), this.state.section === vt && ye.createElement(gt, {
                    tab: i,
                    back: () => this.go(ht),
                    onSave: this.onUpdateFlags,
                    afterSave: this.afterUpdateFlags
                }), this.state.section === bt && ye.createElement(Ne, {
                    store: e,
                    onReset: () => this.go(ft),
                    reseted: this.state.invitationLinkReseted,
                    invitationLink: this.state.invitationLink
                }), this.state.section === ft && ye.createElement(Fe, {
                    onConfirm: this.onResetLink,
                    onCancel: () => this.go(bt)
                }))
            }
        }
        var wt, {
            MessageBox: kt,
            show: Ct,
            hide: St,
            isVisible: Et,
            boxRefreshCoords: It
        } = window;

        function xt(e) {
            var t = Lt();
            t && je.render(ye.createElement(Ot, {
                store: e,
                closePopup: Tt,
                updatePopup: Mt
            }), t)
        }

        function Tt() {
            wt && wt.hide()
        }

        function Mt() {
            wt && wt.updateBoxCoords()
        }

        function Lt() {
            return document.querySelector("#ChatSettings")
        }

        function Pt(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                a = Et(t);
            return {
                unmount() {
                    var t = Lt();
                    t && je.unmountComponentAtNode(t), Object(o.c)(e)
                },
                showLoader() {
                    It(n), Ct(n), a || Ct(t)
                },
                hideLoader() {
                    St(n), a || St(t)
                }
            }
        }

        function Bt(e, t, n) {
            var {
                bindMutations: r
            } = Object(o.b)(Pt), s = t.get(), c = Object(o.a)({
                handlers: (e, t) => {}
            }), l = s.peer, d = r(c);
            var u = function(e, t) {
                    t.get().peer === l ? function(e) {
                        var t = Object(i.u)(e, e.get().peer);
                        t && t.data && !t.data.closed && !t.data.kicked ? xt(e) : Tt()
                    }(t) : e.unmount()
                }.bind(null, d),
                m = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 560,
                    onShow() {
                        xt(t), t.subscribe(u), requestAnimationFrame(() => wt.updateBoxCoords())
                    },
                    onHideAttempt: () => (t.unsubscribe(u), d.unmount(), !0)
                };
            return d.showLoader(), t.set(a.L.bind(null, l)).then(e => {
                d.hideLoader();
                var t = Object(_.q)(e).peer;
                t && t === l ? wt = new kt(m).content('<div id="ChatSettings" class="ChatSettingsWrapper"></div>').show() : d.unmount()
            }), d
        }

        function Dt() {
            return (Dt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        var {
            Provider: Nt,
            Consumer: qt
        } = ye.createContext(), At = Nt;

        function Ht(e) {
            return class extends ye.Component {
                constructor(...e) {
                    super(...e), this.onUpdate = (() => {
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
                    return ye.createElement(qt, null, t => (this.store || (this.store = t), ye.createElement(e, Dt({}, this.props, {
                        store: t
                    }))))
                }
            }
        }
        var Ft = n("vRp6");

        function Rt() {
            return (Rt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        class $t extends ye.Component {
            constructor(...e) {
                super(...e), this.getRef = (e => {
                    this.element = e && e.element
                })
            }
            render() {
                var e = this.props,
                    {
                        className: t
                    } = e,
                    n = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["className"]);
                return ye.createElement(Me.a, Rt({}, n, {
                    className: Object(we.a)(t, "BlockSearchInput"),
                    ref: this.getRef
                }))
            }
        }
        $t.defaultProps = Me.a.defaultProps;
        var Ut = "/images/camera_c.gif";
        class zt extends ye.Component {
            constructor(e) {
                super(e), this.onError = (() => {
                    this.setState({
                        errored: !0
                    })
                }), this.state = {}
            }
            render() {
                var {
                    photo: e,
                    title: t,
                    online: n
                } = this.props;
                return ye.createElement("div", {
                    className: Object(we.a)("Avatar", {
                        "Avatar--online": n,
                        "Avatar--mobile": mobPlatforms[n]
                    })
                }, ye.createElement("div", {
                    className: "Avatar__wrapper"
                }, ye.createElement("img", {
                    onError: this.onError,
                    className: "Avatar__img",
                    src: this.state.errored ? Ut : e,
                    alt: t
                })))
            }
        }
        var Kt = n("ThPM"),
            Wt = n("7p7+"),
            Vt = n("PjZB"),
            Gt = n("rjmT");

        function Xt() {
            return (Xt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        var Qt = Object(it.b)(a.cc, 300),
            {
                Emoji: Yt,
                langNumeric: Jt
            } = window,
            Zt = Oe.a.getLang,
            en = 38,
            tn = 27,
            nn = 40,
            an = 13;
        var rn, sn = Ht(class extends ye.Component {
                constructor(e) {
                    super(e), this.toggleMode = (() => {
                        var e = this.props.store;
                        if (Object(i.C)(e)) {
                            var t = 0 === this.state.mode ? 1 : 0,
                                n = 0 === t ? a.ec : a.ic;
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
                        var {
                            value: t
                        } = e.target;
                        this.searchQuery !== t && (this.searchQuery = t, this.onSearch(t))
                    }), this.filterResults = (e => {
                        var t = Object(i.C)(this.props.store) && 1 === this.state.mode;
                        return e.filter(e => {
                            var n = e.peerId;
                            return !(t && n < 0 || t && n > 2e9 && !Object(B.m)(e, 1024) || !t && n > 2e9 && Object(B.m)(e, 1024))
                        })
                    }), this.onSearch = (e => {
                        var {
                            store: t
                        } = this.props, n = t.get(), r = Object(i.C)(t) && 0 === this.state.mode, s = r ? a.ec : a.ic;
                        return 1 === this.state.mode && "" === e ? this.emptySearch().then(e => {
                            this.setSearchResults(this.filterResults(e))
                        }) : s(e, n).then(t => {
                            var a = t.map(e => e.peerId);
                            return t = this.filterResults(t), this.setSearchResults(t, !1, !t.length), e ? Qt(e, a, "all", {
                                hidegid: r
                            }, n) : Promise.resolve([])
                        }).then(t => {
                            e === this.state.value && this.setSearchResults(this.filterResults(t), !0)
                        }).catch(() => {})
                    }), this.emptySearch = (() => {
                        var {
                            store: e
                        } = this.props, t = e.get(), n = t.dialog_tabs.all, r = {}, s = {};
                        return Object(a.ic)("", t).then(a => (a.forEach(e => {
                            s[e.peerId] = e
                        }), [t.peer].concat(n.filter(e => e != t.peer)).map(t => {
                            var n = Object(i.u)(e, t);
                            return r[t] = !0, {
                                name: s[t] && s[t].name || n.name,
                                photo: s[t] && s[t].photo || n.photo,
                                data: n.data,
                                peerId: t
                            }
                        }).concat(a.filter(e => !r[e.peerId]))))
                    }), this.sendRecipient = (e => {
                        var t = this.props.store,
                            n = t.get();
                        1 === this.state.mode ? (n.longpoll.push([Object(c.gb)(e, !1, !0, !0, "forward_messages_popup")]), Object(be.e)(t), Object(i.C)(t) && Object(be.g)(t, !1)) : this.setState({
                            selected: e,
                            error: null
                        }, () => {
                            Yt.focus(this.input)
                        })
                    }), this.cleanSelectedRecipient = (() => {
                        this.setState({
                            activeElement: -1
                        })
                    }), this.scrollToSelectedUser = (() => {
                        var {
                            found: e,
                            activeElement: t
                        } = this.state, n = this.scrollContainer;
                        if (n) {
                            var a = n.querySelector(`[data-id="${e[t].peerId}"]`);
                            if (a)
                                if (a.offsetTop < n.scrollTop) n.scrollTop = a.offsetTop;
                                else {
                                    var r = a.offsetTop + a.offsetHeight;
                                    r > n.scrollTop + n.offsetHeight && (n.scrollTop = r - n.offsetHeight)
                                }
                            else n.scrollTop = (n.childNodes[1].offsetHeight || 0) * t
                        }
                    }), this.selectRecipient = ((e, t = !0) => {
                        var n = this.validateActiveElement(e);
                        this.state.activeElement !== n && this.setState({
                            activeElement: n
                        }, () => {
                            t && this.scrollToSelectedUser()
                        })
                    }), this.onClick = (e => this.sendRecipient(Number(e.currentTarget.getAttribute("data-id")))), this.loadMore = (() => {}), this.setSearchResults = ((e, t, n = !1) => {
                        if (!this.unmounted)
                            if (t) {
                                var a = e.filter(e => !this.found[e.peerId]);
                                a.forEach(e => {
                                    this.found[e.peerId] = !0
                                }), this.setState({
                                    found: [].concat(this.state.found, a),
                                    loading: n
                                })
                            } else this.found = e.reduce((e, t) => (e[t.peerId] = !0, e), {}), this.setState({
                                found: e,
                                loading: n,
                                activeElement: 0
                            })
                    }), this.getFormRef = (e => {
                        this.form = e
                    }), this.getInputRef = (e => {
                        this.input = e
                    }), this.getSearchRef = (e => {
                        this.searchInput = e && e.element
                    }), this.getScrollContainerRef = (e => {
                        this.scrollContainer = je.findDOMNode(e)
                    }), this.getEmojiButtonRef = (e => {
                        this.emojiButton = e
                    }), this.onEmojiButtonMouseOver = (e => {
                        e.persist(), Yt.show(this.emojiButton, e)
                    }), this.onEmojiButtonMouseOut = (e => {
                        e.persist(), Yt.hide(this.emojiButton, e)
                    }), this.send = (() => {
                        var e = this.props.store,
                            t = this.state.selected,
                            n = Yt.val(this.input).trim(),
                            s = new Gt.a({}, 0),
                            o = e.get().pendingForward;
                        if (t && !Object(r.ub)(val)) {
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
                                Object(a.jb)([t], {
                                    hidegid: !0
                                }, e.get()).then(([e]) => n(e[t]))
                            }).then(n => e.set(a.lc.bind(null, t, l, Xt({
                                hash: n
                            }, d)))).then(() => {
                                Object(be.g)(e, !0), e.setState({
                                    pendingForward: null
                                }), this.props.closePopup(), showDoneBox(Zt("mail_send3"))
                            }).catch(e => {
                                this.unmounted || this.setState({
                                    sending: !1
                                }, () => {
                                    showFastBox(Zt("mail_error"), e)
                                })
                            })
                        }
                    }), this.onSearchKeyDown = (e => {
                        e.keyCode === tn && this.state.value && (this.searchInput.blur(), this.searchQuery = "", this.setState({
                            value: "",
                            loading: !0,
                            error: null
                        }, this.onSearch.bind(this, "")), e.stopPropagation())
                    }), this.onMessageInputKeyDown = (e => {
                        e.keyCode === tn && (this.state.sending || (Yt.val(this.input, ""), this.setState({
                            selected: null
                        }), this.searchInput.focus()), e.stopPropagation())
                    }), this.onKeydown = (e => {
                        var {
                            activeElement: t
                        } = this.state;
                        switch (e.which || e.keyCode) {
                            case en:
                                this.selectRecipient(t - 1), e.preventDefault();
                                break;
                            case nn:
                                this.selectRecipient(t + 1), e.preventDefault();
                                break;
                            case an:
                                var {
                                    found: n,
                                    activeElement: a
                                } = this.state;
                                n[a] && (this.sendRecipient(n[a].peerId), e.preventDefault())
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
                    if (!Object(r.ib)(e)) return "";
                    var {
                        store: t
                    } = this.props, n = Object(i.u)(t, e);
                    return n && n.membersCount ? Jt(n.membersCount, Zt("mail_im_n_chat_members", "raw")) : ""
                }
                validateActiveElement(e) {
                    return e > this.state.found.length - 1 ? this.state.found.length - 1 : e < 0 ? 0 : e
                }
                componentDidMount() {
                    this.props.updatePopup(), Yt.init(this.input, {
                        noStickers: !0,
                        onSend: this.send
                    }), this.input.addEventListener("keydown", this.onMessageInputKeyDown), this.searchInput.addEventListener("keydown", this.onKeydown), this.searchInput.addEventListener("keydown", this.onSearchKeyDown)
                }
                componentWillUnmount() {
                    this.input.removeEventListener("keydown", this.onMessageInputKeyDown), this.searchInput.removeEventListener("keydown", this.onKeydown), this.searchInput.removeEventListener("keydown", this.onSearchKeyDown), this.unmounted = !0
                }
                render() {
                    var {
                        store: e,
                        closePopup: t
                    } = this.props, {
                        mode: n,
                        loading: a,
                        selected: r,
                        found: s,
                        sending: o,
                        activeElement: c
                    } = this.state;
                    return ye.createElement("section", {
                        className: Object(we.a)("MessageForward", {
                            "MessageForward--form": 0 === n && !!r
                        })
                    }, ye.createElement(ke, {
                        title: ye.createElement(ye.Fragment, null, ye.createElement("span", {
                            className: "MessageForward__title"
                        }, Zt("mail_forward_messages")), Object(i.C)(e) && ye.createElement("span", {
                            className: "MessageForward__switch",
                            onClick: this.toggleMode
                        }, Zt(0 === n ? "mail_forward_to_community_messages" : "mail_forward_to_im"))),
                        onCloseClick: t
                    }), ye.createElement("div", {
                        className: "MessageForward__content",
                        onMouseLeave: this.cleanSelectedRecipient
                    }, ye.createElement($t, {
                        value: this.state.value,
                        onChange: this.onChange,
                        placeholder: Zt("mail_top_search"),
                        autoFocus: !0,
                        key: "search",
                        ref: this.getSearchRef
                    }), a && ye.createElement("div", {
                        className: "MessageForward__results",
                        key: "loading"
                    }, ye.createElement(Wt.a, {
                        className: "MessageForward__stub"
                    }, ye.createElement(Vt.a, null))), !a && 0 === s.length && ye.createElement("div", {
                        className: "MessageForward__results",
                        key: "no-results"
                    }, ye.createElement(Wt.a, null, Zt("mail_im_search_empty_chats"))), !a && s.length > 0 && ye.createElement(Ft.a, {
                        virtualized: !0,
                        className: "MessageForward__results",
                        loadMore: this.loadMore,
                        hasMore: !1,
                        ref: this.getScrollContainerRef,
                        key: "results"
                    }, s.map(({
                        peerId: t,
                        name: a,
                        photo: s,
                        online: o
                    }, l) => ye.createElement($e.a, {
                        key: t,
                        "data-id": t,
                        onClick: this.onClick,
                        chevron: 1 === n,
                        active: l === c,
                        canBeHovered: !1,
                        onMouseEnter: this.selectRecipient.bind(null, l, !1),
                        aside: 0 === n ? ye.createElement("span", {
                            className: Object(we.a)("MessageForward__radio", {
                                "MessageForward__radio--selected": +r === t
                            })
                        }) : ""
                    }, ye.createElement(Ve.a, {
                        size: "34",
                        title: a,
                        photo: Array.isArray(s) ? ye.createElement(Kt.a, {
                            photos: s
                        }) : ye.createElement(zt, {
                            online: (Object(i.u)(e, t) || {}).online || o,
                            title: a,
                            photo: s
                        }),
                        description: this.getMembersCount(t)
                    })))), ye.createElement("footer", {
                        className: "MessageForward__footer",
                        ref: this.getFormRef,
                        key: "footer"
                    }, ye.createElement("div", {
                        className: "MessageForward__form _emoji_field_wrap"
                    }, ye.createElement("div", {
                        className: "MessageForward__input",
                        tabIndex: "0",
                        contentEditable: !0,
                        role: "textbox",
                        "aria-multiline": !0,
                        ref: this.getInputRef,
                        placeholder: Zt("mail_im_enter_msg")
                    }), ye.createElement("div", {
                        className: "MessageForward__emoji emoji_smile_wrap _emoji_wrap"
                    }, ye.createElement("div", {
                        ref: this.getEmojiButtonRef,
                        className: "emoji_smile _emoji_btn",
                        title: Zt("global_emoji_hint"),
                        onMouseOver: this.onEmojiButtonMouseOver,
                        onMouseOut: this.onEmojiButtonMouseOut,
                        onClick: this.onEmojiButtonClick
                    }, ye.createElement("div", {
                        className: "emoji_smile_icon_vector emoji_smile_icon"
                    })))), o ? ye.createElement("div", {
                        className: "MessageForward__send-spinner"
                    }, ye.createElement(Vt.a, null)) : ye.createElement("button", {
                        className: "MessageForward__send",
                        onClick: this.send
                    }))))
                }
            }),
            {
                MessageBox: on,
                show: cn,
                hide: ln,
                isVisible: dn,
                getLang: un,
                boxRefreshCoords: mn
            } = window;

        function pn() {
            rn && rn.hide()
        }

        function gn() {
            rn && rn.updateBoxCoords()
        }

        function hn() {
            return document.querySelector("#MessageForward")
        }

        function _n(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                a = dn(t);
            return {
                unmount() {
                    var t = hn();
                    t && je.unmountComponentAtNode(t), Object(o.c)(e)
                },
                showLoader() {
                    mn(n), cn(n), a || cn(t)
                },
                hideLoader() {
                    ln(n), a || ln(t)
                }
            }
        }

        function bn(e, t, n) {
            var {
                bindMutations: r
            } = Object(o.b)(_n), i = r(Object(o.a)({
                handlers: (e, t) => {}
            })), s = {
                hideButtons: !0,
                bodyStyle: "padding: 0; background: none;",
                width: 500,
                onShow() {
                    ! function(e) {
                        var t = hn();
                        t && je.render(ye.createElement(At, {
                            value: e
                        }, ye.createElement(sn, {
                            getLang: un,
                            closePopup: pn,
                            updatePopup: gn
                        })), t)
                    }(t), requestAnimationFrame(() => rn.updateBoxCoords())
                },
                onHideAttempt: () => (t.set(a.Cb.bind(null, null)), i.unmount(), !0)
            };
            return i.showLoader(), Promise.resolve().then(e => {
                i.hideLoader(), rn = new on(s).content('<div id="MessageForward"></div>').show()
            }), i
        }
        var fn = "_im_action",
            vn = "_im_page_peer_name",
            yn = "_ui_menu",
            jn = "_im_dialog_action_wrapper",
            On = "_im_mess_actions",
            wn = "_im_page_action",
            kn = "_im_chat_topic_change_input",
            Cn = "_im_chat_verified",
            Sn = "im-page--chat-header_chat",
            En = "im-page--chat-header_vkcomgroup",
            In = "_im_page_peer_name",
            xn = "_im_chat_members",
            Tn = "_im_chat_invite_link",
            Mn = "_im_page_reconnect",
            Ln = "._im_page_status",
            Pn = "im-page--chat-header_reconnected",
            Bn = `<a tabindex="0" role="link" class="ui_actions_menu_item ${fn} im-action im-action_%icon%" data-action="%action%">%name%</a>`;

        function Dn(e, t, n) {
            return !e.map(e => {
                var a = Object(i.n)(t, n, e);
                return Object(s.h)(a)
            }).reduce((e, t) => e && t, !0)
        }

        function Nn(e, t) {
            var n = t.get(),
                a = n.peer,
                r = n.tabs[a].pinned;
            return 1 === e.length && r && e[0] === Object(i.S)(r).messageId
        }

        function qn(e, t, n) {
            var a = getLang("mail_selected_shorted", t.length);
            Fn({
                actions: !0
            }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
                label: a.replace("{count}", t.length),
                tip: getLang("mail_deselect_all")
            }));
            var s = Object(i.u)(n, n.get().peer),
                o = e.querySelector("." + On),
                c = Dn(t, n, n.get().peer),
                l = Nn(t, n),
                d = Object(r.ib)(s.peerId) && Object(B.j)(n, s.peerId),
                u = Object(r.rb)(n, s.peerId),
                m = e.querySelector(`.${wn}[data-action="respond"]`),
                p = Boolean(Object(i.V)(s)),
                g = Boolean(Object(i.U)(s));
            toggleClass(o, "im-page--mess-actions_important", !c), toggleClass(o, "im-page--mess-actions_pinned", l), toggleClass(o, "im-page--mess-actions_vkcomgroup", u && !n.get().gid), toggleClass(o, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(o, "im-page--mess-actions_no-pin-btn", !d), toggleClass(o, "im-page--mess-actions_out-mr", p), toggleClass(o, "im-page--mess-actions_in-mr", g), t.length > 1 ? m.innerHTML = getLang("mail_forward_here") : m.innerHTML = getLang("mail_im_mark_reply");
            var h = c ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
                _ = l ? getLang("mail_unpin") : getLang("mail_pin");
            attr(geByClass1("im-page-action_star", e), "aria-label", h), attr(geByClass1("im-page-action_pin", e), "aria-label", _)
        }

        function An(e, t, n) {
            var s = t.get(),
                o = s.peer,
                c = s.tabs[o],
                l = clean(stripHTML(unclean(c.tab))),
                d = geByClass1(Cn, e),
                u = geByClass1(r.r),
                m = Object(r.ib)(o),
                p = m && Object(r.rb)(t, o);
            d.tt = !1;
            var g = Object(r.Zb)(t, c, !0),
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
                        if (!t || Object(P.c)(e, t.userId)) return !1;
                        return t.userId
                    }(t);
                f && Object(ve.a)(t, o) && (v ? t.set(a.hb.bind(null, {
                    [o]: [v]
                })).then(An.bind(null, e, t, n)) : b.pinned = !0)
            }
            var y = "";
            m ? y = p ? getTemplate("im_vkcomgroup_members", {
                name: getLang("mail_im_n_vkcomgroup_members", Object(r.Q)(c))
            }) : _ ? getTemplate("im_chat_members", {
                name: getLang("mail_im_n_chat_members", Object(r.Q)(c))
            }) : "" : Object(r.Hb)(o) && (y = Object(r.X)(t, o));
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
                w = Hn(t) && !c.top_banner,
                k = geByClass1(vn, e);
            if (removeClass(k, r.k), show(geByClass1(jn, e)), removeClass(geByClass1(On, e), "im-page--mess-actions_visible"), removeClass(geByClass1(On, e), "im-page--mess-actions_all-sel"), function(e, t, n) {
                    geByClass("_im_header_icon", e).forEach(e => {
                        if (n.length > 0) hide(e);
                        else if ("star" === domData(e, "type") && Object(r.pb)(t) && (toggleClass(e, "im-page--header-icon_star-active", Object(r.sb)(t)), setStyle(e, {
                                display: "inline-block"
                            })), "answer" === domData(e, "type") && Object(r.pb)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", Object(r.Fb)(t)), Object(r.Fb)(t) ? setStyle(e, {
                                display: "inline-block"
                            }) : hide(e)), "search" === domData(e, "type") && !Object(r.kb)(t)) {
                            var a = Object(r.qb)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                            setStyle(e, {
                                display: "inline-block"
                            }), toggleClass(e, "im-page-header-icon_search-shown", a)
                        }
                    })
                }(e, t, []), Object(r.jb)(t)) {
                var C = geByClass1("_im_page_back", e);
                attr(C, "href", `${Object(r.T)(t)}?tab=${s.active_tab}`)
            }
            Fn(b, "im-page--chat-header"), Object(r.H)(t, w, O, n)
        }

        function Hn(e) {
            var t = Object(i.q)(e),
                n = geByClass1(r.r);
            if (removeClass(n, "im-page--pinned_with-bar"), t && Object(s.j)(t)) {
                if (void 0 === t.kludges.attach1_tr_amount) return;
                t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
            }
            var a = Object(r.ac)(e);
            return val(n, a), !!a
        }

        function Fn(e, t) {
            var n = geByClass1(t);
            Object.keys(e).forEach(a => {
                toggleClass(n, `${t}_${a}`, !!e[a])
            })
        }

        function Rn(e, t, n, r, i) {
            e.set(a.Ob.bind(null, n, i, r)).then(t().removeMessagesRestore.bind(null, n, i, r)), Object(a.Lb)(n, i, null, r, e.get())
        }

        function $n(e, t, n) {
            if (Object(r.ib)(t)) {
                var i = e.get().tabs[t].name,
                    s = function(e, t, n, r, i, s) {
                        if ("keydown" !== s.type || 13 === s.which) {
                            var o = trim(val(i));
                            return o ? (o !== n && e.set(a.Sc.bind(null, t, o)), !0) : (notaBene(i), !1)
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
                    c = geByClass1(kn, o.bodyNode);
                elfocus(c), addEvent(c, "keydown", function(e) {
                    s(c, e) && o.hide()
                })
            }
        }

        function Un(e, t, n, s, o, l) {
            var d = domData(l, "action"),
                u = geByClass1(yn, s).parentNode,
                m = e.get().peer;
            switch (d) {
                case "clear":
                    var p = Object(i.u)(e, m),
                        g = Object(r.rc)(p, m, () => {
                            Object(r.G)(e, g, t, a.I, e.get().peer)
                        });
                    break;
                case "photos":
                case "media":
                    showWiki({
                        w: "history" + Object(r.I)(m) + "_photo"
                    }, null, {});
                    break;
                case "topic":
                    $n(e, m, t);
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
                    e.set(a.Gc.bind(null, !1, m)).then(() => {
                        e.get().longpoll.push([Object(c.Hb)()]), showDoneBox(getLang("mail_community_was_blocked"))
                    });
                    break;
                case "allow_community":
                    e.set(a.Gc.bind(null, !0, m)).then(() => {
                        n().changeActions(e)
                    });
                    break;
                case "block":
                    Object(r.nc)(m, e).once("success", t => {
                        t.delta && (showDoneBox(t.msg), e.get().longpoll.push([Object(c.Hb)()]))
                    });
                    break;
                case "leave":
                    var h = Object(r.tc)(e, m, n => {
                        n && Object(r.G)(e, h, t, a.I, m), e.set(a.cb.bind(null, m)), e.set(a.Oc.bind(null, m)), h.hide(), e.get().longpoll.push([Object(c.Hb)()])
                    });
                    break;
                case "invite_link":
                    var _ = function(e, t, n) {
                            var r = showFastBox({
                                title: getLang("mail_chat_invite_link"),
                                dark: 1
                            }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(i) {
                                var s = gpeByClass("_im_invite_box", n.target),
                                    o = geByClass1(Tn, s),
                                    c = geByClass1("_im_invite_new", s);
                                lockButton(r.btns.ok[0]), Object(a.Rb)(t, e.get()).then(([e]) => {
                                    unlockButton(r.btns.ok[0]), o.value = e, unlockButton(c), addClass(s, "im-invite-box_reseted"), elfocus(o, 0, e.length), r.hide()
                                })
                            }, getLang("global_cancel"), function() {
                                r.hide()
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
                            b = geByClass1(Tn, e.bodyNode), j = geByClass1("_im_reset_link", e.bodyNode), O = geByClass1("_im_invite_copy", e.bodyNode), f = geByClass1("_im_invite_copied", e.bodyNode), elfocus(b, 0, b.value.length), addEvent(j, "click", _), addEvent(O, "click", y)
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
                    e.set(a.Zb.bind(null, m)).then(e => e.set(a.Q.bind(null, m))).then(t().updateChatTopic.bind(null, m)).catch(e => {
                        showFastBox(getLang("global_error"), e)
                    });
                    break;
                case "unmute":
                case "mute":
                    e.set(a.Lc.bind(null, m, "mute" === d)).then(t().updateState.bind(null, m));
                    break;
                case "chat":
                case "invite":
                    if (Object(r.ib)(m)) Object(r.fb)(e, m, t, a.qc);
                    else if (Object(r.Hb)(m)) {
                        var w = e.get().tabs[m],
                            k = [
                                [m, w.tab]
                            ];
                        e.set(a.qc.bind(null, "chat", [])).then(() => t().showCreation(e, k))
                    }
                    break;
                case "pin_hide":
                    Object(ve.c)(e, Object(i.p)(e), t);
                    break;
                case "pin_unhide":
                    Object(ve.d)(e, Object(i.p)(e), t);
                    break;
                case "unpin":
                    Object(ve.e)(e, Object(i.p)(e), t);
                    break;
                case "settings":
                    n().showSettings(e)
            }
            uiActionsMenu.toggle(u, !1), t().cancelEditing()
        }

        function zn(e, t, n) {
            var r = e.get().selectedMessages;
            e.set(a.t).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
        }

        function Kn(e, t, n, a) {
            var i, s, o = Object(r.jb)(e);
            switch (domData(a, "type")) {
                case "star":
                    s = [4, 6], i = (() => Object(r.sb)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important"));
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

        function Wn(e, t, n) {
            var a = Object(r.jb)(e),
                i = domData(n.target, "action");
            "respond" !== i && "forward" !== i && showTooltip(n.target, {
                text: function(e, t) {
                    var n = e.get(),
                        a = n.selectedMessages,
                        r = n.peer;
                    switch (t) {
                        case "pin":
                            return Nn(a, e) ? getLang("mail_unpin") : getLang("mail_pin");
                        case "star":
                            return Dn(a, e, r) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
                        case "delete":
                            return getLang("mail_delete");
                        case "spam":
                            return getLang("mail_im_mark_spam")
                    }
                }.bind(null, e, i) || "",
                black: 1,
                shift: [2, a ? -4 : 11],
                forcetodown: !0,
                appendParentCls: "_im_dialog_actions"
            })
        }

        function Vn(e, t) {
            var n = Number(t),
                a = Object(r.O)(n, !0),
                i = getLang("mail_network_waiting").replace(/{timer}/gi, a);
            e.querySelector(Ln).innerHTML = i
        }

        function Gn(e, t, n, s) {
            var c = {};
            return {
                changeActions(t) {
                    var n = geByClass1(yn, e),
                        r = geByClass1(jn, e),
                        i = t.get().curActions,
                        s = Object.keys(i).map((e, t) => {
                            var n = "";
                            return 7 !== a.a[e] && 10 !== a.a[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(Bn, {
                                name: i[e].name,
                                icon: i[e].icon,
                                action: e
                            })
                        }).join("");
                    0 === Object.keys(i).length ? addClass(r, "im-page--header-more_loading") : (val(n, s), removeClass(r, "im-page--header-more_loading"))
                },
                setNetworkWaitingStatus(t) {
                    c.interval && clearInterval(c.interval), Vn(e, t), c.timeout = t, c.interval = setInterval(() => {
                        c.timeout > 1 ? (c.timeout--, Vn(e, c.timeout)) : (clearInterval(c.interval), c = {})
                    }, 1e3)
                },
                setNetworkReconnectingStatus() {
                    c.interval && clearInterval(c.interval), c = {},
                        function(e) {
                            var t = e.querySelector(Ln),
                                n = getLang("mail_network_reconnecting");
                            t && (t.innerHTML = n)
                        }(e)
                },
                clearNetworkStatus() {
                    c.interval && clearInterval(c.interval), c = {}, e.querySelector(Ln).innerHTML = ""
                },
                showSettings(e) {
                    var t = e.get(),
                        n = Object(i.u)(e, t.peer);
                    n.data.closed || n.data.kicked || Bt(0, e)
                },
                showForward(e) {
                    bn(0, e)
                },
                renderPeer(n) {
                    An(e, n, t)
                },
                reRenderPinned(e) {
                    var t = Object(i.h)(e);
                    t && t.pinned && Hn(e)
                },
                renderActions(t) {
                    var n = t.get().selectedMessages || [];
                    n.length > 0 && qn(e, n, t)
                },
                hideActions(t) {
                    if (!Object(r.qb)(t, t.get().peer)) {
                        var n = geByClass1(jn, e);
                        addClass(n, "im-page--header-more_loading")
                    }
                },
                changedMessageSelection(n) {
                    if (0 !== n.get().peer) {
                        var a = n.get().selectedMessages || [];
                        a.length > 0 ? qn(e, a, n) : An(e, n, t)
                    }
                },
                updateLastSeen(t) {
                    ! function(e, t) {
                        var n = e.get().peer,
                            a = geByClass1("_im_page_peer_online", t);
                        a && Object(r.Hb)(n) && Object(i.u)(e, n) && Object(r.y)(a, Object(r.X)(e, n))
                    }(t, e)
                },
                deselectAll(e) {
                    zn(e, t, s)
                },
                unmount() {
                    Object(o.c)(n), cancelStackFilter("fowrward")
                }
            }
        }

        function Xn(e, t, n) {
            var {
                callMutations: s,
                bindMutations: l
            } = Object(o.b)(Gn), d = function(e, t, n, s, o) {
                var l = e.get().selectedMessages,
                    d = domData(o, "action"),
                    u = e.get().peer,
                    m = !0,
                    p = Object(i.u)(e, u);
                if ("star" !== d && Object(i.V)(p)) return zn(e, t, n);
                switch (d) {
                    case "delete":
                        var g = !(vk.id == u && !e.get().gid) && l.every(t => Object(r.B)(e, Object(i.n)(e, u, t)));
                        if (g || l.length > 1) {
                            m = !1;
                            var h = Object(r.vc)(u, l.length, g, r => {
                                zn(e, t, n), h.hide(), cur.imDb.updateByKey("del_forall_checked", r), r ? Object(a.Lb)(l, u, null, "deleteforall", e.get()) : Rn(e, t, l, d, u)
                            })
                        } else Rn(e, t, l, d, u);
                        break;
                    case "spam":
                        Rn(e, t, l, d, u);
                        break;
                    case "forward":
                        Object(a.Eb)(l, e.get().peer, e).then(t => e.set(a.Cb.bind(null, t))).then(() => n().showForward(e)).catch(e => console.error(e));
                        break;
                    case "star":
                        var _ = Dn(l, e, u);
                        e.set(a.G.bind(null, l, _, u)), e.get().longpoll.push(l.map(e => ({
                            type: _ ? c.Y : c.U,
                            messageId: e,
                            peerId: u,
                            flags: c.l
                        })));
                        break;
                    case "respond":
                        var b = e.get(),
                            f = 1 === l.length;
                        Object(a.Eb)(l, b.peer, e).then(t => e.set(a.K.bind(null, t, b.tfdraft, f))).then(() => {
                            t().respond(e, u)
                        });
                        break;
                    case "pin":
                        var v = Object(i.m)(e, l[0]),
                            y = Nn(l, e),
                            j = y ? a.Oc.bind(null, u) : a.Ab.bind(null, v, u),
                            O = y ? a.Nc.bind(null, u) : a.zb.bind(null, v, u),
                            w = function(e, t, n) {
                                return e().updateChatTopic(t, n), n
                            }.bind(null, t, u);
                        e.set(a.r.bind(null, e, v, u)).then(e => e.set(j)).then(w).then(e => e.set(O)).then(w)
                }
                m && zn(e, t, n)
            }.bind(null, t, n, s), u = Un.bind(null, t, n, s, e), m = zn.bind(null, t, n, s), p = (e, n) => Object(r.Bc)(n, t.get().peer), g = Kn.bind(null, t, e), h = Wn.bind(null, t, e), _ = function(e, t, n, r, s) {
                switch (domData(s, "type")) {
                    case "star":
                        e.set(a.Jc.bind(null, e.get().peer)).then(() => {
                            setTimeout(() => Kn(e, 0, 0, s), 40)
                        });
                        break;
                    case "search":
                        n().showSearch(e), window.tooltips && tooltips.hide(s, {
                            fasthide: !0
                        });
                        break;
                    case "answer":
                        var o = Object(i.u)(e, e.get().peer);
                        o && (e.set(a.vb.bind(null, e.get().peer, o.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                            out: 1e3
                        }), e.get().longpoll.push([Object(c.Hb)()]))
                }
            }.bind(null, t, e, n), b = () => s().showSettings(t), f = t => {
                !gpeByClass(Sn, t.target, e) || gpeByClass(En, t.target, e) || checkEvent(t) || (b(), cancelEvent(t))
            }, v = () => (function(e) {
                var t = () => {
                    e && (e.classList.remove(Pn), e.removeEventListener("mouseleave", t))
                };
                e && (e.classList.add(Pn), e.addEventListener("mouseleave", t)), window.lpConnect.abortWaiting()
            })(e), y = Object(o.a)({
                handlers: (n, a) => {
                    a(e, "click", wn, d), a(e, "click", fn, u), a(e, "click", r.k, m), a(e, "mouseover", Cn, p), a(e, "mouseover", "_im_header_icon", g), a(e, "mouseover", wn, h), a(e, "click", "_im_header_icon", _), a(e, "click", "_im_header_link", f), a(e, "click", In, f), a(e, "click", xn, b), a(e, "click", Mn, v), a(e, "click", "_im_page_back", e => {
                        checkEvent(e) || (t.get().longpoll.push([Object(c.Hb)()]), cancelEvent(e))
                    })
                }
            });
            return Object(r.Ab)(t.get().peer) || setTimeout(() => {
                t.set(a.oc).then(s().changeActions)
            }), l(e, n, y, s)
        }
        var Qn, Yn, Jn, Zn, ea, ta, na, aa, ra, ia, sa, oa, ca, la, da = n("g6Ay"),
            ua = 600,
            ma = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest;

        function pa(e) {
            var t = e % 60;
            return parseInt(e / 60) + ":" + (t < 10 ? "0" : "") + t
        }
        var ga = !1,
            ha = !1,
            _a = 100;

        function ba(e) {
            if (!ha) {
                ha = !0, Object(r.Kb)(ta);
                var t = {
                    peer: aa.get().peer,
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
                        var s = new ma;
                        s.onload = s.onerror = function(e) {
                            var a = e.currentTarget.response;
                            200 == this.status && a.length > 0 && "{" == a[0] ? (a = JSON.parse(a), t(a)) : n()
                        }, s.open("POST", la.upload_url, !0), s.send(a)
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
                            ja(), sa([
                                ["doc", e + "_" + a, "audiomsg"]
                            ], {}, t.peer), Ea(), n()
                        },
                        onFail: function(e) {
                            a(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()).then(() => {
                    Object(r.Kc)(ta), ha = !1
                }).catch(() => {
                    ha = !1, Object(r.Kc)(ta), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
                })
            }
        }

        function fa() {
            ca(), Yn.innerHTML = pa(ga.duration), ga.duration >= ua && Sa()
        }

        function va() {
            ca(), stManager.add(["voice_message_player.js", "speech.js"], function() {
                ga || (ga = Speech.newRecorder(), addEvent(ga, "progress", fa)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), ga.record().then(() => {
                    ! function(e) {
                        la.isRecording = !0, cancelStackPush("audio_message_cancel", function(e) {
                            e.set(a.l).then(ka)
                        }.bind(null, e))
                    }(aa), hideProgress(geByClass1("im-audio-message-send-wrapper", Qn)), show(ta), Yn.innerHTML = "0:00", addClass(Qn, "im-audio-message_recording"), removeClass(Qn, "im-audio-message_recorded"), show(Qn), hide(geByClass1("_im_chat_input_parent")), (ia = Speech.createVisualization("wave", ga.source, Jn)).start();
                    var e = Jn.getBoundingClientRect();
                    _a = (e.right - e.left) / 3
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

        function ya() {
            ga && ga.stop(), ia && (ia.destroy(), ia = null)
        }

        function ja() {
            la.isRecording = !1, cancelStackFilter("audio_message_cancel")
        }

        function Oa() {
            wa(), ba(ga)
        }

        function wa() {
            AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(ga, "finish", wa), removeEvent(ga, "finish", Oa),
                function(e) {
                    var t = URL.createObjectURL(ga.buffer);
                    domData(ra, "duration", ga.duration), domData(ra, "ogg", t), domData(ra, "mp3", t), geByClass1("audio-msg-track--duration", ra).innerHTML = pa(ga.duration), geByClass1("audio-msg-track--wave-wrapper", ra).innerHTML = AudioMessagePlayer.getWave(ga.wave, _a)
                }(), removeClass(Qn, "im-audio-message_recording"), addClass(Qn, "im-audio-message_recorded")
        }

        function ka(e = !0) {
            ja(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(ga, "finish", wa), removeEvent(ga, "finish", Oa), ya(), Ea(), e && oa()
        }

        function Ca() {
            ga.isRecording ? (addEvent(ga, "finish", Oa), removeEvent(ga, "finish", wa), ya()) : ba(ga)
        }

        function Sa() {
            addEvent(ga, "finish", wa), removeEvent(ga, "finish", Oa), ya()
        }

        function Ea() {
            removeClass(Qn, "im-audio-message_recorded"), removeClass(Qn, "im-audio-message_recording"), hide(Qn), show(geByClass1("_im_chat_input_parent"))
        }

        function Ia() {
            ge("audiomsg_record"), ra = ge("audiomsg_player"), Qn = geByClass1("im-audio-message-input"), Yn = geByClass1("audio-msg-track--duration", Qn), Jn = geByClass1("audio-msg-track--wave", Qn), ea = geByClass1("im-audio-message--cancel-btn", Qn), ta = geByClass1("_im_audio_send", Qn), na = geByClass1("audio-msg-track--btn", Qn), geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
            var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
            addClass(e, "_voice_field_wrap"), addEvent(Zn, "click", va), addEvent(ea, "click", ka), addEvent(ta, "click", Ca), addEvent(na, "click", Sa)
        }

        function xa() {
            ! function() {
                ga && removeEvent(ga, "progress", fa);
                removeEvent(Zn, "click", va), removeEvent(ea, "click", ka), removeEvent(ta, "click", Ca), removeEvent(na, "click", Sa)
            }(), ra = Qn = Yn = Jn = Zn = ea = ta = na = null
        }

        function Ta(e, t, n) {
            return {
                cancelRecording: ka,
                start: function() {
                    va()
                },
                unmount() {
                    ka(!1), xa()
                }
            }
        }

        function Ma(e, t, n, i, s) {
            aa = t, la = t.get().audio_msg, ca = function(e) {
                var {
                    peer: t
                } = e.get();
                Object(r.qb)(e, t) && !Object(r.hb)(e) && Date.now() - (Object(r.ab)(e, t).lastTyping || 0) > 1e3 * a.b && e.set(a.mc.bind(null, t))
            }.bind(null, t), sa = n, oa = s, Object(da.a)(), Object(r.R)().then(e => {
                var n = e.length > 0;
                n ? (Ia(), i()) : setCookie("remixvoice", "0", 7), t.set(a.zc.bind(null, n))
            }).catch(e => {
                throw setCookie("remixvoice", "0", 7), e
            });
            var {
                bindMutations: c
            } = Object(o.b)(Ta);
            return c(e, t, n)
        }
        var La = n("6aSF"),
            Pa = n("nAFc"),
            Ba = n("/PiP"),
            Da = n("EasH"),
            Na = n("t7n3");

        function qa() {
            return (qa = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        var Aa = 6217559,
            Ha = "vkpay",
            Fa = "location",
            Ra = "open_app";
        class $a extends ye.Component {
            constructor(...e) {
                super(...e), this.onButtonClick = (() => {
                    var {
                        props: e
                    } = this, {
                        action: t,
                        sendMessage: n,
                        appHash: a
                    } = e;
                    switch (t.type) {
                        case Ha:
                            t.app_id = Aa;
                        case Ra:
                            var r = t.app_id;
                            t.owner_id && (r += "_" + t.owner_id), Object(Ba.C)({
                                w: "app" + r + encodeURIComponent("#" + t.hash),
                                from_keyboard: 1,
                                app_hash: a
                            });
                            break;
                        case Fa:
                            cur.sendLocation = function(e, a) {
                                a(), n({
                                    action: {
                                        label: "",
                                        attaches: [e],
                                        payload: t.payload
                                    }
                                })
                            }, Object(Da.b)("al_places.php", {
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
                    return n = (n = n.toLowerCase()).replace("default", "secondary"), t === Ra && e === Aa && (t = Ha), t === Ha && (n = "primary"), ["keyboard-button", n, t]
                }), this.getButtonLabel = (e => {
                    var {
                        label: t,
                        type: n
                    } = e;
                    switch (n) {
                        case Fa:
                            t = getLang("mail_keyboard_label_location");
                            break;
                        case Ha:
                            t = (t = getLang("mail_keyboard_label_vkpay")).replace(/ VK Pay$/, "");
                            break;
                        default:
                            t = Object(Pa.a)(t || ""), t = Object(Na.c)(t).replace(/\n(\r)?/gi, " "), t = Emoji.emojiToHTML(t, !0)
                    }
                    return t
                })
            }
            render() {
                var e = this.props,
                    {
                        action: t
                    } = e,
                    n = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["action", "sendMessage", "appHash"]),
                    a = this.getButtonAppearance(),
                    r = this.getButtonLabel(t);
                return ye.createElement(Ce.a, qa({
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
        var Ua = Ht(class extends ye.Component {
            render() {
                var e = this.props.store,
                    t = Object(i.g)(e),
                    n = e.get().keyboard_app_hash;
                return t && t.buttons ? ye.createElement("div", {
                    className: Object(we.a)("Keyboard", {
                        "Keyboard--hidden": t.hide
                    })
                }, ye.createElement(La.a, {
                    className: "Keyboard__scroll-wrapper"
                }, ye.createElement("div", {
                    className: "Keyboard__container"
                }, t.buttons.map((e, t) => ye.createElement("div", {
                    key: `row-${t}`,
                    className: "Keyboard__row"
                }, e.map((t, a) => ye.createElement("div", {
                    className: "Keyboard__button",
                    key: `row-${a}`,
                    style: {
                        width: (e => `calc(100% / ${e} - 10px)`)(e.length)
                    }
                }, ye.createElement($a, qa({
                    sendMessage: this.props.send,
                    appHash: n
                }, t))))))))) : null
            }
        });

        function za() {
            return document.getElementById("_im_keyboard_container")
        }

        function Ka(e, t, n) {
            return {
                init() {
                    return new Promise(e => {
                        this.isMounted = !0,
                            function(e, t, n) {
                                var a = za();
                                if (a) {
                                    var r = ye.createElement(At, {
                                        value: e
                                    }, ye.createElement(Ua, {
                                        send: t
                                    }));
                                    je.render(r, a, n)
                                }
                            }(t, n, e)
                    })
                },
                toggle: (e, n, r) => t.set(a.Kc.bind(null, e, n, r)),
                unmount() {
                    var t = za();
                    t && this.isMounted && je.unmountComponentAtNode(t), this.isMounted = !1, Object(o.c)(e)
                }
            }
        }
        n("Oyvg");
        var Wa = Oe.a.getLang;
        var Va = Ht(class extends ye.Component {
            constructor(...e) {
                super(...e), this.elementOnClick = ((e, t) => {
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
                var {
                    getTemplates: e,
                    showSettingsPopup: t,
                    showCreatingTemplatePopup: n,
                    isNeededRendering: a
                } = this.props, {
                    isShowDropDown: r
                } = this.state;
                if (!a()) return null;
                var i = e();
                return ye.createElement("div", {
                    className: "TemplatesDropDown",
                    onMouseOver: this.toggleDropdown.bind(this, !0),
                    onMouseOut: this.toggleDropdown.bind(this, !1)
                }, ye.createElement("div", {
                    className: Object(we.a)("TemplatesDropDown__wrapper", {
                        "TemplatesDropDown__wrapper--show": r
                    }),
                    "aria-hidden": r
                }, ye.createElement("div", {
                    className: "TemplatesDropDown__container"
                }, ye.createElement(La.a, {
                    className: "TemplatesDropDown__scroll-wrapper"
                }, ye.createElement("div", null, " ", ye.createElement("header", {
                    className: "TemplatesDropDown__header"
                }, ye.createElement("h2", {
                    className: "TemplatesDropDown__title"
                }, Wa("mail_community_templates")), ye.createElement("a", {
                    role: "button",
                    className: "TemplatesDropDown__setting-button",
                    onClick: t
                }, Wa("mail_settings_configure"))), i.length ? ye.createElement("ul", {
                    className: "TemplatesDropDown__list"
                }, i.map(e => ye.createElement("li", {
                    key: e.id,
                    className: "TemplatesDropDown__item",
                    onMouseDown: this.elementOnClick.bind(null, e.id)
                }, ye.createElement("h3", {
                    className: "TemplatesDropDown__item-name",
                    dangerouslySetInnerHTML: {
                        __html: e.name
                    }
                }), ye.createElement("div", {
                    className: "TemplatesDropDown__item-content",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                })))) : ye.createElement("div", {
                    className: "TemplatesDropDown__not-found-container"
                }, ye.createElement("span", null, Wa("mail_community_templates_not_found")), ye.createElement(Pe.a, {
                    onClick: n
                }, Wa("mail_add_community_template"))))))), ye.createElement("button", {
                    className: "TemplatesDropDown__icon"
                }))
            }
        });

        function Ga() {
            return (Ga = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }

        function Xa(e, t) {
            var n = !!window.getSelection && window.getSelection(),
                a = !1;
            if (n && n.rangeCount) {
                var r = n.getRangeAt(0);
                a = r.commonAncestorContainer ? r.commonAncestorContainer : r.parentElement ? r.parentElement() : r.item(0)
            }
            for (var i = a; i && i != e;) i = i.parentNode;
            i || Emoji.editableFocus(e, !1, !0), Emoji.insertHTML(t)
        }
        class Qa extends ye.Component {
            constructor(...e) {
                super(...e), this.onChange = (() => {
                    this.props.onChange && this.props.onChange(Emoji.val(this.container))
                }), this.containerRef = ye.createRef(), this.state = {
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
                    {
                        tabIndex: t,
                        isMultiLine: n
                    } = e,
                    a = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["tabIndex", "isMultiLine", "initialValue"]);
                return ye.createElement("div", Ga({
                    role: "textbox",
                    ref: this.containerRef,
                    tabIndex: t,
                    contentEditable: !0,
                    "aria-multiline": n
                }, a))
            }
        }
        Qa.defaultProps = {
            isMultiLine: !1,
            tabIndex: 0,
            initialValue: ""
        };
        var Ya = Qa,
            Ja = Oe.a.getLang,
            Za = () => [{
                id: "user name",
                label: Ja("mail_community_templates_hint_name"),
                process: e => Object(P.c)(e, Object(i.p)(e)).first_name
            }, {
                id: "user surname",
                label: Ja("mail_community_templates_hint_last_name"),
                process(e) {
                    var t = Object(P.c)(e, Object(i.p)(e));
                    return t.name.replace(t.first_name, "").trim()
                }
            }, {
                id: "admin name",
                label: Ja("mail_community_templates_hint_your_name"),
                process: e => Object(P.c)(e, vk.id).first_name
            }, {
                id: "admin surname",
                label: Ja("mail_community_templates_hint_your_last_name"),
                process(e) {
                    var t = Object(P.c)(e, vk.id);
                    return t.name.replace(t.first_name, "").trim()
                }
            }, {
                id: "community",
                label: Ja("mail_community_templates_hint_community"),
                process: e => Object(P.c)(e, e.get().id).name
            }, {
                id: "greeting",
                label: Ja("mail_community_templates_hint_greeting"),
                process(e) {
                    var t = (new Date).getHours();
                    return Ja(t >= 3 && t < 12 ? "mail_greeting_good_morning" : t >= 12 && t < 17 ? "mail_greeting_good_afternoon" : t >= 17 && t <= 23 ? "mail_greeting_good_evening" : "mail_greeting_good_night")
                }
            }],
            er = Oe.a.getLang,
            tr = "main",
            nr = "edit";
        class ar extends ye.Component {
            constructor(...e) {
                super(...e), this.setEditableMessage = (({
                    id: e,
                    name: t,
                    text: n
                }) => new Promise(a => this.setState({
                    editableMessage: {
                        id: e,
                        name: t,
                        text: n
                    }
                }, a))), this.onChangeEditableMessage = ((e, t) => this.setEditableMessage(Object.assign({}, this.state.editableMessage, {
                    [e]: Object(Pa.c)(t)
                }))), this.deleteTemplate = (e => Promise.resolve().then(() => this.state.section !== tr ? this.go(tr) : Promise.resolve()).then(() => this.props.store.set(a.A.bind(null, e))).catch(() => {
                    showFastBox(er("mail_error"), er("mail_community_templates_delete_error"))
                })), this.saveTemplate = (e => {
                    e.preventDefault();
                    var {
                        editableMessage: t
                    } = this.state, {
                        name: n,
                        text: a
                    } = t;
                    n.length > 200 || n.length < 2 || n.length > 2e3 || a.length < 5 ? showFastBox(er("mail_error"), er("mail_form_is_filled_in_incorrectly")) : this.props.saveTemplate(t).catch(() => {
                        showFastBox(er("mail_error"), er("mail_community_templates_save_error"))
                    }).then(() => this.go(tr))
                }), this.addHint = ((e, t) => {
                    t.preventDefault();
                    var {
                        editableMessage: {
                            id: n = null,
                            name: a,
                            text: r
                        }
                    } = this.state;
                    return Xa(this.textarea, `{${e.id}}`), this.setEditableMessage({
                        id: n,
                        name: a,
                        text: `${r}{${e.id}} `
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
            go(e, {
                id: t = null,
                name: n = "",
                text: a = ""
            } = {}) {
                return new Promise(r => {
                    this.state.section !== e ? this.setState({
                        section: e,
                        editableMessage: {
                            id: t,
                            name: n,
                            text: a
                        }
                    }, () => {
                        this.props.popup.updateBoxCoords(), r()
                    }) : r()
                })
            }
            render() {
                var {
                    getTemplates: e,
                    closePopup: t
                } = this.props, {
                    section: n,
                    editableMessage: a
                } = this.state, r = e();
                return ye.createElement("section", {
                    className: "TemplatesSettings"
                }, ye.createElement(ke, {
                    title: ye.createElement("span", {
                        className: "TemplatesSettings__title"
                    }, n === tr && er("mail_community_templates"), n === nr && er("mail_add_community_template")),
                    onCloseClick: t
                }), ye.createElement("main", {
                    className: "TemplatesSettings__content"
                }, n === tr && (r.length ? ye.createElement(La.a, {
                    className: "TemplatesSettings__scroll-wrapper"
                }, ye.createElement("div", {
                    className: "TemplatesSettings__list"
                }, r.map(e => ye.createElement("section", {
                    key: e.id,
                    className: "TemplatesSettings__item"
                }, ye.createElement("h3", {
                    className: "TemplatesSettings__item-name",
                    dangerouslySetInnerHTML: {
                        __html: e.name
                    }
                }), ye.createElement("div", {
                    className: "TemplatesSettings__item-content",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                }), ye.createElement("div", {
                    className: "TemplatesSettings__buttons-row"
                }, ye.createElement(Pe.a, {
                    onClick: () => this.go(nr, e),
                    className: "TemplatesSettings__item-button"
                }, er("mail_settings_edit")), ye.createElement("span", {
                    className: "TemplatesSettings__buttons-splitter",
                    "aria-hidden": "true"
                }, " · "), ye.createElement(Pe.a, {
                    onClick: this.deleteTemplate.bind(null, e.id),
                    className: "TemplatesSettings__item-button"
                }, er("mail_delete"))))))) : ye.createElement("div", {
                    className: "TemplatesSettings__not-found-container"
                }, ye.createElement("span", null, er("mail_community_templates_not_found")), ye.createElement(Pe.a, {
                    onClick: () => this.go(nr)
                }, er("mail_add_community_template")))), n === nr && ye.createElement("form", {
                    className: "TemplatesSettings__form",
                    id: "create_template_form",
                    onSubmit: this.saveTemplate
                }, ye.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, ye.createElement("label", {
                    className: "TemplatesSettings__label",
                    htmlFor: "name"
                }, er("mail_name"), ":"), ye.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, ye.createElement(Ya, {
                    id: "name",
                    type: "text",
                    initialValue: a.name,
                    className: "TemplatesSettings__input",
                    onChange: this.onChangeEditableMessage.bind(null, "name")
                }), ye.createElement("span", {
                    className: "TemplatesSettings__notice"
                }, er("mail_community_templates_input_size").replace("{min}", 2).replace("{max}", "200")))), ye.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, ye.createElement("label", {
                    className: "TemplatesSettings__label",
                    htmlFor: "text"
                }, er("mail_text"), ":"), ye.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, ye.createElement(Ya, {
                    id: "text",
                    name: "text",
                    isMultiLine: !0,
                    ref: this.getTextAreaRef,
                    initialValue: a.text,
                    className: "TemplatesSettings__textarea",
                    onChange: this.onChangeEditableMessage.bind(null, "text")
                }), ye.createElement("span", {
                    className: "TemplatesSettings__notice"
                }, er("mail_community_templates_input_size").replace("{min}", 5).replace("{max}", "2 000")))), ye.createElement("div", {
                    className: "TemplatesSettings__form-row"
                }, ye.createElement("label", {
                    className: "TemplatesSettings__label"
                }, er("mail_hints"), ":"), ye.createElement("div", {
                    className: "TemplatesSettings__input-container"
                }, Za().map(e => ye.createElement(Ce.a, {
                    type: "button",
                    onMouseDown: this.addHint.bind(null, e),
                    appearance: "secondary",
                    className: "TemplatesSettings__hint",
                    key: e.id
                }, e.label)))))), ye.createElement("footer", {
                    className: "TemplatesSettings__footer"
                }, n === tr && ye.createElement(ye.Fragment, null, ye.createElement(Pe.a, {
                    onClick: () => this.go(nr)
                }, er("mail_add_community_template")), ye.createElement(Ce.a, {
                    onClick: t
                }, er("mail_close"))), n === nr && ye.createElement(ye.Fragment, null, ye.createElement("div", null, a.id && ye.createElement(Pe.a, {
                    onClick: this.deleteTemplate.bind(null, a.id)
                }, er("mail_delete_community_template"))), ye.createElement("div", null, ye.createElement(Ce.a, {
                    appearance: "tertiary",
                    onClick: () => this.go(tr)
                }, er("mail_cancel")), ye.createElement(Ce.a, {
                    onClick: this.saveTemplate,
                    form: "create_template_form",
                    type: "submit"
                }, er("mail_save"))))))
            }
        }
        ar.defaultProps = {
            section: tr
        };
        var rr = Ht(ar),
            {
                MessageBox: ir
            } = window;

        function sr(e, t) {
            return Za().reduce((t, n) => t.replace(new RegExp(`({${n.id}})`, "gi"), n.process(e)), t).replace(/&lt;br&gt;/gi, "<br>")
        }

        function or(e, t, n, r, s) {
            var o;
            return {
                closeSettingsPopup() {
                    o && o.hide()
                },
                showSettingsPopup(e) {
                    (o = new ir({
                        hideButtons: !0,
                        bodyStyle: "padding: 0; background: none;",
                        width: 500,
                        onShow: () => {
                            var n = document.getElementById("TemplatesSettings");
                            n && je.render(ye.createElement(At, {
                                value: t
                            }, ye.createElement(rr, {
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
                    var n = Object(i.w)(t).find(({
                        id: t
                    }) => t === e);
                    Object(be.d)(t, n.id), r(sr(t, Object(Pa.d)(n.text)))
                },
                getPreparedTemplates: () => Object(i.w)(t).map(e => Object.assign({}, e, {
                    name: e.name,
                    text: sr(t, e.text)
                })),
                saveTemplate(e) {
                    var n = Object(Pa.a)(e.name),
                        r = Object(Pa.a)(e.text);
                    return t.set(e.id ? a.fd.bind(null, e.id, n, r) : a.x.bind(null, n, r))
                },
                deleteTemplate: e => t.set(a.A.bind(null, e)),
                isNeedRenderTemplates: () => !!Object(i.p)(t) && (!!Object(i.C)(t) && !(Object(i.p)(t) > 2e9 && Object(B.m)(Object(i.h)(t), 1024))),
                toggleImText(e = this.isNeedRenderTemplates()) {
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

        function cr(e, t) {
            return t.queues[e].currEv = !1, Promise.resolve(t)
        }

        function lr(e, t) {
            var n = t.queues[e].currEv;
            return n ? (t.queues[e].errored.push(n), cr(e, t)) : Promise.resolve(t)
        }

        function dr(e, t, n) {
            return n.queues[e] ? (n.queues[e].errored = t ? [] : n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], cr(e, n)) : Promise.resolve(n)
        }

        function ur(e, t, n, a) {
            var r = a.get().queues[e];
            if (r && !r.currEv && r.evs.length > 0 && !r.pause) {
                var i = ur.bind(null, e, t, n, a),
                    s = r.evs.shift();
                r.currEv = s, t(e, s).then(() => {
                    a.get().opts.waitCommit || a.set(cr.bind(null, e))
                }).then(i).catch(t => a.set(lr.bind(null, e)).then(() => {
                    n(e, function(e, t) {
                        var n = mr(e, t.get()).errored;
                        return n.length > 0 && n[n.length - 1]
                    }(e, a), t)
                }).then(i))
            }
        }

        function mr(e, t) {
            return t.queues[e] || (t.queues[e] = {
                evs: [],
                pause: !1,
                errored: [],
                currEv: !1
            }), t.queues[e]
        }

        function pr(e, t, n) {
            return mr(e, n).pause = t, Promise.resolve(n)
        }

        function gr(e) {
            Object.keys(e.get().queues).forEach(t => {
                e.set(lr.bind(null, t)), e.set(dr.bind(null, t, !1))
            })
        }

        function hr(e, t, n) {
            var a = h({
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
            }(a.get())), gr(a)) : gr(a), {
                pushMessage: (n, r) => a.set(function(e, t, n) {
                    return t.ts = Date.now(), mr(e, n).evs.push(t), Promise.resolve(n)
                }.bind(null, n, r)).then(a => {
                    ur(n, e, t, a)
                }),
                resend: (n, r) => a.set(function(e, t, n) {
                    var a = n.queues[e];
                    return a.errored.filter(e => e.mess.messageId === t).forEach(e => {
                        e.failed = !1, a.evs.push(e)
                    }), a.errored = a.errored.filter(e => e.mess.messageId !== t), Promise.resolve(n)
                }.bind(null, n, r)).then(i => {
                    var s = a.get().queues[n].evs.filter(e => e.mess.messageId === r)[0];
                    return ur(n, e, t, a), s
                }),
                reset: n => a.set(dr.bind(null, n, !0)).then(a => {
                    ur(n, e, t, a)
                }),
                setErrored: (e, t) => a.set(n => {
                    return mr(e, n).errored = t, Promise.resolve(n)
                }),
                pause(e) {
                    a.set(pr.bind(null, e, !0))
                },
                isPaused: e => !!mr(e, a.get()).pause,
                complete(n, r) {
                    var i = a.get();
                    i.queues[n].currEv && i.queues[n].currEv.rid === r && a.set(cr.bind(null, n)).then(() => {
                        ur(n, e, t, a)
                    })
                },
                resume(n) {
                    a.set(pr.bind(null, n, !1)).then(Object(it.c)(.1)).then(() => {
                        ur(n, e, t, a)
                    })
                },
                inspectQueue(e, t = !1) {
                    if (!a.get().queues[e]) return [];
                    var n = a.get().queues[e];
                    return (t && n.currEv ? [n.currEv] : []).concat(n.evs.slice()).concat(n.errored.slice().map(e => extend({}, e, {
                        failed: !0
                    }))).sort((e, t) => e.ts - t.ts)
                }
            }
        }
        var _r = n("hOuX"),
            br = n("rCUf"),
            fr = "_im_upload_dropbox",
            vr = "jpg jpeg png gif heic heif".split(" "),
            yr = ["application/vnd.rn-realmedia-vbr", "application/vnd.rn-realmedia"];

        function jr(e) {
            var t = vr.slice(0, vr.length);
            if ("types" === e) {
                for (var n = t.length, a = 0; a < n; ++a) t.push(t[a].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + vr.join(",.") : "mask" === e ? vr.join("|") : ""
        }

        function Or(e, t, n) {
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

        function wr(e) {
            var t = void 0 !== e.ind ? e.ind : e,
                n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                a = n ? t + "_" + n : e,
                r = ge("upload" + a + "_progress_wrap");
            return r && hide(geByClass1("progress_x", r)), a
        }

        function kr(e, t) {
            if (!e().canAddMedia()) return "none";
            if (!t.items || !t.items.length) return "media";
            var n = "^(" + jr("mask") + ")";
            return [].slice.call(t.items).every(e => {
                var t = e.type.split("/");
                return new RegExp(n, "i").test(t[1])
            }) ? "photo" : [].slice.call(t.items).every(e => {
                return "video" === e.type.split("/")[0] || ~yr.indexOf(e.type)
            }) ? "video" : "doc"
        }

        function Cr(e) {
            var t = geByClass1(fr),
                n = geByClass1("im-page--chat-header").getBoundingClientRect(),
                a = geByClass1("im-chat-input").getBoundingClientRect();
            (n.width < 10 || a.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = a.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
        }

        function Sr() {
            var e = geByClass1(fr);
            hide(e)
        }

        function Er(e, t, n) {
            return {
                loaded: t,
                total: n,
                fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
            }
        }

        function Ir(e, t, n, a) {
            "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e), a().reHeight(n)
        }

        function xr(e, t, n, a) {
            var r = t.get().upload_opts,
                i = geByClass1("_im_upload_photo"),
                s = geByClass1("_im_drop_photo");
            return Upload.init(i, r.url, r.params, {
                accept: jr("accept"),
                file_name: "photo",
                file_size_limit: 26214400,
                file_types: jr("types"),
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
                        var r = wr(e);
                        ajax.post("al_photos.php", extend({
                            act: "choose_uploaded"
                        }, t), {
                            onDone: function(e, t) {
                                a().choose("photo", e, extend(t, {
                                    upload_ind: r
                                }))
                            },
                            onFail: Or.bind(null, a, e)
                        })
                    }(e, r, 0, n) : Ir(e, a, t, n)
                },
                onUploadProgress(e, t, a) {
                    var r = void 0 !== e.ind ? e.ind : e;
                    n().progress("photo", r, Er(e, t, a))
                },
                onUploadError(e, t) {
                    statlogsValueEvent("upload_photo_fails", 1, r.opts.server, t), Or(n, e)
                },
                onDragEnter(e) {
                    var t = geByClass1("im-audio-message_recording");
                    e.dataTransfer && !t && Cr(kr(n, e.dataTransfer))
                },
                onDragOut() {
                    Sr()
                },
                onDrop() {
                    Sr()
                }
            })
        }

        function Tr(e, t, n) {
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
                        var r = wr(e),
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
                                a().choose("doc", e + "_" + t, extend(n, {
                                    upload_ind: r
                                }))
                            },
                            onFail: Or.bind(null, a, e)
                        })
                    }(e, i, a, n) : Ir(e, r, t, n)
                },
                onUploadProgress(e, t, a) {
                    var r = void 0 !== e.ind ? e.ind : e;
                    n().progress("doc", r, Er(e, t, a))
                },
                onUploadError(e, t) {
                    statlogsValueEvent("upload_doc_fails", 1, a.opts.server, t), Or(n, e)
                }
            })
        }

        function Mr(e, t, n) {
            removeEvent(bodyNode, "dragover dragenter");
            var r = Tr(0, t, n),
                i = function(e, t, n, r) {
                    var i = t.get().upload_video_params;
                    if (i) {
                        var s = geByClass1("_im_upload_video"),
                            o = geByClass1("_im_drop_video");
                        return i.options.visible_dropbox = !1, Object(br.b)(s, o, i, null, {
                            onUploadStart: function(e, t) {
                                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                            },
                            onUploadComplete: function(e, r) {
                                var i = window.parseJSON(r);
                                i.video_id ? Object(br.d)(e, i, t.get().textMediaSelector, (e, n) => {
                                    var r = document.querySelector('[data-video="' + n + '"]'),
                                        i = e.editable.sizes.x[0] || e.thumb;
                                    if (r && i) {
                                        r.style.backgroundImage = `url(${i})`;
                                        var s = gpeByClass("_im_mess", r);
                                        "im" === cur.module && s && Object(a.hd)(t, s)
                                    }
                                }) : Ir(e, r, t, n)
                            },
                            onUploadProgress: function(e, t, a) {
                                var r = void 0 !== e.ind ? e.ind : e;
                                n().progress("video", r, Er(e, t, a))
                            },
                            onUploadError: function(e, t) {
                                statlogsValueEvent("upload_video_fails", 1, i.options.server, t), Or(n, e)
                            },
                            onNoFilteredCallback: function(e) {
                                Upload.onFileApiSend(r, e)
                            },
                            onDragEnter: function(e) {
                                var t = geByClass1("im-audio-message_recording");
                                e.dataTransfer && !t && Cr(kr(n, e.dataTransfer))
                            },
                            onDragOut: function() {
                                Sr()
                            },
                            onDrop: function() {
                                Sr()
                            }
                        })
                    }
                }(0, t, n, r),
                s = xr(0, t, n, i);
            cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
            var c = Object(o.a)({
                handlers: e => {
                    var t = ge("im_full_upload");
                    e(t, "change", function a(r) {
                        if (window.Upload && r.target.files) {
                            if (n().canAddMedia()) {
                                var l = Array.from(r.target.files),
                                    d = l.filter(e => Upload.checkFileType(e.name, jr("types"))),
                                    u = l.filter(e => Upload.checkFileType(e.name, Object(br.c)("types")));
                                Upload.onFileApiSend(s, d), Upload.onFileApiSend(i, u)
                            } else showFastBox(getLang("global_error"), getLang("global_error"));
                            Object(o.c)(c);
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
                    Object(o.c)(c), Upload.deinit(s), Upload.deinit(i), Upload.deinit(r)
                }
            }
        }
        var Lr = n("wSs/"),
            Pr = n("eTng"),
            Br = 4,
            Dr = 5,
            Nr = 6,
            qr = 7,
            Ar = 9,
            Hr = 11,
            Fr = 12,
            Rr = 13,
            $r = 14,
            Ur = 16,
            zr = 19,
            Kr = 20,
            Wr = 23,
            Vr = 2e3,
            Gr = "_im_media_selector",
            Xr = "_im_media_fwd",
            Qr = "_im_replied_content",
            Yr = "_im_fwd_close",
            Jr = "_im_remove_replied",
            Zr = "_im_peer_mute_unmute",
            ei = "_im_peer_return_to_chat",
            ti = "_mr_button_accept",
            ni = "_mr_button_reject",
            ai = "_im_submit_btn",
            ri = "_im_media_preview",
            ii = "_im_chat_audio_input_parent";

        function si(e, t) {
            if (!e) return !1;
            window.tooltips && tooltips.hide(e, t)
        }

        function oi(e, t, n, a, i, s, o = !0) {
            if (xi(t, a)) return Promise.resolve(!1);
            var l = gi(a);
            l.getBoundAttach(n.message) && (n.message = ""), n.share_url = l.getShareUrl(), n.cancelled_shares = l.getCancelledShares();
            var d = Object(_r.a)(),
                u = {
                    peerId: t,
                    messageId: "rid" + d,
                    flags: c.m,
                    date: intval(Date.now() / 1e3) - a.get().timeshift,
                    subject: "",
                    text: Object(r.hc)(clean(n.message)).replace(/\n/gi, "<br>"),
                    local: !0,
                    kludges: {
                        emoji: !0,
                        from_admin: a.get().gid ? vk.id : null
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
            return n.rid = d, n.mess = u, e(t, n), a.get().longpoll.push([u]), o && s().clearText(t, a), i().newMessage(a), Promise.resolve(!0)
        }

        function ci(e, t, n, a, r, i, s, o = !1) {
            o || (o = e.get().peer);
            var c = gi(e),
                l = li(c, s),
                d = l ? c.dData.attaches.map(e => [e.type, e.id]) : [],
                u = {
                    message: "",
                    attaches: [].concat(d, i)
                };
            s && extend(u, s), di(e, t, !1).then(() => oi(n, o, u, e, t, a, !1).then(n => (l && ji(e, r, t), Promise.resolve(n)))).catch(t => {
                debugLog(t), pi(e, r)
            })
        }

        function li(e, t) {
            var n = e.dData,
                a = t && t.sticker_referrer,
                r = a && 0 === a.indexOf("suggestion");
            return (!n.txt.trim() || r) && 0 === n.attaches.filter(e => "reply" !== e.type).length
        }

        function di(e, t, n) {
            return e.get().tabs[e.get().peer].skipped > 0 ? (t().loadingPeer(e), e.setState({
                no_moving_down: !0
            }), e.set(a.p.bind(null, e.get().peer, !1, !1)).then(() => e.set(a.sb.bind(null, e.get().peer, !0, -1, !1))).then(() => (t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n))) : Promise.resolve(n)
        }

        function ui(e, t, n, r) {
            return !e.get().delayed_ts && setTimeout(() => {
                e.set(a.tc.bind(null, !1, !1)).then(() => {
                    n(...r)
                })
            }, t)
        }

        function mi(e = getLang("mail_send_error")) {
            var t = getLang("global_error");
            showFastBox({
                title: t
            }, e, getLang("mail_ok"), () => {
                nav.reload({
                    force: !0
                })
            })
        }

        function pi(e, t) {
            document.activeElement && document.activeElement.blur(), mi();
            var n = geByClass1("_im_send", t);
            return e.set(a.Mc.bind(null, !0)).then(() => {
                Object(r.Kb)(n)
            })
        }

        function gi(e) {
            return e.get().tfdraft || new Gt.a
        }

        function hi(e, t, n, s, o, c) {
            var l = Object(i.p)(e),
                {
                    one_time: d = !1,
                    author_id: u
                } = Object(i.g)(e) || {},
                m = geByClass1("_im_send", s);
            return Promise.resolve().then(() => {
                if (Object(i.Q)(e)) {
                    if (Object(a.V)(e.get()) || !Object(r.qb)(e, e.get().peer)) {
                        var s = ui(e, Vr, hi, Object(_.o)(arguments));
                        return e.set(a.tc.bind(null, !0, s)).then(() => {
                            Object(r.Kb)(m)
                        })
                    }
                    return clearTimeout(e.get().delayed_ts), e.set(a.tc.bind(null, !1, !1)).then(() => Object(r.Kc)(m)).then(di.bind(null, e, t)).then(() => {
                        var a = c.action || {},
                            i = a.attaches || [],
                            s = Object(Pa.a)(a.payload || ""),
                            d = Object(Pa.a)(a.label || "");
                        Object(r.ib)(l) && (d = `@${Object(P.c)(e,u).link.slice(1)} ${d}`);
                        return Object(L.c)("message_send_from_keyboard", 0, e.get().id, l, u), oi(n, l, {
                            message: d,
                            attaches: i,
                            payload: s
                        }, e, t, o, !1)
                    }).then(() => d ? e.set(a.z.bind(null, l)) : Promise.resolve()).then(() => o().fixKeyboard())
                }
            }).catch(t => {
                debugLog(t), pi(e, s)
            })
        }

        function _i(e, t, n, s, o, l, d = []) {
            return Promise.resolve().then(() => {
                var u = geByClass1("_im_send", s);
                if (!Object(i.Q)(e)) return !1;
                if (Object(a.V)(e.get()) || !Object(r.qb)(e, e.get().peer)) {
                    var m = ui(e, Vr, _i, Object(_.o)(arguments));
                    return e.set(a.tc.bind(null, !0, m)).then(() => {
                        Object(r.Kb)(u)
                    })
                }
                clearTimeout(e.get().delayed_ts), o().saveText(e);
                var p = !1,
                    g = gi(e),
                    h = g.dData.attaches.map(e => {
                        if ("poll" == e.type) {
                            var t = l.pollData();
                            return t || (p = !0), [e.type, e.id, t]
                        }
                        return [e.type, e.id]
                    }).concat(d);
                if (p) return !1;
                var b = e.set(a.tc.bind(null, !1, !1)).then(() => {
                        Object(r.Kc)(u)
                    }),
                    f = Object(i.p)(e);
                return b.then(di.bind(null, e, t)).then(() => {
                    var i = g.dData.txt,
                        l = t().getEditingMessage();
                    if (l || i || h.length) {
                        if (l) return i || h.length && !g.hasOnlyReplies(l) ? Object(r.ub)(i) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void(Object(Lr.e)(e, l, g) && (Object(Lr.d)(e, l, i, h, g.getShareUrl(), g.getCancelledShares()), t().sendEditMessage(e, l), e.get().longpoll.push([Object(c.nb)(l)])))) : void
                        function(e, t, n, r) {
                            var i = e.get(),
                                s = i.peer,
                                o = showFastBox({
                                    title: getLang("mail_dialog_msg_delete_title"),
                                    dark: 1
                                }, getLang("mail_dialog_msg_delete_for_all"), getLang("mail_delete"), function(e) {
                                    Object(a.Lb)([r], s, null, "deleteforall", i), o.hide(), t().cancelEditing()
                                }, getLang("global_cancel"), function() {
                                    o.hide(), fi(geByClass1("_im_text", n))
                                })
                        }(e, t, s, l.messageId);
                        var d = Object(r.Ec)(i, h).map(a => oi(n, f, {
                            message: a.msgText || "",
                            attaches: a.attaches || []
                        }, e, t, o));
                        return Promise.all(d)
                    }
                })
            }).catch(t => {
                debugLog(t), pi(e, s)
            })
        }

        function bi(e, t, n, s, o, c, l) {
            var d, u = debounce(function(e, t, n) {
                var a = e.get().peer,
                    i = Emoji.val(n);
                Object(r.Ab)(a) || gi(e).dData.txt == i || xi(a, e) || (t.checkMessageURLs(i, !0, Vr), gi(e).setText(i))
            }.bind(null, e, n), 500);
            var m = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                ref: "im",
                onSend: () => Pi(e, t).then(e => e && s([])),
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: function(n, s) {
                    var o = e.get().peer,
                        c = Emoji.val(s);
                    Object(r.Ab)(o) || xi(o, e) || gi(e).dData.txt == c || !c || function(e) {
                        var t = e.get().peer;
                        Object(r.qb)(e, t) && !Object(i.y)(e) && Date.now() - (Object(i.u)(e, t).lastTyping || 0) > 1e3 * a.b && e.set(a.nc.bind(null, t))
                    }(e), Bi(e, t, c), u(s);
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

        function fi(e) {
            Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
        }

        function vi(e, t, n, a) {
            var o = e.getFwdRaw(),
                c = t.querySelector(`.${Xr}`),
                l = t.parentNode.querySelector(`.${Qr}`);
            if (!(Object(i.g)(a) || {}).hide && o && n.toggleKeyboard(!0), c.innerHTML = "", l.innerHTML = "", o) {
                var d = function(e, t) {
                        if (e.get().isEditing) {
                            var n = Object(r.Y)(e);
                            return n && Object(s.c)(n)
                        }
                        return "reply" === t.type
                    }(a, o),
                    u = d ? l : c,
                    m = o.object;
                u.innerHTML = d ? yi(m) : function(e, t, n, a) {
                    if (n.object && n.object.authorName) {
                        var i = Object(r.ec)(0, "", a.text, !0, Object(Pr.a)(a.kludges, 0));
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

        function yi(e) {
            var t = Object(r.ec)(0, "", e.text, !0, Object(Pr.a)(e.kludges, 0));
            return getTemplate("im_replied_message", {
                authorName: e.authorName,
                text: t
            })
        }

        function ji(e, t, n) {
            e.set(a.K.bind(null, null, gi(e), !1)).then(() => {
                var a = t.querySelector(`.${Xr}`),
                    r = t.parentNode.querySelector(`.${Qr}`),
                    i = document.querySelector(`.${ii} .${Qr}`);
                r && r.children.length && (r.innerHTML = "", Oi(e, n)), i && i.children.length && (i.innerHTML = "", Oi(e, n)), a && a.children.length && (a.innerHTML = "", Oi(e, n)), Bi(e, t)
            })
        }

        function Oi(e, t) {
            var n = t().updateScroll();
            t().scrollFix(e, e.get().peer, n)
        }
        var wi = "close",
            ki = "open",
            Ci = "hide";

        function Si(e, t, n, a, s, o, c) {
            if (c !== wi && c !== ki && c !== Ci) throw new Error(`Action "${c}" not found`);
            var l = e.get(),
                d = Object(i.g)(e);
            (Object(r.kb)(e) || !d || l.isEditing) && (c = Ci);
            var u = c === wi || c === Ci,
                m = Promise.resolve();
            return u || n.isMounted || (m = n.init()), m.then(() => (toggleClass(t, "im-chat-input_open-keyboard", !u), toggleClass(t, "im-chat-input_close-keyboard", u && c !== Ci), toggleClass(a, "im_chat-input--keyboard-button_hidden", c === Ci), n.toggle(l.peer, u, o))).then(() => {
                var t = s().updateScroll();
                return s().scrollFix(e, l.peer, t)
            })
        }

        function Ei(e, t, n, a, s, c, l, d, u, m, p, g, h) {
            return {
                restoreKeyboard() {
                    this.toggleKeyboard(!!(ls.get("is_keyboards_hide") || {})[Object(i.p)(e)])
                },
                toggleKeyboard: (t = !Object(i.g)(e).hide, n = !0) => Si(e, a, g, p, c, n, t ? wi : ki),
                initKeyboard() {
                    if (!e.get().peer || !Object(i.g)(e)) return Promise.resolve();
                    var t = !!(ls.get("is_keyboards_hide") || {})[Object(i.p)(e)];
                    return Si(e, a, g, p, c, !0, t ? wi : ki)
                },
                fixKeyboard() {
                    var t, n = Object(i.g)(e);
                    return t = n ? n.hide ? wi : ki : Ci, Si(e, a, g, p, c, !0, t)
                },
                hideKeyboard: () => Si(e, a, g, p, c, !1, Ci),
                restoreDraft(e, s) {
                    t.chosenMedias.length > 0 && (e.setState({
                        removingMedias: !0
                    }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                        removingMedias: !1
                    }));
                    var o = e.get().peer,
                        l = Object(r.Hb)(o) && o != vk.id && !e.get().gid && !Object(r.mb)(o),
                        d = Object(r.Hb)(o) && o != vk.id && !e.get().gid && !inArray(o, e.get().moneyTransferExcept) && !Object(r.mb)(o) || Object(r.lb)(o) && e.get().moneyTransferCommAvail && Object(i.h)(e).moneyTransferAvail && !e.get().gid || e.get().gid && e.get().moneyRequestAvail || Object(r.ib)(o) && Object(i.h)(e).moneyRequestAvail;
                    if (toggle(geByClass1("ms_item_gift", a), l && !Object(i.y)(e)), toggle(geByClass1("ms_item_money", a), d && !Object(i.y)(e)), toggle(geByClass1("ms_item_poll", a), Object(r.ib)(o)), Object(r.Ab)(o)) return Promise.resolve();
                    var u = gi(e);
                    return Emoji.val(n) !== u.dData.txt ? function(e, t) {
                        Emoji.val(e, clean(t)), fi(e)
                    }(n, u.dData.txt) : fi(n), u.prepareObjects(e.get().gid, s && s.messageId).then(() => {
                        if (!Li(e, o, n) && o == e.get().peer) {
                            for (var r = u.dData.attaches, i = 0; i < r.length; i++) t.chooseMedia(r[i].type, r[i].id, r[i].object || {});
                            vi(u, a, this, e);
                            var s = c().updateScroll();
                            c().scrollFix(e, o, s), Bi(e, a, u.dData.txt)
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
                canAddMedia: () => !t.hasRestrictingAttach() && !xi(e.get().peer, e),
                isEmpty: e => !trim(Emoji.val(n)) && !gi(e).hasAttaches(),
                unchoose(e) {
                    t.unchooseMedia(e)
                },
                attachCount: () => t.attachCount(),
                progress(e, n, a) {
                    show(ri), t.showMediaProgress(e, n, a)
                },
                updateState(e) {
                    this.restoreKeyboard(), Li(e, e.get().peer, n)
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
                clearText(e, r) {
                    gi(r).clear(), t.cancelCheckUrl(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), ji(r, a, c);
                    var i = c().updateScroll();
                    c().scrollFix(r, r.get().peer, i)
                },
                attachMessages(e, t) {
                    if (e.get().peer === t) {
                        vi(gi(e), a, this, e);
                        var n = c().updateScroll();
                        c().scrollFix(e, t, n), Bi(e, a)
                    }
                },
                cancelRecording() {
                    m.cancelRecording()
                },
                reHeight(e) {
                    var t = c().updateScroll();
                    c().scrollFix(e, e.get().peer, t)
                },
                isBlocked: () => xi(e.get().peer, e),
                toggleStickers(e, t) {
                    Emoji.toggleStickers(e.get().emojiOptId, !t)
                },
                saveText(e) {
                    gi(e).setText(Emoji.val(geByClass1("_im_text", a)))
                },
                unmount() {
                    Object(o.c)(u), t.destroy(), d.unmount(), g.unmount(), h.unmount(), Emoji.destroy(e.get().emojiOptId), m.unmount()
                }
            }
        }

        function Ii(e, t) {
            return !!Object(r.ib)(e) && t.get().tabs[e].data.kicked
        }

        function xi(e, t) {
            return Ii(e, t) || Object(i.u)(t, e) && Object(i.u)(t, e).block_error > 0 || Object(r.tb)(t) && Object(r.xb)(e, t)
        }

        function Ti(e, t) {
            e.disabled = !0, e.contentEditable = "false", addClass(e, "im-chat-input--text_disabled"), addClass(t, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Mi(e, t) {
            e.disabled = !1, e.contentEditable = "true", removeClass(e, "im-chat-input--text_disabled"), removeClass(t, "im-chat-input_error"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Li(e, t, n) {
            var a = gpeByClass("_im_chat_input_parent", n),
                s = geByClass1("_im_chat_input_error", a),
                o = Object(i.u)(e, t);
            if (xi(t, e)) {
                Ti(n, a);
                var c = function(e, t, n) {
                    switch (n.block_error) {
                        case qr:
                        case Dr:
                            return getLang("mail_peer_deleted");
                        case $r:
                            return getLang("mail_community_deleted");
                        case Hr:
                            return getLang("mail_group_banned_messages");
                        case Br:
                        case Nr:
                        case Ar:
                        case zr:
                        case Kr:
                        case Rr:
                            return Object(r.lb)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
                        case Wr:
                            var a = Object(P.c)(e, t);
                            return langSex(a.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", a.kick_name);
                        case Fr:
                            return getLang("mail_cant_send_messages_to_community");
                        case Ur:
                            return getLang("mail_chat_youre_kicked");
                        case 0:
                            if (Ii(t, e)) return getLang("mail_chat_youre_kicked");
                            var i = e.get().block_states[t].name;
                            return getLang("mail_community_answering").replace("{username}", i);
                        default:
                            return getLang("mail_send_privacy_error")
                    }
                }(e, t, o);
                if (Object(i.z)(e, Object(i.u)(e, t)) && addClass(geByClass1("_im_page_history"), "is_channel"), Object(r.rb)(e, t) && !e.get().gid) {
                    addClass(a, "is-f-vkcomgroup");
                    var l = inArray(t, e.get().mutedPeers);
                    c = o.data.closed || o.data.kicked ? getTemplate("sImPeerReturnToChat", {
                        text: getLang("mail_return_to_vkcomgroup")
                    }) : getTemplate("sImPeerMuteUnmute", {
                        text: l ? getLang("mail_im_unmute") : getLang("mail_im_mute"),
                        cls: l ? "im-action_unmute" : "im-action_mute"
                    })
                } else removeClass(a, "is-f-vkcomgroup");
                return val(s, c), !0
            }
            return o && Object(r.Hc)(o) ? (Ti(n, a), addClass(a, "is-message_request"), val(s, getTemplate("sImPeerAcceptOrRejectMessageRequest", {
                cls_accept: ti,
                cls_reject: ni
            })), !0) : (a.classList.contains("is-message_request") && (Mi(n, a), removeClass(a, "is-message_request"), val(s, "")), n.disabled && (removeClass(a, "is-f-vkcomgroup"), removeClass(geByClass1("_im_page_history"), "is_channel"), Mi(n, a), removeClass(a, "is-message_request"), val(s, "")), !1)
        }

        function Pi(e, t, n) {
            return Object(r.Ib)(e).then(a => {
                if (!a && !Object(i.y)(e)) return !0;
                var s = null != n ? n : Emoji.val(geByClass1("_im_text", t));
                if (trim(s)) return !Object(i.y)(e) || !Object(r.ub)(s);
                var o = gi(e),
                    c = Object(r.Y)(e);
                return o.hasAttaches() && !o.hasOnlyReplies(c)
            })
        }

        function Bi(e, t, n) {
            var a = geByClass1("_im_send", t.parentNode);
            si(a, {
                fasthide: !0
            }), Pi(e, t, n).then(t => {
                if (Object(i.y)(e)) toggleClass(a, "is_input_empty", !t), attr(a, "aria-label", getLang("mail_im_edit"));
                else {
                    toggleClass(a, "im-send-btn_audio", !t), toggleClass(a, "im-send-btn_send", t), t && removeClass(a, "im-send-btn_saudio");
                    var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                    attr(a, "aria-label", n)
                }
            })
        }

        function Di(e, t, n, s, l) {
            cur.share_timehash = t.get().share_timehash;
            var {
                callMutations: d,
                bindMutations: u
            } = Object(o.b)(Ei), m = Mr(0, t, d), p = function(e, t, n) {
                return e.set(a.D.bind(null, t, n, {}))
            }.bind(null, t);
            ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
            var {
                pushMessage: g,
                inspectQueue: h,
                resend: b,
                setErrored: f,
                complete: v
            } = hr(p, function(e, t, n, a) {
                e.get().longpoll.push([c.pb(t, n.mess, a)])
            }.bind(null, t), {
                store: "ls",
                key: "im_send_queue_" + vk.id,
                waitCommit: !0
            }), y = ci.bind(null, t, l, g, d, e), j = function(e) {
                var t = gi(e).getFwdRaw();
                t && window.showForwardBox({
                    act: "a_show_forward_box",
                    will_fwd: t.id,
                    gid: e.get().gid
                })
            }.bind(null, t);
            hide(geByClass1("ms_items_more_helper", e));
            var O = t.get().mediaTypes || [
                ["photo", getLang("mail_added_photo")],
                ["video", getLang("profile_wall_video")],
                ["audio", getLang("profile_wall_audio")],
                ["doc", getLang("profile_wall_doc")],
                ["map", getLang("profile_wall_map")],
                ["gift", getLang("profile_wall_gift")]
            ];
            (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && O.push(["money", getLang("profile_wall_money")]);
            var w = new MediaSelector(geByClass1(Gr, e), ri, O, {
                    from: "message",
                    maxShown: 0,
                    vectorIcon: !0,
                    ignoreMobile: !0,
                    onAddMediaChange: function(n, r, i, s) {
                        return n && d().toggleKeyboard(!0),
                            function(e, t, n, r, i, s, o, c, l) {
                                if (!t.get().removingMedias) {
                                    if ("album" === i || "page" === i || "mail" === i || "reply" === i) return !1;
                                    if ("share" === i && !o.title) return !1;
                                    show(ri), s && "string" == typeof i ? (c && gi(t).addBindUrl(c, i, s), gi(t).addAttach(i, s, o)) : (gi(t).syncWithSelector(l), "number" == typeof s && l.chosenMedias[s] && function(e, t) {
                                        "string" == typeof e[0] && "string" == typeof e[1] && e[1] && t.dData.cancelled.push(`${e[0]},${e[1]}`)
                                    }(l.chosenMedias[s], gi(t)));
                                    var d = e().updateScroll();
                                    if (e().scrollFix(t, t.get().peer, d), t.get().delayed_message && !Object(a.V)(t.get())) return n([]), !1;
                                    Bi(t, r)
                                }
                            }(l, t, k, e, n, r, i, s, w)
                    },
                    onMediaChange: function() {
                        return function(e, t, n, a, r) {
                            if (!t.get().removingMedias) {
                                var i = r.getMedias().find(e => "poll" === e[0]);
                                i && gi(t).addAttach(i[0], i[1], r.pollData(!0, !0)), Bi(t, a)
                            }
                        }(0, t, 0, e, w)
                    },
                    editable: 1,
                    onChangedSize: function() {
                        var n = l().updateScroll();
                        l().scrollFix(t, t.get().peer, n),
                            function(e) {
                                var t = ge(ri).offsetHeight;
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
                k = _i.bind(null, t, l, g, e, d, w),
                C = function(e, t, n) {
                    var a = Emoji.val(geByClass1("_im_text", t));
                    Object(i.y)(e) && "" !== a || Pi(e, t).then(t => {
                        var r = intval(domData(n.target, "tttype"));
                        (2 === r && !0 !== t || 1 === r && !0 === t || 3 !== r && "" === a) && window.tooltips && tooltips.destroy(n.target, {
                            fasthide: !0
                        });
                        var s = gi(e).dData.attaches.length > 0;
                        if (Object(i.y)(e) && "" === a && !s) return domData(n.target, "tttype", 3), showTooltip(n.target, {
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
                                    els: Object(_.o)(geByClass(ai)),
                                    val: o
                                }
                            }
                        })
                    })
                }.bind(null, t, e),
                S = geByClass1("_im_send", e),
                E = ci.bind(null, t, l, g, d, e),
                I = Ma(e, t, E, () => {
                    addClass(S, "im-send-btn_audio"), removeClass(S, "im-send-btn_static")
                }, () => {
                    d().restoreKeyboard()
                });
            toggle(geByClass1("ms_item_poll", e), Object(r.ib)(Object(i.p)(t))),
                function(e, t) {
                    var n = geByClass1("_im_text", e),
                        a = Object(it.d)(stManager.add);
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
                }(e, t), t.get().textMediaSelector = w, t.set(a.T.bind(null, h, b, f, v));
            var x = geByClass1("_im_text", e);
            setTimeout(() => {
                Object(i.p)(t) && d().setDraft(t, Object(i.v)(Object(i.h)(t))), bi(t, e, w, k, y, m, l)
            }, 0);
            var T = ji.bind(null, t, e, l),
                M = function(e, t, n) {
                    var r = Object(i.p)(e);
                    e.set(a.f.bind(null, r)).then(() => {
                        Li(e, r, t), n()
                    }).catch(() => mi())
                }.bind(null, t, x, () => {
                    var e = l().updateScroll();
                    l().scrollFix(t, Object(i.p)(t), e)
                }),
                L = function(e, t, n) {
                    var s = Object(i.p)(e);
                    e.set(a.Gb.bind(null, s)).then(() => {
                        var t = e.get().tabbedPeers.filter(({
                            peer: e
                        }) => e !== s);
                        return e.set(a.ed.bind(null, t, !0))
                    }).then(() => {
                        Object(r.kb)(e) && t(e), n(e, s), s === e.get().peer && e.get().longpoll.push([Object(c.Hb)()])
                    }).catch(() => mi())
                }.bind(null, t, n, s),
                P = function(e, t, n, r) {
                    var i = e.get().peer,
                        s = inArray(i, e.get().mutedPeers);
                    e.set(a.Lc.bind(null, i, !s)).then(n().updateState.bind(null, i)), cancelEvent(r)
                }.bind(null, t, e, l),
                B = function(e, t, n, r) {
                    var i = e.get().peer;
                    e.set(a.Zb.bind(null, i)).then(e => e.set(a.Q.bind(null, i))).then(n().updateChatTopic.bind(null, i)), cancelEvent(r)
                }.bind(null, t, e, l),
                D = function(e, t, n) {
                    var r = !!intval(domData(n, "val"));
                    r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(a.q.bind(null, r)))
                }.bind(null, t);
            Li(t, t.get().peer, x);
            var N = e.querySelector("._im_keyboard_button"),
                q = function(e, t, n, a, r) {
                    var {
                        bindMutations: i
                    } = Object(o.b)(Ka);
                    return i(Object(o.a)({
                        handlers: (e, t) => {}
                    }), t, a)
                }(0, t, 0, hi.bind(null, t, l, g, e, d)),
                A = function(e, t, n, a) {
                    var {
                        bindMutations: r
                    } = Object(o.b)(or), i = r(Object(o.a)({
                        handlers: (e, t) => {}
                    }), e, t, n, a);
                    i.toggleImText();
                    var s = ye.createElement(At, {
                        value: e
                    }, ye.createElement(Va, {
                        getTemplates: i.getPreparedTemplates,
                        applyTemplate: i.applyTemplate.bind(i),
                        isNeededRendering: i.isNeedRenderTemplates,
                        showSettingsPopup: i.showSettingsPopup.bind(i, tr),
                        showCreatingTemplatePopup: i.showSettingsPopup.bind(i, nr)
                    }));
                    return je.render(s, t), i
                }(t, e.querySelector("._message_templates_container"), e => Xa(x, e), t => toggleClass(e, "im-chat-input--textarea_show-templates", t)),
                H = Object(o.a)({
                    handlers: (n, r) => {
                        n(S, "click", () => {
                            Promise.resolve().then(() => Pi(t, e)).then(e => {
                                if (e || Object(i.y)(t)) k([]);
                                else {
                                    var n = gi(t);
                                    li(n) && function(e) {
                                        var t = document.querySelector(`.${ii} .${Qr}`),
                                            n = e.getFwdRaw();
                                        if (n) {
                                            var a = n.object;
                                            t && (t.innerHTML = yi(a))
                                        } else t.innerHTML = ""
                                    }(n), si(S, {
                                        fasthide: !0
                                    }), I.start(), setTimeout(() => removeClass(S, "im-send-btn_saudio"), 300)
                                }
                            })
                        }), n(S, "mouseover", C), n(x, "focus", () => {
                            t.get().longpoll.push([c.Lb("message")]), cur.focused = t.get().peer
                        }), n(x, "blur", () => {
                            var e = 0 === t.get().peer ? "search" : "default";
                            t.get().longpoll.push([c.Lb(e)]), cur.focused = !1
                        }), n(N, "click", () => d().toggleKeyboard(void 0)), n(N, "mouseover", () => {
                            showTooltip(N, {
                                text() {
                                    var e = Object(i.g)(t);
                                    return !e || e.hide ? getLang("mail_show_keyboard") : getLang("mail_hide_keyboard")
                                },
                                black: !0,
                                shift: [4, 5]
                            })
                        }), r(e.parentNode, "click", Zr, P), r(e.parentNode, "click", ei, B), r(e.parentNode, "click", Jr, T), r(e.parentNode, "click", ti, M), r(e.parentNode, "click", ni, L), r(e, "click", Yr, T), r(e, "click", "_im_will_fwd", j), r(e, "keydown", "_im_text", e => (function(e, t, n, r) {
                            if (38 === r.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !Object(a.V)(e.get())) {
                                var s = Object(Lr.c)(e, Object(i.h)(e));
                                s && t().startEditing(Object(i.n)(e, e.get().peer, s))
                            }
                        })(t, l, d, e)), r(bodyNode, "click", ai, D)
                    }
                }),
                F = u(t, w, x, e, k, l, h, m, H, I, N, q, A);
            return F.initKeyboard(), F
        }
        var Ni = "im_hist_search",
            qi = "_im_search_date",
            Ai = "_im_search_date_input",
            Hi = "_im_search_history_input",
            Fi = "_im_start_inplace_search",
            Ri = "_im_cancel_inplace_search",
            $i = "_im_clear_date";

        function Ui(e, t, n, a, r, i) {
            return {
                focus(e) {
                    uiSearch.focus(t),
                        function(e, t, n, a) {
                            cancelStackPush(Ni, Ki.bind(null, e, t, n, a))
                        }(e, t, n, a)
                },
                changePeer(e, n) {
                    uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
                },
                search() {
                    i({})
                },
                unmount() {
                    Object(o.c)(r), cancelStackFilter(Ni), a.then(e => e.destroy())
                }
            }
        }

        function zi(e, t, n) {
            var r = e.get().peer;
            uiSearch.showProgress(n), Object(a.hc)(r, e.get()).then(a => {
                uiSearch.hideProgress(n), t().insertSearch(a, e)
            }).catch(() => {
                uiSearch.focus(n), uiSearch.hideProgress(n)
            })
        }

        function Ki(e, t, n, r) {
            cancelStackFilter(Ni), r.then(e => {
                e.hide()
            }), e.set(a.m.bind(null, e.get().peer)).then(() => {
                uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
            })
        }

        function Wi(e, t, n) {
            var r = geByClass1(Ai, e),
                i = geByClass1(Hi, e),
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
                    e.set(a.sc.bind(null, e.get().peer, `${r.d}.${r.m}.${r.y}`)).then(zi.bind(null, e, t, n))
                }.bind(null, t, n, i)),
                c = function(e, t) {
                    e.then(e => {
                        triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
                    })
                }.bind(null, s, e),
                l = function(e, t, n, r, i, s) {
                    if ("keyup" !== s.type || 13 == s.which) {
                        var o = clean(uiSearch.getFieldEl(t).value);
                        e.set(a.rc.bind(null, o, e.get().peer)).then(i.bind(null, e, r, t))
                    }
                }.bind(null, t, i, r, n, debounce(zi, 300)),
                d = Ki.bind(null, t, i, n, s),
                u = function(e, t, n, r) {
                    n.then(e => {
                        e.hide()
                    }), e.set(a.v.bind(null, e.get().peer)).then(zi.bind(null, e, t, r))
                }.bind(null, t, n, s, i),
                m = Object(o.a)({
                    handlers: (t, n) => {
                        t(geByClass1(qi, e), "click", c), t(uiSearch.getFieldEl(i), "keyup", l), t(geByClass1(Fi, e), "click", l), t(geByClass1(Ri, e), "click", d), n(e, "click", $i, u)
                    }
                });
            return Ui(0, i, n, s, m, l)
        }
        var Vi = "_im_mess_fav",
            Gi = "_im_mess_reply",
            Xi = "_im_mess_forward",
            Qi = "_im_mess_edit";

        function Yi(e, t, n, a, s) {
            var o = Object(i.p)(e),
                c = Object(i.u)(e, o),
                l = 105 + (Object(ve.a)(e, Object(i.p)(e)) || c && c.top_banner ? Object(r.Z)() : 0);
            showTooltip(t, {
                shift: [n, 10],
                black: 1,
                className: "_im_history_tooltip " + a,
                appendParentCls: "_im_mess_stack",
                toup: t.getBoundingClientRect().top > l + 37,
                text: s
            })
        }

        function Ji(e, t, n, a) {
            var r = getLang("mail_im_toggle_important").length > 14;
            Yi(e, a, r ? 84 : 34, r ? "im-star-tt_long" : "im-star-tt", () => {
                var t = domData(gpeByClass("_im_mess", a), "msgid"),
                    n = Object(i.n)(e, e.get().peer, t);
                return n ? Object(s.h)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
            })
        }

        function Zi(e, t, n) {
            var l = Ji.bind(null, t, 0),
                d = function(e, t, n) {
                    var r = gpeByClass("_im_mess", n),
                        o = intval(domData(r, "msgid")),
                        l = e.get().peer,
                        d = Object(i.n)(e, l, o),
                        u = !Object(s.h)(d);
                    return e.get().longpoll.push([{
                        peerId: l,
                        messageId: o,
                        type: u ? c.Y : c.U,
                        flags: c.l
                    }]), e.set(a.G.bind(null, [o], u, l)), Ji(e, 0, 0, n), !1
                }.bind(null, t),
                u = function(e, t, n, a) {
                    Yi(e, a, 18, "im-reply-tt", getLang("mail_im_mark_forward"))
                }.bind(null, t, 0),
                m = function(e, t, n, r) {
                    var i = e.get().peer,
                        s = +domData(domClosest("im-mess", r.target), "msgid");
                    return Object(be.f)(), Object(a.Eb)([s], i, e).then(t => e.set(a.Cb.bind(null, t))).then(() => {
                        bn(0, e)
                    }), !1
                }.bind(null, t, e.querySelector("_im_dialog_actions"), n),
                p = function(e, t, n, a) {
                    Yi(e, a, 18, "im-reply-tt", getLang("mail_im_reply"))
                }.bind(null, t, 0),
                g = function(e, t, n) {
                    var r = e.get().peer,
                        i = +domData(domClosest("im-mess", n.target), "msgid");
                    return Object(a.Eb)([i], r, e).then(t => e.set(a.K.bind(null, t, e.get().tfdraft, !0))).then(() => t().respond(e, r)), !1
                }.bind(null, t, n),
                h = function(e, t, n) {
                    Yi(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
                }.bind(null, t),
                _ = function(e, t, n, a) {
                    var r = intval(domData(gpeByClass("_im_mess", a), "msgid")),
                        s = Object(i.n)(e, e.get().peer, r);
                    return s && t().startEditing(s), !1
                }.bind(null, t, n),
                b = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "click", Vi, d), n(e, "mouseover", Vi, l), n(e, "click", Xi, m), n(e, "mouseover", Xi, u), n(e, "click", Gi, g), n(e, "mouseover", Gi, p), n(e, "click", Qi, _), n(e, "mouseover", Qi, h)
                    }
                });
            return function(e, t) {
                return {
                    markImportant(t, n, a) {
                        Object(r.Nc)(t, n, e)
                    },
                    unmount() {
                        Object(o.c)(t)
                    }
                }
            }(e, b)
        }
        var es = "_im_retry_media",
            ts = "_im_replied_message";

        function ns(e, t, n, s, o) {
            if (!Object(a.Y)(e.get().peer, e.get()) && !(hasClass(o, r.l) || hasClass(o, r.t) || hasClass(o, "_im_mess_srv") || Object(r.F)(s, o) || Object(i.y)(e) || "A" === s.target.tagName || domClosest(ts, s.target) || s.target.classList.contains(es))) {
                var c, l, d = intval(domData(o, "msgid")),
                    u = e.get().peer;
                if (!Object(r.gb)(e, u, d)) c = s.shiftKey ? Object(i.o)(e, u, d) : [d], e.set(a.j.bind(null, c)).then(() => {
                    var a = Object(i.t)(e),
                        r = !1;
                    c.forEach(e => {
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
                    1 !== e.get().selectedMessages.length || l ? l && l.hide() : l = function(e) {
                        var t = e.get();
                        if (t.pinnedMessagesPromo && Object(r.ib)(t.peer)) {
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
                                        }), Object(a.R)()
                                    }
                                });
                            return i.show(), i
                        }
                    }(e)
                })
            }
        }

        function as(e, t, n) {
            var a = ns.bind(null, t, n, e),
                r = Object(o.a)({
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
                        Object(o.c)(t)
                    }
                }
            }(e, r)
        }
        var is = {
                onNewMessagesChunk: function(e) {
                    var t = geByClass("post");
                    LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(e => LongView.register(e, "im"))
                },
                onHistoryScroll: function(e) {
                    LongView.onScroll(e, window.innerHeight)
                }
            },
            ss = 68,
            os = 32,
            cs = 300,
            ds = 20,
            us = 68,
            ms = 10,
            ps = 2e3,
            gs = 100;

        function hs(e, t, n, a) {
            var r = e instanceof Array ? e : geByClass("_im_bar_date", e),
                i = t.contHeight();
            is.onNewMessagesChunk();
            var s = r.reduce((e, t) => (e[domData(t, "date")] = [t.offsetTop + ms, i, t], e), {}),
                o = !n && a.barMap ? a.barMap : {};
            return a.barMap = extend(o, s), a.barMapKeys = Object.keys(a.barMap).sort(), Promise.resolve(a)
        }

        function _s(e, t, n, a, i) {
            var s = e.get().barMap[t],
                o = Object(r.jb)(i) ? us : ds;
            return n - (s[0] + n - s[1]) + a - o
        }

        function bs(e, t, n, a, r) {
            var i, s, o = e.get(),
                c = n - t;
            o.barMapKeys.forEach(t => {
                var o = _s(e, t, n, a, r);
                if (o >= c) {
                    var l = i ? _s(e, i, n, a, r) : n;
                    i = l > o ? t : i
                } else if (o < c) {
                    var d = s ? _s(e, s, n, a, r) : 0;
                    s = o > d ? t : s
                }
            });
            var l = {};
            return [
                [s, "prev"],
                [i, "cur"]
            ].forEach(([t, i]) => {
                t && (l[i + "Bar"] = function(e, t) {
                    var n = e.get().barMap[t][2];
                    return {
                        text: n.textContent,
                        date: domData(n, "date")
                    }
                }(e, t), l[i + "Left"] = _s(e, t, n, a, r) - c)
            }), l
        }

        function fs(e, t, n, i, s) {
            var o = e.get(),
                c = Object(a.W)(o),
                l = t.get(),
                d = s.scrollTop(),
                u = l.lastTop ? l.lastTop - d : 0;
            l.lastTop = d;
            var m = Object(ve.a)(o, o.peer) ? Object(r.Z)() : 0,
                p = Object(a.Y)(o.peer, o) && o.tabs[o.peer] && o.tabs[o.peer].top_banner ? 50 : 0,
                g = (Object(r.jb)(e) ? ss + m + p : 0) - os / 2,
                h = s.contHeight(),
                {
                    prevBar: _,
                    curBar: b,
                    prevLeft: f
                } = bs(t, d, h, g, e),
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
            }(i)), b ? y = b : j = !0, _ && b && f > -os && f < 0 && (O = !0, j = !1, y = b, v = `translateY(${-os-f}px)`), y && function(e, t) {
                domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
                    visibility: "visible"
                }))
            }(n, y), O ? t.set(function(e, t, n, a) {
                return a.barTransition = a.barMap[t][2], n > 0 ? (addClass(a.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : n < 0 && (removeClass(a.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(a.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(a)
            }.bind(null, n, _.date, u)) : t.set(function(e, t) {
                return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
            }.bind(null, n)), v && setStyle(n, {
                [cssTransformProp]: v
            }), toggleClass(n, "im-page--top-date-bar_no-b", j)
        }

        function vs(e, t) {
            var n = geByClass1("_im_top_date_bar"),
                a = h({
                    lastTop: !1,
                    barMap: {},
                    barMapKeys: []
                }),
                r = null,
                i = null,
                s = null,
                o = debounce(e => {
                    a.set(hs.bind(null, t, e, !1))
                }, 500);
            return {
                reset(r) {
                    a.set(hs.bind(null, t, r, !0)).then(() => {
                        fs(e, a, n, t, r)
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
                    a.set(hs.bind(null, r, i, !1)).then(() => {
                        fs(e, a, n, t, i)
                    })
                },
                toggle(e) {
                    e ? setStyle(n, {
                        display: ""
                    }) : hide(n)
                },
                show() {
                    i = Date.now(), s || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), s = setInterval(function() {
                        Date.now() - i > ps && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(s), s = null)
                    }, gs))
                },
                update(i) {
                    r && (clearTimeout(r), r = null), r = setTimeout(function() {
                        fs(e, a, n, t, i)
                    }, cs), fs(e, a, n, t, i)
                }
            }
        }
        var ys = n("nyd8"),
            js = n("uytb"),
            Os = n("p3re"),
            ws = n("FWc3"),
            ks = n("zxIV"),
            Cs = "_im_top_banner_button",
            Ss = "_im_top_banner_hide";

        function Es(e, t) {
            var n = geByClass1("_im_dialog_actions", e);
            Object(ks.wb)(n, "im-page--chat-header_top-banner", t)
        }

        function Is(e, t) {
            var n = geByClass1(Ss, e);
            n && window.tooltips && tooltips.hide(n), Es(e, !1), t.innerHTML = ""
        }

        function xs(e, t, n) {
            var s = geByClass1("_im_top_banner", e),
                c = Object(o.a)({
                    handlers: (i, o) => {
                        var c = geByClass1("_im_dialog_actions", e);
                        o(e, "click", Ss, () => {
                            t.set(a.S.bind(null, t.get().peer)), Is(e, s);
                            var i = !!Object(r.ac)(t);
                            Object(r.H)(t, i, !0, n)
                        }), o(e, "click", Cs, i => {
                            var o = function(e, t, n, r) {
                                    var i = Object(ks.s)(e, "payload");
                                    return !!i && (t.set(a.k.bind(null, t.get().peer, i)), Is(n, r), !0)
                                }(i.target, t, e, s),
                                c = !!Object(r.ac)(t);
                            Object(r.H)(t, c, !o, n)
                        }), o(c, "mouseover", Ss, (e, t) => {
                            Object(ws.c)(t, {
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
                    var a = Object(i.u)(t, t.get().peer).top_banner,
                        o = s.children.length;
                    a && !Object(i.N)(t) ? (Es(e, !0), s.innerHTML = function(e) {
                        var t = e.icon ? Object(Na.n)("im_top_banner_icon", {
                                icon: e.icon
                            }) : "",
                            n = e.text;
                        "employees_banner" === e.name && (n = Object(Os.e)(n, Os.b.bind(null, !1)), n = Object(Os.f)(n));
                        var a = (e.buttons || []).map(e => {
                            var t = "";
                            switch (e.layout) {
                                case "secondary":
                                    t = "secondary";
                                    break;
                                default:
                                    t = "blue_button"
                            }
                            return "link" === e.type ? Object(Na.n)("im_top_banner_button_link", {
                                link: e.link,
                                text: e.text,
                                css_class: t
                            }) : Object(Na.n)("im_top_banner_button", {
                                callback_data: e.callback_data,
                                text: e.text,
                                css_class: t
                            })
                        });
                        return a = a.concat([Object(Na.n)("im_top_banner_hide_btn", {})]), Object(Na.n)("im_top_banner", {
                            text: n,
                            icon: t,
                            buttons: a.join("")
                        })
                    }(a)) : s.children.length && Is(e, s);
                    var c = s.children.length;
                    Object(r.H)(t, c, o, n)
                },
                unmount() {
                    Object(o.c)(c)
                }
            }
        }
        var {
            formatCount: Ts
        } = window, Ms = 1e3, Ls = -30, Ps = 30, Bs = 2e3, Ds = 700, Ns = 15, qs = 47, As = "._im_to_end", Hs = "_im_failed_action", Fs = "_im_mess_link", Rs = "_im_admin_name", $s = "_im_typer_c", Us = "_im_error", zs = "_im_join_cancel", Ks = "_im_retry_media", Ws = "im-audio-message_recorded", Vs = "im-audio-message_recording", Gs = "_im_mess_srv", Xs = "im_srv_mess_link", Qs = "_chat_invitation", Ys = "_im_mess", Js = "_im_replied_message", Zs = "_im_replied_author_link", eo = !1, to = {};

        function no(e) {
            var t = Object(i.u)(e, e.get().peer);
            return !!Object(i.q)(e) || !!t.top_banner
        }

        function ao(e, t) {
            var n = Object(_.q)(e),
                a = Object(i.u)(n, t);
            return Object(r.ib)(t) && Object(ve.a)(n, t) || !!a.top_banner && !Object(i.N)(t, n)
        }

        function ro(e, t) {
            return Object(r.Z)()
        }

        function io(e, t) {
            var n = ge("page_header"),
                a = geByClass1("_im_chat_input_w", t),
                r = a.offsetHeight - a.clientHeight;
            return Math.min(window.clientHeight() - r, Math.max(Math.max(0, e), Ds + n.offsetHeight + t.offsetTop))
        }

        function so(e, t) {
            return geByClass1("_im_mess_" + t, e)
        }

        function oo(e, t, n) {
            var a, i;
            ! function(e, t) {
                var n, a, r = function(r) {
                        n = void 0 !== r.clientX ? r.clientX : r.touches[0].clientX, a = void 0 !== r.clientY ? r.clientY : r.touches[0].clientY, t.onDrag && t.onDrag.call(e, n, a)
                    },
                    i = function i(s) {
                        t.onDrop && t.onDrop.call(e, n, a), removeEvent(document, "mouseup touchend mouseleave", i), removeEvent(document, "mousemove touchmove", r)
                    },
                    s = function(s) {
                        (1 === s.which || s.touches && s.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", i), addEvent(document, "mousemove touchmove", r), n = void 0 !== s.clientX ? s.clientX : s.touches[0].clientX, a = void 0 !== s.clientY ? s.clientY : s.touches[0].clientY, t.onStartDrag && t.onStartDrag.call(e, n, a), t.onDrag && t.onDrag.call(e, n, a), cancelEvent(s))
                    };
                e.beginDragHandler = s, addEvent(e, "mousedown touchstart", s)
            }(geByClass1(e, t), {
                onStartDrag: (e, t) => {
                    addClass(bodyNode, "cursor_ns_resize"), a = t, i = t
                },
                onDrop: () => {
                    removeClass(bodyNode, "cursor_ns_resize")
                },
                onDrag: (e, s) => {
                    var o = io(i - a + s, t);
                    Object(r.lc)(o), n().fixHeight()
                }
            })
        }

        function co(e, t) {
            ! function(e) {
                removeEvent(e, "mousedown touchstart", e.beginDragHandler)
            }(geByClass1(e, t))
        }

        function lo(e) {
            hide(e.target)
        }

        function uo(e, t, n) {
            var r = Object(i.u)(t, n),
                s = Object(a.Bc)(r.history);
            toggleClass(e, "im-page--history_empty-hist", !s)
        }

        function mo(e) {
            return geByClass1("_im_peer_history", e)
        }

        function po(e, t) {
            var n = t.contHeight(),
                a = e.scrollTop + (n - e.contHeight);
            t.scrollTop(a)
        }

        function go(e, t, n, i, s, o, c, l, d = !0, u = !1) {
            var m = (t.get().tabs || {})[n];
            s().hideError(), o.renderPeer(t), l.renderPeer(t);
            var p = geByClass1("_im_peer_history", e);
            if (!t.get().tabHistoryNotChanged) {
                val(geByClass1("_im_page_peer_name", e), m.tab);
                var g = Object(a.Bc)(m.history);
                uo(e, t, n), g || (g = getLang("mail_im_here_history")), val(p, g), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), Object(r.jb)(t) || Object(r.M)("_chat_body_wrap", e), Io(t, i, e)
            }
            if (Object(a.Y)(n, t.get()) ? s().showSearch(t) : s().cancelSearch(t, !1), c.changePeer(n, t), t.get().msgid) yo(i, e, t.get().msgid, t);
            else if (m.scrollBottom && d) {
                po(m, i);
                var [h] = Object(r.vb)(t, e, i);
                m.skipped || setTimeout(() => {
                    m.unread && !h && wo(t, e, !0), _o(t, i, e)
                }, 100)
            } else vo(i, e, s, t, u) || i.scrollBottom(Ls);
            window.LazyLoad && window.LazyLoad.scan(!!i.scroll && i.scroll.scroller)
        }

        function ho(e, t, n = !1) {
            var r = n || t.scrollTop(),
                i = t.scrollBottom(),
                s = t.contHeight(),
                o = e.get().peer;
            e.set(a.ac.bind(null, o, r, i, s))
        }

        function _o(e, t, n) {
            var a = Object(i.G)(e),
                r = 4 * t.getScrollHeight();
            t.scrollBottom() > r && !a && wo(e, n, !0, 2 * t.getScrollHeight())
        }

        function bo(e, t, n, s, o, c, l, d, u = !0) {
            if ((e.get().history_init || (e.get().history_init = !0, !(d.scrollTop() > 0))) && !fe.a.isFullscreen) {
                o.update(d), o.show();
                var m = e.get().peer;
                if (0 !== m && Object(r.qb)(e.get(), m) && (is.onHistoryScroll(d.scrollTop()), !layers.visible)) {
                    var p = Object(i.G)(e),
                        g = Object(i.u)(e, m);
                    g && !g.skipped && l < 0 ? _o(e, d, c) : l > 0 && !g.skipped && !g.unread && Lo(e, c), Oo(e, d) && (p && g && !g.skipped && Lo(e, c), g.unread > 0 && fo(e));
                    var h = Object(r.Oc)(n);
                    if (!Object(a.Y)(m, e.get()) && u && s(d), !eo && (l < 0 || 0 === d.scrollBottom()) && d.scrollBottom() < Ms) {
                        if (Object(a.Y)(m, e.get())) return;
                        if (g.skipped > 0 && !e.get().no_moving_down) {
                            var _ = gpeByClass("_im_page_history", c),
                                b = e.get();
                            eo = !0;
                            var f = e.set(a.mb).then(t().loadHistory.bind(null, b.peer, {
                                reversed: !0
                            })).then(() => {
                                fo(e), eo = !1, wo(e, _), g.skipped || e.set(a.p.bind(null, e.get().peer, !1, !1))
                            });
                            return So(_, !0), void f.then(So.bind(null, _, !1))
                        }
                    }
                    if (!eo && d.scrollTop() < Ms) {
                        if (Object(a.Y)(m, e.get())) {
                            eo = !0;
                            var v = t().getSearchResulstModule();
                            return v.isAll(e) ? void(eo = !1) : void h(v.loadMore(e).then(n => {
                                eo = !1, n && (t().loadHistory(e.get().peer, {}, e, n), s(d))
                            }), "up")
                        }
                        var y = e.get();
                        g.allShown || (eo = !0, h(e.set(a.qb.bind(null, 0, 0)).then(t().loadHistory.bind(null, y.peer, {})).then(() => {
                            eo = !1, s(d)
                        }), "up"))
                    }
                    l < 0 && No(e, m, d.scrollBottom(), c, t), Object(a.id)()
                }
            }
        }

        function fo(e) {
            if (!(window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle)) return e.set(a.Fb.bind(null, e.get().peer))
        }

        function vo(e, t, n, a, i) {
            var s = geByClass1("_im_unread_bar_row", t);
            if (s) {
                var o = a.get(),
                    c = o.peer,
                    l = s.getBoundingClientRect(),
                    d = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
                Object(r.jb)(a) && (d += qs + (ao(o, c) ? ro() : 0));
                var u = e.scrollTop() - d + l.top;
                return e.scrollTop(u), ho(a, e, u), setTimeout(() => {
                    c === a.get().peer && bo(a, n, mo(t), function() {}, i, t, 0, e)
                }, 80), fo(a), !0
            }
            return !1
        }

        function yo(e, t, n, a) {
            var i = so(t, n);
            if (i) {
                var s = Object(r.jb)(a),
                    o = a.get().peer,
                    c = s ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                    l = i.offsetTop + domPN(i).offsetTop + domPN(domPN(i)).offsetTop + domPN(domPN(domPN(i))).offsetTop;
                s && ao(a, o) && (l -= ro(a.get())), e.scrollTop(l - e.getScrollHeight() / 2 + c / 2), addClass(i, "im-mess_light"), setTimeout(() => {
                    removeClass(i, "im-mess_light")
                }, Bs)
            }
        }

        function jo(e, t, n) {
            n.updateLastSeen(e)
        }

        function Oo(e, t) {
            return Object(i.x)(e) >= intval(t.scrollBottom())
        }

        function wo(e, t, n, i = 0) {
            var s = e.get().peer;
            if (!Object(r.Ab)(s)) {
                var o = e.get().tabs[s],
                    c = (t || document).querySelector(As);
                ko(t, e);
                var l = !1;
                (n || o.skipped > 0) && !Object(a.Y)(s, e.get()) ? (l = !0, addClass(c, "im-to-end_shown")) : Mo(c, !0), e.set(a.Xc.bind(null, [l, intval(i)]))
            }
        }

        function ko(e, t) {
            var n = t.get(),
                a = n.peer,
                r = n.tabs[a];
            (e || document).querySelector(As).querySelector("._im_to_end_label").innerHTML = Number(r.unread) > 0 ? Ts(r.unread) : ""
        }

        function Co(e, t = 0) {
            return (0 !== e.scrollTop() || 0 !== e.scrollBottom()) && e.scrollBottom() < (t ? Ps + t : Ps)
        }

        function So(e, t) {
            if (e) {
                var n = e.querySelector(As);
                toggleClass(n, "im-to-end_loading", t)
            }
        }

        function Eo(e, t, n, r) {
            if (!t.get().tabs[t.get().peer].skipped) return r.scrollBottom(Ls), wo(t, n), fo(t), void No(t, t.get().peer, 0, n, e);
            So(n, !0), t.set(a.p.bind(null, t.get().peer, !1, !1)).then(() => t.set(a.sb.bind(null, t.get().peer, !0, -1, !1))).then(() => {
                So(n, !1), e().changePeer(t, !1, !1), fo(t)
            })
        }

        function Io(e, t, n, a = !1) {
            if (Object(r.jb)(e)) {
                var i = t.contHeight(),
                    s = geByClass1("_im_chat_input_w", n),
                    o = s.offsetHeight - s.clientHeight,
                    c = geByClass1("_im_chat_resize", n),
                    l = geByClass1("_im_chat_input_parent", n),
                    d = geByClass1("_im_chat_audio_input_parent", n);
                if (!1 !== (a = !1 !== a ? a : Object(r.V)()) && a > 0) {
                    var u = io(a, n),
                        m = u - (hasClass(d, Vs) || hasClass(d, Ws) ? d : l).offsetHeight;
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
                    borderBottomWidth: s.offsetHeight - Ns - 1
                }), t.contHeight() - i
            }
            Object(r.M)("_chat_body_wrap", n);
            var g = t.getScrollHeight();
            return t.update(!1, !0), g - t.getScrollHeight()
        }

        function xo(e, t, n, a) {
            var r = t.offsetHeight;
            a(), e.heightIncreased(t.offsetHeight - r, n)
        }

        function To(e, t) {
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

        function Mo(e, t = !1) {
            hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
        }

        function Lo(e, t, n = !1) {
            var r = t.querySelector(As);
            e.set(a.Xc.bind(null, [!1, 0])), Mo(r, n)
        }

        function Po(e) {
            var t = Object(i.h)(e);
            Object(r.ib)(t.peerId) && (t.pinHideId = cur.imDb.select(js.a, t.peerId))
        }

        function Bo(e, t, n, a, r) {
            e.setState({
                isEditing: !1
            }), removeClass(a, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, Object(i.p)(e) ? Object(i.v)(Object(i.h)(e)) : null), n.toggleStickers(e, !0), n.restoreKeyboard(), Do(t)
        }

        function Do(e) {
            Object(_.o)(geByClass("_im_history_tooltip", e)).forEach(hide)
        }

        function No(e, t, n, r, s) {
            var o = Object(i.u)(e, t);
            if (!(Date.now() - (o.lastReset || 0) < 1e3) && (o && o.msgs && o.history && !eo && o.offset > 300 && 0 == o.skipped && n < 50 && n >= 0 && 0 === (e.get().selectedMessages || []).length)) {
                var c = Object.keys(o.msgs).filter(e => e > 0).sort((e, t) => e - t).slice(0, -50),
                    l = c.slice(-1)[0];
                e.mutate(a.Tb.bind(null, t)), e.set(a.Mb.bind(null, c, t)).then(() => s().removeStartingFromMessage(l, t, e))
            }
        }

        function qo(e) {
            checkEvent(e) || cancelEvent(e)
        }

        function Ao(e, t, n, l, d, m, p, g, h, _, b, f, v, y, j, O) {
            var w, k = throttle(function(...e) {
                n.smoothScroll(...e)
            }, 300);
            return {
                fixKeyboard() {
                    d.fixKeyboard()
                },
                changePeer(e, s = !0, o = !0) {
                    if (0 === e.get().peer && j.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return d.setDraft(e, null),
                        function(e) {
                            addClass(e, "im-page--history_empty"), mo(e).innerHTML = ""
                        }(t);
                    if (Object(r.qb)(e.get(), e.get().peer)) {
                        removeClass(t, "im-page--history_search"), e.set(a.E), l.changeActions(e);
                        var c = e.get().peer,
                            u = e.get().prevPeer;
                        removeClass(t, "im-page--history_loading"), toggleClass(t, "im-page--history_vkcomgroup", Object(r.rb)(e, c)), s ? d.setDraft(e, Object(i.v)(Object(i.h)(e))) : d.updateState(e), wo(e, t), m().updateTyping(c, e), j.toggle(!0), jo(e, 0, l), Object(r.Ab)(u) && !Object(r.Ab)(c) ? (! function(e, t, n, a, r, i, s, o, c, l) {
                            removeClass(e, "im-page--history_empty"), go(e, t, n, a, r, i, s, o, c, l)
                        }(t, e, c, n, m, l, g, O, o, j), j.reset(n)) : Object(r.Ab)(u) || Object(r.Ab)(c) || (go(t, e, c, n, m, l, g, O, o, j), j.reset(n)), Object(r.Ab)(c) || bo(e, m, mo(t), v, j, t, 0, n), Object(r.L)(t)
                    }
                },
                preparePeer(e) {
                    var n = Object(i.p)(e);
                    Po(e), d.setDraft(e, Object(i.v)(Object(i.u)(e, n))), m().updateTyping(n, e), m().hideError(), l.renderPeer(e), O.renderPeer(e), l.hideActions(e), g.changePeer(n, e), jo(e, 0, l), j.toggle(!1), Lo(e, t, !0)
                },
                saveScroll: e => ho(e, n),
                loadingPeer(e) {
                    Object(a.V)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
                },
                stopLoading(e) {
                    removeClass(t, "im-page--history_loading")
                },
                deselectDialog(e) {
                    p().removeSelection(e)
                },
                replaceMessageAttrs(e, n) {
                    Object(r.gc)(n.get(), mo(t), e)
                },
                cleanSelection(e) {
                    _.cleanSelection(e)
                },
                updateDialogFilters(e) {
                    p().updateDialogFilters(e)
                },
                getSearchResulstModule: () => w,
                insertSearch(e, a) {
                    w || (l.deselectAll(a), w = u(t, a)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), mo(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), mo(t).innerHTML = Object(r.Vb)()), Io(a, n, t), n.scrollBottom(0), wo(a, t), j.reset(n)
                },
                updateChatTopic(e, t) {
                    p().updateDialog(e, t), e === t.get().peer && (l.renderPeer(t), l.renderActions(t), O.renderPeer(t))
                },
                updateActions(e) {
                    l.changeActions(e)
                },
                updateChatPhoto(e, a, i) {
                    if (Object(r.wb)(e.peerId, i.get())) {
                        l.renderPeer(i), O.renderPeer(i);
                        var s = Co(n);
                        Object(r.w)(e, a, i.get(), mo(t)), s && n.scrollBottom(Ls)
                    }
                },
                markImportant(e, n, a) {
                    so(t, e) && (l.changedMessageSelection(a), h.markImportant(e, n, a))
                },
                isNewMessagesVisible: e => Oo(e, n),
                loadHistory(e, a, i, s = !1) {
                    var o = i.get();
                    if (Object(r.wb)(e, o)) {
                        var c = s || o.tabs[e].historyToAppend;
                        if (!c) return;
                        var l = geByClass1("_im_peer_history", t),
                            d = domFC(l),
                            u = n.scrollBottom(),
                            m = a.reversed ? e => l.appendChild(e) : e => l.insertBefore(e, d),
                            p = 0;
                        a.reversed && (p = l.offsetHeight);
                        var g = sech(c),
                            h = document.createDocumentFragment();
                        g.forEach(e => h.appendChild(e)), m(h), a.reversed && j.heightIncreased(l.offsetHeight - p, n), a.reversed || n.scrollBottomFixSave(u), n.update(!1, !0);
                        var _ = g.filter(e => hasClass(e, "_im_bar_date"));
                        j.parseMore(_, n), Object(r.L)(t)
                    }
                },
                sendMessage(e) {
                    0 !== e.get().peer && d.sendMessage()
                },
                editMessage(e, a) {
                    if (Object(r.qb)(e, a.peerId) && Object(r.wb)(a.peerId, e.get())) {
                        if (!so(t, a.messageId)) return;
                        ho(e, n), Object(r.K)(e.get(), a, t), po(Object(i.u)(e, a.peerId), n), l.reRenderPinned(e), j.reset(n)
                    }
                },
                addMessage(e, o) {
                    if (!Object(a.Y)(o.peerId, e.get()) && Object(r.qb)(e, o.peerId) && Object(r.wb)(o.peerId, e.get())) {
                        if (so(t, o.messageId)) return;
                        var c = mo(t);
                        xo(j, c, n, () => {
                            var a = Co(n),
                                l = geByClass1("_im_unread_bar_row", t),
                                [d, u] = Object(r.vb)(e, t, n);
                            Object(r.x)(e.get(), o, c, !0, !0, !d && !l), removeClass(t, "im-page--history_empty-hist");
                            var p = Object(i.u)(e, e.get().peer),
                                g = Object(s.l)(o) && o.userId === vk.id,
                                h = o.kludges && o.kludges.source_act,
                                _ = g && h !== r.f && h !== r.h;
                            p.skipped || d || !Object(s.n)(p, o) || Object(s.k)(o) || wo(e, t, !0, u), (o.local || a || _) && n.scrollBottom(0), m().updateTyping(o.peerId, e), ko(t, e), Do(t)
                        });
                        var l = domPS(domLC(c));
                        if (hasClass(l, "_im_bar_date")) {
                            var d = ce("div");
                            d.innerHTML = l.outerHTML, j.parseMore(d, n)
                        }
                        m().hideError(), j.update(n), Object(a.ad)(e.get()), No(e, o.peerId, n.scrollBottom(), 0, m)
                    }
                },
                setMessageErrored(e, n, a, i) {
                    a && m().showError(a), Object(r.mc)(e, n, t)
                },
                markMessagesAsRead(e, n) {
                    e.get().peer === n.peerId && Object(r.Lb)(e.get(), n.peerId, t)
                },
                compensateHistoryHeightChange(e) {
                    n.scrollTop(n.scrollTop() + e * ro(f.get(), f.get().peer))
                },
                updateTyping(e, n) {
                    if (!Object(a.Y)(e, n.get())) {
                        var s = n.get();
                        if (s.peer === e && Object(r.qb)(s, e)) {
                            var o = Object(r.P)(Object(i.u)(n, e).activity, e, !1, s),
                                c = geByClass1(r.v, t);
                            if (c || o) {
                                if (!c) {
                                    var l = geByClass1($s, t);
                                    val(l, getTemplate("im_typing", {
                                        cls: Object(r.jb)(n) ? "im-activity_classic" : ""
                                    })), c = geByClass1(r.v, t)
                                }
                                val(geByClass1("_im_typing_name", c), o);
                                var d = Object(r.Jb)(Object(i.u)(n, e).activity || {}) === a.c;
                                c.setAttribute("data-activity-type", d ? "recording" : "typing"), o ? (addClass(c, "im-page--typing_vis"), m().hideError()) : removeClass(c, "im-page--typing_vis")
                            }
                        }
                    }
                },
                scrollFix(e, t, a) {
                    j.heightIncreased(a, n), j.update(n), Object(r.wb)(t, e.get()) && Co(n, a) && n.scrollBottom(Ls)
                },
                goToEnd() {
                    Eo(() => this, f, t, n)
                },
                updateGoToEnd(e, a) {
                    var r = Object(i.u)(e, e.get().peer);
                    r && r.skipped ? wo(e, t) : Lo(e, t, a), b(0, n, !1);
                    var s = e.get().peer;
                    setTimeout(() => {
                        e.get().peer === s && ho(e, n)
                    })
                },
                newMessage(e) {
                    p().newMessage(e), Lo(e, t, !0)
                },
                scroll(e, t, a = !1, r = !1) {
                    if (0 !== e.get().peer) {
                        var i = a ? n.getScrollHeight() : 40;
                        !0 === r && (i = n.contHeight()), i = "up" === t ? -i : i, a || r ? k(i, () => {
                            b(i, n)
                        }) : (n.scrollTop(n.scrollTop() + i), b(i, n))
                    }
                },
                showCreation(e, t) {
                    p().showCreation(e, t)
                },
                updateScroll: () => Io(f, n, t),
                toggleBarDate(e) {
                    j.toggle(e)
                },
                changedMessageSelection(e) {
                    l.changedMessageSelection(e)
                },
                updateOnline(e, t) {
                    Object(r.Db)(t.get(), e) && e === t.get().peer && l.renderPeer(t)
                },
                isEmpty: e => d.isEmpty(e),
                replaceAttachmentPlaceholders(e, a) {
                    if (Object(r.wb)(a.peerId, e.get())) xo(j, mo(t), n, () => {
                        var s = Co(n);
                        Object(r.fc)(t, a, e.get());
                        var o = Object(i.u)(e, a.peerId);
                        if (o.mediacontent[a.messageId].length >= 3 && o.mediacontent[a.messageId][2].pinned) {
                            var c = Object(i.S)(o.pinned);
                            c && c.messageId == a.messageId && (o.pinned = o.mediacontent[a.messageId][2].pinned, l.reRenderPinned(e))
                        }
                        s && n.scrollBottom(0)
                    }), j.update(n);
                    else if (Object(s.j)(a)) {
                        var o = Object(i.u)(e, a.peerId);
                        if (o.mediacontent[a.messageId].length >= 3 && o.mediacontent[a.messageId][2].pinned) {
                            var c = Object(i.S)(o.pinned);
                            c && c.messageId == a.messageId && (o.pinned = o.mediacontent[a.messageId][2].pinned)
                        }
                    }
                },
                removeMessages(e, a, i) {
                    i.get().peer === a && (Object(r.Ob)(e, mo(t)), Io(i, n, t), l.changedMessageSelection(i))
                },
                removeStartingFromMessage(e, a, i) {
                    if (i.get().peer === a) {
                        var s = mo(t),
                            o = geByClass1("_im_mess_" + e, s);
                        Object(r.Qb)(o, s), Io(i, n, t), l.changedMessageSelection(i)
                    }
                },
                hideGoToEnd(e) {
                    Lo(f, t, e)
                },
                removeMessagesRestore(e, n, a, i) {
                    i.get().peer === n && Object(r.Pb)(e, n, a, mo(t))
                },
                updateState(e, t) {
                    p().updateState(e, t)
                },
                updateBanner(e) {
                    O.renderPeer(e)
                },
                updateChat(e, t) {
                    e.get().peer === t && (l.changeActions(e), l.renderPeer(e), l.renderActions(e), O.renderPeer(e), d.updateState(e), Object(a.ad)(e.get()))
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
                    }), no(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(() => g.focus(e), 10)
                },
                cancelSearch(e, i = !0) {
                    if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                            searchShown: !1
                        }), no(e) && this.updateChatTopic(e.get().peer, e), l.changedMessageSelection(e)), i && !Object(r.Ab)(e.get().peer) && w) {
                        var s = e.get().tabs[e.get().peer];
                        mo(t).innerHTML = Object(a.Bc)(s.history), Io(e, n, t), n.scrollBottom(0), e.get().msgid && (yo(n, t, e.get().msgid, e), wo(e, t)), v(n), j.reset(n)
                    }
                    w && (w.unmount(), w = !1, Object(r.L)(t))
                },
                updateHistory(e) {
                    0 !== f.get().peer && e(t)
                },
                focusOnMessage() {
                    yo(n, t, f.get().msgid, f)
                },
                sendEditMessage(e, t) {
                    e.set(a.C.bind(null, Object(i.u)(e, t.peerId), t)).catch(n => e.get().longpoll.push([Object(c.pb)(t.peerId, t, n)]))
                },
                unmount() {
                    Object(o.c)(e), n.destroy(), clearInterval(y), d.unmount(), l.unmount(), h.unmount(), _.unmount(), g.unmount(), cancelStackFilter("forward"), co("_im_chat_resize_track", t)
                },
                removePeer(e, t) {
                    p().removePeer(e, t)
                },
                restoreScroll(e, t) {
                    var a = e.get().tabs[t];
                    a.scrollBottom ? po(a, n) : n.scrollBottom(Ls)
                },
                resendMessage(e, n) {
                    e === f.get().peer && Object(r.Fc)(e, n, t)
                },
                respond(e, t) {
                    d.attachMessages(e, t), d.focusOn(e);
                    var a = Object(i.u)(e, t);
                    a && !a.skipped && (n.scrollBottom(Ls), v(n))
                },
                cancelRecording() {
                    d.cancelRecording()
                },
                hideError() {
                    hide(geByClass1(Us, t))
                },
                showError(e) {
                    geByClass1(Us, t).innerHTML = e, show(geByClass1(Us, t)), n.scrollBottom(Ls)
                },
                startEditing(e) {
                    if (Object(a.V)(f.get())) Object(r.Cc)();
                    else {
                        e = Object(i.S)(e);
                        var n = Object(r.Y)(f);
                        if (!(d.isBlocked() || n && n.messageId == e.messageId)) {
                            n && this.cancelEditing(), Do(t), f.get().searchShown && this.cancelSearch(f);
                            var s = so(t, e.messageId);
                            s && (this.cancelRecording(), function(e, t, n, a, r) {
                                e.setState({
                                    isEditing: !0
                                }), n.saveText(e), addClass(a, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", () => Bo(e, t, n, a));
                                var i = new Gt.a;
                                i.dData.txt = Object(Lr.b)(r.text), i.dData.attaches = Object(Pr.a)(r.kludges, r.messageId), n.toggleStickers(e, !1), n.setDraft(e, i), setTimeout(() => n.focusOn(e), 0)
                            }(f, t, d, s, e), d.hideKeyboard(), l.deselectAll(f))
                        }
                    }
                },
                cancelEditing() {
                    var e = Object(r.Y)(f);
                    e && Bo(f, t, d, so(t, e.messageId))
                },
                getEditingMessage: () => Object(r.Y)(f),
                focusEditingMessage() {
                    var e = Object(r.Y)(f);
                    e && yo(n, t, e.messageId, f), d.focusOn(f)
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

        function Ho(e, t, n, l, d) {
            var u = geByClass1("_im_peer_history_w", e);
            show(u), hasAccessibilityMode() && addClass(u, "history_a11y");
            var {
                callMutations: m,
                bindMutations: p
            } = Object(o.b)(Ao), g = (e => {
                var t = debounce(e, 100),
                    n = throttle(e, 100);
                return e => {
                    t(e), n(e)
                }
            })(ho.bind(null, t)), h = vs(t, e), f = bo.bind(null, t, m, u, g, h, e), v = Object(b.a)(geByClass1("_im_chat_body_abs", e), {
                onScroll: f,
                nativeScroll: Object(r.jb)(t),
                shadows: !1
            });
            setTimeout(function() {
                t.get().peer && (Po(t), (Object(i.h)(t).pinned || Object(i.h)(t).top_banner) && (m().updateChatTopic(t.get().peer, t), t.set(a.oc), y.changeActions(t)), t.get().msgid ? yo(v, e, t.get().msgid, t) : vo(v, e, m, t, h) || v.scrollBottom(Ls), t.get().history_init = !1, h.reset(v), wo(t, e), bo(t, m, u, g, h, e, 0, v), Object(r.L)(e), nav.objLoc.st && (t.mutate(a.vc.bind(null, nav.objLoc.st, t.get().peer)), m().startSearch(t)))
            }, 15);
            var y = Xn(geByClass1("_im_dialog_actions", e), t, m),
                j = Di(geByClass1("_im_text_input", e), t, Object(r.jb)(t) ? l.updateMenu : void 0, (e, t) => {
                    n.removeDialog(e, t), n.restoreDialogs(e, !0)
                }, m),
                O = Wi(geByClass1("_im_dialog_actions", e), t, m),
                w = Zi(e, t, m),
                k = as(e, t, () => ({
                    changedMessageSelection: y.changedMessageSelection
                }));
            Object(ve.b)(e, t, m);
            var C = xs(e, t, () => ({
                hidePinned() {
                    Object(ve.c)(t, t.get().peer, m, !1)
                },
                compensateHistoryHeightChange(e) {
                    m().compensateHistoryHeightChange(e)
                },
                showPinned() {
                    Object(ve.d)(t, t.get().peer, m, !1)
                }
            }));
            Object(r.Ab)(t.get().peer) || t.set(a.Vb.bind(null, t.get().peer)).then(() => {
                Object(r.jc)(t.get().peer, t.get(), mo(e)), uo(e, t, t.get().peer)
            }), oo("_im_chat_resize_track", e, d);
            var S = function(e, t, n, a, r) {
                    var s = domData(r, "msgid"),
                        o = e.get().peer,
                        l = Object(i.n)(e, o, s);
                    l.type === c.g ? (n().sendEditMessage(e, l), n().resendMessage(o, s)) : e.get().imQueueResend(o, s).then(t => {
                        e.get().longpoll.push([Object(c.Eb)(o, t.mess)])
                    })
                }.bind(null, t, e, m),
                E = function(e, t, n, i, s) {
                    var o = intval(domData(s, "peer")),
                        c = intval(domData(gpeByClass("_im_mess", s), "msgid")),
                        l = e.get().tabs[o].hash;
                    return Object(a.Xb)(c, o, l, e.get().gid), e.set(a.Wb.bind(null, c, o)).then(r.ic.bind(null, c, o, mo(t))).then(() => Io(e, n, t)), !1
                }.bind(null, t, e, v),
                I = function(e, t) {
                    e().showCreation(t)
                }.bind(null, d, t),
                x = Eo.bind(null, m, t, e, v),
                T = function(e, t, n, a) {
                    if (hasClass(n.target, "_im_mess_marker")) {
                        var i = n.target;
                        window.tooltips && Object(_.o)(geByClass(r.l, t)).map(e => geByClass1("_im_mess_marker", e)).filter(e => e !== i).forEach(e => tooltips.hide(e, {
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
                M = r.pc.bind(null, t),
                L = r.uc.bind(null, t),
                P = function(e, t, n, i, s) {
                    var o = domData(s, "action"),
                        c = domData(s, "msgid"),
                        l = geByClass1("_im_mess_marker", so(n, c)),
                        d = Number(c) > 0 ? "edit" : "send";
                    switch (o) {
                        case "resend":
                            Object(be.j)("retry", d), t(i, s);
                            break;
                        case "delete":
                            Object(be.j)("delete", d), e.set(a.Jb.bind(null, e.get().peer, c)).then(() => {
                                Object(r.Ob)([c], mo(n))
                            })
                    }
                    tooltips.hide(l, {
                        fasthide: !0
                    })
                }.bind(null, t, S, e),
                B = function(e, t, n, r, i) {
                    if (checkEvent(r)) return !0;
                    var s = q2ajx(i.getAttribute("href")),
                        o = intval(s.msgid);
                    o && e.set(a.p.bind(null, e.get().peer, o, !1)).then(() => yo(n, t, o, e)), cancelEvent(r)
                }.bind(null, t, e, v),
                D = function(e, t, n) {
                    fe.a.isFullscreen || 0 === t.get().peer || Object(r.jb)(t) || e().restoreScroll(t, t.get().peer)
                }.bind(null, m, t, v),
                N = function(e, t) {
                    var n = e.get(),
                        o = n.peer,
                        c = domClosest(Gs, t.target),
                        l = intval(domData(c, "msgid")),
                        d = Object(i.n)(e, o, l),
                        u = d && Object(s.l)(d) && d.kludges.source_act;
                    if (u === r.f || u === r.h) {
                        var m = c.querySelector("." + Xs);
                        if (m && "A" !== m.tagName) {
                            var p = d.kludges.source_chat_local_id;
                            if (!p || to[p]) return;
                            to[p] = Object(a.N)(o, p, n).then(([e]) => {
                                if (e) {
                                    var t = `/im?sel=${Object(r.I)(o)}&msgid=${e}`,
                                        n = m.innerHTML;
                                    domReplaceEl(m, Object(r.kc)(t, n, !0, Xs)), delete to[p]
                                }
                            })
                        }
                    }
                }.bind(null, t),
                q = function(e, t, n) {
                    var a = e.get(),
                        s = a.peer,
                        o = n.target.href && n.target.href.match(/msgid=([\d]+)/),
                        l = o && o[1];
                    "A" !== n.target.tagName || !l || Object(r.gb)(e, s, l) || checkEvent(n) || (Object(i.n)(e, s, l) ? (e.setState({
                        msgid: l
                    }), Object(ys.b)({
                        msgid: l
                    }), t().focusOnMessage()) : a.longpoll.push([Object(c.gb)(s, l)])), cancelEvent(n)
                }.bind(null, t, m),
                A = function(e, t, n, a) {
                    var i = a.target,
                        s = domClosest(Js, i),
                        o = Number(s.getAttribute("data-msgid")),
                        c = domClosest("im-mess", i),
                        l = Number(c.getAttribute("data-msgid")),
                        d = e.get().peer;
                    o && !Object(r.gb)(e, d, o) ? (e.setState({
                        msgid: o
                    }), Object(ys.b)({
                        msgid: o
                    }), Object(r.N)(e, t().focusOnMessage, d, o)) : l && Object(r.xc)(e, l, a)
                }.bind(null, t, m, e),
                H = Object(o.a)({
                    handlers: (n, s) => {
                        s(e, "click", r.s, E), s(e, "mouseover click", r.l, T), s(e, "mouseover", "_im_edit_time", M), s(e, "mouseover", "_im_page_info", L), s(e, "click", "_im_mess_susp", function(e, t) {
                            var n = intval(domData(t.target, "msgid")),
                                a = gpeByClass(`_im_mess_${n}`, t.target),
                                r = geByClass1("_im_log_body", a),
                                i = geByClass1("_im_mess_susp_cont", a);
                            r.innerHTML = i.innerHTML
                        }.bind(null, e)), s(e, "click", Hs, P), s(e, "click", Fs, B), s(e, "mouseover", Rs, To), s(e, "mouseover", Gs, N), s(e, "click", Xs, q), s(e, "click", Us, lo), s(e, "click", Js, A), s(e, "click", Zs, qo), s(e, "click", Qs, (e, n) => {
                            if (checkEvent(e)) return !0;
                            if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                            var i = geByClass1("flat_button", n),
                                s = {
                                    invite_chat_id: domData(i, "inv-id"),
                                    invite_hash: domData(i, "hash")
                                };
                            Object(r.sc)(t, s, a.db), cancelEvent(e)
                        }), s(e, "click", zs, () => t.get().longpoll.push([Object(c.Hb)()])), s(e, "click", Ks, e => (function(e, t, n) {
                            var s = e.get(),
                                o = domClosest(Ys, n.target),
                                c = domData(o, "msgid"),
                                l = Object(i.n)(s, s.peer, c),
                                d = e => t().replaceAttachmentPlaceholders(e, l);
                            l && (Object(be.j)("retry_attach"), e.set(a.g.bind(null, l, [Object(r.Xb)(e, l)])).then(d), e.set(a.pb.bind(null, l)).then(d))
                        })(t, m, e)), n(geByClass1("_im_peer_history_w", e), "mousemove", h.show), n(geByClass1("_im_start_new", e), "click", I), n(e.querySelector(As), "click", x), n(geByClass1("_im_cancel_edit", e), "click", () => (m().cancelEditing(), !1)), n(geByClass1("_im_edit_focus_cur", e), "click", () => (m().focusEditingMessage(), !1)), fe.a.raw && n(document, fe.a.raw.fullscreenchange, D), n(window, "im_goToMessage", e => {
                            var n = intval(e.msgid);
                            if (n) return window.statlogsValueEvent("im_links_to_attachments", 1, "to_message"), t.set(a.p.bind(null, e.sel, n, !1)).then(() => Object(r.N)(t, m().focusOnMessage, t.get().peer, n))
                        })
                    }
                });
            curNotifier.recvClbks.pin_hide = [function(e) {
                e.hide ? Object(ve.c)(t, e.peer, m, !1) : Object(ve.d)(t, e.peer, m, !1)
            }], window.showForwardBox = (e => (function(e, t) {
                Object(r.A)(showBox("al_im.php", t, {
                    dark: 1
                }), e)
            })(t, e));
            var F = setInterval(jo.bind(null, t, e, y), 1e4);
            return p(H, e, v, y, j, m, d, O, w, k, f, t, g, F, h, C)
        }
        var Fo = [],
            Ro = 0,
            $o = !1;

        function Uo(e) {
            Fo = Fo.reduce((t, [n, a]) => {
                return a(e) ? t : t.concat([
                    [n, a]
                ])
            }, [])
        }
        var zo = function(e, t = []) {
            return Ro++, {
                stop() {
                    Ro--,
                    function(e) {
                        Fo = Fo.filter(([t]) => t !== e), 0 === Ro && (document.body.removeEventListener("click", Uo, !0), $o = !1)
                    }(e)
                },
                replaceOrAdd(n) {
                    var a = Fo.filter(([t]) => e === t),
                        r = function(e, t) {
                            return 0 === t.length ? t => (e(t), !0) : n => {
                                var a = t.reduce((e, t) => e && !domClosest(t, n.target), !0);
                                return a && e(n), a
                            }
                        }(n, t);
                    a.length > 0 ? function(e, t) {
                        Fo = Fo.map(([n, a]) => n === e ? [e, t] : [n, a])
                    }(e, r) : function(e, t) {
                        !1 === $o && ($o = !0, document.body.addEventListener("click", Uo, !0)), Fo = Fo.concat([
                            [e, t]
                        ])
                    }(e, r)
                }
            }
        };

        function Ko(e, t, n, i) {
            var s = ge("box_layer_wrap"),
                l = t.get().longpoll,
                d = h({
                    peer: 0,
                    longpoll: l,
                    oCache: {},
                    tabs: Object(r.Gc)(i.msgs, i.hash)
                }),
                m = Zi(e.bodyNode, d, () => ({})),
                p = u(e.bodyNode, t);
            Object(r.L)(e.bodyNode);
            var g = function(e, t, n, ...r) {
                r.filter(e => inArray(e.type, [c.Y, c.U, c.b])).forEach(r => {
                    if (r.type !== c.b) {
                        if (r.flags === c.l) {
                            var i = r.type === c.Y;
                            e.set(a.Uc.bind(null, [r.messageId], 0, i)).then(n => {
                                t.markImportant(r.messageId, i, e)
                            })
                        }
                    } else n.hide()
                })
            }.bind(null, t, m, e);
            l.onData(g);
            var _ = function(e, t, n, i) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var s = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(r.Oc)(s)(Object(a.kb)(e.offset).then(([t, n, o, c]) => {
                            e.all = c.all, e.offset = c.offset, e.all ? addClass(s, "im-important_all") : e.loading = !1, i.set(a.yb.bind(null, Object(r.Gc)(c.msgs, c.hash)));
                            var l = ce("div");
                            l.innerHTML = n, s.appendChild(l), Object(r.L)(s)
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
        var Wo = n("XzvV"),
            Vo = debounce(L.b, 1e3),
            Go = "_im_important_counter",
            Xo = "_im_gim_mute";

        function Qo(e) {
            return ge("im_dialogs_search", e)
        }

        function Yo(e, t, n, r, s, o) {
            var c = trim(o);
            if (Object(i.P)(e, c)) {
                var l = tc.bind(null, e, n, s, t);
                c ? (e.setState({
                    recentSearch: !1
                }), s.stop()) : s.replaceOrAdd(l), cancelStackPush("im_search", l), c && e.set(a.rc.bind(null, c, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
            } else c || (s.stop(), e.set(a.rc.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
        }

        function Jo(e, t, n) {
            return function(...a) {
                Object(i.s)(t) === e && n(...a)
            }
        }

        function Zo(e, t, n) {
            var r = Object(i.s)(n);
            return Vo(.01, "im_search_stat", 1, "search_start"), Object(a.dd)(r), n.setState({
                recentSearch: !1
            }), e().toggleSettingsButton(n, !!r), r ? (n.get().dialog_search_going = !0, function(e, t, n) {
                var r = Jo(e, n, t().appendFastDialogs.bind(null, n));
                return Object(a.ic)(e, n.get()).then(e => (r(e), e))
            }(r, e, n).then(a => {
                var i = a.map(e => e.peerId);
                return t(r, e, i, n)
            }).then(e => {
                n.get().dialog_search_going = !1
            }).catch(() => {})) : (e().restoreDialogs(n, !1, !0), Object(Wo.b)("messages"), Promise.resolve(!1))
        }

        function ec(e, t, n, i) {
            var s = i.get(),
                o = Jo(e, i, t().appendDialogs.bind(null, i)),
                c = Jo(e, i, t().appendSearch);
            return Object(r.zb)(i) ? Object(a.cc)(e, n, "all", {}, s).then(o) : Promise.all([Object(a.cc)(e, n, "all", {}, s).then(o), Object(a.gc)(e, s)]).then(([, [e, t]]) => {
                c(i, e, t, !0)
            })
        }

        function tc(e, t, n, a) {
            cancelStackFilter("im_search");
            var r = Qo(t);
            uiSearch.reset(r), e.setState({
                recentSearch: !1
            }), Yo(e, a, t, r, n, r.value)
        }

        function nc(e, t) {
            return showTooltip(t, {
                appendEl: bodyNode,
                text: () => Object(i.O)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion"),
                black: 1,
                shift: [3, -1],
                appendCls: "js-im-page"
            })
        }

        function ac(e, t, {
            target: n
        }) {
            e.set(a.Hc.bind(null, t)).then(() => {
                toggleClass(n, "im-page--gim-mute_muted", e.get().mute), t && rc(e, {
                    target: n
                })
            })
        }

        function rc(e, {
            target: t
        }) {
            return showTooltip(t, {
                text: () => e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
                black: 1,
                shift: [13, 9],
                appendCls: "js-im-page"
            })
        }

        function ic(e, t, n, a, r, i) {
            return {
                focusInput(t) {
                    uiSearch.focus(Qo(e).parentNode)
                },
                createCanceled(e, n) {
                    removeClass(t, "im-dialog-select_rotated")
                },
                rotateCross(e) {
                    addClass(t, "im-dialog-select_rotated")
                },
                setSearch(t, n, r = !1) {
                    ! function(e, t, n, a, r) {
                        var i = Qo(t);
                        i.value = r, Yo(e, a, t, i, n, i.value)
                    }(t, e, a, r ? i : () => {}, n)
                },
                clearSearch(t) {
                    tc(t, e, a, () => {})
                },
                updateImportantCnt(t) {
                    var n = t.get().important_cnt,
                        a = geByClass1(Go, e);
                    toggleClass(a, "im-page--stars_hidden", 0 === n), a.innerHTML = "<i></i> " + n
                },
                unmount() {
                    a.stop(), Object(o.c)(r), uiSearch.destroy(n), cancelStackFilter("im_search")
                }
            }
        }

        function sc(e, t, n) {
            var s = geByClass1("_im_search_croll", e),
                l = Qo(e),
                d = zo("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
                u = Object(it.b)(ec, 300),
                m = Zo.bind(null, n, u),
                p = Yo.bind(null, t, m, e, l, d),
                g = function(e, t, n, a, r, s) {
                    Object(i.O)(e) ? (tc(e, t, r, n), setTimeout(() => nc(e, s), 10)) : (window.tooltips && tooltips.hide(s, {
                        showsp: 0
                    }), function(e, t, n) {
                        n().showCreation(e)
                    }(e, 0, a))
                }.bind(null, t, e, m, n, d, s),
                h = function(e, t, n, a, i) {
                    return Object(r.qc)(e, n, Ko, a)
                }.bind(null, t, e, n),
                _ = geByClass1("_im_dialogs_search_input", e);
            uiSearch.init(_, {
                onChange: p
            });
            var b = nc.bind(null, t, s),
                f = geByClass1(Xo, e);
            l.value && p(l.value);
            var v = Object(o.a)({
                handlers: (o, u) => {
                    if (o(geByClass1("_im_av_time", e), "mouseover", e => {
                            showTooltip(e.target, {
                                text: getLang("mail_admin_av_time"),
                                dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                                shift: [0, 8]
                            })
                        }), o(s, "click", g), o(s, "mouseover", b), o(geByClass1(Go, e), "click", h), Object(r.jb)(t)) {
                        var m = ac.bind(null, t, !0),
                            p = rc.bind(null, t);
                        o(f, "click", m), o(f, "mouseover", p)
                    }
                    o(l, "focus", () => {
                        t.get().longpoll.push([Object(c.Lb)("search")])
                    }), o(l, "click", () => {
                        Object(i.O)(t) && n().toggleSettingsButton(t, !0),
                            function(e, t, n, s, o) {
                                if (!Object(i.O)(e)) {
                                    var c = cur.imDb.select(js.b);
                                    if (0 !== c.length || Object(i.c)(e)) {
                                        e.setState({
                                            recentSearch: !0
                                        }), Yo(e, () => {
                                            Object(i.O)(e) || (s.stop(), o().toggleSettingsButton(e, !1), o().restoreDialogs(e, !1, !0))
                                        }, t, n, s, "");
                                        var l = c.filter(t => !Object(r.Eb)(e.get(), t)),
                                            d = c.filter(t => Object(r.Eb)(e.get(), t)).reduce((t, n) => (t[n] = Object(i.u)(e, n), t), {});
                                        e.get().topConvTree.then(t => {
                                            var n = t.list.filter(e => inArray(e[0], l)).reduce((e, t) => (e[t[0]] = Object(a.ub)(t), e), {}),
                                                r = extend({}, n, d);
                                            return o().appendFastDialogs(e, c.map(e => r[e])), Object(a.cc)(!1, Object.keys(n), !1, {}, e.get())
                                        }).then(t => {
                                            o().appendDialogs(e, t)
                                        })
                                    }
                                }
                            }(t, e, l, d, n)
                    }), o(l, "blur", () => {
                        var e;
                        e = 0 === t.get().peer ? "search" : Object(r.zb)(t) ? "search" : "default", Object(i.O)(t) || n().toggleSettingsButton(t, !1), t.get().longpoll.push([Object(c.Lb)(e)])
                    })
                }
            });
            return Object(r.jb)(t) && ac(t, !1, {
                target: f
            }), ic(e, s, _, d, v, m)
        }
        var oc = n("W9Tc"),
            cc = "_im_spam_not_spam",
            lc = "_im_spam_spam";

        function dc(e, t) {
            var n = t.get().selectedMessages,
                a = geByClass1("_im_spam_box", e.bodyNode),
                i = geByClass1("ui_tab_sel", e.bodyNode);
            if (n.length > 0) {
                var s = getLang("mail_selected", n.length);
                s = s.replace("{count}", n.length), val(i, s + `<button aria-label="${getLang("mail_deselect_all")}" type="button" class="im-deselect ${r.k}"></button>`)
            } else val(i, getLang("mail_spam"));
            0 === n.length ? removeClass(a, "im-important-box_with-sel") : (addClass(a, "im-important-box_with-sel"), val(geByClass1(cc), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(lc), getLang("mail_im_mark_delspam", n.length)))
        }

        function uc(e, t, n) {
            var r = e.get().selectedMessages;
            e.set(a.t).then(n.cleanSelection.bind(null, r)).then(n => dc(t, e))
        }

        function mc(e, t) {
            return {
                unmount() {
                    t.unmount(), Object(o.c)(e)
                }
            }
        }

        function pc(e, t, n) {
            var i = ge("box_layer_wrap"),
                {
                    callMutations: s,
                    bindMutations: l
                } = Object(o.b)(mc),
                d = h({
                    peer: 0,
                    oCache: {},
                    tabs: Object(r.Gc)(n.msgs, n.hash),
                    gid: t.get().gid
                }),
                u = function(e, t, n, i) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var s = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(r.Oc)(s)(Object(a.tb)(e.offset, i.get().gid).then(([t, n, o, c]) => {
                            e.all = c.all, e.offset = c.offset, e.all ? addClass(s, "im-important_all") : e.loading = !1, i.set(a.yb.bind(null, Object(r.Gc)(c.msgs, c.hash)));
                            var l = ce("div");
                            l.innerHTML = n, s.appendChild(l), Object(r.L)(s)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: n.all,
                    loading: !1,
                    offset: n.offset
                }, e, i, d),
                m = function(e, t, n, i) {
                    var s = gpeByClass("_im_mess", i, t);
                    if (s) {
                        var o = intval(domData(s, "msgid"));
                        s && (Object(a.Lb)([o], 0, e.get().tabs[0].hash, "undel", e.get()), Object(r.ic)(o, 0, t))
                    }
                }.bind(null, d, e.bodyNode),
                p = function(e, t, n, a, r) {
                    var i = gpeByClass("_im_mess", r, t.bodyNode),
                        s = intval(domData(i, "peer")),
                        o = intval(domData(i, "msgid"));
                    return t.hide(), n().unmount(), e.get().longpoll.push([Object(c.gb)(s, o)]), stopEvent(a), cancelEvent(a), !1
                }.bind(null, t, e, s),
                g = function(e, t, n, r) {
                    var i = showFastBox({
                        title: getLang("mail_deleteall1"),
                        dark: 1,
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, getLang("mail_delete_all_spam"), getLang("mail_delete"), () => {
                        Object(a.J)(e, r).then(([e, t]) => {
                            showDoneBox(t)
                        }), i.hide(), t.hide(), n().unmount()
                    }, getLang("mail_close"), () => i.hide())
                }.bind(null, n.hash, e, s, t.get().gid),
                _ = as(e.bodyNode, d, t => ({
                    changedMessageSelection: dc.bind(null, e)
                })),
                b = function(e, t, n) {
                    var i = e.get().selectedMessages;
                    Object(a.Lb)(i, 0, e.get().tabs[0].hash, "delete", e.get()), Object(r.Pb)(i, 0, "delete", t), uc(e, t, n)
                }.bind(null, d, e.bodyNode, _),
                f = function(e, t, n) {
                    var i = e.get().selectedMessages;
                    Object(a.Lb)(i, 0, e.get().tabs[0].hash, "nospam", e.get()), i.map(e => geByClass1("_im_mess_" + e)).filter(e => e).forEach(e => {
                        var t = intval(domData(e, "peer")),
                            n = intval(domData(e, "msgid"));
                        val(e, Object(r.Wb)(t, n)), addClass(e, "im-mess_light")
                    }), uc(e, t, n)
                }.bind(null, d, e.bodyNode, _),
                v = uc.bind(null, d, e, _);
            return Object(r.L)(e.bodyNode), l(Object(o.a)({
                handlers: (t, n) => {
                    t(i, "scroll", u), t(geByClass1(lc, e.bodyNode), "click", b), t(geByClass1(cc, e.bodyNode), "click", f), t(geByClass1("_im_spam_flush", e.bodyNode), "click", g), n(e.bodyNode, "click", "_im_mess_restore", m), n(e.bodyNode, "click", "_im_go_to", p), n(e.bodyNode, "click", r.k, v)
                }
            }), _)
        }
        var gc = "_im_dialogs_cog_settings",
            hc = "_im_settings_action",
            _c = "_im_to_unread";

        function bc(e = "im_settings") {
            var t = {
                sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
            };
            return window.pushNotifier && window.pushNotifier.loadEndpoint() || Object(oc.a)("push_notifier") && ls.get("im_ui_notify_off") ? t.browser = getLang("mail_notification_settings") : t.browser = fc() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off"), getTemplate(e, t)
        }

        function fc() {
            return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
        }

        function vc(e, t, n) {
            var s = function(e, t) {
                    showTooltip(t.target, {
                        content: bc("im_settings_pop"),
                        dir: "down",
                        shift: [220, 9],
                        hasover: !0,
                        showdt: 300
                    })
                }.bind(null, t),
                c = function(e, t, n, a, i) {
                    var s = domData(i, "action"),
                        o = gpeByClass("_im_settings_menu", i),
                        c = hasClass(o, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
                    switch (s) {
                        case "spam":
                            Object(r.yc)(e, pc, a);
                            break;
                        case "sound":
                            ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), o.outerHTML = bc(c);
                            break;
                        case "browser":
                            fc() ? (ls.set("im_ui_notify_off", 1), o.outerHTML = bc(c), Object(be.a)()) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(() => {
                                o.parentNode && (o.outerHTML = bc(c))
                            }) : Object(oc.a)("push_notifier") ? nav.go("/settings?act=notify") : (ls.set("im_ui_notify_off", 0), o.outerHTML = bc(c), Object(be.b)())
                    }
                }.bind(null, t, n, e),
                l = function(e, i) {
                    if (Object(r.Ac)(t, n, a.o)) {
                        var s = t.get().active_tab === m.m;
                        val(i, getTemplate("im_filter", {
                            filter: s ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                        }))
                    }
                },
                d = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "mouseover", gc, s), n(e, "click", hc, c), n(e, "click", _c, l)
                    }
                });
            return function(e, t) {
                return {
                    updateFilter(t) {
                        var n, a = t.get().active_tab === m.m,
                            r = [];
                        Object(i.O)(t) && r.push("im-page--dialogs-filter_hidden"), t.get().unread_cnt > 0 ? n = a ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread") : (n = getLang("mail_all_dialogs"), r.push("im-page--dialogs-filter_disabled")), val(geByClass1(_c, e), getTemplate("im_filter", {
                            filter: n,
                            cls: r.join(" ")
                        }))
                    },
                    toggleButton(t, n) {
                        var a = geByClass1("im-page--dialogs-filter", e);
                        toggleClass(a, "im-page--dialogs-filter_hidden", n)
                    },
                    toggleLoader(t, n) {
                        var a = geByClass1(gc, e);
                        toggleClass(a, "im-page--dialogs-settings_loading", n)
                    },
                    updateSettings(t) {
                        geByClass1("_im_settings_menu", e).outerHTML = bc()
                    },
                    unmount() {
                        Object(o.c)(t)
                    }
                }
            }(e, d)
        }
        var yc = "_ui_multiselect_cancel";

        function jc(e) {
            return e.selection = [], Promise.resolve(e)
        }

        function Oc(e, t) {
            return t.selection = t.selection.filter(t => t.id !== e), Promise.resolve(t)
        }

        function wc(e, t, n, a) {
            var r = n.get().selection,
                i = uiSearch.getFieldEl(e);
            uiSearch.focus(e), r.length > 0 ? attr(i, "placeholder", "") : attr(i, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = r.map(e => `<div class="token">\n      <div class="token_title">${e.name}</div>\n      <div data-peer="${e.id}" class="token_del ${yc}"></div>\n    </div>`).join(""), toggleClass(e, "ui_multiselect_has_selection", r.length > 0), domFC(e).scrollTop += 50, a()
        }

        function kc(e, t) {
            return showTooltip(t, {
                text: getLang("mail_create_chat_remove_user"),
                black: 1,
                shift: [15, 8],
                appendParentCls: "_wrap"
            })
        }

        function Cc(e, t, n) {
            uiSearch.init(e, {
                onChange: function(e, t, n, r) {
                    e.set(a.rc.bind(null, n, !1)).then(t().onChange)
                }.bind(null, t, n)
            });
            var r = uiSearch.getFieldEl(e),
                i = ce("div", {
                    className: "_ui_multiselection ui_multiselect_cnt"
                });
            r && r.parentNode.insertBefore(i, r);
            var s = function(e) {
                var t = 0;
                return function() {
                    var n = e.offsetWidth;
                    setStyle(e, {
                        width: 1
                    });
                    var a = e.offsetLeft;
                    t !== a ? (t = a, n = e.parentNode.offsetWidth, setStyle(e, {
                        width: Math.max(30, n - a - 20)
                    })) : setStyle(e, {
                        width: n
                    })
                }
            }(r);
            t.set(jc);
            var c = function(e, t, n, a, r, i, s) {
                    var o = intval(domData(s, "peer"));
                    tooltips.hide(s), t.set(Oc.bind(null, o)).then(i => {
                        wc(e, a, t, r), n().selectionDeleted(t, o)
                    })
                }.bind(null, e, t, n, i, s),
                l = t => {
                    document.activeElement !== r && uiSearch.focus(e)
                },
                d = Object(o.a)({
                    handlers: (t, n) => {
                        n(e, "click", yc, c), n(e, "mouseover", yc, kc), t(e, "click", l)
                    }
                });
            return {
                addSelection: (n, a) => t.set(function(e, t) {
                    return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
                }.bind(null, {
                    id: n,
                    name: a
                })).then(wc.bind(null, e, i, t, s)),
                removeSelection: n => t.set(Oc.bind(null, n)).then(wc.bind(null, e, i, t, s)),
                resetSelection() {
                    ! function(e, t, n, a) {
                        e.set(jc).then(wc.bind(null, t, n, e, a))
                    }(t, e, i, s)
                },
                focus() {
                    uiSearch.focus(e)
                },
                save() {
                    t.stash(), wc(e, i, t, s)
                },
                restore() {
                    t.pop(), wc(e, i, t, s)
                },
                unmount() {
                    uiSearch.destroy(e), Object(o.c)(d)
                }
            }
        }
        var Sc = "_im_create_cancel",
            Ec = "_im_create_list",
            Ic = "_im_dialog",
            xc = "_im_create_tab",
            Tc = "_im_dialogs_creation_name",
            Mc = "_im_create_select",
            Lc = "_im_create_avatar",
            Pc = "_im_create_remove_avatar",
            Bc = "_im_confirm_creation",
            Dc = "_im_cancel_creation",
            Nc = "_im_avatar_img",
            qc = ["im-creation--item_hovered"],
            Ac = "olist_item_wrap_on",
            Hc = "ui_search_reset",
            Fc = 100;

        function Rc(e, t, n, r, i, s) {
            Object(a.Ic)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(Uc.bind(null, t, !1), 100), Vc(s).map(e => geByClass1("_im_dialog" + e)).forEach(e => {
                removeClass(e, Ac)
            }), n().createCanceled(e, r), i.resetSelection(), "add_member" === e.get().creationType && e.set(a.qc.bind(null, "chat", [])), e.set(a.Db.bind(null, !1));
            var o = geByClass1(Nc, t);
            zc(e, s, t), uiSearch.reset(geByClass1(Tc, t)), uiSearch.reset(geByClass1(Mc, t)), o && o.parentNode.removeChild(o), zc(e, s, t), cancelStackFilter("im_search");
            var l = 0 === e.get().peer ? "search" : "default";
            e.get().longpoll.push([Object(c.Lb)(l)]), attr(t, "aria-hidden", "true")
        }

        function $c(e, t, n) {
            return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(e => {
                e.then(e => {
                    e = e.filter(e => !n.current_create_peer_ids[e.peerId]), n.current_create_peer_ids = e.reduce((e, t) => (e[t.peerId] = !0, e), n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
                })
            }), Promise.resolve(n)
        }

        function Uc(e, t) {
            toggleClass(e, "im-create_material", t)
        }

        function zc(e, t, n) {
            var a = geByClass1(Bc, n),
                r = t.get().selection.length,
                i = "add_member" === e.get().creationType,
                s = r > 0,
                o = uiSearch.getFieldEl(geByClass1(Tc, n)).value.length > 0,
                c = !s && (i || !o),
                l = i ? 1 === r ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with") : o || r > 1 ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog");
            val(a, l), toggleClass(a, "button_disabled", c)
        }

        function Kc(e, t, n, a, r, i, s) {
            if (s) {
                var o, c = intval(domData(s, "list-id")),
                    l = Vc(i),
                    d = trim(s.textContent),
                    u = geByClass1(Mc, t),
                    m = getSize(u)[1];
                inArray(c, l) ? (o = a.removeSelection(c, d), removeClass(s, Ac)) : (o = a.addSelection(c, d), addClass(s, Ac)), o.then(() => {
                    var e = m - getSize(u)[1],
                        t = r.scrollTop();
                    r.scrollTop(t - e)
                }), zc(e, i, t);
                var p = geByClass1(Mc, t);
                uiSearch.reset(p)
            }
        }

        function Wc(e) {
            return Object(i.s)(e) || !1
        }

        function Vc(e) {
            return e.get().selection.map(e => e.id)
        }

        function Gc(e, t, n, a) {
            toggleClass(e, "im-create_chat", "chat" === a.get().creationType), toggleClass(e, "im-create_invite", "add_member" === a.get().creationType);
            var i = "chat" === a.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
                s = geByClass1("_im_create_title", e);
            val(s, i), val(geByClass1(Bc, e), "add_member" === a.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat")), Qc(e, a, t, !1, n.get().selection.map(e => e.id)), Object(r.M)("_im_create_wrap_safe", e)
        }

        function Xc(e, t, n) {
            return e.then(e => e.filter(e => e.is_friend && !inArray(e.peerId, n.get().creationFilter)))
        }

        function Qc(e, t, n, r, i) {
            var s, o, c = geByClass1(Mc, e),
                l = Object(a.fc)(r, t.get()),
                d = n.hoverFirstElement.bind(n, qc, Zc(t));
            t.get().creation_shown_all = !1, n.reset(), n.pipe(Xc(l, 0, t), r), n.toTop(), r ? (o = Object(a.ic)(r, t.get()), s = Object(a.dc)(r, [], "friends", t.get()), n.pipe(Xc(s, 0, t), r).then(d), n.pipe(Xc(o, 0, t), r).then(d)) : (s = Promise.resolve([]), o = Promise.resolve([])), t.set($c.bind(null, [l, o, s], !0)), uiSearch.showProgress(c), Promise.all([l, s, o]).then(() => uiSearch.hideProgress(c))
        }

        function Yc(e, t, n, a, r, i) {
            Vc(t).map(e => geByClass1("_im_dialog" + e)).forEach(e => removeClass(e, Ac)), t.reset(), Qc(n, e, a, !1, Vc(t)), r.resetSelection(), Rc(e, n, i, !1, r, t)
        }

        function Jc(e, t, n, r, s, o, l) {
            var d = Vc(t),
                u = e.get(),
                m = geByClass1(Bc, n),
                p = uiSearch.getFieldEl(geByClass1(Tc, n)).value,
                g = "add_member" === e.get().creationType,
                h = !g && (p.length || d.length > 1);
            if (g) return e.set(a.i.bind(null, u.peer, d)).catch(e => showFastBox(getLang("global_error"), e)), Rc(e, n, o, "", s, t);
            if (lockButton(m), !h) return _(d[0]);

            function _(a) {
                Yc(e, t, n, r, s, o),
                    function(e, t, n, a, r, i) {
                        Rc(e, t, n, !1, r, i), e.get().longpoll.push([Object(c.gb)(a, !1, !1, !1, "create_conversation")])
                    }(e, n, o, a, s, t), unlockButton(m), Object(i.O)(e) ? o().cancelSearch(e) : o().restoreDialogs(e)
            }
            e.set(a.w.bind(null, u.next_chat_avatar, d, p)).then(() => _(u.next_peer)).catch(e => {
                unlockButton(m), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
            })
        }

        function Zc(e, t) {
            var n = t && t.get().selection.length;
            return {
                top: -1,
                bottom: Object(r.jb)(e) ? n > 0 ? 69 : 0 : -1
            }
        }

        function el(e, t, n) {
            var i = h({
                    selection: []
                }),
                s = M(geByClass1(Ec, e), h({
                    offset: 0,
                    limit: Fc,
                    elements: [],
                    elCls: Ic
                }), () => ({
                    idFn: e => intval(e.peerId),
                    hoverableFn: e => hasClass(e, "_im_dialog"),
                    renderFn: function(e, t) {
                        var n = Vc(e),
                            a = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
                            r = [];
                        return t.online && r.push("online"), mobPlatforms[t.online] && r.push("mobile"), inArray(t.peerId, n) && a.push(Ac), getTemplate("im_owner_item", {
                            owner_id: t.peerId,
                            cls: " " + a.join(" "),
                            photo: t.photo,
                            name: t.name,
                            link: t.href,
                            img_cls: r.join(" ")
                        })
                    }.bind(null, i),
                    more(e, n) {
                        var r;
                        return t.get().shown ? (t.get().creation_shown_all || !1 !== Wc(i) ? r = Promise.resolve([]) : (t.get().creation_shown_all = !0, r = Object(a.ic)(Wc(i), t.get())), t.set($c.bind(null, [r], !1)), Xc(r, Wc(i), t)) : Promise.resolve(!1)
                    },
                    onClick(n, a) {
                        checkEvent(n) || (Kc(t, e, 0, l, s, i, a), cancelEvent(n))
                    }
                }));
            t.get().creationQuery = !1, t.get().creationType = "chat";
            var l = Cc(geByClass1(Mc, e), i, () => ({
                    selectionDeleted(n, a) {
                        zc(t, n, e), removeClass(geByClass1("_im_dialog" + a), Ac)
                    },
                    onChange: function(e, t, n, a) {
                        var r = a.get(),
                            i = Wc(r);
                        r.selection.map(e => e.id), n.unhoverElements(qc), e.get().creationQuery = i, Qc(t, e, n, i)
                    }.bind(null, t, e, s)
                })),
                d = Rc.bind(null, t, e, n, "cross", l, i),
                u = function(e, t, n, r, i, s, o, c) {
                    uiTabs.switchTab(c.firstElementChild);
                    var l = domData(c, "type");
                    switch (l) {
                        case "chat":
                            s.restore()
                    }
                    e.set(a.qc.bind(null, l, [])).then(Gc.bind(null, t, r, i))
                }.bind(null, t, e, n, s, i, l),
                m = function(e, t, n, r) {
                    var i = 2e9 + Math.round(rand(1e6, 2e6));
                    cur.recieveCropResult = (n => {
                        cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(a.Db.bind(null, n)), Object(a.P)(n, i).then(e => {
                            geByClass1(Lc, t).appendChild(ce("img", {
                                className: `im-chat-placeholder--img ${Nc}`,
                                src: e
                            }))
                        }), addClass(t, "im-create_photo-attached")
                    }), Page.ownerPhoto(i)
                }.bind(null, t, e),
                p = function(e, t) {
                    geByClass1(Lc, t).innerHTML = "", e.set(a.Db.bind(null, !1)), removeClass(t, "im-create_photo-attached")
                }.bind(null, t, e),
                g = Yc.bind(null, t, i, e, s, l, n),
                _ = Jc.bind(null, t, i, e, s, l, n),
                b = function(e, t, n) {
                    zc(e, t, n)
                }.bind(null, t, i, e),
                f = geByClass1(Sc, e),
                v = geByClass1(Tc, e),
                y = v.querySelector("." + Hc),
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
                        }.bind(null, f)), t(geByClass1(Lc, e), "click", m), t(geByClass1(Pc, e), "click", p), t(geByClass1(Dc, e), "click", g), t(v, "change", b), t(v, "input", b), t(v, "paste", b), t(y, "click", b), t(geByClass1(Bc, e), "click", _), t(e, "mouseover", throttle(s.unhoverElements.bind(s, qc), 100)), n(e, "click", xc, u)
                    }
                });
            return function(e, t, n, a, i, s, l, d) {
                return {
                    show(t, r = []) {
                        t.setState({
                            shown: !0
                        }), Uc(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown");
                        var s = a.get().selection.reduce((e, t) => (e[t.id] = !0, e), {});
                        r && r.forEach(t => {
                            if (!s[t[0]]) {
                                var n = e.querySelector(`._im_dialog${t[0]}`);
                                i.addSelection(t[0], t[1]), n && !n.classList.contains(Ac) && n.classList.add(Ac)
                            }
                        }), Gc(e, n, a, t), setTimeout(() => {
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
                        n.get().shown = !1, Rc(n, e, t, !1, i, a)
                    },
                    scroll(e) {
                        n.scrollPage(e, !0)
                    },
                    updateScroll() {
                        Object(r.M)("_im_create_wrap_safe", e), n.updateScroll()
                    },
                    selectElement(t) {
                        Kc(t, e, 0, i, n, a, n.getHoveredElement())
                    },
                    hoverPrevElement(e) {
                        n.hoverPrevElement(qc, null, Zc(e, a))
                    },
                    hoverNextElement(e) {
                        n.hoverNextElement(qc, null, Zc(e, a))
                    },
                    unmount() {
                        Object(o.c)(s), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
                    }
                }
            }(e, n, s, i, l, j, d, _)
        }

        function tl(e, t, n, a, i) {
            switch (t) {
                case m.b:
                    Object(r.ob)() || (a.scroll(i, "up"), cancelEvent(n));
                    break;
                case m.a:
                    Object(r.ob)() || (a.scroll(i, "down"), cancelEvent(n));
                    break;
                case m.v:
                    n.ctrlKey || Object(r.jb)(i) || (a.scroll(i, "up", !0), cancelEvent(n));
                    break;
                case m.u:
                    n.ctrlKey || Object(r.jb)(i) || (a.scroll(i, "down", !0), cancelEvent(n));
                    break;
                case m.o:
                    Object(r.ob)() || (a.scroll(i, "up", !1, !0), cancelEvent(n));
                    break;
                case m.d:
                    Object(r.ob)() || (a.scroll(i, "down", !1, !0), cancelEvent(n));
                    break;
                case m.w:
                    a.focustTxt(e)
            }
        }

        function nl(e, t, n, a, i, s) {
            var o = h({
                state: t || "default"
            });
            return {
                signal(t, c) {
                    if (!(cur.storyLayer || cur.articleEditorLayer || window.isArticleLayerOpen())) switch (o.get().state) {
                        case "default":
                            return tl(o, t, c, a, e);
                        case "fwd":
                        case "search":
                            return function(e, t, n, a, i, s) {
                                switch (t) {
                                    case m.a:
                                        a.hoverNextDialog(s), cancelEvent(n);
                                        break;
                                    case m.b:
                                        a.hoverPrevDialog(s), cancelEvent(n);
                                        break;
                                    case m.e:
                                        Object(r.ob)() && !gpeByClass("_im_dialogs_search_input", document.activeElement) || a.selectHoveredDialog(s);
                                        break;
                                    case m.w:
                                        i.focusInput(s)
                                }
                            }(0, t, c, n, i, e);
                        case "create":
                            return function(e, t, n, a, i) {
                                switch (t) {
                                    case m.v:
                                        !n.ctrlKey && Object(r.jb)(i) && (a.scroll("up"), cancelEvent(n));
                                        break;
                                    case m.u:
                                        !n.ctrlKey && Object(r.jb)(i) && (a.scroll("down"), cancelEvent(n));
                                        break;
                                    case m.a:
                                        a.hoverNextElement(i);
                                        break;
                                    case m.b:
                                        a.hoverPrevElement(i);
                                        break;
                                    case m.e:
                                        gpeByClass("_im_dialogs_creation_name", document.activeElement) ? a.confirmCreate(i) : gpeByClass("im-create--search", document.activeElement) && a.selectElement(i);
                                        break;
                                    case m.w:
                                        a.focusSearch(i)
                                }
                            }(0, t, c, s, e);
                        case "message":
                            return function(e, t, n, a, r) {
                                switch (t) {
                                    case m.o:
                                    case m.d:
                                        a.isEmpty(r) && tl(e, t, n, a, r);
                                        break;
                                    case m.v:
                                    case m.u:
                                        tl(e, t, n, a, r)
                                }
                            }(o, t, c, a, e);
                        default:
                            throw new Error("Unknown state: " + o.get().state)
                    }
                },
                transition: e => o.set(function(e, t) {
                    return t.state = e, Promise.resolve(t)
                }.bind(null, e))
            }
        }
        var al = n("BxOC"),
            rl = n("iN1s"),
            il = n("EUzL"),
            sl = 202,
            ol = 4,
            cl = 5,
            ll = 3e4,
            dl = {},
            ul = Date.now();

        function ml(e, t) {
            var n = Math.floor(t.status / 100);
            t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), dl[n] = dl[n] ? dl[n] + 1 : 1, Date.now() - ul >= ll && (Object.keys(dl).forEach(e => {
                statlogsValueEvent("im_longpoll", dl[e], e + "0x", t.getResponseHeader("x-frontend"))
            }), dl = {}, ul = Date.now()))
        }

        function pl({
            updates: e
        }) {
            return e.map(e => {
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

        function gl(e, t) {
            return Promise.resolve(extend({}, t, {
                timeout: e < 64 ? 2 * e : e
            }))
        }

        function hl(e, t) {
            return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
        }

        function _l(e) {
            return e.pauses || (e.pauses = []), Object(_.h)("Aborting all pauses", "error"), e.pauses.forEach(e => e()), e.pauses = [], Promise.resolve(e)
        }

        function bl(e, t, n, r) {
            var {
                abort: i,
                pause: s
            } = r.failed ? Object(it.a)(ol, e) : {};
            switch (r.failed) {
                case 1:
                    return Object(_.h)("Old timestamp, init resync", "error"), e.set(hl.bind(null, i)), n([c.Ib()]), e.set(a.ob).then(s).then(fl.bind(null, e, t, n));
                case 2:
                    return Object(_.h)("Key is incorrect", "error"), e.set(hl.bind(null, i)), e.set(a.nb).then(s).then(fl.bind(null, e, t, n));
                case 3:
                    throw Object(p.b)("im_longpoll_force_reload", r, !1), nav.reload({
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

        function fl(e, t, n) {
            if (e.get().stopped) return Promise.resolve({
                updates: []
            });
            if (t()) return Promise.reject(new Error("pause"));
            var a = e.get(),
                r = `${a.imUrl}/${a.imPart}`,
                {
                    request: i,
                    cancel: s
                } = Object(al.a)(r, {
                    act: "a_check",
                    key: a.imKey,
                    version: cl,
                    ts: a.imTs,
                    wait: 25,
                    mode: a.mode
                });
            return e.set(function(e, t) {
                return t.cancelToken = e, Promise.resolve(t)
            }.bind(null, s)).then(() => i).then(([t, n]) => (n && ml(a, n), e.set(gl.bind(null, 1)), JSON.parse(t))).catch(([e, t]) => {
                throw t && ml(a, t), ""
            }).then(bl.bind(null, e, t, n))
        }

        function vl({
            id: e,
            gid: t,
            key: n,
            ts: a,
            url: r,
            lhost: i,
            lpstat: s
        }) {
            var o = new EventEmitter,
                c = window.vk.lpConfig && window.vk.lpConfig.enabled && window.longpollTesting_onImEvents,
                l = hr(function(e, t) {
                    return c && window.longpollTesting_onImEvents(t), o.trigger("data", t), Promise.resolve({})
                }),
                {
                    pause: d,
                    resume: u,
                    pushMessage: m,
                    isPaused: p,
                    reset: g
                } = l,
                b = h({
                    id: e,
                    gid: t,
                    mode: sl,
                    timeout: 1,
                    imKey: n,
                    imTs: a,
                    imPart: r,
                    imUrl: i,
                    pause: !1,
                    stat: s
                });
            return function e(t, n, a) {
                t.get().stopped || (Object(_.h)("New request"), fl(t, a, n).then(pl).then(e => (Object(_.h)("Request success", "success"), e)).then(n).catch(e => {
                    if (!t.get().stopped) return Object(_.h)("Error, waiting: " + (e.message || "no message (probably browser reset)"), "error"), t.set(gl.bind(null, a() ? ol / 2 : t.get().timeout)).then(() => {
                        var {
                            abort: e,
                            pause: n
                        } = Object(it.a)(t.get().timeout, t);
                        return t.set(hl.bind(null, e)).then(n)
                    });
                    Object(_.h)("Stopped longpoll")
                }).then(e.bind(null, t, n, a)))
            }(b, m.bind(null, "main"), p.bind(null, "main")), {
                onData: e => o.on("data", e),
                offData: e => o.off("data", e),
                abortWaiting: () => b.set(_l),
                stop: function(e) {
                    e.set(e => Promise.resolve(extend({}, e, {
                        stopped: !0
                    }))).then(() => {
                        e.get().cancelToken()
                    })
                }.bind(null, b),
                pause: d.bind(null, "main"),
                resume: u.bind(null, "main"),
                reset: g.bind(null, "main"),
                push: e => o.trigger("data", e),
                isEnabled: () => !b.get().pause && !b.get().stopped
            }
        }
        var yl = n("1+Fu");

        function jl(e) {
            var t = e.get().tabbedPeers.map(t => e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]).filter(e => e).filter(e => !e.deletedDialog).map(({
                peerId: e
            }) => ({
                type: "peer",
                peer: e
            }));
            return t.length > 0 && (t = [{
                type: "sep"
            }].concat(t)), t
        }

        function Ol(e, t) {
            return e.pipeReplace(Promise.resolve(jl(t)))
        }

        function wl(e, t, n, a) {
            return {
                updateMenu(t) {
                    ! function(e, t) {
                        geByClass("_im_peer_tab", e).forEach(e => {
                            var n = q2ajx(attr(e, "href").split("?")[1]);
                            n.tab !== t.get().active_tab && attr(e, "href", `${Object(r.T)(t)}?sel=${n.sel}&tab=${t.get().active_tab}`)
                        })
                    }(e, t);
                    var a = gpeByClass("_im_right_menu", e);
                    Ol(n, t).then(() => {
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
                    Object(o.c)(a), n.unmount()
                }
            }
        }

        function kl(e, t, n) {
            var i = M(e, h({
                    limit: 50,
                    offset: 0,
                    noScroll: !0,
                    elements: jl(t)
                }), () => ({
                    idFn: e => e.peer || "000",
                    renderFn: function(e, t) {
                        if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
                        var n = `${Object(r.T)(e)}?sel=${t.peer}&tab=${e.get().active_tab}`,
                            a = Object(r.S)(t.peer, e),
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
                    }.bind(null, t)
                })),
                s = function(e, t, n, r) {
                    var i = gpeByClass("_im_peer_tab", r),
                        s = intval(domData(i, "list-id")),
                        o = e.get().tabbedPeers.filter(({
                            peer: e
                        }) => e !== s);
                    return e.set(a.ed.bind(null, o, !0)).then(() => {
                        if (Ol(t, e), s === e.get().peer) e.get().longpoll.push([Object(c.Hb)()]);
                        else if (0 !== e.get().peer) {
                            var n = gpeByClass("_im_right_menu", r);
                            uiRightMenu.hideSliding(n)
                        }
                    }), cancelEvent(n), !1
                }.bind(null, t, i),
                l = Object(o.a)({
                    handlers: (n, a) => {
                        a(e, "click", "_im_r_cl", s), a(e, "click", "_im_peer_tab", (e, n) => {
                            if (!checkEvent(e)) {
                                var a = intval(domData(n, "list-id"));
                                t.get().longpoll.push([Object(c.gb)(a, !1, !0, !0)]), cancelEvent(e)
                            }
                        }), m.g.forEach(a => {
                            n(geByClass1(`_ui_item_${a}`, e.parentNode), "mousedown", function(e, t, n) {
                                1 === n.which && (e.get().peer && e.get().longpoll.push([Object(c.Hb)()]), e.get().longpoll.push([Object(c.hb)(t)]), cancelEvent(n))
                            }.bind(null, t, a))
                        })
                    }
                });
            return wl(e, 0, i, l)
        }
        var Cl = 5e3,
            Sl = 54e6,
            El = 72e5;

        function Il(e) {
            var t = setInterval(function(e) {
                var t = e.get().tabs,
                    n = e.get().peer,
                    i = Object.keys(t).filter(t => Object(r.qb)(e, t) && intval(t) !== n).map(e => t[e]);
                i.filter(e => Date.now() - e.last_visited > Sl).forEach(t => e.set(a.u.bind(null, t.peerId))), i.filter(t => Object(r.qb)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > El).forEach(t => e.set(a.Cc.bind(null, t.peerId)))
            }.bind(null, e), Cl);
            return {
                unmount() {
                    clearInterval(t)
                }
            }
        }

        function xl(e) {
            return e.which || e.keyCode
        }

        function Tl(e, t, n, a) {
            var i = xl(a);
            if (!layers.visible) {
                if (i >= 49 && i <= 57 && (a.ctrlKey || a.metaKey && browser.mac) && Object(r.jb)(t)) return function(e, t) {
                    var n = e.get().tabbedPeers[t];
                    n && e.get().longpoll.push([Object(c.gb)(n.peer, !1, !0, !0)])
                }(t, i - 49), cancelEvent(a);
                inArray(i, m.A) && e.signal(i, a)
            }
        }

        function Ml(e, t) {
            var n = browser.mozilla ? "keydown" : "keypress",
                i = h({
                    signalTimer: !1
                }),
                s = function(e, t, n) {
                    !n || inArray(xl(n), m.z) || Object(a.Y)(e.get().peer, e.get()) || Object(r.ob)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
                }.bind(null, e, t),
                c = Tl.bind(null, t, e, i),
                l = function(e, t, n) {
                    xl(n) === m.e && e.signal(xl(n), n)
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

        function Ll(e, t) {
            return -1 === (e ? e.indexOf(t) : 0) && (e.push(t), !0)
        }

        function Pl(e, t) {
            var n = e ? e.indexOf(t) : -1;
            return -1 !== n && (e.splice(n, 1), !0)
        }

        function Bl(e, t, n, s, o, l) {
            var d = Object(i.u)(e, t);
            switch (n) {
                case c.t:
                case c.u:
                    return n === c.t ? Ll(d.adminIds, s) : Pl(d.adminIds, s), Dl(e, t, o), !0;
                case c.y:
                    return d.data.flags = s, Dl(e, t, o), !0;
                case c.B:
                    return delete d.pinHideId, cur.imDb.update(js.a, [d.peerId, void 0]), !1;
                case c.D:
                    return function(e, t, n) {
                        if (Object(r.Db)(n.get(), e)) {
                            var s = Object(i.u)(n, e);
                            Ll(s.memberIds, t) && s.membersCount++, -1 === s.data.active.indexOf(t) && s.data.active.push(t), t === vk.id && (s.data.kicked = 0, s.data.closed = 0)
                        }
                        return n.set(a.hb.bind(null, {
                            [e]: [t]
                        })).then(r => {
                            if (t === vk.id && n.get().peer === e) return Promise.all([n.set(a.Q.bind(null, e)), n.set(a.lb.bind(null, e))])
                        })
                    }(t, s, e).then(() => (Nl(e, t, o, l), o.fixKeyboard())), !0;
                case c.F:
                case c.E:
                    return function(e, t, n, s, o) {
                        if (Object(r.Db)(s.get(), e)) {
                            var c = Object(i.u)(s, e);
                            Pl(c.memberIds, t) && c.membersCount--, c.data.active = c.data.active.filter(e => e !== t), t === vk.id && (n ? c.data.kicked = 1 : c.data.closed = 1)
                        }
                        return t === vk.id && s.get().peer === e ? (o.cancelEditing(), s.set(a.Oc.bind(null, e))) : Promise.resolve()
                    }(t, s, n === c.E, e, o).then(() => Nl(e, t, o, l)), e.get().id !== s && (Object(i.k)(e, t) || {}).author_id !== s || e.set(a.z.bind(null, t)).then(() => o.fixKeyboard()), !0;
                case c.w:
                    return e.set(a.fb.bind(null, t)).then(() => o.updateBanner(e)), !0;
                case c.z:
                case c.A:
                    return !0;
                default:
                    return !1
            }
        }

        function Dl(e, t, n) {
            e.get().peer === t && (Object(a.oc)(e.get()), n.updateActions(e))
        }

        function Nl(e, t, n, r) {
            e.get().peer === t && (Object(a.oc)(e.get()), n.updateChat(e, t), r.updateDialog(t, e))
        }
        var ql = n("gF8j"),
            Al = 30,
            Hl = 400,
            Fl = 250,
            Rl = 32,
            $l = 5 * Rl + 24 + 52,
            Ul = 3 * Rl + 24,
            zl = 10,
            Kl = "._im_aside_notice";

        function Wl(e, t) {
            "spam" === t ? Object(r.yc)(e, pc, {}) : "fav" === t && Object(r.qc)(e, {}, Ko, {})
        }

        function Vl(e, t) {
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

        function Gl(e, t, n, i, s) {
            e.forEach(e => {
                switch (e.kludges.source_act) {
                    case r.d:
                    case r.e:
                        ! function(e, t, n, r) {
                            t.set(a.Rc.bind(null, e)).then(() => {
                                var a = e.kludges.source_act;
                                n.updateDialog(e.peerId, t), r.updateChatPhoto(e, a, t)
                            })
                        }(e, t, n, i)
                }
            })
        }

        function Xl(e, t) {
            var n = e.get().longpoll.push.bind(null, [c.Hb()]),
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

        function Ql(e) {
            var t = e.attaches.filter(e => "sticker" !== e.type);
            return Object(s.l)(e) || 0 === t.length
        }

        function Yl(e, t, n) {
            addClass(n, "im-page_history-show"), t.loadingPeer(e)
        }

        function Jl(e, t) {
            var n = function(e, t) {
                var n = document.querySelector(Kl),
                    a = Object(r.kb)(e) ? $l : Ul,
                    i = n ? n.offsetHeight : 0;
                return a += zl, a += i, Math.floor((t.offsetHeight - a) / Rl)
            }(e, t);
            if (e.get().tabbedPeers.length > n) {
                var i = e.get().tabbedPeers.filter(({
                        peer: t
                    }) => intval(t) !== e.get().peer).map(({
                        peer: t
                    }) => e.get().tabs[t]).sort((e, t) => t.last_touched - e.last_touched),
                    s = [];
                0 !== e.get().peer && s.push(e.get().tabs[e.get().peer]);
                var o = s.concat(i).slice(n).map(e => e.peerId),
                    c = e.get().tabbedPeers.filter(e => !inArray(e.peer, o));
                return e.set(a.ed.bind(null, c, !0))
            }
            return Promise.resolve(e)
        }

        function Zl() {
            for (var e = curBox(); e;) e.hide(), e = curBox()
        }

        function ed(e, t, n, s, o, c, l, d, u) {
            e.get().audio_msg.isRecording && e.set(a.l).then(() => {
                s.cancelRecording()
            }), AudioMessagePlayer.detachPlayer(), Object(i.y)(e) && s.cancelEditing(), Object(i.O)(e) && t.cancelSearch && (o.clearSearch(e), n.restoreDialogs(e), u().toggleSettingsButton(e, !1)), td(e, d, u), Yl(e, s, c);
            var m = e.get().peer;
            Object(a.ad)(e.get()), Object(a.id)(), Object(r.qb)(e, t.peerId) && (t.msgid && !Object(i.n)(e, t.peerId, t.msgid) || !t.msgid && !Object(i.n)(e, t.peerId, Object(i.u)(e, t.peerId).lastmsg) || Object(i.u)(e, t.peerId).skipped) && e.mutate(e => Object(i.R)(e, t.peerId));
            var g = e.set(a.p.bind(null, t.peerId, t.msgid, t.entryPoint)).then(e => {
                var n = e.get(),
                    r = a.sb.bind(null, t.peerId, !1, t.msgid, !1, n);
                return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(r)
            }).then(() => {
                n.selectPeer(t.msgid, e),
                    function(e, t) {
                        Object(r.zb)(e) && (cancelStackFilter("forward"), e.set(a.K.bind(null, e.get().pendingForward, Object(i.v)(Object(i.u)(e, t)), !1)))
                    }(e, e.get().peer), window.tooltips && tooltips.hideAll(), Zl(), s.preparePeer(e), Xl(e, s), Object(r.jb)(e) && (n.deactivate(), Jl(e, c).then(() => l.updateMenu(e)), Object(r.Mc)(e))
            });
            return (g = t.msgid ? g.then(() => e.set(a.kc.bind(null, t.peerId === m, m))) : g.then(() => e.set(a.jc.bind(null, !0)))).then(() => {
                if (e.get().peer === t.peerId) {
                    if (t.forward) {
                        var n = e.get().tabs[e.get().peer];
                        !n.scrollBottom && n.unread && e.set(a.Fb.bind(null, e.get().peer))
                    }
                    Object(r.jb)(e) && l.updateMenu(e), s.changePeer(e, !1), s.updateTyping(t.peerId, e), Object(a.ad)(e.get())
                }
            }).catch(e => Object(p.a)("applyNewPeer", e))
        }

        function td(e, t, n) {
            t && e.get().shown && (t.hide(e), n().createCanceled(e))
        }

        function nd(e, t, n) {
            Object(i.O)(e) && (t.clearSearch(e), n.restoreDialogs(e))
        }

        function ad(e, t, n, i, s, o, c) {
            Object(r.jb)(e) && (s.saveScroll(e), o.saveScroll(e)), i.rotateCross(e), addClass(c, "im-page_creating"), e.setState({
                isCreating: !0
            }), n && n.show(e, t), Object(r.jb)(e) && (setStyle(c, {
                height: cd(c, e).page
            }), setTimeout(function() {
                addClass(c, "im-page_cropped")
            }, 200)), Object(a.Ic)(!0)
        }

        function rd(e, t, n, a) {
            Object(r.Db)(e.get(), a) && (t.updateTyping(a, e), n.updateTyping(a, e))
        }

        function id(e, t, n, i, s) {
            i.activityType || (i.activityType = s);
            var o = e => rd(e, t, n, i.peerId);
            Object(r.Cb)(i.peerId, e.get().gid) || (e.set(a.pc.bind(null, i, s)).then(o), e.set(a.jd.bind(null, i, s)).then(o))
        }

        function sd(e, t) {
            t ? e.classList.add("im-page_reconnecting") : e.classList.remove("im-page_reconnecting")
        }

        function od(e, t, n, l, d, u, p, g, h, _, b, f, v, y, j, O, w, k, C, S, E) {
            return {
                changePeer(e, n) {
                    t.selectPeer(e, n)
                },
                cancelSearch(e) {
                    nd(e, l, t)
                },
                loadingPeer(e) {
                    Yl(e, n, d)
                },
                restoreDialogs(e, n, a) {
                    t.restoreDialogs(e, n, a)
                },
                toggleSettingsButton(e, t) {
                    b.toggleButton(e, t)
                },
                focusSearch(e) {
                    l.focusInput(e)
                },
                appendSearch(e, n, a, r) {
                    t.appendSearch(e, n, a, r)
                },
                appendDialogs(e, n) {
                    t.appendDialogs(e, n)
                },
                showCreation(e, a) {
                    ad(e, a, _, l, t, n, d)
                },
                updateState(e, a) {
                    t.updateDialog(e, a), a.get().peer === e && n.updateChat(a, e)
                },
                appendFastDialogs(e, n) {
                    t.appendFastDialogs(e, n, !0)
                },
                createCanceled(e, a) {
                    l.createCanceled(e, a), Object(r.jb)(e) ? (setStyle(d, {
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
                    Object(i.O)(e) && l.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), _ && _.hide(e), Object(r.kb)(e) && Vl(e, d), Object(r.jb)(e) && (e.get().tabbedPeers.forEach(({
                        peer: t
                    }) => {
                        O.updateCounter(e, t), O.updateName(t, e)
                    }), Object(r.Mc)(e)), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), Object(r.Ab)(e.get().peer) || n.changePeer(e, !1);
                    var a = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                    handlePageCount(a, e.get().unread_cnt)
                },
                toggleSettingsLoader(e, t) {
                    b.toggleLoader(e, t)
                },
                onUserActions(e, t) {
                    if (!Object(a.Y)(e.get().peer, e.get())) {
                        var s = e.get(),
                            o = s.peer;
                        if (Object(r.qb)(s, o))
                            if (!u.is_idle)
                                if (Object(i.b)(e.get().peer, e.get()) > 0) !s.tabs[o].skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(a.Fb.bind(null, o)))
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
                                var p = s.sel ? Object(r.Jc)(s.sel) : 0,
                                    g = o.back;
                                0 === p ? f.get().longpoll.push([c.Hb(!1, g)]) : p !== f.get().peer && f.get().longpoll.push([c.gb(p, s.msgid || !1)]);
                                break;
                            case "invite_chat_id":
                            case "invite_hash":
                                ! function(e) {
                                    e.set(a.db)
                                }(f);
                                break;
                            case "tab":
                                td(f, _, h), u = !0;
                                var b = s.tab || m.h;
                                f.get().longpoll.push([c.hb(b)]);
                                break;
                            case "act":
                                s.act && "create" === s.act ? ad(f, [], _, l, t, n, d) : function(e, t, n, a) {
                                    n && n.hide(e, t)
                                }(f, [], _);
                                break;
                            case "st":
                                s.st && s.sel ? (curBox() && curBox().hide(), f.mutate(a.vc.bind(null, unescape(s.st), s.sel)), n.startSearch(f)) : (f.mutate(a.m.bind(null, i.sel)), n.cancelSearch(f, !0));
                                break;
                            case "q":
                                s.q ? (curBox() && curBox().hide(), l.setSearch(f, s.q, !0)) : l.clearSearch(f);
                                break;
                            case "box":
                                Wl(f, s.box)
                        }
                    }), Object(r.jb)(f) && void 0 === e.sel && O.updateMenu(f), u && nd(f, l, t), !1)
                },
                updateDialogFilters(e) {
                    Object(i.O)(e) || t.restoreDialogs(e), b.updateFilter(e)
                },
                removePeer(e, n) {
                    t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([c.Hb()]), Object(r.jb)(e) && O.updateMenu(e)
                },
                newMessage(e) {
                    Object(r.jb)(e) || t.scrollUp(!0)
                },
                onEvents(e, o) {
                    var u = function(e) {
                            for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== c.bb || t ? e[n].type === c.bb && e.splice(n, 1) : t = !0;
                            return e
                        }(o.filter(e => e.type !== c.a || !(e.flags & c.o))),
                        f = o.filter(s.l),
                        y = o.filter(e => e.type === c.a);
                    Gl(f, e, t, n);
                    var j = Object(a.s)(f, y, e),
                        w = Promise.resolve();
                    j.shouldLoad && (w = e.set(a.rb.bind(null, j, p))), w.then(() => {
                        u.forEach(o => {
                            switch (o.type) {
                                case c.a:
                                    var u = Object(i.u)(e, o.peerId),
                                        p = !u || !u.msgs || 0 == u.msgs.length,
                                        f = Object(r.nb)(o, e.get()),
                                        y = Object(i.B)(e, o.peerId);
                                    if (!e.get().isIncomingMessageRequestsAllowed && Object(i.U)(u)) break;
                                    var j = null;
                                    if (o.kludges.keyboard) {
                                        var w = Object.assign(o.kludges.keyboard, {
                                            author_id: o.userId
                                        });
                                        j = e.set(a.wc.bind(null, o.peerId, w))
                                    } else {
                                        var k = Object(i.k)(e, o.peerId);
                                        k && k.one_time && k.author_id !== Object(s.a)(e, o) && (j = e.set(a.z.bind(null, o.peerId)))
                                    }
                                    if (o.peerId === Object(i.p)(e) && j && j.then(() => n.fixKeyboard()), 0 === f) e.set(a.h.bind(null, o)), Jl(e, d),
                                        function(e, t) {
                                            var n = e.get().tabs[t.peerId],
                                                r = e.get().active_tab;
                                            return r === m.h || Object(a.H)(r)(n)
                                        }(e, o) && (Object(i.U)(u) || (o.flags & c.m || e.set(a.Tc.bind(null, o.peerId, !0)), function(e, t) {
                                            var n = t.flags & c.m,
                                                a = inArray(t.peerId, e.get().mutedPeers),
                                                i = t.flags & c.j,
                                                s = e.get().gid;
                                            if (!n && !a && !i) {
                                                var o, l, d = function(e, t) {
                                                        return t < 2e9 && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
                                                    }(t.subject, t.peerId) || "",
                                                    u = (d ? d + " " : "") + t.text || "",
                                                    m = t.userId,
                                                    p = t.peerId,
                                                    g = e.get().tabs[p];
                                                if (t.kludges && t.kludges.source_act && (u = stripHTML(Object(r.dc)(e, t, g, !1))), (!e.get().notify_msg && !Object(r.ib)(p) || s && !e.get().mute) && window.Notifier && Notifier.playSound({
                                                        author_id: p
                                                    }), !Object(r.ib)(p)) return;
                                                u = trim(replaceEntities(stripHTML(u.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), u = Object(Os.f)(u, (e, t, n, a, r) => r), Object(r.ib)(p) ? (o = Object(P.c)(e, m).name, g.tab && (o += " » " + g.tab), l = Object(P.c)(e, m).photo) : (o = g.tab, l = g.photo);
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
                                        }(e, o)), t.updateTyping(o.peerId, e), Object(i.O)(e) ? t.updateDialog(o.peerId, e) : t.promoteDialog(e, o.peerId)), !1 === Object(i.B)(e, o.peerId) && !0 === y && n.updateActions(e), Object(r.jb)(e) && (O.updateCounter(e, o.peerId), O.updateMenu(e)), e.set(a.Pc.bind(null, o)).then(rd.bind(null, e, n, t, o.peerId)), n.addMessage(e, o), Object(r.jb)(e) || b.updateFilter(e), Ql(o) || !Object(r.qb)(e, o.peerId) || o.local || e.set(a.pb.bind(null, o)).then(e => {
                                            n.replaceAttachmentPlaceholders(e, o), Object(a.id)()
                                        }), Object(be.m)(e, o, "send", "opt_to_lp");
                                    else 2 === f ? (Ql(o) || e.set(a.pb.bind(null, o)).then(e => {
                                        n.replaceAttachmentPlaceholders(e, o)
                                    }), e.set(a.Pb.bind(null, o)), n.replaceMessageAttrs(o, e), t.updateDialog(o.peerId, e), o.randomId && Object(be.l)(e, o, "send", "opt_to_lp")) : Object(i.O)(e) || t.promoteDialog(e, o.peerId);
                                    Object(i.U)(u) && Object(r.E)(e, t.update), u && p && u.peerId === Object(i.p)(e) && S();
                                    break;
                                case c.g:
                                case c.R:
                                    e.set(a.F.bind(null, o)).then(e => {
                                        t.updateDialog(o.peerId, e), n.updateTyping(o.peerId, e), n.editMessage(e, o), Ql(o) || !Object(r.qb)(e, o.peerId) || o.local || e.set(a.pb.bind(null, o)).then(e => {
                                            n.replaceAttachmentPlaceholders(e, o)
                                        })
                                    });
                                    break;
                                case c.J:
                                    e.set(a.wb.bind(null, o)).then(e => {
                                        t.updateCounter(e, o.peerId), n.updateGoToEnd(e, !0), Object(r.jb)(e) && O.updateCounter(e, o.peerId), Object(i.O)(e) || t.restoreDialogs(e), b.updateFilter(e)
                                    });
                                    break;
                                case c.K:
                                    e.set(a.xb.bind(null, o)).then(e => {
                                        t.updateCounter(e, o.peerId), n.markMessagesAsRead(e, o)
                                    });
                                    break;
                                case c.bb:
                                    e.set(a.gd.bind(null, o.count)).then(() => {
                                        var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                        handlePageCount(t, o.count), b.updateFilter(e), Object(r.jb)(e) && Vl(e, d)
                                    });
                                    break;
                                case c.s:
                                case c.r:
                                    var C = o.type === c.s;
                                    e.set(a.cd.bind(null, o.userId, !!C && o.platform, o.lastSeenTs)).then(e => {
                                        Object(r.Db)(e.get(), o.userId) && (t.updateOnline(o.userId, e), n.updateOnline(o.userId, e))
                                    });
                                    break;
                                case c.Y:
                                case c.Q:
                                case c.U:
                                    if (!(o.flags & c.j || o.flags & c.n) || o.type !== c.Y || Object(r.gb)(e, o.peerId, o.messageId) || e.get().blockedFlagUpdates[o.peerId] || g(o), o.flags === c.l) {
                                        var E = o.type === c.Y;
                                        e.set(a.Zc.bind(null, E ? 1 : -1, o.messageId)).then(() => {
                                            Object(r.jb)(e) || l.updateImportantCnt(e)
                                        }), e.set(a.Uc.bind(null, [o.messageId], o.peerId, E)).then(() => {
                                            n.markImportant(o.messageId, E, e)
                                        })
                                    }
                                    break;
                                case c.N:
                                    id(e, n, t, o, a.c);
                                    break;
                                case c.ab:
                                    id(e, n, t, o, a.d);
                                    break;
                                case c.I:
                                    ! function(e, t, n, r) {
                                        e.set(a.yc.bind(null, n, r)).then(t().updateState.bind(null, n))
                                    }(e, h, o.peerId, 0 !== o.disabledUntil);
                                    break;
                                case c.W:
                                    e.get().longpoll.pause(), e.set(a.Yb).then(h().resync).then(() => e.get().longpoll.resume());
                                    break;
                                case c.Z:
                                    v.transition(o.state);
                                    break;
                                case c.V:
                                    if (o.removeActivePeer) {
                                        var I = e.get().tabbedPeers.filter(({
                                            peer: t,
                                            type: n
                                        }) => t !== e.get().peer && "perm" === n);
                                        e.setState({
                                            tabbedPeers: I
                                        })
                                    }! function(e, t, n, s) {
                                        e.set(a.l).then(() => {
                                            n.cancelRecording()
                                        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(s, "im-page_history-show"), n.stopLoading(), Object(i.y)(e) && n.cancelEditing();
                                        var o = e.get().peer;
                                        e.set(a.p.bind(null, 0, !1, !1)).then(() => {
                                            window.tooltips && window.tooltips.hideAll(), Zl(), Object(r.jb)(e) && t.activate(), n.changePeer(e), Object(r.jb)(e) && t.restoreScroll(e), setTimeout(() => {
                                                e.get().longpoll.push([c.Lb("search")])
                                            }, 13), Object(r.tb)(e) && Object(r.yb)(o, e) && e.set(a.Hb.bind(null, o))
                                        })
                                    }(e, t, n, d), o.cancelSearch && nd(e, l, t), Object(r.jb)(e) && O.updateMenu(e), l.focusInput(e);
                                    break;
                                case c.c:
                                    Object(r.C)(o.tab, e, h, a.o).then(e => {
                                        b.updateFilter(e)
                                    });
                                    break;
                                case c.T:
                                case c.X:
                                case c.P:
                                    if (o.mask === c.p) break;
                                    e.set(a.Wc.bind(null, o.peerId, o.mask, o.type, o.local)).then(e => {
                                        Object(i.O)(e) || o.type === c.T && o.mask === c.q || o.type === c.P || t.restoreDialogs(e), t.updateDialog(o.peerId, e), Vl(e, d), e.get().peer === o.peerId && n.changedMessageSelection(e)
                                    });
                                    break;
                                case c.f:
                                    e.set(a.B.bind(null, o.peerId, Promise.resolve([]))).then(() => {
                                        h().removePeer(e, o.peerId), h().updateDialogFilters(e)
                                    });
                                    break;
                                case c.b:
                                    ed(e, o, t, n, l, d, O, _, h);
                                    break;
                                case c.H:
                                    var x = {
                                            [o.peerId]: o
                                        },
                                        T = Object(r.xb)(o.peerId, e);
                                    e.set(a.Qc.bind(null, x)).then(() => {
                                        t.updateDialog(o.peerId, e);
                                        var a = Object(r.xb)(o.peerId, e);
                                        Object(r.qb)(e.get(), o.peerId) && T !== a && n.updateChat(e, o.peerId)
                                    });
                                    break;
                                case c.i:
                                    e.set(a.xc.bind(null, o.peer, o.message)).then(() => {
                                        n.setMessageErrored(o.peer, o.message, o.error, e), t.setDialogFailed(o.peer, o.message.messageId, e)
                                    });
                                    break;
                                case c.S:
                                    var M = o.message.messageId;
                                    e.set(a.Qb.bind(null, o.peerId, M, o.message)).then(() => {
                                        n.resendMessage(o.peerId, M), t.promoteDialog(e, o.peerId)
                                    });
                                    break;
                                case c.e:
                                    if (Object(r.Db)(e.get(), o.peerId)) Bl(e, o.peerId, o.updateType, o.updateArg, n, t) || h().reloadChatInfo(o.peerId);
                                    Object(i.I)(o) && e.set(a.bd.bind(null, o)).then(() => {
                                        Object(r.Mc)(e), Object(r.E)(e, t.update)
                                    });
                                    break;
                                case c.db:
                                    setTimeout(() => {
                                        sd(d, !0), n.setNetworkWaitingStatus(o.timeout - 1)
                                    }, 1e3);
                                    break;
                                case c.M:
                                    sd(d, !0), n.setNetworkReconnectingStatus();
                                    break;
                                case c.L:
                                    sd(d, !1), setTimeout(n.clearNetworkStatus, 0)
                            }
                        })
                    })
                },
                updateHistory: e => n.updateHistory(e),
                reloadChatInfo(e) {
                    Object(r.Db)(f.get(), e) && f.set(a.gb.bind(null, e)).then(() => (function(e, t, n, i, s) {
                        i.updateChatTopic(t, e), Object(r.jb)(e) && s.updateName(t, e), e.get().peer == t && (Object(a.oc)(e.get()), i.updateActions(e))
                    })(f, e, 0, n, O))
                },
                cancelRecording: () => f.set(a.l).then(() => n.cancelRecording()),
                fixHeight() {
                    S()
                },
                unmount() {
                    Object(o.c)(e), clearInterval(f.get().update_title_to), u.stop(), E(), t.unmount();
                    var i = window.devicePixelRatio >= 2 ? "_2x" : "";
                    setFavIcon("/images/icons/favicons/fav_logo" + i + ".ico"), n.unmount(), l.unmount(), cancelStackFilter("im_peer"), b.unmount(), _ && _.unmount(), O && O.unmount(), w && w(), y && y(), Object(r.tb)(f) && f.get().peer && f.set(a.Hb.bind(null, f.get().peer)), k.unmount(), O && O.unmount(), C.unmount(), clearInterval(j), cur.imDb.unmount(), cur.imDb = !1
                }
            }
        }

        function cd(e, t) {
            var n = ge("page_header"),
                a = geByClass1("_im_page_history", e),
                i = window.clientHeight() - n.offsetHeight - Al - 2,
                s = Object(r.jb)(t) ? Fl : Hl,
                o = {
                    page: Math.max(i, s)
                };
            if (Object(r.jb)(t)) {
                var c = Object(r.V)();
                c = c > 0 ? Math.min(c - n.offsetHeight - Al - 2, i) : i;
                var l = hasClass(a, "im-page--history_empty-hist") ? c : i;
                o.history = Math.max(c, s), o.chat = Math.max(l, s)
            }
            return o
        }

        function ld(e, t, n, i, s, o = !0, c = !1) {
            if (!isFullScreen()) {
                var l = cd(e, t);
                if (setStyle(e, {
                        minHeight: l.page
                    }), Object(r.jb)(t) && (void 0 === t.get().chatResizeInitialized && t.set(a.U), setStyle(e, {
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
                o && setTimeout(() => ld(e, t, n, i, s, !1), 100)
            }
        }

        function dd() {
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

        function ud(e, t) {
            var n, s = t.get(),
                l = window.devicePixelRatio >= 2 ? "_2x" : "";
            setFavIcon("/images/icons/favicons/fav_im" + l + ".ico"), ld(e, t, !1, !1, !1, !0), show(e), Object(be.c)();
            var {
                callMutations: d,
                bindMutations: u
            } = Object(o.b)(od), m = s.useFcLongpoll && vk.lpConfig.enabled && Notifier.getLpInstance && Notifier.getLpInstance(), g = m ? Notifier.getLpInstance() : t.get().gid ? function(e) {
                Object(p.b)("im_start_longpoll_group", {}, !1);
                var t = Object(il.a)(e.ts, e => {
                        a.trigger("data", e)
                    }),
                    n = Object(rl.a)(e, t.onLp),
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
            }(s.lpConfig) : vl(s);

            function h(...e) {
                d().onEvents(t, e)
            }
            g.onData(h), m && Object(p.b)("im_use_fc_longpoll", {}, !1);
            var f, v, y = geByClass1("_im_dialogs_search", e),
                j = geByClass1("_im_dialogs_settings", e),
                O = _e(geByClass1("_im_page_dcontent", e), t, d),
                w = sc(y, t, d),
                k = vc(j, t, d),
                C = Il(t);
            (cur.imDb = Object(js.c)(t.get().gid ? -t.get().gid : vk.id), t.set(a.Bb.bind(null, cur.imDb)), Object(r.jb)(t) && k.updateSettings(t), Object(r.jb)(t)) && (f = kl(geByClass1("_im_ui_peers_list", e.parentNode), t), v = function(e, t, n, a) {
                if (browser.mobile) return !1;
                var r = [t, n, geByClass1("_im_chat_input_w", a), geByClass1("_im_dialog_actions", a)],
                    i = null,
                    s = hasClass(e, "im-page--header_static"),
                    o = ge("im-group-online-disabled-notice");

                function c() {
                    var t = Object(b.b)("scrollLeft"),
                        n = hasClass(e, "im-page--header_static"),
                        a = [];
                    i !== t ? a = r.slice().concat([e]) : n !== s && (a = [e]), i = t, s = n, a.length > 0 && a.forEach(a => {
                        var r = e === a && n ? 0 : -t;
                        setStyle(a, {
                            [cssTransformProp]: 0 === r ? "unset" : "translateX(" + r + "px)"
                        })
                    })
                }
                return o && r.push(o), r = r.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", c), c(), () => {
                    removeEvent(window, "scroll", c)
                }
            }(y, j, geByClass1("_im_right_menu", e.parentNode), e));
            Object(r.jb)(t) && s.peer && O.deactivate(), s.gid || (n = el(geByClass1("_im_dialogs_creation", e), t, d));
            var S = Ho(geByClass1("_im_page_history", e), t, O, f, d),
                E = s.isCreating,
                I = E ? "create" : 0 === s.peer ? "search" : "default";
            E && n.show(t, []);
            var x = nl(t, I, O, S, w, n),
                T = Ml(t, x);
            S.updateScroll();
            var M = function(e, t, n, i) {
                var s = t.get();
                Object(r.Ab)(s.peer) || e().onUserActions(t, i), s.update_old_title && t.set(a.Tc.bind(null, !1, !1))
            }.bind(null, d, t, x);
            Object(r.Ab)(s.peer) || setTimeout(() => Xl(t, S), 10);
            var L = new ql.a({
                    id: "im",
                    element: document,
                    focusElement: window,
                    triggerEvents: "mouseover mousedown keypress"
                }),
                P = debounce(dd, 300),
                B = ld.bind(null, e, t, S, O, n, !1, P);
            t.setState({
                longpoll: g
            }), t.set(a.uc.bind(null, [])), L.on("unidle", function() {
                g.abortWaiting(), M()
            }), L.start(), nav.objLoc.box && (Wl(t, nav.objLoc.box), Object(ys.b)({
                box: null
            }));
            var D, N = function(e) {
                var t = e.get();
                if (!Object(r.tb)(e)) return null;
                var {
                    stop: n
                } = Object(yl.a)(t.mutex_key, function(e) {
                    t.longpoll.push([c.sb(e)])
                }, function(e, n) {
                    return Object(a.O)(t.gid).then(([e]) => e)
                });
                return n
            }(t);
            if (Object(r.tb)(t) && (D = setInterval(r.z.bind(null, t, s.longpoll), 2e3)), t.get().invitation && Object(r.sc)(t, t.get().invitation, a.db), Object(r.jb)(t) && Object(i.d)(t)) {
                var q = document.getElementById("ui_rmenu_mr");
                q && q.classList.remove("unshown")
            }
            var A = Object(_.n)(function(e, t, n, r, s) {
                    var o = s.reduce((e, t) => (e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e), {});
                    Object.keys(o).forEach(s => {
                        var c = o[s];
                        e.set(a.Mb.bind(null, c, s)).then(() => e.set(a.Nb.bind(null, c, s))).then(() => t.removeMessages(c, +s, e)).then(() => {
                            var o = Object(i.u)(e, s);
                            o && c.some(e => e >= o.lastmsg) && Object(a.eb)(e, +s).then(() => {
                                n.promoteDialog(e, s), r && r.updateCounter(e, s), t.updateGoToEnd(e, !0)
                            })
                        })
                    })
                }.bind(null, t, S, O, f), 200),
                H = r.db.bind(null, t),
                F = r.bb.bind(null, t);
            return u(Object(o.a)({
                handlers: (t, n) => {
                    t(document, "mousemove mousedown keypress", M), t(window, "resize", B), n(e, "click", r.o, H), n(gpeByClass("_im-page-wrap", e), "click", r.m, F), n(gpeByClass("_im-page-wrap", e), "click", r.n, r.cb), n(gpeByClass("_im-page-wrap", e), "click", r.p, r.eb), browser.safari && t(document, "visibilitychange", dd)
                }
            }), O, S, w, e, L, g, A, d, n, k, t, x, N, D, f, v, C, T, B, function() {
                m ? g.offData(h) : g.stop()
            })
        }
        var md, pd, {
                nav: gd,
                setStyle: hd,
                getLang: _d
            } = window,
            bd = "._im_sick_reload",
            fd = "._im_sick_timer",
            vd = 5e3,
            yd = 6e5,
            jd = 30,
            Od = 400;

        function wd(e) {
            var t = ge("page_header"),
                n = window.clientHeight() - t.offsetHeight - jd - 2,
                a = Od;
            hd(e, {
                height: Math.max(n, a)
            })
        }

        function kd(e) {
            var t = Object(r.O)(Math.floor(Math.max(e, 0) / 1e3), !0);
            return t ? _d("mail_sick_timer").replace(/{timer}/gi, t) : ""
        }

        function Cd() {
            gd.reload({
                force: !0
            })
        }

        function Sd(e) {
            return {
                unmount() {
                    clearInterval(pd), clearTimeout(md), Object(o.c)(e)
                }
            }
        }

        function Ed(e, t, n) {
            wd(e);
            var {
                bindMutations: a
            } = Object(o.b)(Sd), r = a(Object(o.a)({
                handlers: (t, n) => {
                    t(e.querySelector(bd), "click", Cd), t(window, "resize", wd.bind(null, e))
                }
            })), i = function() {
                var e = localStorage.getItem("im_sick_timer"),
                    t = e ? Math.min(2 * parseInt(e), yd) : vd;
                return localStorage.setItem("im_sick_timer", t), t
            }(), s = e.querySelector(fd), c = +new Date;
            return s.innerHTML = kd(i), pd = setInterval(() => {
                s.innerHTML = kd(c + i - new Date)
            }, 500), md = setTimeout(Cd, i), r
        }
        var Id = n("E2g8"),
            xd = n("f4YT"),
            Td = Id.Promise;
        window.IM = {
            init(e) {
                if (window.imwl = e.imwl, Object(p.d)(), addTemplates(xd), window.Promise || (window.Promise = Td), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.failed) return Ed(geByClass1("im-sick", ge("page_body")));
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
                i.forEach(e => Object(P.a)(s, e)), i = void 0, Object(r.Nb)(s, s.get().tabs), cur.imClassicInterface = Object(r.jb)(s);
                var o = ud(geByClass1("js-im-page", ge("page_body")), s);
                Object(a.ad)(s.get()), window.IMBRIDGE = {
                    chatPhotoSaved(e) {
                        curBox() && curBox().hide();
                        var t = (e || {})[1];
                        return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || s.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                    },
                    updateHistory(e) {
                        s.set(a.Yc.bind(null, e)).then(() => {
                            o.updateHistory(e)
                        })
                    },
                    syncHistory(e) {
                        isFunction(e) || (e = function() {}), s.set(a.Dc.bind(null, e)).then(() => {
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
            return s
        });
        n("rGqo"), n("Btvt");
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
        class s extends a.Component {
            constructor(e) {
                super(e), this.getRef = (e => {
                    this.element = e
                }), this.resize = (() => {
                    var e = this.element;
                    if (e) {
                        var {
                            offsetHeight: t,
                            scrollHeight: n
                        } = e, a = 0;
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
                    {
                        className: t,
                        style: n,
                        value: s
                    } = e,
                    o = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["className", "initialValue", "grow", "style", "onResize", "value"]),
                    c = this.isControlledOutside ? s : this.state.value,
                    l = this.state.height || n.height || 66;
                return a.createElement("textarea", i({}, o, {
                    value: c,
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    ref: this.getRef,
                    style: Object.assign({
                        height: l
                    }, n),
                    className: Object(r.a)("Textarea", t)
                }))
            }
        }
        s.defaultProps = {
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
        var a = n("f01n"),
            r = n("aong");

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
            return e.flags & a.m
        }

        function l(e) {
            var t = e.attaches.filter(e => "mail" === e.type).length > 0;
            return e.attaches.filter(e => "reply" === e.type).length > 0 || e.flags & a.k && t
        }

        function d(e, t, n = null) {
            var a = e.attaches[0];
            return a && (a.type === t || a.type === n)
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
            return e.flags & a.l
        }

        function v(e) {
            return c(e) ? vk.id : e.userId
        }

        function y(e, t) {
            var n = Object(r.q)(e);
            return c(t) ? n.id : t.userId
        }

        function j(e) {
            return e.update_time > 0
        }
    },
    NsuH: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR")),
            i = n("BN/X"),
            s = "/images/camera_c.gif";
        class o extends a.PureComponent {
            constructor(e) {
                super(e), this.onError = (() => {
                    this.setState({
                        errored: !0
                    })
                }), this.state = {}
            }
            getPhotoImage() {
                var {
                    size: e,
                    photo: t,
                    title: n
                } = this.props;
                return a.createElement("img", {
                    width: e,
                    height: e,
                    src: this.state.errored ? s : t,
                    alt: n,
                    onError: this.onError,
                    className: "Entity__photo"
                })
            }
            render() {
                var {
                    className: e,
                    style: t,
                    size: n,
                    photo: s,
                    href: o,
                    title: c,
                    description: l,
                    target: d
                } = this.props, u = {
                    [`Entity--size${n}`]: !!n
                };
                return a.createElement("div", {
                    className: Object(r.a)("Entity", e, u),
                    style: t
                }, a.createElement("div", {
                    className: "Entity__aside"
                }, "string" == typeof s ? o ? a.createElement("a", {
                    href: o
                }, this.getPhotoImage()) : this.getPhotoImage() : s), a.createElement("div", {
                    className: "Entity__main"
                }, c && o ? a.createElement("div", {
                    className: "Entity__title"
                }, a.createElement(i.a, {
                    href: o,
                    dangerouslySetInnerHTML: {
                        __html: c
                    },
                    target: d
                })) : a.createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: c
                    }
                }), "string" != typeof l ? a.createElement("div", {
                    className: "Entity__description"
                }, l) : a.createElement("div", {
                    className: "Entity__description",
                    dangerouslySetInnerHTML: {
                        __html: l
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
        var a = n("1y80"),
            r = n("aong"),
            i = {};

        function s(e) {
            Object(a.b)(.1, "im_forward_stat", d(e), !!e.get().gid)
        }

        function o(e, t) {
            Object(a.b)(.1, "im_forward_from_community_stat", d(e), !!e.get().gid, +t)
        }

        function c() {
            Object(a.b)(1, "im_apply_community_template_stat", 1)
        }

        function l() {
            Object(a.b)(1, "messages_channel_forward_click", 1)
        }

        function d(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function u(e, t, n, r = !1) {
            if (!Object(a.a)(1)) return () => {};
            var i = +new Date,
                s = h(e);
            return function() {
                var e = +new Date - i;
                Object(a.c)("messages_send_time_web", e, t, n, s, r)
            }
        }

        function m(e, t, n, a) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var r = [t.messageId.replace("rid", ""), n, a].join("_"),
                    s = t.attaches.length > 0;
                i[r] = u(e, n, a, s)
            }
        }

        function p(e, t, n, a) {
            var r = [t.randomId, n, a].join("_"),
                s = i[r];
            s && (s(), delete i[r])
        }

        function g(e, t, n, r) {
            var i = h(e),
                s = "" === t ? "network" : "unknown";
            Object(a.a)(1) && Object(a.c)("messages_send_errors_web", s, n, r, i)
        }

        function h(e) {
            var t = Object(r.q)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function _(e) {
            var t = Object(r.q)(e),
                n = t.imQueue(t.peer).length;
            Object(a.a)(1) && Object(a.c)("messages_send_queue_size", n)
        }

        function b(e, t = "unknown") {
            Object(a.a)(1) && Object(a.c)("messages_send_retry", 1, t, e)
        }

        function f() {
            var e = "im_browser_notifications_users";
            ls.get(e) || ls.get("im_ui_notify_off") || (ls.set(e, 1), Object(a.c)(e, 1))
        }

        function v() {
            Object(a.b)(1, "im_browser_notifications_on", 1)
        }

        function y() {
            Object(a.b)(1, "im_browser_notifications_off", 1)
        }
    },
    "P+eJ": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return r
        }), n.d(t, "a", function() {
            return u
        });
        var a = n("ERyv");

        function r(e, t, ...n) {
            if (window.vk.lpConfig.debug) {
                var a = `background: ${e}; color: white`,
                    r = new Date,
                    i = e => e < 10 ? "0" + e : e;
                console.log(`%c ${r.getHours()}:${i(r.getMinutes())}:${i(r.getSeconds())}:${r.getMilliseconds()} ${t} `, a, ...n)
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
            window.lpWeird.length && (Object(a.b)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function l() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function d() {
            l() && (s().forEach(e => {
                    !i().find(t => e.ev === t.ev) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, r("red", "im not fc", e.ev), Object(a.c)() && o("im not fc", e.ev))
                }), i().forEach(e => {
                    var t = s().find(t => t.ev === e.ev);
                    t && t.warned && !e.warned && (e.warned = !0, r("red", "now fc like im", e.ev), Object(a.c)() && o("now fc like im", e.ev))
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
            }))), setTimeout(d, 0)), r("green", "fc", ...e)
        }
        window.longpollTesting_onImEvents = function(e) {
            l() && (s().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 1100)), r("blue", "im", ...e)
        }
    },
    P13b: function(e, t, n) {
        "use strict";
        n("Vd3H"), n("rGqo"), n("a1Th"), n("tUrg"), n("pIFo"), n("KKXr"), n("Btvt");
        var a = n("f01n"),
            r = n("h++7"),
            i = n("nyd8"),
            s = n("rHUl"),
            o = n("MhhX"),
            c = n("p3re"),
            l = n("eTng"),
            d = n("vT4u"),
            u = n("N1NS"),
            m = "_im_join_chat";

        function p(e, t) {
            var n = Object(u.a)({
                handlers: (n, r) => {
                    r(e, "click", m, e => (function(e, t) {
                        var n = domData(t, "chat-id"),
                            r = domData(t, "hash");
                        return lockButton(t), Object(d.Z)(n, r, e.get()).then(([n]) => {
                            unlockButton(t), e.get().longpoll.push([Object(a.gb)(n)])
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
        var g = n("aong"),
            h = n("86+7"),
            _ = n("Wu9C"),
            b = n("wSs/"),
            f = n("ERyv"),
            v = n("lJdi"),
            y = n("t7n3");
        n.d(t, "t", function() {
            return j
        }), n.d(t, "l", function() {
            return O
        }), n.d(t, "s", function() {
            return k
        }), n.d(t, "v", function() {
            return C
        }), n.d(t, "j", function() {
            return S
        }), n.d(t, "g", function() {
            return E
        }), n.d(t, "b", function() {
            return I
        }), n.d(t, "c", function() {
            return x
        }), n.d(t, "e", function() {
            return T
        }), n.d(t, "d", function() {
            return M
        }), n.d(t, "f", function() {
            return L
        }), n.d(t, "h", function() {
            return P
        }), n.d(t, "a", function() {
            return B
        }), n.d(t, "k", function() {
            return D
        }), n.d(t, "o", function() {
            return N
        }), n.d(t, "m", function() {
            return q
        }), n.d(t, "n", function() {
            return A
        }), n.d(t, "p", function() {
            return H
        }), n.d(t, "i", function() {
            return F
        }), n.d(t, "u", function() {
            return R
        }), n.d(t, "q", function() {
            return $
        }), n.d(t, "r", function() {
            return U
        }), n.d(t, "V", function() {
            return Ue
        }), n.d(t, "lc", function() {
            return ze
        }), n.d(t, "M", function() {
            return Ke
        }), n.d(t, "y", function() {
            return We
        }), n.d(t, "H", function() {
            return Ve
        }), n.d(t, "gb", function() {
            return Xe
        }), n.d(t, "gc", function() {
            return Qe
        }), n.d(t, "Ib", function() {
            return Ye
        }), n.d(t, "R", function() {
            return Je
        }), n.d(t, "J", function() {
            return et
        }), n.d(t, "Lc", function() {
            return tt
        }), n.d(t, "K", function() {
            return nt
        }), n.d(t, "Xb", function() {
            return rt
        }), n.d(t, "L", function() {
            return it
        }), n.d(t, "x", function() {
            return ot
        }), n.d(t, "jc", function() {
            return ct
        }), n.d(t, "Lb", function() {
            return lt
        }), n.d(t, "fc", function() {
            return dt
        }), n.d(t, "nb", function() {
            return ut
        }), n.d(t, "mb", function() {
            return mt
        }), n.d(t, "wb", function() {
            return pt
        }), n.d(t, "rb", function() {
            return gt
        }), n.d(t, "Db", function() {
            return ht
        }), n.d(t, "Eb", function() {
            return _t
        }), n.d(t, "I", function() {
            return jt
        }), n.d(t, "Jc", function() {
            return Ot
        }), n.d(t, "Dc", function() {
            return wt
        }), n.d(t, "D", function() {
            return kt
        }), n.d(t, "Zb", function() {
            return It
        }), n.d(t, "Sb", function() {
            return xt
        }), n.d(t, "Yb", function() {
            return Tt
        }), n.d(t, "Ub", function() {
            return Mt
        }), n.d(t, "bc", function() {
            return Lt
        }), n.d(t, "Tb", function() {
            return Pt
        }), n.d(t, "cc", function() {
            return Bt
        }), n.d(t, "mc", function() {
            return Dt
        }), n.d(t, "Fc", function() {
            return Nt
        }), n.d(t, "Ob", function() {
            return qt
        }), n.d(t, "Qb", function() {
            return Ht
        }), n.d(t, "Pb", function() {
            return Ft
        }), n.d(t, "ic", function() {
            return Rt
        }), n.d(t, "P", function() {
            return $t
        }), n.d(t, "Jb", function() {
            return Ut
        }), n.d(t, "Vb", function() {
            return Kt
        }), n.d(t, "kc", function() {
            return Wt
        }), n.d(t, "dc", function() {
            return Vt
        }), n.d(t, "w", function() {
            return Gt
        }), n.d(t, "hc", function() {
            return Xt
        }), n.d(t, "Cb", function() {
            return Qt
        }), n.d(t, "Bc", function() {
            return Yt
        }), n.d(t, "Oc", function() {
            return Jt
        }), n.d(t, "Gc", function() {
            return Zt
        }), n.d(t, "F", function() {
            return en
        }), n.d(t, "Wb", function() {
            return tn
        }), n.d(t, "rc", function() {
            return nn
        }), n.d(t, "tc", function() {
            return an
        }), n.d(t, "zc", function() {
            return rn
        }), n.d(t, "vc", function() {
            return sn
        }), n.d(t, "G", function() {
            return on
        }), n.d(t, "fb", function() {
            return cn
        }), n.d(t, "Ic", function() {
            return ln
        }), n.d(t, "Ac", function() {
            return dn
        }), n.d(t, "C", function() {
            return un
        }), n.d(t, "sb", function() {
            return mn
        }), n.d(t, "Fb", function() {
            return pn
        }), n.d(t, "xb", function() {
            return gn
        }), n.d(t, "zb", function() {
            return hn
        }), n.d(t, "yb", function() {
            return _n
        }), n.d(t, "z", function() {
            return bn
        }), n.d(t, "yc", function() {
            return fn
        }), n.d(t, "X", function() {
            return vn
        }), n.d(t, "W", function() {
            return yn
        }), n.d(t, "oc", function() {
            return On
        }), n.d(t, "nc", function() {
            return wn
        }), n.d(t, "T", function() {
            return kn
        }), n.d(t, "qc", function() {
            return Cn
        }), n.d(t, "ob", function() {
            return Sn
        }), n.d(t, "Nc", function() {
            return En
        }), n.d(t, "Rb", function() {
            return In
        }), n.d(t, "vb", function() {
            return xn
        }), n.d(t, "db", function() {
            return Tn
        }), n.d(t, "bb", function() {
            return Mn
        }), n.d(t, "cb", function() {
            return Ln
        }), n.d(t, "eb", function() {
            return Pn
        }), n.d(t, "ec", function() {
            return Bn
        }), n.d(t, "Kb", function() {
            return Nn
        }), n.d(t, "Kc", function() {
            return qn
        }), n.d(t, "ac", function() {
            return An
        }), n.d(t, "uc", function() {
            return Hn
        }), n.d(t, "pc", function() {
            return Fn
        }), n.d(t, "Z", function() {
            return Rn
        }), n.d(t, "A", function() {
            return $n
        }), n.d(t, "wc", function() {
            return Un
        }), n.d(t, "xc", function() {
            return zn
        }), n.d(t, "Gb", function() {
            return Kn
        }), n.d(t, "Q", function() {
            return Wn
        }), n.d(t, "Mb", function() {
            return Vn
        }), n.d(t, "Nb", function() {
            return Gn
        }), n.d(t, "Ec", function() {
            return Xn
        }), n.d(t, "ub", function() {
            return Qn
        }), n.d(t, "sc", function() {
            return Yn
        }), n.d(t, "Cc", function() {
            return Jn
        }), n.d(t, "B", function() {
            return Zn
        }), n.d(t, "U", function() {
            return ea
        }), n.d(t, "O", function() {
            return ta
        }), n.d(t, "N", function() {
            return na
        }), n.d(t, "Y", function() {
            return aa
        }), n.d(t, "E", function() {
            return ra
        }), n.d(t, "Mc", function() {
            return ia
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
        var j = "_im_mess_sending",
            O = "_im_mess_failed",
            w = "_im_mess_original",
            k = "_im_mess_restore",
            C = "_im_typing",
            S = "chat_create",
            E = "chat_title_update",
            I = "chat_invite_user",
            x = "chat_kick_user",
            T = "chat_photo_update",
            M = "chat_photo_remove",
            L = "chat_pin_message",
            P = "chat_unpin_message",
            B = "chat_invite_user_by_link",
            D = "_im_deselect_all",
            N = "_im_top_notice_hide",
            q = "_im_aside_notice_hide",
            A = "_im_aside_promo_block_hide",
            H = "_im_vkadmin_promo_link",
            F = "_im_clear_recent",
            R = "_im_toggle_mr_tab",
            $ = "_im_mess_search",
            U = "_im_pinned",
            {
                vk: z,
                ls: K,
                se: W,
                re: V,
                rs: G,
                sech: X,
                inArray: Q,
                intval: Y,
                trim: J,
                stripHTML: Z,
                domFC: ee,
                domPS: te,
                domLC: ne,
                domChildren: ae,
                domClosestSibling: re,
                domData: ie,
                geByClass: se,
                geByClass1: oe,
                gpeByClass: ce,
                addClass: le,
                removeClass: de,
                toggleClass: ue,
                hasClass: me,
                attr: pe,
                setStyle: ge,
                val: he,
                getTemplate: _e,
                getLang: be,
                langSex: fe,
                langDate: ve,
                langNumeric: ye,
                getDateText: je,
                getSmDate: Oe,
                getShortDate: we,
                isSameDate: ke,
                isToday: Ce,
                ajax: Se,
                showBox: Ee,
                showFastBox: Ie,
                showTabbedBox: xe,
                showTooltip: Te,
                mobPlatforms: Me,
                onlinePlatformClass: Le,
                AudioMessagePlayer: Pe,
                Emoji: Be,
                slideUp: De,
                fadeOut: Ne,
                cancelEvent: qe
            } = window,
            Ae = 4096,
            He = 100,
            Fe = 8,
            Re = 52,
            $e = "chatPosition";

        function Ue() {
            return K.get($e) || 0
        }

        function ze(e) {
            e >= window.clientHeight() - 30 && (e = 0), K.set($e, e)
        }

        function Ke(e, t) {
            var n = oe(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && ge(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function We(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Ve(e, t, n, a) {
            var r = t && !n ? 1 : !t && n ? -1 : 0;
            r && !Object(s.A)(e) && a().compensateHistoryHeightChange(r)
        }

        function Ge(e, t, n, a) {
            var r = window.devicePixelRatio >= 2 ? "256" : "128",
                i = "animation" === n,
                s = "im_gift";
            i && (s += " sticker_img");
            var o = `<img height="128" class="${s}" src="${Stickers.getStickerUrl(Y(e),r)}"/>`;
            if (i) {
                var c = "animatedSticker" + a;
                o = `<div id="${c}" data-loop-count=3 data-animation-path="${"/stickers.php?act=proxy_animation&product_id="+t+"&sticker_id="+e}" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="${a}" data-sticker-id="${Y(e)}" class="sticker_animation sticker_animation_128 im_gift">${o}</div>`;
                var l = !1;
                browser.msie ? (0 ^ a) === a && (l = !0) : l = Number.isInteger(a), l && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (o = `<a onmouseover="return Emoji.stickerOver(${Y(e)}, this);"\n        onclick="return Emoji.clickSticker(${Y(t)}, this, event);">${o}</a>`), o = `<div class="im_sticker_row">${o}</div>`
        }

        function Xe(e, t, n) {
            var a = e.get ? e.get() : e;
            if (ht(a, t)) {
                var r = a.tabs[t].deleted || [];
                return Q(n, r)
            }
            return !1
        }

        function Qe(e, t, n) {
            var a = n.randomId,
                r = oe(`_im_mess_rid${a}`, t);
            return r && (t = ot(e, n, t = At([r], t), !0, !1)), t
        }

        function Ye(e) {
            var t = Object(s.a)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : Je().then(e => e.length > 0).catch(e => !1)
        }

        function Je() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function Ze(e) {
            return _e("im_preloader", {
                preloader: G(z.pr_tpl, {
                    id: ""
                }),
                cls: `im-preloader_attach im-preloader_visible im-preloader_${e}`
            })
        }

        function et(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function tt(e, t, n) {
            var a = ie(n, "msgid"),
                r = oe(`_im_mess_${a}`, t),
                i = n.cloneNode(!0);
            return r && (r.parentNode.replaceChild(i, r), it(t)), t
        }

        function nt(e, t, n) {
            var a = at(e, t),
                r = oe(`_im_mess_${t.messageId}`, n);
            return r && (r.parentNode.replaceChild(W(a), r), it(n)), n
        }

        function at(e, t) {
            var n = ["_im_mess"],
                a = Object(o.n)(e.tabs[t.peerId], t),
                r = Object(o.c)(t) ? _e("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: Ze("reply"),
                    text: ""
                }) : "";
            Object(o.k)(t) && a && n.push("im-mess_unread _im_mess_unread"), Object(o.k)(t) && n.push("im-mess_out"), Object(o.p)(t) && n.push("im-mess_was_edited"), Object(b.a)(e, t) && n.push("im-mess_editable"), Object(o.h)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var i = Date.now() - 1e3 * t.date > 1e3;
            t.local && i && n.push("im-mess_sending"), t.local && n.push(`${j}`), t.local && Object(o.p)(t) && !a && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push(`im-mess_failed ${O}`), Object(o.f)(t) && n.push("im-mess_gift");
            var d = rt(t),
                u = function(e, t) {
                    var n = "",
                        a = Object(g.q)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(o.p)(t) && (n += _e("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(s.C)(e) && a) {
                        var r = t.kludges.ref_source,
                            i = {};
                        try {
                            (i = JSON.parse(Object(y.I)(r))).link && i.info && (i.link = Object(c.e)(Object(y.c)(i.link), c.b.bind(null, !1)), i = Object(y.c)(langStr(be("mail_source_info"), "link", i.link, "info", Object(y.c)(i.info))), n += _e("sImLblWasSourceInfo", {
                                source: i
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                m = r + yt(e, t.text, t.kludges, !1, t.peerId);
            "" != m && (m += u), t.subject && "..." !== t.subject.trim() && !Object(l.b)(t.peerId) && (m = _e("im_topic", {
                topic: t.subject
            }) + m);
            var p = _e("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: d.join(""),
                text: Object(o.f)(t) ? `<div class="im-mess--gift-lbl">${m}</div>` : ""
            });
            return Object(o.f)(t) || (p = m + p), "" == m && (p += u), _e("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? `aria-label="${be("mail_send_message_error")}" role="link"` : "",
                unread_params: a ? `aria-label="${be("mail_unread_message")}"` : "",
                cls: n.join(" ")
            }).replace("%text%", () => p)
        }

        function rt(e) {
            return e.attaches.reduce((t, n) => !Object(o.c)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push(Ge(n.id, n.productId, n.kind, e.messageId)) : t.push(Ge(n.id, n.productId)) : t.push(Ze(n.type)), t) : t, [])
        }

        function it(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) me(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", _e("sImHistoryRowActions")), de(t[n], "_im_mess_noa")
        }

        function st(e, t, n) {
            var a, r = z.id,
                i = e.attaches[0],
                s = i.initiatorId,
                o = i.state,
                c = i.receiverId;
            switch (o) {
                case "reached":
                    a = be(r === s ? "mail_call_outgoing" : "mail_call_incoming");
                    var l = t ? "" : function(e) {
                        var t = Math.floor(e / 3600),
                            n = Math.floor(e / 60) - 60 * t,
                            a = !1,
                            r = !1;
                        return [t, n, e - 3600 * t - 60 * n].reduce((e, t) => {
                            if (0 === t && !r) return r = !0, e;
                            a && (t = t < 10 ? "0" + t : t);
                            var n = `${e}${""!==e?":":""}${t}`;
                            return a = !0, r = !0, n
                        }, "")
                    }(i.duration);
                    a = a.replace("{duration}", l);
                    break;
                case "canceled_by_initiator":
                    a = be(r === s ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (r === s) {
                        if (t) return be("mail_call_declined");
                        var d = Object(h.c)(n, c);
                        return d ? fe(d.sex, be("mail_call_declined_by", "raw")).replace("{user_name}", d.first_name) : be("mail_call_declined")
                    }
                    return be("mail_call_canceled");
                default:
                    a = be("mail_added_call")
            }
            return _e("im_calls_link", {
                text: a
            })
        }

        function ot(e, t, n, a = !0, r = !0, i = !0) {
            var c = Date.now() - 1e3 * t.date > 1e3,
                d = e.tabs[t.peerId];
            if (!n || oe("_im_mess", n) || oe("_im_bar_date", n) || (n.innerHTML = ""), d.skipped > 0) return n;
            var u = [];
            t.local || (u = e.imQueue(t.peerId, r)), u.length > 0 && At(u.map(e => oe("_im_mess_rid" + e.rid, n), n).filter(e => e));
            var m = at(e, t),
                p = ne(n);
            me(p, "_im_mess_stack") || (p = re(p, "._im_mess_stack", -1));
            for (var _ = Object(s.l)(e, t.peerId, t.messageId); t.peerId === e.peer && _ && !oe("_im_mess_" + _.messageId);) _ = Object(s.l)(e, t.peerId, _.messageId);
            var b = oe("_im_unread_bar_row", n),
                f = Object(o.b)(t),
                v = _ ? bt(_.date, e) : 0;
            if (!_ || ft(d, _, t, e, i)) {
                var y = "",
                    O = !1;
                if (b && Object(o.k)(t) && In(e, n, t.peerId), 1 === d.unread && !Object(o.k)(t) && i && (y += _e("im_mess_bar", {}), O = !0, In(e, n, t.peerId)), !Ce(new Date(v))) {
                    var w = new Date,
                        k = O ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    y += _e("im_day_bar", {
                        day: we(t.date, e.timeshift, !0, be("months_of", "raw"), !0),
                        date: t.date,
                        day_class: w.getDate() + w.getMonth() + w.getFullYear() + " " + k
                    })
                }
                if (Object(o.l)(t)) y += _e("im_service_row", {
                    text: Vt(e, t, d),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(o.e)(t)) y += _e("im_service_row", {
                    text: Wt("", st(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var C = e.gid && Object(o.k)(t) ? Y(t.kludges.from_admin) || -e.gid : 0,
                        S = Object(h.c)(e, C ? -e.gid : f) || d,
                        E = Object(l.b)(t.peerId) ? S.name : S.first_name,
                        I = S.link || d.href,
                        x = _e("im_mess_stack_name", {
                            name: E,
                            link: I,
                            class: Object(o.i)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(o.f)(t)) {
                        var T = be("mail_gift_message_sent", "raw");
                        x += ` <span class="im-mess-stack--gift">${fe(S.sex||0,T)}</span>`
                    }
                    if (Object(o.i)(t)) {
                        var M = Object(o.j)(t) ? be("mail_money_request_message_sent", "raw") : be("mail_money_tranfer_message_sent", "raw");
                        x += ` <span class="im-mess-stack--money-transfer">${fe(S.sex||0,M)}</span>`
                    }
                    var L, P = e.gid ? "/gim" + e.gid : "/im";
                    if (L = t.local ? vt(t.date, e.timeshift) : _e("im_stack_date", {
                            date: vt(t.date, e.timeshift),
                            link: `${P}?sel=${t.peerId}&msgid=${t.messageId}`
                        }), C && e.admins[C]) {
                        var B = e.admins[C],
                            D = C === z.id ? be("mail_by_you") : B[0];
                        L = L + " " + _e("im_admin_link", {
                            name: D,
                            href: B[1]
                        })
                    }
                    y += _e("im_mess_stack", {
                        photo: S.photo,
                        href: I,
                        cls: "",
                        date_attr: "",
                        link: `/im?sel=${t.peerId}&msgid=${t.messageId}`,
                        name: Z(x),
                        stack_name: x,
                        peerId: f,
                        date: L,
                        messages: m,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(g.o)(X(y)).forEach(e => n && n.appendChild(e))
            } else b && e.peer === t.peerId && !d.inplaceSearch && Object(o.k)(t) && In(e, n, t.peerId), oe("_im_stack_messages", p).appendChild(W(m));
            return Object(o.k)(t) && !c && setTimeout(() => {
                var e = oe("_im_mess_" + t.messageId, n);
                me(e, j) && le(e, "im-mess_sending")
            }, 500), u = u.filter(e => e.rid !== t.randomId), it(n), ct(u, e, n)
        }

        function ct(e, t, n) {
            var a;
            return (a = "object" == typeof e ? e : t.imQueue(e, !1)).length > 0 && a.map(e => (e.mess.failed = !!e.failed, e.mess)).filter(e => Object(s.n)(t, e.peerId, e.messageId)).forEach(e => ot(t, e, n, !1)), n
        }

        function lt(e, t, n) {
            var a = e.tabs[t];
            return Object(g.o)(se("_im_mess_unread", n)).forEach(e => {
                var t = Y(ie(e, "msgid"));
                t > 0 && a.out_up_to >= t && (de(e, "_im_mess_unread"), de(e, "im-mess_unread"), function(e) {
                    var t = oe("_im_mess_blind_unread_marker", e);
                    t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
                }(e))
            }), n
        }

        function dt(e, t, n) {
            var {
                peerId: a,
                messageId: r
            } = t, i = oe("_im_msg_reply" + r, e), s = oe("_im_msg_media" + r, e), o = n.tabs[a].mediacontent[r][0];
            return i && (i.innerHTML = o[0]), s && (s.innerHTML = o[1]), e
        }

        function ut(e, t) {
            if (!Object(s.F)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function mt(e) {
            return e > 19e8 && e < 2e9
        }

        function pt(e, t) {
            return e === t.peer
        }

        function gt(e, t) {
            return Object(v.m)(Object(s.u)(e, t), 1024)
        }

        function ht(e, t) {
            return !!e.tabs[t]
        }

        function _t(e, t) {
            return !!ht(e, t) && null !== e.tabs[t].lastmsg
        }

        function bt(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function ft(e, t, n, a, r) {
            if (Object(o.b)(t) !== Object(o.b)(n)) return !0;
            var i = bt(t.date, a),
                c = bt(n.date, a);
            return !ke(i, c) || (!(!Object(s.C)(a) || Y(t.kludges.from_admin) === Y(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(o.l)(t) && !Object(o.l)(n)) || (!(!Object(o.e)(n) && !Object(o.e)(t)) || (!(!Object(o.f)(t) && !Object(o.f)(n)) || (!(!Object(o.g)(t) && !Object(o.g)(n)) || (!!Object(o.c)(n) || !(Object(o.n)(e, t) === Object(o.n)(e, n) || !r || Object(o.k)(n) || Qt(n.peerId, a.gid)))))))))
        }

        function vt(e, t) {
            return ve(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function yt(e, t, n, a = !1, r = !1) {
            var i = Math.round(1e9 * Math.random()).toString(16),
                o = {},
                l = 0;
            return t = (t = Object(c.e)(t || "", c.b.bind(null, a))).replace(/(<a.+?<\/a>)/gi, e => {
                var t = `!link_${l}_${i}!`;
                return o[t] = e, l++, t
            }), t = Object(c.f)(t), t = Object(c.c)(t), t = Object(c.d)(t, t => {
                var n = Object(s.j)(e);
                return `<a href="/${n?"gim"+n:"im"}?sel=${r||Object(s.p)(e)}&st=${encodeURIComponent(t)}">${t}</a>`
            }), Object.keys(o).forEach(e => {
                t = t.replace(e, () => o[e])
            }), n.emoji && (t = Be.emojiToHTML(t, !0)), t
        }

        function jt(e) {
            return Object(l.b)(e) ? "c" + (e - 2e9) : function(e) {
                return e < -2e9
            }(e) ? "e" + Math.abs(e + 2e9) : mt(e) ? "mr" + (e - 19e8) : e
        }

        function Ot(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - Y(e.substr(1));
                case "c":
                    return 2e9 + Y(e.substr(1));
                default:
                    return Y(e)
            }
        }

        function wt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function kt(e, t) {
            return {
                search: {
                    name: be("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: be("mail_block_comm_messages")
                },
                block_notify: {
                    icon: "block",
                    name: be("mail_block_notify_messages")
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

        function Ct(e, t) {
            var n = `<img src="${e}" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>`;
            return t && (n = _e("im_dialogs_link", {
                href: t,
                photo: n
            })), `<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ${n}\n    </div>\n  </div>`
        }

        function St(e, t) {
            var n = `<img src="${e}" alt="" class="dialogs_inline_chatter"/>`;
            return t && (n = _e("im_dialogs_link", {
                href: t,
                photo: n
            })), `<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ${n}\n    </div>\n  </div>`
        }

        function Et(e, t = []) {
            if ("string" == typeof e) return `<div class="im_grid"><img src="${e}" alt=""/></div>`;
            switch (e.length) {
                case 1:
                    return `<div class="im_grid"><img src="${e[0]}" alt=""/></div>`;
                case 2:
                    return e.map((e, n) => Ct(e, t[n])).join("");
                case 3:
                    return Ct(e[0], t[0]) + e.slice(1).map((e, n) => St(e, t[n + 1])).join("");
                case 4:
                    return e.map((e, n) => St(e, t[n])).join("")
            }
        }

        function It(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return `<div class="im_grid"><img src="${t.photo}" alt=""></div>`;
            if (Object(l.b)(t.peerId) && t.membersCount < 2) return `<div class="im_grid"><img src="${e.get().default_chat_photo}" alt=""></div>`;
            if (Array.isArray(t.photo)) return Et(t.photo);
            var a = t.data.active.slice(0, 4).map(h.c.bind(null, e));
            return Et(a.map(e => e.photo), n ? [] : a.map(e => e.link))
        }

        function xt(e) {
            var t = e.get().gid ? be("mail_search_only_messages_comm") : be("mail_search_only_messages");
            return `<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ${$}">\n      <button type="button" class="im-i--messages-search"></button>${t}\n    </div>\n  </li>`
        }

        function Tt() {
            return `<li class="im-search-results-head">${be("mail_search_messages")}</li>`
        }

        function Mt() {
            return `<li class="im-search-results-head">${be("mail_search_conversations_sep")}</li>`
        }

        function Lt() {
            return `<li class="im-search-results-head">${be("mail_search_dialogs_sep")}</li>`
        }

        function Pt() {
            return `<li class="im-search-results-head _im_recent_bar">\n    ${be("mail_recent_searches")}\n    <button type="button" class="${F} im-page--clear-recent">${be("mail_clear_recent")}</button>\n  </li>`
        }

        function Bt(e) {
            var t = e.get().popular_sugg,
                n = Object(s.A)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(t => {
                var n = t.peerId,
                    a = Object(h.c)(e, n) || t,
                    r = e.get().tabs[n] || t,
                    i = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return `<div class="${["im-popular--item","fl_l","_im_dialog","_dont_add_recent","_im_sugg_"+n,r.unread>0&&"sugg-is_unread",i&&"sugg-is_muted"].filter(e=>!!e).join(" ")}" data-peer="${n}">\n    <a class="im-popular--avatar-w ${Le(r.online)}" href="${a.link}"><img class="im-popular--avatar" src="${a.photo}"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="${a.link}">${a.first_name||a.name}</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">${wt(r.unread)}</span>\n</div>`
            }).join("") + "</li>"
        }

        function Dt(e, t, n) {
            var a = oe("_im_mess_" + t.messageId, n);
            if (a) {
                pe(a, "aria-hidden", "false"), le(a, `im-mess_failed ${O}`);
                var r = oe("_im_mess_marker", a);
                pe(r, "aria-label", be("mail_send_message_error")), pe(r, "role", "link")
            }
            return n
        }

        function Nt(e, t, n) {
            var a = oe("_im_mess_" + t, n);
            if (a) {
                de(a, "im-mess_failed"), pe(a, "aria-hidden", "true"), de(a, O);
                var r = oe("_im_mess_marker", a);
                pe(r, "aria-label", ""), pe(r, "role", "")
            }
            return n
        }

        function qt(e, t) {
            return At(e.map(e => oe("_im_mess_" + e, t)).filter(e => e), t)
        }

        function At(e, t) {
            var n = e.filter(e => !me(e, "im-mess_srv")).map(e => e.parentNode);
            return e.forEach(e => {
                me(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(e => 0 === ae(e).length).map(e => ce("_im_mess_stack", e)).forEach(e => {
                me(te(e), "_im_bar_date") && V(te(e)), me(te(e), "_im_unread_bar_row") && V(te(e)), V(e)
            }), t
        }

        function Ht(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    me(n, "mess_srv") && (t = n.parentNode);
                    var a = ce("_im_mess_stack", n);
                    a && (t = a.previousElementSibling, 1 === ae(n.parentNode).length && a.parentNode.removeChild(a))
                }
                me(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function Ft(e, t, n, a) {
            return e.map(e => oe("_im_mess_" + e, a)).filter(e => e).forEach(e => {
                he(e, function(e, t, n) {
                    var a = t.innerHTML;
                    return `<div class="im-mess--text">\n    ${be("delete"===n?"mail_deleted_stop":"mail_marked_as_spam")} <button type="button" data-peer="${e}" class="${k} im-mess--btn">${be("mail_restore")}</button>\n    <div class="${w} im-mess--original">${a}</div>\n  </div>`
                }(t, e, n)), le(e, "im-mess_light")
            }), a
        }

        function Rt(e, t, n) {
            var a = oe("_im_mess_" + e, n);
            if (a) {
                var r = oe(w, a);
                he(a, r.innerHTML), de(a, "im-mess_light")
            }
            return n
        }

        function $t(e = {}, t, n, a, r = 2, i = !1) {
            if (i) return zt(e, t, n, a, !0, r);
            var s = zt(e, t, n, a, !1, r);
            return s.length > 60 ? zt(e, t, n, a, !0, r) : s
        }

        function Ut(e) {
            var t = {
                    [d.d]: 1,
                    [d.c]: 2
                },
                n = Object.keys(e).sort((e, n) => t[n] - t[e]),
                a = {},
                r = n.reduce((t, n) => {
                    var {
                        userIds: r = []
                    } = e[n] || {};
                    return r.forEach(e => {
                        a[e] || (a[e] = !0, t[n] = !0)
                    }), t
                }, {}),
                i = n.filter(e => !!r[e]);
            return i.length > 1 ? "" : i[0]
        }

        function zt(e, t, n, a, r, i) {
            var o = function(e, t, n) {
                var a = [],
                    r = {};
                return Object.keys(t).map(n => {
                    ((t[n] || {}).userIds || []).forEach(t => {
                        Object(h.b)(e, t) ? parseInt(t, 10) !== e.id && (r[t] = n) : a.push(t)
                    })
                }), a.length && Object(d.hb)({
                    [n]: a
                }, e), Object.keys(r).sort((e, n) => t[r[e]].ts - t[r[n]].ts)
            }(a, e, t);
            if (0 === o.length) return "";
            var c = Object(l.d)(t) || Object(s.D)(t) ? "first_name" : r ? "short_name" : "name",
                u = Ut(e),
                m = "";
            u === d.c ? m = be("mail_recording_audio_several", o.length) : u === d.d && (m = be("mail_typing_several", o.length));
            var p = o.slice(0, Math.min(o.length - 1, i)),
                g = p.map(e => Object(h.c)(a, e)[c]).join(", ");
            if (o.length > i + 1) {
                var _ = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(n => {
                        var {
                            userIds: a = []
                        } = e[n];
                        a.forEach(e => {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                g += " " + be("mail_and_peer").replace("{count}", _ - i).replace("{typing}", m)
            } else {
                if (o.length > 1 && (g += ` ${be("mail_and_peer_one")}`), !Object(l.b)(t) && n) g += ` ${m}`;
                else g += ` ${Object(h.c)(a,o[p.length])[c]} ${m}`
            }
            return g.trim()
        }

        function Kt() {
            return `<div class="im-page--chat-search-empty">\n    ${be("mail_im_search_empty")}\n  </div>`
        }

        function Wt(e, t, n, a = "") {
            return n ? `<a class="im_srv_lnk ${a}" target="_blank" rel="noopener" href="${e}">${t}</a>` : `<span class="${a}">${t}</span>`
        }

        function Vt(e, t, n, a = !0) {
            var r = t.kludges,
                i = r.source_act,
                s = Y(r.source_mid),
                o = t.userId,
                c = Object(h.c)(e, o),
                l = "",
                d = o === s;
            switch (i) {
                case S:
                    l = "mail_im_chat_created";
                    break;
                case E:
                    l = r.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case I:
                    l = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case x:
                    l = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case T:
                    l = "mail_im_photo_set";
                    break;
                case M:
                    l = r.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case L:
                    l = r.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case P:
                    l = r.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case B:
                    l = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (l = (l = fe(c.sex, be(l, "raw"))).replace("{from}", Wt(c.link, c.name, a)), s && s !== o) {
                var u = r.source_email;
                if (u) l = l.replace("{user}", Wt(`/im?email=${encodeURIComponent(u)}`, "email", a));
                else {
                    var m = Object(h.c)(e, s),
                        p = i === x ? m.inv_name : m.kick_name;
                    l = l.replace("{user}", Wt(m.link, p, a))
                }
            }
            if (r.source_text) {
                var g = r.source_old_text ? `«<b class="im_srv_lnk">${r.source_old_text}</b>» &rarr; ` : "";
                l = l.replace("{title}", g + `«<b class="im_srv_lnk">${r.source_text}</b>»`)
            }
            if (r.source_act === L || r.source_act === P)
                if (r.source_message) {
                    var _ = Wt("", Xt(Be.emojiToHTML(Z(r.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    l = l.replace("{msg}", _)
                } else l = l.replace(/{link}(.+){\/link}/i, (e, t) => Wt("", t, !1, "im_srv_mess_link"));
            return l
        }

        function Gt(e, t, n, a) {
            if (t === T) {
                var r = oe("_im_mess_" + e.messageId, a);
                if (r) {
                    n.tabs[e.peerId];
                    r.parentNode.innerHTML = _e("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Vt(n, e) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return a
        }

        function Xt(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(r.r, "$1$4")
        }

        function Qt(e, t) {
            return !t && e === z.id
        }

        function Yt(e, t) {
            return Te(e, {
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

        function Jt(e) {
            return (t, n = "bottom", a = "") => {
                var r = W(_e("im_preloader", {
                        preloader: G(z.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", a].join(" ")
                    })),
                    i = !1;

                function s() {
                    i = !0, de(r, "im-preloader_visible"), r.parentNode && r.parentNode.removeChild(r)
                }
                setTimeout(() => {
                    i || ("bottom" === n ? e.appendChild(r) : e.insertBefore(r, ee(e)), le(r, "im-preloader_visible"))
                }, 0), t.then(s).catch(e => {
                    Object(f.a)("wrapLoading", e), s()
                })
            }
        }

        function Zt(e, t) {
            return {
                0: {
                    msgs: e.reduce((e, t) => (e[t] = [t, a.l, 0, 0, "", {}, {}, 0, 0, 0], e), {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function en(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                a = Fe,
                r = !1,
                i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || me(n, "_im_no_select") || me(n, "im_msg_media_link") || "IMG" == n.tagName && !me(n, "_im_graffiti") && !me(n, "emoji") && !me(n, "emoji_css") && !me(n, "im_gift") || "TEXTAREA" == n.tagName || me(n, "play_new") || me(n, "videoplayer") || (r = i.test(n.className))) break
            } while (a-- && (n = n.parentNode));
            return !r || !!J((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function tn(e, t) {
            return `<div class="im-mess--text">\n      <span>${be("mail_restored")}</span>\n      <a class="_im_go_to" href="/im?sel=${jt(e)}&msgid=${t}">${be("mail_im_goto_conversation")}</a>\n    </div>`
        }

        function nn(e, t, n) {
            var a = be("mail_deleteall1"),
                r = be("mail_sure_to_delete_all"),
                i = be("mail_delete");
            return Object(l.b)(t) && (Object(v.m)(e, 1024) ? (a = be("mail_leave_channel"), r = be("mail_unfollow_channel_confirmation"), i = be("mail_unfollow_channel")) : r = be("mail_chat_sure_to_delete_all")), Object(s.D)(t) && (r = be("mail_group_sure_to_delete_all")), Ie(a, r, i, n, be("global_cancel"))
        }

        function an(e, t, n) {
            var a = Object(s.u)(e, t),
                r = Object(l.b)(t),
                i = r && Object(v.m)(a, 1024),
                o = be("mail_deleteall1"),
                c = be("mail_sure_to_delete_all"),
                d = be("mail_delete");
            if (r) {
                if (a.data.closed || a.data.kicked) return nn(a, t, n.bind(null, !0));
                i ? (o = be("mail_leave_channel"), c = be("mail_vkcomgroup_leave_confirm"), d = be("mail_leave_channel")) : (o = be("mail_leave_chat"), c = be("mail_chat_leave_confirm"), d = be("mail_leave_chat"))
            }
            Object(s.D)(t) && (c = be("mail_group_sure_to_delete_all"));
            var u = new MessageBox({
                title: o,
                width: i ? 450 : 500
            }).content(c).setButtons(d, () => n(!!isChecked(oe("_check_is_delete")) || !r), be("global_cancel")).show();
            return r && !i && u.setControlsText(`<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">${be("mail_deleteall1")}</div>`), u
        }

        function rn(e) {
            return Ie(be("mail_unpin_title"), be("mail_unpin_text"), be("mail_unpin"), e, be("global_cancel"))
        }

        function sn(e, t, n, a) {
            var r = be("mail_dialog_msg_delete_N", t),
                i = Ie(be("mail_dialog_msg_delete_title"), r, be("mail_delete"), () => a(isChecked(oe("_check_forall"))), be("global_cancel")),
                s = "",
                o = !1;
            return n && (s = `<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">${be("mail_delete_for_all")}</div>`, o = cur.imDb.selectByKey("del_forall_checked")), i.setControlsText(s), o && checkbox(oe("_check_forall")), i
        }

        function on(e, t, n, a, r) {
            t.showProgress(), e.set(a.bind(null, r)).then(() => {
                t.hideProgress(), t.hide(), n().removePeer(e, r), n().updateDialogFilters(e)
            })
        }

        function cn(e, t, n, a) {
            var r = e.get().tabs[t].memberIds;
            e.set(a.bind(null, "add_member", r)).then(n().showCreation)
        }

        function ln(e, t, n) {
            var a = e.get();
            if (a.active_tab === r.h && 0 === a.dialog_tab_cts.mr) return !1;
            var i = a.active_tab === r.k ? r.h : r.k;
            return e.set(n.bind(null, i)).then(e => {
                t().restoreDialogs(e, !0)
            })
        }

        function dn(e, t, n) {
            if (e.get().active_tab === r.h && 0 === e.get().unread_cnt) return !1;
            var a = e.get().active_tab === r.m ? r.h : r.m;
            return e.set(n.bind(null, a)).then(e => {
                t().restoreDialogs(e, !0)
            })
        }

        function un(e, t, n, a) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var r = Object(s.L)(t);
            return t.set(a.bind(null, e)).then(e => (n().restoreDialogs(e, !0, r !== Object(s.L)(e)), e))
        }

        function mn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return r.j[r.i] & n.folders
        }

        function pn(e, t, n = !1) {
            if (void 0 === t && (t = e.get().peer), !Object(s.E)(e)) return !1;
            var a = n || e.get().tabs[t];
            return r.j[r.n] & a.folders
        }

        function gn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function hn(e) {
            return null != e.get().pendingForward
        }

        function _n(e, t) {
            return (t.get().block_states[e] || {}).who === z.id
        }

        function bn(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(r => {
                n[r].time ? !1 === n[r].free && Date.now() - n[r].time >= 5e4 && t.push([a.sb([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
            })
        }

        function fn(e, t, n) {
            var a;
            return !xe("al_im.php", {
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
                        Pe.loaded && Pe.detachPlayer(!0), a.unmount()
                    }
                }
            }, n)
        }

        function vn(e, t) {
            return yn(e.get(), t, Object(s.u)(e, t).last_seen)
        }

        function yn(e, t, n, a) {
            if (n[0]) return be("mail_header_online_status") + (Me[n[0]] ? jn(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var r = je(n[1], e.timeshift),
                i = fe(Object(h.c)(e, t).sex, be("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", r);
            return n[2] && (i += jn(t, !1, !1, a)), i
        }

        function jn(e, t, n, a) {
            var r = {
                mid: e
            };
            n || (r.was = 1), t ? r.forcetoup = !0 : r.forcetodown = !0, r = Object.assign(r, a);
            var i = JSON.stringify(r).slice(1, -1).replace(/"/g, "&quot;");
            return _e("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: i
            })
        }

        function On(e, t) {
            var n = t.get().tabs[e];
            return Ee("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function wn(e, t) {
            return Ee("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function kn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function Cn(e, t, n, a) {
            var r;
            $n(xe("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: (a, i) => {
                    i && (r = n(a, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: () => {
                        Pe.loaded && Pe.detachPlayer(!0)
                    },
                    onDestroy: () => {
                        r && r.unmount()
                    }
                }
            }, a), e)
        }

        function Sn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function En(e, t, n) {
            var a = oe("_im_mess_" + e, n);
            return a && ue(a, "im-mess_fav", t), n
        }

        function In(e, t, n) {
            var a = oe("_im_unread_bar_row", t);
            if (!a) return t;
            var r = re(a, "._im_mess_stack", -1),
                i = re(a, "._im_mess_stack"),
                o = r ? se("_im_mess", r).pop() : null,
                c = i ? oe("_im_mess", i) : null;
            if (V(a), function(e) {
                    var t = oe("_im_invisible_bar", e);
                    t && (de(t, "_im_invisible_bar"), de(t, "im-page--history-new-bar_hide"))
                }(t), !c || !o) return t;
            var l = ie(c, "msgid"),
                d = Object(s.r)(e, n, l),
                u = Object(s.n)(e, n, l);
            if (!d || ft(e.tabs[n], d, u, e)) return t;
            var m = oe("_im_stack_messages", r),
                p = oe("_im_stack_messages", i).children;
            return Object(g.o)(p).forEach(e => {
                V(e), m.appendChild(e)
            }), V(i), t
        }

        function xn(e, t, n) {
            var a = Object(s.i)(e, e.get().peer);
            if (!a) return [!1, 0];
            var r = oe(`_im_mess_${a}`, t);
            if (!r) {
                var i = Object(s.l)(e, e.get().peer, a);
                if (!i) return [!0, 0];
                r = oe(`_im_mess_${i.messageId}`, t)
            }
            var o = me(r, "_im_mess_srv") ? r : ce("_im_mess_stack", r);
            if (!o) return [!0, 0];
            var c = r ? r.offsetTop : 0,
                l = o.offsetTop + c,
                d = n.contHeight();
            return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - l)]
        }

        function Tn(e, t, n) {
            qe(t);
            var a = ce("_im_top_notice", n);
            Ne(a, 200, V.pbind(a));
            var r = ce("_im_page_dialogs", a);
            r && me(r, "im-page--dialogs-notice") && de(r, "im-page--dialogs-notice"), Se.post("al_im.php", {
                act: "a_hide_top_notice",
                type: a.getAttribute("data-type"),
                hash: a.getAttribute("data-hash")
            })
        }

        function Mn(e, t, n) {
            qe(t);
            var a = ce("_im_aside_notice", n);
            De(a, 200, V.pbind(a)), Se.post("al_im.php", {
                act: "a_hide_top_notice",
                type: a.getAttribute("data-type"),
                hash: a.getAttribute("data-hash")
            })
        }

        function Ln(e, t) {
            qe(e);
            var n = ce("_im_aside_promo_block", t);
            De(n, 200, V.pbind(n)), Se.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Pn(e, t) {
            ce("_im_aside_promo_block", t).classList.add("--action-called"), Se.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: ie(t, "hash"),
                platform: ie(t, "platform")
            })
        }

        function Bn(e, t, n, a, r) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(c.f)(n, (e, t, n, a, r) => r), a && (n = Be.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(l.b)(e) && (n = _e("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && r.length > 0 && (n = _e("im_dialog_media", {
                name: Dn(r[0], r)
            })), n
        }

        function Dn(e, t) {
            var n = {
                photo: be("mail_added_photos", "raw"),
                video: be("mail_added_videos", "raw"),
                audio: be("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var a = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return ye(a, be("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var r = t.filter(t => t.type === e.type).length;
                    return ye(r, n[e.type], !0);
                case "audio_playlist":
                    return "audio_album" === e.kind ? be("mail_added_audio_album") : be("mail_added_audio_playlist");
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

        function Nn(e) {
            le(e, "im-send-btn_loading")
        }

        function qn(e) {
            de(e, "im-send-btn_loading")
        }

        function An(e) {
            var t = e.get(),
                n = Object(s.q)(e);
            if (!n || !Object(_.a)(e, Object(s.p)(e))) return "";
            var a = Object(h.c)(e, n.userId);
            if (!a) return "";
            var r = function(e, t) {
                var n = "";
                if (t && Object(o.j)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                    var a = "%s " + t.kludges.attach1_currency;
                    if ("RUB" === t.kludges.attach1_currency && (a = be("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                        var r = ye(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                            i = ye(t.kludges.attach1_total_amount / 1e3, a, !0);
                        n = be("mail_money_request_collected_amount_from").replace("{amount}", r).replace("{total_amount}", i)
                    } else {
                        var s = ye(t.kludges.attach1_tr_amount / 1e3, a, !0);
                        n = be("mail_money_request_collected_amount").replace("{amount}", s)
                    }
                    if (Y(t.kludges.attach1_held_amount)) {
                        var c = ye(t.kludges.attach1_held_amount / 1e3, a, !0);
                        n += " " + be("mail_money_request_held_amount").replace("{amount}", c)
                    }
                    t.text && (n += '<span class="divider"></span>' + yt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += _e("im_pinned_message_media_bar", {
                        percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                    }))
                }
                return n
            }(e, n);
            return r || (r = !(r = n.text) && n.attaches.length ? _e("im_pinned_message_media", {
                text: Dn(n.attaches[0], n.attaches)
            }) : yt(e, r, n && n.kludges || {}) || ""), r = r.replace(/<br\s?\/?>/gi, " "), _e("im_pinned_message", {
                date: Oe(n.date, t.timeshift),
                content: r,
                link: a.link,
                name: a.name
            })
        }

        function Hn(e, t, n) {
            var a = n.getAttribute("data-info");
            a && Te(n, {
                text: a,
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                hidedt: 1e3,
                shift: [0, 4]
            })
        }

        function Fn(e, t, n) {
            var a = +n.getAttribute("data-time");
            a && Te(n, {
                text: be("mail_message_edited") + " " + Oe(a, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Rn() {
            var e = getSize(oe(U))[1];
            return e || (e = Re), e
        }

        function $n(e, t) {
            e.bodyNode.addEventListener("mouseover", e => {
                me(e.target, "_im_edit_time") ? Fn(t, 0, e.target) : me(e.target, "_im_page_info") && Hn(0, 0, e.target)
            })
        }

        function Un(e, t, n, a, r) {
            var i, s = e.get();
            $n(xe("al_im.php", {
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
                        Pe.loaded && Pe.detachPlayer(!0)
                    },
                    onDestroy: () => {
                        i && i.unmount()
                    }
                }
            }, r), e)
        }

        function zn(e, t, n) {
            var a = e.get();
            $n(xe("al_im.php", {
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
                        Pe.loaded && Pe.detachPlayer(!0)
                    },
                    onDestroy: () => {}
                }
            }, n), e)
        }

        function Kn(e, t) {
            return !(!Object(l.b)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Wn(e) {
            return !Object(l.b)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Vn(e, t) {
            var n = Object(h.c)(e, t.peerId),
                a = Object(s.u)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = a.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(l.b)(t.peerId) && (t.memberIds = t.memberIds || a.memberIds || null), t
        }

        function Gn(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Vn(e, t[n])
        }

        function Xn(e, t) {
            var n = [],
                a = t.find(e => "mail" === e[0]),
                r = a ? a[1].split(";") : [];
            for (r.length > He && (a[1] = r.slice(0, He).join(";")); e.length > Ae;) {
                var i = e.substr(0, Ae).lastIndexOf(" "); - 1 == i && (i = Ae), n.push({
                    msgText: J(e.substr(0, i))
                }), e = J(e.substr(i))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), r = r.slice(He); r.length; r = r.slice(He)) n.push({
                attaches: [
                    ["mail", r.slice(0, He).join(";")]
                ]
            });
            return n
        }

        function Qn(e) {
            return e.length > Ae
        }

        function Yn(e, t, n) {
            var a = !1;
            Ee("al_im.php", {
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
                onFail: e => (setTimeout(() => Ie(be("global_error"), e), 0), !0),
                onDone(t, n) {
                    a = p(t.bodyNode, e)
                }
            }, {})
        }

        function Jn() {
            Ie(be("global_error"), be("mail_message_wait_until_uploaded"))
        }

        function Zn(e, t) {
            var n = Object(s.u)(e, t.peerId) || {},
                a = e.get(),
                r = Object(l.b)(t.peerId) && Object(v.n)(n, a.id),
                i = Object(l.b)(t.peerId) && Object(v.n)(n, t.userId);
            if (!t) return !1;
            if (!Object(o.k)(t) && (!r || i)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (Xe(e, t.peerId, t.messageId)) return !1;
            if (Object(l.b)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ea(e, t) {
            return t.map(t => Object(h.c)(e, t))
        }

        function ta(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, a = e,
                r = [];
            if ([
                    [31536e3, be(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, be(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, be(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, be(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, be(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, be(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, be(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(([e, t]) => {
                    var n = Math.floor(a / e);
                    a %= e, n >= 1 && r.push(ye(n, t))
                }), 1 === (n = r.length)) return r.pop();
            var i = r.slice(0, n - 1).join(", "),
                s = r.pop();
            return be("global_and").replace(/{before}/gi, i).replace(/{after}/gi, s)
        }

        function na(e, t, n, r) {
            r && !Xe(e, n, r) && (Object(s.n)(e, n, r) ? (e.setState({
                msgid: r
            }), Object(i.b)({
                msgid: r
            }), t()) : e.get().longpoll.push([Object(a.gb)(n, r)]))
        }

        function aa(e) {
            var t = oe("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                a = Object(s.S)(n.msgs[ie(t, "msgid")]);
            return a && a.peerId == e.get().peer ? a : null
        }

        function ra(e, t) {
            if (Object(s.A)(e)) {
                var n = document.getElementById("ui_rmenu_mr");
                n && (Object(s.d)(e) ? n.classList.remove("unshown") : n.classList.add("unshown"))
            } else t(e)
        }

        function ia(e) {
            var t = Object(g.q)(e),
                n = Number(t.dialog_tab_cts[r.k]),
                a = n > 0 ? n : "",
                i = document.querySelector('._im_right_menu_counter[data-tab="mr"]');
            i && (i.innerHTML = a)
        }
    },
    PjZB: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
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
                var {
                    style: e,
                    color: t,
                    size: n,
                    duration: r,
                    strokeWidth: i
                } = this.props, {
                    id: s,
                    offset: o,
                    animation: c
                } = this;
                return a.createElement("div", {
                    className: "Spinner",
                    style: e
                }, a.createElement("svg", {
                    className: "Spinner__svg",
                    width: n,
                    height: n,
                    viewBox: `0 0 ${n} ${n}`,
                    xmlns: "http://www.w3.org/2000/svg"
                }, a.createElement("g", {
                    style: {
                        width: n,
                        height: n,
                        transformOrigin: .5 * n + "px " + .5 * n + "px"
                    }
                }, a.createElement("style", {
                    dangerouslySetInnerHTML: {
                        __html: c
                    }
                }), a.createElement("circle", {
                    className: "Spinner__path",
                    fill: "none",
                    stroke: t,
                    strokeDasharray: o,
                    strokeDashoffset: o,
                    strokeWidth: i,
                    style: {
                        animationName: "dash" + s,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: r + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * n,
                    cy: .5 * n,
                    r: .5 * n - .5 * i
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
        n.d(t, "a", function() {
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
        n.d(t, "b", function() {
            return o
        });
        var a = n("nAFc"),
            r = {},
            i = window.getLang,
            s = window.langNumeric;

        function o(e, t = !1, n) {
            var o = "number" == typeof t,
                c = e + (t || o ? ".raw" : "");
            if (void 0 === r[c]) {
                var l = t || o ? i(e, "raw") : i(e);
                "string" == typeof l ? r[c] = Object(a.a)(l) : Array.isArray(l) && (r[c] = l.map(a.a))
            }
            return o ? s(t, r[c], n) : r[c] || ""
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
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));
        class i extends a.Component {
            render() {
                var {
                    photos: e,
                    links: t,
                    className: n
                } = this.props, i = Object(r.a)("MembersGrid", `MembersGrid--${Math.min(e.length,4)}`, n);
                return a.createElement("div", {
                    className: i
                }, e.map((e, n) => {
                    var r = t && t[n] ? t[n] : void 0,
                        i = r ? "a" : "span";
                    return a.createElement(i, {
                        key: n,
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
        n.d(t, "a", function() {
            return a
        })
    },
    WDXI: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return l
        });
        var a = n("q1tI"),
            r = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("MV/q"),
            {
                elfocus: o
            } = window,
            c = {
                height: "auto"
            };
        class l extends a.Component {
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
                this.el = r.findDOMNode(this), this.el.addEventListener("keydown", this.onKeydown)
            }
            componentWillUnmount() {
                this.el.removeEventListener("keydown", this.onKeydown)
            }
            render() {
                var {
                    className: e,
                    validate: t,
                    placeholder: n
                } = this.props, {
                    editing: r,
                    changed: o,
                    value: l
                } = this.state, d = Object(i.a)("EditableLabel", {
                    "EditableLabel--editing": r,
                    "EditableLabel--changed": o,
                    "EditableLabel--invalid": t && !t(l)
                }, e);
                return a.createElement("div", {
                    className: d
                }, r ? a.createElement(a.Fragment, null, a.createElement(s.a, {
                    className: "EditableLabel__textarea",
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    value: l,
                    onBlur: this.onBlur,
                    style: Object.assign({}, c, this.props.textareaStyles),
                    rows: "1",
                    ref: this.getRef,
                    placeholder: n
                }), o && a.createElement("button", {
                    className: "EditableLabel__save",
                    onClick: this.onSave
                })) : a.createElement("div", {
                    className: "EditableLabel__text",
                    onClick: this.onClick
                }, l))
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
        var a = n("N1NS"),
            r = n("vT4u");

        function i(e) {
            return {
                unmount() {
                    Object(a.c)(e)
                }
            }
        }

        function s(e, t, n) {
            var {
                bindMutations: r
            } = Object(a.b)(i);
            return r(Object(a.a)({
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
                a = n && Object(c.S)(n.pinned);
            return !!a && n.pinHideId != a.chat_local_id
        }

        function g(e, t, n, a = !0) {
            var r = Object(c.u)(e, t),
                i = r && Object(c.S)(r.pinned);
            r && i && (r.pinHideId = i.chat_local_id, cur.imDb.update(d.a, [r.peerId, r.pinHideId]), b(n, t, e), re(geByClass1("_im_pinned_tt")), a && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function h(e, t, n, a = !0) {
            var r = Object(c.u)(e, t);
            r && r.pinHideId && (delete r.pinHideId, cur.imDb.update(d.a, [r.peerId, void 0]), b(n, t, e), a && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function _(e, t, n) {
            var a = b.bind(null, n, t),
                i = Object(o.zc)(() => {
                    i.hideProgress(), i.hide(), e.set(r.Oc.bind(null, t)).then(a).then(e => e.set(r.Nc.bind(null, t))).then(a)
                })
        }

        function b(e, t, n) {
            return e().updateChatTopic(t, n), Object(r.oc)(n.get()), e().updateActions(n), n
        }

        function f(e) {
            return {
                unmount() {
                    Object(a.c)(e)
                }
            }
        }

        function v(e, t, n) {
            var {
                bindMutations: r
            } = Object(a.b)(f), i = function(e, t, n) {
                var a = e.get().peer,
                    r = Object(c.S)(Object(c.u)(e, a).pinned);
                if (n.target.classList.contains(u)) r && g(e, a, t);
                else if ("A" !== n.target.tagName) {
                    var i = r && r.messageId;
                    i && !Object(o.gb)(e, a, i) ? Object(o.N)(e, t().focusOnMessage, a, i) : Object(o.wc)(e, t, a, s, n), statlogsValueEvent("im_pinned_messages", "open")
                }
            }.bind(null, t, n), l = function(e) {
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
            return r(Object(a.a)({
                handlers: (t, n) => {
                    n(e, "click", m, i), n(e, "mouseover", u, l)
                }
            }))
        }
    },
    XTb9: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        });
        n("rGqo"), n("Btvt");
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
        class s extends a.Component {
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
                    {
                        className: t,
                        children: n
                    } = e,
                    s = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["shown", "callback", "duration", "className", "children"]),
                    o = Object(r.a)("BlinkText", {
                        "BlinkText--shown": this.state.shown
                    }, t);
                return a.createElement("span", i({}, s, {
                    className: o,
                    onTransitionEnd: this.onTransitionEnd,
                    "aria-hidden": !0
                }), n)
            }
        }
        s.defaultProps = {
            duration: 2e3
        }
    },
    XpgC: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        });
        var a = n("q1tI"),
            r = n("i8i4"),
            i = (n("17x9"), n("pemR")),
            s = n("clTp"),
            o = () => "undefined" != typeof window;
        class c extends a.Component {
            constructor(e) {
                super(e), this.onMouseEnter = (e => {
                    if (this.el) {
                        var {
                            text: t,
                            position: n,
                            align: a,
                            marginTop: r,
                            marginLeft: i,
                            maxWidth: o,
                            appearance: c
                        } = this.props, l = Object(s.a)(this.el);
                        this.update({
                            text: t,
                            position: n,
                            align: a,
                            rect: l,
                            marginTop: r,
                            marginLeft: i,
                            maxWidth: o,
                            appearance: c
                        })
                    }
                }), this.onMouseLeave = (e => this.update()), this.onTransitionEnd = (e => {
                    "visibility" === e.propertyName && this.state.tooltip && this.setState({
                        tooltip: void 0
                    })
                }), this.renderTooltip = (() => {
                    if (!this.state.tooltip) return null;
                    var {
                        x: e,
                        y: t,
                        position: n,
                        align: r,
                        text: s,
                        removed: o,
                        maxWidth: c,
                        appearance: l
                    } = this.state.tooltip, d = Object(i.a)("Tooltip", `Tooltip--${n}`, `Tooltip--${l}`, {
                        "Tooltip--removed": !!o,
                        [`Tooltip--align-${r}`]: "t" === n || "b" === n
                    });
                    return a.createElement("div", {
                        className: d,
                        style: {
                            top: t,
                            left: e
                        },
                        onTransitionEnd: this.onTransitionEnd
                    }, a.createElement("div", {
                        className: "Tooltip__in",
                        style: {
                            maxWidth: c
                        },
                        dangerouslySetInnerHTML: {
                            __html: s
                        }
                    }))
                }), this.state = {}
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
                var {
                    position: t,
                    align: n,
                    text: a,
                    rect: r,
                    marginTop: i,
                    marginLeft: s,
                    maxWidth: o,
                    appearance: c
                } = e, l = r.left, d = r.top;
                switch (t) {
                    case "t":
                        l += .5 * r.width;
                        break;
                    case "r":
                        l += r.width, d += .5 * r.height;
                        break;
                    case "b":
                        l += .5 * r.width, d += r.height;
                        break;
                    case "l":
                        d += .5 * r.height
                }
                l = Math.round(l + s), d = Math.round(d + i), this.setState({
                    tooltip: {
                        position: t,
                        align: n,
                        text: a,
                        x: l,
                        y: d,
                        maxWidth: o,
                        appearance: c
                    }
                })
            }
            render() {
                var e = this.renderTooltip();
                return e ? (!this.defaultNode && o() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), a.createElement(a.Fragment, null, this.props.children, r.createPortal(e, this.defaultNode))) : this.props.children
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
        n.d(t, "a", function() {
            return a
        })
    },
    dLHM: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        });
        n("rGqo"), n("Btvt");
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
        class s extends a.Component {
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
                    {
                        alignment: t,
                        value: n,
                        className: s
                    } = e,
                    o = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = {},
                            i = Object.keys(e);
                        for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                        return r
                    }(e, ["alignment", "value", "onChange", "initialValue", "className", "isControlledOutside"]),
                    c = {
                        "Input--left": "left" === t,
                        "Input--center": "center" === t,
                        "Input--right": "right" === t
                    };
                return a.createElement("input", i({}, o, {
                    className: Object(r.a)("Input", c, s),
                    ref: this.getRef,
                    value: this.isControlledOutside ? n : this.state.value,
                    onChange: this.onChange
                }))
            }
        }
        s.defaultProps = {
            type: "text",
            initialValue: "",
            alignment: "left"
        }
    },
    eTng: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        }), n.d(t, "c", function() {
            return c
        }), n.d(t, "d", function() {
            return l
        }), n.d(t, "b", function() {
            return d
        });
        var {
            intval: a
        } = window;
        n("rGqo"), n("Btvt"), n("KKXr");

        function r(e, t = []) {
            var [n, a] = e.split("_");
            return [n, a, t]
        }
        var i = {};

        function s(e) {
            if (i[e]) return i[e];
            for (var t = e ? e.length : 0, n = [], a = [], s = "", o = 0; o < t; o++) {
                var c = e[o],
                    l = c.charCodeAt(0);
                l >= 48 && l <= 57 || "_" === c || "-" === c ? s += c : "(" !== c && ")" !== c && ":" !== c && "," !== c || ("" !== s && (a.push(s), n.push("id"), s = ""), a.push(c), n.push(c))
            }
            s.length > 0 && (a.push(s), n.push("id"));
            var [d] = function e(t, n, a = 0, i = 0) {
                if (i > 50) return [
                    [], t.length
                ];
                for (var s = [], o = ""; a < t.length;) {
                    var c = t[a];
                    if ("id" === c) o = n[a];
                    else if ("," === c && o) s.push(r(o)), o = "";
                    else if ("(" === c) {
                        var [l, d] = e(t, n, a + 1, i + 1);
                        a = d, s.push(r(o, l)), o = ""
                    } else if (")" === c) return "" !== o && s.push(r(o)), [s, a];
                    a++
                }
                return o && s.push(r(o)), [s, a]
            }(n, a);
            return Object.keys(i).length > 300 && (i = {}), i[e] = d, d
        }

        function o(e, t) {
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

        function c(e) {
            return 0 == e
        }

        function l(e) {
            return e > 0 && e < 2e9
        }

        function d(e) {
            return e > 2e9
        }
    },
    enZq: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));

        function i(e) {
            var t = {
                "List--border": !!e.border
            };
            return a.createElement("ul", {
                className: Object(r.a)("List", t, e.className),
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
            return i
        }), n.d(t, "Q", function() {
            return s
        }), n.d(t, "U", function() {
            return o
        }), n.d(t, "a", function() {
            return c
        }), n.d(t, "J", function() {
            return l
        }), n.d(t, "K", function() {
            return d
        }), n.d(t, "s", function() {
            return u
        }), n.d(t, "r", function() {
            return m
        }), n.d(t, "d", function() {
            return p
        }), n.d(t, "e", function() {
            return g
        }), n.d(t, "ab", function() {
            return h
        }), n.d(t, "N", function() {
            return _
        }), n.d(t, "cb", function() {
            return b
        }), n.d(t, "bb", function() {
            return f
        }), n.d(t, "I", function() {
            return v
        }), n.d(t, "h", function() {
            return y
        }), n.d(t, "T", function() {
            return j
        }), n.d(t, "P", function() {
            return O
        }), n.d(t, "X", function() {
            return w
        }), n.d(t, "W", function() {
            return k
        }), n.d(t, "O", function() {
            return C
        }), n.d(t, "Z", function() {
            return S
        }), n.d(t, "V", function() {
            return E
        }), n.d(t, "H", function() {
            return I
        }), n.d(t, "b", function() {
            return x
        }), n.d(t, "c", function() {
            return T
        }), n.d(t, "i", function() {
            return M
        }), n.d(t, "S", function() {
            return L
        }), n.d(t, "f", function() {
            return P
        }), n.d(t, "g", function() {
            return B
        }), n.d(t, "R", function() {
            return D
        }), n.d(t, "db", function() {
            return q
        }), n.d(t, "M", function() {
            return A
        }), n.d(t, "L", function() {
            return H
        }), n.d(t, "m", function() {
            return F
        }), n.d(t, "l", function() {
            return R
        }), n.d(t, "n", function() {
            return $
        }), n.d(t, "j", function() {
            return U
        }), n.d(t, "o", function() {
            return z
        }), n.d(t, "k", function() {
            return K
        }), n.d(t, "q", function() {
            return W
        }), n.d(t, "p", function() {
            return V
        }), n.d(t, "C", function() {
            return G
        }), n.d(t, "v", function() {
            return X
        }), n.d(t, "t", function() {
            return Q
        }), n.d(t, "y", function() {
            return Y
        }), n.d(t, "B", function() {
            return J
        }), n.d(t, "D", function() {
            return Z
        }), n.d(t, "F", function() {
            return ee
        }), n.d(t, "E", function() {
            return te
        }), n.d(t, "u", function() {
            return ne
        }), n.d(t, "w", function() {
            return ae
        }), n.d(t, "z", function() {
            return re
        }), n.d(t, "A", function() {
            return ie
        }), n.d(t, "x", function() {
            return se
        }), n.d(t, "G", function() {
            return oe
        }), n.d(t, "lb", function() {
            return ce
        }), n.d(t, "Cb", function() {
            return le
        }), n.d(t, "Kb", function() {
            return de
        }), n.d(t, "Gb", function() {
            return ue
        }), n.d(t, "eb", function() {
            return me
        }), n.d(t, "mb", function() {
            return pe
        }), n.d(t, "Db", function() {
            return ge
        }), n.d(t, "nb", function() {
            return he
        }), n.d(t, "ub", function() {
            return _e
        }), n.d(t, "vb", function() {
            return be
        }), n.d(t, "rb", function() {
            return fe
        }), n.d(t, "qb", function() {
            return ve
        }), n.d(t, "Fb", function() {
            return ye
        }), n.d(t, "Bb", function() {
            return je
        }), n.d(t, "Jb", function() {
            return Oe
        }), n.d(t, "kb", function() {
            return we
        }), n.d(t, "ib", function() {
            return ke
        }), n.d(t, "jb", function() {
            return Ce
        }), n.d(t, "Mb", function() {
            return Se
        }), n.d(t, "yb", function() {
            return Ee
        }), n.d(t, "Ob", function() {
            return Ie
        }), n.d(t, "Nb", function() {
            return xe
        }), n.d(t, "tb", function() {
            return Te
        }), n.d(t, "Ab", function() {
            return Me
        }), n.d(t, "fb", function() {
            return Le
        }), n.d(t, "ob", function() {
            return Pe
        }), n.d(t, "Lb", function() {
            return Be
        }), n.d(t, "Ib", function() {
            return De
        }), n.d(t, "zb", function() {
            return Ne
        }), n.d(t, "Pb", function() {
            return qe
        }), n.d(t, "xb", function() {
            return Ae
        }), n.d(t, "wb", function() {
            return He
        }), n.d(t, "Hb", function() {
            return Fe
        }), n.d(t, "gb", function() {
            return Re
        }), n.d(t, "hb", function() {
            return $e
        }), n.d(t, "pb", function() {
            return Ue
        }), n.d(t, "sb", function() {
            return ze
        }), n.d(t, "Eb", function() {
            return Ke
        });
        n("OEbY");
        var a = n("eTng"),
            r = "event_delete",
            i = "event_set_flags",
            s = "event_replace_flags",
            o = "event_reset_flags",
            c = "event_add_message",
            l = "event_read_inbound",
            d = "event_read_outbound",
            u = "event_got_online",
            m = "event_got_offline",
            p = "event_chat_changed",
            g = "event_chat_updated",
            h = "event_typing",
            _ = "event_recoding_audio",
            b = "event_video_call",
            f = "event_unread_count",
            v = "event_notify_settings_changed",
            y = "event_empty",
            j = "event_reset_directories",
            O = "event_replace_directories",
            w = "event_set_directories",
            k = "event_resync",
            C = "event_refresh_lp_key",
            S = "transition_event",
            E = "reset_peer",
            I = "mutex",
            x = "change_peer",
            T = "event_change_tab",
            M = "event_failed_message",
            L = "event_resend",
            P = "event_delete_dialog",
            B = "event_edit_message",
            D = "event_replace_message",
            N = "event_audio_start",
            q = "event_waiting_for_reconnect",
            A = "event_reconnecting",
            H = "event_reconnected",
            F = 2,
            R = 8,
            $ = 64,
            U = 128,
            z = 65536,
            K = 1 << 21,
            W = 1,
            V = 8,
            G = 1,
            X = 2,
            Q = 3,
            Y = 4,
            J = 5,
            Z = 6,
            ee = 7,
            te = 8,
            ne = 9,
            ae = 10,
            re = 11,
            ie = 12,
            se = 13,
            oe = 3;

        function ce([, e]) {
            return {
                type: r,
                localId: e
            }
        }

        function le([, e, t, n]) {
            return {
                type: s,
                messageId: e,
                mask: t,
                peerId: n
            }
        }

        function de([, e, t, n]) {
            return {
                type: i,
                messageId: e,
                flags: t,
                peerId: n
            }
        }

        function ue([, e, t, n]) {
            return {
                type: o,
                messageId: e,
                flags: t,
                peerId: n
            }
        }

        function me([, e, t, n, r, i, s, o, l, d, u]) {
            var m = extend(s, o || void 0);
            return {
                type: c,
                messageId: intval(e),
                flags: intval(t),
                peerId: intval(n),
                date: intval(r),
                attaches: Object(a.a)(m, e),
                subject: s.title || "",
                text: i,
                kludges: m,
                randomId: intval(l),
                userId: Object(a.b)(n) ? intval(m.from) : intval(n),
                update_time: u,
                chat_local_id: d
            }
        }

        function pe(e) {
            var t = me(e);
            return t.type = B, t
        }

        function ge(e) {
            var t = me(e);
            return t.type = D, t
        }

        function he(e) {
            return extend({}, e, {
                type: B
            })
        }

        function _e([, e, t, n]) {
            return {
                type: l,
                peerId: e,
                upToId: t,
                unread: n
            }
        }

        function be([, e, t, n]) {
            return {
                type: d,
                peerId: e,
                upToId: t,
                unread: n
            }
        }

        function fe([, e, t, n]) {
            return {
                type: u,
                userId: -e,
                platform: t,
                lastSeenTs: n
            }
        }

        function ve([, e, t, n]) {
            return {
                type: m,
                userId: -e,
                reason: t,
                lastSeenTs: n
            }
        }

        function ye([, e, t, n = !1]) {
            return {
                type: j,
                peerId: e,
                mask: t,
                local: n
            }
        }

        function je([, e, t]) {
            return {
                type: O,
                peerId: e,
                mask: t
            }
        }

        function Oe([, e, t, n = !1]) {
            return {
                type: w,
                peerId: e,
                mask: t,
                local: n
            }
        }

        function we([, e, t]) {
            return {
                type: P,
                peerId: e,
                localId: t
            }
        }

        function ke([, e, t]) {
            return {
                type: p,
                chatId: e,
                self: t
            }
        }

        function Ce([, e, t, n]) {
            return {
                type: g,
                peerId: t,
                updateType: e,
                updateArg: n
            }
        }

        function Se([, e, t, n, a]) {
            return {
                type: h,
                peerId: e,
                userIds: t,
                totalCount: n,
                ts: a
            }
        }

        function Ee([, e, t, n, a]) {
            return {
                type: _,
                peerId: e,
                userIds: t,
                totalCount: n,
                ts: a
            }
        }

        function Ie([, e, t]) {
            return {
                type: b,
                userId: e,
                callId: t
            }
        }

        function xe([, e, t, n]) {
            return {
                type: f,
                count: e,
                countNotMuted: t,
                showOnlyNotMuted: n
            }
        }

        function Te([, e = {}]) {
            return {
                type: v,
                peerId: e.peer_id,
                sound: e.sound,
                disabledUntil: e.disabled_until
            }
        }

        function Me([, e = {}]) {
            var t = me([!1, e.id, e.flags, e.peer_id, e.date, e.message, extend(e.kludges, {
                title: e.title || ""
            }), {}, e.random_id, e.chat_local_id, e.update_time]);
            return t.type = B, t
        }

        function Le([, e = {}]) {
            return {
                type: N,
                uuid: e.uuid,
                deviceName: e.device_name || ""
            }
        }

        function Pe(e) {
            return {
                type: y,
                params: e
            }
        }

        function Be(e) {
            return {
                type: S,
                state: e
            }
        }

        function De() {
            return {
                type: k
            }
        }

        function Ne([, e, t]) {
            return {
                type: C,
                key: e,
                url: t
            }
        }

        function qe([, e]) {
            return {
                type: q,
                timeout: e
            }
        }

        function Ae() {
            return {
                type: A
            }
        }

        function He() {
            return {
                type: H
            }
        }

        function Fe(e = !1, t = !1) {
            return {
                type: E,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Re(e, t = !1, n = !1, a = !1, r = "") {
            return {
                type: x,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: a,
                entryPoint: r
            }
        }

        function $e(e) {
            return {
                type: T,
                tab: e
            }
        }

        function Ue(e, t, n) {
            return {
                type: M,
                message: t,
                peer: e,
                error: n
            }
        }

        function ze([e, t, n, a, r, i]) {
            return {
                type: I,
                free: !!intval(t) || intval(r) === vk.id,
                resource: n,
                peerId: intval(a),
                who: intval(r),
                name: i
            }
        }

        function Ke(e, t) {
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
            return a
        });
        n("Btvt");

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
        var a = n("uQjJ");

        function r() {
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
            r() ? window.addEvent(e, t, n, {
                passive: !0
            }) : window.addEvent(e, t, n)
        }

        function c(e, t, n) {
            r() ? window.removeEvent(e, t, n, {
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
        extend(s.prototype, a.a.prototype), extend(s.prototype, {
            stop: function() {
                this.started = !1, c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), r() && this._isTopLevel() && d() && c(document, d(), this.onVisiblityChange), r() && i || (c(this.opts.focusElement, "focus", this.cbActiveB), c(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
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
                var {
                    focusElement: e
                } = this.opts;
                return e === window || e === document
            },
            _isFocused() {
                var {
                    focusElement: e
                } = this.opts;
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
            return a
        }), n.d(t, "f", function() {
            return r
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
            return M
        });
        n("Oyvg");
        var a = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            r = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
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
            M = `(^|[s.,:'";>)(]?)(${`(#${T}{0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))${T}{0,100})`})(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'"&;?<)(]?)`
    },
    hIV1: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
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
                className: Object(r.a)("SubmitArea", t),
                style: e.style
            }, e.children)
        }
    },
    hOuX: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return r
        });
        var a = 2147483647;

        function r() {
            try {
                if (window.crypto) {
                    var e = new Int32Array(1);
                    return crypto.getRandomValues(e), Math.abs(e.reduce((e, t) => e + t))
                }
            } catch (e) {}
            return intval(rand(0, a).toFixed(0))
        }
    },
    iN1s: function(e, t, n) {
        "use strict";
        n("rGqo"), n("Btvt");
        var a = n("DM26"),
            r = n("BxOC"),
            i = n("f01n"),
            s = 202,
            o = 7,
            c = 4,
            l = -3,
            d = -4,
            u = -5;

        function m(e, t) {
            e.waitAbortFns.push(t)
        }

        function p(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var {
                request: t,
                cancel: n
            } = Object(r.a)(e.url, {
                act: "a_check",
                key: e.key,
                version: e.version,
                ts: e.ts,
                wait: 25,
                mode: e.mode
            });
            return e.stopFn = n, t.then(([t, n]) => (e.onData(e, n), e.waitTimeout = 2, JSON.parse(t))).catch(([t, n]) => {
                throw e.onData(e, n), ""
            }).then(t => (function(e, t) {
                var {
                    abort: n,
                    pause: r
                } = t.failed ? Object(a.a)(c, null) : {};
                switch (t.failed) {
                    case 1:
                        return m(e, n), e.onHistoryLost(e, t).then(() => e.onResult({
                            ts: t.ts,
                            updates: [
                                [-1]
                            ]
                        })).then(r).then(() => p(e));
                    case 2:
                        return m(e, n), e.onKeyExpired(e, t).then(([t, n, a, r]) => e.onResult({
                            ts: +r,
                            updates: [
                                [-2, t, `${n}/${a}`],
                                [-1]
                            ]
                        })).then(r).then(() => p(e));
                    case 3:
                        return e.onLpBroken(e, t);
                    default:
                        return t
                }
            })(e, t))
        }

        function g(e) {
            e.isStoppedFn() || p(e).then(e.onResult).then(() => e.isReconnecting && h(e, u)).catch(t => (function(e, t) {
                if (e.isStoppedFn()) return;
                e.onRequestError(t), e.waitTimeout = Math.min(60, 2 * e.waitTimeout), h(e, l);
                var {
                    abort: n,
                    pause: r
                } = Object(a.a)(e.waitTimeout, null);
                return m(e, n), r().then(() => h(e, d))
            })(e, t)).then(() => g(e))
        }

        function h(e, t) {
            e.isReconnecting = t === d, e.onResult({
                ts: e.ts,
                updates: [
                    [t, e.waitTimeout]
                ]
            })
        }

        function _(e, t) {
            var n = !!e.stopped,
                a = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: e.version || o,
                    mode: s,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: () => n,
                    onResult: e => {
                        e.ts && c(a.ts, e.ts, function(e) {
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
                                    case l:
                                        return i.Pb(e);
                                    case d:
                                        return i.xb();
                                    case u:
                                        return i.wb();
                                    default:
                                        return i.ob(e)
                                }
                            })
                        }(e.updates))
                    },
                    onData: b(t.onData),
                    onRequestError: b(t.onRequestError),
                    onHistoryLost: f(t.onHistoryLost),
                    onKeyExpired: f(t.onKeyExpired),
                    onLpBroken: f(t.onHistoryLost)
                },
                {
                    onEvents: r
                } = t;

            function c(e, t, n) {
                a.ts = t;
                for (var s = 0; s < n.length; ++s) n[s].type === i.O && (a.key = n[s].key, a.url = n[s].url);
                r(e, t, n)
            }
            var m = {
                options: a,
                isStopped: () => n,
                stopConnection() {
                    n = !0, a.stopFn && a.stopFn(), a.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection() {
                    this.stopConnection(), h(a, d), n = !1, g(a)
                },
                abortWaiting() {
                    a.waitAbortFns.forEach(e => e()), a.waitAbortFns = [], a.waitTimeout = 2
                },
                onLp: c
            };
            return g(a), m
        }

        function b(e) {
            return e || (() => {})
        }

        function f(e) {
            return e ? (...t) => Promise.resolve(e(...t)) : () => Promise.reject()
        }
        var v = n("P+eJ"),
            y = n("vT4u");

        function j(e, t) {
            return _(e, {
                onEvents: t,
                onData: C,
                onRequestError: S,
                onHistoryLost: E,
                onKeyExpired: I,
                onLpBroken: x
            })
        }
        n.d(t, "a", function() {
            return j
        });
        var O = 3e4,
            w = {},
            k = Date.now();

        function C(e, t) {
            if (t && t.status && e.lpstat) {
                var n = t.status;
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, n, t.getResponseHeader("x-frontend")), w[n] = n in w ? w[n] + 1 : 1, Date.now() - k >= O && (Object.keys(w).forEach(e => {
                    statlogsValueEvent("fc_longpoll", w[e], e, t.getResponseHeader("x-frontend"))
                }), w = {}, k = Date.now())
            }
        }

        function S(e) {
            Object(v.b)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function E(e, t) {
            Object(v.b)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function I(e) {
            return Object(v.b)("red", "LP failed: key is incorrect; refresh key"), Object(r.b)(y.e, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function x() {
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
        var a = n("rHUl"),
            r = n("aong"),
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
            var s = Object(r.q)(e);
            return !x(Object(a.u)(s, n || s.peer), t) && S(e, h, n, i)
        }

        function j(e, t, n) {
            return S(e, m, t, n)
        }

        function O(e, t, n, s) {
            var o = Object(r.q)(e);
            if (function(e, t) {
                    var n = Object(r.q)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, b)) return !0;
            var c = Object(a.u)(o, n || o.peer);
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
            return !Object(a.D)(n) || !!Object(a.u)(e, t).caccess[n]
        }

        function S(e, t, n, s) {
            var o = Object(r.q)(e);
            s = void 0 === s ? window.vk.id : s, n = void 0 === n ? o.peer : n;
            var c = Object(a.u)(o, n),
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
        var a = n("q1tI"),
            r = (n("17x9"), n("i8i4")),
            i = n("pemR"),
            s = "Select...";
        class o extends a.Component {
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
                this.el = r.findDOMNode(this), document.addEventListener("click", this.handleDocumentClick, !1), document.addEventListener("touchend", this.handleDocumentClick, !1)
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
                    r = void 0 !== e.label ? e.label : e;
                return a.createElement("div", {
                    key: n,
                    className: t,
                    onMouseDown: () => this.setValue(n, r),
                    onClick: () => this.setValue(n, r)
                }, r)
            }
            buildMenu() {
                var e = this.state.filteredOptions.map(e => "group" === e.type ? a.createElement("div", {
                    className: "Select__group",
                    key: e.name
                }, e.name && a.createElement("div", {
                    className: "Select__title"
                }, e.name), e.items.map(e => this.renderOption(e))) : this.renderOption(e));
                return e.length ? e : a.createElement("div", {
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
                return this.props.searchable ? a.createElement("input", {
                    placeholder: this.props.placeholder,
                    className: "Select__input",
                    value: e,
                    onClick: this.handleMouseDown,
                    onChange: this.handleSearchType.bind(this)
                }) : a.createElement("div", {
                    className: "Select__control",
                    onClick: this.handleMouseDown
                }, a.createElement("div", {
                    className: "Select__placeholder"
                }, e), a.createElement("span", {
                    className: "Select__arrow"
                }))
            }
            render() {
                var {
                    className: e,
                    appearance: t,
                    style: n,
                    searchable: r
                } = this.props, s = r ? "secondary" : t, o = Object(i.a)("Select", `Select--${s}`, e, {
                    "Select--opened": this.state.opened,
                    "Select--disabled": this.props.disabled,
                    "Select--empty": !this.state.selected.value
                }), c = "string" == typeof this.state.selected ? this.state.selected : this.state.selected.label, l = this.buildControl(c);
                return a.createElement("div", {
                    className: o,
                    style: n
                }, l, this.state.opened && a.createElement("div", {
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
            return i
        }), n.d(t, "a", function() {
            return s
        }), n.d(t, "b", function() {
            return o
        }), n.d(t, "d", function() {
            return c
        });
        var {
            Emoji: a
        } = window, r = (n("Oyvg"), n("pIFo"), [
            ["&amp;", "&"],
            ["&lt;", "<"],
            ["&gt;", ">"],
            ["&quot;", '"']
        ]);

        function i(e) {
            return r.reduce((e, [t, n]) => e.replace(new RegExp(n, "ig"), t), e)
        }

        function s(e) {
            return r.reduce((e, [t, n]) => e.replace(new RegExp(t, "ig"), n), e).replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(t))
        }

        function o(e) {
            return i(e).replace(/[\u00A0-\u9999<>\&]/gim, e => `&#${e.charCodeAt(0)};`)
        }

        function c(e, {
            lineBreak: t = !1,
            convertEmoji: n = !0
        } = {}) {
            var r = s(e);
            return r = r.replace(/\n\r/gi, "\n"), "oneline" === t ? r = r.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === t && (r = r.replace(/\n/gi, "<br>")), r = i(r), n && (r = a.emojiToHTML(r, !0)), r
        }
    },
    nyd8: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return s
        });
        var {
            nav: a,
            extend: r
        } = window;
        n("rGqo"), n("Btvt");

        function i(e) {
            var t = r({}, a.objLoc, e);
            Object.keys(t).filter(e => "" === t[e]).forEach(e => {
                delete t[e]
            });
            var n = a.toStr(t);
            a.setLoc(n)
        }

        function s() {
            var e = {};
            return {
                scheduleNav(t) {
                    e = r(e, t)
                },
                commitNav() {
                    i(e), e = {}
                },
                scheduleNavWithTimeOut(t, n = 100) {
                    e = r(e, t), setTimeout(() => {
                        i(e), e = {}
                    }, n)
                }
            }
        }
    },
    "p+C8": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        });
        n("rGqo"), n("Btvt");
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

        function s(e) {
            var {
                icon: t,
                aside: n,
                chevron: s,
                selectable: o,
                border: c,
                className: l,
                children: d,
                active: u,
                canBeHovered: m = !0
            } = e, p = function(e, t) {
                if (null == e) return {};
                var n, a, r = {},
                    i = Object.keys(e);
                for (a = 0; a < i.length; a++) n = i[a], t.indexOf(n) >= 0 || (r[n] = e[n]);
                return r
            }(e, ["icon", "aside", "chevron", "selectable", "border", "className", "children", "active", "canBeHovered"]), g = {
                "ListItem--chevron": !!s,
                "ListItem--selectable": !!o,
                "ListItem--border": !!c,
                "ListItem--active": !!u,
                "ListItem--can-be-hovered": m
            };
            return a.createElement("li", i({}, p, {
                className: Object(r.a)("ListItem", g, l)
            }), t && a.createElement("div", {
                className: "ListItem__icon"
            }, t), a.createElement("div", {
                className: "ListItem__main"
            }, d), a.createElement("div", {
                className: "ListItem__aside"
            }, n))
        }
        s.defaultProps = {
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
            return c
        }), n.d(t, "c", function() {
            return l
        }), n.d(t, "f", function() {
            return d
        }), n.d(t, "d", function() {
            return p
        }), n.d(t, "a", function() {
            return g
        }), n.d(t, "b", function() {
            return h
        });
        n("SRfc"), n("Oyvg"), n("pIFo");
        var a, r = n("h++7"),
            {
                clean: i,
                replaceEntities: s,
                statlogsValueEvent: o
            } = window;

        function c(e, t) {
            for (var n, a = 0, i = e; null !== (n = r.s.exec(e));) {
                var s = (n = u(n))[0].length,
                    o = n.index + s,
                    c = e[n.index - 1],
                    l = e[o - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    p = void 0 !== l && /([:;$])/i.test(l);
                if (!d && !p) {
                    var g = m(n),
                        h = g.domain.toLowerCase();
                    if (h.length <= r.p && -1 !== r.y.indexOf(h)) {
                        var _ = t(g);
                        i = i.slice(0, n.index + a) + _ + i.slice(o + a), a += _.length - s
                    }
                }
            }
            return i
        }

        function l(e, t) {
            return e.replace(r.c, t || function(e) {
                return `<a href="mailto:${e}">${e}</a>`
            })
        }

        function d(e, t) {
            return e.replace(r.q, t || function(e, t, n, a, r) {
                return `<a href="/${t+n}" class="mem_link" mention="${i(a||"")}" mention_id="${i(t+n)}" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">${r}</a>`
            })
        }

        function u(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function m(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function p(e, t) {
            return e.replace((a || (a = new RegExp(r.x, "ig")), a), (e, n, a, r, i, s) => (n || "") + t(a + (i || "")))
        }

        function g(e) {
            o("ttl_message_confirm_delivery", e)
        }

        function h(e, t) {
            var {
                protocol: n,
                url: a,
                query: o,
                domain: c,
                full: l
            } = t;
            try {
                l = decodeURIComponent(l)
            } catch (e) {}
            if (l.length > 55 && (l = l.substr(0, 53) + ".."), l = i(l).replace(/&amp;/g, "&"), !e && c.match(r.t)) {
                var d, u = a = s(a).replace(r.f, encodeURIComponent),
                    m = a.indexOf("#/"),
                    p = "";
                return m >= 0 ? u = a.substr(m + 1) : (m = a.indexOf("#!")) >= 0 && (u = "/" + a.substr(m + 2).replace(/^\//, "")), (d = u.match(r.B)) && d[1].length < 32 && (p = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + a + o) + '" target="_blank" rel="noopener"' + p + ">" + l + "</a>"
            }
            return `<a href="${`away.php?utf=1&to=${encodeURIComponent(n+s(a+o))}`}" target="_blank" rel="noopener" onclick="${`return goAway('${i((n+a+o).replace(/'/g,"\\'"))}', {}, event);`}">${l}</a>`
        }
    },
    rCUf: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return r
        }), n.d(t, "b", function() {
            return s
        }), n.d(t, "d", function() {
            return o
        });
        n("pIFo");
        var a = n("8h6g");

        function r(e) {
            var t = a.b.slice(0, a.b.length);
            if ("types" === e) {
                for (var n = t.length, r = 0; r < n; ++r) t.push(t[r].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + a.b.join(",.") : ""
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
                    var a = void 0 !== e.ind ? e.ind : e;
                    show("_im_media_preview"), s.showMediaProgress && s.showMediaProgress("video", a, function(e, t, n) {
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
                })), cur.maxFiles = (cur.chooseParams || {}).maxFiles || 10;
                var l = cur.maxFiles - (cur.savedVideos || []).length,
                    d = browser.safari ? "" : "video/*," + r("accept");
                n.lang && (cur.lang = extend(cur.lang || {}, n.lang));
                var u = {
                        accept: d,
                        file_input: null,
                        file_name: "video_file",
                        file_size_limit: 1024 * (n.options.file_size_limit_in_GB || a.c) * 1024 * 1024,
                        file_types_description: "Video files",
                        file_types: r("types"),
                        chooseBox: 1,
                        chunked: 1,
                        chunkSize: a.a,
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

        function o(e, t, n, a) {
            n = n || cur;
            var r = void 0 !== e.ind ? e.ind : e,
                i = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                s = i ? r + "_" + i : e,
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
                    var r = t.owner_id,
                        i = t.video_id,
                        c = t.video_hash,
                        l = 0,
                        d = () => {
                            ajax.post("al_video.php?act=encode_progress", {
                                oid: r,
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
            return M
        }), n.d(t, "f", function() {
            return L
        }), n.d(t, "L", function() {
            return P
        }), n.d(t, "F", function() {
            return B
        }), n.d(t, "R", function() {
            return D
        }), n.d(t, "G", function() {
            return N
        }), n.d(t, "x", function() {
            return q
        }), n.d(t, "Q", function() {
            return A
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
            return ae
        });
        n("Vd3H"), n("rGqo"), n("Btvt");
        var a = n("MhhX"),
            r = n("f01n"),
            i = n("h++7"),
            s = n("86+7"),
            o = n("rjmT"),
            c = n("aong"),
            l = n("lJdi");

        function d(e, t) {
            var n = Object(c.q)(e),
                r = n.tabs[n.peer];
            return Object.keys(r.msgs).filter(n => {
                var i = C(e, t, n);
                return !Object(a.k)(i) && intval(n) > r.in_up_to
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
            var {
                keyboard: n
            } = h(e, t) || {};
            return n
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
            var r = h(e, t),
                i = b(e)[0];
            if (void 0 === i) return [n];
            var s = Math.min(n, i),
                o = Math.max(n, i);
            return Object.keys(r.msgs).filter(e => e >= s && e <= o).filter(t => {
                var n = C(e, e.get().peer, t);
                return !Object(a.l)(n) && !Object(a.e)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = h(Object(c.q)(t), e),
                r = 0;
            for (var i in n.msgs)
                if (n.msgs.hasOwnProperty(i)) {
                    var s = C(t, e, i);
                    Object(a.k)(s) || (r += Object(a.n)(n, s) ? 1 : 0)
                }
            return r
        }

        function y(e, t, n) {
            return !! function(e, t, n) {
                var a = h(e, t);
                return Object.keys(a.msgs).filter(a => intval(C(e, t, a).randomId) === n).length > 0
            }(e, t, n)
        }

        function j(e, t) {
            var n = Object(c.q)(e),
                a = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== a ? 2e9 + a : t
        }

        function O(e, t, n) {
            var a = h(e, t),
                i = C(e, t, n),
                s = Object.keys(a.msgs).filter(n => {
                    var a = C(e, t, n),
                        s = a.local && a.type !== r.g;
                    return !(!i.local && s) && (!(!i.local || s) || j(e, i.messageId) > j(e, a.messageId))
                }).pop();
            return s ? C(e, t, s) : null
        }

        function w(e) {
            return e && e.length > 0 ? r.eb([0].concat(e)) : e
        }

        function k(e, t, n) {
            var r = h(e, t),
                i = C(e, t, n),
                o = Object(c.q)(e);
            return Object(a.k)(i) ? Object(s.c)(e, o.id).name : i.userId !== i.peerId ? !!Object(s.b)(e, i.userId) && Object(s.c)(e, i.userId).name : r.tab
        }

        function C(e, t, n) {
            var a = h(e, t),
                r = a && a.msgs && a.msgs[n];
            return r ? w(r) : null
        }

        function S(e, t, n) {
            var a = h(e, t),
                r = a && a.msgs && Object.keys(a.msgs).sort((e, t) => +e - t);
            if (!r) return null;
            var i = r && r.indexOf("" + n),
                s = i > -1 ? r[i - 1] : null;
            return a.msgs[s]
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

        function M(e, t) {
            return !!(t.peerId > 2e9 && Object(l.m)(t, 1024))
        }

        function L(e, t) {
            var n = Object(c.q)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function P(e) {
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

        function q(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function A(e) {
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

        function ae({
            type: e,
            updateType: t
        }) {
            return e === r.e && (t === r.A || t === r.x)
        }
    },
    rjmT: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        }), n.d(t, "b", function() {
            return c
        });
        n("KKXr"), n("Btvt"), n("OEbY"), n("pIFo");
        var a = n("BxOC"),
            r = n("f01n"),
            i = n("vT4u");

        function s(e, t) {
            this._db = e, this._key = t, this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.load()
        }

        function o(e) {
            switch (e.type) {
                case "mail":
                case "reply":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function c(e, t) {
            return new s(e, "draft_" + t)
        }
        s.prototype.dump = function() {
            this._key && this._db.updateByKey(this._key, function(e) {
                return {
                    txt: e.txt,
                    attaches: e.attaches.length ? e.attaches : void 0,
                    urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                    cancelled: e.cancelled.length ? e.cancelled : void 0
                }
            }(this.dData))
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
        }, s.prototype.syncWithSelector = function(e) {
            var t = this.getFwdRaw();
            this.dData.attaches = (t ? [t] : []).concat(e.getMedias().map(([e, t]) => {
                return this.dData.attaches.find(n => n.type == e && n.id == t) || {
                    type: e,
                    id: t
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
            var t = this.dData.urlBinds.find(t => t.url === e);
            return t && this.dData.attaches.find(e => e.type === t.type && e.id === t.id) || null
        }, s.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(e => "share" === e.type);
            if (e && e.object) return e.object.url.replace(/&amp;/g, "&")
        }, s.prototype.hasOnlyReplies = function(e = null) {
            return e ? e.flags & r.k && !this.dData.attaches.find(e => "mail" !== e.type) : this.hasAttaches() && !this.dData.attaches.find(e => "reply" !== e.type)
        }, s.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, s.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, s.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, s.prototype.prepareObjects = function(e, t) {
            return this.dData.attaches.find(o) ? Object(a.b)(i.e, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(e => [e.type, e.id]).join("*")
            }).then(([e]) => {
                this.dData.attaches = e.map(e => ({
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }))
            }) : Promise.resolve()
        }, s.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(e => "mail" === e.type || "reply" === e.type)
        }, s.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    "uW+i": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        n("rGqo"), n("Btvt");
        var a = n("q1tI"),
            r = (n("17x9"), n("pemR"));
        class i extends a.Component {
            constructor(e) {
                super(e), this.getActiveTab = (() => {
                    var e = this.props.active,
                        t = [],
                        n = null;
                    return this.props.children.forEach(a => {
                        a.key === e ? n = a : t.push(a)
                    }), n || (Number.isInteger(e) && t.length > e ? t[e] : t[0])
                }), this.onClick = ((e, t) => {
                    if (t !== this.state.active) {
                        var n = this.refsStore[t],
                            a = this.getTransform(n);
                        this.setState({
                            active: t,
                            isAnimating: !0,
                            transform: a
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
                    className: Object(r.a)("Tabs", this.props.className, e),
                    style: this.props.style
                }, a.createElement("ul", {
                    className: "Tabs__list"
                }, this.props.children.map((e, t) => a.createElement("li", {
                    className: Object(r.a)("Tabs__item", {
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
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return r
        }), n.d(t, "c", function() {
            return c
        });
        var a = "recent_search",
            r = "pin_hide";

        function i(e) {
            return "im_store_" + e
        }

        function s(e) {
            return ls.get(i(e)) || {}
        }

        function o(e, t, n) {
            if (ls.checkVersion()) {
                var a = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", a.length), n(i(e), a)
            }
        }

        function c(e) {
            var t = debounce((e, t) => {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && function(e, t) {
                for (var n = ["fwd", "draft", "bind_attach"], a = s(e), r = !1, i = n.length; i--;) n[i] in a && (delete a[n[i]], r = !0);
                r && o(e, a, t)
            }(e, t);
            var n = {
                    db: s(e),
                    checkTime: Date.now()
                },
                c = function(e, t, n) {
                    n.key === i(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", c, !1), {
                select: (t, i) => (Date.now() - n.checkTime > 1e3 && (n.db = s(e)), function(e, t, n) {
                    return t === a ? e[t] || [] : t === r ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                }(n.db, t, i)),
                selectByKey: t => (Date.now() - n.checkTime > 1e3 && (n.db = s(e)), n.db[t]),
                update(i, s) {
                    var c = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case a:
                                var i = n;
                                i && i.length > 0 ? e[t] = i : delete e[t];
                                break;
                            case r:
                                var [s, o] = n;
                                o ? e[t][s] = +o : delete e[t][s]
                        }
                        return e
                    }(n.db, i, s);
                    return n.db = c, n.checkTime = Date.now(), o(e, c, t)
                },
                updateByKey: (a, r) => (n.db[a] = r, n.checkTime = Date.now(), o(e, n.db, t)),
                unmount() {
                    window.removeEventListener("storage", c, !1)
                }
            }
        }
    },
    vRp6: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var a = n("q1tI"),
            r = (n("17x9"), n("UlUB")),
            i = n("PjZB"),
            s = n("pemR");
        class o extends a.Component {
            constructor(e) {
                super(e), this.checkLoad = Object(r.a)(e => {
                    var [t, n, a] = e;
                    if (!this.loading) return this.props.virtualized || this.props.hasMore ? void(n - t - a <= this.props.threshold && (this.loading = !0, this.props.loadMore().then(() => {
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
                    a = this.getChildrenData(e, t || this.getScrollData()),
                    {
                        start: r,
                        end: i,
                        before: s,
                        after: o
                    } = a;
                r === n.start && i === n.end && s === n.before && o === n.after || this.setState(a)
            }
            getChildrenData(e, [t, n, a]) {
                var r = this.useWindowScroll ? window : this.container,
                    i = r && r.offsetHeight;
                if (!r || 0 === n || 0 === a) return {
                    start: 0,
                    end: 0,
                    before: 0,
                    after: e.length
                };
                a = Math.max(a, i);
                var s = e.length,
                    o = Math.max(Math.floor(t / this.props.itemHeight) - 1, 0),
                    c = Math.min(Math.floor((t + 2 * a) / this.props.itemHeight + 1), s);
                return {
                    start: o,
                    end: c,
                    before: o,
                    after: s - c
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
                    className: Object(s.a)("InfiniteScroll", this.props.className),
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
                }, a.createElement(i.a, null))))
            }
        }
        o.defaultProps = {
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
            return j
        }), n.d(t, "b", function() {
            return O
        }), n.d(t, "d", function() {
            return w
        }), n.d(t, "c", function() {
            return k
        }), n.d(t, "a", function() {
            return I
        }), n.d(t, "jb", function() {
            return x
        }), n.d(t, "Bc", function() {
            return P
        }), n.d(t, "Qc", function() {
            return B
        }), n.d(t, "sb", function() {
            return D
        }), n.d(t, "Vb", function() {
            return N
        }), n.d(t, "Jb", function() {
            return q
        }), n.d(t, "jc", function() {
            return H
        }), n.d(t, "kc", function() {
            return R
        }), n.d(t, "p", function() {
            return $
        }), n.d(t, "ad", function() {
            return U
        }), n.d(t, "oc", function() {
            return z
        }), n.d(t, "qb", function() {
            return K
        }), n.d(t, "mb", function() {
            return W
        }), n.d(t, "Fb", function() {
            return G
        }), n.d(t, "nb", function() {
            return X
        }), n.d(t, "ob", function() {
            return Q
        }), n.d(t, "xc", function() {
            return Y
        }), n.d(t, "Qb", function() {
            return J
        }), n.d(t, "hd", function() {
            return ne
        }), n.d(t, "F", function() {
            return ae
        }), n.d(t, "h", function() {
            return re
        }), n.d(t, "wb", function() {
            return se
        }), n.d(t, "xb", function() {
            return oe
        }), n.d(t, "T", function() {
            return ce
        }), n.d(t, "Eb", function() {
            return le
        }), n.d(t, "yb", function() {
            return de
        }), n.d(t, "cd", function() {
            return ue
        }), n.d(t, "pc", function() {
            return me
        }), n.d(t, "Pc", function() {
            return pe
        }), n.d(t, "jd", function() {
            return ge
        }), n.d(t, "lc", function() {
            return be
        }), n.d(t, "D", function() {
            return fe
        }), n.d(t, "C", function() {
            return ve
        }), n.d(t, "j", function() {
            return ye
        }), n.d(t, "t", function() {
            return je
        }), n.d(t, "E", function() {
            return Oe
        }), n.d(t, "Pb", function() {
            return we
        }), n.d(t, "pb", function() {
            return ke
        }), n.d(t, "g", function() {
            return Ce
        }), n.d(t, "sc", function() {
            return Se
        }), n.d(t, "vc", function() {
            return Ee
        }), n.d(t, "rc", function() {
            return Ie
        }), n.d(t, "cc", function() {
            return xe
        }), n.d(t, "dc", function() {
            return Te
        }), n.d(t, "ub", function() {
            return Me
        }), n.d(t, "ic", function() {
            return Pe
        }), n.d(t, "ec", function() {
            return Be
        }), n.d(t, "fc", function() {
            return De
        }), n.d(t, "Bb", function() {
            return Ne
        }), n.d(t, "ib", function() {
            return qe
        }), n.d(t, "gc", function() {
            return Ae
        }), n.d(t, "X", function() {
            return He
        }), n.d(t, "Y", function() {
            return Fe
        }), n.d(t, "m", function() {
            return Re
        }), n.d(t, "v", function() {
            return $e
        }), n.d(t, "hc", function() {
            return ze
        }), n.d(t, "kb", function() {
            return Ke
        }), n.d(t, "eb", function() {
            return We
        }), n.d(t, "Nb", function() {
            return Ve
        }), n.d(t, "Mb", function() {
            return Ge
        }), n.d(t, "Lb", function() {
            return Xe
        }), n.d(t, "Ob", function() {
            return Qe
        }), n.d(t, "Wb", function() {
            return Ye
        }), n.d(t, "Xb", function() {
            return Je
        }), n.d(t, "f", function() {
            return et
        }), n.d(t, "Gb", function() {
            return tt
        }), n.d(t, "nc", function() {
            return nt
        }), n.d(t, "mc", function() {
            return at
        }), n.d(t, "K", function() {
            return rt
        }), n.d(t, "Cb", function() {
            return it
        }), n.d(t, "B", function() {
            return st
        }), n.d(t, "I", function() {
            return ot
        }), n.d(t, "Sc", function() {
            return ct
        }), n.d(t, "gb", function() {
            return lt
        }), n.d(t, "i", function() {
            return dt
        }), n.d(t, "hb", function() {
            return ut
        }), n.d(t, "s", function() {
            return mt
        }), n.d(t, "rb", function() {
            return pt
        }), n.d(t, "Rc", function() {
            return gt
        }), n.d(t, "cb", function() {
            return _t
        }), n.d(t, "Zb", function() {
            return bt
        }), n.d(t, "Lc", function() {
            return ft
        }), n.d(t, "yc", function() {
            return vt
        }), n.d(t, "uc", function() {
            return yt
        }), n.d(t, "G", function() {
            return jt
        }), n.d(t, "Uc", function() {
            return Ot
        }), n.d(t, "Zc", function() {
            return wt
        }), n.d(t, "tb", function() {
            return kt
        }), n.d(t, "J", function() {
            return Ct
        }), n.d(t, "qc", function() {
            return St
        }), n.d(t, "P", function() {
            return Et
        }), n.d(t, "Db", function() {
            return It
        }), n.d(t, "w", function() {
            return xt
        }), n.d(t, "Yb", function() {
            return Tt
        }), n.d(t, "Mc", function() {
            return Mt
        }), n.d(t, "tc", function() {
            return Lt
        }), n.d(t, "V", function() {
            return Pt
        }), n.d(t, "gd", function() {
            return Bt
        }), n.d(t, "q", function() {
            return Dt
        }), n.d(t, "Tc", function() {
            return Nt
        }), n.d(t, "ac", function() {
            return qt
        }), n.d(t, "H", function() {
            return At
        }), n.d(t, "o", function() {
            return Ht
        }), n.d(t, "Wc", function() {
            return Rt
        }), n.d(t, "Jc", function() {
            return $t
        }), n.d(t, "vb", function() {
            return Ut
        }), n.d(t, "O", function() {
            return zt
        }), n.d(t, "Hb", function() {
            return Kt
        }), n.d(t, "Hc", function() {
            return Wt
        }), n.d(t, "y", function() {
            return Vt
        }), n.d(t, "Ub", function() {
            return Gt
        }), n.d(t, "Ac", function() {
            return Xt
        }), n.d(t, "ed", function() {
            return Qt
        }), n.d(t, "W", function() {
            return Yt
        }), n.d(t, "u", function() {
            return Jt
        }), n.d(t, "Cc", function() {
            return Zt
        }), n.d(t, "Xc", function() {
            return en
        }), n.d(t, "Gc", function() {
            return tn
        }), n.d(t, "Yc", function() {
            return nn
        }), n.d(t, "Dc", function() {
            return an
        }), n.d(t, "l", function() {
            return rn
        }), n.d(t, "zc", function() {
            return sn
        }), n.d(t, "Ic", function() {
            return on
        }), n.d(t, "dd", function() {
            return cn
        }), n.d(t, "U", function() {
            return ln
        }), n.d(t, "Z", function() {
            return dn
        }), n.d(t, "M", function() {
            return un
        }), n.d(t, "Rb", function() {
            return mn
        }), n.d(t, "db", function() {
            return pn
        }), n.d(t, "bc", function() {
            return gn
        }), n.d(t, "Sb", function() {
            return hn
        }), n.d(t, "Kb", function() {
            return _n
        }), n.d(t, "Ab", function() {
            return bn
        }), n.d(t, "Oc", function() {
            return fn
        }), n.d(t, "zb", function() {
            return vn
        }), n.d(t, "Nc", function() {
            return yn
        }), n.d(t, "Q", function() {
            return jn
        }), n.d(t, "N", function() {
            return On
        }), n.d(t, "L", function() {
            return kn
        }), n.d(t, "Vc", function() {
            return Cn
        }), n.d(t, "Ib", function() {
            return Sn
        }), n.d(t, "bb", function() {
            return En
        }), n.d(t, "ab", function() {
            return In
        }), n.d(t, "Fc", function() {
            return xn
        }), n.d(t, "Ec", function() {
            return Tn
        }), n.d(t, "r", function() {
            return Mn
        }), n.d(t, "R", function() {
            return Ln
        }), n.d(t, "id", function() {
            return Pn
        }), n.d(t, "S", function() {
            return Bn
        }), n.d(t, "k", function() {
            return Dn
        }), n.d(t, "fb", function() {
            return Nn
        }), n.d(t, "wc", function() {
            return qn
        }), n.d(t, "z", function() {
            return An
        }), n.d(t, "Kc", function() {
            return Hn
        }), n.d(t, "lb", function() {
            return Fn
        }), n.d(t, "n", function() {
            return Rn
        }), n.d(t, "A", function() {
            return $n
        }), n.d(t, "x", function() {
            return Un
        }), n.d(t, "fd", function() {
            return zn
        }), n.d(t, "Tb", function() {
            return Kn
        }), n.d(t, "bd", function() {
            return Wn
        });
        n("a1Th"), n("OG14"), n("OEbY"), n("Vd3H"), n("tUrg"), n("SRfc"), n("rGqo"), n("Btvt");
        var a = n("BxOC"),
            r = n("nyd8"),
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
                    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }).apply(this, arguments)
        }
        var j = "al_im.php",
            O = 5,
            w = "typing",
            k = "audiomessage",
            {
                scheduleNav: C,
                commitNav: S,
                scheduleNavWithTimeOut: E
            } = Object(r.a)();
        var I = {
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

        function x(e, t, n) {
            return Object(a.b)(j, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function T(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(a => a ? t(...n) : function(e) {
                if (!e.renew_hashes) {
                    var t = e.last_hashes_update || 0;
                    if (Date.now() - t < 1e4) return Promise.resolve();
                    var n = Object.keys(e.tabs).filter(t => Object(l.qb)(e, t));
                    e.renew_hashes = x(n, {}, e).then(([t, a]) => (n.forEach(n => {
                        e.tabs[n].hash = t[n]
                    }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e))
                }
                return e.renew_hashes
            }(e).then(e => t(...n)))
        }

        function M(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e(...t).catch(a => {
                    if (a && a.match && a.match(/1001;/)) return T(n, e, t);
                    throw a
                })
            }
        }

        function L(e) {
            return "string" == typeof e ? Object(f.mb)(`<div>${e}</div>`) : e
        }

        function P(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function B(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function D(e, t, n, r, i) {
            return i.tabHistoryNotChanged = !1, Object(s.e)(a.b, 3, e => e - 1)(j, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: i.prevPeer,
                gid: i.gid,
                block: r
            }).then(([t, a, r, s, o]) => {
                if (a.forEach(e => Object(p.a)(i, e)), i.tabs || (i.tabs = {}), i.dialog_tab_cts = Object.assign({}, o, {
                        [d.k]: i.dialog_tab_cts[d.k]
                    }), i.tabs[e] || (i.tabs[e] = Object(l.Mb)(i, t)), B(s, i), n) {
                    if (i.tabs[e]) {
                        var c = i.tabs[e].lastmsg,
                            u = i.tabs[e].lastmsg_meta;
                        extend(i.tabs[e], t), i.tabs[e].lastmsg = c, i.tabs[e].lastmsg_meta = u
                    }
                } else extend(i.tabs[e], t);
                return i.admins = extend(i.admins, r), i.imQueue(e, !1), Pn(), N(e, i)
            }).catch(e => Object(g.a)("loadPeer", e))
        }

        function N(e, t) {
            var n = t.imQueue(e, !1),
                a = t.tabs[e],
                r = n.filter(n => !Object(u.M)(t, e, n.rid));
            return a.msgs = r.reduce((e, t) => (e["rid" + t.rid] = t.mess, e), a.msgs), t.imQueueSet(e, r), t.tabs[e].history = Object(l.jc)(r, t, L(t.tabs[e].history)), Promise.resolve(t)
        }

        function q(e, t, n) {
            var a = n.imQueue(e, !1).filter(e => e.failed && e.mess.messageId !== t);
            return n.imQueueSet(e, a), n.tabs[e].history = Object(l.Ob)([t], L(n.tabs[e].history)), Promise.resolve(n)
        }

        function A(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(a.b)(j, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(([e]) => B(e, t))
        }

        function H(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(t => (t.tabHistoryNotChanged = !1, Object(l.qb)(t, n) && !t.tabs[n].msgid ? (t.gid && A(n, t), Promise.resolve(t).then(z)) : (Object(l.qb)(t, n) && (t.tabs[n].msgid = !1), D(n, e, !1, !0, t)))).then(z).then(F.bind(null, n))
        }

        function F(e, t, n = !1) {
            return Object(l.Db)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(l.Db)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function R(e, t, n) {
            var a = n.msgid,
                r = n.peer;
            return !e && Object(l.qb)(n, r) && n.tabs[r].msgs[a] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && A(r, n), Promise.resolve(n).then(z).then(F.bind(null, r))) : D(r, !0, a, !0, n).then(z).then(() => {
                return Object(u.u)(n, r).msgid = a, n
            }).then(F.bind(null, r))
        }

        function $(e, t, n, a) {
            if (Pt(a)) throw Object(l.Cc)(), new Error("Cant change peer while loading something");
            var r = a.gid ? "gim" + a.gid : "im";
            if (a.prevPeer = a.peer, a.peer = e, a.msgid = t || "", a.currentEntryPoint = n, cur.peer = e, C({
                    sel: e ? Object(l.I)(e) : null,
                    msgid: a.msgid,
                    email: "",
                    0: r
                }), 0 != a.prevPeer && F(a.prevPeer, a, !0), 0 !== e) {
                Object(l.Db)(a, e) && F(e, a, !0), Qt(a.tabbedPeers.map(e => e.peer).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(a.tabbedPeers) : a.tabbedPeers.map(t => (t.peer == e && "perm" !== t.type && (t.type = "perm"), t)), !1, a)
            } else Qt(a.tabbedPeers, !1, a);
            return S(), Re(a.prevPeer, a)
        }

        function U(e) {
            cur.wallMentions = (() => new Promise((t, n) => {
                if (cur.wallMentions = [], !Object(l.ib)(e.peer) || !Object(l.qb)(e, e.peer) || Object(l.rb)(e, e.peer)) return n();
                var a = e.tabs[e.peer];

                function r() {
                    var n = [];
                    Object.keys(a.msgs || {}).reverse().forEach(e => {
                        var t = Object(u.S)(a.msgs[e]),
                            r = t && t.userId;
                        r && r != vk.id && -1 === n.indexOf(r) && Object(l.Gb)(a, r) && n.push(r)
                    }), (a.memberIds || []).forEach(e => {
                        -1 === n.indexOf(e) && n.push(e)
                    });
                    var r = [];
                    n.forEach(t => {
                        if (Object(p.b)(e, t)) {
                            var n = Object(p.c)(e, t),
                                a = n.link.substring(1);
                            r.push([n.id, n.name, "@" + a, n.photo, void 0, void 0, void 0, a, n.first_name])
                        }
                    }), t(r)
                }
                a.membersLoaded ? r() : wn(e.peer, e).then(r)
            }))
        }

        function z(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                a = [],
                r = Object(l.ib)(t) && (n.data.closed || n.data.kicked),
                i = Object(l.rb)(e, t);
            n.offset && a.push("photos"), n.offset && a.push("search"), (t < -2e9 || n.offset) && !i && a.push("clear"), Object(l.kb)(e) && !i && a.push("block"), i && !r && a.push("settings"), Object(l.lb)(t) && (n.can_send_notify ? a.push("block_notify") : a.push(n.blocked_community ? "allow_community" : "block_community")), (Object(l.ib)(t) || Object(l.Hb)(t) || Object(l.lb)(t)) && !Object(l.kb)(e) && (Object(l.ib)(t) && (n.data.kicked || n.data.closed) || a.push(inArray(t, e.mutedPeers) ? "unmute" : "mute")), Object(l.Hb)(t) && !e.gid && !n.blacklisted && n.is_friend && a.push("invite"), Object(l.ib)(t) && !r && (Object(_.h)(e) && a.push("invite"), e.gid || a.push("leave")), Object(l.ib)(t) && n.data.closed && !n.data.kicked && a.push("return"), Object(l.ib)(t) && n.pinned && (a.push(Object(h.a)(e, t) ? "pin_hide" : "pin_unhide"), Object(_.j)(e) && a.push("unpin"));
            var s = Object(l.D)(e, i);
            return e.curActions = a.sort((e, t) => I[e] - I[t]).reduce((e, t) => (e[t] = s[t], e), {}), Promise.resolve(e)
        }

        function K(e, t, n) {
            var r = n.tabs[n.peer];
            return Object(a.b)(j, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: r.offset + (r.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(([e, t, a, i]) => (r.allShown = a, n.admins = extend(n.admins, i), r.history = e + P(r.history), r.historyToAppend = e, r.offset += Object.keys(t).length, r.msgs = extend(r.msgs, t), n))
        }

        function W(e) {
            var t = e.tabs[e.peer];
            return Object(a.b)(j, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(([n, a, r, i, s]) => {
                t.allShown = t.allShown || r, t.history = P(t.history) + n, t.historyToAppend = n;
                var o = Object.keys(a).length;
                return t.skipped -= o, t.offset += o, t.msgs = extend(t.msgs, a), e
            })
        }

        function V(e, t, n, a) {
            var r = e.tabs[t];
            return a === i.m && r.out_up_to > n ? e : (a === i.m ? r.out_up_to = n : r.in_up_to = n, e)
        }
        var G = M(function(e, t) {
            if (Object(l.Hc)(t.tabs[e])) return Promise.resolve(t);
            var n = t.tabs[e],
                r = n.msgs || {},
                s = Object.keys(r).map(n => Object(u.n)(t, e, n)).filter(e => !Object(m.k)(e)).map(e => e.messageId).sort((e, t) => t - e);
            return n.skipped > 0 && (s = s.filter(e => intval(e) <= n.lastmsg - n.skipped)), (s = intval(s.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([i.ub([6, e, s])]), Object(a.b)(j, {
                peer: e,
                ids: [s],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(() => V(t, e, s, i.m)))
        });

        function X(e) {
            return Object(a.b)(j, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(([t, n, a]) => extend({}, e, {
                imKey: t,
                imUrl: n,
                imPart: a
            }))
        }

        function Q(e) {
            return Object(a.b)(j, {
                act: "a_get_ts",
                gid: e.gid
            }).then(([t]) => extend({}, e, {
                imTs: t
            }))
        }

        function Y(e, t, n) {
            var a = n.tabs[e];
            return a.msgs[t.messageId] && (a.msgs[t.messageId].errored = 1, a.history = Object(l.mc)(e, t, L(a.history))), Promise.resolve(n)
        }

        function J(e, t, n, a) {
            var r = a.tabs[e];
            return r.msgs[t] && (r.msgs[t].errored = 0, r.lastmsg_meta = n, r.lastmsg = t, r.history = Object(l.Fc)(e, t, L(r.history))), Promise.resolve(a)
        }

        function Z(e, t, n, a, r = !1) {
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce((e, i) => (!n && !At(i)(t) || r && !r(i, e[i], t) || (e[i] = Object(o.a)(a(e[i], i))), e), e.dialog_tabs))
        }

        function ee(e, t) {
            if (!inArray(e, t.tabbedPeers.map(e => e.peer)) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                Qt(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function te(e, t, n) {
            return Object(l.Bb)(n) ? t.concat([e]) : [e].concat(t)
        }

        function ne(e, t) {
            var n = e.get().peer,
                a = Object(u.u)(e, n);
            if (Object(l.qb)(e, n)) {
                var r = L(a.history);
                a.history = Object(l.Lc)(e, r, t)
            }
        }

        function ae(e, t) {
            var n = Object(u.u)(t, e.peerId);
            if (Object(l.qb)(t, e.peerId)) {
                var a = L(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(l.K)(t, e, a)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var r = n && n.pinned && Object(u.S)(n.pinned);
            return r && r.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function re(e, t) {
            var n = e.flags & i.m,
                a = e.peerId;
            if (Object(l.Db)(t, a)) {
                var r = t.tabs[a];
                if (r.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = {
                        [e.messageId]: 0
                    } : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n || Object(l.Hc)(r) ? r.unread = 0 : (r.lastmsg == e.messageId && r.unread ? ie(t, 1, e.peerId) : (!r.unread && ie(t, 1, e.peerId), r.unread++), ee(e.peerId, t)), Object(l.qb)(t, a)) {
                    var s = L(r.history);
                    r.skipped > 0 && r.skipped++, r.offset++, r.msgs[e.messageId] = extend(!0, {}, e), r.history = Object(l.x)(t, e, s, !0, !0, !0), Object(m.k)(e) && (r.blocked_community = 0, z(t))
                }
                if (r.typing) {
                    var o = r.typing.userIds.indexOf(e.userId);
                    o >= 0 && r.typing.userIds.splice(o, 1)
                }
                return r.lastmsg = e.messageId, r.lastmsg_meta = e, F(e.peerId, t), Z(t, r, !1, te.bind(null, a), Ft.bind(null, t)), Promise.resolve(t)
            }
            return D(a, 0, 0, 0, t).then(t => {
                return Z(t, t.tabs[a], !1, te.bind(null, a), Ft.bind(null, t)), F(e.peerId, t), n || ee(e.peerId, t), t
            })
        }

        function ie(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function se(e, t) {
            if (Object(l.qb)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    a = n.unread;
                if (t = V(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(u.b)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), a > 0 && !n.unread && ie(t, -1, e.peerId), !n.skipped) {
                    var r = L(n.history);
                    n.history = Object(l.Rb)(t, r, e.peerId)
                }
            } else Object(l.Db)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && ie(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(l.Db)(t, e.peerId) && (t.dialog_tabs[d.m] = t.dialog_tabs[d.m].filter(t => intval(t) !== e.peerId)), 0 !== t.unread_cnt || t.active_tab !== d.m || t.gid ? Promise.resolve(t) : Ht(d.h, t)
        }

        function oe(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(l.Db)(t, e.peerId) && V(t, e.peerId, e.upToId, i.m), Object(l.qb)(t, e.peerId)) {
                var a = L(n.history);
                n.history = Object(l.Lb)(t, e.peerId, a)
            }
            return Promise.resolve(t)
        }

        function ce(e, t, n, a, r) {
            return r.text = {}, r.imQueue = e, r.imQueueResend = t, r.imQueueSet = n, r.imQueueComplete = a, Promise.resolve(r)
        }

        function le(e, t, n) {
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
                    i = Object(u.n)(n, t, r),
                    s = Object(u.e)(n, t, r);
                return !1 === s ? n.set(ut.bind(null, {
                    [t]: [i.userId]
                })).then(n => {
                    var s = Object(u.e)(n, t, r);
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

        function de(e, t) {
            Object(l.Nb)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce((n, a) => {
                var r = t.tabs[a] ? t.tabs[a].msgs : {},
                    i = extend({}, r || {}, e[a].msgs || {});
                return n[a] = extend(t.tabs[a] || {}, e[a]), i && (n[a].msgs = i), e[a].lastmsg || (n[a].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function ue(e, t, n, a) {
            var r = Object(u.u)(a, e);
            if (r) {
                var i = !1 !== t ? mobPlatforms[t] ? 1 : 0 : r.last_seen[2];
                r.online = t, r.last_seen = [t, n || r.last_seen[1], i]
            }
            return Promise.resolve(a)
        }

        function me(e, t, n) {
            var a = Object(u.u)(n, e.peerId);
            return a && (e.ts = Date.now() / 1e3, a.activity || (a.activity = {}), a.activity[t] = e, a.typing === w && (a.typing = e)), Promise.resolve(n)
        }

        function pe(e, t) {
            var n = Object(u.u)(t, e.peerId),
                a = Object(m.d)(e) ? "audiomessage" : "typing";
            return n && n.activity && n.activity[a] && (n.activity[a].userIds = n.activity[a].userIds.filter(t => t !== e.userId)), Promise.resolve(t)
        }

        function ge({
            peerId: e
        }, t, n) {
            return Object(s.c)(O + 2).then(() => {
                if (Object(l.Db)(n, e)) {
                    var a = n.tabs[e];
                    if ((a.activity || {})[t]) Date.now() - 1e3 * a.activity[t].ts >= 1e3 * O && (delete a.activity[t], 0 === Object.keys(a.activity) && delete a.activity);
                    if (a.typing) Date.now() - 1e3 * a.typing.ts >= 1e3 * O && (a.typing = void 0)
                }
                return n
            })
        }

        function he(e) {
            var t = {},
                n = e.find(e => "poll" === e[0]);
            if (n) {
                var [, , a] = n;
                Object.assign(t, a)
            }
            return t
        }

        function _e(e) {
            return e.map(e => {
                var t = "audiomsg" === e[2] ? "audio_message" : e[2];
                return `${e[0]}:${e[1]}:${t}`
            }).join(",")
        }
        var be = function(e, t, n, r) {
                var i = Date.now() + rand(0, 100).toFixed(0),
                    s = r.ref_id,
                    o = r.ref_source;
                r.ref_source = void 0, r.ref_id = void 0, (o || s) && (C({
                    ref_source: null,
                    ref: null
                }), S()), Object(b.i)(r);
                var c = t.attaches.length > 0,
                    l = Object(b.k)(r, "send", "server", c),
                    d = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: o,
                        ref: s,
                        msg: t.message,
                        payload: t.payload,
                        media: _e(t.attaches),
                        guid: i,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : r.gid,
                        entrypoint: r.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, he(t.attaches));
                return Object(a.b)(j, d, 2e4).then(([e]) => (l(), r.version !== e.version && nav.reload({
                    force: !0
                }), r.currentEntryPoint = "", r)).catch(e => {
                    throw Object(b.h)(r, e, "send", "server_send"), e
                })
            },
            fe = M(function(e, t, n = {}, a) {
                var r = a.tabs[e];
                return be(e, t, y({
                    hash: r.hash
                }, n), a)
            }),
            ve = M(function(e, t, n) {
                var r = t.attaches.length > 0,
                    i = Object(b.k)(n, "edit", "server", r);
                return Object(a.b)(j, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: _e(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, he(t.attaches)), 2e4).then(([e]) => (i(), n)).catch(e => {
                    throw Object(b.h)(n, e, "edit", "server_send"), e
                })
            });

        function ye(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(t => t !== e[0]);
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(o.a)(n).sort((e, t) => e - t)
            }
            return Promise.resolve(t)
        }

        function je(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Oe(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function we(e, t) {
            if (Object(l.qb)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    a = t.imQueue(e.peerId).filter(t => t.failed && t.rid !== e.randomId);
                t.imQueueSet(e.peerId, a), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(l.gc)(t, L(n.history), e)
            }
            return Promise.resolve(t)
        }

        function ke(e, t) {
            var n = Object(b.k)(t, "unknown", "attach"),
                r = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(s.e)(a.b, 3, e => e * e)(j, r).then(a => (n(), Ce(e, a, t))).catch(n => (Object(b.h)(t, n, "unknown", "server_load_attach"), Ce(e, null, t)))
        }

        function Ce(e, t, n) {
            var a = n.tabs[e.peerId];
            return a.mediacontent || (a.mediacontent = {}), a.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")],
                function(e, t) {
                    var n = t.tabs[e.peerId];
                    return n.history = Object(l.fc)(L(n.history), e, t), Promise.resolve(t)
                }(e, n)
        }

        function Se(e, t, n) {
            var a = Object(l.J)(t),
                r = n.tabs[e];
            return r.searchDay = a, r.searchOffset = 0, r.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Ee(e, t, n) {
            return n.tabs[t].searchText = e, Ue(t, n), n
        }

        function Ie(e, t, n) {
            if (t) {
                var a = n.tabs[t];
                a.searchText = e, a.searchOffset = 0, a.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function xe(e, t, n, r, i) {
            var s = +new Date;
            return Object(a.b)(j, {
                act: "a_hints",
                str: e,
                gid: r.hidegid ? 0 : i.gid,
                query: n,
                peerIds: t.join(",")
            }).then(([t, n, a]) => (B(a, i), n.forEach(e => Object(p.a)(i, e)), de(t, i), Object(v.c)("messages", s, t && t.length, e), Object.keys(t).sort((e, n) => t[e].order - t[n].order).map(e => t[e])))
        }

        function Te(e, t, n, a) {
            return xe(e, t, n, {}, a).then(e => e.map(e => ({
                peerId: e.peerId,
                name: e.tab,
                photo: e.photo,
                online: e.online,
                is_friend: "friends" === n
            })))
        }

        function Me(e) {
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

        function Le(e) {
            return (t, n) => e(n).then(e => {
                var a = (t ? e.search(t) : e.list).map(Me);
                return n.mapped_index || (n.mapped_index = {}), a.forEach(e => {
                    n.mapped_index[e.peerId] = e
                }), a
            })
        }
        var Pe = Le(e => e.topConvTree),
            Be = Le(e => e.imTopConvTree),
            De = Le(e => e.hintsTree);

        function Ne(e, t) {
            var n, r, i;
            t.topConvTree = new Promise(e => {
                n = e
            }), t.hintsTree = new Promise(e => {
                r = e
            }), t.imTopConvTree = new Promise(e => {
                i = e
            });
            var o = e.select(c.b);
            return Object(s.e)(a.b, 1, () => 4)(j, {
                act: "a_dialogs_preload",
                rs: o.join(","),
                gid: t.gid
            }).catch(e => [
                [],
                [],
                []
            ]).then(([e, a, s, o]) => (t.popular_sugg = s, new vkIndexer(e, e => e[1], n), new vkIndexer(a, e => e[1], r), o && o.length > 0 ? new vkIndexer(o, e => e[1], i) : i(), t))
        }

        function qe(e) {
            var t, n = e.active_tab;
            return t = e.dialog_tabs[n].length > 0 ? Math.min.apply(null, e.dialog_tabs[n].map(t => e.tabs[t].lastmsg)) : 0, Object(a.b)(j, {
                act: "a_get_dialogs",
                start_message_id: t,
                tab: n,
                gid: e.gid
            }).then(([t, a, r, i]) => (r.forEach(t => Object(p.a)(e, t)), B(i, e), de(a, e), e.dialog_tabs[n] = e.dialog_tabs[n].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[n] = !t.has_more, Promise.resolve(e)))
        }
        var Ae = M(function(e, t) {
            return Object(a.b)(j, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(([n, a, r, i, s]) => (a.forEach(e => Object(p.a)(t, e)), Object(l.Nb)(t, n), e === t.searchText && (t.searchOffset = i, t.searchAllLoaded = s), Object.keys(n).filter(e => !t.tabs[e]).forEach(e => {
                t.tabs[e] = n[e]
            }), [n, r]))
        });

        function He(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function Fe(e, t) {
            return !(t.peer !== e || !Object(l.qb)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Re(e, t) {
            if (Object(l.qb)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, C({
                    st: ""
                }), S()
            }
            return Promise.resolve(t)
        }

        function $e(e, t) {
            if (Object(l.qb)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Ue(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var ze = M(function(e, t) {
            var n = t.tabs[e],
                r = "";
            if (Ue(e, t), n.searchDay && (r = `day:${n.searchDay}`), !r && !n.searchText) return Promise.reject();
            var i = `in:${e} ${r} ${n.searchText||""}`;
            return C({
                st: n.searchText
            }), S(), Object(a.b)(j, {
                act: "a_search",
                q: i,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(([e, t, a]) => (n.searchOffset = t, n.searchAllLoaded = a, e))
        });

        function Ke(e) {
            return Object(a.b)(j, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function We(e, t) {
            var n = Object(u.u)(e, t);
            return Object(a.b)(j, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(([a, r]) => {
                n.lastmsg = a[0] || !1, n.lastmsg_meta = a, [n.unread, n.in_up_to, n.out_up_to] = r, n.unread || (e.get().dialog_tabs[d.m] = e.get().dialog_tabs[d.m].filter(e => e != t)), Z(e.get(), n, !1, te.bind(null, t), Ft.bind(null, e.get()))
            })
        }

        function Ve(e, t, n) {
            if (Object(l.qb)(n, t)) {
                var a = n.tabs[t];
                a.deleted = a.deleted ? a.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function Ge(e, t, n) {
            if (Object(l.qb)(n, t)) {
                var a = n.tabs[t];
                a.history = Object(l.Ob)(e, L(a.history)), a.offset -= e.filter(e => a.msgs[e]).length, e.forEach(e => delete a.msgs[e]), e.forEach(e => {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var Xe = M(function(e, t, n, r, i) {
            return Object(a.b)(j, {
                act: "a_mark",
                peer: t,
                hash: n || i.tabs[t].hash,
                gid: i.gid,
                msgs_ids: e.join(","),
                mark: r
            })
        });

        function Qe(e, t, n, a) {
            if (Object(l.qb)(a, t)) {
                var r = a.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e, r.history = Object(l.Pb)(e, t, n, L(r.history)), r.offset -= e.filter(e => r.msgs[e]).length
            }
            return Promise.resolve(a)
        }

        function Ye(e, t, n) {
            if (Object(l.qb)(n, t)) {
                var a = n.tabs[t];
                a.deleted && (a.deleted = a.deleted.filter(t => t !== e)), a.history = Object(l.ic)(e, t, L(a.history)), a.offset++
            }
            return Promise.resolve(n)
        }

        function Je(e, t, n, r) {
            return Object(a.b)(j, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: r
            })
        }
        var Ze = M(function(e, t, n) {
                return Object(l.Hc)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(a.b)(j, {
                    act: "a_activity",
                    type: t,
                    peer: e,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(() => n, () => n))
            }),
            et = M((e, t) => Object(a.b)(j, {
                act: "a_accept_message_request",
                user_id: e,
                hash: t.tabs[e].hash
            }).then(() => {
                var n = t.tabs[e];
                return n.is_message_request = !1, n.folders = Object(u.T)(n.folders), t
            })),
            tt = M((e, t) => Object(a.b)(j, {
                act: "a_reject_message_request",
                user_id: e,
                hash: t.tabs[e].hash
            }).then(() => (Z(t, t.tabs[e], !0, t => t.filter(t => t !== e)), Qt(t.tabbedPeers.filter(t => t.peer !== e), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null, t))),
            nt = M(function(e, t) {
                return Ze(e, w, t)
            }),
            at = M(function(e, t) {
                return Ze(e, k, t)
            });

        function rt(e, t, n, a) {
            return t && (a.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(a)
        }

        function it(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function st(e, t, n) {
            if (Object(l.Db)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, Z(n, n.tabs[e], !0, t => t.filter(t => t !== e)), n.tabs[e].unread > 0 && ie(n, -1, e);
                var a = n.tabs[e];
                return a.deletedDialog = !0, Qt(n.tabbedPeers.filter(t => t.peer !== e), !0, n), t.then(([t, r]) => (delete n.blockedFlagUpdates[e], a.msgs = null, a.history = null, a.unread = 0, a.lastmsg = !1, a.lastmsg_meta = null, n))
            }
        }
        var ot = M(function(e, t) {
                return st(e, Object(a.b)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            ct = M(function(e, t, n) {
                return Object(a.b)(j, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(() => n)
            }),
            lt = M(function(e, t) {
                return Object(a.b)(j, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(([n]) => (t.tabs[e] = extend(t.tabs[e], n), t))
            });
        var dt = M(function(e, t, n) {
            return Object(a.b)(j, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(e => n)
        });

        function ut(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(t => `${t}:${e[t].join(",")}`).join(";");
            return Object(a.b)(j, {
                act: "a_load_member",
                need: n
            }).then(([e]) => (e.forEach(e => Object(p.a)(t, e)), t))
        }

        function mt(e, t, n) {
            var a = {},
                r = n.get();

            function s(e, t) {
                Object(l.ib)(e) && t && !Object(p.b)(r, t) && (a[e] ? -1 === a[e].indexOf(t) && a[e].push(t) : a[e] = [t])
            }
            var o = t.filter(e => !Object(l.Db)(r, e.peerId)).map(e => e.peerId);
            t.forEach(e => {
                s(e.peerId, e.userId)
            }), e.forEach(e => {
                s(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(e => e.flags & i.m && !e.local).map(e => e.kludges.from_admin).filter(e => e && !r.admins[e]);
            return 0 === Object.keys(a).length && 0 === c.length && 0 === o.length ? Promise.resolve(r) : {
                shouldLoad: Object.keys(a).length > 0 || c.length > 0 || o.length > 0,
                needMembers: a,
                needAdminIds: c,
                needPeers: o
            }
        }

        function pt({
            needMembers: e,
            needAdminIds: t,
            needPeers: n
        }, r, i) {
            return r.pause(), Promise.all([ut(e, i), function(e, t) {
                return 0 === e.length ? Promise.resolve(t) : Object(a.b)(j, {
                    act: "a_get_admin",
                    admins: e.join(","),
                    gid: t.gid
                }).then(([e]) => (t.admins = extend(t.admins, e), t))
            }(t, i), Promise.all(n.map(e => D(e, 0, 0, 0, i)))]).catch(() => i).then(() => r.resume()).then(() => i)
        }
        var gt = M(function(e, t) {
            return e.kludges.source_act === l.d ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(a.b)(j, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(([n, a]) => {
                t.chat_photo_msg = a;
                var r = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = n[0], t.tabs[e.peerId].photoLarge = n[1], Object(l.qb)(t, e.peerId)) {
                    var i = e.kludges.source_act;
                    r.history = Object(l.w)(e, i, t, L(r.history))
                }
                return t
            })
        });

        function ht(e, t, n, a) {
            return t !== vk.id ? Promise.resolve(a) : (Object(l.Db)(a, n) && a.peer == n && (a = z(a)), Promise.resolve(a))
        }
        var _t = M(function(e, t) {
                return Object(a.b)(j, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(ht.bind(null, l.c, vk.id, e, t))
            }),
            bt = M(function(e, t) {
                return Object(a.b)(j, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(ht.bind(null, l.b, vk.id, e, t))
            }),
            ft = M(function(e, t, n) {
                return Object(a.b)(j, {
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
                }).then(vt.bind(null, e, t))
            });

        function vt(e, t, n) {
            var a = n.mutedPeers.filter(t => t !== e);
            return t && a.push(e), n.mutedPeers = a, cur.mutedPeers = n.mutedPeers, z(n)
        }

        function yt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var jt = M(function(e, t, n, r) {
            return Ot(e, n, t, r), Object(a.b)(j, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: r.gid,
                peer: n,
                hash: r.tabs[n].hash
            }).then(() => r)
        });

        function Ot(e, t, n, a) {
            if (Object(l.qb)(a, t)) {
                var r = a.tabs[t];
                e.filter(e => r.msgs[e]).forEach(e => {
                    var s = Object(u.n)(a, t, e),
                        o = n ? s.flags | i.l : s.flags & ~i.l;
                    s.flags = o, r.msgs[e] = s, r.history = Object(l.Nc)(e, n, L(r.history))
                })
            }
            return Promise.resolve(a)
        }

        function wt(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function kt(e, t) {
            return Object(a.b)(j, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Ct(e, t) {
            return Object(a.b)(j, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function St(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Et(e, t) {
            return Object(a.b)(j, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function It(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }
        var xt = M(function(e, t, n, r) {
            return r.creating = !0, r.longpoll.pause(), Object(a.b)(j, {
                act: "a_multi_start",
                hash: r.writeHash,
                peers: t.join(","),
                title: n
            }).then(([e]) => (r.next_peer = e.peerId, r.tabs[e.peerId] = e, Z(r, e, !1, t => [e.peerId].concat(t)), r.longpoll.resume(), r)).then(t => e ? function(e, t, n) {
                return Object(a.b)("al_page.php", {
                    act: "owner_photo_save",
                    peer: e,
                    _query: t
                }).then(e => n)
            }(t.next_peer, e, t) : t).then(e => (e.creating = !1, e)).catch(e => {
                throw r.creating = !1, r.longpoll.resume(), e
            })
        });

        function Tt(e) {
            var t;
            e.resync_in_process = new Promise(e => {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                r = e.active_tab;
            return Object(a.b)(j, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: r,
                add_peers: e.tabbedPeers.map(e => e.peer).join(",")
            }).then(([n, a, i, s, c]) => {
                a.forEach(t => Object(p.a)(e, t)), Object(l.Nb)(e, n), i.user_unread && handlePageCount("msg", i.user_unread), Object(o.h)("Resync success", "success");
                var u, m = e.peer;
                if (Object(l.Ab)(m)) u = Promise.resolve(!1);
                else {
                    var g = {
                        tabs: {
                            [m]: e.tabs[m]
                        },
                        oCache: {}
                    };
                    u = de({
                        [m]: n[m]
                    }, g)
                }
                return u.then(a => {
                    e.tabs = n, e.admins = extend(e.admins, s), a && (e.tabs[m] = a.tabs[m], e.tabs[m].history = Object(l.jc)(m, e, L(e.tabs[m].history))), e.loadingDialogs = !1, e.mutedPeers = i.mutedPeers, e.lastDialogsOptions = {
                        has_more: i.has_more
                    }, e.dialog_tab_cts = Object.assign({}, i.folder_cts, {
                        [d.k]: e.dialog_tab_cts[d.k]
                    }), e.dialog_tabs[r] = c.map(intval);
                    var o = e.dialog_tabs[r].map(t => e.tabs[t]);
                    return Object.keys(e.dialog_tabs).filter(e => e != r).forEach(t => {
                        r == d.h ? e.dialog_tabs[t] = o.filter(At(t)).map(e => e.peerId) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Bt(intval(i.unread), e)
                })
            }).catch(t => (Object(o.h)("Resync error: " + t.message + " " + t.stack, "error"), Object(s.c)(2).then(Tt.bind(null, e))))
        }

        function Mt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Lt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Pt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(e => Upload.isSomethingUploading(e)).length > 0
        }

        function Bt(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[d.m] = e, Promise.resolve(t)
        }

        function Dt(e, t) {
            return t.ctrl_submit = !!e, Object(a.b)(j, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(e => t)
        }

        function Nt(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var a = document.title,
                r = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var i = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var a = Object.keys(n.cur_unread_cnt).length;
                        if (0 === a) return Object(f.ob)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(f.ob)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (a > 9 ? 10 : a) + t + ".ico"), Object(f.ob)(winToUtf(getLang("mail_im_new_messages", a))))
                    }
                }(a, r, n);
                n.update_title_to = setInterval(i, 1e3), i()
            } else !t && n.update_old_title && (Object(f.ob)(n.update_old_title), n.cur_unread_cnt = {}, a = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + r + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function qt(e, t, n, a, r) {
            return Object(l.qb)(r, e) && (r.tabs[e].scrollTop = intval(t), r.tabs[e].scrollBottom = intval(n), r.tabs[e].contHeight = intval(a)), Promise.resolve(r)
        }

        function At(e) {
            return e === d.h ? e => !Object(l.Hc)(e) : e === d.m ? e => !Object(l.Hc)(e) && e.unread > 0 : t => t.folders & d.j[e]
        }

        function Ht(e, t) {
            t.active_tab = e, Object(r.b)({
                tab: e === d.h ? null : e
            });
            var n = [];
            if (e !== d.h && !Object(l.Bb)(t)) {
                var a = t.dialog_tabs[e];
                n = t.dialog_tabs[d.h].map(e => t.tabs[e]).filter(At(e)).map(e => e.peerId), t.dialog_tabs[e] = a.length >= n.length ? a : n
            }
            return Promise.resolve(t)
        }

        function Ft(e, t, n, a) {
            var r = e.dialog_tabs_all;
            return !(!r[d.h] && !r[t]) || (n.filter(e => e === a.peerId).length > 0 || ("r" === a.lastmsg[0] || n.map(t => e.tabs[t.toString()]).filter(t => Object(l.Bb)(e) ? t.lastmsg > a.lastmsg : t.lastmsg < a.lastmsg).length > 0))
        }

        function Rt(e, t, n, a, r) {
            if (Object(l.Db)(r, e)) {
                var s = r.tabs[e];
                return n === i.P && (t ^= s.folders),
                    function(e, t, n) {
                        return !(e === i.X && n.folders & t || !(e !== i.T || n.folders & t))
                    }(n, t, s) && Object.keys(d.j).filter(e => d.j[e] & t).forEach(e => {
                        r.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== i.T || e.folders & d.j[n] ? t === i.P ? e.folders & d.j[n] ? -1 : 1 : t === i.X ? 1 : -1 : 0
                        }(s, n, e)
                    }), n === i.X ? r.tabs[e].folders |= t : n === i.T ? r.tabs[e].folders &= ~t : r.tabs[e].folders = t ^= s.folders, Z(r, r.tabs[e], !0, (t, n) => t.concat([e]).map(e => r.tabs[e]).filter(At(n)).map(e => e.peerId), Ft.bind(null, r)), Promise.resolve(r)
            }
            return D(e, 0, 0, 0, r).then(Rt.bind(null, e, t, n, r))
        }
        var $t = M(function(e, t) {
                var n = d.j[d.i],
                    r = t.tabs[e].folders & n,
                    s = r ? i.Fb : i.Jb;
                return t.longpoll.push([s([0, e, n, !0])]), Object(a.b)(j, {
                    act: "a_dialog_star",
                    val: r ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(() => t)
            }),
            Ut = M(function(e, t, n) {
                var r = d.j[d.n];
                return n.longpoll.push([i.Fb([0, e, r, !0]), i.ub([6, e, t])]), Object(a.b)(j, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(() => n)
            });

        function zt(e) {
            return Object(a.b)(j, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Kt(e, t) {
            return B({
                [e]: {
                    free: !0
                }
            }, t), Object(a.b)(j, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(() => t)
        }

        function Wt(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var Vt = M(function(e, t) {
            return Z(t, t.tabs[e], !0, t => t.filter(t => t !== e)), t.tabs[e].deletedDialog = !0, Object(a.b)(j, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(n => (n[0] ? (Qt(t.tabbedPeers.filter(t => t.peer !== e), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, Z(t, t.tabs[e], !1, te.bind(null, e), Ft.bind(null, t))), n))
        });

        function Gt(e, t, n, r) {
            return Object(a.b)(j, {
                act: "a_restore_dialog",
                hash: t,
                gid: r.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(t => (r.tabs[e].deletedDialog = !1, Z(r, r.tabs[e], !1, t => [e].concat(t)), r.tabs[e].unread = t, r))
        }

        function Xt(e, t, n) {
            return Object(a.b)(j, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function Qt(e, t, n) {
            return n.tabbedPeers = e, Object(l.jb)(n) && (C({
                peers: n.tabbedPeers.filter(({
                    peer: e,
                    type: t
                }) => e !== n.peer && "perm" === t).map(e => Object(l.S)(e.peer, n)).filter(e => !e.deletedDialog).map(e => e.peerId).map(l.I).join("_"),
                to: ""
            }), t && S()), Promise.resolve(n)
        }

        function Yt(e) {
            return !e.peer || (Fe(e.peer, e) ? He(e.peer, e) : !!Object(l.qb)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function Jt(e, t) {
            var n = t.tabs[e];
            return Object(l.qb)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function Zt(e, t) {
            var n = t.tabs[e];
            return Object(l.qb)(t, e) && (n.history = P(n.history)), Promise.resolve(t)
        }

        function en(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function tn(e, t, n) {
            if (!Object(l.lb)(t)) return Promise.resolve(n);
            var r = Object(u.u)(n, t);
            return r.blocked_community = !e, !1 === e && (r.can_send_notify = !1), Object(a.b)(j, {
                act: "a_toggle_community",
                peer_id: t,
                hash: r.hash,
                state: e ? 1 : 0
            }).then(() => z(n))
        }

        function nn(e, t) {
            if (0 !== t.peer && Object(l.qb)(t, t.peer)) {
                var n = Object(u.u)(t, t.peer);
                n.history = L(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function an(e, t) {
            if (0 !== t.peer && Object(l.qb)(t, t.peer)) {
                var n = Object(u.u)(t, t.peer),
                    a = geByClass1("_im_peer_history");
                a && (n.history = L(a.innerHTML)), e(n.history)
            }
            return Promise.resolve(t)
        }

        function rn(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function sn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function on(e) {
            C({
                act: e ? "create" : null
            }), S()
        }

        function cn(e = null) {
            C({
                q: e
            }), S()
        }

        function ln(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(l.V)() > window.clientHeight() && Object(l.lc)(0)), Promise.resolve(e)
        }
        var dn = M(function(e, t, n) {
            return Object(a.b)(j, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(([e, t, a, r]) => (a.forEach(e => Object(p.a)(n, e)), n.tabs[e] = t, Z(n, t, !1, te.bind(null, e), Ft.bind(null, n)), n.admins = extend(n.admins, r), [e]))
        });

        function un(e, t) {
            return Object(a.b)(j, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var mn = M(function(e, t) {
            var n = t.tabs[e];
            return Object(a.b)(j, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(e => (n.inviteLink = e[0], e))
        });

        function pn(e) {
            return E({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function gn(e, t) {
            var n = Object(o.a)([e].concat(t.select(c.b))).slice(0, 500);
            t.update(c.b, n)
        }

        function hn(e) {
            e.update(c.b, [])
        }

        function _n(e, t) {
            var n = t.select(c.b).filter(t => t !== e);
            return t.update(c.b, n), n
        }

        function bn(e, t, n) {
            var a = n.tabs[t],
                r = Object(u.n)(n, t, e);
            return a.data.kicked || a.data.closed || r.kludges.source_act || (a.pinned = r), Promise.resolve(n)
        }

        function fn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var vn = M(function(e, t, n) {
                var r = n.tabs[t];
                return r.data.kicked || r.data.closed ? Promise.resolve(n) : Object(a.b)(j, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(([e]) => (n.tabs[t] = Object.assign({}, r, e), n))
            }),
            yn = M(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(a.b)(j, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(([a]) => (t.tabs[e] = Object.assign({}, n, a), t))
            }),
            jn = M(function(e, t) {
                var n = t.tabs[e];
                return Object(a.b)(j, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(([e]) => (n.pinned = e || null, t))
            }),
            On = M(function(e, t, n) {
                var r = n.tabs[e];
                return Object(a.b)(j, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: r.hash
                })
            }),
            wn = M(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(a.b)(j, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(([
                    [e, a, r]
                ]) => (n.memberIds = e, n.adminIds = a, r.forEach(e => Object(p.a)(t, e)), n.membersLoaded = !0, t))
            }),
            kn = M(function(e, t) {
                return Promise.all([wn(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(a.b)(j, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(([e]) => (n.photoGrid = e.grid, n.photoLarge = e.photo, n.membersLastSeen = e.lastSeen || null, n.inviters = e.inviters, n.caccess = e.caccess, n.invitedByMe = e.invitedByMe || [], n.inviteLink = e.link || null, n.serverSettings = e.serverSettings || null, t))
                }(e, t)]).then(() => t)
            }),
            Cn = M(function(e, t, n) {
                var r = n.tabs[e];
                return Object(a.b)(j, {
                    act: "a_update_flags",
                    chat: e,
                    hash: r.hash,
                    flags: t
                })
            }),
            Sn = M(function(e, t) {
                var n = t.tabs[e];
                return Object(a.b)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(() => (n.photo = null, n.photoLarge = null, t))
            });

        function En(e, t, n) {
            var a = n.tabs[e];
            return a.memberIds = a.memberIds.filter(e => e !== t), a.adminIds = a.adminIds.filter(e => e !== t), a.membersCount = a.memberIds.length, Promise.resolve(n)
        }
        var In = M(function(e, t, n) {
            var r = n.tabs[e];
            return Object(a.b)(j, {
                act: "a_kick_user",
                chat: e,
                hash: r.hash,
                mid: t
            }).then(() => (r.memberIds = r.memberIds.filter(e => e !== t), r.adminIds = r.adminIds.filter(e => e !== t), r.membersCount = r.memberIds.length, n))
        });

        function xn(e, t, n, a) {
            var r = a.tabs[e];
            return r.adminIds = n ? [].concat(r.adminIds, t).filter((e, t, n) => n.indexOf(e) === t) : r.adminIds.filter(e => e !== t), Promise.resolve(a)
        }
        var Tn = M(function(e, t, n, r) {
            var i = r.tabs[e];
            return Object(a.b)(j, {
                act: "a_toggle_admin",
                chat: e,
                hash: i.hash,
                mid: t,
                is_admin: +n
            }).then(() => xn(e, t, n, r))
        });

        function Mn(e, t, n, a) {
            var r = Object(u.n)(e, n, t).userId;
            return Object(p.c)(a, r) ? Promise.resolve(a) : ut({
                [n]: [r]
            }, a)
        }

        function Ln() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Pn() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Bn = M(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(a.b)(j, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(() => t)
            }),
            Dn = M(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var r = n.tabs[e];
                return Object(a.b)(j, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: r.hash
                }).then(() => n)
            });

        function Nn(e, t) {
            return Object(a.b)(j, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(([n]) => (t.tabs[e].top_banner = n, t))
        }

        function qn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Hn(e, !1, !0, n)
        }

        function An(e, t) {
            return qn(e, null, t)
        }

        function Hn(e, t, n, a) {
            return ((a.tabs || {})[e] || {}).keyboard && (a.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, {
                [e]: t
            }))), Promise.resolve(a)
        }
        var Fn = M(function(e, t) {
            var n = t.tabs[e];
            return Object(a.b)(j, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(([n]) => qn(e, n, t))
        });

        function Rn(e, t, n, r) {
            var i = r.tabs[e];
            return i.caccess[t] = n, Object(a.b)(j, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: i.hash,
                access: n ? 1 : 0
            }).then(() => r).catch(e => {
                throw i.caccess[t] = !n, e
            })
        }
        var $n = M(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(a.b)(j, {
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

        function Un(e, t, n) {
            var r = n.tabs[n.peer];
            return Object(a.b)(j, {
                act: "a_create_template",
                hash: r.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(e => (n.templates.unshift(e[0]), n))
        }

        function zn(e, t, n, r) {
            var i = r.tabs[r.peer];
            return Object(a.b)(j, {
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

        function Kn(e, t) {
            if (Object(l.qb)(t, e)) {
                var n = Object(u.u)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }

        function Wn(e, t) {
            var {
                updateType: n,
                updateArg: a
            } = e, r = 0;
            return n === i.A && (r = a === i.G ? 1 : -1), n === i.x && (r = -1), t.dialog_tab_cts[d.k] += r, Promise.resolve(t)
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
        var a = n("rHUl"),
            r = n("MhhX"),
            i = n("P13b"),
            s = n("eTng"),
            o = n("aong");

        function c(e, t) {
            t = Object(a.S)(t);
            var n = vk.id == t.peerId && !Object(o.q)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(r.k)(t)) && (!Object(r.l)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(r.f)(t) || Object(r.m)(t) || Object(r.d)(t) || Object(r.g)(t) || Object(r.i)(t) || Object(r.o)(t)) && !Object(i.gb)(e, t.peerId, t.messageId)))))
        }

        function l(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, (...e) => {
                var t = e[1],
                    n = e[3];
                return /^\@/.test(n) ? n : `@${t} (${n})`
            }), t.innerHTML = e, Emoji.val(t)
        }

        function d(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(e => e > 0).sort((e, t) => t - e).find(n => c(e, t.msgs[n])) || null
        }

        function u(e, t, n) {
            var a = Object(s.a)(t.kludges, t.messageId),
                r = n.dData.attaches;
            if (l(t.text) !== n.dData.txt || a.length !== r.length) return !0;
            for (var i = a.length; i--;) {
                var o = a[i],
                    c = r[i];
                if (o.id != c.id || o.type != c.type || "poll" == o.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function m(e, t, n, a, r, s) {
            t.origText = n, t.text = Object(i.hc)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = a, t.kludges.emoji = 1, t.local = 1, t.share_url = r, t.cancelled_shares = s, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    }
});