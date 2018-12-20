! function(e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(i, o, function(t) {
                return e[t]
            }.bind(null, o));
        return i
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 4)
}([function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "vkLocal", function() {
        return a
    }), n.d(t, "lTimeout", function() {
        return c
    }), n.d(t, "rand", function() {
        return d
    }), n.d(t, "irand", function() {
        return l
    }), n.d(t, "isUndefined", function() {
        return u
    }), n.d(t, "isFunction", function() {
        return p
    }), n.d(t, "isArray", function() {
        return m
    }), n.d(t, "isString", function() {
        return h
    }), n.d(t, "isObject", function() {
        return g
    }), n.d(t, "isEmpty", function() {
        return _
    }), n.d(t, "vkNow", function() {
        return f
    }), n.d(t, "vkImage", function() {
        return y
    }), n.d(t, "trim", function() {
        return w
    }), n.d(t, "stripHTML", function() {
        return v
    }), n.d(t, "escapeRE", function() {
        return b
    }), n.d(t, "intval", function() {
        return E
    }), n.d(t, "floatval", function() {
        return C
    }), n.d(t, "positive", function() {
        return S
    }), n.d(t, "isNumeric", function() {
        return T
    }), n.d(t, "winToUtf", function() {
        return x
    }), n.d(t, "replaceEntities", function() {
        return P
    }), n.d(t, "clean", function() {
        return D
    }), n.d(t, "unclean", function() {
        return k
    }), n.d(t, "each", function() {
        return L
    }), n.d(t, "indexOf", function() {
        return O
    }), n.d(t, "inArray", function() {
        return R
    }), n.d(t, "clone", function() {
        return B
    }), n.d(t, "arrayKeyDiff", function() {
        return M
    }), n.d(t, "extend", function() {
        return A
    }), n.d(t, "addTemplates", function() {
        return j
    }), n.d(t, "getTemplate", function() {
        return I
    }), n.d(t, "serializeForm", function() {
        return H
    }), n.d(t, "extractUrls", function() {
        return N
    }), n.d(t, "isRetina", function() {
        return F
    }), n.d(t, "getCaretCharacterOffsetWithin", function() {
        return W
    }), n.d(t, "formatCount", function() {
        return U
    }), n.d(t, "encodeHtml", function() {
        return Y
    }), n.d(t, "decodeHtml", function() {
        return z
    });
    var i = n(14),
        o = n(12),
        s = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        i = !0,
                        o = !1,
                        s = void 0;
                    try {
                        for (var r, a = e[Symbol.iterator](); !(i = (r = a.next()).done) && (n.push(r.value), !t || n.length !== t); i = !0);
                    } catch (e) {
                        o = !0, s = e
                    } finally {
                        try {
                            !i && a.return && a.return()
                        } finally {
                            if (o) throw s
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function a(e) {
        var t = PageID;
        return function() {
            t === PageID && e.apply(this, arguments)
        }
    }

    function c(e, t) {
        return setTimeout(a(e), t)
    }
    window.PageID = window.PageID || 1;
    var d = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        l = function(e, t) {
            return Math.floor(d(e, t))
        },
        u = function(e) {
            return void 0 === e
        },
        p = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        m = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        h = function(e) {
            return "string" == typeof e
        },
        g = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        };

    function _(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }
    var f = function() {
            return +new Date
        },
        y = function() {
            return window.Image ? new Image : ce("img")
        },
        w = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        v = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        b = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function E(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function C(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function S(e) {
        return (e = E(e)) < 0 ? 0 : e
    }

    function T(e) {
        return !isNaN(e)
    }

    function x(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = E(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function P() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(i.se)("<textarea>" + e + "</textarea>").value
    }

    function D(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function k(e) {
        return P(e.replace(/\t/g, "\n"))
    }

    function L(e, t) {
        if (g(e) || void 0 === e.length) {
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
        } else
            for (var i = 0, o = e.length; i < o; i++) {
                var s = e[i];
                if (!1 === t.call(s, i, s)) break
            }
        return e
    }

    function O(e, t, n) {
        for (var i = n || 0, o = (e || []).length; i < o; i++)
            if (e[i] == t) return i;
        return -1
    }

    function R(e, t) {
        return -1 !== O(t, e)
    }

    function B(e, t) {
        var n = g(e) || void 0 === e.length ? {} : [];
        for (var i in e)(!/webkit/i.test(_ua) || "layerX" != i && "layerY" != i && "webkitMovementX" != i && "webkitMovementY" != i) && (t && "object" === r(e[i]) && "prototype" !== i && null !== e[i] ? n[i] = B(e[i]) : n[i] = e[i]);
        return n
    }

    function M(e) {
        var t = {},
            n = arguments.length,
            i = arguments;
        for (var o in e)
            if (e.hasOwnProperty(o)) {
                for (var s = !1, r = 1; r < n; r++) i[r][o] && i[r][o] === e[o] && (s = !0);
                s || (t[o] = e[o])
            }
        return t
    }

    function A() {
        var e = arguments,
            t = e.length,
            n = e[0] || {},
            i = 1,
            o = !1;
        for ("boolean" == typeof n && (o = n, n = e[1] || {}, i = 2), "object" === (void 0 === n ? "undefined" : r(n)) || p(n) || (n = {}); i < t; i++) {
            var s = e[i];
            if (null != s)
                for (var a in s)
                    if (s.hasOwnProperty(a)) {
                        var c = n[a],
                            d = s[a];
                        n !== d && (o && d && "object" === (void 0 === d ? "undefined" : r(d)) && !d.nodeType ? n[a] = A(o, c || (null != d.length ? [] : {}), d) : void 0 !== d && (n[a] = d))
                    }
        }
        return n
    }

    function j(e) {
        window.templates = window.templates || {}, A(window.templates, e)
    }

    function I(e, t) {
        var n = (window.templates = window.templates || {})[e];
        return "function" == typeof n && (n = n()), n && t ? Object(i.rs)(n, t) : n || ""
    }

    function H(e) {
        if ("object" !== (void 0 === e ? "undefined" : r(e))) return !1;
        var t = {},
            n = function(t) {
                return Object(i.geByTag)(t, e)
            },
            o = function(n, o) {
                if (o.name)
                    if ("text" !== o.type && o.type)
                        if (o.getAttribute("bool")) {
                            var s = Object(i.val)(o);
                            if (!s || "0" === s) return;
                            t[o.name] = 1
                        } else t[o.name] = browser.msie && !o.value && e[o.name] ? e[o.name].value : o.value;
                else t[o.name] = Object(i.val)(o)
            };
        return L(n("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return o(0, t)
        }), L(n("select"), o), L(n("textarea"), o), t
    }

    function N(e, t) {
        for (var n = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, i = void 0, o = []; e && (i = e.match(n));) {
            e = e.substr(i.index + i[0].length);
            var s = 0;
            i[4] || (s = 7), o.push({
                url: i[2 + s],
                query: i[5 + s] || "",
                domain: i[4 + s]
            })
        }
        return o
    }
    var F = function() {
        return window.devicePixelRatio >= 2
    };

    function W(e) {
        var t = 0,
            n = 0,
            i = e.ownerDocument || e.document,
            o = i.defaultView || i.parentWindow;
        if (o.getSelection().rangeCount > 0) {
            var s = o.getSelection().getRangeAt(0),
                r = s.cloneRange();
            r.selectNodeContents(e), r.setEnd(s.startContainer, s.startOffset), t = r.toString().length, r.setEnd(s.endContainer, s.endOffset), n = r.toString().length
        }
        return [t, n]
    }

    function U(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? U(e = (e = E(e / 1e5)) > 1e3 ? E(e / 10) : e / 10, A(t, {
            noCheck: !0
        }), !0) + "M" : e >= n && !t.noCheck ? U(e = (e = E(e / 100)) > 100 ? E(e / 10) : e / 10, A(t, {
            noCheck: !0
        }), !0) + "K" : Object(o.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var q, K = s((q = null, [function(e) {
            return q || (q = Object(i.se)("<span> </span>")), q.innerText = e, q.innerHTML
        }, function(e) {
            return q || (q = Object(i.se)("<span> </span>")), q.innerHTML = e.replace(/<br\s*\/?>/gim, "\n"), q.innerText
        }]), 2),
        Y = K[0],
        z = K[1];
    window.isRetina = F, window.extractUrls = N, window.serializeForm = H, window.addTemplates = j, window.getTemplate = I, window.rand = d, window.irand = l, window.isUndefined = u, window.isFunction = p, window.isArray = m, window.isString = h, window.isObject = g, window.isEmpty = _, window.vkNow = f, window.vkImage = y, window.trim = w, window.stripHTML = v, window.escapeRE = b, window.intval = E, window.floatval = C, window.positive = S, window.isNumeric = T, window.winToUtf = x, window.replaceEntities = P, window.clean = D, window.unclean = k, window.each = L, window.indexOf = O, window.inArray = R, window.clone = B, window.arrayKeyDiff = M, window.extend = A, window.vkLocal = a, window.lTimeout = c, window.getCaretCharacterOffsetWithin = W, window.formatCount = U, window.encodeHtml = Y, window.decodeHtml = z
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "KEY", function() {
        return s
    }), n.d(t, "addEvent", function() {
        return r
    }), n.d(t, "removeEvent", function() {
        return a
    }), n.d(t, "triggerEvent", function() {
        return c
    }), n.d(t, "cancelEvent", function() {
        return d
    }), n.d(t, "stopEvent", function() {
        return l
    }), n.d(t, "normEvent", function() {
        return u
    }), n.d(t, "checkEvent", function() {
        return p
    }), n.d(t, "checkKeyboardEvent", function() {
        return m
    }), n.d(t, "checkOver", function() {
        return h
    });
    var i = n(14),
        o = n(0),
        s = {
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

    function r(e, t, n, s, r, a) {
        if ((e = Object(i.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var c, l = r ? ((c = function(e) {
                var t = e.data;
                e.data = r;
                var i = n.apply(this, [e]);
                return e.data = t, i
            }).handler = n, c) : n;
            e.setInterval && e !== window && (e = window);
            var p = Object(i.data)(e, "events") || Object(i.data)(e, "events", {}),
                m = Object(i.data)(e, "handle") || Object(i.data)(e, "handle", function(e) {
                    return function() {
                        (function(e) {
                            e = u(e);
                            var t = Array.from(arguments);
                            t[0] = e;
                            var n = Object(i.data)(this, "events");
                            if (!n || "string" != typeof e.type || !n[e.type] || !n[e.type].length) return;
                            var o = (n[e.type] || []).slice();
                            for (var s in o)
                                if (o.hasOwnProperty(s)) {
                                    if ("mouseover" === e.type || "mouseout" === e.type) {
                                        for (var r = e.relatedElement; r && r !== this;) r = r.parentNode;
                                        if (r === this) continue
                                    }
                                    var a = o[s].apply(this, t);
                                    if (!1 !== a && -1 !== a || d(e), -1 === a) return !1
                                }
                        }).apply(e, arguments)
                    }
                }(e));
            Object(o.each)(t.split(/\s+/), function(t, n) {
                p[n] || (p[n] = [], !s && e.addEventListener ? e.addEventListener(n, m, a) : !s && e.attachEvent && e.attachEvent("on" + n, m)), p[n].push(l)
            })
        }
    }

    function a(e, t, n, s) {
        if (void 0 === s && (s = !1), e = Object(i.ge)(e)) {
            var r = Object(i.data)(e, "events");
            if (r)
                if ("string" == typeof t) Object(o.each)(t.split(/\s+/), function(t, a) {
                    if (Object(o.isArray)(r[a])) {
                        var c = r[a].length;
                        if (Object(o.isFunction)(n)) {
                            for (var d = c - 1; d >= 0; d--)
                                if (r[a][d] && (r[a][d] === n || r[a][d].handler === n)) {
                                    r[a].splice(d, 1), c--;
                                    break
                                }
                        } else {
                            for (var l = 0; l < c; l++) delete r[a][l];
                            c = 0
                        }
                        c || (e.removeEventListener ? e.removeEventListener(a, Object(i.data)(e, "handle"), s) : e.detachEvent && e.detachEvent("on" + a, Object(i.data)(e, "handle")), delete r[a])
                    }
                }), Object(o.isEmpty)(r) && (Object(i.removeData)(e, "events"), Object(i.removeData)(e, "handle"));
                else
                    for (var c in r) r.hasOwnProperty(c) && a(e, c)
        }
    }

    function c(e, t, n, s) {
        e = Object(i.ge)(e);
        var r = Object(i.data)(e, "handle");
        if (r) {
            var a = function() {
                return r.call(e, Object(o.extend)(n || {}, {
                    type: t,
                    target: e
                }))
            };
            s ? a() : setTimeout(a, 0)
        }
    }

    function d(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function l(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function u(e) {
        var t = e = e || window.event;
        if ((e = Object(o.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
            var n = document.documentElement,
                i = bodyNode;
            e.pageX = e.clientX + (n && n.scrollLeft || i && i.scrollLeft || 0) - (n.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || i && i.scrollTop || 0) - (n.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function p(e) {
        var t = e || window.event;
        return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
    }

    function m(e) {
        if (!(e = u(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = Object(i.getSize)(e.target),
            n = Object(i.getXY)(e.target),
            o = e.pageX - n[0],
            s = e.pageY - n[1];
        return o < -1 || o > t[0] + 1 || s < -1 || s > t[1] + 1 || Math.abs(e.pageX - n[0] - t[0] / 2) < 1 && Math.abs(e.pageY - n[1] - t[1] / 2) < 1
    }

    function h(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var n = e.fromElement || e.relatedTarget;
        if (!n || n === t || n === t.parentNode) return !0;
        for (; n !== t && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
        return n !== t
    }
    window.KEY = s, window.addEvent = r, window.removeEvent = a, window.triggerEvent = c, window.cancelEvent = d, window.stopEvent = l, window.normEvent = u, window.checkEvent = p, window.checkKeyboardEvent = m, window.checkOver = h
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(7),
        o = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        i = !0,
                        o = !1,
                        s = void 0;
                    try {
                        for (var r, a = e[Symbol.iterator](); !(i = (r = a.next()).done) && (n.push(r.value), !t || n.length !== t); i = !0);
                    } catch (e) {
                        o = !0, s = e
                    } finally {
                        try {
                            !i && a.return && a.return()
                        } finally {
                            if (o) throw s
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    window.AdsEditEasyPromote = function() {
        function e(t, n) {
            var i = this;
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.onGeoEditorLoaded = function() {
                    var e = this.getCriteriaPreset(this.audienceDropdown.val())[0];
                    e.geo_near && this.geoEditor.setPointsFromString(e.geo_near), this.geoEditor.updateMap()
                }, t && n) {
                this.box = t, this.boxBodyNode = t.bodyNode, this.boxControlsTextNode = t.controlsTextNode, this.imageElement = geByClass1(this.classname("image"), this.boxBodyNode), this.screensContainerElement = geByClass1(this.classname("screens-container"), this.boxBodyNode), this.headerElement = geByClass1(this.classname("header"), this.boxBodyNode), this.acceptTermsCheckboxInput = geByClass1(this.classname("accept-terms"), this.boxControlsTextNode), this.imageLayer1Element = geByClass1(this.classname("image-layer_1"), this.imageElement), this.imageLayer2Element = geByClass1(this.classname("image-layer_2"), this.imageElement), this.screensWrapperElement = geByClass1(this.classname("screens-wrapper"), this.screensContainerElement), this.introScreenElement = geByClass1(this.classname("screen_intro"), this.screensWrapperElement), this.settingsScreenElement = geByClass1(this.classname("screen_settings"), this.screensWrapperElement), this.paymentScreenElement = geByClass1(this.classname("screen_payment"), this.screensWrapperElement), this.cardPaymentScreenElement = geByClass1(this.classname("screen_card-payment"), this.screensWrapperElement), this.paymentResultScreenElement = geByClass1(this.classname("screen_payment-result"), this.screensWrapperElement), this.moreSettingsScreenElement = geByClass1(this.classname("screen_more-settings"), this.screensWrapperElement), this.settingsScreenElement && (this.totalBudgetElement = geByClass1(this.classname("row-content_total-budget"), this.settingsScreenElement), this.expectedReachValueElement = geByClass1(this.classname("expected-reach-value"), this.settingsScreenElement), this.expectedReachLimitElement = geByClass1(this.classname("expected-reach-limit"), this.settingsScreenElement), this.expectedReachBarValueElement = geByClass1(this.classname("expected-reach-bar-value"), this.settingsScreenElement), this.expectedReachHintElement = geByClass1(this.classname("expected-reach-hint"), this.settingsScreenElement), this.audienceSettingsElement = geByClass1(this.classname("audience-settings"), this.settingsScreenElement), this.editAudienceLinkWrapperElement = geByClass1(this.classname("edit-audience-link"), this.settingsScreenElement), this.editAudienceNameLinksWrapperElement = geByClass1(this.classname("edit-audience-name-links"), this.settingsScreenElement), this.budgetTitleRowElement = geByClass1(this.classname("row_budget-title"), this.settingsScreenElement), this.geoContainerPointsElement = geByClass1(this.classname("geo-container_points"), this.settingsScreenElement), this.geoContainerRegionsElement = geByClass1(this.classname("geo-container_regions"), this.settingsScreenElement), this.expectedReachRowElement = geByClass1(this.classname("row_expected-reach"), this.settingsScreenElement), this.updateTargetParamsProgressElement = geByClass1(this.classname("update-progress"), this.settingsScreenElement), this.audienceMenuDotsElement = geByClass1(this.classname("audience-menu-dots"), this.settingsScreenElement), this.audienceMenuSaveElement = geByClass1(this.classname("audience-menu-item_save"), this.audienceMenuDotsElement), this.audienceMenuSaveNewElement = geByClass1(this.classname("audience-menu-item_save_new"), this.audienceMenuDotsElement), this.audienceMenuDeleteElement = geByClass1(this.classname("audience-menu-item_delete"), this.audienceMenuDotsElement), this.audienceProgressElement = geByClass1(this.classname("audience-menu-progress"), this.settingsScreenElement), this.audienceNameInput = geByClass1(this.classname("audience-name-input"), this.settingsScreenElement), this.settingsErrorElement = geByClass1(this.classname("settings-error"), this.settingsScreenElement)), this.paymentScreenElement && (this.paymentTotalBudgetElement = geByClass1(this.classname("payments-total-budget"), this.paymentScreenElement), this.paymentUnionBudgetElement = geByClass1(this.classname("payments-union-budget"), this.paymentScreenElement), this.paymentTotalBudgetInput = geByClass1(this.classname("payments-input-amount"), this.paymentScreenElement), this.paymentAmountCurrencyElement = geByClass1(this.classname("payments-amount-currency"), this.paymentScreenElement), this.paymentSystemsElement = geByClass1(this.classname("payments-systems"), this.paymentScreenElement), this.paymentContinueElement = geByClass1(this.classname("payments-continue"), this.paymentScreenElement), this.paymentErrorElement = geByClass1(this.classname("payments-error"), this.paymentScreenElement), this.paymentIntroElement = geByClass1(this.classname("payments-intro"), this.paymentScreenElement)), this.cardPaymentScreenElement && (this.cardPaymentIframeContainerElement = geByClass1(this.classname("card-payment-iframe-container"), this.cardPaymentScreenElement), this.paymentSystemsFormElement = geByClass1(this.classname("card-payment-form"), this.cardPaymentScreenElement)), this.paymentResultScreenElement && (this.paymentResultElement = geByClass1(this.classname("payment-result"), this.paymentResultScreenElement), this.paymentResultTitleElement = geByClass1(this.classname("payment-result-title"), this.paymentResultScreenElement), this.paymentResultSubtitleElement = geByClass1(this.classname("payment-result-subtitle"), this.paymentResultScreenElement), this.paymentResultIconContainerElement = geByClass1(this.classname("payment-result-icon-container"), this.paymentResultScreenElement), this.paymentResultButtonContainerElement = geByClass1(this.classname("payment-result-button-container"), this.paymentResultScreenElement), this.paymentResultButtonElement = geByClass1(this.classname("payment-result-button"), this.paymentResultScreenElement)), this.moreSettingsScreenElement && (this.moreSettingsOfficeSwitcherRowElement = geByClass1(this.classname("row_office-switcher"), this.moreSettingsScreenElement), this.moreSettingsCategoryIdRowElement = geByClass1(this.classname("row_category-id"), this.moreSettingsScreenElement), this.moreSettingsSubtitleElement = geByClass1(this.classname("more-settings-subtitle"), this.moreSettingsScreenElement), this.moreSettingsOfficeLabelElement = geByClass1(this.classname("more-settings-office-label"), this.moreSettingsScreenElement), this.moreSettingsCategoryLabelElement = geByClass1(this.classname("more-settings-category-label"), this.moreSettingsScreenElement));
                var o = this.box.getOptions();
                o && o.lang && (cur.lang = extend(cur.lang || {}, o.lang)), t.setOptions({
                    onDestroy: function() {
                        Radiobutton.destroy("ads_targeting_criterion_geo_type"), Radiobutton.destroy("ads_targeting_criterion_sex"), cur.isPaymentProcess = !1
                    }
                }), this.options = n, this.currentScreen = this.introScreenElement, this.options.already_promoted_ad_id ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_already_promoted_title"), getLang("ads_edit_easy_promote_already_promoted_description"), "success"), this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "https://vk.com/ads?act=office&union_id=" + this.options.already_promoted_ad_id), this.setBoxOptions({
                    showBackButton: !1,
                    noBottomControls: !0,
                    noRefreshCoords: !1
                }), this.currentScreen = this.paymentResultScreenElement) : this.options.union_payment ? (this.currentScreen = this.paymentScreenElement, this.box.changed = !0, this.setBoxOptions({
                    showBackButton: !1,
                    noBottomControls: !0,
                    noRefreshCoords: !1
                })) : this.options.no_intro_screen && (this.currentScreen = this.settingsScreenElement, this.box.changed = !0), removeClass(this.currentScreen, "unshown"), removeClass(this.currentScreen, this.classname("screen_hidden")), this.mouseInitialY = !1, this.lastMouseMoveEvent = +new Date, this.editingAudience = !1, this.updateTargetLastRequestID = 0, this.updateTargetCounter = 0, this.box.removeButtons(), this.continueButton = this.box.addButton(getLang("global_continue"), this.onContinueButtonClicked.bind(this), void 0, !0), setTimeout(removeClass.pbind(this.imageElement, this.classname("image_animated")), 200), setTimeout(removeClass.pbind(this.headerElement, this.classname("header_animated")), 3e3);
                for (var s = 1; s <= 3; ++s) setTimeout(removeClass.pbind(geByClass1(this.classname("intro-block_" + s), this.boxBodyNode), this.classname("intro-block_animated")), 3e3 + 600 * s);
                if (addEvent(this.paymentTotalBudgetInput, "blur change", this.updatePaymentAmount.bind(this)), addEvent(this.paymentScreenElement, "click", this.onPaymentScreenClicked.bind(this)), addEvent(this.paymentContinueElement, "click", this.onPaymentCompleted.bind(this)), this.paymentCardsTurnedOver = !1, !this.options.union_payment) {
                    this.settingsScreenInitialized = !1, this.initSettingsScreen(), this.initMoreSettingsScreen();
                    var r = langStr(getLang("ads_edit_easy_promote_accept_terms"), "link", '<a href="https://vk.com/ads?act=office_help&terms=1" target="_blank" onclick="event && event.stopPropagation()">', "/link", "</a>");
                    this.acceptTermsCheckbox = new Checkbox(this.acceptTermsCheckboxInput, {
                        checked: !0,
                        inline: !0,
                        width: "auto",
                        containerClass: this.classname("accept-terms-checkbox"),
                        label: r,
                        onChange: function() {
                            i.updateContinueButton()
                        }
                    })
                }
                cur.paymentComplete || (cur.paymentComplete = function(e, t) {
                    cur.paymentCompleteParams = t, cur.isPaymentComplete = !0
                }), cur.paymentCanceled || (cur.paymentCanceled = function(e) {
                    e ? cur.isPaymentFailed = !0 : cur.isPaymentCanceled = !0
                }), window.aep = this
            }
        }
        return e.prototype.classname = function(e) {
            return "ads_edit_easy_promote_box__" + e
        }, e.prototype.onContinueButtonClicked = function(e) {
            var t = this.currentScreen == this.settingsScreenElement,
                n = this.currentScreen == this.moreSettingsScreenElement;
            t ? this.moreSettingsRequired(t) ? (this.updateMoreSettingsScreen(t), this.goToScreen(this.moreSettingsScreenElement, !1, {
                showBackButton: !0
            })) : this.createAd(e) : n ? this.moreSettingsRequired(t) || this.createAd(e) : this.nextScreen()
        }, e.prototype.onBoxBodyMouseMoved = function(e) {
            if (!(+new Date - this.lastMouseMoveEvent < 70)) {
                this.lastMouseMoveEvent = +new Date, !1 === this.mouseInitialY && (this.mouseInitialY = e.screenY);
                var t = -(this.mouseInitialY - e.screenY) / 600 * 10;
                setStyle(this.imageLayer1Element, {
                    transform: "translateY(" + Math.round(t / 2) + "px)"
                }), setStyle(this.imageLayer2Element, {
                    transform: "translateY(" + Math.round(t / 1) + "px)"
                })
            }
        }, e.prototype.onGeoInputPointAdded = function(e, t) {
            var n = e[0].split(","),
                i = this.geoEditor.addPoint(n[0], n[1], n[2], n[3], e[1]);
            this.geoEditor.updateMap(i)
        }, e.prototype.onGeoEditorPointAdded = function(e) {
            this.geoPlacesList.addTagData([e.id, e.caption, "", 1, "", this.options.geo.radius_selector]), this.geoPlacesList.updateInput();
            var t = this.geoPlacesList.getTokenById(e.id);
            this.updateDropdownTokenRadiusText(t, e.radius), this.updateTargetParams()
        }, e.prototype.onGeoInputPointRemoved = function(e, t) {
            this.geoEditor.removePoint(e[0]), this.geoEditor.updateMap()
        }, e.prototype.onGeoEditorPointRemoved = function(e) {
            this.geoPlacesList.removeTagData(e), this.updateTargetParams()
        }, e.prototype.onGeoEditorPointUpdated = function(e, t, n) {
            var i = this.geoPlacesList.replaceTagID(e, t.id);
            n.caption && this.geoPlacesList.replaceTagText(t.id, t.caption), n.radius && this.updateDropdownTokenRadiusText(i, t.radius), (n.coords || n.radius || n.mask) && this.updateTargetParams()
        }, e.prototype.onUpdateTargetParamsDone = function(e) {
            if (!this.updateTargetLastRequestID || !e.request_id || e.request_id == this.updateTargetLastRequestID) {
                if (this.haveTargetingParamsResponse = !0, "planner_reach" in e && "total_reach" in e && (this.options.expected_reach.value = e.planner_reach, this.options.expected_reach.limit = e.total_reach, this.updateExpectedReach()), "planner_price" in e) {
                    var t = e.planner_price / 1e3;
                    t = Math.max(this.options.cost_per_click_min, t), t = Math.min(this.options.cost_per_click_max, t), this.options.save_params.cost_per_click = t.toFixed(2)
                }
                if ("suggested_criteria_data" in e && (this.setCriteriaData(e.suggested_criteria_data), this.options.suggested_criteria_data = e.suggested_criteria_data), "suggested_criteria" in e && e.suggested_criteria && (this.options.suggested_criteria = e.suggested_criteria, this.editingAudience || 0 != this.audienceDropdown.val() || this.setTargetingParams(e.suggested_criteria)), "category_suggestions" in e) {
                    this.options.category_suggestions = e.category_suggestions;
                    var n = this.options.category_suggestions[0];
                    if (n) {
                        var i = n[1] ? n[1] : n[0];
                        this.moreSettingsCategoryDropdown.selectItem(i)
                    }
                }
                "cities_data" in e && (this.options.big_cities[e.cities_data_country] = e.cities_data, this.updateGeoRegionDropdown())
            }
        }, e.prototype.onUpdateTargetParamsFailed = function(e) {
            return debugLog("Get target params failed: ", e), this.options.expected_reach.value = 0, this.options.expected_reach.limit = 0, this.updateExpectedReach(), !0
        }, e.prototype.onPaymentScreenClicked = function(e) {
            if (hasClass(e.target, this.classname("payments-systems-item")) && hasClass(e.target, this.classname("payments-systems-item_clickable")))
                if (intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, "")) < intval(this.options.payment_min_amount)) notaBene(this.paymentTotalBudgetInput, null, !0);
                else if (hide(this.paymentErrorElement), window.tooltips && tooltips.destroy(this.paymentTotalBudgetInput), hasClass(e.target, this.classname("payments-systems-item_inverse"))) {
                e.target.getAttribute("data-inverse-type");
                var t = e.target.getAttribute("data-inverse-link");
                t && window.open(t, "_blank")
            } else {
                var n = e.target.getAttribute("data-type");
                switch (cur.isPaymentProcess = !0, n) {
                    case "webmoney":
                    case "kiwipurse":
                        this.doNontransactionalPayment(n, cur.ps_list[n]);
                        break;
                    case "paypal_ipn":
                    case "mailmoney_vkpay":
                    case "card":
                        this.doTransactionalPayment(n, cur.ps_list[n]);
                        break;
                    case "yandexmoney":
                        1 === cur.ps_list[n].new_api ? this.doTransactionalPayment(n, cur.ps_list[n]) : this.doNontransactionalPayment(n, cur.ps_list[n]);
                        break;
                    case "terminals":
                        this.paymentCardsTurnOver()
                }
            }
        }, e.prototype.onPaymentCompleted = function() {
            this.options.union_payment ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_payments_success_subtitle"), "success"), this.goToScreen(this.paymentResultScreenElement, !1, {
                showBackButton: !0
            })) : this.enableAd()
        }, e.prototype.onPaymentFailed = function(e, t) {
            this.setPaymentResultScreen(t || getLang("ads_edit_easy_promote_payment_failed"), e || getLang("ads_edit_easy_promote_payment_failed_description"), "error"), this.goToScreen(this.paymentResultScreenElement, !1, {
                showBackButton: !0
            })
        }, e.prototype.onPaymentWaiting = function() {
            this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_payment"), "wait")
        }, e.prototype.onPaymentCheckDone = function(e, t, n, i, o) {
            if (e) switch (intval(n)) {
                case 0:
                    setTimeout(this.waitForPaymentResult.bind(this, t), 1e3);
                    break;
                case 1:
                    this.onPaymentCompleted();
                    break;
                case 8:
                    var s = void 0;
                    if (!t.redirectDone) {
                        this.paymentSystemsFormElement.innerHTML = "", this.paymentSystemsFormElement.action = i.action, this.paymentSystemsFormElement.method = "get", this.paymentSystemsFormElement.innerHTML = Object.keys(i.params).reduce(function(e, t) {
                            return e + '<input type="hidden" autocomplete="off" name="' + t + '" value="' + i.params[t] + '"/>'
                        }, "");
                        var r = '<form action="' + this.paymentSystemsFormElement.action + '" method="' + this.paymentSystemsFormElement.method + '" id="popup_payment_form" accept-charset="UTF-8">' + this.paymentSystemsFormElement.innerHTML + "</form>",
                            a = getLang("payment_redirect").replace("%s", t.paymentSystemData.title);
                        if (cur._popup_text = cur.paymentsPopupHtml(a, r, "document.getElementById('popup_payment_form').submit()"), t.paymentPopup) s = t.paymentPopup;
                        else {
                            s = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1")
                        }
                        cur.paymentsPopupWrite(s)
                    }
                    setTimeout(this.waitForPaymentResult.bind(this, extend(t, {
                        paymentPopup: t.paymentPopup || s,
                        redirectDone: !0
                    })), 1e3);
                    break;
                case 2:
                default:
                    this.onPaymentFailed(i, o)
            } else this.onPaymentFailed(n, o);
            return !0
        }, e.prototype.updateAudienceActions = function() {
            var e = this.audienceDropdown.val();
            toggleClass(this.audienceMenuDeleteElement, "ui_actions_menu_item_disabled", 0 == e), toggleClass(this.audienceMenuSaveElement, "ui_actions_menu_item_disabled", 0 == e)
        }, e.prototype.getCriteriaPreset = function(e) {
            var t = !1,
                n = !1;
            return 0 == e && this.options.suggested_criteria ? (t = this.options.suggested_criteria, this.options.suggested_criteria_data && (n = this.options.suggested_criteria_data)) : this.options.criteria_presets[e] && (t = this.options.criteria_presets[e].criteria_raw, this.options.criteria_presets_data[e] && (n = this.options.criteria_presets_data[e])), [t, n]
        }, e.prototype.onCriteriaPresetChanged = function(e) {
            if ("" !== e) {
                var t = this.getCriteriaPreset(e),
                    n = o(t, 2),
                    i = n[0],
                    s = n[1];
                this.updateAudienceActions(), i && (s && this.setCriteriaData(s), this.setTargetingParams(i), this.lastCriteriaPresetID = e)
            } else this.audienceDropdown.selectItem(this.lastCriteriaPresetID || 0)
        }, e.prototype.onCreateAdFailed = function(e) {
            domFC(this.settingsErrorElement).innerHTML = e.error_msg || e.error_msg_eng || getLang("global_unknown_error"), show(this.settingsErrorElement), this.goToScreen(this.settingsScreenElement, !0)
        }, e.prototype.onCreateAdDone = function(e, t) {
            if (!e || t.error_msg || t.error_msg_eng) this.onCreateAdFailed(t);
            else if (t.ad_id && (this.options.created_ad_id = t.ad_id), t.update_options && (this.options = extend(this.options, t.update_options)), this.options.payment_available && this.options.selected_union_id == this.options.payment_union_id) {
                this.paymentIntroElement.innerHTML = langStr(getLang("ads_edit_easy_promote_payments_intro"), "link", '<a href="/ads?act=office&union_id=' + this.options.created_ad_id + '">', "/link", "</a>");
                var n = this.options.user_offices[this.options.payment_union_id];
                n && "budget_result" in n && (this.paymentUnionBudgetElement.innerHTML = langNumeric(n.budget_result, getLang("global_money_amount_rub", "raw"), !0)), this.goToScreen(this.paymentScreenElement)
            } else this.onPaymentCompleted();
            return !0
        }, e.prototype.onEnableAdDone = function(e, t) {
            return t.info && "ok" === t.info ? this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_edit_easy_promote_payment_done_subtitle"), "success") : this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_failed"), getLang("ads_edit_easy_promote_enable_failed") + (t.error ? " " + t.error : ""), "error"), this.options.created_ad_id && this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "/ads?act=office&union_id=" + this.options.created_ad_id), this.goToScreen(this.paymentResultScreenElement), !0
        }, e.prototype.onAudienceMenuItemClicked = function(e) {
            var t = e.target;
            if (!hasClass(t, this.classname("audience-menu-item"))) return !1;
            var n = this.audienceDropdown.val(),
                i = n.split("_"),
                s = o(i, 2),
                r = s[0],
                a = s[1];
            a = intval(a);
            var c = t.getAttribute("data-action");
            if (hasClass(t, "ui_actions_menu_item_disabled")) return !1;
            switch (c) {
                case "save-to-current":
                    if (0 == n) return !1;
                    if (a <= 0) return !1;
                    this.editCriteriaPreset(r, a, "", 0);
                    break;
                case "save-to-new":
                    this.isEditingAudienceName = !0, hide(this.audienceDropdown.container), show(this.audienceNameInput), show(this.editAudienceNameLinksWrapperElement), this.editingAudience || hide(this.editAudienceLinkWrapperElement), hide(this.audienceMenuDotsElement), val(this.audienceNameInput, ""), elfocus(this.audienceNameInput);
                    break;
                case "delete-current":
                    if (a <= 0) return !1;
                    this.editCriteriaPreset(r, a, "", 1)
            }
            return !1
        }, e.prototype.goToScreen = function(t, n, i) {
            if (!t) return !1;
            if (i = extend({}, {
                    noBottomControls: t === this.cardPaymentScreenElement || t === this.paymentScreenElement || t === this.paymentResultScreenElement
                }, i || {}), t == this.currentScreen) return this.setBoxOptions(i), !1;
            t === this.settingsScreenElement && (this.box.changed = !0), window.removeEventListener("message", e.frameMessage, !1), addClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden"), setStyle(this.screensContainerElement, {
                height: this.screensContainerElement.clientHeight
            }), n && (addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, cur.isPaymentProcess = !1), removeClass(t, "unshown"), removeClass(t, this.classname("screen_hidden")), t.scrollTop = 0;
            var o = n ? t.offsetTop + t.clientHeight : this.currentScreen.offsetTop + this.currentScreen.clientHeight;
            return setStyle(this.screensWrapperElement, {
                transform: "translateY(-" + o + "px)"
            }), addClass(this.currentScreen, this.classname("screen_hidden")), n && (this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                transform: "translateY(0)"
            })), this.screensContainerElement.clientHeight, setStyle(this.screensContainerElement, {
                height: t.clientHeight
            }), this.setBoxOptions(i), setTimeout(function(e) {
                addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                    transform: "translateY(0)"
                }), addClass(e, "unshown"), setStyle(this.screensContainerElement, {
                    height: "auto"
                }), this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), removeClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden")
            }.bind(this, this.currentScreen), 600), this.currentScreen = t, this.currentScreen === this.settingsScreenElement && this.updateExpectedReach(), !1
        }, e.prototype.nextScreen = function(e) {
            var t = (e ? domPS : domNS)(this.currentScreen),
                n = {};
            return t == this.cardPaymentScreenElement && (e && (t = domPS(t)), n.showBackButton = !0), this.goToScreen(t, e, n)
        }, e.prototype.paymentCardsTurnOver = function(e) {
            var t = this,
                n = 0;
            geByClass(this.classname("payments-systems-item"), this.paymentScreenElement).map(function(i) {
                var o = i.getAttribute("data-type"),
                    s = i.getAttribute("data-inverse-type");
                setTimeout(function() {
                    addClass(i, t.classname("payments-systems-item_rotated")), setTimeout(function() {
                        addClass(i, t.classname("payments-systems-item_no-transition")), i.clientHeight, (e ? removeClass : addClass)(i, t.classname("payments-systems-item_inverse")), addClass(i, t.classname("payments-systems-item_rotated-inv")), removeClass(i, t.classname("payments-systems-item_rotated")), toggleClass(i, t.classname("payments-systems-item_") + o, e), toggleClass(i, t.classname("payments-systems-item_") + s, !e), toggleClass(i, t.classname("payments-systems-item_clickable"), e ? !!o : !!s), i.clientHeight, removeClass(i, t.classname("payments-systems-item_no-transition")), i.clientHeight, removeClass(i, t.classname("payments-systems-item_rotated-inv"))
                    }, 200)
                }, 50 * n), n++
            }), this.paymentCardsTurnedOver = !e, this.setBoxOptions({
                showBackButton: this.paymentCardsTurnedOver,
                noBottomControls: !0
            })
        }, e.prototype.goBack = function() {
            return this.paymentCardsTurnedOver ? this.paymentCardsTurnOver(!0) : this.nextScreen(!0), !1
        }, e.prototype.setBoxOptions = function(e) {
            if (e) {
                this.box.setOptions({
                    title: e.showBackButton ? '<a class="back ads_edit_easy_promote_box__back">' + getLang("global_box_title_back") + "</a>" : this.options.box_title,
                    hideButtons: !!e.noBottomControls,
                    noRefreshCoords: !("noRefreshCoords" in e) || e.noRefreshCoords
                });
                var t = geByClass1(this.classname("back"), this.box.titleWrap);
                t && (removeEvent(t, "click", this.goBack.bind(this)), addEvent(t, "click", this.goBack.bind(this)))
            }
        }, e.prototype.updateDropdownTokenRadiusText = function(e, t) {
            geByClass1("ads_edit_geo_place_radius_selector_text", e).innerHTML = langNumeric(t, "%s", !0) + " " + getLang("ads_edit_ad_geo_radius_unit_meters")
        }, e.prototype.getTextWidth = function(e) {
            var t = ce("span", {
                innerHTML: e
            });
            document.body.appendChild(t);
            var n = getSize(t);
            return re(t), n[0]
        }, e.prototype.getAgeSelectorData = function(e, t, n) {
            for (var i = [
                    [0, getLang("ads_age_any")]
                ], o = e; o <= t; ++o) i.push([o, langNumeric(o, n)]);
            return i
        }, e.prototype.getGeoRegionURL = function() {
            return "/select.php?act=acity&autocomplete=1&show_regions=1&country=" + this.geoCountryDropdown.val()
        }, e.prototype.updateGeoRegionDropdown = function() {
            this.geoRegionDropdown.setURL(this.getGeoRegionURL()), this.geoRegionDropdown.disable(0 == this.geoCountryDropdown.val() && !this.geoRegionDropdown.val());
            var e = this.options.big_cities[this.geoCountryDropdown.val()];
            this.geoRegionDropdown.setOptions({
                defaultItems: e || []
            }), e || this.updateTargetParams(!1, {
                need_cities_data: !0
            })
        }, e.prototype.updateGeoPlacesList = function() {
            var e = !1,
                t = "";
            this.geoEditor.inited && (e = this.geoEditor.map.getCenter(), t += "&radius=" + this.geoEditor.options.defaultRadius), e && (t += "&lat=" + e.lat + "&lon=" + e.lon);
            var n = "/adsedit?act=search_geo" + t;
            this.geoPlacesList.setURL(n)
        }, e.prototype.updateSettingsScreenFixedRow = function() {
            var e = this.settingsScreenElement.scrollHeight - this.settingsScreenElement.scrollTop - this.settingsScreenElement.clientHeight,
                t = e > 0,
                n = domPN(this.durationDropdown.container).offsetTop + this.durationDropdown.container.clientHeight,
                i = domPN(this.dailyLimitDropdown.container).offsetTop + this.dailyLimitDropdown.container.clientHeight;
            this.durationDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - n - this.expectedReachRowElement.clientHeight && this.durationDropdown.select.hide(), this.dailyLimitDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - i - this.expectedReachRowElement.clientHeight && this.dailyLimitDropdown.select.hide(), this.expectedReachRowElement.fixed !== t && (t && !this.expectedReachRowDummyElement && (this.expectedReachRowDummyElement = ce("div", {
                className: this.classname("row ads_edit_easy_promote_box__row_expected-reach")
            }, {
                height: this.expectedReachRowElement.clientHeight - 20
            }), this.settingsScreenElement.appendChild(this.expectedReachRowDummyElement)), t || (re(this.expectedReachRowDummyElement), delete this.expectedReachRowDummyElement), toggleClass(this.expectedReachRowElement, this.classname("row_fixed"), t), this.expectedReachRowElement.fixed = t)
        }, e.prototype.updatePaymentAmount = function() {
            var e = intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, ""));
            e < intval(this.options.payment_min_amount) ? (showTooltip(this.paymentTotalBudgetInput, {
                text: langNumeric(this.options.payment_min_amount, getLang("ads_minimum_payment", "raw"), !0),
                dir: "auto",
                shift: [0, 6, 0]
            }), addClass(this.paymentSystemsElement, this.classname("payments-systems_disabled"))) : removeClass(this.paymentSystemsElement, this.classname("payments-systems_disabled")), val(this.paymentTotalBudgetInput, stripHTML(langNumeric(e, "%s", !0))), this.paymentAmountCurrencyElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub_text", "raw"), !0)
        }, e.prototype.updateTotalBudget = function() {
            var e = this.durationDropdown.val() * this.dailyLimitDropdown.val();
            this.options.totalBudget = e, this.totalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), this.paymentTotalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), val(this.paymentTotalBudgetInput, e), this.updatePaymentAmount()
        }, e.prototype.updateExpectedReach = function() {
            var e = 0;
            if (this.options.expected_reach.limit ? (e = Math.min(100, Math.round(this.options.expected_reach.value / this.options.expected_reach.limit * 100)), this.expectedReachValueElement.innerHTML = langNumeric(this.options.expected_reach.value, getLang("global_X_people", "raw"), !0), this.expectedReachLimitElement.innerHTML = langNumeric(this.options.expected_reach.limit, getLang("ads_edit_easy_promote_expected_reach_possible", "raw"), !0)) : (this.expectedReachValueElement.innerHTML = "&mdash;", this.expectedReachLimitElement.innerHTML = ""), setStyle(this.expectedReachBarValueElement, {
                    width: e + "%"
                }), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_red"), e < 20), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_green"), e > 80), this.haveTargetingParamsResponse) {
                var t = this.options.expected_reach.limit <= this.options.audience_limit_min,
                    n = this.options.expected_reach.limit >= this.options.audience_limit_max;
                this.expectedReachHintElement.innerHTML = n ? getLang("ads_edit_easy_promote_audience_too_large") : t ? getLang("ads_edit_easy_promote_audience_too_small") : getLang("ads_edit_easy_promote_expected_reach_hint"), toggleClass(this.expectedReachHintElement, this.classname("expected-reach-hint_warning"), n || t), this.updateContinueButton()
            }
        }, e.prototype.updateContinueButton = function() {
            var e = this.options.expected_reach.limit <= this.options.audience_limit_min,
                t = this.options.expected_reach.limit >= this.options.audience_limit_max,
                n = this.acceptTermsCheckbox.val();
            disableButton(this.continueButton, (t || e) && this.currentScreen === this.settingsScreenElement || !n)
        }, e.prototype.updateAgeSelectors = function() {
            var e = intval(this.ageFromDropdown.val()),
                t = intval(this.ageToDropdown.val());
            this.ageFromDropdown.setData(this.getAgeSelectorData(this.options.ages.min, t || this.options.ages.max, getLang("ads_age_from"))), this.ageToDropdown.setData(this.getAgeSelectorData(e || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")))
        }, e.prototype.updateTargetParams = function(e, t) {
            var n = this;
            if (this.updateTargetParamsOptions = this.updateTargetParamsOptions || {}, t && (this.updateTargetParamsOptions = extend({}, this.updateTargetParamsOptions, t)), this.settingsScreenInitialized) {
                if (!e) {
                    return this.updateTargetParamsTimer && clearTimeout(this.updateTargetParamsTimer), void(this.updateTargetParamsTimer = setTimeout(this.updateTargetParams.bind(this, !0, this.updateTargetParamsOptions), 500))
                }
                var i = this.getUpdateTargetParams(this.updateTargetParamsOptions);
                this.updateTargetParamsOptions = {}, this.updateTargetLastRequestID = i.request_id, ajax.post("/adsedit?act=get_target_params", i, {
                    onDone: this.onUpdateTargetParamsDone.bind(this),
                    onFail: this.onUpdateTargetParamsFailed.bind(this),
                    showProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        n.updateTargetCounter || (showProgress(n.updateTargetParamsProgressElement), lockButton(n.continueButton)), n.updateTargetCounter++
                    }),
                    hideProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        n.updateTargetCounter--, n.updateTargetCounter || (hideProgress(n.updateTargetParamsProgressElement), unlockButton(n.continueButton))
                    })
                })
            }
        }, e.prototype.getUpdateTargetParams = function(e) {
            e = e || {};
            var t = "",
                n = this.getCriteriaPreset(this.audienceDropdown.val()),
                i = o(n, 1)[0];
            this.geoEditor.inited ? t = this.geoEditor.savePointsToString() : i && (t = i.geo_near);
            var s = {
                geo_type: Radiobutton.val("ads_targeting_criterion_geo_type"),
                geo_mask: this.options.geo.mask,
                country: this.geoCountryDropdown.val(),
                cities: this.geoRegionDropdown.val(),
                sex: Radiobutton.val("ads_targeting_criterion_sex"),
                age_from: this.ageFromDropdown.val(),
                age_to: this.ageToDropdown.val(),
                interest_categories: this.interestsDropdown.val(),
                groups: this.groupsDropdown.val(),
                geo_near: t,
                planner_duration: this.durationDropdown.val(),
                planner_daily_budget: this.dailyLimitDropdown.val()
            };
            if (1 == s.geo_type ? (s.country = "", s.cities = "") : 0 == s.geo_type && (s.geo_near = "", s.geo_mask = ""), 0 == s.retargeting_groups && (s.retargeting_groups = ""), s.country && e.need_cities_data && (s.need_cities_data = 1), this.options.suggested_criteria || (s.need_suggested_criteria = 1), this.options.category_selected) s.category1_id = this.options.category_selected;
            else if (this.options.category_suggestions) {
                var r = this.options.category_suggestions[0];
                r && (s.category1_id = r[1] ? r[1] : r[0])
            } else s.need_link_post = 1;
            return s.request_id = +new Date, extend({}, this.options.target_params, s)
        }, e.prototype.setCriteriaData = function(e) {
            "groups" in e && e.groups && this.groupsDropdown.setOptions({
                defaultItems: e.groups
            }), "cities" in e && e.cities && this.geoRegionDropdown.setOptions({
                defaultItems: e.cities
            })
        }, e.prototype.setTargetingParams = function(e) {
            var t = this;
            this.ageFromDropdown.selectItem(0), this.ageToDropdown.selectItem(0), e.age_from && this.ageFromDropdown.selectItem(e.age_from), e.age_to && this.ageToDropdown.selectItem(e.age_to), Radiobutton.select("ads_targeting_criterion_sex", e.sex ? e.sex : 0), this.groupsDropdown.clear(), e.groups && (e.groups.split(",").map(function(e) {
                e && t.groupsDropdown.selectItem(e)
            }), this.showGroupsDropdown()), this.geoRegionDropdown.clear(), e.cities && (e.cities.split(",").map(function(e) {
                e && t.geoRegionDropdown.selectItem(e)
            }), this.updateGeoRegionDropdown()), this.geoCountryDropdown.selectItem(e.country ? e.country : 0), this.interestsDropdown.clear(), e.interest_categories && (e.interest_categories.split(",").map(function(e) {
                e && t.interestsDropdown.selectItem(e)
            }), this.showInterestsDropdown()), e.geo_near ? (this.geoEditor && this.geoEditor.inited && this.geoEditor.setPointsFromString(e.geo_near), Radiobutton.select("ads_targeting_criterion_geo_type", 1)) : Radiobutton.select("ads_targeting_criterion_geo_type", 0), this.updateTargetParams()
        }, e.prototype.showGroupsDropdown = function() {
            return hide(this.groupShowerLink), show(this.groupsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupsDropdown.updateInput(), !1
        }, e.prototype.showInterestsDropdown = function() {
            return hide(this.interestsShowerLink), show(this.interestsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsDropdown.updateInput(), !1
        }, e.prototype.editCriteriaPreset = function(e, t, n, i) {
            var o = this;
            if (!(e = intval(e) || this.options.selected_union_id)) return !1;
            var s = this.getUpdateTargetParams();
            if (!t && !i) {
                var r = e + "_" + -s.request_id;
                this.options.audiences[r] = [r, clean(n), getLang("ads_edit_easy_promote_audience_saving")], this.audienceDropdown.setOptions({
                    defaultItems: Object.values(this.options.audiences)
                }), this.audienceDropdown.selectItem(r)
            }
            ajax.post("/adsedit?act=a_edit_criteria_preset", extend({}, s, {
                client_id: e,
                criteria_preset_id: t,
                criteria_preset_title: n,
                hash: this.options.save_audience_hash,
                do_delete: intval(i)
            }), {
                onDone: function(n) {
                    if ("criteria_preset_id" in n)
                        if (t || i) {
                            if (t && !i) {
                                var r = e + "_" + t;
                                "description" in n && (o.options.audiences[r][2] = n.description), o.audienceDropdown.setOptions({
                                    defaultItems: Object.values(o.options.audiences)
                                })
                            }
                        } else {
                            var a = e + "_" + -s.request_id,
                                c = e + "_" + n.criteria_preset_id;
                            o.options.audiences[c] = o.options.audiences[a], o.options.audiences[c][0] = c, "description" in n && (o.options.audiences[c][2] = n.description), delete o.options.audiences[a], o.audienceDropdown.setOptions({
                                defaultItems: Object.values(o.options.audiences)
                            }), o.audienceDropdown.selectItem(c)
                        }
                    if (i) {
                        var d = e + "_" + t;
                        delete o.options.audiences[d], o.audienceDropdown.setOptions({
                            defaultItems: Object.values(o.options.audiences)
                        }), o.audienceDropdown.selectItem(0)
                    }
                },
                onFail: function() {},
                showProgress: function(e) {
                    function t() {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function() {
                        return e.toString()
                    }, t
                }(function() {
                    hide(o.audienceMenuDotsElement), show(o.audienceProgressElement), showProgress(o.audienceProgressElement)
                }),
                hideProgress: function(e) {
                    function t() {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function() {
                        return e.toString()
                    }, t
                }(function() {
                    show(o.audienceMenuDotsElement), hideProgress(o.audienceProgressElement), hide(show(o.audienceProgressElement))
                })
            })
        }, e.prototype.createAd = function(e) {
            var t = this.getUpdateTargetParams(),
                n = extend({}, t, this.options.save_params, {
                    client_id: this.options.selected_union_id,
                    day_limit: this.dailyLimitDropdown.val(),
                    duration: this.durationDropdown.val(),
                    all_limit: this.options.totalBudget,
                    criteria_preset_id: this.audienceDropdown.val(),
                    planner_reach: this.options.expected_reach.value,
                    total_reach: this.options.expected_reach.limit,
                    suggested_criteria: this.isSuggestedCriteria(t) ? 1 : 0
                });
            ajax.post("/adsedit?act=save_ad", n, {
                onDone: this.onCreateAdDone.bind(this, !0),
                onFail: this.onCreateAdDone.bind(this, !1),
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        }, e.prototype.enableAd = function() {
            this.setPaymentResultScreen(getLang("ads_edit_easy_promote_enabling_ad"), "", "wait"), this.hidePaymentResultScreenButton(), this.goToScreen(this.paymentResultScreenElement);
            var e = {
                enable: 1,
                hash: this.options.enable_ad_hash,
                union_id: this.options.created_ad_id
            };
            ajax.post("/ads?act=a_union_change_status", e, {
                onDone: this.onEnableAdDone.bind(this, !0),
                onFail: this.onEnableAdDone.bind(this, !1)
            })
        }, e.prototype.waitForPaymentResult = function(e) {
            var t = e.paymentPopup,
                n = e.ajaxParams,
                i = !1,
                o = !1;
            t && t.closed && (i = !0, e.paymentPopupClosedTime || (e.paymentPopupClosedTime = +new Date), o = +new Date - e.paymentPopupClosedTime > 1e4);
            if (!i || o || e.paymentWaiting || (this.onPaymentWaiting(), e.paymentWaiting = !0), cur.isPaymentComplete) return this.onPaymentCheckDone(!0, e, cur.paymentCompleteParams), void delete cur.isPaymentComplete;
            if (cur.isPaymentCanceled || o) return this.onPaymentCheckDone(!1, e, void 0, void 0, getLang("ads_edit_easy_promote_payment_cancelled")), void delete cur.isPaymentCanceled;
            if (cur.isPaymentFailed) return this.onPaymentCheckDone(!1, e), void delete cur.isPaymentFailed;
            if (cur.isPaymentProcess) {
                var s = extend({}, n, {
                    act: "a_getvotes_check"
                });
                ajax.post("al_payments.php", s, {
                    onDone: this.onPaymentCheckDone.bind(this, !0, e),
                    onFail: this.onPaymentCheckDone.bind(this, !1, e)
                })
            }
        }, e.prototype.doTransactionalPayment = function(t, n) {
            var i = this,
                o = void 0;
            if (n && n.provider) {
                o = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1");
                var s = getLang("payment_redirect").replace("%s", cur.ps_list[t].title);
                cur._popup_text = cur.paymentsPopupHtml(s, "", ""), cur.paymentsPopupWrite(o)
            }
            var r = {
                act: "a_getvotes_charge",
                type: t,
                payment_account_id: this.options.payment_union_id,
                hash: this.options.payment_hash,
                account_hash: this.options.payment_ads_hash,
                amount: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                source: "ads_easy_promote"
            };
            ajax.post("al_payments.php", r, {
                onDone: function(s, r) {
                    if ("mailmoney_vkpay" == t) return i.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), i.goToScreen(i.paymentResultScreenElement), i.box._hide(!1, !0), showWiki({
                        w: s
                    }, !1, !1, {
                        noLocChange: 1,
                        skipBoxesHide: 1,
                        noClickHide: 1
                    }), cur.promoteBox = i.box, cur.onExternalAppDone = function(e) {
                        e.status || (cur.isPaymentCanceled = !0), cur.promoteBox._show(), cur.promoteBox = null, cur.onExternalAppDone = null, window.WkView && WkView.hide(!1, !0)
                    }, void i.waitForPaymentResult({
                        ajaxParams: {
                            source: "ads",
                            ads_union_id: i.options.payment_union_id,
                            type: t,
                            hash: n.check_hash
                        },
                        paymentSystemData: n
                    });
                    r ? (i.setPaymentIFrameHtml(r), i.nextScreen(), window.addEventListener("message", e.frameMessage, !1)) : (i.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), i.goToScreen(i.paymentResultScreenElement));
                    var a = {
                        ajaxParams: extend({}, s, {
                            type: t
                        }),
                        paymentSystemData: n
                    };
                    o && (a.paymentPopup = o), i.waitForPaymentResult(a)
                },
                onFail: function(e) {
                    return domFC(i.paymentErrorElement).innerHTML = e, show(i.paymentErrorElement), !0
                },
                showProgress: addClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled")),
                hideProgress: removeClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled"))
            })
        }, e.prototype.doNontransactionalPayment = function(e, t) {
            if (window.cur && cur.ps_list && cur.ps_list[e] && cur.submitPaymentSystemsForm) {
                var n = ce("input", {
                        value: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                        id: "amount_" + e,
                        type: "hidden"
                    }),
                    i = ce("div", {
                        className: "_ps_wrap"
                    }, {
                        display: "none"
                    });
                i.appendChild(n), this.boxBodyNode.appendChild(i), this.paymentSystemsFormElement.innerHTML = "", cur.isAdsPayment = !0, cur.paymentAccountId = this.options.payment_union_id;
                var o = cur.submitPaymentSystemsForm(e, t.request_without_fee ? 0 : t.fee, !0);
                this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement), this.waitForPaymentResult({
                    ajaxParams: {
                        source: "ads",
                        ads_union_id: this.options.payment_union_id,
                        type: e,
                        hash: t.check_hash
                    },
                    paymentPopup: o
                }), re(n), re(i)
            }
        }, e.prototype.setPaymentResultScreen = function(e, t, n) {
            var i = this;
            this.paymentResultTitleElement.innerHTML = e, this.paymentResultSubtitleElement.innerHTML = t;
            var o = geByClass1(this.classname("payment-result-icon_visible"), this.paymentResultElement),
                s = geByClass1(this.classname("payment-result-icon_hidden"), this.paymentResultElement);
            if (!hasClass(o, this.classname("payment-result-icon_") + n)) {
                ["success", "error", "wait"].map(function(e) {
                    removeClass(s, i.classname("payment-result-icon_") + e)
                }), addClass(s, this.classname("payment-result-icon_") + n), removeClass(s, this.classname("payment-result-icon_hidden")), addClass(s, this.classname("payment-result-icon_visible")), addClass(o, this.classname("payment-result-icon_hidden")), removeClass(o, this.classname("payment-result-icon_visible")), toggleClass(this.paymentResultIconContainerElement, this.classname("payment-result-icon-container_animated"), "wait" === n)
            }
            this.hidePaymentResultScreenButton()
        }, e.prototype.setPaymentResultScreenButton = function(e, t) {
            e || t ? (this.paymentResultButtonElement.innerHTML = e, this.paymentResultButtonElement.href = t, show(this.paymentResultButtonContainerElement)) : hide(this.paymentResultButtonContainerElement)
        }, e.prototype.hidePaymentResultScreenButton = function() {
            this.setPaymentResultScreenButton()
        }, e.frameMessage = function(t) {
            if (!t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?paymentgate\.ru$/) && !t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) return !1;
            var n = {};
            t.data && "{" === t.data.substr(0, 1) && "billing" !== (n = Object(i.parseJSON)(t.data)).type || ("submit" === t.data || "3dsPage" === n.action ? setTimeout(e.setCardFrameHeight.pbind(600), 200) : "3dsFinish" === n.action ? e.setCardFrameHeight() : "resizeFrame" === n.action && setTimeout(e.setCardFrameHeight.pbind(n.action_params.height), 200))
        }, e.prototype.setPaymentIFrameHtml = function(e) {
            var t = ce("iframe", {
                id: "card_iframe",
                name: "card_iframe"
            }, {
                border: 0,
                width: "100%",
                height: "404px",
                overflowX: "hidden",
                overflowY: "hidden"
            });
            t.frameBorder = 0, this.cardPaymentIframeContainerElement.innerHTML = "", this.cardPaymentIframeContainerElement.appendChild(t), t.contentWindow.document.open("text/html", "replace"), t.contentWindow.document.write(e), t.contentWindow.document.close()
        }, e.setCardFrameHeight = function(e) {
            var t = ge("card_iframe");
            e ? (e = Math.max(e, 250) + 15, cur.prevFrameHeight = t.style.height, t.style.height = e + "px") : t.style.height = cur.prevFrameHeight
        }, e.prototype.initSettingsScreen = function() {
            var e = this,
                t = void 0,
                n = void 0;
            t = geByClass1(this.classname("input-duration"), this.settingsScreenElement), n = [], this.options.days.map(function(e) {
                return n.push([e, langNumeric(e, getLang("ads_edit_easy_promote_settings_duration", "raw"), !0)])
            }), this.durationDropdown = new Dropdown(t, n, {
                width: 320,
                height: 125,
                selectedItem: this.options.duration_selected,
                big: !0,
                onChange: function() {
                    e.updateTotalBudget(), e.updateTargetParams()
                }
            }), t = geByClass1(this.classname("input-daily-limit"), this.settingsScreenElement), n = [], this.options.daily_limits.map(function(e) {
                return n.push([e, langNumeric(e, getLang("global_money_amount_rub", "raw"), !0)])
            }), this.dailyLimitDropdown = new Dropdown(t, n, {
                width: 320,
                height: 125,
                selectedItem: this.options.daily_limit_selected,
                big: !0,
                onChange: function() {
                    e.updateTotalBudget(), e.updateTargetParams()
                }
            }), t = geByClass1(this.classname("input-audience"), this.settingsScreenElement), this.audienceDropdown = new Dropdown(t, Object.values(this.options.audiences), {
                width: 320,
                big: !0,
                autocomplete: !0,
                introText: getLang("ads_edit_easy_promote_select_audience"),
                placeholder: getLang("ads_edit_easy_promote_select_audience"),
                selectedItem: this.options.audience_selected,
                onChange: this.onCriteriaPresetChanged.bind(this)
            }), t = geByClass1(this.classname("link-edit-audience"), this.settingsScreenElement), addEvent(t, "click", this.editAudience.bind(this)), t = geByClass1(this.classname("link-edit-audience-save"), this.settingsScreenElement), addEvent(t, "click", this.editAudienceName.bind(this, !0)), t = geByClass1(this.classname("link-edit-audience-cancel"), this.settingsScreenElement), addEvent(t, "click", this.editAudienceName.bind(this, !1));
            var i = {
                0: getLang("ads_geo_type_regions"),
                1: getLang("ads_geo_type_points")
            };
            geByClass(this.classname("geo-type-checkbox"), this.settingsScreenElement).map(function(t) {
                var n = t.getAttribute("value"),
                    o = i[n];
                new Radiobutton(t, {
                    width: e.getTextWidth(o) + 25,
                    label: o,
                    onSelect: function(t) {
                        toggle(e.geoContainerRegionsElement, 0 == t), toggle(e.geoContainerPointsElement, 1 == t), e.geoEditor && !e.geoEditor.inited && 1 == t && e.geoEditorInitBound(), e.updateTargetParams()
                    }
                })
            }), Radiobutton.select("ads_targeting_criterion_geo_type", this.options.geo_type_selected), t = geByClass1(this.classname("input-geo-country"), this.settingsScreenElement), this.geoCountryDropdown = new Dropdown(t, this.options.countries, {
                width: 320,
                big: !0,
                autocomplete: !0,
                selectedItem: this.options.country_selected,
                onChange: function(t) {
                    e.updateGeoRegionDropdown(), e.updateTargetParams()
                }
            }), t = geByClass1(this.classname("input-geo-region"), this.settingsScreenElement), this.geoRegionDropdown = new Autocomplete(t, this.getGeoRegionURL(), {
                width: 320,
                big: !0,
                autocomplete: !0,
                maxItems: 100,
                introText: getLang("ads_starttypingname_city_region"),
                placeholder: getLang("ads_starttypingname_city_region"),
                disabledText: getLang("ads_first_select_country"),
                onTagAdd: this.updateTargetParams.bind(this, !1),
                onTagRemove: function() {
                    e.updateGeoRegionDropdown(), e.updateTargetParams()
                }
            }), this.updateGeoRegionDropdown();
            var o = {
                0: getLang("search_adv_any_sex"),
                1: getLang("Sex_fm"),
                2: getLang("Sex_m")
            };
            geByClass(this.classname("sex-checkbox"), this.settingsScreenElement).map(function(t) {
                var n = o[t.getAttribute("value")];
                new Radiobutton(t, {
                    width: e.getTextWidth(n) + 25,
                    label: n,
                    onSelect: e.updateTargetParams.bind(e, !1)
                })
            }), Radiobutton.select("ads_targeting_criterion_sex", this.options.sex_selected), t = geByClass1(this.classname("input-age-from"), this.settingsScreenElement), this.ageFromDropdown = new Dropdown(t, this.getAgeSelectorData(this.options.ages.min, this.options.ages.to_selected || this.options.ages.max, getLang("ads_age_from")), {
                width: 155,
                big: !0,
                selectedItem: this.options.ages.from_selected,
                onChange: function() {
                    e.updateAgeSelectors(), e.updateTargetParams()
                }
            }), t = geByClass1(this.classname("input-age-to"), this.settingsScreenElement), this.ageToDropdown = new Dropdown(t, this.getAgeSelectorData(this.options.ages.from_selected || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")), {
                width: 155,
                big: !0,
                selectedItem: this.options.ages.to_selected,
                onChange: function() {
                    e.updateAgeSelectors(), e.updateTargetParams()
                }
            }), t = geByClass1(this.classname("input-interests"), this.settingsScreenElement), this.interestsDropdown = new Autocomplete(t, this.options.interests, {
                width: 320,
                big: !0,
                autocomplete: !0,
                maxItems: 100,
                introText: getLang("ads_select_interest_category"),
                placeholder: getLang("ads_select_interest_category"),
                onTagAdd: this.updateTargetParams.bind(this, !1),
                onTagRemove: this.updateTargetParams.bind(this, !1)
            }), hide(this.interestsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsShowerLink = geByClass1(this.classname("input-interests-show"), this.settingsScreenElement), show(this.interestsShowerLink), addEvent(this.interestsShowerLink, "click", this.showInterestsDropdown.bind(this)), t = geByClass1(this.classname("input-groups"), this.settingsScreenElement), this.groupsDropdown = new Autocomplete(t, "/adsedit?act=search_user_objects&section=groups&group_purpose=criteria", {
                width: 320,
                big: !0,
                withIcons: !0,
                introText: getLang("ads_type_community"),
                placeholder: getLang("ads_type_community"),
                autocomplete: !0,
                maxItems: 100,
                onTagAdd: this.updateTargetParams.bind(this, !1),
                onTagRemove: this.updateTargetParams.bind(this, !1)
            }), this.groupsDropdown.setOptions({
                defaultItems: this.options.groups_default
            }), hide(this.groupsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupShowerLink = geByClass1(this.classname("input-groups-show"), this.settingsScreenElement), show(this.groupShowerLink), addEvent(this.groupShowerLink, "click", this.showGroupsDropdown.bind(this)), this.geoEditor = new AdsGeoEditor;
            var s = {
                    defaultRadius: this.options.geo.default_radius,
                    expandMapButton: !1,
                    allowedRadiuses: this.options.geo.allowed_radiuses,
                    locale: this.options.geo.locale,
                    defaultMask: this.options.geo.mask,
                    defaultMapCenter: {
                        lat: this.options.geo.default_center[0],
                        lon: this.options.geo.default_center[1]
                    }
                },
                r = {
                    onPointAdded: this.onGeoEditorPointAdded.bind(this),
                    onPointRemoved: this.onGeoEditorPointRemoved.bind(this),
                    onPointUpdated: this.onGeoEditorPointUpdated.bind(this),
                    onLoaded: this.onGeoEditorLoaded.bind(this)
                },
                a = geByClass1(this.classname("geo-map"), this.settingsScreenElement);
            this.geoEditorInitBound = this.geoEditor.init.bind(this.geoEditor, a, s, r), t = geByClass1(this.classname("input-geo-places"), this.settingsScreenElement), this.geoPlacesList = new Autocomplete(t, "", {
                width: 320,
                big: !0,
                withIcons: !1,
                introText: getLang("ads_edit_ad_geo_map_address_placeholder"),
                placeholder: getLang("ads_edit_ad_geo_map_address_placeholder"),
                nativePlaceholder: !0,
                hidePlaceholderOnSelected: !1,
                dropdown: !1,
                listStyle: !0,
                limitedListHeight: !0,
                selectable: !1,
                autocomplete: !0,
                maxItems: 100,
                selectedItemsDelimiter: ";",
                onTagAdd: this.onGeoInputPointAdded.bind(this),
                onTagRemove: this.onGeoInputPointRemoved.bind(this)
            }), this.updateGeoPlacesList(), this.geoPlacesList.updateInput(), addEvent(this.audienceSettingsElement, "click", function(t) {
                if (hasClass(t.target, "ui_actions_menu_item")) {
                    var n = t.target.getAttribute("data-radius"),
                        i = gpeByClass("token", data(gpeByClass("ui_actions_menu_dummy_wrap", t.target), "origMenu"));
                    e.geoEditor.setPointRadius(i.getAttribute("data-id"), n), e.geoEditor.updateMap(i.getAttribute("data-id"))
                }
            }), this.updateTotalBudget(), this.updateExpectedReach(), addEvent(this.settingsScreenElement, "scroll", requestAnimationFrame.pbind(this.updateSettingsScreenFixedRow.bind(this))), this.updateSettingsScreenFixedRow(), Object.keys(this.options.user_offices).length > 0 ? (addEvent(this.audienceMenuDotsElement, "click", this.onAudienceMenuItemClicked.bind(this)), addEvent(this.audienceNameInput, "keydown", function(t) {
                if (t.which == KEY.ENTER) return e.editAudienceName(!0), !1
            })) : hide(this.audienceMenuDotsElement), this.settingsScreenInitialized = !0, this.onCriteriaPresetChanged(this.audienceDropdown.val()), this.updateTargetParams()
        }, e.prototype.initMoreSettingsScreen = function() {
            var e = this,
                t = void 0;
            if (Object.keys(this.options.user_offices).length > 1) {
                t = geByClass1(this.classname("input-union-id"), this.moreSettingsScreenElement);
                var n = [];
                Object.keys(this.options.user_offices).map(function(t) {
                    var i = e.options.user_offices[t],
                        o = [t, stripHTML(i.name), 0, 0];
                    "budget_result" in i && (o[2] = langNumeric(intval(i.budget_result), getLang("global_money_amount_rub", "raw"), !0)), i.child_offices ? (o[3] = "label", o[5] = "1", n.push(o), i.child_offices.map(function(e) {
                        n.push([e.union_id, stripHTML(e.name)])
                    })) : n.push(o)
                }), this.moreSettingsOfficeDropdown = new Dropdown(t, n, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    introText: getLang("ads_select_office"),
                    placeholder: getLang("ads_select_office"),
                    includeLabelsOnMatch: !0,
                    preventDuplicates: !0,
                    selectedItem: this.options.selected_union_id,
                    onChange: function(t) {
                        "" !== t ? e.options.selected_union_id = t : e.moreSettingsOfficeDropdown.selectItem(e.options.selected_union_id || e.options.selected_union_id)
                    }
                })
            }
            t = geByClass1(this.classname("input-category-id"), this.moreSettingsScreenElement), this.moreSettingsCategoryDropdown = new Dropdown(t, this.options.categories, {
                introText: getLang("ads_select_category"),
                placeholder: getLang("ads_select_category"),
                big: !0,
                autocomplete: !0,
                indexkeys: [1, 4],
                includeLabelsOnMatch: !0,
                preventDuplicates: !0,
                width: 320,
                onChange: function(t) {
                    e.options.category_selected = t
                }
            })
        }, e.prototype.updateMoreSettingsScreen = function(e) {
            var t = this.moreSettingsRequiredComponents(e),
                n = t.categoryRequired,
                i = t.officeRequired;
            toggle(this.moreSettingsCategoryIdRowElement, n), toggle(this.moreSettingsOfficeSwitcherRowElement, i), this.moreSettingsSubtitleElement.innerHTML = "", this.moreSettingsOfficeLabelElement.innerHTML = "", this.moreSettingsCategoryLabelElement.innerHTML = "", n && i ? (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_more_settings_subtitle"), this.moreSettingsOfficeLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_office_short"), this.moreSettingsCategoryLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_category_short")) : n ? this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_category") : i && (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_office"))
        }, e.prototype.moreSettingsRequiredComponents = function(e) {
            var t = this.getUpdateTargetParams();
            return {
                categoryRequired: !t.category1_id && !t.category2_id,
                officeRequired: Object.keys(this.options.user_offices).length > 1 && e
            }
        }, e.prototype.moreSettingsRequired = function(e) {
            var t = this.moreSettingsRequiredComponents(e),
                n = t.categoryRequired;
            return t.officeRequired || n
        }, e.prototype.editAudience = function() {
            return addClass(this.imageElement, this.classname("image_animated")), setTimeout(addClass.pbind(this.imageElement, this.classname("image_hidden")), 700), setTimeout(addClass.pbind(this.settingsScreenElement, this.classname("screen_settings-tall")), 700), hide(this.editAudienceLinkWrapperElement), show(this.audienceSettingsElement), show(this.budgetTitleRowElement), this.updateSettingsScreenFixedRow(), this.geoEditor.inited || 1 != Radiobutton.val("ads_targeting_criterion_geo_type") || this.geoEditorInitBound(), this.editingAudience = !0, !1
        }, e.prototype.editAudienceName = function(e) {
            var t = val(this.audienceNameInput).trim();
            if (e && !t) return notaBene(this.audienceNameInput), elfocus(this.audienceNameInput), !1;
            if (hide(this.audienceNameInput), show(this.audienceDropdown.container), show(this.audienceMenuDotsElement), hide(this.editAudienceNameLinksWrapperElement), this.editingAudience || show(this.editAudienceLinkWrapperElement), e) {
                var n = this.audienceDropdown.val().split("_"),
                    i = o(n, 2),
                    s = i[0];
                i[1];
                this.editCriteriaPreset(s, 0, t, 0)
            }
            return this.isEditingAudienceName = !1, !1
        }, e.prototype.isSuggestedCriteria = function(e) {
            if (!this.options.suggested_criteria) return !1;
            for (var t = ["sex", "age_from", "age_to", "cities", "country", "interest_categories", "geo_near", "groups"], n = 0; n < t.length; n++) {
                var i = t[n],
                    o = this.options.suggested_criteria[i];
                if (o || (o = !1), o != e[i]) return !1
            }
            return !0
        }, e
    }();
    try {
        stManager.done(jsc("web/ads_edit_easy.js"))
    } catch (e) {}
}, , function(e, t, n) {
    e.exports = n(2)
}, function(e, t, n) {
    "use strict";

    function i() {
        window._logTimer = (new Date).getTime()
    }

    function o(e, t) {
        window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
    }

    function s(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var n = Array.prototype.slice.call(arguments);
                n.unshift(t), browser.msie || browser.mobile ? console.log(n.join(" ")) : console.log.apply(console, n)
            }
        } catch (e) {}
    }

    function r(e) {
        if (!e) return !1;
        var t = e.tagName,
            n = e.id,
            i = e.className,
            o = (t || "").toLowerCase();
        return i && (o += "." + e.className.replace(/\s+/g, ".")), n && !/^__vk/.test(n) && (o += "#" + e.id), o || (e.toString() || "[NULL]")
    }
    n.r(t), n.d(t, "initDebugTools", function() {
        return i
    }), n.d(t, "logEvalError", function() {
        return o
    }), n.d(t, "debugLog", function() {
        return s
    }), n.d(t, "debugEl", function() {
        return r
    })
}, , function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "throttleAccumulate", function() {
        return throttleAccumulate
    }), __webpack_require__.d(__webpack_exports__, "executionStackPop", function() {
        return executionStackPop
    }), __webpack_require__.d(__webpack_exports__, "lplog", function() {
        return lplog
    }), __webpack_require__.d(__webpack_exports__, "toArray", function() {
        return toArray
    }), __webpack_require__.d(__webpack_exports__, "arrayUnique", function() {
        return arrayUnique
    }), __webpack_require__.d(__webpack_exports__, "unpackStore", function() {
        return unpackStore
    }), __webpack_require__.d(__webpack_exports__, "debounce", function() {
        return debounce
    }), __webpack_require__.d(__webpack_exports__, "throttle", function() {
        return throttle
    }), __webpack_require__.d(__webpack_exports__, "shuffle", function() {
        return shuffle
    }), __webpack_require__.d(__webpack_exports__, "parallel", function() {
        return parallel
    }), __webpack_require__.d(__webpack_exports__, "hashCode", function() {
        return hashCode
    }), __webpack_require__.d(__webpack_exports__, "parseJSON", function() {
        return parseJSON
    }), __webpack_require__.d(__webpack_exports__, "checkTextLength", function() {
        return checkTextLength
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
        _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10),
        _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);

    function throttleAccumulate(e, t) {
        var n = [],
            i = 0;
        return function(o) {
            n.push(o), i || (i = setTimeout(function() {
                i = !1, e(n), n = []
            }, t))
        }
    }

    function executionStackPop(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function lplog(e, t) {
        var n = void 0,
            i = void 0;
        if (window.__debugMode) {
            switch (t) {
                case "error":
                    n = "color: red", i = "background: red; color: white";
                    break;
                case "success":
                    n = "color: green", i = "background: green; color: white";
                    break;
                default:
                    n = "color: blue;", i = "background: #000; color: #fff;"
            }
            try {
                var o = new Date;
                console.debug("%cLP:[" + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds() + ":" + o.getMilliseconds() + "]%c " + e, i, n)
            } catch (e) {}
        }
    }

    function toArray(e) {
        var t = [];
        if (void 0 === e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function arrayUnique(e) {
        for (var t = {}, n = [], i = 0; i < e.length; i++) t[e[i]] || (n.push(e[i]), t[n[i]] = 1);
        return n
    }

    function unpackStore(e) {
        return e.get ? e.get() : e
    }

    function debounce(e, t, n) {
        var i = void 0;
        return function() {
            var o = this,
                s = arguments,
                r = n && !i;
            clearTimeout(i), i = setTimeout(function() {
                i = null, n || e.apply(o, s)
            }, t), r && e.apply(this, s)
        }
    }

    function throttle(e, t) {
        var n = void 0;
        return function() {
            n || (e.apply(this, arguments), n = setTimeout(function() {
                n = !1
            }, t))
        }
    }

    function shuffle(e) {
        for (var t = e.length; t > 0;) {
            var n = Math.floor(Math.random() * t),
                i = e[--t];
            e[t] = e[n], e[n] = i
        }
        return e
    }

    function parallel() {
        var e = [].slice.call(arguments),
            t = e.pop(),
            n = new CallHub(t, e.length);
        Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, t) {
            return t(function() {
                return n.done()
            })
        })
    }

    function hashCode(e) {
        var t = 0;
        if (0 === e.length) return t;
        for (var n = 0, i = e.length; n < i; n++) {
            t = (t << 5) - t + e.charCodeAt(n), t |= 0
        }
        return t
    }

    function parseJSON(obj) {
        if (window.JSON && JSON.parse) try {
            return JSON.parse(obj)
        } catch (e) {
            Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__.topError)("<b>parseJSON:</b> " + e.message, {
                dt: -1,
                type: 5,
                answer: obj
            });
            var evalString = "(" + obj + ")";
            try {
                return eval(evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, evalString)
            }
        } else {
            var _evalString = "(" + obj + ")";
            try {
                return eval(_evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, _evalString)
            }
        }
    }

    function checkTextLength(e, t, n, i, o, s, r) {
        var a = t.getValue ? t.getValue() : t.value,
            c = t.lastLen || 0;
        if (t.lastLen !== a.length || s) {
            t.lastLen = a.length;
            var d = {
                    "&": 5,
                    "<": 4,
                    ">": 4,
                    '"': 6,
                    "\n": i ? 1 : 4,
                    "\r": 0,
                    "!": 5,
                    "'": 5,
                    $: 6,
                    "\\": 6
                },
                l = {
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
            o && (d[","] = 5);
            var p = function(e) {
                for (var t = 0, n = 0, i = e.length; n < i; n++) {
                    var o = d[e.charAt(n)],
                        s = e.charCodeAt(n);
                    t += void 0 !== o ? o : !r && s >= 128 && (s < 1025 || u[s] || s > 1119) && !l[s] && (s < 8220 || s > 8222) && (s < 8224 || s > 8226) ? ("&#" + s + ";").length : 1
                }
                return t
            }(a);
            if (n = ge(n), p > Math.max(e - 100, .75 * e))
                if (show(n), p > e)
                    if (o) {
                        var m = val(t, function(e, t) {
                            for (var n = 0, i = "", o = 0, s = e.length; o < s; o++) {
                                var a = e.charAt(o),
                                    c = d[a],
                                    p = e.charCodeAt(o);
                                if ((n += void 0 !== c ? c : !r && p >= 128 && (p < 1025 || u[p] || p > 1119) && !l[p] && (p < 8220 || p > 8222) && (p < 8224 || p > 8226) ? ("&#" + p + ";").length : 1) > t) break;
                                i += a
                            }
                            return i
                        }(a, Math.min(e, c)));
                        t.lastLen = m.length, n.innerHTML = getLang("text_N_symbols_remain", 0)
                    } else n.innerHTML = getLang("text_exceeds_symbol_limit", p - e);
            else n.innerHTML = getLang("text_N_symbols_remain", e - p);
            else hide(n)
        }
    }
}, , function(e, t, n) {
    "use strict";

    function i(e) {
        var t = new Date;
        return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
    }

    function o(e) {
        return i(new Date(e.getTime() + 864e5))
    }

    function s(e) {
        return i(new Date(e.getTime() - 864e5))
    }

    function r(e, t) {
        var n = new Date(e),
            i = new Date(t);
        return n.getFullYear() === i.getFullYear() && n.getMonth() === i.getMonth() && n.getDate() === i.getDate()
    }

    function a(e) {
        return e >= 10 ? e : "0" + e
    }

    function c(e, t) {
        var n = void 0;
        e = Math.max(e, 0);
        var i = Math.floor(e % 60);
        n = i < 10 ? "0" + i : i;
        var o = (e = Math.floor(e / 60)) % 60;
        return n = o + ":" + n, ((e = Math.floor(e / 60)) > 0 || t) && (o < 10 && (n = "0" + n), n = e + ":" + n), n
    }
    n.r(t), n.d(t, "isToday", function() {
        return i
    }), n.d(t, "isYesterday", function() {
        return o
    }), n.d(t, "isTomorrow", function() {
        return s
    }), n.d(t, "isSameDate", function() {
        return r
    }), n.d(t, "leadingZero", function() {
        return a
    }), n.d(t, "formatTime", function() {
        return c
    })
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
        return topMsg
    }), __webpack_require__.d(__webpack_exports__, "topError", function() {
        return topError
    }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
        return showMsg
    }), __webpack_require__.d(__webpack_exports__, "showGlobalPrg", function() {
        return showGlobalPrg
    });
    var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);

    function topMsg(e, t, n) {
        if (n || (n = "#D6E5F7"), e) {
            clearTimeout(window.topMsgTimer);
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("system_msg");
            i.style.backgroundColor = n, i.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.show)(i), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
        } else Object(_dom__WEBPACK_IMPORTED_MODULE_0__.hide)("system_msg")
    }

    function topError(text, opts) {
        if (opts || (opts = {}), text.message) {
            var error = text;
            text = "<b>JavaScript error:</b> " + error.message, opts.stack = error.stack, error.stack && __debugMode && (text += "<br/>" + error.stack.replace(/\n/g, "<br/>"));
            try {
                console.log(error.stack)
            } catch (e) {}
        }
        if (!opts.stack) try {
            eval("0 = 1")
        } catch (e) {
            opts.stack = e.stack
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(opts, {
            msg: opts.msg || text,
            module: (window.cur || {}).module,
            id: vk.id,
            host: locHost,
            lang: vk.lang,
            loc: (window.nav || {}).strLoc,
            realloc: location.toString()
        })))
    }

    function showMsg(e, t, n, i) {
        var o = "msg" + ("msg" !== n ? " " + n : "");
        i && (o += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)(e);
        var s = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.geByClass1)(n, e),
            r = s || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.domFC)(e),
            a = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ce)("div", {
                className: o,
                innerHTML: '<div class="msg_text">' + t + "</div>"
            }), r);
        s && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.re)(s), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.removeClass.pbind(a, "msg_appear"), 0)
    }

    function showGlobalPrg(e, t) {
        var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getXY)(e),
            i = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getSize)(e),
            o = t || {},
            s = o.w,
            r = void 0 === s ? 32 : s,
            a = o.h,
            c = void 0 === a ? 13 : a,
            d = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
        d.className = o.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(d, {
            left: n[0] + Math.floor((i[0] - r) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(o.shift ? o.shift[0] : 0),
            top: n[1] + Math.floor((i[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(o.shift ? o.shift[1] : 0),
            width: r,
            height: c,
            display: "block",
            "z-index": o.zIndex ? o.zIndex : null
        }), o.hide && (e.style.visibility = "hidden")
    }
}, , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "parseLatin", function() {
        return s
    }), n.d(t, "parseCyr", function() {
        return r
    }), n.d(t, "parseLatKeys", function() {
        return a
    }), n.d(t, "langNumeric", function() {
        return c
    }), n.d(t, "langSex", function() {
        return d
    }), n.d(t, "langStr", function() {
        return l
    }), n.d(t, "addLangKeys", function() {
        return u
    }), n.d(t, "getLang", function() {
        return p
    }), n.d(t, "langDate", function() {
        return m
    }), n.d(t, "getShortDate", function() {
        return h
    }), n.d(t, "getShortDateOrTime", function() {
        return g
    }), n.d(t, "langWordNumeric", function() {
        return _
    }), n.d(t, "getDateText", function() {
        return f
    }), n.d(t, "getBigDateNew", function() {
        return y
    }), n.d(t, "getSmDate", function() {
        return w
    });
    var i = n(9),
        o = n(0);

    function s(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], i = e, o = 0, s = t.length; o < s; o++) i = i.split(t[o]).join(n[o]);
        for (var r = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", a = 0, c = r.length; a < c; a++) i = i.split(r.charAt(a)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(a));
        return i === e ? null : i
    }

    function r(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], i = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", o = e, s = 0; s < n.length; s++) o = o.split(n[s]).join(t[s]);
        for (var r = 0; r < i.length; r++) o = o.split(i.charAt(r)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(r));
        return o === e ? null : o
    }

    function a(e) {
        for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, i = 0; i < t.length; i++) n = n.split(t.charAt(i)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(i));
        return n == e ? null : n
    }

    function c(e, t, n) {
        if (!t || !window.langConfig) return e;
        var i = void 0;
        if (Object(o.isArray)(t) ? (i = t[1], e != Math.floor(e) ? i = t[langConfig.numRules.float] : Object(o.each)(langConfig.numRules.int, function(n, s) {
                if ("*" == s[0]) return i = t[s[2]], !1;
                var r = s[0] ? e % s[0] : e;
                return -1 != Object(o.indexOf)(s[1], r) ? (i = t[s[2]], !1) : void 0
            })) : i = t, n) {
            for (var s = e.toString().split("."), r = [], a = s[0].length - 3; a > -3; a -= 3) r.unshift(s[0].slice(a > 0 ? a : 0, a + 3));
            s[0] = r.join(langConfig.numDel), e = s.join(langConfig.numDec)
        }
        return i = (i || "%s").replace("%s", e)
    }

    function d(e, t) {
        if (!Object(o.isArray)(t)) return t;
        var n = t[1];
        return window.langConfig ? (Object(o.each)(langConfig.sexRules, function(i, o) {
            return "*" == o[0] ? (n = t[o[1]], !1) : e == o[0] && t[o[1]] ? (n = t[o[1]], !1) : void 0
        }), n) : n
    }

    function l(e) {
        for (var t = arguments, n = t.length, i = e + "", o = 1; o < n; o += 2) {
            var s = "%" === t[o][0] ? t[o] : "{" + t[o] + "}";
            i = i.replace(s, t[o + 1])
        }
        return i
    }

    function u(e, t) {
        var n = t ? window : window.cur;
        n.lang ? Object(o.extend)(n.lang, e) : n.lang = e
    }

    function p() {
        try {
            var e = Array.from(arguments),
                t = e.shift();
            if (!t) return "...";
            var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!n) {
                var i = t.split("_");
                return i.shift(), i.join(" ")
            }
            return Object(o.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(o.isArray)(n) || "raw" === e[0] ? n : c(e[0], n, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function m(e, t, n, s, r, a) {
        var c = void 0;
        if (a || (a = ""), Object(o.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, c = new Date(e)) : c = e, r) t = t[1];
        else {
            var d = "";
            !(d = Object(i.isToday)(c) ? t[3] : Object(i.isYesterday)(c) ? t[2] : Object(i.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (d = t[1]), t = d
        }
        var l = {
                hours: c.getHours(),
                minutes: c.getMinutes(),
                seconds: c.getSeconds(),
                day: c.getDate(),
                month: c.getMonth() + 1,
                year: c.getFullYear()
            },
            u = "";
        switch (3 === vk.lang && (u = c.getHours() > 11 ? "pm" : "am", l.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
            case 1:
                switch (c.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !Object(i.isToday)(c) || Object(i.isYesterday)(c) || Object(i.isTomorrow)(c) || (t = a + t);
                break;
            case 12:
            case 73:
                1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (l.year = l.year + 543), t.replace("{hour}", l.hours).replace("{num_hour}", Object(i.leadingZero)(l.hours)).replace("{minute}", Object(i.leadingZero)(l.minutes)).replace("{day}", l.day).replace("{num_day}", Object(i.leadingZero)(l.day)).replace("{month}", s[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", Object(i.leadingZero)(l.seconds)).replace("{am_pm}", u)
    }

    function h(e, t, n, i, o) {
        e *= 1e3, void 0 === n && (n = !0), void 0 === i && (i = p("months_of", "raw")), t *= 1e3;
        var s = Date.now(),
            r = new Date(s),
            a = new Date(e + t);
        return !o && e > s && e - s < 864e5 && r.getDate() === a.getDate() ? m(e, "{hour}:{minute} {am_pm}", t, [], !n) : a.getYear() !== r.getYear() || e < s - 157248e5 ? m(e, p("global_date", "raw"), t, i, !n) : m(e, p("global_short_date", "raw"), t, i, !n)
    }

    function g(e, t, n, o) {
        return Object(i.isToday)(new Date(1e3 * e + 1e3 * t)) ? m(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : h(e, t, n, o)
    }

    function _(e, t, n) {
        return Object(o.isArray)(t) && e < t.length ? t[e] : c(e, n)
    }

    function f(e, t) {
        e += t;
        var n = parseInt(Date.now() / 1e3) - e,
            i = "";
        if (n < 60) i = p("global_just_now");
        else if (n < 3600) {
            i = _(Object(o.intval)(n / 60), p("global_word_mins_ago", "raw"), p("global_mins_ago", "raw"))
        } else if (n < 14400) {
            i = _(Object(o.intval)(n / 3600), p("global_word_hours_ago", "raw"), p("global_hours_ago", "raw"))
        } else i = y(e, 0, !0, "_l");
        return i
    }

    function y(e, t, n, i) {
        void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === i && (i = ""), t *= 1e3;
        var o = new Date(1e3 * e),
            s = new Date;
        return o.getFullYear() !== s.getFullYear() && o.getTime() < s.getTime() - 1728e5 || Math.abs(o.getTime() - s.getTime()) > 157248e5 ? m(1e3 * e, p("global_date", "raw"), t, p("months_sm_of"), !n) : m(1e3 * e, p("global_short_date_time" + i, "raw"), t, p("months_sm_of"), !n)
    }

    function w(e, t, n) {
        void 0 === n && (n = !0), void 0 === t && (t = 0);
        var i = new Date,
            o = i.getFullYear(),
            s = i.getMonth(),
            r = new Date(1e3 * e),
            a = r.getFullYear(),
            c = r.getMonth();
        return m(1e3 * e, p(a < o && (s > 1 || c < 9 || o - a >= 2) ? "global_date" : "global_short_date_time", "raw"), t, p("months_sm_of", "raw"), !n)
    }
    window.parseLatin = s, window.parseCyr = r, window.parseLatKeys = a, window.langNumeric = c, window.langSex = d, window.langStr = l, window.addLangKeys = u, window.getLang = p, window.langDate = m, window.getShortDate = h, window.getShortDateOrTime = g, window.langWordNumeric = _, window.getDateText = f, window.getBigDateNew = y, window.getSmDate = w
}, , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "ge", function() {
        return s
    }), n.d(t, "geByTag", function() {
        return r
    }), n.d(t, "geByTag1", function() {
        return a
    }), n.d(t, "geByClass", function() {
        return c
    }), n.d(t, "geByClass1", function() {
        return d
    }), n.d(t, "gpeByClass", function() {
        return l
    }), n.d(t, "domQuery", function() {
        return u
    }), n.d(t, "domQuery1", function() {
        return p
    }), n.d(t, "domClosest", function() {
        return m
    }), n.d(t, "domClosestByTag", function() {
        return h
    }), n.d(t, "gpeByTag", function() {
        return g
    }), n.d(t, "ce", function() {
        return _
    }), n.d(t, "re", function() {
        return E
    }), n.d(t, "se", function() {
        return C
    }), n.d(t, "sech", function() {
        return S
    }), n.d(t, "rs", function() {
        return T
    }), n.d(t, "psr", function() {
        return x
    }), n.d(t, "domReplaceEl", function() {
        return P
    }), n.d(t, "domEL", function() {
        return D
    }), n.d(t, "domNS", function() {
        return k
    }), n.d(t, "domPS", function() {
        return L
    }), n.d(t, "domFC", function() {
        return O
    }), n.d(t, "domLC", function() {
        return R
    }), n.d(t, "domPN", function() {
        return B
    }), n.d(t, "domChildren", function() {
        return M
    }), n.d(t, "domInsertBefore", function() {
        return A
    }), n.d(t, "domInsertAfter", function() {
        return j
    }), n.d(t, "domByClass", function() {
        return I
    }), n.d(t, "domData", function() {
        return H
    }), n.d(t, "domChildIndex", function() {
        return N
    }), n.d(t, "domCA", function() {
        return F
    }), n.d(t, "domClosestSibling", function() {
        return W
    }), n.d(t, "matchesSelector", function() {
        return U
    }), n.d(t, "isHover", function() {
        return q
    }), n.d(t, "isAncestor", function() {
        return K
    }), n.d(t, "getScroll", function() {
        return Y
    }), n.d(t, "domClosestPositioned", function() {
        return z
    }), n.d(t, "domClosestOverflowHidden", function() {
        return G
    }), n.d(t, "show", function() {
        return V
    }), n.d(t, "hide", function() {
        return X
    }), n.d(t, "isVisible", function() {
        return $
    }), n.d(t, "clientHeight", function() {
        return Z
    }), n.d(t, "getClientRectOffsetY", function() {
        return J
    }), n.d(t, "toggle", function() {
        return Q
    }), n.d(t, "boundingRectEnabled", function() {
        return ee
    }), n.d(t, "getXYRect", function() {
        return te
    }), n.d(t, "getXY", function() {
        return ne
    }), n.d(t, "isWindow", function() {
        return ie
    }), n.d(t, "getSize", function() {
        return oe
    }), n.d(t, "getW", function() {
        return se
    }), n.d(t, "getH", function() {
        return re
    }), n.d(t, "hasClass", function() {
        return ae
    }), n.d(t, "addClass", function() {
        return ce
    }), n.d(t, "addClassDelayed", function() {
        return de
    }), n.d(t, "removeClass", function() {
        return le
    }), n.d(t, "removeClassDelayed", function() {
        return ue
    }), n.d(t, "toggleClass", function() {
        return pe
    }), n.d(t, "toggleClassDelayed", function() {
        return me
    }), n.d(t, "replaceClass", function() {
        return he
    }), n.d(t, "getStyle", function() {
        return ge
    }), n.d(t, "setStyle", function() {
        return _e
    }), n.d(t, "setStyleDelayed", function() {
        return fe
    }), n.d(t, "setPseudoStyle", function() {
        return ye
    }), n.d(t, "data", function() {
        return we
    }), n.d(t, "attr", function() {
        return ve
    }), n.d(t, "removeAttr", function() {
        return be
    }), n.d(t, "removeData", function() {
        return Ee
    }), n.d(t, "cleanElems", function() {
        return Ce
    }), n.d(t, "setTitle", function() {
        return Se
    }), n.d(t, "getZoom", function() {
        return Te
    }), n.d(t, "val", function() {
        return xe
    }), n.d(t, "elfocus", function() {
        return Pe
    }), n.d(t, "traverseParent", function() {
        return De
    }), n.d(t, "setDocumentTitle", function() {
        return Le
    }), n.d(t, "lockDocumentTitle", function() {
        return Oe
    }), n.d(t, "initDomScripts", function() {
        return Re
    });
    var i = n(0),
        o = n(1),
        s = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function r(e, t) {
        return (t = s(t) || document).getElementsByTagName(e)
    }

    function a(e, t) {
        return (t = s(t) || document).querySelector && t.querySelector(e) || r(e, t)[0]
    }

    function c(e, t, n) {
        return t = s(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
    }

    function d(e, t, n) {
        return t = s(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || c(e, t, n)[0]
    }

    function l(e, t, n) {
        if (!(t = s(t))) return null;
        for (; n !== t && (t = t.parentNode);)
            if (ae(t, e)) return t;
        return null
    }

    function u(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function p(e, t) {
        return (t || document).querySelector(e)
    }

    function m(e, t) {
        return ae(t, e) ? t : l(e, t)
    }

    function h(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : g(e, t)
    }

    function g(e, t) {
        if (!(t = s(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function _(e, t, n) {
        var o = document.createElement(e);
        return t && Object(i.extend)(o, t), n && _e(o, n), o
    }
    var f, y, w, v, b = (f = document, y = f.createDocumentFragment(), w = f.createElement("div"), v = f.createRange && f.createRange(), y.appendChild(w), v && v.selectNodeContents(w), v && v.createContextualFragment ? function(e) {
        return e ? v.createContextualFragment(e) : f.createDocumentFragment()
    } : function(e) {
        if (!e) return f.createDocumentFragment();
        w.innerHTML = e;
        for (var t = f.createDocumentFragment(); w.firstChild;) t.appendChild(w.firstChild);
        return t
    });

    function E(e) {
        return (e = s(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var C = function(e) {
            return O(_("div", {
                innerHTML: e
            }))
        },
        S = function(e) {
            return M(_("div", {
                innerHTML: e
            }))
        };

    function T(e, t) {
        return Object(i.each)(t, function(t, n) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function x(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function P(e, t) {
        return Object(i.isString)(t) && (t = C(t)), B(e).replaceChild(t, e), t
    }

    function D(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var k = function(e) {
            return D((e || {}).nextSibling)
        },
        L = function(e) {
            return D((e || {}).previousSibling, 1)
        },
        O = function(e) {
            return D((e || {}).firstChild)
        },
        R = function(e) {
            return D((e || {}).lastChild, 1)
        },
        B = function(e) {
            return (e || {}).parentNode
        };

    function M(e) {
        for (var t = [], n = e.childNodes, i = 0; i < n.length; i++) n[i].tagName && t.push(n[i]);
        return t
    }

    function A(e, t) {
        var n = B(t);
        return n && n.insertBefore(e, t)
    }

    function j(e, t) {
        var n = B(t);
        return n && n.insertBefore(e, k(t))
    }

    function I(e, t) {
        return e ? d(t, e) : e
    }

    function H(e, t, n) {
        return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
    }

    function N(e) {
        for (var t = 0; null != (e = L(e));) t++;
        return t
    }

    function F(e, t) {
        do {
            e = B(e)
        } while (e && !U(e, t));
        return e
    }

    function W(e, t, n) {
        for (var i = null; null === i && e;)(e = -1 === n ? L(e) : k(e)) && U(e, t) && (i = e);
        return i
    }

    function U(e, t) {
        return !(!(e = s(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
            return n > -1
        }).call(e, t)
    }

    function q(e) {
        return U(e, ":hover")
    }

    function K(e, t) {
        var n = s(e);
        if (t = s(t), !e || !t) return !1;
        for (; n = n.parentNode;)
            if (n === t) return !0;
        return !1
    }

    function Y() {
        var e = browser.msie6 ? s("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function z(e, t) {
        for (var n = (t = t || {}).fromEl || B(e), o = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
            var s = ge(n, "position");
            if (Object(i.inArray)(s, o) && (!t.noOverflow || "hidden" !== ge(n, "overflow"))) break;
            n = B(n)
        }
        return n
    }

    function G(e, t) {
        for (var n = e = s(e), i = void 0, o = void 0, r = void 0, a = !1; n && n.tagName && n !== bodyNode;) {
            if (i = ge(n, "position"), o = ge(n, "overflow"), r = ge(n, "transform"), t && browser.mozilla) {
                if ("page_wrap" != n.id && n !== e && "visible" !== o && ("static" === i ? !a || "relative" === a : "fixed" !== a)) break
            } else if (n !== e && "visible" !== o && ("static" === i ? !a || "relative" === a : "fixed" !== a)) break;
            "none" !== r ? a = void 0 : "static" !== i && "fixed" !== a && (a = i), n = B(n)
        }
        return n
    }

    function V(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; n < t; n++) V(arguments[n]);
        else if ((e = s(e)) && e.style) {
            var i = e.olddisplay,
                o = e.tagName.toLowerCase(),
                r = "block";
            e.style.display = i || "", "none" === ge(e, "display") && (r = ae(e, "inline") || ae(e, "_inline") ? "inline" : ae(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = r)
        }
    }

    function X(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; n < t; n++) X(arguments[n]);
        else if ((e = s(e)) && e.style) {
            var i = ge(e, "display");
            e.olddisplay = "none" !== i ? i : "", e.style.display = "none"
        }
    }

    function $(e) {
        return !(!(e = s(e)) || !e.style) && "none" !== ge(e, "display")
    }

    function Z() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function J(e, t, n) {
        e = s(e), n = n || 0;
        var o = ne(e)[1],
            r = oe(e)[1],
            a = window,
            c = document.documentElement,
            d = Math.max(Object(i.intval)(a.innerHeight), Object(i.intval)(c.clientHeight)),
            l = s("page_header_cont"),
            u = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            p = vk.staticheader ? Math.max(0, oe(l)[1] - u) : oe(l)[1];
        if (t) {
            if (o + r < u + p + n) return o + r - u - p - n;
            if (o > u + d - n) return o - u - d + n
        } else {
            if (o < u + p + n) return o - u - p - n;
            if (o + r > u + d - n) return o + r - u - d + n
        }
        return 0
    }

    function Q(e, t) {
        return void 0 === t && (t = !$(e)), t ? V(e) : X(e), t
    }

    function ee(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function te(e, t) {
        var n = void 0;
        if (t && "inline" === ge(e, "display")) {
            var i = e.getClientRects();
            n = i && i[0] || e.getBoundingClientRect()
        } else n = e.getBoundingClientRect();
        return n
    }

    function ne(e, t) {
        if (!(e = s(e))) return [0, 0];
        var n = e.ownerDocument,
            i = {
                top: 0,
                left: 0
            };
        if (!n) return [0, 0];
        var o = n.documentElement;
        ee(e) && (i = te(e, !0));
        var r = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
        return [i.left + (t ? 0 : r.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), i.top + (t ? 0 : r.pageYOffset || o.scrollTop) - (o.clientTop || 0)]
    }

    function ie(e) {
        return null != e && e === e.window
    }

    function oe(e, t, n) {
        e = s(e);
        var o = document.documentElement,
            r = [0, 0],
            a = void 0;
        if (t && "border-box" === ge(e, "boxSizing") && (t = !1), e === document) r = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
        else if (e) {
            var c = function() {
                r = ee(e) && (a = te(e, n)) && void 0 !== a.width ? [a.width, a.height] : [e.offsetWidth, e.offsetHeight], t && Object(i.each)(r, function(t, n) {
                    var o = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(i.each)(o, function() {
                        r[t] -= parseFloat(ge(e, "padding" + this)) || 0, r[t] -= parseFloat(ge(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if ($(e)) c();
            else {
                var d = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    l = {},
                    u = !1;
                e.style.cssText.indexOf("!important") > -1 && (u = e.style.cssText), Object(i.each)(d, function(t, n) {
                    l[t] = e.style[t], e.style[t] = n
                }), c(), Object(i.each)(d, function(t, n) {
                    e.style[t] = l[t]
                }), u && (e.style.cssText = u)
            }
        }
        return r
    }

    function se(e) {
        return oe(e)[0]
    }

    function re(e) {
        return oe(e)[1]
    }

    function ae(e, t) {
        var n = s(e);
        return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function ce(e, t) {
        var n = s(e);
        n && !ae(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var de = function(e, t) {
        return setTimeout(ce.pbind(e, t), 0)
    };

    function le(e, t) {
        var n = s(e);
        n && (n.className = Object(i.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var ue = function(e, t) {
        return setTimeout(le.pbind(e, t), 0)
    };

    function pe(e, t, n) {
        return void 0 === n && (n = !ae(e, t)), (n ? ce : le)(e, t), n
    }

    function me(e, t, n) {
        return void 0 === n && (n = !ae(e, t)), (n ? de : ue)(e, t), n
    }

    function he(e, t, n) {
        le(e, t), ce(e, n)
    }

    function ge(e, t, n) {
        if (e = s(e), Object(i.isArray)(t)) {
            var o = {};
            return Object(i.each)(t, function(t, n) {
                return o[n] = ge(e, n)
            }), o
        }
        if (!e) return "";
        if (void 0 === n && (n = !0), !n && "opacity" === t && browser.msie) {
            var r = e.style.filter;
            return r ? r.indexOf("opacity=") >= 0 ? parseFloat(r.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var a = void 0,
            c = document.defaultView || window;
        if (c.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var d = c.getComputedStyle(e, null);
            d && (a = d.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && browser.msie) {
                var l = e.currentStyle.filter;
                return l && l.indexOf("opacity=") >= 0 ? parseFloat(l.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (a = e.currentStyle[t] || e.currentStyle[u]) && (a = 0), a = (a + "").split(" "), Object(i.each)(a, function(t, n) {
                if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                    var i = e.style,
                        o = i.left,
                        s = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, i.left = n || 0, a[t] = i.pixelLeft + "px", i.left = o, e.runtimeStyle.left = s
                }
            }), a = a.join(" ")
        }
        if (n && ("width" === t || "height" === t)) {
            var p = oe(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            a = (Object(i.intval)(a) ? Math.max(Object(i.floatval)(a), p) : p) + "px"
        }
        return a
    }

    function _e(e, t, n) {
        if (e = s(e))
            if (Object(i.isObject)(t)) Object(i.each)(t, function(t, n) {
                return _e(e, t, n)
            });
            else if ("opacity" === t) browser.msie && ((n + "").length ? e.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
        else try {
            var o = "number" == typeof n;
            o && /height|width/i.test(t) && (n = Math.abs(n)), n = o && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
        } catch (e) {
            debugLog("setStyle error: ", [t, n], e)
        }
    }
    window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var n in t)
                if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
        }
        return "transform"
    }();
    var fe = function(e, t, n) {
        return setTimeout(_e.pbind(e, t, n), 0)
    };

    function ye(e, t, n) {
        var o = we(e, "pseudo-id");
        o || (we(e, "pseudo-id", o = Object(i.irand)(1e8, 999999999)), ce(e, "_pseudo_" + o));
        var r = t + "-style-" + o,
            a = s(r),
            c = "._pseudo_" + o + ":" + t + "{";
        a || (a = headNode.appendChild(_("style", {
            id: r,
            type: "text/css"
        }))), Object(i.each)(n, function(e, t) {
            c += e + ": " + t + " !important;"
        }), c += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(c, 0)) : a.styleSheet && (a.styleSheet.cssText = c)
    }

    function we(e, t, n) {
        if (!e) return !1;
        var i = e[vkExpand];
        return i || (i = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[i] || (vkCache[i] = {}, window.__debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = n), t ? vkCache[i] && vkCache[i][t] : i
    }

    function ve(e, t, n) {
        return e = s(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
    }

    function be(e) {
        for (var t = 0, n = arguments.length; t < n; ++t) {
            var i = arguments[t];
            if (void 0 !== e[i]) try {
                delete e[i]
            } catch (t) {
                try {
                    e.removeAttribute(i)
                } catch (e) {}
            }
        }
    }

    function Ee(e, t) {
        var n = !!e && e[vkExpand];
        if (n)
            if (t) {
                if (vkCache[n]) {
                    delete vkCache[n][t], t = "";
                    var i = 0;
                    for (var s in vkCache[n])
                        if ("__elem" !== s) {
                            i++;
                            break
                        }
                    i || Ee(e)
                }
            } else Object(o.removeEvent)(e), be(e, vkExpand), delete vkCache[n]
    }

    function Ce() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var n = s(e[t]);
            n && (Ee(n), be(n, "btnevents"))
        }
    }

    function Se(e, t, n) {
        if ((e = s(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) e.setAttribute("title", n || e.innerText || e.textContent);
            else {
                var i = a("b", e);
                i && (i.scrollWidth > i.clientWidth || i.scrollHeight > i.clientHeight) ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function Te() {
        var e = s("zoom_test_1") || document.body.appendChild(_("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (s("zoom_test_2") || document.body.appendChild(_("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function xe(e, t, n) {
        if (e = s(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(o.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function Pe(e, t, n) {
        e = s(e);
        try {
            if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== n && !1 !== n || (n = t), e.setSelectionRange) e.setSelectionRange(t, n);
            else if (window.getSelection && document.createRange) {
                var i = document.createRange();
                i.selectNodeContents(e), i.collapse(!1);
                var o = window.getSelection();
                o.removeAllRanges(), o.addRange(i)
            }
        } catch (e) {}
    }

    function De(e, t, n) {
        for (e = s(e), n = n || 999; e && !t(e);) {
            if (0 === --n) return !1;
            try {
                if ((e = B(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    var ke = !1;

    function Le(e) {
        if (!ke) return window.document.title = Object(i.replaceEntities)(e)
    }

    function Oe(e) {
        ke = e, e && window.cur && window.cur.destroy.push(function() {
            Oe(!1)
        })
    }

    function Re() {
        window.vkExpand = window.vkExpand || "VK" + Object(i.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
    }
    window.ge = s, window.geByTag = r, window.geByTag1 = a, window.geByClass = c, window.geByClass1 = d, window.gpeByClass = l, window.domQuery = u, window.domQuery1 = p, window.domClosest = m, window.ce = _, window.cf = b, window.re = E, window.se = C, window.sech = S, window.rs = T, window.psr = x, window.domReplaceEl = P, window.domEL = D, window.domNS = k, window.domPS = L, window.domFC = O, window.domLC = R, window.domPN = B, window.domChildren = M, window.domInsertBefore = A, window.domInsertAfter = j, window.domByClass = I, window.domData = H, window.domChildIndex = N, window.domCA = F, window.domClosestSibling = W, window.matchesSelector = U, window.isHover = q, window.isAncestor = K, window.getScroll = Y, window.domClosestPositioned = z, window.domClosestOverflowHidden = G, window.show = V, window.hide = X, window.isVisible = $, window.clientHeight = Z, window.getClientRectOffsetY = J, window.toggle = Q, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = ne, window.isWindow = ie, window.getSize = oe, window.hasClass = ae, window.addClass = ce, window.addClassDelayed = de, window.removeClass = le, window.removeClassDelayed = ue, window.toggleClass = pe, window.toggleClassDelayed = me, window.replaceClass = he, window.getStyle = ge, window.setStyle = _e, window.setStyleDelayed = fe, window.setPseudoStyle = ye, window.data = we, window.attr = ve, window.removeAttr = be, window.removeData = Ee, window.cleanElems = Ce, window.setTitle = Se, window.getZoom = Te, window.val = xe, window.elfocus = Pe, window.traverseParent = De, window.getH = re, window.getW = se, window.domClosestByTag = h, window.setDocumentTitle = Le, window.lockDocumentTitle = Oe
}]);