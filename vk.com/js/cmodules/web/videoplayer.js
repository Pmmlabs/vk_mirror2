﻿! function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var r = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return t[n].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
}([function(t, e, i) {
    t.exports = i(33)
}, function(t, e, i) {
    var n = i(75);
    t.exports = function(t) {
        if (!n(t)) throw TypeError(t + " is not an object!");
        return t
    }
}, function(t, e, i) {
    var n = i(92),
        r = i(22),
        o = i(105)(!1),
        s = i(37)("IE_PROTO");
    t.exports = function(t, e) {
        var i, a = r(t),
            l = 0,
            u = [];
        for (i in a) i != s && n(a, i) && u.push(i);
        for (; e.length > l;) n(a, i = e[l++]) && (~o(u, i) || u.push(i));
        return u
    }
}, function(t, e, i) {
    t.exports = i(23)
}, function(t, e) {
    t.exports = function(t, e, i, n) {
        if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(i + ": incorrect invocation!");
        return t
    }
}, function(t, e) {
    e.f = {}.propertyIsEnumerable
}, function(t, e, i) {
    var n = i(81),
        r = i(27),
        o = i(110),
        s = i(1),
        a = i(10),
        l = i(52);
    t.exports = function(t, e, i, u, h) {
        var d, c, p, f = h ? function() {
                return t
            } : l(t),
            y = n(i, u, e ? 2 : 1),
            v = 0;
        if ("function" != typeof f) throw TypeError(t + " is not iterable!");
        if (o(f))
            for (d = a(t.length); d > v; v++) e ? y(s(c = t[v])[0], c[1]) : y(t[v]);
        else
            for (p = f.call(t); !(c = p.next()).done;) r(p, y, c.value, e)
    }
}, function(t, e) {
    "use strict";

    function i(t, e) {
        var i = !0,
            n = !1,
            r = void 0;
        try {
            for (var s, a = o[Symbol.iterator](); !(i = (s = a.next()).done); i = !0) {
                var l = s.value;
                if (t <= l.width && e <= l.height) return l.height
            }
        } catch (u) {
            n = !0, r = u
        } finally {
            try {
                !i && a["return"] && a["return"]()
            } finally {
                if (n) throw r
            }
        }
        return e
    }

    function n(t) {
        var e = o[t];
        return e ? e.height : 0
    }

    function r(t) {
        for (var e = 0; e < o.length; e++)
            if (t <= o[e].height) return e;
        var i = o.length - 1;
        return i
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.qualityFromSize = i, e.qualityFromIndex = n, e.indexFromQuality = r;
    var o = (e.AUTO = -1, e.DEFAULT = 480, e.INLINE_INITIAL = 480, e.HD = 720, e.HD_2K = 1440, e.HD_4K = 2160, [{
        width: 320,
        height: 240
    }, {
        width: 640,
        height: 360
    }, {
        width: 854,
        height: 480
    }, {
        width: 1280,
        height: 720
    }, {
        width: 1920,
        height: 1080
    }, {
        width: 2560,
        height: 1440
    }, {
        width: 3840,
        height: 2160
    }])
}, function(t, e) {
    var i = t.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = i)
}, function(t, e, i) {
    i(69), i(30), i(68), i(87), t.exports = i(8).Promise
}, function(t, e, i) {
    var n = i(17),
        r = Math.min;
    t.exports = function(t) {
        return t > 0 ? r(n(t), 9007199254740991) : 0
    }
}, function(t, e, i) {
    var n = i(92),
        r = i(32),
        o = i(37)("IE_PROTO"),
        s = Object.prototype;
    t.exports = Object.getPrototypeOf || function(t) {
        return t = r(t), n(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null
    }
}, function(t, e, i) {
    var n = i(85),
        r = i(8),
        o = i(81),
        s = i(23),
        a = "prototype",
        l = function(t, e, i) {
            var u, h, d, c = t & l.F,
                p = t & l.G,
                f = t & l.S,
                y = t & l.P,
                v = t & l.B,
                g = t & l.W,
                _ = p ? r : r[e] || (r[e] = {}),
                m = _[a],
                b = p ? n : f ? n[e] : (n[e] || {})[a];
            p && (i = e);
            for (u in i) h = !c && b && void 0 !== b[u], h && u in _ || (d = h ? b[u] : i[u], _[u] = p && "function" != typeof b[u] ? i[u] : v && h ? o(d, n) : g && b[u] == d ? function(t) {
                var e = function(e, i, n) {
                    if (this instanceof t) {
                        switch (arguments.length) {
                            case 0:
                                return new t;
                            case 1:
                                return new t(e);
                            case 2:
                                return new t(e, i)
                        }
                        return new t(e, i, n)
                    }
                    return t.apply(this, arguments)
                };
                return e[a] = t[a], e
            }(d) : y && "function" == typeof d ? o(Function.call, d) : d, y && ((_.virtual || (_.virtual = {}))[u] = d, t & l.R && m && !m[u] && s(m, u, d)))
        };
    l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, t.exports = l
}, function(t, e, i) {
    var n = i(75);
    t.exports = function(t, e) {
        if (!n(t)) return t;
        var i, r;
        if (e && "function" == typeof(i = t.toString) && !n(r = i.call(t))) return r;
        if ("function" == typeof(i = t.valueOf) && !n(r = i.call(t))) return r;
        if (!e && "function" == typeof(i = t.toString) && !n(r = i.call(t))) return r;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(t, e, i) {
    var n = i(23);
    t.exports = function(t, e, i) {
        for (var r in e) i && t[r] ? t[r] = e[r] : n(t, r, e[r]);
        return t
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function s(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = i(51),
        l = n(a),
        u = 10,
        h = 6,
        d = 3e3,
        c = function(t) {
            function e(i) {
                r(this, e);
                var n = o(this, t.call(this, i));
                return n.el = se('\n<div class="videoplayer_tooltip">\n  <div class="_text"></div>\n  <div class="_arrow"></div>\n</div>\n    '), n._text = domByClass(n.el, "_text"), n._arrow = domByClass(n.el, "_arrow"), n._shown = !1, n
            }
            return s(e, t), e.prototype.show = function(t) {
                function e(e) {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }, e
            }(function(t) {
                var e = t.el,
                    i = t.text,
                    n = t.toDown,
                    r = void 0 === n ? !1 : n,
                    o = t.offsetXpercent,
                    s = void 0 === o ? .5 : o,
                    a = t.offsetY,
                    l = void 0 === a ? 9 : a;
                if (i = isFunction(i) ? i() : i) {
                    show(this.el), val(this._text, i);
                    var c = this.player.el.getBoundingClientRect(),
                        p = e.getBoundingClientRect(),
                        f = this.el.getBoundingClientRect(),
                        y = p.left - c.left + Math.round(p.width * s) - Math.round(f.width / 2),
                        v = (r ? p.bottom : p.top) - c.top - (r ? 0 : f.height) + l * (r ? 1 : -1),
                        g = void 0;
                    u > y ? (g = y - u - h, y = u) : y + f.width > c.width - u && (g = y + f.width - (c.width - u) - h, y = c.width - f.width - u), setStyle(this.el, {
                        left: y + "px",
                        top: v + "px"
                    }), setStyle(this._arrow, {
                        marginLeft: g ? g + "px" : null
                    }), toggleClass(this._arrow, "_arrow_up", r), this.undelay(this._hideDelayedTimeout), this.undelay(this._hideTimeout), this._hideTimeout = this.delay(this.hide, d), this._shown = !0
                }
            }), e.prototype.hide = function(t) {
                function e() {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }, e
            }(function() {
                this._shown && (this._shown = !1, hide(this.el), this.lastShown = Date.now())
            }), e.prototype.hideWithDelay = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this._shown && (this._hideDelayedTimeout = this.delay(this.hide, t))
            }, e.prototype.isVisible = function() {
                return this._shown
            }, e
        }(l["default"]);
    e["default"] = c
}, function(t, e) {
    (function(e) {
        ! function(e) {
            "use strict";

            function i(t, e, i, n) {
                var o = e && e.prototype instanceof r ? e : r,
                    s = Object.create(o.prototype),
                    a = new p(n || []);
                return s._invoke = u(t, i, a), s
            }

            function n(t, e, i) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, i)
                    }
                } catch (n) {
                    return {
                        type: "throw",
                        arg: n
                    }
                }
            }

            function r() {}

            function o() {}

            function s() {}

            function a(t) {
                ["next", "throw", "return"].forEach(function(e) {
                    t[e] = function(t) {
                        return this._invoke(e, t)
                    }
                })
            }

            function l(t) {
                function i(e, r, o, s) {
                    var a = n(t[e], t, r);
                    if ("throw" !== a.type) {
                        var l = a.arg,
                            u = l.value;
                        return u && "object" == typeof u && _.call(u, "__await") ? Promise.resolve(u.__await).then(function(t) {
                            i("next", t, o, s)
                        }, function(t) {
                            i("throw", t, o, s)
                        }) : Promise.resolve(u).then(function(t) {
                            l.value = t, o(l)
                        }, s)
                    }
                    s(a.arg)
                }

                function r(t, e) {
                    function n() {
                        return new Promise(function(n, r) {
                            i(t, e, n, r)
                        })
                    }
                    return o = o ? o.then(n, n) : n()
                }
                "object" == typeof e.process && e.process.domain && (i = e.process.domain.bind(i));
                var o;
                this._invoke = r
            }

            function u(t, e, i) {
                var r = A;
                return function(o, s) {
                    if (r === k) throw new Error("Generator is already running");
                    if (r === C) {
                        if ("throw" === o) throw s;
                        return y()
                    }
                    for (i.method = o, i.arg = s;;) {
                        var a = i.delegate;
                        if (a) {
                            var l = h(a, i);
                            if (l) {
                                if (l === P) continue;
                                return l
                            }
                        }
                        if ("next" === i.method) i.sent = i._sent = i.arg;
                        else if ("throw" === i.method) {
                            if (r === A) throw r = C, i.arg;
                            i.dispatchException(i.arg)
                        } else "return" === i.method && i.abrupt("return", i.arg);
                        r = k;
                        var u = n(t, e, i);
                        if ("normal" === u.type) {
                            if (r = i.done ? C : T, u.arg === P) continue;
                            return {
                                value: u.arg,
                                done: i.done
                            }
                        }
                        "throw" === u.type && (r = C, i.method = "throw", i.arg = u.arg)
                    }
                }
            }

            function h(t, e) {
                var i = t.iterator[e.method];
                if (i === v) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator["return"] && (e.method = "return", e.arg = v, h(t, e), "throw" === e.method)) return P;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return P
                }
                var r = n(i, t.iterator, e.arg);
                if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, P;
                var o = r.arg;
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = v), e.delegate = null, P) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, P)
            }

            function d(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function c(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function p(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(d, this), this.reset(!0)
            }

            function f(t) {
                if (t) {
                    var e = t[b];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var i = -1,
                            n = function r() {
                                for (; ++i < t.length;)
                                    if (_.call(t, i)) return r.value = t[i], r.done = !1, r;
                                return r.value = v, r.done = !0, r
                            };
                        return n.next = n
                    }
                }
                return {
                    next: y
                }
            }

            function y() {
                return {
                    value: v,
                    done: !0
                }
            }
            var v, g = Object.prototype,
                _ = g.hasOwnProperty,
                m = "function" == typeof Symbol ? Symbol : {},
                b = m.iterator || "@@iterator",
                E = m.asyncIterator || "@@asyncIterator",
                S = m.toStringTag || "@@toStringTag",
                L = "object" == typeof t,
                w = e.regeneratorRuntime;
            if (w) return void(L && (t.exports = w));
            w = e.regeneratorRuntime = L ? t.exports : {}, w.wrap = i;
            var A = "suspendedStart",
                T = "suspendedYield",
                k = "executing",
                C = "completed",
                P = {},
                I = {};
            I[b] = function() {
                return this
            };
            var D = Object.getPrototypeOf,
                x = D && D(D(f([])));
            x && x !== g && _.call(x, b) && (I = x);
            var M = s.prototype = r.prototype = Object.create(I);
            o.prototype = M.constructor = s, s.constructor = o, s[S] = o.displayName = "GeneratorFunction", w.isGeneratorFunction = function(t) {
                var e = "function" == typeof t && t.constructor;
                return e ? e === o || "GeneratorFunction" === (e.displayName || e.name) : !1
            }, w.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (t.__proto__ = s, S in t || (t[S] = "GeneratorFunction")), t.prototype = Object.create(M), t
            }, w.awrap = function(t) {
                return {
                    __await: t
                }
            }, a(l.prototype), l.prototype[E] = function() {
                return this
            }, w.AsyncIterator = l, w.async = function(t, e, n, r) {
                var o = new l(i(t, e, n, r));
                return w.isGeneratorFunction(e) ? o : o.next().then(function(t) {
                    return t.done ? t.value : o.next()
                })
            }, a(M), M[S] = "Generator", M[b] = function() {
                return this
            }, M.toString = function() {
                return "[object Generator]"
            }, w.keys = function(t) {
                var e = [];
                for (var i in t) e.push(i);
                return e.reverse(),
                    function n() {
                        for (; e.length;) {
                            var i = e.pop();
                            if (i in t) return n.value = i, n.done = !1, n
                        }
                        return n.done = !0, n
                    }
            }, w.values = f, p.prototype = {
                constructor: p,
                reset: function(t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = v, this.done = !1, this.delegate = null, this.method = "next", this.arg = v, this.tryEntries.forEach(c), !t)
                        for (var e in this) "t" === e.charAt(0) && _.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = v)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0],
                        e = t.completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval
                },
                dispatchException: function(t) {
                    function e(e, n) {
                        return o.type = "throw", o.arg = t, i.next = e, n && (i.method = "next", i.arg = v), !!n
                    }
                    if (this.done) throw t;
                    for (var i = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                        var r = this.tryEntries[n],
                            o = r.completion;
                        if ("root" === r.tryLoc) return e("end");
                        if (r.tryLoc <= this.prev) {
                            var s = _.call(r, "catchLoc"),
                                a = _.call(r, "finallyLoc");
                            if (s && a) {
                                if (this.prev < r.catchLoc) return e(r.catchLoc, !0);
                                if (this.prev < r.finallyLoc) return e(r.finallyLoc)
                            } else if (s) {
                                if (this.prev < r.catchLoc) return e(r.catchLoc, !0)
                            } else {
                                if (!a) throw new Error("try statement without catch or finally");
                                if (this.prev < r.finallyLoc) return e(r.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var n = this.tryEntries[i];
                        if (n.tryLoc <= this.prev && _.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var r = n;
                            break
                        }
                    }
                    r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);
                    var o = r ? r.completion : {};
                    return o.type = t, o.arg = e, r ? (this.method = "next", this.next = r.finallyLoc, P) : this.complete(o)
                },
                complete: function(t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), P
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var i = this.tryEntries[e];
                        if (i.finallyLoc === t) return this.complete(i.completion, i.afterLoc), c(i), P
                    }
                },
                "catch": function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var i = this.tryEntries[e];
                        if (i.tryLoc === t) {
                            var n = i.completion;
                            if ("throw" === n.type) {
                                var r = n.arg;
                                c(i)
                            }
                            return r
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(t, e, i) {
                    return this.delegate = {
                        iterator: f(t),
                        resultName: e,
                        nextLoc: i
                    }, "next" === this.method && (this.arg = v), P
                }
            }
        }("object" == typeof e ? e : "object" == typeof window ? window : "object" == typeof self ? self : this)
    }).call(e, function() {
        return this
    }())
}, function(t, e) {
    var i = Math.ceil,
        n = Math.floor;
    t.exports = function(t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? n : i)(t)
    }
}, function(t, e) {
    t.exports = function(t, e) {
        return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e
        }
    }
}, function(t, e, i) {
    var n, r, o, s = i(81),
        a = i(76),
        l = i(74),
        u = i(62),
        h = i(85),
        d = h.process,
        c = h.setImmediate,
        p = h.clearImmediate,
        f = h.MessageChannel,
        y = 0,
        v = {},
        g = "onreadystatechange",
        _ = function() {
            var t = +this;
            if (v.hasOwnProperty(t)) {
                var e = v[t];
                delete v[t], e()
            }
        },
        m = function(t) {
            _.call(t.data)
        };
    c && p || (c = function(t) {
        for (var e = [], i = 1; arguments.length > i;) e.push(arguments[i++]);
        return v[++y] = function() {
            a("function" == typeof t ? t : Function(t), e)
        }, n(y), y
    }, p = function(t) {
        delete v[t]
    }, "process" == i(61)(d) ? n = function(t) {
        d.nextTick(s(_, t, 1))
    } : f ? (r = new f, o = r.port2, r.port1.onmessage = m, n = s(o.postMessage, o, 1)) : h.addEventListener && "function" == typeof postMessage && !h.importScripts ? (n = function(t) {
        h.postMessage(t + "", "*")
    }, h.addEventListener("message", m, !1)) : n = g in u("script") ? function(t) {
        l.appendChild(u("script"))[g] = function() {
            l.removeChild(this), _.call(t)
        }
    } : function(t) {
        setTimeout(s(_, t, 1), 0)
    }), t.exports = {
        set: c,
        clear: p
    }
}, function(t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function o(t) {
        return function() {
            var e = t.apply(this, arguments);
            return new Promise(function(t, i) {
                function n(r, o) {
                    try {
                        var s = e[r](o),
                            a = s.value
                    } catch (l) {
                        return void i(l)
                    }
                    return s.done ? void t(a) : Promise.resolve(a).then(function(t) {
                        n("next", t)
                    }, function(t) {
                        n("throw", t)
                    })
                }
                return n("next")
            })
        }
    }

    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function() {
            function t(t, e) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        l = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        u = i(60),
        h = r(u),
        d = i(59),
        c = r(d),
        p = i(63),
        f = r(p),
        y = i(7),
        v = r(y),
        g = i(45),
        _ = n(g),
        m = i(40),
        b = n(m),
        E = i(106),
        S = n(E),
        L = i(67),
        w = n(L),
        A = i(102),
        T = i(53),
        k = n(T),
        C = i(56),
        P = n(C),
        I = i(36),
        D = n(I);
    window._request = D["default"];
    var x = 1,
        M = function() {
            function t(e) {
                return s(this, t), e = clone(e), this.setLangVars(e), this.el = ce("div", {
                    className: "videoplayer"
                }), attr(this.el, "tabindex", -1), attr(this.el, "role", "complementary"), attr(this.el, "aria-label", this.langVars.aria_videoplayer), this.state = h.EMPTY, this._volume = this.preferredVolume, this._muted = !this._volume, this._events = new EventEmitter, this.media = new _["default"](this), this.el.appendChild(this.media.el), this.ads = new S["default"](this), this.el.appendChild(this.ads.el), this.ui = new b["default"](this), this.el.appendChild(this.ui.el), this.stats = new w["default"](this), this.on(c.MEDIA_PLAYING, this.onMediaPlaying.bind(this)).on(c.MEDIA_PAUSE, this.onMediaPause.bind(this)).on(c.MEDIA_TIMEUPDATE, this.checkSuggestionQuarterWatched.bind(this)).on(c.MEDIA_ENDED, this.onEnded.bind(this)).on(c.MEDIA_ERROR, this.onError.bind(this)).on(c.UI_SEEKSTART, this.onUiSeekStart.bind(this)).on(c.ADS_LINEAR_STARTED, this.onLinearAdsStarted.bind(this)).on(c.ADS_LINEAR_COMPLETED, this.onLinearAdsCompleted.bind(this)), window.addEventListener("resize", this._resizeHandler = this.resize.bind(this)), A.screenfull && document.addEventListener(A.screenfull.raw.fullscreenchange, this._fsChangeHandler = this.onFullscreenChange.bind(this)), VideoPlayer._instances && VideoPlayer._instances.add(this), this.initVideo(e), {
                    el: this.el,
                    initVideo: this.initVideo.bind(this),
                    deinitVideo: this.deinitVideo.bind(this),
                    on: this.on.bind(this),
                    getState: this.getState.bind(this),
                    getVideoId: this.getVideoId.bind(this),
                    getVars: this.getVars.bind(this),
                    play: this.play.bind(this),
                    pause: this.pause.bind(this),
                    togglePlay: this.togglePlay.bind(this),
                    curTime: this.curTime.bind(this),
                    getDuration: this.getDuration.bind(this),
                    seekTo: this.seekTo.bind(this),
                    getVolume: this.getVolume.bind(this),
                    setVolume: this.setVolume.bind(this),
                    toggleMute: this.toggleMute.bind(this),
                    isMuted: this.isMuted.bind(this),
                    onLiked: this.onLiked.bind(this),
                    onAdded: this.onAdded.bind(this),
                    onSubscribed: this.onSubscribed.bind(this),
                    onExpanded: this.onExpanded.bind(this),
                    onStickersPurchased: this.onStickersPurchased.bind(this),
                    canExpand: this.canExpand.bind(this),
                    isAutoplay: this.isAutoplay.bind(this),
                    isFullscreen: this.isFullscreen.bind(this),
                    isActiveLive: this.isActiveLive.bind(this),
                    nextTimerStart: this.nextTimerStart.bind(this),
                    nextTimerReset: this.nextTimerReset.bind(this),
                    setSuggestions: this.setSuggestions.bind(this),
                    pushDonation: this.pushDonation.bind(this),
                    pushNotice: this.pushNotice.bind(this),
                    pushLiveMidroll: this.pushLiveMidroll.bind(this),
                    resize: this.resize.bind(this),
                    destroy: this.destroy.bind(this),
                    _player: e.dbg_on ? this : null
                }
            }
            return t.prototype.initVideo = function(t) {
                var e = this;
                t = clone(t, !0), this.vars = t, this.changeState(h.UNSTARTED, !0), this.videoLiked = t.liked, this.videoAdded = t.added, this.isSubscribed = t.is_subscribed, this._livePhase = t.live, this.trigger(c._INIT_VIDEO, t), t.from_autoplay && this.toggleMute(!0, !1), this.isActiveLive() && this.startLiveHeartbeat(), t.show_suggestions && this.loadSuggestions(), (window.requestAnimationFrame || window.setTimeout)(function() {
                    e.externalCall("onInitialized"), e.resize(), t.autoplay && e.play()
                }, 0)
            }, t.prototype.deinitVideo = function() {
                this.stopLiveHeartbeat(), this.changeState(h.EMPTY), this._quality = null, this._livePhase = null, this._startedPlaying = !1, this._didEnded = !1, this._suggestions = null, this._suggestionsQid = null, this.trigger(c._DEINIT_VIDEO), this.vars = null
            }, t.prototype.reinitWithoutHls = function() {
                var t = this.vars;
                this.deinitVideo(), delete t.hls, this.initVideo(t)
            }, t.prototype.setLangVars = function(t) {
                var e = this;
                this.langVars = {}, each(t, function(t, i) {
                    "lang_" === t.substr(0, 5) && (e.langVars[t.substr(5)] = i)
                })
            }, t.prototype.loadSuggestions = function() {
                function t() {
                    return e.apply(this, arguments)
                }
                var e = o(regeneratorRuntime.mark(function i() {
                    var t, e, n, r, o, s, a, l, u;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                            case 0:
                                if (t = this.getVideoId(), e = this.vars.suggestions_sig) {
                                    i.next = 4;
                                    break
                                }
                                return i.abrupt("return");
                            case 4:
                                return n = {
                                    id: t,
                                    t_sex: this.vars.g || null,
                                    t_age: this.vars.a || null,
                                    uid: this.vars.viewer_id || null,
                                    sig: e
                                }, r = (0, D["default"])("//vk.go.mail.ru/vk/video_recommend?" + ajx2q(n)), i.next = 8, r.promise;
                            case 8:
                                o = i.sent, s = o.response, a = JSON.parse(s), this.getVideoId() === t && a && a.results && a.results.length && (this._suggestionsQid = a.qid, l = a.results, u = !(!this.vars.is_inline && !this.vars.is_embed), this.externalCall("fetchSuggestions", l.join(","), u));
                            case 12:
                            case "end":
                                return i.stop()
                        }
                    }, i, this)
                }));
                return t
            }(), t.prototype.checkSuggestionQuarterWatched = function(t) {
                this.isInited() && this.vars.suggestions_qid && !this._suggestionQuartedWatched && !this.isPlayingLinearAd() && t / this.getDuration() > .25 && (this._suggestionQuartedWatched = !0, this.onSuggestionQuarterWatched())
            }, t.prototype.isInited = function() {
                return this.getState() !== h.EMPTY
            }, t.prototype.getVars = function() {
                return clone(this.vars)
            }, t.prototype.getVarsByPrefix = function(t) {
                var e = {};
                for (var i in this.vars) 0 === i.indexOf(t) && (e[i] = this.vars[i]);
                return e
            }, t.prototype.getVideoId = function() {
                return this.isInited() ? this.vars.oid + "_" + this.vars.vid : null
            }, t.prototype.getVideoLink = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    e = "https://vk.com/video" + this.getVideoId();
                return t && (e += "?t=" + k["default"].toString(this.curTime())), e
            }, t.prototype.getEmbedCode = function() {
                var t = this.vars,
                    e = "https://vk.com/video_ext.php?oid=" + t.oid + "&id=" + t.vid + "&hash=" + t.embed_hash;
                return '<iframe src="' + e + '" width="640" height="360" frameborder="0" allowfullscreen></iframe>'
            }, t.prototype.getDuration = function() {
                return this.isInited() ? this.isPlayingLinearAd() ? this.ads.getDuration() : this.media.getDuration() || intval(this.vars && this.vars.duration) : 0
            }, t.prototype.getAvailableQualities = function() {
                return this.media.getAvailableQualities()
            }, t.prototype.isAutoQualityAvailable = function() {
                return this.media.isAutoQualityAvailable()
            }, t.prototype.isAutoQualityEnabled = function() {
                return this.media.isAutoQualityEnabled()
            }, t.prototype.getQuality = function() {
                return this._quality || this.media.getQuality()
            }, t.prototype.getQualityIndex = function() {
                var t = this.getQuality();
                return v.indexFromQuality(t)
            }, t.prototype.setQuality = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = e.setPreferred,
                    n = void 0 === i ? !0 : i;
                if ((inArray(t, this.getAvailableQualities()) || t === v.AUTO) && (t !== v.AUTO || !this.isAutoQualityEnabled()) && (t !== this._quality || this.isAutoQualityEnabled())) {
                    if (this.media.setQuality(t), this.onQualityChanged(t === v.AUTO ? this.getQuality() : t), t !== v.AUTO && n) {
                        var r = Math.max.apply(Math, this.getAvailableQualities());
                        (r > t || t > this.preferredQuality) && (this.preferredQuality = t)
                    }
                    this.getState() === h.ERROR && this.changeState(h.PLAYING)
                }
            }, t.prototype.onQualityChanged = function(t) {
                var e = this.isAutoQualityEnabled(),
                    i = this._quality;
                this._quality = t, this.trigger(c.QUALITY_CHANGE, t, i, e)
            }, t.prototype.play = function() {
                this.getState() !== h.PLAYING && this.getState() !== h.ERROR && this.isInited() && (this.getState() === h.UNSTARTED && this.onBeforeFirstPlay(), this.changeState(h.PLAYING), this.isPlayingLinearAd() ? this.ads.play() : this.media.play(), this.externalCall("onVideoStreamPlaying", this.vars.oid, this.vars.vid))
            }, t.prototype.pause = function() {
                this.getState() === h.PLAYING && this.getState() !== h.ERROR && (this.isPlayingLinearAd() ? this.ads.pause() : this.media.pause(), this.changeState(h.PAUSED))
            }, t.prototype.isBuffering = function() {
                return this.media.isWaiting()
            }, t.prototype.getBufferedRanges = function() {
                return this.media.getBufferedRanges()
            }, t.prototype.getThumbSrc = function() {
                var t = this.vars;
                if (t.stretch_vertical && t.is_inline && t.is_aurora) {
                    var e = t.first_frame_800 || t.first_frame_320 || t.first_frame_160 || t.first_frame_130;
                    if (e) return e
                }
                return t.jpg || ""
            }, t.prototype.getLivePhase = function() {
                return this._livePhase
            }, t.prototype.changeLivePhase = function(t) {
                if (t != this._livePhase) {
                    var e = this._livePhase;
                    this._livePhase = t, this.trigger(c.LIVE_PHASE_CHANGE, t, e), this.isActiveLive() || this.stopLiveHeartbeat()
                }
            }, t.prototype.isActiveLive = function() {
                var t = this.getLivePhase();
                return t == f.WAITING || t == f.STARTED
            }, t.prototype.isInLayer = function() {
                return !!this.externalCall("isInLayer", this.getVideoId())
            }, t.prototype.startLiveHeartbeat = function() {
                var t = this,
                    e = [],
                    i = {},
                    n = function r() {
                        var n = t.isInLayer(),
                            o = t.stats.getLiveHeartbeatStats();
                        ajax.post("al_video.php?act=live_heartbeat", {
                            oid: t.vars.oid,
                            vid: t.vars.vid,
                            user_id: t.vars.viewer_id,
                            need_friends: n ? 1 : 0,
                            shown_friends: e.join(","),
                            stats: o ? JSON.stringify(o) : null,
                            hash: t.vars.action_hash
                        }, {
                            onDone: function(n, r) {
                                r && (r = r.map(function(t) {
                                    return i[t.id] || (i[t.id] = t)
                                }), e = r.map(function(t) {
                                    return t.id
                                })), t.externalCall("onLiveViewersCountChange", t.getVideoId(), n, r)
                            },
                            onFail: function() {
                                return !0
                            }
                        }), t._liveHeartbeatTimeout = setTimeout(r, 5e3)
                    };
                n()
            }, t.prototype.stopLiveHeartbeat = function() {
                this._liveHeartbeatTimeout && (clearTimeout(this._liveHeartbeatTimeout), this._liveHeartbeatTimeout = null, ajax.post("al_video.php?act=live_stop_heartbeat", {
                    oid: this.vars.oid,
                    vid: this.vars.vid,
                    user_id: this.vars.viewer_id,
                    hash: this.vars.action_hash
                }, {
                    onFail: function() {
                        return !0
                    }
                }))
            }, t.prototype.checkLivePhase = function(t) {
                var e = this,
                    i = this.getVideoId();
                ajax.post("al_video.php?act=check_live_phase", {
                    oid: this.vars.oid,
                    vid: this.vars.vid,
                    hash: this.vars.action_hash,
                    media_url: this.media.getContentUrl()
                }, {
                    onDone: function(n) {
                        e.getVideoId() == i && t(n)
                    },
                    onFail: function() {
                        return setTimeout(function() {
                            e.getVideoId() == i && e.checkLivePhase(t)
                        }, 3e3), !0
                    }
                })
            }, t.prototype.togglePlay = function(t) {
                "undefined" == typeof t && (t = this.getState() !== h.PLAYING), t ? this.play() : this.pause()
            }, t.prototype.getMediaProviderType = function() {
                return this.media.providerType()
            }, t.prototype.onBeforeFirstPlay = function() {
                var t = this,
                    e = this.vars.live && this.vars.live != f.ENDED;
                this.canShowAds() && !e && (this.media.preload(), this.media.disablePlayback(), this.ads.start("preroll", function() {
                    t.isInited() && (t.media.enablePlayback(), setTimeout(function() {
                        return t.ads.start("overlay")
                    }, 0))
                }))
            }, t.prototype.onMediaPlaying = function() {
                this._startedPlaying = !0, this.changeState(h.PLAYING)
            }, t.prototype.onMediaPause = function() {
                this.changeState(h.PAUSED)
            }, t.prototype.onEnded = function() {
                var t = this;
                this.isPlayingOverlayAd() && this.ads.stop();
                var e = this.vars.live && this.vars.live != f.ENDED;
                !this.canShowAds() || e || this._didEnded ? (this.changeState(h.ENDED), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler(null, !0)) : (this.media.disablePlayback(), this.ads.start("postroll", function() {
                    t.changeState(h.ENDED), t.media.enablePlayback()
                })), this._didEnded = !0
            }, t.prototype.onError = function(t) {
                this.errorData = t, this.changeState(h.ERROR), this.ads.cancelAds(), this.externalCall("onVideoPlayError")
            }, t.prototype.onUiSeekStart = function() {
                this.getState() === h.ENDED && this.changeState(h.PAUSED)
            }, t.prototype.canShowAds = function() {
                var t = browser.msie && browser.version <= 10;
                return !this.vars.no_ads && !t && this.getLivePhase() !== f.UPCOMING
            }, t.prototype.curTime = function() {
                return this.isInited() ? this.isPlayingLinearAd() ? this.ads.curTime() : this.media.curTime() : 0
            }, t.prototype.seekTo = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                if (this.getState() !== h.ERROR) {
                    var i = this.getLivePhase();
                    i && i !== f.ENDED || (t = Math.max(0, Math.min(this.getDuration(), t)), t !== this.media.curTime() && (this.media.seekTo(t), this.trigger(c.SEEK, t), e && this.getState() === h.UNSTARTED && this.play(), this.getState() === h.ENDED && this.changeState(h.PAUSED)))
                }
            }, t.prototype.seekToPercent = function(t) {
                var e = this.getDuration() * t;
                return this.seekTo(e)
            }, t.prototype.seekBy = function(t) {
                return this.seekTo(this.curTime() + t)
            }, t.prototype.getVolume = function() {
                return this._volume
            }, t.prototype.setVolume = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                t = Math.max(0, Math.min(1, t)), this.media.setVolume(t), this.ads.setVolume(t), this._volume = t, this._muted = !t, e && (this.preferredVolume = t)
            }, t.prototype.toggleMute = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !this.isMuted(),
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0,
                    i = t ? 0 : this._volume || x;
                this.media.setVolume(i), this.ads.setVolume(i), this._muted = t, e && (this.preferredVolume = i)
            }, t.prototype.isMuted = function() {
                return !!this._muted
            }, t.prototype.toggleLoop = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !this.isLooped();
                return this.media.toggleLoop(t)
            }, t.prototype.isLooped = function() {
                return this.media.isLooped()
            }, t.prototype.setPlaybackRate = function(t) {
                this.media.setPlaybackRate(t)
            }, t.prototype.getPlaybackRate = function() {
                return this.media.getPlaybackRate()
            }, t.prototype.canRotateVideo = function() {
                return this.media.canRotateVideo()
            }, t.prototype.rotateVideo = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -90;
                this.media.rotateVideo(t)
            }, t.prototype.isStartedPlaying = function() {
                return !!this._startedPlaying
            }, t.prototype.getPlayedRanges = function() {
                return this.media.getPlayedRanges()
            }, t.prototype.getPlayedRangesString = function() {
                return this.media.getPlayedRangesString()
            }, t.prototype.getPlayedSeconds = function() {
                return this.media.getPlayedSeconds()
            }, t.prototype.canChangePlaybackRate = function() {
                return "flash" != this.media.providerType()
            }, t.prototype.canExpand = function() {
                return "flash" != this.media.providerType() && !(this.isActiveLive() && this.vars.force_rtmp && this.isFlashSupported())
            }, t.prototype.expand = function() {
                var t = this.vars.list_id,
                    e = k["default"].toString(this.curTime());
                this.externalCall("onOpenInPopup", this.getVideoId(), t, e)
            }, t.prototype.onExpanded = function() {
                var t = this;
                this.vars.is_inline = 0, setTimeout(function() {
                    t.onTouchedByUser(), t.resize(), t.isPlayingLinearAd() ? t.ads.resume() : t.media.play(), t.trigger(c.EXPANDED)
                }, 0)
            }, t.prototype.toggleFullscreen = function() {
                A.screenfull && (this.isFullscreen() ? A.screenfull.exit() : A.screenfull.request(this.el))
            }, t.prototype.isFullscreen = function() {
                return A.screenfull.element === this.el
            }, t.prototype.getSize = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                if (!this._size || t) {
                    var e = this.el.getBoundingClientRect();
                    this._size = [e.width, e.height]
                }
                return this._size
            }, t.prototype.resize = function() {
                addClass(this.el, "no_transition");
                var t = this.getSize(!0);
                this.trigger.apply(this, [c._RESIZE].concat(t)), removeClassDelayed(this.el, "no_transition")
            }, t.prototype.onFullscreenChange = function() {
                this.trigger(c.FULLSCREEN_CHANGE, this.isFullscreen()), this.resize(), this.externalCall("fullscreen", this.isFullscreen())
            }, t.prototype.isMinimized = function() {
                return !(!window.Videoview || !Videoview.isMinimized())
            }, t.prototype.isControlsVisible = function() {
                return this.ui.isControlsVisible()
            }, t.prototype.isLoadingAds = function() {
                return this.ads.isLoading()
            }, t.prototype.onLinearAdsStarted = function() {
                this.media.disablePlayback()
            }, t.prototype.onLinearAdsCompleted = function() {
                this.media.enablePlayback()
            }, t.prototype.isPlayingLinearAd = function() {
                return this.ads.isPlayingLinear()
            }, t.prototype.isPlayingOverlayAd = function() {
                return this.ads.isPlayingOverlay()
            }, t.prototype.isAutoplay = function() {
                return this.isFromAutoplay() && !this.isTouchedByUser()
            }, t.prototype.isFromAutoplay = function() {
                return this.isInited() && !!this.vars.from_autoplay
            }, t.prototype.onTouchedByUser = function() {
                var t = this;
                this.isTouchedByUser() || (this.touchedByUser = !0, this.isFromAutoplay() && (this.toggleMute(!1), this.ui.onTouchedByUser(), this.externalCall("onPlayerTouchedByUser"), setTimeout(function() {
                    t.getState() === h.PLAYING && t.externalCall("onVideoStreamPlaying", t.vars.oid, t.vars.vid)
                }, 0)))
            }, t.prototype.isTouchedByUser = function() {
                return !!this.touchedByUser
            }, t.prototype.onSuggestionsShown = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
                    i = e ? this._suggestionsQid : null;
                this.externalCall("onSuggestionsShown", i, this.getVideoId(), t)
            }, t.prototype.onSuggestionClicked = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                    n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                this.externalCall("onSuggestionClick", t, this._suggestionsQid, i, n, e)
            }, t.prototype.onSuggestionQuarterWatched = function() {
                this.externalCall("onSuggestionQuarterWatched", this.vars.suggestions_qid, this.getVideoId(), this.curTime())
            }, t.prototype.onSuggestionsReplayClicked = function() {
                this.togglePlay(), this.externalCall("onSuggestionsReplayClicked")
            }, t.prototype.nextVideo = function(t, e, i) {
                this.externalCall("onVideoNext", t, e, i)
            }, t.prototype.likeVideo = function(t) {
                this.onLiked(), this.externalCall("onLike", t)
            }, t.prototype.onLiked = function() {
                this.videoLiked = !this.videoLiked, this.trigger(c.VIDEO_LIKE, this.videoLiked)
            }, t.prototype.shareVideo = function(t) {
                this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onShare", t)
            }, t.prototype.addVideo = function(t) {
                this.onAdded(), this.videoAdded ? this.externalCall("onAdd", this.getVideoId(), this.vars.add_hash, t) : this.externalCall("onRemove", t)
            }, t.prototype.donate = function(t) {
                this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onDonate", t)
            }, t.prototype.onAdded = function() {
                this.videoAdded = !this.videoAdded, this.trigger(c.VIDEO_ADD, this.videoAdded);
            }, t.prototype.subscribeToAuthor = function(t) {
                var e = !this.isSubscribed;
                this.externalCall("onSubscribe", e, t)
            }, t.prototype.onSubscribed = function(t) {
                this.isSubscribed = !!t, this.trigger(c.SUBSCRIBED, this.isSubscribed)
            }, t.prototype.nextTimerReset = function() {
                this.nextTimerStopped || (this.nextTimerStopped = !0, this.trigger(c.NEXT_TIMER_RESET))
            }, t.prototype.nextTimerStart = function() {
                this.nextTimerStopped && (this.nextTimerStopped = !1, this.trigger(c.NEXT_TIMER_START))
            }, t.prototype.setSuggestions = function(t) {
                this._suggestions = t
            }, t.prototype.pushDonation = function(t, e) {
                this.isActiveLive() && this.trigger(c.LIVE_DONATION, t, e)
            }, t.prototype.pushNotice = function(t) {
                this.ui.pushNotice(t)
            }, t.prototype.pushLiveMidroll = function(t) {
                this.canShowAds() && this.isActiveLive() && (t ? this.ads.cancelAds() : this.ads.start("_live_midroll"))
            }, t.prototype.onStickersPurchased = function(t) {
                this.ui.onStickersPurchased(t)
            }, t.prototype.getSuggestions = function() {
                return this._suggestions || []
            }, t.prototype.getNextVideos = function() {
                return window.Videoview ? Videoview.getNextVideosData() : []
            }, t.prototype.nextTimerEnabled = function() {
                return window.VideoPlaylist ? VideoPlaylist.isAutoplayEnabled() : !1
            }, t.prototype.externalCall = function(t) {
                try {
                    for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1; e > n; n++) i[n - 1] = arguments[n];
                    return window.videoCallback && videoCallback([t].concat(i))
                } catch (r) {
                    this.debugLog(["error calling callback " + t, r], {
                        type: "warn"
                    })
                }
            }, t.prototype.debugLog = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = e.type,
                    n = void 0 === i ? "log" : i,
                    r = e.force,
                    o = void 0 === r ? !1 : r;
                if (this.isInited() && (this.vars.dbg_on || o)) try {
                    var s;
                    (s = console)[n].apply(s, ["%c videoplayer ", "background:#9ddcf7;"].concat(t))
                } catch (a) {}
            }, t.prototype.changeState = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                if (this.isInited() || e) {
                    if (!t) return void this.debugLog("trying to change state to undefined", {
                        type: "warn"
                    });
                    if (t === this.state) {
                        if (t != h.ERROR) return
                    } else this.prevState = this.state, this.state = t, t != h.ERROR && (this.errorData = null);
                    this.trigger(c.STATE_CHANGE, t, this.prevState)
                }
            }, t.prototype.getState = function() {
                return this.state
            }, t.prototype.getErrorData = function() {
                return this.errorData || ""
            }, t.prototype.trigger = function(t) {
                var e;
                if ("undefined" == typeof t) return void this.debugLog("trying to trigger undefined event", {
                    type: "warn"
                });
                for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), r = 1; i > r; r++) n[r - 1] = arguments[r];
                (e = this._events).emit.apply(e, [t].concat(n))
            }, t.prototype.on = function(t, e) {
                return "undefined" == typeof t ? void this.debugLog("trying to set listener to undefined event", {
                    type: "warn"
                }) : this._events.on(t, e)
            }, t.prototype.off = function(t, e) {
                return "undefined" == typeof t ? void this.debugLog("trying to unset listener from undefined event", {
                    type: "warn"
                }) : this._events.off(t, e)
            }, t.prototype.destroy = function() {
                this.deinitVideo(), this.trigger(c._DESTROY), this._events.removeAllListeners(), window.removeEventListener("resize", this._resizeHandler), A.screenfull && document.removeEventListener(A.screenfull.raw.fullscreenchange, this._fsChangeHandler)
            }, t.prototype.getDebugData = function() {
                if (!this.isInited()) return "";
                var t = [];
                return t.push(["Video ID", this.getVideoId()]), t.push(["Content host", this.media.getContentHost()]), t.push(["Media provider", this.media.providerType() || "none"]), t.push(["Quality", this.getQuality()]), t.push(["Auto quality", this.isAutoQualityAvailable() ? this.isAutoQualityEnabled() ? "enabled" : "disabled" : null]), t.push(["Position", this.curTime()]), t.push(["Player state", this.getState()]), t.push(["Live Phase", this.getLivePhase()]), t.push(["Player size", this.getSize().join("x")]), t.push(["Module", window.Videoview ? Videoview.getVideoModule() : cur.module]), t.push(["Error code", this.media.getErrorCode()]), t.push(["Errors log", this.media.getErrorsLog()]), this.vars.live ? (t.push(["Live HLS", this.vars.hls]), t.push(["Live RTMP", this.vars.rtmp]), t.push(["Postlive MP4", this.vars.postlive_mp4])) : t.push(["Hls manifest", this.vars.hls]), t.filter(function(t) {
                    var e = a(t, 2),
                        i = (e[0], e[1]);
                    return null != i
                }).map(function(t) {
                    return t.join(": ")
                }).join("\n")
            }, t.prototype.isHlsSupported = function() {
                return window.MediaSource && MediaSource.isTypeSupported && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
            }, t.prototype.isFlashSupported = function() {
                return browser.flash >= 24
            }, t.prototype.getPreloadedQuality = function() {
                return O[this.getVideoId()]
            }, t.preload = function(t) {
                function e(t) {
                    var e = {};
                    return t.split(",").forEach(function(t) {
                        var i = t.split("="),
                            n = a(i, 2),
                            r = n[0],
                            o = n[1];
                        e[r] = o
                    }), e
                }
                var i = t.oid + "_" + t.vid;
                if (t.hls_raw && !O[i]) {
                    for (var n, r = [], o = {}, s = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g; n = s.exec(t.hls_raw);) {
                        var l = n,
                            u = a(l, 3),
                            h = u[1],
                            d = u[2];
                        if (h = e(h), h.RESOLUTION) {
                            var c = h.RESOLUTION.split("x"),
                                p = a(c, 2),
                                f = p[0],
                                y = p[1],
                                g = v.qualityFromSize(+f, +y);
                            r.push(g), o[g] = d
                        }
                    }
                    if (r.length) {
                        var _ = Math.min.apply(Math, r),
                            m = Math.max.apply(Math, r),
                            b = P["default"].get("video_abr_quality") || v.DEFAULT,
                            E = Math.max(_, Math.min(b, m, v.DEFAULT)),
                            S = o[E],
                            L = S.replace(/index-(.+).m3u8/, "seg-1-$1.ts");
                        (0, D["default"])(S), (0, D["default"])(L), O[i] = E
                    }
                }
            }, t.dispatchEventFromId = function(t, e, i) {
                var n = ge(t),
                    r = void 0;
                if (n) {
                    try {
                        r = new Event(e)
                    } catch (o) {
                        r = document.createEvent("Event"), r.initEvent(e, !1, !1)
                    }
                    n.dispatchEvent(r)
                }
            }, l(t, [{
                key: "preferredVolume",
                get: function() {
                    var t = P["default"].get("video_volume");
                    return "number" == typeof t ? Math.min(1, Math.max(0, t)) : x
                },
                set: function(t) {
                    P["default"].set("video_volume", t)
                }
            }, {
                key: "preferredQuality",
                get: function() {
                    var t = P["default"].get("video_preferred_quality");
                    return v.qualityFromIndex(t) || v.DEFAULT
                },
                set: function(t) {
                    var e = v.indexFromQuality(t);
                    P["default"].set("video_preferred_quality", e)
                }
            }], [{
                key: "Events",
                get: function() {
                    return c
                }
            }, {
                key: "States",
                get: function() {
                    return h
                }
            }, {
                key: "LivePhases",
                get: function() {
                    return f
                }
            }]), t
        }();
    e["default"] = M, window.WeakSet && (M._instances = new window.WeakSet);
    var O = {}
}, function(t, e, i) {
    var n = i(42),
        r = i(84);
    t.exports = function(t) {
        return n(r(t))
    }
}, function(t, e, i) {
    var n = i(73),
        r = i(18);
    t.exports = i(29) ? function(t, e, i) {
        return n.f(t, e, r(1, i))
    } : function(t, e, i) {
        return t[e] = i, t
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        u = i(60),
        h = r(u),
        d = i(38),
        c = n(d),
        p = i(90),
        f = r(p),
        y = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n._delaySrc = !1, n._delaySeek = 0, n._volume = 1, n._currentTime = 0, n._duration = 0, n._loop = !1, n._played = [], n
            }
            return a(e, t), e.prototype.buildEl = function(t) {
                var e = ce("div");
                renderFlash(e, {
                    url: "/swf/video_lite.swf",
                    id: f.uniqueId("flashprovider"),
                    version: 11,
                    preventhide: 1
                }, {
                    bgcolor: "#000000",
                    allowscriptaccess: "always",
                    allowfullscreen: "true",
                    wmode: "opaque"
                });
                var i = domFC(e);
                return addClass(i, "videoplayer_media_provider"), i
            }, e.prototype.initListeners = function() {
                var t = this;
                this.domListen(this.el, "load", function() {
                    t.delay(function() {
                        t._delaySrc !== !1 && t._delayPlay && (t.src = t._delaySrc, t._delaySrc = !1), t._delayPlay && (t.play(), t._delayPlay = !1)
                    }, 0)
                }), this.domListen(this.el, "durationchange", function() {
                    t._duration = t.el.getDuration(), t.volume = t.volume, t.loop = t.loop, t._delaySeek && (t.currentTime = t._delaySeek, t._delaySeek = 0)
                }), this.domListen(this.el, "loadeddata", function() {
                    t.volume = t.volume
                }), this.domListen(this.el, "timeupdate", function() {
                    var e = t.el.getCurrentTime();
                    t.updatePlayed(t._currentTime, e), t._currentTime = e
                }), this.domListen(this.el, "error", function() {
                    t.player.debugLog("Flash error", {
                        force: !0
                    })
                })
            }, e.prototype.isFlashReady = function() {
                return !!this.el.play
            }, e.prototype.play = function() {
                this.el.play ? (this._delaySrc !== !1 && (this.src = this._delaySrc), this.el.play()) : this._delayPlay = !0
            }, e.prototype.pause = function() {
                this.el.pause ? this.el.pause() : this._delayPlay = !1
            }, e.prototype.updatePlayed = function(t, e) {
                if (t != e && !(Math.abs(e - t) > 1)) {
                    if (t > e) {
                        var i = [e, t];
                        t = i[0], e = i[1]
                    }
                    for (var n = this._played, r = n.length, o = 0;; o += 2) {
                        var s = n[o],
                            a = n[o + 1];
                        if (o >= r || s > e) return void n.splice(o, 0, t, e);
                        if (a >= t) {
                            for (var l = Math.min(n[o], t), u = Math.max(n[o + 1], e), h = 2, d = o + 2;; d += 2) {
                                var c = n[d],
                                    p = n[d + 1];
                                if (d >= r || c > u) break;
                                u = Math.max(u, p), h += 2
                            }
                            return void n.splice(o, h, l, u)
                        }
                    }
                }
            }, e.prototype.load = function() {}, e.prototype.reset = function() {
                this.el.clear && (this.el.clear(), this.el.init(), this._currentTime = 0, this._duration = 0, this._played = [])
            }, e.prototype.recoverNetwork = function() {
                this.el.load && this._src && (this.el.clear(), this.el.init(), this.el.load(this._src), this.player.getState() === h.PLAYING && this.el.play())
            }, l(e, [{
                key: "duration",
                get: function() {
                    return this._duration
                }
            }, {
                key: "currentTime",
                get: function() {
                    return this.el.getCurrentTime ? this.el.getCurrentTime() : this._currentTime
                },
                set: function(t) {
                    this._currentTime = t, this.el.seek && this.duration ? this.el.seek(t) : this._delaySeek = t
                }
            }, {
                key: "volume",
                get: function() {
                    return this._volume
                },
                set: function(t) {
                    this._volume = t, this.el.setVolume && this.el.setVolume(t)
                }
            }, {
                key: "src",
                set: function(t) {
                    this.el.load ? (this.reset(), this.el.load(t), this.volume = this._volume) : this._delaySrc = t, this._src = t
                },
                get: function() {
                    return this._src || ""
                }
            }, {
                key: "loop",
                get: function() {
                    return this._loop
                },
                set: function(t) {
                    this._loop = t, this.el.setLoop && this.el.setLoop(t)
                }
            }, {
                key: "readyState",
                get: function() {
                    return this.el.getReadyState ? this.el.getReadyState() : 0
                }
            }, {
                key: "networkState",
                get: function() {
                    return this.el.getNetworkState ? this.el.getNetworkState() : 0
                }
            }, {
                key: "buffered",
                get: function() {
                    var t = this;
                    return {
                        length: 1,
                        start: function() {
                            return 0
                        },
                        end: function() {
                            return t.el.getBuffered ? t.el.getBuffered() : 0
                        }
                    }
                }
            }, {
                key: "played",
                get: function() {
                    var t = this._played.slice();
                    return {
                        length: t.length / 2,
                        start: function(e) {
                            return t[2 * e]
                        },
                        end: function(e) {
                            return t[2 * e + 1]
                        }
                    }
                }
            }]), e
        }(c["default"]);
    e["default"] = y
}, function(t, e, i) {
    var n = i(104)("meta"),
        r = i(75),
        o = i(92),
        s = i(73).f,
        a = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        u = !i(48)(function() {
            return l(Object.preventExtensions({}))
        }),
        h = function(t) {
            s(t, n, {
                value: {
                    i: "O" + ++a,
                    w: {}
                }
            })
        },
        d = function(t, e) {
            if (!r(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
            if (!o(t, n)) {
                if (!l(t)) return "F";
                if (!e) return "E";
                h(t)
            }
            return t[n].i
        },
        c = function(t, e) {
            if (!o(t, n)) {
                if (!l(t)) return !0;
                if (!e) return !1;
                h(t)
            }
            return t[n].w
        },
        p = function(t) {
            return u && f.NEED && l(t) && !o(t, n) && h(t), t
        },
        f = t.exports = {
            KEY: n,
            NEED: !1,
            fastKey: d,
            getWeak: c,
            onFreeze: p
        }
}, function(t, e, i) {
    var n = i(2),
        r = i(20);
    t.exports = Object.keys || function(t) {
        return n(t, r)
    }
}, function(t, e, i) {
    var n = i(1);
    t.exports = function(t, e, i, r) {
        try {
            return r ? e(n(i)[0], i[1]) : e(i)
        } catch (o) {
            var s = t["return"];
            throw void 0 !== s && n(s.call(t)), o
        }
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(66),
        d = r(h),
        c = i(59),
        p = n(c),
        f = i(63),
        y = n(f),
        v = .25,
        g = 2,
        _ = .25,
        m = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                n.el = se('\n<div class="videoplayer_context_menu hidden">\n  <div class="_item" data-action="copy_link">' + n.getLang("cmenu_copy_video_link") + '</div>\n  <div class="_item" data-action="copy_timecoded_link">' + n.getLang("cmenu_copy_timecode_link") + '</div>\n  <div class="_item" data-action="copy_embed_code">' + n.getLang("cmenu_copy_embed_code") + '</div>\n  <div class="_item" data-action="toggle_pip">' + n.getLang("cmenu_enable_pip_mode") + '</div>\n  <div class="_item" data-action="toggle_loop">' + n.getLang("cmenu_enable_loop") + '</div>\n  <div class="_item" data-action="playback_rate">' + n.getLang("cmenu_playback_speed") + '</div>\n  <div class="_item" data-action="rotate_video">' + n.getLang("cmenu_rotate") + '</div>\n  <a class="_item" href="/support?act=new&from=v" target="_blank">' + n.getLang("cmenu_report_error") + '</a>\n  <div class="_item" data-action="copy_debug_data">' + n.getLang("cmenu_copy_debug") + "</div>\n</div>\n    "), n.playbackRateControl = se('\n<div class="videoplayer_playback_rate_control">\n  <span class="_decrease"></span>\n  <span class="_value">1x</span>\n  <span class="_increase"></span>\n</div>\n    '), n.playbackRateDecrease = domByClass(n.playbackRateControl, "_decrease"), n.playbackRateIncrease = domByClass(n.playbackRateControl, "_increase"), n.playbackRateValue = domByClass(n.playbackRateControl, "_value"), n.domListen(n.playbackRateDecrease, "click", n.changePlaybackRate.bind(n, -1)), n.domListen(n.playbackRateIncrease, "click", n.changePlaybackRate.bind(n, 1));
                var r = n.el.querySelector("[data-action=playback_rate]");
                return r.appendChild(n.playbackRateControl), n.domListen(n.player.el, "contextmenu", n.onContextmenu), n.domListen(n.el, "click", n.onMenuClick), n.domListen(document.body, "click", n.onLostFocus), n.domListen(n.player.el, "click", n.onLostFocus), n.domListen(window, "blur", n.onLostFocus), n.playerListen(p.EXPANDED, n.updateButtonsVisibility), n.playerListen(p.LIVE_PHASE_CHANGE, n.updateButtonsVisibility), n.playerListen(p.MEDIA_PROVIDER_CHANGE, n.updateButtonsVisibility), n
            }
            return a(e, t), e.prototype.initVideo = function(t) {
                this.updateLoopControl(!!t.repeat), this.updatePlaybackRateControl(1), this.updateButtonsVisibility()
            }, e.prototype.updateButtonsVisibility = function() {
                var t = this.player.getLivePhase() == y.UPCOMING,
                    e = t || this.player.isActiveLive();
                toggle(this.el.querySelector("[data-action=copy_timecoded_link]"), !e), toggle(this.el.querySelector("[data-action=copy_embed_code]"), !this.getVar("is_private")), toggle(this.el.querySelector("[data-action=toggle_pip]"), this.player.media.isPiPModeAvailable()), toggle(this.el.querySelector("[data-action=toggle_loop]"), !e), toggle(this.el.querySelector("[data-action=playback_rate]"), !e && this.player.canChangePlaybackRate()), toggle(this.el.querySelector("[data-action=rotate_video]"), !t && this.player.canRotateVideo())
            }, e.prototype.changePlaybackRate = function(t, e) {
                e.stopPropagation();
                var i = this.player.getPlaybackRate(),
                    n = i + t * _;
                v > n || n > g || (this.player.setPlaybackRate(n), this.updatePlaybackRateControl(n))
            }, e.prototype.updatePlaybackRateControl = function(t) {
                if (!(v > t || t > g)) {
                    var e = t % 1 ? 100 * t + "%" : t + "x";
                    val(this.playbackRateValue, e), toggleClass(this.playbackRateDecrease, "_disabled", t == v), toggleClass(this.playbackRateIncrease, "_disabled", t == g)
                }
            }, e.prototype.updateLoopControl = function(t) {
                var e = this.el.querySelector("[data-action=toggle_loop]");
                val(e, this.getLang(t ? "cmenu_disable_loop" : "cmenu_enable_loop"))
            }, e.prototype.onMenuClick = function(t) {
                var e = this,
                    i = t.target.getAttribute("data-action");
                switch (i) {
                    case "copy_link":
                        d["default"].copy(this.player.getVideoLink());
                        break;
                    case "copy_timecoded_link":
                        d["default"].copy(this.player.getVideoLink(!0));
                        break;
                    case "copy_embed_code":
                        d["default"].copy(this.player.getEmbedCode());
                        break;
                    case "toggle_pip":
                        this.player.media.togglePiPMode();
                        break;
                    case "toggle_loop":
                        var n = this.player.toggleLoop();
                        this.delay(function() {
                            e.updateLoopControl(n)
                        }, 200);
                        break;
                    case "playback_rate":
                        t.stopPropagation();
                        break;
                    case "rotate_video":
                        t.stopPropagation(), this.player.rotateVideo();
                        break;
                    case "copy_debug_data":
                        var r = this.player.getDebugData();
                        d["default"].copy(r)
                }
            }, e.prototype.onContextmenu = function(t) {
                var e = 5,
                    i = t.target;
                do
                    if ("A" == i.nodeName) return void this.hide(); while (--e && (i = domPN(i)));
                t.preventDefault();
                var n = this.player.el.getBoundingClientRect(),
                    r = this.el.getBoundingClientRect(),
                    o = t.pageX - n.left + 1,
                    s = t.pageY - window.scrollGetY() - n.top + 1;
                o + r.width > n.width && (o = Math.max(0, n.width - r.width)), s + r.height > n.height && (s = Math.max(0, n.height - r.height)), this.show(o, s), this.player.onTouchedByUser()
            }, e.prototype.onLostFocus = function(t) {
                var e = this;
                this.delay(function() {
                    e.isVisible() && e.hide()
                }, 0)
            }, e.prototype.show = function(t, e) {
                setStyle(this.el, {
                    left: t + "px",
                    top: e + "px"
                }), removeClass(this.el, "hidden"), this._visible = !0
            }, e.prototype.hide = function() {
                addClass(this.el, "hidden"), this._visible = !1
            }, e.prototype.isVisible = function() {
                return !!this._visible
            }, e
        }(u["default"]);
    e["default"] = m
}, function(t, e, i) {
    t.exports = !i(48)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(t, e, i) {
    "use strict";
    var n = i(88)(!0);
    i(54)(String, "String", function(t) {
        this._t = String(t), this._i = 0
    }, function() {
        var t, e = this._t,
            i = this._i;
        return i >= e.length ? {
            value: void 0,
            done: !0
        } : (t = n(e, i), this._i += t.length, {
            value: t,
            done: !1
        })
    })
}, function(t, e, i) {
    var n = i(73).f,
        r = i(92),
        o = i(78)("toStringTag");
    t.exports = function(t, e, i) {
        t && !r(t = i ? t : t.prototype, o) && n(t, o, {
            configurable: !0,
            value: e
        })
    }
}, function(t, e, i) {
    var n = i(84);
    t.exports = function(t) {
        return Object(n(t))
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    i(16);
    var r = i(9),
        o = n(r),
        s = i(83),
        a = n(s),
        l = i(21),
        u = n(l);
    window.Promise || (window.Promise = o["default"]), window.Symbol || (window.Symbol = a["default"]), window.VideoPlayer = u["default"];
    try {
        stManager.done("videoplayer.js")
    } catch (h) {}
}, function(t, e, i) {
    var n = i(26),
        r = i(22);
    t.exports = function(t, e) {
        for (var i, o = r(t), s = n(o), a = s.length, l = 0; a > l;)
            if (o[i = s[l++]] === e) return i
    }
}, function(t, e, i) {
    t.exports = !i(29) && !i(48)(function() {
        return 7 != Object.defineProperty(i(62)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = void 0,
            n = void 0,
            r = 0,
            o = function(t, e) {
                r++ || t && t(e)
            },
            s = new Promise(function(t, r) {
                i = function(i) {
                    t(i), e.onLoad && e.onLoad(i)
                }, n = function(t) {
                    r(t), e.onError && e.onError(t)
                }
            }),
            a = new XMLHttpRequest;
        a.onload = function() {
            o(i, {
                response: a.responseText,
                details: a
            })
        }, a.onerror = function(t) {
            o(n, {
                error: "Load error"
            })
        };
        try {
            a.open("GET", t), a.send()
        } catch (l) {
            o(n, {
                error: "Load error"
            })
        }
        return {
            promise: s,
            abort: function() {
                a.abort(), o(n, {
                    error: "Request aborted"
                })
            }
        }
    }
}, function(t, e, i) {
    var n = i(39)("keys"),
        r = i(104);
    t.exports = function(t) {
        return n[t] || (n[t] = r(t))
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function s(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        l = i(51),
        u = n(l),
        h = function(t) {
            function e(i) {
                r(this, e);
                var n = o(this, t.call(this, i)),
                    s = i.getVars();
                return n.el = n.buildEl(s), n.initListeners(), n._delaySeek = 0, n
            }
            return s(e, t), e.prototype.buildEl = function(t) {
                var e = ce("video", {
                    preload: t.is_embed ? "none" : "metadata",
                    className: "videoplayer_media_provider"
                });
                return attr(e, "tabindex", -1), attr(e, "aria-hidden", "true"), e
            }, e.prototype.initListeners = function() {
                var t = this;
                this.domListen(this.el, "loadedmetadata", function() {
                    t._delaySeek && (t.currentTime = t._delaySeek, t._delaySeek = 0)
                })
            }, e.prototype.play = function() {
                var t = this.el.play();
                t && t["catch"](function(t) {})
            }, e.prototype.pause = function() {
                this.el.pause()
            }, e.prototype.load = function() {
                return this.el.load()
            }, e.prototype.canChangePlaybackRate = function() {
                return !!this.el.playbackRate
            }, e.prototype.reset = function() {
                this.el.pause(), this.el.src = "", this.el.load()
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.reset()
            }, a(e, [{
                key: "src",
                set: function(t) {
                    this.el.src = t
                },
                get: function() {
                    return this.el.src
                }
            }, {
                key: "currentSrc",
                get: function() {
                    return this.el.currentSrc || this.src
                }
            }, {
                key: "error",
                get: function() {
                    return this.el.error
                }
            }, {
                key: "currentTime",
                set: function(t) {
                    this.el.readyState ? this.el.currentTime = t : this._delaySeek = t
                },
                get: function() {
                    return this.el.readyState ? this.el.currentTime : this._delaySeek
                }
            }, {
                key: "duration",
                get: function() {
                    return this.el.duration
                }
            }, {
                key: "volume",
                set: function(t) {
                    this.el.volume = t
                },
                get: function() {
                    return this.el.volume
                }
            }, {
                key: "loop",
                set: function(t) {
                    this.el.loop = t
                },
                get: function() {
                    return this.el.loop
                }
            }, {
                key: "playbackRate",
                set: function(t) {
                    this.el.playbackRate = t
                },
                get: function() {
                    return this.el.playbackRate
                }
            }, {
                key: "videoRatio",
                get: function() {
                    return this.el.videoWidth && this.el.videoHeight ? this.el.videoWidth / this.el.videoHeight : void 0
                }
            }, {
                key: "readyState",
                get: function() {
                    return this.el.readyState
                }
            }, {
                key: "buffered",
                get: function() {
                    return this.el.buffered
                }
            }, {
                key: "played",
                get: function() {
                    return this.el.played
                }
            }]), e
        }(u["default"]);
    e["default"] = h
}, function(t, e, i) {
    var n = i(85),
        r = "__core-js_shared__",
        o = n[r] || (n[r] = {});
    t.exports = function(t) {
        return o[t] || (o[t] = {})
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function() {
            function t(t, e) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        u = i(60),
        h = r(u),
        d = i(59),
        c = r(d),
        p = i(63),
        f = r(p),
        y = i(90),
        v = r(y),
        g = i(86),
        _ = r(g),
        m = i(51),
        b = n(m),
        E = i(109),
        S = n(E),
        L = i(101),
        w = n(L),
        A = i(28),
        T = n(A),
        k = i(91),
        C = n(k),
        P = i(94),
        I = n(P),
        D = i(15),
        x = n(D),
        M = i(64),
        O = n(M),
        R = i(50),
        V = n(R),
        N = 3e3,
        F = 5,
        j = 1 / 24,
        B = .05,
        H = .05,
        U = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_ui"
                }), n.waiting = se(getProgressHtml("", "videoplayer_waiting pr_big")), n.el.appendChild(n.waiting), n.title = ce("div", {
                    className: "videoplayer_title"
                }), n.titleLink = ce("a", {
                    className: "videoplayer_title_link",
                    target: "_blank"
                }), n.title.appendChild(n.titleLink), n.el.appendChild(n.title), n.error = ce("div", {
                    className: "videoplayer_error hidden"
                }), attr(n.error, "role", "alert"), n.el.appendChild(n.error), n.liveWaiting = ce("div", {
                    className: "videoplayer_live_waiting hidden"
                }), n.el.appendChild(n.liveWaiting), n.thumb = ce("div", {
                    className: "videoplayer_thumb hidden",
                    innerHTML: '<div class="videoplayer_big_play_btn"><div class="videoplayer_big_play_btn_bg"></div>' + _.play("videoplayer_big_play_icon") + "</div>"
                }), n.el.appendChild(n.thumb), n.controls = new S["default"](i), n.el.appendChild(n.controls.el), n.shareActions = new w["default"](i), n.el.appendChild(n.shareActions.el), n.contextMenu = new T["default"](i), n.el.appendChild(n.contextMenu.el), n.playerTooltip = new x["default"](i), n.el.appendChild(n.playerTooltip.el), n.autoplayTimer = ce("div", {
                    className: "videoplayer_autoplay_timer hidden",
                    innerHTML: '<div class="videoplayer_autoplay_timer_equalizer" style="display:none;"><div class="_col"></div><div class="_col"></div><div class="_col"></div></div><span class="videoplayer_autoplay_timer_text"></span>'
                }), n.autoplayTimerEqualizer = domByClass(n.autoplayTimer, "videoplayer_autoplay_timer_equalizer"), n.autoplayTimerText = domByClass(n.autoplayTimer, "videoplayer_autoplay_timer_text"), n.el.appendChild(n.autoplayTimer), n.autoplayHint = ce("div", {
                    className: "videoplayer_autoplay_hint hidden"
                }), n.el.appendChild(n.autoplayHint), n.timedButtons = new V["default"](i), n.el.appendChild(n.timedButtons.el), n.domListen(i.el, "keydown", n.onKeyDown), n.domListen(i.el, "keyup", n.onKeyUp), n.domListen(i.el, "blur", n.onBlur), n.domListen(i.el, "mousedown", n.onMouseDown), n.domListen(i.el, "click", n.onClick), n.domListen(i.el, "dblclick", n.onDoubleClick), n.domListen(i.el, "mouseenter", n.onMouseEnter), n.domListen(i.el, "mousemove", n.onMouseMove), n.domListen(i.el, "mouseleave", n.onMouseLeave), n.playerListen(c.STATE_CHANGE, n.onStateChange), n.playerListen(c.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(c.LIVE_PHASE_CHANGE, n.onLivePhaseChange), n.playerListen(c.MEDIA_PLAYING, n.onMediaPlaying), n.playerListen(c.MEDIA_TIMEUPDATE, n.onMediaTimeupdate), n.playerListen(c.MEDIA_WAITING, n.updateWaiting), n.playerListen(c.MEDIA_LIVE_WARNING, n.showLiveWarning), n.playerListen(c.ADS_WAITING, n.updateWaiting), n.playerListen(c.ADS_LINEAR_STARTED, n.onLinearAdStarted), n.playerListen(c.ADS_LINEAR_COMPLETED, n.onLinearAdCompleted), n.playerListen(c.EXPANDED, n.onPlayerExpanded), n._mouseInside = !1, n._lastUserActivity = Date.now(), n._checkUserActivityInterval = setInterval(n.checkUserActivity.bind(n), 100), n
            }
            return a(e, t), e.prototype.initVideo = function(t) {
                if (setStyle(this.thumb, {
                        backgroundImage: "url(" + this.player.getThumbSrc() + ")"
                    }), t.stretch_vertical && !t.is_aurora) {
                    var e = parseInt(t.thumb_ratio * (1 / t.aspect_ratio) * 100) + 2;
                    setStyle(this.thumb, {
                        backgroundSize: e + "%"
                    })
                }
                if (this.updateTitle(t.md_title), toggleClass(this.titleLink, "_right_offset", !t.nolikes), toggleClass(this.titleLink, "_clickable", !!t.is_embed), t.live && this.onLivePhaseChange(t.live), t.stickers_promo && this.buildStickersPromo.apply(this, t.stickers_promo.split("|")), this._mouseInside = isHover(this.el), this._lastUserActivity = Date.now(), this.updateWaiting(), this.player.isAutoplay()) {
                    var i = this.player.isActiveLive() ? '<span class="videoplayer_autoplay_timer_live_icon"></span>' : formatTime(this.player.getDuration());
                    val(this.autoplayTimerText, i), toggleClass(this.autoplayTimer, "_live", this.player.isActiveLive()), val(this.autoplayHint, this.getLang(t.expand_on_click ? "autoplay_expand_hint" : "autoplay_volume_hint")), this._mouseInside || this.player.getState() !== h.PLAYING || this.hideUI({
                        noTransition: !0
                    })
                }
                "apps_slider" === t.module && (this._uiDisabled = !0, this.hideUI({
                    hideCursor: !1,
                    noTransition: !0
                })), t.is_aurora && this.player.isActiveLive() && (this.donationsLayer = new O["default"](this.player), this.el.appendChild(this.donationsLayer.el)), this._ignoreNoticeTypes = [], this._ignoreLiveWarning = !1
            }, e.prototype.deinitVideo = function() {
                this.endScreen && this.removeEndScreen(), this.donationsLayer && (clearTimeout(this._randDonationTimeout), this.donationsLayer.destroy(), this.donationsLayer = null), this.tooltip.hide(), this.toggleLiveDummy(!1), this.updateWaiting(), this.removeStickersPromo(), this.removeNotice(), this.hideLiveWarning()
            }, e.prototype.onTouchedByUser = function() {
                addClass(this.autoplayHint, "hidden"), addClass(this.autoplayTimer, "hidden"), setStyle(this.player.el, {
                    cursor: ""
                })
            }, e.prototype.onMouseDown = function(t) {
                this.onKeyboardFocus(!1), this._clickTarget = t.target
            }, e.prototype.onClick = function(t) {
                return t.stopPropagation(), this._lastUserActivity = Date.now(), this.contextMenu.isVisible() || this._uiDisabled ? void 0 : this.player.isAutoplay() ? (this.player.onTouchedByUser(), void(this.getVar("expand_on_click") && this.isBackgroundElement(this._clickTarget) && this.player.expand())) : void(this.isBackgroundElement(this._clickTarget) && this.player.togglePlay())
            }, e.prototype.onDoubleClick = function(t) {
                (t.target == this.player.el || t.target == this.player.media.el) && this.player.toggleFullscreen()
            }, e.prototype.onKeyDown = function(t) {
                var e = inArray(attr(t.target, "role"), ["button", "menuitemradio"]);
                switch (t.keyCode) {
                    case KEY.TAB:
                        this.onKeyboardFocus(!0);
                        break;
                    case KEY.SPACE:
                    case KEY.ENTER:
                        e && this._keyboardFocus ? (this._clickTarget = t.target, t.target.click()) : t.keyCode == KEY.SPACE && this.player.togglePlay(), t.preventDefault();
                        break;
                    case KEY.UP:
                    case KEY.DOWN:
                        var i = t.keyCode == KEY.UP ? 1 : -1;
                        t.target === this.controls.timelineSlider.el && this._keyboardFocus ? (this.onKeyboardFocus(!0), this.keyboardSlideProgress(i, t.altKey)) : this.keyboardSlideVolume(i), t.preventDefault();
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        var n = t.keyCode == KEY.RIGHT ? 1 : -1;
                        t.target === this.controls.volumeSlider.el && this._keyboardFocus ? (this.onKeyboardFocus(!0), this.keyboardSlideVolume(n, t.altKey)) : this.keyboardSlideProgress(n, t.altKey), t.preventDefault();
                        break;
                    case 70:
                        this.player.toggleFullscreen(), t.preventDefault();
                        break;
                    case 77:
                        this.player.toggleMute(), t.preventDefault()
                }
                this._lastUserActivity = Date.now(), this.tooltip.hide(), this.showUI(), this.player.onTouchedByUser()
            }, e.prototype.isBackgroundElement = function(t) {
                return t === this.player.el || t === this.controls.el || t === this.title || t === this.player.media.el || this.player.media.el.contains(t) || t === this.thumb
            }, e.prototype.keyboardSlideProgress = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                if (e && !this.frameSeeking && (this.frameSeeking = !0, this.player.trigger(c.UI_SEEKSTART, !0)), this.player.getState() != h.UNSTARTED && !this.player.isPlayingLinearAd()) {
                    var i = e ? j : F;
                    this.player.seekBy(i * t)
                }
            }, e.prototype.keyboardSlideVolume = function(t) {
                var e = B * t;
                this.player.setVolume(this.player.getVolume() + e)
            }, e.prototype.onKeyUp = function(t) {
                t.keyCode == KEY.ALT && this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(c.UI_SEEKEND))
            }, e.prototype.onKeyboardFocus = function(t) {
                this._keyboardFocus = t, toggleClass(this.el, "_keyboard_focus", t)
            }, e.prototype.onBlur = function(t) {
                this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(c.UI_SEEKEND))
            }, e.prototype.onMouseEnter = function(t) {
                this._mouseInside = !0, this.showUI()
            }, e.prototype.onMouseLeave = function(t) {
                this._mouseInside = !1;
                var e = this.player.getState() === h.PLAYING,
                    i = this.player.getState() == h.PAUSED && this.player.isAutoplay();
                !e && !i || this.controls.isActive() || this.hideUI()
            }, e.prototype.onMouseMove = function(t) {
                if (this._lastUserActivity = Date.now(), this.showUI(), !this._uiDisabled && this.player.isAutoplay()) {
                    var e = this.player.getState();
                    e !== h.ENDED && e !== h.ERROR && toggleClass(this.autoplayHint, "hidden", !this.isBackgroundElement(t.target))
                }
            }, e.prototype.onWheel = function(t) {
                if (!browser.mac && this.player.isFullscreen()) {
                    var e = t.deltaY > 0 ? -1 : 1;
                    this.player.setVolume(this.player.getVolume() + H * e), this._lastUserActivity = Date.now(), this.showUI()
                }
            }, e.prototype.hideUI = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = t.hideCursor,
                    i = void 0 === e ? !0 : e,
                    n = t.noTransition,
                    r = void 0 === n ? !1 : n;
                this._controlsHidden || (r && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), this.shareActions.hide(), this.controls.hide(), addClass(this.title, "hidden"), this.player.isAutoplay() && (removeClass(this.autoplayTimer, "hidden"), addClass(this.autoplayHint, "hidden")),
                    this.stickersPromo && addClass(this.stickersPromo, "hidden"), setStyle(this.player.el, {
                        cursor: i ? "none" : ""
                    }), this._controlsHidden = !0, this.player.trigger(c.UI_CONTROLS_HIDE))
            }, e.prototype.showUI = function() {
                this._uiDisabled || this._controlsHiddenByAd || !this._controlsHidden || (this.shareActions.show(), this.controls.show(), removeClass(this.title, "hidden"), this.player.isAutoplay() ? (addClass(this.autoplayTimer, "hidden"), removeClass(this.autoplayHint, "hidden"), setStyle(this.player.el, {
                    cursor: "pointer"
                })) : setStyle(this.player.el, {
                    cursor: ""
                }), this.stickersPromo && removeClass(this.stickersPromo, "hidden"), this._controlsHidden = !1, this.player.trigger(c.UI_CONTROLS_SHOW))
            }, e.prototype.updateWaiting = function() {
                var t = this.player,
                    e = (!t.isInited() || t.isBuffering() || t.isLoadingAds()) && !t.isPlayingLinearAd() && this.player.getState() !== h.ERROR && t.getLivePhase() !== f.UPCOMING;
                toggle(this.waiting, e), attr(this.player.el, "aria-busy", e ? "true" : "false")
            }, e.prototype.updateTitle = function(t) {
                "undefined" != typeof t && (val(this.titleLink, t), attr(this.titleLink, "href", "/video" + this.player.getVideoId()));
                var e = this.player.isInited(),
                    i = this.player.isPlayingLinearAd(),
                    n = this.player.isFullscreen(),
                    r = this.getVar("is_embed") || this.getVar("is_inline") && "videocat" == this.getVar("module"),
                    o = e && !this.getVar("no_title") && !i && !this.endScreen && (n || r);
                toggle(this.title, !!o)
            }, e.prototype.showError = function(t) {
                var e = t.message,
                    i = t.waiting,
                    n = void 0 === i ? !1 : i,
                    r = "";
                r += n ? getProgressHtml("", "_error_progress_icon pr_big") : '<div class="_error_icon"></div>', r += '<div class="_text">' + e + "</div>", r = '<div class="_error_msg">' + r + "</div>";
                var o = this.getVar("first_frame_800") || this.getVar("first_frame_320") || this.getVar("jpg") || "";
                r = '<div class="_background" style="background-image:url(' + o + ')"></div>' + r, val(this.error, r), removeClass(this.error, "hidden"), attr(this.error, "aria-hidden", !1)
            }, e.prototype.hideError = function() {
                addClass(this.error, "hidden"), attr(this.error, "aria-hidden", !0)
            }, e.prototype.showLiveWarning = function(t) {
                var e = this,
                    i = t.message;
                this.hideLiveWarning(), !this._ignoreLiveWarning && i && (this.warning = ce("div", {
                    className: "videoplayer_warning",
                    innerHTML: i + '<span class="videoplayer_warning_close"></span>'
                }), this.domListen(domByClass(this.warning, "videoplayer_warning_close"), "click", function() {
                    e.hideLiveWarning(), e._ignoreLiveWarning = !0
                }), this.el.appendChild(this.warning))
            }, e.prototype.hideLiveWarning = function() {
                this.warning && (this.domUnlisten(domByClass(this.warning, "videoplayer_warning_close")), re(this.warning), this.warning = null)
            }, e.prototype.onStateChange = function(t, e) {
                domData(this.el, "state", t);
                var i = this.player.isAutoplay();
                if (t === h.PLAYING || i && t == h.PAUSED || this.showUI(), t === h.PLAYING && i && !this._mouseInside && this.hideUI({
                        noTransition: !0
                    }), this.endScreen && t !== h.ENDED && (this.removeEndScreen(), this._controlsHidden || this.controls.show()), t === h.ENDED && this.canShowEndScreen() && this.buildEndScreen(), i && !this.player.isStartedPlaying()) {
                    var n = t === h.ENDED && !this.endScreen;
                    this.toggleThumb(!0, n)
                } else {
                    var r = t === h.UNSTARTED && !this.getVar("autoplay") || t === h.ENDED,
                        o = !this.endScreen;
                    this.toggleThumb(r, o)
                }
                if (i) {
                    var s = t !== h.ENDED && t !== h.ERROR;
                    toggle(this.autoplayTimer, s), toggle(this.autoplayHint, s)
                }
                t === h.ERROR ? (this.showError(this.player.getErrorData()), this.showUI(), this.toggleThumb(!1), this.toggleLiveDummy(!1), addClass(this.autoplayHint, "hidden")) : this.hideError(), this.updateTitle(), this.updateWaiting(), this.updateShareActions()
            }, e.prototype.toggleThumb = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                toggleClass(this.thumb, "hidden", !t), t && toggle(domByClass(this.thumb, "videoplayer_big_play_btn"), e)
            }, e.prototype.onFullscreenChange = function(t) {
                toggleClass(this.el, "_fullscreen", t), this.updateTitle(), browser.mac || (t ? this.domListen(this.player.el, "wheel", this.onWheel) : this.domUnlisten(this.player.el, "wheel", this.onWheel))
            }, e.prototype.onLivePhaseChange = function(t) {
                var e = !1;
                t == f.UPCOMING && this.getVar("live_start"), t == f.UPCOMING ? (val(this.liveWaiting, this.getLang("live_starting_soon")), e = !0) : e = !1, this.player.getState() === h.ERROR && (e = !1), this.toggleLiveDummy(e), this.updateWaiting(), this.player.isAutoplay() && !this.player.isActiveLive() && (removeClass(this.autoplayTimer, "_live"), val(this.autoplayTimerText, formatTime(this.player.getDuration())), this.resizeAutoplayTimer())
            }, e.prototype.toggleLiveDummy = function(t) {
                toggleClass(this.liveWaiting, "hidden", !t)
            }, e.prototype.onMediaPlaying = function() {
                this.player.isFromAutoplay() && (this.toggleThumb(!1), this.player.isTouchedByUser() || this.resizeAutoplayTimer())
            }, e.prototype.onMediaTimeupdate = function(t) {
                if (this.player.isAutoplay() && !this.player.isActiveLive()) {
                    var e = positive(this.player.getDuration() - t);
                    val(this.autoplayTimerText, formatTime(e))
                }
            }, e.prototype.resizeAutoplayTimer = function() {
                if (!this.player.isActiveLive()) {
                    var t = formatTime(this.player.getDuration()),
                        e = val(this.autoplayTimerText);
                    v.setText(this.autoplayTimerText, t.replace(/\d/g, "8")), setStyle(this.autoplayTimerText, {
                        minWidth: this.autoplayTimerText.offsetWidth + "px"
                    }), v.setText(this.autoplayTimerText, e)
                }
                setStyle(this.autoplayTimerEqualizer, {
                    display: ""
                })
            }, e.prototype.onLinearAdStarted = function(t, e) {
                var i = (e.duration, e.hideControls);
                this.updateTitle(), this.updateShareActions(), this.player.isAutoplay() && (hide(this.autoplayTimer), hide(this.autoplayHint)), i && (this._controlsHiddenByAd = !0, this.hideUI({
                    hideCursor: !1
                })), this.updateWaiting()
            }, e.prototype.onLinearAdCompleted = function(t) {
                this.updateTitle(), this.updateShareActions(), this.player.isAutoplay() && (show(this.autoplayTimer), show(this.autoplayHint)), this._controlsHiddenByAd && (this._controlsHiddenByAd = !1, this.showUI()), this.updateWaiting()
            }, e.prototype.checkUserActivity = function() {
                var t = this;
                if (!this._controlsHidden) {
                    var e = this.player,
                        i = function() {
                            return Date.now() - t._lastUserActivity > N
                        },
                        n = function() {
                            return t.controls.isActive() || isHover(t.controls.el) || isHover(t.shareActions.el)
                        };
                    this.player.getState() !== h.PLAYING || this._mouseInside && !e.isFullscreen() || !i() || n() || this.hideUI({
                        hideCursor: this.player.isFullscreen()
                    })
                }
            }, e.prototype.canShowEndScreen = function() {
                return this.getVar("live") && this.getVar("live") !== f.ENDED ? !1 : this.getVar("nolikes") ? this.getVar("show_next") && this.player.getNextVideos().length || this.getVar("show_suggestions") && this.player.getSuggestions().length : !0
            }, e.prototype.buildEndScreen = function() {
                var t, e, i = [],
                    n = !1,
                    r = !1;
                i = this.player.getNextVideos(), i.length && (n = this.player.nextTimerEnabled()), this.getVar("show_suggestions") && !i.length && (i = this.player.getSuggestions(), r = !0, n = !1), i.length ? this.endScreen = new I["default"](this.player, i, n, r) : this.endScreen = new C["default"](this.player), this.el.appendChild(this.endScreen.el);
                var o = this.player.getSize();
                (t = this.endScreen).resize.apply(t, o), (e = this.endScreen).isStretchMode.apply(e, o) && this.controls.hide()
            }, e.prototype.removeEndScreen = function() {
                re(this.endScreen.el), this.endScreen.destroy(), delete this.endScreen
            }, e.prototype.buildStickersPromo = function(t, e, i, n) {
                var r = isRetina() ? 256 : 96,
                    o = "/images/gift/-" + t + "/" + r + ".png";
                this.stickersPromo = ce("div", {
                    className: "videoplayer_stickers_promo"
                }), domData(this.stickersPromo, "pack-id", t);
                var s = se('\n<a href="/stickers/' + e + '" target="_blank" class="videoplayer_stickers_promo__link">\n  <div class="videoplayer_stickers_promo__title">' + i + '</div>\n  <div class="videoplayer_stickers_promo__price">' + n + '</div>\n  <img src="' + o + '" class="videoplayer_stickers_promo__img"/>\n</a>');
                this.domListen(s, "click", this.onStickersPromoClick.bind(this, t, e));
                var a = ce("div", {
                    className: "videoplayer_sticker_promo__close"
                });
                this.domListen(a, "click", this.removeStickersPromo), this.stickersPromo.appendChild(s), this.stickersPromo.appendChild(a), this.el.appendChild(this.stickersPromo)
            }, e.prototype.onStickersPromoClick = function(t, e, i) {
                this.player.isFullscreen() && this.player.toggleFullscreen(), Emoji.previewSticker(t, this, {
                    name: e
                }, i)
            }, e.prototype.onStickersPurchased = function(t) {
                domData(this.stickersPromo, "pack-id") == t && this.removeStickersPromo()
            }, e.prototype.removeStickersPromo = function() {
                this.stickersPromo && (re(this.stickersPromo), this.domUnlisten(domFC(this.stickersPromo)), this.domUnlisten(domLC(this.stickersPromo)), delete this.stickersPromo)
            }, e.prototype.pushNotice = function(t) {
                var e = this,
                    i = t.type,
                    n = t.image,
                    r = t.text;
                if (!inArray(i, this._ignoreNoticeTypes) && this.player.isActiveLive()) {
                    var o = this.player.getSize(),
                        s = l(o, 2),
                        a = s[0],
                        u = s[1];
                    if (!(510 >= a || 287 >= u)) {
                        this.removeNotice(), this._noticeEl = se('\n<div class="videoplayer_notice hidden">\n  <img src="' + n + '" class="videoplayer_notice__image"/>\n  <div class="videoplayer_notice__text">' + r + "</div>\n  " + _.noticeClose("videoplayer_notice__close") + "\n</div>\n    "), this.domListen(this._noticeEl, "mouseenter", function() {
                            var t = domData(e._noticeEl, "timeoutId");
                            e.undelay(t)
                        }), this.domListen(this._noticeEl, "mouseleave", function() {
                            var t = e.delay(e.removeNotice, 2e3);
                            domData(e._noticeEl, "timeoutId", t)
                        }), this.domListen(domByClass(this._noticeEl, "videoplayer_notice__close"), "click", function() {
                            e.removeNotice(), e._ignoreNoticeTypes.push(i)
                        }), this.el.appendChild(this._noticeEl), this._noticeEl.offsetHeight, removeClass(this._noticeEl, "hidden");
                        var h = this.delay(this.removeNotice, 5e3);
                        domData(this._noticeEl, "timeoutId", h)
                    }
                }
            }, e.prototype.removeNotice = function() {
                var t = this._noticeEl;
                if (t) {
                    this._noticeEl = null, this.domUnlisten(t), this.domUnlisten(domByClass(t, "videoplayer_notice__close"));
                    var e = domData(t, "timeoutId");
                    this.undelay(e), addClass(t, "hidden"), setTimeout(function() {
                        re(t)
                    }, 200)
                }
            }, e.prototype.isControlsVisible = function() {
                return !this._controlsHidden
            }, e.prototype.resize = function(t, e) {
                toggleClass(this.el, "_minimized", this.player.isMinimized()), toggleClass(this.error, "_min_size", 720 > t || 405 > e), toggleClass(this.liveWaiting, "_min_size", 720 > t || 405 > e), this.updateShareActions(), this.endScreen && (this.endScreen.isStretchMode(t, e) ? this.controls.hide() : this.controls.show()), this.stickersPromo && toggle(this.stickersPromo, t >= 640 && e >= 360)
            }, e.prototype.updateShareActions = function() {
                var t, e = !!this.endScreen && (t = this.endScreen).isStretchMode.apply(t, this.player.getSize());
                this.shareActions.updateVisibility(e)
            }, e.prototype.onPlayerExpanded = function() {
                this.updateTitle(), setStyle(this.thumb, {
                    backgroundImage: "url(" + this.player.getThumbSrc() + ")"
                })
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), clearInterval(this._checkUserActivityInterval)
            }, e
        }(b["default"]);
    e["default"] = U
}, function(t, e, i) {
    "use strict";
    var n = i(107),
        r = i(18),
        o = i(31),
        s = {};
    i(23)(s, i(78)("iterator"), function() {
        return this
    }), t.exports = function(t, e, i) {
        t.prototype = n(s, {
            next: r(1, i)
        }), o(t, e + " Iterator")
    }
}, function(t, e, i) {
    var n = i(61);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
        return "String" == n(t) ? t.split("") : Object(t)
    }
}, function(t, e) {
    t.exports = function() {}
}, function(t, e) {
    e.f = Object.getOwnPropertySymbols
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t) {
        return function() {
            var e = t.apply(this, arguments);
            return new Promise(function(t, i) {
                function n(r, o) {
                    try {
                        var s = e[r](o),
                            a = s.value
                    } catch (l) {
                        return void i(l)
                    }
                    return s.done ? void t(a) : Promise.resolve(a).then(function(t) {
                        n("next", t)
                    }, function(t) {
                        n("throw", t)
                    })
                }
                return n("next")
            })
        }
    }

    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function a(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function l(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        h = i(51),
        d = r(h),
        c = i(60),
        p = n(c),
        f = i(59),
        y = n(f),
        v = i(63),
        g = n(v),
        _ = i(7),
        m = n(_),
        b = i(79),
        E = r(b),
        S = i(38),
        L = r(S),
        w = i(70),
        A = r(w),
        T = i(24),
        k = r(T),
        C = i(53),
        P = r(C),
        I = i(56),
        D = r(I),
        x = 3e3,
        M = 15e3,
        O = 2e3,
        R = 2e3,
        V = function(t) {
            function e(i) {
                s(this, e);
                var n = a(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_media"
                }), n.playerListen(y.UI_SEEKSTART, n.onUiSeekStart), n.playerListen(y.UI_SEEKEND, n.onUiSeekEnd), n.playerListen(y.MEDIA_WAITING, n.onWaitingChange), n.playerListen(y.STATE_CHANGE, n.onStateChange), n.playerListen(y.QUALITY_CHANGE, n.onQualityChange), n.playerListen(y.EXPANDED, n.updateAspectRatio), n.playerListen(y.FULLSCREEN_CHANGE, n.updateAspectRatio), n._interruptionCheckerInterval = setInterval(n.checkInterruption.bind(n), 200), n.vigoStats = new E["default"](n.player, n), n
            }
            return l(e, t), e.prototype.initVideo = function(t) {
                if (t.live === g.FAILED) return void this.onLiveFailed();
                var e = void 0;
                switch (this.providerType()) {
                    case "hls":
                        e = new A["default"](this.player);
                        break;
                    case "base":
                        e = new L["default"](this.player);
                        break;
                    case "flash":
                        e = new k["default"](this.player);
                        break;
                    default:
                        return void this.player.trigger(y.MEDIA_ERROR, {
                            message: this.getLang("load_error")
                        })
                }
                this.attachProvider(e);
                var i = this.getInitialSrc(t);
                i ? t.live === g.UPCOMING || t.live === g.WAITING || t.live === g.STARTED ? this.checkLiveStarted(i) : e.src = i : this.setQuality(this.getInitialQuality(t));
                var n = this.getInitialTime(t);
                n > 0 && (e.currentTime = n, this.player.trigger(y.MEDIA_TIMEUPDATE, n)), this.setVolume(this.getInitialVolume()), this.toggleLoop(!!t.repeat), this.rotateVideo(!1, !0), this.updateAspectRatio(), this.vigoStats.init(t.vigo_host, t.vigo_cid, !!t.hls, !!t.extra, !!t.from_autoplay), this.vigoStats.enable(!t.live), this.filterSavedVideosPositions()
            }, e.prototype.updateAspectRatio = function() {
                var t = this.getVar("stretch_vertical"),
                    e = this.getVar("is_inline"),
                    i = this.getVar("aspect_ratio"),
                    n = this.player.isFullscreen(),
                    r = "",
                    o = "",
                    s = "";
                t && e && !n && i && 1 > i && (r = o = -(1 / i - 1) / 2 * 100 + "%", s = "auto"), setStyle(this.el, {
                    top: r || "",
                    bottom: o || "",
                    height: s || ""
                })
            }, e.prototype.getInitialSrc = function(t) {
                var e = this.providerType();
                return t.rtmp && "flash" == e ? t.rtmp : "hls" == e ? t.hls_raw && window.URL && window.Blob ? URL.createObjectURL(new Blob([t.hls_raw], {
                    type: "application/vnd.apple.mpegurl"
                })) : t.hls : void 0
            }, e.prototype.getInitialVolume = function() {
                return this.player.isMuted() ? 0 : this.player.getVolume()
            }, e.prototype.getInitialQuality = function(t) {
                var e = this.player.preferredQuality;
                t.from_autoplay && (e = Math.min(m.INLINE_INITIAL, e));
                var i = t.hd_def ? m.qualityFromIndex(t.hd_def) : 0,
                    n = m.qualityFromIndex(t.hd);
                return Math.min(Math.max(i, e), n)
            }, e.prototype.getInitialTime = function(t) {
                if (this.player.isActiveLive()) return 0;
                if (t.t) {
                    var e = P["default"].fromString(t.t);
                    if (e < t.duration) return e
                } else {
                    var i = D["default"].get("video_position" + this.player.getVideoId());
                    if (i && t.duration - i.pos > 30) return i.pos
                }
                return 0
            }, e.prototype.providerType = function() {
                return this.provider instanceof A["default"] ? "hls" : this.provider instanceof k["default"] ? "flash" : this.provider instanceof L["default"] ? "base" : this.chooseProvider()
            }, e.prototype.chooseProvider = function() {
                if (this.player.isInited()) {
                    var t = this.player.getVars(),
                        e = t.hls && this.player.isHlsSupported(),
                        i = t.can_play_mp4 && (!t.live || t.postlive_mp4),
                        n = this.player.isFlashSupported() && (!t.live || t.rtmp || t.postlive_mp4),
                        r = t.is_flv || t.force_rtmp && n && !t.from_autoplay,
                        o = t.direct_mp4;
                    return !e || o || r ? i && !r ? "base" : n ? "flash" : void 0 : "hls"
                }
            }, e.prototype.attachProvider = function(t) {
                var e = this;
                this.provider && this.destroyProvider(), this.provider = t, this.el.appendChild(t.el), this.domListen(t.el, "timeupdate", this.onTimeupdate), this.domListen(t.el, "progress", this.onProgress), this.domListen(t.el, "volumechange", this.onVolumechange), this.domListen(t.el, "durationchange", function() {
                    e.player.trigger(y.MEDIA_DURATIONCHANGE, e.getDuration())
                }), this.domListen(t.el, "loadeddata", function(t) {
                    e.buffering = !1
                }), this.domListen(t.el, "playing", function() {
                    e.buffering = !1, e.provider.el.paused || e.player.trigger(y.MEDIA_PLAYING)
                }), this.domListen(t.el, "pause", function() {
                    e._ui_seeking || e._disabled || e.player.getState() === p.ERROR || e.player.trigger(y.MEDIA_PAUSE)
                }), this.domListen(t.el, "ended", function() {
                    e.player.trigger(y.MEDIA_ENDED)
                }), this.domListen(t.el, "error", this.onError), this.player.trigger(y.MEDIA_PROVIDER_CHANGE, {
                    type: this.providerType()
                })
            }, e.prototype.destroyProvider = function() {
                this.provider && (this.domUnlisten(this.provider.el), re(this.provider.el), this.provider.destroy(), this.provider = null)
            }, e.prototype.deinitVideo = function() {
                this._disabled = !1, this.buffering = !1, this.interrupted = !1, this.aborted = !1, this.preloadRequested = !1, this.bufEndReached = !1, this.lastNetworkRecoveryTry = 0, this.vigoStats.reset(), this.destroyProvider(), this.undelay(this.liveStartCheckTimeout), this.undelay(this.liveEndCheckTimeout), this.liveHlsCheckRequest && (this.liveHlsCheckRequest.abort(), delete this.liveHlsCheckRequest), delete this.postLiveCheckCount
            }, e.prototype.checkLiveStarted = function(t) {
                var e = this,
                    i = this.player.getVideoId(),
                    n = !!this.getVar("live_preparing"),
                    r = !1,
                    s = function u() {
                        e.player.getVideoId() == i && e.player.checkLivePhase(function(t) {
                            if (t.live_preparing) n = !0;
                            else if ((n || e.player.getLivePhase() === g.UPCOMING && t.phase !== g.UPCOMING) && (n = !1, e.onLiveStarted(), !e.player.isInited())) return;
                            switch (t.phase) {
                                case g.STARTED:
                                    r ? n && e.delay(u, x) : a();
                                    break;
                                case g.WAITING:
                                case g.UPCOMING:
                                    r && (r = !1, e.player.changeLivePhase(t.phase));
                                    var i = e.player.getLivePhase() !== g.UPCOMING || n ? x : M;
                                    e.liveStartCheckTimeout = e.delay(u, i)
                            }
                            e.onLiveWaiting(t.stream_error_text, t.stream_error_level)
                        })
                    },
                    a = function() {
                        var i = o(regeneratorRuntime.mark(function n() {
                            var i;
                            return regeneratorRuntime.wrap(function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        if (i = void 0, n.prev = 1, "hls" !== e.providerType()) {
                                            n.next = 8;
                                            break
                                        }
                                        return n.next = 5, e.checkHlsManifestValidity(t);
                                    case 5:
                                        i = n.sent, n.next = 11;
                                        break;
                                    case 8:
                                        return n.next = 10, e.checkRtmpRedirect(t);
                                    case 10:
                                        i = n.sent;
                                    case 11:
                                        return n.prev = 11, i ? l(i) : e.delay(s, x), n.finish(11);
                                    case 14:
                                    case "end":
                                        return n.stop()
                                }
                            }, n, e, [
                                [1, , 11, 14]
                            ])
                        }));
                        return function() {
                            return i.apply(this, arguments)
                        }
                    }(),
                    l = function(t) {
                        e.player.getVideoId() == i && (e.player.getState() == p.ERROR && e.player.changeState(e.player.prevState), e.player.changeLivePhase(g.STARTED), e.provider.src = t, e.provider.load(), e.player.getState() === p.PLAYING && e.play(), r = !0, n && e.delay(s, x))
                    };
                this.player.getLivePhase() == g.STARTED ? a() : s()
            }, e.prototype.checkHlsManifestValidity = function() {
                function t(t) {
                    return e.apply(this, arguments)
                }
                var e = o(regeneratorRuntime.mark(function i(t) {
                    var e, n;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                            case 0:
                                return i.next = 2, this.request(t).promise;
                            case 2:
                                if (e = i.sent, n = e.response, !(n.indexOf("#EXT-X-STREAM-INF:") > 0 || n.indexOf("#EXTINF:") > 0)) {
                                    i.next = 6;
                                    break
                                }
                                return i.abrupt("return", t);
                            case 6:
                                return i.abrupt("return", !1);
                            case 7:
                            case "end":
                                return i.stop()
                        }
                    }, i, this)
                }));
                return t
            }(), e.prototype.checkRtmpRedirect = function() {
                function t(t) {
                    return e.apply(this, arguments)
                }
                var e = o(regeneratorRuntime.mark(function i(t) {
                    var e, n, r;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                            case 0:
                                e = 0;
                            case 1:
                                if (!(10 > e)) {
                                    i.next = 15;
                                    break
                                }
                                if ("string" == typeof t) {
                                    i.next = 4;
                                    break
                                }
                                return i.abrupt("return", !1);
                            case 4:
                                if (0 !== t.indexOf("rtmp")) {
                                    i.next = 6;
                                    break
                                }
                                return i.abrupt("return", t);
                            case 6:
                                return t += (t.indexOf("?") > -1 ? "&" : "?") + "get_redirect_url=1", i.next = 9, this.request(t).promise;
                            case 9:
                                n = i.sent, r = n.response, t = trim(r);
                            case 12:
                                e++, i.next = 1;
                                break;
                            case 15:
                                return i.abrupt("return", !1);
                            case 16:
                            case "end":
                                return i.stop()
                        }
                    }, i, this)
                }));
                return t
            }(), e.prototype.checkLiveEnded = function() {
                var t = this;
                this.player.checkLivePhase(function(e) {
                    switch (t.undelay(t.liveEndCheckTimeout), delete t.liveEndCheckTimeout, e.phase) {
                        case g.ENDED:
                            t.onLiveEnded(e);
                            break;
                        case g.FAILED:
                            t.onLiveFailed(e);
                            break;
                        case g.WAITING:
                            t.liveEndCheckTimeout = t.delay(t.checkLiveEnded, R);
                            break;
                        case g.STARTED:
                            t.player.getState() == p.ERROR && t.player.changeState(t.player.prevState), t.isWaiting() && (e.media_url ? (t.provider.reset(), t.provider.src = e.media_url) : t.provider.delayRecoverNetwork && t.provider.delayRecoverNetwork()), t.player.getState() === p.PLAYING && t.provider.play(), t.liveEndCheckTimeout = t.delay(t.checkLiveEnded, R)
                    }
                    t.onLiveWaiting(e.stream_error_text, e.stream_error_level)
                })
            }, e.prototype.onLiveStarted = function() {
                this.player.externalCall("onLiveStarted", this.player.getVideoId())
            }, e.prototype.onLiveEnded = function(t) {
                this.player.vars.duration = t.duration, t.jpg && (this.player.vars.jpg = t.jpg), this.player.trigger(y.MEDIA_ENDED), this.switchToPostLive(t), this.player.externalCall("onLiveEnded", this.player.getVideoId())
            }, e.prototype.onLiveFailed = function() {
                this.destroyProvider(), this.player.trigger(y.MEDIA_ERROR, {
                    message: this.getLang("live_failed")
                })
            }, e.prototype.onLiveWaiting = function(t, e) {
                this.player.trigger(y.MEDIA_LIVE_WARNING, {
                    message: "warning" == e ? t : !1
                }), "fatal" == e && (this.player.trigger(y.MEDIA_ERROR, {
                    message: t,
                    waiting: !0
                }), this.pause())
            }, e.prototype.checkPostlive = function() {
                var t = this,
                    e = this.player.getVideoId();
                ajax.post("al_video.php?act=check_postlive", {
                    oid: this.getVar("oid"),
                    vid: this.getVar("vid"),
                    hash: this.getVar("action_hash")
                }, {
                    onDone: function(i) {
                        t.player.getVideoId() == e && (i.hls || i.postlive_mp4 ? t.switchToPostLive(i) : i.deleted || t.checkPostliveDelayed())
                    },
                    onFail: function() {
                        return t.player.getVideoId() == e ? (t.checkPostliveDelayed(), !0) : void 0
                    }
                })
            }, e.prototype.checkPostliveDelayed = function() {
                this._postLiveCheckCount = (this._postLiveCheckCount || 0) + 1;
                var t = 100 * this._postLiveCheckCount;
                this.delay(this.checkPostlive, 3e3 + t)
            }, e.prototype.switchToPostLive = function(t) {
                var e = t.hls,
                    i = (t.rtmp, t.postlive_mp4);
                this.undelay(this.liveStartCheckTimeout), this.destroyProvider();
                var n = void 0,
                    r = void 0;
                e && this.player.isHlsSupported() ? (n = new A["default"](this.player), r = e) : i && this.getVar("can_play_mp4") ? (n = new L["default"](this.player), r = i) : i && this.player.isFlashSupported() && (n = new k["default"](this.player), r = i), n && r ? (this.player.changeLivePhase(g.ENDED), this.player.changeState(p.ENDED), this.attachProvider(n), n.src = r, n.volume = this.getInitialVolume(), !this.player.isStartedPlaying() && this.getVar("autoplay") && this.player.play()) : (this.player.trigger(y.MEDIA_ERROR, {
                    message: this.getLang("live_wait_record"),
                    waiting: !0
                }), this.checkPostliveDelayed())
            }, e.prototype.getAvailableQualities = function() {
                var t = [];
                if (this.provider && this.provider.getAvailableQualities) t = this.provider.getAvailableQualities();
                else
                    for (var e = this.getVar("hd") || 0, i = 0; e >= i; ++i) {
                        var n = m.qualityFromIndex(i);
                        n && this.getMp4Url(n) && t.push(n)
                    }
                return t.sort(function(t, e) {
                    return e - t
                })
            }, e.prototype.isAutoQualityAvailable = function() {
                return this.provider && this.provider.isAutoQualityAvailable && this.provider.isAutoQualityAvailable() || !1
            }, e.prototype.isAutoQualityEnabled = function() {
                return this.provider && this.provider.isAutoQualityEnabled && this.provider.isAutoQualityEnabled() || !1
            }, e.prototype.getQuality = function() {
                return this.provider && this.provider.getQuality ? this.provider.getQuality() : 0
            }, e.prototype.onTimeupdate = function() {
                var t = this.curTime();
                this.player.trigger(y.MEDIA_TIMEUPDATE, t), this.player.isActiveLive() || D["default"].set("video_position" + this.player.getVideoId(), {
                    date: Date.now(),
                    pos: t
                })
            }, e.prototype.filterSavedVideosPositions = function() {
                var t = D["default"].getByPrefix("video_position"),
                    e = Object.keys(t);
                if (e.length > 3) {
                    var i = void 0;
                    e.forEach(function(e) {
                        (!i || t[e].date < t[i].date) && (i = e)
                    }), D["default"].remove(i)
                }
            }, e.prototype.onProgress = function() {
                var t = this.getBufferedRanges(),
                    e = this.curTime();
                if (t.length) {
                    for (var i = 0; i < t.length; ++i)
                        if (!(t.end(i) <= e)) {
                            if (t.start(i) - e > 30) break;
                            e = t.end(i)
                        }
                    this.player.trigger(y.MEDIA_PROGRESS, e / this.getDuration()), this.bufEndReached || t.end(t.length - 1) !== this.getDuration() || (this.bufEndReached = !0, this.player.getState() === p.PLAYING && this.vigoStats.triggerEvent("heartbeat"))
                }
            }, e.prototype.onVolumechange = function() {
                this.player.trigger(y.MEDIA_VOLUMECHANGE, this.getVolume())
            }, e.prototype.onError = function(t) {
                if (!t || "hls" != this.providerType()) {
                    var e = this.getErrorCode();
                    if (this.player.debugLog("media error: " + e, {
                            force: !0
                        }), e == MediaError.MEDIA_ERR_NETWORK && Date.now() - intval(this.lastNetworkRecoveryTry) > 5e3) {
                        this.lastNetworkRecoveryTry = Date.now();
                        var i = this.player.getQuality();
                        return void this.setQuality(i)
                    }
                    if (e != MediaError.MEDIA_ERR_ABORTED && "hls" != this.providerType()) {
                        var n = this.player.getQuality(),
                            r = this.getVar("cache" + n);
                        if (r && this.provider.currentSrc == r) return void this.setQuality(n, {
                            ignoreCacheServer: !0
                        })
                    }
                    if (e == MediaError.MEDIA_ERR_ABORTED) this.aborted = !0;
                    else {
                        var o = this.getVar("extra") && !this.getVar("live") ? this.getLang("external_service_file_not_found") : this.getLang("load_error");
                        if (e) {
                            var s = this.getErrorCodeDescription(e);
                            s && (s = " (" + s + ")"), o += "<br><small>" + this.getLang("err_code", {
                                code: e
                            }) + s + "</small>"
                        }
                        this.player.trigger(y.MEDIA_ERROR, {
                            message: o
                        }), this.vigoStats.triggerEvent("error"), ajax.post("al_video.php?act=player_error_stat", {
                            provider: this.providerType(),
                            code: e,
                            host: this.getContentHost(),
                            quality: this.player.getQuality(),
                            is_auto_quality: this.isAutoQualityEnabled() ? 1 : 0,
                            hash: this.getVar("error_stat_hash")
                        }, {})
                    }
                }
            }, e.prototype.onStateChange = function(t, e) {
                switch (this.updateVisibility(), t) {
                    case p.PLAYING:
                        this._disabled || (this.play(), this.vigoStats.triggerEvent("play"));
                        break;
                    case p.PAUSED:
                        this._disabled || (this.pause(), this.vigoStats.triggerEvent("pause"));
                        break;
                    case p.ENDED:
                        this.vigoStats.triggerEvent("stop")
                }
            }, e.prototype.onQualityChange = function(t, e, i) {
                this.vigoStats.triggerEvent(i ? "heartbeat" : "bitrate_change")
            }, e.prototype.onWaitingChange = function(t, e) {
                this.updateVisibility(), this.vigoStats.triggerEvent(t ? "buf_start" : "buf_stop"), this.player.getLivePhase() === g.STARTED && (t ? this.liveEndCheckTimeout || (this.liveEndCheckTimeout = this.delay(this.checkLiveEnded, O)) : (this.undelay(this.liveEndCheckTimeout), delete this.liveEndCheckTimeout))
            }, e.prototype.onUiSeekStart = function(t) {
                this._ui_seeking = !0, this._frame_seeking = t, this.pause()
            }, e.prototype.onUiSeekEnd = function() {
                var t = this;
                setTimeout(function() {
                    t._ui_seeking = !1, t._frame_seeking = !1, t.player.getState() !== p.PLAYING || t.provider.el.ended || t.play()
                })
            }, e.prototype.updateVisibility = function() {
                var t = this.buffering || this._disabled || !this.player.isInited() || this.aborted || this.player.getState() === p.ERROR;
                setStyle(this.el, {
                    visibility: t && "flash" != this.providerType() ? "hidden" : ""
                })
            }, e.prototype.isWaiting = function() {
                return this.buffering || this.interrupted
            }, e.prototype.curTime = function() {
                return this.provider && this.provider.currentTime || 0
            }, e.prototype.getDuration = function() {
                return this.provider && this.provider.duration || 0
            }, e.prototype.setQuality = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = e.ignoreCacheServer,
                    n = void 0 === i ? !1 : i;
                if (this.provider.setQuality) return this.provider.setQuality(t), void(t == m.AUTO && this.vigoStats.triggerEvent("bitrate_change"));
                var r = this.getMp4Url(t, n),
                    o = this.curTime();
                this.provider.src = r, this.player.onQualityChanged(t), this.player.getState() !== p.UNSTARTED && (this.vigoStats.triggerEvent("bitrate_change"), this.provider.load(), this.provider.currentTime = o, this.player.getState() === p.PLAYING && this.play(), this.buffering = !0, this._lastInterruptionCheckTime = null)
            }, e.prototype.seekTo = function(t) {
                var e = this;
                this._frame_seeking || this.vigoStats.triggerEvent("heartbeat"), this.provider.currentTime = Math.max(0, Math.min(this.player.getDuration(), t)), this._frame_seeking || this.vigoStats.triggerEvent("seek");
                var i = this.isInBufferedArea(t);
                i || (this.buffering = !0), this.player.trigger(y.MEDIA_SEEKING, i), this.domListenOnce(this.provider.el, "seeked", function(t) {
                    e.buffering = !1, e.player.trigger(y.MEDIA_SEEKED, i)
                }), this._lastInterruptionCheckTime = null, this.onProgress()
            }, e.prototype.getVolume = function() {
                return this.provider ? this.provider.volume : 0
            }, e.prototype.setVolume = function(t) {
                this.provider && (this.provider.volume = t)
            }, e.prototype.isLooped = function() {
                return this.provider ? this.provider.loop : !1
            }, e.prototype.toggleLoop = function(t) {
                return this.provider ? this.provider.loop = t : !1
            }, e.prototype.canChangePlaybackRate = function() {
                return this.provider ? this.provider.canChangePlaybackRate() : !1
            }, e.prototype.setPlaybackRate = function(t) {
                this.provider && (this.provider.playbackRate = t)
            }, e.prototype.getPlaybackRate = function() {
                return this.provider ? this.provider.playbackRate : 1
            }, e.prototype.getVideoRatio = function() {
                return this.provider && this.provider.videoRatio || this.getVar("aspect_ratio") || 16 / 9
            }, e.prototype.canRotateVideo = function() {
                return !(this.getVar("stretch_vertical") && this.getVar("is_inline"))
            }, e.prototype.rotateVideo = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                t === !1 ? this._rotateAlpha = 0 : this._rotateAlpha = (this._rotateAlpha || 0) + t;
                var i = this._rotateAlpha % 180 ? 1 / this.getVideoRatio() : 1;
                e && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), setStyle(this.el, {
                    transform: this._rotateAlpha ? "rotate(" + this._rotateAlpha + "deg) scale(" + i + ")" : ""
                })
            }, e.prototype.isPiPModeAvailable = function() {
                var t = this.provider && this.provider.el;
                return t ? "function" == typeof t.webkitSetPresentationMode : !1
            }, e.prototype.togglePiPMode = function() {
                var t = this.provider.el;
                t.webkitSetPresentationMode("picture-in-picture" === t.webkitPresentationMode ? "inline" : "picture-in-picture")
            }, e.prototype.preload = function() {
                this.provider && this.player.getState() === p.UNSTARTED && (this.preloadRequested || (this.preloadRequested = !0, this.vigoStats.triggerEvent("play"), this.provider.readyState || (this.buffering = !0), this.vigoStats.triggerEvent("pause"), this.provider.load()))
            }, e.prototype.play = function() {
                this.provider && (this._disabled || this.player.getLivePhase() !== g.UPCOMING && (this.provider.readyState || (this.buffering = !0), this.provider.play(), this._lastInterruptionCheckTime = null))
            }, e.prototype.pause = function() {
                this.provider && !this._disabled && this.provider.pause()
            }, e.prototype.disablePlayback = function() {
                this._disabled || (this.pause(), this.player.isActiveLive() && this.provider.pauseLoad && this.provider.pauseLoad(), this._disabled = !0, this.updateVisibility(), this.vigoStats.triggerEvent("pause"))
            }, e.prototype.enablePlayback = function() {
                this._disabled && (this._disabled = !1, this.updateVisibility(), this.player.getState() === p.PLAYING && (this.player.isActiveLive() && this.provider.resumeLoad && this.provider.resumeLoad(), this.play(), this.vigoStats.triggerEvent("play")))
            }, e.prototype.isPlayingMedia = function() {
                return this.player.getState() === p.PLAYING && !this._disabled
            }, e.prototype.getMp4Url = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                return this.getVar("direct_mp4") || this.getVar("postlive_mp4") || this.getVar("extra_data") || !e && this.getVar("cache" + t) || this.getVar("url" + t)
            }, e.prototype.getBufferedRanges = function() {
                return this.provider ? this.provider.buffered : []
            }, e.prototype.getPlayedRanges = function() {
                return this.provider ? this.provider.played : []
            }, e.prototype.getPlayedRangesString = function() {
                for (var t = this.getPlayedRanges(), e = [], i = 0; i < t.length; ++i) {
                    var n = Math.round(t.start(i)) + "-" + Math.round(t.end(i));
                    e.push(n)
                }
                return e.join(",")
            }, e.prototype.getPlayedSeconds = function() {
                for (var t = this.getPlayedRanges(), e = 0, i = 0; i < t.length; ++i) e += t.end(i) - t.start(i);
                return e
            }, e.prototype.isInBufferedArea = function(t) {
                for (var e = this.getBufferedRanges(), i = 0; i < e.length; ++i)
                    if (e.start(i) <= t && t <= e.end(i)) return !0;
                return !1
            }, e.prototype.getBufferPercent = function() {
                var t = this.curTime(),
                    e = this.getDuration(),
                    i = this.getBufferedRanges();
                if (!i.length) return 0;
                for (var n = 0; n < i.length; ++n) {
                    var r = i.start(n),
                        o = i.end(n);
                    if (t >= r && o >= t) return (o - r) / e * 100
                }
                return 0
            }, e.prototype.getLoadedBytes = function() {
                return this.provider && this.provider.getLoadedBytes ? this.provider.getLoadedBytes() : void 0
            }, e.prototype.getBitrate = function() {
                return this.provider && this.provider.getBitrate ? this.provider.getBitrate() : void 0
            }, e.prototype.getContentUrl = function() {
                return this.provider ? this.provider.getContentUrl ? this.provider.getContentUrl() : this.provider.currentSrc : void 0
            }, e.prototype.getContentHost = function() {
                var t = this.getContentUrl();
                return t ? ce("a", {
                    href: t
                }).hostname : void 0
            }, e.prototype.getErrorCode = function() {
                return this.provider && this.provider.error && this.provider.error.code || null;
            }, e.prototype.getErrorCodeDescription = function(t) {
                switch (t) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        return "aborted";
                    case MediaError.MEDIA_ERR_NETWORK:
                        return "network";
                    case MediaError.MEDIA_ERR_DECODE:
                        return "decode";
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        return "source not supported";
                    default:
                        return ""
                }
            }, e.prototype.getErrorsLog = function() {
                return this.provider && this.provider.getErrorsLog && this.provider.getErrorsLog() || null
            }, e.prototype.checkInterruption = function() {
                if (this.player.getState() !== p.PLAYING || this.player.getLivePhase() === g.UPCOMING || this._ui_seeking || this._disabled || this.buffering || !this.provider) return void(!this.interrupted || this.provider && this.provider.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA || (this.interrupted = !1));
                if (null != this._lastInterruptionCheckTime) {
                    var t = this.provider.currentTime,
                        e = t - this._lastInterruptionCheckTime;
                    if (e) this.interrupted = this.buffering = !1;
                    else {
                        var i = this.player.isAutoplay() && !t;
                        i || (this.interrupted = !0)
                    }
                }
                this._lastInterruptionCheckTime = this.provider.currentTime
            }, e.prototype.destroy = function() {
                clearInterval(this._interruptionCheckerInterval), t.prototype.destroy.call(this)
            }, u(e, [{
                key: "buffering",
                get: function() {
                    return !!this._buffering
                },
                set: function(t) {
                    if (t != this._buffering) {
                        var e = this.isWaiting();
                        this._buffering = t;
                        var i = this.isWaiting();
                        e != i && this.player.trigger(y.MEDIA_WAITING, i, !1)
                    }
                }
            }, {
                key: "interrupted",
                get: function() {
                    return !!this._interrupted
                },
                set: function(t) {
                    if (t != this._interrupted) {
                        var e = this.isWaiting();
                        this._interrupted = t;
                        var i = this.isWaiting();
                        e != i && this.player.trigger(y.MEDIA_WAITING, i, !0)
                    }
                }
            }]), e
        }(d["default"]);
    e["default"] = V
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function s(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = i(112),
        l = n(a),
        u = function(t) {
            function e(i) {
                r(this, e);
                var n = function(t) {
                        s.player.setVolume(t), s.vertical || s.tooltip.show({
                            el: s.el,
                            text: Math.round(100 * t) + "%",
                            offsetXpercent: t,
                            offsetY: 16
                        })
                    },
                    s = o(this, t.call(this, i, {
                        dragStart: n,
                        drag: n,
                        dragEnd: function(t) {
                            s.tooltip.hide()
                        }
                    }));
                return addClass(s.el, "videoplayer_volume_slider"), s.initAria({
                    label: s.getLang("aria_volume_slider"),
                    valuemin: 0,
                    valuemax: 100,
                    valuetext: function(t, e, i) {
                        var n = Math.round(100 * s.player.getVolume()) + "%";
                        return s.player.isMuted() && (n += " (" + s.getLang("aria_volume_muted") + ")"), n
                    }
                }), s
            }
            return s(e, t), e
        }(l["default"]);
    e["default"] = u
}, function(t, e) {
    t.exports = function(t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t
    }
}, function(t, e) {
    t.exports = function(t) {
        try {
            return !!t()
        } catch (e) {
            return !0
        }
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(112),
        u = r(l),
        h = i(59),
        d = n(h),
        c = function(t) {
            function e(i, n, r) {
                o(this, e);
                var a = void 0,
                    l = s(this, t.call(this, i, {
                        mousemove: function(t) {
                            l.showPreviewAt(t)
                        },
                        mouseout: function(t) {
                            l.preview.hide(), l.tooltip.hide()
                        },
                        dragStart: function(t, e) {
                            l.player.trigger(d.UI_SEEKSTART), e || l.player.seekToPercent(t), l.showPreviewAt(t), a = t
                        },
                        drag: function(t) {
                            var e = t * l.player.getDuration();
                            l.controls.updateTime(e), l.showPreviewAt(t)
                        },
                        dragEnd: function(t) {
                            l.player.trigger(d.UI_SEEKEND), t != a ? l.player.seekToPercent(t) : l.controls.updateTime(l.player.curTime()), l.preview.hide(), l.tooltip.hide()
                        }
                    }));
                return l.controls = n, l.preview = r, addClass(l.el, "videoplayer_timeline_slider"), l.updateAria(), l
            }
            return a(e, t), e.prototype.updateAria = function() {
                var t = this;
                this.initAria({
                    label: this.getLang("aria_timeline_slider"),
                    valuemin: 0,
                    valuemax: this.player.getDuration(),
                    valuetext: function(e, i, n) {
                        return t.getLang("aria_timeline_value", {
                            time: formatTime(e, !0),
                            duration: formatTime(n, !0)
                        })
                    }
                })
            }, e.prototype.showPreviewAt = function(t) {
                if (this.player.isInited()) {
                    var e = formatTime(this.player.getDuration() * t);
                    this.getVar("timeline_thumbs") ? this.preview.show({
                        sliderEl: this.el,
                        progress: t,
                        text: e
                    }) : this.tooltip.show({
                        el: this.el,
                        text: e,
                        offsetXpercent: t,
                        offsetY: 16
                    })
                }
            }, e.prototype.disable = function() {
                t.prototype.disable.call(this), this.preview.hide()
            }, e
        }(u["default"]);
    e["default"] = c
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(59),
        d = n(h),
        c = i(60),
        p = n(c),
        f = i(86),
        y = n(f),
        v = i(90),
        g = n(v),
        _ = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_timed_buttons_conatainer"
                }), n.playerListen(d.MEDIA_TIMEUPDATE, n.onTimeupdate), n.playerListen(d.STATE_CHANGE, n.onStatChange), n
            }
            return a(e, t), e.prototype.initVideo = function(t) {
                var e = this.player.getVideoId();
                "-107437894_456239018" === e ? this._timings = [{
                    timeShow: .5,
                    timeHide: 5,
                    type: "link",
                    text: "learn_more",
                    url: "http://etoday.ru/2017/02/arizona-m-yuz-v-reklamnoy-kamp-2.php"
                }, {
                    timeShow: 6.5,
                    timeHide: 11,
                    type: "link",
                    text: "learn_more",
                    url: "http://etoday.ru/2017/02/fotografii-dzhona-vil-gel-ma.php"
                }, {
                    timeShow: 12.5,
                    timeHide: 17,
                    type: "link",
                    text: "learn_more",
                    url: "http://etoday.ru/2017/02/reklamnaya-victorias-secret-ko.php"
                }, {
                    timeShow: 18.5,
                    timeHide: 23,
                    type: "link",
                    text: "learn_more",
                    url: "http://etoday.ru/2017/01/nedelya-mody-v-parizhe-yohji-y.php"
                }, {
                    timeShow: 24.5,
                    timeHide: 29,
                    type: "link",
                    text: "learn_more",
                    url: "http://etoday.ru/2017/02/kollekciya-marc-jacobs-osen--z.php"
                }] : "-132124064_456239166" === e && (this._timings = [{
                    timeShow: 0,
                    timeHide: 134,
                    type: "link",
                    text: "checkin",
                    url: "https://vk.cc/6Nnalx"
                }])
            }, e.prototype.deinitVideo = function() {
                this._timings = null, this.hideButton()
            }, e.prototype.onTimeupdate = function(t) {
                if (this._timings) {
                    if (null != this._curIndex) {
                        var e = this._timings[this._curIndex];
                        if (e.timeShow <= t && t <= e.timeHide) return;
                        this.hideButton()
                    }
                    for (var i = 0; i < this._timings.length; ++i) {
                        var n = this._timings[i];
                        if (n.timeShow <= t && t <= n.timeHide) {
                            this.showButton(i, n);
                            break
                        }
                    }
                }
            }, e.prototype.onStatChange = function(t, e) {
                (t === p.ENDED || t === p.ERROR) && this.hideButton()
            }, e.prototype.showButton = function(t, e) {
                var i = this;
                this.hideButton(), this._curIndex = t;
                var n = this.getLang("timed_button_" + e.text);
                "link" === e.type && (n = y.gotoLink("_link_icon") + n), this._curButton = ce("a", {
                    className: "videoplayer_timed_button hidden",
                    innerHTML: n,
                    href: "/away.php?to=" + encodeURIComponent(e.url),
                    target: "_blank"
                }), this.domListen(this._curButton, "click", function(t) {
                    g.safeOpenLink(t.currentTarget.href), i.player.pause(), t.preventDefault(), t.stopPropagation()
                }), this.el.appendChild(this._curButton), this._curButton.offsetHeight, removeClass(this._curButton, "hidden")
            }, e.prototype.hideButton = function() {
                if (null != this._curIndex) {
                    var t = this._curButton;
                    this._curButton = this._curIndex = null, addClass(t, "hidden"), setTimeout(function() {
                        return re(t)
                    }, 150)
                }
            }, e
        }(u["default"]);
    e["default"] = _
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e, i, n, r) {
        var o = -1;
        return each(t, function(t, s) {
            return s.elem === e && s.type === i && s.handler === n && s.useCapture === r ? (o = t, !1) : void 0
        }), o
    }

    function a(t, e) {
        var i = t[e];
        i && (i.elem.removeEventListener(i.type, i.realHandler, i.useCapture), t.splice(e, 1))
    }

    function l(t, e, i) {
        var n = -1;
        return each(t, function(t, r) {
            return r.type === e && r.handler === i ? (n = t, !1) : void 0
        }), n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        h = i(59),
        d = r(h),
        c = i(36),
        p = n(c),
        f = function() {
            function t(e) {
                var i = this;
                o(this, t), this._componentPlayerListeners = [], this._componentDomListeners = [], this._componentTimeouts = [], this._componentRequests = [], this.player = e, this.playerListen(d._INIT_VIDEO, function() {
                    i.initVideo && i.initVideo.apply(i, arguments)
                }), this.playerListen(d._DEINIT_VIDEO, function() {
                    i.deinitVideo && i.deinitVideo()
                }), this.playerListen(d._RESIZE, function() {
                    i.resize && i.resize.apply(i, arguments)
                }), this.playerListen(d._DESTROY, this.destroy)
            }
            return t.prototype.domListen = function(t, e, i) {
                var n = this,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    o = r.useCapture,
                    a = r.context,
                    l = r.once;
                if (!(s(this._componentDomListeners, t, e, i, o) > -1)) {
                    isString(t) && (t = domByClass(this.el, t));
                    var u = l ? function(r) {
                        return n.domUnlisten(t, e, i, {
                            useCapture: o
                        }), i.call(a || n, r)
                    } : i.bind(a || this);
                    t.addEventListener(e, u, o), this._componentDomListeners.push({
                        elem: t,
                        type: e,
                        handler: i,
                        useCapture: o,
                        realHandler: u
                    })
                }
            }, t.prototype.domListenOnce = function(t, e, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return n.once = !0, this.domListen(t, e, i, n)
            }, t.prototype.domUnlisten = function(t, e, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    r = n.useCapture;
                if (i && e) {
                    var o = s(this._componentDomListeners, t, e, i, r);
                    a(this._componentDomListeners, o)
                } else
                    for (var l = 0; this._componentDomListeners[l];) {
                        var u = this._componentDomListeners[l];
                        t !== u.elem || e && e !== u.type ? l++ : a(this._componentDomListeners, l)
                    }
            }, t.prototype.domUnlistenAll = function() {
                for (var t; t = this._componentDomListeners[0];) this.domUnlisten(t.elem, t.type, t.handler, {
                    useCapture: t.useCapture
                })
            }, t.prototype.attachTooltip = function(t) {
                var e = this;
                isString(t.el) && (t.el = domByClass(this.el, t.el));
                var i = void 0;
                this.domListen(t.el, "mouseenter", function() {
                    e.tooltip.isVisible() || Date.now() - e.tooltip.lastShown < 100 ? e.tooltip.show(t) : i = setTimeout(function() {
                        return e.tooltip.show(t)
                    }, 1e3)
                }), this.domListen(t.el, "mouseleave", function(n) {
                    clearTimeout(i), t.hideDelay ? e.tooltip.hideWithDelay(t.hideDelay) : e.tooltip.hide()
                }), this.domListen(t.el, "click", function(n) {
                    clearTimeout(i), t.hideOnClick ? e.tooltip.hide() : setTimeout(function() {
                        return e.tooltip.show(t)
                    }, 0)
                })
            }, t.prototype.playerListen = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this,
                    n = e.bind(i);
                this.player.on(t, n), this._componentPlayerListeners.push({
                    type: t,
                    handler: e,
                    realHandler: n
                })
            }, t.prototype.playerUnlisten = function(t, e) {
                var i = l(this._componentPlayerListeners, t, e);
                if (!(0 > i)) {
                    var n = this._componentPlayerListeners[i];
                    this.player.off(t, n.realHandler), this._componentPlayerListeners.splice(i, 1)
                }
            }, t.prototype.playerUnlistenAll = function() {
                for (var t; t = this._componentPlayerListeners[0];) this.playerUnlisten(t.type, t.handler)
            }, t.prototype.getLang = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    n = this.player.langVars[t];
                return n ? (i.sex && (n = langSex(i.sex, n)), e && each(e, function(t, e) {
                    n = n.replace(new RegExp("{" + t + "}", "g"), e)
                }), n) : ""
            }, t.prototype.getVars = function() {
                return this.player.vars || {}
            }, t.prototype.getVar = function(t) {
                return this.getVars()[t]
            }, t.prototype.delay = function(t, e) {
                for (var i = arguments.length, n = Array(i > 2 ? i - 2 : 0), r = 2; i > r; r++) n[r - 2] = arguments[r];
                var o = this,
                    s = setTimeout(function() {
                        t.apply(o, n)
                    }, e);
                return this._componentTimeouts.push(s), s
            }, t.prototype.undelay = function(t) {
                if (t) {
                    clearTimeout(t);
                    var e = this._componentTimeouts.indexOf(t);
                    e >= 0 && this._componentTimeouts.splice(e, 1)
                }
            }, t.prototype.request = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0,
                    n = (0, p["default"])(t, e);
                return i && this._componentRequests.push(n), n
            }, t.prototype.clearComponentTimeouts = function() {
                each(this._componentTimeouts, function(t, e) {
                    clearTimeout(e)
                }), this._componentTimeouts = []
            }, t.prototype.abortAllRequests = function() {
                each(this._componentRequests, function(t, e) {
                    e.abort()
                }), this._componentRequests = []
            }, t.prototype.destroy = function() {
                this.playerUnlistenAll(), this.domUnlistenAll(), this.clearComponentTimeouts(), this.abortAllRequests()
            }, u(t, [{
                key: "tooltip",
                get: function() {
                    return this.player.ui.playerTooltip
                }
            }]), t
        }();
    e["default"] = f
}, function(t, e, i) {
    var n = i(57),
        r = i(78)("iterator"),
        o = i(71);
    t.exports = i(8).getIteratorMethod = function(t) {
        return void 0 != t ? t[r] || t["@@iterator"] || o[n(t)] : void 0
    }
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        fromString: function(t) {
            var e = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/,
                i = "string" == typeof t ? t.match(e) : null;
            return i ? (3600 * i[1] || 0) + (60 * i[2] || 0) + (+i[3] || 0) : 0
        },
        toString: function(t) {
            var e = "";
            return t >= 3600 && (e += Math.floor(t / 3600) + "h", t %= 3600), t >= 60 && (e += Math.floor(t / 60) + "m", t %= 60), t > 0 && (e += Math.floor(t) + "s"), e
        }
    }
}, function(t, e, i) {
    "use strict";
    var n = i(113),
        r = i(12),
        o = i(3),
        s = i(23),
        a = i(92),
        l = i(71),
        u = i(41),
        h = i(31),
        d = i(11),
        c = i(78)("iterator"),
        p = !([].keys && "next" in [].keys()),
        f = "@@iterator",
        y = "keys",
        v = "values",
        g = function() {
            return this
        };
    t.exports = function(t, e, i, _, m, b, E) {
        u(i, e, _);
        var S, L, w, A = function(t) {
                if (!p && t in P) return P[t];
                switch (t) {
                    case y:
                        return function() {
                            return new i(this, t)
                        };
                    case v:
                        return function() {
                            return new i(this, t)
                        }
                }
                return function() {
                    return new i(this, t)
                }
            },
            T = e + " Iterator",
            k = m == v,
            C = !1,
            P = t.prototype,
            I = P[c] || P[f] || m && P[m],
            D = I || A(m),
            x = m ? k ? A("entries") : D : void 0,
            M = "Array" == e ? P.entries || I : I;
        if (M && (w = d(M.call(new t)), w !== Object.prototype && (h(w, T, !0), n || a(w, c) || s(w, c, g))), k && I && I.name !== v && (C = !0, D = function() {
                return I.call(this)
            }), n && !E || !p && !C && P[c] || s(P, c, D), l[e] = D, l[T] = g, m)
            if (S = {
                    values: k ? D : A(v),
                    keys: b ? D : A(y),
                    entries: x
                }, E)
                for (L in S) L in P || o(P, L, S[L]);
            else r(r.P + r.F * (p || C), e, S);
        return S
    }
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.INLINE = 1, e.END_SMALL = 2, e.END_LARGE = 3
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        set: function(t, e) {
            try {
                localStorage.setItem(t, JSON.stringify(e))
            } catch (i) {}
        },
        get: function(t) {
            try {
                return JSON.parse(localStorage.getItem(t))
            } catch (e) {
                return null
            }
        },
        getByPrefix: function(t) {
            var e = t.length,
                i = {};
            try {
                for (var n = 0, r = localStorage.length; r > n; ++n) {
                    var o = localStorage.key(n);
                    o.substr(0, e) == t && (i[o] = this.get(o))
                }
            } catch (s) {}
            return i
        },
        remove: function(t) {
            try {
                localStorage.removeItem(t)
            } catch (e) {}
        }
    }
}, function(t, e, i) {
    var n = i(61),
        r = i(78)("toStringTag"),
        o = "Arguments" == n(function() {
            return arguments
        }()),
        s = function(t, e) {
            try {
                return t[e]
            } catch (i) {}
        };
    t.exports = function(t) {
        var e, i, a;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(i = s(e = Object(t), r)) ? i : o ? n(e) : "Object" == (a = n(e)) && "function" == typeof e.callee ? "Arguments" : a
    }
}, function(t, e, i) {
    var n = i(26),
        r = i(44),
        o = i(5);
    t.exports = function(t) {
        var e = n(t),
            i = r.f;
        if (i)
            for (var s, a = i(t), l = o.f, u = 0; a.length > u;) l.call(t, s = a[u++]) && e.push(s);
        return e
    }
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e._INIT_VIDEO = "_initVideo", e._DEINIT_VIDEO = "_deinitVideo", e._RESIZE = "_resize", e._DESTROY = "_destroy", e.STATE_CHANGE = "stateChange", e.QUALITIES_LIST_CHANGE = "qualitiesListChange", e.QUALITY_CHANGE = "qualityChange", e.FULLSCREEN_CHANGE = "fullscreenChange", e.SEEK = "seek", e.EXPANDED = "expanded", e.NEXT_TIMER_RESET = "nextTimerReset", e.NEXT_TIMER_START = "nextTimerStart", e.VIDEO_LIKE = "videoLike", e.VIDEO_SHARE = "videoShare", e.VIDEO_ADD = "videoAdd", e.SUBSCRIBED = "subscribed", e.LIVE_PHASE_CHANGE = "livePhaseChange", e.LIVE_DONATION = "liveDonation", e.MEDIA_TIMEUPDATE = "media.timeupdate", e.MEDIA_PROGRESS = "media.progress", e.MEDIA_VOLUMECHANGE = "media.volumechange", e.MEDIA_DURATIONCHANGE = "media.durationchange", e.MEDIA_WAITING = "media.waiting", e.MEDIA_PLAYING = "media.playing", e.MEDIA_PAUSE = "media.pause", e.MEDIA_ENDED = "media.ended", e.MEDIA_ERROR = "media.error", e.MEDIA_SEEKING = "media.seeking", e.MEDIA_SEEKED = "media.seeked", e.MEDIA_PROVIDER_CHANGE = "media.providerChange", e.MEDIA_LIVE_WARNING = "media.liveWarning", e.MEDIA_HLS_LEVEL_LOADED = "media.hlsLevelLoaded", e.MEDIA_HLS_FRAG_LOADED = "media.hlsFragLoaded", e.UI_SEEKSTART = "ui.seekstart", e.UI_SEEKEND = "ui.seekend", e.UI_CONTROLS_HIDE = "ui.controlsHide", e.UI_CONTROLS_SHOW = "ui.controlsShow", e.ADS_WAITING = "ads.waiting", e.ADS_TIME_REMAINED = "ads.timeRemained", e.ADS_LINEAR_STARTED = "ads.linearStarted", e.ADS_LINEAR_COMPLETED = "ads.linearCompleted", e.ADS_OVERLAY_STARTED = "ads.overlayStarted", e.ADS_OVERLAY_COMPLETED = "ads.overlayCompleted"
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.EMPTY = "empty", e.UNSTARTED = "unstarted", e.PLAYING = "playing", e.PAUSED = "paused", e.ENDED = "ended", e.ERROR = "error"
}, function(t, e) {
    var i = {}.toString;
    t.exports = function(t) {
        return i.call(t).slice(8, -1)
    }
}, function(t, e, i) {
    var n = i(75),
        r = i(85).document,
        o = n(r) && n(r.createElement);
    t.exports = function(t) {
        return o ? r.createElement(t) : {}
    }
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.WAITING = 1, e.STARTED = 2, e.ENDED = 3, e.FAILED = 4, e.UPCOMING = 5
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function() {
            function t(t, e) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        u = i(90),
        h = r(u),
        d = i(59),
        c = r(d),
        p = i(60),
        f = r(p),
        y = i(86),
        v = r(y),
        g = i(51),
        _ = n(g),
        m = 5e3,
        b = 3,
        E = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_donations_layer"
                }), n._currentItems = [], n._queuedItems = [], n._supportsTransitions = "transition" == h.getCssProp("transition"), n.resize.apply(n, i.getSize()), n.playerListen(c.LIVE_DONATION, n.pushDonation), n.playerListen(c.STATE_CHANGE, n.onStateChange), n
            }
            return a(e, t), e.prototype.pushDonation = function(t, e) {
                if (!this._hidden) {
                    var i = void 0;
                    switch (t) {
                        case "gift":
                            i = this.giftTpl(e);
                            break;
                        case "comment":
                            if (!e.commentText) return;
                            i = this.commentTpl(e)
                    }
                    if (i) {
                        var n = {
                            el: se(i),
                            type: t,
                            senderId: e.senderId,
                            giftId: e.giftId,
                            count: 1,
                            inserted: !1
                        };
                        this.queueItem(n)
                    }
                }
            }, e.prototype.queueItem = function(t) {
                var e = this;
                if ("gift" == t.type) {
                    var i = this.findSenderGift(t.senderId, t.giftId);
                    if (i) return void this.increaseGiftCount(i)
                }
                if (this._currentItems.length >= b) return void this._queuedItems.push(t);
                if (this._currentItems.push(t), "gift" == t.type) {
                    var n = new Image;
                    n.onload = function() {
                        return e.insertItem(t)
                    }, n.src = this.giftImgSrc(t.giftId)
                } else this.insertItem(t)
            }, e.prototype.insertItem = function(t) {
                var e = this;
                t.timeout = this.delay(function() {
                    return e.removeItem(t)
                }, m), t.inserted = !0, this.el.insertBefore(t.el, domFC(this.el)), this._supportsTransitions && (setStyle(t.el, {
                    transition: "none",
                    opacity: 0,
                    marginTop: -t.el.offsetHeight + "px",
                    marginBottom: 0
                }), t.el.offsetHeight, setStyle(t.el, {
                    transition: "",
                    opacity: "",
                    marginTop: "",
                    marginBottom: ""
                }))
            }, e.prototype.checkQueue = function() {
                for (; this._currentItems.length < b && this._queuedItems.length;) {
                    var t = this._queuedItems.shift();
                    this.queueItem(t)
                }
            }, e.prototype.findSenderGift = function(t, e) {
                var i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var o, s = this._currentItems[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                        var a = o.value;
                        if (a.senderId === t && a.giftId === e && a.count < 9) return a
                    }
                } catch (l) {
                    n = !0, r = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (n) throw r
                    }
                }
            }, e.prototype.increaseGiftCount = function(t) {
                var e = this;
                t.count += 1;
                var i = domByClass(t.el, "_gift_count");
                val(i, v.giftCount(t.count, "_gift_count_icon")), t.inserted && (this._supportsTransitions && !this._hidden && (setStyle(i, {
                    transform: "scale(1.5)"
                }), this.domListenOnce(i, "transitionend", function() {
                    setStyle(i, {
                        transform: ""
                    })
                })), this.undelay(t.timeout), t.timeout = this.delay(function() {
                    return e.removeItem(t)
                }, m))
            }, e.prototype.removeItem = function(t) {
                var e = indexOf(this._currentItems, t),
                    i = this.getItemVerticalMargin(e),
                    n = Math.max(i, this.getItemVerticalMargin(e - 1)),
                    r = Math.max(i, this.getItemVerticalMargin(e + 1));
                this._currentItems.splice(e, 1), this._supportsTransitions && !this._hidden ? (setStyle(t.el, {
                    opacity: 0,
                    marginTop: n + "px",
                    marginBottom: -(t.el.offsetHeight + Math.max(n, r)) + "px",
                    marginLeft: "-150%"
                }), this.domListenOnce(t.el, "transitionend", function() {
                    return re(t.el)
                })) : re(t.el), this.checkQueue()
            }, e.prototype.getItemVerticalMargin = function(t) {
                var e = this._currentItems[t];
                if (e) {
                    if ("gift" == e.type) return 32;
                    if ("comment" === e.type) return 15
                }
                return 0
            }, e.prototype.donationTpl = function(t, e, i, n) {
                return '\n<div class="videoplayer_donation videoplayer_donation_' + t + '">\n  <div class="_sender_info_wrap">\n    <img class="_sender_photo" src="' + e.senderPhoto + '"/>\n    <div class="_sender_name">' + e.senderName + '</div>\n    <div class="_sender_event">' + i + "</div>\n  </div>\n  " + n + "\n</div>\n    "
            }, e.prototype.commentTpl = function(t) {
                var e = this.getLang("live_user_sent_supercomment", !1, {
                        sex: t.senderSex
                    }) + v.superComment("_comment_icon"),
                    i = '<div class="_comment_text">' + t.commentText + "</div>";
                return this.donationTpl("comment", t, e, i)
            }, e.prototype.giftTpl = function(t) {
                var e = this.getLang("live_user_sent_gift", !1, {
                        sex: t.senderSex
                    }),
                    i = this.giftImgSrc(t.giftId),
                    n = '<img class="_gift_img" src="' + i + '"/><div class="_gift_count"></div>';
                return this.donationTpl("gift", t, e, n)
            }, e.prototype.giftImgSrc = function(t) {
                var e = isRetina() ? 256 : 96;
                return "/images/gift/" + t + "/" + e + ".png"
            }, e.prototype.updateVisibility = function() {
                var t = this.player.getSize(),
                    e = l(t, 2),
                    i = e[0],
                    n = e[1],
                    r = this.player.getState();
                this._hidden = 640 > i || 360 > n || r !== f.PLAYING && r !== f.PAUSED, toggle(this.el, !this._hidden)
            }, e.prototype.resize = function() {
                this.updateVisibility()
            }, e.prototype.onStateChange = function() {
                this.updateVisibility()
            }, e.prototype.destroy = function() {
                var e = this;
                t.prototype.destroy.call(this), each(this._currentItems, function(t, i) {
                    return e.undelay(i.timeout)
                }), this._currentItems = null, this._queuedItems = null, re(this.el)
            }, e
        }(_["default"]);
    e["default"] = E
}, function(t, e, i) {
    "use strict";
    var n = i(85),
        r = i(8),
        o = i(92),
        s = i(29),
        a = i(12),
        l = i(3),
        u = i(25).KEY,
        h = i(48),
        d = i(39),
        c = i(31),
        p = i(104),
        f = i(78),
        y = i(34),
        v = i(58),
        g = i(97),
        _ = i(1),
        m = i(22),
        b = i(13),
        E = i(18),
        S = i(107),
        L = i(89),
        w = i(93),
        A = i(73),
        T = w.f,
        k = A.f,
        C = L.f,
        P = n.Symbol,
        I = n.JSON,
        D = I && I.stringify,
        x = !1,
        M = "prototype",
        O = f("_hidden"),
        R = f("toPrimitive"),
        V = {}.propertyIsEnumerable,
        N = d("symbol-registry"),
        F = d("symbols"),
        j = Object[M],
        B = "function" == typeof P,
        H = n.QObject,
        U = s && h(function() {
            return 7 != S(k({}, "a", {
                get: function() {
                    return k(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function(t, e, i) {
            var n = T(j, e);
            n && delete j[e], k(t, e, i), n && t !== j && k(j, e, n)
        } : k,
        q = function(t) {
            var e = F[t] = S(P[M]);
            return e._k = t, s && x && U(j, t, {
                configurable: !0,
                set: function(e) {
                    o(this, O) && o(this[O], t) && (this[O][t] = !1), U(this, t, E(1, e))
                }
            }), e
        },
        G = B && "symbol" == typeof P.iterator ? function(t) {
            return "symbol" == typeof t
        } : function(t) {
            return t instanceof P
        },
        z = function(t, e, i) {
            return _(t), e = b(e, !0), _(i), o(F, e) ? (i.enumerable ? (o(t, O) && t[O][e] && (t[O][e] = !1), i = S(i, {
                enumerable: E(0, !1)
            })) : (o(t, O) || k(t, O, E(1, {})), t[O][e] = !0), U(t, e, i)) : k(t, e, i)
        },
        Q = function(t, e) {
            _(t);
            for (var i, n = v(e = m(e)), r = 0, o = n.length; o > r;) z(t, i = n[r++], e[i]);
            return t
        },
        W = function(t, e) {
            return void 0 === e ? S(t) : Q(S(t), e)
        },
        Y = function(t) {
            var e = V.call(this, t = b(t, !0));
            return e || !o(this, t) || !o(F, t) || o(this, O) && this[O][t] ? e : !0
        },
        K = function(t, e) {
            var i = T(t = m(t), e = b(e, !0));
            return !i || !o(F, e) || o(t, O) && t[O][e] || (i.enumerable = !0), i
        },
        X = function(t) {
            for (var e, i = C(m(t)), n = [], r = 0; i.length > r;) o(F, e = i[r++]) || e == O || e == u || n.push(e);
            return n
        },
        J = function(t) {
            for (var e, i = C(m(t)), n = [], r = 0; i.length > r;) o(F, e = i[r++]) && n.push(F[e]);
            return n
        },
        $ = function(t) {
            if (void 0 !== t && !G(t)) {
                for (var e, i, n = [t], r = 1; arguments.length > r;) n.push(arguments[r++]);
                return e = n[1], "function" == typeof e && (i = e), (i || !g(e)) && (e = function(t, e) {
                    return i && (e = i.call(this, t, e)), G(e) ? void 0 : e
                }), n[1] = e, D.apply(I, n)
            }
        },
        Z = h(function() {
            var t = P();
            return "[null]" != D([t]) || "{}" != D({
                a: t
            }) || "{}" != D(Object(t))
        });
    B || (P = function() {
        if (this instanceof P) throw TypeError("Symbol is not a constructor!");
        return q(p(arguments.length > 0 ? arguments[0] : void 0))
    }, l(P[M], "toString", function() {
        return this._k
    }), w.f = K, A.f = z, i(98).f = L.f = X, i(5).f = Y, i(44).f = J, s && !i(113) && l(j, "propertyIsEnumerable", Y, !0)), a(a.G + a.W + a.F * !B, {
        Symbol: P
    });
    for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et;) {
        var it = tt[et++],
            nt = r.Symbol,
            rt = f(it);
        it in nt || k(nt, it, {
            value: B ? rt : q(rt)
        })
    }
    H && H[M] && H[M].findChild || (x = !0), a(a.S + a.F * !B, "Symbol", {
        "for": function(t) {
            return o(N, t += "") ? N[t] : N[t] = P(t)
        },
        keyFor: function(t) {
            if (G(t)) return y(N, t);
            throw TypeError(t + " is not a symbol!")
        },
        useSetter: function() {
            x = !0
        },
        useSimple: function() {
            x = !1
        }
    }), a(a.S + a.F * !B, "Object", {
        create: W,
        defineProperty: z,
        defineProperties: Q,
        getOwnPropertyDescriptor: K,
        getOwnPropertyNames: X,
        getOwnPropertySymbols: J
    }), I && a(a.S + a.F * (!B || Z), "JSON", {
        stringify: $
    }), P[M][R] || i(23)(P[M], R, P[M].valueOf), c(P, "Symbol"), c(Math, "Math", !0), c(n.JSON, "JSON", !0)
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = {
        get supported() {
            return !!document.queryCommandSupported && document.queryCommandSupported("copy")
        },
        copy: function(t) {
            var e = !1,
                i = ce("textarea", {
                    value: t
                }, {
                    position: "absolute",
                    top: 0,
                    zIndex: 2
                });
            utilsNode.appendChild(i), browser.msie ? i.setSelectionRange(0, t.length) : i.select();
            try {
                e = document.execCommand("copy")
            } catch (n) {
                e = !1
            }
            return re(i), e
        }
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(90),
        d = n(h),
        c = i(59),
        p = n(c),
        f = i(60),
        y = n(f),
        v = i(63),
        g = n(v),
        _ = i(56),
        m = r(_),
        b = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.playerListen(p.MEDIA_TIMEUPDATE, n.onMediaTimeupdate), n.playerListen(p.MEDIA_PLAYING, n.onMediaPlaying), n.playerListen(p.MEDIA_WAITING, n.onMediaWaiting), n.playerListen(p.MEDIA_SEEKING, n.onMediaSeeking), n.playerListen(p.MEDIA_SEEKED, n.onMediaSeeked), n.playerListen(p.MEDIA_ENDED, n.onMediaEnded), n.playerListen(p.MEDIA_VOLUMECHANGE, n.onMediaVolumeChange), n.playerListen(p.MEDIA_HLS_LEVEL_LOADED, n.onMediaHlsLevelLoaded), n.playerListen(p.MEDIA_HLS_FRAG_LOADED, n.onMediaHlsFragLoaded), n.playerListen(p.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(p.QUALITY_CHANGE, n.onQualityChange), n.playerListen(p.STATE_CHANGE, n.onStateChange), n.playerListen(p.ADS_LINEAR_STARTED, n.onLinearAdStarted), n.playerListen(p.ADS_LINEAR_COMPLETED, n.onLinearAdCompleted), window.ns_ || n.loadComScoreLib(), n
            }
            return a(e, t), e.prototype.initVideo = function(t) {
                this.initTime = Date.now(), this.viewCounterIncremented = !1, this.lastPlayProgressSent = 0, this.needViewSegments = !(!t.vsegs_size || !t.vsegs_hash), this.playFinishedSent = !1, this.requestedPlay = 0, this.startedPlay = 0, this.startQuality = 0, this.pausedBeforeStart = !1, this.stallsCount = 0, this.seekDurations = [], this.hlsFirstLevelLoadTime = 0, this.hlsFirstFragLoadTime = 0, this.collectWatchStat = !0, this.maxTimePosition = 0, this.lastVolume = this.player.isMuted() ? 0 : this.player.getVolume(), this.liveHeartbeatEventsQueue = [], this.ownerId = t.oid, this.videoId = t.vid, this.initViewSegments(t), this.flushWatchData(), this.flushCandyData(), this.initComScoreLib()
            }, e.prototype.deinitVideo = function() {
                this.comScoreTag && (this.comScoreTag.stop(), this.comScoreTag = null), this._bigTvTimeout && (clearTimeout(this._bigTvTimeout), this._bigTvTimeout = null), this._bigTvOlimpicTimeout && (clearTimeout(this._bigTvOlimpicTimeout), this._bigTvOlimpicTimeout = null), this.flushWatchData(), this.flushCandyData()
            }, e.prototype.initViewSegments = function(t) {
                this.curSegments = t.vsegs ? t.vsegs.split("|").pop() : ""
            }, e.prototype.loadComScoreLib = function() {
                var t = this;
                this._comScoreLoader = loadScript("/js/lib/streamsense.5.1.1.160316.min.js", {
                    onLoad: function() {
                        t._comsScoreLoader = null, t.initComScoreLib()
                    },
                    onError: function() {
                        t._comScoreLoader = null
                    }
                })
            }, e.prototype.initComScoreLib = function() {
                window.ns_ && this.player.isInited() && (this.comScoreMetaData = {
                    ns_st_ci: this.player.getVideoId(),
                    ns_st_cl: 1e3 * this.getVar("duration"),
                    c3: this.getVar("ads_comscore_c3") || "*null",
                    c4: "*null",
                    c6: "*null"
                }, this.comScoreTag = new window.ns_.StreamingTag({
                    customerC2: "13765216"
                }), this.player.getState() === y.PLAYING && (this.player.isPlayingLinearAd() ? this.comScoreTag.playVideoAdvertisement() : this.comScoreTag.playVideoContentPart(this.comScoreMetaData)))
            }, e.prototype.initBigTvStats = function() {
                var t = this,
                    e = this.getVar("stats_bigtv");
                if (e) {
                    var i = function n() {
                        var i = Math.floor(t.player.isActiveLive() ? Date.now() / 1e3 - t.getVar("date") : t.player.curTime()),
                            r = Math.floor(Date.now() / 1e3);
                        vkImage().src = e.replace("FTS", i).replace("VTS", r), t._bigTvTimeout = t.delay(n, 3e4)
                    };
                    i()
                }
            }, e.prototype.initBigTvOlimpicStats = function(t, e) {
                var i = this,
                    n = 24,
                    r = "mail_tv",
                    o = 1,
                    s = "mail_mail-hb30",
                    a = e,
                    l = Math.abs(t),
                    u = this.player.isActiveLive(),
                    h = u ? 1 : 2,
                    d = function c() {
                        var t = Math.floor(u ? Date.now() / 1e3 - i.getVar("date") : i.player.curTime()),
                            e = Math.floor(Date.now() / 1e3),
                            d = "https://www.tns-counter.ru/V13a**catid:" + n + ":vcid:" + a + ":vcver:" + l + ":fts:" + t + ":vts:" + e + ":evtp:" + h + ":dvtp:" + o + "**" + r + "/ru/UTF-8/tmsec=" + s + "/";
                        vkImage().src = d, i._bigTvOlimpicTimeout = i.delay(c, 3e4)
                    };
                d()
            }, e.prototype.saveWatchData = function() {
                this.collectWatchStat && this.requestedPlay && this.startedPlay && m["default"].set("video_last_watch_stat", {
                    video: this.player.getVideoId(),
                    hash: this.getVar("action_hash"),
                    started: this.startedPlay - this.requestedPlay,
                    played: this.player.getPlayedSeconds(),
                    played_ranges: this.player.getPlayedRangesString(),
                    start_quality: this.startQuality,
                    stalls_count: this.stallsCount,
                    seek_durations: this.seekDurations.join(";"),
                    first_level_loaded: this.hlsFirstLevelLoadTime,
                    first_frag_loaded: this.hlsFirstFragLoadTime,
                    is_hls: this.getVar("hls") ? 1 : 0,
                    is_autoplay: this.player.isFromAutoplay() ? 1 : 0,
                    is_touched: this.player.isTouchedByUser() ? 1 : 0,
                    is_active_live: this.getVar("live") && this.getVar("live") != g.ENDED ? 1 : 0,
                    last_pos: this.player.curTime(),
                    post_id: this.getVar("post_id"),
                    module: this.getVar("module"),
                    hls_candy: "hls" == this.player.getMediaProviderType() && this.getVar("hls_candy_server") ? 1 : 0
                })
            }, e.prototype.flushWatchData = function() {
                var t = m["default"].get("video_last_watch_stat");
                t && (ajax.post("al_video.php?act=watch_stat", t, {}), this.clearWatchData())
            }, e.prototype.clearWatchData = function() {
                m["default"].remove("video_last_watch_stat")
            }, e.prototype.flushCandyData = function() {
                var t = m["default"].get("video_live_candy_stat");
                t && (ajax.post("al_video.php?act=live_candy_stat", t, {}), m["default"].remove("video_live_candy_stat"))
            }, e.prototype.onMediaPlaying = function() {
                this.startedPlay || (this.startedPlay = Date.now(), this.getVar("hls") || (this.startQuality = this.player.getQuality()), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("play_started"), this.saveWatchData(), this.sendPlayStarted(), this.sendPladformStat(), this.sendAdPostStatEvent("video_start"), this.initBigTvStats(), -141682278 == this.ownerId && this.initBigTvOlimpicStats(this.ownerId, this.videoId))
            }, e.prototype.onMediaWaiting = function(t, e) {
                t && e && (this.stallsCount++, this.saveWatchData(), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("stall"))
            }, e.prototype.onMediaSeeking = function(t) {
                this.seekingStarted = Date.now()
            }, e.prototype.onMediaSeeked = function(t) {
                if (this.seekingStarted && !t) {
                    var e = Date.now() - this.seekingStarted;
                    this.seekDurations.push(e + "," + this.player.getQuality()), this.saveWatchData()
                }
            }, e.prototype.onMediaEnded = function() {
                this.playFinishedSent || (this.sendPlayFinished(), this.playFinishedSent = !0), this.saveWatchData()
            }, e.prototype.onMediaTimeupdate = function(t) {
                var e = this;
                if (this.viewCounterIncremented || this.player.isPlayingLinearAd() || (this.player.getPlayedSeconds() > 5 || this.player.getDuration() < 5) && (this.sendIncViewCounter(), this.viewCounterIncremented = !0), Date.now() - this.lastPlayProgressSent > 1e3 && (this.sendPlayProgress(t), this.lastPlayProgressSent = Date.now(), this.saveWatchData()), this.needViewSegments) {
                    var i = this.getViewSegments();
                    i != this.curSegments && (this.curSegments = i, this.sendViewSegments(i))
                }
                if (t > this.maxTimePosition) {
                    var n = this.player.getDuration() || 1,
                        r = this.maxTimePosition,
                        o = r / n * 100,
                        s = t / n * 100;
                    this.player.isLooped() && .5 > n - t && (s = 100), t >= 3 && 3 > r && this.sendAdPostStatEvent("video_play_3s"), each([25, 50, 75, 95, 100], function(t, i) {
                        s >= i && i > o && e.sendAdPostStatEvent("video_play_" + i)
                    }), this.maxTimePosition = t
                }
            }, e.prototype.onMediaVolumeChange = function(t) {
                this.player.isTouchedByUser() && (t ? t && !this.lastVolume && this.sendAdPostStatEvent("video_volume_on") : this.sendAdPostStatEvent("video_volume_off")), this.lastVolume = t
            }, e.prototype.onMediaHlsLevelLoaded = function(t) {
                var e = t.time,
                    i = t.quality,
                    n = t.url;
                this.hlsFirstLevelLoadTime || (this.hlsFirstLevelLoadTime = e, this.saveWatchData()), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("level_loaded", {
                    time: e,
                    quality: i,
                    url: n
                })
            }, e.prototype.onMediaHlsFragLoaded = function(t) {
                var e = t.time,
                    i = t.quality,
                    n = t.url;
                this.hlsFirstFragLoadTime || (this.hlsFirstFragLoadTime = e, this.startQuality = i, this.saveWatchData()), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("frag_loaded", {
                    time: e,
                    quality: i,
                    url: n
                })
            }, e.prototype.onLiveCandyStat = function(t) {
                var e = m["default"].get("video_live_candy_stat") || {
                    p2p_bytes: 0,
                    cdn_bytes: 0,
                    video: this.player.getVideoId(),
                    hash: this.getVar("action_hash")
                };
                e.p2p_bytes += t.p2pBytes, e.cdn_bytes += t.cdnBytes, m["default"].set("video_live_candy_stat", e)
            }, e.prototype.onStateChange = function(t, e) {
                this.comScoreTag && !this.player.isPlayingLinearAd() && (t === y.PLAYING ? this.comScoreTag.playVideoContentPart(this.comScoreMetaData) : e === y.PLAYING && this.comScoreTag.stop()), this.requestedPlay || t !== y.PLAYING || (this.requestedPlay = Date.now()), this.startedPlay || t != y.PAUSED || (this.collectWatchStat = !1, this.pausedBeforeStart = !0), this.player.isTouchedByUser() && (t === y.PAUSED && this.sendAdPostStatEvent("video_pause"), t === y.PLAYING && e === y.PAUSED && this.sendAdPostStatEvent("video_resume"))
            }, e.prototype.onQualityChange = function() {
                this.player.externalCall("onVideoResolutionChanged", this.getVar("oid"), this.getVar("vid"), this.getVar("action_hash"), this.player.getQualityIndex())
            }, e.prototype.onFullscreenChange = function(t) {
                this.sendAdPostStatEvent(t ? "video_fullscreen_on" : "video_fullscreen_off")
            }, e.prototype.onLinearAdStarted = function(t) {
                this.sendAdsPlayStarted(), this.comScoreTag && (this.player.getState() === y.PLAYING && this.comScoreTag.stop(), this.comScoreTag.playVideoAdvertisement()), "preroll" == t && (this.clearWatchData(), this.collectWatchStat = !1)
            }, e.prototype.onLinearAdCompleted = function() {
                this.sendAdsPlayFinished(), this.comScoreTag && (this.comScoreTag.stop(), this.player.getState() === y.PLAYING && this.comScoreTag.playVideoContentPart(this.comScoreMetaData))
            }, e.prototype.sendAdPostStatEvent = function(t) {
                this.getVar("post_id") && this.player.externalCall("onAdPostStat", this.getVar("post_id"), t)
            }, e.prototype.sendPladformStat = function() {
                var t = !!this.getVar("ads_eid1") && !this.player.isFromAutoplay() && 0 == vk.lang;
                if (this.getVar("pladform_views_stat_hash") && ajax.post("al_video.php?act=pladform_views_stat", {
                        owner_id: this.getVar("oid"),
                        video_id: this.getVar("vid"),
                        sent: intval(t),
                        autoplay: intval(this.player.isFromAutoplay()),
                        hash: this.getVar("pladform_views_stat_hash")
                    }), t) {
                    var e = this.getVar("ads_pl"),
                        i = this.getVar("ads_eid1"),
                        n = this.player.getVideoId();
                    vkImage().src = "//stat.pladform.ru/video/start?pl=" + e + "&videoid=" + i + "&vkvideoid=" + n
                }
            }, e.prototype.getViewSegments = function() {
                if (this.getVar("vsegs_size")) {
                    var t = this.player.getPlayedRanges(),
                        e = this.getVar("vsegs_size"),
                        i = Math.ceil(this.getVar("duration") / e),
                        n = d.fillArray(new Array(i), 0);
                    this.curSegments && this.unpackViewSegments(this.curSegments, n);
                    for (var r = 0; r < t.length; ++r)
                        for (var o = Math.round(t.start(r)), s = Math.round(t.end(r)), a = Math.floor(o / e), l = Math.floor(s / e), u = a; l >= u; ++u) {
                            var h = e * u,
                                c = Math.min(this.getVar("duration"), h + e);
                            n[u] += (Math.min(c, s) - Math.max(h, o)) / (c - h)
                        }
                    return this.packViewSegments(n)
                }
            }, e.prototype.packViewSegments = function(t) {
                for (var e = [], i = t[0] >= .5, n = 1, r = 1; r < t.length; ++r) {
                    var o = t[r] >= .5;
                    o == i ? ++n : (e.push(n), i = o, n = 1)
                }
                return i && e.push(n), e.length && t[0] < .5 && e.unshift(0), e.join(",")
            }, e.prototype.unpackViewSegments = function(t, e) {
                t = t.split(",");
                for (var i = 0, n = 0; i < t.length; ++i) {
                    var r = i % 2 == 0,
                        o = +t[i];
                    d.fillArray(e, r ? 1 : 0, n, n + o), n += o
                }
                return e
            }, e.prototype.sendIncViewCounter = function() {
                var t = this.getVars();
                this.player.externalCall("incViewCounter", t.oid, t.vid, t.view_hash, this.player.getQualityIndex(), t.hd, "html5")
            }, e.prototype.sendPlayProgress = function(t) {
                var e = this.getVars();
                this.player.externalCall("onVideoPlayProgress", e.oid, e.vid, e.view_hash, t, e.duration)
            }, e.prototype.sendPlayStarted = function() {
                var t = this.getVars(),
                    e = t.hls ? t.live ? "live_hls" : "hls" : t.live ? "live_mp4" : "mp4",
                    i = !!this.pausedBeforeStart;
                this.player.externalCall("onVideoPlayStarted", t.oid, t.vid, t.view_hash, e, i)
            }, e.prototype.sendPlayFinished = function() {
                this.player.externalCall("onVideoPlayFinished")
            }, e.prototype.sendAdsLoadStarted = function() {
                this.player.externalCall("onVideoAdsLoadStarted")
            }, e.prototype.sendAdsPlayStarted = function() {
                this.player.externalCall("onVideoAdsPlayStarted")
            }, e.prototype.sendAdsPlayFinished = function() {
                this.player.externalCall("onVideoAdsPlayFinished")
            }, e.prototype.sendAdsEvent = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                if (this.player.isInited()) {
                    var i = this.getVar("ads_stat_hash") || "",
                        n = this.getVar("pl_type") || "";
                    "postroll" == e && (t = "post-" + t);
                    var r = "preroll" == e || "postroll" == e ? "linear" : e;
                    this.player.externalCall("onVideoAdEvent", this.getVar("oid"), this.getVar("vid"), i, t, r, "", n)
                }
            }, e.prototype.sendAdShown = function(t, e) {
                if (this.player.isInited()) {
                    var i = t;
                    "preroll" == t ? i = "pre" : "postroll" == t && (i = "post"), this.player.externalCall("onVideoAdShown", this.getVar("oid"), this.getVar("vid"), i, e)
                }
            }, e.prototype.sendViewSegments = function(t) {
                var e = this.getVars();
                e.vsegs_hash && this.player.externalCall("onViewSegmentsChanged", e.oid, e.vid, t, e.vsegs_hash)
            }, e.prototype.addLiveHeartbeatStatsEvent = function(t, e) {
                var i = {
                    type: t,
                    details: e,
                    ts: Math.floor(Date.now() / 1e3),
                    view_time: (Date.now() - this.initTime) / 1e3
                };
                this.liveHeartbeatEventsQueue.push(i)
            }, e.prototype.getLiveHeartbeatEventsQueue = function() {
                var t = this.liveHeartbeatEventsQueue;
                return this.liveHeartbeatEventsQueue = [], t
            }, e.prototype.getLiveHeartbeatStats = function() {
                var t = {
                    init_ts: Math.floor(this.initTime / 1e3),
                    current_ts: Math.floor(Date.now() / 1e3),
                    view_time: (Date.now() - this.initTime) / 1e3,
                    events: this.getLiveHeartbeatEventsQueue()
                };
                if ("hls" === this.player.getMediaProviderType()) {
                    var e = this.player.getQuality();
                    e && (t.selected_quality = e, t.is_auto_quality = this.player.isAutoQualityEnabled(), t.available_qualities = this.player.getAvailableQualities()), t.upfront_buffer = this.getUpfrontBufferSeconds()
                }
                return "flash" === this.player.getMediaProviderType() && (t.rtmp = this.player.media.getContentUrl()), t
            }, e.prototype.getUpfrontBufferSeconds = function() {
                if ("flash" === this.player.getMediaProviderType()) return 0;
                var t = this.player.getBufferedRanges();
                return t.length ? t.end(t.length - 1) - this.player.curTime() : 0
            }, e
        }(u["default"]);
    e["default"] = b
}, function(t, e, i) {
    i(82);
    for (var n = i(85), r = i(23), o = i(71), s = i(78)("toStringTag"), a = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], l = 0; 5 > l; l++) {
        var u = a[l],
            h = n[u],
            d = h && h.prototype;
        d && !d[s] && r(d, s, u), o[u] = o.Array
    }
}, function(t, e) {}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        u = i(59),
        h = r(u),
        d = i(7),
        c = r(d),
        p = i(38),
        f = n(p),
        y = i(56),
        v = n(y),
        g = 5e3,
        _ = 5,
        m = 1,
        b = 2,
        E = 2e3,
        S = 1e3,
        L = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n._fragLoadedBytes = n._fragLoadingBytes = 0, n._fragsTracksFlags = [], n._fragLoopErrorCount = 0, n._curFragSeqNum = 0, n._errors = [], n._duration = 0, n.initHls(), n.initHlsLoadStat(), n.initFragLoadingStuckHandler(), n.initTracksChangeHandler(), n
            }
            return a(e, t), e.prototype.initListeners = function() {
                this.domListen(this.el, "error", this.onVideoError), this.domListen(this.el, "loadedmetadata", this.onDurationChange.bind(this, "meta")), this.domListen(this.el, "durationchange", this.onDurationChange.bind(this, "change"))
            }, e.prototype.initHls = function() {
                var t = {
                    autoStartLoad: !1,
                    capLevelToPlayerSize: !0,
                    debug: !!window.nav.objLoc.video_debug
                };
                this.getVar("hls_candy_server") && window.Candy ? this.hls = new window.Candy.hlsjsWrapper(Hls, t, {
                    server: this.getVar("hls_candy_server"),
                    videoId: this.player.getVideoId()
                }) : this.hls = new Hls(t), this.hls.attachMedia(this.el), this.hls.on(Hls.Events.MANIFEST_LOADED, this.onManifestLoaded.bind(this)), this.hls.on(Hls.Events.LEVEL_SWITCH, this.onLevelSwitch.bind(this)), this.hls.on(Hls.Events.ERROR, this.onHlsError.bind(this))
            }, e.prototype.initHlsLoadStat = function() {
                var t = this;
                this.hls.on(Hls.Events.LEVEL_LOADED, function(e, i) {
                    var n = Math.round(i.stats.tload - i.stats.trequest) / 1e3,
                        r = t.hls.levels[i.level],
                        o = c.qualityFromSize(r.width, r.height),
                        s = i.details.url.split("?")[0];
                    t.player.trigger(h.MEDIA_HLS_LEVEL_LOADED, {
                        time: n,
                        quality: o,
                        url: s
                    })
                }), this.hls.on(Hls.Events.FRAG_LOADED, function(e, i) {
                    var n = Math.round(i.stats.tload - i.stats.trequest) / 1e3,
                        r = t.hls.levels[i.frag.level],
                        o = c.qualityFromSize(r.width, r.height),
                        s = (i.networkDetails.responseURL || i.frag._url).split("?")[0];
                    t.player.trigger(h.MEDIA_HLS_FRAG_LOADED, {
                        time: n,
                        quality: o,
                        url: s
                    })
                })
            }, e.prototype.initFragLoadingStuckHandler = function() {
                var t = this;
                this.hls.on(Hls.Events.FRAG_LOAD_PROGRESS, function(e, i) {
                    t._fragLoadingBytes = i.frag.loaded, t.undelayRecoverNetwork(), t._ignoreFragLoadStuck || t.delayRecoverNetwork(g)
                }), this.hls.on(Hls.Events.FRAG_LOADED, function(e, i) {
                    t._fragLoadedBytes += i.frag.loaded, t._fragLoadingBytes = 0, t.undelayRecoverNetwork()
                })
            }, e.prototype.initTracksChangeHandler = function() {
                var t = this;
                this.hls.on(Hls.Events.FRAG_PARSING_DATA, function(e, i) {
                    t._fragsTracksFlags[i.frag.sn] || (t._fragsTracksFlags[i.frag.sn] = 0), "video" == i.type && (t._fragsTracksFlags[i.frag.sn] |= m), "audio" == i.type && (t._fragsTracksFlags[i.frag.sn] |= b)
                }), this.hls.on(Hls.Events.FRAG_CHANGED, function(e, i) {
                    t._fragsTracksFlags[t._curFragSeqNum] && t._fragsTracksFlags[i.frag.sn] && t._fragsTracksFlags[t._curFragSeqNum] != t._fragsTracksFlags[i.frag.sn] && (t.player.debugLog("switching to fragment with different tracks", {
                        force: !0
                    }), t.recoverMedia()), t._curFragSeqNum = i.frag.sn
                })
            }, e.prototype.onManifestLoaded = function(t, e) {
                var i = this.player.getAvailableQualities();
                if (this.player.trigger(h.QUALITIES_LIST_CHANGE, i), !this.manifestLoaded && i.length) {
                    this.manifestLoaded = !0;
                    var n = this.player.preferredQuality,
                        r = !!v["default"].get("video_abr_disabled") && !this.player.isFromAutoplay();
                    if (!r) {
                        var o = this.player.getPreloadedQuality(),
                            s = v["default"].get("video_abr_quality");
                        n = o || s || n, this.getVar("is_inline") && (n = Math.min(n, c.INLINE_INITIAL))
                    }
                    var a = Math.max.apply(Math, i);
                    n = Math.min(n, a);
                    var l = this.getLevelIndexForQuality(n);
                    this.hls.startLevel = l, r ? this.setCurrentLevel(l) : this.player.onQualityChanged(n), this.getVar("live") && this.hls.levels.length > 1 && this.capLiveLevels(), this.needLoad && this.load(), r || this.player.isActiveLive() || this.forceNextLevel(l)
                }
            }, e.prototype.onLevelSwitch = function(t, e) {
                var i = this.hls.levels[e.level],
                    n = c.qualityFromSize(i.width, i.height);
                this.player.onQualityChanged(n);
                var r = this.hls.autoLevelEnabled;
                if (r && this.hls.levels.length > 1 && n) {
                    var o = v["default"].get("video_abr_quality"),
                        s = Math.max.apply(Math, this.getAvailableQualities());
                    (s > n || n > o) && v["default"].set("video_abr_quality", n)
                }
            }, e.prototype.onVideoError = function(t) {
                var e = this.el.error;
                e.code === e.MEDIA_ERR_DECODE && (this.recoverMedia() || this.onFatalError())
            }, e.prototype.onHlsError = function(t, e) {
                var i = [Hls.ErrorDetails.BUFFER_APPENDING_ERROR],
                    n = [Hls.ErrorDetails.BUFFER_STALLED_ERROR, Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE],
                    r = e.fatal || inArray(e.details, i);
                if (!r && e.details == Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR && ++this._fragLoopErrorCount > _ && (r = !0, this._fragLoopErrorCount = 0), inArray(e.details, n) || this.player.debugLog(["hls", e.type, e.details], {
                        force: !0,
                        type: r ? "error" : "warn"
                    }), this._errors.push("[" + this.currentTime + "] " + e.details), e.details === Hls.ErrorDetails.FRAG_LOAD_ERROR && this.undelayRecoverNetwork(), r) {
                    var o = !1;
                    this.player.isActiveLive() ? (o = !0, e.type === Hls.ErrorTypes.MEDIA_ERROR ? this.delay(this.recoverMedia, E) : e.type === Hls.ErrorTypes.NETWORK_ERROR && this.delayRecoverNetwork(E)) : o = this.recoverMedia(), o || this.onFatalError(e)
                }
            }, e.prototype.onFatalError = function(t) {
                this.getVar("live") && !this.getVar("postlive_mp4") ? this.player.media.onError() : (t && ajax.post("al_video.php?act=hls_fail_stat", {
                    hash: this.getVar("action_hash"),
                    video: this.player.getVideoId(),
                    error: t.details,
                    response_code: t.response ? t.response.code : "",
                    url: t.frag && t.frag.url || t.context && t.context.url
                }, {}), this.player.debugLog("reinit without hls", {
                    force: !0
                }), this.player.reinitWithoutHls())
            }, e.prototype.recoverMedia = function() {
                return Date.now() - intval(this._lastMediaRecoverTry) < S ? !1 : (this._lastMediaRecoverTry = Date.now(), this.player.debugLog("trying to recover hls media", {
                    force: !0
                }), this.player.isActiveLive() ? this.restartLive() : this.hls.recoverMediaError(), this.player.media.isPlayingMedia() && this.play(), !0)
            }, e.prototype.recoverNetwork = function() {
                return Date.now() - intval(this._lastNetworkRecoverTry) < S ? !1 : (this._lastNetworkRecoverTry = Date.now(), this.player.debugLog("trying to recover hls network", {
                    force: !0
                }), this.player.isActiveLive() ? this.restartLive() : this.hls.startLoad(), this.player.media.isPlayingMedia() && this.play(), !0)
            }, e.prototype.delayRecoverNetwork = function() {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.recoverNetworkTimeoutId || (this.recoverNetworkTimeoutId = this.delay(function() {
                    delete t.recoverNetworkTimeoutId, t.recoverNetwork()
                }, e))
            }, e.prototype.undelayRecoverNetwork = function() {
                this.undelay(this.recoverNetworkTimeoutId), delete this.recoverNetworkTimeoutId
            }, e.prototype.restartLive = function() {
                var t = this.hls.url || this._src;
                t && (this.reset(), this.src = t)
            }, e.prototype.setCurrentLevel = function(t) {
                this.hls.currentLevel = t
            }, e.prototype.filterLiveLevels = function(t) {
                var e = void 0;
                return each(t, function(t, i) {
                    var n = i.url && i.url[0];
                    return /source/.test(n) ? (e = i, !1) : void 0
                }), e && (t = t.filter(function(t) {
                    return t.height < e.height
                }), t.push(e)), t
            }, e.prototype.capLiveLevels = function() {
                var t = this;
                each(this.hls.levels, function(e, i) {
                    var n = i.url && i.url[0];
                    return /source/.test(n) ? (t.hls.autoLevelCapping = e, !1) : void 0
                })
            }, e.prototype.forceNextLevel = function(t) {
                var e = this;
                this.hls.on(Hls.Events.FRAG_LOADED, function i(n, r) {
                    e.hls.off(Hls.Events.FRAG_LOADED, i), r.frag.autoLevel && r.frag.level == t && (e.hls.nextLoadLevel = t)
                })
            }, e.prototype.setQuality = function(t) {
                t == c.AUTO ? (this.setCurrentLevel(-1), v["default"].remove("video_abr_disabled")) : (this.setCurrentLevel(this.getLevelIndexForQuality(t)), v["default"].set("video_abr_disabled", 1))
            }, e.prototype.getQuality = function() {
                if (this.hls.levels) {
                    var t = this.hls,
                        e = t.levels,
                        i = e[t.currentLevel] || e[t.loadLevel] || e[t.startLevel];
                    if (i && i.width && i.height) return c.qualityFromSize(i.width, i.height)
                }
                return 0
            }, e.prototype.getAvailableQualities = function() {
                var t = this.hls.levels || [];
                return this.getVar("live") && (t = this.filterLiveLevels(t)), t.length > 1 && (t = t.filter(function(t) {
                    return t.width && t.height
                })), t.map(function(t) {
                    return c.qualityFromSize(t.width, t.height)
                })
            }, e.prototype.isAutoQualityAvailable = function() {
                return this.hls.levels && this.hls.levels.length > 1
            }, e.prototype.isAutoQualityEnabled = function() {
                return this.hls.autoLevelEnabled
            }, e.prototype.getLevelIndexForQuality = function(t) {
                var e = -1;
                return each(this.hls.levels || [], function(i, n) {
                    return c.qualityFromSize(n.width, n.height) == t ? (e = i, !1) : void 0
                }), e
            }, e.prototype.load = function() {
                this.startedLoading || (this.manifestLoaded ? (this.hls.startLoad(this._delaySeek || -1), this.hls.config.autoStartLoad = !0, this.startedLoading = !0) : this.needLoad = !0)
            }, e.prototype.play = function() {
                this.startedLoading || this.load(), t.prototype.play.call(this)
            }, e.prototype.pauseLoad = function() {
                this.hls.stopLoad()
            }, e.prototype.resumeLoad = function() {
                this.hls.startLoad(), this.hls.detachMedia(), this.hls.attachMedia(this.el)
            }, e.prototype.reset = function() {
                this._ignoreFragLoadStuck = !0, this.undelayRecoverNetwork(), this.hls.detachMedia(), t.prototype.reset.call(this), this.hls.attachMedia(this.el)
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.hls.destroy(), this.hls = null
            }, e.prototype.getLoadedBytes = function() {
                return intval(this._fragLoadedBytes) + intval(this._fragLoadingBytes)
            }, e.prototype.getCurLevel = function() {
                if (this.hls.levels) {
                    var t = 0;
                    return this.hls.levels.length > 1 && (t = this.getLevelIndexForQuality(this.player.getQuality())), this.hls.levels[t]
                }
            }, e.prototype.getBitrate = function() {
                var t = this.getCurLevel();
                return t ? t.bitrate / 1e3 : void 0
            }, e.prototype.getContentUrl = function() {
                var t = this.getCurLevel();
                return t ? t.url[0] : void 0
            }, e.prototype.getErrorsLog = function() {
                return this._errors.join(", ")
            }, e.prototype.onDurationChange = function(t) {
                var e = this.el.duration;
                if (browser.safari && this._duration && "change" === t) {
                    var i = parseInt((e - this._duration) / e * 100);
                    if (i > 10) return
                }
                this._duration = e
            }, l(e, [{
                key: "src",
                set: function(t) {
                    this._src = t, this.hls.loadSource(t)
                }
            }, {
                key: "duration",
                get: function() {
                    return this._duration
                }
            }]), e
        }(f["default"]);
    e["default"] = L
}, function(t, e) {
    t.exports = {}
}, function(t, e, i) {
    var n = i(73),
        r = i(1),
        o = i(26);
    t.exports = i(29) ? Object.defineProperties : function(t, e) {
        r(t);
        for (var i, s = o(e), a = s.length, l = 0; a > l;) n.f(t, i = s[l++], e[i]);
        return t
    }
}, function(t, e, i) {
    var n = i(1),
        r = i(35),
        o = i(13),
        s = Object.defineProperty;
    e.f = i(29) ? Object.defineProperty : function(t, e, i) {
        if (n(t), e = o(e, !0), n(i), r) try {
            return s(t, e, i)
        } catch (a) {}
        if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
        return "value" in i && (t[e] = i.value), t
    }
}, function(t, e, i) {
    t.exports = i(85).document && document.documentElement
}, function(t, e) {
    t.exports = function(t) {
        return "object" == typeof t ? null !== t : "function" == typeof t
    }
}, function(t, e) {
    t.exports = function(t, e, i) {
        var n = void 0 === i;
        switch (e.length) {
            case 0:
                return n ? t() : t.call(i);
            case 1:
                return n ? t(e[0]) : t.call(i, e[0]);
            case 2:
                return n ? t(e[0], e[1]) : t.call(i, e[0], e[1]);
            case 3:
                return n ? t(e[0], e[1], e[2]) : t.call(i, e[0], e[1], e[2]);
            case 4:
                return n ? t(e[0], e[1], e[2], e[3]) : t.call(i, e[0], e[1], e[2], e[3])
        }
        return t.apply(i, e)
    }
}, function(t, e) {
    t.exports = function(t, e) {
        return {
            value: e,
            done: !!t
        }
    }
}, function(t, e, i) {
    var n = i(39)("wks"),
        r = i(104),
        o = i(85).Symbol,
        s = "function" == typeof o;
    t.exports = function(t) {
        return n[t] || (n[t] = s && o[t] || (s ? o : r)("Symbol." + t))
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t) {
        return function() {
            var e = t.apply(this, arguments);
            return new Promise(function(t, i) {
                function n(r, o) {
                    try {
                        var s = e[r](o),
                            a = s.value
                    } catch (l) {
                        return void i(l)
                    }
                    return s.done ? void t(a) : Promise.resolve(a).then(function(t) {
                        n("next", t)
                    }, function(t) {
                        n("throw", t)
                    })
                }
                return n("next")
            })
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = i(36),
        a = n(s),
        l = "5d04",
        u = "5d05",
        h = "5d10",
        d = "5d31",
        c = "5d41",
        p = ["play", "pause", "resume", "stop", "seek", "buf_start", "buf_stop", "heartbeat", "bitrate_change", "error"],
        f = 100,
        y = 3e4,
        v = function() {
            function t(e, i) {
                o(this, t), this.player = e, this.media = i, this.gotNetworkStatus = !1, this.supported = !0, this.paused = !1, this.stopped = !0, this.eventsQueue = []
            }
            return t.prototype.init = function(t, e, i, n, r) {
                i ? this.svcid = r ? d : u : n ? this.svcid = h : this.svcid = r ? c : l, this.inited || (this.host = t, this.cid = e, this.getNetworkStatus(), this.inited = !0)
            }, t.prototype.reset = function() {
                this.flushEventsQueue(), this.stopHeartbeats(), this.paused = !1, this.stopped = !0, this.bufStarted = 0
            }, t.prototype.enable = function(t) {
                this.enabled = t
            }, t.prototype.getNetworkStatus = function() {
                function t() {
                    return e.apply(this, arguments)
                }
                var e = r(regeneratorRuntime.mark(function i() {
                    var t, e, n;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                            case 0:
                                return t = this.sendRequest("network_status", {
                                    svcid: this.svcid,
                                    cid: this.cid,
                                    client: this.getClientData()
                                }), i.next = 3, t.promise;
                            case 3:
                                e = i.sent, n = e.response;
                                try {
                                    this.supported = JSON.parse(n).supported
                                } catch (r) {
                                    this.supported = !1
                                }
                                this.onNetworkStatusReceived();
                            case 7:
                            case "end":
                                return i.stop()
                        }
                    }, i, this)
                }));
                return t
            }(), t.prototype.onNetworkStatusReceived = function() {
                this.gotNetworkStatus = !0, this.supported ? this.flushEventsQueue() : this.clearEventsQueue()
            }, t.prototype.triggerEvent = function(t) {
                if (this.supported && this.enabled && inArray(t, p) && this.player.isInited() && (!this.stopped || "play" == t)) {
                    "play" != t || this.stopped || (t = "resume");
                    var e = null;
                    switch (t) {
                        case "play":
                            this.wid = irand(0, 1e10), this.seq = 0, this.buf_num = 0, this.paused = !1, this.stopped = !1, this.startHeartbeats();
                            break;
                        case "stop":
                            this.stopped = !0, this.bufStarted = 0, this.stopHeartbeats();
                            break;
                        case "pause":
                            if (this.paused) return;
                            this.paused = !0, this.stopHeartbeats();
                            break;
                        case "resume":
                            if (!this.paused) return;
                            this.paused = !1, this.startHeartbeats();
                            break;
                        case "buf_start":
                            if (this.bufStarted) return;
                            this.bufStarted = Date.now();
                            break;
                        case "buf_stop":
                            if (!this.bufStarted) return;
                            e = Date.now() - this.bufStarted, this.bufStarted = 0
                    }
                    var i = this.paramString({
                        type: t,
                        seq: ++this.seq,
                        ts: Date.now(),
                        tz: -60 * (new Date).getTimezoneOffset(),
                        pos: this.media.curTime(),
                        buffer: this.media.getBufferPercent(),
                        bytes: this.media.getLoadedBytes(),
                        bitrate: this.media.getBitrate(),
                        buf_num: "buf_start" == t ? ++this.buf_num : "buf_stop" == t ? this.buf_num : null,
                        buf_time: e,
                        load_state: this.bufStarted ? "buffering" : null,
                        err: "error" == t ? this.media.getErrorCode() : null
                    });
                    this.eventsQueue.push(i), this.gotNetworkStatus && (clearTimeout(this.flushTimeout), this.eventsQueue.length > 10 || "bitrate_change" == t ? this.flushEventsQueue() : this.flushTimeout = setTimeout(this.flushEventsQueue.bind(this), f))
                }
            }, t.prototype.flushEventsQueue = function() {
                this.gotNetworkStatus && this.supported && this.eventsQueue.length && this.sendRequest("notify", {
                    svcid: this.svcid,
                    cid: this.cid,
                    wid: this.wid,
                    client: this.getClientData(),
                    co: this.getContentData(),
                    ev: this.eventsQueue
                }), this.clearEventsQueue()
            }, t.prototype.clearEventsQueue = function() {
                this.eventsQueue.length = 0
            }, t.prototype.startHeartbeats = function() {
                var t = this;
                clearInterval(this.heartbeatInterval), this.heartbeatInterval = setInterval(function() {
                    t.triggerEvent("heartbeat")
                }, y)
            }, t.prototype.stopHeartbeats = function() {
                clearInterval(this.heartbeatInterval)
            }, t.prototype.sendRequest = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    n = i.onLoad,
                    r = i.onError,
                    o = "https://" + this.host + "/uxzoom/1/" + t + "?" + this.queryString(e);
                return (0, a["default"])(o, {
                    onLoad: n,
                    onError: r
                })
            }, t.prototype.getClientData = function() {
                return this.paramString({
                    player: "HTML5"
                })
            }, t.prototype.getContentData = function() {
                return this.paramString({
                    duration: this.media.getDuration() || this.player.vars.duration,
                    quality: this.player.isAutoQualityEnabled() ? 100 : 2 + this.player.getQualityIndex(),
                    host: this.media.getContentHost()
                })
            }, t.prototype.paramString = function(t) {
                var e = [];
                return each(t, function(t, i) {
                    null != i && e.push(t + "=" + i)
                }), e.join(",")
            }, t.prototype.queryString = function(t) {
                var e = [];
                return each(t, function(t, i) {
                    isArray(i) || (i = [i]), each(i, function(i, n) {
                        e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n))
                    })
                }), e.join("&")
            }, t.prototype.destroy = function() {
                this.reset()
            }, t
        }();
    e["default"] = v
}, function(t, e, i) {
    var n = i(75),
        r = i(1),
        o = function(t, e) {
            if (r(t), !n(e) && null !== e) throw TypeError(e + ": can't set as prototype!")
        };
    t.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, e, n) {
            try {
                n = i(81)(Function.call, i(93).f(Object.prototype, "__proto__").set, 2), n(t, []), e = !(t instanceof Array)
            } catch (r) {
                e = !0
            }
            return function(t, i) {
                return o(t, i), e ? t.__proto__ = i : n(t, i), t
            }
        }({}, !1) : void 0),
        check: o
    }
}, function(t, e, i) {
    var n = i(47);
    t.exports = function(t, e, i) {
        if (n(t), void 0 === e) return t;
        switch (i) {
            case 1:
                return function(i) {
                    return t.call(e, i)
                };
            case 2:
                return function(i, n) {
                    return t.call(e, i, n)
                };
            case 3:
                return function(i, n, r) {
                    return t.call(e, i, n, r)
                }
        }
        return function() {
            return t.apply(e, arguments)
        }
    }
}, function(t, e, i) {
    "use strict";
    var n = i(43),
        r = i(77),
        o = i(71),
        s = i(22);
    t.exports = i(54)(Array, "Array", function(t, e) {
        this._t = s(t), this._i = 0, this._k = e
    }, function() {
        var t = this._t,
            e = this._k,
            i = this._i++;
        return !t || i >= t.length ? (this._t = void 0, r(1)) : "keys" == e ? r(0, i) : "values" == e ? r(0, t[i]) : r(0, [i, t[i]])
    }, "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries")
}, function(t, e, i) {
    i(65), i(69), t.exports = i(8).Symbol
}, function(t, e) {
    t.exports = function(t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t
    }
}, function(t, e) {
    var i = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = i)
}, function(t, e) {
    "use strict";

    function i() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="175 567 21 18" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M181.676 584.73c-.925.603-1.676.196-1.676-.9v-15.662c0-1.1.744-1.5 1.662-.896l11.67 7.693c.92.605.92 1.58-.013 2.187l-11.644 7.578z" fill="#FFF" class="_play"/>\n  <path d="M180 567.993c0-.548.444-.993 1-.993h3c.552 0 1 .445 1 .993v16.014c0 .548-.444.993-1 .993h-3c-.552 0-1-.445-1-.993v-16.014zm9 0c0-.548.444-.993 1-.993h3c.552 0 1 .445 1 .993v16.014c0 .548-.444.993-1 .993h-3c-.552 0-1-.445-1-.993v-16.014z" fill="#FFF" class="_pause"/>\n  <path d="M178 576c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9c-1.625 0-3.15-.43-4.464-1.184l2.036-2.327c.743.327 1.564.51 2.428.51 3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6h3l-4.5 5-4.5-5h3z" fill="#FFF" class="_replay"/>\n</svg>\n  '
    }

    function n() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="212 434 12 14" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M212.834 446.872c-.46.295-.834.08-.834-.47V435.6c0-.555.38-.762.834-.47l8.315 5.336c.46.295.453.778 0 1.07l-8.316 5.336zM222 435h2v12h-2v-12z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function r() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="84 14 42 20" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd" transform="translate(84 14)">\n    <rect fill="#F75148" width="42" height="20" rx="2"/>\n    <path d="M26.874 6.486l-2.464 7.562c-.17.523-.756.952-1.307.952h-.206c-.552 0-1.136-.426-1.307-.952l-2.464-7.562c-.06-.11-.103-.233-.12-.363L19 6.1h.005C19.002 6.067 19 6.034 19 6c0-.552.448-1 1-1 .52 0 .945.395.995.9H21l2 6.4 2-6.4h.005c.05-.505.476-.9.995-.9.552 0 1 .448 1 1 0 .034-.002.067-.005.1H27l-.007.023c-.016.13-.058.253-.12.363zM31 9V7h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1h-4.02c-.268 0-.515.11-.696.29-.184.184-.294.432-.294.705v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31v-2h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31zM9 13V5.995C9 5.455 8.552 5 8 5c-.556 0-1 .446-1 .995v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H9zm6-7.005c0-.55.444-.995 1-.995.552 0 1 .456 1 .995v8.01c0 .55-.444.995-1 .995-.552 0-1-.456-1-.995v-8.01z" fill="#F0F2F5"/>\n  </g>\n</svg>\n  '
    }

    function o() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" xmlns="http://www.w3.org/2000/svg" viewBox="822 568 19 16" focusable="false">\n  <path d="M832.98 582.823c-.03 1.207-.67 1.61-1.828.62-1.72-1.47-3.61-3.194-4.242-3.72-.632-.53-1.645-.622-3.073-.622-1.427 0-1.815-.62-1.815-1.24s-.014-1.828-.014-2c0-.055.005-.086.014-.13.02-.095-.058-.973 0-1.59.085-.906.388-1.24 1.815-1.24 1.428 0 2.44-.093 3.073-.622.633-.528 2.523-2.252 4.242-3.72 1.158-.99 1.797-.588 1.83.62.042 1.606 0 3.85 0 6.682 0 2.83.042 5.356 0 6.963z" fill="#FFF"/>\n  <path d="M839 576l1.64 1.64c.205.205.203.517.01.71l-.3.3c-.194.194-.51.19-.71-.01L838 577l-1.64 1.64c-.2.2-.516.204-.71.01l-.3-.3c-.193-.193-.195-.505.01-.71L837 576l-1.64-1.64c-.205-.205-.203-.517-.01-.71l.3-.3c.194-.194.51-.19.71.01L838 575l1.64-1.64c.2-.2.516-.204.71-.01l.3.3c.193.193.195.505-.01.71L839 576z" fill="#FFF" class="_cross"/>\n  <path d="M835.138 578.866c.185.182.486.177.67-.006.737-.737 1.192-1.746 1.192-2.86 0-1.115-.454-2.123-1.19-2.86-.183-.184-.484-.188-.67-.006-.182.18-.185.473-.004.653.57.57.923 1.35.923 2.212 0 .863-.354 1.643-.926 2.213-.18.18-.178.473.004.653" fill="#FFF" class="_wave1"/>\n  <path d="M837.162 580.846c.214.207.562.205.775-.004C839.21 579.596 840 577.888 840 576c0-1.888-.788-3.596-2.06-4.842-.222-.218-.59-.21-.802.023-.193.215-.166.538.038.74 1.066 1.054 1.723 2.49 1.723 4.08 0 1.6-.67 3.048-1.75 4.104-.207.202-.197.54.012.742" fill="#FFF" class="_wave2"/>\n</svg>\n  '
    }

    function s() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="729 480 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M729 481.994c0-1.1.895-1.994 1.994-1.994h12.012c1.1 0 1.994.895 1.994 1.994v12.012c0 1.1-.895 1.994-1.994 1.994h-12.012c-1.1 0-1.994-.895-1.994-1.994v-12.012zm2 4.004c0-.55.456-.998 1.002-.998h9.996c.553 0 1.002.446 1.002.998v7.004c0 .55-.456.998-1.002.998h-9.996c-.553 0-1.002-.446-1.002-.998v-7.004z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  ';
    }

    function a() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="1034 567 18 18" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M1038.067 579.067l2.895-2.53 1.5 1.5-2.53 2.896L1043 584h-7.003c-.55 0-.997-.453-.997-.997V576l3.067 3.067zm9.866-6.134l-2.895 2.53-1.5-1.5 2.53-2.896L1043 568h7.003c.55 0 .997.453.997.997V576l-3.067-3.067z" fill="#FFF" fill-rule="evenodd" class="_enter"/>\n  <path d="M1047.067 570.067l2.895-2.53 1.5 1.5-2.53 2.896L1052 575h-7.003c-.55 0-.997-.453-.997-.997V567l3.067 3.067zm-8.134 11.866l-2.895 2.53-1.5-1.5 2.53-2.896L1034 577h7.003c.55 0 .997.453.997.997V585l-3.067-3.067z" fill="#FFF" fill-rule="evenodd" class="_exit"/>\n</svg>\n  '
    }

    function l() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="5 8 26 22" xmlns="http://www.w3.org/2000/svg">\n  <path d="M21 21v-8h-2v8h-2v2h2v2h2v-2h3v-2h-3zm2-3.077V20s3 0 3-3.5-3-3.5-3-3.5v2.087C22.725 15 22.5 15 22.5 15H21v3h1.5c.17 0 .34-.026.5-.077V20h-2v-7h2v2.087c.436.138 1 .493 1 1.413 0 .77-.45 1.246-1 1.423zM21.5 28c-5.247 0-9.5-4.253-9.5-9.5S16.253 9 21.5 9s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" fill="#FFF" fill-rule="evenodd"/>\n  <path d="M15.818 27.995c-.106.003-.212.005-.318.005-5.247 0-9.5-4.253-9.5-9.5S10.253 9 15.5 9c.446 0 .884.03 1.314.09C12.844 10.503 10 14.294 10 18.75c0 4.073 2.376 7.592 5.818 9.245z" fill="#FFF" fill-rule="evenodd" />\n</svg>\n  '
    }

    function u() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="10 11 17 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M18.5 13.922c-1.7-3.4-5.097-3.393-7.042-1.43-1.944 1.96-1.944 5.147 0 7.11.608.612 5.834 5.76 5.834 5.76.608.613 1.702.613 2.31 0l5.833-5.76c2.066-1.963 2.066-5.15.12-7.11-1.943-1.84-5.355-1.97-7.055 1.43z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function h() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="11 11 14 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M14.16 21h-.637C12.077 21 11 19.39 11 18.09v-1.18c0-1.3 1.077-2.91 2.523-2.91H17c1.358 0 1.694.31 3.712-.99 1.387-.946 2.9-2.01 2.9-2.01H25v13h-1.26s-1.767-1.182-3.154-2.127c-1.46-.948-2.088-.9-3.166-.878.11.784.315 2.057.58 2.734 0 1.475-.133 2.27-2.667 2.27l-1.174-5z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function d() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="10 11 17 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M20 17v-4.993C20 11.45 19.553 11 19 11h-1c-.557 0-1 .45-1 1.007V17h-4.993C11.45 17 11 17.447 11 18v1c0 .557.45 1 1.007 1H17v4.993c0 .558.447 1.007 1 1.007h1c.557 0 1-.45 1-1.007V20h4.993C25.55 20 26 19.553 26 19v-1c0-.557-.45-1-1.007-1H20z" fill="#FFF" fill-rule="evenodd" class="_plus"/>\n  <path stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M11.5 18.5L16 23l9.5-9.5" class="_mark"/>\n</svg>\n  '
    }

    function c() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="0 2 12 8" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M7 5V2H5v3H2v2h3v3h2V7h3V5H7z" fill="#FFF" fill-rule="evenodd" class="_plus"/>\n  <path stroke="#FFF" stroke-width="1.5" fill="none" d="M2 6l2.5 2.5L10 3" class="_mark"/>\n  <path d="M3 3l6 6M9 3L3 9" stroke="#FFF" stroke-width="1.5" fill="none" class="_cancel"/>\n</svg>\n  '
    }

    function p() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="916 568 28 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M938.55 575.79s3.6-5.068 3.974-6.79c.188-.625-.187-1-.813-1h-3.065c-.75 0-1.064.313-1.252.75 0 0-1.5 3.66-3.63 6.04-.687.687-1 .906-1.375.906-.188 0-.47-.22-.47-.844v-5.85c0-.752-.094-1.002-.72-1.002h-4.817c-.47 0-.688.264-.688.594 0 .712 1.064.876 1.064 2.88v4.348c0 .813-.063 1.126-.438 1.126-1 0-3.436-3.677-4.88-7.884-.284-.818-.59-1.064-1.346-1.064h-3.13c-.5 0-.812.313-.812.75 0 .783 1 4.663 4.662 9.793 2.44 3.504 5.756 5.32 8.885 5.32 1.877 0 2.315-.314 2.315-1.065v-2.628c0-.563.094-1.032.688-1.032.438 0 1.19.22 2.94 1.908 2.004 2.003 2.19 2.816 3.318 2.816h3.504c.375 0 .688-.188.688-.75 0-.814-1.064-2.19-2.565-3.88-.69-.814-1.72-1.69-2.034-2.128-.437-.563-.312-.813 0-1.314" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function f() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="163 11 8 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M165 13l5 5.5-5 5.5"/>\n</svg>\n  '
    }

    function y() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M2.587 2.587L0 0h7v7L4.61 4.61c-.564.644-1.144 1.47-1.408 2.367C2.865 8.652 4.135 10 4.135 10S1 9.66 1 5.965c0-1.355.797-2.538 1.587-3.378z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function v() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="230 33 12 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="#99C5FF" fill-rule="evenodd">\n    <path d="M234.665 47.746c-.367.416-.563.32-.435-.22L236.006 40h4.478c.556 0 .712.333.34.754l-6.16 6.992z"/>\n    <path d="M237.337 34.254c.366-.416.56-.32.433.22L235.998 42h-4.466c-.554 0-.7-.344-.34-.754l6.145-6.992z"/>\n  </g>\n</svg>\n  '
    }

    function g(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = "";
        switch (t) {
            case 2:
                i = "M16.283 20.264c.14-.225.396-.53.765-.91l3.278-3.533c.487-.52.834-.966 1.042-1.335.208-.37.312-.735.312-1.098 0-.328-.076-.62-.23-.875-.15-.255-.364-.452-.636-.593-.272-.142-.587-.212-.945-.212-.446 0-.83.12-1.157.36-.325.24-.572.592-.742 1.055-.14.275-.29.475-.452.598-.16.124-.356.185-.584.185-.293 0-.532-.095-.717-.285-.184-.19-.277-.432-.277-.725 0-.528.176-1.032.528-1.512.35-.48.838-.87 1.46-1.165.62-.296 1.31-.444 2.073-.444.763 0 1.447.147 2.053.44.607.293 1.08.7 1.424 1.217.343.52.514 1.104.514 1.755 0 .404-.065.794-.197 1.17-.13.374-.345.77-.64 1.185-.297.416-.7.89-1.21 1.424l-2.795 2.988v.114h4.123c.346 0 .617.087.813.26.197.173.295.41.295.716 0 .3-.098.533-.295.703-.196.17-.467.255-.812.255h-5.923c-.387 0-.696-.097-.928-.29-.232-.193-.348-.45-.348-.773 0-.223.07-.447.21-.673z";
                break;
            case 3:
                i = "M16.107 18.783c.176-.18.4-.272.668-.272.194 0 .368.052.523.155.156.102.315.27.48.505.257.404.578.712.962.923.384.21.822.316 1.314.316.433 0 .814-.076 1.142-.225.328-.15.582-.36.76-.633.18-.272.27-.587.27-.945 0-.357-.092-.675-.274-.953-.18-.28-.435-.494-.76-.646-.325-.153-.702-.23-1.13-.23h-.86c-.265 0-.483-.088-.656-.267-.172-.177-.26-.402-.26-.67 0-.265.088-.485.26-.66.173-.176.39-.264.655-.264h.82c.356 0 .677-.072.96-.215.285-.143.508-.342.67-.597.16-.255.24-.54.24-.857 0-.316-.078-.598-.237-.844-.158-.246-.38-.438-.668-.575-.287-.138-.615-.207-.984-.207-.872 0-1.543.4-2.012 1.195-.13.217-.272.375-.43.475-.16.1-.343.15-.554.15-.28 0-.513-.09-.694-.27-.182-.177-.273-.41-.273-.697 0-.47.176-.91.527-1.323.352-.413.834-.746 1.446-.998.613-.252 1.29-.378 2.035-.378.797 0 1.51.135 2.136.405.628.268 1.117.645 1.468 1.128.352.484.528 1.033.528 1.648 0 .428-.098.836-.295 1.226-.195.39-.46.714-.794.97-.334.26-.7.417-1.1.476v.15c.482.046.917.204 1.306.474.39.27.696.618.92 1.046.222.428.333.89.333 1.39 0 .69-.192 1.307-.576 1.85-.385.54-.918.962-1.6 1.264-.683.302-1.46.453-2.334.453-.767 0-1.472-.13-2.114-.39-.64-.262-1.148-.606-1.52-1.034-.372-.427-.558-.88-.558-1.36 0-.277.088-.505.263-.687z";
                break;
            case 4:
                i = "M17.048 19.776c-.45 0-.804-.114-1.06-.342-.254-.23-.382-.548-.382-.958 0-.194.03-.392.093-.594.06-.202.173-.467.337-.795.527-.996 1.055-1.935 1.582-2.817.526-.882 1.168-1.88 1.924-2.993.37-.54.716-.914 1.04-1.125.327-.21.718-.316 1.175-.316.59 0 1.055.15 1.392.448.337.3.505.71.505 1.23v6.33h.59c.316 0 .565.088.746.267.182.18.273.418.273.717 0 .293-.09.525-.268.694-.18.17-.43.256-.752.256h-.59V20.9c0 .376-.098.67-.298.885-.2.214-.47.32-.817.32-.345 0-.616-.106-.812-.32-.196-.214-.294-.51-.294-.884v-1.124h-4.386zm4.386-7.9h-.123c-.486.737-1.086 1.707-1.8 2.908-.716 1.2-1.293 2.2-1.733 2.997v.063h3.657v-5.968z";
                break;
            case 5:
                i = "M16.393 18.814c.18-.202.412-.303.7-.303.186 0 .355.045.504.133.15.087.295.234.435.44.557.825 1.275 1.238 2.154 1.238.44 0 .83-.094 1.173-.284.342-.19.61-.456.803-.796.193-.34.29-.73.29-1.17 0-.42-.092-.796-.277-1.124-.184-.328-.442-.583-.773-.764-.33-.182-.705-.273-1.12-.273-.294 0-.587.052-.88.157-.293.106-.568.26-.826.466-.252.21-.455.355-.61.43-.156.077-.32.115-.488.115-.365 0-.655-.12-.872-.365-.216-.243-.313-.564-.29-.962l.326-4.517c.03-.416.17-.726.42-.93.253-.206.623-.31 1.11-.31h4.973c.352 0 .626.088.822.26.196.173.294.412.294.717 0 .304-.097.54-.29.707-.194.167-.47.25-.827.25h-4.543l-.247 3.103h.123c.206-.28.53-.51.976-.685.445-.176.926-.264 1.44-.264.757 0 1.427.165 2.01.493.583.328 1.037.788 1.362 1.38.325.592.488 1.27.488 2.03 0 .844-.19 1.588-.57 2.233-.382.644-.918 1.145-1.61 1.503-.69.356-1.485.535-2.382.535-.767 0-1.462-.13-2.083-.387-.62-.258-1.106-.593-1.458-1.006-.35-.413-.527-.845-.527-1.297 0-.298.09-.55.268-.75z";
                break;
            case 6:
                i = "M16.244 12.714c.378-.958.93-1.686 1.656-2.184.727-.498 1.61-.747 2.646-.747.52 0 1.018.065 1.49.194.47.128.89.313 1.252.553.305.205.545.435.72.69.177.255.264.5.264.734 0 .264-.084.478-.254.642-.17.164-.393.246-.668.246-.164 0-.318-.03-.462-.092-.143-.062-.318-.175-.523-.34-.304-.257-.602-.446-.892-.566-.29-.12-.602-.18-.936-.18-.855 0-1.504.365-1.947 1.094-.442.73-.67 1.792-.68 3.186h.078c.135-.345.35-.652.642-.918.293-.267.637-.473 1.033-.62.395-.146.81-.22 1.243-.22.727 0 1.374.165 1.943.493.567.327 1.01.785 1.33 1.374.32.59.48 1.26.48 2.017 0 .827-.182 1.557-.546 2.19-.363.633-.874 1.123-1.533 1.472-.66.35-1.416.523-2.27.523-.763 0-1.446-.147-2.05-.44-.603-.293-1.104-.72-1.502-1.283-.72-1.013-1.08-2.458-1.08-4.333 0-1.366.188-2.528.566-3.486zm2.223 6.592c.185.337.44.6.765.79.325.192.693.287 1.103.287.404 0 .763-.092 1.077-.277.313-.185.556-.445.73-.782.172-.337.258-.725.258-1.165 0-.434-.087-.818-.263-1.152-.176-.334-.422-.592-.74-.774-.315-.18-.68-.272-1.097-.272-.404 0-.768.094-1.09.28-.322.19-.573.448-.752.78-.178.33-.268.707-.268 1.128 0 .434.093.82.277 1.156z";
                break;
            case 7:
                i = "M17.452 20.356l4.122-8.35v-.07h-4.922c-.363 0-.646-.086-.848-.26-.202-.172-.303-.405-.303-.697 0-.294.102-.53.304-.71.202-.178.485-.267.848-.267h6.153c.357 0 .65.108.88.325.227.217.34.504.34.86 0 .23-.038.475-.117.735-.08.26-.2.556-.365.884l-4.14 8.578c-.13.252-.278.44-.448.567-.17.126-.375.19-.615.19-.317 0-.58-.1-.787-.3-.208-.2-.312-.454-.312-.765 0-.21.072-.45.212-.72z";
                break;
            case 8:
                i = "M21.53 20.286c.346-.17.617-.404.813-.703.197-.3.295-.636.295-1.01 0-.382-.098-.723-.295-1.025-.196-.3-.467-.537-.813-.707-.345-.17-.738-.254-1.177-.254-.44 0-.832.085-1.178.255-.346.17-.617.407-.813.708-.196.302-.295.643-.295 1.024 0 .375.1.712.295 1.01.196.3.467.534.813.704.346.17.738.255 1.178.255.44 0 .832-.084 1.177-.254zm-.197-5.572c.29-.147.515-.352.676-.615.16-.265.24-.564.24-.898 0-.328-.08-.62-.24-.88-.162-.257-.387-.46-.677-.605-.29-.147-.617-.22-.98-.22-.364 0-.69.073-.98.22-.29.146-.516.348-.677.606-.16.258-.242.55-.242.88 0 .327.08.623.242.887.16.264.387.47.677.62.29.15.616.224.98.224.363 0 .69-.074.98-.22zm-3.428 7.1c-.7-.292-1.242-.705-1.626-1.238-.385-.533-.577-1.148-.577-1.846 0-.492.104-.946.312-1.362.208-.416.503-.766.883-1.05.38-.284.82-.476 1.32-.576v-.132c-.64-.2-1.138-.533-1.495-1.002-.358-.468-.536-1.022-.536-1.66 0-.616.175-1.164.527-1.644.35-.48.844-.856 1.476-1.125.633-.27 1.354-.406 2.163-.406.808 0 1.53.135 2.162.405.632.268 1.125.643 1.476 1.124.353.48.53 1.028.53 1.643 0 .633-.182 1.185-.542 1.657-.36.472-.86.807-1.5 1.006v.132c.5.1.938.292 1.315.576.378.284.673.634.884 1.05.21.416.316.867.316 1.354 0 .69-.196 1.305-.59 1.84-.39.537-.94.953-1.647 1.25-.706.295-1.516.443-2.43.443-.914 0-1.72-.147-2.42-.44z";
                break;
            case 9:
                i = "M21.838 12.72c-.176-.34-.422-.606-.738-.797-.317-.19-.677-.285-1.08-.285-.4 0-.756.093-1.07.28-.313.188-.556.452-.73.792-.172.34-.258.727-.258 1.16 0 .434.086.816.26 1.147.172.33.415.59.73.774.312.185.67.277 1.075.277.405 0 .764-.092 1.077-.276.313-.184.558-.442.734-.773.176-.33.264-.71.264-1.138 0-.435-.088-.82-.264-1.16zm-5.498 6.727c.173-.167.39-.25.655-.25.147 0 .284.027.413.083.13.055.284.157.466.303.3.264.598.46.897.584.3.126.64.19 1.02.19.86 0 1.518-.37 1.97-1.112.45-.742.676-1.798.676-3.17h-.08c-.216.558-.584.997-1.103 1.32-.518.322-1.117.483-1.797.483-.732 0-1.383-.167-1.95-.5-.57-.335-1.012-.804-1.328-1.407-.317-.603-.475-1.288-.475-2.056 0-.82.182-1.545.545-2.175.363-.63.876-1.12 1.538-1.465s1.424-.518 2.285-.518c.974 0 1.803.24 2.49.72.684.48 1.207 1.18 1.567 2.1.36.92.54 2.03.54 3.332 0 1.364-.187 2.52-.562 3.462-.375.943-.925 1.658-1.652 2.145-.726.486-1.61.73-2.654.73-.51 0-.996-.06-1.456-.177-.46-.117-.868-.287-1.226-.51-.322-.2-.576-.426-.76-.68-.185-.255-.277-.512-.277-.77 0-.275.087-.496.26-.663z"
        }
        return '\n<svg class="' + e + '" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd">\n    <path d="M8.832 19.334c-.2 0-.38-.08-.54-.24-.17-.168-.253-.35-.253-.546 0-.215.088-.406.266-.575l1.6-1.6-1.6-1.6c-.178-.186-.267-.382-.267-.587 0-.196.074-.37.225-.52.155-.154.33-.232.526-.232.21 0 .404.09.582.267l1.607 1.6 1.59-1.592c.184-.183.38-.274.59-.274.195 0 .375.082.54.246.16.16.238.34.238.54 0 .21-.088.404-.266.582l-1.6 1.6 1.6 1.606c.182.177.273.37.273.58 0 .192-.077.365-.232.52-.155.155-.33.233-.526.233-.21 0-.404-.088-.582-.266l-1.6-1.606-1.6 1.6c-.176.177-.368.266-.573.266z" fill="#000"/>\n    <path d="' + i + '" fill="#000"/>\n  </g>\n</svg>\n  '
    }

    function _() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return '\n<svg class="' + t + '" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M5 3.69L1.578.27C1.22-.09.635-.09.273.272-.09.637-.09 1.22.27 1.578L3.69 5 .27 8.422c-.358.357-.358.943.003 1.305.364.364.946.363 1.305.004L5 6.31l3.422 3.42c.357.358.943.358 1.305-.003.364-.364.363-.946.004-1.305L6.31 5l3.42-3.422c.358-.357.358-.943-.003-1.305C9.363-.09 8.78-.09 8.422.27L5 3.69z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.play = i, e.next = n, e.live = r, e.volume = o, e.expand = s, e.fullscreen = a, e.donate = l, e.like = u, e.share = h, e.add = d, e.subscribe = c, e.vk = p, e.skipAd = f, e.gotoLink = y, e.superComment = v, e.giftCount = g, e.noticeClose = _
}, function(t, e, i) {
    "use strict";
    var n, r, o, s = i(113),
        a = i(85),
        l = i(81),
        u = i(57),
        h = i(12),
        d = i(75),
        c = (i(1), i(47)),
        p = i(4),
        f = i(6),
        y = (i(80).set, i(103)),
        v = i(19).set,
        g = i(111),
        _ = "Promise",
        m = a.TypeError,
        b = a.process,
        E = a[_],
        b = a.process,
        S = "process" == u(b),
        L = function() {},
        w = !! function() {
            try {
                var t = E.resolve(1),
                    e = (t.constructor = {})[i(78)("species")] = function(t) {
                        t(L, L)
                    };
                return (S || "function" == typeof PromiseRejectionEvent) && t.then(L) instanceof e
            } catch (n) {}
        }(),
        A = function(t, e) {
            return t === e || t === E && e === o
        },
        T = function(t) {
            var e;
            return d(t) && "function" == typeof(e = t.then) ? e : !1
        },
        k = function(t) {
            return A(E, t) ? new C(t) : new r(t)
        },
        C = r = function(t) {
            var e, i;
            this.promise = new t(function(t, n) {
                if (void 0 !== e || void 0 !== i) throw m("Bad Promise constructor");
                e = t, i = n
            }), this.resolve = c(e), this.reject = c(i)
        },
        P = function(t) {
            try {
                t()
            } catch (e) {
                return {
                    error: e
                }
            }
        },
        I = function(t, e) {
            if (!t._n) {
                t._n = !0;
                var i = t._c;
                g(function() {
                    for (var n = t._v, r = 1 == t._s, o = 0, s = function(e) {
                            var i, o, s = r ? e.ok : e.fail,
                                a = e.resolve,
                                l = e.reject,
                                u = e.domain;
                            try {
                                s ? (r || (2 == t._h && M(t), t._h = 1), s === !0 ? i = n : (u && u.enter(), i = s(n), u && u.exit()), i === e.promise ? l(m("Promise-chain cycle")) : (o = T(i)) ? o.call(i, a, l) : a(i)) : l(n)
                            } catch (h) {
                                l(h)
                            }
                        }; i.length > o;) s(i[o++]);
                    t._c = [], t._n = !1, e && !t._h && D(t)
                })
            }
        },
        D = function(t) {
            v.call(a, function() {
                var e, i, n, r = t._v;
                if (x(t) && (e = P(function() {
                        S ? b.emit("unhandledRejection", r, t) : (i = a.onunhandledrejection) ? i({
                            promise: t,
                            reason: r
                        }) : (n = a.console) && n.error && n.error("Unhandled promise rejection", r)
                    }), t._h = S || x(t) ? 2 : 1), t._a = void 0, e) throw e.error
            })
        },
        x = function(t) {
            if (1 == t._h) return !1;
            for (var e, i = t._a || t._c, n = 0; i.length > n;)
                if (e = i[n++], e.fail || !x(e.promise)) return !1;
            return !0
        },
        M = function(t) {
            v.call(a, function() {
                var e;
                S ? b.emit("rejectionHandled", t) : (e = a.onrejectionhandled) && e({
                    promise: t,
                    reason: t._v
                })
            })
        },
        O = function(t) {
            var e = this;
            e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), I(e, !0))
        },
        R = function(t) {
            var e, i = this;
            if (!i._d) {
                i._d = !0, i = i._w || i;
                try {
                    if (i === t) throw m("Promise can't be resolved itself");
                    (e = T(t)) ? g(function() {
                        var n = {
                            _w: i,
                            _d: !1
                        };
                        try {
                            e.call(t, l(R, n, 1), l(O, n, 1))
                        } catch (r) {
                            O.call(n, r)
                        }
                    }): (i._v = t, i._s = 1, I(i, !1))
                } catch (n) {
                    O.call({
                        _w: i,
                        _d: !1
                    }, n)
                }
            }
        };
    w || (E = function(t) {
        p(this, E, _, "_h"), c(t), n.call(this);
        try {
            t(l(R, this, 1), l(O, this, 1))
        } catch (e) {
            O.call(this, e)
        }
    }, n = function(t) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
    }, n.prototype = i(14)(E.prototype, {
        then: function(t, e) {
            var i = k(y(this, E));
            return i.ok = "function" == typeof t ? t : !0, i.fail = "function" == typeof e && e, i.domain = S ? b.domain : void 0, this._c.push(i), this._a && this._a.push(i), this._s && I(this, !1), i.promise
        },
        "catch": function(t) {
            return this.then(void 0, t)
        }
    }), C = function() {
        var t = new n;
        this.promise = t, this.resolve = l(R, t, 1), this.reject = l(O, t, 1)
    }), h(h.G + h.W + h.F * !w, {
        Promise: E
    }), i(31)(E, _), i(95)(_), o = i(8)[_], h(h.S + h.F * !w, _, {
        reject: function(t) {
            var e = k(this),
                i = e.reject;
            return i(t), e.promise
        }
    }), h(h.S + h.F * (s || !w), _, {
        resolve: function(t) {
            if (t instanceof E && A(t.constructor, this)) return t;
            var e = k(this),
                i = e.resolve;
            return i(t), e.promise
        }
    }), h(h.S + h.F * !(w && i(108)(function(t) {
        E.all(t)["catch"](L)
    })), _, {
        all: function(t) {
            var e = this,
                i = k(e),
                n = i.resolve,
                r = i.reject,
                o = P(function() {
                    var i = [],
                        o = 0,
                        s = 1;
                    f(t, !1, function(t) {
                        var a = o++,
                            l = !1;
                        i.push(void 0), s++, e.resolve(t).then(function(t) {
                            l || (l = !0, i[a] = t, --s || n(i))
                        }, r)
                    }), --s || n(i)
                });
            return o && r(o.error), i.promise
        },
        race: function(t) {
            var e = this,
                i = k(e),
                n = i.reject,
                r = P(function() {
                    f(t, !1, function(t) {
                        e.resolve(t).then(i.resolve, n)
                    })
                });
            return r && n(r.error), i.promise
        }
    })
}, function(t, e, i) {
    var n = i(17),
        r = i(84);
    t.exports = function(t) {
        return function(e, i) {
            var o, s, a = String(r(e)),
                l = n(i),
                u = a.length;
            return 0 > l || l >= u ? t ? "" : void 0 : (o = a.charCodeAt(l), 55296 > o || o > 56319 || l + 1 === u || (s = a.charCodeAt(l + 1)) < 56320 || s > 57343 ? t ? a.charAt(l) : o : t ? a.slice(l, l + 2) : (o - 55296 << 10) + (s - 56320) + 65536)
        }
    }
}, function(t, e, i) {
    var n = i(22),
        r = i(98).f,
        o = {}.toString,
        s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        a = function(t) {
            try {
                return r(t)
            } catch (e) {
                return s.slice()
            }
        };
    t.exports.f = function(t) {
        return s && "[object Window]" == o.call(t) ? a(t) : r(n(t))
    }
}, function(t, e) {
    "use strict";

    function i(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : t.length;
        if (Array.prototype.fill) return Array.prototype.fill.call(t, e, i, n);
        i = 0 > i ? Math.max(t.length + i, 0) : Math.min(i, t.length), n = 0 > n ? Math.max(t.length + n, 0) : Math.min(n, t.length);
        for (var r = i; n > r; ++r) t[r] = e;
        return t
    }

    function n(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            blank: !0,
            throughAway: !0
        };
        e.throughAway && !/\/away\.php/.test(t) && (t = "/away.php?to=" + encodeURIComponent(t));
        var i = window.open(t, e.blank ? "_blank" : "");
        i.opener = null
    }

    function r(t, e) {
        "textContent" in Node.prototype ? t.textContent = e : t.innerText = e
    }

    function o(t) {
        var e = ce("div");
        if ("string" == typeof e.style[t]) return t;
        for (var i, n = ["webkit", "moz", "ms"], r = t.charAt(0).toUpperCase() + t.slice(1), o = 0; i = n[o]; o++) {
            var s = i + r;
            if ("string" == typeof e.style[s]) return s
        }
        return null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.fillArray = i, e.safeOpenLink = n, e.setText = r, e.getCssProp = o;
    e.uniqueId = function(t) {
        return function(e) {
            return e + t++
        }
    }(0)
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(59),
        d = n(h),
        c = i(86),
        p = n(c),
        f = i(55),
        y = n(f),
        v = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.el = se('\n<div class="videoplayer_end_screen">\n  <div class="videoplayer_end_info">\n    <a href="' + n.getVar("author_href") + '" target="_blank">\n      <img class="videoplayer_end_info_author_photo" src="' + n.getVar("author_photo") + '"/>\n    </a>\n    <div class="videoplayer_end_info_title">' + n.getVar("md_title") + '</div>\n    <div class="videoplayer_end_info_author_name">\n      <a href="' + n.getVar("author_href") + '" target="_blank" class="videoplayer_end_info_author_link">' + n.getVar("md_author") + '</a>\n      <div class="videoplayer_end_info_subscribe">' + p.subscribe("_icon_subscribe") + '</div>\n    </div>\n  </div>\n  <div class="videoplayer_end_actions">\n    <div class="_like">\n      ' + p.like("_like_icon") + "\n      " + n.getLang("like") + '\n    </div>\n    <div class="_share">\n      ' + p.share("_share_icon") + "\n      " + n.getLang("share") + '\n    </div>\n    <div class="_add">\n      ' + p.add("_add_icon") + "\n      " + n.getLang("add") + "\n    </div>\n  </div>\n</div>\n    "), n._info = domByClass(n.el, "videoplayer_end_info"), n._actions = domByClass(n.el, "videoplayer_end_actions"), n._subscribeBtn = domByClass(n.el, "videoplayer_end_info_subscribe"), n.setLiked(!!i.videoLiked), n.setAdded(!!i.videoAdded), n.setSubscribed(!!i.isSubscribed), n.domListen(n.el, "click", function(t) {
                    t.target === n.el && n.player.togglePlay()
                }), n.domListen("_like", "click", function() {
                    i.likeVideo(n._largeActions ? y.END_LARGE : y.END_SMALL)
                }), n.domListen("_share", "click", function() {
                    i.shareVideo(n._largeActions ? y.END_LARGE : y.END_SMALL)
                }), n.domListen("_add", "click", function() {
                    i.addVideo(n._largeActions ? y.END_LARGE : y.END_SMALL)
                }), n.domListen(n._subscribeBtn, "click", function() {
                    i.subscribeToAuthor(n._largeActions ? y.END_LARGE : y.END_SMALL)
                }), n.attachTooltip({
                    el: "_like",
                    text: function() {
                        return n._largeActions ? null : n.getLang("like")
                    },
                    hideDelay: 200
                }), n.attachTooltip({
                    el: "_share",
                    text: function() {
                        return n._largeActions ? null : n.getLang("share")
                    },
                    hideDelay: 200
                }), n.attachTooltip({
                    el: "_add",
                    text: function() {
                        return n.getLang(n.player.videoAdded ? "added" : "add")
                    },
                    hideDelay: 200
                }), n.attachTooltip({
                    el: n._subscribeBtn,
                    text: function() {
                        return n.getLang(n.player.isSubscribed ? "subscribed" : "subscribe")
                    },
                    toDown: !0
                }), n.getVar("can_add") || addClass(n._actions, "_no_add"), n.updateShareActionsVisibility(), toggle(n._subscribeBtn, !!n.getVar("can_subscribe")), n.playerListen(d.VIDEO_LIKE, function(t) {
                    n.setLiked(t)
                }), n.playerListen(d.VIDEO_ADD, function(t) {
                    n.setAdded(t)
                }), n.playerListen(d.SUBSCRIBED, function(t) {
                    n.setSubscribed(t)
                }), n
            }
            return a(e, t), e.prototype.setLiked = function(t) {
                toggleClass(domByClass(this.el, "_like"), "_liked", t)
            }, e.prototype.setAdded = function(t) {
                toggleClass(domByClass(this.el, "_add"), "_added", t)
            }, e.prototype.setSubscribed = function(t) {
                toggleClass(this._subscribeBtn, "_subscribed", t)
            }, e.prototype.resize = function(t, e) {
                this._largeActions = t > 250 && e > 200, toggleClass(this._actions, "_large", this._largeActions)
            }, e.prototype.updateShareActionsVisibility = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !0;
                toggle(this._actions, !this.getVar("nolikes") && t)
            }, e.prototype.isStretchMode = function() {
                return !1
            }, e
        }(u["default"]);
    e["default"] = v
}, function(t, e) {
    var i = {}.hasOwnProperty;
    t.exports = function(t, e) {
        return i.call(t, e)
    }
}, function(t, e, i) {
    var n = i(5),
        r = i(18),
        o = i(22),
        s = i(13),
        a = i(92),
        l = i(35),
        u = Object.getOwnPropertyDescriptor;
    e.f = i(29) ? u : function(t, e) {
        if (t = o(t), e = s(e, !0), l) try {
            return u(t, e)
        } catch (i) {}
        return a(t, e) ? r(!n.f.call(t, e), t[e]) : void 0
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(91),
        u = r(l),
        h = i(59),
        d = n(h),
        c = i(86),
        p = n(c),
        f = 5e3,
        y = function(t) {
            function e(i, n, r, a) {
                o(this, e);
                var l = s(this, t.call(this, i));
                return l._nextVideosData = n, l._fromSuggestions = a, setStyle(l._actions, {
                    marginTop: "-110px"
                }), r && (l.buildNextBlock(), i.nextTimerStopped || l.startTimer()), l.buildSuggestionsBlock(), r || l.showSuggestions(), l.playerListen(d.NEXT_TIMER_RESET, l.resetTimer), l.playerListen(d.NEXT_TIMER_START, l.startTimer), l
            }
            return a(e, t), e.prototype.buildNextBlock = function() {
                var t = this._nextVideosData[0];
                this._nextBlock = se('\n<div class="videoplayer_end_next_block">\n  <div class="_caption">' + this.getLang("next") + '</div>\n  <div class="_thumb" style="background-image:url(' + t.thumb + ')"></div>\n  <div class="_thumb_darken"></div>\n  <div class="_timer">\n    <canvas class="_timer_canvas" width="100" height="100"></canvas>\n    ' + p.play("_timer_play_icon") + '\n  </div>\n  <div class="_description">\n    <div class="_title">' + t.title + '</div>\n    <div class="_views">' + t.views + '</div>\n  </div>\n  <div class="_cancel"></div>\n</div>\n    '), this.domListen(this._nextBlock, "click", this.onNextClick), this.domListen(domByClass(this._nextBlock, "_cancel"), "click", this.onNextCancelClick), this.el.appendChild(this._nextBlock)
            }, e.prototype.buildSuggestionsBlock = function() {
                var t = this,
                    e = this.player.getVideoId();
                this._suggestionsBlock = ce("div", {
                    className: "videoplayer_end_suggestions _before_intro"
                }), each(this._nextVideosData, function(i, n) {
                    var r = n.href || "/video" + n.vid,
                        o = se('\n<a class="_item" href="' + r + '">\n  <div class="_item_thumb" style="background-image:url(' + n.thumb + ');"></div>\n  <div class="_item_title">' + n.title + '</div>\n  <div class="_item_views">' + n.views + "</div>\n</a>\n      ");
                    n.vid == e && domByClass(o, "_item_thumb").appendChild(se('\n<div class="_item_replay">\n  <div class="_item_replay_text">' + p.play("_item_replay_icon") + t.getLang("replay") + "</div>\n</div>\n        ")), t.domListen(o, "click", t.onSuggestionClick.bind(t, n.vid, i + 1)), t._suggestionsBlock.appendChild(o)
                }), this.el.appendChild(this._suggestionsBlock)
            }, e.prototype.startTimer = function() {
                var t = this;
                if (this._nextBlock && !this.minMode && window.CanvasRenderingContext2D) {
                    var e = domByClass(this._nextBlock, "_timer_canvas"),
                        i = e.getContext("2d");
                    i.lineWidth = 6, i.lineCap = "round", i.strokeStyle = "#fff";
                    var n = Date.now(),
                        r = function o() {
                            var e = (Date.now() - n) / f;
                            1 > e ? (i.clearRect(0, 0, 100, 100), i.beginPath(), i.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), i.stroke(), t._nextTO = setTimeout(o, 16)) : t.player.nextVideo(t._nextVideosData[0].vid, !0, !0)
                        };
                    show(e), this.timerInProgress = !0, r()
                }
            }, e.prototype.resetTimer = function() {
                this._nextBlock && window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this._nextBlock, "_timer_canvas")))
            }, e.prototype.showSuggestions = function() {
                removeClass(this._suggestionsBlock, "_before_intro");
                var t = this.isStretchMode.apply(this, this.player.getSize());
                this.player.onSuggestionsShown(t, this._fromSuggestions)
            }, e.prototype.onNextClick = function() {
                var t = this._nextVideosData[0];
                this.player.nextVideo(t.vid, !0)
            }, e.prototype.onNextCancelClick = function(t) {
                t.stopPropagation(), this.resetTimer(), re(this._nextBlock), this._nextBlock = null, this.showSuggestions()
            }, e.prototype.onSuggestionClick = function(t, e, i) {
                i.ctrlKey || browser.mac && i.metaKey || (i.preventDefault(), i.stopPropagation(), this.player.getVideoId() == t ? (this.player.onTouchedByUser(), this.player.onSuggestionsReplayClicked()) : t && (this.getVar("is_embed") ? window.open(i.currentTarget.href, "_blank") : this._fromSuggestions ? this.player.onSuggestionClicked(t, this._stretchMode, e) : this.player.nextVideo(t)), this.player.el.focus())
            }, e.prototype.resize = function(t, e) {
                var i = 600 > t || 350 > e;
                if (this.minMode = i, toggle(this._nextBlock, !i), this._suggestionsBlock) {
                    var n = this.isStretchMode(t, e),
                        r = n ? 4 : 10,
                        o = n ? Math.floor((t - 6) / 3 - 2 * r) : 180,
                        s = n ? Math.round(o / 1.777) : 100;
                    each(geByClass("_item", this._suggestionsBlock), function(t, e) {
                        setStyle(e, {
                            width: o + "px",
                            padding: "0 " + r + "px"
                        }), setStyle(domFC(e), {
                            height: s + "px"
                        })
                    }), setStyle(this._suggestionsBlock, {
                        marginTop: n ? -Math.round(s / 2) + "px" : ""
                    }), toggle(this._suggestionsBlock, !i || n), this.updateShareActionsVisibility(!n), toggleClass(this._info, "_right_offset", n && !this.getVar("nolikes")), this._stretchMode = n
                }
                setStyle(this._actions, {
                    marginTop: i ? "" : "-110px"
                }), i && this.timerInProgress ? this.resetTimer() : this.timerInProgress || this.player.nextTimerStopped || this.startTimer()
            }, e.prototype.isStretchMode = function(t, e) {
                return !!this._suggestionsBlock && t >= 400 && 600 >= t && e >= 250 && 510 >= e
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.resetTimer()
            }, e
        }(u["default"]);
    e["default"] = y
}, function(t, e, i) {
    "use strict";
    var n = i(85),
        r = i(8),
        o = i(73),
        s = i(29),
        a = i(78)("species");
    t.exports = function(t) {
        var e = "function" == typeof r[t] ? r[t] : n[t];
        s && e && !e[a] && o.f(e, a, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(59),
        d = n(h),
        c = i(7),
        p = n(c),
        f = 1e3,
        y = 1e3,
        v = function(t) {
            function e(i, n) {
                o(this, e);
                var r = s(this, t.call(this, i));
                return r.el = se('\n<div class="videoplayer_quality_select">\n  <div class="videoplayer_quality_select_label">\n    <span class="videoplayer_quality_select_label_text"></span>\n    <div class="videoplayer_quality_select_label_sd_icon hidden"></div>\n    <div class="videoplayer_quality_select_label_hd_icon hidden"></div>\n  </div>\n  <div class="videoplayer_quality_select_list hidden" role="menu"></div>\n</div>\n    '), r._wrap = n, r._label = domByClass(r.el, "videoplayer_quality_select_label"), r._label_text = domByClass(r.el, "videoplayer_quality_select_label_text"), r._label_sd_icon = domByClass(r.el, "videoplayer_quality_select_label_sd_icon"), r._label_hd_icon = domByClass(r.el, "videoplayer_quality_select_label_hd_icon"), r._list = domByClass(r.el, "videoplayer_quality_select_list"), r.domListen(n, "mouseenter", r.onMouseEnter), r.domListen(n, "mouseleave", r.onMouseLeave), r.domListen(n, "mousemove", r.onMouseMove), r.domListen(n, "keydown", r.onKeyDown), r.domListen(n, "click", r.onLabelClick), r.domListen(r._list, "click", r.onItemClick), r.playerListen(d.QUALITIES_LIST_CHANGE, r.updateList), r.playerListen(d.QUALITY_CHANGE, r.updateQuality), r
            }
            return a(e, t), e.prototype.initVideo = function(t) {
                this.updateList(this.player.getAvailableQualities()),
                    this.updateQuality(this.player.getQuality()), this.enable()
            }, e.prototype.deinitVideo = function() {
                this.disable()
            }, e.prototype.updateList = function(t) {
                var e = "";
                this.player.isAutoQualityAvailable() && (e += '<div class="videoplayer_quality_select_item" data-value="-1" role="menuitemradio" tabindex="0">' + this.getLang("quality_auto") + "</div>"), each(t, function(t, i) {
                    var n = "";
                    i >= p.HD_4K ? n = "_hd_4k" : i >= p.HD_2K ? n = "_hd_2k" : i >= p.HD && (n = "_hd"), e += '<div class="videoplayer_quality_select_item ' + n + '" data-value="' + i + '" role="menuitemradio" tabindex="0">' + i + "</div>"
                }), val(this._list, e), this._items = geByClass("videoplayer_quality_select_item", this.list)
            }, e.prototype.updateQuality = function(t, e, i) {
                if (t && this._items) {
                    val(this._label_text, i ? this.getLang("quality_auto") : t), toggleClass(this._label_sd_icon, "hidden", t >= p.HD), toggleClass(this._label_hd_icon, "hidden", t < p.HD), t >= p.HD_4K ? domData(this._label_hd_icon, "hd", "4k") : t >= p.HD_2K ? domData(this._label_hd_icon, "hd", "2k") : domData(this._label_hd_icon, "hd", null), each(this._items, function(e, n) {
                        var r = +attr(n, "data-value"),
                            o = i ? r == p.AUTO : r == t;
                        toggleClass(n, "_active", o), attr(n, "aria-checked", o)
                    });
                    var n = this.getLang("aria_quality_current", {
                            quality: t
                        }),
                        r = i ? this.getLang("quality_auto") : "",
                        o = this.getLang("hdsd") + (" (" + n + " " + r + ")");
                    attr(this._wrap, "aria-label", o)
                }
            }, e.prototype.onLabelClick = function(t) {
                this._disabled || t.target == this._list || isAncestor(t.target, this._list) || this.toggle(!this.isOpen())
            }, e.prototype.onItemClick = function(t) {
                var e = +attr(t.target, "data-value");
                e && this.player.setQuality(e), this.toggle(!1)
            }, e.prototype.onMouseEnter = function() {
                this._disabled || (clearTimeout(this._hideTimeout), addClass(this._label, "_over"), this.isOpen() || (Date.now() - this.tooltip.lastShown < 50 ? this.showTooltip() : this._tooltipTimeout = setTimeout(this.showTooltip.bind(this), y)))
            }, e.prototype.showTooltip = function() {
                var t = this;
                this._disabled || this.isOpen() || this.tooltip.show({
                    el: this._label,
                    text: function() {
                        return t.getLang("hdsd")
                    },
                    offsetY: 10
                })
            }, e.prototype.onMouseLeave = function() {
                this._hideTimeout = setTimeout(this.toggle.bind(this, !1), f), removeClass(this._label, "_over"), this.tooltip.hide(), clearTimeout(this._tooltipTimeout)
            }, e.prototype.onMouseMove = function(t) {
                this._disabled || toggleClass(this._label, "_over", !inArray(t.target, this._items))
            }, e.prototype.onKeyDown = function(t) {
                switch (t.keyCode) {
                    case KEY.UP:
                    case KEY.DOWN:
                        if (this.isOpen()) {
                            if (this._items.length) {
                                var e = this._items.length,
                                    i = t.keyCode == KEY.DOWN ? 1 : -1,
                                    n = indexOf(this._items, t.target),
                                    r = (e + n + i) % e;
                                this._items[r].focus()
                            }
                        } else this.toggle(!0);
                        t.preventDefault(), t.stopPropagation();
                        break;
                    case KEY.ESC:
                        this.isOpen() && (this.toggle(!1), t.preventDefault(), t.stopPropagation())
                }
            }, e.prototype.toggle = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !this.isOpen();
                if (t != this.isOpen()) {
                    if (toggleClass(this._list, "hidden", !t), attr(this._list, "aria-hidden", !t), t) {
                        this.tooltip.hide(), attr(this._wrap, "tabindex", -1);
                        var e = domByClass(this._list, "_active");
                        e && setTimeout(function() {
                            return e.focus()
                        }, 100)
                    } else attr(this._wrap, "tabindex", 0), domPN(document.activeElement) == this._list && this._wrap.focus();
                    attr(this._wrap, "aria-expanded", t)
                }
            }, e.prototype.isOpen = function() {
                return !hasClass(this._list, "hidden")
            }, e.prototype.disable = function() {
                this.toggle(!1), this._disabled = !0, setStyle(this._wrap, {
                    cursor: "default"
                })
            }, e.prototype.enable = function() {
                this._disabled = !1, setStyle(this._wrap, {
                    cursor: ""
                })
            }, e
        }(u["default"]);
    e["default"] = v
}, function(t, e, i) {
    var n = i(61);
    t.exports = Array.isArray || function(t) {
        return "Array" == n(t)
    }
}, function(t, e, i) {
    var n = i(2),
        r = i(20).concat("length", "prototype");
    e.f = Object.getOwnPropertyNames || function(t) {
        return n(t, r)
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function s(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function() {
            function t(t, e) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        l = i(51),
        u = n(l),
        h = function(t) {
            function e(i) {
                r(this, e);
                var n = o(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_timeline_preview",
                    innerHTML: '\n<div class="_preview"></div>\n<div class="_text"></div>\n<div class="_arrow"></div>\n      '
                }, {
                    display: "none"
                }), n._preview = domByClass(n.el, "_preview"), n._text = domByClass(n.el, "_text"), n._arrow = domByClass(n.el, "_arrow"), n
            }
            return s(e, t), e.prototype.initVideo = function(t) {
                if (t.timeline_thumbs) {
                    var e = this.getThumbsData();
                    setStyle(this._preview, {
                        width: e.frameWidth + "px",
                        height: e.frameHeight + "px"
                    }), this._imgUrls = e.links, this._imgUrls.forEach(function(t) {
                        return vkImage().src = t
                    })
                }
            }, e.prototype.getThumbsData = function(t) {
                var e = this.getVar("timeline_thumbs").split("|"),
                    i = a(e, 6),
                    n = i[0],
                    r = i[1],
                    o = i[2],
                    s = i[3],
                    l = i[4],
                    u = i[5];
                return {
                    frameWidth: n,
                    frameHeight: r,
                    countPerRow: o,
                    countPerImage: s,
                    countTotal: l,
                    links: u.split(",")
                }
            }, e.prototype.show = function(t) {
                function e(e) {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }, e
            }(function(t) {
                var e = t.sliderEl,
                    i = t.progress,
                    n = t.text,
                    r = this.getThumbsData(),
                    o = Math.min(r.countTotal, Math.max(0, Math.floor(r.countTotal * i - .5))),
                    s = Math.floor(o / r.countPerImage),
                    a = Math.floor(o % r.countPerImage / r.countPerRow),
                    l = o % r.countPerRow,
                    u = -l * r.frameWidth + "px",
                    h = -a * r.frameHeight + "px";
                setStyle(this._preview, {
                    backgroundImage: "url(" + this._imgUrls[s] + ")",
                    backgroundPosition: u + " " + h
                });
                var d = 3,
                    c = 7,
                    p = this.player.el.getBoundingClientRect(),
                    f = e.getBoundingClientRect(),
                    y = f.left - p.left + f.width * i;
                y -= Math.round(r.frameWidth / 2) - d;
                var v = 0;
                7 > y && (v = y - 7 - c / 2, y = 7), setStyle(this.el, {
                    left: y + "px"
                }), setStyle(this._arrow, {
                    marginLeft: v ? v + "px" : null
                }), val(this._text, n), show(this.el)
            }), e.prototype.hide = function(t) {
                function e() {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }, e
            }(function() {
                hide(this.el)
            }), e
        }(u["default"]);
    e["default"] = h
}, function(t, e, i) {
    var n = i(17),
        r = Math.max,
        o = Math.min;
    t.exports = function(t, e) {
        return t = n(t), 0 > t ? r(t + e, 0) : o(t, e)
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(59),
        d = n(h),
        c = i(60),
        p = n(c),
        f = i(86),
        y = n(f),
        v = i(55),
        g = n(v),
        _ = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                n.el = se('\n<div class="videoplayer_share_actions">\n  <div class="_donate">' + y.donate("_donate_icon") + '</div>\n  <div class="_like">' + y.like("_like_icon") + '</div>\n  <div class="_share">' + y.share("_share_icon") + '</div>\n  <div class="_add">' + y.add("_add_icon") + "</div>\n</div>\n    "), n._like = domByClass(n.el, "_like"), n._share = domByClass(n.el, "_share"), n._add = domByClass(n.el, "_add"), n._donate = domByClass(n.el, "_donate"), n.domListen(n._like, "click", function(t) {
                    n.player.likeVideo(r())
                }), n.attachTooltip({
                    el: n._like,
                    text: n.getLang("like"),
                    toDown: !0,
                    hideDelay: 200
                }), n.domListen(n._share, "click", function(t) {
                    n.player.shareVideo(r())
                }), n.attachTooltip({
                    el: n._share,
                    text: n.getLang("share"),
                    toDown: !0,
                    hideDelay: 200
                }), n.domListen(n._add, "click", function(t) {
                    n.player.addVideo(r())
                }), n.attachTooltip({
                    el: n._add,
                    text: function() {
                        return n.getLang(n.player.videoAdded ? "added" : "add")
                    },
                    toDown: !0,
                    hideDelay: 200
                }), n.domListen(n._donate, "click", function(t) {
                    n.player.donate(r())
                }), n.attachTooltip({
                    el: n._donate,
                    text: n.getLang("donate"),
                    toDown: !0,
                    hideDelay: 200
                });
                var r = function() {
                    return n.player.getState() === p.ENDED ? g.END_SMALL : g.INLINE
                };
                return i.on(d.VIDEO_LIKE, function(t) {
                    n.setLiked(t)
                }).on(d.VIDEO_ADD, function(t) {
                    n.setAdded(t)
                }), n
            }
            return a(e, t), e.prototype.initVideo = function(t) {
                this.setLiked(!!t.liked), this.setAdded(!!t.added), toggle(this._add, !!t.can_add), toggle(this._donate, !!t.can_donate), this.updateVisibility()
            }, e.prototype.setLiked = function(t) {
                toggleClass(this._like, "_liked", t)
            }, e.prototype.setAdded = function(t) {
                toggleClass(this._add, "_added", t)
            }, e.prototype.show = function() {
                removeClass(this.el, "hidden")
            }, e.prototype.hide = function() {
                addClass(this.el, "hidden")
            }, e.prototype.updateVisibility = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
                    e = !this.getVar("nolikes"),
                    i = t || !this.player.isPlayingLinearAd() && this.player.getState() !== p.ENDED;
                toggle(this.el, e && i)
            }, e
        }(u["default"]);
    e["default"] = _
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.screenfull = function() {
        var t = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            e = function() {
                for (var t = void 0, e = void 0, i = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], n = 0, r = i.length, o = {}; r > n; n++)
                    if (t = i[n], t && t[1] in document) {
                        for (n = 0, e = t.length; e > n; n++) o[i[0][n]] = t[n];
                        return o
                    }
                return !1
            }(),
            i = {
                request: function n(i) {
                    var n = e.requestFullscreen;
                    i = i || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? i[n]() : i[n](t && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[e.exitFullscreen]()
                },
                toggle: function(t) {
                    this.isFullscreen ? this.exit() : this.request(t)
                },
                raw: e
            };
        return e ? (Object.defineProperties(i, {
            isFullscreen: {
                get: function() {
                    return Boolean(document[e.fullscreenElement])
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[e.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return Boolean(document[e.fullscreenEnabled])
                }
            }
        }), i) : !1
    }()
}, function(t, e, i) {
    var n = i(1),
        r = i(47),
        o = i(78)("species");
    t.exports = function(t, e) {
        var i, s = n(t).constructor;
        return void 0 === s || void 0 == (i = n(s)[o]) ? e : r(i)
    }
}, function(t, e) {
    var i = 0,
        n = Math.random();
    t.exports = function(t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++i + n).toString(36))
    }
}, function(t, e, i) {
    var n = i(22),
        r = i(10),
        o = i(100);
    t.exports = function(t) {
        return function(e, i, s) {
            var a, l = n(e),
                u = r(l.length),
                h = o(s, u);
            if (t && i != i) {
                for (; u > h;)
                    if (a = l[h++], a != a) return !0
            } else
                for (; u > h; h++)
                    if ((t || h in l) && l[h] === i) return t || h;
            return !t && -1
        }
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function l(t) {
        return "string" != typeof t ? t : t.replace(new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1").replace(new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1")
    }

    function u(t, e) {
        for (var i = (t >>> 0).toString(16), n = e.toString(16); n.length < 8;) n = "0" + n;
        return i + n
    }

    function h(t) {
        return t.is_embed ? t.autoplay ? 3 : 1 : 0
    }

    function d(t, e) {
        return 400 > t || 225 > e ? 5 : 640 > t || 360 > e ? 0 : 960 > t || 540 > e ? 1 : 1280 > t || 720 > e ? 2 : 3
    }

    function c(t) {
        return 1 == t ? 2 : 2 == t ? 1 : 3
    }

    function p(t) {
        return 18 > t ? 1 : 22 > t ? 2 : 25 > t ? 3 : 28 > t ? 4 : 31 > t ? 5 : 35 > t ? 6 : 40 > t ? 7 : 45 > t ? 8 : 50 > t ? 9 : 55 > t ? 10 : 11
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var f = i(51),
        y = r(f),
        v = i(60),
        g = n(v),
        _ = i(59),
        m = n(_),
        b = i(86),
        E = n(b),
        S = 6531,
        L = 2e3,
        w = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_ads"
                }), n.videoEl = ce("video", {
                    className: "videoplayer_ads_media_el"
                }), n.domListen(n.videoEl, "click", function() {
                    return n.player.pause()
                }), n.el.appendChild(n.videoEl), n.pauseLayer = ce("div", {
                    className: "videoplayer_ads_pause_layer"
                }), n.domListen(n.pauseLayer, "click", function() {
                    return n.player.play()
                }), n.el.appendChild(n.pauseLayer), n.buildActions(), n.playerListen(m.EXPANDED, n.onPlayerExpanded), n.playerListen(m.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(m.STATE_CHANGE, n.onStateChange), n.playerListen(m.UI_CONTROLS_HIDE, n.updateOverlay), n.playerListen(m.UI_CONTROLS_SHOW, n.updateOverlay), n
            }
            return a(e, t), e.prototype.buildActions = function() {
                this.actions = se('\n<div class="videoplayer_ads_actions">\n  <div class="videoplayer_ads_timer"></div>\n  <div class="videoplayer_ads_skip"></div>\n</div>\n    '), this.actionsTimer = domByClass(this.actions, "videoplayer_ads_timer"), this.actionsSkip = domByClass(this.actions, "videoplayer_ads_skip"), this.domListen(this.actionsSkip, "click", this.onSkipClick), this.el.appendChild(this.actions)
            }, e.prototype.initVideo = function(t) {
                t.no_ads || window.AdmanHTML || !this._admanLoader || this.loadAdman()
            }, e.prototype.deinitVideo = function() {
                this.cancelAds()
            }, e.prototype.cancelAds = function() {
                this.adman && (this.adman.destroy(), this.adman = null), this._needInit = !1, this._sectionToPlay = null, this._sectionCallback = null, this._adsReady = !1
            }, e.prototype.destroy = function() {
                this._admanLoader && (this._admanLoader.destroy(), this._admanLoader = null)
            }, e.prototype.loadAdman = function() {
                var t = this;
                this._admanLoader = loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
                    timeout: L,
                    onLoad: function() {
                        return t.onAdmanLoaded()
                    },
                    onError: function() {
                        return t.onAdmanLoadingError()
                    }
                }), this.player.stats.sendAdsEvent("AdmanLoadStart")
            }, e.prototype.onAdmanLoaded = function() {
                return window.AdmanHTML ? (this._admanLoader = null, this._needInit && this.initAdman(), void this.player.stats.sendAdsEvent("AdmanLoaded")) : void this.onAdmanLoadingError()
            }, e.prototype.onAdmanLoadingError = function() {
                this._admanLoader = null, this._admanLoadingError = !0, this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null), this.player.trigger(m.ADS_WAITING, !1), this.player.stats.sendAdsEvent("AdmanLoadError")
            }, e.prototype.initAdman = function() {
                var t = this.player.getVars(),
                    e = this.player.getSize(),
                    i = {
                        _SITEZONE: t.ads_sitezone || "",
                        vk_catid: t.ads_cat || "",
                        vk_id: t.viewer_id || "",
                        pl: t.ads_pl,
                        video_id: t.ads_eid1 || "",
                        content_id: u(t.oid, t.vid),
                        dl: encodeURIComponent(t.is_embed ? t.ads_referrer : l(document.URL)),
                        duration: t.duration,
                        g: t.g,
                        a: t.a,
                        os: t.target_mob_os || "no",
                        lang: 3 == vk.lang && t.cis ? 1 : 0,
                        autoplay: t.from_autoplay ? 1 : 0,
                        player_width: e[0],
                        player_height: e[1],
                        puid1: t.ads_puid1 || "",
                        puid2: t.ads_puid2 || "",
                        puid3: this._isLiveMidroll ? 2 : 1,
                        puid4: t.ads_puid4 || "",
                        puid5: t.ads_puid5 || "",
                        puid6: t.ads_puid6 || "",
                        puid7: t.ads_puid7 || 1,
                        puid8: t.ads_puid8 || "",
                        puid9: h(t),
                        puid10: d.apply(void 0, e),
                        puid11: this.player.isFullscreen() ? 0 : 1,
                        puid12: 16,
                        puid13: c(t.g),
                        puid14: p(t.a),
                        puid15: t.ads_puid15 || "",
                        puid18: t.ads_puid18 || 0,
                        puid21: t.ads_puid21 || "",
                        puid22: t.ads_puid22 || ""
                    };
                1 == i.puid4 && 14 == i.puid5 && 86 == i.puid6 && (i.puid5 = i.puid6 = 0), -1 == t.ads_type && (i.is_xz_video = 1), t.ads_preview && (i.preview = t.ads_preview);
                var n = {
                    slot: S,
                    wrapper: this.el,
                    videoEl: this.videoEl,
                    videoQuality: e[1],
                    params: i,
                    browser: A,
                    config: T
                };
                this.adman && this.adman.destroy(), this.adman = new window.AdmanHTML, this.adman.setDebug(!1), this.adman.onReady(this.onAdsReady.bind(this)), this.adman.onStarted(this.onAdStarted.bind(this)), this.adman.onCompleted(this.onAdCompleted.bind(this)), this.adman.onTimeRemained(this.onAdTimeRemained.bind(this)), this.adman.onClicked(this.onAdCliked.bind(this)), this.adman.onClosed(this.onAdClosed.bind(this)), this.adman.onError(this.onAdError.bind(this)), this.adman.init(n), this.player.stats.sendAdsLoadStarted(), this.player.stats.sendAdsEvent("AdmanInit")
            }, e.prototype.start = function(t, e) {
                return !this.player.isInited() || this._admanLoadingError ? void(e && e()) : ("_live_midroll" == t ? (this.cancelAds(), t = "preroll", this._isLiveMidroll = !0) : this._isLiveMidroll = !1, this._sectionToPlay = t, this._sectionCallback = e, window.AdmanHTML ? this._adsReady ? this.adman.start(t) : this.adman || this.initAdman() : (this._needInit = !0, this._admanLoader || this.loadAdman()), void this.player.trigger(m.ADS_WAITING, !0))
            }, e.prototype.play = function() {
                this.adman && this.adman.resume()
            }, e.prototype.pause = function() {
                this.adman && this.adman.pause()
            }, e.prototype.stop = function() {
                this.adman && this.adman.stop()
            }, e.prototype.setVolume = function(t) {
                this.isPlayingLinear() && this.adman.setVolume(t)
            }, e.prototype.onAdsReady = function() {
                this._adsReady = !0, this._sectionToPlay && this.adman.start(this._sectionToPlay), this.player.trigger(m.ADS_WAITING, !1), this.player.stats.sendAdsEvent("AdmanReady")
            }, e.prototype.onAdStarted = function(t, e) {
                this._curSection = t, this._curBanner = e, show(this.el), "preroll" == t || "postroll" == t ? (this._actionsInited = !1, ("VPAID" != e.apiFramework || "application/javascript" == e.type) && show(this.videoEl), this.player.trigger(m.ADS_LINEAR_STARTED, t, {
                    duration: e.duration,
                    hideControls: e.showControls === !1
                }), this.adman.setVolume(this.player.isMuted() ? 0 : this.player.getVolume())) : (addClass(this.el, "no_transition"), addClass(this.el, "_overlay"), removeClassDelayed(this.el, "no_transition"), this.updateOverlay(), this.player.trigger(m.ADS_OVERLAY_STARTED)), this.player.stats.sendAdShown(t, "start"), this.player.stats.sendAdsEvent("AdmanAdStarted", t)
            }, e.prototype.onAdCompleted = function() {
                var t = this._curSection,
                    e = this._sectionToPlay;
                this._curSection = null, this._sectionToPlay = null, this._curBanner = null, this._curTime = null, t ? (hide(this.el), "preroll" == t || "postroll" == t ? (hide(this.videoEl), hide(this.actions), hide(this.pauseLayer), this.player.trigger(m.ADS_LINEAR_COMPLETED, t)) : (removeClass(this.el, "_overlay"), this.player.trigger(m.ADS_OVERLAY_COMPLETED)), this.player.stats.sendAdShown(t, "end"), this.player.stats.sendAdsEvent("AdmanAdCompleted", t)) : this.player.stats.sendAdsEvent("AdmanAdEmpty", e), this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null)
            }, e.prototype.onAdTimeRemained = function(t) {
                var e = t.currentTime,
                    i = t.duration,
                    n = t.remained,
                    r = this._curBanner;
                this._curTime = e, r && r.showControls !== !1 && (n = intval(n), val(this.actionsTimer, '<span class="_caption">' + this.getLang("ads") + '</span> <span class="_remained">' + formatTime(n) + "</span>"), r.allowClose && (e < r.allowCloseDelay ? (val(this.actionsSkip, this.getLang("ads_skip_time", {
                    time: "<b>" + Math.ceil(r.allowCloseDelay - e) + "</b>"
                })), removeClass(this.actionsSkip, "_can_skip")) : (val(this.actionsSkip, '<span class="_skip_text">' + this.getLang("ads_skip") + "</span>" + E.skipAd("_skip_icon")), addClass(this.actionsSkip, "_can_skip"))), this._actionsInited || (show(this.actions), setStyle(this.actionsSkip, {
                    display: r.allowClose && i > n ? "" : "none"
                }), this._actionsInited = !0), this.player.trigger(m.ADS_TIME_REMAINED, e, i, n))
            }, e.prototype.onAdCliked = function() {
                this.player.stats.sendAdsEvent("AdmanClicked", this._curSection)
            }, e.prototype.onAdClosed = function() {
                this.player.stats.sendAdsEvent("AdmanClosed", this._curSection), this.onAdCompleted()
            }, e.prototype.onAdError = function() {
                debugLog("video ad error"), this.player.stats.sendAdsEvent("AdmanError"), this._adsReady = !0, this.onAdCompleted()
            }, e.prototype.onSkipClick = function(t) {
                hasClass(this.actionsSkip, "_can_skip") && this.adman.skip()
            }, e.prototype.isLoading = function() {
                return !!this._sectionToPlay && !this._admanLoadingError && (this._admanLoader || !this._adsReady)
            }, e.prototype.isPlayingLinear = function() {
                return "preroll" == this._curSection || "postroll" == this._curSection
            }, e.prototype.isPlayingOverlay = function() {
                return "overlay" == this._curSection
            }, e.prototype.curTime = function() {
                return this._curTime || 0
            }, e.prototype.getDuration = function() {
                return intval(this._curBanner && this._curBanner.duration)
            }, e.prototype.resize = function(t, e) {
                toggleClass(this.actions, "_min_size", 400 > t), this.updateOverlay()
            }, e.prototype.canShowOverlay = function() {
                var t = this.player.getSize(),
                    e = t[0] >= 500 && t[1] >= 280,
                    i = this.player.getState() === g.PLAYING,
                    n = this.player.isControlsVisible();
                return e && i && n
            }, e.prototype.updateOverlay = function() {
                var t = this.canShowOverlay();
                t ? (this.isPlayingOverlay() && this.adman.resume(), removeClass(this.el, "_overlay_hidden")) : (this.isPlayingOverlay() && this.adman.pause(), addClass(this.el, "_overlay_hidden"))
            }, e.prototype.onPlayerExpanded = function() {
                this.adman && this.player.getState() === g.PLAYING && this.adman.resume()
            }, e.prototype.onFullscreenChange = function(t) {
                (this.isPlayingLinear() || this.isPlayingOverlay()) && this.adman.setFullscreen(t)
            }, e.prototype.onStateChange = function(t) {
                this.updateOverlay(), this.isPlayingLinear() && toggle(this.pauseLayer, t !== g.PLAYING)
            }, e
        }(y["default"]);
    e["default"] = w;
    var A = {
            mobile: browser.mobile,
            FLASH_BLOCKED: 0,
            FLASH_READY: 1,
            FLASH_UNKNOWN: 2,
            checkFlashStatus: function(t) {
                t(browser.flash ? this.FLASH_READY : this.FLASH_BLOCKED)
            }
        },
        T = {
            vpaidJsInterface: locProtocol + "//ad.mail.ru/static/vpaid-js-interface.swf"
        }
}, function(t, e, i) {
    var n = i(1),
        r = i(72),
        o = i(20),
        s = i(37)("IE_PROTO"),
        a = function() {},
        l = "prototype",
        u = function() {
            var t, e = i(62)("iframe"),
                n = o.length,
                r = ">";
            for (e.style.display = "none", i(74).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object</script" + r), t.close(), u = t.F; n--;) delete u[l][o[n]];
            return u()
        };
    t.exports = Object.create || function(t, e) {
        var i;
        return null !== t ? (a[l] = n(t), i = new a, a[l] = null, i[s] = t) : i = u(), void 0 === e ? i : r(i, e)
    }
}, function(t, e, i) {
    var n = i(78)("iterator"),
        r = !1;
    try {
        var o = [7][n]();
        o["return"] = function() {
            r = !0
        }, Array.from(o, function() {
            throw 2
        })
    } catch (s) {}
    t.exports = function(t, e) {
        if (!e && !r) return !1;
        var i = !1;
        try {
            var o = [7],
                s = o[n]();
            s.next = function() {
                i = !0
            }, o[n] = function() {
                return s
            }, t(o)
        } catch (a) {}
        return i
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(60),
        d = n(h),
        c = i(59),
        p = n(c),
        f = i(63),
        y = n(f),
        v = i(49),
        g = r(v),
        _ = i(99),
        m = r(_),
        b = i(46),
        E = r(b),
        S = i(96),
        L = r(S),
        w = i(86),
        A = n(w),
        T = i(102),
        k = i(90),
        C = n(k),
        P = i(56),
        I = r(P),
        D = function(t) {
            function e(i) {
                o(this, e);
                var n = s(this, t.call(this, i));
                return n.buildEl(), n.buildTimelineSlider(), n.buildVolumeSlider(), n.buildQualitySelect(), n._isTimeReversed = !!I["default"].get("video_time_reversed"), n.playerListen(p.STATE_CHANGE, n.onStateChange), n.playerListen(p.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(p.MEDIA_TIMEUPDATE, n.onMediaTimeupdate), n.playerListen(p.MEDIA_PROGRESS, n.updateBuffered), n.playerListen(p.MEDIA_VOLUMECHANGE, n.updateVolume), n.playerListen(p.MEDIA_DURATIONCHANGE, n.updateDuration), n.playerListen(p.QUALITIES_LIST_CHANGE, n.onQualitiesListChange), n.playerListen(p.SEEK, n.onSeek), n.playerListen(p.EXPANDED, function() {
                    n.toggleControl(n.btnExpand, !1)
                }), n.playerListen(p.ADS_LINEAR_STARTED, n.onLinearAdStarted), n.playerListen(p.ADS_LINEAR_COMPLETED, n.onLinearAdCompleted), n.playerListen(p.ADS_TIME_REMAINED, function(t, e, i) {
                    n.updateTime(t)
                }), n.playerListen(p.LIVE_PHASE_CHANGE, n.onLivePhaseChange), n
            }
            return a(e, t), e.prototype.buildEl = function() {
                var t = this;
                this.el = se('\n<div class="videoplayer_controls">\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_play" role="button" tabindex="0" aria-label="' + this.getLang("play") + '">\n    ' + A.play("videoplayer_btn_icon videoplayer_play_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_next" role="button" tabindex="0" aria-label="' + this.getLang("next") + '">\n    ' + A.next("videoplayer_btn_icon videoplayer_next_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_live" style="display:none;">\n    ' + A.live("videoplayer_btn_icon videoplayer_live_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_live_app" style="display:none;">\n    <a href="//vk.cc/liveapp" target="_blank" class="videoplayer_live_app_link">' + this.getLang("live_download_app") + '</a>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_timeline"></div>\n  <div class="videoplayer_controls_item videoplayer_time">\n    <span class="_time_current"></span><span class="_time_duration"></span>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_mute" role="button" tabindex="0" aria-label="' + this.getLang("volume_off") + '">\n    ' + A.volume("videoplayer_btn_icon videoplayer_volume_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_volume"></div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_expand" style="display:none;" role="button" tabindex="0" aria-label="' + this.getLang("expand") + '">\n    ' + A.expand("videoplayer_btn_icon videoplayer_expand_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_fullscreen" role="button" tabindex="0" aria-label="' + this.getLang("aria_enter_fullscreen") + '">\n    ' + A.fullscreen("videoplayer_btn_icon videoplayer_fullscreen_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_quality" role="button" tabindex="0" aria-haspopup="true" aria-label="' + this.getLang("hdsd") + '"></div>\n  <a class="videoplayer_controls_item videoplayer_btn videoplayer_btn_vk" style="display:none;" target="_blank" aria-label="' + this.getLang("goto_orig_video") + '">\n    ' + A.vk("videoplayer_btn_icon videoplayer_vk_icon") + "\n  </a>\n</div>\n    "), this.btnPlay = domByClass(this.el, "videoplayer_btn_play"), this.btnNext = domByClass(this.el, "videoplayer_btn_next"), this.btnMute = domByClass(this.el, "videoplayer_btn_mute"), this.btnMuteIcon = domByClass(this.el, "videoplayer_volume_icon"), this.btnExpand = domByClass(this.el, "videoplayer_btn_expand"), this.btnFullscreen = domByClass(this.el, "videoplayer_btn_fullscreen"), this.btnLogo = domByClass(this.el, "videoplayer_btn_vk"), this.liveLabel = domByClass(this.el, "videoplayer_live"), this.liveApp = domByClass(this.el, "videoplayer_live_app"), this.liveAppLink = domByClass(this.el, "videoplayer_live_app_link"), this.timeLabel = domByClass(this.el, "videoplayer_time"), this.timeLabelCurrent = domByClass(this.timeLabel, "_time_current"), this.timeLabelDuration = domByClass(this.timeLabel, "_time_duration"), this.timelineContainer = domByClass(this.el, "videoplayer_timeline"), this.volumeContainer = domByClass(this.el, "videoplayer_volume"), this.domListen(this.btnPlay, "click", function() {
                    return t.player.togglePlay()
                }), this.domListen(this.btnNext, "click", function() {
                    return t.player.nextVideo()
                }), this.domListen(this.btnMute, "click", function() {
                    return t.player.toggleMute()
                }), this.domListen(this.btnMute, "mouseenter", this.onVolumeOver), this.domListen(this.btnMute, "mouseleave", this.onVolumeOut), this.domListen(this.btnExpand, "click", function() {
                    return t.player.expand()
                }), this.domListen(this.btnFullscreen, "click", function() {
                    return t.player.toggleFullscreen()
                }), this.domListen(this.timeLabel, "click", this.toggleTime), this.domListen(this.volumeContainer, "mouseenter", this.onVolumeOver), this.domListen(this.volumeContainer, "mouseleave", this.onVolumeOut), this.attachTooltip({
                    el: this.btnNext,
                    text: this.getLang("next"),
                    offsetY: -4
                }), this.attachTooltip({
                    el: this.btnMute,
                    text: function() {
                        return t._minSize ? "" : t.getLang(t.player.isMuted() ? "volume_on" : "volume_off")
                    },
                    offsetY: -4
                }), this.attachTooltip({
                    el: this.btnExpand,
                    text: this.getLang("open_popup"),
                    offsetY: -2,
                    hideOnClick: !0
                }), this.attachTooltip({
                    el: this.btnFullscreen,
                    text: this.getLang("fullscreen"),
                    offsetY: -2,
                    hideOnClick: !0
                }), this.attachTooltip({
                    el: this.btnLogo,
                    text: this.getLang("goto_orig_video"),
                    offsetY: -4
                }), T.screenfull.enabled || this.toggleControl(this.btnFullscreen, !1)
            }, e.prototype.buildTimelineSlider = function() {
                this.timelinePreview = new m["default"](this.player), this.timelineContainer.appendChild(this.timelinePreview.el), this.timelineSlider = new g["default"](this.player, this, this.timelinePreview), this.timelineContainer.appendChild(this.timelineSlider.el)
            }, e.prototype.buildVolumeSlider = function() {
                var t = this;
                this.volumeSlider = new E["default"](this.player), this.volumeContainer.appendChild(this.volumeSlider.el), this.delay(function() {
                    t.updateVolume(t.player.isMuted() ? 0 : t.player.getVolume())
                }, 0)
            }, e.prototype.buildQualitySelect = function() {
                this.qualityLabel = domByClass(this.el, "videoplayer_quality"), this.qualitySelect = new L["default"](this.player, this.qualityLabel), this.qualityLabel.appendChild(this.qualitySelect.el)
            }, e.prototype.initVideo = function(t) {
                C.setText(this.timeLabelCurrent, formatTime(0)), C.setText(this.timeLabelDuration, formatTime(this.player.getDuration())), this.toggleControl(this.timelineSlider.el, this.isControlAvailable("timeline")), this.toggleControl(this.timeLabel, this.isControlAvailable("time_label")), this.toggleControl(this.liveLabel, this.isControlAvailable("live_label")), this.toggleControl(this.liveApp, this.isControlAvailable("live_app")), attr(this.liveAppLink, "href", "//vk.cc/liveapp" + (t.target_mob_os ? "?" + t.target_mob_os : "")), this.toggleControl(this.btnNext, this.isControlAvailable("next")), this.toggleControl(this.btnExpand, this.isControlAvailable("expand")), this.toggleControl(this.btnFullscreen, this.isControlAvailable("fullscreen")), this.toggleControl(this.btnLogo, this.isControlAvailable("logo")), attr(this.btnLogo, "href", "/video" + t.oid + "_" + t.vid), this.toggleControl(this.qualityLabel, this.isControlAvailable("quality")), toggleClass(this.el, "_lite_controls", !!t.app_promo), toggleClass(this.el, "_has_quality", this.isControlAvailable("quality")), toggleClass(this.el, "_has_logo", this.isControlAvailable("logo")), this.timelineSlider.enable(), this.qualitySelect.enable(), this.startTimelineAnimation()
            }, e.prototype.deinitVideo = function() {
                C.setText(this.timeLabelCurrent, formatTime(0)), C.setText(this.timeLabelDuration, formatTime(0)), this.stopTimelineAnimation(), this.timelineSlider.setLoaded(0), this.timelineSlider.setFilled(0), this.timelineSlider.disable(), this.timelinePreview.hide(), this.qualitySelect.disable()
            }, e.prototype.toggleControl = function(t, e) {
                setStyle(t, {
                    display: e ? "" : "none"
                })
            }, e.prototype.isControlAvailable = function(t) {
                var e = this.player.getVars();
                switch (t) {
                    case "next":
                        return !!e.show_next && !this.player.isActiveLive();
                    case "timeline":
                    case "time_label":
                        return !e.live || this.player.getLivePhase() == y.ENDED;
                    case "live_label":
                        return this.player.isActiveLive();
                    case "live_app":
                        return this.player.isActiveLive() && !!e.live_app_btn;
                    case "expand":
                        return !!e.is_inline && !e.app_promo;
                    case "fullscreen":
                        return !!T.screenfull.enabled && !e.app_promo;
                    case "quality":
                        return !e.app_promo && this.player.getAvailableQualities().length > 1;
                    case "logo":
                        return !!e.is_embed;
                    default:
                        return !1
                }
            }, e.prototype.toggle = function(t) {
                this._hidden = !t, toggleClass(this.el, "hidden", this._hidden)
            }, e.prototype.show = function() {
                this.toggle(!0)
            }, e.prototype.hide = function() {
                this.toggle(!1)
            }, e.prototype.onStateChange = function(t, e) {
                var i = this.getLang(this.player.getState() === d.PLAYING ? "pause" : "play");
                attr(this.btnPlay, "aria-label", i), t === d.ERROR ? this.timelineSlider.disable() : e === d.ERROR && this.timelineSlider.enable()
            }, e.prototype.onFullscreenChange = function() {
                var t = this.getLang(this.player.isFullscreen() ? "aria_exit_fullscreen" : "aria_enter_fullscreen");
                attr(this.btnFullscreen, "aria-label", t)
            }, e.prototype.onMediaTimeupdate = function(t) {
                this.timelineSlider.dragging || this.updateTime(t)
            }, e.prototype.startTimelineAnimation = function() {
                var t = this;
                if (!this._timelineAnimationRequestId && window.cancelAnimationFrame) {
                    var e = function i() {
                        if (!t._hidden && t.player.getState() === d.PLAYING && !t.player.isActiveLive() && !t.timelineSlider.dragging) {
                            var e = t.player.curTime(),
                                n = t.player.getDuration();
                            if (e && n) {
                                var r = e / n;
                                t.timelineSlider.setFilled(r, !1)
                            }
                        }
                        t._timelineAnimationRequestId = requestAnimationFrame(i)
                    };
                    e()
                }
            }, e.prototype.stopTimelineAnimation = function() {
                this._timelineAnimationRequestId && (cancelAnimationFrame(this._timelineAnimationRequestId), this._timelineAnimationRequestId = null)
            }, e.prototype.updateBuffered = function(t) {
                this.timelineSlider.setLoaded(t)
            }, e.prototype.updateVolume = function(t) {
                this.volumeSlider.dragging || this.volumeSlider.setFilled(t);
                var e = void 0;
                e = t > .5 ? "max" : t > .2 ? "mid" : t > 0 ? "min" : "off", attr(this.btnMuteIcon, "data-value", e);
                var i = this.getLang(t ? "volume_off" : "volume_on");
                attr(this.btnMute, "aria-label", i)
            }, e.prototype.updateDuration = function(t) {
                var e = this;
                this.player.isPlayingLinearAd() || (this.timelineSlider.updateAria(), C.setText(this.timeLabelDuration, formatTime(t)), this.delay(function() {
                    e.resize.apply(e, e.player.getSize())
                }, 0))
            }, e.prototype.updateTime = function(t) {
                var e = this.player.getDuration(),
                    i = t / e;
                this.timelineSlider.setFilled(i);
                var n = formatTime(this._minSize && this._isTimeReversed ? e - t : t);
                this.timeLabelCurrent.textContent = n
            }, e.prototype.updateTimeWidth = function() {
                var t = val(this.timeLabelCurrent),
                    e = formatTime(this.player.getDuration()).replace(/\d/g, "8");
                setStyle(this.timeLabel, {
                    minWidth: ""
                }), C.setText(this.timeLabelCurrent, e), setStyle(this.timeLabel, {
                    minWidth: getStyle(this.timeLabel, "width")
                }), C.setText(this.timeLabelCurrent, t)
            }, e.prototype.toggleTime = function() {
                this._minSize && (this._isTimeReversed = !this._isTimeReversed, I["default"].set("video_time_reversed", this._isTimeReversed ? 1 : 0), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed), this.updateTime(this.player.curTime()))
            }, e.prototype.resize = function(t, e) {
                var i = this;
                this._minSize = 550 > t, setStyle(this.timeLabel, {
                    cursor: this._minSize ? "pointer" : ""
                }), toggle(this.timeLabelDuration, !this._minSize), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed && this._minSize), this.updateTime(this.player.curTime()), this.updateTimeWidth();
                var n = this._minSize;
                setStyle(this.volumeContainer, {
                    padding: n ? "0" : ""
                }), this.volumeSlider.setVertical(n), this.volumeSlider.toggleVisibility(!n);
                var r = [this.btnMute];
                this.player.isInited() && (this.isControlAvailable("timeline") && r.unshift(this.timelineSlider.el), this.isControlAvailable("time_label") && r.unshift(this.timeLabel), this.isControlAvailable("quality") && r.unshift(this.qualityLabel)), each(r, function(t, e) {
                    return show(e)
                }), each(r, function(t, e) {
                    return i.el.offsetWidth <= i.player.el.offsetWidth ? !1 : void i.toggleControl(e, !1)
                }), toggleClass(this.el, "_has_quality", isVisible(this.qualityLabel))
            }, e.prototype.isActive = function() {
                return this.timelineSlider.dragging || this.volumeSlider.dragging || this.qualitySelect.isOpen()
            }, e.prototype.onVolumeOver = function() {
                this._minSize && (this.volumeSlider.toggleVisibility(!0), this.undelay(this._hideVolumeSliderTimeout))
            }, e.prototype.onVolumeOut = function() {
                var t = this;
                this._minSize && (this._hideVolumeSliderTimeout = this.delay(function() {
                    t.volumeSlider.toggleVisibility(!1)
                }, 100))
            }, e.prototype.onLivePhaseChange = function(t) {
                toggle(this.timelineSlider.el, this.isControlAvailable("timeline")), toggle(this.timeLabel, this.isControlAvailable("time_label")), toggle(this.liveLabel, this.isControlAvailable("live_label")), toggle(this.liveApp, this.isControlAvailable("live_app"))
            }, e.prototype.onQualitiesListChange = function(t) {
                if (!this._minSize) {
                    var e = this.isControlAvailable("quality");
                    toggle(this.qualityLabel, e), toggleClass(this.el, "_has_quality", e)
                }
            }, e.prototype.onSeek = function(t) {
                var e = t / this.player.getDuration();
                this.timelineSlider.setFilled(e), C.setText(this.timeLabelCurrent, formatTime(t))
            }, e.prototype.onLinearAdStarted = function(t, e) {
                var i = this,
                    n = e.duration;
                this.timelineSlider.disable(), this.timelinePreview.hide(), this.qualitySelect.disable(), C.setText(this.timeLabelDuration, formatTime(intval(n))), this.updateTime(0), this.delay(function() {
                    i.resize.apply(i, i.player.getSize())
                }, 0)
            }, e.prototype.onLinearAdCompleted = function(t) {
                var e = this;
                this.timelineSlider.enable(), this.qualitySelect.enable(), C.setText(this.timeLabelDuration, formatTime(this.player.getDuration())), this.updateTime(this.player.curTime()), this.delay(function() {
                    e.resize.apply(e, e.player.getSize())
                }, 0)
            }, e
        }(u["default"]);
    e["default"] = D
}, function(t, e, i) {
    var n = i(71),
        r = i(78)("iterator"),
        o = Array.prototype;
    t.exports = function(t) {
        return void 0 !== t && (n.Array === t || o[r] === t)
    }
}, function(t, e, i) {
    var n, r, o, s = i(85),
        a = i(19).set,
        l = s.MutationObserver || s.WebKitMutationObserver,
        u = s.process,
        h = s.Promise,
        d = "process" == i(61)(u),
        c = function() {
            var t, e;
            for (d && (t = u.domain) && t.exit(); n;) e = n.fn, e(), n = n.next;
            r = void 0, t && t.enter()
        };
    if (d) o = function() {
        u.nextTick(c)
    };
    else if (l) {
        var p = !0,
            f = document.createTextNode("");
        new l(c).observe(f, {
            characterData: !0
        }), o = function() {
            f.data = p = !p
        }
    } else o = h && h.resolve ? function() {
        h.resolve().then(c)
    } : function() {
        a.call(s, c)
    };
    t.exports = function(t) {
        var e = {
            fn: t,
            next: void 0
        };
        r && (r.next = e), n || (n = e, o()), r = e
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e["default"] = t, e
    }

    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = i(51),
        u = r(l),
        h = i(90),
        d = n(h),
        c = function(t) {
            function e(i, n) {
                o(this, e);
                var r = s(this, t.call(this, i));
                return r.el = r.buildEl(), r._transformProp = d.getCssProp("transform"), r._loaded = domByClass(r.el, "_loaded"), r._filled = domByClass(r.el, "_filled"), r._handle = domByClass(r.el, "_handle"), r._handleWrap = domByClass(r.el, "_handle_wrap"), r._callbacks = n || {}, r.domListen(r.el, "mousemove", r.onMove), r.domListen(r.el, "mouseleave", r.onOut), r.domListen(r.el, "mousedown", r.onMouseDown), r.domListen(r.el, "keydown", r.onKeydown), r
            }
            return a(e, t), e.prototype.buildEl = function() {
                return se('\n<div class="videoplayer_slider" tabindex="0" role="slider">\n  <div class="_bars_wrap">\n    <div class="_loaded"></div>\n    <div class="_filled"></div>\n  </div>\n  <div class="_handle_wrap">\n    <div class="_handle"></div>\n  </div>\n</div>\n    ')
            }, e.prototype.initAria = function(t) {
                attr(this.el, "aria-label", t.label), attr(this.el, "aria-valuemin", t.valuemin), attr(this.el, "aria-valuemax", t.valuemax), this._ariaValues = t, this.updateAriaValue(this._filledPercent || 0)
            }, e.prototype.updateAriaValue = function(t) {
                if (this._ariaValues) {
                    var e = this._ariaValues,
                        i = e.valuemin + Math.round((e.valuemax - e.valuemin) * t),
                        n = e.valuetext(i, e.valuemin, e.valuemax);
                    attr(this.el, "aria-valuenow", i), attr(this.el, "aria-valuetext", n)
                }
            }, e.prototype.setLoaded = function(t) {
                t = Math.min(1, Math.max(0, t));
                var e = void 0,
                    i = void 0;
                this._transformProp ? (e = this._transformProp, i = "translateX(" + 100 * t + "%)") : (e = "marginLeft", i = 100 * t + "%"), setStyle(this._loaded, e, i)
            }, e.prototype.setFilled = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                t = Math.min(1, Math.max(0, t));
                var i = void 0,
                    n = void 0;
                this._transformProp ? (i = this._transformProp, n = "translateX(" + 100 * t + "%)") : (i = "marginLeft", n = 100 * t + "%"), setStyle(this._filled, i, n), setStyle(this._handleWrap, i, n), this._filledPercent = t, e && this.updateAriaValue(t)
            }, e.prototype.disable = function() {
                this._disabled = !0, addClass(this.el, "_disabled")
            }, e.prototype.enable = function() {
                this._disabled = !1, removeClass(this.el, "_disabled")
            }, e.prototype.onMove = function(t) {
                if (!this._disabled) {
                    var e = this._getMouseProgress(t);
                    this._callbacks.mousemove && this._callbacks.mousemove(e)
                }
            }, e.prototype.onOut = function(t) {
                this._disabled || this._callbacks.mouseout && this._callbacks.mouseout()
            }, e.prototype.onMouseDown = function(t) {
                if (!this._disabled) {
                    this.dragging = !0, addClass(this.el, "_dragging"), this.domListen(window, "mousemove", this.onMouseMove), this.domListen(document, "selectstart", this.onSelectStart), this.domListenOnce(window, "mouseup", this.onMouseUp);
                    var e = this._getMouseProgress(t);
                    this.setFilled(e);
                    var i = t.target == this._handle;
                    this._callbacks.dragStart && this._callbacks.dragStart(e, i), this.player.onTouchedByUser()
                }
            }, e.prototype.onMouseMove = function(t) {
                if (!this._disabled) {
                    var e = this._getMouseProgress(t);
                    this.setFilled(e), this._callbacks.drag && this._callbacks.drag(e), t.preventDefault()
                }
            }, e.prototype.onMouseUp = function(t) {
                if (!this._disabled) {
                    this.dragging = !1, removeClass(this.el, "_dragging"), this.domUnlisten(window, "mousemove", this.onMouseMove), this.domUnlisten(document, "selectstart", this.onSelectStart);
                    var e = this._getMouseProgress(t);
                    this.setFilled(e), this.hidden && this.toggleVisibility(!1), this._callbacks.dragEnd && this._callbacks.dragEnd(e)
                }
            }, e.prototype.onSelectStart = function(t) {
                t.preventDefault()
            }, e.prototype._getMouseProgress = function(t) {
                var e = this.el.getBoundingClientRect(),
                    i = void 0;
                if (this.vertical) {
                    var n = t.pageY - window.scrollGetY();
                    i = (e.height - (n - e.top)) / e.height
                } else i = (t.pageX - window.scrollGetX() - e.left) / e.width;
                return Math.max(0, Math.min(1, i))
            }, e.prototype.onKeydown = function(t) {
                var e = void 0;
                switch (t.keyCode) {
                    case KEY.LEFT:
                    case KEY.DOWN:
                        e = -1;
                        break;
                    case KEY.RIGHT:
                    case KEY.UP:
                        e = 1;
                        break;
                    default:
                        return
                }
                this._callbacks.keyboardSlide && this._callbacks.keyboardSlide(e, t.altKey)
            }, e.prototype.setVertical = function(t) {
                this.vertical = t, toggleClass(this.el, "_vertical", t)
            }, e.prototype.toggleVisibility = function(t) {
                this.hidden = !t, this.dragging || toggleClass(this.el, "hidden", !t)
            }, e
        }(u["default"]);
    e["default"] = c
}, function(t, e) {
    t.exports = !0
}]);