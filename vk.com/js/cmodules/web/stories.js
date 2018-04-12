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
    }, t.p = "", t(t.s = 140)
}({
    103: function(e, t, n) {
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
    },
    105: function(e, t, n) {
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
    },
    115: function(e, t, n) {
        "use strict";

        function r(e) {
            for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
            throw t = Error(n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."), t.name = "Invariant Violation", t.framesToPop = 1, t
        }

        function o(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || L
        }

        function i(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || L
        }

        function a() {}

        function s(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || L
        }

        function l(e, t, n) {
            var r, o = {},
                i = null,
                a = null;
            if (null != t)
                for (r in void 0 !== t.ref && (a = t.ref), void 0 !== t.key && (i = "" + t.key), t) I.call(t, r) && !A.hasOwnProperty(r) && (o[r] = t[r]);
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
                _owner: N.current
            }
        }

        function u(e) {
            return "object" == typeof e && null !== e && e.$$typeof === k
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
                var o = D.pop();
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

        function p(e) {
            e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > D.length && D.push(e)
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
                        case C:
                        case E:
                            a = !0
                    }
            }
            if (a) return n(o, e, "" === t ? "." + h(e, 0) : t), 1;
            if (a = 0, t = "" === t ? "." : t + ":", Array.isArray(e))
                for (var s = 0; s < e.length; s++) {
                    i = e[s];
                    var l = t + h(i, s);
                    a += f(i, l, n, o)
                } else if (null === e || "undefined" == typeof e ? l = null : (l = x && e[x] || e["@@iterator"], l = "function" == typeof l ? l : null), "function" == typeof l)
                    for (e = l.call(e), s = 0; !(i = e.next()).done;) i = i.value, l = t + h(i, s++), a += f(i, l, n, o);
                else "object" === i && (n = "" + e, r("31", "[object Object]" === n ? "object with keys {" + Object.keys(e).join(", ") + "}" : n, ""));
            return a
        }

        function h(e, t) {
            return "object" == typeof e && null !== e && null != e.key ? c(e.key) : t.toString(36)
        }

        function y(e, t) {
            e.func.call(e.context, t, e.count++)
        }

        function m(e, t, n) {
            var r = e.result,
                o = e.keyPrefix;
            e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? v(e, r, n, w.thatReturnsArgument) : null != e && (u(e) && (t = o + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(R, "$&/") + "/") + n, e = {
                $$typeof: k,
                type: e.type,
                key: t,
                ref: e.ref,
                props: e.props,
                _owner: e._owner
            }), r.push(e))
        }

        function v(e, t, n, r, o) {
            var i = "";
            null != n && (i = ("" + n).replace(R, "$&/") + "/"), t = d(t, i, r, o), null == e || f(e, "", m, t), p(t)
        }
        var g = n(3),
            _ = n(224),
            w = n(142),
            b = "function" == typeof Symbol && Symbol["for"],
            k = b ? Symbol["for"]("react.element") : 60103,
            S = b ? Symbol["for"]("react.call") : 60104,
            C = b ? Symbol["for"]("react.return") : 60105,
            E = b ? Symbol["for"]("react.portal") : 60106,
            T = b ? Symbol["for"]("react.fragment") : 60107,
            x = "function" == typeof Symbol && Symbol.iterator,
            L = {
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
        }, a.prototype = o.prototype;
        var O = i.prototype = new a;
        O.constructor = i, g(O, o.prototype), O.isPureReactComponent = !0;
        var P = s.prototype = new a;
        P.constructor = s, g(P, o.prototype), P.unstable_isAsyncReactComponent = !0, P.render = function() {
            return this.props.children
        };
        var N = {
                current: null
            },
            I = Object.prototype.hasOwnProperty,
            A = {
                key: !0,
                ref: !0,
                __self: !0,
                __source: !0
            },
            R = /\/+/g,
            D = [],
            F = {
                Children: {
                    map: function(e, t, n) {
                        if (null == e) return e;
                        var r = [];
                        return v(e, r, null, t, n), r
                    },
                    forEach: function(e, t, n) {
                        return null == e ? e : (t = d(null, null, t, n), null == e || f(e, "", y, t), void p(t))
                    },
                    count: function(e) {
                        return null == e ? 0 : f(e, "", w.thatReturnsNull, null)
                    },
                    toArray: function(e) {
                        var t = [];
                        return v(e, t, null, w.thatReturnsArgument), t
                    },
                    only: function(e) {
                        return u(e) ? void 0 : r("143"), e
                    }
                },
                Component: o,
                PureComponent: i,
                unstable_AsyncComponent: s,
                Fragment: T,
                createElement: l,
                cloneElement: function(e, t, n) {
                    var r = g({}, e.props),
                        o = e.key,
                        i = e.ref,
                        a = e._owner;
                    if (null != t) {
                        if (void 0 !== t.ref && (i = t.ref, a = N.current), void 0 !== t.key && (o = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
                        for (l in t) I.call(t, l) && !A.hasOwnProperty(l) && (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l])
                    }
                    var l = arguments.length - 2;
                    if (1 === l) r.children = n;
                    else if (l > 1) {
                        s = Array(l);
                        for (var u = 0; l > u; u++) s[u] = arguments[u + 2];
                        r.children = s
                    }
                    return {
                        $$typeof: k,
                        type: e.type,
                        key: o,
                        ref: i,
                        props: r,
                        _owner: a
                    }
                },
                createFactory: function(e) {
                    var t = l.bind(null, e);
                    return t.type = e, t
                },
                isValidElement: u,
                version: "16.2.0",
                __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                    ReactCurrentOwner: N,
                    assign: g
                }
            },
            M = Object.freeze({
                "default": F
            }),
            j = M && F || M;
        e.exports = j["default"] ? j["default"] : j
    },
    133: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MODULE", function() {
            return r
        });
        var r = "user_personal_card"
    },
    140: function(e, t, n) {
        e.exports = n(183)
    },
    142: function(e, t, n) {
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
    },
    146: function(e, t) {
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
            y && f && (y = !1, f.length ? h = f.concat(h) : m = -1, h.length && s())
        }

        function s() {
            if (!y) {
                var e = o(a);
                y = !0;
                for (var t = h.length; t;) {
                    for (f = h, h = []; ++m < t;) f && f[m].run();
                    m = -1, t = h.length
                }
                f = null, y = !1, i(e)
            }
        }

        function l(e, t) {
            this.fun = e, this.array = t
        }

        function u() {}
        var c, d, p = e.exports = {};
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
        var f, h = [],
            y = !1,
            m = -1;
        p.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            h.push(new l(e, t)), 1 !== h.length || y || o(s)
        }, l.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = u, p.addListener = u, p.once = u, p.off = u, p.removeListener = u, p.removeAllListeners = u, p.emit = u, p.prependListener = u, p.prependOnceListener = u, p.listeners = function(e) {
            return []
        }, p.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, p.cwd = function() {
            return "/"
        }, p.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, p.umask = function() {
            return 0
        }
    },
    147: function(e, t, n) {
        "use strict";

        function r(e, t) {
            return e && t ? e === t ? !0 : o(e) ? !1 : o(t) ? r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(16 & e.compareDocumentPosition(t)) : !1 : !1
        }
        var o = n(148);
        e.exports = r
    },
    148: function(e, t, n) {
        "use strict";

        function r(e) {
            return o(e) && 3 == e.nodeType
        }
        var o = n(2);
        e.exports = r
    },
    15: function(e, t) {},
    168: function(e, t, n) {
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

        function p(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function f() {
            return +new Date
        }

        function h() {
            return window.Image ? new Image : ce("img")
        }

        function y(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        }

        function m(e) {
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

        function O(e, t) {
            var n = d(e) || "undefined" == typeof e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === j(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = O(e[r]) : n[r] = e[r]);
            return n
        }

        function P(e) {
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
            for ("boolean" == typeof n && (i = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : j(n)) || l(n) || (n = {}); o > r; ++r)
                if (null != (e = t[r]))
                    for (var a in e) {
                        var s = n[a],
                            u = e[a];
                        n !== u && (i && u && "object" === ("undefined" == typeof u ? "undefined" : j(u)) && !u.nodeType ? n[a] = N(i, s || (null != u.length ? [] : {}), u) : void 0 !== u && (n[a] = u))
                    }
            return n
        }

        function I(e) {
            window.templates = window.templates || {}, N(window.templates, e)
        }

        function A(e, t) {
            var n = window.templates = window.templates || {},
                r = n[e];
            return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
        }

        function R(e) {
            if ("object" != ("undefined" == typeof e ? "undefined" : j(e))) return !1;
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

        function D(e, t) {
            for (var n, r = t ? H : B, o = []; e && (n = e.match(r));) {
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

        function F() {
            return window.devicePixelRatio >= 2
        }

        function M(e) {
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
            return p
        }), n.d(t, "vkNow", function() {
            return f
        }), n.d(t, "vkImage", function() {
            return h
        }), n.d(t, "trim", function() {
            return y
        }), n.d(t, "stripHTML", function() {
            return m
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
            return O
        }), n.d(t, "arrayKeyDiff", function() {
            return P
        }), n.d(t, "extend", function() {
            return N
        }), n.d(t, "addTemplates", function() {
            return I
        }), n.d(t, "getTemplate", function() {
            return A
        }), n.d(t, "serializeForm", function() {
            return R
        }), n.d(t, "extractUrls", function() {
            return D
        }), n.d(t, "isRetina", function() {
            return F
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return M
        });
        var j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        window.PageID = window.PageID || 1;
        var B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            H = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
        window.isRetina = F, window.extractUrls = D, window.serializeForm = R, window.addTemplates = I, window.getTemplate = A, window.rand = i, window.irand = a, window.isUndefined = s, window.isFunction = l, window.isArray = u, window.isString = c, window.isObject = d, window.isEmpty = p, window.vkNow = f, window.vkImage = h, window.trim = y, window.stripHTML = m, window.escapeRE = v, window.intval = g, window.floatval = _, window.positive = w, window.isNumeric = b, window.winToUtf = k, window.replaceEntities = S, window.clean = C, window.unclean = E, window.each = T, window.indexOf = x, window.inArray = L, window.clone = O, window.arrayKeyDiff = P, window.extend = N, window.vkLocal = r, window.lTimeout = o, window.getCaretCharacterOffsetWithin = M
    },
    17: function(e, t, n) {
        "use strict";

        function r() {
            if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
            } catch (e) {
                console.error(e)
            }
        }
        r(), e.exports = n(204)
    },
    170: function(e, t, n) {
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
        var a = n(272),
            s = n(103),
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
    },
    173: function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(t);
        var o = n(247),
            i = n(17),
            a = n(85),
            s = n(103),
            l = n(29),
            u = n(79),
            c = n(170),
            d = n(49),
            p = n(197),
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
            h = window,
            y = h.radioBtns,
            m = h.getLang,
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
            O = h.curBox,
            P = h.showBox,
            N = h.extend,
            I = function() {
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
                }, e.prototype.updateBottom = function() {
                    var e = C("stories_bottom_wrap", this.wrapEl);
                    this.isActive ? i.render(o.createElement(u["default"], {
                        story: this
                    }), e) : (i.unmountComponentAtNode(e), val(e, ""))
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
                        var t = m(hasClass(e.followBtn, "followed") ? "stories_unfollow" : "stories_follow");
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
                    return O() || this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply") ? !0 : !1
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
                    this.fillTimeLine(), val(this.dateEl, e.is_ads ? m("stories_is_ad") : this.story.getDate()), this.opts.onStartStory(), S(this.wrapEl, "stories_can_comment", e.can_comment === !0), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), this.data.author.can_follow && !this.data.is_promo && this.authorButtons.appendChild(this._renderFollowButton()), this._destroyFeedBackTT(), this.updateBottom(), this.contWrap.appendChild(this.story.render())
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
                        this.updateBottom(), window.tooltips && tooltips.hideAll(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), cancelAnimationFrame(this.timeLineAnim);
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
                        title: m("global_warning"),
                        onHide: function() {
                            e.playStory()
                        }
                    }, m("stories_remove_warning"), m("stories_remove_confirm"), this.removeStory.bind(this), m("global_cancel"))
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
                            window.cur.module === p.STORIES_MANAGE_MODULE && window.GeStories.storyDidRemove(r, e), O().hide(), t._popStoryAndClearList(n)
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
                    this.opts.onStoryRemoved(e);
                }, e.prototype.shareBox = function() {
                    var e = this;
                    this.pauseStory(), P("like.php", {
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
                            n._showMessage(m("stories_answer_sent")).then(function() {
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
                        title: m("stories_add_blacklist_title"),
                        onHide: function() {
                            cur.storyLayer && cur.storyLayer.playStory()
                        }
                    }, m(this.getOwnerId() < 0 ? "stories_add_blacklist_message_group" : "stories_add_blacklist_message"), m("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), m("global_cancel"))
                }, e.prototype._doAddToBlacklist = function(e) {
                    var t = this;
                    ajax.post("al_stories.php", {
                        act: "blacklist_add",
                        owner_id: this.getOwnerId(),
                        hash: this.data.blacklist_hash,
                        source_story: this.getRawId()
                    }, {
                        onDone: function() {
                            t.data.can_blacklist = !1, O().hide(), t.opts.removeList(), t._remove()
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
                                n = m("stories_error_cant_load"), r = ce("div", {
                                    className: "stories_error_button",
                                    innerHTML: m("stories_try_again")
                                }), w(r, "click", function() {
                                    t._destroyStory(), t.playStory()
                                });
                                break;
                            case "expired":
                                n = m("stories_error_expired");
                                break;
                            case "deleted":
                                n = m("stories_error_deleted");
                                break;
                            case "private":
                                n = m("stories_error_private");
                                break;
                            default:
                                n = m("global_unknown_error")
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
                                e.data.author.can_follow && e._sendStatEvent("follow"), e.data.author.can_follow = !e.data.author.can_follow, S(e.followBtn, "followed", !e.data.author.can_follow), e._showMessage(m(e.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(function() {
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
                        t = f(e, 2),
                        n = t[0],
                        r = t[1],
                        o = getXY(this.wrapEl),
                        i = f(o, 2),
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
                    return i ? (b(u, "deleted"), c = m("stories_deleted_story")) : a && (b(u, "private"), c = m("stories_private_story")), c && (val(C("stories_reply_to_error_msg", u), c), re(C("stories_reply_to_owner_name_wrap", u))), u
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
                                }, r, o) : e._showMessage(m("stories_mask_sent")).then(function() {
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
                    e && e.tt && (e.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1)
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
                        title: m("global_warning"),
                        onHide: function() {
                            e.playStory()
                        }
                    }, m("stories_hide_reply_warning"), m("global_continue"), this._doHideReply.bind(this), m("global_cancel"))
                }, e.prototype._doHideReply = function() {
                    var e = this;
                    this.pauseStory(), b(this.wrapEl, "hiding_reply"), O().hide();
                    var t = this.getIndex(),
                        n = this.data.author.gender,
                        r = x('<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">' + getProgressHtml() + '</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">' + m("stories_reply_hidden") + '</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">' + m("stories_hide_reply_continue") + '</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">' + langSex(n, window.lang.stories_hide_all_replies) + '</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">' + m("stories_reply_add_to_blacklist") + "</div>\n  </div>\n</div>");
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
                        title: m("global_warning")
                    }, m("stories_delete_all_replies_confirm").replace("{name}", e), m("global_continue"), this._doHideAllReplies.bind(this), m("global_cancel"))
                }, e.prototype._doHideAllReplies = function(e) {
                    var t = this;
                    ajax.post("al_stories.php", {
                        act: "hide_all_replies",
                        owner_id: this.getOwnerId(),
                        hash: this.data.reply_hide_hash
                    }, {
                        onDone: function() {
                            O().hide(), t.opts.removeList(), t.data.items = [];
                            var e = C("_stories_hide_replies", t.contWrap);
                            val(e, m("stories_all_replies_hidden")), b(e, "disabled")
                        },
                        showProgress: v.pbind(e),
                        hideProgress: g.pbind(e)
                    })
                }, e.prototype._ban = function() {
                    var e = this.data.author.first_name_gen;
                    showFastBox({
                        title: m("global_warning")
                    }, m("stories_ban_confirm").replace("{name}", e), m("global_continue"), this._doBan.bind(this), m("global_cancel"))
                }, e.prototype._doBan = function(e) {
                    var t = this;
                    ajax.post("al_stories.php", {
                        act: "ban",
                        owner_id: this.getOwnerId(),
                        hash: this.data.stories_ban_hash
                    }, {
                        onDone: function() {
                            O().hide(), t.opts.removeList(), t.data.items = [];
                            var e = C("_stories_reply_ban", t.contWrap);
                            val(e, m("stories_banned")), b(e, "disabled")
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
                        t = P("al_stories.php", {
                            act: "report_box"
                        }, {
                            onDone: function() {
                                var e = E("radiobtn", "stories_report");
                                y.stories_report = {
                                    val: 0,
                                    els: e
                                }
                            },
                            params: {
                                onClean: function() {
                                    delete y.stories_report, e.playStory()
                                }
                            }
                        });
                    t.removeButtons(), t.addButton(m("box_send"), this._sendReportButtonDidPress.bind(this)), t.addButton(m("global_cancel"), !1, "no")
                }, e.prototype._sendReportButtonDidPress = function(e) {
                    var t = this,
                        n = this.index,
                        r = this.getCurStoryData();
                    ajax.post("al_stories.php", {
                        act: "report",
                        story_raw: this.getRawId(),
                        reason: y.stories_report.val,
                        hash: r.report_hash
                    }, {
                        onDone: function() {
                            O().hide(), t._popStoryAndClearList(n), showDoneBox(m("stories_report_sent"), {
                                className: "stories_done_msg"
                            })
                        },
                        showProgress: v.pbind(e),
                        hideProgress: g.pbind(e)
                    })
                }, e
            }();
        t["default"] = I
    },
    175: function(e, t, n) {
        "use strict";
        var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        e.exports = r
    },
    178: function(e, t, n) {
        "use strict";

        function r(e) {
            try {
                e.focus()
            } catch (t) {}
        }
        e.exports = r
    },
    180: function(e, t, n) {
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
    },
    183: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(51),
            o = n(294),
            i = n(85),
            a = n(29),
            s = n(226),
            l = n(271),
            u = n(168),
            c = n(197),
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
            p = o.Promise;
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
                return new p(function(n, r) {
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
                        p = Stories._getList(s);
                    isArray(p) ? (u.items = p, n(u)) : ajax.post("al_stories.php", {
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
            updateFeedStories: function(e) {
                var t = this;
                e = e || "news", Object(s.ge)("stories_feed_items") && ("news" !== e ? hide("stories_feed_wrap") : show("stories_feed_wrap"), ajax.post("al_stories.php", {
                    act: "feed_stories"
                }, {
                    onDone: function(e, n) {
                        t._setList("feed", n);
                        var r = Object(s.ge)("stories_feed_items");
                        r && (e ? (setStyle(r, "transform", "translateX(0px)"), Object(s.val)(r, e), r.children.length < 6 ? Object(s.addClass)("stories_feed_wrap", "stories_feed_not_nav_buttons") : Object(s.removeClass)("stories_feed_wrap", "stories_feed_not_nav_buttons")) : re("stories_feed_wrap"), cur.storiesPos = 0, Stories.updateFeedArrows())
                    }
                }))
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
                    for (var d = "", p = c.length - 1; p >= 0; p--) d += cur.storiesPreviewsRowHtml.replace("{url}", c[p]);
                    Object(s.val)(Object(s.geByClass1)("stories_groups_block_stories_rows", i), d)
                }
            }
        };
        try {
            stManager.done("stories.js")
        } catch (f) {}
    },
    185: function(e, t, n) {
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
    },
    195: function(e, t, n) {
        "use strict";
        var r = n(142),
            o = n(5),
            i = n(175);
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
    },
    197: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "STORIES_MANAGE_MODULE", function() {
            return r
        });
        var r = "stories_manage"
    },
    2: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = e ? e.ownerDocument || e : document,
                n = t.defaultView || window;
            return !(!e || !("function" == typeof n.Node ? e instanceof n.Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
        }
        e.exports = r
    },
    204: function(e, t, n) {
        "use strict";

        function r(e) {
            for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; t > r; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
            throw t = Error(n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."), t.name = "Invariant Violation", t.framesToPop = 1, t
        }

        function o(e, t) {
            return (e & t) === t
        }

        function i(e, t) {
            if (On.hasOwnProperty(e) || 2 < e.length && ("o" === e[0] || "O" === e[0]) && ("n" === e[1] || "N" === e[1])) return !1;
            if (null === t) return !0;
            switch (typeof t) {
                case "boolean":
                    return On.hasOwnProperty(e) ? e = !0 : (t = a(e)) ? e = t.hasBooleanValue || t.hasStringBooleanValue || t.hasOverloadedBooleanValue : (e = e.toLowerCase().slice(0, 5), e = "data-" === e || "aria-" === e), e;
                case "undefined":
                case "number":
                case "string":
                case "object":
                    return !0;
                default:
                    return !1
            }
        }

        function a(e) {
            return Nn.hasOwnProperty(e) ? Nn[e] : null
        }

        function s(e) {
            return e[1].toUpperCase()
        }

        function l(e, t, n, r, o, i, a, s, l) {
            Wn._hasCaughtError = !1, Wn._caughtError = null;
            var u = Array.prototype.slice.call(arguments, 3);
            try {
                t.apply(n, u)
            } catch (c) {
                Wn._caughtError = c, Wn._hasCaughtError = !0
            }
        }

        function u() {
            if (Wn._hasRethrowError) {
                var e = Wn._rethrowError;
                throw Wn._rethrowError = null, Wn._hasRethrowError = !1, e
            }
        }

        function c() {
            if (Kn)
                for (var e in Yn) {
                    var t = Yn[e],
                        n = Kn.indexOf(e);
                    if (n > -1 ? void 0 : r("96", e), !qn[n]) {
                        t.extractEvents ? void 0 : r("97", e), qn[n] = t, n = t.eventTypes;
                        for (var o in n) {
                            var i = void 0,
                                a = n[o],
                                s = t,
                                l = o;
                            $n.hasOwnProperty(l) ? r("99", l) : void 0, $n[l] = a;
                            var u = a.phasedRegistrationNames;
                            if (u) {
                                for (i in u) u.hasOwnProperty(i) && d(u[i], s, l);
                                i = !0
                            } else a.registrationName ? (d(a.registrationName, s, l), i = !0) : i = !1;
                            i ? void 0 : r("98", o, e)
                        }
                    }
                }
        }

        function d(e, t, n) {
            Qn[e] ? r("100", e) : void 0, Qn[e] = t, Xn[e] = t.eventTypes[n].dependencies
        }

        function p(e) {
            Kn ? r("101") : void 0, Kn = Array.prototype.slice.call(e), c()
        }

        function f(e) {
            var t, n = !1;
            for (t in e)
                if (e.hasOwnProperty(t)) {
                    var o = e[t];
                    Yn.hasOwnProperty(t) && Yn[t] === o || (Yn[t] ? r("102", t) : void 0, Yn[t] = o, n = !0)
                }
            n && c()
        }

        function h(e, t, n, r) {
            t = e.type || "unknown-event", e.currentTarget = er(r), Wn.invokeGuardedCallbackAndCatchFirstError(t, n, void 0, e), e.currentTarget = null
        }

        function y(e, t) {
            return null == t ? r("30") : void 0, null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t]
        }

        function m(e, t, n) {
            Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e)
        }

        function v(e, t) {
            if (e) {
                var n = e._dispatchListeners,
                    r = e._dispatchInstances;
                if (Array.isArray(n))
                    for (var o = 0; o < n.length && !e.isPropagationStopped(); o++) h(e, t, n[o], r[o]);
                else n && h(e, t, n, r);
                e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e)
            }
        }

        function g(e) {
            return v(e, !0)
        }

        function _(e) {
            return v(e, !1)
        }

        function w(e, t) {
            var n = e.stateNode;
            if (!n) return null;
            var o = Zn(n);
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

        function b(e, t, n, r) {
            for (var o, i = 0; i < qn.length; i++) {
                var a = qn[i];
                a && (a = a.extractEvents(e, t, n, r)) && (o = y(o, a))
            }
            return o
        }

        function k(e) {
            e && (tr = y(tr, e))
        }

        function S(e) {
            var t = tr;
            tr = null, t && (e ? m(t, g) : m(t, _), tr ? r("95") : void 0, Wn.rethrowCaughtError())
        }

        function C(e) {
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

        function E(e) {
            return 5 === e.tag || 6 === e.tag ? e.stateNode : void r("33")
        }

        function T(e) {
            return e[ar] || null
        }

        function x(e) {
            do e = e["return"]; while (e && 5 !== e.tag);
            return e ? e : null
        }

        function L(e, t, n) {
            for (var r = []; e;) r.push(e), e = x(e);
            for (e = r.length; 0 < e--;) t(r[e], "captured", n);
            for (e = 0; e < r.length; e++) t(r[e], "bubbled", n)
        }

        function O(e, t, n) {
            (t = w(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = y(n._dispatchListeners, t), n._dispatchInstances = y(n._dispatchInstances, e))
        }

        function P(e) {
            e && e.dispatchConfig.phasedRegistrationNames && L(e._targetInst, O, e)
        }

        function N(e) {
            if (e && e.dispatchConfig.phasedRegistrationNames) {
                var t = e._targetInst;
                t = t ? x(t) : null, L(t, O, e)
            }
        }

        function I(e, t, n) {
            e && n && n.dispatchConfig.registrationName && (t = w(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = y(n._dispatchListeners, t), n._dispatchInstances = y(n._dispatchInstances, e))
        }

        function A(e) {
            e && e.dispatchConfig.registrationName && I(e._targetInst, null, e)
        }

        function R(e) {
            m(e, P)
        }

        function D(e, t, n, r) {
            if (n && r) e: {
                for (var o = n, i = r, a = 0, s = o; s; s = x(s)) a++;s = 0;
                for (var l = i; l; l = x(l)) s++;
                for (; a - s > 0;) o = x(o),
                a--;
                for (; s - a > 0;) i = x(i),
                s--;
                for (; a--;) {
                    if (o === i || o === i.alternate) break e;
                    o = x(o), i = x(i)
                }
                o = null
            }
            else o = null;
            for (i = o, o = []; n && n !== i && (a = n.alternate, null === a || a !== i);) o.push(n), n = x(n);
            for (n = []; r && r !== i && (a = r.alternate, null === a || a !== i);) n.push(r), r = x(r);
            for (r = 0; r < o.length; r++) I(o[r], "bubbled", e);
            for (e = n.length; 0 < e--;) I(n[e], "captured", t)
        }

        function F() {
            return !ur && wn.canUseDOM && (ur = "textContent" in document.documentElement ? "textContent" : "innerText"), ur
        }

        function M() {
            if (cr._fallbackText) return cr._fallbackText;
            var e, t, n = cr._startText,
                r = n.length,
                o = j(),
                i = o.length;
            for (e = 0; r > e && n[e] === o[e]; e++);
            var a = r - e;
            for (t = 1; a >= t && n[r - t] === o[i - t]; t++);
            return cr._fallbackText = o.slice(e, t > 1 ? 1 - t : void 0), cr._fallbackText
        }

        function j() {
            return "value" in cr._root ? cr._root.value : cr._root[F()]
        }

        function B(e, t, n, r) {
            this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface;
            for (var o in e) e.hasOwnProperty(o) && ((t = e[o]) ? this[o] = t(n) : "target" === o ? this.target = r : this[o] = n[o]);
            return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? kn.thatReturnsTrue : kn.thatReturnsFalse, this.isPropagationStopped = kn.thatReturnsFalse, this
        }

        function H(e, t, n, r) {
            if (this.eventPool.length) {
                var o = this.eventPool.pop();
                return this.call(o, e, t, n, r), o
            }
            return new this(e, t, n, r)
        }

        function U(e) {
            e instanceof this ? void 0 : r("223"), e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e)
        }

        function z(e) {
            e.eventPool = [], e.getPooled = H, e.release = U
        }

        function V(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function W(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function K(e, t) {
            switch (e) {
                case "topKeyUp":
                    return -1 !== fr.indexOf(t.keyCode);
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

        function Y(e) {
            return e = e.detail, "object" == typeof e && "data" in e ? e.data : null
        }

        function q(e, t) {
            switch (e) {
                case "topCompositionEnd":
                    return Y(t);
                case "topKeyPress":
                    return 32 !== t.which ? null : (Sr = !0, br);
                case "topTextInput":
                    return e = t.data, e === br && Sr ? null : e;
                default:
                    return null
            }
        }

        function $(e, t) {
            if (Cr) return "topCompositionEnd" === e || !hr && K(e, t) ? (e = M(), cr._root = null, cr._startText = null, cr._fallbackText = null, Cr = !1, e) : null;
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
                    return wr ? null : t.data;
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

        function X(e) {
            xr ? Lr ? Lr.push(e) : Lr = [e] : xr = e
        }

        function G() {
            if (xr) {
                var e = xr,
                    t = Lr;
                if (Lr = xr = null, Q(e), t)
                    for (e = 0; e < t.length; e++) Q(t[e])
            }
        }

        function Z(e, t) {
            return e(t)
        }

        function J(e, t) {
            if (Nr) return Z(e, t);
            Nr = !0;
            try {
                return Z(e, t)
            } finally {
                Nr = !1, G()
            }
        }

        function ee(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return "input" === t ? !!Ir[e.type] : "textarea" === t ? !0 : !1
        }

        function te(e) {
            return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
        }

        function ne(e, t) {
            if (!wn.canUseDOM || t && !("addEventListener" in document)) return !1;
            t = "on" + e;
            var n = t in document;
            return n || (n = document.createElement("div"), n.setAttribute(t, "return;"), n = "function" == typeof n[t]), !n && gr && "wheel" === e && (n = document.implementation.hasFeature("Events.wheel", "3.0")), n
        }

        function re(e) {
            var t = e.type;
            return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
        }

        function oe(e) {
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
            e._valueTracker || (e._valueTracker = oe(e))
        }

        function ae(e) {
            if (!e) return !1;
            var t = e._valueTracker;
            if (!t) return !0;
            var n = t.getValue(),
                r = "";
            return e && (r = re(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
        }

        function se(e, t, n) {
            return e = B.getPooled(Ar.change, e, t, n), e.type = "change", X(n), R(e), e
        }

        function le(e) {
            k(e), S(!1)
        }

        function ue(e) {
            var t = E(e);
            return ae(t) ? e : void 0
        }

        function ce(e, t) {
            return "topChange" === e ? t : void 0
        }

        function de() {
            Rr && (Rr.detachEvent("onpropertychange", pe), Dr = Rr = null)
        }

        function pe(e) {
            "value" === e.propertyName && ue(Dr) && (e = se(Dr, e, te(e)), J(le, e))
        }

        function fe(e, t, n) {
            "topFocus" === e ? (de(), Rr = t, Dr = n, Rr.attachEvent("onpropertychange", pe)) : "topBlur" === e && de()
        }

        function he(e) {
            return "topSelectionChange" === e || "topKeyUp" === e || "topKeyDown" === e ? ue(Dr) : void 0
        }

        function ye(e, t) {
            return "topClick" === e ? ue(t) : void 0
        }

        function me(e, t) {
            return "topInput" === e || "topChange" === e ? ue(t) : void 0
        }

        function ve(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function ge(e) {
            var t = this.nativeEvent;
            return t.getModifierState ? t.getModifierState(e) : (e = jr[e]) ? !!t[e] : !1
        }

        function _e() {
            return ge
        }

        function we(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function be(e) {
            return e = e.type, "string" == typeof e ? e : "function" == typeof e ? e.displayName || e.name : null
        }

        function ke(e) {
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

        function Se(e) {
            return (e = e._reactInternalFiber) ? 2 === ke(e) : !1
        }

        function Ce(e) {
            2 !== ke(e) ? r("188") : void 0
        }

        function Ee(e) {
            var t = e.alternate;
            if (!t) return t = ke(e), 3 === t ? r("188") : void 0, 1 === t ? null : e;
            for (var n = e, o = t;;) {
                var i = n["return"],
                    a = i ? i.alternate : null;
                if (!i || !a) break;
                if (i.child === a.child) {
                    for (var s = i.child; s;) {
                        if (s === n) return Ce(i), e;
                        if (s === o) return Ce(i), t;
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

        function Te(e) {
            if (e = Ee(e), !e) return null;
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

        function xe(e) {
            if (e = Ee(e), !e) return null;
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

        function Le(e) {
            var t = e.targetInst;
            do {
                if (!t) {
                    e.ancestors.push(t);
                    break
                }
                var n;
                for (n = t; n["return"];) n = n["return"];
                if (n = 3 !== n.tag ? null : n.stateNode.containerInfo, !n) break;
                e.ancestors.push(t), t = C(n)
            } while (t);
            for (n = 0; n < e.ancestors.length; n++) t = e.ancestors[n], Wr(e.topLevelType, t, e.nativeEvent, te(e.nativeEvent))
        }

        function Oe(e) {
            Vr = !!e
        }

        function Pe(e, t, n) {
            return n ? Sn.listen(n, t, Ie.bind(null, e)) : null
        }

        function Ne(e, t, n) {
            return n ? Sn.capture(n, t, Ie.bind(null, e)) : null
        }

        function Ie(e, t) {
            if (Vr) {
                var n = te(t);
                if (n = C(n), null === n || "number" != typeof n.tag || 2 === ke(n) || (n = null), zr.length) {
                    var r = zr.pop();
                    r.topLevelType = e, r.nativeEvent = t, r.targetInst = n, e = r
                } else e = {
                    topLevelType: e,
                    nativeEvent: t,
                    targetInst: n,
                    ancestors: []
                };
                try {
                    J(Le, e)
                } finally {
                    e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, 10 > zr.length && zr.push(e)
                }
            }
        }

        function Ae(e, t) {
            var n = {};
            return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n
        }

        function Re(e) {
            if (qr[e]) return qr[e];
            if (!Yr[e]) return e;
            var t, n = Yr[e];
            for (t in n)
                if (n.hasOwnProperty(t) && t in $r) return qr[e] = n[t];
            return ""
        }

        function De(e) {
            return Object.prototype.hasOwnProperty.call(e, Zr) || (e[Zr] = Gr++, Xr[e[Zr]] = {}), Xr[e[Zr]]
        }

        function Fe(e) {
            for (; e && e.firstChild;) e = e.firstChild;
            return e
        }

        function Me(e, t) {
            var n = Fe(e);
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
                n = Fe(n)
            }
        }

        function je(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t && ("input" === t && "text" === e.type || "textarea" === t || "true" === e.contentEditable)
        }

        function Be(e, t) {
            if (oo || null == to || to !== Cn()) return null;
            var n = to;
            return "selectionStart" in n && je(n) ? n = {
                start: n.selectionStart,
                end: n.selectionEnd
            } : window.getSelection ? (n = window.getSelection(), n = {
                anchorNode: n.anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset
            }) : n = void 0, ro && En(ro, n) ? null : (ro = n, e = B.getPooled(eo.select, no, e, t), e.type = "select", e.target = to, R(e), e)
        }

        function He(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function Ue(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function ze(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function Ve(e) {
            var t = e.keyCode;
            return "charCode" in e ? (e = e.charCode, 0 === e && 13 === t && (e = 13)) : e = t, e >= 32 || 13 === e ? e : 0
        }

        function We(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function Ke(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function Ye(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function qe(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function $e(e, t, n, r) {
            return B.call(this, e, t, n, r)
        }

        function Qe(e) {
            0 > fo || (e.current = po[fo], po[fo] = null, fo--)
        }

        function Xe(e, t) {
            fo++, po[fo] = e.current, e.current = t
        }

        function Ge(e) {
            return Je(e) ? mo : ho.current
        }

        function Ze(e, t) {
            var n = e.type.contextTypes;
            if (!n) return Ln;
            var r = e.stateNode;
            if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
            var o, i = {};
            for (o in n) i[o] = t[o];
            return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
        }

        function Je(e) {
            return 2 === e.tag && null != e.type.childContextTypes
        }

        function et(e) {
            Je(e) && (Qe(yo, e), Qe(ho, e))
        }

        function tt(e, t, n) {
            null != ho.cursor ? r("168") : void 0, Xe(ho, t, e), Xe(yo, n, e)
        }

        function nt(e, t) {
            var n = e.stateNode,
                o = e.type.childContextTypes;
            if ("function" != typeof n.getChildContext) return t;
            n = n.getChildContext();
            for (var i in n) i in o ? void 0 : r("108", be(e) || "Unknown", i);
            return bn({}, t, n)
        }

        function rt(e) {
            if (!Je(e)) return !1;
            var t = e.stateNode;
            return t = t && t.__reactInternalMemoizedMergedChildContext || Ln, mo = ho.current, Xe(ho, t, e), Xe(yo, yo.current, e), !0
        }

        function ot(e, t) {
            var n = e.stateNode;
            if (n ? void 0 : r("169"), t) {
                var o = nt(e, mo);
                n.__reactInternalMemoizedMergedChildContext = o, Qe(yo, e), Qe(ho, e), Xe(ho, o, e)
            } else Qe(yo, e);
            Xe(yo, t, e)
        }

        function it(e, t, n) {
            this.tag = e, this.key = t, this.stateNode = this.type = null, this.sibling = this.child = this["return"] = null, this.index = 0, this.memoizedState = this.updateQueue = this.memoizedProps = this.pendingProps = this.ref = null, this.internalContextTag = n, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.expirationTime = 0, this.alternate = null
        }

        function at(e, t, n) {
            var r = e.alternate;
            return null === r ? (r = new it(e.tag, e.key, e.internalContextTag), r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.effectTag = 0, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null), r.expirationTime = n, r.pendingProps = t, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r
        }

        function st(e, t, n) {
            var o = void 0,
                i = e.type,
                a = e.key;
            return "function" == typeof i ? (o = i.prototype && i.prototype.isReactComponent ? new it(2, a, t) : new it(0, a, t), o.type = i, o.pendingProps = e.props) : "string" == typeof i ? (o = new it(5, a, t), o.type = i, o.pendingProps = e.props) : "object" == typeof i && null !== i && "number" == typeof i.tag ? (o = i, o.pendingProps = e.props) : r("130", null == i ? i : typeof i, ""), o.expirationTime = n, o
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

        function pt(e, t, n) {
            return t = new it(4, e.key, t), t.pendingProps = e.children || [], t.expirationTime = n, t.stateNode = {
                containerInfo: e.containerInfo,
                pendingChildren: null,
                implementation: e.implementation
            }, t
        }

        function ft(e) {
            return function(t) {
                try {
                    return e(t)
                } catch (n) {}
            }
        }

        function ht(e) {
            if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
            var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (t.isDisabled || !t.supportsFiber) return !0;
            try {
                var n = t.inject(e);
                vo = ft(function(e) {
                    return t.onCommitFiberRoot(n, e)
                }), go = ft(function(e) {
                    return t.onCommitFiberUnmount(n, e)
                })
            } catch (r) {}
            return !0
        }

        function yt(e) {
            "function" == typeof vo && vo(e)
        }

        function mt(e) {
            "function" == typeof go && go(e)
        }

        function vt(e) {
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

        function gt(e, t) {
            null === e.last ? e.first = e.last = t : (e.last.next = t, e.last = t), (0 === e.expirationTime || e.expirationTime > t.expirationTime) && (e.expirationTime = t.expirationTime)
        }

        function _t(e, t) {
            var n = e.alternate,
                r = e.updateQueue;
            null === r && (r = e.updateQueue = vt(null)), null !== n ? (e = n.updateQueue, null === e && (e = n.updateQueue = vt(null))) : e = null, e = e !== r ? e : null, null === e ? gt(r, t) : null === r.last || null === e.last ? (gt(r, t), gt(e, t)) : (gt(r, t), e.last = t)
        }

        function wt(e, t, n, r) {
            return e = e.partialState, "function" == typeof e ? e.call(t, n, r) : e
        }

        function bt(e, t, n, r, o, i) {
            null !== e && e.updateQueue === n && (n = t.updateQueue = {
                baseState: n.baseState,
                expirationTime: n.expirationTime,
                first: n.first,
                last: n.last,
                isInitialized: n.isInitialized,
                callbackList: null,
                hasForceUpdate: !1
            }), n.expirationTime = 0, n.isInitialized ? e = n.baseState : (e = n.baseState = t.memoizedState, n.isInitialized = !0);
            for (var a = !0, s = n.first, l = !1; null !== s;) {
                var u = s.expirationTime;
                if (u > i) {
                    var c = n.expirationTime;
                    (0 === c || c > u) && (n.expirationTime = u), l || (l = !0, n.baseState = e)
                } else l || (n.first = s.next, null === n.first && (n.last = null)), s.isReplace ? (e = wt(s, r, e, o), a = !0) : (u = wt(s, r, e, o)) && (e = a ? bn({}, e, u) : bn(e, u), a = !1), s.isForced && (n.hasForceUpdate = !0), null !== s.callback && (u = n.callbackList, null === u && (u = n.callbackList = []), u.push(s));
                s = s.next
            }
            return null !== n.callbackList ? t.effectTag |= 32 : null !== n.first || n.hasForceUpdate || (t.updateQueue = null), l || (n.baseState = e), e
        }

        function kt(e, t) {
            var n = e.callbackList;
            if (null !== n)
                for (e.callbackList = null, e = 0; e < n.length; e++) {
                    var o = n[e],
                        i = o.callback;
                    o.callback = null, "function" != typeof i ? r("191", i) : void 0, i.call(t)
                }
        }

        function St(e, t, n, o) {
            function i(e, t) {
                t.updater = a, e.stateNode = t, t._reactInternalFiber = e
            }
            var a = {
                isMounted: Se,
                enqueueSetState: function(n, r, o) {
                    n = n._reactInternalFiber, o = void 0 === o ? null : o;
                    var i = t(n);
                    _t(n, {
                        expirationTime: i,
                        partialState: r,
                        callback: o,
                        isReplace: !1,
                        isForced: !1,
                        nextCallback: null,
                        next: null
                    }), e(n, i)
                },
                enqueueReplaceState: function(n, r, o) {
                    n = n._reactInternalFiber, o = void 0 === o ? null : o;
                    var i = t(n);
                    _t(n, {
                        expirationTime: i,
                        partialState: r,
                        callback: o,
                        isReplace: !0,
                        isForced: !1,
                        nextCallback: null,
                        next: null
                    }), e(n, i)
                },
                enqueueForceUpdate: function(n, r) {
                    n = n._reactInternalFiber, r = void 0 === r ? null : r;
                    var o = t(n);
                    _t(n, {
                        expirationTime: o,
                        partialState: null,
                        callback: r,
                        isReplace: !1,
                        isForced: !0,
                        nextCallback: null,
                        next: null
                    }), e(n, o)
                }
            };
            return {
                adoptClassInstance: i,
                constructClassInstance: function(e, t) {
                    var n = e.type,
                        r = Ge(e),
                        o = 2 === e.tag && null != e.type.contextTypes,
                        a = o ? Ze(e, r) : Ln;
                    return t = new n(t, a), i(e, t), o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = a), t
                },
                mountClassInstance: function(e, t) {
                    var n = e.alternate,
                        o = e.stateNode,
                        i = o.state || null,
                        s = e.pendingProps;
                    s ? void 0 : r("158");
                    var l = Ge(e);
                    o.props = s, o.state = e.memoizedState = i, o.refs = Ln, o.context = Ze(e, l), null != e.type && null != e.type.prototype && !0 === e.type.prototype.unstable_isAsyncReactComponent && (e.internalContextTag |= 1), "function" == typeof o.componentWillMount && (i = o.state, o.componentWillMount(), i !== o.state && a.enqueueReplaceState(o, o.state, null), i = e.updateQueue, null !== i && (o.state = bt(n, e, i, o, s, t))), "function" == typeof o.componentDidMount && (e.effectTag |= 4)
                },
                updateClassInstance: function(e, t, i) {
                    var s = t.stateNode;
                    s.props = t.memoizedProps, s.state = t.memoizedState;
                    var l = t.memoizedProps,
                        u = t.pendingProps;
                    u || (u = l, null == u ? r("159") : void 0);
                    var c = s.context,
                        d = Ge(t);
                    if (d = Ze(t, d), "function" != typeof s.componentWillReceiveProps || l === u && c === d || (c = s.state, s.componentWillReceiveProps(u, d), s.state !== c && a.enqueueReplaceState(s, s.state, null)), c = t.memoizedState, i = null !== t.updateQueue ? bt(e, t, t.updateQueue, s, u, i) : c, !(l !== u || c !== i || yo.current || null !== t.updateQueue && t.updateQueue.hasForceUpdate)) return "function" != typeof s.componentDidUpdate || l === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 4), !1;
                    var p = u;
                    if (null === l || null !== t.updateQueue && t.updateQueue.hasForceUpdate) p = !0;
                    else {
                        var f = t.stateNode,
                            h = t.type;
                        p = "function" == typeof f.shouldComponentUpdate ? f.shouldComponentUpdate(p, i, d) : h.prototype && h.prototype.isPureReactComponent ? !En(l, p) || !En(c, i) : !0
                    }
                    return p ? ("function" == typeof s.componentWillUpdate && s.componentWillUpdate(u, i, d), "function" == typeof s.componentDidUpdate && (t.effectTag |= 4)) : ("function" != typeof s.componentDidUpdate || l === e.memoizedProps && c === e.memoizedState || (t.effectTag |= 4), n(t, u), o(t, i)), s.props = u, s.state = i, s.context = d, p
                }
            }
        }

        function Ct(e) {
            return null === e || "undefined" == typeof e ? null : (e = Eo && e[Eo] || e["@@iterator"], "function" == typeof e ? e : null)
        }

        function Et(e, t) {
            var n = t.ref;
            if (null !== n && "function" != typeof n) {
                if (t._owner) {
                    t = t._owner;
                    var o = void 0;
                    t && (2 !== t.tag ? r("110") : void 0, o = t.stateNode), o ? void 0 : r("147", n);
                    var i = "" + n;
                    return null !== e && null !== e.ref && e.ref._stringRef === i ? e.ref : (e = function(e) {
                        var t = o.refs === Ln ? o.refs = {} : o.refs;
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

        function xt(e) {
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
                return e = at(e, t, n), e.index = 0, e.sibling = null, e
            }

            function a(t, n, r) {
                return t.index = r, e ? (r = t.alternate, null !== r ? (r = r.index, n > r ? (t.effectTag = 2, n) : r) : (t.effectTag = 2, n)) : n
            }

            function s(t) {
                return e && null === t.alternate && (t.effectTag = 2), t
            }

            function l(e, t, n, r) {
                return null === t || 6 !== t.tag ? (t = ut(n, e.internalContextTag, r), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
            }

            function u(e, t, n, r) {
                return null !== t && t.type === n.type ? (r = i(t, n.props, r), r.ref = Et(t, n), r["return"] = e, r) : (r = st(n, e.internalContextTag, r), r.ref = Et(t, n), r["return"] = e, r)
            }

            function c(e, t, n, r) {
                return null === t || 7 !== t.tag ? (t = ct(n, e.internalContextTag, r), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
            }

            function d(e, t, n, r) {
                return null === t || 9 !== t.tag ? (t = dt(n, e.internalContextTag, r), t.type = n.value, t["return"] = e, t) : (t = i(t, null, r), t.type = n.value, t["return"] = e, t)
            }

            function p(e, t, n, r) {
                return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = pt(n, e.internalContextTag, r), t["return"] = e, t) : (t = i(t, n.children || [], r), t["return"] = e, t)
            }

            function f(e, t, n, r, o) {
                return null === t || 10 !== t.tag ? (t = lt(n, e.internalContextTag, r, o), t["return"] = e, t) : (t = i(t, n, r), t["return"] = e, t)
            }

            function h(e, t, n) {
                if ("string" == typeof t || "number" == typeof t) return t = ut("" + t, e.internalContextTag, n), t["return"] = e, t;
                if ("object" == typeof t && null !== t) {
                    switch (t.$$typeof) {
                        case wo:
                            return t.type === Co ? (t = lt(t.props.children, e.internalContextTag, n, t.key), t["return"] = e, t) : (n = st(t, e.internalContextTag, n), n.ref = Et(null, t), n["return"] = e, n);
                        case bo:
                            return t = ct(t, e.internalContextTag, n), t["return"] = e, t;
                        case ko:
                            return n = dt(t, e.internalContextTag, n), n.type = t.value, n["return"] = e, n;
                        case So:
                            return t = pt(t, e.internalContextTag, n), t["return"] = e, t
                    }
                    if (To(t) || Ct(t)) return t = lt(t, e.internalContextTag, n, null), t["return"] = e, t;
                    Tt(e, t)
                }
                return null
            }

            function y(e, t, n, r) {
                var o = null !== t ? t.key : null;
                if ("string" == typeof n || "number" == typeof n) return null !== o ? null : l(e, t, "" + n, r);
                if ("object" == typeof n && null !== n) {
                    switch (n.$$typeof) {
                        case wo:
                            return n.key === o ? n.type === Co ? f(e, t, n.props.children, r, o) : u(e, t, n, r) : null;
                        case bo:
                            return n.key === o ? c(e, t, n, r) : null;
                        case ko:
                            return null === o ? d(e, t, n, r) : null;
                        case So:
                            return n.key === o ? p(e, t, n, r) : null
                    }
                    if (To(n) || Ct(n)) return null !== o ? null : f(e, t, n, r, null);
                    Tt(e, n)
                }
                return null
            }

            function m(e, t, n, r, o) {
                if ("string" == typeof r || "number" == typeof r) return e = e.get(n) || null, l(t, e, "" + r, o);
                if ("object" == typeof r && null !== r) {
                    switch (r.$$typeof) {
                        case wo:
                            return e = e.get(null === r.key ? n : r.key) || null, r.type === Co ? f(t, e, r.props.children, o, r.key) : u(t, e, r, o);
                        case bo:
                            return e = e.get(null === r.key ? n : r.key) || null, c(t, e, r, o);
                        case ko:
                            return e = e.get(n) || null, d(t, e, r, o);
                        case So:
                            return e = e.get(null === r.key ? n : r.key) || null, p(t, e, r, o)
                    }
                    if (To(r) || Ct(r)) return e = e.get(n) || null, f(t, e, r, o, null);
                    Tt(t, r)
                }
                return null
            }

            function v(r, i, s, l) {
                for (var u = null, c = null, d = i, p = i = 0, f = null; null !== d && p < s.length; p++) {
                    d.index > p ? (f = d, d = null) : f = d.sibling;
                    var v = y(r, d, s[p], l);
                    if (null === v) {
                        null === d && (d = f);
                        break
                    }
                    e && d && null === v.alternate && t(r, d), i = a(v, i, p), null === c ? u = v : c.sibling = v, c = v, d = f
                }
                if (p === s.length) return n(r, d), u;
                if (null === d) {
                    for (; p < s.length; p++)(d = h(r, s[p], l)) && (i = a(d, i, p), null === c ? u = d : c.sibling = d, c = d);
                    return u
                }
                for (d = o(r, d); p < s.length; p++)(f = m(d, r, p, s[p], l)) && (e && null !== f.alternate && d["delete"](null === f.key ? p : f.key), i = a(f, i, p), null === c ? u = f : c.sibling = f, c = f);
                return e && d.forEach(function(e) {
                    return t(r, e)
                }), u
            }

            function g(i, s, l, u) {
                var c = Ct(l);
                "function" != typeof c ? r("150") : void 0, l = c.call(l), null == l ? r("151") : void 0;
                for (var d = c = null, p = s, f = s = 0, v = null, g = l.next(); null !== p && !g.done; f++, g = l.next()) {
                    p.index > f ? (v = p, p = null) : v = p.sibling;
                    var _ = y(i, p, g.value, u);
                    if (null === _) {
                        p || (p = v);
                        break
                    }
                    e && p && null === _.alternate && t(i, p), s = a(_, s, f), null === d ? c = _ : d.sibling = _, d = _, p = v
                }
                if (g.done) return n(i, p), c;
                if (null === p) {
                    for (; !g.done; f++, g = l.next()) g = h(i, g.value, u), null !== g && (s = a(g, s, f), null === d ? c = g : d.sibling = g, d = g);
                    return c
                }
                for (p = o(i, p); !g.done; f++, g = l.next()) g = m(p, i, f, g.value, u), null !== g && (e && null !== g.alternate && p["delete"](null === g.key ? f : g.key), s = a(g, s, f), null === d ? c = g : d.sibling = g, d = g);
                return e && p.forEach(function(e) {
                    return t(i, e)
                }), c
            }
            return function(e, o, a, l) {
                "object" == typeof a && null !== a && a.type === Co && null === a.key && (a = a.props.children);
                var u = "object" == typeof a && null !== a;
                if (u) switch (a.$$typeof) {
                    case wo:
                        e: {
                            var c = a.key;
                            for (u = o; null !== u;) {
                                if (u.key === c) {
                                    if (10 === u.tag ? a.type === Co : u.type === a.type) {
                                        n(e, u.sibling), o = i(u, a.type === Co ? a.props.children : a.props, l), o.ref = Et(u, a), o["return"] = e, e = o;
                                        break e
                                    }
                                    n(e, u);
                                    break
                                }
                                t(e, u), u = u.sibling
                            }
                            a.type === Co ? (o = lt(a.props.children, e.internalContextTag, l, a.key), o["return"] = e, e = o) : (l = st(a, e.internalContextTag, l), l.ref = Et(o, a), l["return"] = e, e = l)
                        }
                        return s(e);
                    case bo:
                        e: {
                            for (u = a.key; null !== o;) {
                                if (o.key === u) {
                                    if (7 === o.tag) {
                                        n(e, o.sibling), o = i(o, a, l), o["return"] = e, e = o;
                                        break e
                                    }
                                    n(e, o);
                                    break
                                }
                                t(e, o), o = o.sibling
                            }
                            o = ct(a, e.internalContextTag, l),
                            o["return"] = e,
                            e = o
                        }
                        return s(e);
                    case ko:
                        e: {
                            if (null !== o) {
                                if (9 === o.tag) {
                                    n(e, o.sibling), o = i(o, null, l), o.type = a.value, o["return"] = e, e = o;
                                    break e
                                }
                                n(e, o)
                            }
                            o = dt(a, e.internalContextTag, l),
                            o.type = a.value,
                            o["return"] = e,
                            e = o
                        }
                        return s(e);
                    case So:
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
                            o = pt(a, e.internalContextTag, l),
                            o["return"] = e,
                            e = o
                        }
                        return s(e)
                }
                if ("string" == typeof a || "number" == typeof a) return a = "" + a, null !== o && 6 === o.tag ? (n(e, o.sibling), o = i(o, a, l)) : (n(e, o), o = ut(a, e.internalContextTag, l)), o["return"] = e, e = o, s(e);
                if (To(a)) return v(e, o, a, l);
                if (Ct(a)) return g(e, o, a, l);
                if (u && Tt(e, a), "undefined" == typeof a) switch (e.tag) {
                    case 2:
                    case 1:
                        l = e.type, r("152", l.displayName || l.name || "Component")
                }
                return n(e, o)
            }
        }

        function Lt(e, t, n, o, i) {
            function a(e, t, n) {
                var r = t.expirationTime;
                t.child = null === e ? Lo(t, null, n, r) : xo(t, e.child, n, r)
            }

            function s(e, t) {
                var n = t.ref;
                null === n || e && e.ref === n || (t.effectTag |= 128)
            }

            function l(e, t, n, r) {
                if (s(e, t), !n) return r && ot(t, !1), c(e, t);
                n = t.stateNode, Ur.current = t;
                var o = n.render();
                return t.effectTag |= 1, a(e, t, o), t.memoizedState = n.state, t.memoizedProps = n.props, r && ot(t, !0), t.child
            }

            function u(e) {
                var t = e.stateNode;
                t.pendingContext ? tt(e, t.pendingContext, t.pendingContext !== t.context) : t.context && tt(e, t.context, !1), m(e, t.containerInfo)
            }

            function c(e, t) {
                if (null !== e && t.child !== e.child ? r("153") : void 0, null !== t.child) {
                    e = t.child;
                    var n = at(e, e.pendingProps, e.expirationTime);
                    for (t.child = n, n["return"] = t; null !== e.sibling;) e = e.sibling, n = n.sibling = at(e, e.pendingProps, e.expirationTime), n["return"] = t;
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
                        m(t, t.stateNode.containerInfo)
                }
                return null
            }
            var p = e.shouldSetTextContent,
                f = e.useSyncScheduling,
                h = e.shouldDeprioritizeSubtree,
                y = t.pushHostContext,
                m = t.pushHostContainer,
                v = n.enterHydrationState,
                g = n.resetHydrationState,
                _ = n.tryToClaimNextHydratableInstance;
            e = St(o, i, function(e, t) {
                e.memoizedProps = t
            }, function(e, t) {
                e.memoizedState = t
            });
            var w = e.adoptClassInstance,
                b = e.constructClassInstance,
                k = e.mountClassInstance,
                S = e.updateClassInstance;
            return {
                beginWork: function(e, t, n) {
                    if (0 === t.expirationTime || t.expirationTime > n) return d(e, t);
                    switch (t.tag) {
                        case 0:
                            null !== e ? r("155") : void 0;
                            var o = t.type,
                                i = t.pendingProps,
                                C = Ge(t);
                            return C = Ze(t, C), o = o(i, C), t.effectTag |= 1, "object" == typeof o && null !== o && "function" == typeof o.render ? (t.tag = 2, i = rt(t), w(t, o), k(t, n), t = l(e, t, !0, i)) : (t.tag = 1, a(e, t, o), t.memoizedProps = i, t = t.child), t;
                        case 1:
                            e: {
                                if (i = t.type, n = t.pendingProps, o = t.memoizedProps, yo.current) null === n && (n = o);
                                else if (null === n || o === n) {
                                    t = c(e, t);
                                    break e
                                }
                                o = Ge(t),
                                o = Ze(t, o),
                                i = i(n, o),
                                t.effectTag |= 1,
                                a(e, t, i),
                                t.memoizedProps = n,
                                t = t.child
                            }
                            return t;
                        case 2:
                            return i = rt(t), o = void 0, null === e ? t.stateNode ? r("153") : (b(t, t.pendingProps), k(t, n), o = !0) : o = S(e, t, n), l(e, t, o, i);
                        case 3:
                            return u(t), i = t.updateQueue, null !== i ? (o = t.memoizedState, i = bt(e, t, i, null, null, n), o === i ? (g(), t = c(e, t)) : (o = i.element, C = t.stateNode, (null === e || null === e.child) && C.hydrate && v(t) ? (t.effectTag |= 2, t.child = Lo(t, null, o, n)) : (g(), a(e, t, o)), t.memoizedState = i, t = t.child)) : (g(), t = c(e, t)), t;
                        case 5:
                            y(t), null === e && _(t), i = t.type;
                            var E = t.memoizedProps;
                            return o = t.pendingProps, null === o && (o = E, null === o ? r("154") : void 0), C = null !== e ? e.memoizedProps : null, yo.current || null !== o && E !== o ? (E = o.children, p(i, o) ? E = null : C && p(i, C) && (t.effectTag |= 16), s(e, t), 2147483647 !== n && !f && h(i, o) ? (t.expirationTime = 2147483647, t = null) : (a(e, t, E), t.memoizedProps = o, t = t.child)) : t = c(e, t), t;
                        case 6:
                            return null === e && _(t), e = t.pendingProps, null === e && (e = t.memoizedProps), t.memoizedProps = e, null;
                        case 8:
                            t.tag = 7;
                        case 7:
                            return i = t.pendingProps, yo.current ? null === i && (i = e && e.memoizedProps, null === i ? r("154") : void 0) : (null === i || t.memoizedProps === i) && (i = t.memoizedProps), o = i.children, t.stateNode = null === e ? Lo(t, t.stateNode, o, n) : xo(t, t.stateNode, o, n), t.memoizedProps = i, t.stateNode;
                        case 9:
                            return null;
                        case 4:
                            e: {
                                if (m(t, t.stateNode.containerInfo), i = t.pendingProps, yo.current) null === i && (i = e && e.memoizedProps, null == i ? r("154") : void 0);
                                else if (null === i || t.memoizedProps === i) {
                                    t = c(e, t);
                                    break e
                                }
                                null === e ? t.child = xo(t, null, i, n) : a(e, t, i),
                                t.memoizedProps = i,
                                t = t.child
                            }
                            return t;
                        case 10:
                            e: {
                                if (n = t.pendingProps, yo.current) null === n && (n = t.memoizedProps);
                                else if (null === n || t.memoizedProps === n) {
                                    t = c(e, t);
                                    break e
                                }
                                a(e, t, n),
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
                    return t.effectTag |= 64, null === e ? t.child = null : t.child !== e.child && (t.child = e.child), 0 === t.expirationTime || t.expirationTime > n ? d(e, t) : (t.firstEffect = null, t.lastEffect = null, t.child = null === e ? Lo(t, null, null, n) : xo(t, e.child, null, n), 2 === t.tag && (e = t.stateNode, t.memoizedProps = e.props, t.memoizedState = e.state), t.child)
                }
            }
        }

        function Ot(e, t, n) {
            function o(e) {
                e.effectTag |= 4
            }
            var i = e.createInstance,
                a = e.createTextInstance,
                s = e.appendInitialChild,
                l = e.finalizeInitialChildren,
                u = e.prepareUpdate,
                c = e.persistence,
                d = t.getRootHostContainer,
                p = t.popHostContext,
                f = t.getHostContext,
                h = t.popHostContainer,
                y = n.prepareToHydrateHostInstance,
                m = n.prepareToHydrateHostTextInstance,
                v = n.popHydrationState,
                g = void 0,
                _ = void 0,
                w = void 0;
            return e.mutation ? (g = function() {}, _ = function(e, t, n) {
                (t.updateQueue = n) && o(t)
            }, w = function(e, t, n, r) {
                n !== r && o(t)
            }) : r(c ? "235" : "236"), {
                completeWork: function(e, t, n) {
                    var c = t.pendingProps;
                    switch (null === c ? c = t.memoizedProps : (2147483647 !== t.expirationTime || 2147483647 === n) && (t.pendingProps = null), t.tag) {
                        case 1:
                            return null;
                        case 2:
                            return et(t), null;
                        case 3:
                            return h(t), Qe(yo, t), Qe(ho, t), c = t.stateNode, c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (null === e || null === e.child) && (v(t), t.effectTag &= -3), g(t), null;
                        case 5:
                            p(t), n = d();
                            var b = t.type;
                            if (null !== e && null != t.stateNode) {
                                var k = e.memoizedProps,
                                    S = t.stateNode,
                                    C = f();
                                S = u(S, b, k, c, n, C), _(e, t, S, b, k, c, n), e.ref !== t.ref && (t.effectTag |= 128)
                            } else {
                                if (!c) return null === t.stateNode ? r("166") : void 0, null;
                                if (e = f(), v(t)) y(t, n, e) && o(t);
                                else {
                                    e = i(b, c, n, e, t);
                                    e: for (k = t.child; null !== k;) {
                                        if (5 === k.tag || 6 === k.tag) s(e, k.stateNode);
                                        else if (4 !== k.tag && null !== k.child) {
                                            k.child["return"] = k, k = k.child;
                                            continue
                                        }
                                        if (k === t) break;
                                        for (; null === k.sibling;) {
                                            if (null === k["return"] || k["return"] === t) break e;
                                            k = k["return"]
                                        }
                                        k.sibling["return"] = k["return"], k = k.sibling
                                    }
                                    l(e, b, c, n) && o(t), t.stateNode = e
                                }
                                null !== t.ref && (t.effectTag |= 128)
                            }
                            return null;
                        case 6:
                            if (e && null != t.stateNode) w(e, t, e.memoizedProps, c);
                            else {
                                if ("string" != typeof c) return null === t.stateNode ? r("166") : void 0, null;
                                e = d(), n = f(), v(t) ? m(t) && o(t) : t.stateNode = a(c, e, n, t)
                            }
                            return null;
                        case 7:
                            (c = t.memoizedProps) ? void 0: r("165"), t.tag = 8, b = [];
                            e: for ((k = t.stateNode) && (k["return"] = t); null !== k;) {
                                if (5 === k.tag || 6 === k.tag || 4 === k.tag) r("247");
                                else if (9 === k.tag) b.push(k.type);
                                else if (null !== k.child) {
                                    k.child["return"] = k, k = k.child;
                                    continue
                                }
                                for (; null === k.sibling;) {
                                    if (null === k["return"] || k["return"] === t) break e;
                                    k = k["return"]
                                }
                                k.sibling["return"] = k["return"], k = k.sibling
                            }
                            return k = c.handler, c = k(c.props, b), t.child = xo(t, null !== e ? e.child : null, c, n), t.child;
                        case 8:
                            return t.tag = 7, null;
                        case 9:
                            return null;
                        case 10:
                            return null;
                        case 4:
                            return h(t), g(t), null;
                        case 0:
                            r("167");
                        default:
                            r("156")
                    }
                }
            }
        }

        function Pt(e, t) {
            function n(e) {
                var n = e.ref;
                if (null !== n) try {
                    n(null)
                } catch (r) {
                    t(e, r)
                }
            }

            function o(e) {
                switch ("function" == typeof mt && mt(e), e.tag) {
                    case 2:
                        n(e);
                        var r = e.stateNode;
                        if ("function" == typeof r.componentWillUnmount) try {
                            r.props = e.memoizedProps, r.state = e.memoizedState, r.componentWillUnmount()
                        } catch (o) {
                            t(e, o)
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
                    if (o(t), null === t.child || u && 4 === t.tag) {
                        if (t === e) break;
                        for (; null === t.sibling;) {
                            if (null === t["return"] || t["return"] === e) return;
                            t = t["return"]
                        }
                        t.sibling["return"] = t["return"], t = t.sibling
                    } else t.child["return"] = t, t = t.child
            }

            function a(e) {
                return 5 === e.tag || 3 === e.tag || 4 === e.tag
            }

            function s(e) {
                for (var t = e, n = !1, a = void 0, s = void 0;;) {
                    if (!n) {
                        n = t["return"];
                        e: for (;;) {
                            switch (null === n ? r("160") : void 0, n.tag) {
                                case 5:
                                    a = n.stateNode, s = !1;
                                    break e;
                                case 3:
                                    a = n.stateNode.containerInfo, s = !0;
                                    break e;
                                case 4:
                                    a = n.stateNode.containerInfo, s = !0;
                                    break e
                            }
                            n = n["return"]
                        }
                        n = !0
                    }
                    if (5 === t.tag || 6 === t.tag) i(t), s ? _(a, t.stateNode) : g(a, t.stateNode);
                    else if (4 === t.tag ? a = t.stateNode.containerInfo : o(t), null !== t.child) {
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
                p = u.resetTextContent,
                f = u.commitTextUpdate,
                h = u.appendChild,
                y = u.appendChildToContainer,
                m = u.insertBefore,
                v = u.insertInContainerBefore,
                g = u.removeChild,
                _ = u.removeChildFromContainer;
            return {
                commitResetTextContent: function(e) {
                    p(e.stateNode)
                },
                commitPlacement: function(e) {
                    e: {
                        for (var t = e["return"]; null !== t;) {
                            if (a(t)) {
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
                    16 & n.effectTag && (p(t), n.effectTag &= -17);e: t: for (n = e;;) {
                        for (; null === n.sibling;) {
                            if (null === n["return"] || a(n["return"])) {
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
                        if (5 === i.tag || 6 === i.tag) n ? o ? v(t, i.stateNode, n) : m(t, i.stateNode, n) : o ? y(t, i.stateNode) : h(t, i.stateNode);
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
                                var o = t.memoizedProps;
                                e = null !== e ? e.memoizedProps : o;
                                var i = t.type,
                                    a = t.updateQueue;
                                t.updateQueue = null, null !== a && d(n, a, i, e, o, t)
                            }
                            break;
                        case 6:
                            null === t.stateNode ? r("162") : void 0, n = t.memoizedProps, f(t.stateNode, null !== e ? e.memoizedProps : n, n);
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
                                    var o = e.memoizedProps;
                                    e = e.memoizedState, n.props = t.memoizedProps, n.state = t.memoizedState, n.componentDidUpdate(o, e)
                                }
                            t = t.updateQueue, null !== t && kt(t, n);
                            break;
                        case 3:
                            n = t.updateQueue, null !== n && kt(n, null !== t.child ? t.child.stateNode : null);
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

        function Nt(e) {
            function t(e) {
                return e === Oo ? r("174") : void 0, e
            }
            var n = e.getChildHostContext,
                o = e.getRootHostContext,
                i = {
                    current: Oo
                },
                a = {
                    current: Oo
                },
                s = {
                    current: Oo
                };
            return {
                getHostContext: function() {
                    return t(i.current)
                },
                getRootHostContainer: function() {
                    return t(s.current)
                },
                popHostContainer: function(e) {
                    Qe(i, e), Qe(a, e), Qe(s, e)
                },
                popHostContext: function(e) {
                    a.current === e && (Qe(i, e), Qe(a, e))
                },
                pushHostContainer: function(e, t) {
                    Xe(s, t, e), t = o(t), Xe(a, e, e), Xe(i, t, e)
                },
                pushHostContext: function(e) {
                    var r = t(s.current),
                        o = t(i.current);
                    r = n(o, e.type, r), o !== r && (Xe(a, e, e), Xe(i, r, e))
                },
                resetHostContainer: function() {
                    i.current = Oo, s.current = Oo
                }
            }
        }

        function It(e) {
            function t(e, t) {
                var n = new it(5, null, 0);
                n.type = "DELETED", n.stateNode = t, n["return"] = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n
            }

            function n(e, t) {
                switch (e.tag) {
                    case 5:
                        return t = a(t, e.type, e.pendingProps), null !== t ? (e.stateNode = t, !0) : !1;
                    case 6:
                        return t = s(t, e.pendingProps), null !== t ? (e.stateNode = t, !0) : !1;
                    default:
                        return !1
                }
            }

            function o(e) {
                for (e = e["return"]; null !== e && 5 !== e.tag && 3 !== e.tag;) e = e["return"];
                p = e
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
            var a = e.canHydrateInstance,
                s = e.canHydrateTextInstance,
                l = e.getNextHydratableSibling,
                u = e.getFirstHydratableChild,
                c = e.hydrateInstance,
                d = e.hydrateTextInstance,
                p = null,
                f = null,
                h = !1;
            return {
                enterHydrationState: function(e) {
                    return f = u(e.stateNode.containerInfo), p = e, h = !0
                },
                resetHydrationState: function() {
                    f = p = null, h = !1
                },
                tryToClaimNextHydratableInstance: function(e) {
                    if (h) {
                        var r = f;
                        if (r) {
                            if (!n(e, r)) {
                                if (r = l(r), !r || !n(e, r)) return e.effectTag |= 2, h = !1, void(p = e);
                                t(p, f)
                            }
                            p = e, f = u(r)
                        } else e.effectTag |= 2, h = !1, p = e
                    }
                },
                prepareToHydrateHostInstance: function(e, t, n) {
                    return t = c(e.stateNode, e.type, e.memoizedProps, t, n, e), e.updateQueue = t, null !== t ? !0 : !1
                },
                prepareToHydrateHostTextInstance: function(e) {
                    return d(e.stateNode, e.memoizedProps, e)
                },
                popHydrationState: function(e) {
                    if (e !== p) return !1;
                    if (!h) return o(e), h = !0, !1;
                    var n = e.type;
                    if (5 !== e.tag || "head" !== n && "body" !== n && !i(n, e.memoizedProps))
                        for (n = f; n;) t(e, n), n = l(n);
                    return o(e), f = p ? l(e.stateNode) : null, !0
                }
            }
        }

        function At(e) {
            function t(e) {
                ie = Q = !0;
                var t = e.stateNode;
                if (t.current === e ? r("177") : void 0, t.isReadyForCommit = !1, Ur.current = null, 1 < e.effectTag)
                    if (null !== e.lastEffect) {
                        e.lastEffect.nextEffect = e;
                        var n = e.firstEffect
                    } else n = e;
                else n = e.firstEffect;
                for (W(), J = n; null !== J;) {
                    var o = !1,
                        i = void 0;
                    try {
                        for (; null !== J;) {
                            var a = J.effectTag;
                            if (16 & a && A(J), 128 & a) {
                                var s = J.alternate;
                                null !== s && B(s)
                            }
                            switch (-242 & a) {
                                case 2:
                                    R(J), J.effectTag &= -3;
                                    break;
                                case 6:
                                    R(J), J.effectTag &= -3, F(J.alternate, J);
                                    break;
                                case 4:
                                    F(J.alternate, J);
                                    break;
                                case 8:
                                    ae = !0, D(J), ae = !1
                            }
                            J = J.nextEffect
                        }
                    } catch (u) {
                        o = !0, i = u
                    }
                    o && (null === J ? r("178") : void 0, l(J, i), null !== J && (J = J.nextEffect))
                }
                for (K(), t.current = e, J = n; null !== J;) {
                    n = !1, o = void 0;
                    try {
                        for (; null !== J;) {
                            var c = J.effectTag;
                            if (36 & c && M(J.alternate, J), 128 & c && j(J), 64 & c) switch (i = J, a = void 0, null !== ee && (a = ee.get(i), ee["delete"](i), null == a && null !== i.alternate && (i = i.alternate, a = ee.get(i), ee["delete"](i))), null == a ? r("184") : void 0, i.tag) {
                                case 2:
                                    i.stateNode.componentDidCatch(a.error, {
                                        componentStack: a.componentStack
                                    });
                                    break;
                                case 3:
                                    null === re && (re = a.error);
                                    break;
                                default:
                                    r("157")
                            }
                            var d = J.nextEffect;
                            J.nextEffect = null, J = d
                        }
                    } catch (u) {
                        n = !0, o = u
                    }
                    n && (null === J ? r("178") : void 0, l(J, o), null !== J && (J = J.nextEffect))
                }
                return Q = ie = !1, "function" == typeof yt && yt(e.stateNode), ne && (ne.forEach(y), ne = null), null !== re && (e = re, re = null, S(e)), t = t.current.expirationTime, 0 === t && (te = ee = null), t
            }

            function n(e) {
                for (;;) {
                    var t = I(e.alternate, e, Z),
                        n = e["return"],
                        r = e.sibling,
                        o = e;
                    if (2147483647 === Z || 2147483647 !== o.expirationTime) {
                        if (2 !== o.tag && 3 !== o.tag) var i = 0;
                        else i = o.updateQueue, i = null === i ? 0 : i.expirationTime;
                        for (var a = o.child; null !== a;) 0 !== a.expirationTime && (0 === i || i > a.expirationTime) && (i = a.expirationTime), a = a.sibling;
                        o.expirationTime = i
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

            function o(e) {
                var t = P(e.alternate, e, Z);
                return null === t && (t = n(e)), Ur.current = null, t
            }

            function i(e) {
                var t = N(e.alternate, e, Z);
                return null === t && (t = n(e)), Ur.current = null, t
            }

            function a(e) {
                if (null !== ee) {
                    if (!(0 === Z || Z > e))
                        if (q >= Z)
                            for (; null !== X;) X = u(X) ? i(X) : o(X);
                        else
                            for (; null !== X && !k();) X = u(X) ? i(X) : o(X)
                } else if (!(0 === Z || Z > e))
                    if (q >= Z)
                        for (; null !== X;) X = o(X);
                    else
                        for (; null !== X && !k();) X = o(X)
            }

            function s(e, t) {
                if (Q ? r("243") : void 0, Q = !0, e.isReadyForCommit = !1, e !== G || t !== Z || null === X) {
                    for (; fo > -1;) po[fo] = null, fo--;
                    mo = Ln, ho.current = Ln, yo.current = !1, L(), G = e, Z = t, X = at(G.current, null, t)
                }
                var n = !1,
                    o = null;
                try {
                    a(t)
                } catch (s) {
                    n = !0, o = s
                }
                for (; n;) {
                    if (oe) {
                        re = o;
                        break
                    }
                    var u = X;
                    if (null === u) oe = !0;
                    else {
                        var c = l(u, o);
                        if (null === c ? r("183") : void 0, !oe) {
                            try {
                                for (n = c, o = t, c = n; null !== u;) {
                                    switch (u.tag) {
                                        case 2:
                                            et(u);
                                            break;
                                        case 5:
                                            x(u);
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
                                X = i(n), a(o)
                            } catch (s) {
                                n = !0, o = s;
                                continue
                            }
                            break
                        }
                    }
                }
                return t = re, oe = Q = !1, re = null, null !== t && S(t), e.isReadyForCommit ? e.current.alternate : null
            }

            function l(e, t) {
                var n = Ur.current = null,
                    r = !1,
                    o = !1,
                    i = null;
                if (3 === e.tag) n = e, c(e) && (oe = !0);
                else
                    for (var a = e["return"]; null !== a && null === n;) {
                        if (2 === a.tag ? "function" == typeof a.stateNode.componentDidCatch && (r = !0, i = be(a), n = a, o = !0) : 3 === a.tag && (n = a), c(a)) {
                            if (ae || null !== ne && (ne.has(a) || null !== a.alternate && ne.has(a.alternate))) return null;
                            n = null, o = !1
                        }
                        a = a["return"]
                    }
                if (null !== n) {
                    null === te && (te = new Set), te.add(n);
                    var s = "";
                    a = e;
                    do {
                        e: switch (a.tag) {
                            case 0:
                            case 1:
                            case 2:
                            case 5:
                                var l = a._debugOwner,
                                    u = a._debugSource,
                                    d = be(a),
                                    p = null;
                                l && (p = be(l)), l = u, d = "\n    in " + (d || "Unknown") + (l ? " (at " + l.fileName.replace(/^.*[\\\/]/, "") + ":" + l.lineNumber + ")" : p ? " (created by " + p + ")" : "");
                                break e;
                            default:
                                d = ""
                        }
                        s += d,
                        a = a["return"]
                    } while (a);
                    a = s, e = be(e), null === ee && (ee = new Map), t = {
                        componentName: e,
                        componentStack: a,
                        error: t,
                        errorBoundary: r ? n.stateNode : null,
                        errorBoundaryFound: r,
                        errorBoundaryName: i,
                        willRetry: o
                    }, ee.set(n, t);
                    try {
                        var f = t.error;
                        f && f.suppressReactErrorLogging || console.error(f)
                    } catch (h) {
                        h && h.suppressReactErrorLogging || console.error(h)
                    }
                    return ie ? (null === ne && (ne = new Set), ne.add(n)) : y(n), n
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
                return 20 * (((m() + 100) / 20 | 0) + 1)
            }

            function p(e) {
                return 0 !== $ ? $ : Q ? ie ? 1 : Z : !V || 1 & e.internalContextTag ? d() : 1
            }

            function f(e, t) {
                return h(e, t, !1)
            }

            function h(e, t) {
                for (; null !== e;) {
                    if ((0 === e.expirationTime || e.expirationTime > t) && (e.expirationTime = t), null !== e.alternate && (0 === e.alternate.expirationTime || e.alternate.expirationTime > t) && (e.alternate.expirationTime = t), null === e["return"]) {
                        if (3 !== e.tag) break;
                        var n = e.stateNode;
                        !Q && n === G && Z > t && (X = G = null, Z = 0);
                        var o = n,
                            i = t;
                        if (ke > we && r("185"), null === o.nextScheduledRoot) o.remainingExpirationTime = i, null === le ? (se = le = o, o.nextScheduledRoot = o) : (le = le.nextScheduledRoot = o, le.nextScheduledRoot = se);
                        else {
                            var a = o.remainingExpirationTime;
                            (0 === a || a > i) && (o.remainingExpirationTime = i)
                        }
                        de || (ge ? _e && (pe = o, fe = 1, b(pe, fe)) : 1 === i ? w(1, null) : v(i)), !Q && n === G && Z > t && (X = G = null, Z = 0)
                    }
                    e = e["return"]
                }
            }

            function y(e) {
                h(e, 1, !0)
            }

            function m() {
                return q = ((H() - Y) / 10 | 0) + 2
            }

            function v(e) {
                if (0 !== ue) {
                    if (e > ue) return;
                    z(ce)
                }
                var t = H() - Y;
                ue = e, ce = U(_, {
                    timeout: 10 * (e - 2) - t
                })
            }

            function g() {
                var e = 0,
                    t = null;
                if (null !== le)
                    for (var n = le, o = se; null !== o;) {
                        var i = o.remainingExpirationTime;
                        if (0 === i) {
                            if (null === n || null === le ? r("244") : void 0, o === o.nextScheduledRoot) {
                                se = le = o.nextScheduledRoot = null;
                                break
                            }
                            if (o === se) se = i = o.nextScheduledRoot, le.nextScheduledRoot = i, o.nextScheduledRoot = null;
                            else {
                                if (o === le) {
                                    le = n, le.nextScheduledRoot = se, o.nextScheduledRoot = null;
                                    break
                                }
                                n.nextScheduledRoot = o.nextScheduledRoot, o.nextScheduledRoot = null
                            }
                            o = n.nextScheduledRoot
                        } else {
                            if ((0 === e || e > i) && (e = i, t = o), o === le) break;
                            n = o, o = o.nextScheduledRoot
                        }
                    }
                n = pe, null !== n && n === t ? ke++ : ke = 0, pe = t, fe = e
            }

            function _(e) {
                w(0, e)
            }

            function w(e, t) {
                for (ve = t, g(); null !== pe && 0 !== fe && (0 === e || e >= fe) && !he;) b(pe, fe), g();
                if (null !== ve && (ue = 0, ce = -1), 0 !== fe && v(fe), ve = null, he = !1, ke = 0, ye) throw e = me, me = null, ye = !1, e
            }

            function b(e, n) {
                if (de ? r("245") : void 0, de = !0, n <= m()) {
                    var o = e.finishedWork;
                    null !== o ? (e.finishedWork = null, e.remainingExpirationTime = t(o)) : (e.finishedWork = null, o = s(e, n), null !== o && (e.remainingExpirationTime = t(o)))
                } else o = e.finishedWork, null !== o ? (e.finishedWork = null, e.remainingExpirationTime = t(o)) : (e.finishedWork = null, o = s(e, n), null !== o && (k() ? e.finishedWork = o : e.remainingExpirationTime = t(o)));
                de = !1
            }

            function k() {
                return null === ve || ve.timeRemaining() > Se ? !1 : he = !0
            }

            function S(e) {
                null === pe ? r("246") : void 0, pe.remainingExpirationTime = 0, ye || (ye = !0, me = e)
            }
            var C = Nt(e),
                E = It(e),
                T = C.popHostContainer,
                x = C.popHostContext,
                L = C.resetHostContainer,
                O = Lt(e, C, E, f, p),
                P = O.beginWork,
                N = O.beginFailedWork,
                I = Ot(e, C, E).completeWork;
            C = Pt(e, l);
            var A = C.commitResetTextContent,
                R = C.commitPlacement,
                D = C.commitDeletion,
                F = C.commitWork,
                M = C.commitLifeCycles,
                j = C.commitAttachRef,
                B = C.commitDetachRef,
                H = e.now,
                U = e.scheduleDeferredCallback,
                z = e.cancelDeferredCallback,
                V = e.useSyncScheduling,
                W = e.prepareForCommit,
                K = e.resetAfterCommit,
                Y = H(),
                q = 2,
                $ = 0,
                Q = !1,
                X = null,
                G = null,
                Z = 0,
                J = null,
                ee = null,
                te = null,
                ne = null,
                re = null,
                oe = !1,
                ie = !1,
                ae = !1,
                se = null,
                le = null,
                ue = 0,
                ce = -1,
                de = !1,
                pe = null,
                fe = 0,
                he = !1,
                ye = !1,
                me = null,
                ve = null,
                ge = !1,
                _e = !1,
                we = 1e3,
                ke = 0,
                Se = 1;
            return {
                computeAsyncExpiration: d,
                computeExpirationForFiber: p,
                scheduleWork: f,
                batchedUpdates: function(e, t) {
                    var n = ge;
                    ge = !0;
                    try {
                        return e(t)
                    } finally {
                        (ge = n) || de || w(1, null)
                    }
                },
                unbatchedUpdates: function(e) {
                    if (ge && !_e) {
                        _e = !0;
                        try {
                            return e()
                        } finally {
                            _e = !1
                        }
                    }
                    return e()
                },
                flushSync: function(e) {
                    var t = ge;
                    ge = !0;
                    try {
                        e: {
                            var n = $;$ = 1;
                            try {
                                var o = e();
                                break e
                            } finally {
                                $ = n
                            }
                            o = void 0
                        }
                        return o
                    }
                    finally {
                        ge = t, de ? r("187") : void 0, w(1, null)
                    }
                },
                deferredUpdates: function(e) {
                    var t = $;
                    $ = d();
                    try {
                        return e()
                    } finally {
                        $ = t
                    }
                }
            }
        }

        function Rt(e) {
            function t(e) {
                return e = Te(e), null === e ? null : e.stateNode
            }
            var n = e.getPublicInstance;
            e = At(e);
            var o = e.computeAsyncExpiration,
                i = e.computeExpirationForFiber,
                a = e.scheduleWork;
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
                            for (2 === ke(n) && 2 === n.tag ? void 0 : r("170"), u = n; 3 !== u.tag;) {
                                if (Je(u)) {
                                    u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                                    break e
                                }(u = u["return"]) ? void 0: r("171")
                            }
                            u = u.stateNode.context
                        }
                        n = Je(n) ? nt(n, u) : u
                    } else n = Ln;
                    null === t.context ? t.context = n : t.pendingContext = n, t = s, t = void 0 === t ? null : t, s = null != e && null != e.type && null != e.type.prototype && !0 === e.type.prototype.unstable_isAsyncReactComponent ? o() : i(l), _t(l, {
                        expirationTime: s,
                        partialState: {
                            element: e
                        },
                        callback: t,
                        isReplace: !1,
                        isForced: !1,
                        nextCallback: null,
                        next: null
                    }), a(l, s)
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
                    return e = xe(e), null === e ? null : e.stateNode
                },
                injectIntoDevTools: function(e) {
                    var n = e.findFiberByHostInstance;
                    return ht(bn({}, e, {
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
                $$typeof: So,
                key: null == r ? null : "" + r,
                children: e,
                containerInfo: t,
                implementation: n
            }
        }

        function Ft(e) {
            return Qo.hasOwnProperty(e) ? !0 : $o.hasOwnProperty(e) ? !1 : qo.test(e) ? Qo[e] = !0 : ($o[e] = !0, !1)
        }

        function Mt(e, t, n) {
            var r = a(t);
            if (r && i(t, n)) {
                var o = r.mutationMethod;
                o ? o(e, n) : null == n || r.hasBooleanValue && !n || r.hasNumericValue && isNaN(n) || r.hasPositiveNumericValue && 1 > n || r.hasOverloadedBooleanValue && !1 === n ? Bt(e, t) : r.mustUseProperty ? e[r.propertyName] = n : (t = r.attributeName, (o = r.attributeNamespace) ? e.setAttributeNS(o, t, "" + n) : r.hasBooleanValue || r.hasOverloadedBooleanValue && !0 === n ? e.setAttribute(t, "") : e.setAttribute(t, "" + n))
            } else jt(e, t, i(t, n) ? n : null)
        }

        function jt(e, t, n) {
            Ft(t) && (null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        }

        function Bt(e, t) {
            var n = a(t);
            n ? (t = n.mutationMethod) ? t(e, void 0) : n.mustUseProperty ? e[n.propertyName] = n.hasBooleanValue ? !1 : "" : e.removeAttribute(n.attributeName) : e.removeAttribute(t)
        }

        function Ht(e, t) {
            var n = t.value,
                r = t.checked;
            return bn({
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
            t = t.checked, null != t && Mt(e, "checked", t)
        }

        function Vt(e, t) {
            zt(e, t);
            var n = t.value;
            null != n ? 0 === n && "" === e.value ? e.value = "0" : "number" === t.type ? (t = parseFloat(e.value) || 0, (n != t || n == t && e.value != n) && (e.value = "" + n)) : e.value !== "" + n && (e.value = "" + n) : (null == t.value && null != t.defaultValue && e.defaultValue !== "" + t.defaultValue && (e.defaultValue = "" + t.defaultValue), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked))
        }

        function Wt(e, t) {
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

        function Kt(e) {
            var t = "";
            return _n.Children.forEach(e, function(e) {
                null == e || "string" != typeof e && "number" != typeof e || (t += e)
            }), t
        }

        function Yt(e, t) {
            return e = bn({
                children: void 0
            }, t), (t = Kt(t.children)) && (e.children = t), e
        }

        function qt(e, t, n, r) {
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

        function $t(e, t) {
            var n = t.value;
            e._wrapperState = {
                initialValue: null != n ? n : t.defaultValue,
                wasMultiple: !!t.multiple
            }
        }

        function Qt(e, t) {
            return null != t.dangerouslySetInnerHTML ? r("91") : void 0, bn({}, t, {
                value: void 0,
                defaultValue: void 0,
                children: "" + e._wrapperState.initialValue
            })
        }

        function Xt(e, t) {
            var n = t.value;
            null == n && (n = t.defaultValue, t = t.children, null != t && (null != n ? r("92") : void 0, Array.isArray(t) && (1 >= t.length ? void 0 : r("93"), t = t[0]), n = "" + t), null == n && (n = "")), e._wrapperState = {
                initialValue: "" + n
            }
        }

        function Gt(e, t) {
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
                        o = n,
                        i = t[n];
                    o = null == i || "boolean" == typeof i || "" === i ? "" : r || "number" != typeof i || 0 === i || Jo.hasOwnProperty(o) && Jo[o] ? ("" + i).trim() : i + "px", "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
                }
        }

        function rn(e, t, n) {
            t && (ti[e] && (null != t.children || null != t.dangerouslySetInnerHTML ? r("137", e, n()) : void 0), null != t.dangerouslySetInnerHTML && (null != t.children ? r("60") : void 0, "object" == typeof t.dangerouslySetInnerHTML && "__html" in t.dangerouslySetInnerHTML ? void 0 : r("61")), null != t.style && "object" != typeof t.style ? r("62", n()) : void 0)
        }

        function on(e, t) {
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

        function an(e, t) {
            e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument;
            var n = De(e);
            t = Xn[t];
            for (var r = 0; r < t.length; r++) {
                var o = t[r];
                n.hasOwnProperty(o) && n[o] || ("topScroll" === o ? Ne("topScroll", "scroll", e) : "topFocus" === o || "topBlur" === o ? (Ne("topFocus", "focus", e), Ne("topBlur", "blur", e), n.topBlur = !0, n.topFocus = !0) : "topCancel" === o ? (ne("cancel", !0) && Ne("topCancel", "cancel", e), n.topCancel = !0) : "topClose" === o ? (ne("close", !0) && Ne("topClose", "close", e), n.topClose = !0) : Qr.hasOwnProperty(o) && Pe(o, Qr[o], e), n[o] = !0)
            }
        }

        function sn(e, t, n, r) {
            return n = 9 === n.nodeType ? n : n.ownerDocument, r === ni && (r = Jt(e)), r === ni ? "script" === e ? (e = n.createElement("div"), e.innerHTML = "<script></script>", e = e.removeChild(e.firstChild)) : e = "string" == typeof t.is ? n.createElement(e, {
                is: t.is
            }) : n.createElement(e) : e = n.createElementNS(r, e), e
        }

        function ln(e, t) {
            return (9 === t.nodeType ? t : t.ownerDocument).createTextNode(e)
        }

        function un(e, t, n, r) {
            var o = on(t, n);
            switch (t) {
                case "iframe":
                case "object":
                    Pe("topLoad", "load", e);
                    var i = n;
                    break;
                case "video":
                case "audio":
                    for (i in oi) oi.hasOwnProperty(i) && Pe(i, oi[i], e);
                    i = n;
                    break;
                case "source":
                    Pe("topError", "error", e), i = n;
                    break;
                case "img":
                case "image":
                    Pe("topError", "error", e), Pe("topLoad", "load", e), i = n;
                    break;
                case "form":
                    Pe("topReset", "reset", e), Pe("topSubmit", "submit", e), i = n;
                    break;
                case "details":
                    Pe("topToggle", "toggle", e), i = n;
                    break;
                case "input":
                    Ut(e, n), i = Ht(e, n), Pe("topInvalid", "invalid", e), an(r, "onChange");
                    break;
                case "option":
                    i = Yt(e, n);
                    break;
                case "select":
                    $t(e, n), i = bn({}, n, {
                        value: void 0
                    }), Pe("topInvalid", "invalid", e), an(r, "onChange");
                    break;
                case "textarea":
                    Xt(e, n), i = Qt(e, n), Pe("topInvalid", "invalid", e), an(r, "onChange");
                    break;
                default:
                    i = n
            }
            rn(t, i, ri);
            var a, s = i;
            for (a in s)
                if (s.hasOwnProperty(a)) {
                    var l = s[a];
                    "style" === a ? nn(e, l, ri) : "dangerouslySetInnerHTML" === a ? (l = l ? l.__html : void 0, null != l && Zo(e, l)) : "children" === a ? "string" == typeof l ? ("textarea" !== t || "" !== l) && tn(e, l) : "number" == typeof l && tn(e, "" + l) : "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && "autoFocus" !== a && (Qn.hasOwnProperty(a) ? null != l && an(r, a) : o ? jt(e, a, l) : null != l && Mt(e, a, l))
                }
            switch (t) {
                case "input":
                    ie(e), Wt(e, n);
                    break;
                case "textarea":
                    ie(e), Zt(e, n);
                    break;
                case "option":
                    null != n.value && e.setAttribute("value", n.value);
                    break;
                case "select":
                    e.multiple = !!n.multiple, t = n.value, null != t ? qt(e, !!n.multiple, t, !1) : null != n.defaultValue && qt(e, !!n.multiple, n.defaultValue, !0);
                    break;
                default:
                    "function" == typeof i.onClick && (e.onclick = kn)
            }
        }

        function cn(e, t, n, r, o) {
            var i = null;
            switch (t) {
                case "input":
                    n = Ht(e, n), r = Ht(e, r), i = [];
                    break;
                case "option":
                    n = Yt(e, n), r = Yt(e, r), i = [];
                    break;
                case "select":
                    n = bn({}, n, {
                        value: void 0
                    }), r = bn({}, r, {
                        value: void 0
                    }), i = [];
                    break;
                case "textarea":
                    n = Qt(e, n), r = Qt(e, r), i = [];
                    break;
                default:
                    "function" != typeof n.onClick && "function" == typeof r.onClick && (e.onclick = kn)
            }
            rn(t, r, ri);
            var a, s;
            e = null;
            for (a in n)
                if (!r.hasOwnProperty(a) && n.hasOwnProperty(a) && null != n[a])
                    if ("style" === a)
                        for (s in t = n[a]) t.hasOwnProperty(s) && (e || (e = {}), e[s] = "");
                    else "dangerouslySetInnerHTML" !== a && "children" !== a && "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && "autoFocus" !== a && (Qn.hasOwnProperty(a) ? i || (i = []) : (i = i || []).push(a, null));
            for (a in r) {
                var l = r[a];
                if (t = null != n ? n[a] : void 0, r.hasOwnProperty(a) && l !== t && (null != l || null != t))
                    if ("style" === a)
                        if (t) {
                            for (s in t) !t.hasOwnProperty(s) || l && l.hasOwnProperty(s) || (e || (e = {}), e[s] = "");
                            for (s in l) l.hasOwnProperty(s) && t[s] !== l[s] && (e || (e = {}), e[s] = l[s])
                        } else e || (i || (i = []), i.push(a, e)), e = l;
                else "dangerouslySetInnerHTML" === a ? (l = l ? l.__html : void 0, t = t ? t.__html : void 0, null != l && t !== l && (i = i || []).push(a, "" + l)) : "children" === a ? t === l || "string" != typeof l && "number" != typeof l || (i = i || []).push(a, "" + l) : "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && (Qn.hasOwnProperty(a) ? (null != l && an(o, a), i || t === l || (i = [])) : (i = i || []).push(a, l))
            }
            return e && (i = i || []).push("style", e), i
        }

        function dn(e, t, n, r, o) {
            "input" === n && "radio" === o.type && null != o.name && zt(e, o), on(n, r), r = on(n, o);
            for (var i = 0; i < t.length; i += 2) {
                var a = t[i],
                    s = t[i + 1];
                "style" === a ? nn(e, s, ri) : "dangerouslySetInnerHTML" === a ? Zo(e, s) : "children" === a ? tn(e, s) : r ? null != s ? jt(e, a, s) : e.removeAttribute(a) : null != s ? Mt(e, a, s) : Bt(e, a)
            }
            switch (n) {
                case "input":
                    Vt(e, o);
                    break;
                case "textarea":
                    Gt(e, o);
                    break;
                case "select":
                    e._wrapperState.initialValue = void 0, t = e._wrapperState.wasMultiple, e._wrapperState.wasMultiple = !!o.multiple, n = o.value, null != n ? qt(e, !!o.multiple, n, !1) : t !== !!o.multiple && (null != o.defaultValue ? qt(e, !!o.multiple, o.defaultValue, !0) : qt(e, !!o.multiple, o.multiple ? [] : "", !1))
            }
        }

        function pn(e, t, n, r, o) {
            switch (t) {
                case "iframe":
                case "object":
                    Pe("topLoad", "load", e);
                    break;
                case "video":
                case "audio":
                    for (var i in oi) oi.hasOwnProperty(i) && Pe(i, oi[i], e);
                    break;
                case "source":
                    Pe("topError", "error", e);
                    break;
                case "img":
                case "image":
                    Pe("topError", "error", e), Pe("topLoad", "load", e);
                    break;
                case "form":
                    Pe("topReset", "reset", e), Pe("topSubmit", "submit", e);
                    break;
                case "details":
                    Pe("topToggle", "toggle", e);
                    break;
                case "input":
                    Ut(e, n), Pe("topInvalid", "invalid", e), an(o, "onChange");
                    break;
                case "select":
                    $t(e, n), Pe("topInvalid", "invalid", e), an(o, "onChange");
                    break;
                case "textarea":
                    Xt(e, n), Pe("topInvalid", "invalid", e), an(o, "onChange")
            }
            rn(t, n, ri), r = null;
            for (var a in n) n.hasOwnProperty(a) && (i = n[a], "children" === a ? "string" == typeof i ? e.textContent !== i && (r = ["children", i]) : "number" == typeof i && e.textContent !== "" + i && (r = ["children", "" + i]) : Qn.hasOwnProperty(a) && null != i && an(o, a));
            switch (t) {
                case "input":
                    ie(e), Wt(e, n);
                    break;
                case "textarea":
                    ie(e), Zt(e, n);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    "function" == typeof n.onClick && (e.onclick = kn)
            }
            return r
        }

        function fn(e, t) {
            return e.nodeValue !== t
        }

        function hn(e) {
            return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
        }

        function yn(e) {
            return e = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null, !(!e || 1 !== e.nodeType || !e.hasAttribute("data-reactroot"))
        }

        function mn(e, t, n, o, i) {
            hn(n) ? void 0 : r("200");
            var a = n._reactRootContainer;
            if (a) li.updateContainer(t, a, e, i);
            else {
                if (o = o || yn(n), !o)
                    for (a = void 0; a = n.lastChild;) n.removeChild(a);
                var s = li.createContainer(n, o);
                a = n._reactRootContainer = s, li.unbatchedUpdates(function() {
                    li.updateContainer(t, s, e, i)
                })
            }
            return li.getPublicRootInstance(a)
        }

        function vn(e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
            return hn(t) ? void 0 : r("200"), Dt(e, t, null, n)
        }

        function gn(e, t) {
            this._reactRootContainer = li.createContainer(e, t)
        }
        var _n = n(247),
            wn = n(33),
            bn = n(74),
            kn = n(142),
            Sn = n(211),
            Cn = n(105),
            En = n(66),
            Tn = n(147),
            xn = n(178),
            Ln = n(224);
        _n ? void 0 : r("227");
        var On = {
                children: !0,
                dangerouslySetInnerHTML: !0,
                defaultValue: !0,
                defaultChecked: !0,
                innerHTML: !0,
                suppressContentEditableWarning: !0,
                suppressHydrationWarning: !0,
                style: !0
            },
            Pn = {
                MUST_USE_PROPERTY: 1,
                HAS_BOOLEAN_VALUE: 4,
                HAS_NUMERIC_VALUE: 8,
                HAS_POSITIVE_NUMERIC_VALUE: 24,
                HAS_OVERLOADED_BOOLEAN_VALUE: 32,
                HAS_STRING_BOOLEAN_VALUE: 64,
                injectDOMPropertyConfig: function(e) {
                    var t = Pn,
                        n = e.Properties || {},
                        i = e.DOMAttributeNamespaces || {},
                        a = e.DOMAttributeNames || {};
                    e = e.DOMMutationMethods || {};
                    for (var s in n) {
                        Nn.hasOwnProperty(s) ? r("48", s) : void 0;
                        var l = s.toLowerCase(),
                            u = n[s];
                        l = {
                            attributeName: l,
                            attributeNamespace: null,
                            propertyName: s,
                            mutationMethod: null,
                            mustUseProperty: o(u, t.MUST_USE_PROPERTY),
                            hasBooleanValue: o(u, t.HAS_BOOLEAN_VALUE),
                            hasNumericValue: o(u, t.HAS_NUMERIC_VALUE),
                            hasPositiveNumericValue: o(u, t.HAS_POSITIVE_NUMERIC_VALUE),
                            hasOverloadedBooleanValue: o(u, t.HAS_OVERLOADED_BOOLEAN_VALUE),
                            hasStringBooleanValue: o(u, t.HAS_STRING_BOOLEAN_VALUE)
                        }, 1 >= l.hasBooleanValue + l.hasNumericValue + l.hasOverloadedBooleanValue ? void 0 : r("50", s), a.hasOwnProperty(s) && (l.attributeName = a[s]), i.hasOwnProperty(s) && (l.attributeNamespace = i[s]), e.hasOwnProperty(s) && (l.mutationMethod = e[s]), Nn[s] = l
                    }
                }
            },
            Nn = {},
            In = Pn,
            An = In.MUST_USE_PROPERTY,
            Rn = In.HAS_BOOLEAN_VALUE,
            Dn = In.HAS_NUMERIC_VALUE,
            Fn = In.HAS_POSITIVE_NUMERIC_VALUE,
            Mn = In.HAS_OVERLOADED_BOOLEAN_VALUE,
            jn = In.HAS_STRING_BOOLEAN_VALUE,
            Bn = {
                Properties: {
                    allowFullScreen: Rn,
                    async: Rn,
                    autoFocus: Rn,
                    autoPlay: Rn,
                    capture: Mn,
                    checked: An | Rn,
                    cols: Fn,
                    contentEditable: jn,
                    controls: Rn,
                    "default": Rn,
                    defer: Rn,
                    disabled: Rn,
                    download: Mn,
                    draggable: jn,
                    formNoValidate: Rn,
                    hidden: Rn,
                    loop: Rn,
                    multiple: An | Rn,
                    muted: An | Rn,
                    noValidate: Rn,
                    open: Rn,
                    playsInline: Rn,
                    readOnly: Rn,
                    required: Rn,
                    reversed: Rn,
                    rows: Fn,
                    rowSpan: Dn,
                    scoped: Rn,
                    seamless: Rn,
                    selected: An | Rn,
                    size: Fn,
                    start: Dn,
                    span: Fn,
                    spellCheck: jn,
                    style: 0,
                    tabIndex: 0,
                    itemScope: Rn,
                    acceptCharset: 0,
                    className: 0,
                    htmlFor: 0,
                    httpEquiv: 0,
                    value: jn
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
            Hn = In.HAS_STRING_BOOLEAN_VALUE,
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
            Vn = /[\-\:]([a-z])/g;
        "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(e) {
            var t = e.replace(Vn, s);
            zn.Properties[t] = 0, zn.DOMAttributeNames[t] = e
        }), In.injectDOMPropertyConfig(Bn), In.injectDOMPropertyConfig(zn);
        var Wn = {
                _caughtError: null,
                _hasCaughtError: !1,
                _rethrowError: null,
                _hasRethrowError: !1,
                injection: {
                    injectErrorUtils: function(e) {
                        "function" != typeof e.invokeGuardedCallback ? r("197") : void 0, l = e.invokeGuardedCallback
                    }
                },
                invokeGuardedCallback: function(e, t, n, r, o, i, a, s, u) {
                    l.apply(Wn, arguments)
                },
                invokeGuardedCallbackAndCatchFirstError: function(e, t, n, r, o, i, a, s, l) {
                    if (Wn.invokeGuardedCallback.apply(this, arguments), Wn.hasCaughtError()) {
                        var u = Wn.clearCaughtError();
                        Wn._hasRethrowError || (Wn._hasRethrowError = !0, Wn._rethrowError = u)
                    }
                },
                rethrowCaughtError: function() {
                    return u.apply(Wn, arguments)
                },
                hasCaughtError: function() {
                    return Wn._hasCaughtError
                },
                clearCaughtError: function() {
                    if (Wn._hasCaughtError) {
                        var e = Wn._caughtError;
                        return Wn._caughtError = null, Wn._hasCaughtError = !1, e
                    }
                    r("198")
                }
            },
            Kn = null,
            Yn = {},
            qn = [],
            $n = {},
            Qn = {},
            Xn = {},
            Gn = Object.freeze({
                plugins: qn,
                eventNameDispatchConfigs: $n,
                registrationNameModules: Qn,
                registrationNameDependencies: Xn,
                possibleRegistrationNames: null,
                injectEventPluginOrder: p,
                injectEventPluginsByName: f
            }),
            Zn = null,
            Jn = null,
            er = null,
            tr = null,
            nr = {
                injectEventPluginOrder: p,
                injectEventPluginsByName: f
            },
            rr = Object.freeze({
                injection: nr,
                getListener: w,
                extractEvents: b,
                enqueueEvents: k,
                processEventQueue: S
            }),
            or = Math.random().toString(36).slice(2),
            ir = "__reactInternalInstance$" + or,
            ar = "__reactEventHandlers$" + or,
            sr = Object.freeze({
                precacheFiberNode: function(e, t) {
                    t[ir] = e
                },
                getClosestInstanceFromNode: C,
                getInstanceFromNode: function(e) {
                    return e = e[ir], !e || 5 !== e.tag && 6 !== e.tag ? null : e
                },
                getNodeFromInstance: E,
                getFiberCurrentPropsFromNode: T,
                updateFiberProps: function(e, t) {
                    e[ar] = t
                }
            }),
            lr = Object.freeze({
                accumulateTwoPhaseDispatches: R,
                accumulateTwoPhaseDispatchesSkipTarget: function(e) {
                    m(e, N)
                },
                accumulateEnterLeaveDispatches: D,
                accumulateDirectDispatches: function(e) {
                    m(e, A)
                }
            }),
            ur = null,
            cr = {
                _root: null,
                _startText: null,
                _fallbackText: null
            },
            dr = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
            pr = {
                type: null,
                target: null,
                currentTarget: kn.thatReturnsNull,
                eventPhase: null,
                bubbles: null,
                cancelable: null,
                timeStamp: function(e) {
                    return e.timeStamp || Date.now()
                },
                defaultPrevented: null,
                isTrusted: null
            };
        bn(B.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = kn.thatReturnsTrue)
            },
            stopPropagation: function() {
                var e = this.nativeEvent;
                e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = kn.thatReturnsTrue)
            },
            persist: function() {
                this.isPersistent = kn.thatReturnsTrue
            },
            isPersistent: kn.thatReturnsFalse,
            destructor: function() {
                var e, t = this.constructor.Interface;
                for (e in t) this[e] = null;
                for (t = 0; t < dr.length; t++) this[dr[t]] = null
            }
        }), B.Interface = pr, B.augmentClass = function(e, t) {
            function n() {}
            n.prototype = this.prototype;
            var r = new n;
            bn(r, e.prototype), e.prototype = r, e.prototype.constructor = e, e.Interface = bn({}, this.Interface, t), e.augmentClass = this.augmentClass, z(e)
        }, z(B), B.augmentClass(V, {
            data: null
        }), B.augmentClass(W, {
            data: null
        });
        var fr = [9, 13, 27, 32],
            hr = wn.canUseDOM && "CompositionEvent" in window,
            yr = null;
        wn.canUseDOM && "documentMode" in document && (yr = document.documentMode);
        var mr;
        if (mr = wn.canUseDOM && "TextEvent" in window && !yr) {
            var vr = window.opera;
            mr = !("object" == typeof vr && "function" == typeof vr.version && 12 >= parseInt(vr.version(), 10))
        }
        var gr, _r = mr,
            wr = wn.canUseDOM && (!hr || yr && yr > 8 && 11 >= yr),
            br = String.fromCharCode(32),
            kr = {
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
            Sr = !1,
            Cr = !1,
            Er = {
                eventTypes: kr,
                extractEvents: function(e, t, n, r) {
                    var o;
                    if (hr) e: {
                        switch (e) {
                            case "topCompositionStart":
                                var i = kr.compositionStart;
                                break e;
                            case "topCompositionEnd":
                                i = kr.compositionEnd;
                                break e;
                            case "topCompositionUpdate":
                                i = kr.compositionUpdate;
                                break e
                        }
                        i = void 0
                    }
                    else Cr ? K(e, n) && (i = kr.compositionEnd) : "topKeyDown" === e && 229 === n.keyCode && (i = kr.compositionStart);
                    return i ? (wr && (Cr || i !== kr.compositionStart ? i === kr.compositionEnd && Cr && (o = M()) : (cr._root = r, cr._startText = j(), Cr = !0)), i = V.getPooled(i, t, n, r), o ? i.data = o : (o = Y(n), null !== o && (i.data = o)), R(i), o = i) : o = null, (e = _r ? q(e, n) : $(e, n)) ? (t = W.getPooled(kr.beforeInput, t, n, r), t.data = e, R(t)) : t = null, [o, t]
                }
            },
            Tr = null,
            xr = null,
            Lr = null,
            Or = {
                injectFiberControlledHostComponent: function(e) {
                    Tr = e
                }
            },
            Pr = Object.freeze({
                injection: Or,
                enqueueStateRestore: X,
                restoreStateIfNeeded: G
            }),
            Nr = !1,
            Ir = {
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
        wn.canUseDOM && (gr = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""));
        var Ar = {
                change: {
                    phasedRegistrationNames: {
                        bubbled: "onChange",
                        captured: "onChangeCapture"
                    },
                    dependencies: "topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")
                }
            },
            Rr = null,
            Dr = null,
            Fr = !1;
        wn.canUseDOM && (Fr = ne("input") && (!document.documentMode || 9 < document.documentMode));
        var Mr = {
            eventTypes: Ar,
            _isInputEventSupported: Fr,
            extractEvents: function(e, t, n, r) {
                var o = t ? E(t) : window,
                    i = o.nodeName && o.nodeName.toLowerCase();
                if ("select" === i || "input" === i && "file" === o.type) var a = ce;
                else if (ee(o))
                    if (Fr) a = me;
                    else {
                        a = he;
                        var s = fe
                    }
                else i = o.nodeName, !i || "input" !== i.toLowerCase() || "checkbox" !== o.type && "radio" !== o.type || (a = ye);
                return a && (a = a(e, t)) ? se(a, n, r) : (s && s(e, o, t), void("topBlur" === e && null != t && (e = t._wrapperState || o._wrapperState) && e.controlled && "number" === o.type && (e = "" + o.value, o.getAttribute("value") !== e && o.setAttribute("value", e))))
            }
        };
        B.augmentClass(ve, {
            view: null,
            detail: null
        });
        var jr = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };
        ve.augmentClass(we, {
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
            getModifierState: _e,
            button: null,
            buttons: null,
            relatedTarget: function(e) {
                return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
            }
        });
        var Br = {
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
                eventTypes: Br,
                extractEvents: function(e, t, n, r) {
                    if ("topMouseOver" === e && (n.relatedTarget || n.fromElement) || "topMouseOut" !== e && "topMouseOver" !== e) return null;
                    var o = r.window === r ? r : (o = r.ownerDocument) ? o.defaultView || o.parentWindow : window;
                    if ("topMouseOut" === e ? (e = t, t = (t = n.relatedTarget || n.toElement) ? C(t) : null) : e = null, e === t) return null;
                    var i = null == e ? o : E(e);
                    o = null == t ? o : E(t);
                    var a = we.getPooled(Br.mouseLeave, e, n, r);
                    return a.type = "mouseleave", a.target = i, a.relatedTarget = o, n = we.getPooled(Br.mouseEnter, t, n, r), n.type = "mouseenter", n.target = o, n.relatedTarget = i, D(a, n, e, t), [a, n]
                }
            },
            Ur = _n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
            zr = [],
            Vr = !0,
            Wr = void 0,
            Kr = Object.freeze({
                get _enabled() {
                    return Vr
                },
                get _handleTopLevel() {
                    return Wr
                },
                setHandleTopLevel: function(e) {
                    Wr = e
                },
                setEnabled: Oe,
                isEnabled: function() {
                    return Vr
                },
                trapBubbledEvent: Pe,
                trapCapturedEvent: Ne,
                dispatchEvent: Ie
            }),
            Yr = {
                animationend: Ae("Animation", "AnimationEnd"),
                animationiteration: Ae("Animation", "AnimationIteration"),
                animationstart: Ae("Animation", "AnimationStart"),
                transitionend: Ae("Transition", "TransitionEnd")
            },
            qr = {},
            $r = {};
        wn.canUseDOM && ($r = document.createElement("div").style, "AnimationEvent" in window || (delete Yr.animationend.animation, delete Yr.animationiteration.animation, delete Yr.animationstart.animation), "TransitionEvent" in window || delete Yr.transitionend.transition);
        var Qr = {
                topAbort: "abort",
                topAnimationEnd: Re("animationend") || "animationend",
                topAnimationIteration: Re("animationiteration") || "animationiteration",
                topAnimationStart: Re("animationstart") || "animationstart",
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
                topTransitionEnd: Re("transitionend") || "transitionend",
                topVolumeChange: "volumechange",
                topWaiting: "waiting",
                topWheel: "wheel"
            },
            Xr = {},
            Gr = 0,
            Zr = "_reactListenersID" + ("" + Math.random()).slice(2),
            Jr = wn.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
            eo = {
                select: {
                    phasedRegistrationNames: {
                        bubbled: "onSelect",
                        captured: "onSelectCapture"
                    },
                    dependencies: "topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")
                }
            },
            to = null,
            no = null,
            ro = null,
            oo = !1,
            io = {
                eventTypes: eo,
                extractEvents: function(e, t, n, r) {
                    var o, i = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;
                    if (!(o = !i)) {
                        e: {
                            i = De(i),
                            o = Xn.onSelect;
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
                    switch (i = t ? E(t) : window, e) {
                        case "topFocus":
                            (ee(i) || "true" === i.contentEditable) && (to = i, no = t, ro = null);
                            break;
                        case "topBlur":
                            ro = no = to = null;
                            break;
                        case "topMouseDown":
                            oo = !0;
                            break;
                        case "topContextMenu":
                        case "topMouseUp":
                            return oo = !1, Be(n, r);
                        case "topSelectionChange":
                            if (Jr) break;
                        case "topKeyDown":
                        case "topKeyUp":
                            return Be(n, r)
                    }
                    return null
                }
            };
        B.augmentClass(He, {
            animationName: null,
            elapsedTime: null,
            pseudoElement: null
        }), B.augmentClass(Ue, {
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData
            }
        }), ve.augmentClass(ze, {
            relatedTarget: null
        });
        var ao = {
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
            so = {
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
        ve.augmentClass(We, {
            key: function(e) {
                if (e.key) {
                    var t = ao[e.key] || e.key;
                    if ("Unidentified" !== t) return t
                }
                return "keypress" === e.type ? (e = Ve(e), 13 === e ? "Enter" : String.fromCharCode(e)) : "keydown" === e.type || "keyup" === e.type ? so[e.keyCode] || "Unidentified" : ""
            },
            location: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            repeat: null,
            locale: null,
            getModifierState: _e,
            charCode: function(e) {
                return "keypress" === e.type ? Ve(e) : 0
            },
            keyCode: function(e) {
                return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
            },
            which: function(e) {
                return "keypress" === e.type ? Ve(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
            }
        }), we.augmentClass(Ke, {
            dataTransfer: null
        }), ve.augmentClass(Ye, {
            touches: null,
            targetTouches: null,
            changedTouches: null,
            altKey: null,
            metaKey: null,
            ctrlKey: null,
            shiftKey: null,
            getModifierState: _e
        }), B.augmentClass(qe, {
            propertyName: null,
            elapsedTime: null,
            pseudoElement: null
        }), we.augmentClass($e, {
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
            },
            deltaZ: null,
            deltaMode: null
        });
        var lo = {},
            uo = {};
        "abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(e) {
            var t = e[0].toUpperCase() + e.slice(1),
                n = "on" + t;
            t = "top" + t, n = {
                phasedRegistrationNames: {
                    bubbled: n,
                    captured: n + "Capture"
                },
                dependencies: [t]
            }, lo[e] = n, uo[t] = n
        });
        var co = {
            eventTypes: lo,
            extractEvents: function(e, t, n, r) {
                var o = uo[e];
                if (!o) return null;
                switch (e) {
                    case "topKeyPress":
                        if (0 === Ve(n)) return null;
                    case "topKeyDown":
                    case "topKeyUp":
                        e = We;
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
                        e = we;
                        break;
                    case "topDrag":
                    case "topDragEnd":
                    case "topDragEnter":
                    case "topDragExit":
                    case "topDragLeave":
                    case "topDragOver":
                    case "topDragStart":
                    case "topDrop":
                        e = Ke;
                        break;
                    case "topTouchCancel":
                    case "topTouchEnd":
                    case "topTouchMove":
                    case "topTouchStart":
                        e = Ye;
                        break;
                    case "topAnimationEnd":
                    case "topAnimationIteration":
                    case "topAnimationStart":
                        e = He;
                        break;
                    case "topTransitionEnd":
                        e = qe;
                        break;
                    case "topScroll":
                        e = ve;
                        break;
                    case "topWheel":
                        e = $e;
                        break;
                    case "topCopy":
                    case "topCut":
                    case "topPaste":
                        e = Ue;
                        break;
                    default:
                        e = B
                }
                return t = e.getPooled(o, t, n, r), R(t), t
            }
        };
        Wr = function(e, t, n, r) {
            e = b(e, t, n, r), k(e), S(!1)
        }, nr.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), Zn = sr.getFiberCurrentPropsFromNode, Jn = sr.getInstanceFromNode, er = sr.getNodeFromInstance, nr.injectEventPluginsByName({
            SimpleEventPlugin: co,
            EnterLeaveEventPlugin: Hr,
            ChangeEventPlugin: Mr,
            SelectEventPlugin: io,
            BeforeInputEventPlugin: Er
        });
        var po = [],
            fo = -1;
        new Set;
        var ho = {
                current: Ln
            },
            yo = {
                current: !1
            },
            mo = Ln,
            vo = null,
            go = null,
            _o = "function" == typeof Symbol && Symbol["for"],
            wo = _o ? Symbol["for"]("react.element") : 60103,
            bo = _o ? Symbol["for"]("react.call") : 60104,
            ko = _o ? Symbol["for"]("react.return") : 60105,
            So = _o ? Symbol["for"]("react.portal") : 60106,
            Co = _o ? Symbol["for"]("react.fragment") : 60107,
            Eo = "function" == typeof Symbol && Symbol.iterator,
            To = Array.isArray,
            xo = xt(!0),
            Lo = xt(!1),
            Oo = {},
            Po = Object.freeze({
                "default": Rt
            }),
            No = Po && Rt || Po,
            Io = No["default"] ? No["default"] : No,
            Ao = "object" == typeof performance && "function" == typeof performance.now,
            Ro = void 0;
        Ro = Ao ? function() {
            return performance.now()
        } : function() {
            return Date.now()
        };
        var Do = void 0,
            Fo = void 0;
        if (wn.canUseDOM)
            if ("function" != typeof requestIdleCallback || "function" != typeof cancelIdleCallback) {
                var Mo, jo = null,
                    Bo = !1,
                    Ho = -1,
                    Uo = !1,
                    zo = 0,
                    Vo = 33,
                    Wo = 33;
                Mo = Ao ? {
                    didTimeout: !1,
                    timeRemaining: function() {
                        var e = zo - performance.now();
                        return e > 0 ? e : 0
                    }
                } : {
                    didTimeout: !1,
                    timeRemaining: function() {
                        var e = zo - Date.now();
                        return e > 0 ? e : 0
                    }
                };
                var Ko = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
                window.addEventListener("message", function(e) {
                    if (e.source === window && e.data === Ko) {
                        if (Bo = !1, e = Ro(), 0 >= zo - e) {
                            if (!(-1 !== Ho && e >= Ho)) return void(Uo || (Uo = !0, requestAnimationFrame(Yo)));
                            Mo.didTimeout = !0
                        } else Mo.didTimeout = !1;
                        Ho = -1, e = jo, jo = null, null !== e && e(Mo)
                    }
                }, !1);
                var Yo = function(e) {
                    Uo = !1;
                    var t = e - zo + Wo;
                    Wo > t && Wo > Vo ? (8 > t && (t = 8), Wo = Vo > t ? Vo : t) : Vo = t, zo = e + Wo, Bo || (Bo = !0, window.postMessage(Ko, "*"))
                };
                Do = function(e, t) {
                    return jo = e, null != t && "number" == typeof t.timeout && (Ho = Ro() + t.timeout), Uo || (Uo = !0, requestAnimationFrame(Yo)), 0
                }, Fo = function() {
                    jo = null, Bo = !1, Ho = -1
                }
            } else Do = window.requestIdleCallback, Fo = window.cancelIdleCallback;
        else Do = function(e) {
            return setTimeout(function() {
                e({
                    timeRemaining: function() {
                        return 1 / 0
                    }
                })
            })
        }, Fo = function(e) {
            clearTimeout(e)
        };
        var qo = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
            $o = {},
            Qo = {},
            Xo = {
                html: "http://www.w3.org/1999/xhtml",
                mathml: "http://www.w3.org/1998/Math/MathML",
                svg: "http://www.w3.org/2000/svg"
            },
            Go = void 0,
            Zo = function(e) {
                return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
                    MSApp.execUnsafeLocalFunction(function() {
                        return e(t, n, r, o)
                    })
                } : e
            }(function(e, t) {
                if (e.namespaceURI !== Xo.svg || "innerHTML" in e) e.innerHTML = t;
                else {
                    for (Go = Go || document.createElement("div"), Go.innerHTML = "<svg>" + t + "</svg>", t = Go.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                    for (; t.firstChild;) e.appendChild(t.firstChild)
                }
            }),
            Jo = {
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
            ei = ["Webkit", "ms", "Moz", "O"];
        Object.keys(Jo).forEach(function(e) {
            ei.forEach(function(t) {
                t = t + e.charAt(0).toUpperCase() + e.substring(1), Jo[t] = Jo[e]
            })
        });
        var ti = bn({
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
            ni = Xo.html,
            ri = kn.thatReturns(""),
            oi = {
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
            ii = Object.freeze({
                createElement: sn,
                createTextNode: ln,
                setInitialProperties: un,
                diffProperties: cn,
                updateProperties: dn,
                diffHydratedProperties: pn,
                diffHydratedText: fn,
                warnForUnmatchedText: function() {},
                warnForDeletedHydratableElement: function() {},
                warnForDeletedHydratableText: function() {},
                warnForInsertedHydratedElement: function() {},
                warnForInsertedHydratedText: function() {},
                restoreControlledState: function(e, t, n) {
                    switch (t) {
                        case "input":
                            if (Vt(e, n), t = n.name, "radio" === n.type && null != t) {
                                for (n = e; n.parentNode;) n = n.parentNode;
                                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                    var o = n[t];
                                    if (o !== e && o.form === e.form) {
                                        var i = T(o);
                                        i ? void 0 : r("90"), ae(o), Vt(o, i)
                                    }
                                }
                            }
                            break;
                        case "textarea":
                            Gt(e, n);
                            break;
                        case "select":
                            t = n.value, null != t && qt(e, !!n.multiple, t, !1)
                    }
                }
            });
        Or.injectFiberControlledHostComponent(ii);
        var ai = null,
            si = null,
            li = Io({
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
                    ai = Vr;
                    var e = Cn();
                    if (je(e)) {
                        if ("selectionStart" in e) var t = {
                            start: e.selectionStart,
                            end: e.selectionEnd
                        };
                        else e: {
                            var n = window.getSelection && window.getSelection();
                            if (n && 0 !== n.rangeCount) {
                                t = n.anchorNode;
                                var r = n.anchorOffset,
                                    o = n.focusNode;
                                n = n.focusOffset;
                                try {
                                    t.nodeType, o.nodeType
                                } catch (i) {
                                    t = null;
                                    break e
                                }
                                var a = 0,
                                    s = -1,
                                    l = -1,
                                    u = 0,
                                    c = 0,
                                    d = e,
                                    p = null;
                                t: for (;;) {
                                    for (var f; d !== t || 0 !== r && 3 !== d.nodeType || (s = a + r), d !== o || 0 !== n && 3 !== d.nodeType || (l = a + n), 3 === d.nodeType && (a += d.nodeValue.length), null !== (f = d.firstChild);) p = d, d = f;
                                    for (;;) {
                                        if (d === e) break t;
                                        if (p === t && ++u === r && (s = a), p === o && ++c === n && (l = a), null !== (f = d.nextSibling)) break;
                                        d = p, p = d.parentNode
                                    }
                                    d = f
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
                    si = {
                        focusedElem: e,
                        selectionRange: t
                    }, Oe(!1)
                },
                resetAfterCommit: function() {
                    var e = si,
                        t = Cn(),
                        n = e.focusedElem,
                        r = e.selectionRange;
                    if (t !== n && Tn(document.documentElement, n)) {
                        if (je(n))
                            if (t = r.start, e = r.end, void 0 === e && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
                            else if (window.getSelection) {
                            t = window.getSelection();
                            var o = n[F()].length;
                            e = Math.min(r.start, o), r = void 0 === r.end ? e : Math.min(r.end, o), !t.extend && e > r && (o = r, r = e, e = o), o = Me(n, e);
                            var i = Me(n, r);
                            if (o && i && (1 !== t.rangeCount || t.anchorNode !== o.node || t.anchorOffset !== o.offset || t.focusNode !== i.node || t.focusOffset !== i.offset)) {
                                var a = document.createRange();
                                a.setStart(o.node, o.offset), t.removeAllRanges(), e > r ? (t.addRange(a), t.extend(i.node, i.offset)) : (a.setEnd(i.node, i.offset), t.addRange(a))
                            }
                        }
                        for (t = [], e = n; e = e.parentNode;) 1 === e.nodeType && t.push({
                            element: e,
                            left: e.scrollLeft,
                            top: e.scrollTop
                        });
                        for (xn(n), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
                    }
                    si = null, Oe(ai), ai = null
                },
                createInstance: function(e, t, n, r, o) {
                    return e = sn(e, t, n, r), e[ir] = o, e[ar] = t, e
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
                prepareUpdate: function(e, t, n, r, o) {
                    return cn(e, t, n, r, o)
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
                now: Ro,
                mutation: {
                    commitMount: function(e) {
                        e.focus()
                    },
                    commitUpdate: function(e, t, n, r, o) {
                        e[ar] = o, dn(e, t, n, r, o)
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
                    hydrateInstance: function(e, t, n, r, o, i) {
                        return e[ir] = i, e[ar] = n, pn(e, t, n, o, r)
                    },
                    hydrateTextInstance: function(e, t, n) {
                        return e[ir] = n, fn(e, t)
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
                scheduleDeferredCallback: Do,
                cancelDeferredCallback: Fo,
                useSyncScheduling: !0
            });
        Z = li.batchedUpdates, gn.prototype.render = function(e, t) {
            li.updateContainer(e, this._reactRootContainer, null, t)
        }, gn.prototype.unmount = function(e) {
            li.updateContainer(null, this._reactRootContainer, null, e)
        };
        var ui = {
            createPortal: vn,
            findDOMNode: function(e) {
                if (null == e) return null;
                if (1 === e.nodeType) return e;
                var t = e._reactInternalFiber;
                return t ? li.findHostInstance(t) : void("function" == typeof e.render ? r("188") : r("213", Object.keys(e)))
            },
            hydrate: function(e, t, n) {
                return mn(null, e, t, !0, n)
            },
            render: function(e, t, n) {
                return mn(null, e, t, !1, n)
            },
            unstable_renderSubtreeIntoContainer: function(e, t, n, o) {
                return null == e || void 0 === e._reactInternalFiber ? r("38") : void 0, mn(e, t, n, !1, o)
            },
            unmountComponentAtNode: function(e) {
                return hn(e) ? void 0 : r("40"), e._reactRootContainer ? (li.unbatchedUpdates(function() {
                    mn(null, null, e, !1, function() {
                        e._reactRootContainer = null
                    })
                }), !0) : !1
            },
            unstable_createPortal: vn,
            unstable_batchedUpdates: J,
            unstable_deferredUpdates: li.deferredUpdates,
            flushSync: li.flushSync,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                EventPluginHub: rr,
                EventPluginRegistry: Gn,
                EventPropagators: lr,
                ReactControlledComponent: Pr,
                ReactDOMComponentTree: sr,
                ReactDOMEventListener: Kr
            }
        };
        li.injectIntoDevTools({
            findFiberByHostInstance: C,
            bundleType: 0,
            version: "16.2.0",
            rendererPackageName: "react-dom"
        });
        var ci = Object.freeze({
                "default": ui
            }),
            di = ci && ui || ci;
        e.exports = di["default"] ? di["default"] : di
    },
    211: function(e, t, n) {
        "use strict";
        var r = n(142),
            o = {
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
        e.exports = o
    },
    223: function(e, t, n) {
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
                className: "stories_button_views",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(r, "%s", !0)
                }
            }), s && o.createElement("div", {
                className: "stories_button_replies",
                dangerouslySetInnerHTML: {
                    __html: langNumeric(s, "%s", !0)
                }
            }))
        }
        n.r(t), n.d(t, "default", function() {
            return r
        });
        var o = n(247);
        n(254)
    },
    224: function(e, t, n) {
        "use strict";
        var r = {};
        e.exports = r
    },
    226: function(e, t, n) {
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

        function p(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : f(e, t)
        }

        function f(e, t) {
            if (t = r(t), !t) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function h(e, t, n) {
            var r = document.createElement(e);
            return t && extend(r, t), n && ue(r, n), r
        }

        function y(e) {
            return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
        }

        function m(e) {
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
            return isString(t) && (t = m(t)), T(e).replaceChild(t, e), t
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

        function O(e, t) {
            var n = T(t);
            return n && n.insertBefore(e, k(t))
        }

        function P(e, t) {
            return e ? s(t, e) : e
        }

        function N(e, t, n) {
            return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function I(e) {
            for (var t = 0; null != (e = S(e));) t++;
            return t
        }

        function A(e, t) {
            do e = T(e); while (e && !D(e, t));
            return e
        }

        function R(e, t, n) {
            for (var r = null; null === r && e;) e = -1 === n ? S(e) : k(e), e && D(e, t) && (r = e);
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

        function F(e) {
            return D(e, ":hover")
        }

        function M(e, t) {
            var n = r(e);
            if (t = r(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n == t) return !0;
            return !1
        }

        function j() {
            var e = browser.msie6 ? r("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function B(e, t) {
            t = t || {};
            for (var n = t.fromEl || T(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
                var o = le(n, "position");
                if (inArray(o, r) && (!t.noOverflow || "hidden" != le(n, "overflow"))) break;
                n = T(n)
            }
            return n
        }

        function H(e, t) {
            e = r(e);
            for (var n, o, i, a, s = e; s && s.tagName && s !== bodyNode && (n = le(s, "position"), o = le(s, "overflow"), i = le(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === o || ("static" === n ? a && "relative" !== a : "fixed" === a));) "none" !== i ? a = void 0 : "static" !== n && "fixed" !== a && (a = n), s = T(s);
            return s
        }

        function U(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; t > n; n++) U(arguments[n]);
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

        function V(e) {
            return e = r(e), e && e.style ? "none" != le(e, "display") : !1
        }

        function W() {
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
            return void 0 === t && (t = !V(e)), t ? U(e) : z(e), t
        }

        function q(e) {
            return "undefined" != typeof e.getBoundingClientRect
        }

        function $(e, t) {
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
            return a ? (n = a.documentElement, q(e) && (i = $(e, !0)), o = a == a.window ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1, [i.left + (t ? 0 : o.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), i.top + (t ? 0 : o.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
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
                    i = q(e) && (o = $(e, n)) && void 0 !== o.width ? [o.width, o.height] : [e.offsetWidth, e.offsetHeight], t && each(i, function(t, n) {
                        var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(r, function() {
                            i[t] -= parseFloat(le(e, "padding" + this)) || 0, i[t] -= parseFloat(le(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (V(e)) s();
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
            var o = pe(e, "pseudo-id");
            o || (pe(e, "pseudo-id", o = irand(1e8, 999999999)), te(e, "_pseudo_" + o));
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

        function pe(e, t, n) {
            if (!e) return !1;
            var r, o = e[vkExpand];
            return o || (o = e[vkExpand] = ++vkUUID), n !== r && (vkCache[o] || (vkCache[o] = {}, __debugMode && (vkCache[o].__elem = e)), vkCache[o][t] = n), t ? vkCache[o] && vkCache[o][t] : o
        }

        function fe(e, t, n) {
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

        function ye(e, t) {
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
                        r || ye(e)
                    }
                } else removeEvent(e), he(e, vkExpand), delete vkCache[n]
        }

        function me() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = r(e[t]);
                n && (ye(n), he(n, "btnevents"))
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
            return p
        }), n.d(t, "gpeByTag", function() {
            return f
        }), n.d(t, "ce", function() {
            return h
        }), n.d(t, "re", function() {
            return y
        }), n.d(t, "se", function() {
            return m
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
            return O
        }), n.d(t, "domByClass", function() {
            return P
        }), n.d(t, "domData", function() {
            return N
        }), n.d(t, "domChildIndex", function() {
            return I
        }), n.d(t, "domCA", function() {
            return A
        }), n.d(t, "domClosestSibling", function() {
            return R
        }), n.d(t, "matchesSelector", function() {
            return D
        }), n.d(t, "isHover", function() {
            return F
        }), n.d(t, "isAncestor", function() {
            return M
        }), n.d(t, "getScroll", function() {
            return j
        }), n.d(t, "domClosestPositioned", function() {
            return B
        }), n.d(t, "domClosestOverflowHidden", function() {
            return H
        }), n.d(t, "show", function() {
            return U
        }), n.d(t, "hide", function() {
            return z
        }), n.d(t, "isVisible", function() {
            return V
        }), n.d(t, "clientHeight", function() {
            return W
        }), n.d(t, "getClientRectOffsetY", function() {
            return K
        }), n.d(t, "toggle", function() {
            return Y
        }), n.d(t, "boundingRectEnabled", function() {
            return q
        }), n.d(t, "getXYRect", function() {
            return $
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
            return pe
        }), n.d(t, "attr", function() {
            return fe
        }), n.d(t, "removeAttr", function() {
            return he
        }), n.d(t, "removeData", function() {
            return ye
        }), n.d(t, "cleanElems", function() {
            return me
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
        var Ce = n(168),
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
        window.ge = r, window.geByTag = o, window.geByTag1 = i, window.geByClass = a, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = u, window.domQuery1 = c, window.domClosest = d, window.ce = h, window.re = y, window.se = m, window.sech = v, window.rs = g, window.psr = _, window.domReplaceEl = w, window.domEL = b, window.domNS = k, window.domPS = S, window.domFC = C, window.domLC = E, window.domPN = T, window.domChildren = x, window.domInsertBefore = L, window.domInsertAfter = O, window.domByClass = P, window.domData = N, window.domChildIndex = I, window.domCA = A, window.domClosestSibling = R, window.matchesSelector = D, window.isHover = F, window.isAncestor = M, window.getScroll = j, window.domClosestPositioned = B, window.domClosestOverflowHidden = H, window.show = U, window.hide = z, window.isVisible = V, window.clientHeight = W, window.getClientRectOffsetY = K, window.toggle = Y, window.boundingRectEnabled = q, window.getXYRect = $, window.getXY = Q, window.isWindow = X, window.getSize = G, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = oe, window.toggleClass = ie, window.toggleClassDelayed = ae, window.replaceClass = se, window.getStyle = le, window.setStyle = ue, window.setStyleDelayed = ce, window.setPseudoStyle = de, window.data = pe, window.attr = fe, window.removeAttr = he, window.removeData = ye, window.cleanElems = me, window.setTitle = ve, window.getZoom = ge, window.val = _e, window.elfocus = we, window.traverseParent = be, window.getH = J, window.getW = Z, window.domClosestByTag = p, window.setDocumentTitle = ke, window.lockDocumentTitle = Se
    },
    243: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MODULE", function() {
            return r
        });
        var r = "group_personal_card"
    },
    247: function(e, t, n) {
        "use strict";
        e.exports = n(115)
    },
    254: function(e, t, n) {
        e.exports = n(195)()
    },
    271: function(e, t, n) {
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

        function p(e, t, n, r, o) {
            e *= 1e3, "undefined" == typeof n && (n = !0), "undefined" == typeof r && (r = c("months_of", "raw")), t *= 1e3;
            var i = Date.now(),
                a = new Date(i),
                s = new Date(e + t);
            return !o && e > i && 864e5 > e - i && a.getDate() == s.getDate() ? d(e, "{hour}:{minute} {am_pm}", t, [], !n) : s.getYear() != a.getYear() || i - 157248e5 > e ? d(e, c("global_date", "raw"), t, r, !n) : d(e, c("global_short_date", "raw"), t, r, !n)
        }

        function f(e, t, n, r) {
            return isToday(new Date(1e3 * e + 1e3 * t)) ? d(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : p(e, t, n, r)
        }

        function h(e, t, n) {
            return isArray(t) && e < t.length ? t[e] : a(e, n)
        }

        function y(e, t) {
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
            } else n = m(e, 0, !0, "_l");
            return n
        }

        function m(e, t, n, r) {
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
            return p
        }), n.d(t, "getShortDateOrTime", function() {
            return f
        }), n.d(t, "langWordNumeric", function() {
            return h
        }), n.d(t, "getDateText", function() {
            return y
        }), n.d(t, "getBigDateNew", function() {
            return m
        }), n.d(t, "getSmDate", function() {
            return v
        }), window.parseLatin = r, window.parseCyr = o, window.parseLatKeys = i, window.langNumeric = a, window.langSex = s, window.langStr = l, window.addLangKeys = u, window.getLang = c, window.langDate = d, window.getShortDate = p, window.getShortDateOrTime = f, window.langWordNumeric = h, window.getDateText = y, window.getBigDateNew = m, window.getSmDate = v
    },
    272: function(e, t, n) {
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
    },
    29: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = arguments;
            cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = e, ge("stories_layers_background") || c(), e.animateStory("expand", t.fromEl), m.push(e), e.length > 1 && addClass(e.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + m.length, function(t) {
                var r = n[0] && n[0].isCloseBtnClick;
                m.length > 1 && !r ? e.back(!0) : (e.hideAllLayers = r, e.hide(!1, !0))
            })
        }

        function o() {
            m.pop(), cur.storyLayer = m[m.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())
        }

        function i() {
            m.length > 1 && (m[m.length - 2].setLayerVisibility(!1), m[m.length - 1].showBackButton())
        }

        function a() {
            m.length > 1 ? m[m.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
        }

        function s(e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1, n = 0; n < m.length; n++) m[n].hide(!0);
            if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), d(), t) {
                var r = nav.objLoc;
                delete r.w, nav.setLoc(r)
            }
            cur.needUpdateFeedStories && Stories.updateFeedStories(), m = []
        }

        function l() {
            return m.length
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

        function p() {
            return m[0]
        }

        function f() {
            return m[m.length - 2]
        }

        function h() {
            for (var e = m.length - 2; e >= 0; e--) m[e].doHide(!0);
            m.splice(0, m.length - 1)
        }

        function y(e) {
            for (var t = 0; t < m.length; t++) m[t].onReplyDeleted(e)
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
            return p
        }), n.d(t, "getPrevLayer", function() {
            return f
        }), n.d(t, "slicePrevLayers", function() {
            return h
        }), n.d(t, "onReplyDeleted", function() {
            return y
        });
        var m = [],
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
    },
    294: function(e, t, n) {
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
                    q = e
                }

                function u(e) {
                    G = e
                }

                function c() {
                    return function() {
                        r.nextTick(y)
                    }
                }

                function d() {
                    return function() {
                        Y(y)
                    }
                }

                function p() {
                    var e = 0,
                        t = new ee(y),
                        n = document.createTextNode("");
                    return t.observe(n, {
                            characterData: !0
                        }),
                        function() {
                            n.data = e = ++e % 2
                        }
                }

                function f() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = y,
                        function() {
                            e.port2.postMessage(0)
                        }
                }

                function h() {
                    return function() {
                        setTimeout(y, 1)
                    }
                }

                function y() {
                    for (var e = 0; X > e; e += 2) {
                        var t = re[e],
                            n = re[e + 1];
                        t(n), re[e] = void 0, re[e + 1] = void 0
                    }
                    X = 0
                }

                function m() {
                    try {
                        var e = n(15);
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
                            D(r, o, a, i)
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
                                r || (r = !0, t !== n ? x(e, n) : O(e, n))
                            }, function(t) {
                                r || (r = !0, P(e, t))
                            }, "Settle: " + (e._label || " unknown promise"));
                        !r && o && (r = !0, P(e, o))
                    }, e)
                }

                function E(e, t) {
                    t._state === se ? O(e, t._result) : t._state === le ? P(e, t._result) : N(t, void 0, function(t) {
                        x(e, t)
                    }, function(t) {
                        P(e, t)
                    })
                }

                function T(e, t, n) {
                    t.constructor === e.constructor && n === oe && constructor.resolve === ie ? E(e, t) : n === ue ? P(e, ue.error) : void 0 === n ? O(e, t) : s(n) ? C(e, t, n) : O(e, t)
                }

                function x(e, t) {
                    e === t ? P(e, w()) : a(t) ? T(e, t, k(t)) : O(e, t)
                }

                function L(e) {
                    e._onerror && e._onerror(e._result), I(e)
                }

                function O(e, t) {
                    e._state === ae && (e._result = t, e._state = se, 0 !== e._subscribers.length && G(I, e))
                }

                function P(e, t) {
                    e._state === ae && (e._state = le, e._result = t, G(L, e))
                }

                function N(e, t, n, r) {
                    var o = e._subscribers,
                        i = o.length;
                    e._onerror = null, o[i] = t, o[i + se] = n, o[i + le] = r, 0 === i && e._state && G(I, e)
                }

                function I(e) {
                    var t = e._subscribers,
                        n = e._state;
                    if (0 !== t.length) {
                        for (var r, o, i = e._result, a = 0; a < t.length; a += 3) r = t[a], o = t[a + n], r ? D(n, r, o, i) : o(i);
                        e._subscribers.length = 0
                    }
                }

                function A() {
                    this.error = null
                }

                function R(e, t) {
                    try {
                        return e(t)
                    } catch (n) {
                        return ce.error = n, ce
                    }
                }

                function D(e, t, n, r) {
                    var o, i, a, l, u = s(n);
                    if (u) {
                        if (o = R(n, r), o === ce ? (l = !0, i = o.error, o = null) : a = !0, t === o) return void P(t, b())
                    } else o = r, a = !0;
                    t._state !== ae || (u && a ? x(t, o) : l ? P(t, i) : e === se ? O(t, o) : e === le && P(t, o))
                }

                function F(e, t) {
                    try {
                        t(function(t) {
                            x(e, t)
                        }, function(t) {
                            P(e, t)
                        })
                    } catch (n) {
                        P(e, n)
                    }
                }

                function M(e) {
                    return new me(this, e).promise
                }

                function j(e) {
                    function t(e) {
                        x(o, e)
                    }

                    function n(e) {
                        P(o, e)
                    }
                    var r = this,
                        o = new r(_);
                    if (!Q(e)) return P(o, new TypeError("You must pass an array to race.")), o;
                    for (var i = e.length, a = 0; o._state === ae && i > a; a++) N(r.resolve(e[a]), void 0, t, n);
                    return o
                }

                function B(e) {
                    var t = this,
                        n = new t(_);
                    return P(n, e), n
                }

                function H() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function U() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function z(e) {
                    this._id = he++, this._state = void 0, this._result = void 0, this._subscribers = [], _ !== e && ("function" != typeof e && H(), this instanceof z ? F(this, e) : U())
                }

                function V(e, t) {
                    this._instanceConstructor = e, this.promise = new e(_), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? O(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && O(this.promise, this._result))) : P(this.promise, this._validationError())
                }

                function W() {
                    var e;
                    if ("undefined" != typeof o) e = o;
                    else if ("undefined" != typeof self) e = self;
                    else try {
                        e = Function("return this")()
                    } catch (t) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var n = e.Promise;
                    (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = ye)
                }
                var K;
                K = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                };
                var Y, q, $, Q = K,
                    X = 0,
                    G = function(e, t) {
                        re[X] = e, re[X + 1] = t, X += 2, 2 === X && (q ? q(y) : $())
                    },
                    Z = "undefined" != typeof window ? window : void 0,
                    J = Z || {},
                    ee = J.MutationObserver || J.WebKitMutationObserver,
                    te = "undefined" != typeof r && "[object process]" === {}.toString.call(r),
                    ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    re = new Array(1e3);
                $ = te ? c() : ee ? p() : ne ? f() : void 0 === Z ? m() : h();
                var oe = v,
                    ie = g,
                    ae = void 0,
                    se = 1,
                    le = 2,
                    ue = new A,
                    ce = new A,
                    de = M,
                    pe = j,
                    fe = B,
                    he = 0,
                    ye = z;
                z.all = de, z.race = pe, z.resolve = ie, z.reject = fe, z._setScheduler = l, z._setAsap = u, z._asap = G, z.prototype = {
                    constructor: z,
                    then: oe,
                    "catch": function(e) {
                        return this.then(null, e)
                    }
                };
                var me = V;
                V.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, V.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, n = 0; this._state === ae && e > n; n++) this._eachEntry(t[n], n)
                }, V.prototype._eachEntry = function(e, t) {
                    var n = this._instanceConstructor,
                        r = n.resolve;
                    if (r === ie) {
                        var o = k(e);
                        if (o === oe && e._state !== ae) this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                        else if (n === ye) {
                            var i = new n(_);
                            T(i, e, o), this._willSettleAt(i, t)
                        } else this._willSettleAt(new n(function(t) {
                            t(e)
                        }), t)
                    } else this._willSettleAt(r(e), t)
                }, V.prototype._settledAt = function(e, t, n) {
                    var r = this.promise;
                    r._state === ae && (this._remaining--, e === le ? P(r, n) : this._result[t] = n), 0 === this._remaining && O(r, this._result)
                }, V.prototype._willSettleAt = function(e, t) {
                    var n = this;
                    N(e, void 0, function(e) {
                        n._settledAt(se, t, e)
                    }, function(e) {
                        n._settledAt(le, t, e)
                    })
                };
                var ve = W,
                    ge = {
                        Promise: ye,
                        polyfill: ve
                    };
                i = function() {
                    return ge
                }.call(t, n, t, e), !(void 0 !== i && (e.exports = i)), ve()
            }).call(this)
        }).call(this, n(146), n(31))
    },
    3: function(e, t, n) {
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
    },
    31: function(e, t) {
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
    },
    33: function(e, t, n) {
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
    },
    49: function(e, t, n) {
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
        var a = n(85),
            s = n(272),
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
                    (0 === this.startTs || this.pauseTime > 0) && (this.startTs = Date.now() - this.pauseTime, this.pauseTime = 0), e.prototype.play.call(this)
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
    },
    5: function(e, t, n) {
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
    },
    51: function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(t);
        var o = n(173),
            i = n(29),
            a = n(185),
            s = n(103),
            l = n(133),
            u = n(243),
            c = n(180),
            d = n(197),
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
            f = function() {
                function e(t, n, o, i) {
                    r(this, e), this.queue = [], this.storiesToRead = [];
                    try {
                        window.Videoview && Videoview.togglePlay(!1)
                    } catch (a) {}
                    this.initDOM(), this.show(), this._init(t, n, o, i), addClass(this.layerEl, "shown")
                }
                return e.prototype._init = function(e, t, n, r) {
                    var o = e.split("_"),
                        i = p(o, 1),
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
                    return this.activeStory ? this.activeStory.getRawId() : !1;
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
                        var p = s[0];
                        d = this.renderedStories[p.author.id].story
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
                    (hasClass(e.target, "stories_layer_cont") || t) && (t && (this.isCloseBtnClick = !0), cancelStackPop())
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
                            i = p(o, 2),
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
                            u = p(l, 2),
                            c = u[0],
                            d = u[1],
                            f = getSize(o),
                            h = window.innerHeight,
                            y = Math.min(a.STORY_MAX_WIDTH, Math.max(a.STORY_MAX_HEIGHT, h * a.STORY_HORIZONTAL_RATIO)),
                            m = y * a.STORY_VERTICAL_RATIO,
                            v = Math.max(0, (h - m) / 2),
                            g = Math.max(0, (window.innerWidth - y) / 2);
                        c = g - c + y / 2 - f[0] / 2 + scrollGetX(), d = v - d + m / 2 - f[1] / 2 + scrollGetY(), c = -c, d = -d;
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
                        i = p(o, 1),
                        a = i[0],
                        l = getSize(n),
                        u = p(l, 1),
                        c = u[0],
                        d = function(e) {
                            var n = Math.max(0, Math.min(e.pageX - a, c)),
                                o = n / c * 100;
                            setStyle(r, "width", o + "%"), s.setVolume(o / 100), t.activeStory.volumeUpdate()
                        },
                        f = function h() {
                            removeEvent(window, "mousemove", d), removeEvent(window, "mouseup", h), t._updateVolumeButton(), removeClass(t.volumeControlContainer, "changing")
                        };
                    addEvent(window, "mousemove", d), addEvent(window, "mouseup", f), d(e)
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
        t["default"] = f
    },
    57: function(e, t, n) {
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
                p = function() {
                    s.hide(c), clearTimeout(u), u = setTimeout(function() {
                        return t.playStory()
                    }, 300)
                };
            return i.createElement("div", {
                className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
                onMouseEnter: d,
                onMouseLeave: p,
                ref: function(e) {
                    c = e
                }
            }, i.createElement("div", {
                className: "ui_actions_menu _ui_menu"
            }, l.map(function(e) {
                var t = e.label,
                    n = e.className,
                    r = e.onClick;
                return i.createElement("div", {
                    key: t,
                    className: "ui_actions_menu_item " + n,
                    onClick: r,
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
                },
                className: "stories_can_hide_reply_action"
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
        var i = n(247),
            a = (n(254), function() {
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
    },
    59: function(e, t, n) {
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
                p = function() {
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
                onClick: p
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
        var i = n(247);
        n(254)
    },
    66: function(e, t, n) {
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
    },
    74: function(e, t, n) {
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
    },
    79: function(e, t, n) {
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
        var a = n(247),
            s = n(103),
            l = n(57),
            u = n(59),
            c = n(223),
            d = window,
            p = d.getLang,
            f = d.showTooltip,
            h = d.trim,
            y = d.addEvent,
            m = d.removeEvent,
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
                            return f(e.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: p("stories_mask_tooltip")
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
                            return f(e.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: p("stories_share")
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
                            return f(e.target, {
                                black: 1,
                                center: 1,
                                shift: [1, 13, 0],
                                text: p("global_delete")
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
                        placeholder: p("stories_answer_placeholder"),
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
                    }), y(this.refs.smileButton, "click", v), placeholderInit(this.refs.messageInput, {
                        editable: !0
                    })) : this.emojiId && !this.refs.messageInput && (m(this.refs.smileButton, "click", v), Emoji.destroy(this.emojiId), delete this.emojiId)
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
    },
    85: function(e, t, n) {
        "use strict";

        function r() {
            g || (g = new Worker("/js/al/stories_loader_worker.js"), g.onmessage = function(e) {
                var t = e.data;
                switch (t.type) {
                    case "loaded":
                        y[t.url] = t.data, i(t.url, !0, t.data);
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
            var r = m[e];
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
                if (e || t(""), y[e]) return t(y[e]);
                var r = o(e);
                switch (r) {
                    case "video":
                    case "image":
                        m[e] || (m[e] = []);
                        var i = 0 === m[e].length;
                        if (m[e].push({
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

        function p(e) {
            return w || l(), e.match(/\.mp4/) ? c(e) : d(e)
        }
        n.r(t), n.d(t, "loadMedia", function() {
            return s
        }), n.d(t, "default", function() {
            return p
        });
        var f = n(294),
            h = f.Promise,
            y = {},
            m = {},
            v = [],
            g = !1,
            _ = !1,
            w = !1
    }
});