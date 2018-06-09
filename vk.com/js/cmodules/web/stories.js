! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: r
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var o in e) t.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 28)
}([function(e, t, n) {
    "use strict";

    function r(e) {
        return function() {
            return e
        }
    }
    var o = function() {};
    o.thatReturns = r, o.thatReturnsFalse = r(!1), o.thatReturnsTrue = r(!0), o.thatReturnsNull = r(null), o.thatReturnsThis = function() {
        return this
    }, o.thatReturnsArgument = function(e) {
        return e
    }, e.exports = o
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "STORY_HORIZONTAL_RATIO", function() {
        return r
    }), n.d(t, "STORY_VERTICAL_RATIO", function() {
        return o
    }), n.d(t, "STORY_MAX_WIDTH", function() {
        return i
    }), n.d(t, "STORY_MAX_HEIGHT", function() {
        return a
    });
    var r = .563,
        o = 1.78,
        i = 540,
        a = 320
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "STORIES_MANAGE_MODULE", function() {
        return r
    });
    var r = "stories_manage"
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e !== e && t !== t
    }

    function o(e, t) {
        if (r(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var n = Object.keys(e),
            o = Object.keys(t);
        if (n.length !== o.length) return !1;
        for (var a = 0; a < n.length; a++)
            if (!i.call(t, n[a]) || !r(e[n[a]], t[n[a]])) return !1;
        return !0
    }
    var i = Object.prototype.hasOwnProperty;
    e.exports = o
}, function(e, t) {}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "MODULE", function() {
        return r
    });
    var r = "user_personal_card"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.story,
            n = t.getCurStoryData(),
            r = n.hide_settings,
            a = window,
            s = a.uiActionsMenu;
        if (r) return null;
        var l = o(t);
        if (0 === l.length) return null;
        var u = void 0,
            c = void 0,
            d = function(e) {
                clearTimeout(u), t.pauseStory(), s.show(c, e)
            },
            f = function() {
                s.hide(c), clearTimeout(u), u = setTimeout(function() {
                    return t.playStory()
                }, 300)
            };
        return i.createElement("div", {
            className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
            onMouseEnter: d,
            onMouseLeave: f,
            ref: function(e) {
                c = e
            }
        }, i.createElement("div", {
            className: "ui_actions_menu _ui_menu"
        }, l.map(function(e) {
            var t = e.label,
                n = (e.className, e.onClick);
            return i.createElement("div", {
                key: t,
                className: "ui_actions_menu_item",
                onClick: n,
                dangerouslySetInnerHTML: {
                    __html: getLang(t)
                }
            })
        })))
    }

    function o(e) {
        var t = [],
            n = e.getCurStoryData(),
            r = n.raw_id,
            o = n.can_hide_reply,
            i = n.report_hash,
            s = n.can_remove,
            l = e.data.can_blacklist,
            u = r.split("_").map(function(e) {
                return intval(e)
            }),
            c = a(u, 1),
            d = c[0];
        return l && t.push({
            label: "stories_add_blacklist_button",
            onClick: function() {
                return e._addToBlacklist()
            }
        }), o && t.push({
            label: "stories_hide_reply_button",
            onClick: function() {
                return e._hideReply()
            }
        }), s && e.getOwnerId() < 0 && t.push({
            label: "global_delete",
            onClick: function() {
                return e.removeStoryBox()
            }
        }), i && t.push({
            label: "stories_report",
            onClick: function() {
                return e.report()
            }
        }), d !== vk.id && t.push({
            label: "stories_settings",
            onClick: function() {
                return window.Stories.showBlackList()
            }
        }), t
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(42),
        a = (n(41), function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    o = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }())
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.story,
            n = t.getReplies(),
            r = n.count,
            a = n.count_str,
            s = n.users,
            l = t.getCurStoryData(),
            u = l.can_manage;
        if (u || !r) return null;
        var c = void 0,
            d = function(e) {
                t.showFeedbackTooltip(), e.stopPropagation()
            },
            f = function() {
                var e = t.getReplies();
                e.users.length && (t.pauseStory(), showStory(e.users[0].id + "/replies" + t.getRawId(), {
                    fromEl: c
                }))
            };
        return i.createElement("div", {
            ref: function(e) {
                c = e
            },
            className: "stories_answers",
            onClick: f
        }, i.createElement(o, {
            users: s
        }), i.createElement("div", {
            className: "stories_answers_count",
            dangerouslySetInnerHTML: {
                __html: a
            }
        }), i.createElement("div", {
            className: "stories_answers_tt_arrow",
            onClick: d
        }))
    }

    function o(e) {
        var t = e.users;
        return t.map(function(e, n) {
            var r = e.id,
                o = e.photo;
            return i.createElement("div", {
                key: r,
                className: "stories_answer_user",
                style: {
                    backgroundImage: "url(" + o + ")",
                    zIndex: t.length - n
                }
            })
        })
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var i = n(42);
    n(41)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = arguments.length - 1, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        g(!1, "Minified React error #" + e + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", n)
    }

    function o(e, t, n) {
        this.props = e, this.context = t, this.refs = _, this.updater = n || R
    }

    function i() {}

    function a(e, t, n) {
        this.props = e, this.context = t, this.refs = _, this.updater = n || R
    }

    function s(e, t, n) {
        var r = void 0,
            o = {},
            i = null,
            a = null;
        if (null != t)
            for (r in void 0 !== t.ref && (a = t.ref), void 0 !== t.key && (i = "" + t.key), t) A.call(t, r) && !D.hasOwnProperty(r) && (o[r] = t[r]);
        var s = arguments.length - 2;
        if (1 === s) o.children = n;
        else if (s > 1) {
            for (var l = Array(s), u = 0; s > u; u++) l[u] = arguments[u + 2];
            o.children = l
        }
        if (e && e.defaultProps)
            for (r in s = e.defaultProps) void 0 === o[r] && (o[r] = s[r]);
        return {
            $$typeof: k,
            type: e,
            key: i,
            ref: a,
            props: o,
            _owner: F.current
        }
    }

    function l(e) {
        return "object" == typeof e && null !== e && e.$$typeof === k
    }

    function u(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + ("" + e).replace(/[=:]/g, function(e) {
            return t[e]
        })
    }

    function c(e, t, n, r) {
        if (B.length) {
            var o = B.pop();
            return o.result = e, o.keyPrefix = t, o.func = n, o.context = r, o.count = 0, o
        }
        return {
            result: e,
            keyPrefix: t,
            func: n,
            context: r,
            count: 0
        }
    }

    function d(e) {
        e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > B.length && B.push(e)
    }

    function f(e, t, n, o) {
        var i = typeof e;
        ("undefined" === i || "boolean" === i) && (e = null);
        var a = !1;
        if (null === e) a = !0;
        else switch (i) {
            case "string":
            case "number":
                a = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case k:
                    case S:
                        a = !0
                }
        }
        if (a) return n(o, e, "" === t ? "." + p(e, 0) : t), 1;
        if (a = 0, t = "" === t ? "." : t + ":", Array.isArray(e))
            for (var s = 0; s < e.length; s++) {
                i = e[s];
                var l = t + p(i, s);
                a += f(i, l, n, o)
            } else if (null === e || "undefined" == typeof e ? l = null : (l = N && e[N] || e["@@iterator"], l = "function" == typeof l ? l : null), "function" == typeof l)
                for (e = l.call(e), s = 0; !(i = e.next()).done;) i = i.value, l = t + p(i, s++), a += f(i, l, n, o);
            else "object" === i && (n = "" + e, r("31", "[object Object]" === n ? "object with keys {" + Object.keys(e).join(", ") + "}" : n, ""));
        return a
    }

    function p(e, t) {
        return "object" == typeof e && null !== e && null != e.key ? u(e.key) : t.toString(36)
    }

    function h(e, t) {
        e.func.call(e.context, t, e.count++)
    }

    function m(e, t, n) {
        var r = e.result,
            o = e.keyPrefix;
        e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? y(e, r, n, w.thatReturnsArgument) : null != e && (l(e) && (t = o + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(j, "$&/") + "/") + n, e = {
            $$typeof: k,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        }), r.push(e))
    }

    function y(e, t, n, r, o) {
        var i = "";
        null != n && (i = ("" + n).replace(j, "$&/") + "/"), t = c(t, i, r, o), null == e || f(e, "", m, t), d(t)
    }
    var v = n(38),
        g = n(34),
        _ = n(13),
        w = n(0),
        b = "function" == typeof Symbol && Symbol["for"],
        k = b ? Symbol["for"]("react.element") : 60103,
        S = b ? Symbol["for"]("react.portal") : 60106,
        C = b ? Symbol["for"]("react.fragment") : 60107,
        E = b ? Symbol["for"]("react.strict_mode") : 60108,
        T = b ? Symbol["for"]("react.profiler") : 60114,
        x = b ? Symbol["for"]("react.provider") : 60109,
        L = b ? Symbol["for"]("react.context") : 60110,
        P = b ? Symbol["for"]("react.async_mode") : 60111,
        O = b ? Symbol["for"]("react.forward_ref") : 60112;
    b && Symbol["for"]("react.timeout");
    var N = "function" == typeof Symbol && Symbol.iterator,
        R = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        };
    o.prototype.isReactComponent = {}, o.prototype.setState = function(e, t) {
        "object" != typeof e && "function" != typeof e && null != e ? r("85") : void 0, this.updater.enqueueSetState(this, e, t, "setState")
    }, o.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    }, i.prototype = o.prototype;
    var I = a.prototype = new i;
    I.constructor = a, v(I, o.prototype), I.isPureReactComponent = !0;
    var F = {
            current: null
        },
        A = Object.prototype.hasOwnProperty,
        D = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        },
        j = /\/+/g,
        B = [],
        M = {
            Children: {
                map: function(e, t, n) {
                    if (null == e) return e;
                    var r = [];
                    return y(e, r, null, t, n), r
                },
                forEach: function(e, t, n) {
                    return null == e ? e : (t = c(null, null, t, n), null == e || f(e, "", h, t), void d(t))
                },
                count: function(e) {
                    return null == e ? 0 : f(e, "", w.thatReturnsNull, null)
                },
                toArray: function(e) {
                    var t = [];
                    return y(e, t, null, w.thatReturnsArgument), t
                },
                only: function(e) {
                    return l(e) ? void 0 : r("143"), e
                }
            },
            createRef: function() {
                return {
                    current: null
                }
            },
            Component: o,
            PureComponent: a,
            createContext: function(e, t) {
                return void 0 === t && (t = null), e = {
                    $$typeof: L,
                    _calculateChangedBits: t,
                    _defaultValue: e,
                    _currentValue: e,
                    _currentValue2: e,
                    _changedBits: 0,
                    _changedBits2: 0,
                    Provider: null,
                    Consumer: null
                }, e.Provider = {
                    $$typeof: x,
                    _context: e
                }, e.Consumer = e
            },
            forwardRef: function(e) {
                return {
                    $$typeof: O,
                    render: e
                }
            },
            Fragment: C,
            StrictMode: E,
            unstable_AsyncMode: P,
            unstable_Profiler: T,
            createElement: s,
            cloneElement: function(e, t, n) {
                null === e || void 0 === e ? r("267", e) : void 0;
                var o = void 0,
                    i = v({}, e.props),
                    a = e.key,
                    s = e.ref,
                    l = e._owner;
                if (null != t) {
                    void 0 !== t.ref && (s = t.ref, l = F.current), void 0 !== t.key && (a = "" + t.key);
                    var u = void 0;
                    e.type && e.type.defaultProps && (u = e.type.defaultProps);
                    for (o in t) A.call(t, o) && !D.hasOwnProperty(o) && (i[o] = void 0 === t[o] && void 0 !== u ? u[o] : t[o])
                }
                if (o = arguments.length - 2, 1 === o) i.children = n;
                else if (o > 1) {
                    u = Array(o);
                    for (var c = 0; o > c; c++) u[c] = arguments[c + 2];
                    i.children = u
                }
                return {
                    $$typeof: k,
                    type: e.type,
                    key: a,
                    ref: s,
                    props: i,
                    _owner: l
                }
            },
            createFactory: function(e) {
                var t = s.bind(null, e);
                return t.type = e, t
            },
            isValidElement: l,
            version: "16.4.0",
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: F,
                assign: v
            }
        },
        U = {
            "default": M
        },
        H = U && M || U;
    e.exports = H["default"] ? H["default"] : H
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
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
    n.r(t);
    var a = n(42),
        s = n(23),
        l = n(6),
        u = n(7),
        c = n(29),
        d = window,
        f = d.getLang,
        p = d.showTooltip,
        h = d.trim,
        m = d.addEvent,
        y = d.removeEvent,
        v = d.cancelEvent,
        g = d.isObject,
        _ = function(e) {
            function t(n) {
                r(this, t);
                var i = o(this, e.call(this, n));
                return i.emojiId = !1, i.state = {
                    story: n.story,
                    sendFormHasText: !1,
                    sendFormFocused: !1
                }, i
            }
            return i(t, e), t.prototype.componentDidMount = function() {
                this.emojiInit()
            }, t.prototype.componentWillUnmount = function() {
                this.emojiId && (Emoji.destroy(this.emojiId), delete this.emojiId)
            }, t.prototype.componentDidUpdate = function() {
                this.emojiInit()
            }, t.prototype.render = function() {
                var e = this.props.story;
                if (!e.story || !this.props.story.getCurStoryData()) return "";
                var t = {
                    left_side_empty: this._leftSideIsEmpty()
                };
                return a.createElement("div", {
                    className: s.classNames("stories_story_bottom", t)
                }, a.createElement(u["default"], {
                    story: e
                }), a.createElement("div", {
                    className: "stories_story_bottom_controls",
                    ref: "controls"
                }, a.createElement(c["default"], {
                    story: e
                }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), a.createElement(l["default"], {
                    story: e
                })))
            }, t.prototype._renderLink = function() {
                var e = this.props.story.getCurStoryData(),
                    t = e.link;
                return g(t) ? a.createElement("div", {
                    className: "stories_link_wrap"
                }, a.createElement("a", {
                    target: "_blank",
                    className: "stories_link",
                    href: t.url,
                    title: t.text,
                    onClick: this._linkDidPress.bind(this),
                    dangerouslySetInnerHTML: {
                        __html: t.text
                    }
                })) : ""
            }, t.prototype._renderMask = function() {
                var e = this.props.story.getCurStoryData(),
                    t = e.mask_id;
                return t ? a.createElement("div", {
                    className: "stories_button mask _mask_button",
                    onMouseOver: function(e) {
                        return p(e.target, {
                            black: 1,
                            center: 1,
                            shift: [1, 13, 0],
                            text: f("stories_mask_tooltip")
                        })
                    },
                    onClick: this._maskButtonDidPress.bind(this)
                }) : ""
            }, t.prototype._renderShare = function() {
                var e = this.props.story.getCurStoryData(),
                    t = e.can_share;
                return t !== !0 ? "" : a.createElement("div", {
                    className: "stories_button share _share_button",
                    onMouseOver: function(e) {
                        return p(e.target, {
                            black: 1,
                            center: 1,
                            shift: [1, 13, 0],
                            text: f("stories_share")
                        })
                    },
                    onClick: this._shareButtonDidPress.bind(this)
                })
            }, t.prototype._renderRemove = function() {
                var e = this.props.story,
                    t = e.getCurStoryData(),
                    n = t.can_remove;
                return !n || e.getOwnerId() < 0 ? "" : a.createElement("div", {
                    className: "stories_button remove _remove_button",
                    onMouseOver: function(e) {
                        return p(e.target, {
                            black: 1,
                            center: 1,
                            shift: [1, 13, 0],
                            text: f("global_delete")
                        })
                    },
                    onClick: this._removeButtonDidPress.bind(this)
                })
            }, t.prototype._canMessage = function() {
                var e = this.props.story.getCurStoryData(),
                    t = e.link,
                    n = e.can_comment;
                return !(g(t) || !n)
            }, t.prototype._renderMessageForm = function() {
                var e = this,
                    t = this.props.story;
                return this._canMessage() ? a.createElement("div", {
                    ref: "sendForm",
                    className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                }, a.createElement("div", {
                    className: "stories_send_form_text_wrap"
                }, a.createElement("div", {
                    contentEditable: !0,
                    ref: "messageInput",
                    className: "stories_send_form_text",
                    placeholder: f("stories_answer_placeholder"),
                    onFocus: this._sendFormDidFocus.bind(this),
                    onBlur: this._sendFormDidBlur.bind(this),
                    onKeyUp: function() {
                        return t._onSendFormKeyUp()
                    }
                })), a.createElement("div", {
                    className: "stories_send_form_helper"
                }, a.createElement("div", {
                    className: s.classNames("stories_send_form_buttons _emoji_wrap", {
                        shown: this.state.sendFormFocused || this.state.sendFormHasText
                    })
                }, a.createElement("div", {
                    ref: "smileButton",
                    className: "stories_send_form_button smile _emoji_btn emoji_smile",
                    onMouseEnter: function(t) {
                        Emoji.clearSizeCached(e.refs.smileButton), Emoji.show(e.refs.smileButton, t.nativeEvent)
                    },
                    onMouseLeave: function(t) {
                        return Emoji.hide(e.refs.smileButton, t.nativeEvent)
                    },
                    onMouseDown: function(e) {
                        return v(e.nativeEvent)
                    }
                }), a.createElement("div", {
                    className: s.classNames("stories_send_form_button send", {
                        active: this.state.sendFormHasText
                    }),
                    onClick: this._sendMessageButtonDidPress.bind(this)
                })))) : void 0
            }, t.prototype.emojiInit = function() {
                var e = this;
                !this.emojiId && this.refs.messageInput ? (this.emojiId = Emoji.init(this.refs.messageInput, {
                    ttDiff: 29,
                    noStickers: !0,
                    noStickersStore: !0,
                    ref: "stories",
                    ttWrap: this.refs.controls,
                    onSend: function() {
                        return e.props.story._onAnswerSend(void 0, function() {
                            return e._emojiDidKeyAction()
                        })
                    },
                    forceUp: !0,
                    controlsCont: this.refs.sendForm,
                    onKeyAction: function() {
                        return e._emojiDidKeyAction()
                    },
                    onEmojiAdded: function() {
                        return e._emojiDidKeyAction()
                    }
                }), m(this.refs.smileButton, "click", v), placeholderInit(this.refs.messageInput, {
                    editable: !0
                })) : this.emojiId && !this.refs.messageInput && (y(this.refs.smileButton, "click", v), Emoji.destroy(this.emojiId), delete this.emojiId)
            }, t.prototype._leftSideIsEmpty = function() {
                var e = this.props.story,
                    t = this.props.story.getCurStoryData(),
                    n = t.can_manage,
                    r = t.link,
                    o = t.can_comment,
                    i = e.getReplies(),
                    a = e.getViews();
                return !(a || i.count && n || g(r) || o)
            }, t.prototype._sendFormDidFocus = function() {
                this.setState({
                    sendFormFocused: !0
                }), this.props.story._onSendFormFocus()
            }, t.prototype._sendFormDidBlur = function() {
                this.props.story._onSendFormBlur(), this.setState({
                    sendFormFocused: !1
                }), this._emojiDidKeyAction()
            }, t.prototype._emojiDidKeyAction = function() {
                var e = h(Emoji.editableVal(this.refs.messageInput));
                this.setState({
                    sendFormHasText: e.length > 0
                }), this.refs.messageInput.check()
            }, t.prototype._viewsButtonDidPress = function(e) {
                this.props.story.showFeedbackTooltip(), e.stopPropagation()
            }, t.prototype._shareButtonDidPress = function() {
                this.props.story.shareBox()
            }, t.prototype._removeButtonDidPress = function() {
                this.props.story.removeStoryBox()
            }, t.prototype._maskButtonDidPress = function() {
                this.props.story.sendMask()
            }, t.prototype._linkDidPress = function() {
                this.props.story._sendStatEvent("url_view")
            }, t.prototype._sendMessageButtonDidPress = function() {
                var e = this;
                this.props.story._onAnswerSend(void 0, function() {
                    return e._emojiDidKeyAction()
                })
            }, t
        }(a.Component);
    t["default"] = _
}, function(e, t, n) {
    (function(r, o) {
        var i;
        (function() {
            "use strict";

            function a(e) {
                return "function" == typeof e || "object" == typeof e && null !== e
            }

            function s(e) {
                return "function" == typeof e
            }

            function l(e) {
                $ = e
            }

            function u(e) {
                G = e
            }

            function c() {
                return function() {
                    r.nextTick(m)
                }
            }

            function d() {
                return function() {
                    Y(m)
                }
            }

            function f() {
                var e = 0,
                    t = new ee(m),
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
                return e.port1.onmessage = m,
                    function() {
                        e.port2.postMessage(0)
                    }
            }

            function h() {
                return function() {
                    setTimeout(m, 1)
                }
            }

            function m() {
                for (var e = 0; X > e; e += 2) {
                    var t = re[e],
                        n = re[e + 1];
                    t(n), re[e] = void 0, re[e + 1] = void 0
                }
                X = 0
            }

            function y() {
                try {
                    var e = n(4);
                    return Y = e.runOnLoop || e.runOnContext, d()
                } catch (t) {
                    return h()
                }
            }

            function v(e, t) {
                var n = this,
                    r = n._state;
                if (r === se && !e || r === le && !t) return this;
                var o = new this.constructor(_),
                    i = n._result;
                if (r) {
                    var a = arguments[r - 1];
                    G(function() {
                        A(r, o, a, i)
                    })
                } else N(n, o, e, t);
                return o
            }

            function g(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var n = new t(_);
                return x(n, e), n
            }

            function _() {}

            function w() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function b() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function k(e) {
                try {
                    return e.then
                } catch (t) {
                    return ue.error = t, ue
                }
            }

            function S(e, t, n, r) {
                try {
                    e.call(t, n, r)
                } catch (o) {
                    return o
                }
            }

            function C(e, t, n) {
                G(function(e) {
                    var r = !1,
                        o = S(n, t, function(n) {
                            r || (r = !0, t !== n ? x(e, n) : P(e, n))
                        }, function(t) {
                            r || (r = !0, O(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                    !r && o && (r = !0, O(e, o))
                }, e)
            }

            function E(e, t) {
                t._state === se ? P(e, t._result) : t._state === le ? O(e, t._result) : N(t, void 0, function(t) {
                    x(e, t)
                }, function(t) {
                    O(e, t)
                })
            }

            function T(e, t, n) {
                t.constructor === e.constructor && n === oe && constructor.resolve === ie ? E(e, t) : n === ue ? O(e, ue.error) : void 0 === n ? P(e, t) : s(n) ? C(e, t, n) : P(e, t)
            }

            function x(e, t) {
                e === t ? O(e, w()) : a(t) ? T(e, t, k(t)) : P(e, t)
            }

            function L(e) {
                e._onerror && e._onerror(e._result), R(e)
            }

            function P(e, t) {
                e._state === ae && (e._result = t, e._state = se, 0 !== e._subscribers.length && G(R, e))
            }

            function O(e, t) {
                e._state === ae && (e._state = le, e._result = t, G(L, e))
            }

            function N(e, t, n, r) {
                var o = e._subscribers,
                    i = o.length;
                e._onerror = null, o[i] = t, o[i + se] = n, o[i + le] = r, 0 === i && e._state && G(R, e)
            }

            function R(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (var r, o, i = e._result, a = 0; a < t.length; a += 3) r = t[a], o = t[a + n], r ? A(n, r, o, i) : o(i);
                    e._subscribers.length = 0
                }
            }

            function I() {
                this.error = null
            }

            function F(e, t) {
                try {
                    return e(t)
                } catch (n) {
                    return ce.error = n, ce
                }
            }

            function A(e, t, n, r) {
                var o, i, a, l, u = s(n);
                if (u) {
                    if (o = F(n, r), o === ce ? (l = !0, i = o.error, o = null) : a = !0, t === o) return void O(t, b())
                } else o = r, a = !0;
                t._state !== ae || (u && a ? x(t, o) : l ? O(t, i) : e === se ? P(t, o) : e === le && O(t, o))
            }

            function D(e, t) {
                try {
                    t(function(t) {
                        x(e, t)
                    }, function(t) {
                        O(e, t)
                    })
                } catch (n) {
                    O(e, n)
                }
            }

            function j(e) {
                return new ye(this, e).promise
            }

            function B(e) {
                function t(e) {
                    x(o, e)
                }

                function n(e) {
                    O(o, e)
                }
                var r = this,
                    o = new r(_);
                if (!Q(e)) return O(o, new TypeError("You must pass an array to race.")), o;
                for (var i = e.length, a = 0; o._state === ae && i > a; a++) N(r.resolve(e[a]), void 0, t, n);
                return o
            }

            function M(e) {
                var t = this,
                    n = new t(_);
                return O(n, e), n
            }

            function U() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function H() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function z(e) {
                this._id = he++, this._state = void 0, this._result = void 0, this._subscribers = [], _ !== e && ("function" != typeof e && U(), this instanceof z ? D(this, e) : H())
            }

            function W(e, t) {
                this._instanceConstructor = e, this.promise = new e(_), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? P(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && P(this.promise, this._result))) : O(this.promise, this._validationError())
            }

            function V() {
                var e;
                if ("undefined" != typeof o) e = o;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var n = e.Promise;
                (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = me)
            }
            var K;
            K = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
            var Y, $, q, Q = K,
                X = 0,
                G = function(e, t) {
                    re[X] = e, re[X + 1] = t, X += 2, 2 === X && ($ ? $(m) : q())
                },
                Z = "undefined" != typeof window ? window : void 0,
                J = Z || {},
                ee = J.MutationObserver || J.WebKitMutationObserver,
                te = "undefined" != typeof r && "[object process]" === {}.toString.call(r),
                ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                re = new Array(1e3);
            q = te ? c() : ee ? f() : ne ? p() : void 0 === Z ? y() : h();
            var oe = v,
                ie = g,
                ae = void 0,
                se = 1,
                le = 2,
                ue = new I,
                ce = new I,
                de = j,
                fe = B,
                pe = M,
                he = 0,
                me = z;
            z.all = de, z.race = fe, z.resolve = ie, z.reject = pe, z._setScheduler = l, z._setAsap = u, z._asap = G, z.prototype = {
                constructor: z,
                then: oe,
                "catch": function(e) {
                    return this.then(null, e)
                }
            };
            var ye = W;
            W.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, W.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === ae && e > n; n++) this._eachEntry(t[n], n)
            }, W.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === ie) {
                    var o = k(e);
                    if (o === oe && e._state !== ae) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                    else if (n === me) {
                        var i = new n(_);
                        T(i, e, o), this._willSettleAt(i, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, W.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === ae && (this._remaining--, e === le ? O(r, n) : this._result[t] = n), 0 === this._remaining && P(r, this._result)
            }, W.prototype._willSettleAt = function(e, t) {
                var n = this;
                N(e, void 0, function(e) {
                    n._settledAt(se, t, e)
                }, function(e) {
                    n._settledAt(le, t, e)
                })
            };
            var ve = V,
                ge = {
                    Promise: me,
                    polyfill: ve
                };
            i = function() {
                return ge
            }.call(t, n, t, e), !(void 0 !== i && (e.exports = i)), ve()
        }).call(this)
    }).call(this, n(24), n(36))
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    n.r(t);
    var o = n(12),
        i = n(26),
        a = n(1),
        s = n(23),
        l = n(5),
        u = n(30),
        c = n(17),
        d = n(2),
        f = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    o = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (o) throw i
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
        p = function() {
            function e(t, n, o, i) {
                r(this, e), this.queue = [], this.storiesToRead = [];
                try {
                    window.Videoview && Videoview.togglePlay(!1)
                } catch (a) {}
                this.initDOM(), this.show(), this._init(t, n, o, i), addClass(this.layerEl, "shown")
            }
            return e.prototype._init = function(e, t, n, r) {
                var o = e.split("_"),
                    i = f(o, 1),
                    a = i[0];
                return this.storyOwner = intval(a), this.storyRaw = e, this.parseExtra(r), this.list = t, this.storiesList = n, this.initStories()
            }, e.prototype._destroyStories = function() {
                for (var e in this.renderedStories) {
                    var t = this.renderedStories[e];
                    t.story.destroy()
                }
            }, e.prototype.destroy = function() {
                delete this.activeStory, clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), removeEvent(this.volumeControl), delete this.volumeControl, delete this.renderedStories, removeEvent(this.layerEl), this._onVideoEnd();
                try {
                    this.layerEl && bodyNode.removeChild(this.layerEl)
                } catch (e) {}
                delete cur.storyLayer, delete this
            }, e.prototype.getList = function() {
                return "story" + this.activeStory.getRawId() + "/" + this.list
            }, e.prototype.getStoryRaw = function() {
                return this.activeStory ? this.activeStory.getRawId() : !1
            }, e.prototype.initDOM = function() {
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
            }, e.prototype.show = function() {
                onBodyResize()
            }, e.prototype.hide = function(e) {
                addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && i.layerHide(), e !== !0 && this.activeStory ? this.animateStory("minimize").then(this.doHide.bind(this)) : this.doHide(e), removeClass(this.layerEl, "shown"), this.activeStory && this.activeStory.pauseStory()
            }, e.prototype.doHide = function(e) {
                this._readStories(), this.destroy(), !e && i.removeLayer(), "group_stories" === this.list && Stories.groupStoriesBlockUpdate()
            }, e.prototype.back = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                this.hideAllLayers = !1;
                var t = cancelStack[cancelStack.length - 1];
                t && "stories_form_focus" === t.name && cancelStackPop(), this.hide(!1, e)
            }, e.prototype._renderStories = function() {
                for (var e = this, t = [], n = 0; n < this.storiesList.length; n++) this.storiesList[n] && t.push(this.storiesList[n]);
                var r = this._getScreenStoriesCount(),
                    i = this._getCurStoryPos(t.map(function(e) {
                        return e.author.id
                    })),
                    a = Math.floor(r / 2),
                    s = t.slice(Math.max(0, i - a)).slice(0, r),
                    l = s.map(function(e) {
                        return e.author.id
                    });
                for (var u in this.renderedStories) {
                    var c = this.renderedStories[u]; - 1 === l.indexOf(parseInt(u)) && (c.story.destroy(), delete this.renderedStories[u])
                }
                var d = void 0;
                if (s.map(function(t, n) {
                        var r = t.author.id;
                        if (!e.renderedStories[r]) {
                            var i = e.storiesOwners.indexOf(r),
                                s = new o["default"](t, {
                                    id: n,
                                    layer: e,
                                    onSelect: e._onSelectStory.bind(e),
                                    onStoriesEnd: e._onStoriesEnd.bind(e, i),
                                    onStoryRemoved: function(t) {
                                        return e._onStoryRemoved(i, t)
                                    },
                                    playPrevOwner: e._playPrevOwner.bind(e, i),
                                    onPlayStory: e._onPlayStory.bind(e, i),
                                    onVideoPlay: e._onVideoPlay.bind(e),
                                    onVideoEnd: e._onVideoEnd.bind(e),
                                    onStartStory: e._onStartStory.bind(e),
                                    removeList: function() {
                                        return Stories.removeList(e.list)
                                    }
                                });
                            a >= n && e.stories.children[n] ? e.stories.insertBefore(s.render(), e.stories.children[n]) : e.stories.appendChild(s.render()), e.renderedStories[r] = {
                                story: s,
                                index: i
                            }, t.author.id === e.storyOwner && (d = s)
                        }
                    }), !d) {
                    var f = s[0];
                    d = this.renderedStories[f.author.id].story
                }
                return {
                    activeStory: d
                }
            }, e.prototype._getScreenStoriesCount = function() {
                return 2 * Math.floor(window.innerWidth / (window.innerHeight * a.STORY_HORIZONTAL_RATIO)) + 1
            }, e.prototype._getCurStoryPos = function(e) {
                return (e || this.storiesOwners).indexOf(this.storyOwner)
            }, e.prototype.initStories = function() {
                var e = this;
                return new Promise(function(t) {
                    e.storiesOwners = e.storiesList.map(function(e) {
                        return e.author.id
                    });
                    var n = !1,
                        r = e.storiesOwners.indexOf(e.storyOwner);
                    if (r > -1) {
                        var o = e.storiesList[r];
                        o.author.id === e.storyOwner && (n = o.items[o.items.length - 1].unread)
                    }
                    if (n && "replies" === e.list.substr(0, 7) && (n = !1), n) {
                        for (var i = [], a = 0; a < e.storiesList.length; a++) {
                            var s = e.storiesList[a];
                            s.items[s.items.length - 1].unread && i.push(s)
                        }
                        i.length && (e.storiesList = i, e.storiesOwners = e.storiesList.map(function(e) {
                            return e.author.id
                        }))
                    }
                    e.renderedStories = {};
                    var l = e._renderStories(),
                        u = l.activeStory;
                    e.scrollToStory(u, !0), 1 === e.storiesList.length && addClass(e.stories, "one_story"), e._startFirstStory(u, e.extra.story_id), addClass(e.stories, "inited"), t()
                })
            }, e.prototype._startFirstStory = function(e, t) {
                var n = this;
                this.activeStory = e, this.storyOwner = e.getOwnerId(), addClass(e.getWrap(), "active"), this.scrollToStory(), e.indexToStoryById(t || this.storyRaw), this._startActiveStory(), setTimeout(function() {
                    addClass(n.stories, "animated"), n.inited = !0, "open" === n.extra.replies && n.activeStory.showFeedbackTooltip()
                })
            }, e.prototype._markReadRestStories = function(e) {
                this._markReadStoriesInRange(e, e.index, e.data.items.length), this._updateBadge(e)
            }, e.prototype._onSelectStory = function(e) {
                var t = this,
                    n = void 0;
                this.activeStory && (n = this.activeStory.getWrap(), this.activeStory.stop()), e.id - this.activeStory.id > 0 && this._markReadRestStories(this.activeStory), this.activeStory = e, e.indexToUnread(), e.fillTimeLine(), this.storyOwner = e.getOwnerId(), clearTimeout(this.timer), addClass(this.stories, "animated"), this.timer = setTimeout(function() {
                    removeClass(n, "active"), addClass(e.getWrap(), "active"), t.scrollToStory(), t.timer = setTimeout(function() {
                        t.activeStory && e.id !== t.activeStory.id || !t.activeStory || (e.indexToUnread(), t._startActiveStory(), t._renderStories(), t.scrollToStory(e, !0))
                    }, 200)
                })
            }, e.prototype._startActiveStory = function() {
                var e = this.activeStory;
                e.markAsActive(), e.playStory(!0)
            }, e.prototype._onStartStory = function() {
                var e = this.activeStory,
                    t = this.list;
                if (e) {
                    var n = nav.objLoc;
                    n.w = "story" + e.getRawId(), t.match(/^-?(\d+)_(\d+)$/) || (n.w += "/" + t), nav.setLoc(nav.toStr(n))
                }
            }, e.prototype.scrollToStory = function(e, t) {
                var n = this,
                    r = this._getScrollLeft(e);
                t ? (removeClass(this.stories, "animated"), this._setScrollLeft(r)) : this.inited && addClass(this.stories, "animated"), setTimeout(function() {
                    n._setScrollLeft(r)
                })
            }, e.prototype._setScrollLeft = function(e) {
                setStyle(this.stories, "transform", "translateX(" + e + "px) translateZ(0)")
            }, e.prototype._getScrollLeft = function(e) {
                return e = e || this.activeStory, window.innerWidth / 2 - e.getOffsetLeft()
            }, e.prototype._onStoriesEnd = function(e) {
                for (var t = -1, n = e + 1; n < this.storiesList.length; n++) {
                    var r = this.storiesList[n];
                    if (r) {
                        t = n;
                        break
                    }
                }
                t > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(t)) : cancelStackPop()
            }, e.prototype._playPrevOwner = function(e) {
                for (var t = -1, n = e - 1; n >= 0; n--) {
                    var r = this.storiesList[n];
                    if (r) {
                        t = n;
                        break
                    }
                }
                t > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(t)) : cancelStackPop()
            }, e.prototype._markReadStoriesInRange = function(e, t, n) {
                for (var r = e.data.items, o = t; n > o; o++) {
                    var i = r[o];
                    i.unread && (i.unread = !1, this.storiesToRead.push(i.raw_id))
                }
            }, e.prototype._markReadPrevStories = function(e) {
                this._markReadStoriesInRange(e, 0, e.index)
            }, e.prototype._updateBadge = function(e) {
                var t = ge("feed_story_" + e.getOwnerId()),
                    n = geByClass1("_stories_feed_item_replies", t);
                if (hasClass(t, "story_feed_new_item") || "" !== val(n)) {
                    var r = e.data.items || [],
                        o = r[e.index] || {},
                        i = o.answers || {};
                    i.new_count = 0, o.unread = !1;
                    var a = !0,
                        s = 0;
                    r.forEach(function(e) {
                        var t = e.answers || {};
                        s += t.new_count || 0, e.unread && (a = !1)
                    }), s > 0 ? val(n, s) : (val(n, ""), a && removeClass(t, "story_feed_new_item"))
                }
            }, e.prototype._onPlayStory = function(e) {
                var t = this._getStoryInstanceByIndex(e);
                t && (this.storiesReadHash = t.getReadHash(), this.storiesToRead.push(t.getRawId()), this._markReadPrevStories(t), this.storiesToRead > 10 && this._readStories(), this._updateBadge(t));
                var n = this._getStoryInstanceByIndex(e + 1);
                n && n.preloadNextStory(n.getIndex())
            }, e.prototype._getStoryInstanceByIndex = function(e) {
                var t = this.storiesList[e];
                return t ? this.renderedStories[t.author.id].story : !1
            }, e.prototype._onStoryRemoved = function(e, t) {
                this.storiesList[e] = !1, !t && this._onStoriesEnd(e), Stories.updateFeedStories()
            }, e.prototype.onVisibilityChange = function() {
                "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
            }, e.prototype.onResize = function() {
                var e = cur.storyLayer.activeStory;
                e && cur.storyLayer.scrollToStory(e, !0)
            }, e.prototype.pauseStory = function(e) {
                this.activeStory && this.activeStory.pauseStory(e)
            }, e.prototype.playStory = function() {
                this.activeStory && this.activeStory.playStory()
            }, e.prototype._onLayerClick = function(e) {
                var t = hasClass(e.target, "stories_layer_close");
                (hasClass(e.target, "stories_layer_cont") || t) && (t && (this.isCloseBtnClick = !0), cancelStackPop());
            }, e.prototype._checkKeyEvents = function(e) {
                return attr(e.target, "contenteditable") || inArray(e.target.tagName, ["INPUT", "TEXTAREA"]) || curBox() ? !1 : !0
            }, e.prototype.onKeyDown = function(e) {
                if (cur.storiesKeyDown) return void(cur.storyLayer && cur.storyLayer._checkKeyEvents(e) && cancelEvent(e));
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
                            cancelEvent(e), cur.storyLayer.pauseStory(!0)
                    }
                    cur.storiesKeyDownTs = vkNow()
                }
            }, e.prototype.onKeyUp = function(e) {
                cur.storiesKeyDown = !1, cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e) && e.keyCode === KEY.SPACE && (cancelEvent(e), vkNow() - cur.storiesKeyDownTs > 200 ? cur.storyLayer.playStory() : cur.storyLayer.nextStory())
            }, e.prototype.nextStory = function() {
                this.activeStory && this.activeStory.nextStory()
            }, e.prototype.prevStory = function() {
                this.activeStory && this.activeStory.prevStory()
            }, e.prototype._readStories = function() {
                if (this.storiesToRead.length) {
                    var e = this.list; - 1 !== [l.MODULE, u.MODULE, d.STORIES_MANAGE_MODULE, c.MODULE].indexOf(cur.module) && (e = cur.module), 0 === e.indexOf("replies") && (e = "reply");
                    var t = this.storiesToRead.join(",");
                    this.storiesToRead = [], ajax.post("al_stories.php", {
                        act: "read_stories",
                        stories: t,
                        source: e,
                        hash: this.storiesReadHash
                    })
                }
            }, e.prototype._onVideoPlay = function() {
                getAudioPlayer().isPlaying() && (this.needAudioReset = !0, getAudioPlayer().pause()), Notifier.lcSend("stories_video_start")
            }, e.prototype._onVideoEnd = function() {
                this.needAudioReset && (delete this.needAudioReset, getAudioPlayer().play()), Notifier.lcSend("stories_video_end")
            }, e.prototype._renderBackButton = function() {
                return this.backButton = se('<div class="stories_back_button_wrap">\n  <div class="stories_back_button">\n    <div class="stories_back_button_icon"></div>\n    <div class="stories_back_button_text">' + getLang("global_back") + "</div>\n  </div>\n</div>"), addEvent(this.backButton, "click", function() {
                    cancelStackPop()
                }), this.backButton
            }, e.prototype.showBackButton = function() {
                show(this.backButton), this.hideAllLayers = !0, addClass(this.layerEl, "with_back_button")
            }, e.prototype.parseExtra = function(e) {
                var t = {},
                    n = String(e).split(";");
                for (var r in n) {
                    var o = n[r].split("="),
                        i = f(o, 2),
                        a = i[0],
                        s = i[1];
                    t[a] = s
                }
                this.extra = t
            }, e.prototype.getAnimateFromElem = function() {
                if (!this.hideAllLayers) {
                    var e = this.activeStory.getOwnerId();
                    if (hasClass(this.animateFromEl, "stories_feed_reply_item")) {
                        var t = domQuery("#feed_story_" + e, domPN(this.animateFromEl))[0];
                        if (t) return t
                    } else if ("feed" === cur.module && !isVisible(this.backButton)) {
                        var n = ge("feed_story_" + e);
                        if (n) return Stories.feedScrollToOwner(e), n
                    }
                }
                return this.animateFromEl
            }, e.prototype.animateStory = function(e, t) {
                var n = this;
                return new Promise(function(r) {
                    if ("expand" === e && !t || "minimize" === e && !n.animateFromEl) return setStyle("stories_layers_background", "opacity", 1), r();
                    n.pauseStory(), addClass(n.layerEl, "animation"), removeClass(n.stories, "animated");
                    var o = "expand" === e ? t : n.getAnimateFromElem();
                    if (n.hideAllLayers && "minimize" === e) {
                        var s = i.getFirstLayer();
                        o = s.getAnimateFromElem(), i.slicePrevLayers(), i.layerHide()
                    }
                    removeClass(o, "stories_feed_item_ava_animate");
                    var l = getXY(o),
                        u = f(l, 2),
                        c = u[0],
                        d = u[1],
                        p = getSize(o),
                        h = window.innerHeight,
                        m = Math.min(a.STORY_MAX_WIDTH, Math.max(a.STORY_MAX_HEIGHT, h * a.STORY_HORIZONTAL_RATIO)),
                        y = m * a.STORY_VERTICAL_RATIO,
                        v = Math.max(0, (h - y) / 2),
                        g = Math.max(0, (window.innerWidth - m) / 2);
                    c = g - c + m / 2 - p[0] / 2 + scrollGetX(), d = v - d + y / 2 - p[1] / 2 + scrollGetY(), c = -c, d = -d;
                    var _ = {};
                    "expand" === e && (_.transform = "translate(" + c + "px, " + d + "px) scale(0)", n.animateFromEl = t), setStyle(n.activeStory.wrapEl, _), "minimize" === e && setStyle(o, "transform", "scale(0)"), n.animationTimer = setTimeout(function() {
                        addClass(n.stories, "animated"), addClass(o, "stories_feed_item_ava_animate"), n.animationTimer = setTimeout(function() {
                            "expand" === e ? (setStyle("stories_layers_background", "opacity", 1), setStyle(n.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(n.activeStory.wrapEl, "transform", "translate(" + c + "px, " + d + "px) scale(0.01)"), setStyle(o, "transform", "scale(1)")), n.animationTimer = setTimeout(function() {
                                r(), "expand" === e ? (setStyle(n.activeStory.wrapEl, "transform", ""), removeClass(n.layerEl, "animation"), removeClass(n.stories, "animated"), n.playStory(), i.layerShown()) : (removeClass(o, "stories_feed_item_ava_animate"), setStyle(o, "transform", ""))
                            }, 330)
                        }, 30)
                    }, 30)
                })
            }, e.prototype.pauseLayer = function() {
                this.pauseStory(), addClass(this.layerEl, "paused")
            }, e.prototype.resumeLayer = function() {
                this._updateVolumeButton(), this.activeStory.volumeUpdate(), this.activeStory && (this.playStory(), removeClass(this.layerEl, "paused"), this.activeStory.feedbackScroll && this.activeStory.feedbackScroll.update())
            }, e.prototype.setLayerVisibility = function(e) {
                toggle(this.layerEl, e)
            }, e.prototype._renderVolumeControl = function() {
                return this.volumeControl = se('<div class="stories_volume_control">\n  <div class="stories_volume_control_slide_wrap">\n    <div class="stories_volume_control_slide">\n      <div class="stories_volume_control_slide_indicator"></div>\n    </div>\n  </div>\n</div>'), addEvent(geByClass1("stories_volume_control_slide_wrap", this.volumeControl), "mousedown", this._volumeControlOnMouseDown.bind(this)), addEvent(this.volumeControl, "mousedown", this._volumeControlOnClick.bind(this)), this.volumeControlContainer = ce("div", {
                    className: "stories_volume_control_container"
                }), this.volumeControlContainer.appendChild(this.volumeControl), this.volumeControlContainer
            }, e.prototype._volumeControlOnMouseDown = function(e) {
                var t = this;
                addClass(this.volumeControlContainer, "changing");
                var n = geByClass1("stories_volume_control_slide", this.volumeControl),
                    r = geByClass1("stories_volume_control_slide_indicator", n),
                    o = getXY(n),
                    i = f(o, 1),
                    a = i[0],
                    l = getSize(n),
                    u = f(l, 1),
                    c = u[0],
                    d = function(e) {
                        var n = Math.max(0, Math.min(e.pageX - a, c)),
                            o = n / c * 100;
                        setStyle(r, "width", o + "%"), s.setVolume(o / 100), t.activeStory.volumeUpdate()
                    },
                    p = function h() {
                        removeEvent(window, "mousemove", d), removeEvent(window, "mouseup", h), t._updateVolumeButton(), removeClass(t.volumeControlContainer, "changing")
                    };
                addEvent(window, "mousemove", d), addEvent(window, "mouseup", p), d(e)
            }, e.prototype._updateVolumeButton = function() {
                var e = 100 * s.getVolume();
                toggleClass(this.volumeControl, "low", e > 0 && 50 > e), toggleClass(this.volumeControl, "high", e >= 50);
                var t = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
                setStyle(t, "width", e + "%")
            }, e.prototype._volumeControlOnClick = function(e) {
                if (!hasClass(e.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControlContainer, "changing")) {
                    var t = s.getVolume();
                    t = t ? 0 : 1, s.setVolume(t), this._updateVolumeButton(), this.activeStory.volumeUpdate()
                }
            }, e.prototype.onReplyDeleted = function(e) {
                this.activeStory && this.activeStory.onReplyDeleted(e)
            }, e
        }();
    t["default"] = p
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    n.r(t);
    var o = n(42),
        i = n(43),
        a = n(21),
        s = n(23),
        l = n(26),
        u = n(9),
        c = n(20),
        d = n(19),
        f = n(2),
        p = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    o = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (o) throw i
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
        h = window,
        m = h.radioBtns,
        y = h.getLang,
        v = h.lockButton,
        g = h.unlockButton,
        _ = h.removeEvent,
        w = h.addEvent,
        b = h.addClass,
        k = h.removeClass,
        S = h.toggleClass,
        C = h.geByClass1,
        E = h.geByClass,
        T = h.ge,
        x = h.se,
        L = h.domQuery,
        P = h.curBox,
        O = h.showBox,
        N = h.extend,
        R = function() {
            function e(t, n) {
                r(this, e), this.data = t, this.opts = n, this.id = n.id, this.isActive = !1, this.story = !1, this.index = 0, this.preloadedStories = {}, this.layer = n.layer
            }
            return e.prototype.destroy = function() {
                this._destroyStory(), _(C("stories_item_cont", this.contWrap)), _(C("stories_reply_to", this.replyToWrap)), _(this.shareButton), delete this.shareButton, _(this.followBtn), delete this.followBtn, _(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                for (var e = E("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) _(e[t]);
                _(this.viewsButton), _(C("stories_feedback_close", this.wrapEl)), _(C("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.dateEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                for (var n = !1, r = 0; r < this.data.items.length; r++)
                    if (this.data.items[r].unread) {
                        n = !0;
                        break
                    }
                var o = l.getPrevLayer();
                !n && o && o.activeStory && k(L("#feed_story_" + this.getOwnerId(), o.activeStory.wrapEl)[0], "story_feed_new_item")
            }, e.prototype._destroyTimeLine = function() {
                for (var e = E("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) _(e[t])
            }, e.prototype.getOwnerId = function() {
                return this.data.author.id
            }, e.prototype.getIndex = function() {
                return this.index
            }, e.prototype.isLastStory = function() {
                return this.index >= this.data.items.length - 1
            }, e.prototype.getRawId = function() {
                return this.story ? this.story.getId() : !1
            }, e.prototype.getReadHash = function() {
                return this.data.read_hash
            }, e.prototype.isAuthor = function() {
                return this.data.author.id === vk.id
            }, e.prototype.render = function() {
                this.wrapEl = ce("div", {
                    className: "stories_item"
                }), this.contWrap = ce("div", {
                    className: "stories_item_cont_wrap"
                }), this.wrapEl.appendChild(this.contWrap);
                var e = ce("div", {
                    className: "stories_item_cont"
                });
                return w(e, "mousedown", this._onMouseDownHandle.bind(this)), w(e, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(e), e.appendChild(this._renderAuthor()), e.appendChild(ce("div", {
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
                })), this._initTimeLine(), S(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
            }, e.prototype.updateBottom = function(e) {
                var t = C("stories_bottom_wrap", this.wrapEl);
                this.isActive && !e ? i.render(o.createElement(u["default"], {
                    story: this
                }), t) : (i.unmountComponentAtNode(t), val(t, ""))
            }, e.prototype._canForceDeleteStories = function() {
                return this.data.moder_remove_hash && !this.data.items[0].is_deleted
            }, e.prototype._initTimeLine = function() {
                this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl));
                var e = C("stories_item_cont", this.contWrap);
                e.appendChild(this._renderTimeLine())
            }, e.prototype._isActionsShown = function() {
                var e = domClosest("_ui_menu_wrap", this.wrapEl);
                return hasClass(e, "shown")
            }, e.prototype._renderPreview = function() {
                return x('<div class="stories_preview"></div>')
            }, e.prototype._renderMessage = function(e) {
                return x('<div class="stories_message">\n  <div class="stories_message_text">' + e + "</div>\n</div>")
            }, e.prototype._showMessage = function(e) {
                var t = this;
                re(C("stories_message", this.contWrap));
                var n = this._renderMessage(e);
                return this.contWrap.appendChild(n), clearTimeout(this.showMessageTimer), new Promise(function(e) {
                    t.showMessageTimer = setTimeout(function() {
                        t.contWrap.removeChild(n), e()
                    }, 3e3)
                })
            }, e.prototype._setPreview = function(e) {
                var t = this,
                    n = this.index,
                    r = this.data.items[n].preview_url,
                    o = r;
                o !== this.curPreviewUrl && o && (e = e || C("stories_preview", this.contWrap), Object(a.loadMedia)(o).then(function(r) {
                    n === t.index && o !== t.curPreviewUrl && (t.curPreviewUrl = o, setStyle(e, "backgroundImage", "url(" + r + ")")), setStyle(e, "opacity", 1)
                }))
            }, e.prototype.getPreview = function() {
                return this.data.items[this.index].preview_url
            }, e.prototype._renderAuthor = function() {
                var e = this.data.author,
                    t = e.photo,
                    n = e.href,
                    r = e.name,
                    o = e.verify,
                    i = x('<div class="stories_author">\n<div class="stories_author_cont_wrap">\n  <div class="stories_author_cont">\n    <a href="' + n + '" class="stories_author_photo_wrap">\n      <img src="' + t + '" class="stories_author_photo" />\n    </a>\n    <a href="' + n + '" class="stories_author_name"><span>' + r + "</span></a>\n    " + (o || "") + '\n    <div class="stories_date"></div>\n  </div>\n  <div class="stories_author_buttons"></div>\n</div></div>');
                return this.data.hide_owner === !0 && val(C("stories_author_cont", i), ""), S(this.wrapEl, "hide_owner", this.data.hide_owner === !0), this.dateEl = C("stories_date", i), this.authorButtons = C("stories_author_buttons", i), i
            }, e.prototype._renderFollowButton = function() {
                var e = this;
                return this.followBtn = ce("div", {
                    className: "stories_author_button stories_follow"
                }), w(this.followBtn, "click", this._onFollowBtnClick.bind(this)), w(this.followBtn, "mouseover", function() {
                    var t = y(hasClass(e.followBtn, "followed") ? "stories_unfollow" : "stories_follow");
                    showTooltip(e.followBtn, {
                        black: 1,
                        center: 1,
                        shift: [0, 5, 0],
                        text: t,
                        appendEl: e.contWrap
                    })
                }), this.followBtn
            }, e.prototype._renderTimeLine = function() {
                var e = this;
                return this.timeLineEl = ce("div", {
                    className: "stories_time_line"
                }), this.data.items.map(function(t, n) {
                    var r = ce("div", {
                        className: "stories_time_line_item"
                    });
                    w(r, "click", e.changeStory.bind(e, n));
                    var o = ce("div", {
                        className: "stories_time_line_item_cont"
                    });
                    o.appendChild(ce("div", {
                        className: "stories_time_line_item_cont_active"
                    })), r.appendChild(o), e.timeLineEl.appendChild(r)
                }), this.timeLineEl
            }, e.prototype.isPaused = function() {
                return !this.story || this.story.isPaused()
            }, e.prototype.isLoaded = function() {
                return !this.story || this.story.isLoaded()
            }, e.prototype._onMouseDownHandle = function(e) {
                this.isActive && (this.isLocked() || !hasClass(e.target, "stories_item_cont") && !hasClass(e.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.story && this.story.pause(), b(this.wrapEl, "paused")))
            }, e.prototype._onMouseUpHandle = function(e) {
                var t = this.downTs;
                delete this.downTs;
                var n = !(vkNow() - t < 200 && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                return this.isActive && hasClass(e.target, "stories_item_back") && !n ? this.prevStory() : hasClass(e.target, "stories_item_cont") || hasClass(e.target, "stories_item_back") ? (this._feedbackTTShown && this.hideFeedbackTooltip(), k(this.wrapEl, "paused"), this.isActive ? n ? void(this.isPaused() && this.playStory()) : void this._onPlayEnd() : void this.opts.onSelect(this)) : void 0
            }, e.prototype.isLocked = function() {
                return P() || this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply") ? !0 : !1
            }, e.prototype.playStory = function() {
                this.isLocked() || (k(this.wrapEl, "paused"), this.story || this._initStory(), this.story.play(), delete this.downTs)
            }, e.prototype.pauseStory = function(e) {
                this.story && (this.isPaused() || (e && b(this.wrapEl, "paused"), this.story.pause()))
            }, e.prototype.changeStory = function(e) {
                this.index === e || this.formLocked || (this._destroyStory(), this.index = e, this._setPreview(), this.playStory())
            }, e.prototype.getWrap = function() {
                return this.wrapEl
            }, e.prototype.stop = function() {
                this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(C("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), k(this.wrapEl, "autoplay_failed")
            }, e.prototype.getCurStoryData = function() {
                return this.data.items[this.index]
            }, e.prototype._initStory = function() {
                var e = this.getCurStoryData(),
                    t = e.type;
                this.story && this._destroyStory();
                var n = {
                    onLoadingStart: this._onLoadingStart.bind(this),
                    onLoadingEnd: this._onLoadingEnd.bind(this),
                    onPlay: this._onPlay.bind(this),
                    onPause: this._onPause.bind(this),
                    onError: this._showError.bind(this),
                    onLongLoading: this._showLoader.bind(this),
                    onAutoPlayFail: this._onAutoPlayFail.bind(this)
                };
                if ("video" === t) {
                    this.story = new c["default"](e, n);
                    var r = s.getVolume();
                    r > 0 && this.opts.onVideoPlay(), b(this.wrapEl, "video")
                } else "photo" === t && (this.story = new d["default"](e, n), this.opts.onVideoEnd(), k(this.wrapEl, "video"));
                this.fillTimeLine(), val(this.dateEl, e.is_ads ? y("stories_is_ad") : this.story.getDate()), this.opts.onStartStory(), S(this.wrapEl, "stories_can_comment", e.can_comment === !0), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), this.data.author.can_follow && !this.data.is_promo && this.authorButtons.appendChild(this._renderFollowButton()), this._destroyFeedBackTT(), this.updateBottom(), this.contWrap.appendChild(this.story.render())
            }, e.prototype.getReplies = function() {
                return this.story.getReplies()
            }, e.prototype.getViews = function() {
                return this.story.getViews()
            }, e.prototype.indexToUnread = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    t = this.data.items,
                    n = 0;
                for (var r in t)
                    if (t[r].unread) {
                        n = intval(r);
                        break
                    }
                return e ? n : (this.index = n, void this._setPreview())
            }, e.prototype.indexToStoryById = function(e) {
                var t = this.data.items,
                    n = -1;
                for (var r in t)
                    if (t[r].raw_id === e) {
                        n = intval(r);
                        break
                    }
                n > -1 ? (this.index = n, this._setPreview()) : this.indexToUnread()
            }, e.prototype.fillTimeLine = function() {
                for (var e = this.timeLineEl, t = 0; t < e.children.length; t++) {
                    var n = C("stories_time_line_item_cont_active", e.children[t]);
                    t === this.index && (this.currentTimeLineEl = n);
                    var r = t < this.index ? 100 : 0;
                    setStyle(n, "transform", "translateX(" + r + "%)")
                }
            }, e.prototype._destroyStory = function() {
                if (this.story) {
                    this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), cancelAnimationFrame(this.timeLineAnim);
                    try {
                        this.contWrap.removeChild(this.story.render()), this.story.destroy()
                    } catch (e) {}
                    this._replyHideEnd(), _(this.followBtn), val(this.authorButtons, ""), _(this.answersEl), _(C("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                }
            }, e.prototype._timeLineUpdate = function() {
                var e = this.story;
                if (e && !e.isPaused()) {
                    var t = e.getCurrentTime(),
                        n = e.getDuration(),
                        r = Math.max(0, Math.min(100, t / n * 100));
                    setStyle(this.currentTimeLineEl, "transform", "translateX(" + r + "%) translateZ(0)"), 100 > r ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd()
                }
            }, e.prototype._onLoadingStart = function() {}, e.prototype._onLoadingEnd = function() {}, e.prototype._onPlay = function() {
                this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), k(this.wrapEl, "animate_story"), k(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
            }, e.prototype._onPause = function() {
                cancelAnimationFrame(this.timeLineAnim)
            }, e.prototype._onPlayEnd = function() {
                this.nextStory()
            }, e.prototype.nextStory = function() {
                if (!this.isLocked()) {
                    var e = this.data.items,
                        t = this.index + 1;
                    t < e.length ? this.changeStory(t) : (this._destroyStory(), this.opts.onStoriesEnd())
                }
            }, e.prototype.prevStory = function() {
                if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                    var e = (this.data.items, this.index - 1);
                    e >= 0 ? this.changeStory(e) : (this._destroyStory(), this.opts.playPrevOwner())
                }
            }, e.prototype.getOffsetLeft = function() {
                return this.wrapEl.offsetLeft + this.wrapEl.offsetWidth / 2
            }, e.prototype.getWidth = function() {
                return this.wrapEl.offsetWidth
            }, e.prototype.removeStoryBox = function() {
                var e = this;
                this.pauseStory(), showFastBox({
                    title: y("global_warning"),
                    onHide: function() {
                        e.playStory()
                    }
                }, y("stories_remove_warning"), y("stories_remove_confirm"), this.removeStory.bind(this), y("global_cancel"))
            }, e.prototype.removeStory = function(e) {
                var t = this;
                this.pauseStory();
                var n = this.getIndex(),
                    r = this.getRawId();
                ajax.post("al_stories.php", {
                    act: "remove_story",
                    story_raw: r,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: function(e) {
                        window.cur.module === f.STORIES_MANAGE_MODULE && window.GeStories.storyDidRemove(r, e), P().hide(), t._popStoryAndClearList(n)
                    },
                    showProgress: v.pbind(e),
                    hideProgress: g.pbind(e)
                })
            }, e.prototype._popStoryAndClearList = function(e) {
                Stories.removeList(this.getRawId()), this._removeStoryFromMemoryByIndex(e), 0 === this.data.items.length && l.onReplyDeleted(this.getOwnerId())
            }, e.prototype._removeStoryFromMemoryByIndex = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                this.data.items.splice(e, 1), this.opts.removeList();
                var n = this.data.items.length;
                n ? (this._initTimeLine(), n > e ? this.isActive && (this._initStory(), this.playStory()) : this.isActive && this.nextStory()) : this._remove(t)
            }, e.prototype._remove = function(e) {
                this.opts.onStoryRemoved(e)
            }, e.prototype.shareBox = function() {
                var e = this;
                this.pauseStory(), O("like.php", {
                    act: "publish_box",
                    object: "story" + this.story.getId(),
                    from: "wkview"
                }, {
                    onDone: function() {
                        e.playStory()
                    },
                    params: {
                        onHide: function() {
                            e.playStory()
                        }
                    }
                })
            }, e.prototype._onAnswerSend = function(e, t) {
                var n = this,
                    r = this._getSendText();
                return r && this.story ? void ajax.post("al_im.php", {
                    act: "a_send",
                    msg: r,
                    hash: this.data.send_hash,
                    media: "story:" + this.story.getId(),
                    entrypoint: "stories_comment",
                    to: this.getOwnerId()
                }, {
                    onDone: function() {
                        n._showMessage(y("stories_answer_sent")).then(function() {
                            n._unlockSendForm(), n.playStory()
                        }), val(C("stories_send_form_text", n.wrapEl), ""), n._blurSendForm(), n.updateFeedbackTTPos(), n.pauseStory(), t && t()
                    },
                    showProgress: function() {
                        val(n.sendFormButton, n._getLoaderHtml()), b(n.sendFormButton, "sending")
                    },
                    hideProgress: function() {
                        val(n.sendFormButton, ""), k(n.sendFormButton, "sending")
                    }
                }) : cancelEvent(e)
            }, e.prototype._onSendFormFocus = function() {
                var e = this;
                this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", function() {
                    Emoji.shown || (e._resetFendForm(), e._blurSendForm()), e.updateFeedbackTTPos()
                })
            }, e.prototype._blurSendForm = function() {
                var e = C("stories_send_form_text", this.wrapEl);
                e && e.blur()
            }, e.prototype._getSendText = function() {
                var e = Emoji.editableVal(C("stories_send_form_text", this.wrapEl));
                return trim(e)
            }, e.prototype._onSendFormBlur = function() {
                var e = this._getSendText();
                e || this._resetFendForm()
            }, e.prototype._onSendFormKeyUp = function() {
                this.updateFeedbackTTPos()
            }, e.prototype._unlockSendForm = function() {
                this.formLocked && (this.formLocked = !1)
            }, e.prototype._resetFendForm = function() {
                this._unlockSendForm(), this.playStory(), val(C("stories_send_form_text", this.wrapEl), "")
            }, e.prototype._emojiOnKeyAction = function() {
                this._getSendText() ? b(this.sendFormButton, "active") : k(this.sendFormButton, "active")
            }, e.prototype._getLoaderHtml = function() {
                return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
            }, e.prototype.preloadNextStory = function(e) {
                if (e = isUndefined(e) ? this.index + 1 : e, !this.preloadedStories[e]) {
                    var t = this.data.items[e];
                    if (t) {
                        this.preloadedStories[e] = !0;
                        var n = t[t.type + "_url"];
                        n && ("video" === t.type ? Object(a["default"])(n) : Object(a.loadMedia)(n))
                    }
                }
            }, e.prototype._addToBlacklist = function() {
                cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                    title: y("stories_add_blacklist_title"),
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }, y(this.getOwnerId() < 0 ? "stories_add_blacklist_message_group" : "stories_add_blacklist_message"), y("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), y("global_cancel"))
            }, e.prototype._doAddToBlacklist = function(e) {
                var t = this;
                ajax.post("al_stories.php", {
                    act: "blacklist_add",
                    owner_id: this.getOwnerId(),
                    hash: this.data.blacklist_hash,
                    source_story: this.getRawId()
                }, {
                    onDone: function() {
                        t.data.can_blacklist = !1, P().hide(), t.opts.removeList(), t._remove()
                    },
                    showProgress: v.pbind(e),
                    hideProgress: g.pbind(e)
                })
            }, e.prototype._resetErrors = function() {
                var e = C("stories_error_wrap", this.contWrap);
                e && (_(C("stories_error_button", e)), re(e)), k(this.wrapEl, "failed"), k(this.wrapEl, "fatal_error")
            }, e.prototype._showError = function(e) {
                var t = this;
                if (this.contWrap) {
                    var n = void 0,
                        r = void 0,
                        o = e;
                    switch (e) {
                        case "load":
                            n = y("stories_error_cant_load"), r = ce("div", {
                                className: "stories_error_button",
                                innerHTML: y("stories_try_again")
                            }), w(r, "click", function() {
                                t._destroyStory(), t.playStory()
                            });
                            break;
                        case "expired":
                            n = y("stories_error_expired");
                            break;
                        case "deleted":
                            n = y("stories_error_deleted");
                            break;
                        case "private":
                            n = y("stories_error_private");
                            break;
                        default:
                            n = y("global_unknown_error")
                    }
                    this._resetErrors(), this._stopLoader();
                    var i = ce("div", {
                            className: "stories_error_wrap"
                        }),
                        a = ce("div", {
                            className: "stories_error"
                        }),
                        s = ce("div", {
                            className: "stories_error_cont"
                        });
                    a.appendChild(s), s.appendChild(ce("div", {
                        className: "stories_error_icon " + o
                    })), s.appendChild(ce("div", {
                        className: "stories_error_caption",
                        innerHTML: n
                    })), r && s.appendChild(r), i.appendChild(a), this.contWrap.appendChild(i), b(this.wrapEl, "failed"), inArray(e, ["expired", "deleted", "private"]) && b(this.wrapEl, "fatal_error")
                }
            }, e.prototype._stopLoader = function() {
                re(C("stories_loader", this.contWrap))
            }, e.prototype._showLoader = function() {
                if (this._stopLoader(), this.isActive && (!this.isLoaded() || this.isPaused()) && this.contWrap) {
                    var e = ce("div", {
                        className: "stories_loader",
                        innerHTML: this._getLoaderHtml()
                    });
                    this.contWrap.appendChild(e)
                }
            }, e.prototype._onFollowBtnClick = function() {
                var e = this;
                if (this.pauseStory(), !this.followBtnLock) {
                    this.followBtnLock = !0;
                    var t = void 0,
                        n = void 0;
                    this.data.author.id > 0 ? (n = "al_friends", t = this.data.author.can_follow ? "add" : "remove") : (n = "al_groups", t = this.data.author.can_follow ? "a_enter" : "a_leave"), ajax.post(n + ".php", {
                        act: t,
                        mid: this.getOwnerId(),
                        gid: -this.getOwnerId(),
                        hash: this.data.author.hash,
                        from: "stories"
                    }, {
                        onDone: function() {
                            e.data.author.can_follow && e._sendStatEvent("follow"), e.data.author.can_follow = !e.data.author.can_follow, S(e.followBtn, "followed", !e.data.author.can_follow), e._showMessage(y(e.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(function() {
                                return e.playStory()
                            }), window.tooltips && tooltips.destroy(e.followBtn), triggerEvent(e.followBtn, "mouseover")
                        },
                        showProgress: function() {
                            return e.showInlineLoader()
                        },
                        hideProgress: function() {
                            e.hideInlineLoader(), e.followBtnLock = !1
                        }
                    })
                }
            }, e.prototype._getDimensions = function() {
                var e = getSize(this.wrapEl),
                    t = p(e, 2),
                    n = t[0],
                    r = t[1],
                    o = getXY(this.wrapEl),
                    i = p(o, 2),
                    a = i[0],
                    s = i[1];
                return {
                    width: n,
                    height: r,
                    top: s - scrollGetY(),
                    left: a - scrollGetX()
                }
            }, e.prototype.markAsActive = function() {
                this.isActive = !0, b(this.wrapEl, "animate_story")
            }, e.prototype._renderReplyTo = function() {
                var e = this.getCurStoryData().reply_to,
                    t = e.list,
                    n = e.photo_url,
                    r = e.name,
                    o = e.can_view_deleted,
                    i = e.is_deleted,
                    a = e.is_private,
                    s = e.raw_id,
                    u = x('<div class="stories_reply_to" style="background-image: url(' + n + ')">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">' + r + "</div>\n  </div>\n</div>");
                if (w(u, "click", function() {
                        var e = l.getPrevLayer();
                        l.getCount() > 1 && e.getStoryRaw() === s ? cancelStackPop() : showStory(t, {
                            fromEl: u
                        })
                    }), o) return u;
                var c = !1;
                return i ? (b(u, "deleted"), c = y("stories_deleted_story")) : a && (b(u, "private"), c = y("stories_private_story")), c && (val(C("stories_reply_to_error_msg", u), c), re(C("stories_reply_to_owner_name_wrap", u))), u
            }, e.prototype.sendMask = function() {
                var e = this;
                if (!this._maskSending) {
                    this._maskSending = !0, this.pauseStory();
                    var t = this.getCurStoryData();
                    ajax.post("al_stories.php", {
                        act: "send_mask",
                        mask_id: t.mask_id,
                        hash: this.data.send_mask_hash
                    }, {
                        onDone: function(t, n, r, o) {
                            "cant_send" === t ? showFastBox({
                                title: n,
                                width: 460,
                                onHide: function() {
                                    e.playStory()
                                }
                            }, r, o) : e._showMessage(y("stories_mask_sent")).then(function() {
                                return e.playStory()
                            })
                        },
                        showProgress: function() {
                            return e.showInlineLoader()
                        },
                        hideProgress: function() {
                            e._maskSending = !1, e.hideInlineLoader()
                        }
                    })
                }
            }, e.prototype._getFeedbackTTElem = function() {
                return C("stories_answers_tt_arrow", this.wrapEl) || C("_views_button", this.wrapEl)
            }, e.prototype._destroyFeedBackTT = function() {
                var e = this._getFeedbackTTElem();
                e && e.tt && e.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1
            }, e.prototype.hideFeedbackTooltip = function() {
                if (this._feedbackTTShown) {
                    var e = this._getFeedbackTTElem();
                    e && e.tt && (e.tt.hide(), this._feedbackTTShown = !1, this.playStory())
                }
            }, e.prototype.updateFeedbackTTArrow = function() {
                var e = this._getFeedbackTTElem();
                if (hasClass(e, "stories_answers_tt_arrow")) {
                    var t = C("stories_feedback_tt_arrow", this.wrapEl),
                        n = e.offsetLeft + getSize(e)[0] / 2 - getSize(t)[0] / 2 - 1;
                    setStyle(t, "left", n + "px")
                }
            }, e.prototype.showFeedbackTooltip = function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    n = this._getFeedbackTTElem();
                if (n)
                    if (this._feedbackTTShown && t !== !0) cancelStackPop();
                    else {
                        this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", function() {
                            e.hideFeedbackTooltip(!1, !0)
                        }), this._feedbackTTLoaded && (this._feedbackTTShown = !0);
                        var r = hasClass(n, "stories_answers_tt_arrow"),
                            o = 8;
                        if (r) {
                            var i = 39;
                            o = getSize(domPN(n))[0] - i
                        }
                        showTooltip(n, {
                            className: "stories_feedback_tt",
                            forcetoup: !0,
                            nohide: !0,
                            forceNoHide: !0,
                            nohideover: !0,
                            content: '<div class="stories_feedback_content">\n          <div class="stories_feedback_loader">' + this._getLoaderHtml() + '</div>\n        </div>\n        <div class="stories_feedback_headers"></div>\n        <div class="stories_feedback_close"></div>',
                            slide: 15,
                            zIndex: 100,
                            shift: [o, 19, 0],
                            appendEl: C("stories_bottom_wrap", this.wrapEl),
                            onHide: function() {
                                e._feedbackTTShown = !1
                            },
                            onShowStart: function() {
                                e.isActive && (e._feedbackTTShown = !0, e._feedbackTTLoaded ? e._feedbackRequestEnd && (e.feedbackScroll.update(), e._feedbackTooltipInitHeaders(), tooltips.rePositionTT(n.tt), e._onFeedbackScroll(), setTimeout(function() {
                                    return tooltips.rePositionTT(n.tt)
                                }, 200)) : (C("stories_feedback_tt", e.wrapEl).appendChild(x('<div class="stories_feedback_tt_arrow"></div>')), e._feedbackTTLoaded = !0, e._feedbackRequestEnd = !1, e._feedbackTooltipHeadersInited = !1, w(C("stories_feedback_close", e.wrapEl), "click", function() {
                                    return e.showFeedbackTooltip()
                                }), setTimeout(function() {
                                    ajax.post("al_stories.php", {
                                        act: "feedback",
                                        story_raw: e.getRawId()
                                    }, {
                                        onDone: function(t, r, o, i, a) {
                                            if (e.isActive) {
                                                e.story.setViews(i), e.story.setReplies(a), e._feedbackRequestEnd = !0;
                                                var s = C("stories_feedback_content", e.wrapEl);
                                                val(s, t), e.feedbackScroll = new uiScroll(C("stories_feedback_content", e.wrapEl), {
                                                    theme: "default emoji no_transition",
                                                    onmore: function() {
                                                        return e._onMoreFeedBack()
                                                    },
                                                    onscroll: function() {
                                                        return e._onFeedbackScroll()
                                                    }
                                                }), e.feedbackScroll.scrollTop(0), b(e.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), C("ui_scroll_overflow", e.feedbackScroll.container).appendChild(ce("div", {
                                                    className: "ui_scroll_shadow_bottom"
                                                })), e.feedbackNextFrom = r, n.tt.shown && e._feedbackTooltipInitHeaders(), e.updateBottom(), e.updateFeedbackTTPos(), cur = N(cur, o), e.updateFeedbackTTArrow()
                                            }
                                        }
                                    })
                                }, 200)), e.updateFeedbackTTArrow())
                            }
                        })
                    }
            }, e.prototype.updateFeedbackTTPos = function() {
                var e = this._getFeedbackTTElem();
                this._feedbackTTShown && e && e.tt && tooltips.rePositionTT(e.tt)
            }, e.prototype._feedbackTooltipInitHeaders = function() {
                if (!this._feedbackTooltipHeadersInited) {
                    this._feedbackTooltipHeadersInited = !0;
                    var e = C("stories_feedback_content", this.wrapEl),
                        t = C("stories_feedback_headers", this.wrapEl),
                        n = E("stories_feedback_title", e);
                    show(n[0]), this.feedbackHeaders = [];
                    for (var r = n.length + 1, o = 0; o < n.length; o++) {
                        var i = n[o],
                            a = t.appendChild(ce("div", {
                                className: "stories_feedback_title",
                                innerHTML: val(i)
                            }, {
                                top: i.offsetTop,
                                zIndex: r - o
                            }));
                        this.feedbackHeaders.push({
                            top: i.offsetTop,
                            height: i.offsetHeight,
                            el: a
                        })
                    }
                    setStyle(e, "margin-top", n[0].offsetHeight), hide(n[0])
                }
            }, e.prototype.feedbackTooltipReInitHeaders = function() {
                this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(C("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
            }, e.prototype._onFeedbackScroll = function() {
                if (this._feedbackTooltipHeadersInited)
                    for (var e = this.feedbackScroll.data.scrollTop, t = !1, n = 0, r = this.feedbackHeaders.length - 1; r >= 0; r--) {
                        var o = this.feedbackHeaders[r],
                            i = o.top,
                            a = o.height,
                            s = o.el,
                            l = i,
                            u = e;
                        t && (l += a, u -= n - l);
                        var c = u >= i - a;
                        s.classList.toggle("active", !t && c && u > 0), c && (t = !0), n = i;
                        var d = -Math.min(u, l);
                        s.style.transform = "translateY(" + d + "px)"
                    }
            }, e.prototype._onMoreFeedBack = function() {
                var e = this;
                !this.feedbackLoadingMore && this.feedbackNextFrom && (this.feedbackLoadingMore = !0, ajax.post("al_stories.php", {
                    act: "feedback",
                    story_raw: this.getRawId(),
                    offset: this.feedbackNextFrom
                }, {
                    onDone: function(t, n) {
                        e.feedbackNextFrom = n, n && (e.feedbackLoadingMore = !1);
                        for (var r = C("stories_feedback_views", e.wrapEl), o = ce("div", {
                                innerHTML: t
                            }), i = void 0; i = o.firstChild;) r.appendChild(i)
                    }
                }))
            }, e.prototype.showInlineLoader = function() {
                show(this.inlineLoader)
            }, e.prototype.hideInlineLoader = function() {
                hide(this.inlineLoader)
            }, e.prototype.volumeUpdate = function() {
                this.story && this.story.volumeUpdate && this.story.volumeUpdate()
            }, e.prototype._onAutoPlayFail = function() {
                b(this.wrapEl, "autoplay_failed")
            }, e.prototype._hideReply = function() {
                var e = this;
                showFastBox({
                    title: y("global_warning"),
                    onHide: function() {
                        e.playStory()
                    }
                }, y("stories_hide_reply_warning"), y("global_continue"), this._doHideReply.bind(this), y("global_cancel"))
            }, e.prototype._doHideReply = function() {
                var e = this;
                this.pauseStory(), b(this.wrapEl, "hiding_reply"), P().hide();
                var t = this.getIndex(),
                    n = this.data.author.gender,
                    r = x('<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">' + getProgressHtml() + '</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">' + y("stories_reply_hidden") + '</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">' + y("stories_hide_reply_continue") + '</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">' + langSex(n, window.lang.stories_hide_all_replies) + '</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">' + y("stories_reply_add_to_blacklist") + "</div>\n  </div>\n</div>");
                w(C("_stories_reply_restore", r), "click", this._restoreReply.bind(this)), w(C("_stories_reply_continue", r), "click", function() {
                    return e._replyHideEnd(t)
                }), w(C("_stories_hide_replies", r), "click", this._hideAllReplies.bind(this)), w(C("_stories_reply_ban", r), "click", this._ban.bind(this)), this.contWrap.appendChild(r), ajax.post("al_stories.php", {
                    act: "hide_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        e.opts.removeList(), cur.needUpdateFeedStories = !0, k(r, "loading")
                    },
                    onFail: function() {
                        e._resetReplyHide(), e.playStory()
                    }
                })
            }, e.prototype._restoreReply = function(e) {
                var t = this;
                cancelEvent(e);
                var n = C("stories_hide_reply_wrap", this.contWrap);
                ajax.post("al_stories.php", {
                    act: "restore_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        t._resetReplyHide(), t.playStory()
                    },
                    showProgress: function() {
                        return b(n, "loading")
                    },
                    hideProgress: function() {
                        return k(n, "loading")
                    }
                })
            }, e.prototype._resetReplyHide = function() {
                re(C("stories_hide_reply_wrap", this.contWrap)), k(this.wrapEl, "hiding_reply")
            }, e.prototype._hideAllReplies = function() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: y("global_warning")
                }, y("stories_delete_all_replies_confirm").replace("{name}", e), y("global_continue"), this._doHideAllReplies.bind(this), y("global_cancel"))
            }, e.prototype._doHideAllReplies = function(e) {
                var t = this;
                ajax.post("al_stories.php", {
                    act: "hide_all_replies",
                    owner_id: this.getOwnerId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        P().hide(), t.opts.removeList(), t.data.items = [];
                        var e = C("_stories_hide_replies", t.contWrap);
                        val(e, y("stories_all_replies_hidden")), b(e, "disabled")
                    },
                    showProgress: v.pbind(e),
                    hideProgress: g.pbind(e)
                })
            }, e.prototype._ban = function() {
                var e = this.data.author.first_name_gen;
                showFastBox({
                    title: y("global_warning")
                }, y("stories_ban_confirm").replace("{name}", e), y("global_continue"), this._doBan.bind(this), y("global_cancel"))
            }, e.prototype._doBan = function(e) {
                var t = this;
                ajax.post("al_stories.php", {
                    act: "ban",
                    owner_id: this.getOwnerId(),
                    hash: this.data.stories_ban_hash
                }, {
                    onDone: function() {
                        P().hide(), t.opts.removeList(), t.data.items = [];
                        var e = C("_stories_reply_ban", t.contWrap);
                        val(e, y("stories_banned")), b(e, "disabled")
                    },
                    showProgress: v.pbind(e),
                    hideProgress: g.pbind(e)
                })
            }, e.prototype._replyHideEnd = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                C("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && l.onReplyDeleted(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(e || this.getIndex(), !isNumeric(e)))
            }, e.prototype._feedbackRemoveReplyFromDom = function(e) {
                var t = C("stories_feedback_content", this.wrapEl);
                if (t) {
                    var n = t.querySelector("#feed_story_" + e);
                    n && b(n, "removed")
                }
            }, e.prototype.onReplyDeleted = function(e) {
                this._feedbackRemoveReplyFromDom(e)
            }, e.prototype._updateFeedStoryPreview = function() {
                var e = T("feed_story_" + this.getOwnerId());
                if (e && !hasClass(e, "stories_feed_reply_item")) {
                    var t = this.indexToUnread(!0),
                        n = this.data.items[t];
                    n && n.small_preview && setStyle(e, "background-image", "url(" + n.small_preview + ")")
                }
            }, e.prototype._sendStatEvent = function(e) {
                var t = this.getCurStoryData();
                ajax.post("al_stories.php", N({
                    act: "stat",
                    source_story: this.getRawId()
                }, t.stats[e]))
            }, e.prototype.report = function() {
                var e = this,
                    t = O("al_stories.php", {
                        act: "report_box"
                    }, {
                        onDone: function() {
                            var e = E("radiobtn", "stories_report");
                            m.stories_report = {
                                val: 0,
                                els: e
                            }
                        },
                        params: {
                            onClean: function() {
                                delete m.stories_report, e.playStory()
                            }
                        }
                    });
                t.removeButtons(), t.addButton(y("box_send"), this._sendReportButtonDidPress.bind(this)), t.addButton(y("global_cancel"), !1, "no")
            }, e.prototype._sendReportButtonDidPress = function(e) {
                var t = this,
                    n = this.index,
                    r = this.getCurStoryData();
                ajax.post("al_stories.php", {
                    act: "report",
                    story_raw: this.getRawId(),
                    reason: m.stories_report.val,
                    hash: r.report_hash
                }, {
                    onDone: function() {
                        P().hide(), t._popStoryAndClearList(n), showDoneBox(y("stories_report_sent"), {
                            className: "stories_done_msg"
                        })
                    },
                    showProgress: v.pbind(e),
                    hideProgress: g.pbind(e)
                })
            }, e
        }();
    t["default"] = R
}, function(e, t, n) {
    "use strict";
    var r = {};
    e.exports = r
}, function(e, t, n) {
    "use strict";
    var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
        o = {
            canUseDOM: r,
            canUseWorkers: "undefined" != typeof Worker,
            canUseEventListeners: r && !(!window.addEventListener && !window.attachEvent),
            canUseViewport: r && !!window.screen,
            isInWorker: !r
        };
    e.exports = o
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
    "use strict";

    function r(e) {
        return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
    }

    function o(e, t) {
        return t = r(t) || document, t.getElementsByTagName(e)
    }

    function i(e, t) {
        return t = r(t) || document, t.querySelector && t.querySelector(e) || o(e, t)[0]
    }

    function a(e, t, n) {
        t = r(t) || document, n = n || "*";
        var i = [];
        if (t.querySelectorAll && "*" != n) return t.querySelectorAll(n + "." + e);
        if (t.getElementsByClassName) {
            var a = t.getElementsByClassName(e);
            if ("*" != n) {
                n = n.toUpperCase();
                for (var s = 0, l = a.length; l > s; ++s) a[s].tagName.toUpperCase() == n && i.push(a[s])
            } else i = Array.prototype.slice.call(a);
            return i
        }
        for (var u = o(n, t), c = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, l = u.length; l > s; ++s) c.test(u[s].className) && i.push(u[s]);
        return i
    }

    function s(e, t, n) {
        return t = r(t) || document, n = n || "*", t.querySelector && t.querySelector(n + "." + e) || a(e, t, n)[0]
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

    function h(e, t, n) {
        var r = document.createElement(e);
        return t && extend(r, t), n && ue(r, n), r
    }

    function m(e) {
        return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function y(e) {
        return C(h("div", {
            innerHTML: e
        }))
    }

    function v(e) {
        return x(h("div", {
            innerHTML: e
        }))
    }

    function g(e, t) {
        return each(t, function(t, n) {
            e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof n ? "" : n).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function _(e) {
        return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
    }

    function w(e, t) {
        return isString(t) && (t = y(t)), T(e).replaceChild(t, e), t
    }

    function b(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function k(e) {
        return b((e || {}).nextSibling)
    }

    function S(e) {
        return b((e || {}).previousSibling, 1)
    }

    function C(e) {
        return b((e || {}).firstChild)
    }

    function E(e) {
        return b((e || {}).lastChild, 1)
    }

    function T(e) {
        return (e || {}).parentNode
    }

    function x(e) {
        for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
        return t
    }

    function L(e, t) {
        var n = T(t);
        return n && n.insertBefore(e, t)
    }

    function P(e, t) {
        var n = T(t);
        return n && n.insertBefore(e, k(t))
    }

    function O(e, t) {
        return e ? s(t, e) : e
    }

    function N(e, t, n) {
        return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
    }

    function R(e) {
        for (var t = 0; null != (e = S(e));) t++;
        return t
    }

    function I(e, t) {
        do e = T(e); while (e && !A(e, t));
        return e
    }

    function F(e, t, n) {
        for (var r = null; null === r && e;) e = -1 === n ? S(e) : k(e), e && A(e, t) && (r = e);
        return r
    }

    function A(e, t) {
        if (e = r(e), !e || e == document) return !1;
        var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t[n] !== this;);
            return n > -1
        };
        return n.call(e, t)
    }

    function D(e) {
        return A(e, ":hover")
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

    function M(e, t) {
        t = t || {};
        for (var n = t.fromEl || T(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
            var o = le(n, "position");
            if (inArray(o, r) && (!t.noOverflow || "hidden" != le(n, "overflow"))) break;
            n = T(n)
        }
        return n
    }

    function U(e, t) {
        e = r(e);
        for (var n, o, i, a, s = e; s && s.tagName && s !== bodyNode && (n = le(s, "position"), o = le(s, "overflow"), i = le(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === o || ("static" === n ? a && "relative" !== a : "fixed" === a));) "none" !== i ? a = void 0 : "static" !== n && "fixed" !== a && (a = n), s = T(s);
        return s
    }

    function H(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) H(arguments[n]);
        else if (e = r(e), e && e.style) {
            var o = e.olddisplay,
                i = "block",
                a = e.tagName.toLowerCase();
            e.style.display = o || "", "none" === le(e, "display") && (i = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== a || browser.msie ? "table" !== a || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = i)
        }
    }

    function z(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; t > n; n++) z(arguments[n]);
        else if (e = r(e), e && e.style) {
            var o = le(e, "display");
            e.olddisplay = "none" != o ? o : "", e.style.display = "none"
        }
    }

    function W(e) {
        return e = r(e), e && e.style ? "none" != le(e, "display") : !1
    }

    function V() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function K(e, t, n) {
        e = r(e), n = n || 0;
        var o = Q(e)[1],
            i = G(e)[1],
            a = window,
            s = document.documentElement,
            l = Math.max(intval(a.innerHeight), intval(s.clientHeight)),
            u = r("page_header_cont"),
            c = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            d = vk.staticheader ? Math.max(0, G(u)[1] - c) : G(u)[1];
        if (t) {
            if (c + d + n > o + i) return o + i - c - d - n;
            if (o > c + l - n) return o - c - l + n
        } else {
            if (c + d + n > o) return o - c - d - n;
            if (o + i > c + l - n) return o + i - c - l + n
        }
        return 0
    }

    function Y(e, t) {
        return void 0 === t && (t = !W(e)), t ? H(e) : z(e), t
    }

    function $(e) {
        return "undefined" != typeof e.getBoundingClientRect
    }

    function q(e, t) {
        var n;
        if (t && "inline" == le(e, "display")) {
            var r = e.getClientRects();
            n = r && r[0] || e.getBoundingClientRect()
        } else n = e.getBoundingClientRect();
        return n
    }

    function Q(e, t) {
        if (e = r(e), !e) return [0, 0];
        var n, o, i = {
                top: 0,
                left: 0
            },
            a = e.ownerDocument;
        return a ? (n = a.documentElement, $(e) && (i = q(e, !0)), o = a == a.window ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1, [i.left + (t ? 0 : o.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), i.top + (t ? 0 : o.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
    }

    function X(e) {
        return null != e && e === e.window
    }

    function G(e, t, n) {
        e = r(e);
        var o, i = [0, 0],
            a = document.documentElement;
        if (t && "border-box" === le(e, "boxSizing") && (t = !1), e == document) i = [Math.max(a.clientWidth, bodyNode.scrollWidth, a.scrollWidth, bodyNode.offsetWidth, a.offsetWidth), Math.max(a.clientHeight, bodyNode.scrollHeight, a.scrollHeight, bodyNode.offsetHeight, a.offsetHeight)];
        else if (e) {
            var s = function() {
                i = $(e) && (o = q(e, n)) && void 0 !== o.width ? [o.width, o.height] : [e.offsetWidth, e.offsetHeight], t && each(i, function(t, n) {
                    var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    each(r, function() {
                        i[t] -= parseFloat(le(e, "padding" + this)) || 0, i[t] -= parseFloat(le(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (W(e)) s();
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
        return G(e)[0]
    }

    function J(e) {
        return G(e)[1]
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

    function oe(e, t) {
        return setTimeout(re.pbind(e, t), 0)
    }

    function ie(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? te : re)(e, t), n
    }

    function ae(e, t, n) {
        return void 0 === n && (n = !ee(e, t)), (n ? ne : oe)(e, t), n
    }

    function se(e, t, n) {
        re(e, t), te(e, n)
    }

    function le(e, t, n) {
        if (e = r(e), isArray(t)) {
            var o = {};
            return each(t, function(t, n) {
                o[n] = le(e, n)
            }), o
        }
        if (!e) return "";
        if (void 0 === n && (n = !0), !n && "opacity" == t && browser.msie) {
            var i = e.style.filter;
            return i ? i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!n && e.style && (e.style[t] || "height" == t)) return e.style[t];
        var a, s = document.defaultView || window;
        if (s.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = s.getComputedStyle(e, null);
            l && (a = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" == t && browser.msie) {
                var i = e.currentStyle.filter;
                return i && i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            a = e.currentStyle[t] || e.currentStyle[u], "auto" == a && (a = 0), a = (a + "").split(" "), each(a, function(t, n) {
                if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                    var r = e.style,
                        o = r.left,
                        i = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, a[t] = r.pixelLeft + "px", r.left = o, e.runtimeStyle.left = i
                }
            }), a = a.join(" ")
        }
        if (n && ("width" == t || "height" == t)) {
            var c = G(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            a = (intval(a) ? Math.max(floatval(a), c) : c) + "px"
        }
        return a
    }

    function ue(e, t, n) {
        if (e = r(e)) {
            if ("object" == ("undefined" == typeof t ? "undefined" : Ee(t))) return each(t, function(t, n) {
                ue(e, t, n)
            });
            if ("opacity" == t) browser.msie && ((n + "").length ? 1 !== n ? e.style.filter = "alpha(opacity=" + 100 * n + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var o = "number" == typeof n;
                o && /height|width/i.test(t) && (n = Math.abs(n)), n = o && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (i) {
                debugLog("setStyle error: ", [t, n], i)
            }
        }
    }

    function ce(e, t, n) {
        setTimeout(ue.pbind(e, t, n), 0)
    }

    function de(e, t, n) {
        var o = fe(e, "pseudo-id");
        o || (fe(e, "pseudo-id", o = irand(1e8, 999999999)), te(e, "_pseudo_" + o));
        var i = t + "-style-" + o,
            a = r(i),
            s = "._pseudo_" + o + ":" + t + "{";
        a || (a = headNode.appendChild(h("style", {
            id: i,
            type: "text/css"
        }))), each(n, function(e, t) {
            s += e + ": " + t + " !important;"
        }), s += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(s, 0)) : a.styleSheet && (a.styleSheet.cssText = s)
    }

    function fe(e, t, n) {
        if (!e) return !1;
        var r, o = e[vkExpand];
        return o || (o = e[vkExpand] = ++vkUUID), n !== r && (vkCache[o] || (vkCache[o] = {}, __debugMode && (vkCache[o].__elem = e)), vkCache[o][t] = n), t ? vkCache[o] && vkCache[o][t] : o
    }

    function pe(e, t, n) {
        return e = r(e), "undefined" == typeof n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
    }

    function he(e) {
        for (var t = 0, n = arguments.length; n > t; ++t) {
            var r = arguments[t];
            if (void 0 !== e[r]) try {
                delete e[r]
            } catch (o) {
                try {
                    e.removeAttribute(r)
                } catch (o) {}
            }
        }
    }

    function me(e, t) {
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
                    r || me(e)
                }
            } else removeEvent(e), he(e, vkExpand), delete vkCache[n]
    }

    function ye() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var n = r(e[t]);
            n && (me(n), he(n, "btnevents"))
        }
    }

    function ve(e, t, n) {
        if (e = r(e), e && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
            else {
                var o = i("b", e);
                o && o.scrollWidth > o.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function ge() {
        var e = r("zoom_test_1") || document.body.appendChild(h("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = r("zoom_test_2") || document.body.appendChild(h("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }));
        return t.offsetLeft / e.offsetLeft
    }

    function _e(e, t, n) {
        return (e = r(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
    }

    function we(e, t, n) {
        e = r(e);
        try {
            if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === n || n === !1) && (n = t), e.createTextRange) {
                var o = e.createTextRange();
                o.collapse(!0), o.moveEnd("character", n), o.moveStart("character", t), o.select()
            } else e.setSelectionRange && e.setSelectionRange(t, n)
        } catch (i) {}
    }

    function be(e, t, n) {
        for (e = r(e), n = n || 999; e && !t(e);) {
            if (n--, 0 == n) return !1;
            try {
                if (e = T(e), e == document) break
            } catch (o) {
                e = !1
            }
        }
        return e
    }

    function ke(e) {
        return Te ? void 0 : window.document.title = replaceEntities(e)
    }

    function Se(e) {
        Te = e, e && window.cur && window.cur.destroy.push(function() {
            Se(!1)
        })
    }
    n.r(t), n.d(t, "ge", function() {
        return r
    }), n.d(t, "geByTag", function() {
        return o
    }), n.d(t, "geByTag1", function() {
        return i
    }), n.d(t, "geByClass", function() {
        return a
    }), n.d(t, "geByClass1", function() {
        return s
    }), n.d(t, "gpeByClass", function() {
        return l
    }), n.d(t, "domQuery", function() {
        return u
    }), n.d(t, "domQuery1", function() {
        return c
    }), n.d(t, "domClosest", function() {
        return d
    }), n.d(t, "domClosestByTag", function() {
        return f
    }), n.d(t, "gpeByTag", function() {
        return p
    }), n.d(t, "ce", function() {
        return h
    }), n.d(t, "re", function() {
        return m
    }), n.d(t, "se", function() {
        return y
    }), n.d(t, "sech", function() {
        return v
    }), n.d(t, "rs", function() {
        return g
    }), n.d(t, "psr", function() {
        return _
    }), n.d(t, "domReplaceEl", function() {
        return w
    }), n.d(t, "domEL", function() {
        return b
    }), n.d(t, "domNS", function() {
        return k
    }), n.d(t, "domPS", function() {
        return S
    }), n.d(t, "domFC", function() {
        return C
    }), n.d(t, "domLC", function() {
        return E
    }), n.d(t, "domPN", function() {
        return T
    }), n.d(t, "domChildren", function() {
        return x
    }), n.d(t, "domInsertBefore", function() {
        return L
    }), n.d(t, "domInsertAfter", function() {
        return P
    }), n.d(t, "domByClass", function() {
        return O
    }), n.d(t, "domData", function() {
        return N
    }), n.d(t, "domChildIndex", function() {
        return R
    }), n.d(t, "domCA", function() {
        return I
    }), n.d(t, "domClosestSibling", function() {
        return F
    }), n.d(t, "matchesSelector", function() {
        return A
    }), n.d(t, "isHover", function() {
        return D
    }), n.d(t, "isAncestor", function() {
        return j
    }), n.d(t, "getScroll", function() {
        return B
    }), n.d(t, "domClosestPositioned", function() {
        return M
    }), n.d(t, "domClosestOverflowHidden", function() {
        return U
    }), n.d(t, "show", function() {
        return H
    }), n.d(t, "hide", function() {
        return z
    }), n.d(t, "isVisible", function() {
        return W
    }), n.d(t, "clientHeight", function() {
        return V
    }), n.d(t, "getClientRectOffsetY", function() {
        return K
    }), n.d(t, "toggle", function() {
        return Y
    }), n.d(t, "boundingRectEnabled", function() {
        return $
    }), n.d(t, "getXYRect", function() {
        return q
    }), n.d(t, "getXY", function() {
        return Q
    }), n.d(t, "isWindow", function() {
        return X
    }), n.d(t, "getSize", function() {
        return G
    }), n.d(t, "getW", function() {
        return Z
    }), n.d(t, "getH", function() {
        return J
    }), n.d(t, "hasClass", function() {
        return ee
    }), n.d(t, "addClass", function() {
        return te
    }), n.d(t, "addClassDelayed", function() {
        return ne
    }), n.d(t, "removeClass", function() {
        return re
    }), n.d(t, "removeClassDelayed", function() {
        return oe
    }), n.d(t, "toggleClass", function() {
        return ie
    }), n.d(t, "toggleClassDelayed", function() {
        return ae
    }), n.d(t, "replaceClass", function() {
        return se
    }), n.d(t, "getStyle", function() {
        return le
    }), n.d(t, "setStyle", function() {
        return ue
    }), n.d(t, "setStyleDelayed", function() {
        return ce
    }), n.d(t, "setPseudoStyle", function() {
        return de
    }), n.d(t, "data", function() {
        return fe
    }), n.d(t, "attr", function() {
        return pe
    }), n.d(t, "removeAttr", function() {
        return he
    }), n.d(t, "removeData", function() {
        return me
    }), n.d(t, "cleanElems", function() {
        return ye
    }), n.d(t, "setTitle", function() {
        return ve
    }), n.d(t, "getZoom", function() {
        return ge
    }), n.d(t, "val", function() {
        return _e
    }), n.d(t, "elfocus", function() {
        return we
    }), n.d(t, "traverseParent", function() {
        return be
    }), n.d(t, "setDocumentTitle", function() {
        return ke
    }), n.d(t, "lockDocumentTitle", function() {
        return Se
    });
    var Ce = n(27),
        Ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
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
    }(), window.vkExpand = window.vkExpand || "VK" + Object(Ce.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var Te = !1;
    window.ge = r, window.geByTag = o, window.geByTag1 = i, window.geByClass = a, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = u, window.domQuery1 = c, window.domClosest = d, window.ce = h, window.re = m, window.se = y, window.sech = v, window.rs = g, window.psr = _, window.domReplaceEl = w, window.domEL = b, window.domNS = k, window.domPS = S, window.domFC = C, window.domLC = E, window.domPN = T, window.domChildren = x, window.domInsertBefore = L, window.domInsertAfter = P, window.domByClass = O, window.domData = N, window.domChildIndex = R, window.domCA = I, window.domClosestSibling = F, window.matchesSelector = A, window.isHover = D, window.isAncestor = j, window.getScroll = B, window.domClosestPositioned = M, window.domClosestOverflowHidden = U, window.show = H, window.hide = z, window.isVisible = W, window.clientHeight = V, window.getClientRectOffsetY = K, window.toggle = Y, window.boundingRectEnabled = $, window.getXYRect = q, window.getXY = Q, window.isWindow = X, window.getSize = G, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = oe, window.toggleClass = ie, window.toggleClassDelayed = ae, window.replaceClass = se, window.getStyle = le, window.setStyle = ue, window.setStyleDelayed = ce, window.setPseudoStyle = de, window.data = fe, window.attr = pe, window.removeAttr = he, window.removeData = me, window.cleanElems = ye, window.setTitle = ve, window.getZoom = ge, window.val = _e, window.elfocus = we, window.traverseParent = be, window.getH = J, window.getW = Z, window.domClosestByTag = f, window.setDocumentTitle = ke, window.lockDocumentTitle = Se
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = gpeByClass(a, e);
        return t.id.replace("report", "")
    }

    function o(e) {
        var t = gpeByClass(a, e),
            n = geByClass1("decision_result", t);
        return domData(n, "decision_raw_id")
    }
    n.r(t), n.d(t, "MODULE", function() {
        return i
    }), n.d(t, "REPORT_CLASS", function() {
        return a
    }), n.d(t, "BAN_PERIOD_FOREVER", function() {
        return s
    }), n.d(t, "_getReportRawIdByElement", function() {
        return r
    }), n.d(t, "_getReportDecisionRawIdByElement", function() {
        return o
    });
    var i = "sf",
        a = "sf_report",
        s = 1e3
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = e, n = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], r = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], o = 0, i = n.length; i > o; o++) t = t.split(n[o]).join(r[o]);
        for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", o = 0, i = a.length; i > o; o++) t = t.split(a.charAt(o)).join(s.charAt(o));
        return t == e ? null : t
    }

    function o(e) {
        var t, n = e,
            r = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"],
            o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"],
            i = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ",
            a = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ";
        for (t = 0; t < o.length; t++) n = n.split(o[t]).join(r[t]);
        for (t = 0; t < a.length; t++) n = n.split(a.charAt(t)).join(i.charAt(t));
        return n == e ? null : n
    }

    function i(e) {
        var t, n = e,
            r = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`",
            o = "йцукенгшщзхъфывапролджэячсмитьбю.ё";
        for (t = 0; t < r.length; t++) n = n.split(r.charAt(t)).join(o.charAt(t));
        return n == e ? null : n
    }

    function a(e, t, n) {
        if (!t || !window.langConfig) return e;
        var r;
        if (isArray(t) ? (r = t[1], e != Math.floor(e) ? r = t[langConfig.numRules["float"]] : each(langConfig.numRules["int"], function(n, o) {
                if ("*" == o[0]) return r = t[o[2]], !1;
                var i = o[0] ? e % o[0] : e;
                return -1 != indexOf(o[1], i) ? (r = t[o[2]], !1) : void 0
            })) : r = t, n) {
            for (var o = e.toString().split("."), i = [], a = o[0].length - 3; a > -3; a -= 3) i.unshift(o[0].slice(a > 0 ? a : 0, a + 3));
            o[0] = i.join(langConfig.numDel), e = o.join(langConfig.numDec)
        }
        return r = (r || "%s").replace("%s", e)
    }

    function s(e, t) {
        if (!isArray(t)) return t;
        var n = t[1];
        return window.langConfig ? (each(langConfig.sexRules, function(r, o) {
            return "*" == o[0] ? (n = t[o[1]], !1) : e == o[0] && t[o[1]] ? (n = t[o[1]], !1) : void 0
        }), n) : n
    }

    function l(e) {
        for (var t = e + "", n = arguments, r = n.length, o = 1; r > o; o += 2) {
            var i = "%" == n[o][0] ? n[o] : "{" + n[o] + "}";
            t = t.replace(i, n[o + 1])
        }
        return t
    }

    function u(e, t) {
        var n = t ? window : window.cur;
        n.lang ? extend(n.lang, e) : n.lang = e
    }

    function c() {
        try {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (!t) return "...";
            var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!n) {
                var r = t.split("_");
                return r.shift(), r.join(" ")
            }
            return isFunction(n) ? n.apply(null, e) : void 0 === e[0] && !isArray(n) || "raw" === e[0] ? n : a(e[0], n, e[1])
        } catch (o) {
            debugLog("lang error:" + o.message + "(" + Array.prototype.slice.call(arguments).join(", ") + ")")
        }
    }

    function d(e, t, n, r, o, i) {
        var a;
        if (i || (i = ""), isArray(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, a = new Date(e)) : a = e, o) t = t[1];
        else {
            var s = "";
            s = isToday(a) ? t[3] : isYesterday(a) ? t[2] : isTomorrow(a) ? t[4] : t[1], !s && t[1] && (s = t[1]), t = s
        }
        var l = "",
            u = {
                hours: a.getHours(),
                minutes: a.getMinutes(),
                seconds: a.getSeconds(),
                day: a.getDate(),
                month: a.getMonth() + 1,
                year: a.getFullYear()
            };
        switch (3 === vk.lang && (l = a.getHours() > 11 ? "pm" : "am", u.hours = a.getHours() % 12 == 0 ? 12 : a.getHours() % 12), vk.lang) {
            case 1:
                switch (a.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !isToday(a) || isYesterday(a) || isTomorrow(a) || (t = i + t);
                break;
            case 12:
            case 73:
                1 == a.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (u.year = u.year + 543), t.replace("{hour}", u.hours).replace("{num_hour}", leadingZero(u.hours)).replace("{minute}", leadingZero(u.minutes)).replace("{day}", u.day).replace("{num_day}", leadingZero(u.day)).replace("{month}", r[u.month]).replace("{year}", u.year).replace("{short_year}", u.year % 100).replace("{second}", leadingZero(u.seconds)).replace("{am_pm}", l)
    }

    function f(e, t, n, r, o) {
        e *= 1e3, "undefined" == typeof n && (n = !0), "undefined" == typeof r && (r = c("months_of", "raw")), t *= 1e3;
        var i = Date.now(),
            a = new Date(i),
            s = new Date(e + t);
        return !o && e > i && 864e5 > e - i && a.getDate() == s.getDate() ? d(e, "{hour}:{minute} {am_pm}", t, [], !n) : s.getYear() != a.getYear() || i - 157248e5 > e ? d(e, c("global_date", "raw"), t, r, !n) : d(e, c("global_short_date", "raw"), t, r, !n)
    }

    function p(e, t, n, r) {
        return isToday(new Date(1e3 * e + 1e3 * t)) ? d(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : f(e, t, n, r)
    }

    function h(e, t, n) {
        return isArray(t) && e < t.length ? t[e] : a(e, n)
    }

    function m(e, t) {
        var n = "";
        e += t;
        var r = parseInt(Date.now() / 1e3) - e;
        if (60 > r) n = c("global_just_now");
        else if (3600 > r) {
            var o = intval(r / 60);
            n = h(o, c("global_word_mins_ago", "raw"), c("global_mins_ago", "raw"))
        } else if (14400 > r) {
            var i = intval(r / 3600);
            n = h(i, c("global_word_hours_ago", "raw"), c("global_hours_ago", "raw"))
        } else n = y(e, 0, !0, "_l");
        return n
    }

    function y(e, t, n, r) {
        "undefined" == typeof n && (n = !0), "undefined" == typeof t && (t = 0), "undefined" == typeof r && (r = ""), t *= 1e3;
        var o = new Date(1e3 * e),
            i = new Date;
        return o.getFullYear() != i.getFullYear() && o.getTime() < i.getTime() - 1728e5 || Math.abs(o.getTime() - i.getTime()) > 157248e5 ? d(1e3 * e, c("global_date", "raw"), t, c("months_sm_of"), !n) : d(1e3 * e, c("global_short_date_time" + r, "raw"), t, c("months_sm_of"), !n)
    }

    function v(e, t, n) {
        "undefined" == typeof n && (n = !0), "undefined" == typeof t && (t = 0);
        var r = new Date,
            o = r.getFullYear(),
            i = r.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            l = a.getMonth();
        return o > s && (i > 1 || 9 > l || o - s >= 2) ? d(1e3 * e, c("global_date", "raw"), t, c("months_sm_of", "raw"), !n) : d(1e3 * e, c("global_short_date_time", "raw"), t, c("months_sm_of", "raw"), !n)
    }
    n.r(t), n.d(t, "parseLatin", function() {
        return r
    }), n.d(t, "parseCyr", function() {
        return o
    }), n.d(t, "parseLatKeys", function() {
        return i
    }), n.d(t, "langNumeric", function() {
        return a
    }), n.d(t, "langSex", function() {
        return s
    }), n.d(t, "langStr", function() {
        return l
    }), n.d(t, "addLangKeys", function() {
        return u
    }), n.d(t, "getLang", function() {
        return c
    }), n.d(t, "langDate", function() {
        return d
    }), n.d(t, "getShortDate", function() {
        return f
    }), n.d(t, "getShortDateOrTime", function() {
        return p
    }), n.d(t, "langWordNumeric", function() {
        return h
    }), n.d(t, "getDateText", function() {
        return m
    }), n.d(t, "getBigDateNew", function() {
        return y
    }), n.d(t, "getSmDate", function() {
        return v
    }), window.parseLatin = r, window.parseCyr = o, window.parseLatKeys = i, window.langNumeric = a, window.langSex = s, window.langStr = l, window.addLangKeys = u, window.getLang = c, window.langDate = d, window.getShortDate = f, window.getShortDateOrTime = p, window.langWordNumeric = h, window.getDateText = m, window.getBigDateNew = y, window.getSmDate = v
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
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
    n.r(t);
    var a = n(21),
        s = n(37),
        l = 4e3,
        u = function(e) {
            function t(n, i) {
                r(this, t);
                var a = o(this, e.call(this, n, i));
                return a.startTs = 0, a.pauseTime = 0, a
            }
            return i(t, e), t.prototype.render = function() {
                var t = this;
                if (e.prototype.render.call(this), this.photo) return this.photo;
                var n = this.data.photo_url;
                return this.photo = ce("div", {
                    className: "stories_photo"
                }), this._isFailed() ? this.photo : (Object(a.loadMedia)(n).then(function(e) {
                    t.photo && (setStyle(t.photo, "backgroundImage", "url(" + e + ")"), t._onCanPlay())
                })["catch"](function() {
                    t._loadingError()
                }), this.photo)
            }, t.prototype.destroy = function() {
                e.prototype.destroy.call(this), delete this.photo
            }, t.prototype.play = function() {
                (0 === this.startTs || this.pauseTime > 0) && (this.startTs = Date.now() - this.pauseTime, this.pauseTime = 0), e.prototype.play.call(this);
            }, t.prototype.pause = function() {
                this.isPaused() || (e.prototype.pause.call(this), this.pauseTime = this.getCurrentTime())
            }, t.prototype.setCurrentTime = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.startTs = Date.now() + e, this.isPaused() && (this.pauseTime = e)
            }, t.prototype.getCurrentTime = function() {
                return Date.now() - this.startTs || 0
            }, t.prototype.getDuration = function() {
                return l
            }, t.prototype._onCanPlay = function() {
                e.prototype._onCanPlay.call(this), setStyle(this.photo, "opacity", 1)
            }, t
        }(s["default"]);
    t["default"] = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
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
    n.r(t);
    var a = n(37),
        s = n(23),
        l = function(e) {
            function t() {
                return r(this, t), o(this, e.apply(this, arguments))
            }
            return i(t, e), t.prototype.render = function() {
                var t = this;
                if (e.prototype.render.call(this), this.video) return this.video;
                var n = this.data.video_url;
                return this.video = ce("video", {
                    className: "stories_video",
                    autoplay: !1,
                    volume: getAudioPlayer().getVolume()
                }), addEvent(this.video, "error", function() {
                    t._loadingError()
                }), this._isFailed() ? this.video : (this.loaded && (this.video.currentTime = 0), addEvent(this.video, "canplay", this._onCanPlay.bind(this)), this.video.src = n, this.volumeUpdate(), this.video)
            }, t.prototype.getImage = function() {
                var e = getSize(this.video),
                    t = ce("canvas", {
                        width: e[0],
                        height: e[1]
                    }),
                    n = t.getContext("2d");
                return n.drawImage(this.video, 0, 0, e[0], e[1]), t.toDataURL()
            }, t.prototype.destroy = function() {
                e.prototype.destroy.call(this), removeEvent(this.video), delete this.video
            }, t.prototype.play = function() {
                var t = this;
                if (e.prototype.play.call(this), this.loaded && this.video) {
                    var n = this.video.play();
                    void 0 !== n && n["catch"](function(e) {
                        t.opts.onAutoPlayFail()
                    })
                }
            }, t.prototype.pause = function() {
                e.prototype.pause.call(this), this.video && this.video.pause()
            }, t.prototype.setCurrentTime = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.loaded && (this.video.currentTime = e)
            }, t.prototype.getCurrentTime = function() {
                return this.video.currentTime
            }, t.prototype.getDuration = function() {
                return this.video.duration
            }, t.prototype._onCanPlay = function() {
                e.prototype._onCanPlay.call(this), setStyle(this.video, "opacity", 1)
            }, t.prototype.volumeUpdate = function() {
                this.video.volume = s.getVolume()
            }, t
        }(a["default"]);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r() {
        g || (g = new Worker("/js/al/stories_loader_worker.js"), g.onmessage = function(e) {
            var t = e.data;
            switch (t.type) {
                case "loaded":
                    m[t.url] = t.data, i(t.url, !0, t.data);
                    break;
                case "error":
                    i(t.url, !1);
                    break;
                case "inited":
                    _ = !0;
                    for (var n = 0; n < v.length; n++) a(v[n])
            }
        })
    }

    function o(e) {
        return e.match(/\.mp4/) ? "video" : e.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
    }

    function i(e, t, n) {
        var r = y[e];
        if (r)
            for (var o = 0; o < r.length; o++) {
                var i = r[o];
                t ? i.resolve(n) : i.reject(), r.splice(o, 1), o--
            }
    }

    function a(e, t) {
        g.postMessage({
            cmd: "load",
            url: e
        })
    }

    function s(e) {
        return r(), new h(function(t, n) {
            if (e || t(""), m[e]) return t(m[e]);
            var r = o(e);
            switch (r) {
                case "video":
                case "image":
                    y[e] || (y[e] = []);
                    var i = 0 === y[e].length;
                    if (y[e].push({
                            resolve: t,
                            reject: n
                        }), !i) return;
                    _ ? a(e) : v.push(e);
                    break;
                default:
                    vk.dev && console.error("wrong media url")
            }
        })
    }

    function l() {
        var e = utilsNode.appendChild(ce("iframe")),
            t = u(e);
        w = t && t.body ? t.body : utilsNode.appendChild(ce("div", {}, {
            display: "none"
        }))
    }

    function u(e) {
        try {
            return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
        } catch (t) {}
        return !1
    }

    function c(e) {
        return new h(function(t, n) {
            var r = ce("video");
            r.oncanplay = function() {
                t(), re(r)
            }, r.onerror = function() {
                n(), re(r)
            }, w.appendChild(r), r.src = e
        })
    }

    function d(e) {
        return new h(function(t, n) {
            var r = vkImage();
            r.onload = function() {
                t(), re(r)
            }, r.onerror = function() {
                n(), re(r)
            }, w.appendChild(r), r.src = e
        })
    }

    function f(e) {
        return w || l(), e.match(/\.mp4/) ? c(e) : d(e)
    }
    n.r(t), n.d(t, "loadMedia", function() {
        return s
    }), n.d(t, "default", function() {
        return f
    });
    var p = n(10),
        h = p.Promise,
        m = {},
        y = {},
        v = [],
        g = !1,
        _ = !1,
        w = !1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = arguments.length - 1, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        Ir(!1, "Minified React error #" + e + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", n)
    }

    function o(e, t, n, r, o, i, a, s, l) {
        this._hasCaughtError = !1, this._caughtError = null;
        var u = Array.prototype.slice.call(arguments, 3);
        try {
            t.apply(n, u)
        } catch (c) {
            this._caughtError = c, this._hasCaughtError = !0
        }
    }

    function i() {
        if (zr._hasRethrowError) {
            var e = zr._rethrowError;
            throw zr._rethrowError = null, zr._hasRethrowError = !1, e
        }
    }

    function a() {
        if (Wr)
            for (var e in Vr) {
                var t = Vr[e],
                    n = Wr.indexOf(e);
                if (n > -1 ? void 0 : r("96", e), !Kr[n]) {
                    t.extractEvents ? void 0 : r("97", e), Kr[n] = t, n = t.eventTypes;
                    for (var o in n) {
                        var i = void 0,
                            a = n[o],
                            l = t,
                            u = o;
                        Yr.hasOwnProperty(u) ? r("99", u) : void 0, Yr[u] = a;
                        var c = a.phasedRegistrationNames;
                        if (c) {
                            for (i in c) c.hasOwnProperty(i) && s(c[i], l, u);
                            i = !0
                        } else a.registrationName ? (s(a.registrationName, l, u), i = !0) : i = !1;
                        i ? void 0 : r("98", o, e)
                    }
                }
            }
    }

    function s(e, t, n) {
        $r[e] ? r("100", e) : void 0, $r[e] = t, qr[e] = t.eventTypes[n].dependencies
    }

    function l(e) {
        Wr ? r("101") : void 0, Wr = Array.prototype.slice.call(e), a()
    }

    function u(e) {
        var t, n = !1;
        for (t in e)
            if (e.hasOwnProperty(t)) {
                var o = e[t];
                Vr.hasOwnProperty(t) && Vr[t] === o || (Vr[t] ? r("102", t) : void 0, Vr[t] = o, n = !0)
            }
        n && a()
    }

    function c(e, t, n, r) {
        t = e.type || "unknown-event", e.currentTarget = Zr(r), zr.invokeGuardedCallbackAndCatchFirstError(t, n, void 0, e), e.currentTarget = null
    }

    function d(e, t) {
        return null == t ? r("30") : void 0, null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t]
    }

    function f(e, t, n) {
        Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e)
    }

    function p(e, t) {
        if (e) {
            var n = e._dispatchListeners,
                r = e._dispatchInstances;
            if (Array.isArray(n))
                for (var o = 0; o < n.length && !e.isPropagationStopped(); o++) c(e, t, n[o], r[o]);
            else n && c(e, t, n, r);
            e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e)
        }
    }

    function h(e) {
        return p(e, !0)
    }

    function m(e) {
        return p(e, !1)
    }

    function y(e, t) {
        var n = e.stateNode;
        if (!n) return null;
        var o = Xr(n);
        if (!o) return null;
        n = o[t];
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
                (o = !o.disabled) || (e = e.type, o = !("button" === e || "input" === e || "select" === e || "textarea" === e)), e = !o;
                break e;
            default:
                e = !1
        }
        return e ? null : (n && "function" != typeof n ? r("231", t, typeof n) : void 0, n)
    }

    function v(e, t) {
        null !== e && (Jr = d(Jr, e)), e = Jr, Jr = null, e && (t ? f(e, h) : f(e, m), Jr ? r("95") : void 0, zr.rethrowCaughtError())
    }

    function g(e, t, n, r) {
        for (var o = null, i = 0; i < Kr.length; i++) {
            var a = Kr[i];
            a && (a = a.extractEvents(e, t, n, r)) && (o = d(o, a))
        }
        v(o, !1)
    }

    function _(e) {
        if (e[ro]) return e[ro];
        for (; !e[ro];) {
            if (!e.parentNode) return null;
            e = e.parentNode
        }
        return e = e[ro], 5 === e.tag || 6 === e.tag ? e : null
    }

    function w(e) {
        return 5 === e.tag || 6 === e.tag ? e.stateNode : void r("33")
    }

    function b(e) {
        return e[oo] || null
    }

    function k(e) {
        do e = e["return"]; while (e && 5 !== e.tag);
        return e ? e : null
    }

    function S(e, t, n) {
        for (var r = []; e;) r.push(e), e = k(e);
        for (e = r.length; 0 < e--;) t(r[e], "captured", n);
        for (e = 0; e < r.length; e++) t(r[e], "bubbled", n)
    }

    function C(e, t, n) {
        (t = y(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = d(n._dispatchListeners, t), n._dispatchInstances = d(n._dispatchInstances, e))
    }

    function E(e) {
        e && e.dispatchConfig.phasedRegistrationNames && S(e._targetInst, C, e)
    }

    function T(e) {
        if (e && e.dispatchConfig.phasedRegistrationNames) {
            var t = e._targetInst;
            t = t ? k(t) : null, S(t, C, e)
        }
    }

    function x(e, t, n) {
        e && n && n.dispatchConfig.registrationName && (t = y(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = d(n._dispatchListeners, t), n._dispatchInstances = d(n._dispatchInstances, e))
    }

    function L(e) {
        e && e.dispatchConfig.registrationName && x(e._targetInst, null, e)
    }

    function P(e) {
        f(e, E)
    }

    function O(e, t, n, r) {
        if (n && r) e: {
            for (var o = n, i = r, a = 0, s = o; s; s = k(s)) a++;s = 0;
            for (var l = i; l; l = k(l)) s++;
            for (; a - s > 0;) o = k(o),
            a--;
            for (; s - a > 0;) i = k(i),
            s--;
            for (; a--;) {
                if (o === i || o === i.alternate) break e;
                o = k(o), i = k(i)
            }
            o = null
        }
        else o = null;
        for (i = o, o = []; n && n !== i && (a = n.alternate, null === a || a !== i);) o.push(n), n = k(n);
        for (n = []; r && r !== i && (a = r.alternate, null === a || a !== i);) n.push(r), r = k(r);
        for (r = 0; r < o.length; r++) x(o[r], "bubbled", e);
        for (e = n.length; 0 < e--;) x(n[e], "captured", t)
    }

    function N(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n
    }

    function R(e) {
        if (lo[e]) return lo[e];
        if (!so[e]) return e;
        var t, n = so[e];
        for (t in n)
            if (n.hasOwnProperty(t) && t in uo) return lo[e] = n[t];
        return e
    }

    function I() {
        return !yo && Ar.canUseDOM && (yo = "textContent" in document.documentElement ? "textContent" : "innerText"), yo
    }

    function F() {
        if (vo._fallbackText) return vo._fallbackText;
        var e, t, n = vo._startText,
            r = n.length,
            o = A(),
            i = o.length;
        for (e = 0; r > e && n[e] === o[e]; e++);
        var a = r - e;
        for (t = 1; a >= t && n[r - t] === o[i - t]; t++);
        return vo._fallbackText = o.slice(e, t > 1 ? 1 - t : void 0), vo._fallbackText
    }

    function A() {
        return "value" in vo._root ? vo._root.value : vo._root[I()]
    }

    function D(e, t, n, r) {
        this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface;
        for (var o in e) e.hasOwnProperty(o) && ((t = e[o]) ? this[o] = t(n) : "target" === o ? this.target = r : this[o] = n[o]);
        return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? jr.thatReturnsTrue : jr.thatReturnsFalse, this.isPropagationStopped = jr.thatReturnsFalse, this
    }

    function j(e, t, n, r) {
        if (this.eventPool.length) {
            var o = this.eventPool.pop();
            return this.call(o, e, t, n, r), o
        }
        return new this(e, t, n, r)
    }

    function B(e) {
        e instanceof this ? void 0 : r("223"), e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e)
    }

    function M(e) {
        e.eventPool = [], e.getPooled = j, e.release = B
    }

    function U(e, t) {
        switch (e) {
            case "keyup":
                return -1 !== ko.indexOf(t.keyCode);
            case "keydown":
                return 229 !== t.keyCode;
            case "keypress":
            case "mousedown":
            case "blur":
                return !0;
            default:
                return !1
        }
    }

    function H(e) {
        return e = e.detail, "object" == typeof e && "data" in e ? e.data : null
    }

    function z(e, t) {
        switch (e) {
            case "compositionend":
                return H(t);
            case "keypress":
                return 32 !== t.which ? null : (Po = !0, xo);
            case "textInput":
                return e = t.data, e === xo && Po ? null : e;
            default:
                return null
        }
    }

    function W(e, t) {
        if (Oo) return "compositionend" === e || !So && U(e, t) ? (e = F(), vo._root = null, vo._startText = null, vo._fallbackText = null, Oo = !1, e) : null;
        switch (e) {
            case "paste":
                return null;
            case "keypress":
                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                    if (t["char"] && 1 < t["char"].length) return t["char"];
                    if (t.which) return String.fromCharCode(t.which)
                }
                return null;
            case "compositionend":
                return To ? null : t.data;
            default:
                return null
        }
    }

    function V(e) {
        if (e = Gr(e)) {
            Ro && "function" == typeof Ro.restoreControlledState ? void 0 : r("194");
            var t = Xr(e.stateNode);
            Ro.restoreControlledState(e.stateNode, e.type, t)
        }
    }

    function K(e) {
        Fo ? Ao ? Ao.push(e) : Ao = [e] : Fo = e
    }

    function Y() {
        return null !== Fo || null !== Ao
    }

    function $() {
        if (Fo) {
            var e = Fo,
                t = Ao;
            if (Ao = Fo = null, V(e), t)
                for (e = 0; e < t.length; e++) V(t[e])
        }
    }

    function q(e, t) {
        return e(t)
    }

    function Q(e, t, n) {
        return e(t, n)
    }

    function X() {}

    function G(e, t) {
        if (jo) return e(t);
        jo = !0;
        try {
            return q(e, t)
        } finally {
            jo = !1, Y() && (X(), $())
        }
    }

    function Z(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return "input" === t ? !!Bo[e.type] : "textarea" === t ? !0 : !1
    }

    function J(e) {
        return e = e.target || window, e.correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
    }

    function ee(e, t) {
        return Ar.canUseDOM && (!t || "addEventListener" in document) ? (e = "on" + e, t = e in document, t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = "function" == typeof t[e]), t) : !1
    }

    function te(e) {
        var t = e.type;
        return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
    }

    function ne(e) {
        var t = te(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
        if (!e.hasOwnProperty(t) && "undefined" != typeof n && "function" == typeof n.get && "function" == typeof n.set) {
            var o = n.get,
                i = n.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return o.call(this)
                },
                set: function(e) {
                    r = "" + e, i.call(this, e)
                }
            }), Object.defineProperty(e, t, {
                enumerable: n.enumerable
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
            }
        }
    }

    function re(e) {
        e._valueTracker || (e._valueTracker = ne(e))
    }

    function oe(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
            r = "";
        return e && (r = te(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
    }

    function ie(e) {
        return null === e || "undefined" == typeof e ? null : (e = Go && e[Go] || e["@@iterator"], "function" == typeof e ? e : null)
    }

    function ae(e) {
        var t = e.type;
        if ("function" == typeof t) return t.displayName || t.name;
        if ("string" == typeof t) return t;
        switch (t) {
            case qo:
                return "AsyncMode";
            case $o:
                return "Context.Consumer";
            case Wo:
                return "ReactFragment";
            case zo:
                return "ReactPortal";
            case Ko:
                return "Profiler(" + e.pendingProps.id + ")";
            case Yo:
                return "Context.Provider";
            case Vo:
                return "StrictMode";
            case Xo:
                return "Timeout"
        }
        if ("object" == typeof t && null !== t) switch (t.$$typeof) {
            case Qo:
                return e = t.render.displayName || t.render.name || "", "" !== e ? "ForwardRef(" + e + ")" : "ForwardRef"
        }
        return null
    }

    function se(e) {
        var t = "";
        do {
            e: switch (e.tag) {
                case 0:
                case 1:
                case 2:
                case 5:
                    var n = e._debugOwner,
                        r = e._debugSource,
                        o = ae(e),
                        i = null;
                    n && (i = ae(n)), n = r, o = "\n    in " + (o || "Unknown") + (n ? " (at " + n.fileName.replace(/^.*[\\\/]/, "") + ":" + n.lineNumber + ")" : i ? " (created by " + i + ")" : "");
                    break e;
                default:
                    o = ""
            }
            t += o,
            e = e["return"]
        } while (e);
        return t
    }

    function le(e) {
        return ei.hasOwnProperty(e) ? !0 : Jo.hasOwnProperty(e) ? !1 : Zo.test(e) ? ei[e] = !0 : (Jo[e] = !0, !1)
    }

    function ue(e, t, n, r) {
        if (null !== n && 0 === n.type) return !1;
        switch (typeof t) {
            case "function":
            case "symbol":
                return !0;
            case "boolean":
                return r ? !1 : null !== n ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), "data-" !== e && "aria-" !== e);
            default:
                return !1
        }
    }

    function ce(e, t, n, r) {
        if (null === t || "undefined" == typeof t || ue(e, t, n, r)) return !0;
        if (r) return !1;
        if (null !== n) switch (n.type) {
            case 3:
                return !t;
            case 4:
                return !1 === t;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t
        }
        return !1
    }

    function de(e, t, n, r, o) {
        this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t
    }

    function fe(e) {
        return e[1].toUpperCase()
    }

    function pe(e, t, n, r) {
        var o = ti.hasOwnProperty(t) ? ti[t] : null,
            i = null !== o ? 0 === o.type : r ? !1 : !(2 < t.length) || "o" !== t[0] && "O" !== t[0] || "n" !== t[1] && "N" !== t[1] ? !1 : !0;
        i || (ce(t, n, o, r) && (n = null), r || null === o ? le(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = null === n ? 3 === o.type ? !1 : "" : n : (t = o.attributeName, r = o.attributeNamespace, null === n ? e.removeAttribute(t) : (o = o.type, n = 3 === o || 4 === o && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
    }

    function he(e, t) {
        var n = t.checked;
        return Dr({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked
        })
    }

    function me(e, t) {
        var n = null == t.defaultValue ? "" : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
        n = we(null != t.value ? t.value : n), e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
        }
    }

    function ye(e, t) {
        t = t.checked, null != t && pe(e, "checked", t, !1)
    }

    function ve(e, t) {
        ye(e, t);
        var n = we(t.value);
        null != n && ("number" === t.type ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n)), t.hasOwnProperty("value") ? _e(e, t.type, n) : t.hasOwnProperty("defaultValue") && _e(e, t.type, we(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
    }

    function ge(e, t) {
        (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) && ("" === e.value && (e.value = "" + e._wrapperState.initialValue), e.defaultValue = "" + e._wrapperState.initialValue), t = e.name, "" !== t && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !e.defaultChecked, "" !== t && (e.name = t)
    }

    function _e(e, t, n) {
        ("number" !== t || e.ownerDocument.activeElement !== e) && (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
    }

    function we(e) {
        switch (typeof e) {
            case "boolean":
            case "number":
            case "object":
            case "string":
            case "undefined":
                return e;
            default:
                return ""
        }
    }

    function be(e, t, n) {
        return e = D.getPooled(ri.change, e, t, n), e.type = "change", K(n), P(e), e
    }

    function ke(e) {
        v(e, !1)
    }

    function Se(e) {
        var t = w(e);
        return oe(t) ? e : void 0
    }

    function Ce(e, t) {
        return "change" === e ? t : void 0
    }

    function Ee() {
        oi && (oi.detachEvent("onpropertychange", Te), ii = oi = null)
    }

    function Te(e) {
        "value" === e.propertyName && Se(ii) && (e = be(ii, e, J(e)), G(ke, e))
    }

    function xe(e, t, n) {
        "focus" === e ? (Ee(), oi = t, ii = n, oi.attachEvent("onpropertychange", Te)) : "blur" === e && Ee()
    }

    function Le(e) {
        return "selectionchange" === e || "keyup" === e || "keydown" === e ? Se(ii) : void 0
    }

    function Pe(e, t) {
        return "click" === e ? Se(t) : void 0
    }

    function Oe(e, t) {
        return "input" === e || "change" === e ? Se(t) : void 0
    }

    function Ne(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = ui[e]) ? !!t[e] : !1
    }

    function Re() {
        return Ne
    }

    function Ie(e) {
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

    function Fe(e) {
        2 !== Ie(e) ? r("188") : void 0
    }

    function Ae(e) {
        var t = e.alternate;
        if (!t) return t = Ie(e), 3 === t ? r("188") : void 0, 1 === t ? null : e;
        for (var n = e, o = t;;) {
            var i = n["return"],
                a = i ? i.alternate : null;
            if (!i || !a) break;
            if (i.child === a.child) {
                for (var s = i.child; s;) {
                    if (s === n) return Fe(i), e;
                    if (s === o) return Fe(i), t;
                    s = s.sibling
                }
                r("188")
            }
            if (n["return"] !== o["return"]) n = i, o = a;
            else {
                s = !1;
                for (var l = i.child; l;) {
                    if (l === n) {
                        s = !0, n = i, o = a;
                        break
                    }
                    if (l === o) {
                        s = !0, o = i, n = a;
                        break
                    }
                    l = l.sibling
                }
                if (!s) {
                    for (l = a.child; l;) {
                        if (l === n) {
                            s = !0, n = a, o = i;
                            break
                        }
                        if (l === o) {
                            s = !0, o = a, n = i;
                            break
                        }
                        l = l.sibling
                    }
                    s ? void 0 : r("189")
                }
            }
            n.alternate !== o ? r("190") : void 0
        }
        return 3 !== n.tag ? r("188") : void 0, n.stateNode.current === n ? e : t
    }

    function De(e) {
        if (e = Ae(e), !e) return null;
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

    function je(e) {
        if (e = Ae(e), !e) return null;
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

    function Be(e) {
        var t = e.keyCode;
        return "charCode" in e ? (e = e.charCode, 0 === e && 13 === t && (e = 13)) : e = t, 10 === e && (e = 13), e >= 32 || 13 === e ? e : 0
    }

    function Me(e, t) {
        var n = e[0];
        e = e[1];
        var r = "on" + (e[0].toUpperCase() + e.slice(1));
        t = {
            phasedRegistrationNames: {
                bubbled: r,
                captured: r + "Capture"
            },
            dependencies: [n],
            isInteractive: t
        }, Ei[e] = t, Ti[n] = t
    }

    function Ue(e) {
        var t = e.targetInst;
        do {
            if (!t) {
                e.ancestors.push(t);
                break
            }
            var n;
            for (n = t; n["return"];) n = n["return"];
            if (n = 3 !== n.tag ? null : n.stateNode.containerInfo, !n) break;
            e.ancestors.push(t), t = _(n)
        } while (t);
        for (n = 0; n < e.ancestors.length; n++) t = e.ancestors[n], g(e.topLevelType, t, e.nativeEvent, J(e.nativeEvent))
    }

    function He(e) {
        Oi = !!e
    }

    function ze(e, t) {
        if (!t) return null;
        var n = (Li(e) ? Ve : Ke).bind(null, e);
        t.addEventListener(e, n, !1)
    }

    function We(e, t) {
        if (!t) return null;
        var n = (Li(e) ? Ve : Ke).bind(null, e);
        t.addEventListener(e, n, !0)
    }

    function Ve(e, t) {
        Q(Ke, e, t)
    }

    function Ke(e, t) {
        if (Oi) {
            var n = J(t);
            if (n = _(n), null === n || "number" != typeof n.tag || 2 === Ie(n) || (n = null), Pi.length) {
                var r = Pi.pop();
                r.topLevelType = e, r.nativeEvent = t, r.targetInst = n, e = r
            } else e = {
                topLevelType: e,
                nativeEvent: t,
                targetInst: n,
                ancestors: []
            };
            try {
                G(Ue, e)
            } finally {
                e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, 10 > Pi.length && Pi.push(e)
            }
        }
    }

    function Ye(e) {
        return Object.prototype.hasOwnProperty.call(e, Fi) || (e[Fi] = Ii++, Ri[e[Fi]] = {}), Ri[e[Fi]]
    }

    function $e(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function qe(e, t) {
        var n = $e(e);
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
            n = $e(n)
        }
    }

    function Qe(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && ("input" === t && "text" === e.type || "textarea" === t || "true" === e.contentEditable)
    }

    function Xe(e, t) {
        if (Ui || null == ji || ji !== Br()) return null;
        var n = ji;
        return "selectionStart" in n && Qe(n) ? n = {
            start: n.selectionStart,
            end: n.selectionEnd
        } : window.getSelection ? (n = window.getSelection(), n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset
        }) : n = void 0, Mi && Mr(Mi, n) ? null : (Mi = n, e = D.getPooled(Di.select, Bi, e, t), e.type = "select", e.target = ji, P(e), e)
    }

    function Ge(e) {
        var t = "";
        return Fr.Children.forEach(e, function(e) {
            null == e || "string" != typeof e && "number" != typeof e || (t += e)
        }), t
    }

    function Ze(e, t) {
        return e = Dr({
            children: void 0
        }, t), (t = Ge(t.children)) && (e.children = t), e
    }

    function Je(e, t, n, r) {
        if (e = e.options, t) {
            t = {};
            for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
            for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0)
        } else {
            for (n = "" + n, t = null, o = 0; o < e.length; o++) {
                if (e[o].value === n) return e[o].selected = !0, void(r && (e[o].defaultSelected = !0));
                null !== t || e[o].disabled || (t = e[o])
            }
            null !== t && (t.selected = !0)
        }
    }

    function et(e, t) {
        var n = t.value;
        e._wrapperState = {
            initialValue: null != n ? n : t.defaultValue,
            wasMultiple: !!t.multiple
        }
    }

    function tt(e, t) {
        return null != t.dangerouslySetInnerHTML ? r("91") : void 0, Dr({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        })
    }

    function nt(e, t) {
        var n = t.value;
        null == n && (n = t.defaultValue, t = t.children, null != t && (null != n ? r("92") : void 0, Array.isArray(t) && (1 >= t.length ? void 0 : r("93"), t = t[0]), n = "" + t), null == n && (n = "")), e._wrapperState = {
            initialValue: "" + n
        }
    }

    function rt(e, t) {
        var n = t.value;
        null != n && (n = "" + n, n !== e.value && (e.value = n), null == t.defaultValue && (e.defaultValue = n)), null != t.defaultValue && (e.defaultValue = t.defaultValue)
    }

    function ot(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && (e.value = t)
    }

    function it(e) {
        switch (e) {
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml"
        }
    }

    function at(e, t) {
        return null == e || "http://www.w3.org/1999/xhtml" === e ? it(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
    }

    function st(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
        }
        e.textContent = t
    }

    function lt(e, t) {
        e = e.style;
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                var r = 0 === n.indexOf("--"),
                    o = n,
                    i = t[n];
                o = null == i || "boolean" == typeof i || "" === i ? "" : r || "number" != typeof i || 0 === i || ua.hasOwnProperty(o) && ua[o] ? ("" + i).trim() : i + "px", "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
            }
    }

    function ut(e, t, n) {
        t && (da[e] && (null != t.children || null != t.dangerouslySetInnerHTML ? r("137", e, n()) : void 0), null != t.dangerouslySetInnerHTML && (null != t.children ? r("60") : void 0, "object" == typeof t.dangerouslySetInnerHTML && "__html" in t.dangerouslySetInnerHTML ? void 0 : r("61")), null != t.style && "object" != typeof t.style ? r("62", n()) : void 0)
    }

    function ct(e, t) {
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

    function dt(e, t) {
        e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument;
        var n = Ye(e);
        t = qr[t];
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            if (!n.hasOwnProperty(o) || !n[o]) {
                switch (o) {
                    case "scroll":
                        We("scroll", e);
                        break;
                    case "focus":
                    case "blur":
                        We("focus", e), We("blur", e), n.blur = !0, n.focus = !0;
                        break;
                    case "cancel":
                    case "close":
                        ee(o, !0) && We(o, e);
                        break;
                    case "invalid":
                    case "submit":
                    case "reset":
                        break;
                    default:
                        -1 === mo.indexOf(o) && ze(o, e)
                }
                n[o] = !0
            }
        }
    }

    function ft(e, t, n, r) {
        return n = 9 === n.nodeType ? n : n.ownerDocument, r === aa.html && (r = it(e)), r === aa.html ? "script" === e ? (e = n.createElement("div"), e.innerHTML = "<script></script>", e = e.removeChild(e.firstChild)) : e = "string" == typeof t.is ? n.createElement(e, {
            is: t.is
        }) : n.createElement(e) : e = n.createElementNS(r, e), e
    }

    function pt(e, t) {
        return (9 === t.nodeType ? t : t.ownerDocument).createTextNode(e)
    }

    function ht(e, t, n, r) {
        var o = ct(t, n);
        switch (t) {
            case "iframe":
            case "object":
                ze("load", e);
                var i = n;
                break;
            case "video":
            case "audio":
                for (i = 0; i < mo.length; i++) ze(mo[i], e);
                i = n;
                break;
            case "source":
                ze("error", e), i = n;
                break;
            case "img":
            case "image":
            case "link":
                ze("error", e), ze("load", e), i = n;
                break;
            case "form":
                ze("reset", e), ze("submit", e), i = n;
                break;
            case "details":
                ze("toggle", e), i = n;
                break;
            case "input":
                me(e, n), i = he(e, n), ze("invalid", e), dt(r, "onChange");
                break;
            case "option":
                i = Ze(e, n);
                break;
            case "select":
                et(e, n), i = Dr({}, n, {
                    value: void 0
                }), ze("invalid", e), dt(r, "onChange");
                break;
            case "textarea":
                nt(e, n), i = tt(e, n), ze("invalid", e), dt(r, "onChange");
                break;
            default:
                i = n
        }
        ut(t, i, fa);
        var a, s = i;
        for (a in s)
            if (s.hasOwnProperty(a)) {
                var l = s[a];
                "style" === a ? lt(e, l, fa) : "dangerouslySetInnerHTML" === a ? (l = l ? l.__html : void 0, null != l && la(e, l)) : "children" === a ? "string" == typeof l ? ("textarea" !== t || "" !== l) && st(e, l) : "number" == typeof l && st(e, "" + l) : "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && "autoFocus" !== a && ($r.hasOwnProperty(a) ? null != l && dt(r, a) : null != l && pe(e, a, l, o))
            }
        switch (t) {
            case "input":
                re(e), ge(e, n);
                break;
            case "textarea":
                re(e), ot(e, n);
                break;
            case "option":
                null != n.value && e.setAttribute("value", n.value);
                break;
            case "select":
                e.multiple = !!n.multiple, t = n.value, null != t ? Je(e, !!n.multiple, t, !1) : null != n.defaultValue && Je(e, !!n.multiple, n.defaultValue, !0);
                break;
            default:
                "function" == typeof i.onClick && (e.onclick = jr)
        }
    }

    function mt(e, t, n, r, o) {
        var i = null;
        switch (t) {
            case "input":
                n = he(e, n), r = he(e, r), i = [];
                break;
            case "option":
                n = Ze(e, n), r = Ze(e, r), i = [];
                break;
            case "select":
                n = Dr({}, n, {
                    value: void 0
                }), r = Dr({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                n = tt(e, n), r = tt(e, r), i = [];
                break;
            default:
                "function" != typeof n.onClick && "function" == typeof r.onClick && (e.onclick = jr)
        }
        ut(t, r, fa), t = e = void 0;
        var a = null;
        for (e in n)
            if (!r.hasOwnProperty(e) && n.hasOwnProperty(e) && null != n[e])
                if ("style" === e) {
                    var s = n[e];
                    for (t in s) s.hasOwnProperty(t) && (a || (a = {}), a[t] = "")
                } else "dangerouslySetInnerHTML" !== e && "children" !== e && "suppressContentEditableWarning" !== e && "suppressHydrationWarning" !== e && "autoFocus" !== e && ($r.hasOwnProperty(e) ? i || (i = []) : (i = i || []).push(e, null));
        for (e in r) {
            var l = r[e];
            if (s = null != n ? n[e] : void 0, r.hasOwnProperty(e) && l !== s && (null != l || null != s))
                if ("style" === e)
                    if (s) {
                        for (t in s) !s.hasOwnProperty(t) || l && l.hasOwnProperty(t) || (a || (a = {}), a[t] = "");
                        for (t in l) l.hasOwnProperty(t) && s[t] !== l[t] && (a || (a = {}), a[t] = l[t])
                    } else a || (i || (i = []), i.push(e, a)), a = l;
            else "dangerouslySetInnerHTML" === e ? (l = l ? l.__html : void 0, s = s ? s.__html : void 0, null != l && s !== l && (i = i || []).push(e, "" + l)) : "children" === e ? s === l || "string" != typeof l && "number" != typeof l || (i = i || []).push(e, "" + l) : "suppressContentEditableWarning" !== e && "suppressHydrationWarning" !== e && ($r.hasOwnProperty(e) ? (null != l && dt(o, e), i || s === l || (i = [])) : (i = i || []).push(e, l))
        }
        return a && (i = i || []).push("style", a), i
    }

    function yt(e, t, n, r, o) {
        "input" === n && "radio" === o.type && null != o.name && ye(e, o), ct(n, r), r = ct(n, o);
        for (var i = 0; i < t.length; i += 2) {
            var a = t[i],
                s = t[i + 1];
            "style" === a ? lt(e, s, fa) : "dangerouslySetInnerHTML" === a ? la(e, s) : "children" === a ? st(e, s) : pe(e, a, s, r)
        }
        switch (n) {
            case "input":
                ve(e, o);
                break;
            case "textarea":
                rt(e, o);
                break;
            case "select":
                e._wrapperState.initialValue = void 0, t = e._wrapperState.wasMultiple, e._wrapperState.wasMultiple = !!o.multiple, n = o.value, null != n ? Je(e, !!o.multiple, n, !1) : t !== !!o.multiple && (null != o.defaultValue ? Je(e, !!o.multiple, o.defaultValue, !0) : Je(e, !!o.multiple, o.multiple ? [] : "", !1))
        }
    }

    function vt(e, t, n, r, o) {
        switch (t) {
            case "iframe":
            case "object":
                ze("load", e);
                break;
            case "video":
            case "audio":
                for (r = 0; r < mo.length; r++) ze(mo[r], e);
                break;
            case "source":
                ze("error", e);
                break;
            case "img":
            case "image":
            case "link":
                ze("error", e), ze("load", e);
                break;
            case "form":
                ze("reset", e), ze("submit", e);
                break;
            case "details":
                ze("toggle", e);
                break;
            case "input":
                me(e, n), ze("invalid", e), dt(o, "onChange");
                break;
            case "select":
                et(e, n), ze("invalid", e), dt(o, "onChange");
                break;
            case "textarea":
                nt(e, n), ze("invalid", e), dt(o, "onChange")
        }
        ut(t, n, fa), r = null;
        for (var i in n)
            if (n.hasOwnProperty(i)) {
                var a = n[i];
                "children" === i ? "string" == typeof a ? e.textContent !== a && (r = ["children", a]) : "number" == typeof a && e.textContent !== "" + a && (r = ["children", "" + a]) : $r.hasOwnProperty(i) && null != a && dt(o, i)
            }
        switch (t) {
            case "input":
                re(e), ge(e, n);
                break;
            case "textarea":
                re(e), ot(e, n);
                break;
            case "select":
            case "option":
                break;
            default:
                "function" == typeof n.onClick && (e.onclick = jr)
        }
        return r
    }

    function gt(e, t) {
        return e.nodeValue !== t
    }

    function _t(e, t) {
        switch (e) {
            case "button":
            case "input":
            case "select":
            case "textarea":
                return !!t.autoFocus
        }
        return !1
    }

    function wt(e, t) {
        return "textarea" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && "string" == typeof t.dangerouslySetInnerHTML.__html
    }

    function bt(e) {
        for (e = e.nextSibling; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
        return e
    }

    function kt(e) {
        for (e = e.firstChild; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
        return e
    }

    function St(e) {
        return {
            current: e
        }
    }

    function Ct(e) {
        0 > wa || (e.current = _a[wa], _a[wa] = null, wa--)
    }

    function Et(e, t) {
        wa++, _a[wa] = e.current, e.current = t
    }

    function Tt(e) {
        return Lt(e) ? Sa : ba.current
    }

    function xt(e, t) {
        var n = e.type.contextTypes;
        if (!n) return Hr;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
        var o, i = {};
        for (o in n) i[o] = t[o];
        return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
    }

    function Lt(e) {
        return 2 === e.tag && null != e.type.childContextTypes
    }

    function Pt(e) {
        Lt(e) && (Ct(ka, e), Ct(ba, e))
    }

    function Ot(e) {
        Ct(ka, e), Ct(ba, e)
    }

    function Nt(e, t, n) {
        ba.current !== Hr ? r("168") : void 0, Et(ba, t, e), Et(ka, n, e)
    }

    function Rt(e, t) {
        var n = e.stateNode,
            o = e.type.childContextTypes;
        if ("function" != typeof n.getChildContext) return t;
        n = n.getChildContext();
        for (var i in n) i in o ? void 0 : r("108", ae(e) || "Unknown", i);
        return Dr({}, t, n)
    }

    function It(e) {
        if (!Lt(e)) return !1;
        var t = e.stateNode;
        return t = t && t.__reactInternalMemoizedMergedChildContext || Hr, Sa = ba.current, Et(ba, t, e), Et(ka, ka.current, e), !0
    }

    function Ft(e, t) {
        var n = e.stateNode;
        if (n ? void 0 : r("169"), t) {
            var o = Rt(e, Sa);
            n.__reactInternalMemoizedMergedChildContext = o, Ct(ka, e), Ct(ba, e), Et(ba, o, e)
        } else Ct(ka, e);
        Et(ka, t, e)
    }

    function At(e, t, n, r) {
        this.tag = e, this.key = n, this.sibling = this.child = this["return"] = this.stateNode = this.type = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.expirationTime = 0, this.alternate = null
    }

    function Dt(e, t, n) {
        var r = e.alternate;
        return null === r ? (r = new At(e.tag, t, e.key, e.mode), r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.effectTag = 0, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null), r.expirationTime = n, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r
    }

    function jt(e, t, n) {
        var o = e.type,
            i = e.key;
        if (e = e.props, "function" == typeof o) var a = o.prototype && o.prototype.isReactComponent ? 2 : 0;
        else if ("string" == typeof o) a = 5;
        else switch (o) {
            case Wo:
                return Bt(e.children, t, n, i);
            case qo:
                a = 11, t |= 3;
                break;
            case Vo:
                a = 11, t |= 2;
                break;
            case Ko:
                return o = new At(15, e, i, 4 | t), o.type = Ko, o.expirationTime = n, o;
            case Xo:
                a = 16, t |= 2;
                break;
            default:
                e: {
                    switch ("object" == typeof o && null !== o ? o.$$typeof : null) {
                        case Yo:
                            a = 13;
                            break e;
                        case $o:
                            a = 12;
                            break e;
                        case Qo:
                            a = 14;
                            break e;
                        default:
                            r("130", null == o ? o : typeof o, "")
                    }
                    a = void 0
                }
        }
        return t = new At(a, e, i, t), t.type = o, t.expirationTime = n, t
    }

    function Bt(e, t, n, r) {
        return e = new At(10, e, r, t), e.expirationTime = n, e
    }

    function Mt(e, t, n) {
        return e = new At(6, e, null, t), e.expirationTime = n, e
    }

    function Ut(e, t, n) {
        return t = new At(4, null !== e.children ? e.children : [], e.key, t), t.expirationTime = n, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }

    function Ht(e, t, n) {
        return t = new At(3, null, null, t ? 3 : 0), e = {
            current: t,
            containerInfo: e,
            pendingChildren: null,
            earliestPendingTime: 0,
            latestPendingTime: 0,
            earliestSuspendedTime: 0,
            latestSuspendedTime: 0,
            latestPingedTime: 0,
            pendingCommitExpirationTime: 0,
            finishedWork: null,
            context: null,
            pendingContext: null,
            hydrate: n,
            remainingExpirationTime: 0,
            firstBatch: null,
            nextScheduledRoot: null
        }, t.stateNode = e
    }

    function zt(e) {
        return function(t) {
            try {
                return e(t)
            } catch (n) {}
        }
    }

    function Wt(e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
            var n = t.inject(e);
            Ca = zt(function(e) {
                return t.onCommitFiberRoot(n, e)
            }), Ea = zt(function(e) {
                return t.onCommitFiberUnmount(n, e)
            })
        } catch (r) {}
        return !0
    }

    function Vt(e) {
        "function" == typeof Ca && Ca(e)
    }

    function Kt(e) {
        "function" == typeof Ea && Ea(e)
    }

    function Yt(e) {
        return {
            expirationTime: 0,
            baseState: e,
            firstUpdate: null,
            lastUpdate: null,
            firstCapturedUpdate: null,
            lastCapturedUpdate: null,
            firstEffect: null,
            lastEffect: null,
            firstCapturedEffect: null,
            lastCapturedEffect: null
        }
    }

    function $t(e) {
        return {
            expirationTime: e.expirationTime,
            baseState: e.baseState,
            firstUpdate: e.firstUpdate,
            lastUpdate: e.lastUpdate,
            firstCapturedUpdate: null,
            lastCapturedUpdate: null,
            firstEffect: null,
            lastEffect: null,
            firstCapturedEffect: null,
            lastCapturedEffect: null
        }
    }

    function qt(e) {
        return {
            expirationTime: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
            nextEffect: null
        }
    }

    function Qt(e, t, n) {
        null === e.lastUpdate ? e.firstUpdate = e.lastUpdate = t : (e.lastUpdate.next = t, e.lastUpdate = t), (0 === e.expirationTime || e.expirationTime > n) && (e.expirationTime = n)
    }

    function Xt(e, t, n) {
        var r = e.alternate;
        if (null === r) {
            var o = e.updateQueue,
                i = null;
            null === o && (o = e.updateQueue = Yt(e.memoizedState))
        } else o = e.updateQueue, i = r.updateQueue, null === o ? null === i ? (o = e.updateQueue = Yt(e.memoizedState), i = r.updateQueue = Yt(r.memoizedState)) : o = e.updateQueue = $t(i) : null === i && (i = r.updateQueue = $t(o));
        null === i || o === i ? Qt(o, t, n) : null === o.lastUpdate || null === i.lastUpdate ? (Qt(o, t, n), Qt(i, t, n)) : (Qt(o, t, n), i.lastUpdate = t)
    }

    function Gt(e, t, n) {
        var r = e.updateQueue;
        r = null === r ? e.updateQueue = Yt(e.memoizedState) : Zt(e, r), null === r.lastCapturedUpdate ? r.firstCapturedUpdate = r.lastCapturedUpdate = t : (r.lastCapturedUpdate.next = t, r.lastCapturedUpdate = t), (0 === r.expirationTime || r.expirationTime > n) && (r.expirationTime = n)
    }

    function Zt(e, t) {
        var n = e.alternate;
        return null !== n && t === n.updateQueue && (t = e.updateQueue = $t(t)), t
    }

    function Jt(e, t, n, r, o, i) {
        switch (n.tag) {
            case 1:
                return e = n.payload, "function" == typeof e ? e.call(i, r, o) : e;
            case 3:
                e.effectTag = -1025 & e.effectTag | 64;
            case 0:
                if (e = n.payload, o = "function" == typeof e ? e.call(i, r, o) : e, null === o || void 0 === o) break;
                return Dr({}, r, o);
            case 2:
                Ta = !0
        }
        return r
    }

    function en(e, t, n, r, o) {
        if (Ta = !1, !(0 === t.expirationTime || t.expirationTime > o)) {
            t = Zt(e, t);
            for (var i = t.baseState, a = null, s = 0, l = t.firstUpdate, u = i; null !== l;) {
                var c = l.expirationTime;
                c > o ? (null === a && (a = l, i = u), (0 === s || s > c) && (s = c)) : (u = Jt(e, t, l, u, n, r), null !== l.callback && (e.effectTag |= 32, l.nextEffect = null, null === t.lastEffect ? t.firstEffect = t.lastEffect = l : (t.lastEffect.nextEffect = l, t.lastEffect = l))), l = l.next
            }
            for (c = null, l = t.firstCapturedUpdate; null !== l;) {
                var d = l.expirationTime;
                d > o ? (null === c && (c = l, null === a && (i = u)), (0 === s || s > d) && (s = d)) : (u = Jt(e, t, l, u, n, r), null !== l.callback && (e.effectTag |= 32, l.nextEffect = null, null === t.lastCapturedEffect ? t.firstCapturedEffect = t.lastCapturedEffect = l : (t.lastCapturedEffect.nextEffect = l, t.lastCapturedEffect = l))), l = l.next
            }
            null === a && (t.lastUpdate = null), null === c ? t.lastCapturedUpdate = null : e.effectTag |= 32, null === a && null === c && (i = u), t.baseState = i, t.firstUpdate = a, t.firstCapturedUpdate = c, t.expirationTime = s, e.memoizedState = u
        }
    }

    function tn(e, t) {
        "function" != typeof e ? r("191", e) : void 0, e.call(t)
    }

    function nn(e, t, n) {
        for (null !== t.firstCapturedUpdate && (null !== t.lastUpdate && (t.lastUpdate.next = t.firstCapturedUpdate, t.lastUpdate = t.lastCapturedUpdate), t.firstCapturedUpdate = t.lastCapturedUpdate = null), e = t.firstEffect, t.firstEffect = t.lastEffect = null; null !== e;) {
            var r = e.callback;
            null !== r && (e.callback = null, tn(r, n)), e = e.nextEffect
        }
        for (e = t.firstCapturedEffect, t.firstCapturedEffect = t.lastCapturedEffect = null; null !== e;) t = e.callback, null !== t && (e.callback = null, tn(t, n)), e = e.nextEffect
    }

    function rn(e, t) {
        return {
            value: e,
            source: t,
            stack: se(t)
        }
    }

    function on(e) {
        var t = e.type._context;
        Et(Pa, t._changedBits, e), Et(La, t._currentValue, e), Et(xa, e, e), t._currentValue = e.pendingProps.value, t._changedBits = e.stateNode
    }

    function an(e) {
        var t = Pa.current,
            n = La.current;
        Ct(xa, e), Ct(La, e), Ct(Pa, e), e = e.type._context, e._currentValue = n, e._changedBits = t
    }

    function sn(e) {
        return e === Oa ? r("174") : void 0, e
    }

    function ln(e, t) {
        Et(Ia, t, e), Et(Ra, e, e), Et(Na, Oa, e);
        var n = t.nodeType;
        switch (n) {
            case 9:
            case 11:
                t = (t = t.documentElement) ? t.namespaceURI : at(null, "");
                break;
            default:
                n = 8 === n ? t.parentNode : t, t = n.namespaceURI || null, n = n.tagName, t = at(t, n)
        }
        Ct(Na, e), Et(Na, t, e)
    }

    function un(e) {
        Ct(Na, e), Ct(Ra, e), Ct(Ia, e)
    }

    function cn(e) {
        Ra.current === e && (Ct(Na, e), Ct(Ra, e))
    }

    function dn(e, t, n) {
        var r = e.memoizedState;
        t = t(n, r), r = null === t || void 0 === t ? r : Dr({}, r, t), e.memoizedState = r, e = e.updateQueue, null !== e && 0 === e.expirationTime && (e.baseState = r)
    }

    function fn(e, t, n, r, o, i) {
        var a = e.stateNode;
        return e = e.type, "function" == typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(n, o, i) : e.prototype && e.prototype.isPureReactComponent ? !Mr(t, n) || !Mr(r, o) : !0
    }

    function pn(e, t, n, r) {
        e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Fa.enqueueReplaceState(t, t.state, null)
    }

    function hn(e, t) {
        var n = e.type,
            r = e.stateNode,
            o = e.pendingProps,
            i = Tt(e);
        r.props = o, r.state = e.memoizedState, r.refs = Hr, r.context = xt(e, i), i = e.updateQueue, null !== i && (en(e, i, o, r, t), r.state = e.memoizedState), i = e.type.getDerivedStateFromProps, "function" == typeof i && (dn(e, i, o), r.state = e.memoizedState), "function" == typeof n.getDerivedStateFromProps || "function" == typeof r.getSnapshotBeforeUpdate || "function" != typeof r.UNSAFE_componentWillMount && "function" != typeof r.componentWillMount || (n = r.state, "function" == typeof r.componentWillMount && r.componentWillMount(), "function" == typeof r.UNSAFE_componentWillMount && r.UNSAFE_componentWillMount(), n !== r.state && Fa.enqueueReplaceState(r, r.state, null), i = e.updateQueue, null !== i && (en(e, i, o, r, t), r.state = e.memoizedState)), "function" == typeof r.componentDidMount && (e.effectTag |= 4)
    }

    function mn(e, t, n) {
        if (e = n.ref, null !== e && "function" != typeof e && "object" != typeof e) {
            if (n._owner) {
                n = n._owner;
                var o = void 0;
                n && (2 !== n.tag ? r("110") : void 0, o = n.stateNode), o ? void 0 : r("147", e);
                var i = "" + e;
                return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === i ? t.ref : (t = function(e) {
                    var t = o.refs === Hr ? o.refs = {} : o.refs;
                    null === e ? delete t[i] : t[i] = e
                }, t._stringRef = i, t)
            }
            "string" != typeof e ? r("148") : void 0, n._owner ? void 0 : r("254", e)
        }
        return e
    }

    function yn(e, t) {
        "textarea" !== e.type && r("31", "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t, "")
    }

    function vn(e) {
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

        function o(e, t) {
            for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
            return e
        }

        function i(e, t, n) {
            return e = Dt(e, t, n), e.index = 0, e.sibling = null, e
        }

        function a(t, n, r) {
            return t.index = r, e ? (r = t.alternate, null !== r ? (r = r.index, n > r ? (t.effectTag = 2, n) : r) : (t.effectTag = 2, n)) : n
        }

        function s(t) {
            return e && null === t.alternate && (t.effectTag = 2), t
        }

        function l(e, t, n, r) {
            return null === t || 6 !== t.tag ? (t = Mt(n, e.mode, r), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
        }

        function u(e, t, n, r) {
            return null !== t && t.type === n.type ? (r = i(t, n.props, r), r.ref = mn(e, t, n), r["return"] = e, r) : (r = jt(n, e.mode, r), r.ref = mn(e, t, n), r["return"] = e, r)
        }

        function c(e, t, n, r) {
            return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Ut(n, e.mode, r), t["return"] = e, t) : (t = i(t, n.children || [], r), t["return"] = e, t)
        }

        function d(e, t, n, r, o) {
            return null === t || 10 !== t.tag ? (t = Bt(n, e.mode, r, o), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
        }

        function f(e, t, n) {
            if ("string" == typeof t || "number" == typeof t) return t = Mt("" + t, e.mode, n), t["return"] = e, t;
            if ("object" == typeof t && null !== t) {
                switch (t.$$typeof) {
                    case Ho:
                        return n = jt(t, e.mode, n), n.ref = mn(e, null, t), n["return"] = e, n;
                    case zo:
                        return t = Ut(t, e.mode, n), t["return"] = e, t
                }
                if (Aa(t) || ie(t)) return t = Bt(t, e.mode, n, null), t["return"] = e, t;
                yn(e, t)
            }
            return null
        }

        function p(e, t, n, r) {
            var o = null !== t ? t.key : null;
            if ("string" == typeof n || "number" == typeof n) return null !== o ? null : l(e, t, "" + n, r);
            if ("object" == typeof n && null !== n) {
                switch (n.$$typeof) {
                    case Ho:
                        return n.key === o ? n.type === Wo ? d(e, t, n.props.children, r, o) : u(e, t, n, r) : null;
                    case zo:
                        return n.key === o ? c(e, t, n, r) : null
                }
                if (Aa(n) || ie(n)) return null !== o ? null : d(e, t, n, r, null);
                yn(e, n)
            }
            return null
        }

        function h(e, t, n, r, o) {
            if ("string" == typeof r || "number" == typeof r) return e = e.get(n) || null, l(t, e, "" + r, o);
            if ("object" == typeof r && null !== r) {
                switch (r.$$typeof) {
                    case Ho:
                        return e = e.get(null === r.key ? n : r.key) || null, r.type === Wo ? d(t, e, r.props.children, o, r.key) : u(t, e, r, o);
                    case zo:
                        return e = e.get(null === r.key ? n : r.key) || null, c(t, e, r, o)
                }
                if (Aa(r) || ie(r)) return e = e.get(n) || null, d(t, e, r, o, null);
                yn(t, r)
            }
            return null
        }

        function m(r, i, s, l) {
            for (var u = null, c = null, d = i, m = i = 0, y = null; null !== d && m < s.length; m++) {
                d.index > m ? (y = d, d = null) : y = d.sibling;
                var v = p(r, d, s[m], l);
                if (null === v) {
                    null === d && (d = y);
                    break
                }
                e && d && null === v.alternate && t(r, d), i = a(v, i, m), null === c ? u = v : c.sibling = v, c = v, d = y
            }
            if (m === s.length) return n(r, d), u;
            if (null === d) {
                for (; m < s.length; m++)(d = f(r, s[m], l)) && (i = a(d, i, m), null === c ? u = d : c.sibling = d, c = d);
                return u
            }
            for (d = o(r, d); m < s.length; m++)(y = h(d, r, m, s[m], l)) && (e && null !== y.alternate && d["delete"](null === y.key ? m : y.key), i = a(y, i, m), null === c ? u = y : c.sibling = y, c = y);
            return e && d.forEach(function(e) {
                return t(r, e)
            }), u
        }

        function y(i, s, l, u) {
            var c = ie(l);
            "function" != typeof c ? r("150") : void 0, l = c.call(l), null == l ? r("151") : void 0;
            for (var d = c = null, m = s, y = s = 0, v = null, g = l.next(); null !== m && !g.done; y++, g = l.next()) {
                m.index > y ? (v = m, m = null) : v = m.sibling;
                var _ = p(i, m, g.value, u);
                if (null === _) {
                    m || (m = v);
                    break
                }
                e && m && null === _.alternate && t(i, m), s = a(_, s, y), null === d ? c = _ : d.sibling = _, d = _, m = v
            }
            if (g.done) return n(i, m), c;
            if (null === m) {
                for (; !g.done; y++, g = l.next()) g = f(i, g.value, u), null !== g && (s = a(g, s, y), null === d ? c = g : d.sibling = g, d = g);
                return c
            }
            for (m = o(i, m); !g.done; y++, g = l.next()) g = h(m, i, y, g.value, u), null !== g && (e && null !== g.alternate && m["delete"](null === g.key ? y : g.key), s = a(g, s, y), null === d ? c = g : d.sibling = g, d = g);
            return e && m.forEach(function(e) {
                return t(i, e)
            }), c
        }
        return function(e, o, a, l) {
            "object" == typeof a && null !== a && a.type === Wo && null === a.key && (a = a.props.children);
            var u = "object" == typeof a && null !== a;
            if (u) switch (a.$$typeof) {
                case Ho:
                    e: {
                        var c = a.key;
                        for (u = o; null !== u;) {
                            if (u.key === c) {
                                if (10 === u.tag ? a.type === Wo : u.type === a.type) {
                                    n(e, u.sibling), o = i(u, a.type === Wo ? a.props.children : a.props, l), o.ref = mn(e, u, a), o["return"] = e, e = o;
                                    break e
                                }
                                n(e, u);
                                break
                            }
                            t(e, u), u = u.sibling
                        }
                        a.type === Wo ? (o = Bt(a.props.children, e.mode, l, a.key), o["return"] = e, e = o) : (l = jt(a, e.mode, l), l.ref = mn(e, o, a), l["return"] = e, e = l)
                    }
                    return s(e);
                case zo:
                    e: {
                        for (u = a.key; null !== o;) {
                            if (o.key === u) {
                                if (4 === o.tag && o.stateNode.containerInfo === a.containerInfo && o.stateNode.implementation === a.implementation) {
                                    n(e, o.sibling), o = i(o, a.children || [], l), o["return"] = e, e = o;
                                    break e
                                }
                                n(e, o);
                                break
                            }
                            t(e, o), o = o.sibling
                        }
                        o = Ut(a, e.mode, l),
                        o["return"] = e,
                        e = o
                    }
                    return s(e)
            }
            if ("string" == typeof a || "number" == typeof a) return a = "" + a, null !== o && 6 === o.tag ? (n(e, o.sibling), o = i(o, a, l), o["return"] = e, e = o) : (n(e, o), o = Mt(a, e.mode, l), o["return"] = e, e = o), s(e);
            if (Aa(a)) return m(e, o, a, l);
            if (ie(a)) return y(e, o, a, l);
            if (u && yn(e, a), "undefined" == typeof a) switch (e.tag) {
                case 2:
                case 1:
                    l = e.type, r("152", l.displayName || l.name || "Component")
            }
            return n(e, o)
        }
    }

    function gn(e, t) {
        var n = new At(5, null, null, 0);
        n.type = "DELETED", n.stateNode = t, n["return"] = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n
    }

    function _n(e, t) {
        switch (e.tag) {
            case 5:
                var n = e.type;
                return t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, null !== t ? (e.stateNode = t, !0) : !1;
            case 6:
                return t = "" === e.pendingProps || 3 !== t.nodeType ? null : t, null !== t ? (e.stateNode = t, !0) : !1;
            default:
                return !1
        }
    }

    function wn(e) {
        if (Ua) {
            var t = Ma;
            if (t) {
                var n = t;
                if (!_n(e, t)) {
                    if (t = bt(n), !t || !_n(e, t)) return e.effectTag |= 2, Ua = !1, void(Ba = e);
                    gn(Ba, n)
                }
                Ba = e, Ma = kt(t)
            } else e.effectTag |= 2, Ua = !1, Ba = e
        }
    }

    function bn(e) {
        for (e = e["return"]; null !== e && 5 !== e.tag && 3 !== e.tag;) e = e["return"];
        Ba = e
    }

    function kn(e) {
        if (e !== Ba) return !1;
        if (!Ua) return bn(e), Ua = !0, !1;
        var t = e.type;
        if (5 !== e.tag || "head" !== t && "body" !== t && !wt(t, e.memoizedProps))
            for (t = Ma; t;) gn(e, t), t = bt(t);
        return bn(e), Ma = Ba ? bt(e.stateNode) : null, !0
    }

    function Sn() {
        Ma = Ba = null, Ua = !1
    }

    function Cn(e, t, n) {
        En(e, t, n, t.expirationTime)
    }

    function En(e, t, n, r) {
        t.child = null === e ? ja(t, null, n, r) : Da(t, e.child, n, r)
    }

    function Tn(e, t) {
        var n = t.ref;
        (null === e && null !== n || null !== e && e.ref !== n) && (t.effectTag |= 128)
    }

    function xn(e, t, n, r, o) {
        Tn(e, t);
        var i = 0 !== (64 & t.effectTag);
        if (!n && !i) return r && Ft(t, !1), Nn(e, t);
        n = t.stateNode, Mo.current = t;
        var a = i ? null : n.render();
        return t.effectTag |= 1, i && (En(e, t, null, o), t.child = null), En(e, t, a, o), t.memoizedState = n.state, t.memoizedProps = n.props, r && Ft(t, !0), t.child
    }

    function Ln(e) {
        var t = e.stateNode;
        t.pendingContext ? Nt(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Nt(e, t.context, !1), ln(e, t.containerInfo)
    }

    function Pn(e, t, n, r) {
        var o = e.child;
        for (null !== o && (o["return"] = e); null !== o;) {
            switch (o.tag) {
                case 12:
                    var i = 0 | o.stateNode;
                    if (o.type === t && 0 !== (i & n)) {
                        for (i = o; null !== i;) {
                            var a = i.alternate;
                            if (0 === i.expirationTime || i.expirationTime > r) i.expirationTime = r, null !== a && (0 === a.expirationTime || a.expirationTime > r) && (a.expirationTime = r);
                            else {
                                if (null === a || !(0 === a.expirationTime || a.expirationTime > r)) break;
                                a.expirationTime = r
                            }
                            i = i["return"]
                        }
                        i = null
                    } else i = o.child;
                    break;
                case 13:
                    i = o.type === e.type ? null : o.child;
                    break;
                default:
                    i = o.child
            }
            if (null !== i) i["return"] = o;
            else
                for (i = o; null !== i;) {
                    if (i === e) {
                        i = null;
                        break
                    }
                    if (o = i.sibling, null !== o) {
                        o["return"] = i["return"], i = o;
                        break
                    }
                    i = i["return"]
                }
            o = i
        }
    }

    function On(e, t, n) {
        var r = t.type._context,
            o = t.pendingProps,
            i = t.memoizedProps,
            a = !0;
        if (ka.current) a = !1;
        else if (i === o) return t.stateNode = 0, on(t), Nn(e, t);
        var s = o.value;
        if (t.memoizedProps = o, null === i) s = 1073741823;
        else if (i.value === o.value) {
            if (i.children === o.children && a) return t.stateNode = 0, on(t), Nn(e, t);
            s = 0
        } else {
            var l = i.value;
            if (l === s && (0 !== l || 1 / l === 1 / s) || l !== l && s !== s) {
                if (i.children === o.children && a) return t.stateNode = 0, on(t), Nn(e, t);
                s = 0
            } else if (s = "function" == typeof r._calculateChangedBits ? r._calculateChangedBits(l, s) : 1073741823, s |= 0, 0 === s) {
                if (i.children === o.children && a) return t.stateNode = 0, on(t), Nn(e, t)
            } else Pn(t, r, s, n)
        }
        return t.stateNode = s, on(t), Cn(e, t, o.children), t.child
    }

    function Nn(e, t) {
        if (null !== e && t.child !== e.child ? r("153") : void 0, null !== t.child) {
            e = t.child;
            var n = Dt(e, e.pendingProps, e.expirationTime);
            for (t.child = n, n["return"] = t; null !== e.sibling;) e = e.sibling, n = n.sibling = Dt(e, e.pendingProps, e.expirationTime), n["return"] = t;
            n.sibling = null
        }
        return t.child
    }

    function Rn(e, t, n) {
        if (0 === t.expirationTime || t.expirationTime > n) {
            switch (t.tag) {
                case 3:
                    Ln(t);
                    break;
                case 2:
                    It(t);
                    break;
                case 4:
                    ln(t, t.stateNode.containerInfo);
                    break;
                case 13:
                    on(t)
            }
            return null
        }
        switch (t.tag) {
            case 0:
                null !== e ? r("155") : void 0;
                var o = t.type,
                    i = t.pendingProps,
                    a = Tt(t);
                return a = xt(t, a), o = o(i, a), t.effectTag |= 1, "object" == typeof o && null !== o && "function" == typeof o.render && void 0 === o.$$typeof ? (a = t.type, t.tag = 2, t.memoizedState = null !== o.state && void 0 !== o.state ? o.state : null, a = a.getDerivedStateFromProps, "function" == typeof a && dn(t, a, i), i = It(t), o.updater = Fa, t.stateNode = o, o._reactInternalFiber = t, hn(t, n), e = xn(e, t, !0, i, n)) : (t.tag = 1, Cn(e, t, o), t.memoizedProps = i, e = t.child), e;
            case 1:
                return i = t.type, n = t.pendingProps, ka.current || t.memoizedProps !== n ? (o = Tt(t), o = xt(t, o), i = i(n, o), t.effectTag |= 1, Cn(e, t, i), t.memoizedProps = n, e = t.child) : e = Nn(e, t), e;
            case 2:
                if (i = It(t), null === e)
                    if (null === t.stateNode) {
                        var s = t.pendingProps,
                            l = t.type;
                        o = Tt(t);
                        var u = 2 === t.tag && null != t.type.contextTypes;
                        a = u ? xt(t, o) : Hr, s = new l(s, a), t.memoizedState = null !== s.state && void 0 !== s.state ? s.state : null, s.updater = Fa, t.stateNode = s, s._reactInternalFiber = t, u && (u = t.stateNode, u.__reactInternalMemoizedUnmaskedChildContext = o, u.__reactInternalMemoizedMaskedChildContext = a), hn(t, n), o = !0
                    } else {
                        l = t.type, o = t.stateNode, u = t.memoizedProps, a = t.pendingProps, o.props = u;
                        var c = o.context;
                        s = Tt(t), s = xt(t, s);
                        var d = l.getDerivedStateFromProps;
                        (l = "function" == typeof d || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (u !== a || c !== s) && pn(t, o, a, s), Ta = !1;
                        var f = t.memoizedState;
                        c = o.state = f;
                        var p = t.updateQueue;
                        null !== p && (en(t, p, a, o, n), c = t.memoizedState), u !== a || f !== c || ka.current || Ta ? ("function" == typeof d && (dn(t, d, a), c = t.memoizedState), (u = Ta || fn(t, u, a, f, c, s)) ? (l || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || ("function" == typeof o.componentWillMount && o.componentWillMount(), "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), "function" == typeof o.componentDidMount && (t.effectTag |= 4)) : ("function" == typeof o.componentDidMount && (t.effectTag |= 4), t.memoizedProps = a, t.memoizedState = c), o.props = a, o.state = c, o.context = s, o = u) : ("function" == typeof o.componentDidMount && (t.effectTag |= 4), o = !1)
                    }
                else l = t.type, o = t.stateNode, a = t.memoizedProps, u = t.pendingProps, o.props = a, c = o.context, s = Tt(t), s = xt(t, s), d = l.getDerivedStateFromProps, (l = "function" == typeof d || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (a !== u || c !== s) && pn(t, o, u, s), Ta = !1, c = t.memoizedState, f = o.state = c, p = t.updateQueue, null !== p && (en(t, p, u, o, n), f = t.memoizedState), a !== u || c !== f || ka.current || Ta ? ("function" == typeof d && (dn(t, d, u), f = t.memoizedState), (d = Ta || fn(t, a, u, c, f, s)) ? (l || "function" != typeof o.UNSAFE_componentWillUpdate && "function" != typeof o.componentWillUpdate || ("function" == typeof o.componentWillUpdate && o.componentWillUpdate(u, f, s), "function" == typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(u, f, s)), "function" == typeof o.componentDidUpdate && (t.effectTag |= 4), "function" == typeof o.getSnapshotBeforeUpdate && (t.effectTag |= 256)) : ("function" != typeof o.componentDidUpdate || a === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 4), "function" != typeof o.getSnapshotBeforeUpdate || a === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 256), t.memoizedProps = u, t.memoizedState = f), o.props = u, o.state = f, o.context = s, o = d) : ("function" != typeof o.componentDidUpdate || a === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 4), "function" != typeof o.getSnapshotBeforeUpdate || a === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 256), o = !1);
                return xn(e, t, o, i, n);
            case 3:
                return Ln(t), i = t.updateQueue, null !== i ? (o = t.memoizedState, o = null !== o ? o.element : null, en(t, i, t.pendingProps, null, n), i = t.memoizedState.element, i === o ? (Sn(), e = Nn(e, t)) : (o = t.stateNode, (o = (null === e || null === e.child) && o.hydrate) && (Ma = kt(t.stateNode.containerInfo), Ba = t, o = Ua = !0), o ? (t.effectTag |= 2, t.child = ja(t, null, i, n)) : (Sn(), Cn(e, t, i)), e = t.child)) : (Sn(), e = Nn(e, t)), e;
            case 5:
                return sn(Ia.current), i = sn(Na.current), o = at(i, t.type), i !== o && (Et(Ra, t, t), Et(Na, o, t)), null === e && wn(t), i = t.type, u = t.memoizedProps, o = t.pendingProps, a = null !== e ? e.memoizedProps : null, ka.current || u !== o || ((u = 1 & t.mode && !!o.hidden) && (t.expirationTime = 1073741823), u && 1073741823 === n) ? (u = o.children, wt(i, o) ? u = null : a && wt(i, a) && (t.effectTag |= 16), Tn(e, t), 1073741823 !== n && 1 & t.mode && o.hidden ? (t.expirationTime = 1073741823, t.memoizedProps = o, e = null) : (Cn(e, t, u), t.memoizedProps = o, e = t.child)) : e = Nn(e, t), e;
            case 6:
                return null === e && wn(t), t.memoizedProps = t.pendingProps, null;
            case 16:
                return null;
            case 4:
                return ln(t, t.stateNode.containerInfo), i = t.pendingProps, ka.current || t.memoizedProps !== i ? (null === e ? t.child = Da(t, null, i, n) : Cn(e, t, i), t.memoizedProps = i, e = t.child) : e = Nn(e, t), e;
            case 14:
                return i = t.type.render, n = t.pendingProps, o = t.ref, ka.current || t.memoizedProps !== n || o !== (null !== e ? e.ref : null) ? (i = i(n, o), Cn(e, t, i), t.memoizedProps = n, e = t.child) : e = Nn(e, t), e;
            case 10:
                return n = t.pendingProps, ka.current || t.memoizedProps !== n ? (Cn(e, t, n), t.memoizedProps = n, e = t.child) : e = Nn(e, t), e;
            case 11:
                return n = t.pendingProps.children, ka.current || null !== n && t.memoizedProps !== n ? (Cn(e, t, n), t.memoizedProps = n, e = t.child) : e = Nn(e, t), e;
            case 15:
                return n = t.pendingProps, t.memoizedProps === n ? e = Nn(e, t) : (Cn(e, t, n.children), t.memoizedProps = n, e = t.child), e;
            case 13:
                return On(e, t, n);
            case 12:
                e: if (o = t.type, a = t.pendingProps, u = t.memoizedProps, i = o._currentValue, s = o._changedBits, ka.current || 0 !== s || u !== a) {
                    if (t.memoizedProps = a, l = a.unstable_observedBits, (void 0 === l || null === l) && (l = 1073741823), t.stateNode = l, 0 !== (s & l)) Pn(t, o, s, n);
                    else if (u === a) {
                        e = Nn(e, t);
                        break e
                    }
                    n = a.children, n = n(i), t.effectTag |= 1, Cn(e, t, n), e = t.child
                } else e = Nn(e, t);
                return e;
            default:
                r("156")
        }
    }

    function In(e) {
        e.effectTag |= 4
    }

    function Fn(e, t) {
        var n = t.pendingProps;
        switch (t.tag) {
            case 1:
                return null;
            case 2:
                return Pt(t), null;
            case 3:
                un(t), Ot(t);
                var o = t.stateNode;
                return o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (null === e || null === e.child) && (kn(t), t.effectTag &= -3), Ha(t), null;
            case 5:
                cn(t), o = sn(Ia.current);
                var i = t.type;
                if (null !== e && null != t.stateNode) {
                    var a = e.memoizedProps,
                        s = t.stateNode,
                        l = sn(Na.current);
                    s = mt(s, i, a, n, o), za(e, t, s, i, a, n, o, l), e.ref !== t.ref && (t.effectTag |= 128)
                } else {
                    if (!n) return null === t.stateNode ? r("166") : void 0, null;
                    if (e = sn(Na.current), kn(t)) n = t.stateNode, i = t.type, a = t.memoizedProps, n[ro] = t, n[oo] = a, o = vt(n, i, a, e, o), t.updateQueue = o, null !== o && In(t);
                    else {
                        e = ft(i, n, o, e), e[ro] = t, e[oo] = n;
                        e: for (a = t.child; null !== a;) {
                            if (5 === a.tag || 6 === a.tag) e.appendChild(a.stateNode);
                            else if (4 !== a.tag && null !== a.child) {
                                a.child["return"] = a, a = a.child;
                                continue
                            }
                            if (a === t) break;
                            for (; null === a.sibling;) {
                                if (null === a["return"] || a["return"] === t) break e;
                                a = a["return"]
                            }
                            a.sibling["return"] = a["return"], a = a.sibling
                        }
                        ht(e, i, n, o), _t(i, n) && In(t), t.stateNode = e
                    }
                    null !== t.ref && (t.effectTag |= 128)
                }
                return null;
            case 6:
                if (e && null != t.stateNode) Wa(e, t, e.memoizedProps, n);
                else {
                    if ("string" != typeof n) return null === t.stateNode ? r("166") : void 0, null;
                    o = sn(Ia.current), sn(Na.current), kn(t) ? (o = t.stateNode, n = t.memoizedProps, o[ro] = t, gt(o, n) && In(t)) : (o = pt(n, o), o[ro] = t, t.stateNode = o)
                }
                return null;
            case 14:
                return null;
            case 16:
                return null;
            case 10:
                return null;
            case 11:
                return null;
            case 15:
                return null;
            case 4:
                return un(t), Ha(t), null;
            case 13:
                return an(t), null;
            case 12:
                return null;
            case 0:
                r("167");
            default:
                r("156")
        }
    }

    function An(e, t) {
        var n = t.source;
        null === t.stack && null !== n && se(n), null !== n && ae(n), t = t.value, null !== e && 2 === e.tag && ae(e);
        try {
            t && t.suppressReactErrorLogging || console.error(t)
        } catch (r) {
            r && r.suppressReactErrorLogging || console.error(r)
        }
    }

    function Dn(e) {
        var t = e.ref;
        if (null !== t)
            if ("function" == typeof t) try {
                t(null)
            } catch (n) {
                Xn(e, n)
            } else t.current = null
    }

    function jn(e) {
        switch ("function" == typeof Kt && Kt(e), e.tag) {
            case 2:
                Dn(e);
                var t = e.stateNode;
                if ("function" == typeof t.componentWillUnmount) try {
                    t.props = e.memoizedProps, t.state = e.memoizedState, t.componentWillUnmount()
                } catch (n) {
                    Xn(e, n)
                }
                break;
            case 5:
                Dn(e);
                break;
            case 4:
                Un(e)
        }
    }

    function Bn(e) {
        return 5 === e.tag || 3 === e.tag || 4 === e.tag
    }

    function Mn(e) {
        e: {
            for (var t = e["return"]; null !== t;) {
                if (Bn(t)) {
                    var n = t;
                    break e
                }
                t = t["return"]
            }
            r("160"),
            n = void 0
        }
        var o = t = void 0;
        switch (n.tag) {
            case 5:
                t = n.stateNode, o = !1;
                break;
            case 3:
                t = n.stateNode.containerInfo, o = !0;
                break;
            case 4:
                t = n.stateNode.containerInfo, o = !0;
                break;
            default:
                r("161")
        }
        16 & n.effectTag && (st(t, ""), n.effectTag &= -17);e: t: for (n = e;;) {
            for (; null === n.sibling;) {
                if (null === n["return"] || Bn(n["return"])) {
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
            if (5 === i.tag || 6 === i.tag)
                if (n)
                    if (o) {
                        var a = t,
                            s = i.stateNode,
                            l = n;
                        8 === a.nodeType ? a.parentNode.insertBefore(s, l) : a.insertBefore(s, l)
                    } else t.insertBefore(i.stateNode, n);
            else o ? (a = t, s = i.stateNode, 8 === a.nodeType ? a.parentNode.insertBefore(s, a) : a.appendChild(s)) : t.appendChild(i.stateNode);
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
    }

    function Un(e) {
        for (var t = e, n = !1, o = void 0, i = void 0;;) {
            if (!n) {
                n = t["return"];
                e: for (;;) {
                    switch (null === n ? r("160") : void 0, n.tag) {
                        case 5:
                            o = n.stateNode, i = !1;
                            break e;
                        case 3:
                            o = n.stateNode.containerInfo, i = !0;
                            break e;
                        case 4:
                            o = n.stateNode.containerInfo, i = !0;
                            break e
                    }
                    n = n["return"]
                }
                n = !0
            }
            if (5 === t.tag || 6 === t.tag) {
                e: for (var a = t, s = a;;)
                    if (jn(s), null !== s.child && 4 !== s.tag) s.child["return"] = s, s = s.child;
                    else {
                        if (s === a) break;
                        for (; null === s.sibling;) {
                            if (null === s["return"] || s["return"] === a) break e;
                            s = s["return"]
                        }
                        s.sibling["return"] = s["return"], s = s.sibling
                    }i ? (a = o, s = t.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(s) : a.removeChild(s)) : o.removeChild(t.stateNode)
            }
            else if (4 === t.tag ? o = t.stateNode.containerInfo : jn(t), null !== t.child) {
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

    function Hn(e, t) {
        switch (t.tag) {
            case 2:
                break;
            case 5:
                var n = t.stateNode;
                if (null != n) {
                    var o = t.memoizedProps;
                    e = null !== e ? e.memoizedProps : o;
                    var i = t.type,
                        a = t.updateQueue;
                    t.updateQueue = null, null !== a && (n[oo] = o, yt(n, a, i, e, o))
                }
                break;
            case 6:
                null === t.stateNode ? r("162") : void 0, t.stateNode.nodeValue = t.memoizedProps;
                break;
            case 3:
                break;
            case 15:
                break;
            case 16:
                break;
            default:
                r("163")
        }
    }

    function zn(e, t, n) {
        n = qt(n), n.tag = 3, n.payload = {
            element: null
        };
        var r = t.value;
        return n.callback = function() {
            hr(r), An(e, t)
        }, n
    }

    function Wn(e, t, n) {
        n = qt(n), n.tag = 3;
        var r = e.stateNode;
        return null !== r && "function" == typeof r.componentDidCatch && (n.callback = function() {
            null === os ? os = new Set([this]) : os.add(this);
            var n = t.value,
                r = t.stack;
            An(e, t), this.componentDidCatch(n, {
                componentStack: null !== r ? r : ""
            })
        }), n
    }

    function Vn(e, t, n, r, o, i) {
        n.effectTag |= 512, n.firstEffect = n.lastEffect = null, r = rn(r, n), e = t;
        do {
            switch (e.tag) {
                case 3:
                    return e.effectTag |= 1024, r = zn(e, r, i), void Gt(e, r, i);
                case 2:
                    if (t = r, n = e.stateNode, 0 === (64 & e.effectTag) && null !== n && "function" == typeof n.componentDidCatch && (null === os || !os.has(n))) return e.effectTag |= 1024, r = Wn(e, t, i), void Gt(e, r, i)
            }
            e = e["return"]
        } while (null !== e)
    }

    function Kn(e) {
        switch (e.tag) {
            case 2:
                Pt(e);
                var t = e.effectTag;
                return 1024 & t ? (e.effectTag = -1025 & t | 64, e) : null;
            case 3:
                return un(e), Ot(e), t = e.effectTag, 1024 & t ? (e.effectTag = -1025 & t | 64, e) : null;
            case 5:
                return cn(e), null;
            case 16:
                return t = e.effectTag, 1024 & t ? (e.effectTag = -1025 & t | 64, e) : null;
            case 4:
                return un(e), null;
            case 13:
                return an(e), null;
            default:
                return null
        }
    }

    function Yn() {
        if (null !== Xa)
            for (var e = Xa["return"]; null !== e;) {
                var t = e;
                switch (t.tag) {
                    case 2:
                        Pt(t);
                        break;
                    case 3:
                        un(t), Ot(t);
                        break;
                    case 5:
                        cn(t);
                        break;
                    case 4:
                        un(t);
                        break;
                    case 13:
                        an(t)
                }
                e = e["return"]
            }
        Ga = null, Za = 0, Ja = -1, es = !1, Xa = null, rs = !1
    }

    function $n(e) {
        for (;;) {
            var t = e.alternate,
                n = e["return"],
                r = e.sibling;
            if (0 === (512 & e.effectTag)) {
                t = Fn(t, e, Za);
                var o = e;
                if (1073741823 === Za || 1073741823 !== o.expirationTime) {
                    var i = 0;
                    switch (o.tag) {
                        case 3:
                        case 2:
                            var a = o.updateQueue;
                            null !== a && (i = a.expirationTime)
                    }
                    for (a = o.child; null !== a;) 0 !== a.expirationTime && (0 === i || i > a.expirationTime) && (i = a.expirationTime), a = a.sibling;
                    o.expirationTime = i
                }
                if (null !== t) return t;
                if (null !== n && 0 === (512 & n.effectTag) && (null === n.firstEffect && (n.firstEffect = e.firstEffect), null !== e.lastEffect && (null !== n.lastEffect && (n.lastEffect.nextEffect = e.firstEffect), n.lastEffect = e.lastEffect), 1 < e.effectTag && (null !== n.lastEffect ? n.lastEffect.nextEffect = e : n.firstEffect = e, n.lastEffect = e)), null !== r) return r;
                if (null === n) {
                    rs = !0;
                    break
                }
                e = n
            } else {
                if (e = Kn(e, es, Za), null !== e) return e.effectTag &= 511, e;
                if (null !== n && (n.firstEffect = n.lastEffect = null, n.effectTag |= 512), null !== r) return r;
                if (null === n) break;
                e = n
            }
        }
        return null
    }

    function qn(e) {
        var t = Rn(e.alternate, e, Za);
        return null === t && (t = $n(e)), Mo.current = null, t
    }

    function Qn(e, t, n) {
        Qa ? r("243") : void 0, Qa = !0, (t !== Za || e !== Ga || null === Xa) && (Yn(), Ga = e, Za = t, Ja = -1, Xa = Dt(Ga.current, null, Za), e.pendingCommitExpirationTime = 0);
        var o = !1;
        for (es = !n || Ka >= Za;;) {
            try {
                if (n)
                    for (; null !== Xa && !pr();) Xa = qn(Xa);
                else
                    for (; null !== Xa;) Xa = qn(Xa)
            } catch (i) {
                if (null === Xa) o = !0, hr(i);
                else {
                    null === Xa ? r("271") : void 0, n = Xa;
                    var a = n["return"];
                    if (null === a) {
                        o = !0, hr(i);
                        break
                    }
                    Vn(e, a, n, i, es, Za, Ya), Xa = $n(n)
                }
            }
            break
        }
        if (Qa = !1, o) return null;
        if (null === Xa) {
            if (rs) return e.pendingCommitExpirationTime = t, e.current.alternate;
            es ? r("262") : void 0, Ja >= 0 && setTimeout(function() {
                var t = e.current.expirationTime;
                0 !== t && (0 === e.remainingExpirationTime || e.remainingExpirationTime < t) && or(e, t)
            }, Ja), mr(e.current.expirationTime)
        }
        return null
    }

    function Xn(e, t) {
        var n;
        e: {
            for (Qa && !ns ? r("263") : void 0, n = e["return"]; null !== n;) {
                switch (n.tag) {
                    case 2:
                        var o = n.stateNode;
                        if ("function" == typeof n.type.getDerivedStateFromCatch || "function" == typeof o.componentDidCatch && (null === os || !os.has(o))) {
                            e = rn(t, e), e = Wn(n, e, 1), Xt(n, e, 1), Jn(n, 1), n = void 0;
                            break e
                        }
                        break;
                    case 3:
                        e = rn(t, e), e = zn(n, e, 1), Xt(n, e, 1), Jn(n, 1), n = void 0;
                        break e
                }
                n = n["return"]
            }
            3 === e.tag && (n = rn(t, e), n = zn(e, n, 1), Xt(e, n, 1), Jn(e, 1)),
            n = void 0
        }
        return n
    }

    function Gn() {
        var e = 2 + 25 * (((er() - 2 + 500) / 25 | 0) + 1);
        return $a >= e && (e = $a + 1), $a = e
    }

    function Zn(e, t) {
        return e = 0 !== qa ? qa : Qa ? ns ? 1 : Za : 1 & t.mode ? _s ? 2 + 10 * (((e - 2 + 15) / 10 | 0) + 1) : 2 + 25 * (((e - 2 + 500) / 25 | 0) + 1) : 1, _s && (0 === fs || e > fs) && (fs = e), e
    }

    function Jn(e, t) {
        for (; null !== e;) {
            if ((0 === e.expirationTime || e.expirationTime > t) && (e.expirationTime = t), null !== e.alternate && (0 === e.alternate.expirationTime || e.alternate.expirationTime > t) && (e.alternate.expirationTime = t), null === e["return"]) {
                if (3 !== e.tag) break;
                var n = e.stateNode;
                !Qa && 0 !== Za && Za > t && Yn();
                var o = n.current.expirationTime;
                Qa && !ns && Ga === n || or(n, o), ks > bs && r("185")
            }
            e = e["return"]
        }
    }

    function er() {
        return Ya = ya() - Va, Ka = (Ya / 10 | 0) + 2
    }

    function tr(e) {
        var t = qa;
        qa = 2 + 25 * (((er() - 2 + 500) / 25 | 0) + 1);
        try {
            return e()
        } finally {
            qa = t
        }
    }

    function nr(e, t, n, r, o) {
        var i = qa;
        qa = 1;
        try {
            return e(t, n, r, o)
        } finally {
            qa = i
        }
    }

    function rr(e) {
        if (0 !== ss) {
            if (e > ss) return;
            ga(ls)
        }
        var t = ya() - Va;
        ss = e, ls = va(ar, {
            timeout: 10 * (e - 2) - t
        })
    }

    function or(e, t) {
        if (null === e.nextScheduledRoot) e.remainingExpirationTime = t, null === as ? (is = as = e, e.nextScheduledRoot = e) : (as = as.nextScheduledRoot = e, as.nextScheduledRoot = is);
        else {
            var n = e.remainingExpirationTime;
            (0 === n || n > t) && (e.remainingExpirationTime = t)
        }
        us || (vs ? gs && (cs = e, ds = 1, dr(e, 1, !1)) : 1 === t ? sr() : rr(t))
    }

    function ir() {
        var e = 0,
            t = null;
        if (null !== as)
            for (var n = as, o = is; null !== o;) {
                var i = o.remainingExpirationTime;
                if (0 === i) {
                    if (null === n || null === as ? r("244") : void 0, o === o.nextScheduledRoot) {
                        is = as = o.nextScheduledRoot = null;
                        break
                    }
                    if (o === is) is = i = o.nextScheduledRoot, as.nextScheduledRoot = i, o.nextScheduledRoot = null;
                    else {
                        if (o === as) {
                            as = n, as.nextScheduledRoot = is, o.nextScheduledRoot = null;
                            break
                        }
                        n.nextScheduledRoot = o.nextScheduledRoot, o.nextScheduledRoot = null
                    }
                    o = n.nextScheduledRoot
                } else {
                    if ((0 === e || e > i) && (e = i, t = o), o === as) break;
                    n = o, o = o.nextScheduledRoot
                }
            }
        n = cs, null !== n && n === t && 1 === e ? ks++ : ks = 0, cs = t, ds = e
    }

    function ar(e) {
        lr(0, !0, e)
    }

    function sr() {
        lr(1, !1, null)
    }

    function lr(e, t, n) {
        if (ys = n, ir(), t)
            for (; null !== cs && 0 !== ds && (0 === e || e >= ds) && (!ps || er() >= ds);) er(), dr(cs, ds, !ps), ir();
        else
            for (; null !== cs && 0 !== ds && (0 === e || e >= ds);) dr(cs, ds, !1), ir();
        null !== ys && (ss = 0, ls = -1), 0 !== ds && rr(ds), ys = null, ps = !1, cr()
    }

    function ur(e, t) {
        us ? r("253") : void 0, cs = e, ds = t, dr(e, t, !1), sr(), cr()
    }

    function cr() {
        if (ks = 0, null !== ws) {
            var e = ws;
            ws = null;
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                try {
                    n._onComplete()
                } catch (r) {
                    hs || (hs = !0, ms = r)
                }
            }
        }
        if (hs) throw e = ms, ms = null, hs = !1, e
    }

    function dr(e, t, n) {
        us ? r("245") : void 0, us = !0, n ? (n = e.finishedWork, null !== n ? fr(e, n, t) : (e.finishedWork = null, n = Qn(e, t, !0), null !== n && (pr() ? e.finishedWork = n : fr(e, n, t)))) : (n = e.finishedWork, null !== n ? fr(e, n, t) : (e.finishedWork = null, n = Qn(e, t, !1), null !== n && fr(e, n, t))), us = !1
    }

    function fr(e, t, n) {
        var o = e.firstBatch;
        if (null !== o && o._expirationTime <= n && (null === ws ? ws = [o] : ws.push(o), o._defer)) return e.finishedWork = t, void(e.remainingExpirationTime = 0);
        if (e.finishedWork = null, ns = Qa = !0, n = t.stateNode, n.current === t ? r("177") : void 0, o = n.pendingCommitExpirationTime, 0 === o ? r("261") : void 0, n.pendingCommitExpirationTime = 0, er(), Mo.current = null, 1 < t.effectTag)
            if (null !== t.lastEffect) {
                t.lastEffect.nextEffect = t;
                var i = t.firstEffect
            } else i = t;
        else i = t.firstEffect;
        ha = Oi;
        var a = Br();
        if (Qe(a)) {
            if ("selectionStart" in a) var s = {
                start: a.selectionStart,
                end: a.selectionEnd
            };
            else e: {
                var l = window.getSelection && window.getSelection();
                if (l && 0 !== l.rangeCount) {
                    s = l.anchorNode;
                    var u = l.anchorOffset,
                        c = l.focusNode;
                    l = l.focusOffset;
                    try {
                        s.nodeType, c.nodeType
                    } catch (d) {
                        s = null;
                        break e
                    }
                    var f = 0,
                        p = -1,
                        h = -1,
                        m = 0,
                        y = 0,
                        v = a,
                        g = null;
                    t: for (;;) {
                        for (var _; v !== s || 0 !== u && 3 !== v.nodeType || (p = f + u), v !== c || 0 !== l && 3 !== v.nodeType || (h = f + l), 3 === v.nodeType && (f += v.nodeValue.length), null !== (_ = v.firstChild);) g = v, v = _;
                        for (;;) {
                            if (v === a) break t;
                            if (g === s && ++m === u && (p = f), g === c && ++y === l && (h = f), null !== (_ = v.nextSibling)) break;
                            v = g, g = v.parentNode
                        }
                        v = _
                    }
                    s = -1 === p || -1 === h ? null : {
                        start: p,
                        end: h
                    }
                } else s = null
            }
            s = s || {
                start: 0,
                end: 0
            }
        } else s = null;
        for (ma = {
                focusedElem: a,
                selectionRange: s
            }, He(!1), ts = i; null !== ts;) {
            a = !1, s = void 0;
            try {
                for (; null !== ts;) {
                    if (256 & ts.effectTag) {
                        var w = ts.alternate;
                        switch (u = ts, u.tag) {
                            case 2:
                                if (256 & u.effectTag && null !== w) {
                                    var b = w.memoizedProps,
                                        k = w.memoizedState,
                                        S = u.stateNode;
                                    S.props = u.memoizedProps, S.state = u.memoizedState;
                                    var C = S.getSnapshotBeforeUpdate(b, k);
                                    S.__reactInternalSnapshotBeforeUpdate = C
                                }
                                break;
                            case 3:
                            case 5:
                            case 6:
                            case 4:
                                break;
                            default:
                                r("163")
                        }
                    }
                    ts = ts.nextEffect
                }
            } catch (d) {
                a = !0, s = d
            }
            a && (null === ts ? r("178") : void 0, Xn(ts, s), null !== ts && (ts = ts.nextEffect))
        }
        for (ts = i; null !== ts;) {
            w = !1, b = void 0;
            try {
                for (; null !== ts;) {
                    var E = ts.effectTag;
                    if (16 & E && st(ts.stateNode, ""), 128 & E) {
                        var T = ts.alternate;
                        if (null !== T) {
                            var x = T.ref;
                            null !== x && ("function" == typeof x ? x(null) : x.current = null)
                        }
                    }
                    switch (14 & E) {
                        case 2:
                            Mn(ts), ts.effectTag &= -3;
                            break;
                        case 6:
                            Mn(ts), ts.effectTag &= -3, Hn(ts.alternate, ts);
                            break;
                        case 4:
                            Hn(ts.alternate, ts);
                            break;
                        case 8:
                            k = ts, Un(k), k["return"] = null, k.child = null, k.alternate && (k.alternate.child = null, k.alternate["return"] = null)
                    }
                    ts = ts.nextEffect
                }
            } catch (d) {
                w = !0, b = d
            }
            w && (null === ts ? r("178") : void 0, Xn(ts, b), null !== ts && (ts = ts.nextEffect))
        }
        if (x = ma, T = Br(), E = x.focusedElem, w = x.selectionRange, T !== E && Ur(document.documentElement, E)) {
            Qe(E) && (T = w.start, x = w.end, void 0 === x && (x = T), "selectionStart" in E ? (E.selectionStart = T, E.selectionEnd = Math.min(x, E.value.length)) : window.getSelection && (T = window.getSelection(), b = E[I()].length, x = Math.min(w.start, b), w = void 0 === w.end ? x : Math.min(w.end, b), !T.extend && x > w && (b = w, w = x, x = b), b = qe(E, x), k = qe(E, w), b && k && (1 !== T.rangeCount || T.anchorNode !== b.node || T.anchorOffset !== b.offset || T.focusNode !== k.node || T.focusOffset !== k.offset) && (S = document.createRange(), S.setStart(b.node, b.offset), T.removeAllRanges(), x > w ? (T.addRange(S), T.extend(k.node, k.offset)) : (S.setEnd(k.node, k.offset), T.addRange(S))))), T = [];
            for (x = E; x = x.parentNode;) 1 === x.nodeType && T.push({
                element: x,
                left: x.scrollLeft,
                top: x.scrollTop
            });
            for (E.focus(), E = 0; E < T.length; E++) x = T[E], x.element.scrollLeft = x.left, x.element.scrollTop = x.top
        }
        for (ma = null, He(ha), ha = null, n.current = t, ts = i; null !== ts;) {
            i = !1, E = void 0;
            try {
                for (T = o; null !== ts;) {
                    var L = ts.effectTag;
                    if (36 & L) {
                        var P = ts.alternate;
                        switch (x = ts, w = T, x.tag) {
                            case 2:
                                var O = x.stateNode;
                                if (4 & x.effectTag)
                                    if (null === P) O.props = x.memoizedProps, O.state = x.memoizedState, O.componentDidMount();
                                    else {
                                        var N = P.memoizedProps,
                                            R = P.memoizedState;
                                        O.props = x.memoizedProps, O.state = x.memoizedState, O.componentDidUpdate(N, R, O.__reactInternalSnapshotBeforeUpdate)
                                    }
                                var F = x.updateQueue;
                                null !== F && (O.props = x.memoizedProps, O.state = x.memoizedState, nn(x, F, O, w));
                                break;
                            case 3:
                                var A = x.updateQueue;
                                if (null !== A) {
                                    if (b = null, null !== x.child) switch (x.child.tag) {
                                        case 5:
                                            b = x.child.stateNode;
                                            break;
                                        case 2:
                                            b = x.child.stateNode
                                    }
                                    nn(x, A, b, w)
                                }
                                break;
                            case 5:
                                var D = x.stateNode;
                                null === P && 4 & x.effectTag && _t(x.type, x.memoizedProps) && D.focus();
                                break;
                            case 6:
                                break;
                            case 4:
                                break;
                            case 15:
                                break;
                            case 16:
                                break;
                            default:
                                r("163")
                        }
                    }
                    if (128 & L) {
                        x = void 0;
                        var j = ts.ref;
                        if (null !== j) {
                            var B = ts.stateNode;
                            switch (ts.tag) {
                                case 5:
                                    x = B;
                                    break;
                                default:
                                    x = B
                            }
                            "function" == typeof j ? j(x) : j.current = x
                        }
                    }
                    var M = ts.nextEffect;
                    ts.nextEffect = null, ts = M
                }
            } catch (d) {
                i = !0, E = d
            }
            i && (null === ts ? r("178") : void 0, Xn(ts, E), null !== ts && (ts = ts.nextEffect))
        }
        Qa = ns = !1, "function" == typeof Vt && Vt(t.stateNode), t = n.current.expirationTime, 0 === t && (os = null), e.remainingExpirationTime = t
    }

    function pr() {
        return null === ys || ys.timeRemaining() > Ss ? !1 : ps = !0
    }

    function hr(e) {
        null === cs ? r("246") : void 0, cs.remainingExpirationTime = 0, hs || (hs = !0, ms = e)
    }

    function mr(e) {
        null === cs ? r("246") : void 0, cs.remainingExpirationTime = e
    }

    function yr(e, t) {
        var n = vs;
        vs = !0;
        try {
            return e(t)
        } finally {
            (vs = n) || us || sr()
        }
    }

    function vr(e, t) {
        if (vs && !gs) {
            gs = !0;
            try {
                return e(t)
            } finally {
                gs = !1
            }
        }
        return e(t)
    }

    function gr(e, t) {
        us ? r("187") : void 0;
        var n = vs;
        vs = !0;
        try {
            return nr(e, t)
        } finally {
            vs = n, sr()
        }
    }

    function _r(e) {
        var t = vs;
        vs = !0;
        try {
            nr(e)
        } finally {
            (vs = t) || us || lr(1, !1, null)
        }
    }

    function wr(e, t, n, o, i) {
        var a = t.current;
        if (n) {
            n = n._reactInternalFiber;
            var s;
            e: {
                for (2 === Ie(n) && 2 === n.tag ? void 0 : r("170"), s = n; 3 !== s.tag;) {
                    if (Lt(s)) {
                        s = s.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }(s = s["return"]) ? void 0: r("171")
                }
                s = s.stateNode.context
            }
            n = Lt(n) ? Rt(n, s) : s
        } else n = Hr;
        return null === t.context ? t.context = n : t.pendingContext = n, t = i, i = qt(o), i.payload = {
            element: e
        }, t = void 0 === t ? null : t, null !== t && (i.callback = t), Xt(a, i, o), Jn(a, o), o
    }

    function br(e) {
        var t = e._reactInternalFiber;
        return void 0 === t && ("function" == typeof e.render ? r("188") : r("268", Object.keys(e))), e = De(t), null === e ? null : e.stateNode
    }

    function kr(e, t, n, r) {
        var o = t.current,
            i = er();
        return o = Zn(i, o), wr(e, t, n, o, r)
    }

    function Sr(e) {
        if (e = e.current, !e.child) return null;
        switch (e.child.tag) {
            case 5:
                return e.child.stateNode;
            default:
                return e.child.stateNode
        }
    }

    function Cr(e) {
        var t = e.findFiberByHostInstance;
        return Wt(Dr({}, e, {
            findHostInstanceByFiber: function(e) {
                return e = De(e), null === e ? null : e.stateNode
            },
            findFiberByHostInstance: function(e) {
                return t ? t(e) : null
            }
        }))
    }

    function Er(e, t, n) {
        var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
            $$typeof: zo,
            key: null == r ? null : "" + r,
            children: e,
            containerInfo: t,
            implementation: n
        }
    }

    function Tr(e) {
        this._expirationTime = Gn(), this._root = e, this._callbacks = this._next = null, this._hasChildren = this._didComplete = !1, this._children = null, this._defer = !0
    }

    function xr() {
        this._callbacks = null, this._didCommit = !1, this._onCommit = this._onCommit.bind(this)
    }

    function Lr(e, t, n) {
        this._internalRoot = Ht(e, t, n)
    }

    function Pr(e) {
        return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    }

    function Or(e, t) {
        if (t || (t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null, t = !(!t || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))), !t)
            for (var n; n = e.lastChild;) e.removeChild(n);
        return new Lr(e, !1, t)
    }

    function Nr(e, t, n, o, i) {
        Pr(n) ? void 0 : r("200");
        var a = n._reactRootContainer;
        if (a) {
            if ("function" == typeof i) {
                var s = i;
                i = function() {
                    var e = Sr(a._internalRoot);
                    s.call(e)
                }
            }
            null != e ? a.legacy_renderSubtreeIntoContainer(e, t, i) : a.render(t, i)
        } else {
            if (a = n._reactRootContainer = Or(n, o), "function" == typeof i) {
                var l = i;
                i = function() {
                    var e = Sr(a._internalRoot);
                    l.call(e)
                }
            }
            vr(function() {
                null != e ? a.legacy_renderSubtreeIntoContainer(e, t, i) : a.render(t, i)
            })
        }
        return Sr(a._internalRoot)
    }

    function Rr(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        return Pr(t) ? void 0 : r("200"), Er(e, t, null, n)
    }
    var Ir = n(34),
        Fr = n(42),
        Ar = n(14),
        Dr = n(39),
        jr = n(0),
        Br = n(15),
        Mr = n(3),
        Ur = n(31),
        Hr = n(13);
    Fr ? void 0 : r("227");
    var zr = {
            _caughtError: null,
            _hasCaughtError: !1,
            _rethrowError: null,
            _hasRethrowError: !1,
            invokeGuardedCallback: function(e, t, n, r, i, a, s, l, u) {
                o.apply(zr, arguments)
            },
            invokeGuardedCallbackAndCatchFirstError: function(e, t, n, r, o, i, a, s, l) {
                if (zr.invokeGuardedCallback.apply(this, arguments), zr.hasCaughtError()) {
                    var u = zr.clearCaughtError();
                    zr._hasRethrowError || (zr._hasRethrowError = !0, zr._rethrowError = u)
                }
            },
            rethrowCaughtError: function() {
                return i.apply(zr, arguments)
            },
            hasCaughtError: function() {
                return zr._hasCaughtError
            },
            clearCaughtError: function() {
                if (zr._hasCaughtError) {
                    var e = zr._caughtError;
                    return zr._caughtError = null, zr._hasCaughtError = !1, e
                }
                r("198")
            }
        },
        Wr = null,
        Vr = {},
        Kr = [],
        Yr = {},
        $r = {},
        qr = {},
        Qr = {
            plugins: Kr,
            eventNameDispatchConfigs: Yr,
            registrationNameModules: $r,
            registrationNameDependencies: qr,
            possibleRegistrationNames: null,
            injectEventPluginOrder: l,
            injectEventPluginsByName: u
        },
        Xr = null,
        Gr = null,
        Zr = null,
        Jr = null,
        eo = {
            injectEventPluginOrder: l,
            injectEventPluginsByName: u
        },
        to = {
            injection: eo,
            getListener: y,
            runEventsInBatch: v,
            runExtractedEventsInBatch: g
        },
        no = Math.random().toString(36).slice(2),
        ro = "__reactInternalInstance$" + no,
        oo = "__reactEventHandlers$" + no,
        io = {
            precacheFiberNode: function(e, t) {
                t[ro] = e
            },
            getClosestInstanceFromNode: _,
            getInstanceFromNode: function(e) {
                return e = e[ro], !e || 5 !== e.tag && 6 !== e.tag ? null : e
            },
            getNodeFromInstance: w,
            getFiberCurrentPropsFromNode: b,
            updateFiberProps: function(e, t) {
                e[oo] = t
            }
        },
        ao = {
            accumulateTwoPhaseDispatches: P,
            accumulateTwoPhaseDispatchesSkipTarget: function(e) {
                f(e, T)
            },
            accumulateEnterLeaveDispatches: O,
            accumulateDirectDispatches: function(e) {
                f(e, L)
            }
        },
        so = {
            animationend: N("Animation", "AnimationEnd"),
            animationiteration: N("Animation", "AnimationIteration"),
            animationstart: N("Animation", "AnimationStart"),
            transitionend: N("Transition", "TransitionEnd")
        },
        lo = {},
        uo = {};
    Ar.canUseDOM && (uo = document.createElement("div").style, "AnimationEvent" in window || (delete so.animationend.animation, delete so.animationiteration.animation, delete so.animationstart.animation), "TransitionEvent" in window || delete so.transitionend.transition);
    var co = R("animationend"),
        fo = R("animationiteration"),
        po = R("animationstart"),
        ho = R("transitionend"),
        mo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
        yo = null,
        vo = {
            _root: null,
            _startText: null,
            _fallbackText: null
        },
        go = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
        _o = {
            type: null,
            target: null,
            currentTarget: jr.thatReturnsNull,
            eventPhase: null,
            bubbles: null,
            cancelable: null,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: null,
            isTrusted: null
        };
    Dr(D.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = jr.thatReturnsTrue)
        },
        stopPropagation: function() {
            var e = this.nativeEvent;
            e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = jr.thatReturnsTrue)
        },
        persist: function() {
            this.isPersistent = jr.thatReturnsTrue
        },
        isPersistent: jr.thatReturnsFalse,
        destructor: function() {
            var e, t = this.constructor.Interface;
            for (e in t) this[e] = null;
            for (t = 0; t < go.length; t++) this[go[t]] = null
        }
    }), D.Interface = _o, D.extend = function(e) {
        function t() {}

        function n() {
            return r.apply(this, arguments)
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t;
        return Dr(o, n.prototype), n.prototype = o, n.prototype.constructor = n, n.Interface = Dr({}, r.Interface, e), n.extend = r.extend, M(n), n
    }, M(D);
    var wo = D.extend({
            data: null
        }),
        bo = D.extend({
            data: null
        }),
        ko = [9, 13, 27, 32],
        So = Ar.canUseDOM && "CompositionEvent" in window,
        Co = null;
    Ar.canUseDOM && "documentMode" in document && (Co = document.documentMode);
    var Eo = Ar.canUseDOM && "TextEvent" in window && !Co,
        To = Ar.canUseDOM && (!So || Co && Co > 8 && 11 >= Co),
        xo = String.fromCharCode(32),
        Lo = {
            beforeInput: {
                phasedRegistrationNames: {
                    bubbled: "onBeforeInput",
                    captured: "onBeforeInputCapture"
                },
                dependencies: ["compositionend", "keypress", "textInput", "paste"]
            },
            compositionEnd: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionEnd",
                    captured: "onCompositionEndCapture"
                },
                dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
            },
            compositionStart: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionStart",
                    captured: "onCompositionStartCapture"
                },
                dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
            },
            compositionUpdate: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionUpdate",
                    captured: "onCompositionUpdateCapture"
                },
                dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
            }
        },
        Po = !1,
        Oo = !1,
        No = {
            eventTypes: Lo,
            extractEvents: function(e, t, n, r) {
                var o = void 0,
                    i = void 0;
                if (So) e: {
                    switch (e) {
                        case "compositionstart":
                            o = Lo.compositionStart;
                            break e;
                        case "compositionend":
                            o = Lo.compositionEnd;
                            break e;
                        case "compositionupdate":
                            o = Lo.compositionUpdate;
                            break e
                    }
                    o = void 0
                }
                else Oo ? U(e, n) && (o = Lo.compositionEnd) : "keydown" === e && 229 === n.keyCode && (o = Lo.compositionStart);
                return o ? (To && (Oo || o !== Lo.compositionStart ? o === Lo.compositionEnd && Oo && (i = F()) : (vo._root = r, vo._startText = A(), Oo = !0)), o = wo.getPooled(o, t, n, r), i ? o.data = i : (i = H(n), null !== i && (o.data = i)), P(o), i = o) : i = null, (e = Eo ? z(e, n) : W(e, n)) ? (t = bo.getPooled(Lo.beforeInput, t, n, r), t.data = e, P(t)) : t = null, null === i ? t : null === t ? i : [i, t]
            }
        },
        Ro = null,
        Io = {
            injectFiberControlledHostComponent: function(e) {
                Ro = e
            }
        },
        Fo = null,
        Ao = null,
        Do = {
            injection: Io,
            enqueueStateRestore: K,
            needsStateRestore: Y,
            restoreStateIfNeeded: $
        },
        jo = !1,
        Bo = {
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
        },
        Mo = Fr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        Uo = "function" == typeof Symbol && Symbol["for"],
        Ho = Uo ? Symbol["for"]("react.element") : 60103,
        zo = Uo ? Symbol["for"]("react.portal") : 60106,
        Wo = Uo ? Symbol["for"]("react.fragment") : 60107,
        Vo = Uo ? Symbol["for"]("react.strict_mode") : 60108,
        Ko = Uo ? Symbol["for"]("react.profiler") : 60114,
        Yo = Uo ? Symbol["for"]("react.provider") : 60109,
        $o = Uo ? Symbol["for"]("react.context") : 60110,
        qo = Uo ? Symbol["for"]("react.async_mode") : 60111,
        Qo = Uo ? Symbol["for"]("react.forward_ref") : 60112,
        Xo = Uo ? Symbol["for"]("react.timeout") : 60113,
        Go = "function" == typeof Symbol && Symbol.iterator,
        Zo = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        Jo = {},
        ei = {},
        ti = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
        ti[e] = new de(e, 0, !1, e, null)
    }), [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"]
    ].forEach(function(e) {
        var t = e[0];
        ti[t] = new de(t, 1, !1, e[1], null)
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
        ti[e] = new de(e, 2, !1, e.toLowerCase(), null)
    }), ["autoReverse", "externalResourcesRequired", "preserveAlpha"].forEach(function(e) {
        ti[e] = new de(e, 2, !1, e, null)
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
        ti[e] = new de(e, 3, !1, e.toLowerCase(), null)
    }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
        ti[e] = new de(e, 3, !0, e.toLowerCase(), null)
    }), ["capture", "download"].forEach(function(e) {
        ti[e] = new de(e, 4, !1, e.toLowerCase(), null)
    }), ["cols", "rows", "size", "span"].forEach(function(e) {
        ti[e] = new de(e, 6, !1, e.toLowerCase(), null)
    }), ["rowSpan", "start"].forEach(function(e) {
        ti[e] = new de(e, 5, !1, e.toLowerCase(), null)
    });
    var ni = /[\-:]([a-z])/g;
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
        var t = e.replace(ni, fe);
        ti[t] = new de(t, 1, !1, e, null)
    }), "xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
        var t = e.replace(ni, fe);
        ti[t] = new de(t, 1, !1, e, "http://www.w3.org/1999/xlink")
    }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
        var t = e.replace(ni, fe);
        ti[t] = new de(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace")
    }), ti.tabIndex = new de("tabIndex", 1, !1, "tabindex", null);
    var ri = {
            change: {
                phasedRegistrationNames: {
                    bubbled: "onChange",
                    captured: "onChangeCapture"
                },
                dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
            }
        },
        oi = null,
        ii = null,
        ai = !1;
    Ar.canUseDOM && (ai = ee("input") && (!document.documentMode || 9 < document.documentMode));
    var si = {
            eventTypes: ri,
            _isInputEventSupported: ai,
            extractEvents: function(e, t, n, r) {
                var o = t ? w(t) : window,
                    i = void 0,
                    a = void 0,
                    s = o.nodeName && o.nodeName.toLowerCase();
                return "select" === s || "input" === s && "file" === o.type ? i = Ce : Z(o) ? ai ? i = Oe : (i = Le, a = xe) : (s = o.nodeName) && "input" === s.toLowerCase() && ("checkbox" === o.type || "radio" === o.type) && (i = Pe), i && (i = i(e, t)) ? be(i, n, r) : (a && a(e, o, t), void("blur" === e && null != t && (e = t._wrapperState || o._wrapperState) && e.controlled && "number" === o.type && _e(o, "number", o.value)))
            }
        },
        li = D.extend({
            view: null,
            detail: null
        }),
        ui = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        },
        ci = li.extend({
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
            getModifierState: Re,
            button: null,
            buttons: null,
            relatedTarget: function(e) {
                return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
            }
        }),
        di = ci.extend({
            pointerId: null,
            width: null,
            height: null,
            pressure: null,
            tiltX: null,
            tiltY: null,
            pointerType: null,
            isPrimary: null
        }),
        fi = {
            mouseEnter: {
                registrationName: "onMouseEnter",
                dependencies: ["mouseout", "mouseover"]
            },
            mouseLeave: {
                registrationName: "onMouseLeave",
                dependencies: ["mouseout", "mouseover"]
            },
            pointerEnter: {
                registrationName: "onPointerEnter",
                dependencies: ["pointerout", "pointerover"]
            },
            pointerLeave: {
                registrationName: "onPointerLeave",
                dependencies: ["pointerout", "pointerover"]
            }
        },
        pi = {
            eventTypes: fi,
            extractEvents: function(e, t, n, r) {
                var o = "mouseover" === e || "pointerover" === e,
                    i = "mouseout" === e || "pointerout" === e;
                if (o && (n.relatedTarget || n.fromElement) || !i && !o) return null;
                if (o = r.window === r ? r : (o = r.ownerDocument) ? o.defaultView || o.parentWindow : window, i ? (i = t, t = (t = n.relatedTarget || n.toElement) ? _(t) : null) : i = null, i === t) return null;
                var a = void 0,
                    s = void 0,
                    l = void 0,
                    u = void 0;
                return "mouseout" === e || "mouseover" === e ? (a = ci, s = fi.mouseLeave, l = fi.mouseEnter, u = "mouse") : ("pointerout" === e || "pointerover" === e) && (a = di, s = fi.pointerLeave, l = fi.pointerEnter, u = "pointer"), e = null == i ? o : w(i), o = null == t ? o : w(t), s = a.getPooled(s, i, n, r), s.type = u + "leave", s.target = e, s.relatedTarget = o, n = a.getPooled(l, t, n, r), n.type = u + "enter", n.target = o, n.relatedTarget = e, O(s, n, i, t), [s, n]
            }
        },
        hi = D.extend({
            animationName: null,
            elapsedTime: null,
            pseudoElement: null
        }),
        mi = D.extend({
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData
            }
        }),
        yi = li.extend({
            relatedTarget: null
        }),
        vi = {
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
        gi = {
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
        },
        _i = li.extend({
            key: function(e) {
                if (e.key) {
                    var t = vi[e.key] || e.key;
                    if ("Unidentified" !== t) return t
                }
                return "keypress" === e.type ? (e = Be(e), 13 === e ? "Enter" : String.fromCharCode(e)) : "keydown" === e.type || "keyup" === e.type ? gi[e.keyCode] || "Unidentified" : ""
            },
            location: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            repeat: null,
            locale: null,
            getModifierState: Re,
            charCode: function(e) {
                return "keypress" === e.type ? Be(e) : 0
            },
            keyCode: function(e) {
                return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
            },
            which: function(e) {
                return "keypress" === e.type ? Be(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
            }
        }),
        wi = ci.extend({
            dataTransfer: null
        }),
        bi = li.extend({
            touches: null,
            targetTouches: null,
            changedTouches: null,
            altKey: null,
            metaKey: null,
            ctrlKey: null,
            shiftKey: null,
            getModifierState: Re
        }),
        ki = D.extend({
            propertyName: null,
            elapsedTime: null,
            pseudoElement: null
        }),
        Si = ci.extend({
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
            },
            deltaZ: null,
            deltaMode: null
        }),
        Ci = [
            ["abort", "abort"],
            [co, "animationEnd"],
            [fo, "animationIteration"],
            [po, "animationStart"],
            ["canplay", "canPlay"],
            ["canplaythrough", "canPlayThrough"],
            ["drag", "drag"],
            ["dragenter", "dragEnter"],
            ["dragexit", "dragExit"],
            ["dragleave", "dragLeave"],
            ["dragover", "dragOver"],
            ["durationchange", "durationChange"],
            ["emptied", "emptied"],
            ["encrypted", "encrypted"],
            ["ended", "ended"],
            ["error", "error"],
            ["gotpointercapture", "gotPointerCapture"],
            ["load", "load"],
            ["loadeddata", "loadedData"],
            ["loadedmetadata", "loadedMetadata"],
            ["loadstart", "loadStart"],
            ["lostpointercapture", "lostPointerCapture"],
            ["mousemove", "mouseMove"],
            ["mouseout", "mouseOut"],
            ["mouseover", "mouseOver"],
            ["playing", "playing"],
            ["pointermove", "pointerMove"],
            ["pointerout", "pointerOut"],
            ["pointerover", "pointerOver"],
            ["progress", "progress"],
            ["scroll", "scroll"],
            ["seeking", "seeking"],
            ["stalled", "stalled"],
            ["suspend", "suspend"],
            ["timeupdate", "timeUpdate"],
            ["toggle", "toggle"],
            ["touchmove", "touchMove"],
            [ho, "transitionEnd"],
            ["waiting", "waiting"],
            ["wheel", "wheel"]
        ],
        Ei = {},
        Ti = {};
    [
        ["blur", "blur"],
        ["cancel", "cancel"],
        ["click", "click"],
        ["close", "close"],
        ["contextmenu", "contextMenu"],
        ["copy", "copy"],
        ["cut", "cut"],
        ["dblclick", "doubleClick"],
        ["dragend", "dragEnd"],
        ["dragstart", "dragStart"],
        ["drop", "drop"],
        ["focus", "focus"],
        ["input", "input"],
        ["invalid", "invalid"],
        ["keydown", "keyDown"],
        ["keypress", "keyPress"],
        ["keyup", "keyUp"],
        ["mousedown", "mouseDown"],
        ["mouseup", "mouseUp"],
        ["paste", "paste"],
        ["pause", "pause"],
        ["play", "play"],
        ["pointercancel", "pointerCancel"],
        ["pointerdown", "pointerDown"],
        ["pointerup", "pointerUp"],
        ["ratechange", "rateChange"],
        ["reset", "reset"],
        ["seeked", "seeked"],
        ["submit", "submit"],
        ["touchcancel", "touchCancel"],
        ["touchend", "touchEnd"],
        ["touchstart", "touchStart"],
        ["volumechange", "volumeChange"]
    ].forEach(function(e) {
        Me(e, !0)
    }), Ci.forEach(function(e) {
        Me(e, !1)
    });
    var xi = {
            eventTypes: Ei,
            isInteractiveTopLevelEventType: function(e) {
                return e = Ti[e], void 0 !== e && !0 === e.isInteractive
            },
            extractEvents: function(e, t, n, r) {
                var o = Ti[e];
                if (!o) return null;
                switch (e) {
                    case "keypress":
                        if (0 === Be(n)) return null;
                    case "keydown":
                    case "keyup":
                        e = _i;
                        break;
                    case "blur":
                    case "focus":
                        e = yi;
                        break;
                    case "click":
                        if (2 === n.button) return null;
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        e = ci;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        e = wi;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        e = bi;
                        break;
                    case co:
                    case fo:
                    case po:
                        e = hi;
                        break;
                    case ho:
                        e = ki;
                        break;
                    case "scroll":
                        e = li;
                        break;
                    case "wheel":
                        e = Si;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        e = mi;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        e = di;
                        break;
                    default:
                        e = D
                }
                return t = e.getPooled(o, t, n, r), P(t), t
            }
        },
        Li = xi.isInteractiveTopLevelEventType,
        Pi = [],
        Oi = !0,
        Ni = {
            get _enabled() {
                return Oi
            },
            setEnabled: He,
            isEnabled: function() {
                return Oi
            },
            trapBubbledEvent: ze,
            trapCapturedEvent: We,
            dispatchEvent: Ke
        },
        Ri = {},
        Ii = 0,
        Fi = "_reactListenersID" + ("" + Math.random()).slice(2),
        Ai = Ar.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
        Di = {
            select: {
                phasedRegistrationNames: {
                    bubbled: "onSelect",
                    captured: "onSelectCapture"
                },
                dependencies: "blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")
            }
        },
        ji = null,
        Bi = null,
        Mi = null,
        Ui = !1,
        Hi = {
            eventTypes: Di,
            extractEvents: function(e, t, n, r) {
                var o, i = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;
                if (!(o = !i)) {
                    e: {
                        i = Ye(i),
                        o = qr.onSelect;
                        for (var a = 0; a < o.length; a++) {
                            var s = o[a];
                            if (!i.hasOwnProperty(s) || !i[s]) {
                                i = !1;
                                break e
                            }
                        }
                        i = !0
                    }
                    o = !i
                }
                if (o) return null;
                switch (i = t ? w(t) : window, e) {
                    case "focus":
                        (Z(i) || "true" === i.contentEditable) && (ji = i, Bi = t, Mi = null);
                        break;
                    case "blur":
                        Mi = Bi = ji = null;
                        break;
                    case "mousedown":
                        Ui = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                        return Ui = !1, Xe(n, r);
                    case "selectionchange":
                        if (Ai) break;
                    case "keydown":
                    case "keyup":
                        return Xe(n, r)
                }
                return null
            }
        };
    eo.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), Xr = io.getFiberCurrentPropsFromNode, Gr = io.getInstanceFromNode, Zr = io.getNodeFromInstance, eo.injectEventPluginsByName({
        SimpleEventPlugin: xi,
        EnterLeaveEventPlugin: pi,
        ChangeEventPlugin: si,
        SelectEventPlugin: Hi,
        BeforeInputEventPlugin: No
    });
    var zi = void 0;
    zi = "object" == typeof performance && "function" == typeof performance.now ? function() {
        return performance.now()
    } : function() {
        return Date.now()
    };
    var Wi = void 0,
        Vi = void 0;
    if (Ar.canUseDOM) {
        var Ki = [],
            Yi = 0,
            $i = {},
            qi = -1,
            Qi = !1,
            Xi = !1,
            Gi = 0,
            Zi = 33,
            Ji = 33,
            ea = {
                didTimeout: !1,
                timeRemaining: function() {
                    var e = Gi - zi();
                    return e > 0 ? e : 0
                }
            },
            ta = function(e, t) {
                if ($i[t]) try {
                    e(ea)
                } finally {
                    delete $i[t]
                }
            },
            na = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
        window.addEventListener("message", function(e) {
            if (e.source === window && e.data === na && (Qi = !1, 0 !== Ki.length)) {
                if (0 !== Ki.length && (e = zi(), !(-1 === qi || qi > e))) {
                    qi = -1, ea.didTimeout = !0;
                    for (var t = 0, n = Ki.length; n > t; t++) {
                        var r = Ki[t],
                            o = r.timeoutTime; - 1 !== o && e >= o ? ta(r.scheduledCallback, r.callbackId) : -1 !== o && (-1 === qi || qi > o) && (qi = o)
                    }
                }
                for (e = zi(); Gi - e > 0 && 0 < Ki.length;) e = Ki.shift(), ea.didTimeout = !1, ta(e.scheduledCallback, e.callbackId), e = zi();
                0 < Ki.length && !Xi && (Xi = !0, requestAnimationFrame(ra))
            }
        }, !1);
        var ra = function(e) {
            Xi = !1;
            var t = e - Gi + Ji;
            Ji > t && Ji > Zi ? (8 > t && (t = 8), Ji = Zi > t ? Zi : t) : Zi = t, Gi = e + Ji, Qi || (Qi = !0, window.postMessage(na, "*"))
        };
        Wi = function(e, t) {
            var n = -1;
            return null != t && "number" == typeof t.timeout && (n = zi() + t.timeout), (-1 === qi || -1 !== n && qi > n) && (qi = n), Yi++, t = Yi, Ki.push({
                scheduledCallback: e,
                callbackId: t,
                timeoutTime: n
            }), $i[t] = !0, Xi || (Xi = !0, requestAnimationFrame(ra)), t
        }, Vi = function(e) {
            delete $i[e]
        }
    } else {
        var oa = 0,
            ia = {};
        Wi = function(e) {
            var t = oa++,
                n = setTimeout(function() {
                    e({
                        timeRemaining: function() {
                            return 1 / 0
                        },
                        didTimeout: !1
                    })
                });
            return ia[t] = n, t
        }, Vi = function(e) {
            var t = ia[e];
            delete ia[e], clearTimeout(t)
        }
    }
    var aa = {
            html: "http://www.w3.org/1999/xhtml",
            mathml: "http://www.w3.org/1998/Math/MathML",
            svg: "http://www.w3.org/2000/svg"
        },
        sa = void 0,
        la = function(e) {
            return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
                MSApp.execUnsafeLocalFunction(function() {
                    return e(t, n, r, o)
                })
            } : e
        }(function(e, t) {
            if (e.namespaceURI !== aa.svg || "innerHTML" in e) e.innerHTML = t;
            else {
                for (sa = sa || document.createElement("div"), sa.innerHTML = "<svg>" + t + "</svg>", t = sa.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                for (; t.firstChild;) e.appendChild(t.firstChild)
            }
        }),
        ua = {
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
        ca = ["Webkit", "ms", "Moz", "O"];
    Object.keys(ua).forEach(function(e) {
        ca.forEach(function(t) {
            t = t + e.charAt(0).toUpperCase() + e.substring(1), ua[t] = ua[e]
        })
    });
    var da = Dr({
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
        fa = jr.thatReturns(""),
        pa = {
            createElement: ft,
            createTextNode: pt,
            setInitialProperties: ht,
            diffProperties: mt,
            updateProperties: yt,
            diffHydratedProperties: vt,
            diffHydratedText: gt,
            warnForUnmatchedText: function() {},
            warnForDeletedHydratableElement: function() {},
            warnForDeletedHydratableText: function() {},
            warnForInsertedHydratedElement: function() {},
            warnForInsertedHydratedText: function() {},
            restoreControlledState: function(e, t, n) {
                switch (t) {
                    case "input":
                        if (ve(e, n), t = n.name, "radio" === n.type && null != t) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                var o = n[t];
                                if (o !== e && o.form === e.form) {
                                    var i = b(o);
                                    i ? void 0 : r("90"), oe(o), ve(o, i)
                                }
                            }
                        }
                        break;
                    case "textarea":
                        rt(e, n);
                        break;
                    case "select":
                        t = n.value, null != t && Je(e, !!n.multiple, t, !1)
                }
            }
        },
        ha = null,
        ma = null,
        ya = zi,
        va = Wi,
        ga = Vi;
    new Set;
    var _a = [],
        wa = -1,
        ba = St(Hr),
        ka = St(!1),
        Sa = Hr,
        Ca = null,
        Ea = null,
        Ta = !1,
        xa = St(null),
        La = St(null),
        Pa = St(0),
        Oa = {},
        Na = St(Oa),
        Ra = St(Oa),
        Ia = St(Oa),
        Fa = {
            isMounted: function(e) {
                return (e = e._reactInternalFiber) ? 2 === Ie(e) : !1
            },
            enqueueSetState: function(e, t, n) {
                e = e._reactInternalFiber;
                var r = er();
                r = Zn(r, e);
                var o = qt(r);
                o.payload = t, void 0 !== n && null !== n && (o.callback = n), Xt(e, o, r), Jn(e, r)
            },
            enqueueReplaceState: function(e, t, n) {
                e = e._reactInternalFiber;
                var r = er();
                r = Zn(r, e);
                var o = qt(r);
                o.tag = 1, o.payload = t, void 0 !== n && null !== n && (o.callback = n), Xt(e, o, r), Jn(e, r)
            },
            enqueueForceUpdate: function(e, t) {
                e = e._reactInternalFiber;
                var n = er();
                n = Zn(n, e);
                var r = qt(n);
                r.tag = 2, void 0 !== t && null !== t && (r.callback = t), Xt(e, r, n), Jn(e, n)
            }
        },
        Aa = Array.isArray,
        Da = vn(!0),
        ja = vn(!1),
        Ba = null,
        Ma = null,
        Ua = !1,
        Ha = void 0,
        za = void 0,
        Wa = void 0;
    Ha = function() {}, za = function(e, t, n) {
        (t.updateQueue = n) && In(t)
    }, Wa = function(e, t, n, r) {
        n !== r && In(t)
    };
    var Va = ya(),
        Ka = 2,
        Ya = Va,
        $a = 0,
        qa = 0,
        Qa = !1,
        Xa = null,
        Ga = null,
        Za = 0,
        Ja = -1,
        es = !1,
        ts = null,
        ns = !1,
        rs = !1,
        os = null,
        is = null,
        as = null,
        ss = 0,
        ls = -1,
        us = !1,
        cs = null,
        ds = 0,
        fs = 0,
        ps = !1,
        hs = !1,
        ms = null,
        ys = null,
        vs = !1,
        gs = !1,
        _s = !1,
        ws = null,
        bs = 1e3,
        ks = 0,
        Ss = 1,
        Cs = {
            updateContainerAtExpirationTime: wr,
            createContainer: function(e, t, n) {
                return Ht(e, t, n)
            },
            updateContainer: kr,
            flushRoot: ur,
            requestWork: or,
            computeUniqueAsyncExpiration: Gn,
            batchedUpdates: yr,
            unbatchedUpdates: vr,
            deferredUpdates: tr,
            syncUpdates: nr,
            interactiveUpdates: function(e, t, n) {
                if (_s) return e(t, n);
                vs || us || 0 === fs || (lr(fs, !1, null), fs = 0);
                var r = _s,
                    o = vs;
                vs = _s = !0;
                try {
                    return e(t, n)
                } finally {
                    _s = r, (vs = o) || us || sr()
                }
            },
            flushInteractiveUpdates: function() {
                us || 0 === fs || (lr(fs, !1, null), fs = 0)
            },
            flushControlled: _r,
            flushSync: gr,
            getPublicRootInstance: Sr,
            findHostInstance: br,
            findHostInstanceWithNoPortals: function(e) {
                return e = je(e), null === e ? null : e.stateNode
            },
            injectIntoDevTools: Cr
        };
    Io.injectFiberControlledHostComponent(pa), Tr.prototype.render = function(e) {
        this._defer ? void 0 : r("250"), this._hasChildren = !0, this._children = e;
        var t = this._root._internalRoot,
            n = this._expirationTime,
            o = new xr;
        return wr(e, t, null, n, o._onCommit), o
    }, Tr.prototype.then = function(e) {
        if (this._didComplete) e();
        else {
            var t = this._callbacks;
            null === t && (t = this._callbacks = []), t.push(e)
        }
    }, Tr.prototype.commit = function() {
        var e = this._root._internalRoot,
            t = e.firstBatch;
        if (this._defer && null !== t ? void 0 : r("251"), this._hasChildren) {
            var n = this._expirationTime;
            if (t !== this) {
                this._hasChildren && (n = this._expirationTime = t._expirationTime, this.render(this._children));
                for (var o = null, i = t; i !== this;) o = i, i = i._next;
                null === o ? r("251") : void 0, o._next = i._next, this._next = t, e.firstBatch = this
            }
            this._defer = !1, ur(e, n), t = this._next, this._next = null, t = e.firstBatch = t, null !== t && t._hasChildren && t.render(t._children)
        } else this._next = null, this._defer = !1
    }, Tr.prototype._onComplete = function() {
        if (!this._didComplete) {
            this._didComplete = !0;
            var e = this._callbacks;
            if (null !== e)
                for (var t = 0; t < e.length; t++)(0, e[t])()
        }
    }, xr.prototype.then = function(e) {
        if (this._didCommit) e();
        else {
            var t = this._callbacks;
            null === t && (t = this._callbacks = []), t.push(e)
        }
    }, xr.prototype._onCommit = function() {
        if (!this._didCommit) {
            this._didCommit = !0;
            var e = this._callbacks;
            if (null !== e)
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    "function" != typeof n ? r("191", n) : void 0, n()
                }
        }
    }, Lr.prototype.render = function(e, t) {
        var n = this._internalRoot,
            r = new xr;
        return t = void 0 === t ? null : t, null !== t && r.then(t), kr(e, n, null, r._onCommit), r
    }, Lr.prototype.unmount = function(e) {
        var t = this._internalRoot,
            n = new xr;
        return e = void 0 === e ? null : e, null !== e && n.then(e), kr(null, t, null, n._onCommit), n
    }, Lr.prototype.legacy_renderSubtreeIntoContainer = function(e, t, n) {
        var r = this._internalRoot,
            o = new xr;
        return n = void 0 === n ? null : n, null !== n && o.then(n), kr(t, r, e, o._onCommit), o
    }, Lr.prototype.createBatch = function() {
        var e = new Tr(this),
            t = e._expirationTime,
            n = this._internalRoot,
            r = n.firstBatch;
        if (null === r) n.firstBatch = e, e._next = null;
        else {
            for (n = null; null !== r && r._expirationTime <= t;) n = r, r = r._next;
            e._next = r, null !== n && (n._next = e)
        }
        return e
    }, q = Cs.batchedUpdates, Q = Cs.interactiveUpdates, X = Cs.flushInteractiveUpdates;
    var Es = {
        createPortal: Rr,
        findDOMNode: function(e) {
            return null == e ? null : 1 === e.nodeType ? e : br(e)
        },
        hydrate: function(e, t, n) {
            return Nr(null, e, t, !0, n)
        },
        render: function(e, t, n) {
            return Nr(null, e, t, !1, n)
        },
        unstable_renderSubtreeIntoContainer: function(e, t, n, o) {
            return null == e || void 0 === e._reactInternalFiber ? r("38") : void 0, Nr(e, t, n, !1, o)
        },
        unmountComponentAtNode: function(e) {
            return Pr(e) ? void 0 : r("40"), e._reactRootContainer ? (vr(function() {
                Nr(null, null, e, !1, function() {
                    e._reactRootContainer = null
                })
            }), !0) : !1
        },
        unstable_createPortal: function() {
            return Rr.apply(void 0, arguments)
        },
        unstable_batchedUpdates: yr,
        unstable_deferredUpdates: tr,
        flushSync: gr,
        unstable_flushControlled: _r,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
            EventPluginHub: to,
            EventPluginRegistry: Qr,
            EventPropagators: ao,
            ReactControlledComponent: Do,
            ReactDOMComponentTree: io,
            ReactDOMEventListener: Ni
        },
        unstable_createRoot: function(e, t) {
            return new Lr(e, !0, null != t && !0 === t.hydrate)
        }
    };
    Cr({
        findFiberByHostInstance: _,
        bundleType: 0,
        version: "16.4.0",
        rendererPackageName: "react-dom"
    });
    var Ts = {
            "default": Es
        },
        xs = Ts && Es || Ts;
    e.exports = xs["default"] ? xs["default"] : xs
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = ls.get("video_volume");
        return "number" == typeof e ? Math.min(1, Math.max(0, e)) : 1
    }

    function o(e) {
        ls.set("video_volume", e)
    }

    function i() {
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
    n.r(t), n.d(t, "getVolume", function() {
        return r
    }), n.d(t, "setVolume", function() {
        return o
    }), n.d(t, "classNames", function() {
        return i
    });
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
}, function(e, t) {
    function n() {
        throw new Error("setTimeout has not been defined")
    }

    function r() {
        throw new Error("clearTimeout has not been defined")
    }

    function o(e) {
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

    function a() {
        m && p && (m = !1, p.length ? h = p.concat(h) : y = -1, h.length && s())
    }

    function s() {
        if (!m) {
            var e = o(a);
            m = !0;
            for (var t = h.length; t;) {
                for (p = h, h = []; ++y < t;) p && p[y].run();
                y = -1, t = h.length
            }
            p = null, m = !1, i(e)
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
    var p, h = [],
        m = !1,
        y = -1;
    f.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        h.push(new l(e, t)), 1 !== h.length || m || o(s)
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
    var r = n(0),
        o = n(34),
        i = n(40);
    e.exports = function() {
        function e(e, t, n, r, a, s) {
            s !== i && o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
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

    function r(e, t) {
        var n = arguments;
        cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = e, ge("stories_layers_background") || c(), e.animateStory("expand", t.fromEl), y.push(e), e.length > 1 && addClass(e.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + y.length, function(t) {
            var r = n[0] && n[0].isCloseBtnClick;
            y.length > 1 && !r ? e.back(!0) : (e.hideAllLayers = r, e.hide(!1, !0))
        })
    }

    function o() {
        y.pop(), cur.storyLayer = y[y.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())
    }

    function i() {
        y.length > 1 && (y[y.length - 2].setLayerVisibility(!1), y[y.length - 1].showBackButton())
    }

    function a() {
        y.length > 1 ? y[y.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
    }

    function s(e) {
        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1, n = 0; n < y.length; n++) y[n].hide(!0);
        if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), d(), t) {
            var r = nav.objLoc;
            delete r.w, nav.setLoc(r)
        }
        cur.needUpdateFeedStories && Stories.updateFeedStories(), y = []
    }

    function l() {
        return y.length
    }

    function u() {
        cur.storyLayer && cur.storyLayer.back()
    }

    function c() {
        bodyNode.appendChild(ce("div", {
            id: "stories_layers_background",
            className: "stories_layers_background"
        })), layerQueue.hide(), layerQueue.push(), layers.fullhide = s, addEvent(window, "visibilitychange", v.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", v.resize), addEvent(document, "keydown", v.keydown), addEvent(document, "keyup", v.keyup)
    }

    function d() {
        removeEvent(window, "visibilitychange", v.visibilitychange), removeEvent(window, "resize", v.resize), removeEvent(document, "keydown", v.keydown), removeEvent(document, "keyup", v.keyup)
    }

    function f() {
        return y[0]
    }

    function p() {
        return y[y.length - 2]
    }

    function h() {
        for (var e = y.length - 2; e >= 0; e--) y[e].doHide(!0);
        y.splice(0, y.length - 1)
    }

    function m(e) {
        for (var t = 0; t < y.length; t++) y[t].onReplyDeleted(e)
    }
    n.r(t), n.d(t, "addLayer", function() {
        return r
    }), n.d(t, "removeLayer", function() {
        return o
    }), n.d(t, "layerShown", function() {
        return i
    }), n.d(t, "layerHide", function() {
        return a
    }), n.d(t, "hideAllLayers", function() {
        return s
    }), n.d(t, "getCount", function() {
        return l
    }), n.d(t, "back", function() {
        return u
    }), n.d(t, "getFirstLayer", function() {
        return f
    }), n.d(t, "getPrevLayer", function() {
        return p
    }), n.d(t, "slicePrevLayers", function() {
        return h
    }), n.d(t, "onReplyDeleted", function() {
        return m
    });
    var y = [],
        v = {
            visibilitychange: function(e) {
                cur.storyLayer && cur.storyLayer.onVisibilityChange(e)
            },
            resize: function(e) {
                cur.storyLayer && cur.storyLayer.onResize(e)
            },
            keydown: function(e) {
                cur.storyLayer && cur.storyLayer.onKeyDown(e)
            },
            keyup: function(e) {
                cur.storyLayer && cur.storyLayer.onKeyUp(e)
            }
        }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = PageID;
        return function() {
            t == PageID && e.apply(this, arguments)
        }
    }

    function o(e, t) {
        return setTimeout(r(e), t)
    }

    function i(e, t) {
        return Math.random() * (t - e + 1) + e
    }

    function a(e, t) {
        return Math.floor(i(e, t))
    }

    function s(e) {
        return "undefined" == typeof e
    }

    function l(e) {
        return e && "[object Function]" === Object.prototype.toString.call(e)
    }

    function u(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
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

    function h() {
        return window.Image ? new Image : ce("img")
    }

    function m(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function y(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function v(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function g(e) {
        return e === !0 ? 1 : parseInt(e) || 0
    }

    function _(e) {
        return e === !0 ? 1 : parseFloat(e) || 0
    }

    function w(e) {
        return e = g(e), 0 > e ? 0 : e
    }

    function b(e) {
        return !isNaN(e)
    }

    function k(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return t = g(t), t >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function S(e) {
        return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
    }

    function C(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function E(e) {
        return S(e.replace(/\t/g, "\n"))
    }

    function T(e, t) {
        if (d(e) || "undefined" == typeof e.length) {
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && t.call(e[n], n, e[n]) === !1) break
        } else
            for (var r = 0, o = e.length; o > r; r++) {
                var i = e[r];
                if (t.call(i, r, i) === !1) break
            }
        return e
    }

    function x(e, t, n) {
        for (var r = n || 0, o = (e || []).length; o > r; r++)
            if (e[r] == t) return r;
        return -1
    }

    function L(e, t) {
        return -1 != x(t, e)
    }

    function P(e, t) {
        var n = d(e) || "undefined" == typeof e.length ? {} : [];
        for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === U(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = P(e[r]) : n[r] = e[r]);
        return n
    }

    function O(e) {
        var t, n, r = {},
            o = 1,
            i = arguments.length,
            a = arguments;
        for (t in e) {
            for (n = !1, o = 1; i > o; o++) a[o][t] && a[o][t] == e[t] && (n = !0);
            n || (r[t] = e[t])
        }
        return r
    }

    function N() {
        var e, t = arguments,
            n = t[0] || {},
            r = 1,
            o = t.length,
            i = !1;
        for ("boolean" == typeof n && (i = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : U(n)) || l(n) || (n = {}); o > r; ++r)
            if (null != (e = t[r]))
                for (var a in e) {
                    var s = n[a],
                        u = e[a];
                    n !== u && (i && u && "object" === ("undefined" == typeof u ? "undefined" : U(u)) && !u.nodeType ? n[a] = N(i, s || (null != u.length ? [] : {}), u) : void 0 !== u && (n[a] = u))
                }
        return n
    }

    function R(e) {
        window.templates = window.templates || {}, N(window.templates, e)
    }

    function I(e, t) {
        var n = window.templates = window.templates || {},
            r = n[e];
        return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
    }

    function F(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : U(e))) return !1;
        var t = {},
            n = function(t) {
                return geByTag(t, e)
            },
            r = function(n, r) {
                if (r.name)
                    if ("text" != r.type && r.type)
                        if (r.getAttribute("bool")) {
                            var o = val(r);
                            if (!o || "0" === o) return;
                            t[r.name] = 1
                        } else t[r.name] = browser.msie && !r.value && e[r.name] ? e[r.name].value : r.value;
                else t[r.name] = val(r)
            };
        return T(n("input"), function(e, t) {
            return "radio" != t.type && "checkbox" != t.type || t.checked ? r(e, t) : void 0
        }), T(n("select"), r), T(n("textarea"), r), t
    }

    function A(e, t) {
        for (var n, r = t ? z : H, o = []; e && (n = e.match(r));) {
            e = e.substr(n.index + n[0].length);
            var i = 0;
            n[4] || (i = 7), o.push({
                url: n[2 + i],
                query: n[5 + i] || "",
                domain: n[4 + i]
            })
        }
        return o
    }

    function D() {
        return window.devicePixelRatio >= 2
    }

    function j(e) {
        var t = 0,
            n = 0,
            r = e.ownerDocument || e.document,
            o = r.defaultView || r.parentWindow,
            i = o.getSelection();
        if (i.rangeCount > 0) {
            var a = o.getSelection().getRangeAt(0),
                s = a.cloneRange();
            s.selectNodeContents(e), s.setEnd(a.startContainer, a.startOffset), t = s.toString().length, s.setEnd(a.endContainer, a.endOffset), n = s.toString().length
        }
        return [t, n]
    }

    function B(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.kLimit || 1e3,
            r = t.mLimit || 1e6;
        return e >= r && !t.noCheck ? (e = g(e / 1e5), e = e > 1e3 ? g(e / 10) : e / 10, B(e, N(t, {
            noCheck: !0
        }), !0) + "M") : e >= n && !t.noCheck ? (e = g(e / 100), e = e > 100 ? g(e / 10) : e / 10, B(e, N(t, {
            noCheck: !0
        }), !0) + "K") : langNumeric(e, "%s", !0).replace(/,/g, ".")
    }
    n.r(t), n.d(t, "vkLocal", function() {
        return r
    }), n.d(t, "lTimeout", function() {
        return o
    }), n.d(t, "rand", function() {
        return i
    }), n.d(t, "irand", function() {
        return a
    }), n.d(t, "isUndefined", function() {
        return s
    }), n.d(t, "isFunction", function() {
        return l
    }), n.d(t, "isArray", function() {
        return u
    }), n.d(t, "isString", function() {
        return c
    }), n.d(t, "isObject", function() {
        return d
    }), n.d(t, "isEmpty", function() {
        return f
    }), n.d(t, "vkNow", function() {
        return p
    }), n.d(t, "vkImage", function() {
        return h
    }), n.d(t, "trim", function() {
        return m
    }), n.d(t, "stripHTML", function() {
        return y
    }), n.d(t, "escapeRE", function() {
        return v
    }), n.d(t, "intval", function() {
        return g
    }), n.d(t, "floatval", function() {
        return _
    }), n.d(t, "positive", function() {
        return w
    }), n.d(t, "isNumeric", function() {
        return b
    }), n.d(t, "winToUtf", function() {
        return k
    }), n.d(t, "replaceEntities", function() {
        return S
    }), n.d(t, "clean", function() {
        return C
    }), n.d(t, "unclean", function() {
        return E
    }), n.d(t, "each", function() {
        return T
    }), n.d(t, "indexOf", function() {
        return x
    }), n.d(t, "inArray", function() {
        return L
    }), n.d(t, "clone", function() {
        return P
    }), n.d(t, "arrayKeyDiff", function() {
        return O
    }), n.d(t, "extend", function() {
        return N
    }), n.d(t, "addTemplates", function() {
        return R
    }), n.d(t, "getTemplate", function() {
        return I
    }), n.d(t, "serializeForm", function() {
        return F
    }), n.d(t, "extractUrls", function() {
        return A
    }), n.d(t, "isRetina", function() {
        return D
    }), n.d(t, "getCaretCharacterOffsetWithin", function() {
        return j
    }), n.d(t, "formatCount", function() {
        return B
    }), n.d(t, "encodeHtml", function() {
        return K
    }), n.d(t, "decodeHtml", function() {
        return Y
    });
    var M = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    o = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (o) throw i
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
        U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    window.PageID = window.PageID || 1;
    var H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        z = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i,
        W = function() {
            var e = null;
            return [function(t) {
                return e || (e = se("<span> </span>")), e.innerText = t, e.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }, function(t) {
                return e || (e = se("<span> </span>")), e.innerHTML = t, e.innerText
            }]
        }(),
        V = M(W, 2),
        K = V[0],
        Y = V[1];
    window.isRetina = D, window.extractUrls = A, window.serializeForm = F, window.addTemplates = R, window.getTemplate = I, window.rand = i, window.irand = a, window.isUndefined = s, window.isFunction = l, window.isArray = u, window.isString = c, window.isObject = d, window.isEmpty = f, window.vkNow = p, window.vkImage = h, window.trim = m, window.stripHTML = y, window.escapeRE = v, window.intval = g, window.floatval = _, window.positive = w, window.isNumeric = b, window.winToUtf = k, window.replaceEntities = S, window.clean = C, window.unclean = E, window.each = T, window.indexOf = x, window.inArray = L, window.clone = P, window.arrayKeyDiff = O, window.extend = N, window.vkLocal = r, window.lTimeout = o, window.getCaretCharacterOffsetWithin = j, window.formatCount = B, window.encodeHtml = K, window.decodeHtml = Y
}, function(e, t, n) {
    e.exports = n(32)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.story,
            n = t.getReplies(),
            r = t.getViews() || "",
            i = t.getCurStoryData(),
            a = i.can_manage,
            s = n.count || "";
        if (!a || !r && !s) return null;
        var l = function(e) {
            t.showFeedbackTooltip(), e.stopPropagation()
        };
        return o.createElement("div", {
            className: "stories_button views _views_button",
            onClick: l
        }, r && o.createElement("div", {
            className: "stories_button_views"
        }, r), s && o.createElement("div", {
            className: "stories_button_replies",
            dangerouslySetInnerHTML: {
                __html: langNumeric(s, "%s", !0)
            }
        }))
    }
    n.r(t), n.d(t, "default", function() {
        return r
    });
    var o = n(42);
    n(41)
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "MODULE", function() {
        return r
    });
    var r = "group_personal_card"
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return e && t ? e === t ? !0 : o(e) ? !1 : o(t) ? r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(16 & e.compareDocumentPosition(t)) : !1 : !1
    }
    var o = n(33);
    e.exports = r
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(11),
        o = n(10),
        i = n(21),
        a = n(26),
        s = n(16),
        l = n(18),
        u = n(27),
        c = n(2),
        d = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    o = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (o) throw i
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
        f = o.Promise;
    window.Stories = {
        show: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            e.match(/story/) && (e = this._parseList(e)), this.getList(e).then(function(e) {
                var n = e.storyOwner,
                    o = e.list,
                    i = e.items,
                    s = e.extra;
                a.addLayer(new r["default"](n, o, i, s, t), t)
            })["catch"](function(e) {
                vk.dev && debugLog(e), showFastBox(Object(l.getLang)("global_error"), Object(l.getLang)("global_unknown_error"))
            })
        },
        _getUnreadStory: function(e, t) {
            e = intval(e);
            for (var n = !1, r = 0; r < t.length; r++)
                if (t[r].author.id === e) {
                    for (var o = t[r].items, i = 0; i < o.length; i++)
                        if (o[i].unread) {
                            n = o[i];
                            break
                        }
                    n || (n = o[0]);
                    break
                }
            return n
        },
        getList: function(e, t) {
            return new f(function(n, r) {
                var o = e.split("/"),
                    i = d(o, 3),
                    a = i[0],
                    s = i[1],
                    l = i[2],
                    u = {
                        storyOwner: a,
                        list: s,
                        extra: l
                    },
                    f = Stories._getList(s);
                isArray(f) ? (u.items = f, n(u)) : ajax.post("al_stories.php", {
                    act: "get_list",
                    list: s,
                    story_raw: a,
                    extra: l,
                    from_manage: window.cur.module === c.STORIES_MANAGE_MODULE ? 1 : 0
                }, {
                    loader: !t,
                    onDone: function(e) {
                        cur["stories_list_" + s] = e, u.items = e, n(u)
                    },
                    onFail: function() {
                        return r(), !0
                    }
                })
            })
        },
        _getList: function(e) {
            return cur["stories_list_" + e]
        },
        _setList: function(e, t) {
            cur["stories_list_" + e] = t
        },
        removeList: function(e) {
            delete cur["stories_list_" + e]
        },
        _parseList: function(e) {
            e = decodeURIComponent(e);
            var t = e.match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\=\;\-]+))?$/i),
                n = d(t, 7),
                r = n[1],
                o = n[2],
                i = n[4],
                a = n[6],
                s = r + "_" + o;
            return e.match(/from_feed\=1/) ? i = "feed" : e.match(/profile\=1/) ? i = "profile" : i || (i = s), s + "/" + i + "/" + a
        },
        initFeed: function() {
            function e() {
                addEvent(n, browserFeatures.wheelEvent, Stories.feedMouseWheel)
            }

            function t() {
                removeEvent(n, browserFeatures.wheelEvent, Stories.feedMouseWheel)
            }
            var n = Object(s.ge)("stories_feed_items_container");
            Stories.updateFeedArrows(), addEvent(n, "mouseenter", e), addEvent(n, "mouseleave", t), cur.destroy.push(function() {
                removeEvent(n, browserFeatures.wheelEvent, Stories.feedMouseWheel), removeEvent(n, "mouseenter", e), removeEvent(n, "mouseleave", t)
            })
        },
        feedNext: function() {
            return this.feedPaging("next")
        },
        feedPrev: function() {
            return this.feedPaging("prev")
        },
        feedPaging: function(e, t) {
            var n = Object(s.geByClass1)("stories_feed_wrap"),
                r = Object(s.ge)("stories_feed_items"),
                o = getSize(n)[0],
                i = cur.storiesPos || 0,
                a = 100;
            if (isNumeric(e)) i += e;
            else {
                var l = o - a;
                "next" === e ? i += l : i -= l
            }
            cur.storiesPos = Math.max(0, Math.min(i, r.scrollWidth - o)), t ? Object(s.removeClass)(r, "animated") : Object(s.addClass)(r, "animated"), setStyle(r, "transform", "translateX(-" + cur.storiesPos + "px)"), Stories.updateFeedArrows()
        },
        feedScrollToOwner: function(e) {
            var t = Object(s.ge)("stories_feed_items"),
                n = t.offsetWidth,
                r = Object(s.ge)("feed_story_" + e);
            if (r) {
                var o = r.offsetWidth,
                    i = r.offsetLeft;
                cur.storiesPos = i - n + n / 2 + o / 2, Stories.feedPaging(0, !0)
            }
        },
        updateFeedStories: function(e, t) {
            var n = this;
            if (e = e || "news", Object(s.ge)("stories_feed_items")) {
                if ("news" !== e) return void hide("stories_feed_wrap");
                var r = function(e, t) {
                    n._setList("feed", t);
                    var r = Object(s.ge)("stories_feed_items");
                    r && (e ? (setStyle(r, "transform", "translateX(0px)"), Object(s.val)(r, e), r.children.length < 6 ? Object(s.addClass)("stories_feed_wrap", "stories_feed_not_nav_buttons") : Object(s.removeClass)("stories_feed_wrap", "stories_feed_not_nav_buttons")) : re("stories_feed_wrap"), cur.storiesPos = 0, Stories.updateFeedArrows(), show("stories_feed_wrap"))
                };
                if (t && t.stories) {
                    var o = t.stories,
                        i = o.html,
                        a = o.js;
                    return void r(i, a)
                }
                ajax.post("al_stories.php", {
                    act: "feed_stories"
                }, {
                    onDone: r
                })
            }
        },
        feedMouseWheel: function(e) {
            if (!hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) {
                cancelEvent(e);
                var t = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                Stories.feedPaging(t, 1)
            }
        },
        updateFeedArrows: function() {
            var e = Object(s.ge)("stories_feed_items");
            if (e) {
                cur.storiesPos || (cur.storiesPos = 0);
                var t = Object(s.geByClass1)("stories_feed_wrap").offsetWidth,
                    n = e.scrollWidth - t;
                0 === cur.storiesPos ? Object(s.addClass)("stories_feed_arrow_left", "disabled") : Object(s.removeClass)("stories_feed_arrow_left", "disabled"), cur.storiesPos === n || 0 >= n ? Object(s.addClass)("stories_feed_arrow_right", "disabled") : Object(s.removeClass)("stories_feed_arrow_right", "disabled")
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
        blackListItemClick: function(e, t) {
            cancelEvent(t);
            var n = intval(attr(e, "data-id"));
            cur.storiesBlackListShown[n] ? (delete cur.storiesBlackListShown[n], Object(s.removeClass)(e, "olist_item_wrap_on")) : (cur.storiesBlackListShown[n] = 1, Object(s.addClass)(e, "olist_item_wrap_on"))
        },
        saveBlackList: function(e) {
            var t = Object.keys(cur.storiesBlackListShown);
            return 0 === t.length ? void curBox().hide() : void ajax.post("al_stories.php", {
                act: "save_blacklist",
                hash: cur.storiesBlackList.hash,
                list: t.join(",")
            }, {
                onDone: function() {
                    curBox().hide(), Stories.updateFeedStories()
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        },
        blacklistUpdateUsers: function(e) {
            var t = e;
            if (e = trim(e).toLowerCase(), cur.storiesBlacklistLastQ !== e) {
                cur.storiesBlacklistLastQ = e;
                var n = e ? cur.storiesIndexer.search(e) : cur.storiesBlackList.users,
                    r = [];
                if (e)
                    for (var o = 0; o < e.length; o++) r.push(e.substr(o, 1));
                for (var i = new RegExp(r.join(".*?"), "i"), a = "", u = 0; u < n.length; u++) {
                    var c = n[u],
                        d = e ? c.name.replace(i, function(e) {
                            return "<em>" + e + "</em>"
                        }) : c.name;
                    a += cur.storiesBlackList.tpl.replace(/\{id\}/g, c.id).replace("{photo}", c.photo).replace("{name}", d).replace("{href}", c.href).replace("{class_name}", cur.storiesBlackListShown[c.id] ? " olist_item_wrap_on" : "")
                }
                a || (a = '<div class="no_rows">' + Object(l.getLang)("global_search_not_found").replace("{search}", clean(t)) + "</div>"), Object(s.val)(Object(s.geByClass1)("olist", "stories_black_list_result"), a)
            }
        },
        blackListInit: function(e) {
            cur.storiesBlackListShown = {}, cur.storiesBlackList = e, curBox().setOptions({
                width: 450,
                bodyStyle: "padding: 0px",
                onClean: function() {
                    this.storyLayer && this.storyLayer.playStory(), cur.storiesBlackListScroll && cur.storiesBlackListScroll.destroy()
                }
            }).removeButtons(), cur.storiesBlackList.users.length ? (cur.storiesBlacklistLastQ = !1, cur.storiesIndexer = new vkIndexer(cur.storiesBlackList.users, function(e) {
                return e.name
            }, function() {
                Stories.blacklistUpdateUsers("")
            }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), curBox().addButton(Object(l.getLang)("global_save"), Stories.saveBlackList).addButton(Object(l.getLang)("global_cancel"), void 0, "no")) : curBox().addButton(Object(l.getLang)("global_close"))
        },
        preloadUrl: function(e) {
            Object(i.loadMedia)(e)
        },
        showNextRepliesChunk: function(e) {
            var t = gpeByClass("stories_feedback_replies_items", e);
            Object(s.removeClass)(Object(s.geByClass1)("stories_replies_chunk_hidden", t), "stories_replies_chunk_hidden");
            var n = Object(s.geByClass1)("stories_replies_chunk_hidden", t);
            n ? Object(s.val)(e, langNumeric(Object(l.getLang)("stories_replies_more_button", intval(attr(n, "data-size"))))) : re(e), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.feedbackTooltipReInitHeaders(), cur.storyLayer && cur.storyLayer.activeStory && cur.storyLayer.activeStory.updateFeedbackTTPos()
        },
        groupStoriesBlockUpdate: function() {
            var e = Stories._getList("group_stories"),
                t = e && e[0] && e[0].items;
            if (t) {
                for (var n = 0, r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.unread && n++
                }
                var i = Object(s.geByClass1)("stories_groups_block_stories_wrap"),
                    a = Object(s.geByClass1)("stories_groups_block_stories_button", i);
                Object(s.toggleClass)(i, "has_unread", n > 0), Object(s.toggleClass)(i, "has_stories", t.length > 0), Object(s.toggleClass)(a, "has_stories", t.length > 0);
                var l = Object(u.clone)(cur.storiesPreviews),
                    c = l.splice(l.length - n, 3);
                c.length < 3 && (c = c.concat(l.slice(0, 3 - c.length))), c.reverse();
                for (var d = "", f = c.length - 1; f >= 0; f--) d += cur.storiesPreviewsRowHtml.replace("{url}", c[f]);
                Object(s.val)(Object(s.geByClass1)("stories_groups_block_stories_rows", i), d)
            }
        }
    };
    try {
        stManager.done("stories.js")
    } catch (p) {}
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return o(e) && 3 == e.nodeType
    }
    var o = n(35);
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i, a, s, l) {
        if (o(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [n, r, i, a, s, l],
                    d = 0;
                u = new Error(t.replace(/%s/g, function() {
                    return c[d++]
                })), u.name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
    var o = function(e) {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e ? e.ownerDocument || e : document,
            n = t.defaultView || window;
        return !(!e || !("function" == typeof n.Node ? e instanceof n.Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
    }
    e.exports = r
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

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    n.r(t);
    var o = function() {
        function e(t, n) {
            r(this, e), this.data = t, this.opts = n, this.paused = !0, this.loaded = !1;
            var o = t.is_expired,
                i = t.is_deleted,
                a = t.can_view_deleted,
                s = t.is_private;
            a || (o ? this._error("expired") : i ? this._error("deleted") : s && this._error("private"), (o || i || s) && (this.failed = !0))
        }
        return e.prototype.render = function() {
            var e = this;
            this._isFailed() || (this.longLoadingTimer = setTimeout(function() {
                e.isLoaded() || e.opts.onLongLoading()
            }, 1e3))
        }, e.prototype.play = function() {
            this.paused = !1, this.isLoaded() && this.opts.onPlay()
        }, e.prototype.pause = function() {
            this.paused = !0, this.opts.onPause()
        }, e.prototype.setCurrentTime = function() {
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
        }, e.prototype.destroy = function() {
            clearTimeout(this.longLoadingTimer)
        }, e.prototype.isPaused = function() {
            return this.paused
        }, e.prototype.isLoaded = function() {
            return this.loaded
        }, e.prototype.getCurrentTime = function() {
            return 0
        }, e.prototype.getDuration = function() {
            return 0
        }, e.prototype.getId = function() {
            return this.data.raw_id
        }, e.prototype.getDate = function() {
            return this.data.date
        }, e.prototype.getViews = function() {
            return this.data.views
        }, e.prototype.getReplies = function() {
            return this.data.answers ? this.data.answers : {
                count: "",
                count_str: "",
                users: []
            }
        }, e.prototype.setViews = function(e) {
            this.data.views = e
        }, e.prototype.setReplies = function(e) {
            this.data.answers = e
        }, e.prototype._onCanPlay = function() {
            if (clearTimeout(this.longLoadingTimer), this.loaded = !0, this.opts.onLoadingEnd(), !this.isPaused()) {
                var e = document.visibilityState;
                if (e && "visible" !== e) return;
                this.play()
            }
        }, e.prototype._loadingError = function() {
            this._error("load")
        }, e.prototype._error = function(e) {
            clearTimeout(this.longLoadingTimer), this.opts.onError(e)
        }, e.prototype._isFailed = function() {
            return this.failed
        }, e
    }();
    t["default"] = o
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }

    function o() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; 10 > n; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var o = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                o[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, o)).join("") ? !1 : !0
        } catch (i) {
            return !1
        }
    }
    var i = Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable;
    e.exports = o() ? Object.assign : function(e, t) {
        for (var n, o, l = r(e), u = 1; u < arguments.length; u++) {
            n = Object(arguments[u]);
            for (var c in n) a.call(n, c) && (l[c] = n[c]);
            if (i) {
                o = i(n);
                for (var d = 0; d < o.length; d++) s.call(n, o[d]) && (l[o[d]] = n[o[d]])
            }
        }
        return l
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }

    function o() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; 10 > n; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var o = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                o[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, o)).join("") ? !1 : !0
        } catch (i) {
            return !1
        }
    }
    var i = Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        s = Object.prototype.propertyIsEnumerable;
    e.exports = o() ? Object.assign : function(e, t) {
        for (var n, o, l = r(e), u = 1; u < arguments.length; u++) {
            n = Object(arguments[u]);
            for (var c in n) a.call(n, c) && (l[c] = n[c]);
            if (i) {
                o = i(n);
                for (var d = 0; d < o.length; d++) s.call(n, o[d]) && (l[o[d]] = n[o[d]])
            }
        }
        return l
    }
}, function(e, t, n) {
    "use strict";
    var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    e.exports = r
}, function(e, t, n) {
    e.exports = n(25)()
}, function(e, t, n) {
    "use strict";
    e.exports = n(8)
}, function(e, t, n) {
    "use strict";

    function r() {
        if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
        } catch (e) {
            console.error(e)
        }
    }
    r(), e.exports = n(22)
}]);