! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}({
    0: function(e, t, n) {
        e.exports = n(98)
    },
    32: function(e, t) {
        function n() {
            l = !1, a.length ? s = a.concat(s) : c = -1, s.length && r()
        }

        function r() {
            if (!l) {
                var e = setTimeout(n);
                l = !0;
                for (var t = s.length; t;) {
                    for (a = s, s = []; ++c < t;) a && a[c].run();
                    c = -1, t = s.length
                }
                a = null, l = !1, clearTimeout(e)
            }
        }

        function o(e, t) {
            this.fun = e, this.array = t
        }

        function i() {}
        var a, u = e.exports = {},
            s = [],
            l = !1,
            c = -1;
        u.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            s.push(new o(e, t)), 1 !== s.length || l || setTimeout(r, 0)
        }, o.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", u.versions = {}, u.on = i, u.addListener = i, u.once = i, u.off = i, u.removeListener = i, u.removeAllListeners = i, u.emit = i, u.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, u.cwd = function() {
            return "/"
        }, u.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, u.umask = function() {
            return 0
        }
    },
    62: function(e, t) {
        e.exports = function() {
            throw new Error("define cannot be used indirect")
        }
    },
    98: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o() {
            c || (window.LazyLoadInited = c = !0, Element.prototype.closest && ((0, l["default"])(), (0, u["default"])()))
        }

        function i(e) {
            c && ((0, l["default"])(), (0, a.update)(e))
        }
        var a = n(137),
            u = r(a),
            s = n(102),
            l = r(s),
            c = window.LazyLoadInited;
        window.LazyLoad = {
            init: o,
            scan: i,
            scanDelayed: function(e) {
                return setTimeout(function() {
                    return i(e)
                }, 20)
            },
            watch: function() {
                c && (0, a.watch)()
            }
        };
        try {
            stManager.done("lazyload.js")
        } catch (d) {}
    },
    102: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = (0, s.getXY)(e),
                n = a(t, 2),
                r = n[1],
                o = e.closest(".ui_scroll_outer, #wk_layer_wrap, #box_layer_wrap, body"),
                i = !1;
            if ("BODY" !== o.tagName && o) {
                i = !0;
                var u = (0, s.getXY)(o),
                    l = a(u, 2),
                    c = l[1];
                r -= c, r += o.scrollTop
            }
            return {
                y: r,
                from: i ? "custom_scroll" : "window"
            }
        }

        function o() {
            l = [];
            for (var e = (0, s.geByClass)("lazyload_need_load"), t = 0; t < e.length; t++) {
                var n = e[t],
                    o = r(n),
                    i = o.y,
                    u = o.from,
                    c = (0, s.getSize)(n),
                    d = a(c, 2),
                    f = d[0],
                    w = d[1];
                l.push({
                    elem: n,
                    y: i,
                    from: u,
                    width: f,
                    height: w
                })
            }
            cur.objects = l
        }

        function i() {
            return l
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (s) {
                    o = !0, i = s
                } finally {
                    try {
                        !r && u["return"] && u["return"]()
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
        }();
        t.getObjects = i, t["default"] = function() {
            o(), (0, u.update)()
        };
        var u = n(137),
            s = n(197),
            l = []
    },
    112: function(e, t) {},
    137: function(e, t, n) {
        "use strict";

        function r(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t["default"] = e, t
        }

        function o() {
            i(window)
        }

        function i(e) {
            addEvent(e, "scroll", a.pbind(e))
        }

        function a(e) {
            var t = c.getObjects(),
                n = window.innerHeight,
                r = 0,
                o = !0;
            e === document || e === window ? r = m() : e ? (r = e.scrollTop, o = !1) : window.wkcur && window.wkcur.shown ? (r = window.wkLayerWrap.scrollTop, o = !1) : p() ? (r = window.boxLayerWrap.scrollTop, o = !1) : r = m(), !o && e && (n = e.offsetHeight);
            for (var i = function(e) {
                    var i = t[e],
                        u = i.elem,
                        s = i.y,
                        l = i.height,
                        c = i.from;
                    if ("window" !== c && o) return "continue";
                    if (s > r - 1.5 * n && r + 1.5 * n > s - l) {
                        (0, f.removeClass)(u, "lazyload_need_load"), t.splice(e, 1), e--;
                        var w = (0, f.attr)(u, "data-lazyload-src");
                        (0, d.loadImage)(w).then(function(e) {
                            10 > e && (0, f.addClass)(u, "lazyload_no_animation"), "IMG" === u.tagName ? (0, f.attr)(u, "src", w) : (0, f.setStyle)(u, "background-image", "url(" + w + ")"), (0, f.addClass)(u, "lazyload_loaded"), (0, f.re)((0, f.geByClass1)("lazyload_preview", u))
                        })
                    }
                    a = e
                }, a = 0; a < t.length; a++) i(a)
        }

        function u(e) {
            a(e)
        }

        function s() {
            o(), u()
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.watch = i, t.update = u, t["default"] = s;
        var l = n(102),
            c = r(l),
            d = n(178),
            f = n(197),
            w = window,
            p = w.curBox,
            m = w.scrollGetY
    },
    175: function(e, t, n) {
        var r;
        (function(e, o, i) {
            (function() {
                "use strict";

                function a(e) {
                    return "function" == typeof e || "object" == typeof e && null !== e
                }

                function u(e) {
                    return "function" == typeof e
                }

                function s(e) {
                    X = e
                }

                function l(e) {
                    Z = e
                }

                function c() {
                    return function() {
                        e.nextTick(m)
                    }
                }

                function d() {
                    return function() {
                        q(m)
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

                function w() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = m,
                        function() {
                            e.port2.postMessage(0)
                        }
                }

                function p() {
                    return function() {
                        setTimeout(m, 1)
                    }
                }

                function m() {
                    for (var e = 0; Q > e; e += 2) {
                        var t = re[e],
                            n = re[e + 1];
                        t(n), re[e] = void 0, re[e + 1] = void 0
                    }
                    Q = 0
                }

                function h() {
                    try {
                        var e = n(112);
                        return q = e.runOnLoop || e.runOnContext, d()
                    } catch (t) {
                        return p()
                    }
                }

                function v(e, t) {
                    var n = this,
                        r = n._state;
                    if (r === ue && !e || r === se && !t) return this;
                    var o = new this.constructor(g),
                        i = n._result;
                    if (r) {
                        var a = arguments[r - 1];
                        Z(function() {
                            D(r, o, a, i)
                        })
                    } else O(n, o, e, t);
                    return o
                }

                function y(e) {
                    var t = this;
                    if (e && "object" == typeof e && e.constructor === t) return e;
                    var n = new t(g);
                    return A(n, e), n
                }

                function g() {}

                function b() {
                    return new TypeError("You cannot resolve a promise with itself")
                }

                function _() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }

                function C(e) {
                    try {
                        return e.then
                    } catch (t) {
                        return le.error = t, le
                    }
                }

                function x(e, t, n, r) {
                    try {
                        e.call(t, n, r)
                    } catch (o) {
                        return o
                    }
                }

                function S(e, t, n) {
                    Z(function(e) {
                        var r = !1,
                            o = x(n, t, function(n) {
                                r || (r = !0, t !== n ? A(e, n) : N(e, n))
                            }, function(t) {
                                r || (r = !0, j(e, t))
                            }, "Settle: " + (e._label || " unknown promise"));
                        !r && o && (r = !0, j(e, o))
                    }, e)
                }

                function T(e, t) {
                    t._state === ue ? N(e, t._result) : t._state === se ? j(e, t._result) : O(t, void 0, function(t) {
                        A(e, t)
                    }, function(t) {
                        j(e, t)
                    })
                }

                function k(e, t, n) {
                    t.constructor === e.constructor && n === oe && constructor.resolve === ie ? T(e, t) : n === le ? j(e, le.error) : void 0 === n ? N(e, t) : u(n) ? S(e, t, n) : N(e, t)
                }

                function A(e, t) {
                    e === t ? j(e, b()) : a(t) ? k(e, t, C(t)) : N(e, t)
                }

                function E(e) {
                    e._onerror && e._onerror(e._result), P(e)
                }

                function N(e, t) {
                    e._state === ae && (e._result = t, e._state = ue, 0 !== e._subscribers.length && Z(P, e))
                }

                function j(e, t) {
                    e._state === ae && (e._state = se, e._result = t, Z(E, e))
                }

                function O(e, t, n, r) {
                    var o = e._subscribers,
                        i = o.length;
                    e._onerror = null, o[i] = t, o[i + ue] = n, o[i + se] = r, 0 === i && e._state && Z(P, e)
                }

                function P(e) {
                    var t = e._subscribers,
                        n = e._state;
                    if (0 !== t.length) {
                        for (var r, o, i = e._result, a = 0; a < t.length; a += 3) r = t[a], o = t[a + n], r ? D(n, r, o, i) : o(i);
                        e._subscribers.length = 0
                    }
                }

                function L() {
                    this.error = null
                }

                function M(e, t) {
                    try {
                        return e(t)
                    } catch (n) {
                        return ce.error = n, ce
                    }
                }

                function D(e, t, n, r) {
                    var o, i, a, s, l = u(n);
                    if (l) {
                        if (o = M(n, r), o === ce ? (s = !0, i = o.error, o = null) : a = !0, t === o) return void j(t, _())
                    } else o = r, a = !0;
                    t._state !== ae || (l && a ? A(t, o) : s ? j(t, i) : e === ue ? N(t, o) : e === se && j(t, o))
                }

                function z(e, t) {
                    try {
                        t(function(t) {
                            A(e, t)
                        }, function(t) {
                            j(e, t)
                        })
                    } catch (n) {
                        j(e, n)
                    }
                }

                function R(e) {
                    return new he(this, e).promise
                }

                function B(e) {
                    function t(e) {
                        A(o, e)
                    }

                    function n(e) {
                        j(o, e)
                    }
                    var r = this,
                        o = new r(g);
                    if (!K(e)) return j(o, new TypeError("You must pass an array to race.")), o;
                    for (var i = e.length, a = 0; o._state === ae && i > a; a++) O(r.resolve(e[a]), void 0, t, n);
                    return o
                }

                function H(e) {
                    var t = this,
                        n = new t(g);
                    return j(n, e), n
                }

                function I() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function U() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function W(e) {
                    this._id = pe++, this._state = void 0, this._result = void 0, this._subscribers = [], g !== e && ("function" != typeof e && I(), this instanceof W ? z(this, e) : U())
                }

                function F(e, t) {
                    this._instanceConstructor = e, this.promise = new e(g), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? N(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && N(this.promise, this._result))) : j(this.promise, this._validationError())
                }

                function Y() {
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
                var $;
                $ = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                };
                var q, X, V, K = $,
                    Q = 0,
                    Z = function(e, t) {
                        re[Q] = e, re[Q + 1] = t, Q += 2, 2 === Q && (X ? X(m) : V())
                    },
                    G = "undefined" != typeof window ? window : void 0,
                    J = G || {},
                    ee = J.MutationObserver || J.WebKitMutationObserver,
                    te = "undefined" != typeof e && "[object process]" === {}.toString.call(e),
                    ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    re = new Array(1e3);
                V = te ? c() : ee ? f() : ne ? w() : void 0 === G ? h() : p();
                var oe = v,
                    ie = y,
                    ae = void 0,
                    ue = 1,
                    se = 2,
                    le = new L,
                    ce = new L,
                    de = R,
                    fe = B,
                    we = H,
                    pe = 0,
                    me = W;
                W.all = de, W.race = fe, W.resolve = ie, W.reject = we, W._setScheduler = s, W._setAsap = l, W._asap = Z, W.prototype = {
                    constructor: W,
                    then: oe,
                    "catch": function(e) {
                        return this.then(null, e)
                    }
                };
                var he = F;
                F.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, F.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, n = 0; this._state === ae && e > n; n++) this._eachEntry(t[n], n)
                }, F.prototype._eachEntry = function(e, t) {
                    var n = this._instanceConstructor,
                        r = n.resolve;
                    if (r === ie) {
                        var o = C(e);
                        if (o === oe && e._state !== ae) this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                        else if (n === me) {
                            var i = new n(g);
                            k(i, e, o), this._willSettleAt(i, t)
                        } else this._willSettleAt(new n(function(t) {
                            t(e)
                        }), t)
                    } else this._willSettleAt(r(e), t)
                }, F.prototype._settledAt = function(e, t, n) {
                    var r = this.promise;
                    r._state === ae && (this._remaining--, e === se ? j(r, n) : this._result[t] = n), 0 === this._remaining && N(r, this._result)
                }, F.prototype._willSettleAt = function(e, t) {
                    var n = this;
                    O(e, void 0, function(e) {
                        n._settledAt(ue, t, e)
                    }, function(e) {
                        n._settledAt(se, t, e)
                    })
                };
                var ve = Y,
                    ye = {
                        Promise: me,
                        polyfill: ve
                    };
                n(62).amd ? (r = function() {
                    return ye
                }.call(t, n, t, i), !(void 0 !== r && (i.exports = r))) : "undefined" != typeof i && i.exports ? i.exports = ye : "undefined" != typeof this && (this.ES6Promise = ye), ve()
            }).call(this)
        }).call(t, n(32), function() {
            return this
        }(), n(188)(e))
    },
    178: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = (0, i.vkNow)();
            return new o.Promise(function(n, r) {
                var o = (0, i.vkImage)();
                o.onload = function() {
                    return n((0, i.vkNow)() - t)
                }, o.error = r, o.src = e
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.loadImage = r;
        var o = n(175),
            i = n(179)
    },
    179: function(e, t) {
        "use strict";

        function n(e) {
            var t = PageID;
            return function() {
                t == PageID && e.apply(this, arguments)
            }
        }

        function r(e, t) {
            return setTimeout(n(e), t)
        }

        function o(e, t) {
            return Math.random() * (t - e + 1) + e
        }

        function i(e, t) {
            return Math.floor(o(e, t))
        }

        function a(e) {
            return "undefined" == typeof e
        }

        function u(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        }

        function s(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function l(e) {
            return "string" == typeof e
        }

        function c(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function d(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function f() {
            return +new Date
        }

        function w() {
            return window.Image ? new Image : ce("img")
        }

        function p(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        }

        function m(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        }

        function h(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        }

        function v(e) {
            return e === !0 ? 1 : parseInt(e) || 0
        }

        function y(e) {
            return e === !0 ? 1 : parseFloat(e) || 0
        }

        function g(e) {
            return e = v(e), 0 > e ? 0 : e
        }

        function b(e) {
            return !isNaN(e)
        }

        function _(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return t = v(t), t >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function C(e) {
            return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
        }

        function x(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function S(e) {
            return C(e.replace(/\t/g, "\n"))
        }

        function T(e, t) {
            if (c(e) || "undefined" == typeof e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && t.call(e[n], n, e[n]) === !1) break
            } else
                for (var r = 0, o = e.length; o > r; r++) {
                    var i = e[r];
                    if (t.call(i, r, i) === !1) break
                }
            return e
        }

        function k(e, t, n) {
            for (var r = n || 0, o = (e || []).length; o > r; r++)
                if (e[r] == t) return r;
            return -1
        }

        function A(e, t) {
            return -1 != k(t, e)
        }

        function E(e, t) {
            var n = c(e) || "undefined" == typeof e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === z(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = E(e[r]) : n[r] = e[r]);
            return n
        }

        function N(e) {
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

        function j() {
            var e, t = arguments,
                n = t[0] || {},
                r = 1,
                o = t.length,
                i = !1;
            for ("boolean" == typeof n && (i = n, n = t[1] || {}, r = 2), "object" === ("undefined" == typeof n ? "undefined" : z(n)) || u(n) || (n = {}); o > r; ++r)
                if (null != (e = t[r]))
                    for (var a in e) {
                        var s = n[a],
                            l = e[a];
                        n !== l && (i && l && "object" === ("undefined" == typeof l ? "undefined" : z(l)) && !l.nodeType ? n[a] = j(i, s || (null != l.length ? [] : {}), l) : void 0 !== l && (n[a] = l))
                    }
            return n
        }

        function O(e) {
            window.templates = window.templates || {}, j(window.templates, e)
        }

        function P(e, t) {
            var n = window.templates = window.templates || {},
                r = n[e];
            return "function" == typeof r && (r = r()), r && t ? rs(r, t) : r || ""
        }

        function L(e) {
            if ("object" != ("undefined" == typeof e ? "undefined" : z(e))) return !1;
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

        function M(e, t) {
            for (var n, r = t ? B : R, o = []; e && (n = e.match(r));) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.vkLocal = n, t.lTimeout = r, t.rand = o, t.irand = i, t.isUndefined = a, t.isFunction = u, t.isArray = s, t.isString = l, t.isObject = c, t.isEmpty = d, t.vkNow = f, t.vkImage = w, t.trim = p, t.stripHTML = m, t.escapeRE = h, t.intval = v, t.floatval = y, t.positive = g, t.isNumeric = b, t.winToUtf = _, t.replaceEntities = C, t.clean = x, t.unclean = S, t.each = T, t.indexOf = k, t.inArray = A, t.clone = E, t.arrayKeyDiff = N, t.extend = j, t.addTemplates = O, t.getTemplate = P, t.serializeForm = L, t.extractUrls = M, t.isRetina = D, window.PageID = window.PageID || 1;
        var R = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
            B = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
        window.isRetina = D, window.extractUrls = M, window.serializeForm = L, window.addTemplates = O, window.getTemplate = P, window.rand = o, window.irand = i, window.isUndefined = a, window.isFunction = u, window.isArray = s, window.isString = l, window.isObject = c, window.isEmpty = d, window.vkNow = f, window.vkImage = w, window.trim = p, window.stripHTML = m, window.escapeRE = h, window.intval = v, window.floatval = y, window.positive = g, window.isNumeric = b, window.winToUtf = _, window.replaceEntities = C, window.clean = x, window.unclean = S, window.each = T, window.indexOf = k, window.inArray = A, window.clone = E, window.arrayKeyDiff = N, window.extend = j, window.vkLocal = n, window.lTimeout = r
    },
    188: function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    },
    197: function(e, t, n) {
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
                    for (var u = 0, s = a.length; s > u; ++u) a[u].tagName.toUpperCase() == n && i.push(a[u])
                } else i = Array.prototype.slice.call(a);
                return i
            }
            for (var l = o(n, t), c = new RegExp("(^|\\s)" + e + "(\\s|$)"), u = 0, s = l.length; s > u; ++u) c.test(l[u].className) && i.push(l[u]);
            return i
        }

        function u(e, t, n) {
            return t = r(t) || document, n = n || "*", t.querySelector && t.querySelector(n + "." + e) || a(e, t, n)[0]
        }

        function s(e, t, n) {
            if (t = r(t), !t) return null;
            for (; n !== t && (t = t.parentNode);)
                if (ee(t, e)) return t;
            return null
        }

        function l(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function c(e, t) {
            return (t || document).querySelector(e)
        }

        function d(e, t) {
            return ee(t, e) ? t : s(e, t)
        }

        function f(e, t) {
            return e = e.toUpperCase(), t.nodeType == Node.ELEMENT_NODE && t.tagName.toUpperCase() == e ? t : w(e, t)
        }

        function w(e, t) {
            if (t = r(t), !t) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() == e) return t;
            return null
        }

        function p(e, t, n) {
            var r = document.createElement(e);
            return t && extend(r, t), n && le(r, n), r
        }

        function m(e) {
            return e = r(e), e && e.parentNode && e.parentNode.removeChild(e), e
        }

        function h(e) {
            return S(p("div", {
                innerHTML: e
            }))
        }

        function v(e) {
            return A(p("div", {
                innerHTML: e
            }))
        }

        function y(e, t) {
            return each(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function g(e) {
            return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
        }

        function b(e, t) {
            return isString(t) && (t = h(t)), k(e).replaceChild(t, e), t
        }

        function _(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }

        function C(e) {
            return _((e || {}).nextSibling)
        }

        function x(e) {
            return _((e || {}).previousSibling, 1)
        }

        function S(e) {
            return _((e || {}).firstChild)
        }

        function T(e) {
            return _((e || {}).lastChild, 1)
        }

        function k(e) {
            return (e || {}).parentNode
        }

        function A(e) {
            for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
            return t
        }

        function E(e, t) {
            var n = k(t);
            return n && n.insertBefore(e, t)
        }

        function N(e, t) {
            var n = k(t);
            return n && n.insertBefore(e, C(t))
        }

        function j(e, t) {
            return e ? u(t, e) : e
        }

        function O(e, t, n) {
            return e ? "undefined" != typeof n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function P(e) {
            for (var t = 0; null != (e = x(e));) t++;
            return t
        }

        function L(e, t) {
            do e = k(e); while (e && !D(e, t));
            return e
        }

        function M(e, t, n) {
            for (var r = null; null === r && e;) e = -1 === n ? x(e) : C(e), e && D(e, t) && (r = e);
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

        function z(e) {
            return D(e, ":hover")
        }

        function R(e, t) {
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

        function H(e, t) {
            t = t || {};
            for (var n = t.fromEl || k(e), r = t.positions || ["relative", "absolute", "fixed"]; n && n != bodyNode;) {
                var o = se(n, "position");
                if (inArray(o, r) && (!t.noOverflow || "hidden" != se(n, "overflow"))) break;
                n = k(n)
            }
            return n
        }

        function I(e, t) {
            e = r(e);
            for (var n, o, i, a, u = e; u && u.tagName && u !== bodyNode && (n = se(u, "position"), o = se(u, "overflow"), i = se(u, "transform"), !t || !browser.mozilla || "page_wrap" == u.id || u === e || "visible" === o || ("static" === n ? a && "relative" !== a : "fixed" === a));) "none" !== i ? a = void 0 : "static" !== n && "fixed" !== a && (a = n), u = k(u);
            return u
        }

        function U(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; t > n; n++) U(arguments[n]);
            else if (e = r(e), e && e.style) {
                var o = e.olddisplay,
                    i = "block",
                    a = e.tagName.toLowerCase();
                e.style.display = o || "", "none" === se(e, "display") && (i = ee(e, "inline") || ee(e, "_inline") ? "inline" : ee(e, "_inline_block") ? "inline-block" : "tr" !== a || browser.msie ? "table" !== a || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = i)
            }
        }

        function W(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; t > n; n++) W(arguments[n]);
            else if (e = r(e), e && e.style) {
                var o = se(e, "display");
                e.olddisplay = "none" != o ? o : "", e.style.display = "none"
            }
        }

        function F(e) {
            return e = r(e), e && e.style ? "none" != se(e, "display") : !1
        }

        function Y() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function $(e, t, n) {
            e = r(e), n = n || 0;
            var o = K(e)[1],
                i = Z(e)[1],
                a = window,
                u = document.documentElement,
                s = Math.max(intval(a.innerHeight), intval(u.clientHeight)),
                l = r("page_header_cont"),
                c = u.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                d = vk.staticheader ? Math.max(0, Z(l)[1] - c) : Z(l)[1];
            if (t) {
                if (c + d + n > o + i) return o + i - c - d - n;
                if (o > c + s - n) return o - c - s + n
            } else {
                if (c + d + n > o) return o - c - d - n;
                if (o + i > c + s - n) return o + i - c - s + n
            }
            return 0
        }

        function q(e, t) {
            return void 0 === t && (t = !F(e)), t ? U(e) : W(e), t
        }

        function X(e) {
            return "undefined" != typeof e.getBoundingClientRect
        }

        function V(e, t) {
            var n;
            if (t && "inline" == se(e, "display")) {
                var r = e.getClientRects();
                n = r && r[0] || e.getBoundingClientRect()
            } else n = e.getBoundingClientRect();
            return n
        }

        function K(e, t) {
            if (e = r(e), !e) return [0, 0];
            var n, o, i = {
                    top: 0,
                    left: 0
                },
                a = e.ownerDocument;
            return a ? (n = a.documentElement, X(e) && (i = V(e, !0)), o = a == a.window ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1, [i.left + (t ? 0 : o.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), i.top + (t ? 0 : o.pageYOffset || n.scrollTop) - (n.clientTop || 0)]) : [0, 0]
        }

        function Q(e) {
            return null != e && e === e.window
        }

        function Z(e, t, n) {
            e = r(e);
            var o, i = [0, 0],
                a = document.documentElement;
            if (t && "border-box" === se(e, "boxSizing") && (t = !1), e == document) i = [Math.max(a.clientWidth, bodyNode.scrollWidth, a.scrollWidth, bodyNode.offsetWidth, a.offsetWidth), Math.max(a.clientHeight, bodyNode.scrollHeight, a.scrollHeight, bodyNode.offsetHeight, a.offsetHeight)];
            else if (e) {
                var u = function() {
                    i = X(e) && (o = V(e, n)) && void 0 !== o.width ? [o.width, o.height] : [e.offsetWidth, e.offsetHeight], t && each(i, function(t, n) {
                        var r = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        each(r, function() {
                            i[t] -= parseFloat(se(e, "padding" + this)) || 0, i[t] -= parseFloat(se(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (F(e)) u();
                else {
                    var s = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        l = {},
                        c = !1;
                    e.style.cssText.indexOf("!important") > -1 && (c = e.style.cssText), each(s, function(t, n) {
                        l[t] = e.style[t], e.style[t] = n
                    }), u(), each(s, function(t, n) {
                        e.style[t] = l[t]
                    }), c && (e.style.cssText = c)
                }
            }
            return i
        }

        function G(e) {
            return Z(e)[0]
        }

        function J(e) {
            return Z(e)[1]
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

        function ue(e, t, n) {
            re(e, t), te(e, n)
        }

        function se(e, t, n) {
            if (e = r(e), isArray(t)) {
                var o = {};
                return each(t, function(t, n) {
                    o[n] = se(e, n)
                }), o
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" == t && browser.msie) {
                var i = e.style.filter;
                return i ? i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" == t)) return e.style[t];
            var a, u = document.defaultView || window;
            if (u.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var s = u.getComputedStyle(e, null);
                s && (a = s.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" == t && browser.msie) {
                    var i = e.currentStyle.filter;
                    return i && i.indexOf("opacity=") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var l = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                a = e.currentStyle[t] || e.currentStyle[l], "auto" == a && (a = 0), a = (a + "").split(" "), each(a, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = e.style,
                            o = r.left,
                            i = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, a[t] = r.pixelLeft + "px", r.left = o, e.runtimeStyle.left = i
                    }
                }), a = a.join(" ")
            }
            if (n && ("width" == t || "height" == t)) {
                var c = Z(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                a = (intval(a) ? Math.max(floatval(a), c) : c) + "px"
            }
            return a
        }

        function le(e, t, n) {
            if (e = r(e)) {
                if ("object" == ("undefined" == typeof t ? "undefined" : Se(t))) return each(t, function(t, n) {
                    le(e, t, n)
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
            setTimeout(le.pbind(e, t, n), 0)
        }

        function de(e, t, n) {
            var o = fe(e, "pseudo-id");
            o || (fe(e, "pseudo-id", o = irand(1e8, 999999999)), te(e, "_pseudo_" + o));
            var i = t + "-style-" + o,
                a = r(i),
                u = "._pseudo_" + o + ":" + t + "{";
            a || (a = headNode.appendChild(p("style", {
                id: i,
                type: "text/css"
            }))), each(n, function(e, t) {
                u += e + ": " + t + " !important;"
            }), u += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(u, 0)) : a.styleSheet && (a.styleSheet.cssText = u)
        }

        function fe(e, t, n) {
            if (!e) return !1;
            var r, o = e[vkExpand];
            return o || (o = e[vkExpand] = ++vkUUID), n !== r && (vkCache[o] || (vkCache[o] = {}, __debugMode && (vkCache[o].__elem = e)), vkCache[o][t] = n), t ? vkCache[o] && vkCache[o][t] : o
        }

        function we(e, t, n) {
            return e = r(e), "undefined" == typeof n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function pe(e) {
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
                } else removeEvent(e), pe(e, vkExpand), delete vkCache[n]
        }

        function he() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = r(e[t]);
                n && (me(n), pe(n, "btnevents"))
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

        function ye() {
            var e = r("zoom_test_1") || document.body.appendChild(p("div", {
                    id: "zoom_test_1"
                }, {
                    left: "10%",
                    position: "absolute",
                    visibility: "hidden"
                })),
                t = r("zoom_test_2") || document.body.appendChild(p("div", {
                    id: "zoom_test_2"
                }, {
                    left: e.offsetLeft + "px",
                    position: "absolute",
                    visibility: "hidden"
                }));
            return t.offsetLeft / e.offsetLeft
        }

        function ge(e, t, n) {
            return (e = r(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
        }

        function be(e, t, n) {
            e = r(e);
            try {
                if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === n || n === !1) && (n = t), e.createTextRange) {
                    var o = e.createTextRange();
                    o.collapse(!0), o.moveEnd("character", n), o.moveStart("character", t), o.select()
                } else e.setSelectionRange && e.setSelectionRange(t, n)
            } catch (i) {}
        }

        function _e(e, t, n) {
            for (e = r(e), n = n || 999; e && !t(e);) {
                if (n--, 0 == n) return !1;
                try {
                    if (e = k(e), e == document) break
                } catch (o) {
                    e = !1
                }
            }
            return e
        }

        function Ce(e) {
            return ke ? void 0 : window.document.title = replaceEntities(e)
        }

        function xe(e) {
            ke = e, e && window.cur && window.cur.destroy.push(function() {
                xe(!1)
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var Se = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.ge = r, t.geByTag = o, t.geByTag1 = i, t.geByClass = a, t.geByClass1 = u, t.gpeByClass = s, t.domQuery = l, t.domQuery1 = c, t.domClosest = d, t.domClosestByTag = f, t.gpeByTag = w, t.ce = p, t.re = m, t.se = h, t.sech = v, t.rs = y, t.psr = g, t.domReplaceEl = b, t.domEL = _, t.domNS = C, t.domPS = x, t.domFC = S, t.domLC = T, t.domPN = k, t.domChildren = A, t.domInsertBefore = E, t.domInsertAfter = N, t.domByClass = j, t.domData = O, t.domChildIndex = P, t.domCA = L, t.domClosestSibling = M, t.matchesSelector = D, t.isHover = z, t.isAncestor = R, t.getScroll = B, t.domClosestPositioned = H, t.domClosestOverflowHidden = I, t.show = U, t.hide = W, t.isVisible = F, t.clientHeight = Y, t.getClientRectOffsetY = $, t.toggle = q, t.boundingRectEnabled = X, t.getXYRect = V, t.getXY = K, t.isWindow = Q, t.getSize = Z, t.getW = G, t.getH = J, t.hasClass = ee, t.addClass = te, t.addClassDelayed = ne, t.removeClass = re, t.removeClassDelayed = oe, t.toggleClass = ie, t.toggleClassDelayed = ae, t.replaceClass = ue, t.getStyle = se, t.setStyle = le, t.setStyleDelayed = ce, t.setPseudoStyle = de, t.data = fe, t.attr = we, t.removeAttr = pe, t.removeData = me, t.cleanElems = he, t.setTitle = ve, t.getZoom = ye, t.val = ge, t.elfocus = be, t.traverseParent = _e, t.setDocumentTitle = Ce, t.lockDocumentTitle = xe;
        var Te = n(179);
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
        }(), window.vkExpand = window.vkExpand || "VK" + (0, Te.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var ke = !1;
        window.ge = r, window.geByTag = o, window.geByTag1 = i, window.geByClass = a, window.geByClass1 = u, window.gpeByClass = s, window.domQuery = l, window.domQuery1 = c, window.domClosest = d, window.ce = p, window.re = m, window.se = h, window.sech = v, window.rs = y, window.psr = g, window.domReplaceEl = b, window.domEL = _, window.domNS = C, window.domPS = x, window.domFC = S, window.domLC = T, window.domPN = k, window.domChildren = A, window.domInsertBefore = E, window.domInsertAfter = N, window.domByClass = j, window.domData = O, window.domChildIndex = P, window.domCA = L, window.domClosestSibling = M, window.matchesSelector = D, window.isHover = z, window.isAncestor = R, window.getScroll = B, window.domClosestPositioned = H, window.domClosestOverflowHidden = I, window.show = U, window.hide = W, window.isVisible = F, window.clientHeight = Y, window.getClientRectOffsetY = $, window.toggle = q, window.boundingRectEnabled = X, window.getXYRect = V, window.getXY = K, window.isWindow = Q, window.getSize = Z, window.hasClass = ee, window.addClass = te, window.addClassDelayed = ne, window.removeClass = re, window.removeClassDelayed = oe, window.toggleClass = ie,
            window.toggleClassDelayed = ae, window.replaceClass = ue, window.getStyle = se, window.setStyle = le, window.setStyleDelayed = ce, window.setPseudoStyle = de, window.data = fe, window.attr = we, window.removeAttr = pe, window.removeData = me, window.cleanElems = he, window.setTitle = ve, window.getZoom = ye, window.val = ge, window.elfocus = be, window.traverseParent = _e, window.getH = J, window.getW = G, window.domClosestByTag = f, window.setDocumentTitle = Ce, window.lockDocumentTitle = xe
    }
});