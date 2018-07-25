! function(t) {
    var e = {};

    function n(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, r) {
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
    }, n.p = "", n(n.s = 108)
}({
    108: function(t, e, n) {
        t.exports = n(146)
    },
    146: function(t, e, n) {
        "use strict";
        n.r(e);
        var r = n(70),
            o = n(19),
            i = window.LazyLoadInited;

        function u(t) {
            i && (Object(o.default)(), Object(r.update)(t))
        }
        window.LazyLoad = {
            init: function() {
                i || (window.LazyLoadInited = i = !0, Element.prototype.closest && (Object(o.default)(), Object(r.default)()))
            },
            scan: u,
            scanDelayed: function(t) {
                return setTimeout(function() {
                    return u(t)
                }, 20)
            },
            watch: function() {
                i && Object(r.watch)()
            }
        };
        try {
            stManager.done("lazyload.js")
        } catch (t) {}
    },
    19: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "getObjects", function() {
            return a
        });
        var r = n(70),
            o = n(24),
            i = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var u, c = t[Symbol.iterator](); !(r = (u = c.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                        } catch (t) {
                            o = !0, i = t
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            u = [];

        function c(t) {
            var e = Object(o.getXY)(t),
                n = i(e, 2)[1],
                r = t.closest(".ui_scroll_outer, #wk_layer_wrap, #box_layer_wrap, body"),
                u = !1;
            if ("BODY" !== r.tagName && r) {
                u = !0;
                var c = Object(o.getXY)(r);
                n -= i(c, 2)[1], n += r.scrollTop
            }
            return {
                y: n,
                from: u ? "custom_scroll" : "window"
            }
        }

        function a() {
            return u
        }
        e.default = function() {
            ! function() {
                u = [];
                for (var t = Object(o.geByClass)("lazyload_need_load"), e = 0; e < t.length; e++) {
                    var n = t[e],
                        r = c(n),
                        a = r.y,
                        l = r.from,
                        s = Object(o.getSize)(n),
                        d = i(s, 2),
                        f = d[0],
                        w = d[1];
                    u.push({
                        elem: n,
                        y: a,
                        from: l,
                        width: f,
                        height: w
                    })
                }
                cur.objects = u
            }(), Object(r.update)()
        }
    },
    194: function(t, e) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    },
    218: function(t, e) {},
    24: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "ge", function() {
            return l
        }), n.d(e, "geByTag", function() {
            return s
        }), n.d(e, "geByTag1", function() {
            return d
        }), n.d(e, "geByClass", function() {
            return f
        }), n.d(e, "geByClass1", function() {
            return w
        }), n.d(e, "gpeByClass", function() {
            return p
        }), n.d(e, "domQuery", function() {
            return h
        }), n.d(e, "domQuery1", function() {
            return m
        }), n.d(e, "domClosest", function() {
            return v
        }), n.d(e, "domClosestByTag", function() {
            return y
        }), n.d(e, "gpeByTag", function() {
            return g
        }), n.d(e, "ce", function() {
            return b
        }), n.d(e, "re", function() {
            return C
        }), n.d(e, "se", function() {
            return _
        }), n.d(e, "sech", function() {
            return T
        }), n.d(e, "rs", function() {
            return S
        }), n.d(e, "psr", function() {
            return x
        }), n.d(e, "domReplaceEl", function() {
            return k
        }), n.d(e, "domEL", function() {
            return j
        }), n.d(e, "domNS", function() {
            return O
        }), n.d(e, "domPS", function() {
            return A
        }), n.d(e, "domFC", function() {
            return E
        }), n.d(e, "domLC", function() {
            return N
        }), n.d(e, "domPN", function() {
            return L
        }), n.d(e, "domChildren", function() {
            return M
        }), n.d(e, "domInsertBefore", function() {
            return D
        }), n.d(e, "domInsertAfter", function() {
            return H
        }), n.d(e, "domByClass", function() {
            return R
        }), n.d(e, "domData", function() {
            return P
        }), n.d(e, "domChildIndex", function() {
            return z
        }), n.d(e, "domCA", function() {
            return B
        }), n.d(e, "domClosestSibling", function() {
            return I
        }), n.d(e, "matchesSelector", function() {
            return W
        }), n.d(e, "isHover", function() {
            return U
        }), n.d(e, "isAncestor", function() {
            return F
        }), n.d(e, "getScroll", function() {
            return Y
        }), n.d(e, "domClosestPositioned", function() {
            return $
        }), n.d(e, "domClosestOverflowHidden", function() {
            return q
        }), n.d(e, "show", function() {
            return X
        }), n.d(e, "hide", function() {
            return V
        }), n.d(e, "isVisible", function() {
            return K
        }), n.d(e, "clientHeight", function() {
            return Q
        }), n.d(e, "getClientRectOffsetY", function() {
            return Z
        }), n.d(e, "toggle", function() {
            return G
        }), n.d(e, "boundingRectEnabled", function() {
            return J
        }), n.d(e, "getXYRect", function() {
            return tt
        }), n.d(e, "getXY", function() {
            return et
        }), n.d(e, "isWindow", function() {
            return nt
        }), n.d(e, "getSize", function() {
            return rt
        }), n.d(e, "getW", function() {
            return ot
        }), n.d(e, "getH", function() {
            return it
        }), n.d(e, "hasClass", function() {
            return ut
        }), n.d(e, "addClass", function() {
            return ct
        }), n.d(e, "addClassDelayed", function() {
            return at
        }), n.d(e, "removeClass", function() {
            return lt
        }), n.d(e, "removeClassDelayed", function() {
            return st
        }), n.d(e, "toggleClass", function() {
            return dt
        }), n.d(e, "toggleClassDelayed", function() {
            return ft
        }), n.d(e, "replaceClass", function() {
            return wt
        }), n.d(e, "getStyle", function() {
            return pt
        }), n.d(e, "setStyle", function() {
            return ht
        }), n.d(e, "setStyleDelayed", function() {
            return mt
        }), n.d(e, "setPseudoStyle", function() {
            return vt
        }), n.d(e, "data", function() {
            return yt
        }), n.d(e, "attr", function() {
            return gt
        }), n.d(e, "removeAttr", function() {
            return bt
        }), n.d(e, "removeData", function() {
            return Ct
        }), n.d(e, "cleanElems", function() {
            return _t
        }), n.d(e, "setTitle", function() {
            return Tt
        }), n.d(e, "getZoom", function() {
            return St
        }), n.d(e, "val", function() {
            return xt
        }), n.d(e, "elfocus", function() {
            return kt
        }), n.d(e, "traverseParent", function() {
            return jt
        }), n.d(e, "setDocumentTitle", function() {
            return At
        }), n.d(e, "lockDocumentTitle", function() {
            return Et
        });
        var r, o, i, u, c = n(312),
            a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };

        function l(t) {
            return "string" == typeof t || "number" == typeof t ? document.getElementById(t) : t
        }

        function s(t, e) {
            return (e = l(e) || document).getElementsByTagName(t)
        }

        function d(t, e) {
            return (e = l(e) || document).querySelector && e.querySelector(t) || s(t, e)[0]
        }

        function f(t, e, n) {
            e = l(e) || document, n = n || "*";
            var r = [];
            if (e.querySelectorAll && "*" != n) return e.querySelectorAll(n + "." + t);
            if (e.getElementsByClassName) {
                var o = e.getElementsByClassName(t);
                if ("*" != n) {
                    n = n.toUpperCase();
                    for (var i = 0, u = o.length; i < u; ++i) o[i].tagName.toUpperCase() == n && r.push(o[i])
                } else r = Array.prototype.slice.call(o);
                return r
            }
            var c = s(n, e),
                a = new RegExp("(^|\\s)" + t + "(\\s|$)");
            for (i = 0, u = c.length; i < u; ++i) a.test(c[i].className) && r.push(c[i]);
            return r
        }

        function w(t, e, n) {
            return e = l(e) || document, n = n || "*", e.querySelector && e.querySelector(n + "." + t) || f(t, e, n)[0]
        }

        function p(t, e, n) {
            if (!(e = l(e))) return null;
            for (; n !== e && (e = e.parentNode);)
                if (ut(e, t)) return e;
            return null
        }

        function h(t, e) {
            return (e || document).querySelectorAll(t)
        }

        function m(t, e) {
            return (e || document).querySelector(t)
        }

        function v(t, e) {
            return ut(e, t) ? e : p(t, e)
        }

        function y(t, e) {
            return t = t.toUpperCase(), e.nodeType == Node.ELEMENT_NODE && e.tagName.toUpperCase() == t ? e : g(t, e)
        }

        function g(t, e) {
            if (!(e = l(e))) return null;
            for (t = t.toUpperCase(); e = e.parentNode;)
                if (e.tagName && e.tagName.toUpperCase() == t) return e;
            return null
        }

        function b(t, e, n) {
            var r = document.createElement(t);
            return e && extend(r, e), n && ht(r, n), r
        }

        function C(t) {
            return (t = l(t)) && t.parentNode && t.parentNode.removeChild(t), t
        }

        function _(t) {
            return E(b("div", {
                innerHTML: t
            }))
        }

        function T(t) {
            return M(b("div", {
                innerHTML: t
            }))
        }

        function S(t, e) {
            return each(e, function(e, n) {
                t = t.replace(new RegExp("%" + e + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), t
        }

        function x(t) {
            return "https:" != locProtocol ? t : t = (t = (t = (t = (t = t.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function k(t, e) {
            return isString(e) && (e = _(e)), L(t).replaceChild(e, t), e
        }

        function j(t, e) {
            for (e = e ? "previousSibling" : "nextSibling"; t && !t.tagName;) t = t[e];
            return t
        }

        function O(t) {
            return j((t || {}).nextSibling)
        }

        function A(t) {
            return j((t || {}).previousSibling, 1)
        }

        function E(t) {
            return j((t || {}).firstChild)
        }

        function N(t) {
            return j((t || {}).lastChild, 1)
        }

        function L(t) {
            return (t || {}).parentNode
        }

        function M(t) {
            for (var e = [], n = t.childNodes, r = 0; r < n.length; r++) n[r].tagName && e.push(n[r]);
            return e
        }

        function D(t, e) {
            var n = L(e);
            return n && n.insertBefore(t, e)
        }

        function H(t, e) {
            var n = L(e);
            return n && n.insertBefore(t, O(e))
        }

        function R(t, e) {
            return t ? w(e, t) : t
        }

        function P(t, e, n) {
            return t ? void 0 !== n ? (null === n ? t.removeAttribute("data-" + e) : t.setAttribute("data-" + e, n), n) : t.getAttribute("data-" + e) : null
        }

        function z(t) {
            for (var e = 0; null != (t = A(t));) e++;
            return e
        }

        function B(t, e) {
            do {
                t = L(t)
            } while (t && !W(t, e));
            return t
        }

        function I(t, e, n) {
            for (var r = null; null === r && t;)(t = -1 === n ? A(t) : O(t)) && W(t, e) && (r = t);
            return r
        }

        function W(t, e) {
            return !(!(t = l(t)) || t == document) && (t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || function(t) {
                for (var e = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e[n] !== this;);
                return n > -1
            }).call(t, e)
        }

        function U(t) {
            return W(t, ":hover")
        }

        function F(t, e) {
            var n = l(t);
            if (e = l(e), !t || !e) return !1;
            for (; n = n.parentNode;)
                if (n == e) return !0;
            return !1
        }

        function Y() {
            var t = browser.msie6 ? l("PageContainer") : document.body,
                e = document.documentElement;
            return [t.scrollLeft || e.scrollLeft || window.pageXOffset || 0, t.scrollTop || e.scrollTop || window.pageYOffset || 0, e.clientWidth || t.clientWidth || 0, e.clientHeight || t.clientHeight || 0]
        }

        function $(t, e) {
            for (var n = (e = e || {}).fromEl || L(t), r = e.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
                var o = pt(n, "position");
                if (inArray(o, r) && (!e.noOverflow || "hidden" != pt(n, "overflow"))) break;
                n = L(n)
            }
            return n
        }

        function q(t, e) {
            for (var n, r, o, i, u = t = l(t); u && u.tagName && u !== bodyNode && (n = pt(u, "position"), r = pt(u, "overflow"), o = pt(u, "transform"), !e || !browser.mozilla || "page_wrap" == u.id || u === t || "visible" === r || ("static" === n ? i && "relative" !== i : "fixed" === i));) "none" !== o ? i = void 0 : "static" !== n && "fixed" !== i && (i = n), u = L(u);
            return u
        }

        function X(t) {
            var e = arguments.length;
            if (e > 1)
                for (var n = 0; n < e; n++) X(arguments[n]);
            else if ((t = l(t)) && t.style) {
                var r = t.olddisplay,
                    o = "block",
                    i = t.tagName.toLowerCase();
                t.style.display = r || "", "none" === pt(t, "display") && (o = ut(t, "inline") || ut(t, "_inline") ? "inline" : ut(t, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", t.style.display = t.olddisplay = o)
            }
        }

        function V(t) {
            var e = arguments.length;
            if (e > 1)
                for (var n = 0; n < e; n++) V(arguments[n]);
            else if ((t = l(t)) && t.style) {
                var r = pt(t, "display");
                t.olddisplay = "none" != r ? r : "", t.style.display = "none"
            }
        }

        function K(t) {
            return !(!(t = l(t)) || !t.style) && "none" != pt(t, "display")
        }

        function Q() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function Z(t, e, n) {
            t = l(t), n = n || 0;
            var r = et(t)[1],
                o = rt(t)[1],
                i = window,
                u = document.documentElement,
                c = Math.max(intval(i.innerHeight), intval(u.clientHeight)),
                a = l("page_header_cont"),
                s = u.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                d = vk.staticheader ? Math.max(0, rt(a)[1] - s) : rt(a)[1];
            if (e) {
                if (r + o < s + d + n) return r + o - s - d - n;
                if (r > s + c - n) return r - s - c + n
            } else {
                if (r < s + d + n) return r - s - d - n;
                if (r + o > s + c - n) return r + o - s - c + n
            }
            return 0
        }

        function G(t, e) {
            return void 0 === e && (e = !K(t)), e ? X(t) : V(t), e
        }

        function J(t) {
            return void 0 !== t.getBoundingClientRect
        }

        function tt(t, e) {
            var n;
            if (e && "inline" == pt(t, "display")) {
                var r = t.getClientRects();
                n = r && r[0] || t.getBoundingClientRect()
            } else n = t.getBoundingClientRect();
            return n
        }

        function et(t, e) {
            if (!(t = l(t))) return [0, 0];
            var n, r, o = {
                    top: 0,
                    left: 0
                },
                i = t.ownerDocument;
            return i ? (n = i.documentElement, J(t) && (o = tt(t, !0)), r = i == i.window ? i : 9 === i.nodeType && (i.defaultView || i.parentWindow), [o.left + (e ? 0 : r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), o.top + (e ? 0 : r.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
        }

        function nt(t) {
            return null != t && t === t.window
        }

        function rt(t, e, n) {
            t = l(t);
            var r, o = [0, 0],
                i = document.documentElement;
            if (e && "border-box" === pt(t, "boxSizing") && (e = !1), t == document) o = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
            else if (t) {
                var u = function() {
                    if (o = J(t) && (r = tt(t, n)) && void 0 !== r.width ? [r.width, r.height] : [t.offsetWidth, t.offsetHeight], e) {
                        each(o, function(e, n) {
                            each(e ? ["Top", "Bottom"] : ["Left", "Right"], function() {
                                o[e] -= parseFloat(pt(t, "padding" + this)) || 0, o[e] -= parseFloat(pt(t, "border" + this + "Width")) || 0
                            })
                        })
                    }
                };
                if (K(t)) u();
                else {
                    var c = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        a = {},
                        s = !1;
                    t.style.cssText.indexOf("!important") > -1 && (s = t.style.cssText), each(c, function(e, n) {
                        a[e] = t.style[e], t.style[e] = n
                    }), u(), each(c, function(e, n) {
                        t.style[e] = a[e]
                    }), s && (t.style.cssText = s)
                }
            }
            return o
        }

        function ot(t) {
            return rt(t)[0]
        }

        function it(t) {
            return rt(t)[1]
        }

        function ut(t, e) {
            return !!((t = l(t)) && 1 === t.nodeType && (" " + t.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + e + " ") >= 0)
        }

        function ct(t, e) {
            (t = l(t)) && !ut(t, e) && (t.className = (t.className ? t.className + " " : "") + e)
        }

        function at(t, e) {
            return setTimeout(ct.pbind(t, e), 0)
        }

        function lt(t, e) {
            (t = l(t)) && (t.className = trim((t.className || "").replace(new RegExp("(\\s|^)" + e + "(\\s|$)"), " ")))
        }

        function st(t, e) {
            return setTimeout(lt.pbind(t, e), 0)
        }

        function dt(t, e, n) {
            return void 0 === n && (n = !ut(t, e)), (n ? ct : lt)(t, e), n
        }

        function ft(t, e, n) {
            return void 0 === n && (n = !ut(t, e)), (n ? at : st)(t, e), n
        }

        function wt(t, e, n) {
            lt(t, e), ct(t, n)
        }

        function pt(t, e, n) {
            if (t = l(t), isArray(e)) {
                var r = {};
                return each(e, function(e, n) {
                    r[n] = pt(t, n)
                }), r
            }
            if (!t) return "";
            if (void 0 === n && (n = !0), !n && "opacity" == e && browser.msie) return (c = t.style.filter) ? c.indexOf("opacity=") >= 0 ? parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : "";
            if (!n && t.style && (t.style[e] || "height" == e)) return t.style[e];
            var o, i = document.defaultView || window;
            if (i.getComputedStyle) {
                e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
                var u = i.getComputedStyle(t, null);
                u && (o = u.getPropertyValue(e))
            } else if (t.currentStyle) {
                var c;
                if ("opacity" == e && browser.msie) return (c = t.currentStyle.filter) && c.indexOf("opacity=") >= 0 ? parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1";
                var a = e.replace(/\-(\w)/g, function(t, e) {
                    return e.toUpperCase()
                });
                "auto" == (o = t.currentStyle[e] || t.currentStyle[a]) && (o = 0), o = (o + "").split(" "), each(o, function(e, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = t.style,
                            i = r.left,
                            u = t.runtimeStyle.left;
                        t.runtimeStyle.left = t.currentStyle.left, r.left = n || 0, o[e] = r.pixelLeft + "px", r.left = i, t.runtimeStyle.left = u
                    }
                }), o = o.join(" ")
            }
            if (n && ("width" == e || "height" == e)) {
                var s = rt(t, !0)[{
                    width: 0,
                    height: 1
                }[e]];
                o = (intval(o) ? Math.max(floatval(o), s) : s) + "px"
            }
            return o
        }

        function ht(t, e, n) {
            if (t = l(t)) {
                if ("object" == (void 0 === e ? "undefined" : a(e))) return each(e, function(e, n) {
                    ht(t, e, n)
                });
                if ("opacity" == e) browser.msie && ((n + "").length ? t.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : t.style.cssText = t.style.cssText.replace(/filter\s*:[^;]*/gi, ""), t.style.zoom = 1), t.style.opacity !== n && (t.style.opacity = n);
                else try {
                    var r = "number" == typeof n;
                    r && /height|width/i.test(e) && (n = Math.abs(n)), n = r && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(e) ? n + "px" : n, t.style[e] !== n && (t.style[e] = n)
                } catch (t) {
                    debugLog("setStyle error: ", [e, n], t)
                }
            }
        }

        function mt(t, e, n) {
            setTimeout(ht.pbind(t, e, n), 0)
        }

        function vt(t, e, n) {
            var r = yt(t, "pseudo-id");
            r || (yt(t, "pseudo-id", r = irand(1e8, 999999999)), ct(t, "_pseudo_" + r));
            var o = e + "-style-" + r,
                i = l(o),
                u = "._pseudo_" + r + ":" + e + "{";
            i || (i = headNode.appendChild(b("style", {
                id: o,
                type: "text/css"
            }))), each(n, function(t, e) {
                u += t + ": " + e + " !important;"
            }), u += "}", i.sheet ? (i.sheet.cssRules.length && i.sheet.deleteRule(0), i.sheet.insertRule(u, 0)) : i.styleSheet && (i.styleSheet.cssText = u)
        }

        function yt(t, e, n) {
            if (!t) return !1;
            var r = t[vkExpand];
            return r || (r = t[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = t)), vkCache[r][e] = n), e ? vkCache[r] && vkCache[r][e] : r
        }

        function gt(t, e, n) {
            return t = l(t), void 0 === n ? t.getAttribute(e) : (t.setAttribute(e, n), n)
        }

        function bt(t) {
            for (var e = 0, n = arguments.length; e < n; ++e) {
                var r = arguments[e];
                if (void 0 !== t[r]) try {
                    delete t[r]
                } catch (e) {
                    try {
                        t.removeAttribute(r)
                    } catch (t) {}
                }
            }
        }

        function Ct(t, e) {
            var n = !!t && t[vkExpand];
            if (n)
                if (e) {
                    if (vkCache[n]) {
                        delete vkCache[n][e], e = "";
                        var r = 0;
                        for (e in vkCache[n])
                            if ("__elem" !== e) {
                                r++;
                                break
                            }
                        r || Ct(t)
                    }
                } else removeEvent(t), bt(t, vkExpand), delete vkCache[n]
        }

        function _t() {
            for (var t = arguments, e = 0; e < t.length; ++e) {
                var n = l(t[e]);
                n && (Ct(n), bt(n, "btnevents"))
            }
        }

        function Tt(t, e, n) {
            if ((t = l(t)) && !t.titleSet) {
                if (e || (e = t), e.scrollWidth > e.clientWidth) t.setAttribute("title", n || t.innerText || t.textContent);
                else {
                    var r = d("b", t);
                    r && r.scrollWidth > r.clientWidth ? t.setAttribute("title", n || t.innerText || t.textContent) : t.removeAttribute("title")
                }
                t.titleSet = 1
            }
        }

        function St() {
            var t = l("zoom_test_1") || document.body.appendChild(b("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (l("zoom_test_2") || document.body.appendChild(b("div", {
                id: "zoom_test_2"
            }, {
                left: t.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / t.offsetLeft
        }

        function xt(t, e, n) {
            if (t = l(t)) return void 0 !== e && (t.setValue ? (t.setValue(e), !n && t.phonblur && t.phonblur()) : "INPUT" == t.tagName || "TEXTAREA" == t.tagName ? t.value = e : void 0 !== t.emojiId && window.Emoji ? Emoji.val(t, e) : t.innerHTML = e, !n && triggerEvent(t, "valueChanged")), t.getValue ? t.getValue() : ("INPUT" == t.tagName || "TEXTAREA" == t.tagName ? t.value : t.innerHTML) || ""
        }

        function kt(t, e, n) {
            t = l(t);
            try {
                if (t.focus(), void 0 !== e && !1 !== e || (e = t.value.length), void 0 !== n && !1 !== n || (n = e), t.createTextRange) {
                    var r = t.createTextRange();
                    r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", e), r.select()
                } else t.setSelectionRange && t.setSelectionRange(e, n)
            } catch (t) {}
        }

        function jt(t, e, n) {
            for (t = l(t), n = n || 999; t && !e(t);) {
                if (0 == --n) return !1;
                try {
                    if ((t = L(t)) == document) break
                } catch (e) {
                    t = !1
                }
            }
            return t
        }
        window.cf = (r = document, o = r.createDocumentFragment(), i = r.createElement("div"), u = r.createRange && r.createRange(), o.appendChild(i), u && u.selectNodeContents(i), u && u.createContextualFragment ? function(t) {
            return t ? u.createContextualFragment(t) : r.createDocumentFragment()
        } : function(t) {
            if (!t) return r.createDocumentFragment();
            i.innerHTML = t;
            for (var e = r.createDocumentFragment(); i.firstChild;) e.appendChild(i.firstChild);
            return e
        }), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
            var t = document.createElement("div");
            if (null == t.style.transform) {
                var e = ["Webkit", "Moz", "ms"];
                for (var n in e)
                    if (void 0 !== t.style[e[n] + "Transform"]) return e[n] + "Transform"
            }
            return "transform"
        }(), window.vkExpand = window.vkExpand || "VK" + Object(c.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var Ot = !1;

        function At(t) {
            if (!Ot) return window.document.title = replaceEntities(t)
        }

        function Et(t) {
            Ot = t, t && window.cur && window.cur.destroy.push(function() {
                Et(!1)
            })
        }
        window.ge = l, window.geByTag = s, window.geByTag1 = d, window.geByClass = f, window.geByClass1 = w, window.gpeByClass = p, window.domQuery = h, window.domQuery1 = m, window.domClosest = v, window.ce = b, window.re = C, window.se = _, window.sech = T, window.rs = S, window.psr = x, window.domReplaceEl = k, window.domEL = j, window.domNS = O, window.domPS = A, window.domFC = E, window.domLC = N, window.domPN = L, window.domChildren = M, window.domInsertBefore = D, window.domInsertAfter = H, window.domByClass = R, window.domData = P, window.domChildIndex = z, window.domCA = B, window.domClosestSibling = I, window.matchesSelector = W, window.isHover = U, window.isAncestor = F, window.getScroll = Y, window.domClosestPositioned = $, window.domClosestOverflowHidden = q, window.show = X, window.hide = V, window.isVisible = K, window.clientHeight = Q, window.getClientRectOffsetY = Z, window.toggle = G, window.boundingRectEnabled = J, window.getXYRect = tt, window.getXY = et, window.isWindow = nt, window.getSize = rt, window.hasClass = ut, window.addClass = ct, window.addClassDelayed = at, window.removeClass = lt, window.removeClassDelayed = st, window.toggleClass = dt, window.toggleClassDelayed = ft, window.replaceClass = wt, window.getStyle = pt, window.setStyle = ht, window.setStyleDelayed = mt, window.setPseudoStyle = vt, window.data = yt, window.attr = gt, window.removeAttr = bt, window.removeData = Ct, window.cleanElems = _t, window.setTitle = Tt, window.getZoom = St, window.val = xt, window.elfocus = kt, window.traverseParent = jt, window.getH = it, window.getW = ot, window.domClosestByTag = y, window.setDocumentTitle = At, window.lockDocumentTitle = Et
    },
    312: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "vkLocal", function() {
            return i
        }), n.d(e, "lTimeout", function() {
            return u
        }), n.d(e, "rand", function() {
            return c
        }), n.d(e, "irand", function() {
            return a
        }), n.d(e, "isUndefined", function() {
            return l
        }), n.d(e, "isFunction", function() {
            return s
        }), n.d(e, "isArray", function() {
            return d
        }), n.d(e, "isString", function() {
            return f
        }), n.d(e, "isObject", function() {
            return w
        }), n.d(e, "isEmpty", function() {
            return p
        }), n.d(e, "vkNow", function() {
            return h
        }), n.d(e, "vkImage", function() {
            return m
        }), n.d(e, "trim", function() {
            return v
        }), n.d(e, "stripHTML", function() {
            return y
        }), n.d(e, "escapeRE", function() {
            return g
        }), n.d(e, "intval", function() {
            return b
        }), n.d(e, "floatval", function() {
            return C
        }), n.d(e, "positive", function() {
            return _
        }), n.d(e, "isNumeric", function() {
            return T
        }), n.d(e, "winToUtf", function() {
            return S
        }), n.d(e, "replaceEntities", function() {
            return x
        }), n.d(e, "clean", function() {
            return k
        }), n.d(e, "unclean", function() {
            return j
        }), n.d(e, "each", function() {
            return O
        }), n.d(e, "indexOf", function() {
            return A
        }), n.d(e, "inArray", function() {
            return E
        }), n.d(e, "clone", function() {
            return N
        }), n.d(e, "arrayKeyDiff", function() {
            return L
        }), n.d(e, "extend", function() {
            return M
        }), n.d(e, "addTemplates", function() {
            return D
        }), n.d(e, "getTemplate", function() {
            return H
        }), n.d(e, "serializeForm", function() {
            return R
        }), n.d(e, "extractUrls", function() {
            return B
        }), n.d(e, "isRetina", function() {
            return I
        }), n.d(e, "getCaretCharacterOffsetWithin", function() {
            return W
        }), n.d(e, "formatCount", function() {
            return U
        }), n.d(e, "encodeHtml", function() {
            return $
        }), n.d(e, "decodeHtml", function() {
            return q
        });
        var r = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var u, c = t[Symbol.iterator](); !(r = (u = c.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                        } catch (t) {
                            o = !0, i = t
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };

        function i(t) {
            var e = PageID;
            return function() {
                e == PageID && t.apply(this, arguments)
            }
        }

        function u(t, e) {
            return setTimeout(i(t), e)
        }

        function c(t, e) {
            return Math.random() * (e - t + 1) + t
        }

        function a(t, e) {
            return Math.floor(c(t, e))
        }

        function l(t) {
            return void 0 === t
        }

        function s(t) {
            return t && "[object Function]" === Object.prototype.toString.call(t)
        }

        function d(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function f(t) {
            return "string" == typeof t
        }

        function w(t) {
            return "[object Object]" === Object.prototype.toString.call(t)
        }

        function p(t) {
            if ("[object Object]" !== Object.prototype.toString.call(t)) return !1;
            for (var e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        }

        function h() {
            return +new Date
        }

        function m() {
            return window.Image ? new Image : ce("img")
        }

        function v(t) {
            return (t || "").replace(/^\s+|\s+$/g, "")
        }

        function y(t) {
            return t ? t.replace(/<(?:.|\s)*?>/g, "") : ""
        }

        function g(t) {
            return t ? t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        }

        function b(t) {
            return !0 === t ? 1 : parseInt(t) || 0
        }

        function C(t) {
            return !0 === t ? 1 : parseFloat(t) || 0
        }

        function _(t) {
            return (t = b(t)) < 0 ? 0 : t
        }

        function T(t) {
            return !isNaN(t)
        }

        function S(t) {
            return t.replace(/&#(\d\d+);/g, function(t, e) {
                return (e = b(e)) >= 32 ? String.fromCharCode(e) : t
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function x(t) {
            return se("<textarea>" + (t || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
        }

        function k(t) {
            return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function j(t) {
            return x(t.replace(/\t/g, "\n"))
        }

        function O(t, e) {
            if (w(t) || void 0 === t.length) {
                for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n) && !1 === e.call(t[n], n, t[n])) break
            } else
                for (var r = 0, o = t.length; r < o; r++) {
                    var i = t[r];
                    if (!1 === e.call(i, r, i)) break
                }
            return t
        }

        function A(t, e, n) {
            for (var r = n || 0, o = (t || []).length; r < o; r++)
                if (t[r] == e) return r;
            return -1
        }

        function E(t, e) {
            return -1 != A(e, t)
        }

        function N(t, e) {
            var n = w(t) || void 0 === t.length ? {} : [];
            for (var r in t)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (e && "object" === o(t[r]) && "prototype" !== r && null !== t[r] ? n[r] = N(t[r]) : n[r] = t[r]);
            return n
        }

        function L(t) {
            var e, n, r = {},
                o = 1,
                i = arguments.length,
                u = arguments;
            for (e in t) {
                for (n = !1, o = 1; o < i; o++) u[o][e] && u[o][e] == t[e] && (n = !0);
                n || (r[e] = t[e])
            }
            return r
        }

        function M() {
            var t, e = arguments,
                n = e[0] || {},
                r = 1,
                i = e.length,
                u = !1;
            for ("boolean" == typeof n && (u = n, n = e[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : o(n)) || s(n) || (n = {}); r < i; ++r)
                if (null != (t = e[r]))
                    for (var c in t) {
                        var a = n[c],
                            l = t[c];
                        n !== l && (u && l && "object" === (void 0 === l ? "undefined" : o(l)) && !l.nodeType ? n[c] = M(u, a || (null != l.length ? [] : {}), l) : void 0 !== l && (n[c] = l))
                    }
            return n
        }

        function D(t) {
            window.templates = window.templates || {}, M(window.templates, t)
        }

        function H(t, e) {
            var n = (window.templates = window.templates || {})[t];
            return "function" == typeof n && (n = n()), n && e ? rs(n, e) : n || ""
        }

        function R(t) {
            if ("object" != (void 0 === t ? "undefined" : o(t))) return !1;
            var e = {},
                n = function(e) {
                    return geByTag(e, t)
                },
                r = function(n, r) {
                    if (r.name)
                        if ("text" != r.type && r.type)
                            if (r.getAttribute("bool")) {
                                var o = val(r);
                                if (!o || "0" === o) return;
                                e[r.name] = 1
                            } else e[r.name] = browser.msie && !r.value && t[r.name] ? t[r.name].value : r.value;
                    else e[r.name] = val(r)
                };
            return O(n("input"), function(t, e) {
                if ("radio" != e.type && "checkbox" != e.type || e.checked) return r(0, e)
            }), O(n("select"), r), O(n("textarea"), r), e
        }
        window.PageID = window.PageID || 1;
        var P = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            z = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;

        function B(t, e) {
            for (var n, r = e ? z : P, o = []; t && (n = t.match(r));) {
                t = t.substr(n.index + n[0].length);
                var i = 0;
                n[4] || (i = 7), o.push({
                    url: n[2 + i],
                    query: n[5 + i] || "",
                    domain: n[4 + i]
                })
            }
            return o
        }

        function I() {
            return window.devicePixelRatio >= 2
        }

        function W(t) {
            var e = 0,
                n = 0,
                r = t.ownerDocument || t.document,
                o = r.defaultView || r.parentWindow;
            if (o.getSelection().rangeCount > 0) {
                var i = o.getSelection().getRangeAt(0),
                    u = i.cloneRange();
                u.selectNodeContents(t), u.setEnd(i.startContainer, i.startOffset), e = u.toString().length, u.setEnd(i.endContainer, i.endOffset), n = u.toString().length
            }
            return [e, n]
        }

        function U(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = e.kLimit || 1e3;
            return t >= (e.mLimit || 1e6) && !e.noCheck ? U(t = (t = b(t / 1e5)) > 1e3 ? b(t / 10) : t / 10, M(e, {
                noCheck: !0
            }), !0) + "M" : t >= n && !e.noCheck ? U(t = (t = b(t / 100)) > 100 ? b(t / 10) : t / 10, M(e, {
                noCheck: !0
            }), !0) + "K" : langNumeric(t, "%s", !0).replace(/,/g, ".")
        }
        var F, Y = r((F = null, [function(t) {
                return F || (F = se("<span> </span>")), F.innerText = t, F.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }, function(t) {
                return F || (F = se("<span> </span>")), F.innerHTML = t, F.innerText
            }]), 2),
            $ = Y[0],
            q = Y[1];
        window.isRetina = I, window.extractUrls = B, window.serializeForm = R, window.addTemplates = D, window.getTemplate = H, window.rand = c, window.irand = a, window.isUndefined = l, window.isFunction = s, window.isArray = d, window.isString = f, window.isObject = w, window.isEmpty = p, window.vkNow = h, window.vkImage = m, window.trim = v, window.stripHTML = y, window.escapeRE = g, window.intval = b, window.floatval = C, window.positive = _, window.isNumeric = T, window.winToUtf = S, window.replaceEntities = x, window.clean = k, window.unclean = j, window.each = O, window.indexOf = A, window.inArray = E, window.clone = N, window.arrayKeyDiff = L, window.extend = M, window.vkLocal = i, window.lTimeout = u, window.getCaretCharacterOffsetWithin = W, window.formatCount = U, window.encodeHtml = $, window.decodeHtml = q
    },
    66: function(t, e) {
        var n, r, o = t.exports = {};

        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function u() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0)
            } catch (e) {
                try {
                    return n.call(null, t, 0)
                } catch (e) {
                    return n.call(this, t, 0)
                }
            }
        }! function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : i
            } catch (t) {
                n = i
            }
            try {
                r = "function" == typeof clearTimeout ? clearTimeout : u
            } catch (t) {
                r = u
            }
        }();
        var a, l = [],
            s = !1,
            d = -1;

        function f() {
            s && a && (s = !1, a.length ? l = a.concat(l) : d = -1, l.length && w())
        }

        function w() {
            if (!s) {
                var t = c(f);
                s = !0;
                for (var e = l.length; e;) {
                    for (a = l, l = []; ++d < e;) a && a[d].run();
                    d = -1, e = l.length
                }
                a = null, s = !1,
                    function(t) {
                        if (r === clearTimeout) return clearTimeout(t);
                        if ((r === u || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                        try {
                            r(t)
                        } catch (e) {
                            try {
                                return r.call(null, t)
                            } catch (e) {
                                return r.call(this, t)
                            }
                        }
                    }(t)
            }
        }

        function p(t, e) {
            this.fun = t, this.array = e
        }

        function h() {}
        o.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            l.push(new p(t, e)), 1 !== l.length || s || c(w)
        }, p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function(t) {
            return []
        }, o.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, o.cwd = function() {
            return "/"
        }, o.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, o.umask = function() {
            return 0
        }
    },
    70: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "watch", function() {
            return l
        }), n.d(e, "update", function() {
            return d
        }), n.d(e, "default", function() {
            return f
        });
        var r = n(19),
            o = n(97),
            i = n(24),
            u = window,
            c = u.curBox,
            a = u.scrollGetY;

        function l(t) {
            addEvent(t, "scroll", s.pbind(t))
        }

        function s(t) {
            var e = r.getObjects(),
                n = window.innerHeight,
                u = 0,
                l = !0;
            t === document || t === window ? u = a() : t ? (u = t.scrollTop, l = !1) : window.wkcur && window.wkcur.shown ? (u = window.wkLayerWrap.scrollTop, l = !1) : c() ? (u = window.boxLayerWrap.scrollTop, l = !1) : u = a(), !l && t && (n = t.offsetHeight);
            for (var s = function(t) {
                    var r = e[t],
                        c = r.elem,
                        a = r.y,
                        s = r.height;
                    if ("window" !== r.from && l) return "continue";
                    if (a > u - 1.5 * n && u + 1.5 * n > a - s) {
                        Object(i.removeClass)(c, "lazyload_need_load"), e.splice(t, 1), t--;
                        var f = Object(i.attr)(c, "data-lazyload-src");
                        Object(o.loadImage)(f).then(function(t) {
                            t < 10 && Object(i.addClass)(c, "lazyload_no_animation"), "IMG" === c.tagName ? Object(i.attr)(c, "src", f) : Object(i.setStyle)(c, "background-image", "url(" + f + ")"), Object(i.addClass)(c, "lazyload_loaded"), Object(i.re)(Object(i.geByClass1)("lazyload_preview", c))
                        })
                    }
                    d = t
                }, d = 0; d < e.length; d++) s(d)
        }

        function d(t) {
            s(t)
        }

        function f() {
            l(window), d()
        }
    },
    85: function(t, e, n) {
        (function(r, o) {
            var i;
            (function() {
                "use strict";

                function u(t) {
                    return "function" == typeof t
                }
                var c, a, l = Array.isArray ? Array.isArray : function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    },
                    s = 0,
                    d = function(t, e) {
                        T[s] = t, T[s + 1] = e, 2 === (s += 2) && (a ? a(S) : y())
                    };
                var f = "undefined" != typeof window ? window : void 0,
                    w = f || {},
                    p = w.MutationObserver || w.WebKitMutationObserver,
                    h = void 0 !== r && "[object process]" === {}.toString.call(r),
                    m = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                function v() {
                    return function() {
                        setTimeout(S, 1)
                    }
                }
                var y, g, b, C, _, T = new Array(1e3);

                function S() {
                    for (var t = 0; t < s; t += 2) {
                        (0, T[t])(T[t + 1]), T[t] = void 0, T[t + 1] = void 0
                    }
                    s = 0
                }
                h ? y = function() {
                    r.nextTick(S)
                } : p ? (b = 0, C = new p(S), _ = document.createTextNode(""), C.observe(_, {
                    characterData: !0
                }), y = function() {
                    _.data = b = ++b % 2
                }) : m ? ((g = new MessageChannel).port1.onmessage = S, y = function() {
                    g.port2.postMessage(0)
                }) : y = void 0 === f ? function() {
                    try {
                        var t = n(218);
                        return c = t.runOnLoop || t.runOnContext,
                            function() {
                                c(S)
                            }
                    } catch (t) {
                        return v()
                    }
                }() : v();
                var x = function(t, e) {
                    var n = this._state;
                    if (n === A && !t || n === E && !e) return this;
                    var r = new this.constructor(j),
                        o = this._result;
                    if (n) {
                        var i = arguments[n - 1];
                        d(function() {
                            U(n, r, i, o)
                        })
                    } else z(this, r, t, e);
                    return r
                };
                var k = function(t) {
                    if (t && "object" == typeof t && t.constructor === this) return t;
                    var e = new this(j);
                    return D(e, t), e
                };

                function j() {}
                var O = void 0,
                    A = 1,
                    E = 2,
                    N = new I;

                function L(t) {
                    try {
                        return t.then
                    } catch (t) {
                        return N.error = t, N
                    }
                }

                function M(t, e, n) {
                    e.constructor === t.constructor && n === x && constructor.resolve === k ? function(t, e) {
                        e._state === A ? R(t, e._result) : e._state === E ? P(t, e._result) : z(e, void 0, function(e) {
                            D(t, e)
                        }, function(e) {
                            P(t, e)
                        })
                    }(t, e) : n === N ? P(t, N.error) : void 0 === n ? R(t, e) : u(n) ? function(t, e, n) {
                        d(function(t) {
                            var r = !1,
                                o = function(t, e, n, r) {
                                    try {
                                        t.call(e, n, r)
                                    } catch (t) {
                                        return t
                                    }
                                }(n, e, function(n) {
                                    r || (r = !0, e !== n ? D(t, n) : R(t, n))
                                }, function(e) {
                                    r || (r = !0, P(t, e))
                                }, t._label);
                            !r && o && (r = !0, P(t, o))
                        }, t)
                    }(t, e, n) : R(t, e)
                }

                function D(t, e) {
                    var n;
                    t === e ? P(t, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(n = e) || "object" == typeof n && null !== n ? M(t, e, L(e)) : R(t, e)
                }

                function H(t) {
                    t._onerror && t._onerror(t._result), B(t)
                }

                function R(t, e) {
                    t._state === O && (t._result = e, t._state = A, 0 !== t._subscribers.length && d(B, t))
                }

                function P(t, e) {
                    t._state === O && (t._state = E, t._result = e, d(H, t))
                }

                function z(t, e, n, r) {
                    var o = t._subscribers,
                        i = o.length;
                    t._onerror = null, o[i] = e, o[i + A] = n, o[i + E] = r, 0 === i && t._state && d(B, t)
                }

                function B(t) {
                    var e = t._subscribers,
                        n = t._state;
                    if (0 !== e.length) {
                        for (var r, o, i = t._result, u = 0; u < e.length; u += 3) r = e[u], o = e[u + n], r ? U(n, r, o, i) : o(i);
                        t._subscribers.length = 0
                    }
                }

                function I() {
                    this.error = null
                }
                var W = new I;

                function U(t, e, n, r) {
                    var o, i, c, a, l = u(n);
                    if (l) {
                        if ((o = function(t, e) {
                                try {
                                    return t(e)
                                } catch (t) {
                                    return W.error = t, W
                                }
                            }(n, r)) === W ? (a = !0, i = o.error, o = null) : c = !0, e === o) return void P(e, new TypeError("A promises callback cannot return that same promise."))
                    } else o = r, c = !0;
                    e._state !== O || (l && c ? D(e, o) : a ? P(e, i) : t === A ? R(e, o) : t === E && P(e, o))
                }
                var F = function(t) {
                    return new K(this, t).promise
                };
                var Y = function(t) {
                    var e = new this(j);
                    if (!l(t)) return P(e, new TypeError("You must pass an array to race.")), e;
                    var n = t.length;

                    function r(t) {
                        D(e, t)
                    }

                    function o(t) {
                        P(e, t)
                    }
                    for (var i = 0; e._state === O && i < n; i++) z(this.resolve(t[i]), void 0, r, o);
                    return e
                };
                var $ = function(t) {
                        var e = new this(j);
                        return P(e, t), e
                    },
                    q = 0;
                var X = V;

                function V(t) {
                    this._id = q++, this._state = void 0, this._result = void 0, this._subscribers = [], j !== t && ("function" != typeof t && function() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }(), this instanceof V ? function(t, e) {
                        try {
                            e(function(e) {
                                D(t, e)
                            }, function(e) {
                                P(t, e)
                            })
                        } catch (e) {
                            P(t, e)
                        }
                    }(this, t) : function() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }())
                }
                V.all = F, V.race = Y, V.resolve = k, V.reject = $, V._setScheduler = function(t) {
                    a = t
                }, V._setAsap = function(t) {
                    d = t
                }, V._asap = d, V.prototype = {
                    constructor: V,
                    then: x,
                    catch: function(t) {
                        return this.then(null, t)
                    }
                };
                var K = Q;

                function Q(t, e) {
                    this._instanceConstructor = t, this.promise = new t(j), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && R(this.promise, this._result))) : P(this.promise, this._validationError())
                }
                Q.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, Q.prototype._enumerate = function() {
                    for (var t = this.length, e = this._input, n = 0; this._state === O && n < t; n++) this._eachEntry(e[n], n)
                }, Q.prototype._eachEntry = function(t, e) {
                    var n = this._instanceConstructor,
                        r = n.resolve;
                    if (r === k) {
                        var o = L(t);
                        if (o === x && t._state !== O) this._settledAt(t._state, e, t._result);
                        else if ("function" != typeof o) this._remaining--, this._result[e] = t;
                        else if (n === X) {
                            var i = new n(j);
                            M(i, t, o), this._willSettleAt(i, e)
                        } else this._willSettleAt(new n(function(e) {
                            e(t)
                        }), e)
                    } else this._willSettleAt(r(t), e)
                }, Q.prototype._settledAt = function(t, e, n) {
                    var r = this.promise;
                    r._state === O && (this._remaining--, t === E ? P(r, n) : this._result[e] = n), 0 === this._remaining && R(r, this._result)
                }, Q.prototype._willSettleAt = function(t, e) {
                    var n = this;
                    z(t, void 0, function(t) {
                        n._settledAt(A, e, t)
                    }, function(t) {
                        n._settledAt(E, e, t)
                    })
                };
                var Z = function() {
                        var t;
                        if (void 0 !== o) t = o;
                        else if ("undefined" != typeof self) t = self;
                        else try {
                            t = Function("return this")()
                        } catch (t) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                        var e = t.Promise;
                        e && "[object Promise]" === Object.prototype.toString.call(e.resolve()) && !e.cast || (t.Promise = X)
                    },
                    G = {
                        Promise: X,
                        polyfill: Z
                    };
                void 0 === (i = function() {
                    return G
                }.call(e, n, e, t)) || (t.exports = i), Z()
            }).call(this)
        }).call(this, n(66), n(194))
    },
    97: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "loadImage", function() {
            return u
        });
        var r = n(85),
            o = n(312),
            i = r.Promise;

        function u(t) {
            var e = Object(o.vkNow)();
            return new i(function(n, r) {
                var i = Object(o.vkImage)();
                i.onload = function() {
                    return n(Object(o.vkNow)() - e)
                }, i.error = r, i.src = t
            })
        }
    }
});