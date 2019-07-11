! function(e) {
    function t(t) {
        for (var i, a, n = t[0], l = t[1], d = t[2], c = 0, _ = []; c < n.length; c++) a = n[c], r[a] && _.push(r[a][0]), r[a] = 0;
        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
        for (h && h(t); _.length;) _.shift()();
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
    o.push([144, "bundles/common", "bundles/vendors", "bundles/ac99d2ffeaccefc84858f73dcbf7df37"]), s()
}({
    "0Rlc": function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return a
        });
        s("rGqo"), s("Btvt");
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
        class a extends i.Component {
            constructor(...e) {
                super(...e), this.onChange = (e => {
                    this.props.onChange && this.props.onChange(this.props.name, e.target.checked)
                })
            }
            render() {
                var e = this.props,
                    {
                        children: t,
                        checked: s,
                        disabled: a,
                        name: n,
                        id: l
                    } = e,
                    d = function(e, t) {
                        if (null == e) return {};
                        var s, i, r = {},
                            o = Object.keys(e);
                        for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                        return r
                    }(e, ["children", "checked", "disabled", "name", "id"]),
                    h = Object(r.a)("CheckBox", {
                        "CheckBox--disabled": a
                    });
                return i.createElement("label", {
                    className: h
                }, i.createElement("input", o({}, d, {
                    className: "CheckBox__input",
                    id: l,
                    type: "checkbox",
                    checked: s,
                    name: n,
                    disabled: a,
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
        var l = ({
            title: e,
            onClose: t,
            appearance: s
        }) => {
            var r = Object(a.a)("Modal__header", `Modal__header--${s}`);
            return i.createElement("div", {
                className: r
            }, i.createElement("div", {
                className: "Modal__headerInner"
            }, i.createElement("h1", {
                className: "Modal__headerTitle"
            }, e), i.createElement("button", {
                className: "Modal__headerCross",
                type: "button",
                onClick: t
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
            var {
                className: t,
                appearance: s,
                title: o,
                actionButtons: l,
                onClose: d,
                children: c
            } = e, _ = Object(a.a)("Modal", `Modal--${s}`, t);
            return i.createElement(r.a, n({}, e, {
                className: _
            }), i.createElement(h.Header, {
                title: o,
                onClose: d,
                appearance: s
            }), Boolean(c) && i.createElement(h.Body, null, c), i.createElement(h.Footer, {
                actionButtons: l
            }))
        };
        h.Header = l, h.Body = d, h.Footer = (({
            actionButtons: e
        }) => i.createElement("div", {
            className: "Modal__footer"
        }, i.createElement("div", {
            className: "Modal__footerInner"
        }, e))), h.defaultProps = n({}, r.a.defaultProps, {
            appearance: "white"
        }), t.a = h
    },
    144: function(e, t, s) {
        e.exports = s("EJ7F")
    },
    "6raB": function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return l
        });
        s("rGqo"), s("Btvt");
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
        class l extends i.Component {
            constructor(e) {
                super(e), this.needRecalcSize = !1, this.state = {}
            }
            render() {
                var e = this.props,
                    {
                        className: t,
                        loading: s,
                        children: l
                    } = e,
                    d = function(e, t) {
                        if (null == e) return {};
                        var s, i, r = {},
                            o = Object.keys(e);
                        for (i = 0; i < o.length; i++) s = o[i], t.indexOf(s) >= 0 || (r[s] = e[s]);
                        return r
                    }(e, ["className", "loading", "children"]),
                    h = Object(r.a)("ButtonWithProgress", {
                        "ButtonWithProgress--loading": s
                    }, t);
                return i.createElement(a.a, n({}, d, {
                    className: h
                }), i.createElement("span", {
                    className: "ButtonWithProgress__content"
                }, l), s && i.createElement(o.a, {
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
    As6E: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return h
        });
        s("rGqo"), s("Btvt");
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
                        var {
                            text: e,
                            position: t,
                            align: s,
                            marginTop: i,
                            marginLeft: r
                        } = this.props, o = Object(a.a)(this.el);
                        this.update({
                            text: e,
                            position: t,
                            align: s,
                            rect: o,
                            marginTop: i,
                            marginLeft: r
                        })
                    } else this.update()
                }), this.onMouseEnter = (e => {
                    this.callerHovered = !0, this.timeouts.appear = setTimeout(() => {
                        if (this.el && this.callerHovered) {
                            var {
                                position: e,
                                align: t,
                                marginTop: s,
                                marginLeft: i
                            } = this.props, r = Object(a.a)(this.el);
                            this.update({
                                position: e,
                                align: t,
                                rect: r,
                                marginTop: s,
                                marginLeft: i
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
                        var {
                            text: t,
                            position: s,
                            align: i,
                            marginTop: r,
                            marginLeft: o
                        } = this.props, n = Object(a.a)(this.el);
                        this.update({
                            text: t,
                            position: s,
                            align: i,
                            rect: n,
                            marginTop: r,
                            marginLeft: o
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
                    align: s,
                    rect: i,
                    marginTop: r,
                    marginLeft: o
                } = e, a = i.left, n = i.top;
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
                var {
                    x: e,
                    y: t,
                    position: s,
                    align: r,
                    removed: a
                } = this.state.dropdown, n = Object(o.a)("Dropdown", `Dropdown--${s}`, {
                    "Dropdown--removed": !!a,
                    [`Dropdown--align-${r}`]: "t" === s || "b" === s
                }, this.props.className);
                return i.createElement("div", {
                    className: n,
                    style: {
                        top: t,
                        left: e
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
        s("pIFo"), s("Oyvg"), s("OG14"), s("rGqo"), s("Btvt"), s("KKXr"), s("SRfc");
        var i = s("q1tI"),
            r = s("i8i4"),
            o = s("E2g8"),
            a = o.Promise,
            n = {},
            l = {},
            d = [],
            h = !1,
            c = !1;

        function _(e, t, s) {
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

        function u(e) {
            return h || ((h = new Worker("/js/cmodules/web/stories_loader_worker.js")).onmessage = (e => {
                var t = e.data;
                switch (t.type) {
                    case "loaded":
                        n[t.url] = t.data, _(t.url, !0, t.data);
                        break;
                    case "error":
                        _(t.url, !1);
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
        var w = [];

        function f(e, t) {
            cur.storyLayer && cur.storyLayer.pauseLayer(), ge("stories_layers_background") || (bodyNode.appendChild(ce("div", {
                id: "stories_layers_background",
                className: "stories_layers_background"
            })), layerQueue.hide(), layerQueue.push(), layers.fullhide = S, addEvent(window, "visibilitychange", j.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", j.resize), addEvent(document, "keydown", j.keydown), addEvent(document, "keyup", j.keyup)), cur.storyLayer = e, e.animateStory("expand", t.fromEl), w.push(e), e.length > 1 && addClass(e.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + w.length, ([t] = []) => {
                var s = arguments[0] && arguments[0].isCloseBtnClick;
                t ? e._sendNavigationStatEvents("close_auto_by_time") : e._sendNavigationStatEvents("close_tap"), w.length > 1 && !s ? e.back(!0) : (e.hideAllLayers = s, e.hide(!1, !0))
            })
        }

        function k() {
            w.length > 1 ? w[w.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
        }

        function S(e, t = !1) {
            for (var s = 0; s < w.length; s++) w[s].hide(!0);
            if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), removeEvent(window, "visibilitychange", j.visibilitychange), removeEvent(window, "resize", j.resize), removeEvent(document, "keydown", j.keydown), removeEvent(document, "keyup", j.keyup), t) {
                var i = nav.objLoc;
                delete i.w, nav.setLoc(i)
            }
            cur.needUpdateFeedStories && Stories.updateFeedStories(), w = []
        }

        function E() {
            return w[w.length - 2]
        }

        function O(e) {
            for (var t = 0; t < w.length; t++) w[t].onReplyDeleted(e)
        }
        var j = {
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
            L = (s("tUrg"), s("17x9"), s("T/g7"));

        function C({
            story: e
        }) {
            var {
                hide_settings: t
            } = e.getCurStoryData(), {
                uiActionsMenu: s
            } = window;
            if (t) return null;
            var r, o, a = function(e) {
                var t = [],
                    {
                        raw_id: s,
                        can_hide_reply: i,
                        report_hash: r,
                        can_remove: o,
                        can_share: a,
                        narrative: n,
                        is_ads: l
                    } = e.getCurStoryData(),
                    {
                        can_blacklist: d
                    } = e.data,
                    [h] = s.split("_").map(e => intval(e)),
                    c = n && !n.is_cover;
                !d || c || l || t.push({
                    label: Object(L.b)("stories_add_blacklist_button"),
                    onClick: () => e._addToBlacklist()
                });
                i && t.push({
                    label: Object(L.b)("stories_hide_reply_button"),
                    onClick: () => e._hideReply()
                });
                n && t.push({
                    label: n.is_bookmarked ? Object(L.b)("stories_narrative_remove_bookmark_button") : Object(L.b)("stories_narrative_add_bookmark_button"),
                    onClick: () => e._sendNarrativeBookmarkButtonDidPress()
                });
                a && t.push({
                    label: Object(L.b)("stories_share"),
                    onClick: () => e.shareBox()
                });
                n && n.can_edit && t.push({
                    label: Object(L.b)("stories_narrative_edit_button"),
                    onClick: () => e._sendNarrativeEditButtonDidPress()
                });
                o && e.getOwnerId() < 0 && t.push({
                    label: n ? Object(L.b)("global_narrative_delete") : Object(L.b)("global_delete"),
                    onClick: () => n ? e.removeNarrativeBox() : e.removeStoryBox()
                });
                r && t.push({
                    label: Object(L.b)("stories_report"),
                    onClick: () => e.report()
                });
                h === vk.id || c || t.push({
                    label: Object(L.b)("stories_settings"),
                    onClick: () => window.Stories.showBlackList()
                });
                return t
            }(e);
            if (0 === a.length) return null;
            return i.createElement("div", {
                className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
                onMouseEnter: t => {
                    clearTimeout(r), e.pauseStory(), s.show(o, t)
                },
                onMouseLeave: () => {
                    s.hide(o), clearTimeout(r), r = setTimeout(() => e.autoResumeStory(), 300)
                },
                ref: e => {
                    o = e
                }
            }, i.createElement("div", {
                className: "ui_actions_menu _ui_menu"
            }, a.map(({
                label: e,
                className: t,
                onClick: s
            }) => i.createElement("div", {
                key: e,
                className: "ui_actions_menu_item",
                onClick: s
            }, e))))
        }

        function T({
            story: e
        }) {
            var t = e.getReplies(),
                s = e.getViews() || "",
                {
                    can_manage: r,
                    narrative: o,
                    isNewQuestions: a
                } = e.getCurStoryData(),
                n = t.count || "",
                l = o && !o.is_cover,
                d = !(!r || !s),
                h = e.isActiveLive();
            if (l || h || !s && !n) return null;
            var c = "stories_button views _views_button" + (a ? " stories_button_new_questions" : "");
            return i.createElement("div", {
                className: c,
                onClick: t => {
                    e._hideTooltip(), e.showFeedbackTooltip(), t.stopPropagation()
                }
            }, d && i.createElement("div", {
                className: "stories_button_views"
            }, s), n && i.createElement("div", {
                className: "stories_button_replies",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(n, "%s", !0)
                }
            }))
        }
        var {
            getLang: x,
            showTooltip: B,
            trim: N,
            addEvent: P,
            removeEvent: M,
            cancelEvent: R,
            isObject: F,
            showNarrative: I
        } = window;
        class D extends i.Component {
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
                }, i.createElement(T, {
                    story: e
                }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), i.createElement(C, {
                    story: e
                })))
            }
            _renderLink() {
                var {
                    link: e
                } = this.props.story.getCurStoryData();
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
                var {
                    mask_id: e
                } = this.props.story.getCurStoryData();
                return e ? i.createElement("div", {
                    className: "stories_button mask _mask_button",
                    onMouseOver: e => B(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: x("stories_mask_tooltip")
                    }),
                    onClick: this._maskButtonDidPress.bind(this)
                }) : ""
            }
            _renderShare() {
                var {
                    can_share: e
                } = this.props.story.getCurStoryData();
                return !0 !== e ? "" : i.createElement("div", {
                    className: "stories_button share _share_button",
                    onMouseOver: e => B(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: x("stories_share")
                    }),
                    onClick: this._shareButtonDidPress.bind(this)
                })
            }
            _renderRemove() {
                var e = this.props.story,
                    {
                        can_remove: t
                    } = e.getCurStoryData();
                return !t || e.getOwnerId() < 0 ? "" : i.createElement("div", {
                    className: "stories_button remove _remove_button",
                    onMouseOver: e => B(e.target, {
                        black: 1,
                        center: 1,
                        shift: [1, 13, 0],
                        text: x("global_delete")
                    }),
                    onClick: this._removeButtonDidPress.bind(this)
                })
            }
            _canMessage() {
                var {
                    link: e,
                    can_comment: t
                } = this.props.story.getCurStoryData();
                return !(F(e) || !t || this.props.story.isLiveEnded())
            }
            _renderMessageForm() {
                var {
                    story: e
                } = this.props;
                if (this._canMessage()) return i.createElement("div", {
                    ref: "sendForm",
                    className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                }, i.createElement("div", {
                    className: "stories_send_form_text_wrap"
                }, i.createElement("div", {
                    contentEditable: !0,
                    ref: "messageInput",
                    className: "stories_send_form_text",
                    placeholder: x("stories_answer_placeholder"),
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
                    onMouseDown: e => R(e.nativeEvent)
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
                }), P(this.refs.smileButton, "click", R), placeholderInit(this.refs.messageInput, {
                    editable: !0
                })) : this.emojiId && !this.refs.messageInput && (M(this.refs.smileButton, "click", R), Emoji.destroy(this.emojiId), delete this.emojiId)
            }
            _leftSideIsEmpty() {
                var e = this.props.story,
                    {
                        can_manage: t,
                        link: s,
                        can_comment: i,
                        narrative: r
                    } = this.props.story.getCurStoryData(),
                    o = e.getReplies(),
                    a = e.getViews();
                return !(a && 0 !== parseInt(a) && !r) && (!o.count || !t) && !F(s) && !i || e.isLiveEnded()
            }
            _sendFormDidFocus() {
                var {
                    story: e
                } = this.props;
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
                var e = N(Emoji.editableVal(this.refs.messageInput));
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
                        o && (this.props.story.pauseStory(), I(o, {
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
        var A = s("0toi"),
            H = s("Hx9h"),
            W = s("6raB"),
            q = s("As6E"),
            $ = s("pemR"),
            K = s("nAFc"),
            Q = s("t7n3");
        class U extends i.Component {
            constructor(e) {
                super(e), this.componentDidUpdate = (() => {
                    this.replyTextarea.current && this.replyTextarea.current.focus()
                }), this.render = (() => {
                    var {
                        isOpenReplyModal: e,
                        isOpenReportModal: t,
                        reportReason: s,
                        replyText: r
                    } = this.state, {
                        question: o,
                        storyUrl: a
                    } = this.props, {
                        author: n,
                        canAnswer: l,
                        text: d
                    } = o, h = Object(K.a)(d), c = Object($.a)("StoryQuestion__title", {
                        "StoryQuestion__title--small": h.length > 50,
                        "StoryQuestion__title--free": !l
                    });
                    return i.createElement("div", {
                        className: "StoryQuestion"
                    }, i.createElement("div", {
                        className: "StoryQuestion__content"
                    }, this.renderAuthor(), i.createElement("span", {
                        className: c,
                        title: h
                    }, h)), i.createElement("div", {
                        className: "StoryQuestion__controls"
                    }, l && i.createElement(H.a, {
                        className: "StoryQuestion__reply",
                        appearance: "primary",
                        size: "s",
                        wide: !0,
                        onClick: this.openReplyModal.bind(this)
                    }, Object(L.b)("stories_question_reply"))), e && i.createElement(A.a, {
                        title: Object(L.b)("stories_question_reply_box_title").replace("{name}", Object(K.a)(n.nameDat)),
                        actionButtons: this.getReplyModalActions(),
                        className: "StoryQuestion__replyModal",
                        onClose: this.closeReplyModal.bind(this),
                        appearance: "blue"
                    }, i.createElement("div", {
                        className: "StoryQuestion__inner"
                    }, i.createElement("textarea", {
                        ref: this.replyTextarea,
                        className: "StoryQuestion__textarea",
                        placeholder: Object(L.b)("stories_question_reply_placeholder"),
                        onChange: this.handleChange.bind(this),
                        onKeyDown: this.handleKeyDown.bind(this),
                        value: r
                    }), i.createElement("img", {
                        srcSet: a,
                        className: "StoryQuestion__image"
                    }))), t && i.createElement(A.a, {
                        title: Object(L.b)("stories_question_author_ban"),
                        actionButtons: this.getReportModalActions(),
                        className: "StoryQuestion__reportModal StoryQuestionReportForm",
                        onClose: this.closeReportModal.bind(this),
                        appearance: "blue"
                    }, i.createElement("div", {
                        className: "StoryQuestionReportForm__content"
                    }, i.createElement("h4", {
                        className: "StoryQuestionReportForm__title"
                    }, Object(L.b)("stories_question_report_reason")), i.createElement("div", {
                        className: "StoryQuestionReportForm__items",
                        role: "radiogroup"
                    }, this.reportReasons.map(e => i.createElement("div", {
                        className: "radiobtn" + (s === e[0] ? " on" : ""),
                        onClick: () => this.setState({
                            reportReason: e[0]
                        }),
                        role: "radio",
                        "aria-checked": "false",
                        tabIndex: "0",
                        key: e
                    }, Object(L.b)(e[1])))))))
                }), this.renderAuthor = (() => {
                    var {
                        id: e,
                        isAnonymous: t,
                        author: s
                    } = this.props.question, r = Object(K.a)(s.name);
                    return i.createElement("div", {
                        className: "StoryQuestion__header"
                    }, t && i.createElement("span", {
                        className: "StoryQuestion__author"
                    }, r), !t && i.createElement("a", {
                        href: s.link,
                        className: "StoryQuestion__author",
                        onClick: () => cur.storyLayer._sendNavigationStatEvents("question_go_to_author", !0, {
                            questionId: e
                        })
                    }, r), i.createElement(q.a, {
                        position: "b",
                        align: "right",
                        trigger: "hover",
                        data: this.getActions()
                    }, i.createElement("a", {
                        className: "StoryQuestion__actions"
                    })))
                }), this.openReplyModal = (() => {
                    this.setState({
                        isOpenReplyModal: !0
                    })
                }), this.closeReplyModal = (() => {
                    this.setState({
                        isOpenReplyModal: !1
                    })
                }), this.openReportModal = (() => {
                    this.setState({
                        isOpenReportModal: !0
                    })
                }), this.closeReportModal = (() => {
                    this.setState({
                        isOpenReportModal: !1
                    })
                }), this.resetReplyText = (() => {
                    this.setState({
                        replyText: ""
                    })
                }), this.getReplyModalActions = (() => {
                    var {
                        isReplyButtonLoading: e,
                        replyText: t
                    } = this.state;
                    return [i.createElement(H.a, {
                        key: "closeReplyModal",
                        appearance: "tertiary",
                        onClick: this.closeReplyModal
                    }, Object(L.b)("global_cancel")), i.createElement(W.a, {
                        key: "replySend",
                        loading: e,
                        disabled: !Object(Q.H)(t),
                        onClick: this.sendReply.bind(this)
                    }, Object(L.b)("stories_question_reply_send"))]
                }), this.getReportModalActions = (() => {
                    var {
                        isReportButtonLoading: e
                    } = this.state;
                    return [i.createElement(H.a, {
                        key: "closeReplyModal",
                        appearance: "tertiary",
                        onClick: this.closeReportModal.bind(this)
                    }, Object(L.b)("global_cancel")), i.createElement(W.a, {
                        key: "reportSend",
                        loading: e,
                        onClick: this.sendReport.bind(this)
                    }, Object(L.b)("stories_question_report_send"))]
                }), this.handleChange = (e => {
                    this.setState({
                        replyText: e.target.value
                    })
                }), this.handleKeyDown = (e => {
                    var {
                        replyText: t
                    } = this.state;
                    Object(Q.H)(t) && "keydown" === e.type && (e.ctrlKey || e.metaKey) && e.keyCode == KEY.RETURN && this.sendReply()
                }), this.sendReply = (() => {
                    var {
                        replyText: e
                    } = this.state, {
                        question: t,
                        showMessage: s
                    } = this.props, {
                        text: i,
                        id: r,
                        ownerId: o,
                        storyOwnerId: a,
                        storyId: n,
                        sendHash: l
                    } = t, d = `${e}\n\n🗣 ${Object(Q.I)(i)}`, h = `story:${a}_${n}`;
                    ajax.post("al_im.php", {
                        act: "a_send",
                        msg: d,
                        hash: l,
                        media: h,
                        to: o
                    }, {
                        onDone: () => {
                            this.closeReplyModal(), this.resetReplyText(), s(Object(L.b)("stories_answer_sent")), cur.storyLayer._sendNavigationStatEvents("question_send_message", !0, {
                                questionId: r
                            })
                        },
                        onFail: e => (this.closeReplyModal(), this.resetReplyText(), s(e), !0),
                        showProgress: () => this.setState({
                            isReplyButtonLoading: !0
                        }),
                        hideProgress: () => this.setState({
                            isReplyButtonLoading: !1
                        })
                    })
                }), this.getActions = (() => {
                    var {
                        question: e
                    } = this.props, {
                        isAuthorBan: t
                    } = this.state, s = [{
                        text: Object(L.b)("stories_question_delete"),
                        onClick: () => this.props.removeQuestion(e)
                    }];
                    return e.canBlocked && (t ? s.push({
                        text: Object(L.b)("stories_question_author_unban"),
                        onClick: this.unbanAuthor.bind(this)
                    }) : s.push({
                        text: Object(L.b)("stories_question_author_ban"),
                        onClick: this.openReportModal.bind(this)
                    })), s
                }), this.sendReport = (() => {
                    var {
                        reportReason: e
                    } = this.state, {
                        question: t,
                        showMessage: s
                    } = this.props, {
                        storyOwnerId: i,
                        storyId: r,
                        id: o,
                        banHash: a,
                        isAnonymous: n
                    } = t;
                    ajax.post("al_stories.php", {
                        act: "ban_author_question",
                        story_owner_id: i,
                        story_id: r,
                        question_id: o,
                        reason: e,
                        ban_hash: a
                    }, {
                        onDone: () => {
                            this.closeReportModal(), this.setState({
                                isAuthorBan: !0
                            }), s(Object(L.b)("stories_question_author_blocked"));
                            var e = "question_ban_author";
                            n && (e = "question_ban_anonymous_author"), cur.storyLayer._sendNavigationStatEvents(e, !0, {
                                questionId: o
                            })
                        },
                        showProgress: () => this.setState({
                            isReportButtonLoading: !0
                        }),
                        hideProgress: () => this.setState({
                            isReportButtonLoading: !1
                        })
                    })
                }), this.unbanAuthor = (() => {
                    var {
                        question: e,
                        showMessage: t
                    } = this.props, {
                        storyOwnerId: s,
                        storyId: i,
                        id: r,
                        banHash: o
                    } = e;
                    ajax.post("al_stories.php", {
                        act: "unban_author_question",
                        story_owner_id: s,
                        story_id: i,
                        question_id: r,
                        ban_hash: o
                    }, {
                        onDone: () => {
                            this.setState({
                                isAuthorBan: !1
                            }), t(Object(L.b)("stories_question_author_unblocked"))
                        }
                    })
                }), this.reportReasons = [
                    ["spam", "stories_question_report_reason_spam"],
                    ["abuse", "stories_question_report_reason_abuse"],
                    ["suicide", "stories_question_report_reason_suicide"],
                    ["other", "stories_question_report_reason_other"]
                ], this.replyTextarea = i.createRef(), this.state = {
                    isAuthorBan: e.question.isOwnerBlocked,
                    reportReason: "spam",
                    replyText: "",
                    isOpenReplyModal: !1,
                    isReplyButtonLoading: !1,
                    isOpenReportModal: !1,
                    isReportButtonLoading: !1
                }
            }
        }
        var V = s("zxIV");
        class z extends i.Component {
            constructor(e) {
                super(e), this.componentDidMount = (() => {
                    var {
                        current: e
                    } = this.scrollElement;
                    e.addEventListener(browserFeatures.wheelEvent, this.questionsMouseWheel)
                }), this.componentWillUnmount = (() => {
                    var {
                        current: e
                    } = this.positionElement;
                    e.removeEventListener(browserFeatures.wheelEvent, this.questionsMouseWheel)
                }), this.render = (() => {
                    var {
                        questions: e,
                        scrollBlockPosition: t
                    } = this.state;
                    return i.createElement("div", {
                        className: "stories_feedback_questions_wrap",
                        ref: this.scrollElement
                    }, i.createElement("div", {
                        className: "stories_feedback_questions_items",
                        style: {
                            transform: `translateX(-${t}px)`
                        },
                        ref: this.positionElement
                    }, e.map((e, t) => i.createElement(U, {
                        question: e,
                        storyUrl: this.props.storyUrl,
                        showMessage: this.props.showMessage,
                        removeQuestion: this.removeQuestion,
                        key: t
                    }))))
                }), this.questionsMouseWheel = (e => {
                    e.preventDefault(), this.state.questions.length <= 1 || this.setPosition(Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX)
                }), this.setPosition = (e => {
                    var {
                        current: t
                    } = this.positionElement, {
                        scrollBlockPosition: s
                    } = this.state, [i] = Object(V.N)(t), r = Math.max(0, Math.min(s + e, t.scrollWidth - i));
                    this.setState({
                        scrollBlockPosition: r
                    })
                }), this.removeQuestion = (e => {
                    var {
                        storyOwnerId: t,
                        storyId: s,
                        id: i,
                        removeHash: r
                    } = e;
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
                }), this.state = {
                    questions: this.props.questions,
                    scrollBlockPosition: 0
                }, this.scrollElement = i.createRef(), this.positionElement = i.createRef()
            }
        }
        var X = "stories_manage",
            Y = 200,
            G = {
                hashtag: 1,
                mention: 2,
                question: 3,
                place: 4
            },
            J = s("/PiP");
        class Z extends i.Component {
            constructor(e) {
                super(e), this.render = (() => i.createElement("div", {
                    className: "StorySticker",
                    style: this.getStickerStyle(),
                    onClick: this.handleClick
                })), this.getStickerStyle = (() => {
                    var {
                        sticker: e,
                        originalWidth: t,
                        originalHeight: s,
                        widthViewBox: i,
                        heightViewBox: r
                    } = this.props, {
                        top: o,
                        left: a,
                        width: n,
                        height: l,
                        rotate: d
                    } = e, h = i, c = r;
                    return r / i > 1.77 ? h = t * r / s : c = s * i / t, {
                        top: o * c - (c - r) / 2,
                        left: a * h - (h - i) / 2,
                        width: n * h,
                        height: l * c,
                        transform: `rotate(${d}deg)`
                    }
                }), this.handleClick = (e => {
                    var {
                        type: t,
                        hashtag: s,
                        mention: i,
                        placeId: r
                    } = this.props.sticker, {
                        list: o
                    } = this.props;
                    switch (t) {
                        case G.hashtag:
                            this.handleClickHashtag(e, s);
                            break;
                        case G.mention:
                            this.handleClickMention(e, i);
                            break;
                        case G.question:
                            this.handleClickQuestion();
                            break;
                        case G.place:
                            this.handleClickPlace(e, r, o)
                    }
                }), this.handleClickHashtag = ((e, t) => {
                    var s = t.replace("#", "%23"),
                        r = Object(L.b)("stories_show_hashtag_link"),
                        o = i.createElement("a", {
                            href: `/feed?q=${s}&section=search`,
                            target: "_blank",
                            className: "StoriesTooltip__link"
                        }, r);
                    this.props.toggleTooltip(e, o)
                }), this.handleClickMention = ((e, t) => {
                    var [s] = t.slice(1, -1).split("|"), r = s.startsWith("id") ? Object(L.b)("stories_go_to_profile") : Object(L.b)("stories_go_to_group"), o = i.createElement("a", {
                        href: `/${s}`,
                        target: "_blank",
                        className: "StoriesTooltip__link"
                    }, r);
                    this.props.toggleTooltip(e, o)
                }), this.handleClickQuestion = (() => {
                    this.props.showQuestionModal()
                }), this.handleClickPlace = ((e, t, s) => {
                    var r = Object(L.b)("stories_go_to_place");
                    if (layerQueue.count() || s.includes("archive")) {
                        var o = "/feed?section=search&w=place" + t,
                            a = i.createElement("a", {
                                href: `${o}`,
                                target: "_blank",
                                className: "StoriesTooltip__link"
                            }, r);
                        this.props.toggleTooltip(e, a)
                    } else {
                        var n = i.createElement("div", {
                            className: "StoriesTooltip__link",
                            onClick: () => {
                                layerQueue.count() ? layerQueue.pop() : layerQueue.push(), Object(J.C)({
                                    w: "place" + t
                                })
                            }
                        }, r);
                        this.props.toggleTooltip(e, n)
                    }
                })
            }
        }
        class ee extends i.Component {
            constructor(e) {
                super(e), this.render = (() => {
                    var {
                        clientX: e = 0,
                        clientY: t = 0,
                        layerEl: s
                    } = this.props;
                    return i.createElement(i.Fragment, null, r.createPortal(i.createElement("div", {
                        className: "StoriesTooltip",
                        style: {
                            top: t,
                            left: e
                        }
                    }, this.props.children), s))
                })
            }
        }
        var te = s("0Rlc"),
            ie = s("XpgC");
        class oe extends i.Component {
            constructor(e) {
                super(e), this.componentDidMount = (() => {
                    window.addEventListener("resize", this.handleResize)
                }), this.componentWillUnmount = (() => {
                    window.removeEventListener("resize", this.handleResize)
                }), this.componentDidUpdate = (() => {
                    this.askTextarea.current && this.askTextarea.current.focus()
                }), this.render = (() => {
                    var {
                        story: e,
                        author: t,
                        layerEl: s,
                        list: r
                    } = this.props, {
                        clickable_stickers: o
                    } = e, {
                        stickers: a,
                        original_width: n,
                        original_height: l
                    } = o, {
                        widthViewBox: d,
                        heightViewBox: h,
                        showTooltip: c,
                        tooltipContent: _,
                        showQuestionModal: p,
                        clientX: u,
                        clientY: v
                    } = this.state;
                    return i.createElement("div", {
                        className: "StoryStickers"
                    }, a.map((e, t) => i.createElement(Z, {
                        sticker: e,
                        originalWidth: n,
                        originalHeight: l,
                        widthViewBox: d,
                        heightViewBox: h,
                        toggleTooltip: this.toggleTooltip,
                        list: r,
                        showQuestionModal: this.showQuestionModal,
                        key: t
                    })), c && i.createElement(ee, {
                        clientX: u,
                        clientY: v,
                        layerEl: s
                    }, _), p && i.createElement(A.a, {
                        title: Object(L.b)("stories_question_ask_box_title").replace("{name}", Object(K.a)(t.name_get)),
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
                        placeholder: Object(L.b)("stories_question_ask_placeholder"),
                        onChange: this.handleChange,
                        onKeyDown: this.handleKeyDown
                    }))))
                }), this.handleResize = (() => {
                    var [e, t] = Object(V.N)(this.props.el);
                    this.setState({
                        widthViewBox: e,
                        heightViewBox: t,
                        showTooltip: !1
                    })
                }), this.toggleTooltip = ((e, t) => {
                    e.preventDefault(), e.stopPropagation();
                    var {
                        clientX: s,
                        clientY: i
                    } = e, {
                        pauseStory: r,
                        playStory: o,
                        hideFeedbackTooltip: a,
                        sendNavigationStatEvents: n
                    } = this.props;
                    a(), this.setState({
                        showTooltip: !this.state.showTooltip,
                        tooltipContent: t,
                        clientX: s,
                        clientY: i
                    }), setTimeout(() => {
                        this.state.showTooltip ? (n("click_on_clickable_sticker"), r()) : o()
                    }, 0)
                }), this.hideTooltip = (() => {
                    this.setState({
                        showTooltip: !1
                    })
                }), this.isShownTooltip = (() => this.state.showTooltip || this.state.showQuestionModal), this.showQuestionModal = (() => {
                    var {
                        story: e,
                        showMessage: t,
                        pauseStory: s
                    } = this.props, {
                        can_ask: i
                    } = e;
                    if (!i) return t(Object(L.b)("stories_question_forbidden"));
                    this.setState({
                        showQuestionModal: !0
                    }), this.hideTooltip(), s()
                }), this.closeQuestionModal = (() => {
                    var {
                        playStory: e
                    } = this.props;
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
                    var {
                        questionText: t
                    } = this.state;
                    Object(Q.H)(t) && "keydown" === e.type && (e.ctrlKey || e.metaKey) && e.keyCode == KEY.RETURN && this.sendQuestion()
                }), this.resetAskText = (() => {
                    this.setState({
                        questionText: ""
                    })
                }), this.getQuestionModalActions = (() => {
                    var e, {
                            story: t,
                            author: s
                        } = this.props,
                        {
                            can_ask_anonymous: r
                        } = t,
                        {
                            isQuestionButtonLoading: o,
                            questionText: a,
                            isAnonymous: n
                        } = this.state;
                    return e = r ? clean(Object(L.b)("stories_question_anonymous_info").replace("{name}", Object(K.a)(s.firstName))) : Object(L.b)("stories_question_cannot_anonymous"), i.createElement("div", {
                        className: "StoryQuestionAskForm__footer"
                    }, i.createElement("div", {
                        className: "StoryQuestionAskForm__cell"
                    }, i.createElement(te.a, {
                        key: "c",
                        checked: n,
                        onChange: this.handleCheckBox,
                        disabled: !r
                    }, Object(L.b)("stories_question_anonymous_checkbox")), i.createElement(ie.a, {
                        text: e,
                        position: "b",
                        align: "left",
                        maxWidth: 284,
                        appearance: "light"
                    }, i.createElement("span", {
                        className: "StoryQuestionAskForm__info"
                    }))), i.createElement("div", {
                        className: "StoryQuestionAskForm__cell"
                    }, i.createElement(H.a, {
                        key: "b",
                        appearance: "tertiary",
                        onClick: this.closeQuestionModal
                    }, Object(L.b)("global_cancel")), i.createElement(W.a, {
                        key: "s",
                        loading: o,
                        disabled: !Object(Q.H)(a),
                        onClick: this.sendQuestion
                    }, Object(L.b)("stories_question_reply_send"))))
                }), this.sendQuestion = (() => {
                    var {
                        questionText: e,
                        isAnonymous: t
                    } = this.state, {
                        showMessage: s,
                        story: i,
                        author: r,
                        sendNavigationStatEvents: o
                    } = this.props, {
                        raw_id: a,
                        askQuestionHash: n,
                        accessKey: l
                    } = i, [d, h] = a.split("_");
                    ajax.post("al_stories.php", {
                        act: "ask_question",
                        story_owner_id: d,
                        story_id: h,
                        question_text: e,
                        is_anonymous: +t,
                        hash: n,
                        access_key: l
                    }, {
                        onDone: () => {
                            this.closeQuestionModal(), this.resetAskText(), s(Object(L.b)("stories_question_sent").replace("{name}", r.first_name_ins)), o(t ? "question_reply_anonymous" : "question_reply")
                        },
                        onFail: e => (this.closeQuestionModal(), this.resetAskText(), s(e), !0),
                        showProgress: () => this.setState({
                            isQuestionButtonLoading: !0
                        }),
                        hideProgress: () => this.setState({
                            isQuestionButtonLoading: !1
                        })
                    })
                });
                var [t, s] = Object(V.N)(this.props.el);
                this.askTextarea = i.createRef(), this.state = {
                    widthViewBox: t,
                    heightViewBox: s,
                    clientX: 0,
                    clientY: 0,
                    showTooltip: !1,
                    tooltipContent: "",
                    showQuestionModal: !1,
                    isQuestionButtonLoading: !1,
                    isAnonymous: !1,
                    questionText: ""
                }
            }
        }
        class ae {
            constructor(e, t) {
                this.data = e, this.opts = t, this.paused = !0, this.loaded = !1, this.elems = {}, this.startTs = 0;
                var {
                    is_expired: s,
                    is_deleted: i,
                    can_view_deleted: r,
                    is_private: o,
                    narrative: a
                } = e;
                r || (s ? this._error("expired") : i ? a ? this._error("deleted-narrative") : this._error("deleted") : o && (a ? this._error("private-narrative") : this._error("private")), (s || i || o) && (this.failed = !0))
            }
            render() {
                this._isFailed() && this.isNarrativeMetaStory || (this.longLoadingTimer = setTimeout(() => {
                    this.isLoaded() || this.opts.onLongLoading()
                }, 1e3), this.opts.onLoadingStart())
            }
            renderNarrativeCover() {
                var {
                    narrative: e,
                    photo_url: t
                } = this.data, s = e && e.views ? winToUtf(` · ${e.views}`) : "";
                return this.NarrativeCover = se(`\n      <div class="stories_narrative_cover">\n        <div class="stories_narrative_cover_photo" id="stories_narrative_cover_photo" style="background-image: url(${data})"></div>\n        <div class="stories_narrative_cover__info">\n          <span class="stories_narrative_cover__label">${getLang("global_type_narrative")}</span>\n          <span class="stories_narrative_cover__views">${s}</span>\n        </div>\n        <div class="stories_narrative_cover__title">${e.title}</div>\n        <div class="stories_narrative_cover__author">${e.owner_name}</div>\n      </div>\n    `), u(t).then(e => {
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
                                var {
                                    target: i
                                } = t;
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
            setCurrentTime(e = 0) {}
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
        var ne = 5e3;
        class le extends ae {
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
                            var e = (Date.now() - s) / ne;
                            e < 1 ? (t.clearRect(0, 0, 100, 100), t.beginPath(), t.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), t.stroke(), this._nextTO = setTimeout(i, 16)) : cur.storyLayer.nextStory()
                        };
                    show(e), this.timerInProgress = !0, i()
                }
            }
            _resetTimer() {
                window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this.el, "_timer_canvas")))
            }
        }
        class de extends ae {
            constructor(e, t) {
                super(e, t), this.isFirstChunkLoaded = !1
            }
            render() {
                if (super.render(), this.video) return this.video;
                var {
                    video_url: e
                } = this.data;
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
            setCurrentTime(e = 0) {
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
        var he = 5e3;
        class _e extends ae {
            constructor(e, t) {
                super(e, t), this.pauseTime = 0
            }
            render() {
                if (super.render(), this.photo) return this.photo;
                var {
                    photo_url: e,
                    narrative: t
                } = this.data;
                return this.photo = ce("div", {
                    className: "stories_photo"
                }), this._isFailed() ? this.photo : (u(e).then(e => {
                    this.photo && (t && t.is_cover ? addClass(this.photo, "stories_narrative_cover_blur") : setStyle(this.photo, "backgroundImage", "url(" + e + ")"), this._onCanPlay())
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
            setCurrentTime(e = 0) {
                this.startTs = Date.now() + e, this.isPaused() && (this.pauseTime = e)
            }
            getCurrentTime() {
                return Date.now() - this.startTs || 0
            }
            getDuration() {
                return he
            }
            _onCanPlay() {
                super._onCanPlay(), cur.storyLayer._sendNavigationStatEvents("view_story", !0, {
                    preloading_duration: cur.storyLayer.activeStory && cur.storyLayer.activeStory.loadingTime || 0
                }), setStyle(this.photo, "opacity", 1)
            }
        }
        var pe = s("v+DW"),
            ue = s("Egk5"),
            ve = s("4+be"),
            me = s("EasH"),
            ye = s("kcIO");
        class be {
            constructor(e, t) {
                this.data = e, this.opts = t, this.id = t.id, this.isActive = !1, this.story = !1, this.pressedStory = null, this.index = 0, this.preloadedStories = {}, this.layer = t.layer, this.longTapTimer
            }
            destroy() {
                this._destroyStory(), Object(ue.h)(Object(V.H)("stories_item_cont", this.contWrap)), Object(ue.h)(Object(V.H)("stories_reply_to", this.replyToWrap)), Object(ue.h)(this.shareButton), delete this.shareButton, Object(ue.h)(this.followBtn), delete this.followBtn, Object(ue.h)(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                for (var e = Object(V.G)("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) Object(ue.h)(e[t]);
                Object(ue.h)(this.viewsButton), Object(ue.h)(Object(V.H)("stories_feedback_close", this.wrapEl)), Object(ue.h)(Object(V.H)("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.descEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                for (var s = !1, i = 0; i < this.data.items.length; i++)
                    if (this.data.items[i].unread) {
                        s = !0;
                        break
                    }
                var r = E();
                if (!s && r && r.activeStory) {
                    var o = Object(V.B)("#feed_story_" + this.layer.getBlockKey(this.data), r.activeStory.wrapEl)[0];
                    Object(V.hb)(o, "story_feed_new_item"), Object(V.hb)(o, "story_feed_new_item_promo")
                }
            }
            _destroyTimeLine() {
                for (var e = Object(V.G)("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) Object(ue.h)(e[t])
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
                return Object(ue.b)(e, "mousedown", this._onMouseDownHandle.bind(this)), Object(ue.b)(e, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(e), e.appendChild(this._renderAuthor()), this.contWrap.appendChild(ce("div", {
                    className: "stories_bottom_wrap"
                })), this.contWrap.appendChild(this._renderPreview()), this.indexToUnread(), cur.noStoriesBack || (this.backButton = ce("div", {
                    className: "stories_item_back"
                }), e.appendChild(this.backButton)), this.replyToWrap = e.appendChild(ce("div", {
                    className: "stories_reply_to_wrap"
                })), this.inlineLoader = e.appendChild(ce("div", {
                    className: "stories_inline_loader",
                    innerHTML: getProgressHtml()
                })), e.appendChild(ce("div", {
                    className: "stories_play_button video_thumb_play"
                })), this.isActiveLive() ? Object(V.a)(this.wrapEl, "live") : this._initTimeLine(), Object(V.wb)(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
            }
            updateBottom(e) {
                var t = Object(V.H)("stories_bottom_wrap", this.wrapEl);
                !this.isActive || e || this.story.isNarrativeMetaStory ? (r.unmountComponentAtNode(t), val(t, "")) : r.render(i.createElement(D, {
                    story: this
                }), t)
            }
            _canForceDeleteStories() {
                return this.data.moder_remove_hash && !this.data.items[0].is_deleted
            }
            _initTimeLine() {
                this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl)), Object(V.H)("stories_item_cont", this.contWrap).appendChild(this._renderTimeLine())
            }
            _isActionsShown() {
                var e = domClosest("_ui_menu_wrap", this.wrapEl);
                return hasClass(e, "shown")
            }
            _renderPreview() {
                return Object(V.mb)('<div class="stories_preview"></div>')
            }
            _renderMessage(e) {
                return Object(V.mb)(`<div class="stories_message">\n  <div class="stories_message_text">${e}</div>\n</div>`)
            }
            _showMessage(e) {
                re(Object(V.H)("stories_message", this.contWrap));
                var t = this._renderMessage(e);
                return this.contWrap.appendChild(t), clearTimeout(this.showMessageTimer), new Promise(e => {
                    this.showMessageTimer = setTimeout(() => {
                        this.contWrap.removeChild(t), e()
                    }, 3e3)
                })
            }
            _setPreview(e, t) {
                var {
                    index: s
                } = this, {
                    preview_url: i
                } = this.data.items[s], r = i;
                r !== this.curPreviewUrl && r && (t = t || (() => {}), e = e || Object(V.H)("stories_preview", this.contWrap), u(r).then(i => {
                    s === this.index && r !== this.curPreviewUrl && (this.curPreviewUrl = r, Object(V.rb)(e, "backgroundImage", "url(" + i + ")")), Object(V.rb)(e, "opacity", 1), setTimeout(t, 0)
                }))
            }
            getPreview() {
                return this.data.items[this.index].preview_url
            }
            _renderAuthor() {
                var e, {
                        photo: t,
                        href: s,
                        name: i,
                        verify: r
                    } = this.data.author,
                    o = this.data && this.data.items[0] && this.data.items[0].narrative,
                    a = "_self";
                (this.layer.list.includes("place") && (a = "_blank"), this.data.is_narrative && o && !o.is_cover) ? e = `\n      <div>\n          <div class="stories_narrative_title">${o.title}</div>\n          <span class="stories_narrative_author"><a href="${s}" target="${a}" class="stories_narrative_author_link">${i}</a> · ${Object(ve.d)("global_type_narrative")}</span>\n      </div>`: e = `\n      <div class="stories_author_cont">\n        ${`<a href="${s}" class="stories_author_photo_wrap"><img src="${t}" class="stories_author_photo" /></a>`}\n        <a href="${s}" target="${a}" class="stories_author_name"><span>${i}</span></a>\n        ${r||""}\n        <div class="stories_desc"></div>\n      </div>`;
                var n = Object(V.mb)(`\n      <div class="stories_author">\n        <div class="stories_author_cont_wrap">\n          <div class="stories_author_inner">${e}</div>\n          <div class="stories_author_buttons"></div>\n         </div>\n      </div>\n    `);
                return Object(ue.b)(n, "click", e => {
                    Object(V.o)("a", e.target) && this.layer._sendNavigationStatEvents("go_to_author")
                }), !0 === this.data.hide_owner && val(Object(V.H)("stories_author_cont", n), ""), Object(V.wb)(this.wrapEl, "hide_owner", !0 === this.data.hide_owner), this.descEl = Object(V.H)("stories_desc", n), this.authorButtons = Object(V.H)("stories_author_buttons", n), n
            }
            _renderFollowButton() {
                return this.followBtn = ce("div", {
                    className: "stories_author_button stories_follow"
                }), Object(ue.b)(this.followBtn, "click", this._onFollowBtnClick.bind(this)), Object(ue.b)(this.followBtn, "mouseover", () => {
                    var e = hasClass(this.followBtn, "followed") ? Object(ve.d)("stories_unfollow") : Object(ve.d)("stories_follow");
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
                    Object(ue.b)(s, "click", () => {
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
                this.pressedStory = e.target, this.isActive && (this.isLocked() || !hasClass(e.target, "stories_item_cont") && !hasClass(e.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.longTapTimer = setTimeout(this._longTapHandle.bind(this), Y)))
            }
            _onMouseUpHandle(e) {
                clearTimeout(this.longTapTimer);
                var {
                    downTs: t
                } = this;
                if (delete this.downTs, e.target === this.pressedStory) {
                    this.pressedStory = null;
                    var s = !(vkNow() - t < Y && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                    if (this.isActive && hasClass(e.target, "stories_item_back") && !s && !this.isTooltipOpened()) return this.prevStory();
                    if (hasClass(e.target, "stories_item_cont") || hasClass(e.target, "stories_item_back"))
                        if (this._feedbackTTShown && this.hideFeedbackTooltip(), Object(V.hb)(this.wrapEl, "paused"), this.isTooltipOpened()) this._hideTooltip();
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
                this.story && this.story.pause(), Object(V.a)(this.wrapEl, "paused"), this.isTooltipOpened() || this.layer._sendNavigationStatEvents("pause_long_tap")
            }
            isLocked() {
                return !!(this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply") || Object(ye.b)() && "stories" !== Object(ye.b)().wkRaw)
            }
            autoResumeStory(e = !1) {
                this.audioPlaying || this.story && this.story.isNarrativeMetaStory || this.isTooltipOpened() || this.playStory(!1, e)
            }
            playStory(e = !1, t) {
                this.isLocked() || (Object(V.hb)(this.wrapEl, "paused"), hide(boxLayerBG), hide(boxLayerWrap), this.story && !e || this._initStory(), this.story.play(), t && this.layer._sendNavigationStatEvents("resume_release"), delete this.downTs)
            }
            pauseStory(e) {
                this.story && (this.isPaused() || (e && Object(V.a)(this.wrapEl, "paused"), this.story.pause()))
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
                this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(Object(V.H)("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), Object(V.hb)(this.wrapEl, "autoplay_failed")
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
                    {
                        type: t
                    } = e;
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
                if ("live" === t) this.story = new le(e, s, this.wrapEl);
                else {
                    "video" === t ? (this.story = new de(e, s), Object(V.a)(this.wrapEl, "video")) : (this.story = new _e(e, s), this.opts.onVideoEnd(), Object(V.hb)(this.wrapEl, "video"));
                    var o = this.story.getDate();
                    e.isPromo ? o = e.promoCaption : e.isAds && (o = Object(ve.d)("stories_is_ad")), val(this.descEl, o), this.fillTimeLine()
                }
                "live" !== t && "video" !== t || y() > 0 && this.opts.onVideoPlay();
                this.opts.onStartStory(), Object(V.wb)(this.wrapEl, "stories_can_comment", !0 === e.can_comment), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), !this.data.author.can_follow || this.data.is_promo || this.isActiveLive() || this.authorButtons.appendChild(this._renderFollowButton()), this.story.isNarrativeMetaStory = e.isNarrativeMetaStory, this._destroyFeedBackTT(), this.story.isNarrativeMetaStory || (this.updateBottom(), this.contWrap.appendChild(this.story.render())), e.clickable_stickers && (this.stickerLayers = r.render(i.createElement(oe, {
                    story: e,
                    author: this.data.author,
                    showMessage: this._showMessage.bind(this),
                    playStory: this.playStory.bind(this),
                    pauseStory: this.pauseStory.bind(this),
                    hideFeedbackTooltip: this.hideFeedbackTooltip.bind(this),
                    sendNavigationStatEvents: this.layer._sendNavigationStatEvents.bind(this.layer),
                    list: this.layer.list,
                    layerEl: this.layer.layerEl,
                    el: this.contWrap
                }), this.contStickers)), this.story.data && this.story.data.narrative && this.story.data.narrative.is_cover && (this.contWrap.appendChild(this.story.renderNarrativeCover()), Object(ue.b)(Object(V.H)("stories_narrative_cover", this.contWrap), "click", e => {
                    this._showTooltip(e, this._createNarrativeTooltipLink())
                })), this.story.isNarrativeMetaStory && !this.story.failed && (re(Object(V.H)("stories_photo", this.contWrap)), re(Object(V.H)("stories_video", this.contWrap)), Object(V.a)(this.contWrap, "stories_item_cont_wrap_meta_story"), this.contWrap.appendChild(this.story.renderNarrativeMetaStory()), this.story._onCanPlay())
            }
            _createNarrativeTooltipLink() {
                return ce("div", {
                    className: "StoriesTooltip__link",
                    innerHTML: Object(ve.d)("stories_narrative_show"),
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
                    var {
                        clientX: s = 0,
                        clientY: i = 0
                    } = e;
                    Object(V.rb)(this.tooltip, {
                        top: i,
                        left: s
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
            indexToUnread(e = !1) {
                var {
                    items: t
                } = this.data, s = 0;
                for (var i in t)
                    if (t[i].unread && !this.layer._hasContext("all")) {
                        s = intval(i);
                        break
                    }
                if (e) return s;
                this.index = s, this._setPreview()
            }
            indexToStoryById(e) {
                var {
                    items: t
                } = this.data, s = -1;
                for (var i in t)
                    if (t[i].raw_id === e) {
                        s = intval(i);
                        break
                    }
                this.layer._hasContext("all") && (s = 0), s > -1 ? (this.index = s, this._setPreview()) : this.indexToUnread()
            }
            fillTimeLine() {
                var {
                    timeLineEl: e
                } = this;
                if (e)
                    for (var t = 0; t < e.children.length; t++) {
                        var s = Object(V.H)("stories_time_line_item_cont_active", e.children[t]);
                        t === this.index && (this.currentTimeLineEl = s);
                        var i = t < this.index ? 100 : 0;
                        Object(V.rb)(s, "transform", "translateX(" + i + "%)")
                    }
            }
            _destroyStory() {
                if (this.story) {
                    this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._hideTooltip(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), Object(V.hb)(this.contWrap, "stories_item_cont_wrap_meta_story"), re(Object(V.H)("narrative-meta-story", this.contWrap)), Object(V.hb)(this.contWrap, "stories_narrative_cover_blur"), re(Object(V.H)("stories_narrative_cover", this.contWrap)), Object(ue.h)(Object(V.H)("stories_narrative_cover", this.contWrap)), Object(ue.h)(window, "resize", this._onResizeHandle);
                    var e = this.getCurStoryData();
                    e && e.clickable_stickers && (r.unmountComponentAtNode(this.contStickers), delete this.stickerLayers), cancelAnimationFrame(this.timeLineAnim);
                    try {
                        this.contWrap.removeChild(this.story.getContainer()), this.story.destroy()
                    } catch (e) {}
                    this._replyHideEnd(), Object(ue.h)(this.followBtn), val(this.authorButtons, ""), Object(ue.h)(this.answersEl), Object(ue.h)(Object(V.H)("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                }
            }
            _timeLineUpdate() {
                var {
                    story: e
                } = this;
                if (e && !e.isPaused() && !this.isActiveLive()) {
                    var t = e.getCurrentTime(),
                        s = e.getDuration(),
                        i = Math.max(0, Math.min(100, t / s * 100));
                    Object(V.rb)(this.currentTimeLineEl, "transform", "translateX(" + i + "%) translateZ(0)"), i < 100 ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd(!0)
                }
            }
            _onLoadingStart() {
                this._loadingStartTime = new Date
            }
            _onLoadingEnd() {
                this._loadingStartTime && (this.loadingTime = Date.now() - this._loadingStartTime, this.layer._sendViewerStartTime(this.getRawId(), this.loadingTime), this._loadingStartTime = 0)
            }
            _onPlay() {
                this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), Object(V.hb)(this.wrapEl, "animate_story"), Object(V.hb)(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
            }
            _onPause() {
                cancelAnimationFrame(this.timeLineAnim)
            }
            _onPlayEnd(e = !1) {
                this.nextStory(e)
            }
            nextStory(e = !1) {
                if (!this.isLocked()) {
                    var {
                        items: t
                    } = this.data;
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
                    title: Object(ve.d)("global_warning"),
                    onHide: () => {
                        this.playStory()
                    }
                }, Object(ve.d)("stories_remove_warning"), Object(ve.d)("stories_remove_confirm"), this.removeStory.bind(this), Object(ve.d)("global_cancel"))
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
                        window.cur.module === X && window.GeStories.storyDidRemove(s, e), Object(ye.b)().hide(), this._popStoryAndClearList(t)
                    },
                    showProgress: pe.o.pbind(e),
                    hideProgress: pe.w.pbind(e)
                })
            }
            removeNarrativeBox() {
                this.pauseStory(), showFastBox({
                    title: Object(ve.d)("global_warning"),
                    onHide: () => {
                        this.playStory()
                    }
                }, Object(ve.d)("stories_narrative_remove_warning"), Object(ve.d)("stories_remove_confirm"), this.removeNarrative.bind(this), Object(ve.d)("global_cancel"))
            }
            removeNarrative(e) {
                this.pauseStory();
                var {
                    narrative: t
                } = this.getCurStoryData(), {
                    raw_id: s
                } = t;
                ajax.post("al_stories.php", {
                    act: "remove_narrative",
                    narrative_raw: s,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: () => {
                        Object(ye.b)().hide(), this._popCoverAndCleanNarrativeList(t)
                    },
                    showProgress: pe.o.pbind(e),
                    hideProgress: pe.w.pbind(e)
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
                var {
                    narrative: e
                } = this.getCurStoryData();
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
                        showDoneBox(t || Object(ve.d)("stories_narrative_bookmark_deleted"), {
                            className: "stories_done_msg"
                        }), e.is_bookmarked = !e.is_bookmarked, this.updateBottom()
                    }
                })
            }
            _sendNarrativeEditButtonDidPress() {
                var {
                    narrative: e
                } = this.getCurStoryData();
                window.open(`https://${location.hostname}${this.data.author.href}?act=narrative_edit&nid=${e.id}`)
            }
            _popStoryAndClearList(e) {
                this._removeStoryFromMemoryByIndex(e), 0 === this.data.items.length && O(this.getOwnerId())
            }
            _removeStoryFromMemoryByIndex(e, t = !1) {
                this.data.items.splice(e, 1), this.opts.removeList();
                var s = this.data.items.length;
                s ? (this._initTimeLine(), s > e ? this.isActive && this.playStory(!0) : this.isActive && this.nextStory()) : this._remove(t)
            }
            _remove(e, t) {
                this.opts.onStoryRemoved(e, t)
            }
            shareBox() {
                var e, {
                    narrative: t
                } = this.getCurStoryData();
                e = t ? `narrative${t.raw_id}` : `story${this.story.getId()}`, this.pauseStory(), Object(me.b)("like.php", {
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
                    var i, {
                        narrative: r
                    } = this.story.data;
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
                        showProgress: () => {
                            val(this.sendFormButton, this._getLoaderHtml()), Object(V.a)(this.sendFormButton, "sending")
                        },
                        hideProgress: () => {
                            val(this.sendFormButton, ""), Object(V.hb)(this.sendFormButton, "sending")
                        }
                    })
                }
            }
            _onAnswerSended(e) {
                this.isActiveLive() || (this.layer._sendNavigationStatEvents("comment_send"), this._showMessage(Object(ve.d)("stories_answer_sent")).then(() => {
                    this._unlockSendForm(), this.playStory()
                })), val(Object(V.H)("stories_send_form_text", this.wrapEl), ""), this._blurSendForm(), this.updateFeedbackTTPos(), this.pauseStory(), e && e()
            }
            _onSendFormFocus() {
                this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", () => {
                    Emoji.shown || (this._resetFendForm(), this._blurSendForm()), this.updateFeedbackTTPos()
                })
            }
            _blurSendForm() {
                var e = Object(V.H)("stories_send_form_text", this.wrapEl);
                e && e.blur()
            }
            _getSendText() {
                var e = Emoji.editableVal(Object(V.H)("stories_send_form_text", this.wrapEl));
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
                this._unlockSendForm(), this.playStory(), val(Object(V.H)("stories_send_form_text", this.wrapEl), "")
            }
            _emojiOnKeyAction() {
                this._getSendText() ? Object(V.a)(this.sendFormButton, "active") : Object(V.hb)(this.sendFormButton, "active")
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
                        s && ("video" === t.type ? m(s) : u(s))
                    }
                }
            }
            _addToBlacklist() {
                cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                    title: Object(ve.d)("stories_add_blacklist_title"),
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }, this.getOwnerId() < 0 ? Object(ve.d)("stories_add_blacklist_message_group") : Object(ve.d)("stories_add_blacklist_message"), Object(ve.d)("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), Object(ve.d)("global_cancel"))
            }
            _doAddToBlacklist(e) {
                ajax.post("al_stories.php", {
                    act: "blacklist_add",
                    owner_id: this.getOwnerId(),
                    hash: this.data.blacklist_hash,
                    source_story: this.getRawId()
                }, {
                    onDone: () => {
                        this.data.can_blacklist = !1, this.layer._sendNavigationStatEvents("hide_from_stories"), Object(ye.b)().hide(), this.opts.removeList(), this._remove()
                    },
                    showProgress: pe.o.pbind(e),
                    hideProgress: pe.w.pbind(e)
                })
            }
            _resetErrors() {
                var e = Object(V.H)("stories_error_wrap", this.contWrap);
                e && (Object(ue.h)(Object(V.H)("stories_error_button", e)), re(e)), Object(V.hb)(this.wrapEl, "failed"), Object(V.hb)(this.wrapEl, "fatal_error")
            }
            _showError(e) {
                if (this.contWrap) {
                    var t, s, i = e;
                    switch (e) {
                        case "load":
                            t = Object(ve.d)("stories_error_cant_load"), s = ce("div", {
                                className: "stories_error_button",
                                innerHTML: Object(ve.d)("stories_try_again")
                            }), Object(ue.b)(s, "click", () => {
                                this._destroyStory(), this.playStory()
                            });
                            break;
                        case "expired":
                            t = Object(ve.d)("stories_error_expired");
                            break;
                        case "deleted":
                            t = Object(ve.d)("stories_error_deleted");
                            break;
                        case "private":
                            t = Object(ve.d)("stories_error_private");
                            break;
                        case "deleted-narrative":
                            t = Object(ve.d)("stories_error_deleted_narrative");
                            break;
                        case "private-narrative":
                            t = Object(ve.d)("stories_error_private_narrative");
                            break;
                        default:
                            t = Object(ve.d)("global_unknown_error")
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
                    })), s && a.appendChild(s), r.appendChild(o), this.contWrap.appendChild(r), Object(V.a)(this.wrapEl, "failed"), inArray(e, ["expired", "deleted", "private", "deleted-narrative", "private-narrative"]) && Object(V.a)(this.wrapEl, "fatal_error")
                }
            }
            _stopLoader() {
                setTimeout(() => {
                    re(Object(V.H)("stories_loader", this.contWrap))
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
                        this.data.author.can_follow && this._sendStatEvent("follow"), this.data.author.can_follow = !this.data.author.can_follow, Object(V.wb)(this.followBtn, "followed", !this.data.author.can_follow), this._showMessage(Object(ve.d)(this.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(() => this.playStory()), window.tooltips && tooltips.destroy(this.followBtn), triggerEvent(this.followBtn, "mouseover")
                    },
                    showProgress: () => this.showInlineLoader(),
                    hideProgress: () => {
                        this.hideInlineLoader(), this.followBtnLock = !1
                    }
                }))
            }
            _getDimensions() {
                var [e, t] = getSize(this.wrapEl), [s, i] = getXY(this.wrapEl);
                return {
                    width: e,
                    height: t,
                    top: i - scrollGetY(),
                    left: s - scrollGetX()
                }
            }
            markAsActive() {
                this.isActive = !0, Object(V.a)(this.wrapEl, "animate_story")
            }
            _renderReplyTo() {
                var {
                    list: e,
                    photo_url: t,
                    name: s,
                    can_view_deleted: i,
                    is_deleted: r,
                    is_private: o,
                    raw_id: a
                } = this.getCurStoryData().reply_to, n = Object(V.mb)(`<div class="stories_reply_to" style="background-image: url(${t})">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">${s}</div>\n  </div>\n</div>`);
                if (Object(ue.b)(n, "click", () => {
                        this.layer._sendNavigationStatEvents("open_parent_story");
                        var t = E();
                        w.length > 1 && t.getStoryRaw() === a ? cancelStackPop() : showStory(e, {
                            fromEl: n,
                            source: "reply_story"
                        })
                    }), i) return n;
                var l = !1;
                return r ? (Object(V.a)(n, "deleted"), l = Object(ve.d)("stories_deleted_story")) : o && (Object(V.a)(n, "private"), l = Object(ve.d)("stories_private_story")), l && (val(Object(V.H)("stories_reply_to_error_msg", n), l), re(Object(V.H)("stories_reply_to_owner_name_wrap", n))), n
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
                            }, s, i) : this._showMessage(Object(ve.d)("stories_mask_sent")).then(() => this.playStory())
                        },
                        showProgress: () => this.showInlineLoader(),
                        hideProgress: () => {
                            this._maskSending = !1, this.hideInlineLoader()
                        }
                    })
                }
            }
            _getFeedbackTTElem() {
                return Object(V.H)("stories_answers_tt_arrow", this.wrapEl) || Object(V.H)("_views_button", this.wrapEl)
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
                    var t = Object(V.H)("stories_feedback_tt_arrow", this.wrapEl),
                        s = e.offsetLeft + getSize(e)[0] / 2 - getSize(t)[0] / 2 - 1;
                    Object(V.rb)(t, "left", `${s}px`)
                }
            }
            showFeedbackTooltip(e = !1) {
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
                            appendEl: Object(V.H)("stories_bottom_wrap", this.wrapEl),
                            onHide: () => {
                                this._feedbackTTShown = !1
                            },
                            onShowStart: () => {
                                this.isActive && (this._feedbackTTShown = !0, this._feedbackTTLoaded ? this._feedbackRequestEnd && (this.feedbackScroll.update(), this._feedbackTooltipInitHeaders(), tooltips.rePositionTT(t.tt), this._onFeedbackScroll(), setTimeout(() => tooltips.rePositionTT(t.tt), 200)) : (Object(V.H)("stories_feedback_tt", this.wrapEl).appendChild(Object(V.mb)('<div class="stories_feedback_tt_arrow"></div>')), this._feedbackTTLoaded = !0, this._feedbackRequestEnd = !1, this._feedbackTooltipHeadersInited = !1, Object(ue.b)(Object(V.H)("stories_feedback_close", this.wrapEl), "click", () => this.hideFeedbackTooltip()), setTimeout(() => {
                                    ajax.post("al_stories.php", {
                                        act: "feedback",
                                        story_raw: this.getRawId()
                                    }, {
                                        onDone: (e, s, i, r, o, a) => {
                                            if (this.isActive) {
                                                this.story.setViews(r), this.story.setReplies(o), this._feedbackRequestEnd = !0;
                                                var n = Object(V.H)("stories_feedback_content", this.wrapEl);
                                                val(n, e), this.updateQuestions(a, this._showMessage.bind(this), this.getCurStoryData().small_preview), this.feedbackScroll = new uiScroll(Object(V.H)("stories_feedback_content", this.wrapEl), {
                                                    theme: "default emoji no_transition",
                                                    onmore: () => this._onMoreFeedBack(),
                                                    onscroll: () => this._onFeedbackScroll()
                                                }), this.feedbackScroll.scrollTop(0), Object(V.a)(this.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), Object(V.H)("ui_scroll_overflow", this.feedbackScroll.container).appendChild(ce("div", {
                                                    className: "ui_scroll_shadow_bottom"
                                                })), this.feedbackNextFrom = s, t.tt.shown && this._feedbackTooltipInitHeaders(), this.updateBottom(), this.updateFeedbackTTPos(), cur = Object(Q.i)(cur, i), this.updateFeedbackTTArrow()
                                            }
                                        }
                                    })
                                }, 200)), this.updateFeedbackTTArrow())
                            }
                        })
                    }
            }
            updateQuestions(e, t, s) {
                var o = Object(V.F)("stories_feedback_questions");
                Object(V.hb)(Object(V.H)("_views_button", this.wrapEl), "stories_button_new_questions"), o && (r.render(i.createElement(z, {
                    showMessage: t,
                    storyUrl: s,
                    questions: e,
                    sendNavigationStatEvents: this.layer._sendNavigationStatEvents.bind(this.layer),
                    destroyCallback: this.destroyFeedbackQuestions.bind(this)
                }), o), cur.destroy.push(() => {
                    r.unmountComponentAtNode(o)
                }))
            }
            destroyFeedbackQuestions() {
                var e = Object(V.F)("stories_feedback_questions");
                r.unmountComponentAtNode(e), re(e), re(Object(V.F)("stories_feedback_title_questions")), this.feedbackTooltipReInitHeaders(), this.feedbackScroll.scrollTop(0), tooltips.rePositionTT(this._getFeedbackTTElem().tt)
            }
            updateFeedbackTTPos() {
                var e = this._getFeedbackTTElem();
                this._feedbackTTShown && e && e.tt && tooltips.rePositionTT(e.tt)
            }
            _feedbackTooltipInitHeaders() {
                if (!this._feedbackTooltipHeadersInited) {
                    this._feedbackTooltipHeadersInited = !0;
                    var e = Object(V.H)("stories_feedback_content", this.wrapEl),
                        t = Object(V.H)("stories_feedback_headers", this.wrapEl),
                        s = Object(V.G)("stories_feedback_title", e);
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
                    Object(V.rb)(e, "margin-top", s[0].offsetHeight), hide(s[0])
                }
            }
            feedbackTooltipReInitHeaders() {
                this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(Object(V.H)("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
            }
            _onFeedbackScroll() {
                if (this._feedbackTooltipHeadersInited)
                    for (var e = this.feedbackScroll.data.scrollTop, t = !1, s = 0, i = this.feedbackHeaders.length - 1; i >= 0; i--) {
                        var {
                            top: r,
                            height: o,
                            el: a
                        } = this.feedbackHeaders[i], n = r, l = e;
                        t && (l -= s - (n += o));
                        var d = l >= r - o;
                        a.classList.toggle("active", !t && d && l > 0), d && (t = !0), s = r;
                        var h = -Math.min(l, n);
                        a.style.transform = `translateY(${h}px)`
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
                        for (var s, i = Object(V.H)("stories_feedback_views", this.wrapEl), r = ce("div", {
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
                Object(V.a)(this.wrapEl, "autoplay_failed")
            }
            _hideReply() {
                showFastBox({
                    title: Object(ve.d)("global_warning"),
                    onHide: () => {
                        this.autoResumeStory()
                    }
                }, Object(ve.d)("stories_hide_reply_warning"), Object(ve.d)("global_continue"), this._doHideReply.bind(this), Object(ve.d)("global_cancel"))
            }
            _doHideReply() {
                this.pauseStory(), Object(V.a)(this.wrapEl, "hiding_reply"), Object(ye.b)().hide();
                var e = this.getIndex(),
                    t = this.data.author.gender,
                    s = Object(V.mb)(`<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">${getProgressHtml()}</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">${Object(ve.d)("stories_reply_hidden")}</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">${Object(ve.d)("stories_hide_reply_continue")}</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">${langSex(t,window.lang.stories_hide_all_replies)}</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">${Object(ve.d)("stories_reply_add_to_blacklist")}</div>\n  </div>\n</div>`);
                Object(ue.b)(Object(V.H)("_stories_reply_restore", s), "click", this._restoreReply.bind(this)), Object(ue.b)(Object(V.H)("_stories_reply_continue", s), "click", () => this._replyHideEnd(e)), Object(ue.b)(Object(V.H)("_stories_hide_replies", s), "click", this._hideAllReplies.bind(this)), Object(ue.b)(Object(V.H)("_stories_reply_ban", s), "click", this._ban.bind(this)), this.contWrap.appendChild(s), ajax.post("al_stories.php", {
                    act: "hide_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        this.opts.removeList(), cur.needUpdateFeedStories = !0, Object(V.hb)(s, "loading")
                    },
                    onFail: () => {
                        this._resetReplyHide(), this.playStory()
                    }
                })
            }
            _restoreReply(e) {
                cancelEvent(e);
                var t = Object(V.H)("stories_hide_reply_wrap", this.contWrap);
                ajax.post("al_stories.php", {
                    act: "restore_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        this._resetReplyHide(), this.playStory()
                    },
                    showProgress: () => Object(V.a)(t, "loading"),
                    hideProgress: () => Object(V.hb)(t, "loading")
                })
            }
            _resetReplyHide() {
                re(Object(V.H)("stories_hide_reply_wrap", this.contWrap)), Object(V.hb)(this.wrapEl, "hiding_reply")
            }
            _hideAllReplies() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: Object(ve.d)("global_warning")
                }, Object(ve.d)("stories_delete_all_replies_confirm").replace("{name}", e), Object(ve.d)("global_continue"), this._doHideAllReplies.bind(this), Object(ve.d)("global_cancel"))
            }
            _doHideAllReplies(e) {
                ajax.post("al_stories.php", {
                    act: "hide_all_replies",
                    owner_id: this.getOwnerId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: () => {
                        Object(ye.b)().hide(), this.opts.removeList(), this.data.items = [];
                        var e = Object(V.H)("_stories_hide_replies", this.contWrap);
                        val(e, Object(ve.d)("stories_all_replies_hidden")), Object(V.a)(e, "disabled")
                    },
                    showProgress: pe.o.pbind(e),
                    hideProgress: pe.w.pbind(e)
                })
            }
            _ban() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: Object(ve.d)("global_warning")
                }, Object(ve.d)("stories_ban_confirm").replace("{name}", e), Object(ve.d)("global_continue"), this._doBan.bind(this), Object(ve.d)("global_cancel"))
            }
            _doBan(e) {
                ajax.post("al_stories.php", {
                    act: "ban",
                    owner_id: this.getOwnerId(),
                    hash: this.data.stories_ban_hash
                }, {
                    onDone: () => {
                        Object(ye.b)().hide(), this.opts.removeList(), this.data.items = [];
                        var e = Object(V.H)("_stories_reply_ban", this.contWrap);
                        val(e, Object(ve.d)("stories_banned")), Object(V.a)(e, "disabled")
                    },
                    showProgress: pe.o.pbind(e),
                    hideProgress: pe.w.pbind(e)
                })
            }
            _replyHideEnd(e) {
                Object(V.H)("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && O(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(e || this.getIndex(), !isNumeric(e)))
            }
            _feedbackRemoveReplyFromDom(e) {
                var t = Object(V.H)("stories_feedback_content", this.wrapEl);
                if (t) {
                    var s = t.querySelector(`#feed_story_${e}`);
                    s && Object(V.a)(s, "removed")
                }
            }
            onReplyDeleted(e) {
                this._feedbackRemoveReplyFromDom(e)
            }
            _updateFeedStoryPreview() {
                var e = Object(V.F)("feed_story_" + this.layer.getBlockKey(this.data));
                if (e && !hasClass(e, "stories_feed_reply_item")) {
                    var t = this.indexToUnread(!0),
                        s = this.data.items[t];
                    s && s.small_preview && Object(V.rb)(e, "background-image", `url(${s.small_preview})`)
                }
            }
            _sendStatEvent(e) {
                var t = this.getCurStoryData();
                ajax.post("al_stories.php", Object(Q.i)({
                    act: "stat",
                    source_story: this.getRawId()
                }, t.stats[e]))
            }
            _sendStatStickerEvent(e, t) {
                var {
                    clickable_stickers: s
                } = this.getCurStoryData();
                ajax.post("al_stories.php", Object(Q.i)({
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
                var s = Object(me.b)("al_stories.php", {
                    act: "report_box",
                    type: t
                }, {
                    onDone: () => {
                        var e = Object(V.G)("radiobtn", "stories_report");
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
                s.removeButtons(), s.addButton(Object(ve.d)("box_send"), this._sendReportButtonDidPress.bind(this)), s.addButton(Object(ve.d)("global_cancel"), !1, "no")
            }
            _sendReportButtonDidPress(e) {
                var t, s, i = this.index,
                    {
                        narrative: r,
                        report_hash: o
                    } = this.getCurStoryData(),
                    a = !!r;
                a ? (t = r.raw_id, s = r.report_hash) : (t = this.getRawId(), s = o), ajax.post("al_stories.php", {
                    act: "report",
                    type: a ? "narrative" : "story",
                    item_raw: t,
                    reason: radioBtns.stories_report.val,
                    hash: s
                }, {
                    onDone: () => {
                        Object(ye.b)().hide(), this.layer._sendNavigationStatEvents("claim"), a ? this._popCoverAndCleanNarrativeList(r) : this._popStoryAndClearList(i), showDoneBox(Object(ve.d)("stories_report_sent"), {
                            className: "stories_done_msg"
                        })
                    },
                    showProgress: pe.o.pbind(e),
                    hideProgress: pe.w.pbind(e)
                })
            }
            onLiveEnded(e) {
                this.isActiveLive() && (this.data.items[this.index].can_share = !e, this.story.onLiveEnded(), this.updateBottom())
            }
            updateLiveViewersCount(e) {
                val(this.descEl, e)
            }
        }
        var we = .563,
            fe = 1.78,
            ke = 540,
            Se = 320,
            Ee = "user_personal_card",
            Oe = "group_personal_card",
            je = s("Tn+0");
        var Le = [];
        var Ce = [];
        var Te = () => Ce.length || Le.length;
        var xe = o.Promise,
            Be = {
                show(e, t = {}) {
                    if (e.match(/story/) && (e = this._parseList(e)), cur.storyLayer && cur.storyLayer.list === e.split("/")[1]) return !1;
                    this.getList(e).then(({
                        blockKey: e,
                        list: s,
                        items: i,
                        extra: r
                    }) => {
                        f(new class {
                            constructor(e, t, s, i, r) {
                                this.queue = [], this.storiesToRead = [], this.storiesSkip = [];
                                try {
                                    window.Videoview && Videoview.togglePlay(!1)
                                } catch (e) {}
                                this.initDOM(), this.show(), this._init(e, t, s, i), addClass(this.layerEl, "shown"), this._source = r.source, this._initViewerSource(), this._sendOpeningEvents(), r.isOpenNarrativeFromFeed && (this.isOpenNarrativeFromFeed = r.isOpenNarrativeFromFeed)
                            }
                            _init(e, t, s, i) {
                                var [r, o = ""] = e.split("&"), [a, n] = r.split("_");
                                this.storyRaw = r, this.storyOwner = a, this.storyId = n, this.blockKey = `${a}${o}`, this.list = t, this.storiesList = s, this.extra = this.parseExtra(i), this.initStories()
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
                                    var {
                                        activeStory: l
                                    } = this._renderStories();
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
                                                n = new be(e, {
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
                                            var {
                                                owner_id: s,
                                                id: i
                                            } = t.narrative;
                                            statlogsValueEvent("bookmarks_product_analytics", {
                                                item_type: "narrative",
                                                item_owner_id: s,
                                                item_id: i,
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
                                if (this._readStories(), this.destroy(), !e && (w.pop(), cur.storyLayer = w[w.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (S(0, !0), layerQueue.pop())), window.wkcur && window.wkcur.shown && WkView.restoreLayer({}), "group_stories" === this.list && Stories.groupStoriesBlockUpdate(), this.list.startsWith("archive") && !1 !== this.hideAllLayers && !e) {
                                    if (!_message_boxes[cur.storiesArchiveBoxGUID]) return;
                                    _message_boxes[cur.storiesArchiveBoxGUID].forceHide = !1, _message_boxes[cur.storiesArchiveBoxGUID]._show(!0, !1, !0), window.updateStoriesArchiveBoxPosition && window.updateStoriesArchiveBoxPosition()
                                }
                            }
                            back(e = !1) {
                                this.hideAllLayers = !1;
                                var t = cancelStack[cancelStack.length - 1];
                                t && "stories_form_focus" === t.name && cancelStackPop(), this.hide(!1, e)
                            }
                            _getScreenStoriesCount() {
                                return 2 * Math.floor(window.innerWidth / (window.innerHeight * we)) + 1
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
                                var {
                                    activeStory: e
                                } = this;
                                e.markAsActive(), e.playStory(!0)
                            }
                            _onStartStory() {
                                var {
                                    activeStory: e,
                                    list: t
                                } = this;
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
                                var {
                                    activeStory: e
                                } = cur.storyLayer;
                                e && cur.storyLayer.scrollToStory(e, !0)
                            }
                            pauseStory(e) {
                                this.activeStory && this.activeStory.pauseStory(e)
                            }
                            playStory(e = !1) {
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
                                                cur.storiesKeyDownLong = setTimeout(t._longTapHandle.bind(t), Y)
                                        }
                                        cur.storiesKeyDownTs = vkNow()
                                    }
                                }
                            }
                            onKeyUp(e) {
                                cur.storiesKeyDown = !1, clearTimeout(cur.storiesKeyDownLong), cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e) && e.keyCode === KEY.SPACE && (cancelEvent(e), vkNow() - cur.storiesKeyDownTs > Y ? cur.storyLayer.playStory(!0) : cur.storyLayer.nextStory())
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
                                if (this.storiesToRead.length && Te()) {
                                    var e = this._getSource(),
                                        t = this.storiesToRead.join(","),
                                        s = this.storiesSkip.join(",");
                                    this.storiesToRead = [], ajax.post("al_stories.php", {
                                        act: "read_stories",
                                        stories: t,
                                        source: e,
                                        stories_skip: s,
                                        navigation_stats: function() {
                                            var e = Le.map(({
                                                ownerId: e,
                                                storyId: t,
                                                source: s,
                                                action: i
                                            }) => [e, t, s, i].join(",")).join(";");
                                            return Le = [], e
                                        }(),
                                        loading_stats: function() {
                                            var e = Ce.map(({
                                                ownerId: e,
                                                storyId: t,
                                                source: s,
                                                time: i
                                            }) => [e, t, s, i].join(",")).join(";");
                                            return Ce = [], e
                                        }(),
                                        connection_type: function() {
                                            var {
                                                connection: e
                                            } = navigator;
                                            if (!e) return "";
                                            var {
                                                effectiveType: t,
                                                downlink: s
                                            } = e;
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
                                return this._source ? this._source : (-1 !== [Ee, Oe, X, je.b].indexOf(cur.module) && (e = cur.module), e)
                            }
                            _sendNavigationStatEvents(e, t = !0, s = {}) {
                                var i = this.activeStory,
                                    r = this.getStoryRaw() || i.getCurStoryData().raw_id,
                                    o = this._getSource();
                                t && this._sendProductAnalyticEvents(e, s), this._updateLastStoryOpenAction(e),
                                    function({
                                        storyRawId: e,
                                        source: t,
                                        action: s
                                    }) {
                                        var [i, r] = e.split("_");
                                        "reply" === t && (t = "replies_list");
                                        var o = {
                                            ownerId: i,
                                            storyId: r,
                                            source: t,
                                            action: s
                                        };
                                        Le.push(o)
                                    }({
                                        storyRawId: r,
                                        source: o,
                                        action: e
                                    })
                            }
                            _sendProductAnalyticEvents(e, t = {}) {
                                var s = this.activeStory,
                                    i = this.getStoryRaw() || s.getCurStoryData().raw_id,
                                    [r, o] = i.split("_"),
                                    a = s.getIndex(),
                                    n = s.getItemsLength() - a,
                                    {
                                        story: l
                                    } = s,
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
                                ! function({
                                    storyRawId: e,
                                    source: t,
                                    time: s
                                }) {
                                    var [i, r] = e.split("_"), o = {
                                        ownerId: i,
                                        storyId: r,
                                        source: t,
                                        time: s
                                    };
                                    Ce.push(o)
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
                                        var [r, o] = s[i].split(":");
                                        r && o && (t[r] = o)
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
                                    var [o, a] = getXY(i), n = getSize(i), l = window.innerHeight, d = Math.min(ke, Math.max(Se, l * we)), h = d * fe, c = Math.max(0, (l - h) / 2), _ = Math.max(0, (window.innerWidth - d) / 2);
                                    o = _ - o + d / 2 - n[0] / 2 + scrollGetX(), a = c - a + h / 2 - n[1] / 2 + scrollGetY(), o = -o, a = -a;
                                    var p = {};
                                    "expand" === e && (p.transform = `translate(${o}px, ${a}px) scale(0)`, this.animateFromEl = t), setStyle(this.activeStory.wrapEl, p), "minimize" === e && setStyle(i, "transform", "scale(0)"), this.animationTimer = setTimeout(() => {
                                        addClass(this.stories, "animated"), addClass(i, "stories_feed_item_ava_animate"), this.animationTimer = setTimeout(() => {
                                            "expand" === e ? (setStyle("stories_layers_background", "opacity", 1), setStyle(this.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(this.activeStory.wrapEl, "transform", `translate(${o}px, ${a}px) scale(0.01)`), setStyle(i, "transform", "scale(1)")), this.animationTimer = setTimeout(() => {
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
                                    [i] = getXY(t),
                                    [r] = getSize(t),
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
                        }(e, s, i, r, t), t);
                        var o = Object(ye.b)();
                        o && (t.fromEl = null, "stories" === o.wkRaw ? (o._hide(!1, !0, !0), o.forceHide = !0, cur.storiesArchiveBoxGUID = o.guid) : o.hide())
                    }).catch(e => {
                        vk.dev && debugLog(e), showFastBox(Object(ve.d)("global_error"), Object(ve.d)("global_unknown_error"))
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
                getList: e => new xe((t, s) => {
                    var [i, r, o] = e.split("/"), a = {
                        blockKey: i,
                        list: r,
                        extra: o
                    }, n = Be._getList(r);
                    isArray(n) ? (a.items = n, t(a)) : ajax.post("al_stories.php", {
                        act: "get_list",
                        list: r,
                        story_raw: i,
                        extra: o,
                        from_manage: window.cur.module === X ? 1 : 0
                    }, {
                        loader: !0,
                        onDone(e) {
                            cur["stories_list_" + r] = e.list, a.items = e.list, e.recommendations && (cur["stories_list_" + r + "_recommendations"] = e.recommendations), t(a)
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
                    var t = (e = decodeURIComponent(e)).match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\:\;\-]+))?$/i),
                        [, s, i, , r, , o] = t,
                        a = s + "_" + i;
                    return e.match(/from_feed\=1/) ? r = "feed" : e.match(/profile\=1/) ? r = "profile" : r || (r = a), a + "/" + r + "/" + o
                },
                initFeed(e = "stories_feed_items_container") {
                    e = Object(V.F)(e);
                    var t = Object(V.H)("stories_feed_items", e),
                        s = attr(t, "id");

                    function i() {
                        addEvent(e, browserFeatures.wheelEvent, Be.feedMouseWheel)
                    }

                    function r() {
                        removeEvent(e, browserFeatures.wheelEvent, Be.feedMouseWheel)
                    }
                    Be.updateFeedArrows(s), addEvent(e, "mouseenter", i), addEvent(e, "mouseleave", r), cur.destroy.push(function() {
                        removeEvent(e, browserFeatures.wheelEvent, Be.feedMouseWheel), removeEvent(e, "mouseenter", i), removeEvent(e, "mouseleave", r)
                    })
                },
                feedNext(e) {
                    var t = Object(V.F)("stories_feed_wrap");
                    return e && (t = domClosest("stories_feed_wrap", e.target)), this.feedPaging("next", null, t)
                },
                feedPrev(e) {
                    var t = Object(V.F)("stories_feed_wrap");
                    return e && (t = domClosest("stories_feed_wrap", e.target)), this.feedPaging("prev", null, t)
                },
                feedPaging(e, t, s) {
                    s || (s = Object(V.F)("stories_feed_wrap"));
                    var i = Object(V.H)("stories_feed_items", s),
                        r = attr(i, "id"),
                        o = r + "_position",
                        a = cur[o] || 0,
                        n = getSize(s)[0];
                    if (isNumeric(e)) a += e;
                    else {
                        var l = n - 100;
                        "next" === e ? a += l : a -= l
                    }
                    cur[o] = Math.max(0, Math.min(a, i.scrollWidth - n)), t ? Object(V.hb)(i, "animated") : Object(V.a)(i, "animated"), setStyle(i, "transform", "translateX(-" + cur[o] + "px)"), Be.updateFeedArrows(r)
                },
                feedScrollToOwner(e) {
                    var t = Object(V.F)("feed_story_" + e);
                    if (t) {
                        var s = domClosest("stories_feed_items", t),
                            i = s.offsetWidth,
                            r = attr(s, "id") + "_position",
                            o = t.offsetWidth,
                            a = t.offsetLeft,
                            n = domClosest("stories_feed_wrap", s);
                        cur[r] = a - i + i / 2 + o / 2, Be.feedPaging(0, !0, n)
                    }
                },
                updateFeedStories(e, t, s = "stories_feed_items") {
                    var i = Object(V.F)(s),
                        r = domClosest("stories_feed_wrap", i);
                    if (e = e || "news", i)
                        if (inArray(e, ["news", "search"])) {
                            var o = (e, i) => {
                                t && t.cb && t.cb(), this._setList("feed", i);
                                var o = Object(V.F)(s);
                                o && (e ? (setStyle(o, "transform", "translateX(0px)"), Object(V.zb)(o, e), o.children.length < 6 ? Object(V.a)(r, "stories_feed_not_nav_buttons") : Object(V.hb)(r, "stories_feed_not_nav_buttons"), cur[s + "_position"] = 0, Be.updateFeedArrows(s), show(r)) : hide(r))
                            };
                            if (t && t.stories) {
                                var {
                                    section: a,
                                    q: n,
                                    stories: l
                                } = t, {
                                    html: d,
                                    js: h
                                } = l;
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
                        Be.feedPaging(s, 1, t)
                    }
                },
                updateFeedArrows(e = "stories_feed_items") {
                    var t = Object(V.F)(e),
                        s = e + "_position";
                    if (t) {
                        cur[s] || (cur[s] = 0);
                        var i = Object(V.H)("stories_feed_wrap").offsetWidth,
                            r = t.scrollWidth - i,
                            o = Object(V.H)("stories_feed_arrow_left", domPN(t)),
                            a = Object(V.H)("stories_feed_arrow_right", domPN(t));
                        0 === cur[s] ? Object(V.a)(o, "disabled") : Object(V.hb)(o, "disabled"), cur[s] === r || r <= 0 ? Object(V.a)(a, "disabled") : Object(V.hb)(a, "disabled")
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
                    cur.storiesBlackListShown[s] ? (delete cur.storiesBlackListShown[s], Object(V.hb)(e, "olist_item_wrap_on")) : (cur.storiesBlackListShown[s] = 1, Object(V.a)(e, "olist_item_wrap_on"))
                },
                saveBlackList(e) {
                    var t = Object.keys(cur.storiesBlackListShown);
                    0 !== t.length ? ajax.post("al_stories.php", {
                        act: "save_blacklist",
                        hash: cur.storiesBlackList.hash,
                        list: t.join(",")
                    }, {
                        onDone() {
                            Object(ye.b)().hide(), Be.updateFeedStories()
                        },
                        showProgress: lockButton.pbind(e),
                        hideProgress: unlockButton.pbind(e)
                    }) : Object(ye.b)().hide()
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
                        a || (a = '<div class="no_rows">' + Object(ve.d)("global_search_not_found").replace("{search}", clean(t)) + "</div>"), Object(V.zb)(Object(V.H)("olist", "stories_black_list_result"), a)
                    }
                },
                blackListInit(e) {
                    cur.storiesBlackListShown = {}, cur.storiesBlackList = e, Object(ye.b)().setOptions({
                        width: 450,
                        bodyStyle: "padding: 0px",
                        onClean: function() {
                            this.storyLayer && this.storyLayer.playStory(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
                        }
                    }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, e => e.name, () => {
                        Be.blacklistUpdateUsers("")
                    }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), Object(ye.b)().addButton(Object(ve.d)("global_save"), Be.saveBlackList).addButton(Object(ve.d)("global_cancel"), void 0, "no")) : Object(ye.b)().addButton(Object(ve.d)("global_close"))
                },
                preloadUrl(e) {
                    u(e)
                },
                showNextRepliesChunk(e) {
                    var t = gpeByClass("stories_feedback_replies_items", e);
                    Object(V.hb)(Object(V.H)("stories_replies_chunk_hidden", t), "stories_replies_chunk_hidden");
                    var s = Object(V.H)("stories_replies_chunk_hidden", t);
                    s ? Object(V.zb)(e, langNumeric(Object(ve.d)("stories_replies_more_button", intval(attr(s, "data-size"))))) : re(e), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
                },
                groupStoriesBlockUpdate() {
                    var e = Be._getList("group_stories"),
                        t = e && e[0] && e[0].items;
                    if (t) {
                        for (var s = 0, i = 0; i < t.length; i++) {
                            t[i].unread && s++
                        }
                        var r = Object(V.H)("stories_groups_block_stories_wrap"),
                            o = Object(V.H)("stories_groups_block_stories_button", r);
                        Object(V.wb)(r, "has_unread", s > 0), Object(V.wb)(r, "has_stories", t.length > 0), Object(V.wb)(o, "has_stories", t.length > 0);
                        var a = Object(Q.d)(cur.storiesPreviews),
                            n = a.splice(a.length - s, 3);
                        n.length < 3 && (n = n.concat(a.slice(0, 3 - n.length))), n.reverse();
                        for (var l = "", d = n.length - 1; d >= 0; d--) l += cur.storiesPreviewsRowHtml.replace("{url}", n[d]);
                        Object(V.zb)(Object(V.H)("stories_groups_block_stories_rows", r), l)
                    }
                },
                isLiveShown: e => !!(cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.isActiveLive()) && cur.storyLayer.activeStory.story.videoRaw === e,
                activeLiveEnded(e) {
                    cur.storyLayer.activeStory.onLiveEnded(e)
                },
                updateLiveViewersCount(e) {
                    var t = e ? Object(ve.d)("stories_live_N_watching", e, !0) : "";
                    cur.storyLayer.activeStory.updateLiveViewersCount(t)
                }
            };
        window.Stories = Be;
        try {
            stManager.done("stories.js")
        } catch (e) {}
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
    "T/g7": function(e, t, s) {
        "use strict";
        s.d(t, "b", function() {
            return n
        });
        var i = s("nAFc"),
            r = {},
            o = window.getLang,
            a = window.langNumeric;

        function n(e, t = !1, s) {
            var n = "number" == typeof t,
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
    XpgC: function(e, t, s) {
        "use strict";
        s.d(t, "a", function() {
            return l
        });
        var i = s("q1tI"),
            r = s("i8i4"),
            o = (s("17x9"), s("pemR")),
            a = s("clTp"),
            n = () => "undefined" != typeof window;
        class l extends i.Component {
            constructor(e) {
                super(e), this.onMouseEnter = (e => {
                    if (this.el) {
                        var {
                            text: t,
                            position: s,
                            align: i,
                            marginTop: r,
                            marginLeft: o,
                            maxWidth: n,
                            appearance: l
                        } = this.props, d = Object(a.a)(this.el);
                        this.update({
                            text: t,
                            position: s,
                            align: i,
                            rect: d,
                            marginTop: r,
                            marginLeft: o,
                            maxWidth: n,
                            appearance: l
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
                        position: s,
                        align: r,
                        text: a,
                        removed: n,
                        maxWidth: l,
                        appearance: d
                    } = this.state.tooltip, h = Object(o.a)("Tooltip", `Tooltip--${s}`, `Tooltip--${d}`, {
                        "Tooltip--removed": !!n,
                        [`Tooltip--align-${r}`]: "t" === s || "b" === s
                    });
                    return i.createElement("div", {
                        className: h,
                        style: {
                            top: t,
                            left: e
                        },
                        onTransitionEnd: this.onTransitionEnd
                    }, i.createElement("div", {
                        className: "Tooltip__in",
                        style: {
                            maxWidth: l
                        },
                        dangerouslySetInnerHTML: {
                            __html: a
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
                    align: s,
                    text: i,
                    rect: r,
                    marginTop: o,
                    marginLeft: a,
                    maxWidth: n,
                    appearance: l
                } = e, d = r.left, h = r.top;
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
            return o
        }), s.d(t, "a", function() {
            return a
        }), s.d(t, "b", function() {
            return n
        }), s.d(t, "d", function() {
            return l
        });
        var {
            Emoji: i
        } = window, r = (s("Oyvg"), s("pIFo"), [
            ["&amp;", "&"],
            ["&lt;", "<"],
            ["&gt;", ">"],
            ["&quot;", '"']
        ]);

        function o(e) {
            return r.reduce((e, [t, s]) => e.replace(new RegExp(s, "ig"), t), e)
        }

        function a(e) {
            return r.reduce((e, [t, s]) => e.replace(new RegExp(t, "ig"), s), e).replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(t))
        }

        function n(e) {
            return o(e).replace(/[\u00A0-\u9999<>\&]/gim, e => `&#${e.charCodeAt(0)};`)
        }

        function l(e, {
            lineBreak: t = !1,
            convertEmoji: s = !0
        } = {}) {
            var r = a(e);
            return r = r.replace(/\n\r/gi, "\n"), "oneline" === t ? r = r.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === t && (r = r.replace(/\n/gi, "<br>")), r = o(r), s && (r = i.emojiToHTML(r, !0)), r
        }
    },
    r7nW: function(e, t, s) {
        "use strict";
        var i = s("q1tI"),
            r = s("i8i4"),
            o = (s("17x9"), s("pemR"));
        class a extends i.Component {
            constructor(...e) {
                super(...e), this.getScrollbarWidth = (() => {
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
                    var {
                        onClose: t
                    } = this.props;
                    "Escape" === e.key && t()
                }), this.onBackdropClick = (() => {
                    var {
                        onClose: e,
                        disableBackdropClick: t
                    } = this.props;
                    !t && e()
                })
            }
            componentDidMount() {
                var {
                    disableEscapeClose: e,
                    disableBodyScroll: t
                } = this.props;
                e || document.body.addEventListener("keydown", this.onDocumentKeyDown), t && this.hideScrollBar()
            }
            componentWillUnmount() {
                var {
                    disableEscapeClose: e,
                    disableBodyScroll: t
                } = this.props;
                e || document.body.removeEventListener("keydown", this.onDocumentKeyDown), t && this.showScrollBar()
            }
            renderModal() {
                var {
                    className: e
                } = this.props, t = Object(o.a)("BaseModal", e);
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