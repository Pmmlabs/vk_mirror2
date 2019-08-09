! function(e) {
    function t(t) {
        for (var i, a, n = t[0], l = t[1], d = t[2], c = 0, u = []; c < n.length; c++) a = n[c], r[a] && u.push(r[a][0]), r[a] = 0;
        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
        for (h && h(t); u.length;) u.shift()();
        return o.push.apply(o, d || []), s()
    }

    function s() {
        for (var e, t = 0; t < o.length; t++) {
            for (var s = o[t], i = !0, n = 1; n < s.length; n++) {
                var l = s[n];
                0 !== r[l] && (i = !1)
            }
            i && (o.splice(t--, 1), e = a(a.s = s[0]))
        }
        return e
    }
    var i = {},
        r = {
            "web/stories": 0
        },
        o = [];

    function a(t) {
        if (i[t]) return i[t].exports;
        var s = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(s.exports, s, s.exports, a), s.l = !0, s.exports
    }
    a.m = e, a.c = i, a.d = function(e, t, s) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (a.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) a.d(s, i, function(t) {
                return e[t]
            }.bind(null, i));
        return s
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        l = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var d = 0; d < n.length; d++) t(n[d]);
    var h = l;
    o.push([147, "bundles/audioplayer", "bundles/common", "bundles/vendors"]), s()
}({
    "+/AQ": function(e, t, s) {
        "use strict";
        s.d(t, "b", function() {
            return r
        }), s.d(t, "a", function() {
            return l
        });
        var i = s("N1NS");

        function r(e, t) {
            return bodyNode[e] || document.documentElement[e]
        }
        class o {
            constructor(e, t) {
                this.el = e, this.opts = t, this.module = Object(i.a)({
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
                ! function(e, t, s) {
                    "scrollTop" === e && window.scrollTo(0, t)
                }("scrollTop", e, this.el)
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
            scrollBottom(e) {
                if (void 0 === e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                var t = this.contHeight() - e - this.getScrollHeight();
                this.scrollTop(t)
            }
            scrollBottomFixSave(e) {
                var t = () => {
                        Date.now() - s < 500 && this.scrollBottom(e), window.removeEventListener("scroll", t)
                    },
                    s = Date.now();
                window.addEventListener("scroll", t), this.scrollBottom(e)
            }
            onScroll(e) {
                var t = this.scrollTop(),
                    s = t - this.prevScroll,
                    i = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-s, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && i - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }
            getScrollHeight() {
                return this.innerHeight
            }
            destroy() {
                Object(i.c)(this.module)
            }
        }
        class a {
            constructor(e, t) {
                this.prevTop = 0, this.scroll = new uiScroll(e, {
                    hidden: void 0 === t.hidden || t.hidden,
                    shadows: t.shadows,
                    stopScrollPropagation: !1,
                    theme: t.scrollTheme,
                    onmore: () => t.more && t.more(this),
                    onscroll: e => {
                        var s = this.scrollTop(),
                            i = this.prevTop - s;
                        this.prevTop = s, t.scrollChange && t.scrollChange(s), t.onScroll && t.onScroll(i, this)
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
        class n {
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

        function l(e, t) {
            return t.noScroll ? new n(e) : t.nativeScroll ? new o(e, t) : new a(e, t)
        }
    },
    "0Rlc": function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return n
        });
        s("91GP"), s("ioFf"), s("rGqo"), s("Btvt");
        var i = s("q1tI"),
            r = (s("17x9"), s("pemR"));

        function o() {
            return (o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            }).apply(this, arguments)
        }

        function a(e, t) {
            if (null == e) return {};
            var s, i, r = function(e, t) {
                if (null == e) return {};
                var s, i, r = {},
                    o = Object.keys(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || Object.prototype.propertyIsEnumerable.call(e, s) && (r[s] = e[s])
            }
            return r
        }
        class n extends i.Component {
            constructor() {
                super(...arguments), this.onChange = (e => {
                    this.props.onChange && this.props.onChange(this.props.name, e.target.checked)
                })
            }
            render() {
                var e = this.props,
                    t = e.children,
                    s = e.checked,
                    n = e.disabled,
                    l = e.name,
                    d = e.id,
                    h = a(e, ["children", "checked", "disabled", "name", "id"]),
                    c = Object(r.a)("CheckBox", {
                        "CheckBox--disabled": n
                    });
                return i.createElement("label", {
                    className: c
                }, i.createElement("input", o({}, h, {
                    className: "CheckBox__input",
                    id: d,
                    type: "checkbox",
                    checked: s,
                    name: l,
                    disabled: n,
                    onChange: this.onChange
                })), i.createElement("span", {
                    className: "CheckBox__indicator",
                    "aria-hidden": !0
                }), t)
            }
        }
    },
    "0toi": function(e, t, s) {
        "use strict";
        s("91GP");
        var i = s("q1tI"),
            r = (s("17x9"), s("r7nW")),
            o = s("6aSF"),
            a = s("pemR");

        function n() {
            return (n = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            }).apply(this, arguments)
        }
        var l = e => {
            var t = e.title,
                s = e.onClose,
                r = e.appearance,
                o = Object(a.a)("Modal__header", `Modal__header--${r}`);
            return i.createElement("div", {
                className: o
            }, i.createElement("div", {
                className: "Modal__headerInner"
            }, i.createElement("h1", {
                className: "Modal__headerTitle"
            }, t), i.createElement("button", {
                className: "Modal__headerCross",
                type: "button",
                onClick: s
            }, "Закрыть")))
        };
        l.defaultProps = {
            appearance: "white"
        };
        var d = e => i.createElement(o.a, {
            className: "Modal__body"
        }, e.children);
        d.defaultProps = {
            children: null
        };
        var h = e => {
            var t = e.className,
                s = e.appearance,
                o = e.title,
                l = e.actionButtons,
                d = e.onClose,
                c = e.children,
                u = Object(a.a)("Modal", `Modal--${s}`, t);
            return i.createElement(r.a, n({}, e, {
                className: u
            }), i.createElement(h.Header, {
                title: o,
                onClose: d,
                appearance: s
            }), Boolean(c) && i.createElement(h.Body, null, c), i.createElement(h.Footer, {
                actionButtons: l
            }))
        };
        h.Header = l, h.Body = d, h.Footer = (e => {
            var t = e.actionButtons;
            return i.createElement("div", {
                className: "Modal__footer"
            }, i.createElement("div", {
                className: "Modal__footerInner"
            }, t))
        }), h.defaultProps = n({}, r.a.defaultProps, {
            appearance: "white"
        }), t.a = h
    },
    147: function(e, t, s) {
        e.exports = s("EJ7F")
    },
    "16Al": function(e, t, s) {
        "use strict";
        var i = s("WbBG");

        function r() {}

        function o() {}
        o.resetWarningCache = r, e.exports = function() {
            function e(e, t, s, r, o, a) {
                if (a !== i) {
                    var n = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                    throw n.name = "Invariant Violation", n
                }
            }

            function t() {
                return e
            }
            e.isRequired = e;
            var s = {
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
                elementType: e,
                instanceOf: t,
                node: e,
                objectOf: t,
                oneOf: t,
                oneOfType: t,
                shape: t,
                exact: t,
                checkPropTypes: o,
                resetWarningCache: r
            };
            return s.PropTypes = s, s
        }
    },
    "17x9": function(e, t, s) {
        e.exports = s("16Al")()
    },
    "6aSF": function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return l
        });
        s("91GP"), s("ioFf"), s("rGqo"), s("Btvt");
        var i = s("q1tI"),
            r = (s("17x9"), s("+/AQ")),
            o = s("pemR");

        function a() {
            return (a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            }).apply(this, arguments)
        }

        function n(e, t) {
            if (null == e) return {};
            var s, i, r = function(e, t) {
                if (null == e) return {};
                var s, i, r = {},
                    o = Object.keys(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || Object.prototype.propertyIsEnumerable.call(e, s) && (r[s] = e[s])
            }
            return r
        }
        class l extends i.Component {
            constructor() {
                super(...arguments), this.getWrapperRef = (e => {
                    this.wrapper = e
                })
            }
            componentDidMount() {
                var e = this.props,
                    t = e.isNative,
                    s = e.isShadows,
                    i = e.neverHide,
                    o = e.onScroll;
                this.scroller || (this.scroller = Object(r.a)(this.wrapper, {
                    shadows: s,
                    nativeScroll: t,
                    hidden: !i,
                    onScroll: o
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
                    s = (e.isNative, e.isShadows, e.neverHide, e.className),
                    r = void 0 === s ? "" : s,
                    l = n(e, ["children", "isNative", "isShadows", "neverHide", "className"]);
                return i.createElement("div", a({}, l, {
                    className: Object(o.a)("Scroll", r),
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
    "6raB": function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return d
        });
        s("91GP"), s("ioFf"), s("rGqo"), s("Btvt");
        var i = s("q1tI"),
            r = (s("17x9"), s("pemR")),
            o = s("KFTi"),
            a = s("Hx9h");

        function n() {
            return (n = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            }).apply(this, arguments)
        }

        function l(e, t) {
            if (null == e) return {};
            var s, i, r = function(e, t) {
                if (null == e) return {};
                var s, i, r = {},
                    o = Object.keys(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || Object.prototype.propertyIsEnumerable.call(e, s) && (r[s] = e[s])
            }
            return r
        }
        class d extends i.Component {
            constructor(e) {
                super(e), this.needRecalcSize = !1, this.state = {}
            }
            render() {
                var e = this.props,
                    t = e.className,
                    s = e.loading,
                    d = e.children,
                    h = l(e, ["className", "loading", "children"]),
                    c = Object(r.a)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": s
                    }, t);
                return i.createElement(a.a, n({}, h, {
                    className: c
                }), i.createElement("span", {
                    className: "ButtonWithProgress__content"
                }, d), s && i.createElement(o.a, {
                    inverted: "primary" === e.appearance,
                    className: "ButtonWithProgress__progress"
                }))
            }
        }
        d.defaultProps = {
            appearance: "primary",
            size: "m",
            wide: !1,
            loading: !1
        }
    },
    As6E: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return h
        });
        s("91GP"), s("rGqo"), s("Btvt");
        var i = s("q1tI"),
            r = s("i8i4"),
            o = (s("17x9"), s("pemR")),
            a = s("clTp"),
            n = 80,
            l = 250,
            d = () => "undefined" != typeof window;
        class h extends i.Component {
            constructor(e) {
                super(e), this.onClick = (() => {
                    if (!this.state.dropdown || this.state.dropdown.removed) {
                        var e = this.props,
                            t = e.text,
                            s = e.position,
                            i = e.align,
                            r = e.marginTop,
                            o = e.marginLeft,
                            n = Object(a.a)(this.el);
                        this.update({
                            text: t,
                            position: s,
                            align: i,
                            rect: n,
                            marginTop: r,
                            marginLeft: o
                        })
                    } else this.update()
                }), this.onMouseEnter = (e => {
                    this.callerHovered = !0, this.timeouts.appear = setTimeout(() => {
                        if (this.el && this.callerHovered) {
                            var e = this.props,
                                t = e.position,
                                s = e.align,
                                i = e.marginTop,
                                r = e.marginLeft,
                                o = Object(a.a)(this.el);
                            this.update({
                                position: t,
                                align: s,
                                rect: o,
                                marginTop: i,
                                marginLeft: r
                            })
                        }
                    }, n)
                }), this.onMouseLeave = (e => {
                    this.callerHovered = !1, this.timeouts.callerDisappear = setTimeout(() => {
                        this.callerHovered || this.hovered || this.update()
                    }, l)
                }), this.onDropdownMouseEnter = (() => {
                    "hover" === this.props.trigger && (this.hovered = !0)
                }), this.onDropdownMouseLeave = (e => {
                    "hover" === this.props.trigger && (this.hovered = !1, this.timeouts.disappear = setTimeout(() => {
                        this.callerHovered || this.hovered || this.update()
                    }, l))
                }), this.onDocumentClick = (e => {
                    !this.state.dropdown || this.state.dropdown.removed || this.el.contains(e.target) || this.update()
                }), this.onResize = (e => {
                    if (this.state.dropdown && !this.state.dropdown.removed) {
                        var t = this.props,
                            s = t.text,
                            i = t.position,
                            r = t.align,
                            o = t.marginTop,
                            n = t.marginLeft,
                            l = Object(a.a)(this.el);
                        this.update({
                            text: s,
                            position: i,
                            align: r,
                            rect: l,
                            marginTop: o,
                            marginLeft: n
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
                var t = e.position,
                    s = e.align,
                    i = e.rect,
                    r = e.marginTop,
                    o = e.marginLeft,
                    a = i.left,
                    n = i.top;
                switch (t) {
                    case "t":
                        a += .5 * i.width;
                        break;
                    case "r":
                        a += i.width, n += .5 * i.height;
                        break;
                    case "b":
                        a += .5 * i.width, n += i.height;
                        break;
                    case "l":
                        n += .5 * i.height
                }
                a = Math.round(a + o), n = Math.round(n + r), this.setState({
                    dropdown: {
                        position: t,
                        align: s,
                        x: a,
                        y: n
                    }
                })
            }
            renderDropdown() {
                if (!this.state.dropdown) return null;
                var e = this.state.dropdown,
                    t = e.x,
                    s = e.y,
                    r = e.position,
                    a = e.align,
                    n = e.removed,
                    l = Object(o.a)("Dropdown", `Dropdown--${r}`, {
                        "Dropdown--removed": !!n,
                        [`Dropdown--align-${a}`]: "t" === r || "b" === r
                    }, this.props.className);
                return i.createElement("div", {
                    className: l,
                    style: {
                        top: s,
                        left: t
                    },
                    onTransitionEnd: e => this.onTransitionEnd(e),
                    onMouseEnter: this.onDropdownMouseEnter,
                    onMouseLeave: this.onDropdownMouseLeave
                }, i.createElement("ul", {
                    className: "Dropdown__in"
                }, this.props.data.map((e, t) => i.createElement("li", {
                    className: Object(o.a)("Dropdown__item", {
                        Dropdown__item_separator: e.separator
                    }),
                    onClick: t => this.onItemClick(t, e),
                    key: void 0 !== e.id ? e.id : t
                }, e.text))))
            }
            render() {
                var e = this.renderDropdown();
                return e ? (!this.defaultNode && d() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), i.createElement(i.Fragment, null, this.props.children, r.createPortal(e, this.defaultNode))) : this.props.children
            }
        }
        h.defaultProps = {
            position: "b",
            align: "center",
            marginTop: 0,
            marginLeft: 0,
            trigger: "click",
            className: ""
        }
    },
    EJ7F: function(e, t, s) {
        "use strict";
        s.r(t);
        s("rE2o"), s("ioFf"), s("pIFo"), s("Oyvg"), s("OG14"), s("rGqo"), s("Btvt"), s("KKXr"), s("SRfc"), s("91GP"), s("VRzm");
        var i = s("q1tI"),
            r = s("i8i4"),
            o = s("E2g8"),
            a = o.Promise,
            n = {},
            l = {},
            d = [],
            h = !1,
            c = !1;

        function u(e, t, s) {
            var i = l[e];
            if (i)
                for (var r = 0; r < i.length; r++) {
                    var o = i[r];
                    t ? o.resolve(s) : o.reject(), i.splice(r, 1), r--
                }
        }

        function p(e, t) {
            h.postMessage({
                cmd: "load",
                url: e
            })
        }

        function _(e) {
            return h || ((h = new Worker("/js/cmodules/web/stories_loader_worker.js")).onmessage = (e => {
                var t = e.data;
                switch (t.type) {
                    case "loaded":
                        n[t.url] = t.data, u(t.url, !0, t.data);
                        break;
                    case "error":
                        u(t.url, !1);
                        break;
                    case "inited":
                        c = !0;
                        for (var s = 0; s < d.length; s++) p(d[s])
                }
            })), new a((t, s) => {
                if (e || t(""), n[e]) return t(n[e]);
                switch (function(e) {
                    return e.match(/\.mp4/) ? "video" : e.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
                }(e)) {
                    case "video":
                    case "image":
                        l[e] || (l[e] = []);
                        var i = 0 === l[e].length;
                        if (l[e].push({
                                resolve: t,
                                reject: s
                            }), !i) return;
                        c ? p(e) : d.push(e);
                        break;
                    default:
                        vk.dev && console.error("wrong media url")
                }
            })
        }
        var v = !1;

        function m(e) {
            return v || function() {
                var e = function(e) {
                    try {
                        return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                    } catch (e) {}
                    return !1
                }(utilsNode.appendChild(ce("iframe")));
                v = e && e.body ? e.body : utilsNode.appendChild(ce("div", {}, {
                    display: "none"
                }))
            }(), e.match(/\.mp4/) ? function(e) {
                return new a((t, s) => {
                    var i = ce("video");
                    i.oncanplay = (() => {
                        t(), re(i)
                    }), i.onerror = (() => {
                        s(), re(i)
                    }), v.appendChild(i), i.src = e
                })
            }(e) : function(e) {
                return new a((t, s) => {
                    var i = vkImage();
                    i.onload = (() => {
                        t(), re(i)
                    }), i.onerror = (() => {
                        s(), re(i)
                    }), v.appendChild(i), i.src = e
                })
            }(e)
        }

        function y() {
            var e = ls.get("video_volume");
            return "number" == typeof e ? Math.min(1, Math.max(0, e)) : 1
        }

        function b(e) {
            ls.set("video_volume", e)
        }

        function g() {
            var e = [];
            return [...arguments].forEach(t => {
                if (t) switch (typeof t) {
                    case "string":
                        e.push(t);
                        break;
                    case "object":
                        Object.keys(t).forEach(s => {
                            t[s] && e.push(s)
                        });
                        break;
                    default:
                        e.push("" + t)
                }
            }), e.join(" ")
        }

        function f(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var w = [];

        function S(e, t) {
            var s = arguments;
            cur.storyLayer && cur.storyLayer.pauseLayer(), ge("stories_layers_background") || (bodyNode.appendChild(ce("div", {
                id: "stories_layers_background",
                className: "stories_layers_background"
            })), layerQueue.hide(), layerQueue.push(), layers.fullhide = E, addEvent(window, "visibilitychange", T.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", T.resize), addEvent(document, "keydown", T.keydown), addEvent(document, "keyup", T.keyup)), cur.storyLayer = e, e.animateStory("expand", t.fromEl), w.push(e), e.length > 1 && addClass(e.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + w.length, function() {
                var t = f(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], 1)[0],
                    i = s[0] && s[0].isCloseBtnClick;
                t ? e._sendNavigationStatEvents("close_auto_by_time") : e._sendNavigationStatEvents("close_tap"), w.length > 1 && !i ? e.back(!0) : (e.hideAllLayers = i, e.hide(!1, !0))
            })
        }

        function k() {
            w.length > 1 ? w[w.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
        }

        function E(e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], s = 0; s < w.length; s++) w[s].hide(!0);
            if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), removeEvent(window, "visibilitychange", T.visibilitychange), removeEvent(window, "resize", T.resize), removeEvent(document, "keydown", T.keydown), removeEvent(document, "keyup", T.keyup), t) {
                var i = nav.objLoc;
                delete i.w, nav.setLoc(i)
            }
            cur.needUpdateFeedStories && Stories.updateFeedStories(), w = []
        }

        function O() {
            return w[w.length - 2]
        }

        function j(e) {
            for (var t = 0; t < w.length; t++) w[t].onReplyDeleted(e)
        }
        var T = {
                visibilitychange: e => {
                    cur.storyLayer && cur.storyLayer.onVisibilityChange(e)
                },
                resize: e => {
                    cur.storyLayer && cur.storyLayer.onResize(e)
                },
                keydown: e => {
                    cur.storyLayer && cur.storyLayer.onKeyDown(e)
                },
                keyup: e => {
                    cur.storyLayer && cur.storyLayer.onKeyUp(e)
                }
            },
            C = (s("tUrg"), s("17x9"), s("T/g7"));

        function L(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function x(e) {
            var t = e.story,
                s = t.getCurStoryData().hide_settings,
                r = window.uiActionsMenu;
            if (s) return null;
            var o, a, n = function(e) {
                var t = [],
                    s = e.getCurStoryData(),
                    i = s.raw_id,
                    r = s.can_hide_reply,
                    o = s.report_hash,
                    a = s.can_remove,
                    n = s.can_share,
                    l = s.narrative,
                    d = s.is_ads,
                    h = e.data.can_blacklist,
                    c = L(i.split("_").map(e => intval(e)), 1)[0],
                    u = l && !l.is_cover;
                !h || u || d || t.push({
                    label: Object(C.b)("stories_add_blacklist_button"),
                    onClick: () => e._addToBlacklist()
                });
                r && t.push({
                    label: Object(C.b)("stories_hide_reply_button"),
                    onClick: () => e._hideReply()
                });
                l && t.push({
                    label: l.is_bookmarked ? Object(C.b)("stories_narrative_remove_bookmark_button") : Object(C.b)("stories_narrative_add_bookmark_button"),
                    onClick: () => e._sendNarrativeBookmarkButtonDidPress()
                });
                n && t.push({
                    label: Object(C.b)("stories_share"),
                    onClick: () => e.shareBox()
                });
                l && l.can_edit && t.push({
                    label: Object(C.b)("stories_narrative_edit_button"),
                    onClick: () => e._sendNarrativeEditButtonDidPress()
                });
                a && e.getOwnerId() < 0 && t.push({
                    label: l ? Object(C.b)("global_narrative_delete") : Object(C.b)("global_delete"),
                    onClick: () => l ? e.removeNarrativeBox() : e.removeStoryBox()
                });
                o && t.push({
                    label: Object(C.b)("stories_report"),
                    onClick: () => e.report()
                });
                c === vk.id || u || t.push({
                    label: Object(C.b)("stories_settings"),
                    onClick: () => window.Stories.showBlackList()
                });
                return t
            }(t);
            if (0 === n.length) return null;
            return i.createElement("div", {
                className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
                onMouseEnter: e => {
                    clearTimeout(o), t.pauseStory(), r.show(a, e)
                },
                onMouseLeave: () => {
                    r.hide(a), clearTimeout(o), o = setTimeout(() => t.autoResumeStory(), 300)
                },
                ref: e => {
                    a = e
                }
            }, i.createElement("div", {
                className: "ui_actions_menu _ui_menu"
            }, n.map(e => {
                var t = e.label,
                    s = (e.className, e.onClick);
                return i.createElement("div", {
                    key: t,
                    className: "ui_actions_menu_item",
                    onClick: s
                }, t)
            })))
        }

        function B(e) {
            var t = e.story,
                s = t.getReplies(),
                r = t.getViews() || "",
                o = t.getCurStoryData(),
                a = o.can_manage,
                n = o.narrative,
                l = o.isNewQuestions,
                d = s.count || "",
                h = n && !n.is_cover,
                c = !(!a || !r),
                u = t.isActiveLive();
            if (h || u || !r && !d) return null;
            var p = "stories_button views _views_button" + (l ? " stories_button_new_questions" : "");
            return i.createElement("div", {
                className: p,
                onClick: e => {
                    t._hideTooltip(), t.showFeedbackTooltip(), e.stopPropagation()
                }
            }, c && i.createElement("div", {
                className: "stories_button_views"
            }, r), d && i.createElement("div", {
                className: "stories_button_replies",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(d, "%s", !0)
                }
            }))
        }
        var N = window,
            I = N.getLang,
            P = N.showTooltip,
            R = N.trim,
            M = N.addEvent,
            A = N.removeEvent,
            D = N.cancelEvent,
            F = N.isObject,
            H = N.showNarrative;
        class W extends i.Component {
            constructor(e) {
                super(e), this.emojiId = !1, this.state = {
                    story: e.story,
                    sendFormHasText: !1,
                    sendFormFocused: !1,
                    linkObjectAudioPlaying: !1
                }
            }
            componentDidMount() {
                this.emojiInit()
            }
            componentWillUnmount() {
                this.emojiId && (Emoji.destroy(this.emojiId), delete this.emojiId)
            }
            componentDidUpdate() {
                this.emojiInit()
            }
            render() {
                var e = this.props.story;
                if (!e.story || !this.props.story.getCurStoryData()) return "";
                var t = {
                    left_side_empty: this._leftSideIsEmpty()
                };
                return i.createElement("div", {
                    className: g("stories_story_bottom", t)
                }, i.createElement("div", {
                    className: "stories_story_bottom_controls",
                    ref: "controls"
                }, i.createElement(B, {
                    story: e
                }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), i.createElement(x, {
                    story: e
                })))
            }
            _renderLink() {
                var e = this.props.story.getCurStoryData().link;
                if (!F(e)) return "";
                var t = "stories_link";
                return e.object_type && (t += ` story_link_object_${e.object_type}`), this.state.linkObjectAudioPlaying && (t += " story_link_object_audio_playing"), i.createElement("div", {
                    className: "stories_link_wrap"
                }, i.createElement("a", {
                    target: "_blank",
                    rel: "noopener",
                    className: t,
                    href: e.url,
                    title: e.text,
                    onClick: t => {
                        this._linkDidPress(t, e)
                    }
                }, i.createElement("span", {
                    className: "stories_link__inner",
                    dangerouslySetInnerHTML: {
                        __html: e.text
                    }
                })))
            }
            _renderMask() {
                return this.props.story.getCurStoryData().mask_id ? i.createElement("div", {
                    className: "stories_button mask _mask_button",
                    onMouseOver: e => P(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: I("stories_mask_tooltip")
                    }),
                    onClick: this._maskButtonDidPress.bind(this)
                }) : ""
            }
            _renderShare() {
                return !0 !== this.props.story.getCurStoryData().can_share ? "" : i.createElement("div", {
                    className: "stories_button share _share_button",
                    onMouseOver: e => P(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: I("stories_share")
                    }),
                    onClick: this._shareButtonDidPress.bind(this)
                })
            }
            _renderRemove() {
                var e = this.props.story;
                return !e.getCurStoryData().can_remove || e.getOwnerId() < 0 ? "" : i.createElement("div", {
                    className: "stories_button remove _remove_button",
                    onMouseOver: e => P(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: I("global_delete")
                    }),
                    onClick: this._removeButtonDidPress.bind(this)
                })
            }
            _canMessage() {
                var e = this.props.story.getCurStoryData(),
                    t = e.link,
                    s = e.can_comment;
                return !(F(t) || !s || this.props.story.isLiveEnded())
            }
            _renderMessageForm() {
                var e = this.props.story;
                if (this._canMessage()) return i.createElement("div", {
                    ref: "sendForm",
                    className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                }, i.createElement("div", {
                    className: "stories_send_form_text_wrap"
                }, i.createElement("div", {
                    contentEditable: !0,
                    ref: "messageInput",
                    className: "stories_send_form_text",
                    placeholder: I("stories_answer_placeholder"),
                    onFocus: this._sendFormDidFocus.bind(this),
                    onBlur: this._sendFormDidBlur.bind(this),
                    onKeyUp: () => e._onSendFormKeyUp()
                })), i.createElement("div", {
                    className: "stories_send_form_helper"
                }, i.createElement("div", {
                    className: g("stories_send_form_buttons _emoji_wrap", {
                        shown: this.state.sendFormFocused || this.state.sendFormHasText
                    })
                }, i.createElement("div", {
                    ref: "smileButton",
                    className: "stories_send_form_button smile _emoji_btn emoji_smile",
                    onMouseEnter: e => {
                        Emoji.clearSizeCached(this.refs.smileButton), Emoji.show(this.refs.smileButton, e.nativeEvent)
                    },
                    onMouseLeave: e => Emoji.hide(this.refs.smileButton, e.nativeEvent),
                    onMouseDown: e => D(e.nativeEvent)
                }), i.createElement("div", {
                    className: g("stories_send_form_button send", {
                        active: this.state.sendFormHasText
                    }),
                    onClick: this._sendMessageButtonDidPress.bind(this)
                }))))
            }
            emojiInit() {
                !this.emojiId && this.refs.messageInput ? (this.emojiId = Emoji.init(this.refs.messageInput, {
                    ttDiff: 29,
                    noStickers: !0,
                    noStickersStore: !0,
                    ref: "stories",
                    ttWrap: this.refs.controls,
                    checkEditable: () => {
                        this.props.story.isActiveLive() && VideoChat.checkTextLen(this.refs.messageInput)
                    },
                    onSend: () => this.props.story._onAnswerSend(void 0, () => this._emojiDidKeyAction()),
                    forceUp: !0,
                    controlsCont: this.refs.sendForm,
                    onKeyAction: () => this._emojiDidKeyAction(),
                    onEmojiAdded: () => this._emojiDidKeyAction()
                }), M(this.refs.smileButton, "click", D), placeholderInit(this.refs.messageInput, {
                    editable: !0
                })) : this.emojiId && !this.refs.messageInput && (A(this.refs.smileButton, "click", D), Emoji.destroy(this.emojiId), delete this.emojiId)
            }
            _leftSideIsEmpty() {
                var e = this.props.story,
                    t = this.props.story.getCurStoryData(),
                    s = t.can_manage,
                    i = t.link,
                    r = t.can_comment,
                    o = t.narrative,
                    a = e.getReplies(),
                    n = e.getViews();
                return !(n && 0 !== parseInt(n) && !o) && (!a.count || !s) && !F(i) && !r || e.isLiveEnded()
            }
            _sendFormDidFocus() {
                var e = this.props.story;
                this.setState({
                    sendFormFocused: !0
                }), e._onSendFormFocus(), e.layer._sendNavigationStatEvents("comment_tap")
            }
            _sendFormDidBlur() {
                this.props.story._onSendFormBlur(), this.setState({
                    sendFormFocused: !1
                }), this._emojiDidKeyAction()
            }
            _emojiDidKeyAction() {
                var e = R(Emoji.editableVal(this.refs.messageInput));
                this.setState({
                    sendFormHasText: e.length > 0
                }), this.refs.messageInput.check()
            }
            _viewsButtonDidPress(e) {
                this.props.story.showFeedbackTooltip(), e.stopPropagation()
            }
            _shareButtonDidPress() {
                this.props.story.shareBox()
            }
            _removeButtonDidPress() {
                this.props.story.removeStoryBox()
            }
            _maskButtonDidPress() {
                this.props.story.sendMask()
            }
            _linkDidPress(e, t) {
                if (t) {
                    var s = t.object_type,
                        i = t.object,
                        r = t.url.match(/\/narrative(-?\d+_\d+)/);
                    if (r) {
                        e.preventDefault();
                        var o = r[1];
                        o && (this.props.story.pauseStory(), H(o, {
                            fromEl: this.props.story.wrapEl,
                            isOpenNarrativeFromFeed: !0,
                            source: "narrative_story"
                        }))
                    } else this.props.story._sendStatEvent("url_view");
                    switch (s) {
                        case "audio":
                            this.state.linkObjectAudioPlaying ? (getAudioPlayer().pause(), this.state.story.audioPlaying = !1, cur.storyLayer.resumeLayer()) : (getAudioPlayer().playAudio(i), this.state.story.audioPlaying = !0, cur.storyLayer.pauseLayer()), this.setState({
                                linkObjectAudioPlaying: !this.state.linkObjectAudioPlaying
                            }), e.preventDefault()
                    }
                }
            }
            _sendMessageButtonDidPress() {
                this.props.story._onAnswerSend(void 0, () => this._emojiDidKeyAction())
            }
        }
        var q = s("0toi"),
            $ = s("Hx9h"),
            K = s("6raB"),
            Q = s("As6E"),
            U = s("PjZB"),
            V = s("pemR");

        function z() {
            return (z = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            }).apply(this, arguments)
        }

        function G(e, t) {
            if (null == e) return {};
            var s, i, r = function(e, t) {
                if (null == e) return {};
                var s, i, r = {},
                    o = Object.keys(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || Object.prototype.propertyIsEnumerable.call(e, s) && (r[s] = e[s])
            }
            return r
        }
        var X = e => {
            var t = e.className,
                s = e.children,
                r = G(e, ["className", "children"]),
                o = Object(V.a)("Radio", t, {
                    "Radio--disabled": e.disabled
                });
            return i.createElement("label", {
                className: o
            }, i.createElement("input", z({
                className: "Radio__input Radio__visuallyHidden",
                type: "radio"
            }, r)), i.createElement("span", {
                className: "Radio__control"
            }), Boolean(s) && i.createElement("span", {
                className: "Radio__text"
            }, s))
        };
        X.defaultProps = {
            className: "",
            name: void 0,
            onChange: void 0,
            checked: void 0,
            defaultChecked: void 0,
            autoFocus: !1,
            disabled: !1,
            children: null
        };
        var Y = X,
            J = s("nAFc"),
            Z = s("t7n3");
        class ee extends i.Component {
            constructor(e) {
                super(e), this.componentDidMount = (() => {
                    var e = this.questionTextEl.current;
                    e && this.adjustQuestionTextSize(e)
                }), this.componentDidUpdate = (() => {
                    this.replyTextareaEl.current && this.replyTextareaEl.current.focus()
                }), this.render = (() => {
                    var e = this.state,
                        t = e.isOpenReplyModal,
                        s = e.replyText,
                        r = e.isOpenReportModal,
                        o = e.reportReasons,
                        a = this.props,
                        n = a.question,
                        l = a.storyUrl,
                        d = n.author,
                        h = n.canAnswer,
                        c = n.text,
                        u = Object(J.a)(c),
                        p = Object(V.a)("StoryQuestion__title", {
                            "StoryQuestion__title--free": !h
                        });
                    return i.createElement("div", {
                        className: "StoryQuestion"
                    }, i.createElement("div", {
                        className: "StoryQuestion__content"
                    }, this.renderAuthor(), i.createElement("span", {
                        className: p,
                        title: u,
                        ref: this.questionTextEl
                    }, u)), i.createElement("div", {
                        className: "StoryQuestion__controls"
                    }, h && i.createElement($.a, {
                        className: "StoryQuestion__reply",
                        appearance: n.isPublished ? "secondary" : "primary",
                        size: "s",
                        wide: !0,
                        onClick: this.openReplyModal
                    }, Object(C.b)("stories_question_reply"))), t && i.createElement(q.a, {
                        title: Object(C.b)("stories_question_reply_box_title").replace("{name}", Object(J.a)(d.nameDat)),
                        actionButtons: this.getReplyModalActions(),
                        className: "StoryQuestion__replyModal",
                        onClose: this.closeReplyModal,
                        appearance: "blue"
                    }, i.createElement("div", {
                        className: "StoryQuestion__inner"
                    }, i.createElement("textarea", {
                        ref: this.replyTextareaEl,
                        className: "StoryQuestion__textarea",
                        placeholder: Object(C.b)("stories_question_reply_placeholder"),
                        onChange: this.handleChange,
                        onKeyDown: this.handleKeyDown,
                        value: s
                    }), i.createElement("img", {
                        srcSet: l,
                        className: "StoryQuestion__image"
                    }))), r && i.createElement(q.a, {
                        title: Object(C.b)("stories_question_report_title"),
                        actionButtons: this.getReportModalActions(),
                        className: "StoryQuestionReportForm",
                        onClose: this.closeReportModal,
                        appearance: "blue"
                    }, i.createElement("div", {
                        className: "StoryQuestionReportForm__content"
                    }, i.createElement("h4", {
                        className: "StoryQuestionReportForm__title"
                    }, Object(C.b)("stories_question_report_reason")), i.createElement("div", {
                        className: "StoryQuestionReportForm__items"
                    }, !o && i.createElement(U.a, {
                        size: 15
                    }), o && o.map((e, t) => i.createElement(Y, {
                        key: e[0],
                        name: "questionReport",
                        value: e[0],
                        defaultChecked: !t,
                        onChange: () => this.handleReason(e[0])
                    }, e[1]))))))
                }), this.renderAuthor = (() => {
                    var e = this.props.question,
                        t = e.id,
                        s = e.isAnonymous,
                        r = e.author,
                        o = Object(J.a)(r.name);
                    return i.createElement("div", {
                        className: "StoryQuestion__header"
                    }, s && i.createElement("span", {
                        className: "StoryQuestion__author"
                    }, o), !s && i.createElement("a", {
                        href: r.link,
                        className: "StoryQuestion__author",
                        onClick: () => cur.storyLayer._sendNavigationStatEvents("question_go_to_author", !0, {
                            questionId: t
                        })
                    }, o), i.createElement(Q.a, {
                        position: "b",
                        align: "right",
                        trigger: "hover",
                        data: this.getActions()
                    }, i.createElement("a", {
                        className: "StoryQuestion__actions"
                    })))
                }), this.getActions = (() => {
                    var e = this.props.question,
                        t = this.state.isAuthorBan,
                        s = [{
                            text: Object(C.b)("stories_question_delete"),
                            onClick: () => this.props.removeQuestion(e)
                        }];
                    return e.canBlocked && (t ? s.push({
                        text: Object(C.b)("stories_question_author_unban"),
                        onClick: this.unbanAuthor
                    }) : s.push({
                        text: Object(C.b)("stories_question_author_ban"),
                        onClick: this.banAuthor
                    }), s.push({
                        text: Object(C.b)("stories_question_author_report"),
                        onClick: this.openReportModal
                    })), s
                }), this.adjustQuestionTextSize = (e => {
                    if (e.scrollHeight > e.offsetHeight) {
                        var t = getComputedStyle(e),
                            s = parseInt(t.fontSize) - .5,
                            i = s + 2.5,
                            r = Math.floor(parseInt(t.height) / i);
                        s > 10 && (e.setAttribute("style", `font-size: ${s}px; line-height: ${i}px; -webkit-line-clamp: ${r};`), setTimeout(() => {
                            this.adjustQuestionTextSize(e)
                        }, 0))
                    }
                }), this.getReplyModalActions = (() => {
                    var e = this.state,
                        t = e.isReplyButtonLoading,
                        s = e.replyText;
                    return [i.createElement($.a, {
                        key: "closeReplyModal",
                        appearance: "tertiary",
                        onClick: this.closeReplyModal
                    }, Object(C.b)("global_cancel")), i.createElement(K.a, {
                        key: "replySend",
                        loading: t,
                        disabled: !Object(Z.H)(s),
                        onClick: this.sendReply
                    }, Object(C.b)("stories_question_reply_send"))]
                }), this.openReplyModal = (() => {
                    this.setState({
                        isOpenReplyModal: !0
                    })
                }), this.closeReplyModal = (() => {
                    this.setState({
                        isOpenReplyModal: !1
                    })
                }), this.handleChange = (e => {
                    this.setState({
                        replyText: e.target.value
                    })
                }), this.handleKeyDown = (e => {
                    var t = this.state.replyText;
                    Object(Z.H)(t) && "keydown" === e.type && (e.ctrlKey || e.metaKey) && e.keyCode == KEY.RETURN && this.sendReply()
                }), this.resetReplyText = (() => {
                    this.setState({
                        replyText: ""
                    })
                }), this.sendReply = (() => {
                    var e = this.state.replyText,
                        t = this.props,
                        s = t.question,
                        i = t.showMessage,
                        r = s.text,
                        o = s.id,
                        a = s.ownerId,
                        n = s.storyOwnerId,
                        l = s.storyId,
                        d = s.sendHash,
                        h = `${e}\n\n🗣 ${Object(Z.I)(r)}`,
                        c = `story:${n}_${l}`;
                    ajax.post("al_im.php", {
                        act: "a_send",
                        msg: h,
                        hash: d,
                        media: c,
                        to: a
                    }, {
                        onDone: () => {
                            this.closeReplyModal(), this.resetReplyText(), i(Object(C.b)("stories_answer_sent")), cur.storyLayer._sendNavigationStatEvents("question_send_message", !0, {
                                questionId: o
                            })
                        },
                        onFail: e => (this.closeReplyModal(), this.resetReplyText(), i(e), !0),
                        showProgress: () => this.setState({
                            isReplyButtonLoading: !0
                        }),
                        hideProgress: () => this.setState({
                            isReplyButtonLoading: !1
                        })
                    })
                }), this.banAuthor = (() => {
                    var e = this.props,
                        t = e.question,
                        s = e.showMessage,
                        i = t.storyOwnerId,
                        r = t.storyId,
                        o = t.id,
                        a = t.banHash,
                        n = t.isAnonymous;
                    ajax.post("al_stories.php", {
                        act: "ban_author_question",
                        story_owner_id: i,
                        story_id: r,
                        question_id: o,
                        ban_hash: a
                    }, {
                        onDone: () => {
                            this.setState({
                                isAuthorBan: !0
                            }), s(Object(C.b)("stories_question_author_blocked"));
                            var e = "question_ban_author";
                            n && (e = "question_ban_anonymous_author"), cur.storyLayer._sendNavigationStatEvents(e, !0, {
                                questionId: o
                            })
                        },
                        onFail: e => (s(e), !0)
                    })
                }), this.unbanAuthor = (() => {
                    var e = this.props,
                        t = e.question,
                        s = e.showMessage,
                        i = t.storyOwnerId,
                        r = t.storyId,
                        o = t.id,
                        a = t.banHash;
                    ajax.post("al_stories.php", {
                        act: "unban_author_question",
                        story_owner_id: i,
                        story_id: r,
                        question_id: o,
                        ban_hash: a
                    }, {
                        onDone: () => {
                            this.setState({
                                isAuthorBan: !1
                            }), s(Object(C.b)("stories_question_author_unblocked"))
                        },
                        onFail: e => (s(e), !0)
                    })
                }), this.getReportModalActions = (() => {
                    var e = this.state,
                        t = e.isReportButtonLoading,
                        s = e.reportReasons;
                    return [i.createElement($.a, {
                        key: "closeReplyModal",
                        appearance: "tertiary",
                        onClick: this.closeReportModal
                    }, Object(C.b)("global_cancel")), i.createElement(K.a, {
                        key: "reportSend",
                        disabled: !s,
                        loading: t,
                        onClick: this.sendReport
                    }, Object(C.b)("stories_question_report_send"))]
                }), this.openReportModal = (() => {
                    this.setState({
                        isOpenReportModal: !0
                    }), this.props.getReportReasons().then(e => {
                        this.setState({
                            reportReasons: e
                        })
                    }, e => {
                        this.closeReportModal(), this.props.showMessage(e)
                    })
                }), this.closeReportModal = (() => {
                    this.setState({
                        isOpenReportModal: !1
                    })
                }), this.handleReason = (e => {
                    this.setState({
                        selectReasons: e
                    })
                }), this.sendReport = (() => {
                    var e = this.props.question,
                        t = e.storyOwnerId,
                        s = e.id,
                        i = e.reportHash;
                    ajax.post("al_stories.php", {
                        act: "question_report",
                        story_owner_id: t,
                        question_id: s,
                        reason: this.state.selectReasons,
                        report_hash: i
                    }, {
                        onDone: () => {
                            this.closeReportModal(), this.props.showMessage(Object(C.b)("stories_report_sent")), this.closeReportModal()
                        },
                        onFail: e => (this.props.showMessage(e), this.closeReportModal(), !0),
                        showProgress: () => this.setState({
                            isReportButtonLoading: !0
                        }),
                        hideProgress: () => this.setState({
                            isReportButtonLoading: !1
                        })
                    })
                }), this.state = {
                    isAuthorBan: e.question.isOwnerBlocked,
                    replyText: "",
                    isOpenReplyModal: !1,
                    isReplyButtonLoading: !1,
                    isOpenReportModal: !1,
                    isReportButtonLoading: !1,
                    reportReasons: null,
                    selectReasons: 0
                }, this.replyTextareaEl = i.createRef(), this.questionTextEl = i.createRef()
            }
        }
        var te = s("zxIV");

        function ie(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class oe extends i.Component {
            constructor(e) {
                super(e), this.componentDidMount = (() => {
                    this.scrollElement.current.addEventListener(browserFeatures.wheelEvent, this.questionsMouseWheel)
                }), this.componentWillUnmount = (() => {
                    this.positionElement.current.removeEventListener(browserFeatures.wheelEvent, this.questionsMouseWheel)
                }), this.render = (() => {
                    var e = this.state,
                        t = e.questions,
                        s = e.scrollBlockPosition;
                    return i.createElement("div", {
                        className: "stories_feedback_questions_wrap",
                        ref: this.scrollElement
                    }, i.createElement("div", {
                        className: "stories_feedback_questions_items",
                        style: {
                            transform: `translateX(-${s}px)`
                        },
                        ref: this.positionElement
                    }, t.map((e, t) => i.createElement(ee, {
                        question: e,
                        storyUrl: this.props.storyUrl,
                        showMessage: this.props.showMessage,
                        removeQuestion: this.removeQuestion,
                        getReportReasons: this.getReportReasons,
                        key: t
                    }))))
                }), this.questionsMouseWheel = (e => {
                    e.preventDefault(), this.state.questions.length <= 1 || this.setPosition(Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX)
                }), this.setPosition = (e => {
                    var t = this.positionElement.current,
                        s = this.state.scrollBlockPosition,
                        i = ie(Object(te.O)(t), 1)[0],
                        r = Math.max(0, Math.min(s + e, t.scrollWidth - i));
                    this.setState({
                        scrollBlockPosition: r
                    })
                }), this.removeQuestion = (e => {
                    var t = e.storyOwnerId,
                        s = e.storyId,
                        i = e.id,
                        r = e.removeHash;
                    ajax.post("al_stories.php", {
                        act: "remove_question",
                        story_owner_id: t,
                        story_id: s,
                        question_id: i,
                        remove_hash: r
                    }, {
                        onDone: () => {
                            this.props.sendNavigationStatEvents("question_delete", !0, {
                                questionId: i
                            }), this.setState({
                                questions: this.state.questions.filter(e => e.id !== i)
                            }), this.state.questions.length ? this.setPosition(0) : this.props.destroyCallback()
                        }
                    })
                }), this.getReportReasons = (() => new Promise((e, t) => {
                    this.reportReasons.length ? e(this.reportReasons) : ajax.post("al_stories.php", {
                        act: "question_report_box"
                    }, {
                        onDone: t => (this.reportReasons = t, e(this.reportReasons), !0),
                        onFail: e => (t(e), !0)
                    })
                })), this.state = {
                    questions: this.props.questions,
                    scrollBlockPosition: 0
                }, this.reportReasons = [], this.scrollElement = i.createRef(), this.positionElement = i.createRef()
            }
        }
        var ae = "stories_manage",
            ne = 200,
            le = {
                hashtag: 1,
                mention: 2,
                question: 3,
                place: 4,
                music: 5
            },
            de = s("/PiP"),
            he = s("pp2G"),
            ue = s("rEJs");

        function pe(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class _e extends i.Component {
            constructor(e) {
                super(e), this.componentDidMount = (() => {
                    var e = this.props,
                        t = e.sticker,
                        s = e.story;
                    t.audioRestriction && s.data.needMute && s.video && (s.video.muted = !0), this.playlist.on(this, ue.a.ADDED, () => {
                        this.props.showMessage(Object(C.b)("stories_audio_added")), this.props.playStory()
                    }), this.playlist.on(this, ue.a.REMOVED, () => {
                        this.props.showMessage(Object(C.b)("stories_audio_deleted")), this.props.playStory()
                    })
                }), this.componentWillUnmount = (() => {
                    this.playlist.off(this)
                }), this.render = (() => {
                    var e = this.props,
                        t = e.story,
                        s = e.sticker,
                        r = t.data.needMute,
                        o = s.audioRestriction;
                    return i.createElement(i.Fragment, null, i.createElement("div", {
                        className: "StorySticker",
                        style: this.getStickerStyle(),
                        onClick: this.handleClick
                    }), o && r && this.renderRestriction())
                }), this.renderRestriction = (() => {
                    var e = this.props.sticker.audioRestriction;
                    return i.createElement("div", {
                        className: "StoryRestriction"
                    }, i.createElement("div", {
                        className: "StoryRestriction__inner"
                    }, i.createElement("span", {
                        className: "StoryRestriction__title"
                    }, e.title), e.buttonUrl && i.createElement("a", {
                        className: "StoryRestriction__link",
                        href: e.buttonUrl
                    }, e.buttonText)))
                }), this.getStickerStyle = (() => {
                    var e = this.props,
                        t = e.sticker,
                        s = e.originalWidth,
                        i = e.originalHeight,
                        r = e.widthViewBox,
                        o = e.heightViewBox,
                        a = t.top,
                        n = t.left,
                        l = t.width,
                        d = t.height,
                        h = t.rotate,
                        c = r,
                        u = o;
                    return o / r > 1.77 ? c = s * o / i : u = i * r / s, {
                        top: a * u - (u - o) / 2,
                        left: n * c - (c - r) / 2,
                        width: l * c,
                        height: d * u,
                        transform: `rotate(${h}deg)`
                    }
                }), this.handleClick = (e => {
                    switch (this.props.sticker.type) {
                        case le.hashtag:
                            this.handleClickHashtag(e);
                            break;
                        case le.mention:
                            this.handleClickMention(e);
                            break;
                        case le.question:
                            this.handleClickQuestion();
                            break;
                        case le.place:
                            this.handleClickPlace(e);
                            break;
                        case le.music:
                            this.handleClickMusic(e)
                    }
                }), this.handleClickHashtag = (e => {
                    var t = this.props.sticker.hashtag.replace("#", "%23"),
                        s = Object(C.b)("stories_show_hashtag_link"),
                        r = i.createElement("a", {
                            href: `/feed?q=${t}&section=search`,
                            target: "_blank",
                            className: "StoriesTooltip__link"
                        }, s);
                    this.props.toggleTooltip(e, r)
                }), this.handleClickMention = (e => {
                    var t = pe(this.props.sticker.mention.slice(1, -1).split("|"), 1)[0],
                        s = t.startsWith("id") ? Object(C.b)("stories_go_to_profile") : Object(C.b)("stories_go_to_group"),
                        r = i.createElement("a", {
                            href: `/${t}`,
                            target: "_blank",
                            className: "StoriesTooltip__link"
                        }, s);
                    this.props.toggleTooltip(e, r)
                }), this.handleClickQuestion = (() => {
                    this.props.showQuestionModal()
                }), this.handleClickPlace = (e => {
                    var t = this.props,
                        s = t.sticker,
                        r = t.list,
                        o = s.placeId,
                        a = Object(C.b)("stories_go_to_place");
                    if (layerQueue.count() || r.includes("archive")) {
                        var n = "/feed?section=search&w=place" + o,
                            l = i.createElement("a", {
                                href: `${n}`,
                                target: "_blank",
                                className: "StoriesTooltip__link"
                            }, a);
                        this.props.toggleTooltip(e, l)
                    } else {
                        var d = i.createElement("div", {
                            className: "StoriesTooltip__link",
                            onClick: () => {
                                layerQueue.count() ? layerQueue.pop() : layerQueue.push(), Object(de.C)({
                                    w: "place" + o
                                })
                            }
                        }, a);
                        this.props.toggleTooltip(e, d)
                    }
                }), this.handleClickMusic = (e => {
                    var t = this.props,
                        s = t.story,
                        r = t.sticker,
                        o = s.data.needMute,
                        a = r.audioId,
                        n = r.audioData;
                    if (r.audioRestriction) o || he.a.showAudioRestriction(JSON.parse(n), {
                        onShow: () => {
                            this.props.pauseStory()
                        },
                        onHide: () => {
                            this.props.playStory()
                        }
                    });
                    else {
                        var l = "added" === (he.a.getAddRestoreInfo()[a] || {}).state ? "stories_audio_delete" : "stories_audio_add",
                            d = i.createElement("ul", {
                                className: "StoriesTooltipActions _audio_row",
                                "data-audio": n
                            }, i.createElement("li", {
                                className: "StoriesTooltipActions__item",
                                onClick: this.addAudio
                            }, Object(C.b)(l)), i.createElement("li", {
                                className: "StoriesTooltipActions__item",
                                onClick: this.setNext
                            }, Object(C.b)("stories_audio_next_audio")));
                        this.props.toggleTooltip(e, d, "b")
                    }
                }), this.addAudio = (e => {
                    he.a.addAudio(e.target), this.props.hideTooltip()
                }), this.setNext = (e => {
                    var t = JSON.parse(this.props.sticker.audioData || "{}"),
                        s = he.a.asObject(t);
                    this.playlist.setNext(e.target.parentNode, s, t), this.playlist.pause(), this.props.hideTooltip(), this.props.playStory()
                }), this.playlist = Object(de.k)()
            }
        }
        class ve extends i.Component {
            constructor(e) {
                super(e), this.render = (() => {
                    var e = this.props,
                        t = e.clientX,
                        s = void 0 === t ? 0 : t,
                        o = e.clientY,
                        a = void 0 === o ? 0 : o,
                        n = e.layerEl,
                        l = e.position,
                        d = Object(V.a)("StoriesTooltip", `StoriesTooltip--${l}`);
                    return i.createElement(i.Fragment, null, r.createPortal(i.createElement("div", {
                        className: d,
                        style: {
                            top: a,
                            left: s
                        }
                    }, this.props.children), n))
                })
            }
        }
        ve.defaultProps = {
            position: "t"
        };
        var me = s("0Rlc"),
            ye = s("XpgC");

        function be(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class fe extends i.Component {
            constructor(e) {
                var t;
                super(e), t = this, this.componentDidMount = (() => {
                    window.addEventListener("resize", this.handleResize)
                }), this.componentWillUnmount = (() => {
                    window.removeEventListener("resize", this.handleResize)
                }), this.componentDidUpdate = (() => {
                    this.askTextarea.current && this.askTextarea.current.focus()
                }), this.render = (() => {
                    var e = this.props,
                        t = e.story,
                        s = e.storyData,
                        r = e.author,
                        o = e.layerEl,
                        a = e.showMessage,
                        n = e.playStory,
                        l = e.pauseStory,
                        d = e.list,
                        h = s.clickable_stickers,
                        c = h.stickers,
                        u = h.original_width,
                        p = h.original_height,
                        _ = this.state,
                        v = _.widthViewBox,
                        m = _.heightViewBox,
                        y = _.showTooltip,
                        b = _.position,
                        g = _.tooltipContent,
                        f = _.showQuestionModal,
                        w = _.clientX,
                        S = _.clientY;
                    return i.createElement("div", {
                        className: "StoryStickers"
                    }, c.map((e, s) => i.createElement(_e, {
                        story: t,
                        sticker: e,
                        originalWidth: u,
                        originalHeight: p,
                        widthViewBox: v,
                        heightViewBox: m,
                        toggleTooltip: this.toggleTooltip,
                        hideTooltip: this.hideTooltip,
                        showQuestionModal: this.showQuestionModal,
                        showMessage: a,
                        playStory: n,
                        pauseStory: l,
                        list: d,
                        key: s
                    })), y && i.createElement(ve, {
                        clientX: w,
                        clientY: S,
                        layerEl: o,
                        position: b
                    }, g), f && i.createElement(q.a, {
                        title: Object(C.b)("stories_question_ask_box_title").replace("{name}", Object(J.a)(r.name_get)),
                        actionButtons: this.getQuestionModalActions(),
                        className: "StoryQuestionAskForm",
                        onClose: this.closeQuestionModal,
                        appearance: "blue"
                    }, i.createElement("div", {
                        className: "StoryQuestionAskForm__inner"
                    }, i.createElement("textarea", {
                        ref: this.askTextarea,
                        className: "StoryQuestionAskForm__textarea",
                        maxLength: "80",
                        placeholder: Object(C.b)("stories_question_ask_placeholder"),
                        onChange: this.handleChange,
                        onKeyDown: this.handleKeyDown
                    }))))
                }), this.handleResize = (() => {
                    var e = be(Object(te.O)(this.props.el), 2),
                        t = e[0],
                        s = e[1];
                    this.setState({
                        widthViewBox: t,
                        heightViewBox: s,
                        showTooltip: !1
                    })
                }), this.toggleTooltip = function(e, s) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "t";
                    e.preventDefault(), e.stopPropagation();
                    var r = e.clientX,
                        o = e.clientY,
                        a = t.props,
                        n = a.pauseStory,
                        l = a.playStory,
                        d = a.hideFeedbackTooltip,
                        h = a.sendNavigationStatEvents;
                    d(), t.setState({
                        showTooltip: !t.state.showTooltip,
                        tooltipContent: s,
                        clientX: r,
                        clientY: o,
                        position: i
                    }), setTimeout(() => {
                        t.state.showTooltip ? (h("click_on_clickable_sticker"), n()) : l()
                    }, 0)
                }, this.hideTooltip = (() => {
                    this.setState({
                        showTooltip: !1
                    })
                }), this.isShownTooltip = (() => this.state.showTooltip || this.state.showQuestionModal), this.showQuestionModal = (() => {
                    var e = this.props,
                        t = e.storyData,
                        s = e.showMessage,
                        i = e.pauseStory;
                    if (!t.can_ask) return s(Object(C.b)("stories_question_forbidden"));
                    this.setState({
                        showQuestionModal: !0
                    }), this.hideTooltip(), i()
                }), this.closeQuestionModal = (() => {
                    var e = this.props.playStory;
                    this.setState({
                        showQuestionModal: !1
                    }), e()
                }), this.handleChange = (e => {
                    this.setState({
                        questionText: e.target.value
                    })
                }), this.handleCheckBox = (() => {
                    this.setState({
                        isAnonymous: !this.state.isAnonymous
                    })
                }), this.handleKeyDown = (e => {
                    var t = this.state.questionText;
                    Object(Z.H)(t) && "keydown" === e.type && (e.ctrlKey || e.metaKey) && e.keyCode == KEY.RETURN && this.sendQuestion()
                }), this.resetAskText = (() => {
                    this.setState({
                        questionText: ""
                    })
                }), this.getQuestionModalActions = (() => {
                    var e, t = this.props,
                        s = t.storyData,
                        r = t.author,
                        o = s.can_ask_anonymous,
                        a = this.state,
                        n = a.isQuestionButtonLoading,
                        l = a.questionText,
                        d = a.isAnonymous;
                    return e = o ? clean(Object(C.b)("stories_question_anonymous_info").replace("{name}", Object(J.a)(r.firstName))) : Object(C.b)("stories_question_cannot_anonymous"), i.createElement("div", {
                        className: "StoryQuestionAskForm__footer"
                    }, i.createElement("div", {
                        className: "StoryQuestionAskForm__cell"
                    }, i.createElement(me.a, {
                        key: "c",
                        checked: d,
                        onChange: this.handleCheckBox,
                        disabled: !o
                    }, Object(C.b)("stories_question_anonymous_checkbox")), i.createElement(ye.a, {
                        text: e,
                        position: "b",
                        align: "left",
                        maxWidth: 284,
                        appearance: "light"
                    }, i.createElement("span", {
                        className: "StoryQuestionAskForm__info"
                    }))), i.createElement("div", {
                        className: "StoryQuestionAskForm__cell"
                    }, i.createElement($.a, {
                        key: "b",
                        appearance: "tertiary",
                        onClick: this.closeQuestionModal
                    }, Object(C.b)("global_cancel")), i.createElement(K.a, {
                        key: "s",
                        loading: n,
                        disabled: !Object(Z.H)(l),
                        onClick: this.sendQuestion
                    }, Object(C.b)("stories_question_reply_send"))))
                }), this.sendQuestion = (() => {
                    var e = this.state,
                        t = e.questionText,
                        s = e.isAnonymous,
                        i = this.props,
                        r = i.showMessage,
                        o = i.storyData,
                        a = i.author,
                        n = i.sendNavigationStatEvents,
                        l = o.raw_id,
                        d = o.askQuestionHash,
                        h = o.accessKey,
                        c = be(l.split("_"), 2),
                        u = c[0],
                        p = c[1];
                    ajax.post("al_stories.php", {
                        act: "ask_question",
                        story_owner_id: u,
                        story_id: p,
                        question_text: t,
                        is_anonymous: +s,
                        hash: d,
                        access_key: h
                    }, {
                        onDone: () => {
                            this.closeQuestionModal(), this.resetAskText(), r(Object(C.b)("stories_question_sent").replace("{name}", a.first_name_ins)), n(s ? "question_reply_anonymous" : "question_reply")
                        },
                        onFail: e => (this.closeQuestionModal(), this.resetAskText(), r(e), !0),
                        showProgress: () => this.setState({
                            isQuestionButtonLoading: !0
                        }),
                        hideProgress: () => this.setState({
                            isQuestionButtonLoading: !1
                        })
                    })
                });
                var s = be(Object(te.O)(this.props.el), 2),
                    r = s[0],
                    o = s[1];
                this.askTextarea = i.createRef(), this.state = {
                    widthViewBox: r,
                    heightViewBox: o,
                    clientX: 0,
                    clientY: 0,
                    showTooltip: !1,
                    tooltipContent: "",
                    position: "t",
                    showQuestionModal: !1,
                    isQuestionButtonLoading: !1,
                    isAnonymous: !1,
                    questionText: ""
                }
            }
        }
        class we {
            constructor(e, t) {
                this.data = e, this.opts = t, this.paused = !0, this.loaded = !1, this.elems = {}, this.startTs = 0;
                var s = e.is_expired,
                    i = e.is_deleted,
                    r = e.can_view_deleted,
                    o = e.is_private,
                    a = e.narrative;
                r || (s ? this._error("expired") : i ? a ? this._error("deleted-narrative") : this._error("deleted") : o && (a ? this._error("private-narrative") : this._error("private")), (s || i || o) && (this.failed = !0))
            }
            render() {
                this._isFailed() && this.isNarrativeMetaStory || (this.longLoadingTimer = setTimeout(() => {
                    this.isLoaded() || this.opts.onLongLoading()
                }, 1e3), this.opts.onLoadingStart())
            }
            renderNarrativeCover() {
                var e = this.data,
                    t = e.narrative,
                    s = e.photo_url,
                    i = t && t.views ? winToUtf(` · ${t.views}`) : "";
                return this.NarrativeCover = se(`\n      <div class="stories_narrative_cover">\n        <div class="stories_narrative_cover_photo" id="stories_narrative_cover_photo" style="background-image: url(${data})"></div>\n        <div class="stories_narrative_cover__info">\n          <span class="stories_narrative_cover__label">${getLang("global_type_narrative")}</span>\n          <span class="stories_narrative_cover__views">${i}</span>\n        </div>\n        <div class="stories_narrative_cover__title">${t.title}</div>\n        <div class="stories_narrative_cover__author">${t.owner_name}</div>\n      </div>\n    `), _(s).then(e => {
                    var t = geByClass1("stories_narrative_cover_photo");
                    t && setStyle(t, "backgroundImage", "url(" + e + ")")
                }), this.NarrativeCover
            }
            renderNarrativeMetaStory() {
                var e = !(!cur.storyLayer || !cur.storyLayer.isOpenNarrativeFromFeed),
                    t = cur.storyLayer.list,
                    s = `${t}_recommendations`,
                    i = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    r = ce("div", {
                        className: "narrative-meta-story"
                    }),
                    o = ce("div", {
                        className: "narrative-meta-story__buttons"
                    });
                o.appendChild(this.renderNarrativeButton("replay", () => {
                    cur.storyLayer._sendNavigationStatEvents("narrative_replay", !1), cur.storyLayer.changeStory(0)
                })), e && o.appendChild(this.renderNarrativeButton("go_to_stories", () => {
                    cur.storyLayer._sendNavigationStatEvents("narrative_go_to_stories", !1), cur.storyLayer.nextStory()
                })), r.appendChild(o);
                var a = Stories._getList(s);
                return t.match(/narrative-?\d+_\d+$/) && a && (this.coverItems = a.map(e => e.narrative_cover), this.coverCount = this.coverItems ? this.coverItems.length : 0, this.coverRowsCount = Math.ceil(this.coverCount / 3), this.elems.recBlock = ce("div", {
                    className: "narrative-meta-story__rec"
                }), this.elems.recInner = ce("div", {
                    className: "narrative-meta-story__rec-inner"
                }), this.elems.recItems = ce("div", {
                    className: "narrative-meta-story__rec-items"
                }), this.elems.recTitle = ce("div", {
                    className: "narrative-meta-story__rec-title",
                    innerHTML: getLang("stories_narrative_more")
                }), this.elemOffset = 0, 1 === this.coverRowsCount ? this.elemOffset = 26.4 : this.coverRowsCount > 1 && (this.elemOffset = 26.4 * 1.5), this.scrollOffset = i / 100 * this.elemOffset + 53, setStyle(o, {
                    paddingBottom: `${this.elemOffset}vh`
                }), setStyle(this.elems.recTitle, {
                    marginTop: `calc(100vh - ${this.elemOffset}vh - 53px - 70px)`
                }), this.coverItems.forEach(e => {
                    var t = ce("span", {
                            className: "narrative-preview",
                            onclick: t => {
                                var i = t.target;
                                Stories.show(`${cur.storyLayer.getBlockKey(e)}/${s}`, {
                                    fromEl: i,
                                    narrativeId: e.narrative.id,
                                    source: "narrative_recommendations"
                                })
                            }
                        }, {
                            backgroundImage: `url('${e.preview_url}')`
                        }),
                        i = ce("div", {
                            className: "narrative-preview__inner",
                            innerHTML: `\n            <a href="${a[0].author.href}" class="narrative-preview__author" style="background-image: url('${a[0].author.photo}')"></a>\n            <span class="narrative-preview__title">${e.narrative.title}</span>\n          `
                        }, {
                            backgroundImage: `url('${e.small_preview}')`
                        });
                    t.appendChild(i), this.elems.recItems.appendChild(t)
                }), addEvent(this.elems.recBlock, "scroll wheel touchmove", this.handleRecommendationsScroll.bind(this)), this.elems.recInner.appendChild(this.elems.recTitle), this.elems.recInner.appendChild(this.elems.recItems), this.elems.recBlock.appendChild(this.elems.recInner), r.appendChild(this.elems.recBlock)), r
            }
            renderNarrativeButton(e, t) {
                if (!e) return "";
                var s = "",
                    i = "";
                switch (t = isFunction(t) ? t : () => {}, e) {
                    case "replay":
                        s = "replay", i = getLang("stories_narrative_repeat_bottom");
                        break;
                    case "go_to_stories":
                        s = "back", i = getLang("stories_narrative_back_bottom")
                }
                var r = ce("div", {
                        className: `narrative-meta-button__circle narrative-meta-button__circle_${s}`,
                        onclick: t
                    }),
                    o = ce("div", {
                        className: "narrative-meta-button__text",
                        innerHTML: i
                    }),
                    a = ce("div", {
                        className: "narrative-meta-button"
                    });
                return a.appendChild(r), a.appendChild(o), a
            }
            handleRecommendationsScroll() {
                var e = Math.min(this.elems.recInner.scrollTop / (this.scrollOffset / 100), 70) / 100;
                setStyle(this.elems.recBlock, {
                    backgroundColor: `rgba(0, 0, 0, ${e})`
                }), this.elems.recInner.scrollTop ? (addClass(this.elems.recBlock, "scroll"), this.pause()) : (this.play(), removeClass(this.elems.recBlock, "scroll"))
            }
            getContainer() {}
            play() {
                this.paused = !1, this.isLoaded() && this.opts.onPlay()
            }
            pause() {
                this.paused = !0, this.opts.onPause()
            }
            setCurrentTime() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
            }
            destroy() {
                removeEvent(this.elems.recBlock), clearTimeout(this.longLoadingTimer)
            }
            isPaused() {
                return this.paused
            }
            isLoaded() {
                return this.loaded
            }
            getCurrentTime() {
                return 0
            }
            getDuration() {
                return 0
            }
            getId() {
                return this.data.raw_id
            }
            getTrackCode() {
                return this.data.track_code
            }
            getDate() {
                return this.data.date
            }
            getViews() {
                return this.data.views
            }
            getReplies() {
                return this.data.answers ? this.data.answers : {
                    count: "",
                    count_str: "",
                    users: []
                }
            }
            setViews(e) {
                this.data.views = e
            }
            setReplies(e) {
                this.data.answers = e
            }
            _onCanPlay() {
                if (clearTimeout(this.longLoadingTimer), this.loaded = !0, this.opts.onLoadingEnd(), this.startTs = Date.now(), !this.isPaused()) {
                    var e = document.visibilityState;
                    if (e && "visible" !== e) return;
                    this.play()
                }
            }
            _loadingError() {
                this._error("load")
            }
            _error(e) {
                clearTimeout(this.longLoadingTimer), this.opts.onError(e)
            }
            _isFailed() {
                return this.failed
            }
        }
        var Se = 5e3;
        class ke extends we {
            constructor(e, t, s) {
                super(e, t, s), this.wrapEl = s, this.videoRaw = `${this.data.video.owner_id}_${this.data.video.video_id}`
            }
            render() {
                super.render(), this.el = ce("div", {
                    className: "stories_live"
                });
                var e = ce("div", {
                    className: "stories_live_player"
                }, {
                    height: "100%",
                    width: "100%"
                });
                return this.el.appendChild(e), this.chatEl = se('\n      <div class="stories_live_chat">\n        <div class="mv_chat_messages_wrap">\n          <div class="mv_chat_messages"></div>\n        </div>\n        <div class="mv_chat_stickers_wrap"></div>\n      </div>\n    '), this.el.appendChild(this.chatEl), window.mvcur && window.mvcur.player && Videoview.hide(!1, !0), setTimeout(() => {
                    showInlineVideo(this.videoRaw, "", {
                        autoplay: 1,
                        module: "story",
                        onLoaded: () => {
                            this._onPlayerInited()
                        }
                    }, !1, e)
                }), this.el
            }
            destroy() {
                super.destroy(), this._resetTimer(), window.mvcur = {}, this.player && (this.player.destroy(), VideoChat.destroy()), cur.storyLayer._sendNavigationStatEvents("live_player_close", !1), delete this.el
            }
            getContainer() {
                return this.el || this.render()
            }
            onLiveEnded() {
                this.liveEnded = !0, hide(geByClass1("_error_msg", geByClass1("videoplayer_error")));
                var e = this.mvData.oid < 0 ? getLang("stories_live_ended_desc_club") : langSex(this.mvData.author_sex, getLang("stories_live_ended_desc_user", "raw"));
                e = e.replace("{name}", this.mvData.md_author);
                var t = this.mvData.oid < 0 ? getLang("stories_live_ended_open_club") : getLang("stories_live_ended_open_user");
                hide(this.chatEl), hide(domByClass(this.player.ui.thumb, "videoplayer_big_play_btn"));
                var s = cur.storyLayer.storiesBlocks.length > 1;
                this.el.appendChild(se(`\n    <div class="stories_live_end">\n      <div class="stories_live_end_author_photo" style="background-image: url(${this.mvData.author_photo})"></div>\n      <div class="stories_live_end_title">${getLang("stories_live_ended_title")}</div>\n      <div class="stories_live_end_desc">${e}</div>\n      <a href="${this.mvData.author_href}" class="stories_live_end_open_owner">${t}</a>\n      <div class="stories_live_end_timer" onclick="cur.storyLayer.nextStory()" style="${s?"":"display: none;"}">\n        <canvas class="_timer_canvas" width="100" height="100"></canvas>\n        <div class="stories_live_end_timer_text">${getLang("stories_live_ended_watch_next")}</div>\n      </div>\n    </div>\n    `)), s && setTimeout(() => {
                    this._startTimer()
                })
            }
            pause() {}
            play() {
                this.player && !this.liveEnded && (super.play(), this.player && this.player.play())
            }
            sendMessage(e, t) {
                e.length > mvcur.maxChatReplyLength || (ajax.post("al_video.php?act=post_comment", {
                    comment: e,
                    video: this.videoRaw,
                    hash: this.mvData.hash,
                    videoviewer_chat: 1
                }), cur.storyLayer.activeStory._onAnswerSended(t))
            }
            volumeUpdate() {
                this.player.setVolume(y())
            }
            _onCanPlay() {
                super._onCanPlay(), setStyle(this.el, "opacity", 1)
            }
            _onPlayerInited() {
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
            }
            _startTimer() {
                if (window.CanvasRenderingContext2D) {
                    var e = domByClass(this.el, "_timer_canvas"),
                        t = e.getContext("2d");
                    t.lineWidth = 6, t.lineCap = "round", t.strokeStyle = "#fff";
                    var s = Date.now(),
                        i = () => {
                            var e = (Date.now() - s) / Se;
                            e < 1 ? (t.clearRect(0, 0, 100, 100), t.beginPath(), t.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), t.stroke(), this._nextTO = setTimeout(i, 16)) : cur.storyLayer.nextStory()
                        };
                    show(e), this.timerInProgress = !0, i()
                }
            }
            _resetTimer() {
                window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this.el, "_timer_canvas")))
            }
        }
        class Ee extends we {
            constructor(e, t) {
                super(e, t), this.isFirstChunkLoaded = !1
            }
            render() {
                if (super.render(), this.video) return this.video;
                var e = this.data.video_url;
                return this.video = ce("video", {
                    className: "stories_video",
                    autoplay: !1,
                    volume: getAudioPlayer().getVolume()
                }), addEvent(this.video, "error", () => {
                    this._loadingError()
                }), this._isFailed() ? this.video : (this.loaded && (this.video.currentTime = 0), addEvent(this.video, "canplay", this._onCanPlay.bind(this)), this.video.src = e, this.volumeUpdate(), this.video)
            }
            getContainer() {
                return this.video || this.render()
            }
            getImage() {
                var e = getSize(this.video),
                    t = ce("canvas", {
                        width: e[0],
                        height: e[1]
                    });
                return t.getContext("2d").drawImage(this.video, 0, 0, e[0], e[1]), t.toDataURL()
            }
            destroy() {
                super.destroy(), removeEvent(this.video), delete this.video
            }
            play() {
                if (super.play(), this.loaded && this.video) {
                    var e = this.video.play();
                    void 0 !== e && e.catch(e => {
                        this.opts.onAutoPlayFail()
                    })
                }
            }
            pause() {
                super.pause(), this.video && this.video.pause()
            }
            setCurrentTime() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.loaded && (this.video.currentTime = e)
            }
            getCurrentTime() {
                return 1e3 * this.video.currentTime
            }
            getDuration() {
                return 1e3 * this.video.duration
            }
            _onCanPlay(e) {
                super._onCanPlay(e), this.isFirstChunkLoaded || (this.isFirstChunkLoaded = !0, cur.storyLayer._sendNavigationStatEvents("view_story", !0, {
                    preloading_duration: cur.storyLayer.activeStory && cur.storyLayer.activeStory.loadingTime || 0
                })), setStyle(this.video, "opacity", 1)
            }
            volumeUpdate() {
                this.video.volume = y()
            }
        }
        var Oe = 5e3;
        class je extends we {
            constructor(e, t) {
                super(e, t), this.pauseTime = 0
            }
            render() {
                if (super.render(), this.photo) return this.photo;
                var e = this.data,
                    t = e.photo_url,
                    s = e.narrative;
                return this.photo = ce("div", {
                    className: "stories_photo"
                }), this._isFailed() ? this.photo : (_(t).then(e => {
                    this.photo && (s && s.is_cover ? addClass(this.photo, "stories_narrative_cover_blur") : setStyle(this.photo, "backgroundImage", "url(" + e + ")"), this._onCanPlay())
                }).catch(() => {
                    this._loadingError()
                }), this.photo)
            }
            getContainer() {
                return this.isNarrativeMetaStory || this.photo || this.render()
            }
            destroy() {
                super.destroy(), delete this.photo
            }
            play() {
                (0 === this.startTs || this.pauseTime > 0) && (this.startTs = Date.now() - this.pauseTime, this.pauseTime = 0), super.play()
            }
            pause() {
                this.isPaused() || (super.pause(), this.pauseTime = this.getCurrentTime())
            }
            setCurrentTime() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.startTs = Date.now() + e, this.isPaused() && (this.pauseTime = e)
            }
            getCurrentTime() {
                return Date.now() - this.startTs || 0
            }
            getDuration() {
                return Oe
            }
            _onCanPlay() {
                super._onCanPlay(), cur.storyLayer._sendNavigationStatEvents("view_story", !0, {
                    preloading_duration: cur.storyLayer.activeStory && cur.storyLayer.activeStory.loadingTime || 0
                }), setStyle(this.photo, "opacity", 1)
            }
        }
        var Te = s("v+DW"),
            Ce = s("Egk5"),
            Le = s("4+be"),
            xe = s("EasH"),
            Be = s("kcIO");

        function Ne(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        class Ie {
            constructor(e, t) {
                this.data = e, this.opts = t, this.id = t.id, this.isActive = !1, this.story = !1, this.pressedStory = null, this.index = 0, this.preloadedStories = {}, this.layer = t.layer, this.longTapTimer
            }
            destroy() {
                this._destroyStory(), Object(Ce.h)(Object(te.I)("stories_item_cont", this.contWrap)), Object(Ce.h)(Object(te.I)("stories_reply_to", this.replyToWrap)), Object(Ce.h)(this.shareButton), delete this.shareButton, Object(Ce.h)(this.followBtn), delete this.followBtn, Object(Ce.h)(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                for (var e = Object(te.H)("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) Object(Ce.h)(e[t]);
                Object(Ce.h)(this.viewsButton), Object(Ce.h)(Object(te.I)("stories_feedback_close", this.wrapEl)), Object(Ce.h)(Object(te.I)("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.descEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                for (var s = !1, i = 0; i < this.data.items.length; i++)
                    if (this.data.items[i].unread) {
                        s = !0;
                        break
                    }
                var r = O();
                if (!s && r && r.activeStory) {
                    var o = Object(te.C)("#feed_story_" + this.layer.getBlockKey(this.data), r.activeStory.wrapEl)[0];
                    Object(te.ib)(o, "story_feed_new_item"), Object(te.ib)(o, "story_feed_new_item_promo")
                }
            }
            _destroyTimeLine() {
                for (var e = Object(te.H)("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) Object(Ce.h)(e[t])
            }
            getOwnerId() {
                return this.data.author.id
            }
            getIndex() {
                return this.index
            }
            isLastStory() {
                return this.index >= this.data.items.length - 1
            }
            getRawId() {
                return !!this.story && this.story.getId()
            }
            getTrackCode() {
                return !!this.story && this.story.getTrackCode()
            }
            getReadHash() {
                return this.data.read_hash
            }
            getType() {
                return this.data.type
            }
            getItems() {
                return this.data.items
            }
            getItemsLength() {
                return this.getItems().length
            }
            render() {
                this.wrapEl = ce("div", {
                    className: "stories_item"
                }), this.contWrap = ce("div", {
                    className: "stories_item_cont_wrap"
                }), this.contStickers = ce("div", {
                    className: "stories_item_cont_sticker"
                }), this.contWrap.appendChild(this.contStickers), this.wrapEl.appendChild(this.contWrap);
                var e = ce("div", {
                    className: "stories_item_cont"
                });
                return Object(Ce.b)(e, "mousedown", this._onMouseDownHandle.bind(this)), Object(Ce.b)(e, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(e), e.appendChild(this._renderAuthor()), this.contWrap.appendChild(ce("div", {
                    className: "stories_bottom_wrap"
                })), this.contWrap.appendChild(this._renderPreview()), this.indexToUnread(), cur.noStoriesBack || (this.backButton = ce("div", {
                    className: "stories_item_back"
                }), e.appendChild(this.backButton)), this.replyToWrap = e.appendChild(ce("div", {
                    className: "stories_reply_to_wrap"
                })), this.inlineLoader = e.appendChild(ce("div", {
                    className: "stories_inline_loader",
                    innerHTML: getProgressHtml()
                })), this.contWrap.appendChild(ce("div", {
                    className: "stories_play_button video_thumb_play",
                    onclick: () => {
                        this.story.play()
                    }
                })), this.isActiveLive() ? Object(te.a)(this.wrapEl, "live") : this._initTimeLine(), Object(te.xb)(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
            }
            updateBottom(e) {
                var t = Object(te.I)("stories_bottom_wrap", this.wrapEl);
                !this.isActive || e || this.story.isNarrativeMetaStory ? (r.unmountComponentAtNode(t), val(t, "")) : r.render(i.createElement(W, {
                    story: this
                }), t)
            }
            _canForceDeleteStories() {
                return this.data.moder_remove_hash && !this.data.items[0].is_deleted
            }
            _initTimeLine() {
                this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl)), Object(te.I)("stories_item_cont", this.contWrap).appendChild(this._renderTimeLine())
            }
            _isActionsShown() {
                var e = domClosest("_ui_menu_wrap", this.wrapEl);
                return hasClass(e, "shown")
            }
            _renderPreview() {
                return Object(te.nb)('<div class="stories_preview"></div>')
            }
            _renderMessage(e) {
                return Object(te.nb)(`<div class="stories_message">\n  <div class="stories_message_text">${e}</div>\n</div>`)
            }
            _showMessage(e) {
                re(Object(te.I)("stories_message", this.contWrap));
                var t = this._renderMessage(e);
                return this.contWrap.appendChild(t), clearTimeout(this.showMessageTimer), new Promise(e => {
                    this.showMessageTimer = setTimeout(() => {
                        this.contWrap.removeChild(t), e()
                    }, 3e3)
                })
            }
            _setPreview(e, t) {
                var s = this.index,
                    i = this.data.items[s].preview_url;
                i !== this.curPreviewUrl && i && (t = t || (() => {}), e = e || Object(te.I)("stories_preview", this.contWrap), _(i).then(r => {
                    s === this.index && i !== this.curPreviewUrl && (this.curPreviewUrl = i, Object(te.sb)(e, "backgroundImage", "url(" + r + ")")), Object(te.sb)(e, "opacity", 1), setTimeout(t, 0)
                }))
            }
            getPreview() {
                return this.data.items[this.index].preview_url
            }
            _renderAuthor() {
                var e, t = this.data.author,
                    s = t.photo,
                    i = t.href,
                    r = t.name,
                    o = t.verify,
                    a = this.data && this.data.items[0] && this.data.items[0].narrative,
                    n = "_self";
                (this.layer.list.includes("place") && (n = "_blank"), this.data.is_narrative && a && !a.is_cover) ? e = `\n      <div>\n          <div class="stories_narrative_title">${a.title}</div>\n          <span class="stories_narrative_author"><a href="${i}" target="${n}" class="stories_narrative_author_link">${r}</a> · ${Object(Le.d)("global_type_narrative")}</span>\n      </div>`: e = `\n      <div class="stories_author_cont">\n        ${`<a href="${i}" class="stories_author_photo_wrap"><img src="${s}" class="stories_author_photo" /></a>`}\n        <a href="${i}" target="${n}" class="stories_author_name"><span>${r}</span></a>\n        ${o||""}\n        <div class="stories_desc"></div>\n      </div>`;
                var l = Object(te.nb)(`\n      <div class="stories_author">\n        <div class="stories_author_cont_wrap">\n          <div class="stories_author_inner">${e}</div>\n          <div class="stories_author_buttons"></div>\n         </div>\n      </div>\n    `);
                return Object(Ce.b)(l, "click", e => {
                    Object(te.p)("a", e.target) && this.layer._sendNavigationStatEvents("go_to_author")
                }), !0 === this.data.hide_owner && val(Object(te.I)("stories_author_cont", l), ""), Object(te.xb)(this.wrapEl, "hide_owner", !0 === this.data.hide_owner), this.descEl = Object(te.I)("stories_desc", l), this.authorButtons = Object(te.I)("stories_author_buttons", l), l
            }
            _renderFollowButton() {
                return this.followBtn = ce("div", {
                    className: "stories_author_button stories_follow"
                }), Object(Ce.b)(this.followBtn, "click", this._onFollowBtnClick.bind(this)), Object(Ce.b)(this.followBtn, "mouseover", () => {
                    var e = hasClass(this.followBtn, "followed") ? Object(Le.d)("stories_unfollow") : Object(Le.d)("stories_follow");
                    showTooltip(this.followBtn, {
                        black: 1,
                        center: 1,
                        shift: [0, 5, 0],
                        text: e,
                        appendEl: this.contWrap
                    })
                }), this.followBtn
            }
            _renderTimeLine() {
                return this.timeLineEl = ce("div", {
                    className: "stories_time_line"
                }), this.data.items.map((e, t) => {
                    var s = ce("div", {
                        className: "stories_time_line_item"
                    });
                    Object(Ce.b)(s, "click", () => {
                        this.layer._sendNavigationStatEvents("go_to_story_click"), this.changeStory(t)
                    });
                    var i = ce("div", {
                        className: "stories_time_line_item_cont"
                    });
                    i.appendChild(ce("div", {
                        className: "stories_time_line_item_cont_active"
                    })), s.appendChild(i), this.timeLineEl.appendChild(s)
                }), this.timeLineEl
            }
            isPaused() {
                return !this.story || this.story.isPaused()
            }
            isLoaded() {
                return !this.story || this.story.isLoaded()
            }
            _onMouseDownHandle(e) {
                this.pressedStory = e.target, this.isActive && (this.isLocked() || !hasClass(e.target, "stories_item_cont") && !hasClass(e.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.longTapTimer = setTimeout(this._longTapHandle.bind(this), ne)))
            }
            _onMouseUpHandle(e) {
                clearTimeout(this.longTapTimer);
                var t = this.downTs;
                if (delete this.downTs, e.target === this.pressedStory) {
                    this.pressedStory = null;
                    var s = !(vkNow() - t < ne && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                    if (this.isActive && hasClass(e.target, "stories_item_back") && !s && !this.isTooltipOpened()) return this.prevStory();
                    if (hasClass(e.target, "stories_item_cont") || hasClass(e.target, "stories_item_back"))
                        if (this._feedbackTTShown && this.hideFeedbackTooltip(), Object(te.ib)(this.wrapEl, "paused"), this.isTooltipOpened()) this._hideTooltip();
                        else {
                            if (!this.isActive) {
                                this.id >= this.layer.activeStory.id && this.layer._markStoryAsSkipped();
                                var i = this.layer.storiesBlocks;
                                return i.indexOf(this.layer.getBlockKey(this)) > i.indexOf(this.layer.blockKey) ? this.layer._sendNavigationStatEvents("go_to_next_author") : this.layer._sendNavigationStatEvents("go_to_previous_author"), void this.opts.onSelect(this)
                            }
                            s ? this.isPaused() && this.playStory(!1, !!t) : this._onPlayEnd()
                        }
                }
            }
            _longTapHandle() {
                this.story && this.story.pause(), Object(te.a)(this.wrapEl, "paused"), this.isTooltipOpened() || this.layer._sendNavigationStatEvents("pause_long_tap")
            }
            isLocked() {
                return !!(this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply") || Object(Be.b)() && "stories" !== Object(Be.b)().wkRaw)
            }
            autoResumeStory() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.audioPlaying || this.story && this.story.isNarrativeMetaStory || this.isTooltipOpened() || this.playStory(!1, e)
            }
            playStory() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 ? arguments[1] : void 0;
                this.isLocked() || (Object(te.ib)(this.wrapEl, "paused"), hide(boxLayerBG), hide(boxLayerWrap), this.story && !e || this._initStory(), this.story.play(), t && this.layer._sendNavigationStatEvents("resume_release"), delete this.downTs)
            }
            pauseStory(e) {
                this.story && (this.isPaused() || (e && Object(te.a)(this.wrapEl, "paused"), this.story.pause()))
            }
            changeStory(e) {
                if (this.index !== e && !this.formLocked) {
                    this._destroyStory(), this.index = e, this._hideTooltip();
                    var t = this.getCurStoryData();
                    t.narrative && t.narrative.is_cover ? this._setPreview(!1, this.playStory.bind(this)) : (this._setPreview(), this.playStory())
                }
            }
            getWrap() {
                return this.wrapEl
            }
            stop() {
                this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(Object(te.I)("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), Object(te.ib)(this.wrapEl, "autoplay_failed")
            }
            getCurStoryData() {
                var e = this.data.items[this.index];
                return e || {}
            }
            isActiveLive() {
                return "live" === this.getCurStoryData().type
            }
            isLiveEnded() {
                return this.isActiveLive() && this.story.liveEnded
            }
            _initStory() {
                var e = this.getCurStoryData(),
                    t = e.type;
                this.story && this._destroyStory();
                var s = {
                    onLoadingStart: this._onLoadingStart.bind(this),
                    onLoadingEnd: this._onLoadingEnd.bind(this),
                    onPlay: this._onPlay.bind(this),
                    onPause: this._onPause.bind(this),
                    onError: this._showError.bind(this),
                    onLongLoading: this._showLoader.bind(this),
                    onAutoPlayFail: this._onAutoPlayFail.bind(this)
                };
                if ("live" === t) this.story = new ke(e, s, this.wrapEl);
                else {
                    "video" === t ? (this.story = new Ee(e, s), Object(te.a)(this.wrapEl, "video")) : (this.story = new je(e, s), this.opts.onVideoEnd(), Object(te.ib)(this.wrapEl, "video"));
                    var o = this.story.getDate();
                    e.isPromo ? o = e.promoCaption : e.isAds && (o = Object(Le.d)("stories_is_ad")), val(this.descEl, o), this.fillTimeLine()
                }
                "live" !== t && "video" !== t || y() > 0 && this.opts.onVideoPlay();
                this.opts.onStartStory(), Object(te.xb)(this.wrapEl, "stories_can_comment", !0 === e.can_comment), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), !this.data.author.can_follow || this.data.is_promo || this.isActiveLive() || this.authorButtons.appendChild(this._renderFollowButton()), this.story.isNarrativeMetaStory = e.isNarrativeMetaStory, this._destroyFeedBackTT(), this.story.isNarrativeMetaStory || (this.updateBottom(), this.contWrap.appendChild(this.story.render())), e.clickable_stickers && (this.stickerLayers = r.render(i.createElement(fe, {
                    story: this.story,
                    storyData: e,
                    author: this.data.author,
                    showMessage: this._showMessage.bind(this),
                    playStory: this.playStory.bind(this),
                    pauseStory: this.pauseStory.bind(this),
                    hideFeedbackTooltip: this.hideFeedbackTooltip.bind(this),
                    sendNavigationStatEvents: this.layer._sendNavigationStatEvents.bind(this.layer),
                    list: this.layer.list,
                    layerEl: this.layer.layerEl,
                    el: this.contWrap
                }), this.contStickers)), this.story.data && this.story.data.narrative && this.story.data.narrative.is_cover && (this.contWrap.appendChild(this.story.renderNarrativeCover()), Object(Ce.b)(Object(te.I)("stories_narrative_cover", this.contWrap), "click", e => {
                    this._showTooltip(e, this._createNarrativeTooltipLink())
                })), this.story.isNarrativeMetaStory && !this.story.failed && (re(Object(te.I)("stories_photo", this.contWrap)), re(Object(te.I)("stories_video", this.contWrap)), Object(te.a)(this.contWrap, "stories_item_cont_wrap_meta_story"), this.contWrap.appendChild(this.story.renderNarrativeMetaStory()), this.story._onCanPlay())
            }
            _createNarrativeTooltipLink() {
                return ce("div", {
                    className: "StoriesTooltip__link",
                    innerHTML: Object(Le.d)("stories_narrative_show"),
                    onclick: () => {
                        this._hideTooltip(!0), showNarrative(`${this.story.data.narrative.owner_id}_${this.story.data.narrative.id}`, {
                            isOpenNarrativeFromFeed: !0,
                            source: "narrative_story"
                        })
                    }
                })
            }
            isTooltipOpened() {
                return this.tooltip || this.stickerLayers && this.stickerLayers.isShownTooltip()
            }
            _showTooltip(e, t) {
                if (this.isTooltipOpened()) this._hideTooltip();
                else {
                    this.tooltip = ce("div", {
                        className: "StoriesTooltip"
                    }, {
                        top: 0,
                        left: 0
                    }), this.tooltip.appendChild(t), this.layer.layerEl.appendChild(this.tooltip);
                    var s = e.clientX,
                        i = void 0 === s ? 0 : s,
                        r = e.clientY,
                        o = void 0 === r ? 0 : r;
                    Object(te.sb)(this.tooltip, {
                        top: o,
                        left: i
                    }), this.pauseStory()
                }
            }
            _hideTooltip(e) {
                this.isTooltipOpened() && (this.stickerLayers && this.stickerLayers.hideTooltip(), this.tooltip && (this.layer.layerEl.removeChild(this.tooltip), delete this.tooltip), e || this.playStory())
            }
            getReplies() {
                return this.story.getReplies()
            }
            getViews() {
                return this.story.getViews()
            }
            indexToUnread() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = this.data.items,
                    s = 0;
                for (var i in t)
                    if (t[i].unread && !this.layer._hasContext("all")) {
                        s = intval(i);
                        break
                    }
                if (e) return s;
                this.index = s, this._setPreview()
            }
            indexToStoryById(e) {
                var t = this.data.items,
                    s = -1;
                for (var i in t)
                    if (t[i].raw_id === e) {
                        s = intval(i);
                        break
                    }
                this.layer._hasContext("all") && (s = 0), s > -1 ? (this.index = s, this._setPreview()) : this.indexToUnread()
            }
            fillTimeLine() {
                var e = this.timeLineEl;
                if (e)
                    for (var t = 0; t < e.children.length; t++) {
                        var s = Object(te.I)("stories_time_line_item_cont_active", e.children[t]);
                        t === this.index && (this.currentTimeLineEl = s);
                        var i = t < this.index ? 100 : 0;
                        Object(te.sb)(s, "transform", "translateX(" + i + "%)")
                    }
            }
            _destroyStory() {
                if (this.story) {
                    this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._hideTooltip(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), Object(te.ib)(this.contWrap, "stories_item_cont_wrap_meta_story"), re(Object(te.I)("narrative-meta-story", this.contWrap)), Object(te.ib)(this.contWrap, "stories_narrative_cover_blur"), re(Object(te.I)("stories_narrative_cover", this.contWrap)), Object(Ce.h)(Object(te.I)("stories_narrative_cover", this.contWrap)), Object(Ce.h)(window, "resize", this._onResizeHandle);
                    var e = this.getCurStoryData();
                    e && e.clickable_stickers && (r.unmountComponentAtNode(this.contStickers), delete this.stickerLayers), cancelAnimationFrame(this.timeLineAnim);
                    try {
                        this.contWrap.removeChild(this.story.getContainer()), this.story.destroy()
                    } catch (e) {}
                    this._replyHideEnd(), Object(Ce.h)(this.followBtn), val(this.authorButtons, ""), Object(Ce.h)(this.answersEl), Object(Ce.h)(Object(te.I)("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                }
            }
            _timeLineUpdate() {
                var e = this.story;
                if (e && !e.isPaused() && !this.isActiveLive()) {
                    var t = e.getCurrentTime(),
                        s = e.getDuration(),
                        i = Math.max(0, Math.min(100, t / s * 100));
                    Object(te.sb)(this.currentTimeLineEl, "transform", "translateX(" + i + "%) translateZ(0)"), i < 100 ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd(!0)
                }
            }
            _onLoadingStart() {
                this._loadingStartTime = new Date
            }
            _onLoadingEnd() {
                this._loadingStartTime && (this.loadingTime = Date.now() - this._loadingStartTime, this.layer._sendViewerStartTime(this.getRawId(), this.loadingTime), this._loadingStartTime = 0)
            }
            _onPlay() {
                this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), Object(te.ib)(this.wrapEl, "animate_story"), Object(te.ib)(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
            }
            _onPause() {
                cancelAnimationFrame(this.timeLineAnim)
            }
            _onPlayEnd() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.nextStory(e)
            }
            nextStory() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!this.isLocked()) {
                    var t = this.data.items;
                    e || this.layer._sendNavigationStatEvents("go_to_next_story_tap");
                    var s = this.index + 1;
                    s < t.length ? (e && this.layer._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this.changeStory(s)) : (this.opts.onStoriesEnd(e), this._destroyStory())
                }
            }
            prevStory() {
                if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                    this.layer._sendNavigationStatEvents("go_to_previous_story");
                    var e = this.index - 1;
                    e >= 0 ? this.changeStory(e) : (this._destroyStory(), this.opts.playPrevOwner())
                }
            }
            getOffsetLeft() {
                return this.wrapEl.offsetLeft + this.wrapEl.offsetWidth / 2
            }
            getWidth() {
                return this.wrapEl.offsetWidth
            }
            removeStoryBox() {
                this.pauseStory(), showFastBox({
                    title: Object(Le.d)("global_warning"),
                    onHide: () => {
                        this.playStory()
                    }
                }, Object(Le.d)("stories_remove_warning"), Object(Le.d)("stories_remove_confirm"), this.removeStory.bind(this), Object(Le.d)("global_cancel"))
            }
            removeStory(e) {
                this.pauseStory();
                var t = this.getIndex(),
                    s = this.getRawId();
                ajax.post("al_stories.php", {
                    act: "remove_story",
                    story_raw: s,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: e => {
                        this.layer._sendNavigationStatEvents("delete"), window.cur.module === ae && window.GeStories.storyDidRemove(s, e), Object(Be.b)().hide(), this._popStoryAndClearList(t)
                    },
                    showProgress: Te.o.pbind(e),
                    hideProgress: Te.w.pbind(e)
                })
            }
            removeNarrativeBox() {
                this.pauseStory(), showFastBox({
                    title: Object(Le.d)("global_warning"),
                    onHide: () => {
                        this.playStory()
                    }
                }, Object(Le.d)("stories_narrative_remove_warning"), Object(Le.d)("stories_remove_confirm"), this.removeNarrative.bind(this), Object(Le.d)("global_cancel"))
            }
            removeNarrative(e) {
                this.pauseStory();
                var t = this.getCurStoryData().narrative,
                    s = t.raw_id;
                ajax.post("al_stories.php", {
                    act: "remove_narrative",
                    narrative_raw: s,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: () => {
                        Object(Be.b)().hide(), this._popCoverAndCleanNarrativeList(t)
                    },
                    showProgress: Te.o.pbind(e),
                    hideProgress: Te.w.pbind(e)
                })
            }
            _popCoverAndCleanNarrativeList(e) {
                if (e.is_cover) this._popStoryAndClearList(this.getIndex());
                else {
                    this.opts.removeList(), this._remove(!1, (() => {
                        cur.storyLayer.activeStory._popStoryAndClearList(cur.storyLayer.activeStory.getIndex())
                    }).bind(this))
                }
            }
            _sendNarrativeBookmarkButtonDidPress() {
                var e = this.getCurStoryData().narrative;
                this.updateBottom = this.updateBottom.bind(this), ajax.post("al_bookmarks.php", {
                    act: "bookmark",
                    owner_id: e.owner_id,
                    object_id: e.id,
                    type: "narrative",
                    state: e.is_bookmarked ? 1 : 0,
                    hash: e.bookmark_hash,
                    ref: cur.module
                }, {
                    onDone: t => {
                        showDoneBox(t || Object(Le.d)("stories_narrative_bookmark_deleted"), {
                            className: "stories_done_msg"
                        }), e.is_bookmarked = !e.is_bookmarked, this.updateBottom()
                    }
                })
            }
            _sendNarrativeEditButtonDidPress() {
                var e = this.getCurStoryData().narrative;
                window.open(`https://${location.hostname}${this.data.author.href}?act=narrative_edit&nid=${e.id}`)
            }
            _popStoryAndClearList(e) {
                this._removeStoryFromMemoryByIndex(e), 0 === this.data.items.length && j(this.getOwnerId())
            }
            _removeStoryFromMemoryByIndex(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                this.data.items.splice(e, 1), this.opts.removeList();
                var s = this.data.items.length;
                s ? (this._initTimeLine(), s > e ? this.isActive && this.playStory(!0) : this.isActive && this.nextStory()) : this._remove(t)
            }
            _remove(e, t) {
                this.opts.onStoryRemoved(e, t)
            }
            shareBox() {
                var e, t = this.getCurStoryData().narrative;
                e = t ? `narrative${t.raw_id}` : `story${this.story.getId()}`, this.pauseStory(), Object(xe.b)("like.php", {
                    act: "publish_box",
                    object: e,
                    from: "wkview"
                }, {
                    onDone: () => {
                        this.autoResumeStory()
                    },
                    params: {
                        onHide: () => {
                            this.autoResumeStory()
                        }
                    }
                })
            }
            _onAnswerSend(e, t) {
                var s = this._getSendText();
                if (!s || !this.story) return cancelEvent(e);
                if (this.isActiveLive()) this.story.sendMessage(s, t);
                else {
                    var i, r = this.story.data.narrative;
                    i = r ? `narrative:${r.raw_id}` : `story:${this.story.getId()}`, ajax.post("al_im.php", {
                        act: "a_send",
                        msg: s,
                        hash: this.data.send_hash,
                        media: i,
                        entrypoint: "stories_comment",
                        to: this.getOwnerId()
                    }, {
                        onDone: () => {
                            this._onAnswerSended(t)
                        },
                        onFail: e => (this._showMessage(e), !0),
                        showProgress: () => {
                            val(this.sendFormButton, this._getLoaderHtml()), Object(te.a)(this.sendFormButton, "sending")
                        },
                        hideProgress: () => {
                            val(this.sendFormButton, ""), Object(te.ib)(this.sendFormButton, "sending")
                        }
                    })
                }
            }
            _onAnswerSended(e) {
                this.isActiveLive() || (this.layer._sendNavigationStatEvents("comment_send"), this._showMessage(Object(Le.d)("stories_answer_sent")).then(() => {
                    this._unlockSendForm(), this.playStory()
                })), val(Object(te.I)("stories_send_form_text", this.wrapEl), ""), this._blurSendForm(), this.updateFeedbackTTPos(), this.pauseStory(), e && e()
            }
            _onSendFormFocus() {
                this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", () => {
                    Emoji.shown || (this._resetFendForm(), this._blurSendForm()), this.updateFeedbackTTPos()
                })
            }
            _blurSendForm() {
                var e = Object(te.I)("stories_send_form_text", this.wrapEl);
                e && e.blur()
            }
            _getSendText() {
                var e = Emoji.editableVal(Object(te.I)("stories_send_form_text", this.wrapEl));
                return trim(e)
            }
            _onSendFormBlur() {
                this._getSendText() || this._resetFendForm()
            }
            _onSendFormKeyUp() {
                this.updateFeedbackTTPos()
            }
            _unlockSendForm() {
                this.formLocked && (this.formLocked = !1)
            }
            _resetFendForm() {
                this._unlockSendForm(), this.playStory(), val(Object(te.I)("stories_send_form_text", this.wrapEl), "")
            }
            _emojiOnKeyAction() {
                this._getSendText() ? Object(te.a)(this.sendFormButton, "active") : Object(te.ib)(this.sendFormButton, "active")
            }
            _getLoaderHtml() {
                return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
            }
            preloadNextStory(e) {
                if (e = isUndefined(e) ? this.index + 1 : e, !this.preloadedStories[e]) {
                    var t = this.data.items[e];
                    if (t) {
                        this.preloadedStories[e] = !0;
                        var s = t[t.type + "_url"];
                        s && ("video" === t.type ? m(s) : _(s))
                    }
                }
            }
            _addToBlacklist() {
                cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                    title: Object(Le.d)("stories_add_blacklist_title"),
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }, this.getOwnerId() < 0 ? Object(Le.d)("stories_add_blacklist_message_group") : Object(Le.d)("stories_add_blacklist_message"), Object(Le.d)("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), Object(Le.d)("global_cancel"))
            }
            _doAddToBlacklist(e) {
                ajax.post("al_stories.php", {
                    act: "blacklist_add",
                    owner_id: this.getOwnerId(),
                    hash: this.data.blacklist_hash,
                    source_story: this.getRawId()
                }, {
                    onDone: () => {
                        this.data.can_blacklist = !1, this.layer._sendNavigationStatEvents("hide_from_stories"), Object(Be.b)().hide(), this.opts.removeList(), this._remove()
                    },
                    showProgress: Te.o.pbind(e),
                    hideProgress: Te.w.pbind(e)
                })
            }
            _resetErrors() {
                var e = Object(te.I)("stories_error_wrap", this.contWrap);
                e && (Object(Ce.h)(Object(te.I)("stories_error_button", e)), re(e)), Object(te.ib)(this.wrapEl, "failed"), Object(te.ib)(this.wrapEl, "fatal_error")
            }
            _showError(e) {
                if (this.contWrap) {
                    var t, s, i = e;
                    switch (e) {
                        case "load":
                            t = Object(Le.d)("stories_error_cant_load"), s = ce("div", {
                                className: "stories_error_button",
                                innerHTML: Object(Le.d)("stories_try_again")
                            }), Object(Ce.b)(s, "click", () => {
                                this._destroyStory(), this.playStory()
                            });
                            break;
                        case "expired":
                            t = Object(Le.d)("stories_error_expired");
                            break;
                        case "deleted":
                            t = Object(Le.d)("stories_error_deleted");
                            break;
                        case "private":
                            t = Object(Le.d)("stories_error_private");
                            break;
                        case "deleted-narrative":
                            t = Object(Le.d)("stories_error_deleted_narrative");
                            break;
                        case "private-narrative":
                            t = Object(Le.d)("stories_error_private_narrative");
                            break;
                        default:
                            t = Object(Le.d)("global_unknown_error")
                    }
                    this._resetErrors(), this._stopLoader();
                    var r = ce("div", {
                            className: "stories_error_wrap"
                        }),
                        o = ce("div", {
                            className: "stories_error"
                        }),
                        a = ce("div", {
                            className: "stories_error_cont"
                        });
                    o.appendChild(a), a.appendChild(ce("div", {
                        className: "stories_error_icon " + i
                    })), a.appendChild(ce("div", {
                        className: "stories_error_caption",
                        innerHTML: t
                    })), s && a.appendChild(s), r.appendChild(o), this.contWrap.appendChild(r), Object(te.a)(this.wrapEl, "failed"), inArray(e, ["expired", "deleted", "private", "deleted-narrative", "private-narrative"]) && Object(te.a)(this.wrapEl, "fatal_error")
                }
            }
            _stopLoader() {
                setTimeout(() => {
                    re(Object(te.I)("stories_loader", this.contWrap))
                }, 0)
            }
            _showLoader() {
                if (this._stopLoader(), this.isActive && (!this.isLoaded() || this.isPaused()) && this.contWrap) {
                    var e = ce("div", {
                        className: "stories_loader",
                        innerHTML: this._getLoaderHtml()
                    });
                    this.contWrap.appendChild(e)
                }
            }
            _onFollowBtnClick() {
                var e, t;
                (this.pauseStory(), this.followBtnLock) || (this.followBtnLock = !0, this.data.author.id > 0 ? (t = "al_friends", e = this.data.author.can_follow ? "add" : "remove") : (t = "al_groups", e = this.data.author.can_follow ? "a_enter" : "a_leave"), ajax.post(`${t}.php`, {
                    act: e,
                    mid: this.getOwnerId(),
                    gid: -this.getOwnerId(),
                    hash: this.data.author.hash,
                    from: "stories"
                }, {
                    onDone: () => {
                        this.data.author.can_follow && this._sendStatEvent("follow"), this.data.author.can_follow = !this.data.author.can_follow, Object(te.xb)(this.followBtn, "followed", !this.data.author.can_follow), this._showMessage(Object(Le.d)(this.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(() => this.playStory()), window.tooltips && tooltips.destroy(this.followBtn), triggerEvent(this.followBtn, "mouseover")
                    },
                    showProgress: () => this.showInlineLoader(),
                    hideProgress: () => {
                        this.hideInlineLoader(), this.followBtnLock = !1
                    }
                }))
            }
            _getDimensions() {
                var e = Ne(getSize(this.wrapEl), 2),
                    t = e[0],
                    s = e[1],
                    i = Ne(getXY(this.wrapEl), 2),
                    r = i[0];
                return {
                    width: t,
                    height: s,
                    top: i[1] - scrollGetY(),
                    left: r - scrollGetX()
                }
            }
            markAsActive() {
                this.isActive = !0, Object(te.a)(this.wrapEl, "animate_story")
            }
            _renderReplyTo() {
                var e = this.getCurStoryData().reply_to,
                    t = e.list,
                    s = e.photo_url,
                    i = e.name,
                    r = e.can_view_deleted,
                    o = e.is_deleted,
                    a = e.is_private,
                    n = e.is_expired,
                    l = e.raw_id,
                    d = Object(te.nb)(`<div class="stories_reply_to" style="background-image: url(${s})">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">${i}</div>\n  </div>\n</div>`);
                if (Object(Ce.b)(d, "click", () => {
                        this.layer._sendNavigationStatEvents("open_parent_story");
                        var e = O();
                        w.length > 1 && e.getStoryRaw() === l ? cancelStackPop() : showStory(t, {
                            fromEl: d,
                            source: "reply_story"
                        })
                    }), r) return d;
                var h = !1;
                return o ? (Object(te.a)(d, "deleted"), h = Object(Le.d)("stories_deleted_story")) : a ? (Object(te.a)(d, "private"), h = Object(Le.d)("stories_private_story")) : n && (Object(te.a)(d, "expired"), h = Object(Le.d)("stories_expired_story")), h && (val(Object(te.I)("stories_reply_to_error_msg", d), h), re(Object(te.I)("stories_reply_to_owner_name_wrap", d))), d
            }
            sendMask() {
                if (!this._maskSending) {
                    this._maskSending = !0, this.pauseStory();
                    var e = this.getCurStoryData();
                    ajax.post("al_stories.php", {
                        act: "send_mask",
                        mask_id: e.mask_id,
                        hash: this.data.send_mask_hash
                    }, {
                        onDone: (e, t, s, i) => {
                            "cant_send" === e ? showFastBox({
                                title: t,
                                width: 460,
                                onHide: () => {
                                    this.playStory()
                                }
                            }, s, i) : this._showMessage(Object(Le.d)("stories_mask_sent")).then(() => this.playStory())
                        },
                        showProgress: () => this.showInlineLoader(),
                        hideProgress: () => {
                            this._maskSending = !1, this.hideInlineLoader()
                        }
                    })
                }
            }
            _getFeedbackTTElem() {
                return Object(te.I)("stories_answers_tt_arrow", this.wrapEl) || Object(te.I)("_views_button", this.wrapEl)
            }
            _destroyFeedBackTT() {
                var e = this._getFeedbackTTElem();
                e && e.tt && e.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1
            }
            hideFeedbackTooltip() {
                if (this._feedbackTTShown) {
                    var e = this._getFeedbackTTElem();
                    e && e.tt && (e.tt.hide(), this._feedbackTTShown = !1, this.autoResumeStory(), cancelStackPop())
                }
            }
            updateFeedbackTTArrow() {
                var e = this._getFeedbackTTElem();
                if (hasClass(e, "stories_answers_tt_arrow")) {
                    var t = Object(te.I)("stories_feedback_tt_arrow", this.wrapEl),
                        s = e.offsetLeft + getSize(e)[0] / 2 - getSize(t)[0] / 2 - 1;
                    Object(te.sb)(t, "left", `${s}px`)
                }
            }
            showFeedbackTooltip() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this._hideTooltip();
                var t = this._getFeedbackTTElem();
                if (t)
                    if (this._feedbackTTShown && !0 !== e) cancelStackPop();
                    else {
                        this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", () => {
                            this.hideFeedbackTooltip(!1, !0)
                        }), this._feedbackTTLoaded && (this._feedbackTTShown = !0), this.layer._sendNavigationStatEvents("open_replies_list");
                        var s = 8;
                        if (hasClass(t, "stories_answers_tt_arrow")) {
                            s = getSize(domPN(t))[0] - 39
                        }
                        showTooltip(t, {
                            className: "stories_feedback_tt",
                            forcetoup: !0,
                            nohide: !0,
                            forceNoHide: !0,
                            nohideover: !0,
                            content: `<div class="stories_feedback_content">\n          <div class="stories_feedback_loader">${this._getLoaderHtml()}</div>\n        </div>\n        <div class="stories_feedback_headers"></div>\n        <div class="stories_feedback_close"></div>`,
                            slide: 15,
                            zIndex: 100,
                            shift: [s, 19, 0],
                            appendEl: Object(te.I)("stories_bottom_wrap", this.wrapEl),
                            onHide: () => {
                                this._feedbackTTShown = !1
                            },
                            onShowStart: () => {
                                this.isActive && (this._feedbackTTShown = !0, this._feedbackTTLoaded ? this._feedbackRequestEnd && (this.feedbackScroll.update(), this._feedbackTooltipInitHeaders(), tooltips.rePositionTT(t.tt), this._onFeedbackScroll(), setTimeout(() => tooltips.rePositionTT(t.tt), 200)) : (Object(te.I)("stories_feedback_tt", this.wrapEl).appendChild(Object(te.nb)('<div class="stories_feedback_tt_arrow"></div>')), this._feedbackTTLoaded = !0, this._feedbackRequestEnd = !1, this._feedbackTooltipHeadersInited = !1, Object(Ce.b)(Object(te.I)("stories_feedback_close", this.wrapEl), "click", () => this.hideFeedbackTooltip()), setTimeout(() => {
                                    ajax.post("al_stories.php", {
                                        act: "feedback",
                                        story_raw: this.getRawId()
                                    }, {
                                        onDone: (e, s, i, r, o, a) => {
                                            if (this.isActive) {
                                                this.story.setViews(r), this.story.setReplies(o), this._feedbackRequestEnd = !0;
                                                var n = Object(te.I)("stories_feedback_content", this.wrapEl);
                                                val(n, e), this.updateQuestions(a, this._showMessage.bind(this), this.getCurStoryData().small_preview), this.feedbackScroll = new uiScroll(Object(te.I)("stories_feedback_content", this.wrapEl), {
                                                    theme: "default emoji no_transition",
                                                    onmore: () => this._onMoreFeedBack(),
                                                    onscroll: () => this._onFeedbackScroll()
                                                }), this.feedbackScroll.scrollTop(0), Object(te.a)(this.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), Object(te.I)("ui_scroll_overflow", this.feedbackScroll.container).appendChild(ce("div", {
                                                    className: "ui_scroll_shadow_bottom"
                                                })), this.feedbackNextFrom = s, t.tt.shown && this._feedbackTooltipInitHeaders(), this.updateBottom(), this.updateFeedbackTTPos(), cur = Object(Z.i)(cur, i), this.updateFeedbackTTArrow()
                                            }
                                        }
                                    })
                                }, 200)), this.updateFeedbackTTArrow())
                            }
                        })
                    }
            }
            updateQuestions(e, t, s) {
                var o = Object(te.G)("stories_feedback_questions");
                Object(te.ib)(Object(te.I)("_views_button", this.wrapEl), "stories_button_new_questions"), o && r.render(i.createElement(oe, {
                    showMessage: t,
                    storyUrl: s,
                    questions: e,
                    sendNavigationStatEvents: this.layer._sendNavigationStatEvents.bind(this.layer),
                    destroyCallback: this.destroyFeedbackQuestions.bind(this)
                }), o)
            }
            destroyFeedbackQuestions() {
                var e = Object(te.G)("stories_feedback_questions");
                r.unmountComponentAtNode(e), re(e), re(Object(te.G)("stories_feedback_title_questions")), this.feedbackTooltipReInitHeaders(), this.feedbackScroll.scrollTop(0), tooltips.rePositionTT(this._getFeedbackTTElem().tt)
            }
            updateFeedbackTTPos() {
                var e = this._getFeedbackTTElem();
                this._feedbackTTShown && e && e.tt && tooltips.rePositionTT(e.tt)
            }
            _feedbackTooltipInitHeaders() {
                if (!this._feedbackTooltipHeadersInited) {
                    this._feedbackTooltipHeadersInited = !0;
                    var e = Object(te.I)("stories_feedback_content", this.wrapEl),
                        t = Object(te.I)("stories_feedback_headers", this.wrapEl),
                        s = Object(te.H)("stories_feedback_title", e);
                    show(s[0]), this.feedbackHeaders = [];
                    for (var i = s.length + 1, r = 0; r < s.length; r++) {
                        var o = s[r],
                            a = t.appendChild(ce("div", {
                                className: "stories_feedback_title",
                                innerHTML: val(o)
                            }, {
                                top: o.offsetTop,
                                zIndex: i - r
                            }));
                        this.feedbackHeaders.push({
                            top: o.offsetTop,
                            height: o.offsetHeight,
                            el: a
                        })
                    }
                    Object(te.sb)(e, "margin-top", s[0].offsetHeight), hide(s[0])
                }
            }
            feedbackTooltipReInitHeaders() {
                this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(Object(te.I)("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
            }
            _onFeedbackScroll() {
                if (this._feedbackTooltipHeadersInited)
                    for (var e = this.feedbackScroll.data.scrollTop, t = !1, s = 0, i = this.feedbackHeaders.length - 1; i >= 0; i--) {
                        var r = this.feedbackHeaders[i],
                            o = r.top,
                            a = r.height,
                            n = r.el,
                            l = o,
                            d = e;
                        t && (d -= s - (l += a));
                        var h = d >= o - a;
                        n.classList.toggle("active", !t && h && d > 0), h && (t = !0), s = o;
                        var c = -Math.min(d, l);
                        n.style.transform = `translateY(${c}px)`
                    }
            }
            _onMoreFeedBack() {
                !this.feedbackLoadingMore && this.feedbackNextFrom && (this.feedbackLoadingMore = !0, ajax.post("al_stories.php", {
                    act: "feedback",
                    story_raw: this.getRawId(),
                    offset: this.feedbackNextFrom
                }, {
                    onDone: (e, t) => {
                        this.feedbackNextFrom = t, t && (this.feedbackLoadingMore = !1);
                        for (var s, i = Object(te.I)("stories_feedback_views", this.wrapEl), r = ce("div", {
                                innerHTML: e
                            }); s = r.firstChild;) i.appendChild(s)
                    }
                }))
            }
            showInlineLoader() {
                show(this.inlineLoader)
            }
            hideInlineLoader() {
                hide(this.inlineLoader)
            }
            volumeUpdate() {
                this.story && this.story.volumeUpdate && this.story.volumeUpdate()
            }
            _onAutoPlayFail() {
                Object(te.a)(this.wrapEl, "autoplay_failed")
            }
            _hideReply() {
                showFastBox({
                    title: Object(Le.d)("global_warning"),
                    onHide: () => {
                        this.autoResumeStory()
                    }
                }, Object(Le.d)("stories_hide_reply_warning"), Object(Le.d)("global_continue"), this._doHideReply.bind(this), Object(Le.d)("global_cancel"))
            }
            _doHideReply() {
                this.pauseStory(), Object(te.a)(this.wrapEl, "hiding_reply"), Object(Be.b)().hide();
                var e = this.getIndex(),
                    t = this.data.author.gender,
                    s = Object(te.nb)(`<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">${getProgressHtml()}</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">${Object(Le.d)("stories_reply_hidden")}</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">${Object(Le.d)("stories_hide_reply_continue")}</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">${langSex(t,window.lang.stories_hide_all_replies)}</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">${Object(Le.d)("stories_reply_add_to_blacklist")}</div>\n  </div>\n</div>`);
                Object(Ce.b)(Object(te.I)("_stories_reply_restore", s), "click", this._restoreReply.bind(this)), Object(Ce.b)(Object(te.I)("_stories_reply_continue", s), "click", () => this._replyHideEnd(e)), Object(Ce.b)(Object(te.I)("_stories_hide_replies", s), "click", this._hideAllReplies.bind(this)), Object(Ce.b)(Object(te.I)("_stories_reply_ban", s), "click", this._ban.bind(this)), this.contWrap.appendChild(s), ajax.post("al_stories.php", {
                    act: "hide_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        this.opts.removeList(), cur.needUpdateFeedStories = !0, Object(te.ib)(s, "loading")
                    },
                    onFail: () => {
                        this._resetReplyHide(), this.playStory()
                    }
                })
            }
            _restoreReply(e) {
                cancelEvent(e);
                var t = Object(te.I)("stories_hide_reply_wrap", this.contWrap);
                ajax.post("al_stories.php", {
                    act: "restore_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        this._resetReplyHide(), this.playStory()
                    },
                    showProgress: () => Object(te.a)(t, "loading"),
                    hideProgress: () => Object(te.ib)(t, "loading")
                })
            }
            _resetReplyHide() {
                re(Object(te.I)("stories_hide_reply_wrap", this.contWrap)), Object(te.ib)(this.wrapEl, "hiding_reply")
            }
            _hideAllReplies() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: Object(Le.d)("global_warning")
                }, Object(Le.d)("stories_delete_all_replies_confirm").replace("{name}", e), Object(Le.d)("global_continue"), this._doHideAllReplies.bind(this), Object(Le.d)("global_cancel"))
            }
            _doHideAllReplies(e) {
                ajax.post("al_stories.php", {
                    act: "hide_all_replies",
                    owner_id: this.getOwnerId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        Object(Be.b)().hide(), this.opts.removeList(), this.data.items = [];
                        var e = Object(te.I)("_stories_hide_replies", this.contWrap);
                        val(e, Object(Le.d)("stories_all_replies_hidden")), Object(te.a)(e, "disabled")
                    },
                    showProgress: Te.o.pbind(e),
                    hideProgress: Te.w.pbind(e)
                })
            }
            _ban() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: Object(Le.d)("global_warning")
                }, Object(Le.d)("stories_ban_confirm").replace("{name}", e), Object(Le.d)("global_continue"), this._doBan.bind(this), Object(Le.d)("global_cancel"))
            }
            _doBan(e) {
                ajax.post("al_stories.php", {
                    act: "ban",
                    owner_id: this.getOwnerId(),
                    hash: this.data.stories_ban_hash
                }, {
                    onDone: () => {
                        Object(Be.b)().hide(), this.opts.removeList(), this.data.items = [];
                        var e = Object(te.I)("_stories_reply_ban", this.contWrap);
                        val(e, Object(Le.d)("stories_banned")), Object(te.a)(e, "disabled")
                    },
                    showProgress: Te.o.pbind(e),
                    hideProgress: Te.w.pbind(e)
                })
            }
            _replyHideEnd() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                Object(te.I)("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && j(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(e || this.getIndex(), !isNumeric(e)))
            }
            _feedbackRemoveReplyFromDom(e) {
                var t = Object(te.I)("stories_feedback_content", this.wrapEl);
                if (t) {
                    var s = t.querySelector(`#feed_story_${e}`);
                    s && Object(te.a)(s, "removed")
                }
            }
            onReplyDeleted(e) {
                this._feedbackRemoveReplyFromDom(e)
            }
            _updateFeedStoryPreview() {
                var e = Object(te.G)("feed_story_" + this.layer.getBlockKey(this.data));
                if (e && !hasClass(e, "stories_feed_reply_item")) {
                    var t = this.indexToUnread(!0),
                        s = this.data.items[t];
                    s && s.small_preview && Object(te.sb)(e, "background-image", `url(${s.small_preview})`)
                }
            }
            _sendStatEvent(e) {
                var t = this.getCurStoryData();
                ajax.post("al_stories.php", Object(Z.i)({
                    act: "stat",
                    source_story: this.getRawId()
                }, t.stats[e]))
            }
            _sendStatStickerEvent(e, t) {
                var s = this.getCurStoryData().clickable_stickers;
                ajax.post("al_stories.php", Object(Z.i)({
                    act: "stickers_stat",
                    story_raw_id: this.getRawId(),
                    action: e,
                    hash: s.hash
                }, t))
            }
            report() {
                var e = this.getCurStoryData(),
                    t = "story";
                this.isActiveLive() ? t = "live" : e.narrative && (t = "narrative");
                var s = Object(xe.b)("al_stories.php", {
                    act: "report_box",
                    type: t
                }, {
                    onDone: () => {
                        var e = Object(te.H)("radiobtn", "stories_report");
                        radioBtns.stories_report = {
                            val: 0,
                            els: e
                        }
                    },
                    params: {
                        onClean: () => {
                            delete radioBtns.stories_report, this.playStory()
                        }
                    }
                });
                s.removeButtons(), s.addButton(Object(Le.d)("box_send"), this._sendReportButtonDidPress.bind(this)), s.addButton(Object(Le.d)("global_cancel"), !1, "no")
            }
            _sendReportButtonDidPress(e) {
                var t, s, i = this.index,
                    r = this.getCurStoryData(),
                    o = r.narrative,
                    a = r.report_hash,
                    n = !!o;
                n ? (t = o.raw_id, s = o.report_hash) : (t = this.getRawId(), s = a), ajax.post("al_stories.php", {
                    act: "report",
                    type: n ? "narrative" : "story",
                    item_raw: t,
                    reason: radioBtns.stories_report.val,
                    hash: s
                }, {
                    onDone: () => {
                        Object(Be.b)().hide(), this.layer._sendNavigationStatEvents("claim"), n ? this._popCoverAndCleanNarrativeList(o) : this._popStoryAndClearList(i), showDoneBox(Object(Le.d)("stories_report_sent"), {
                            className: "stories_done_msg"
                        })
                    },
                    showProgress: Te.o.pbind(e),
                    hideProgress: Te.w.pbind(e)
                })
            }
            onLiveEnded(e) {
                this.isActiveLive() && (this.data.items[this.index].can_share = !e, this.story.onLiveEnded(), this.updateBottom())
            }
            updateLiveViewersCount(e) {
                val(this.descEl, e)
            }
        }
        var Pe = .563,
            Re = 1.78,
            Me = 540,
            Ae = 320,
            De = "user_personal_card",
            Fe = "group_personal_card",
            He = s("Tn+0");

        function We(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var qe = [];
        var $e = [];
        var Ke = () => $e.length || qe.length;

        function Qe(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function Ue(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Ve = o.Promise,
            ze = {
                show(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (e.match(/story/) && (e = this._parseList(e)), cur.storyLayer && cur.storyLayer.list === e.split("/")[1]) return !1;
                    this.getList(e).then(e => {
                        S(new class {
                            constructor(e, t, s, i, r) {
                                this.queue = [], this.storiesToRead = [], this.storiesSkip = [];
                                try {
                                    window.Videoview && Videoview.togglePlay(!1)
                                } catch (e) {}
                                this.initDOM(), this.show(), this._init(e, t, s, i), addClass(this.layerEl, "shown"), this._source = r.source, this._initViewerSource(), this._sendOpeningEvents(), r.isOpenNarrativeFromFeed && (this.isOpenNarrativeFromFeed = r.isOpenNarrativeFromFeed)
                            }
                            _init(e, t, s, i) {
                                var r = Qe(e.split("&"), 2),
                                    o = r[0],
                                    a = r[1],
                                    n = void 0 === a ? "" : a,
                                    l = Qe(o.split("_"), 2),
                                    d = l[0],
                                    h = l[1];
                                this.storyRaw = o, this.storyOwner = d, this.storyId = h, this.blockKey = `${d}${n}`, this.list = t, this.storiesList = s, this.extra = this.parseExtra(i), this.initStories()
                            }
                            initStories() {
                                return new Promise(e => {
                                    this.storiesBlocks = this.storiesList.map(e => this.getBlockKey(e));
                                    var t = !1,
                                        s = this.storiesBlocks.indexOf(this.blockKey);
                                    if (s > -1) {
                                        var i = this.storiesList[s];
                                        t = i.items[i.items.length - 1].unread
                                    }
                                    if (this.extra) switch (this.extra.context) {
                                        case "new":
                                            t = !0;
                                            break;
                                        case "all":
                                            t = !1
                                    }
                                    if (t && "replies" === this.list.substr(0, 7) && (t = !1), t) {
                                        for (var r = [], o = 0; o < this.storiesList.length; o++) {
                                            var a = this.storiesList[o],
                                                n = a.items[a.items.length - 1];
                                            a.is_narrative && !n.isNarrativeMetaStory && a.items.push({
                                                type: "photo",
                                                raw_id: n.raw_id,
                                                narrative: n.narrative,
                                                isNarrativeMetaStory: !0
                                            }), (a.items[a.items.length - 1].unread || 0 === o && this._hasContext("new")) && r.push(a)
                                        }
                                        r.length && (this.storiesList = r, this.storiesBlocks = this.storiesList.map(e => this.getBlockKey(e)))
                                    }
                                    this.renderedStories = {};
                                    var l = this._renderStories().activeStory;
                                    this.scrollToStory(l, !0), 1 === this.storiesList.length && addClass(this.stories, "one_story"), this._startFirstStory(l, this.extra.story_id), addClass(this.stories, "inited"), e()
                                })
                            }
                            getBlockKey(e) {
                                return e.hasOwnProperty("data") && (e = e.data), e.items && e.items.length && "live" === e.items[0].type ? `${e.author.id}live` : e.narrative || e.is_narrative ? `${e.author?e.author.id:e.narrative.owner_id}narrative${e.items?e.items[0].narrative.id:e.narrative.id}` : this.list.includes("place") ? `${e.author.id}` + "place" : `${e.author.id}`
                            }
                            _renderStories() {
                                for (var e = [], t = 0; t < this.storiesList.length; t++) this.storiesList[t] && e.push(this.storiesList[t]);
                                var s, i = this._getScreenStoriesCount(),
                                    r = this._getCurStoryPos(e.map(e => this.getBlockKey(e))),
                                    o = Math.floor(i / 2),
                                    a = e.slice(Math.max(0, r - o)).slice(0, i),
                                    n = a.map(e => this.getBlockKey(e));
                                for (var l in this.renderedStories)
                                    if (this.renderedStories.hasOwnProperty(l)) {
                                        var d = this.renderedStories[l]; - 1 === n.indexOf(l) && (d.story.destroy(), delete this.renderedStories[l])
                                    }
                                if (a.map((e, t) => {
                                        var i = this.getBlockKey(e);
                                        if (!this.renderedStories[i]) {
                                            var r = this.storiesBlocks.indexOf(i),
                                                a = e.author.id,
                                                n = new Ie(e, {
                                                    id: t,
                                                    layer: this,
                                                    onSelect: this._onSelectStory.bind(this),
                                                    onStoriesEnd: this._onStoriesEnd.bind(this, r),
                                                    onStoryRemoved: (e, t) => this._onStoryRemoved(a, r, e, t),
                                                    playPrevOwner: this._playPrevOwner.bind(this, r),
                                                    onPlayStory: this._onPlayStory.bind(this, r),
                                                    onVideoPlay: this._onVideoPlay.bind(this),
                                                    onVideoEnd: this._onVideoEnd.bind(this),
                                                    onStartStory: this._onStartStory.bind(this),
                                                    removeList: () => Stories.removeList(this.list)
                                                });
                                            t <= o && this.stories.children[t] ? this.stories.insertBefore(n.render(), this.stories.children[t]) : this.stories.appendChild(n.render()), this.renderedStories[i] = {
                                                story: n,
                                                index: r
                                            }, i === this.blockKey && (s = n)
                                        }
                                    }), !s) {
                                    var h = n[0];
                                    s = this.renderedStories[h].story
                                }
                                return {
                                    activeStory: s
                                }
                            }
                            _sendOpeningEvents() {
                                if (this._source) {
                                    var e;
                                    switch (this._source) {
                                        case "narrative_story":
                                            e = "narrative_open_stories";
                                            break;
                                        case "narrative_snippet":
                                        case "narrative_link":
                                            e = "narrative_open";
                                            break;
                                        case "narrative_recommendations":
                                            e = "narrative_other"
                                    }
                                    if (e && this._sendNavigationStatEvents(e, !1), "narrative_fave" === this._source) {
                                        var t = this.activeStory.getCurStoryData();
                                        if (t && t.narrative) {
                                            var s = t.narrative,
                                                i = s.owner_id,
                                                r = s.id;
                                            statlogsValueEvent("bookmarks_product_analytics", {
                                                item_type: "narrative",
                                                item_owner_id: i,
                                                item_id: r,
                                                time: window.getServerTime()
                                            })
                                        }
                                    }
                                }
                            }
                            _destroyStories() {
                                for (var e in this.renderedStories) this.renderedStories.hasOwnProperty(e) && this.renderedStories[e].story.destroy()
                            }
                            destroy() {
                                clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), this._onVideoEnd(), removeEvent(this.volumeControl), removeEvent(this.layerEl), delete this.activeStory, delete this.volumeControl, delete this.renderedStories;
                                try {
                                    this.layerEl && bodyNode.removeChild(this.layerEl)
                                } catch (e) {}
                                delete cur.storyLayer
                            }
                            getList() {
                                return "story" + this.activeStory.getRawId() + "/" + this.list
                            }
                            getStoryRaw() {
                                return !!this.activeStory && this.activeStory.getRawId()
                            }
                            initDOM() {
                                this.layerEl = ce("div", {
                                    className: "stories_layer"
                                });
                                var e = ce("div", {
                                    className: "stories_layer_cont"
                                });
                                this.layerEl.appendChild(e), e.appendChild(this._renderBackButton()), e.appendChild(this._renderVolumeControl()), this._updateVolumeButton(), this.stories = ce("div", {
                                    id: "stories_list",
                                    className: "stories_list"
                                }), e.appendChild(this.stories), e.appendChild(ce("div", {
                                    className: "stories_layer_close"
                                })), addEvent(this.layerEl, "click", this._onLayerClick.bind(this)), bodyNode.appendChild(this.layerEl)
                            }
                            show() {
                                onBodyResize()
                            }
                            hide(e) {
                                addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && k(), this._source && this._source.indexOf("narrative") > -1 && this._sendNavigationStatEvents("narrative_close", !1), !0 !== e && this.activeStory ? this.animateStory("minimize").then(this.doHide.bind(this)) : this.doHide(e), removeClass(this.layerEl, "shown"), this.activeStory && (this.activeStory.pauseStory(), this.activeStory._hideTooltip(), this.activeStory.isActiveLive() && this._sendNavigationStatEvents("live_player_close", !1))
                            }
                            doHide(e) {
                                if (this._readStories(), this.destroy(), !e && (w.pop(), cur.storyLayer = w[w.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (E(!1, !0), layerQueue.pop())), window.wkcur && window.wkcur.shown && WkView.restoreLayer({}), "group_stories" === this.list && Stories.groupStoriesBlockUpdate(), this.list.startsWith("archive") && !1 !== this.hideAllLayers && !e) {
                                    if (!_message_boxes[cur.storiesArchiveBoxGUID]) return;
                                    _message_boxes[cur.storiesArchiveBoxGUID].forceHide = !1, _message_boxes[cur.storiesArchiveBoxGUID]._show(!0, !1, !0), window.updateStoriesArchiveBoxPosition && window.updateStoriesArchiveBoxPosition()
                                }
                            }
                            back() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                this.hideAllLayers = !1;
                                var t = cancelStack[cancelStack.length - 1];
                                t && "stories_form_focus" === t.name && cancelStackPop(), this.hide(!1, e)
                            }
                            _getScreenStoriesCount() {
                                return 2 * Math.floor(window.innerWidth / (window.innerHeight * Pe)) + 1
                            }
                            _getCurStoryPos(e) {
                                return (e || this.storiesBlocks).indexOf(this.blockKey)
                            }
                            _startFirstStory(e, t) {
                                this.activeStory = e, addClass(e.getWrap(), "active"), this.scrollToStory(), t || (t = this._hasContext("new") ? t : this.storyRaw), e.indexToStoryById(t), this._startActiveStory(), setTimeout(() => {
                                    addClass(this.stories, "animated"), this.inited = !0, "open" === this.extra.replies && this.activeStory.showFeedbackTooltip()
                                })
                            }
                            _markReadRestStories(e) {
                                this._markReadStoriesInRange(e, e.index, e.data.items.length), this._updateBadge(e)
                            }
                            _onSelectStory(e) {
                                var t;
                                this.activeStory && (t = this.activeStory.getWrap(), this.activeStory.stop()), e.id - this.activeStory.id > 0 && this._markReadRestStories(this.activeStory), this.activeStory = e, e.indexToUnread(), e.isActiveLive() || e.fillTimeLine(), this.blockKey = this.getBlockKey(e), clearTimeout(this.timer), addClass(this.stories, "animated"), this.timer = setTimeout(() => {
                                    removeClass(t, "active"), addClass(e.getWrap(), "active"), this.scrollToStory(), this.timer = setTimeout(() => {
                                        this.activeStory && e.id !== this.activeStory.id || !this.activeStory || (e.indexToUnread(), this._startActiveStory(), this._renderStories(), this.scrollToStory(e, !0))
                                    }, 200)
                                })
                            }
                            _startActiveStory() {
                                var e = this.activeStory;
                                e.markAsActive(), e.playStory(!0)
                            }
                            _onStartStory() {
                                var e = this.activeStory,
                                    t = this.list;
                                if (e) {
                                    var s = nav.objLoc;
                                    s.w = "story" + e.getRawId(), t.match(/^-?(\d+)_(\d+)$/) || (s.w += "/" + t), t.match(/^narrative-?\d+_\d+/) && (s.w = `narrative${this.activeStory.getCurStoryData().narrative.raw_id}`), nav.setLoc(nav.toStr(s))
                                }
                            }
                            scrollToStory(e, t) {
                                var s = this._getScrollLeft(e);
                                t ? (removeClass(this.stories, "animated"), this._setScrollLeft(s)) : this.inited && addClass(this.stories, "animated"), setTimeout(() => {
                                    this._setScrollLeft(s)
                                })
                            }
                            _setScrollLeft(e) {
                                setStyle(this.stories, "transform", "translateX(" + e + "px) translateZ(0)")
                            }
                            _getScrollLeft(e) {
                                return e = e || this.activeStory, window.innerWidth / 2 - e.getOffsetLeft()
                            }
                            _onStoriesEnd(e, t) {
                                for (var s = -1, i = e + 1; i < this.storiesList.length; i++)
                                    if (this.storiesList[i]) {
                                        s = i;
                                        break
                                    }
                                s > -1 ? (t && this._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this._onSelectStory(this._getStoryInstanceByIndex(s))) : cancelStackPop(t)
                            }
                            _playPrevOwner(e) {
                                for (var t = -1, s = e - 1; s >= 0; s--)
                                    if (this.storiesList[s]) {
                                        t = s;
                                        break
                                    }
                                t > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(t)) : cancelStackPop()
                            }
                            _markReadStoriesInRange(e, t, s) {
                                for (var i = e.data.items, r = t; r < s; r++) {
                                    var o = i[r];
                                    o.unread && (o.unread = !1)
                                }
                            }
                            _markReadPrevStories(e) {
                                this._markReadStoriesInRange(e, 0, e.index)
                            }
                            _updateBadge(e) {
                                var t = ge("feed_story_" + this.getBlockKey(e)),
                                    s = geByClass1("_stories_feed_item_replies", t);
                                if (hasClass(t, "story_feed_new_item") || "" !== val(s)) {
                                    var i = e.data.items || [],
                                        r = i[e.index] || {};
                                    (r.answers || {}).new_count = 0, r.unread = !1;
                                    var o = !0,
                                        a = 0;
                                    i.forEach(e => {
                                        var t = e.answers || {};
                                        a += t.new_count || 0, e.unread && (o = !1)
                                    }), a > 0 ? val(s, a) : (val(s, ""), o && (removeClass(t, "story_feed_new_item"), removeClass(t, "story_feed_new_item_promo")))
                                }
                            }
                            _onPlayStory(e) {
                                var t = this._getStoryInstanceByIndex(e);
                                if (t) {
                                    this.storiesReadHash = t.getReadHash();
                                    var s = t.getRawId(),
                                        i = t.getTrackCode();
                                    i && (s += "_" + i), this.storiesToRead.push(s), this._markReadPrevStories(t), this.storiesToRead > 10 && this._readStories(), this._updateBadge(t)
                                }
                                var r = this._getStoryInstanceByIndex(e + 1);
                                r && r.preloadNextStory(r.getIndex())
                            }
                            _getStoryInstanceByIndex(e) {
                                var t = this.storiesList[e];
                                if (!t) return !1;
                                var s = this.getBlockKey(t);
                                return this.renderedStories[s].story
                            }
                            _onStoryRemoved(e, t, s, i) {
                                for (var r = 0; r < this.storiesList.length; r++) this.storiesList[r] && this.storiesList[r].author.id === e && (this.storiesList[r] = !1);
                                !s && this._onStoriesEnd(t), Stories.updateFeedStories(null, {
                                    cb: i
                                })
                            }
                            onVisibilityChange() {
                                "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
                            }
                            onResize() {
                                var e = cur.storyLayer.activeStory;
                                e && cur.storyLayer.scrollToStory(e, !0)
                            }
                            pauseStory(e) {
                                this.activeStory && this.activeStory.pauseStory(e)
                            }
                            playStory() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                this.activeStory && this.activeStory.autoResumeStory(e)
                            }
                            _onLayerClick(e) {
                                var t = hasClass(e.target, "stories_layer_close");
                                (hasClass(e.target, "stories_layer_cont") || t) && (t ? this.isCloseBtnClick = !0 : this.storiesBlocks.length - 1 === this._getCurStoryPos() && (this._markReadRestStories(this.activeStory), this._markStoryAsSkipped()), cancelStackPop())
                            }
                            _checkKeyEvents(e) {
                                return !(attr(e.target, "contenteditable") || inArray(e.target.tagName, ["INPUT", "TEXTAREA"]) || curBox())
                            }
                            onKeyDown(e) {
                                if (cur.storiesKeyDown) cur.storyLayer && cur.storyLayer._checkKeyEvents(e) && cancelEvent(e);
                                else {
                                    if (cur.storiesKeyDown = e.keyCode !== KEY.ESC, [KEY.PAGEDOWN, KEY.PAGEUP].indexOf(e.keyCode) > -1) return cancelEvent(e);
                                    if (cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e)) {
                                        switch (e.keyCode) {
                                            case KEY.LEFT:
                                                cur.storyLayer.prevStory();
                                                break;
                                            case KEY.RIGHT:
                                                cur.storyLayer.nextStory();
                                                break;
                                            case KEY.SPACE:
                                                cancelEvent(e);
                                                var t = cur.storyLayer.activeStory;
                                                cur.storiesKeyDownLong = setTimeout(t._longTapHandle.bind(t), ne)
                                        }
                                        cur.storiesKeyDownTs = vkNow()
                                    }
                                }
                            }
                            onKeyUp(e) {
                                cur.storiesKeyDown = !1, clearTimeout(cur.storiesKeyDownLong), cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e) && e.keyCode === KEY.SPACE && (cancelEvent(e), vkNow() - cur.storiesKeyDownTs > ne ? cur.storyLayer.playStory(!0) : cur.storyLayer.nextStory())
                            }
                            nextStory() {
                                this.activeStory && this.activeStory.nextStory()
                            }
                            prevStory() {
                                this.activeStory && this.activeStory.prevStory()
                            }
                            changeStory(e) {
                                this.activeStory && this.activeStory.changeStory(e)
                            }
                            _readStories() {
                                if (this.storiesToRead.length && Ke()) {
                                    var e = this._getSource(),
                                        t = this.storiesToRead.join(","),
                                        s = this.storiesSkip.join(",");
                                    this.storiesToRead = [], ajax.post("al_stories.php", {
                                        act: "read_stories",
                                        stories: t,
                                        source: e,
                                        stories_skip: s,
                                        navigation_stats: function() {
                                            var e = qe.map(e => [e.ownerId, e.storyId, e.source, e.action].join(",")).join(";");
                                            return qe = [], e
                                        }(),
                                        loading_stats: function() {
                                            var e = $e.map(e => [e.ownerId, e.storyId, e.source, e.time].join(",")).join(";");
                                            return $e = [], e
                                        }(),
                                        connection_type: function() {
                                            var e = navigator.connection;
                                            if (!e) return "";
                                            var t = e.effectiveType,
                                                s = e.downlink;
                                            switch (t) {
                                                case "slow-2g":
                                                    return "GPRS";
                                                case "2g":
                                                    return "EDGE";
                                                case "3g":
                                                    return "3G";
                                                case "4g":
                                                    return s > 8 ? "wi-fi" : "LTE"
                                            }
                                            return ""
                                        }(),
                                        hash: this.storiesReadHash
                                    })
                                }
                            }
                            _getSource() {
                                var e = "list";
                                return this._source ? this._source : (-1 !== [De, Fe, ae, He.b].indexOf(cur.module) && (e = cur.module), e)
                            }
                            _sendNavigationStatEvents(e) {
                                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                                    s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                    i = this.activeStory,
                                    r = this.getStoryRaw() || i.getCurStoryData().raw_id,
                                    o = this._getSource();
                                t && this._sendProductAnalyticEvents(e, s), this._updateLastStoryOpenAction(e),
                                    function(e) {
                                        var t = e.storyRawId,
                                            s = e.source,
                                            i = e.action,
                                            r = We(t.split("_"), 2),
                                            o = r[0],
                                            a = r[1];
                                        "reply" === s && (s = "replies_list");
                                        var n = {
                                            ownerId: o,
                                            storyId: a,
                                            source: s,
                                            action: i
                                        };
                                        qe.push(n)
                                    }({
                                        storyRawId: r,
                                        source: o,
                                        action: e
                                    })
                            }
                            _sendProductAnalyticEvents(e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                    s = this.activeStory,
                                    i = Qe((this.getStoryRaw() || s.getCurStoryData().raw_id).split("_"), 2),
                                    r = i[0],
                                    o = i[1],
                                    a = s.getIndex(),
                                    n = s.getItemsLength() - a,
                                    l = s.story,
                                    d = this._getSource();
                                if (e && s && l && r && o) {
                                    var h = {
                                        event_type: e,
                                        story_owner_id: r,
                                        story_id: o,
                                        time: vk.ts + Math.floor(((new Date).getTime() - vk.started) / 1e3),
                                        volume: 100 * y(),
                                        view_entry_point: d,
                                        stories_author_before: a,
                                        stories_author_after: n,
                                        nav_screen: cur.module,
                                        view_event_timeline_position: l.getCurrentTime()
                                    };
                                    Object.assign(h, t), statlogsValueEvent("story_product_analytics", h)
                                }
                            }
                            _updateLastStoryOpenAction(e) {
                                switch (e) {
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
                            }
                            _initViewerSource() {
                                var e = this._getSource();
                                switch (e) {
                                    case "reply":
                                        this.viewerSource = "replies_list";
                                        break;
                                    case "feed":
                                        this.viewerSource = cur.section;
                                        break;
                                    default:
                                        this.viewerSource = e
                                }
                            }
                            _sendViewerStartTime(e, t) {
                                ! function(e) {
                                    var t = e.storyRawId,
                                        s = e.source,
                                        i = e.time,
                                        r = We(t.split("_"), 2),
                                        o = {
                                            ownerId: r[0],
                                            storyId: r[1],
                                            source: s,
                                            time: i
                                        };
                                    $e.push(o)
                                }({
                                    storyRawId: e,
                                    source: this.viewerSource,
                                    time: t
                                })
                            }
                            _onVideoPlay() {
                                getAudioPlayer().isPlaying() && (this.needAudioReset = !0, getAudioPlayer().pause()), Notifier.lcSend("stories_video_start")
                            }
                            _onVideoEnd() {
                                this.needAudioReset && (delete this.needAudioReset, getAudioPlayer().play()), Notifier.lcSend("stories_video_end")
                            }
                            _renderBackButton() {
                                return this.backButton = se(`<div class="stories_back_button_wrap">\n  <div class="stories_back_button">\n    <div class="stories_back_button_icon"></div>\n    <div class="stories_back_button_text">${getLang("global_back")}</div>\n  </div>\n</div>`), addEvent(this.backButton, "click", () => {
                                    cancelStackPop()
                                }), this.backButton
                            }
                            showBackButton() {
                                show(this.backButton), this.hideAllLayers = !0, addClass(this.layerEl, "with_back_button")
                            }
                            parseExtra(e) {
                                var t = {},
                                    s = String(e).split(";");
                                for (var i in s)
                                    if (s.hasOwnProperty(i)) {
                                        var r = Qe(s[i].split(":"), 2),
                                            o = r[0],
                                            a = r[1];
                                        o && a && (t[o] = a)
                                    }
                                return t
                            }
                            getAnimateFromElem() {
                                if (!this.hideAllLayers) {
                                    var e = this.getBlockKey(this.activeStory);
                                    if (hasClass(this.animateFromEl, "stories_feed_reply_item")) {
                                        var t = domQuery("#feed_story_" + e, domPN(this.animateFromEl))[0];
                                        if (t) return t
                                    } else if ("feed" === cur.module && !isVisible(this.backButton)) {
                                        var s = ge("feed_story_" + e);
                                        if (s) return Stories.feedScrollToOwner(e), s
                                    }
                                }
                                return this.animateFromEl
                            }
                            animateStory(e, t) {
                                return new Promise(s => {
                                    if ("expand" === e && !t || "minimize" === e && !this.animateFromEl) return setStyle("stories_layers_background", "opacity", 1), s();
                                    this.pauseStory(), addClass(this.layerEl, "animation"), removeClass(this.stories, "animated");
                                    var i = "expand" === e ? t : this.getAnimateFromElem();
                                    if (this.hideAllLayers && "minimize" === e) {
                                        var r = w[0];
                                        i = r.getAnimateFromElem(),
                                            function() {
                                                for (var e = w.length - 2; e >= 0; e--) w[e].doHide(!0);
                                                w.splice(0, w.length - 1)
                                            }(), k()
                                    }
                                    removeClass(i, "stories_feed_item_ava_animate");
                                    var o = Qe(getXY(i), 2),
                                        a = o[0],
                                        n = o[1],
                                        l = getSize(i),
                                        d = window.innerHeight,
                                        h = Math.min(Me, Math.max(Ae, d * Pe)),
                                        c = h * Re,
                                        u = Math.max(0, (d - c) / 2),
                                        p = Math.max(0, (window.innerWidth - h) / 2);
                                    a = p - a + h / 2 - l[0] / 2 + scrollGetX(), n = u - n + c / 2 - l[1] / 2 + scrollGetY(), a = -a, n = -n;
                                    var _ = {};
                                    "expand" === e && (_.transform = `translate(${a}px, ${n}px) scale(0)`, this.animateFromEl = t), setStyle(this.activeStory.wrapEl, _), "minimize" === e && setStyle(i, "transform", "scale(0)"), this.animationTimer = setTimeout(() => {
                                        addClass(this.stories, "animated"), addClass(i, "stories_feed_item_ava_animate"), this.animationTimer = setTimeout(() => {
                                            "expand" === e ? (setStyle("stories_layers_background", "opacity", 1), setStyle(this.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(this.activeStory.wrapEl, "transform", `translate(${a}px, ${n}px) scale(0.01)`), setStyle(i, "transform", "scale(1)")), this.animationTimer = setTimeout(() => {
                                                s(), "expand" === e ? (setStyle(this.activeStory.wrapEl, "transform", ""), removeClass(this.layerEl, "animation"), removeClass(this.stories, "animated"), this.playStory(), w.length > 1 && (w[w.length - 2].setLayerVisibility(!1), w[w.length - 1].showBackButton())) : (removeClass(i, "stories_feed_item_ava_animate"), setStyle(i, "transform", ""))
                                            }, 330)
                                        }, 30)
                                    }, 30)
                                })
                            }
                            pauseLayer() {
                                this.pauseStory(), addClass(this.layerEl, "paused")
                            }
                            resumeLayer() {
                                this._updateVolumeButton(), this.activeStory.volumeUpdate(), this.activeStory && !this.activeStory.story.isNarrativeMetaStory && (this.playStory(), removeClass(this.layerEl, "paused"), this.activeStory.feedbackScroll && this.activeStory.feedbackScroll.update())
                            }
                            setLayerVisibility(e) {
                                toggle(this.layerEl, e)
                            }
                            _renderVolumeControl() {
                                return this.volumeControl = se('<div class="stories_volume_control">\n  <div class="stories_volume_control_slide_wrap">\n    <div class="stories_volume_control_slide">\n      <div class="stories_volume_control_slide_indicator"></div>\n    </div>\n  </div>\n</div>'), addEvent(geByClass1("stories_volume_control_slide_wrap", this.volumeControl), "mousedown", this._volumeControlOnMouseDown.bind(this)), addEvent(this.volumeControl, "mousedown", this._volumeControlOnClick.bind(this)), this.volumeControlContainer = ce("div", {
                                    className: "stories_volume_control_container"
                                }), this.volumeControlContainer.appendChild(this.volumeControl), this.volumeControlContainer
                            }
                            _volumeControlOnMouseDown(e) {
                                addClass(this.volumeControlContainer, "changing");
                                var t = geByClass1("stories_volume_control_slide", this.volumeControl),
                                    s = geByClass1("stories_volume_control_slide_indicator", t),
                                    i = Qe(getXY(t), 1)[0],
                                    r = Qe(getSize(t), 1)[0],
                                    o = e => {
                                        var t = Math.max(0, Math.min(e.pageX - i, r)) / r * 100;
                                        setStyle(s, "width", t + "%"), b(t / 100), this.activeStory.volumeUpdate()
                                    },
                                    a = () => {
                                        removeEvent(window, "mousemove", o), removeEvent(window, "mouseup", a), this._updateVolumeButton(), removeClass(this.volumeControlContainer, "changing")
                                    };
                                addEvent(window, "mousemove", o), addEvent(window, "mouseup", a), o(e)
                            }
                            _updateVolumeButton() {
                                var e = 100 * y();
                                toggleClass(this.volumeControl, "low", e > 0 && e < 50), toggleClass(this.volumeControl, "high", e >= 50);
                                var t = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
                                setStyle(t, "width", e + "%")
                            }
                            _volumeControlOnClick(e) {
                                if (!hasClass(e.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControlContainer, "changing")) {
                                    var t = y();
                                    b(t = t ? 0 : 1), this._updateVolumeButton(), this.activeStory.volumeUpdate()
                                }
                            }
                            onReplyDeleted(e) {
                                this.activeStory && this.activeStory.onReplyDeleted(e)
                            }
                            _markStoryAsSkipped() {
                                this.storiesSkip.push(this.getStoryRaw())
                            }
                            _hasContext(e) {
                                return !(!this.extra || !this.extra.context || this.extra.context !== e)
                            }
                        }(e.blockKey, e.list, e.items, e.extra, t), t);
                        var s = Object(Be.b)();
                        s && (t.fromEl = null, "stories" === s.wkRaw ? (s._hide(!1, !0, !0), s.forceHide = !0, cur.storiesArchiveBoxGUID = s.guid) : s.hide())
                    }).catch(e => {
                        vk.dev && debugLog(e), showFastBox(Object(Le.d)("global_error"), Object(Le.d)("global_unknown_error"))
                    })
                },
                _getUnreadStory(e, t) {
                    e = intval(e);
                    for (var s = !1, i = 0; i < t.length; i++)
                        if (t[i].author.id === e) {
                            for (var r = t[i].items, o = 0; o < r.length; o++)
                                if (r[o].unread) {
                                    s = r[o];
                                    break
                                }
                            s || (s = r[0]);
                            break
                        }
                    return s
                },
                getList: e => new Ve((t, s) => {
                    var i = Ue(e.split("/"), 3),
                        r = i[0],
                        o = i[1],
                        a = i[2],
                        n = {
                            blockKey: r,
                            list: o,
                            extra: a
                        },
                        l = ze._getList(o);
                    isArray(l) ? (n.items = l, t(n)) : ajax.post("al_stories.php", {
                        act: "get_list",
                        list: o,
                        story_raw: r,
                        extra: a,
                        from_manage: window.cur.module === ae ? 1 : 0
                    }, {
                        loader: !0,
                        onDone(e) {
                            cur["stories_list_" + o] = e.list, n.items = e.list, e.recommendations && (cur["stories_list_" + o + "_recommendations"] = e.recommendations), t(n)
                        },
                        onFail: () => (s(), !0)
                    })
                }),
                _getList: e => cur["stories_list_" + e],
                _setList(e, t) {
                    cur["stories_list_" + e] = t
                },
                removeList(e) {
                    delete cur["stories_list_" + e]
                },
                _parseList(e) {
                    var t = Ue((e = decodeURIComponent(e)).match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\:\;\-]+))?$/i), 7),
                        s = t[1],
                        i = t[2],
                        r = t[4],
                        o = t[6],
                        a = s + "_" + i;
                    return e.match(/from_feed\=1/) ? r = "feed" : e.match(/profile\=1/) ? r = "profile" : r || (r = a), a + "/" + r + "/" + o
                },
                initFeed() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "stories_feed_items_container";
                    e = Object(te.G)(e);
                    var t = Object(te.I)("stories_feed_items", e),
                        s = attr(t, "id");

                    function i() {
                        addEvent(e, browserFeatures.wheelEvent, ze.feedMouseWheel)
                    }

                    function r() {
                        removeEvent(e, browserFeatures.wheelEvent, ze.feedMouseWheel)
                    }
                    ze.updateFeedArrows(s), addEvent(e, "mouseenter", i), addEvent(e, "mouseleave", r), cur.destroy.push(function() {
                        removeEvent(e, browserFeatures.wheelEvent, ze.feedMouseWheel), removeEvent(e, "mouseenter", i), removeEvent(e, "mouseleave", r)
                    })
                },
                feedNext(e) {
                    var t = Object(te.G)("stories_feed_wrap");
                    return e && (t = domClosest("stories_feed_wrap", e.target)), this.feedPaging("next", null, t)
                },
                feedPrev(e) {
                    var t = Object(te.G)("stories_feed_wrap");
                    return e && (t = domClosest("stories_feed_wrap", e.target)), this.feedPaging("prev", null, t)
                },
                feedPaging(e, t, s) {
                    s || (s = Object(te.G)("stories_feed_wrap"));
                    var i = Object(te.I)("stories_feed_items", s),
                        r = attr(i, "id"),
                        o = r + "_position",
                        a = cur[o] || 0,
                        n = getSize(s)[0];
                    if (isNumeric(e)) a += e;
                    else {
                        var l = n - 100;
                        "next" === e ? a += l : a -= l
                    }
                    cur[o] = Math.max(0, Math.min(a, i.scrollWidth - n)), t ? Object(te.ib)(i, "animated") : Object(te.a)(i, "animated"), setStyle(i, "transform", "translateX(-" + cur[o] + "px)"), ze.updateFeedArrows(r)
                },
                feedScrollToOwner(e) {
                    var t = Object(te.G)("feed_story_" + e);
                    if (t) {
                        var s = domClosest("stories_feed_items", t),
                            i = s.offsetWidth,
                            r = attr(s, "id") + "_position",
                            o = t.offsetWidth,
                            a = t.offsetLeft,
                            n = domClosest("stories_feed_wrap", s);
                        cur[r] = a - i + i / 2 + o / 2, ze.feedPaging(0, !0, n)
                    }
                },
                updateFeedStories(e, t) {
                    var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "stories_feed_items",
                        i = Object(te.G)(s),
                        r = domClosest("stories_feed_wrap", i);
                    if (e = e || "news", i)
                        if (inArray(e, ["news", "search"])) {
                            var o = (e, i) => {
                                t && t.cb && t.cb(), this._setList("feed", i);
                                var o = Object(te.G)(s);
                                o && (e ? (setStyle(o, "transform", "translateX(0px)"), Object(te.Ab)(o, e), o.children.length < 6 ? Object(te.a)(r, "stories_feed_not_nav_buttons") : Object(te.ib)(r, "stories_feed_not_nav_buttons"), cur[s + "_position"] = 0, ze.updateFeedArrows(s), show(r)) : hide(r))
                            };
                            if (t && t.stories) {
                                var a = t.section,
                                    n = t.q,
                                    l = t.stories,
                                    d = l.html,
                                    h = l.js;
                                return "search" !== a || n && h.length ? void o(d, h) : void hide(r)
                            }
                            ajax.post("al_stories.php", {
                                act: "feed_stories"
                            }, {
                                onDone: o
                            })
                        } else hide(r)
                },
                feedMouseWheel(e) {
                    var t = domClosest("stories_feed_wrap", e.target);
                    if (!hasClass(t, "stories_feed_not_nav_buttons")) {
                        cancelEvent(e);
                        var s = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                        ze.feedPaging(s, 1, t)
                    }
                },
                updateFeedArrows() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "stories_feed_items",
                        t = Object(te.G)(e),
                        s = e + "_position";
                    if (t) {
                        cur[s] || (cur[s] = 0);
                        var i = Object(te.I)("stories_feed_wrap").offsetWidth,
                            r = t.scrollWidth - i,
                            o = Object(te.I)("stories_feed_arrow_left", domPN(t)),
                            a = Object(te.I)("stories_feed_arrow_right", domPN(t));
                        0 === cur[s] ? Object(te.a)(o, "disabled") : Object(te.ib)(o, "disabled"), cur[s] === r || r <= 0 ? Object(te.a)(a, "disabled") : Object(te.ib)(a, "disabled")
                    }
                },
                showBlackList() {
                    cur.storyLayer && cur.storyLayer.pauseStory(), showBox("al_stories.php", {
                        act: "black_list"
                    }, {
                        onDone() {
                            cur.storiesBlackListScroll = new uiScroll("stories_black_list_result")
                        },
                        params: {
                            onHide: () => {
                                cur.storyLayer && cur.storyLayer.playStory()
                            }
                        }
                    })
                },
                blackListItemClick(e, t) {
                    cancelEvent(t);
                    var s = intval(attr(e, "data-id"));
                    cur.storiesBlackListShown[s] ? (delete cur.storiesBlackListShown[s], Object(te.ib)(e, "olist_item_wrap_on")) : (cur.storiesBlackListShown[s] = 1, Object(te.a)(e, "olist_item_wrap_on"))
                },
                saveBlackList(e) {
                    var t = Object.keys(cur.storiesBlackListShown);
                    0 !== t.length ? ajax.post("al_stories.php", {
                        act: "save_blacklist",
                        hash: cur.storiesBlackList.hash,
                        list: t.join(",")
                    }, {
                        onDone() {
                            Object(Be.b)().hide(), ze.updateFeedStories()
                        },
                        showProgress: lockButton.pbind(e),
                        hideProgress: unlockButton.pbind(e)
                    }) : Object(Be.b)().hide()
                },
                blacklistUpdateUsers(e) {
                    var t = e;
                    if (e = trim(e).toLowerCase(), cur.storiesBlacklistLastQ !== e) {
                        cur.storiesBlacklistLastQ = e;
                        var s = e ? cur.storiesIndexer.search(e) : cur.storiesBlackList.users,
                            i = [];
                        if (e)
                            for (var r = 0; r < e.length; r++) i.push(e.substr(r, 1));
                        for (var o = new RegExp(i.join(".*?"), "i"), a = "", n = 0; n < s.length; n++) {
                            var l = s[n],
                                d = e ? l.name.replace(o, e => `<em>${e}</em>`) : l.name;
                            a += cur.storiesBlackList.tpl.replace(/\{id\}/g, l.id).replace("{photo}", l.photo).replace("{name}", d).replace("{href}", l.href).replace("{class_name}", cur.storiesBlackListShown[l.id] ? " olist_item_wrap_on" : "")
                        }
                        a || (a = '<div class="no_rows">' + Object(Le.d)("global_search_not_found").replace("{search}", clean(t)) + "</div>"), Object(te.Ab)(Object(te.I)("olist", "stories_black_list_result"), a)
                    }
                },
                blackListInit(e) {
                    cur.storiesBlackListShown = {}, cur.storiesBlackList = e, Object(Be.b)().setOptions({
                        width: 450,
                        bodyStyle: "padding: 0px",
                        onClean: function() {
                            this.storyLayer && this.storyLayer.playStory(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
                        }
                    }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, e => e.name, () => {
                        ze.blacklistUpdateUsers("")
                    }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), Object(Be.b)().addButton(Object(Le.d)("global_save"), ze.saveBlackList).addButton(Object(Le.d)("global_cancel"), void 0, "no")) : Object(Be.b)().addButton(Object(Le.d)("global_close"))
                },
                preloadUrl(e) {
                    _(e)
                },
                showNextRepliesChunk(e) {
                    var t = gpeByClass("stories_feedback_replies_items", e);
                    Object(te.ib)(Object(te.I)("stories_replies_chunk_hidden", t), "stories_replies_chunk_hidden");
                    var s = Object(te.I)("stories_replies_chunk_hidden", t);
                    s ? Object(te.Ab)(e, langNumeric(Object(Le.d)("stories_replies_more_button", intval(attr(s, "data-size"))))) : re(e), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
                },
                groupStoriesBlockUpdate() {
                    var e = ze._getList("group_stories"),
                        t = e && e[0] && e[0].items;
                    if (t) {
                        for (var s = 0, i = 0; i < t.length; i++) {
                            t[i].unread && s++
                        }
                        var r = Object(te.I)("stories_groups_block_stories_wrap"),
                            o = Object(te.I)("stories_groups_block_stories_button", r);
                        Object(te.xb)(r, "has_unread", s > 0), Object(te.xb)(r, "has_stories", t.length > 0), Object(te.xb)(o, "has_stories", t.length > 0);
                        var a = Object(Z.d)(cur.storiesPreviews),
                            n = a.splice(a.length - s, 3);
                        n.length < 3 && (n = n.concat(a.slice(0, 3 - n.length))), n.reverse();
                        for (var l = "", d = n.length - 1; d >= 0; d--) l += cur.storiesPreviewsRowHtml.replace("{url}", n[d]);
                        Object(te.Ab)(Object(te.I)("stories_groups_block_stories_rows", r), l)
                    }
                },
                isLiveShown: e => !!(cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.isActiveLive()) && cur.storyLayer.activeStory.story.videoRaw === e,
                activeLiveEnded(e) {
                    cur.storyLayer.activeStory.onLiveEnded(e)
                },
                updateLiveViewersCount(e) {
                    var t = e ? Object(Le.d)("stories_live_N_watching", e, !0) : "";
                    cur.storyLayer.activeStory.updateLiveViewersCount(t)
                }
            };
        window.Stories = ze;
        try {
            stManager.done("stories.js")
        } catch (e) {}
    },
    Hx9h: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return n
        });
        s("91GP"), s("ioFf"), s("rGqo"), s("Btvt");
        var i = s("q1tI"),
            r = (s("17x9"), s("pemR"));

        function o() {
            return (o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            }).apply(this, arguments)
        }

        function a(e, t) {
            if (null == e) return {};
            var s, i, r = function(e, t) {
                if (null == e) return {};
                var s, i, r = {},
                    o = Object.keys(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                return r
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || Object.prototype.propertyIsEnumerable.call(e, s) && (r[s] = e[s])
            }
            return r
        }
        class n extends i.Component {
            render() {
                var e = this.props,
                    t = e.className,
                    s = e.appearance,
                    n = e.wide,
                    l = e.overflow,
                    d = e.size,
                    h = a(e, ["className", "appearance", "wide", "overflow", "size"]),
                    c = Object(r.a)("Button", ...Array.isArray(s) ? s.map(e => `Button--${e}`) : [`Button--${s}`], `Button--size-${d}`, {
                        "Button--wide": !!n,
                        "Button--overflow": !!l,
                        "Button--disabled": !!e.disabled
                    }, t);
                return i.createElement("button", o({}, h, {
                    className: c
                }), e.children)
            }
        }
        n.defaultProps = {
            appearance: "primary",
            size: "m",
            wide: !1,
            disabled: !1
        }
    },
    KFTi: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return o
        });
        var i = s("q1tI"),
            r = (s("17x9"), s("pemR"));

        function o(e) {
            var t = Object(r.a)("Progress", {
                "Progress--inverted": e.inverted
            }, e.className);
            return i.createElement("div", {
                className: t
            }, i.createElement("div", {
                className: "Progress__item"
            }), i.createElement("div", {
                className: "Progress__item"
            }), i.createElement("div", {
                className: "Progress__item"
            }))
        }
        o.defaultProps = {
            inverted: !1
        }
    },
    N1NS: function(e, t, s) {
        "use strict";
        s("rE2o"), s("ioFf"), s("rGqo"), s("Btvt"), s("KKXr");

        function i(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var r = new window.Map;

        function o(e) {
            var t = r.get(e.currentTarget);
            if (t) {
                var s = t[e.type];
                if (s)
                    for (var o, a = 0; a < s.length; a++) {
                        var n = i(s[a], 2),
                            l = n[0],
                            d = n[1],
                            h = void 0;
                        if (hasClass(e.target, l) ? h = d(e, e.target) : (o = gpeByClass(l, e.target, e.currentTarget)) && (h = d(e, o)), !1 === h) break
                    }
            }
        }
        s.d(t, "b", function() {
            return d
        }), s.d(t, "a", function() {
            return c
        }), s.d(t, "c", function() {
            return u
        });
        var a = window,
            n = a.addEvent,
            l = a.removeEvent;

        function d(e) {
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

        function h(e, t, s, i, a) {
            ! function(e, t, s, i) {
                var a = r.get(e);
                a || (r.set(e, {}), a = r.get(e));
                for (var n = t.split(" "), l = 0; l < n.length; l++) {
                    var d = n[l];
                    a[d] || (a[d] = [], addEvent(e, d, o)), a[d].push([s, i])
                }
            }(t, s, i, a), e._registeredHandlers.push(["delegate", t, s, i, a])
        }

        function c(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, s, i) {
                n(t, s, i), e._registeredHandlers.push(["bind", t, s, i])
            }.bind(null, t), h.bind(null, t)), t
        }

        function u(e) {
            e._registeredHandlers.forEach(e => {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, s, i) {
                    var a = r.get(e);
                    a && (t.split(" ").forEach(t => {
                        a[t] && (a[t] = a[t].filter(e => e[0] !== s || e[1] !== i), 0 === a[t].length && removeEvent(e, t, o))
                    }), 0 === Object.keys(a).map(e => a[e].length).reduce((e, t) => e + t) && r.delete(e))
                }(...t) : l(...t)
            }), e._registeredHandlers = []
        }
    },
    PjZB: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return r
        });
        s("rGqo"), s("a1Th"), s("Btvt");
        var i = s("q1tI");
        s("17x9");
        class r extends i.Component {
            constructor(e) {
                super(e), this.id = Math.round(1e6 * Math.random()).toString(16), this.setSpinnerParams(e)
            }
            componentWillReceiveProps(e) {
                this.setSpinnerParams(e)
            }
            setSpinnerParams(e) {
                this.offset = Math.round(Math.PI * e.size), this.c = .5 * e.size, this.animation = function(e, t) {
                    if (!e || !t) return "";
                    var s = Object.keys(t).map(e => e + " {" + Object.keys(t[e]).map(s => s + ":" + t[e][s]).join(";") + "}").join("");
                    return `@-webkit-keyframes ${e} {${s}} @keyframes ${e} {${s}}`
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
                    s = e.color,
                    r = e.size,
                    o = e.duration,
                    a = e.strokeWidth,
                    n = this.id,
                    l = this.offset,
                    d = this.animation;
                return i.createElement("div", {
                    className: "Spinner",
                    style: t
                }, i.createElement("svg", {
                    className: "Spinner__svg",
                    width: r,
                    height: r,
                    viewBox: `0 0 ${r} ${r}`,
                    xmlns: "http://www.w3.org/2000/svg"
                }, i.createElement("g", {
                    style: {
                        width: r,
                        height: r,
                        transformOrigin: .5 * r + "px " + .5 * r + "px"
                    }
                }, i.createElement("style", {
                    dangerouslySetInnerHTML: {
                        __html: d
                    }
                }), i.createElement("circle", {
                    className: "Spinner__path",
                    fill: "none",
                    stroke: s,
                    strokeDasharray: l,
                    strokeDashoffset: l,
                    strokeWidth: a,
                    style: {
                        animationName: "dash" + n,
                        animationTimingFunction: "ease-in-out",
                        animationDuration: o + "s",
                        animationIterationCount: "infinite"
                    },
                    cx: .5 * r,
                    cy: .5 * r,
                    r: .5 * r - .5 * a
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
    "T/g7": function(e, t, s) {
        "use strict";
        s.d(t, "b", function() {
            return n
        });
        var i = s("nAFc"),
            r = {},
            o = window.getLang,
            a = window.langNumeric;

        function n(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                s = arguments.length > 2 ? arguments[2] : void 0,
                n = "number" == typeof t,
                l = e + (t || n ? ".raw" : "");
            if (void 0 === r[l]) {
                var d = t || n ? o(e, "raw") : o(e);
                "string" == typeof d ? r[l] = Object(i.a)(d) : Array.isArray(d) && (r[l] = d.map(i.a))
            }
            return n ? a(t, r[l], s) : r[l] || ""
        }
        t.a = {
            getLang: n
        }
    },
    "Tn+0": function(e, t, s) {
        "use strict";
        s.d(t, "b", function() {
            return i
        }), s.d(t, "c", function() {
            return r
        }), s.d(t, "a", function() {
            return o
        }), s.d(t, "e", function() {
            return a
        }), s.d(t, "d", function() {
            return n
        });
        s("pIFo");
        var i = "sf",
            r = "sf_report",
            o = 1e3;

        function a(e) {
            return gpeByClass(r, e).id.replace("report", "")
        }

        function n(e) {
            var t = gpeByClass(r, e),
                s = geByClass1("decision_result", t);
            return domData(s, "decision_raw_id")
        }
    },
    WbBG: function(e, t, s) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    },
    XpgC: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return l
        });
        s("91GP");
        var i = s("q1tI"),
            r = s("i8i4"),
            o = (s("17x9"), s("pemR")),
            a = s("clTp"),
            n = () => "undefined" != typeof window;
        class l extends i.Component {
            constructor(e) {
                super(e), this.onMouseEnter = (e => {
                    if (this.el) {
                        var t = this.props,
                            s = t.text,
                            i = t.position,
                            r = t.align,
                            o = t.marginTop,
                            n = t.marginLeft,
                            l = t.maxWidth,
                            d = t.appearance,
                            h = Object(a.a)(this.el);
                        this.update({
                            text: s,
                            position: i,
                            align: r,
                            rect: h,
                            marginTop: o,
                            marginLeft: n,
                            maxWidth: l,
                            appearance: d
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
                        s = e.y,
                        r = e.position,
                        a = e.align,
                        n = e.text,
                        l = e.removed,
                        d = e.maxWidth,
                        h = e.appearance,
                        c = Object(o.a)("Tooltip", `Tooltip--${r}`, `Tooltip--${h}`, {
                            "Tooltip--removed": !!l,
                            [`Tooltip--align-${a}`]: "t" === r || "b" === r
                        });
                    return i.createElement("div", {
                        className: c,
                        style: {
                            top: s,
                            left: t
                        },
                        onTransitionEnd: this.onTransitionEnd
                    }, i.createElement("div", {
                        className: "Tooltip__in",
                        style: {
                            maxWidth: d
                        },
                        dangerouslySetInnerHTML: {
                            __html: n
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
                var t = e.position,
                    s = e.align,
                    i = e.text,
                    r = e.rect,
                    o = e.marginTop,
                    a = e.marginLeft,
                    n = e.maxWidth,
                    l = e.appearance,
                    d = r.left,
                    h = r.top;
                switch (t) {
                    case "t":
                        d += .5 * r.width;
                        break;
                    case "r":
                        d += r.width, h += .5 * r.height;
                        break;
                    case "b":
                        d += .5 * r.width, h += r.height;
                        break;
                    case "l":
                        h += .5 * r.height
                }
                d = Math.round(d + a), h = Math.round(h + o), this.setState({
                    tooltip: {
                        position: t,
                        align: s,
                        text: i,
                        x: d,
                        y: h,
                        maxWidth: n,
                        appearance: l
                    }
                })
            }
            render() {
                var e = this.renderTooltip();
                return e ? (!this.defaultNode && n() && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), i.createElement(i.Fragment, null, this.props.children, r.createPortal(e, this.defaultNode))) : this.props.children
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
    clTp: function(e, t, s) {
        "use strict";

        function i(e) {
            var t = e.getBoundingClientRect(),
                s = document.body,
                i = document.documentElement,
                r = window.pageYOffset || i.scrollTop || s.scrollTop,
                o = window.pageXOffset || i.scrollLeft || s.scrollLeft,
                a = i.clientTop || s.clientTop || 0,
                n = i.clientLeft || s.clientLeft || 0;
            return {
                top: Math.round(t.top + r - a),
                left: Math.round(t.left + o - n),
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
        s.d(t, "a", function() {
            return i
        })
    },
    nAFc: function(e, t, s) {
        "use strict";
        s.d(t, "c", function() {
            return a
        }), s.d(t, "a", function() {
            return n
        }), s.d(t, "b", function() {
            return l
        }), s.d(t, "d", function() {
            return d
        });
        s("rE2o"), s("ioFf"), s("rGqo"), s("Oyvg"), s("pIFo");

        function i(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var s = [],
                    i = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var a, n = e[Symbol.iterator](); !(i = (a = n.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0);
                } catch (e) {
                    r = !0, o = e
                } finally {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (r) throw o
                    }
                }
                return s
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var r = window.Emoji,
            o = [
                ["&amp;", "&"],
                ["&lt;", "<"],
                ["&gt;", ">"],
                ["&quot;", '"']
            ];

        function a(e) {
            return o.reduce((e, t) => {
                var s = i(t, 2),
                    r = s[0],
                    o = s[1];
                return e.replace(new RegExp(o, "ig"), r)
            }, e)
        }

        function n(e) {
            return o.reduce((e, t) => {
                var s = i(t, 2),
                    r = s[0],
                    o = s[1];
                return e.replace(new RegExp(r, "ig"), o)
            }, e).replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(t))
        }

        function l(e) {
            return a(e).replace(/[\u00A0-\u9999<>\&]/gim, e => `&#${e.charCodeAt(0)};`)
        }

        function d(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                s = t.lineBreak,
                i = void 0 !== s && s,
                o = t.convertEmoji,
                l = void 0 === o || o,
                d = n(e);
            return d = d.replace(/\n\r/gi, "\n"), "oneline" === i ? d = d.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === i && (d = d.replace(/\n/gi, "<br>")), d = a(d), l && (d = r.emojiToHTML(d, !0)), d
        }
    },
    r7nW: function(e, t, s) {
        "use strict";
        var i = s("q1tI"),
            r = s("i8i4"),
            o = (s("17x9"), s("pemR"));
        class a extends i.Component {
            constructor() {
                super(...arguments), this.getScrollbarWidth = (() => {
                    var e = document.createElement("div");
                    e.classList.add("BaseModal__scrollbarMeasure"), document.body.appendChild(e);
                    var t = e.getBoundingClientRect().width - e.clientWidth;
                    return document.body.removeChild(e), t
                }), this.hideScrollBar = (() => {
                    var e = document.body.getBoundingClientRect(),
                        t = e.left + e.right < window.innerWidth,
                        s = this.getScrollbarWidth();
                    this.calculatedPadding = window.getComputedStyle(document.body)["padding-right"], t && (document.body.style.paddingRight = `${parseFloat(this.calculatedPadding)+s}px`), document.body.classList.add("BaseModal__bodyHiddenOverflow")
                }), this.showScrollBar = (() => {
                    document.body.style.paddingRight = this.calculatedPadding, document.body.classList.remove("BaseModal__bodyHiddenOverflow")
                }), this.onDocumentKeyDown = (e => {
                    var t = this.props.onClose;
                    "Escape" === e.key && t()
                }), this.onBackdropClick = (() => {
                    var e = this.props,
                        t = e.onClose;
                    !e.disableBackdropClick && t()
                })
            }
            componentDidMount() {
                var e = this.props,
                    t = e.disableEscapeClose,
                    s = e.disableBodyScroll;
                t || document.body.addEventListener("keydown", this.onDocumentKeyDown), s && this.hideScrollBar()
            }
            componentWillUnmount() {
                var e = this.props,
                    t = e.disableEscapeClose,
                    s = e.disableBodyScroll;
                t || document.body.removeEventListener("keydown", this.onDocumentKeyDown), s && this.showScrollBar()
            }
            renderModal() {
                var e = this.props.className,
                    t = Object(o.a)("BaseModal", e);
                return i.createElement("div", {
                    className: t,
                    "aria-modal": "true"
                }, i.createElement("div", {
                    className: "BaseModal__backdrop",
                    onClick: this.onBackdropClick
                }), i.createElement("div", {
                    className: "BaseModal__content"
                }, this.props.children))
            }
            render() {
                return r.createPortal(this.renderModal(), document.body)
            }
        }
        a.defaultProps = {
            className: "",
            children: null,
            disableBackdropClick: !1,
            disableEscapeClose: !1,
            disableBodyScroll: !1
        }, t.a = a
    }
});