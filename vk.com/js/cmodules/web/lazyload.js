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
    }, n.p = "", n(n.s = 63)
}({
    11: function(t, e, n) {
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
            return g
        }), n.d(e, "domClosest", function() {
            return m
        }), n.d(e, "domClosestByTag", function() {
            return v
        }), n.d(e, "gpeByTag", function() {
            return y
        }), n.d(e, "ce", function() {
            return b
        }), n.d(e, "re", function() {
            return _
        }), n.d(e, "se", function() {
            return C
        }), n.d(e, "sech", function() {
            return S
        }), n.d(e, "rs", function() {
            return T
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
            return D
        }), n.d(e, "domChildren", function() {
            return H
        }), n.d(e, "domInsertBefore", function() {
            return L
        }), n.d(e, "domInsertAfter", function() {
            return M
        }), n.d(e, "domByClass", function() {
            return R
        }), n.d(e, "domData", function() {
            return z
        }), n.d(e, "domChildIndex", function() {
            return P
        }), n.d(e, "domCA", function() {
            return B
        }), n.d(e, "domClosestSibling", function() {
            return Y
        }), n.d(e, "matchesSelector", function() {
            return I
        }), n.d(e, "isHover", function() {
            return F
        }), n.d(e, "isAncestor", function() {
            return W
        }), n.d(e, "getScroll", function() {
            return U
        }), n.d(e, "domClosestPositioned", function() {
            return $
        }), n.d(e, "domClosestOverflowHidden", function() {
            return q
        }), n.d(e, "show", function() {
            return K
        }), n.d(e, "hide", function() {
            return V
        }), n.d(e, "isVisible", function() {
            return X
        }), n.d(e, "clientHeight", function() {
            return Z
        }), n.d(e, "getClientRectOffsetY", function() {
            return G
        }), n.d(e, "toggle", function() {
            return Q
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
            return at
        }), n.d(e, "addClassDelayed", function() {
            return ct
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
            return gt
        }), n.d(e, "setPseudoStyle", function() {
            return mt
        }), n.d(e, "data", function() {
            return vt
        }), n.d(e, "attr", function() {
            return yt
        }), n.d(e, "removeAttr", function() {
            return bt
        }), n.d(e, "removeData", function() {
            return _t
        }), n.d(e, "cleanElems", function() {
            return Ct
        }), n.d(e, "setTitle", function() {
            return St
        }), n.d(e, "getZoom", function() {
            return Tt
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
        var r, o, i, u, a = n(121),
            c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
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
            var a = s(n, e),
                c = new RegExp("(^|\\s)" + t + "(\\s|$)");
            for (i = 0, u = a.length; i < u; ++i) c.test(a[i].className) && r.push(a[i]);
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

        function g(t, e) {
            return (e || document).querySelector(t)
        }

        function m(t, e) {
            return ut(e, t) ? e : p(t, e)
        }

        function v(t, e) {
            return t = t.toUpperCase(), e.nodeType == Node.ELEMENT_NODE && e.tagName.toUpperCase() == t ? e : y(t, e)
        }

        function y(t, e) {
            if (!(e = l(e))) return null;
            for (t = t.toUpperCase(); e = e.parentNode;)
                if (e.tagName && e.tagName.toUpperCase() == t) return e;
            return null
        }

        function b(t, e, n) {
            var r = document.createElement(t);
            return e && extend(r, e), n && ht(r, n), r
        }

        function _(t) {
            return (t = l(t)) && t.parentNode && t.parentNode.removeChild(t), t
        }

        function C(t) {
            return E(b("div", {
                innerHTML: t
            }))
        }

        function S(t) {
            return H(b("div", {
                innerHTML: t
            }))
        }

        function T(t, e) {
            return each(e, function(e, n) {
                t = t.replace(new RegExp("%" + e + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), t
        }

        function x(t) {
            return "https:" != locProtocol ? t : t = (t = (t = (t = (t = t.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function k(t, e) {
            return isString(e) && (e = C(e)), D(t).replaceChild(e, t), e
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

        function D(t) {
            return (t || {}).parentNode
        }

        function H(t) {
            for (var e = [], n = t.childNodes, r = 0; r < n.length; r++) n[r].tagName && e.push(n[r]);
            return e
        }

        function L(t, e) {
            var n = D(e);
            return n && n.insertBefore(t, e)
        }

        function M(t, e) {
            var n = D(e);
            return n && n.insertBefore(t, O(e))
        }

        function R(t, e) {
            return t ? w(e, t) : t
        }

        function z(t, e, n) {
            return t ? void 0 !== n ? (null === n ? t.removeAttribute("data-" + e) : t.setAttribute("data-" + e, n), n) : t.getAttribute("data-" + e) : null
        }

        function P(t) {
            for (var e = 0; null != (t = A(t));) e++;
            return e
        }

        function B(t, e) {
            do {
                t = D(t)
            } while (t && !I(t, e));
            return t
        }

        function Y(t, e, n) {
            for (var r = null; null === r && t;)(t = -1 === n ? A(t) : O(t)) && I(t, e) && (r = t);
            return r
        }

        function I(t, e) {
            return !(!(t = l(t)) || t == document) && (t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || function(t) {
                for (var e = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e[n] !== this;);
                return n > -1
            }).call(t, e)
        }

        function F(t) {
            return I(t, ":hover")
        }

        function W(t, e) {
            var n = l(t);
            if (e = l(e), !t || !e) return !1;
            for (; n = n.parentNode;)
                if (n == e) return !0;
            return !1
        }

        function U() {
            var t = browser.msie6 ? l("PageContainer") : document.body,
                e = document.documentElement;
            return [t.scrollLeft || e.scrollLeft || window.pageXOffset || 0, t.scrollTop || e.scrollTop || window.pageYOffset || 0, e.clientWidth || t.clientWidth || 0, e.clientHeight || t.clientHeight || 0]
        }

        function $(t, e) {
            for (var n = (e = e || {}).fromEl || D(t), r = e.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
                var o = pt(n, "position");
                if (inArray(o, r) && (!e.noOverflow || "hidden" != pt(n, "overflow"))) break;
                n = D(n)
            }
            return n
        }

        function q(t, e) {
            for (var n, r, o, i, u = t = l(t); u && u.tagName && u !== bodyNode && (n = pt(u, "position"), r = pt(u, "overflow"), o = pt(u, "transform"), !e || !browser.mozilla || "page_wrap" == u.id || u === t || "visible" === r || ("static" === n ? i && "relative" !== i : "fixed" === i));) "none" !== o ? i = void 0 : "static" !== n && "fixed" !== i && (i = n), u = D(u);
            return u
        }

        function K(t) {
            var e = arguments.length;
            if (e > 1)
                for (var n = 0; n < e; n++) K(arguments[n]);
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

        function X(t) {
            return !(!(t = l(t)) || !t.style) && "none" != pt(t, "display")
        }

        function Z() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function G(t, e, n) {
            t = l(t), n = n || 0;
            var r = et(t)[1],
                o = rt(t)[1],
                i = window,
                u = document.documentElement,
                a = Math.max(intval(i.innerHeight), intval(u.clientHeight)),
                c = l("page_header_cont"),
                s = u.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                d = vk.staticheader ? Math.max(0, rt(c)[1] - s) : rt(c)[1];
            if (e) {
                if (r + o < s + d + n) return r + o - s - d - n;
                if (r > s + a - n) return r - s - a + n
            } else {
                if (r < s + d + n) return r - s - d - n;
                if (r + o > s + a - n) return r + o - s - a + n
            }
            return 0
        }

        function Q(t, e) {
            return void 0 === e && (e = !X(t)), e ? K(t) : V(t), e
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
                if (X(t)) u();
                else {
                    var a = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        c = {},
                        s = !1;
                    t.style.cssText.indexOf("!important") > -1 && (s = t.style.cssText), each(a, function(e, n) {
                        c[e] = t.style[e], t.style[e] = n
                    }), u(), each(a, function(e, n) {
                        t.style[e] = c[e]
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

        function at(t, e) {
            (t = l(t)) && !ut(t, e) && (t.className = (t.className ? t.className + " " : "") + e)
        }

        function ct(t, e) {
            return setTimeout(at.pbind(t, e), 0)
        }

        function lt(t, e) {
            (t = l(t)) && (t.className = trim((t.className || "").replace(new RegExp("(\\s|^)" + e + "(\\s|$)"), " ")))
        }

        function st(t, e) {
            return setTimeout(lt.pbind(t, e), 0)
        }

        function dt(t, e, n) {
            return void 0 === n && (n = !ut(t, e)), (n ? at : lt)(t, e), n
        }

        function ft(t, e, n) {
            return void 0 === n && (n = !ut(t, e)), (n ? ct : st)(t, e), n
        }

        function wt(t, e, n) {
            lt(t, e), at(t, n)
        }

        function pt(t, e, n) {
            if (t = l(t), isArray(e)) {
                var r = {};
                return each(e, function(e, n) {
                    r[n] = pt(t, n)
                }), r
            }
            if (!t) return "";
            if (void 0 === n && (n = !0), !n && "opacity" == e && browser.msie) return (a = t.style.filter) ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : "";
            if (!n && t.style && (t.style[e] || "height" == e)) return t.style[e];
            var o, i = document.defaultView || window;
            if (i.getComputedStyle) {
                e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
                var u = i.getComputedStyle(t, null);
                u && (o = u.getPropertyValue(e))
            } else if (t.currentStyle) {
                var a;
                if ("opacity" == e && browser.msie) return (a = t.currentStyle.filter) && a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1";
                var c = e.replace(/\-(\w)/g, function(t, e) {
                    return e.toUpperCase()
                });
                "auto" == (o = t.currentStyle[e] || t.currentStyle[c]) && (o = 0), o = (o + "").split(" "), each(o, function(e, n) {
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
                if ("object" == (void 0 === e ? "undefined" : c(e))) return each(e, function(e, n) {
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

        function gt(t, e, n) {
            setTimeout(ht.pbind(t, e, n), 0)
        }

        function mt(t, e, n) {
            var r = vt(t, "pseudo-id");
            r || (vt(t, "pseudo-id", r = irand(1e8, 999999999)), at(t, "_pseudo_" + r));
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

        function vt(t, e, n) {
            if (!t) return !1;
            var r = t[vkExpand];
            return r || (r = t[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = t)), vkCache[r][e] = n), e ? vkCache[r] && vkCache[r][e] : r
        }

        function yt(t, e, n) {
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

        function _t(t, e) {
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
                        r || _t(t)
                    }
                } else removeEvent(t), bt(t, vkExpand), delete vkCache[n]
        }

        function Ct() {
            for (var t = arguments, e = 0; e < t.length; ++e) {
                var n = l(t[e]);
                n && (_t(n), bt(n, "btnevents"))
            }
        }

        function St(t, e, n) {
            if ((t = l(t)) && !t.titleSet) {
                if (e || (e = t), e.scrollWidth > e.clientWidth) t.setAttribute("title", n || t.innerText || t.textContent);
                else {
                    var r = d("b", t);
                    r && r.scrollWidth > r.clientWidth ? t.setAttribute("title", n || t.innerText || t.textContent) : t.removeAttribute("title")
                }
                t.titleSet = 1
            }
        }

        function Tt() {
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
                    if ((t = D(t)) == document) break
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
        }(), window.vkExpand = window.vkExpand || "VK" + Object(a.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var Ot = !1;

        function At(t) {
            if (!Ot) return window.document.title = replaceEntities(t)
        }

        function Et(t) {
            Ot = t, t && window.cur && window.cur.destroy.push(function() {
                Et(!1)
            })
        }
        window.ge = l, window.geByTag = s, window.geByTag1 = d, window.geByClass = f, window.geByClass1 = w, window.gpeByClass = p, window.domQuery = h, window.domQuery1 = g, window.domClosest = m, window.ce = b, window.re = _, window.se = C, window.sech = S, window.rs = T, window.psr = x, window.domReplaceEl = k, window.domEL = j, window.domNS = O, window.domPS = A, window.domFC = E, window.domLC = N, window.domPN = D, window.domChildren = H, window.domInsertBefore = L, window.domInsertAfter = M, window.domByClass = R, window.domData = z, window.domChildIndex = P, window.domCA = B, window.domClosestSibling = Y, window.matchesSelector = I, window.isHover = F, window.isAncestor = W, window.getScroll = U, window.domClosestPositioned = $, window.domClosestOverflowHidden = q, window.show = K, window.hide = V, window.isVisible = X, window.clientHeight = Z, window.getClientRectOffsetY = G, window.toggle = Q, window.boundingRectEnabled = J, window.getXYRect = tt, window.getXY = et, window.isWindow = nt, window.getSize = rt, window.hasClass = ut, window.addClass = at, window.addClassDelayed = ct, window.removeClass = lt, window.removeClassDelayed = st, window.toggleClass = dt, window.toggleClassDelayed = ft, window.replaceClass = wt, window.getStyle = pt, window.setStyle = ht, window.setStyleDelayed = gt, window.setPseudoStyle = mt, window.data = vt, window.attr = yt, window.removeAttr = bt, window.removeData = _t, window.cleanElems = Ct, window.setTitle = St, window.getZoom = Tt, window.val = xt, window.elfocus = kt, window.traverseParent = jt, window.getH = it, window.getW = ot, window.domClosestByTag = v, window.setDocumentTitle = At, window.lockDocumentTitle = Et
    },
    121: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "vkLocal", function() {
            return a
        }), n.d(e, "lTimeout", function() {
            return c
        }), n.d(e, "rand", function() {
            return l
        }), n.d(e, "irand", function() {
            return s
        }), n.d(e, "isUndefined", function() {
            return d
        }), n.d(e, "isFunction", function() {
            return f
        }), n.d(e, "isArray", function() {
            return w
        }), n.d(e, "isString", function() {
            return p
        }), n.d(e, "isObject", function() {
            return h
        }), n.d(e, "isEmpty", function() {
            return g
        }), n.d(e, "vkNow", function() {
            return m
        }), n.d(e, "vkImage", function() {
            return v
        }), n.d(e, "trim", function() {
            return y
        }), n.d(e, "stripHTML", function() {
            return b
        }), n.d(e, "escapeRE", function() {
            return _
        }), n.d(e, "intval", function() {
            return C
        }), n.d(e, "floatval", function() {
            return S
        }), n.d(e, "positive", function() {
            return T
        }), n.d(e, "isNumeric", function() {
            return x
        }), n.d(e, "winToUtf", function() {
            return k
        }), n.d(e, "replaceEntities", function() {
            return j
        }), n.d(e, "clean", function() {
            return O
        }), n.d(e, "unclean", function() {
            return A
        }), n.d(e, "each", function() {
            return E
        }), n.d(e, "indexOf", function() {
            return N
        }), n.d(e, "inArray", function() {
            return D
        }), n.d(e, "clone", function() {
            return H
        }), n.d(e, "arrayKeyDiff", function() {
            return L
        }), n.d(e, "extend", function() {
            return M
        }), n.d(e, "addTemplates", function() {
            return R
        }), n.d(e, "getTemplate", function() {
            return z
        }), n.d(e, "serializeForm", function() {
            return P
        }), n.d(e, "extractUrls", function() {
            return B
        }), n.d(e, "isRetina", function() {
            return Y
        }), n.d(e, "getCaretCharacterOffsetWithin", function() {
            return I
        }), n.d(e, "formatCount", function() {
            return F
        }), n.d(e, "encodeHtml", function() {
            return $
        }), n.d(e, "decodeHtml", function() {
            return q
        });
        var r = n(11),
            o = n(258),
            i = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                        } catch (t) {
                            o = !0, i = t
                        } finally {
                            try {
                                !r && a.return && a.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };

        function a(t) {
            var e = PageID;
            return function() {
                e === PageID && t.apply(this, arguments)
            }
        }

        function c(t, e) {
            return setTimeout(a(t), e)
        }
        window.PageID = window.PageID || 1;
        var l = function(t, e) {
                return Math.random() * (e - t + 1) + t
            },
            s = function(t, e) {
                return Math.floor(l(t, e))
            },
            d = function(t) {
                return void 0 === t
            },
            f = function(t) {
                return t && "[object Function]" === Object.prototype.toString.call(t)
            },
            w = function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            p = function(t) {
                return "string" == typeof t
            },
            h = function(t) {
                return "[object Object]" === Object.prototype.toString.call(t)
            };

        function g(t) {
            if ("[object Object]" !== Object.prototype.toString.call(t)) return !1;
            for (var e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        }
        var m = function() {
                return +new Date
            },
            v = function() {
                return window.Image ? new Image : ce("img")
            },
            y = function(t) {
                return (t || "").replace(/^\s+|\s+$/g, "")
            },
            b = function(t) {
                return t ? t.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            _ = function(t) {
                return t ? t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function C(t) {
            return !0 === t ? 1 : parseInt(t) || 0
        }

        function S(t) {
            return !0 === t ? 1 : parseFloat(t) || 0
        }

        function T(t) {
            return (t = C(t)) < 0 ? 0 : t
        }

        function x(t) {
            return !isNaN(t)
        }

        function k(t) {
            return t.replace(/&#(\d\d+);/g, function(t, e) {
                return (e = C(e)) >= 32 ? String.fromCharCode(e) : t
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function j() {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(r.se)("<textarea>" + t + "</textarea>").value
        }

        function O(t) {
            return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function A(t) {
            return j(t.replace(/\t/g, "\n"))
        }

        function E(t, e) {
            if (h(t) || void 0 === t.length) {
                for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n) && !1 === e.call(t[n], n, t[n])) break
            } else
                for (var r = 0, o = t.length; r < o; r++) {
                    var i = t[r];
                    if (!1 === e.call(i, r, i)) break
                }
            return t
        }

        function N(t, e, n) {
            for (var r = n || 0, o = (t || []).length; r < o; r++)
                if (t[r] === e) return r;
            return -1
        }

        function D(t, e) {
            return -1 !== N(e, t)
        }

        function H(t, e) {
            var n = h(t) || void 0 === t.length ? {} : [];
            for (var r in t)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (e && "object" === u(t[r]) && "prototype" !== r && null !== t[r] ? n[r] = H(t[r]) : n[r] = t[r]);
            return n
        }

        function L(t) {
            var e = {},
                n = arguments.length,
                r = arguments;
            for (var o in t)
                if (t.hasOwnProperty(o)) {
                    for (var i = !1, u = 1; u < n; u++) r[u][o] && r[u][o] === t[o] && (i = !0);
                    i || (e[o] = t[o])
                }
            return e
        }

        function M() {
            var t = arguments,
                e = t.length,
                n = t[0] || {},
                r = 1,
                o = !1;
            for ("boolean" == typeof n && (o = n, n = t[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : u(n)) || f(n) || (n = {}); r < e; r++) {
                var i = t[r];
                if (null != i)
                    for (var a in i)
                        if (i.hasOwnProperty(a)) {
                            var c = n[a],
                                l = i[a];
                            n !== l && (o && l && "object" === (void 0 === l ? "undefined" : u(l)) && !l.nodeType ? n[a] = M(o, c || (null != l.length ? [] : {}), l) : void 0 !== l && (n[a] = l))
                        }
            }
            return n
        }

        function R(t) {
            window.templates = window.templates || {}, M(window.templates, t)
        }

        function z(t, e) {
            var n = (window.templates = window.templates || {})[t];
            return "function" == typeof n && (n = n()), n && e ? Object(r.rs)(n, e) : n || ""
        }

        function P(t) {
            if ("object" !== (void 0 === t ? "undefined" : u(t))) return !1;
            var e = {},
                n = function(e) {
                    return Object(r.geByTag)(e, t)
                },
                o = function(n, o) {
                    if (o.name)
                        if ("text" !== o.type && o.type)
                            if (o.getAttribute("bool")) {
                                var i = Object(r.val)(o);
                                if (!i || "0" === i) return;
                                e[o.name] = 1
                            } else e[o.name] = browser.msie && !o.value && t[o.name] ? t[o.name].value : o.value;
                    else e[o.name] = Object(r.val)(o)
                };
            return E(n("input"), function(t, e) {
                if ("radio" !== e.type && "checkbox" !== e.type || e.checked) return o(0, e)
            }), E(n("select"), o), E(n("textarea"), o), e
        }

        function B(t, e) {
            for (var n = e ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, r = void 0, o = []; t && (r = t.match(n));) {
                t = t.substr(r.index + r[0].length);
                var i = 0;
                r[4] || (i = 7), o.push({
                    url: r[2 + i],
                    query: r[5 + i] || "",
                    domain: r[4 + i]
                })
            }
            return o
        }
        var Y = function() {
            return window.devicePixelRatio >= 2
        };

        function I(t) {
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

        function F(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = e.kLimit || 1e3;
            return t >= (e.mLimit || 1e6) && !e.noCheck ? F(t = (t = C(t / 1e5)) > 1e3 ? C(t / 10) : t / 10, M(e, {
                noCheck: !0
            }), !0) + "M" : t >= n && !e.noCheck ? F(t = (t = C(t / 100)) > 100 ? C(t / 10) : t / 10, M(e, {
                noCheck: !0
            }), !0) + "K" : Object(o.langNumeric)(t, "%s", !0).replace(/,/g, ".")
        }
        var W, U = i((W = null, [function(t) {
                return W || (W = Object(r.se)("<span> </span>")), W.innerText = t, W.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }, function(t) {
                return W || (W = Object(r.se)("<span> </span>")), W.innerHTML = t, W.innerText
            }]), 2),
            $ = U[0],
            q = U[1];
        window.isRetina = Y, window.extractUrls = B, window.serializeForm = P, window.addTemplates = R, window.getTemplate = z, window.rand = l, window.irand = s, window.isUndefined = d, window.isFunction = f, window.isArray = w, window.isString = p, window.isObject = h, window.isEmpty = g, window.vkNow = m, window.vkImage = v, window.trim = y, window.stripHTML = b, window.escapeRE = _, window.intval = C, window.floatval = S, window.positive = T, window.isNumeric = x, window.winToUtf = k, window.replaceEntities = j, window.clean = O, window.unclean = A, window.each = E, window.indexOf = N, window.inArray = D, window.clone = H, window.arrayKeyDiff = L, window.extend = M, window.vkLocal = a, window.lTimeout = c, window.getCaretCharacterOffsetWithin = I, window.formatCount = F, window.encodeHtml = $, window.decodeHtml = q
    },
    146: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "loadImage", function() {
            return u
        });
        var r = n(284),
            o = n(121),
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
    },
    209: function(t, e, n) {
        "use strict";
        n.r(e);
        var r = n(264),
            o = n(237),
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
    229: function(t, e) {
        var n, r, o = t.exports = {};

        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function u() {
            throw new Error("clearTimeout has not been defined")
        }

        function a(t) {
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
        var c, l = [],
            s = !1,
            d = -1;

        function f() {
            s && c && (s = !1, c.length ? l = c.concat(l) : d = -1, l.length && w())
        }

        function w() {
            if (!s) {
                var t = a(f);
                s = !0;
                for (var e = l.length; e;) {
                    for (c = l, l = []; ++d < e;) c && c[d].run();
                    d = -1, e = l.length
                }
                c = null, s = !1,
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
            l.push(new p(t, e)), 1 !== l.length || s || a(w)
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
    237: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "getObjects", function() {
            return c
        });
        var r = n(264),
            o = n(11),
            i = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                        } catch (t) {
                            o = !0, i = t
                        } finally {
                            try {
                                !r && a.return && a.return()
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

        function a(t) {
            var e = Object(o.getXY)(t),
                n = i(e, 2)[1],
                r = t.closest(".ui_scroll_outer, #wk_layer_wrap, #box_layer_wrap, body"),
                u = !1;
            if ("BODY" !== r.tagName && r) {
                u = !0;
                var a = Object(o.getXY)(r);
                n -= i(a, 2)[1], n += r.scrollTop
            }
            return {
                y: n,
                from: u ? "custom_scroll" : "window"
            }
        }

        function c() {
            return u
        }
        e.default = function() {
            ! function() {
                u = [];
                for (var t = Object(o.geByClass)("lazyload_need_load"), e = 0; e < t.length; e++) {
                    var n = t[e],
                        r = a(n),
                        c = r.y,
                        l = r.from,
                        s = Object(o.getSize)(n),
                        d = i(s, 2),
                        f = d[0],
                        w = d[1];
                    u.push({
                        elem: n,
                        y: c,
                        from: l,
                        width: f,
                        height: w
                    })
                }
                cur.objects = u
            }(), Object(r.update)()
        }
    },
    258: function(t, e, n) {
        "use strict";

        function r(t) {
            for (var e = t, n = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], r = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], o = 0, i = n.length; o < i; o++) e = e.split(n[o]).join(r[o]);
            var u = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ";
            for (o = 0, i = u.length; o < i; o++) e = e.split(u.charAt(o)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(o));
            return e == t ? null : e
        }

        function o(t) {
            var e, n = t,
                r = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"],
                o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"],
                i = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ";
            for (e = 0; e < o.length; e++) n = n.split(o[e]).join(r[e]);
            for (e = 0; e < i.length; e++) n = n.split(i.charAt(e)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(e));
            return n == t ? null : n
        }

        function i(t) {
            var e, n = t,
                r = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
            for (e = 0; e < r.length; e++) n = n.split(r.charAt(e)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(e));
            return n == t ? null : n
        }

        function u(t, e, n) {
            if (!e || !window.langConfig) return t;
            var r;
            if (isArray(e) ? (r = e[1], t != Math.floor(t) ? r = e[langConfig.numRules.float] : each(langConfig.numRules.int, function(n, o) {
                    if ("*" == o[0]) return r = e[o[2]], !1;
                    var i = o[0] ? t % o[0] : t;
                    return -1 != indexOf(o[1], i) ? (r = e[o[2]], !1) : void 0
                })) : r = e, n) {
                for (var o = t.toString().split("."), i = [], u = o[0].length - 3; u > -3; u -= 3) i.unshift(o[0].slice(u > 0 ? u : 0, u + 3));
                o[0] = i.join(langConfig.numDel), t = o.join(langConfig.numDec)
            }
            return r = (r || "%s").replace("%s", t)
        }

        function a(t, e) {
            if (!isArray(e)) return e;
            var n = e[1];
            return window.langConfig ? (each(langConfig.sexRules, function(r, o) {
                return "*" == o[0] ? (n = e[o[1]], !1) : t == o[0] && e[o[1]] ? (n = e[o[1]], !1) : void 0
            }), n) : n
        }

        function c(t) {
            for (var e = t + "", n = arguments, r = n.length, o = 1; o < r; o += 2) {
                var i = "%" == n[o][0] ? n[o] : "{" + n[o] + "}";
                e = e.replace(i, n[o + 1])
            }
            return e
        }

        function l(t, e) {
            var n = e ? window : window.cur;
            n.lang ? extend(n.lang, t) : n.lang = t
        }

        function s() {
            try {
                var t = Array.prototype.slice.call(arguments),
                    e = t.shift();
                if (!e) return "...";
                var n = window.cur.lang && window.cur.lang[e] || window.lang && window.lang[e] || window.langpack && window.langpack[e] || window[e];
                if (!n) {
                    var r = e.split("_");
                    return r.shift(), r.join(" ")
                }
                return isFunction(n) ? n.apply(null, t) : void 0 === t[0] && !isArray(n) || "raw" === t[0] ? n : u(t[0], n, t[1])
            } catch (t) {
                debugLog("lang error:" + t.message + "(" + Array.prototype.slice.call(arguments).join(", ") + ")")
            }
        }

        function d(t, e, n, r, o, i) {
            var u;
            if (i || (i = ""), isArray(e) || (e = ["", e, e, e, e]), "number" == typeof t || "string" == typeof t ? (t > 2147483646e3 && (t = 0), t += n, u = new Date(t)) : u = t, o) e = e[1];
            else {
                var a = "";
                !(a = isToday(u) ? e[3] : isYesterday(u) ? e[2] : isTomorrow(u) ? e[4] : e[1]) && e[1] && (a = e[1]), e = a
            }
            var c = "",
                l = {
                    hours: u.getHours(),
                    minutes: u.getMinutes(),
                    seconds: u.getSeconds(),
                    day: u.getDate(),
                    month: u.getMonth() + 1,
                    year: u.getFullYear()
                };
            switch (3 === vk.lang && (c = u.getHours() > 11 ? "pm" : "am", l.hours = u.getHours() % 12 == 0 ? 12 : u.getHours() % 12), vk.lang) {
                case 1:
                    switch (u.getHours()) {
                        case 11:
                            e = e.replace(" о ", " об ");
                            break;
                        case 0:
                            e = e.replace(" о ", " в ")
                    }
                    break;
                case 3:
                    !isToday(u) || isYesterday(u) || isTomorrow(u) || (e = i + e);
                    break;
                case 12:
                case 73:
                    1 == u.getHours() && (e = e.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (l.year = l.year + 543), e.replace("{hour}", l.hours).replace("{num_hour}", leadingZero(l.hours)).replace("{minute}", leadingZero(l.minutes)).replace("{day}", l.day).replace("{num_day}", leadingZero(l.day)).replace("{month}", r[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", leadingZero(l.seconds)).replace("{am_pm}", c)
        }

        function f(t, e, n, r, o) {
            t *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = s("months_of", "raw")), e *= 1e3;
            var i = Date.now(),
                u = new Date(i),
                a = new Date(t + e);
            return !o && t > i && t - i < 864e5 && u.getDate() == a.getDate() ? d(t, "{hour}:{minute} {am_pm}", e, [], !n) : a.getYear() != u.getYear() || t < i - 157248e5 ? d(t, s("global_date", "raw"), e, r, !n) : d(t, s("global_short_date", "raw"), e, r, !n)
        }

        function w(t, e, n, r) {
            return isToday(new Date(1e3 * t + 1e3 * e)) ? d(1e3 * t, "{hour}:{minute} {am_pm}", 1e3 * e, [], !n) : f(t, e, n, r)
        }

        function p(t, e, n) {
            return isArray(e) && t < e.length ? e[t] : u(t, n)
        }

        function h(t, e) {
            var n = "";
            t += e;
            var r = parseInt(Date.now() / 1e3) - t;
            if (r < 60) n = s("global_just_now");
            else if (r < 3600) {
                n = p(intval(r / 60), s("global_word_mins_ago", "raw"), s("global_mins_ago", "raw"))
            } else if (r < 14400) {
                n = p(intval(r / 3600), s("global_word_hours_ago", "raw"), s("global_hours_ago", "raw"))
            } else n = g(t, 0, !0, "_l");
            return n
        }

        function g(t, e, n, r) {
            void 0 === n && (n = !0), void 0 === e && (e = 0), void 0 === r && (r = ""), e *= 1e3;
            var o = new Date(1e3 * t),
                i = new Date;
            return o.getFullYear() != i.getFullYear() && o.getTime() < i.getTime() - 1728e5 || Math.abs(o.getTime() - i.getTime()) > 157248e5 ? d(1e3 * t, s("global_date", "raw"), e, s("months_sm_of"), !n) : d(1e3 * t, s("global_short_date_time" + r, "raw"), e, s("months_sm_of"), !n)
        }

        function m(t, e, n) {
            void 0 === n && (n = !0), void 0 === e && (e = 0);
            var r = new Date,
                o = r.getFullYear(),
                i = r.getMonth(),
                u = new Date(1e3 * t),
                a = u.getFullYear(),
                c = u.getMonth();
            return d(1e3 * t, s(a < o && (i > 1 || c < 9 || o - a >= 2) ? "global_date" : "global_short_date_time", "raw"), e, s("months_sm_of", "raw"), !n)
        }
        n.r(e), n.d(e, "parseLatin", function() {
            return r
        }), n.d(e, "parseCyr", function() {
            return o
        }), n.d(e, "parseLatKeys", function() {
            return i
        }), n.d(e, "langNumeric", function() {
            return u
        }), n.d(e, "langSex", function() {
            return a
        }), n.d(e, "langStr", function() {
            return c
        }), n.d(e, "addLangKeys", function() {
            return l
        }), n.d(e, "getLang", function() {
            return s
        }), n.d(e, "langDate", function() {
            return d
        }), n.d(e, "getShortDate", function() {
            return f
        }), n.d(e, "getShortDateOrTime", function() {
            return w
        }), n.d(e, "langWordNumeric", function() {
            return p
        }), n.d(e, "getDateText", function() {
            return h
        }), n.d(e, "getBigDateNew", function() {
            return g
        }), n.d(e, "getSmDate", function() {
            return m
        }), window.parseLatin = r, window.parseCyr = o, window.parseLatKeys = i, window.langNumeric = u, window.langSex = a, window.langStr = c, window.addLangKeys = l, window.getLang = s, window.langDate = d, window.getShortDate = f, window.getShortDateOrTime = w, window.langWordNumeric = p, window.getDateText = h, window.getBigDateNew = g, window.getSmDate = m
    },
    261: function(t, e) {
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
    264: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "watch", function() {
            return l
        }), n.d(e, "update", function() {
            return d
        }), n.d(e, "default", function() {
            return f
        });
        var r = n(237),
            o = n(146),
            i = n(11),
            u = window,
            a = u.curBox,
            c = u.scrollGetY;

        function l(t) {
            addEvent(t, "scroll", s.pbind(t))
        }

        function s(t) {
            var e = r.getObjects(),
                n = window.innerHeight,
                u = 0,
                l = !0;
            t === document || t === window ? u = c() : t ? (u = t.scrollTop, l = !1) : window.wkcur && window.wkcur.shown ? (u = window.wkLayerWrap.scrollTop, l = !1) : a() ? (u = window.boxLayerWrap.scrollTop, l = !1) : u = c(), !l && t && (n = t.offsetHeight);
            for (var s = function(t) {
                    var r = e[t],
                        a = r.elem,
                        c = r.y,
                        s = r.height;
                    if ("window" !== r.from && l) return "continue";
                    if (c > u - 1.5 * n && u + 1.5 * n > c - s) {
                        Object(i.removeClass)(a, "lazyload_need_load"), e.splice(t, 1), t--;
                        var f = Object(i.attr)(a, "data-lazyload-src");
                        Object(o.loadImage)(f).then(function(t) {
                            t < 10 && Object(i.addClass)(a, "lazyload_no_animation"), "IMG" === a.tagName ? Object(i.attr)(a, "src", f) : Object(i.setStyle)(a, "background-image", "url(" + f + ")"), Object(i.addClass)(a, "lazyload_loaded"), Object(i.re)(Object(i.geByClass1)("lazyload_preview", a))
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
    284: function(t, e, n) {
        (function(r, o) {
            var i;
            (function() {
                "use strict";

                function u(t) {
                    return "function" == typeof t
                }
                var a, c, l = Array.isArray ? Array.isArray : function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    },
                    s = 0,
                    d = function(t, e) {
                        S[s] = t, S[s + 1] = e, 2 === (s += 2) && (c ? c(T) : v())
                    };
                var f = "undefined" != typeof window ? window : void 0,
                    w = f || {},
                    p = w.MutationObserver || w.WebKitMutationObserver,
                    h = void 0 !== r && "[object process]" === {}.toString.call(r),
                    g = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                function m() {
                    return function() {
                        setTimeout(T, 1)
                    }
                }
                var v, y, b, _, C, S = new Array(1e3);

                function T() {
                    for (var t = 0; t < s; t += 2) {
                        (0, S[t])(S[t + 1]), S[t] = void 0, S[t + 1] = void 0
                    }
                    s = 0
                }
                h ? v = function() {
                    r.nextTick(T)
                } : p ? (b = 0, _ = new p(T), C = document.createTextNode(""), _.observe(C, {
                    characterData: !0
                }), v = function() {
                    C.data = b = ++b % 2
                }) : g ? ((y = new MessageChannel).port1.onmessage = T, v = function() {
                    y.port2.postMessage(0)
                }) : v = void 0 === f ? function() {
                    try {
                        var t = n(44);
                        return a = t.runOnLoop || t.runOnContext,
                            function() {
                                a(T)
                            }
                    } catch (t) {
                        return m()
                    }
                }() : m();
                var x = function(t, e) {
                    var n = this._state;
                    if (n === A && !t || n === E && !e) return this;
                    var r = new this.constructor(j),
                        o = this._result;
                    if (n) {
                        var i = arguments[n - 1];
                        d(function() {
                            F(n, r, i, o)
                        })
                    } else P(this, r, t, e);
                    return r
                };
                var k = function(t) {
                    if (t && "object" == typeof t && t.constructor === this) return t;
                    var e = new this(j);
                    return L(e, t), e
                };

                function j() {}
                var O = void 0,
                    A = 1,
                    E = 2,
                    N = new Y;

                function D(t) {
                    try {
                        return t.then
                    } catch (t) {
                        return N.error = t, N
                    }
                }

                function H(t, e, n) {
                    e.constructor === t.constructor && n === x && constructor.resolve === k ? function(t, e) {
                        e._state === A ? R(t, e._result) : e._state === E ? z(t, e._result) : P(e, void 0, function(e) {
                            L(t, e)
                        }, function(e) {
                            z(t, e)
                        })
                    }(t, e) : n === N ? z(t, N.error) : void 0 === n ? R(t, e) : u(n) ? function(t, e, n) {
                        d(function(t) {
                            var r = !1,
                                o = function(t, e, n, r) {
                                    try {
                                        t.call(e, n, r)
                                    } catch (t) {
                                        return t
                                    }
                                }(n, e, function(n) {
                                    r || (r = !0, e !== n ? L(t, n) : R(t, n))
                                }, function(e) {
                                    r || (r = !0, z(t, e))
                                }, t._label);
                            !r && o && (r = !0, z(t, o))
                        }, t)
                    }(t, e, n) : R(t, e)
                }

                function L(t, e) {
                    var n;
                    t === e ? z(t, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(n = e) || "object" == typeof n && null !== n ? H(t, e, D(e)) : R(t, e)
                }

                function M(t) {
                    t._onerror && t._onerror(t._result), B(t)
                }

                function R(t, e) {
                    t._state === O && (t._result = e, t._state = A, 0 !== t._subscribers.length && d(B, t))
                }

                function z(t, e) {
                    t._state === O && (t._state = E, t._result = e, d(M, t))
                }

                function P(t, e, n, r) {
                    var o = t._subscribers,
                        i = o.length;
                    t._onerror = null, o[i] = e, o[i + A] = n, o[i + E] = r, 0 === i && t._state && d(B, t)
                }

                function B(t) {
                    var e = t._subscribers,
                        n = t._state;
                    if (0 !== e.length) {
                        for (var r, o, i = t._result, u = 0; u < e.length; u += 3) r = e[u], o = e[u + n], r ? F(n, r, o, i) : o(i);
                        t._subscribers.length = 0
                    }
                }

                function Y() {
                    this.error = null
                }
                var I = new Y;

                function F(t, e, n, r) {
                    var o, i, a, c, l = u(n);
                    if (l) {
                        if ((o = function(t, e) {
                                try {
                                    return t(e)
                                } catch (t) {
                                    return I.error = t, I
                                }
                            }(n, r)) === I ? (c = !0, i = o.error, o = null) : a = !0, e === o) return void z(e, new TypeError("A promises callback cannot return that same promise."))
                    } else o = r, a = !0;
                    e._state !== O || (l && a ? L(e, o) : c ? z(e, i) : t === A ? R(e, o) : t === E && z(e, o))
                }
                var W = function(t) {
                    return new X(this, t).promise
                };
                var U = function(t) {
                    var e = new this(j);
                    if (!l(t)) return z(e, new TypeError("You must pass an array to race.")), e;
                    var n = t.length;

                    function r(t) {
                        L(e, t)
                    }

                    function o(t) {
                        z(e, t)
                    }
                    for (var i = 0; e._state === O && i < n; i++) P(this.resolve(t[i]), void 0, r, o);
                    return e
                };
                var $ = function(t) {
                        var e = new this(j);
                        return z(e, t), e
                    },
                    q = 0;
                var K = V;

                function V(t) {
                    this._id = q++, this._state = void 0, this._result = void 0, this._subscribers = [], j !== t && ("function" != typeof t && function() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }(), this instanceof V ? function(t, e) {
                        try {
                            e(function(e) {
                                L(t, e)
                            }, function(e) {
                                z(t, e)
                            })
                        } catch (e) {
                            z(t, e)
                        }
                    }(this, t) : function() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }())
                }
                V.all = W, V.race = U, V.resolve = k, V.reject = $, V._setScheduler = function(t) {
                    c = t
                }, V._setAsap = function(t) {
                    d = t
                }, V._asap = d, V.prototype = {
                    constructor: V,
                    then: x,
                    catch: function(t) {
                        return this.then(null, t)
                    }
                };
                var X = Z;

                function Z(t, e) {
                    this._instanceConstructor = t, this.promise = new t(j), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && R(this.promise, this._result))) : z(this.promise, this._validationError())
                }
                Z.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, Z.prototype._enumerate = function() {
                    for (var t = this.length, e = this._input, n = 0; this._state === O && n < t; n++) this._eachEntry(e[n], n)
                }, Z.prototype._eachEntry = function(t, e) {
                    var n = this._instanceConstructor,
                        r = n.resolve;
                    if (r === k) {
                        var o = D(t);
                        if (o === x && t._state !== O) this._settledAt(t._state, e, t._result);
                        else if ("function" != typeof o) this._remaining--, this._result[e] = t;
                        else if (n === K) {
                            var i = new n(j);
                            H(i, t, o), this._willSettleAt(i, e)
                        } else this._willSettleAt(new n(function(e) {
                            e(t)
                        }), e)
                    } else this._willSettleAt(r(t), e)
                }, Z.prototype._settledAt = function(t, e, n) {
                    var r = this.promise;
                    r._state === O && (this._remaining--, t === E ? z(r, n) : this._result[e] = n), 0 === this._remaining && R(r, this._result)
                }, Z.prototype._willSettleAt = function(t, e) {
                    var n = this;
                    P(t, void 0, function(t) {
                        n._settledAt(A, e, t)
                    }, function(t) {
                        n._settledAt(E, e, t)
                    })
                };
                var G = function() {
                        var t;
                        if (void 0 !== o) t = o;
                        else if ("undefined" != typeof self) t = self;
                        else try {
                            t = Function("return this")()
                        } catch (t) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                        var e = t.Promise;
                        e && "[object Promise]" === Object.prototype.toString.call(e.resolve()) && !e.cast || (t.Promise = K)
                    },
                    Q = {
                        Promise: K,
                        polyfill: G
                    };
                void 0 === (i = function() {
                    return Q
                }.call(e, n, e, t)) || (t.exports = i), G()
            }).call(this)
        }).call(this, n(229), n(261))
    },
    44: function(t, e) {},
    63: function(t, e, n) {
        t.exports = n(209)
    }
});