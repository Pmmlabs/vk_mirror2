! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
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
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 173)
}([, , , function(e, t, n) {
    "use strict";
    var r = function(e) {};
    e.exports = function(e, t, n, o, i, a, s, l) {
        if (r(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [n, o, i, a, s, l],
                    d = 0;
                (u = new Error(t.replace(/%s/g, function() {
                    return c[d++]
                }))).name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "vkLocal", function() {
        return s
    }), n.d(t, "lTimeout", function() {
        return l
    }), n.d(t, "rand", function() {
        return u
    }), n.d(t, "irand", function() {
        return c
    }), n.d(t, "isUndefined", function() {
        return d
    }), n.d(t, "isFunction", function() {
        return f
    }), n.d(t, "isArray", function() {
        return p
    }), n.d(t, "isString", function() {
        return h
    }), n.d(t, "isObject", function() {
        return y
    }), n.d(t, "isEmpty", function() {
        return v
    }), n.d(t, "vkNow", function() {
        return m
    }), n.d(t, "vkImage", function() {
        return _
    }), n.d(t, "trim", function() {
        return g
    }), n.d(t, "stripHTML", function() {
        return w
    }), n.d(t, "escapeRE", function() {
        return b
    }), n.d(t, "intval", function() {
        return k
    }), n.d(t, "floatval", function() {
        return S
    }), n.d(t, "positive", function() {
        return E
    }), n.d(t, "isNumeric", function() {
        return C
    }), n.d(t, "winToUtf", function() {
        return T
    }), n.d(t, "replaceEntities", function() {
        return x
    }), n.d(t, "clean", function() {
        return O
    }), n.d(t, "unclean", function() {
        return L
    }), n.d(t, "each", function() {
        return P
    }), n.d(t, "indexOf", function() {
        return N
    }), n.d(t, "inArray", function() {
        return j
    }), n.d(t, "clone", function() {
        return R
    }), n.d(t, "arrayKeyDiff", function() {
        return D
    }), n.d(t, "extend", function() {
        return I
    }), n.d(t, "addTemplates", function() {
        return A
    }), n.d(t, "getTemplate", function() {
        return F
    }), n.d(t, "serializeForm", function() {
        return M
    }), n.d(t, "extractUrls", function() {
        return B
    }), n.d(t, "isRetina", function() {
        return U
    }), n.d(t, "getCaretCharacterOffsetWithin", function() {
        return H
    }), n.d(t, "formatCount", function() {
        return z
    }), n.d(t, "encodeHtml", function() {
        return K
    }), n.d(t, "decodeHtml", function() {
        return Y
    });
    var r = n(84),
        o = n(183),
        i = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
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

    function l(e, t) {
        return setTimeout(s(e), t)
    }
    window.PageID = window.PageID || 1;
    var u = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        c = function(e, t) {
            return Math.floor(u(e, t))
        },
        d = function(e) {
            return void 0 === e
        },
        f = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        p = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        h = function(e) {
            return "string" == typeof e
        },
        y = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        };

    function v(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }
    var m = function() {
            return +new Date
        },
        _ = function() {
            return window.Image ? new Image : ce("img")
        },
        g = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        w = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        b = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function k(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function S(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function E(e) {
        return (e = k(e)) < 0 ? 0 : e
    }

    function C(e) {
        return !isNaN(e)
    }

    function T(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = k(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function x() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(r.se)("<textarea>" + e + "</textarea>").value
    }

    function O(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function L(e) {
        return x(e.replace(/\t/g, "\n"))
    }

    function P(e, t) {
        if (y(e) || void 0 === e.length) {
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
        } else
            for (var r = 0, o = e.length; r < o; r++) {
                var i = e[r];
                if (!1 === t.call(i, r, i)) break
            }
        return e
    }

    function N(e, t, n) {
        for (var r = n || 0, o = (e || []).length; r < o; r++)
            if (e[r] == t) return r;
        return -1
    }

    function j(e, t) {
        return -1 !== N(t, e)
    }

    function R(e, t) {
        var n = y(e) || void 0 === e.length ? {} : [];
        for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === a(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = R(e[r]) : n[r] = e[r]);
        return n
    }

    function D(e) {
        var t = {},
            n = arguments.length,
            r = arguments;
        for (var o in e)
            if (e.hasOwnProperty(o)) {
                for (var i = !1, a = 1; a < n; a++) r[a][o] && r[a][o] === e[o] && (i = !0);
                i || (t[o] = e[o])
            }
        return t
    }

    function I() {
        var e = arguments,
            t = e.length,
            n = e[0] || {},
            r = 1,
            o = !1;
        for ("boolean" == typeof n && (o = n, n = e[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : a(n)) || f(n) || (n = {}); r < t; r++) {
            var i = e[r];
            if (null != i)
                for (var s in i)
                    if (i.hasOwnProperty(s)) {
                        var l = n[s],
                            u = i[s];
                        n !== u && (o && u && "object" === (void 0 === u ? "undefined" : a(u)) && !u.nodeType ? n[s] = I(o, l || (null != u.length ? [] : {}), u) : void 0 !== u && (n[s] = u))
                    }
        }
        return n
    }

    function A(e) {
        window.templates = window.templates || {}, I(window.templates, e)
    }

    function F(e, t) {
        var n = (window.templates = window.templates || {})[e];
        return "function" == typeof n && (n = n()), n && t ? Object(r.rs)(n, t) : n || ""
    }

    function M(e) {
        if ("object" !== (void 0 === e ? "undefined" : a(e))) return !1;
        var t = {},
            n = function(t) {
                return Object(r.geByTag)(t, e)
            },
            o = function(n, o) {
                if (o.name)
                    if ("text" !== o.type && o.type)
                        if (o.getAttribute("bool")) {
                            var i = Object(r.val)(o);
                            if (!i || "0" === i) return;
                            t[o.name] = 1
                        } else t[o.name] = browser.msie && !o.value && e[o.name] ? e[o.name].value : o.value;
                else t[o.name] = Object(r.val)(o)
            };
        return P(n("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return o(0, t)
        }), P(n("select"), o), P(n("textarea"), o), t
    }

    function B(e, t) {
        for (var n = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, r = void 0, o = []; e && (r = e.match(n));) {
            e = e.substr(r.index + r[0].length);
            var i = 0;
            r[4] || (i = 7), o.push({
                url: r[2 + i],
                query: r[5 + i] || "",
                domain: r[4 + i]
            })
        }
        return o
    }
    var U = function() {
        return window.devicePixelRatio >= 2
    };

    function H(e) {
        var t = 0,
            n = 0,
            r = e.ownerDocument || e.document,
            o = r.defaultView || r.parentWindow;
        if (o.getSelection().rangeCount > 0) {
            var i = o.getSelection().getRangeAt(0),
                a = i.cloneRange();
            a.selectNodeContents(e), a.setEnd(i.startContainer, i.startOffset), t = a.toString().length, a.setEnd(i.endContainer, i.endOffset), n = a.toString().length
        }
        return [t, n]
    }

    function z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? z(e = (e = k(e / 1e5)) > 1e3 ? k(e / 10) : e / 10, I(t, {
            noCheck: !0
        }), !0) + "M" : e >= n && !t.noCheck ? z(e = (e = k(e / 100)) > 100 ? k(e / 10) : e / 10, I(t, {
            noCheck: !0
        }), !0) + "K" : Object(o.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var W, V = i((W = null, [function(e) {
            return W || (W = Object(r.se)("<span> </span>")), W.innerText = e, W.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }, function(e) {
            return W || (W = Object(r.se)("<span> </span>")), W.innerHTML = e, W.innerText
        }]), 2),
        K = V[0],
        Y = V[1];
    window.isRetina = U, window.extractUrls = B, window.serializeForm = M, window.addTemplates = A, window.getTemplate = F, window.rand = u, window.irand = c, window.isUndefined = d, window.isFunction = f, window.isArray = p, window.isString = h, window.isObject = y, window.isEmpty = v, window.vkNow = m, window.vkImage = _, window.trim = g, window.stripHTML = w, window.escapeRE = b, window.intval = k, window.floatval = S, window.positive = E, window.isNumeric = C, window.winToUtf = T, window.replaceEntities = x, window.clean = O, window.unclean = L, window.each = P, window.indexOf = N, window.inArray = j, window.clone = R, window.arrayKeyDiff = D, window.extend = I, window.vkLocal = s, window.lTimeout = l, window.getCaretCharacterOffsetWithin = H, window.formatCount = z, window.encodeHtml = K, window.decodeHtml = Y
}, , , , , , function(e, t, n) {
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
    n.r(t), n.d(t, "loadMedia", function() {
        return d
    }), n.d(t, "default", function() {
        return p
    });
    var r = n(68).Promise,
        o = {},
        i = {},
        a = [],
        s = !1,
        l = !1;

    function u(e, t, n) {
        var r = i[e];
        if (r)
            for (var o = 0; o < r.length; o++) {
                var a = r[o];
                t ? a.resolve(n) : a.reject(), r.splice(o, 1), o--
            }
    }

    function c(e, t) {
        s.postMessage({
            cmd: "load",
            url: e
        })
    }

    function d(e) {
        return s || ((s = new Worker("/js/al/stories_loader_worker.js")).onmessage = function(e) {
            var t = e.data;
            switch (t.type) {
                case "loaded":
                    o[t.url] = t.data, u(t.url, !0, t.data);
                    break;
                case "error":
                    u(t.url, !1);
                    break;
                case "inited":
                    l = !0;
                    for (var n = 0; n < a.length; n++) c(a[n])
            }
        }), new r(function(t, n) {
            if (e || t(""), o[e]) return t(o[e]);
            switch (function(e) {
                return e.match(/\.mp4/) ? "video" : e.match(/\.(png|jpg|jpeg|gif)/) ? "image" : void 0
            }(e)) {
                case "video":
                case "image":
                    i[e] || (i[e] = []);
                    var r = 0 === i[e].length;
                    if (i[e].push({
                            resolve: t,
                            reject: n
                        }), !r) return;
                    l ? c(e) : a.push(e);
                    break;
                default:
                    vk.dev && console.error("wrong media url")
            }
        })
    }
    var f = !1;

    function p(e) {
        var t;
        return f || (t = function(e) {
            try {
                return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
            } catch (e) {}
            return !1
        }(utilsNode.appendChild(ce("iframe"))), f = t && t.body ? t.body : utilsNode.appendChild(ce("div", {}, {
            display: "none"
        }))), e.match(/\.mp4/) ? function(e) {
            return new r(function(t, n) {
                var r = ce("video");
                r.oncanplay = function() {
                    t(), re(r)
                }, r.onerror = function() {
                    n(), re(r)
                }, f.appendChild(r), r.src = e
            })
        }(e) : function(e) {
            return new r(function(t, n) {
                var r = vkImage();
                r.onload = function() {
                    t(), re(r)
                }, r.onerror = function() {
                    n(), re(r)
                }, f.appendChild(r), r.src = e
            })
        }(e)
    }
}, , , , function(e, t, n) {
    "use strict";
    ! function e() {
        if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
        } catch (e) {
            console.error(e)
        }
    }(), e.exports = n(170)
}, , , , , , , , , , , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "KEY", function() {
        return i
    }), n.d(t, "addEvent", function() {
        return a
    }), n.d(t, "removeEvent", function() {
        return s
    }), n.d(t, "triggerEvent", function() {
        return l
    }), n.d(t, "cancelEvent", function() {
        return u
    }), n.d(t, "stopEvent", function() {
        return c
    }), n.d(t, "normEvent", function() {
        return d
    }), n.d(t, "checkEvent", function() {
        return f
    }), n.d(t, "checkKeyboardEvent", function() {
        return p
    }), n.d(t, "checkOver", function() {
        return h
    });
    var r = n(84),
        o = n(4),
        i = {
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

    function a(e, t, n, i, a, s) {
        if ((e = Object(r.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var l, c = a ? ((l = function(e) {
                var t = e.data;
                e.data = a;
                var r = n.apply(this, [e]);
                return e.data = t, r
            }).handler = n, l) : n;
            e.setInterval && e !== window && (e = window);
            var f = Object(r.data)(e, "events") || Object(r.data)(e, "events", {}),
                p = Object(r.data)(e, "handle") || Object(r.data)(e, "handle", function(e) {
                    return function() {
                        (function(e) {
                            e = d(e);
                            var t = Array.from(arguments);
                            t[0] = e;
                            var n = Object(r.data)(this, "events");
                            if (!n || "string" != typeof e.type || !n[e.type] || !n[e.type].length) return;
                            var o = (n[e.type] || []).slice();
                            for (var i in o)
                                if (o.hasOwnProperty(i)) {
                                    if ("mouseover" === e.type || "mouseout" === e.type) {
                                        for (var a = e.relatedElement; a && a !== this;) a = a.parentNode;
                                        if (a === this) continue
                                    }
                                    var s = o[i].apply(this, t);
                                    if (!1 !== s && -1 !== s || u(e), -1 === s) return !1
                                }
                        }).apply(e, arguments)
                    }
                }(e));
            Object(o.each)(t.split(/\s+/), function(t, n) {
                f[n] || (f[n] = [], !i && e.addEventListener ? e.addEventListener(n, p, s) : !i && e.attachEvent && e.attachEvent("on" + n, p)), f[n].push(c)
            })
        }
    }

    function s(e, t, n, i) {
        if (void 0 === i && (i = !1), e = Object(r.ge)(e)) {
            var a = Object(r.data)(e, "events");
            if (a)
                if ("string" == typeof t) Object(o.each)(t.split(/\s+/), function(t, s) {
                    if (Object(o.isArray)(a[s])) {
                        var l = a[s].length;
                        if (Object(o.isFunction)(n)) {
                            for (var u = l - 1; u >= 0; u--)
                                if (a[s][u] && (a[s][u] === n || a[s][u].handler === n)) {
                                    a[s].splice(u, 1), l--;
                                    break
                                }
                        } else {
                            for (var c = 0; c < l; c++) delete a[s][c];
                            l = 0
                        }
                        l || (e.removeEventListener ? e.removeEventListener(s, Object(r.data)(e, "handle"), i) : e.detachEvent && e.detachEvent("on" + s, Object(r.data)(e, "handle")), delete a[s])
                    }
                }), Object(o.isEmpty)(a) && (Object(r.removeData)(e, "events"), Object(r.removeData)(e, "handle"));
                else
                    for (var l in a) a.hasOwnProperty(l) && s(e, l)
        }
    }

    function l(e, t, n, i) {
        e = Object(r.ge)(e);
        var a = Object(r.data)(e, "handle");
        if (a) {
            var s = function() {
                return a.call(e, Object(o.extend)(n || {}, {
                    type: t,
                    target: e
                }))
            };
            i ? s() : setTimeout(s, 0)
        }
    }

    function u(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function c(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function d(e) {
        var t = e = e || window.event;
        if ((e = Object(o.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
            var n = document.documentElement,
                r = bodyNode;
            e.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function f(e) {
        var t = e || window.event;
        return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
    }

    function p(e) {
        if (!(e = d(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = Object(r.getSize)(e.target),
            n = Object(r.getXY)(e.target),
            o = e.pageX - n[0],
            i = e.pageY - n[1];
        return o < -1 || o > t[0] + 1 || i < -1 || i > t[1] + 1 || Math.abs(e.pageX - n[0] - t[0] / 2) < 1 && Math.abs(e.pageY - n[1] - t[1] / 2) < 1
    }

    function h(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var n = e.fromElement || e.relatedTarget;
        if (!n || n === t || n === t.parentNode) return !0;
        for (; n !== t && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
        return n !== t
    }
    window.KEY = i, window.addEvent = a, window.removeEvent = s, window.triggerEvent = l, window.cancelEvent = u, window.stopEvent = c, window.normEvent = d, window.checkEvent = f, window.checkKeyboardEvent = p, window.checkOver = h
}, , function(e, t, n) {
    "use strict";
    e.exports = n(128)
}, , , , , , , , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "default", function() {
        return o
    });
    var r = n(30);
    n(65);

    function o(e) {
        var t = e.story,
            n = t.getReplies(),
            o = n.count,
            a = n.count_str,
            s = n.users;
        if (t.getCurStoryData().can_manage || !o) return null;
        var l = void 0;
        return r.createElement("div", {
            ref: function(e) {
                l = e
            },
            className: "stories_answers",
            onClick: function() {
                var e = t.getReplies();
                e.users.length && (t.layer._sendNavigationStatEvents("open_replies"), t.pauseStory(), showStory(e.users[0].id + "/replies" + t.getRawId(), {
                    fromEl: l,
                    source: "parent_story"
                }))
            }
        }, r.createElement(i, {
            users: s
        }), r.createElement("div", {
            className: "stories_answers_count",
            dangerouslySetInnerHTML: {
                __html: a
            }
        }), r.createElement("div", {
            className: "stories_answers_tt_arrow",
            onClick: function(e) {
                t.showFeedbackTooltip(), e.stopPropagation()
            }
        }))
    }

    function i(e) {
        var t = e.users;
        return t.map(function(e, n) {
            var o = e.id,
                i = e.photo;
            return r.createElement("div", {
                key: o,
                className: "stories_answer_user",
                style: {
                    backgroundImage: "url(" + i + ")",
                    zIndex: t.length - n
                }
            })
        })
    }
}, , , , , function(e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(93),
        o = n(159),
        i = n(10),
        a = n(137),
        s = n(126),
        l = n(139),
        u = n(122),
        c = n(110),
        d = n(185),
        f = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    var p = function() {
        function e(t, n, r, o, i) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.queue = [], this.storiesToRead = [];
            try {
                window.Videoview && Videoview.togglePlay(!1)
            } catch (e) {}
            this.initDOM(), this.show(), this._init(t, n, r, o), addClass(this.layerEl, "shown"), this._source = i.source, this._initViewerSource(), this._sendOpeningEvents(), i.isOpenNarrativeFromFeed && (this.isOpenNarrativeFromFeed = i.isOpenNarrativeFromFeed)
        }
        return e.prototype._sendOpeningEvents = function() {
            if (this._source) {
                var e = void 0;
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
                e && this._sendNavigationStatEvents(e)
            }
        }, e.prototype._init = function(e, t, n, r) {
            var o = e.split("_"),
                i = f(o, 1)[0];
            return this.storyOwner = intval(i), this.storyRaw = e, this.parseExtra(r), this.list = t, this.storiesList = n, this.initStories()
        }, e.prototype._destroyStories = function() {
            for (var e in this.renderedStories) {
                if (this.renderedStories.hasOwnProperty(e)) this.renderedStories[e].story.destroy()
            }
        }, e.prototype.destroy = function() {
            this._source && this._source.indexOf("narrative") > -1 && this._sendNavigationStatEvents("narrative_close"), delete this.activeStory, clearTimeout(this.timer), clearTimeout(this.animationTimer), this._destroyStories(), removeEvent(this.volumeControl), delete this.volumeControl, delete this.renderedStories, removeEvent(this.layerEl), this._onVideoEnd();
            try {
                this.layerEl && bodyNode.removeChild(this.layerEl)
            } catch (e) {}
            delete cur.storyLayer
        }, e.prototype.getList = function() {
            return "story" + this.activeStory.getRawId() + "/" + this.list
        }, e.prototype.getStoryRaw = function() {
            return !!this.activeStory && this.activeStory.getRawId()
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
            addClass(this.layerEl, "stories_layer_hiding"), !this.hideAllLayers && o.layerHide(), !0 !== e && this.activeStory ? this.animateStory("minimize").then(this.doHide.bind(this)) : this.doHide(e), removeClass(this.layerEl, "shown"), this.activeStory && this.activeStory.pauseStory()
        }, e.prototype.doHide = function(e) {
            this._readStories(), this.destroy(), !e && o.removeLayer(), "group_stories" === this.list && Stories.groupStoriesBlockUpdate()
        }, e.prototype.back = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.hideAllLayers = !1;
            var t = cancelStack[cancelStack.length - 1];
            t && "stories_form_focus" === t.name && cancelStackPop(), this.hide(!1, e)
        }, e.prototype._renderStories = function() {
            for (var e = this, t = [], n = 0; n < this.storiesList.length; n++) this.storiesList[n] && t.push(this.storiesList[n]);
            var o = this._getScreenStoriesCount(),
                i = this._getCurStoryPos(t.map(function(e) {
                    return e.author.id
                })),
                a = Math.floor(o / 2),
                s = t.slice(Math.max(0, i - a)).slice(0, o),
                l = s.map(function(e) {
                    return e.author.id
                });
            for (var u in this.renderedStories)
                if (this.renderedStories.hasOwnProperty(u)) {
                    var c = this.renderedStories[u]; - 1 === l.indexOf(parseInt(u)) && (c.story.destroy(), delete this.renderedStories[u])
                }
            var d = void 0;
            if (s.map(function(t, n) {
                    var o = t.author.id;
                    if (!e.renderedStories[o]) {
                        var i = e.storiesOwners.indexOf(o),
                            s = new r.default(t, {
                                id: n,
                                layer: e,
                                onSelect: e._onSelectStory.bind(e),
                                onStoriesEnd: e._onStoriesEnd.bind(e, i),
                                onStoryRemoved: function(t, n) {
                                    return e._onStoryRemoved(i, t, n)
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
                        n <= a && e.stories.children[n] ? e.stories.insertBefore(s.render(), e.stories.children[n]) : e.stories.appendChild(s.render()), e.renderedStories[o] = {
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
            return 2 * Math.floor(window.innerWidth / (window.innerHeight * i.STORY_HORIZONTAL_RATIO)) + 1
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
                        s.is_narrative && s.items.push(s.items[s.items.length - 1]), s.items[s.items.length - 1].unread && i.push(s)
                    }
                    i.length && (e.storiesList = i, e.storiesOwners = e.storiesList.map(function(e) {
                        return e.author.id
                    }))
                }
                e.renderedStories = {};
                var l = e._renderStories().activeStory;
                e.scrollToStory(l, !0), 1 === e.storiesList.length && addClass(e.stories, "one_story"), e._startFirstStory(l, e.extra.story_id), addClass(e.stories, "inited"), t()
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
                n.w = "story" + e.getRawId(), t.match(/^-?(\d+)_(\d+)$/) || (n.w += "/" + t), t.match(/^narrative-?\d+_\d+/) && (n.w = t), nav.setLoc(nav.toStr(n))
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
        }, e.prototype._onStoriesEnd = function(e, t) {
            for (var n = -1, r = e + 1; r < this.storiesList.length; r++) {
                if (this.storiesList[r]) {
                    n = r;
                    break
                }
            }
            n > -1 ? (t && this._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this._onSelectStory(this._getStoryInstanceByIndex(n))) : (t && this._sendNavigationStatEvents("close_auto_by_time"), cancelStackPop())
        }, e.prototype._playPrevOwner = function(e) {
            for (var t = -1, n = e - 1; n >= 0; n--) {
                if (this.storiesList[n]) {
                    t = n;
                    break
                }
            }
            t > -1 ? this._onSelectStory(this._getStoryInstanceByIndex(t)) : cancelStackPop()
        }, e.prototype._markReadStoriesInRange = function(e, t, n) {
            for (var r = e.data.items, o = t; o < n; o++) {
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
                    o = r[e.index] || {};
                (o.answers || {}).new_count = 0, o.unread = !1;
                var i = !0,
                    a = 0;
                r.forEach(function(e) {
                    var t = e.answers || {};
                    a += t.new_count || 0, e.unread && (i = !1)
                }), a > 0 ? val(n, a) : (val(n, ""), i && removeClass(t, "story_feed_new_item"))
            }
        }, e.prototype._onPlayStory = function(e) {
            var t = this._getStoryInstanceByIndex(e);
            t && (this.storiesReadHash = t.getReadHash(), this.storiesToRead.push(t.getRawId()), this._markReadPrevStories(t), this.storiesToRead > 10 && this._readStories(), this._updateBadge(t));
            var n = this._getStoryInstanceByIndex(e + 1);
            n && n.preloadNextStory(n.getIndex())
        }, e.prototype._getStoryInstanceByIndex = function(e) {
            var t = this.storiesList[e];
            return !!t && this.renderedStories[t.author.id].story
        }, e.prototype._onStoryRemoved = function(e, t, n) {
            this.storiesList[e] = !1, !t && this._onStoriesEnd(e), Stories.updateFeedStories(null, {
                cb: n
            })
        }, e.prototype.onVisibilityChange = function() {
            "visible" === document.visibilityState ? cur.storyLayer && cur.storyLayer.playStory() : cur.storyLayer && cur.storyLayer.pauseStory()
        }, e.prototype.onResize = function() {
            var e = cur.storyLayer.activeStory;
            e && cur.storyLayer.scrollToStory(e, !0)
        }, e.prototype.pauseStory = function(e) {
            this.activeStory && this.activeStory.pauseStory(e)
        }, e.prototype.playStory = function() {
            this.activeStory && this.activeStory.autoResumeStory()
        }, e.prototype._onLayerClick = function(e) {
            var t = hasClass(e.target, "stories_layer_close");
            (hasClass(e.target, "stories_layer_cont") || t) && (t && (this.isCloseBtnClick = !0), cancelStackPop())
        }, e.prototype._checkKeyEvents = function(e) {
            return !(attr(e.target, "contenteditable") || inArray(e.target.tagName, ["INPUT", "TEXTAREA"]) || curBox())
        }, e.prototype.onKeyDown = function(e) {
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
                            cancelEvent(e), cur.storyLayer.pauseStory(!0)
                    }
                    cur.storiesKeyDownTs = vkNow()
                }
            }
        }, e.prototype.onKeyUp = function(e) {
            cur.storiesKeyDown = !1, cur.storyLayer && cur.storyLayer.inited && cur.storyLayer._checkKeyEvents(e) && e.keyCode === KEY.SPACE && (cancelEvent(e), vkNow() - cur.storiesKeyDownTs > 200 ? cur.storyLayer.playStory() : cur.storyLayer.nextStory())
        }, e.prototype.nextStory = function() {
            this.activeStory && this.activeStory.nextStory()
        }, e.prototype.prevStory = function() {
            this.activeStory && this.activeStory.prevStory()
        }, e.prototype.changeStory = function(e) {
            this.activeStory && this.activeStory.changeStory(e)
        }, e.prototype._readStories = function() {
            if (this.storiesToRead.length || Object(d.hasStatToSerialize)()) {
                var e = this._getSource(),
                    t = this.storiesToRead.join(",");
                this.storiesToRead = [], ajax.post("al_stories.php", {
                    act: "read_stories",
                    stories: t,
                    source: e,
                    navigation_stats: Object(d.serializeNavigationStats)(),
                    loading_stats: Object(d.serializeLoadingStats)(),
                    connection_type: Object(d.getConnectionType)(),
                    hash: this.storiesReadHash
                })
            }
        }, e.prototype._getSource = function() {
            if (this._source) return this._source;
            var e = this.list;
            return -1 !== [s.MODULE, l.MODULE, c.STORIES_MANAGE_MODULE, u.MODULE].indexOf(cur.module) && (e = cur.module), 0 === e.indexOf("replies") && (e = "reply"), e
        }, e.prototype._sendNavigationStatEvents = function(e) {
            var t = this.getStoryRaw() || this.activeStory.getCurStoryData().raw_id;
            if (t) {
                this._updateLastStoryOpenAction(e);
                var n = this._getSource();
                Object(d.saveNavigationStatEvent)({
                    storyRawId: t,
                    source: n,
                    action: e
                })
            }
        }, e.prototype._updateLastStoryOpenAction = function(e) {
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
        }, e.prototype._initViewerSource = function() {
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
        }, e.prototype._sendViewerStartTime = function(e, t) {
            var n = this.viewerSource;
            Object(d.saveViewerStartTime)({
                storyRawId: e,
                source: n,
                time: t
            })
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
            for (var r in n)
                if (n.hasOwnProperty(r)) {
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
                var a = "expand" === e ? t : n.getAnimateFromElem();
                if (n.hideAllLayers && "minimize" === e) {
                    var s = o.getFirstLayer();
                    a = s.getAnimateFromElem(), o.slicePrevLayers(), o.layerHide()
                }
                removeClass(a, "stories_feed_item_ava_animate");
                var l = getXY(a),
                    u = f(l, 2),
                    c = u[0],
                    d = u[1],
                    p = getSize(a),
                    h = window.innerHeight,
                    y = Math.min(i.STORY_MAX_WIDTH, Math.max(i.STORY_MAX_HEIGHT, h * i.STORY_HORIZONTAL_RATIO)),
                    v = y * i.STORY_VERTICAL_RATIO,
                    m = Math.max(0, (h - v) / 2),
                    _ = Math.max(0, (window.innerWidth - y) / 2);
                c = _ - c + y / 2 - p[0] / 2 + scrollGetX(), d = m - d + v / 2 - p[1] / 2 + scrollGetY(), c = -c, d = -d;
                var g = {};
                "expand" === e && (g.transform = "translate(" + c + "px, " + d + "px) scale(0)", n.animateFromEl = t), setStyle(n.activeStory.wrapEl, g), "minimize" === e && setStyle(a, "transform", "scale(0)"), n.animationTimer = setTimeout(function() {
                    addClass(n.stories, "animated"), addClass(a, "stories_feed_item_ava_animate"), n.animationTimer = setTimeout(function() {
                        "expand" === e ? (setStyle("stories_layers_background", "opacity", 1), setStyle(n.activeStory.wrapEl, "transform", "translate(0, 0) scale(1)")) : (setStyle(n.activeStory.wrapEl, "transform", "translate(" + c + "px, " + d + "px) scale(0.01)"), setStyle(a, "transform", "scale(1)")), n.animationTimer = setTimeout(function() {
                            r(), "expand" === e ? (setStyle(n.activeStory.wrapEl, "transform", ""), removeClass(n.layerEl, "animation"), removeClass(n.stories, "animated"), n.playStory(), o.layerShown()) : (removeClass(a, "stories_feed_item_ava_animate"), setStyle(a, "transform", ""))
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
                i = f(o, 1)[0],
                s = getSize(n),
                l = f(s, 1)[0],
                u = function(e) {
                    var n = Math.max(0, Math.min(e.pageX - i, l)) / l * 100;
                    setStyle(r, "width", n + "%"), a.setVolume(n / 100), t.activeStory.volumeUpdate()
                };
            addEvent(window, "mousemove", u), addEvent(window, "mouseup", function e() {
                removeEvent(window, "mousemove", u), removeEvent(window, "mouseup", e), t._updateVolumeButton(), removeClass(t.volumeControlContainer, "changing")
            }), u(e)
        }, e.prototype._updateVolumeButton = function() {
            var e = 100 * a.getVolume();
            toggleClass(this.volumeControl, "low", e > 0 && e < 50), toggleClass(this.volumeControl, "high", e >= 50);
            var t = geByClass1("stories_volume_control_slide_indicator", this.volumeControl);
            setStyle(t, "width", e + "%")
        }, e.prototype._volumeControlOnClick = function(e) {
            if (!hasClass(e.target, "stories_volume_control_slide_wrap") && !hasClass(this.volumeControlContainer, "changing")) {
                var t = a.getVolume();
                t = t ? 0 : 1, a.setVolume(t), this._updateVolumeButton(), this.activeStory.volumeUpdate()
            }
        }, e.prototype.onReplyDeleted = function(e) {
            this.activeStory && this.activeStory.onReplyDeleted(e)
        }, e
    }();
    t.default = p
}, , , , , , , function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "default", function() {
        return o
    });
    var r = n(30);
    n(65);

    function o(e) {
        var t = e.story,
            n = t.getReplies(),
            o = t.getViews() || "",
            i = t.getCurStoryData(),
            a = i.can_manage,
            s = i.narrative,
            l = n.count || "",
            u = s && !s.is_cover;
        if (!a || u || !o && !l) return null;
        return r.createElement("div", {
            className: "stories_button views _views_button",
            onClick: function(e) {
                t.showFeedbackTooltip(), e.stopPropagation()
            }
        }, o && r.createElement("div", {
            className: "stories_button_views"
        }, o), l && r.createElement("div", {
            className: "stories_button_replies",
            dangerouslySetInnerHTML: {
                __html: langNumeric(l, "%s", !0)
            }
        }))
    }
}, function(e, t, n) {
    "use strict";
    e.exports = {}
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
}, , , function(e, t, n) {
    "use strict";
    var r = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
    e.exports = function() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                    return t[e]
                }).join("")) return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                r[e] = e
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (e) {
            return !1
        }
    }() ? Object.assign : function(e, t) {
        for (var n, a, s = function(e) {
                if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }(e), l = 1; l < arguments.length; l++) {
            for (var u in n = Object(arguments[l])) o.call(n, u) && (s[u] = n[u]);
            if (r) {
                a = r(n);
                for (var c = 0; c < a.length; c++) i.call(n, a[c]) && (s[a[c]] = n[a[c]])
            }
        }
        return s
    }
}, , , function(e, t, n) {
    e.exports = n(180)()
}, , , function(e, t, n) {
    (function(r, o) {
        var i;
        (function() {
            "use strict";

            function a(e) {
                return "function" == typeof e
            }
            var s, l, u = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                c = 0,
                d = function(e, t) {
                    S[c] = e, S[c + 1] = t, 2 === (c += 2) && (l ? l(E) : _())
                };
            var f = "undefined" != typeof window ? window : void 0,
                p = f || {},
                h = p.MutationObserver || p.WebKitMutationObserver,
                y = void 0 !== r && "[object process]" === {}.toString.call(r),
                v = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function m() {
                return function() {
                    setTimeout(E, 1)
                }
            }
            var _, g, w, b, k, S = new Array(1e3);

            function E() {
                for (var e = 0; e < c; e += 2) {
                    (0, S[e])(S[e + 1]), S[e] = void 0, S[e + 1] = void 0
                }
                c = 0
            }
            y ? _ = function() {
                r.nextTick(E)
            } : h ? (w = 0, b = new h(E), k = document.createTextNode(""), b.observe(k, {
                characterData: !0
            }), _ = function() {
                k.data = w = ++w % 2
            }) : v ? ((g = new MessageChannel).port1.onmessage = E, _ = function() {
                g.port2.postMessage(0)
            }) : _ = void 0 === f ? function() {
                try {
                    var e = n(73);
                    return s = e.runOnLoop || e.runOnContext,
                        function() {
                            s(E)
                        }
                } catch (e) {
                    return m()
                }
            }() : m();
            var C = function(e, t) {
                var n = this._state;
                if (n === L && !e || n === P && !t) return this;
                var r = new this.constructor(x),
                    o = this._result;
                if (n) {
                    var i = arguments[n - 1];
                    d(function() {
                        z(n, r, i, o)
                    })
                } else M(this, r, e, t);
                return r
            };
            var T = function(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(x);
                return D(t, e), t
            };

            function x() {}
            var O = void 0,
                L = 1,
                P = 2,
                N = new U;

            function j(e) {
                try {
                    return e.then
                } catch (e) {
                    return N.error = e, N
                }
            }

            function R(e, t, n) {
                t.constructor === e.constructor && n === C && constructor.resolve === T ? function(e, t) {
                    t._state === L ? A(e, t._result) : t._state === P ? F(e, t._result) : M(t, void 0, function(t) {
                        D(e, t)
                    }, function(t) {
                        F(e, t)
                    })
                }(e, t) : n === N ? F(e, N.error) : void 0 === n ? A(e, t) : a(n) ? function(e, t, n) {
                    d(function(e) {
                        var r = !1,
                            o = function(e, t, n, r) {
                                try {
                                    e.call(t, n, r)
                                } catch (e) {
                                    return e
                                }
                            }(n, t, function(n) {
                                r || (r = !0, t !== n ? D(e, n) : A(e, n))
                            }, function(t) {
                                r || (r = !0, F(e, t))
                            }, e._label);
                        !r && o && (r = !0, F(e, o))
                    }, e)
                }(e, t, n) : A(e, t)
            }

            function D(e, t) {
                var n;
                e === t ? F(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(n = t) || "object" == typeof n && null !== n ? R(e, t, j(t)) : A(e, t)
            }

            function I(e) {
                e._onerror && e._onerror(e._result), B(e)
            }

            function A(e, t) {
                e._state === O && (e._result = t, e._state = L, 0 !== e._subscribers.length && d(B, e))
            }

            function F(e, t) {
                e._state === O && (e._state = P, e._result = t, d(I, e))
            }

            function M(e, t, n, r) {
                var o = e._subscribers,
                    i = o.length;
                e._onerror = null, o[i] = t, o[i + L] = n, o[i + P] = r, 0 === i && e._state && d(B, e)
            }

            function B(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (var r, o, i = e._result, a = 0; a < t.length; a += 3) r = t[a], o = t[a + n], r ? z(n, r, o, i) : o(i);
                    e._subscribers.length = 0
                }
            }

            function U() {
                this.error = null
            }
            var H = new U;

            function z(e, t, n, r) {
                var o, i, s, l, u = a(n);
                if (u) {
                    if ((o = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                return H.error = e, H
                            }
                        }(n, r)) === H ? (l = !0, i = o.error, o = null) : s = !0, t === o) return void F(t, new TypeError("A promises callback cannot return that same promise."))
                } else o = r, s = !0;
                t._state !== O || (u && s ? D(t, o) : l ? F(t, i) : e === L ? A(t, o) : e === P && F(t, o))
            }
            var W = function(e) {
                return new q(this, e).promise
            };
            var V = function(e) {
                var t = new this(x);
                if (!u(e)) return F(t, new TypeError("You must pass an array to race.")), t;
                var n = e.length;

                function r(e) {
                    D(t, e)
                }

                function o(e) {
                    F(t, e)
                }
                for (var i = 0; t._state === O && i < n; i++) M(this.resolve(e[i]), void 0, r, o);
                return t
            };
            var K = function(e) {
                    var t = new this(x);
                    return F(t, e), t
                },
                Y = 0;
            var $ = X;

            function X(e) {
                this._id = Y++, this._state = void 0, this._result = void 0, this._subscribers = [], x !== e && ("function" != typeof e && function() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }(), this instanceof X ? function(e, t) {
                    try {
                        t(function(t) {
                            D(e, t)
                        }, function(t) {
                            F(e, t)
                        })
                    } catch (t) {
                        F(e, t)
                    }
                }(this, e) : function() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }())
            }
            X.all = W, X.race = V, X.resolve = T, X.reject = K, X._setScheduler = function(e) {
                l = e
            }, X._setAsap = function(e) {
                d = e
            }, X._asap = d, X.prototype = {
                constructor: X,
                then: C,
                catch: function(e) {
                    return this.then(null, e)
                }
            };
            var q = Q;

            function Q(e, t) {
                this._instanceConstructor = e, this.promise = new e(x), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && A(this.promise, this._result))) : F(this.promise, this._validationError())
            }
            Q.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, Q.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === O && n < e; n++) this._eachEntry(t[n], n)
            }, Q.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === T) {
                    var o = j(e);
                    if (o === C && e._state !== O) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                    else if (n === $) {
                        var i = new n(x);
                        R(i, e, o), this._willSettleAt(i, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, Q.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === O && (this._remaining--, e === P ? F(r, n) : this._result[t] = n), 0 === this._remaining && A(r, this._result)
            }, Q.prototype._willSettleAt = function(e, t) {
                var n = this;
                M(e, void 0, function(e) {
                    n._settledAt(L, t, e)
                }, function(e) {
                    n._settledAt(P, t, e)
                })
            };
            var G = function() {
                    var e;
                    if (void 0 !== o) e = o;
                    else if ("undefined" != typeof self) e = self;
                    else try {
                        e = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var t = e.Promise;
                    t && "[object Promise]" === Object.prototype.toString.call(t.resolve()) && !t.cast || (e.Promise = $)
                },
                Z = {
                    Promise: $,
                    polyfill: G
                };
            void 0 === (i = function() {
                return Z
            }.call(t, n, t, e)) || (e.exports = i), G()
        }).call(this)
    }).call(this, n(184), n(54))
}, , function(e, t, n) {
    "use strict";
    var r = n(87);
    e.exports = function(e) {
        return r(e) && 3 == e.nodeType
    }
}, , , function(e, t) {}, , , , , , , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(47),
        o = n(68),
        i = n(11),
        a = n(159),
        s = n(84),
        l = n(183),
        u = n(4),
        c = n(110),
        d = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        f = o.Promise,
        p = {
            show: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                e.match(/story/) && (e = this._parseList(e)), this.getList(e).then(function(e) {
                    var n = e.storyOwner,
                        o = e.list,
                        i = e.items,
                        s = e.extra;
                    a.addLayer(new r.default(n, o, i, s, t), t)
                }).catch(function(e) {
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
                        f = p._getList(s);
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
                var t = (e = decodeURIComponent(e)).match(/^story(-?\d+)_(\d+)(\/([a-z0-9\_\-]+))?(\/([a-z0-9\_\=\;\-]+))?$/i),
                    n = d(t, 7),
                    r = n[1],
                    o = n[2],
                    i = n[4],
                    a = n[6],
                    s = r + "_" + o;
                return e.match(/from_feed\=1/) ? i = "feed" : e.match(/profile\=1/) ? i = "profile" : i || (i = s), s + "/" + i + "/" + a
            },
            initFeed: function() {
                var e = Object(s.ge)("stories_feed_items_container");

                function t() {
                    addEvent(e, browserFeatures.wheelEvent, p.feedMouseWheel)
                }

                function n() {
                    removeEvent(e, browserFeatures.wheelEvent, p.feedMouseWheel)
                }
                p.updateFeedArrows(), addEvent(e, "mouseenter", t), addEvent(e, "mouseleave", n), cur.destroy.push(function() {
                    removeEvent(e, browserFeatures.wheelEvent, p.feedMouseWheel), removeEvent(e, "mouseenter", t), removeEvent(e, "mouseleave", n)
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
                    i = cur.storiesPos || 0;
                if (isNumeric(e)) i += e;
                else {
                    var a = o - 100;
                    "next" === e ? i += a : i -= a
                }
                cur.storiesPos = Math.max(0, Math.min(i, r.scrollWidth - o)), t ? Object(s.removeClass)(r, "animated") : Object(s.addClass)(r, "animated"), setStyle(r, "transform", "translateX(-" + cur.storiesPos + "px)"), p.updateFeedArrows()
            },
            feedScrollToOwner: function(e) {
                var t = Object(s.ge)("stories_feed_items").offsetWidth,
                    n = Object(s.ge)("feed_story_" + e);
                if (n) {
                    var r = n.offsetWidth,
                        o = n.offsetLeft;
                    cur.storiesPos = o - t + t / 2 + r / 2, p.feedPaging(0, !0)
                }
            },
            updateFeedStories: function(e, t) {
                var n = this;
                if (e = e || "news", Object(s.ge)("stories_feed_items"))
                    if ("news" === e) {
                        var r = function(e, r) {
                            t && t.cb && t.cb(), n._setList("feed", r);
                            var o = Object(s.ge)("stories_feed_items");
                            o && (e ? (setStyle(o, "transform", "translateX(0px)"), Object(s.val)(o, e), o.children.length < 6 ? Object(s.addClass)("stories_feed_wrap", "stories_feed_not_nav_buttons") : Object(s.removeClass)("stories_feed_wrap", "stories_feed_not_nav_buttons")) : re("stories_feed_wrap"), cur.storiesPos = 0, p.updateFeedArrows(), show("stories_feed_wrap"))
                        };
                        if (t && t.stories) {
                            var o = t.stories;
                            r(o.html, o.js)
                        } else ajax.post("al_stories.php", {
                            act: "feed_stories"
                        }, {
                            onDone: r
                        })
                    } else hide("stories_feed_wrap")
            },
            feedMouseWheel: function(e) {
                if (!hasClass("stories_feed_wrap", "stories_feed_not_nav_buttons")) {
                    cancelEvent(e);
                    var t = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                    p.feedPaging(t, 1)
                }
            },
            updateFeedArrows: function() {
                var e = Object(s.ge)("stories_feed_items");
                if (e) {
                    cur.storiesPos || (cur.storiesPos = 0);
                    var t = Object(s.geByClass1)("stories_feed_wrap").offsetWidth,
                        n = e.scrollWidth - t;
                    0 === cur.storiesPos ? Object(s.addClass)("stories_feed_arrow_left", "disabled") : Object(s.removeClass)("stories_feed_arrow_left", "disabled"), cur.storiesPos === n || n <= 0 ? Object(s.addClass)("stories_feed_arrow_right", "disabled") : Object(s.removeClass)("stories_feed_arrow_right", "disabled")
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
                0 !== t.length ? ajax.post("al_stories.php", {
                    act: "save_blacklist",
                    hash: cur.storiesBlackList.hash,
                    list: t.join(",")
                }, {
                    onDone: function() {
                        curBox().hide(), p.updateFeedStories()
                    },
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                }) : curBox().hide()
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
                    p.blacklistUpdateUsers("")
                }), uiSearch.init("stories_blacklist"), uiSearch.focus("stories_blacklist"), curBox().addButton(Object(l.getLang)("global_save"), p.saveBlackList).addButton(Object(l.getLang)("global_cancel"), void 0, "no")) : curBox().addButton(Object(l.getLang)("global_close"))
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
                var e = p._getList("group_stories"),
                    t = e && e[0] && e[0].items;
                if (t) {
                    for (var n = 0, r = 0; r < t.length; r++) {
                        t[r].unread && n++
                    }
                    var o = Object(s.geByClass1)("stories_groups_block_stories_wrap"),
                        i = Object(s.geByClass1)("stories_groups_block_stories_button", o);
                    Object(s.toggleClass)(o, "has_unread", n > 0), Object(s.toggleClass)(o, "has_stories", t.length > 0), Object(s.toggleClass)(i, "has_stories", t.length > 0);
                    var a = Object(u.clone)(cur.storiesPreviews),
                        l = a.splice(a.length - n, 3);
                    l.length < 3 && (l = l.concat(a.slice(0, 3 - l.length))), l.reverse();
                    for (var c = "", d = l.length - 1; d >= 0; d--) c += cur.storiesPreviewsRowHtml.replace("{url}", l[d]);
                    Object(s.val)(Object(s.geByClass1)("stories_groups_block_stories_rows", o), c)
                }
            }
        };
    window.Stories = p;
    try {
        stManager.done("stories.js")
    } catch (e) {}
}, , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "ge", function() {
        return i
    }), n.d(t, "geByTag", function() {
        return a
    }), n.d(t, "geByTag1", function() {
        return s
    }), n.d(t, "geByClass", function() {
        return l
    }), n.d(t, "geByClass1", function() {
        return u
    }), n.d(t, "gpeByClass", function() {
        return c
    }), n.d(t, "domQuery", function() {
        return d
    }), n.d(t, "domQuery1", function() {
        return f
    }), n.d(t, "domClosest", function() {
        return p
    }), n.d(t, "domClosestByTag", function() {
        return h
    }), n.d(t, "gpeByTag", function() {
        return y
    }), n.d(t, "ce", function() {
        return v
    }), n.d(t, "re", function() {
        return k
    }), n.d(t, "se", function() {
        return S
    }), n.d(t, "sech", function() {
        return E
    }), n.d(t, "rs", function() {
        return C
    }), n.d(t, "psr", function() {
        return T
    }), n.d(t, "domReplaceEl", function() {
        return x
    }), n.d(t, "domEL", function() {
        return O
    }), n.d(t, "domNS", function() {
        return L
    }), n.d(t, "domPS", function() {
        return P
    }), n.d(t, "domFC", function() {
        return N
    }), n.d(t, "domLC", function() {
        return j
    }), n.d(t, "domPN", function() {
        return R
    }), n.d(t, "domChildren", function() {
        return D
    }), n.d(t, "domInsertBefore", function() {
        return I
    }), n.d(t, "domInsertAfter", function() {
        return A
    }), n.d(t, "domByClass", function() {
        return F
    }), n.d(t, "domData", function() {
        return M
    }), n.d(t, "domChildIndex", function() {
        return B
    }), n.d(t, "domCA", function() {
        return U
    }), n.d(t, "domClosestSibling", function() {
        return H
    }), n.d(t, "matchesSelector", function() {
        return z
    }), n.d(t, "isHover", function() {
        return W
    }), n.d(t, "isAncestor", function() {
        return V
    }), n.d(t, "getScroll", function() {
        return K
    }), n.d(t, "domClosestPositioned", function() {
        return Y
    }), n.d(t, "domClosestOverflowHidden", function() {
        return $
    }), n.d(t, "show", function() {
        return X
    }), n.d(t, "hide", function() {
        return q
    }), n.d(t, "isVisible", function() {
        return Q
    }), n.d(t, "clientHeight", function() {
        return G
    }), n.d(t, "getClientRectOffsetY", function() {
        return Z
    }), n.d(t, "toggle", function() {
        return J
    }), n.d(t, "boundingRectEnabled", function() {
        return ee
    }), n.d(t, "getXYRect", function() {
        return te
    }), n.d(t, "getXY", function() {
        return ne
    }), n.d(t, "isWindow", function() {
        return re
    }), n.d(t, "getSize", function() {
        return oe
    }), n.d(t, "getW", function() {
        return ie
    }), n.d(t, "getH", function() {
        return ae
    }), n.d(t, "hasClass", function() {
        return se
    }), n.d(t, "addClass", function() {
        return le
    }), n.d(t, "addClassDelayed", function() {
        return ue
    }), n.d(t, "removeClass", function() {
        return ce
    }), n.d(t, "removeClassDelayed", function() {
        return de
    }), n.d(t, "toggleClass", function() {
        return fe
    }), n.d(t, "toggleClassDelayed", function() {
        return pe
    }), n.d(t, "replaceClass", function() {
        return he
    }), n.d(t, "getStyle", function() {
        return ye
    }), n.d(t, "setStyle", function() {
        return ve
    }), n.d(t, "setStyleDelayed", function() {
        return me
    }), n.d(t, "setPseudoStyle", function() {
        return _e
    }), n.d(t, "data", function() {
        return ge
    }), n.d(t, "attr", function() {
        return we
    }), n.d(t, "removeAttr", function() {
        return be
    }), n.d(t, "removeData", function() {
        return ke
    }), n.d(t, "cleanElems", function() {
        return Se
    }), n.d(t, "setTitle", function() {
        return Ee
    }), n.d(t, "getZoom", function() {
        return Ce
    }), n.d(t, "val", function() {
        return Te
    }), n.d(t, "elfocus", function() {
        return xe
    }), n.d(t, "traverseParent", function() {
        return Oe
    }), n.d(t, "setDocumentTitle", function() {
        return Pe
    }), n.d(t, "lockDocumentTitle", function() {
        return Ne
    }), n.d(t, "initDomScripts", function() {
        return je
    });
    var r = n(4),
        o = n(28),
        i = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function a(e, t) {
        return (t = i(t) || document).getElementsByTagName(e)
    }

    function s(e, t) {
        return (t = i(t) || document).querySelector && t.querySelector(e) || a(e, t)[0]
    }

    function l(e, t, n) {
        return t = i(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
    }

    function u(e, t, n) {
        return t = i(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || l(e, t, n)[0]
    }

    function c(e, t, n) {
        if (!(t = i(t))) return null;
        for (; n !== t && (t = t.parentNode);)
            if (se(t, e)) return t;
        return null
    }

    function d(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function f(e, t) {
        return (t || document).querySelector(e)
    }

    function p(e, t) {
        return se(t, e) ? t : c(e, t)
    }

    function h(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : y(e, t)
    }

    function y(e, t) {
        if (!(t = i(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function v(e, t, n) {
        var o = document.createElement(e);
        return t && Object(r.extend)(o, t), n && ve(o, n), o
    }
    var m, _, g, w, b = (m = document, _ = m.createDocumentFragment(), g = m.createElement("div"), w = m.createRange && m.createRange(), _.appendChild(g), w && w.selectNodeContents(g), w && w.createContextualFragment ? function(e) {
        return e ? w.createContextualFragment(e) : m.createDocumentFragment()
    } : function(e) {
        if (!e) return m.createDocumentFragment();
        g.innerHTML = e;
        for (var t = m.createDocumentFragment(); g.firstChild;) t.appendChild(g.firstChild);
        return t
    });

    function k(e) {
        return (e = i(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var S = function(e) {
            return N(v("div", {
                innerHTML: e
            }))
        },
        E = function(e) {
            return D(v("div", {
                innerHTML: e
            }))
        };

    function C(e, t) {
        return Object(r.each)(t, function(t, n) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function T(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function x(e, t) {
        return Object(r.isString)(t) && (t = S(t)), R(e).replaceChild(t, e), t
    }

    function O(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var L = function(e) {
            return O((e || {}).nextSibling)
        },
        P = function(e) {
            return O((e || {}).previousSibling, 1)
        },
        N = function(e) {
            return O((e || {}).firstChild)
        },
        j = function(e) {
            return O((e || {}).lastChild, 1)
        },
        R = function(e) {
            return (e || {}).parentNode
        };

    function D(e) {
        for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
        return t
    }

    function I(e, t) {
        var n = R(t);
        return n && n.insertBefore(e, t)
    }

    function A(e, t) {
        var n = R(t);
        return n && n.insertBefore(e, L(t))
    }

    function F(e, t) {
        return e ? u(t, e) : e
    }

    function M(e, t, n) {
        return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
    }

    function B(e) {
        for (var t = 0; null != (e = P(e));) t++;
        return t
    }

    function U(e, t) {
        do {
            e = R(e)
        } while (e && !z(e, t));
        return e
    }

    function H(e, t, n) {
        for (var r = null; null === r && e;)(e = -1 === n ? P(e) : L(e)) && z(e, t) && (r = e);
        return r
    }

    function z(e, t) {
        return !(!(e = i(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
            return n > -1
        }).call(e, t)
    }

    function W(e) {
        return z(e, ":hover")
    }

    function V(e, t) {
        var n = i(e);
        if (t = i(t), !e || !t) return !1;
        for (; n = n.parentNode;)
            if (n === t) return !0;
        return !1
    }

    function K() {
        var e = browser.msie6 ? i("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function Y(e, t) {
        for (var n = (t = t || {}).fromEl || R(e), o = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
            var i = ye(n, "position");
            if (Object(r.inArray)(i, o) && (!t.noOverflow || "hidden" !== ye(n, "overflow"))) break;
            n = R(n)
        }
        return n
    }

    function $(e, t) {
        for (var n = e = i(e), r = void 0, o = void 0, a = void 0, s = !1; n && n.tagName && n !== bodyNode;) {
            if (r = ye(n, "position"), o = ye(n, "overflow"), a = ye(n, "transform"), t && browser.mozilla) {
                if ("page_wrap" != n.id && n !== e && "visible" !== o && ("static" === r ? !s || "relative" === s : "fixed" !== s)) break
            } else if (n !== e && "visible" !== o && ("static" === r ? !s || "relative" === s : "fixed" !== s)) break;
            "none" !== a ? s = void 0 : "static" !== r && "fixed" !== s && (s = r), n = R(n)
        }
        return n
    }

    function X(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; n < t; n++) X(arguments[n]);
        else if ((e = i(e)) && e.style) {
            var r = e.olddisplay,
                o = e.tagName.toLowerCase(),
                a = "block";
            e.style.display = r || "", "none" === ye(e, "display") && (a = se(e, "inline") || se(e, "_inline") ? "inline" : se(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function q(e) {
        var t = arguments.length;
        if (t > 1)
            for (var n = 0; n < t; n++) q(arguments[n]);
        else if ((e = i(e)) && e.style) {
            var r = ye(e, "display");
            e.olddisplay = "none" !== r ? r : "", e.style.display = "none"
        }
    }

    function Q(e) {
        return !(!(e = i(e)) || !e.style) && "none" !== ye(e, "display")
    }

    function G() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function Z(e, t, n) {
        e = i(e), n = n || 0;
        var o = ne(e)[1],
            a = oe(e)[1],
            s = window,
            l = document.documentElement,
            u = Math.max(Object(r.intval)(s.innerHeight), Object(r.intval)(l.clientHeight)),
            c = i("page_header_cont"),
            d = l.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            f = vk.staticheader ? Math.max(0, oe(c)[1] - d) : oe(c)[1];
        if (t) {
            if (o + a < d + f + n) return o + a - d - f - n;
            if (o > d + u - n) return o - d - u + n
        } else {
            if (o < d + f + n) return o - d - f - n;
            if (o + a > d + u - n) return o + a - d - u + n
        }
        return 0
    }

    function J(e, t) {
        return void 0 === t && (t = !Q(e)), t ? X(e) : q(e), t
    }

    function ee(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function te(e, t) {
        var n = void 0;
        if (t && "inline" === ye(e, "display")) {
            var r = e.getClientRects();
            n = r && r[0] || e.getBoundingClientRect()
        } else n = e.getBoundingClientRect();
        return n
    }

    function ne(e, t) {
        if (!(e = i(e))) return [0, 0];
        var n = e.ownerDocument,
            r = {
                top: 0,
                left: 0
            };
        if (!n) return [0, 0];
        var o = n.documentElement;
        ee(e) && (r = te(e, !0));
        var a = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
        return [r.left + (t ? 0 : a.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), r.top + (t ? 0 : a.pageYOffset || o.scrollTop) - (o.clientTop || 0)]
    }

    function re(e) {
        return null != e && e === e.window
    }

    function oe(e, t, n) {
        e = i(e);
        var o = document.documentElement,
            a = [0, 0],
            s = void 0;
        if (t && "border-box" === ye(e, "boxSizing") && (t = !1), e === document) a = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
        else if (e) {
            var l = function() {
                a = ee(e) && (s = te(e, n)) && void 0 !== s.width ? [s.width, s.height] : [e.offsetWidth, e.offsetHeight], t && Object(r.each)(a, function(t, n) {
                    var o = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(r.each)(o, function() {
                        a[t] -= parseFloat(ye(e, "padding" + this)) || 0, a[t] -= parseFloat(ye(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (Q(e)) l();
            else {
                var u = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    c = {},
                    d = !1;
                e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), Object(r.each)(u, function(t, n) {
                    c[t] = e.style[t], e.style[t] = n
                }), l(), Object(r.each)(u, function(t, n) {
                    e.style[t] = c[t]
                }), d && (e.style.cssText = d)
            }
        }
        return a
    }

    function ie(e) {
        return oe(e)[0]
    }

    function ae(e) {
        return oe(e)[1]
    }

    function se(e, t) {
        var n = i(e);
        return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function le(e, t) {
        var n = i(e);
        n && !se(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var ue = function(e, t) {
        return setTimeout(le.pbind(e, t), 0)
    };

    function ce(e, t) {
        var n = i(e);
        n && (n.className = Object(r.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var de = function(e, t) {
        return setTimeout(ce.pbind(e, t), 0)
    };

    function fe(e, t, n) {
        return void 0 === n && (n = !se(e, t)), (n ? le : ce)(e, t), n
    }

    function pe(e, t, n) {
        return void 0 === n && (n = !se(e, t)), (n ? ue : de)(e, t), n
    }

    function he(e, t, n) {
        ce(e, t), le(e, n)
    }

    function ye(e, t, n) {
        if (e = i(e), Object(r.isArray)(t)) {
            var o = {};
            return Object(r.each)(t, function(t, n) {
                return o[n] = ye(e, n)
            }), o
        }
        if (!e) return "";
        if (void 0 === n && (n = !0), !n && "opacity" === t && browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var s = void 0,
            l = document.defaultView || window;
        if (l.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var u = l.getComputedStyle(e, null);
            u && (s = u.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && browser.msie) {
                var c = e.currentStyle.filter;
                return c && c.indexOf("opacity=") >= 0 ? parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var d = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (s = e.currentStyle[t] || e.currentStyle[d]) && (s = 0), s = (s + "").split(" "), Object(r.each)(s, function(t, n) {
                if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                    var r = e.style,
                        o = r.left,
                        i = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, s[t] = r.pixelLeft + "px", r.left = o, e.runtimeStyle.left = i
                }
            }), s = s.join(" ")
        }
        if (n && ("width" === t || "height" === t)) {
            var f = oe(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            s = (Object(r.intval)(s) ? Math.max(Object(r.floatval)(s), f) : f) + "px"
        }
        return s
    }

    function ve(e, t, n) {
        if (e = i(e))
            if (Object(r.isObject)(t)) Object(r.each)(t, function(t, n) {
                return ve(e, t, n)
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
    var me = function(e, t, n) {
        return setTimeout(ve.pbind(e, t, n), 0)
    };

    function _e(e, t, n) {
        var o = ge(e, "pseudo-id");
        o || (ge(e, "pseudo-id", o = Object(r.irand)(1e8, 999999999)), le(e, "_pseudo_" + o));
        var a = t + "-style-" + o,
            s = i(a),
            l = "._pseudo_" + o + ":" + t + "{";
        s || (s = headNode.appendChild(v("style", {
            id: a,
            type: "text/css"
        }))), Object(r.each)(n, function(e, t) {
            l += e + ": " + t + " !important;"
        }), l += "}", s.sheet ? (s.sheet.cssRules.length && s.sheet.deleteRule(0), s.sheet.insertRule(l, 0)) : s.styleSheet && (s.styleSheet.cssText = l)
    }

    function ge(e, t, n) {
        if (!e) return !1;
        var r = e[vkExpand];
        return r || (r = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = e)), vkCache[r][t] = n), t ? vkCache[r] && vkCache[r][t] : r
    }

    function we(e, t, n) {
        return e = i(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
    }

    function be(e) {
        for (var t = 0, n = arguments.length; t < n; ++t) {
            var r = arguments[t];
            if (void 0 !== e[r]) try {
                delete e[r]
            } catch (t) {
                try {
                    e.removeAttribute(r)
                } catch (e) {}
            }
        }
    }

    function ke(e, t) {
        var n = !!e && e[vkExpand];
        if (n)
            if (t) {
                if (vkCache[n]) {
                    delete vkCache[n][t], t = "";
                    var r = 0;
                    for (var i in vkCache[n])
                        if ("__elem" !== i) {
                            r++;
                            break
                        }
                    r || ke(e)
                }
            } else Object(o.removeEvent)(e), be(e, vkExpand), delete vkCache[n]
    }

    function Se() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var n = i(e[t]);
            n && (ke(n), be(n, "btnevents"))
        }
    }

    function Ee(e, t, n) {
        if ((e = i(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
            else {
                var r = s("b", e);
                r && r.scrollWidth > r.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function Ce() {
        var e = i("zoom_test_1") || document.body.appendChild(v("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (i("zoom_test_2") || document.body.appendChild(v("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function Te(e, t, n) {
        if (e = i(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(o.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function xe(e, t, n) {
        e = i(e);
        try {
            if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== n && !1 !== n || (n = t), e.setSelectionRange) e.setSelectionRange(t, n);
            else if (window.getSelection && document.createRange) {
                var r = document.createRange();
                r.selectNodeContents(e), r.collapse(!1);
                var o = window.getSelection();
                o.removeAllRanges(), o.addRange(r)
            }
        } catch (e) {}
    }

    function Oe(e, t, n) {
        for (e = i(e), n = n || 999; e && !t(e);) {
            if (0 === --n) return !1;
            try {
                if ((e = R(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    var Le = !1;

    function Pe(e) {
        if (!Le) return window.document.title = Object(r.replaceEntities)(e)
    }

    function Ne(e) {
        Le = e, e && window.cur && window.cur.destroy.push(function() {
            Ne(!1)
        })
    }

    function je() {
        window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
    }
    window.ge = i, window.geByTag = a, window.geByTag1 = s, window.geByClass = l, window.geByClass1 = u, window.gpeByClass = c, window.domQuery = d, window.domQuery1 = f, window.domClosest = p, window.ce = v, window.cf = b, window.re = k, window.se = S, window.sech = E, window.rs = C, window.psr = T, window.domReplaceEl = x, window.domEL = O, window.domNS = L, window.domPS = P, window.domFC = N, window.domLC = j, window.domPN = R, window.domChildren = D, window.domInsertBefore = I, window.domInsertAfter = A, window.domByClass = F, window.domData = M, window.domChildIndex = B, window.domCA = U, window.domClosestSibling = H, window.matchesSelector = z, window.isHover = W, window.isAncestor = V, window.getScroll = K, window.domClosestPositioned = Y, window.domClosestOverflowHidden = $, window.show = X, window.hide = q, window.isVisible = Q, window.clientHeight = G, window.getClientRectOffsetY = Z, window.toggle = J, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = ne, window.isWindow = re, window.getSize = oe, window.hasClass = se, window.addClass = le, window.addClassDelayed = ue, window.removeClass = ce, window.removeClassDelayed = de, window.toggleClass = fe, window.toggleClassDelayed = pe, window.replaceClass = he, window.getStyle = ye, window.setStyle = ve, window.setStyleDelayed = me, window.setPseudoStyle = _e, window.data = ge, window.attr = we, window.removeAttr = be, window.removeData = ke, window.cleanElems = Se, window.setTitle = Ee, window.getZoom = Ce, window.val = Te, window.elfocus = xe, window.traverseParent = Oe, window.getH = ae, window.getW = ie, window.domClosestByTag = h, window.setDocumentTitle = Pe, window.lockDocumentTitle = Ne
}, , , function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = (e ? e.ownerDocument || e : document).defaultView || window;
        return !(!e || !("function" == typeof t.Node ? e instanceof t.Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
    }
}, , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "default", function() {
        return a
    });
    var r = n(30),
        o = (n(65), n(113)),
        i = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function a(e) {
        var t = e.story,
            n = t.getCurStoryData().hide_settings,
            a = window.uiActionsMenu;
        if (n) return null;
        var s = function(e) {
            var t = [],
                n = e.getCurStoryData(),
                r = n.raw_id,
                a = n.can_hide_reply,
                s = n.report_hash,
                l = n.can_remove,
                u = n.narrative,
                c = e.data.can_blacklist,
                d = r.split("_").map(function(e) {
                    return intval(e)
                }),
                f = i(d, 1)[0],
                p = u && !u.is_cover;
            c && !p && t.push({
                label: Object(o.getLang)("stories_add_blacklist_button"),
                onClick: function() {
                    return e._addToBlacklist()
                }
            });
            a && t.push({
                label: Object(o.getLang)("stories_hide_reply_button"),
                onClick: function() {
                    return e._hideReply()
                }
            });
            u && t.push({
                label: u.is_bookmarked ? Object(o.getLang)("stories_narrative_remove_bookmark_button") : Object(o.getLang)("stories_narrative_add_bookmark_button"),
                onClick: function() {
                    return e._sendNarrativeBookmarkButtonDidPress()
                }
            });
            u && u.can_edit && t.push({
                label: Object(o.getLang)("stories_narrative_edit_button"),
                onClick: function() {
                    return e._sendNarrativeEditButtonDidPress()
                }
            });
            l && e.getOwnerId() < 0 && t.push({
                label: u ? Object(o.getLang)("global_narrative_delete") : Object(o.getLang)("global_delete"),
                onClick: function() {
                    return u ? e.removeNarrativeBox() : e.removeStoryBox()
                }
            });
            s && t.push({
                label: Object(o.getLang)("stories_report"),
                onClick: function() {
                    return e.report()
                }
            });
            f === vk.id || p || t.push({
                label: Object(o.getLang)("stories_settings"),
                onClick: function() {
                    return window.Stories.showBlackList()
                }
            });
            return t
        }(t);
        if (0 === s.length) return null;
        var l = void 0,
            u = void 0;
        return r.createElement("div", {
            className: "stories_button more ui_actions_menu_wrap _ui_menu_wrap ui_actions_menu_top stories_actions",
            onMouseEnter: function(e) {
                clearTimeout(l), t.pauseStory(), a.show(u, e)
            },
            onMouseLeave: function() {
                a.hide(u), clearTimeout(l), l = setTimeout(function() {
                    return t.autoResumeStory()
                }, 300)
            },
            ref: function(e) {
                u = e
            }
        }, r.createElement("div", {
            className: "ui_actions_menu _ui_menu"
        }, s.map(function(e) {
            var t = e.label,
                n = (e.className, e.onClick);
            return r.createElement("div", {
                key: t,
                className: "ui_actions_menu_item",
                onClick: n
            }, t)
        })))
    }
}, , function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
        try {
            return e.activeElement || e.body
        } catch (t) {
            return e.body
        }
    }
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(30),
        o = n(15),
        i = n(11),
        a = n(137),
        s = n(159),
        l = n(95),
        u = n(171),
        c = n(175),
        d = n(110),
        f = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    var p = window,
        h = p.radioBtns,
        y = p.getLang,
        v = p.lockButton,
        m = p.unlockButton,
        _ = p.removeEvent,
        g = p.addEvent,
        w = p.addClass,
        b = p.removeClass,
        k = p.toggleClass,
        S = p.geByClass1,
        E = p.geByClass,
        C = p.ge,
        T = p.se,
        x = p.domQuery,
        O = p.curBox,
        L = p.showBox,
        P = p.extend,
        N = function() {
            function e(t, n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.data = t, this.opts = n, this.id = n.id, this.isActive = !1, this.story = !1, this.index = 0, this.preloadedStories = {}, this.layer = n.layer
            }
            return e.prototype.destroy = function() {
                this._destroyStory(), _(S("stories_item_cont", this.contWrap)), _(S("stories_reply_to", this.replyToWrap)), _(this.shareButton), delete this.shareButton, _(this.followBtn), delete this.followBtn, _(this.answersEl), delete this.answersEl, clearTimeout(this.showMessageTimer);
                for (var e = E("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) _(e[t]);
                _(this.viewsButton), _(S("stories_feedback_close", this.wrapEl)), _(S("stories_link", this.wrapEl)), delete this.contWrap, delete this.backButton, delete this.replyToWrap, delete this.dateEl, delete this.replyToWrap, delete this.timeLineEl, delete this.authorButtons, delete this.inlineLoader, this.wrapEl && this.wrapEl.parentNode && this.wrapEl.parentNode.removeChild(this.wrapEl), delete this.wrapEl;
                for (var n = !1, r = 0; r < this.data.items.length; r++)
                    if (this.data.items[r].unread) {
                        n = !0;
                        break
                    }
                var o = s.getPrevLayer();
                !n && o && o.activeStory && b(x("#feed_story_" + this.getOwnerId(), o.activeStory.wrapEl)[0], "story_feed_new_item")
            }, e.prototype._destroyTimeLine = function() {
                for (var e = E("stories_time_line", this.timeLineEl), t = 0; t < e.length; t++) _(e[t])
            }, e.prototype.getOwnerId = function() {
                return this.data.author.id
            }, e.prototype.getIndex = function() {
                return this.index
            }, e.prototype.isLastStory = function() {
                return this.index >= this.data.items.length - 1
            }, e.prototype.getRawId = function() {
                return !!this.story && this.story.getId()
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
                return g(e, "mousedown", this._onMouseDownHandle.bind(this)), g(e, "mouseup", this._onMouseUpHandle.bind(this)), this.contWrap.appendChild(e), e.appendChild(this._renderAuthor()), e.appendChild(ce("div", {
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
                })), this._initTimeLine(), k(this.wrapEl, "multi_stories", this.data.items.length > 1), this.wrapEl
            }, e.prototype.updateBottom = function(e) {
                var t = S("stories_bottom_wrap", this.wrapEl);
                !this.isActive || e || this.story.isNarrativeMetaStory ? (o.unmountComponentAtNode(t), val(t, "")) : o.render(r.createElement(l.default, {
                    story: this
                }), t)
            }, e.prototype._canForceDeleteStories = function() {
                return this.data.moder_remove_hash && !this.data.items[0].is_deleted
            }, e.prototype._initTimeLine = function() {
                this.timeLineEl && (this._destroyTimeLine(), re(this.timeLineEl)), S("stories_item_cont", this.contWrap).appendChild(this._renderTimeLine())
            }, e.prototype._isActionsShown = function() {
                var e = domClosest("_ui_menu_wrap", this.wrapEl);
                return hasClass(e, "shown")
            }, e.prototype._renderPreview = function() {
                return T('<div class="stories_preview"></div>')
            }, e.prototype._renderMessage = function(e) {
                return T('<div class="stories_message">\n  <div class="stories_message_text">' + e + "</div>\n</div>")
            }, e.prototype._showMessage = function(e) {
                var t = this;
                re(S("stories_message", this.contWrap));
                var n = this._renderMessage(e);
                return this.contWrap.appendChild(n), clearTimeout(this.showMessageTimer), new Promise(function(e) {
                    t.showMessageTimer = setTimeout(function() {
                        t.contWrap.removeChild(n), e()
                    }, 3e3)
                })
            }, e.prototype._setPreview = function(e) {
                var t = this,
                    n = this.index,
                    r = this.data.items[n].preview_url;
                r !== this.curPreviewUrl && r && (e = e || S("stories_preview", this.contWrap), Object(i.loadMedia)(r).then(function(o) {
                    n === t.index && r !== t.curPreviewUrl && (t.curPreviewUrl = r, setStyle(e, "backgroundImage", "url(" + o + ")")), setStyle(e, "opacity", 1)
                }))
            }, e.prototype.getPreview = function() {
                return this.data.items[this.index].preview_url
            }, e.prototype._renderAuthor = function() {
                var e = this.data.author,
                    t = e.photo,
                    n = e.href,
                    r = e.name,
                    o = e.verify,
                    i = this.data && this.data.items[0] && this.data.items[0].narrative,
                    a = void 0;
                this.data.is_narrative && i && !i.is_cover ? a = '\n      <div>\n          <div class="stories_narrative_title">' + i.title + '</div>\n          <span class="stories_narrative_author">' + r + " · " + y("global_type_narrative") + "</span>\n      </div>" : a = '\n      <div class="stories_author_cont">\n        ' + ('<a href="' + n + '" class="stories_author_photo_wrap"><img src="' + t + '" class="stories_author_photo" /></a>') + '\n        <a href="' + n + '" class="stories_author_name"><span>' + r + "</span></a>\n        " + (o || "") + '\n        <div class="stories_date"></div>\n      </div>';
                var s = T('\n      <div class="stories_author">\n        <div class="stories_author_cont_wrap">\n          <div class="stories_author_inner">' + a + '</div>\n          <div class="stories_author_buttons"></div>\n         </div>\n      </div>\n    ');
                return !0 === this.data.hide_owner && val(S("stories_author_cont", s), ""), k(this.wrapEl, "hide_owner", !0 === this.data.hide_owner), this.dateEl = S("stories_date", s), this.authorButtons = S("stories_author_buttons", s), s
            }, e.prototype._renderFollowButton = function() {
                var e = this;
                return this.followBtn = ce("div", {
                    className: "stories_author_button stories_follow"
                }), g(this.followBtn, "click", this._onFollowBtnClick.bind(this)), g(this.followBtn, "mouseover", function() {
                    var t = hasClass(e.followBtn, "followed") ? y("stories_unfollow") : y("stories_follow");
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
                    g(r, "click", function() {
                        e.layer._sendNavigationStatEvents("go_to_story_click"), e.changeStory(n)
                    });
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
                this.isActive && (this.isLocked() || !hasClass(e.target, "stories_item_cont") && !hasClass(e.target, "stories_item_back") || this.downTs || (this.downTs = vkNow(), this.story && this.story.pause(), w(this.wrapEl, "paused")))
            }, e.prototype._onMouseUpHandle = function(e) {
                var t = this.downTs;
                delete this.downTs;
                var n = !(vkNow() - t < 200 && !this.formLocked && !hasClass(this.wrapEl, "autoplay_failed"));
                if (this.isActive && hasClass(e.target, "stories_item_back") && !n) return this.layer._sendNavigationStatEvents("go_to_previous_story"), this.prevStory();
                if (hasClass(e.target, "stories_item_cont") || hasClass(e.target, "stories_item_back")) {
                    if (this._feedbackTTShown && this.hideFeedbackTooltip(), b(this.wrapEl, "paused"), !this.isActive) return this.id > this.layer.activeStory.id ? this.layer._sendNavigationStatEvents("go_to_next_author") : this.layer._sendNavigationStatEvents("go_to_previous_author"), void this.opts.onSelect(this);
                    if (!n) return this.layer._sendNavigationStatEvents("go_to_next_story_tap"), void this._onPlayEnd();
                    t && this.layer._sendNavigationStatEvents("pause_long_tap"), this.isPaused() && this.playStory()
                }
            }, e.prototype.isLocked = function() {
                return !!(O() || this._getSendText() || !this.isActive || this.formLocked || this._feedbackTTShown || document.hidden || this._getSendText() || this._isActionsShown() || isVisible(this.inlineLoader) || hasClass(this.wrapEl, "hiding_reply"))
            }, e.prototype.autoResumeStory = function() {
                this.audioPlaying || this.playStory()
            }, e.prototype.playStory = function() {
                this.isLocked() || (b(this.wrapEl, "paused"), this.story || this._initStory(), this.story.play(), delete this.downTs)
            }, e.prototype.pauseStory = function(e) {
                this.story && (this.isPaused() || (e && w(this.wrapEl, "paused"), this.story.pause()))
            }, e.prototype.changeStory = function(e) {
                this.index === e || this.formLocked || (this._destroyStory(), this.index = e, this._setPreview(), this.playStory())
            }, e.prototype.getWrap = function() {
                return this.wrapEl
            }, e.prototype.stop = function() {
                this._destroyFeedBackTT(), this.isActive = !1, this._destroyStory(), this._stopLoader(), val(S("stories_send_form_text", this.wrapEl), ""), this._unlockSendForm(), b(this.wrapEl, "autoplay_failed")
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
                "video" === t ? (this.story = new u.default(e, n), a.getVolume() > 0 && this.opts.onVideoPlay(), w(this.wrapEl, "video")) : "photo" === t && (this.story = new c.default(e, n), this.opts.onVideoEnd(), b(this.wrapEl, "video"));
                this.fillTimeLine(), val(this.dateEl, e.is_ads ? y("stories_is_ad") : this.story.getDate()), this.opts.onStartStory(), k(this.wrapEl, "stories_can_comment", !0 === e.can_comment), e.reply_to && this.replyToWrap.appendChild(this._renderReplyTo()), this.data.author.can_follow && !this.data.is_promo && this.authorButtons.appendChild(this._renderFollowButton()), this.story.isNarrativeMetaStory = this.data.is_narrative && e.narrative && !e.narrative.is_cover && this.getIndex() == this.data.items.length - 1, this._destroyFeedBackTT(), this.updateBottom(), this.contWrap.appendChild(this.story.render()), this.story.isNarrativeMetaStory && !this.story.failed && (re(S("stories_photo", this.contWrap)), re(S("stories_video", this.contWrap)), w(this.contWrap, "stories_item_cont_wrap_meta_story"), this.contWrap.appendChild(this.story.renderNarrativeMetaStory()))
            }, e.prototype.getReplies = function() {
                return this.story.getReplies()
            }, e.prototype.getViews = function() {
                return this.story.getViews()
            }, e.prototype.indexToUnread = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = this.data.items,
                    n = 0;
                for (var r in t)
                    if (t[r].unread) {
                        n = intval(r);
                        break
                    }
                if (e) return n;
                this.index = n, this._setPreview()
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
                    var n = S("stories_time_line_item_cont_active", e.children[t]);
                    t === this.index && (this.currentTimeLineEl = n);
                    var r = t < this.index ? 100 : 0;
                    setStyle(n, "transform", "translateX(" + r + "%)")
                }
            }, e.prototype._destroyStory = function() {
                if (this.story) {
                    this.updateBottom(!0), window.tooltips && tooltips.hideAll(), this._resetErrors(), this._destroyFeedBackTT(), this.story.pause(), b(this.contWrap, "stories_item_cont_wrap_meta_story"), re(S("narrative_meta_story", this.contWrap)), cancelAnimationFrame(this.timeLineAnim);
                    try {
                        this.contWrap.removeChild(this.story.getContainer()), this.story.destroy()
                    } catch (e) {}
                    this._replyHideEnd(), _(this.followBtn), val(this.authorButtons, ""), _(this.answersEl), _(S("stories_reply_to", this.replyToWrap)), val(this.replyToWrap, ""), this.hideInlineLoader(), delete this.story
                }
            }, e.prototype._timeLineUpdate = function() {
                var e = this.story;
                if (e && !e.isPaused()) {
                    var t = e.getCurrentTime(),
                        n = e.getDuration(),
                        r = Math.max(0, Math.min(100, t / n * 100));
                    setStyle(this.currentTimeLineEl, "transform", "translateX(" + r + "%) translateZ(0)"), r < 100 ? this.timeLineAnim = requestAnimationFrame(this._timeLineUpdate.bind(this)) : this._onPlayEnd(!0)
                }
            }, e.prototype._onLoadingStart = function() {
                this._loadingStartTime = new Date
            }, e.prototype._onLoadingEnd = function() {
                if (statlogsValueEvent("story_views_tmp_stat", this.getCurStoryData().unread ? 0 : 1), this._loadingStartTime) {
                    var e = new Date - this._loadingStartTime;
                    this.layer._sendViewerStartTime(this.getRawId(), e), this._loadingStartTime = 0
                }
            }, e.prototype._onPlay = function() {
                this._resetErrors(), this._stopLoader(), this._timeLineUpdate(), this.preloadNextStory(), this.opts.onPlayStory(), b(this.wrapEl, "animate_story"), b(this.wrapEl, "autoplay_failed"), this.data.items[this.getIndex()].unread = !1, this._updateFeedStoryPreview()
            }, e.prototype._onPause = function() {
                cancelAnimationFrame(this.timeLineAnim)
            }, e.prototype._onPlayEnd = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.nextStory(e)
            }, e.prototype.nextStory = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!this.isLocked()) {
                    var t = this.data.items,
                        n = this.index + 1;
                    n < t.length ? (e && this.layer._sendNavigationStatEvents("go_to_next_story_auto_by_time"), this.changeStory(n)) : (this._destroyStory(), this.opts.onStoriesEnd(e))
                }
            }, e.prototype.prevStory = function() {
                if (this._feedbackTTShown && this.hideFeedbackTooltip(), !this.isLocked()) {
                    var e = this.index - 1;
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
                        window.cur.module === d.STORIES_MANAGE_MODULE && window.GeStories.storyDidRemove(r, e), O().hide(), t._popStoryAndClearList(n)
                    },
                    showProgress: v.pbind(e),
                    hideProgress: m.pbind(e)
                })
            }, e.prototype.removeNarrativeBox = function() {
                var e = this;
                this.pauseStory(), showFastBox({
                    title: y("global_warning"),
                    onHide: function() {
                        e.playStory()
                    }
                }, y("stories_narrative_remove_warning"), y("stories_remove_confirm"), this.removeNarrative.bind(this), y("global_cancel"))
            }, e.prototype.removeNarrative = function(e) {
                var t = this;
                this.pauseStory();
                var n = this.getCurStoryData().narrative,
                    r = n.raw_id;
                ajax.post("al_stories.php", {
                    act: "remove_narrative",
                    narrative_raw: r,
                    hash: this.data.remove_hash,
                    moder_remove_hash: this.data.moder_remove_hash
                }, {
                    onDone: function() {
                        O().hide(), t._popCoverAndCleanNarrativeList(n)
                    },
                    showProgress: v.pbind(e),
                    hideProgress: m.pbind(e)
                })
            }, e.prototype._popCoverAndCleanNarrativeList = function(e) {
                if (e.is_cover) this._popStoryAndClearList(this.getIndex());
                else {
                    this.opts.removeList(), this._remove(!1, function() {
                        cur.storyLayer.activeStory._popStoryAndClearList(cur.storyLayer.activeStory.getIndex())
                    }.bind(this))
                }
            }, e.prototype._sendNarrativeBookmarkButtonDidPress = function() {
                var e = this,
                    t = this.getCurStoryData().narrative;
                this.updateBottom = this.updateBottom.bind(this), ajax.post("al_bookmarks.php", {
                    act: "bookmark",
                    owner_id: t.owner_id,
                    object_id: t.id,
                    type: "narrative",
                    state: t.is_bookmarked ? 1 : 0,
                    hash: t.bookmark_hash
                }, {
                    onDone: function(n) {
                        showDoneBox(n || y("stories_narrative_bookmark_deleted"), {
                            className: "stories_done_msg"
                        }), t.is_bookmarked = !t.is_bookmarked, e.updateBottom()
                    }
                })
            }, e.prototype._sendNarrativeEditButtonDidPress = function() {
                var e = this.getCurStoryData().narrative;
                window.open("https://" + location.hostname + this.data.author.href + "?act=narrative_edit&nid=" + e.id)
            }, e.prototype._popStoryAndClearList = function(e) {
                this._removeStoryFromMemoryByIndex(e), 0 === this.data.items.length && s.onReplyDeleted(this.getOwnerId())
            }, e.prototype._removeStoryFromMemoryByIndex = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                this.data.items.splice(e, 1), this.opts.removeList();
                var n = this.data.items.length;
                n ? (this._initTimeLine(), n > e ? this.isActive && (this._initStory(), this._setPreview(), this.playStory()) : this.isActive && this.nextStory()) : this._remove(t)
            }, e.prototype._remove = function(e, t) {
                this.opts.onStoryRemoved(e, t)
            }, e.prototype.shareBox = function() {
                var e = this,
                    t = this.getCurStoryData().narrative,
                    n = void 0;
                n = t ? "narrative" + t.raw_id : "story" + this.story.getId(), this.pauseStory(), L("like.php", {
                    act: "publish_box",
                    object: n,
                    from: "wkview"
                }, {
                    onDone: function() {
                        e.autoResumeStory()
                    },
                    params: {
                        onHide: function() {
                            e.autoResumeStory()
                        }
                    }
                })
            }, e.prototype._onAnswerSend = function(e, t) {
                var n = this,
                    r = this._getSendText();
                if (!r || !this.story) return cancelEvent(e);
                var o = this.story.data.narrative,
                    i = void 0;
                i = o ? "narrative:" + o.raw_id : "story:" + this.story.getId(), this.layer._sendNavigationStatEvents("comment_send"), ajax.post("al_im.php", {
                    act: "a_send",
                    msg: r,
                    hash: this.data.send_hash,
                    media: i,
                    entrypoint: "stories_comment",
                    to: this.getOwnerId()
                }, {
                    onDone: function() {
                        n._showMessage(y("stories_answer_sent")).then(function() {
                            n._unlockSendForm(), n.playStory()
                        }), val(S("stories_send_form_text", n.wrapEl), ""), n._blurSendForm(), n.updateFeedbackTTPos(), n.pauseStory(), t && t()
                    },
                    showProgress: function() {
                        val(n.sendFormButton, n._getLoaderHtml()), w(n.sendFormButton, "sending")
                    },
                    hideProgress: function() {
                        val(n.sendFormButton, ""), b(n.sendFormButton, "sending")
                    }
                })
            }, e.prototype._onSendFormFocus = function() {
                var e = this;
                this.pauseStory(), this.formLocked = !0, cancelStackPush("stories_form_focus", function() {
                    Emoji.shown || (e._resetFendForm(), e._blurSendForm()), e.updateFeedbackTTPos()
                })
            }, e.prototype._blurSendForm = function() {
                var e = S("stories_send_form_text", this.wrapEl);
                e && e.blur()
            }, e.prototype._getSendText = function() {
                var e = Emoji.editableVal(S("stories_send_form_text", this.wrapEl));
                return trim(e)
            }, e.prototype._onSendFormBlur = function() {
                this._getSendText() || this._resetFendForm()
            }, e.prototype._onSendFormKeyUp = function() {
                this.updateFeedbackTTPos()
            }, e.prototype._unlockSendForm = function() {
                this.formLocked && (this.formLocked = !1)
            }, e.prototype._resetFendForm = function() {
                this._unlockSendForm(), this.playStory(), val(S("stories_send_form_text", this.wrapEl), "")
            }, e.prototype._emojiOnKeyAction = function() {
                this._getSendText() ? w(this.sendFormButton, "active") : b(this.sendFormButton, "active")
            }, e.prototype._getLoaderHtml = function() {
                return '<svg class="stories_view_loader_circular" viewBox="25 25 50 50">\n      <circle class="stories_view_loader_circular_path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>'
            }, e.prototype.preloadNextStory = function(e) {
                if (e = isUndefined(e) ? this.index + 1 : e, !this.preloadedStories[e]) {
                    var t = this.data.items[e];
                    if (t) {
                        this.preloadedStories[e] = !0;
                        var n = t[t.type + "_url"];
                        n && ("video" === t.type ? Object(i.default)(n) : Object(i.loadMedia)(n))
                    }
                }
            }, e.prototype._addToBlacklist = function() {
                cur.storyLayer && cur.storyLayer.pauseStory(), showFastBox({
                    title: y("stories_add_blacklist_title"),
                    onHide: function() {
                        cur.storyLayer && cur.storyLayer.playStory()
                    }
                }, this.getOwnerId() < 0 ? y("stories_add_blacklist_message_group") : y("stories_add_blacklist_message"), y("stories_add_blacklist_button"), this._doAddToBlacklist.bind(this), y("global_cancel"))
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
                    hideProgress: m.pbind(e)
                })
            }, e.prototype._resetErrors = function() {
                var e = S("stories_error_wrap", this.contWrap);
                e && (_(S("stories_error_button", e)), re(e)), b(this.wrapEl, "failed"), b(this.wrapEl, "fatal_error")
            }, e.prototype._showError = function(e) {
                var t = this;
                if (this.contWrap) {
                    var n = e,
                        r = void 0,
                        o = void 0;
                    switch (e) {
                        case "load":
                            r = y("stories_error_cant_load"), o = ce("div", {
                                className: "stories_error_button",
                                innerHTML: y("stories_try_again")
                            }), g(o, "click", function() {
                                t._destroyStory(), t.playStory()
                            });
                            break;
                        case "expired":
                            r = y("stories_error_expired");
                            break;
                        case "deleted":
                            r = y("stories_error_deleted");
                            break;
                        case "private":
                            r = y("stories_error_private");
                            break;
                        case "deleted-narrative":
                            r = y("stories_error_deleted_narrative");
                            break;
                        case "private-narrative":
                            r = y("stories_error_private_narrative");
                            break;
                        default:
                            r = y("global_unknown_error")
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
                        className: "stories_error_icon " + n
                    })), s.appendChild(ce("div", {
                        className: "stories_error_caption",
                        innerHTML: r
                    })), o && s.appendChild(o), i.appendChild(a), this.contWrap.appendChild(i), w(this.wrapEl, "failed"), inArray(e, ["expired", "deleted", "private", "deleted-narrative", "private-narrative"]) && w(this.wrapEl, "fatal_error")
                }
            }, e.prototype._stopLoader = function() {
                var e = this;
                setTimeout(function() {
                    re(S("stories_loader", e.contWrap))
                }, 0)
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
                            e.data.author.can_follow && e._sendStatEvent("follow"), e.data.author.can_follow = !e.data.author.can_follow, k(e.followBtn, "followed", !e.data.author.can_follow), e._showMessage(y(e.data.author.can_follow ? "stories_unfollowed" : "stories_followed")).then(function() {
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
                    a = i[0];
                return {
                    width: n,
                    height: r,
                    top: i[1] - scrollGetY(),
                    left: a - scrollGetX()
                }
            }, e.prototype.markAsActive = function() {
                this.isActive = !0, w(this.wrapEl, "animate_story")
            }, e.prototype._renderReplyTo = function() {
                var e = this,
                    t = this.getCurStoryData().reply_to,
                    n = t.list,
                    r = t.photo_url,
                    o = t.name,
                    i = t.can_view_deleted,
                    a = t.is_deleted,
                    l = t.is_private,
                    u = t.raw_id,
                    c = T('<div class="stories_reply_to" style="background-image: url(' + r + ')">\n  <div class="stories_reply_to_error_msg"></div>\n  <div class="stories_reply_to_owner_name_wrap">\n    <div class="stories_reply_to_owner_name">' + o + "</div>\n  </div>\n</div>");
                if (g(c, "click", function() {
                        e.layer._sendNavigationStatEvents("open_parent_story");
                        var t = s.getPrevLayer();
                        s.getCount() > 1 && t.getStoryRaw() === u ? cancelStackPop() : showStory(n, {
                            fromEl: c,
                            source: "reply_story"
                        })
                    }), i) return c;
                var d = !1;
                return a ? (w(c, "deleted"), d = y("stories_deleted_story")) : l && (w(c, "private"), d = y("stories_private_story")), d && (val(S("stories_reply_to_error_msg", c), d), re(S("stories_reply_to_owner_name_wrap", c))), c
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
                return S("stories_answers_tt_arrow", this.wrapEl) || S("_views_button", this.wrapEl)
            }, e.prototype._destroyFeedBackTT = function() {
                var e = this._getFeedbackTTElem();
                e && e.tt && e.tt.destroy(), this._feedbackTTShown = !1, this._feedbackTTLoaded = !1
            }, e.prototype.hideFeedbackTooltip = function() {
                if (this._feedbackTTShown) {
                    var e = this._getFeedbackTTElem();
                    e && e.tt && (e.tt.hide(), this._feedbackTTShown = !1, this.autoResumeStory())
                }
            }, e.prototype.updateFeedbackTTArrow = function() {
                var e = this._getFeedbackTTElem();
                if (hasClass(e, "stories_answers_tt_arrow")) {
                    var t = S("stories_feedback_tt_arrow", this.wrapEl),
                        n = e.offsetLeft + getSize(e)[0] / 2 - getSize(t)[0] / 2 - 1;
                    setStyle(t, "left", n + "px")
                }
            }, e.prototype.showFeedbackTooltip = function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    n = this._getFeedbackTTElem();
                if (n)
                    if (this._feedbackTTShown && !0 !== t) cancelStackPop();
                    else {
                        this.pauseStory(), this._feedbackTTShown || cancelStackPush("stories_feedback_tt", function() {
                            e.hideFeedbackTooltip(!1, !0)
                        }), this._feedbackTTLoaded && (this._feedbackTTShown = !0), this.layer._sendNavigationStatEvents("open_replies_list");
                        var r = 8;
                        if (hasClass(n, "stories_answers_tt_arrow")) {
                            r = getSize(domPN(n))[0] - 39
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
                            shift: [r, 19, 0],
                            appendEl: S("stories_bottom_wrap", this.wrapEl),
                            onHide: function() {
                                e._feedbackTTShown = !1
                            },
                            onShowStart: function() {
                                e.isActive && (e._feedbackTTShown = !0, e._feedbackTTLoaded ? e._feedbackRequestEnd && (e.feedbackScroll.update(), e._feedbackTooltipInitHeaders(), tooltips.rePositionTT(n.tt), e._onFeedbackScroll(), setTimeout(function() {
                                    return tooltips.rePositionTT(n.tt)
                                }, 200)) : (S("stories_feedback_tt", e.wrapEl).appendChild(T('<div class="stories_feedback_tt_arrow"></div>')), e._feedbackTTLoaded = !0, e._feedbackRequestEnd = !1, e._feedbackTooltipHeadersInited = !1, g(S("stories_feedback_close", e.wrapEl), "click", function() {
                                    return e.showFeedbackTooltip()
                                }), setTimeout(function() {
                                    ajax.post("al_stories.php", {
                                        act: "feedback",
                                        story_raw: e.getRawId()
                                    }, {
                                        onDone: function(t, r, o, i, a) {
                                            if (e.isActive) {
                                                e.story.setViews(i), e.story.setReplies(a), e._feedbackRequestEnd = !0;
                                                var s = S("stories_feedback_content", e.wrapEl);
                                                val(s, t), e.feedbackScroll = new uiScroll(S("stories_feedback_content", e.wrapEl), {
                                                    theme: "default emoji no_transition",
                                                    onmore: function() {
                                                        return e._onMoreFeedBack()
                                                    },
                                                    onscroll: function() {
                                                        return e._onFeedbackScroll()
                                                    }
                                                }), e.feedbackScroll.scrollTop(0), w(e.feedbackScroll.container, "ui_scroll_shadow_bottom_visible"), S("ui_scroll_overflow", e.feedbackScroll.container).appendChild(ce("div", {
                                                    className: "ui_scroll_shadow_bottom"
                                                })), e.feedbackNextFrom = r, n.tt.shown && e._feedbackTooltipInitHeaders(), e.updateBottom(), e.updateFeedbackTTPos(), cur = P(cur, o), e.updateFeedbackTTArrow()
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
                    var e = S("stories_feedback_content", this.wrapEl),
                        t = S("stories_feedback_headers", this.wrapEl),
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
                this._feedbackTooltipHeadersInited && (this._feedbackTooltipHeadersInited = !1, this.feedbackHeaders = [], val(S("stories_feedback_headers", this.wrapEl), ""), this._feedbackTooltipInitHeaders())
            }, e.prototype._onFeedbackScroll = function() {
                if (this._feedbackTooltipHeadersInited)
                    for (var e = this.feedbackScroll.data.scrollTop, t = !1, n = 0, r = this.feedbackHeaders.length - 1; r >= 0; r--) {
                        var o = this.feedbackHeaders[r],
                            i = o.top,
                            a = o.height,
                            s = o.el,
                            l = i,
                            u = e;
                        t && (u -= n - (l += a));
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
                        for (var r = S("stories_feedback_views", e.wrapEl), o = ce("div", {
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
                w(this.wrapEl, "autoplay_failed")
            }, e.prototype._hideReply = function() {
                var e = this;
                showFastBox({
                    title: y("global_warning"),
                    onHide: function() {
                        e.autoResumeStory()
                    }
                }, y("stories_hide_reply_warning"), y("global_continue"), this._doHideReply.bind(this), y("global_cancel"))
            }, e.prototype._doHideReply = function() {
                var e = this;
                this.pauseStory(), w(this.wrapEl, "hiding_reply"), O().hide();
                var t = this.getIndex(),
                    n = this.data.author.gender,
                    r = T('<div class="stories_hide_reply_wrap loading">\n  <div class="stories_inline_loader">' + getProgressHtml() + '</div>\n  <div class="stories_hide_reply_cont">\n    <div class="stories_hide_reply_icon"></div>\n    <div class="stories_hide_reply_info">' + y("stories_reply_hidden") + '</div>\n    <div class="stories_hide_reply_continue_button _stories_reply_continue">' + y("stories_hide_reply_continue") + '</div>\n  </div>\n  <div class="stories_hide_reply_other_actions">\n    <div class="stories_hide_reply_other_action _stories_hide_replies">' + langSex(n, window.lang.stories_hide_all_replies) + '</div>\n    <div></div>\n    <div class="stories_hide_reply_other_action _stories_reply_ban">' + y("stories_reply_add_to_blacklist") + "</div>\n  </div>\n</div>");
                g(S("_stories_reply_restore", r), "click", this._restoreReply.bind(this)), g(S("_stories_reply_continue", r), "click", function() {
                    return e._replyHideEnd(t)
                }), g(S("_stories_hide_replies", r), "click", this._hideAllReplies.bind(this)), g(S("_stories_reply_ban", r), "click", this._ban.bind(this)), this.contWrap.appendChild(r), ajax.post("al_stories.php", {
                    act: "hide_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        e.opts.removeList(), cur.needUpdateFeedStories = !0, b(r, "loading")
                    },
                    onFail: function() {
                        e._resetReplyHide(), e.playStory()
                    }
                })
            }, e.prototype._restoreReply = function(e) {
                var t = this;
                cancelEvent(e);
                var n = S("stories_hide_reply_wrap", this.contWrap);
                ajax.post("al_stories.php", {
                    act: "restore_reply",
                    raw_id: this.getRawId(),
                    hash: this.data.reply_hide_hash
                }, {
                    onDone: function() {
                        t._resetReplyHide(), t.playStory()
                    },
                    showProgress: function() {
                        return w(n, "loading")
                    },
                    hideProgress: function() {
                        return b(n, "loading")
                    }
                })
            }, e.prototype._resetReplyHide = function() {
                re(S("stories_hide_reply_wrap", this.contWrap)), b(this.wrapEl, "hiding_reply")
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
                        O().hide(), t.opts.removeList(), t.data.items = [];
                        var e = S("_stories_hide_replies", t.contWrap);
                        val(e, y("stories_all_replies_hidden")), w(e, "disabled")
                    },
                    showProgress: v.pbind(e),
                    hideProgress: m.pbind(e)
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
                        O().hide(), t.opts.removeList(), t.data.items = [];
                        var e = S("_stories_reply_ban", t.contWrap);
                        val(e, y("stories_banned")), w(e, "disabled")
                    },
                    showProgress: v.pbind(e),
                    hideProgress: m.pbind(e)
                })
            }, e.prototype._replyHideEnd = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                S("stories_hide_reply_wrap", this.contWrap) && (this.data.items.length <= 1 && s.onReplyDeleted(this.getOwnerId()), this._resetReplyHide(), this._removeStoryFromMemoryByIndex(e || this.getIndex(), !isNumeric(e)))
            }, e.prototype._feedbackRemoveReplyFromDom = function(e) {
                var t = S("stories_feedback_content", this.wrapEl);
                if (t) {
                    var n = t.querySelector("#feed_story_" + e);
                    n && w(n, "removed")
                }
            }, e.prototype.onReplyDeleted = function(e) {
                this._feedbackRemoveReplyFromDom(e)
            }, e.prototype._updateFeedStoryPreview = function() {
                var e = C("feed_story_" + this.getOwnerId());
                if (e && !hasClass(e, "stories_feed_reply_item")) {
                    var t = this.indexToUnread(!0),
                        n = this.data.items[t];
                    n && n.small_preview && setStyle(e, "background-image", "url(" + n.small_preview + ")")
                }
            }, e.prototype._sendStatEvent = function(e) {
                var t = this.getCurStoryData();
                ajax.post("al_stories.php", P({
                    act: "stat",
                    source_story: this.getRawId()
                }, t.stats[e]))
            }, e.prototype.report = function() {
                var e = this,
                    t = this.getCurStoryData().narrative ? "narrative" : "story",
                    n = L("al_stories.php", {
                        act: "report_box",
                        type: t
                    }, {
                        onDone: function() {
                            var e = E("radiobtn", "stories_report");
                            h.stories_report = {
                                val: 0,
                                els: e
                            }
                        },
                        params: {
                            onClean: function() {
                                delete h.stories_report, e.playStory()
                            }
                        }
                    });
                n.removeButtons(), n.addButton(y("box_send"), this._sendReportButtonDidPress.bind(this)), n.addButton(y("global_cancel"), !1, "no")
            }, e.prototype._sendReportButtonDidPress = function(e) {
                var t = this,
                    n = this.index,
                    r = this.getCurStoryData(),
                    o = r.narrative,
                    i = r.report_hash,
                    a = !!o,
                    s = void 0,
                    l = void 0;
                a ? (s = o.raw_id, l = o.report_hash) : (s = this.getRawId(), l = i), ajax.post("al_stories.php", {
                    act: "report",
                    type: a ? "narrative" : "story",
                    item_raw: s,
                    reason: h.stories_report.val,
                    hash: l
                }, {
                    onDone: function() {
                        O().hide(), a ? t._popCoverAndCleanNarrativeList(o) : t._popStoryAndClearList(n), showDoneBox(y("stories_report_sent"), {
                            className: "stories_done_msg"
                        })
                    },
                    showProgress: v.pbind(e),
                    hideProgress: m.pbind(e)
                })
            }, e
        }();
    t.default = N
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(30),
        o = n(137),
        i = n(89),
        a = n(40),
        s = n(57);
    var l = window,
        u = l.getLang,
        c = l.showTooltip,
        d = l.trim,
        f = l.addEvent,
        p = l.removeEvent,
        h = l.cancelEvent,
        y = l.isObject,
        v = l.showNarrative,
        m = function(e) {
            function t(n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, n));
                return r.emojiId = !1, r.state = {
                    story: n.story,
                    sendFormHasText: !1,
                    sendFormFocused: !1,
                    linkObjectAudioPlaying: !1
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
                return r.createElement("div", {
                    className: o.classNames("stories_story_bottom", t)
                }, r.createElement(a.default, {
                    story: e
                }), r.createElement("div", {
                    className: "stories_story_bottom_controls",
                    ref: "controls"
                }, r.createElement(s.default, {
                    story: e
                }), this._renderMessageForm(), this._renderLink(), this._renderMask(), this._renderShare(), this._renderRemove(), r.createElement(i.default, {
                    story: e
                })))
            }, t.prototype._renderLink = function() {
                var e = this,
                    t = this.props.story.getCurStoryData().link;
                if (!y(t)) return "";
                var n = "stories_link";
                return t.object_type && (n += " story_link_object_" + t.object_type), this.state.linkObjectAudioPlaying && (n += " story_link_object_audio_playing"), r.createElement("div", {
                    className: "stories_link_wrap"
                }, r.createElement("a", {
                    target: "_blank",
                    className: n,
                    href: t.url,
                    title: t.text,
                    onClick: function(n) {
                        e._linkDidPress(n, t)
                    },
                    dangerouslySetInnerHTML: {
                        __html: t.text
                    }
                }))
            }, t.prototype._renderMask = function() {
                return this.props.story.getCurStoryData().mask_id ? r.createElement("div", {
                    className: "stories_button mask _mask_button",
                    onMouseOver: function(e) {
                        return c(e.target, {
                            black: 1,
                            center: 1,
                            shift: [1, 13, 0],
                            text: u("stories_mask_tooltip")
                        })
                    },
                    onClick: this._maskButtonDidPress.bind(this)
                }) : ""
            }, t.prototype._renderShare = function() {
                return !0 !== this.props.story.getCurStoryData().can_share ? "" : r.createElement("div", {
                    className: "stories_button share _share_button",
                    onMouseOver: function(e) {
                        return c(e.target, {
                            black: 1,
                            center: 1,
                            shift: [1, 13, 0],
                            text: u("stories_share")
                        })
                    },
                    onClick: this._shareButtonDidPress.bind(this)
                })
            }, t.prototype._renderRemove = function() {
                var e = this.props.story;
                return !e.getCurStoryData().can_remove || e.getOwnerId() < 0 ? "" : r.createElement("div", {
                    className: "stories_button remove _remove_button",
                    onMouseOver: function(e) {
                        return c(e.target, {
                            black: 1,
                            center: 1,
                            shift: [1, 13, 0],
                            text: u("global_delete")
                        })
                    },
                    onClick: this._removeButtonDidPress.bind(this)
                })
            }, t.prototype._canMessage = function() {
                var e = this.props.story.getCurStoryData(),
                    t = e.link,
                    n = e.can_comment;
                return !(y(t) || !n)
            }, t.prototype._renderMessageForm = function() {
                var e = this,
                    t = this.props.story;
                if (this._canMessage()) return r.createElement("div", {
                    ref: "sendForm",
                    className: "stories_send_form _emoji_field_wrap emoji_rpointer"
                }, r.createElement("div", {
                    className: "stories_send_form_text_wrap"
                }, r.createElement("div", {
                    contentEditable: !0,
                    ref: "messageInput",
                    className: "stories_send_form_text",
                    placeholder: u("stories_answer_placeholder"),
                    onFocus: this._sendFormDidFocus.bind(this),
                    onBlur: this._sendFormDidBlur.bind(this),
                    onKeyUp: function() {
                        return t._onSendFormKeyUp()
                    }
                })), r.createElement("div", {
                    className: "stories_send_form_helper"
                }, r.createElement("div", {
                    className: o.classNames("stories_send_form_buttons _emoji_wrap", {
                        shown: this.state.sendFormFocused || this.state.sendFormHasText
                    })
                }, r.createElement("div", {
                    ref: "smileButton",
                    className: "stories_send_form_button smile _emoji_btn emoji_smile",
                    onMouseEnter: function(t) {
                        Emoji.clearSizeCached(e.refs.smileButton), Emoji.show(e.refs.smileButton, t.nativeEvent)
                    },
                    onMouseLeave: function(t) {
                        return Emoji.hide(e.refs.smileButton, t.nativeEvent)
                    },
                    onMouseDown: function(e) {
                        return h(e.nativeEvent)
                    }
                }), r.createElement("div", {
                    className: o.classNames("stories_send_form_button send", {
                        active: this.state.sendFormHasText
                    }),
                    onClick: this._sendMessageButtonDidPress.bind(this)
                }))))
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
                }), f(this.refs.smileButton, "click", h), placeholderInit(this.refs.messageInput, {
                    editable: !0
                })) : this.emojiId && !this.refs.messageInput && (p(this.refs.smileButton, "click", h), Emoji.destroy(this.emojiId), delete this.emojiId)
            }, t.prototype._leftSideIsEmpty = function() {
                var e = this.props.story,
                    t = this.props.story.getCurStoryData(),
                    n = t.can_manage,
                    r = t.link,
                    o = t.can_comment,
                    i = t.narrative,
                    a = e.getReplies(),
                    s = e.getViews();
                return !(s && 0 !== parseInt(s) && !i || a.count && n || y(r) || o)
            }, t.prototype._sendFormDidFocus = function() {
                var e = this.props.story;
                this.setState({
                    sendFormFocused: !0
                }), e._onSendFormFocus(), e.layer._sendNavigationStatEvents("comment_tap")
            }, t.prototype._sendFormDidBlur = function() {
                this.props.story._onSendFormBlur(), this.setState({
                    sendFormFocused: !1
                }), this._emojiDidKeyAction()
            }, t.prototype._emojiDidKeyAction = function() {
                var e = d(Emoji.editableVal(this.refs.messageInput));
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
            }, t.prototype._linkDidPress = function(e, t) {
                if (t) {
                    var n = t.object_type,
                        r = t.object,
                        o = t.url.match(/\/narrative(-?\d+_\d+)/);
                    if (o) {
                        e.preventDefault();
                        var i = o[1];
                        i && v(i, {
                            fromEl: this.props.story.wrapEl,
                            isOpenNarrativeFromFeed: !0,
                            source: "narrative_story"
                        })
                    } else this.props.story._sendStatEvent("url_view");
                    switch (n) {
                        case "audio":
                            this.state.linkObjectAudioPlaying ? (getAudioPlayer().pause(), this.state.story.audioPlaying = !1, cur.storyLayer.resumeLayer()) : (getAudioPlayer().playAudio(r), this.state.story.audioPlaying = !0, cur.storyLayer.pauseLayer()), this.setState({
                                linkObjectAudioPlaying: !this.state.linkObjectAudioPlaying
                            }), e.preventDefault()
                    }
                }
            }, t.prototype._sendMessageButtonDidPress = function() {
                var e = this;
                this.props.story._onAnswerSend(void 0, function() {
                    return e._emojiDidKeyAction()
                })
            }, t
        }(r.Component);
    t.default = m
}, , , , function(e, t, n) {
    "use strict";

    function r(e) {
        var t = new Date;
        return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
    }

    function o(e) {
        return r(new Date(e.getTime() + 864e5))
    }

    function i(e) {
        return r(new Date(e.getTime() - 864e5))
    }

    function a(e, t) {
        var n = new Date(e),
            r = new Date(t);
        return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth() && n.getDate() === r.getDate()
    }

    function s(e) {
        return e >= 10 ? e : "0" + e
    }

    function l(e, t) {
        var n = void 0;
        e = Math.max(e, 0);
        var r = Math.floor(e % 60);
        n = r < 10 ? "0" + r : r;
        var o = (e = Math.floor(e / 60)) % 60;
        return n = o + ":" + n, ((e = Math.floor(e / 60)) > 0 || t) && (o < 10 && (n = "0" + n), n = e + ":" + n), n
    }
    n.r(t), n.d(t, "isToday", function() {
        return r
    }), n.d(t, "isYesterday", function() {
        return o
    }), n.d(t, "isTomorrow", function() {
        return i
    }), n.d(t, "isSameDate", function() {
        return a
    }), n.d(t, "leadingZero", function() {
        return s
    }), n.d(t, "formatTime", function() {
        return l
    })
}, , , , , , , , , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "STORIES_MANAGE_MODULE", function() {
        return r
    });
    var r = "stories_manage"
}, function(e, t, n) {
    "use strict";
    var r = n(70);
    e.exports = function e(t, n) {
        return !(!t || !n) && (t === n || !r(t) && (r(n) ? e(t, n.parentNode) : "contains" in t ? t.contains(n) : !!t.compareDocumentPosition && !!(16 & t.compareDocumentPosition(n))))
    }
}, , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "getLang", function() {
        return s
    });
    var r = n(186),
        o = {},
        i = window.getLang,
        a = window.langNumeric;

    function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = arguments[2],
            s = "number" == typeof t,
            l = e + (t || s ? ".raw" : "");
        if (void 0 === o[l]) {
            var u = t || s ? i(e, "raw") : i(e);
            "string" == typeof u ? o[l] = Object(r.decodeHTMLEntities)(u) : Array.isArray(u) && (o[l] = u.map(r.decodeHTMLEntities))
        }
        return s ? a(t, o[l], n) : o[l] || ""
    }
    t.default = {
        getLang: s
    }
}, , , , , , , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "MODULE", function() {
        return r
    }), n.d(t, "REPORT_CLASS", function() {
        return o
    }), n.d(t, "BAN_PERIOD_FOREVER", function() {
        return i
    }), n.d(t, "_getReportRawIdByElement", function() {
        return a
    }), n.d(t, "_getReportDecisionRawIdByElement", function() {
        return s
    });
    var r = "sf",
        o = "sf_report",
        i = 1e3;

    function a(e) {
        return gpeByClass(o, e).id.replace("report", "")
    }

    function s(e) {
        var t = gpeByClass(o, e),
            n = geByClass1("decision_result", t);
        return domData(n, "decision_raw_id")
    }
}, , function(e, t, n) {
    "use strict";
    var r = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
    e.exports = function() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                    return t[e]
                }).join("")) return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                r[e] = e
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (e) {
            return !1
        }
    }() ? Object.assign : function(e, t) {
        for (var n, a, s = function(e) {
                if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }(e), l = 1; l < arguments.length; l++) {
            for (var u in n = Object(arguments[l])) o.call(n, u) && (s[u] = n[u]);
            if (r) {
                a = r(n);
                for (var c = 0; c < a.length; c++) i.call(n, a[c]) && (s[a[c]] = n[a[c]])
            }
        }
        return s
    }
}, function(e, t, n) {
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
    n.r(t), n.d(t, "MODULE", function() {
        return r
    });
    var r = "user_personal_card"
}, , function(e, t, n) {
    "use strict";
    var r = n(62),
        o = n(3),
        i = n(58),
        a = n(125),
        s = "function" == typeof Symbol && Symbol.for,
        l = s ? Symbol.for("react.element") : 60103,
        u = s ? Symbol.for("react.portal") : 60106,
        c = s ? Symbol.for("react.fragment") : 60107,
        d = s ? Symbol.for("react.strict_mode") : 60108,
        f = s ? Symbol.for("react.profiler") : 60114,
        p = s ? Symbol.for("react.provider") : 60109,
        h = s ? Symbol.for("react.context") : 60110,
        y = s ? Symbol.for("react.async_mode") : 60111,
        v = s ? Symbol.for("react.forward_ref") : 60112;
    s && Symbol.for("react.timeout");
    var m = "function" == typeof Symbol && Symbol.iterator;

    function _(e) {
        for (var t = arguments.length - 1, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 0; r < t; r++) n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        o(!1, "Minified React error #" + e + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", n)
    }
    var g = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    };

    function w(e, t, n) {
        this.props = e, this.context = t, this.refs = i, this.updater = n || g
    }

    function b() {}

    function k(e, t, n) {
        this.props = e, this.context = t, this.refs = i, this.updater = n || g
    }
    w.prototype.isReactComponent = {}, w.prototype.setState = function(e, t) {
        "object" != typeof e && "function" != typeof e && null != e && _("85"), this.updater.enqueueSetState(this, e, t, "setState")
    }, w.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    }, b.prototype = w.prototype;
    var S = k.prototype = new b;
    S.constructor = k, r(S, w.prototype), S.isPureReactComponent = !0;
    var E = {
            current: null
        },
        C = Object.prototype.hasOwnProperty,
        T = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        };

    function x(e, t, n) {
        var r = void 0,
            o = {},
            i = null,
            a = null;
        if (null != t)
            for (r in void 0 !== t.ref && (a = t.ref), void 0 !== t.key && (i = "" + t.key), t) C.call(t, r) && !T.hasOwnProperty(r) && (o[r] = t[r]);
        var s = arguments.length - 2;
        if (1 === s) o.children = n;
        else if (1 < s) {
            for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
            o.children = u
        }
        if (e && e.defaultProps)
            for (r in s = e.defaultProps) void 0 === o[r] && (o[r] = s[r]);
        return {
            $$typeof: l,
            type: e,
            key: i,
            ref: a,
            props: o,
            _owner: E.current
        }
    }

    function O(e) {
        return "object" == typeof e && null !== e && e.$$typeof === l
    }
    var L = /\/+/g,
        P = [];

    function N(e, t, n, r) {
        if (P.length) {
            var o = P.pop();
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

    function j(e) {
        e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > P.length && P.push(e)
    }

    function R(e, t, n, r) {
        var o = typeof e;
        "undefined" !== o && "boolean" !== o || (e = null);
        var i = !1;
        if (null === e) i = !0;
        else switch (o) {
            case "string":
            case "number":
                i = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case l:
                    case u:
                        i = !0
                }
        }
        if (i) return n(r, e, "" === t ? "." + D(e, 0) : t), 1;
        if (i = 0, t = "" === t ? "." : t + ":", Array.isArray(e))
            for (var a = 0; a < e.length; a++) {
                var s = t + D(o = e[a], a);
                i += R(o, s, n, r)
            } else if (null === e || void 0 === e ? s = null : s = "function" == typeof(s = m && e[m] || e["@@iterator"]) ? s : null, "function" == typeof s)
                for (e = s.call(e), a = 0; !(o = e.next()).done;) i += R(o = o.value, s = t + D(o, a++), n, r);
            else "object" === o && _("31", "[object Object]" === (n = "" + e) ? "object with keys {" + Object.keys(e).join(", ") + "}" : n, "");
        return i
    }

    function D(e, t) {
        return "object" == typeof e && null !== e && null != e.key ? function(e) {
            var t = {
                "=": "=0",
                ":": "=2"
            };
            return "$" + ("" + e).replace(/[=:]/g, function(e) {
                return t[e]
            })
        }(e.key) : t.toString(36)
    }

    function I(e, t) {
        e.func.call(e.context, t, e.count++)
    }

    function A(e, t, n) {
        var r = e.result,
            o = e.keyPrefix;
        e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? F(e, r, n, a.thatReturnsArgument) : null != e && (O(e) && (t = o + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(L, "$&/") + "/") + n, e = {
            $$typeof: l,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        }), r.push(e))
    }

    function F(e, t, n, r, o) {
        var i = "";
        null != n && (i = ("" + n).replace(L, "$&/") + "/"), t = N(t, i, r, o), null == e || R(e, "", A, t), j(t)
    }
    var M = {
            Children: {
                map: function(e, t, n) {
                    if (null == e) return e;
                    var r = [];
                    return F(e, r, null, t, n), r
                },
                forEach: function(e, t, n) {
                    if (null == e) return e;
                    t = N(null, null, t, n), null == e || R(e, "", I, t), j(t)
                },
                count: function(e) {
                    return null == e ? 0 : R(e, "", a.thatReturnsNull, null)
                },
                toArray: function(e) {
                    var t = [];
                    return F(e, t, null, a.thatReturnsArgument), t
                },
                only: function(e) {
                    return O(e) || _("143"), e
                }
            },
            createRef: function() {
                return {
                    current: null
                }
            },
            Component: w,
            PureComponent: k,
            createContext: function(e, t) {
                return void 0 === t && (t = null), (e = {
                    $$typeof: h,
                    _calculateChangedBits: t,
                    _defaultValue: e,
                    _currentValue: e,
                    _currentValue2: e,
                    _changedBits: 0,
                    _changedBits2: 0,
                    Provider: null,
                    Consumer: null
                }).Provider = {
                    $$typeof: p,
                    _context: e
                }, e.Consumer = e
            },
            forwardRef: function(e) {
                return {
                    $$typeof: v,
                    render: e
                }
            },
            Fragment: c,
            StrictMode: d,
            unstable_AsyncMode: y,
            unstable_Profiler: f,
            createElement: x,
            cloneElement: function(e, t, n) {
                (null === e || void 0 === e) && _("267", e);
                var o = void 0,
                    i = r({}, e.props),
                    a = e.key,
                    s = e.ref,
                    u = e._owner;
                if (null != t) {
                    void 0 !== t.ref && (s = t.ref, u = E.current), void 0 !== t.key && (a = "" + t.key);
                    var c = void 0;
                    for (o in e.type && e.type.defaultProps && (c = e.type.defaultProps), t) C.call(t, o) && !T.hasOwnProperty(o) && (i[o] = void 0 === t[o] && void 0 !== c ? c[o] : t[o])
                }
                if (1 === (o = arguments.length - 2)) i.children = n;
                else if (1 < o) {
                    c = Array(o);
                    for (var d = 0; d < o; d++) c[d] = arguments[d + 2];
                    i.children = c
                }
                return {
                    $$typeof: l,
                    type: e.type,
                    key: a,
                    ref: s,
                    props: i,
                    _owner: u
                }
            },
            createFactory: function(e) {
                var t = x.bind(null, e);
                return t.type = e, t
            },
            isValidElement: O,
            version: "16.4.0",
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: E,
                assign: r
            }
        },
        B = {
            default: M
        },
        U = B && M || B;
    e.exports = U.default ? U.default : U
}, , , , , , , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "getVolume", function() {
        return o
    }), n.d(t, "setVolume", function() {
        return i
    }), n.d(t, "classNames", function() {
        return a
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function o() {
        var e = ls.get("video_volume");
        return "number" == typeof e ? Math.min(1, Math.max(0, e)) : 1
    }

    function i(e) {
        ls.set("video_volume", e)
    }

    function a() {
        var e = [];
        return [].concat(Array.prototype.slice.call(arguments)).forEach(function(t) {
            if (t) switch (void 0 === t ? "undefined" : r(t)) {
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
}, , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "MODULE", function() {
        return r
    });
    var r = "group_personal_card"
}, , , , , , , , , , , , , , , , function(e, t, n) {
    "use strict";
    var r = Object.prototype.hasOwnProperty;

    function o(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t
    }
    e.exports = function(e, t) {
        if (o(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var n = Object.keys(e),
            i = Object.keys(t);
        if (n.length !== i.length) return !1;
        for (var a = 0; a < n.length; a++)
            if (!r.call(t, n[a]) || !o(e[n[a]], t[n[a]])) return !1;
        return !0
    }
}, , , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "addLayer", function() {
        return o
    }), n.d(t, "removeLayer", function() {
        return i
    }), n.d(t, "layerShown", function() {
        return a
    }), n.d(t, "layerHide", function() {
        return s
    }), n.d(t, "hideAllLayers", function() {
        return l
    }), n.d(t, "getCount", function() {
        return u
    }), n.d(t, "back", function() {
        return c
    }), n.d(t, "getFirstLayer", function() {
        return d
    }), n.d(t, "getPrevLayer", function() {
        return f
    }), n.d(t, "slicePrevLayers", function() {
        return p
    }), n.d(t, "onReplyDeleted", function() {
        return h
    });
    var r = [];

    function o(e, t) {
        var n = arguments;
        cur.storyLayer && cur.storyLayer.pauseLayer(), cur.storyLayer = e, ge("stories_layers_background") || (bodyNode.appendChild(ce("div", {
            id: "stories_layers_background",
            className: "stories_layers_background"
        })), layerQueue.hide(), layerQueue.push(), layers.fullhide = l, addEvent(window, "visibilitychange", y.visibilitychange, void 0, void 0, !0), addEvent(window, "resize", y.resize), addEvent(document, "keydown", y.keydown), addEvent(document, "keyup", y.keyup)), e.animateStory("expand", t.fromEl), r.push(e), e.length > 1 && addClass(e.layerEl, "no_fill_bg"), addClass(bodyNode, "stories_layer_shown"), cancelStackPush("stories_layer_close" + r.length, function(t) {
            var o = n[0] && n[0].isCloseBtnClick;
            r.length > 1 && !o ? e.back(!0) : (e.hideAllLayers = o, e.hide(!1, !0))
        })
    }

    function i() {
        r.pop(), cur.storyLayer = r[r.length - 1], cur.storyLayer ? cur.storyLayer.resumeLayer() : (layerQueue.hide(), layerQueue.clear())
    }

    function a() {
        r.length > 1 && (r[r.length - 2].setLayerVisibility(!1), r[r.length - 1].showBackButton())
    }

    function s() {
        r.length > 1 ? r[r.length - 2].setLayerVisibility(!0) : setStyle("stories_layers_background", "opacity", 0)
    }

    function l(e) {
        for (var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = 0; n < r.length; n++) r[n].hide(!0);
        if (layers.fullhide = !1, removeClass(bodyNode, "stories_layer_shown"), re("stories_layers_background"), removeEvent(window, "visibilitychange", y.visibilitychange), removeEvent(window, "resize", y.resize), removeEvent(document, "keydown", y.keydown), removeEvent(document, "keyup", y.keyup), t) {
            var o = nav.objLoc;
            delete o.w, nav.setLoc(o)
        }
        cur.needUpdateFeedStories && Stories.updateFeedStories(), r = []
    }

    function u() {
        return r.length
    }

    function c() {
        cur.storyLayer && cur.storyLayer.back()
    }

    function d() {
        return r[0]
    }

    function f() {
        return r[r.length - 2]
    }

    function p() {
        for (var e = r.length - 2; e >= 0; e--) r[e].doHide(!0);
        r.splice(0, r.length - 1)
    }

    function h(e) {
        for (var t = 0; t < r.length; t++) r[t].onReplyDeleted(e)
    }
    var y = {
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
}, , , , , , , , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = function() {
        function e(t, n) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.data = t, this.opts = n, this.paused = !0, this.loaded = !1;
            var r = t.is_expired,
                o = t.is_deleted,
                i = t.can_view_deleted,
                a = t.is_private,
                s = t.narrative;
            i || (r ? this._error("expired") : o ? s ? this._error("deleted-narrative") : this._error("deleted") : a && (s ? this._error("private-narrative") : this._error("private")), (r || o || a) && (this.failed = !0))
        }
        return e.prototype.render = function() {
            var e = this;
            this._isFailed() && this.isNarrativeMetaStory || (this.longLoadingTimer = setTimeout(function() {
                e.isLoaded() || e.opts.onLongLoading()
            }, 1e3), this.opts.onLoadingStart())
        }, e.prototype.renderNarrativeCover = function() {
            var e = this.data.narrative,
                t = e.views ? winToUtf(" · " + e.views) : "";
            return '\n      <div class="stories_narrative_cover__inner">\n        <div class="stories_narrative_cover_photo" style="background-image: url(' + this.data.photo_url + ')"></div>\n        <div class="stories_narrative_cover__info">\n          <span class="stories_narrative_cover__label">' + getLang("global_type_narrative") + '</span>\n          <span class="stories_narrative_cover__views">' + t + '</span>\n        </div>\n        <div class="stories_narrative_cover__title">' + e.title + '</div>\n        <div class="stories_narrative_cover__author">' + e.owner_name + "</div>\n      </div>\n    "
        }, e.prototype.renderNarrativeMetaStory = function() {
            var e = !(!cur.storyLayer || !cur.storyLayer.isOpenNarrativeFromFeed),
                t = '\n      <div class="narrative_meta_story_button">\n        <div class="narrative_meta_story_circle narrative_meta_story_circle_replay" onclick="cur.storyLayer._sendNavigationStatEvents(\'narrative_replay\'); return cur.storyLayer.changeStory(0)"></div>\n        <div class="narrative_meta_story_button_text">' + getLang("stories_narrative_repeat_bottom") + "</div>\n      </div>\n    ",
                n = e ? '\n      <div class="narrative_meta_story_button">\n        <div class="narrative_meta_story_circle narrative_meta_story_circle_back" onclick="cur.storyLayer._sendNavigationStatEvents(\'narrative_go_to_stories\'); return cur.storyLayer.nextStory();"></div>\n        <div class="narrative_meta_story_button_text">' + getLang("stories_narrative_back_bottom") + "</div>\n      </div>\n    " : "";
            return ce("div", {
                className: "narrative_meta_story",
                innerHTML: '<div class="narrative_meta_story_buttons">' + (t + n) + "</div>"
            })
        }, e.prototype.getContainer = function() {}, e.prototype.play = function() {
            this.paused = !1, this.isLoaded() && this.opts.onPlay()
        }, e.prototype.pause = function() {
            this.paused = !0, this.opts.onPause()
        }, e.prototype.setCurrentTime = function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
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
    t.default = r
}, , , function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(30),
        i = n(59),
        a = n(124),
        s = n(125),
        l = n(91),
        u = n(155),
        c = n(111),
        d = n(58);

    function f(e) {
        for (var t = arguments.length - 1, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, o = 0; o < t; o++) n += "&args[]=" + encodeURIComponent(arguments[o + 1]);
        r(!1, "Minified React error #" + e + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", n)
    }
    o || f("227");
    var p = {
        _caughtError: null,
        _hasCaughtError: !1,
        _rethrowError: null,
        _hasRethrowError: !1,
        invokeGuardedCallback: function(e, t, n, r, o, i, a, s, l) {
            (function(e, t, n, r, o, i, a, s, l) {
                this._hasCaughtError = !1, this._caughtError = null;
                var u = Array.prototype.slice.call(arguments, 3);
                try {
                    t.apply(n, u)
                } catch (e) {
                    this._caughtError = e, this._hasCaughtError = !0
                }
            }).apply(p, arguments)
        },
        invokeGuardedCallbackAndCatchFirstError: function(e, t, n, r, o, i, a, s, l) {
            if (p.invokeGuardedCallback.apply(this, arguments), p.hasCaughtError()) {
                var u = p.clearCaughtError();
                p._hasRethrowError || (p._hasRethrowError = !0, p._rethrowError = u)
            }
        },
        rethrowCaughtError: function() {
            return function() {
                if (p._hasRethrowError) {
                    var e = p._rethrowError;
                    throw p._rethrowError = null, p._hasRethrowError = !1, e
                }
            }.apply(p, arguments)
        },
        hasCaughtError: function() {
            return p._hasCaughtError
        },
        clearCaughtError: function() {
            if (p._hasCaughtError) {
                var e = p._caughtError;
                return p._caughtError = null, p._hasCaughtError = !1, e
            }
            f("198")
        }
    };
    var h = null,
        y = {};

    function v() {
        if (h)
            for (var e in y) {
                var t = y[e],
                    n = h.indexOf(e);
                if (-1 < n || f("96", e), !_[n])
                    for (var r in t.extractEvents || f("97", e), _[n] = t, n = t.eventTypes) {
                        var o = void 0,
                            i = n[r],
                            a = t,
                            s = r;
                        g.hasOwnProperty(s) && f("99", s), g[s] = i;
                        var l = i.phasedRegistrationNames;
                        if (l) {
                            for (o in l) l.hasOwnProperty(o) && m(l[o], a, s);
                            o = !0
                        } else i.registrationName ? (m(i.registrationName, a, s), o = !0) : o = !1;
                        o || f("98", r, e)
                    }
            }
    }

    function m(e, t, n) {
        w[e] && f("100", e), w[e] = t, b[e] = t.eventTypes[n].dependencies
    }
    var _ = [],
        g = {},
        w = {},
        b = {};

    function k(e) {
        h && f("101"), h = Array.prototype.slice.call(e), v()
    }

    function S(e) {
        var t, n = !1;
        for (t in e)
            if (e.hasOwnProperty(t)) {
                var r = e[t];
                y.hasOwnProperty(t) && y[t] === r || (y[t] && f("102", t), y[t] = r, n = !0)
            }
        n && v()
    }
    var E = {
            plugins: _,
            eventNameDispatchConfigs: g,
            registrationNameModules: w,
            registrationNameDependencies: b,
            possibleRegistrationNames: null,
            injectEventPluginOrder: k,
            injectEventPluginsByName: S
        },
        C = null,
        T = null,
        x = null;

    function O(e, t, n, r) {
        t = e.type || "unknown-event", e.currentTarget = x(r), p.invokeGuardedCallbackAndCatchFirstError(t, n, void 0, e), e.currentTarget = null
    }

    function L(e, t) {
        return null == t && f("30"), null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t]
    }

    function P(e, t, n) {
        Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e)
    }
    var N = null;

    function j(e, t) {
        if (e) {
            var n = e._dispatchListeners,
                r = e._dispatchInstances;
            if (Array.isArray(n))
                for (var o = 0; o < n.length && !e.isPropagationStopped(); o++) O(e, t, n[o], r[o]);
            else n && O(e, t, n, r);
            e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e)
        }
    }

    function R(e) {
        return j(e, !0)
    }

    function D(e) {
        return j(e, !1)
    }
    var I = {
        injectEventPluginOrder: k,
        injectEventPluginsByName: S
    };

    function A(e, t) {
        var n = e.stateNode;
        if (!n) return null;
        var r = C(n);
        if (!r) return null;
        n = r[t];
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
                (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !r;
                break e;
            default:
                e = !1
        }
        return e ? null : (n && "function" != typeof n && f("231", t, typeof n), n)
    }

    function F(e, t) {
        null !== e && (N = L(N, e)), e = N, N = null, e && (P(e, t ? R : D), N && f("95"), p.rethrowCaughtError())
    }

    function M(e, t, n, r) {
        for (var o = null, i = 0; i < _.length; i++) {
            var a = _[i];
            a && (a = a.extractEvents(e, t, n, r)) && (o = L(o, a))
        }
        F(o, !1)
    }
    var B = {
            injection: I,
            getListener: A,
            runEventsInBatch: F,
            runExtractedEventsInBatch: M
        },
        U = Math.random().toString(36).slice(2),
        H = "__reactInternalInstance$" + U,
        z = "__reactEventHandlers$" + U;

    function W(e) {
        if (e[H]) return e[H];
        for (; !e[H];) {
            if (!e.parentNode) return null;
            e = e.parentNode
        }
        return 5 === (e = e[H]).tag || 6 === e.tag ? e : null
    }

    function V(e) {
        if (5 === e.tag || 6 === e.tag) return e.stateNode;
        f("33")
    }

    function K(e) {
        return e[z] || null
    }
    var Y = {
        precacheFiberNode: function(e, t) {
            t[H] = e
        },
        getClosestInstanceFromNode: W,
        getInstanceFromNode: function(e) {
            return !(e = e[H]) || 5 !== e.tag && 6 !== e.tag ? null : e
        },
        getNodeFromInstance: V,
        getFiberCurrentPropsFromNode: K,
        updateFiberProps: function(e, t) {
            e[z] = t
        }
    };

    function $(e) {
        do {
            e = e.return
        } while (e && 5 !== e.tag);
        return e || null
    }

    function X(e, t, n) {
        for (var r = []; e;) r.push(e), e = $(e);
        for (e = r.length; 0 < e--;) t(r[e], "captured", n);
        for (e = 0; e < r.length; e++) t(r[e], "bubbled", n)
    }

    function q(e, t, n) {
        (t = A(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = L(n._dispatchListeners, t), n._dispatchInstances = L(n._dispatchInstances, e))
    }

    function Q(e) {
        e && e.dispatchConfig.phasedRegistrationNames && X(e._targetInst, q, e)
    }

    function G(e) {
        if (e && e.dispatchConfig.phasedRegistrationNames) {
            var t = e._targetInst;
            X(t = t ? $(t) : null, q, e)
        }
    }

    function Z(e, t, n) {
        e && n && n.dispatchConfig.registrationName && (t = A(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = L(n._dispatchListeners, t), n._dispatchInstances = L(n._dispatchInstances, e))
    }

    function J(e) {
        e && e.dispatchConfig.registrationName && Z(e._targetInst, null, e)
    }

    function ee(e) {
        P(e, Q)
    }

    function te(e, t, n, r) {
        if (n && r) e: {
            for (var o = n, i = r, a = 0, s = o; s; s = $(s)) a++;s = 0;
            for (var l = i; l; l = $(l)) s++;
            for (; 0 < a - s;) o = $(o),
            a--;
            for (; 0 < s - a;) i = $(i),
            s--;
            for (; a--;) {
                if (o === i || o === i.alternate) break e;
                o = $(o), i = $(i)
            }
            o = null
        }
        else o = null;
        for (i = o, o = []; n && n !== i && (null === (a = n.alternate) || a !== i);) o.push(n), n = $(n);
        for (n = []; r && r !== i && (null === (a = r.alternate) || a !== i);) n.push(r), r = $(r);
        for (r = 0; r < o.length; r++) Z(o[r], "bubbled", e);
        for (e = n.length; 0 < e--;) Z(n[e], "captured", t)
    }
    var ne = {
        accumulateTwoPhaseDispatches: ee,
        accumulateTwoPhaseDispatchesSkipTarget: function(e) {
            P(e, G)
        },
        accumulateEnterLeaveDispatches: te,
        accumulateDirectDispatches: function(e) {
            P(e, J)
        }
    };

    function re(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n
    }
    var oe = {
            animationend: re("Animation", "AnimationEnd"),
            animationiteration: re("Animation", "AnimationIteration"),
            animationstart: re("Animation", "AnimationStart"),
            transitionend: re("Transition", "TransitionEnd")
        },
        ie = {},
        ae = {};

    function se(e) {
        if (ie[e]) return ie[e];
        if (!oe[e]) return e;
        var t, n = oe[e];
        for (t in n)
            if (n.hasOwnProperty(t) && t in ae) return ie[e] = n[t];
        return e
    }
    i.canUseDOM && (ae = document.createElement("div").style, "AnimationEvent" in window || (delete oe.animationend.animation, delete oe.animationiteration.animation, delete oe.animationstart.animation), "TransitionEvent" in window || delete oe.transitionend.transition);
    var le = se("animationend"),
        ue = se("animationiteration"),
        ce = se("animationstart"),
        de = se("transitionend"),
        fe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
        pe = null;

    function he() {
        return !pe && i.canUseDOM && (pe = "textContent" in document.documentElement ? "textContent" : "innerText"), pe
    }
    var ye = {
        _root: null,
        _startText: null,
        _fallbackText: null
    };

    function ve() {
        if (ye._fallbackText) return ye._fallbackText;
        var e, t, n = ye._startText,
            r = n.length,
            o = me(),
            i = o.length;
        for (e = 0; e < r && n[e] === o[e]; e++);
        var a = r - e;
        for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
        return ye._fallbackText = o.slice(e, 1 < t ? 1 - t : void 0), ye._fallbackText
    }

    function me() {
        return "value" in ye._root ? ye._root.value : ye._root[he()]
    }
    var _e = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
        ge = {
            type: null,
            target: null,
            currentTarget: s.thatReturnsNull,
            eventPhase: null,
            bubbles: null,
            cancelable: null,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: null,
            isTrusted: null
        };

    function we(e, t, n, r) {
        for (var o in this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface) e.hasOwnProperty(o) && ((t = e[o]) ? this[o] = t(n) : "target" === o ? this.target = r : this[o] = n[o]);
        return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? s.thatReturnsTrue : s.thatReturnsFalse, this.isPropagationStopped = s.thatReturnsFalse, this
    }

    function be(e, t, n, r) {
        if (this.eventPool.length) {
            var o = this.eventPool.pop();
            return this.call(o, e, t, n, r), o
        }
        return new this(e, t, n, r)
    }

    function ke(e) {
        e instanceof this || f("223"), e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e)
    }

    function Se(e) {
        e.eventPool = [], e.getPooled = be, e.release = ke
    }
    a(we.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = s.thatReturnsTrue)
        },
        stopPropagation: function() {
            var e = this.nativeEvent;
            e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = s.thatReturnsTrue)
        },
        persist: function() {
            this.isPersistent = s.thatReturnsTrue
        },
        isPersistent: s.thatReturnsFalse,
        destructor: function() {
            var e, t = this.constructor.Interface;
            for (e in t) this[e] = null;
            for (t = 0; t < _e.length; t++) this[_e[t]] = null
        }
    }), we.Interface = ge, we.extend = function(e) {
        function t() {}

        function n() {
            return r.apply(this, arguments)
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t;
        return a(o, n.prototype), n.prototype = o, n.prototype.constructor = n, n.Interface = a({}, r.Interface, e), n.extend = r.extend, Se(n), n
    }, Se(we);
    var Ee = we.extend({
            data: null
        }),
        Ce = we.extend({
            data: null
        }),
        Te = [9, 13, 27, 32],
        xe = i.canUseDOM && "CompositionEvent" in window,
        Oe = null;
    i.canUseDOM && "documentMode" in document && (Oe = document.documentMode);
    var Le = i.canUseDOM && "TextEvent" in window && !Oe,
        Pe = i.canUseDOM && (!xe || Oe && 8 < Oe && 11 >= Oe),
        Ne = String.fromCharCode(32),
        je = {
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
        Re = !1;

    function De(e, t) {
        switch (e) {
            case "keyup":
                return -1 !== Te.indexOf(t.keyCode);
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

    function Ie(e) {
        return "object" == typeof(e = e.detail) && "data" in e ? e.data : null
    }
    var Ae = !1;
    var Fe = {
            eventTypes: je,
            extractEvents: function(e, t, n, r) {
                var o = void 0,
                    i = void 0;
                if (xe) e: {
                    switch (e) {
                        case "compositionstart":
                            o = je.compositionStart;
                            break e;
                        case "compositionend":
                            o = je.compositionEnd;
                            break e;
                        case "compositionupdate":
                            o = je.compositionUpdate;
                            break e
                    }
                    o = void 0
                }
                else Ae ? De(e, n) && (o = je.compositionEnd) : "keydown" === e && 229 === n.keyCode && (o = je.compositionStart);
                return o ? (Pe && (Ae || o !== je.compositionStart ? o === je.compositionEnd && Ae && (i = ve()) : (ye._root = r, ye._startText = me(), Ae = !0)), o = Ee.getPooled(o, t, n, r), i ? o.data = i : null !== (i = Ie(n)) && (o.data = i), ee(o), i = o) : i = null, (e = Le ? function(e, t) {
                    switch (e) {
                        case "compositionend":
                            return Ie(t);
                        case "keypress":
                            return 32 !== t.which ? null : (Re = !0, Ne);
                        case "textInput":
                            return (e = t.data) === Ne && Re ? null : e;
                        default:
                            return null
                    }
                }(e, n) : function(e, t) {
                    if (Ae) return "compositionend" === e || !xe && De(e, t) ? (e = ve(), ye._root = null, ye._startText = null, ye._fallbackText = null, Ae = !1, e) : null;
                    switch (e) {
                        case "paste":
                            return null;
                        case "keypress":
                            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                                if (t.char && 1 < t.char.length) return t.char;
                                if (t.which) return String.fromCharCode(t.which)
                            }
                            return null;
                        case "compositionend":
                            return Pe ? null : t.data;
                        default:
                            return null
                    }
                }(e, n)) ? ((t = Ce.getPooled(je.beforeInput, t, n, r)).data = e, ee(t)) : t = null, null === i ? t : null === t ? i : [i, t]
            }
        },
        Me = null,
        Be = {
            injectFiberControlledHostComponent: function(e) {
                Me = e
            }
        },
        Ue = null,
        He = null;

    function ze(e) {
        if (e = T(e)) {
            Me && "function" == typeof Me.restoreControlledState || f("194");
            var t = C(e.stateNode);
            Me.restoreControlledState(e.stateNode, e.type, t)
        }
    }

    function We(e) {
        Ue ? He ? He.push(e) : He = [e] : Ue = e
    }

    function Ve() {
        return null !== Ue || null !== He
    }

    function Ke() {
        if (Ue) {
            var e = Ue,
                t = He;
            if (He = Ue = null, ze(e), t)
                for (e = 0; e < t.length; e++) ze(t[e])
        }
    }
    var Ye = {
        injection: Be,
        enqueueStateRestore: We,
        needsStateRestore: Ve,
        restoreStateIfNeeded: Ke
    };

    function $e(e, t) {
        return e(t)
    }

    function Xe(e, t, n) {
        return e(t, n)
    }

    function qe() {}
    var Qe = !1;

    function Ge(e, t) {
        if (Qe) return e(t);
        Qe = !0;
        try {
            return $e(e, t)
        } finally {
            Qe = !1, Ve() && (qe(), Ke())
        }
    }
    var Ze = {
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

    function Je(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return "input" === t ? !!Ze[e.type] : "textarea" === t
    }

    function et(e) {
        return (e = e.target || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
    }

    function tt(e, t) {
        return !(!i.canUseDOM || t && !("addEventListener" in document)) && ((t = (e = "on" + e) in document) || ((t = document.createElement("div")).setAttribute(e, "return;"), t = "function" == typeof t[e]), t)
    }

    function nt(e) {
        var t = e.type;
        return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
    }

    function rt(e) {
        e._valueTracker || (e._valueTracker = function(e) {
            var t = nt(e) ? "checked" : "value",
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = "" + e[t];
            if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
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
        }(e))
    }

    function ot(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
            r = "";
        return e && (r = nt(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0)
    }
    var it = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        at = "function" == typeof Symbol && Symbol.for,
        st = at ? Symbol.for("react.element") : 60103,
        lt = at ? Symbol.for("react.portal") : 60106,
        ut = at ? Symbol.for("react.fragment") : 60107,
        ct = at ? Symbol.for("react.strict_mode") : 60108,
        dt = at ? Symbol.for("react.profiler") : 60114,
        ft = at ? Symbol.for("react.provider") : 60109,
        pt = at ? Symbol.for("react.context") : 60110,
        ht = at ? Symbol.for("react.async_mode") : 60111,
        yt = at ? Symbol.for("react.forward_ref") : 60112,
        vt = at ? Symbol.for("react.timeout") : 60113,
        mt = "function" == typeof Symbol && Symbol.iterator;

    function _t(e) {
        return null === e || void 0 === e ? null : "function" == typeof(e = mt && e[mt] || e["@@iterator"]) ? e : null
    }

    function gt(e) {
        var t = e.type;
        if ("function" == typeof t) return t.displayName || t.name;
        if ("string" == typeof t) return t;
        switch (t) {
            case ht:
                return "AsyncMode";
            case pt:
                return "Context.Consumer";
            case ut:
                return "ReactFragment";
            case lt:
                return "ReactPortal";
            case dt:
                return "Profiler(" + e.pendingProps.id + ")";
            case ft:
                return "Context.Provider";
            case ct:
                return "StrictMode";
            case vt:
                return "Timeout"
        }
        if ("object" == typeof t && null !== t) switch (t.$$typeof) {
            case yt:
                return "" !== (e = t.render.displayName || t.render.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"
        }
        return null
    }

    function wt(e) {
        var t = "";
        do {
            e: switch (e.tag) {
                case 0:
                case 1:
                case 2:
                case 5:
                    var n = e._debugOwner,
                        r = e._debugSource,
                        o = gt(e),
                        i = null;
                    n && (i = gt(n)), n = r, o = "\n    in " + (o || "Unknown") + (n ? " (at " + n.fileName.replace(/^.*[\\\/]/, "") + ":" + n.lineNumber + ")" : i ? " (created by " + i + ")" : "");
                    break e;
                default:
                    o = ""
            }
            t += o,
            e = e.return
        } while (e);
        return t
    }
    var bt = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        kt = {},
        St = {};

    function Et(e, t, n, r, o) {
        this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t
    }
    var Ct = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
        Ct[e] = new Et(e, 0, !1, e, null)
    }), [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"]
    ].forEach(function(e) {
        var t = e[0];
        Ct[t] = new Et(t, 1, !1, e[1], null)
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
        Ct[e] = new Et(e, 2, !1, e.toLowerCase(), null)
    }), ["autoReverse", "externalResourcesRequired", "preserveAlpha"].forEach(function(e) {
        Ct[e] = new Et(e, 2, !1, e, null)
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
        Ct[e] = new Et(e, 3, !1, e.toLowerCase(), null)
    }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
        Ct[e] = new Et(e, 3, !0, e.toLowerCase(), null)
    }), ["capture", "download"].forEach(function(e) {
        Ct[e] = new Et(e, 4, !1, e.toLowerCase(), null)
    }), ["cols", "rows", "size", "span"].forEach(function(e) {
        Ct[e] = new Et(e, 6, !1, e.toLowerCase(), null)
    }), ["rowSpan", "start"].forEach(function(e) {
        Ct[e] = new Et(e, 5, !1, e.toLowerCase(), null)
    });
    var Tt = /[\-:]([a-z])/g;

    function xt(e) {
        return e[1].toUpperCase()
    }

    function Ot(e, t, n, r) {
        var o = Ct.hasOwnProperty(t) ? Ct[t] : null;
        (null !== o ? 0 === o.type : !r && (2 < t.length && ("o" === t[0] || "O" === t[0]) && ("n" === t[1] || "N" === t[1]))) || (function(e, t, n, r) {
            if (null === t || void 0 === t || function(e, t, n, r) {
                    if (null !== n && 0 === n.type) return !1;
                    switch (typeof t) {
                        case "function":
                        case "symbol":
                            return !0;
                        case "boolean":
                            return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
                        default:
                            return !1
                    }
                }(e, t, n, r)) return !0;
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
        }(t, n, o, r) && (n = null), r || null === o ? function(e) {
            return !!St.hasOwnProperty(e) || !kt.hasOwnProperty(e) && (bt.test(e) ? St[e] = !0 : (kt[e] = !0, !1))
        }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = null === n ? 3 !== o.type && "" : n : (t = o.attributeName, r = o.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (o = o.type) || 4 === o && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
    }

    function Lt(e, t) {
        var n = t.checked;
        return a({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked
        })
    }

    function Pt(e, t) {
        var n = null == t.defaultValue ? "" : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
        n = It(null != t.value ? t.value : n), e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
        }
    }

    function Nt(e, t) {
        null != (t = t.checked) && Ot(e, "checked", t, !1)
    }

    function jt(e, t) {
        Nt(e, t);
        var n = It(t.value);
        null != n && ("number" === t.type ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n)), t.hasOwnProperty("value") ? Dt(e, t.type, n) : t.hasOwnProperty("defaultValue") && Dt(e, t.type, It(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
    }

    function Rt(e, t) {
        (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) && ("" === e.value && (e.value = "" + e._wrapperState.initialValue), e.defaultValue = "" + e._wrapperState.initialValue), "" !== (t = e.name) && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !e.defaultChecked, "" !== t && (e.name = t)
    }

    function Dt(e, t, n) {
        "number" === t && e.ownerDocument.activeElement === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
    }

    function It(e) {
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
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
        var t = e.replace(Tt, xt);
        Ct[t] = new Et(t, 1, !1, e, null)
    }), "xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
        var t = e.replace(Tt, xt);
        Ct[t] = new Et(t, 1, !1, e, "http://www.w3.org/1999/xlink")
    }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
        var t = e.replace(Tt, xt);
        Ct[t] = new Et(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace")
    }), Ct.tabIndex = new Et("tabIndex", 1, !1, "tabindex", null);
    var At = {
        change: {
            phasedRegistrationNames: {
                bubbled: "onChange",
                captured: "onChangeCapture"
            },
            dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
        }
    };

    function Ft(e, t, n) {
        return (e = we.getPooled(At.change, e, t, n)).type = "change", We(n), ee(e), e
    }
    var Mt = null,
        Bt = null;

    function Ut(e) {
        F(e, !1)
    }

    function Ht(e) {
        if (ot(V(e))) return e
    }

    function zt(e, t) {
        if ("change" === e) return t
    }
    var Wt = !1;

    function Vt() {
        Mt && (Mt.detachEvent("onpropertychange", Kt), Bt = Mt = null)
    }

    function Kt(e) {
        "value" === e.propertyName && Ht(Bt) && Ge(Ut, e = Ft(Bt, e, et(e)))
    }

    function Yt(e, t, n) {
        "focus" === e ? (Vt(), Bt = n, (Mt = t).attachEvent("onpropertychange", Kt)) : "blur" === e && Vt()
    }

    function $t(e) {
        if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Ht(Bt)
    }

    function Xt(e, t) {
        if ("click" === e) return Ht(t)
    }

    function qt(e, t) {
        if ("input" === e || "change" === e) return Ht(t)
    }
    i.canUseDOM && (Wt = tt("input") && (!document.documentMode || 9 < document.documentMode));
    var Qt = {
            eventTypes: At,
            _isInputEventSupported: Wt,
            extractEvents: function(e, t, n, r) {
                var o = t ? V(t) : window,
                    i = void 0,
                    a = void 0,
                    s = o.nodeName && o.nodeName.toLowerCase();
                if ("select" === s || "input" === s && "file" === o.type ? i = zt : Je(o) ? Wt ? i = qt : (i = $t, a = Yt) : (s = o.nodeName) && "input" === s.toLowerCase() && ("checkbox" === o.type || "radio" === o.type) && (i = Xt), i && (i = i(e, t))) return Ft(i, n, r);
                a && a(e, o, t), "blur" === e && null != t && (e = t._wrapperState || o._wrapperState) && e.controlled && "number" === o.type && Dt(o, "number", o.value)
            }
        },
        Gt = we.extend({
            view: null,
            detail: null
        }),
        Zt = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };

    function Jt(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : !!(e = Zt[e]) && !!t[e]
    }

    function en() {
        return Jt
    }
    var tn = Gt.extend({
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
            getModifierState: en,
            button: null,
            buttons: null,
            relatedTarget: function(e) {
                return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
            }
        }),
        nn = tn.extend({
            pointerId: null,
            width: null,
            height: null,
            pressure: null,
            tiltX: null,
            tiltY: null,
            pointerType: null,
            isPrimary: null
        }),
        rn = {
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
        on = {
            eventTypes: rn,
            extractEvents: function(e, t, n, r) {
                var o = "mouseover" === e || "pointerover" === e,
                    i = "mouseout" === e || "pointerout" === e;
                if (o && (n.relatedTarget || n.fromElement) || !i && !o) return null;
                if (o = r.window === r ? r : (o = r.ownerDocument) ? o.defaultView || o.parentWindow : window, i ? (i = t, t = (t = n.relatedTarget || n.toElement) ? W(t) : null) : i = null, i === t) return null;
                var a = void 0,
                    s = void 0,
                    l = void 0,
                    u = void 0;
                return "mouseout" === e || "mouseover" === e ? (a = tn, s = rn.mouseLeave, l = rn.mouseEnter, u = "mouse") : "pointerout" !== e && "pointerover" !== e || (a = nn, s = rn.pointerLeave, l = rn.pointerEnter, u = "pointer"), e = null == i ? o : V(i), o = null == t ? o : V(t), (s = a.getPooled(s, i, n, r)).type = u + "leave", s.target = e, s.relatedTarget = o, (n = a.getPooled(l, t, n, r)).type = u + "enter", n.target = o, n.relatedTarget = e, te(s, n, i, t), [s, n]
            }
        };

    function an(e) {
        var t = e;
        if (e.alternate)
            for (; t.return;) t = t.return;
        else {
            if (0 != (2 & t.effectTag)) return 1;
            for (; t.return;)
                if (0 != (2 & (t = t.return).effectTag)) return 1
        }
        return 3 === t.tag ? 2 : 3
    }

    function sn(e) {
        2 !== an(e) && f("188")
    }

    function ln(e) {
        var t = e.alternate;
        if (!t) return 3 === (t = an(e)) && f("188"), 1 === t ? null : e;
        for (var n = e, r = t;;) {
            var o = n.return,
                i = o ? o.alternate : null;
            if (!o || !i) break;
            if (o.child === i.child) {
                for (var a = o.child; a;) {
                    if (a === n) return sn(o), e;
                    if (a === r) return sn(o), t;
                    a = a.sibling
                }
                f("188")
            }
            if (n.return !== r.return) n = o, r = i;
            else {
                a = !1;
                for (var s = o.child; s;) {
                    if (s === n) {
                        a = !0, n = o, r = i;
                        break
                    }
                    if (s === r) {
                        a = !0, r = o, n = i;
                        break
                    }
                    s = s.sibling
                }
                if (!a) {
                    for (s = i.child; s;) {
                        if (s === n) {
                            a = !0, n = i, r = o;
                            break
                        }
                        if (s === r) {
                            a = !0, r = i, n = o;
                            break
                        }
                        s = s.sibling
                    }
                    a || f("189")
                }
            }
            n.alternate !== r && f("190")
        }
        return 3 !== n.tag && f("188"), n.stateNode.current === n ? e : t
    }

    function un(e) {
        if (!(e = ln(e))) return null;
        for (var t = e;;) {
            if (5 === t.tag || 6 === t.tag) return t;
            if (t.child) t.child.return = t, t = t.child;
            else {
                if (t === e) break;
                for (; !t.sibling;) {
                    if (!t.return || t.return === e) return null;
                    t = t.return
                }
                t.sibling.return = t.return, t = t.sibling
            }
        }
        return null
    }
    var cn = we.extend({
            animationName: null,
            elapsedTime: null,
            pseudoElement: null
        }),
        dn = we.extend({
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData
            }
        }),
        fn = Gt.extend({
            relatedTarget: null
        });

    function pn(e) {
        var t = e.keyCode;
        return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0
    }
    var hn = {
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
        yn = {
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
        vn = Gt.extend({
            key: function(e) {
                if (e.key) {
                    var t = hn[e.key] || e.key;
                    if ("Unidentified" !== t) return t
                }
                return "keypress" === e.type ? 13 === (e = pn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? yn[e.keyCode] || "Unidentified" : ""
            },
            location: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            repeat: null,
            locale: null,
            getModifierState: en,
            charCode: function(e) {
                return "keypress" === e.type ? pn(e) : 0
            },
            keyCode: function(e) {
                return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
            },
            which: function(e) {
                return "keypress" === e.type ? pn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
            }
        }),
        mn = tn.extend({
            dataTransfer: null
        }),
        _n = Gt.extend({
            touches: null,
            targetTouches: null,
            changedTouches: null,
            altKey: null,
            metaKey: null,
            ctrlKey: null,
            shiftKey: null,
            getModifierState: en
        }),
        gn = we.extend({
            propertyName: null,
            elapsedTime: null,
            pseudoElement: null
        }),
        wn = tn.extend({
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
            },
            deltaZ: null,
            deltaMode: null
        }),
        bn = [
            ["abort", "abort"],
            [le, "animationEnd"],
            [ue, "animationIteration"],
            [ce, "animationStart"],
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
            [de, "transitionEnd"],
            ["waiting", "waiting"],
            ["wheel", "wheel"]
        ],
        kn = {},
        Sn = {};

    function En(e, t) {
        var n = e[0],
            r = "on" + ((e = e[1])[0].toUpperCase() + e.slice(1));
        t = {
            phasedRegistrationNames: {
                bubbled: r,
                captured: r + "Capture"
            },
            dependencies: [n],
            isInteractive: t
        }, kn[e] = t, Sn[n] = t
    }[
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
        En(e, !0)
    }), bn.forEach(function(e) {
        En(e, !1)
    });
    var Cn = {
            eventTypes: kn,
            isInteractiveTopLevelEventType: function(e) {
                return void 0 !== (e = Sn[e]) && !0 === e.isInteractive
            },
            extractEvents: function(e, t, n, r) {
                var o = Sn[e];
                if (!o) return null;
                switch (e) {
                    case "keypress":
                        if (0 === pn(n)) return null;
                    case "keydown":
                    case "keyup":
                        e = vn;
                        break;
                    case "blur":
                    case "focus":
                        e = fn;
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
                        e = tn;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        e = mn;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        e = _n;
                        break;
                    case le:
                    case ue:
                    case ce:
                        e = cn;
                        break;
                    case de:
                        e = gn;
                        break;
                    case "scroll":
                        e = Gt;
                        break;
                    case "wheel":
                        e = wn;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        e = dn;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        e = nn;
                        break;
                    default:
                        e = we
                }
                return ee(t = e.getPooled(o, t, n, r)), t
            }
        },
        Tn = Cn.isInteractiveTopLevelEventType,
        xn = [];

    function On(e) {
        var t = e.targetInst;
        do {
            if (!t) {
                e.ancestors.push(t);
                break
            }
            var n;
            for (n = t; n.return;) n = n.return;
            if (!(n = 3 !== n.tag ? null : n.stateNode.containerInfo)) break;
            e.ancestors.push(t), t = W(n)
        } while (t);
        for (n = 0; n < e.ancestors.length; n++) t = e.ancestors[n], M(e.topLevelType, t, e.nativeEvent, et(e.nativeEvent))
    }
    var Ln = !0;

    function Pn(e) {
        Ln = !!e
    }

    function Nn(e, t) {
        if (!t) return null;
        var n = (Tn(e) ? Rn : Dn).bind(null, e);
        t.addEventListener(e, n, !1)
    }

    function jn(e, t) {
        if (!t) return null;
        var n = (Tn(e) ? Rn : Dn).bind(null, e);
        t.addEventListener(e, n, !0)
    }

    function Rn(e, t) {
        Xe(Dn, e, t)
    }

    function Dn(e, t) {
        if (Ln) {
            var n = et(t);
            if (null === (n = W(n)) || "number" != typeof n.tag || 2 === an(n) || (n = null), xn.length) {
                var r = xn.pop();
                r.topLevelType = e, r.nativeEvent = t, r.targetInst = n, e = r
            } else e = {
                topLevelType: e,
                nativeEvent: t,
                targetInst: n,
                ancestors: []
            };
            try {
                Ge(On, e)
            } finally {
                e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, 10 > xn.length && xn.push(e)
            }
        }
    }
    var In = {
            get _enabled() {
                return Ln
            },
            setEnabled: Pn,
            isEnabled: function() {
                return Ln
            },
            trapBubbledEvent: Nn,
            trapCapturedEvent: jn,
            dispatchEvent: Dn
        },
        An = {},
        Fn = 0,
        Mn = "_reactListenersID" + ("" + Math.random()).slice(2);

    function Bn(e) {
        return Object.prototype.hasOwnProperty.call(e, Mn) || (e[Mn] = Fn++, An[e[Mn]] = {}), An[e[Mn]]
    }

    function Un(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function Hn(e, t) {
        var n, r = Un(e);
        for (e = 0; r;) {
            if (3 === r.nodeType) {
                if (n = e + r.textContent.length, e <= t && n >= t) return {
                    node: r,
                    offset: t - e
                };
                e = n
            }
            e: {
                for (; r;) {
                    if (r.nextSibling) {
                        r = r.nextSibling;
                        break e
                    }
                    r = r.parentNode
                }
                r = void 0
            }
            r = Un(r)
        }
    }

    function zn(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && ("input" === t && "text" === e.type || "textarea" === t || "true" === e.contentEditable)
    }
    var Wn = i.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
        Vn = {
            select: {
                phasedRegistrationNames: {
                    bubbled: "onSelect",
                    captured: "onSelectCapture"
                },
                dependencies: "blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")
            }
        },
        Kn = null,
        Yn = null,
        $n = null,
        Xn = !1;

    function qn(e, t) {
        if (Xn || null == Kn || Kn !== l()) return null;
        var n = Kn;
        return "selectionStart" in n && zn(n) ? n = {
            start: n.selectionStart,
            end: n.selectionEnd
        } : window.getSelection ? n = {
            anchorNode: (n = window.getSelection()).anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset
        } : n = void 0, $n && u($n, n) ? null : ($n = n, (e = we.getPooled(Vn.select, Yn, e, t)).type = "select", e.target = Kn, ee(e), e)
    }
    var Qn = {
        eventTypes: Vn,
        extractEvents: function(e, t, n, r) {
            var o, i = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;
            if (!(o = !i)) {
                e: {
                    i = Bn(i),
                    o = b.onSelect;
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
            switch (i = t ? V(t) : window, e) {
                case "focus":
                    (Je(i) || "true" === i.contentEditable) && (Kn = i, Yn = t, $n = null);
                    break;
                case "blur":
                    $n = Yn = Kn = null;
                    break;
                case "mousedown":
                    Xn = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                    return Xn = !1, qn(n, r);
                case "selectionchange":
                    if (Wn) break;
                case "keydown":
                case "keyup":
                    return qn(n, r)
            }
            return null
        }
    };
    I.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), C = Y.getFiberCurrentPropsFromNode, T = Y.getInstanceFromNode, x = Y.getNodeFromInstance, I.injectEventPluginsByName({
        SimpleEventPlugin: Cn,
        EnterLeaveEventPlugin: on,
        ChangeEventPlugin: Qt,
        SelectEventPlugin: Qn,
        BeforeInputEventPlugin: Fe
    });
    var Gn = void 0;
    Gn = "object" == typeof performance && "function" == typeof performance.now ? function() {
        return performance.now()
    } : function() {
        return Date.now()
    };
    var Zn = void 0,
        Jn = void 0;
    if (i.canUseDOM) {
        var er = [],
            tr = 0,
            nr = {},
            rr = -1,
            or = !1,
            ir = !1,
            ar = 0,
            sr = 33,
            lr = 33,
            ur = {
                didTimeout: !1,
                timeRemaining: function() {
                    var e = ar - Gn();
                    return 0 < e ? e : 0
                }
            },
            cr = function(e, t) {
                if (nr[t]) try {
                    e(ur)
                } finally {
                    delete nr[t]
                }
            },
            dr = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
        window.addEventListener("message", function(e) {
            if (e.source === window && e.data === dr && (or = !1, 0 !== er.length)) {
                if (0 !== er.length && (e = Gn(), !(-1 === rr || rr > e))) {
                    rr = -1, ur.didTimeout = !0;
                    for (var t = 0, n = er.length; t < n; t++) {
                        var r = er[t],
                            o = r.timeoutTime; - 1 !== o && o <= e ? cr(r.scheduledCallback, r.callbackId) : -1 !== o && (-1 === rr || o < rr) && (rr = o)
                    }
                }
                for (e = Gn(); 0 < ar - e && 0 < er.length;) e = er.shift(), ur.didTimeout = !1, cr(e.scheduledCallback, e.callbackId), e = Gn();
                0 < er.length && !ir && (ir = !0, requestAnimationFrame(fr))
            }
        }, !1);
        var fr = function(e) {
            ir = !1;
            var t = e - ar + lr;
            t < lr && sr < lr ? (8 > t && (t = 8), lr = t < sr ? sr : t) : sr = t, ar = e + lr, or || (or = !0, window.postMessage(dr, "*"))
        };
        Zn = function(e, t) {
            var n = -1;
            return null != t && "number" == typeof t.timeout && (n = Gn() + t.timeout), (-1 === rr || -1 !== n && n < rr) && (rr = n), t = ++tr, er.push({
                scheduledCallback: e,
                callbackId: t,
                timeoutTime: n
            }), nr[t] = !0, ir || (ir = !0, requestAnimationFrame(fr)), t
        }, Jn = function(e) {
            delete nr[e]
        }
    } else {
        var pr = 0,
            hr = {};
        Zn = function(e) {
            var t = pr++,
                n = setTimeout(function() {
                    e({
                        timeRemaining: function() {
                            return 1 / 0
                        },
                        didTimeout: !1
                    })
                });
            return hr[t] = n, t
        }, Jn = function(e) {
            var t = hr[e];
            delete hr[e], clearTimeout(t)
        }
    }

    function yr(e, t) {
        return e = a({
            children: void 0
        }, t), (t = function(e) {
            var t = "";
            return o.Children.forEach(e, function(e) {
                null == e || "string" != typeof e && "number" != typeof e || (t += e)
            }), t
        }(t.children)) && (e.children = t), e
    }

    function vr(e, t, n, r) {
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

    function mr(e, t) {
        var n = t.value;
        e._wrapperState = {
            initialValue: null != n ? n : t.defaultValue,
            wasMultiple: !!t.multiple
        }
    }

    function _r(e, t) {
        return null != t.dangerouslySetInnerHTML && f("91"), a({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        })
    }

    function gr(e, t) {
        var n = t.value;
        null == n && (n = t.defaultValue, null != (t = t.children) && (null != n && f("92"), Array.isArray(t) && (1 >= t.length || f("93"), t = t[0]), n = "" + t), null == n && (n = "")), e._wrapperState = {
            initialValue: "" + n
        }
    }

    function wr(e, t) {
        var n = t.value;
        null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && (e.defaultValue = n)), null != t.defaultValue && (e.defaultValue = t.defaultValue)
    }

    function br(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && (e.value = t)
    }
    var kr = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg"
    };

    function Sr(e) {
        switch (e) {
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml"
        }
    }

    function Er(e, t) {
        return null == e || "http://www.w3.org/1999/xhtml" === e ? Sr(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
    }
    var Cr, Tr = void 0,
        xr = (Cr = function(e, t) {
            if (e.namespaceURI !== kr.svg || "innerHTML" in e) e.innerHTML = t;
            else {
                for ((Tr = Tr || document.createElement("div")).innerHTML = "<svg>" + t + "</svg>", t = Tr.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                for (; t.firstChild;) e.appendChild(t.firstChild)
            }
        }, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
            MSApp.execUnsafeLocalFunction(function() {
                return Cr(e, t)
            })
        } : Cr);

    function Or(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
        }
        e.textContent = t
    }
    var Lr = {
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
        Pr = ["Webkit", "ms", "Moz", "O"];

    function Nr(e, t) {
        for (var n in e = e.style, t)
            if (t.hasOwnProperty(n)) {
                var r = 0 === n.indexOf("--"),
                    o = n,
                    i = t[n];
                o = null == i || "boolean" == typeof i || "" === i ? "" : r || "number" != typeof i || 0 === i || Lr.hasOwnProperty(o) && Lr[o] ? ("" + i).trim() : i + "px", "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
            }
    }
    Object.keys(Lr).forEach(function(e) {
        Pr.forEach(function(t) {
            t = t + e.charAt(0).toUpperCase() + e.substring(1), Lr[t] = Lr[e]
        })
    });
    var jr = a({
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
    });

    function Rr(e, t, n) {
        t && (jr[e] && (null != t.children || null != t.dangerouslySetInnerHTML) && f("137", e, n()), null != t.dangerouslySetInnerHTML && (null != t.children && f("60"), "object" == typeof t.dangerouslySetInnerHTML && "__html" in t.dangerouslySetInnerHTML || f("61")), null != t.style && "object" != typeof t.style && f("62", n()))
    }

    function Dr(e, t) {
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
    var Ir = s.thatReturns("");

    function Ar(e, t) {
        var n = Bn(e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument);
        t = b[t];
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            if (!n.hasOwnProperty(o) || !n[o]) {
                switch (o) {
                    case "scroll":
                        jn("scroll", e);
                        break;
                    case "focus":
                    case "blur":
                        jn("focus", e), jn("blur", e), n.blur = !0, n.focus = !0;
                        break;
                    case "cancel":
                    case "close":
                        tt(o, !0) && jn(o, e);
                        break;
                    case "invalid":
                    case "submit":
                    case "reset":
                        break;
                    default:
                        -1 === fe.indexOf(o) && Nn(o, e)
                }
                n[o] = !0
            }
        }
    }

    function Fr(e, t, n, r) {
        return n = 9 === n.nodeType ? n : n.ownerDocument, r === kr.html && (r = Sr(e)), r === kr.html ? "script" === e ? ((e = n.createElement("div")).innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : e = "string" == typeof t.is ? n.createElement(e, {
            is: t.is
        }) : n.createElement(e) : e = n.createElementNS(r, e), e
    }

    function Mr(e, t) {
        return (9 === t.nodeType ? t : t.ownerDocument).createTextNode(e)
    }

    function Br(e, t, n, r) {
        var o = Dr(t, n);
        switch (t) {
            case "iframe":
            case "object":
                Nn("load", e);
                var i = n;
                break;
            case "video":
            case "audio":
                for (i = 0; i < fe.length; i++) Nn(fe[i], e);
                i = n;
                break;
            case "source":
                Nn("error", e), i = n;
                break;
            case "img":
            case "image":
            case "link":
                Nn("error", e), Nn("load", e), i = n;
                break;
            case "form":
                Nn("reset", e), Nn("submit", e), i = n;
                break;
            case "details":
                Nn("toggle", e), i = n;
                break;
            case "input":
                Pt(e, n), i = Lt(e, n), Nn("invalid", e), Ar(r, "onChange");
                break;
            case "option":
                i = yr(e, n);
                break;
            case "select":
                mr(e, n), i = a({}, n, {
                    value: void 0
                }), Nn("invalid", e), Ar(r, "onChange");
                break;
            case "textarea":
                gr(e, n), i = _r(e, n), Nn("invalid", e), Ar(r, "onChange");
                break;
            default:
                i = n
        }
        Rr(t, i, Ir);
        var l, u = i;
        for (l in u)
            if (u.hasOwnProperty(l)) {
                var c = u[l];
                "style" === l ? Nr(e, c) : "dangerouslySetInnerHTML" === l ? null != (c = c ? c.__html : void 0) && xr(e, c) : "children" === l ? "string" == typeof c ? ("textarea" !== t || "" !== c) && Or(e, c) : "number" == typeof c && Or(e, "" + c) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (w.hasOwnProperty(l) ? null != c && Ar(r, l) : null != c && Ot(e, l, c, o))
            }
        switch (t) {
            case "input":
                rt(e), Rt(e, n);
                break;
            case "textarea":
                rt(e), br(e);
                break;
            case "option":
                null != n.value && e.setAttribute("value", n.value);
                break;
            case "select":
                e.multiple = !!n.multiple, null != (t = n.value) ? vr(e, !!n.multiple, t, !1) : null != n.defaultValue && vr(e, !!n.multiple, n.defaultValue, !0);
                break;
            default:
                "function" == typeof i.onClick && (e.onclick = s)
        }
    }

    function Ur(e, t, n, r, o) {
        var i = null;
        switch (t) {
            case "input":
                n = Lt(e, n), r = Lt(e, r), i = [];
                break;
            case "option":
                n = yr(e, n), r = yr(e, r), i = [];
                break;
            case "select":
                n = a({}, n, {
                    value: void 0
                }), r = a({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                n = _r(e, n), r = _r(e, r), i = [];
                break;
            default:
                "function" != typeof n.onClick && "function" == typeof r.onClick && (e.onclick = s)
        }
        Rr(t, r, Ir), t = e = void 0;
        var l = null;
        for (e in n)
            if (!r.hasOwnProperty(e) && n.hasOwnProperty(e) && null != n[e])
                if ("style" === e) {
                    var u = n[e];
                    for (t in u) u.hasOwnProperty(t) && (l || (l = {}), l[t] = "")
                } else "dangerouslySetInnerHTML" !== e && "children" !== e && "suppressContentEditableWarning" !== e && "suppressHydrationWarning" !== e && "autoFocus" !== e && (w.hasOwnProperty(e) ? i || (i = []) : (i = i || []).push(e, null));
        for (e in r) {
            var c = r[e];
            if (u = null != n ? n[e] : void 0, r.hasOwnProperty(e) && c !== u && (null != c || null != u))
                if ("style" === e)
                    if (u) {
                        for (t in u) !u.hasOwnProperty(t) || c && c.hasOwnProperty(t) || (l || (l = {}), l[t] = "");
                        for (t in c) c.hasOwnProperty(t) && u[t] !== c[t] && (l || (l = {}), l[t] = c[t])
                    } else l || (i || (i = []), i.push(e, l)), l = c;
            else "dangerouslySetInnerHTML" === e ? (c = c ? c.__html : void 0, u = u ? u.__html : void 0, null != c && u !== c && (i = i || []).push(e, "" + c)) : "children" === e ? u === c || "string" != typeof c && "number" != typeof c || (i = i || []).push(e, "" + c) : "suppressContentEditableWarning" !== e && "suppressHydrationWarning" !== e && (w.hasOwnProperty(e) ? (null != c && Ar(o, e), i || u === c || (i = [])) : (i = i || []).push(e, c))
        }
        return l && (i = i || []).push("style", l), i
    }

    function Hr(e, t, n, r, o) {
        "input" === n && "radio" === o.type && null != o.name && Nt(e, o), Dr(n, r), r = Dr(n, o);
        for (var i = 0; i < t.length; i += 2) {
            var a = t[i],
                s = t[i + 1];
            "style" === a ? Nr(e, s) : "dangerouslySetInnerHTML" === a ? xr(e, s) : "children" === a ? Or(e, s) : Ot(e, a, s, r)
        }
        switch (n) {
            case "input":
                jt(e, o);
                break;
            case "textarea":
                wr(e, o);
                break;
            case "select":
                e._wrapperState.initialValue = void 0, t = e._wrapperState.wasMultiple, e._wrapperState.wasMultiple = !!o.multiple, null != (n = o.value) ? vr(e, !!o.multiple, n, !1) : t !== !!o.multiple && (null != o.defaultValue ? vr(e, !!o.multiple, o.defaultValue, !0) : vr(e, !!o.multiple, o.multiple ? [] : "", !1))
        }
    }

    function zr(e, t, n, r, o) {
        switch (t) {
            case "iframe":
            case "object":
                Nn("load", e);
                break;
            case "video":
            case "audio":
                for (r = 0; r < fe.length; r++) Nn(fe[r], e);
                break;
            case "source":
                Nn("error", e);
                break;
            case "img":
            case "image":
            case "link":
                Nn("error", e), Nn("load", e);
                break;
            case "form":
                Nn("reset", e), Nn("submit", e);
                break;
            case "details":
                Nn("toggle", e);
                break;
            case "input":
                Pt(e, n), Nn("invalid", e), Ar(o, "onChange");
                break;
            case "select":
                mr(e, n), Nn("invalid", e), Ar(o, "onChange");
                break;
            case "textarea":
                gr(e, n), Nn("invalid", e), Ar(o, "onChange")
        }
        for (var i in Rr(t, n, Ir), r = null, n)
            if (n.hasOwnProperty(i)) {
                var a = n[i];
                "children" === i ? "string" == typeof a ? e.textContent !== a && (r = ["children", a]) : "number" == typeof a && e.textContent !== "" + a && (r = ["children", "" + a]) : w.hasOwnProperty(i) && null != a && Ar(o, i)
            }
        switch (t) {
            case "input":
                rt(e), Rt(e, n);
                break;
            case "textarea":
                rt(e), br(e);
                break;
            case "select":
            case "option":
                break;
            default:
                "function" == typeof n.onClick && (e.onclick = s)
        }
        return r
    }

    function Wr(e, t) {
        return e.nodeValue !== t
    }
    var Vr = {
            createElement: Fr,
            createTextNode: Mr,
            setInitialProperties: Br,
            diffProperties: Ur,
            updateProperties: Hr,
            diffHydratedProperties: zr,
            diffHydratedText: Wr,
            warnForUnmatchedText: function() {},
            warnForDeletedHydratableElement: function() {},
            warnForDeletedHydratableText: function() {},
            warnForInsertedHydratedElement: function() {},
            warnForInsertedHydratedText: function() {},
            restoreControlledState: function(e, t, n) {
                switch (t) {
                    case "input":
                        if (jt(e, n), t = n.name, "radio" === n.type && null != t) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                var r = n[t];
                                if (r !== e && r.form === e.form) {
                                    var o = K(r);
                                    o || f("90"), ot(r), jt(r, o)
                                }
                            }
                        }
                        break;
                    case "textarea":
                        wr(e, n);
                        break;
                    case "select":
                        null != (t = n.value) && vr(e, !!n.multiple, t, !1)
                }
            }
        },
        Kr = null,
        Yr = null;

    function $r(e, t) {
        switch (e) {
            case "button":
            case "input":
            case "select":
            case "textarea":
                return !!t.autoFocus
        }
        return !1
    }

    function Xr(e, t) {
        return "textarea" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && "string" == typeof t.dangerouslySetInnerHTML.__html
    }
    var qr = Gn,
        Qr = Zn,
        Gr = Jn;

    function Zr(e) {
        for (e = e.nextSibling; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
        return e
    }

    function Jr(e) {
        for (e = e.firstChild; e && 1 !== e.nodeType && 3 !== e.nodeType;) e = e.nextSibling;
        return e
    }
    new Set;
    var eo = [],
        to = -1;

    function no(e) {
        return {
            current: e
        }
    }

    function ro(e) {
        0 > to || (e.current = eo[to], eo[to] = null, to--)
    }

    function oo(e, t) {
        eo[++to] = e.current, e.current = t
    }
    var io = no(d),
        ao = no(!1),
        so = d;

    function lo(e) {
        return co(e) ? so : io.current
    }

    function uo(e, t) {
        var n = e.type.contextTypes;
        if (!n) return d;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
        var o, i = {};
        for (o in n) i[o] = t[o];
        return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
    }

    function co(e) {
        return 2 === e.tag && null != e.type.childContextTypes
    }

    function fo(e) {
        co(e) && (ro(ao), ro(io))
    }

    function po(e) {
        ro(ao), ro(io)
    }

    function ho(e, t, n) {
        io.current !== d && f("168"), oo(io, t), oo(ao, n)
    }

    function yo(e, t) {
        var n = e.stateNode,
            r = e.type.childContextTypes;
        if ("function" != typeof n.getChildContext) return t;
        for (var o in n = n.getChildContext()) o in r || f("108", gt(e) || "Unknown", o);
        return a({}, t, n)
    }

    function vo(e) {
        if (!co(e)) return !1;
        var t = e.stateNode;
        return t = t && t.__reactInternalMemoizedMergedChildContext || d, so = io.current, oo(io, t), oo(ao, ao.current), !0
    }

    function mo(e, t) {
        var n = e.stateNode;
        if (n || f("169"), t) {
            var r = yo(e, so);
            n.__reactInternalMemoizedMergedChildContext = r, ro(ao), ro(io), oo(io, r)
        } else ro(ao);
        oo(ao, t)
    }

    function _o(e, t, n, r) {
        this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.expirationTime = 0, this.alternate = null
    }

    function go(e, t, n) {
        var r = e.alternate;
        return null === r ? ((r = new _o(e.tag, t, e.key, e.mode)).type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.effectTag = 0, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null), r.expirationTime = n, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r
    }

    function wo(e, t, n) {
        var r = e.type,
            o = e.key;
        if (e = e.props, "function" == typeof r) var i = r.prototype && r.prototype.isReactComponent ? 2 : 0;
        else if ("string" == typeof r) i = 5;
        else switch (r) {
            case ut:
                return bo(e.children, t, n, o);
            case ht:
                i = 11, t |= 3;
                break;
            case ct:
                i = 11, t |= 2;
                break;
            case dt:
                return (r = new _o(15, e, o, 4 | t)).type = dt, r.expirationTime = n, r;
            case vt:
                i = 16, t |= 2;
                break;
            default:
                e: {
                    switch ("object" == typeof r && null !== r ? r.$$typeof : null) {
                        case ft:
                            i = 13;
                            break e;
                        case pt:
                            i = 12;
                            break e;
                        case yt:
                            i = 14;
                            break e;
                        default:
                            f("130", null == r ? r : typeof r, "")
                    }
                    i = void 0
                }
        }
        return (t = new _o(i, e, o, t)).type = r, t.expirationTime = n, t
    }

    function bo(e, t, n, r) {
        return (e = new _o(10, e, r, t)).expirationTime = n, e
    }

    function ko(e, t, n) {
        return (e = new _o(6, e, null, t)).expirationTime = n, e
    }

    function So(e, t, n) {
        return (t = new _o(4, null !== e.children ? e.children : [], e.key, t)).expirationTime = n, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }

    function Eo(e, t, n) {
        return e = {
            current: t = new _o(3, null, null, t ? 3 : 0),
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
    var Co = null,
        To = null;

    function xo(e) {
        return function(t) {
            try {
                return e(t)
            } catch (e) {}
        }
    }

    function Oo(e) {
        "function" == typeof Co && Co(e)
    }

    function Lo(e) {
        "function" == typeof To && To(e)
    }
    var Po = !1;

    function No(e) {
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

    function jo(e) {
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

    function Ro(e) {
        return {
            expirationTime: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
            nextEffect: null
        }
    }

    function Do(e, t, n) {
        null === e.lastUpdate ? e.firstUpdate = e.lastUpdate = t : (e.lastUpdate.next = t, e.lastUpdate = t), (0 === e.expirationTime || e.expirationTime > n) && (e.expirationTime = n)
    }

    function Io(e, t, n) {
        var r = e.alternate;
        if (null === r) {
            var o = e.updateQueue,
                i = null;
            null === o && (o = e.updateQueue = No(e.memoizedState))
        } else o = e.updateQueue, i = r.updateQueue, null === o ? null === i ? (o = e.updateQueue = No(e.memoizedState), i = r.updateQueue = No(r.memoizedState)) : o = e.updateQueue = jo(i) : null === i && (i = r.updateQueue = jo(o));
        null === i || o === i ? Do(o, t, n) : null === o.lastUpdate || null === i.lastUpdate ? (Do(o, t, n), Do(i, t, n)) : (Do(o, t, n), i.lastUpdate = t)
    }

    function Ao(e, t, n) {
        var r = e.updateQueue;
        null === (r = null === r ? e.updateQueue = No(e.memoizedState) : Fo(e, r)).lastCapturedUpdate ? r.firstCapturedUpdate = r.lastCapturedUpdate = t : (r.lastCapturedUpdate.next = t, r.lastCapturedUpdate = t), (0 === r.expirationTime || r.expirationTime > n) && (r.expirationTime = n)
    }

    function Fo(e, t) {
        var n = e.alternate;
        return null !== n && t === n.updateQueue && (t = e.updateQueue = jo(t)), t
    }

    function Mo(e, t, n, r, o, i) {
        switch (n.tag) {
            case 1:
                return "function" == typeof(e = n.payload) ? e.call(i, r, o) : e;
            case 3:
                e.effectTag = -1025 & e.effectTag | 64;
            case 0:
                if (null === (o = "function" == typeof(e = n.payload) ? e.call(i, r, o) : e) || void 0 === o) break;
                return a({}, r, o);
            case 2:
                Po = !0
        }
        return r
    }

    function Bo(e, t, n, r, o) {
        if (Po = !1, !(0 === t.expirationTime || t.expirationTime > o)) {
            for (var i = (t = Fo(e, t)).baseState, a = null, s = 0, l = t.firstUpdate, u = i; null !== l;) {
                var c = l.expirationTime;
                c > o ? (null === a && (a = l, i = u), (0 === s || s > c) && (s = c)) : (u = Mo(e, 0, l, u, n, r), null !== l.callback && (e.effectTag |= 32, l.nextEffect = null, null === t.lastEffect ? t.firstEffect = t.lastEffect = l : (t.lastEffect.nextEffect = l, t.lastEffect = l))), l = l.next
            }
            for (c = null, l = t.firstCapturedUpdate; null !== l;) {
                var d = l.expirationTime;
                d > o ? (null === c && (c = l, null === a && (i = u)), (0 === s || s > d) && (s = d)) : (u = Mo(e, 0, l, u, n, r), null !== l.callback && (e.effectTag |= 32, l.nextEffect = null, null === t.lastCapturedEffect ? t.firstCapturedEffect = t.lastCapturedEffect = l : (t.lastCapturedEffect.nextEffect = l, t.lastCapturedEffect = l))), l = l.next
            }
            null === a && (t.lastUpdate = null), null === c ? t.lastCapturedUpdate = null : e.effectTag |= 32, null === a && null === c && (i = u), t.baseState = i, t.firstUpdate = a, t.firstCapturedUpdate = c, t.expirationTime = s, e.memoizedState = u
        }
    }

    function Uo(e, t) {
        "function" != typeof e && f("191", e), e.call(t)
    }

    function Ho(e, t, n) {
        for (null !== t.firstCapturedUpdate && (null !== t.lastUpdate && (t.lastUpdate.next = t.firstCapturedUpdate, t.lastUpdate = t.lastCapturedUpdate), t.firstCapturedUpdate = t.lastCapturedUpdate = null), e = t.firstEffect, t.firstEffect = t.lastEffect = null; null !== e;) {
            var r = e.callback;
            null !== r && (e.callback = null, Uo(r, n)), e = e.nextEffect
        }
        for (e = t.firstCapturedEffect, t.firstCapturedEffect = t.lastCapturedEffect = null; null !== e;) null !== (t = e.callback) && (e.callback = null, Uo(t, n)), e = e.nextEffect
    }

    function zo(e, t) {
        return {
            value: e,
            source: t,
            stack: wt(t)
        }
    }
    var Wo = no(null),
        Vo = no(null),
        Ko = no(0);

    function Yo(e) {
        var t = e.type._context;
        oo(Ko, t._changedBits), oo(Vo, t._currentValue), oo(Wo, e), t._currentValue = e.pendingProps.value, t._changedBits = e.stateNode
    }

    function $o(e) {
        var t = Ko.current,
            n = Vo.current;
        ro(Wo), ro(Vo), ro(Ko), (e = e.type._context)._currentValue = n, e._changedBits = t
    }
    var Xo = {},
        qo = no(Xo),
        Qo = no(Xo),
        Go = no(Xo);

    function Zo(e) {
        return e === Xo && f("174"), e
    }

    function Jo(e, t) {
        oo(Go, t), oo(Qo, e), oo(qo, Xo);
        var n = t.nodeType;
        switch (n) {
            case 9:
            case 11:
                t = (t = t.documentElement) ? t.namespaceURI : Er(null, "");
                break;
            default:
                t = Er(t = (n = 8 === n ? t.parentNode : t).namespaceURI || null, n = n.tagName)
        }
        ro(qo), oo(qo, t)
    }

    function ei(e) {
        ro(qo), ro(Qo), ro(Go)
    }

    function ti(e) {
        Qo.current === e && (ro(qo), ro(Qo))
    }

    function ni(e, t, n) {
        var r = e.memoizedState;
        r = null === (t = t(n, r)) || void 0 === t ? r : a({}, r, t), e.memoizedState = r, null !== (e = e.updateQueue) && 0 === e.expirationTime && (e.baseState = r)
    }
    var ri = {
        isMounted: function(e) {
            return !!(e = e._reactInternalFiber) && 2 === an(e)
        },
        enqueueSetState: function(e, t, n) {
            e = e._reactInternalFiber;
            var r = ya(),
                o = Ro(r = pa(r, e));
            o.payload = t, void 0 !== n && null !== n && (o.callback = n), Io(e, o, r), ha(e, r)
        },
        enqueueReplaceState: function(e, t, n) {
            e = e._reactInternalFiber;
            var r = ya(),
                o = Ro(r = pa(r, e));
            o.tag = 1, o.payload = t, void 0 !== n && null !== n && (o.callback = n), Io(e, o, r), ha(e, r)
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternalFiber;
            var n = ya(),
                r = Ro(n = pa(n, e));
            r.tag = 2, void 0 !== t && null !== t && (r.callback = t), Io(e, r, n), ha(e, n)
        }
    };

    function oi(e, t, n, r, o, i) {
        var a = e.stateNode;
        return e = e.type, "function" == typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(n, o, i) : !e.prototype || !e.prototype.isPureReactComponent || (!u(t, n) || !u(r, o))
    }

    function ii(e, t, n, r) {
        e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ri.enqueueReplaceState(t, t.state, null)
    }

    function ai(e, t) {
        var n = e.type,
            r = e.stateNode,
            o = e.pendingProps,
            i = lo(e);
        r.props = o, r.state = e.memoizedState, r.refs = d, r.context = uo(e, i), null !== (i = e.updateQueue) && (Bo(e, i, o, r, t), r.state = e.memoizedState), "function" == typeof(i = e.type.getDerivedStateFromProps) && (ni(e, i, o), r.state = e.memoizedState), "function" == typeof n.getDerivedStateFromProps || "function" == typeof r.getSnapshotBeforeUpdate || "function" != typeof r.UNSAFE_componentWillMount && "function" != typeof r.componentWillMount || (n = r.state, "function" == typeof r.componentWillMount && r.componentWillMount(), "function" == typeof r.UNSAFE_componentWillMount && r.UNSAFE_componentWillMount(), n !== r.state && ri.enqueueReplaceState(r, r.state, null), null !== (i = e.updateQueue) && (Bo(e, i, o, r, t), r.state = e.memoizedState)), "function" == typeof r.componentDidMount && (e.effectTag |= 4)
    }
    var si = Array.isArray;

    function li(e, t, n) {
        if (null !== (e = n.ref) && "function" != typeof e && "object" != typeof e) {
            if (n._owner) {
                var r = void 0;
                (n = n._owner) && (2 !== n.tag && f("110"), r = n.stateNode), r || f("147", e);
                var o = "" + e;
                return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === o ? t.ref : ((t = function(e) {
                    var t = r.refs === d ? r.refs = {} : r.refs;
                    null === e ? delete t[o] : t[o] = e
                })._stringRef = o, t)
            }
            "string" != typeof e && f("148"), n._owner || f("254", e)
        }
        return e
    }

    function ui(e, t) {
        "textarea" !== e.type && f("31", "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t, "")
    }

    function ci(e) {
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

        function r(e, t) {
            for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
            return e
        }

        function o(e, t, n) {
            return (e = go(e, t, n)).index = 0, e.sibling = null, e
        }

        function i(t, n, r) {
            return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.effectTag = 2, n) : r : (t.effectTag = 2, n) : n
        }

        function a(t) {
            return e && null === t.alternate && (t.effectTag = 2), t
        }

        function s(e, t, n, r) {
            return null === t || 6 !== t.tag ? ((t = ko(n, e.mode, r)).return = e, t) : ((t = o(t, n, r)).return = e, t)
        }

        function l(e, t, n, r) {
            return null !== t && t.type === n.type ? ((r = o(t, n.props, r)).ref = li(e, t, n), r.return = e, r) : ((r = wo(n, e.mode, r)).ref = li(e, t, n), r.return = e, r)
        }

        function u(e, t, n, r) {
            return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = So(n, e.mode, r)).return = e, t) : ((t = o(t, n.children || [], r)).return = e, t)
        }

        function c(e, t, n, r, i) {
            return null === t || 10 !== t.tag ? ((t = bo(n, e.mode, r, i)).return = e, t) : ((t = o(t, n, r)).return = e, t)
        }

        function d(e, t, n) {
            if ("string" == typeof t || "number" == typeof t) return (t = ko("" + t, e.mode, n)).return = e, t;
            if ("object" == typeof t && null !== t) {
                switch (t.$$typeof) {
                    case st:
                        return (n = wo(t, e.mode, n)).ref = li(e, null, t), n.return = e, n;
                    case lt:
                        return (t = So(t, e.mode, n)).return = e, t
                }
                if (si(t) || _t(t)) return (t = bo(t, e.mode, n, null)).return = e, t;
                ui(e, t)
            }
            return null
        }

        function p(e, t, n, r) {
            var o = null !== t ? t.key : null;
            if ("string" == typeof n || "number" == typeof n) return null !== o ? null : s(e, t, "" + n, r);
            if ("object" == typeof n && null !== n) {
                switch (n.$$typeof) {
                    case st:
                        return n.key === o ? n.type === ut ? c(e, t, n.props.children, r, o) : l(e, t, n, r) : null;
                    case lt:
                        return n.key === o ? u(e, t, n, r) : null
                }
                if (si(n) || _t(n)) return null !== o ? null : c(e, t, n, r, null);
                ui(e, n)
            }
            return null
        }

        function h(e, t, n, r, o) {
            if ("string" == typeof r || "number" == typeof r) return s(t, e = e.get(n) || null, "" + r, o);
            if ("object" == typeof r && null !== r) {
                switch (r.$$typeof) {
                    case st:
                        return e = e.get(null === r.key ? n : r.key) || null, r.type === ut ? c(t, e, r.props.children, o, r.key) : l(t, e, r, o);
                    case lt:
                        return u(t, e = e.get(null === r.key ? n : r.key) || null, r, o)
                }
                if (si(r) || _t(r)) return c(t, e = e.get(n) || null, r, o, null);
                ui(t, r)
            }
            return null
        }

        function y(o, a, s, l) {
            for (var u = null, c = null, f = a, y = a = 0, v = null; null !== f && y < s.length; y++) {
                f.index > y ? (v = f, f = null) : v = f.sibling;
                var m = p(o, f, s[y], l);
                if (null === m) {
                    null === f && (f = v);
                    break
                }
                e && f && null === m.alternate && t(o, f), a = i(m, a, y), null === c ? u = m : c.sibling = m, c = m, f = v
            }
            if (y === s.length) return n(o, f), u;
            if (null === f) {
                for (; y < s.length; y++)(f = d(o, s[y], l)) && (a = i(f, a, y), null === c ? u = f : c.sibling = f, c = f);
                return u
            }
            for (f = r(o, f); y < s.length; y++)(v = h(f, o, y, s[y], l)) && (e && null !== v.alternate && f.delete(null === v.key ? y : v.key), a = i(v, a, y), null === c ? u = v : c.sibling = v, c = v);
            return e && f.forEach(function(e) {
                return t(o, e)
            }), u
        }

        function v(o, a, s, l) {
            var u = _t(s);
            "function" != typeof u && f("150"), null == (s = u.call(s)) && f("151");
            for (var c = u = null, y = a, v = a = 0, m = null, _ = s.next(); null !== y && !_.done; v++, _ = s.next()) {
                y.index > v ? (m = y, y = null) : m = y.sibling;
                var g = p(o, y, _.value, l);
                if (null === g) {
                    y || (y = m);
                    break
                }
                e && y && null === g.alternate && t(o, y), a = i(g, a, v), null === c ? u = g : c.sibling = g, c = g, y = m
            }
            if (_.done) return n(o, y), u;
            if (null === y) {
                for (; !_.done; v++, _ = s.next()) null !== (_ = d(o, _.value, l)) && (a = i(_, a, v), null === c ? u = _ : c.sibling = _, c = _);
                return u
            }
            for (y = r(o, y); !_.done; v++, _ = s.next()) null !== (_ = h(y, o, v, _.value, l)) && (e && null !== _.alternate && y.delete(null === _.key ? v : _.key), a = i(_, a, v), null === c ? u = _ : c.sibling = _, c = _);
            return e && y.forEach(function(e) {
                return t(o, e)
            }), u
        }
        return function(e, r, i, s) {
            "object" == typeof i && null !== i && i.type === ut && null === i.key && (i = i.props.children);
            var l = "object" == typeof i && null !== i;
            if (l) switch (i.$$typeof) {
                case st:
                    e: {
                        var u = i.key;
                        for (l = r; null !== l;) {
                            if (l.key === u) {
                                if (10 === l.tag ? i.type === ut : l.type === i.type) {
                                    n(e, l.sibling), (r = o(l, i.type === ut ? i.props.children : i.props, s)).ref = li(e, l, i), r.return = e, e = r;
                                    break e
                                }
                                n(e, l);
                                break
                            }
                            t(e, l), l = l.sibling
                        }
                        i.type === ut ? ((r = bo(i.props.children, e.mode, s, i.key)).return = e, e = r) : ((s = wo(i, e.mode, s)).ref = li(e, r, i), s.return = e, e = s)
                    }
                    return a(e);
                case lt:
                    e: {
                        for (l = i.key; null !== r;) {
                            if (r.key === l) {
                                if (4 === r.tag && r.stateNode.containerInfo === i.containerInfo && r.stateNode.implementation === i.implementation) {
                                    n(e, r.sibling), (r = o(r, i.children || [], s)).return = e, e = r;
                                    break e
                                }
                                n(e, r);
                                break
                            }
                            t(e, r), r = r.sibling
                        }(r = So(i, e.mode, s)).return = e,
                        e = r
                    }
                    return a(e)
            }
            if ("string" == typeof i || "number" == typeof i) return i = "" + i, null !== r && 6 === r.tag ? (n(e, r.sibling), (r = o(r, i, s)).return = e, e = r) : (n(e, r), (r = ko(i, e.mode, s)).return = e, e = r), a(e);
            if (si(i)) return y(e, r, i, s);
            if (_t(i)) return v(e, r, i, s);
            if (l && ui(e, i), void 0 === i) switch (e.tag) {
                case 2:
                case 1:
                    f("152", (s = e.type).displayName || s.name || "Component")
            }
            return n(e, r)
        }
    }
    var di = ci(!0),
        fi = ci(!1),
        pi = null,
        hi = null,
        yi = !1;

    function vi(e, t) {
        var n = new _o(5, null, null, 0);
        n.type = "DELETED", n.stateNode = t, n.return = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n
    }

    function mi(e, t) {
        switch (e.tag) {
            case 5:
                var n = e.type;
                return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, !0);
            case 6:
                return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, !0);
            default:
                return !1
        }
    }

    function _i(e) {
        if (yi) {
            var t = hi;
            if (t) {
                var n = t;
                if (!mi(e, t)) {
                    if (!(t = Zr(n)) || !mi(e, t)) return e.effectTag |= 2, yi = !1, void(pi = e);
                    vi(pi, n)
                }
                pi = e, hi = Jr(t)
            } else e.effectTag |= 2, yi = !1, pi = e
        }
    }

    function gi(e) {
        for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag;) e = e.return;
        pi = e
    }

    function wi(e) {
        if (e !== pi) return !1;
        if (!yi) return gi(e), yi = !0, !1;
        var t = e.type;
        if (5 !== e.tag || "head" !== t && "body" !== t && !Xr(t, e.memoizedProps))
            for (t = hi; t;) vi(e, t), t = Zr(t);
        return gi(e), hi = pi ? Zr(e.stateNode) : null, !0
    }

    function bi() {
        hi = pi = null, yi = !1
    }

    function ki(e, t, n) {
        Si(e, t, n, t.expirationTime)
    }

    function Si(e, t, n, r) {
        t.child = null === e ? fi(t, null, n, r) : di(t, e.child, n, r)
    }

    function Ei(e, t) {
        var n = t.ref;
        (null === e && null !== n || null !== e && e.ref !== n) && (t.effectTag |= 128)
    }

    function Ci(e, t, n, r, o) {
        Ei(e, t);
        var i = 0 != (64 & t.effectTag);
        if (!n && !i) return r && mo(t, !1), Oi(e, t);
        n = t.stateNode, it.current = t;
        var a = i ? null : n.render();
        return t.effectTag |= 1, i && (Si(e, t, null, o), t.child = null), Si(e, t, a, o), t.memoizedState = n.state, t.memoizedProps = n.props, r && mo(t, !0), t.child
    }

    function Ti(e) {
        var t = e.stateNode;
        t.pendingContext ? ho(0, t.pendingContext, t.pendingContext !== t.context) : t.context && ho(0, t.context, !1), Jo(e, t.containerInfo)
    }

    function xi(e, t, n, r) {
        var o = e.child;
        for (null !== o && (o.return = e); null !== o;) {
            switch (o.tag) {
                case 12:
                    var i = 0 | o.stateNode;
                    if (o.type === t && 0 != (i & n)) {
                        for (i = o; null !== i;) {
                            var a = i.alternate;
                            if (0 === i.expirationTime || i.expirationTime > r) i.expirationTime = r, null !== a && (0 === a.expirationTime || a.expirationTime > r) && (a.expirationTime = r);
                            else {
                                if (null === a || !(0 === a.expirationTime || a.expirationTime > r)) break;
                                a.expirationTime = r
                            }
                            i = i.return
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
            if (null !== i) i.return = o;
            else
                for (i = o; null !== i;) {
                    if (i === e) {
                        i = null;
                        break
                    }
                    if (null !== (o = i.sibling)) {
                        o.return = i.return, i = o;
                        break
                    }
                    i = i.return
                }
            o = i
        }
    }

    function Oi(e, t) {
        if (null !== e && t.child !== e.child && f("153"), null !== t.child) {
            var n = go(e = t.child, e.pendingProps, e.expirationTime);
            for (t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = go(e, e.pendingProps, e.expirationTime)).return = t;
            n.sibling = null
        }
        return t.child
    }

    function Li(e, t, n) {
        if (0 === t.expirationTime || t.expirationTime > n) {
            switch (t.tag) {
                case 3:
                    Ti(t);
                    break;
                case 2:
                    vo(t);
                    break;
                case 4:
                    Jo(t, t.stateNode.containerInfo);
                    break;
                case 13:
                    Yo(t)
            }
            return null
        }
        switch (t.tag) {
            case 0:
                null !== e && f("155");
                var r = t.type,
                    o = t.pendingProps,
                    i = lo(t);
                return r = r(o, i = uo(t, i)), t.effectTag |= 1, "object" == typeof r && null !== r && "function" == typeof r.render && void 0 === r.$$typeof ? (i = t.type, t.tag = 2, t.memoizedState = null !== r.state && void 0 !== r.state ? r.state : null, "function" == typeof(i = i.getDerivedStateFromProps) && ni(t, i, o), o = vo(t), r.updater = ri, t.stateNode = r, r._reactInternalFiber = t, ai(t, n), e = Ci(e, t, !0, o, n)) : (t.tag = 1, ki(e, t, r), t.memoizedProps = o, e = t.child), e;
            case 1:
                return o = t.type, n = t.pendingProps, ao.current || t.memoizedProps !== n ? (o = o(n, r = uo(t, r = lo(t))), t.effectTag |= 1, ki(e, t, o), t.memoizedProps = n, e = t.child) : e = Oi(e, t), e;
            case 2:
                if (o = vo(t), null === e)
                    if (null === t.stateNode) {
                        var a = t.pendingProps,
                            s = t.type;
                        r = lo(t);
                        var l = 2 === t.tag && null != t.type.contextTypes;
                        a = new s(a, i = l ? uo(t, r) : d), t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null, a.updater = ri, t.stateNode = a, a._reactInternalFiber = t, l && ((l = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = r, l.__reactInternalMemoizedMaskedChildContext = i), ai(t, n), r = !0
                    } else {
                        s = t.type, r = t.stateNode, l = t.memoizedProps, i = t.pendingProps, r.props = l;
                        var u = r.context;
                        a = uo(t, a = lo(t));
                        var c = s.getDerivedStateFromProps;
                        (s = "function" == typeof c || "function" == typeof r.getSnapshotBeforeUpdate) || "function" != typeof r.UNSAFE_componentWillReceiveProps && "function" != typeof r.componentWillReceiveProps || (l !== i || u !== a) && ii(t, r, i, a), Po = !1;
                        var p = t.memoizedState;
                        u = r.state = p;
                        var h = t.updateQueue;
                        null !== h && (Bo(t, h, i, r, n), u = t.memoizedState), l !== i || p !== u || ao.current || Po ? ("function" == typeof c && (ni(t, c, i), u = t.memoizedState), (l = Po || oi(t, l, i, p, u, a)) ? (s || "function" != typeof r.UNSAFE_componentWillMount && "function" != typeof r.componentWillMount || ("function" == typeof r.componentWillMount && r.componentWillMount(), "function" == typeof r.UNSAFE_componentWillMount && r.UNSAFE_componentWillMount()), "function" == typeof r.componentDidMount && (t.effectTag |= 4)) : ("function" == typeof r.componentDidMount && (t.effectTag |= 4), t.memoizedProps = i, t.memoizedState = u), r.props = i, r.state = u, r.context = a, r = l) : ("function" == typeof r.componentDidMount && (t.effectTag |= 4), r = !1)
                    }
                else s = t.type, r = t.stateNode, i = t.memoizedProps, l = t.pendingProps, r.props = i, u = r.context, a = uo(t, a = lo(t)), (s = "function" == typeof(c = s.getDerivedStateFromProps) || "function" == typeof r.getSnapshotBeforeUpdate) || "function" != typeof r.UNSAFE_componentWillReceiveProps && "function" != typeof r.componentWillReceiveProps || (i !== l || u !== a) && ii(t, r, l, a), Po = !1, u = t.memoizedState, p = r.state = u, null !== (h = t.updateQueue) && (Bo(t, h, l, r, n), p = t.memoizedState), i !== l || u !== p || ao.current || Po ? ("function" == typeof c && (ni(t, c, l), p = t.memoizedState), (c = Po || oi(t, i, l, u, p, a)) ? (s || "function" != typeof r.UNSAFE_componentWillUpdate && "function" != typeof r.componentWillUpdate || ("function" == typeof r.componentWillUpdate && r.componentWillUpdate(l, p, a), "function" == typeof r.UNSAFE_componentWillUpdate && r.UNSAFE_componentWillUpdate(l, p, a)), "function" == typeof r.componentDidUpdate && (t.effectTag |= 4), "function" == typeof r.getSnapshotBeforeUpdate && (t.effectTag |= 256)) : ("function" != typeof r.componentDidUpdate || i === e.memoizedProps && u === e.memoizedState || (t.effectTag |= 4), "function" != typeof r.getSnapshotBeforeUpdate || i === e.memoizedProps && u === e.memoizedState || (t.effectTag |= 256), t.memoizedProps = l, t.memoizedState = p), r.props = l, r.state = p, r.context = a, r = c) : ("function" != typeof r.componentDidUpdate || i === e.memoizedProps && u === e.memoizedState || (t.effectTag |= 4), "function" != typeof r.getSnapshotBeforeUpdate || i === e.memoizedProps && u === e.memoizedState || (t.effectTag |= 256), r = !1);
                return Ci(e, t, r, o, n);
            case 3:
                return Ti(t), null !== (o = t.updateQueue) ? (r = null !== (r = t.memoizedState) ? r.element : null, Bo(t, o, t.pendingProps, null, n), (o = t.memoizedState.element) === r ? (bi(), e = Oi(e, t)) : (r = t.stateNode, (r = (null === e || null === e.child) && r.hydrate) && (hi = Jr(t.stateNode.containerInfo), pi = t, r = yi = !0), r ? (t.effectTag |= 2, t.child = fi(t, null, o, n)) : (bi(), ki(e, t, o)), e = t.child)) : (bi(), e = Oi(e, t)), e;
            case 5:
                return Zo(Go.current), (o = Zo(qo.current)) !== (r = Er(o, t.type)) && (oo(Qo, t), oo(qo, r)), null === e && _i(t), o = t.type, l = t.memoizedProps, r = t.pendingProps, i = null !== e ? e.memoizedProps : null, ao.current || l !== r || ((l = 1 & t.mode && !!r.hidden) && (t.expirationTime = 1073741823), l && 1073741823 === n) ? (l = r.children, Xr(o, r) ? l = null : i && Xr(o, i) && (t.effectTag |= 16), Ei(e, t), 1073741823 !== n && 1 & t.mode && r.hidden ? (t.expirationTime = 1073741823, t.memoizedProps = r, e = null) : (ki(e, t, l), t.memoizedProps = r, e = t.child)) : e = Oi(e, t), e;
            case 6:
                return null === e && _i(t), t.memoizedProps = t.pendingProps, null;
            case 16:
                return null;
            case 4:
                return Jo(t, t.stateNode.containerInfo), o = t.pendingProps, ao.current || t.memoizedProps !== o ? (null === e ? t.child = di(t, null, o, n) : ki(e, t, o), t.memoizedProps = o, e = t.child) : e = Oi(e, t), e;
            case 14:
                return o = t.type.render, n = t.pendingProps, r = t.ref, ao.current || t.memoizedProps !== n || r !== (null !== e ? e.ref : null) ? (ki(e, t, o = o(n, r)), t.memoizedProps = n, e = t.child) : e = Oi(e, t), e;
            case 10:
                return n = t.pendingProps, ao.current || t.memoizedProps !== n ? (ki(e, t, n), t.memoizedProps = n, e = t.child) : e = Oi(e, t), e;
            case 11:
                return n = t.pendingProps.children, ao.current || null !== n && t.memoizedProps !== n ? (ki(e, t, n), t.memoizedProps = n, e = t.child) : e = Oi(e, t), e;
            case 15:
                return n = t.pendingProps, t.memoizedProps === n ? e = Oi(e, t) : (ki(e, t, n.children), t.memoizedProps = n, e = t.child), e;
            case 13:
                return function(e, t, n) {
                    var r = t.type._context,
                        o = t.pendingProps,
                        i = t.memoizedProps,
                        a = !0;
                    if (ao.current) a = !1;
                    else if (i === o) return t.stateNode = 0, Yo(t), Oi(e, t);
                    var s = o.value;
                    if (t.memoizedProps = o, null === i) s = 1073741823;
                    else if (i.value === o.value) {
                        if (i.children === o.children && a) return t.stateNode = 0, Yo(t), Oi(e, t);
                        s = 0
                    } else {
                        var l = i.value;
                        if (l === s && (0 !== l || 1 / l == 1 / s) || l != l && s != s) {
                            if (i.children === o.children && a) return t.stateNode = 0, Yo(t), Oi(e, t);
                            s = 0
                        } else if (s = "function" == typeof r._calculateChangedBits ? r._calculateChangedBits(l, s) : 1073741823, 0 == (s |= 0)) {
                            if (i.children === o.children && a) return t.stateNode = 0, Yo(t), Oi(e, t)
                        } else xi(t, r, s, n)
                    }
                    return t.stateNode = s, Yo(t), ki(e, t, o.children), t.child
                }(e, t, n);
            case 12:
                e: if (r = t.type, i = t.pendingProps, l = t.memoizedProps, o = r._currentValue, a = r._changedBits, ao.current || 0 !== a || l !== i) {
                    if (t.memoizedProps = i, void 0 !== (s = i.unstable_observedBits) && null !== s || (s = 1073741823), t.stateNode = s, 0 != (a & s)) xi(t, r, a, n);
                    else if (l === i) {
                        e = Oi(e, t);
                        break e
                    }
                    n = (n = i.children)(o), t.effectTag |= 1, ki(e, t, n), e = t.child
                } else e = Oi(e, t);
                return e;
            default:
                f("156")
        }
    }

    function Pi(e) {
        e.effectTag |= 4
    }
    var Ni = void 0,
        ji = void 0,
        Ri = void 0;

    function Di(e, t) {
        var n = t.pendingProps;
        switch (t.tag) {
            case 1:
                return null;
            case 2:
                return fo(t), null;
            case 3:
                ei(), po();
                var r = t.stateNode;
                return r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), null !== e && null !== e.child || (wi(t), t.effectTag &= -3), Ni(t), null;
            case 5:
                ti(t), r = Zo(Go.current);
                var o = t.type;
                if (null !== e && null != t.stateNode) {
                    var i = e.memoizedProps,
                        a = t.stateNode,
                        s = Zo(qo.current);
                    a = Ur(a, o, i, n, r), ji(e, t, a, o, i, n, r, s), e.ref !== t.ref && (t.effectTag |= 128)
                } else {
                    if (!n) return null === t.stateNode && f("166"), null;
                    if (e = Zo(qo.current), wi(t)) n = t.stateNode, o = t.type, i = t.memoizedProps, n[H] = t, n[z] = i, r = zr(n, o, i, e, r), t.updateQueue = r, null !== r && Pi(t);
                    else {
                        (e = Fr(o, n, r, e))[H] = t, e[z] = n;
                        e: for (i = t.child; null !== i;) {
                            if (5 === i.tag || 6 === i.tag) e.appendChild(i.stateNode);
                            else if (4 !== i.tag && null !== i.child) {
                                i.child.return = i, i = i.child;
                                continue
                            }
                            if (i === t) break;
                            for (; null === i.sibling;) {
                                if (null === i.return || i.return === t) break e;
                                i = i.return
                            }
                            i.sibling.return = i.return, i = i.sibling
                        }
                        Br(e, o, n, r), $r(o, n) && Pi(t), t.stateNode = e
                    }
                    null !== t.ref && (t.effectTag |= 128)
                }
                return null;
            case 6:
                if (e && null != t.stateNode) Ri(e, t, e.memoizedProps, n);
                else {
                    if ("string" != typeof n) return null === t.stateNode && f("166"), null;
                    r = Zo(Go.current), Zo(qo.current), wi(t) ? (r = t.stateNode, n = t.memoizedProps, r[H] = t, Wr(r, n) && Pi(t)) : ((r = Mr(n, r))[H] = t, t.stateNode = r)
                }
                return null;
            case 14:
            case 16:
            case 10:
            case 11:
            case 15:
                return null;
            case 4:
                return ei(), Ni(t), null;
            case 13:
                return $o(t), null;
            case 12:
                return null;
            case 0:
                f("167");
            default:
                f("156")
        }
    }

    function Ii(e, t) {
        var n = t.source;
        null === t.stack && null !== n && wt(n), null !== n && gt(n), t = t.value, null !== e && 2 === e.tag && gt(e);
        try {
            t && t.suppressReactErrorLogging || console.error(t)
        } catch (e) {
            e && e.suppressReactErrorLogging || console.error(e)
        }
    }

    function Ai(e) {
        var t = e.ref;
        if (null !== t)
            if ("function" == typeof t) try {
                t(null)
            } catch (t) {
                da(e, t)
            } else t.current = null
    }

    function Fi(e) {
        switch (Lo(e), e.tag) {
            case 2:
                Ai(e);
                var t = e.stateNode;
                if ("function" == typeof t.componentWillUnmount) try {
                    t.props = e.memoizedProps, t.state = e.memoizedState, t.componentWillUnmount()
                } catch (t) {
                    da(e, t)
                }
                break;
            case 5:
                Ai(e);
                break;
            case 4:
                Ui(e)
        }
    }

    function Mi(e) {
        return 5 === e.tag || 3 === e.tag || 4 === e.tag
    }

    function Bi(e) {
        e: {
            for (var t = e.return; null !== t;) {
                if (Mi(t)) {
                    var n = t;
                    break e
                }
                t = t.return
            }
            f("160"),
            n = void 0
        }
        var r = t = void 0;
        switch (n.tag) {
            case 5:
                t = n.stateNode, r = !1;
                break;
            case 3:
            case 4:
                t = n.stateNode.containerInfo, r = !0;
                break;
            default:
                f("161")
        }
        16 & n.effectTag && (Or(t, ""), n.effectTag &= -17);e: t: for (n = e;;) {
            for (; null === n.sibling;) {
                if (null === n.return || Mi(n.return)) {
                    n = null;
                    break e
                }
                n = n.return
            }
            for (n.sibling.return = n.return, n = n.sibling; 5 !== n.tag && 6 !== n.tag;) {
                if (2 & n.effectTag) continue t;
                if (null === n.child || 4 === n.tag) continue t;
                n.child.return = n, n = n.child
            }
            if (!(2 & n.effectTag)) {
                n = n.stateNode;
                break e
            }
        }
        for (var o = e;;) {
            if (5 === o.tag || 6 === o.tag)
                if (n)
                    if (r) {
                        var i = t,
                            a = o.stateNode,
                            s = n;
                        8 === i.nodeType ? i.parentNode.insertBefore(a, s) : i.insertBefore(a, s)
                    } else t.insertBefore(o.stateNode, n);
            else r ? (i = t, a = o.stateNode, 8 === i.nodeType ? i.parentNode.insertBefore(a, i) : i.appendChild(a)) : t.appendChild(o.stateNode);
            else if (4 !== o.tag && null !== o.child) {
                o.child.return = o, o = o.child;
                continue
            }
            if (o === e) break;
            for (; null === o.sibling;) {
                if (null === o.return || o.return === e) return;
                o = o.return
            }
            o.sibling.return = o.return, o = o.sibling
        }
    }

    function Ui(e) {
        for (var t = e, n = !1, r = void 0, o = void 0;;) {
            if (!n) {
                n = t.return;
                e: for (;;) {
                    switch (null === n && f("160"), n.tag) {
                        case 5:
                            r = n.stateNode, o = !1;
                            break e;
                        case 3:
                        case 4:
                            r = n.stateNode.containerInfo, o = !0;
                            break e
                    }
                    n = n.return
                }
                n = !0
            }
            if (5 === t.tag || 6 === t.tag) {
                e: for (var i = t, a = i;;)
                    if (Fi(a), null !== a.child && 4 !== a.tag) a.child.return = a, a = a.child;
                    else {
                        if (a === i) break;
                        for (; null === a.sibling;) {
                            if (null === a.return || a.return === i) break e;
                            a = a.return
                        }
                        a.sibling.return = a.return, a = a.sibling
                    }o ? (i = r, a = t.stateNode, 8 === i.nodeType ? i.parentNode.removeChild(a) : i.removeChild(a)) : r.removeChild(t.stateNode)
            }
            else if (4 === t.tag ? r = t.stateNode.containerInfo : Fi(t), null !== t.child) {
                t.child.return = t, t = t.child;
                continue
            }
            if (t === e) break;
            for (; null === t.sibling;) {
                if (null === t.return || t.return === e) return;
                4 === (t = t.return).tag && (n = !1)
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }

    function Hi(e, t) {
        switch (t.tag) {
            case 2:
                break;
            case 5:
                var n = t.stateNode;
                if (null != n) {
                    var r = t.memoizedProps;
                    e = null !== e ? e.memoizedProps : r;
                    var o = t.type,
                        i = t.updateQueue;
                    t.updateQueue = null, null !== i && (n[z] = r, Hr(n, i, o, e, r))
                }
                break;
            case 6:
                null === t.stateNode && f("162"), t.stateNode.nodeValue = t.memoizedProps;
                break;
            case 3:
            case 15:
            case 16:
                break;
            default:
                f("163")
        }
    }

    function zi(e, t, n) {
        (n = Ro(n)).tag = 3, n.payload = {
            element: null
        };
        var r = t.value;
        return n.callback = function() {
            Xa(r), Ii(e, t)
        }, n
    }

    function Wi(e, t, n) {
        (n = Ro(n)).tag = 3;
        var r = e.stateNode;
        return null !== r && "function" == typeof r.componentDidCatch && (n.callback = function() {
            null === aa ? aa = new Set([this]) : aa.add(this);
            var n = t.value,
                r = t.stack;
            Ii(e, t), this.componentDidCatch(n, {
                componentStack: null !== r ? r : ""
            })
        }), n
    }

    function Vi(e, t, n, r, o, i) {
        n.effectTag |= 512, n.firstEffect = n.lastEffect = null, r = zo(r, n), e = t;
        do {
            switch (e.tag) {
                case 3:
                    return e.effectTag |= 1024, void Ao(e, r = zi(e, r, i), i);
                case 2:
                    if (t = r, n = e.stateNode, 0 == (64 & e.effectTag) && null !== n && "function" == typeof n.componentDidCatch && (null === aa || !aa.has(n))) return e.effectTag |= 1024, void Ao(e, r = Wi(e, t, i), i)
            }
            e = e.return
        } while (null !== e)
    }

    function Ki(e) {
        switch (e.tag) {
            case 2:
                fo(e);
                var t = e.effectTag;
                return 1024 & t ? (e.effectTag = -1025 & t | 64, e) : null;
            case 3:
                return ei(), po(), 1024 & (t = e.effectTag) ? (e.effectTag = -1025 & t | 64, e) : null;
            case 5:
                return ti(e), null;
            case 16:
                return 1024 & (t = e.effectTag) ? (e.effectTag = -1025 & t | 64, e) : null;
            case 4:
                return ei(), null;
            case 13:
                return $o(e), null;
            default:
                return null
        }
    }
    Ni = function() {}, ji = function(e, t, n) {
        (t.updateQueue = n) && Pi(t)
    }, Ri = function(e, t, n, r) {
        n !== r && Pi(t)
    };
    var Yi = qr(),
        $i = 2,
        Xi = Yi,
        qi = 0,
        Qi = 0,
        Gi = !1,
        Zi = null,
        Ji = null,
        ea = 0,
        ta = -1,
        na = !1,
        ra = null,
        oa = !1,
        ia = !1,
        aa = null;

    function sa() {
        if (null !== Zi)
            for (var e = Zi.return; null !== e;) {
                var t = e;
                switch (t.tag) {
                    case 2:
                        fo(t);
                        break;
                    case 3:
                        ei(), po();
                        break;
                    case 5:
                        ti(t);
                        break;
                    case 4:
                        ei();
                        break;
                    case 13:
                        $o(t)
                }
                e = e.return
            }
        Ji = null, ea = 0, ta = -1, na = !1, Zi = null, ia = !1
    }

    function la(e) {
        for (;;) {
            var t = e.alternate,
                n = e.return,
                r = e.sibling;
            if (0 == (512 & e.effectTag)) {
                t = Di(t, e);
                var o = e;
                if (1073741823 === ea || 1073741823 !== o.expirationTime) {
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
                if (null !== n && 0 == (512 & n.effectTag) && (null === n.firstEffect && (n.firstEffect = e.firstEffect), null !== e.lastEffect && (null !== n.lastEffect && (n.lastEffect.nextEffect = e.firstEffect), n.lastEffect = e.lastEffect), 1 < e.effectTag && (null !== n.lastEffect ? n.lastEffect.nextEffect = e : n.firstEffect = e, n.lastEffect = e)), null !== r) return r;
                if (null === n) {
                    ia = !0;
                    break
                }
                e = n
            } else {
                if (null !== (e = Ki(e))) return e.effectTag &= 511, e;
                if (null !== n && (n.firstEffect = n.lastEffect = null, n.effectTag |= 512), null !== r) return r;
                if (null === n) break;
                e = n
            }
        }
        return null
    }

    function ua(e) {
        var t = Li(e.alternate, e, ea);
        return null === t && (t = la(e)), it.current = null, t
    }

    function ca(e, t, n) {
        Gi && f("243"), Gi = !0, t === ea && e === Ji && null !== Zi || (sa(), ea = t, ta = -1, Zi = go((Ji = e).current, null, ea), e.pendingCommitExpirationTime = 0);
        var r = !1;
        for (na = !n || ea <= $i;;) {
            try {
                if (n)
                    for (; null !== Zi && !$a();) Zi = ua(Zi);
                else
                    for (; null !== Zi;) Zi = ua(Zi)
            } catch (t) {
                if (null === Zi) r = !0, Xa(t);
                else {
                    null === Zi && f("271");
                    var o = (n = Zi).return;
                    if (null === o) {
                        r = !0, Xa(t);
                        break
                    }
                    Vi(e, o, n, t, 0, ea), Zi = la(n)
                }
            }
            break
        }
        if (Gi = !1, r) return null;
        if (null === Zi) {
            if (ia) return e.pendingCommitExpirationTime = t, e.current.alternate;
            na && f("262"), 0 <= ta && setTimeout(function() {
                    var t = e.current.expirationTime;
                    0 !== t && (0 === e.remainingExpirationTime || e.remainingExpirationTime < t) && Ma(e, t)
                }, ta),
                function(e) {
                    null === Sa && f("246"), Sa.remainingExpirationTime = e
                }(e.current.expirationTime)
        }
        return null
    }

    function da(e, t) {
        var n;
        e: {
            for (Gi && !oa && f("263"), n = e.return; null !== n;) {
                switch (n.tag) {
                    case 2:
                        var r = n.stateNode;
                        if ("function" == typeof n.type.getDerivedStateFromCatch || "function" == typeof r.componentDidCatch && (null === aa || !aa.has(r))) {
                            Io(n, e = Wi(n, e = zo(t, e), 1), 1), ha(n, 1), n = void 0;
                            break e
                        }
                        break;
                    case 3:
                        Io(n, e = zi(n, e = zo(t, e), 1), 1), ha(n, 1), n = void 0;
                        break e
                }
                n = n.return
            }
            3 === e.tag && (Io(e, n = zi(e, n = zo(t, e), 1), 1), ha(e, 1)),
            n = void 0
        }
        return n
    }

    function fa() {
        var e = 2 + 25 * (1 + ((ya() - 2 + 500) / 25 | 0));
        return e <= qi && (e = qi + 1), qi = e
    }

    function pa(e, t) {
        return e = 0 !== Qi ? Qi : Gi ? oa ? 1 : ea : 1 & t.mode ? ja ? 2 + 10 * (1 + ((e - 2 + 15) / 10 | 0)) : 2 + 25 * (1 + ((e - 2 + 500) / 25 | 0)) : 1, ja && (0 === Ca || e > Ca) && (Ca = e), e
    }

    function ha(e, t) {
        for (; null !== e;) {
            if ((0 === e.expirationTime || e.expirationTime > t) && (e.expirationTime = t), null !== e.alternate && (0 === e.alternate.expirationTime || e.alternate.expirationTime > t) && (e.alternate.expirationTime = t), null === e.return) {
                if (3 !== e.tag) break;
                var n = e.stateNode;
                !Gi && 0 !== ea && t < ea && sa();
                var r = n.current.expirationTime;
                Gi && !oa && Ji === n || Ma(n, r), Ia > Da && f("185")
            }
            e = e.return
        }
    }

    function ya() {
        return Xi = qr() - Yi, $i = 2 + (Xi / 10 | 0)
    }

    function va(e) {
        var t = Qi;
        Qi = 2 + 25 * (1 + ((ya() - 2 + 500) / 25 | 0));
        try {
            return e()
        } finally {
            Qi = t
        }
    }

    function ma(e, t, n, r, o) {
        var i = Qi;
        Qi = 1;
        try {
            return e(t, n, r, o)
        } finally {
            Qi = i
        }
    }
    var _a = null,
        ga = null,
        wa = 0,
        ba = -1,
        ka = !1,
        Sa = null,
        Ea = 0,
        Ca = 0,
        Ta = !1,
        xa = !1,
        Oa = null,
        La = null,
        Pa = !1,
        Na = !1,
        ja = !1,
        Ra = null,
        Da = 1e3,
        Ia = 0,
        Aa = 1;

    function Fa(e) {
        if (0 !== wa) {
            if (e > wa) return;
            Gr(ba)
        }
        var t = qr() - Yi;
        wa = e, ba = Qr(Ua, {
            timeout: 10 * (e - 2) - t
        })
    }

    function Ma(e, t) {
        if (null === e.nextScheduledRoot) e.remainingExpirationTime = t, null === ga ? (_a = ga = e, e.nextScheduledRoot = e) : (ga = ga.nextScheduledRoot = e).nextScheduledRoot = _a;
        else {
            var n = e.remainingExpirationTime;
            (0 === n || t < n) && (e.remainingExpirationTime = t)
        }
        ka || (Pa ? Na && (Sa = e, Ea = 1, Ka(e, 1, !1)) : 1 === t ? Ha() : Fa(t))
    }

    function Ba() {
        var e = 0,
            t = null;
        if (null !== ga)
            for (var n = ga, r = _a; null !== r;) {
                var o = r.remainingExpirationTime;
                if (0 === o) {
                    if ((null === n || null === ga) && f("244"), r === r.nextScheduledRoot) {
                        _a = ga = r.nextScheduledRoot = null;
                        break
                    }
                    if (r === _a) _a = o = r.nextScheduledRoot, ga.nextScheduledRoot = o, r.nextScheduledRoot = null;
                    else {
                        if (r === ga) {
                            (ga = n).nextScheduledRoot = _a, r.nextScheduledRoot = null;
                            break
                        }
                        n.nextScheduledRoot = r.nextScheduledRoot, r.nextScheduledRoot = null
                    }
                    r = n.nextScheduledRoot
                } else {
                    if ((0 === e || o < e) && (e = o, t = r), r === ga) break;
                    n = r, r = r.nextScheduledRoot
                }
            }
        null !== (n = Sa) && n === t && 1 === e ? Ia++ : Ia = 0, Sa = t, Ea = e
    }

    function Ua(e) {
        za(0, !0, e)
    }

    function Ha() {
        za(1, !1, null)
    }

    function za(e, t, n) {
        if (La = n, Ba(), t)
            for (; null !== Sa && 0 !== Ea && (0 === e || e >= Ea) && (!Ta || ya() >= Ea);) ya(), Ka(Sa, Ea, !Ta), Ba();
        else
            for (; null !== Sa && 0 !== Ea && (0 === e || e >= Ea);) Ka(Sa, Ea, !1), Ba();
        null !== La && (wa = 0, ba = -1), 0 !== Ea && Fa(Ea), La = null, Ta = !1, Va()
    }

    function Wa(e, t) {
        ka && f("253"), Sa = e, Ea = t, Ka(e, t, !1), Ha(), Va()
    }

    function Va() {
        if (Ia = 0, null !== Ra) {
            var e = Ra;
            Ra = null;
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                try {
                    n._onComplete()
                } catch (e) {
                    xa || (xa = !0, Oa = e)
                }
            }
        }
        if (xa) throw e = Oa, Oa = null, xa = !1, e
    }

    function Ka(e, t, n) {
        ka && f("245"), ka = !0, n ? null !== (n = e.finishedWork) ? Ya(e, n, t) : (e.finishedWork = null, null !== (n = ca(e, t, !0)) && ($a() ? e.finishedWork = n : Ya(e, n, t))) : null !== (n = e.finishedWork) ? Ya(e, n, t) : (e.finishedWork = null, null !== (n = ca(e, t, !1)) && Ya(e, n, t)), ka = !1
    }

    function Ya(e, t, n) {
        var r = e.firstBatch;
        if (null !== r && r._expirationTime <= n && (null === Ra ? Ra = [r] : Ra.push(r), r._defer)) return e.finishedWork = t, void(e.remainingExpirationTime = 0);
        if (e.finishedWork = null, oa = Gi = !0, (n = t.stateNode).current === t && f("177"), 0 === (r = n.pendingCommitExpirationTime) && f("261"), n.pendingCommitExpirationTime = 0, ya(), it.current = null, 1 < t.effectTag)
            if (null !== t.lastEffect) {
                t.lastEffect.nextEffect = t;
                var o = t.firstEffect
            } else o = t;
        else o = t.firstEffect;
        Kr = Ln;
        var i = l();
        if (zn(i)) {
            if ("selectionStart" in i) var a = {
                start: i.selectionStart,
                end: i.selectionEnd
            };
            else e: {
                var s = window.getSelection && window.getSelection();
                if (s && 0 !== s.rangeCount) {
                    a = s.anchorNode;
                    var u = s.anchorOffset,
                        d = s.focusNode;
                    s = s.focusOffset;
                    try {
                        a.nodeType, d.nodeType
                    } catch (e) {
                        a = null;
                        break e
                    }
                    var p = 0,
                        h = -1,
                        y = -1,
                        v = 0,
                        m = 0,
                        _ = i,
                        g = null;
                    t: for (;;) {
                        for (var w; _ !== a || 0 !== u && 3 !== _.nodeType || (h = p + u), _ !== d || 0 !== s && 3 !== _.nodeType || (y = p + s), 3 === _.nodeType && (p += _.nodeValue.length), null !== (w = _.firstChild);) g = _, _ = w;
                        for (;;) {
                            if (_ === i) break t;
                            if (g === a && ++v === u && (h = p), g === d && ++m === s && (y = p), null !== (w = _.nextSibling)) break;
                            g = (_ = g).parentNode
                        }
                        _ = w
                    }
                    a = -1 === h || -1 === y ? null : {
                        start: h,
                        end: y
                    }
                } else a = null
            }
            a = a || {
                start: 0,
                end: 0
            }
        } else a = null;
        for (Yr = {
                focusedElem: i,
                selectionRange: a
            }, Pn(!1), ra = o; null !== ra;) {
            i = !1, a = void 0;
            try {
                for (; null !== ra;) {
                    if (256 & ra.effectTag) {
                        var b = ra.alternate;
                        switch ((u = ra).tag) {
                            case 2:
                                if (256 & u.effectTag && null !== b) {
                                    var k = b.memoizedProps,
                                        S = b.memoizedState,
                                        E = u.stateNode;
                                    E.props = u.memoizedProps, E.state = u.memoizedState;
                                    var C = E.getSnapshotBeforeUpdate(k, S);
                                    E.__reactInternalSnapshotBeforeUpdate = C
                                }
                                break;
                            case 3:
                            case 5:
                            case 6:
                            case 4:
                                break;
                            default:
                                f("163")
                        }
                    }
                    ra = ra.nextEffect
                }
            } catch (e) {
                i = !0, a = e
            }
            i && (null === ra && f("178"), da(ra, a), null !== ra && (ra = ra.nextEffect))
        }
        for (ra = o; null !== ra;) {
            b = !1, k = void 0;
            try {
                for (; null !== ra;) {
                    var T = ra.effectTag;
                    if (16 & T && Or(ra.stateNode, ""), 128 & T) {
                        var x = ra.alternate;
                        if (null !== x) {
                            var O = x.ref;
                            null !== O && ("function" == typeof O ? O(null) : O.current = null)
                        }
                    }
                    switch (14 & T) {
                        case 2:
                            Bi(ra), ra.effectTag &= -3;
                            break;
                        case 6:
                            Bi(ra), ra.effectTag &= -3, Hi(ra.alternate, ra);
                            break;
                        case 4:
                            Hi(ra.alternate, ra);
                            break;
                        case 8:
                            Ui(S = ra), S.return = null, S.child = null, S.alternate && (S.alternate.child = null, S.alternate.return = null)
                    }
                    ra = ra.nextEffect
                }
            } catch (e) {
                b = !0, k = e
            }
            b && (null === ra && f("178"), da(ra, k), null !== ra && (ra = ra.nextEffect))
        }
        if (O = Yr, x = l(), T = O.focusedElem, b = O.selectionRange, x !== T && c(document.documentElement, T)) {
            zn(T) && (x = b.start, void 0 === (O = b.end) && (O = x), "selectionStart" in T ? (T.selectionStart = x, T.selectionEnd = Math.min(O, T.value.length)) : window.getSelection && (x = window.getSelection(), k = T[he()].length, O = Math.min(b.start, k), b = void 0 === b.end ? O : Math.min(b.end, k), !x.extend && O > b && (k = b, b = O, O = k), k = Hn(T, O), S = Hn(T, b), k && S && (1 !== x.rangeCount || x.anchorNode !== k.node || x.anchorOffset !== k.offset || x.focusNode !== S.node || x.focusOffset !== S.offset) && ((E = document.createRange()).setStart(k.node, k.offset), x.removeAllRanges(), O > b ? (x.addRange(E), x.extend(S.node, S.offset)) : (E.setEnd(S.node, S.offset), x.addRange(E))))), x = [];
            for (O = T; O = O.parentNode;) 1 === O.nodeType && x.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
            });
            for (T.focus(), T = 0; T < x.length; T++)(O = x[T]).element.scrollLeft = O.left, O.element.scrollTop = O.top
        }
        for (Yr = null, Pn(Kr), Kr = null, n.current = t, ra = o; null !== ra;) {
            o = !1, T = void 0;
            try {
                for (x = r; null !== ra;) {
                    var L = ra.effectTag;
                    if (36 & L) {
                        var P = ra.alternate;
                        switch (b = x, (O = ra).tag) {
                            case 2:
                                var N = O.stateNode;
                                if (4 & O.effectTag)
                                    if (null === P) N.props = O.memoizedProps, N.state = O.memoizedState, N.componentDidMount();
                                    else {
                                        var j = P.memoizedProps,
                                            R = P.memoizedState;
                                        N.props = O.memoizedProps, N.state = O.memoizedState, N.componentDidUpdate(j, R, N.__reactInternalSnapshotBeforeUpdate)
                                    }
                                var D = O.updateQueue;
                                null !== D && (N.props = O.memoizedProps, N.state = O.memoizedState, Ho(O, D, N));
                                break;
                            case 3:
                                var I = O.updateQueue;
                                if (null !== I) {
                                    if (k = null, null !== O.child) switch (O.child.tag) {
                                        case 5:
                                            k = O.child.stateNode;
                                            break;
                                        case 2:
                                            k = O.child.stateNode
                                    }
                                    Ho(O, I, k)
                                }
                                break;
                            case 5:
                                var A = O.stateNode;
                                null === P && 4 & O.effectTag && $r(O.type, O.memoizedProps) && A.focus();
                                break;
                            case 6:
                            case 4:
                            case 15:
                            case 16:
                                break;
                            default:
                                f("163")
                        }
                    }
                    if (128 & L) {
                        O = void 0;
                        var F = ra.ref;
                        if (null !== F) {
                            var M = ra.stateNode;
                            switch (ra.tag) {
                                case 5:
                                    O = M;
                                    break;
                                default:
                                    O = M
                            }
                            "function" == typeof F ? F(O) : F.current = O
                        }
                    }
                    var B = ra.nextEffect;
                    ra.nextEffect = null, ra = B
                }
            } catch (e) {
                o = !0, T = e
            }
            o && (null === ra && f("178"), da(ra, T), null !== ra && (ra = ra.nextEffect))
        }
        Gi = oa = !1, Oo(t.stateNode), 0 === (t = n.current.expirationTime) && (aa = null), e.remainingExpirationTime = t
    }

    function $a() {
        return !(null === La || La.timeRemaining() > Aa) && (Ta = !0)
    }

    function Xa(e) {
        null === Sa && f("246"), Sa.remainingExpirationTime = 0, xa || (xa = !0, Oa = e)
    }

    function qa(e, t) {
        var n = Pa;
        Pa = !0;
        try {
            return e(t)
        } finally {
            (Pa = n) || ka || Ha()
        }
    }

    function Qa(e, t) {
        if (Pa && !Na) {
            Na = !0;
            try {
                return e(t)
            } finally {
                Na = !1
            }
        }
        return e(t)
    }

    function Ga(e, t) {
        ka && f("187");
        var n = Pa;
        Pa = !0;
        try {
            return ma(e, t)
        } finally {
            Pa = n, Ha()
        }
    }

    function Za(e) {
        var t = Pa;
        Pa = !0;
        try {
            ma(e)
        } finally {
            (Pa = t) || ka || za(1, !1, null)
        }
    }

    function Ja(e, t, n, r, o) {
        var i = t.current;
        if (n) {
            var a;
            n = n._reactInternalFiber;
            e: {
                for (2 === an(n) && 2 === n.tag || f("170"), a = n; 3 !== a.tag;) {
                    if (co(a)) {
                        a = a.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }(a = a.return) || f("171")
                }
                a = a.stateNode.context
            }
            n = co(n) ? yo(n, a) : a
        } else n = d;
        return null === t.context ? t.context = n : t.pendingContext = n, t = o, (o = Ro(r)).payload = {
            element: e
        }, null !== (t = void 0 === t ? null : t) && (o.callback = t), Io(i, o, r), ha(i, r), r
    }

    function es(e) {
        var t = e._reactInternalFiber;
        return void 0 === t && ("function" == typeof e.render ? f("188") : f("268", Object.keys(e))), null === (e = un(t)) ? null : e.stateNode
    }

    function ts(e, t, n, r) {
        var o = t.current;
        return Ja(e, t, n, o = pa(ya(), o), r)
    }

    function ns(e) {
        if (!(e = e.current).child) return null;
        switch (e.child.tag) {
            case 5:
            default:
                return e.child.stateNode
        }
    }

    function rs(e) {
        var t = e.findFiberByHostInstance;
        return function(e) {
            if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
            var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (t.isDisabled || !t.supportsFiber) return !0;
            try {
                var n = t.inject(e);
                Co = xo(function(e) {
                    return t.onCommitFiberRoot(n, e)
                }), To = xo(function(e) {
                    return t.onCommitFiberUnmount(n, e)
                })
            } catch (e) {}
            return !0
        }(a({}, e, {
            findHostInstanceByFiber: function(e) {
                return null === (e = un(e)) ? null : e.stateNode
            },
            findFiberByHostInstance: function(e) {
                return t ? t(e) : null
            }
        }))
    }
    var os = qa,
        is = function(e, t, n) {
            if (ja) return e(t, n);
            Pa || ka || 0 === Ca || (za(Ca, !1, null), Ca = 0);
            var r = ja,
                o = Pa;
            Pa = ja = !0;
            try {
                return e(t, n)
            } finally {
                ja = r, (Pa = o) || ka || Ha()
            }
        },
        as = function() {
            ka || 0 === Ca || (za(Ca, !1, null), Ca = 0)
        };

    function ss(e) {
        this._expirationTime = fa(), this._root = e, this._callbacks = this._next = null, this._hasChildren = this._didComplete = !1, this._children = null, this._defer = !0
    }

    function ls() {
        this._callbacks = null, this._didCommit = !1, this._onCommit = this._onCommit.bind(this)
    }

    function us(e, t, n) {
        this._internalRoot = Eo(e, t, n)
    }

    function cs(e) {
        return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    }

    function ds(e, t, n, r, o) {
        cs(n) || f("200");
        var i = n._reactRootContainer;
        if (i) {
            if ("function" == typeof o) {
                var a = o;
                o = function() {
                    var e = ns(i._internalRoot);
                    a.call(e)
                }
            }
            null != e ? i.legacy_renderSubtreeIntoContainer(e, t, o) : i.render(t, o)
        } else {
            if (i = n._reactRootContainer = function(e, t) {
                    if (t || (t = !(!(t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))), !t)
                        for (var n; n = e.lastChild;) e.removeChild(n);
                    return new us(e, !1, t)
                }(n, r), "function" == typeof o) {
                var s = o;
                o = function() {
                    var e = ns(i._internalRoot);
                    s.call(e)
                }
            }
            Qa(function() {
                null != e ? i.legacy_renderSubtreeIntoContainer(e, t, o) : i.render(t, o)
            })
        }
        return ns(i._internalRoot)
    }

    function fs(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        return cs(t) || f("200"),
            function(e, t, n) {
                var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                return {
                    $$typeof: lt,
                    key: null == r ? null : "" + r,
                    children: e,
                    containerInfo: t,
                    implementation: n
                }
            }(e, t, null, n)
    }
    Be.injectFiberControlledHostComponent(Vr), ss.prototype.render = function(e) {
        this._defer || f("250"), this._hasChildren = !0, this._children = e;
        var t = this._root._internalRoot,
            n = this._expirationTime,
            r = new ls;
        return Ja(e, t, null, n, r._onCommit), r
    }, ss.prototype.then = function(e) {
        if (this._didComplete) e();
        else {
            var t = this._callbacks;
            null === t && (t = this._callbacks = []), t.push(e)
        }
    }, ss.prototype.commit = function() {
        var e = this._root._internalRoot,
            t = e.firstBatch;
        if (this._defer && null !== t || f("251"), this._hasChildren) {
            var n = this._expirationTime;
            if (t !== this) {
                this._hasChildren && (n = this._expirationTime = t._expirationTime, this.render(this._children));
                for (var r = null, o = t; o !== this;) r = o, o = o._next;
                null === r && f("251"), r._next = o._next, this._next = t, e.firstBatch = this
            }
            this._defer = !1, Wa(e, n), t = this._next, this._next = null, null !== (t = e.firstBatch = t) && t._hasChildren && t.render(t._children)
        } else this._next = null, this._defer = !1
    }, ss.prototype._onComplete = function() {
        if (!this._didComplete) {
            this._didComplete = !0;
            var e = this._callbacks;
            if (null !== e)
                for (var t = 0; t < e.length; t++)(0, e[t])()
        }
    }, ls.prototype.then = function(e) {
        if (this._didCommit) e();
        else {
            var t = this._callbacks;
            null === t && (t = this._callbacks = []), t.push(e)
        }
    }, ls.prototype._onCommit = function() {
        if (!this._didCommit) {
            this._didCommit = !0;
            var e = this._callbacks;
            if (null !== e)
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    "function" != typeof n && f("191", n), n()
                }
        }
    }, us.prototype.render = function(e, t) {
        var n = this._internalRoot,
            r = new ls;
        return null !== (t = void 0 === t ? null : t) && r.then(t), ts(e, n, null, r._onCommit), r
    }, us.prototype.unmount = function(e) {
        var t = this._internalRoot,
            n = new ls;
        return null !== (e = void 0 === e ? null : e) && n.then(e), ts(null, t, null, n._onCommit), n
    }, us.prototype.legacy_renderSubtreeIntoContainer = function(e, t, n) {
        var r = this._internalRoot,
            o = new ls;
        return null !== (n = void 0 === n ? null : n) && o.then(n), ts(t, r, e, o._onCommit), o
    }, us.prototype.createBatch = function() {
        var e = new ss(this),
            t = e._expirationTime,
            n = this._internalRoot,
            r = n.firstBatch;
        if (null === r) n.firstBatch = e, e._next = null;
        else {
            for (n = null; null !== r && r._expirationTime <= t;) n = r, r = r._next;
            e._next = r, null !== n && (n._next = e)
        }
        return e
    }, $e = os, Xe = is, qe = as;
    var ps = {
        createPortal: fs,
        findDOMNode: function(e) {
            return null == e ? null : 1 === e.nodeType ? e : es(e)
        },
        hydrate: function(e, t, n) {
            return ds(null, e, t, !0, n)
        },
        render: function(e, t, n) {
            return ds(null, e, t, !1, n)
        },
        unstable_renderSubtreeIntoContainer: function(e, t, n, r) {
            return (null == e || void 0 === e._reactInternalFiber) && f("38"), ds(e, t, n, !1, r)
        },
        unmountComponentAtNode: function(e) {
            return cs(e) || f("40"), !!e._reactRootContainer && (Qa(function() {
                ds(null, null, e, !1, function() {
                    e._reactRootContainer = null
                })
            }), !0)
        },
        unstable_createPortal: function() {
            return fs.apply(void 0, arguments)
        },
        unstable_batchedUpdates: qa,
        unstable_deferredUpdates: va,
        flushSync: Ga,
        unstable_flushControlled: Za,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
            EventPluginHub: B,
            EventPluginRegistry: E,
            EventPropagators: ne,
            ReactControlledComponent: Ye,
            ReactDOMComponentTree: Y,
            ReactDOMEventListener: In
        },
        unstable_createRoot: function(e, t) {
            return new us(e, !0, null != t && !0 === t.hydrate)
        }
    };
    rs({
        findFiberByHostInstance: W,
        bundleType: 0,
        version: "16.4.0",
        rendererPackageName: "react-dom"
    });
    var hs = {
            default: ps
        },
        ys = hs && ps || hs;
    e.exports = ys.default ? ys.default : ys
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(167),
        o = n(137);
    var i = function(e) {
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
        }, t.prototype.getContainer = function() {
            return this.video || this.render()
        }, t.prototype.getImage = function() {
            var e = getSize(this.video),
                t = ce("canvas", {
                    width: e[0],
                    height: e[1]
                });
            return t.getContext("2d").drawImage(this.video, 0, 0, e[0], e[1]), t.toDataURL()
        }, t.prototype.destroy = function() {
            e.prototype.destroy.call(this), removeEvent(this.video), delete this.video
        }, t.prototype.play = function() {
            var t = this;
            if (e.prototype.play.call(this), this.loaded && this.video) {
                var n = this.video.play();
                void 0 !== n && n.catch(function(e) {
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
            this.video.volume = o.getVolume()
        }, t
    }(r.default);
    t.default = i
}, , function(e, t, n) {
    e.exports = n(80)
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(11);
    var o = function(e) {
        function t(n, r) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var o = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this, n, r));
            return o.startTs = 0, o.pauseTime = 0, o
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
            var t = this;
            if (e.prototype.render.call(this), this.photo) return this.photo;
            var n = this.data,
                o = n.photo_url,
                i = n.narrative;
            return this.photo = ce("div", {
                className: "stories_photo"
            }), this._isFailed() ? this.photo : (Object(r.loadMedia)(o).then(function(e) {
                t.photo && (i && i.is_cover ? (addClass(t.photo, "stories_narrative_cover"), t.photo.innerHTML = t.renderNarrativeCover(e)) : setStyle(t.photo, "backgroundImage", "url(" + e + ")"), t._onCanPlay())
            }).catch(function() {
                t._loadingError()
            }), this.photo)
        }, t.prototype.getContainer = function() {
            return this.photo || this.render()
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
            return 5e3
        }, t.prototype._onCanPlay = function() {
            this.startTs = Date.now(), e.prototype._onCanPlay.call(this), setStyle(this.photo, "opacity", 1)
        }, t
    }(n(167).default);
    t.default = o
}, , , , , function(e, t, n) {
    "use strict";
    var r = n(125),
        o = n(3),
        i = n(45);
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
}, , , function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "parseLatin", function() {
        return i
    }), n.d(t, "parseCyr", function() {
        return a
    }), n.d(t, "parseLatKeys", function() {
        return s
    }), n.d(t, "langNumeric", function() {
        return l
    }), n.d(t, "langSex", function() {
        return u
    }), n.d(t, "langStr", function() {
        return c
    }), n.d(t, "addLangKeys", function() {
        return d
    }), n.d(t, "getLang", function() {
        return f
    }), n.d(t, "langDate", function() {
        return p
    }), n.d(t, "getShortDate", function() {
        return h
    }), n.d(t, "getShortDateOrTime", function() {
        return y
    }), n.d(t, "langWordNumeric", function() {
        return v
    }), n.d(t, "getDateText", function() {
        return m
    }), n.d(t, "getBigDateNew", function() {
        return _
    }), n.d(t, "getSmDate", function() {
        return g
    });
    var r = n(99),
        o = n(4);

    function i(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = e, o = 0, i = t.length; o < i; o++) r = r.split(t[o]).join(n[o]);
        for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, l = a.length; s < l; s++) r = r.split(a.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
        return r === e ? null : r
    }

    function a(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", o = e, i = 0; i < n.length; i++) o = o.split(n[i]).join(t[i]);
        for (var a = 0; a < r.length; a++) o = o.split(r.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
        return o === e ? null : o
    }

    function s(e) {
        for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, r = 0; r < t.length; r++) n = n.split(t.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
        return n == e ? null : n
    }

    function l(e, t, n) {
        if (!t || !window.langConfig) return e;
        var r = void 0;
        if (Object(o.isArray)(t) ? (r = t[1], e != Math.floor(e) ? r = t[langConfig.numRules.float] : Object(o.each)(langConfig.numRules.int, function(n, i) {
                if ("*" == i[0]) return r = t[i[2]], !1;
                var a = i[0] ? e % i[0] : e;
                return -1 != Object(o.indexOf)(i[1], a) ? (r = t[i[2]], !1) : void 0
            })) : r = t, n) {
            for (var i = e.toString().split("."), a = [], s = i[0].length - 3; s > -3; s -= 3) a.unshift(i[0].slice(s > 0 ? s : 0, s + 3));
            i[0] = a.join(langConfig.numDel), e = i.join(langConfig.numDec)
        }
        return r = (r || "%s").replace("%s", e)
    }

    function u(e, t) {
        if (!Object(o.isArray)(t)) return t;
        var n = t[1];
        return window.langConfig ? (Object(o.each)(langConfig.sexRules, function(r, o) {
            return "*" == o[0] ? (n = t[o[1]], !1) : e == o[0] && t[o[1]] ? (n = t[o[1]], !1) : void 0
        }), n) : n
    }

    function c(e) {
        for (var t = arguments, n = t.length, r = e + "", o = 1; o < n; o += 2) {
            var i = "%" === t[o][0] ? t[o] : "{" + t[o] + "}";
            r = r.replace(i, t[o + 1])
        }
        return r
    }

    function d(e, t) {
        var n = t ? window : window.cur;
        n.lang ? Object(o.extend)(n.lang, e) : n.lang = e
    }

    function f() {
        try {
            var e = Array.from(arguments),
                t = e.shift();
            if (!t) return "...";
            var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!n) {
                var r = t.split("_");
                return r.shift(), r.join(" ")
            }
            return Object(o.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(o.isArray)(n) || "raw" === e[0] ? n : l(e[0], n, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function p(e, t, n, i, a, s) {
        var l = void 0;
        if (s || (s = ""), Object(o.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, l = new Date(e)) : l = e, a) t = t[1];
        else {
            var u = "";
            !(u = Object(r.isToday)(l) ? t[3] : Object(r.isYesterday)(l) ? t[2] : Object(r.isTomorrow)(l) ? t[4] : t[1]) && t[1] && (u = t[1]), t = u
        }
        var c = {
                hours: l.getHours(),
                minutes: l.getMinutes(),
                seconds: l.getSeconds(),
                day: l.getDate(),
                month: l.getMonth() + 1,
                year: l.getFullYear()
            },
            d = "";
        switch (3 === vk.lang && (d = l.getHours() > 11 ? "pm" : "am", c.hours = l.getHours() % 12 == 0 ? 12 : l.getHours() % 12), vk.lang) {
            case 1:
                switch (l.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !Object(r.isToday)(l) || Object(r.isYesterday)(l) || Object(r.isTomorrow)(l) || (t = s + t);
                break;
            case 12:
            case 73:
                1 == l.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (c.year = c.year + 543), t.replace("{hour}", c.hours).replace("{num_hour}", Object(r.leadingZero)(c.hours)).replace("{minute}", Object(r.leadingZero)(c.minutes)).replace("{day}", c.day).replace("{num_day}", Object(r.leadingZero)(c.day)).replace("{month}", i[c.month]).replace("{year}", c.year).replace("{short_year}", c.year % 100).replace("{second}", Object(r.leadingZero)(c.seconds)).replace("{am_pm}", d)
    }

    function h(e, t, n, r, o) {
        e *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = f("months_of", "raw")), t *= 1e3;
        var i = Date.now(),
            a = new Date(i),
            s = new Date(e + t);
        return !o && e > i && e - i < 864e5 && a.getDate() === s.getDate() ? p(e, "{hour}:{minute} {am_pm}", t, [], !n) : s.getYear() !== a.getYear() || e < i - 157248e5 ? p(e, f("global_date", "raw"), t, r, !n) : p(e, f("global_short_date", "raw"), t, r, !n)
    }

    function y(e, t, n, o) {
        return Object(r.isToday)(new Date(1e3 * e + 1e3 * t)) ? p(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : h(e, t, n, o)
    }

    function v(e, t, n) {
        return Object(o.isArray)(t) && e < t.length ? t[e] : l(e, n)
    }

    function m(e, t) {
        e += t;
        var n = parseInt(Date.now() / 1e3) - e,
            r = "";
        if (n < 60) r = f("global_just_now");
        else if (n < 3600) {
            r = v(Object(o.intval)(n / 60), f("global_word_mins_ago", "raw"), f("global_mins_ago", "raw"))
        } else if (n < 14400) {
            r = v(Object(o.intval)(n / 3600), f("global_word_hours_ago", "raw"), f("global_hours_ago", "raw"))
        } else r = _(e, 0, !0, "_l");
        return r
    }

    function _(e, t, n, r) {
        void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === r && (r = ""), t *= 1e3;
        var o = new Date(1e3 * e),
            i = new Date;
        return o.getFullYear() !== i.getFullYear() && o.getTime() < i.getTime() - 1728e5 || Math.abs(o.getTime() - i.getTime()) > 157248e5 ? p(1e3 * e, f("global_date", "raw"), t, f("months_sm_of"), !n) : p(1e3 * e, f("global_short_date_time" + r, "raw"), t, f("months_sm_of"), !n)
    }

    function g(e, t, n) {
        void 0 === n && (n = !0), void 0 === t && (t = 0);
        var r = new Date,
            o = r.getFullYear(),
            i = r.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            l = a.getMonth();
        return p(1e3 * e, f(s < o && (i > 1 || l < 9 || o - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, f("months_sm_of", "raw"), !n)
    }
    window.parseLatin = i, window.parseCyr = a, window.parseLatKeys = s, window.langNumeric = l, window.langSex = u, window.langStr = c, window.addLangKeys = d, window.getLang = f, window.langDate = p, window.getShortDate = h, window.getShortDateOrTime = y, window.langWordNumeric = v, window.getDateText = m, window.getBigDateNew = _, window.getSmDate = g
}, function(e, t) {
    var n, r, o = e.exports = {};

    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }! function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
            n = i
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            r = a
        }
    }();
    var l, u = [],
        c = !1,
        d = -1;

    function f() {
        c && l && (c = !1, l.length ? u = l.concat(u) : d = -1, u.length && p())
    }

    function p() {
        if (!c) {
            var e = s(f);
            c = !0;
            for (var t = u.length; t;) {
                for (l = u, u = []; ++d < t;) l && l[d].run();
                d = -1, t = u.length
            }
            l = null, c = !1,
                function(e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function h(e, t) {
        this.fun = e, this.array = t
    }

    function y() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        u.push(new h(e, t)), 1 !== u.length || c || s(p)
    }, h.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function(e) {
        return []
    }, o.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "getConnectionType", function() {
        return o
    }), n.d(t, "saveNavigationStatEvent", function() {
        return a
    }), n.d(t, "serializeNavigationStats", function() {
        return s
    }), n.d(t, "saveViewerStartTime", function() {
        return u
    }), n.d(t, "serializeLoadingStats", function() {
        return c
    }), n.d(t, "hasStatToSerialize", function() {
        return d
    });
    var r = function() {
        return function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    o = !0, i = e
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();

    function o() {
        var e = navigator.connection;
        if (!e) return "";
        var t = e.effectiveType,
            n = e.downlink;
        switch (t) {
            case "slow-2g":
                return "GPRS";
            case "2g":
                return "EDGE";
            case "3g":
                return "3G";
            case "4g":
                return n > 8 ? "wi-fi" : "LTE"
        }
        return ""
    }
    var i = [];

    function a(e) {
        var t = e.storyRawId,
            n = e.source,
            o = e.action,
            a = t.split("_"),
            s = r(a, 2),
            l = s[0],
            u = s[1];
        "reply" === n && (n = "replies_list");
        var c = {
            ownerId: l,
            storyId: u,
            source: n,
            action: o
        };
        i.push(c)
    }

    function s() {
        var e = i.map(function(e) {
            return [e.ownerId, e.storyId, e.source, e.action].join(",")
        }).join(";");
        return i = [], e
    }
    var l = [];

    function u(e) {
        var t = e.storyRawId,
            n = e.source,
            o = e.time,
            i = t.split("_"),
            a = r(i, 2),
            s = {
                ownerId: a[0],
                storyId: a[1],
                source: n,
                time: o
            };
        l.push(s)
    }

    function c() {
        var e = l.map(function(e) {
            return [e.ownerId, e.storyId, e.source, e.time].join(",")
        }).join(";");
        return l = [], e
    }
    var d = function() {
        return l.length || i.length
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "escape", function() {
        return a
    }), n.d(t, "decodeHTMLEntities", function() {
        return s
    }), n.d(t, "encodeHTMLEntities", function() {
        return l
    }), n.d(t, "prepareToWriting", function() {
        return u
    });
    var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = window.Emoji,
        i = [
            ["&amp;", "&"],
            ["&lt;", "<"],
            ["&gt;", ">"],
            ["&quot;", '"']
        ];

    function a(e) {
        return i.reduce(function(e, t) {
            var n = r(t, 2),
                o = n[0],
                i = n[1];
            return e.replace(new RegExp(i, "ig"), o)
        }, e)
    }

    function s(e) {
        return i.reduce(function(e, t) {
            var n = r(t, 2),
                o = n[0],
                i = n[1];
            return e.replace(new RegExp(o, "ig"), i)
        }, e).replace(/&#(\d+);/g, function(e, t) {
            return String.fromCodePoint(t)
        })
    }

    function l(e) {
        return a(e).replace(/[\u00A0-\u9999<>\&]/gim, function(e) {
            return "&#" + e.charCodeAt(0) + ";"
        })
    }

    function u(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.lineBreak,
            r = void 0 !== n && n,
            i = t.convertEmoji,
            l = void 0 === i || i,
            u = s(e);
        return u = u.replace(/\n\r/gi, "\n"), "oneline" === r ? u = u.replace(/<br>/gi, " ").replace(/\n/gi, " ") : "html" === r && (u = u.replace(/\n/gi, "<br>")), u = a(u), l && (u = o.emojiToHTML(u, !0)), u
    }
}]);