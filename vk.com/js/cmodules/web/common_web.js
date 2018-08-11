! function(e) {
    var t = {};

    function o(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = t, o.d = function(e, t, n) {
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
            for (var i in e) o.d(n, i, function(t) {
                return e[t]
            }.bind(null, i));
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
    }, o.p = "", o(o.s = 92)
}([function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "ge", function() {
        return r
    }), o.d(t, "geByTag", function() {
        return a
    }), o.d(t, "geByTag1", function() {
        return s
    }), o.d(t, "geByClass", function() {
        return c
    }), o.d(t, "geByClass1", function() {
        return l
    }), o.d(t, "gpeByClass", function() {
        return d
    }), o.d(t, "domQuery", function() {
        return u
    }), o.d(t, "domQuery1", function() {
        return _
    }), o.d(t, "domClosest", function() {
        return p
    }), o.d(t, "domClosestByTag", function() {
        return f
    }), o.d(t, "gpeByTag", function() {
        return h
    }), o.d(t, "ce", function() {
        return w
    }), o.d(t, "re", function() {
        return k
    }), o.d(t, "se", function() {
        return x
    }), o.d(t, "sech", function() {
        return C
    }), o.d(t, "rs", function() {
        return T
    }), o.d(t, "psr", function() {
        return E
    }), o.d(t, "domReplaceEl", function() {
        return L
    }), o.d(t, "domEL", function() {
        return S
    }), o.d(t, "domNS", function() {
        return B
    }), o.d(t, "domPS", function() {
        return O
    }), o.d(t, "domFC", function() {
        return P
    }), o.d(t, "domLC", function() {
        return A
    }), o.d(t, "domPN", function() {
        return M
    }), o.d(t, "domChildren", function() {
        return j
    }), o.d(t, "domInsertBefore", function() {
        return N
    }), o.d(t, "domInsertAfter", function() {
        return D
    }), o.d(t, "domByClass", function() {
        return I
    }), o.d(t, "domData", function() {
        return F
    }), o.d(t, "domChildIndex", function() {
        return q
    }), o.d(t, "domCA", function() {
        return H
    }), o.d(t, "domClosestSibling", function() {
        return R
    }), o.d(t, "matchesSelector", function() {
        return W
    }), o.d(t, "isHover", function() {
        return V
    }), o.d(t, "isAncestor", function() {
        return U
    }), o.d(t, "getScroll", function() {
        return z
    }), o.d(t, "domClosestPositioned", function() {
        return K
    }), o.d(t, "domClosestOverflowHidden", function() {
        return Y
    }), o.d(t, "show", function() {
        return G
    }), o.d(t, "hide", function() {
        return X
    }), o.d(t, "isVisible", function() {
        return $
    }), o.d(t, "clientHeight", function() {
        return Z
    }), o.d(t, "getClientRectOffsetY", function() {
        return Q
    }), o.d(t, "toggle", function() {
        return J
    }), o.d(t, "boundingRectEnabled", function() {
        return ee
    }), o.d(t, "getXYRect", function() {
        return te
    }), o.d(t, "getXY", function() {
        return oe
    }), o.d(t, "isWindow", function() {
        return ne
    }), o.d(t, "getSize", function() {
        return ie
    }), o.d(t, "getW", function() {
        return re
    }), o.d(t, "getH", function() {
        return ae
    }), o.d(t, "hasClass", function() {
        return se
    }), o.d(t, "addClass", function() {
        return ce
    }), o.d(t, "addClassDelayed", function() {
        return le
    }), o.d(t, "removeClass", function() {
        return de
    }), o.d(t, "removeClassDelayed", function() {
        return ue
    }), o.d(t, "toggleClass", function() {
        return _e
    }), o.d(t, "toggleClassDelayed", function() {
        return pe
    }), o.d(t, "replaceClass", function() {
        return fe
    }), o.d(t, "getStyle", function() {
        return he
    }), o.d(t, "setStyle", function() {
        return we
    }), o.d(t, "setStyleDelayed", function() {
        return ve
    }), o.d(t, "setPseudoStyle", function() {
        return ge
    }), o.d(t, "data", function() {
        return me
    }), o.d(t, "attr", function() {
        return be
    }), o.d(t, "removeAttr", function() {
        return ye
    }), o.d(t, "removeData", function() {
        return ke
    }), o.d(t, "cleanElems", function() {
        return xe
    }), o.d(t, "setTitle", function() {
        return Ce
    }), o.d(t, "getZoom", function() {
        return Te
    }), o.d(t, "val", function() {
        return Ee
    }), o.d(t, "elfocus", function() {
        return Le
    }), o.d(t, "traverseParent", function() {
        return Se
    }), o.d(t, "setDocumentTitle", function() {
        return Oe
    }), o.d(t, "lockDocumentTitle", function() {
        return Pe
    });
    var n = o(82),
        i = o(51),
        r = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function a(e, t) {
        return (t = r(t) || document).getElementsByTagName(e)
    }

    function s(e, t) {
        return (t = r(t) || document).querySelector && t.querySelector(e) || a(e, t)[0]
    }

    function c(e, t, o) {
        return t = r(t) || document, o = o || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(o + e))
    }

    function l(e, t, o) {
        return t = r(t) || document, o = o || "*", t.querySelector && t.querySelector(o + ("." + e).replace(/\s+/gm, ".")) || c(e, t, o)[0]
    }

    function d(e, t, o) {
        if (!(t = r(t))) return null;
        for (; o !== t && (t = t.parentNode);)
            if (se(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function _(e, t) {
        return (t || document).querySelector(e)
    }

    function p(e, t) {
        return se(t, e) ? t : d(e, t)
    }

    function f(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : h(e, t)
    }

    function h(e, t) {
        if (!(t = r(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function w(e, t, o) {
        var i = document.createElement(e);
        return t && Object(n.extend)(i, t), o && we(i, o), i
    }
    var v, g, m, b, y = (v = document, g = v.createDocumentFragment(), m = v.createElement("div"), b = v.createRange && v.createRange(), g.appendChild(m), b && b.selectNodeContents(m), b && b.createContextualFragment ? function(e) {
        return e ? b.createContextualFragment(e) : v.createDocumentFragment()
    } : function(e) {
        if (!e) return v.createDocumentFragment();
        m.innerHTML = e;
        for (var t = v.createDocumentFragment(); m.firstChild;) t.appendChild(m.firstChild);
        return t
    });

    function k(e) {
        return (e = r(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var x = function(e) {
            return P(w("div", {
                innerHTML: e
            }))
        },
        C = function(e) {
            return j(w("div", {
                innerHTML: e
            }))
        };

    function T(e, t) {
        return Object(n.each)(t, function(t, o) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === o ? "" : o).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function E(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function L(e, t) {
        return Object(n.isString)(t) && (t = x(t)), M(e).replaceChild(t, e), t
    }

    function S(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var B = function(e) {
            return S((e || {}).nextSibling)
        },
        O = function(e) {
            return S((e || {}).previousSibling, 1)
        },
        P = function(e) {
            return S((e || {}).firstChild)
        },
        A = function(e) {
            return S((e || {}).lastChild, 1)
        },
        M = function(e) {
            return (e || {}).parentNode
        };

    function j(e) {
        for (var t = [], o = e.childNodes, n = 0; n < o.length; n++) o[n].tagName && t.push(o[n]);
        return t
    }

    function N(e, t) {
        var o = M(t);
        return o && o.insertBefore(e, t)
    }

    function D(e, t) {
        var o = M(t);
        return o && o.insertBefore(e, B(t))
    }

    function I(e, t) {
        return e ? l(t, e) : e
    }

    function F(e, t, o) {
        return e ? void 0 !== o ? (null === o ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, o), o) : e.getAttribute("data-" + t) : null
    }

    function q(e) {
        for (var t = 0; null != (e = O(e));) t++;
        return t
    }

    function H(e, t) {
        do {
            e = M(e)
        } while (e && !W(e, t));
        return e
    }

    function R(e, t, o) {
        for (var n = null; null === n && e;)(e = -1 === o ? O(e) : B(e)) && W(e, t) && (n = e);
        return n
    }

    function W(e, t) {
        return !(!(e = r(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; --o >= 0 && t.item(o) !== this;);
            return o > -1
        }).call(e, t)
    }

    function V(e) {
        return W(e, ":hover")
    }

    function U(e, t) {
        var o = r(e);
        if (t = r(t), !e || !t) return !1;
        for (; o = o.parentNode;)
            if (o === t) return !0;
        return !1
    }

    function z() {
        var e = browser.msie6 ? r("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function K(e, t) {
        for (var o = (t = t || {}).fromEl || M(e), i = t.positions || ["relative", "absolute", "fixed"]; o && o !== bodyNode;) {
            var r = he(o, "position");
            if (Object(n.inArray)(r, i) && (!t.noOverflow || "hidden" !== he(o, "overflow"))) break;
            o = M(o)
        }
        return o
    }

    function Y(e, t) {
        for (var o = e = r(e), n = void 0, i = void 0, a = void 0, s = !1; o && o.tagName && o !== bodyNode;) {
            if (n = he(o, "position"), i = he(o, "overflow"), a = he(o, "transform"), t && browser.mozilla) {
                if ("page_wrap" != o.id && o !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break
            } else if (o !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break;
            "none" !== a ? s = void 0 : "static" !== n && "fixed" !== s && (s = n), o = M(o)
        }
        return o
    }

    function G(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) G(arguments[o]);
        else if ((e = r(e)) && e.style) {
            var n = e.olddisplay,
                i = e.tagName.toLowerCase(),
                a = "block";
            e.style.display = n || "", "none" === he(e, "display") && (a = se(e, "inline") || se(e, "_inline") ? "inline" : se(e, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function X(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) X(arguments[o]);
        else if ((e = r(e)) && e.style) {
            var n = he(e, "display");
            e.olddisplay = "none" !== n ? n : "", e.style.display = "none"
        }
    }

    function $(e) {
        return !(!(e = r(e)) || !e.style) && "none" !== he(e, "display")
    }

    function Z() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function Q(e, t, o) {
        e = r(e), o = o || 0;
        var i = oe(e)[1],
            a = ie(e)[1],
            s = window,
            c = document.documentElement,
            l = Math.max(Object(n.intval)(s.innerHeight), Object(n.intval)(c.clientHeight)),
            d = r("page_header_cont"),
            u = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            _ = vk.staticheader ? Math.max(0, ie(d)[1] - u) : ie(d)[1];
        if (t) {
            if (i + a < u + _ + o) return i + a - u - _ - o;
            if (i > u + l - o) return i - u - l + o
        } else {
            if (i < u + _ + o) return i - u - _ - o;
            if (i + a > u + l - o) return i + a - u - l + o
        }
        return 0
    }

    function J(e, t) {
        return void 0 === t && (t = !$(e)), t ? G(e) : X(e), t
    }

    function ee(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function te(e, t) {
        var o = void 0;
        if (t && "inline" === he(e, "display")) {
            var n = e.getClientRects();
            o = n && n[0] || e.getBoundingClientRect()
        } else o = e.getBoundingClientRect();
        return o
    }

    function oe(e, t) {
        if (!(e = r(e))) return [0, 0];
        var o = e.ownerDocument,
            n = {
                top: 0,
                left: 0
            };
        if (!o) return [0, 0];
        var i = o.documentElement;
        ee(e) && (n = te(e, !0));
        var a = o === o.window ? o : 9 === o.nodeType && (o.defaultView || o.parentWindow);
        return [n.left + (t ? 0 : a.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), n.top + (t ? 0 : a.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
    }

    function ne(e) {
        return null != e && e === e.window
    }

    function ie(e, t, o) {
        e = r(e);
        var i = document.documentElement,
            a = [0, 0],
            s = void 0;
        if (t && "border-box" === he(e, "boxSizing") && (t = !1), e === document) a = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
        else if (e) {
            var c = function() {
                a = ee(e) && (s = te(e, o)) && void 0 !== s.width ? [s.width, s.height] : [e.offsetWidth, e.offsetHeight], t && Object(n.each)(a, function(t, o) {
                    var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(n.each)(i, function() {
                        a[t] -= parseFloat(he(e, "padding" + this)) || 0, a[t] -= parseFloat(he(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if ($(e)) c();
            else {
                var l = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    d = {},
                    u = !1;
                e.style.cssText.indexOf("!important") > -1 && (u = e.style.cssText), Object(n.each)(l, function(t, o) {
                    d[t] = e.style[t], e.style[t] = o
                }), c(), Object(n.each)(l, function(t, o) {
                    e.style[t] = d[t]
                }), u && (e.style.cssText = u)
            }
        }
        return a
    }

    function re(e) {
        return ie(e)[0]
    }

    function ae(e) {
        return ie(e)[1]
    }

    function se(e, t) {
        var o = r(e);
        return o && 1 === o.nodeType && (" " + o.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function ce(e, t) {
        var o = r(e);
        o && !se(o, t) && (o.className = (o.className ? o.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var le = function(e, t) {
        return setTimeout(ce.pbind(e, t), 0)
    };

    function de(e, t) {
        var o = r(e);
        o && (o.className = Object(n.trim)((o.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var ue = function(e, t) {
        return setTimeout(de.pbind(e, t), 0)
    };

    function _e(e, t, o) {
        return void 0 === o && (o = !se(e, t)), (o ? ce : de)(e, t), o
    }

    function pe(e, t, o) {
        return void 0 === o && (o = !se(e, t)), (o ? le : ue)(e, t), o
    }

    function fe(e, t, o) {
        de(e, t), ce(e, o)
    }

    function he(e, t, o) {
        if (e = r(e), Object(n.isArray)(t)) {
            var i = {};
            return Object(n.each)(t, function(t, o) {
                return i[o] = he(e, o)
            }), i
        }
        if (!e) return "";
        if (void 0 === o && (o = !0), !o && "opacity" === t && browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!o && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var s = void 0,
            c = document.defaultView || window;
        if (c.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = c.getComputedStyle(e, null);
            l && (s = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && browser.msie) {
                var d = e.currentStyle.filter;
                return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (s = e.currentStyle[t] || e.currentStyle[u]) && (s = 0), s = (s + "").split(" "), Object(n.each)(s, function(t, o) {
                if (!/^\d+(px)?$/i.test(o) && /^\d/.test(o)) {
                    var n = e.style,
                        i = n.left,
                        r = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = o || 0, s[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = r
                }
            }), s = s.join(" ")
        }
        if (o && ("width" === t || "height" === t)) {
            var _ = ie(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            s = (Object(n.intval)(s) ? Math.max(Object(n.floatval)(s), _) : _) + "px"
        }
        return s
    }

    function we(e, t, o) {
        if (e = r(e))
            if (Object(n.isObject)(t)) Object(n.each)(t, function(t, o) {
                return we(e, t, o)
            });
            else if ("opacity" === t) browser.msie && ((o + "").length ? e.style.filter = 1 !== o ? "alpha(opacity=" + 100 * o + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== o && (e.style.opacity = o);
        else try {
            var i = "number" == typeof o;
            i && /height|width/i.test(t) && (o = Math.abs(o)), o = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? o + "px" : o, e.style[t] !== o && (e.style[t] = o)
        } catch (e) {
            debugLog("setStyle error: ", [t, o], e)
        }
    }
    window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var o in t)
                if (void 0 !== e.style[t[o] + "Transform"]) return t[o] + "Transform"
        }
        return "transform"
    }();
    var ve = function(e, t, o) {
        return setTimeout(we.pbind(e, t, o), 0)
    };

    function ge(e, t, o) {
        var i = me(e, "pseudo-id");
        i || (me(e, "pseudo-id", i = Object(n.irand)(1e8, 999999999)), ce(e, "_pseudo_" + i));
        var a = t + "-style-" + i,
            s = r(a),
            c = "._pseudo_" + i + ":" + t + "{";
        s || (s = headNode.appendChild(w("style", {
            id: a,
            type: "text/css"
        }))), Object(n.each)(o, function(e, t) {
            c += e + ": " + t + " !important;"
        }), c += "}", s.sheet ? (s.sheet.cssRules.length && s.sheet.deleteRule(0), s.sheet.insertRule(c, 0)) : s.styleSheet && (s.styleSheet.cssText = c)
    }

    function me(e, t, o) {
        if (!e) return !1;
        var n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), void 0 !== o && (vkCache[n] || (vkCache[n] = {}, window.__debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = o), t ? vkCache[n] && vkCache[n][t] : n
    }

    function be(e, t, o) {
        return e = r(e), void 0 === o ? e.getAttribute(t) : (e.setAttribute(t, o), o)
    }

    function ye(e) {
        for (var t = 0, o = arguments.length; t < o; ++t) {
            var n = arguments[t];
            if (void 0 !== e[n]) try {
                delete e[n]
            } catch (t) {
                try {
                    e.removeAttribute(n)
                } catch (e) {}
            }
        }
    }

    function ke(e, t) {
        var o = !!e && e[vkExpand];
        if (o)
            if (t) {
                if (vkCache[o]) {
                    delete vkCache[o][t], t = "";
                    var n = 0;
                    for (var r in vkCache[o])
                        if ("__elem" !== r) {
                            n++;
                            break
                        }
                    n || ke(e)
                }
            } else Object(i.removeEvent)(e), ye(e, vkExpand), delete vkCache[o]
    }

    function xe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var o = r(e[t]);
            o && (ke(o), ye(o, "btnevents"))
        }
    }

    function Ce(e, t, o) {
        if ((e = r(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", o || e.innerText || e.textContent);
            else {
                var n = s("b", e);
                n && n.scrollWidth > n.clientWidth ? e.setAttribute("title", o || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function Te() {
        var e = r("zoom_test_1") || document.body.appendChild(w("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (r("zoom_test_2") || document.body.appendChild(w("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function Ee(e, t, o) {
        if (e = r(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !o && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !o && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function Le(e, t, o) {
        e = r(e);
        try {
            e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== o && !1 !== o || (o = t), e.setSelectionRange && e.setSelectionRange(t, o)
        } catch (e) {}
    }

    function Se(e, t, o) {
        for (e = r(e), o = o || 999; e && !t(e);) {
            if (0 === --o) return !1;
            try {
                if ((e = M(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    window.vkExpand = window.vkExpand || "VK" + Object(n.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var Be = !1;

    function Oe(e) {
        if (!Be) return window.document.title = Object(n.replaceEntities)(e)
    }

    function Pe(e) {
        Be = e, e && window.cur && window.cur.destroy.push(function() {
            Pe(!1)
        })
    }
    window.ge = r, window.geByTag = a, window.geByTag1 = s, window.geByClass = c, window.geByClass1 = l, window.gpeByClass = d, window.domQuery = u, window.domQuery1 = _, window.domClosest = p, window.ce = w, window.cf = y, window.re = k, window.se = x, window.sech = C, window.rs = T, window.psr = E, window.domReplaceEl = L, window.domEL = S, window.domNS = B, window.domPS = O, window.domFC = P, window.domLC = A, window.domPN = M, window.domChildren = j, window.domInsertBefore = N, window.domInsertAfter = D, window.domByClass = I, window.domData = F, window.domChildIndex = q, window.domCA = H, window.domClosestSibling = R, window.matchesSelector = W, window.isHover = V, window.isAncestor = U, window.getScroll = z, window.domClosestPositioned = K, window.domClosestOverflowHidden = Y, window.show = G, window.hide = X, window.isVisible = $, window.clientHeight = Z, window.getClientRectOffsetY = Q, window.toggle = J, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = oe, window.isWindow = ne, window.getSize = ie, window.hasClass = se, window.addClass = ce, window.addClassDelayed = le, window.removeClass = de, window.removeClassDelayed = ue, window.toggleClass = _e, window.toggleClassDelayed = pe, window.replaceClass = fe, window.getStyle = he, window.setStyle = we, window.setStyleDelayed = ve, window.setPseudoStyle = ge, window.data = me, window.attr = be, window.removeAttr = ye, window.removeData = ke, window.cleanElems = xe, window.setTitle = Ce, window.getZoom = Te, window.val = Ee, window.elfocus = Le, window.traverseParent = Se, window.getH = ae, window.getW = re, window.domClosestByTag = f, window.setDocumentTitle = Oe, window.lockDocumentTitle = Pe
}, function(e, t, o) {
    var n = o(55),
        i = o(21),
        r = o(31)(!1),
        a = o(16)("IE_PROTO");
    e.exports = function(e, t) {
        var o, s = i(e),
            c = 0,
            l = [];
        for (o in s) o != a && n(s, o) && l.push(o);
        for (; t.length > c;) n(s, o = t[c++]) && (~r(l, o) || l.push(o));
        return l
    }
}, function(e, t, o) {
    'eat script';
    var n = o(80);
    e.exports = o(78)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = n.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return n.def(this, 0 === e ? 0 : e, t)
        }
    }, n, !0)
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97),
        core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68),
        _polyfill_from_code_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6),
        _polyfill_array_find_polyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(106),
        _polyfill_array_from_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37),
        _polyfill_object_assign_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(75),
        _polyfill_number_isinteger_polyfill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27),
        _polyfill_canvas_to_blob__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(89),
        es6_promise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(43),
        _lib_ee__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(111),
        _lib_polyfills__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(74),
        _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(41),
        _lib_cookies__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(91),
        _lib_utils_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(82),
        _lib_ads__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(48),
        _lib_ajax__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(11),
        _lib_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(0),
        _lib_dom_events__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(51),
        _lib_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(94),
        _lib_element_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(13),
        _lib_favicon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(69),
        _lib_flash__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(100),
        _lib_fx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(72),
        _lib_history_and_bookmarks__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(56),
        _lib_lang__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(12),
        _lib_layers__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(54),
        _lib_ls__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(49),
        _lib_market__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(107),
        _lib_scroll__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(103),
        _lib_static_manager__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(8),
        _lib_stats__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(52),
        _lib_ui__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(40),
        _lib_video__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(39),
        _lib_scripts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(64),
        _lib_stories__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(26),
        _lib_global_search__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(7),
        _lib_top_search__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(77),
        _lib_nav__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(5),
        _lib_perfomance_logger__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(73),
        _slicedToArray = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    es6_promise__WEBPACK_IMPORTED_MODULE_8__.polyfill(), window.Map = core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__, window.Set = core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__;
    var _window = window,
        vk = _window.vk;

    function nodeUpdated(e, t) {
        setStyle(e, {
            backgroundColor: "#F5F7FA"
        }), animate(e, {
            backgroundColor: "#FFF"
        }, t || 6e3, function(e) {
            setStyle(e, {
                backgroundColor: null
            })
        })
    }

    function debugLog(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var o = Array.prototype.slice.call(arguments);
                o.unshift(t), browser.msie || browser.mobile ? console.log(o.join(" ")) : console.log.apply(console, o)
            }
        } catch (e) {}
    }

    function debugEl(e) {
        if (!e) return !1;
        var t = e.tagName,
            o = e.id,
            n = e.className,
            i = (t || "").toLowerCase();
        return n && (i += "." + e.className.replace(/\s+/g, ".")), o && !/^__vk/.test(o) && (i += "#" + e.id), i || (e.toString() || "[NULL]")
    }

    function __bf() {}
    1 === vk.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== vk.al || history.pushState || (vk.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), vk.version = !1), window.stVersions || (window.navMap = window.stVersions = window.stTypes = {}, window._rnd = 1), window.jsc = function(e) {
        return "cmodules/" + e
    }, window.NextPageID = 1, window.__debugMode = !0, window._wf = 0, window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.StaticFiles || (window.StaticFiles = {}), window.parseJSON = window.JSON && JSON.parse ? function(obj) {
        try {
            return JSON.parse(obj)
        } catch (e) {
            return topError("<b>parseJSON:</b> " + e.message, {
                dt: -1,
                type: 5,
                answer: obj
            }), eval("(" + obj + ")")
        }
    } : function(obj) {
        return eval("(" + obj + ")")
    }, window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now(), window.cur = {
        destroy: [],
        nav: []
    }, window.browser.android && (setCookie("remixscreen_width", window.screen.width, 365), setCookie("remixscreen_height", window.screen.height, 365), setCookie("remixscreen_dpr", window.devicePixelRatio || 1, 365)), setCookie("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), each(StaticFiles, function(e, t) {
        t.t = -1 !== e.indexOf(".css") ? "css" : "js", t.n = e.replace(/[\/\.]/g, "_"), t.l = 0, t.c = 0
    }), window.locHost = location.host, window.locProtocol = location.protocol, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window.locHash = location.hash.replace("#/", "").replace("#!", ""), window.nodeUpdated = nodeUpdated, window._logTimer = (new Date).getTime(), window.debugLog = debugLog, window.debugEl = debugEl, window.__bf = __bf;
    var reopen = function() {
        re(window._opener), window._opener = utilsNode.appendChild(ce("iframe"))
    };

    function tnActive(e) {
        window.tnAct = e, addClass(e, "active")
    }

    function tnInactive() {
        removeClass("head_music", "head_play_down"), removeClass("top_logo_down", "tld_d"), removeClass(window.tnAct, "active")
    }

    function updateHeaderStyles(e) {
        var t = [ge("dev_top_nav_wrap"), ge("page_header_wrap")];
        each(t, function(t, o) {
            o && setStyle(o, e)
        })
    }

    function compareScrollStyles(e, t) {
        var o = clone(e),
            n = clone(t);
        return each(o, function(e, t) {
            "position" !== e && (o[e] = Math.round(t))
        }), each(n, function(e, t) {
            "position" !== e && (n[e] = Math.round(t))
        }), JSON.stringify(o) === JSON.stringify(n)
    }

    function updateNarrow() {
        cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || ge("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && geByClass1("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || ge("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === getStyle(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || ge("page_layout");
        var e = cur.__narrowBar.bar,
            t = cur.__narrowBar.barBlock,
            o = cur.__narrowBar.wideCol,
            n = scrollGetY();
        if (!browser.mobile && e && t && o && !isVisible(boxLoader) && !isVisible(boxLayerBG) && !isVisible(layerBG)) {
            var i = window.lastWindowHeight || 0,
                r = Math.min(n, bodyNode.clientHeight - i),
                a = cur.__narrowBar.pl,
                s = vk.staticheader ? Math.max(0, getPageHeaderHeight() - r) : getPageHeaderHeight(),
                c = cur.__narrowBar.isBarFixed,
                l = floatval(getStyle(cur.__narrowBar.barBlock, "marginTop")),
                d = getSize(e)[1] - (c ? l : 0),
                u = getSize(o)[1],
                _ = getXY(o)[1],
                p = d >= u - l,
                f = l,
                h = r + i - u - _ - f,
                w = Math.max(0, h),
                v = _ - s,
                g = getXY(e)[1] + (c ? l : 0),
                m = cur.__narrowBar.lastSt || 0,
                b = cur.__narrowBar.lastStyles || {},
                y = s + f + d + l + w <= i && !cur.narrowHide,
                k = !1,
                x = void 0;
            r - 1 < v && !(y && browser.msie && g < s + l) || p ? x = {
                marginTop: 0
            } : r - 1 < Math.min(m, g - s - l) || y ? (x = {
                top: s,
                marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(a)[0]))
            }, k = !0) : r + 1 > Math.max(m, g + d + f - i) && h < 0 && !cur.narrowHide || cur.narrowHide && r + 1 > Math.max(m, g + d - s) ? (x = {
                bottom: cur.narrowHide ? i - s : f,
                marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(a)[0]))
            }, k = !0) : x = {
                marginTop: h >= 0 ? u - d : Math.min(g - _, u - d + v)
            }, compareScrollStyles(x, b) || (each(b, function(e) {
                b[e] = null
            }), setStyle(e, extend(b, x)), cur.__narrowBar.lastStyles = x), k !== c && toggleClass(e, "fixed", k), cur.__narrowBar.lastSt = r, cur.__narrowBar.isBarFixed = k
        }
    }

    function updateLeftMenu(e) {
        window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
    }
    addEvent(window, "unload", function() {
        for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && removeEvent(vkCache[e].handle.elem)
    }), addEvent(window, "DOMContentLoaded load", function() {
        vk.loaded || (vk.loaded = !0, Object(_lib_ui__WEBPACK_IMPORTED_MODULE_31__.updSideTopLink)()), checkPageBlocks()
    }), window.tnActive = tnActive, window.tnInactive = tnInactive, addEvent(window, "mouseup dragstart", tnInactive), addEvent(document, "mouseup dragstart", tnInactive), addEvent(document, "mousedown", function(e) {
        window._wf = 1, cur.__mdEvent = e
    }), window.updateHeaderStyles = updateHeaderStyles, window.compareScrollStyles = compareScrollStyles, window.updateNarrow = updateNarrow, window.getLmDomEles = function() {
        var e = {};

        function t(e) {
            return e && document.body.contains(e)
        }
        return function() {
            return {
                bar: e.bar = t(e.bar) ? e.bar : ge("side_bar_inner"),
                pl: e.pl = t(e.pl) ? e.pl : ge("page_layout"),
                pb: e.pb = t(e.pb) ? e.pb : ge("page_body")
            }
        }
    }(), window.updateLeftMenu = updateLeftMenu;
    var updateSTL = function() {
        var e = window.innerWidth,
            t = document.documentElement.clientWidth,
            o = Math.max(intval(e), intval(t));
        toggleClass(bodyNode, "no_stl", o < vk.width + 280), toggleClass(bodyNode, "no_sett", o < vk.width + 62)
    };

    function checkPageBlocks() {
        var e = ge("content");
        e && (toggleClass(e, "page_block", !geByClass1("page_block", e)), window.updateAriaElements())
    }

    function redraw(e, t) {
        e && "fixed" === getStyle(e, "position") && (t ? removeClass(e, t) : setStyle(e, {
            position: "relative"
        }), e.offsetLeft, t ? addClass(e, t) : setStyle(e, {
            position: "fixed"
        }))
    }

    function onBodyScroll() {
        if (window.pageNode) {
            var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0]));
            browser.mobile || vk.staticheader || updateHeaderStyles({
                marginLeft: e
            }), updateLeftMenu(), updateNarrow(), Object(_lib_ui__WEBPACK_IMPORTED_MODULE_31__.updSideTopLink)()
        }
    }

    function _stlClick(e) {
        return checkEvent(e) || cancelEvent(e)
    }

    function _stlMousedown(e) {
        if (e = e || window.event, !checkEvent(e) && !__afterFocus)
            if (_stlWasSet && _stlWas) {
                var t = _stlWas;
                _stlWas = 0, scrollToY(t, 0, !0, !0), updateLeftMenu(!0)
            } else 1 === _stlBack ? _tbLink.onclick() : (_stlWas = scrollGetY(), scrollToY(0, 0, !0, !0), updateLeftMenu())
    }

    function _stlMouseover(e) {
        var t = e ? e.originalEvent || e : window.event || {},
            o = "mouseover" === t.type && (t.pageX > 0 || t.clientX > 0);
        toggleClass(_stlLeft, "over", o), toggleClass(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), toggleClass(_stlSide, "over", o)
    }
    window.updateSTL = updateSTL, window.checkPageBlocks = checkPageBlocks, window.onBodyResize = function(e) {
        if (window.pageNode) {
            var t = document.documentElement,
                o = t.clientWidth,
                n = t.clientHeight,
                i = sbWidth(),
                r = Math.max(intval(window.innerWidth), intval(o)),
                a = Math.max(intval(window.innerHeight), intval(n)),
                s = !1;
            if (browser.mobile && (r = Math.max(r, intval(bodyNode.scrollWidth)), a = Math.max(a, intval(bodyNode.scrollHeight))), window.lastWindowWidth !== r || !0 === e) {
                s = !0, window.lastInnerWidth = window.lastWindowWidth = r, layerWrap.style.width = boxLayerWrap.style.width = r + "px";
                var c = layer.style.width = boxLayer.style.width = r - i - 2 + "px";
                if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = r + "px", mvLayer.style.width = c), window.wkLayerWrap && (wkLayerWrap.style.width = r + "px", wkLayer.style.width = c), bodyNode.offsetWidth < vk.width + i + 2 && (r = vk.width + i + 2), r)
                    for (var l = pageNode.firstChild; l; l = l.nextSibling)
                        if (l.tagName) {
                            for (var d = (window.lastInnerWidth = r - i - 1) - 1, u = l.firstChild; u; u = u.nextSibling) "scroll_fix" === u.className && (u.style.width = d + "px");
                            vk.staticheader || updateHeaderStyles({
                                width: d
                            })
                        }
            }
            if ((window.lastWindowHeight !== a || !0 === e) && (s = !0, window.lastWindowHeight = a, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = a + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = a + "px"), window.wkLayerWrap)) {
                var _ = browser.mobile ? window.innerHeight : a;
                wkLayerWrap.style.height = _ + "px"
            }
            if (vk.noSideTop || Object(_lib_ui__WEBPACK_IMPORTED_MODULE_31__.updSideTopLink)(1), s && window.curRBox && window.curRBox.boxes && window.getWndInner) {
                var p = getWndInner();
                each(curRBox.boxes, function(e, t) {
                    return t._wnd_resize(p[0], p[1])
                })
            }
            setTimeout(_lib_ads__WEBPACK_IMPORTED_MODULE_14__.updSeenAdsInfo, 0);
            var f = getAudioPlayer();
            f.audioLayer && f.audioLayer.isShown() && f.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && setStyle(cur.lSTL, {
                width: Math.max(getXY(cur.lSTL.el)[0], 0),
                height: a - 1
            }), ge("dev_top_nav") && setStyle(ge("dev_top_nav", "left", null));
            var h = geByClass("ui_search_fixed"),
                w = ge("narrow_column");
            each(h, function() {
                redraw(this, "ui_search_fixed"), setTimeout(redraw.pbind(this, "ui_search_fixed"), 0)
            }), w && (redraw(w, "fixed"), setTimeout(redraw.pbind(w, "fixed"), 0)), updateLeftMenu(), updateNarrow(), updateSTL()
        }
    }, window.redraw = redraw, window.onBodyScroll = onBodyScroll, window.onDocumentClick = function(e) {
        if (checkEvent(e)) return !0;
        if (ls.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
            if (!(e = window.event || e.originalEvent || e)) return !0;
            for (var t = 8, o = e.target || e.srcElement, n = void 0, i = void 0, r = void 0; o && o !== bodyNode && "A" !== o.tagName && t--;) o = o.parentNode;
            if (!o || "A" !== o.tagName || o.onclick || o.onmousedown) return !0;
            var a = o.href;
            if (a && (o.getAttribute("target") || nav.baseBlank)) {
                if (cur.hideReferrer && !browser.msie) return (r = window.open("", "_blank", "")) && (browser.msie && -1 !== a.indexOf(";") && (a = "'" + a.replace(/'/g, "%27") + "'"), r.opener = null, r.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + clean(a) + '">'), r.document.close()), cancelEvent(e);
                try {
                    return window._opener.contentWindow.open(a, "_blank"), setTimeout(reopen, 0), cancelEvent(e)
                } catch (e) {
                    return !0
                }
            }
            if ("https:" !== location.protocol && !a.indexOf("https://")) return !0;
            (a = a.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (a = a.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (a = a.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
            var s = {};
            (i = a.match(/^\/(.+?)#[\!\/](.+?)$/)) && !i[1].match(/^app(\d+)/) && (s.permanent = i[1], a = "/" + i[2]);
            var c = !!(o.getAttribute && o.getAttribute("data-post-click-type") && o.getAttribute("data-post-id"));
            if (a.match(/#$/) && !c) return !0;
            var l = domData(o, "post-id");
            l && (s.postId = l);
            var d = void 0,
                u = a;
            if (n = a.match(/^\/(.*?)(\?|#|$)/)) n = n[1];
            else {
                if (o.hostname) d = o.hostname, n = o.pathname + o.search;
                else {
                    var _ = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(a);
                    if (!_) return !0;
                    d = _[1], n = _[3] || "/"
                }
                if (!d || !c) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), u = o
            }
            if ("add_community_app" === n) return attr(o, "target", "_blank"), !0;
            if (n.indexOf(".php") > 0 || n.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                if (!c) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), u = o
            }
            var p = o.getAttribute("hrefparams");
            p && (s.params = extend(s.params || {}, q2ajx(p)));
            try {
                return nav.go(u, e, s), cancelEvent(e)
            } catch (e) {
                return !0
            }
        }
    }, window.onEnter = function(e, t) {
        (t = t || window.event).keyCode === KEY.ENTER && (e(), cancelEvent(t))
    }, window.onCtrlEnter = function(e, t) {
        (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) && (t(), cancelEvent(e))
    }, vk.width = 960;
    var initedCheck = 0,
        needBlur = !1;

    function onDomReady(e) {
        e()
    }
    window.domStarted = function() {
        if (window.headNode = geByTag1("head"), extend(window, {
                icoNode: geByTag1("link", headNode),
                bodyNode: geByTag1("body"),
                htmlNode: geByTag1("html"),
                utilsNode: ge("utils"),
                _fixedNav: !1,
                _tbLink: {}
            }), addEvent(bodyNode, "resize", onBodyResize.pbind(!1)), utilsNode) {
            browser.mozilla ? addClass(bodyNode, "firefox") : browser.mobile && addClass(bodyNode, "mobfixed");
            var e = [];
            each(browser, function(t, o) {
                o && !inArray(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
            }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e), each(StaticFiles, function(e, t) {
                t.l = 1, "css" === t.t && utilsNode.appendChild(ce("div", {
                    id: t.n
                }))
            });
            var t = ge("layer_bg"),
                o = t.nextSibling,
                n = ge("box_layer_bg"),
                i = n.nextSibling;
            if (extend(window, {
                    layerBG: t,
                    boxLayerBG: n,
                    layerWrap: o,
                    layer: o.firstChild,
                    boxLayerWrap: i,
                    boxLayer: i.firstChild,
                    boxLoader: i.firstChild.firstChild,
                    _stlSide: ge("stl_side"),
                    _stlLeft: ge("stl_left"),
                    _stlShown: 0,
                    _stlWas: 0,
                    _stlWasSet: 0,
                    _stlBack: 0,
                    _regBar: 0,
                    __afterFocus: !1
                }), reopen(), !browser.mobile) {
                var r = {
                    onclick: _stlClick,
                    onmousedown: _stlMousedown,
                    onmouseover: _stlMouseover,
                    onmouseout: _stlMouseover
                };
                val(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + getLang("global_to_top") + "</nobr></div>"), extend(_stlLeft, r), extend(_stlSide, r), window._stlBg = _stlLeft.firstChild, window._stlText = window._stlBg.firstChild, addEvent(window, "blur", function() {
                    window._wf = -1, needBlur = !1
                });
                var a = !0;
                addEvent(window, "focus", function() {
                    window._wf = 1, needBlur || (window.__afterFocus = needBlur = !0, setTimeout(function() {
                        window.__afterFocus = !1
                    }, 10), a && (sbWidth(!0), onBodyResize(!0), a = !1))
                })
            }
            addEvent(boxLayerWrap, "click", __bq.hideLastCheck), window.LazyLoad && LazyLoad.watch(boxLayerWrap), extend(layers, {
                show: layers._show.pbind(t, o),
                boxshow: layers._show.pbind(n, i),
                wrapshow: layers._show.pbind(t),
                hide: layers._hide.pbind(t, o),
                boxhide: layers._hide.pbind(n, i),
                wraphide: layers._hide.pbind(t)
            }), hab.init(), window._retinaInit ? window._retinaInit() : initedCheck = 1
        }
    }, vk.started = vkNow(), window.domReady = function() {
        if (utilsNode) {
            updateSTL();
            var e = ge("side_bar");
            extend(window, {
                pageNode: ge("page_wrap"),
                _fixedNav: e && "fixed" === getStyle(e, "position"),
                _tbLink: ge("top_back_link")
            }), browser.chrome || browser.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = browser.safari ? bodyNode : htmlNode;
            var t = Math.max(vkNow() - vk.started, 10),
                o = intval((vk.contlen || 1) / t * 1e3);
            if (browser.mozilla && browser.version >= 4 ? o /= 2.5 : browser.mozilla ? o *= 1.5 : browser.msie && browser.version >= 7 ? o /= 1.5 : browser.msie && (o *= 2.5), __stm.lowlimit = intval(150 * Math.max(2e6 / o, 1)), __stm.highlimit = 6 * __stm.lowlimit, __stm.lowlimit = Math.min(__stm.lowlimit, 600), onBodyResize(), setTimeout(onBodyResize.pbind(!1), 0), updateAriaElements(), window.addEventListener("scroll", onBodyScroll, {
                    passive: !0
                }), window.debuglogInit && debuglogInit(), !vk.id && ls.checkVersion() && ls.get("last_reloaded")) try {
                var n = {};
                each(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                    var o = ls.get(t);
                    null !== o && (n[t] = o)
                }), window.localStorage.clear(), each(n, function(e, t) {
                    return ls.set(e, t)
                })
            } catch (e) {}
        }
    }, Object(_lib_perfomance_logger__WEBPACK_IMPORTED_MODULE_38__.subscribePerformanceLoggerCollectors)(), window.onDomReady = onDomReady;
    var hab = new window.HistoryAndBookmarks({
        onLocChange: function(e) {
            var t = {
                back: !0,
                hist: !0
            };
            3 === vk.al && history.state && isObject(history.state) && (t.scrollTop = intval(history.state.scrollTop)), nav.go("/" + e, void 0, t)
        }
    });

    function leftBlockHide(e, t, o) {
        var n = {
            act: "hide_block",
            block: e,
            hash: t
        };
        o && (n.block = o), ajax.post("al_index.php", n, {
            onDone: _lib_ads__WEBPACK_IMPORTED_MODULE_14__.updSeenAdsInfo
        }), hide("left_block" + e)
    }

    function leftBlockFriendTooltip() {
        return showTooltip(ge("left_friend_subscribed"), {
            url: "al_friends.php",
            params: {
                act: "friend_tt",
                mid: cur.mfid,
                from: "leftblock"
            },
            slide: 15,
            hidedt: 500,
            shift: [40, -1, 3],
            className: "preq_tt",
            forcetodown: !0
        })
    }

    function comScoreUDM(e, t) {
        if (!vk.zero) {
            t = t || document.referrer;
            var o = "https:" === locProtocol ? "sb" : "b",
                n = escape(e),
                i = escape(t),
                r = Math.random();
            vkImage().src = locProtocol + "//" + o + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + n + "&c5=&c7=" + n + "&c9=" + i + "&c15=&cv=2.0&cj=1&rn=" + r
        }
    }

    function updateOtherCounters(e, t) {
        if (!vk.zero && !__dev) {
            t = t || document.referrer;
            for (var o = [new RegExp("(\\/login)(\\?).*$")], n = 0; n < o.length; n++)
                if (e.match(o[n])) return;
            var i = [
                    [new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1"],
                    [new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1"]
                ],
                r = {
                    referrer: t,
                    url: e
                };
            each(r, function(e) {
                each(i, function() {
                    r[e] = r[e].replace(this[0], this[1])
                })
            }), t = r.referrer, e = r.url;
            var a = void 0 === window.screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth);
            vkImage().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + a + ";u" + escape(e) + ";" + Math.random(), vkImage().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" === vk.tnsPixelType ? vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" === vk.tnsPixelType ? vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" === vk.tnsPixelType && (vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), comScoreUDM(e, t), window._tmr = window._tmr || [], window._tmr.push({
                id: "2579437",
                url: e,
                referrer: t,
                type: "pageView",
                start: (new Date).getTime(),
                pid: vk.id ? vk.id : 0
            })
        }
    }

    function handleSetCount(e, t, o) {
        var n = "",
            i = "",
            r = '<span class="inl_bl left_count_sign"></span>',
            a = "spr" === o ? 5 : 3,
            s = geByClass1("left_count_wrap", e),
            c = hasClass(geByClass1("left_row", e, "a"), "left_nav_over"),
            l = geByClass1("left_count", e, "span"),
            d = val(l);
        t && ((n = t.toString()).length > a && (i = ' title="' + stripHTML(langNumeric(t, "%s", !0)) + '"', n = ".." + n.substr(n.length - a)), r = '<span class="inl_bl left_count" ' + i + ">" + n + "</span>");
        var u = function() {
            val(s, r), (t ? removeClass : addClass)(s, "left_void"), setStyle(s, {
                opacity: ""
            })
        };
        if (d || c)
            if (n) animateCount(l, n, {
                str: "auto",
                onDone: u
            });
            else if (c) {
            var _ = bodyNode.appendChild(se('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>')),
                p = getSize(domFC(_))[0];
            re(_), d && "." === d.charAt(0) && val(l, d.replace("..", "")), animate(l, {
                width: p
            }, 100, u)
        } else animate(s, {
            opacity: 0
        }, 100, u);
        else u(), setStyle(s, {
            opacity: 0
        }), animate(s, {
            opacity: 1
        }, 100)
    }

    function handlePageParams(e) {
        vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), updateSTL(), updateLeftMenu(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
            window.scrollmarked = {}, statlogsValueEvent("page_scroll", 0, cur.module, "0")
        }, 300), handlePageView(e);
        var t = ge("mvk_footer_lnk");
        if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = intval(e.nophone), vk.staticheader = intval(e.staticheader), vk.id) {
            var o = ge("left_blocks");
            o && (o.innerHTML = e.leftblocks || "")
        }
        "leftads" in e && 0 !== e.leftads && window.__adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
        var n = locProtocol + "//" + location.host + "/";
        e.loc && ("?" === e.loc.charAt(0) ? n += nav.strLoc : n += e.loc);
        var i = document.URL === n ? "" : document.URL;
        if (setTimeout(updateOtherCounters.pbind(n, i), 10), e.counters) {
            var r = (e.counters || "").split(","),
                a = "",
                s = "";
            intval(r[9]) > 0 ? (a = "adsmarket", s = "act=overview&status=-1") : intval(r[9]) < -1 ? (r[9] = 1, a = "ads", s = "act=a_comeback_office_redirect") : a = "ads?act=office&last=1";
            var c = ge("l_set"),
                l = c && c.nextSibling || !1,
                d = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                u = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "vkpay", "gifts.php?act=wishlist", "apps", a, "feed" + (ge("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                _ = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", s, ge("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"],
                p = !1;
            if (e.handlecnts) {
                for (var f = 0; f < d.length; f++) handlePageCount(d[f], r[f], u[f], _[f]);
                for (var h = l.nextSibling; h; h = h.nextSibling) {
                    if (h.tagName && "li" === h.tagName.toLowerCase() && isVisible(h)) {
                        p = !0;
                        break
                    }
                    if (hasClass(h, "more_div")) break
                }(p ? show : hide)(l);
                for (var w = r.length; f < w; f++) {
                    var v = r[f].split(":"),
                        g = ge("l_app" + intval(v[0]));
                    g && handleSetCount(g, intval(v[1]))
                }
                setTimeout(window.updSeenAdsInfo, 0)
            } else
                for (var m = 0; m < d.length; m++) vk.counts[d[m]] = r[m]
        }
    }

    function reloadCheckFlood(e) {
        e = e || {};
        var t = ls.get("last_reloaded") || [];
        t.unshift(vkNow());
        var o = t.length;
        return o > 5 && (t.splice(5, o - 5), o = 5), ls.set("last_reloaded", t), !!(5 === o && t[0] - t[4] < 2e4) && (topError('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
            dt: 15,
            type: 6,
            msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
        }), !0)
    }

    function __phCheck(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = arguments[2],
            n = arguments[3],
            i = e.phshown,
            r = e.phcont,
            a = t.back,
            s = t.editable,
            c = t.hideBackAfter,
            l = t.timeout,
            d = t.phColor,
            u = void 0 === d ? "#8C8E91" : d,
            _ = t.activeColor,
            p = void 0 === _ ? "#C0C8D0" : _,
            f = l || 0 === l ? l : 100,
            h = t.period || 200,
            w = void 0;
        if (w = s ? (void 0 !== e.textContent ? e.textContent : e.innerText) || geByTag("img", e).length : e.value, i && (a && w || !a && (o && !o.type || w)) ? (hide(r), e.phshown = !1) : i || w || !a && !n || (show(r), e.phshown = !0, browser.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), a && !w) {
            if (o && !o.type) {
                var v = c ? hide.pbind(r.firstChild.firstChild) : null;
                clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                    animate(r.firstChild.firstChild, {
                        color: p
                    }, h, v)
                }, f)
            }
            n && (clearTimeout(e.phanim), c && show(r.firstChild.firstChild), e.phanim = setTimeout(function() {
                animate(r.firstChild.firstChild, {
                    color: u
                }, h)
            }, f))
        }
    }
    window.hab = hab, window.leftBlockOver = function(e) {
        var t = 1;
        e.id || (e = ge("left_hide" + e), t = 0), !t && e.timer || (e.showing ? removeAttr(e, "showing") : (animate(e, {
            opacity: t ? 1 : .5
        }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), removeAttr(e, "timer"))
    }, window.leftBlockOut = function(e) {
        var t = .5;
        e.id || (e = ge("left_hide" + e), t = 0), e.timer = setTimeout(function() {
            animate(e, {
                opacity: t
            }, 200), removeAttr(e, "timer")
        }, 1)
    }, window.leftBlockHide = leftBlockHide, window.hideNewsAnnounce = function(e, t) {
        var o = {
            act: "hide_block",
            block: e,
            hash: t
        };
        ajax.post("al_index.php", o), hide("news_announce_" + e)
    }, window.leftAdBlockClose = function(e, t) {
        function o() {
            animate("ads_ad_close_info_" + e, {
                opacity: 1
            }, 200, n)
        }

        function n() {
            setStyle("ads_ad_box2_" + e, {
                visibility: "hidden"
            })
        }
        setStyle("left_hide" + e, {
            visibility: "hidden"
        }), ajax.post(t, {}, {
            noAds: !0,
            onDone: function(t) {
                if (!t.done) return;
                if ("ya_direct" === e) return animate(e, {
                    opacity: 0
                }, 200, function() {
                    re("ya_direct"), setTimeout(function() {
                        AdsLight.updateBlock("force_hard", 2)
                    }, 5e3)
                }), void(window.vk__adsLight.yaDirectAdActive = !1);
                var n = ge("ads_ad_close_info_" + e);
                if (!n) return !1;
                setStyle(n, {
                    opacity: 0
                }), n.style.setProperty("display", "block", "important"), setTimeout(o, 0)
            }
        })
    }, window.leftBlockFriendHide = function(e, t, o) {
        var n = ge("left_friends");
        if (n) {
            var i = geByClass("left_friend_block", n),
                r = [];
            each(i, function(e, t) {
                var o = t.id.split("_");
                r.push(o[2])
            });
            var a = {
                act: "hide_block",
                block: t,
                showed: r.join(","),
                hash: o
            };
            ajax.post("al_index.php", a, {
                onDone: function(e) {
                    if (e) {
                        var t = se(e);
                        geByClass("left_friend_block", n).length >= 2 && hide(t), n.insertBefore(t, geByClass1("left_friend_all_link", n))
                    }
                    geByClass("left_friend_block", n).length || hide("left_friend_all_link")
                }
            });
            var s = ge("left_block" + e),
                c = i.pop();
            c && !isVisible(c) ? (show(c), s.parentNode.replaceChild(c, s)) : re(s)
        }
    }, window.leftBlockToggleFriend = function(e, t, o, n, i) {
        n && stManager.add(["tooltips.css", "tooltips.js"]), cur.mfid = e, ajax.post("al_friends.php", {
            act: n ? "add" : "remove",
            mid: e,
            mf_type: t,
            hash: o,
            from: "leftblock"
        }, {
            onDone: function(t, o, n) {
                if (!t) return nav.reload();
                var i = ge("left_friend_status_" + e);
                cleanElems(i.firstChild), t ? (show(i), val(i, t)) : hide(i), o && (ajax.preload("al_friends.php", {
                    act: "friend_tt",
                    mid: e
                }, [o, n]), setTimeout(leftBlockFriendTooltip, 0))
            },
            showProgress: function() {
                var t = (ge("left_friend_subscribed") || {}).tt;
                t && (t.hide({
                    fasthide: 1
                }), t.destroy()), ge("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
            },
            hideProgress: function() {
                return hide("left_friend_status_" + e)
            },
            onFail: function(e) {
                if (e) return showFastBox({
                    title: getLang("global_error")
                }, e), !0
            }
        }), cancelEvent(i)
    }, window.leftBlockFriendTooltip = leftBlockFriendTooltip, window.leftBlockUnpaidGiftsHide = function(e, t) {
        return showFastBox({
            title: getLang("left_delete_unpaid_gifts_title")
        }, getLang("left_delete_unpaid_gifts_text"), getLang("global_delete"), function() {
            leftBlockHide(e, t), re("payments_box_unpaid_gifts_info"), curBox().hide()
        }, getLang("global_cancel"))
    }, window.comScoreUDM = comScoreUDM, window.updateOtherCounters = updateOtherCounters, window.handlePageView = function(e) {
        var t = ge("footer_wrap"),
            o = geByClass1("top_home_link"),
            n = void 0 === e.width ? vk.width : e.width,
            i = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
            r = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
        if (vk.noleftmenu === e.noleftmenu && vk.nobottommenu === e.nobottommenu && vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || (vk.noleftmenu !== e.noleftmenu && e.noleftmenu && hide("side_bar"), vk.nobottommenu !== e.nobottommenu && (e.nobottommenu ? hide("bottom_nav") : show("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (addClass(t, "simple"), t.style.width = "auto") : t && (removeClass(t, "simple"), t.style.width = n - r + "px")), vk.notopmenu !== e.notopmenu && (e.notopmenu ? hide("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : show("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), o && vk.top_home_link_class !== e.top_home_link_class && (o.className = e.top_home_link_class), n !== vk.width || i !== vk.width_dec) {
            ge("page_layout").style.width = n + "px", ge("page_header").style.width = n + "px", ge("page_body").style.width = n - i + "px", ge("ts_wrap") && hasClass(ge("ts_wrap"), "vk") && (ge("ts_wrap").style.width = n - 191 + "px"), setTimeout(_lib_ui__WEBPACK_IMPORTED_MODULE_31__.updSideTopLink.pbind(!0), 0), setTimeout(updateSTL, 0);
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
        }
        vk.noleftmenu === e.noleftmenu || e.noleftmenu || show("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.top_home_link_class = e.top_home_link_class, vk.notopmenu = e.notopmenu, vk.width = n, vk.width_dec = i, vk.width_dec_footer = r, vk.body_class = e.body_class, vk.staticheader = intval(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
    }, window.handleSetCount = handleSetCount, vk.counts = {}, window.handlePageParams = handlePageParams, window.handlePageCount = function(e, t, o, n) {
        var i = intval(t);
        if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== i)
            if (vk.counts[e] = i, "ntf" !== e) {
                var r = ge("l_" + e),
                    a = hasClass(domFC(r), "left_nav_over"),
                    s = void 0;
                r && (handleSetCount(r, i > 0 ? i : 0, e), n && o && (s = i > 0 && n ? "?" + n : "", r.firstChild.href = "/" + o + s)), (i >= 0 || !a) && toggle(r, i >= 0)
            } else window.TopNotifier.setCount(i > 0 ? i : 0)
    }, window.processDestroy = function(e) {
        if (e._back && e._back.hide && e === cur)
            for (var t in e._back.hide)
                if (e._back.hide.hasOwnProperty(t)) try {
                    e._back.hide[t]()
                } catch (e) {
                    try {
                        console.log(e.stack)
                    } catch (e) {}
                }
        if (e.destroy && e.destroy.length)
            for (var o in e.destroy)
                if (e.destroy.hasOwnProperty(o)) try {
                    e.destroy[o](e)
                } catch (e) {
                    try {
                        console.log(e.stack)
                    } catch (e) {}
                }
    }, window.globalHistory = [], window.globalHistoryDestroy = function(e) {
        for (var t = 0, o = globalHistory.length; t < o; t++)
            if (globalHistory[t].loc === e) {
                var n = globalHistory.splice(t, 1)[0];
                processDestroy(n.cur), n.content.innerHTML = "", --t, --o
            }
    }, window.showBackLink = function(e, t, o) {
        var n = e;
        if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
            for (var i = 0, r = globalHistory.length; i < r; i++)
                if (globalHistory[i].loc === e) {
                    o = 1;
                    break
                }
        if (n) {
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
            extend(_tbLink, {
                href: "/" + e,
                innerHTML: t,
                fast: o
            }), show(_tbLink), window._stlWas = 0
        } else hide(_tbLink);
        Object(_lib_ui__WEBPACK_IMPORTED_MODULE_31__.updSideTopLink)(1)
    }, window.reloadCheckFlood = reloadCheckFlood, window.nav = _lib_nav__WEBPACK_IMPORTED_MODULE_37__.default, nav.init(), vk.time && !window.browser.opera_mobile && setTimeout(function() {
        var e = new Date,
            t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
        1 === t[1] && 12 === vk.time[1] ? vk.time[1] = 0 : 12 === t[1] && 1 === vk.time[1] ? t[1] = 0 : (t[1] > vk.time[1] + 1 || vk.time[1] > t[1] + 1) && (t[1] = vk.time[1] = t[2] = vk.time[2] = 0), t[1] > vk.time[1] && 1 === t[2] ? 31 === vk.time[2] || (4 === vk.time[1] || 6 === vk.time[1] || 9 === vk.time[1] || 11 === vk.time[1]) && 30 === vk.time[2] || 2 === vk.time[1] && (29 === vk.time[2] || 28 === vk.time[2] && vk.time[0] % 4) ? vk.time[2] = 0 : vk.time[2] = t[2] = 0 : vk.time[1] > t[1] && 1 === vk.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && vk.time[0] % 4) ? t[2] = 0 : t[2] = vk.time[2] = 0), (t[2] > vk.time[2] + 1 || vk.time[2] > t[2] + 1) && (t[2] = vk.time[2] = 0);
        var o = 60 * (60 * (24 * (t[2] - vk.time[2]) + (t[3] - vk.time[3])) + (t[4] - vk.time[4]));
        o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
        var n = 0,
            i = Math.abs(o);
        each([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
            var r = Math.round(3600 * (t - 3)),
                a = Math.abs(o - r);
            a < i && (i = a, n = r)
        }), vk.dt = n, getCookie("remixdt") !== vk.dt && setCookie("remixdt", vk.dt, 365);
        var r = intval(getCookie("remixrt"));
        window.devicePixelRatio >= 2 && (!browser.iphone || getCookie("remixme")) ? 1 & r || (setCookie("remixrt", 1 | r, 365), window._retinaInit = function() {
            stManager.add(["retina.css"]), addClass(document.body, "is_2x")
        }, initedCheck && window._retinaInit()) : 1 & r && setCookie("remixrt", 1 ^ r, 365)
    }, 0), window.__phCheck = __phCheck, window.placeholderSetup = function(e, t) {
        var o = ge(e),
            n = t ? clone(t) : {};
        if (o && (!o.phevents || n.reload)) {
            var i = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (i) {
                o.removeAttribute("placeholder");
                var r = {},
                    a = !1,
                    s = ["Top", "Bottom", "Left", "Right"];
                if (n.pad) r = n.pad;
                else {
                    if (n.fast) {
                        for (var c = 0; c < 4; c++) r["padding" + s[c]] = 3, r["margin" + s[c]] = 0, r["border" + s[c] + "Width"] = 1;
                        extend(r, n.styles || {})
                    } else {
                        for (var l = [], d = 0; d < 4; d++) l.push("margin" + s[d]), l.push("padding" + s[d]), l.push("border" + s[d] + "Width");
                        r = getStyle(o, l)
                    }
                    for (var u = 0; u < 4; u++) {
                        var _ = "margin" + s[u],
                            p = "border" + s[u] + "Width";
                        r[_] = intval(r[_]) + intval(r[p]) + "px", delete r[p]
                    }
                }
                if (n.reload) {
                    var f = o.previousSibling;
                    f && hasClass(f, "input_back_wrap") && re(f)
                }
                var h = n.big ? " big" : "",
                    w = getSize(o)[0] - 20,
                    v = o.phcont = o.parentNode.insertBefore(ce("div", {
                        className: "input_back_wrap no_select",
                        innerHTML: '<div class="input_back"><div class="input_back_content' + h + '" style="width: ' + w + 'px;">' + i + "</div></div>"
                    }), o),
                    g = domFC(v);
                setStyle(g, r);
                var m = __phCheck.pbind(o, n),
                    b = browser.mobile ? m : function(e, t) {
                        return setTimeout(m.pbind(e, t), 0)
                    };
                browser.msie && browser.version < 8 && setStyle(g, {
                    marginTop: 1
                }), o.phonfocus = function(e) {
                    a || (o.focused = !0, cur.__focused = o, !0 === e && (setStyle(o, {
                        backgroundColor: "#FFF"
                    }), hide(g)), b(!0, !1))
                }, o.phonblur = function() {
                    a || (cur.__focused = o.focused = !1, show(g), b(!1, !0))
                }, o.phshown = !0, o.phanim = null, (o.value || n.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || geByTag("img", o).length)) && (o.phshown = !1, hide(v)), browser.opera_mobile || (addEvent(v, "focus click", function(e) {
                    a || (n.editableFocus ? (setTimeout(n.editableFocus.pbind(o), 0), o.phonfocus()) : (o.blur(), o.focus()))
                }), addEvent(o, "focus" + (n.editable ? " click" : ""), o.phonfocus), addEvent(o, "keydown paste cut input", b)), addEvent(o, "blur", o.phonblur), o.check = b, o.getValue = function() {
                    return n.editable ? o.innerHTML : o.value
                }, o.setPlaceholder = function(e) {
                    return geByClass1("input_back_content", v).textContent = e
                }, o.setDisabled = function(e) {
                    return a = e
                }, o.setValue = function(e) {
                    n.editable ? o.innerHTML = e : o.value = e, __phCheck(o, n)
                }, o.phevents = !0, o.phonsize = function() {}, n.global || n.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                    for (var t = 0, o = e.length; t < o; t++) removeData(e[t])
                }.pbind(cur.__phinputs))), cur.__phinputs.push(o))
            }
        }
    }, window.isInputActive = function() {
        return document.activeElement && (attr(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
    }, window.placeholderInit = function(e, t) {
        var o = ge(e),
            n = t ? clone(t) : {},
            i = void 0 === ce("input").placeholder || o && o.getAttribute && o.getAttribute("contenteditable");
        if (o && (!o.phevents || n.reload)) {
            var r = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (r && (o.getValue = function() {
                    return n.editable ? o.innerHTML : o.value
                }, o.setValue = function(e) {
                    n.editable ? o.innerHTML = e : o.value = e, i && d(o, n)
                }, o.phonfocus = function() {}, o.phonblur = function() {}, i)) {
                if (o.removeAttribute("placeholder"), n.reload) {
                    var a = domNS(o);
                    a && hasClass(a, "placeholder") && re(a)
                }
                var s = o.phcont = Object(_lib_dom__WEBPACK_IMPORTED_MODULE_16__.domInsertAfter)(ce("div", {
                        className: "placeholder",
                        innerHTML: '<div class="ph_input"><div class="ph_content">' + r + "</div></div>"
                    }), o),
                    c = d.pbind(o, n),
                    l = browser.mobile ? c : function(e, t) {
                        return setTimeout(c.pbind(e, t), 0)
                    };
                o.phonfocus = function() {
                    o.focused = !0, cur.__focused = o, l(!0, !1)
                }, o.phonblur = function() {
                    cur.__focused = o.focused = !1, l(!1, !0)
                }, o.phshown = !0, (o.value || n.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || geByTag("img", o).length)) && (o.phshown = !1, hide(s)), browser.opera_mobile || (addEvent(s, "focus click contextmenu", function(e) {
                    n.editableFocus ? (setTimeout(n.editableFocus.pbind(o), 0), "contextmenu" === e.type && browser.msie && n.editableFocus(o), o.phonfocus()) : (o.blur(), o.focus())
                }), addEvent(o, "focus" + (n.editable ? " click" : ""), o.phonfocus), addEvent(o, "keydown paste cut input", l)), addEvent(o, "blur", o.phonblur), o.check = l, o.phevents = !0, o.phonsize = function() {}, n.global || n.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                    if (cur.__phinputs)
                        for (var e = 0, t = cur.__phinputs.length; e < t; ++e) removeData(cur.__phinputs[e])
                })), cur.__phinputs.push(o))
            }
        }

        function d(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = e.phshown,
                n = e.phcont,
                i = void 0;
            t.editable ? ((i = void 0 !== e.textContent ? e.textContent : e.innerText) && browser.opera && i.match(/^[ ]+$/) && (i = ""), i || (i = geByTag("img", e).length > 0), i || (i = geByTag("br", e).length > 1), i || (i = geByTag("p", e).length > 1)) : i = e.value, o && i ? (hide(n), e.phshown = !1) : o || i || (show(n), e.phshown = !0)
        }
    }, window._message_box_guid = 0, window._message_boxes = [], window._show_flash_timeout = 0;
    var __bq = window.__bq = window.boxQueue = {
        hideAll: function(e, t) {
            if (e)
                for (; __bq.count();) __bq.hideLast();
            else {
                if (__bq.count()) {
                    var o = _message_boxes[__bq._boxes.pop()];
                    o._in_queue = !1, o._hide(!1, !1, t)
                }
                for (; __bq.count();) {
                    _message_boxes[__bq._boxes.pop()]._in_queue = !1
                }
            }
        },
        hideLast: function(e, t) {
            if (__bq.count()) {
                var o = window._message_boxes[__bq._boxes[__bq.count() - 1]];
                if (!0 === e && (o.changed || __bq.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(__bq.skip = !1);
                o.hide()
            }
            if (t && "click" === t.type) return cancelEvent(t)
        },
        hideBGClick: function(e) {
            e && e.target && /^box_layer/.test(e.target.id) && __bq.hideLast()
        },
        count: function() {
            return __bq._boxes.length
        },
        _show: function(e) {
            var t = _message_boxes[e];
            if (t && !t._in_queue) {
                __bq.count() ? _message_boxes[__bq._boxes[__bq.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                var o = !!__bq.count();
                __bq.curBox = e, t._show(o || __bq.currHiding, o), __bq._boxes.push(e)
            }
        },
        _hide: function(e) {
            var t = _message_boxes[e];
            if (t && t._in_queue && __bq._boxes[__bq.count() - 1] === e && t.isVisible() && (t._in_queue = !1, __bq._boxes.pop(), t._hide(!!__bq.count()), __bq.count())) {
                var o = __bq._boxes[__bq.count() - 1];
                __bq.curBox = o, _message_boxes[o]._show(!0, !0, !0)
            }
        },
        _boxes: [],
        curBox: 0
    };

    function boxRefreshCoords(e) {
        var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
            o = browser.mobile ? intval(window.pageYOffset) : 0,
            n = getSize(e);
        e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
    }

    function __qlClear() {
        clearTimeout(window.__qlTimer), setTimeout(function() {
            return clearTimeout(window.__qlTimer)
        }, 2e3)
    }

    function storePasswordCredential(e) {
        if (browserFeatures.cmaEnabled && window.ResizeObserver) {
            var t = new PasswordCredential({
                id: ge("quick_email").value,
                password: ge("quick_pass").value,
                name: e.name,
                iconURL: e.photo_50
            });
            navigator.credentials.store(t)
        }
    }
    __bq.hideLastCheck = __bq.hideLast.pbind(!0), window.curBox = function() {
        var e = window._message_boxes[__bq.curBox];
        return e && e.isVisible() ? e : null
    }, window.browser.mobile || addEvent(document, "keydown", function(e) {
        if (window._wf = 1, e.keyCode === KEY.ESC && __bq.count() && !cur._noEscHide) return __bq.hideLast(), -1;
        if (e.keyCode === KEY.ESC && window.articleCloseImageFullSize && articleCloseImageFullSize()) return cancelEvent(event);
        if (e.keyCode === KEY.ESC && cur.articleLayer) return cur.articleLayer.close(!0), cancelEvent(event);
        if (e.keyCode === KEY.ESC) return cancelStackPop(), cancelEvent(e);
        var t = [176, 177, 178, 179],
            o = !1;
        window.audioPlayer && (t.push(KEY.LEFT), t.push(KEY.RIGHT)), each(t, function(t, n) {
            if (e.keyCode === n) return o = !0, !1
        }), o && getAudioPlayer().onMediaKeyPressedEvent(e), Chat.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && browser.mac) && Chat.showFriends()
    }), window.boxRefreshCoords = boxRefreshCoords, window.MessageBox = function(_options) {
        var defaults = {
                title: !1,
                titleControls: "",
                width: 450,
                height: "auto",
                animSpeed: 0,
                bodyStyle: "",
                grey: !1,
                selfDestruct: !0,
                progress: !1,
                hideOnBGClick: !1,
                hideButtons: !1,
                onShow: !1,
                onHideAttempt: !1,
                onBeforeHide: !1,
                onHide: !1,
                onClean: !1,
                onDestroy: !1
            },
            options = extend(defaults, _options),
            guid = window._message_box_guid++,
            visible = !1,
            btns = {
                ok: [],
                cancel: []
            },
            boxTitleBck = void 0;
        options.progress || (options.progress = "box_progress" + guid);
        var controlsStyle = options.hideButtons ? ' style="display: none"' : "",
            boxContainer = ce("div", {
                className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
                innerHTML: '\n<div class="box_layout" onclick="__bq.skip=true;">\n<div class="box_title_wrap">\n  <div class="box_x_button" aria-label="' + getLang("global_close") + '" tabindex="0" role="button"></div>\n  <div class="box_title_controls"></div>\n  <div class="box_title"></div>\n</div>\n<div class="box_body" style="' + options.bodyStyle + '"></div>\n<div class="box_controls_wrap" ' + controlsStyle + '><div class="box_controls">\n<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\n<div class="progress" id="' + options.progress + '"></div>\n<div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>\n</div></div>\n</div>"
            }, {
                display: "none"
            });
        hide(boxContainer);
        var boxLayout = domFC(boxContainer),
            boxTitleWrap = domFC(boxLayout),
            boxCloseButton = domFC(boxTitleWrap),
            boxTitle = domLC(boxTitleWrap),
            boxTitleControls = domNS(boxCloseButton);
        options.noCloseButton && hide(boxCloseButton);
        var boxBody = domNS(boxTitleWrap),
            boxControlsWrap = domNS(boxBody),
            boxControls = domFC(boxControlsWrap),
            boxButtons = domFC(boxControls),
            boxProgress = domNS(boxButtons),
            boxControlsText = domNS(boxProgress);
        boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), boxRefreshCoords(boxContainer);
        var emitter = new EventEmitter;

        function refreshBox() {
            boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, removeClass(boxBody, "box_no_title"), show(boxTitleWrap)) : (addClass(boxBody, "box_no_title"), hide(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), toggleClass(boxBody, "box_no_buttons", options.hideButtons), toggleClass(boxTitleWrap, "box_grey", options.grey), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
        }

        function _addButton(e, t, o, n) {
            var i = "flat_button";
            "no" === o || "gray" === o ? (i += " secondary", o = "cancel") : o = "ok";
            var r = ce("button", {
                className: i,
                innerHTML: e,
                id: n
            });
            return boxButtons.rows[0].insertCell(0).appendChild(r), Object(_lib_ui__WEBPACK_IMPORTED_MODULE_31__.createButton)(r, function() {
                emitter.emit(o, retBox), t.apply(null, arguments)
            }), btns[o].push(r), r
        }

        function setControlsText(e) {
            boxControlsText.innerHTML = e
        }

        function _removeButtons() {
            for (var e = boxButtons.rows[0]; e.cells.length;) cleanElems(e.cells[0]), e.deleteCell(0);
            btns.ok.length = btns.cancel.length = 0
        }
        var destroyMe = function() {
                isFunction(options.onClean) && options.onClean(), isFunction(options.onDestroy) && options.onDestroy(), _removeButtons(), cleanElems(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete window._message_boxes[guid]
            },
            hideMe = function(e, t, o) {
                if (visible) {
                    visible = !1;
                    var n = !0 === e ? 0 : options.animSpeed;
                    options.hideOnBGClick && removeEvent(document, "click", __bq.hideBGClick), isFunction(options.onBeforeHide) && options.onBeforeHide(), _layerAnim && !e && layers.boxhide();
                    var i = function() {
                        __bq.currHiding === _message_boxes[guid] && (__bq.currHiding = !1), _layerAnim || _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : hide(boxContainer), isFunction(options.onHide) && options.onHide(o)
                    };
                    n > 0 ? (__bq.currHiding = _message_boxes[guid], fadeOut(boxContainer, n, i)) : i()
                }
            };

        function showMe(e, t, o) {
            if (!visible && window._message_boxes[guid]) {
                visible = !0;
                var n = !0 === e || t ? 0 : options.animSpeed;
                if (options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), t || layers.boxshow(), __bq.currHiding) {
                    __bq.currHiding.shOther = !0;
                    var i = __bq.currHiding.bodyNode.parentNode.parentNode;
                    data(i, "tween").stop(!0)
                }
                n > 0 ? fadeIn(boxContainer, n) : show(boxContainer), boxRefreshCoords(boxContainer), options.onShow && options.onShow(o)
            }
        }
        addEvent(boxCloseButton, "click", __bq.hideLast);
        var retBox = window._message_boxes[guid] = {
            guid: guid,
            _show: showMe,
            _hide: hideMe,
            bodyNode: boxBody,
            controlsTextNode: boxControlsText,
            titleWrap: boxTitleWrap,
            btns: btns,
            show: function() {
                return __bq._show(guid), this
            },
            progress: boxProgress,
            showCloseProgress: addClass.pbind(boxTitleWrap, "box_loading"),
            hideCloseProgress: removeClass.pbind(boxTitleWrap, "box_loading"),
            showProgress: function() {
                hide(boxControlsText), show(boxProgress)
            },
            hideProgress: function() {
                hide(boxProgress), show(boxControlsText)
            },
            hide: function(e) {
                return !(isFunction(options.onHideAttempt) && !options.onHideAttempt(e)) && (__bq._hide(guid), !0)
            },
            isVisible: function() {
                return visible
            },
            bodyHeight: function() {
                return getStyle(boxBody, "height")
            },
            content: function(e) {
                return options.onClean && options.onClean(), boxBody.innerHTML = e, boxRefreshCoords(boxContainer), boxContainer.focus(), refreshBox(), updateAriaElements(), this
            },
            emit: function(e, t) {
                emitter.emit(e, t)
            },
            addButton: function(e, t, o, n, i) {
                var r = _addButton(e, t || this.hide, o, i);
                return n ? r : this
            },
            setButtons: function(e, t, o, n) {
                var i = this.removeButtons();
                return e ? (i.addButton(e, t), o && i.addButton(o, n, "no"), i) : i.addButton(getLang("box_close"))
            },
            setControlsText: setControlsText,
            removeButtons: function() {
                return _removeButtons(), this
            },
            setBackTitle: function(e) {
                e ? (boxTitle.innerHTML = '<div class="back">' + getLang("global_box_title_back") + "</div>", geByClass1("back", boxTitle).onclick = e, boxTitleBck = options.title, options.title = boxTitle.innerHTML) : boxTitleBck && (boxTitle.innerHTML = options.title = boxTitleBck, boxTitleBck = !1)
            },
            destroy: destroyMe,
            getOptions: function() {
                return options
            },
            on: function(e, t) {
                emitter.on(e, t)
            },
            once: function(e, t) {
                emitter.once(e, t)
            },
            updateBoxCoords: function() {
                boxRefreshCoords(boxContainer)
            },
            setOptions: function(e) {
                if (options.hideOnBGClick && removeEvent(document, "click", __bq.hideBGClick), options = extend(options, e), "bodyStyle" in e)
                    for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; o < n; o++) {
                        var i = t[o].split(":");
                        i.length > 1 && i[0].length && (boxBody.style[trim(i[0])] = trim(i[1]), boxBody.style.setProperty && boxBody.style.setProperty(trim(i[0]), trim(i[1]), ""))
                    }
                return options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), toggle(boxControlsWrap, !options.hideButtons), refreshBox(), options.noRefreshCoords || boxRefreshCoords(boxContainer), this
            },
            evalBox: function evalBox(js, url, params) {
                var scr = "((function() { return function() { var box = this; " + (js || "") + ";}; })())";
                if (__debugMode) {
                    var fn = eval(scr);
                    fn.apply(this, [url, params])
                } else try {
                    var _fn = eval(scr);
                    _fn.apply(this, [url, params])
                } catch (e) {
                    topError(e, {
                        dt: 15,
                        type: 7,
                        url: url,
                        query: params ? ajx2q(params) : void 0,
                        js: js
                    })
                }
            }
        };
        return retBox
    }, window.showBox = function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = arguments[3];
        if (checkEvent(n)) return !1;
        var i = o.params || {};
        o.containerClass && (i.containerClass = o.containerClass);
        var r = new MessageBox(i),
            a = {
                onDone: function(n, a, s, c) {
                    if (o.preOnDone && o.onDone && o.onDone(r), r.isVisible())
                        if (__debugMode) l();
                        else try {
                            l()
                        } catch (o) {
                            topError(o, {
                                dt: 15,
                                type: 103,
                                url: e,
                                query: ajx2q(t),
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            }), r.isVisible() && r.hide()
                        } else o.onDone && o.onDone(r, c);

                    function l() {
                        show(boxLayerBG), addClass(bodyNode, "layers_shown"), r.setOptions({
                            title: n,
                            hideButtons: i.hideButtons || !1
                        }), o.showProgress ? r.show() : show(r.bodyNode), r.content(a), r.evalBox(s, e, t), o.onDone && o.onDone(r, c)
                    }
                },
                onFail: function(e) {
                    if (r.failed = !0, setTimeout(r.hide, 0), isFunction(o.onFail)) return o.onFail(e)
                },
                cache: o.cache,
                stat: o.stat,
                fromBox: !0
            };
        return o.prgEl && (o.showProgress = showGlobalPrg.pbind(o.prgEl, {
            cls: o.prgClass,
            w: o.prgW,
            h: o.prgH,
            hide: !0
        }), o.hideProgress = hide.pbind("global_prg")), o.showProgress ? extend(a, {
            showProgress: o.showProgress,
            hideProgress: o.hideProgress
        }) : (r.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), __bq.count() < 2 && (hide(boxLayerBG), removeClass(bodyNode, "layers_shown")), hide(r.bodyNode), a.showProgress = function() {
            show(boxLoader), boxRefreshCoords(boxLoader)
        }, a.hideProgress = hide.pbind(boxLoader)), r.removeButtons().addButton(getLang("global_close")), ajax.post(e, t, a), r
    }, window.showTabbedBox = function(e, t, o, n) {
        return (o = o || {}).stat = o.stat || [], o.stat.push("box.js", "boxes.css"), showBox(e, t, o, n)
    }, window.showFastBox = function(e, t, o, n, i, r) {
        return new MessageBox("string" == typeof e ? {
            title: e
        } : e).content(t).setButtons(o, n, i, r).show()
    }, window.showCaptchaBox = function(e, t, o, n) {
        var i = function(t) {
                if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                    var i = geByTag1("input", o.bodyNode);
                    if (trim(i.value) || !0 === t) {
                        var r = geByTag1("img", o.bodyNode)[0];
                        removeEvent(i), removeEvent(r), show(geByClass1("progress", o.bodyNode)), hide(i), n.onSubmit(e, i.value)
                    } else elfocus(i)
                }
            },
            r = !!o,
            a = intval(t) ? "" : "&s=1",
            s = n.imgSrc || "/captcha.php?sid=" + e + a;
        if (!r) {
            var c = '\n<div class="captcha">\n  <div><img src="' + s + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + getLang("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("captcha_enter_code"),
                width: 305,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, c, getLang("captcha_send"), function() {
                o.submit()
            }, getLang("captcha_cancel"), function() {
                var e = geByTag1("input", o.bodyNode),
                    t = geByTag1("img", o.bodyNode);
                removeEvent(e), removeEvent(t), o.hide()
            })
        }
        o.submit = i.pbind(!0), o.changed = !0;
        var l = geByTag1("input", o.bodyNode),
            d = geByTag1("img", o.bodyNode);
        return r && (l.value = "", d.src = "/captcha.php?sid=" + e + a, hide(geByClass1("progress", o.bodyNode))), show(l), addEvent(l, "keypress", i), addEvent(d, "click", function() {
            this.src = "/captcha.php?sid=" + e + a + "&v=" + irand(1e6, 2e6)
        }), elfocus(l), o
    }, window.showReCaptchaBox = function(e, t, o, n) {
        window.recaptchaResponse = function(e) {
            n.onSubmit(e)
        };
        var i = !!o,
            r = !!window.grecaptcha;
        if (!i) {
            r || (window.recaptchaCallback = function() {
                var t = curBox();
                if (t) {
                    var o = geByClass1("recaptcha", t.bodyNode);
                    o && (val(o, ""), window.grecaptcha.render(o, {
                        sitekey: e,
                        callback: window.recaptchaResponse
                    }))
                }
            }, headNode.appendChild(ce("script", {
                type: "text/javascript",
                src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
            })));
            var a = '<div class="recaptcha"></div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("global_recaptcha_title"),
                width: 354,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, a, getLang("captcha_cancel"));
            var s = geByClass1("recaptcha", o.bodyNode);
            s.id = "recaptcha" + (o.guid ? o.guid : "0"), showProgress(s)
        }
        return i && r ? window.grecaptcha.reset() : r && window.recaptchaCallback(), o.changed = !0, o
    }, window.checkTextLength = function(e, t, o, n, i, r, a) {
        var s = t.getValue ? t.getValue() : t.value,
            c = t.lastLen || 0;
        if (t.lastLen !== s.length || r) {
            t.lastLen = s.length;
            var l = {
                    "&": 5,
                    "<": 4,
                    ">": 4,
                    '"': 6,
                    "\n": n ? 1 : 4,
                    "\r": 0,
                    "!": 5,
                    "'": 5,
                    $: 6,
                    "\\": 6
                },
                d = {
                    1168: 1,
                    1169: 1,
                    8211: 1,
                    8212: 1,
                    8216: 1,
                    8217: 1,
                    8218: 1,
                    8230: 1,
                    8240: 1,
                    8249: 1,
                    8250: 1,
                    8364: 1,
                    8470: 1,
                    8482: 1,
                    65533: 1
                },
                u = {
                    1037: 1,
                    1104: 1,
                    1117: 1
                };
            i && (l[","] = 5);
            var _ = function(e, t) {
                for (var o = 0, n = 0, i = e.length; n < i; n++) {
                    var r = l[e.charAt(n)],
                        s = e.charCodeAt(n);
                    o += void 0 !== r ? r : !a && s >= 128 && (s < 1025 || u[s] || s > 1119) && !d[s] && (s < 8220 || s > 8222) && (s < 8224 || s > 8226) ? ("&#" + s + ";").length : 1
                }
                return o
            }(s);
            if (o = ge(o), _ > Math.max(e - 100, .75 * e))
                if (show(o), _ > e)
                    if (i) {
                        var p = val(t, function(e, t) {
                            for (var o = 0, n = "", i = 0, r = e.length; i < r; i++) {
                                var s = e.charAt(i),
                                    c = l[s],
                                    _ = e.charCodeAt(i);
                                if ((o += void 0 !== c ? c : !a && _ >= 128 && (_ < 1025 || u[_] || _ > 1119) && !d[_] && (_ < 8220 || _ > 8222) && (_ < 8224 || _ > 8226) ? ("&#" + _ + ";").length : 1) > t) break;
                                n += s
                            }
                            return n
                        }(s, Math.min(e, c)));
                        t.lastLen = p.length, o.innerHTML = getLang("text_N_symbols_remain", 0)
                    } else o.innerHTML = getLang("text_exceeds_symbol_limit", _ - e);
            else o.innerHTML = getLang("text_N_symbols_remain", e - _);
            else hide(o)
        }
    }, window.autosizeSetup = function(e, t) {
        if (e = ge(e))
            if (e.autosize) e.autosize.update();
            else {
                t.minHeight = intval(t.minHeight) || intval(getStyle(e, "height")), t.maxHeight = intval(t.maxHeight);
                var o = getSize(e)[0] || intval(getStyle(e, "width")),
                    n = getStyle(e, "fontSize"),
                    i = getStyle(e, "lineHeight");
                o < 1 && (o = intval(getStyle(e, "width", !1))), n.indexOf("em") > 0 && (n = floatval(n) * vk.fs), n = intval(n);
                var r = {
                    width: o,
                    height: 10,
                    fontFamily: getStyle(e, "fontFamily"),
                    fontSize: n + "px",
                    lineHeight: i,
                    boxSizing: getStyle(e, "boxSizing")
                };
                each(["Top", "Bottom", "Left", "Right"], function() {
                    r["padding" + this] = getStyle(e, "padding" + this)
                }), e.autosize = {
                    options: t,
                    helper: ce("textarea", {
                        className: "ashelper"
                    }, r),
                    handleEvent: function(t, o) {
                        var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                        if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 === o.keyCode || 13 === o.keyCode ? n = "\n" : !browser.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                        if (!browser.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                        var i = document.selection.createRange();
                        return i.text && (t = t.replace(i.text, "")), t + n
                    },
                    update: function(t) {
                        var o = e.value;
                        !t || "blur" === t.type || "keyup" === t.type || browser.msie && "keypress" !== t.type || t.ctrlKey || t.altKey || t.metaKey || (o = e.autosize.handleEvent(o, t)), o || (o = " "), e.autosize.helper.value !== o && (e.autosize.helper.value = o);
                        var n = e.autosize.options,
                            r = getSize(e, !0)[1],
                            a = e.autosize.helper.scrollHeight,
                            s = a % i;
                        n.exact && s > 2 && (a -= s - 2), a < n.minHeight && (a = n.minHeight);
                        var c = {
                                overflow: "hidden"
                            },
                            l = getStyle(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                        n.maxHeight && a > n.maxHeight && (a = n.maxHeight, extend(c, {
                            overflow: "auto",
                            overflowX: "hidden"
                        })), n.addHeight && (a += n.addHeight), r === a && l === c.overflow || (c.height = a, setStyle(e, c), isFunction(n.onResize) && n.onResize(a))
                    }
                }, t.exact && ("normal" === i && (i = "120%"), i.indexOf("%") > 0 && (i = n * intval(i) / 100)), utilsNode.appendChild(e.autosize.helper), browser.opera_mobile ? (setStyle(e, {
                    overflow: "hidden"
                }), e.autosize.update(), addEvent(e, "blur", e.autosize.update)) : (addEvent(e, "keydown keyup keypress change", e.autosize.update), setTimeout(function() {
                    setStyle(e, {
                        overflow: "hidden",
                        resize: "none"
                    }), e.autosize.update();
                    var t = val(e);
                    val(e, " ", !0), val(e, t, !0)
                }, 0))
            }
    }, window.goAway = function(e, t, o) {
        if (-1 !== (t || {}).h || checkEvent(o)) return !0;
        if (-1 !== (t || {}).h) {
            var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
            if (n && "api." !== n[1].toLowerCase()) return location.href = e, !1;
            var i = intval(getCookie("remixsettings_bits"));
            if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_lib_ajax__WEBPACK_IMPORTED_MODULE_15__.locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
        }
        var r = extend({
            act: "a_go",
            to: e
        }, t || {});
        return !showBox("away.php", r, {}, o)
    }, window.showAudioClaimWarning = function(e, t, o) {
        var n = e.id,
            i = e.ownerId,
            r = e.title,
            a = t.id,
            s = t.reason,
            c = t.original,
            l = {
                width: 470
            },
            d = void 0,
            u = void 0;
        "geo" === s ? (d = getLang("audio_claimed_geo"), u = getLang("audio_claim_warning_title")) : "site_rules_violation" == s ? (d = getLang("audio_site_rules_violation_warning"), u = getLang("audio_site_rules_violation_header")) : "replace" === s ? (d = getLang("audio_claimed_replacement_available"), u = getLang("audio_claim_warning_title")) : "subscription" === s ? (l.hideButtons = !0, l.bodyStyle = "padding: 0; border-radius: 4px;", l.width = 450, u = !1, d = '\n      <div class="audio_claim_popup">\n        <div class="audio_claim_popup__title">' + getLang("global_audio_only_with_subscription_title") + '</div>\n        <div class="audio_claim_popup__text">' + getLang("global_audio_only_with_subscription_text") + '</div>\n        <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>\n        <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + getLang("global_audio_only_with_subscription_btn") + "</button>\n      </div>") : (d = getLang("audio_claim_warning"), u = getLang("audio_claim_warning_title")), l.title = u;
        var _ = [l, d = (d = (d = d.replace(/\{audio\}/g, "<b>" + r + "</b>")).replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + a + "&content=audio" + i + "_" + n + '">' + getLang("audio_claim_objection") + "</a>")).replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + getLang("audio_claim_delete") + "</a>")],
            p = null;
        if (o && c) {
            var f = AudioUtils.drawAudio(c, "no_extra");
            _[1] = d.replace(/\{original\}/g, c[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + c[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + f, _.push(getLang("audio_replace_with_original"), function() {
                lockButton(p.btns.ok[0]), o(function() {
                    return p.hide()
                })
            }), l.textControls = '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + getLang("audio_claim_delete_capital") + "</a>"
        }
        cur.claimWarning = p = showFastBox.apply(null, _)
    }, window.sureDeleteAll = function(title, text, where, objectId, toId, fromId, hash, event) {
        if (!checkEvent(event)) {
            var box = showFastBox({
                title: title
            }, text, getLang("global_delete"), function(btn) {
                ajax.post("/delete_all.php", {
                    act: where,
                    object_id: objectId,
                    to_id: toId,
                    from_id: fromId,
                    hash: hash,
                    loc: nav.objLoc[0]
                }, {
                    onDone: function onDone(res) {
                        eval(res), box.hide()
                    },
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn)
                })
            }, getLang("global_cancel"));
            return !1
        }
    }, window.__qlTimer = null, window.__qlClear = __qlClear, window.onLoginDone = function(e, t) {
        __qlClear(), storePasswordCredential(t), nav.reload({
            force: !0,
            from: 6
        })
    }, window.onLogout = function() {
        if (__qlClear(), audioPlayer && audioPlayer.stop(), window.Notifier && Notifier.standby(), window.FastChat && FastChat.standby(), window.Page && Page.postsClear(), ls.checkVersion()) try {
            window.localStorage.clear()
        } catch (e) {}
        nav.reload({
            from: 5
        })
    }, window.onLoginFailed = function(e, t) {
        switch (__qlClear(), e) {
            case -1:
                location.href = location.href.replace(/^http:/, "https:");
                break;
            case 4:
                location.href = "/login?m=1" + (t.expire ? "&s=0" : "") + "&email=" + t.email;
                break;
            default:
                location.href = "/login"
        }
    }, window.onLoginCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = showCaptchaBox(e, t, window.qloginBox, {
            onSubmit: function(e, t) {
                ge("quick_captcha_sid").value = e, ge("quick_captcha_key").value = t, ge("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }, window.onLoginReCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = showReCaptchaBox(e, t, window.qloginBox, {
            onSubmit: function(e) {
                ge("quick_recaptcha").value = e, ge("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }, window.storePasswordCredential = storePasswordCredential;
    var CallHub = function() {
        function e(t, o) {
            _classCallCheck(this, e), this.count = o || 1, this.func = t
        }
        return e.prototype.done = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.count -= e, this.count <= 0 && this.func()
        }, e
    }();

    function showWriteMessageBox(e, t) {
        cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
        var o = showBox("al_im.php", {
            act: "a_write_box",
            to: t
        }, {
            stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", jsc("web/emoji.js"), "notifier.css"],
            cache: 1
        }, e);
        return o && cancelEvent(e), window.WriteBox && WriteBox.extractEmoji(), !o
    }

    function moneyTransferBox(e, t, o, n, i, r, a) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (i) {
            if (!a) {
                var s = void 0,
                    c = void 0;
                return 2 === i ? (s = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || getLang("mail_money_transfer_cancel_confirm"), c = cur.lang && cur.lang.mail_money_transfer_cancel_btn || getLang("mail_money_transfer_cancel_btn")) : (s = cur.lang && cur.lang.mail_money_transfer_decline_confirm || getLang("news_fb_money_transfer_decline_confirm"), c = cur.lang && cur.lang.mail_money_transfer_decline_btn || getLang("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = showFastBox(getLang("global_action_confirmation"), s, c, moneyTransferBox.pbind(e, t, o, n, i, !1, 1), getLang("global_cancel")))
            }
            var l = hasClass(domPN(n), "wall_postlink_preview_btn"),
                d = geByClass1("flat_button", domPN(n));
            return 2 !== a && (disableButton(d, !0), l ? (addClass(n.firstChild, "round_spinner"), removeClass(n.firstChild, "button")) : lockButton(n), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                tx_id: e,
                hash: t,
                from: l ? "snippet" : ""
            }, {
                onDone: function(r, a, s) {
                    0 !== r ? (l ? (re(n), hasClass(d, "secondary") || domReplaceEl(d, s)) : re(domPN(n)), showDoneBox(a), window.TopNotifier.invalidate()) : setTimeout(moneyTransferBox.pbind(e, t, o, n, i, !1, 2), 2e3)
                },
                onFail: function(e) {
                    return disableButton(d, !1), l ? (addClass(n.firstChild, "button"), removeClass(n.firstChild, "round_spinner")) : unlockButton(n), setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                }
            })
        }
        var u = void 0;
        return u = r ? {
            act: "money_transfer_box",
            request_id: e,
            request: r,
            hash: t
        } : {
            act: "accept_money_transfer_box",
            tx_id: e,
            hash: t
        }, cur.acceptMoneyBtn = n, !showBox("al_payments.php", u, {
            stat: ["payments.css", "payments.js"],
            onFail: function(e) {
                return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
            }
        }, o)
    }
    window.callHub = window.CallHub = CallHub, window.showWriteMessageBox = showWriteMessageBox, window.giftsBox = function(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : !showBox("al_gifts.php", {
            act: "box",
            tab: o || "received",
            mid: e
        }, {
            cache: 1,
            stat: ["gifts.css", "gifts.js"]
        }, t)
    }, window.moneyTransferBox = moneyTransferBox, window.gSearch = new _lib_global_search__WEBPACK_IMPORTED_MODULE_35__.default;
    var _cleanHide = function(e) {
        e.temphide && (removeEvent(e, "mouseout", e.temphide), removeAttr(e, "temphide"), removeAttr(e, "showing"))
    };

    function articleNav(e, t, o, n) {
        var i = e,
            r = /^(?:%40|@)[.a-z0-9_-]+(?:\?rev=[0-9a-z_]+)?$/;
        if (i.toLowerCase().match(r)) return cur.articleLayer || (cur.articlePrevLoc = t), window.WkView && WkView.hide(!0), window.__bq && __bq.hideAll(), stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            var e = cur.articleLayer;
            e && e.setFaded(), cur.articleLayer = new ArticleLayer({
                url: i
            }, !1, n), cur.articleLayer.show(function() {
                e && e.close()
            }, !e), cur.articleSequence = (cur.articleSequence || 0) + (o ? -1 : 1)
        }), !0;
        if (cur.articleLayer && cur.articleLayer.isShown()) {
            var a = function() {
                    cur.articleLayer && cur.articleLayer.close(), delete cur.articleLayer, delete cur.articleSequence
                },
                s = cur.articlePrevLoc;
            return delete cur.articlePrevLoc, s && !r.test(s) ? e === s ? (a(), !0) : (layers.fullhide = function() {
                a()
            }, !1) : (a(), !0)
        }
        return !1
    }

    function zNav(e, t, o) {
        var n = e.z,
            i = e.f,
            r = e.w,
            a = (n || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
        if (delete e.z, delete e.f, delete e.w, t || (t = {}), isEmpty(e)) {
            if (i && (handleScroll(i), void 0 === n)) return !1;
            if (t.hist)
                if (n || r) {
                    if (layerQueue.back("wiki", r, (a || {})[1], (a || {})[2])) return !1
                } else if (!1 === n && o.w && layerQueue.back("wiki", o.w)) return !1;
            if (r) {
                if (!1 === n) layers.fullhide(!!t.hist && 2);
                else {
                    if (r.match(/^story([0-9\-]+)_(\d+)/)) return Object(_lib_stories__WEBPACK_IMPORTED_MODULE_34__.showStory)(r);
                    o || (o = clone(nav.objLoc)), r && (o.w = r), i && (o.f = i), delete o.z, nav.setLoc(o)
                }
                return showWiki({
                    w: r
                }, "note_new" === r, !1, {
                    onLoaded: n && zNav.pbind({
                        z: n
                    }, extend(t, {
                        queue: 1
                    })),
                    isZnav: 1
                }), !1
            }
            if ("giftbox" === n) return !showBox("/al_gifts.php", {
                act: "get_gift_box",
                mid: t.id || 0,
                fr: t.is && t.id !== vk.id ? 0 : 1,
                link: nav.objLoc[0]
            }, {
                stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                cache: 1
            }, window.event);
            if ("validatebox" === n) return !Object(_lib_ajax__WEBPACK_IMPORTED_MODULE_15__.validateMobileBox)({
                closeLink: 1,
                onDone: function() {
                    return ge("change_phone_wrap").parentNode.removeChild(ge("change_phone_wrap"))
                }
            });
            if ("upload_video" === n) return VideoUpload.showBox();
            if (!1 === n || !1 === r) {
                var s = !window.wkcur || !wkcur.shown || layers.fullhide !== WkView.hide;
                !layers.fullhide || !s && !1 !== r || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(!!t.hist && 2));
                var c = curBox();
                return c && c.wkRaw && c.hide(), !1
            }
            if (n && a) {
                var l = function() {
                    return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                };
                switch (a[1]) {
                    case "photo":
                        return showPhoto(a[2], a[3], extend(t, {
                            onFail: l,
                            noHistory: !0
                        })), !1;
                    case "albums":
                        return showAlbums(a[2], extend(t, {
                            onFail: l,
                            noHistory: !0
                        })), !1;
                    case "album":
                        return showAlbum(a[2], extend(t, {
                            onFail: l,
                            noHistory: !0
                        })), !1;
                    case "tag":
                    case "photo_tag":
                        return showPhotoTags(a[2], extend(t, {
                            onFail: l,
                            noHistory: !0
                        })), !1;
                    case "video":
                        var d = a[3],
                            u = extend(t, {
                                onFail: l,
                                noLocChange: 1,
                                focusPlay: 1
                            });
                        if (d) {
                            var _ = [],
                                p = "";
                            if (each(d.split("/"), function(e, t) {
                                    0 === t.indexOf("pl_") ? p = t : _.push(t)
                                }), d = _.join("/"), p) {
                                p = p.substr("pl_".length);
                                var f = cur.currentModule ? cur.currentModule() : cur.module;
                                u = extend(u, {
                                    playlistId: p,
                                    module: f,
                                    addParams: {
                                        force_no_repeat: 1,
                                        show_next: 1,
                                        playlist_id: p
                                    }
                                })
                            }
                        }
                        return showVideo(a[2], d, u), !1;
                    case "single":
                        return void 0 === r && stManager.add(["single_pv.css", "single_pv.js"], ge(n).onclick), !1;
                    case "accept_money":
                        return moneyTransferBox(a[2], a[3]), !1;
                    case "audio_playlist":
                        var h = a[2].split("_"),
                            w = _slicedToArray(h, 2),
                            v = w[0],
                            g = w[1];
                        return AudioUtils.showAudioPlaylist(v, g, a[3], void 0, void 0, t.onDone), !1;
                    case "article_edit":
                        return openArticleEditor.apply(null, a[2].split("_")), !1
                }
            }
        }
    }

    function handleScroll(e) {
        e = e.split(",");
        var t = cur.named || {},
            o = e[0] && (t[e[0]] || ge(e[0])) || !1,
            n = e[1] && (t[e[1]] || ge(e[1])) || !1;
        if (!o && !n) {
            if (!(o = document.getElementsByName(e[0])[0])) return;
            o = o.nextSibling
        }
        var i = ge("page_header_wrap") || ge("dev_top_nav_wrap");
        setTimeout(function() {
            o && scrollToY(getXY(o)[1] - (i ? getSize(i)[1] : 0), 0), n && elfocus(n)
        }, 300)
    }

    function showGlobalPrg(e, t) {
        var o = getXY(e),
            n = getSize(e),
            i = t || {},
            r = i.w,
            a = void 0 === r ? 32 : r,
            s = i.h,
            c = void 0 === s ? 13 : s,
            l = ge("global_prg");
        l.className = i.cls || "progress", setStyle(l, {
            left: o[0] + Math.floor((n[0] - a) / 2) + intval(i.shift ? i.shift[0] : 0),
            top: o[1] + Math.floor((n[1] - c) / 2) + intval(i.shift ? i.shift[1] : 0),
            width: a,
            height: c,
            display: "block",
            "z-index": i.zIndex ? i.zIndex : null
        }), i.hide && (e.style.visibility = "hidden")
    }

    function showPhoto(e, t, o, n) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!(checkEvent(n) || cur._editMode && cur._editMode(n))) {
            var i = ["photoview.js", "photoview.css", "page.js", "page.css"];
            if (o.img && (o.showProgress = function() {
                    showProgress(o.img)
                }, o.hideProgress = function() {
                    hideProgress(o.img)
                }), !e) return !1;
            if (window.Photoview && !1 === Photoview.showPhoto(e, t, o)) return !1;
            var r = !0;
            o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(i, function() {
                extend(cur, {
                    pvCancelLoad: function() {
                        r = !1
                    },
                    pvData: cur.pvData || {},
                    pvOptions: cur.pvOptions || {}
                }), cur.pvData.temp = [o.temp], cur.pvOptions.temp_final = o.temp_final, cur.pvOptions.temp_summary = o.temp_summary, cur.pvOptions.queue = o.queue, Photoview.show("temp", 0)
            });
            var a = 1;
            return o && o.additional && o.additional.open_pe && (a = 0), extend(o, {
                onDone: function(n) {
                    Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), r && ("deleted" === n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                },
                stat: i,
                cache: a
            }), o.temp_final ? !1 : (ajax.post("al_photos.php", extend({
                act: "show",
                gid: cur.gid,
                photo: e,
                list: t,
                module: cur.module || "",
                list_info: o.list_info || null
            }, o.additional), o), !1)
        }
    }

    function showAlbums(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbums(e, t)
        }), !1)
    }

    function showAlbum(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbum(e, t)
        }), !1)
    }

    function showPhotoTags(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showTagged(e, t)
        }), !1)
    }
    window.showTooltip = function(e, t) {
        (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
            e.showing = !1
        }, addEvent(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" !== e.tt && (e.tt || (e.tt = "loadingstat"), domClosest("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
            "loadingstat" === e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (_cleanHide(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
        })))
    }, window.showTitle = function(e, t, o, n) {
        e = ge(e);
        o || (o = [Math.round(20 - getSize(e)[0] / 2), 8]);
        showTooltip(e, extend({
            text: function() {
                return t || e.getAttribute("data-title")
            },
            shift: o,
            black: 1
        }, n || {}))
    }, window.showHint = function(e, t) {
        e = ge(e), t = t || {};
        showTooltip(e, extend({
            text: function() {
                return e.getAttribute("data-title")
            },
            dir: "auto",
            width: 300,
            shift: [22, 8]
        }, t))
    }, window.reportAd = function(e) {
        showBox("/reports.php?act=a_report_ad_box", {
            ad_id: e
        }, {
            params: {
                width: 370
            },
            stat: ["ui_controls.js", "ui_controls.css"]
        })
    }, window.updateMoney = function(e, t) {
        if (void 0 !== e && !1 !== e) {
            var o = "";
            !0 === t ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
            var n = geByClass("votes_balance_nom" + o);
            each(n, function(t, o) {
                return o.innerHTML = e + " " + getLang("votes_flex", e)
            });
            var i = e * (vk.vcost || 7),
                r = geByClass("money_balance_nom" + o);
            each(r, function(e, t) {
                return t.innerHTML = getLang("global_money_amount_rub", i, !0)
            }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
        }
    }, window.articleNav = articleNav, window.articlePrepare = function(e) {
        e && !vk.isBanned && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            window.ArticleLayer.prepare(e)
        })
    }, window.zNav = zNav, window.handleScroll = handleScroll, window.showGlobalPrg = showGlobalPrg, window.showManyPhoto = function(e, t, o, n) {
        Page.showManyPhoto(e, t, o, n)
    }, window.showPhoto = showPhoto, window.showAlbums = showAlbums, window.showAlbum = showAlbum, window.showPhotoTags = showPhotoTags, window.showVideoTags = function(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
            Photoview.showVideoTags(e, t)
        }), !1)
    }, window.showWiki = function(e, t, o) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (checkEvent(o)) return !0;
        if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw === e.w && e.w && !e.reply) return WkView.restoreLayer(n), cancelEvent(o);
        (window.wkcur && wkcur.hideTitle || e.hide_title) && (n.hide_title = e.hide_title = 1);
        var i = n.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
        t && i.push("wk_editor.js", "wk_editor.css");
        var r = {
            stat: i,
            loader: !n.noloader,
            onDone: function(e, t, i, r) {
                WkView.show(e, t, extend(i, n), r, o)
            },
            onFail: function(e) {
                return WkView.showError(e)
            }
        };
        if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" === e.w.substr(-6)) {
            var a = clone(nav.objLoc);
            delete a[0], delete a.w, e.query = JSON.stringify(a)
        }
        n.preload && extend(r, n.preload);
        var s = void 0,
            c = void 0;
        return n.ads_params && (s = n.ads_params, (c = nav.getPostParams(o && o.target)).post_click_url && (s._post_click_url = c.post_click_url)), ajax.post("wkview.php", extend({
            act: "show",
            loc: nav.objLoc[0],
            is_znav: n.isZnav
        }, e, s, cur.getWkviewOpts && cur.getWkviewOpts()), r), cancelEvent(o)
    }, window.videoCallback = function(e) {
        var t = e.shift();
        if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
        throw Error("Unregistered player callback: " + t)
    }, window.showApp = function(e, t, o, n, i, r) {
        r || (r = {});
        var a = !1,
            s = extend({
                w: "app" + t
            }, r);
        if (o = intval(o), n && (isObject(n) ? s = extend(s, n) : s.ref = n), r.layer && (a = !0), (cur.apps && cur.apps[t] || !o) && !a) {
            delete s.w;
            var c = "app" + t + (i ? "_" + i : ""),
                l = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === c;
            return nav.go("/" + c + nav.toStr(s), e, {
                nocur: l
            })
        }
        i && (s.mid = i);
        var d = {
            stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
        };
        return r.queue && (d.queue = 1), r.urlHash && (s.url_hash = r.urlHash), showWiki(s, !1, e, d)
    }, window.showDoneBox = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = (t.w || 380) + 20,
            n = t.w ? ' style="width: ' + t.w + 'px;"' : "",
            i = bodyNode.offsetWidth,
            r = ce("div", {
                className: "top_result_baloon_wrap fixed " + (t.className || ""),
                innerHTML: '<div class="top_result_baloon"' + n + ">" + e + "</div>"
            }, {
                left: (i - o) / 2
            });
        bodyNode.insertBefore(r, pageNode);
        var a = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
            s = browser.mobile ? intval(window.pageYOffset) : 0,
            c = getSize(r);
        r.style.top = Math.max(10, s + (a - c[1]) / 3) + "px";
        var l = t.out || 2e3,
            d = new Date,
            u = function e() {
                l < 0 || (window.doneBoxTO = setTimeout(function() {
                    !t.permit || t.permit() ? fadeOut(r.firstChild, 500, function() {
                        re(r), t.callback && t.callback()
                    }) : e()
                }, l))
            };
        addEvent(r, "mouseenter", function() {
            clearTimeout(window.doneBoxTO), l -= new Date - d
        }), addEvent(r, "mouseleave", function() {
            d = new Date, u()
        }), u()
    }, window.animateCount = function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (e = ge(e), t = o.str ? trim(t.toString()) || "" : positive(t), e)
            if (!browser.mobile || browser.safari_mobile || browser.android) {
                var n = data(e, "curCount"),
                    i = data(e, "nextCount");
                if ("number" == typeof i || o.str && "string" == typeof i) t != i && data(e, "nextCount", t);
                else if ("number" == typeof n || o.str && "string" == typeof n) t !== n && data(e, "nextCount", t);
                else if (n = o.str ? trim(val(e).toString()) || "" : positive(val(e)), "auto" === o.str && (o.str = !n.match(/^\d+$/) || !t.match(/^\d+$/), o.str || (n = positive(n), t = positive(t))), n !== t) {
                    data(e, "curCount", t);
                    var r, a = o.str ? n.length === t.length ? n < t : n.length < t.length : n < t,
                        s = (a ? t : n).toString(),
                        c = (a ? n : t).toString(),
                        l = void 0,
                        d = [],
                        u = [];
                    for (o.str || (c = new Array(s.length - c.length + 1).join("0") + c), l = 0, r = s.length; l < r; l++) {
                        var _ = s.charAt(l);
                        if (_ !== c.charAt(l)) break;
                        d.push(_)
                    }
                    var p = s.substr(l),
                        f = c.substr(l);
                    if (o.str) {
                        for (l = p.length; l > 0; l--) {
                            var h = p.charAt(l);
                            if (h !== f.charAt(l)) break;
                            u.unshift(h)
                        }
                        u.length && (p = p.substr(0, l + 1), f = f.substr(0, l + 1))
                    }
                    d = d.join("").replace(/\s$/, "&nbsp;"), u = u.join("").replace(/^\s/, "&nbsp;"), trim(val(e)) || o.noSpaceIfEmpty || val(e, "&nbsp;");
                    var w = e.clientHeight || e.offsetHeight;
                    val(e, '<div class="counter_wrap inl_bl"></div>');
                    var v, g = e.firstChild,
                        m = void 0,
                        b = void 0,
                        y = void 0,
                        k = !0;
                    d.length && g.appendChild(m = ce("div", {
                        className: "counter_const inl_bl",
                        innerHTML: d
                    })), d.length || (f = f.replace(/^0+/, "")), f && ("0" !== f || d.length) || (f = o.noSpaceIfEmpty ? "" : "&nbsp;", k = !!d.length), g.appendChild(y = ce("div", {
                        className: "counter_anim_wrap inl_bl"
                    })), y.appendChild(v = ce("div", {
                        className: "counter_anim " + (a ? "counter_anim_inc" : "counter_anim_dec"),
                        innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + p + "</span></div>" + (k ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + f + "</span></div>" : "")
                    }, k ? {
                        marginTop: a ? -w : 0
                    } : {
                        right: 0
                    })), o.str && setStyle(v, {
                        textAlign: "right",
                        right: 0
                    });
                    var x = getSize(geByClass1("counter_anim_big_c", v, "span"))[0],
                        C = k ? "&nbsp;" === f ? x : getSize(geByClass1("counter_anim_small_c", v, "span"))[0] : 0;
                    !f && o.noSpaceIfEmpty && (C = 0), u.length && g.appendChild(b = ce("div", {
                        className: "counter_const inl_bl",
                        innerHTML: u
                    })), o.noWrapWidth || setStyle(g, {
                        width: (m && getSize(m)[0] || 0) + (b && getSize(b)[0] || 0) + x + 0
                    }), void 0 === browser.csstransitions && (browser.csstransitions = browser.chrome && browser.version >= 9 || browser.mozilla && browser.version >= 4 || browser.opera && browser.version >= 10.5 || browser.safari && browser.version >= 3.2 || browser.safari_mobile || browser.android);
                    var T = browser.csstransitions;
                    setStyle(y, {
                        width: a ? C : x
                    });
                    var E = function() {
                            val(e, t || (o.noSpaceIfEmpty ? "" : " "));
                            var n = data(e, "nextCount");
                            data(e, "curCount", !1), data(e, "nextCount", !1), ("number" == typeof n || o.str && "string" == typeof n) && setTimeout(animateCount.pbind(e, n, o), 0), o.onDone && o.onDone()
                        },
                        L = k ? {
                            marginTop: a ? 0 : -w
                        } : {
                            marginRight: a ? -C : 0
                        };
                    T ? (getStyle(y, "width"), addClass(y, "counter_css_anim_wrap"), x !== C && setStyle(y, {
                        width: a ? x : C
                    }), k && setStyle(v, L), setTimeout(E, 300), o.fadeMode && (setStyle(geByClass1("counter_anim_big", e), "opacity", 1), setStyle(geByClass1("counter_anim_small", e), "opacity", 0))) : (x !== C && animate(y, {
                        width: a ? x : C
                    }, {
                        duration: 100
                    }), k ? animate(v, L, {
                        duration: 300,
                        transition: Fx.Transitions.easeOutCirc,
                        onComplete: E
                    }) : setTimeout(E, 300))
                }
            } else val(e, t || "")
    }, window.Chat = {
        maxHeight: 300,
        tabs: {},
        counters: {},
        showFriends: function() {
            curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), Chat.cont.tt && Chat.cont.tt.destroy && Chat.cont.tt.destroy())
        },
        showTT: function() {
            if (!hasClass(Chat.wrap, "chat_active") && !hasClass(Chat.wrap, "chat_expand")) {
                var e = browser.mac ? "Cmd" : "Ctrl";
                showTooltip(Chat.cont, {
                    text: getLang("head_fr_online_tip") + " (" + e + "+?)",
                    shift: [-2, 4, 0],
                    showdt: 0,
                    black: 1
                })
            }
        },
        init: function() {
            Chat.wrap = ce("div", {
                id: "chat_onl_wrap",
                className: "chat_onl_wrap",
                innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
            }), utilsNode.appendChild(Chat.wrap), Chat.scrollNode = geByClass1("chat_cont_scrolling", Chat.wrap), Chat.ttNode = geByClass1("chat_tt_wrap", Chat.wrap), Chat.itemsCont = Chat.scrollNode.firstChild, Chat.onl = ge("chat_onl"), Chat.cont = Chat.onl.parentNode.parentNode, hide(Chat.wrap), Chat.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + sbWidth() + "px;}")
        }
    };
    var TopMenu = window.TopMenu = {
            init: function() {
                if (this.inited) return !1;
                var e = ge("top_profile_link"),
                    t = ge("top_profile_menu");
                if (!e || !t) return !1;
                addEvent(e, "mousedown", TopMenu.clicked), this.inited = !0
            },
            clicked: function(e) {
                return !(checkEvent(e) || "mousedown" === e.type && Object(_lib_dom_events__WEBPACK_IMPORTED_MODULE_17__.checkKeyboardEvent)(e)) && (TopMenu.toggle(), !1)
            },
            toggle: function(e) {
                var t = ge("top_profile_link"),
                    o = ge("top_profile_menu"),
                    n = hasClass(o, "shown");
                void 0 !== e && n === e || (void 0 === e && (e = !n), toggleClass(t, "active", e), toggleClass(o, "shown", e), e ? (cancelStackPush("top_menu", TopMenu.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : cancelStackFilter("top_menu", !0))
            },
            show: function() {
                TopMenu.hidetimer && (clearTimeout(TopMenu.hidetimer), TopMenu.hidetimer = 0), TopMenu.toggle(!0)
            },
            hide: function() {
                TopMenu.hidetimer || (TopMenu.hidetimer = setTimeout(function() {
                    TopMenu.toggle(!1), TopMenu.hidetimer = 0
                }, 200))
            },
            select: function(e, t) {
                return !!checkEvent(t) || (TopMenu.toggle(!1), nav.go(e, t, {
                    noback: !0
                }))
            }
        },
        topNotifierSt = ["notifier.js", "notifier.css"],
        cached;

    function IframeLoader() {
        var e = void 0,
            t = void 0,
            o = void 0,
            n = void 0,
            i = void 0,
            r = void 0;

        function a(e) {
            return t && t.body ? t.getElementById("___img" + e) : geByClass1("___img" + e, o)
        }

        function s() {
            e = utilsNode.appendChild(ce("iframe")), t = function(e) {
                if (browser.mozilla) return !1;
                try {
                    return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                } catch (e) {}
                return !1
            }(e), o = t && t.body ? t.body : utilsNode.appendChild(ce("div", {}, {
                display: "none"
            })), n = 0, i = []
        }

        function c(e, r, s) {
            var c = n++;
            i[c] = {
                src: e,
                onLoad: r,
                that: s
            }, o.appendChild(ce("div", {
                innerHTML: function(e) {
                    return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                }(c)
            }));
            var l = a(c);
            return l.src = e, l.onload = function() {
                var e = i[c];
                e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[c], o.removeChild(a(c).parentNode))
            }, l
        }
        return s(), {
            add: c,
            abort: function() {
                re(e), r = [], each(i, function(e, t) {
                    return r.push(t)
                }), s()
            },
            repeat: function(e) {
                if (!r) return [];
                var t = [];
                if (each(r, function(e, o) {
                        c(o.src, o.onLoad, o.that), t.push(o.that)
                    }), r = null, e) {
                    var o = [];
                    each(t, function() {
                        o.push([this, this.src]), this.src = "", hide(this)
                    }), setTimeout(function() {
                        each(o, function(e, t) {
                            var o = _slicedToArray(t, 2),
                                n = o[0],
                                i = o[1];
                            n.src = i, show(n)
                        })
                    }, 10)
                }
                return t
            }
        }
    }

    function statNavigationTiming() {
        if (window.clientStatsInitedNT) return !1;
        if (window.performance && performance.timing) {
            if (Math.random() > .001 && !__dev) return !1;
            var e = {},
                t = window.cur && window.cur.module;
            performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd), each(e, function(e, o) {
                return statlogsValueEvent("navigation_timing", o, e, t)
            }), window.clientStatsInitedNT = !0
        }
    }

    function statDurationsLoadImage() {
        if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
            if (window.clientStatsInited) return !1;
            var e = window.performance.getEntriesByType("resource");
            if (!e) return !1;
            for (var t = {}, o = {}, n = 0; n < e.length; n++)
                if (e[n] && "img" === e[n].initiatorType)
                    if (e[n].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                    else if (e[n].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
            else if (e[n].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
            else if (e[n].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
            else if (e[n].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
            else if (e[n].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
            else if (t[">5000"] = (t[">5000"] || 0) + 1, e[n].name && e[n].name.indexOf("pp.vk.me") > 0) {
                var i = "";
                (i = (i = e[n].name).substr(i.indexOf("pp.vk.me") + 9)).indexOf("/") > 0 && (o[i = i.substr(0, i.indexOf("/"))] = (o[i] || 0) + 1)
            }
            each(t, function(e, t) {
                return statlogsValueEvent("img_load", t, e)
            }), each(o, function(e, t) {
                return statlogsValueEvent("img_slow", t, e)
            }), window.clientStatsInited = !0
        }
    }

    function updateAriaElements() {
        updateOnlineText(), updateAriaCheckboxes(), updateAriaRadioBtns()
    }

    function updateOnlineText() {
        clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
            each(geByClass("_online"), function() {
                var e = geByClass1("_online_reader", this) || this,
                    t = hasClass(this, "online"),
                    o = hasClass(this, "mobile"),
                    n = geByTag("img", e),
                    i = function(e) {
                        var t = domClosest("_post", e),
                            o = t && domByClass(t, "author");
                        return o ? o.innerText || o.textContent : ""
                    };
                if (t) {
                    var r = "";
                    each(n, function() {
                        var e = attr(this, "alt") || attr(this, "data-alt") || i(this);
                        e && (r = trim(r + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                    }), r = trim(r + " " + (o ? getLang("global_user_is_online_mobile") : getLang("global_user_is_online"))), e.setAttribute("aria-label", r)
                } else each(n, function() {
                    var e = attr(this, "data-alt") || i(this);
                    e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                }), e.removeAttribute("aria-label")
            })
        }, 100)
    }

    function updateAriaCheckboxes() {
        clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
            var e = [];
            each(["checkbox", "checkbox_pic"], function() {
                e = e.concat(geByClass(this))
            }), each(e, function() {
                "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", isChecked(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
            })
        }, 100)
    }

    function updateAriaRadioBtns() {
        clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
            var e = [],
                t = geByClass("radiobtn");
            each(t, function() {
                if ("DIV" === this.tagName && !this.getAttribute("role")) {
                    var t = isChecked(this);
                    this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                    var o = getRadioBtnWrap(this);
                    ~e.indexOf(o) || e.push(o)
                }
            }), each(e, function() {
                if (!geByClass("on", this).length) {
                    var e = geByClass("radiobtn", this);
                    e.length && e[0].setAttribute("tabindex", 0)
                }
            })
        }, 100)
    }

    function getRadioBtnWrap(e) {
        for (var t = 0, o = e; t < 5 && o !== document;) {
            if (o = domPN(o), geByClass("radiobtn", o).length > 1) break;
            t++
        }
        return o
    }

    function extractPercentile(e, t) {
        for (var o = void 0, n = 0; n < t.length; n++)
            if (">" === (o = t[n])) o = ">" + t[n - 1];
            else {
                if (1e3 * o > e) {
                    o = "<" + o;
                    break
                }
                o = !1
            }
        return o
    }

    function collectMemoryStats() {
        var e = {},
            t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
            o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
            n = !1;
        setInterval(function() {
            var i = window.cur && window.cur.module;
            i !== n && (e = {}, n = i);
            var r = window.vkLastNav;
            if (i && r) {
                var a = extractPercentile(Date.now() - r, t);
                if (a && !e[a]) {
                    var s = extractPercentile(Date.now() - window.vkTabLoaded, o);
                    e[a] = !0;
                    var c = performance.memory.usedJSHeapSize;
                    statlogsValueEvent("js_memory_stats_modules", c, i, a, s)
                }
            }
        }, 5e3)
    }

    function cancelStackPop() {
        var e = window.cancelStack || [];
        Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_36__.topHeaderClearClose)(), e.length > 0 && e.pop().func();
        var t = e[e.length - 1];
        return t && t.dclick && Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_36__.topHeaderClose)(function() {
            t.func(), cancelStackFilter(t.name)
        }), window.cancelStack = e, window.cancelStack
    }

    function openArticleEditor(e, t, o) {
        if (cur.articleEditorLayer) cur.articleEditorLayer.open(e, t);
        else {
            var n = [jsc("web/article_editor_layer.js"), "article.css", "article_editor.css"];
            stManager.add(n, function() {}), ajax.post("al_articles.php", {
                act: "open_editor",
                article_owner_id: e,
                article_id: t,
                from_post_convert: o ? 1 : 0,
                post_data_medias: o ? o.medias.join(",") : ""
            }, {
                loader: !0,
                onFail: function(e) {
                    return showFastBox(getLang("global_error"), e), !0
                },
                onDone: function(e, t, i, r) {
                    window.WkView && WkView.hide(), window.__bq && __bq.hideAll(), o && (r.postData = o), r.articleOwnerId ? stManager.add(n, function() {
                        layers.fullhide = function() {
                            cur.articleEditorLayer && cur.articleEditorLayer.hide()
                        }, cur.articleEditorLayer = new ArticleEditorLayer(e, t, i, r, function() {
                            return delete cur.articleEditorLayer
                        })
                    }) : nav.change({
                        z: !1
                    })
                }
            })
        }
    }

    function bookmark(e, t, o, n) {
        var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        ajax.post("al_bookmarks.php", {
            act: "bookmark",
            owner_id: e,
            object_id: t,
            type: o,
            state: i ? 1 : 0,
            hash: n
        })
    }
    window.TopNotifier = {
            preload: function() {
                stManager.add(topNotifierSt, function() {
                    return window.TopNotifier.preload()
                })
            },
            show: function(e) {
                if (!0 !== checkEvent(e)) return stManager.add(topNotifierSt, function() {
                    return window.TopNotifier.show(e)
                }), cancelEvent(e)
            },
            showTooltip: function(e) {
                stManager.add(topNotifierSt, function() {
                    return window.TopNotifier.showTooltip(e)
                })
            },
            invalidate: __bf,
            setCount: __bf
        }, window.TopSearch = _lib_top_search__WEBPACK_IMPORTED_MODULE_36__.default, window.mentionOver = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            showTooltip(e, {
                url: "al_wall.php",
                params: {
                    act: "mention_tt",
                    mention: e.getAttribute("mention_id"),
                    from: "wall"
                },
                shift: t.shift || [52, 7, 7],
                hidedt: 500,
                showdt: 500,
                slide: 15,
                checkLeft: !0,
                reverseOffset: t.reverseOffset || 112,
                dir: "auto",
                appendEl: domClosest("im-page-history-w", e) || domClosest("rb_box_wrap", e) || domClosest("wk_cont", e) || domClosest("scroll_fix_wrap", e)
            })
        }, window.mentionClick = function(e, t) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e && e.tt && e.tt.hide && e.tt.hide({
                fasthide: 1
            });
            var n = e,
                i = !1;
            if (cur.articleLayer && cur.articleLayer.isStandalone() && (i = !0), n.tagName && "a" === n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
                var r = n.getAttribute("hrefparams");
                r && (o.params = extend(o.params || {}, q2ajx(r))), (n = (n = n.href || "").replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (n = n.replace(location.hostname, ""));
                var a = void 0;
                (n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/")).match(/#$/) || !(a = n.match(/^\/(.*?)(\?|#|$)/)) ? i = !0 : ((a = a[1]).indexOf(".php") > 0 || a.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (i = !0)
            }
            if (i) {
                if (!!!(o && o.params && o.params._post && o.params._post_click_type)) return !0;
                e.setAttribute("data-change-location-with-post-away", 1), n = e
            }
            return nav.go(n, t, o)
        }, window.menuSettings = function(e) {
            return showTabbedBox("al_settings.php", {
                act: "menu_box",
                type: e
            })
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, window.mobilePromo = showBox.pbind("al_login.php", {
            act: "mobile",
            box: 1
        }), window.mobileOnlineTip = function(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                n = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return showTooltip(e, {
                url: "al_login.php",
                params: {
                    act: "mobile_tt",
                    mid: t.mid,
                    was: t.was,
                    vk_mobile: t.vk_mobile
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                forcetoup: t.forcetoup,
                toup: !1,
                dir: "auto",
                asrtl: t.asrtl,
                appendParentCls: t.appendParentCls,
                shift: [o, 8, 7],
                className: "mobile_tt" + n
            })
        }, window.pageVerifiedTip = function(e, t) {
            return showTooltip(e, {
                url: "/al_page.php",
                params: {
                    act: "verified_tt",
                    type: t.type,
                    oid: t.oid
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                dir: "auto",
                shift: [94, 7, 7],
                className: "verified_tt"
            })
        }, window.cssAnim = function(e, t, o, n) {
            var i = intval(browser.version);
            if (e && (browser.chrome && i > 14 || browser.mozilla && i > 13 || browser.opera && i > 2)) {
                var r = "all " + o.duration + "ms " + (o.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var a = function t() {
                    return browser.opera && intval(browser.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : removeEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
                };
                n && (browser.opera && intval(browser.version) <= 12 ? e.addEventListener("oTransitionEnd", a) : addEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", a)), setTimeout(setStyle.pbind(e, t), 0)
            } else animate(e, t, extend(o, {
                onComplete: n
            }))
        }, window.imagesLoader = function(e, t) {
            var o = [],
                n = 0,
                i = null,
                r = extend({
                    top_load: 0,
                    bottom_load: 2,
                    load_limit: 10,
                    need_load_class: "__need_load",
                    skip_process_load: !1,
                    use_iframe: !1
                }, t),
                a = {};

            function s(e, t) {
                o[e] && (--n, delete o[e]), t || a.processLoad()
            }

            function c(t) {
                var o = 0,
                    n = t;
                if (n && n.offsetParent)
                    do {
                        if (o += n.offsetTop, e && n.offsetParent === e) break
                    } while (n = n.offsetParent);
                return o
            }
            return a.processLoad = function() {
                if (each(o, function(e, t) {
                        var n = _slicedToArray(t, 2),
                            i = n[0],
                            r = n[1];
                        (r.width || r.height || vkNow() - i > 2e4) && o[e] && s.call(r, e, !0)
                    }), clearTimeout(i), n && (i = setTimeout(a.processLoad, 500)), !(n >= r.load_limit)) {
                    var t = geByClass(r.need_load_class, e || bodyNode),
                        l = [],
                        d = void 0,
                        u = void 0;
                    if (e && t.length) {
                        var _ = e.offsetHeight;
                        d = e.scrollTop - _ * r.top_load, u = e.scrollTop + _ * r.bottom_load
                    }
                    for (var p = 0, f = t.length; p < f && n < r.load_limit; p++) {
                        var h = t[p];
                        if ("IMG" === h.tagName) {
                            var w = h.getAttribute("data-src");
                            if (w) {
                                if (e) {
                                    var v = c(h),
                                        g = v + h.parentNode.offsetHeight;
                                    if (v > u) continue;
                                    if (g < d) continue
                                }
                                l.push([h, w])
                            }
                        }
                    }
                    each(l, function(e, t) {
                        var i = _slicedToArray(t, 2),
                            c = i[0],
                            l = i[1];
                        a.iloader && a.iloader.add(l, s, c), c.src = l, c.removeAttribute("data-src"), removeClass(c, r.need_load_class), o[l] || (n++, o[l] = [vkNow(), c])
                    }), clearTimeout(i), n && (i = setTimeout(a.processLoad, 500))
                }
            }, a.destroy = function() {
                o = [], n = 0, clearTimeout(i)
            }, r.use_iframe && window.IframeLoader && (a.iloader = new IframeLoader), r.skip_process_load || a.processLoad(), a
        }, window.IframeLoader = IframeLoader, window.getCaretBoundingRect = function(e) {
            var t = e.getBoundingClientRect(),
                o = null,
                n = null;
            if (t.top === t.bottom) return {
                left: 0,
                top: 0,
                bottom: 0
            };
            if (document.selection)(o = (n = document.selection.createRange()).getClientRects() || []).length || (n.text = "_", n.moveStart("character", -1), o = n.getClientRects(), n.text = ""), o = o[o.length - 1];
            else if (window.getSelection) {
                if ((n = getSelection().getRangeAt(0)).collapsed) {
                    var i = n.startOffset;
                    n.setStart(n.startContainer, 0), o = n.getClientRects(), n.setStart(n.startContainer, i)
                }
                o = o && o.length ? o[o.length - 1] : {
                    right: t.left,
                    top: t.top,
                    bottom: t.top
                }
            }
            return {
                left: o.right - t.left,
                top: o.top - t.top,
                bottom: o.bottom - t.top
            }
        }, window.getSelectionText = function() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
        }, window.statNavigationTiming = statNavigationTiming, window.statDurationsLoadImage = statDurationsLoadImage, window.getProgressBarEl = function(e) {
            return geByClass1("ui_progress_bar", e)
        }, window.onLoaded = function(e) {
            vk.loaded ? e() : addEvent(window, "load", e)
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.formatTime = function(e, t) {
            var o = void 0;
            e = Math.max(e, 0);
            var n = Math.floor(e % 60);
            o = n < 10 ? "0" + n : n;
            var i = (e = Math.floor(e / 60)) % 60;
            return o = i + ":" + o, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (o = "0" + o), o = e + ":" + o), o
        }, window.debounce = function(e, t, o) {
            var n = void 0;
            return function() {
                var i = this,
                    r = arguments,
                    a = o && !n;
                clearTimeout(n), n = setTimeout(function() {
                    n = null, o || e.apply(i, r)
                }, t), a && e.apply(this, r)
            }
        }, window.throttle = function(e, t) {
            var o = void 0;
            return function() {
                o || (e.apply(this, arguments), o = setTimeout(function() {
                    o = !1
                }, t))
            }
        }, window.shuffle = function(e) {
            for (var t = e.length; t > 0;) {
                var o = Math.floor(Math.random() * t),
                    n = e[--t];
                e[t] = e[o], e[o] = n
            }
            return e
        }, window.getProgressHtml = function(e, t) {
            return rs(vk.pr_tpl, {
                id: e || "",
                cls: t || ""
            })
        }, window.showProgress = function(e, t, o, n) {
            if (e = ge(e)) {
                var i = void 0;
                return hasClass(e, "pr") ? i = e : (i = se(rs(vk.pr_tpl, {
                    id: t || "",
                    cls: o || ""
                })), n ? domInsertBefore(i, e) : e.appendChild(i)), setTimeout(function() {
                    setStyle(i, {
                        opacity: 1
                    })
                }), i
            }
        }, window.hideProgress = function(e) {
            e && (hasClass(e, "pr") ? setStyle(e, {
                opacity: 0
            }) : re(geByClass1("pr", e)))
        }, window.disableEl = function(e) {
            setStyle(e, "pointer-events", "none")
        }, window.enableEl = function(e) {
            setStyle(e, "pointer-events", "")
        }, window.isToday = function(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }, window.isYesterday = function(e) {
            var t = new Date(e.getTime() + 864e5);
            return isToday(t)
        }, window.isTomorrow = function(e) {
            var t = new Date(e.getTime() - 864e5);
            return isToday(t)
        }, window.isSameDate = function(e, t) {
            var o = new Date(e),
                n = new Date(t);
            return o.getFullYear() === n.getFullYear() && o.getMonth() === n.getMonth() && o.getDate() === n.getDate()
        }, window.leadingZero = function(e) {
            return e >= 10 ? e : "0" + e
        }, window.hashCode = function(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var o = 0, n = e.length; o < n; o++) {
                t = (t << 5) - t + e.charCodeAt(o), t |= 0
            }
            return t
        }, window.onlinePlatformClass = function(e) {
            var t = " _online";
            return e && (t += " online"), mobPlatforms[e] && (t += " mobile"), updateOnlineText(), t
        }, window.toggleOnline = function(e, t) {
            var o = onlinePlatformClass(t).split(" "),
                n = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                inArray(t, o) && !hasClass(e, t) ? n.push(t) : !inArray(t, o) && hasClass(e, t) && removeClass(e, t)
            }), n.length > 0 && addClass(e, n.join(" "))
        }, window.updateAriaElements = updateAriaElements, window.updateOnlineText = updateOnlineText, window.updateAriaCheckboxes = updateAriaCheckboxes, window.updateAriaRadioBtns = updateAriaRadioBtns, window.getRadioBtnWrap = getRadioBtnWrap, window.isFullScreen = function() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }, window.performance && window.performance.memory && rand(0, 100) < 5 && collectMemoryStats(), window.isPhotoeditor3Available = function() {
            return !browser.msie || parseInt(browser.version) > 10
        }, window.cancelStackFilter = function(e, t) {
            var o = window.cancelStack || [];
            return t && Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_36__.topHeaderClearClose)(), window.cancelStack = o.filter(function(t) {
                return t.name !== e
            }), window.cancelStack
        }, window.cancelStackPush = function(e, t, o) {
            return o && Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_36__.topHeaderClose)(function() {
                t(), cancelStackFilter(e)
            }), window.cancelStack = cancelStackFilter(e).concat([{
                func: t,
                name: e,
                dclick: o
            }]), window.cancelStack
        }, window.cancelStackPop = cancelStackPop, window.hasAccessibilityMode = function() {
            return !(!window.vk || !vk.a11y)
        }, window.AudioMessagePlayer = {
            loaded: !1,
            togglePlay: function(e, t) {
                stManager.add("voice_message_player.js", function() {
                    return window.AudioMessagePlayer.togglePlay(e, t)
                })
            },
            detachPlayer: function(e) {
                stManager.add("voice_message_player.js", function() {
                    return window.AudioMessagePlayer.detachPlayer(e)
                })
            }
        }, window.repaintFixedElements = function(e) {
            var t = "safari-repaint";
            e.forEach(function(e) {
                hasClass(e, t) && removeClass(e, t), addClass(e, t)
            }), setTimeout(function() {
                e.forEach(function(e) {
                    removeClass(e, t)
                })
            }, 100)
        }, window.setWorkerTimeout = function(e, t) {
            if (!window.Worker || !window.Blob) return setTimeout(e, t);
            var o = new Blob(["\n      var timeout;\n      onmessage = function(e) {\n        clearTimeout(timeout);\n        if (e.data == 'start') {\n          timeout = setTimeout(function() { postMessage({}); }, \" + delay + \");\n        }\n      }\n    "]);
            try {
                var n = new Worker(window.URL.createObjectURL(o));
                return n.onmessage = function() {
                    n.terminate(), e()
                }, n.postMessage("start"), n
            } catch (o) {
                return setTimeout(e, t)
            }
        }, window.clearWorkerTimeout = function(e) {
            if (!e) return !1;
            Object(_lib_utils_common__WEBPACK_IMPORTED_MODULE_13__.isNumeric)(e) ? clearTimeout(e) : e.terminate()
        }, window.getStatusExportHash = function() {
            return vk.statusExportHash
        }, window.getPageHeaderHeight = (cached = void 0, function() {
            var e = ge("page_header");
            return cached = cached || (e ? e.offsetHeight : 0)
        }),
        function() {
            var e = .5,
                t = .25,
                o = 300,
                n = 1e3,
                i = 3e5,
                r = 2500,
                a = 5e3,
                s = 6e3,
                c = 2e4,
                l = 1e3,
                d = 36e4,
                u = "_longViewType",
                _ = "_longViewIdled",
                p = "_longViewModule",
                f = "_longViewStarted",
                h = "_longViewProcessed",
                w = "_longViewCached",
                v = "_longViewHeight",
                g = "_longViewTop",
                m = "_longViewBottom",
                b = "REGULAR",
                y = "AUTOPLAY_AD",
                k = "LongView.viewed",
                x = "LongView.idled",
                C = vk.longViewTestGroup,
                T = [],
                E = [],
                L = [],
                S = Date.now(),
                B = 0,
                O = 0,
                P = !1,
                A = null,
                M = null,
                j = null,
                N = null,
                D = {};

            function I() {
                var e = oe();
                e.length && (Q(e), ne())
            }

            function F() {
                T.forEach(function(e) {
                    e[w] = !1
                })
            }

            function q(e, t) {
                "im" === t && !e[u] && function(e) {
                    if (hasClass(e, "im-mess--post")) return !0;
                    var t = e && domFC(e);
                    return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || hasClass(e, "no_posts"))
                }(e) && (e[u] = function(e) {
                    var t = e && domFC(e);
                    return t && t.hasAttribute("data-ad-video-autoplay") ? y : b
                }(e), e[p] = t, T.push(e))
            }

            function H(o, n) {
                var i = H;
                ! function(o, n) {
                    var i = [];
                    T.forEach(function(r) {
                        ce(r) ? i.push(r) : ! function(t, o, n) {
                            return !t[f] && re(t, e, o, n)
                        }(r, o, n) ? function(e, o, n) {
                            return e[f] && !re(e, t, o, n)
                        }(r, o, n) && (r[_] ? delete r[_] : (le(E, r), L = L.concat(se(r))), delete r[f]) : (r[f] = Date.now(), E.push(r))
                    }), i.forEach(function(e) {
                        le(T, e)
                    })
                }(o || scrollGetY(), n || window.innerHeight), P ? (clearTimeout(i.timer), i.timer = setTimeout(R, 150)) : (P = !0, K(), function() {
                    if ("/im" === location.pathname) {
                        var e = geByClass1("im-page--chat-header"),
                            t = geByClass1("im-page--chat-input");
                        B = e.getBoundingClientRect().top + e.offsetHeight, O = window.innerHeight - t.getBoundingClientRect().top
                    } else B = ge("page_header").offsetHeight, O = 0
                }())
            }

            function R() {
                K(), z(), P = !1
            }

            function W() {
                K(), Z()
            }

            function V() {
                L = [], E.forEach(function(e) {
                    return e[f] = Date.now()
                }), J(null), ee(null), z()
            }

            function U() {
                K(), Z(), L = [], E = [], J(null), ee(null)
            }

            function z() {
                A = setTimeout(Y, r), M = setTimeout(G, a), j = setTimeout(X, s), N = setTimeout($, c)
            }

            function K() {
                clearTimeout(A), clearTimeout(M), clearTimeout(j), clearTimeout(N)
            }

            function Y() {
                L.length && J(L)
            }

            function G() {
                Q(L), L = [], J(null)
            }

            function X() {
                E.length && (ee(ae(E, !0, !0)), j = setTimeout(X, l))
            }

            function $() {
                clearTimeout(j), Q(ae(E)), E.forEach(function(e) {
                    return e[_] = !0
                }), E = [], ee(null)
            }

            function Z() {
                Q(L.concat(ae(E)))
            }

            function Q(e) {
                e && e.length && ajax.post("/al_page.php", {
                    act: "seen",
                    data: function(e) {
                        var t = {};
                        e.forEach(function(e) {
                            var o = e.ownerId,
                                n = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                            t[o] || (t[o] = []), t[o].push(e.module + e.postId + n + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                        });
                        var o = [];
                        return each(t, function(e, t) {
                            return o.push(e + "_" + t.join(","))
                        }), o.join(";")
                    }(e),
                    long_view: 1
                })
            }

            function J(e) {
                te(k, e)
            }

            function ee(e) {
                te(x, e)
            }

            function te(e, t) {
                var o = ls.get(e) || {};
                t ? o[S] = t : delete o[S], ls.set(e, o)
            }

            function oe() {
                var e = oe,
                    t = [],
                    o = ls.get(k) || {},
                    n = ls.get(x) || {};
                return e.iterator || (e.iterator = function(e) {
                    return function(o) {
                        ie(o) && (t = t.concat(e[o]))
                    }
                }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
            }

            function ne() {
                var e = ne,
                    t = ls.get(k) || {},
                    o = ls.get(x) || {};
                e.iterator || (e.iterator = function(e) {
                    return function(t) {
                        ie(t) && delete e[t]
                    }
                }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ls.set(k, t), ls.set(x, o)
            }

            function ie(e) {
                var t = Number(e);
                return t !== S && Date.now() - t >= d
            }

            function re(e, t, o, n) {
                if (!e) return !1;
                e[w] || (e[w] = !0, e[v] = e.offsetHeight, e[g] = o + e.getBoundingClientRect().top, e[m] = e[g] + e[v]);
                var i = n - B - O,
                    r = o + B,
                    a = o + n - O,
                    s = e[v],
                    c = e[g],
                    l = e[m];
                return (l > r && c < a ? Math.min(a, l) - Math.max(r, c) : 0) >= Math.min(i * t, s * t)
            }

            function ae(e, t, o) {
                return e.map(function(e) {
                    return se(e, t, o)
                })
            }

            function se(e, t, r) {
                if (ce(e)) return [];
                var a = Math.min(i, Date.now() - e[f]);
                if (e[u] === b && a < o || e[u] === y && a < n) return [];
                r || (e[h] = !0);
                var s, c = function(e) {
                        var t = e[p];
                        if ("im" === t) {
                            var o = attr(e, "data-post-id"),
                                n = attr(e, "data-copy"),
                                i = {
                                    index: -1,
                                    module: "im"
                                };
                            return o && (i[o] = -1), n && (i[n] = -1), i
                        }
                        try {
                            return window[t].postsGetRaws(e)
                        } catch (t) {
                            return console.error("Unable to extract data from elem", e), []
                        }
                    }(e),
                    l = {
                        feed: "f",
                        public: "c",
                        groups: "c",
                        profile: "p",
                        im: "m",
                        feed_search: "s",
                        feed_news_recent: "r",
                        feed_news: "r",
                        feed_news_top: "t",
                        feed_recommended: "d",
                        feed_recommended_recent: "d",
                        feed_recommended_top: "e",
                        feed_photos: "h",
                        feed_videos: "v",
                        feed_friends: "n",
                        feed_likes: "k",
                        feed_list: "z",
                        feed_other: "o"
                    }["feed_other" === (s = c.module) ? "feed_" + cur.section : s] || "u",
                    d = cur.feed_session_id || "na",
                    _ = [];
                for (var w in c)
                    if ("index" !== w && "module" !== w && "q" !== w) {
                        var v = w.split("_"),
                            g = v[0],
                            m = v[1];
                        "ads" === g && (m = v[3]), /^post\d+$/.test(g) && (g = v[1], m = v[2]);
                        var k = void 0;
                        t || (D[k = g + "_" + m] || (D[k] = 0), D[k]++), _.push("ad" === g ? {
                            ownerId: "ad",
                            postId: m,
                            module: l,
                            viewIndex: D[k]
                        } : "ads" === g ? {
                            ownerId: "ads",
                            postId: m,
                            module: l,
                            index: c.index,
                            duration: a,
                            sessionId: d,
                            viewIndex: D[k]
                        } : {
                            ownerId: g,
                            postId: (1 === c[w] ? "" : "-") + m,
                            module: l,
                            index: c.index,
                            duration: a,
                            sessionId: d,
                            q: c.q || null,
                            viewIndex: D[k]
                        })
                    }
                return _
            }

            function ce(e) {
                return "page_view" === C && e[h] || !document.body.contains(e)
            }

            function le(e, t) {
                var o = e.indexOf(t);
                o >= 0 && e.splice(o, 1)
            }
            C ? (addEvent(window, "blur", W), addEvent(window, "focus", V), onDomReady(function() {
                return setTimeout(I, 500)
            }), window.LongView = {
                register: q,
                onScroll: throttle(H, 50),
                onBeforePageChange: U,
                clearElemsCache: F,
                _debug: function() {
                    return {
                        started: E,
                        tracking: T,
                        viewedData: L,
                        viewIndexes: D,
                        blindTop: B,
                        blindBottom: O
                    }
                }
            }) : window.LongView = {
                register: function() {},
                onScroll: function() {},
                onBeforePageChange: function() {},
                clearElemsCache: function() {}
            }
        }(), window.parallel = function() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                o = new CallHub(t, e.length);
            each(e, function(e, t) {
                return t(function() {
                    return o.done()
                })
            })
        }, window.shareAudioPlaylist = function(e, t, o, n) {
            return showBox("like.php", {
                act: "publish_box",
                object: "audio_playlist" + t + "_" + o,
                list: n
            }, {
                stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
            }), cancelEvent(e)
        }, window.audioSearchPerformer = function(e, t) {
            var o = gpeByClass("_audio_row", e),
                n = AudioUtils.getAudioFromEl(o, !0),
                i = !!window.AudioPage && window.currentAudioPage(o),
                r = window.AudioPage && window.currentAudioPage(o) || cur.audioPage;
            return layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                if (r) {
                    var o = unclean(n.performer).replace(/<em>|<\/em>/g, "");
                    nav.change({
                        q: o,
                        performer: 1
                    }, t, {
                        searchPerformer: !0,
                        nav: !0,
                        isLayer: i.isLayer()
                    })
                } else nav.go(e, t)
            }, 50), cancelEvent(t)
        }, window.getAudioPlayer = function() {
            return window.AudioPlayer ? (window.ap = window.ap || new AudioPlayer, window.ap) : {}
        }, window.audioShowActionTooltip = function(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var n = gpeByClass("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(n, !0),
                    r = domData(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, n),
                    s = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                gpeByClass("_im_mess_stack", e) ? (s.appendParentCls = "_im_mess_stack", s.shift = [7, 10, 0], s.noZIndex = !0) : gpeByClass("top_notify_wrap", e) ? s.appendParentCls = "top_notify_wrap" : gpeByClass("_ape_audio_item", e) && (s.appendParentCls = "_ape_audio_item"), showTooltip(e, s)
            }
        }, window.deleteAudioOnClaim = function(e, t) {
            var o = geByClass1("_audio_row_" + (e + "_" + t));
            AudioUtils.deleteAudio(o, AudioUtils.getAudioFromEl(o, !0)), cur.claimWarning && cur.claimWarning.hide()
        }, window.initTopAudioPlayer = function() {
            stManager.add(["audioplayer.js"], function() {
                window.TopAudioPlayer.init()
            })
        }, window.toggleAudioLyrics = function(e, t, o, n) {
            if (!n) return !1;
            var i = gpeByClass("_audio_row", t),
                r = geByClass1("_audio_lyrics_wrap", i);
            return r.innerHTML ? (toggle(r), cancelEvent(e), !1) : ((n = intval(n)) && (addClass(i, "audio_loading"), showProgress(i), ajax.post("al_audio.php", {
                act: "get_lyrics",
                aid: o,
                lid: n
            }, {
                onDone: function(e) {
                    hideProgress(i), removeClass(i, "audio_loading"), r.innerHTML = e, show(r)
                }
            }), cancelEvent(e)), !1)
        }, window.openArticleEditor = openArticleEditor, window.toggleFastChats = function(e) {
            var t = this,
                o = !e;
            toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", o), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", o), each(geByClass("rb_box_wrap"), function() {
                return toggleClass(t, "fast_chats_toggle_hide", o)
            })
        }, window.isArticleEditorAvailable = function() {
            return !(browser.msie && parseInt(browser.version) <= 11)
        }, window.bookmark = bookmark, window.bookmarkPost = function(e, t, o, n, i) {
            var r = parseInt(domData(e, "state"));
            e.innerHTML = r ? domData(e, "add") : domData(e, "remove"), domData(e, "state", r ? 0 : 1), bookmark(t, o, n, i, r)
        }, window.bookmarkArticle = function(e, t, o, n, i, r) {
            var a = parseInt(domData(t, "state"));
            return domData(t, "state", a ? 0 : 1), bookmark(o, n, i, r, a), cancelEvent(e)
        }, window.fifaReplaceText = function(e) {
            return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
                return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
            }) : e
        }, window.getScrollInfo = function() {
            var e = {
                rtl: !1,
                backward: !1,
                delta: 1,
                negative: !1,
                rtlSame: !1
            };
            if (!vk.rtl) return e;
            if (!cur._scrollInfo) {
                var t = se('<div style="position: fixed; left: -1000; width: 0; overflow: scroll">x</div>');
                ge("content").appendChild(t);
                var o = t.scrollLeft;
                e.rtl = vk.rtl, e.backward = o > 0, t.scrollLeft = 1e3, e.delta = t.scrollLeft === o ? -1 : 1, e.negative = !e.backward && e.delta < 0, e.rtlSame = e.rtl && !e.backward && !e.negative, re(t), cur._scrollInfo = e
            }
            return cur._scrollInfo
        }, debugLog("common module enabled"), stManager.done(jsc("web/common_web.js"))
}, function(e, t, o) {
    var n = o(18),
        i = o(88),
        r = o(17),
        a = o(36),
        s = o(44),
        c = function(e, t, o) {
            var l, d, u, _, p = e & c.F,
                f = e & c.G,
                h = e & c.S,
                w = e & c.P,
                v = e & c.B,
                g = f ? n : h ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                m = f ? i : i[t] || (i[t] = {}),
                b = m.prototype || (m.prototype = {});
            for (l in f && (o = t), o) u = ((d = !p && g && void 0 !== g[l]) ? g : o)[l], _ = v && d ? s(u, n) : w && "function" == typeof u ? s(Function.call, u) : u, g && a(g, l, u, e & c.U), m[l] != u && r(m, l, _), w && b[l] != u && (b[l] = u)
        };
    n.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var _top_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82),
        _ads__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48),
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Nav = {
            getData: function(e) {
                if (e.length) {
                    for (var t in navMap) {
                        if (navMap.hasOwnProperty(t))
                            if ("<" !== t[0])
                                if (e.match(new RegExp("^" + t, "i"))) return {
                                    url: navMap[t][0],
                                    files: navMap[t][1]
                                }
                    }
                    return e.match(/^[a-z0-9\-_]+\.php$/i) ? {
                        url: e
                    } : {
                        url: navMap["<other>"][0],
                        files: navMap["<other>"][1]
                    }
                }
                return {
                    url: navMap["<void>"][0],
                    files: navMap["<void>"][1]
                }
            },
            reload: function(e) {
                if (!reloadCheckFlood(e)) {
                    e = e || {};
                    var t = Nav.strLoc.replace(/^\/+/g, "");
                    e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), Nav.go("/" + t, void 0, extend({
                        nocur: !0
                    }, e)))
                }
            },
            link: function(e, t) {
                if (checkEvent(t) || cur.noAjaxNav) {
                    var o = e.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), "");
                    window.open(o)
                } else Nav.go(e)
            },
            go: function go(loc, ev) {
                var opts = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (loc && loc.href && loc.getAttribute && loc.getAttribute("data-change-location-with-post-away")) {
                    var newLink = loc.href,
                        _postParams = Nav.getPostParams(loc, !(!opts.params || !opts.params._post_click_type)),
                        postOptions = Nav.mergePostParamsOptions(_postParams, opts.params),
                        extraQuery = {};
                    return postOptions._post && (extraQuery.post = postOptions._post, postOptions._post_ad_data && (extraQuery.post_ad_data = postOptions._post_ad_data), postOptions._post_click_cc_key && (extraQuery.cc_key = postOptions._post_click_cc_key), newLink = "/away.php?to=" + encodeURIComponent(newLink) + "&" + ajx2q(extraQuery)), location.href = newLink, !1
                }
                if (!checkEvent(ev) && !cur.noAjaxNav) {
                    if (LongView.onBeforePageChange(), loc.tagName && "a" === loc.tagName.toLowerCase()) {
                        if ("_blank" === loc.target || Nav.baseBlank) return;
                        var _params = loc.getAttribute("hrefparams");
                        if (_params && (opts.params = extend(opts.params || {}, q2ajx(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                    }
                    var strLoc = "",
                        objLoc = {},
                        changed = {};
                    "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = Nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = Nav.toStr(loc), objLoc = loc), statDurationsLoadImage(), statNavigationTiming();
                    var ap = getAudioPlayer();
                    if (ap && ap.updateCurrentPlaying && ap.updateCurrentPlaying(), !opts.nocur) {
                        for (var i in changed = clone(objLoc), Nav.objLoc) Nav.objLoc.hasOwnProperty(i) && (Nav.objLoc[i] === changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1));
                        if (!1 === zNav(clone(changed), {
                                hist: opts.hist,
                                asBox: opts.asBox,
                                onDone: opts.onDone
                            }, objLoc)) return Nav.setLoc(strLoc), !1;
                        var isHandled = articleNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                        if (isHandled) return Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && zNav({
                            z: Nav.objLoc.z,
                            w: Nav.objLoc.w
                        }, {}), !1
                    }
                    if (!opts.nocur && (vk.loaded || !changed[0]))
                        for (var curnav = cur.nav || [], _i = curnav.length - 1; _i >= 0; _i--) {
                            var oldUrl = document.URL;
                            if (!1 === curnav[_i](clone(changed), Nav.objLoc, objLoc, opts)) {
                                var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                    referrer = oldUrl === currentURL ? "" : oldUrl;
                                return setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10), !1
                            }
                        }
                    if (4 === vk.al || !vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed[0]) return setTimeout(function() {
                        location.href = "/" + (strLoc || "").replace("%23", "#")
                    }, 0), !1;
                    if (Object(_top_search__WEBPACK_IMPORTED_MODULE_0__.topHeaderClose)(), opts.back) {
                        if (cur._back && cur._back.onBack) return cur._back.onBack();
                        for (var _i2 = 0, l = globalHistory.length; _i2 < l; _i2++)
                            if (globalHistory[_i2].loc === strLoc) {
                                var _ret = function() {
                                    var e = globalHistory.splice(_i2, 1)[0],
                                        t = ge("wrap3"),
                                        o = ge("title"),
                                        n = cur._onback;
                                    return window.tooltips && tooltips.destroyAll(), hide("audio_tip_wrap"), processDestroy(cur), radioBtns = e.radioBtns, ajaxCache = e.ajaxCache, PageID = e.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), showBackLink(), cur = e.cur, setTimeout(function() {
                                        if (t.innerHTML = "", t.parentNode.replaceChild(e.content, t), vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || handlePageView(e), scrollToY(e.scrollTop, 0), setDocumentTitle(e.htitle), o.innerHTML = e.title, e.bodyClass !== bodyNode.className && (bodyNode.className = e.bodyClass || "", vk.body_class = e.bodyClass || ""), setStyle(o.parentNode, "display", e.hideHeader ? "none" : "block"), cur._back.show)
                                            for (var i = 0, r = cur._back.show.length; i < r; i++) cur._back.show[i]();
                                        if (n)
                                            for (var a = 0, s = n.length; a < s; a++) n[a]();
                                        Nav.setLoc(strLoc);
                                        var c = e.back || {};
                                        setTimeout(function() {
                                            showBackLink(c[0], c[1], c[2]), (Nav.objLoc.z || Nav.objLoc.w) && zNav({
                                                z: Nav.objLoc.z,
                                                w: Nav.objLoc.w
                                            }, {}), updateSTL(), updateLeftMenu(), updateAriaElements(), TopSearch.clear()
                                        }, 10), getAudioPlayer().updateCurrentPlaying()
                                    }, 10), {
                                        v: !1
                                    }
                                }();
                                if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v
                            }
                    }
                    var dest = objLoc[0];
                    delete objLoc[0];
                    var where = Nav.getData(dest);
                    opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = extend(opts.params || {}, {
                        _ref: Nav.objLoc[0] || ""
                    })), where.files && stManager.add(where.files), where.params = extend({
                        __query: dest,
                        al_id: vk.id
                    }, objLoc, opts.params || {});
                    var postParamsEl = ev && ev.target && ev.target.getAttribute ? ev.target : loc && loc.getAttribute ? loc : null,
                        postParams = Nav.getPostParams(postParamsEl, !!where.params._post_click_type);
                    where.params = Nav.mergePostParamsOptions(postParams, where.params), opts.cl_id && (where.params.fr_click = cur.oid + "," + opts.cl_id + "," + cur.options.fr_click), opts.tstat && (where.params._tstat = opts.tstat), opts.permanent && (where.params._permanent = opts.permanent);
                    var curNavVersion = ++NextPageID,
                        done = function done(title, html, js, params) {
                            if (curNavVersion === NextPageID) {
                                try {
                                    params._id = params.id
                                } catch (e) {
                                    return topError(e, {
                                        dt: 15,
                                        type: 6,
                                        msg: "Error: " + e.message + ", (params undefined?), title: " + title + ", html: " + html + ", js: " + js,
                                        url: where.url,
                                        query: ajx2q(where.params),
                                        answer: arguments.length
                                    })
                                }
                                if (window.lastScrollTop = scrollGetY(), opts.bench && (ajax.tProcess = (new Date).getTime()), stVersions[jsc("web/common_web.js")] > StaticFiles[jsc("web/common_web.js")].v) {
                                    if (Nav.setLoc(params.loc || Nav.strLoc), reloadCheckFlood({
                                            force: !0,
                                            from: 4
                                        })) return;
                                    location.reload(!0)
                                } else {
                                    var newPage = void 0 === where.params.al_id || where.params.al_id != params.id || params.fullPage,
                                        tNode = ge("title"),
                                        wNode = ge("wrap3"),
                                        _back = cur._back,
                                        hist = !1;
                                    if ((strLoc === (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && !1 !== opts.noback) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && showBackLink()), window.tooltips && tooltips.destroyAll(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(geByClass("page_actions_wrap"), function(e, t) {
                                            return hide(t)
                                        }), hide("audio_tip_wrap"), _back) {
                                        if (revertLastInlineVideo(), hist = {
                                                loc: _back.loc || Nav.strLoc,
                                                cur: cur,
                                                radioBtns: radioBtns,
                                                ajaxCache: ajaxCache,
                                                pid: PageID,
                                                scrollTop: scrollGetY(),
                                                htitle: document.title.toString(),
                                                width: vk.width,
                                                width_dec: vk.width_dec,
                                                width_dec_footer: vk.width_dec_footer,
                                                noleftmenu: vk.noleftmenu,
                                                notopmenu: vk.notopmenu,
                                                nobottommenu: vk.nobottommenu,
                                                bodyClass: vk.body_class,
                                                back: !!_tbLink.loc && [_tbLink.loc, val(_tbLink), _tbLink.fast]
                                            }, tNode && tNode.parentNode && !isVisible(tNode.parentNode) && (hist.hideHeader = !0), globalHistoryDestroy(hist.loc), globalHistory.length > 2) {
                                            var h = globalHistory.shift();
                                            processDestroy(h.cur), h.content.innerHTML = ""
                                        }
                                        if (cur._back.hide)
                                            for (var _i5 = 0, _l3 = cur._back.hide.length; _i5 < _l3; _i5++) cur._back.hide[_i5]();
                                        _back.text && showBackLink(hist.loc, _back.text, 1)
                                    } else _tbLink && (_tbLink.fast = 0), processDestroy(cur);
                                    if (PageID = NextPageID, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(radioBtns, function(e, t) {
                                            t.keep || delete radioBtns[e]
                                        }), ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), cur = {
                                            destroy: [],
                                            nav: []
                                        }, window._stlWas = 0, newPage) {
                                        for (cleanElems("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                            var _h = globalHistory.shift();
                                            processDestroy(_h.cur), _h.content.innerHTML = ""
                                        }
                                        var oldTopW = ge("dev_top_nav_wrap") && getSize("dev_top_nav_wrap")[0] || ge("page_header_wrap") && getSize("page_header_wrap")[0] || 0;
                                        pageNode.innerHTML = html, oldTopW && !vk.staticheader && updateHeaderStyles({
                                            width: oldTopW
                                        }), window._tbLink = ge("top_back_link");
                                        try {
                                            _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                        } catch (e) {}
                                        browser.mobile || onBodyResize(!0)
                                    } else {
                                        if (_back) {
                                            var newW = ce("div", {
                                                id: "wrap3"
                                            });
                                            extend(hist, {
                                                content: wNode.parentNode.replaceChild(newW, wNode),
                                                title: tNode.innerHTML
                                            }), globalHistory.push(hist), wNode = newW
                                        }
                                        var _oldTopW = ge("dev_top_nav_wrap") && getSize("dev_top_nav_wrap")[0] || ge("page_header_wrap") && getSize("page_header_wrap")[0] || 0;
                                        wNode.innerHTML = html, _oldTopW && !vk.staticheader && updateHeaderStyles({
                                            width: _oldTopW
                                        }), tNode.innerHTML = title, (title ? show : hide)(tNode.parentNode), getAudioPlayer().updateCurrentPlaying()
                                    }
                                    checkPageBlocks(), updateSTL(), updateLeftMenu(), updateAriaElements(), TopSearch.clear(), window.LazyLoad && LazyLoad.scanDelayed(), handlePageParams(params), opts.preventScroll || (opts.scrollTop > 0 ? scrollToY(opts.scrollTop, 0) : opts.noscroll || params.noscroll || scrollToTop(0)), opts.bench && (ajax.tRender = (new Date).getTime()), Nav.curLoc = params.loc, js && eval("(function(){" + js + ";})()"), ajax._framenext(), opts.onDone && opts.onDone(), browser.mobile && onBodyResize(), changed.f && handleScroll(changed.f), Nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.lTimeout)(function() {
                                        getAudioPlayer().updateCurrentPlaying(), TopMenu.toggle(!1)
                                    }, browser.chrome ? 100 : 50)
                                }
                            }
                        };
                    return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.updSeenAdsInfo)(), __adsUpdate("already"), "im" !== Nav.objLoc[0] && "im" !== changed[0] || (where.params = extend({}, where.params, {
                        _full_page: !0
                    })), ajax.post(where.url, where.params, {
                        onDone: function() {
                            var e = arguments;
                            if (__debugMode) done.apply(null, e);
                            else try {
                                done.apply(null, e)
                            } catch (t) {
                                topError(t, {
                                    dt: 15,
                                    type: 6,
                                    url: where.url,
                                    query: ajx2q(where.params),
                                    js: e[2],
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                })
                            }
                        },
                        onFail: opts.onFail || function(e) {
                            if (e) return setTimeout(showFastBox({
                                title: getLang("global_error")
                            }, e).hide, __debugMode ? 3e4 : 3e3), !0
                        },
                        frame: opts.noframe ? 0 : 1,
                        canReload: !0,
                        showProgress: opts.showProgress,
                        hideProgress: opts.hideProgress,
                        cache: opts.search ? 1 : "",
                        bench: opts.bench
                    }), !1
                }
            },
            setLoc: function(e) {
                "string" == typeof e ? (Nav.strLoc = e, Nav.objLoc = Nav.fromStr(e)) : (Nav.strLoc = Nav.toStr(e), Nav.objLoc = e), hab.setLoc(Nav.strLoc)
            },
            change: function(e, t, o) {
                var n = clone(Nav.objLoc);
                return Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(e, function(e, t) {
                    !1 === t ? delete n[e] : n[e] = t
                }), Nav.go(n, t, o)
            },
            fromStr: function(e) {
                var t = (e = e.split("#"))[0].split("?"),
                    o = {
                        0: t[0] || ""
                    };
                return e[1] && (o["#"] = e[1]), extend(q2ajx(t[1] || ""), o)
            },
            toStr: function(e) {
                var t = (e = clone(e))["#"] || "",
                    o = e[0] || "";
                delete e[0], delete e["#"];
                var n = ajx2q(e);
                return (n ? o + "?" + n : o) + (t ? "#" + t : "")
            },
            init: function() {
                Nav.strLoc = hab.getLoc(), Nav.objLoc = Nav.fromStr(Nav.strLoc)
            },
            getPostParams: function(e, t) {
                var o = {};
                if (!!(!e || !e.getAttribute)) return o;
                var n = e.getAttribute("data-post-id");
                n && (o.post_id = n);
                var i = e.getAttribute("data-parent-post-id");
                i && (o.parent_post_id = i);
                var r = e.getAttribute("data-post-click-type");
                r && (o.post_click_type = r);
                var a = e.getAttribute("mention_id");
                a && (o.post_click_mention_id = a);
                var s = e.getAttribute("data-post-click-cc-key");
                s && (o.post_click_cc_key = s);
                var c = [e.getAttribute("href"), e.getAttribute("data-href")];
                if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(c, function(e, t) {
                        if (t && "#" !== t) return o.post_click_url = t, !1
                    }), !!r || t) {
                    var l = gpeByClass("_ads_promoted_post_data_w", e),
                        d = l && l.getAttribute("data-ad"),
                        u = l && l.getAttribute("data-ad-block-uid");
                    d && (o.ad_data = d), u && (o.ad_block_unique_id = u)
                }
                return o
            },
            mergePostParamsOptions: function(e, t) {
                if (t = t || {}, !e) return t;

                function o(e, o, n) {
                    var i = n && t[o];
                    return !(!e || i) && (t[o] = e, !0)
                }
                return o(e.post_id, "_post", !0), o(e.parent_post_id, "_parent_post", !0), o(e.post_click_type, "_post_click_type", !0), t._post_click_type && (o(e.post_click_mention_id, "_post_click_mention_id", !0), o(e.post_click_cc_key, "_post_click_cc_key", !0), o(e.post_click_url, "_post_click_url", !0), o(e.ad_data, "_post_ad_data", !0) && o(e.ad_block_unique_id, "_post_ad_block_unique_id")), t
            }
        };
    __webpack_exports__.default = Nav
}, function(e, t, o) {
    'eat script';
    var n, i, r, a;
    o.r(t), String.fromCodePoint || (n = function() {
        try {
            var e = {},
                t = Object.defineProperty,
                o = t(e, e, e) && t
        } catch (e) {}
        return o
    }(), i = String.fromCharCode, r = Math.floor, a = function(e) {
        var t, o, n = [],
            a = -1,
            s = arguments.length;
        if (!s) return "";
        for (var c = ""; ++a < s;) {
            var l = Number(arguments[a]);
            if (!isFinite(l) || l < 0 || l > 1114111 || r(l) != l) throw RangeError("Invalid code point: " + l);
            l <= 65535 ? n.push(l) : (t = 55296 + ((l -= 65536) >> 10), o = l % 1024 + 56320, n.push(t, o)), (a + 1 == s || n.length > 16384) && (c += i.apply(null, n), n.length = 0)
        }
        return c
    }, n ? n(String, "fromCodePoint", {
        value: a,
        configurable: !0,
        writable: !0
    }) : String.fromCodePoint = a)
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = function() {
        function e() {
            var t = this;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = window.CallHub;
            this.on = 0, this.hub = new o(function() {
                t.onShow && t.onShow()
            }, 2), this.hintsHub = new o(function() {
                return t.showStartHints()
            }, 2)
        }
        return e.prototype.load = function() {
            var e = this;
            ge("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                return e.hub.done()
            }), ajax.post("hints.php", {
                act: "a_start_hints"
            }, {
                onDone: function(t) {
                    e.startHintsText = trim(t), e.hintsHub.done()
                }
            }))
        }, e.prototype.show = function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e) {
            var t = window.placeholderSetup;
            if (ge("quick_search") && !this.on) return this.on = 1, show(this.sCont), t("search_input"), ge("search_input").setAttribute("autocomplete", "off"), addClass(ge("qsearch_link"), "active"), this.prev_content = ge("content"), this.qsearch_cont || (this.qsearch_cont = ce("div", {
                id: "content",
                innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
            })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? cancelEvent(e) : void 0
        }), e.prototype.go = function(e) {
            var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + trim(ge("search_input").value) + "&name=1";
            return cancelEvent(e || window.event), location.href = t, !1
        }, e.prototype.init = function(e) {
            this.sCont = ge("quick_search"), this.opt = e || {}
        }, e.prototype.hide = function(e) {
            function t(t, o) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e, t) {
            if (ge("quick_search") && (!this.active || t) && this.on) {
                var o = window.toggleFlash;
                if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                ge("search_input").setValue ? ge("search_input").setValue("") : ge("search_input").value = "", hide(this.sCont), removeClass(ge("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
            }
        }), e.prototype.preload = function() {}, e
    }();
    t.default = n
}, function(e, t, o) {
    'eat script';
    o.r(t), window.stManager = {
        _waiters: [],
        _wait: function() {
            var e = {},
                t = [];
            if (!(c = __stm._waiters.length)) return clearInterval(__stm._waitTimer), void(__stm._waitTimer = !1);
            for (var o = 0; o < c; ++o) {
                for (var n = __stm._waiters[o][0], i = 0, r = n.length; i < r; ++i) {
                    var a = n[i];
                    if (!e[a])
                        if (StaticFiles[a].l || "css" != StaticFiles[a].t || "none" != getStyle(StaticFiles[a].n, "display") || __stm.done(a), StaticFiles[a].l) e[a] = 1;
                        else if (e[a] = -1, vk.loaded) {
                        var s = ++StaticFiles[a].c;
                        (s > __stm.lowlimit && stVersions[a] > 0 || s > __stm.highlimit) && (stVersions[a] < 0 ? (topError("<b>Error:</b> Could not load <b>" + a + "</b>.", {
                            dt: 5,
                            type: 1,
                            msg: "Failed to load with " + __stm.lowlimit + "/" + __stm.highlimit + " limits (" + (vkNow() - vk.started) / 100 + " ticks passed)",
                            file: a
                        }), StaticFiles[a].l = 1, e[a] = 1) : (topMsg("Some problems with loading <b>" + a + "</b>...", 5), stVersions[a] = irand(-1e4, -1), __stm._add(a, StaticFiles[a])))
                    }
                    e[a] > 0 && (n.splice(i, 1), --i, --r)
                }
                n.length || (t.push(__stm._waiters.splice(o, 1)[0][1]), --o, --c)
            }
            o = 0;
            for (var c = t.length; o < c; ++o) t[o]()
        },
        _addCss: function(e, t) {
            var o = ce("style", {
                    type: "text/css",
                    media: "screen"
                }),
                n = domNS(t);
            return n ? headNode.insertBefore(o, n) : headNode.appendChild(o), o.sheet ? o.sheet.insertRule(e, 0) : o.styleSheet && (o.styleSheet.cssText = e), o
        },
        _srcPrefix: function(e, t) {
            return -1 === e.indexOf(".js") && -1 === e.indexOf(".css") || function(e) {
                for (var t = 0; t < vk.stExcludedMasks.length; t++)
                    if (-1 !== e.indexOf(vk.stExcludedMasks[t])) return !0;
                return !1
            }(e) ? "" : vk.stDomain || ""
        },
        _add: function(e, t) {
            var o = e.replace(/[\/\.]/g, "_"),
                n = stVersions[e],
                i = e + "?" + n,
                r = stManager._srcPrefix(e, n);
            if (StaticFiles[e] = {
                    v: n,
                    n: o,
                    l: 0,
                    c: 0
                }, -1 != e.indexOf(".js")) {
                var a = "/js/";
                if (stTypes.fromLib[e] ? a += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? a += jsc("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 != e.indexOf("/") || (a += "al/"), StaticFiles[e].t = "js", e == jsc("web/common_web.js")) setTimeout(stManager.done.bind(stManager).pbind(jsc("web/common_web.js")), 0);
                else {
                    var s = r + a + i;
                    __stm._insertNode(s, e), StaticFiles[e].src = s
                }
            } else if (-1 != e.indexOf(".css")) {
                s = r + (a = "/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 != e.indexOf("/") ? "" : "al/")) + i;
                t && t.l && "css" == t.t && (StaticFiles[e].styleNode = __stm._addCss("#" + o + " {display: block; }", __stm._getOldNode(s))), __stm._insertNode(s, e), StaticFiles[e].t = "css", StaticFiles[e].src = s, ge(o) || utilsNode.appendChild(ce("div", {
                    id: o
                }))
            }
        },
        _getOldNode: function(e) {
            return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
        },
        _insertNode: function(e, t) {
            var o, n = e.split("?")[0].match(/\.css$/),
                i = __stm._getOldNode(e);
            n && StaticFiles[t] && StaticFiles[t].styleNode ? i = domNS(StaticFiles[t].styleNode) : i && (i = domNS(i)), n ? (o = ce("link", {
                type: "text/css",
                rel: "stylesheet",
                href: e
            })).onload = function() {
                __stm._removeDuplicateNodes(t)
            } : o = ce("script", {
                type: "text/javascript",
                src: e
            }), i ? headNode.insertBefore(o, i) : headNode.appendChild(o)
        },
        _removeDuplicateNodes: function(e) {
            var t = StaticFiles[e];
            if (t && t.src) {
                var o = t.src.split("?")[0],
                    n = __stm._getOldNode(o);
                if (n) {
                    t.styleNode && (re(t.styleNode), delete StaticFiles[e].styleNode);
                    for (var i = o.match(/\.css$/); n && (n = domNS(n));) {
                        var r = i ? n.href : n.src;
                        if (!r) break;
                        if ((r = r.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== o) break;
                        re(domPS(n))
                    }
                }
            }
        },
        add: function(e, t, o) {
            var n = [],
                i = document.documentElement;
            for (var r in isArray(e) || (e = [e]), e) {
                var a = e[r];
                if (a) {
                    -1 != a.indexOf("?") && (a = a.split("?")[0]), /^lang\d/i.test(a) ? stVersions[a] = stVersions.lang : stVersions[a] || (stVersions[a] = 1), (browser.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !browser.iphone && !browser.ipad && a != jsc("web/common_web.js") && "common.css" != a && stVersions[a] > 0 && stVersions[a] < 1e9 && (stVersions[a] += irand(1e9, 2e9));
                    var s = StaticFiles[a];
                    s && s.v == stVersions[a] || __stm._add(a, s), t && !StaticFiles[a].l && n.push(a)
                }
            }
            if (t) {
                if (!n.length) return !0 === o ? setTimeout(t, 0) : t();
                __stm._waiters.push([n, t]), __stm._waitTimer || (__stm._waitTimer = setInterval(__stm._wait, 100))
            }
        },
        done: function(e) {
            stVersions[e] < 0 && topMsg('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && __stm._removeDuplicateNodes(e)
        }
    }, window.__stm = stManager
}, function(e, t) {
    var o, n, i = e.exports = {};

    function r() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (o === setTimeout) return setTimeout(e, 0);
        if ((o === r || !o) && setTimeout) return o = setTimeout, setTimeout(e, 0);
        try {
            return o(e, 0)
        } catch (t) {
            try {
                return o.call(null, e, 0)
            } catch (t) {
                return o.call(this, e, 0)
            }
        }
    }! function() {
        try {
            o = "function" == typeof setTimeout ? setTimeout : r
        } catch (e) {
            o = r
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            n = a
        }
    }();
    var c, l = [],
        d = !1,
        u = -1;

    function _() {
        d && c && (d = !1, c.length ? l = c.concat(l) : u = -1, l.length && p())
    }

    function p() {
        if (!d) {
            var e = s(_);
            d = !0;
            for (var t = l.length; t;) {
                for (c = l, l = []; ++u < t;) c && c[u].run();
                u = -1, t = l.length
            }
            c = null, d = !1,
                function(e) {
                    if (n === clearTimeout) return clearTimeout(e);
                    if ((n === a || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                    try {
                        n(e)
                    } catch (t) {
                        try {
                            return n.call(null, e)
                        } catch (t) {
                            return n.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function f(e, t) {
        this.fun = e, this.array = t
    }

    function h() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
        l.push(new f(e, t)), 1 !== l.length || d || s(p)
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(e) {
        return []
    }, i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(e, t) {
    var o = {}.toString;
    e.exports = function(e) {
        return o.call(e).slice(8, -1)
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "locBase", function() {
        return locBase
    }), __webpack_require__.d(__webpack_exports__, "ajx2q", function() {
        return ajx2q
    }), __webpack_require__.d(__webpack_exports__, "q2ajx", function() {
        return q2ajx
    }), __webpack_require__.d(__webpack_exports__, "requestBox", function() {
        return requestBox
    }), __webpack_require__.d(__webpack_exports__, "activateMobileBox", function() {
        return activateMobileBox
    }), __webpack_require__.d(__webpack_exports__, "validateMobileBox", function() {
        return validateMobileBox
    }), __webpack_require__.d(__webpack_exports__, "validatePassBox", function() {
        return validatePassBox
    }), __webpack_require__.d(__webpack_exports__, "photoCaptchaBox", function() {
        return photoCaptchaBox
    }), __webpack_require__.d(__webpack_exports__, "ajax", function() {
        return ajax
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82),
        locBase = location.toString().replace(/#.+$/, ""),
        decodeErors = {},
        iframeTransport = void 0,
        iframeTO = 0;

    function ajx2q(e, t) {
        var o = [],
            n = function(e) {
                if (decodeErors[e]) return e;
                try {
                    return encodeURIComponent(e)
                } catch (e) {
                    return ""
                }
            };
        for (var i in e)
            if (null != e[i] && !isFunction(e[i]))
                if (isArray(e[i]))
                    for (var r = 0, a = 0, s = e[i].length; r < s; ++r) null == e[i][r] || isFunction(e[i][r]) || (o.push(n(i) + "[" + a + "]=" + n(e[i][r])), ++a);
                else o.push(n(i) + "=" + n(e[i]));
        return t || o.sort(), o.join("&")
    }

    function q2ajx(e) {
        if (!e) return {};
        var t = {},
            o = function(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return decodeErors[e] = 1, e
                }
            };
        return e = e.split("&"), each(e, function(e, n) {
            var i = n.split("=");
            if (i[0]) {
                var r = o(i[1] + "");
                if ("[]" === i[0].substr(i.length - 2)) {
                    var a = o(i[0].substr(0, i.length - 2));
                    t[a] || (t[a] = []), t[a].push(r)
                } else t[o(i[0])] = r
            }
        }), t
    }

    function requestBox(e, t, o) {
        return e.setOptions({
            onDestroy: o
        }), e.onDone = function() {
            t && t.apply(null, arguments)
        }, e
    }

    function activateMobileBox(e) {
        return requestBox(showBox("activation.php", {
            act: "activate_mobile_box",
            hash: e.hash
        }), function() {
            vk.nophone = 0, e.onDone()
        }, e.onFail)
    }

    function validateMobileBox(e) {
        return requestBox(showBox("activation.php", {
            act: "validate_box",
            captcha: e.acceptCaptcha ? 1 : "",
            skip_push: e.skip_push ? e.skip_push : "",
            from: e.from || "",
            hash: e.hash,
            ahash: e.ahash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function validatePassBox(e) {
        return requestBox(showBox("activation.php", {
            act: "pass_validate_box",
            hash: e.hash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function photoCaptchaBox(e) {
        return requestBox(showBox("pcaptcha.php", {
            act: "box"
        }, {
            stat: ["pcaptcha.css", "pcaptcha.js"]
        }), e.onDone, e.onFail)
    }
    window.ajaxCache = {}, window.globalAjaxCache = {};
    var ajax = {
        _init: function() {
            try {
                if (new XMLHttpRequest) return void(ajax._req = function() {
                    return new XMLHttpRequest
                })
            } catch (e) {}
            ajax._req || browser.search_bot || location.replace("/badbrowser.php")
        },
        _getreq: function() {
            return ajax._req || ajax._init(), ajax._req()
        },
        _frameover: function(e, t) {
            if (iframeTransport) {
                var o = iframeTransport.parentNode;
                o.innerHTML = "", utilsNode.removeChild(o), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
            }
        },
        _receive: function _receive(cont, html, js, bench, params) {
            var container = cont && ge(cont);
            if (container && html && (container.firstChild ? container.appendChild(cf(html)) : val(container, html)), js) {
                var scr = "(function(){" + js + ";})()";
                if (__debugMode) eval(scr);
                else try {
                    eval(scr)
                } catch (e) {
                    topError(e, {
                        dt: 15,
                        type: 8,
                        url: ajax._frameurl,
                        js: js,
                        answer: Array.prototype.slice.call(arguments).join("<!>")
                    })
                }
                bench && (ajax.tModule = cur.module)
            }
            params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
        },
        framedata: !1,
        _framenext: function() {
            if ((ajax.framedata || {}).length) {
                var e = ajax.framedata.shift();
                !0 === e ? ajax._framenext() : !1 === e ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.lTimeout)(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
            }
        },
        framegot: function(e, t, o, n) {
            ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === o && void 0 === n ? e : [e, t, o, n]), 1 == ajax.framedata.length && ajax._framenext())
        },
        framepost: function(e, t, o, n) {
            clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(ce("div", {
                innerHTML: "<iframe></iframe>"
            })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + irand(0, 99999), ajax._frameurl = iframeTransport.src = e
        },
        plainpost: function(e, t, o, n, i, r, a, s) {
            var c = ajax._getreq(),
                l = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
            c.onreadystatechange = function() {
                4 === c.readyState && (c.status >= 200 && c.status < 300 ? o && o(c.responseText, c) : n && n(c.responseText, c))
            };
            try {
                c.open("POST", e, !0)
            } catch (e) {
                return !1
            }
            return r && each(r, function(e, t) {
                c[e] = t
            }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(l), c
        },
        post: function(e, t, o) {
            "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
            var n = extend({
                    _captcha: !1,
                    _box: !1
                }, o || {}),
                i = extend({
                    al: n.frame ? -1 : 1
                }, t),
                r = vkNow(),
                a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
            if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + a), vk.spentLastSendTS = r), n.progress && (n.showProgress || (n.showProgress = function() {
                    var e = ge(n.progress);
                    hasClass(e, "pr") && setStyle(e, "opacity", 1), show(e)
                }), n.hideProgress || (n.hideProgress = function() {
                    var e = ge(n.progress);
                    hasClass(e, "pr") && setStyle(e, "opacity", 0), hide(e)
                })), n.loader) {
                var s = isVisible(boxLayerWrap);
                n.showProgress = function() {
                    boxRefreshCoords(boxLoader), show(boxLoader), s || show(boxLayerWrap)
                }, n.hideProgress = function() {
                    hide(boxLoader), s || hide(boxLayerWrap)
                }
            }
            return ajax._post(e, i, n)
        },
        preload: function(e, t, o) {
            "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
        },
        invalidate: function(e, t) {
            void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
        },
        _getCacheKey: function(e, t, o) {
            var n = clone(t);
            return delete n.al, delete n.al_ad, delete n.ads_section, delete n.ads_showed, delete n.captcha_sid, delete n.captcha_key, delete n._smt, delete n._preload, e + "#" + ajx2q(n, o && o.noSort)
        },
        _debugLog: function(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        },
        _parseRes: function(e, t) {
            for (var o = e.length - 1; o >= 0; --o) {
                var n = e[o];
                if ("<!" === n.substr(0, 2)) {
                    var i = n.indexOf(">"),
                        r = n.substr(2, i - 2);
                    switch (n = n.substr(i + 1), r) {
                        case "json":
                            e[o] = parseJSON(n);
                            break;
                        case "int":
                            e[o] = intval(n);
                            break;
                        case "float":
                            e[o] = floatval(n);
                            break;
                        case "bool":
                            e[o] = !!intval(n);
                            break;
                        case "null":
                            e[o] = null;
                            break;
                        case "pageview_candidate":
                            e.pop();
                            break;
                        case "debug":
                            ajax._debugLog(n, t), e.pop()
                    }
                }
            }
        },
        _post: function _post(url, query, options) {
            !query.captcha_sid && options.showProgress && options.showProgress();
            var cacheKey = !1,
                statAct = void 0;
            window.__adsGetAjaxParams && extend(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
            var hideBoxes = function() {
                    for (var e = 0, t = arguments.length; e < t; ++e) {
                        var o = arguments[e];
                        o && o.isVisible() && (o.setOptions({
                            onHide: !1,
                            onDestroy: !1
                        }), o.hide())
                    }
                    return !1
                },
                fail = function(e, t) {
                    if (options.hideProgress && options.hideProgress(), options._suggest && cleanElems(options._suggest), options._box = hideBoxes(options._captcha, options._box), options._captcha = options._box, options._suggest = options._captcha, -1 !== e.indexOf("The page is temporarily unavailable") && __dev && inArray(vk.id, [100])) return ajax._post(url, query, options), !1;
                    options.onFail && !0 === options.onFail(e) || topError(e, {
                        dt: 5,
                        type: 3,
                        status: t.status,
                        url: url,
                        query: query && ajx2q(query, options.noSort)
                    })
                };
            options.local && (fail = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(fail)), options.stat && (statAct = !1, stManager.add(options.stat, function() {
                statAct && statAct(), options.stat = !1
            }));
            var _processResponse = function processResponse(code, answer) {
                if (options.cache) {
                    var answ = ajaxCache[cacheKey];
                    answ && answ._loading && (setTimeout(function() {
                        for (var e in answ._callbacks) answ._callbacks.hasOwnProperty(e) && answ._callbacks[e](code, answer)
                    }, 0), delete ajaxCache[cacheKey])
                }
                if (options.stat) return options.stat = !1, statAct = _processResponse.pbind(code, answer), !1;
                switch (options.cache && !options.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), options.hideProgress && options.hideProgress(), 2 !== code && (options._captcha && (options._suggest && cleanElems(options._suggest), options._captcha = hideBoxes(options._captcha), options._suggest = options._captcha), options._box = hideBoxes(options._box)), code) {
                    case 1:
                        showFastBox({
                            width: 520,
                            title: answer[0],
                            onDestroy: options.onFail
                        }, answer[1]);
                        break;
                    case 2:
                        var addText = "";
                        if (2 === intval(answer[1])) {
                            var resend = function(e) {
                                var t = extend(query, {
                                        recaptcha: e
                                    }),
                                    o = options.cache ? extend(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, t, o)
                            };
                            options._captcha = showReCaptchaBox(answer[0], answer[2], options._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        } else {
                            var _resend = function(e, t) {
                                var o = extend(query, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }),
                                    n = options.cache ? extend(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, o, n)
                            };
                            options._captcha = showCaptchaBox(answer[0], intval(answer[1]), options._captcha, {
                                onSubmit: _resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        }
                        options._suggest = geByClass1("phone_validation_link", options._captcha.bodyNode), options._suggest && addEvent(options._suggest, "click", function() {
                            options._box = validateMobileBox({
                                onDone: options._captcha.submit
                            })
                        });
                        break;
                    case 11:
                    case 12:
                        var newOptions = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = validateMobileBox({
                            acceptCaptcha: 11 === code,
                            onDone: function(e, t) {
                                vk.nophone = 0, e && (options._captcha = curBox());
                                var o = e ? extend(query, {
                                    captcha_sid: e,
                                    captcha_key: t
                                }) : query;
                                ajax._post(url, o, newOptions)
                            },
                            onFail: options.onFail,
                            hash: answer[0],
                            ahash: answer[1]
                        });
                        break;
                    case 14:
                        var _newOptions = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = photoCaptchaBox({
                            onDone: ajax._post.pbind(url, query, _newOptions),
                            onFail: options.onFail
                        });
                        break;
                    case 15:
                        var _newOptions2 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = validatePassBox({
                            onDone: ajax._post.pbind(url, query, _newOptions2),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 3:
                        var _newOptions3 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        window.onReLoginDone = ajax._post.pbind(url, query, _newOptions3), window.onReLoginFailed = function(e, t) {
                            t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                        }, utilsNode.appendChild(ce("iframe", {
                            src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                role: "al_frame",
                                _origin: locProtocol + "//" + locHost,
                                ip_h: answer[0] || vk.ip_h,
                                to: answer[1] || ""
                            })
                        }));
                        break;
                    case 4:
                        intval(answer[1]) ? nav.go(answer[0], !1, {
                            nocur: "2" === answer[1],
                            noback: !0 === answer[1],
                            showProgress: options.showProgress,
                            hideProgress: options.hideProgress
                        }) : (hab.stop(), location.href = answer[0]);
                        break;
                    case 5:
                        nav.reload({
                            force: intval(answer[0]),
                            from: 1,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 6:
                        var _newOptions4 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = activateMobileBox({
                            onDone: ajax._post.pbind(url, query, _newOptions4),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 7:
                        options.onFail && options.onFail(), topMsg(answer[0], 10);
                        break;
                    case 8:
                        if (options.onFail && options.onFail(answer[0])) return;
                        topError(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                            dt: answer[1] ? 0 : 10,
                            type: 4,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 9:
                        if ((options.fromBox || options.forceDone) && (options.onDone && options.onDone.apply(window, answer), options.fromBox)) break;
                        options._box = showFastBox({
                            title: trim(answer[0])
                        }, answer[1]);
                        var _newOptions5 = extend(clone(options), {
                            showProgress: options._box.showProgress,
                            hideProgress: options._box.hideProgress
                        });
                        options.cache && (_newOptions5.cache = -1), options._box = requestBox(options._box, function(e) {
                            isVisible(options._box.progress) || (e || (e = {
                                _votes_ok: 1
                            }), ajax._post(url, extend(query, e), _newOptions5))
                        }, options.onFail), options._box.evalBox(answer[2]);
                        break;
                    case 10:
                        options._box = showFastBox({
                            title: answer[0] || getLang("global_charged_zone_title"),
                            onHide: options.onFail
                        }, answer[1], getLang("global_charged_zone_continue"), function() {
                            var e = extend(query, {
                                charged_confirm: answer[3]
                            });
                            ajax._post(url, e, options)
                        }, getLang("global_cancel"));
                        break;
                    case 13:
                        eval("(function(){" + answer[0] + ";})()");
                        break;
                    default:
                        if (-1 === code || -2 === code || -3 === code) {
                            var adsShowed = answer.pop(),
                                adsCanShow = answer.pop(),
                                adsHtml = answer.pop(),
                                adsProps = void 0; - 3 === code && (adsProps = answer.pop()), window.__adsSet && __adsSet(adsHtml, null, adsCanShow, adsShowed, null, adsProps)
                        }
                        options.onDone && options.onDone.apply(window, answer)
                }
                window.LazyLoad && LazyLoad.scanDelayed()
            };
            options.local && (_processResponse = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(_processResponse));
            var done = function(e, t) {
                options.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), trim(e).length || (t = [8, getLang("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                var o = e.split("<!>"),
                    n = clone(o);
                each(n, function(e, t) {
                    return n[e] = t.substr(0, 100)
                }), ajax.lastResp = n.join("<!>");
                var i = intval(o.shift());
                if (!i) return fail("<pre>" + e + "</pre>", {
                    status: -1
                });
                if (vk.version && vk.version !== i) i && o.length > 4 ? nav.reload({
                    force: !0,
                    from: 2,
                    url: url,
                    query: query && ajx2q(query)
                }) : nav.strLoc ? location.replace(locBase) : topError("Server error.", {
                    type: 100
                });
                else {
                    vk.version = !1;
                    var r = o.shift(),
                        a = intval(o.shift()),
                        s = intval(o.shift());
                    options.frame && (o = t);
                    var c = intval(o.shift());
                    if (vk.lang !== a && options.canReload) nav.reload({
                        force: !0,
                        from: 3,
                        url: url,
                        query: query && ajx2q(query)
                    });
                    else {
                        var l = function() {
                            var e = ["common.css"];
                            if (r)
                                for (var t = 0, n = (r = r.split(",")).length; t < n; ++t) e.push(r[t]);
                            if (stVersions.lang < s)
                                for (var i in stVersions.lang = s, StaticFiles) /^lang\d/i.test(i) && e.push(i);
                            if (!options.frame) try {
                                ajax._parseRes(o, options._reqid)
                            } catch (e) {
                                topError("<b>JSON Error:</b> " + e.message, {
                                    type: 5,
                                    answer: o.join("<!>"),
                                    url: url,
                                    query: query && ajx2q(query)
                                })
                            }
                            stManager.add(e, _processResponse.pbind(c, o))
                        };
                        if (window.stVersions) {
                            if (i === stVersions.nav) return l();
                            headNode.appendChild(ce("script", {
                                type: "text/javascript",
                                src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                            })), setTimeout(function e() {
                                if (i === stVersions.nav) return l();
                                setTimeout(e, 100)
                            }, 0)
                        }
                    }
                }
            };
            if (options.local && (done = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(done)), options.cache > 0 || options.forceGlobalCache) {
                var answer = ajaxCache[cacheKey];
                if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                if (answer && !options.forceGlobalCache) return _processResponse(0, answer), void(3 === options.cache && delete ajaxCache[cacheKey]);
                if (answer = window.globalAjaxCache[cacheKey]) return -1 == answer || isFunction(answer) ? window.globalAjaxCache[cacheKey] = options.onDone : options.onDone.apply(window, answer), void(options.hideProgress && options.hideProgress())
            }
            ajaxCache[cacheKey] = {
                _loading: 1,
                _callbacks: []
            }, window.debuglogSent ? (options._reqid = debuglogSent(url + (query ? ": " + ajx2q(query, options.noSort).replace(/&/g, "&amp;") : "")), options.frame && (window._lfrid = options._reqid)) : options._reqid = 0;
            var xhrOptions = {};
            return options.timeout && (xhrOptions.timeout = options.timeout), options.frame ? ajax.framepost(url, query, done, options) : ajax.plainpost(url, query, done, fail, !1, xhrOptions, options)
        },
        tGetParam: function() {
            if (ajax.tStart && ajax.tModule) {
                var e = [ajax.tDone - ajax.tStart, ajax.tProcess - ajax.tDone, ajax.tRender - ajax.tProcess, ajax.tOver - ajax.tStart, ajax.tModule];
                for (var t in e)
                    if (e.hasOwnProperty(t)) {
                        if (e[t] < 0) return !1;
                        if (!e[t] && 0 !== e[t]) return !1
                    }
                return ajax.tStart = !1, e.join(",")
            }
        }
    };
    window.ajax = ajax, window.ajx2q = ajx2q, window.q2ajx = q2ajx, window.requestBox = requestBox, window.activateMobileBox = activateMobileBox, window.validateMobileBox = validateMobileBox, window.validatePassBox = validatePassBox, window.photoCaptchaBox = photoCaptchaBox
}, function(e, t, o) {
    'eat script';

    function n(e) {
        for (var t = e, o = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], i = 0, r = o.length; i < r; i++) t = t.split(o[i]).join(n[i]);
        var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ";
        for (i = 0, r = a.length; i < r; i++) t = t.split(a.charAt(i)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(i));
        return t == e ? null : t
    }

    function i(e) {
        var t, o = e,
            n = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"],
            i = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"],
            r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ";
        for (t = 0; t < i.length; t++) o = o.split(i[t]).join(n[t]);
        for (t = 0; t < r.length; t++) o = o.split(r.charAt(t)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(t));
        return o == e ? null : o
    }

    function r(e) {
        var t, o = e,
            n = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
        for (t = 0; t < n.length; t++) o = o.split(n.charAt(t)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(t));
        return o == e ? null : o
    }

    function a(e, t, o) {
        if (!t || !window.langConfig) return e;
        var n;
        if (isArray(t) ? (n = t[1], e != Math.floor(e) ? n = t[langConfig.numRules.float] : each(langConfig.numRules.int, function(o, i) {
                if ("*" == i[0]) return n = t[i[2]], !1;
                var r = i[0] ? e % i[0] : e;
                return -1 != indexOf(i[1], r) ? (n = t[i[2]], !1) : void 0
            })) : n = t, o) {
            for (var i = e.toString().split("."), r = [], a = i[0].length - 3; a > -3; a -= 3) r.unshift(i[0].slice(a > 0 ? a : 0, a + 3));
            i[0] = r.join(langConfig.numDel), e = i.join(langConfig.numDec)
        }
        return n = (n || "%s").replace("%s", e)
    }

    function s(e, t) {
        if (!isArray(t)) return t;
        var o = t[1];
        return window.langConfig ? (each(langConfig.sexRules, function(n, i) {
            return "*" == i[0] ? (o = t[i[1]], !1) : e == i[0] && t[i[1]] ? (o = t[i[1]], !1) : void 0
        }), o) : o
    }

    function c(e) {
        for (var t = e + "", o = arguments, n = o.length, i = 1; i < n; i += 2) {
            var r = "%" == o[i][0] ? o[i] : "{" + o[i] + "}";
            t = t.replace(r, o[i + 1])
        }
        return t
    }

    function l(e, t) {
        var o = t ? window : window.cur;
        o.lang ? extend(o.lang, e) : o.lang = e
    }

    function d() {
        try {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (!t) return "...";
            var o = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!o) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return isFunction(o) ? o.apply(null, e) : void 0 === e[0] && !isArray(o) || "raw" === e[0] ? o : a(e[0], o, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.prototype.slice.call(arguments).join(", ") + ")")
        }
    }

    function u(e, t, o, n, i, r) {
        var a;
        if (r || (r = ""), isArray(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += o, a = new Date(e)) : a = e, i) t = t[1];
        else {
            var s = "";
            !(s = isToday(a) ? t[3] : isYesterday(a) ? t[2] : isTomorrow(a) ? t[4] : t[1]) && t[1] && (s = t[1]), t = s
        }
        var c = "",
            l = {
                hours: a.getHours(),
                minutes: a.getMinutes(),
                seconds: a.getSeconds(),
                day: a.getDate(),
                month: a.getMonth() + 1,
                year: a.getFullYear()
            };
        switch (3 === vk.lang && (c = a.getHours() > 11 ? "pm" : "am", l.hours = a.getHours() % 12 == 0 ? 12 : a.getHours() % 12), vk.lang) {
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
                !isToday(a) || isYesterday(a) || isTomorrow(a) || (t = r + t);
                break;
            case 12:
            case 73:
                1 == a.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (l.year = l.year + 543), t.replace("{hour}", l.hours).replace("{num_hour}", leadingZero(l.hours)).replace("{minute}", leadingZero(l.minutes)).replace("{day}", l.day).replace("{num_day}", leadingZero(l.day)).replace("{month}", n[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", leadingZero(l.seconds)).replace("{am_pm}", c)
    }

    function _(e, t, o, n, i) {
        e *= 1e3, void 0 === o && (o = !0), void 0 === n && (n = d("months_of", "raw")), t *= 1e3;
        var r = Date.now(),
            a = new Date(r),
            s = new Date(e + t);
        return !i && e > r && e - r < 864e5 && a.getDate() == s.getDate() ? u(e, "{hour}:{minute} {am_pm}", t, [], !o) : s.getYear() != a.getYear() || e < r - 157248e5 ? u(e, d("global_date", "raw"), t, n, !o) : u(e, d("global_short_date", "raw"), t, n, !o)
    }

    function p(e, t, o, n) {
        return isToday(new Date(1e3 * e + 1e3 * t)) ? u(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !o) : _(e, t, o, n)
    }

    function f(e, t, o) {
        return isArray(t) && e < t.length ? t[e] : a(e, o)
    }

    function h(e, t) {
        var o = "";
        e += t;
        var n = parseInt(Date.now() / 1e3) - e;
        if (n < 60) o = d("global_just_now");
        else if (n < 3600) {
            o = f(intval(n / 60), d("global_word_mins_ago", "raw"), d("global_mins_ago", "raw"))
        } else if (n < 14400) {
            o = f(intval(n / 3600), d("global_word_hours_ago", "raw"), d("global_hours_ago", "raw"))
        } else o = w(e, 0, !0, "_l");
        return o
    }

    function w(e, t, o, n) {
        void 0 === o && (o = !0), void 0 === t && (t = 0), void 0 === n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            r = new Date;
        return i.getFullYear() != r.getFullYear() && i.getTime() < r.getTime() - 1728e5 || Math.abs(i.getTime() - r.getTime()) > 157248e5 ? u(1e3 * e, d("global_date", "raw"), t, d("months_sm_of"), !o) : u(1e3 * e, d("global_short_date_time" + n, "raw"), t, d("months_sm_of"), !o)
    }

    function v(e, t, o) {
        void 0 === o && (o = !0), void 0 === t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            r = n.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            c = a.getMonth();
        return u(1e3 * e, d(s < i && (r > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, d("months_sm_of", "raw"), !o)
    }
    o.r(t), o.d(t, "parseLatin", function() {
        return n
    }), o.d(t, "parseCyr", function() {
        return i
    }), o.d(t, "parseLatKeys", function() {
        return r
    }), o.d(t, "langNumeric", function() {
        return a
    }), o.d(t, "langSex", function() {
        return s
    }), o.d(t, "langStr", function() {
        return c
    }), o.d(t, "addLangKeys", function() {
        return l
    }), o.d(t, "getLang", function() {
        return d
    }), o.d(t, "langDate", function() {
        return u
    }), o.d(t, "getShortDate", function() {
        return _
    }), o.d(t, "getShortDateOrTime", function() {
        return p
    }), o.d(t, "langWordNumeric", function() {
        return f
    }), o.d(t, "getDateText", function() {
        return h
    }), o.d(t, "getBigDateNew", function() {
        return w
    }), o.d(t, "getSmDate", function() {
        return v
    }), window.parseLatin = n, window.parseCyr = i, window.parseLatKeys = r, window.langNumeric = a, window.langSex = s, window.langStr = c, window.addLangKeys = l, window.getLang = d, window.langDate = u, window.getShortDate = _, window.getShortDateOrTime = p, window.langWordNumeric = f, window.getDateText = h, window.getBigDateNew = w, window.getSmDate = v
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(0),
        i = o(82),
        r = o(51),
        a = o(103);
    var s = function() {
        function e(t, o) {
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.constructor !== e) throw new Error("ElementTooltip was called without 'new' operator");
            if (!(t = ge(t)) || !t.nodeType) throw new Error("First argument not a DOM element");
            if (Object(n.data)(t, "ett")) return Object(n.data)(t, "ett");
            if (this._opts = extend({
                    delay: 100,
                    offset: [0, 0],
                    shift: 0,
                    type: e.TYPE_VERTICAL,
                    id: "",
                    cls: "",
                    width: null,
                    appendToParent: !1,
                    autoShow: !0,
                    autoHide: !1,
                    noHideOnClick: !1,
                    arrowSize: "normal",
                    customShow: !1,
                    align: e.ALIGN_CENTER
                }, o), this._opts.customShow && (this._opts.autoShow = !1), this._opts.defaultSide || (this._opts.defaultSide = this._opts.type === e.TYPE_VERTICAL ? "top" : "left"), this._opts.cls += " eltt_arrow_size_" + this._opts.arrowSize, this._opts.cls += " eltt_align_" + this._opts.align, this._opts.noBorder && (this._opts.cls += " eltt_noborder"), this._opts.type !== e.TYPE_VERTICAL && delete this._opts.shift, this._opts.setPos && !this._opts.forceSide) throw new Error("forceSide parameter should be set if you use setPos");
            this._opts.forceSide && (this._opts.type = Object(i.inArray)(this._opts.forceSide, ["top", "bottom"]) ? e.TYPE_VERTICAL : e.TYPE_HORIZONTAL), this._appendToEl = this._opts.appendTo ? this._opts.appendTo : this._opts.appendToParent ? Object(n.domClosestPositioned)(t, {
                noOverflow: !0
            }) : t, this._arrowSize = {
                mini: e.ARROW_SIZE_MINI,
                normal: e.ARROW_SIZE_NORMAL,
                big: e.ARROW_SIZE_BIG
            }[this._opts.arrowSize], this._opts.forceSide && (this._opts.type = e.getType(this._opts.forceSide)), this._el = t, Object(n.data)(this._el, "ett", this), this._initEvents(t), this._clearTimeouts(), this._isShown = !1
        }
        return e.prototype._initEvents = function(e) {
            var t = this;
            this._opts.autoShow && (this._el_me_event = this._onMouseEnter.bind(this), addEvent(e, "mouseenter", this._el_me_event)), (this._opts.autoShow || this._opts.autoHide) && (this._el_ml_event = this._onMouseLeave.bind(this), addEvent(e, "mouseleave", this._el_ml_event)), this._opts.autoShow || this._opts.customShow || (this._el_c_event = function() {
                t._isShown && t._opts.noHideOnClick || t.toggle(!t._isShown)
            }, addEvent(e, "click", this._el_c_event))
        }, e.prototype._onMouseEnter = function(e) {
            clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
        }, e.prototype._onMouseLeave = function(e) {
            this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
        }, e.prototype._onMouseWindowClick = function(e) {
            if (!this._opts.noAutoHideOnWindowClick) {
                for (var t = e.target; t && t !== this._ttel && t !== document.body && t !== this._el;) t = Object(n.domPN)(t);
                if (!hasClass(e.target, "_ap_layer__close")) return t && t !== document.body ? void 0 : (this.hide(!0), Object(r.cancelEvent)(e))
            }
        }, e.prototype.destroy = function() {
            this._el_me_event && Object(r.removeEvent)(this._el, "mouseenter", this._el_me_event), this._el_ml_event && Object(r.removeEvent)(this._el, "mouseleave", this._el_ml_event), this._el_c_event && Object(r.removeEvent)(this._el, "click", this._el_c_event), this._clearTimeouts(), Object(n.removeData)(this._el, "ett"), Object(n.re)(this._ttel), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick);
            var e = void 0;
            this._ttel && (e = geByClass1("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
        }, e.prototype.hide = function(e) {
            this._hide(e)
        }, e.prototype._onTooltipMouseEnter = function(e) {
            this._clearTimeouts()
        }, e.prototype._onTooltipMouseLeave = function(e) {
            this._onMouseLeave()
        }, e.prototype.build = function() {
            if (!this._ttel) {
                this._ttel = Object(n.se)('\n        <div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '">\n          <div class="eltt_arrow_back _eltt_arrow_back">\n            <div class="eltt_arrow"></div>\n          </div>\n          <div class="eltt_content _eltt_content"></div>\n        </div>'), this._ttArrowEl = geByClass1("_eltt_arrow_back", this._ttel);
                var e = geByClass1("_eltt_content", this._ttel);
                this._opts.content && (isString(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
            }
        }, e.prototype.show = function() {
            if (this._isShown) this.updatePosition();
            else {
                if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (this._ev_ttenter = this._onTooltipMouseEnter.bind(this), this._ev_ttleave = this._onTooltipMouseLeave.bind(this), addEvent(this._ttel, "mouseenter", this._ev_ttenter), addEvent(this._ttel, "mouseleave", this._ev_ttleave))), this._opts.width) {
                    var e = Object(i.isFunction)(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
                    Object(n.setStyle)(this._ttel, "width", e)
                }
                Object(n.show)(this._ttel);
                var t = geByClass1("_eltt_content", this._ttel);
                this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this.updatePosition(), this._visTO = setTimeout(addClass.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && addClass(this._el, this._opts.elClassWhenShown), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick), this._ev_wclick = this._onMouseWindowClick.bind(this), addEvent(document, "mousedown", this._ev_wclick)
            }
        }, e.getType = function(t) {
            switch (t) {
                case "top":
                case "bottom":
                    return e.TYPE_VERTICAL;
                case "right":
                case "left":
                    return e.TYPE_HORIZONTAL
            }
        }, e.prototype.getOptions = function() {
            return this._opts
        }, e.prototype.updatePosition = function() {
            var t = this,
                o = this._opts.forceSide,
                r = !!this._opts.getTargetBoundingBox && this._opts.getTargetBoundingBox(this);
            if (!r) {
                var s = Object(n.getXY)(this._el),
                    c = Object(n.getSize)(this._el);
                r = {
                    left: s[0],
                    top: s[1],
                    width: c[0],
                    height: c[1]
                }
            }
            var l = Object(n.gpeByClass)("audio_layer_container", this._ttel),
                d = l || Object(n.domClosestOverflowHidden)(this._ttel),
                u = d !== bodyNode ? Object(n.getXY)(d) : [Object(a.scrollGetX)(), Object(a.scrollGetY)() + getPageHeaderHeight()],
                _ = d !== bodyNode ? Object(n.getSize)(d) : [window.innerWidth, window.innerHeight],
                p = Object(n.getSize)(this._ttel),
                f = this._arrowSize,
                h = this._opts.noBorder ? 0 : 1,
                w = Object(i.isFunction)(this._opts.offset) ? this._opts.offset() : this._opts.offset,
                v = void 0,
                g = function(o, i) {
                    var a = {},
                        s = ["marginLeft", "marginTop"].indexOf(o),
                        c = void 0;
                    c = t._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? p[s] - Math.max(h + f + (i || 0), Math.min(p[s], r[s ? "height" : "width"]) / 2) : t._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? Math.max(h + f + (i || 0), Math.min(p[s], r[s ? "height" : "width"]) / 2) : p[s] / 2, a[o] = Math.floor(c) - h - f - (i || 0), Object(n.setStyle)(t._ttArrowEl, a)
                };
            if (this._opts.setPos) v = this._opts.setPos(this) || {}, e.getType(o) === e.TYPE_VERTICAL ? void 0 !== v.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginLeft: v.arrowPosition
            }) : g("marginLeft") : void 0 !== v.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginTop: v.arrowPosition
            }) : g("marginTop");
            else {
                if (!o && this._prevSide && this._opts.preventSideChange) o = this._prevSide;
                else if (!o)
                    if (this._opts.type === e.TYPE_VERTICAL) {
                        var m = hasClass(bodyNode, "body_im") ? 60 : this._opts.bottomGap || 0,
                            b = r.top - u[1] > p[1] + f - w[1],
                            y = Object(a.scrollGetY)() + _[1] - (r.top + r.height + f) - m > p[1];
                        o = "top" === this._opts.defaultSide ? b ? "top" : "bottom" : y ? "bottom" : "top"
                    } else o = r.left - u[0] < p[0] ? "right" : "left";
                var k = Object(n.getXY)(this._appendToEl),
                    x = [r.left - k[0], r.top - k[1]],
                    C = void 0,
                    T = w[0] + x[0];
                this._opts.centerShift ? (T += this._opts.centerShift || 0, C = this._opts.centerShift) : this._opts.rightShift && (T += C = -(p[0] / 2 - this._opts.rightShift)), this._prevSide = o;
                var E = void 0,
                    L = void 0,
                    S = void 0;
                switch (this._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? (E = r.width - p[0], L = r.height - p[1]) : this._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? (E = 0, L = 0) : (E = -p[0] / 2 + r.width / 2, L = r.height / 2 - p[1] / 2), o) {
                    case "bottom":
                        (S = E + r.left + w[0] + p[0] + 20 - (u[0] + _[0])) < 0 && (S = 0), C = C ? C - S : -S, v = {
                            left: E + T - S,
                            top: r.height + f - w[1] + x[1]
                        };
                        break;
                    case "top":
                        (S = E + r.left + w[0] + p[0] + 20 - (u[0] + _[0])) < 0 && (S = 0), C = C ? C - S : -S, v = {
                            left: E + T - S,
                            top: -p[1] - f + w[1] + x[1]
                        };
                        break;
                    case "right":
                        (S = L + r.top + w[1] - (u[1] + 20)) > 0 && (S = 0), C = C ? C - S : -S, v = {
                            left: r.width + f + T,
                            top: L + w[1] + x[1] - S
                        };
                        break;
                    case "left":
                        (S = L + r.top + w[1] - (u[1] + 20)) > 0 && (S = 0), C = C ? C - S : -S, v = {
                            left: -p[0] - f + T,
                            top: L + w[1] + x[1] - S
                        }
                }
                this._opts.type === e.TYPE_VERTICAL ? g("marginLeft", C) : g("marginTop", C)
            }
            Object(i.each)(["top", "bottom", "left", "right"], function(e, t) {
                o !== t && removeClass(this._ttel, "eltt_" + t)
            }.bind(this)), addClass(this._ttel, "eltt_" + o), Object(n.setStyle)(this._ttel, v)
        }, e.prototype._hide = function(t) {
            if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                    hide(this._ttel), this._opts.elClassWhenShown && removeClass(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!t)
                }.bind(this), e.FADE_SPEED), this._opts.onBeforeHide) try {
                this._opts.onBeforeHide(this._ttel, !!t)
            } catch (e) {}
            removeClass(this._ttel, "eltt_vis"), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick)
        }, e.prototype.isShown = function() {
            return this._isShown
        }, e.prototype.toggle = function() {
            this.isShown() ? this.hide() : this.show()
        }, e.prototype._clearTimeouts = function() {
            this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
        }, e.prototype.getContent = function() {
            return geByClass1("_eltt_content", this._ttel)
        }, e
    }();
    s.TYPE_VERTICAL = 0, s.TYPE_HORIZONTAL = 1, s.FADE_SPEED = 100, s.ARROW_SIZE_MINI = 9, s.ARROW_SIZE_NORMAL = 8, s.ARROW_SIZE_BIG = 16, s.ALIGN_LEFT = "left", s.ALIGN_CENTER = "center", s.ALIGN_RIGHT = "right", window.ElementTooltip = s
}, function(e, t, o) {
    var n;
    ! function(t) {
        'eat script';

        function i() {}
        var r = i.prototype,
            a = t.EventEmitter;

        function s(e, t) {
            for (var o = e.length; o--;)
                if (e[o].listener === t) return o;
            return -1
        }

        function c(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        r.getListeners = function(e) {
            var t, o, n = this._getEvents();
            if (e instanceof RegExp)
                for (o in t = {}, n) n.hasOwnProperty(o) && e.test(o) && (t[o] = n[o]);
            else t = n[e] || (n[e] = []);
            return t
        }, r.flattenListeners = function(e) {
            var t, o = [];
            for (t = 0; t < e.length; t += 1) o.push(e[t].listener);
            return o
        }, r.getListenersAsObject = function(e) {
            var t, o = this.getListeners(e);
            return o instanceof Array && ((t = {})[e] = o), t || o
        }, r.addListener = function(e, t) {
            if (! function e(t) {
                    return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
                }(t)) throw new TypeError("listener must be a function");
            var o, n = this.getListenersAsObject(e),
                i = "object" == typeof t;
            for (o in n) n.hasOwnProperty(o) && -1 === s(n[o], t) && n[o].push(i ? t : {
                listener: t,
                once: !1
            });
            return this
        }, r.on = c("addListener"), r.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, r.once = c("addOnceListener"), r.defineEvent = function(e) {
            return this.getListeners(e), this
        }, r.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, r.removeListener = function(e, t) {
            var o, n, i = this.getListenersAsObject(e);
            for (n in i) i.hasOwnProperty(n) && -1 !== (o = s(i[n], t)) && i[n].splice(o, 1);
            return this
        }, r.off = c("removeListener"), r.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, r.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, r.manipulateListeners = function(e, t, o) {
            var n, i, r = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = o.length; n--;) r.call(this, t, o[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (i = t[n]) && ("function" == typeof i ? r.call(this, n, i) : a.call(this, n, i));
            return this
        }, r.removeEvent = function(e) {
            var t, o = typeof e,
                n = this._getEvents();
            if ("string" === o) delete n[e];
            else if (e instanceof RegExp)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, r.removeAllListeners = c("removeEvent"), r.emitEvent = function(e, t) {
            var o, n, i, r, a = this.getListenersAsObject(e);
            for (r in a)
                if (a.hasOwnProperty(r))
                    for (o = a[r].slice(0), i = 0; i < o.length; i++) !0 === (n = o[i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, r.trigger = c("emitEvent"), r.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, r.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, r._getOnceReturnValue = function() {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, r._getEvents = function() {
            return this._events || (this._events = {})
        }, i.noConflict = function() {
            return t.EventEmitter = a, i
        }, void 0 === (n = function() {
            return i
        }.call(t, o, t, e)) || (e.exports = n)
    }(this || {})
}, function(e, t, o) {
    var n = o(110);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var o, i;
        if (t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        if ("function" == typeof(o = e.valueOf) && !n(i = o.call(e))) return i;
        if (!t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, o) {
    var n = o(45)("keys"),
        i = o(66);
    e.exports = function(e) {
        return n[e] || (n[e] = i(e))
    }
}, function(e, t, o) {
    var n = o(60),
        i = o(24);
    e.exports = o(98) ? function(e, t, o) {
        return n.f(e, t, i(1, o))
    } : function(e, t, o) {
        return e[t] = o, e
    }
}, function(e, t) {
    var o = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = o)
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t, o) {
    var n = o(35),
        i = o(87);
    e.exports = function(e) {
        return n(i(e))
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, o) {
    var n = o(30)("iterator"),
        i = !1;
    try {
        var r = [7][n]();
        r.return = function() {
            i = !0
        }, Array.from(r, function() {
            throw 2
        })
    } catch (e) {}
    e.exports = function(e, t) {
        if (!t && !i) return !1;
        var o = !1;
        try {
            var r = [7],
                a = r[n]();
            a.next = function() {
                o = !0
            }, r[n] = function() {
                return a
            }, e(r)
        } catch (e) {}
        return o
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, o) {
    var n = o(66)("meta"),
        i = o(110),
        r = o(55),
        a = o(60).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        l = !o(19)(function() {
            return c(Object.preventExtensions({}))
        }),
        d = function(e) {
            a(e, n, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        u = e.exports = {
            KEY: n,
            NEED: !1,
            fastKey: function(e, t) {
                if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!r(e, n)) {
                    if (!c(e)) return "F";
                    if (!t) return "E";
                    d(e)
                }
                return e[n].i
            },
            getWeak: function(e, t) {
                if (!r(e, n)) {
                    if (!c(e)) return !0;
                    if (!t) return !1;
                    d(e)
                }
                return e[n].w
            },
            onFreeze: function(e) {
                return l && u.NEED && c(e) && !r(e, n) && d(e), e
            }
        }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "showStory", function() {
        return i
    }), o.d(t, "storiesPreloadStatic", function() {
        return a
    }), o.d(t, "sendMask", function() {
        return c
    });
    var n = !1;

    function i(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (cur.storiesNotSupported) return showFastBox(getLang("global_error"), getLang("stories_bad_browser"));
        curBox() && curBox().bodyNode.contains(t.fromEl) && (curBox().hide(), t.fromEl = null), clearTimeout(n), n = setTimeout(function() {
            bodyNode.appendChild(ce("div", {
                id: "stories_loader",
                innerHTML: getProgressHtml("stories_loader_pr", "pr_baw pr_medium") + '<div class="back"></div>'
            }))
        }, 1e3), stManager.add(["stories.js", "stories.css", jsc("web/emoji.js")], function() {
            var o = window.Stories;
            clearTimeout(n), re("stories_loader"), o.show(e, t)
        })
    }
    var r = !1;

    function a() {
        r || cur.storiesNotSupported || (r = !0, stManager.add(["stories.js", "stories.css"]))
    }
    var s = !1;

    function c(e, t) {
        s || (s = !0, ajax.post("al_stories.php", {
            act: "send_mask",
            mask_id: e,
            hash: t
        }, {
            loader: !0,
            onDone: function(e, t, o, n) {
                "cant_send" === e ? showFastBox({
                    title: t,
                    width: 460
                }, o, n) : showDoneBox(getLang("stories_mask_sent")), s = !1
            },
            onFail: function() {
                return s = !1, showFastBox({
                    title: getLang("global_box_error_title")
                }, getLang("global_unknown_error")), !0
            }
        }))
    }
    window.showStory = i, window.storiesPreloadStatic = a, window.sendMask = c
}, function(e, t, o) {
    'eat script';
    o.r(t), Number.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(71),
        i = o(24),
        r = o(50),
        a = {};
    o(17)(a, o(30)("iterator"), function() {
        return this
    }), e.exports = function(e, t, o) {
        e.prototype = n(a, {
            next: i(1, o)
        }), r(e, t + " Iterator")
    }
}, function(e, t, o) {
    var n = o(87);
    e.exports = function(e) {
        return Object(n(e))
    }
}, function(e, t, o) {
    var n = o(45)("wks"),
        i = o(66),
        r = o(18).Symbol,
        a = "function" == typeof r;
    e.exports = function(e) {
        return n[e] || (n[e] = a && r[e] || (a ? r : i)("Symbol." + e))
    }
}, function(e, t, o) {
    var n = o(21),
        i = o(104),
        r = o(102);
    e.exports = function(e) {
        return function(t, o, a) {
            var s, c = n(t),
                l = i(c.length),
                d = r(a, l);
            if (e && o != o) {
                for (; l > d;)
                    if ((s = c[d++]) != s) return !0
            } else
                for (; l > d; d++)
                    if ((e || d in c) && c[d] === o) return e || d;
            return !e && -1
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "EMPTY", function() {
        return n
    }), o.d(t, "UNSTARTED", function() {
        return i
    }), o.d(t, "PLAYING", function() {
        return r
    }), o.d(t, "PAUSED", function() {
        return a
    }), o.d(t, "ENDED", function() {
        return s
    }), o.d(t, "ERROR", function() {
        return c
    });
    var n = "empty",
        i = "unstarted",
        r = "playing",
        a = "paused",
        s = "ended",
        c = "error"
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, o) {
    var n = o(10);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t, o) {
    var n = o(18),
        i = o(17),
        r = o(55),
        a = o(66)("src"),
        s = Function.toString,
        c = ("" + s).split("toString");
    o(88).inspectSource = function(e) {
        return s.call(e)
    }, (e.exports = function(e, t, o, s) {
        var l = "function" == typeof o;
        l && (r(o, "name") || i(o, "name", t)), e[t] !== o && (l && (r(o, a) || i(o, a, e[t] ? "" + e[t] : c.join(String(t)))), e === n ? e[t] = o : s ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
    })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[a] || s.call(this)
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), Array.from || (Array.from = function(e) {
        return [].slice.call(e)
    })
}, function(e, t, o) {
    var n = o(110),
        i = o(18).document,
        r = n(i) && n(i.createElement);
    e.exports = function(e) {
        return r ? i.createElement(e) : {}
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "showVideo", function() {
        return showVideo
    }), __webpack_require__.d(__webpack_exports__, "showInlineVideo", function() {
        return showInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "loadInlineVideo", function() {
        return loadInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "revertLastInlineVideo", function() {
        return revertLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "destroyInlineVideoPlayer", function() {
        return destroyInlineVideoPlayer
    }), __webpack_require__.d(__webpack_exports__, "pauseLastInlineVideo", function() {
        return pauseLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "playLastInlineVideo", function() {
        return playLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "checkMp4", function() {
        return checkMp4
    });
    var _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);

    function showVideo(e, t, o, n) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!checkEvent(n)) {
            if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == e) return Videoview.unminimize(), !1;
            o || (o = {});
            var i = nav.objLoc.claim,
                r = !(!o.addParams || !/^-?\d+_\d+$/.test(o.addParams.post_id)) && o.addParams.post_id;
            if (!o.playlistId && r && (/^public|groups|profile$/.test(cur.module) && hasClass("post" + r, "own") ? o.playlistId = "wall_" + cur.oid : o.playlistId = "post_" + o.addParams.post_id), o.playlistId && (o.addParams = extend(o.addParams, {
                    playlist_id: o.playlistId
                }), !window.VideoPlaylist || !VideoPlaylist.getList(o.playlistId)))
                if (/^wall_/.test(o.playlistId)) {
                    var a = cur.wallVideos && cur.wallVideos[o.playlistId];
                    o.addParams.load_playlist = a && a.list.length >= 50 ? 0 : 1
                } else o.addParams.load_playlist = !/^(?:post_)?-?\d+_-?\d+$/.test(o.playlistId) || cur.pageVideosList && cur.pageVideosList[o.playlistId] ? 0 : 1;
            !o.expandPlayer && cur.videoInlinePlayer && cur.videoInlinePlayer.getVideoId() == e && cur.videoInlinePlayer.canExpand() && (o.expandPlayer = cur.videoInlinePlayer), o.expandPlayer && (o.addParams = extend(o.addParams, {
                expand_player: 1
            }), delete cur.videoInlinePlayer);
            var s = new CallHub(function() {
                o.hidden ? o.hidden(s.data, o, t, e) : Videoview.showVideo.apply(Videoview, s.data)
            }, 2);
            stManager.add(["videoview.js", "videoview.css", "page.js", "page.css"], function() {
                s.failed || (o.hidden || (revertLastInlineVideo(), Videoview.show(n, e, t, o)), s.done())
            }), extend(o, {
                onDone: function() {
                    var t = Array.prototype.slice.call(arguments);
                    t.unshift(e), s.data = t, s.done()
                },
                onFail: function(t) {
                    if (s.failed = 1, !o.hidden) {
                        if (window.mvcur && mvcur.mvShown) Videoview.hide();
                        else {
                            var n = clone(nav.objLoc);
                            n.z == "video" + e && delete n.z, n[0] == "video" + e && (n[0] = "videos" + e.split("_")[0]), nav.setLoc(n)
                        }
                        showFastBox(getLang("global_error"), t || getLang("global_error_occured"))
                    }
                    return !0
                },
                cache: "status" != t
            });
            var c = o.params;
            return c || (c = {
                act: "show",
                video: e,
                list: t,
                autoplay: o.autoplay ? 1 : 0,
                ad_video: o.ad_video,
                module: o.module || currentModule() || "",
                svids: o.svids
            }), o.addParams && (c = extend(c, o.addParams)), trim(c.module) || extend(c, {
                _nol: JSON.stringify(nav.objLoc)
            }), i && (c.claim = i), ajax.post("al_video.php", c, o), vkImage().src = locProtocol + "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", cur.articleLayer && cur.articleLayer.videoOpened(), !1
        }
    }

    function showInlineVideo(videoId, listId, options, ev, thumb) {
        if (checkEvent(ev)) return !0;
        if (window.mvcur && mvcur.mvShown) return showVideo(videoId, listId, options, ev);
        if (attr(thumb, "data-loading")) return !1;
        options = options || {};
        var h = thumb.clientHeight,
            w = thumb.clientWidth,
            btn = domByClass(thumb, "page_post_video_play_inline"),
            onLoaded = options.onLoaded;
        onLoaded && delete options.onLoaded;
        var params = {
            video: videoId,
            list: listId,
            autoplay: options.autoplay,
            module: options.module
        };
        return domData(thumb, "stretch-vertical") && (params.stretch_vertical = 1), extend(params, options.addParams), showProgress(), loadInlineVideo(params, function(e, t) {
            hideProgress(), e ? onDone.apply(null, t) : onFail.apply(null, t)
        }, options.cache), cur.videoInlinePlayerDestroyerSet || (cur.destroy.push(destroyInlineVideoPlayer), cur.videoInlinePlayerDestroyerSet = 1), vkImage().src = "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", !1;

        function onDone(title, html, js, opts) {
            revertLastInlineVideo(), hide(thumb);
            var videoWrap = ce("div", {
                innerHTML: html
            }, {
                width: w,
                height: h
            });
            if (window._videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = !(!opts || !opts.mvData) && opts.mvData, opts.player) {
                var container = domByClass(videoWrap, "video_box_wrap");
                isFunction(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded), VideoInitializer.initPlayer(container, opts.player.type, opts.player.params)
            }
            try {
                eval("(function () {" + js + "})();")
            } catch (e) {}
            if (!params.from_autoplay) {
                var notifier = window.Notifier;
                notifier && setTimeout(function() {
                    return notifier.lcSend("video_start")
                }, 0);
                var audioPlayer = window.ap;
                audioPlayer && audioPlayer.isPlaying() && (audioPlayer.pause(), audioPlayer.pausedByVideo = vkNow())
            }
            thumb.setAttribute("data-playing", 1)
        }

        function onFail(e) {
            params.from_autoplay || showFastBox(getLang("global_error"), e || getLang("global_error_occured"))
        }

        function showProgress() {
            thumb.setAttribute("data-loading", 1), options.no_progress || (addClass(btn, "page_post_video_play_inline_loading"), val(btn, getProgressHtml()))
        }

        function hideProgress() {
            thumb.removeAttribute("data-loading"), options.no_progress || (removeClass(btn, "page_post_video_play_inline_loading"), val(btn, ""))
        }
    }

    function loadInlineVideo(e, t, o) {
        var n = extend({
            autoplay: 0,
            module: cur.module
        }, e);
        trim(n.module) || (n._nol = JSON.stringify(nav.objLoc));
        var i = ["videoview.js"];

        function r(e, o) {
            isFunction(t) && t(e, o)
        }
        n.from_autoplay && i.push("videoplayer.js", "videoplayer.css", "hls.min.js"), ajax.post("al_video.php?act=show_inline", n, {
            onDone: function() {
                r(!0, [].slice.call(arguments))
            },
            onFail: function() {
                return r(!1, [].slice.call(arguments)), !0
            },
            stat: i,
            local: 1,
            cache: o
        })
    }

    function revertLastInlineVideo(e) {
        if (_videoLastInlined) {
            var t = void 0,
                o = !1,
                n = ge(e);
            if (n && (t = _videoLastInlined[0])) {
                for (; t = t.parentNode;)
                    if (t == n) {
                        o = !0;
                        break
                    }
                if (!o) return
            }
            re(_videoLastInlined[0]), show(_videoLastInlined[1]), _videoLastInlined[1].removeAttribute("data-playing"), _videoLastInlined = !1, destroyInlineVideoPlayer(), delete cur.mvOpts
        }
    }

    function destroyInlineVideoPlayer() {
        cur.videoInlinePlayer && (cur.videoInlinePlayer.destroy(), delete cur.videoInlinePlayer)
    }

    function pauseLastInlineVideo() {
        if (_videoLastInlined) {
            var e = cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube;
            if (e) {
                if (e.isActiveLive && e.isActiveLive()) return;
                cur.mvOpts.lastPlayerState = e.getState(), e.togglePlay(!1)
            }
        }
    }

    function playLastInlineVideo() {
        if (_videoLastInlined && cur.mvOpts && cur.mvOpts.lastPlayerState === _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__.PLAYING) {
            var e = cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube;
            e && e.togglePlay(!0)
        }
    }

    function checkMp4(e) {
        if (browser.smart_tv) e(!0);
        else if (ls.get("video_can_play_mp4")) e(!0);
        else {
            var t = window.sessionStorage && sessionStorage.getItem("video_can_play_mp4");
            if (null == t) {
                var o = void 0,
                    n = void 0,
                    i = ce("video");
                i.canPlayType && i.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace("no", "") ? (i.onloadedmetadata = r.pbind(!0), i.onerror = function() {
                    r(!1, "error_" + i.error.code)
                }, i.src = "/images/blank.mp4", i.load(), o = setTimeout(r.pbind(!1, "timeout"), 3e3)) : r(!1, "video_type")
            } else e(!!intval(t))
        }

        function r(t, r) {
            if (!n) {
                n = !0;
                var a = t ? window.localStorage : window.sessionStorage;
                try {
                    a.setItem("video_can_play_mp4", intval(t))
                } catch (e) {}
                e(t, r), clearTimeout(o), i.src = "", i.load(), i.onerror = null, i.onloadedmetadata = null, i = null
            }
        }
    }
    window._videoLastInlined = !1, window.VideoConstants = {
        VIDEO_ITEM_INDEX_OWNER_ID: 0,
        VIDEO_ITEM_INDEX_ID: 1,
        VIDEO_ITEM_INDEX_THUMB: 2,
        VIDEO_ITEM_INDEX_TITLE: 3,
        VIDEO_ITEM_INDEX_FLAGS: 4,
        VIDEO_ITEM_INDEX_DURATION: 5,
        VIDEO_ITEM_INDEX_HASH: 6,
        VIDEO_ITEM_INDEX_MODER_ACTS: 7,
        VIDEO_ITEM_INDEX_OWNER: 8,
        VIDEO_ITEM_INDEX_DATE: 9,
        VIDEO_ITEM_INDEX_VIEWS: 10,
        VIDEO_ITEM_INDEX_PLATFORM: 11,
        VIDEO_ITEM_FLAG_EXTERNAL: 1,
        VIDEO_ITEM_FLAG_ACTIVE_LIVE: 2,
        VIDEO_ITEM_FLAG_CAN_EDIT: 64,
        VIDEO_ITEM_FLAG_CAN_DELETE: 128,
        VIDEO_ITEM_FLAG_CAN_ADD: 256,
        VIDEO_ITEM_FLAG_PRIVATE: 512,
        VIDEO_ITEM_FLAG_NO_AUTOPLAY: 1024,
        VIDEO_ITEM_FLAG_ADDED: 2048,
        VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD: 4096,
        VIDEO_ITEM_FLAG_NEED_SIGN_IN: 8192,
        VIDEO_ITEM_FLAG_HD: 16384
    }, window.showVideo = showVideo, window.showInlineVideo = showInlineVideo, window.loadInlineVideo = loadInlineVideo, window.revertLastInlineVideo = revertLastInlineVideo, window.destroyInlineVideoPlayer = destroyInlineVideoPlayer, window.pauseLastInlineVideo = pauseLastInlineVideo, window.playLastInlineVideo = playLastInlineVideo, window.checkMp4 = checkMp4
}, function(e, t, o) {
    'eat script';

    function n(e, t, o) {
        if (e = ge(e)) {
            o || elfocus(e), void 0 === data(e, "backstyle") && data(e, "backstyle", e.style.backgroundColor || "");
            var n = data(e, "back") || data(e, "back", getStyle(e, "backgroundColor")),
                i = {
                    notice: "#FFFFE0",
                    warning: "#FAEAEA"
                };
            setStyle(e, "backgroundColor", i[t] || t || i.warning), setTimeout(animate.pbind(e, {
                backgroundColor: n
            }, 300, function() {
                e.style.backgroundColor = data(e, "backstyle")
            }), 400)
        }
    }

    function i(e) {
        if (window.scrollNode && !browser.mobile && window._tbLink) {
            var t = ge("page_body"),
                o = getXY(t),
                n = scrollGetY(),
                i = bodyNode.scrollLeft,
                r = ge("side_bar"),
                a = isVisible(r);
            if (window._stlSideTop = Math.max((a ? getSize(r)[1] : 0) - n - (browser.mozilla ? getXY(pageNode)[1] : 0), o[1]), e || i != __scrLeft) {
                var s = ge("page_layout"),
                    c = vk.rtl ? s.offsetLeft + s.offsetWidth : 0,
                    l = vk.rtl ? (window.lastWindowWidth || 0) - c : s.offsetLeft;
                setStyle(_stlLeft, {
                    width: Math.max(l - 1, 0)
                });
                var d = vk.rtl ? o[0] + t.offsetWidth + 5 : l,
                    u = vk.rtl ? c - d : o[0] - 5 - d;
                setStyle(_stlSide, {
                    left: d - i,
                    width: Math.max(u, 0)
                }), __scrLeft = i
            }
            setStyle(_stlSide, {
                top: _stlSideTop,
                height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
            }), __adsUpdate();
            var _ = _tbLink.loc || _stlWas || n > 200,
                p = 0,
                f = !1,
                h = n > 250 && cur._regBar;
            if (_) {
                1 !== _stlShown && (show(_stlLeft, _stlSide), addClass(_stlLeft, "stl_active"), addClass(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (n = 0), _stlWas && n > 500 && (_stlWas = 0), n > 200 ? (p = (n - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, f = 1, val(_stlText, getLang("global_to_top")), removeClass(_stlText, "down"), removeClass(_stlText, "back"))) : (p = (200 - n) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, f = 0, val(_stlText, ""), addClass(_stlText, "down"), _stlBack && (_stlBack = 0, removeClass(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, f = _tbLink.fast ? 1 : 0, val(_stlText, getLang("global_back")), addClass(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, removeClass(_stlText, "down"))))), !1 !== f && toggleClass(_stlLeft, "over_fast", hasClass(_stlLeft, "over") && f);
                var w = {
                    opacity: Math.min(Math.max(p, 0), 1)
                };
                vk.staticheader && (w.top = -Math.min(getSize("page_header_cont")[1], n)), setStyle(_stlLeft, w)
            } else 0 !== _stlShown && (hide(_stlLeft, _stlSide), _stlShown = 0);
            vk.id || (!_regBar && h ? (_regBar = 1, val(ge("reg_bar_content"), cur._regBar), animate(ge("reg_bar"), {
                top: 0,
                transition: Fx.Transitions.sineInOut
            }, 400), animate(ge("stl_bg"), {
                paddingTop: 60,
                transition: Fx.Transitions.sineInOut
            }, 400)) : _regBar && !h && (_regBar = 0, animate(ge("reg_bar"), {
                top: -56,
                transition: Fx.Transitions.sineInOut
            }, 400), animate(ge("stl_bg"), {
                paddingTop: 13,
                transition: Fx.Transitions.sineInOut
            }, 400)))
        }
    }

    function r(e, t) {
        if ((e = ge(e)) && !e.btnevents)
            if (hasClass(e, "flat_button")) isFunction(t) && (e.onclick = t.pbind(e));
            else {
                var o = e.parentNode;
                if (hasClass(o, "button_blue") || hasClass(o, "button_gray")) isFunction(t) && (e.onclick = t.pbind(e));
                else {
                    var n = !1;
                    addEvent(e, "click mousedown mouseover mouseout", function(i) {
                        if (!hasClass(o, "locked")) switch (i.type) {
                            case "click":
                                if (!n) return;
                                return e.className = "button_hover", t(e), cancelEvent(i);
                            case "mousedown":
                                e.className = "button_down";
                                break;
                            case "mouseover":
                                n = !0, e.className = "button_hover";
                                break;
                            case "mouseout":
                                e.className = "button", n = !1
                        }
                    }), e.btnevents = !0
                }
            }
    }

    function a(e) {
        if (e = ge(e)) return hasClass(e, "ui_actions_menu_item_lock")
    }

    function s(e) {
        if ((e = ge(e)) && hasClass(e, "ui_actions_menu_item") && !hasClass(e, "ui_actions_menu_item_lock")) {
            data(e, "inner", e.innerHTML), addClass(e, "ui_actions_menu_item_lock");
            var t = ce("div", {
                className: "ui_actions_menu_item_lock_text"
            });
            val(t, e.innerHTML), e.appendChild(t), showProgress(e)
        }
    }

    function c(e) {
        (e = ge(e)) && hasClass(e, "ui_actions_menu_item") && hasClass(e, "ui_actions_menu_item_lock") && (removeClass(e, "ui_actions_menu_item_lock"), e.innerHTML = data(e, "inner"))
    }

    function l(e) {
        if (e = ge(e)) return hasClass(e, "link_lock")
    }

    function d(e, t) {
        (e = ge(e)) && "a" == e.tagName.toLowerCase() && !l(e) && (addClass(e, "link_lock"), t && each(t, function(t, o) {
            addClass(e, o)
        }))
    }

    function u(e, t) {
        (e = ge(e)) && l(e) && (removeClass(e, "link_lock"), t && each(t, function(t, o) {
            removeClass(e, o)
        }))
    }

    function _(e) {
        if ((e = ge(e)) && ("button" == e.tagName.toLowerCase() || hasClass(e, "flat_button") || hasClass(e, "wr_header")) && !h(e)) {
            var t = getSize(e);
            addClass(e, "flat_btn_lock"), data(e, "inner", e.innerHTML), setStyle(e, {
                width: t[0],
                height: t[1]
            }), e.innerHTML = "", showProgress(e, "btn_lock")
        }
    }

    function p(e) {
        (e = ge(e)) && h(e) && (hideProgress(e), e.innerHTML = data(e, "inner"), removeClass(e, "flat_btn_lock"), setStyle(e, {
            width: null,
            height: null
        }))
    }

    function f(e) {
        return h(e)
    }

    function h(e) {
        if (e = ge(e)) return hasClass(e, "flat_btn_lock")
    }

    function w(e, t) {
        if ((e = ge(e)) && "button" === e.tagName.toLowerCase())
            if (t) {
                if (!isVisible(e)) return;
                e.parentNode.insertBefore(ce("button", {
                    innerHTML: e.innerHTML,
                    className: e.className + " button_disabled"
                }), e), hide(e)
            } else {
                var o = domPS(e);
                o && hasClass(o, "button_disabled") && re(o), show(e)
            }
    }

    function v(e) {
        if (void 0 === window._sbWidth || e) {
            var t = ce("div", {
                innerHTML: '<div style="height: 75px;">1<br>1</div>'
            }, {
                overflowY: "scroll",
                position: "absolute",
                width: "50px",
                height: "50px"
            });
            bodyNode.appendChild(t), window._sbWidth = Math.max(0, t.offsetWidth - t.firstChild.offsetWidth - 1), bodyNode.removeChild(t)
        }
        return window._sbWidth
    }

    function g(e) {
        return e = ge(e), hasClass(e, "on") ? 1 : ""
    }

    function m(e, t) {
        if ((e = ge(e)) && !hasClass(e, "disabled")) return void 0 === t && (t = !g(e)), toggleClass(e, "on", t), e.setAttribute("aria-checked", t ? "true" : "false"), !1
    }

    function b(e, t) {
        return e = ge(e), void 0 === t && (t = !hasClass(e, "disabled")), toggleClass(e, "disabled", t), "INPUT" == e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    }

    function y(e) {
        return !!radioBtns[e] && radioBtns[e].val
    }

    function k(e, t, o) {
        if (radioBtns[o] && !hasClass(e, "disabled")) return each(radioBtns[o].els, function() {
            this == e ? (addClass(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (removeClass(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
        }), radioBtns[o].val = t
    }
    o.r(t), o.d(t, "notaBene", function() {
        return n
    }), o.d(t, "updSideTopLink", function() {
        return i
    }), o.d(t, "createButton", function() {
        return r
    }), o.d(t, "actionsMenuItemLocked", function() {
        return a
    }), o.d(t, "lockActionsMenuItem", function() {
        return s
    }), o.d(t, "unlockActionsMenuItem", function() {
        return c
    }), o.d(t, "linkLocked", function() {
        return l
    }), o.d(t, "lockLink", function() {
        return d
    }), o.d(t, "unlockLink", function() {
        return u
    }), o.d(t, "lockButton", function() {
        return _
    }), o.d(t, "unlockButton", function() {
        return p
    }), o.d(t, "buttonLocked", function() {
        return f
    }), o.d(t, "isButtonLocked", function() {
        return h
    }), o.d(t, "disableButton", function() {
        return w
    }), o.d(t, "sbWidth", function() {
        return v
    }), o.d(t, "isChecked", function() {
        return g
    }), o.d(t, "checkbox", function() {
        return m
    }), o.d(t, "disable", function() {
        return b
    }), o.d(t, "radioval", function() {
        return y
    }), o.d(t, "radiobtn", function() {
        return k
    }), window.__scrLeft = 0, window.radioBtns = {}, window.notaBene = n, window.updSideTopLink = i, window.createButton = r, window.actionsMenuItemLocked = a, window.lockActionsMenuItem = s, window.unlockActionsMenuItem = c, window.linkLocked = l, window.lockLink = d, window.unlockLink = u, window.lockButton = _, window.unlockButton = p, window.buttonLocked = f, window.isButtonLocked = h, window.disableButton = w, window.sbWidth = v, window.isChecked = g, window.checkbox = m, window.disable = b, window.radioval = y, window.radiobtn = k
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';

    function topMsg(e, t, o) {
        if (o || (o = "#D6E5F7"), e) {
            clearTimeout(window.topMsgTimer);
            var n = ge("system_msg");
            n.style.backgroundColor = o, n.innerHTML = e, show(n), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
        } else hide("system_msg")
    }

    function topError(text, opts) {
        if (opts || (opts = {}), text.message) {
            var e = text;
            text = "<b>JavaScript error:</b> " + e.message, opts.stack = e.stack, e.stack && __debugMode && (text += "<br/>" + e.stack.replace(/\n/g, "<br/>"));
            try {
                console.log(e.stack)
            } catch (e) {}
        }
        if (!opts.stack) try {
            eval("0 = 1")
        } catch (e) {
            opts.stack = e.stack
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || ge("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", extend(opts, {
            msg: opts.msg || text,
            module: (window.cur || {}).module,
            id: vk.id,
            host: locHost,
            lang: vk.lang,
            loc: (window.nav || {}).strLoc,
            realloc: location.toString()
        })))
    }

    function showMsg(e, t, o, n) {
        var i = "msg" + ("msg" !== o ? " " + o : "");
        n && (i += " msg_appear"), e = ge(e);
        var r = geByClass1(o, e),
            a = r || domFC(e),
            s = e.insertBefore(ce("div", {
                className: i,
                innerHTML: '<div class="msg_text">' + t + "</div>"
            }), a);
        r && re(r), setTimeout(removeClass.pbind(s, "msg_appear"), 0)
    }
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
        return topMsg
    }), __webpack_require__.d(__webpack_exports__, "topError", function() {
        return topError
    }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
        return showMsg
    }), window.topMsg = topMsg, window.showMsg = showMsg, window.topError = topError
}, function(e, t, o) {
    'eat script';
    var n = o(80);
    e.exports = o(78)("Set", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function(e) {
            return n.def(this, e = 0 === e ? 0 : e, e)
        }
    }, n)
}, function(e, t, o) {
    (function(n, i) {
        var r;
        (function() {
            'eat script';

            function a(e) {
                return "function" == typeof e
            }
            var s, c, l = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                d = 0,
                u = function(e, t) {
                    x[d] = e, x[d + 1] = t, 2 === (d += 2) && (c ? c(C) : g())
                };
            var _ = "undefined" != typeof window ? window : void 0,
                p = _ || {},
                f = p.MutationObserver || p.WebKitMutationObserver,
                h = void 0 !== n && "[object process]" === {}.toString.call(n),
                w = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function v() {
                return function() {
                    setTimeout(C, 1)
                }
            }
            var g, m, b, y, k, x = new Array(1e3);

            function C() {
                for (var e = 0; e < d; e += 2) {
                    (0, x[e])(x[e + 1]), x[e] = void 0, x[e + 1] = void 0
                }
                d = 0
            }
            h ? g = function() {
                n.nextTick(C)
            } : f ? (b = 0, y = new f(C), k = document.createTextNode(""), y.observe(k, {
                characterData: !0
            }), g = function() {
                k.data = b = ++b % 2
            }) : w ? ((m = new MessageChannel).port1.onmessage = C, g = function() {
                m.port2.postMessage(0)
            }) : g = void 0 === _ ? function() {
                try {
                    var e = o(63);
                    return s = e.runOnLoop || e.runOnContext,
                        function() {
                            s(C)
                        }
                } catch (e) {
                    return v()
                }
            }() : v();
            var T = function(e, t) {
                var o = this._state;
                if (o === B && !e || o === O && !t) return this;
                var n = new this.constructor(L),
                    i = this._result;
                if (o) {
                    var r = arguments[o - 1];
                    u(function() {
                        W(o, n, r, i)
                    })
                } else F(this, n, e, t);
                return n
            };
            var E = function(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(L);
                return j(t, e), t
            };

            function L() {}
            var S = void 0,
                B = 1,
                O = 2,
                P = new H;

            function A(e) {
                try {
                    return e.then
                } catch (e) {
                    return P.error = e, P
                }
            }

            function M(e, t, o) {
                t.constructor === e.constructor && o === T && constructor.resolve === E ? function(e, t) {
                    t._state === B ? D(e, t._result) : t._state === O ? I(e, t._result) : F(t, void 0, function(t) {
                        j(e, t)
                    }, function(t) {
                        I(e, t)
                    })
                }(e, t) : o === P ? I(e, P.error) : void 0 === o ? D(e, t) : a(o) ? function(e, t, o) {
                    u(function(e) {
                        var n = !1,
                            i = function(e, t, o, n) {
                                try {
                                    e.call(t, o, n)
                                } catch (e) {
                                    return e
                                }
                            }(o, t, function(o) {
                                n || (n = !0, t !== o ? j(e, o) : D(e, o))
                            }, function(t) {
                                n || (n = !0, I(e, t))
                            }, e._label);
                        !n && i && (n = !0, I(e, i))
                    }, e)
                }(e, t, o) : D(e, t)
            }

            function j(e, t) {
                var o;
                e === t ? I(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(o = t) || "object" == typeof o && null !== o ? M(e, t, A(t)) : D(e, t)
            }

            function N(e) {
                e._onerror && e._onerror(e._result), q(e)
            }

            function D(e, t) {
                e._state === S && (e._result = t, e._state = B, 0 !== e._subscribers.length && u(q, e))
            }

            function I(e, t) {
                e._state === S && (e._state = O, e._result = t, u(N, e))
            }

            function F(e, t, o, n) {
                var i = e._subscribers,
                    r = i.length;
                e._onerror = null, i[r] = t, i[r + B] = o, i[r + O] = n, 0 === r && e._state && u(q, e)
            }

            function q(e) {
                var t = e._subscribers,
                    o = e._state;
                if (0 !== t.length) {
                    for (var n, i, r = e._result, a = 0; a < t.length; a += 3) n = t[a], i = t[a + o], n ? W(o, n, i, r) : i(r);
                    e._subscribers.length = 0
                }
            }

            function H() {
                this.error = null
            }
            var R = new H;

            function W(e, t, o, n) {
                var i, r, s, c, l = a(o);
                if (l) {
                    if ((i = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                return R.error = e, R
                            }
                        }(o, n)) === R ? (c = !0, r = i.error, i = null) : s = !0, t === i) return void I(t, new TypeError("A promises callback cannot return that same promise."))
                } else i = n, s = !0;
                t._state !== S || (l && s ? j(t, i) : c ? I(t, r) : e === B ? D(t, i) : e === O && I(t, i))
            }
            var V = function(e) {
                return new X(this, e).promise
            };
            var U = function(e) {
                var t = new this(L);
                if (!l(e)) return I(t, new TypeError("You must pass an array to race.")), t;
                var o = e.length;

                function n(e) {
                    j(t, e)
                }

                function i(e) {
                    I(t, e)
                }
                for (var r = 0; t._state === S && r < o; r++) F(this.resolve(e[r]), void 0, n, i);
                return t
            };
            var z = function(e) {
                    var t = new this(L);
                    return I(t, e), t
                },
                K = 0;
            var Y = G;

            function G(e) {
                this._id = K++, this._state = void 0, this._result = void 0, this._subscribers = [], L !== e && ("function" != typeof e && function() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }(), this instanceof G ? function(e, t) {
                    try {
                        t(function(t) {
                            j(e, t)
                        }, function(t) {
                            I(e, t)
                        })
                    } catch (t) {
                        I(e, t)
                    }
                }(this, e) : function() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }())
            }
            G.all = V, G.race = U, G.resolve = E, G.reject = z, G._setScheduler = function(e) {
                c = e
            }, G._setAsap = function(e) {
                u = e
            }, G._asap = u, G.prototype = {
                constructor: G,
                then: T,
                catch: function(e) {
                    return this.then(null, e)
                }
            };
            var X = $;

            function $(e, t) {
                this._instanceConstructor = e, this.promise = new e(L), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? D(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && D(this.promise, this._result))) : I(this.promise, this._validationError())
            }
            $.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, $.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, o = 0; this._state === S && o < e; o++) this._eachEntry(t[o], o)
            }, $.prototype._eachEntry = function(e, t) {
                var o = this._instanceConstructor,
                    n = o.resolve;
                if (n === E) {
                    var i = A(e);
                    if (i === T && e._state !== S) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                    else if (o === Y) {
                        var r = new o(L);
                        M(r, e, i), this._willSettleAt(r, t)
                    } else this._willSettleAt(new o(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(n(e), t)
            }, $.prototype._settledAt = function(e, t, o) {
                var n = this.promise;
                n._state === S && (this._remaining--, e === O ? I(n, o) : this._result[t] = o), 0 === this._remaining && D(n, this._result)
            }, $.prototype._willSettleAt = function(e, t) {
                var o = this;
                F(e, void 0, function(e) {
                    o._settledAt(B, t, e)
                }, function(e) {
                    o._settledAt(O, t, e)
                })
            };
            var Z = function() {
                    var e;
                    if (void 0 !== i) e = i;
                    else if ("undefined" != typeof self) e = self;
                    else try {
                        e = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var t = e.Promise;
                    t && "[object Promise]" === Object.prototype.toString.call(t.resolve()) && !t.cast || (e.Promise = Y)
                },
                Q = {
                    Promise: Y,
                    polyfill: Z
                };
            void 0 === (r = function() {
                return Q
            }.call(t, o, t, e)) || (e.exports = r), Z()
        }).call(this)
    }).call(this, o(9), o(112))
}, function(e, t, o) {
    var n = o(32);
    e.exports = function(e, t, o) {
        if (n(e), void 0 === t) return e;
        switch (o) {
            case 1:
                return function(o) {
                    return e.call(t, o)
                };
            case 2:
                return function(o, n) {
                    return e.call(t, o, n)
                };
            case 3:
                return function(o, n, i) {
                    return e.call(t, o, n, i)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, o) {
    var n = o(18),
        i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, o) {
    for (var n = o(65), i = o(36), r = o(18), a = o(17), s = o(20), c = o(30), l = c("iterator"), d = c("toStringTag"), u = s.Array, _ = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
        var f, h = _[p],
            w = r[h],
            v = w && w.prototype;
        if (v)
            for (f in v[l] || a(v, l, u), v[d] || a(v, d, h), s[h] = u, n) v[f] || i(v, f, n[f], !0)
    }
}, function(e, t) {
    var o = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : o)(e)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "updSeenAdsInfo", function() {
        return a
    }), o.d(t, "__adsGetAjaxParams", function() {
        return s
    }), o.d(t, "__adsUpdate", function() {
        return c
    }), o.d(t, "__adsSet", function() {
        return l
    }), o.d(t, "__adsUpdateExternalStats", function() {
        return d
    });
    var n = o(91),
        i = o(82),
        r = o(0);

    function a() {
        if ((Object(r.getXY)("ads_left", !0) || {})[1] && vk.id) {
            var e = Object(r.getXYRect)(Object(r.geByTag1)("ol", Object(r.ge)("side_bar_inner")), !0),
                t = e ? e.height : 0,
                o = Object(r.getXYRect)(Object(r.ge)("left_blocks"), !0),
                a = o ? o.height : 0,
                s = Math.max(Math.floor(((window.lastWindowHeight || 0) - t - a - 42 - 10) / 260), 0);
            __seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), __seenAds !== s && (__seenAds = s, Object(n.setCookie)("remixseenads", s, 30))
        }
    }

    function s(e, t) {
        return !window.noAdsAtAll && (s = function() {
            return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {
                al_ad: null
            }
        }, stManager.add(["aes_light.js"], s.pbind(e, t)) || {
            al_ad: null
        })
    }

    function c(e) {
        if (window.noAdsAtAll) return !1;
        c = function() {
            window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments)
        }, stManager.add(["aes_light.js"], c.pbind(e))
    }

    function l(e, t, o, n, i, r) {
        if (window.noAdsAtAll) return !1;
        l = function() {
            var e = "";
            arguments && arguments[0] && (e = arguments[0]), "\x3c!--criteo" === e.slice(0, "\x3c!--criteo".length) && Math.random() < .05 && (window.AdsLight && AdsLight.setNewBlock ? ajax.post("/wkview.php?act=mlet&mt=750", {}, {
                onFail: function() {
                    return !0
                }
            }) : ajax.post("/wkview.php?act=mlet&mt=751", {}, {
                onFail: function() {
                    return !0
                }
            })), window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments)
        }, stManager.add(["aes_light.js"], l.pbind(e, t, o, n, i, r))
    }

    function d(e) {
        if (window.noAdsAtAll) return !1;
        d = function() {
            window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
        }, stManager.add(["aes_light.js"], d.pbind(e))
    }
    window.__seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), window.__adsLoaded = Object(i.vkNow)(), window.updSeenAdsInfo = a, window.__adsGetAjaxParams = s, window.__adsUpdate = c, window.__adsSet = l, window.__adsUpdateExternalStats = d
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "ls", function() {
        return n
    });
    var n = {
        checkVersion: function() {
            return void 0 !== window.localStorage && void 0 !== window.JSON
        },
        set: function(e, t) {
            this.remove(e);
            try {
                return !!n.checkVersion() && localStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                return !1
            }
        },
        get: function(e) {
            if (!n.checkVersion()) return !1;
            try {
                return JSON.parse(localStorage.getItem(e))
            } catch (e) {
                return !1
            }
        },
        remove: function(e) {
            try {
                localStorage.removeItem(e)
            } catch (e) {}
        }
    };
    window.ls = n
}, function(e, t, o) {
    var n = o(60).f,
        i = o(55),
        r = o(30)("toStringTag");
    e.exports = function(e, t, o) {
        e && !i(e = o ? e : e.prototype, r) && n(e, r, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t, o, n, i, r) {
        if ((e = ge(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var a, s = i ? ((a = function(e) {
                var t = e.data;
                e.data = i;
                var n = o.apply(this, [e]);
                return e.data = t, n
            }).handler = o, a) : o;
            e.setInterval && e != window && (e = window);
            var l = data(e, "events") || data(e, "events", {}),
                d = data(e, "handle") || data(e, "handle", function(e) {
                    return function() {
                        c.apply(e, arguments)
                    }
                }(e));
            each(t.split(/\s+/), function(t, o) {
                l[o] || (l[o] = [], !n && e.addEventListener ? e.addEventListener(o, d, r) : !n && e.attachEvent && e.attachEvent("on" + o, d)), l[o].push(s)
            })
        }
    }

    function i(e, t, o, n) {
        if (void 0 === n && (n = !1), e = ge(e)) {
            var r = data(e, "events");
            if (r)
                if ("string" == typeof t) each(t.split(/\s+/), function(t, i) {
                    if (isArray(r[i])) {
                        var a = r[i].length;
                        if (isFunction(o)) {
                            for (var s = a - 1; s >= 0; s--)
                                if (r[i][s] && (r[i][s] === o || r[i][s].handler === o)) {
                                    r[i].splice(s, 1), a--;
                                    break
                                }
                        } else {
                            for (s = 0; s < a; s++) delete r[i][s];
                            a = 0
                        }
                        a || (e.removeEventListener ? e.removeEventListener(i, data(e, "handle"), n) : e.detachEvent && e.detachEvent("on" + i, data(e, "handle")), delete r[i])
                    }
                }), isEmpty(r) && (removeData(e, "events"), removeData(e, "handle"));
                else
                    for (var a in r) i(e, a)
        }
    }

    function r(e, t, o, n) {
        e = ge(e);
        var i = data(e, "handle");
        if (i) {
            var r = function() {
                i.call(e, extend(o || {}, {
                    type: t,
                    target: e
                }))
            };
            n ? r() : setTimeout(r, 0)
        }
    }

    function a(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function s(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function c(e) {
        e = l(e);
        var t = Array.prototype.slice.call(arguments);
        t[0] = e;
        var o = data(this, "events");
        if (o && "string" == typeof e.type && o[e.type] && o[e.type].length) {
            var n = (o[e.type] || []).slice();
            for (var i in n) {
                if ("mouseover" == e.type || "mouseout" == e.type) {
                    for (var r = e.relatedElement; r && r != this;) r = r.parentNode;
                    if (r == this) continue
                }
                var s = n[i].apply(this, t);
                if (!1 !== s && -1 !== s || a(e), -1 === s) return !1
            }
        }
    }

    function l(e) {
        var t = e = e || window.event;
        if ((e = clone(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement == e.target), null == e.pageX && null != e.clientX) {
            var o = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o.clientLeft || 0), e.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function d(e) {
        return (e = e || window.event) && ("click" == e.type || "mousedown" == e.type || "mouseup" == e.type) && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || browser.mac && e.metaKey) || !1
    }

    function u(e) {
        if (!(e = l(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = getSize(e.target),
            o = getXY(e.target),
            n = e.pageX - o[0],
            i = e.pageY - o[1];
        return n < -1 || n > t[0] + 1 || i < -1 || i > t[1] + 1 || Math.abs(e.pageX - o[0] - t[0] / 2) < 1 && Math.abs(e.pageY - o[1] - t[1] / 2) < 1
    }

    function _(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var o = e.fromElement || e.relatedTarget;
        if (!o || o == t || o == t.parentNode) return !0;
        for (; o != t && o.parentNode && o.parentNode != bodyNode;) o = o.parentNode;
        return o != t
    }
    o.r(t), o.d(t, "addEvent", function() {
        return n
    }), o.d(t, "removeEvent", function() {
        return i
    }), o.d(t, "triggerEvent", function() {
        return r
    }), o.d(t, "cancelEvent", function() {
        return a
    }), o.d(t, "stopEvent", function() {
        return s
    }), o.d(t, "_eventHandle", function() {
        return c
    }), o.d(t, "normEvent", function() {
        return l
    }), o.d(t, "checkEvent", function() {
        return d
    }), o.d(t, "checkKeyboardEvent", function() {
        return u
    }), o.d(t, "checkOver", function() {
        return _
    }), window.KEY = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DEL: 8,
        TAB: 9,
        RETURN: 13,
        ENTER: 13,
        ESC: 27,
        PAGEUP: 33,
        PAGEDOWN: 34,
        SPACE: 32,
        CTRL: 17,
        ALT: 18,
        SHIFT: 16
    }, window.addEvent = n, window.removeEvent = i, window.triggerEvent = r, window.cancelEvent = a, window.stopEvent = s, window._eventHandle = c, window.normEvent = l, window.checkEvent = d, window.checkKeyboardEvent = u, window.checkOver = _
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "statlogsValueEvent", function() {
        return a
    });
    var n = o(91),
        i = o(82),
        r = o(49);

    function a(e, t, o, a, s) {
        if (void 0 !== e && void 0 !== t) {
            var c = Array.from(arguments).slice(2, 5),
                l = void 0;
            ! function e(t, o, n) {
                var i = "lockkk_" + t;
                if (!0 === r.ls.get(i)) r.ls.checkVersion() ? n || setTimeout(e.pbind(t, o, !0), 100) : o();
                else {
                    r.ls.set(i, !0);
                    try {
                        o()
                    } catch (e) {}
                    r.ls.set(i, !1)
                }
            }("stats_cookie_lock", function() {
                try {
                    l = (l = JSON.parse(Object(n.getCookie)("remixsts"))).data
                } catch (e) {
                    l = []
                }
                for (l.push([Math.round(Date.now() / 1e3), e, t].concat(c)); l.length > 100;) l.shift();
                var o = Math.round(Object(i.rand)(0, 1e9));
                Object(n.setCookie)("remixsts", JSON.stringify({
                    data: l,
                    uniqueId: o
                }), .01)
            })
        }
    }
    window.statlogsValueEvent = a
}, function(e, t, o) {
    var n = o(44),
        i = o(101),
        r = o(61),
        a = o(76),
        s = o(104),
        c = o(83);
    e.exports = function(e, t, o, l, d) {
        var u, _, p, f = d ? function() {
                return e
            } : c(e),
            h = n(o, l, t ? 2 : 1),
            w = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (r(f))
            for (u = s(e.length); u > w; w++) t ? h(a(_ = e[w])[0], _[1]) : h(e[w]);
        else
            for (p = f.call(e); !(_ = p.next()).done;) i(p, h, _.value, t)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), window._layerAnim = !1, window.layers = {
        sh: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
            show(e), t && t()
        } : function(e, t) {
            fadeIn(e, 200, t)
        },
        hd: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
            hide(e), t && t()
        } : function(e, t) {
            fadeOut(e, 200, t)
        },
        visible: !1,
        _show: function(e, t, o, n) {
            var i = "layers" + (__bq.count() + 1);
            cancelStackPush(i, function() {}), setStyle(e, {
                opacity: o || "",
                backgroundColor: n || ""
            }), layers.visible || (toggleFlash(), disableBodyScroll()), layers.visible || pauseLastInlineVideo(), layers.visible = !0, addClass(bodyNode, "layers_shown"), t.visibilityHide ? removeClass(t, "box_layer_hidden") : show(t), layers.sh(e), window.updateWndVScroll && updateWndVScroll()
        },
        _hide: function(e, t) {
            layers.hd(e, function() {
                var e = "layers" + (__bq.count() + 1);
                cancelStackFilter(e), t && t.visibilityHide ? addClass(t, "box_layer_hidden") : hide(t), isVisible(layerWrap) || cur._inLayer || isVisible(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !isVisible(window.mvLayerWrap)) || isVisible(window.wkLayerWrap) || (layers.visible = !1, removeClass(bodyNode, "layers_shown"), toggleFlash(!0), enableBodyScroll()), window.updateWndVScroll && updateWndVScroll()
            }), layers.visible || playLastInlineVideo()
        }
    }, window.__lq = window.layerQueue = {
        push: function(e) {
            var t, o = !!__lq.count() && __lq._layers[__lq._layers.length - 1];
            if (cur.pvShown && "temp" != cur.pvListId) t = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
                onHide: cur.pvOptions.onHide,
                scroll: cur.pvNarrowScrollbar ? cur.pvNarrowScrollbar.data.scrollTop : 0,
                onShow: e,
                noHistory: !!cur.pvNoHistory,
                histLen: cur.pvHistoryLength
            }];
            else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
                var n = mvcur.options && (mvcur.options.autoplay || mvcur.options.focusPlay),
                    i = {
                        scroll: mvLayerWrap.scrollTop,
                        noHistory: !!mvcur.noHistory,
                        nomin: 1,
                        autoplay: n,
                        prevLoc: mvcur.mvPrevLoc
                    };
                VideoPlaylist.getCurListId() && (i = extend(i, {
                    playlistId: VideoPlaylist.getCurListId(),
                    module: Videoview.getVideoModule(),
                    addParams: {
                        force_no_repeat: 1,
                        show_next: 1
                    }
                })), t = ["video", mvcur.videoRaw, mvcur.listId, i]
            } else if (window.wkcur && wkcur.shown) t = ["wiki", wkcur.wkRaw, !1, {
                toScroll: wkLayerWrap.scrollTop,
                prevLoc: wkcur.prevLoc,
                myLoc: wkcur.myLoc,
                onHide: wkcur.onHide
            }];
            else {
                if (!cur.storyLayer) return !1;
                t = ["stories", cur.storyLayer.getList()]
            }
            return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || __lq._layers.push(t), __lq.skipVideo = !1, !0
        },
        noHistory: function() {
            for (var e = __lq._layers, t = e.length; t > 0; --t) "photo" == e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" == e[t - 1][0] && (e[t - 1][3].noHistory = 1)
        },
        hide: function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            __lq._bl = !0, window.WkView && layers.fullhide == WkView.hide ? (hide(wkLayerWrap), clearTimeout(wkcur.showT)) : layers.fullhide && layers.fullhide(!0, !0), setTimeout(layerQueue.unblock, 5)
        }),
        unblock: function() {
            __lq._bl = !1
        },
        pop: function() {
            if (__lq.count() && !__lq._bl) {
                var e = __lq._layers.pop();
                if (__lq.skipVideo && (__lq.skipVideo = !1, "video" == e[0])) return __lq._layers.push(e), void(__lq.skipVideo = !1);
                "photo" == e[0] ? (extend(e[3], {
                    fromQueue: !0
                }), showPhoto(e[1], e[2], e[3], !1)) : "video" == e[0] ? (extend(e[3], {
                    fromQueue: !0
                }), showVideo(e[1], e[2], e[3], !1)) : "wiki" == e[0] ? showWiki({
                    w: e[1]
                }, !1, !1, e[3]) : "stories" == e[0] && showStory(e[1])
            }
        },
        back: function(e, t, o, n) {
            for (var i = __lq._layers, r = i.length; r > 0; --r)
                if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return __lq._layers = i.slice(0, r), __lq.pop(), !0;
            return !1
        },
        count: function() {
            return __lq._layers.length
        },
        clear: function() {
            __lq._layers = []
        },
        _layers: []
    }
}, function(e, t) {
    var o = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return o.call(e, t)
    }
}, function(e, t, o) {
    'eat script';

    function n(e) {
        var t, o = function(e) {
                var t = e.split("#"),
                    o = t[0].split("?");
                return o[0] + (o[1] ? "?" + ajx2q(q2ajx(o[1])) : "") + (t[1] ? "#" + t[1] : "")
            },
            n = extend({
                onLocChange: function() {}
            }, e),
            i = function() {
                var e = "";
                return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
            },
            r = i(),
            a = function(e) {
                var t = i();
                t == r && !0 !== e || (n.onLocChange(t), r = t)
            };
        return {
            setLoc: function(e) {
                r = o(e);
                var t = (location.toString().match(/#(.*)/) || {})[1] || "";
                if (!t && vk.al > 1 && (t = (location.pathname || "") + (location.search || "")), (t = (t = o(t)).replace(/^(\/|!)/, "")) != r) {
                    if (3 == vk.al) try {
                        return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                            scrollTop: window.lastScrollTop,
                            preventScroll: window.preventLocationScroll
                        }, "", "/" + t), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + r)
                    } catch (e) {}
                    window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + r
                }
            },
            getLoc: i,
            init: function() {
                1 == vk.al && a(!0), 3 == vk.al ? (addEvent(window, "popstate", a), browser.safari && addEvent(window, "hashchange", a)) : "onhashchange" in window ? addEvent(window, "hashchange", function() {
                    window.chHashFlag ? window.chHashFlag = !1 : a()
                }) : t = setInterval(a, 200)
            },
            setOptions: function(e) {
                n = extend(n, e)
            },
            checker: a,
            stop: function() {
                vk.al < 3 ? clearInterval(t) : 3 == vk.al && removeEvent(window, "popstate", a)
            }
        }
    }
    o.r(t), o.d(t, "HistoryAndBookmarks", function() {
        return n
    }), window.HistoryAndBookmarks = n
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, o) {
    var n = o(60),
        i = o(76),
        r = o(109);
    e.exports = o(98) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var o, a = r(t), s = a.length, c = 0; s > c;) n.f(e, o = a[c++], t[o]);
        return e
    }
}, function(e, t) {
    e.exports = function(e, t, o, n) {
        if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(o + ": incorrect invocation!");
        return e
    }
}, function(e, t, o) {
    var n = o(76),
        i = o(108),
        r = o(15),
        a = Object.defineProperty;
    t.f = o(98) ? Object.defineProperty : function(e, t, o) {
        if (n(e), t = r(t, !0), n(o), i) try {
            return a(e, t, o)
        } catch (e) {}
        if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
        return "value" in o && (e[t] = o.value), e
    }
}, function(e, t, o) {
    var n = o(20),
        i = o(30)("iterator"),
        r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (n.Array === e || r[i] === e)
    }
}, function(e, t, o) {
    var n = o(30)("unscopables"),
        i = Array.prototype;
    void 0 == i[n] && o(17)(i, n, {}), e.exports = function(e) {
        i[n][e] = !0
    }
}, function(e, t) {}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        var o = t.timeout,
            n = t.onLoad,
            i = t.onError,
            r = document.createElement("script");
        r.addEventListener("load", s), r.addEventListener("readystatechange", s), r.addEventListener("error", c), r.src = e, document.head.appendChild(r);
        var a = void 0;

        function s(e) {
            r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (l(), n && n())
        }

        function c(e) {
            l(), i && i()
        }

        function l() {
            clearTimeout(a), r.removeEventListener("load", s), r.removeEventListener("readystatechange", s), r.removeEventListener("error", c)
        }
        return o && (a = setTimeout(c, o)), {
            destroy: function() {
                l()
            }
        }
    }
    o.r(t), o.d(t, "loadScript", function() {
        return n
    }), window.loadScript = n
}, function(e, t, o) {
    'eat script';
    var n = o(62),
        i = o(57),
        r = o(20),
        a = o(21);
    e.exports = o(70)(Array, "Array", function(e, t) {
        this._t = a(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            o = this._i++;
        return !e || o >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? o : "values" == t ? e[o] : [o, e[o]])
    }, "values"), r.Arguments = r.Array, n("keys"), n("values"), n("entries")
}, function(e, t) {
    var o = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
    }
}, function(e, t, o) {
    var n = o(110),
        i = o(76),
        r = function(e, t) {
            if (i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
            try {
                (n = o(44)(Function.call, o(81).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
            } catch (e) {
                t = !0
            }
            return function(e, o) {
                return r(e, o), t ? e.__proto__ = o : n(e, o), e
            }
        }({}, !1) : void 0),
        check: r
    }
}, function(e, t, o) {
    o(86), o(99), o(46), o(42), e.exports = o(88).Set
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
            var o = ce("link", {
                rel: "shortcut icon",
                type: "image/gif",
                href: e
            });
            headNode.replaceChild(o, icoNode), icoNode = o
        }
    }
    o.r(t), o.d(t, "setFavIcon", function() {
        return n
    }), window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.showTitleProgress = function() {}, window.hideTitleProgress = function() {}, window.setFavIcon = n
}, function(e, t, o) {
    'eat script';
    var n = o(22),
        i = o(4),
        r = o(36),
        a = o(17),
        s = o(55),
        c = o(20),
        l = o(28),
        d = o(50),
        u = o(79),
        _ = o(30)("iterator"),
        p = !([].keys && "next" in [].keys()),
        f = function() {
            return this
        };
    e.exports = function(e, t, o, h, w, v, g) {
        l(o, t, h);
        var m, b, y, k = function(e) {
                if (!p && e in E) return E[e];
                switch (e) {
                    case "keys":
                    case "values":
                        return function() {
                            return new o(this, e)
                        }
                }
                return function() {
                    return new o(this, e)
                }
            },
            x = t + " Iterator",
            C = "values" == w,
            T = !1,
            E = e.prototype,
            L = E[_] || E["@@iterator"] || w && E[w],
            S = L || k(w),
            B = w ? C ? k("entries") : S : void 0,
            O = "Array" == t && E.entries || L;
        if (O && (y = u(O.call(new e))) !== Object.prototype && (d(y, x, !0), n || s(y, _) || a(y, _, f)), C && L && "values" !== L.name && (T = !0, S = function() {
                return L.call(this)
            }), n && !g || !p && !T && E[_] || a(E, _, S), c[t] = S, c[x] = f, w)
            if (m = {
                    values: C ? S : k("values"),
                    keys: v ? S : k("keys"),
                    entries: B
                }, g)
                for (b in m) b in E || r(E, b, m[b]);
            else i(i.P + i.F * (p || T), t, m);
        return m
    }
}, function(e, t, o) {
    var n = o(76),
        i = o(58),
        r = o(34),
        a = o(16)("IE_PROTO"),
        s = function() {},
        c = function() {
            var e, t = o(38)("iframe"),
                n = r.length;
            for (t.style.display = "none", o(93).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[r[n]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var o;
        return null !== e ? (s.prototype = n(e), o = new s, s.prototype = null, o[a] = e) : o = c(), void 0 === t ? o : i(o, t)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "animate", function() {
        return i
    }), o.d(t, "cubicBezier", function() {
        return r
    }), o.d(t, "fadeTo", function() {
        return a
    }), o.d(t, "genFx", function() {
        return s
    }), o.d(t, "getRGB", function() {
        return c
    }), o.d(t, "getColor", function() {
        return l
    });
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function i(e, t, o, i) {
        if (e = ge(e)) {
            var r, a = isFunction(i) ? i : function() {},
                s = extend({}, "object" == (void 0 === o ? "undefined" : n(o)) ? o : {
                    duration: o,
                    onComplete: a
                }),
                d = {},
                u = {},
                _ = isVisible(e);
            s.orig = {}, (t = clone(t)).discrete && (s.discrete = 1, delete t.discrete), browser.iphone && (s.duration = 0);
            var p = data(e, "tween"),
                f = _ ? "hide" : "show";
            for (r in p && p.isTweening && (s.orig = extend(s.orig, p.options.orig), p.stop(!1), p.options.show ? f = "hide" : p.options.hide && (f = "show")), t) {
                if (!p && ("show" == t[r] && _ || "hide" == t[r] && !_)) return s.onComplete.call(this, e);
                if ("height" != r && "width" != r || !e.style || (t.overflow || (void 0 == s.orig.overflow && (s.orig.overflow = getStyle(e, "overflow")), e.style.overflow = "hidden"), hasClass(e, "inl_bl") || "TD" == e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[r]))
                    if ("toggle" == t[r] && (t[r] = f), "show" == t[r]) {
                        var h = 0;
                        s.show = !0, void 0 == s.orig[r] && (s.orig[r] = getStyle(e, r, !1) || "", setStyle(e, r, 0));
                        var w = s.orig[r],
                            v = e.style[r];
                        e.style[r] = w, t[r] = parseFloat(getStyle(e, r, !0)), e.style[r] = v, "height" == r && browser.msie && !t.overflow && (e.style.overflow = "hidden")
                    } else void 0 == s.orig[r] && (s.orig[r] = getStyle(e, r, !1) || ""), s.hide = !0, t[r] = 0
            }
            return s.show && !_ && show(e), p = new Fx.Base(e, s), each(t, function(t, o) {
                if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                    if (h = l(e, "borderColor" == t ? "borderTopColor" : t), o = c(o), void 0 === h) return
                } else {
                    var n = o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                    p.cur(t, !0);
                    n && (o = parseFloat(n[2]), n[1] && (o = ("-=" == n[1] ? -1 : 1) * o + o)), 0 != (h = p.cur(t, !0)) || "width" != t && "height" != t || (h = 1), "opacity" == t && o > 0 && !_ && (setStyle(e, "opacity", 0), h = 0, show(e))
                }(h != o || isArray(h) && h.join(",") == o.join(",")) && (d[t] = h, u[t] = o)
            }), p.start(d, u), data(e, "tween", p), p
        }
    }

    function r(e, t, o, n, i, r) {
        var a, s, c, l, d, u, _ = function(t) {
                var n = 1 - t;
                return 3 * n * n * t * e + 3 * n * t * t * o + t * t * t
            },
            p = function(e) {
                var o = 1 - e;
                return 3 * o * o * e * t + 3 * o * e * e * n + e * e * e
            },
            f = function(t) {
                var n = 1 - t;
                return 3 * (2 * (t - 1) * t + n * n) * e + 3 * (-t * t * t + 2 * n * t) * o
            },
            h = i;
        for (c = h, u = 0; u < 8; u++) {
            if (l = _(c) - h, Math.abs(l) < r) return p(c);
            if (d = f(c), Math.abs(d) < 1e-6) break;
            c -= l / d
        }
        if (s = 1, (c = h) < (a = 0)) return p(a);
        if (c > s) return p(s);
        for (; a < s;) {
            if (l = _(c), Math.abs(l - h) < r) return p(c);
            h > l ? a = c : s = c, c = .5 * (s - a) + a
        }
        return p(c)
    }

    function a(e, t, o, n) {
        return i(e, {
            opacity: o
        }, t, n)
    }

    function s(e, t) {
        var o = {};
        return each(Fx.Attrs.concat.apply([], Fx.Attrs.slice(0, t)), function() {
            o[this] = e
        }), o
    }

    function c(e) {
        var t;
        return e && isArray(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
    }

    function l(e, t) {
        var o;
        do {
            if ((o = getStyle(e, t)).indexOf("rgba") || (o = ""), "" != o && "transparent" != o || "body" == e.nodeName.toLowerCase()) break;
            t = "backgroundColor"
        } while (e = e.parentNode);
        return c(o)
    }
    window.Fx = {
        Transitions: {
            linear: function(e, t, o, n) {
                return o * e / n + t
            },
            sineInOut: function(e, t, o, n) {
                return -o / 2 * (Math.cos(Math.PI * e / n) - 1) + t
            },
            halfSine: function(e, t, o, n) {
                return o * Math.sin(Math.PI * (e / n) / 2) + t
            },
            easeOutBack: function(e, t, o, n) {
                var i = 1.70158;
                return o * ((e = e / n - 1) * e * ((i + 1) * e + i) + 1) + t
            },
            easeInCirc: function(e, t, o, n) {
                return -o * (Math.sqrt(1 - (e /= n) * e) - 1) + t
            },
            easeOutCirc: function(e, t, o, n) {
                return o * Math.sqrt(1 - (e = e / n - 1) * e) + t
            },
            easeInQuint: function(e, t, o, n) {
                return o * (e /= n) * e * e * e * e + t
            },
            easeOutQuint: function(e, t, o, n) {
                return o * ((e = e / n - 1) * e * e * e * e + 1) + t
            },
            easeOutCubic: function(e, t, o, n) {
                return o * ((e = e / n - 1) * e * e + 1) + t
            },
            swiftOut: function(e, t, o, n) {
                return o * r(.4, 0, .22, 1, e / n, 4 / n) + t
            }
        },
        Attrs: [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity", "left", "top"]
        ],
        Timers: [],
        TimerId: null
    }, window.fx = Fx, Fx.Base = function(e, t, o) {
        this.el = ge(e), this.name = o, this.options = extend({
            onStep: function() {},
            onComplete: function() {},
            transition: t.transition || Fx.Transitions.sineInOut,
            duration: 500
        }, t || {})
    }, each({
        slideDown: s("show", 1),
        slideUp: s("hide", 1),
        slideToggle: s("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        window[e] = function(e, o, n) {
            return i(e, t, o, n)
        }
    }), Fx.Base.prototype = {
        start: function(e, t) {
            this.from = e, this.to = t, this.time = vkNow(), this.isTweening = !0;
            var o = this;

            function n(e) {
                return o.step(e)
            }
            return n.el = this.el, n() && Fx.Timers.push(n) && !Fx.TimerId && (Fx.TimerId = setInterval(function() {
                for (var e = Fx.Timers, t = e.length, o = 0; o < t; o++) e[o]() || (e.splice(o--, 1), t--);
                t || (clearInterval(Fx.TimerId), Fx.TimerId = null)
            }, 13)), this
        },
        stop: function(e) {
            for (var t = Fx.Timers, o = t.length - 1; o >= 0; o--) t[o].el == this.el && (e && t[o](!0), t.splice(o, 1));
            this.isTweening = !1
        },
        step: function(e) {
            var t = vkNow();
            if (!e && t < this.time + this.options.duration) {
                for (var o in this.cTime = t - this.time, this.now = {}, this.to)
                    if (isArray(this.to[o])) {
                        var n, i = [];
                        for (n = 0; n < 3; n++) {
                            if (void 0 === this.from[o] || void 0 === this.to[o]) return !1;
                            i.push(Math.min(parseInt(this.compute(this.from[o][n], this.to[o][n])), 255))
                        }
                        this.now[o] = i
                    } else this.now[o] = this.compute(this.from[o], this.to[o]), this.options.discrete && (this.now[o] = intval(this.now[o]));
                return this.update(), !0
            }
            return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = extend(this.to, this.options.orig), this.update(), this.options.hide && hide(this.el), this.isTweening = !1, !1
        },
        compute: function(e, t) {
            var o = t - e;
            return this.options.transition(this.cTime, e, o, this.options.duration)
        },
        update: function() {
            for (var e in this.options.onStep(this.now), this.now) isArray(this.now[e]) ? setStyle(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 != this.el[e] ? this.el[e] = this.now[e] : setStyle(this.el, e, this.now[e])
        },
        cur: function(e, t) {
            return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(getStyle(this.el, e, t)) || 0 : this.el[e]
        }
    }, window.animate = i, window.cubicBezier = r, window.fadeTo = a, window.genFx = s, window.getRGB = c, window.getColor = l
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "subscribePerformanceLoggerCollectors", function() {
        return _
    });
    var n = o(91),
        i = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        r = "remixjsp";

    function a() {
        window.performance.getEntriesByType("paint").forEach(function(e) {
            "first-contentful-paint" === e.name && u(e.startTime, "TTFCP")
        }), window.performance.getEntriesByType("navigation").forEach(function(e) {
            if ("navigation" === e.initiatorType) {
                var t = e.domComplete,
                    o = e.domContentLoadedEventEnd,
                    n = e.loadEventEnd;
                u(t, "domComplete"), u(o, "domContentLoadedEventEnd"), u(n, "loadEventEnd")
            }
        }), l()
    }
    var s = [],
        c = !1;

    function l() {
        if (c) {
            var e = window.performance,
                t = s[s.length - 1],
                o = t.startTime + t.duration;
            e.now() - o >= 3e3 ? u(o, "TTI") : setTimeout(l, 3e3)
        }
    }
    var d = [];

    function u(e, t) {
        var o = Math.floor(e);
        if (d.push([o, t]), c ? "TTI" === t : d.length > 2) {
            var a = "unknown",
                s = navigator.connection;
            s && s.effectiveType && (a = s.effectiveType);
            var l = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            d.forEach(function(e) {
                var t = i(e, 2),
                    o = t[0],
                    n = t[1];
                return l.events.push([n, o, cur.module, a, window.vk.rv])
            }), Object(n.setCookie)(r, JSON.stringify(l), .01)
        }
    }

    function _() {
        window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
            s = s.concat(e.getEntries())
        }).observe({
            entryTypes: ["longtask"]
        }), c = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
            setTimeout(a, 0)
        }) : a()
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), Function.prototype.pbind = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(window), this.bind.apply(this, e)
    }, Function.prototype.rpbind = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(window), this.rbind.apply(this, e)
    }, Function.prototype.rbind = function() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            o = t.shift(),
            n = t.shift();
        return function() {
            var i = Array.prototype.slice.call(arguments);
            return e.apply(o, t.concat(i)), n
        }
    }, Function.prototype.bind || (Function.prototype.bind = function() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            o = t.shift();
        return function() {
            var n = Array.prototype.slice.call(arguments);
            return e.apply(o, t.concat(n))
        }
    }), Object.keys || (Object.keys = function(e) {
        var t = [];
        for (var o in e) e.hasOwnProperty(o) && t.push(o);
        return t
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for (var o = Object(e), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (void 0 !== i && null !== i)
                    for (var r = Object.keys(Object(i)), a = 0, s = r.length; a < s; a++) {
                        var c = r[a],
                            l = Object.getOwnPropertyDescriptor(i, c);
                        void 0 !== l && l.enumerable && (o[c] = i[c])
                    }
            }
            return o
        }
    })
}, function(e, t, o) {
    var n = o(110);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "topHeaderClose", function() {
        return r
    }), o.d(t, "topHeaderClearClose", function() {
        return a
    });
    var n = o(51),
        i = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function r(e) {
        window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
    }

    function a() {
        delete window.headerDestroy
    }
    var s = {
        cache: {},
        lists: {},
        maxItems: 8,
        init: function() {
            if (this.inited) return !1;
            var e = ge("ts_input"),
                t = ge("ts_cont_wrap");
            if (vk.id && Chat.init(), !e) return !1;
            addEvent(e, "focus", function() {
                s.deselect(), trim(val(this)) && addClass(t.firstChild, "active"), s.toggleInput(!0)
            }), addEvent(e, "keydown", function(o) {
                switch (o.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                        s.moveSelection(o.keyCode), cancelEvent(o);
                        break;
                    case KEY.ENTER:
                        var n = geByClass1("active", t);
                        if (n) s.select(n, o);
                        else {
                            var i = trim(val(this));
                            i && (e.blur(), s.clear(), s.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(i)))
                        }
                        cancelEvent(o);
                        break;
                    case KEY.TAB:
                        s.clear(), s.toggleInput(!1), cancelStackFilter("top_search", !0)
                }
            }), vk.id && (addEvent(e, "keyup", function(e) {
                switch (e.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                    case KEY.ENTER:
                    case KEY.ESC:
                        cancelEvent(e);
                        break;
                    default:
                        s.prepareRows(trim(val(this)))
                }
            }), addEvent(e, "paste", function() {
                setTimeout(function() {
                    s.prepareRows(trim(val(e)))
                }, 10)
            }), addEvent(document, "mousedown", function(e) {
                Object(n.checkKeyboardEvent)(e) || domClosest("_audio_page_layout", e.target) || domClosest("_ap_layer__close", e.target) || domClosest("layer_wrap", e.target) || r()
            }), this.inited = !0)
        },
        clear: function() {
            window.tooltips && tooltips.destroyAll(ge("ts_cont_wrap"));
            var e = ge("ts_input");
            e && e.phonblur && (val(e, ""), e.blur(), e.phonblur(), this.prepareRows())
        },
        select: function(e, t, o) {
            if (checkEvent(t)) return !0;
            var n = ge("ts_input"),
                i = trim(val(n)).length,
                a = e.getAttribute("hinttype");
            if (this.clear(), r(), i || n.blur(), o && hasClass(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: i,
                mk: "chat_box"
            }), this.writeBox(o), !1;
            var s = nav.go(e, t);
            return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: i,
                mk: a
            }), s
        },
        deselect: function() {
            var e = ge("ts_cont_wrap");
            each(geByClass("active", e), function(e, t) {
                return removeClass(t, "active")
            })
        },
        itemOver: function(e, t, o) {
            1 === t && s.deselect();
            var n = inArray(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
            toggleClass(e, "write", n), toggleClass(e, "active", t)
        },
        moveSelection: function(e) {
            var t = ge("ts_cont_wrap"),
                o = geByClass1("active", t),
                n = void 0;
            switch (e) {
                case KEY.UP:
                    n = !!o && (this.getNextNode(o, -1, "a") || o);
                    break;
                case KEY.DOWN:
                    n = o ? this.getNextNode(o, 1, "a") || o : t.firstChild
            }
            return this.deselect(), n && addClass(n, "active"), !1
        },
        getNextNode: function(e, t, o) {
            for (var n = e, i = domPN(e);;) {
                if ((n = t > 0 ? domNS(n) : domPS(n)) || (n = t > 0 ? domFC(i) : domLC(i)), o && n.tagName && n.tagName.toLowerCase() === o || !o && n) return n;
                if (n === e) return !1
            }
        },
        toggleInput: function(e) {
            e = !!e;
            var t = ge("ts_cont_wrap");
            isVisible(t) !== e && (toggle("ts_cont_wrap", e), e && cancelStackPush("top_search", function() {
                var e = ge("ts_input");
                s.toggleInput(!1), e.blur()
            }, !0))
        },
        getList: function(e) {
            switch (e) {
                case "friends":
                    return this.lists.friends || this.topFriends || {};
                case "publics":
                case "events":
                case "groups":
                case "apps":
                case "chats":
                case "search":
                    return this.lists[e] || {}
            }
            return {}
        },
        onlines: function() {
            return window.curFastChat && curFastChat.onlines || this.lists.onlines || {}
        },
        initFriendsList: function() {
            if (s.friendsLoaded) return !1;
            if (cur.initingFL || vk.isBanned || !vk.id) return !1;
            var e = function() {
                    if (s.friendsLoaded) return !1;
                    cur.initingFL = !0, ajax.post("al_search.php", {
                        act: "get_pages"
                    }, {
                        cache: 1,
                        onDone: function(e) {
                            delete cur.initingFL, s.friendsLoaded || (each(e, function(e, t) {
                                s.lists[e] = t, "onlines" !== e && s.updateCache(e)
                            }), s.friendsLoaded = !0, val("ts_input") || s.prepareRows(""))
                        },
                        onFail: function() {
                            delete cur.initingFL
                        }
                    })
                },
                t = s.getList("friends");
            isEmpty(t) ? (cur.initingFL = !0, ajax.post("al_search.php", {
                act: "get_top_friends"
            }, {
                cache: 1,
                onDone: function(t) {
                    delete cur.initingFL, s.topFriends = t, s.updateCache("friends"), s.forceUpdate = !0, s.prepareRows(cur.tsStr || ""), e()
                },
                onFail: function() {
                    delete cur.initingFL
                }
            })) : (s.updateCache("friends"), s.forceUpdate = !0, s.prepareRows(cur.tsStr || ""), e())
        },
        getSimilarQueries: function(e) {
            var t = [e = e.toLowerCase()],
                o = void 0;
            return (o = parseLatin(e)) && t.push(o), (o = parseLatKeys(e)) && t.push(o), (o = parseCyr(e)) && t.push(o), t
        },
        searchCache: function(e, t) {
            var o = this,
                n = s.getList(e);
            if (!t) return !1;
            var i = this.getSimilarQueries(t);
            if (void 0 !== this.cache[e][t]) return i;
            var r = this.cache[e][t] = {};
            each(i, function(t, i) {
                var a = o.cache[e][" " + i.charAt(0).toLowerCase()];
                if (a) {
                    var s = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + escapeRE(i), "gi");
                    each(a, function(e) {
                        var t = n[e + "_"];
                        if (!isArray(t)) return !0;
                        null !== t[0].match(s) && (r[e] = 1)
                    })
                }
            });
            var a = 0;
            return each(r, function() {
                return a++
            }), r._num = a, i
        },
        updateCache: function(e, t, o) {
            var n = this,
                i = t || this.getList(e);
            this.cache[e] = o && this.cache[e] || {}, each(i, function(t, o) {
                var i = o[0],
                    r = intval(t),
                    a = i.split(/[\s\-\(\)\.,;|:]+/);
                each(a, function(t, o) {
                    var i = " " + o.charAt(0).toLowerCase();
                    n.cache[e][i] = n.cache[e][i] || {}, n.cache[e][i][r] = 1
                })
            })
        },
        listSearch: function(e, t, o, n) {
            var i = [],
                r = {};
            return t ? (s.searchCache(e, t), r = s.cache[e] && s.cache[e][t] || {}) : each(s.getList(e), function(e) {
                var t = intval(e);
                r[t] = 1
            }), each(s.getList(e), function(e) {
                var t = intval(e),
                    a = r[t];
                if ((!n || !n[t]) && a) return !!o-- && void i.push([t, this])
            }), i
        },
        row: function(e, t, o, n, i, r, a, s, c) {
            var l = 0;
            if (r && (n = n.replace(r, '$1<em class="ts_clist_hl">$2</em>')), inArray(a, ["h_friends", "h_correspondents", "h_chats"]) && (l = e), s || (s = ""), c = intval(c)) {
                var d = "";
                1 & c && (d += "page_verified "), 2 & c && (d += "page_top_author "), -128932034 === e ? d += "ph_verified " : -29246653 === e && (d += "pg_verified "), c = '<div class="' + d + '" onmouseover="pageVerifiedTip(this, {type: ' + c + ", oid: " + e + '})"></div>'
            } else c = "";
            return '\n<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + l + ');" onmousedown="event.cancelBubble = true;"\n      onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + a + '">\n  <span class="ts_contact_photo ' + onlinePlatformClass(i) + '">\n    <img class="ts_contact_img" src="' + o + '"/>\n  </span>\n  <span class="ts_contact_name fl_l">\n    <div class="ts_contact_title_wrap' + (c ? " is_verified" : "") + '">\n      <span class="ts_contact_title">' + n + "</span>\n    </div>\n    " + c + '\n    <div class="ts_contact_info">' + s + '</div>\n  </span>\n  <div class="ts_contact_status"></div>\n</a>'
        },
        searchLists: function(e) {
            return e ? {
                friends: {
                    order: 0,
                    count: s.maxItems - 1,
                    label: getLang("global_friends")
                },
                groups: {
                    order: 1,
                    count: 4,
                    label: getLang("global_communities")
                },
                publics: {
                    count: 2,
                    parent: "groups"
                },
                events: {
                    count: 1,
                    parent: "groups"
                },
                apps: {
                    order: 2,
                    count: 1,
                    label: getLang("global_apps")
                },
                chats: {
                    order: 3,
                    count: s.maxItems - 1,
                    label: getLang("global_chats")
                },
                search: {
                    order: 4,
                    count: s.maxItems - 1,
                    label: getLang("head_search_results")
                }
            } : {
                friends: {
                    order: 0,
                    count: s.maxItems,
                    label: getLang("global_friends")
                }
            }
        },
        initListsHtml: function() {
            s.listsHtml = []
        },
        addToListsHtml: function(e, t, o) {
            var n = s.searchLists(o),
                i = n[(n[e] || {}).parent || e] || {},
                r = i.order || 0,
                a = i.label || "";
            s.listsHtml[r] = s.listsHtml[r] || (o && a ? ['<div class="ts_search_sep">' + a + "</div>"] : []), s.listsHtml[r].push(t)
        },
        htmlRows: function(e) {
            var t = "",
                o = s.listsHtml.map(function(e) {
                    return e.join("")
                });
            if (e) {
                var n = "#" === e[0] ? "statuses" : "auto",
                    i = "#" === e[0] ? getLang("global_news_search_results") : getLang("global_show_all_results");
                t += '\n<a href="/search?c[section]=' + n + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link"\n    onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"\n    onmouseout="TopSearch.itemOver(this, 0, event);" >\n  <span class="ts_contact_name fl_l">' + i + '</span>\n  <div class="ts_contact_status "></div>\n</a>'
            }
            return t + o.join("")
        },
        prepareRows: function(e) {
            var t = s.maxItems,
                o = ge("ts_cont_wrap");
            if (!o || !vk.id) return !1;
            if (cur.tsStr && cur.tsStr === e && !s.forceUpdate) return !1;
            delete s.forceUpdate, s.initListsHtml();
            var n = {};
            if (e) {
                var r = [];
                each(this.getSimilarQueries(e), function() {
                    r.push(escapeRE(this))
                }), cur.lastRe = new RegExp("([ -]|^|s|&nbsp;|\b)(" + r.join("|") + ")", "gi"), t--
            }
            each(s.searchLists(e), function(o, r) {
                if (s.cache[o]) {
                    var a = r.count,
                        c = s.listSearch(o, e, a, n),
                        l = [],
                        d = 0;
                    isEmpty(c) || (each(c, function(e, o) {
                        if (!t || d >= a) return !1;
                        l.push(o), t--, d++
                    }), l.length && each(l, function(t, r) {
                        var a = r[1],
                            c = intval(r[0]),
                            l = c > 0 && s.onlines()[c],
                            d = i(a, 6),
                            u = d[0],
                            _ = d[1],
                            p = d[2],
                            f = d[3],
                            h = d[4],
                            w = d[5],
                            v = "search" === o ? f : "h_" + o,
                            g = s.row(c, p, _, u, l, re, v, h, w);
                        s.addToListsHtml(o, g, e), n[c] = 1
                    }))
                }
            }), o.innerHTML = s.htmlRows(e), t && e && "#" !== e[0] && this.hintsSearch(e, cur.lastRe || !1), e && (cur.tsStr = e)
        },
        hintsSearch: function(e, t) {
            var o = ge("ts_input"),
                n = ge("ts_cont_wrap"),
                r = void 0;
            ajax.post("al_search.php", {
                act: "get_pages_hints",
                q: e
            }, {
                cache: 1,
                onDone: function(a) {
                    if (trim(val(o)) !== e) return !1;
                    if (!a) return !1;
                    var c = s.maxItems - geByClass("ts_contact", n).length - 1,
                        l = {};
                    if (each(a, function(o, n) {
                            var a = intval(o),
                                d = i(n, 6),
                                u = d[0],
                                _ = d[1],
                                p = d[2],
                                f = d[3],
                                h = d[4],
                                w = d[5],
                                v = s.searchLists(e),
                                g = f.replace("h_", ""),
                                m = (v[g] || {}).parent || g;
                            if (void 0 === v[m] && (m = "search"), l[m] = l[m] || {}, l[m][o] = n, s.lists[m] = s.lists[m] || {}, s.lists[m][o] = n, ge("ts_contact" + a)) return !0;
                            if (!c--) return !1;
                            var b = s.row(a, p, _, u, !1, t, f, h, w);
                            return s.addToListsHtml(m, b, e), r = !0, !0
                        }), each(l, function(e, t) {
                            return s.updateCache(e, t, !0)
                        }), r) {
                        var d = geByClass1("active", n),
                            u = d ? d.id : "";
                        n.innerHTML = s.htmlRows(e), u && ge(u) && addClass(ge(u), "active")
                    }
                }
            })
        },
        writeBox: function(e) {
            window.curFastChat && curFastChat.inited && window.FastChat ? FastChat.selectPeer(e, !1, {
                entrypoint: "fastchat_global_search"
            }) : e > 0 && e < 2e9 ? window.showWriteMessageBox(!1, e) : nav.go("/im?sel=" + e)
        }
    };
    t.default = s
}, function(e, t, o) {
    'eat script';
    var n = o(18),
        i = o(4),
        r = o(36),
        a = o(95),
        s = o(25),
        c = o(53),
        l = o(59),
        d = o(110),
        u = o(19),
        _ = o(23),
        p = o(50),
        f = o(96);
    e.exports = function(e, t, o, h, w, v) {
        var g = n[e],
            m = g,
            b = w ? "set" : "add",
            y = m && m.prototype,
            k = {},
            x = function(e) {
                var t = y[e];
                r(y, e, "delete" == e ? function(e) {
                    return !(v && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return !(v && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return v && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, o) {
                    return t.call(this, 0 === e ? 0 : e, o), this
                })
            };
        if ("function" == typeof m && (v || y.forEach && !u(function() {
                (new m).entries().next()
            }))) {
            var C = new m,
                T = C[b](v ? {} : -0, 1) != C,
                E = u(function() {
                    C.has(1)
                }),
                L = _(function(e) {
                    new m(e)
                }),
                S = !v && u(function() {
                    for (var e = new m, t = 5; t--;) e[b](t, t);
                    return !e.has(-0)
                });
            L || ((m = t(function(t, o) {
                l(t, m, e);
                var n = f(new g, t, m);
                return void 0 != o && c(o, w, n[b], n), n
            })).prototype = y, y.constructor = m), (E || S) && (x("delete"), x("has"), w && x("get")), (S || T) && x(b), v && y.clear && delete y.clear
        } else m = h.getConstructor(t, e, w, b), a(m.prototype, o), s.NEED = !0;
        return p(m, e), k[e] = m, i(i.G + i.W + i.F * (m != g), k), v || h.setStrong(m, e, w), m
    }
}, function(e, t, o) {
    var n = o(55),
        i = o(29),
        r = o(16)("IE_PROTO"),
        a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), n(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}, function(e, t, o) {
    'eat script';
    var n = o(60).f,
        i = o(71),
        r = (o(17), o(95)),
        a = o(44),
        s = o(59),
        c = o(87),
        l = o(53),
        d = o(70),
        u = o(57),
        _ = o(85),
        p = o(98),
        f = o(25).fastKey,
        h = p ? "_s" : "size",
        w = function(e, t) {
            var o, n = f(t);
            if ("F" !== n) return e._i[n];
            for (o = e._f; o; o = o.n)
                if (o.k == t) return o
        };
    e.exports = {
        getConstructor: function(e, t, o, d) {
            var u = e(function(e, n) {
                s(e, u, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[h] = 0, void 0 != n && l(n, o, e[d], e)
            });
            return r(u.prototype, {
                clear: function() {
                    for (var e = this._i, t = this._f; t; t = t.n) t.r = !0, t.p && (t.p = t.p.n = void 0), delete e[t.i];
                    this._f = this._l = void 0, this[h] = 0
                },
                delete: function(e) {
                    var t = w(this, e);
                    if (t) {
                        var o = t.n,
                            n = t.p;
                        delete this._i[t.i], t.r = !0, n && (n.n = o), o && (o.p = n), this._f == t && (this._f = o), this._l == t && (this._l = n), this[h]--
                    }
                    return !!t
                },
                forEach: function(e) {
                    s(this, u, "forEach");
                    for (var t, o = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (o(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!w(this, e)
                }
            }), p && n(u.prototype, "size", {
                get: function() {
                    return c(this[h])
                }
            }), u
        },
        def: function(e, t, o) {
            var n, i, r = w(e, t);
            return r ? r.v = o : (e._l = r = {
                i: i = f(t, !0),
                k: t,
                v: o,
                p: n = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = r), n && (n.n = r), e[h]++, "F" !== i && (e._i[i] = r)), e
        },
        getEntry: w,
        setStrong: function(e, t, o) {
            d(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                return this._t && (this._l = t = t ? t.n : this._t._f) ? u(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, u(1))
            }, o ? "entries" : "values", !o, !0), _(t)
        }
    }
}, function(e, t, o) {
    var n = o(90),
        i = o(24),
        r = o(21),
        a = o(15),
        s = o(55),
        c = o(108),
        l = Object.getOwnPropertyDescriptor;
    t.f = o(98) ? l : function(e, t) {
        if (e = r(e), t = a(t, !0), c) try {
            return l(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!n.f.call(e, t), e[t])
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "vkLocal", function() {
        return s
    }), o.d(t, "lTimeout", function() {
        return c
    }), o.d(t, "rand", function() {
        return l
    }), o.d(t, "irand", function() {
        return d
    }), o.d(t, "isUndefined", function() {
        return u
    }), o.d(t, "isFunction", function() {
        return _
    }), o.d(t, "isArray", function() {
        return p
    }), o.d(t, "isString", function() {
        return f
    }), o.d(t, "isObject", function() {
        return h
    }), o.d(t, "isEmpty", function() {
        return w
    }), o.d(t, "vkNow", function() {
        return v
    }), o.d(t, "vkImage", function() {
        return g
    }), o.d(t, "trim", function() {
        return m
    }), o.d(t, "stripHTML", function() {
        return b
    }), o.d(t, "escapeRE", function() {
        return y
    }), o.d(t, "intval", function() {
        return k
    }), o.d(t, "floatval", function() {
        return x
    }), o.d(t, "positive", function() {
        return C
    }), o.d(t, "isNumeric", function() {
        return T
    }), o.d(t, "winToUtf", function() {
        return E
    }), o.d(t, "replaceEntities", function() {
        return L
    }), o.d(t, "clean", function() {
        return S
    }), o.d(t, "unclean", function() {
        return B
    }), o.d(t, "each", function() {
        return O
    }), o.d(t, "indexOf", function() {
        return P
    }), o.d(t, "inArray", function() {
        return A
    }), o.d(t, "clone", function() {
        return M
    }), o.d(t, "arrayKeyDiff", function() {
        return j
    }), o.d(t, "extend", function() {
        return N
    }), o.d(t, "addTemplates", function() {
        return D
    }), o.d(t, "getTemplate", function() {
        return I
    }), o.d(t, "serializeForm", function() {
        return F
    }), o.d(t, "extractUrls", function() {
        return q
    }), o.d(t, "isRetina", function() {
        return H
    }), o.d(t, "getCaretCharacterOffsetWithin", function() {
        return R
    }), o.d(t, "formatCount", function() {
        return W
    }), o.d(t, "encodeHtml", function() {
        return z
    }), o.d(t, "decodeHtml", function() {
        return K
    });
    var n = o(0),
        i = o(12),
        r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function s(e) {
        var t = PageID;
        return function() {
            t === PageID && e.apply(this, arguments)
        }
    }

    function c(e, t) {
        return setTimeout(s(e), t)
    }
    window.PageID = window.PageID || 1;
    var l = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        d = function(e, t) {
            return Math.floor(l(e, t))
        },
        u = function(e) {
            return void 0 === e
        },
        _ = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        p = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        f = function(e) {
            return "string" == typeof e
        },
        h = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        };

    function w(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }
    var v = function() {
            return +new Date
        },
        g = function() {
            return window.Image ? new Image : ce("img")
        },
        m = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        b = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        y = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function k(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function x(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function C(e) {
        return (e = k(e)) < 0 ? 0 : e
    }

    function T(e) {
        return !isNaN(e)
    }

    function E(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = k(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function L() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(n.se)("<textarea>" + e + "</textarea>").value
    }

    function S(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function B(e) {
        return L(e.replace(/\t/g, "\n"))
    }

    function O(e, t) {
        if (h(e) || void 0 === e.length) {
            for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o) && !1 === t.call(e[o], o, e[o])) break
        } else
            for (var n = 0, i = e.length; n < i; n++) {
                var r = e[n];
                if (!1 === t.call(r, n, r)) break
            }
        return e
    }

    function P(e, t, o) {
        for (var n = o || 0, i = (e || []).length; n < i; n++)
            if (e[n] == t) return n;
        return -1
    }

    function A(e, t) {
        return -1 !== P(t, e)
    }

    function M(e, t) {
        var o = h(e) || void 0 === e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === a(e[n]) && "prototype" !== n && null !== e[n] ? o[n] = M(e[n]) : o[n] = e[n]);
        return o
    }

    function j(e) {
        var t = {},
            o = arguments.length,
            n = arguments;
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                for (var r = !1, a = 1; a < o; a++) n[a][i] && n[a][i] === e[i] && (r = !0);
                r || (t[i] = e[i])
            }
        return t
    }

    function N() {
        var e = arguments,
            t = e.length,
            o = e[0] || {},
            n = 1,
            i = !1;
        for ("boolean" == typeof o && (i = o, o = e[1] || {}, n = 2), "object" === (void 0 === o ? "undefined" : a(o)) || _(o) || (o = {}); n < t; n++) {
            var r = e[n];
            if (null != r)
                for (var s in r)
                    if (r.hasOwnProperty(s)) {
                        var c = o[s],
                            l = r[s];
                        o !== l && (i && l && "object" === (void 0 === l ? "undefined" : a(l)) && !l.nodeType ? o[s] = N(i, c || (null != l.length ? [] : {}), l) : void 0 !== l && (o[s] = l))
                    }
        }
        return o
    }

    function D(e) {
        window.templates = window.templates || {}, N(window.templates, e)
    }

    function I(e, t) {
        var o = (window.templates = window.templates || {})[e];
        return "function" == typeof o && (o = o()), o && t ? Object(n.rs)(o, t) : o || ""
    }

    function F(e) {
        if ("object" !== (void 0 === e ? "undefined" : a(e))) return !1;
        var t = {},
            o = function(t) {
                return Object(n.geByTag)(t, e)
            },
            i = function(o, i) {
                if (i.name)
                    if ("text" !== i.type && i.type)
                        if (i.getAttribute("bool")) {
                            var r = Object(n.val)(i);
                            if (!r || "0" === r) return;
                            t[i.name] = 1
                        } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                else t[i.name] = Object(n.val)(i)
            };
        return O(o("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
        }), O(o("select"), i), O(o("textarea"), i), t
    }

    function q(e, t) {
        for (var o = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, n = void 0, i = []; e && (n = e.match(o));) {
            e = e.substr(n.index + n[0].length);
            var r = 0;
            n[4] || (r = 7), i.push({
                url: n[2 + r],
                query: n[5 + r] || "",
                domain: n[4 + r]
            })
        }
        return i
    }
    var H = function() {
        return window.devicePixelRatio >= 2
    };

    function R(e) {
        var t = 0,
            o = 0,
            n = e.ownerDocument || e.document,
            i = n.defaultView || n.parentWindow;
        if (i.getSelection().rangeCount > 0) {
            var r = i.getSelection().getRangeAt(0),
                a = r.cloneRange();
            a.selectNodeContents(e), a.setEnd(r.startContainer, r.startOffset), t = a.toString().length, a.setEnd(r.endContainer, r.endOffset), o = a.toString().length
        }
        return [t, o]
    }

    function W(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? W(e = (e = k(e / 1e5)) > 1e3 ? k(e / 10) : e / 10, N(t, {
            noCheck: !0
        }), !0) + "M" : e >= o && !t.noCheck ? W(e = (e = k(e / 100)) > 100 ? k(e / 10) : e / 10, N(t, {
            noCheck: !0
        }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var V, U = r((V = null, [function(e) {
            return V || (V = Object(n.se)("<span> </span>")), V.innerText = e, V.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }, function(e) {
            return V || (V = Object(n.se)("<span> </span>")), V.innerHTML = e, V.innerText
        }]), 2),
        z = U[0],
        K = U[1];
    window.isRetina = H, window.extractUrls = q, window.serializeForm = F, window.addTemplates = D, window.getTemplate = I, window.rand = l, window.irand = d, window.isUndefined = u, window.isFunction = _, window.isArray = p, window.isString = f, window.isObject = h, window.isEmpty = w, window.vkNow = v, window.vkImage = g, window.trim = m, window.stripHTML = b, window.escapeRE = y, window.intval = k, window.floatval = x, window.positive = C, window.isNumeric = T, window.winToUtf = E, window.replaceEntities = L, window.clean = S, window.unclean = B, window.each = O, window.indexOf = P, window.inArray = A, window.clone = M, window.arrayKeyDiff = j, window.extend = N, window.vkLocal = s, window.lTimeout = c, window.getCaretCharacterOffsetWithin = R, window.formatCount = W, window.encodeHtml = z, window.decodeHtml = K
}, function(e, t, o) {
    var n = o(105),
        i = o(30)("iterator"),
        r = o(20);
    e.exports = o(88).getIteratorMethod = function(e) {
        if (void 0 != e) return e[i] || e["@@iterator"] || r[n(e)]
    }
}, function(e, t, o) {
    var n = o(47),
        i = o(87);
    e.exports = function(e) {
        return function(t, o) {
            var r, a, s = String(i(t)),
                c = n(o),
                l = s.length;
            return c < 0 || c >= l ? e ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536
        }
    }
}, function(e, t, o) {
    'eat script';
    var n = o(18),
        i = o(60),
        r = o(98),
        a = o(30)("species");
    e.exports = function(e) {
        var t = n[e];
        r && t && !t[a] && i.f(t, a, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, o) {
    'eat script';
    var n = o(105),
        i = {};
    i[o(30)("toStringTag")] = "z", i + "" != "[object z]" && o(36)(Object.prototype, "toString", function() {
        return "[object " + n(this) + "]"
    }, !0)
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    var o = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = o)
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n, i, r, a, s, c, l, d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    n = window, i = n.HTMLCanvasElement && n.HTMLCanvasElement.prototype, r = n.Blob && function() {
        try {
            return Boolean(new Blob)
        } catch (e) {
            return !1
        }
    }(), a = r && n.Uint8Array && function() {
        try {
            return 100 === new Blob([new Uint8Array(100)]).size
        } catch (e) {
            return !1
        }
    }(), s = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || n.MSBlobBuilder, c = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, l = (r || s) && n.atob && n.ArrayBuffer && n.Uint8Array && function(e) {
        var t, o, n, i, l, d, u, _, p;
        if (!(t = e.match(c))) throw new Error("invalid data URI");
        for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), l = n ? atob(i) : decodeURIComponent(i), d = new ArrayBuffer(l.length), u = new Uint8Array(d), _ = 0; _ < l.length; _ += 1) u[_] = l.charCodeAt(_);
        return r ? new Blob([a ? u : d], {
            type: o
        }) : ((p = new s).append(d), p.getBlob(o))
    }, n.HTMLCanvasElement && !i.toBlob && (i.mozGetAsFile ? i.toBlob = function(e, t, o) {
        e(o && i.toDataURL && l ? l(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
    } : i.toDataURL && l && (i.toBlob = function(e, t, o) {
        e(l(this.toDataURL(t, o)))
    })), "function" == typeof define && define.amd ? define(function() {
        return l
    }) : "object" == ("undefined" == typeof module ? "undefined" : d(module)) && module.exports ? module.exports = l : n.dataURLtoBlob = l
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "_initCookies", function() {
        return r
    }), o.d(t, "getCookie", function() {
        return a
    }), o.d(t, "setCookie", function() {
        return s
    }), o.d(t, "hideCookiesPolicy", function() {
        return c
    });
    var n = o(0),
        i = o(11);

    function r() {
        _cookies = {};
        for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; o < n; o++) {
            var i = e[o].split("=");
            2 == i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
        }
    }

    function a(e) {
        return r(), _cookies[e]
    }

    function s(e, t, o, n) {
        var i = "";
        if (o) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()
        }
        var a = locDomain;
        document.cookie = e + "=" + escape(t) + i + "; path=/" + (a ? "; domain=." + a : "") + (n && "https:" == locProtocol ? "; secure" : "")
    }

    function c() {
        Object(n.re)("cookies_policy_wrap"), i.ajax.post("/settings", {
            act: "a_hide_cookies_policy"
        })
    }
    window._cookies = {}, window._initCookies = r, window.getCookie = a, window.setCookie = s, window.hideCookiesPolicy = c
}, function(e, t, o) {
    e.exports = o(3)
}, function(e, t, o) {
    e.exports = o(18).document && document.documentElement
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "browser", function() {
        return r
    }), o.d(t, "mobPlatforms", function() {
        return a
    }), o.d(t, "browserFeatures", function() {
        return s
    });
    var n = o(0),
        i = navigator.userAgent.toLowerCase(),
        r = {
            version: (i.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
            opera: /opera/i.test(i) || /opr/i.test(i),
            vivaldi: /vivaldi/i.test(i),
            amigo: /amigo.*mrchrome soc/i.test(i),
            msie: /msie/i.test(i) && !/opera/i.test(i) || /trident\//i.test(i) || /edge/i.test(i),
            msie6: /msie 6/i.test(i) && !/opera/i.test(i),
            msie7: /msie 7/i.test(i) && !/opera/i.test(i),
            msie8: /msie 8/i.test(i) && !/opera/i.test(i),
            msie9: /msie 9/i.test(i) && !/opera/i.test(i),
            msie_edge: /edge/i.test(i) && !/opera/i.test(i),
            mozilla: /firefox/i.test(i),
            chrome: /chrome/i.test(i) && !/edge/i.test(i),
            safari: !/chrome/i.test(i) && /webkit|safari|khtml/i.test(i),
            iphone: /iphone/i.test(i),
            ipod: /ipod/i.test(i),
            iphone4: /iphone.*OS 4/i.test(i),
            ipod4: /ipod.*OS 4/i.test(i),
            ipad: /ipad/i.test(i),
            android: /android/i.test(i),
            bada: /bada/i.test(i),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(i),
            msie_mobile: /iemobile/i.test(i),
            safari_mobile: /iphone|ipod|ipad/i.test(i),
            opera_mobile: /opera mini|opera mobi/i.test(i),
            opera_mini: /opera mini/i.test(i),
            mac: /mac/i.test(i),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(i),
            smart_tv: /smart-tv|smarttv/i.test(i)
        },
        a = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            8: 1
        },
        s = {
            wheelEvent: "onwheel" in Object(n.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : r.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
            hasBoundingClientRect: "getBoundingClientRect" in Object(n.ce)("div"),
            cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
        };
    window.browser = r, window.mobPlatforms = a, window.browserFeatures = s
}, function(e, t, o) {
    var n = o(36);
    e.exports = function(e, t, o) {
        for (var i in t) n(e, i, t[i], o);
        return e
    }
}, function(e, t, o) {
    var n = o(110),
        i = o(67).set;
    e.exports = function(e, t, o) {
        var r, a = t.constructor;
        return a !== o && "function" == typeof a && (r = a.prototype) !== o.prototype && n(r) && i && i(e, r), e
    }
}, function(e, t, o) {
    o(86), o(99), o(46), o(2), e.exports = o(88).Map
}, function(e, t, o) {
    e.exports = !o(19)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, o) {
    'eat script';
    var n = o(84)(!0);
    o(70)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            o = this._i;
        return o >= t.length ? {
            value: void 0,
            done: !0
        } : (e = n(t, o), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (clearTimeout(hfTimeout), t > 0) hfTimeout = setTimeout(function() {
            n(e, 0)
        }, t);
        else {
            var o = e ? "visible" : "hidden";
            triggerEvent(document, e ? "unblock" : "block");
            var i = function() {
                this.getAttribute("preventhide") || "internal/link" == this.getAttribute("type") || ("flash_app" == this.id && browser.msie ? e ? setStyle(this, {
                    position: "static",
                    top: 0
                }) : setStyle(this, {
                    position: "absolute",
                    top: "-5000px"
                }) : this.style.visibility = o)
            };
            each(geByTag("embed"), i), each(geByTag("object"), i)
        }
    }

    function i(e, t, o, n) {
        if (!t.url || !t.id) return !1;
        var i = (t = extend({
            version: 9,
            width: 1,
            height: 1
        }, t)).url;
        return stVersions[i] || (stVersions[i] = ""), __debugMode && stVersions[i] < 1e6 && (stVersions[i] += irand(1e6, 2e6)), stVersions[i] && (t.url += (-1 == t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[i]), o = extend({
            quality: "high",
            flashvars: ajx2q(n)
        }, o), !(browser.flash < t.version) && (ge(e).innerHTML = browser.flashwrap(t, o), !0)
    }
    o.r(t), o.d(t, "toggleFlash", function() {
            return n
        }), o.d(t, "renderFlash", function() {
            return i
        }),
        function() {
            var e = [0, 0, 0],
                t = "ShockwaveFlash.ShockwaveFlash",
                o = "embed",
                n = 'type="application/x-shockwave-flash" ',
                i = function(e) {
                    return e.toString().replace("&", "&amp;").replace('"', "&quot;")
                };
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                var r = navigator.plugins["Shockwave Flash"];
                if (r && r.description)
                    for (var a = r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), s = 0; s < 3; ++s) e[s] = a[s] || 0
            } else {
                if (_ua.indexOf("Windows CE") >= 0) {
                    var c = !0;
                    for (a = 6; c;) try {
                        ++a, c = new ActiveXObject(t + "." + a), e[0] = a
                    } catch (e) {}
                } else try {
                    e = (c = new ActiveXObject(t + ".7")).GetVariable("$version").split(" ")[1].split(",")
                } catch (e) {}
                o = "object", n = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
            }
            browser.flashwrap = "embed" == o ? function(e, t) {
                t = extend({
                    id: e.id,
                    name: e.id,
                    width: e.width,
                    height: e.height,
                    style: e.style,
                    preventhide: e.preventhide
                }, t), browser.flash >= e.version ? t.src = e.url : t.src = e.express;
                var o = [];
                for (var r in t) {
                    var a = t[r];
                    void 0 !== a && null !== a && o.push(r + '="' + i(a) + '" ')
                }
                return "<embed " + n + o.join("") + "/>"
            } : function(e, t) {
                browser.flash >= e.version ? t.movie = e.url : t.movie = e.express;
                var o = {
                        id: e.id,
                        width: e.width,
                        height: e.height,
                        style: e.style,
                        preventhide: e.preventhide
                    },
                    r = [];
                for (var a in o) {
                    void 0 !== (c = o[a]) && null !== c && r.push(a + '="' + i(c) + '" ')
                }
                var s = [];
                for (var a in t) {
                    var c;
                    void 0 !== (c = t[a]) && null !== c && s.push('<param name="' + a + '" value="' + i(c) + '" />')
                }
                return "<object " + n + r.join("") + ">" + s.join("") + "</object>"
            }, e[0] < 7 && (e = [0, 0, 0]), browser.flash = intval(e[0]), browser.flashfull = {
                major: browser.flash,
                minor: intval(e[1]),
                rev: intval(e[2])
            }, setCookie("remixflash", intval(e[0]) + "." + intval(e[1]) + "." + intval(e[2]), 30)
        }(), window.hfTimeout = 0, window.toggleFlash = n, window.renderFlash = i
}, function(e, t, o) {
    var n = o(76);
    e.exports = function(e, t, o, i) {
        try {
            return i ? t(n(o)[0], o[1]) : t(o)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && n(r.call(e)), t
        }
    }
}, function(e, t, o) {
    var n = o(47),
        i = Math.max,
        r = Math.min;
    e.exports = function(e, t) {
        return (e = n(e)) < 0 ? i(e + t, 0) : r(e, t)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "scrollToY", function() {
        return a
    }), o.d(t, "scrollToTop", function() {
        return s
    }), o.d(t, "scrollGetX", function() {
        return c
    }), o.d(t, "scrollGetY", function() {
        return l
    }), o.d(t, "disableBodyScroll", function() {
        return d
    }), o.d(t, "enableBodyScroll", function() {
        return u
    });
    var n = o(40),
        i = o(72),
        r = o(0);

    function a(e, t, o, s) {
        if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), s || (e = Math.max(0, e - (vk.staticheader ? 0 : Object(r.getSize)("page_header_cont")[1]))), Object(r.data)(bodyNode, "tween") && Object(r.data)(bodyNode, "tween").stop(!1), Object(r.data)(htmlNode, "tween") && Object(r.data)(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
            var d = function() {
                window.scrollAnimation = !1, 2 === o && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), Object(n.updSideTopLink)())
            };
            window.scrollAnimation = !0, Object(i.animate)(htmlNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: d
            }), Object(i.animate)(bodyNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: d
            })
        } else {
            if (o && 2 !== o) {
                "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                var u = l() - e;
                return Math.abs(u) > 6 && a(e + (u > 0 ? 6 : -6), 0, 2, !0), Object(n.updSideTopLink)(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(a.pbind(e, 100, 2, !0), 0))
            }
            window.scroll(c(), e), o || Object(n.updSideTopLink)()
        }
    }

    function s(e) {
        return a(0, e)
    }

    function c() {
        return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
    }

    function l() {
        return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
    }

    function d() {
        bodyNode.style.overflow = "hidden"
    }

    function u() {
        bodyNode.style.overflow = "auto"
    }
    window.scrollToY = a, window.scrollToTop = s, window.scrollGetX = c, window.scrollGetY = l, window.disableBodyScroll = d, window.enableBodyScroll = u
}, function(e, t, o) {
    var n = o(47),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(n(e), 9007199254740991) : 0
    }
}, function(e, t, o) {
    var n = o(10),
        i = o(30)("toStringTag"),
        r = "Arguments" == n(function() {
            return arguments
        }());
    e.exports = function(e) {
        var t, o, a;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(o = function(e, t) {
            try {
                return e[t]
            } catch (e) {}
        }(t = Object(e), i)) ? o : r ? n(t) : "Object" == (a = n(t)) && "function" == typeof t.callee ? "Arguments" : a
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var o = 0; o < this.length; ++o)
                if (e.call(t, this[o], o, this)) return o;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var o = 0; o < this.length; ++o)
                if (e.call(t, this[o], o, this)) return this[o]
        }
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "shortCurrency", function() {
        return r
    });
    var n = o(82),
        i = o(0);

    function r() {
        var e = {};
        Object(n.each)(Object(i.geByClass)("_short_currency"), function() {
            var t = Object(i.domData)(this, "short") || "";
            if (!t) return !0;
            var o = Object(n.winToUtf)(t).length,
                r = Object(i.getStyle)(this, "fontFamily") || "tahoma,arial,sans-serif";
            if (void 0 === e[r]) {
                for (var a = "", s = o - 1; s >= 0; s--) a += "&#8399;";
                var c = Object(i.ce)("div", {
                    innerHTML: "<b>" + t + "</b><b>" + a + "</b>"
                }, {
                    fontFamily: r,
                    fontSize: "24px"
                });
                Object(i.ge)("utils").appendChild(c), e[r] = Math.abs(c.firstChild.offsetWidth - c.lastChild.offsetWidth) >= 2 * o, Object(i.re)(c)
            }
            e[r] && val(this, t)
        })
    }
    window.shortCurrency = r
}, function(e, t, o) {
    e.exports = !o(98) && !o(19)(function() {
        return 7 != Object.defineProperty(o(38)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, o) {
    var n = o(1),
        i = o(34);
    e.exports = Object.keys || function(e) {
        return n(e, i)
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(14);
    window.EventEmitter = n, t.default = n
}, function(e, t) {
    var o;
    o = function() {
        return this
    }();
    try {
        o = o || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (o = window)
    }
    e.exports = o
}]);