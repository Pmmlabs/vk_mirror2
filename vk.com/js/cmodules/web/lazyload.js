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
    }, n.p = "", n(n.s = 14)
}({
    133: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "browser", function() {
            return i
        }), n.d(e, "mobPlatforms", function() {
            return a
        }), n.d(e, "browserFeatures", function() {
            return u
        }), n.d(e, "initBrowserUtils", function() {
            return c
        });
        var r = n(21),
            o = navigator.userAgent.toLowerCase(),
            i = {
                version: (o.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
                opera: /opera/i.test(o) || /opr/i.test(o),
                vivaldi: /vivaldi/i.test(o),
                amigo: /amigo.*mrchrome soc/i.test(o),
                msie: /msie/i.test(o) && !/opera/i.test(o) || /trident\//i.test(o) || /edge/i.test(o),
                msie6: /msie 6/i.test(o) && !/opera/i.test(o),
                msie7: /msie 7/i.test(o) && !/opera/i.test(o),
                msie8: /msie 8/i.test(o) && !/opera/i.test(o),
                msie9: /msie 9/i.test(o) && !/opera/i.test(o),
                msie_edge: /edge/i.test(o) && !/opera/i.test(o),
                mozilla: /firefox/i.test(o),
                chrome: /chrome/i.test(o) && !/edge/i.test(o),
                safari: !/chrome/i.test(o) && /webkit|safari|khtml/i.test(o),
                iphone: /iphone/i.test(o),
                ipod: /ipod/i.test(o),
                iphone4: /iphone.*OS 4/i.test(o),
                ipod4: /ipod.*OS 4/i.test(o),
                ipad: /ipad/i.test(o),
                android: /android/i.test(o),
                bada: /bada/i.test(o),
                mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(o),
                msie_mobile: /iemobile/i.test(o),
                safari_mobile: /iphone|ipod|ipad/i.test(o),
                opera_mobile: /opera mini|opera mobi/i.test(o),
                opera_mini: /opera mini/i.test(o),
                mac: /mac/i.test(o),
                windows7: /windows nt 6.1/i.test(o),
                windowsVista: /windows nt 6.0/i.test(o),
                windowsXp: /windows nt (5.2|5.1)/i.test(o),
                search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(o),
                smart_tv: /smart-tv|smarttv/i.test(o)
            },
            a = {
                1: 1,
                2: 1,
                3: 1,
                4: 1,
                5: 1,
                8: 1
            },
            u = {
                wheelEvent: "onwheel" in Object(r.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : i.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
                hasBoundingClientRect: "getBoundingClientRect" in Object(r.ce)("div"),
                cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
            };

        function c() {
            window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.locHost = location.host, window.locProtocol = location.protocol, window.locHash = location.hash.replace("#/", "").replace("#!", "")
        }
    },
    14: function(t, e, n) {
        t.exports = n(43)
    },
    150: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "initDebugTools", function() {
            return o
        }), n.d(e, "logEvalError", function() {
            return i
        }), n.d(e, "debugLog", function() {
            return a
        }), n.d(e, "debugEl", function() {
            return u
        });
        var r = n(133);

        function o() {
            window._logTimer = (new Date).getTime()
        }

        function i(t, e) {
            window.Raven && (e && e.length > 350 && (e = e.slice(0, 150) + "..." + e.slice(-150)), t.message += ": " + e, Raven.captureException(t))
        }

        function a(t) {
            try {
                window.debuglogClient && debuglogClient(t);
                var e = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
                if (window.console && console.log) {
                    var n = Array.prototype.slice.call(arguments);
                    n.unshift(e), r.browser.msie || r.browser.mobile ? console.log(n.join(" ")) : console.log.apply(console, n)
                }
            } catch (t) {}
        }

        function u(t) {
            if (!t) return !1;
            var e = t.tagName,
                n = t.id,
                r = t.className,
                o = (e || "").toLowerCase();
            return r && (o += "." + t.className.replace(/\s+/g, ".")), n && !/^__vk/.test(n) && (o += "#" + t.id), o || (t.toString() || "[NULL]")
        }
    },
    158: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "getObjects", function() {
            return c
        });
        var r = n(261),
            o = n(21),
            i = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0);
                        } catch (t) {
                            o = !0, i = t
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = [];

        function u(t) {
            var e = Object(o.getXY)(t),
                n = i(e, 2)[1],
                r = t.closest(".ui_scroll_outer, #wk_layer_wrap, #box_layer_wrap, body"),
                a = !1;
            if ("BODY" !== r.tagName && r) {
                a = !0;
                var u = Object(o.getXY)(r);
                n -= i(u, 2)[1], n += r.scrollTop
            }
            return {
                y: n,
                from: a ? "custom_scroll" : "window"
            }
        }

        function c() {
            return a
        }
        e.default = function() {
            ! function() {
                a = [];
                for (var t = Object(o.geByClass)("lazyload_need_load"), e = 0; e < t.length; e++) {
                    var n = t[e],
                        r = u(n),
                        c = r.y,
                        l = r.from,
                        s = Object(o.getSize)(n),
                        f = i(s, 2),
                        d = f[0],
                        p = f[1];
                    a.push({
                        elem: n,
                        y: c,
                        from: l,
                        width: d,
                        height: p
                    })
                }
                cur.objects = a
            }(), Object(r.update)()
        }
    },
    21: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "ge", function() {
            return u
        }), n.d(e, "geByTag", function() {
            return c
        }), n.d(e, "geByTag1", function() {
            return l
        }), n.d(e, "geByClass", function() {
            return s
        }), n.d(e, "geByClass1", function() {
            return f
        }), n.d(e, "gpeByClass", function() {
            return d
        }), n.d(e, "domQuery", function() {
            return p
        }), n.d(e, "domQuery1", function() {
            return h
        }), n.d(e, "domClosest", function() {
            return v
        }), n.d(e, "domClosestByTag", function() {
            return g
        }), n.d(e, "gpeByTag", function() {
            return m
        }), n.d(e, "ce", function() {
            return y
        }), n.d(e, "cf", function() {
            return O
        }), n.d(e, "re", function() {
            return T
        }), n.d(e, "se", function() {
            return C
        }), n.d(e, "sech", function() {
            return S
        }), n.d(e, "rs", function() {
            return E
        }), n.d(e, "psr", function() {
            return k
        }), n.d(e, "domReplaceEl", function() {
            return x
        }), n.d(e, "domEL", function() {
            return A
        }), n.d(e, "domNS", function() {
            return N
        }), n.d(e, "domPS", function() {
            return D
        }), n.d(e, "domFC", function() {
            return L
        }), n.d(e, "domLC", function() {
            return H
        }), n.d(e, "domPN", function() {
            return M
        }), n.d(e, "domChildren", function() {
            return P
        }), n.d(e, "domInsertBefore", function() {
            return R
        }), n.d(e, "domInsertAfter", function() {
            return z
        }), n.d(e, "domByClass", function() {
            return Y
        }), n.d(e, "domData", function() {
            return F
        }), n.d(e, "domChildIndex", function() {
            return I
        }), n.d(e, "domCA", function() {
            return B
        }), n.d(e, "domClosestSibling", function() {
            return U
        }), n.d(e, "matchesSelector", function() {
            return W
        }), n.d(e, "isHover", function() {
            return K
        }), n.d(e, "isAncestor", function() {
            return X
        }), n.d(e, "getScroll", function() {
            return $
        }), n.d(e, "domClosestPositioned", function() {
            return V
        }), n.d(e, "domClosestOverflowHidden", function() {
            return q
        }), n.d(e, "show", function() {
            return Z
        }), n.d(e, "hide", function() {
            return G
        }), n.d(e, "isVisible", function() {
            return J
        }), n.d(e, "clientHeight", function() {
            return Q
        }), n.d(e, "getClientRectOffsetY", function() {
            return tt
        }), n.d(e, "toggle", function() {
            return et
        }), n.d(e, "boundingRectEnabled", function() {
            return nt
        }), n.d(e, "getXYRect", function() {
            return rt
        }), n.d(e, "getXY", function() {
            return ot
        }), n.d(e, "isWindow", function() {
            return it
        }), n.d(e, "getSize", function() {
            return at
        }), n.d(e, "getW", function() {
            return ut
        }), n.d(e, "getH", function() {
            return ct
        }), n.d(e, "hasClass", function() {
            return lt
        }), n.d(e, "addClass", function() {
            return st
        }), n.d(e, "addClassDelayed", function() {
            return ft
        }), n.d(e, "removeClass", function() {
            return dt
        }), n.d(e, "removeClassDelayed", function() {
            return pt
        }), n.d(e, "toggleClass", function() {
            return ht
        }), n.d(e, "toggleClassDelayed", function() {
            return vt
        }), n.d(e, "replaceClass", function() {
            return gt
        }), n.d(e, "getStyle", function() {
            return mt
        }), n.d(e, "setStyle", function() {
            return yt
        }), n.d(e, "setStyleDelayed", function() {
            return bt
        }), n.d(e, "setPseudoStyle", function() {
            return wt
        }), n.d(e, "data", function() {
            return _t
        }), n.d(e, "attr", function() {
            return jt
        }), n.d(e, "removeAttr", function() {
            return Ot
        }), n.d(e, "removeData", function() {
            return Tt
        }), n.d(e, "cleanElems", function() {
            return Ct
        }), n.d(e, "setTitle", function() {
            return St
        }), n.d(e, "getZoom", function() {
            return Et
        }), n.d(e, "val", function() {
            return kt
        }), n.d(e, "elfocus", function() {
            return xt
        }), n.d(e, "traverseParent", function() {
            return At
        }), n.d(e, "setDocumentTitle", function() {
            return Dt
        }), n.d(e, "lockDocumentTitle", function() {
            return Lt
        }), n.d(e, "initDomScripts", function() {
            return Ht
        });
        var r = n(268),
            o = n(500),
            i = n(133),
            a = n(150),
            u = function(t) {
                return "string" == typeof t || "number" == typeof t ? document.getElementById(t) : t
            };

        function c(t, e) {
            return (e = u(e) || document).getElementsByTagName(t)
        }

        function l(t, e) {
            return (e = u(e) || document).querySelector && e.querySelector(t) || c(t, e)[0]
        }

        function s(t, e, n) {
            return e = u(e) || document, n = n || "*", t = ("." + t).replace(/\s+/gm, "."), Array.prototype.slice.call(e.querySelectorAll(n + t))
        }

        function f(t, e, n) {
            return e = u(e) || document, n = n || "*", e.querySelector && e.querySelector(n + ("." + t).replace(/\s+/gm, ".")) || s(t, e, n)[0]
        }

        function d(t, e, n) {
            if (!(e = u(e))) return null;
            for (; n !== e && (e = e.parentNode);)
                if (lt(e, t)) return e;
            return null
        }

        function p(t, e) {
            return (e || document).querySelectorAll(t)
        }

        function h(t, e) {
            return (e || document).querySelector(t)
        }

        function v(t, e) {
            return lt(e, t) ? e : d(t, e)
        }

        function g(t, e) {
            return t = t.toUpperCase(), e.nodeType === Node.ELEMENT_NODE && e.tagName.toUpperCase() === t ? e : m(t, e)
        }

        function m(t, e) {
            if (!(e = u(e))) return null;
            for (t = t.toUpperCase(); e = e.parentNode;)
                if (e.tagName && e.tagName.toUpperCase() === t) return e;
            return null
        }

        function y(t, e, n) {
            var o = document.createElement(t);
            return e && Object(r.extend)(o, e), n && yt(o, n), o
        }
        var b, w, _, j, O = (b = document, w = b.createDocumentFragment(), _ = b.createElement("div"), j = b.createRange && b.createRange(), w.appendChild(_), j && j.selectNodeContents(_), j && j.createContextualFragment ? function(t) {
            return t ? j.createContextualFragment(t) : b.createDocumentFragment()
        } : function(t) {
            if (!t) return b.createDocumentFragment();
            _.innerHTML = t;
            for (var e = b.createDocumentFragment(); _.firstChild;) e.appendChild(_.firstChild);
            return e
        });

        function T(t) {
            return (t = u(t)) && t.parentNode && t.parentNode.removeChild(t), t
        }
        var C = function(t) {
                return L(y("div", {
                    innerHTML: t
                }))
            },
            S = function(t) {
                return P(y("div", {
                    innerHTML: t
                }))
            };

        function E(t, e) {
            return Object(r.each)(e, function(e, n) {
                t = t.replace(new RegExp("%" + e + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), t
        }

        function k(t) {
            return "https:" !== locProtocol ? t : t = (t = (t = (t = (t = t.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function x(t, e) {
            return Object(r.isString)(e) && (e = C(e)), M(t).replaceChild(e, t), e
        }

        function A(t, e) {
            for (e = e ? "previousSibling" : "nextSibling"; t && !t.tagName;) t = t[e];
            return t
        }
        var N = function(t) {
                return A((t || {}).nextSibling)
            },
            D = function(t) {
                return A((t || {}).previousSibling, 1)
            },
            L = function(t) {
                return A((t || {}).firstChild)
            },
            H = function(t) {
                return A((t || {}).lastChild, 1)
            },
            M = function(t) {
                return (t || {}).parentNode
            };

        function P(t) {
            for (var e = [], n = t.childNodes, r = 0; r < n.length; r++) n[r].tagName && e.push(n[r]);
            return e
        }

        function R(t, e) {
            var n = M(e);
            return n && n.insertBefore(t, e)
        }

        function z(t, e) {
            var n = M(e);
            return n && n.insertBefore(t, N(e))
        }

        function Y(t, e) {
            return t ? f(e, t) : t
        }

        function F(t, e, n) {
            return t ? void 0 !== n ? (null === n ? t.removeAttribute("data-" + e) : t.setAttribute("data-" + e, n), n) : t.getAttribute("data-" + e) : null
        }

        function I(t) {
            for (var e = 0; null != (t = D(t));) e++;
            return e
        }

        function B(t, e) {
            do {
                t = M(t)
            } while (t && !W(t, e));
            return t
        }

        function U(t, e, n) {
            for (var r = null; null === r && t;)(t = -1 === n ? D(t) : N(t)) && W(t, e) && (r = t);
            return r
        }

        function W(t, e) {
            return !(!(t = u(t)) || t === document) && (t.matches || t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector || function(t) {
                for (var e = (this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e.item(n) !== this;);
                return n > -1
            }).call(t, e)
        }

        function K(t) {
            return W(t, ":hover")
        }

        function X(t, e) {
            var n = u(t);
            if (e = u(e), !t || !e) return !1;
            for (; n = n.parentNode;)
                if (n === e) return !0;
            return !1
        }

        function $() {
            var t = i.browser.msie6 ? u("PageContainer") : document.body,
                e = document.documentElement;
            return [t.scrollLeft || e.scrollLeft || window.pageXOffset || 0, t.scrollTop || e.scrollTop || window.pageYOffset || 0, e.clientWidth || t.clientWidth || 0, e.clientHeight || t.clientHeight || 0]
        }

        function V(t, e) {
            for (var n = (e = e || {}).fromEl || M(t), o = e.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
                var i = mt(n, "position");
                if (Object(r.inArray)(i, o) && (!e.noOverflow || "hidden" !== mt(n, "overflow"))) break;
                n = M(n)
            }
            return n
        }

        function q(t, e) {
            for (var n = t = u(t), r = void 0, o = void 0, a = void 0, c = !1; n && n.tagName && n !== bodyNode;) {
                if (r = mt(n, "position"), o = mt(n, "overflow"), a = mt(n, "transform"), e && i.browser.mozilla) {
                    if ("page_wrap" != n.id && n !== t && "visible" !== o && ("static" === r ? !c || "relative" === c : "fixed" !== c)) break
                } else if (n !== t && "visible" !== o && ("static" === r ? !c || "relative" === c : "fixed" !== c)) break;
                "none" !== a ? c = void 0 : "static" !== r && "fixed" !== c && (c = r), n = M(n)
            }
            return n
        }

        function Z(t) {
            var e = arguments.length;
            if (e > 1)
                for (var n = 0; n < e; n++) Z(arguments[n]);
            else if ((t = u(t)) && t.style) {
                var r = t.olddisplay,
                    o = t.tagName.toLowerCase(),
                    a = "block";
                t.style.display = r || "", "none" === mt(t, "display") && (a = lt(t, "inline") || lt(t, "_inline") ? "inline" : lt(t, "_inline_block") ? "inline-block" : "tr" !== o || i.browser.msie ? "table" !== o || i.browser.msie ? "block" : "table" : "table-row", t.style.display = t.olddisplay = a)
            }
        }

        function G(t) {
            var e = arguments.length;
            if (e > 1)
                for (var n = 0; n < e; n++) G(arguments[n]);
            else if ((t = u(t)) && t.style) {
                var r = mt(t, "display");
                t.olddisplay = "none" !== r ? r : "", t.style.display = "none"
            }
        }

        function J(t) {
            return !(!(t = u(t)) || !t.style) && "none" !== mt(t, "display")
        }

        function Q() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function tt(t, e, n) {
            t = u(t), n = n || 0;
            var o = ot(t)[1],
                i = at(t)[1],
                a = window,
                c = document.documentElement,
                l = Math.max(Object(r.intval)(a.innerHeight), Object(r.intval)(c.clientHeight)),
                s = u("page_header_cont"),
                f = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                d = vk.staticheader ? Math.max(0, at(s)[1] - f) : at(s)[1];
            if (e) {
                if (o + i < f + d + n) return o + i - f - d - n;
                if (o > f + l - n) return o - f - l + n
            } else {
                if (o < f + d + n) return o - f - d - n;
                if (o + i > f + l - n) return o + i - f - l + n
            }
            return 0
        }

        function et(t, e) {
            return void 0 === e && (e = !J(t)), e ? Z(t) : G(t), e
        }

        function nt(t) {
            return void 0 !== t.getBoundingClientRect
        }

        function rt(t, e) {
            var n = void 0;
            if (e && "inline" === mt(t, "display")) {
                var r = t.getClientRects();
                n = r && r[0] || t.getBoundingClientRect()
            } else n = t.getBoundingClientRect();
            return n
        }

        function ot(t, e) {
            if (!(t = u(t))) return [0, 0];
            var n = t.ownerDocument,
                r = {
                    top: 0,
                    left: 0
                };
            if (!n) return [0, 0];
            var o = n.documentElement;
            nt(t) && (r = rt(t, !0));
            var i = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
            return [r.left + (e ? 0 : i.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), r.top + (e ? 0 : i.pageYOffset || o.scrollTop) - (o.clientTop || 0)]
        }

        function it(t) {
            return null != t && t === t.window
        }

        function at(t, e, n) {
            t = u(t);
            var o = document.documentElement,
                i = [0, 0],
                a = void 0;
            if (e && "border-box" === mt(t, "boxSizing") && (e = !1), t === document) i = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (t) {
                var c = function() {
                    i = nt(t) && (a = rt(t, n)) && void 0 !== a.width ? [a.width, a.height] : [t.offsetWidth, t.offsetHeight], e && Object(r.each)(i, function(e, n) {
                        var o = e ? ["Top", "Bottom"] : ["Left", "Right"];
                        Object(r.each)(o, function() {
                            i[e] -= parseFloat(mt(t, "padding" + this)) || 0, i[e] -= parseFloat(mt(t, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (J(t)) c();
                else {
                    var l = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        s = {},
                        f = !1;
                    t.style.cssText.indexOf("!important") > -1 && (f = t.style.cssText), Object(r.each)(l, function(e, n) {
                        s[e] = t.style[e], t.style[e] = n
                    }), c(), Object(r.each)(l, function(e, n) {
                        t.style[e] = s[e]
                    }), f && (t.style.cssText = f)
                }
            }
            return i
        }

        function ut(t) {
            return at(t)[0]
        }

        function ct(t) {
            return at(t)[1]
        }

        function lt(t, e) {
            var n = u(t);
            return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + e + " ") >= 0
        }

        function st(t, e) {
            var n = u(t);
            n && !lt(n, e) && (n.className = (n.className ? n.className + " " : "") + e)
        }
        window.whitespaceRegex = /[\t\r\n\f]/g;
        var ft = function(t, e, n) {
            n = Object(r.positive)(n), setTimeout(st.pbind(t, e), n)
        };

        function dt(t, e) {
            var n = u(t);
            n && (n.className = Object(r.trim)((n.className || "").replace(new RegExp("(\\s|^)" + e + "(\\s|$)"), " ")))
        }
        var pt = function(t, e, n) {
            n = Object(r.positive)(n), setTimeout(dt.pbind(t, e), n)
        };

        function ht(t, e, n) {
            return void 0 === n && (n = !lt(t, e)), (n ? st : dt)(t, e), n
        }

        function vt(t, e, n, o) {
            return o = Object(r.positive)(o), void 0 === n && (n = !lt(t, e)), (n ? ft : pt)(t, e, o), n
        }

        function gt(t, e, n) {
            dt(t, e), st(t, n)
        }

        function mt(t, e, n) {
            if (t = u(t), Object(r.isArray)(e)) {
                var o = {};
                return Object(r.each)(e, function(e, n) {
                    return o[n] = mt(t, n)
                }), o
            }
            if (!t) return "";
            if (void 0 === n && (n = !0), !n && "opacity" === e && i.browser.msie) {
                var a = t.style.filter;
                return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && t.style && (t.style[e] || "height" === e)) return t.style[e];
            var c = void 0,
                l = document.defaultView || window;
            if (l.getComputedStyle) {
                e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
                var s = l.getComputedStyle(t, null);
                s && (c = s.getPropertyValue(e))
            } else if (t.currentStyle) {
                if ("opacity" === e && i.browser.msie) {
                    var f = t.currentStyle.filter;
                    return f && f.indexOf("opacity=") >= 0 ? parseFloat(f.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var d = e.replace(/\-(\w)/g, function(t, e) {
                    return e.toUpperCase()
                });
                "auto" === (c = t.currentStyle[e] || t.currentStyle[d]) && (c = 0), c = (c + "").split(" "), Object(r.each)(c, function(e, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = t.style,
                            o = r.left,
                            i = t.runtimeStyle.left;
                        t.runtimeStyle.left = t.currentStyle.left, r.left = n || 0, c[e] = r.pixelLeft + "px", r.left = o, t.runtimeStyle.left = i
                    }
                }), c = c.join(" ")
            }
            if (n && ("width" === e || "height" === e)) {
                var p = at(t, !0)[{
                    width: 0,
                    height: 1
                }[e]];
                c = (Object(r.intval)(c) ? Math.max(Object(r.floatval)(c), p) : p) + "px"
            }
            return c
        }

        function yt(t, e, n) {
            if (t = u(t))
                if (Object(r.isObject)(e)) Object(r.each)(e, function(e, n) {
                    return yt(t, e, n)
                });
                else if ("opacity" === e) i.browser.msie && ((n + "").length ? t.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : t.style.cssText = t.style.cssText.replace(/filter\s*:[^;]*/gi, ""), t.style.zoom = 1), t.style.opacity !== n && (t.style.opacity = n);
            else try {
                var o = "number" == typeof n;
                o && /height|width/i.test(e) && (n = Math.abs(n)), n = o && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(e) ? n + "px" : n, t.style[e] !== n && (t.style[e] = n)
            } catch (t) {
                Object(a.debugLog)("setStyle error: ", [e, n], t)
            }
        }
        window.cssTransformProp = function() {
            var t = document.createElement("div");
            if (null == t.style.transform) {
                var e = ["Webkit", "Moz", "ms"];
                for (var n in e)
                    if (void 0 !== t.style[e[n] + "Transform"]) return e[n] + "Transform"
            }
            return "transform"
        }();
        var bt = function(t, e, n) {
            return setTimeout(yt.pbind(t, e, n), 0)
        };

        function wt(t, e, n) {
            var o = _t(t, "pseudo-id");
            o || (_t(t, "pseudo-id", o = Object(r.irand)(1e8, 999999999)), st(t, "_pseudo_" + o));
            var i = e + "-style-" + o,
                a = u(i),
                c = "._pseudo_" + o + ":" + e + "{";
            a || (a = headNode.appendChild(y("style", {
                id: i,
                type: "text/css"
            }))), Object(r.each)(n, function(t, e) {
                c += t + ": " + e + " !important;"
            }), c += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(c, 0)) : a.styleSheet && (a.styleSheet.cssText = c)
        }

        function _t(t, e, n) {
            if (!t) return !1;
            var r = t[vkExpand];
            return r || (r = t[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = t)), vkCache[r][e] = n), e ? vkCache[r] && vkCache[r][e] : r
        }

        function jt(t, e, n) {
            return t = u(t), void 0 === n ? t.getAttribute(e) : (t.setAttribute(e, n), n)
        }

        function Ot(t) {
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

        function Tt(t, e) {
            var n = !!t && t[vkExpand];
            if (n)
                if (e) {
                    if (vkCache[n]) {
                        delete vkCache[n][e], e = "";
                        var r = 0;
                        for (var i in vkCache[n])
                            if ("__elem" !== i) {
                                r++;
                                break
                            }
                        r || Tt(t)
                    }
                } else Object(o.removeEvent)(t), Ot(t, vkExpand), delete vkCache[n]
        }

        function Ct() {
            for (var t = arguments, e = 0; e < t.length; ++e) {
                var n = u(t[e]);
                n && (Tt(n), Ot(n, "btnevents"))
            }
        }

        function St(t, e, n) {
            if ((t = u(t)) && !t.titleSet) {
                if (e || (e = t), e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight) t.setAttribute("title", n || t.innerText || t.textContent);
                else {
                    var r = l("b", t);
                    r && (r.scrollWidth > r.clientWidth || r.scrollHeight > r.clientHeight) ? t.setAttribute("title", n || t.innerText || t.textContent) : t.removeAttribute("title")
                }
                t.titleSet = 1
            }
        }

        function Et() {
            var t = u("zoom_test_1") || document.body.appendChild(y("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (u("zoom_test_2") || document.body.appendChild(y("div", {
                id: "zoom_test_2"
            }, {
                left: t.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / t.offsetLeft
        }

        function kt(t, e, n) {
            if (t = u(t)) return void 0 !== e && (t.setValue ? (t.setValue(e), !n && t.phonblur && t.phonblur()) : "INPUT" === t.tagName || "TEXTAREA" === t.tagName ? t.value = e : void 0 !== t.emojiId && window.Emoji ? Emoji.val(t, e) : t.innerHTML = e, !n && Object(o.triggerEvent)(t, "valueChanged")), t.getValue ? t.getValue() : ("INPUT" === t.tagName || "TEXTAREA" === t.tagName ? t.value : t.innerHTML) || ""
        }

        function xt(t, e, n) {
            t = u(t);
            try {
                if (t.focus(), void 0 !== e && !1 !== e || (e = t.value.length), void 0 !== n && !1 !== n || (n = e), t.setSelectionRange) t.setSelectionRange(e, n);
                else if (window.getSelection && document.createRange) {
                    var r = document.createRange();
                    r.selectNodeContents(t), r.collapse(!1);
                    var o = window.getSelection();
                    o.removeAllRanges(), o.addRange(r)
                }
            } catch (t) {}
        }

        function At(t, e, n) {
            for (t = u(t), n = n || 999; t && !e(t);) {
                if (0 === --n) return !1;
                try {
                    if ((t = M(t)) === document) break
                } catch (e) {
                    t = !1
                }
            }
            return t
        }
        var Nt = !1;

        function Dt(t) {
            if (!Nt) return window.document.title = Object(r.replaceEntities)(t)
        }

        function Lt(t) {
            Nt = t, t && window.cur && window.cur.destroy.push(function() {
                Lt(!1)
            })
        }

        function Ht() {
            window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
        }
    },
    261: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "watch", function() {
            return l
        }), n.d(e, "update", function() {
            return f
        }), n.d(e, "default", function() {
            return d
        });
        var r = n(158),
            o = n(718),
            i = n(21),
            a = window,
            u = a.curBox,
            c = a.scrollGetY;

        function l(t) {
            addEvent(t, "scroll", s.pbind(t))
        }

        function s(t) {
            var e = r.getObjects(),
                n = window.innerHeight,
                a = 0,
                l = !0;
            t === document || t === window ? a = c() : t ? (a = t.scrollTop, l = !1) : window.wkcur && window.wkcur.shown ? (a = window.wkLayerWrap.scrollTop, l = !1) : u() ? (a = window.boxLayerWrap.scrollTop, l = !1) : a = c(), !l && t && (n = t.offsetHeight);
            for (var s = function(t) {
                    var r = e[t],
                        u = r.elem,
                        c = r.y,
                        s = r.height;
                    if ("window" !== r.from && l) return "continue";
                    if (c > a - 1.5 * n && a + 1.5 * n > c - s) {
                        Object(i.removeClass)(u, "lazyload_need_load"), e.splice(t, 1), t--;
                        var d = Object(i.attr)(u, "data-lazyload-src");
                        Object(o.loadImage)(d).then(function(t) {
                            t < 10 && Object(i.addClass)(u, "lazyload_no_animation"), "IMG" === u.tagName ? Object(i.attr)(u, "src", d) : Object(i.setStyle)(u, "background-image", "url(" + d + ")"), Object(i.addClass)(u, "lazyload_loaded"), Object(i.re)(Object(i.geByClass1)("lazyload_preview", u))
                        })
                    }
                    f = t
                }, f = 0; f < e.length; f++) s(f)
        }

        function f(t) {
            s(t)
        }

        function d() {
            l(window), f()
        }
    },
    268: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "vkLocal", function() {
            return c
        }), n.d(e, "lTimeout", function() {
            return l
        }), n.d(e, "rand", function() {
            return s
        }), n.d(e, "irand", function() {
            return f
        }), n.d(e, "isUndefined", function() {
            return d
        }), n.d(e, "isFunction", function() {
            return p
        }), n.d(e, "isArray", function() {
            return h
        }), n.d(e, "isString", function() {
            return v
        }), n.d(e, "isObject", function() {
            return g
        }), n.d(e, "isEmpty", function() {
            return m
        }), n.d(e, "vkNow", function() {
            return y
        }), n.d(e, "vkImage", function() {
            return b
        }), n.d(e, "trim", function() {
            return w
        }), n.d(e, "stripHTML", function() {
            return _
        }), n.d(e, "escapeRE", function() {
            return j
        }), n.d(e, "intval", function() {
            return O
        }), n.d(e, "floatval", function() {
            return T
        }), n.d(e, "positive", function() {
            return C
        }), n.d(e, "isNumeric", function() {
            return S
        }), n.d(e, "winToUtf", function() {
            return E
        }), n.d(e, "replaceEntities", function() {
            return k
        }), n.d(e, "clean", function() {
            return x
        }), n.d(e, "unclean", function() {
            return A
        }), n.d(e, "each", function() {
            return N
        }), n.d(e, "indexOf", function() {
            return D
        }), n.d(e, "inArray", function() {
            return L
        }), n.d(e, "clone", function() {
            return H
        }), n.d(e, "arrayKeyDiff", function() {
            return M
        }), n.d(e, "extend", function() {
            return P
        }), n.d(e, "addTemplates", function() {
            return R
        }), n.d(e, "getTemplate", function() {
            return z
        }), n.d(e, "serializeForm", function() {
            return Y
        }), n.d(e, "extractUrls", function() {
            return F
        }), n.d(e, "isRetina", function() {
            return I
        }), n.d(e, "getCaretCharacterOffsetWithin", function() {
            return B
        }), n.d(e, "formatCount", function() {
            return U
        }), n.d(e, "encodeHtml", function() {
            return X
        }), n.d(e, "decodeHtml", function() {
            return $
        }), n.d(e, "initUtilsCommon", function() {
            return V
        });
        var r = n(21),
            o = n(465),
            i = n(133),
            a = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0);
                        } catch (t) {
                            o = !0, i = t
                        } finally {
                            try {
                                !r && u.return && u.return()
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

        function c(t) {
            var e = PageID;
            return function() {
                e === PageID && t.apply(this, arguments)
            }
        }

        function l(t, e) {
            return setTimeout(c(t), e)
        }
        var s = function(t, e) {
                return Math.random() * (e - t + 1) + t
            },
            f = function(t, e) {
                return Math.floor(s(t, e))
            },
            d = function(t) {
                return void 0 === t
            },
            p = function(t) {
                return t && "[object Function]" === Object.prototype.toString.call(t)
            },
            h = function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            v = function(t) {
                return "string" == typeof t
            },
            g = function(t) {
                return "[object Object]" === Object.prototype.toString.call(t)
            };

        function m(t) {
            if ("[object Object]" !== Object.prototype.toString.call(t)) return !1;
            for (var e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        }
        var y = function() {
                return +new Date
            },
            b = function() {
                return window.Image ? new Image : Object(r.ce)("img")
            },
            w = function(t) {
                return (t || "").replace(/^\s+|\s+$/g, "")
            },
            _ = function(t) {
                return t ? t.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            j = function(t) {
                return t ? t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function O(t) {
            return !0 === t ? 1 : parseInt(t) || 0
        }

        function T(t) {
            return !0 === t ? 1 : parseFloat(t) || 0
        }

        function C(t) {
            return (t = O(t)) < 0 ? 0 : t
        }

        function S(t) {
            return !isNaN(t)
        }

        function E(t) {
            return t.replace(/&#(\d\d+);/g, function(t, e) {
                return (e = O(e)) >= 32 ? String.fromCharCode(e) : t
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function k() {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(r.se)("<textarea>" + t + "</textarea>").value
        }

        function x(t) {
            return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function A(t) {
            return k(t.replace(/\t/g, "\n"))
        }

        function N(t, e) {
            if (g(t) || void 0 === t.length) {
                for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n) && !1 === e.call(t[n], n, t[n])) break
            } else
                for (var r = 0, o = t.length; r < o; r++) {
                    var i = t[r];
                    if (!1 === e.call(i, r, i)) break
                }
            return t
        }

        function D(t, e, n) {
            for (var r = n || 0, o = (t || []).length; r < o; r++)
                if (t[r] == e) return r;
            return -1
        }

        function L(t, e) {
            return -1 !== D(e, t)
        }

        function H(t, e) {
            var n = g(t) || void 0 === t.length ? {} : [];
            for (var r in t)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (e && "object" === u(t[r]) && "prototype" !== r && null !== t[r] ? n[r] = H(t[r]) : n[r] = t[r]);
            return n
        }

        function M(t) {
            var e = {},
                n = arguments.length,
                r = arguments;
            for (var o in t)
                if (t.hasOwnProperty(o)) {
                    for (var i = !1, a = 1; a < n; a++) r[a][o] && r[a][o] === t[o] && (i = !0);
                    i || (e[o] = t[o])
                }
            return e
        }

        function P() {
            var t = arguments,
                e = t.length,
                n = t[0] || {},
                r = 1,
                o = !1;
            for ("boolean" == typeof n && (o = n, n = t[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : u(n)) || p(n) || (n = {}); r < e; r++) {
                var i = t[r];
                if (null != i)
                    for (var a in i)
                        if (i.hasOwnProperty(a)) {
                            var c = n[a],
                                l = i[a];
                            n !== l && (o && l && "object" === (void 0 === l ? "undefined" : u(l)) && !l.nodeType ? n[a] = P(o, c || (null != l.length ? [] : {}), l) : void 0 !== l && (n[a] = l))
                        }
            }
            return n
        }

        function R(t) {
            window.templates = window.templates || {}, P(window.templates, t)
        }

        function z(t, e) {
            var n = (window.templates = window.templates || {})[t];
            return "function" == typeof n && (n = n()), n && e ? Object(r.rs)(n, e) : n || ""
        }

        function Y(t) {
            if ("object" !== (void 0 === t ? "undefined" : u(t))) return !1;
            var e = {},
                n = function(e) {
                    return Object(r.geByTag)(e, t)
                },
                o = function(n, o) {
                    if (o.name)
                        if ("text" !== o.type && o.type)
                            if (o.getAttribute("bool")) {
                                var a = Object(r.val)(o);
                                if (!a || "0" === a) return;
                                e[o.name] = 1
                            } else e[o.name] = i.browser.msie && !o.value && t[o.name] ? t[o.name].value : o.value;
                    else e[o.name] = Object(r.val)(o)
                };
            return N(n("input"), function(t, e) {
                if ("radio" !== e.type && "checkbox" !== e.type || e.checked) return o(0, e)
            }), N(n("select"), o), N(n("textarea"), o), e
        }

        function F(t, e) {
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
        var I = function() {
            return window.devicePixelRatio >= 2
        };

        function B(t) {
            var e = 0,
                n = 0,
                r = t.ownerDocument || t.document,
                o = r.defaultView || r.parentWindow;
            if (o.getSelection().rangeCount > 0) {
                var i = o.getSelection().getRangeAt(0),
                    a = i.cloneRange();
                a.selectNodeContents(t), a.setEnd(i.startContainer, i.startOffset), e = a.toString().length, a.setEnd(i.endContainer, i.endOffset), n = a.toString().length
            }
            return [e, n]
        }

        function U(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = e.kLimit || 1e3;
            return t >= (e.mLimit || 1e6) && !e.noCheck ? U(t = (t = O(t / 1e5)) > 1e3 ? O(t / 10) : t / 10, P(e, {
                noCheck: !0
            }), !0) + "M" : t >= n && !e.noCheck ? U(t = (t = O(t / 100)) > 100 ? O(t / 10) : t / 10, P(e, {
                noCheck: !0
            }), !0) + "K" : Object(o.langNumeric)(t, "%s", !0).replace(/,/g, ".")
        }
        var W, K = a((W = null, [function(t) {
                return W || (W = Object(r.se)("<span> </span>")), W.innerText = t, W.innerHTML
            }, function(t) {
                return W || (W = Object(r.se)("<span> </span>")), W.innerHTML = t.replace(/<br\s*\/?>/gim, "\n"), W.innerText
            }]), 2),
            X = K[0],
            $ = K[1];

        function V() {
            window.PageID = window.PageID || 1
        }
    },
    32: function(t, e) {},
    323: function(t, e) {
        var n, r, o = t.exports = {};

        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function u(t) {
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
                r = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (t) {
                r = a
            }
        }();
        var c, l = [],
            s = !1,
            f = -1;

        function d() {
            s && c && (s = !1, c.length ? l = c.concat(l) : f = -1, l.length && p())
        }

        function p() {
            if (!s) {
                var t = u(d);
                s = !0;
                for (var e = l.length; e;) {
                    for (c = l, l = []; ++f < e;) c && c[f].run();
                    f = -1, e = l.length
                }
                c = null, s = !1,
                    function(t) {
                        if (r === clearTimeout) return clearTimeout(t);
                        if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
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

        function h(t, e) {
            this.fun = t, this.array = e
        }

        function v() {}
        o.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            l.push(new h(t, e)), 1 !== l.length || s || u(p)
        }, h.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = v, o.addListener = v, o.once = v, o.off = v, o.removeListener = v, o.removeAllListeners = v, o.emit = v, o.prependListener = v, o.prependOnceListener = v, o.listeners = function(t) {
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
    43: function(t, e, n) {
        "use strict";
        n.r(e);
        var r = n(261),
            o = n(158),
            i = window.LazyLoadInited;

        function a(t) {
            i && (Object(o.default)(), Object(r.update)(t))
        }
        window.LazyLoad = {
            init: function() {
                i || (window.LazyLoadInited = i = !0, Element.prototype.closest && (Object(o.default)(), Object(r.default)()))
            },
            scan: a,
            scanDelayed: function(t) {
                return setTimeout(function() {
                    return a(t)
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
    465: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "parseLatin", function() {
            return a
        }), n.d(e, "parseCyr", function() {
            return u
        }), n.d(e, "parseLatKeys", function() {
            return c
        }), n.d(e, "langNumeric", function() {
            return l
        }), n.d(e, "langSex", function() {
            return s
        }), n.d(e, "langStr", function() {
            return f
        }), n.d(e, "addLangKeys", function() {
            return d
        }), n.d(e, "getLang", function() {
            return p
        }), n.d(e, "langDate", function() {
            return h
        }), n.d(e, "getShortDate", function() {
            return v
        }), n.d(e, "getShortDateOrTime", function() {
            return g
        }), n.d(e, "langWordNumeric", function() {
            return m
        }), n.d(e, "getDateText", function() {
            return y
        }), n.d(e, "getBigDateNew", function() {
            return b
        }), n.d(e, "getSmDate", function() {
            return w
        });
        var r = n(532),
            o = n(268),
            i = n(150);

        function a(t) {
            for (var e = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = t, o = 0, i = e.length; o < i; o++) r = r.split(e[o]).join(n[o]);
            for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", u = 0, c = a.length; u < c; u++) r = r.split(a.charAt(u)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(u));
            return r === t ? null : r
        }

        function u(t) {
            for (var e = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", o = t, i = 0; i < n.length; i++) o = o.split(n[i]).join(e[i]);
            for (var a = 0; a < r.length; a++) o = o.split(r.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
            return o === t ? null : o
        }

        function c(t) {
            for (var e = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = t, r = 0; r < e.length; r++) n = n.split(e.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
            return n == t ? null : n
        }

        function l(t, e, n) {
            if (!e || !window.langConfig) return t;
            var r = void 0;
            if (Object(o.isArray)(e) ? (r = e[1], t != Math.floor(t) ? r = e[langConfig.numRules.float] : Object(o.each)(langConfig.numRules.int, function(n, i) {
                    if ("*" == i[0]) return r = e[i[2]], !1;
                    var a = i[0] ? t % i[0] : t;
                    return -1 != Object(o.indexOf)(i[1], a) ? (r = e[i[2]], !1) : void 0
                })) : r = e, n) {
                for (var i = t.toString().split("."), a = [], u = i[0].length - 3; u > -3; u -= 3) a.unshift(i[0].slice(u > 0 ? u : 0, u + 3));
                i[0] = a.join(langConfig.numDel), t = i.join(langConfig.numDec)
            }
            return r = (r || "%s").replace("%s", t)
        }

        function s(t, e) {
            if (!Object(o.isArray)(e)) return e;
            var n = e[1];
            return window.langConfig ? (Object(o.each)(langConfig.sexRules, function(r, o) {
                return "*" == o[0] ? (n = e[o[1]], !1) : t == o[0] && e[o[1]] ? (n = e[o[1]], !1) : void 0
            }), n) : n
        }

        function f(t) {
            for (var e = arguments, n = e.length, r = t + "", o = 1; o < n; o += 2) {
                var i = "%" === e[o][0] ? e[o] : "{" + e[o] + "}";
                r = r.replace(i, e[o + 1])
            }
            return r
        }

        function d(t, e) {
            var n = e ? window : window.cur;
            n.lang ? Object(o.extend)(n.lang, t) : n.lang = t
        }

        function p() {
            try {
                var t = Array.from(arguments),
                    e = t.shift();
                if (!e) return "...";
                var n = window.cur.lang && window.cur.lang[e] || window.lang && window.lang[e] || window.langpack && window.langpack[e] || window[e];
                if (!n) {
                    var r = e.split("_");
                    return r.shift(), r.join(" ")
                }
                return Object(o.isFunction)(n) ? n.apply(null, t) : void 0 === t[0] && !Object(o.isArray)(n) || "raw" === t[0] ? n : l(t[0], n, t[1])
            } catch (t) {
                Object(i.debugLog)("lang error:" + t.message + "(" + Array.from(arguments).join(", ") + ")")
            }
        }

        function h(t, e, n, i, a, u) {
            var c = void 0;
            if (u || (u = ""), Object(o.isArray)(e) || (e = ["", e, e, e, e]), "number" == typeof t || "string" == typeof t ? (t > 2147483646e3 && (t = 0), t += n, c = new Date(t)) : c = t, a) e = e[1];
            else {
                var l = "";
                !(l = Object(r.isToday)(c) ? e[3] : Object(r.isYesterday)(c) ? e[2] : Object(r.isTomorrow)(c) ? e[4] : e[1]) && e[1] && (l = e[1]), e = l
            }
            var s = {
                    hours: c.getHours(),
                    minutes: c.getMinutes(),
                    seconds: c.getSeconds(),
                    day: c.getDate(),
                    month: c.getMonth() + 1,
                    year: c.getFullYear()
                },
                f = "";
            switch (3 === vk.lang && (f = c.getHours() > 11 ? "pm" : "am", s.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
                case 1:
                    switch (c.getHours()) {
                        case 11:
                            e = e.replace(" о ", " об ");
                            break;
                        case 0:
                            e = e.replace(" о ", " в ")
                    }
                    break;
                case 3:
                    !Object(r.isToday)(c) || Object(r.isYesterday)(c) || Object(r.isTomorrow)(c) || (e = u + e);
                    break;
                case 12:
                case 73:
                    1 == c.getHours() && (e = e.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (s.year = s.year + 543), e.replace("{hour}", s.hours).replace("{num_hour}", Object(r.leadingZero)(s.hours)).replace("{minute}", Object(r.leadingZero)(s.minutes)).replace("{day}", s.day).replace("{num_day}", Object(r.leadingZero)(s.day)).replace("{month}", i[s.month]).replace("{year}", s.year).replace("{short_year}", s.year % 100).replace("{second}", Object(r.leadingZero)(s.seconds)).replace("{am_pm}", f)
        }

        function v(t, e, n, r, o) {
            t *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = p("months_of", "raw")), e *= 1e3;
            var i = Date.now(),
                a = new Date(i),
                u = new Date(t + e);
            return !o && t > i && t - i < 864e5 && a.getDate() === u.getDate() ? h(t, "{hour}:{minute} {am_pm}", e, [], !n) : u.getYear() !== a.getYear() || t < i - 157248e5 ? h(t, p("global_date", "raw"), e, r, !n) : h(t, p("global_short_date", "raw"), e, r, !n)
        }

        function g(t, e, n, o) {
            return Object(r.isToday)(new Date(1e3 * t + 1e3 * e)) ? h(1e3 * t, "{hour}:{minute} {am_pm}", 1e3 * e, [], !n) : v(t, e, n, o)
        }

        function m(t, e, n) {
            return Object(o.isArray)(e) && t < e.length ? e[t] : l(t, n)
        }

        function y(t, e) {
            t += e;
            var n = parseInt(Date.now() / 1e3) - t,
                r = "";
            if (n < 60) r = p("global_just_now");
            else if (n < 3600) {
                r = m(Object(o.intval)(n / 60), p("global_word_mins_ago", "raw"), p("global_mins_ago", "raw"))
            } else if (n < 14400) {
                r = m(Object(o.intval)(n / 3600), p("global_word_hours_ago", "raw"), p("global_hours_ago", "raw"))
            } else r = b(t, 0, !0, "_l");
            return r
        }

        function b(t, e, n, r) {
            void 0 === n && (n = !0), void 0 === e && (e = 0), void 0 === r && (r = ""), e *= 1e3;
            var o = new Date(1e3 * t),
                i = new Date;
            return o.getFullYear() !== i.getFullYear() && o.getTime() < i.getTime() - 1728e5 || Math.abs(o.getTime() - i.getTime()) > 157248e5 ? h(1e3 * t, p("global_date", "raw"), e, p("months_sm_of"), !n) : h(1e3 * t, p("global_short_date_time" + r, "raw"), e, p("months_sm_of"), !n)
        }

        function w(t, e, n) {
            void 0 === n && (n = !0), void 0 === e && (e = 0);
            var r = new Date,
                o = r.getFullYear(),
                i = r.getMonth(),
                a = new Date(1e3 * t),
                u = a.getFullYear(),
                c = a.getMonth();
            return h(1e3 * t, p(u < o && (i > 1 || c < 9 || o - u >= 2) ? "global_date" : "global_short_date_time", "raw"), e, p("months_sm_of", "raw"), !n)
        }
    },
    500: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "KEY", function() {
            return a
        }), n.d(e, "addEvent", function() {
            return u
        }), n.d(e, "removeEvent", function() {
            return c
        }), n.d(e, "triggerEvent", function() {
            return l
        }), n.d(e, "cancelEvent", function() {
            return s
        }), n.d(e, "stopEvent", function() {
            return f
        }), n.d(e, "normEvent", function() {
            return d
        }), n.d(e, "checkEvent", function() {
            return p
        }), n.d(e, "checkKeyboardEvent", function() {
            return h
        }), n.d(e, "checkOver", function() {
            return v
        });
        var r = n(21),
            o = n(268),
            i = n(133),
            a = {
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
            };

        function u(t, e, n, i, a, u) {
            if ((t = Object(r.ge)(t)) && 3 != t.nodeType && 8 != t.nodeType) {
                var c, l = a ? ((c = function(t) {
                    var e = t.data;
                    t.data = a;
                    var r = n.apply(this, [t]);
                    return t.data = e, r
                }).handler = n, c) : n;
                t.setInterval && t !== window && (t = window);
                var f = Object(r.data)(t, "events") || Object(r.data)(t, "events", {}),
                    p = Object(r.data)(t, "handle") || Object(r.data)(t, "handle", function(t) {
                        return function() {
                            (function(t) {
                                t = d(t);
                                var e = Array.from(arguments);
                                e[0] = t;
                                var n = Object(r.data)(this, "events");
                                if (!n || "string" != typeof t.type || !n[t.type] || !n[t.type].length) return;
                                var o = (n[t.type] || []).slice();
                                for (var i in o)
                                    if (o.hasOwnProperty(i)) {
                                        if ("mouseover" === t.type || "mouseout" === t.type) {
                                            for (var a = t.relatedElement; a && a !== this;) a = a.parentNode;
                                            if (a === this) continue
                                        }
                                        var u = o[i].apply(this, e);
                                        if (!1 !== u && -1 !== u || s(t), -1 === u) return !1
                                    }
                            }).apply(t, arguments)
                        }
                    }(t));
                Object(o.each)(e.split(/\s+/), function(e, n) {
                    f[n] || (f[n] = [], !i && t.addEventListener ? t.addEventListener(n, p, u) : !i && t.attachEvent && t.attachEvent("on" + n, p)), f[n].push(l)
                })
            }
        }

        function c(t, e, n, i) {
            if (void 0 === i && (i = !1), t = Object(r.ge)(t)) {
                var a = Object(r.data)(t, "events");
                if (a)
                    if ("string" == typeof e) Object(o.each)(e.split(/\s+/), function(e, u) {
                        if (Object(o.isArray)(a[u])) {
                            var c = a[u].length;
                            if (Object(o.isFunction)(n)) {
                                for (var l = c - 1; l >= 0; l--)
                                    if (a[u][l] && (a[u][l] === n || a[u][l].handler === n)) {
                                        a[u].splice(l, 1), c--;
                                        break
                                    }
                            } else {
                                for (var s = 0; s < c; s++) delete a[u][s];
                                c = 0
                            }
                            c || (t.removeEventListener ? t.removeEventListener(u, Object(r.data)(t, "handle"), i) : t.detachEvent && t.detachEvent("on" + u, Object(r.data)(t, "handle")), delete a[u])
                        }
                    }), Object(o.isEmpty)(a) && (Object(r.removeData)(t, "events"), Object(r.removeData)(t, "handle"));
                    else
                        for (var u in a) a.hasOwnProperty(u) && c(t, u)
            }
        }

        function l(t, e, n, i) {
            t = Object(r.ge)(t);
            var a = Object(r.data)(t, "handle");
            if (a) {
                var u = function() {
                    return a.call(t, Object(o.extend)(n || {}, {
                        type: e,
                        target: t
                    }))
                };
                i ? u() : setTimeout(u, 0)
            }
        }

        function s(t) {
            if (!(t = t || window.event)) return !1;
            for (; t.originalEvent;) t = t.originalEvent;
            return t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), t.cancelBubble = !0, t.returnValue = !1, !1
        }

        function f(t) {
            if (!(t = t || window.event)) return !1;
            for (; t.originalEvent;) t = t.originalEvent;
            return t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0, !1
        }

        function d(t) {
            var e = t = t || window.event;
            if ((t = Object(o.clone)(e)).originalEvent = e, t.target || (t.target = t.srcElement || document), 3 == t.target.nodeType && (t.target = t.target.parentNode), !t.relatedTarget && t.fromElement && (t.relatedTarget = t.fromElement === t.target), null == t.pageX && null != t.clientX) {
                var n = document.documentElement,
                    r = bodyNode;
                t.pageX = t.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n.clientLeft || 0), t.pageY = t.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n.clientTop || 0)
            }
            return !t.which && (t.charCode || 0 === t.charCode ? t.charCode : t.keyCode) && (t.which = t.charCode || t.keyCode), !t.metaKey && t.ctrlKey ? t.metaKey = t.ctrlKey : !t.ctrlKey && t.metaKey && i.browser.mac && (t.ctrlKey = t.metaKey), !t.which && t.button && (t.which = 1 & t.button ? 1 : 2 & t.button ? 3 : 4 & t.button ? 2 : 0), t
        }

        function p(t) {
            var e = t || window.event;
            return e && ("click" === e.type || "mousedown" === e.type || "mouseup" === e.type) && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || i.browser.mac && e.metaKey) || !1
        }

        function h(t) {
            if (!(t = d(t)) || !t.target) return !1;
            if (!t.screenX) return !0;
            var e = Object(r.getSize)(t.target),
                n = Object(r.getXY)(t.target),
                o = t.pageX - n[0],
                i = t.pageY - n[1];
            return o < -1 || o > e[0] + 1 || i < -1 || i > e[1] + 1 || Math.abs(t.pageX - n[0] - e[0] / 2) < 1 && Math.abs(t.pageY - n[1] - e[1] / 2) < 1
        }

        function v(t, e) {
            if (!t) return !0;
            t = t.originalEvent || t, e = e || t.target;
            var n = t.fromElement || t.relatedTarget;
            if (!n || n === e || n === e.parentNode) return !0;
            for (; n !== e && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
            return n !== e
        }
    },
    532: function(t, e, n) {
        "use strict";

        function r(t) {
            var e = new Date;
            return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate()
        }

        function o(t) {
            return r(new Date(t.getTime() + 864e5))
        }

        function i(t) {
            return r(new Date(t.getTime() - 864e5))
        }

        function a(t, e) {
            var n = new Date(t),
                r = new Date(e);
            return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth() && n.getDate() === r.getDate()
        }

        function u(t) {
            return t >= 10 ? t : "0" + t
        }

        function c(t, e) {
            var n = void 0;
            t = Math.max(t, 0);
            var r = Math.floor(t % 60);
            n = r < 10 ? "0" + r : r;
            var o = (t = Math.floor(t / 60)) % 60;
            return n = o + ":" + n, ((t = Math.floor(t / 60)) > 0 || e) && (o < 10 && (n = "0" + n), n = t + ":" + n), n
        }
        n.r(e), n.d(e, "isToday", function() {
            return r
        }), n.d(e, "isYesterday", function() {
            return o
        }), n.d(e, "isTomorrow", function() {
            return i
        }), n.d(e, "isSameDate", function() {
            return a
        }), n.d(e, "leadingZero", function() {
            return u
        }), n.d(e, "formatTime", function() {
            return c
        })
    },
    63: function(t, e, n) {
        (function(r, o) {
            var i;
            (function() {
                "use strict";

                function a(t) {
                    return "function" == typeof t
                }
                var u, c, l = Array.isArray ? Array.isArray : function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    },
                    s = 0,
                    f = function(t, e) {
                        O[s] = t, O[s + 1] = e, 2 === (s += 2) && (c ? c(T) : y())
                    };
                var d = "undefined" != typeof window ? window : void 0,
                    p = d || {},
                    h = p.MutationObserver || p.WebKitMutationObserver,
                    v = void 0 !== r && "[object process]" === {}.toString.call(r),
                    g = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                function m() {
                    return function() {
                        setTimeout(T, 1)
                    }
                }
                var y, b, w, _, j, O = new Array(1e3);

                function T() {
                    for (var t = 0; t < s; t += 2) {
                        (0, O[t])(O[t + 1]), O[t] = void 0, O[t + 1] = void 0
                    }
                    s = 0
                }
                v ? y = function() {
                    r.nextTick(T)
                } : h ? (w = 0, _ = new h(T), j = document.createTextNode(""), _.observe(j, {
                    characterData: !0
                }), y = function() {
                    j.data = w = ++w % 2
                }) : g ? ((b = new MessageChannel).port1.onmessage = T, y = function() {
                    b.port2.postMessage(0)
                }) : y = void 0 === d ? function() {
                    try {
                        var t = n(32);
                        return u = t.runOnLoop || t.runOnContext,
                            function() {
                                u(T)
                            }
                    } catch (t) {
                        return m()
                    }
                }() : m();
                var C = function(t, e) {
                    var n = this._state;
                    if (n === x && !t || n === A && !e) return this;
                    var r = new this.constructor(E),
                        o = this._result;
                    if (n) {
                        var i = arguments[n - 1];
                        f(function() {
                            B(n, r, i, o)
                        })
                    } else z(this, r, t, e);
                    return r
                };
                var S = function(t) {
                    if (t && "object" == typeof t && t.constructor === this) return t;
                    var e = new this(E);
                    return H(e, t), e
                };

                function E() {}
                var k = void 0,
                    x = 1,
                    A = 2,
                    N = new F;

                function D(t) {
                    try {
                        return t.then
                    } catch (t) {
                        return N.error = t, N
                    }
                }

                function L(t, e, n) {
                    e.constructor === t.constructor && n === C && constructor.resolve === S ? function(t, e) {
                        e._state === x ? P(t, e._result) : e._state === A ? R(t, e._result) : z(e, void 0, function(e) {
                            H(t, e)
                        }, function(e) {
                            R(t, e)
                        })
                    }(t, e) : n === N ? R(t, N.error) : void 0 === n ? P(t, e) : a(n) ? function(t, e, n) {
                        f(function(t) {
                            var r = !1,
                                o = function(t, e, n, r) {
                                    try {
                                        t.call(e, n, r)
                                    } catch (t) {
                                        return t
                                    }
                                }(n, e, function(n) {
                                    r || (r = !0, e !== n ? H(t, n) : P(t, n))
                                }, function(e) {
                                    r || (r = !0, R(t, e))
                                }, t._label);
                            !r && o && (r = !0, R(t, o))
                        }, t)
                    }(t, e, n) : P(t, e)
                }

                function H(t, e) {
                    var n;
                    t === e ? R(t, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(n = e) || "object" == typeof n && null !== n ? L(t, e, D(e)) : P(t, e)
                }

                function M(t) {
                    t._onerror && t._onerror(t._result), Y(t)
                }

                function P(t, e) {
                    t._state === k && (t._result = e, t._state = x, 0 !== t._subscribers.length && f(Y, t))
                }

                function R(t, e) {
                    t._state === k && (t._state = A, t._result = e, f(M, t))
                }

                function z(t, e, n, r) {
                    var o = t._subscribers,
                        i = o.length;
                    t._onerror = null, o[i] = e, o[i + x] = n, o[i + A] = r, 0 === i && t._state && f(Y, t)
                }

                function Y(t) {
                    var e = t._subscribers,
                        n = t._state;
                    if (0 !== e.length) {
                        for (var r, o, i = t._result, a = 0; a < e.length; a += 3) r = e[a], o = e[a + n], r ? B(n, r, o, i) : o(i);
                        t._subscribers.length = 0
                    }
                }

                function F() {
                    this.error = null
                }
                var I = new F;

                function B(t, e, n, r) {
                    var o, i, u, c, l = a(n);
                    if (l) {
                        if ((o = function(t, e) {
                                try {
                                    return t(e)
                                } catch (t) {
                                    return I.error = t, I
                                }
                            }(n, r)) === I ? (c = !0, i = o.error, o = null) : u = !0, e === o) return void R(e, new TypeError("A promises callback cannot return that same promise."))
                    } else o = r, u = !0;
                    e._state !== k || (l && u ? H(e, o) : c ? R(e, i) : t === x ? P(e, o) : t === A && R(e, o))
                }
                var U = function(t) {
                    return new q(this, t).promise
                };
                var W = function(t) {
                    var e = new this(E);
                    if (!l(t)) return R(e, new TypeError("You must pass an array to race.")), e;
                    var n = t.length;

                    function r(t) {
                        H(e, t)
                    }

                    function o(t) {
                        R(e, t)
                    }
                    for (var i = 0; e._state === k && i < n; i++) z(this.resolve(t[i]), void 0, r, o);
                    return e
                };
                var K = function(t) {
                        var e = new this(E);
                        return R(e, t), e
                    },
                    X = 0;
                var $ = V;

                function V(t) {
                    this._id = X++, this._state = void 0, this._result = void 0, this._subscribers = [], E !== t && ("function" != typeof t && function() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }(), this instanceof V ? function(t, e) {
                        try {
                            e(function(e) {
                                H(t, e)
                            }, function(e) {
                                R(t, e)
                            })
                        } catch (e) {
                            R(t, e)
                        }
                    }(this, t) : function() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }())
                }
                V.all = U, V.race = W, V.resolve = S, V.reject = K, V._setScheduler = function(t) {
                    c = t
                }, V._setAsap = function(t) {
                    f = t
                }, V._asap = f, V.prototype = {
                    constructor: V,
                    then: C,
                    catch: function(t) {
                        return this.then(null, t)
                    }
                };
                var q = Z;

                function Z(t, e) {
                    this._instanceConstructor = t, this.promise = new t(E), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? P(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && P(this.promise, this._result))) : R(this.promise, this._validationError())
                }
                Z.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, Z.prototype._enumerate = function() {
                    for (var t = this.length, e = this._input, n = 0; this._state === k && n < t; n++) this._eachEntry(e[n], n)
                }, Z.prototype._eachEntry = function(t, e) {
                    var n = this._instanceConstructor,
                        r = n.resolve;
                    if (r === S) {
                        var o = D(t);
                        if (o === C && t._state !== k) this._settledAt(t._state, e, t._result);
                        else if ("function" != typeof o) this._remaining--, this._result[e] = t;
                        else if (n === $) {
                            var i = new n(E);
                            L(i, t, o), this._willSettleAt(i, e)
                        } else this._willSettleAt(new n(function(e) {
                            e(t)
                        }), e)
                    } else this._willSettleAt(r(t), e)
                }, Z.prototype._settledAt = function(t, e, n) {
                    var r = this.promise;
                    r._state === k && (this._remaining--, t === A ? R(r, n) : this._result[e] = n), 0 === this._remaining && P(r, this._result)
                }, Z.prototype._willSettleAt = function(t, e) {
                    var n = this;
                    z(t, void 0, function(t) {
                        n._settledAt(x, e, t)
                    }, function(t) {
                        n._settledAt(A, e, t)
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
                        e && "[object Promise]" === Object.prototype.toString.call(e.resolve()) && !e.cast || (t.Promise = $)
                    },
                    J = {
                        Promise: $,
                        polyfill: G
                    };
                void 0 === (i = function() {
                    return J
                }.call(e, n, e, t)) || (t.exports = i), G()
            }).call(this)
        }).call(this, n(323), n(670))
    },
    670: function(t, e) {
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
    718: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "loadImage", function() {
            return a
        });
        var r = n(63),
            o = n(268),
            i = r.Promise;

        function a(t) {
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