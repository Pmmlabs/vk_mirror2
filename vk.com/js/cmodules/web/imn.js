﻿! function(e) {
    function t(t) {
        for (var r, o, s = t[0], c = t[1], l = t[2], d = 0, f = []; d < s.length; d++) o = s[d], i[o] && f.push(i[o][0]), i[o] = 0;
        for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
        for (u && u(t); f.length;) f.shift()();
        return a.push.apply(a, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], r = !0, s = 1; s < n.length; s++) {
                var c = n[s];
                0 !== i[c] && (r = !1)
            }
            r && (a.splice(t--, 1), e = o(o.s = n[0]))
        }
        return e
    }
    var r = {},
        i = {
            "web/imn": 0
        },
        a = [];

    function o(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, o), n.l = !0, n.exports
    }
    o.m = e, o.c = r, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) o.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        c = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var l = 0; l < s.length; l++) t(s[l]);
    var u = c;
    a.push([95, "common", "bundles/vendors", "8afc6fda89c949d8a6d98f6fbcc1090c"]), n()
}({
    "+/AQ": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return l
        });
        var r = n("N1NS");

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function a(e, t) {
            return bodyNode[e] || document.documentElement[e]
        }
        var o = function() {
                function e(t, n) {
                    var a = this;
                    i(this, e), this.el = t, this.opts = n, this.module = Object(r.a)({
                        handlers: function(e, t) {
                            e(window, "scroll", a.onScroll.bind(a)), e(window, "resize", a.resize.bind(a))
                        }
                    }), this.innerHeight = window.innerHeight, this.prevScroll = this.scrollTop()
                }
                return e.prototype.update = function() {}, e.prototype.resize = function() {
                    this.innerHeight = window.innerHeight
                }, e.prototype.scrollTop = function(e) {
                    if (void 0 === e) return a("scrollTop", this.el);
                    ! function(e, t, n) {
                        "scrollTop" === e && window.scrollTo(0, t)
                    }("scrollTop", e, this.el)
                }, e.prototype.contHeight = function() {
                    return a("scrollHeight")
                }, e.prototype.smoothScroll = function(e) {
                    scrollToY(e + this.scrollTop(), 300)
                }, e.prototype.getContainer = function() {
                    return this.el
                }, e.prototype.scrollBottom = function(e) {
                    if (void 0 === e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                    var t = this.contHeight() - e - this.getScrollHeight();
                    this.scrollTop(t)
                }, e.prototype.scrollBottomFixSave = function(e) {
                    var t = this,
                        n = Date.now();
                    window.addEventListener("scroll", function r() {
                        Date.now() - n < 500 && t.scrollBottom(e), window.removeEventListener("scroll", r)
                    }), this.scrollBottom(e)
                }, e.prototype.onScroll = function(e) {
                    var t = this.scrollTop(),
                        n = t - this.prevScroll,
                        r = this.contHeight();
                    this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && r - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
                }, e.prototype.getScrollHeight = function() {
                    return this.innerHeight
                }, e.prototype.destroy = function() {
                    Object(r.c)(this.module)
                }, e
            }(),
            s = function() {
                function e(t, n) {
                    var r = this;
                    i(this, e), this.prevTop = 0, this.scroll = new uiScroll(t, {
                        hidden: void 0 === n.hidden || n.hidden,
                        shadows: n.shadows,
                        stopScrollPropagation: !1,
                        theme: n.scrollTheme,
                        onmore: function() {
                            return n.more && n.more(r)
                        },
                        onscroll: function(e) {
                            var t = r.scrollTop(),
                                i = r.prevTop - t;
                            r.prevTop = t, n.scrollChange && n.scrollChange(t), n.onScroll && n.onScroll(i, r)
                        }
                    })
                }
                return e.prototype.update = function() {
                    this.scroll.update("sync")
                }, e.prototype.scrollTop = function(e) {
                    return void 0 !== e ? this.scroll.scrollTop(e) : this.scroll.data.scrollTop
                }, e.prototype.getContainer = function() {
                    return this.scroll.content
                }, e.prototype.contHeight = function() {
                    return this.scroll.data.scrollHeight
                }, e.prototype.smoothScroll = function(e) {
                    this.scroll.scrollTop(this.scrollTop() + e, 300)
                }, e.prototype.scrollBottom = function(e) {
                    return void 0 !== e ? this.scroll.scrollBottom(e) : this.scroll.data.scrollBottom
                }, e.prototype.scrollBottomFixSave = function(e) {
                    var t = this,
                        n = Date.now();
                    this.scroll.emitter.addOnceListener("resize", function() {
                        Date.now() - n < 500 && t.scroll && t.scrollBottom(e)
                    }), this.scrollBottom(e)
                }, e.prototype.getScrollHeight = function() {
                    return this.scroll.data.viewportHeight
                }, e.prototype.destroy = function() {
                    this.scroll.destroy()
                }, e
            }(),
            c = function() {
                function e(t, n) {
                    i(this, e), this.el = t
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
            }();

        function l(e, t) {
            return t.noScroll ? new c(e) : t.nativeScroll ? new o(e, t) : new s(e, t)
        }
    },
    "1+Fu": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return f
        });
        var r = n("qKs0"),
            i = n("DM26"),
            a = new r,
            o = !1;

        function s(e) {
            return e.queue || e.key
        }

        function c() {
            a.forEach(function(e, t) {
                var n, r = e.onData,
                    i = e.onUpdateKey,
                    a = e.ts;
                n = t, window.curNotifier && !curNotifier.addQueues[s(n)] && Notifier.addKey(extend(t, {
                    ts: a
                }), d.bind(null, r, i, t))
            })
        }

        function l() {
            o || (o = setInterval(c, 3e3))
        }

        function u(e) {
            ! function(e) {
                if (!window.curNotifier) return !1;
                delete curNotifier.addQueues[s(e)]
            }(e), a.delete(e), 0 === a.size && (clearInterval(o), o = !1)
        }

        function d(e, t, n, r, o) {
            if (o.failed) return u(n), void
            function(e, t, n, r) {
                var o = void 0;
                switch (e) {
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                        o = r(t, e);
                        break;
                    case 4:
                        o = Object(i.c)(1).then(function() {
                            return t
                        });
                        break;
                    default:
                        throw new Error("Unkonwn error from queue: " + e)
                }
                Object(i.c)(3).then(function() {
                    return o
                }).then(function(e) {
                    a.set(e, {
                        onUpdateKey: r,
                        onData: n,
                        ts: e.ts
                    }), c(), l()
                })
            }(o.err, n, e, t);
            a.set(n, {
                onData: e,
                onUpdateKey: t,
                ts: intval(o.ts)
            }), o.events.map(function(e) {
                return e.split("<!>")
            }).forEach(e)
        }

        function f(e, t, n) {
            return Notifier.addKey(e, d.bind(null, t, n, e)), a.set(e, {
                onData: t,
                onUpdateKey: n,
                ts: e.ts
            }), l(), {
                stop: u.bind(null, e)
            }
        }
    },
    "1y80": function(e, t, n) {
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
        n.d(t, "c", function() {
            return r
        }), n.d(t, "a", function() {
            return i
        }), n.d(t, "b", function() {
            return a
        })
    },
    "6aSF": function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("+/AQ")),
            a = n("pemR"),
            o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };

        function s(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        var c = function(e) {
            function t() {
                var n, r;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                for (var i = arguments.length, a = Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                return n = r = s(this, e.call.apply(e, [this].concat(a))), r.getWrapperRef = function(e) {
                    r.wrapper = e
                }, s(r, n)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                var e = this.props,
                    t = e.isNative,
                    n = e.isShadows,
                    r = e.neverHide,
                    a = e.onScroll;
                this.scroller || (this.scroller = Object(i.a)(this.wrapper, {
                    shadows: n,
                    nativeScroll: t,
                    hidden: !r,
                    onScroll: a
                }))
            }, t.prototype.componentDidUpdate = function() {
                this.scroller.update()
            }, t.prototype.componentWillUnmount = function() {
                this.scroller.destroy(), this.scroller = null
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.children,
                    n = (e.isNative, e.isShadows, e.neverHide, e.className),
                    i = void 0 === n ? "" : n,
                    s = function(e, t) {
                        var n = {};
                        for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                        return n
                    }(e, ["children", "isNative", "isShadows", "neverHide", "className"]);
                return r.createElement("div", o({}, s, {
                    className: Object(a.a)("Scroll", i),
                    ref: this.getWrapperRef
                }), t)
            }, t
        }(r.Component);
        t.a = c, c.defaultProps = {
            isNative: !1,
            isShadows: !1,
            neverHide: !1,
            onScroll: null
        }
    },
    "7p7+": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var r = n("q1tI"),
            i = n("pemR"),
            a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };

        function o(e) {
            var t = e.children,
                n = e.className,
                o = function(e, t) {
                    var n = {};
                    for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                    return n
                }(e, ["children", "className"]);
            return r.createElement("div", a({}, o, {
                className: Object(i.a)("Stub", n)
            }), t || "No results.")
        }
    },
    "86+7": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "c", function() {
            return a
        }), n.d(t, "a", function() {
            return o
        });
        var r = n("aong");

        function i(e, t) {
            return t in Object(r.s)(e).oCache
        }

        function a(e, t) {
            var n = Object(r.s)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function o(e, t) {
            var n = Object(r.s)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    "8h6g": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return r
        }), n.d(t, "c", function() {
            return i
        }), n.d(t, "a", function() {
            return a
        });
        var r = "avi mp4 3gp mpeg mov flv f4v wmv mkv webm vob rm rmvb m4v mpg ogv ts m2ts mts mxf".split(" "),
            i = 5,
            a = 4194304
    },
    95: function(e, t, n) {
        e.exports = n("M24l")
    },
    As6E: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = n("i8i4"),
            a = (n("17x9"), n("pemR")),
            o = n("clTp");
        var s = 80,
            c = 250,
            l = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onClick = function() {
                        if (!r.state.dropdown || r.state.dropdown.removed) {
                            var e = r.props,
                                t = e.text,
                                n = e.position,
                                i = e.align,
                                a = e.marginTop,
                                s = e.marginLeft,
                                c = Object(o.a)(r.el);
                            r.update({
                                text: t,
                                position: n,
                                align: i,
                                rect: c,
                                marginTop: a,
                                marginLeft: s
                            })
                        } else r.update()
                    }, r.onMouseEnter = function(e) {
                        r.callerHovered = !0, r.timeouts.appear = setTimeout(function() {
                            if (r.el && r.callerHovered) {
                                var e = r.props,
                                    t = e.position,
                                    n = e.align,
                                    i = e.marginTop,
                                    a = e.marginLeft,
                                    s = Object(o.a)(r.el);
                                r.update({
                                    position: t,
                                    align: n,
                                    rect: s,
                                    marginTop: i,
                                    marginLeft: a
                                })
                            }
                        }, s)
                    }, r.onMouseLeave = function(e) {
                        r.callerHovered = !1, r.timeouts.callerDisappear = setTimeout(function() {
                            r.callerHovered || r.hovered || r.update()
                        }, c)
                    }, r.onDropdownMouseEnter = function() {
                        "hover" === r.props.trigger && (r.hovered = !0)
                    }, r.onDropdownMouseLeave = function(e) {
                        "hover" === r.props.trigger && (r.hovered = !1, r.timeouts.disappear = setTimeout(function() {
                            r.callerHovered || r.hovered || r.update()
                        }, c))
                    }, r.onDocumentClick = function(e) {
                        !r.state.dropdown || r.state.dropdown.removed || r.el.contains(e.target) || r.update()
                    }, r.onResize = function(e) {
                        if (r.state.dropdown && !r.state.dropdown.removed) {
                            var t = r.props,
                                n = t.text,
                                i = t.position,
                                a = t.align,
                                s = t.marginTop,
                                c = t.marginLeft,
                                l = Object(o.a)(r.el);
                            r.update({
                                text: n,
                                position: i,
                                align: a,
                                rect: l,
                                marginTop: s,
                                marginLeft: c
                            })
                        }
                    }, r.onTransitionEnd = function(e) {
                        "visibility" === e.propertyName && r.state.dropdown && r.state.dropdown.removed && r.setState({
                            dropdown: void 0
                        })
                    }, r.onItemClick = function(e, t) {
                        t.separator || (r.update(), t.onClick(e))
                    }, r.state = {}, r.timeouts = {}, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.componentDidMount = function() {
                    this.el = i.findDOMNode(this), "click" === this.props.trigger ? (this.el.addEventListener("click", this.onClick), document.addEventListener("mousedown", this.onDocumentClick), window.addEventListener("resize", this.onResize)) : (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave))
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
                        i = e.marginTop,
                        a = e.marginLeft,
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
                    o = Math.round(o + a), s = Math.round(s + i), this.setState({
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
                    var t, n, i, o = this.state.dropdown,
                        s = o.x,
                        c = o.y,
                        l = o.position,
                        u = o.align,
                        d = o.removed,
                        f = Object(a.a)("Dropdown", "Dropdown--" + l, (t = {
                            "Dropdown--removed": !!d
                        }, n = "Dropdown--align-" + u, i = "t" === l || "b" === l, n in t ? Object.defineProperty(t, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : t[n] = i, t), this.props.className);
                    return r.createElement("div", {
                        className: f,
                        style: {
                            top: c,
                            left: s
                        },
                        onTransitionEnd: function(t) {
                            return e.onTransitionEnd(t)
                        },
                        onMouseEnter: this.onDropdownMouseEnter,
                        onMouseLeave: this.onDropdownMouseLeave
                    }, r.createElement("ul", {
                        className: "Dropdown__in"
                    }, this.props.data.map(function(t, n) {
                        return r.createElement("li", {
                            className: Object(a.a)("Dropdown__item", {
                                Dropdown__item_separator: t.separator
                            }),
                            onClick: function(n) {
                                return e.onItemClick(n, t)
                            },
                            key: void 0 !== t.id ? t.id : n
                        }, t.text)
                    })))
                }, t.prototype.render = function() {
                    var e = this.renderDropdown();
                    return e ? (this.defaultNode || "undefined" == typeof window || (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), r.createElement(r.Fragment, null, this.props.children, i.createPortal(e, this.defaultNode))) : this.props.children
                }, t
            }(r.Component);
        t.a = l, l.defaultProps = {
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
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR")),
            a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };
        var o = function(e) {
            function t() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.hovered,
                    n = e.className,
                    o = e.children,
                    s = function(e, t) {
                        var n = {};
                        for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                        return n
                    }(e, ["hovered", "className", "children"]),
                    c = Object(i.a)("Link", {
                        "Link--hovered": !!t
                    }, n);
                return this.props.href ? r.createElement("a", a({}, s, {
                    className: c
                }), o) : r.createElement("span", a({}, s, {
                    className: c
                }), o)
            }, t
        }(r.Component);
        t.a = o, o.defaultProps = {
            href: void 0,
            hovered: !1
        }
    },
    BxOC: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return o
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
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                i = void 0;
            return i = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise(function(r, a) {
                    var o = void 0,
                        s = Date.now(),
                        c = n.timeout || 60,
                        l = ajx2q(t);
                    if (window.XDomainRequest) i.open("get", e + "?" + l), i.ontimeout = function(e) {
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
                            i.open("GET", e + "?" + l, !0)
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
    DM26: function(e, t, n) {
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

        function s(e) {
            return function() {
                for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return new Promise(function(t) {
                    return e.apply(void 0, n.concat([t]))
                })
            }
        }
        n.d(t, "c", function() {
            return r
        }), n.d(t, "e", function() {
            return i
        }), n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return o
        }), n.d(t, "d", function() {
            return s
        })
    },
    ERyv: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return l
        }), n.d(t, "b", function() {
            return u
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "d", function() {
            return f
        }), n.d(t, "e", function() {
            return m
        });
        var r = n("BxOC"),
            i = n("DM26"),
            a = void 0,
            o = 1;

        function s(e, t, n, r, i) {
            if ("Script error." !== e) {
                var o = i ? i.stack || i.message : null;
                u("unhandled_error", o ? {
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

        function l() {
            return !!window.imwl
        }

        function u(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            l() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.e)(r.b, 3, function() {
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

        function d(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return u(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function f() {
            a = window.onerror, window.onerror = s, window.addEventListener("unhandledrejection", c)
        }

        function m() {
            window.onerror = a, a = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    EUzL: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
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

            function l() {
                !s.length || a > 0 || c || (t(s), s = [])
            }
            return {
                pause: function() {
                    a++
                },
                resume: function() {
                    a > 0 && (a--, l())
                },
                onLp: function(e, t, a) {
                    var u;
                    c || (o >= e ? (o = t, (u = s).push.apply(u, i(a)), l()) : n && (c = !0, n(o).then(function(e) {
                        var t, n = r(e, 3),
                            a = (n[0], n[1]),
                            u = n[2];
                        o = a, c = !1, (t = s).push.apply(t, i(u)), l()
                    })))
                }
            }
        }
    },
    FABD: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR")),
            a = n("vRp6"),
            o = n("p+C8"),
            s = n("XpgC"),
            c = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };
        var l = 27,
            u = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onRemoveToken = function(e) {
                        var t = r.searchContainer.offsetHeight;
                        r.props.onRemoveToken(e.target.getAttribute("data-id")).then(function() {
                            r.updateScroll(t)
                        })
                    }, r.onChange = function(e) {
                        var t = e.target.value;
                        t !== r.value && (r.value = t, r.props.onChange(e), r.scrollContainer.scrollTop = 0)
                    }, r.onSelect = function(e) {
                        var t = r.searchContainer.offsetHeight;
                        r.props.onSelect(e.currentTarget.getAttribute("data-id")).then(function() {
                            r.updateScroll(t)
                        })
                    }, r.onKeydown = function(e) {
                        e.keyCode === l && (r.input.value = "", r.input.blur(), r.props.onChange(e), e.stopPropagation())
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
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.componentDidMount = function() {
                    this.input.addEventListener("keydown", this.onKeydown)
                }, t.prototype.componentWillUnmount = function() {
                    this.input.removeEventListener("keydown", this.onKeydown)
                }, t.prototype.render = function() {
                    var e = this,
                        t = this.props,
                        n = t.className,
                        l = t.tokens,
                        u = (t.onSelect, t.onRemoveToken, t.removeTokenPlaceholder),
                        d = t.value,
                        f = t.placeholder,
                        m = t.useInfiniteScroll,
                        p = t.loadMore,
                        g = t.hasMore,
                        h = t.virtualized,
                        b = t.notFoundText,
                        _ = t.children,
                        v = t.emptyText,
                        y = t.isSearching,
                        j = function(e, t) {
                            var n = {};
                            for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                            return n
                        }(t, ["className", "tokens", "onSelect", "onRemoveToken", "removeTokenPlaceholder", "value", "placeholder", "useInfiniteScroll", "loadMore", "hasMore", "virtualized", "notFoundText", "children", "emptyText", "isSearching"]),
                        O = m ? a.a : "div",
                        w = m ? {
                            loadMore: p,
                            hasMore: g,
                            virtualized: h,
                            useCapture: !1
                        } : {},
                        k = [].concat(_);
                    return r.createElement("div", {
                        className: Object(i.a)("MultiSelect", n)
                    }, r.createElement("div", {
                        className: "MultiSelect__search",
                        ref: this.searchContainerRef
                    }, l.map(function(t, n) {
                        return r.createElement("span", {
                            className: "MultiSelect__token",
                            key: t.id
                        }, r.createElement("span", {
                            className: "MultiSelect__tokenTitle"
                        }, t.text), u ? r.createElement(s.a, {
                            text: u
                        }, r.createElement("span", {
                            className: "MultiSelect__tokenRemove",
                            "data-id": t.id,
                            onClick: e.onRemoveToken
                        })) : r.createElement("span", {
                            className: "MultiSelect__tokenRemove",
                            "data-id": t.id,
                            onClick: e.onRemoveToken
                        }))
                    }), r.createElement("div", {
                        className: "MultiSelect__caret"
                    }, r.createElement("div", {
                        className: "MultiSelect__caretIn"
                    }, r.createElement("input", c({}, j, {
                        type: "text",
                        className: "MultiSelect__input",
                        placeholder: 0 === l.length ? f : "",
                        onChange: this.onChange,
                        onInput: this.onChange,
                        onPaste: this.onChange,
                        value: d,
                        ref: this.inputRef
                    }))))), 0 === k.length && (d || v) && !y && r.createElement("div", {
                        className: "MultiSelect__empty"
                    }, r.createElement("div", {
                        className: "MultiSelect__emptyIn"
                    }, d ? b : v)), r.createElement(O, c({
                        className: "MultiSelect__scroll",
                        ref: this.scrollContainerRef
                    }, w), k.map(function(t) {
                        return r.createElement(o.a, {
                            className: "MultiSelect__suggestsItem",
                            "data-id": t.props["data-id"],
                            onClick: e.onSelect,
                            key: t.key
                        }, t)
                    })))
                }, t
            }(r.PureComponent);
        t.a = u, u.defaultProps = {
            removeTokenPlaceholder: "",
            placeholder: "",
            value: "",
            useInfiniteScroll: !1,
            notFoundText: "Not found"
        }
    },
    M24l: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n("vT4u"),
            i = n("P13b"),
            a = n("rHUl"),
            o = n("MhhX"),
            s = n("N1NS"),
            c = n("f01n");

        function l(e, t) {
            return {
                isAll: function(e) {
                    return Object(r.X)(e.get().peer, e.get())
                },
                loadMore: function(e) {
                    return function(e) {
                        return Object(r.X)(e.get().peer, e.get()) ? Promise.resolve("") : Object(r.hc)(e.get().peer, e.get())
                    }(e)
                },
                unmount: function() {
                    Object(s.c)(t)
                }
            }
        }

        function u(e) {
            return e.findIndex(function(e) {
                return "number" == typeof e.peerId && e.href
            }) > -1
        }

        function d(e, t) {
            var n = function(e, t, n) {
                var a = intval(domData(n, "msgid"));
                if (!getSelectionText() && !Object(i.E)(t)) {
                    var o = intval(domData(n, "peer"));
                    return e.set(r.m.bind(null, o)), e.get().longpoll.push([Object(c.bb)(o, a)]), !1
                }
            }.bind(null, t);
            return l(0, Object(s.a)({
                handlers: function(t, r) {
                    r(e, "click", "_im_mess", n)
                }
            }))
        }
        var f = n("h++7"),
            m = n("ERyv");

        function p(e, t) {
            if (!t) return ls.get(e);
            ls.set(e, t)
        }
        var g = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = debounce(p, 300),
                    r = extend({}, e),
                    i = [],
                    a = [];
                return t.store && (r = ls.get(t.key) || r), {
                    get: function() {
                        return r
                    },
                    set: function(e) {
                        var i = this,
                            a = Object(m.c)() ? function(e) {
                                try {
                                    var t = {};
                                    return Error.captureStackTrace(t, e), t.stack
                                } catch (e) {
                                    return ""
                                }
                            }(this.set) : null;
                        return e(r).then(function(e) {
                            return r = e, t.store && n(t.key, e), i.emit(), i
                        }).catch(function(e) {
                            return Object(m.a)("store_set_catch", e, {
                                stack: a
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
                        i.push(r), r = extend({}, e), this.emit()
                    },
                    reset: function() {
                        r = extend({}, e), this.emit()
                    },
                    unmount: function() {
                        r = {}, e = !1, a = []
                    },
                    pop: function() {
                        i.length > 0 && (r = i.pop(), this.emit())
                    },
                    emit: function() {
                        var e = this;
                        a.length > 0 && a.forEach(function(t) {
                            return t(e)
                        })
                    },
                    subscribe: function(e) {
                        -1 === a.indexOf(e) && a.push(e)
                    },
                    unsubscribe: function(e) {
                        a = a.filter(function(t) {
                            return t !== e
                        })
                    },
                    mutate: function(e) {
                        e(r), t.store && n(t.key, r), this.emit()
                    }
                }
            },
            h = n("aong"),
            b = n("+/AQ");

        function _(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function v(e, t) {
            return Object(h.q)(e).find(function(e) {
                return domData(e, "list-id") === t
            })
        }

        function y(e, t) {
            return Object(h.q)(e).findIndex(function(e) {
                return domData(e, "list-id") === t
            })
        }

        function j(e, t, n, r) {
            if (n) {
                O(e, t, r);
                var i = domData(n, "list-id"),
                    a = i && v(t.children, i);
                a && r.forEach(function(e) {
                    return addClass(a, e)
                }), e.setState({
                    hoveredListItemId: i
                })
            }
        }

        function O(e, t, n) {
            var r = domQuery("." + n.join("."), t);
            r && Object(h.q)(r).forEach(function(e) {
                n.forEach(function(t) {
                    return removeClass(e, t)
                })
            }), e.setState({
                hoveredListItemId: null
            })
        }

        function w(e, t) {
            var n = t && domQuery("." + t.join("."), e)[0];
            return n ? domData(n, "list-id") : null
        }

        function k(e, t, n) {
            return e.map(t).reduce(function(e, t) {
                return e[t] = !0, e
            }, n)
        }

        function C(e, t, n) {
            return {
                ids: k(n.get().elements, e, {}),
                scrolls: t,
                activated: !0
            }
        }

        function S(e) {
            var t = {};
            return e.forEach(function(e) {
                "r" === e[0] && t["a," + e[1]] ? delete t["a," + e[1]] : t[e[0] + "," + e[1]] = e
            }), Object.keys(t).map(function(e) {
                return t[e]
            })
        }

        function E(e, t, n, r, i, a) {
            for (var o = 0; o < r; o++) e = domNS(e);
            var s = se(i(t));
            return domData(s, "list-id", n), e ? a.insertBefore(s, e) : a.appendChild(s), e
        }

        function x(e, t, n, r, i) {
            var a = r.get(),
                o = a.limit,
                s = a.offset,
                c = function(e, t) {
                    var n = t.get();
                    return !n._sortedEls && e && t.setState({
                        elements: n.elements.sort(e),
                        _sortedEls: !0
                    }), t.get().elements
                }(n().sortFn, r).slice(0, s + o),
                l = function(e, t) {
                    for (var n = [], r = Math.max(e.length, t.length), i = 0; i < r; i++) {
                        var a = e[i],
                            o = t[i];
                        !a && o ? n.push(["a", o, i]) : a && !o ? n.push(["r", a, i]) : a !== o && (n.push(["r", a, i]), n.push(["a", o, i]))
                    }
                    var s = S(n),
                        c = S(n.reverse());
                    return s.length > c.length ? c : s
                }(Object(h.q)(e.children).map(function(e) {
                    return domData(e, "list-id")
                }).filter(function(e) {
                    return !!e
                }), c.map(function(e) {
                    return n().idFn(e).toString()
                }));
            if (function(e, t, n, r) {
                    if (0 !== t.length) {
                        var i = (t = t.sort(function(e, t) {
                            return e[2] - t[2]
                        })).filter(function(e) {
                            return "a" === e[0]
                        });
                        if (t.filter(function(e) {
                                return "r" === e[0]
                            }).map(function(t) {
                                return e.children[t[2]]
                            }).forEach(function(e) {
                                return re(e)
                            }), 0 !== i.length)
                            for (var a = i.shift(), o = a[2], s = (E(e.children[o], n[a[2]], a[1], 0, r, e), 0); s < i.length; s++) a = i[s], E(e.children[o], n[a[2]], a[1], a[2] - o, r, e), o = a[2]
                    }
                }(e, l, c, n().renderFn), function(e, t) {
                    e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
                }(r, t), i) return l.filter(function(e) {
                return "a" == e[0]
            }).map(function(e) {
                return parseInt(e[1])
            })
        }

        function I(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
                o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                s = e.get(),
                c = t.getContainer().children,
                l = y(c, r || s.hoveredListItemId);
            if (!(l < 0)) {
                (s.limit + s.offset < l ? e.setState({
                    offset: l - s.limit + 1
                }).then(x.bind(null, t.getContainer(), t, n)) : Promise.resolve()).then(function() {
                    var e = c[l],
                        n = t.scrollTop(),
                        r = t.getScrollHeight(),
                        s = e.offsetHeight;
                    a = "center" === a ? -.5 * t.getScrollHeight() : a, o = "center" === o ? r / 2 : o;
                    var u = i ? function(e) {
                            t.smoothScroll(e - t.scrollTop())
                        } : t.scrollTop.bind(t),
                        d = n + a > e.offsetTop,
                        f = s + e.offsetTop > n + r - o;
                    d ? u(e.offsetTop - a) : f && u(e.offsetTop - r + s + o)
                })
            }
        }

        function T(e, t) {
            var n = e.get().pipeId;
            return !(void 0 !== n && void 0 !== t && n !== t)
        }

        function P(e, t, n, r, i, a) {
            return !!T(e, i) && e.setState(function(e, t, n) {
                var r = e.filter(function(e) {
                    return !n.ids[t(e)]
                });
                return {
                    _sortedEls: !1,
                    els: r,
                    ids: k(r, t, n.ids),
                    elements: n.elements.concat(r)
                }
            }(a, r().idFn, e.get())).then(x.bind(null, t, n, r))
        }

        function M(e, t, n) {
            var r = function(e, t) {
                    if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
                    e.get().loading = !0;
                    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
                    return t.apply(void 0, r).then(function() {
                        e.get().loading = !1
                    })
                }.bind(null, t, function(e, t, n, r) {
                    var a = e.get(),
                        o = a.elements,
                        s = r.getContainer(),
                        c = e.setState({
                            offset: a.offset + a.limit
                        }).then(function() {
                            var n = a.offset,
                                i = a.limit,
                                c = void 0;
                            return i + n > o.length ? c = t().more(n, i).then(function(t) {
                                return !1 === t ? [] : (0 === t.length && e.setState({
                                    stop: !0
                                }), t)
                            }).then(P.bind(null, e, s, r, t, a.pipeId)) : (c = Promise.resolve(), x(s, r, t, e)), c
                        });
                    if (!n) {
                        var l = o.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
                        Object(i.Lc)(s)(c, "bottom", l)
                    }
                    return c
                }.bind(null, t, n)),
                a = function(e, r) {
                    (t.get().activated || e) && (void 0 !== r && t.get().elements.length > 0 && t.setState({
                        scrolled: r
                    }), n().onScroll && n().onScroll())
                },
                o = Object(b.a)(e, {
                    noScroll: t.get().noScroll,
                    nativeScroll: t.get().nativeScroll,
                    scrollChange: a.bind(null, !1),
                    more: !!n().more && r.bind(null, !1)
                }),
                c = Object(s.a)({
                    handlers: function(r, i) {
                        i(e, "click", t.get().elCls, n().onClick)
                    }
                });
            return t.setState(C(n().idFn, {}, t)), {
                pipe: function(e, r) {
                    return t.setState({
                        pipeId: r
                    }), e.then(P.bind(null, t, o.getContainer(), o, n, r))
                },
                replacePreserveOrder: function(e) {
                    return t.set(function(e, t, n) {
                        var r = [];
                        n.elements = n.elements.map(function(n) {
                            var i = t(n),
                                a = e.filter(function(e) {
                                    return t(e) === i
                                })[0];
                            return r.push(i), a || n
                        });
                        var i = e.filter(function(e) {
                            return !inArray(t(e), r)
                        });
                        return n.elements = n.elements.concat(i), Promise.resolve(n)
                    }.bind(null, e, n().idFn)).then(x.bind(null, o.getContainer(), o, n))
                },
                pipeReplace: function(e, r) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return t.setState({
                        pipeId: r,
                        stop: !1
                    }), e.then(function(e) {
                        if (T(t, r)) return t.setState({
                            elements: e,
                            _sortedEls: !1,
                            ids: k(e, n().idFn, {})
                        }).then(x.bind(null, o.getContainer(), o, n, t, i))
                    })
                },
                wipe: function() {
                    o.getContainer().innerHTML = ""
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
                    return t.set(function(e, t, n) {
                        return n.scrolls || (n.scrolls = {}), n.scrolls[e] && !t || (n.scrolls[e] = {
                            scrolled: n.scrolled || 0,
                            scrollItem: n.scrollItem
                        }), Promise.resolve(n)
                    }.bind(null, e, n))
                },
                updateScroll: function() {
                    o.update(!1, !0)
                },
                toTop: function(e) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? o.smoothScroll(-o.scrollTop()) : o.scrollTop(0), e && a(e, 0)
                },
                scrollTop: function(e) {
                    return o.scrollTop(e)
                },
                restoreScroll: function(e) {
                    var n = t.get().scrolls,
                        r = n[e];
                    return r && (t.setState({
                        scrolls: extend({}, n, _({}, e, null))
                    }), o.scrollTop(r.scrolled)), !!r
                },
                unsetScroll: function(e) {
                    t.setState({
                        scrolls: extend({}, t.get().scrolls, _({}, e, null))
                    })
                },
                scrollPage: function(e, t) {
                    var n = o.scroll.scroller,
                        r = o.scrollTop(),
                        i = r + ("up" === e ? -1 : 1) * n.clientHeight;
                    t ? o.smoothScroll(i - r) : o.scrollTop(i)
                },
                scrollToElement: function(e, r, i, a) {
                    I(t, o, n, e, r, i, a)
                },
                checkMore: function(e) {
                    return t.get().elements.length < t.get().limit ? r(e, o) : Promise.resolve([])
                },
                add: function(e, r) {
                    return P(t, o.getContainer(), o, n, r, e)
                },
                hoverNextElement: function(e, r) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        a = o.getContainer(),
                        s = a.children,
                        c = y(s, t.get().hoveredListItemId || w(a, r)),
                        l = Object(h.q)(s).slice(c + 1).find(n().hoverableFn);
                    j(t, a, l, e), I(t, o, n, null, !1, i.top, i.bottom)
                },
                hoverPrevElement: function(e, r) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        a = o.getContainer(),
                        s = a.children,
                        c = y(s, t.get().hoveredListItemId || w(a, r)),
                        l = c >= 0 && Object(h.q)(s).slice(0, c).reverse().find(n().hoverableFn);
                    j(t, a, l, e), I(t, o, n, null, !1, i.top, i.bottom)
                },
                hoverFirstElement: function(e, r) {
                    var i = o.getContainer(),
                        a = i.children,
                        s = Object(h.q)(a).findIndex(n().hoverableFn),
                        c = a[s];
                    !t.get().hoveredListItemId && c && (j(t, i, c, e), I(t, o, n, s, !1, r.top, r.bottom))
                },
                hoverElement: function(e, r, i) {
                    var a = o.getContainer(),
                        s = a.children,
                        c = y(s, e),
                        l = s[c];
                    l && (j(t, a, l, r), I(t, o, n, c, !1, i.top, i.bottom))
                },
                unhoverElements: function(e) {
                    O(t, o.getContainer(), e)
                },
                reset: function() {
                    var e = t.get().scrolls;
                    t.reset(), t.setState(C(n().idFn, e, t))
                },
                getHoveredElement: function() {
                    return v(o.getContainer().children, t.get().hoveredListItemId)
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
                    t.set(function(e, t, n) {
                        return n.elements = n.elements.filter(function(n) {
                            return t(n) !== e
                        }), delete n.ids[e], Promise.resolve(n)
                    }.bind(null, e, n().idFn)).then(x.bind(null, o.getContainer(), o, n))
                },
                unmount: function() {
                    Object(s.c)(c), o.destroy()
                }
            }
        }
        var L = n("1y80"),
            B = n("86+7"),
            D = n("lJdi"),
            N = function() {
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

        function A(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var H = 64,
            R = "_im_dialog_star",
            F = "_im_dialog_daction",
            q = ["_im_dialog_selected", "nim-dialog_selected"],
            U = ["_im_dialog_hovered", "nim-dialog_hovered"];

        function z(e) {
            return hasClass(e, "_im_search")
        }

        function W(e, t, n, o, s) {
            if (!gpeByClass("_im_peer_target", o.target)) {
                var l = t.get(),
                    u = z(s),
                    d = parseInt(domData(s, "peer"), 10),
                    f = parseInt(domData(s, "msgid"), 10),
                    m = Object(a.t)(t, d),
                    p = "";
                if (Object(a.L)(t) && (p = "conversations_search"), Object(a.H)(t) && (p = "recent_searches"), hasClass(s, "_im_sugg_" + d) && (p = "popular_suggestions"), u && (p = "message_search"), checkEvent(o)) return window.open(function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        a = Object(i.S)(e),
                        o = function() {
                            return a + "?sel=" + Object(i.H)(t.peerId) + (r && n ? "&msgid=" + n : "")
                        };
                    if (r) return o();
                    if (Object(i.Fb)(t.peerId) || Object(i.kb)(t.peerId)) return Object(i.ib)(e) ? o() : t.href;
                    return o()
                }(t, m, f, u));
                if (n.saveScroll("list"), u && l.msgid !== f) l.longpoll.push([c.bb(d, f, !1, !1, p)]);
                else if (d !== l.peer) {
                    l.longpoll.push([c.bb(d, !1, !0, !0, p)]);
                    var g = Object(a.L)(t);
                    g && !hasClass(s, "_dont_add_recent") && Object(r.bc)(d, cur.imDb), g && m && !Object(i.ib)(t) && setTimeout(function() {
                        var e = m.message ? m.message.messageId : m.peerId;
                        n.scrollToElement(e.toString(), !0, 0, "center")
                    }, 100)
                } else d === l.peer && e().goToHistoryEnd();
                cancelEvent(o)
            }
        }

        function K(e, t, n, r) {
            var a = void 0;
            return !Object(i.hb)(t) || "string" == typeof n.photo && "" !== n.photo ? (a = '<img src="' + n.photo + '" alt="">', r && (a = getTemplate("im_dialogs_link_img", {
                href: n.href,
                photo: a
            }))) : a = Object(i.Xb)(e, n, !r), {
                photo: a,
                userLink: '<span class="_im_dialog_link">' + n.tab + "</span>"
            }
        }

        function V(e, t, n, r) {
            return n ? "" : r ? getTemplate("im_img_prebody", {
                photo: t
            }) : e + ":"
        }

        function Q(e, t, n) {
            return !!(n & c.m) && (!Object(i.Ab)(t.peerId, e.get().gid) && (!(Object(i.hb)(t.peerId) && t.data && t.data.closed) && (!t.unread && !(t.lastmsg <= t.out_up_to))))
        }

        function X(e) {
            var t = $(e);
            return (e.unread > 0 ? e.unread : "") > 0 && t
        }

        function G(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                o = K(e, t.peerId, t, Object(i.ib)(e)),
                s = o.photo,
                l = o.userLink,
                u = n || $(t);
            if (!u) return function(e, t, n, r) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                    s = [];
                return Object(i.ib)(r) && s.push("nim-dialog_classic"), Object(a.H)(r) && s.push("nim-dialog_recent"), s.push("nim-dialog_empty"), o.search && s.push("_im_search"), getTemplate("im_drow", {
                    peer: e.peerId,
                    msg_id: "",
                    photo: t,
                    user_link: n,
                    date: "",
                    body: "",
                    unread: "",
                    more: s.join(" "),
                    is_star: "",
                    unread_message_string: "",
                    is_online: onlinePlatformClass(e.online),
                    is_unread: "",
                    is_unread_out: "",
                    is_selected: e.peerId == r.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
                })
            }(t, s, l, e, r);
            var d = u.flags,
                f = Object(i.pb)(e, t.peerId),
                m = Z(t, e, n),
                p = [];
            r.search && p.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && p.push("nim-dialog_muted"), t.verified && p.push("nim-dialog_verified"), Object(a.H)(e) && p.push("nim-dialog_recent"), -1 === u.messageId && p.push("nim-dialog_empty"), Object(i.ib)(e) && p.push("nim-dialog_classic"), t.folders & c.q && p.push("nim-dialog_starred"), !r.search && Object(i.Db)(e, t.peerId, t) && p.push("nim-dialog_unrespond"), f && e.get().gid && p.push("nim-dialog_deny-remove");
            var g = e.get().timeshift,
                h = Q(e, t, d) ? "nim-dialog_unread-out" : "",
                b = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
            return getTemplate("im_drow", {
                peer: t.peerId,
                msg_id: u.messageId,
                photo: s,
                user_link: l,
                date: u.date ? getShortDateOrTime(u.date, g, !0, getLang("months_sm_of", "raw")) : "",
                body: m,
                unread_message_string: b,
                tab_name: stripHTML(t.tab),
                unread: Object(i.Bc)(t.unread),
                more: p.join(" "),
                is_online: onlinePlatformClass(t.online),
                is_unread: X(t) ? "nim-dialog_unread" : "",
                is_unread_out: h,
                is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
            })
        }

        function J(e, t, n, r, o) {
            if (!t.deletedDialog)
                if (hasClass(e, "nim-conversation-search-row")) Y(e, t, n);
                else {
                    var s = $(t),
                        l = s.flags,
                        u = Z(t, n),
                        d = K(n, t.peerId, t, Object(i.ib)(n)).photo,
                        f = n.get().timeshift,
                        m = s.date ? getShortDateOrTime(s.date, f, !0, getLang("months_sm_of", "raw")) : "";
                    ue(e, t), val(geByClass1("_dialog_body", e), u), val(geByClass1("_im_dialog_date", e), m), val(geByClass1("_im_dialog_unread_ct", e), Object(i.Bc)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
                    var p = geByClass1("_im_dialog_photo", e);
                    p.innerHTML !== d && val(p, d), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & c.q), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", Object(i.Db)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", Object(i.ib)(n)), toggleClass(e, "nim-dialog_unread", X(t)), toggleClass(e, "nim-dialog_deny-remove", n.get().gid > 0 && Object(i.pb)(n, t.peerId)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", Object(a.H)(n)), toggleClass(e, "nim-dialog_empty", -1 === s.messageId), Q(n, t, l) && addClass(e, "nim-dialog_unread-out"), o && setTimeout(function() {
                        addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
                    }, 100)
                }
        }

        function Y(e, t, n) {
            ue(e, t), toggleClass(e, "nim-dialog_recent", Object(a.H)(n)), val(geByClass1("_im_dialog_unread_ct", e), Object(i.Bc)(t.unread));
            var r = K(n, t.peerId, t, Object(i.ib)(n)).photo,
                o = geByClass1("_im_dialog_photo", e);
            o.innerHTML !== r && val(o, r), toggleOnline(geByClass1("_im_peer_online", e), t.online), X(t) && addClass(e, "nim-dialog_unread")
        }

        function Z(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || $(e);
            if (Object(i.vb)(e.peerId, t)) {
                var r = t.get().block_states[e.peerId].name,
                    s = getLang("mail_community_answering").replace("{username}", r);
                return getTemplate("im_drow_prebody", {
                    prebody: s,
                    body: ""
                })
            }
            return Object(o.l)(n) ? Object(i.bc)(t, n, e, !1) : function(e, t, n, r, o, s, l, u, d, f) {
                var m = "",
                    p = Object(a.y)(e, Object(a.t)(e, n));
                return t & c.m ? m = V(getLang("mail_by_you"), f, p, d) : Object(i.hb)(n) && 0 !== r && (m = V(Object(B.c)(e, r).first_name, Object(B.c)(e, r).photo, p, d)), l = Object(i.cc)(n, u, l, o, s), m ? getTemplate("im_drow_prebody", {
                    prebody: m,
                    body: l
                }) : l
            }(t, n.flags, e.peerId, n.userId, !0, n.attaches, n.text, n.subject, Object(i.ib)(t), Object(B.c)(t, t.get().id).photo)
        }

        function $(e) {
            var t = e.lastmsg_meta;
            return isArray(t) && (t = Object(c.Z)([4].concat(t))), t || Object(c.Z)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
        }

        function ee(e, t, n) {
            var a = Object(i.rc)(e, t, function(o) {
                n().updateMenu(e), o && Object(i.F)(e, a, n, r.I, t), Object(i.hb)(t) && e.set(r.cb.bind(null, t)), a.hide()
            })
        }

        function te(e, t, n, a, o, s) {
            var c = gpeByClass("_im_dialog", s, n);
            if (cancelEvent(o), !c) return !1;
            var l = intval(domData(c, "peer")),
                u = t.get(),
                d = Object(i.kb)(l) || Object(i.Fb)(l);
            if (u.recentSearch) {
                var f = Object(r.Kb)(l, cur.imDb);
                re(c), 0 === f.length && pe(t, a, e)
            } else Object(i.ib)(t) && d ? Object(r.y)(l, u).then(function(n) {
                var r = N(n, 2),
                    i = r[0],
                    a = r[1];
                i ? (! function(e, t, n, r, i) {
                    var a = geByClass1("_dialog_body", t);
                    addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(a, getTemplate("im_delete_actions", {
                        text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
                        peer: e,
                        spam_id: r
                    }))
                }(l, c, i, a), e().updateMenu(t)) : ee(t, l, e)
            }) : ee(t, l, e);
            return !1
        }

        function ne(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                r = K(e, t.peerId, t, Object(i.ib)(e)),
                o = r.photo,
                s = r.userLink,
                c = function(e) {
                    return !Object(i.xb)(e)
                }(e),
                l = "" === n ? [] : [n];
            return Object(a.H)(e) && l.push("nim-dialog_recent"), Object(i.ib)(e) && l.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && l.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
                peer: t.peerId,
                msg_id: t.lastmsg || "",
                photo: o,
                user_link: s,
                unread: Object(i.Bc)(t.unread),
                tab_name: stripHTML(t.tab),
                is_unread: X(t) ? "nim-dialog_unread" : "",
                is_online: onlinePlatformClass(t.online),
                is_selected: t.peerId == e.get().peer && c ? "nim-dialog_selected _im_dialog_selected" : "",
                more: l.join(" ")
            })
        }

        function ie(e, t) {
            return e.map(function(e) {
                return Object(c.Z)([4].concat(e))
            }).map(function(e) {
                return extend({}, t[e.peerId], {
                    message: e
                })
            })
        }

        function ae(e) {
            return {
                type: "empty",
                lang: e
            }
        }

        function oe(e, t) {
            var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
            return void 0 !== n ? 2e9 + n : t.lastmsg
        }

        function le(e, t, n, r) {
            showTooltip(r, {
                text: function() {
                    var n = gpeByClass("_im_dialog", r, t),
                        i = domData(n, "peer");
                    return e.get().tabs[i].folders & c.q ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                },
                black: 1,
                zIndex: 1,
                shift: [14, 8],
                toup: _e(e, r.getBoundingClientRect().top)
            })
        }

        function ue(e, t) {
            var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
                r = geByClass1("_im_unread_blind_label", e);
            val(r, n)
        }

        function de(e) {
            var t = Object(a.L)(e),
                n = e.get().searchOnlyMessages;
            return Object(i.ib)(e) ? {
                top: t && !n ? 96 : 60,
                bottom: Object(i.jb)(e) ? 42 : 87
            } : {
                top: t && !n ? 36 : 0,
                bottom: 0
            }
        }

        function fe(e, t) {
            e.hoverFirstElement(U, de(t))
        }

        function me(e) {
            e.unhoverElements(U)
        }

        function pe(e, t, n) {
            if (Object(a.c)(e)) {
                t.pipeReplace(Promise.resolve([{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }])), t.toTop()
            } else n().cancelSearch(e), cancelStackFilter("im_search")
        }

        function he(e, t, n, r, o) {
            return {
                selectPeer: function(t, n) {
                    for (var r = geByClass("_im_dialog", e), i = n.get().peer, a = 0; a < r.length; a++) {
                        var o = r[a],
                            s = intval(domData(o, "peer")),
                            c = intval(domData(o, "msgid"));
                        s === i && (!z(o) || t === c && z(o)) ? (addClass(o, "nim-dialog_selected"), addClass(o, "_im_dialog_selected")) : hasClass(o, "_im_dialog_selected") && (removeClass(o, "nim-dialog_selected"), removeClass(o, "_im_dialog_selected"))
                    }
                },
                appendFastDialogs: function(t, r, o) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), o ? (n.reset(), Object(i.xb)(t) || Object(a.H)(t) || !u(r) ? Object(a.H)(t) && (u(r) && (r = [{
                        type: "clear_recent"
                    }].concat(r)), Object(a.c)(t) && (r = [{
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
                        return fe(n, t)
                    })) : n.pipe(Promise.resolve(r)), Object(i.ib)(t) && !Object(i.yb)(t.get().peer) || n.toTop()
                },
                deactivate: function() {
                    n.deactivate()
                },
                activate: function() {
                    n.activate()
                },
                hoverFirstDialog: function(e) {
                    fe(n, e)
                },
                hoverNextDialog: function(e) {
                    n.hoverNextElement(U, q, de(e))
                },
                hoverPrevDialog: function(e) {
                    n.hoverPrevElement(U, q, de(e))
                },
                unhoverDialogs: me.bind(n),
                selectHoveredDialog: function(t) {
                    var i = geByClass1("_im_dialog_hovered", e);
                    i || (i = geByClass1("_im_dialog", e)), i && W(r, t, n, {}, i)
                },
                appendSearch: function(t, r, i) {
                    var a = ie(i, r);
                    i.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                        type: "sep_messages"
                    }].concat(a))).then(function() {
                        return fe(n, t)
                    })) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([ae()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
                },
                updateDialog: function(t, n) {
                    var r = geByClass1("_im_dialog_" + t);
                    r && !z(r) && J(r, n.get().tabs[t], n, e)
                },
                focusOnSelected: function(e) {
                    var t = e.get().peer;
                    if (t) {
                        var r = geByClass1("_im_dialog_" + t);
                        r ? n.scrollTop(r.offsetTop - r.offsetHeight) : n.toTop()
                    }
                },
                restoreScroll: function(e) {
                    n.restoreScroll("list") || n.toTop()
                },
                restoreDialogs: function(t, a, o) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                        searchOnlyMessages: !1
                    }), 0 !== be(t).length || n.isLoading() || (a = !0), a && n.reset(), o && n.wipe(), n.pipeReplace(Promise.resolve(be(t))).then(function(e) {
                        if (a && (!Object(i.ib)(t) || !t.get().peer)) {
                            var o = function(e, t, n) {
                                return Object(i.ib)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!Object(i.ib)(n)).then(function() {
                                    Object(i.ib)(n) || t().toggleSettingsLoader(n, !1)
                                })
                            }(n, r, t);
                            return n.toTop(), o
                        }
                    }).then(function() {
                        return me(n)
                    })
                },
                appendDialogs: function(t, r) {
                    removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(function(n) {
                        var r = geByClass1("_im_dialog_" + n.peerId, e);
                        r && Y(r, n, t)
                    }), Object(i.xb)(t) || Object(a.H)(t) || !u(r) || (r = [{
                        type: "sep_btn_search_msg"
                    }, {
                        type: "sep_conversations"
                    }].concat(r)), t.setState({
                        searchOnlyMessages: !1
                    }), n.isEmpty() && 0 === r.length && Object(i.xb)(t) && (r = [ae(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
                },
                updateCounter: function(t, n) {
                    var r = geByClass1("_im_dialog_" + n, e),
                        o = Object(a.t)(t, n);
                    if (r && !z(r) && (ue(r, o), val(geByClass1("_im_dialog_unread_ct", r), Object(i.Bc)(o.unread)), toggleClass(r, "nim-dialog_unread", o.unread > 0), toggleClass(r, "nim-dialog_unread-out", Q(t, o, $(o).flags))), Object(a.H)(t)) {
                        var s = geByClass1("_im_sugg_" + n);
                        s && (val(geByClass1("_sugg_unread_ct", s), Object(i.Bc)(o.unread)), toggleClass(s, "sugg-is_unread", o.unread > 0))
                    }
                },
                removeDialog: function(e, t) {
                    n.remove(t)
                },
                updateOnline: function(t, n) {
                    var r = geByClass1("_im_dialog_" + t, e);
                    if (r) {
                        var i = n.get().tabs[t],
                            a = geByClass1("_im_peer_online", r);
                        toggleOnline(a, i.online)
                    }
                },
                setDialogFailed: function(t, n, r) {
                    var i = geByClass1("_im_dialog_" + t, e);
                    i && (r.get().tabs[t].lastmsg === n && (addClass(i, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", i), "!")))
                },
                scrollUp: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    n.toTop(e, t), n.saveScroll("list", !0)
                },
                saveScroll: function(e) {
                    n.saveScroll("list", !0)
                },
                promoteDialog: function(r, i) {
                    var o = geByClass1("_im_dialog_" + i, e);
                    o && !z(o) || !Object(a.L)(r) ? (n.pipeReplace(Promise.resolve(be(r)), void 0, !0).then(function(t) {
                        !inArray(i, t) && o && J(o, Object(a.t)(r, i), r, e)
                    }), t().updateTyping(i, r)) : n.unsetScroll("list")
                },
                removeSelection: function(t) {
                    var r = t.get().peer.toString(),
                        a = "._im_dialog_" + r + "." + q.join("."),
                        o = domQuery(a, e)[0];
                    q.forEach(function(e) {
                        return removeClass(o, e)
                    }), Object(i.ib)(t) || n.hoverElement(r, U, de(t))
                },
                updateScroll: function() {
                    n.updateScroll()
                },
                updateTyping: function(t, n) {
                    var r = geByClass1("_im_dialog_" + t, e);
                    if (r && !z(r) && !n.get().tabs[t].deletedDialog) {
                        var o = geByClass1("_im_dialog_typing", r),
                            s = !Object(i.ib)(n),
                            c = Object(i.O)(Object(a.t)(n, t).activity, t, !Object(i.hb)(t), n.get(), 1, s);
                        val(o, c), toggleClass(r, "nim-dialog_typing", c)
                    }
                },
                unmount: function() {
                    n.unmount(), Object(s.c)(o)
                }
            }
        }

        function be(e) {
            var t = e.get().active_tab,
                n = e.get().dialog_tabs[t],
                r = e.get().tabs,
                a = n.map(function(e) {
                    return r["" + e]
                }).sort(function(e, t, n) {
                    var r = void 0;
                    return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = Object(i.zb)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = oe(e, n) - oe(e, t), r = Object(i.zb)(e) ? -r : r), r
                }.bind(null, e));
            if (e.get().isIncomingMessageRequestsAllowed && n.length) {
                var o = Object(h.s)(e),
                    s = o.message_requests_cnt,
                    c = o.active_tab;
                if (c === f.k && a.unshift({
                        type: "message_request_notice"
                    }), !Object(i.ib)(e)) switch (c) {
                    case f.h:
                        s && a.unshift({
                            type: "message_request_button_go"
                        });
                        break;
                    case f.k:
                        a.unshift({
                            type: "message_request_button_return"
                        })
                }
            }
            return a
        }

        function _e(e, t) {
            return t > (e.get().gid ? 220 : 150) || Object(a.L)(e)
        }

        function ve(e, t, n) {
            var o = Object(s.b)(he),
                c = o.callMutations,
                l = o.bindMutations,
                u = function(e, n) {
                    var r;
                    showTooltip(n, (A(r = {
                        text: function() {
                            if (Object(a.H)(t)) return getLang("mail_hide_from_recent");
                            var e = Number(n.getAttribute("data-peer")),
                                r = Object(a.t)(t, e);
                            return Object(i.hb)(e) ? Object(D.m)(Object(a.t)(t, e), 1024) ? getLang("mail_unfollow_channel") : r.data.closed || r.data.kicked ? getLang("mail_delete") : getLang("mail_leave_chat") : getLang("mail_delete")
                        },
                        black: 1
                    }, Object(i.ib)(t) ? "center" : "needLeft", !0), A(r, "shift", Object(i.ib)(t) ? [-4, 10] : [0, 10]), A(r, "toup", _e(t, n.getBoundingClientRect().top)), A(r, "zIndex", 1), r))
                },
                d = function(e, n) {
                    showTooltip(n, {
                        text: getLang("mail_end_conversation"),
                        black: 1,
                        center: !0,
                        zIndex: 1,
                        shift: [1, 4],
                        toup: _e(t, n.getBoundingClientRect().top)
                    })
                },
                m = le.bind(null, t, e),
                p = function(e, t, n, i) {
                    var a = gpeByClass("_im_dialog", i, t),
                        o = intval(domData(a, "peer"));
                    return e.set(r.Jc.bind(null, o)), setTimeout(function() {
                        le(e, t, 0, i)
                    }, 100), cancelEvent(n), !1
                }.bind(null, t, e),
                h = function(e, t, n, i, o) {
                    var s = gpeByClass("_im_dialog", o, t),
                        c = intval(domData(s, "peer")),
                        l = e.get().tabs[c].lastmsg;
                    return e.set(r.vb.bind(null, c, l)).then(function() {
                        J(s, e.get().tabs[c], e, t), Object(a.H)(e) || n().restoreDialogs(e)
                    }), showDoneBox(getLang("mail_marked_as_answered"), {
                        out: 1e3
                    }), cancelEvent(i), !1
                }.bind(null, t, e, c),
                b = geByClass1("_im_dialogs_search"),
                _ = {
                    idFn: function(e) {
                        return function(e, t) {
                            return t.message ? t.message.messageId : Object(a.L)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
                        }(t, e)
                    },
                    hoverableFn: function(e) {
                        return hasClass(e, "_im_dialog")
                    },
                    renderFn: function(e, t) {
                        var n = e.get().isIncomingMessageRequestsAllowed;
                        switch (t.type) {
                            case "sep_btn_search_msg":
                                return Object(i.Qb)(e);
                            case "sep_messages":
                                return Object(i.Wb)();
                            case "sep_conversations":
                                return Object(i.Sb)();
                            case "sep_popular":
                                return Object(i.Zb)();
                            case "popular_sugg":
                                return Object(i.ac)(e);
                            case "clear_recent":
                                return Object(i.Rb)();
                            case "empty_dialogs":
                            case "empty_message_requests":
                                return getTemplate("im_dialogs_none", {
                                    msg: getLang("mail_dialogs_list_empty")
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
                                return t.message ? G(e, t, t.message, {
                                    noselect: !0,
                                    search: !0
                                }) : t.local_index || Object(a.L)(e) ? ne(e, t) : G(e, t)
                        }
                    }.bind(null, t),
                    more: function(e, t, n, o) {
                        if (Object(a.L)(e) && e.get().searchAllLoaded || Object(a.H)(e)) return Promise.resolve([]);
                        if (e.get().dialog_search_going || Object(i.ib)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
                        if (Object(a.L)(e)) return Object(r.gc)(Object(a.r)(e), e.get()).then(function(e) {
                            var t = N(e, 2),
                                n = t[0];
                            return ie(t[1], n)
                        });
                        var s = e.get().active_tab,
                            c = e.get().dialog_tabs_all,
                            l = s === f.k;
                        return s !== f.k && c[f.h] && !Object(i.zb)(e) || c[s] ? 0 === be(e).length ? l ? Promise.resolve([{
                            type: "message_request_notice"
                        }, {
                            type: "empty_message_requests"
                        }]) : Promise.resolve([{
                            type: "empty_dialogs"
                        }]) : Promise.resolve([]) : e.set(r.ib).then(function(t) {
                            var n = be(e);
                            return 0 === n.length ? l ? Promise.resolve([{
                                type: "message_request_notice"
                            }, {
                                type: "empty_message_requests"
                            }]) : [{
                                type: "empty_dialogs"
                            }] : n
                        })
                    }.bind(null, t, c),
                    onScroll: !!Object(i.ib)(t) && function() {
                        (bodyNode.scrollTop || document.documentElement.scrollTop) <= 0 && !layers.visible && browser.safari ? addClass(b, "im-page--header_static") : removeClass(b, "im-page--header_static")
                    }
                },
                v = M(e, g({
                    limit: 40,
                    offset: 0,
                    nativeScroll: !!Object(i.ib)(t),
                    height: H,
                    elements: be(t)
                }), function() {
                    return _
                }),
                y = W.bind(null, n, t, v),
                j = function(e, t, n) {
                    removeClass(t.parentNode, "im-page--dialogs_with-mess");
                    var r = n.getCurrentElements().filter(function(e) {
                        return e.message
                    });
                    n.toTop(), n.reset(), Object(L.b)(.01, "im_search_stat", 1, "search_messages_only"), r.length > 0 ? (r = [{
                        type: "sep_messages"
                    }].concat(r), e.setState({
                        searchOnlyMessages: !0
                    })) : r = [ae()], n.pipeReplace(Promise.resolve(r))
                }.bind(null, t, e, v),
                O = function(e, t, n, a, o, s) {
                    var c = intval(domData(s, "peer")),
                        l = domData(s, "action"),
                        u = domData(s, "sid"),
                        d = geByClass1("_im_dialog_" + c, t),
                        f = intval(domData(s, "spam"));
                    switch (l) {
                        case "restore":
                            d && e.set(r.Ub.bind(null, c, u, f)).then(function() {
                                addClass(d, "_im_dialog"), removeClass(d, "nim-dialog_deleted"), J(d, e.get().tabs[c], e, t, !1), a().updateMenu(e)
                            });
                            break;
                        case "spam":
                            var m = getLang("mail_im_dialog_marked_spam") + '\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="' + u + '" data-peer="' + c + '">\n            ' + getLang("mail_restore") + "\n        </button>";
                            if (d) {
                                var p = geByClass1("_dialog_body", d);
                                val(p, m), Object(r.Ac)(c, u, e.get())
                            }
                            break;
                        case "block":
                            (Object(i.jb)(e) ? Object(i.lc)(c, e) : Object(i.mc)(c, e)).once("success", function() {
                                e.set(r.I.bind(null, c)).then(function() {
                                    n().restoreDialogs(e)
                                })
                            })
                    }
                    cancelEvent(o)
                }.bind(null, t, e, c, n),
                w = te.bind(null, n, t, e, v),
                k = function(e, t) {
                    Object(i.Gc)(e, t, r.o)
                }.bind(null, t, n),
                C = Object(s.a)({
                    handlers: function(a, o) {
                        o(e, "click", "_im_dialog_close", w), o(e, "click", "_im_dialog_markre", h), o(e, "click", R, p), o(e, "click", "_im_dialog", y), o(e, "click", i.q, j), o(e, "mouseover", "_im_dialog_close", u), o(e, "mouseover", "_im_dialog_markre", d), o(e, "click", i.i, function() {
                            Object(r.Sb)(cur.imDb), pe(t, v, n)
                        }), o(e, "click", i.u, k), o(e, "mouseover", R, m), o(e, "click", F, O), a(e, "mouseover", throttle(v.unhoverElements.bind(v, U), 100))
                    }
                });
            return l(e, c, v, n, C)
        }
        var ye = n("O8ze"),
            je = n("QOPk"),
            Oe = n("Wu9C"),
            we = n("q1tI"),
            ke = n("i8i4"),
            Ce = n("T/g7"),
            Se = (n("17x9"), n("pemR"));

        function Ee(e) {
            return we.createElement("header", {
                className: Object(Se.a)("PopupHeader", e.className),
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
        Ee.defaultProps = {
            back: null,
            title: "",
            onCloseClick: function() {}
        };
        var xe = n("Hx9h"),
            Ie = n("XpgC"),
            Te = n("WDXI");
        var Pe = window.unclean,
            Me = Ce.a.getLang,
            Le = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return i.onSaveTitle = function(e) {
                        var t = i.props.store,
                            n = t.get(),
                            a = e.value.trim().replace("\n", "");
                        a && a !== Pe(i.props.title) && (i.setState({
                            titleChanged: !1
                        }), t.set(r.Sc.bind(null, n.peer, a)))
                    }, i.onChangeTitle = function(e) {
                        if (i.state.title !== e.target.value) {
                            var t = e.target.value.replace("\n", "");
                            i.setState({
                                title: t,
                                titleChanged: Pe(i.props.title) !== t
                            })
                        }
                    }, i.onValidateTitle = function(e) {
                        return !!e.trim().replace("\n", "")
                    }, i.onCancelTitle = function() {
                        i.setState({
                            title: Pe(i.props.title),
                            titleChanged: !1
                        })
                    }, i.onSaveDescription = function(e) {}, i.onPhotoUpload = function() {
                        var e = i.props.store,
                            t = e.get().peer;
                        Object(D.g)(e) && (cur.recieveCropResult = void 0, Page.ownerPhoto(t, {
                            gid: e.get().gid
                        }))
                    }, i.onPhotoRemove = function() {
                        var e = i.props.store,
                            t = e.get().peer;
                        Object(D.g)(e) && e.set(r.Ib.bind(null, t)).then(function() {
                            return e.set(r.L.bind(null, t))
                        }).catch(function(e) {
                            return Object(m.a)("onPhotoRemove", e)
                        })
                    }, i.state = {
                        title: Pe(n.title),
                        titleChanged: !1
                    }, i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    var e = this.props,
                        t = e.store,
                        n = e.photo,
                        r = e.title,
                        i = e.description,
                        a = e.grid,
                        o = e.meta,
                        s = Pe(r),
                        c = Object(D.g)(t),
                        l = Object(Se.a)("ChatSettingsInfo", {
                            "ChatSettingsInfo--editable": c
                        }),
                        u = Object(Se.a)("ChatSettingsInfo__title", {
                            "ChatSettingsInfo__title-service": 64 & this.props.flags
                        });
                    return we.createElement("div", {
                        className: l
                    }, we.createElement("header", {
                        className: "ChatSettingsInfo__header"
                    }, we.createElement("div", {
                        className: "ChatSettingsInfo__photo"
                    }, we.createElement("div", {
                        className: "ChatSettingsInfo__attach nim-peer nim-peer_larger",
                        "data-tip": Me("mail_settings_photo"),
                        onClick: this.onPhotoUpload
                    }, n ? we.createElement("img", {
                        src: n,
                        width: "80",
                        height: "80",
                        alt: s,
                        className: "ChatSettingsInfo__photoSelf"
                    }) : we.createElement("div", {
                        className: "nim-peer--photo-w"
                    }, we.createElement("div", {
                        className: "ChatSettingsInfo__photoGrid nim-peer--photo",
                        dangerouslySetInnerHTML: {
                            __html: a
                        }
                    }))), n && c && we.createElement(Ie.a, {
                        text: Me("mail_settings_remove_photo"),
                        position: "t",
                        align: "left"
                    }, we.createElement("button", {
                        onClick: this.onPhotoRemove,
                        className: "ChatSettingsInfo__photoRemove"
                    }))), we.createElement("h3", {
                        className: u
                    }, c ? we.createElement(Te.a, {
                        value: this.state.title,
                        changed: this.state.titleChanged,
                        useEnter: !0,
                        onSave: this.onSaveTitle,
                        onChange: this.onChangeTitle,
                        onCancel: this.onCancelTitle,
                        validate: this.onValidateTitle
                    }) : s), we.createElement("div", {
                        className: "ChatSettingsInfo__meta"
                    }, o)), i && we.createElement("div", {
                        className: "ChatSettingsInfo__description"
                    }, c ? we.createElement(Te.a, {
                        value: i,
                        onSave: this.onSaveDescription
                    }) : i))
                }, t
            }(we.PureComponent),
            Be = n("dLHM"),
            De = n("XTb9"),
            Ne = n("BN/X");
        var Ae = window.elfocus,
            He = Ce.a.getLang,
            Re = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onCopy = function() {
                        r.input && (Ae(r.input, 0, r.input.value.length), document.execCommand("copy"), r.setState({
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
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.componentDidMount = function() {
                    this.input && Ae(this.input, 0, this.input.value.length)
                }, t.prototype.render = function() {
                    var e = this.props,
                        t = e.onReset,
                        n = e.invitationLink,
                        r = e.store,
                        a = He("mail_invite_link_reset_explainer").split("{reset_link}"),
                        o = !Object(i.pb)(r, r.get().peer);
                    return we.createElement("div", {
                        className: "ChatSettingsInvitationLink"
                    }, this.props.reseted && we.createElement("div", {
                        className: "ChatSettingsInvitationLink__reseted"
                    }, He("mail_invite_link_reseted_explainer")), we.createElement("p", null, He("mail_invite_link_explainer")), we.createElement("div", {
                        className: "ChatSettingsInvitationLink__main"
                    }, we.createElement(Be.a, {
                        ref: this.getInputRef,
                        readOnly: "readonly",
                        className: "ChatSettingsInvitationLink__input",
                        value: n
                    }), we.createElement(xe.a, {
                        onClick: this.onCopy
                    }, He("mail_get_invite_link_copy")), we.createElement(De.a, {
                        className: "ChatSettingsInvitationLink__copied",
                        shown: this.state.copied,
                        callback: this.onBlinkTextHide
                    }, He("mail_invite_link_copied"))), o && we.createElement("p", null, a[0], we.createElement(Ne.a, {
                        className: "ChatSettingsInvitationLink__reset",
                        onClick: t
                    }, He("mail_invite_reset_link")), a[1]))
                }, t
            }(we.Component),
            Fe = n("6raB"),
            qe = n("hIV1");
        var Ue = Ce.a.getLang,
            ze = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onConfirm = function() {
                        r.state.loading || (r.setState({
                            loading: !0
                        }), r.props.onConfirm().then(function() {
                            r.setState({
                                loading: !1
                            }), r.props.onCancel()
                        }).catch(function() {
                            return r.setState({
                                loading: !1
                            })
                        }))
                    }, r.state = {}, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    return we.createElement("div", {
                        className: "ChatSettingsResetInvitationLink"
                    }, we.createElement("div", {
                        className: "ChatSettingsResetInvitationLink__text",
                        dangerouslySetInnerHTML: {
                            __html: Ue("mail_chat_reset_link_warning")
                        }
                    }), we.createElement(qe.a, {
                        alignment: "right"
                    }, we.createElement(xe.a, {
                        appearance: "tertiary",
                        onClick: this.props.onCancel
                    }, Ue("global_cancel")), we.createElement(Fe.a, {
                        onClick: this.onConfirm,
                        loading: this.state.loading
                    }, Ue("mail_chat_reset_link_confirm"))))
                }, t
            }(we.Component),
            We = n("enZq"),
            Ke = n("p+C8");

        function Ve(e) {
            return we.createElement("div", {
                className: Object(Se.a)("ChatSettingsRoundedIcon", "ChatSettingsRoundedIcon--" + e.type)
            })
        }
        var Qe = Ce.a.getLang,
            Xe = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
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
                        Object(D.f)(r.props.store) && r.props.showInvitationLink()
                    }, r.state = {
                        copied: !1
                    }, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    var e = this.props,
                        t = e.store,
                        n = e.flagsUpdated,
                        r = e.onHideStatus,
                        a = t.get(),
                        o = a.tabs[a.peer],
                        s = Object(i.pb)(a, a.peer),
                        c = o.inviteLink && Object(D.l)(t) || Object(D.f)(t),
                        l = Object(D.n)(o, a.id) && !s,
                        u = Object(Se.a)("ChatSettingsMenu", {
                            "ChatSettingsMenu--copied": this.state.copied
                        });
                    return we.createElement("div", {
                        className: "ChatSettings__pane"
                    }, we.createElement(We.a, {
                        className: u
                    }, we.createElement(Ke.a, {
                        onClick: this.props.showAttachments,
                        chevron: !0
                    }, we.createElement(Ve, {
                        type: "attach"
                    }), Qe("mail_im_show_media_history"))), (c || l) && we.createElement(We.a, {
                        className: u
                    }, c && we.createElement(Ke.a, {
                        onClick: this.onShowInviteLink,
                        chevron: Object(D.f)(t)
                    }, we.createElement(Ve, {
                        type: "link"
                    }), Qe(s ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link"), o.inviteLink && we.createElement("span", {
                        className: "ChatSettingsMenu__invite"
                    }, we.createElement("span", {
                        className: "ChatSettingsMenu__hidden"
                    }, we.createElement("input", {
                        type: "text",
                        readOnly: !0,
                        value: o.inviteLink,
                        ref: this.getHiddenInput
                    })), we.createElement(De.a, {
                        className: "ChatSettingsMenu__copied",
                        shown: this.state.copied,
                        callback: this.onBlinkTextHide
                    }, Qe("mail_invite_link_copied")), we.createElement(Ne.a, {
                        className: "ChatSettingsMenu__copy",
                        onClick: this.onCopyInviteLink
                    }, Qe("mail_get_invite_link_copy")))), l && we.createElement(Ke.a, {
                        onClick: this.props.showSettings,
                        chevron: !0,
                        aside: we.createElement(De.a, {
                            shown: n,
                            callback: r
                        }, Qe("global_changes_saved"))
                    }, we.createElement(Ve, {
                        type: "gear"
                    }), Qe("mail_settings_options"))))
                }, t
            }(we.Component),
            Ge = n("uW+i"),
            Je = n("NsuH"),
            Ye = n("As6E");

        function Ze(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        var $e = Ce.a.getLang,
            et = function(e) {
                function t() {
                    var n, i;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    for (var a = arguments.length, o = Array(a), s = 0; s < a; s++) o[s] = arguments[s];
                    return n = i = Ze(this, e.call.apply(e, [this].concat(o))), i.toggleAdmin = function() {
                        var e = i.props,
                            t = e.store,
                            n = e.mid,
                            a = e.adminMap,
                            o = t.get().peer,
                            s = !a[n];
                        t.set(r.Fc.bind(null, o, n, s)), t.set(r.Ec.bind(null, o, n, s))
                    }, i.kick = function() {
                        var e = i.props.store,
                            t = e.get().peer,
                            n = i.props.mid;
                        e.set(r.bb.bind(null, t, n)), e.set(r.ab.bind(null, t, n)).catch(function(e) {
                            Object(m.a)("ChatSettingsMemberEdit.kick", e)
                        })
                    }, i.changeAccess = function(e) {
                        var t = i.props.store,
                            n = t.get().peer,
                            a = i.props.mid;
                        t.set(r.n.bind(null, n, a, !e)).catch(function(e) {
                            Object(m.a)("ChatSettingsMemberEdit.changeAccess", e)
                        })
                    }, Ze(i, n)
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.getMemberRole = function(e, t) {
                    var n = this.props.storeData,
                        r = n.peer;
                    return t === n.tabs[r].ownerId ? $e("mail_settings_owner") : e[t] ? $e("mail_settings_admin") : null
                }, t.prototype.getActions = function(e) {
                    var t = window.vk.id,
                        n = this.props,
                        r = n.store,
                        i = n.mid,
                        o = [];
                    if (t === i) return [{
                        text: $e("mail_leave_chat"),
                        onClick: this.props.onLeave
                    }];
                    if (Object(D.e)(r, i) && o.push({
                            text: e[i] ? $e("mail_chat_remove_admin") : $e("mail_settings_appoint_admin"),
                            onClick: this.toggleAdmin
                        }), Object(D.i)(r, i) && o.push({
                            text: $e("mail_settings_kick"),
                            onClick: this.kick
                        }), Object(a.C)(i) && !e[i]) {
                        var s = Object(D.k)(r, r.get().peer, i),
                            c = s ? "mail_settings_community_mentions_only" : "mail_settings_community_full_access";
                        o.push({
                            text: $e(c),
                            onClick: this.changeAccess.bind(this, s)
                        })
                    }
                    return o
                }, t.prototype.render = function() {
                    var e = window.vk.id,
                        t = this.props,
                        n = t.adminMap,
                        r = t.storeData,
                        i = t.mid,
                        a = !!n[e],
                        o = this.getMemberRole(n, i),
                        s = e === i,
                        c = a && this.getActions(n);
                    return we.createElement(we.Fragment, null, o && we.createElement("span", {
                        className: "ChatSettingsMembersEdit__role"
                    }, o), c && c.length > 0 && we.createElement(Ye.a, {
                        position: "b",
                        align: "right",
                        trigger: "hover",
                        marginTop: -8,
                        marginLeft: 1,
                        data: this.getActions(n)
                    }, we.createElement("span", {
                        className: "ChatSettingsMembersEdit__actions"
                    })), !a && !s && Object(D.i)(r, i) && we.createElement(Ie.a, {
                        text: $e("mail_settings_kick"),
                        position: "t",
                        align: "right"
                    }, we.createElement("span", {
                        onClick: this.kick,
                        className: "ChatSettingsMembersEdit__kick"
                    })), !a && s && we.createElement(Ie.a, {
                        text: $e("mail_leave_chat"),
                        position: "t",
                        align: "right"
                    }, we.createElement("span", {
                        onClick: this.props.onLeave,
                        className: "ChatSettingsMembersEdit__kick"
                    })))
                }, t
            }(we.Component);
        var tt = 50,
            nt = {
                appendParentCls: "ChatSettingsWrapper"
            },
            rt = window,
            it = rt.langSex,
            at = rt.langNumeric,
            ot = rt.getSmDate,
            st = Ce.a.getLang,
            ct = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    lt.call(r);
                    var i = n.store.get(),
                        a = r.getMembers(i),
                        o = r.getAdmins(i);
                    return r.state = {
                        showSearch: !1,
                        searchQuery: "",
                        current: "all",
                        all: a,
                        allShowMore: a.length > tt,
                        admins: o,
                        adminsShowMore: o.length > tt
                    }, r.membersMap = a.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {}), r.searchIndexPromise = r.getSearchIndex(a).then(function(e) {
                        r.searchIndex = e
                    }), r.invitersCache = {}, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.componentWillReceiveProps = function(e) {
                    var t = this,
                        n = e.store.get(),
                        r = this.getMembers(n),
                        i = this.getAdmins(n),
                        a = {
                            removes: [],
                            additions: []
                        },
                        o = r.reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {});
                    r.forEach(function(e) {
                        t.membersMap[e] || a.additions.push(e)
                    }), Object.keys(this.membersMap).forEach(function(e) {
                        o[e] || a.removes.push(e)
                    }), (a.removes.length || a.additions.length) && (this.updateSearchIndex(n, a), this.membersMap = o), this.setState({
                        all: r,
                        allShowMore: this.state.allShowMore && r.length > tt,
                        admins: i,
                        adminsShowMore: this.state.adminsShowMore && i.length > tt
                    })
                }, t.prototype.getMembers = function(e) {
                    var t = e.peer,
                        n = e.tabs[t],
                        r = -1 !== (n.memberIds || []).indexOf(n.ownerId),
                        i = (n.adminIds || []).reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {});
                    return (r ? [n.ownerId] : []).concat((n.adminIds || []).filter(function(e) {
                        return e !== n.ownerId
                    }), (n.memberIds || []).filter(function(e) {
                        return e !== n.ownerId && !i[e]
                    }))
                }, t.prototype.getAdmins = function(e) {
                    var t = e.peer,
                        n = e.tabs[t];
                    return (-1 !== (n.memberIds || []).indexOf(n.ownerId) ? [n.ownerId] : []).concat((n.adminIds || []).filter(function(e) {
                        return e !== n.ownerId
                    }))
                }, t.prototype.getCurrentList = function() {
                    var e = this.props.store,
                        t = this.state,
                        n = t.current,
                        r = t.showSearch,
                        a = t.searchQuery;
                    if (r && a && this.searchIndex) return this.searchIndex.search(a);
                    var o = this.state[n],
                        s = Object(i.T)(e.get(), o);
                    return this.state[n + "ShowMore"] ? s.slice(0, tt) : s
                }, t.prototype.getSearchIndex = function(e) {
                    var t = window.vkIndexer,
                        n = Object(i.T)(this.props.store.get(), e);
                    return this.membersMap = n.reduce(function(e, t) {
                        return e[t.id] = !0, e
                    }, {}), new Promise(function(e, r) {
                        var i = new t(n, function(e) {
                            return e.name
                        }, function() {
                            e(i)
                        })
                    })
                }, t.prototype.updateSearchIndex = function(e, t) {
                    var n = Object(i.T)(e, t.removes),
                        r = Object(i.T)(e, t.additions);
                    (this.searchIndex ? Promise.resolve(this.searchIndex) : this.searchIndexPromise).then(function(e) {
                        n.forEach(function(t) {
                            e.remove(t)
                        }), r.forEach(function(t) {
                            e.add(t)
                        })
                    })
                }, t.prototype.componentDidMount = function() {
                    this.searchInput.addEventListener("keydown", this.onKeydown)
                }, t.prototype.componentWillUnmount = function() {
                    this.searchInput.removeEventListener("keydown", this.onKeydown)
                }, t.prototype.render = function() {
                    var e = this,
                        t = this.props,
                        n = t.store,
                        r = t.membersCount,
                        a = t.membersAdded,
                        o = t.onHideStatus,
                        s = this.state,
                        c = s.current,
                        l = s.showSearch,
                        u = s.searchQuery,
                        d = s.allShowMore,
                        f = s.adminsShowMore,
                        m = n.get(),
                        p = m.peer,
                        g = m.tabs[p],
                        h = this.getCurrentList(),
                        b = this.isAddMemberWidgetShown() ? ["add"].concat(h) : h,
                        _ = "all" === c ? d : f,
                        v = g.membersLastSeen,
                        y = {
                            "ChatSettingsMembersWidget--search": !!l
                        },
                        j = g.adminIds.reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {});
                    return we.createElement("div", {
                        className: Object(Se.a)("ChatSettingsMembersWidget", y)
                    }, we.createElement("header", {
                        className: "ChatSettingsMembersWidget__header"
                    }, we.createElement("input", {
                        placeholder: st("mail_members_search"),
                        className: "ChatSettingsMembersWidget__search",
                        onChange: this.onSearchChange,
                        onInput: this.onSearchChange,
                        onPaste: this.onSearchChange,
                        value: this.state.searchQuery,
                        ref: this.searchInputRef
                    }), we.createElement("button", {
                        className: "ChatSettingsMembersWidget__searchIcon",
                        onClick: this.onToggleSearch
                    }), we.createElement(Ge.a, {
                        className: "ChatSettingsMembersWidget__tabs",
                        onTabClick: this.onTabClick
                    }, we.createElement("span", {
                        key: "all"
                    }, st("mail_settings_everyone") + " ", we.createElement("span", {
                        className: "Tabs__desc"
                    }, Object(i.P)(g))), g.adminIds.length > 0 && we.createElement("span", {
                        key: "admins"
                    }, st("mail_settings_admins") + " ", we.createElement("span", {
                        className: "Tabs__desc"
                    }, g.adminIds.length)))), we.createElement("div", {
                        className: "ChatSettingsMembersWidget__list"
                    }, we.createElement(We.a, {
                        border: !1
                    }, b.length > 0 && b.map(function(t) {
                        if ("add" === t) return we.createElement(Ke.a, {
                            selectable: !1,
                            border: !1,
                            key: "add",
                            onClick: e.props.showMembersSettings,
                            aside: we.createElement(De.a, {
                                className: "ChatSettingsMembersWidget__blink",
                                shown: a,
                                callback: o
                            }, at(r || 0, st("mail_settings_members_added", "raw")))
                        }, we.createElement("span", {
                            className: "ChatSettingsMembersWidget__add"
                        }, we.createElement("span", null, st("mail_settings_add_members"))));
                        var s = e.getInviter(t.id),
                            c = v && v[t.id] ? Object(i.V)(m, t.id, v[t.id], nt) : "";
                        return we.createElement(Ke.a, {
                            selectable: !1,
                            border: !1,
                            aside: we.createElement(et, {
                                adminMap: j,
                                store: n,
                                storeData: m,
                                mid: t.id,
                                onLeave: e.props.onLeave
                            }),
                            key: t.id
                        }, we.createElement(Je.a, {
                            photo: t.photo,
                            title: t.name,
                            description: we.createElement("span", {
                                title: s,
                                dangerouslySetInnerHTML: {
                                    __html: c
                                }
                            }),
                            href: t.link
                        }))
                    }), !b.length && l && u && we.createElement("div", {
                        className: "ChatSettingsMembersWidget__empty"
                    }, st("mail_settings_not_found")), !(l && u) && _ && we.createElement("div", {
                        className: "ChatSettingsMembersWidget__more",
                        onClick: this.onShowMore
                    }, st("mail_settings_show_all_members")))))
                }, t
            }(we.Component),
            lt = function() {
                var e = this;
                this.onToggleSearch = function() {
                    e.state.showSearch ? e.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }) : (e.setState({
                        showSearch: !0
                    }), requestAnimationFrame(function() {
                        e.searchInput.focus()
                    }))
                }, this.onSearchChange = function(t) {
                    t.target.value !== e.state.searchQuery && e.setState({
                        searchQuery: t.target.value
                    })
                }, this.onShowMore = function() {
                    var t = "all" === e.state.current ? "allShowMore" : "adminsShowMore";
                    e.state[t] && e.setState(function(e, t, n) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n, e
                    }({}, t, !1))
                }, this.onTabClick = function(t, n) {
                    t.preventDefault(), e.state.current !== n && e.setState({
                        current: n
                    })
                }, this.handleDocumentClick = function(t) {
                    !e.state.showSearch || e.state.searchQuery || t.target.closest(".ChatSettingsMembersWidget__search") || t.target.closest(".ChatSettingsMembersWidget__searchIcon") || e.setState({
                        showSearch: !1
                    })
                }, this.onKeydown = function(t) {
                    e.state.showSearch && 27 === t.keyCode && (e.searchInput.blur(), e.setState({
                        showSearch: !1,
                        searchQuery: ""
                    }), t.preventDefault(), t.stopPropagation())
                }, this.getInviter = function(t) {
                    if (e.invitersCache[t]) return e.invitersCache[t];
                    var n = e.props.store.get(),
                        r = n.peer,
                        a = n.tabs[r],
                        o = a.inviters;
                    if (!o[t]) return "";
                    var s = Object(i.T)(n, [o[t][0]])[0],
                        c = ot(o[t][2], n.timeshift, !0);
                    if (Object(D.n)(a, t)) return e.invitersCache[t] = st("mail_settings_owner"), st("mail_settings_owner");
                    if (!s) return e.invitersCache[t] = c, c;
                    var l = it(o[t][1], st("mail_chat_member_invited_by_X", "raw")).replace(/{inviter}/, replaceEntities(s.name)) + " " + c;
                    return e.invitersCache[t] = l, l
                }, this.isAddMemberWidgetShown = function() {
                    var t = window.vk.id,
                        n = e.props.store,
                        r = n.get().peer,
                        i = e.state,
                        a = i.current,
                        o = i.showSearch,
                        s = i.searchQuery;
                    return "all" === a && !(o && "" !== s) && Object(D.h)(n, r, t)
                }, this.searchInputRef = function(t) {
                    e.searchInput = t
                }
            },
            ut = ct,
            dt = n("FABD"),
            ft = n("DM26");

        function mt(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var pt = Ce.a.getLang,
            gt = window,
            ht = gt.showFastBox,
            bt = gt.unclean,
            _t = function() {},
            vt = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return i.onChange = function(e) {
                        var t = i.props.store.get(),
                            n = e.target.value;
                        Object(r.fc)(n, t).then(function(e) {
                            return i.setSearchResults({}, !1, n, e), n ? (i.isSearching = !0, i.serverSearch(n, e.map(function(e) {
                                return e.peerId
                            }))) : Promise.resolve([])
                        }).then(i.appendSearchResults).catch(function() {})
                    }, i.serverSearch = Object(ft.b)(function(e, t) {
                        var n = i.props.store;
                        return Object(r.cc)(e, t, "friends", n.get())
                    }, 300), i.onRemoveToken = function(e) {
                        return new Promise(function(t) {
                            var n = i.state.selected.filter(function(t) {
                                return t !== e
                            });
                            i.selected = n.reduce(function(e, t) {
                                return e[t] = !0, e
                            }, {}), i.setState({
                                selected: n
                            }, t)
                        })
                    }, i.onSelect = function(e) {
                        return new Promise(function(t) {
                            var n = i.selected[e] ? i.state.selected.filter(function(t) {
                                return t !== e
                            }) : [].concat(i.state.selected, e).filter(function(e, t, n) {
                                return n.indexOf(e) === t
                            });
                            i.selected = n.reduce(function(e, t) {
                                return e[t] = !0, e
                            }, {}), i.resetSearch({
                                selected: n,
                                value: ""
                            }, t)
                        })
                    }, i.onAddPeople = function() {
                        var e = i.props.store,
                            t = e.get().peer,
                            n = i.state.selected.map(function(e) {
                                return parseInt(e)
                            });
                        i.setState({
                            loading: !0
                        }), e.set(r.i.bind(null, t, n)).then(function() {
                            return e.set(r.L.bind(null, t)).then(function() {
                                i.selected = {}, i.resetSearch({
                                    selected: [],
                                    loading: !1
                                }, function() {
                                    i.props.afterSave(n.length)
                                })
                            })
                        }).catch(function(e) {
                            i.selected = {}, i.resetSearch({
                                selected: [],
                                loading: !1
                            }), ht(pt("global_error"), e)
                        })
                    }, i.setSearchResults = function(e, t, n, r) {
                        var o = i.props.store.get(),
                            s = Object(a.t)(o, o.peer),
                            c = [];
                        r.forEach(function(e) {
                            i.data[e.peerId] || (i.data[e.peerId] = e), -1 === s.memberIds.indexOf(e.peerId) && c.push(e.peerId)
                        }), i.setState(Object.assign({}, e, {
                            found: c,
                            value: n
                        }), t || _t)
                    }, i.appendSearchResults = function(e) {
                        var t = i.props.store.get(),
                            n = Object(a.t)(t, t.peer),
                            r = i.state.found;
                        e.forEach(function(e) {
                            i.data[e.peerId] || (i.data[e.peerId] = e), -1 === n.memberIds.indexOf(e.peerId) && -1 === r.indexOf(e.peerId) && r.push(e.peerId)
                        }), i.isSearching = !1, i.setState({
                            found: r
                        })
                    }, i.state = {
                        selected: [],
                        value: "",
                        loading: !1,
                        found: []
                    }, i.data = {}, i.selected = {}, i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.resetSearch = function(e, t) {
                    return Object(r.fc)("", this.props.store.get()).then(this.setSearchResults.bind(this, e, t, ""))
                }, t.prototype.componentDidMount = function() {
                    this.resetSearch()
                }, t.prototype.render = function() {
                    var e, t = this,
                        n = Object.keys(this.state.selected).length;
                    return we.createElement("div", {
                        className: "ChatSettingsMembers"
                    }, we.createElement(dt.a, (mt(e = {
                        className: "ChatSettingsMembers__multiSelect",
                        tokens: this.state.selected.map(function(e) {
                            return {
                                text: bt(t.data[e].name),
                                id: e
                            }
                        }),
                        removeTokenPlaceholder: pt("mail_create_chat_remove_user"),
                        onRemoveToken: this.onRemoveToken,
                        placeholder: pt("mail_search_creation"),
                        value: this.state.value,
                        useInfiniteScroll: !1,
                        onChange: this.onChange,
                        onSelect: this.onSelect
                    }, "useInfiniteScroll", !0), mt(e, "hasMore", !1), mt(e, "virtualized", !0), mt(e, "loadMore", function() {}), mt(e, "notFoundText", pt("mail_not_found")), mt(e, "autoFocus", !0), mt(e, "isSearching", this.isSearching), e), this.state.found.map(function(e) {
                        return we.createElement("div", {
                            className: Object(Se.a)("ChatSettingsMembers__entity", mt({}, "ChatSettingsMembers__entity--selected", t.selected[e])),
                            key: e,
                            "data-id": e
                        }, we.createElement(Je.a, {
                            size: "34",
                            title: t.data[e].name,
                            photo: t.data[e].photo
                        }))
                    })), we.createElement(qe.a, {
                        alignment: "right"
                    }, we.createElement(Fe.a, {
                        disabled: 0 === n,
                        onClick: this.onAddPeople,
                        loading: this.state.loading
                    }, pt(n < 2 ? "mail_append_chat" : "mail_im_create_chat_with"))))
                }, t
            }(we.Component),
            yt = n("mSoV");
        var jt = Math.log2 || function(e) {
                return Math.log(e) / Math.LN2
            },
            Ot = Ce.a.getLang,
            wt = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onChange = function(e) {
                        var t = e.name,
                            n = e.selected.value,
                            i = r.state.flags;
                        r.setState({
                            flags: n ? i | 1 << t : i & ~(1 << t)
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
                                loading: !1
                            }, r.props.afterSave)
                        }).catch(function(e) {
                            r.setState({
                                loading: !1,
                                flags: r.props.tab.data.flags
                            })
                        }))
                    }, r.state = {
                        flags: n.tab.data.flags,
                        loading: !1
                    }, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    var e = this,
                        t = this.props.tab,
                        n = this.state.flags,
                        r = [{
                            value: !0,
                            label: Ot("mail_settings_only_admins")
                        }, {
                            value: !1,
                            label: Ot("mail_settings_all_members")
                        }],
                        i = t.serverSettings;
                    return we.createElement("div", {
                        className: "ChatSettingsOptions"
                    }, we.createElement(We.a, null, we.createElement(Ke.a, {
                        selectable: !1,
                        aside: we.createElement(yt.a, {
                            className: "ChatSettingsOptions__select",
                            onChange: this.onChange,
                            name: jt(D.c),
                            options: r,
                            value: !!(n & D.c)
                        })
                    }, we.createElement(Ve, {
                        type: "plus"
                    }), Ot("mail_settings_can_invite")), we.createElement(Ke.a, {
                        selectable: !1,
                        aside: we.createElement(yt.a, {
                            className: "ChatSettingsOptions__select",
                            onChange: this.onChange,
                            name: jt(D.b),
                            options: r,
                            value: !!(n & D.b)
                        })
                    }, we.createElement(Ve, {
                        type: "pencil"
                    }), Ot("mail_settings_can_edit_info")), we.createElement(Ke.a, {
                        selectable: !1,
                        aside: we.createElement(yt.a, {
                            className: "ChatSettingsOptions__select",
                            onChange: this.onChange,
                            name: jt(D.d),
                            options: r,
                            value: !!(n & D.d)
                        })
                    }, we.createElement(Ve, {
                        type: "pin"
                    }), Ot("mail_settings_can_pin")), we.createElement(Ke.a, {
                        selectable: !1,
                        aside: we.createElement(yt.a, {
                            className: "ChatSettingsOptions__longselect",
                            onChange: this.onChange,
                            name: jt(D.a),
                            options: [{
                                value: !1,
                                label: Ot("mail_settings_only_owner")
                            }, {
                                value: !0,
                                label: Ot("mail_settings_owner_and_admins")
                            }],
                            value: !!(n & D.a)
                        })
                    }, we.createElement(Ve, {
                        type: "user"
                    }), Ot("mail_settings_admins_can_add_admins")), i.map(function(t) {
                        return we.createElement(Ke.a, {
                            selectable: !1,
                            key: t.name,
                            aside: we.createElement(yt.a, {
                                className: "ChatSettingsOptions__select",
                                onChange: e.onChange,
                                name: jt(t.bit),
                                options: t.options,
                                value: !!(n & t.bit)
                            })
                        }, we.createElement(Ve, {
                            type: t.icon
                        }), t.name)
                    })), we.createElement(qe.a, {
                        alignment: "right"
                    }, we.createElement(xe.a, {
                        appearance: "tertiary",
                        onClick: this.onCancel
                    }, Ot("global_cancel")), we.createElement(Fe.a, {
                        onClick: this.onSave,
                        loading: this.state.loading
                    }, Ot("global_save"))))
                }, t
            }(we.Component),
            kt = function() {
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
        var Ct = 0,
            St = 2,
            Et = 300,
            xt = Ce.a.getLang,
            It = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return a.showInvitationLink = function() {
                        var e = a.props.store.get(),
                            t = e.peer;
                        return a.setState({
                            invitationLoading: !0
                        }), Object(r.M)(t - 2e9, e).then(function(e) {
                            var t = kt(e, 1)[0];
                            a.setState({
                                section: St,
                                invitationLoading: !1,
                                invitationLink: t
                            })
                        })
                    }, a.onUpdateFlags = function(e) {
                        var t = a.props.store.get(),
                            n = t.peer;
                        return Object(r.Vc)(n, e, t)
                    }, a.afterUpdateFlags = function() {
                        a.go(Ct, function() {
                            return a.setBlinkStatus({
                                flagsUpdated: !0
                            })
                        })
                    }, a.afterMembersAdded = function(e) {
                        a.go(Ct, function() {
                            return a.setBlinkStatus({
                                membersAdded: !0,
                                membersCount: e
                            })
                        })
                    }, a.setBlinkStatus = function(e) {
                        a.timers.push(setTimeout(function() {
                            return a.setState(e)
                        }, Et))
                    }, a.onHideStatus = function() {
                        a.setState({
                            membersAdded: !1,
                            flagsUpdated: !1
                        })
                    }, a.onLeave = function() {
                        var e = a.props,
                            t = e.store,
                            n = e.closePopup,
                            o = t.get().peer,
                            s = Object(i.pb)(t, o),
                            l = showFastBox({
                                title: xt(s ? "mail_leave_channel" : "mail_chat_leave_title"),
                                dark: 1
                            }, xt(s ? "mail_vkcomgroup_leave_confirm" : "mail_chat_leave_confirm"), xt(s ? "mail_leave_channel" : "mail_leave_chat"), function() {
                                t.set(r.Oc.bind(null, o)), t.set(r.cb.bind(null, o)), l.hide(), n(), t.get().longpoll.push([Object(c.Ab)()])
                            }, xt("global_cancel"), function() {
                                l.hide()
                            })
                    }, a.onResetLink = function() {
                        var e = a.props.store.get(),
                            t = e.peer;
                        return Object(r.Rb)(t, e).then(function(e) {
                            var t = kt(e, 1)[0];
                            a.setState({
                                invitationLink: t,
                                invitationLinkReseted: !0
                            })
                        })
                    }, a.onShowAttachments = function() {
                        var e = a.props.store.get().peer;
                        window.showWiki({
                            w: "history" + Object(i.H)(e) + "_photo"
                        }, null, {})
                    }, a.state = {
                        section: Ct,
                        invitationLink: null,
                        invitationLinkReseted: !1,
                        membersAdded: !1,
                        flagsUpdated: !1
                    }, a.timers = [], a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.go = function(e, t) {
                    var n = this;
                    this.setState({
                        section: e
                    }, function() {
                        n.props.updatePopup(), t && t()
                    })
                }, t.prototype.getPopupTitle = function() {
                    switch (this.state.section) {
                        case 1:
                            return xt("mail_settings_add_members");
                        case St:
                        case 3:
                            return xt("mail_chat_invite_link");
                        case 6:
                            return xt("mail_settings_options");
                        default:
                            return xt("mail_settings_title")
                    }
                }, t.prototype.componentWillReceiveProps = function(e) {
                    var t = this,
                        n = e.store.get(),
                        i = n.peer,
                        a = n.tabs[i];
                    a.photoLarge || a.photoGrid || this.resync || (this.resync = !0, e.store.set(r.L.bind(null, i)).then(function() {
                        t.resync = !0
                    }))
                }, t.prototype.componentDidMount = function() {
                    this.props.updatePopup()
                }, t.prototype.componentWillUnmount = function() {
                    this.timers.forEach(clearTimeout)
                }, t.prototype.render = function() {
                    var e = this,
                        t = this.props,
                        n = t.store,
                        r = t.closePopup,
                        a = n.get(),
                        o = a.peer,
                        s = a.tabs[o],
                        c = Object(i.pb)(n, o),
                        l = !c || !n.get().gid,
                        u = xt(c ? "mail_im_n_vkcomgroup_members" : "mail_im_n_chat_members", Object(i.P)(s));
                    return we.createElement("section", {
                        className: "ChatSettings"
                    }, we.createElement(Ee, {
                        title: this.getPopupTitle(),
                        back: this.state.section !== Ct ? xt("global_back") : void 0,
                        onCloseClick: r,
                        onBackClick: function() {
                            return e.go(Ct)
                        }
                    }), this.state.section === Ct && we.createElement("div", {
                        className: "ChatSettings__content"
                    }, we.createElement(Le, {
                        store: n,
                        photo: s.photoLarge,
                        grid: s.photoGrid,
                        title: s.name,
                        flags: s.data.flags,
                        meta: u,
                        description: ""
                    }), we.createElement(Xe, {
                        store: n,
                        showNotificationSettings: function() {},
                        showMembersSettings: function() {
                            return e.go(1)
                        },
                        showAttachments: this.onShowAttachments,
                        showInvitationLink: this.showInvitationLink,
                        showSettings: function() {
                            return e.go(6)
                        },
                        membersAdded: this.state.membersAdded,
                        membersCount: this.state.membersCount,
                        flagsUpdated: this.state.flagsUpdated,
                        onHideStatus: this.onHideStatus
                    }), c ? null : we.createElement("div", {
                        className: "ChatSettings__pane"
                    }, we.createElement(ut, {
                        store: n,
                        onLeave: this.onLeave,
                        showMembersSettings: function() {
                            return e.go(1)
                        },
                        membersAdded: this.state.membersAdded,
                        onHideStatus: this.onHideStatus,
                        membersCount: this.state.membersCount
                    })), l && we.createElement("div", {
                        className: "ChatSettings__pane"
                    }, we.createElement(xe.a, {
                        appearance: ["link", "mobile"],
                        className: "ChatSettings__leave",
                        onClick: this.onLeave
                    }, xt(c ? "mail_leave_channel" : "mail_settings_leave")))), 1 === this.state.section && we.createElement(vt, {
                        store: n,
                        afterSave: this.afterMembersAdded
                    }), 6 === this.state.section && we.createElement(wt, {
                        tab: s,
                        back: function() {
                            return e.go(Ct)
                        },
                        onSave: this.onUpdateFlags,
                        afterSave: this.afterUpdateFlags
                    }), this.state.section === St && we.createElement(Re, {
                        store: n,
                        onReset: function() {
                            return e.go(3)
                        },
                        reseted: this.state.invitationLinkReseted,
                        invitationLink: this.state.invitationLink
                    }), 3 === this.state.section && we.createElement(ze, {
                        onConfirm: this.onResetLink,
                        onCancel: function() {
                            return e.go(St)
                        }
                    }))
                }, t
            }(we.Component),
            Tt = window,
            Pt = Tt.MessageBox,
            Mt = Tt.show,
            Lt = Tt.hide,
            Bt = Tt.isVisible,
            Dt = Tt.boxRefreshCoords,
            Nt = void 0;

        function At(e) {
            var t = Ft();
            t && ke.render(we.createElement(It, {
                store: e,
                closePopup: Ht,
                updatePopup: Rt
            }), t)
        }

        function Ht() {
            Nt && Nt.hide()
        }

        function Rt() {
            Nt && Nt.updateBoxCoords()
        }

        function Ft() {
            return document.querySelector("#ChatSettings")
        }

        function qt(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                r = Bt(t);
            return {
                unmount: function() {
                    var t = Ft();
                    t && ke.unmountComponentAtNode(t), Object(s.c)(e)
                },
                showLoader: function() {
                    Dt(n), Mt(n), r || Mt(t)
                },
                hideLoader: function() {
                    Lt(n), r || Lt(t)
                }
            }
        }

        function Ut(e, t, n) {
            var i = Object(s.b)(qt).bindMutations,
                o = t.get(),
                c = Object(s.a)({
                    handlers: function(e, t) {}
                }),
                l = o.peer,
                u = i(c);
            var d = function(e, t) {
                    t.get().peer === l ? function(e) {
                        var t = Object(a.t)(e, e.get().peer);
                        t && t.data && !t.data.closed && !t.data.kicked ? At(e) : Ht()
                    }(t) : e.unmount()
                }.bind(null, u),
                f = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 560,
                    onShow: function() {
                        At(t), t.subscribe(d), requestAnimationFrame(function() {
                            return Nt.updateBoxCoords()
                        })
                    },
                    onHideAttempt: function() {
                        return t.unsubscribe(d), u.unmount(), !0
                    }
                };
            return u.showLoader(), t.set(r.L.bind(null, l)).then(function(e) {
                u.hideLoader();
                var t = Object(h.s)(e).peer;
                t && t === l ? Nt = new Pt(f).content('<div id="ChatSettings" class="ChatSettingsWrapper"></div>').show() : u.unmount()
            }), u
        }
        var zt = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        };

        function Wt(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        var Kt = we.createContext(),
            Vt = Kt.Provider,
            Qt = Kt.Consumer,
            Xt = Vt;

        function Gt(e) {
            return function(t) {
                function n() {
                    var e, r;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, n);
                    for (var i = arguments.length, a = Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                    return e = r = Wt(this, t.call.apply(t, [this].concat(a))), r.onUpdate = function() {
                        r.setState({})
                    }, Wt(r, e)
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(n, t), n.prototype.componentDidMount = function() {
                    this.store.subscribe(this.onUpdate)
                }, n.prototype.componentWillUnmount = function() {
                    this.store.unsubscribe(this.onUpdate)
                }, n.prototype.render = function() {
                    var t = this;
                    return we.createElement(Qt, null, function(n) {
                        return t.store || (t.store = n), we.createElement(e, zt({}, t.props, {
                            store: n
                        }))
                    })
                }, n
            }(we.Component)
        }
        var Jt = n("vRp6"),
            Yt = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };

        function Zt(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        var $t = function(e) {
                function t() {
                    var n, r;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    for (var i = arguments.length, a = Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                    return n = r = Zt(this, e.call.apply(e, [this].concat(a))), r.getRef = function(e) {
                        r.element = e && e.element
                    }, Zt(r, n)
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    var e = this.props,
                        t = e.className,
                        n = function(e, t) {
                            var n = {};
                            for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                            return n
                        }(e, ["className"]);
                    return we.createElement(Be.a, Yt({}, n, {
                        className: Object(Se.a)(t, "BlockSearchInput"),
                        ref: this.getRef
                    }))
                }, t
            }(we.Component),
            en = $t;
        $t.defaultProps = Be.a.defaultProps;
        var tn = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onError = function() {
                        r.setState({
                            errored: !0
                        })
                    }, r.state = {}, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    var e = this.props,
                        t = e.photo,
                        n = e.title,
                        r = e.online;
                    return we.createElement("div", {
                        className: Object(Se.a)("Avatar", {
                            "Avatar--online": r,
                            "Avatar--mobile": mobPlatforms[r]
                        })
                    }, we.createElement("div", {
                        className: "Avatar__wrapper"
                    }, we.createElement("img", {
                        onError: this.onError,
                        className: "Avatar__img",
                        src: this.state.errored ? "/images/camera_c.gif" : t,
                        alt: n
                    })))
                }, t
            }(we.Component),
            nn = n("ThPM"),
            rn = n("7p7+"),
            an = n("PjZB"),
            on = n("rjmT"),
            sn = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            cn = function() {
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
        var ln = Object(ft.b)(r.cc, 300),
            un = window,
            dn = un.Emoji,
            fn = un.langNumeric,
            mn = Ce.a.getLang,
            pn = 38,
            gn = 27,
            hn = 40,
            bn = 13,
            _n = Gt(function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var o = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return o.toggleMode = function() {
                        var e = o.props.store;
                        if (Object(a.B)(e)) {
                            var t = 0 === o.state.mode ? 1 : 0,
                                n = 0 === t ? r.ec : r.ic;
                            o.setState({
                                value: "",
                                mode: t,
                                loading: !0,
                                selected: null,
                                found: []
                            }, function() {
                                return n("", e.get()).then(function(e) {
                                    return o.setSearchResults(o.filterResults(e))
                                }).then(function() {
                                    return o.searchInput.focus()
                                }).catch(function(e) {
                                    return console.error(e)
                                })
                            })
                        }
                    }, o.onChange = function(e) {
                        o.setState({
                            value: e.target.value,
                            loading: !0,
                            error: null
                        });
                        var t = e.target.value;
                        o.searchQuery !== t && (o.searchQuery = t, o.onSearch(t))
                    }, o.filterResults = function(e) {
                        var t = Object(a.B)(o.props.store) && 1 === o.state.mode;
                        return e.filter(function(e) {
                            var n = e.peerId;
                            return !(t && n < 0) && (!(t && n > 2e9 && !Object(D.m)(e, 1024)) && !(!t && n > 2e9 && Object(D.m)(e, 1024)))
                        })
                    }, o.onSearch = function(e) {
                        var t = o.props.store,
                            n = t.get(),
                            i = Object(a.B)(t) && 0 === o.state.mode,
                            s = i ? r.ec : r.ic;
                        return 1 === o.state.mode && "" === e ? o.emptySearch().then(function(e) {
                            o.setSearchResults(o.filterResults(e))
                        }) : s(e, n).then(function(t) {
                            var r = t.map(function(e) {
                                return e.peerId
                            });
                            return t = o.filterResults(t), o.setSearchResults(t, !1, !t.length), e ? ln(e, r, "all", {
                                hidegid: i
                            }, n) : Promise.resolve([])
                        }).then(function(t) {
                            e === o.state.value && o.setSearchResults(o.filterResults(t), !0)
                        }).catch(function() {})
                    }, o.emptySearch = function() {
                        var e = o.props.store,
                            t = e.get(),
                            n = t.dialog_tabs.all,
                            i = {},
                            s = {};
                        return Object(r.ic)("", t).then(function(r) {
                            return r.forEach(function(e) {
                                s[e.peerId] = e
                            }), [t.peer].concat(n.filter(function(e) {
                                return e != t.peer
                            })).map(function(t) {
                                var n = Object(a.t)(e, t);
                                return i[t] = !0, {
                                    name: s[t] && s[t].name || n.name,
                                    photo: s[t] && s[t].photo || n.photo,
                                    data: n.data,
                                    peerId: t
                                }
                            }).concat(r.filter(function(e) {
                                return !i[e.peerId]
                            }))
                        })
                    }, o.sendRecipient = function(e) {
                        var t = o.props.store,
                            n = t.get();
                        1 === o.state.mode ? (n.longpoll.push([Object(c.bb)(e, !1, !0, !0, "forward_messages_popup")]), Object(ye.e)(t), Object(a.B)(t) && Object(ye.g)(t, !1)) : o.setState({
                            selected: e,
                            error: null
                        }, function() {
                            dn.focus(o.input)
                        })
                    }, o.cleanSelectedRecipient = function() {
                        o.setState({
                            activeElement: -1
                        })
                    }, o.scrollToSelectedUser = function() {
                        var e = o.state,
                            t = e.found,
                            n = e.activeElement,
                            r = o.scrollContainer;
                        if (r) {
                            var i = r.querySelector('[data-id="' + t[n].peerId + '"]');
                            if (i)
                                if (i.offsetTop < r.scrollTop) r.scrollTop = i.offsetTop;
                                else {
                                    var a = i.offsetTop + i.offsetHeight;
                                    a > r.scrollTop + r.offsetHeight && (r.scrollTop = a - r.offsetHeight)
                                }
                            else r.scrollTop = (r.childNodes[1].offsetHeight || 0) * n
                        }
                    }, o.selectRecipient = function(e) {
                        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                            n = o.validateActiveElement(e);
                        o.state.activeElement !== n && o.setState({
                            activeElement: n
                        }, function() {
                            t && o.scrollToSelectedUser()
                        })
                    }, o.onClick = function(e) {
                        return o.sendRecipient(Number(e.currentTarget.getAttribute("data-id")))
                    }, o.loadMore = function() {}, o.setSearchResults = function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        if (!o.unmounted)
                            if (t) {
                                var r = e.filter(function(e) {
                                    return !o.found[e.peerId]
                                });
                                r.forEach(function(e) {
                                    o.found[e.peerId] = !0
                                }), o.setState({
                                    found: [].concat(o.state.found, r),
                                    loading: n
                                })
                            } else o.found = e.reduce(function(e, t) {
                                return e[t.peerId] = !0, e
                            }, {}), o.setState({
                                found: e,
                                loading: n,
                                activeElement: 0
                            })
                    }, o.getFormRef = function(e) {
                        o.form = e
                    }, o.getInputRef = function(e) {
                        o.input = e
                    }, o.getSearchRef = function(e) {
                        o.searchInput = e && e.element
                    }, o.getScrollContainerRef = function(e) {
                        o.scrollContainer = ke.findDOMNode(e)
                    }, o.getEmojiButtonRef = function(e) {
                        o.emojiButton = e
                    }, o.onEmojiButtonMouseOver = function(e) {
                        e.persist(), dn.show(o.emojiButton, e)
                    }, o.onEmojiButtonMouseOut = function(e) {
                        e.persist(), dn.hide(o.emojiButton, e)
                    }, o.send = function() {
                        var e = o.props.store,
                            t = o.state.selected,
                            n = dn.val(o.input).trim(),
                            s = new on.a({}, 0),
                            c = e.get().pendingForward;
                        if (t && !Object(i.sb)(val)) {
                            o.setState({
                                sending: !0
                            });
                            var l = Object(a.B)(e) && 0 === o.state.mode;
                            l || s.addAttach("mail", c.msgIds.join(";"), c.object || null);
                            var u = {
                                    message: n,
                                    attaches: s.dData.attaches.map(function(e) {
                                        return [e.type, e.id]
                                    }) || []
                                },
                                d = {
                                    hidegid: !0,
                                    external: {
                                        original_gid: e.get().id,
                                        fwd_group_msg_ids: l ? c.msgIds.join(";") : void 0
                                    }
                                };
                            new Promise(function(n) {
                                Object(r.jb)([t], {
                                    hidegid: !0
                                }, e.get()).then(function(e) {
                                    var r = cn(e, 1)[0];
                                    return n(r[t])
                                })
                            }).then(function(n) {
                                return e.set(r.lc.bind(null, t, u, sn({
                                    hash: n
                                }, d)))
                            }).then(function() {
                                Object(ye.g)(e, !0), e.setState({
                                    pendingForward: null
                                }), o.props.closePopup(), showDoneBox(mn("mail_send3"))
                            }).catch(function(e) {
                                o.unmounted || o.setState({
                                    sending: !1
                                }, function() {
                                    showFastBox(mn("mail_error"), e)
                                })
                            })
                        }
                    }, o.onSearchKeyDown = function(e) {
                        e.keyCode === gn && o.state.value && (o.searchInput.blur(), o.searchQuery = "", o.setState({
                            value: "",
                            loading: !0,
                            error: null
                        }, o.onSearch.bind(o, "")), e.stopPropagation())
                    }, o.onMessageInputKeyDown = function(e) {
                        e.keyCode === gn && (o.state.sending || (dn.val(o.input, ""), o.setState({
                            selected: null
                        }), o.searchInput.focus()), e.stopPropagation())
                    }, o.onKeydown = function(e) {
                        var t = o.state.activeElement;
                        switch (e.which || e.keyCode) {
                            case pn:
                                o.selectRecipient(t - 1), e.preventDefault();
                                break;
                            case hn:
                                o.selectRecipient(t + 1), e.preventDefault();
                                break;
                            case bn:
                                var n = o.state,
                                    r = n.found,
                                    i = n.activeElement;
                                r[i] && (o.sendRecipient(r[i].peerId), e.preventDefault())
                        }
                    }, o.state = {
                        value: "",
                        found: [],
                        mode: 1,
                        loading: !0,
                        sending: !1,
                        selected: null,
                        activeElement: 0
                    }, o.emptySearch().then(function(e) {
                        o.setSearchResults(o.filterResults(e))
                    }).catch(function(e) {
                        return console.error(e)
                    }), o
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.getMembersCount = function(e) {
                    if (!Object(i.hb)(e)) return "";
                    var t = this.props.store,
                        n = Object(a.t)(t, e);
                    return n && n.membersCount ? fn(n.membersCount, mn("mail_im_n_chat_members", "raw")) : ""
                }, t.prototype.validateActiveElement = function(e) {
                    return e > this.state.found.length - 1 ? this.state.found.length - 1 : e < 0 ? 0 : e
                }, t.prototype.componentDidMount = function() {
                    this.props.updatePopup(), dn.init(this.input, {
                        noStickers: !0,
                        onSend: this.send
                    }), this.input.addEventListener("keydown", this.onMessageInputKeyDown), this.searchInput.addEventListener("keydown", this.onKeydown), this.searchInput.addEventListener("keydown", this.onSearchKeyDown)
                }, t.prototype.componentWillUnmount = function() {
                    this.input.removeEventListener("keydown", this.onMessageInputKeyDown), this.searchInput.removeEventListener("keydown", this.onKeydown), this.searchInput.removeEventListener("keydown", this.onSearchKeyDown), this.unmounted = !0
                }, t.prototype.render = function() {
                    var e = this,
                        t = this.props,
                        n = t.store,
                        r = t.closePopup,
                        i = this.state,
                        o = i.mode,
                        s = i.loading,
                        c = i.selected,
                        l = i.found,
                        u = i.sending,
                        d = i.activeElement;
                    return we.createElement("section", {
                        className: Object(Se.a)("MessageForward", {
                            "MessageForward--form": 0 === o && !!c
                        })
                    }, we.createElement(Ee, {
                        title: we.createElement(we.Fragment, null, we.createElement("span", {
                            className: "MessageForward__title"
                        }, mn("mail_forward_messages")), Object(a.B)(n) && we.createElement("span", {
                            className: "MessageForward__switch",
                            onClick: this.toggleMode
                        }, mn(0 === o ? "mail_forward_to_community_messages" : "mail_forward_to_im"))),
                        onCloseClick: r
                    }), we.createElement("div", {
                        className: "MessageForward__content",
                        onMouseLeave: this.cleanSelectedRecipient
                    }, we.createElement(en, {
                        value: this.state.value,
                        onChange: this.onChange,
                        placeholder: mn("mail_top_search"),
                        autoFocus: !0,
                        key: "search",
                        ref: this.getSearchRef
                    }), s && we.createElement("div", {
                        className: "MessageForward__results",
                        key: "loading"
                    }, we.createElement(rn.a, {
                        className: "MessageForward__stub"
                    }, we.createElement(an.a, null))), !s && 0 === l.length && we.createElement("div", {
                        className: "MessageForward__results",
                        key: "no-results"
                    }, we.createElement(rn.a, null, mn("mail_im_search_empty_chats"))), !s && l.length > 0 && we.createElement(Jt.a, {
                        virtualized: !0,
                        className: "MessageForward__results",
                        loadMore: this.loadMore,
                        hasMore: !1,
                        ref: this.getScrollContainerRef,
                        key: "results"
                    }, l.map(function(t, r) {
                        var i = t.peerId,
                            s = t.name,
                            l = t.photo,
                            u = t.online;
                        return we.createElement(Ke.a, {
                            key: i,
                            "data-id": i,
                            onClick: e.onClick,
                            chevron: 1 === o,
                            active: r === d,
                            canBeHovered: !1,
                            onMouseEnter: e.selectRecipient.bind(null, r, !1),
                            aside: 0 === o ? we.createElement("span", {
                                className: Object(Se.a)("MessageForward__radio", {
                                    "MessageForward__radio--selected": +c === i
                                })
                            }) : ""
                        }, we.createElement(Je.a, {
                            size: "34",
                            title: s,
                            photo: Array.isArray(l) ? we.createElement(nn.a, {
                                photos: l
                            }) : we.createElement(tn, {
                                online: (Object(a.t)(n, i) || {}).online || u,
                                title: s,
                                photo: l
                            }),
                            description: e.getMembersCount(i)
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
                    })))), u ? we.createElement("div", {
                        className: "MessageForward__send-spinner"
                    }, we.createElement(an.a, null)) : we.createElement("button", {
                        className: "MessageForward__send",
                        onClick: this.send
                    }))))
                }, t
            }(we.Component)),
            vn = window,
            yn = vn.MessageBox,
            jn = vn.show,
            On = vn.hide,
            wn = vn.isVisible,
            kn = vn.getLang,
            Cn = vn.boxRefreshCoords,
            Sn = void 0;

        function En() {
            Sn && Sn.hide()
        }

        function xn() {
            Sn && Sn.updateBoxCoords()
        }

        function In() {
            return document.querySelector("#MessageForward")
        }

        function Tn(e) {
            var t = document.querySelector("#box_layer_wrap"),
                n = document.querySelector("#box_loader"),
                r = wn(t);
            return {
                unmount: function() {
                    var t = In();
                    t && ke.unmountComponentAtNode(t), Object(s.c)(e)
                },
                showLoader: function() {
                    Cn(n), jn(n), r || jn(t)
                },
                hideLoader: function() {
                    On(n), r || On(t)
                }
            }
        }

        function Pn(e, t, n) {
            var i = (0, Object(s.b)(Tn).bindMutations)(Object(s.a)({
                    handlers: function(e, t) {}
                })),
                a = {
                    hideButtons: !0,
                    bodyStyle: "padding: 0; background: none;",
                    width: 500,
                    onShow: function() {
                        ! function(e) {
                            var t = In();
                            t && ke.render(we.createElement(Xt, {
                                value: e
                            }, we.createElement(_n, {
                                getLang: kn,
                                closePopup: En,
                                updatePopup: xn
                            })), t)
                        }(t), requestAnimationFrame(function() {
                            return Sn.updateBoxCoords()
                        })
                    },
                    onHideAttempt: function() {
                        return t.set(r.Cb.bind(null, null)), i.unmount(), !0
                    }
                };
            return i.showLoader(), Promise.resolve().then(function(e) {
                i.hideLoader(), Sn = new yn(a).content('<div id="MessageForward"></div>').show()
            }), i
        }
        var Mn = function() {
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
        var Ln = "_im_action",
            Bn = "_im_page_peer_name",
            Dn = "_ui_menu",
            Nn = "_im_dialog_action_wrapper",
            An = "_im_mess_actions",
            Hn = "_im_page_action",
            Rn = "_im_chat_topic_change_input",
            Fn = "_im_chat_verified",
            qn = "im-page--chat-header_chat",
            Un = "im-page--chat-header_vkcomgroup",
            zn = "_im_page_peer_name",
            Wn = "_im_chat_members",
            Kn = "_im_chat_invite_link",
            Vn = '<a tabindex="0" role="link" class="ui_actions_menu_item ' + Ln + ' im-action im-action_%icon%" data-action="%action%">%name%</a>';

        function Qn(e, t, n) {
            return !e.map(function(e) {
                var r = Object(a.m)(t, n, e);
                return Object(o.h)(r)
            }).reduce(function(e, t) {
                return e && t
            }, !0)
        }

        function Xn(e, t) {
            var n = t.get(),
                r = n.peer,
                i = n.tabs[r].pinned;
            return 1 === e.length && i && e[0] === Object(a.P)(i).messageId
        }

        function Gn(e, t, n) {
            var r = getLang("mail_selected_shorted", t.length);
            Zn({
                actions: !0
            }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
                label: r.replace("{count}", t.length),
                tip: getLang("mail_deselect_all")
            }));
            var o = Object(a.t)(n, n.get().peer),
                s = e.querySelector("." + An),
                c = Qn(t, n, n.get().peer),
                l = Xn(t, n),
                u = Object(i.hb)(o.peerId) && Object(D.j)(n, o.peerId),
                d = Object(i.pb)(n, o.peerId),
                f = e.querySelector("." + Hn + '[data-action="respond"]'),
                m = Boolean(Object(a.R)(o)),
                p = Boolean(Object(a.Q)(o));
            toggleClass(s, "im-page--mess-actions_important", !c), toggleClass(s, "im-page--mess-actions_pinned", l), toggleClass(s, "im-page--mess-actions_vkcomgroup", d && !n.get().gid), toggleClass(s, "im-page--mess-actions_multiple-selection", t.length > 1), toggleClass(s, "im-page--mess-actions_no-pin-btn", !u), toggleClass(s, "im-page--mess-actions_out-mr", m), toggleClass(s, "im-page--mess-actions_in-mr", p), t.length > 1 ? f.innerHTML = getLang("mail_forward_here") : f.innerHTML = getLang("mail_im_mark_reply");
            var g = c ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
                h = l ? getLang("mail_unpin") : getLang("mail_pin");
            attr(geByClass1("im-page-action_star", e), "aria-label", g), attr(geByClass1("im-page-action_pin", e), "aria-label", h)
        }

        function Jn(e, t, n) {
            var o = t.get(),
                s = o.peer,
                c = o.tabs[s],
                l = clean(stripHTML(unclean(c.tab))),
                u = geByClass1(Fn, e),
                d = geByClass1(i.r),
                f = Object(i.hb)(s),
                m = f && Object(i.pb)(t, s);
            u.tt = !1;
            var p = Object(i.Xb)(t, c, !0),
                g = getTemplate("im_simple_link", {
                    href: m ? "/club" + -c.ownerId : c.href,
                    content: getTemplate("im_peer_photo", {
                        online_class: "",
                        owner_photo: p,
                        modifier_class: "nim-peer_smaller"
                    })
                });
            val(geByClass1("im-page--aside-photo", e), g);
            var h, b, _, v = f ? !c.data.closed && !c.data.kicked : 0,
                y = {
                    muted: inArray(s, o.mutedPeers),
                    verified: !!c.verified,
                    chat: f,
                    vkcomgroup: m,
                    actions: !1,
                    derelict: f && !v && !m,
                    pinned: !1
                };
            if (f) {
                var j = Object(a.p)(t),
                    O = function(e) {
                        var t = Object(a.p)(e);
                        if (!t || Object(B.c)(e, t.userId)) return !1;
                        return t.userId
                    }(t);
                j && Object(Oe.a)(t, s) && (O ? t.set(r.hb.bind(null, (h = {}, b = s, _ = [O], b in h ? Object.defineProperty(h, b, {
                    value: _,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : h[b] = _, h))).then(Jn.bind(null, e, t, n)) : y.pinned = !0)
            }
            var w = "";
            f ? w = m ? getTemplate("im_vkcomgroup_members", {
                name: getLang("mail_im_n_vkcomgroup_members", Object(i.P)(c))
            }) : v ? getTemplate("im_chat_members", {
                name: getLang("mail_im_n_chat_members", Object(i.P)(c))
            }) : "" : Object(i.Fb)(s) && (w = Object(i.W)(t, s));
            var k = getTemplate("im_simple_name", {
                name: c.tab,
                href: m ? "/club" + -c.ownerId : c.href,
                name_attr: l,
                ads_union: c.ad_union_ids_attr,
                online: w,
                more_cls: "" === w ? "im-page--title--1line" : ""
            });
            val(geByClass1("im-page--title-wrapper", e), k);
            var C = val(d) && !c.top_banner,
                S = Yn(t) && !c.top_banner,
                E = geByClass1(Bn, e);
            if (removeClass(E, i.k), show(geByClass1(Nn, e)), removeClass(geByClass1(An, e), "im-page--mess-actions_visible"), removeClass(geByClass1(An, e), "im-page--mess-actions_all-sel"), function(e, t, n) {
                    geByClass("_im_header_icon", e).forEach(function(e) {
                        if (n.length > 0) hide(e);
                        else if ("star" === domData(e, "type") && Object(i.nb)(t) && (toggleClass(e, "im-page--header-icon_star-active", Object(i.qb)(t)), setStyle(e, {
                                display: "inline-block"
                            })), "answer" === domData(e, "type") && Object(i.nb)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", Object(i.Db)(t)), Object(i.Db)(t) ? setStyle(e, {
                                display: "inline-block"
                            }) : hide(e)), "search" === domData(e, "type") && !Object(i.jb)(t)) {
                            var r = Object(i.ob)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                            setStyle(e, {
                                display: "inline-block"
                            }), toggleClass(e, "im-page-header-icon_search-shown", r)
                        }
                    })
                }(e, t, []), Object(i.ib)(t)) {
                var x = geByClass1("_im_page_back", e);
                attr(x, "href", Object(i.S)(t) + "?tab=" + o.active_tab)
            }
            Zn(y, "im-page--chat-header"), Object(i.G)(t, S, C, n)
        }

        function Yn(e) {
            var t = Object(a.p)(e),
                n = geByClass1(i.r);
            if (removeClass(n, "im-page--pinned_with-bar"), t && Object(o.j)(t)) {
                if (void 0 === t.kludges.attach1_tr_amount) return;
                t.kludges.attach1_total_amount && addClass(n, "im-page--pinned_with-bar")
            }
            var r = Object(i.Yb)(e);
            return val(n, r), !!r
        }

        function Zn(e, t) {
            var n = geByClass1(t);
            Object.keys(e).forEach(function(r) {
                toggleClass(n, t + "_" + r, !!e[r])
            })
        }

        function $n(e, t, n, i, a) {
            e.set(r.Ob.bind(null, n, a, i)).then(t().removeMessagesRestore.bind(null, n, a, i)), Object(r.Lb)(n, a, null, i, e.get())
        }

        function er(e, t, n) {
            if (Object(i.hb)(t)) {
                var a = e.get().tabs[t].name,
                    o = function(e, t, n, i, a, o) {
                        if ("keydown" !== o.type || 13 === o.which) {
                            var s = trim(val(a));
                            return s ? (s !== n && e.set(r.Sc.bind(null, t, s)), !0) : (notaBene(a), !1)
                        }
                    }.bind(null, e, t, a, n),
                    s = showFastBox({
                        title: getLang("mail_chat_topic_change_title"),
                        dark: 1
                    }, getTemplate("im_chat_change_topic", {
                        value: a
                    }), getLang("global_save"), function(e, t) {
                        o(c, t) && s.hide()
                    }, getLang("global_cancel"), function() {
                        s.hide()
                    }),
                    c = geByClass1(Rn, s.bodyNode);
                elfocus(c), addEvent(c, "keydown", function(e) {
                    o(c, e) && s.hide()
                })
            }
        }

        function tr(e, t, n, o, s, l) {
            var u = domData(l, "action"),
                d = geByClass1(Dn, o).parentNode,
                f = e.get().peer;
            switch (u) {
                case "clear":
                    var m = Object(a.t)(e, f),
                        p = Object(i.pc)(m, f, function() {
                            Object(i.F)(e, p, t, r.I, e.get().peer)
                        });
                    break;
                case "photos":
                case "media":
                    showWiki({
                        w: "history" + Object(i.H)(f) + "_photo"
                    }, null, {});
                    break;
                case "topic":
                    er(e, f, t);
                    break;
                case "avatar":
                    cur.recieveCropResult = void 0, Page.ownerPhoto(f, {
                        gid: e.get().gid
                    });
                    break;
                case "search":
                    t().showSearch(e);
                    break;
                case "block_notify":
                case "block_community":
                    e.set(r.Gc.bind(null, !1, f)).then(function() {
                        e.get().longpoll.push([Object(c.Ab)()]), showDoneBox(getLang("mail_community_was_blocked"))
                    });
                    break;
                case "allow_community":
                    e.set(r.Gc.bind(null, !0, f)).then(function() {
                        n().changeActions(e)
                    });
                    break;
                case "block":
                    Object(i.lc)(f, e).once("success", function(t) {
                        t.delta && (showDoneBox(t.msg), e.get().longpoll.push([Object(c.Ab)()]))
                    });
                    break;
                case "leave":
                    var g = Object(i.rc)(e, f, function(n) {
                        n && Object(i.F)(e, g, t, r.I, f), e.set(r.cb.bind(null, f)), e.set(r.Oc.bind(null, f)), g.hide(), e.get().longpoll.push([Object(c.Ab)()])
                    });
                    break;
                case "invite_link":
                    var h = function(e, t, n) {
                            var i = showFastBox({
                                title: getLang("mail_chat_invite_link"),
                                dark: 1
                            }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(a) {
                                var o = gpeByClass("_im_invite_box", n.target),
                                    s = geByClass1(Kn, o),
                                    c = geByClass1("_im_invite_new", o);
                                lockButton(i.btns.ok[0]), Object(r.Rb)(t, e.get()).then(function(e) {
                                    var t = Mn(e, 1)[0];
                                    unlockButton(i.btns.ok[0]), s.value = t, unlockButton(c), addClass(o, "im-invite-box_reseted"), elfocus(s, 0, t.length), i.hide()
                                })
                            }, getLang("global_cancel"), function() {
                                i.hide()
                            })
                        }.bind(null, e, f),
                        b = !1,
                        _ = !1,
                        v = !1,
                        y = function() {
                            elfocus(b, 0, b.value.length), document.execCommand("copy"), setStyle(_, {
                                opacity: 1
                            }), v && (v = clearTimeout(v)), v = setTimeout(function() {
                                return setStyle(_, {
                                    opacity: 0
                                })
                            }, 2e3)
                        },
                        j = !1,
                        O = !1;
                    showBox("al_im.php", {
                        act: "a_get_link",
                        gid: e.get().gid,
                        chat_id: f - 2e9,
                        markup: 1
                    }, {
                        onDone: function(e) {
                            b = geByClass1(Kn, e.bodyNode), j = geByClass1("_im_reset_link", e.bodyNode), O = geByClass1("_im_invite_copy", e.bodyNode), _ = geByClass1("_im_invite_copied", e.bodyNode), elfocus(b, 0, b.value.length), addEvent(j, "click", h), addEvent(O, "click", y)
                        },
                        params: {
                            hideButtons: !0,
                            onHide: function() {
                                removeEvent(j, "click", h), removeEvent(O, "click", y)
                            },
                            onShow: function() {
                                addEvent(j, "click", h), addEvent(O, "click", y)
                            }
                        }
                    }, {});
                    break;
                case "return":
                    e.set(r.Zb.bind(null, f)).then(function(e) {
                        return e.set(r.Q.bind(null, f))
                    }).then(t().updateChatTopic.bind(null, f)).catch(function(e) {
                        showFastBox(getLang("global_error"), e)
                    });
                    break;
                case "unmute":
                case "mute":
                    e.set(r.Lc.bind(null, f, "mute" === u)).then(t().updateState.bind(null, f));
                    break;
                case "chat":
                case "invite":
                    if (Object(i.hb)(f)) Object(i.eb)(e, f, t, r.qc);
                    else if (Object(i.Fb)(f)) {
                        var w = e.get().tabs[f],
                            k = [
                                [f, w.tab]
                            ];
                        e.set(r.qc.bind(null, "chat", [])).then(function() {
                            return t().showCreation(e, k)
                        })
                    }
                    break;
                case "pin_hide":
                    Object(Oe.c)(e, Object(a.o)(e), t);
                    break;
                case "pin_unhide":
                    Object(Oe.d)(e, Object(a.o)(e), t);
                    break;
                case "unpin":
                    Object(Oe.e)(e, Object(a.o)(e), t);
                    break;
                case "settings":
                    n().showSettings(e)
            }
            uiActionsMenu.toggle(d, !1), t().cancelEditing()
        }

        function nr(e, t, n) {
            var i = e.get().selectedMessages;
            e.set(r.t).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, i))
        }

        function rr(e, t, n, r) {
            var a = Object(i.ib)(e),
                o = void 0,
                s = void 0;
            switch (domData(r, "type")) {
                case "star":
                    s = [4, 6], o = function() {
                        return Object(i.qb)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                    };
                    break;
                case "answer":
                    s = [4, 6], o = getLang("mail_end_conversation");
                    break;
                case "search":
                    s = a ? [5, 6] : [4, -9], o = getLang("mail_search_in_peer")
            }
            showTooltip(r, {
                text: o || "",
                black: 1,
                shift: s,
                forcetoup: !0,
                appendParentCls: a ? "_im_dialog_actions" : "_im_mess_actions"
            })
        }

        function ir(e, t, n) {
            var r = Object(i.ib)(e),
                a = domData(n.target, "action");
            "respond" !== a && "forward" !== a && showTooltip(n.target, {
                text: function(e, t) {
                    var n = e.get(),
                        r = n.selectedMessages,
                        i = n.peer;
                    switch (t) {
                        case "pin":
                            return Xn(r, e) ? getLang("mail_unpin") : getLang("mail_pin");
                        case "star":
                            return Qn(r, e, i) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
                        case "delete":
                            return getLang("mail_delete");
                        case "spam":
                            return getLang("mail_im_mark_spam")
                    }
                }.bind(null, e, a) || "",
                black: 1,
                shift: [2, r ? -4 : 11],
                forcetodown: !0,
                appendParentCls: "_im_dialog_actions"
            })
        }

        function ar(e, t, n, o) {
            return {
                changeActions: function(t) {
                    var n = geByClass1(Dn, e),
                        i = geByClass1(Nn, e),
                        a = t.get().curActions,
                        o = Object.keys(a).map(function(e, t) {
                            var n = "";
                            return 7 !== r.a[e] && 10 !== r.a[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(Vn, {
                                name: a[e].name,
                                icon: a[e].icon,
                                action: e
                            })
                        }).join("");
                    0 === Object.keys(a).length ? addClass(i, "im-page--header-more_loading") : (val(n, o), removeClass(i, "im-page--header-more_loading"))
                },
                showSettings: function(e) {
                    var t = e.get(),
                        n = Object(a.t)(e, t.peer);
                    n.data.closed || n.data.kicked || Ut(0, e)
                },
                showForward: function(e) {
                    Pn(0, e)
                },
                renderPeer: function(n) {
                    Jn(e, n, t)
                },
                reRenderPinned: function(e) {
                    var t = Object(a.g)(e);
                    t && t.pinned && Yn(e)
                },
                renderActions: function(t) {
                    var n = t.get().selectedMessages || [];
                    n.length > 0 && Gn(e, n, t)
                },
                hideActions: function(t) {
                    if (!Object(i.ob)(t, t.get().peer)) {
                        var n = geByClass1(Nn, e);
                        addClass(n, "im-page--header-more_loading")
                    }
                },
                changedMessageSelection: function(n) {
                    if (0 !== n.get().peer) {
                        var r = n.get().selectedMessages || [];
                        r.length > 0 ? Gn(e, r, n) : Jn(e, n, t)
                    }
                },
                updateLastSeen: function(t) {
                    ! function(e, t) {
                        var n = e.get().peer,
                            r = geByClass1("_im_page_peer_online", t);
                        r && Object(i.Fb)(n) && Object(a.t)(e, n) && Object(i.y)(r, Object(i.W)(e, n))
                    }(t, e)
                },
                deselectAll: function(e) {
                    nr(e, t, o)
                },
                unmount: function() {
                    Object(s.c)(n), cancelStackFilter("fowrward")
                }
            }
        }

        function or(e, t, n) {
            var o = Object(s.b)(ar),
                l = o.callMutations,
                u = o.bindMutations,
                d = function(e, t, n, o, s) {
                    var l = e.get().selectedMessages,
                        u = domData(s, "action"),
                        d = e.get().peer,
                        f = !0,
                        m = Object(a.t)(e, d);
                    if ("star" !== u && Object(a.R)(m)) return nr(e, t, n);
                    switch (u) {
                        case "delete":
                            var p = !(vk.id == d && !e.get().gid) && l.every(function(t) {
                                return Object(i.B)(e, Object(a.m)(e, d, t))
                            });
                            if (p || l.length > 1) {
                                f = !1;
                                var g = Object(i.tc)(d, l.length, p, function(i) {
                                    nr(e, t, n), g.hide(), cur.imDb.updateByKey("del_forall_checked", i), i ? Object(r.Lb)(l, d, null, "deleteforall", e.get()) : $n(e, t, l, u, d)
                                })
                            } else $n(e, t, l, u, d);
                            break;
                        case "spam":
                            $n(e, t, l, u, d);
                            break;
                        case "forward":
                            Object(r.Eb)(l, e.get().peer, e).then(function(t) {
                                return e.set(r.Cb.bind(null, t))
                            }).then(function() {
                                return n().showForward(e)
                            }).catch(function(e) {
                                return console.error(e)
                            });
                            break;
                        case "star":
                            var h = Qn(l, e, d);
                            e.set(r.G.bind(null, l, h, d)), e.get().longpoll.push(l.map(function(e) {
                                return {
                                    type: h ? c.U : c.Q,
                                    messageId: e,
                                    peerId: d,
                                    flags: c.l
                                }
                            }));
                            break;
                        case "respond":
                            var b = e.get(),
                                _ = 1 === l.length;
                            Object(r.Eb)(l, b.peer, e).then(function(t) {
                                return e.set(r.K.bind(null, t, b.tfdraft, _))
                            }).then(function() {
                                t().respond(e, d)
                            });
                            break;
                        case "pin":
                            var v = Object(a.l)(e, l[0]),
                                y = Xn(l, e),
                                j = y ? r.Oc.bind(null, d) : r.Ab.bind(null, v, d),
                                O = y ? r.Nc.bind(null, d) : r.zb.bind(null, v, d),
                                w = function(e, t, n) {
                                    return e().updateChatTopic(t, n), n
                                }.bind(null, t, d);
                            e.set(r.r.bind(null, e, v, d)).then(function(e) {
                                return e.set(j)
                            }).then(w).then(function(e) {
                                return e.set(O)
                            }).then(w)
                    }
                    f && nr(e, t, n)
                }.bind(null, t, n, l),
                f = tr.bind(null, t, n, l, e),
                m = nr.bind(null, t, n, l),
                p = function(e, n) {
                    return Object(i.zc)(n, t.get().peer)
                },
                g = rr.bind(null, t, e),
                h = ir.bind(null, t, e),
                b = function(e, t, n, i, o) {
                    switch (domData(o, "type")) {
                        case "star":
                            e.set(r.Jc.bind(null, e.get().peer)).then(function() {
                                setTimeout(function() {
                                    return rr(e, 0, 0, o)
                                }, 40)
                            });
                            break;
                        case "search":
                            n().showSearch(e), window.tooltips && tooltips.hide(o, {
                                fasthide: !0
                            });
                            break;
                        case "answer":
                            var s = Object(a.t)(e, e.get().peer);
                            s && (e.set(r.vb.bind(null, e.get().peer, s.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                                out: 1e3
                            }), e.get().longpoll.push([Object(c.Ab)()]))
                    }
                }.bind(null, t, e, n),
                _ = function() {
                    return l().showSettings(t)
                },
                v = function(t) {
                    !gpeByClass(qn, t.target, e) || gpeByClass(Un, t.target, e) || checkEvent(t) || (_(), cancelEvent(t))
                },
                y = Object(s.a)({
                    handlers: function(n, r) {
                        r(e, "click", Hn, d), r(e, "click", Ln, f), r(e, "click", i.k, m), r(e, "mouseover", Fn, p), r(e, "mouseover", "_im_header_icon", g), r(e, "mouseover", Hn, h), r(e, "click", "_im_header_icon", b), r(e, "click", "_im_header_link", v), r(e, "click", zn, v), r(e, "click", Wn, _), r(e, "click", "_im_page_back", function(e) {
                            checkEvent(e) || (t.get().longpoll.push([Object(c.Ab)()]), cancelEvent(e))
                        })
                    }
                });
            return Object(i.yb)(t.get().peer) || setTimeout(function() {
                t.set(r.oc).then(l().changeActions)
            }), u(e, n, y, l)
        }
        var sr = n("g6Ay"),
            cr = 600,
            lr = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest;

        function ur(e) {
            var t = e % 60;
            return parseInt(e / 60) + ":" + (t < 10 ? "0" : "") + t
        }
        var dr = void 0,
            fr = void 0,
            mr = void 0,
            pr = void 0,
            gr = void 0,
            hr = void 0,
            br = void 0,
            _r = void 0,
            vr = void 0,
            yr = void 0,
            jr = void 0,
            Or = void 0,
            wr = void 0,
            kr = void 0,
            Cr = !1,
            Sr = !1,
            Er = 100;

        function xr(e) {
            if (!Sr) {
                Sr = !0, Object(i.Ib)(hr);
                var t = {
                    peer: _r.get().peer,
                    from_place: cur.docsChooseFrom,
                    imhash: cur.docsChooseImHash,
                    blockPersonal: cur.docsChooseBlockPersonal,
                    mail_add: cur.docsChooseMailAdd
                };
                (function(e) {
                    return new Promise(function(t, n) {
                        for (var r = new FormData, i = [], a = 0; a < e.wave.length; a++) i.push(parseInt(31 * e.wave[a]));
                        r.append("waveform", JSON.stringify(i)), r.append("file", e.buffer, "voice_message." + function(e) {
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
                        var o = new lr;
                        o.onload = o.onerror = function(e) {
                            var r = e.currentTarget.response;
                            200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
                        }, o.open("POST", kr.upload_url, !0), o.send(r)
                    })
                })(e).then(function(e) {
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
                                Mr(), jr([
                                    ["doc", e + "_" + r, "audiomsg"]
                                ], {}, t.peer), Hr(), n()
                            },
                            onFail: function(e) {
                                r(e)
                            },
                            progress: null
                        })
                    }) : Promise.reject()
                }).then(function() {
                    Object(i.Ic)(hr), Sr = !1
                }).catch(function() {
                    Sr = !1, Object(i.Ic)(hr), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
                })
            }
        }

        function Ir() {
            wr(), fr.innerHTML = ur(Cr.duration), Cr.duration >= cr && Ar()
        }

        function Tr() {
            wr(), stManager.add(["voice_message_player.js", "speech.js"], function() {
                Cr || (Cr = Speech.newRecorder(), addEvent(Cr, "progress", Ir)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Cr.record().then(function() {
                    var e;
                    e = _r, kr.isRecording = !0, cancelStackPush("audio_message_cancel", function(e) {
                        e.set(r.l).then(Dr)
                    }.bind(null, e)), hideProgress(geByClass1("im-audio-message-send-wrapper", dr)), show(hr), fr.innerHTML = "0:00", addClass(dr, "im-audio-message_recording"), removeClass(dr, "im-audio-message_recorded"), show(dr), hide(geByClass1("_im_chat_input_parent")), (yr = Speech.createVisualization("wave", Cr.source, mr)).start();
                    var t = mr.getBoundingClientRect();
                    Er = (t.right - t.left) / 3
                }).catch(function(e) {
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
            Cr && Cr.stop(), yr && (yr.destroy(), yr = null)
        }

        function Mr() {
            kr.isRecording = !1, cancelStackFilter("audio_message_cancel")
        }

        function Lr() {
            Br(), xr(Cr)
        }

        function Br() {
            var e;
            AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Cr, "finish", Br), removeEvent(Cr, "finish", Lr), e = URL.createObjectURL(Cr.buffer), domData(vr, "duration", Cr.duration), domData(vr, "ogg", e), domData(vr, "mp3", e), geByClass1("audio-msg-track--duration", vr).innerHTML = ur(Cr.duration), geByClass1("audio-msg-track--wave-wrapper", vr).innerHTML = AudioMessagePlayer.getWave(Cr.wave, Er), removeClass(dr, "im-audio-message_recording"), addClass(dr, "im-audio-message_recorded")
        }

        function Dr() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            Mr(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Cr, "finish", Br), removeEvent(Cr, "finish", Lr), Pr(), Hr(), e && Or()
        }

        function Nr() {
            Cr.isRecording ? (addEvent(Cr, "finish", Lr), removeEvent(Cr, "finish", Br), Pr()) : xr(Cr)
        }

        function Ar() {
            addEvent(Cr, "finish", Br), removeEvent(Cr, "finish", Lr), Pr()
        }

        function Hr() {
            removeClass(dr, "im-audio-message_recorded"), removeClass(dr, "im-audio-message_recording"), hide(dr), show(geByClass1("_im_chat_input_parent"))
        }

        function Rr() {
            ge("audiomsg_record"), vr = ge("audiomsg_player"), dr = geByClass1("im-audio-message-input"), fr = geByClass1("audio-msg-track--duration", dr), mr = geByClass1("audio-msg-track--wave", dr), gr = geByClass1("im-audio-message--cancel-btn", dr), hr = geByClass1("_im_audio_send", dr), br = geByClass1("audio-msg-track--btn", dr), geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
            var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
            addClass(e, "_voice_field_wrap"), addEvent(pr, "click", Tr), addEvent(gr, "click", Dr), addEvent(hr, "click", Nr), addEvent(br, "click", Ar)
        }

        function Fr() {
            ! function() {
                Cr && removeEvent(Cr, "progress", Ir);
                removeEvent(pr, "click", Tr), removeEvent(gr, "click", Dr), removeEvent(hr, "click", Nr), removeEvent(br, "click", Ar)
            }(), vr = dr = fr = mr = pr = gr = hr = br = null
        }

        function qr(e, t, n) {
            return {
                cancelRecording: Dr,
                start: function() {
                    Tr()
                },
                unmount: function() {
                    Dr(!1), Fr()
                }
            }
        }

        function Ur(e, t, n, a, o) {
            return _r = t, kr = t.get().audio_msg, wr = function(e) {
                var t = e.get().peer;
                Object(i.ob)(e, t) && !Object(i.gb)(e) && Date.now() - (Object(i.Z)(e, t).lastTyping || 0) > 1e3 * r.b && e.set(r.mc.bind(null, t))
            }.bind(null, t), jr = n, Or = o, Object(sr.a)(), Object(i.Q)().then(function(e) {
                var n = e.length > 0;
                n ? (Rr(), a()) : setCookie("remixvoice", "0", 7), t.set(r.zc.bind(null, n))
            }).catch(function(e) {
                throw setCookie("remixvoice", "0", 7), e
            }), (0, Object(s.b)(qr).bindMutations)(e, t, n)
        }
        var zr = n("6aSF"),
            Wr = n("nAFc"),
            Kr = n("/PiP"),
            Vr = n("EasH"),
            Qr = n("t7n3"),
            Xr = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };

        function Gr(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function Jr(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function Yr(e, t) {
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
        var Zr = 6217559,
            $r = "vkpay",
            ei = "location",
            ti = "open_app",
            ni = function(e) {
                function t() {
                    var n, r;
                    Gr(this, t);
                    for (var i = arguments.length, a = Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                    return n = r = Jr(this, e.call.apply(e, [this].concat(a))), r.onButtonClick = function() {
                        var e = r.props,
                            t = e.action,
                            n = e.sendMessage,
                            i = e.appHash;
                        switch (t.type) {
                            case $r:
                                t.app_id = Zr;
                            case ti:
                                var a = t.app_id;
                                t.owner_id && (a += "_" + t.owner_id), Object(Kr.B)({
                                    w: "app" + a + encodeURIComponent("#" + t.hash),
                                    from_keyboard: 1,
                                    app_hash: i
                                });
                                break;
                            case ei:
                                cur.sendLocation = function(e, r) {
                                    r(), n({
                                        action: {
                                            label: "",
                                            attaches: [e],
                                            payload: t.payload
                                        }
                                    })
                                }, Object(Vr.b)("al_places.php", {
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
                    }, r.getButtonAppearance = function() {
                        var e = r.props.action.app_id,
                            t = r.props.action.type,
                            n = r.props.color;
                        return n = (n = n.toLowerCase()).replace("default", "secondary"), t === ti && e === Zr && (t = $r), t === $r && (n = "primary"), ["keyboard-button", n, t]
                    }, r.getButtonLabel = function(e) {
                        var t = e.label;
                        switch (e.type) {
                            case ei:
                                t = getLang("mail_keyboard_label_location");
                                break;
                            case $r:
                                t = (t = getLang("mail_keyboard_label_vkpay")).replace(/ VK Pay$/, "");
                                break;
                            default:
                                t = Object(Wr.a)(t || ""), t = Object(Qr.c)(t).replace(/\n(\r)?/gi, " "), t = Emoji.emojiToHTML(t, !0)
                        }
                        return t
                    }, Jr(r, n)
                }
                return Yr(t, e), t.prototype.render = function() {
                    var e = this.props,
                        t = e.action,
                        n = (e.sendMessage, e.appHash, function(e, t) {
                            var n = {};
                            for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                            return n
                        }(e, ["action", "sendMessage", "appHash"])),
                        r = this.getButtonAppearance(),
                        i = this.getButtonLabel(t);
                    return we.createElement(xe.a, Xr({
                        wide: !0,
                        overflow: !0
                    }, n, {
                        type: t.type,
                        appearance: r,
                        onClick: this.onButtonClick,
                        dangerouslySetInnerHTML: {
                            __html: i
                        }
                    }))
                }, t
            }(we.Component),
            ri = Gt(function(e) {
                function t() {
                    return Gr(this, t), Jr(this, e.apply(this, arguments))
                }
                return Yr(t, e), t.prototype.render = function() {
                    var e = this,
                        t = this.props.store,
                        n = Object(a.f)(t),
                        r = t.get().keyboard_app_hash;
                    if (!n || !n.buttons) return null;
                    return we.createElement("div", {
                        className: Object(Se.a)("Keyboard", {
                            "Keyboard--hidden": n.hide
                        })
                    }, we.createElement(zr.a, {
                        className: "Keyboard__scroll-wrapper"
                    }, we.createElement("div", {
                        className: "Keyboard__container"
                    }, n.buttons.map(function(t, n) {
                        return we.createElement("div", {
                            key: "row-" + n,
                            className: "Keyboard__row"
                        }, t.map(function(n, i) {
                            return we.createElement("div", {
                                className: "Keyboard__button",
                                key: "row-" + i,
                                style: {
                                    width: (a = t.length, "calc(100% / " + a + " - 10px)")
                                }
                            }, we.createElement(ni, Xr({
                                sendMessage: e.props.send,
                                appHash: r
                            }, n)));
                            var a
                        }))
                    }))))
                }, t
            }(we.Component));

        function ii() {
            return document.getElementById("_im_keyboard_container")
        }

        function ai(e, t, n) {
            return {
                init: function() {
                    var e = this;
                    return new Promise(function(r) {
                        e.isMounted = !0,
                            function(e, t, n) {
                                var r = ii();
                                if (r) {
                                    var i = we.createElement(Xt, {
                                        value: e
                                    }, we.createElement(ri, {
                                        send: t
                                    }));
                                    ke.render(i, r, n)
                                }
                            }(t, n, r)
                    })
                },
                toggle: function(e, n, i) {
                    return t.set(r.Kc.bind(null, e, n, i))
                },
                unmount: function() {
                    var t = ii();
                    t && this.isMounted && ke.unmountComponentAtNode(t), this.isMounted = !1, Object(s.c)(e)
                }
            }
        }
        var oi = Ce.a.getLang,
            si = Gt(function(e) {
                function t() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                    var a = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call.apply(e, [this].concat(r)));
                    return a.elementOnClick = function(e, t) {
                        t.preventDefault(), t.stopPropagation(), a.props.applyTemplate(e), a.toggleDropdown(!1)
                    }, a.toggleDropdown = function(e) {
                        a.setState({
                            isShowDropDown: e
                        })
                    }, a.state = {
                        isShowDropDown: !1
                    }, a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.render = function() {
                    var e = this,
                        t = this.props,
                        n = t.getTemplates,
                        r = t.showSettingsPopup,
                        i = t.showCreatingTemplatePopup,
                        a = t.isNeededRendering,
                        o = this.state.isShowDropDown;
                    if (!a()) return null;
                    var s = n();
                    return we.createElement("div", {
                        className: "TemplatesDropDown",
                        onMouseOver: this.toggleDropdown.bind(this, !0),
                        onMouseOut: this.toggleDropdown.bind(this, !1)
                    }, we.createElement("div", {
                        className: Object(Se.a)("TemplatesDropDown__wrapper", {
                            "TemplatesDropDown__wrapper--show": o
                        }),
                        "aria-hidden": o
                    }, we.createElement("div", {
                        className: "TemplatesDropDown__container"
                    }, we.createElement(zr.a, {
                        className: "TemplatesDropDown__scroll-wrapper"
                    }, we.createElement("div", null, " ", we.createElement("header", {
                        className: "TemplatesDropDown__header"
                    }, we.createElement("h2", {
                        className: "TemplatesDropDown__title"
                    }, oi("mail_community_templates")), we.createElement("a", {
                        role: "button",
                        className: "TemplatesDropDown__setting-button",
                        onClick: r
                    }, oi("mail_settings_configure"))), s.length ? we.createElement("ul", {
                        className: "TemplatesDropDown__list"
                    }, s.map(function(t) {
                        return we.createElement("li", {
                            key: t.id,
                            className: "TemplatesDropDown__item",
                            onMouseDown: e.elementOnClick.bind(null, t.id)
                        }, we.createElement("h3", {
                            className: "TemplatesDropDown__item-name",
                            dangerouslySetInnerHTML: {
                                __html: t.name
                            }
                        }), we.createElement("div", {
                            className: "TemplatesDropDown__item-content",
                            dangerouslySetInnerHTML: {
                                __html: t.text
                            }
                        }))
                    })) : we.createElement("div", {
                        className: "TemplatesDropDown__not-found-container"
                    }, we.createElement("span", null, oi("mail_community_templates_not_found")), we.createElement(Ne.a, {
                        onClick: i
                    }, oi("mail_add_community_template"))))))), we.createElement("button", {
                        className: "TemplatesDropDown__icon"
                    }))
                }, t
            }(we.Component)),
            ci = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };

        function li(e, t) {
            var n = !!window.getSelection && window.getSelection(),
                r = !1;
            if (n && n.rangeCount) {
                var i = n.getRangeAt(0);
                r = i.commonAncestorContainer ? i.commonAncestorContainer : i.parentElement ? i.parentElement() : i.item(0)
            }
            for (var a = r; a && a != e;) a = a.parentNode;
            a || Emoji.editableFocus(e, !1, !0), Emoji.insertHTML(t)
        }
        var ui = function(e) {
            function t() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                var a = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call.apply(e, [this].concat(r)));
                return a.onChange = function() {
                    a.props.onChange && a.props.onChange(Emoji.val(a.container))
                }, a.containerRef = we.createRef(), a.state = {
                    value: a.props.initialValue
                }, a
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                if (this.container = this.containerRef.current, this.container && !this.isMount) {
                    this.isMount = !0;
                    var e = this.props.initialValue;
                    Emoji.val(this.container, Emoji.emojiToHTML(e)), Emoji.init(this.container, {
                        noStickers: !0,
                        onSend: function() {},
                        ctrlSend: function() {
                            return !0
                        },
                        onChange: this.onChange,
                        noLineBreaks: !this.props.isMultiLine
                    })
                }
            }, t.prototype.componentWillUnmount = function() {
                this.container && this.isMount && (this.isMount = !1)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.tabIndex,
                    n = e.isMultiLine,
                    r = (e.initialValue, function(e, t) {
                        var n = {};
                        for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                        return n
                    }(e, ["tabIndex", "isMultiLine", "initialValue"]));
                return we.createElement("div", ci({
                    role: "textbox",
                    ref: this.containerRef,
                    tabIndex: t,
                    contentEditable: !0,
                    "aria-multiline": n
                }, r))
            }, t
        }(we.Component);
        ui.defaultProps = {
            isMultiLine: !1,
            tabIndex: 0,
            initialValue: ""
        };
        var di = ui,
            fi = Ce.a.getLang,
            mi = function() {
                return [{
                    id: "user name",
                    label: fi("mail_community_templates_hint_name"),
                    process: function(e) {
                        return Object(B.c)(e, Object(a.o)(e)).first_name
                    }
                }, {
                    id: "user surname",
                    label: fi("mail_community_templates_hint_last_name"),
                    process: function(e) {
                        var t = Object(B.c)(e, Object(a.o)(e));
                        return t.name.replace(t.first_name, "").trim()
                    }
                }, {
                    id: "admin name",
                    label: fi("mail_community_templates_hint_your_name"),
                    process: function(e) {
                        return Object(B.c)(e, vk.id).first_name
                    }
                }, {
                    id: "admin surname",
                    label: fi("mail_community_templates_hint_your_last_name"),
                    process: function(e) {
                        var t = Object(B.c)(e, vk.id);
                        return t.name.replace(t.first_name, "").trim()
                    }
                }, {
                    id: "community",
                    label: fi("mail_community_templates_hint_community"),
                    process: function(e) {
                        return Object(B.c)(e, e.get().id).name
                    }
                }, {
                    id: "greeting",
                    label: fi("mail_community_templates_hint_greeting"),
                    process: function(e) {
                        var t = (new Date).getHours();
                        return fi(t >= 3 && t < 12 ? "mail_greeting_good_morning" : t >= 12 && t < 17 ? "mail_greeting_good_afternoon" : t >= 17 && t <= 23 ? "mail_greeting_good_evening" : "mail_greeting_good_night")
                    }
                }]
            };
        var pi = Ce.a.getLang,
            gi = "main",
            hi = "edit",
            bi = function(e) {
                function t() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                    var o = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call.apply(e, [this].concat(i)));
                    return o.setEditableMessage = function(e) {
                        var t = e.id,
                            n = e.name,
                            r = e.text;
                        return new Promise(function(e) {
                            return o.setState({
                                editableMessage: {
                                    id: t,
                                    name: n,
                                    text: r
                                }
                            }, e)
                        })
                    }, o.onChangeEditableMessage = function(e, t) {
                        return o.setEditableMessage(Object.assign({}, o.state.editableMessage, function(e, t, n) {
                            return t in e ? Object.defineProperty(e, t, {
                                value: n,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : e[t] = n, e
                        }({}, e, Object(Wr.c)(t))))
                    }, o.deleteTemplate = function(e) {
                        return Promise.resolve().then(function() {
                            return o.state.section !== gi ? o.go(gi) : Promise.resolve()
                        }).then(function() {
                            return o.props.store.set(r.A.bind(null, e))
                        }).catch(function() {
                            showFastBox(pi("mail_error"), pi("mail_community_templates_delete_error"))
                        })
                    }, o.saveTemplate = function(e) {
                        e.preventDefault();
                        var t = o.state.editableMessage,
                            n = t.name,
                            r = t.text;
                        n.length > 200 || n.length < 2 || n.length > 2e3 || r.length < 5 ? showFastBox(pi("mail_error"), pi("mail_form_is_filled_in_incorrectly")) : o.props.saveTemplate(t).catch(function() {
                            showFastBox(pi("mail_error"), pi("mail_community_templates_save_error"))
                        }).then(function() {
                            return o.go(gi)
                        })
                    }, o.addHint = function(e, t) {
                        t.preventDefault();
                        var n = o.state.editableMessage,
                            r = n.id,
                            i = void 0 === r ? null : r,
                            a = n.name,
                            s = n.text;
                        return li(o.textarea, "{" + e.id + "}"), o.setEditableMessage({
                            id: i,
                            name: a,
                            text: s + "{" + e.id + "} "
                        })
                    }, o.getTextAreaRef = function(e) {
                        o.textarea = (e || {}).container
                    }, o.state = {
                        section: o.props.section,
                        editableMessage: {
                            id: null,
                            name: "",
                            text: ""
                        }
                    }, o
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.go = function(e) {
                    var t = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = n.id,
                        i = void 0 === r ? null : r,
                        a = n.name,
                        o = void 0 === a ? "" : a,
                        s = n.text,
                        c = void 0 === s ? "" : s;
                    return new Promise(function(n) {
                        t.state.section !== e ? t.setState({
                            section: e,
                            editableMessage: {
                                id: i,
                                name: o,
                                text: c
                            }
                        }, function() {
                            t.props.popup.updateBoxCoords(), n()
                        }) : n()
                    })
                }, t.prototype.render = function() {
                    var e = this,
                        t = this.props,
                        n = t.getTemplates,
                        r = t.closePopup,
                        i = this.state,
                        a = i.section,
                        o = i.editableMessage,
                        s = n();
                    return we.createElement("section", {
                        className: "TemplatesSettings"
                    }, we.createElement(Ee, {
                        title: we.createElement("span", {
                            className: "TemplatesSettings__title"
                        }, a === gi && pi("mail_community_templates"), a === hi && pi("mail_add_community_template")),
                        onCloseClick: r
                    }), we.createElement("main", {
                        className: "TemplatesSettings__content"
                    }, a === gi && (s.length ? we.createElement(zr.a, {
                        className: "TemplatesSettings__scroll-wrapper"
                    }, we.createElement("div", {
                        className: "TemplatesSettings__list"
                    }, s.map(function(t) {
                        return we.createElement("section", {
                            key: t.id,
                            className: "TemplatesSettings__item"
                        }, we.createElement("h3", {
                            className: "TemplatesSettings__item-name",
                            dangerouslySetInnerHTML: {
                                __html: t.name
                            }
                        }), we.createElement("div", {
                            className: "TemplatesSettings__item-content",
                            dangerouslySetInnerHTML: {
                                __html: t.text
                            }
                        }), we.createElement("div", {
                            className: "TemplatesSettings__buttons-row"
                        }, we.createElement(Ne.a, {
                            onClick: function() {
                                return e.go(hi, t)
                            },
                            className: "TemplatesSettings__item-button"
                        }, pi("mail_settings_edit")), we.createElement("span", {
                            className: "TemplatesSettings__buttons-splitter",
                            "aria-hidden": "true"
                        }, " · "), we.createElement(Ne.a, {
                            onClick: e.deleteTemplate.bind(null, t.id),
                            className: "TemplatesSettings__item-button"
                        }, pi("mail_delete"))))
                    }))) : we.createElement("div", {
                        className: "TemplatesSettings__not-found-container"
                    }, we.createElement("span", null, pi("mail_community_templates_not_found")), we.createElement(Ne.a, {
                        onClick: function() {
                            return e.go(hi)
                        }
                    }, pi("mail_add_community_template")))), a === hi && we.createElement("form", {
                        className: "TemplatesSettings__form",
                        id: "create_template_form",
                        onSubmit: this.saveTemplate
                    }, we.createElement("div", {
                        className: "TemplatesSettings__form-row"
                    }, we.createElement("label", {
                        className: "TemplatesSettings__label",
                        htmlFor: "name"
                    }, pi("mail_name"), ":"), we.createElement("div", {
                        className: "TemplatesSettings__input-container"
                    }, we.createElement(di, {
                        id: "name",
                        type: "text",
                        initialValue: o.name,
                        className: "TemplatesSettings__input",
                        onChange: this.onChangeEditableMessage.bind(null, "name")
                    }), we.createElement("span", {
                        className: "TemplatesSettings__notice"
                    }, pi("mail_community_templates_input_size").replace("{min}", 2).replace("{max}", "200")))), we.createElement("div", {
                        className: "TemplatesSettings__form-row"
                    }, we.createElement("label", {
                        className: "TemplatesSettings__label",
                        htmlFor: "text"
                    }, pi("mail_text"), ":"), we.createElement("div", {
                        className: "TemplatesSettings__input-container"
                    }, we.createElement(di, {
                        id: "text",
                        name: "text",
                        isMultiLine: !0,
                        ref: this.getTextAreaRef,
                        initialValue: o.text,
                        className: "TemplatesSettings__textarea",
                        onChange: this.onChangeEditableMessage.bind(null, "text")
                    }), we.createElement("span", {
                        className: "TemplatesSettings__notice"
                    }, pi("mail_community_templates_input_size").replace("{min}", 5).replace("{max}", "2 000")))), we.createElement("div", {
                        className: "TemplatesSettings__form-row"
                    }, we.createElement("label", {
                        className: "TemplatesSettings__label"
                    }, pi("mail_hints"), ":"), we.createElement("div", {
                        className: "TemplatesSettings__input-container"
                    }, mi().map(function(t) {
                        return we.createElement(xe.a, {
                            type: "button",
                            onMouseDown: e.addHint.bind(null, t),
                            appearance: "secondary",
                            className: "TemplatesSettings__hint",
                            key: t.id
                        }, t.label)
                    }))))), we.createElement("footer", {
                        className: "TemplatesSettings__footer"
                    }, a === gi && we.createElement(we.Fragment, null, we.createElement(Ne.a, {
                        onClick: function() {
                            return e.go(hi)
                        }
                    }, pi("mail_add_community_template")), we.createElement(xe.a, {
                        onClick: r
                    }, pi("mail_close"))), a === hi && we.createElement(we.Fragment, null, we.createElement("div", null, o.id && we.createElement(Ne.a, {
                        onClick: this.deleteTemplate.bind(null, o.id)
                    }, pi("mail_delete_community_template"))), we.createElement("div", null, we.createElement(xe.a, {
                        appearance: "tertiary",
                        onClick: function() {
                            return e.go(gi)
                        }
                    }, pi("mail_cancel")), we.createElement(xe.a, {
                        onClick: this.saveTemplate,
                        form: "create_template_form",
                        type: "submit"
                    }, pi("mail_save"))))))
                }, t
            }(we.Component);
        bi.defaultProps = {
            section: gi
        };
        var _i = Gt(bi),
            vi = window.MessageBox;

        function yi(e, t) {
            return mi().reduce(function(t, n) {
                return t.replace(new RegExp("({" + n.id + "})", "gi"), n.process(e))
            }, t).replace(/&lt;br&gt;/gi, "<br>")
        }

        function ji(e, t, n, i, o) {
            var s = void 0;
            return {
                closeSettingsPopup: function() {
                    s && s.hide()
                },
                showSettingsPopup: function(e) {
                    var n = this;
                    (s = new vi({
                        hideButtons: !0,
                        bodyStyle: "padding: 0; background: none;",
                        width: 500,
                        onShow: function() {
                            var r = document.getElementById("TemplatesSettings");
                            r && ke.render(we.createElement(Xt, {
                                value: t
                            }, we.createElement(_i, {
                                popup: s,
                                section: e,
                                getTemplates: function() {
                                    return Object(a.v)(t)
                                },
                                saveTemplate: n.saveTemplate.bind(n),
                                deleteTemplate: n.deleteTemplate.bind(n),
                                closePopup: n.closeSettingsPopup.bind(n)
                            })), r), requestAnimationFrame(function() {
                                return s.updateBoxCoords()
                            })
                        }
                    }).content('<div id="TemplatesSettings"></div>')).show()
                },
                applyTemplate: function(e) {
                    var n = Object(a.v)(t).find(function(t) {
                        return t.id === e
                    });
                    Object(ye.d)(t, n.id), i(yi(t, Object(Wr.d)(n.text)))
                },
                getPreparedTemplates: function() {
                    return Object(a.v)(t).map(function(e) {
                        return Object.assign({}, e, {
                            name: e.name,
                            text: yi(t, e.text)
                        })
                    })
                },
                saveTemplate: function(e) {
                    var n = Object(Wr.a)(e.name),
                        i = Object(Wr.a)(e.text);
                    return t.set(e.id ? r.ed.bind(null, e.id, n, i) : r.x.bind(null, n, i))
                },
                deleteTemplate: function(e) {
                    return t.set(r.A.bind(null, e))
                },
                isNeedRenderTemplates: function() {
                    return !!Object(a.o)(t) && (!!Object(a.B)(t) && !(Object(a.o)(t) > 2e9 && Object(D.m)(Object(a.g)(t), 1024)))
                },
                toggleImText: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.isNeedRenderTemplates();
                    o(e)
                },
                update: function() {
                    this.toggleImText()
                },
                unmount: function() {
                    this.toggleImText(!1)
                }
            }
        }

        function Oi(e, t) {
            return t.queues[e].currEv = !1, Promise.resolve(t)
        }

        function wi(e, t) {
            var n = t.queues[e].currEv;
            return n ? (t.queues[e].errored.push(n), Oi(e, t)) : Promise.resolve(t)
        }

        function ki(e, t, n) {
            return n.queues[e] ? (n.queues[e].errored = t ? [] : n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], Oi(e, n)) : Promise.resolve(n)
        }

        function Ci(e, t, n, r) {
            var i = r.get().queues[e];
            if (i && !i.currEv && i.evs.length > 0 && !i.pause) {
                var a = Ci.bind(null, e, t, n, r),
                    o = i.evs.shift();
                i.currEv = o, t(e, o).then(function() {
                    r.get().opts.waitCommit || r.set(Oi.bind(null, e))
                }).then(a).catch(function(t) {
                    return r.set(wi.bind(null, e)).then(function() {
                        n(e, function(e, t) {
                            var n = Si(e, t.get()).errored;
                            return n.length > 0 && n[n.length - 1]
                        }(e, r), t)
                    }).then(a)
                })
            }
        }

        function Si(e, t) {
            return t.queues[e] || (t.queues[e] = {
                evs: [],
                pause: !1,
                errored: [],
                currEv: !1
            }), t.queues[e]
        }

        function Ei(e, t, n) {
            return Si(e, n).pause = t, Promise.resolve(n)
        }

        function xi(e) {
            Object.keys(e.get().queues).forEach(function(t) {
                e.set(wi.bind(null, t)), e.set(ki.bind(null, t, !1))
            })
        }

        function Ii(e, t, n) {
            var r = g({
                queues: {},
                debug: n && n.debug,
                opts: extend({}, n)
            }, n);
            return n && n.store ? (r.setState(function(e) {
                for (var t = {}, n = Object.keys(e.queues), r = n.length, i = 0; i < r; i++) {
                    var a = n[i],
                        o = e.queues[a];
                    (o.currEv || o.evs.length || o.errored.length) && (t[a] = o)
                }
                return {
                    queues: t,
                    opts: e.opts
                }
            }(r.get())), xi(r)) : xi(r), {
                pushMessage: function(n, i) {
                    return r.set(function(e, t, n) {
                        return t.ts = Date.now(), Si(e, n).evs.push(t), Promise.resolve(n)
                    }.bind(null, n, i)).then(function(r) {
                        Ci(n, e, t, r)
                    })
                },
                resend: function(n, i) {
                    return r.set(function(e, t, n) {
                        var r = n.queues[e];
                        return r.errored.filter(function(e) {
                            return e.mess.messageId === t
                        }).forEach(function(e) {
                            e.failed = !1, r.evs.push(e)
                        }), r.errored = r.errored.filter(function(e) {
                            return e.mess.messageId !== t
                        }), Promise.resolve(n)
                    }.bind(null, n, i)).then(function(a) {
                        var o = r.get().queues[n].evs.filter(function(e) {
                            return e.mess.messageId === i
                        })[0];
                        return Ci(n, e, t, r), o
                    })
                },
                reset: function(n) {
                    return r.set(ki.bind(null, n, !0)).then(function(r) {
                        Ci(n, e, t, r)
                    })
                },
                setErrored: function(e, t) {
                    return r.set(function(n) {
                        return Si(e, n).errored = t, Promise.resolve(n)
                    })
                },
                pause: function(e) {
                    r.set(Ei.bind(null, e, !0))
                },
                isPaused: function(e) {
                    return !!Si(e, r.get()).pause
                },
                complete: function(n, i) {
                    var a = r.get();
                    a.queues[n].currEv && a.queues[n].currEv.rid === i && r.set(Oi.bind(null, n)).then(function() {
                        Ci(n, e, t, r)
                    })
                },
                resume: function(n) {
                    r.set(Ei.bind(null, n, !1)).then(Object(ft.c)(.1)).then(function() {
                        Ci(n, e, t, r)
                    })
                },
                inspectQueue: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (!r.get().queues[e]) return [];
                    var n = r.get().queues[e];
                    return (t && n.currEv ? [n.currEv] : []).concat(n.evs.slice()).concat(n.errored.slice().map(function(e) {
                        return extend({}, e, {
                            failed: !0
                        })
                    })).sort(function(e, t) {
                        return e.ts - t.ts
                    })
                }
            }
        }
        var Ti = n("hOuX"),
            Pi = n("rCUf"),
            Mi = "_im_upload_dropbox",
            Li = "jpg jpeg png gif heic heif".split(" "),
            Bi = ["application/vnd.rn-realmedia-vbr", "application/vnd.rn-realmedia"];

        function Di(e) {
            var t = Li.slice(0, Li.length);
            if ("types" === e) {
                for (var n = t.length, r = 0; r < n; ++r) t.push(t[r].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + Li.join(",.") : "mask" === e ? Li.join("|") : ""
        }

        function Ni(e, t, n) {
            var r = void 0 !== t.ind ? t.ind : t,
                i = t.fileName ? r + "_" + t.fileName : t;
            if (re("upload" + i + "_progress_wrap"), e().unchoose(i), !geByClass1("popup_box_container")) {
                var a = getLang("mail_add_doc_error");
                "photo" === Upload.options[r].file_name ? a = getLang("mail_add_photo_error") : "video_file" === Upload.options[r].file_name && (a = getLang("video_upload_error")), setTimeout(showFastBox({
                    title: getLang("global_error")
                }, a).hide, 2e3)
            }
            topError("Upload failed", {
                dt: -1,
                type: 102,
                url: (ge("file_uploader_form" + r) || {}).action
            }), Upload.embed(r)
        }

        function Ai(e) {
            var t = void 0 !== e.ind ? e.ind : e,
                n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                r = n ? t + "_" + n : e,
                i = ge("upload" + r + "_progress_wrap");
            return i && hide(geByClass1("progress_x", i)), r
        }

        function Hi(e, t) {
            if (!e().canAddMedia()) return "none";
            if (!t.items || !t.items.length) return "media";
            var n = "^(" + Di("mask") + ")";
            return [].slice.call(t.items).every(function(e) {
                var t = e.type.split("/");
                return new RegExp(n, "i").test(t[1])
            }) ? "photo" : [].slice.call(t.items).every(function(e) {
                return "video" === e.type.split("/")[0] || ~Bi.indexOf(e.type)
            }) ? "video" : "doc"
        }

        function Ri(e) {
            var t = geByClass1(Mi),
                n = geByClass1("im-page--chat-header").getBoundingClientRect(),
                r = geByClass1("im-chat-input").getBoundingClientRect();
            (n.width < 10 || r.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = r.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
        }

        function Fi() {
            var e = geByClass1(Mi);
            hide(e)
        }

        function qi(e, t, n) {
            return {
                loaded: t,
                total: n,
                fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
            }
        }

        function Ui(e, t, n, r) {
            "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e), r().reHeight(n)
        }

        function zi(e, t, n, r) {
            var i = t.get().upload_opts,
                a = geByClass1("_im_upload_photo"),
                o = geByClass1("_im_drop_photo");
            return Upload.init(a, i.url, i.params, {
                accept: Di("accept"),
                file_name: "photo",
                file_size_limit: 26214400,
                file_types: Di("types"),
                file_match: i.opts.ext_re,
                lang: i.opts.lang,
                multiple: 1,
                multi_progress: 1,
                max_files: 10,
                chooseBox: 1,
                clear: 1,
                type: "photo",
                max_attempts: 3,
                server: i.opts.server,
                error: i.opts.default_error,
                error_hash: i.opts.error_hash,
                dropbox: o,
                dragEl: bodyNode,
                onNoFilteredCallback: function(e) {
                    Upload.onFileApiSend(r, e)
                },
                onUploadStart: function(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete: function(e, r) {
                    var i = window.parseJSON(r);
                    i.photos ? function(e, t, n, r) {
                        var i = Ai(e);
                        ajax.post("al_photos.php", extend({
                            act: "choose_uploaded"
                        }, t), {
                            onDone: function(e, t) {
                                r().choose("photo", e, extend(t, {
                                    upload_ind: i
                                }))
                            },
                            onFail: Ni.bind(null, r, e)
                        })
                    }(e, i, 0, n) : Ui(e, r, t, n)
                },
                onUploadProgress: function(e, t, r) {
                    var i = void 0 !== e.ind ? e.ind : e;
                    n().progress("photo", i, qi(e, t, r))
                },
                onUploadError: function(e, t) {
                    statlogsValueEvent("upload_photo_fails", 1, i.opts.server, t), Ni(n, e)
                },
                onDragEnter: function(e) {
                    var t = geByClass1("im-audio-message_recording");
                    e.dataTransfer && !t && Ri(Hi(n, e.dataTransfer))
                },
                onDragOut: function() {
                    Fi()
                },
                onDrop: function() {
                    Fi()
                }
            })
        }

        function Wi(e, t, n) {
            var r = t.get().upload_doc_opts,
                i = geByClass1("_im_upload_doc"),
                a = geByClass1("_im_drop_doc");
            return Upload.init(i, r.url, r.params, {
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
                dropbox: a,
                dragEl: bodyNode,
                onUploadStart: function(e, t) {
                    delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                },
                onUploadComplete: function(e, i) {
                    var a = window.parseJSON(i);
                    a.file ? function(e, t, n, r) {
                        var i = Ai(e),
                            a = {
                                act: "a_save_doc",
                                from: "choose",
                                mail_add: 1
                            };
                        n.opts.imhash && (a = extend(a, {
                            from_place: "from_gim",
                            imhash: n.opts.imhash
                        })), ajax.post("docs.php", extend(a, t), {
                            onDone: function(e, t, n) {
                                r().choose("doc", e + "_" + t, extend(n, {
                                    upload_ind: i
                                }))
                            },
                            onFail: Ni.bind(null, r, e)
                        })
                    }(e, a, r, n) : Ui(e, i, t, n)
                },
                onUploadProgress: function(e, t, r) {
                    var i = void 0 !== e.ind ? e.ind : e;
                    n().progress("doc", i, qi(e, t, r))
                },
                onUploadError: function(e, t) {
                    statlogsValueEvent("upload_doc_fails", 1, r.opts.server, t), Ni(n, e)
                }
            })
        }

        function Ki(e, t, n) {
            removeEvent(bodyNode, "dragover dragenter");
            var i = Wi(0, t, n),
                a = function(e, t, n, i) {
                    var a = t.get().upload_video_params;
                    if (a) {
                        var o = geByClass1("_im_upload_video"),
                            s = geByClass1("_im_drop_video");
                        return a.options.visible_dropbox = !1, Object(Pi.b)(o, s, a, null, {
                            onUploadStart: function(e, t) {
                                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
                            },
                            onUploadComplete: function(e, i) {
                                var a = window.parseJSON(i);
                                a.video_id ? Object(Pi.d)(e, a, t.get().textMediaSelector, function(e, n) {
                                    var i = document.querySelector('[data-video="' + n + '"]'),
                                        a = e.editable.sizes.x[0] || e.thumb;
                                    if (i && a) {
                                        i.style.backgroundImage = "url(" + a + ")";
                                        var o = gpeByClass("_im_mess", i);
                                        "im" === cur.module && o && Object(r.gd)(t, o)
                                    }
                                }) : Ui(e, i, t, n)
                            },
                            onUploadProgress: function(e, t, r) {
                                var i = void 0 !== e.ind ? e.ind : e;
                                n().progress("video", i, qi(e, t, r))
                            },
                            onUploadError: function(e, t) {
                                statlogsValueEvent("upload_video_fails", 1, a.options.server, t), Ni(n, e)
                            },
                            onNoFilteredCallback: function(e) {
                                Upload.onFileApiSend(i, e)
                            },
                            onDragEnter: function(e) {
                                var t = geByClass1("im-audio-message_recording");
                                e.dataTransfer && !t && Ri(Hi(n, e.dataTransfer))
                            },
                            onDragOut: function() {
                                Fi()
                            },
                            onDrop: function() {
                                Fi()
                            }
                        })
                    }
                }(0, t, n, i),
                o = zi(0, t, n, a);
            cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
            var c = Object(s.a)({
                handlers: function(e) {
                    var t = ge("im_full_upload");
                    e(t, "change", function r(i) {
                        if (window.Upload && i.target.files) {
                            if (n().canAddMedia()) {
                                var l = Array.from(i.target.files),
                                    u = l.filter(function(e) {
                                        return Upload.checkFileType(e.name, Di("types"))
                                    }),
                                    d = l.filter(function(e) {
                                        return Upload.checkFileType(e.name, Object(Pi.c)("types"))
                                    });
                                Upload.onFileApiSend(o, u), Upload.onFileApiSend(a, d)
                            } else showFastBox(getLang("global_error"), getLang("global_error"));
                            Object(s.c)(c);
                            var f = t.cloneNode();
                            t.parentNode.replaceChild(f, t), e(t = f, "change", r)
                        }
                    })
                }
            });
            return {
                paste: function(e) {
                    Upload.onFileApiSend(o, e)
                },
                unmount: function() {
                    Object(s.c)(c), Upload.deinit(o), Upload.deinit(a), Upload.deinit(i)
                }
            }
        }
        var Vi = n("wSs/"),
            Qi = n("eTng");
        var Xi = 4,
            Gi = 5,
            Ji = 6,
            Yi = 7,
            Zi = 9,
            $i = 11,
            ea = 12,
            ta = 13,
            na = 14,
            ra = 16,
            ia = 19,
            aa = 20,
            oa = 23,
            sa = 2e3,
            ca = "_im_media_selector",
            la = "_im_media_fwd",
            ua = "_im_replied_content",
            da = "_im_fwd_close",
            fa = "_im_remove_replied",
            ma = "_im_peer_mute_unmute",
            pa = "_im_peer_return_to_chat",
            ga = "_mr_button_accept",
            ha = "_mr_button_reject",
            ba = "_im_submit_btn",
            _a = "_im_media_preview",
            va = "_im_chat_audio_input_parent";

        function ya(e, t) {
            if (!e) return !1;
            window.tooltips && tooltips.hide(e, t)
        }

        function ja(e, t, n, r, a, o) {
            var s = !(arguments.length > 6 && void 0 !== arguments[6]) || arguments[6];
            if (za(t, r)) return Promise.resolve(!1);
            var l = xa(r);
            l.getBoundAttach(n.message) && (n.message = ""), n.share_url = l.getShareUrl(), n.cancelled_shares = l.getCancelledShares();
            var u, d = Object(Ti.a)(),
                f = {
                    peerId: t,
                    messageId: "rid" + d,
                    flags: c.m,
                    date: intval(Date.now() / 1e3) - r.get().timeshift,
                    subject: "",
                    text: Object(i.fc)(clean(n.message)).replace(/\n/gi, "<br>"),
                    local: !0,
                    kludges: {
                        emoji: !0,
                        from_admin: r.get().gid ? vk.id : null
                    },
                    type: c.a,
                    attaches: (u = n.attaches, u.map(function(e) {
                        return {
                            id: e[1],
                            type: e[0],
                            kind: e[2] || null
                        }
                    }))
                };
            return n.rid = d, n.mess = f, e(t, n), r.get().longpoll.push([f]), s && o().clearText(t, r), a().newMessage(r), Promise.resolve(!0)
        }

        function Oa(e, t, n, r, i, a, o) {
            var s = arguments.length > 7 && void 0 !== arguments[7] && arguments[7];
            s || (s = e.get().peer);
            var c = xa(e),
                l = wa(c, o),
                u = l ? c.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }) : [],
                d = {
                    message: "",
                    attaches: [].concat(u, a)
                };
            o && extend(d, o), ka(e, t, !1).then(function() {
                return ja(n, s, d, e, t, r, !1).then(function(n) {
                    return l && Da(e, i, t), Promise.resolve(n)
                })
            }).catch(function(t) {
                debugLog(t), Ea(e, i)
            })
        }

        function wa(e, t) {
            var n = e.dData,
                r = t && t.sticker_referrer,
                i = r && 0 === r.indexOf("suggestion");
            return (!n.txt.trim() || i) && 0 === n.attaches.filter(function(e) {
                return "reply" !== e.type
            }).length
        }

        function ka(e, t, n) {
            return e.get().tabs[e.get().peer].skipped > 0 ? (t().loadingPeer(e), e.setState({
                no_moving_down: !0
            }), e.set(r.p.bind(null, e.get().peer, !1, !1)).then(function() {
                return e.set(r.sb.bind(null, e.get().peer, !0, -1, !1))
            }).then(function() {
                return t().changePeer(e, !1), e.setState({
                    no_moving_down: !1
                }), n
            })) : Promise.resolve(n)
        }

        function Ca(e, t, n, i) {
            return !e.get().delayed_ts && setTimeout(function() {
                e.set(r.tc.bind(null, !1, !1)).then(function() {
                    n.apply(void 0, function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                            return n
                        }
                        return Array.from(e)
                    }(i))
                })
            }, t)
        }

        function Sa() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getLang("mail_send_error"),
                t = getLang("global_error");
            showFastBox({
                title: t
            }, e, getLang("mail_ok"), function() {
                nav.reload({
                    force: !0
                })
            })
        }

        function Ea(e, t) {
            document.activeElement && document.activeElement.blur(), Sa();
            var n = geByClass1("_im_send", t);
            return e.set(r.Mc.bind(null, !0)).then(function() {
                Object(i.Ib)(n)
            })
        }

        function xa(e) {
            return e.get().tfdraft || new on.a
        }

        function Ia(e, t, n, o, s, c) {
            var l = arguments,
                u = Object(a.o)(e),
                d = Object(a.f)(e) || {},
                f = d.one_time,
                m = void 0 !== f && f,
                p = d.author_id,
                g = geByClass1("_im_send", o);
            return Promise.resolve().then(function() {
                if (Object(a.N)(e)) {
                    if (Object(r.V)(e.get()) || !Object(i.ob)(e, e.get().peer)) {
                        var o = Ca(e, sa, Ia, Object(h.q)(l));
                        return e.set(r.tc.bind(null, !0, o)).then(function() {
                            Object(i.Ib)(g)
                        })
                    }
                    return clearTimeout(e.get().delayed_ts), e.set(r.tc.bind(null, !1, !1)).then(function() {
                        return Object(i.Ic)(g)
                    }).then(ka.bind(null, e, t)).then(function() {
                        var r = c.action || {},
                            a = r.attaches || [],
                            o = Object(Wr.a)(r.payload || ""),
                            l = Object(Wr.a)(r.label || "");
                        Object(i.hb)(u) && (l = "@" + Object(B.c)(e, p).link.slice(1) + " " + l);
                        return Object(L.c)("message_send_from_keyboard", 0, e.get().id, u, p), ja(n, u, {
                            message: l,
                            attaches: a,
                            payload: o
                        }, e, t, s, !1)
                    }).then(function() {
                        return m ? e.set(r.z.bind(null, u)) : Promise.resolve()
                    }).then(function() {
                        return s().fixKeyboard()
                    })
                }
            }).catch(function(t) {
                debugLog(t), Ea(e, o)
            })
        }

        function Ta(e, t, n, o, s, l) {
            var u = arguments,
                d = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
            return Promise.resolve().then(function() {
                var f = geByClass1("_im_send", o);
                if (!Object(a.N)(e)) return !1;
                if (Object(r.V)(e.get()) || !Object(i.ob)(e, e.get().peer)) {
                    var m = Ca(e, sa, Ta, Object(h.q)(u));
                    return e.set(r.tc.bind(null, !0, m)).then(function() {
                        Object(i.Ib)(f)
                    })
                }
                clearTimeout(e.get().delayed_ts), s().saveText(e);
                var p = !1,
                    g = xa(e),
                    b = g.dData.attaches.map(function(e) {
                        if ("poll" == e.type) {
                            var t = l.pollData();
                            return t || (p = !0), [e.type, e.id, t]
                        }
                        return [e.type, e.id]
                    }).concat(d);
                if (p) return !1;
                var _ = e.set(r.tc.bind(null, !1, !1)).then(function() {
                        Object(i.Ic)(f)
                    }),
                    v = Object(a.o)(e);
                return _.then(ka.bind(null, e, t)).then(function() {
                    var a = g.dData.txt,
                        l = t().getEditingMessage();
                    if (l || a || b.length) {
                        if (l) return a || b.length && !g.hasOnlyReplies(l) ? Object(i.sb)(a) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void(Object(Vi.e)(e, l, g) && (Object(Vi.d)(e, l, a, b, g.getShareUrl(), g.getCancelledShares()), t().sendEditMessage(e, l), e.get().longpoll.push([Object(c.ib)(l)])))) : void
                        function(e, t, n, i) {
                            var a = e.get(),
                                o = a.peer,
                                s = showFastBox({
                                    title: getLang("mail_dialog_msg_delete_title"),
                                    dark: 1
                                }, getLang("mail_dialog_msg_delete_for_all"), getLang("mail_delete"), function(e) {
                                    Object(r.Lb)([i], o, null, "deleteforall", a), s.hide(), t().cancelEditing()
                                }, getLang("global_cancel"), function() {
                                    s.hide(), Ma(geByClass1("_im_text", n))
                                })
                        }(e, t, o, l.messageId);
                        var u = Object(i.Cc)(a, b).map(function(r) {
                            return ja(n, v, {
                                message: r.msgText || "",
                                attaches: r.attaches || []
                            }, e, t, s)
                        });
                        return Promise.all(u)
                    }
                })
            }).catch(function(t) {
                debugLog(t), Ea(e, o)
            })
        }

        function Pa(e, t, n, o, s, c, l) {
            var u = void 0,
                d = debounce(function(e, t, n) {
                    var r = e.get().peer,
                        a = Emoji.val(n);
                    Object(i.yb)(r) || xa(e).dData.txt == a || za(r, e) || (t.checkMessageURLs(a, !0, sa), xa(e).setText(a))
                }.bind(null, e, n), 500);
            var f = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                ref: "im",
                onSend: function() {
                    return Qa(e, t).then(function(e) {
                        return e && o([])
                    })
                },
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: function(n, o) {
                    var s = e.get().peer,
                        c = Emoji.val(o);
                    Object(i.yb)(s) || za(s, e) || xa(e).dData.txt == c || !c || function(e) {
                        var t = e.get().peer;
                        Object(i.ob)(e, t) && !Object(a.x)(e) && Date.now() - (Object(a.t)(e, t).lastTyping || 0) > 1e3 * r.b && e.set(r.nc.bind(null, t))
                    }(e), Xa(e, t, c), d(o);
                    var f = t.offsetHeight;
                    if (u && u !== f) {
                        var m = l().updateScroll();
                        l().scrollFix(e, e.get().peer, m)
                    }
                    u = f
                },
                onStickerSend: function(e, t, n) {
                    return s([
                        ["sticker", e, n]
                    ], {
                        sticker_referrer: t
                    })
                },
                uploadActions: c
            });
            return Emoji.emojiLoadMore(f), e.setState({
                emojiOptId: f
            }), f
        }

        function Ma(e) {
            Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
        }

        function La(e, t, n, r) {
            var s = e.getFwdRaw(),
                c = t.querySelector("." + la),
                l = t.parentNode.querySelector("." + ua);
            if (!(Object(a.f)(r) || {}).hide && s && n.toggleKeyboard(!0), c.innerHTML = "", l.innerHTML = "", s) {
                var u = function(e, t) {
                        if (e.get().isEditing) {
                            var n = Object(i.X)(e);
                            return n && Object(o.c)(n)
                        }
                        return "reply" === t.type
                    }(r, s),
                    d = u ? l : c,
                    f = s.object;
                d.innerHTML = u ? Ba(f) : function(e, t, n, r) {
                    if (n.object && n.object.authorName) {
                        var a = Object(i.cc)(0, "", r.text, !0, Object(Qi.a)(r.kludges, 0));
                        return getTemplate("im_attach_mess", {
                            messages: a,
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
                }(r, e, s, f)
            }
        }

        function Ba(e) {
            var t = Object(i.cc)(0, "", e.text, !0, Object(Qi.a)(e.kludges, 0));
            return getTemplate("im_replied_message", {
                authorName: e.authorName,
                text: t
            })
        }

        function Da(e, t, n) {
            e.set(r.K.bind(null, null, xa(e), !1)).then(function() {
                var r = t.querySelector("." + la),
                    i = t.parentNode.querySelector("." + ua),
                    a = document.querySelector("." + va + " ." + ua);
                i && i.children.length && (i.innerHTML = "", Na(e, n)), a && a.children.length && (a.innerHTML = "", Na(e, n)), r && r.children.length && (r.innerHTML = "", Na(e, n)), Xa(e, t)
            })
        }

        function Na(e, t) {
            var n = t().updateScroll();
            t().scrollFix(e, e.get().peer, n)
        }
        var Aa = "close",
            Ha = "open",
            Ra = "hide";

        function Fa(e, t, n, r, o, s, c) {
            if (c !== Aa && c !== Ha && c !== Ra) throw new Error('Action "' + c + '" not found');
            var l = e.get(),
                u = Object(a.f)(e);
            (Object(i.jb)(e) || !u || l.isEditing) && (c = Ra);
            var d = c === Aa || c === Ra,
                f = Promise.resolve();
            return d || n.isMounted || (f = n.init()), f.then(function() {
                return toggleClass(t, "im-chat-input_open-keyboard", !d), toggleClass(t, "im-chat-input_close-keyboard", d && c !== Ra), toggleClass(r, "im_chat-input--keyboard-button_hidden", c === Ra), n.toggle(l.peer, d, s)
            }).then(function() {
                var t = o().updateScroll();
                return o().scrollFix(e, l.peer, t)
            })
        }

        function qa(e, t, n, r, o, c, l, u, d, f, m, p, g) {
            return {
                restoreKeyboard: function() {
                    this.toggleKeyboard(!!(ls.get("is_keyboards_hide") || {})[Object(a.o)(e)])
                },
                toggleKeyboard: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !Object(a.f)(e).hide,
                        n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return Fa(e, r, p, m, c, n, t ? Aa : Ha)
                },
                initKeyboard: function() {
                    if (!e.get().peer || !Object(a.f)(e)) return Promise.resolve();
                    var t = !!(ls.get("is_keyboards_hide") || {})[Object(a.o)(e)];
                    return Fa(e, r, p, m, c, !0, t ? Aa : Ha)
                },
                fixKeyboard: function() {
                    var t = Object(a.f)(e),
                        n = void 0;
                    return n = t ? t.hide ? Aa : Ha : Ra, Fa(e, r, p, m, c, !0, n)
                },
                hideKeyboard: function() {
                    return Fa(e, r, p, m, c, !1, Ra)
                },
                restoreDraft: function(e, o) {
                    var s = this;
                    t.chosenMedias.length > 0 && (e.setState({
                        removingMedias: !0
                    }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                        removingMedias: !1
                    }));
                    var l = e.get().peer,
                        u = Object(i.Fb)(l) && l != vk.id && !e.get().gid,
                        d = Object(i.Fb)(l) && l != vk.id && !e.get().gid && !inArray(l, e.get().moneyTransferExcept) || Object(i.kb)(l) && e.get().moneyTransferCommAvail && Object(a.g)(e).moneyTransferAvail && !e.get().gid || e.get().gid && e.get().moneyRequestAvail || Object(i.hb)(l) && Object(a.g)(e).moneyRequestAvail;
                    if (toggle(geByClass1("ms_item_gift", r), u && !Object(a.x)(e)), toggle(geByClass1("ms_item_money", r), d && !Object(a.x)(e)), toggle(geByClass1("ms_item_poll", r), Object(i.hb)(l)), Object(i.yb)(l)) return Promise.resolve();
                    var f = xa(e);
                    return Emoji.val(n) !== f.dData.txt ? function(e, t) {
                        Emoji.val(e, clean(t)), Ma(e)
                    }(n, f.dData.txt) : Ma(n), f.prepareObjects(e.get().gid, o && o.messageId).then(function() {
                        if (!Va(e, l, n) && l == e.get().peer) {
                            for (var i = f.dData.attaches, a = 0; a < i.length; a++) t.chooseMedia(i[a].type, i[a].id, i[a].object || {});
                            La(f, r, s, e);
                            var o = c().updateScroll();
                            c().scrollFix(e, l, o), Xa(e, r, f.dData.txt)
                        }
                    })
                },
                sendMessage: function() {
                    o([])
                },
                choose: function(e, n, r) {
                    t.chooseMedia(e, n, r)
                },
                updateChosenMedia: function(e, n, r) {
                    t.updateChosenMedia(e, n, r)
                },
                canAddMedia: function() {
                    return !t.hasRestrictingAttach() && !za(e.get().peer, e)
                },
                isEmpty: function(e) {
                    return !trim(Emoji.val(n)) && !xa(e).hasAttaches()
                },
                unchoose: function(e) {
                    t.unchooseMedia(e)
                },
                attachCount: function() {
                    return t.attachCount()
                },
                progress: function(e, n, r) {
                    show(_a), t.showMediaProgress(e, n, r)
                },
                updateState: function(e) {
                    this.restoreKeyboard(), Va(e, e.get().peer, n)
                },
                focusOn: function(e) {
                    Emoji.editableFocus(n, !1, !0)
                },
                setDraft: function(e, t) {
                    var n = Object(a.t)(e, e.get().peer);
                    Object(D.m)(n, 1024) && !e.get().gid || (g.update(), e.setState({
                        tfdraft: t
                    }), t && this.restoreDraft(e, c().getEditingMessage()))
                },
                clearText: function(e, i) {
                    xa(i).clear(), t.cancelCheckUrl(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), Da(i, r, c);
                    var a = c().updateScroll();
                    c().scrollFix(i, i.get().peer, a)
                },
                attachMessages: function(e, t) {
                    if (e.get().peer === t) {
                        La(xa(e), r, this, e);
                        var n = c().updateScroll();
                        c().scrollFix(e, t, n), Xa(e, r)
                    }
                },
                cancelRecording: function() {
                    f.cancelRecording()
                },
                reHeight: function(e) {
                    var t = c().updateScroll();
                    c().scrollFix(e, e.get().peer, t)
                },
                isBlocked: function() {
                    return za(e.get().peer, e)
                },
                toggleStickers: function(e, t) {
                    Emoji.toggleStickers(e.get().emojiOptId, !t)
                },
                saveText: function(e) {
                    xa(e).setText(Emoji.val(geByClass1("_im_text", r)))
                },
                unmount: function() {
                    Object(s.c)(d), t.destroy(), u.unmount(), p.unmount(), g.unmount(), Emoji.destroy(e.get().emojiOptId), f.unmount()
                }
            }
        }

        function Ua(e, t) {
            return !!Object(i.hb)(e) && t.get().tabs[e].data.kicked
        }

        function za(e, t) {
            return Ua(e, t) || Object(a.t)(t, e) && Object(a.t)(t, e).block_error > 0 || Object(i.rb)(t) && Object(i.vb)(e, t)
        }

        function Wa(e, t) {
            e.disabled = !0, e.contentEditable = "false", addClass(e, "im-chat-input--text_disabled"), addClass(t, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Ka(e, t) {
            e.disabled = !1, e.contentEditable = "true", removeClass(e, "im-chat-input--text_disabled"), removeClass(t, "im-chat-input_error"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked")
        }

        function Va(e, t, n) {
            var r = gpeByClass("_im_chat_input_parent", n),
                o = geByClass1("_im_chat_input_error", r),
                s = Object(a.t)(e, t);
            if (za(t, e)) {
                Wa(n, r);
                var c = function(e, t, n) {
                    switch (n.block_error) {
                        case Yi:
                        case Gi:
                            return getLang("mail_peer_deleted");
                        case na:
                            return getLang("mail_community_deleted");
                        case $i:
                            return getLang("mail_group_banned_messages");
                        case Xi:
                        case Ji:
                        case Zi:
                        case ia:
                        case aa:
                        case ta:
                            return Object(i.kb)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
                        case oa:
                            var r = Object(B.c)(e, t);
                            return langSex(r.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", r.kick_name);
                        case ea:
                            return getLang("mail_cant_send_messages_to_community");
                        case ra:
                            return getLang("mail_chat_youre_kicked");
                        case 0:
                            if (Ua(t, e)) return getLang("mail_chat_youre_kicked");
                            var a = e.get().block_states[t].name;
                            return getLang("mail_community_answering").replace("{username}", a);
                        default:
                            return getLang("mail_send_privacy_error")
                    }
                }(e, t, s);
                if (Object(a.y)(e, Object(a.t)(e, t)) && addClass(geByClass1("_im_page_history"), "is_channel"), Object(i.pb)(e, t) && !e.get().gid) {
                    addClass(r, "is-f-vkcomgroup");
                    var l = inArray(t, e.get().mutedPeers);
                    c = s.data.closed || s.data.kicked ? getTemplate("sImPeerReturnToChat", {
                        text: getLang("mail_return_to_vkcomgroup")
                    }) : getTemplate("sImPeerMuteUnmute", {
                        text: l ? getLang("mail_im_unmute") : getLang("mail_im_mute"),
                        cls: l ? "im-action_unmute" : "im-action_mute"
                    })
                } else removeClass(r, "is-f-vkcomgroup");
                return val(o, c), !0
            }
            return s && s.is_message_request ? (Wa(n, r), addClass(r, "is-message_request"), val(o, getTemplate("sImPeerAcceptOrRejectMessageRequest", {
                cls_accept: ga,
                cls_reject: ha
            })), !0) : (r.classList.contains("is-message_request") && (Ka(n, r), removeClass(r, "is-message_request"), val(o, "")), n.disabled && (removeClass(r, "is-f-vkcomgroup"), removeClass(geByClass1("_im_page_history"), "is_channel"), Ka(n, r), removeClass(r, "is-message_request"), val(o, "")), !1)
        }

        function Qa(e, t, n) {
            return Object(i.Gb)(e).then(function(r) {
                if (!r && !Object(a.x)(e)) return !0;
                var o = null != n ? n : Emoji.val(geByClass1("_im_text", t));
                if (trim(o)) return !Object(a.x)(e) || !Object(i.sb)(o);
                var s = xa(e),
                    c = Object(i.X)(e);
                return s.hasAttaches() && !s.hasOnlyReplies(c)
            })
        }

        function Xa(e, t, n) {
            var r = geByClass1("_im_send", t.parentNode);
            ya(r, {
                fasthide: !0
            }), Qa(e, t, n).then(function(t) {
                if (Object(a.x)(e)) toggleClass(r, "is_input_empty", !t), attr(r, "aria-label", getLang("mail_im_edit"));
                else {
                    toggleClass(r, "im-send-btn_audio", !t), toggleClass(r, "im-send-btn_send", t), t && removeClass(r, "im-send-btn_saudio");
                    var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                    attr(r, "aria-label", n)
                }
            })
        }

        function Ga(e, t, n, o, l) {
            cur.share_timehash = t.get().share_timehash;
            var u = Object(s.b)(qa),
                d = u.callMutations,
                f = u.bindMutations,
                m = Ki(0, t, d),
                p = function(e, t, n) {
                    return e.set(r.D.bind(null, t, n, {}))
                }.bind(null, t);
            ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
            var g = Ii(p, function(e, t, n, r) {
                    e.get().longpoll.push([c.kb(t, n.mess, r)])
                }.bind(null, t), {
                    store: "ls",
                    key: "im_send_queue_" + vk.id,
                    waitCommit: !0
                }),
                b = g.pushMessage,
                _ = g.inspectQueue,
                v = g.resend,
                y = g.setErrored,
                j = g.complete,
                O = Oa.bind(null, t, l, b, d, e),
                w = function(e) {
                    var t = xa(e).getFwdRaw();
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
            var C = new MediaSelector(geByClass1(ca, e), _a, k, {
                    from: "message",
                    maxShown: 0,
                    vectorIcon: !0,
                    ignoreMobile: !0,
                    onAddMediaChange: function(n, i, a, o) {
                        return n && d().toggleKeyboard(!0),
                            function(e, t, n, i, a, o, s, c, l) {
                                if (!t.get().removingMedias) {
                                    if ("album" === a || "page" === a || "mail" === a || "reply" === a) return !1;
                                    if ("share" === a && !s.title) return !1;
                                    var u, d;
                                    show(_a), o && "string" == typeof a ? (c && xa(t).addBindUrl(c, a, o), xa(t).addAttach(a, o, s)) : (xa(t).syncWithSelector(l), "number" == typeof o && l.chosenMedias[o] && (u = l.chosenMedias[o], d = xa(t), "string" == typeof u[0] && "string" == typeof u[1] && u[1] && d.dData.cancelled.push(u[0] + "," + u[1])));
                                    var f = e().updateScroll();
                                    if (e().scrollFix(t, t.get().peer, f), t.get().delayed_message && !Object(r.V)(t.get())) return n([]), !1;
                                    Xa(t, i)
                                }
                            }(l, t, S, e, n, i, a, o, C)
                    },
                    onMediaChange: function() {
                        return function(e, t, n, r, i) {
                            if (!t.get().removingMedias) {
                                var a = i.getMedias().find(function(e) {
                                    return "poll" === e[0]
                                });
                                a && xa(t).addAttach(a[0], a[1], i.pollData(!0, !0)), Xa(t, r)
                            }
                        }(0, t, 0, e, C)
                    },
                    editable: 1,
                    onChangedSize: function() {
                        var n, r, i = l().updateScroll();
                        l().scrollFix(t, t.get().peer, i), n = e, r = ge(_a).offsetHeight, toggleClass(n, "im-chat-input--overflowed", r > 400)
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
                S = Ta.bind(null, t, l, b, e, d, C),
                E = function(e, t, n) {
                    var r = Emoji.val(geByClass1("_im_text", t));
                    Object(a.x)(e) && "" !== r || Qa(e, t).then(function(t) {
                        var i = intval(domData(n.target, "tttype"));
                        (2 === i && !0 !== t || 1 === i && !0 === t || 3 !== i && "" === r) && window.tooltips && tooltips.destroy(n.target, {
                            fasthide: !0
                        });
                        var o = xa(e).dData.attaches.length > 0;
                        if (Object(a.x)(e) && "" === r && !o) return domData(n.target, "tttype", 3), showTooltip(n.target, {
                            text: getLang("mail_delete_for_all"),
                            black: !0,
                            force: 3 !== i,
                            appendParentCls: "_im_chat_input_parent",
                            shift: [-8, -10]
                        });
                        if (!0 !== t) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                            text: getLang("mail_added_audiomsg"),
                            black: !0,
                            force: 1 !== i,
                            appendParentCls: "_im_chat_input_parent",
                            shift: [-8, -10]
                        });
                        domData(n.target, "tttype", 2);
                        var s = e.get().ctrl_submit ? 1 : 0;
                        return showTooltip(n.target, {
                            text: getTemplate("ctrl_submit_hint", {
                                enter_on: s ? "" : "on",
                                ctrl_on: s ? "on" : ""
                            }),
                            dir: "down",
                            shift: [-28, -5],
                            needLeft: !0,
                            className: "im-chat-input--tt",
                            hasover: !0,
                            force: 2 !== i,
                            showdt: 700,
                            zIndex: 200,
                            hidedt: 700,
                            appendParentCls: "_im_chat_input_parent",
                            onCreate: function() {
                                radioBtns.im_submit = {
                                    els: Object(h.q)(geByClass(ba)),
                                    val: s
                                }
                            }
                        })
                    })
                }.bind(null, t, e),
                x = geByClass1("_im_send", e),
                I = Oa.bind(null, t, l, b, d, e),
                T = Ur(e, t, I, function() {
                    addClass(x, "im-send-btn_audio"), removeClass(x, "im-send-btn_static")
                }, function() {
                    d().restoreKeyboard()
                });
            toggle(geByClass1("ms_item_poll", e), Object(i.hb)(Object(a.o)(t))),
                function(e, t) {
                    var n = geByClass1("_im_text", e),
                        r = Object(ft.d)(stManager.add);
                    (window.Wall ? Promise.resolve() : r(["page.js"])).then(function() {
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
                                        i = !1,
                                        a = function() {
                                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                                        };
                                    each(t.wdd.shown, function() {
                                        this[0] && (r++, "@" + t.curTerm == this[2] && (i = !0))
                                    }), !r || i && 1 == r ? a() : cancelStackPush("im_mention", a)
                                }
                            },
                            onHide: function() {
                                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
                            },
                            searchKeys: [1, 7],
                            wddOpts: {}
                        })
                    })
                }(e, t), t.get().textMediaSelector = C, t.set(r.T.bind(null, _, v, y, j));
            var P = geByClass1("_im_text", e);
            setTimeout(function() {
                Object(a.o)(t) && d().setDraft(t, Object(a.u)(Object(a.g)(t))), Pa(t, e, C, S, O, m, l)
            }, 0);
            var M = Da.bind(null, t, e, l),
                L = function(e, t, n) {
                    var i = Object(a.o)(e);
                    e.set(r.f.bind(null, i)).then(function() {
                        Va(e, i, t), n()
                    }).catch(function() {
                        return Sa()
                    })
                }.bind(null, t, P, function() {
                    var e = l().updateScroll();
                    l().scrollFix(t, Object(a.o)(t), e)
                }),
                B = function(e, t, n) {
                    var o = Object(a.o)(e);
                    e.set(r.Gb.bind(null, o)).then(function() {
                        var t = e.get().tabbedPeers.filter(function(e) {
                            return e.peer !== o
                        });
                        return e.set(r.dd.bind(null, t, !0))
                    }).then(function() {
                        Object(i.jb)(e) && t(e), n(e, o), o === e.get().peer && e.get().longpoll.push([Object(c.Ab)()])
                    }).catch(function() {
                        return Sa()
                    })
                }.bind(null, t, n, o),
                D = function(e, t, n, i) {
                    var a = e.get().peer,
                        o = inArray(a, e.get().mutedPeers);
                    e.set(r.Lc.bind(null, a, !o)).then(n().updateState.bind(null, a)), cancelEvent(i)
                }.bind(null, t, e, l),
                N = function(e, t, n, i) {
                    var a = e.get().peer;
                    e.set(r.Zb.bind(null, a)).then(function(e) {
                        return e.set(r.Q.bind(null, a))
                    }).then(n().updateChatTopic.bind(null, a)), cancelEvent(i)
                }.bind(null, t, e, l),
                A = function(e, t, n) {
                    var i = !!intval(domData(n, "val"));
                    i !== cur.ctrl_submit && (cur.ctrl_submit = i, e.set(r.q.bind(null, i)))
                }.bind(null, t);
            Va(t, t.get().peer, P);
            var H = e.querySelector("._im_keyboard_button"),
                R = function(e, t, n, r, i) {
                    return (0, Object(s.b)(ai).bindMutations)(Object(s.a)({
                        handlers: function(e, t) {}
                    }), t, r)
                }(0, t, 0, Ia.bind(null, t, l, b, e, d)),
                F = function(e, t, n, r) {
                    var i = (0, Object(s.b)(ji).bindMutations)(Object(s.a)({
                        handlers: function(e, t) {}
                    }), e, t, n, r);
                    i.toggleImText();
                    var a = we.createElement(Xt, {
                        value: e
                    }, we.createElement(si, {
                        getTemplates: i.getPreparedTemplates,
                        applyTemplate: i.applyTemplate.bind(i),
                        isNeededRendering: i.isNeedRenderTemplates,
                        showSettingsPopup: i.showSettingsPopup.bind(i, gi),
                        showCreatingTemplatePopup: i.showSettingsPopup.bind(i, hi)
                    }));
                    return ke.render(a, t), i
                }(t, e.querySelector("._message_templates_container"), function(e) {
                    return li(P, e)
                }, function(t) {
                    return toggleClass(e, "im-chat-input--textarea_show-templates", t)
                }),
                q = Object(s.a)({
                    handlers: function(n, i) {
                        n(x, "click", function() {
                            Promise.resolve().then(function() {
                                return Qa(t, e)
                            }).then(function(e) {
                                if (e || Object(a.x)(t)) S([]);
                                else {
                                    var n = xa(t);
                                    wa(n) && function(e) {
                                        var t = document.querySelector("." + va + " ." + ua),
                                            n = e.getFwdRaw();
                                        if (n) {
                                            var r = n.object;
                                            t && (t.innerHTML = Ba(r))
                                        } else t.innerHTML = ""
                                    }(n), ya(x, {
                                        fasthide: !0
                                    }), T.start(), setTimeout(function() {
                                        return removeClass(x, "im-send-btn_saudio")
                                    }, 300)
                                }
                            })
                        }), n(x, "mouseover", E), n(P, "focus", function() {
                            t.get().longpoll.push([c.Eb("message")]), cur.focused = t.get().peer
                        }), n(P, "blur", function() {
                            var e = 0 === t.get().peer ? "search" : "default";
                            t.get().longpoll.push([c.Eb(e)]), cur.focused = !1
                        }), n(H, "click", function() {
                            return d().toggleKeyboard(void 0)
                        }), n(H, "mouseover", function() {
                            showTooltip(H, {
                                text: function() {
                                    var e = Object(a.f)(t);
                                    return !e || e.hide ? getLang("mail_show_keyboard") : getLang("mail_hide_keyboard")
                                },
                                black: !0,
                                shift: [4, 5]
                            })
                        }), i(e.parentNode, "click", ma, D), i(e.parentNode, "click", pa, N), i(e.parentNode, "click", fa, M), i(e.parentNode, "click", ga, L), i(e.parentNode, "click", ha, B), i(e, "click", da, M), i(e, "click", "_im_will_fwd", w), i(e, "keydown", "_im_text", function(e) {
                            return function(e, t, n, i) {
                                if (38 === i.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !Object(r.V)(e.get())) {
                                    var o = Object(Vi.c)(e, Object(a.g)(e));
                                    o && t().startEditing(Object(a.m)(e, e.get().peer, o))
                                }
                            }(t, l, d, e)
                        }), i(bodyNode, "click", ba, A)
                    }
                }),
                U = f(t, C, P, e, S, l, _, m, q, T, H, R, F);
            return U.initKeyboard(), U
        }
        var Ja = "im_hist_search",
            Ya = "_im_search_date",
            Za = "_im_search_date_input",
            $a = "_im_search_history_input",
            eo = "_im_start_inplace_search",
            to = "_im_cancel_inplace_search",
            no = "_im_clear_date";

        function ro(e, t, n, r, i, a) {
            return {
                focus: function(e) {
                    uiSearch.focus(t),
                        function(e, t, n, r) {
                            cancelStackPush(Ja, ao.bind(null, e, t, n, r))
                        }(e, t, n, r)
                },
                changePeer: function(e, n) {
                    uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
                },
                search: function() {
                    a({})
                },
                unmount: function() {
                    Object(s.c)(i), cancelStackFilter(Ja), r.then(function(e) {
                        return e.destroy()
                    })
                }
            }
        }

        function io(e, t, n) {
            var i = e.get().peer;
            uiSearch.showProgress(n), Object(r.hc)(i, e.get()).then(function(r) {
                uiSearch.hideProgress(n), t().insertSearch(r, e)
            }).catch(function() {
                uiSearch.focus(n), uiSearch.hideProgress(n)
            })
        }

        function ao(e, t, n, i) {
            cancelStackFilter(Ja), i.then(function(e) {
                e.hide()
            }), e.set(r.m.bind(null, e.get().peer)).then(function() {
                uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
            })
        }

        function oo(e, t, n) {
            var i = geByClass1(Za, e),
                a = geByClass1($a, e),
                o = function(e, t, n, r) {
                    var i = '<td class="cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
                    return new Promise(function(e) {
                        stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                            var t = new Datepicker(n, {
                                width: 140,
                                resfmt: "plain",
                                addRows: '<tr id="im_day_clear">' + i + "</tr>",
                                addRowsM: '<tr id="im_month_clear">' + i + "</tr>",
                                onUpdate: r,
                                pastActive: !0,
                                noFuture: !0
                            });
                            e(t)
                        })
                    })
                }(0, 0, i, function(e, t, n, i) {
                    e.set(r.sc.bind(null, e.get().peer, i.d + "." + i.m + "." + i.y)).then(io.bind(null, e, t, n))
                }.bind(null, t, n, a)),
                c = function(e, t) {
                    e.then(function(e) {
                        triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
                    })
                }.bind(null, o, e),
                l = function(e, t, n, i, a, o) {
                    if ("keyup" !== o.type || 13 == o.which) {
                        var s = clean(uiSearch.getFieldEl(t).value);
                        e.set(r.rc.bind(null, s, e.get().peer)).then(a.bind(null, e, i, t))
                    }
                }.bind(null, t, a, i, n, debounce(io, 300)),
                u = ao.bind(null, t, a, n, o),
                d = function(e, t, n, i) {
                    n.then(function(e) {
                        e.hide()
                    }), e.set(r.v.bind(null, e.get().peer)).then(io.bind(null, e, t, i))
                }.bind(null, t, n, o, a),
                f = Object(s.a)({
                    handlers: function(t, n) {
                        t(geByClass1(Ya, e), "click", c), t(uiSearch.getFieldEl(a), "keyup", l), t(geByClass1(eo, e), "click", l), t(geByClass1(to, e), "click", u), n(e, "click", no, d)
                    }
                });
            return ro(0, a, n, o, f, l)
        }
        var so = "_im_mess_fav",
            co = "_im_mess_reply",
            lo = "_im_mess_forward",
            uo = "_im_mess_edit";

        function fo(e, t, n, r, o) {
            var s = Object(a.o)(e),
                c = Object(a.t)(e, s),
                l = 105 + (Object(Oe.a)(e, Object(a.o)(e)) || c && c.top_banner ? Object(i.Y)() : 0);
            showTooltip(t, {
                shift: [n, 10],
                black: 1,
                className: "_im_history_tooltip " + r,
                appendParentCls: "_im_mess_stack",
                toup: t.getBoundingClientRect().top > l + 37,
                text: o
            })
        }

        function mo(e, t, n, r) {
            var i = getLang("mail_im_toggle_important").length > 14;
            fo(e, r, i ? 84 : 34, i ? "im-star-tt_long" : "im-star-tt", function() {
                var t = domData(gpeByClass("_im_mess", r), "msgid"),
                    n = Object(a.m)(e, e.get().peer, t);
                return n ? Object(o.h)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
            })
        }

        function po(e, t, n) {
            var l = mo.bind(null, t, 0),
                u = function(e, t, n) {
                    var i = gpeByClass("_im_mess", n),
                        s = intval(domData(i, "msgid")),
                        l = e.get().peer,
                        u = Object(a.m)(e, l, s),
                        d = !Object(o.h)(u);
                    return e.get().longpoll.push([{
                        peerId: l,
                        messageId: s,
                        type: d ? c.U : c.Q,
                        flags: c.l
                    }]), e.set(r.G.bind(null, [s], d, l)), mo(e, 0, 0, n), !1
                }.bind(null, t),
                d = function(e, t, n, r) {
                    fo(e, r, 18, "im-reply-tt", getLang("mail_im_mark_forward"))
                }.bind(null, t, 0),
                f = function(e, t, n, i) {
                    var a = e.get().peer,
                        o = +domData(domClosest("im-mess", i.target), "msgid");
                    return Object(ye.f)(), Object(r.Eb)([o], a, e).then(function(t) {
                        return e.set(r.Cb.bind(null, t))
                    }).then(function() {
                        Pn(0, e)
                    }), !1
                }.bind(null, t, e.querySelector("_im_dialog_actions"), n),
                m = function(e, t, n, r) {
                    fo(e, r, 18, "im-reply-tt", getLang("mail_im_reply"))
                }.bind(null, t, 0),
                p = function(e, t, n) {
                    var i = e.get().peer,
                        a = +domData(domClosest("im-mess", n.target), "msgid");
                    return Object(r.Eb)([a], i, e).then(function(t) {
                        return e.set(r.K.bind(null, t, e.get().tfdraft, !0))
                    }).then(function() {
                        return t().respond(e, i)
                    }), !1
                }.bind(null, t, n),
                g = function(e, t, n) {
                    fo(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
                }.bind(null, t),
                h = function(e, t, n, r) {
                    var i = intval(domData(gpeByClass("_im_mess", r), "msgid")),
                        o = Object(a.m)(e, e.get().peer, i);
                    return o && t().startEditing(o), !1
                }.bind(null, t, n),
                b = Object(s.a)({
                    handlers: function(t, n) {
                        n(e, "click", so, u), n(e, "mouseover", so, l), n(e, "click", lo, f), n(e, "mouseover", lo, d), n(e, "click", co, p), n(e, "mouseover", co, m), n(e, "click", uo, h), n(e, "mouseover", uo, g)
                    }
                });
            return function(e, t) {
                return {
                    markImportant: function(t, n, r) {
                        Object(i.Kc)(t, n, e)
                    },
                    unmount: function() {
                        Object(s.c)(t)
                    }
                }
            }(e, b)
        }
        var go = "_im_retry_media",
            ho = "_im_replied_message";

        function bo(e, t, n, o, s) {
            if (!Object(r.Y)(e.get().peer, e.get()) && !(hasClass(s, i.l) || hasClass(s, i.t) || hasClass(s, "_im_mess_srv") || Object(i.E)(o, s) || Object(a.x)(e) || "A" === o.target.tagName || domClosest(ho, o.target) || o.target.classList.contains(go))) {
                var c = intval(domData(s, "msgid")),
                    l = e.get().peer;
                if (!Object(i.fb)(e, l, c)) {
                    var u = void 0,
                        d = void 0;
                    u = o.shiftKey ? Object(a.n)(e, l, c) : [c], e.set(r.j.bind(null, u)).then(function() {
                        var r = Object(a.s)(e),
                            i = !1;
                        u.forEach(function(e) {
                            var t = geByClass1("_im_mess_" + e, n);
                            if (t) {
                                var a = inArray(e, r);
                                i |= a, toggleClass(t, "im-mess_selected", a);
                                var o = a ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                    s = geByClass1("_im_mess_blind_label_select", t);
                                attr(s, "aria-label", o)
                            }
                        }), i && (window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()), t().changedMessageSelection(e)
                    }).then(function() {
                        1 !== e.get().selectedMessages.length || d ? d && d.hide() : d = function(e) {
                            var t = e.get();
                            if (t.pinnedMessagesPromo && Object(i.hb)(t.peer)) {
                                var n = geByClass1("_mess-action-promo"),
                                    a = new ElementTooltip(n, {
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
                                return a.show(), a
                            }
                        }(e)
                    })
                }
            }
        }

        function _o(e, t, n) {
            var r = bo.bind(null, t, n, e),
                i = Object(s.a)({
                    handlers: function(t, n) {
                        n(e, "click", "_im_mess", r)
                    }
                });
            return function(e, t) {
                return {
                    cleanSelection: function(t) {
                        t && Array.isArray(t) && t.length && t.map(function(t) {
                            return geByClass1("_im_mess_" + t, e)
                        }).filter(function(e) {
                            return e
                        }).forEach(function(e) {
                            return removeClass(e, "im-mess_selected")
                        })
                    },
                    unmount: function() {
                        Object(s.c)(t)
                    }
                }
            }(e, i)
        }
        var vo = {
                onNewMessagesChunk: function(e) {
                    var t = geByClass("post");
                    LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(function(e) {
                        return LongView.register(e, "im")
                    })
                },
                onHistoryScroll: function(e) {
                    LongView.onScroll(e, window.innerHeight)
                }
            },
            yo = function() {
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
        var jo = 68,
            Oo = 32,
            wo = 300,
            ko = 20,
            Co = 68,
            So = 10,
            Eo = 2e3,
            xo = 100;

        function Io(e, t, n, r) {
            var i = e instanceof Array ? e : geByClass("_im_bar_date", e),
                a = t.contHeight();
            vo.onNewMessagesChunk();
            var o = i.reduce(function(e, t) {
                    return e[domData(t, "date")] = [t.offsetTop + So, a, t], e
                }, {}),
                s = !n && r.barMap ? r.barMap : {};
            return r.barMap = extend(s, o), r.barMapKeys = Object.keys(r.barMap).sort(), Promise.resolve(r)
        }

        function To(e, t, n, r, a) {
            var o = e.get().barMap[t],
                s = Object(i.ib)(a) ? Co : ko;
            return n - (o[0] + n - o[1]) + r - s
        }

        function Po(e, t, n, r, i) {
            var a = e.get(),
                o = void 0,
                s = void 0,
                c = n - t;
            a.barMapKeys.forEach(function(t) {
                var a = To(e, t, n, r, i);
                if (a >= c) {
                    var l = o ? To(e, o, n, r, i) : n;
                    o = l > a ? t : o
                } else if (a < c) {
                    var u = s ? To(e, s, n, r, i) : 0;
                    s = a > u ? t : s
                }
            });
            var l = {};
            return [
                [s, "prev"],
                [o, "cur"]
            ].forEach(function(t) {
                var a = yo(t, 2),
                    o = a[0],
                    s = a[1];
                o && (l[s + "Bar"] = function(e, t) {
                    var n = e.get().barMap[t][2];
                    return {
                        text: n.textContent,
                        date: domData(n, "date")
                    }
                }(e, o), l[s + "Left"] = To(e, o, n, r, i) - c)
            }), l
        }

        function Mo(e, t, n, a, o) {
            var s = e.get(),
                c = Object(r.W)(s),
                l = t.get(),
                u = o.scrollTop(),
                d = l.lastTop ? l.lastTop - u : 0;
            l.lastTop = u;
            var f, m, p, g = Object(Oe.a)(s, s.peer) ? Object(i.Y)() : 0,
                h = Object(r.Y)(s.peer, s) && s.tabs[s.peer] && s.tabs[s.peer].top_banner ? 50 : 0,
                b = (Object(i.ib)(e) ? jo + g + h : 0) - Oo / 2,
                _ = Po(t, u, o.contHeight(), b, e),
                v = _.prevBar,
                y = _.curBar,
                j = _.prevLeft,
                O = "translateY(0px)",
                w = !1,
                k = !1,
                C = !1;
            y || c || (y = function(e) {
                var t = geByClass1("_im_mess", e),
                    n = domData(t, "ts");
                return t && n ? {
                    text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
                    date: n
                } : null
            }(a)), y ? w = y : k = !0, v && y && j > -Oo && j < 0 && (C = !0, k = !1, w = y, O = "translateY(" + (-Oo - j) + "px)"), w && function(e, t) {
                domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
                    visibility: "visible"
                }))
            }(n, w), C ? t.set(function(e, t, n, r) {
                return r.barTransition = r.barMap[t][2], n > 0 ? (addClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : n < 0 && (removeClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(r.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(r)
            }.bind(null, n, v.date, d)) : t.set(function(e, t) {
                return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
            }.bind(null, n)), O && setStyle(n, (f = {}, m = cssTransformProp, p = O, m in f ? Object.defineProperty(f, m, {
                value: p,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : f[m] = p, f)), toggleClass(n, "im-page--top-date-bar_no-b", k)
        }

        function Lo(e, t) {
            var n = geByClass1("_im_top_date_bar"),
                r = g({
                    lastTop: !1,
                    barMap: {},
                    barMapKeys: []
                }),
                i = null,
                a = null,
                o = null,
                s = debounce(function(e) {
                    r.set(Io.bind(null, t, e, !1))
                }, 500);
            return {
                reset: function(i) {
                    r.set(Io.bind(null, t, i, !0)).then(function() {
                        Mo(e, r, n, t, i)
                    })
                },
                disable: function() {
                    r.reset()
                },
                heightIncreased: function(e, t) {
                    return s(t), r.set(function(e, t) {
                        return t.barMapKeys.forEach(function(n) {
                            t.barMap[n][0] -= e
                        }), Promise.resolve(t)
                    }.bind(null, e))
                },
                parseMore: function(i, a) {
                    r.set(Io.bind(null, i, a, !1)).then(function() {
                        Mo(e, r, n, t, a)
                    })
                },
                toggle: function(e) {
                    e ? setStyle(n, {
                        display: ""
                    }) : hide(n)
                },
                show: function() {
                    a = Date.now(), o || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), o = setInterval(function() {
                        Date.now() - a > Eo && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(o), o = null)
                    }, xo))
                },
                update: function(a) {
                    i && (clearTimeout(i), i = null), i = setTimeout(function() {
                        Mo(e, r, n, t, a)
                    }, wo), Mo(e, r, n, t, a)
                }
            }
        }
        var Bo = n("nyd8"),
            Do = n("uytb"),
            No = n("p3re"),
            Ao = n("FWc3"),
            Ho = n("zxIV"),
            Ro = "_im_top_banner_button",
            Fo = "_im_top_banner_hide";

        function qo(e, t) {
            var n = geByClass1("_im_dialog_actions", e);
            Object(Ho.vb)(n, "im-page--chat-header_top-banner", t)
        }

        function Uo(e, t) {
            var n = geByClass1(Fo, e);
            n && window.tooltips && tooltips.hide(n), qo(e, !1), t.innerHTML = ""
        }

        function zo(e, t, n) {
            var o = geByClass1("_im_top_banner", e),
                c = Object(s.a)({
                    handlers: function(a, s) {
                        var c = geByClass1("_im_dialog_actions", e);
                        s(e, "click", Fo, function() {
                            t.set(r.S.bind(null, t.get().peer)), Uo(e, o);
                            var a = !!Object(i.Yb)(t);
                            Object(i.G)(t, a, !0, n)
                        }), s(e, "click", Ro, function(a) {
                            var s = function(e, t, n, i) {
                                    var a = Object(Ho.s)(e, "payload");
                                    return !!a && (t.set(r.k.bind(null, t.get().peer, a)), Uo(n, i), !0)
                                }(a.target, t, e, o),
                                c = !!Object(i.Yb)(t);
                            Object(i.G)(t, c, !s, n)
                        }), s(c, "mouseover", Fo, function(e, t) {
                            Object(Ao.c)(t, {
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
                    var r = Object(a.t)(t, t.get().peer).top_banner,
                        s = o.children.length;
                    r && !Object(a.K)(t) ? (qo(e, !0), o.innerHTML = function(e) {
                        var t = e.icon ? Object(Qr.n)("im_top_banner_icon", {
                                icon: e.icon
                            }) : "",
                            n = e.text;
                        "employees_banner" === e.name && (n = Object(No.e)(n, No.b.bind(null, !1)), n = Object(No.f)(n));
                        var r = (e.buttons || []).map(function(e) {
                            var t = "";
                            switch (e.layout) {
                                case "secondary":
                                    t = "secondary";
                                    break;
                                default:
                                    t = "blue_button"
                            }
                            return "link" === e.type ? Object(Qr.n)("im_top_banner_button_link", {
                                link: e.link,
                                text: e.text,
                                css_class: t
                            }) : Object(Qr.n)("im_top_banner_button", {
                                callback_data: e.callback_data,
                                text: e.text,
                                css_class: t
                            })
                        });
                        return r = r.concat([Object(Qr.n)("im_top_banner_hide_btn", {})]), Object(Qr.n)("im_top_banner", {
                            text: n,
                            icon: t,
                            buttons: r.join("")
                        })
                    }(r)) : o.children.length && Uo(e, o);
                    var c = o.children.length;
                    Object(i.G)(t, c, s, n)
                },
                unmount: function() {
                    Object(s.c)(c)
                }
            }
        }
        var Wo = function() {
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
            Ko = 1e3,
            Vo = -30,
            Qo = 30,
            Xo = 2e3,
            Go = 700,
            Jo = 15,
            Yo = 47,
            Zo = "_im_to_end",
            $o = "_im_failed_action",
            es = "_im_mess_link",
            ts = "_im_admin_name",
            ns = "_im_typer_c",
            is = "_im_error",
            as = "_im_join_cancel",
            os = "_im_retry_media",
            ss = "im-audio-message_recorded",
            cs = "im-audio-message_recording",
            us = "_im_mess_srv",
            ds = "im_srv_mess_link",
            fs = "_chat_invitation",
            ms = "_im_mess",
            ps = "_im_replied_message",
            gs = "_im_replied_author_link",
            hs = !1,
            bs = {};

        function _s(e) {
            var t = Object(a.t)(e, e.get().peer);
            return !!Object(a.p)(e) || !!t.top_banner
        }

        function vs(e, t) {
            var n = Object(h.s)(e),
                r = Object(a.t)(n, t);
            return Object(i.hb)(t) && Object(Oe.a)(n, t) || !!r.top_banner && !Object(a.K)(t, n)
        }

        function ys(e, t) {
            return Object(i.Y)()
        }

        function js(e, t) {
            var n = ge("page_header"),
                r = geByClass1("_im_chat_input_w", t),
                i = r.offsetHeight - r.clientHeight;
            return Math.min(window.clientHeight() - i, Math.max(Math.max(0, e), Go + n.offsetHeight + t.offsetTop))
        }

        function Os(e, t) {
            return geByClass1("_im_mess_" + t, e)
        }

        function ws(e, t, n) {
            var r, a, o, s, c, l, u, d = geByClass1(e, t),
                f = void 0,
                m = void 0;
            a = {
                onStartDrag: function(e, t) {
                    addClass(bodyNode, "cursor_ns_resize"), f = t, m = t
                },
                onDrop: function() {
                    removeClass(bodyNode, "cursor_ns_resize")
                },
                onDrag: function(e, r) {
                    var a = js(m - f + r, t);
                    Object(i.jc)(a), n().fixHeight()
                }
            }, o = void 0, s = void 0, c = function(e) {
                o = void 0 !== e.clientX ? e.clientX : e.touches[0].clientX, s = void 0 !== e.clientY ? e.clientY : e.touches[0].clientY, a.onDrag && a.onDrag.call(r, o, s)
            }, l = function e(t) {
                a.onDrop && a.onDrop.call(r, o, s), removeEvent(document, "mouseup touchend mouseleave", e), removeEvent(document, "mousemove touchmove", c)
            }, u = function(e) {
                (1 === e.which || e.touches && e.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", l), addEvent(document, "mousemove touchmove", c), o = void 0 !== e.clientX ? e.clientX : e.touches[0].clientX, s = void 0 !== e.clientY ? e.clientY : e.touches[0].clientY, a.onStartDrag && a.onStartDrag.call(r, o, s), a.onDrag && a.onDrag.call(r, o, s), cancelEvent(e))
            }, (r = d).beginDragHandler = u, addEvent(r, "mousedown touchstart", u)
        }

        function ks(e, t) {
            var n;
            n = geByClass1(e, t), removeEvent(n, "mousedown touchstart", n.beginDragHandler)
        }

        function Cs(e) {
            hide(e.target)
        }

        function Ss(e, t, n) {
            var i = Object(a.t)(t, n),
                o = Object(r.Bc)(i.history);
            toggleClass(e, "im-page--history_empty-hist", !o)
        }

        function Es(e) {
            return geByClass1("_im_peer_history", e)
        }

        function xs(e, t) {
            var n = t.contHeight(),
                r = e.scrollTop + (n - e.contHeight);
            t.scrollTop(r)
        }

        function Is(e, t, n, a, o, s, c, l) {
            var u = !(arguments.length > 8 && void 0 !== arguments[8]) || arguments[8],
                d = arguments.length > 9 && void 0 !== arguments[9] && arguments[9],
                f = (t.get().tabs || {})[n];
            o().hideError(), s.renderPeer(t), l.renderPeer(t);
            var m = geByClass1("_im_peer_history", e);
            if (!t.get().tabHistoryNotChanged) {
                val(geByClass1("_im_page_peer_name", e), f.tab);
                var p = Object(r.Bc)(f.history);
                Ss(e, t, n), p || (p = getLang("mail_im_here_history")), val(m, p), getAudioPlayer().isPlaying() && getAudioPlayer().updateCurrentPlaying(), Object(i.ib)(t) || Object(i.L)("_chat_body_wrap", e), Us(t, a, e)
            }
            if (Object(r.Y)(n, t.get()) ? o().showSearch(t) : o().cancelSearch(t, !1), c.changePeer(n, t), t.get().msgid) Ds(a, e, t.get().msgid, t);
            else if (f.scrollBottom && u) {
                xs(f, a);
                var g = Object(i.tb)(t, e, a),
                    h = Wo(g, 1)[0];
                f.skipped || setTimeout(function() {
                    f.unread && !h && Hs(t, e, !0), Ps(t, a, e)
                }, 100)
            } else Bs(a, e, o, t, d) || a.scrollBottom(Vo);
            window.LazyLoad && window.LazyLoad.scan(!!a.scroll && a.scroll.scroller)
        }

        function Ts(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || t.scrollTop(),
                i = t.scrollBottom(),
                a = t.contHeight(),
                o = e.get().peer;
            e.set(r.ac.bind(null, o, n, i, a))
        }

        function Ps(e, t, n) {
            var r = Object(a.F)(e),
                i = 4 * t.getScrollHeight();
            t.scrollBottom() > i && !r && Hs(e, n, !0, 2 * t.getScrollHeight())
        }

        function Ms(e, t, n, o, s, c, l, u) {
            var d = !(arguments.length > 8 && void 0 !== arguments[8]) || arguments[8];
            if ((e.get().history_init || (e.get().history_init = !0, !(u.scrollTop() > 0))) && !je.a.isFullscreen) {
                s.update(u), s.show();
                var f = e.get().peer;
                if (0 !== f && Object(i.ob)(e.get(), f) && (vo.onHistoryScroll(u.scrollTop()), !layers.visible)) {
                    var m = Object(a.F)(e),
                        p = Object(a.t)(e, f);
                    p && !p.skipped && l < 0 ? Ps(e, u, c) : l > 0 && !p.skipped && !p.unread && Vs(e, c), As(e, u) && (m && p && !p.skipped && Vs(e, c), p.unread > 0 && Ls(e));
                    var g = Object(i.Lc)(n);
                    if (!Object(r.Y)(f, e.get()) && d && o(u), !hs && (l < 0 || 0 === u.scrollBottom()) && u.scrollBottom() < Ko) {
                        if (Object(r.Y)(f, e.get())) return;
                        if (p.skipped > 0 && !e.get().no_moving_down) {
                            var h = gpeByClass("_im_page_history", h),
                                b = e.get();
                            hs = !0;
                            var _ = e.set(r.mb).then(t().loadHistory.bind(null, b.peer, {
                                reversed: !0
                            })).then(function() {
                                Ls(e), hs = !1, Hs(e, h), p.skipped || e.set(r.p.bind(null, e.get().peer, !1, !1))
                            });
                            return Fs(h, !0), void _.then(Fs.bind(null, h, !1))
                        }
                    }
                    if (!hs && u.scrollTop() < Ko) {
                        if (Object(r.Y)(f, e.get())) {
                            hs = !0;
                            var v = t().getSearchResulstModule();
                            return v.isAll(e) ? void(hs = !1) : void g(v.loadMore(e).then(function(n) {
                                hs = !1, n && (t().loadHistory(e.get().peer, {}, e, n), o(u))
                            }), "up")
                        }
                        var y = e.get();
                        p.allShown || (hs = !0, g(e.set(r.qb.bind(null, 0, 0)).then(t().loadHistory.bind(null, y.peer, {})).then(function() {
                            hs = !1, o(u)
                        }), "up"))
                    }
                    l < 0 && Js(e, f, u.scrollBottom(), c, t), Object(r.hd)()
                }
            }
        }

        function Ls(e) {
            if (!(window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle)) return e.set(r.Fb.bind(null, e.get().peer))
        }

        function Bs(e, t, n, r, a) {
            var o = geByClass1("_im_unread_bar_row", t);
            if (o) {
                var s = r.get(),
                    c = s.peer,
                    l = o.getBoundingClientRect(),
                    u = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
                Object(i.ib)(r) && (u += Yo + (vs(s, c) ? ys() : 0));
                var d = e.scrollTop() - u + l.top;
                return e.scrollTop(d), Ts(r, e, d), setTimeout(function() {
                    c === r.get().peer && Ms(r, n, Es(t), function() {}, a, t, 0, e)
                }, 80), Ls(r), !0
            }
            return !1
        }

        function Ds(e, t, n, r) {
            var a = Os(t, n);
            if (a) {
                var o = Object(i.ib)(r),
                    s = r.get().peer,
                    c = o ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                    l = a.offsetTop + domPN(a).offsetTop + domPN(domPN(a)).offsetTop + domPN(domPN(domPN(a))).offsetTop;
                o && vs(r, s) && (l -= ys(r.get())), e.scrollTop(l - e.getScrollHeight() / 2 + c / 2), addClass(a, "im-mess_light"), setTimeout(function() {
                    removeClass(a, "im-mess_light")
                }, Xo)
            }
        }

        function Ns(e, t, n) {
            n.updateLastSeen(e)
        }

        function As(e, t) {
            return Object(a.w)(e) >= intval(t.scrollBottom())
        }

        function Hs(e, t, n) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                o = e.get().peer;
            if (!Object(i.yb)(o)) {
                var s = e.get().tabs[o],
                    c = geByClass1(Zo, t),
                    l = geByClass1("_im_to_end_label", c);
                n && s.unread > 0 ? val(l, getLang("mail_im_new_messages", s.unread)) : val(l, getLang("mail_im_to_end_new"));
                var u = !1;
                (n || s.skipped > 0) && !Object(r.Y)(e.get().peer, e.get()) ? (u = !0, addClass(c, "im-to-end_shown")) : Ks(c, !0), e.set(r.Xc.bind(null, [u, intval(a)]))
            }
        }

        function Rs(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return (0 !== e.scrollTop() || 0 !== e.scrollBottom()) && e.scrollBottom() < (t ? Qo + t : Qo)
        }

        function Fs(e, t) {
            var n = geByClass1(Zo, e);
            toggleClass(n, "im-to-end_loading", t)
        }

        function qs(e, t, n, i) {
            if (!t.get().tabs[t.get().peer].skipped) return i.scrollBottom(Vo), Hs(t, n), Ls(t), void Js(t, t.get().peer, 0, n, e);
            Fs(n, !0), t.set(r.p.bind(null, t.get().peer, !1, !1)).then(function() {
                return t.set(r.sb.bind(null, t.get().peer, !0, -1, !1))
            }).then(function() {
                Fs(n, !1), e().changePeer(t, !1, !1), Ls(t)
            })
        }

        function Us(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (Object(i.ib)(e)) {
                var a = t.contHeight(),
                    o = geByClass1("_im_chat_input_w", n),
                    s = o.offsetHeight - o.clientHeight,
                    c = geByClass1("_im_chat_resize", n),
                    l = geByClass1("_im_chat_input_parent", n),
                    u = geByClass1("_im_chat_audio_input_parent", n);
                if (!1 !== (r = !1 !== r ? r : Object(i.U)()) && r > 0) {
                    var d = js(r, n),
                        f = d - (hasClass(u, cs) || hasClass(u, ss) ? u : l).offsetHeight;
                    c.style.height = window.clientHeight() - d - s + "px", setStyle(o, {
                        top: f + "px",
                        bottom: "auto"
                    })
                } else c.style.height = "0px", setStyle(o, {
                    top: "auto",
                    bottom: "0px"
                });
                var m = geByClass1("_im_peer_history_w", n);
                return setStyle(m, {
                    borderBottomWidth: o.offsetHeight - Jo - 1
                }), t.contHeight() - a
            }
            Object(i.L)("_chat_body_wrap", n);
            var p = t.getScrollHeight();
            return t.update(!1, !0), p - t.getScrollHeight()
        }

        function zs(e, t, n, r) {
            var i = t.offsetHeight;
            r(), e.heightIncreased(t.offsetHeight - i, n)
        }

        function Ws(e, t) {
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

        function Ks(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            hasClass(e, "im-to-end_shown") && (t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast")))
        }

        function Vs(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                i = geByClass1(Zo, t);
            e.set(r.Xc.bind(null, [!1, 0])), Ks(i, n)
        }

        function Qs(e) {
            var t = Object(a.g)(e);
            Object(i.hb)(t.peerId) && (t.pinHideId = cur.imDb.select(Do.a, t.peerId))
        }

        function Xs(e, t, n, r, i) {
            e.setState({
                isEditing: !1
            }), removeClass(r, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, Object(a.o)(e) ? Object(a.u)(Object(a.g)(e)) : null), n.toggleStickers(e, !0), n.restoreKeyboard(), Gs(t)
        }

        function Gs(e) {
            Object(h.q)(geByClass("_im_history_tooltip", e)).forEach(hide)
        }

        function Js(e, t, n, i, o) {
            var s = Object(a.t)(e, t);
            if (!(Date.now() - (s.lastReset || 0) < 1e3) && (s && s.msgs && s.history && !hs && s.offset > 300 && 0 == s.skipped && n < 50 && n >= 0 && 0 === (e.get().selectedMessages || []).length)) {
                var c = Object.keys(s.msgs).filter(function(e) {
                        return e > 0
                    }).sort(function(e, t) {
                        return e - t
                    }).slice(0, -50),
                    l = c.slice(-1)[0];
                e.mutate(r.Tb.bind(null, t)), e.set(r.Mb.bind(null, c, t)).then(function() {
                    return o().removeStartingFromMessage(l, t, e)
                })
            }
        }

        function Ys(e) {
            checkEvent(e) || cancelEvent(e)
        }

        function Zs(e, t, n, l, u, f, m, p, g, h, b, _, v, y, j, O) {
            var w = void 0,
                k = throttle(function() {
                    n.smoothScroll.apply(n, arguments)
                }, 300);
            return {
                fixKeyboard: function() {
                    u.fixKeyboard()
                },
                changePeer: function(e) {
                    var o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    if (0 === e.get().peer && j.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return u.setDraft(e, null),
                        function(e) {
                            addClass(e, "im-page--history_empty"), Es(e).innerHTML = ""
                        }(t);
                    if (Object(i.ob)(e.get(), e.get().peer)) {
                        removeClass(t, "im-page--history_search"), e.set(r.E), l.changeActions(e);
                        var c = e.get().peer,
                            d = e.get().prevPeer;
                        removeClass(t, "im-page--history_loading"), toggleClass(t, "im-page--history_vkcomgroup", Object(i.pb)(e, c)), o ? u.setDraft(e, Object(a.u)(Object(a.g)(e))) : u.updateState(e), Hs(e, t), f().updateTyping(c, e), j.toggle(!0), Ns(e, 0, l), Object(i.yb)(d) && !Object(i.yb)(c) ? (! function(e, t, n, r, i, a, o, s, c, l) {
                            removeClass(e, "im-page--history_empty"), Is(e, t, n, r, i, a, o, s, c, l)
                        }(t, e, c, n, f, l, p, O, s, j), j.reset(n)) : Object(i.yb)(d) || Object(i.yb)(c) || (Is(t, e, c, n, f, l, p, O, s, j), j.reset(n)), Object(i.yb)(c) || Ms(e, f, Es(t), v, j, t, 0, n), Object(i.K)(t)
                    }
                },
                preparePeer: function(e) {
                    var n = Object(a.o)(e);
                    Qs(e), u.setDraft(e, Object(a.u)(Object(a.t)(e, n))), f().updateTyping(n, e), f().hideError(), l.renderPeer(e), O.renderPeer(e), l.hideActions(e), p.changePeer(n, e), Ns(e, 0, l), j.toggle(!1), Vs(e, t, !0)
                },
                saveScroll: function(e) {
                    return Ts(e, n)
                },
                loadingPeer: function(e) {
                    Object(r.V)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
                },
                stopLoading: function(e) {
                    removeClass(t, "im-page--history_loading")
                },
                deselectDialog: function(e) {
                    m().removeSelection(e)
                },
                replaceMessageAttrs: function(e, n) {
                    Object(i.ec)(n.get(), Es(t), e)
                },
                cleanSelection: function(e) {
                    h.cleanSelection(e)
                },
                updateDialogFilters: function(e) {
                    m().updateDialogFilters(e)
                },
                getSearchResulstModule: function() {
                    return w
                },
                insertSearch: function(e, r) {
                    w || (l.deselectAll(r), w = d(t, r)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), Es(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), Es(t).innerHTML = Object(i.Tb)()), Us(r, n, t), n.scrollBottom(0), Hs(r, t), j.reset(n)
                },
                updateChatTopic: function(e, t) {
                    m().updateDialog(e, t), e === t.get().peer && (l.renderPeer(t), l.renderActions(t), O.renderPeer(t))
                },
                updateActions: function(e) {
                    l.changeActions(e)
                },
                updateChatPhoto: function(e, r, a) {
                    if (Object(i.ub)(e.peerId, a.get())) {
                        l.renderPeer(a), O.renderPeer(a);
                        var o = Rs(n);
                        Object(i.w)(e, r, a.get(), Es(t)), o && n.scrollBottom(Vo)
                    }
                },
                markImportant: function(e, n, r) {
                    Os(t, e) && (l.changedMessageSelection(r), g.markImportant(e, n, r))
                },
                isNewMessagesVisible: function(e) {
                    return As(e, n)
                },
                loadHistory: function(e, r, a) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        s = a.get();
                    if (Object(i.ub)(e, s)) {
                        var c = o || s.tabs[e].historyToAppend;
                        if (!c) return;
                        var l = geByClass1("_im_peer_history", t),
                            u = domFC(l),
                            d = n.scrollBottom(),
                            f = r.reversed ? function(e) {
                                return l.appendChild(e)
                            } : function(e) {
                                return l.insertBefore(e, u)
                            },
                            m = 0;
                        r.reversed && (m = l.offsetHeight);
                        var p = sech(c),
                            g = document.createDocumentFragment();
                        p.forEach(function(e) {
                            return g.appendChild(e)
                        }), f(g), r.reversed && j.heightIncreased(l.offsetHeight - m, n), r.reversed || n.scrollBottomFixSave(d), n.update(!1, !0);
                        var h = p.filter(function(e) {
                            return hasClass(e, "_im_bar_date")
                        });
                        j.parseMore(h, n), Object(i.K)(t)
                    }
                },
                sendMessage: function(e) {
                    0 !== e.get().peer && u.sendMessage()
                },
                editMessage: function(e, r) {
                    if (Object(i.ob)(e, r.peerId) && Object(i.ub)(r.peerId, e.get())) {
                        if (!Os(t, r.messageId)) return;
                        Ts(e, n), Object(i.J)(e.get(), r, t), xs(Object(a.t)(e, r.peerId), n), l.reRenderPinned(e), j.reset(n)
                    }
                },
                addMessage: function(e, s) {
                    if (!Object(r.Y)(s.peerId, e.get()) && Object(i.ob)(e, s.peerId) && Object(i.ub)(s.peerId, e.get())) {
                        if (Os(t, s.messageId)) return;
                        var c = Es(t);
                        zs(j, c, n, function() {
                            var r = Rs(n),
                                l = geByClass1("_im_unread_bar_row", t),
                                u = Object(i.tb)(e, t, n),
                                d = Wo(u, 2),
                                m = d[0],
                                p = d[1];
                            Object(i.x)(e.get(), s, c, !0, !0, !m && !l), removeClass(t, "im-page--history_empty-hist");
                            var g = Object(a.t)(e, e.get().peer),
                                h = Object(o.l)(s) && s.userId === vk.id,
                                b = s.kludges && s.kludges.source_act,
                                _ = h && b !== i.f && b !== i.h;
                            g.skipped || m || !Object(o.n)(g, s) || Object(o.k)(s) || Hs(e, t, !0, p), (s.local || r || _) && n.scrollBottom(0), f().updateTyping(s.peerId, e), Gs(t)
                        });
                        var l = domPS(domLC(c));
                        if (hasClass(l, "_im_bar_date")) {
                            var u = ce("div");
                            u.innerHTML = l.outerHTML, j.parseMore(u, n)
                        }
                        f().hideError(), j.update(n), Object(r.ad)(e.get()), Js(e, s.peerId, n.scrollBottom(), 0, f)
                    }
                },
                setMessageErrored: function(e, n, r, a) {
                    r && f().showError(r), Object(i.kc)(e, n, t)
                },
                markMessagesAsRead: function(e, n) {
                    e.get().peer === n.peerId && Object(i.Jb)(e.get(), n.peerId, t)
                },
                compensateHistoryHeightChange: function(e) {
                    n.scrollTop(n.scrollTop() + e * ys(_.get(), _.get().peer))
                },
                updateTyping: function(e, n) {
                    if (!Object(r.Y)(e, n.get())) {
                        var o = n.get();
                        if (o.peer === e && Object(i.ob)(o, e)) {
                            var s = Object(i.O)(Object(a.t)(n, e).activity, e, !1, o),
                                c = geByClass1(i.v, t);
                            if (c || s) {
                                if (!c) {
                                    var l = geByClass1(ns, t);
                                    val(l, getTemplate("im_typing", {
                                        cls: Object(i.ib)(n) ? "im-activity_classic" : ""
                                    })), c = geByClass1(i.v, t)
                                }
                                val(geByClass1("_im_typing_name", c), s);
                                var u = Object(i.Hb)(Object(a.t)(n, e).activity || {}) === r.c;
                                c.setAttribute("data-activity-type", u ? "recording" : "typing"), s ? (addClass(c, "im-page--typing_vis"), f().hideError()) : removeClass(c, "im-page--typing_vis")
                            }
                        }
                    }
                },
                scrollFix: function(e, t, r) {
                    j.heightIncreased(r, n), j.update(n), Object(i.ub)(t, e.get()) && Rs(n, r) && n.scrollBottom(Vo)
                },
                goToEnd: function() {
                    var e = this;
                    qs(function() {
                        return e
                    }, _, t, n)
                },
                updateGoToEnd: function(e, r) {
                    var i = Object(a.t)(e, e.get().peer);
                    i && i.skipped ? Hs(e, t) : Vs(e, t, r), b(0, n, !1);
                    var o = e.get().peer;
                    setTimeout(function() {
                        e.get().peer === o && Ts(e, n)
                    })
                },
                newMessage: function(e) {
                    m().newMessage(e), Vs(e, t, !0)
                },
                scroll: function(e, t) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (0 !== e.get().peer) {
                        var a = r ? n.getScrollHeight() : 40;
                        !0 === i && (a = n.contHeight()), a = "up" === t ? -a : a, r || i ? k(a, function() {
                            b(a, n)
                        }) : (n.scrollTop(n.scrollTop() + a), b(a, n))
                    }
                },
                showCreation: function(e, t) {
                    m().showCreation(e, t)
                },
                updateScroll: function() {
                    return Us(_, n, t)
                },
                toggleBarDate: function(e) {
                    j.toggle(e)
                },
                changedMessageSelection: function(e) {
                    l.changedMessageSelection(e)
                },
                updateOnline: function(e, t) {
                    Object(i.Bb)(t.get(), e) && e === t.get().peer && l.renderPeer(t)
                },
                isEmpty: function(e) {
                    return u.isEmpty(e)
                },
                replaceAttachmentPlaceholders: function(e, r) {
                    if (Object(i.ub)(r.peerId, e.get())) zs(j, Es(t), n, function() {
                        var o = Rs(n);
                        Object(i.dc)(t, r, e.get());
                        var s = Object(a.t)(e, r.peerId);
                        if (s.mediacontent[r.messageId].length >= 3 && s.mediacontent[r.messageId][2].pinned) {
                            var c = Object(a.P)(s.pinned);
                            c && c.messageId == r.messageId && (s.pinned = s.mediacontent[r.messageId][2].pinned, l.reRenderPinned(e))
                        }
                        o && n.scrollBottom(0)
                    }), j.update(n);
                    else if (Object(o.j)(r)) {
                        var s = Object(a.t)(e, r.peerId);
                        if (s.mediacontent[r.messageId].length >= 3 && s.mediacontent[r.messageId][2].pinned) {
                            var c = Object(a.P)(s.pinned);
                            c && c.messageId == r.messageId && (s.pinned = s.mediacontent[r.messageId][2].pinned)
                        }
                    }
                },
                removeMessages: function(e, r, a) {
                    a.get().peer === r && (Object(i.Mb)(e, Es(t)), Us(a, n, t), l.changedMessageSelection(a))
                },
                removeStartingFromMessage: function(e, r, a) {
                    if (a.get().peer === r) {
                        var o = Es(t),
                            s = geByClass1("_im_mess_" + e, o);
                        Object(i.Ob)(s, o), Us(a, n, t), l.changedMessageSelection(a)
                    }
                },
                hideGoToEnd: function(e) {
                    Vs(_, t, e)
                },
                removeMessagesRestore: function(e, n, r, a) {
                    a.get().peer === n && Object(i.Nb)(e, n, r, Es(t))
                },
                updateState: function(e, t) {
                    m().updateState(e, t)
                },
                updateBanner: function(e) {
                    O.renderPeer(e)
                },
                updateChat: function(e, t) {
                    e.get().peer === t && (l.changeActions(e), l.renderPeer(e), l.renderActions(e), O.renderPeer(e), u.updateState(e), Object(r.ad)(e.get()))
                },
                focustTxt: function(e) {
                    u.focusOn(e)
                },
                startSearch: function(e) {
                    f().showSearch(e), p.changePeer(e.get().peer, e), p.search()
                },
                showSearch: function(e) {
                    addClass(t, "im-page--hisory_search-open"), e.setState({
                        searchShown: !0
                    }), _s(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(function() {
                        return p.focus(e)
                    }, 10)
                },
                cancelSearch: function(e) {
                    var a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (e.get().searchShown && (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                            searchShown: !1
                        }), _s(e) && this.updateChatTopic(e.get().peer, e), l.changedMessageSelection(e)), a && !Object(i.yb)(e.get().peer) && w) {
                        var o = e.get().tabs[e.get().peer];
                        Es(t).innerHTML = Object(r.Bc)(o.history), Us(e, n, t), n.scrollBottom(0), e.get().msgid && (Ds(n, t, e.get().msgid, e), Hs(e, t)), v(n), j.reset(n)
                    }
                    w && (w.unmount(), w = !1, Object(i.K)(t))
                },
                updateHistory: function(e) {
                    0 !== _.get().peer && e(t)
                },
                focusOnMessage: function() {
                    Ds(n, t, _.get().msgid, _)
                },
                sendEditMessage: function(e, t) {
                    e.set(r.C.bind(null, Object(a.t)(e, t.peerId), t)).catch(function(n) {
                        return e.get().longpoll.push([Object(c.kb)(t.peerId, t, n)])
                    })
                },
                unmount: function() {
                    Object(s.c)(e), n.destroy(), clearInterval(y), u.unmount(), l.unmount(), g.unmount(), h.unmount(), p.unmount(), cancelStackFilter("forward"), ks("_im_chat_resize_track", t)
                },
                removePeer: function(e, t) {
                    m().removePeer(e, t)
                },
                restoreScroll: function(e, t) {
                    var r = e.get().tabs[t];
                    r.scrollBottom ? xs(r, n) : n.scrollBottom(Vo)
                },
                resendMessage: function(e, n) {
                    e === _.get().peer && Object(i.Dc)(e, n, t)
                },
                respond: function(e, t) {
                    u.attachMessages(e, t), u.focusOn(e);
                    var r = Object(a.t)(e, t);
                    r && !r.skipped && (n.scrollBottom(Vo), v(n))
                },
                cancelRecording: function() {
                    u.cancelRecording()
                },
                hideError: function() {
                    hide(geByClass1(is, t))
                },
                showError: function(e) {
                    geByClass1(is, t).innerHTML = e, show(geByClass1(is, t)), n.scrollBottom(Vo)
                },
                startEditing: function(e) {
                    if (Object(r.V)(_.get())) Object(i.Ac)();
                    else {
                        e = Object(a.P)(e);
                        var n = Object(i.X)(_);
                        if (!(u.isBlocked() || n && n.messageId == e.messageId)) {
                            n && this.cancelEditing(), Gs(t), _.get().searchShown && this.cancelSearch(_);
                            var o = Os(t, e.messageId);
                            o && (this.cancelRecording(), function(e, t, n, r, i) {
                                e.setState({
                                    isEditing: !0
                                }), n.saveText(e), addClass(r, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", function() {
                                    return Xs(e, t, n, r)
                                });
                                var a = new on.a;
                                a.dData.txt = Object(Vi.b)(i.text), a.dData.attaches = Object(Qi.a)(i.kludges, i.messageId), n.toggleStickers(e, !1), n.setDraft(e, a), setTimeout(function() {
                                    return n.focusOn(e)
                                }, 0)
                            }(_, t, u, o, e), u.hideKeyboard(), l.deselectAll(_))
                        }
                    }
                },
                cancelEditing: function() {
                    var e = Object(i.X)(_);
                    e && Xs(_, t, u, Os(t, e.messageId))
                },
                getEditingMessage: function() {
                    return Object(i.X)(_)
                },
                focusEditingMessage: function() {
                    var e = Object(i.X)(_);
                    e && Ds(n, t, e.messageId, _), u.focusOn(_)
                }
            }
        }

        function $s(e, t, n, l, u) {
            var d = geByClass1("_im_peer_history_w", e);
            show(d), hasAccessibilityMode() && addClass(d, "history_a11y");
            var f, m, p, g = Object(s.b)(Zs),
                _ = g.callMutations,
                v = g.bindMutations,
                y = (f = Ts.bind(null, t), m = debounce(f, 100), p = throttle(f, 100), function(e) {
                    m(e), p(e)
                }),
                j = Lo(t, e),
                O = Ms.bind(null, t, _, d, y, j, e),
                w = Object(b.a)(geByClass1("_im_chat_body_abs", e), {
                    onScroll: O,
                    nativeScroll: Object(i.ib)(t),
                    shadows: !1
                });
            setTimeout(function() {
                t.get().peer && (Qs(t), (Object(a.g)(t).pinned || Object(a.g)(t).top_banner) && (_().updateChatTopic(t.get().peer, t), t.set(r.oc), k.changeActions(t)), t.get().msgid ? Ds(w, e, t.get().msgid, t) : Bs(w, e, _, t, j) || w.scrollBottom(Vo), t.get().history_init = !1, j.reset(w), Hs(t, e), Ms(t, _, d, y, j, e, 0, w), Object(i.K)(e), nav.objLoc.st && (t.mutate(r.vc.bind(null, nav.objLoc.st, t.get().peer)), _().startSearch(t)))
            }, 15);
            var k = or(geByClass1("_im_dialog_actions", e), t, _),
                C = Ga(geByClass1("_im_text_input", e), t, Object(i.ib)(t) ? l.updateMenu : void 0, function(e, t) {
                    n.removeDialog(e, t), n.restoreDialogs(e, !0)
                }, _),
                S = oo(geByClass1("_im_dialog_actions", e), t, _),
                E = po(e, t, _),
                x = _o(e, t, function() {
                    return {
                        changedMessageSelection: k.changedMessageSelection
                    }
                });
            Object(Oe.b)(e, t, _);
            var I = zo(e, t, function() {
                return {
                    hidePinned: function() {
                        Object(Oe.c)(t, t.get().peer, _, !1)
                    },
                    compensateHistoryHeightChange: function(e) {
                        _().compensateHistoryHeightChange(e)
                    },
                    showPinned: function() {
                        Object(Oe.d)(t, t.get().peer, _, !1)
                    }
                }
            });
            Object(i.yb)(t.get().peer) || t.set(r.Vb.bind(null, t.get().peer)).then(function() {
                Object(i.hc)(t.get().peer, t.get(), Es(e)), Ss(e, t, t.get().peer)
            }), ws("_im_chat_resize_track", e, u);
            var T = function(e, t, n, r, i) {
                    var o = domData(i, "msgid"),
                        s = e.get().peer,
                        l = Object(a.m)(e, s, o);
                    l.type === c.g ? (n().sendEditMessage(e, l), n().resendMessage(s, o)) : e.get().imQueueResend(s, o).then(function(t) {
                        e.get().longpoll.push([Object(c.xb)(s, t.mess)])
                    })
                }.bind(null, t, e, _),
                P = function(e, t, n, a, o) {
                    var s = intval(domData(o, "peer")),
                        c = intval(domData(gpeByClass("_im_mess", o), "msgid")),
                        l = e.get().tabs[s].hash;
                    return Object(r.Xb)(c, s, l, e.get().gid), e.set(r.Wb.bind(null, c, s)).then(i.gc.bind(null, c, s, Es(t))).then(function() {
                        return Us(e, n, t)
                    }), !1
                }.bind(null, t, e, w),
                M = function(e, t) {
                    e().showCreation(t)
                }.bind(null, u, t),
                L = qs.bind(null, _, t, e, w),
                B = function(e, t, n, r) {
                    if (hasClass(n.target, "_im_mess_marker")) {
                        var a = n.target;
                        window.tooltips && Object(h.q)(geByClass(i.l, t)).map(function(e) {
                            return geByClass1("_im_mess_marker", e)
                        }).filter(function(e) {
                            return e !== a
                        }).forEach(function(e) {
                            return tooltips.hide(e, {
                                fasthide: !0
                            })
                        });
                        var o = domData(r, "msgid");
                        showTooltip(a, {
                            content: getTemplate("im_failed_menu", {
                                id: o
                            }),
                            className: "im-page--failed-tt" + (o > 0 ? " no_delete" : ""),
                            appendParentCls: "_chat_body_wrap",
                            dir: "down",
                            noZIndex: !0,
                            shift: [12, 8],
                            hasover: !0
                        })
                    }
                }.bind(null, t, e),
                D = i.nc.bind(null, t),
                N = i.sc.bind(null, t),
                A = function(e, t, n, a, o) {
                    var s = domData(o, "action"),
                        c = domData(o, "msgid"),
                        l = geByClass1("_im_mess_marker", Os(n, c)),
                        u = Number(c) > 0 ? "edit" : "send";
                    switch (s) {
                        case "resend":
                            Object(ye.j)("retry", u), t(a, o);
                            break;
                        case "delete":
                            Object(ye.j)("delete", u), e.set(r.Jb.bind(null, e.get().peer, c)).then(function() {
                                Object(i.Mb)([c], Es(n))
                            })
                    }
                    tooltips.hide(l, {
                        fasthide: !0
                    })
                }.bind(null, t, T, e),
                H = function(e, t, n, i, a) {
                    if (checkEvent(i)) return !0;
                    var o = q2ajx(a.getAttribute("href")),
                        s = intval(o.msgid);
                    s && e.set(r.p.bind(null, e.get().peer, s, !1)).then(function() {
                        return Ds(n, t, s, e)
                    }), cancelEvent(i)
                }.bind(null, t, e, w),
                R = function(e, t, n) {
                    je.a.isFullscreen || 0 === t.get().peer || Object(i.ib)(t) || e().restoreScroll(t, t.get().peer)
                }.bind(null, _, t, w),
                F = function(e, t) {
                    var n = e.get(),
                        s = n.peer,
                        c = domClosest(us, t.target),
                        l = intval(domData(c, "msgid")),
                        u = Object(a.m)(e, s, l),
                        d = u && Object(o.l)(u) && u.kludges.source_act;
                    if (d === i.f || d === i.h) {
                        var f = c.querySelector("." + ds);
                        if (f && "A" !== f.tagName) {
                            var m = u.kludges.source_chat_local_id;
                            if (!m || bs[m]) return;
                            bs[m] = Object(r.N)(s, m, n).then(function(e) {
                                var t = Wo(e, 1)[0];
                                if (t) {
                                    var n = "/im?sel=" + Object(i.H)(s) + "&msgid=" + t,
                                        r = f.innerHTML;
                                    domReplaceEl(f, Object(i.ic)(n, r, !0, ds)), delete bs[m]
                                }
                            })
                        }
                    }
                }.bind(null, t),
                q = function(e, t, n) {
                    var r = e.get(),
                        o = r.peer,
                        s = n.target.href && n.target.href.match(/msgid=([\d]+)/),
                        l = s && s[1];
                    "A" !== n.target.tagName || !l || Object(i.fb)(e, o, l) || checkEvent(n) || (Object(a.m)(e, o, l) ? (e.setState({
                        msgid: l
                    }), Object(Bo.b)({
                        msgid: l
                    }), t().focusOnMessage()) : r.longpoll.push([Object(c.bb)(o, l)])), cancelEvent(n)
                }.bind(null, t, _),
                U = function(e, t, n, r) {
                    var a = r.target,
                        o = domClosest(ps, a),
                        s = Number(o.getAttribute("data-msgid")),
                        c = domClosest("im-mess", a),
                        l = Number(c.getAttribute("data-msgid")),
                        u = e.get().peer;
                    s && !Object(i.fb)(e, u, s) ? (e.setState({
                        msgid: s
                    }), Object(Bo.b)({
                        msgid: s
                    }), Object(i.M)(e, t().focusOnMessage, u, s)) : l && Object(i.vc)(e, l, r)
                }.bind(null, t, _, e),
                z = Object(s.a)({
                    handlers: function(n, o) {
                        o(e, "click", i.s, P), o(e, "mouseover click", i.l, B), o(e, "mouseover", "_im_edit_time", D), o(e, "mouseover", "_im_page_info", N), o(e, "click", "_im_mess_susp", function(e, t) {
                            var n = intval(domData(t.target, "msgid")),
                                r = gpeByClass("_im_mess_" + n, t.target),
                                i = geByClass1("_im_log_body", r),
                                a = geByClass1("_im_mess_susp_cont", r);
                            i.innerHTML = a.innerHTML
                        }.bind(null, e)), o(e, "click", $o, A), o(e, "click", es, H), o(e, "mouseover", ts, Ws), o(e, "mouseover", us, F), o(e, "click", ds, q), o(e, "click", is, Cs), o(e, "click", ps, U), o(e, "click", gs, Ys), o(e, "click", fs, function(e, n) {
                            if (checkEvent(e)) return !0;
                            if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                            var a = geByClass1("flat_button", n),
                                o = {
                                    invite_chat_id: domData(a, "inv-id"),
                                    invite_hash: domData(a, "hash")
                                };
                            Object(i.qc)(t, o, r.db), cancelEvent(e)
                        }), o(e, "click", as, function() {
                            return t.get().longpoll.push([Object(c.Ab)()])
                        }), o(e, "click", os, function(e) {
                            return function(e, t, n) {
                                var o = e.get(),
                                    s = domClosest(ms, n.target),
                                    c = domData(s, "msgid"),
                                    l = Object(a.m)(o, o.peer, c),
                                    u = function(e) {
                                        return t().replaceAttachmentPlaceholders(e, l)
                                    };
                                l && (Object(ye.j)("retry_attach"), e.set(r.g.bind(null, l, [Object(i.Vb)(e, l)])).then(u), e.set(r.pb.bind(null, l)).then(u))
                            }(t, _, e)
                        }), n(geByClass1("_im_peer_history_w", e), "mousemove", j.show), n(geByClass1("_im_start_new", e), "click", M), n(geByClass1(Zo, e), "click", L), n(geByClass1("_im_cancel_edit", e), "click", function() {
                            return _().cancelEditing(), !1
                        }), n(geByClass1("_im_edit_focus_cur", e), "click", function() {
                            return _().focusEditingMessage(), !1
                        }), je.a.raw && n(document, je.a.raw.fullscreenchange, R), n(window, "im_goToMessage", function(e) {
                            var n = intval(e.msgid);
                            if (n) return window.statlogsValueEvent("im_links_to_attachments", 1, "to_message"), t.set(r.p.bind(null, e.sel, n, !1)).then(function() {
                                return Object(i.M)(t, _().focusOnMessage, t.get().peer, n)
                            })
                        })
                    }
                });
            curNotifier.recvClbks.pin_hide = [function(e) {
                e.hide ? Object(Oe.c)(t, e.peer, _, !1) : Object(Oe.d)(t, e.peer, _, !1)
            }], window.showForwardBox = function(e) {
                return function(e, t) {
                    Object(i.A)(showBox("al_im.php", t, {
                        dark: 1
                    }), e)
                }(t, e)
            };
            var W = setInterval(Ns.bind(null, t, e, k), 1e4);
            return v(z, e, w, k, C, _, u, S, E, x, O, t, y, W, j, I)
        }
        var ec = function() {
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
            tc = [],
            nc = 0,
            rc = !1;

        function ic(e) {
            tc = tc.reduce(function(t, n) {
                var r = ec(n, 2),
                    i = r[0],
                    a = r[1];
                return a(e) ? t : t.concat([
                    [i, a]
                ])
            }, [])
        }
        var ac = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return nc++, {
                    stop: function() {
                        nc--,
                        function(e) {
                            tc = tc.filter(function(t) {
                                return ec(t, 1)[0] !== e
                            }), 0 === nc && (document.body.removeEventListener("click", ic, !0), rc = !1)
                        }(e)
                    },
                    replaceOrAdd: function(n) {
                        var r = tc.filter(function(t) {
                                var n = ec(t, 1)[0];
                                return e === n
                            }),
                            i = function(e, t) {
                                return 0 === t.length ? function(t) {
                                    return e(t), !0
                                } : function(n) {
                                    var r = t.reduce(function(e, t) {
                                        return e && !domClosest(t, n.target)
                                    }, !0);
                                    return r && e(n), r
                                }
                            }(n, t);
                        r.length > 0 ? function(e, t) {
                            tc = tc.map(function(n) {
                                var r = ec(n, 2),
                                    i = r[0],
                                    a = r[1];
                                return i === e ? [e, t] : [i, a]
                            })
                        }(e, i) : function(e, t) {
                            !1 === rc && (rc = !0, document.body.addEventListener("click", ic, !0)), tc = tc.concat([
                                [e, t]
                            ])
                        }(e, i)
                    }
                }
            },
            oc = function() {
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

        function sc(e, t, n, a) {
            var o = ge("box_layer_wrap"),
                l = t.get().longpoll,
                u = g({
                    peer: 0,
                    longpoll: l,
                    oCache: {},
                    tabs: Object(i.Ec)(a.msgs, a.hash)
                }),
                f = po(e.bodyNode, u, function() {
                    return {}
                }),
                m = d(e.bodyNode, t);
            Object(i.K)(e.bodyNode);
            var p = function(e, t, n) {
                for (var i = arguments.length, a = Array(i > 3 ? i - 3 : 0), o = 3; o < i; o++) a[o - 3] = arguments[o];
                a.filter(function(e) {
                    return inArray(e.type, [c.U, c.Q, c.b])
                }).forEach(function(i) {
                    if (i.type !== c.b) {
                        if (i.flags === c.l) {
                            var a = i.type === c.U;
                            e.set(r.Uc.bind(null, [i.messageId], 0, a)).then(function(n) {
                                t.markImportant(i.messageId, a, e)
                            })
                        }
                    } else n.hide()
                })
            }.bind(null, t, f, e);
            l.onData(p);
            var h = function(e, t, n, a) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var o = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(i.Lc)(o)(Object(r.kb)(e.offset).then(function(t) {
                            var n = oc(t, 4),
                                s = (n[0], n[1]),
                                c = (n[2], n[3]);
                            e.all = c.all, e.offset = c.offset, e.all ? addClass(o, "im-important_all") : e.loading = !1, a.set(r.yb.bind(null, Object(i.Ec)(c.msgs, c.hash)));
                            var l = ce("div");
                            l.innerHTML = s, o.appendChild(l), Object(i.K)(o)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: !1,
                    loading: a.all,
                    offset: a.offset
                }, e, o, u),
                b = Object(s.a)({
                    handlers: function(e, t) {
                        e(o, "scroll", h)
                    }
                });
            return {
                unmount: function() {
                    Object(s.c)(b), m.unmount(), f.unmount(), l.offData(p)
                }
            }
        }
        var cc = n("XzvV"),
            lc = function() {
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
            uc = debounce(L.b, 1e3),
            dc = "_im_important_counter",
            fc = "_im_gim_mute";

        function mc(e) {
            return ge("im_dialogs_search", e)
        }

        function pc(e, t, n, i, o, s) {
            var c = trim(s);
            if (Object(a.M)(e, c)) {
                var l = _c.bind(null, e, n, o, t);
                c ? (e.setState({
                    recentSearch: !1
                }), o.stop()) : o.replaceOrAdd(l), cancelStackPush("im_search", l), c && e.set(r.rc.bind(null, c, !1)).then(t), addClass(i, "im-page--dialogs-search_fill"), addClass(i, "_im_d_search")
            } else c || (o.stop(), e.set(r.rc.bind(null, "", !1)).then(t), removeClass(i, "im-page--dialogs-search_fill"), removeClass(i, "_im_d_search"))
        }

        function gc(e, t, n) {
            return function() {
                Object(a.r)(t) === e && n.apply(void 0, arguments)
            }
        }

        function hc(e, t, n) {
            var i = Object(a.r)(n);
            return uc(.01, "im_search_stat", 1, "search_start"), Object(r.cd)(i), n.setState({
                recentSearch: !1
            }), e().toggleSettingsButton(n, !!i), i ? (n.get().dialog_search_going = !0, function(e, t, n) {
                var i = gc(e, n, t().appendFastDialogs.bind(null, n));
                return Object(r.ic)(e, n.get()).then(function(e) {
                    return i(e), e
                })
            }(i, e, n).then(function(r) {
                var a = r.map(function(e) {
                    return e.peerId
                });
                return t(i, e, a, n)
            }).then(function(e) {
                n.get().dialog_search_going = !1
            }).catch(function() {})) : (e().restoreDialogs(n, !1, !0), Object(cc.b)("messages"), Promise.resolve(!1))
        }

        function bc(e, t, n, a) {
            var o = a.get(),
                s = gc(e, a, t().appendDialogs.bind(null, a)),
                c = gc(e, a, t().appendSearch);
            return Object(i.xb)(a) ? Object(r.cc)(e, n, "all", {}, o).then(s) : Promise.all([Object(r.cc)(e, n, "all", {}, o).then(s), Object(r.gc)(e, o)]).then(function(e) {
                var t = lc(e, 2),
                    n = lc(t[1], 2),
                    r = n[0],
                    i = n[1];
                c(a, r, i, !0)
            })
        }

        function _c(e, t, n, r) {
            cancelStackFilter("im_search");
            var i = mc(t);
            uiSearch.reset(i), e.setState({
                recentSearch: !1
            }), pc(e, r, t, i, n, i.value)
        }

        function vc(e, t) {
            return showTooltip(t, {
                appendEl: bodyNode,
                text: function() {
                    return Object(a.L)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion")
                },
                black: 1,
                shift: [3, -1],
                appendCls: "js-im-page"
            })
        }

        function yc(e, t, n) {
            var i = n.target;
            e.set(r.Hc.bind(null, t)).then(function() {
                toggleClass(i, "im-page--gim-mute_muted", e.get().mute), t && jc(e, {
                    target: i
                })
            })
        }

        function jc(e, t) {
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

        function Oc(e, t, n, r, i, a) {
            return {
                focusInput: function(t) {
                    uiSearch.focus(mc(e).parentNode)
                },
                createCanceled: function(e, n) {
                    removeClass(t, "im-dialog-select_rotated")
                },
                rotateCross: function(e) {
                    addClass(t, "im-dialog-select_rotated")
                },
                setSearch: function(t, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    ! function(e, t, n, r, i) {
                        var a = mc(t);
                        a.value = i, pc(e, r, t, a, n, a.value)
                    }(t, e, r, i ? a : function() {}, n)
                },
                clearSearch: function(t) {
                    _c(t, e, r, function() {})
                },
                updateImportantCnt: function(t) {
                    var n = t.get().important_cnt,
                        r = geByClass1(dc, e);
                    toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
                },
                unmount: function() {
                    r.stop(), Object(s.c)(i), uiSearch.destroy(n), cancelStackFilter("im_search")
                }
            }
        }

        function wc(e, t, n) {
            var o = geByClass1("_im_search_croll", e),
                l = mc(e),
                u = ac("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
                d = Object(ft.b)(bc, 300),
                f = hc.bind(null, n, d),
                m = pc.bind(null, t, f, e, l, u),
                p = function(e, t, n, r, i, o) {
                    Object(a.L)(e) ? (_c(e, t, i, n), setTimeout(function() {
                        return vc(e, o)
                    }, 10)) : (window.tooltips && tooltips.hide(o, {
                        showsp: 0
                    }), function(e, t, n) {
                        n().showCreation(e)
                    }(e, 0, r))
                }.bind(null, t, e, f, n, u, o),
                g = function(e, t, n, r, a) {
                    return Object(i.oc)(e, n, sc, r)
                }.bind(null, t, e, n),
                h = geByClass1("_im_dialogs_search_input", e);
            uiSearch.init(h, {
                onChange: m
            });
            var b = vc.bind(null, t, o),
                _ = geByClass1(fc, e);
            l.value && m(l.value);
            var v = Object(s.a)({
                handlers: function(s, d) {
                    if (s(geByClass1("_im_av_time", e), "mouseover", function(e) {
                            showTooltip(e.target, {
                                text: getLang("mail_admin_av_time"),
                                dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                                shift: [0, 8]
                            })
                        }), s(o, "click", p), s(o, "mouseover", b), s(geByClass1(dc, e), "click", g), Object(i.ib)(t)) {
                        var f = yc.bind(null, t, !0),
                            m = jc.bind(null, t);
                        s(_, "click", f), s(_, "mouseover", m)
                    }
                    s(l, "focus", function() {
                        t.get().longpoll.push([Object(c.Eb)("search")])
                    }), s(l, "click", function() {
                        Object(a.L)(t) && n().toggleSettingsButton(t, !0),
                            function(e, t, n, o, s) {
                                if (!Object(a.L)(e)) {
                                    var c = cur.imDb.select(Do.b);
                                    if (0 !== c.length || Object(a.c)(e)) {
                                        e.setState({
                                            recentSearch: !0
                                        }), pc(e, function() {
                                            Object(a.L)(e) || (o.stop(), s().toggleSettingsButton(e, !1), s().restoreDialogs(e, !1, !0))
                                        }, t, n, o, "");
                                        var l = c.filter(function(t) {
                                                return !Object(i.Cb)(e.get(), t)
                                            }),
                                            u = c.filter(function(t) {
                                                return Object(i.Cb)(e.get(), t)
                                            }).reduce(function(t, n) {
                                                return t[n] = Object(a.t)(e, n), t
                                            }, {});
                                        e.get().topConvTree.then(function(t) {
                                            var n = t.list.filter(function(e) {
                                                    return inArray(e[0], l)
                                                }).reduce(function(e, t) {
                                                    return e[t[0]] = Object(r.ub)(t), e
                                                }, {}),
                                                i = extend({}, n, u);
                                            return s().appendFastDialogs(e, c.map(function(e) {
                                                return i[e]
                                            })), Object(r.cc)(!1, Object.keys(n), !1, {}, e.get())
                                        }).then(function(t) {
                                            s().appendDialogs(e, t)
                                        })
                                    }
                                }
                            }(t, e, l, u, n)
                    }), s(l, "blur", function() {
                        var e = void 0;
                        e = 0 === t.get().peer ? "search" : Object(i.xb)(t) ? "search" : "default", Object(a.L)(t) || n().toggleSettingsButton(t, !1), t.get().longpoll.push([Object(c.Eb)(e)])
                    })
                }
            });
            return Object(i.ib)(t) && yc(t, !1, {
                target: _
            }), Oc(e, o, h, u, v, f)
        }
        var kc = function() {
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
            Cc = "_im_spam_not_spam",
            Sc = "_im_spam_spam";

        function Ec(e, t) {
            var n = t.get().selectedMessages,
                r = geByClass1("_im_spam_box", e.bodyNode),
                a = geByClass1("ui_tab_sel", e.bodyNode);
            if (n.length > 0) {
                var o = getLang("mail_selected", n.length);
                o = o.replace("{count}", n.length), val(a, o + '<button aria-label="' + getLang("mail_deselect_all") + '" type="button" class="im-deselect ' + i.k + '"></button>')
            } else val(a, getLang("mail_spam"));
            0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(Cc), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(Sc), getLang("mail_im_mark_delspam", n.length)))
        }

        function xc(e, t, n) {
            var i = e.get().selectedMessages;
            e.set(r.t).then(n.cleanSelection.bind(null, i)).then(function(n) {
                return Ec(t, e)
            })
        }

        function Ic(e, t) {
            return {
                unmount: function() {
                    t.unmount(), Object(s.c)(e)
                }
            }
        }

        function Tc(e, t, n) {
            var a = ge("box_layer_wrap"),
                o = Object(s.b)(Ic),
                l = o.callMutations,
                u = o.bindMutations,
                d = g({
                    peer: 0,
                    oCache: {},
                    tabs: Object(i.Ec)(n.msgs, n.hash),
                    gid: t.get().gid
                }),
                f = function(e, t, n, a) {
                    if (!e.loading && !e.all && n.scrollTop + window.innerHeight - n.scrollHeight > -300) {
                        var o = geByClass1("_im_peer_history", t.bodyNode);
                        e.loading = !0, Object(i.Lc)(o)(Object(r.tb)(e.offset, a.get().gid).then(function(t) {
                            var n = kc(t, 4),
                                s = (n[0], n[1]),
                                c = (n[2], n[3]);
                            e.all = c.all, e.offset = c.offset, e.all ? addClass(o, "im-important_all") : e.loading = !1, a.set(r.yb.bind(null, Object(i.Ec)(c.msgs, c.hash)));
                            var l = ce("div");
                            l.innerHTML = s, o.appendChild(l), Object(i.K)(o)
                        }), "bottom")
                    }
                }.bind(null, {
                    all: n.all,
                    loading: !1,
                    offset: n.offset
                }, e, a, d),
                m = function(e, t, n, a) {
                    var o = gpeByClass("_im_mess", a, t);
                    if (o) {
                        var s = intval(domData(o, "msgid"));
                        o && (Object(r.Lb)([s], 0, e.get().tabs[0].hash, "undel", e.get()), Object(i.gc)(s, 0, t))
                    }
                }.bind(null, d, e.bodyNode),
                p = function(e, t, n, r, i) {
                    var a = gpeByClass("_im_mess", i, t.bodyNode),
                        o = intval(domData(a, "peer")),
                        s = intval(domData(a, "msgid"));
                    return t.hide(), n().unmount(), e.get().longpoll.push([Object(c.bb)(o, s)]), stopEvent(r), cancelEvent(r), !1
                }.bind(null, t, e, l),
                h = function(e, t, n, i) {
                    var a = showFastBox({
                        title: getLang("mail_deleteall1"),
                        dark: 1,
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, getLang("mail_delete_all_spam"), getLang("mail_delete"), function() {
                        Object(r.J)(e, i).then(function(e) {
                            var t = kc(e, 2),
                                n = (t[0], t[1]);
                            showDoneBox(n)
                        }), a.hide(), t.hide(), n().unmount()
                    }, getLang("mail_close"), function() {
                        return a.hide()
                    })
                }.bind(null, n.hash, e, l, t.get().gid),
                b = _o(e.bodyNode, d, function(t) {
                    return {
                        changedMessageSelection: Ec.bind(null, e)
                    }
                }),
                _ = function(e, t, n) {
                    var a = e.get().selectedMessages;
                    Object(r.Lb)(a, 0, e.get().tabs[0].hash, "delete", e.get()), Object(i.Nb)(a, 0, "delete", t), xc(e, t, n)
                }.bind(null, d, e.bodyNode, b),
                v = function(e, t, n) {
                    var a = e.get().selectedMessages;
                    Object(r.Lb)(a, 0, e.get().tabs[0].hash, "nospam", e.get()), a.map(function(e) {
                        return geByClass1("_im_mess_" + e)
                    }).filter(function(e) {
                        return e
                    }).forEach(function(e) {
                        var t = intval(domData(e, "peer")),
                            n = intval(domData(e, "msgid"));
                        val(e, Object(i.Ub)(t, n)), addClass(e, "im-mess_light")
                    }), xc(e, t, n)
                }.bind(null, d, e.bodyNode, b),
                y = xc.bind(null, d, e, b);
            return Object(i.K)(e.bodyNode), u(Object(s.a)({
                handlers: function(t, n) {
                    t(a, "scroll", f), t(geByClass1(Sc, e.bodyNode), "click", _), t(geByClass1(Cc, e.bodyNode), "click", v), t(geByClass1("_im_spam_flush", e.bodyNode), "click", h), n(e.bodyNode, "click", "_im_mess_restore", m), n(e.bodyNode, "click", "_im_go_to", p), n(e.bodyNode, "click", i.k, y)
                }
            }), b)
        }
        var Pc = "_im_dialogs_cog_settings",
            Mc = "_im_settings_action",
            Lc = "_im_to_unread";

        function Bc() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings";
            return getTemplate(e, {
                sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
                browser: Dc() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off")
            })
        }

        function Dc() {
            return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
        }

        function Nc(e, t, n) {
            var o = function(e, t) {
                    showTooltip(t.target, {
                        content: Bc("im_settings_pop"),
                        dir: "down",
                        shift: [220, 9],
                        hasover: !0,
                        showdt: 300
                    })
                }.bind(null, t),
                c = function(e, t, n, r, a) {
                    var o = domData(a, "action"),
                        s = gpeByClass("_im_settings_menu", a),
                        c = hasClass(s, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
                    switch (o) {
                        case "spam":
                            Object(i.wc)(e, Tc, r);
                            break;
                        case "sound":
                            ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), s.outerHTML = Bc(c);
                            break;
                        case "browser":
                            Dc() ? (ls.set("im_ui_notify_off", 1), s.outerHTML = Bc(c), Object(ye.a)()) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(function() {
                                s.parentNode && (s.outerHTML = Bc(c))
                            }) : (ls.set("im_ui_notify_off", 0), s.outerHTML = Bc(c), Object(ye.b)())
                    }
                }.bind(null, t, n, e),
                l = function(e, a) {
                    if (Object(i.yc)(t, n, r.o)) {
                        var o = t.get().active_tab === f.m;
                        val(a, getTemplate("im_filter", {
                            filter: o ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                        }))
                    }
                },
                u = Object(s.a)({
                    handlers: function(t, n) {
                        n(e, "mouseover", Pc, o), n(e, "click", Mc, c), n(e, "click", Lc, l)
                    }
                });
            return function(e, t) {
                return {
                    updateFilter: function(t) {
                        var n = t.get().active_tab === f.m,
                            r = void 0,
                            i = [];
                        Object(a.L)(t) && i.push("im-page--dialogs-filter_hidden"), t.get().unread_cnt > 0 ? r = n ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread") : (r = getLang("mail_all_dialogs"), i.push("im-page--dialogs-filter_disabled")), val(geByClass1(Lc, e), getTemplate("im_filter", {
                            filter: r,
                            cls: i.join(" ")
                        }))
                    },
                    toggleButton: function(t, n) {
                        var r = geByClass1("im-page--dialogs-filter", e);
                        toggleClass(r, "im-page--dialogs-filter_hidden", n)
                    },
                    toggleLoader: function(t, n) {
                        var r = geByClass1(Pc, e);
                        toggleClass(r, "im-page--dialogs-settings_loading", n)
                    },
                    updateSettings: function(t) {
                        geByClass1("_im_settings_menu", e).outerHTML = Bc()
                    },
                    unmount: function() {
                        Object(s.c)(t)
                    }
                }
            }(e, u)
        }
        var Ac = "_ui_multiselect_cancel";

        function Hc(e) {
            return e.selection = [], Promise.resolve(e)
        }

        function Rc(e, t) {
            return t.selection = t.selection.filter(function(t) {
                return t.id !== e
            }), Promise.resolve(t)
        }

        function Fc(e, t, n, r) {
            e.set(Hc).then(qc.bind(null, t, n, e, r))
        }

        function qc(e, t, n, r) {
            var i = n.get().selection,
                a = uiSearch.getFieldEl(e);
            uiSearch.focus(e), i.length > 0 ? attr(a, "placeholder", "") : attr(a, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = i.map(function(e) {
                return '<div class="token">\n      <div class="token_title">' + e.name + '</div>\n      <div data-peer="' + e.id + '" class="token_del ' + Ac + '"></div>\n    </div>'
            }).join(""), toggleClass(e, "ui_multiselect_has_selection", i.length > 0), domFC(e).scrollTop += 50, r()
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
                onChange: function(e, t, n, i) {
                    e.set(r.rc.bind(null, n, !1)).then(t().onChange)
                }.bind(null, t, n)
            });
            var i = uiSearch.getFieldEl(e),
                a = ce("div", {
                    className: "_ui_multiselection ui_multiselect_cnt"
                });
            i && i.parentNode.insertBefore(a, i);
            var o, c, l = (o = i, c = 0, function() {
                var e = o.offsetWidth;
                setStyle(o, {
                    width: 1
                });
                var t = o.offsetLeft;
                c !== t ? (c = t, e = o.parentNode.offsetWidth, setStyle(o, {
                    width: Math.max(30, e - t - 20)
                })) : setStyle(o, {
                    width: e
                })
            });
            t.set(Hc);
            var u = function(e, t, n, r, i, a, o) {
                    var s = intval(domData(o, "peer"));
                    tooltips.hide(o), t.set(Rc.bind(null, s)).then(function(a) {
                        qc(e, r, t, i), n().selectionDeleted(t, s)
                    })
                }.bind(null, e, t, n, a, l),
                d = function(t) {
                    document.activeElement !== i && uiSearch.focus(e)
                },
                f = Object(s.a)({
                    handlers: function(t, n) {
                        n(e, "click", Ac, u), n(e, "mouseover", Ac, Uc), t(e, "click", d)
                    }
                });
            return {
                addSelection: function(n, r) {
                    return t.set(function(e, t) {
                        return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
                    }.bind(null, {
                        id: n,
                        name: r
                    })).then(qc.bind(null, e, a, t, l))
                },
                removeSelection: function(n) {
                    return t.set(Rc.bind(null, n)).then(qc.bind(null, e, a, t, l))
                },
                resetSelection: function() {
                    Fc(t, e, a, l)
                },
                focus: function() {
                    uiSearch.focus(e)
                },
                save: function() {
                    t.stash(), qc(e, a, t, l)
                },
                restore: function() {
                    t.pop(), qc(e, a, t, l)
                },
                unmount: function() {
                    uiSearch.destroy(e), Object(s.c)(f)
                }
            }
        }
        var Wc = "_im_create_cancel",
            Kc = "_im_create_list",
            Vc = "_im_dialog",
            Qc = "_im_create_tab",
            Xc = "_im_dialogs_creation_name",
            Gc = "_im_create_select",
            Jc = "_im_create_avatar",
            Yc = "_im_create_remove_avatar",
            Zc = "_im_confirm_creation",
            $c = "_im_cancel_creation",
            el = "_im_avatar_img",
            tl = ["im-creation--item_hovered"],
            nl = "olist_item_wrap_on",
            rl = "ui_search_reset",
            il = 100;

        function al(e, t, n, i, a, o) {
            Object(r.Ic)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(sl.bind(null, t, !1), 100), dl(o).map(function(e) {
                return geByClass1("_im_dialog" + e)
            }).forEach(function(e) {
                removeClass(e, nl)
            }), n().createCanceled(e, i), a.resetSelection(), "add_member" === e.get().creationType && e.set(r.qc.bind(null, "chat", [])), e.set(r.Db.bind(null, !1));
            var s = geByClass1(el, t);
            cl(e, o, t), uiSearch.reset(geByClass1(Xc, t)), uiSearch.reset(geByClass1(Gc, t)), s && s.parentNode.removeChild(s), cl(e, o, t), cancelStackFilter("im_search");
            var l = 0 === e.get().peer ? "search" : "default";
            e.get().longpoll.push([Object(c.Eb)(l)]), attr(t, "aria-hidden", "true")
        }

        function ol(e, t, n) {
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

        function sl(e, t) {
            toggleClass(e, "im-create_material", t)
        }

        function cl(e, t, n) {
            var r = geByClass1(Zc, n),
                i = t.get().selection.length,
                a = "add_member" === e.get().creationType,
                o = i > 0,
                s = uiSearch.getFieldEl(geByClass1(Xc, n)).value.length > 0,
                c = !o && (a || !s),
                l = a ? 1 === i ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with") : s || i > 1 ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog");
            val(r, l), toggleClass(r, "button_disabled", c)
        }

        function ll(e, t, n, r, i, a, o) {
            if (o) {
                var s = intval(domData(o, "list-id")),
                    c = dl(a),
                    l = trim(o.textContent),
                    u = geByClass1(Gc, t),
                    d = getSize(u)[1],
                    f = void 0;
                inArray(s, c) ? (f = r.removeSelection(s, l), removeClass(o, nl)) : (f = r.addSelection(s, l), addClass(o, nl)), f.then(function() {
                    var e = d - getSize(u)[1],
                        t = i.scrollTop();
                    i.scrollTop(t - e)
                }), cl(e, a, t);
                var m = geByClass1(Gc, t);
                uiSearch.reset(m)
            }
        }

        function ul(e) {
            return Object(a.r)(e) || !1
        }

        function dl(e) {
            return e.get().selection.map(function(e) {
                return e.id
            })
        }

        function fl(e, t, n, r) {
            toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
            var a = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
                o = geByClass1("_im_create_title", e);
            val(o, a), val(geByClass1(Zc, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat")), pl(e, r, t, !1, n.get().selection.map(function(e) {
                return e.id
            })), Object(i.L)("_im_create_wrap_safe", e)
        }

        function ml(e, t, n) {
            return e.then(function(e) {
                return e.filter(function(e) {
                    return e.is_friend && !inArray(e.peerId, n.get().creationFilter)
                })
            })
        }

        function pl(e, t, n, i, a) {
            var o = geByClass1(Gc, e),
                s = void 0,
                c = void 0,
                l = Object(r.fc)(i, t.get()),
                u = n.hoverFirstElement.bind(n, tl, bl(t));
            t.get().creation_shown_all = !1, n.reset(), n.pipe(ml(l, 0, t), i), n.toTop(), i ? (c = Object(r.ic)(i, t.get()), s = Object(r.dc)(i, [], "friends", t.get()), n.pipe(ml(s, 0, t), i).then(u), n.pipe(ml(c, 0, t), i).then(u)) : (s = Promise.resolve([]), c = Promise.resolve([])), t.set(ol.bind(null, [l, c, s], !0)), uiSearch.showProgress(o), Promise.all([l, s, c]).then(function() {
                return uiSearch.hideProgress(o)
            })
        }

        function gl(e, t, n, r, i, a) {
            dl(t).map(function(e) {
                return geByClass1("_im_dialog" + e)
            }).forEach(function(e) {
                return removeClass(e, nl)
            }), t.reset(), pl(n, e, r, !1, dl(t)), i.resetSelection(), al(e, n, a, !1, i, t)
        }

        function hl(e, t, n, i, o, s, l) {
            var u = dl(t),
                d = e.get(),
                f = geByClass1(Zc, n),
                m = uiSearch.getFieldEl(geByClass1(Xc, n)).value,
                p = "add_member" === e.get().creationType,
                g = !p && (m.length || u.length > 1);
            if (p) return e.set(r.i.bind(null, d.peer, u)).catch(function(e) {
                return showFastBox(getLang("global_error"), e)
            }), al(e, n, s, "", o, t);
            if (lockButton(f), !g) return h(u[0]);

            function h(r) {
                gl(e, t, n, i, o, s),
                    function(e, t, n, r, i, a) {
                        al(e, t, n, !1, i, a), e.get().longpoll.push([Object(c.bb)(r, !1, !1, !1, "create_conversation")])
                    }(e, n, s, r, o, t), unlockButton(f), Object(a.L)(e) ? s().cancelSearch(e) : s().restoreDialogs(e)
            }
            e.set(r.w.bind(null, d.next_chat_avatar, u, m)).then(function() {
                return h(d.next_peer)
            }).catch(function(e) {
                unlockButton(f), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
            })
        }

        function bl(e, t) {
            var n = t && t.get().selection.length;
            return {
                top: -1,
                bottom: Object(i.ib)(e) ? n > 0 ? 69 : 0 : -1
            }
        }

        function _l(e, t, n) {
            var a = g({
                    selection: []
                }),
                o = M(geByClass1(Kc, e), g({
                    offset: 0,
                    limit: il,
                    elements: [],
                    elCls: Vc
                }), function() {
                    return {
                        idFn: function(e) {
                            return intval(e.peerId)
                        },
                        hoverableFn: function(e) {
                            return hasClass(e, "_im_dialog")
                        },
                        renderFn: function(e, t) {
                            var n = dl(e),
                                r = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
                                i = [];
                            return t.online && i.push("online"), mobPlatforms[t.online] && i.push("mobile"), inArray(t.peerId, n) && r.push(nl), getTemplate("im_owner_item", {
                                owner_id: t.peerId,
                                cls: " " + r.join(" "),
                                photo: t.photo,
                                name: t.name,
                                link: t.href,
                                img_cls: i.join(" ")
                            })
                        }.bind(null, a),
                        more: function(e, n) {
                            var i = void 0;
                            return t.get().shown ? (t.get().creation_shown_all || !1 !== ul(a) ? i = Promise.resolve([]) : (t.get().creation_shown_all = !0, i = Object(r.ic)(ul(a), t.get())), t.set(ol.bind(null, [i], !1)), ml(i, ul(a), t)) : Promise.resolve(!1)
                        },
                        onClick: function(n, r) {
                            checkEvent(n) || (ll(t, e, 0, l, o, a, r), cancelEvent(n))
                        }
                    }
                });
            t.get().creationQuery = !1, t.get().creationType = "chat";
            var l = zc(geByClass1(Gc, e), a, function() {
                    return {
                        selectionDeleted: function(n, r) {
                            cl(t, n, e), removeClass(geByClass1("_im_dialog" + r), nl)
                        },
                        onChange: function(e, t, n, r) {
                            var i = r.get(),
                                a = ul(i);
                            i.selection.map(function(e) {
                                return e.id
                            }), n.unhoverElements(tl), e.get().creationQuery = a, pl(t, e, n, a)
                        }.bind(null, t, e, o)
                    }
                }),
                u = al.bind(null, t, e, n, "cross", l, a),
                d = function(e, t, n, i, a, o, s, c) {
                    uiTabs.switchTab(c.firstElementChild);
                    var l = domData(c, "type");
                    switch (l) {
                        case "chat":
                            o.restore()
                    }
                    e.set(r.qc.bind(null, l, [])).then(fl.bind(null, t, i, a))
                }.bind(null, t, e, n, o, a, l),
                f = function(e, t, n, i) {
                    var a = 2e9 + Math.round(rand(1e6, 2e6));
                    cur.recieveCropResult = function(n) {
                        cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(r.Db.bind(null, n)), Object(r.P)(n, a).then(function(e) {
                            geByClass1(Jc, t).appendChild(ce("img", {
                                className: "im-chat-placeholder--img " + el,
                                src: e
                            }))
                        }), addClass(t, "im-create_photo-attached")
                    }, Page.ownerPhoto(a)
                }.bind(null, t, e),
                m = function(e, t) {
                    geByClass1(Jc, t).innerHTML = "", e.set(r.Db.bind(null, !1)), removeClass(t, "im-create_photo-attached")
                }.bind(null, t, e),
                p = gl.bind(null, t, a, e, o, l, n),
                h = hl.bind(null, t, a, e, o, l, n),
                b = function(e, t, n) {
                    cl(e, t, n)
                }.bind(null, t, a, e),
                _ = geByClass1(Wc, e),
                v = geByClass1(Xc, e),
                y = v.querySelector("." + rl),
                j = Object(s.a)({
                    handlers: function(t, n) {
                        t(_, "click", u), t(_, "mouseover", function(e, t) {
                            return showTooltip(e, {
                                text: getLang("mail_cancel"),
                                black: 1,
                                zIndex: 1e3,
                                shift: [3, -2],
                                appendCls: "js-im-page"
                            })
                        }.bind(null, _)), t(geByClass1(Jc, e), "click", f), t(geByClass1(Yc, e), "click", m), t(geByClass1($c, e), "click", p), t(v, "change", b), t(v, "input", b), t(v, "paste", b), t(y, "click", b), t(geByClass1(Zc, e), "click", h), t(e, "mouseover", throttle(o.unhoverElements.bind(o, tl), 100)), n(e, "click", Qc, d)
                    }
                });
            return function(e, t, n, r, a, o, l, u) {
                return {
                    show: function(t) {
                        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                        t.setState({
                            shown: !0
                        }), sl(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown");
                        var o = r.get().selection.reduce(function(e, t) {
                            return e[t.id] = !0, e
                        }, {});
                        i && i.forEach(function(t) {
                            if (!o[t[0]]) {
                                var n = e.querySelector("._im_dialog" + t[0]);
                                a.addSelection(t[0], t[1]), n && !n.classList.contains(nl) && n.classList.add(nl)
                            }
                        }), fl(e, n, r, t), setTimeout(function() {
                            t.get().longpoll.push([Object(c.Eb)("create")]), attr(e, "aria-hidden", "false"), a.focus()
                        }, 1)
                    },
                    focusSearch: function(e) {
                        a.focus()
                    },
                    confirmCreate: function(e) {
                        u()
                    },
                    hide: function(n) {
                        n.get().shown = !1, al(n, e, t, !1, a, r)
                    },
                    scroll: function(e) {
                        n.scrollPage(e, !0)
                    },
                    updateScroll: function() {
                        Object(i.L)("_im_create_wrap_safe", e), n.updateScroll()
                    },
                    selectElement: function(t) {
                        ll(t, e, 0, a, n, r, n.getHoveredElement())
                    },
                    hoverPrevElement: function(e) {
                        n.hoverPrevElement(tl, null, bl(e, r))
                    },
                    hoverNextElement: function(e) {
                        n.hoverNextElement(tl, null, bl(e, r))
                    },
                    unmount: function() {
                        Object(s.c)(o), n.unmount(), a.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
                    }
                }
            }(e, n, o, a, l, j, u, h)
        }

        function vl(e, t, n, r, a) {
            switch (t) {
                case f.b:
                    Object(i.mb)() || (r.scroll(a, "up"), cancelEvent(n));
                    break;
                case f.a:
                    Object(i.mb)() || (r.scroll(a, "down"), cancelEvent(n));
                    break;
                case f.v:
                    n.ctrlKey || Object(i.ib)(a) || (r.scroll(a, "up", !0), cancelEvent(n));
                    break;
                case f.u:
                    n.ctrlKey || Object(i.ib)(a) || (r.scroll(a, "down", !0), cancelEvent(n));
                    break;
                case f.o:
                    Object(i.mb)() || (r.scroll(a, "up", !1, !0), cancelEvent(n));
                    break;
                case f.d:
                    Object(i.mb)() || (r.scroll(a, "down", !1, !0), cancelEvent(n));
                    break;
                case f.w:
                    r.focustTxt(e)
            }
        }

        function yl(e, t, n, r, a, o) {
            var s = g({
                state: t || "default"
            });
            return {
                signal: function(t, c) {
                    if (!(cur.storyLayer || cur.articleEditorLayer || window.isArticleLayerOpen())) switch (s.get().state) {
                        case "default":
                            return vl(s, t, c, r, e);
                        case "fwd":
                        case "search":
                            return function(e, t, n, r, a, o) {
                                switch (t) {
                                    case f.a:
                                        r.hoverNextDialog(o), cancelEvent(n);
                                        break;
                                    case f.b:
                                        r.hoverPrevDialog(o), cancelEvent(n);
                                        break;
                                    case f.e:
                                        Object(i.mb)() && !gpeByClass("_im_dialogs_search_input", document.activeElement) || r.selectHoveredDialog(o);
                                        break;
                                    case f.w:
                                        a.focusInput(o)
                                }
                            }(0, t, c, n, a, e);
                        case "create":
                            return function(e, t, n, r, a) {
                                switch (t) {
                                    case f.v:
                                        !n.ctrlKey && Object(i.ib)(a) && (r.scroll("up"), cancelEvent(n));
                                        break;
                                    case f.u:
                                        !n.ctrlKey && Object(i.ib)(a) && (r.scroll("down"), cancelEvent(n));
                                        break;
                                    case f.a:
                                        r.hoverNextElement(a);
                                        break;
                                    case f.b:
                                        r.hoverPrevElement(a);
                                        break;
                                    case f.e:
                                        gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(a) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(a);
                                        break;
                                    case f.w:
                                        r.focusSearch(a)
                                }
                            }(0, t, c, o, e);
                        case "message":
                            return function(e, t, n, r, i) {
                                switch (t) {
                                    case f.o:
                                    case f.d:
                                        r.isEmpty(i) && vl(e, t, n, r, i);
                                        break;
                                    case f.v:
                                    case f.u:
                                        vl(e, t, n, r, i)
                                }
                            }(s, t, c, r, e);
                        default:
                            throw new Error("Unknown state: " + s.get().state)
                    }
                },
                transition: function(e) {
                    return s.set(function(e, t) {
                        return t.state = e, Promise.resolve(t)
                    }.bind(null, e))
                }
            }
        }
        var jl = n("BxOC"),
            Ol = n("iN1s"),
            wl = n("EUzL"),
            kl = function() {
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
            Cl = 202,
            Sl = 4,
            El = 5,
            xl = 3e4,
            Il = {},
            Tl = Date.now();

        function Pl(e, t) {
            var n = Math.floor(t.status / 100);
            t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), Il[n] = Il[n] ? Il[n] + 1 : 1, Date.now() - Tl >= xl && (Object.keys(Il).forEach(function(e) {
                statlogsValueEvent("im_longpoll", Il[e], e + "0x", t.getResponseHeader("x-frontend"))
            }), Il = {}, Tl = Date.now()))
        }

        function Ml(e) {
            return e.updates.map(function(e) {
                switch (e[0]) {
                    case 0:
                        return c.gb(e);
                    case 1:
                        return c.vb(e);
                    case 2:
                        return c.Db(e);
                    case 3:
                        return c.zb(e);
                    case 4:
                        return c.Z(e);
                    case 5:
                        return c.hb(e);
                    case 6:
                        return c.pb(e);
                    case 7:
                        return c.qb(e);
                    case 8:
                        return c.mb(e);
                    case 9:
                        return c.lb(e);
                    case 10:
                        return c.yb(e);
                    case 11:
                        return c.ub(e);
                    case 12:
                        return c.Cb(e);
                    case 13:
                        return c.fb(e);
                    case 18:
                        return c.wb(e);
                    case 51:
                        return c.db(e);
                    case 52:
                        return c.eb(e);
                    case 63:
                        return c.Fb(e);
                    case 64:
                        return c.rb(e);
                    case 70:
                        return c.Hb(e);
                    case 80:
                        return c.Gb(e);
                    case 114:
                        return c.ob(e);
                    case 116:
                        return c.tb(e);
                    case -1:
                        return c.Bb();
                    default:
                        return c.jb(e)
                }
            })
        }

        function Ll(e, t) {
            return Promise.resolve(extend({}, t, {
                timeout: e < 64 ? 2 * e : e
            }))
        }

        function Bl(e, t) {
            return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
        }

        function Dl(e) {
            return e.pauses || (e.pauses = []), Object(h.j)("Aborting all pauses", "error"), e.pauses.forEach(function(e) {
                return e()
            }), e.pauses = [], Promise.resolve(e)
        }

        function Nl(e, t, n, i) {
            var a = i.failed ? Object(ft.a)(Sl, e) : {},
                o = a.abort,
                s = a.pause;
            switch (i.failed) {
                case 1:
                    return Object(h.j)("Old timestamp, init resync", "error"), e.set(Bl.bind(null, o)), n([c.Bb()]), e.set(r.ob).then(s).then(Al.bind(null, e, t, n));
                case 2:
                    return Object(h.j)("Key is incorrect", "error"), e.set(Bl.bind(null, o)), e.set(r.nb).then(s).then(Al.bind(null, e, t, n));
                case 3:
                    throw Object(m.b)("im_longpoll_force_reload", i, !1), nav.reload({
                        force: !0
                    }), new Error("ts is very wrong");
                default:
                    return e.set(function(e, t) {
                        return Promise.resolve(extend({}, t, {
                            imTs: e
                        }))
                    }.bind(null, i.ts)).then(function() {
                        return i
                    })
            }
        }

        function Al(e, t, n) {
            if (e.get().stopped) return Promise.resolve({
                updates: []
            });
            if (t()) return Promise.reject(new Error("pause"));
            var r = e.get(),
                i = r.imUrl + "/" + r.imPart,
                a = Object(jl.a)(i, {
                    act: "a_check",
                    key: r.imKey,
                    version: El,
                    ts: r.imTs,
                    wait: 25,
                    mode: r.mode
                }),
                o = a.request,
                s = a.cancel;
            return e.set(function(e, t) {
                return t.cancelToken = e, Promise.resolve(t)
            }.bind(null, s)).then(function() {
                return o
            }).then(function(t) {
                var n = kl(t, 2),
                    i = n[0],
                    a = n[1];
                return a && Pl(r, a), e.set(Ll.bind(null, 1)), JSON.parse(i)
            }).catch(function(e) {
                var t = kl(e, 2),
                    n = (t[0], t[1]);
                throw n && Pl(r, n), ""
            }).then(Nl.bind(null, e, t, n))
        }

        function Hl(e) {
            var t = e.id,
                n = e.gid,
                r = e.key,
                i = e.ts,
                a = e.url,
                o = e.lhost,
                s = e.lpstat,
                c = new EventEmitter,
                l = window.vk.lpConfig && window.vk.lpConfig.enabled && window.longpollTesting_onImEvents,
                u = Ii(function(e, t) {
                    return l && window.longpollTesting_onImEvents(t), c.trigger("data", t), Promise.resolve({})
                }),
                d = u.pause,
                f = u.resume,
                m = u.pushMessage,
                p = u.isPaused,
                b = u.reset,
                _ = g({
                    id: t,
                    gid: n,
                    mode: Cl,
                    timeout: 1,
                    imKey: r,
                    imTs: i,
                    imPart: a,
                    imUrl: o,
                    pause: !1,
                    stat: s
                });
            return function e(t, n, r) {
                t.get().stopped || (Object(h.j)("New request"), Al(t, r, n).then(Ml).then(function(e) {
                    return Object(h.j)("Request success", "success"), e
                }).then(n).catch(function(e) {
                    if (!t.get().stopped) return Object(h.j)("Error, waiting: " + (e.message || "no message (probably browser reset)"), "error"), t.set(Ll.bind(null, r() ? Sl / 2 : t.get().timeout)).then(function() {
                        var e = Object(ft.a)(t.get().timeout, t),
                            n = e.abort,
                            r = e.pause;
                        return t.set(Bl.bind(null, n)).then(r)
                    });
                    Object(h.j)("Stopped longpoll")
                }).then(e.bind(null, t, n, r)))
            }(_, m.bind(null, "main"), p.bind(null, "main")), {
                onData: function(e) {
                    return c.on("data", e)
                },
                offData: function(e) {
                    return c.off("data", e)
                },
                abortWaiting: function() {
                    return _.set(Dl)
                },
                stop: function(e) {
                    e.set(function(e) {
                        return Promise.resolve(extend({}, e, {
                            stopped: !0
                        }))
                    }).then(function() {
                        e.get().cancelToken()
                    })
                }.bind(null, _),
                pause: d.bind(null, "main"),
                resume: f.bind(null, "main"),
                reset: b.bind(null, "main"),
                push: function(e) {
                    return c.trigger("data", e)
                },
                isEnabled: function() {
                    return !_.get().pause && !_.get().stopped
                }
            }
        }
        var Rl = n("1+Fu");

        function Fl(e) {
            var t = e.get().tabbedPeers.map(function(t) {
                return e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]
            }).filter(function(e) {
                return e
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return {
                    type: "peer",
                    peer: e.peerId
                }
            });
            return t.length > 0 && (t = [{
                type: "sep"
            }].concat(t)), t
        }

        function ql(e, t) {
            return e.pipeReplace(Promise.resolve(Fl(t)))
        }

        function Ul(e, t, n, r) {
            return {
                updateMenu: function(t) {
                    ! function(e, t) {
                        geByClass("_im_peer_tab", e).forEach(function(e) {
                            var n = q2ajx(attr(e, "href").split("?")[1]);
                            n.tab !== t.get().active_tab && attr(e, "href", Object(i.S)(t) + "?sel=" + n.sel + "&tab=" + t.get().active_tab)
                        })
                    }(e, t);
                    var r = gpeByClass("_im_right_menu", e);
                    ql(n, t).then(function() {
                        var e = void 0;
                        (e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab)) && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(r)
                    })
                },
                updateName: function(e, t) {
                    var n = ge("ui_rmenu_peer_" + e);
                    if (n) {
                        var r = geByClass1("_im_r_tx", n),
                            i = t.get().tabs[e].tab;
                        val(r, i)
                    }
                },
                updateCounter: function(e, t) {
                    var n = ge("ui_rmenu_peer_" + t);
                    if (n) {
                        var r = geByClass1("_im_r_ct", n),
                            i = e.get().tabs[t].unread;
                        val(r, i > 0 ? i : ""), toggleClass(n, "im-right-menu--unread", i > 0)
                    }
                },
                unmount: function() {
                    Object(s.c)(r), n.unmount()
                }
            }
        }

        function zl(e, t, n) {
            var a = M(e, g({
                    limit: 50,
                    offset: 0,
                    noScroll: !0,
                    elements: Fl(t)
                }), function() {
                    return {
                        idFn: function(e) {
                            return e.peer || "000"
                        },
                        renderFn: function(e, t) {
                            if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
                            var n = Object(i.S)(e) + "?sel=" + t.peer + "&tab=" + e.get().active_tab,
                                r = Object(i.R)(t.peer, e),
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
                        }.bind(null, t)
                    }
                }),
                o = function(e, t, n, i) {
                    var a = gpeByClass("_im_peer_tab", i),
                        o = intval(domData(a, "list-id")),
                        s = e.get().tabbedPeers.filter(function(e) {
                            return e.peer !== o
                        });
                    return e.set(r.dd.bind(null, s, !0)).then(function() {
                        if (ql(t, e), o === e.get().peer) e.get().longpoll.push([Object(c.Ab)()]);
                        else if (0 !== e.get().peer) {
                            var n = gpeByClass("_im_right_menu", i);
                            uiRightMenu.hideSliding(n)
                        }
                    }), cancelEvent(n), !1
                }.bind(null, t, a),
                l = Object(s.a)({
                    handlers: function(n, r) {
                        r(e, "click", "_im_r_cl", o), r(e, "click", "_im_peer_tab", function(e, n) {
                            if (!checkEvent(e)) {
                                var r = intval(domData(n, "list-id"));
                                t.get().longpoll.push([Object(c.bb)(r, !1, !0, !0)]), cancelEvent(e)
                            }
                        }), f.g.forEach(function(r) {
                            n(geByClass1("_ui_item_" + r, e.parentNode), "mousedown", function(e, t, n) {
                                1 === n.which && (e.get().peer && e.get().longpoll.push([Object(c.Ab)()]), e.get().longpoll.push([Object(c.cb)(t)]), cancelEvent(n))
                            }.bind(null, t, r))
                        })
                    }
                });
            return Ul(e, 0, a, l)
        }
        var Wl = 5e3,
            Kl = 54e6,
            Vl = 72e5;

        function Ql(e) {
            var t = setInterval(function(e) {
                var t = e.get().tabs,
                    n = e.get().peer,
                    a = Object.keys(t).filter(function(t) {
                        return Object(i.ob)(e, t) && intval(t) !== n
                    }).map(function(e) {
                        return t[e]
                    });
                a.filter(function(e) {
                    return Date.now() - e.last_visited > Kl
                }).forEach(function(t) {
                    return e.set(r.u.bind(null, t.peerId))
                }), a.filter(function(t) {
                    return Object(i.ob)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > Vl
                }).forEach(function(t) {
                    return e.set(r.Cc.bind(null, t.peerId))
                })
            }.bind(null, e), Wl);
            return {
                unmount: function() {
                    clearInterval(t)
                }
            }
        }

        function Xl(e) {
            return e.which || e.keyCode
        }

        function Gl(e, t, n, r) {
            var a = Xl(r);
            if (!layers.visible) {
                if (a >= 49 && a <= 57 && (r.ctrlKey || r.metaKey && browser.mac) && Object(i.ib)(t)) return function(e, t) {
                    var n = e.get().tabbedPeers[t];
                    n && e.get().longpoll.push([Object(c.bb)(n.peer, !1, !0, !0)])
                }(t, a - 49), cancelEvent(r);
                inArray(a, f.A) && e.signal(a, r)
            }
        }

        function Jl(e, t) {
            var n = browser.mozilla ? "keydown" : "keypress",
                a = g({
                    signalTimer: !1
                }),
                o = function(e, t, n) {
                    !n || inArray(Xl(n), f.z) || Object(r.Y)(e.get().peer, e.get()) || Object(i.mb)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
                }.bind(null, e, t),
                c = Gl.bind(null, t, e, a),
                l = function(e, t, n) {
                    Xl(n) === f.e && e.signal(Xl(n), n)
                }.bind(null, t, a),
                u = Object(s.a)({
                    handlers: function(e, t) {
                        e(document, "keydown", c), e(document, "keyup", l), e(document, n, o)
                    }
                });
            return {
                unmount: function() {
                    Object(s.c)(u)
                }
            }
        }

        function Yl(e, t) {
            return -1 === (e ? e.indexOf(t) : 0) && (e.push(t), !0)
        }

        function Zl(e, t) {
            var n = e ? e.indexOf(t) : -1;
            return -1 !== n && (e.splice(n, 1), !0)
        }

        function $l(e, t, n) {
            if (Object(i.Bb)(n.get(), e)) {
                var o = Object(a.t)(n, e);
                Yl(o.memberIds, t) && o.membersCount++, -1 === o.data.active.indexOf(t) && o.data.active.push(t), t === vk.id && (o.data.kicked = 0, o.data.closed = 0)
            }
            return n.set(r.hb.bind(null, (s = {}, c = e, l = [t], c in s ? Object.defineProperty(s, c, {
                value: l,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : s[c] = l, s))).then(function(i) {
                if (t === vk.id && n.get().peer === e) return Promise.all([n.set(r.Q.bind(null, e)), n.set(r.lb.bind(null, e))])
            });
            var s, c, l
        }

        function eu(e, t, n, o, s, l) {
            var u = Object(a.t)(e, t);
            switch (n) {
                case c.t:
                case c.u:
                    return n === c.t ? Yl(u.adminIds, o) : Zl(u.adminIds, o), tu(e, t, s), !0;
                case c.x:
                    return u.data.flags = o, tu(e, t, s), !0;
                case c.A:
                    return delete u.pinHideId, cur.imDb.update(Do.a, [u.peerId, void 0]), !1;
                case c.C:
                    return $l(t, o, e).then(function() {
                        return nu(e, t, s, l), s.fixKeyboard()
                    }), !0;
                case c.E:
                case c.D:
                    return function(e, t, n, o, s) {
                        if (Object(i.Bb)(o.get(), e)) {
                            var c = Object(a.t)(o, e);
                            Zl(c.memberIds, t) && c.membersCount--, c.data.active = c.data.active.filter(function(e) {
                                return e !== t
                            }), t === vk.id && (n ? c.data.kicked = 1 : c.data.closed = 1)
                        }
                        return t === vk.id && o.get().peer === e ? (s.cancelEditing(), o.set(r.Oc.bind(null, e))) : Promise.resolve()
                    }(t, o, n === c.D, e, s).then(function() {
                        return nu(e, t, s, l)
                    }), e.get().id !== o && (Object(a.j)(e, t) || {}).author_id !== o || e.set(r.z.bind(null, t)).then(function() {
                        return s.fixKeyboard()
                    }), !0;
                case c.w:
                    return e.set(r.fb.bind(null, t)).then(function() {
                        return s.updateBanner(e)
                    }), !0;
                case c.y:
                case c.z:
                    return !0;
                default:
                    return !1
            }
        }

        function tu(e, t, n) {
            e.get().peer === t && (Object(r.oc)(e.get()), n.updateActions(e))
        }

        function nu(e, t, n, i) {
            e.get().peer === t && (Object(r.oc)(e.get()), n.updateChat(e, t), i.updateDialog(t, e))
        }
        var ru = function() {
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

        function iu(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var au = 30,
            ou = 400,
            su = 250,
            cu = 32,
            lu = 5 * cu + 24 + 52,
            uu = 3 * cu + 24,
            du = 10,
            fu = "._im_aside_notice";

        function mu(e, t) {
            "spam" === t ? Object(i.wc)(e, Tc, {}) : "fav" === t && Object(i.oc)(e, {}, sc, {})
        }

        function pu(e, t) {
            if (e.get().gid) {
                var n = t.parentNode,
                    r = geByClass("_im_right_menu_counter", n),
                    i = e.get().dialog_tab_cts;
                r.forEach(function(e) {
                    var t = domData(e, "tab");
                    val(e, i[t] || "")
                })
            }
        }

        function gu(e, t, n, a, o) {
            e.forEach(function(e) {
                switch (e.kludges.source_act) {
                    case i.d:
                    case i.e:
                        ! function(e, t, n, i) {
                            t.set(r.Rc.bind(null, e)).then(function() {
                                var r = e.kludges.source_act;
                                n.updateDialog(e.peerId, t), i.updateChatPhoto(e, r, t)
                            })
                        }(e, t, n, a)
                }
            })
        }

        function hu(e, t) {
            var n = e.get().longpoll.push.bind(null, [c.Ab()]);
            cancelStackPush("im_peer", function r() {
                var i = e.get().selectedMessages;
                i && i.length ? (e.setState({
                    selectedMessages: []
                }).then(function() {
                    t.changedMessageSelection(e), t.cleanSelection(i)
                }), setTimeout(function() {
                    return cancelStackPush("im_peer", r)
                }, 0)) : n()
            })
        }

        function bu(e) {
            var t = e.attaches.filter(function(e) {
                return "sticker" !== e.type
            });
            return Object(o.l)(e) || 0 === t.length
        }

        function _u(e, t, n) {
            addClass(n, "im-page_history-show"), t.loadingPeer(e)
        }

        function vu(e, t) {
            var n = function(e, t) {
                var n = document.querySelector(fu),
                    r = Object(i.jb)(e) ? lu : uu,
                    a = n ? n.offsetHeight : 0;
                return r += du, r += a, Math.floor((t.offsetHeight - r) / cu)
            }(e, t);
            if (e.get().tabbedPeers.length > n) {
                var a = e.get().tabbedPeers.filter(function(t) {
                        var n = t.peer;
                        return intval(n) !== e.get().peer
                    }).map(function(t) {
                        var n = t.peer;
                        return e.get().tabs[n]
                    }).sort(function(e, t) {
                        return t.last_touched - e.last_touched
                    }),
                    o = [];
                0 !== e.get().peer && o.push(e.get().tabs[e.get().peer]);
                var s = o.concat(a).slice(n).map(function(e) {
                        return e.peerId
                    }),
                    c = e.get().tabbedPeers.filter(function(e) {
                        return !inArray(e.peer, s)
                    });
                return e.set(r.dd.bind(null, c, !0))
            }
            return Promise.resolve(e)
        }

        function yu() {
            for (var e = curBox(); e;) e.hide(), e = curBox()
        }

        function ju(e, t, n, o, s, c, l, u, d) {
            e.get().audio_msg.isRecording && e.set(r.l).then(function() {
                o.cancelRecording()
            }), AudioMessagePlayer.detachPlayer(), Object(a.x)(e) && o.cancelEditing(), Object(a.L)(e) && t.cancelSearch && (s.clearSearch(e), n.restoreDialogs(e), d().toggleSettingsButton(e, !1)), Ou(e, u, d), _u(e, o, c);
            var f = e.get().peer;
            Object(r.ad)(e.get()), Object(r.hd)(), Object(i.ob)(e, t.peerId) && (t.msgid && !Object(a.m)(e, t.peerId, t.msgid) || !t.msgid && !Object(a.m)(e, t.peerId, Object(a.t)(e, t.peerId).lastmsg) || Object(a.t)(e, t.peerId).skipped) && e.mutate(function(e) {
                return Object(a.O)(e, t.peerId)
            });
            var p = e.set(r.p.bind(null, t.peerId, t.msgid, t.entryPoint)).then(function(e) {
                var n = e.get(),
                    i = r.sb.bind(null, t.peerId, !1, t.msgid, !1, n);
                return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(i)
            }).then(function() {
                n.selectPeer(t.msgid, e),
                    function(e, t) {
                        Object(i.xb)(e) && (cancelStackFilter("forward"), e.set(r.K.bind(null, e.get().pendingForward, Object(a.u)(Object(a.t)(e, t)), !1)))
                    }(e, e.get().peer), window.tooltips && tooltips.hideAll(), yu(), o.preparePeer(e), hu(e, o), Object(i.ib)(e) && (n.deactivate(), vu(e, c).then(function() {
                        return l.updateMenu(e)
                    }))
            });
            return (p = t.msgid ? p.then(function() {
                return e.set(r.kc.bind(null, t.peerId === f, f))
            }) : p.then(function() {
                return e.set(r.jc.bind(null, !0))
            })).then(function() {
                if (e.get().peer === t.peerId) {
                    if (t.forward) {
                        var n = e.get().tabs[e.get().peer];
                        !n.scrollBottom && n.unread && e.set(r.Fb.bind(null, e.get().peer))
                    }
                    Object(i.ib)(e) && l.updateMenu(e), o.changePeer(e, !1), o.updateTyping(t.peerId, e), Object(r.ad)(e.get())
                }
            }).catch(function(e) {
                return Object(m.a)("applyNewPeer", e)
            })
        }

        function Ou(e, t, n) {
            t && e.get().shown && (t.hide(e), n().createCanceled(e))
        }

        function wu(e, t, n) {
            Object(a.L)(e) && (t.clearSearch(e), n.restoreDialogs(e))
        }

        function ku(e, t, n, a, o, s, c) {
            Object(i.ib)(e) && (o.saveScroll(e), s.saveScroll(e)), a.rotateCross(e), addClass(c, "im-page_creating"), e.setState({
                isCreating: !0
            }), n && n.show(e, t), Object(i.ib)(e) && (setStyle(c, {
                height: xu(c, e).page
            }), setTimeout(function() {
                addClass(c, "im-page_cropped")
            }, 200)), Object(r.Ic)(!0)
        }

        function Cu(e, t, n, r) {
            Object(i.Bb)(e.get(), r) && (t.updateTyping(r, e), n.updateTyping(r, e))
        }

        function Su(e, t, n, a, o) {
            a.activityType || (a.activityType = o);
            var s = function(e) {
                return Cu(e, t, n, a.peerId)
            };
            Object(i.Ab)(a.peerId, e.get().gid) || (e.set(r.pc.bind(null, a, o)).then(s), e.set(r.id.bind(null, a, o)).then(s))
        }

        function Eu(e, t, n, l, u, d, m, p, g, h, b, _, v, y, j, O, w, k, C, S, E) {
            return {
                changePeer: function(e, n) {
                    t.selectPeer(e, n)
                },
                cancelSearch: function(e) {
                    wu(e, l, t)
                },
                loadingPeer: function(e) {
                    _u(e, n, u)
                },
                restoreDialogs: function(e, n, r) {
                    t.restoreDialogs(e, n, r)
                },
                toggleSettingsButton: function(e, t) {
                    b.toggleButton(e, t)
                },
                focusSearch: function(e) {
                    l.focusInput(e)
                },
                appendSearch: function(e, n, r, i) {
                    t.appendSearch(e, n, r, i)
                },
                appendDialogs: function(e, n) {
                    t.appendDialogs(e, n)
                },
                showCreation: function(e, r) {
                    ku(e, r, h, l, t, n, u)
                },
                updateState: function(e, r) {
                    t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
                },
                appendFastDialogs: function(e, n) {
                    t.appendFastDialogs(e, n, !0)
                },
                createCanceled: function(e, r) {
                    l.createCanceled(e, r), Object(i.ib)(e) ? (setStyle(u, {
                        height: "auto"
                    }), removeClass(u, "im-page_cropped"), setTimeout(function() {
                        return l.focusInput(e)
                    }, 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(function() {
                        0 === e.get().peer ? l.focusInput(e) : n.focustTxt(e)
                    }, 0), removeClass(u, "im-page_creating"), e.setState({
                        isCreating: !1
                    })
                },
                updateMenu: function(e) {
                    O && O.updateMenu(e)
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
                    Object(a.L)(e) && l.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), h && h.hide(e), Object(i.jb)(e) && pu(e, u), Object(i.ib)(e) && e.get().tabbedPeers.forEach(function(t) {
                        var n = t.peer;
                        O.updateCounter(e, n), O.updateName(n, e)
                    }), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), Object(i.yb)(e.get().peer) || n.changePeer(e, !1);
                    var r = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                    handlePageCount(r, e.get().unread_cnt)
                },
                toggleSettingsLoader: function(e, t) {
                    b.toggleLoader(e, t)
                },
                onUserActions: function(e, t) {
                    if (!Object(r.Y)(e.get().peer, e.get())) {
                        var o = e.get(),
                            s = o.peer;
                        if (Object(i.ob)(o, s))
                            if (!d.is_idle)
                                if (Object(a.b)(e.get().peer, e.get()) > 0) !o.tabs[s].skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(r.Fb.bind(null, s)))
                    }
                },
                removeSelection: function(e) {
                    t.removeSelection(e), l.focusInput(e)
                },
                route: function(e, a, o, s) {
                    if (void 0 !== e[0]) return !0;
                    e.box && (e = {
                        box: e.box
                    });
                    var d = !1;
                    return !(!e.invite_chat_id || !o.invite_hash) || (s && s.params && "left_nav" === s.params._ref && void 0 === e.sel && t.scrollUp(!0, !0), Object.keys(e).sort().forEach(function(e) {
                        switch (e) {
                            case "sel":
                                o.q || (d = !0);
                                var m = o.sel ? Object(i.Hc)(o.sel) : 0,
                                    p = s.back;
                                0 === m ? _.get().longpoll.push([c.Ab(!1, p)]) : m !== _.get().peer && _.get().longpoll.push([c.bb(m, o.msgid || !1)]);
                                break;
                            case "invite_chat_id":
                            case "invite_hash":
                                ! function(e) {
                                    e.set(r.db)
                                }(_);
                                break;
                            case "tab":
                                Ou(_, h, g), d = !0;
                                var b = o.tab || f.h;
                                _.get().longpoll.push([c.cb(b)]);
                                break;
                            case "act":
                                o.act && "create" === o.act ? ku(_, [], h, l, t, n, u) : function(e, t, n, r) {
                                    n && n.hide(e, t)
                                }(_, [], h);
                                break;
                            case "st":
                                o.st && o.sel ? (curBox() && curBox().hide(), _.mutate(r.vc.bind(null, unescape(o.st), o.sel)), n.startSearch(_)) : (_.mutate(r.m.bind(null, a.sel)), n.cancelSearch(_, !0));
                                break;
                            case "q":
                                o.q ? (curBox() && curBox().hide(), l.setSearch(_, o.q, !0)) : l.clearSearch(_);
                                break;
                            case "box":
                                mu(_, o.box)
                        }
                    }), Object(i.ib)(_) && void 0 === e.sel && O.updateMenu(_), d && wu(_, l, t), !1)
                },
                updateDialogFilters: function(e) {
                    Object(a.L)(e) || t.restoreDialogs(e), b.updateFilter(e)
                },
                removePeer: function(e, n) {
                    t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([c.Ab()]), Object(i.ib)(e) && O.updateMenu(e)
                },
                newMessage: function(e) {
                    Object(i.ib)(e) || t.scrollUp(!0)
                },
                onEvents: function(e, s) {
                    var d = function(e) {
                            for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== c.X || t ? e[n].type === c.X && e.splice(n, 1) : t = !0;
                            return e
                        }(s.filter(function(e) {
                            return e.type !== c.a || !(e.flags & c.o)
                        })),
                        _ = s.filter(o.l),
                        y = s.filter(function(e) {
                            return e.type === c.a
                        });
                    gu(_, e, t, n);
                    var j = Object(r.s)(_, y, e),
                        w = Promise.resolve();
                    j.shouldLoad && (w = e.set(r.rb.bind(null, j, m))), w.then(function() {
                        d.forEach(function(s) {
                            switch (s.type) {
                                case c.a:
                                    var d = Object(a.t)(e, s.peerId),
                                        m = !d || !d.msgs || 0 == d.msgs.length,
                                        _ = Object(i.lb)(s, e.get()),
                                        y = Object(a.A)(e, s.peerId);
                                    if (!e.get().isIncomingMessageRequestsAllowed && Object(a.Q)(d)) break;
                                    var j = null;
                                    if (s.kludges.keyboard) {
                                        var w = Object.assign(s.kludges.keyboard, {
                                            author_id: s.userId
                                        });
                                        j = e.set(r.wc.bind(null, s.peerId, w))
                                    } else {
                                        var k = Object(a.j)(e, s.peerId);
                                        k && k.one_time && k.author_id !== Object(o.a)(e, s) && (j = e.set(r.z.bind(null, s.peerId)))
                                    }
                                    if (s.peerId === Object(a.o)(e) && j && j.then(function() {
                                            return n.fixKeyboard()
                                        }), 0 === _) e.set(r.h.bind(null, s)), vu(e, u),
                                        function(e, t) {
                                            var n = e.get().tabs[t.peerId],
                                                i = e.get().active_tab;
                                            return i === f.h || Object(r.H)(i)(n)
                                        }(e, s) && (s.flags & c.m || e.set(r.Tc.bind(null, s.peerId, !0)), function(e, t) {
                                            var n = t.flags & c.m,
                                                r = inArray(t.peerId, e.get().mutedPeers),
                                                a = t.flags & c.j,
                                                o = e.get().gid;
                                            if (!n && !r && !a) {
                                                var s = function(e, t) {
                                                        return t < 2e9 && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
                                                    }(t.subject, t.peerId) || "",
                                                    l = (s ? s + " " : "") + t.text || "",
                                                    u = t.userId,
                                                    d = t.peerId,
                                                    f = void 0,
                                                    m = void 0,
                                                    p = e.get().tabs[d];
                                                if (t.kludges && t.kludges.source_act && (l = stripHTML(Object(i.bc)(e, t, p, !1))), (!e.get().notify_msg && !Object(i.hb)(d) || o && !e.get().mute) && window.Notifier && Notifier.playSound({
                                                        author_id: d
                                                    }), !Object(i.hb)(d)) return;
                                                l = trim(replaceEntities(stripHTML(l.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), l = Object(No.f)(l, function(e, t, n, r, i) {
                                                    return i
                                                }), Object(i.hb)(d) ? (f = Object(B.c)(e, u).name, p.tab && (f += " » " + p.tab), m = Object(B.c)(e, u).photo) : (f = p.tab, m = p.photo);
                                                var g = t.attaches[0];
                                                if (g && "mail" === g.type) l += "\n[" + getLang("mail_added_msgs") + "]";
                                                else if (g) {
                                                    var h = "doc" === g.type && "graffiti" === g.kind ? "graffiti" : g.type;
                                                    l += "\n[" + getLang("mail_added_" + h) + "]"
                                                }
                                                f = trim(replaceEntities(stripHTML((f || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                                                    id: t.messageId,
                                                    text: l,
                                                    author_id: d,
                                                    title: f,
                                                    author_photo: m
                                                })
                                            }
                                        }(e, s), t.updateTyping(s.peerId, e), Object(a.L)(e) ? t.updateDialog(s.peerId, e) : t.promoteDialog(e, s.peerId)), !1 === Object(a.A)(e, s.peerId) && !0 === y && n.updateActions(e), Object(i.ib)(e) && (O.updateCounter(e, s.peerId), O.updateMenu(e)), e.set(r.Pc.bind(null, s)).then(Cu.bind(null, e, n, t, s.peerId)), n.addMessage(e, s), Object(i.ib)(e) || b.updateFilter(e), bu(s) || !Object(i.ob)(e, s.peerId) || s.local || e.set(r.pb.bind(null, s)).then(function(e) {
                                            n.replaceAttachmentPlaceholders(e, s), Object(r.hd)()
                                        }), Object(ye.m)(e, s, "send", "opt_to_lp");
                                    else 2 === _ ? (bu(s) || e.set(r.pb.bind(null, s)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, s)
                                    }), e.set(r.Pb.bind(null, s)), n.replaceMessageAttrs(s, e), t.updateDialog(s.peerId, e), s.randomId && Object(ye.l)(e, s, "send", "opt_to_lp")) : Object(a.L)(e) || t.promoteDialog(e, s.peerId);
                                    d && m && d.peerId === Object(a.o)(e) && S();
                                    break;
                                case c.g:
                                case c.N:
                                    e.set(r.F.bind(null, s)).then(function(e) {
                                        t.updateDialog(s.peerId, e), n.updateTyping(s.peerId, e), n.editMessage(e, s), bu(s) || !Object(i.ob)(e, s.peerId) || s.local || e.set(r.pb.bind(null, s)).then(function(e) {
                                            n.replaceAttachmentPlaceholders(e, s)
                                        })
                                    });
                                    break;
                                case c.H:
                                    e.set(r.wb.bind(null, s)).then(function(e) {
                                        t.updateCounter(e, s.peerId), n.updateGoToEnd(e, !0), Object(i.ib)(e) && O.updateCounter(e, s.peerId), Object(a.L)(e) || t.restoreDialogs(e), b.updateFilter(e)
                                    });
                                    break;
                                case c.I:
                                    e.set(r.xb.bind(null, s)).then(function(e) {
                                        t.updateCounter(e, s.peerId), n.markMessagesAsRead(e, s)
                                    });
                                    break;
                                case c.X:
                                    e.set(r.fd.bind(null, s.count)).then(function() {
                                        var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                        handlePageCount(t, s.count), b.updateFilter(e), Object(i.ib)(e) && pu(e, u)
                                    });
                                    break;
                                case c.s:
                                case c.r:
                                    var C = s.type === c.s;
                                    e.set(r.bd.bind(null, s.userId, !!C && s.platform, s.lastSeenTs)).then(function(e) {
                                        Object(i.Bb)(e.get(), s.userId) && (t.updateOnline(s.userId, e), n.updateOnline(s.userId, e))
                                    });
                                    break;
                                case c.U:
                                case c.M:
                                case c.Q:
                                    if (!(s.flags & c.j || s.flags & c.n) || s.type !== c.U || Object(i.fb)(e, s.peerId, s.messageId) || e.get().blockedFlagUpdates[s.peerId] || p(s), s.flags === c.l) {
                                        var E = s.type === c.U;
                                        e.set(r.Zc.bind(null, E ? 1 : -1, s.messageId)).then(function() {
                                            Object(i.ib)(e) || l.updateImportantCnt(e)
                                        }), e.set(r.Uc.bind(null, [s.messageId], s.peerId, E)).then(function() {
                                            n.markImportant(s.messageId, E, e)
                                        })
                                    }
                                    break;
                                case c.J:
                                    Su(e, n, t, s, r.c);
                                    break;
                                case c.W:
                                    Su(e, n, t, s, r.d);
                                    break;
                                case c.G:
                                    ! function(e, t, n, i) {
                                        e.set(r.yc.bind(null, n, i)).then(t().updateState.bind(null, n))
                                    }(e, g, s.peerId, 0 !== s.disabledUntil);
                                    break;
                                case c.S:
                                    e.get().longpoll.pause(), e.set(r.Yb).then(g().resync).then(function() {
                                        return e.get().longpoll.resume()
                                    });
                                    break;
                                case c.V:
                                    v.transition(s.state);
                                    break;
                                case c.R:
                                    if (s.removeActivePeer) {
                                        var x = e.get().tabbedPeers.filter(function(t) {
                                            var n = t.peer,
                                                r = t.type;
                                            return n !== e.get().peer && "perm" === r
                                        });
                                        e.setState({
                                            tabbedPeers: x
                                        })
                                    }! function(e, t, n, o) {
                                        e.set(r.l).then(function() {
                                            n.cancelRecording()
                                        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(o, "im-page_history-show"), n.stopLoading(), Object(a.x)(e) && n.cancelEditing();
                                        var s = e.get().peer;
                                        e.set(r.p.bind(null, 0, !1, !1)).then(function() {
                                            window.tooltips && window.tooltips.hideAll(), yu(), Object(i.ib)(e) && t.activate(), n.changePeer(e), Object(i.ib)(e) && t.restoreScroll(e), setTimeout(function() {
                                                e.get().longpoll.push([c.Eb("search")])
                                            }, 13), Object(i.rb)(e) && Object(i.wb)(s, e) && e.set(r.Hb.bind(null, s))
                                        })
                                    }(e, t, n, u), s.cancelSearch && wu(e, l, t), Object(i.ib)(e) && O.updateMenu(e), l.focusInput(e);
                                    break;
                                case c.c:
                                    Object(i.C)(s.tab, e, g, r.o).then(function(e) {
                                        b.updateFilter(e)
                                    });
                                    break;
                                case c.P:
                                case c.T:
                                case c.L:
                                    if (s.mask === c.p) break;
                                    e.set(r.Wc.bind(null, s.peerId, s.mask, s.type, s.local)).then(function(e) {
                                        Object(a.L)(e) || s.type === c.P && s.mask === c.q || s.type === c.L || t.restoreDialogs(e), t.updateDialog(s.peerId, e), pu(e, u), e.get().peer === s.peerId && n.changedMessageSelection(e)
                                    });
                                    break;
                                case c.f:
                                    e.set(r.B.bind(null, s.peerId, Promise.resolve([]))).then(function() {
                                        g().removePeer(e, s.peerId), g().updateDialogFilters(e)
                                    });
                                    break;
                                case c.b:
                                    ju(e, s, t, n, l, u, O, h, g);
                                    break;
                                case c.F:
                                    var I = iu({}, s.peerId, s),
                                        T = Object(i.vb)(s.peerId, e);
                                    e.set(r.Qc.bind(null, I)).then(function() {
                                        t.updateDialog(s.peerId, e);
                                        var r = Object(i.vb)(s.peerId, e);
                                        Object(i.ob)(e.get(), s.peerId) && T !== r && n.updateChat(e, s.peerId)
                                    });
                                    break;
                                case c.i:
                                    e.set(r.xc.bind(null, s.peer, s.message)).then(function() {
                                        n.setMessageErrored(s.peer, s.message, s.error, e), t.setDialogFailed(s.peer, s.message.messageId, e)
                                    });
                                    break;
                                case c.O:
                                    var P = s.message.messageId;
                                    e.set(r.Qb.bind(null, s.peerId, P, s.message)).then(function() {
                                        n.resendMessage(s.peerId, P), t.promoteDialog(e, s.peerId)
                                    });
                                    break;
                                case c.e:
                                    if (Object(i.Bb)(e.get(), s.peerId)) eu(e, s.peerId, s.updateType, s.updateArg, n, t) || g().reloadChatInfo(s.peerId)
                            }
                        })
                    })
                },
                updateHistory: function(e) {
                    return n.updateHistory(e)
                },
                reloadChatInfo: function(e) {
                    Object(i.Bb)(_.get(), e) && _.set(r.gb.bind(null, e)).then(function() {
                        return function(e, t, n, a, o) {
                            a.updateChatTopic(t, e), Object(i.ib)(e) && o.updateName(t, e), e.get().peer == t && (Object(r.oc)(e.get()), a.updateActions(e))
                        }(_, e, 0, n, O)
                    })
                },
                cancelRecording: function() {
                    return _.set(r.l).then(function() {
                        return n.cancelRecording()
                    })
                },
                fixHeight: function() {
                    S()
                },
                unmount: function() {
                    Object(s.c)(e), clearInterval(_.get().update_title_to), d.stop(), E(), t.unmount();
                    var a = window.devicePixelRatio >= 2 ? "_2x" : "";
                    setFavIcon("/images/icons/favicons/fav_logo" + a + ".ico"), n.unmount(), l.unmount(), cancelStackFilter("im_peer"), b.unmount(), h && h.unmount(), O && O.unmount(), w && w(), y && y(), Object(i.rb)(_) && _.get().peer && _.set(r.Hb.bind(null, _.get().peer)), k.unmount(), O && O.unmount(), C.unmount(), clearInterval(j), cur.imDb.unmount(), cur.imDb = !1
                }
            }
        }

        function xu(e, t) {
            var n = ge("page_header"),
                r = geByClass1("_im_page_history", e),
                a = window.clientHeight() - n.offsetHeight - au - 2,
                o = Object(i.ib)(t) ? su : ou,
                s = {
                    page: Math.max(a, o)
                };
            if (Object(i.ib)(t)) {
                var c = Object(i.U)();
                c = c > 0 ? Math.min(c - n.offsetHeight - au - 2, a) : a;
                var l = hasClass(r, "im-page--history_empty-hist") ? c : a;
                s.history = Math.max(c, o), s.chat = Math.max(l, o)
            }
            return s
        }

        function Iu(e, t, n, a, o) {
            var s = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                c = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
            if (!isFullScreen()) {
                var l = xu(e, t);
                if (setStyle(e, {
                        minHeight: l.page
                    }), Object(i.ib)(t) && (void 0 === t.get().chatResizeInitialized && t.set(r.U), setStyle(e, {
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
                    })), browser.safari && c && "function" == typeof c && c(), a && a.updateScroll(), o && o.updateScroll(), n) {
                    var u = n.updateScroll();
                    n.scrollFix(t, t.get().peer, u)
                }
                s && setTimeout(function() {
                    return Iu(e, t, n, a, o, !1)
                }, 100)
            }
        }

        function Tu() {
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

        function Pu(e, t) {
            var n = t.get(),
                o = void 0,
                l = window.devicePixelRatio >= 2 ? "_2x" : "";
            setFavIcon("/images/icons/favicons/fav_im" + l + ".ico"), Iu(e, t, !1, !1, !1, !0), show(e), Object(ye.c)();
            var u = Object(s.b)(Eu),
                d = u.callMutations,
                f = u.bindMutations,
                p = n.useFcLongpoll && vk.lpConfig.enabled && Notifier.getLpInstance && Notifier.getLpInstance(),
                g = p ? Notifier.getLpInstance() : t.get().gid ? function(e) {
                    Object(m.b)("im_start_longpoll_group", {}, !1);
                    var t = Object(wl.a)(e.ts, function(e) {
                            r.trigger("data", e)
                        }),
                        n = Object(Ol.a)(e, t.onLp),
                        r = new window.EventEmitter;
                    return {
                        onData: function(e) {
                            return r.on("data", e)
                        },
                        offData: function(e) {
                            return r.off("data", e)
                        },
                        push: function(e) {
                            return r.trigger("data", e)
                        },
                        pause: t.pause.bind(t),
                        resume: t.resume.bind(t),
                        abortWaiting: n.abortWaiting.bind(n),
                        onLp: t.onLp.bind(t),
                        stop: n.stopConnection.bind(n),
                        isEnabled: function() {
                            return !(!n || n.isStopped())
                        }
                    }
                }(n.lpConfig) : Hl(n);

            function _() {
                for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                d().onEvents(t, n)
            }
            g.onData(_), p && Object(m.b)("im_use_fc_longpoll", {}, !1);
            var v = geByClass1("_im_dialogs_search", e),
                y = geByClass1("_im_dialogs_settings", e),
                j = ve(geByClass1("_im_page_dcontent", e), t, d),
                O = wc(v, t, d),
                w = Nc(y, t, d),
                k = Ql(t);
            cur.imDb = Object(Do.c)(t.get().gid ? -t.get().gid : vk.id), t.set(r.Bb.bind(null, cur.imDb)), Object(i.ib)(t) && w.updateSettings(t);
            var C = void 0,
                S = void 0;
            Object(i.ib)(t) && (C = zl(geByClass1("_im_ui_peers_list", e.parentNode), t), S = function(e, t, n, r) {
                if (browser.mobile) return !1;
                var i = [t, n, geByClass1("_im_chat_input_w", r), geByClass1("_im_dialog_actions", r)],
                    a = null,
                    o = hasClass(e, "im-page--header_static"),
                    s = ge("im-group-online-disabled-notice");

                function c() {
                    var t = Object(b.b)("scrollLeft"),
                        n = hasClass(e, "im-page--header_static"),
                        r = [];
                    a !== t ? r = i.slice().concat([e]) : n !== o && (r = [e]), a = t, o = n, r.length > 0 && r.forEach(function(r) {
                        var i = e === r && n ? 0 : -t;
                        setStyle(r, iu({}, cssTransformProp, 0 === i ? "unset" : "translateX(" + i + "px)"))
                    })
                }
                return s && i.push(s), i = i.concat(geByClass("_im_aside_notice"), geByClass("_im_aside_promo_block")), addEvent(window, "scroll", c), c(),
                    function() {
                        removeEvent(window, "scroll", c)
                    }
            }(v, y, geByClass1("_im_right_menu", e.parentNode), e));
            Object(i.ib)(t) && n.peer && j.deactivate(), n.gid || (o = _l(geByClass1("_im_dialogs_creation", e), t, d));
            var E = $s(geByClass1("_im_page_history", e), t, j, C, d),
                x = n.isCreating,
                I = x ? "create" : 0 === n.peer ? "search" : "default";
            x && o.show(t, []);
            var T = yl(t, I, j, E, O, o),
                P = Jl(t, T);
            E.updateScroll();
            var M = function(e, t, n, a) {
                var o = t.get();
                Object(i.yb)(o.peer) || e().onUserActions(t, a), o.update_old_title && t.set(r.Tc.bind(null, !1, !1))
            }.bind(null, d, t, T);
            Object(i.yb)(n.peer) || setTimeout(function() {
                return hu(t, E)
            }, 10);
            var L = new IdleManager({
                    id: "im",
                    element: document,
                    focusElement: window,
                    triggerEvents: "mouseover mousedown keypress"
                }),
                B = debounce(Tu, 300),
                D = Iu.bind(null, e, t, E, j, o, !1, B);
            t.setState({
                longpoll: g
            }), t.set(r.uc.bind(null, [])), L.on("unidle", function() {
                g.abortWaiting(), M()
            }), L.start(), nav.objLoc.box && (mu(t, nav.objLoc.box), Object(Bo.b)({
                box: null
            }));
            var N = function(e) {
                    var t = e.get();
                    return Object(i.rb)(e) ? Object(Rl.a)(t.mutex_key, function(e) {
                        t.longpoll.push([c.nb(e)])
                    }, function(e, n) {
                        return Object(r.O)(t.gid).then(function(e) {
                            return ru(e, 1)[0]
                        })
                    }).stop : null
                }(t),
                A = void 0;
            Object(i.rb)(t) && (A = setInterval(i.z.bind(null, t, n.longpoll), 2e3)), t.get().invitation && Object(i.qc)(t, t.get().invitation, r.db);
            var H = Object(h.p)(function(e, t, n, i, o) {
                    var s = o.reduce(function(e, t) {
                        return e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e
                    }, {});
                    Object.keys(s).forEach(function(o) {
                        var c = s[o];
                        e.set(r.Mb.bind(null, c, o)).then(function() {
                            return e.set(r.Nb.bind(null, c, o))
                        }).then(function() {
                            return t.removeMessages(c, +o, e)
                        }).then(function() {
                            var s = Object(a.t)(e, o);
                            s && c.some(function(e) {
                                return e >= s.lastmsg
                            }) && Object(r.eb)(e, +o).then(function() {
                                n.promoteDialog(e, o), i && i.updateCounter(e, o), t.updateGoToEnd(e, !0)
                            })
                        })
                    })
                }.bind(null, t, E, j, C), 200),
                R = i.cb.bind(null, t),
                F = i.ab.bind(null, t);
            return f(Object(s.a)({
                handlers: function(t, n) {
                    t(document, "mousemove mousedown keypress", M), t(window, "resize", D), n(e, "click", i.o, R), n(gpeByClass("_im-page-wrap", e), "click", i.m, F), n(gpeByClass("_im-page-wrap", e), "click", i.n, i.bb), n(gpeByClass("_im-page-wrap", e), "click", i.p, i.db), browser.safari && t(document, "visibilitychange", Tu)
                }
            }), j, E, O, e, L, g, H, d, o, w, t, T, N, A, C, S, k, P, D, function() {
                p ? g.offData(_) : g.stop()
            })
        }
        var Mu = window,
            Lu = Mu.nav,
            Bu = Mu.setStyle,
            Du = Mu.getLang,
            Nu = "._im_sick_reload",
            Au = "._im_sick_timer",
            Hu = 5e3,
            Ru = 6e5,
            Fu = 30,
            qu = 400,
            Uu = void 0,
            zu = void 0;

        function Wu(e) {
            var t = ge("page_header"),
                n = window.clientHeight() - t.offsetHeight - Fu - 2,
                r = qu;
            Bu(e, {
                height: Math.max(n, r)
            })
        }

        function Ku(e) {
            var t = Object(i.N)(Math.floor(Math.max(e, 0) / 1e3), !0);
            return t ? Du("mail_sick_timer").replace(/{timer}/gi, t) : ""
        }

        function Vu() {
            Lu.reload({
                force: !0
            })
        }

        function Qu(e) {
            return {
                unmount: function() {
                    clearInterval(zu), clearTimeout(Uu), Object(s.c)(e)
                }
            }
        }

        function Xu(e, t, n) {
            Wu(e);
            var r, i, a = (0, Object(s.b)(Qu).bindMutations)(Object(s.a)({
                    handlers: function(t, n) {
                        t(e.querySelector(Nu), "click", Vu), t(window, "resize", Wu.bind(null, e))
                    }
                })),
                o = (r = localStorage.getItem("im_sick_timer"), i = r ? Math.min(2 * parseInt(r), Ru) : Hu, localStorage.setItem("im_sick_timer", i), i),
                c = e.querySelector(Au),
                l = +new Date;
            return c.innerHTML = Ku(o), zu = setInterval(function() {
                c.innerHTML = Ku(l + o - new Date)
            }, 500), Uu = setTimeout(Vu, o), a
        }
        var Gu = n("E2g8"),
            Ju = n("f4YT"),
            Yu = Gu.Promise;
        window.IM = {
            init: function(e) {
                if (window.imwl = e.imwl, Object(m.d)(), addTemplates(Ju), window.Promise || (window.Promise = Yu), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.failed) return Xu(geByClass1("im-sick", ge("page_body")));
                localStorage.removeItem("im_sick_timer"), e.tabbedPeers = (e.tabbedPeers || []).map(function(e) {
                    return {
                        peer: e,
                        type: "perm"
                    }
                }), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                    blacklist_hash: e.thash
                };
                var t = -10800 - 60 * (new Date).getTimezoneOffset(),
                    n = e.timeshift;
                e.timeshift = n - t, e.oCache = {}, e.ref_id = nav.objLoc.ref, e.ref_source = nav.objLoc.ref_source;
                var a = e.owners;
                e.owners = void 0;
                var o = g(e);
                a.forEach(function(e) {
                    return Object(B.a)(o, e)
                }), a = void 0, Object(i.Lb)(o, o.get().tabs), cur.imClassicInterface = Object(i.ib)(o);
                var s = Pu(geByClass1("js-im-page", ge("page_body")), o);
                Object(r.ad)(o.get()), window.IMBRIDGE = {
                    chatPhotoSaved: function(e) {
                        curBox() && curBox().hide();
                        var t = (e || {})[1];
                        return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || o.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                    },
                    updateHistory: function(e) {
                        o.set(r.Yc.bind(null, e)).then(function() {
                            s.updateHistory(e)
                        })
                    },
                    syncHistory: function(e) {
                        isFunction(e) || (e = function() {}), o.set(r.Dc.bind(null, e)).then(function() {
                            s.syncHistory(e)
                        })
                    },
                    activateTab: function(e) {
                        o.get().gid || o.get().longpoll.push([Object(c.bb)(intval(e), !1, !1, !0)])
                    }
                };
                var l = !1;
                cur.nav.push(function() {
                    if (l) return !0;
                    o.get().audio_msg && o.get().audio_msg.isRecording && s.cancelRecording(), AudioMessagePlayer.detachPlayer();
                    var t = s.route.apply(null, arguments);
                    return !1 !== t && (s.unmount(), window.IMBRIDGE = void 0, o.unmount(), window.store = void 0, l = !0, e = !1, o = !1, s = !1, Object(m.e)()), t
                })
            }
        };
        try {
            stManager.done("imn.js")
        } catch (e) {}
    },
    "MV/q": function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR")),
            a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };
        var o = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return r.getRef = function(e) {
                    r.element = e
                }, r.resize = function() {
                    var e = r.element;
                    if (e) {
                        var t = e.offsetHeight,
                            n = e.scrollHeight,
                            i = 0;
                        n + i <= t && (i = 0), e.value && r.setState({
                            height: n - i
                        }), r.setState({
                            height: 0
                        }, function() {
                            var t = e.scrollHeight - i;
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
                    value: void 0 === n.value ? n.initialValue || "" : void 0
                }, void 0 !== n.value && (r.isControlledOutside = !0), r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                this.props.grow && this.resize()
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = (e.initialValue, e.grow, e.style),
                    o = (e.onResize, e.value),
                    s = function(e, t) {
                        var n = {};
                        for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                        return n
                    }(e, ["className", "initialValue", "grow", "style", "onResize", "value"]),
                    c = this.isControlledOutside ? o : this.state.value,
                    l = this.state.height || n.height || 66;
                return r.createElement("textarea", a({}, s, {
                    value: c,
                    onChange: this.onChange,
                    onInput: this.onChange,
                    onPaste: this.onChange,
                    ref: this.getRef,
                    style: Object.assign({
                        height: l
                    }, n),
                    className: Object(i.a)("Textarea", t)
                }))
            }, t
        }(r.Component);
        t.a = o, o.defaultProps = {
            initialValue: "",
            grow: !0,
            onResize: function() {},
            style: {}
        }
    },
    MhhX: function(e, t, n) {
        "use strict";
        n.d(t, "n", function() {
            return a
        }), n.d(t, "l", function() {
            return o
        }), n.d(t, "e", function() {
            return s
        }), n.d(t, "k", function() {
            return c
        }), n.d(t, "c", function() {
            return l
        }), n.d(t, "g", function() {
            return d
        }), n.d(t, "d", function() {
            return f
        }), n.d(t, "m", function() {
            return m
        }), n.d(t, "f", function() {
            return p
        }), n.d(t, "i", function() {
            return g
        }), n.d(t, "j", function() {
            return h
        }), n.d(t, "o", function() {
            return b
        }), n.d(t, "h", function() {
            return _
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return y
        }), n.d(t, "p", function() {
            return j
        });
        var r = n("f01n"),
            i = n("aong");

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
            return e.flags & r.m
        }

        function l(e) {
            var t = e.attaches.filter(function(e) {
                return "mail" === e.type
            }).length > 0;
            return e.attaches.filter(function(e) {
                return "reply" === e.type
            }).length > 0 || e.flags & r.k && t
        }

        function u(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function d(e) {
            return u(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function f(e) {
            return Boolean(e.attaches.find(function(e) {
                return "doc" === e.type && "audiomsg" === e.kind
            }))
        }

        function m(e) {
            return Boolean(e.attaches.find(function(e) {
                return "sticker" === e.type
            }))
        }

        function p(e) {
            return u(e, "gift")
        }

        function g(e) {
            return u(e, "money_transfer", "money_request")
        }

        function h(e) {
            return u(e, "money_request")
        }

        function b(e) {
            return u(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function _(e) {
            return e.flags & r.l
        }

        function v(e) {
            return c(e) ? vk.id : e.userId
        }

        function y(e, t) {
            var n = Object(i.s)(e);
            return c(t) ? n.id : t.userId
        }

        function j(e) {
            return e.update_time > 0
        }
    },
    N1NS: function(e, t, n) {
        "use strict";
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
                            l = s[1],
                            u = void 0;
                        if (hasClass(e.target, c) ? u = l(e, e.target) : (a = gpeByClass(c, e.target, e.currentTarget)) && (u = l(e, a)), !1 === u) break
                    }
            }
        }

        function o(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        n.d(t, "b", function() {
            return u
        }), n.d(t, "a", function() {
            return f
        }), n.d(t, "c", function() {
            return m
        });
        var s = window,
            c = s.addEvent,
            l = s.removeEvent;

        function u(e) {
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

        function d(e, t, n, r, o) {
            ! function(e, t, n, r) {
                var o = i.get(e);
                o || (i.set(e, {}), o = i.get(e));
                for (var s = t.split(" "), c = 0; c < s.length; c++) {
                    var l = s[c];
                    o[l] || (o[l] = [], addEvent(e, l, a)), o[l].push([n, r])
                }
            }(t, n, r, o), e._registeredHandlers.push(["delegate", t, n, r, o])
        }

        function f(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                c(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), d.bind(null, t)), t
        }

        function m(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, n, r) {
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
                }.apply(void 0, o(t)) : l.apply(void 0, o(t))
            }), e._registeredHandlers = []
        }
    },
    NsuH: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR")),
            a = n("BN/X");
        var o = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return r.onError = function() {
                    r.setState({
                        errored: !0
                    })
                }, r.state = {}, r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.getPhotoImage = function() {
                var e = this.props,
                    t = e.size,
                    n = e.photo,
                    i = e.title;
                return r.createElement("img", {
                    width: t,
                    height: t,
                    src: this.state.errored ? "/images/camera_c.gif" : n,
                    alt: i,
                    onError: this.onError,
                    className: "Entity__photo"
                })
            }, t.prototype.render = function() {
                var e, t, n, o = this.props,
                    s = o.className,
                    c = o.style,
                    l = o.size,
                    u = o.photo,
                    d = o.href,
                    f = o.title,
                    m = o.description,
                    p = o.target,
                    g = (n = !!l, (t = "Entity--size" + l) in (e = {}) ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e);
                return r.createElement("div", {
                    className: Object(i.a)("Entity", s, g),
                    style: c
                }, r.createElement("div", {
                    className: "Entity__aside"
                }, "string" == typeof u ? d ? r.createElement("a", {
                    href: d
                }, this.getPhotoImage()) : this.getPhotoImage() : u), r.createElement("div", {
                    className: "Entity__main"
                }, f && d ? r.createElement("div", {
                    className: "Entity__title"
                }, r.createElement(a.a, {
                    href: d,
                    dangerouslySetInnerHTML: {
                        __html: f
                    },
                    target: p
                })) : r.createElement("div", {
                    className: "Entity__title",
                    dangerouslySetInnerHTML: {
                        __html: f
                    }
                }), "string" != typeof m ? r.createElement("div", {
                    className: "Entity__description"
                }, m) : r.createElement("div", {
                    className: "Entity__description",
                    dangerouslySetInnerHTML: {
                        __html: m
                    }
                })))
            }, t
        }(r.PureComponent);
        t.a = o, o.defaultProps = {
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
            return o
        }), n.d(t, "g", function() {
            return s
        }), n.d(t, "d", function() {
            return c
        }), n.d(t, "f", function() {
            return l
        }), n.d(t, "k", function() {
            return d
        }), n.d(t, "m", function() {
            return f
        }), n.d(t, "l", function() {
            return m
        }), n.d(t, "h", function() {
            return p
        }), n.d(t, "i", function() {
            return h
        }), n.d(t, "j", function() {
            return b
        }), n.d(t, "c", function() {
            return _
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return y
        });
        var r = n("1y80"),
            i = n("aong"),
            a = {};

        function o(e) {
            Object(r.b)(.1, "im_forward_stat", u(e), !!e.get().gid)
        }

        function s(e, t) {
            Object(r.b)(.1, "im_forward_from_community_stat", u(e), !!e.get().gid, +t)
        }

        function c() {
            Object(r.b)(1, "im_apply_community_template_stat", 1)
        }

        function l() {
            Object(r.b)(1, "messages_channel_forward_click", 1)
        }

        function u(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function d(e, t, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(r.a)(1)) return function() {};
            var a = +new Date,
                o = g(e);
            return function() {
                var e = +new Date - a;
                Object(r.c)("messages_send_time_web", e, t, n, o, i)
            }
        }

        function f(e, t, n, r) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var i = [t.messageId.replace("rid", ""), n, r].join("_"),
                    o = t.attaches.length > 0;
                a[i] = d(e, n, r, o)
            }
        }

        function m(e, t, n, r) {
            var i = [t.randomId, n, r].join("_"),
                o = a[i];
            o && (o(), delete a[i])
        }

        function p(e, t, n, i) {
            var a = g(e),
                o = "" === t ? "network" : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_errors_web", o, n, i, a)
        }

        function g(e) {
            var t = Object(i.s)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function h(e) {
            var t = Object(i.s)(e),
                n = t.imQueue(t.peer).length;
            Object(r.a)(1) && Object(r.c)("messages_send_queue_size", n)
        }

        function b(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_retry", 1, t, e)
        }

        function _() {
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
            return f
        });
        var r = n("ERyv");

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
            }), setTimeout(l, 1e4)
        }

        function l() {
            window.lpWeird.length && (Object(r.b)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function u() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function d() {
            var e;
            u() && (s().forEach(function(e) {
                !o().find(function(t) {
                    return e.ev === t.ev
                }) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, a("red", "im not fc", e.ev), Object(r.c)() && c("im not fc", e.ev))
            }), o().forEach(function(e) {
                var t = s().find(function(t) {
                    return t.ev === e.ev
                });
                t && t.warned && !e.warned && (e.warned = !0, a("red", "now fc like im", e.ev), Object(r.c)() && c("now fc like im", e.ev))
            })), e = Date.now() - 3e4, window.lpBufferFc = o().filter(function(t) {
                return t.time > e
            }), window.lpBufferIm = s().filter(function(t) {
                return t.time > e
            })
        }

        function f(e) {
            var t;
            u() && ((t = o()).push.apply(t, i(e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            }))), setTimeout(d, 0));
            a.apply(void 0, ["green", "fc"].concat(i(e)))
        }
        window.longpollTesting_onImEvents = function(e) {
            var t;
            u() && ((t = s()).push.apply(t, i(e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            }))), setTimeout(d, 1100)), a.apply(void 0, ["blue", "im"].concat(i(e)))
        }
    },
    P13b: function(e, t, n) {
        "use strict";
        var r = n("f01n"),
            i = n("h++7"),
            a = n("nyd8"),
            o = n("rHUl"),
            s = n("MhhX"),
            c = n("p3re"),
            l = n("eTng"),
            u = n("vT4u"),
            d = n("N1NS"),
            f = function() {
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
            m = "_im_join_chat";

        function p(e, t) {
            var n = Object(d.a)({
                handlers: function(n, i) {
                    i(e, "click", m, function(e) {
                        return function(e, t) {
                            var n = domData(t, "chat-id"),
                                i = domData(t, "hash");
                            return lockButton(t), Object(u.Z)(n, i, e.get()).then(function(n) {
                                var i = f(n, 1)[0];
                                unlockButton(t), e.get().longpoll.push([Object(r.bb)(i)])
                            }).catch(function(e) {
                                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                            })
                        }(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(d.c)(n)
                }
            }
        }
        var g = n("aong"),
            h = n("86+7"),
            b = n("Wu9C"),
            _ = n("wSs/"),
            v = n("ERyv"),
            y = n("lJdi"),
            j = n("t7n3");
        n.d(t, "t", function() {
            return C
        }), n.d(t, "l", function() {
            return S
        }), n.d(t, "s", function() {
            return x
        }), n.d(t, "v", function() {
            return I
        }), n.d(t, "j", function() {
            return T
        }), n.d(t, "g", function() {
            return P
        }), n.d(t, "b", function() {
            return M
        }), n.d(t, "c", function() {
            return L
        }), n.d(t, "e", function() {
            return B
        }), n.d(t, "d", function() {
            return D
        }), n.d(t, "f", function() {
            return N
        }), n.d(t, "h", function() {
            return A
        }), n.d(t, "a", function() {
            return H
        }), n.d(t, "k", function() {
            return R
        }), n.d(t, "o", function() {
            return F
        }), n.d(t, "m", function() {
            return q
        }), n.d(t, "n", function() {
            return U
        }), n.d(t, "p", function() {
            return z
        }), n.d(t, "i", function() {
            return W
        }), n.d(t, "u", function() {
            return K
        }), n.d(t, "q", function() {
            return V
        }), n.d(t, "r", function() {
            return Q
        }), n.d(t, "U", function() {
            return Xe
        }), n.d(t, "jc", function() {
            return Ge
        }), n.d(t, "L", function() {
            return Je
        }), n.d(t, "y", function() {
            return Ye
        }), n.d(t, "G", function() {
            return Ze
        }), n.d(t, "fb", function() {
            return et
        }), n.d(t, "ec", function() {
            return tt
        }), n.d(t, "Gb", function() {
            return nt
        }), n.d(t, "Q", function() {
            return rt
        }), n.d(t, "I", function() {
            return at
        }), n.d(t, "Jc", function() {
            return ot
        }), n.d(t, "J", function() {
            return st
        }), n.d(t, "Vb", function() {
            return lt
        }), n.d(t, "K", function() {
            return ut
        }), n.d(t, "x", function() {
            return ft
        }), n.d(t, "hc", function() {
            return mt
        }), n.d(t, "Jb", function() {
            return pt
        }), n.d(t, "dc", function() {
            return gt
        }), n.d(t, "lb", function() {
            return ht
        }), n.d(t, "ub", function() {
            return bt
        }), n.d(t, "pb", function() {
            return _t
        }), n.d(t, "Bb", function() {
            return vt
        }), n.d(t, "Cb", function() {
            return yt
        }), n.d(t, "H", function() {
            return Ct
        }), n.d(t, "Hc", function() {
            return St
        }), n.d(t, "Bc", function() {
            return Et
        }), n.d(t, "D", function() {
            return xt
        }), n.d(t, "Xb", function() {
            return Mt
        }), n.d(t, "Qb", function() {
            return Lt
        }), n.d(t, "Wb", function() {
            return Bt
        }), n.d(t, "Sb", function() {
            return Dt
        }), n.d(t, "Zb", function() {
            return Nt
        }), n.d(t, "Rb", function() {
            return At
        }), n.d(t, "ac", function() {
            return Ht
        }), n.d(t, "kc", function() {
            return Rt
        }), n.d(t, "Dc", function() {
            return Ft
        }), n.d(t, "Mb", function() {
            return qt
        }), n.d(t, "Ob", function() {
            return zt
        }), n.d(t, "Nb", function() {
            return Wt
        }), n.d(t, "gc", function() {
            return Kt
        }), n.d(t, "O", function() {
            return Vt
        }), n.d(t, "Hb", function() {
            return Qt
        }), n.d(t, "Tb", function() {
            return Gt
        }), n.d(t, "ic", function() {
            return Jt
        }), n.d(t, "bc", function() {
            return Yt
        }), n.d(t, "w", function() {
            return Zt
        }), n.d(t, "fc", function() {
            return $t
        }), n.d(t, "Ab", function() {
            return en
        }), n.d(t, "zc", function() {
            return tn
        }), n.d(t, "Lc", function() {
            return nn
        }), n.d(t, "Ec", function() {
            return rn
        }), n.d(t, "E", function() {
            return an
        }), n.d(t, "Ub", function() {
            return on
        }), n.d(t, "pc", function() {
            return sn
        }), n.d(t, "rc", function() {
            return cn
        }), n.d(t, "xc", function() {
            return ln
        }), n.d(t, "tc", function() {
            return un
        }), n.d(t, "F", function() {
            return dn
        }), n.d(t, "eb", function() {
            return fn
        }), n.d(t, "Gc", function() {
            return mn
        }), n.d(t, "yc", function() {
            return pn
        }), n.d(t, "C", function() {
            return gn
        }), n.d(t, "qb", function() {
            return hn
        }), n.d(t, "Db", function() {
            return bn
        }), n.d(t, "vb", function() {
            return _n
        }), n.d(t, "xb", function() {
            return vn
        }), n.d(t, "wb", function() {
            return yn
        }), n.d(t, "z", function() {
            return jn
        }), n.d(t, "wc", function() {
            return On
        }), n.d(t, "W", function() {
            return wn
        }), n.d(t, "V", function() {
            return kn
        }), n.d(t, "mc", function() {
            return Sn
        }), n.d(t, "lc", function() {
            return En
        }), n.d(t, "S", function() {
            return xn
        }), n.d(t, "oc", function() {
            return In
        }), n.d(t, "mb", function() {
            return Tn
        }), n.d(t, "Kc", function() {
            return Pn
        }), n.d(t, "Pb", function() {
            return Mn
        }), n.d(t, "tb", function() {
            return Ln
        }), n.d(t, "cb", function() {
            return Bn
        }), n.d(t, "ab", function() {
            return Dn
        }), n.d(t, "bb", function() {
            return Nn
        }), n.d(t, "db", function() {
            return An
        }), n.d(t, "cc", function() {
            return Hn
        }), n.d(t, "Ib", function() {
            return Fn
        }), n.d(t, "Ic", function() {
            return qn
        }), n.d(t, "Yb", function() {
            return Un
        }), n.d(t, "sc", function() {
            return zn
        }), n.d(t, "nc", function() {
            return Wn
        }), n.d(t, "Y", function() {
            return Kn
        }), n.d(t, "A", function() {
            return Vn
        }), n.d(t, "uc", function() {
            return Qn
        }), n.d(t, "vc", function() {
            return Xn
        }), n.d(t, "Eb", function() {
            return Gn
        }), n.d(t, "P", function() {
            return Jn
        }), n.d(t, "Kb", function() {
            return Yn
        }), n.d(t, "Lb", function() {
            return Zn
        }), n.d(t, "Cc", function() {
            return $n
        }), n.d(t, "sb", function() {
            return er
        }), n.d(t, "qc", function() {
            return tr
        }), n.d(t, "Ac", function() {
            return nr
        }), n.d(t, "B", function() {
            return rr
        }), n.d(t, "T", function() {
            return ir
        }), n.d(t, "N", function() {
            return ar
        }), n.d(t, "M", function() {
            return or
        }), n.d(t, "X", function() {
            return sr
        }), n.d(t, "Z", function() {
            return o.t
        }), n.d(t, "ib", function() {
            return o.z
        }), n.d(t, "rb", function() {
            return o.G
        }), n.d(t, "nb", function() {
            return o.D
        }), n.d(t, "jb", function() {
            return o.B
        }), n.d(t, "R", function() {
            return o.e
        }), n.d(t, "zb", function() {
            return o.I
        }), n.d(t, "ob", function() {
            return o.E
        }), n.d(t, "kb", function() {
            return o.C
        }), n.d(t, "gb", function() {
            return o.x
        }), n.d(t, "Fc", function() {
            return o.Q
        }), n.d(t, "hb", function() {
            return l.b
        }), n.d(t, "Fb", function() {
            return l.d
        }), n.d(t, "yb", function() {
            return l.c
        });
        var O = function() {
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
            w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function k(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var C = "_im_mess_sending",
            S = "_im_mess_failed",
            E = "_im_mess_original",
            x = "_im_mess_restore",
            I = "_im_typing",
            T = "chat_create",
            P = "chat_title_update",
            M = "chat_invite_user",
            L = "chat_kick_user",
            B = "chat_photo_update",
            D = "chat_photo_remove",
            N = "chat_pin_message",
            A = "chat_unpin_message",
            H = "chat_invite_user_by_link",
            R = "_im_deselect_all",
            F = "_im_top_notice_hide",
            q = "_im_aside_notice_hide",
            U = "_im_aside_promo_block_hide",
            z = "_im_vkadmin_promo_link",
            W = "_im_clear_recent",
            K = "_im_toggle_mr_tab",
            V = "_im_mess_search",
            Q = "_im_pinned",
            X = window,
            G = X.vk,
            J = X.ls,
            Y = X.se,
            Z = X.re,
            $ = X.rs,
            ee = X.sech,
            te = X.inArray,
            ne = X.intval,
            re = X.trim,
            ie = X.stripHTML,
            ae = X.domFC,
            oe = X.domPS,
            se = X.domLC,
            ce = X.domChildren,
            le = X.domClosestSibling,
            ue = X.domData,
            de = X.geByClass,
            fe = X.geByClass1,
            me = X.gpeByClass,
            pe = X.addClass,
            ge = X.removeClass,
            he = X.toggleClass,
            be = X.hasClass,
            _e = X.attr,
            ve = X.setStyle,
            ye = X.val,
            je = X.getTemplate,
            Oe = X.getLang,
            we = X.langSex,
            ke = X.langDate,
            Ce = X.langNumeric,
            Se = X.getDateText,
            Ee = X.getSmDate,
            xe = X.getShortDate,
            Ie = X.isSameDate,
            Te = X.isToday,
            Pe = X.ajax,
            Me = X.showBox,
            Le = X.showFastBox,
            Be = X.showTabbedBox,
            De = X.showTooltip,
            Ne = X.mobPlatforms,
            Ae = X.onlinePlatformClass,
            He = X.AudioMessagePlayer,
            Re = X.Emoji,
            Fe = X.slideUp,
            qe = X.fadeOut,
            Ue = X.cancelEvent,
            ze = 4096,
            We = 100,
            Ke = 8,
            Ve = 52,
            Qe = "chatPosition";

        function Xe() {
            return J.get(Qe) || 0
        }

        function Ge(e) {
            e >= window.clientHeight() - 30 && (e = 0), J.set(Qe, e)
        }

        function Je(e, t) {
            var n = fe(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && ve(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Ye(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Ze(e, t, n, r) {
            var i = t && !n ? 1 : !t && n ? -1 : 0;
            i && !Object(o.z)(e) && r().compensateHistoryHeightChange(i)
        }

        function $e(e, t, n, r) {
            var i = window.devicePixelRatio >= 2 ? "256" : "128",
                a = "animation" === n,
                o = "im_gift";
            a && (o += " sticker_img");
            var s = '<img height="128" class="' + o + '" src="' + Stickers.getStickerUrl(ne(e), i) + '"/>';
            if (a) {
                var c = "animatedSticker" + r;
                s = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + ("/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e) + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + ne(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + s + "</div>";
                var l = !1;
                browser.msie ? (0 ^ r) === r && (l = !0) : l = Number.isInteger(r), l && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (s = '<a onmouseover="return Emoji.stickerOver(' + ne(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + ne(t) + ', this, event);">' + s + "</a>"), s = '<div class="im_sticker_row">' + s + "</div>"
        }

        function et(e, t, n) {
            var r = e.get ? e.get() : e;
            if (vt(r, t)) {
                var i = r.tabs[t].deleted || [];
                return te(n, i)
            }
            return !1
        }

        function tt(e, t, n) {
            var r = n.randomId,
                i = fe("_im_mess_rid" + r, t);
            return i && (t = ft(e, n, t = Ut([i], t), !0, !1)), t
        }

        function nt(e) {
            var t = Object(o.a)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : rt().then(function(e) {
                return e.length > 0
            }).catch(function(e) {
                return !1
            })
        }

        function rt() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function it(e) {
            return je("im_preloader", {
                preloader: $(G.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function at(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function ot(e, t, n) {
            var r = ue(n, "msgid"),
                i = fe("_im_mess_" + r, t),
                a = n.cloneNode(!0);
            return i && (i.parentNode.replaceChild(a, i), ut(t)), t
        }

        function st(e, t, n) {
            var r = ct(e, t),
                i = fe("_im_mess_" + t.messageId, n);
            return i && (i.parentNode.replaceChild(Y(r), i), ut(n)), n
        }

        function ct(e, t) {
            var n = ["_im_mess"],
                r = Object(s.n)(e.tabs[t.peerId], t),
                i = Object(s.c)(t) ? je("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: it("reply"),
                    text: ""
                }) : "";
            Object(s.k)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(s.k)(t) && n.push("im-mess_out"), Object(s.p)(t) && n.push("im-mess_was_edited"), Object(_.a)(e, t) && n.push("im-mess_editable"), Object(s.h)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var a = Date.now() - 1e3 * t.date > 1e3;
            t.local && a && n.push("im-mess_sending"), t.local && n.push("" + C), t.local && Object(s.p)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + S), Object(s.f)(t) && n.push("im-mess_gift");
            var u = lt(t),
                d = function(e, t) {
                    var n = "",
                        r = Object(g.s)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(s.p)(t) && (n += je("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(o.B)(e) && r) {
                        var i = t.kludges.ref_source,
                            a = {};
                        try {
                            (a = JSON.parse(Object(j.I)(i))).link && a.info && (a.link = Object(c.e)(Object(j.c)(a.link), c.b.bind(null, !1)), a = Object(j.c)(langStr(Oe("mail_source_info"), "link", a.link, "info", Object(j.c)(a.info))), n += je("sImLblWasSourceInfo", {
                                source: a
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                f = i + kt(e, t.text, t.kludges, !1, t.peerId);
            "" != f && (f += d), t.subject && "..." !== t.subject.trim() && !Object(l.b)(t.peerId) && (f = je("im_topic", {
                topic: t.subject
            }) + f);
            var m = je("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: u.join(""),
                text: Object(s.f)(t) ? '<div class="im-mess--gift-lbl">' + f + "</div>" : ""
            });
            return Object(s.f)(t) || (m = f + m), "" == f && (m += d), je("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + Oe("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + Oe("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            }).replace("%text%", function() {
                return m
            })
        }

        function lt(e) {
            return e.attaches.reduce(function(t, n) {
                return !Object(s.c)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push($e(n.id, n.productId, n.kind, e.messageId)) : t.push($e(n.id, n.productId)) : t.push(it(n.type)), t) : t
            }, [])
        }

        function ut(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) be(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", je("sImHistoryRowActions")), ge(t[n], "_im_mess_noa")
        }

        function dt(e, t, n) {
            var r, i, a, o, s, c = G.id,
                l = e.attaches[0],
                u = l.initiatorId,
                d = l.state,
                f = l.receiverId,
                m = void 0;
            switch (d) {
                case "reached":
                    m = Oe(c === u ? "mail_call_outgoing" : "mail_call_incoming");
                    var p = t ? "" : (r = l.duration, i = Math.floor(r / 3600), a = Math.floor(r / 60) - 60 * i, o = !1, s = !1, [i, a, r - 3600 * i - 60 * a].reduce(function(e, t) {
                        return 0 !== t || s ? (o && (t = t < 10 ? "0" + t : t), o = !0, s = !0, e + ("" !== e ? ":" : "") + t) : (s = !0, e)
                    }, ""));
                    m = m.replace("{duration}", p);
                    break;
                case "canceled_by_initiator":
                    m = Oe(c === u ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (c === u) {
                        if (t) return Oe("mail_call_declined");
                        var g = Object(h.c)(n, f);
                        return g ? we(g.sex, Oe("mail_call_declined_by", "raw")).replace("{user_name}", g.first_name) : Oe("mail_call_declined")
                    }
                    return Oe("mail_call_canceled");
                default:
                    m = Oe("mail_added_call")
            }
            return je("im_calls_link", {
                text: m
            })
        }

        function ft(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                i = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                a = Date.now() - 1e3 * t.date > 1e3,
                c = e.tabs[t.peerId];
            if (!n || fe("_im_mess", n) || fe("_im_bar_date", n) || (n.innerHTML = ""), c.skipped > 0) return n;
            var u = [];
            t.local || (u = e.imQueue(t.peerId, r)), u.length > 0 && Ut(u.map(function(e) {
                return fe("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var d = ct(e, t),
                f = se(n);
            be(f, "_im_mess_stack") || (f = le(f, "._im_mess_stack", -1));
            for (var m = Object(o.k)(e, t.peerId, t.messageId); t.peerId === e.peer && m && !fe("_im_mess_" + m.messageId);) m = Object(o.k)(e, t.peerId, m.messageId);
            var p = fe("_im_unread_bar_row", n),
                b = Object(s.b)(t),
                _ = m ? jt(m.date, e) : 0;
            if (!m || Ot(c, m, t, e, i)) {
                var v = "",
                    y = !1;
                if (p && Object(s.k)(t) && Mn(e, n, t.peerId), 1 === c.unread && !Object(s.k)(t) && i && (v += je("im_mess_bar", {}), y = !0, Mn(e, n, t.peerId)), !Te(new Date(_))) {
                    var j = new Date,
                        O = y ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += je("im_day_bar", {
                        day: xe(t.date, e.timeshift, !0, Oe("months_of", "raw"), !0),
                        date: t.date,
                        day_class: j.getDate() + j.getMonth() + j.getFullYear() + " " + O
                    })
                }
                if (Object(s.l)(t)) v += je("im_service_row", {
                    text: Yt(e, t, c),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(s.e)(t)) v += je("im_service_row", {
                    text: Jt("", dt(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var w = e.gid && Object(s.k)(t) ? ne(t.kludges.from_admin) || -e.gid : 0,
                        k = Object(h.c)(e, w ? -e.gid : b) || c,
                        S = Object(l.b)(t.peerId) ? k.name : k.first_name,
                        E = k.link || c.href,
                        x = je("im_mess_stack_name", {
                            name: S,
                            link: E,
                            class: Object(s.i)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(s.f)(t)) {
                        var I = Oe("mail_gift_message_sent", "raw");
                        x += ' <span class="im-mess-stack--gift">' + we(k.sex || 0, I) + "</span>"
                    }
                    if (Object(s.i)(t)) {
                        var T = Object(s.j)(t) ? Oe("mail_money_request_message_sent", "raw") : Oe("mail_money_tranfer_message_sent", "raw");
                        x += ' <span class="im-mess-stack--money-transfer">' + we(k.sex || 0, T) + "</span>"
                    }
                    var P = e.gid ? "/gim" + e.gid : "/im",
                        M = void 0;
                    if (M = t.local ? wt(t.date, e.timeshift) : je("im_stack_date", {
                            date: wt(t.date, e.timeshift),
                            link: P + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), w && e.admins[w]) {
                        var L = e.admins[w],
                            B = w === G.id ? Oe("mail_by_you") : L[0];
                        M = M + " " + je("im_admin_link", {
                            name: B,
                            href: L[1]
                        })
                    }
                    v += je("im_mess_stack", {
                        photo: k.photo,
                        href: E,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: ie(x),
                        stack_name: x,
                        peerId: b,
                        date: M,
                        messages: d,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(g.q)(ee(v)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else p && e.peer === t.peerId && !c.inplaceSearch && Object(s.k)(t) && Mn(e, n, t.peerId), fe("_im_stack_messages", f).appendChild(Y(d));
            return Object(s.k)(t) && !a && setTimeout(function() {
                var e = fe("_im_mess_" + t.messageId, n);
                be(e, C) && pe(e, "im-mess_sending")
            }, 500), u = u.filter(function(e) {
                return e.rid !== t.randomId
            }), ut(n), mt(u, e, n)
        }

        function mt(e, t, n) {
            var r = void 0;
            return (r = "object" === (void 0 === e ? "undefined" : w(e)) ? e : t.imQueue(e, !1)).length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(o.m)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return ft(t, e, n, !1)
            }), n
        }

        function pt(e, t, n) {
            var r = e.tabs[t];
            return Object(g.q)(de("_im_mess_unread", n)).forEach(function(e) {
                var t, n = ne(ue(e, "msgid"));
                n > 0 && r.out_up_to >= n && (ge(e, "_im_mess_unread"), ge(e, "im-mess_unread"), (t = fe("_im_mess_blind_unread_marker", e)) && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex")))
            }), n
        }

        function gt(e, t, n) {
            var r = t.peerId,
                i = t.messageId,
                a = fe("_im_msg_reply" + i, e),
                o = fe("_im_msg_media" + i, e),
                s = n.tabs[r].mediacontent[i][0];
            return a && (a.innerHTML = s[0]), o && (o.innerHTML = s[1]), e
        }

        function ht(e, t) {
            if (!Object(o.E)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function bt(e, t) {
            return e === t.peer
        }

        function _t(e, t) {
            return Object(y.m)(Object(o.t)(e, t), 1024)
        }

        function vt(e, t) {
            return !!e.tabs[t]
        }

        function yt(e, t) {
            return !!vt(e, t) && null !== e.tabs[t].lastmsg
        }

        function jt(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function Ot(e, t, n, r, i) {
            if (Object(s.b)(t) !== Object(s.b)(n)) return !0;
            var a = jt(t.date, r),
                c = jt(n.date, r);
            return !Ie(a, c) || (!(!Object(o.B)(r) || ne(t.kludges.from_admin) === ne(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(s.l)(t) && !Object(s.l)(n)) || (!(!Object(s.e)(n) && !Object(s.e)(t)) || (!(!Object(s.f)(t) && !Object(s.f)(n)) || (!(!Object(s.g)(t) && !Object(s.g)(n)) || (!!Object(s.c)(n) || !(Object(s.n)(e, t) === Object(s.n)(e, n) || !i || Object(s.k)(n) || en(n.peerId, r.gid)))))))))
        }

        function wt(e, t) {
            return ke(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function kt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = Math.round(1e9 * Math.random()).toString(16),
                s = {},
                l = 0;
            return t = (t = Object(c.e)(t || "", c.b.bind(null, r))).replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + l + "_" + a + "!";
                return s[t] = e, l++, t
            }), t = Object(c.f)(t), t = Object(c.c)(t), t = Object(c.d)(t, function(t) {
                var n = Object(o.i)(e);
                return '<a href="/' + (n ? "gim" + n : "im") + "?sel=" + (i || Object(o.o)(e)) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(s).forEach(function(e) {
                t = t.replace(e, function() {
                    return s[e]
                })
            }), n.emoji && (t = Re.emojiToHTML(t, !0)), t
        }

        function Ct(e) {
            return Object(l.b)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : function(e) {
                return e > 19e8 && e < 2e9
            }(e) ? "mr" + (e - 19e8) : e
        }

        function St(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - ne(e.substr(1));
                case "c":
                    return 2e9 + ne(e.substr(1));
                default:
                    return ne(e)
            }
        }

        function Et(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function xt(e, t) {
            return {
                search: {
                    name: Oe("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: Oe("mail_block_comm_messages")
                },
                block_notify: {
                    icon: "block",
                    name: Oe("mail_block_notify_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: Oe("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? Oe("mail_im_delete_email_contact") : Oe("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: Oe("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: Oe("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: Oe("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? Oe("mail_im_show_media_history_group") : Oe("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: Oe("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: Oe("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: Oe("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: Oe(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: Oe(t ? "mail_leave_channel" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: Oe("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: Oe(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: Oe("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: Oe("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: Oe("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: Oe(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function It(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = je("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Tt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = je("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Pt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return It(e, t[n])
                    }).join("");
                case 3:
                    return It(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return Tt(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return Tt(e, t[n])
                    }).join("")
            }
        }

        function Mt(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (Object(l.b)(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return Pt(t.photo);
            var r = t.data.active.slice(0, 4).map(h.c.bind(null, e));
            return Pt(r.map(function(e) {
                return e.photo
            }), n ? [] : r.map(function(e) {
                return e.link
            }))
        }

        function Lt(e) {
            var t = e.get().gid ? Oe("mail_search_only_messages_comm") : Oe("mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + V + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Bt() {
            return '<li class="im-search-results-head">' + Oe("mail_search_messages") + "</li>"
        }

        function Dt() {
            return '<li class="im-search-results-head">' + Oe("mail_search_conversations_sep") + "</li>"
        }

        function Nt() {
            return '<li class="im-search-results-head">' + Oe("mail_search_dialogs_sep") + "</li>"
        }

        function At() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + Oe("mail_recent_searches") + '\n    <button type="button" class="' + W + ' im-page--clear-recent">' + Oe("mail_clear_recent") + "</button>\n  </li>"
        }

        function Ht(e) {
            var t = e.get().popular_sugg,
                n = Object(o.z)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(h.c)(e, n) || t,
                    i = e.get().tabs[n] || t,
                    a = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return '<div class="' + ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, i.unread > 0 && "sugg-is_unread", a && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ") + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Ae(i.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + Et(i.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function Rt(e, t, n) {
            var r = fe("_im_mess_" + t.messageId, n);
            if (r) {
                _e(r, "aria-hidden", "false"), pe(r, "im-mess_failed " + S);
                var i = fe("_im_mess_marker", r);
                _e(i, "aria-label", Oe("mail_send_message_error")), _e(i, "role", "link")
            }
            return n
        }

        function Ft(e, t, n) {
            var r = fe("_im_mess_" + t, n);
            if (r) {
                ge(r, "im-mess_failed"), _e(r, "aria-hidden", "true"), ge(r, S);
                var i = fe("_im_mess_marker", r);
                _e(i, "aria-label", ""), _e(i, "role", "")
            }
            return n
        }

        function qt(e, t) {
            return Ut(e.map(function(e) {
                return fe("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            }), t)
        }

        function Ut(e, t) {
            var n = e.filter(function(e) {
                return !be(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                be(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === ce(e).length
            }).map(function(e) {
                return me("_im_mess_stack", e)
            }).forEach(function(e) {
                be(oe(e), "_im_bar_date") && Z(oe(e)), be(oe(e), "_im_unread_bar_row") && Z(oe(e)), Z(e)
            }), t
        }

        function zt(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    be(n, "mess_srv") && (t = n.parentNode);
                    var r = me("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === ce(n.parentNode).length && r.parentNode.removeChild(r))
                }
                be(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function Wt(e, t, n, r) {
            return e.map(function(e) {
                return fe("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                ye(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return '<div class="im-mess--text">\n    ' + Oe("delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam") + ' <button type="button" data-peer="' + e + '" class="' + x + ' im-mess--btn">' + Oe("mail_restore") + '</button>\n    <div class="' + E + ' im-mess--original">' + r + "</div>\n  </div>"
                }(t, e, n)), pe(e, "im-mess_light")
            }), r
        }

        function Kt(e, t, n) {
            var r = fe("_im_mess_" + e, n);
            if (r) {
                var i = fe(E, r);
                ye(r, i.innerHTML), ge(r, "im-mess_light")
            }
            return n
        }

        function Vt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1],
                n = arguments[2],
                r = arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Xt(e, t, n, r, !0, i);
            var a = Xt(e, t, n, r, !1, i);
            return a.length > 60 ? Xt(e, t, n, r, !0, i) : a
        }

        function Qt(e) {
            var t, n = (k(t = {}, u.d, 1), k(t, u.c, 2), t),
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

        function Xt(e, t, n, r, i, a) {
            var s = function(e, t, n) {
                var r = [],
                    i = {};
                return Object.keys(t).map(function(n) {
                    ((t[n] || {}).userIds || []).forEach(function(t) {
                        Object(h.b)(e, t) ? parseInt(t, 10) !== e.id && (i[t] = n) : r.push(t)
                    })
                }), r.length && Object(u.hb)(k({}, n, r), e), Object.keys(i).sort(function(e, n) {
                    return t[i[e]].ts - t[i[n]].ts
                })
            }(r, e, t);
            if (0 === s.length) return "";
            var c = Object(l.d)(t) || Object(o.C)(t) ? "first_name" : i ? "short_name" : "name",
                d = Qt(e),
                f = "";
            d === u.c ? f = Oe("mail_recording_audio_several", s.length) : d === u.d && (f = Oe("mail_typing_several", s.length));
            var m = s.slice(0, Math.min(s.length - 1, a)),
                p = m.map(function(e) {
                    return Object(h.c)(r, e)[c]
                }).join(", ");
            if (s.length > a + 1) {
                var g = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(function(n) {
                        var r = e[n].userIds;
                        (void 0 === r ? [] : r).forEach(function(e) {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                p += " " + Oe("mail_and_peer").replace("{count}", g - a).replace("{typing}", f)
            } else {
                if (s.length > 1 && (p += " " + Oe("mail_and_peer_one")), !Object(l.b)(t) && n) p += " " + f;
                else p += " " + Object(h.c)(r, s[m.length])[c] + " " + f
            }
            return p.trim()
        }

        function Gt() {
            return '<div class="im-page--chat-search-empty">\n    ' + Oe("mail_im_search_empty") + "\n  </div>"
        }

        function Jt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" rel="noopener" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function Yt(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = t.kludges,
                a = i.source_act,
                o = ne(i.source_mid),
                s = t.userId,
                c = Object(h.c)(e, s),
                l = "",
                u = s === o;
            switch (a) {
                case T:
                    l = "mail_im_chat_created";
                    break;
                case P:
                    l = i.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case M:
                    l = u ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case L:
                    l = u ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case B:
                    l = "mail_im_photo_set";
                    break;
                case D:
                    l = i.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case N:
                    l = i.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case A:
                    l = i.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case H:
                    l = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (l = (l = we(c.sex, Oe(l, "raw"))).replace("{from}", Jt(c.link, c.name, r)), o && o !== s) {
                var d = i.source_email;
                if (d) l = l.replace("{user}", Jt("/im?email=" + encodeURIComponent(d), "email", r));
                else {
                    var f = Object(h.c)(e, o),
                        m = a === L ? f.inv_name : f.kick_name;
                    l = l.replace("{user}", Jt(f.link, m, r))
                }
            }
            if (i.source_text) {
                var p = i.source_old_text ? '«<b class="im_srv_lnk">' + i.source_old_text + "</b>» &rarr; " : "";
                l = l.replace("{title}", p + '«<b class="im_srv_lnk">' + i.source_text + "</b>»")
            }
            if (i.source_act === N || i.source_act === A)
                if (i.source_message) {
                    var g = Jt("", $t(Re.emojiToHTML(ie(i.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    l = l.replace("{msg}", g)
                } else l = l.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return Jt("", t, !1, "im_srv_mess_link")
                });
            return l
        }

        function Zt(e, t, n, r) {
            if (t === B) {
                var i = fe("_im_mess_" + e.messageId, r);
                if (i) {
                    var a = n.tabs[e.peerId];
                    i.parentNode.innerHTML = je("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Yt(n, e, a) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function $t(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(i.r, "$1$4")
        }

        function en(e, t) {
            return !t && e === G.id
        }

        function tn(e, t) {
            return De(e, {
                url: Object(o.C)(t) ? "al_groups.php" : "al_profile.php",
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
                    i = Y(je("im_preloader", {
                        preloader: $(G.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    a = !1;

                function o() {
                    a = !0, ge(i, "im-preloader_visible"), i.parentNode && i.parentNode.removeChild(i)
                }
                setTimeout(function() {
                    a || ("bottom" === n ? e.appendChild(i) : e.insertBefore(i, ae(e)), pe(i, "im-preloader_visible"))
                }, 0), t.then(o).catch(function(e) {
                    Object(v.a)("wrapLoading", e), o()
                })
            }
        }

        function rn(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, r.l, 0, 0, "", {}, {}, 0, 0, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function an(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = Ke,
                i = !1,
                a = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || be(n, "_im_no_select") || be(n, "im_msg_media_link") || "IMG" == n.tagName && !be(n, "_im_graffiti") && !be(n, "emoji") && !be(n, "emoji_css") && !be(n, "im_gift") || "TEXTAREA" == n.tagName || be(n, "play_new") || be(n, "videoplayer") || (i = a.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !i || !!re((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function on(e, t) {
            return '<div class="im-mess--text">\n      <span>' + Oe("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + Ct(e) + "&msgid=" + t + '">' + Oe("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function sn(e, t, n) {
            var r = Oe("mail_deleteall1"),
                i = Oe("mail_sure_to_delete_all"),
                a = Oe("mail_delete");
            return Object(l.b)(t) && (Object(y.m)(e, 1024) ? (r = Oe("mail_leave_channel"), i = Oe("mail_unfollow_channel_confirmation"), a = Oe("mail_unfollow_channel")) : i = Oe("mail_chat_sure_to_delete_all")), Object(o.C)(t) && (i = Oe("mail_group_sure_to_delete_all")), Le(r, i, a, n, Oe("global_cancel"))
        }

        function cn(e, t, n) {
            var r = Object(o.t)(e, t),
                i = Object(l.b)(t),
                a = i && Object(y.m)(r, 1024),
                s = Oe("mail_deleteall1"),
                c = Oe("mail_sure_to_delete_all"),
                u = Oe("mail_delete");
            if (i) {
                if (r.data.closed || r.data.kicked) return sn(r, t, n.bind(null, !0));
                a ? (s = Oe("mail_leave_channel"), c = Oe("mail_vkcomgroup_leave_confirm"), u = Oe("mail_leave_channel")) : (s = Oe("mail_leave_chat"), c = Oe("mail_chat_leave_confirm"), u = Oe("mail_leave_chat"))
            }
            Object(o.C)(t) && (c = Oe("mail_group_sure_to_delete_all"));
            var d = new MessageBox({
                title: s,
                width: a ? 450 : 500
            }).content(c).setButtons(u, function() {
                return n(!!isChecked(fe("_check_is_delete")) || !i)
            }, Oe("global_cancel")).show();
            return i && !a && d.setControlsText('<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Oe("mail_deleteall1") + "</div>"), d
        }

        function ln(e) {
            return Le(Oe("mail_unpin_title"), Oe("mail_unpin_text"), Oe("mail_unpin"), e, Oe("global_cancel"))
        }

        function un(e, t, n, r) {
            var i = Oe("mail_dialog_msg_delete_N", t),
                a = Le(Oe("mail_dialog_msg_delete_title"), i, Oe("mail_delete"), function() {
                    return r(isChecked(fe("_check_forall")))
                }, Oe("global_cancel")),
                o = "",
                s = !1;
            return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Oe("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), a.setControlsText(o), s && checkbox(fe("_check_forall")), a
        }

        function dn(e, t, n, r, i) {
            t.showProgress(), e.set(r.bind(null, i)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, i), n().updateDialogFilters(e)
            })
        }

        function fn(e, t, n, r) {
            var i = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", i)).then(n().showCreation)
        }

        function mn(e, t, n) {
            var r = e.get();
            if (r.active_tab === i.h && 0 === r.message_requests_cnt) return !1;
            var a = r.active_tab === i.k ? i.h : i.k;
            return e.set(n.bind(null, a)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function pn(e, t, n) {
            if (e.get().active_tab === i.h && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === i.m ? i.h : i.m;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function gn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var i = Object(o.I)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, i !== Object(o.I)(e)), e
            })
        }

        function hn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return i.j[i.i] & n.folders
        }

        function bn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(o.D)(e)) return !1;
            var r = n || e.get().tabs[t];
            return i.j[i.n] & r.folders
        }

        function _n(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function vn(e) {
            return null != e.get().pendingForward
        }

        function yn(e, t) {
            return (t.get().block_states[e] || {}).who === G.id
        }

        function jn(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(i) {
                n[i].time ? !1 === n[i].free && Date.now() - n[i].time >= 5e4 && t.push([r.nb([, 1, "gim" + e.get().gid, i, 0, ""])]) : n[i].time = Date.now()
            })
        }

        function On(e, t, n) {
            var r = void 0;
            return !Be("al_im.php", {
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
                        He.loaded && He.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function wn(e, t) {
            return kn(e.get(), t, Object(o.t)(e, t).last_seen)
        }

        function kn(e, t, n, r) {
            if (n[0]) return Oe("mail_header_online_status") + (Ne[n[0]] ? Cn(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var i = Se(n[1], e.timeshift),
                a = we(Object(h.c)(e, t).sex, Oe("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", i);
            return n[2] && (a += Cn(t, !1, !1, r)), a
        }

        function Cn(e, t, n, r) {
            var i = {
                mid: e
            };
            n || (i.was = 1), t ? i.forcetoup = !0 : i.forcetodown = !0, i = Object.assign(i, r);
            var a = JSON.stringify(i).slice(1, -1).replace(/"/g, "&quot;");
            return je("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: a
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

        function En(e, t) {
            return Me("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function xn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function In(e, t, n, r) {
            var i = void 0;
            Vn(Be("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, a) {
                    a && (i = n(r, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        He.loaded && He.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        i && i.unmount()
                    }
                }
            }, r), e)
        }

        function Tn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function Pn(e, t, n) {
            var r = fe("_im_mess_" + e, n);
            return r && he(r, "im-mess_fav", t), n
        }

        function Mn(e, t, n) {
            var r = fe("_im_unread_bar_row", t);
            if (!r) return t;
            var i, a = le(r, "._im_mess_stack", -1),
                s = le(r, "._im_mess_stack"),
                c = a ? de("_im_mess", a).pop() : null,
                l = s ? fe("_im_mess", s) : null;
            if (Z(r), (i = fe("_im_invisible_bar", t)) && (ge(i, "_im_invisible_bar"), ge(i, "im-page--history-new-bar_hide")), !l || !c) return t;
            var u = ue(l, "msgid"),
                d = Object(o.q)(e, n, u),
                f = Object(o.m)(e, n, u);
            if (!d || Ot(e.tabs[n], d, f, e)) return t;
            var m = fe("_im_stack_messages", a),
                p = fe("_im_stack_messages", s).children;
            return Object(g.q)(p).forEach(function(e) {
                Z(e), m.appendChild(e)
            }), Z(s), t
        }

        function Ln(e, t, n) {
            var r = Object(o.h)(e, e.get().peer);
            if (!r) return [!1, 0];
            var i = fe("_im_mess_" + r, t);
            if (!i) {
                var a = Object(o.k)(e, e.get().peer, r);
                if (!a) return [!0, 0];
                i = fe("_im_mess_" + a.messageId, t)
            }
            var s = be(i, "_im_mess_srv") ? i : me("_im_mess_stack", i);
            if (!s) return [!0, 0];
            var c = i ? i.offsetTop : 0,
                l = s.offsetTop + c,
                u = n.contHeight();
            return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - l)]
        }

        function Bn(e, t, n) {
            Ue(t);
            var r = me("_im_top_notice", n);
            qe(r, 200, Z.pbind(r));
            var i = me("_im_page_dialogs", r);
            i && be(i, "im-page--dialogs-notice") && ge(i, "im-page--dialogs-notice"), Pe.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Dn(e, t, n) {
            Ue(t);
            var r = me("_im_aside_notice", n);
            Fe(r, 200, Z.pbind(r)), Pe.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Nn(e, t) {
            Ue(e);
            var n = me("_im_aside_promo_block", t);
            Fe(n, 200, Z.pbind(n)), Pe.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function An(e, t) {
            me("_im_aside_promo_block", t).classList.add("--action-called"), Pe.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: ue(t, "hash"),
                platform: ue(t, "platform")
            })
        }

        function Hn(e, t, n, r, i) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(c.f)(n, function(e, t, n, r, i) {
                return i
            }), r && (n = Re.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(l.b)(e) && (n = je("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && i.length > 0 && (n = je("im_dialog_media", {
                name: Rn(i[0], i)
            })), n
        }

        function Rn(e, t) {
            var n = {
                photo: Oe("mail_added_photos", "raw"),
                video: Oe("mail_added_videos", "raw"),
                audio: Oe("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return Ce(r, Oe("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var i = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return Ce(i, n[e.type], !0);
                case "audio_playlist":
                    return "audio_album" === e.kind ? Oe("mail_added_audio_album") : Oe("mail_added_audio_playlist");
                case "artist":
                    return Oe("mail_added_artist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return Oe("mail_added_graffiti");
                        case "audiomsg":
                            return Oe("mail_added_audiomsg");
                        default:
                            return Oe("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return Oe("mail_added_geo");
                case "wall":
                    return Oe("mail_added_wall");
                case "wall_reply":
                    return Oe("mail_added_wall_reply");
                case "gift":
                    return Oe("mail_added_gift");
                case "link":
                case "share":
                    return Oe("mail_added_link");
                case "sticker":
                    return Oe("mail_added_sticker");
                case "market":
                    return Oe("mail_added_market_item");
                case "money_transfer":
                    return Oe("mail_added_money_transfer");
                case "money_request":
                    return Oe("mail_added_money_request");
                case "story":
                    return Oe("mail_added_story");
                case "mask":
                    return Oe("mail_added_mask");
                case "article":
                    return Oe("mail_added_article");
                case "call":
                    return Oe("mail_added_call");
                case "poll":
                    return Oe("mail_added_poll");
                case "podcast":
                    return Oe("mail_added_podcast");
                default:
                    return Oe("mail_added_" + e.type)
            }
            return ""
        }

        function Fn(e) {
            pe(e, "im-send-btn_loading")
        }

        function qn(e) {
            ge(e, "im-send-btn_loading")
        }

        function Un(e) {
            var t = e.get(),
                n = Object(o.p)(e);
            if (!n || !Object(b.a)(e, Object(o.o)(e))) return "";
            var r = Object(h.c)(e, n.userId);
            if (!r) return "";
            var i = function(e, t) {
                var n = "";
                if (t && Object(s.j)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                    var r = "%s " + t.kludges.attach1_currency;
                    if ("RUB" === t.kludges.attach1_currency && (r = Oe("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                        var i = Ce(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                            a = Ce(t.kludges.attach1_total_amount / 1e3, r, !0);
                        n = Oe("mail_money_request_collected_amount_from").replace("{amount}", i).replace("{total_amount}", a)
                    } else {
                        var o = Ce(t.kludges.attach1_tr_amount / 1e3, r, !0);
                        n = Oe("mail_money_request_collected_amount").replace("{amount}", o)
                    }
                    if (ne(t.kludges.attach1_held_amount)) {
                        var c = Ce(t.kludges.attach1_held_amount / 1e3, r, !0);
                        n += " " + Oe("mail_money_request_held_amount").replace("{amount}", c)
                    }
                    t.text && (n += '<span class="divider"></span>' + kt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += je("im_pinned_message_media_bar", {
                        percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                    }))
                }
                return n
            }(e, n);
            return i || (i = !(i = n.text) && n.attaches.length ? je("im_pinned_message_media", {
                text: Rn(n.attaches[0], n.attaches)
            }) : kt(e, i, n && n.kludges || {}) || ""), i = i.replace(/<br\s?\/?>/gi, " "), je("im_pinned_message", {
                date: Ee(n.date, t.timeshift),
                content: i,
                link: r.link,
                name: r.name
            })
        }

        function zn(e, t, n) {
            var r = n.getAttribute("data-info");
            r && De(n, {
                text: r,
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                hidedt: 1e3,
                shift: [0, 4]
            })
        }

        function Wn(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && De(n, {
                text: Oe("mail_message_edited") + " " + Ee(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Kn() {
            var e = getSize(fe(Q))[1];
            return e || (e = Ve), e
        }

        function Vn(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                be(e.target, "_im_edit_time") ? Wn(t, 0, e.target) : be(e.target, "_im_page_info") && zn(0, 0, e.target)
            })
        }

        function Qn(e, t, n, r, i) {
            var a = e.get(),
                o = void 0;
            Vn(Be("al_im.php", {
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
                        He.loaded && He.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, i), e)
        }

        function Xn(e, t, n) {
            var r = e.get();
            Vn(Be("al_im.php", {
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
                        He.loaded && He.detachPlayer(!0)
                    },
                    onDestroy: function() {}
                }
            }, n), e)
        }

        function Gn(e, t) {
            return !(!Object(l.b)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Jn(e) {
            return !Object(l.b)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Yn(e, t) {
            var n = Object(h.c)(e, t.peerId),
                r = Object(o.t)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(l.b)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function Zn(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Yn(e, t[n])
        }

        function $n(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                i = r ? r[1].split(";") : [];
            for (i.length > We && (r[1] = i.slice(0, We).join(";")); e.length > ze;) {
                var a = e.substr(0, ze).lastIndexOf(" "); - 1 == a && (a = ze), n.push({
                    msgText: re(e.substr(0, a))
                }), e = re(e.substr(a))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), i = i.slice(We); i.length; i = i.slice(We)) n.push({
                attaches: [
                    ["mail", i.slice(0, We).join(";")]
                ]
            });
            return n
        }

        function er(e) {
            return e.length > ze
        }

        function tr(e, t, n) {
            var r = !1;
            Me("al_im.php", {
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
                        return Le(Oe("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = p(t.bodyNode, e)
                }
            }, {})
        }

        function nr() {
            Le(Oe("global_error"), Oe("mail_message_wait_until_uploaded"))
        }

        function rr(e, t) {
            var n = Object(o.t)(e, t.peerId) || {};
            if (!t || !Object(s.k)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (et(e, t.peerId, t.messageId)) return !1;
            if (Object(l.b)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ir(e, t) {
            return t.map(function(t) {
                return Object(h.c)(e, t)
            })
        }

        function ar(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                i = [];
            if ([
                    [31536e3, Oe(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, Oe(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, Oe(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, Oe(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, Oe(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, Oe(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, Oe(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(function(e) {
                    var t = O(e, 2),
                        n = t[0],
                        a = t[1],
                        o = Math.floor(r / n);
                    r %= n, o >= 1 && i.push(Ce(o, a))
                }), 1 === (n = i.length)) return i.pop();
            var a = i.slice(0, n - 1).join(", "),
                o = i.pop();
            return Oe("global_and").replace(/{before}/gi, a).replace(/{after}/gi, o)
        }

        function or(e, t, n, i) {
            i && !et(e, n, i) && (Object(o.m)(e, n, i) ? (e.setState({
                msgid: i
            }), Object(a.b)({
                msgid: i
            }), t()) : e.get().longpoll.push([Object(r.bb)(n, i)]))
        }

        function sr(e) {
            var t = fe("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                r = Object(o.P)(n.msgs[ue(t, "msgid")]);
            return r && r.peerId == e.get().peer ? r : null
        }
    },
    PjZB: function(e, t, n) {
        "use strict";
        var r = n("q1tI");
        n("17x9");
        var i = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return r.id = Math.round(1e6 * Math.random()).toString(16), r.setSpinnerParams(n), r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentWillReceiveProps = function(e) {
                this.setSpinnerParams(e)
            }, t.prototype.setSpinnerParams = function(e) {
                this.offset = Math.round(Math.PI * e.size), this.c = .5 * e.size, this.animation = function(e, t) {
                    if (!e || !t) return "";
                    var n = Object.keys(t).map(function(e) {
                        return e + " {" + Object.keys(t[e]).map(function(n) {
                            return n + ":" + t[e][n]
                        }).join(";") + "}"
                    }).join("");
                    return "@-webkit-keyframes " + e + " {" + n + "} @keyframes " + e + " {" + n + "}"
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
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.style,
                    n = e.color,
                    i = e.size,
                    a = e.duration,
                    o = e.strokeWidth,
                    s = this.id,
                    c = this.offset,
                    l = this.animation;
                return r.createElement("div", {
                    className: "Spinner",
                    style: t
                }, r.createElement("svg", {
                    className: "Spinner__svg",
                    width: i,
                    height: i,
                    viewBox: "0 0 " + i + " " + i,
                    xmlns: "http://www.w3.org/2000/svg"
                }, r.createElement("g", {
                    style: {
                        width: i,
                        height: i,
                        transformOrigin: .5 * i + "px " + .5 * i + "px"
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
                    strokeWidth: o,
                    style: {
                        animationName: "dash" + s,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: a + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * i,
                    cy: .5 * i,
                    r: .5 * i - .5 * o
                }))))
            }, t
        }(r.Component);
        t.a = i, i.defaultProps = {
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
                    for (var e = void 0, t = void 0, n = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], r = 0, i = n.length, a = {}; r < i; r++)
                        if ((e = n[r]) && e[1] in document) {
                            for (r = 0, t = e.length; r < t; r++) a[n[0][r]] = e[r];
                            return a
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
            return s
        });
        var r = n("nAFc"),
            i = {},
            a = window.getLang,
            o = window.langNumeric;

        function s(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments[2],
                s = "number" == typeof t,
                c = e + (t || s ? ".raw" : "");
            if (void 0 === i[c]) {
                var l = t || s ? a(e, "raw") : a(e);
                "string" == typeof l ? i[c] = Object(r.a)(l) : Array.isArray(l) && (i[c] = l.map(r.a))
            }
            return s ? o(t, i[c], n) : i[c] || ""
        }
        t.a = {
            getLang: s
        }
    },
    ThPM: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR"));
        var a = function(e) {
            function t() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.photos,
                    n = e.links,
                    a = e.className,
                    o = Object(i.a)("MembersGrid", "MembersGrid--" + Math.min(t.length, 4), a);
                return r.createElement("div", {
                    className: o
                }, t.map(function(e, t) {
                    var i = n && n[t] ? n[t] : void 0,
                        a = i ? "a" : "span";
                    return r.createElement(a, {
                        key: t,
                        href: i,
                        className: "MembersGrid__i",
                        style: {
                            backgroundImage: "url(" + e + ")"
                        }
                    })
                }))
            }, t
        }(r.Component);
        t.a = a, a.defaultProps = {
            links: [],
            className: ""
        }
    },
    WDXI: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = n("i8i4"),
            a = (n("17x9"), n("pemR")),
            o = n("MV/q");
        var s = window.elfocus,
            c = {
                height: "auto"
            },
            l = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.onChange = function(e) {
                        r.props.onChange ? r.props.onChange(e) : r.setState({
                            value: e.target.value,
                            changed: r.props.value !== r.state.value
                        })
                    }, r.onClick = function() {
                        r.setState({
                            editing: !0
                        }, function() {
                            r.textarea && s(r.textarea)
                        })
                    }, r.onBlur = function() {
                        r.state.changed || r.setState({
                            editing: !1
                        })
                    }, r.onSave = function() {
                        r.props.validate && !r.props.validate(r.state.value) || (r.setState({
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
                        changed: !!n.onChange && n.changed
                    }, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.componentWillReceiveProps = function(e) {
                    this.setState({
                        value: e.value,
                        changed: e.onChange ? e.changed : e.value === this.state.value
                    })
                }, t.prototype.componentDidMount = function() {
                    this.el = i.findDOMNode(this), this.el.addEventListener("keydown", this.onKeydown)
                }, t.prototype.componentWillUnmount = function() {
                    this.el.removeEventListener("keydown", this.onKeydown)
                }, t.prototype.render = function() {
                    var e = this.props,
                        t = e.className,
                        n = e.validate,
                        i = this.state,
                        s = i.editing,
                        l = i.changed,
                        u = i.value,
                        d = Object(a.a)("EditableLabel", {
                            "EditableLabel--editing": s,
                            "EditableLabel--changed": l,
                            "EditableLabel--invalid": n && !n(u)
                        }, t);
                    return r.createElement("div", {
                        className: d
                    }, s ? r.createElement(r.Fragment, null, r.createElement(o.a, {
                        className: "EditableLabel__textarea",
                        onChange: this.onChange,
                        onInput: this.onChange,
                        onPaste: this.onChange,
                        value: u,
                        onBlur: this.onBlur,
                        style: c,
                        rows: "1",
                        ref: this.getRef
                    }), l && r.createElement("button", {
                        className: "EditableLabel__save",
                        onClick: this.onSave
                    })) : r.createElement("div", {
                        className: "EditableLabel__text",
                        onClick: this.onClick
                    }, u))
                }, t
            }(r.Component);
        t.a = l, l.defaultProps = {
            value: "",
            changed: !1,
            useEnter: !1
        }
    },
    Wu9C: function(e, t, n) {
        "use strict";
        var r = n("N1NS"),
            i = n("vT4u");

        function a(e) {
            return {
                unmount: function() {
                    Object(r.c)(e)
                }
            }
        }

        function o(e, t, n) {
            return (0, Object(r.b)(a).bindMutations)(Object(r.a)({
                handlers: function(e, t) {}
            }))
        }
        var s = n("P13b"),
            c = n("rHUl"),
            l = n("aong"),
            u = n("uytb");
        n.d(t, "a", function() {
            return m
        }), n.d(t, "c", function() {
            return p
        }), n.d(t, "d", function() {
            return g
        }), n.d(t, "e", function() {
            return h
        }), n.d(t, "b", function() {
            return v
        });
        var d = "_im_pin_hide",
            f = "_im_pinned_message";

        function m(e, t) {
            if (Object(l.s)(e).searchShown) return !1;
            var n = Object(c.t)(e, t),
                r = n && Object(c.P)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function p(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(c.t)(e, t),
                a = i && Object(c.P)(i.pinned);
            i && a && (i.pinHideId = a.chat_local_id, cur.imDb.update(u.a, [i.peerId, i.pinHideId]), b(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function g(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(c.t)(e, t);
            i && i.pinHideId && (delete i.pinHideId, cur.imDb.update(u.a, [i.peerId, void 0]), b(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function h(e, t, n) {
            var r = b.bind(null, n, t),
                a = Object(s.xc)(function() {
                    a.hideProgress(), a.hide(), e.set(i.Oc.bind(null, t)).then(r).then(function(e) {
                        return e.set(i.Nc.bind(null, t))
                    }).then(r)
                })
        }

        function b(e, t, n) {
            return e().updateChatTopic(t, n), Object(i.oc)(n.get()), e().updateActions(n), n
        }

        function _(e) {
            return {
                unmount: function() {
                    Object(r.c)(e)
                }
            }
        }

        function v(e, t, n) {
            var i = Object(r.b)(_).bindMutations,
                a = function(e, t, n) {
                    var r = e.get().peer,
                        i = Object(c.P)(Object(c.t)(e, r).pinned);
                    if (n.target.classList.contains(d)) i && p(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var a = i && i.messageId;
                        a && !Object(s.fb)(e, r, a) ? Object(s.M)(e, t().focusOnMessage, r, a) : Object(s.uc)(e, t, r, o, n), statlogsValueEvent("im_pinned_messages", "open")
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
            return i(Object(r.a)({
                handlers: function(t, n) {
                    n(e, "click", f, a), n(e, "mouseover", d, l)
                }
            }))
        }
    },
    XTb9: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR")),
            a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };
        var o = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
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
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentWillReceiveProps = function(e) {
                !this.props.shown && e.shown && this.setState({
                    shown: !0
                })
            }, t.prototype.componentWillUnmount = function() {
                this.timeout && clearTimeout(this.timeout)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = (e.shown, e.callback, e.duration, e.className),
                    n = e.children,
                    o = function(e, t) {
                        var n = {};
                        for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                        return n
                    }(e, ["shown", "callback", "duration", "className", "children"]),
                    s = Object(i.a)("BlinkText", {
                        "BlinkText--shown": this.state.shown
                    }, t);
                return r.createElement("span", a({}, o, {
                    className: s,
                    onTransitionEnd: this.onTransitionEnd,
                    "aria-hidden": !0
                }), n)
            }, t
        }(r.Component);
        t.a = o, o.defaultProps = {
            duration: 2e3
        }
    },
    XpgC: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = n("i8i4"),
            a = (n("17x9"), n("pemR")),
            o = n("clTp");
        var s = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var i = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return i.onMouseEnter = function(e) {
                    if (i.el) {
                        var t = i.props,
                            n = t.text,
                            r = t.position,
                            a = t.align,
                            s = t.marginTop,
                            c = t.marginLeft,
                            l = Object(o.a)(i.el);
                        i.update({
                            text: n,
                            position: r,
                            align: a,
                            rect: l,
                            marginTop: s,
                            marginLeft: c
                        })
                    }
                }, i.onMouseLeave = function(e) {
                    return i.update()
                }, i.onTransitionEnd = function(e) {
                    "visibility" === e.propertyName && i.state.tooltip && i.setState({
                        tooltip: void 0
                    })
                }, i.renderTooltip = function() {
                    if (!i.state.tooltip) return null;
                    var e, t, n, o = i.state.tooltip,
                        s = o.x,
                        c = o.y,
                        l = o.position,
                        u = o.align,
                        d = o.text,
                        f = o.removed,
                        m = Object(a.a)("Tooltip", "Tooltip--" + l, (e = {
                            "Tooltip--removed": !!f
                        }, t = "Tooltip--align-" + u, n = "t" === l || "b" === l, t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n, e));
                    return r.createElement("div", {
                        className: m,
                        style: {
                            top: c,
                            left: s
                        },
                        onTransitionEnd: i.onTransitionEnd
                    }, r.createElement("div", {
                        className: "Tooltip__in",
                        dangerouslySetInnerHTML: {
                            __html: d
                        }
                    }))
                }, i.state = {}, i
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                this.el = i.findDOMNode(this), this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("mouseleave", this.onMouseLeave)
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
                    i = e.rect,
                    a = e.marginTop,
                    o = e.marginLeft,
                    s = i.left,
                    c = i.top;
                switch (t) {
                    case "t":
                        s += .5 * i.width;
                        break;
                    case "r":
                        s += i.width, c += .5 * i.height;
                        break;
                    case "b":
                        s += .5 * i.width, c += i.height;
                        break;
                    case "l":
                        c += .5 * i.height
                }
                s = Math.round(s + o), c = Math.round(c + a), this.setState({
                    tooltip: {
                        position: t,
                        align: n,
                        text: r,
                        x: s,
                        y: c
                    }
                })
            }, t.prototype.render = function() {
                var e = this.renderTooltip();
                return e ? (this.defaultNode || "undefined" == typeof window || (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), r.createElement(r.Fragment, null, this.props.children, i.createPortal(e, this.defaultNode))) : this.props.children
            }, t
        }(r.Component);
        t.a = s, s.defaultProps = {
            position: "b",
            align: "center",
            marginTop: 0,
            marginLeft: 0
        }
    },
    clTp: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = e.getBoundingClientRect(),
                n = document.body,
                r = document.documentElement,
                i = window.pageYOffset || r.scrollTop || n.scrollTop,
                a = window.pageXOffset || r.scrollLeft || n.scrollLeft,
                o = r.clientTop || n.clientTop || 0,
                s = r.clientLeft || n.clientLeft || 0;
            return {
                top: Math.round(t.top + i - o),
                left: Math.round(t.left + a - s),
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
        n.d(t, "a", function() {
            return r
        })
    },
    dLHM: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR")),
            a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };
        var o = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return r.onChange = function(e) {
                    r.isControlledOutside || r.setState({
                        value: e.target.value
                    }), r.props.onChange && r.props.onChange(e)
                }, r.getRef = function(e) {
                    r.element = e
                }, void 0 !== n.value || n.isControlledOutside ? r.isControlledOutside = !0 : r.state = {
                    value: n.initialValue || ""
                }, r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.alignment,
                    n = e.value,
                    o = (e.onChange, e.initialValue, e.className),
                    s = (e.isControlledOutside, function(e, t) {
                        var n = {};
                        for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                        return n
                    }(e, ["alignment", "value", "onChange", "initialValue", "className", "isControlledOutside"])),
                    c = {
                        "Input--left": "left" === t,
                        "Input--center": "center" === t,
                        "Input--right": "right" === t
                    };
                return r.createElement("input", a({}, s, {
                    className: Object(i.a)("Input", c, o),
                    ref: this.getRef,
                    value: this.isControlledOutside ? n : this.state.value,
                    onChange: this.onChange
                }))
            }, t
        }(r.Component);
        t.a = o, o.defaultProps = {
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
            return u
        }), n.d(t, "b", function() {
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
                var l = e[c],
                    u = l.charCodeAt(0);
                u >= 48 && u <= 57 || "_" === l || "-" === l ? s += l : "(" !== l && ")" !== l && ":" !== l && "," !== l || ("" !== s && (i.push(s), n.push("id"), s = ""), i.push(l), n.push(l))
            }
            s.length > 0 && (i.push(s), n.push("id"));
            var d = function e(t, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (o > 50) return [
                        [], t.length
                    ];
                    for (var s = [], c = ""; i < t.length;) {
                        var l = t[i];
                        if ("id" === l) c = n[i];
                        else if ("," === l && c) s.push(a(c)), c = "";
                        else if ("(" === l) {
                            var u = e(t, n, i + 1, o + 1),
                                d = r(u, 2),
                                f = d[0];
                            i = d[1], s.push(a(c, f)), c = ""
                        } else if (")" === l) return "" !== c && s.push(a(c)), [s, i];
                        i++
                    }
                    return c && s.push(a(c)), [s, i]
                }(n, i),
                f = r(d, 1)[0];
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

        function l(e) {
            return 0 == e
        }

        function u(e) {
            return e > 0 && e < 2e9
        }

        function d(e) {
            return e > 2e9
        }
    },
    enZq: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR"));

        function a(e) {
            var t = {
                "List--border": !!e.border
            };
            return r.createElement("ul", {
                className: Object(i.a)("List", t, e.className),
                style: e.style
            }, e.children)
        }
        a.defaultProps = {
            border: !0
        }
    },
    f01n: function(e, t, n) {
        "use strict";
        n.d(t, "U", function() {
            return o
        }), n.d(t, "M", function() {
            return s
        }), n.d(t, "Q", function() {
            return c
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "H", function() {
            return u
        }), n.d(t, "I", function() {
            return d
        }), n.d(t, "s", function() {
            return f
        }), n.d(t, "r", function() {
            return m
        }), n.d(t, "d", function() {
            return p
        }), n.d(t, "e", function() {
            return g
        }), n.d(t, "W", function() {
            return h
        }), n.d(t, "J", function() {
            return b
        }), n.d(t, "Y", function() {
            return _
        }), n.d(t, "X", function() {
            return v
        }), n.d(t, "G", function() {
            return y
        }), n.d(t, "h", function() {
            return j
        }), n.d(t, "P", function() {
            return O
        }), n.d(t, "L", function() {
            return w
        }), n.d(t, "T", function() {
            return k
        }), n.d(t, "S", function() {
            return C
        }), n.d(t, "K", function() {
            return S
        }), n.d(t, "V", function() {
            return E
        }), n.d(t, "R", function() {
            return x
        }), n.d(t, "F", function() {
            return I
        }), n.d(t, "b", function() {
            return T
        }), n.d(t, "c", function() {
            return P
        }), n.d(t, "i", function() {
            return M
        }), n.d(t, "O", function() {
            return L
        }), n.d(t, "f", function() {
            return B
        }), n.d(t, "g", function() {
            return D
        }), n.d(t, "N", function() {
            return N
        }), n.d(t, "m", function() {
            return H
        }), n.d(t, "l", function() {
            return R
        }), n.d(t, "n", function() {
            return F
        }), n.d(t, "j", function() {
            return q
        }), n.d(t, "o", function() {
            return U
        }), n.d(t, "k", function() {
            return z
        }), n.d(t, "q", function() {
            return W
        }), n.d(t, "p", function() {
            return K
        }), n.d(t, "B", function() {
            return V
        }), n.d(t, "v", function() {
            return Q
        }), n.d(t, "t", function() {
            return X
        }), n.d(t, "x", function() {
            return G
        }), n.d(t, "A", function() {
            return J
        }), n.d(t, "C", function() {
            return Y
        }), n.d(t, "E", function() {
            return Z
        }), n.d(t, "D", function() {
            return $
        }), n.d(t, "u", function() {
            return ee
        }), n.d(t, "w", function() {
            return te
        }), n.d(t, "y", function() {
            return ne
        }), n.d(t, "z", function() {
            return re
        }), n.d(t, "gb", function() {
            return ie
        }), n.d(t, "vb", function() {
            return ae
        }), n.d(t, "Db", function() {
            return oe
        }), n.d(t, "zb", function() {
            return se
        }), n.d(t, "Z", function() {
            return ce
        }), n.d(t, "hb", function() {
            return le
        }), n.d(t, "wb", function() {
            return ue
        }), n.d(t, "ib", function() {
            return de
        }), n.d(t, "pb", function() {
            return fe
        }), n.d(t, "qb", function() {
            return me
        }), n.d(t, "mb", function() {
            return pe
        }), n.d(t, "lb", function() {
            return ge
        }), n.d(t, "yb", function() {
            return he
        }), n.d(t, "ub", function() {
            return be
        }), n.d(t, "Cb", function() {
            return _e
        }), n.d(t, "fb", function() {
            return ve
        }), n.d(t, "db", function() {
            return ye
        }), n.d(t, "eb", function() {
            return je
        }), n.d(t, "Fb", function() {
            return Oe
        }), n.d(t, "rb", function() {
            return we
        }), n.d(t, "Hb", function() {
            return ke
        }), n.d(t, "Gb", function() {
            return Ce
        }), n.d(t, "ob", function() {
            return Se
        }), n.d(t, "tb", function() {
            return Ee
        }), n.d(t, "ab", function() {
            return xe
        }), n.d(t, "jb", function() {
            return Ie
        }), n.d(t, "Eb", function() {
            return Te
        }), n.d(t, "Bb", function() {
            return Pe
        }), n.d(t, "sb", function() {
            return Me
        }), n.d(t, "Ab", function() {
            return Le
        }), n.d(t, "bb", function() {
            return Be
        }), n.d(t, "cb", function() {
            return De
        }), n.d(t, "kb", function() {
            return Ne
        }), n.d(t, "nb", function() {
            return Ae
        }), n.d(t, "xb", function() {
            return He
        });
        var r = n("eTng"),
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
            l = "event_add_message",
            u = "event_read_inbound",
            d = "event_read_outbound",
            f = "event_got_online",
            m = "event_got_offline",
            p = "event_chat_changed",
            g = "event_chat_updated",
            h = "event_typing",
            b = "event_recoding_audio",
            _ = "event_video_call",
            v = "event_unread_count",
            y = "event_notify_settings_changed",
            j = "event_empty",
            O = "event_reset_directories",
            w = "event_replace_directories",
            k = "event_set_directories",
            C = "event_resync",
            S = "event_refresh_lp_key",
            E = "transition_event",
            x = "reset_peer",
            I = "mutex",
            T = "change_peer",
            P = "event_change_tab",
            M = "event_failed_message",
            L = "event_resend",
            B = "event_delete_dialog",
            D = "event_edit_message",
            N = "event_replace_message",
            A = "event_audio_start",
            H = 2,
            R = 8,
            F = 64,
            q = 128,
            U = 65536,
            z = 1 << 21,
            W = 1,
            K = 8,
            V = 1,
            Q = 2,
            X = 3,
            G = 4,
            J = 5,
            Y = 6,
            Z = 7,
            $ = 8,
            ee = 9,
            te = 10,
            ne = 11,
            re = 12;

        function ie(e) {
            var t = i(e, 2)[1];
            return {
                type: a,
                localId: t
            }
        }

        function ae(e) {
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

        function oe(e) {
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

        function se(e) {
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

        function ce(e) {
            var t = i(e, 11),
                n = t[1],
                a = t[2],
                o = t[3],
                s = t[4],
                c = t[5],
                u = t[6],
                d = t[7],
                f = t[8],
                m = t[9],
                p = t[10],
                g = extend(u, d || void 0);
            return {
                type: l,
                messageId: intval(n),
                flags: intval(a),
                peerId: intval(o),
                date: intval(s),
                attaches: Object(r.a)(g, n),
                subject: u.title || "",
                text: c,
                kludges: g,
                randomId: intval(f),
                userId: Object(r.b)(o) ? intval(g.from) : intval(o),
                update_time: p,
                chat_local_id: m
            }
        }

        function le(e) {
            var t = ce(e);
            return t.type = D, t
        }

        function ue(e) {
            var t = ce(e);
            return t.type = N, t
        }

        function de(e) {
            return extend({}, e, {
                type: D
            })
        }

        function fe(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: u,
                peerId: n,
                upToId: r,
                unread: a
            }
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

        function pe(e) {
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

        function ge(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: m,
                userId: -n,
                reason: r,
                lastSeenTs: a
            }
        }

        function he(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: O,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function be(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: w,
                peerId: n,
                mask: r
            }
        }

        function _e(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: k,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function ve(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: B,
                peerId: n,
                localId: r
            }
        }

        function ye(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: p,
                chatId: n,
                self: r
            }
        }

        function je(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: g,
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
                type: h,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function we(e) {
            var t = i(e, 5),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4];
            return {
                type: b,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function ke(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: _,
                userId: n,
                callId: r
            }
        }

        function Ce(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: v,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: a
            }
        }

        function Se(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: y,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function Ee(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = ce([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = D, r
        }

        function xe(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: A,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Ie(e) {
            return {
                type: j,
                params: e
            }
        }

        function Te(e) {
            return {
                type: E,
                state: e
            }
        }

        function Pe() {
            return {
                type: C
            }
        }

        function Me(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: S,
                key: n,
                url: r
            }
        }

        function Le() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: x,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Be(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: T,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: i
            }
        }

        function De(e) {
            return {
                type: P,
                tab: e
            }
        }

        function Ne(e, t, n) {
            return {
                type: M,
                message: t,
                peer: e,
                error: n
            }
        }

        function Ae(e) {
            var t = i(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                a = t[3],
                o = t[4],
                s = t[5];
            return {
                type: I,
                free: !!intval(n) || intval(o) === vk.id,
                resource: r,
                peerId: intval(a),
                who: intval(o),
                name: s
            }
        }

        function He(e, t) {
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
            im_simple_name: '<div class="im-page--title %more_cls%"> <span class="im-page--title-main" title="%name_attr%" %ads_union%><span class="im-page--title-main-in"><a href="%href%" target="_blank" class="im-page--title-main-inner _im_page_peer_name">%name%</a><span class="im-page--title-main-verified _im_chat_verified"></span></span></span> <span class="im-page--title-meta _im_page_peer_online">%online%</span> </div>',
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
        n.d(t, "a", function() {
            return r
        })
    },
    "h++7": function(e, t, n) {
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
        n.d(t, "t", function() {
            return a
        }), n.d(t, "f", function() {
            return o
        }), n.d(t, "B", function() {
            return s
        }), n.d(t, "q", function() {
            return c
        }), n.d(t, "r", function() {
            return l
        }), n.d(t, "b", function() {
            return u
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "v", function() {
            return f
        }), n.d(t, "u", function() {
            return m
        }), n.d(t, "d", function() {
            return p
        }), n.d(t, "o", function() {
            return g
        }), n.d(t, "e", function() {
            return h
        }), n.d(t, "z", function() {
            return b
        }), n.d(t, "A", function() {
            return _
        }), n.d(t, "w", function() {
            return v
        }), n.d(t, "m", function() {
            return y
        }), n.d(t, "h", function() {
            return j
        }), n.d(t, "n", function() {
            return O
        }), n.d(t, "i", function() {
            return w
        }), n.d(t, "k", function() {
            return k
        }), n.d(t, "l", function() {
            return C
        }), n.d(t, "g", function() {
            return S
        }), n.d(t, "j", function() {
            return E
        }), n.d(t, "y", function() {
            return x
        }), n.d(t, "p", function() {
            return I
        }), n.d(t, "c", function() {
            return T
        }), n.d(t, "s", function() {
            return P
        }), n.d(t, "x", function() {
            return M
        });
        var a = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            o = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            s = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            c = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            l = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            u = 38,
            d = 40,
            f = 33,
            m = 34,
            p = 35,
            g = 36,
            h = 13,
            b = [u, d, f, m, h, 27, p, g],
            _ = [f, m, d, u, g, p],
            v = "printable",
            y = "unread",
            j = "all",
            O = "unrespond",
            w = "important",
            k = "mr",
            C = "mr_rejected",
            S = [j, y, O, w, k],
            E = (i(r = {}, O, 2), i(r, w, 1), i(r, k, 256), i(r, C, 512), r),
            x = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(function(e) {
                return "xn--" + e
            })),
            I = x.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            T = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            P = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            M = "(^|[s.,:'\";>)(]?)((#(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}))(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'\"&;?<)(]?)"
    },
    hIV1: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        var r = n("q1tI"),
            i = n("pemR");

        function a(e) {
            var t = {
                "SubmitArea--left": !e.alignment || "left" === e.alignment,
                "SubmitArea--center": "center" === e.alignment,
                "SubmitArea--right": "right" === e.alignment
            };
            return r.createElement("div", {
                className: Object(i.a)("SubmitArea", t),
                style: e.style
            }, e.children)
        }
    },
    hOuX: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var r = 2147483647;

        function i() {
            try {
                if (window.crypto) {
                    var e = new Int32Array(1);
                    return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                        return e + t
                    }))
                }
            } catch (e) {}
            return intval(rand(0, r).toFixed(0))
        }
    },
    iN1s: function(e, t, n) {
        "use strict";
        var r = n("DM26"),
            i = n("BxOC"),
            a = n("f01n"),
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
            c = 7,
            l = 4;

        function u(e, t) {
            e.waitAbortFns.push(t)
        }

        function d(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(i.a)(e.url, {
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
                    var n = t.failed ? Object(r.a)(l, null) : {},
                        i = n.abort,
                        a = n.pause;
                    switch (t.failed) {
                        case 1:
                            return u(e, i), e.onHistoryLost(e, t).then(function() {
                                return e.onResult({
                                    ts: t.ts,
                                    updates: [
                                        [-1]
                                    ]
                                })
                            }).then(a).then(function() {
                                return d(e)
                            });
                        case 2:
                            return u(e, i), e.onKeyExpired(e, t).then(function(t) {
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
                                return d(e)
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
            e.isStoppedFn() || d(e).then(e.onResult).catch(function(t) {
                return function(e, t) {
                    if (e.isStoppedFn()) return;
                    e.onRequestError(t), e.waitTimeout = Math.min(64, 2 * e.waitTimeout);
                    var n = Object(r.a)(e.waitTimeout, null),
                        i = n.abort,
                        a = n.pause;
                    return u(e, i), a()
                }(e, t)
            }).then(function() {
                return f(e)
            })
        }

        function m(e, t) {
            var n = !!e.stopped,
                r = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: e.version || c,
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
                                    return a.gb(e);
                                case 1:
                                    return a.vb(e);
                                case 2:
                                    return a.Db(e);
                                case 3:
                                    return a.zb(e);
                                case 4:
                                    return a.Z(e);
                                case 5:
                                    return a.hb(e);
                                case 6:
                                    return a.pb(e);
                                case 7:
                                    return a.qb(e);
                                case 8:
                                    return a.mb(e);
                                case 9:
                                    return a.lb(e);
                                case 10:
                                    return a.yb(e);
                                case 11:
                                    return a.ub(e);
                                case 12:
                                    return a.Cb(e);
                                case 13:
                                    return a.fb(e);
                                case 18:
                                    return a.wb(e);
                                case 51:
                                    return a.db(e);
                                case 52:
                                    return a.eb(e);
                                case 63:
                                    return a.Fb(e);
                                case 64:
                                    return a.rb(e);
                                case 70:
                                    return a.Hb(e);
                                case 80:
                                    return a.Gb(e);
                                case 114:
                                    return a.ob(e);
                                case 116:
                                    return a.tb(e);
                                case 117:
                                    return a.ab(e);
                                case -1:
                                    return a.Bb();
                                case -2:
                                    return a.sb(e);
                                default:
                                    return a.jb(e)
                            }
                        }))
                    },
                    onData: p(t.onData),
                    onRequestError: p(t.onRequestError),
                    onHistoryLost: g(t.onHistoryLost),
                    onKeyExpired: g(t.onKeyExpired),
                    onLpBroken: g(t.onHistoryLost)
                },
                i = t.onEvents;

            function o(e, t, n) {
                r.ts = t;
                for (var o = 0; o < n.length; ++o) n[o].type === a.K && (r.key = n[o].key, r.url = n[o].url);
                i(e, t, n)
            }
            var l = {
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
            return f(r), l
        }

        function p(e) {
            return e || function() {}
        }

        function g(e) {
            return e ? function() {
                return Promise.resolve(e.apply(void 0, arguments))
            } : function() {
                return Promise.reject()
            }
        }
        var h = n("P+eJ"),
            b = n("vT4u");

        function _(e, t) {
            return m(e, {
                onEvents: t,
                onData: O,
                onRequestError: w,
                onHistoryLost: k,
                onKeyExpired: C,
                onLpBroken: S
            })
        }
        n.d(t, "a", function() {
            return _
        });
        var v = 3e4,
            y = {},
            j = Date.now();

        function O(e, t) {
            if (t && t.status && e.lpstat) {
                var n = t.status;
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, n, t.getResponseHeader("x-frontend")), y[n] = n in y ? y[n] + 1 : 1, Date.now() - j >= v && (Object.keys(y).forEach(function(e) {
                    statlogsValueEvent("fc_longpoll", y[e], e, t.getResponseHeader("x-frontend"))
                }), y = {}, j = Date.now())
            }
        }

        function w(e) {
            Object(h.b)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function k(e, t) {
            Object(h.b)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function C(e) {
            return Object(h.b)("red", "LP failed: key is incorrect; refresh key"), Object(i.b)(b.e, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function S() {
            throw window.nav.reload({
                force: !0
            }), new Error("ts is very wrong")
        }
    },
    lJdi: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return c
        }), n.d(t, "d", function() {
            return l
        }), n.d(t, "b", function() {
            return u
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "l", function() {
            return y
        }), n.d(t, "f", function() {
            return j
        }), n.d(t, "e", function() {
            return O
        }), n.d(t, "h", function() {
            return w
        }), n.d(t, "i", function() {
            return k
        }), n.d(t, "j", function() {
            return C
        }), n.d(t, "g", function() {
            return S
        }), n.d(t, "k", function() {
            return E
        }), n.d(t, "m", function() {
            return I
        }), n.d(t, "n", function() {
            return P
        });
        var r, i = n("rHUl"),
            a = n("aong"),
            o = n("P13b");

        function s(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var c = 1,
            l = 4,
            u = 8,
            d = 16,
            f = "see_invite_link",
            m = "change_invite_link",
            p = "invite_user",
            g = "pin_unpin",
            h = "change_title",
            b = "add_admin",
            _ = (s(r = {}, f, 32), s(r, m, 32), s(r, b, d), s(r, p, c), s(r, g, l), s(r, h, u), r),
            v = 1;

        function y(e, t, n) {
            return x(e, f, t, n)
        }

        function j(e, t, n) {
            return x(e, m, t, n)
        }

        function O(e, t, n, r) {
            var o = Object(a.s)(e);
            return !P(Object(i.t)(o, n || o.peer), t) && x(e, b, n, r)
        }

        function w(e, t, n) {
            return x(e, p, t, n)
        }

        function k(e, t, n, r) {
            var s = Object(a.s)(e);
            if (function(e, t) {
                    var n = Object(a.s)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, v)) return !0;
            var c = Object(i.t)(s, n || s.peer);
            return !(c.data.kicked && !c.data.closed) && (!Object(o.pb)(e, n) && (!P(c, t) && (!!P(c, r = void 0 === r ? window.vk.id : r) || (T(c, r) ? !T(c, t) : function(e, t) {
                return -1 !== e.invitedByMe.indexOf(t)
            }(c, t) && !T(c, t)))))
        }

        function C(e, t, n) {
            return x(e, g, t, n)
        }

        function S(e, t, n) {
            return x(e, h, t, n)
        }

        function E(e, t, n) {
            return !Object(i.C)(n) || !!Object(i.t)(e, t).caccess[n]
        }

        function x(e, t, n, r) {
            var s = Object(a.s)(e);
            r = void 0 === r ? window.vk.id : r, n = void 0 === n ? s.peer : n;
            var c = Object(i.t)(s, n),
                l = !c.data.kicked && !c.data.closed,
                u = _[t];
            if (Object(o.pb)(e, n)) switch (t) {
                case b:
                case p:
                    return !1;
                case f:
                    return l;
                default:
                    return s.gid > 0
            }
            switch (t) {
                case f:
                case m:
                case b:
                    return I(c, u) ? T(c, r) && l : P(c, r);
                case p:
                case g:
                case h:
                    return I(c, u) ? T(c, r) && l : l
            }
            return !1
        }

        function I(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function T(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function P(e, t) {
            return e.ownerId === t
        }
    },
    mSoV: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("i8i4")),
            a = n("pemR"),
            o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
        var s = "Select...",
            c = function(e) {
                function t(n) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.handleMouseDown = function(e) {
                        r.props.onFocus && "function" == typeof r.props.onFocus && r.props.onFocus(r.state.opened), "mousedown" === e.type && 0 !== e.button || (e.stopPropagation(), e.preventDefault(), r.props.disabled || r.setState({
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
                        selected: void 0 !== n.value ? r.getOptionByValue(n.options, n.value) : {
                            label: n.placeholder || s,
                            value: ""
                        },
                        opened: !1
                    }, r.mounted = !0, r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.componentWillReceiveProps = function(e) {
                    void 0 !== e.value && e.value !== this.state.selected ? this.setState({
                        selected: this.getOptionByValue(e.options, e.value)
                    }) : void 0 === e.value && this.setState({
                        selected: {
                            label: e.placeholder || s,
                            value: ""
                        }
                    })
                }, t.prototype.componentDidMount = function() {
                    this.el = i.findDOMNode(this), document.addEventListener("click", this.handleDocumentClick, !1), document.addEventListener("touchend", this.handleDocumentClick, !1)
                }, t.prototype.componentWillUnmount = function() {
                    this.mounted = !1, document.removeEventListener("click", this.handleDocumentClick, !1), document.removeEventListener("touchend", this.handleDocumentClick, !1)
                }, t.prototype.getOptionByValue = function(e, t) {
                    return e.find(function(e) {
                        return "object" !== (void 0 === e ? "undefined" : o(e)) ? e === t : e.value === t
                    })
                }, t.prototype.renderOption = function(e) {
                    var t = this,
                        n = Object(a.a)("Select__option", {
                            "Select__option--selected": e === this.state.selected
                        }),
                        i = void 0 !== e.value ? e.value : e.label || e,
                        o = void 0 !== e.label ? e.label : e;
                    return r.createElement("div", {
                        key: i,
                        className: n,
                        onMouseDown: function() {
                            return t.setValue(i, o)
                        },
                        onClick: function() {
                            return t.setValue(i, o)
                        }
                    }, o)
                }, t.prototype.buildMenu = function() {
                    var e = this,
                        t = this.props.options.map(function(t) {
                            return "group" === t.type ? r.createElement("div", {
                                className: "Select__group",
                                key: t.name
                            }, t.name && r.createElement("div", {
                                className: "Select__title"
                            }, t.name), t.items.map(function(t) {
                                return e.renderOption(t)
                            })) : e.renderOption(t)
                        });
                    return t.length ? t : r.createElement("div", {
                        className: "Select__noresults"
                    }, "No options found")
                }, t.prototype.render = function() {
                    var e = this.props,
                        t = e.className,
                        n = e.style,
                        i = Object(a.a)("Select", t, {
                            "Select--opened": this.state.opened,
                            "Select--disabled": this.props.disabled
                        });
                    return r.createElement("div", {
                        className: i,
                        style: n
                    }, r.createElement("div", {
                        className: "Select__control",
                        onClick: this.handleMouseDown
                    }, r.createElement("div", {
                        className: "Select__placeholder"
                    }, "string" == typeof this.state.selected ? this.state.selected : this.state.selected.label), r.createElement("span", {
                        className: "Select__arrow"
                    })), this.state.opened && r.createElement("div", {
                        className: "Select__menu"
                    }, this.buildMenu()))
                }, t
            }(r.Component);
        t.a = c
    },
    nAFc: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return o
        }), n.d(t, "a", function() {
            return s
        }), n.d(t, "b", function() {
            return c
        }), n.d(t, "d", function() {
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
            i = window.Emoji,
            a = [
                ["&amp;", "&"],
                ["&lt;", "<"],
                ["&gt;", ">"],
                ["&quot;", '"']
            ];

        function o(e) {
            return a.reduce(function(e, t) {
                var n = r(t, 2),
                    i = n[0],
                    a = n[1];
                return e.replace(new RegExp(a, "ig"), i)
            }, e)
        }

        function s(e) {
            return a.reduce(function(e, t) {
                var n = r(t, 2),
                    i = n[0],
                    a = n[1];
                return e.replace(new RegExp(i, "ig"), a)
            }, e).replace(/&#(\d+);/g, function(e, t) {
                return String.fromCodePoint(t)
            })
        }

        function c(e) {
            return o(e).replace(/[\u00A0-\u9999<>\&]/gim, function(e) {
                return "&#" + e.charCodeAt(0) + ";"
            })
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.lineBreak,
                r = void 0 !== n && n,
                a = t.convertEmoji,
                c = void 0 === a || a,
                l = s(e);
            return l = l.replace(/\n\r/gi, "\n"), "oneline" === r ? l = l.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === r && (l = l.replace(/\n/gi, "<br>")), l = o(l), c && (l = i.emojiToHTML(l, !0)), l
        }
    },
    nyd8: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return o
        }), n.d(t, "a", function() {
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
    "p+C8": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var r = n("q1tI"),
            i = n("pemR"),
            a = (n("17x9"), Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            });

        function o(e) {
            var t = e.icon,
                n = e.aside,
                o = e.chevron,
                s = e.selectable,
                c = e.border,
                l = e.className,
                u = e.children,
                d = e.active,
                f = e.canBeHovered,
                m = void 0 === f || f,
                p = function(e, t) {
                    var n = {};
                    for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                    return n
                }(e, ["icon", "aside", "chevron", "selectable", "border", "className", "children", "active", "canBeHovered"]),
                g = {
                    "ListItem--chevron": !!o,
                    "ListItem--selectable": !!s,
                    "ListItem--border": !!c,
                    "ListItem--active": !!d,
                    "ListItem--can-be-hovered": m
                };
            return r.createElement("li", a({}, p, {
                className: Object(i.a)("ListItem", g, l)
            }), t && r.createElement("div", {
                className: "ListItem__icon"
            }, t), r.createElement("div", {
                className: "ListItem__main"
            }, u), r.createElement("div", {
                className: "ListItem__aside"
            }, n))
        }
        o.defaultProps = {
            onClick: function() {},
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
            return u
        }), n.d(t, "f", function() {
            return d
        }), n.d(t, "d", function() {
            return p
        }), n.d(t, "a", function() {
            return g
        }), n.d(t, "b", function() {
            return h
        });
        var r = n("h++7"),
            i = void 0,
            a = window,
            o = a.clean,
            s = a.replaceEntities,
            c = a.statlogsValueEvent;

        function l(e, t) {
            for (var n = void 0, i = 0, a = e; null !== (n = r.s.exec(e));) {
                var o = (n = f(n))[0].length,
                    s = n.index + o,
                    c = e[n.index - 1],
                    l = e[s - 1],
                    u = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    d = void 0 !== l && /([:;$])/i.test(l);
                if (!u && !d) {
                    var p = m(n),
                        g = p.domain.toLowerCase();
                    if (g.length <= r.p && -1 !== r.y.indexOf(g)) {
                        var h = t(p);
                        a = a.slice(0, n.index + i) + h + a.slice(s + i), i += h.length - o
                    }
                }
            }
            return a
        }

        function u(e, t) {
            return e.replace(r.c, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function d(e, t) {
            return e.replace(r.q, t || function(e, t, n, r, i) {
                return '<a href="/' + (t + n) + '" class="mem_link" mention="' + o(r || "") + '" mention_id="' + o(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + i + "</a>"
            })
        }

        function f(e) {
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
            return e.replace((i || (i = new RegExp(r.x, "ig")), i), function(e, n, r, i, a, o) {
                return (n || "") + t(r + (a || ""))
            })
        }

        function g(e) {
            c("ttl_message_confirm_delivery", e)
        }

        function h(e, t) {
            var n = t.protocol,
                i = t.url,
                a = t.query,
                c = t.domain,
                l = t.full;
            try {
                l = decodeURIComponent(l)
            } catch (e) {}
            if (l.length > 55 && (l = l.substr(0, 53) + ".."), l = o(l).replace(/&amp;/g, "&"), !e && c.match(r.t)) {
                var u, d = i = s(i).replace(r.f, encodeURIComponent),
                    f = i.indexOf("#/"),
                    m = "";
                return f >= 0 ? d = i.substr(f + 1) : (f = i.indexOf("#!")) >= 0 && (d = "/" + i.substr(f + 2).replace(/^\//, "")), (u = d.match(r.B)) && u[1].length < 32 && (m = ' mention_id="' + u[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + i + a) + '" target="_blank" rel="noopener"' + m + ">" + l + "</a>"
            }
            return '<a href="' + ("away.php?utf=1&to=" + encodeURIComponent(n + s(i + a))) + '" target="_blank" rel="noopener" onclick="' + ("return goAway('" + o((n + i + a).replace(/'/g, "\\'")) + "', {}, event);") + '">' + l + "</a>"
        }
    },
    rCUf: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return o
        }), n.d(t, "c", function() {
            return i
        }), n.d(t, "d", function() {
            return s
        });
        var r = n("8h6g");

        function i(e) {
            var t = r.b.slice(0, r.b.length);
            if ("types" === e) {
                for (var n = t.length, i = 0; i < n; ++i) t.push(t[i].toUpperCase());
                return "*." + t.join(";*.")
            }
            return "accept" === e ? "." + r.b.join(",.") : ""
        }

        function a(e) {
            if (!cur.leaving) {
                var t = getLang("video_upload_changed"),
                    n = !1;
                if (each(window.cur.videoUploaders, function(e, t) {
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

        function o(e, t, n, o, c) {
            if (n) {
                o = o || cur, (c = c || {}).onUploadStart || (c.onUploadStart = function(e) {
                    boxQueue.hideLast(), cur.nav.push(function(e, t, n) {
                        if (!1 === a(1)) return cur.onContinueCb = nav.go.pbind(n), !1
                    }), cur.prevBefUnload = window.onbeforeunload, window.onbeforeunload = a, c.onUploadProgress(e, 0, 0), Wall.showEditPost && Wall.showEditPost(), c.onUploadStartDone && c.onUploadStartDone()
                }), c.onUploadComplete || (c.onUploadComplete = function(e, t) {
                    var n = window.parseJSON(t);
                    n.video_id ? s(e, n, o) : "string" == typeof t && t.indexOf("TERMINATED") > -1 || Upload.onUploadError(e);
                    c.onUploadCompleteDone && c.onUploadCompleteDone(), setTimeout(function() {
                        c.onUploadAllCompleteDone && !window.Upload.isSomethingUploading(e.ind) && c.onUploadAllCompleteDone()
                    })
                }), c.onUploadProgress || (c.onUploadProgress = function(e, t, n) {
                    var r = void 0 !== e.ind ? e.ind : e;
                    show("_im_media_preview"), o.showMediaProgress && o.showMediaProgress("video", r, function(e, t, n) {
                        return {
                            loaded: t,
                            total: n,
                            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
                        }
                    }(e, t, n))
                }), c.onUploadError || (c.onUploadError = function(e, t) {
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
                }), cur.maxFiles = (cur.chooseParams || {}).maxFiles || 10;
                var l = cur.maxFiles - (cur.savedVideos || []).length,
                    u = browser.safari ? "" : "video/*," + i("accept");
                n.lang && (cur.lang = extend(cur.lang || {}, n.lang));
                var d = {
                        accept: u,
                        file_input: null,
                        file_name: "video_file",
                        file_size_limit: 1024 * (n.options.file_size_limit_in_GB || r.c) * 1024 * 1024,
                        file_types_description: "Video files",
                        file_types: i("types"),
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
                    f = Upload.init(e, "", {}, Object.assign(d, c));
                return window.cur.videoUploaders || (window.cur.videoUploaders = []), window.cur.videoUploaders.push(f), f
            }
        }

        function s(e, t, n, r) {
            n = n || cur;
            var i = void 0 !== e.ind ? e.ind : e,
                a = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
                o = a ? i + "_" + a : e,
                s = t.owner_id + "_" + t.video_id,
                c = ge("upload" + o + "_progress_wrap");
            c && hide(geByClass1("progress_x", c)), ajax.post("al_video.php?act=a_videos_attach_info", {
                videos: s
            }, {
                onDone: function(e) {
                    n.chooseMedia("video", s, extend(e[s], {
                        upload_ind: o,
                        upload_new: !0
                    }));
                    var i = t.owner_id,
                        a = t.video_id,
                        c = t.video_hash,
                        l = 0;
                    ! function t() {
                        ajax.post("al_video.php?act=encode_progress", {
                            oid: i,
                            vid: a,
                            hash: c,
                            need_thumb: 1
                        }, {
                            onDone: function(c) {
                                var l, u = !0;
                                if (c) {
                                    if (c.error) return l = getLang("video_upload_encode_error"), void setTimeout(showFastBox({
                                        title: getLang("global_error")
                                    }, l).hide, 2e3);
                                    c.thumb && (u = !1, ajax.post("al_video.php", {
                                        act: "a_video_photo_sizes",
                                        oid: i,
                                        vid: a
                                    }, {
                                        onDone: function(t) {
                                            n.hasChosenMedia("video", s) ? n.updateChosenMedia("video", s, extend(t, {
                                                upload_ind: o,
                                                upload_new: !0
                                            })) : r && r(e, s)
                                        }
                                    }))
                                }
                                u && n.hasChosenMedia("video", s) && setTimeout(t, 1e3)
                            },
                            onFail: function() {
                                ++l < 3 && setTimeout(t, 2e3 * l)
                            }
                        })
                    }()
                }
            })
        }
        t.a = {
            getUploadModule: function(e, t, n, r, i) {
                return o(e, t, n, r, i)
            },
            initModalVideoUploader: function() {
                var e = cur.videoUploadParams,
                    t = ge("choose_video_upload");
                return !!t && (this.initDragEvents(), o(t, boxLayerWrap, e))
            },
            initDragEvents: function() {
                var e = function(e) {
                        cur.dragTimeout && (clearTimeout(cur.dragTimeout), delete cur.dragTimeout);
                        var t = ge("video_choose_upload_area_wrap");
                        if (!hasClass(t, "video_choose_upload_area_enter")) {
                            addClass(t, "video_choose_upload_area_enter");
                            var n = ge("video_choose_wrap"),
                                r = getXY(n)[1],
                                i = getSize(t)[1];
                            return hide("video_choose_wrap"), setStyle(t, "height", scrollGetY() + window.clientHeight() - r + i), cancelEvent(e)
                        }
                    },
                    t = function(e) {
                        return cancelEvent(e)
                    },
                    n = function(e) {
                        if (t(), e.dataTransfer.files.length && Upload.checkFilesSizes(window.videoInlineUploader, e.dataTransfer.files)) return window.Upload && Upload.checked && Upload.checked[window.videoInlineUploader] && Upload.onFileApiSend(window.videoInlineUploader, e.dataTransfer.files), cancelEvent(e)
                    },
                    r = function() {
                        addEvent(boxLayerWrap, "dragenter dragover", e), addEvent(boxLayerWrap, "dragleave", t), addEvent(boxLayerWrap, "drop", n)
                    };
                r(), setTimeout(curBox().setOptions.pbind({
                    onHide: function() {
                        removeEvent(boxLayerWrap, "dragenter dragover", e), removeEvent(boxLayerWrap, "dragleave", t), removeEvent(boxLayerWrap, "drop", n)
                    },
                    onShow: function() {
                        r()
                    }
                }), 0)
            }
        }
    },
    rHUl: function(e, t, n) {
        "use strict";
        n.d(t, "h", function() {
            return u
        }), n.d(t, "K", function() {
            return d
        }), n.d(t, "o", function() {
            return f
        }), n.d(t, "f", function() {
            return m
        }), n.d(t, "j", function() {
            return p
        }), n.d(t, "t", function() {
            return g
        }), n.d(t, "g", function() {
            return h
        }), n.d(t, "s", function() {
            return b
        }), n.d(t, "n", function() {
            return _
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "J", function() {
            return y
        }), n.d(t, "l", function() {
            return j
        }), n.d(t, "k", function() {
            return O
        }), n.d(t, "P", function() {
            return w
        }), n.d(t, "d", function() {
            return k
        }), n.d(t, "m", function() {
            return C
        }), n.d(t, "q", function() {
            return S
        }), n.d(t, "z", function() {
            return E
        }), n.d(t, "G", function() {
            return x
        }), n.d(t, "D", function() {
            return I
        }), n.d(t, "B", function() {
            return T
        }), n.d(t, "y", function() {
            return P
        }), n.d(t, "e", function() {
            return M
        }), n.d(t, "I", function() {
            return L
        }), n.d(t, "E", function() {
            return B
        }), n.d(t, "O", function() {
            return D
        }), n.d(t, "F", function() {
            return N
        }), n.d(t, "w", function() {
            return A
        }), n.d(t, "N", function() {
            return H
        }), n.d(t, "C", function() {
            return R
        }), n.d(t, "A", function() {
            return F
        }), n.d(t, "a", function() {
            return q
        }), n.d(t, "L", function() {
            return U
        }), n.d(t, "r", function() {
            return z
        }), n.d(t, "M", function() {
            return W
        }), n.d(t, "H", function() {
            return K
        }), n.d(t, "p", function() {
            return V
        }), n.d(t, "c", function() {
            return Q
        }), n.d(t, "x", function() {
            return X
        }), n.d(t, "i", function() {
            return G
        }), n.d(t, "u", function() {
            return J
        }), n.d(t, "v", function() {
            return Y
        }), n.d(t, "Q", function() {
            return Z
        }), n.d(t, "R", function() {
            return $
        });
        var r = n("MhhX"),
            i = n("f01n"),
            a = n("h++7"),
            o = n("86+7"),
            s = n("rjmT"),
            c = n("aong"),
            l = n("lJdi");

        function u(e, t) {
            var n = Object(c.s)(e),
                i = n.tabs[n.peer];
            return Object.keys(i.msgs).filter(function(n) {
                var a = C(e, t, n);
                return !Object(r.k)(a) && intval(n) > i.in_up_to
            })[0]
        }

        function d(e) {
            return Object(c.s)(e).searchShown
        }

        function f(e) {
            return Object(c.s)(e).peer
        }

        function m(e) {
            return p(e, f(e))
        }

        function p(e, t) {
            return (g(e, t) || {}).keyboard
        }

        function g(e, t) {
            var n = Object(c.s)(e);
            return n.tabs && n.tabs[t]
        }

        function h(e) {
            var t = Object(c.s)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function b(e) {
            return Object(c.s)(e).selectedMessages
        }

        function _(e, t, n) {
            var i = g(e, t),
                a = b(e)[0];
            if (void 0 === a) return [n];
            var o = Math.min(n, a),
                s = Math.max(n, a);
            return Object.keys(i.msgs).filter(function(e) {
                return e >= o && e <= s
            }).filter(function(t) {
                var n = C(e, e.get().peer, t);
                return !Object(r.l)(n) && !Object(r.e)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = g(Object(c.s)(t), e),
                i = 0;
            for (var a in n.msgs)
                if (n.msgs.hasOwnProperty(a)) {
                    var o = C(t, e, a);
                    Object(r.k)(o) || (i += Object(r.n)(n, o) ? 1 : 0)
                }
            return i
        }

        function y(e, t, n) {
            return !! function(e, t, n) {
                var r = g(e, t);
                return Object.keys(r.msgs).filter(function(r) {
                    return intval(C(e, t, r).randomId) === n
                }).length > 0
            }(e, t, n)
        }

        function j(e, t) {
            var n = Object(c.s)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function O(e, t, n) {
            var r = g(e, t),
                a = C(e, t, n),
                o = Object.keys(r.msgs).filter(function(n) {
                    var r = C(e, t, n),
                        o = r.local && r.type !== i.g;
                    return !(!a.local && o) && (!(!a.local || o) || j(e, a.messageId) > j(e, r.messageId))
                }).pop();
            return o ? C(e, t, o) : null
        }

        function w(e) {
            return e && e.length > 0 ? i.Z([0].concat(e)) : e
        }

        function k(e, t, n) {
            var i = g(e, t),
                a = C(e, t, n),
                s = Object(c.s)(e);
            return Object(r.k)(a) ? Object(o.c)(e, s.id).name : a.userId !== a.peerId ? !!Object(o.b)(e, a.userId) && Object(o.c)(e, a.userId).name : i.tab
        }

        function C(e, t, n) {
            var r = g(e, t),
                i = r && r.msgs && r.msgs[n];
            return i ? w(i) : null
        }

        function S(e, t, n) {
            var r = g(e, t),
                i = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!i) return null;
            var a = i && i.indexOf("" + n),
                o = a > -1 ? i[a - 1] : null;
            return r.msgs[o]
        }

        function E(e) {
            var t = Object(c.s)(e);
            return t.gid || t.isClassic
        }

        function x(e) {
            return Object(c.s)(e).gid
        }

        function I(e) {
            return Object(c.s)(e).gid
        }

        function T(e) {
            return !!Object(c.s)(e).gid
        }

        function P(e, t) {
            return !!(t.peerId > 2e9 && Object(l.m)(t, 1024))
        }

        function M(e, t) {
            var n = Object(c.s)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function L(e) {
            var t = Object(c.s)(e);
            return !!T(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === a.n || t.active_tab === a.m))
        }

        function B(e, t) {
            var n = (e = Object(c.s)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function D(e, t) {
            var n = g(e, t);
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

        function H(e) {
            return !Object(c.s)(e).lockedSending
        }

        function R(e) {
            return e > -2e9 && e < 0
        }

        function F(e, t) {
            return !!R(t) && !!g(e, t).blocked_community
        }

        function q(e) {
            return Object(c.s)(e).voice_message_available
        }

        function U(e) {
            var t = Object(c.s)(e);
            return !(!z(t) && !t.recentSearch)
        }

        function z(e) {
            return Object(c.s)(e).searchText
        }

        function W(e, t) {
            var n = Object(c.s)(e);
            return !!(t && t !== z(e) || n.recentSearch)
        }

        function K(e) {
            return Object(c.s)(e).recentSearch
        }

        function V(e) {
            var t = h(e);
            return t && t.pinned && w(t.pinned)
        }

        function Q(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function X(e) {
            return 1 == Object(c.s)(e).isEditing
        }

        function G(e) {
            return Object(c.s)(e).gid
        }

        function J(e) {
            return e.draft || (e.draft = Object(s.b)(cur.imDb, e.peerId)), e.draft
        }

        function Y(e) {
            return (Object(c.s)(e).templates || []).filter(function(e) {
                return !e.deleted
            })
        }

        function Z(e) {
            return e.is_message_request || e.folders & a.j[a.k] || e.folders & a.j[a.l]
        }

        function $(e) {
            return e.peerId > 19e8 && e.peerId < 2e9
        }
    },
    rjmT: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        }), n.d(t, "b", function() {
            return l
        });
        var r = n("BxOC"),
            i = n("f01n"),
            a = n("vT4u"),
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

        function l(e, t) {
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
            if (("share" === e && this.removeAttachByType(e), "mail" !== e && "reply" !== e || (this.removeAttachByType("mail"), this.removeAttachByType("reply")), "audio_playlist" === e || "artist" === e) && this.dData.attaches.find(function(t) {
                    return t.type === e
                })) return !1;
            if (!e || !t && "poll" !== e) return !1;
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
            if (e && e.object) return e.object.url.replace(/&amp;/g, "&")
        }, s.prototype.hasOnlyReplies = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return e ? e.flags & i.k && !this.dData.attaches.find(function(e) {
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
            return this.dData.attaches.find(c) ? Object(r.b)(a.e, {
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
    "uW+i": function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("pemR"));
        var a = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                r.getActiveTab = function() {
                    var e = r.props.active,
                        t = [],
                        n = null;
                    return r.props.children.forEach(function(r) {
                        r.key === e ? n = r : t.push(r)
                    }), n || (Number.isInteger(e) && t.length > e ? t[e] : t[0])
                }, r.onClick = function(e, t) {
                    if (t !== r.state.active) {
                        var n = r.refsStore[t],
                            i = r.getTransform(n);
                        r.setState({
                            active: t,
                            isAnimating: !0,
                            transform: i
                        }), r.props.onTabClick(e, t)
                    }
                }, r.onTransitionEnd = function(e) {
                    "transform" === e.propertyName && r.setState({
                        isAnimating: !1
                    })
                }, r.getRef = function(e, t) {
                    r.refsStore[e] = t
                };
                var i = r.getActiveTab();
                return r.refsStore = {}, r.state = {
                    isAnimating: !1,
                    active: i.key
                }, r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.reactifyTabs = function(e) {
                return (Array.isArray(e) ? e : Object.values(e)).map(function(e) {
                    return r.createElement("a", {
                        key: e[0],
                        href: e[2],
                        onClick: function() {}
                    }, e[1] ? unclean(e[1]) : "")
                })
            }, t.prototype.componentDidUpdate = function(e, t, n) {
                this.props.active !== e.active && this.setState({
                    active: this.props.active
                })
            }, t.prototype.getTransform = function(e) {
                var t = e.offsetWidth;
                return "translateX(" + (e.offsetLeft - 50 + .5 * t) + "px) scaleX(" + t / 100 + ")"
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
                return r.createElement("nav", {
                    className: Object(i.a)("Tabs", this.props.className, t),
                    style: this.props.style
                }, r.createElement("ul", {
                    className: "Tabs__list"
                }, this.props.children.map(function(t, n) {
                    return r.createElement("li", {
                        className: Object(i.a)("Tabs__item", {
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
                })), r.createElement("div", {
                    style: {
                        transform: this.state.transform
                    },
                    className: "Tabs__divider",
                    onTransitionEnd: this.onTransitionEnd
                }))
            }, t
        }(r.Component);
        t.a = a, a.defaultProps = {
            onTabClick: function() {},
            active: 0
        }
    },
    uytb: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return a
        }), n.d(t, "c", function() {
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

        function l(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && function(e, t) {
                for (var n = ["fwd", "draft", "bind_attach"], r = s(e), i = !1, a = n.length; a--;) n[a] in r && (delete r[n[a]], i = !0);
                i && c(e, r, t)
            }(e, t);
            var n = {
                    db: s(e),
                    checkTime: Date.now()
                },
                l = function(e, t, n) {
                    n.key === o(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", l, !1), {
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
                    var l = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case i:
                                var o = n;
                                o && o.length > 0 ? e[t] = o : delete e[t];
                                break;
                            case a:
                                var s = r(n, 2),
                                    c = s[0],
                                    l = s[1];
                                l ? e[t][c] = +l : delete e[t][c]
                        }
                        return e
                    }(n.db, o, s);
                    return n.db = l, n.checkTime = Date.now(), c(e, l, t)
                },
                updateByKey: function(r, i) {
                    return n.db[r] = i, n.checkTime = Date.now(), c(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", l, !1)
                }
            }
        }
    },
    vQtq: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = !1,
                r = void 0,
                i = void 0;
            return function a() {
                if (n) return r = arguments, void(i = this);
                e.apply(this, arguments), n = !0, setTimeout(function() {
                    n = !1, r && (a.apply(i, r), r = i = null)
                }, t)
            }
        }
        n.d(t, "a", function() {
            return r
        })
    },
    vRp6: function(e, t, n) {
        "use strict";
        var r = n("q1tI"),
            i = (n("17x9"), n("vQtq")),
            a = n("PjZB"),
            o = n("pemR"),
            s = function() {
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
        var c = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return r.checkLoad = Object(i.a)(function(e) {
                    var t = s(e, 3),
                        n = t[0],
                        i = t[1],
                        a = t[2];
                    if (!r.loading) return r.props.virtualized || r.props.hasMore ? void(i - n - a <= r.props.threshold && (r.loading = !0, r.props.loadMore().then(function() {
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
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.getScrollData = function() {
                var e = this.useWindowScroll ? document.documentElement : this.container;
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
                    i = r.start,
                    a = r.end,
                    o = r.before,
                    s = r.after;
                i === n.start && a === n.end && o === n.before && s === n.after || this.setState(r)
            }, t.prototype.getChildrenData = function(e, t) {
                var n = s(t, 3),
                    r = n[0],
                    i = n[1],
                    a = n[2],
                    o = this.useWindowScroll ? window : this.container,
                    c = o && o.offsetHeight;
                if (!o || 0 === i || 0 === a) return {
                    start: 0,
                    end: 0,
                    before: 0,
                    after: e.length
                };
                a = Math.max(a, c);
                var l = e.length,
                    u = Math.max(Math.floor(r / this.props.itemHeight) - 1, 0),
                    d = Math.min(Math.floor((r + 2 * a) / this.props.itemHeight + 1), l);
                return {
                    start: u,
                    end: d,
                    before: u,
                    after: l - d
                }
            }, t.prototype.componentWillReceiveProps = function(e) {
                this.props.virtualized && this.processChildren(e.children)
            }, t.prototype.componentDidMount = function() {
                this.attachListeners()
            }, t.prototype.componentWillUnmount = function() {
                this.detachListeners()
            }, t.prototype.render = function() {
                return r.createElement("div", {
                    className: Object(o.a)("InfiniteScroll", this.props.className),
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
                }, r.createElement(a.a, null))))
            }, t
        }(r.Component);
        t.a = c, c.defaultProps = {
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
            return k
        }), n.d(t, "b", function() {
            return C
        }), n.d(t, "d", function() {
            return S
        }), n.d(t, "c", function() {
            return E
        }), n.d(t, "a", function() {
            return M
        }), n.d(t, "jb", function() {
            return L
        }), n.d(t, "Bc", function() {
            return A
        }), n.d(t, "Qc", function() {
            return H
        }), n.d(t, "sb", function() {
            return R
        }), n.d(t, "Vb", function() {
            return F
        }), n.d(t, "Jb", function() {
            return q
        }), n.d(t, "jc", function() {
            return z
        }), n.d(t, "kc", function() {
            return K
        }), n.d(t, "p", function() {
            return V
        }), n.d(t, "ad", function() {
            return Q
        }), n.d(t, "oc", function() {
            return X
        }), n.d(t, "qb", function() {
            return G
        }), n.d(t, "mb", function() {
            return J
        }), n.d(t, "Fb", function() {
            return Z
        }), n.d(t, "nb", function() {
            return $
        }), n.d(t, "ob", function() {
            return ee
        }), n.d(t, "xc", function() {
            return te
        }), n.d(t, "Qb", function() {
            return ne
        }), n.d(t, "gd", function() {
            return oe
        }), n.d(t, "F", function() {
            return se
        }), n.d(t, "h", function() {
            return ce
        }), n.d(t, "wb", function() {
            return ue
        }), n.d(t, "xb", function() {
            return de
        }), n.d(t, "T", function() {
            return fe
        }), n.d(t, "Eb", function() {
            return me
        }), n.d(t, "yb", function() {
            return pe
        }), n.d(t, "bd", function() {
            return ge
        }), n.d(t, "pc", function() {
            return he
        }), n.d(t, "Pc", function() {
            return be
        }), n.d(t, "id", function() {
            return _e
        }), n.d(t, "lc", function() {
            return je
        }), n.d(t, "D", function() {
            return Oe
        }), n.d(t, "C", function() {
            return we
        }), n.d(t, "j", function() {
            return ke
        }), n.d(t, "t", function() {
            return Ce
        }), n.d(t, "E", function() {
            return Se
        }), n.d(t, "Pb", function() {
            return Ee
        }), n.d(t, "pb", function() {
            return xe
        }), n.d(t, "g", function() {
            return Ie
        }), n.d(t, "sc", function() {
            return Te
        }), n.d(t, "vc", function() {
            return Pe
        }), n.d(t, "rc", function() {
            return Me
        }), n.d(t, "cc", function() {
            return Le
        }), n.d(t, "dc", function() {
            return Be
        }), n.d(t, "ub", function() {
            return De
        }), n.d(t, "ic", function() {
            return Ae
        }), n.d(t, "ec", function() {
            return He
        }), n.d(t, "fc", function() {
            return Re
        }), n.d(t, "Bb", function() {
            return Fe
        }), n.d(t, "ib", function() {
            return qe
        }), n.d(t, "gc", function() {
            return Ue
        }), n.d(t, "X", function() {
            return ze
        }), n.d(t, "Y", function() {
            return We
        }), n.d(t, "m", function() {
            return Ke
        }), n.d(t, "v", function() {
            return Ve
        }), n.d(t, "hc", function() {
            return Xe
        }), n.d(t, "kb", function() {
            return Ge
        }), n.d(t, "eb", function() {
            return Je
        }), n.d(t, "Nb", function() {
            return Ye
        }), n.d(t, "Mb", function() {
            return Ze
        }), n.d(t, "Lb", function() {
            return $e
        }), n.d(t, "Ob", function() {
            return et
        }), n.d(t, "Wb", function() {
            return tt
        }), n.d(t, "Xb", function() {
            return nt
        }), n.d(t, "f", function() {
            return it
        }), n.d(t, "Gb", function() {
            return at
        }), n.d(t, "nc", function() {
            return ot
        }), n.d(t, "mc", function() {
            return st
        }), n.d(t, "K", function() {
            return ct
        }), n.d(t, "Cb", function() {
            return lt
        }), n.d(t, "B", function() {
            return ut
        }), n.d(t, "I", function() {
            return dt
        }), n.d(t, "Sc", function() {
            return ft
        }), n.d(t, "gb", function() {
            return mt
        }), n.d(t, "i", function() {
            return pt
        }), n.d(t, "hb", function() {
            return gt
        }), n.d(t, "s", function() {
            return ht
        }), n.d(t, "rb", function() {
            return bt
        }), n.d(t, "Rc", function() {
            return _t
        }), n.d(t, "cb", function() {
            return yt
        }), n.d(t, "Zb", function() {
            return jt
        }), n.d(t, "Lc", function() {
            return Ot
        }), n.d(t, "yc", function() {
            return wt
        }), n.d(t, "uc", function() {
            return kt
        }), n.d(t, "G", function() {
            return Ct
        }), n.d(t, "Uc", function() {
            return St
        }), n.d(t, "Zc", function() {
            return Et
        }), n.d(t, "tb", function() {
            return xt
        }), n.d(t, "J", function() {
            return It
        }), n.d(t, "qc", function() {
            return Tt
        }), n.d(t, "P", function() {
            return Pt
        }), n.d(t, "Db", function() {
            return Mt
        }), n.d(t, "w", function() {
            return Lt
        }), n.d(t, "Yb", function() {
            return Bt
        }), n.d(t, "Mc", function() {
            return Dt
        }), n.d(t, "tc", function() {
            return Nt
        }), n.d(t, "V", function() {
            return At
        }), n.d(t, "fd", function() {
            return Ht
        }), n.d(t, "q", function() {
            return Rt
        }), n.d(t, "Tc", function() {
            return Ft
        }), n.d(t, "ac", function() {
            return qt
        }), n.d(t, "H", function() {
            return Ut
        }), n.d(t, "o", function() {
            return zt
        }), n.d(t, "Wc", function() {
            return Kt
        }), n.d(t, "Jc", function() {
            return Vt
        }), n.d(t, "vb", function() {
            return Qt
        }), n.d(t, "O", function() {
            return Xt
        }), n.d(t, "Hb", function() {
            return Gt
        }), n.d(t, "Hc", function() {
            return Jt
        }), n.d(t, "y", function() {
            return Yt
        }), n.d(t, "Ub", function() {
            return Zt
        }), n.d(t, "Ac", function() {
            return $t
        }), n.d(t, "dd", function() {
            return en
        }), n.d(t, "W", function() {
            return tn
        }), n.d(t, "u", function() {
            return nn
        }), n.d(t, "Cc", function() {
            return rn
        }), n.d(t, "Xc", function() {
            return an
        }), n.d(t, "Gc", function() {
            return on
        }), n.d(t, "Yc", function() {
            return sn
        }), n.d(t, "Dc", function() {
            return cn
        }), n.d(t, "l", function() {
            return ln
        }), n.d(t, "zc", function() {
            return un
        }), n.d(t, "Ic", function() {
            return dn
        }), n.d(t, "cd", function() {
            return fn
        }), n.d(t, "U", function() {
            return mn
        }), n.d(t, "Z", function() {
            return pn
        }), n.d(t, "M", function() {
            return gn
        }), n.d(t, "Rb", function() {
            return hn
        }), n.d(t, "db", function() {
            return bn
        }), n.d(t, "bc", function() {
            return _n
        }), n.d(t, "Sb", function() {
            return vn
        }), n.d(t, "Kb", function() {
            return yn
        }), n.d(t, "Ab", function() {
            return jn
        }), n.d(t, "Oc", function() {
            return On
        }), n.d(t, "zb", function() {
            return wn
        }), n.d(t, "Nc", function() {
            return kn
        }), n.d(t, "Q", function() {
            return Cn
        }), n.d(t, "N", function() {
            return Sn
        }), n.d(t, "L", function() {
            return xn
        }), n.d(t, "Vc", function() {
            return In
        }), n.d(t, "Ib", function() {
            return Tn
        }), n.d(t, "bb", function() {
            return Pn
        }), n.d(t, "ab", function() {
            return Mn
        }), n.d(t, "Fc", function() {
            return Ln
        }), n.d(t, "Ec", function() {
            return Bn
        }), n.d(t, "r", function() {
            return Dn
        }), n.d(t, "R", function() {
            return Nn
        }), n.d(t, "hd", function() {
            return An
        }), n.d(t, "S", function() {
            return Hn
        }), n.d(t, "k", function() {
            return Rn
        }), n.d(t, "fb", function() {
            return Fn
        }), n.d(t, "wc", function() {
            return qn
        }), n.d(t, "z", function() {
            return Un
        }), n.d(t, "Kc", function() {
            return zn
        }), n.d(t, "lb", function() {
            return Wn
        }), n.d(t, "n", function() {
            return Kn
        }), n.d(t, "A", function() {
            return Vn
        }), n.d(t, "x", function() {
            return Qn
        }), n.d(t, "ed", function() {
            return Xn
        }), n.d(t, "Tb", function() {
            return Gn
        });
        var r = n("BxOC"),
            i = n("nyd8"),
            a = n("f01n"),
            o = n("DM26"),
            s = n("aong"),
            c = n("uytb"),
            l = n("P13b"),
            u = n("h++7"),
            d = n("rHUl"),
            f = n("MhhX"),
            m = n("86+7"),
            p = n("ERyv"),
            g = n("Wu9C"),
            h = n("lJdi"),
            b = n("O8ze"),
            _ = n("zxIV"),
            v = n("XzvV"),
            y = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            j = function() {
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

        function O(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function w(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var k = "al_im.php",
            C = 5,
            S = "typing",
            E = "audiomessage",
            x = Object(i.a)(),
            I = x.scheduleNav,
            T = x.commitNav,
            P = x.scheduleNavWithTimeOut;
        var M = {
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
            return Object(r.b)(k, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function B(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(function(r) {
                return r ? t.apply(void 0, w(n)) : function(e) {
                    if (!e.renew_hashes) {
                        var t = e.last_hashes_update || 0;
                        if (Date.now() - t < 1e4) return Promise.resolve();
                        var n = Object.keys(e.tabs).filter(function(t) {
                            return Object(l.ob)(e, t)
                        });
                        e.renew_hashes = L(n, {}, e).then(function(t) {
                            var r = j(t, 2),
                                i = r[0],
                                a = r[1];
                            return n.forEach(function(t) {
                                e.tabs[t].hash = i[t]
                            }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                        })
                    }
                    return e.renew_hashes
                }(e).then(function(e) {
                    return t.apply(void 0, w(n))
                })
            })
        }

        function D(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, w(t)).catch(function(r) {
                    if (r && r.match && r.match(/1001;/)) return B(n, e, t);
                    throw r
                })
            }
        }

        function N(e) {
            return "string" == typeof e ? Object(_.mb)("<div>" + e + "</div>") : e
        }

        function A(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function H(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function R(e, t, n, i, a) {
            return a.tabHistoryNotChanged = !1, Object(o.e)(r.b, 3, function(e) {
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
                var r = j(t, 5),
                    i = r[0],
                    o = r[1],
                    s = r[2],
                    c = r[3],
                    u = r[4];
                if (o.forEach(function(e) {
                        return Object(m.a)(a, e)
                    }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = u, a.tabs[e] || (a.tabs[e] = Object(l.Kb)(a, i)), H(c, a), n) {
                    if (a.tabs[e]) {
                        var d = a.tabs[e].lastmsg,
                            f = a.tabs[e].lastmsg_meta;
                        extend(a.tabs[e], i), a.tabs[e].lastmsg = d, a.tabs[e].lastmsg_meta = f
                    }
                } else extend(a.tabs[e], i);
                return a.admins = extend(a.admins, s), a.imQueue(e, !1), An(), F(e, a)
            }).catch(function(e) {
                return Object(p.a)("loadPeer", e)
            })
        }

        function F(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                i = n.filter(function(n) {
                    return !Object(d.J)(t, e, n.rid)
                });
            return r.msgs = i.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, i), t.tabs[e].history = Object(l.hc)(i, t, N(t.tabs[e].history)), Promise.resolve(t)
        }

        function q(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(l.Mb)([t], N(n.tabs[e].history)), Promise.resolve(n)
        }

        function U(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.b)(k, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                return H(j(e, 1)[0], t)
            })
        }

        function z(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(l.ob)(t, n) && !t.tabs[n].msgid ? (t.gid && U(n, t), Promise.resolve(t).then(X)) : (Object(l.ob)(t, n) && (t.tabs[n].msgid = !1), R(n, e, !1, !0, t))
            }).then(X).then(W.bind(null, n))
        }

        function W(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(l.Bb)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(l.Bb)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function K(e, t, n) {
            var r = n.msgid,
                i = n.peer;
            return !e && Object(l.ob)(n, i) && n.tabs[i].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && U(i, n), Promise.resolve(n).then(X).then(W.bind(null, i))) : R(i, !0, r, !0, n).then(X).then(function() {
                return Object(d.t)(n, i).msgid = r, n
            }).then(W.bind(null, i))
        }

        function V(e, t, n, r) {
            if (At(r)) throw Object(l.Ac)(), new Error("Cant change peer while loading something");
            var i = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, I({
                    sel: e ? Object(l.H)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: i
                }), 0 != r.prevPeer && W(r.prevPeer, r, !0), 0 !== e) {
                Object(l.Bb)(r, e) && W(e, r, !0), en(r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), !1, r)
            } else en(r.tabbedPeers, !1, r);
            return T(), Ke(r.prevPeer, r)
        }

        function Q(e) {
            cur.wallMentions = function() {
                return new Promise(function(t, n) {
                    if (cur.wallMentions = [], !Object(l.hb)(e.peer) || !Object(l.ob)(e, e.peer) || Object(l.pb)(e, e.peer)) return n();
                    var r = e.tabs[e.peer];

                    function i() {
                        var n = [];
                        Object.keys(r.msgs || {}).reverse().forEach(function(e) {
                            var t = Object(d.P)(r.msgs[e]),
                                i = t && t.userId;
                            i && i != vk.id && -1 === n.indexOf(i) && Object(l.Eb)(r, i) && n.push(i)
                        }), (r.memberIds || []).forEach(function(e) {
                            -1 === n.indexOf(e) && n.push(e)
                        });
                        var i = [];
                        n.forEach(function(t) {
                            if (Object(m.b)(e, t)) {
                                var n = Object(m.c)(e, t),
                                    r = n.link.substring(1);
                                i.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                            }
                        }), t(i)
                    }
                    r.membersLoaded ? i() : En(e.peer, e).then(i)
                })
            }
        }

        function X(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                i = Object(l.hb)(t) && (n.data.closed || n.data.kicked),
                a = Object(l.pb)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !a && r.push("clear"), Object(l.jb)(e) && !a && r.push("block"), a && !i && r.push("settings"), Object(l.kb)(t) && (n.can_send_notify ? r.push("block_notify") : r.push(n.blocked_community ? "allow_community" : "block_community")), (Object(l.hb)(t) || Object(l.Fb)(t) || Object(l.kb)(t)) && !Object(l.jb)(e) && (Object(l.hb)(t) && (n.data.kicked || n.data.closed) || r.push(inArray(t, e.mutedPeers) ? "unmute" : "mute")), Object(l.Fb)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), Object(l.hb)(t) && !i && (Object(h.h)(e) && r.push("invite"), e.gid || r.push("leave")), Object(l.hb)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(l.hb)(t) && n.pinned && (r.push(Object(g.a)(e, t) ? "pin_hide" : "pin_unhide"), Object(h.j)(e) && r.push("unpin"));
            var o = Object(l.D)(e, a);
            return e.curActions = r.sort(function(e, t) {
                return M[e] - M[t]
            }).reduce(function(e, t) {
                return e[t] = o[t], e
            }, {}), Promise.resolve(e)
        }

        function G(e, t, n) {
            var i = n.tabs[n.peer];
            return Object(r.b)(k, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: i.offset + (i.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(function(e) {
                var t = j(e, 4),
                    r = t[0],
                    a = t[1],
                    o = t[2],
                    s = t[3];
                return i.allShown = o, n.admins = extend(n.admins, s), i.history = r + A(i.history), i.historyToAppend = r, i.offset += Object.keys(a).length, i.msgs = extend(i.msgs, a), n
            })
        }

        function J(e) {
            var t = e.tabs[e.peer];
            return Object(r.b)(k, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(n) {
                var r = j(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2];
                r[3], r[4];
                t.allShown = t.allShown || o, t.history = A(t.history) + i, t.historyToAppend = i;
                var s = Object.keys(a).length;
                return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, a), e
            })
        }

        function Y(e, t, n, r) {
            var i = e.tabs[t];
            return r === a.m && i.out_up_to > n ? e : (r === a.m ? i.out_up_to = n : i.in_up_to = n, e)
        }
        var Z = D(function(e, t) {
            if (Object(l.Fc)(t.tabs[e])) return Promise.resolve(t);
            var n = t.tabs[e],
                i = n.msgs || {},
                o = Object.keys(i).map(function(n) {
                    return Object(d.m)(t, e, n)
                }).filter(function(e) {
                    return !Object(f.k)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (o = o.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), (o = intval(o.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([a.pb([6, e, o])]), Object(r.b)(k, {
                peer: e,
                ids: [o],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return Y(t, e, o, a.m)
            }))
        });

        function $(e) {
            return Object(r.b)(k, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var n = j(t, 3),
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

        function ee(e) {
            return Object(r.b)(k, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var n = j(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function te(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(l.kc)(e, t, N(r.history))), Promise.resolve(n)
        }

        function ne(e, t, n, r) {
            var i = r.tabs[e];
            return i.msgs[t] && (i.msgs[t].errored = 0, i.lastmsg_meta = n, i.lastmsg = t, i.history = Object(l.Dc)(e, t, N(i.history))), Promise.resolve(r)
        }

        function re(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, a) {
                return !n && !Ut(a)(t) || i && !i(a, e[a], t) || (e[a] = Object(s.a)(r(e[a], a))), e
            }, e.dialog_tabs))
        }

        function ie(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                en(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function ae(e, t, n) {
            return Object(l.zb)(n) ? t.concat([e]) : [e].concat(t)
        }

        function oe(e, t) {
            var n = e.get().peer,
                r = Object(d.t)(e, n);
            if (Object(l.ob)(e, n)) {
                var i = N(r.history);
                r.history = Object(l.Jc)(e, i, t)
            }
        }

        function se(e, t) {
            var n = Object(d.t)(t, e.peerId);
            if (Object(l.ob)(t, e.peerId)) {
                var r = N(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(l.J)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var i = n && n.pinned && Object(d.P)(n.pinned);
            return i && i.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function ce(e, t) {
            var n = e.flags & a.m,
                r = e.peerId;
            if (Object(l.Bb)(t, r)) {
                var i = t.tabs[r];
                if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = O({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? le(t, 1, e.peerId) : (!i.unread && le(t, 1, e.peerId), i.unread++), ie(e.peerId, t)), Object(l.ob)(t, r)) {
                    var o = N(i.history);
                    i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = Object(l.x)(t, e, o, !0, !0, !0), Object(f.k)(e) && (i.blocked_community = 0, X(t))
                }
                if (i.typing) {
                    var s = i.typing.userIds.indexOf(e.userId);
                    s >= 0 && i.typing.userIds.splice(s, 1)
                }
                return i.lastmsg = e.messageId, i.lastmsg_meta = e, W(e.peerId, t), re(t, i, !1, ae.bind(null, r), Wt.bind(null, t)), Promise.resolve(t)
            }
            return R(r, 0, 0, 0, t).then(function(t) {
                return re(t, t.tabs[r], !1, ae.bind(null, r), Wt.bind(null, t)), W(e.peerId, t), n || ie(e.peerId, t), t
            })
        }

        function le(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function ue(e, t) {
            if (Object(l.ob)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = Y(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(d.b)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && le(t, -1, e.peerId), !n.skipped) {
                    var i = N(n.history);
                    n.history = Object(l.Pb)(t, i, e.peerId)
                }
            } else Object(l.Bb)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && le(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(l.Bb)(t, e.peerId) && (t.dialog_tabs[u.m] = t.dialog_tabs[u.m].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== u.m || t.gid ? Promise.resolve(t) : zt(u.h, t)
        }

        function de(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(l.Bb)(t, e.peerId) && Y(t, e.peerId, e.upToId, a.m), Object(l.ob)(t, e.peerId)) {
                var r = N(n.history);
                n.history = Object(l.Jb)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function fe(e, t, n, r, i) {
            return i.text = {}, i.imQueue = e, i.imQueueResend = t, i.imQueueSet = n, i.imQueueComplete = r, Promise.resolve(i)
        }

        function me(e, t, n) {
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
                    a = Object(d.m)(n, t, i),
                    o = Object(d.d)(n, t, i);
                return !1 === o ? n.set(gt.bind(null, O({}, t, [a.userId]))).then(function(n) {
                    var o = Object(d.d)(n, t, i);
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
            Object(l.Lb)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var i = t.tabs[r] ? t.tabs[r].msgs : {},
                    a = extend({}, i || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), a && (n[r].msgs = a), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function ge(e, t, n, r) {
            var i = Object(d.t)(r, e);
            if (i) {
                var a = !1 !== t ? mobPlatforms[t] ? 1 : 0 : i.last_seen[2];
                i.online = t, i.last_seen = [t, n || i.last_seen[1], a]
            }
            return Promise.resolve(r)
        }

        function he(e, t, n) {
            var r = Object(d.t)(n, e.peerId);
            return r && (e.ts = Date.now() / 1e3, r.activity || (r.activity = {}), r.activity[t] = e, r.typing === S && (r.typing = e)), Promise.resolve(n)
        }

        function be(e, t) {
            var n = Object(d.t)(t, e.peerId),
                r = Object(f.d)(e) ? "audiomessage" : "typing";
            return n && n.activity && n.activity[r] && (n.activity[r].userIds = n.activity[r].userIds.filter(function(t) {
                return t !== e.userId
            })), Promise.resolve(t)
        }

        function _e(e, t, n) {
            var r = e.peerId;
            return Object(o.c)(C + 2).then(function() {
                if (Object(l.Bb)(n, r)) {
                    var e = n.tabs[r];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * C && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * C && (e.typing = void 0)
                }
                return n
            })
        }

        function ve(e) {
            var t = {},
                n = e.find(function(e) {
                    return "poll" === e[0]
                });
            if (n) {
                var r = j(n, 3)[2];
                Object.assign(t, r)
            }
            return t
        }

        function ye(e) {
            return e.map(function(e) {
                var t = "audiomsg" === e[2] ? "audio_message" : e[2];
                return e[0] + ":" + e[1] + ":" + t
            }).join(",")
        }
        var je = function(e, t, n, i) {
                var a = Date.now() + rand(0, 100).toFixed(0),
                    o = i.ref_id,
                    s = i.ref_source;
                i.ref_source = void 0, i.ref_id = void 0, (s || o) && (I({
                    ref_source: null,
                    ref: null
                }), T()), Object(b.i)(i);
                var c = t.attaches.length > 0,
                    l = Object(b.k)(i, "send", "server", c),
                    u = Object.assign({
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
                    }, n.external, ve(t.attaches));
                return Object(r.b)(k, u, 2e4).then(function(e) {
                    var t = j(e, 1)[0];
                    return l(), i.version !== t.version && nav.reload({
                        force: !0
                    }), i.currentEntryPoint = "", i
                }).catch(function(e) {
                    throw Object(b.h)(i, e, "send", "server_send"), e
                })
            },
            Oe = D(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments[3],
                    i = r.tabs[e];
                return je(e, t, y({
                    hash: i.hash
                }, n), r)
            }),
            we = D(function(e, t, n) {
                var i = t.attaches.length > 0,
                    a = Object(b.k)(n, "edit", "server", i);
                return Object(r.b)(k, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: ye(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, ve(t.attaches)), 2e4).then(function(e) {
                    j(e, 1)[0];
                    return a(), n
                }).catch(function(e) {
                    throw Object(b.h)(n, e, "edit", "server_send"), e
                })
            });

        function ke(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(s.a)(n).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function Ce(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Se(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Ee(e, t) {
            if (Object(l.ob)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(l.ec)(t, N(n.history), e)
            }
            return Promise.resolve(t)
        }

        function xe(e, t) {
            var n = Object(b.k)(t, "unknown", "attach"),
                i = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(o.e)(r.b, 3, function(e) {
                return e * e
            })(k, i).then(function(r) {
                return n(), Ie(e, r, t)
            }).catch(function(n) {
                return Object(b.h)(t, n, "unknown", "server_load_attach"), Ie(e, null, t)
            })
        }

        function Ie(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")],
                function(e, t) {
                    var n = t.tabs[e.peerId];
                    return n.history = Object(l.dc)(N(n.history), e, t), Promise.resolve(t)
                }(e, n)
        }

        function Te(e, t, n) {
            var r = Object(l.I)(t),
                i = n.tabs[e];
            return i.searchDay = r, i.searchOffset = 0, i.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Pe(e, t, n) {
            return n.tabs[t].searchText = e, Qe(t, n), n
        }

        function Me(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function Le(e, t, n, i, a) {
            var o = +new Date;
            return Object(r.b)(k, {
                act: "a_hints",
                str: e,
                gid: i.hidegid ? 0 : a.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = j(e, 3),
                    n = t[0],
                    r = t[1];
                return H(t[2], a), r.forEach(function(e) {
                    return Object(m.a)(a, e)
                }), pe(n, a), Object(v.c)("messages", o, n && n.length), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function Be(e, t, n, r) {
            return Le(e, t, n, {}, r).then(function(e) {
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

        function Ne(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = (t ? e.search(t) : e.list).map(De);
                    return n.mapped_index || (n.mapped_index = {}), r.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }
        var Ae = Ne(function(e) {
                return e.topConvTree
            }),
            He = Ne(function(e) {
                return e.imTopConvTree
            }),
            Re = Ne(function(e) {
                return e.hintsTree
            });

        function Fe(e, t) {
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
            var s = e.select(c.b);
            return Object(o.e)(r.b, 1, function() {
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
                var r = j(e, 4),
                    o = r[0],
                    s = r[1],
                    c = r[2],
                    l = r[3];
                return t.popular_sugg = c, new vkIndexer(o, function(e) {
                    return e[1]
                }, n), new vkIndexer(s, function(e) {
                    return e[1]
                }, i), l && l.length > 0 ? new vkIndexer(l, function(e) {
                    return e[1]
                }, a) : a(), t
            })
        }

        function qe(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(r.b)(k, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = j(n, 4),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3];
                return o.forEach(function(t) {
                    return Object(m.a)(e, t)
                }), H(s, e), pe(a, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[t] = !i.has_more, Promise.resolve(e)
            })
        }
        var Ue = D(function(e, t) {
            return Object(r.b)(k, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(n) {
                var r = j(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3],
                    c = r[4];
                return a.forEach(function(e) {
                    return Object(m.a)(t, e)
                }), Object(l.Lb)(t, i), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(i).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = i[e]
                }), [i, o]
            })
        });

        function ze(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function We(e, t) {
            return !(t.peer !== e || !Object(l.ob)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Ke(e, t) {
            if (Object(l.ob)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, I({
                    st: ""
                }), T()
            }
            return Promise.resolve(t)
        }

        function Ve(e, t) {
            if (Object(l.ob)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Qe(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Xe = D(function(e, t) {
            var n = t.tabs[e],
                i = "";
            if (Qe(e, t), n.searchDay && (i = "day:" + n.searchDay), !i && !n.searchText) return Promise.reject();
            var a = "in:" + e + " " + i + " " + (n.searchText || "");
            return I({
                st: n.searchText
            }), T(), Object(r.b)(k, {
                act: "a_search",
                q: a,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(function(e) {
                var t = j(e, 3),
                    r = t[0],
                    i = t[1],
                    a = t[2];
                return n.searchOffset = i, n.searchAllLoaded = a, r
            })
        });

        function Ge(e) {
            return Object(r.b)(k, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Je(e, t) {
            var n = Object(d.t)(e, t);
            return Object(r.b)(k, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var i = j(r, 2),
                    a = i[0],
                    o = i[1];
                n.lastmsg = a[0] || !1, n.lastmsg_meta = a;
                var s = j(o, 3);
                n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[u.m] = e.get().dialog_tabs[u.m].filter(function(e) {
                    return e != t
                })), re(e.get(), n, !1, ae.bind(null, t), Wt.bind(null, e.get()))
            })
        }

        function Ye(e, t, n) {
            if (Object(l.ob)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function Ze(e, t, n) {
            if (Object(l.ob)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(l.Mb)(e, N(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var $e = D(function(e, t, n, i, a) {
            return Object(r.b)(k, {
                act: "a_mark",
                peer: t,
                hash: n || a.tabs[t].hash,
                gid: a.gid,
                msgs_ids: e.join(","),
                mark: i
            })
        });

        function et(e, t, n, r) {
            if (Object(l.ob)(r, t)) {
                var i = r.tabs[t];
                i.deleted = i.deleted ? i.deleted.concat(e) : e, i.history = Object(l.Nb)(e, t, n, N(i.history)), i.offset -= e.filter(function(e) {
                    return i.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function tt(e, t, n) {
            if (Object(l.ob)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(l.gc)(e, t, N(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function nt(e, t, n, i) {
            return Object(r.b)(k, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: i
            })
        }
        var rt = D(function(e, t, n) {
                return Object(l.Fc)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(r.b)(k, {
                    act: "a_activity",
                    type: t,
                    peer: e,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                }, function() {
                    return n
                }))
            }),
            it = D(function(e, t) {
                return Object(r.b)(k, {
                    act: "a_accept_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    t.tabs[e].is_message_request = !1
                }).then(function() {
                    return t
                })
            }),
            at = D(function(e, t) {
                return Object(r.b)(k, {
                    act: "a_reject_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return re(t, t.tabs[e], !0, function(t) {
                        return t.filter(function(t) {
                            return t !== e
                        })
                    }), en(t.tabbedPeers.filter(function(t) {
                        return t.peer !== e
                    }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null, t
                })
            }),
            ot = D(function(e, t) {
                return rt(e, S, t)
            }),
            st = D(function(e, t) {
                return rt(e, E, t)
            });

        function ct(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function lt(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function ut(e, t, n) {
            if (Object(l.Bb)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, re(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && le(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, en(n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, n), t.then(function(t) {
                    var i = j(t, 2);
                    i[0], i[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var dt = D(function(e, t) {
                return ut(e, Object(r.b)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            ft = D(function(e, t, n) {
                return Object(r.b)(k, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            mt = D(function(e, t) {
                return Object(r.b)(k, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = j(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });
        var pt = D(function(e, t, n) {
            return Object(r.b)(k, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function(e) {
                return n
            })
        });

        function gt(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(r.b)(k, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                return j(e, 1)[0].forEach(function(e) {
                    return Object(m.a)(t, e)
                }), t
            })
        }

        function ht(e, t, n) {
            var r = {},
                i = n.get();

            function o(e, t) {
                Object(l.hb)(e) && t && !Object(m.b)(i, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var s = t.filter(function(e) {
                return !Object(l.Bb)(i, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
            t.forEach(function(e) {
                o(e.peerId, e.userId)
            }), e.forEach(function(e) {
                o(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(function(e) {
                return e.flags & a.m && !e.local
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

        function bt(e, t, n) {
            var i = e.needMembers,
                a = e.needAdminIds,
                o = e.needPeers;
            return t.pause(), Promise.all([gt(i, n), function(e, t) {
                return 0 === e.length ? Promise.resolve(t) : Object(r.b)(k, {
                    act: "a_get_admin",
                    admins: e.join(","),
                    gid: t.gid
                }).then(function(e) {
                    var n = j(e, 1)[0];
                    return t.admins = extend(t.admins, n), t
                })
            }(a, n), Promise.all(o.map(function(e) {
                return R(e, 0, 0, 0, n)
            }))]).catch(function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }
        var _t = D(function(e, t) {
            return e.kludges.source_act === l.d ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.b)(k, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = j(n, 2),
                    i = r[0],
                    a = r[1];
                t.chat_photo_msg = a;
                var o = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = i[0], t.tabs[e.peerId].photoLarge = i[1], Object(l.ob)(t, e.peerId)) {
                    var s = e.kludges.source_act;
                    o.history = Object(l.w)(e, s, t, N(o.history))
                }
                return t
            })
        });

        function vt(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(l.Bb)(r, n) && r.peer == n && (r = X(r)), Promise.resolve(r))
        }
        var yt = D(function(e, t) {
                return Object(r.b)(k, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(vt.bind(null, l.c, vk.id, e, t))
            }),
            jt = D(function(e, t) {
                return Object(r.b)(k, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(vt.bind(null, l.b, vk.id, e, t))
            }),
            Ot = D(function(e, t, n) {
                return Object(r.b)(k, {
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
                }).then(wt.bind(null, e, t))
            });

        function wt(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, X(n)
        }

        function kt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var Ct = D(function(e, t, n, i) {
            return St(e, n, t, i), Object(r.b)(k, {
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

        function St(e, t, n, r) {
            if (Object(l.ob)(r, t)) {
                var i = r.tabs[t];
                e.filter(function(e) {
                    return i.msgs[e]
                }).forEach(function(e) {
                    var o = Object(d.m)(r, t, e),
                        s = n ? o.flags | a.l : o.flags & ~a.l;
                    o.flags = s, i.msgs[e] = o, i.history = Object(l.Kc)(e, n, N(i.history))
                })
            }
            return Promise.resolve(r)
        }

        function Et(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function xt(e, t) {
            return Object(r.b)(k, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function It(e, t) {
            return Object(r.b)(k, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function Tt(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Pt(e, t) {
            return Object(r.b)(k, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Mt(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }
        var Lt = D(function(e, t, n, i) {
            return i.creating = !0, i.longpoll.pause(), Object(r.b)(k, {
                act: "a_multi_start",
                hash: i.writeHash,
                peers: t.join(","),
                title: n
            }).then(function(e) {
                var t = j(e, 1)[0];
                return i.next_peer = t.peerId, i.tabs[t.peerId] = t, re(i, t, !1, function(e) {
                    return [t.peerId].concat(e)
                }), i.longpoll.resume(), i
            }).then(function(t) {
                return e ? function(e, t, n) {
                    return Object(r.b)("al_page.php", {
                        act: "owner_photo_save",
                        peer: e,
                        _query: t
                    }).then(function(e) {
                        return n
                    })
                }(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            }).catch(function(e) {
                throw i.creating = !1, i.longpoll.resume(), e
            })
        });

        function Bt(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                i = e.active_tab;
            return Object(r.b)(k, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: i,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(n) {
                var r = j(n, 5),
                    a = r[0],
                    o = r[1],
                    c = r[2],
                    d = r[3],
                    f = r[4];
                o.forEach(function(t) {
                    return Object(m.a)(e, t)
                }), Object(l.Lb)(e, a), c.user_unread && handlePageCount("msg", c.user_unread), Object(s.j)("Resync success", "success");
                var p = e.peer,
                    g = void 0;
                if (Object(l.yb)(p)) g = Promise.resolve(!1);
                else {
                    var h = {
                        tabs: O({}, p, e.tabs[p]),
                        oCache: {}
                    };
                    g = pe(O({}, p, a[p]), h)
                }
                return g.then(function(n) {
                    e.tabs = a, e.admins = extend(e.admins, d), n && (e.tabs[p] = n.tabs[p], e.tabs[p].history = Object(l.hc)(p, e, N(e.tabs[p].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[i] = f.map(intval);
                    var r = e.dialog_tabs[i].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != i
                    }).forEach(function(t) {
                        i == u.h ? e.dialog_tabs[t] = r.filter(Ut(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ht(intval(c.unread), e)
                })
            }).catch(function(t) {
                return Object(s.j)("Resync error: " + t.message + " " + t.stack, "error"), Object(o.c)(2).then(Bt.bind(null, e))
            })
        }

        function Dt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Nt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function At(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0
        }

        function Ht(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[u.m] = e, Promise.resolve(t)
        }

        function Rt(e, t) {
            return t.ctrl_submit = !!e, Object(r.b)(k, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function Ft(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                i = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var a = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(_.ob)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(_.ob)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(_.ob)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, i, n);
                n.update_title_to = setInterval(a, 1e3), a()
            } else !t && n.update_old_title && (Object(_.ob)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + i + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function qt(e, t, n, r, i) {
            return Object(l.ob)(i, e) && (i.tabs[e].scrollTop = intval(t), i.tabs[e].scrollBottom = intval(n), i.tabs[e].contHeight = intval(r)), Promise.resolve(i)
        }

        function Ut(e) {
            return e === u.h ? function(e) {
                return !Object(l.Fc)(e)
            } : e === u.m ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & u.j[e]
            }
        }

        function zt(e, t) {
            t.active_tab = e, Object(i.b)({
                tab: e === u.h ? null : e
            });
            var n = [];
            if (e !== u.h && !Object(l.zb)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[u.h].map(function(e) {
                    return t.tabs[e]
                }).filter(Ut(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function Wt(e, t, n, r) {
            var i = e.dialog_tabs_all;
            return !(!i[u.h] && !i[t]) || (n.filter(function(e) {
                return e === r.peerId
            }).length > 0 || ("r" === r.lastmsg[0] || n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(l.zb)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            }).length > 0))
        }

        function Kt(e, t, n, r, i) {
            if (Object(l.Bb)(i, e)) {
                var o = i.tabs[e];
                return n === a.L && (t ^= o.folders),
                    function(e, t, n) {
                        return !(e === a.T && n.folders & t || !(e !== a.P || n.folders & t))
                    }(n, t, o) && Object.keys(u.j).filter(function(e) {
                        return u.j[e] & t
                    }).forEach(function(e) {
                        i.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== a.P || e.folders & u.j[n] ? t === a.L ? e.folders & u.j[n] ? -1 : 1 : t === a.T ? 1 : -1 : 0
                        }(o, n, e)
                    }), n === a.T ? i.tabs[e].folders |= t : n === a.P ? i.tabs[e].folders &= ~t : i.tabs[e].folders = t ^= o.folders, re(i, i.tabs[e], !0, function(t, n) {
                        return t.concat([e]).map(function(e) {
                            return i.tabs[e]
                        }).filter(Ut(n)).map(function(e) {
                            return e.peerId
                        })
                    }, Wt.bind(null, i)), Promise.resolve(i)
            }
            return R(e, 0, 0, 0, i).then(Kt.bind(null, e, t, n, i))
        }
        var Vt = D(function(e, t) {
                var n = u.j[u.i],
                    i = t.tabs[e].folders & n,
                    o = i ? a.yb : a.Cb;
                return t.longpoll.push([o([0, e, n, !0])]), Object(r.b)(k, {
                    act: "a_dialog_star",
                    val: i ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            Qt = D(function(e, t, n) {
                var i = u.j[u.n];
                return n.longpoll.push([a.yb([0, e, i, !0]), a.pb([6, e, t])]), Object(r.b)(k, {
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
            return Object(r.b)(k, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Gt(e, t) {
            return H(O({}, e, {
                free: !0
            }), t), Object(r.b)(k, {
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
        var Yt = D(function(e, t) {
            return re(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(r.b)(k, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? (en(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, re(t, t.tabs[e], !1, ae.bind(null, e), Wt.bind(null, t))), n
            })
        });

        function Zt(e, t, n, i) {
            return Object(r.b)(k, {
                act: "a_restore_dialog",
                hash: t,
                gid: i.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(function(t) {
                return i.tabs[e].deletedDialog = !1, re(i, i.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), i.tabs[e].unread = t, i
            })
        }

        function $t(e, t, n) {
            return Object(r.b)(k, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function en(e, t, n) {
            return n.tabbedPeers = e, Object(l.ib)(n) && (I({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(l.R)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(l.H).join("_")
            }), t && T()), Promise.resolve(n)
        }

        function tn(e) {
            return !e.peer || (We(e.peer, e) ? ze(e.peer, e) : !!Object(l.ob)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function nn(e, t) {
            var n = t.tabs[e];
            return Object(l.ob)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function rn(e, t) {
            var n = t.tabs[e];
            return Object(l.ob)(t, e) && (n.history = A(n.history)), Promise.resolve(t)
        }

        function an(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function on(e, t, n) {
            if (!Object(l.kb)(t)) return Promise.resolve(n);
            var i = Object(d.t)(n, t);
            return i.blocked_community = !e, !1 === e && (i.can_send_notify = !1), Object(r.b)(k, {
                act: "a_toggle_community",
                peer_id: t,
                hash: i.hash,
                state: e ? 1 : 0
            }).then(function() {
                return X(n)
            })
        }

        function sn(e, t) {
            if (0 !== t.peer && Object(l.ob)(t, t.peer)) {
                var n = Object(d.t)(t, t.peer);
                n.history = N(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function cn(e, t) {
            if (0 !== t.peer && Object(l.ob)(t, t.peer)) {
                var n = Object(d.t)(t, t.peer),
                    r = geByClass1("_im_peer_history");
                r && (n.history = N(r.innerHTML)), e(n.history)
            }
            return Promise.resolve(t)
        }

        function ln(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function un(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function dn(e) {
            I({
                act: e ? "create" : null
            }), T()
        }

        function fn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            I({
                q: e
            }), T()
        }

        function mn(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(l.U)() > window.clientHeight() && Object(l.jc)(0)), Promise.resolve(e)
        }
        var pn = D(function(e, t, n) {
            return Object(r.b)(k, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(function(e) {
                var t = j(e, 4),
                    r = t[0],
                    i = t[1],
                    a = t[2],
                    o = t[3];
                return a.forEach(function(e) {
                    return Object(m.a)(n, e)
                }), n.tabs[r] = i, re(n, i, !1, ae.bind(null, r), Wt.bind(null, n)), n.admins = extend(n.admins, o), [r]
            })
        });

        function gn(e, t) {
            return Object(r.b)(k, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var hn = D(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(k, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        });

        function bn(e) {
            return P({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function _n(e, t) {
            var n = Object(s.a)([e].concat(t.select(c.b))).slice(0, 500);
            t.update(c.b, n)
        }

        function vn(e) {
            e.update(c.b, [])
        }

        function yn(e, t) {
            var n = t.select(c.b).filter(function(t) {
                return t !== e
            });
            return t.update(c.b, n), n
        }

        function jn(e, t, n) {
            var r = n.tabs[t],
                i = Object(d.m)(n, t, e);
            return r.data.kicked || r.data.closed || i.kludges.source_act || (r.pinned = i), Promise.resolve(n)
        }

        function On(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var wn = D(function(e, t, n) {
                var i = n.tabs[t];
                return i.data.kicked || i.data.closed ? Promise.resolve(n) : Object(r.b)(k, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(function(e) {
                    var r = j(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, i, r), n
                })
            }),
            kn = D(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.b)(k, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var i = j(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, i), t
                })
            }),
            Cn = D(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)(k, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = j(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            Sn = D(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.b)(k, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: i.hash
                })
            }),
            En = D(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.b)(k, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(function(e) {
                    var r = j(e, 1),
                        i = j(r[0], 3),
                        a = i[0],
                        o = i[1],
                        s = i[2];
                    return n.memberIds = a, n.adminIds = o, s.forEach(function(e) {
                        return Object(m.a)(t, e)
                    }), n.membersLoaded = !0, t
                })
            }),
            xn = D(function(e, t) {
                return Promise.all([En(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.b)(k, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(function(e) {
                        var r = j(e, 1)[0];
                        return n.photoGrid = r.grid, n.photoLarge = r.photo, n.membersLastSeen = r.lastSeen || null, n.inviters = r.inviters, n.caccess = r.caccess, n.invitedByMe = r.invitedByMe || [], n.inviteLink = r.link || null, n.serverSettings = r.serverSettings || null, t
                    })
                }(e, t)]).then(function() {
                    return t
                })
            }),
            In = D(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.b)(k, {
                    act: "a_update_flags",
                    chat: e,
                    hash: i.hash,
                    flags: t
                })
            }),
            Tn = D(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(function() {
                    return n.photo = null, n.photoLarge = null, t
                })
            });

        function Pn(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var Mn = D(function(e, t, n) {
            var i = n.tabs[e];
            return Object(r.b)(k, {
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

        function Ln(e, t, n, r) {
            var i = r.tabs[e];
            return i.adminIds = n ? [].concat(i.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : i.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }
        var Bn = D(function(e, t, n, i) {
            var a = i.tabs[e];
            return Object(r.b)(k, {
                act: "a_toggle_admin",
                chat: e,
                hash: a.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return Ln(e, t, n, i)
            })
        });

        function Dn(e, t, n, r) {
            var i = Object(d.m)(e, n, t).userId;
            return Object(m.c)(r, i) ? Promise.resolve(r) : gt(O({}, n, [i]), r)
        }

        function Nn() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function An() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Hn = D(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.b)(k, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Rn = D(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var i = n.tabs[e];
                return Object(r.b)(k, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: i.hash
                }).then(function() {
                    return n
                })
            });

        function Fn(e, t) {
            return Object(r.b)(k, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(function(n) {
                var r = j(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function qn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, zn(e, !1, !0, n)
        }

        function Un(e, t) {
            return qn(e, null, t)
        }

        function zn(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, O({}, e, t)))), Promise.resolve(r)
        }
        var Wn = D(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(k, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(function(n) {
                var r = j(n, 1)[0];
                return qn(e, r, t)
            })
        });

        function Kn(e, t, n, i) {
            var a = i.tabs[e];
            return a.caccess[t] = n, Object(r.b)(k, {
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
        var Vn = D(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.b)(k, {
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
            return Object(r.b)(k, {
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
            return Object(r.b)(k, {
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

        function Gn(e, t) {
            if (Object(l.ob)(t, e)) {
                var n = Object(d.t)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }
    },
    "wSs/": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "b", function() {
            return l
        }), n.d(t, "c", function() {
            return u
        }), n.d(t, "e", function() {
            return d
        }), n.d(t, "d", function() {
            return f
        });
        var r = n("rHUl"),
            i = n("MhhX"),
            a = n("P13b"),
            o = n("eTng"),
            s = n("aong");

        function c(e, t) {
            t = Object(r.P)(t);
            var n = vk.id == t.peerId && !Object(s.s)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(i.k)(t)) && (!Object(i.l)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(i.f)(t) || Object(i.m)(t) || Object(i.d)(t) || Object(i.g)(t) || Object(i.i)(t) || Object(i.o)(t)) && !Object(a.fb)(e, t.peerId, t.messageId)))))
        }

        function l(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : "@" + e + " (" + t + ")"
            }), t.innerHTML = e, Emoji.val(t)
        }

        function u(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return c(e, t.msgs[n])
            }) || null
        }

        function d(e, t, n) {
            var r = Object(o.a)(t.kludges, t.messageId),
                i = n.dData.attaches;
            if (l(t.text) !== n.dData.txt || r.length !== i.length) return !0;
            for (var a = r.length; a--;) {
                var s = r[a],
                    c = i[a];
                if (s.id != c.id || s.type != c.type || "poll" == s.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function f(e, t, n, r, i, o) {
            t.origText = n, t.text = Object(a.fc)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = i, t.cancelled_shares = o, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    }
});