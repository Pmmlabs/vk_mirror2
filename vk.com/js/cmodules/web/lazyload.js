﻿! function(e) {
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
    }, n.p = "", n(n.s = 340)
}({
    173: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "vkLocal", function() {
            return u
        }), n.d(t, "lTimeout", function() {
            return c
        }), n.d(t, "rand", function() {
            return l
        }), n.d(t, "irand", function() {
            return d
        }), n.d(t, "isUndefined", function() {
            return s
        }), n.d(t, "isFunction", function() {
            return f
        }), n.d(t, "isArray", function() {
            return w
        }), n.d(t, "isString", function() {
            return h
        }), n.d(t, "isObject", function() {
            return g
        }), n.d(t, "isEmpty", function() {
            return v
        }), n.d(t, "vkNow", function() {
            return p
        }), n.d(t, "vkImage", function() {
            return m
        }), n.d(t, "trim", function() {
            return y
        }), n.d(t, "stripHTML", function() {
            return b
        }), n.d(t, "escapeRE", function() {
            return O
        }), n.d(t, "intval", function() {
            return j
        }), n.d(t, "floatval", function() {
            return _
        }), n.d(t, "positive", function() {
            return C
        }), n.d(t, "isNumeric", function() {
            return T
        }), n.d(t, "winToUtf", function() {
            return S
        }), n.d(t, "replaceEntities", function() {
            return E
        }), n.d(t, "clean", function() {
            return k
        }), n.d(t, "unclean", function() {
            return x
        }), n.d(t, "each", function() {
            return A
        }), n.d(t, "indexOf", function() {
            return D
        }), n.d(t, "inArray", function() {
            return N
        }), n.d(t, "clone", function() {
            return H
        }), n.d(t, "arrayKeyDiff", function() {
            return L
        }), n.d(t, "extend", function() {
            return M
        }), n.d(t, "addTemplates", function() {
            return P
        }), n.d(t, "getTemplate", function() {
            return R
        }), n.d(t, "serializeForm", function() {
            return Y
        }), n.d(t, "extractUrls", function() {
            return z
        }), n.d(t, "isRetina", function() {
            return I
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return B
        }), n.d(t, "formatCount", function() {
            return F
        }), n.d(t, "encodeHtml", function() {
            return U
        }), n.d(t, "decodeHtml", function() {
            return X
        });
        var r = n(95),
            o = n(280),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && u.return && u.return()
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

        function u(e) {
            var t = PageID;
            return function() {
                t === PageID && e.apply(this, arguments)
            }
        }

        function c(e, t) {
            return setTimeout(u(e), t)
        }
        window.PageID = window.PageID || 1;
        var l = function(e, t) {
                return Math.random() * (t - e + 1) + e
            },
            d = function(e, t) {
                return Math.floor(l(e, t))
            },
            s = function(e) {
                return void 0 === e
            },
            f = function(e) {
                return e && "[object Function]" === Object.prototype.toString.call(e)
            },
            w = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            h = function(e) {
                return "string" == typeof e
            },
            g = function(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            };

        function v(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        var p = function() {
                return +new Date
            },
            m = function() {
                return window.Image ? new Image : ce("img")
            },
            y = function(e) {
                return (e || "").replace(/^\s+|\s+$/g, "")
            },
            b = function(e) {
                return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            O = function(e) {
                return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function j(e) {
            return !0 === e ? 1 : parseInt(e) || 0
        }

        function _(e) {
            return !0 === e ? 1 : parseFloat(e) || 0
        }

        function C(e) {
            return (e = j(e)) < 0 ? 0 : e
        }

        function T(e) {
            return !isNaN(e)
        }

        function S(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return (t = j(t)) >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function E() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(r.se)("<textarea>" + e + "</textarea>").value
        }

        function k(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function x(e) {
            return E(e.replace(/\t/g, "\n"))
        }

        function A(e, t) {
            if (g(e) || void 0 === e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
            } else
                for (var r = 0, o = e.length; r < o; r++) {
                    var i = e[r];
                    if (!1 === t.call(i, r, i)) break
                }
            return e
        }

        function D(e, t, n) {
            for (var r = n || 0, o = (e || []).length; r < o; r++)
                if (e[r] == t) return r;
            return -1
        }

        function N(e, t) {
            return -1 !== D(t, e)
        }

        function H(e, t) {
            var n = g(e) || void 0 === e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === a(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = H(e[r]) : n[r] = e[r]);
            return n
        }

        function L(e) {
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

        function M() {
            var e = arguments,
                t = e.length,
                n = e[0] || {},
                r = 1,
                o = !1;
            for ("boolean" == typeof n && (o = n, n = e[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : a(n)) || f(n) || (n = {}); r < t; r++) {
                var i = e[r];
                if (null != i)
                    for (var u in i)
                        if (i.hasOwnProperty(u)) {
                            var c = n[u],
                                l = i[u];
                            n !== l && (o && l && "object" === (void 0 === l ? "undefined" : a(l)) && !l.nodeType ? n[u] = M(o, c || (null != l.length ? [] : {}), l) : void 0 !== l && (n[u] = l))
                        }
            }
            return n
        }

        function P(e) {
            window.templates = window.templates || {}, M(window.templates, e)
        }

        function R(e, t) {
            var n = (window.templates = window.templates || {})[e];
            return "function" == typeof n && (n = n()), n && t ? Object(r.rs)(n, t) : n || ""
        }

        function Y(e) {
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
            return A(n("input"), function(e, t) {
                if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return o(0, t)
            }), A(n("select"), o), A(n("textarea"), o), t
        }

        function z(e, t) {
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
        var I = function() {
            return window.devicePixelRatio >= 2
        };

        function B(e) {
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

        function F(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.kLimit || 1e3;
            return e >= (t.mLimit || 1e6) && !t.noCheck ? F(e = (e = j(e / 1e5)) > 1e3 ? j(e / 10) : e / 10, M(t, {
                noCheck: !0
            }), !0) + "M" : e >= n && !t.noCheck ? F(e = (e = j(e / 100)) > 100 ? j(e / 10) : e / 10, M(t, {
                noCheck: !0
            }), !0) + "K" : Object(o.langNumeric)(e, "%s", !0).replace(/,/g, ".")
        }
        var W, K = i((W = null, [function(e) {
                return W || (W = Object(r.se)("<span> </span>")), W.innerText = e, W.innerHTML
            }, function(e) {
                return W || (W = Object(r.se)("<span> </span>")), W.innerHTML = e.replace(/<br\s*\/?>/gim, "\n"), W.innerText
            }]), 2),
            U = K[0],
            X = K[1];
        window.isRetina = I, window.extractUrls = z, window.serializeForm = Y, window.addTemplates = P, window.getTemplate = R, window.rand = l, window.irand = d, window.isUndefined = s, window.isFunction = f, window.isArray = w, window.isString = h, window.isObject = g, window.isEmpty = v, window.vkNow = p, window.vkImage = m, window.trim = y, window.stripHTML = b, window.escapeRE = O, window.intval = j, window.floatval = _, window.positive = C, window.isNumeric = T, window.winToUtf = S, window.replaceEntities = E, window.clean = k, window.unclean = x, window.each = A, window.indexOf = D, window.inArray = N, window.clone = H, window.arrayKeyDiff = L, window.extend = M, window.vkLocal = u, window.lTimeout = c, window.getCaretCharacterOffsetWithin = B, window.formatCount = F, window.encodeHtml = U, window.decodeHtml = X
    },
    19: function(e, t) {
        var n, r, o = e.exports = {};

        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function u(e) {
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
        var c, l = [],
            d = !1,
            s = -1;

        function f() {
            d && c && (d = !1, c.length ? l = c.concat(l) : s = -1, l.length && w())
        }

        function w() {
            if (!d) {
                var e = u(f);
                d = !0;
                for (var t = l.length; t;) {
                    for (c = l, l = []; ++s < t;) c && c[s].run();
                    s = -1, t = l.length
                }
                c = null, d = !1,
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

        function g() {}
        o.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            l.push(new h(e, t)), 1 !== l.length || d || u(w)
        }, h.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = g, o.addListener = g, o.once = g, o.off = g, o.removeListener = g, o.removeAllListeners = g, o.emit = g, o.prependListener = g, o.prependOnceListener = g, o.listeners = function(e) {
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
    },
    230: function(e, t, n) {
        (function(r, o) {
            var i;
            (function() {
                "use strict";

                function a(e) {
                    return "function" == typeof e
                }
                var u, c, l = Array.isArray ? Array.isArray : function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    d = 0,
                    s = function(e, t) {
                        _[d] = e, _[d + 1] = t, 2 === (d += 2) && (c ? c(C) : m())
                    };
                var f = "undefined" != typeof window ? window : void 0,
                    w = f || {},
                    h = w.MutationObserver || w.WebKitMutationObserver,
                    g = void 0 !== r && "[object process]" === {}.toString.call(r),
                    v = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                function p() {
                    return function() {
                        setTimeout(C, 1)
                    }
                }
                var m, y, b, O, j, _ = new Array(1e3);

                function C() {
                    for (var e = 0; e < d; e += 2) {
                        (0, _[e])(_[e + 1]), _[e] = void 0, _[e + 1] = void 0
                    }
                    d = 0
                }
                g ? m = function() {
                    r.nextTick(C)
                } : h ? (b = 0, O = new h(C), j = document.createTextNode(""), O.observe(j, {
                    characterData: !0
                }), m = function() {
                    j.data = b = ++b % 2
                }) : v ? ((y = new MessageChannel).port1.onmessage = C, m = function() {
                    y.port2.postMessage(0)
                }) : m = void 0 === f ? function() {
                    try {
                        var e = n(417);
                        return u = e.runOnLoop || e.runOnContext,
                            function() {
                                u(C)
                            }
                    } catch (e) {
                        return p()
                    }
                }() : p();
                var T = function(e, t) {
                    var n = this._state;
                    if (n === x && !e || n === A && !t) return this;
                    var r = new this.constructor(E),
                        o = this._result;
                    if (n) {
                        var i = arguments[n - 1];
                        s(function() {
                            F(n, r, i, o)
                        })
                    } else Y(this, r, e, t);
                    return r
                };
                var S = function(e) {
                    if (e && "object" == typeof e && e.constructor === this) return e;
                    var t = new this(E);
                    return L(t, e), t
                };

                function E() {}
                var k = void 0,
                    x = 1,
                    A = 2,
                    D = new I;

                function N(e) {
                    try {
                        return e.then
                    } catch (e) {
                        return D.error = e, D
                    }
                }

                function H(e, t, n) {
                    t.constructor === e.constructor && n === T && constructor.resolve === S ? function(e, t) {
                        t._state === x ? P(e, t._result) : t._state === A ? R(e, t._result) : Y(t, void 0, function(t) {
                            L(e, t)
                        }, function(t) {
                            R(e, t)
                        })
                    }(e, t) : n === D ? R(e, D.error) : void 0 === n ? P(e, t) : a(n) ? function(e, t, n) {
                        s(function(e) {
                            var r = !1,
                                o = function(e, t, n, r) {
                                    try {
                                        e.call(t, n, r)
                                    } catch (e) {
                                        return e
                                    }
                                }(n, t, function(n) {
                                    r || (r = !0, t !== n ? L(e, n) : P(e, n))
                                }, function(t) {
                                    r || (r = !0, R(e, t))
                                }, e._label);
                            !r && o && (r = !0, R(e, o))
                        }, e)
                    }(e, t, n) : P(e, t)
                }

                function L(e, t) {
                    var n;
                    e === t ? R(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(n = t) || "object" == typeof n && null !== n ? H(e, t, N(t)) : P(e, t)
                }

                function M(e) {
                    e._onerror && e._onerror(e._result), z(e)
                }

                function P(e, t) {
                    e._state === k && (e._result = t, e._state = x, 0 !== e._subscribers.length && s(z, e))
                }

                function R(e, t) {
                    e._state === k && (e._state = A, e._result = t, s(M, e))
                }

                function Y(e, t, n, r) {
                    var o = e._subscribers,
                        i = o.length;
                    e._onerror = null, o[i] = t, o[i + x] = n, o[i + A] = r, 0 === i && e._state && s(z, e)
                }

                function z(e) {
                    var t = e._subscribers,
                        n = e._state;
                    if (0 !== t.length) {
                        for (var r, o, i = e._result, a = 0; a < t.length; a += 3) r = t[a], o = t[a + n], r ? F(n, r, o, i) : o(i);
                        e._subscribers.length = 0
                    }
                }

                function I() {
                    this.error = null
                }
                var B = new I;

                function F(e, t, n, r) {
                    var o, i, u, c, l = a(n);
                    if (l) {
                        if ((o = function(e, t) {
                                try {
                                    return e(t)
                                } catch (e) {
                                    return B.error = e, B
                                }
                            }(n, r)) === B ? (c = !0, i = o.error, o = null) : u = !0, t === o) return void R(t, new TypeError("A promises callback cannot return that same promise."))
                    } else o = r, u = !0;
                    t._state !== k || (l && u ? L(t, o) : c ? R(t, i) : e === x ? P(t, o) : e === A && R(t, o))
                }
                var W = function(e) {
                    return new q(this, e).promise
                };
                var K = function(e) {
                    var t = new this(E);
                    if (!l(e)) return R(t, new TypeError("You must pass an array to race.")), t;
                    var n = e.length;

                    function r(e) {
                        L(t, e)
                    }

                    function o(e) {
                        R(t, e)
                    }
                    for (var i = 0; t._state === k && i < n; i++) Y(this.resolve(e[i]), void 0, r, o);
                    return t
                };
                var U = function(e) {
                        var t = new this(E);
                        return R(t, e), t
                    },
                    X = 0;
                var $ = V;

                function V(e) {
                    this._id = X++, this._state = void 0, this._result = void 0, this._subscribers = [], E !== e && ("function" != typeof e && function() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }(), this instanceof V ? function(e, t) {
                        try {
                            t(function(t) {
                                L(e, t)
                            }, function(t) {
                                R(e, t)
                            })
                        } catch (t) {
                            R(e, t)
                        }
                    }(this, e) : function() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }())
                }
                V.all = W, V.race = K, V.resolve = S, V.reject = U, V._setScheduler = function(e) {
                    c = e
                }, V._setAsap = function(e) {
                    s = e
                }, V._asap = s, V.prototype = {
                    constructor: V,
                    then: T,
                    catch: function(e) {
                        return this.then(null, e)
                    }
                };
                var q = Z;

                function Z(e, t) {
                    this._instanceConstructor = e, this.promise = new e(E), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? P(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && P(this.promise, this._result))) : R(this.promise, this._validationError())
                }
                Z.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, Z.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, n = 0; this._state === k && n < e; n++) this._eachEntry(t[n], n)
                }, Z.prototype._eachEntry = function(e, t) {
                    var n = this._instanceConstructor,
                        r = n.resolve;
                    if (r === S) {
                        var o = N(e);
                        if (o === T && e._state !== k) this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                        else if (n === $) {
                            var i = new n(E);
                            H(i, e, o), this._willSettleAt(i, t)
                        } else this._willSettleAt(new n(function(t) {
                            t(e)
                        }), t)
                    } else this._willSettleAt(r(e), t)
                }, Z.prototype._settledAt = function(e, t, n) {
                    var r = this.promise;
                    r._state === k && (this._remaining--, e === A ? R(r, n) : this._result[t] = n), 0 === this._remaining && P(r, this._result)
                }, Z.prototype._willSettleAt = function(e, t) {
                    var n = this;
                    Y(e, void 0, function(e) {
                        n._settledAt(x, t, e)
                    }, function(e) {
                        n._settledAt(A, t, e)
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
                    Q = {
                        Promise: $,
                        polyfill: G
                    };
                void 0 === (i = function() {
                    return Q
                }.call(t, n, t, e)) || (e.exports = i), G()
            }).call(this)
        }).call(this, n(19), n(374))
    },
    259: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "loadImage", function() {
            return a
        });
        var r = n(230),
            o = n(173),
            i = r.Promise;

        function a(e) {
            var t = Object(o.vkNow)();
            return new i(function(n, r) {
                var i = Object(o.vkImage)();
                i.onload = function() {
                    return n(Object(o.vkNow)() - t)
                }, i.error = r, i.src = e
            })
        }
    },
    267: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(419),
            o = n(42),
            i = window.LazyLoadInited;

        function a(e) {
            i && (Object(o.default)(), Object(r.update)(e))
        }
        window.LazyLoad = {
            init: function() {
                i || (window.LazyLoadInited = i = !0, Element.prototype.closest && (Object(o.default)(), Object(r.default)()))
            },
            scan: a,
            scanDelayed: function(e) {
                return setTimeout(function() {
                    return a(e)
                }, 20)
            },
            watch: function() {
                i && Object(r.watch)()
            }
        };
        try {
            stManager.done("lazyload.js")
        } catch (e) {}
    },
    280: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseLatin", function() {
            return i
        }), n.d(t, "parseCyr", function() {
            return a
        }), n.d(t, "parseLatKeys", function() {
            return u
        }), n.d(t, "langNumeric", function() {
            return c
        }), n.d(t, "langSex", function() {
            return l
        }), n.d(t, "langStr", function() {
            return d
        }), n.d(t, "addLangKeys", function() {
            return s
        }), n.d(t, "getLang", function() {
            return f
        }), n.d(t, "langDate", function() {
            return w
        }), n.d(t, "getShortDate", function() {
            return h
        }), n.d(t, "getShortDateOrTime", function() {
            return g
        }), n.d(t, "langWordNumeric", function() {
            return v
        }), n.d(t, "getDateText", function() {
            return p
        }), n.d(t, "getBigDateNew", function() {
            return m
        }), n.d(t, "getSmDate", function() {
            return y
        });
        var r = n(447),
            o = n(173);

        function i(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = e, o = 0, i = t.length; o < i; o++) r = r.split(t[o]).join(n[o]);
            for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", u = 0, c = a.length; u < c; u++) r = r.split(a.charAt(u)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(u));
            return r === e ? null : r
        }

        function a(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", o = e, i = 0; i < n.length; i++) o = o.split(n[i]).join(t[i]);
            for (var a = 0; a < r.length; a++) o = o.split(r.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
            return o === e ? null : o
        }

        function u(e) {
            for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, r = 0; r < t.length; r++) n = n.split(t.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
            return n == e ? null : n
        }

        function c(e, t, n) {
            if (!t || !window.langConfig) return e;
            var r = void 0;
            if (Object(o.isArray)(t) ? (r = t[1], e != Math.floor(e) ? r = t[langConfig.numRules.float] : Object(o.each)(langConfig.numRules.int, function(n, i) {
                    if ("*" == i[0]) return r = t[i[2]], !1;
                    var a = i[0] ? e % i[0] : e;
                    return -1 != Object(o.indexOf)(i[1], a) ? (r = t[i[2]], !1) : void 0
                })) : r = t, n) {
                for (var i = e.toString().split("."), a = [], u = i[0].length - 3; u > -3; u -= 3) a.unshift(i[0].slice(u > 0 ? u : 0, u + 3));
                i[0] = a.join(langConfig.numDel), e = i.join(langConfig.numDec)
            }
            return r = (r || "%s").replace("%s", e)
        }

        function l(e, t) {
            if (!Object(o.isArray)(t)) return t;
            var n = t[1];
            return window.langConfig ? (Object(o.each)(langConfig.sexRules, function(r, o) {
                return "*" == o[0] ? (n = t[o[1]], !1) : e == o[0] && t[o[1]] ? (n = t[o[1]], !1) : void 0
            }), n) : n
        }

        function d(e) {
            for (var t = arguments, n = t.length, r = e + "", o = 1; o < n; o += 2) {
                var i = "%" === t[o][0] ? t[o] : "{" + t[o] + "}";
                r = r.replace(i, t[o + 1])
            }
            return r
        }

        function s(e, t) {
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
                return Object(o.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(o.isArray)(n) || "raw" === e[0] ? n : c(e[0], n, e[1])
            } catch (e) {
                debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
            }
        }

        function w(e, t, n, i, a, u) {
            var c = void 0;
            if (u || (u = ""), Object(o.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, c = new Date(e)) : c = e, a) t = t[1];
            else {
                var l = "";
                !(l = Object(r.isToday)(c) ? t[3] : Object(r.isYesterday)(c) ? t[2] : Object(r.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (l = t[1]), t = l
            }
            var d = {
                    hours: c.getHours(),
                    minutes: c.getMinutes(),
                    seconds: c.getSeconds(),
                    day: c.getDate(),
                    month: c.getMonth() + 1,
                    year: c.getFullYear()
                },
                s = "";
            switch (3 === vk.lang && (s = c.getHours() > 11 ? "pm" : "am", d.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
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
                    !Object(r.isToday)(c) || Object(r.isYesterday)(c) || Object(r.isTomorrow)(c) || (t = u + t);
                    break;
                case 12:
                case 73:
                    1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", Object(r.leadingZero)(d.hours)).replace("{minute}", Object(r.leadingZero)(d.minutes)).replace("{day}", d.day).replace("{num_day}", Object(r.leadingZero)(d.day)).replace("{month}", i[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", Object(r.leadingZero)(d.seconds)).replace("{am_pm}", s)
        }

        function h(e, t, n, r, o) {
            e *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = f("months_of", "raw")), t *= 1e3;
            var i = Date.now(),
                a = new Date(i),
                u = new Date(e + t);
            return !o && e > i && e - i < 864e5 && a.getDate() === u.getDate() ? w(e, "{hour}:{minute} {am_pm}", t, [], !n) : u.getYear() !== a.getYear() || e < i - 157248e5 ? w(e, f("global_date", "raw"), t, r, !n) : w(e, f("global_short_date", "raw"), t, r, !n)
        }

        function g(e, t, n, o) {
            return Object(r.isToday)(new Date(1e3 * e + 1e3 * t)) ? w(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : h(e, t, n, o)
        }

        function v(e, t, n) {
            return Object(o.isArray)(t) && e < t.length ? t[e] : c(e, n)
        }

        function p(e, t) {
            e += t;
            var n = parseInt(Date.now() / 1e3) - e,
                r = "";
            if (n < 60) r = f("global_just_now");
            else if (n < 3600) {
                r = v(Object(o.intval)(n / 60), f("global_word_mins_ago", "raw"), f("global_mins_ago", "raw"))
            } else if (n < 14400) {
                r = v(Object(o.intval)(n / 3600), f("global_word_hours_ago", "raw"), f("global_hours_ago", "raw"))
            } else r = m(e, 0, !0, "_l");
            return r
        }

        function m(e, t, n, r) {
            void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === r && (r = ""), t *= 1e3;
            var o = new Date(1e3 * e),
                i = new Date;
            return o.getFullYear() !== i.getFullYear() && o.getTime() < i.getTime() - 1728e5 || Math.abs(o.getTime() - i.getTime()) > 157248e5 ? w(1e3 * e, f("global_date", "raw"), t, f("months_sm_of"), !n) : w(1e3 * e, f("global_short_date_time" + r, "raw"), t, f("months_sm_of"), !n)
        }

        function y(e, t, n) {
            void 0 === n && (n = !0), void 0 === t && (t = 0);
            var r = new Date,
                o = r.getFullYear(),
                i = r.getMonth(),
                a = new Date(1e3 * e),
                u = a.getFullYear(),
                c = a.getMonth();
            return w(1e3 * e, f(u < o && (i > 1 || c < 9 || o - u >= 2) ? "global_date" : "global_short_date_time", "raw"), t, f("months_sm_of", "raw"), !n)
        }
        window.parseLatin = i, window.parseCyr = a, window.parseLatKeys = u, window.langNumeric = c, window.langSex = l, window.langStr = d, window.addLangKeys = s, window.getLang = f, window.langDate = w, window.getShortDate = h, window.getShortDateOrTime = g, window.langWordNumeric = v, window.getDateText = p, window.getBigDateNew = m, window.getSmDate = y
    },
    340: function(e, t, n) {
        e.exports = n(267)
    },
    374: function(e, t) {
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
    },
    417: function(e, t) {},
    419: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "watch", function() {
            return l
        }), n.d(t, "update", function() {
            return s
        }), n.d(t, "default", function() {
            return f
        });
        var r = n(42),
            o = n(259),
            i = n(95),
            a = window,
            u = a.curBox,
            c = a.scrollGetY;

        function l(e) {
            addEvent(e, "scroll", d.pbind(e))
        }

        function d(e) {
            var t = r.getObjects(),
                n = window.innerHeight,
                a = 0,
                l = !0;
            e === document || e === window ? a = c() : e ? (a = e.scrollTop, l = !1) : window.wkcur && window.wkcur.shown ? (a = window.wkLayerWrap.scrollTop, l = !1) : u() ? (a = window.boxLayerWrap.scrollTop, l = !1) : a = c(), !l && e && (n = e.offsetHeight);
            for (var d = function(e) {
                    var r = t[e],
                        u = r.elem,
                        c = r.y,
                        d = r.height;
                    if ("window" !== r.from && l) return "continue";
                    if (c > a - 1.5 * n && a + 1.5 * n > c - d) {
                        Object(i.removeClass)(u, "lazyload_need_load"), t.splice(e, 1), e--;
                        var f = Object(i.attr)(u, "data-lazyload-src");
                        Object(o.loadImage)(f).then(function(e) {
                            e < 10 && Object(i.addClass)(u, "lazyload_no_animation"), "IMG" === u.tagName ? Object(i.attr)(u, "src", f) : Object(i.setStyle)(u, "background-image", "url(" + f + ")"), Object(i.addClass)(u, "lazyload_loaded"), Object(i.re)(Object(i.geByClass1)("lazyload_preview", u))
                        })
                    }
                    s = e
                }, s = 0; s < t.length; s++) d(s)
        }

        function s(e) {
            d(e)
        }

        function f() {
            l(window), s()
        }
    },
    42: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getObjects", function() {
            return c
        });
        var r = n(419),
            o = n(95),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = [];

        function u(e) {
            var t = Object(o.getXY)(e),
                n = i(t, 2)[1],
                r = e.closest(".ui_scroll_outer, #wk_layer_wrap, #box_layer_wrap, body"),
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
        t.default = function() {
            ! function() {
                a = [];
                for (var e = Object(o.geByClass)("lazyload_need_load"), t = 0; t < e.length; t++) {
                    var n = e[t],
                        r = u(n),
                        c = r.y,
                        l = r.from,
                        d = Object(o.getSize)(n),
                        s = i(d, 2),
                        f = s[0],
                        w = s[1];
                    a.push({
                        elem: n,
                        y: c,
                        from: l,
                        width: f,
                        height: w
                    })
                }
                cur.objects = a
            }(), Object(r.update)()
        }
    },
    431: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "KEY", function() {
            return i
        }), n.d(t, "addEvent", function() {
            return a
        }), n.d(t, "removeEvent", function() {
            return u
        }), n.d(t, "triggerEvent", function() {
            return c
        }), n.d(t, "cancelEvent", function() {
            return l
        }), n.d(t, "stopEvent", function() {
            return d
        }), n.d(t, "normEvent", function() {
            return s
        }), n.d(t, "checkEvent", function() {
            return f
        }), n.d(t, "checkKeyboardEvent", function() {
            return w
        }), n.d(t, "checkOver", function() {
            return h
        });
        var r = n(95),
            o = n(173),
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

        function a(e, t, n, i, a, u) {
            if ((e = Object(r.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
                var c, d = a ? ((c = function(e) {
                    var t = e.data;
                    e.data = a;
                    var r = n.apply(this, [e]);
                    return e.data = t, r
                }).handler = n, c) : n;
                e.setInterval && e !== window && (e = window);
                var f = Object(r.data)(e, "events") || Object(r.data)(e, "events", {}),
                    w = Object(r.data)(e, "handle") || Object(r.data)(e, "handle", function(e) {
                        return function() {
                            (function(e) {
                                e = s(e);
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
                                        var u = o[i].apply(this, t);
                                        if (!1 !== u && -1 !== u || l(e), -1 === u) return !1
                                    }
                            }).apply(e, arguments)
                        }
                    }(e));
                Object(o.each)(t.split(/\s+/), function(t, n) {
                    f[n] || (f[n] = [], !i && e.addEventListener ? e.addEventListener(n, w, u) : !i && e.attachEvent && e.attachEvent("on" + n, w)), f[n].push(d)
                })
            }
        }

        function u(e, t, n, i) {
            if (void 0 === i && (i = !1), e = Object(r.ge)(e)) {
                var a = Object(r.data)(e, "events");
                if (a)
                    if ("string" == typeof t) Object(o.each)(t.split(/\s+/), function(t, u) {
                        if (Object(o.isArray)(a[u])) {
                            var c = a[u].length;
                            if (Object(o.isFunction)(n)) {
                                for (var l = c - 1; l >= 0; l--)
                                    if (a[u][l] && (a[u][l] === n || a[u][l].handler === n)) {
                                        a[u].splice(l, 1), c--;
                                        break
                                    }
                            } else {
                                for (var d = 0; d < c; d++) delete a[u][d];
                                c = 0
                            }
                            c || (e.removeEventListener ? e.removeEventListener(u, Object(r.data)(e, "handle"), i) : e.detachEvent && e.detachEvent("on" + u, Object(r.data)(e, "handle")), delete a[u])
                        }
                    }), Object(o.isEmpty)(a) && (Object(r.removeData)(e, "events"), Object(r.removeData)(e, "handle"));
                    else
                        for (var c in a) a.hasOwnProperty(c) && u(e, c)
            }
        }

        function c(e, t, n, i) {
            e = Object(r.ge)(e);
            var a = Object(r.data)(e, "handle");
            if (a) {
                var u = function() {
                    return a.call(e, Object(o.extend)(n || {}, {
                        type: t,
                        target: e
                    }))
                };
                i ? u() : setTimeout(u, 0)
            }
        }

        function l(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
        }

        function d(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
        }

        function s(e) {
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

        function w(e) {
            if (!(e = s(e)) || !e.target) return !1;
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
        window.KEY = i, window.addEvent = a, window.removeEvent = u, window.triggerEvent = c, window.cancelEvent = l, window.stopEvent = d, window.normEvent = s, window.checkEvent = f, window.checkKeyboardEvent = w, window.checkOver = h
    },
    447: function(e, t, n) {
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

        function u(e) {
            return e >= 10 ? e : "0" + e
        }

        function c(e, t) {
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
            return u
        }), n.d(t, "formatTime", function() {
            return c
        })
    },
    95: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ge", function() {
            return i
        }), n.d(t, "geByTag", function() {
            return a
        }), n.d(t, "geByTag1", function() {
            return u
        }), n.d(t, "geByClass", function() {
            return c
        }), n.d(t, "geByClass1", function() {
            return l
        }), n.d(t, "gpeByClass", function() {
            return d
        }), n.d(t, "domQuery", function() {
            return s
        }), n.d(t, "domQuery1", function() {
            return f
        }), n.d(t, "domClosest", function() {
            return w
        }), n.d(t, "domClosestByTag", function() {
            return h
        }), n.d(t, "gpeByTag", function() {
            return g
        }), n.d(t, "ce", function() {
            return v
        }), n.d(t, "re", function() {
            return j
        }), n.d(t, "se", function() {
            return _
        }), n.d(t, "sech", function() {
            return C
        }), n.d(t, "rs", function() {
            return T
        }), n.d(t, "psr", function() {
            return S
        }), n.d(t, "domReplaceEl", function() {
            return E
        }), n.d(t, "domEL", function() {
            return k
        }), n.d(t, "domNS", function() {
            return x
        }), n.d(t, "domPS", function() {
            return A
        }), n.d(t, "domFC", function() {
            return D
        }), n.d(t, "domLC", function() {
            return N
        }), n.d(t, "domPN", function() {
            return H
        }), n.d(t, "domChildren", function() {
            return L
        }), n.d(t, "domInsertBefore", function() {
            return M
        }), n.d(t, "domInsertAfter", function() {
            return P
        }), n.d(t, "domByClass", function() {
            return R
        }), n.d(t, "domData", function() {
            return Y
        }), n.d(t, "domChildIndex", function() {
            return z
        }), n.d(t, "domCA", function() {
            return I
        }), n.d(t, "domClosestSibling", function() {
            return B
        }), n.d(t, "matchesSelector", function() {
            return F
        }), n.d(t, "isHover", function() {
            return W
        }), n.d(t, "isAncestor", function() {
            return K
        }), n.d(t, "getScroll", function() {
            return U
        }), n.d(t, "domClosestPositioned", function() {
            return X
        }), n.d(t, "domClosestOverflowHidden", function() {
            return $
        }), n.d(t, "show", function() {
            return V
        }), n.d(t, "hide", function() {
            return q
        }), n.d(t, "isVisible", function() {
            return Z
        }), n.d(t, "clientHeight", function() {
            return G
        }), n.d(t, "getClientRectOffsetY", function() {
            return Q
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
            return ue
        }), n.d(t, "addClass", function() {
            return ce
        }), n.d(t, "addClassDelayed", function() {
            return le
        }), n.d(t, "removeClass", function() {
            return de
        }), n.d(t, "removeClassDelayed", function() {
            return se
        }), n.d(t, "toggleClass", function() {
            return fe
        }), n.d(t, "toggleClassDelayed", function() {
            return we
        }), n.d(t, "replaceClass", function() {
            return he
        }), n.d(t, "getStyle", function() {
            return ge
        }), n.d(t, "setStyle", function() {
            return ve
        }), n.d(t, "setStyleDelayed", function() {
            return pe
        }), n.d(t, "setPseudoStyle", function() {
            return me
        }), n.d(t, "data", function() {
            return ye
        }), n.d(t, "attr", function() {
            return be
        }), n.d(t, "removeAttr", function() {
            return Oe
        }), n.d(t, "removeData", function() {
            return je
        }), n.d(t, "cleanElems", function() {
            return _e
        }), n.d(t, "setTitle", function() {
            return Ce
        }), n.d(t, "getZoom", function() {
            return Te
        }), n.d(t, "val", function() {
            return Se
        }), n.d(t, "elfocus", function() {
            return Ee
        }), n.d(t, "traverseParent", function() {
            return ke
        }), n.d(t, "setDocumentTitle", function() {
            return Ae
        }), n.d(t, "lockDocumentTitle", function() {
            return De
        }), n.d(t, "initDomScripts", function() {
            return Ne
        });
        var r = n(173),
            o = n(431),
            i = function(e) {
                return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
            };

        function a(e, t) {
            return (t = i(t) || document).getElementsByTagName(e)
        }

        function u(e, t) {
            return (t = i(t) || document).querySelector && t.querySelector(e) || a(e, t)[0]
        }

        function c(e, t, n) {
            return t = i(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
        }

        function l(e, t, n) {
            return t = i(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || c(e, t, n)[0]
        }

        function d(e, t, n) {
            if (!(t = i(t))) return null;
            for (; n !== t && (t = t.parentNode);)
                if (ue(t, e)) return t;
            return null
        }

        function s(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function f(e, t) {
            return (t || document).querySelector(e)
        }

        function w(e, t) {
            return ue(t, e) ? t : d(e, t)
        }

        function h(e, t) {
            return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : g(e, t)
        }

        function g(e, t) {
            if (!(t = i(t))) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() === e) return t;
            return null
        }

        function v(e, t, n) {
            var o = document.createElement(e);
            return t && Object(r.extend)(o, t), n && ve(o, n), o
        }
        var p, m, y, b, O = (p = document, m = p.createDocumentFragment(), y = p.createElement("div"), b = p.createRange && p.createRange(), m.appendChild(y), b && b.selectNodeContents(y), b && b.createContextualFragment ? function(e) {
            return e ? b.createContextualFragment(e) : p.createDocumentFragment()
        } : function(e) {
            if (!e) return p.createDocumentFragment();
            y.innerHTML = e;
            for (var t = p.createDocumentFragment(); y.firstChild;) t.appendChild(y.firstChild);
            return t
        });

        function j(e) {
            return (e = i(e)) && e.parentNode && e.parentNode.removeChild(e), e
        }
        var _ = function(e) {
                return D(v("div", {
                    innerHTML: e
                }))
            },
            C = function(e) {
                return L(v("div", {
                    innerHTML: e
                }))
            };

        function T(e, t) {
            return Object(r.each)(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function S(e) {
            return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function E(e, t) {
            return Object(r.isString)(t) && (t = _(t)), H(e).replaceChild(t, e), t
        }

        function k(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }
        var x = function(e) {
                return k((e || {}).nextSibling)
            },
            A = function(e) {
                return k((e || {}).previousSibling, 1)
            },
            D = function(e) {
                return k((e || {}).firstChild)
            },
            N = function(e) {
                return k((e || {}).lastChild, 1)
            },
            H = function(e) {
                return (e || {}).parentNode
            };

        function L(e) {
            for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
            return t
        }

        function M(e, t) {
            var n = H(t);
            return n && n.insertBefore(e, t)
        }

        function P(e, t) {
            var n = H(t);
            return n && n.insertBefore(e, x(t))
        }

        function R(e, t) {
            return e ? l(t, e) : e
        }

        function Y(e, t, n) {
            return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function z(e) {
            for (var t = 0; null != (e = A(e));) t++;
            return t
        }

        function I(e, t) {
            do {
                e = H(e)
            } while (e && !F(e, t));
            return e
        }

        function B(e, t, n) {
            for (var r = null; null === r && e;)(e = -1 === n ? A(e) : x(e)) && F(e, t) && (r = e);
            return r
        }

        function F(e, t) {
            return !(!(e = i(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
                for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
                return n > -1
            }).call(e, t)
        }

        function W(e) {
            return F(e, ":hover")
        }

        function K(e, t) {
            var n = i(e);
            if (t = i(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n === t) return !0;
            return !1
        }

        function U() {
            var e = browser.msie6 ? i("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function X(e, t) {
            for (var n = (t = t || {}).fromEl || H(e), o = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
                var i = ge(n, "position");
                if (Object(r.inArray)(i, o) && (!t.noOverflow || "hidden" !== ge(n, "overflow"))) break;
                n = H(n)
            }
            return n
        }

        function $(e, t) {
            for (var n = e = i(e), r = void 0, o = void 0, a = void 0, u = !1; n && n.tagName && n !== bodyNode;) {
                if (r = ge(n, "position"), o = ge(n, "overflow"), a = ge(n, "transform"), t && browser.mozilla) {
                    if ("page_wrap" != n.id && n !== e && "visible" !== o && ("static" === r ? !u || "relative" === u : "fixed" !== u)) break
                } else if (n !== e && "visible" !== o && ("static" === r ? !u || "relative" === u : "fixed" !== u)) break;
                "none" !== a ? u = void 0 : "static" !== r && "fixed" !== u && (u = r), n = H(n)
            }
            return n
        }

        function V(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) V(arguments[n]);
            else if ((e = i(e)) && e.style) {
                var r = e.olddisplay,
                    o = e.tagName.toLowerCase(),
                    a = "block";
                e.style.display = r || "", "none" === ge(e, "display") && (a = ue(e, "inline") || ue(e, "_inline") ? "inline" : ue(e, "_inline_block") ? "inline-block" : "tr" !== o || browser.msie ? "table" !== o || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
            }
        }

        function q(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) q(arguments[n]);
            else if ((e = i(e)) && e.style) {
                var r = ge(e, "display");
                e.olddisplay = "none" !== r ? r : "", e.style.display = "none"
            }
        }

        function Z(e) {
            return !(!(e = i(e)) || !e.style) && "none" !== ge(e, "display")
        }

        function G() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function Q(e, t, n) {
            e = i(e), n = n || 0;
            var o = ne(e)[1],
                a = oe(e)[1],
                u = window,
                c = document.documentElement,
                l = Math.max(Object(r.intval)(u.innerHeight), Object(r.intval)(c.clientHeight)),
                d = i("page_header_cont"),
                s = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                f = vk.staticheader ? Math.max(0, oe(d)[1] - s) : oe(d)[1];
            if (t) {
                if (o + a < s + f + n) return o + a - s - f - n;
                if (o > s + l - n) return o - s - l + n
            } else {
                if (o < s + f + n) return o - s - f - n;
                if (o + a > s + l - n) return o + a - s - l + n
            }
            return 0
        }

        function J(e, t) {
            return void 0 === t && (t = !Z(e)), t ? V(e) : q(e), t
        }

        function ee(e) {
            return void 0 !== e.getBoundingClientRect
        }

        function te(e, t) {
            var n = void 0;
            if (t && "inline" === ge(e, "display")) {
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
                u = void 0;
            if (t && "border-box" === ge(e, "boxSizing") && (t = !1), e === document) a = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (e) {
                var c = function() {
                    a = ee(e) && (u = te(e, n)) && void 0 !== u.width ? [u.width, u.height] : [e.offsetWidth, e.offsetHeight], t && Object(r.each)(a, function(t, n) {
                        var o = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        Object(r.each)(o, function() {
                            a[t] -= parseFloat(ge(e, "padding" + this)) || 0, a[t] -= parseFloat(ge(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (Z(e)) c();
                else {
                    var l = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        d = {},
                        s = !1;
                    e.style.cssText.indexOf("!important") > -1 && (s = e.style.cssText), Object(r.each)(l, function(t, n) {
                        d[t] = e.style[t], e.style[t] = n
                    }), c(), Object(r.each)(l, function(t, n) {
                        e.style[t] = d[t]
                    }), s && (e.style.cssText = s)
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

        function ue(e, t) {
            var n = i(e);
            return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
        }

        function ce(e, t) {
            var n = i(e);
            n && !ue(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
        }
        window.whitespaceRegex = /[\t\r\n\f]/g;
        var le = function(e, t) {
            return setTimeout(ce.pbind(e, t), 0)
        };

        function de(e, t) {
            var n = i(e);
            n && (n.className = Object(r.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }
        var se = function(e, t) {
            return setTimeout(de.pbind(e, t), 0)
        };

        function fe(e, t, n) {
            return void 0 === n && (n = !ue(e, t)), (n ? ce : de)(e, t), n
        }

        function we(e, t, n) {
            return void 0 === n && (n = !ue(e, t)), (n ? le : se)(e, t), n
        }

        function he(e, t, n) {
            de(e, t), ce(e, n)
        }

        function ge(e, t, n) {
            if (e = i(e), Object(r.isArray)(t)) {
                var o = {};
                return Object(r.each)(t, function(t, n) {
                    return o[n] = ge(e, n)
                }), o
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" === t && browser.msie) {
                var a = e.style.filter;
                return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
            var u = void 0,
                c = document.defaultView || window;
            if (c.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var l = c.getComputedStyle(e, null);
                l && (u = l.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" === t && browser.msie) {
                    var d = e.currentStyle.filter;
                    return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var s = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                "auto" === (u = e.currentStyle[t] || e.currentStyle[s]) && (u = 0), u = (u + "").split(" "), Object(r.each)(u, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = e.style,
                            o = r.left,
                            i = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, u[t] = r.pixelLeft + "px", r.left = o, e.runtimeStyle.left = i
                    }
                }), u = u.join(" ")
            }
            if (n && ("width" === t || "height" === t)) {
                var f = oe(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                u = (Object(r.intval)(u) ? Math.max(Object(r.floatval)(u), f) : f) + "px"
            }
            return u
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
        var pe = function(e, t, n) {
            return setTimeout(ve.pbind(e, t, n), 0)
        };

        function me(e, t, n) {
            var o = ye(e, "pseudo-id");
            o || (ye(e, "pseudo-id", o = Object(r.irand)(1e8, 999999999)), ce(e, "_pseudo_" + o));
            var a = t + "-style-" + o,
                u = i(a),
                c = "._pseudo_" + o + ":" + t + "{";
            u || (u = headNode.appendChild(v("style", {
                id: a,
                type: "text/css"
            }))), Object(r.each)(n, function(e, t) {
                c += e + ": " + t + " !important;"
            }), c += "}", u.sheet ? (u.sheet.cssRules.length && u.sheet.deleteRule(0), u.sheet.insertRule(c, 0)) : u.styleSheet && (u.styleSheet.cssText = c)
        }

        function ye(e, t, n) {
            if (!e) return !1;
            var r = e[vkExpand];
            return r || (r = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = e)), vkCache[r][t] = n), t ? vkCache[r] && vkCache[r][t] : r
        }

        function be(e, t, n) {
            return e = i(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function Oe(e) {
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

        function je(e, t) {
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
                        r || je(e)
                    }
                } else Object(o.removeEvent)(e), Oe(e, vkExpand), delete vkCache[n]
        }

        function _e() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = i(e[t]);
                n && (je(n), Oe(n, "btnevents"))
            }
        }

        function Ce(e, t, n) {
            if ((e = i(e)) && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) e.setAttribute("title", n || e.innerText || e.textContent);
                else {
                    var r = u("b", e);
                    r && (r.scrollWidth > r.clientWidth || r.scrollHeight > r.clientHeight) ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function Te() {
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

        function Se(e, t, n) {
            if (e = i(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(o.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
        }

        function Ee(e, t, n) {
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

        function ke(e, t, n) {
            for (e = i(e), n = n || 999; e && !t(e);) {
                if (0 === --n) return !1;
                try {
                    if ((e = H(e)) === document) break
                } catch (t) {
                    e = !1
                }
            }
            return e
        }
        var xe = !1;

        function Ae(e) {
            if (!xe) return window.document.title = Object(r.replaceEntities)(e)
        }

        function De(e) {
            xe = e, e && window.cur && window.cur.destroy.push(function() {
                De(!1)
            })
        }

        function Ne() {
            window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
        }
        window.ge = i, window.geByTag = a, window.geByTag1 = u, window.geByClass = c, window.geByClass1 = l, window.gpeByClass = d, window.domQuery = s, window.domQuery1 = f, window.domClosest = w, window.ce = v, window.cf = O, window.re = j, window.se = _, window.sech = C, window.rs = T, window.psr = S, window.domReplaceEl = E, window.domEL = k, window.domNS = x, window.domPS = A, window.domFC = D, window.domLC = N, window.domPN = H, window.domChildren = L, window.domInsertBefore = M, window.domInsertAfter = P, window.domByClass = R, window.domData = Y, window.domChildIndex = z, window.domCA = I, window.domClosestSibling = B, window.matchesSelector = F, window.isHover = W, window.isAncestor = K, window.getScroll = U, window.domClosestPositioned = X, window.domClosestOverflowHidden = $, window.show = V, window.hide = q, window.isVisible = Z, window.clientHeight = G, window.getClientRectOffsetY = Q, window.toggle = J, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = ne, window.isWindow = re, window.getSize = oe, window.hasClass = ue, window.addClass = ce, window.addClassDelayed = le, window.removeClass = de, window.removeClassDelayed = se, window.toggleClass = fe, window.toggleClassDelayed = we, window.replaceClass = he, window.getStyle = ge, window.setStyle = ve, window.setStyleDelayed = pe, window.setPseudoStyle = me, window.data = ye, window.attr = be, window.removeAttr = Oe, window.removeData = je, window.cleanElems = _e, window.setTitle = Ce, window.getZoom = Te, window.val = Se, window.elfocus = Ee, window.traverseParent = ke, window.getH = ae, window.getW = ie, window.domClosestByTag = h, window.setDocumentTitle = Ae, window.lockDocumentTitle = De
    }
});