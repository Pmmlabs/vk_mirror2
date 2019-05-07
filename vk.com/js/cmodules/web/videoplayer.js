! function(t) {
    function e(e) {
        for (var n, s, a = e[0], l = e[1], u = e[2], c = 0, d = []; c < a.length; c++) s = a[c], r[s] && d.push(r[s][0]), r[s] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (t[n] = l[n]);
        for (h && h(e); d.length;) d.shift()();
        return o.push.apply(o, u || []), i()
    }

    function i() {
        for (var t, e = 0; e < o.length; e++) {
            for (var i = o[e], n = !0, a = 1; a < i.length; a++) {
                var l = i[a];
                0 !== r[l] && (n = !1)
            }
            n && (o.splice(e--, 1), t = s(s.s = i[0]))
        }
        return t
    }
    var n = {},
        r = {
            "web/videoplayer": 0
        },
        o = [];

    function s(e) {
        if (n[e]) return n[e].exports;
        var i = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, s), i.l = !0, i.exports
    }
    s.m = t, s.c = n, s.d = function(t, e, i) {
        s.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, s.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, s.t = function(t, e) {
        if (1 & e && (t = s(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (s.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) s.d(i, n, function(e) {
                return t[e]
            }.bind(null, n));
        return i
    }, s.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return s.d(e, "a", e), e
    }, s.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, s.p = "";
    var a = window.webpackJsonp = window.webpackJsonp || [],
        l = a.push.bind(a);
    a.push = e, a = a.slice();
    for (var u = 0; u < a.length; u++) e(a[u]);
    var h = l;
    o.push([149, "common"]), i()
}({
    "+SFK": function(t, e, i) {
        i("AUvm"), i("wgeU"), t.exports = i("WEpk").Symbol
    },
    149: function(t, e, i) {
        t.exports = i("bvfi")
    },
    "29s/": function(t, e, i) {
        var n = i("5T2Y"),
            r = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
        t.exports = function(t) {
            return r[t] || (r[t] = {})
        }
    },
    "2GTP": function(t, e, i) {
        var n = i("eaoh");
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
    },
    "2faE": function(t, e, i) {
        var n = i("5K7Z"),
            r = i("eUtF"),
            o = i("G8Mo"),
            s = Object.defineProperty;
        e.f = i("jmDH") ? Object.defineProperty : function(t, e, i) {
            if (n(t), e = o(e, !0), n(i), r) try {
                return s(t, e, i)
            } catch (t) {}
            if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
            return "value" in i && (t[e] = i.value), t
        }
    },
    "5K7Z": function(t, e, i) {
        var n = i("93I4");
        t.exports = function(t) {
            if (!n(t)) throw TypeError(t + " is not an object!");
            return t
        }
    },
    "5T2Y": function(t, e) {
        var i = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = i)
    },
    "5vMV": function(t, e, i) {
        var n = i("B+OT"),
            r = i("NsO/"),
            o = i("W070")(!1),
            s = i("VVlx")("IE_PROTO");
        t.exports = function(t, e) {
            var i, a = r(t),
                l = 0,
                u = [];
            for (i in a) i != s && n(a, i) && u.push(i);
            for (; e.length > l;) n(a, i = e[l++]) && (~o(u, i) || u.push(i));
            return u
        }
    },
    "6/1s": function(t, e, i) {
        var n = i("YqAc")("meta"),
            r = i("93I4"),
            o = i("B+OT"),
            s = i("2faE").f,
            a = 0,
            l = Object.isExtensible || function() {
                return !0
            },
            u = !i("KUxP")(function() {
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
            c = t.exports = {
                KEY: n,
                NEED: !1,
                fastKey: function(t, e) {
                    if (!r(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                    if (!o(t, n)) {
                        if (!l(t)) return "F";
                        if (!e) return "E";
                        h(t)
                    }
                    return t[n].i
                },
                getWeak: function(t, e) {
                    if (!o(t, n)) {
                        if (!l(t)) return !0;
                        if (!e) return !1;
                        h(t)
                    }
                    return t[n].w
                },
                onFreeze: function(t) {
                    return u && c.NEED && l(t) && !o(t, n) && h(t), t
                }
            }
    },
    "6AMp": function(t, e, i) {
        var n = i("Ojgd"),
            r = Math.max,
            o = Math.min;
        t.exports = function(t, e) {
            return (t = n(t)) < 0 ? r(t + e, 0) : o(t, e)
        }
    },
    "6tYh": function(t, e, i) {
        var n = i("93I4"),
            r = i("5K7Z"),
            o = function(t, e) {
                if (r(t), !n(e) && null !== e) throw TypeError(e + ": can't set as prototype!")
            };
        t.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, e, n) {
                try {
                    (n = i("2GTP")(Function.call, i("vwuL").f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array)
                } catch (t) {
                    e = !0
                }
                return function(t, i) {
                    return o(t, i), e ? t.__proto__ = i : n(t, i), t
                }
            }({}, !1) : void 0),
            check: o
        }
    },
    "8gHz": function(t, e, i) {
        var n = i("5K7Z"),
            r = i("eaoh"),
            o = i("UWiX")("species");
        t.exports = function(t, e) {
            var i, s = n(t).constructor;
            return void 0 === s || void 0 == (i = n(s)[o]) ? e : r(i)
        }
    },
    "93I4": function(t, e) {
        t.exports = function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }
    },
    A5Xg: function(t, e, i) {
        var n = i("NsO/"),
            r = i("ar/p").f,
            o = {}.toString,
            s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        t.exports.f = function(t) {
            return s && "[object Window]" == o.call(t) ? function(t) {
                try {
                    return r(t)
                } catch (t) {
                    return s.slice()
                }
            }(t) : r(n(t))
        }
    },
    AUvm: function(t, e, i) {
        "use strict";
        var n = i("5T2Y"),
            r = i("WEpk"),
            o = i("B+OT"),
            s = i("jmDH"),
            a = i("Y7ZC"),
            l = i("kTiW"),
            u = i("6/1s").KEY,
            h = i("KUxP"),
            c = i("29s/"),
            d = i("RfKB"),
            p = i("YqAc"),
            f = i("UWiX"),
            y = i("XVRT"),
            v = i("R+7+"),
            g = i("kAMH"),
            _ = i("5K7Z"),
            m = i("NsO/"),
            b = i("G8Mo"),
            w = i("rr1i"),
            S = i("oVml"),
            k = i("A5Xg"),
            L = i("vwuL"),
            T = i("2faE"),
            E = L.f,
            C = T.f,
            P = k.f,
            A = n.Symbol,
            x = n.JSON,
            V = x && x.stringify,
            I = !1,
            M = f("_hidden"),
            R = f("toPrimitive"),
            O = {}.propertyIsEnumerable,
            D = c("symbol-registry"),
            B = c("symbols"),
            F = Object.prototype,
            N = "function" == typeof A,
            j = n.QObject,
            H = s && h(function() {
                return 7 != S(C({}, "a", {
                    get: function() {
                        return C(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }) ? function(t, e, i) {
                var n = E(F, e);
                n && delete F[e], C(t, e, i), n && t !== F && C(F, e, n)
            } : C,
            U = function(t) {
                var e = B[t] = S(A.prototype);
                return e._k = t, s && I && H(F, t, {
                    configurable: !0,
                    set: function(e) {
                        o(this, M) && o(this[M], t) && (this[M][t] = !1), H(this, t, w(1, e))
                    }
                }), e
            },
            z = N && "symbol" == typeof A.iterator ? function(t) {
                return "symbol" == typeof t
            } : function(t) {
                return t instanceof A
            },
            Q = function(t, e, i) {
                return _(t), e = b(e, !0), _(i), o(B, e) ? (i.enumerable ? (o(t, M) && t[M][e] && (t[M][e] = !1), i = S(i, {
                    enumerable: w(0, !1)
                })) : (o(t, M) || C(t, M, w(1, {})), t[M][e] = !0), H(t, e, i)) : C(t, e, i)
            },
            W = function(t, e) {
                _(t);
                for (var i, n = v(e = m(e)), r = 0, o = n.length; o > r;) Q(t, i = n[r++], e[i]);
                return t
            },
            q = function(t) {
                var e = O.call(this, t = b(t, !0));
                return !(e || !o(this, t) || !o(B, t) || o(this, M) && this[M][t]) || e
            },
            G = function(t, e) {
                var i = E(t = m(t), e = b(e, !0));
                return !i || !o(B, e) || o(t, M) && t[M][e] || (i.enumerable = !0), i
            },
            Y = function(t) {
                for (var e, i = P(m(t)), n = [], r = 0; i.length > r;) o(B, e = i[r++]) || e == M || e == u || n.push(e);
                return n
            },
            K = function(t) {
                for (var e, i = P(m(t)), n = [], r = 0; i.length > r;) o(B, e = i[r++]) && n.push(B[e]);
                return n
            },
            X = h(function() {
                var t = A();
                return "[null]" != V([t]) || "{}" != V({
                    a: t
                }) || "{}" != V(Object(t))
            });
        N || (l((A = function() {
            if (this instanceof A) throw TypeError("Symbol is not a constructor!");
            return U(p(arguments.length > 0 ? arguments[0] : void 0))
        }).prototype, "toString", function() {
            return this._k
        }), L.f = G, T.f = Q, i("ar/p").f = k.f = Y, i("NV0k").f = q, i("mqlF").f = K, s && !i("uOPS") && l(F, "propertyIsEnumerable", q, !0)), a(a.G + a.W + a.F * !N, {
            Symbol: A
        });
        for (var J = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), Z = 0; J.length > Z;) {
            var $ = J[Z++],
                tt = r.Symbol,
                et = f($);
            $ in tt || C(tt, $, {
                value: N ? et : U(et)
            })
        }
        j && j.prototype && j.prototype.findChild || (I = !0), a(a.S + a.F * !N, "Symbol", {
            for: function(t) {
                return o(D, t += "") ? D[t] : D[t] = A(t)
            },
            keyFor: function(t) {
                if (z(t)) return y(D, t);
                throw TypeError(t + " is not a symbol!")
            },
            useSetter: function() {
                I = !0
            },
            useSimple: function() {
                I = !1
            }
        }), a(a.S + a.F * !N, "Object", {
            create: function(t, e) {
                return void 0 === e ? S(t) : W(S(t), e)
            },
            defineProperty: Q,
            defineProperties: W,
            getOwnPropertyDescriptor: G,
            getOwnPropertyNames: Y,
            getOwnPropertySymbols: K
        }), x && a(a.S + a.F * (!N || X), "JSON", {
            stringify: function(t) {
                if (void 0 !== t && !z(t)) {
                    for (var e, i, n = [t], r = 1; arguments.length > r;) n.push(arguments[r++]);
                    return "function" == typeof(e = n[1]) && (i = e), !i && g(e) || (e = function(t, e) {
                        if (i && (e = i.call(this, t, e)), !z(e)) return e
                    }), n[1] = e, V.apply(x, n)
                }
            }
        }), A.prototype[R] || i("NegM")(A.prototype, R, A.prototype.valueOf), d(A, "Symbol"), d(Math, "Math", !0), d(n.JSON, "JSON", !0)
    },
    "B+OT": function(t, e) {
        var i = {}.hasOwnProperty;
        t.exports = function(t, e) {
            return i.call(t, e)
        }
    },
    EXMj: function(t, e) {
        t.exports = function(t, e, i, n) {
            if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(i + ": incorrect invocation!");
            return t
        }
    },
    FlQf: function(t, e, i) {
        "use strict";
        var n = i("ccE7")(!0);
        i("MPFp")(String, "String", function(t) {
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
    },
    FpHa: function(t, e) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    },
    G8Mo: function(t, e, i) {
        var n = i("93I4");
        t.exports = function(t, e) {
            if (!n(t)) return t;
            var i, r;
            if (e && "function" == typeof(i = t.toString) && !n(r = i.call(t))) return r;
            if ("function" == typeof(i = t.valueOf) && !n(r = i.call(t))) return r;
            if (!e && "function" == typeof(i = t.toString) && !n(r = i.call(t))) return r;
            throw TypeError("Can't convert object to primitive value")
        }
    },
    Hsns: function(t, e, i) {
        var n = i("93I4"),
            r = i("5T2Y").document,
            o = n(r) && n(r.createElement);
        t.exports = function(t) {
            return o ? r.createElement(t) : {}
        }
    },
    JB68: function(t, e, i) {
        var n = i("Jes0");
        t.exports = function(t) {
            return Object(n(t))
        }
    },
    "JMW+": function(t, e, i) {
        "use strict";
        var n, r, o, s = i("uOPS"),
            a = i("5T2Y"),
            l = i("2GTP"),
            u = i("QMMT"),
            h = i("Y7ZC"),
            c = i("93I4"),
            d = (i("5K7Z"), i("eaoh")),
            p = i("EXMj"),
            f = i("oioR"),
            y = (i("6tYh").set, i("8gHz")),
            v = i("QXhf").set,
            g = i("q6LJ"),
            _ = a.TypeError,
            m = a.process,
            b = a.Promise,
            w = "process" == u(m = a.process),
            S = function() {},
            k = !! function() {
                try {
                    var t = b.resolve(1),
                        e = (t.constructor = {})[i("UWiX")("species")] = function(t) {
                            t(S, S)
                        };
                    return (w || "function" == typeof PromiseRejectionEvent) && t.then(S) instanceof e
                } catch (t) {}
            }(),
            L = function(t, e) {
                return t === e || t === b && e === o
            },
            T = function(t) {
                var e;
                return !(!c(t) || "function" != typeof(e = t.then)) && e
            },
            E = function(t) {
                return L(b, t) ? new C(t) : new r(t)
            },
            C = r = function(t) {
                var e, i;
                this.promise = new t(function(t, n) {
                    if (void 0 !== e || void 0 !== i) throw _("Bad Promise constructor");
                    e = t, i = n
                }), this.resolve = d(e), this.reject = d(i)
            },
            P = function(t) {
                try {
                    t()
                } catch (t) {
                    return {
                        error: t
                    }
                }
            },
            A = function(t, e) {
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
                                    s ? (r || (2 == t._h && I(t), t._h = 1), !0 === s ? i = n : (u && u.enter(), i = s(n), u && u.exit()), i === e.promise ? l(_("Promise-chain cycle")) : (o = T(i)) ? o.call(i, a, l) : a(i)) : l(n)
                                } catch (t) {
                                    l(t)
                                }
                            }; i.length > o;) s(i[o++]);
                        t._c = [], t._n = !1, e && !t._h && x(t)
                    })
                }
            },
            x = function(t) {
                v.call(a, function() {
                    var e, i, n, r = t._v;
                    if (V(t) && (e = P(function() {
                            w ? m.emit("unhandledRejection", r, t) : (i = a.onunhandledrejection) ? i({
                                promise: t,
                                reason: r
                            }) : (n = a.console) && n.error && n.error("Unhandled promise rejection", r)
                        }), t._h = w || V(t) ? 2 : 1), t._a = void 0, e) throw e.error
                })
            },
            V = function(t) {
                if (1 == t._h) return !1;
                for (var e, i = t._a || t._c, n = 0; i.length > n;)
                    if ((e = i[n++]).fail || !V(e.promise)) return !1;
                return !0
            },
            I = function(t) {
                v.call(a, function() {
                    var e;
                    w ? m.emit("rejectionHandled", t) : (e = a.onrejectionhandled) && e({
                        promise: t,
                        reason: t._v
                    })
                })
            },
            M = function(t) {
                var e = this;
                e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), A(e, !0))
            },
            R = function(t) {
                var e, i = this;
                if (!i._d) {
                    i._d = !0, i = i._w || i;
                    try {
                        if (i === t) throw _("Promise can't be resolved itself");
                        (e = T(t)) ? g(function() {
                            var n = {
                                _w: i,
                                _d: !1
                            };
                            try {
                                e.call(t, l(R, n, 1), l(M, n, 1))
                            } catch (t) {
                                M.call(n, t)
                            }
                        }): (i._v = t, i._s = 1, A(i, !1))
                    } catch (t) {
                        M.call({
                            _w: i,
                            _d: !1
                        }, t)
                    }
                }
            };
        k || (b = function(t) {
            p(this, b, "Promise", "_h"), d(t), n.call(this);
            try {
                t(l(R, this, 1), l(M, this, 1))
            } catch (t) {
                M.call(this, t)
            }
        }, (n = function(t) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
        }).prototype = i("XJU/")(b.prototype, {
            then: function(t, e) {
                var i = E(y(this, b));
                return i.ok = "function" != typeof t || t, i.fail = "function" == typeof e && e, i.domain = w ? m.domain : void 0, this._c.push(i), this._a && this._a.push(i), this._s && A(this, !1), i.promise
            },
            catch: function(t) {
                return this.then(void 0, t)
            }
        }), C = function() {
            var t = new n;
            this.promise = t, this.resolve = l(R, t, 1), this.reject = l(M, t, 1)
        }), h(h.G + h.W + h.F * !k, {
            Promise: b
        }), i("RfKB")(b, "Promise"), i("TJWN")("Promise"), o = i("WEpk").Promise, h(h.S + h.F * !k, "Promise", {
            reject: function(t) {
                var e = E(this);
                return (0, e.reject)(t), e.promise
            }
        }), h(h.S + h.F * (s || !k), "Promise", {
            resolve: function(t) {
                if (t instanceof b && L(t.constructor, this)) return t;
                var e = E(this);
                return (0, e.resolve)(t), e.promise
            }
        }), h(h.S + h.F * !(k && i("TuGD")(function(t) {
            b.all(t).catch(S)
        })), "Promise", {
            all: function(t) {
                var e = this,
                    i = E(e),
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
                    i = E(e),
                    n = i.reject,
                    r = P(function() {
                        f(t, !1, function(t) {
                            e.resolve(t).then(i.resolve, n)
                        })
                    });
                return r && n(r.error), i.promise
            }
        })
    },
    Jes0: function(t, e) {
        t.exports = function(t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t
        }
    },
    KUxP: function(t, e) {
        t.exports = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        }
    },
    M1xp: function(t, e, i) {
        var n = i("a0xu");
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == n(t) ? t.split("") : Object(t)
        }
    },
    MCSJ: function(t, e) {
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
    },
    MPFp: function(t, e, i) {
        "use strict";
        var n = i("uOPS"),
            r = i("Y7ZC"),
            o = i("kTiW"),
            s = i("NegM"),
            a = i("B+OT"),
            l = i("SBuE"),
            u = i("j2DC"),
            h = i("RfKB"),
            c = i("U+KD"),
            d = i("UWiX")("iterator"),
            p = !([].keys && "next" in [].keys()),
            f = function() {
                return this
            };
        t.exports = function(t, e, i, y, v, g, _) {
            u(i, e, y);
            var m, b, w, S = function(t) {
                    if (!p && t in E) return E[t];
                    switch (t) {
                        case "keys":
                        case "values":
                            return function() {
                                return new i(this, t)
                            }
                    }
                    return function() {
                        return new i(this, t)
                    }
                },
                k = e + " Iterator",
                L = "values" == v,
                T = !1,
                E = t.prototype,
                C = E[d] || E["@@iterator"] || v && E[v],
                P = C || S(v),
                A = v ? L ? S("entries") : P : void 0,
                x = "Array" == e && E.entries || C;
            if (x && (w = c(x.call(new t))) !== Object.prototype && (h(w, k, !0), n || a(w, d) || s(w, d, f)), L && C && "values" !== C.name && (T = !0, P = function() {
                    return C.call(this)
                }), n && !_ || !p && !T && E[d] || s(E, d, P), l[e] = P, l[k] = f, v)
                if (m = {
                        values: L ? P : S("values"),
                        keys: g ? P : S("keys"),
                        entries: A
                    }, _)
                    for (b in m) b in E || o(E, b, m[b]);
                else r(r.P + r.F * (p || T), e, m);
            return m
        }
    },
    MvwC: function(t, e, i) {
        t.exports = i("5T2Y").document && document.documentElement
    },
    NV0k: function(t, e) {
        e.f = {}.propertyIsEnumerable
    },
    NegM: function(t, e, i) {
        var n = i("2faE"),
            r = i("rr1i");
        t.exports = i("jmDH") ? function(t, e, i) {
            return n.f(t, e, r(1, i))
        } : function(t, e, i) {
            return t[e] = i, t
        }
    },
    "NsO/": function(t, e, i) {
        var n = i("M1xp"),
            r = i("Jes0");
        t.exports = function(t) {
            return n(r(t))
        }
    },
    NwJ3: function(t, e, i) {
        var n = i("SBuE"),
            r = i("UWiX")("iterator"),
            o = Array.prototype;
        t.exports = function(t) {
            return void 0 !== t && (n.Array === t || o[r] === t)
        }
    },
    Ojgd: function(t, e) {
        var i = Math.ceil,
            n = Math.floor;
        t.exports = function(t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? n : i)(t)
        }
    },
    QMMT: function(t, e, i) {
        var n = i("a0xu"),
            r = i("UWiX")("toStringTag"),
            o = "Arguments" == n(function() {
                return arguments
            }());
        t.exports = function(t) {
            var e, i, s;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(i = function(t, e) {
                try {
                    return t[e]
                } catch (t) {}
            }(e = Object(t), r)) ? i : o ? n(e) : "Object" == (s = n(e)) && "function" == typeof e.callee ? "Arguments" : s
        }
    },
    QOPk: function(t, e, i) {
        "use strict";
        i.d(e, "a", function() {
            return n
        });
        var n = function() {
            var t = function() {
                    for (var t = void 0, e = void 0, i = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], n = 0, r = i.length, o = {}; n < r; n++)
                        if ((t = i[n]) && t[1] in document) {
                            for (n = 0, e = t.length; n < e; n++) o[i[0][n]] = t[n];
                            return o
                        }
                    return !1
                }(),
                e = {
                    request: function(e) {
                        var i = t.requestFullscreen;
                        (e = e || document.documentElement)[i]()
                    },
                    exit: function() {
                        document[t.exitFullscreen]()
                    },
                    toggle: function(t) {
                        this.isFullscreen ? this.exit() : this.request(t)
                    },
                    raw: t
                };
            return !!t && (Object.defineProperties(e, {
                isFullscreen: {
                    get: function() {
                        return Boolean(document[t.fullscreenElement])
                    }
                },
                element: {
                    enumerable: !0,
                    get: function() {
                        return document[t.fullscreenElement]
                    }
                },
                enabled: {
                    enumerable: !0,
                    get: function() {
                        return Boolean(document[t.fullscreenEnabled])
                    }
                }
            }), e)
        }()
    },
    QXhf: function(t, e, i) {
        var n, r, o, s = i("2GTP"),
            a = i("MCSJ"),
            l = i("MvwC"),
            u = i("Hsns"),
            h = i("5T2Y"),
            c = h.process,
            d = h.setImmediate,
            p = h.clearImmediate,
            f = h.MessageChannel,
            y = 0,
            v = {},
            g = function() {
                var t = +this;
                if (v.hasOwnProperty(t)) {
                    var e = v[t];
                    delete v[t], e()
                }
            },
            _ = function(t) {
                g.call(t.data)
            };
        d && p || (d = function(t) {
            for (var e = [], i = 1; arguments.length > i;) e.push(arguments[i++]);
            return v[++y] = function() {
                a("function" == typeof t ? t : Function(t), e)
            }, n(y), y
        }, p = function(t) {
            delete v[t]
        }, "process" == i("a0xu")(c) ? n = function(t) {
            c.nextTick(s(g, t, 1))
        } : f ? (o = (r = new f).port2, r.port1.onmessage = _, n = s(o.postMessage, o, 1)) : h.addEventListener && "function" == typeof postMessage && !h.importScripts ? (n = function(t) {
            h.postMessage(t + "", "*")
        }, h.addEventListener("message", _, !1)) : n = "onreadystatechange" in u("script") ? function(t) {
            l.appendChild(u("script")).onreadystatechange = function() {
                l.removeChild(this), g.call(t)
            }
        } : function(t) {
            setTimeout(s(g, t, 1), 0)
        }), t.exports = {
            set: d,
            clear: p
        }
    },
    "R+7+": function(t, e, i) {
        var n = i("w6GO"),
            r = i("mqlF"),
            o = i("NV0k");
        t.exports = function(t) {
            var e = n(t),
                i = r.f;
            if (i)
                for (var s, a = i(t), l = o.f, u = 0; a.length > u;) l.call(t, s = a[u++]) && e.push(s);
            return e
        }
    },
    RfKB: function(t, e, i) {
        var n = i("2faE").f,
            r = i("B+OT"),
            o = i("UWiX")("toStringTag");
        t.exports = function(t, e, i) {
            t && !r(t = i ? t : t.prototype, o) && n(t, o, {
                configurable: !0,
                value: e
            })
        }
    },
    SBuE: function(t, e) {
        t.exports = {}
    },
    TJWN: function(t, e, i) {
        "use strict";
        var n = i("5T2Y"),
            r = i("WEpk"),
            o = i("2faE"),
            s = i("jmDH"),
            a = i("UWiX")("species");
        t.exports = function(t) {
            var e = "function" == typeof r[t] ? r[t] : n[t];
            s && e && !e[a] && o.f(e, a, {
                configurable: !0,
                get: function() {
                    return this
                }
            })
        }
    },
    TuGD: function(t, e, i) {
        var n = i("UWiX")("iterator"),
            r = !1;
        try {
            var o = [7][n]();
            o.return = function() {
                r = !0
            }, Array.from(o, function() {
                throw 2
            })
        } catch (t) {}
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
            } catch (t) {}
            return i
        }
    },
    "U+KD": function(t, e, i) {
        var n = i("B+OT"),
            r = i("JB68"),
            o = i("VVlx")("IE_PROTO"),
            s = Object.prototype;
        t.exports = Object.getPrototypeOf || function(t) {
            return t = r(t), n(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null
        }
    },
    UO39: function(t, e) {
        t.exports = function(t, e) {
            return {
                value: e,
                done: !!t
            }
        }
    },
    UWiX: function(t, e, i) {
        var n = i("29s/")("wks"),
            r = i("YqAc"),
            o = i("5T2Y").Symbol,
            s = "function" == typeof o;
        t.exports = function(t) {
            return n[t] || (n[t] = s && o[t] || (s ? o : r)("Symbol." + t))
        }
    },
    VVlx: function(t, e, i) {
        var n = i("29s/")("keys"),
            r = i("YqAc");
        t.exports = function(t) {
            return n[t] || (n[t] = r(t))
        }
    },
    W070: function(t, e, i) {
        var n = i("NsO/"),
            r = i("tEej"),
            o = i("6AMp");
        t.exports = function(t) {
            return function(e, i, s) {
                var a, l = n(e),
                    u = r(l.length),
                    h = o(s, u);
                if (t && i != i) {
                    for (; u > h;)
                        if ((a = l[h++]) != a) return !0
                } else
                    for (; u > h; h++)
                        if ((t || h in l) && l[h] === i) return t || h;
                return !t && -1
            }
        }
    },
    WEpk: function(t, e) {
        var i = t.exports = {
            version: "2.2.1"
        };
        "number" == typeof __e && (__e = i)
    },
    "XJU/": function(t, e, i) {
        var n = i("NegM");
        t.exports = function(t, e, i) {
            for (var r in e) i && t[r] ? t[r] = e[r] : n(t, r, e[r]);
            return t
        }
    },
    XVRT: function(t, e, i) {
        var n = i("w6GO"),
            r = i("NsO/");
        t.exports = function(t, e) {
            for (var i, o = r(t), s = n(o), a = s.length, l = 0; a > l;)
                if (o[i = s[l++]] === e) return i
        }
    },
    Y7ZC: function(t, e, i) {
        var n = i("5T2Y"),
            r = i("WEpk"),
            o = i("2GTP"),
            s = i("NegM"),
            a = function(t, e, i) {
                var l, u, h, c = t & a.F,
                    d = t & a.G,
                    p = t & a.S,
                    f = t & a.P,
                    y = t & a.B,
                    v = t & a.W,
                    g = d ? r : r[e] || (r[e] = {}),
                    _ = g.prototype,
                    m = d ? n : p ? n[e] : (n[e] || {}).prototype;
                for (l in d && (i = e), i)(u = !c && m && void 0 !== m[l]) && l in g || (h = u ? m[l] : i[l], g[l] = d && "function" != typeof m[l] ? i[l] : y && u ? o(h, n) : v && m[l] == h ? function(t) {
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
                    return e.prototype = t.prototype, e
                }(h) : f && "function" == typeof h ? o(Function.call, h) : h, f && ((g.virtual || (g.virtual = {}))[l] = h, t & a.R && _ && !_[l] && s(_, l, h)))
            };
        a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a
    },
    YqAc: function(t, e) {
        var i = 0,
            n = Math.random();
        t.exports = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++i + n).toString(36))
        }
    },
    a0xu: function(t, e) {
        var i = {}.toString;
        t.exports = function(t) {
            return i.call(t).slice(8, -1)
        }
    },
    aW7e: function(t, e, i) {
        i("wgeU"), i("FlQf"), i("bBy9"), i("JMW+"), t.exports = i("WEpk").Promise
    },
    "ar/p": function(t, e, i) {
        var n = i("5vMV"),
            r = i("FpHa").concat("length", "prototype");
        e.f = Object.getOwnPropertyNames || function(t) {
            return n(t, r)
        }
    },
    bBy9: function(t, e, i) {
        i("w2d+");
        for (var n = i("5T2Y"), r = i("NegM"), o = i("SBuE"), s = i("UWiX")("toStringTag"), a = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], l = 0; l < 5; l++) {
            var u = a[l],
                h = n[u],
                c = h && h.prototype;
            c && !c[s] && r(c, s, u), o[u] = o.Array
        }
    },
    bvfi: function(t, e, i) {
        "use strict";
        i.r(e);
        var n = {};
        i.r(n), i.d(n, "_INIT_VIDEO", function() {
            return l
        }), i.d(n, "_DEINIT_VIDEO", function() {
            return u
        }), i.d(n, "_RESIZE", function() {
            return h
        }), i.d(n, "_DESTROY", function() {
            return c
        }), i.d(n, "STATE_CHANGE", function() {
            return d
        }), i.d(n, "QUALITIES_LIST_CHANGE", function() {
            return p
        }), i.d(n, "SUBTITLES_LIST_CHANGED", function() {
            return f
        }), i.d(n, "QUALITY_CHANGE", function() {
            return y
        }), i.d(n, "SUBTITLE_TRACK_CHANGED", function() {
            return v
        }), i.d(n, "SUBTITLE_CUE_CHANGE", function() {
            return g
        }), i.d(n, "FULLSCREEN_CHANGE", function() {
            return _
        }), i.d(n, "SEEK", function() {
            return m
        }), i.d(n, "EXPANDED", function() {
            return b
        }), i.d(n, "NEXT_TIMER_RESET", function() {
            return w
        }), i.d(n, "NEXT_TIMER_START", function() {
            return S
        }), i.d(n, "VIDEO_LIKE", function() {
            return k
        }), i.d(n, "VIDEO_SHARE", function() {
            return L
        }), i.d(n, "VIDEO_ADD", function() {
            return T
        }), i.d(n, "VIDEO_BOOKMARK", function() {
            return E
        }), i.d(n, "SUBSCRIBED", function() {
            return C
        }), i.d(n, "LIVE_PHASE_CHANGE", function() {
            return P
        }), i.d(n, "LIVE_DONATION", function() {
            return A
        }), i.d(n, "MEDIA_TIMEUPDATE", function() {
            return x
        }), i.d(n, "MEDIA_PROGRESS", function() {
            return V
        }), i.d(n, "MEDIA_VOLUMECHANGE", function() {
            return I
        }), i.d(n, "MEDIA_DURATIONCHANGE", function() {
            return M
        }), i.d(n, "MEDIA_WAITING", function() {
            return R
        }), i.d(n, "MEDIA_PLAYING", function() {
            return O
        }), i.d(n, "MEDIA_PAUSE", function() {
            return D
        }), i.d(n, "MEDIA_ENDED", function() {
            return B
        }), i.d(n, "MEDIA_ERROR", function() {
            return F
        }), i.d(n, "MEDIA_SEEKING", function() {
            return N
        }), i.d(n, "MEDIA_SEEKED", function() {
            return j
        }), i.d(n, "MEDIA_PROVIDER_CHANGE", function() {
            return H
        }), i.d(n, "MEDIA_LIVE_WARNING", function() {
            return U
        }), i.d(n, "MEDIA_HLS_LEVEL_LOADED", function() {
            return z
        }), i.d(n, "MEDIA_HLS_FRAG_LOADED", function() {
            return Q
        }), i.d(n, "UI_SEEKSTART", function() {
            return W
        }), i.d(n, "UI_SEEKEND", function() {
            return q
        }), i.d(n, "UI_CONTROLS_HIDE", function() {
            return G
        }), i.d(n, "UI_CONTROLS_SHOW", function() {
            return Y
        }), i.d(n, "UI_STICKERS_PROMO_EVENT", function() {
            return K
        }), i.d(n, "UI_SUBTITLES_ENABLED_FROM_BTN", function() {
            return X
        }), i.d(n, "UI_ACTION_BUTTON_CLICKED", function() {
            return J
        }), i.d(n, "UI_ACTION_BUTTON_SHOWN", function() {
            return Z
        }), i.d(n, "ADS_WAITING", function() {
            return $
        }), i.d(n, "ADS_TIME_REMAINED", function() {
            return tt
        }), i.d(n, "ADS_LINEAR_STARTED", function() {
            return et
        }), i.d(n, "ADS_LINEAR_COMPLETED", function() {
            return it
        }), i.d(n, "ADS_OVERLAY_STARTED", function() {
            return nt
        }), i.d(n, "ADS_OVERLAY_COMPLETED", function() {
            return rt
        });
        var r = {};
        i.r(r), i.d(r, "WAITING", function() {
            return ot
        }), i.d(r, "STARTED", function() {
            return st
        }), i.d(r, "ENDED", function() {
            return at
        }), i.d(r, "FAILED", function() {
            return lt
        }), i.d(r, "UPCOMING", function() {
            return ut
        });
        i("ls82");
        var o = i("aW7e"),
            s = i("+SFK"),
            a = i("qOki"),
            l = "_initVideo",
            u = "_deinitVideo",
            h = "_resize",
            c = "_destroy",
            d = "stateChange",
            p = "qualitiesListChange",
            f = "subtitlesListChanged",
            y = "qualityChange",
            v = "subtitleTrackChanged",
            g = "subtitleCueChange",
            _ = "fullscreenChange",
            m = "seek",
            b = "expanded",
            w = "nextTimerReset",
            S = "nextTimerStart",
            k = "videoLike",
            L = "videoShare",
            T = "videoAdd",
            E = "videoBookmark",
            C = "subscribed",
            P = "livePhaseChange",
            A = "liveDonation",
            x = "media.timeupdate",
            V = "media.progress",
            I = "media.volumechange",
            M = "media.durationchange",
            R = "media.waiting",
            O = "media.playing",
            D = "media.pause",
            B = "media.ended",
            F = "media.error",
            N = "media.seeking",
            j = "media.seeked",
            H = "media.providerChange",
            U = "media.liveWarning",
            z = "media.hlsLevelLoaded",
            Q = "media.hlsFragLoaded",
            W = "ui.seekstart",
            q = "ui.seekend",
            G = "ui.controlsHide",
            Y = "ui.controlsShow",
            K = "ui.stickersPromoEvent",
            X = "ui.subtitlesEnabledFromBtn",
            J = "ui.actionButtonClicked",
            Z = "ui.actionButtonShown",
            $ = "ads.waiting",
            tt = "ads.timeRemained",
            et = "ads.linearStarted",
            it = "ads.linearCompleted",
            nt = "ads.overlayStarted",
            rt = "ads.overlayCompleted",
            ot = 1,
            st = 2,
            at = 3,
            lt = 4,
            ut = 5,
            ht = [{
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
            }];

        function ct(t, e) {
            var i = !0,
                n = !1,
                r = void 0;
            try {
                for (var o, s = ht[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                    var a = o.value;
                    if (t <= a.width && e <= a.height) return a.height
                }
            } catch (t) {
                n = !0, r = t
            } finally {
                try {
                    !i && s.return && s.return()
                } finally {
                    if (n) throw r
                }
            }
            return e
        }

        function dt(t) {
            var e = ht[t];
            return e ? e.height : 0
        }
        var pt = function(t) {
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                var e = new XMLHttpRequest,
                    i = new Promise(function(i, n) {
                        e.onload = function() {
                            i({
                                response: e.responseText,
                                details: e
                            })
                        }, e.onerror = function() {
                            n(new Error("Request failed"))
                        }, e.onabort = function() {
                            n(new Error("Request aborted"))
                        }, e.open("GET", t), e.send()
                    });
                i.catch(function(t) {});
                return {
                    promise: i,
                    abort: function() {
                        e.abort()
                    }
                }
            },
            ft = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();
        var yt = function() {
            function t(e) {
                var i = this;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._componentPlayerListeners = [], this._componentDomListeners = [], this._componentTimeouts = [], this._componentRequests = [], this.player = e, this.playerListen(l, function() {
                    i.initVideo && i.initVideo.apply(i, arguments)
                }), this.playerListen(u, function() {
                    i.deinitVideo && i.deinitVideo()
                }), this.playerListen(h, function() {
                    i.resize && i.resize.apply(i, arguments)
                }), this.playerListen(c, this.destroy)
            }
            return t.prototype.domListen = function(t, e, i) {
                var n = this,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    o = r.useCapture,
                    s = r.context,
                    a = r.once;
                if (t && e && i && !(vt(this._componentDomListeners, t, e, i, o) > -1)) {
                    isString(t) && (t = domByClass(this.el, t));
                    var l = a ? function(r) {
                        return n.domUnlisten(t, e, i, {
                            useCapture: o
                        }), i.call(s || n, r)
                    } : i.bind(s || this);
                    t.addEventListener(e, l, o), this._componentDomListeners.push({
                        elem: t,
                        type: e,
                        handler: i,
                        useCapture: o,
                        realHandler: l
                    })
                }
            }, t.prototype.domListenOnce = function(t, e, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return n.once = !0, this.domListen(t, e, i, n)
            }, t.prototype.domUnlisten = function(t, e, i) {
                var n = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}).useCapture;
                if (i && e) {
                    var r = vt(this._componentDomListeners, t, e, i, n);
                    gt(this._componentDomListeners, r)
                } else
                    for (var o = 0; this._componentDomListeners[o];) {
                        var s = this._componentDomListeners[o];
                        t !== s.elem || e && e !== s.type ? o++ : gt(this._componentDomListeners, o)
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
                var i = function(t, e, i) {
                    var n = -1;
                    return each(t, function(t, r) {
                        if (r.type === e && r.handler === i) return n = t, !1
                    }), n
                }(this._componentPlayerListeners, t, e);
                if (!(i < 0)) {
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
                for (var i = arguments.length, n = Array(i > 2 ? i - 2 : 0), r = 2; r < i; r++) n[r - 2] = arguments[r];
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
                var i = this,
                    n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                    r = pt(t, e);
                if (n) {
                    this._componentRequests.push(r);
                    var o = function() {
                        var t = i._componentRequests.indexOf(r);
                        t >= 0 && i._componentRequests.splice(t, 1)
                    };
                    r.promise.then(o).catch(o)
                }
                return r
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
            }, ft(t, [{
                key: "tooltip",
                get: function() {
                    return this.player.ui.playerTooltip
                }
            }]), t
        }();

        function vt(t, e, i, n, r) {
            var o = -1;
            return each(t, function(t, s) {
                if (s.elem === e && s.type === i && s.handler === n && s.useCapture === r) return o = t, !1
            }), o
        }

        function gt(t, e) {
            var i = t[e];
            i && (i.elem.removeEventListener(i.type, i.realHandler, i.useCapture), t.splice(e, 1))
        }
        var _t = ["play", "pause", "resume", "stop", "seek", "buf_start", "buf_stop", "heartbeat", "bitrate_change", "error"],
            mt = function() {
                function t(e, i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.player = e, this.media = i, this.gotNetworkStatus = !1, this.supported = !0, this.paused = !1, this.stopped = !0, this.eventsQueue = []
                }
                return t.prototype.init = function(t, e, i, n) {
                    var r = this;
                    this.svcid = e ? n ? "5d31" : "5d05" : i ? "5d10" : n ? "5d41" : "5d04", this.inited || (this.cid = t, this.inited = !0, this.getNetworkStatus().then(function(t) {
                        r.onNetworkStatusReceived(t.supported)
                    }).catch(function() {
                        r.onNetworkStatusReceived(!1)
                    }))
                }, t.prototype.reset = function() {
                    this.flushEventsQueue(), this.stopHeartbeats(), this.paused = !1, this.stopped = !0, this.bufStarted = 0
                }, t.prototype.enable = function(t) {
                    this.enabled = t
                }, t.prototype.getNetworkStatus = function() {
                    var t, e = (t = regeneratorRuntime.mark(function t() {
                        var e, i, n;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return e = this.sendRequest("network_status", {
                                        svcid: this.svcid,
                                        cid: this.cid,
                                        client: this.getClientData()
                                    }), t.next = 3, e.promise;
                                case 3:
                                    return i = t.sent, n = i.response, t.abrupt("return", JSON.parse(n));
                                case 6:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    }), function() {
                        var e = t.apply(this, arguments);
                        return new Promise(function(t, i) {
                            return function n(r, o) {
                                try {
                                    var s = e[r](o),
                                        a = s.value
                                } catch (t) {
                                    return void i(t)
                                }
                                if (!s.done) return Promise.resolve(a).then(function(t) {
                                    n("next", t)
                                }, function(t) {
                                    n("throw", t)
                                });
                                t(a)
                            }("next")
                        })
                    });
                    return function() {
                        return e.apply(this, arguments)
                    }
                }(), t.prototype.onNetworkStatusReceived = function(t) {
                    this.supported = t, this.gotNetworkStatus = !0, t ? this.flushEventsQueue() : this.clearEventsQueue()
                }, t.prototype.triggerEvent = function(t) {
                    if (this.supported && this.enabled && inArray(t, _t) && this.player.isInited() && (!this.stopped || "play" == t)) {
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
                        this.eventsQueue.push(i), this.gotNetworkStatus && (clearTimeout(this.flushTimeout), this.eventsQueue.length > 10 || "bitrate_change" == t ? this.flushEventsQueue() : this.flushTimeout = setTimeout(this.flushEventsQueue.bind(this), 100))
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
                    }, 3e4)
                }, t.prototype.stopHeartbeats = function() {
                    clearInterval(this.heartbeatInterval)
                }, t.prototype.sendRequest = function(t, e) {
                    var i = "https://stats.vk-portal.net/uxzoom/1/" + t + "?" + this.queryString(e);
                    return pt(i)
                }, t.prototype.getClientData = function() {
                    return this.paramString({
                        player: "HTML5"
                    })
                }, t.prototype.getContentData = function() {
                    return this.paramString({
                        duration: this.media.getDuration() || this.player.vars.duration,
                        quality: this.player.isAutoQualityEnabled() ? 100 : 2 + this.player.getQualityIndex(),
                        host: this.media.getContentHost(),
                        id: this.player.getVideoId()
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
            }(),
            bt = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();
        var wt = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, i)),
                        r = i.getVars();
                    return n.el = n.buildEl(r), n.initListeners(), n._delaySeek = 0, n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.buildEl = function(t) {
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
                    var t = this,
                        e = this.el.play();
                    e && e.catch(function(e) {
                        e && "NotAllowedError" == e.name && t.player.pause()
                    })
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
                }, bt(e, [{
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
                        this.el.muted = !t, this.el.volume = t
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
                        if (this.el.videoWidth && this.el.videoHeight) return this.el.videoWidth / this.el.videoHeight
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
            }(yt),
            St = {
                set: function(t, e) {
                    try {
                        localStorage.setItem(t, JSON.stringify(e))
                    } catch (t) {}
                },
                get: function(t) {
                    try {
                        return JSON.parse(localStorage.getItem(t))
                    } catch (t) {
                        return null
                    }
                },
                getByPrefix: function(t) {
                    for (var e = {}, i = localStorage.length, n = 0; n < i; n++) {
                        var r = localStorage.key(n);
                        0 === r.indexOf(t) && (e[r] = this.get(r))
                    }
                    return e
                },
                remove: function(t) {
                    try {
                        localStorage.removeItem(t)
                    } catch (t) {}
                },
                savePref: function(t, e) {
                    for (var i = this.getPref("*"), n = i, r = t.split(".");;) {
                        var o = r.shift();
                        if (!r.length) {
                            n[o] = e;
                            break
                        }
                        null == n[o] && (n[o] = {}), n = n[o]
                    }
                    this.set("videoplayer_prefs", i)
                },
                deletePref: function(t) {
                    this.savePref(t, void 0)
                },
                getPref: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "*",
                        e = this.get("videoplayer_prefs") || {};
                    if ("*" === t) return e;
                    for (var i = e, n = t.split(".");;) {
                        if (i = i[n.shift()], !n.length || !i) break
                    }
                    return i
                }
            },
            kt = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();

        function Lt(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
            return Array.from(t)
        }
        var Tt = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n._fragLoadedBytes = n._fragLoadingBytes = 0, n._fragsTracksFlags = [], n._fragLoopErrorCount = 0, n._curFragSeqNum = 0, n._errors = [], n._duration = 0, n.initHls(), n.initHlsLoadStat(), n.initFragLoadingStuckHandler(), n.initTracksChangeHandler(), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.initListeners = function() {
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
                }) : this.hls = new Hls(t), this.hls.attachMedia(this.el), this.hls.on(Hls.Events.MANIFEST_LOADED, this.onManifestLoaded.bind(this)), this.hls.on(Hls.Events.LEVEL_SWITCHED, this.onLevelSwitch.bind(this)), this.hls.on(Hls.Events.ERROR, this.onHlsError.bind(this)), this.hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated.bind(this)), this.hls.on(Hls.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch.bind(this))
            }, e.prototype.initHlsLoadStat = function() {
                var t = this;
                this.hls.on(Hls.Events.LEVEL_LOADED, function(e, i) {
                    var n = Math.round(i.stats.tload - i.stats.trequest) / 1e3,
                        r = t.hls.levels[i.level],
                        o = ct(r.width, r.height),
                        s = i.details.url.split("?")[0];
                    t.player.trigger(z, {
                        time: n,
                        quality: o,
                        url: s
                    })
                }), this.hls.on(Hls.Events.FRAG_LOADED, function(e, i) {
                    if ("main" === i.frag.type) {
                        var n = Math.round(i.stats.tload - i.stats.trequest) / 1e3,
                            r = t.hls.levels[i.frag.level],
                            o = ct(r.width, r.height),
                            s = (i.networkDetails.responseURL || i.frag._url).split("?")[0];
                        t.player.trigger(Q, {
                            time: n,
                            quality: o,
                            url: s
                        })
                    }
                })
            }, e.prototype.initFragLoadingStuckHandler = function() {
                var t = this;
                this.hls.on(Hls.Events.FRAG_LOAD_PROGRESS, function(e, i) {
                    "main" === i.frag.type && (t._fragLoadingBytes = i.frag.loaded, t.undelayRecoverNetwork(), t._ignoreFragLoadStuck || t.delayRecoverNetwork(5e3))
                }), this.hls.on(Hls.Events.FRAG_LOADED, function(e, i) {
                    "main" === i.frag.type && (t._fragLoadedBytes += i.frag.loaded, t._fragLoadingBytes = 0, t.undelayRecoverNetwork())
                })
            }, e.prototype.initTracksChangeHandler = function() {
                var t = this;
                this.hls.on(Hls.Events.FRAG_PARSING_DATA, function(e, i) {
                    t._fragsTracksFlags[i.frag.sn] || (t._fragsTracksFlags[i.frag.sn] = 0), "video" == i.type && (t._fragsTracksFlags[i.frag.sn] |= 1), "audio" == i.type && (t._fragsTracksFlags[i.frag.sn] |= 2)
                }), this.hls.on(Hls.Events.FRAG_CHANGED, function(e, i) {
                    t._fragsTracksFlags[t._curFragSeqNum] && t._fragsTracksFlags[i.frag.sn] && t._fragsTracksFlags[t._curFragSeqNum] != t._fragsTracksFlags[i.frag.sn] && (t.player.debugLog("switching to fragment with different tracks", {
                        force: !0
                    }), t.recoverMedia()), t._curFragSeqNum = i.frag.sn
                })
            }, e.prototype.onManifestLoaded = function(t, e) {
                var i = this.player.getAvailableQualities();
                if (this.player.trigger(p, i), !this.manifestLoaded && i.length) {
                    this.manifestLoaded = !0;
                    var n = this.player.preferredQuality,
                        r = St.getPref("abr_disabled") && !this.player.isFromAutoplay() || this.getVar("hd_def") >= 0;
                    if (!r) {
                        var o = this.player.getPreloadedQuality(),
                            s = St.getPref("abr_quality");
                        n = o || s || n, this.getVar("is_inline") && (n = Math.min(n, 480))
                    }
                    var a = Math.max.apply(Math, Lt(i));
                    n = Math.min(n, a);
                    var l = this.getLevelIndexForQuality(n);
                    this.hls.startLevel = l, r && this.setCurrentLevel(l), this.player.onQualityChanged(n), this.getVar("live") && this.hls.levels.length > 1 && this.capLiveLevels(), this.needLoad && this.load(), r || this.player.isActiveLive() || this.forceNextLevel(l)
                }
            }, e.prototype.onLevelSwitch = function(t, e) {
                var i = this.hls.levels[e.level],
                    n = ct(i.width, i.height);
                if (this.player.onQualityChanged(n), this.hls.autoLevelEnabled && this.hls.levels.length > 1 && n) {
                    var r = St.getPref("abr_quality");
                    (n < Math.max.apply(Math, Lt(this.getAvailableQualities())) || n > r) && St.savePref("abr_quality", n)
                }
            }, e.prototype.onVideoError = function(t) {
                var e = this.el.error;
                e.code === e.MEDIA_ERR_DECODE && (this.recoverMedia() || this.onFatalError())
            }, e.prototype.onHlsError = function(t, e) {
                var i = [Hls.ErrorDetails.BUFFER_APPENDING_ERROR],
                    n = [Hls.ErrorDetails.BUFFER_STALLED_ERROR, Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE],
                    r = e.fatal || inArray(e.details, i);
                if (!r && e.details == Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR && ++this._fragLoopErrorCount > 5 && (r = !0, this._fragLoopErrorCount = 0), inArray(e.details, n) || this.player.debugLog(["hls", e.type, e.details], {
                        force: !0,
                        type: r ? "error" : "warn"
                    }), this._errors.push("[" + this.currentTime + "] " + e.details), e.details === Hls.ErrorDetails.FRAG_LOAD_ERROR && this.undelayRecoverNetwork(), r) {
                    var o = !1;
                    this.player.isActiveLive() ? (o = !0, e.type === Hls.ErrorTypes.MEDIA_ERROR ? this.delay(this.recoverMedia, 6e3) : e.type === Hls.ErrorTypes.NETWORK_ERROR && this.delayRecoverNetwork(6e3)) : o = this.recoverMedia(), o || this.onFatalError(e)
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
                return !(Date.now() - intval(this._lastMediaRecoverTry) < 3e3) && (this._lastMediaRecoverTry = Date.now(), this.player.debugLog("trying to recover hls media", {
                    force: !0
                }), this.player.isActiveLive() ? this.restartLive() : this.hls.recoverMediaError(), this.player.media.isPlayingMedia() && this.play(), !0)
            }, e.prototype.recoverNetwork = function() {
                return !(Date.now() - intval(this._lastNetworkRecoverTry) < 3e3) && (this._lastNetworkRecoverTry = Date.now(), this.player.debugLog("trying to recover hls network", {
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
                    if (/source/.test(n)) return e = i, !1
                }), e && (t = t.filter(function(t) {
                    return t.height < e.height
                })).push(e), t
            }, e.prototype.capLiveLevels = function() {
                var t = this;
                each(this.hls.levels, function(e, i) {
                    var n = i.url && i.url[0];
                    if (/source/.test(n)) return t.hls.autoLevelCapping = e, !1
                })
            }, e.prototype.forceNextLevel = function(t) {
                var e = this;
                this.hls.on(Hls.Events.FRAG_LOADED, function i(n, r) {
                    "main" === r.frag.type && (e.hls.off(Hls.Events.FRAG_LOADED, i), r.frag.autoLevel && r.frag.level == t && (e.hls.nextLoadLevel = t))
                })
            }, e.prototype.setQuality = function(t) {
                -1 == t ? (this.setCurrentLevel(-1), St.deletePref("abr_disabled")) : (this.setCurrentLevel(this.getLevelIndexForQuality(t)), St.savePref("abr_disabled", 1))
            }, e.prototype.getQuality = function() {
                if (this.hls.levels) {
                    var t = this.hls,
                        e = t.levels,
                        i = e[t.currentLevel] || e[t.loadLevel] || e[t.startLevel];
                    if (i && i.width && i.height) return ct(i.width, i.height)
                }
                return 0
            }, e.prototype.getAvailableQualities = function() {
                var t = this.hls.levels || [];
                return this.getVar("live") && (t = this.filterLiveLevels(t)), t.length > 1 && (t = t.filter(function(t) {
                    return t.width && t.height
                })), t.map(function(t) {
                    return ct(t.width, t.height)
                })
            }, e.prototype.isAutoQualityAvailable = function() {
                return this.hls.levels && this.hls.levels.length > 1
            }, e.prototype.isAutoQualityEnabled = function() {
                return this.hls.autoLevelEnabled
            }, e.prototype.getLevelIndexForQuality = function(t) {
                var e = -1;
                return each(this.hls.levels || [], function(i, n) {
                    if (ct(n.width, n.height) == t) return e = i, !1
                }), e
            }, e.prototype.getAvailableSubtitleTracksInfo = function() {
                return this.hls.subtitleTrackController.tracks || []
            }, e.prototype.getSubtitleTrack = function() {
                return this.hls.subtitleTrack
            }, e.prototype.switchSubtitleTrack = function(t) {
                var e = t.trackId;
                this.hls.subtitleTrack = e
            }, e.prototype.onSubtitleTracksUpdated = function(t, e) {
                var i = e.subtitleTracks;
                this.player.trigger(f, i)
            }, e.prototype.onSubtitleTrackSwitch = function(t, e) {
                var i = this,
                    n = e.id,
                    r = this.getAvailableSubtitleTracksInfo(),
                    o = null;
                if (-1 !== n) {
                    this.el.textTracks[n].mode = "hidden", this.el.textTracks[n].oncuechange = function(t) {
                        i.player.trigger(g, t.target.activeCues)
                    };
                    var s = !0,
                        a = !1,
                        l = void 0;
                    try {
                        for (var u, h = r[Symbol.iterator](); !(s = (u = h.next()).done); s = !0) {
                            var c = u.value;
                            if (n === c.id) {
                                o = c;
                                break
                            }
                        }
                    } catch (t) {
                        a = !0, l = t
                    } finally {
                        try {
                            !s && h.return && h.return()
                        } finally {
                            if (a) throw l
                        }
                    }
                }
                this.player.trigger(v, r, o)
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
                if (t) return t.bitrate / 1e3
            }, e.prototype.getContentUrl = function() {
                var t = this.getCurLevel();
                if (t) return t.url[0]
            }, e.prototype.getErrorsLog = function() {
                return this._errors.join(", ")
            }, e.prototype.onDurationChange = function(t) {
                var e = this.el.duration;
                if (browser.safari && this._duration && "change" === t && parseInt((e - this._duration) / e * 100) > 10) return;
                this._duration = e
            }, kt(e, [{
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
        }(wt);

        function Et(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : t.length;
            if (Array.prototype.fill) return Array.prototype.fill.call(t, e, i, n);
            i = i < 0 ? Math.max(t.length + i, 0) : Math.min(i, t.length), n = n < 0 ? Math.max(t.length + n, 0) : Math.min(n, t.length);
            for (var r = i; r < n; ++r) t[r] = e;
            return t
        }

        function Ct(t, e) {
            "textContent" in Node.prototype ? t.textContent = e : t.innerText = e
        }

        function Pt(t) {
            var e = ce("div");
            if ("string" == typeof e.style[t]) return t;
            for (var i, n = ["webkit", "moz", "ms"], r = t.charAt(0).toUpperCase() + t.slice(1), o = 0; i = n[o]; o++) {
                var s = i + r;
                if ("string" == typeof e.style[s]) return s
            }
            return null
        }
        var At, xt = (At = 0, function(t) {
                return t + At++
            }),
            Vt = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();
        var It = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n._delaySrc = !1, n._delaySeek = 0, n._volume = 1, n._currentTime = 0, n._duration = 0, n._loop = !1, n._played = [], n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.buildEl = function(t) {
                    var e = ce("div");
                    renderFlash(e, {
                        url: "/swf/video_lite.swf",
                        id: xt("flashprovider"),
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
                            !1 !== t._delaySrc && t._delayPlay && (t.src = t._delaySrc, t._delaySrc = !1), t._delayPlay && (t.play(), t._delayPlay = !1)
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
                    this.el.play ? (!1 !== this._delaySrc && (this.src = this._delaySrc), this.el.play()) : this._delayPlay = !0
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
                            if (o >= r || e < s) return void n.splice(o, 0, t, e);
                            if (t <= a) {
                                for (var l = Math.min(n[o], t), u = Math.max(n[o + 1], e), h = 2, c = o + 2;; c += 2) {
                                    var d = n[c],
                                        p = n[c + 1];
                                    if (c >= r || u < d) break;
                                    u = Math.max(u, p), h += 2
                                }
                                return void n.splice(o, h, l, u)
                            }
                        }
                    }
                }, e.prototype.load = function() {}, e.prototype.reset = function() {
                    this.el.clear && document.body.contains(this.el) && (this.el.clear(), this.el.init()), this._currentTime = 0, this._duration = 0, this._played = []
                }, e.prototype.recoverNetwork = function() {
                    this.el.load && this._src && (this.el.clear(), this.el.init(), this.el.load(this._src), this.player.getState() === a.PLAYING && this.el.play())
                }, Vt(e, [{
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
            }(wt),
            Mt = function(t) {
                var e = "string" == typeof t ? t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) : null;
                return e ? (3600 * e[1] || 0) + (60 * e[2] || 0) + (+e[3] || 0) : 0
            },
            Rt = function(t) {
                var e = "";
                return t >= 3600 && (e += Math.floor(t / 3600) + "h", t %= 3600), t >= 60 && (e += Math.floor(t / 60) + "m", t %= 60), t > 0 && (e += Math.floor(t) + "s"), e
            },
            Ot = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();

        function Dt(t) {
            return function() {
                var e = t.apply(this, arguments);
                return new Promise(function(t, i) {
                    return function n(r, o) {
                        try {
                            var s = e[r](o),
                                a = s.value
                        } catch (t) {
                            return void i(t)
                        }
                        if (!s.done) return Promise.resolve(a).then(function(t) {
                            n("next", t)
                        }, function(t) {
                            n("throw", t)
                        });
                        t(a)
                    }("next")
                })
            }
        }
        var Bt = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_media"
                }), n.playerListen(W, n.onUiSeekStart), n.playerListen(q, n.onUiSeekEnd), n.playerListen(R, n.onWaitingChange), n.playerListen(d, n.onStateChange), n.playerListen(y, n.onQualityChange), n.playerListen(b, n.updateAspectRatio), n.playerListen(_, n.updateAspectRatio), n._interruptionCheckerInterval = setInterval(n.checkInterruption.bind(n), 200), n.vigoStats = new mt(n.player, n), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.initVideo = function(t) {
                if (t.live !== lt) {
                    var e = void 0;
                    switch (this.providerType()) {
                        case "hls":
                            e = new Tt(this.player);
                            break;
                        case "base":
                            e = new wt(this.player);
                            break;
                        case "flash":
                            e = new It(this.player);
                            break;
                        default:
                            return void this.player.trigger(F, {
                                message: this.getLang("load_error")
                            })
                    }
                    this.attachProvider(e);
                    var i = this.getInitialSrc(t);
                    i ? t.live === ut || t.live === ot || t.live === st ? this.checkLiveStarted(i) : e.src = i : this.setQuality(this.getInitialQuality(t));
                    var n = this.getInitialTime(t);
                    n > 0 && (e.currentTime = n, this.player.trigger(x, n)), this.setVolume(this.getInitialVolume()), this.toggleLoop(!!t.repeat), this.rotateVideo(!1, !0), this.updateAspectRatio(), this.vigoStats.init(t.vigo_cid, !!t.hls, !!t.extra, !!t.from_autoplay), this.vigoStats.enable(!t.live), this.filterSavedVideosPositions()
                } else this.onLiveFailed()
            }, e.prototype.updateAspectRatio = function() {
                var t = this.getVar("stretch_vertical"),
                    e = this.getVar("is_inline"),
                    i = this.getVar("aspect_ratio"),
                    n = this.player.isFullscreen(),
                    r = "",
                    o = "",
                    s = "";
                t && e && !n && i && i < 1 && (r = o = -(1 / i - 1) / 2 * 100 + "%", s = "auto"), setStyle(this.el, {
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
                t.is_inline && (e = Math.min(480, e));
                var i = dt(t.hd);
                return Math.min(e, i)
            }, e.prototype.getInitialTime = function(t) {
                if (this.player.isActiveLive()) return 0;
                if (t.t) {
                    var e = Mt(t.t);
                    if (e < t.duration) return e
                } else {
                    var i = St.getPref("position." + this.player.getVideoId());
                    if (i && t.duration - i.pos > 30) return i.pos
                }
                return 0
            }, e.prototype.providerType = function() {
                return this.provider instanceof Tt ? "hls" : this.provider instanceof It ? "flash" : this.provider instanceof wt ? "base" : this.chooseProvider()
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
                    e.player.trigger(M, e.getDuration())
                }), this.domListen(t.el, "loadeddata", function(t) {
                    e.buffering = !1
                }), this.domListen(t.el, "playing", function() {
                    e.buffering = !1, e.provider.el.paused || e.player.trigger(O)
                }), this.domListen(t.el, "pause", function() {
                    e._ui_seeking || e._disabled || e.player.getState() === a.ERROR || e.player.trigger(D)
                }), this.domListen(t.el, "ended", function() {
                    e.player.trigger(B)
                }), this.domListen(t.el, "error", this.onError), this.player.trigger(H, {
                    type: this.providerType()
                })
            }, e.prototype.destroyProvider = function() {
                this.provider && (this.domUnlisten(this.provider.el), re(this.provider.el), this.provider.destroy(), this.provider = null)
            }, e.prototype.deinitVideo = function() {
                this._disabled = !1, this.buffering = !1, this.interrupted = !1, this.aborted = !1, this.preloadRequested = !1, this.bufEndReached = !1, this.lastNetworkRecoveryTry = 0, this.vigoStats.reset(), this.destroyProvider(), this.undelay(this.liveStartCheckTimeout), this.undelay(this.liveEndCheckTimeout), this.liveHlsCheckRequest && (this.liveHlsCheckRequest.abort(), delete this.liveHlsCheckRequest), delete this.postLiveCheckCount
            }, e.prototype.checkLiveStarted = function(t) {
                var e, i = this,
                    n = this.player.getVideoId(),
                    r = !!this.getVar("live_preparing"),
                    o = !1,
                    s = function t() {
                        i.player.getVideoId() == n && i.player.checkLivePhase(function(e) {
                            if (e.live_preparing) r = !0;
                            else if ((r || i.player.getLivePhase() === ut && e.phase !== ut) && (r = !1, i.onLiveStarted(), !i.player.isInited())) return;
                            switch (e.phase) {
                                case st:
                                    o ? r && i.delay(t, 3e3) : l();
                                    break;
                                case ot:
                                case ut:
                                    o && (o = !1, i.player.changeLivePhase(e.phase));
                                    var n = i.player.getLivePhase() !== ut || r ? 3e3 : 15e3;
                                    i.liveStartCheckTimeout = i.delay(t, n)
                            }
                            i.onLiveWaiting(e.stream_error_text, e.stream_error_level)
                        })
                    },
                    l = (e = Dt(regeneratorRuntime.mark(function e() {
                        var n;
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = void 0, e.prev = 1, "hls" !== i.providerType()) {
                                        e.next = 8;
                                        break
                                    }
                                    return e.next = 5, i.checkHlsManifestValidity(t);
                                case 5:
                                    n = e.sent, e.next = 11;
                                    break;
                                case 8:
                                    return e.next = 10, i.checkRtmpRedirect(t);
                                case 10:
                                    n = e.sent;
                                case 11:
                                    return e.prev = 11, n ? u(n) : i.delay(s, 3e3), e.finish(11);
                                case 14:
                                case "end":
                                    return e.stop()
                            }
                        }, e, i, [
                            [1, , 11, 14]
                        ])
                    })), function() {
                        return e.apply(this, arguments)
                    }),
                    u = function(t) {
                        i.player.getVideoId() == n && (i.player.getState() == a.ERROR && i.player.changeState(i.player.prevState), i.player.changeLivePhase(st), i.provider.src = t, i.provider.load(), i.player.getState() === a.PLAYING && i.play(), o = !0, r && i.delay(s, 3e3))
                    };
                this.player.getLivePhase() == st ? l() : s()
            }, e.prototype.checkHlsManifestValidity = function() {
                var t = Dt(regeneratorRuntime.mark(function t(e) {
                    var i, n;
                    return regeneratorRuntime.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2, this.request(e).promise;
                            case 2:
                                if (i = t.sent, !((n = i.response).indexOf("#EXT-X-STREAM-INF:") > 0 || n.indexOf("#EXTINF:") > 0)) {
                                    t.next = 6;
                                    break
                                }
                                return t.abrupt("return", e);
                            case 6:
                                return t.abrupt("return", !1);
                            case 7:
                            case "end":
                                return t.stop()
                        }
                    }, t, this)
                }));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }(), e.prototype.checkRtmpRedirect = function() {
                var t = Dt(regeneratorRuntime.mark(function t(e) {
                    var i, n, r;
                    return regeneratorRuntime.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                i = 0;
                            case 1:
                                if (!(i < 10)) {
                                    t.next = 15;
                                    break
                                }
                                if ("string" == typeof e) {
                                    t.next = 4;
                                    break
                                }
                                return t.abrupt("return", !1);
                            case 4:
                                if (0 !== e.indexOf("rtmp")) {
                                    t.next = 6;
                                    break
                                }
                                return t.abrupt("return", e);
                            case 6:
                                return e += (e.indexOf("?") > -1 ? "&" : "?") + "get_redirect_url=1", t.next = 9, this.request(e).promise;
                            case 9:
                                n = t.sent, r = n.response, e = trim(r);
                            case 12:
                                i++, t.next = 1;
                                break;
                            case 15:
                                return t.abrupt("return", !1);
                            case 16:
                            case "end":
                                return t.stop()
                        }
                    }, t, this)
                }));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }(), e.prototype.checkLiveEnded = function() {
                var t = this;
                this.player.checkLivePhase(function(e) {
                    switch (t.undelay(t.liveEndCheckTimeout), delete t.liveEndCheckTimeout, e.phase) {
                        case at:
                            t.onLiveEnded(e);
                            break;
                        case lt:
                            t.onLiveFailed(e);
                            break;
                        case ot:
                            t.liveEndCheckTimeout = t.delay(t.checkLiveEnded, 2e3);
                            break;
                        case st:
                            t.player.getState() == a.ERROR && t.player.changeState(t.player.prevState), t.isWaiting() && (e.media_url ? (t.provider.reset(), t.provider.src = e.media_url) : t.provider.delayRecoverNetwork && t.provider.delayRecoverNetwork()), t.player.getState() === a.PLAYING && t.provider.play(), t.liveEndCheckTimeout = t.delay(t.checkLiveEnded, 2e3)
                    }
                    t.onLiveWaiting(e.stream_error_text, e.stream_error_level)
                })
            }, e.prototype.onLiveStarted = function() {
                this.player.externalCall("onLiveStarted", this.player.getVideoId())
            }, e.prototype.onLiveEnded = function(t) {
                this.player.vars.duration = t.duration, t.jpg && (this.player.vars.jpg = t.jpg), this.player.trigger(B), this.switchToPostLive(t), this.player.externalCall("onLiveEnded", this.player.getVideoId(), t.deleted)
            }, e.prototype.onLiveFailed = function() {
                this.destroyProvider(), this.player.trigger(F, {
                    message: this.getLang("live_failed")
                })
            }, e.prototype.onLiveWaiting = function(t, e) {
                this.player.trigger(U, {
                    message: "warning" == e && t
                }), "fatal" == e && (this.player.trigger(F, {
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
                        if (t.player.getVideoId() == e) return t.checkPostliveDelayed(), !0
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
                e && this.player.isHlsSupported() ? (n = new Tt(this.player), r = e) : i && this.getVar("can_play_mp4") ? (n = new wt(this.player), r = i) : i && this.player.isFlashSupported() && (n = new It(this.player), r = i), n && r ? (this.player.changeLivePhase(at), this.player.changeState(a.ENDED), this.attachProvider(n), n.src = r, n.volume = this.getInitialVolume(), !this.player.isStartedPlaying() && this.getVar("autoplay") && this.player.play()) : (this.player.trigger(F, {
                    message: this.getLang("live_wait_record"),
                    waiting: !0
                }), this.checkPostliveDelayed())
            }, e.prototype.getAvailableQualities = function() {
                var t = [];
                if (this.provider && this.provider.getAvailableQualities) t = this.provider.getAvailableQualities();
                else
                    for (var e = this.getVar("hd") || 0, i = 0; i <= e; ++i) {
                        var n = dt(i);
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
            }, e.prototype.getAvailableSubtitleTracksInfo = function() {
                var t = [];
                return this.provider && this.provider.getAvailableSubtitleTracksInfo && (t = this.provider.getAvailableSubtitleTracksInfo()), t
            }, e.prototype.getSubtitleTrack = function() {
                return this.provider && this.provider.getSubtitleTrack ? this.provider.getSubtitleTrack() : -1
            }, e.prototype.onTimeupdate = function() {
                var t = this.curTime();
                this.player.trigger(x, t), this.player.isActiveLive() || St.savePref("position." + this.player.getVideoId(), {
                    date: Date.now(),
                    pos: t
                })
            }, e.prototype.filterSavedVideosPositions = function() {
                var t = St.getPref("position") || {},
                    e = Object.keys(t);
                if (e.length > 3) {
                    var i = void 0;
                    e.forEach(function(e) {
                        (!i || t[e].date < t[i].date) && (i = e)
                    }), St.deletePref("position." + i)
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
                    this.player.trigger(V, e / this.getDuration()), this.bufEndReached || t.end(t.length - 1) !== this.getDuration() || (this.bufEndReached = !0, this.player.getState() === a.PLAYING && this.vigoStats.triggerEvent("heartbeat"))
                }
            }, e.prototype.onVolumechange = function() {
                this.player.trigger(I, this.getVolume())
            }, e.prototype.onError = function(t) {
                if (!t || "hls" != this.providerType()) {
                    var e = this.getErrorCode();
                    if (this.player.debugLog("media error: " + e, {
                            force: !0
                        }), e == MediaError.MEDIA_ERR_NETWORK && Date.now() - intval(this.lastNetworkRecoveryTry) > 5e3) {
                        this.lastNetworkRecoveryTry = Date.now();
                        var i = this.player.getQuality();
                        this.setQuality(i)
                    } else {
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
                            this.player.trigger(F, {
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
                }
            }, e.prototype.onStateChange = function(t, e) {
                switch (this.updateVisibility(), t) {
                    case a.PLAYING:
                        this._disabled || (this.play(), this.vigoStats.triggerEvent("play"));
                        break;
                    case a.PAUSED:
                        this._disabled || (this.pause(), this.vigoStats.triggerEvent("pause"));
                        break;
                    case a.ENDED:
                        this.vigoStats.triggerEvent("stop")
                }
            }, e.prototype.onQualityChange = function(t, e, i) {
                this.vigoStats.triggerEvent(i ? "heartbeat" : "bitrate_change")
            }, e.prototype.onWaitingChange = function(t, e) {
                this.updateVisibility(), this.vigoStats.triggerEvent(t ? "buf_start" : "buf_stop"), this.player.getLivePhase() === st && (t ? this.liveEndCheckTimeout || (this.liveEndCheckTimeout = this.delay(this.checkLiveEnded, 2e3)) : (this.undelay(this.liveEndCheckTimeout), delete this.liveEndCheckTimeout))
            }, e.prototype.onUiSeekStart = function(t) {
                this._ui_seeking = !0, this._frame_seeking = t, this.pause()
            }, e.prototype.onUiSeekEnd = function() {
                var t = this;
                setTimeout(function() {
                    t._ui_seeking = !1, t._frame_seeking = !1, t.player.getState() !== a.PLAYING || t.provider.el.ended || t.play()
                })
            }, e.prototype.updateVisibility = function() {
                var t = this.buffering || this._disabled || !this.player.isInited() || this.aborted || this.player.getState() === a.ERROR;
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
                var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).ignoreCacheServer,
                    i = void 0 !== e && e;
                if (this.provider.setQuality) return this.provider.setQuality(t), void(-1 == t && this.vigoStats.triggerEvent("bitrate_change"));
                var n = this.getMp4Url(t, i),
                    r = this.curTime();
                this.provider.src = n, this.player.onQualityChanged(t), this.player.getState() !== a.UNSTARTED && (this.vigoStats.triggerEvent("bitrate_change"), this.provider.load(), this.provider.currentTime = r, this.player.getState() === a.PLAYING && this.play(), this.buffering = !0, this._lastInterruptionCheckTime = null)
            }, e.prototype.switchSubtitleTrack = function(t) {
                var e = t.trackId;
                this.provider.switchSubtitleTrack && this.provider.switchSubtitleTrack({
                    trackId: e
                })
            }, e.prototype.seekTo = function(t) {
                var e = this;
                this._frame_seeking || this.vigoStats.triggerEvent("heartbeat"), this.provider.currentTime = Math.max(0, Math.min(this.player.getDuration(), t)), this._frame_seeking || this.vigoStats.triggerEvent("seek");
                var i = this.isInBufferedArea(t);
                i || (this.buffering = !0), this.player.trigger(N, i), this.domListenOnce(this.provider.el, "seeked", function(t) {
                    e.buffering = !1, e.player.trigger(j, i)
                }), this._lastInterruptionCheckTime = null, this.onProgress()
            }, e.prototype.getVolume = function() {
                return this.provider ? this.provider.volume : 0
            }, e.prototype.setVolume = function(t) {
                this.provider && (this.provider.volume = t)
            }, e.prototype.isLooped = function() {
                return !!this.provider && this.provider.loop
            }, e.prototype.toggleLoop = function(t) {
                return !!this.provider && (this.provider.loop = t)
            }, e.prototype.canChangePlaybackRate = function() {
                return !!this.provider && this.provider.canChangePlaybackRate()
            }, e.prototype.setPlaybackRate = function(t) {
                this.provider && (this.provider.playbackRate = t)
            }, e.prototype.getPlaybackRate = function() {
                return this.provider ? this.provider.playbackRate : 1
            }, e.prototype.getVideoRatio = function() {
                return this.provider && this.provider.videoRatio || this.getVar("aspect_ratio") || 16 / 9
            }, e.prototype.canRotateVideo = function() {
                return !(this.getVar("stretch_vertical") && this.getVar("is_inline"))
            }, e.prototype.rotateVideo = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                this._rotateAlpha = !1 === t ? 0 : (this._rotateAlpha || 0) + t;
                var i = this._rotateAlpha % 180 ? 1 / this.getVideoRatio() : 1;
                e && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), setStyle(this.el, {
                    transform: this._rotateAlpha ? "rotate(" + this._rotateAlpha + "deg) scale(" + i + ")" : ""
                })
            }, e.prototype.isPiPModeAvailable = function() {
                var t = this.provider && this.provider.el;
                if (t) {
                    if (document.pictureInPictureEnabled) return !0;
                    if ("function" == typeof t.webkitSetPresentationMode) return !0
                }
                return !1
            }, e.prototype.togglePiPMode = function() {
                var t = this.provider.el;
                if (document.pictureInPictureEnabled) document.pictureInPictureElement === t ? document.exitPictureInPicture() : t.requestPictureInPicture();
                else if ("function" == typeof t.webkitSetPresentationMode) {
                    var e = "picture-in-picture" === t.webkitPresentationMode ? "inline" : "picture-in-picture";
                    t.webkitSetPresentationMode(e)
                }
            }, e.prototype.preload = function() {
                this.provider && this.player.getState() === a.UNSTARTED && (this.preloadRequested || (this.preloadRequested = !0, this.vigoStats.triggerEvent("play"), this.provider.readyState || (this.buffering = !0), this.vigoStats.triggerEvent("pause"), this.provider.load()))
            }, e.prototype.play = function() {
                this.provider && (this._disabled || this.player.getLivePhase() !== ut && (this.provider.readyState || (this.buffering = !0), this.provider.play(), this._lastInterruptionCheckTime = null))
            }, e.prototype.pause = function() {
                this.provider && !this._disabled && this.provider.pause()
            }, e.prototype.disablePlayback = function() {
                this._disabled || (this.pause(), this.player.isActiveLive() && this.provider.pauseLoad && this.provider.pauseLoad(), this._disabled = !0, this.updateVisibility(), this.vigoStats.triggerEvent("pause"))
            }, e.prototype.enablePlayback = function() {
                this._disabled && (this._disabled = !1, this.updateVisibility(), this.player.getState() === a.PLAYING && (this.player.isActiveLive() && this.provider.resumeLoad && this.provider.resumeLoad(), this.play(), this.vigoStats.triggerEvent("play")))
            }, e.prototype.isPlayingMedia = function() {
                return this.player.getState() === a.PLAYING && !this._disabled
            }, e.prototype.getMp4Url = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
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
                    if (r <= t && t <= o) return (o - r) / e * 100
                }
                return 0
            }, e.prototype.getLoadedBytes = function() {
                if (this.provider && this.provider.getLoadedBytes) return this.provider.getLoadedBytes()
            }, e.prototype.getBitrate = function() {
                if (this.provider && this.provider.getBitrate) return this.provider.getBitrate()
            }, e.prototype.getContentUrl = function() {
                if (this.provider) return this.provider.getContentUrl ? this.provider.getContentUrl() : this.provider.currentSrc
            }, e.prototype.getContentHost = function() {
                var t = this.getContentUrl();
                if (t) return ce("a", {
                    href: t
                }).hostname
            }, e.prototype.getErrorCode = function() {
                return this.provider && this.provider.error && this.provider.error.code || null
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
                if (this.player.getState() !== a.PLAYING || this.player.getLivePhase() === ut || this._ui_seeking || this._disabled || this.buffering || !this.provider) !this.interrupted || this.provider && this.provider.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA || (this.interrupted = !1);
                else {
                    if (null != this._lastInterruptionCheckTime) {
                        var t = this.provider.currentTime;
                        if (t - this._lastInterruptionCheckTime) this.interrupted = this.buffering = !1;
                        else this.player.isAutoplay() && !t || (this.interrupted = !0)
                    }
                    this._lastInterruptionCheckTime = this.provider.currentTime
                }
            }, e.prototype.destroy = function() {
                clearInterval(this._interruptionCheckerInterval), t.prototype.destroy.call(this)
            }, Ot(e, [{
                key: "buffering",
                get: function() {
                    return !!this._buffering
                },
                set: function(t) {
                    if (t != this._buffering) {
                        var e = this.isWaiting();
                        this._buffering = t;
                        var i = this.isWaiting();
                        e != i && this.player.trigger(R, i, !1)
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
                        e != i && this.player.trigger(R, i, !0)
                    }
                }
            }]), e
        }(yt);

        function Ft() {
            return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <g fill="none" fill-rule="evenodd">\n    <g fill-rule="nonzero">\n      <path class="_pause" d="m0 0h24v24h-24z"/>\n      <path class="_pause" d="m7.14520205 5h1.7095959c.39821169 0 .54261289.04664487.68819313.13423418.14558024.08758932.25983248.21612308.33768965.37990085.07785716.16377778.11931927.32622912.11931927.77421728v11.42329539c0 .4479882-.04146211.6104395-.11931927.7742173-.07785717.1637777-.19210941.2923115-.33768965.3799008s-.28998144.1342342-.68819313.1342342h-1.7095959c-.39821169 0-.54261289-.0466449-.68819313-.1342342s-.25983248-.2161231-.33768965-.3799008c-.07785716-.1637778-.11931927-.3262291-.11931927-.7742173v-11.42329539c0-.44798816.04146211-.6104395.11931927-.77421728.07785717-.16377777.19210941-.29231153.33768965-.37990085.14558024-.08758931.28998144-.13423418.68819313-.13423418zm7.99999995 0h1.709596c.3982117 0 .5426128.04664487.6881931.13423418.1455802.08758932.2598325.21612308.3376896.37990085.0778572.16377778.1193193.32622912.1193193.77421728v11.42329539c0 .4479882-.0414621.6104395-.1193193.7742173-.0778571.1637777-.1921094.2923115-.3376896.3799008-.1455803.0875893-.2899814.1342342-.6881931.1342342h-1.709596c-.3982117 0-.5426128-.0466449-.6881931-.1342342-.1455802-.0875893-.2598325-.2161231-.3376896-.3799008-.0778572-.1637778-.1193193-.3262291-.1193193-.7742173v-11.42329539c0-.44798816.0414621-.6104395.1193193-.77421728.0778571-.16377777.1921094-.29231153.3376896-.37990085.1455803-.08758931.2899814-.13423418.6881931-.13423418z" fill="#fff"/>\n      <path class="_play" d="m8.13340613 5.10548415 10.49681277 6.24354325c.3559987.2117494.472936.6720001.2611866 1.0279989-.0638111.1072809-.1533894.1969388-.2606135.2608453l-10.4968128 6.256187c-.35581027.2120659-.81616483.095538-1.02823068-.2602722-.06921066-.1161237-.10574852-.2487949-.10574852-.3839792v-12.49973035c0-.41421357.33578644-.75.75-.75.13495801 0 .26741554.03641567.38340613.1054073z" fill="#fff"/>\n    </g>\n    <path class="_replay" d="m12 4.5000003c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8c0-.5522847.44771525-1 1-1s1 .4477153 1 1c0 3.3137085 2.6862915 6 6 6s6-2.6862915 6-6-2.6862915-6-6-6v3.09577928c0 .09950642-.0370887.19544034-.104024.26906913-.1486028.16346309-.4015821.17550969-.5650451.02690691l-4.28830818-3.89846194c-.01565124-.0142284-.03061645-.02919361-.04484485-.04484485-.24767129-.27243841-.22759356-.69407063.04484485-.94174191l4.28830818-3.89846194c.0736287-.06693527.1695627-.10402398.2690691-.10402398.2209139 0 .4.17908611.4.40000002z" fill="#fff"/>\n  </g>\n</svg>\n  '
        }
        var Nt = function(t) {
            function e(i, n) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var r = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return r.el = r.buildEl(), r._transformProp = Pt("transform"), r._loaded = domByClass(r.el, "_loaded"), r._filled = domByClass(r.el, "_filled"), r._handle = domByClass(r.el, "_handle"), r._handleWrap = domByClass(r.el, "_handle_wrap"), r._callbacks = n || {}, r.domListen(r.el, "mousemove", r.onMove), r.domListen(r.el, "mouseleave", r.onOut), r.domListen(r.el, "mousedown", r.onMouseDown), r.domListen(r.el, "keydown", r.onKeydown), r
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.buildEl = function() {
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
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
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
        }(yt);
        var jt = function(t) {
                function e(i, n, r) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var o = void 0,
                        s = function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, i, {
                            mousemove: function(t) {
                                s.showPreviewAt(t)
                            },
                            mouseout: function(t) {
                                s.preview.hide(), s.tooltip.hide()
                            },
                            dragStart: function(t, e) {
                                s.player.trigger(W), e || s.player.seekToPercent(t), s.showPreviewAt(t), o = t
                            },
                            drag: function(t) {
                                var e = t * s.player.getDuration();
                                s.controls.updateTime(e), s.showPreviewAt(t)
                            },
                            dragEnd: function(t) {
                                s.player.trigger(q), t != o ? s.player.seekToPercent(t) : s.controls.updateTime(s.player.curTime()), s.preview.hide(), s.tooltip.hide()
                            }
                        }));
                    return s.controls = n, s.preview = r, addClass(s.el, "videoplayer_timeline_slider"), s.updateAria(), s
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.updateAria = function() {
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
            }(Nt),
            Ht = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            n = !0,
                            r = !1,
                            o = void 0;
                        try {
                            for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                        } catch (t) {
                            r = !0, o = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var Ut = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_timeline_preview",
                    innerHTML: '\n<div class="_preview"></div>\n<div class="_text"></div>\n<div class="_arrow"></div>\n      '
                }, {
                    display: "none"
                }), n._preview = domByClass(n.el, "_preview"), n._text = domByClass(n.el, "_text"), n._arrow = domByClass(n.el, "_arrow"), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.initVideo = function(t) {
                if (t.timeline_thumbs) {
                    var e = this.getThumbsData(),
                        i = e.frameWidth,
                        n = e.frameHeight;
                    i > 150 ? (n = n / i * 150, i = 150) : n > 150 && (i = i / n * 150, n = 150), this.frameWidth = i, this.frameHeight = n, setStyle(this._preview, {
                        width: i + "px",
                        height: n + "px"
                    }), this._imgUrls = e.links, this._imgUrls.forEach(function(t) {
                        return vkImage().src = t
                    })
                }
            }, e.prototype.getThumbsData = function() {
                var t = this.getVar("timeline_thumbs").split("|"),
                    e = Ht(t, 6);
                return {
                    frameWidth: e[0],
                    frameHeight: e[1],
                    countPerRow: e[2],
                    countPerImage: e[3],
                    countTotal: e[4],
                    links: e[5].split(",")
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
                    u = Math.floor(r.countPerImage / r.countPerRow);
                s === Math.floor(r.countTotal / r.countPerImage) && (u = Math.floor(r.countTotal % r.countPerImage / r.countPerRow), r.countTotal % r.countPerImage % r.countPerRow > 0 && u++);
                var h = r.countPerRow;
                s === Math.floor(r.countTotal / r.countPerImage) && r.countTotal % r.countPerImage > 0 && (h = Math.min(r.countPerRow, r.countTotal % r.countPerImage));
                var c = this.frameWidth * h,
                    d = this.frameHeight * u,
                    p = -l * this.frameWidth,
                    f = -a * this.frameHeight;
                setStyle(this._preview, {
                    backgroundImage: "url(" + this._imgUrls[s] + ")",
                    backgroundSize: c + "px " + d + "px",
                    backgroundPosition: p + "px " + f + "px"
                });
                var y = this.player.el.getBoundingClientRect(),
                    v = e.getBoundingClientRect(),
                    g = v.left - y.left + v.width * i,
                    _ = 0;
                (g -= Math.round(this.frameWidth / 2) + 3) < 7 && (_ = g - 7 - 3.5, g = 7), setStyle(this.el, {
                    left: g + "px"
                }), setStyle(this._arrow, {
                    marginLeft: _ ? _ + "px" : null
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
        }(yt);
        var zt = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t) {
                        r.player.setVolume(t), r.vertical || r.tooltip.show({
                            el: r.el,
                            text: Math.round(100 * t) + "%",
                            offsetXpercent: t,
                            offsetY: 16
                        })
                    },
                    r = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i, {
                        dragStart: n,
                        drag: n,
                        dragEnd: function(t) {
                            r.tooltip.hide()
                        }
                    }));
                return addClass(r.el, "videoplayer_volume_slider"), r.initAria({
                    label: r.getLang("aria_volume_slider"),
                    valuemin: 0,
                    valuemax: 100,
                    valuetext: function(t, e, i) {
                        var n = Math.round(100 * r.player.getVolume()) + "%";
                        return r.player.isMuted() && (n += " (" + r.getLang("aria_volume_muted") + ")"), n
                    }
                }), r
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e
        }(Nt);
        var Qt = function(t) {
            function e(i, n) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var r = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i, n));
                return r.el = r._buildEl(n.title, n.items), r.domListen(r.el, "click", function(t) {
                    r._onClick(t, n.onItemClick)
                }), r.domListen(domByClass(r.el, "videoplayer_settings_menu_sublist_header"), "click", function() {
                    r._onClose(n.onSublistClose)
                }), setTimeout(function() {
                    r.el.style.width = r.el.offsetWidth + "px", r._scroll = new uiScroll(domByClass(r.el, "videoplayer_settings_menu_sublist_items"), {
                        global: !0,
                        theme: "dark"
                    })
                }), r
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype._buildEl = function(t, e) {
                var i = "";
                i += '<div class="videoplayer_settings_menu_sublist_header">' + t + "</div>", i += '<div class="videoplayer_settings_menu_sublist_divider"></div>';
                var n = "",
                    r = !0,
                    o = !1,
                    s = void 0;
                try {
                    for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done); r = !0) {
                        var u = a.value;
                        n += '\n        <div class="videoplayer_settings_menu_sublist_item ' + (u.additionalClasses ? u.additionalClasses : "") + '"\n             data-value="' + u.value + '"\n             data-setting="' + u.setting + '"\n             role="menuitemradio"\n             tabindex="0">\n            ' + u.title + "\n        </div>\n      "
                    }
                } catch (t) {
                    o = !0, s = t
                } finally {
                    try {
                        !r && l.return && l.return()
                    } finally {
                        if (o) throw s
                    }
                }
                return i += '<div class="videoplayer_settings_menu_sublist_items">' + n + "</div>", se('<div class="videoplayer_settings_menu_sublist">' + i + "</div>")
            }, e.prototype._onClick = function(t, e) {
                (this.destroy(), e) && e(attr(t.target, "data-setting"), +attr(t.target, "data-value"))
            }, e.prototype._onClose = function(t) {
                this.destroy(), t && t()
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this._scroll && (this._scroll.destroy(), this._scroll = null), re(this.el)
            }, e
        }(yt);
        var Wt = "quality",
            qt = "subtitles",
            Gt = "playback_speed",
            Yt = function(t) {
                function e(i, n) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var r = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    r.el = se('\n<div class="videoplayer_settings">\n  <div class="videoplayer_settings_menu_list hidden" role="menu"></div>\n</div>\n    ');
                    var o = [Wt, qt, Gt];
                    r._settingsList = {};
                    var s = !0,
                        a = !1,
                        l = void 0;
                    try {
                        for (var u, h = function() {
                                var t = u.value;
                                r._settingsList[t] = {
                                    ariaLabel: "",
                                    initialValue: "",
                                    onClick: function() {
                                        r._openSublist(t)
                                    },
                                    title: r.getLang(t),
                                    type: t
                                }
                            }, c = o[Symbol.iterator](); !(s = (u = c.next()).done); s = !0) h()
                    } catch (t) {
                        a = !0, l = t
                    } finally {
                        try {
                            !s && c.return && c.return()
                        } finally {
                            if (a) throw l
                        }
                    }
                    return r._settingsList[Wt].initialValue = r.player.getQuality(), r._settingsList[Gt].initialValue = r.getLang("playback_speed_normal"), r._settingsList[Gt].titleShort = r.getLang("playback_speed_short"), r._btn = n, r._menu = domByClass(r.el, "videoplayer_settings_menu_list"), r.domListen(r.el, "keydown", r._onKeyDown), r.domListen(r.el, "mouseenter", r._onMouseEnter), r.domListen(r.el, "mouseleave", r._onMouseLeave), r.domListen(r._btn, "keydown", r._onKeyDown), r.domListen(r._btn, "mouseenter", r._onMouseEnter), r.domListen(r._btn, "mouseleave", r._onMouseLeave), r.domListen(r._btn, "click", r._onBtnClick), r.playerListen(f, r._updateSubtitles), r.playerListen(v, r._updateSubtitles), r.playerListen(p, r._updateQualities), r.playerListen(y, r._updateQualities), r.playerListen(d, r._onPlayerStateChange), r
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.initVideo = function(t) {
                    this._buildMenu(this._settingsList), this._updateQualities(), this._subtitleLangs = t.subtitles_langs
                }, e.prototype._buildMenu = function(t) {
                    var e = this,
                        i = "";
                    each(t, function(t, n) {
                        e._isControlAvailable(n.type) && (i += '\n        <div class="videoplayer_settings_menu_list_item videoplayer_settings_menu_list_item_' + n.type + '" role="menuitemradio" tabindex="0">\n          <div class="videoplayer_settings_menu_list_icon videoplayer_settings_menu_list_icon_' + n.type + '"></div>\n          <div class="videoplayer_settings_menu_list_title">' + n.title + '</div>\n          <div class="videoplayer_settings_menu_list_value">' + n.initialValue + "</div>\n        </div>\n      ")
                    }), val(this._menu, i), each(t, function(t, i) {
                        var n = domByClass(e._menu, "videoplayer_settings_menu_list_item_" + i.type);
                        e._toggleControl(n, e._isControlVisible(i.type)), e.domListen(n, "click", i.onClick)
                    }), this._menuItems = geByClass("videoplayer_settings_menu_list_item", this._menu)
                }, e.prototype._getPlaybackRates = function() {
                    for (var t = [], e = .25; e <= 2; e += .25) {
                        var i = "";
                        this.player.getPlaybackRate() === e && (i += " active"), t.push({
                            additionalClasses: i,
                            setting: Gt,
                            title: this._getPlaybackRateText(e),
                            value: e
                        })
                    }
                    return t
                }, e.prototype._getPlaybackRateText = function(t) {
                    return 1 === t ? this.getLang("playback_speed_normal") : langNumeric(t, "%s", !0) + "x"
                }, e.prototype._getQualities = function() {
                    var t = [],
                        e = this.player.isAutoQualityEnabled();
                    if (this.player.isAutoQualityAvailable()) {
                        var i = "";
                        e && (i += " active"), t.push({
                            additionalClasses: i,
                            setting: Wt,
                            title: this.getLang("quality_auto"),
                            value: -1
                        })
                    }
                    var n = !0,
                        r = !1,
                        o = void 0;
                    try {
                        for (var s, a = this.player.getAvailableQualities()[Symbol.iterator](); !(n = (s = a.next()).done); n = !0) {
                            var l = s.value,
                                u = "";
                            this.player.getQuality() !== l || e || (u += " active"), this._isQualityHD(l) && (u += " label_hd"), t.push({
                                additionalClasses: u,
                                setting: Wt,
                                title: l + "p",
                                value: l
                            })
                        }
                    } catch (t) {
                        r = !0, o = t
                    } finally {
                        try {
                            !n && a.return && a.return()
                        } finally {
                            if (r) throw o
                        }
                    }
                    return t
                }, e.prototype._getSubtitles = function() {
                    var t = [],
                        e = ""; - 1 === this.player.getSubtitleTrack() && (e += " active"), t.push({
                        additionalClasses: e,
                        setting: qt,
                        title: this.getLang("subtitles_off"),
                        value: -1
                    });
                    var i = !0,
                        n = !1,
                        r = void 0;
                    try {
                        for (var o, s = this.player.getAvailableSubtitleTracksInfo()[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                            var a = o.value,
                                l = "";
                            this.player.getSubtitleTrack() === a.id && (l += " active"), t.push({
                                additionalClasses: l,
                                setting: qt,
                                title: this._getSubtitleTitle(a),
                                value: a.id
                            })
                        }
                    } catch (t) {
                        n = !0, r = t
                    } finally {
                        try {
                            !i && s.return && s.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                    return t
                }, e.prototype._getSettingItems = function(t) {
                    switch (t) {
                        case Gt:
                            return this._getPlaybackRates();
                        case Wt:
                            return this._getQualities();
                        case qt:
                            return this._getSubtitles()
                    }
                    return []
                }, e.prototype._getSubtitleTitle = function(t) {
                    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (!t) return "";
                    var i = clean(t.name).replace(/&amp;/g, "&");
                    if (!t.lang) return i;
                    var n = this._subtitleLangs[t.lang].name;
                    return e && n !== t.name ? n + ' <div class="videoplayer_settings_menu_sublist_item_tip">' + i + "</div>" : n
                }, e.prototype._isControlAvailable = function(t) {
                    switch (t) {
                        case Gt:
                            return !this.player.isActiveLive() && this.player.canChangePlaybackRate()
                    }
                    return !0
                }, e.prototype._isControlVisible = function(t) {
                    switch (t) {
                        case Gt:
                            var e = this.player.getLivePhase();
                            return this.player.getState() !== a.ERROR && (!e || e === at)
                    }
                    return !1
                }, e.prototype._isQualityHD = function(t) {
                    return t >= 720
                }, e.prototype._onBtnClick = function(t) {
                    this._disabled || t.target === this._menu || isAncestor(t.target, this._menu) || (this._currentSublist ? this._onSublistClose() : this.toggle(!this.isOpen()))
                }, e.prototype._onPlayerStateChange = function(t, e) {
                    var i = domByClass(this.el, "videoplayer_settings_menu_list_item_" + Gt),
                        n = domByClass(this.el, "videoplayer_settings_menu_list_item_" + qt);
                    t === a.ERROR ? (this._toggleControl(i, !1), this._toggleControl(n, !1)) : e === a.ERROR && (this._toggleControl(i, !0), this._toggleControl(n, this.player.getAvailableSubtitleTracksInfo().length))
                }, e.prototype._onKeyDown = function(t) {
                    switch (t.keyCode) {
                        case KEY.UP:
                        case KEY.DOWN:
                            if (this.isOpen() || this._currentSublist) {
                                var e = this._currentSublist ? geByClass("videoplayer_settings_menu_sublist_item", this._currentSublist.el) : this._menuItems,
                                    i = e.length,
                                    n = t.keyCode === KEY.DOWN ? 1 : -1;
                                e[(i + indexOf(e, t.target) + n) % i].focus()
                            } else this.toggle(!0);
                            t.preventDefault(), t.stopPropagation();
                            break;
                        case KEY.ESC:
                            this.isOpen() ? (this.toggle(!1), t.preventDefault(), t.stopPropagation()) : this._currentSublist && (this._onSublistClose(), t.preventDefault(), t.stopPropagation())
                    }
                }, e.prototype._onMouseEnter = function() {
                    this._disabled || (clearTimeout(this._hideTimeout), this.isOpen() || (Date.now() - this.tooltip.lastShown < 50 ? this.showTooltip() : this._tooltipTimeout = setTimeout(this.showTooltip.bind(this), 1e3)))
                }, e.prototype._onMouseLeave = function() {
                    this._hideTimeout = setTimeout(this.toggle.bind(this, !1), 1e3), this.tooltip.hide(), clearTimeout(this._tooltipTimeout)
                }, e.prototype._onChangeSetting = function(t, e) {
                    switch (t) {
                        case Gt:
                            this.player.setPlaybackRate(e), this._updatePlaybackRate();
                            break;
                        case Wt:
                            this.player.setQuality(e);
                            break;
                        case qt:
                            this.player.switchSubtitleTrack(e)
                    }
                }, e.prototype._onSublistClose = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this._currentSublist) {
                        if (e) return toggleClass(this._currentSublist.el, "hidden", !0), void setTimeout(function() {
                            t._currentSublist.destroy(), t._currentSublist = null
                        }, 250);
                        this._currentSublist.destroy(), this._currentSublist = null, setTimeout(function() {
                            t.isOpen() ? t._menuItems[0].focus() : t._btn.focus()
                        }, 100)
                    }
                }, e.prototype._openSublist = function(t) {
                    var e = this;
                    if (this._settingsList && this._settingsList[t]) {
                        this.toggle(), this._currentSublist = new Qt(this.player, {
                            items: this._getSettingItems(t),
                            onItemClick: function(t, i) {
                                e._onChangeSetting(t, i), e._onSublistClose()
                            },
                            onSublistClose: function() {
                                e.toggle(), e._onSublistClose()
                            },
                            title: this._settingsList[t].titleShort || this._settingsList[t].title
                        }), this.el.appendChild(this._currentSublist.el);
                        var i = this._currentSublist.el;
                        domByClass(i, "active").focus()
                    }
                }, e.prototype._toggleControl = function(t, e) {
                    setStyle(t, {
                        display: e ? "" : "none"
                    })
                }, e.prototype._updatePlaybackRate = function() {
                    var t = this._getPlaybackRateText(this.player.getPlaybackRate()),
                        e = domByClass(this.el, "videoplayer_settings_menu_list_item_" + Gt),
                        i = domByClass(e, "videoplayer_settings_menu_list_value");
                    val(i, t)
                }, e.prototype._updateQualities = function() {
                    if (this._menu) {
                        var t = domByClass(this._menu, "videoplayer_settings_menu_list_item_" + Wt),
                            e = domByClass(t, "videoplayer_settings_menu_list_value");
                        this._toggleControl(t, this.player.getAvailableQualities().length > 1);
                        var i = this.player.getQuality(),
                            n = this.player.isAutoQualityEnabled() ? this.getLang("quality_auto") + " " + i + "p" : i + "p";
                        val(e, n), toggleClass(t, "label_hd", this._isQualityHD(i)), toggleClass(this._btn, "videoplayer_btn_settings_hd", this._isQualityHD(i))
                    }
                }, e.prototype._updateSubtitles = function(t, e) {
                    var i = domByClass(this.el, "videoplayer_settings_menu_list_item_" + qt),
                        n = domByClass(i, "videoplayer_settings_menu_list_value");
                    this._toggleControl(i, t.length);
                    var r = this._getSubtitleTitle(e, !1) || this.getLang("subtitles_off");
                    val(n, r)
                }, e.prototype.disable = function() {
                    this.toggle(!1), this._disabled = !0, setStyle(this._wrap, {
                        cursor: "default"
                    })
                }, e.prototype.enable = function() {
                    this._disabled = !1, setStyle(this._wrap, {
                        cursor: ""
                    })
                }, e.prototype.isOpen = function() {
                    return !hasClass(this._menu, "hidden")
                }, e.prototype.isSublistOpen = function() {
                    return !!this._currentSublist
                }, e.prototype.showTooltip = function() {
                    var t = this;
                    this._disabled || this.isOpen() || this.isSublistOpen() || this.tooltip.show({
                        el: this._btn,
                        text: function() {
                            return t.getLang("open_settings")
                        },
                        offsetY: 10
                    })
                }, e.prototype.toggle = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !this.isOpen();
                    e || this._onSublistClose(!0), e !== this.isOpen() && (toggleClass(this._menu, "hidden", !e), attr(this._menu, "aria-hidden", !e), e ? (this.tooltip.hide(), attr(this._btn, "tabindex", -1), setTimeout(function() {
                        return t._menuItems[0].focus()
                    }, 100)) : (attr(this._btn, "tabindex", 0), domPN(document.activeElement) === this._menu && this._btn.focus()), attr(this._btn, "aria-expanded", e))
                }, e
            }(yt),
            Kt = i("QOPk");

        function Xt(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
            return Array.from(t)
        }
        var Jt = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n.buildEl(), n.buildTimelineSlider(), n.buildVolumeSlider(), n.buildSettingsMenu(), n._isTimeReversed = !!St.getPref("time_reversed"), n.playerListen(d, n.onStateChange), n.playerListen(_, n.onFullscreenChange), n.playerListen(x, n.onMediaTimeupdate), n.playerListen(V, n.updateBuffered), n.playerListen(I, n.updateVolume), n.playerListen(M, n.updateDuration), n.playerListen(m, n.onSeek), n.playerListen(b, function() {
                        n.toggleControl(n.btnExpand, !1)
                    }), n.playerListen(et, n.onLinearAdStarted), n.playerListen(it, n.onLinearAdCompleted), n.playerListen(tt, function(t, e, i) {
                        n.updateTime(t)
                    }), n.playerListen(P, n.onLivePhaseChange), n.playerListen(f, function(t) {
                        n.toggleControl(n.btnSubtitles, n.isControlAvailable("subtitles"))
                    }), n.playerListen(v, function() {
                        var t = n.player.getSubtitleTrack();
                        toggleClass(n.btnSubtitles, "active", t > -1), t > -1 ? attr(n.btnSubtitles, "aria-label", n.getLang("disable_subtitles")) : attr(n.btnSubtitles, "aria-label", n.getLang("enable_subtitles"))
                    }), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.buildEl = function() {
                    var t = this;
                    this.el = se('\n<div class="videoplayer_controls">\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_play" role="button" tabindex="0" aria-label="' + this.getLang("play") + '">\n    ' + Ft("videoplayer_btn_icon videoplayer_play_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_next" role="button" tabindex="0" aria-label="' + this.getLang("next") + '">\n    <div class="videoplayer_btn_icon videoplayer_next_icon"></div>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_live" style="display:none;">\n    ' + function() {
                        return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="84 14 42 20" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd" transform="translate(84 14)">\n    <rect fill="#F75148" width="42" height="20" rx="2"/>\n    <path d="M26.874 6.486l-2.464 7.562c-.17.523-.756.952-1.307.952h-.206c-.552 0-1.136-.426-1.307-.952l-2.464-7.562c-.06-.11-.103-.233-.12-.363L19 6.1h.005C19.002 6.067 19 6.034 19 6c0-.552.448-1 1-1 .52 0 .945.395.995.9H21l2 6.4 2-6.4h.005c.05-.505.476-.9.995-.9.552 0 1 .448 1 1 0 .034-.002.067-.005.1H27l-.007.023c-.016.13-.058.253-.12.363zM31 9V7h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1h-4.02c-.268 0-.515.11-.696.29-.184.184-.294.432-.294.705v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31v-2h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31zM9 13V5.995C9 5.455 8.552 5 8 5c-.556 0-1 .446-1 .995v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H9zm6-7.005c0-.55.444-.995 1-.995.552 0 1 .456 1 .995v8.01c0 .55-.444.995-1 .995-.552 0-1-.456-1-.995v-8.01z" fill="#F0F2F5"/>\n  </g>\n</svg>\n  '
                    }("videoplayer_btn_icon videoplayer_live_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_timeline"></div>\n  <div class="videoplayer_controls_item videoplayer_time">\n    <span class="_time_current"></span><span class="_time_duration"></span>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_mute" role="button" tabindex="0" aria-label="' + this.getLang("volume_off") + '">\n    ' + function() {
                        return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" xmlns="http://www.w3.org/2000/svg">\n  <g fill="#fff" fill-rule="evenodd">\n    <path class="_wave2" d="M12.980843 18.8227621c-.032051 1.2070086-.6704932 1.608931-1.8287519.6202507-1.7185995-1.4687545-3.60887471-3.1942931-4.24215929-3.7215065-.63217937-.528454-1.64491897-.6202511-3.07284859-.6202511-1.42682441 0-1.81505873-.6202511-1.81505873-1.2405016s-.01369327-1.8288162-.01369327-2.001246c0-.0549443.00464608-.085056.01369327-.1291845.01954957-.0953551-.05817756-.9728525 0-1.591076.08510106-.90556663.38823432-1.24050252 1.81505873-1.24050252 1.42792962 0 2.44066922-.09179716 3.07284859-.62025109.63328458-.52845393 2.52355979-2.25275186 4.24215929-3.72150644 1.1582587-.98868024 1.7967003-.58675756 1.8287514.62025106.0431031 1.60645033 5e-7 3.85020301 5e-7 6.68226949 0 2.8295855.0431032 5.3568042 0 6.9632545zm2.9004386-8.7040437c-.3417088-.34170872-.3417088-.89572808 0-1.23743683.3417087-.34170876.8957281-.34170876 1.2374368 0 .1762598.17625972.4111566.46988072.6409943.87209686C18.1429358 10.4240187 18.375 11.1782274 18.375 12s-.2320642 1.5759813-.6152873 2.2466216c-.2298377.4022161-.4647345.6958371-.6409943.8720968-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368.0737402-.0737403.2138434-.2488693.3590057-.5029032C16.4820642 12.9552687 16.625 12.4907274 16.625 12s-.1429358-.9552687-.3847127-1.3783784c-.1451623-.2540339-.2852655-.4291629-.3590057-.5029032zm3-1.99999997c-.3417088-.34170875-.3417088-.89572811 0-1.23743686.3417087-.34170876.8957281-.34170876 1.2374368 0 .2637116.26371158.6207023.73969919.9665078 1.43131016.5167785 1.03355701.842501 2.25503497.8892639 3.71655167-.0467629 1.4032299-.3724854 2.6247079-.8892639 3.6582649-.3458055.6916109-.7027962 1.1675985-.9665078 1.4313101-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368.1375896-.1375897.3825507-.4642045.638697-.9764971.4071252-.8142505.6673665-1.7901701.7054825-2.8756411-.038116-1.1437578-.2983573-2.11967743-.7054825-2.93392787-.2561463-.51229266-.5011074-.83890747-.638697-.9764971z"/>\n    <path class="_wave1" d="M12.980843 18.8227621c-.032051 1.2070086-.6704932 1.608931-1.8287519.6202507-1.7185995-1.4687545-3.60887471-3.1942931-4.24215929-3.7215065-.63217937-.528454-1.64491897-.6202511-3.07284859-.6202511-1.42682441 0-1.81505873-.6202511-1.81505873-1.2405016s-.01369327-1.8288162-.01369327-2.001246c0-.0549443.00464608-.085056.01369327-.1291845.01954957-.0953551-.05817756-.9728525 0-1.591076.08510106-.90556663.38823432-1.24050252 1.81505873-1.24050252 1.42792962 0 2.44066922-.09179716 3.07284859-.62025109.63328458-.52845393 2.52355979-2.25275186 4.24215929-3.72150644 1.1582587-.98868024 1.7967003-.58675756 1.8287514.62025106.0431031 1.60645033 5e-7 3.85020301 5e-7 6.68226949 0 2.8295855.0431032 5.3568042 0 6.9632545zm2.9004386-8.7040437c-.3417088-.34170872-.3417088-.89572808 0-1.23743683.3417087-.34170876.8957281-.34170876 1.2374368 0 .1762598.17625972.4111566.46988072.6409943.87209686C18.1429358 10.4240187 18.375 11.1782274 18.375 12s-.2320642 1.5759813-.6152873 2.2466216c-.2298377.4022161-.4647345.6958371-.6409943.8720968-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368.0737402-.0737403.2138434-.2488693.3590057-.5029032C16.4820642 12.9552687 16.625 12.4907274 16.625 12s-.1429358-.9552687-.3847127-1.3783784c-.1451623-.2540339-.2852655-.4291629-.3590057-.5029032z"/>\n    <path class="_cross" d="M20 10.7625631l2.3812816-2.38128153c.3417087-.34170876.8957281-.34170876 1.2374368 0 .3417088.34170875.3417088.89572811 0 1.23743686L21.2374369 12l2.3812815 2.3812816c.3417088.3417087.3417088.8957281 0 1.2374368-.3417087.3417088-.8957281.3417088-1.2374368 0L20 13.2374369l-2.3812816 2.3812815c-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368L18.7625631 12l-2.3812815-2.38128157c-.3417088-.34170875-.3417088-.89572811 0-1.23743686.3417087-.34170876.8957281-.34170876 1.2374368 0zm-7.019157 8.060199c-.032051 1.2070086-.6704932 1.608931-1.8287519.6202507-1.7185995-1.4687545-3.60887471-3.1942931-4.24215929-3.7215065-.63217937-.528454-1.64491897-.6202511-3.07284859-.6202511-1.42682441 0-1.81505873-.6202511-1.81505873-1.2405016s-.01369327-1.8288162-.01369327-2.001246c0-.0549443.00464608-.085056.01369327-.1291845.01954957-.0953551-.05817756-.9728525 0-1.591076.08510106-.90556663.38823432-1.24050252 1.81505873-1.24050252 1.42792962 0 2.44066922-.09179716 3.07284859-.62025109.63328458-.52845393 2.52355979-2.25275186 4.24215929-3.72150644 1.1582587-.98868024 1.7967003-.58675756 1.8287514.62025106.0431031 1.60645033 5e-7 3.85020301 5e-7 6.68226949 0 2.8295855.0431032 5.3568042 0 6.9632545z"/>\n  </g>\n</svg>\n  '
                    }("videoplayer_btn_icon videoplayer_volume_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_volume"></div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_expand" style="display:none;" role="button" tabindex="0" aria-label="' + this.getLang("expand") + '">\n    ' + function() {
                        return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="729 480 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M729 481.994c0-1.1.895-1.994 1.994-1.994h12.012c1.1 0 1.994.895 1.994 1.994v12.012c0 1.1-.895 1.994-1.994 1.994h-12.012c-1.1 0-1.994-.895-1.994-1.994v-12.012zm2 4.004c0-.55.456-.998 1.002-.998h9.996c.553 0 1.002.446 1.002.998v7.004c0 .55-.456.998-1.002.998h-9.996c-.553 0-1.002-.446-1.002-.998v-7.004z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
                    }("videoplayer_btn_icon videoplayer_expand_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_subtitles" role="button" tabindex="0" aria-haspopup="true" aria-label="' + this.getLang("enable_subtitles") + '">\n    <div class="videoplayer_btn_icon videoplayer_subtitles_icon"></div>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_settings" role="button" tabindex="0" aria-haspopup="true" aria-label="' + this.getLang("aria_open_settings") + '">\n    <div class="videoplayer_btn_icon videoplayer_settings_icon"></div>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_fullscreen" role="button" tabindex="0" aria-label="' + this.getLang("aria_enter_fullscreen") + '">\n    ' + function() {
                        return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" xmlns="http://www.w3.org/2000/svg">\n  <g fill="#fff" fill-rule="evenodd">\n    <path class="_enter" d="M10.5 19c0 .5522847-.4477153 1-1 1H5c-.55228475 0-1-.4477153-1-1v-4.5c0-.5522847.44771525-1 1-1s1 .4477153 1 1v2.0715l3.36290054-3.3643932.00012963-.0001296c.39052429-.3905243 1.02368923-.3905243 1.41421353 0l.0157791.0157791.0001297.0001296c.3904527.3905959.3903366 1.0237609-.0002593 1.4142136L7.4285 18H9.5c.5522847 0 1 .4477153 1 1zM18 7.4285l-3.3629005 3.3643932c-.0000432.0000432-.0000865.0000864-.0001297.0001296-.3905243.3905243-1.0236892.3905243-1.4142135 0l-.0157791-.0157791c-.0000433-.0000432-.0000865-.0000864-.0001297-.0001296-.3904527-.3905959-.3903366-1.02376087.0002593-1.41421356L16.5715 6H14.5c-.5522847 0-1-.44771525-1-1s.4477153-1 1-1H19c.5522847 0 1 .44771525 1 1v4.5c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1z"/>\n    <path class="_exit" d="M4.57969048 13.9787492c0-.5464165.44295809-.9893746.9893746-.9893746h4.45218572c.5464165 0 .9893746.4429581.9893746.9893746v4.4521857c0 .5464165-.4429581.9893746-.9893746.9893746-.54641651 0-.98937461-.4429581-.98937461-.9893746v-2.0494895l-3.3196551 3.3211319-.00012963.0001297c-.39052429.3905243-1.02368927.3905243-1.41421356 0l-.00058487-.0005849-.00012964-.0001297c-.39045268-.3905958-.3903366-1.0237608.00025929-1.4142135l3.32113189-3.3196551H5.56906508c-.54641651 0-.9893746-.4429581-.9893746-.9893746zM14.9681238 7.61855457l3.3196551-3.32113189.0001296-.00012966c.3905243-.39052429 1.0236893-.39052429 1.4142136 0l.0005849.00058488.0001296.00012965c.3904527.39059589.3903366 1.02376086-.0002593 1.41421354l-3.3211319 3.3196551h2.0494895c.5464165 0 .9893746.4429581.9893746.98937461 0 .5464165-.4429581.9893746-.9893746.9893746h-4.4415603c-.5522847 0-1-.4477153-1-1V5.56906508c0-.54641651.4429581-.9893746.9893746-.9893746s.9893746.44295809.9893746.9893746z"/>\n  </g>\n</svg>\n  '
                    }("videoplayer_btn_icon videoplayer_fullscreen_icon") + '\n  </div>\n  \x3c!--<div class="videoplayer_controls_item videoplayer_quality" role="button" tabindex="0" aria-haspopup="true" aria-label="' + this.getLang("hdsd") + '"></div>--\x3e\n  <a class="videoplayer_controls_item videoplayer_btn videoplayer_btn_vk" style="display:none;" target="_blank" rel="noopener" aria-label="' + this.getLang("goto_orig_video") + '">\n    ' + function() {
                        return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="916 568 28 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M938.55 575.79s3.6-5.068 3.974-6.79c.188-.625-.187-1-.813-1h-3.065c-.75 0-1.064.313-1.252.75 0 0-1.5 3.66-3.63 6.04-.687.687-1 .906-1.375.906-.188 0-.47-.22-.47-.844v-5.85c0-.752-.094-1.002-.72-1.002h-4.817c-.47 0-.688.264-.688.594 0 .712 1.064.876 1.064 2.88v4.348c0 .813-.063 1.126-.438 1.126-1 0-3.436-3.677-4.88-7.884-.284-.818-.59-1.064-1.346-1.064h-3.13c-.5 0-.812.313-.812.75 0 .783 1 4.663 4.662 9.793 2.44 3.504 5.756 5.32 8.885 5.32 1.877 0 2.315-.314 2.315-1.065v-2.628c0-.563.094-1.032.688-1.032.438 0 1.19.22 2.94 1.908 2.004 2.003 2.19 2.816 3.318 2.816h3.504c.375 0 .688-.188.688-.75 0-.814-1.064-2.19-2.565-3.88-.69-.814-1.72-1.69-2.034-2.128-.437-.563-.312-.813 0-1.314" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
                    }("videoplayer_btn_icon videoplayer_vk_icon") + "\n  </a>\n</div>\n    "), this.btnSettings = domByClass(this.el, "videoplayer_btn_settings"), this.btnSubtitles = domByClass(this.el, "videoplayer_btn_subtitles"), this.btnPlay = domByClass(this.el, "videoplayer_btn_play"), this.btnNext = domByClass(this.el, "videoplayer_btn_next"), this.btnMute = domByClass(this.el, "videoplayer_btn_mute"), this.btnMuteIcon = domByClass(this.el, "videoplayer_volume_icon"), this.btnExpand = domByClass(this.el, "videoplayer_btn_expand"), this.btnFullscreen = domByClass(this.el, "videoplayer_btn_fullscreen"), this.btnLogo = domByClass(this.el, "videoplayer_btn_vk"), this.liveLabel = domByClass(this.el, "videoplayer_live"), this.timeLabel = domByClass(this.el, "videoplayer_time"), this.timeLabelCurrent = domByClass(this.timeLabel, "_time_current"), this.timeLabelDuration = domByClass(this.timeLabel, "_time_duration"), this.timelineContainer = domByClass(this.el, "videoplayer_timeline"), this.volumeContainer = domByClass(this.el, "videoplayer_volume"), this.domListen(this.btnPlay, "click", function() {
                        return t.player.togglePlay()
                    }), this.domListen(this.btnNext, "click", function() {
                        return t.player.nextVideo()
                    }), this.domListen(this.btnMute, "click", function() {
                        return t.player.toggleMute()
                    }), this.domListen(this.btnMute, "mouseenter", this.onVolumeOver), this.domListen(this.btnMute, "mouseleave", this.onVolumeOut), this.domListen(this.btnExpand, "click", function() {
                        return t.player.expand()
                    }), this.domListen(this.btnFullscreen, "click", function() {
                        return t.player.toggleFullscreen()
                    }), this.domListen(this.btnSubtitles, "click", function() {
                        return t.player.switchSubtitleTrack(null, !0)
                    }), this.domListen(this.timeLabel, "click", function() {
                        return t.toggleTime()
                    }), this.domListen(this.volumeContainer, "mouseenter", this.onVolumeOver), this.domListen(this.volumeContainer, "mouseleave", this.onVolumeOut), this.attachTooltip({
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
                        el: this.btnSubtitles,
                        text: function() {
                            return t.getLang(-1 === t.player.getSubtitleTrack() ? "enable_subtitles" : "disable_subtitles")
                        },
                        offsetY: -2,
                        hideOnClick: !0
                    }), this.attachTooltip({
                        el: this.btnLogo,
                        text: this.getLang("goto_orig_video"),
                        offsetY: -4
                    }), Kt.a.enabled || this.toggleControl(this.btnFullscreen, !1)
                }, e.prototype.buildTimelineSlider = function() {
                    this.timelinePreview = new Ut(this.player), this.timelineContainer.appendChild(this.timelinePreview.el), this.timelineSlider = new jt(this.player, this, this.timelinePreview), this.timelineContainer.appendChild(this.timelineSlider.el)
                }, e.prototype.buildVolumeSlider = function() {
                    var t = this;
                    this.volumeSlider = new zt(this.player), this.volumeContainer.appendChild(this.volumeSlider.el), this.delay(function() {
                        t.updateVolume(t.player.isMuted() ? 0 : t.player.getVolume())
                    }, 0)
                }, e.prototype.buildSettingsMenu = function() {
                    this.settingsMenu = new Yt(this.player, this.btnSettings), this.el.appendChild(this.settingsMenu.el)
                }, e.prototype.initVideo = function(t) {
                    Ct(this.timeLabelCurrent, formatTime(0)), Ct(this.timeLabelDuration, formatTime(this.player.getDuration())), this.toggleControl(this.timelineSlider.el, this.isControlAvailable("timeline")), this.toggleControl(this.timeLabel, this.isControlAvailable("time_label")), this.toggleControl(this.liveLabel, this.isControlAvailable("live_label")), this.toggleControl(this.btnPlay, this.isControlAvailable("play")), this.toggleControl(this.btnNext, this.isControlAvailable("next")), this.toggleControl(this.btnExpand, this.isControlAvailable("expand")), this.toggleControl(this.btnFullscreen, this.isControlAvailable("fullscreen")), this.toggleControl(this.btnLogo, this.isControlAvailable("logo")), this.toggleControl(this.btnSubtitles, !1), this.toggleControl(this.btnSettings, this.isControlAvailable("settings")), attr(this.btnLogo, "href", "/video" + t.oid + "_" + t.vid), this.toggleControl(this.btnSettings, this.isControlAvailable("settings")), toggleClass(this.el, "_lite_controls", !!t.app_promo), toggleClass(this.el, "_has_logo", this.isControlAvailable("logo")), toggleClass(this.el, "_has_fullscreen", this.isControlAvailable("fullscreen")), toggleClass(this.btnSubtitles, "active", !1), this.timelineSlider.enable(), this.settingsMenu.enable(), this.getVar("ads_snippet_video") && !this._isTimeReversed && this.toggleTime(!0, !0), this.startTimelineAnimation()
                }, e.prototype.deinitVideo = function() {
                    Ct(this.timeLabelCurrent, formatTime(0)), Ct(this.timeLabelDuration, formatTime(0)), this.stopTimelineAnimation(), this.timelineSlider.setLoaded(0), this.timelineSlider.setFilled(0), this.timelineSlider.disable(), this.timelinePreview.hide(), this.settingsMenu.disable()
                }, e.prototype.toggleControl = function(t, e) {
                    setStyle(t, {
                        display: e ? "" : "none"
                    })
                }, e.prototype.isControlAvailable = function(t) {
                    var e = this.player.getVars();
                    switch (t) {
                        case "play":
                            return !e.ads_snippet_video;
                        case "next":
                            return !!e.show_next && !this.player.isActiveLive() && !e.ads_snippet_video;
                        case "timeline":
                            return (!e.live || this.player.getLivePhase() == at) && !e.ads_snippet_video || e.force_timeline;
                        case "time_label":
                            return !e.live || this.player.getLivePhase() == at;
                        case "live_label":
                            return this.player.isActiveLive();
                        case "expand":
                            return !!e.is_inline && !e.app_promo && !e.ads_snippet_video;
                        case "fullscreen":
                            return !!Kt.a.enabled && !e.app_promo && !e.ads_snippet_video;
                        case "settings":
                            return !e.app_promo && !e.ads_snippet_video && (!this.player.isActiveLive() || this.player.getAvailableQualities().length > 1);
                        case "subtitles":
                            return !e.live && this.player.getAvailableSubtitleTracksInfo().length;
                        case "logo":
                            return !!e.is_embed && !e.nologo;
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
                    var i = this.getLang(this.player.getState() === a.PLAYING ? "pause" : "play");
                    attr(this.btnPlay, "aria-label", i), this.toggleControl(this.btnPlay, this.isControlAvailable("play")), t === a.ERROR ? this.timelineSlider.disable() : e === a.ERROR && this.timelineSlider.enable()
                }, e.prototype.onFullscreenChange = function() {
                    var t = this.getLang(this.player.isFullscreen() ? "aria_exit_fullscreen" : "aria_enter_fullscreen");
                    attr(this.btnFullscreen, "aria-label", t)
                }, e.prototype.onMediaTimeupdate = function(t) {
                    this.timelineSlider.dragging || this.updateTime(t)
                }, e.prototype.startTimelineAnimation = function() {
                    var t = this;
                    if (!this._timelineAnimationRequestId && window.cancelAnimationFrame) {
                        ! function e() {
                            if (!t._hidden && t.player.getState() === a.PLAYING && !t.player.isActiveLive() && !t.timelineSlider.dragging) {
                                var i = t.player.curTime(),
                                    n = t.player.getDuration();
                                if (i && n) {
                                    var r = i / n;
                                    t.timelineSlider.setFilled(r, !1)
                                }
                            }
                            t._timelineAnimationRequestId = requestAnimationFrame(e)
                        }()
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
                    this.player.isPlayingLinearAd() || (this.timelineSlider.updateAria(), Ct(this.timeLabelDuration, formatTime(t)), this.delay(function() {
                        e.resize.apply(e, Xt(e.player.getSize()))
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
                    }), Ct(this.timeLabelCurrent, e), setStyle(this.timeLabel, {
                        minWidth: getStyle(this.timeLabel, "width")
                    }), Ct(this.timeLabelCurrent, t)
                }, e.prototype.toggleTime = function(t, e) {
                    (this._minSize || t) && (this._isTimeReversed = !this._isTimeReversed, e || St.savePref("time_reversed", this._isTimeReversed ? 1 : 0), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed), this.updateTime(this.player.curTime()))
                }, e.prototype.resize = function(t, e) {
                    var i = this;
                    this._minSize = t < 550, setStyle(this.timeLabel, {
                        cursor: this._minSize ? "pointer" : ""
                    }), toggle(this.timeLabelDuration, !this._minSize), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed && this._minSize), this.updateTime(this.player.curTime()), this.updateTimeWidth();
                    var n = this._minSize;
                    setStyle(this.volumeContainer, {
                        padding: n ? "0" : ""
                    }), this.volumeSlider.setVertical(n), this.volumeSlider.toggleVisibility(!n);
                    var r = [this.btnMute];
                    this.player.isInited() && (this.isControlAvailable("timeline") && r.unshift(this.timelineSlider.el), this.isControlAvailable("time_label") && r.unshift(this.timeLabel), this.isControlAvailable("subtitles") && r.unshift(this.btnSubtitles), this.isControlAvailable("settings") && (r.unshift(this.btnSettings), r.unshift(this.settingsMenu.el))), each(r, function(t, e) {
                        return show(e)
                    }), each(r, function(t, e) {
                        if (i.el.offsetWidth <= i.player.el.offsetWidth) return !1;
                        i.toggleControl(e, !1)
                    })
                }, e.prototype.isActive = function() {
                    return this.timelineSlider.dragging || this.volumeSlider.dragging || this.settingsMenu.isOpen() || this.settingsMenu.isSublistOpen()
                }, e.prototype.onVolumeOver = function() {
                    this._minSize && (this.volumeSlider.toggleVisibility(!0), this.undelay(this._hideVolumeSliderTimeout))
                }, e.prototype.onVolumeOut = function() {
                    var t = this;
                    this._minSize && (this._hideVolumeSliderTimeout = this.delay(function() {
                        t.volumeSlider.toggleVisibility(!1)
                    }, 100))
                }, e.prototype.onLivePhaseChange = function(t) {
                    toggle(this.timelineSlider.el, this.isControlAvailable("timeline")), toggle(this.timeLabel, this.isControlAvailable("time_label")), toggle(this.liveLabel, this.isControlAvailable("live_label"))
                }, e.prototype.onSeek = function(t) {
                    var e = t / this.player.getDuration();
                    this.timelineSlider.setFilled(e), Ct(this.timeLabelCurrent, formatTime(t))
                }, e.prototype.onLinearAdStarted = function(t, e) {
                    var i = this,
                        n = e.duration;
                    this.timelineSlider.disable(), this.timelinePreview.hide(), this.settingsMenu.disable(), Ct(this.timeLabelDuration, formatTime(intval(n))), this.updateTime(0), this.delay(function() {
                        i.resize.apply(i, Xt(i.player.getSize()))
                    }, 0)
                }, e.prototype.onLinearAdCompleted = function(t) {
                    var e = this;
                    this.timelineSlider.enable(), this.settingsMenu.enable(), Ct(this.timeLabelDuration, formatTime(this.player.getDuration())), this.updateTime(this.player.curTime()), this.delay(function() {
                        e.resize.apply(e, Xt(e.player.getSize()))
                    }, 0)
                }, e
            }(yt),
            Zt = 1,
            $t = 2,
            te = 3;
        var ee = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    n.el = se('\n<div class="videoplayer_share_actions">\n  <div class="_donate"></div>\n  <div class="_like"></div>\n  <div class="_share"></div>\n  <div class="_bookmark"></div>\n  <div class="_add"></div>\n</div>\n    '), n._like = domByClass(n.el, "_like"), n._share = domByClass(n.el, "_share"), n._add = domByClass(n.el, "_add"), n._donate = domByClass(n.el, "_donate"), n._bookmark = domByClass(n.el, "_bookmark"), n.domListen(n._like, "click", function(t) {
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
                    }), n.domListen(n._bookmark, "click", function() {
                        n.player.bookmark(r())
                    }), n.attachTooltip({
                        el: n._bookmark,
                        text: function() {
                            return n.getLang(n.player.videoBookmarked ? "delete_bookmark" : "add_bookmark")
                        },
                        toDown: !0,
                        hideDelay: 200
                    });
                    var r = function() {
                        return n.player.getState() === a.ENDED ? $t : Zt
                    };
                    return i.on(k, function(t) {
                        n.setLiked(t)
                    }).on(T, function(t) {
                        n.setAdded(t)
                    }).on(E, function(t) {
                        n.setBookmarked(t)
                    }), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.initVideo = function(t) {
                    this.setLiked(!!t.liked), this.setAdded(!!t.added), this.setBookmarked(!!t.bookmarked), toggle(this._add, !!t.can_add), toggle(this._donate, !!t.can_donate), toggle(this._bookmark, !!t.can_bookmark), this.updateVisibility()
                }, e.prototype.setLiked = function(t) {
                    toggleClass(this._like, "_liked", t)
                }, e.prototype.setAdded = function(t) {
                    toggleClass(this._add, "_added", t)
                }, e.prototype.setBookmarked = function(t) {
                    toggleClass(this._bookmark, "_bookmarked", t)
                }, e.prototype.show = function() {
                    removeClass(this.el, "hidden")
                }, e.prototype.hide = function() {
                    addClass(this.el, "hidden")
                }, e.prototype.updateVisibility = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = !this.getVar("nolikes"),
                        i = this.getVar("ads_snippet_video"),
                        n = t || !this.player.isPlayingLinearAd() && this.player.getState() !== a.ENDED && !i;
                    toggle(this.el, e && n)
                }, e
            }(yt),
            ie = {
                get supported() {
                    return !!document.queryCommandSupported && document.queryCommandSupported("copy")
                },
                copy: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.utilsNode,
                        i = !1,
                        n = ce("textarea", {
                            value: t
                        }, {
                            position: "absolute",
                            top: -9999,
                            zIndex: 2
                        });
                    e.appendChild(n), browser.msie ? n.setSelectionRange(0, t.length) : n.select();
                    try {
                        i = document.execCommand("copy")
                    } catch (t) {
                        i = !1
                    }
                    return re(n), i
                }
            };
        var ne = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = se('\n<div class="videoplayer_context_menu hidden">\n  <div class="_item" data-action="copy_link">' + n.getLang("cmenu_copy_video_link") + '</div>\n  <div class="_item" data-action="copy_timecoded_link">' + n.getLang("cmenu_copy_timecode_link") + '</div>\n  <div class="_item" data-action="copy_embed_code">' + n.getLang("cmenu_copy_embed_code") + '</div>\n  <div class="_item" data-action="toggle_pip">' + n.getLang("cmenu_enable_pip_mode") + '</div>\n  <div class="_item" data-action="toggle_loop">' + n.getLang("cmenu_enable_loop") + '</div>\n  \x3c!--<div class="_item" data-action="playback_rate">' + n.getLang("cmenu_playback_speed") + '</div>--\x3e\n  <div class="_item" data-action="rotate_video">' + n.getLang("cmenu_rotate") + '</div>\n  <a class="_item" href="/support?act=new&from=v" target="_blank">' + n.getLang("cmenu_report_error") + '</a>\n  <div class="_item" data-action="copy_debug_data">' + n.getLang("cmenu_copy_debug") + "</div>\n</div>\n    "), n.domListen(n.player.el, "contextmenu", n.onContextmenu), n.domListen(n.el, "click", n.onMenuClick), n.domListen(document.body, "click", n.onLostFocus), n.domListen(n.player.el, "click", n.onLostFocus), n.domListen(window, "blur", n.onLostFocus), n.playerListen(b, n.updateButtonsVisibility), n.playerListen(P, n.updateButtonsVisibility), n.playerListen(H, n.updateButtonsVisibility), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.initVideo = function(t) {
                this.updateLoopControl(!!t.repeat), this.updateButtonsVisibility()
            }, e.prototype.updateButtonsVisibility = function() {
                var t = this.player.getLivePhase() == ut,
                    e = t || this.player.isActiveLive();
                toggle(this.el.querySelector("[data-action=copy_timecoded_link]"), !e), toggle(this.el.querySelector("[data-action=copy_embed_code]"), !this.getVar("is_private")), toggle(this.el.querySelector("[data-action=toggle_pip]"), this.player.media.isPiPModeAvailable()), toggle(this.el.querySelector("[data-action=toggle_loop]"), !e), toggle(this.el.querySelector("[data-action=rotate_video]"), !t && this.player.canRotateVideo())
            }, e.prototype.updateLoopControl = function(t) {
                var e = this.el.querySelector("[data-action=toggle_loop]");
                val(e, this.getLang(t ? "cmenu_disable_loop" : "cmenu_enable_loop"))
            }, e.prototype.onMenuClick = function(t) {
                var e = this;
                switch (t.target.getAttribute("data-action")) {
                    case "copy_link":
                        this.copyToClipboard(this.player.getVideoLink());
                        break;
                    case "copy_timecoded_link":
                        this.copyToClipboard(this.player.getVideoLink(!0));
                        break;
                    case "copy_embed_code":
                        this.copyToClipboard(this.player.getEmbedCode());
                        break;
                    case "toggle_pip":
                        this.player.media.togglePiPMode();
                        break;
                    case "toggle_loop":
                        var i = this.player.toggleLoop();
                        this.delay(function() {
                            e.updateLoopControl(i)
                        }, 200);
                        break;
                    case "rotate_video":
                        t.stopPropagation(), this.player.rotateVideo();
                        break;
                    case "copy_debug_data":
                        var n = this.player.getDebugData();
                        this.copyToClipboard(n)
                }
            }, e.prototype.copyToClipboard = function(t) {
                ie.copy(t, this.player.el)
            }, e.prototype.onContextmenu = function(t) {
                var e = 5,
                    i = t.target;
                do {
                    if ("A" == i.nodeName) return void this.hide()
                } while (--e && (i = domPN(i)));
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
        }(yt);
        var oe = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = se('\n<div class="videoplayer_end_screen">\n  <div class="videoplayer_end_actions">\n    <div class="_like">\n      ' + n.getLang("like") + '\n    </div>\n    <div class="_share">\n      ' + n.getLang("share") + '\n    </div>\n    <div class="_add">\n      ' + n.getLang("add") + "\n    </div>\n  </div>\n</div>\n    "), n.getVar("md_author") && n.getVar("author_photo") && n.getVar("author_href") && (n._info = se('\n<div class="videoplayer_end_info">\n  <a href="' + n.getVar("author_href") + '" target="_blank" rel="noopener">\n    <img class="videoplayer_end_info_author_photo" src="' + n.getVar("author_photo") + '"/>\n  </a>\n  <div class="videoplayer_end_info_title">' + n.getVar("md_title") + '</div>\n  <div class="videoplayer_end_info_author_name">\n    <a href="' + n.getVar("author_href") + '" target="_blank" rel="noopener" class="videoplayer_end_info_author_link">' + n.getVar("md_author") + '</a>\n    <div class="videoplayer_end_info_subscribe">' + function() {
                    return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="0 2 12 8" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M7 5V2H5v3H2v2h3v3h2V7h3V5H7z" fill="#FFF" fill-rule="evenodd" class="_plus"/>\n  <path stroke="#FFF" stroke-width="1.5" fill="none" d="M2 6l2.5 2.5L10 3" class="_mark"/>\n  <path d="M3 3l6 6M9 3L3 9" stroke="#FFF" stroke-width="1.5" fill="none" class="_cancel"/>\n</svg>\n  '
                }("_icon_subscribe") + "</div>\n  </div>\n</div>\n      "), n._subscribeBtn = domByClass(n._info, "videoplayer_end_info_subscribe"), n.el.appendChild(n._info)), n._actions = domByClass(n.el, "videoplayer_end_actions"), n.setLiked(!!i.videoLiked), n.setAdded(!!i.videoAdded), n.setSubscribed(!!i.isSubscribed), n.domListen(n.el, "click", function(t) {
                    t.target === n.el && n.player.togglePlay()
                }), n.domListen("_like", "click", function() {
                    i.likeVideo(n._largeActions ? te : $t)
                }), n.domListen("_share", "click", function() {
                    i.shareVideo(n._largeActions ? te : $t)
                }), n.domListen("_add", "click", function() {
                    i.addVideo(n._largeActions ? te : $t)
                }), n.domListen(n._subscribeBtn, "click", function() {
                    i.subscribeToAuthor(n._largeActions ? te : $t)
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
                }), n.getVar("can_add") || addClass(n._actions, "_no_add"), n.updateShareActionsVisibility(), toggle(n._subscribeBtn, !!n.getVar("can_subscribe")), n.playerListen(k, function(t) {
                    n.setLiked(t)
                }), n.playerListen(T, function(t) {
                    n.setAdded(t)
                }), n.playerListen(C, function(t) {
                    n.setSubscribed(t)
                }), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.setLiked = function(t) {
                toggleClass(domByClass(this.el, "_like"), "_liked", t)
            }, e.prototype.setAdded = function(t) {
                toggleClass(domByClass(this.el, "_add"), "_added", t)
            }, e.prototype.setSubscribed = function(t) {
                toggleClass(this._subscribeBtn, "_subscribed", t)
            }, e.prototype.resize = function(t, e) {
                this._largeActions = t > 250 && e > 200, toggleClass(this._actions, "_large", this._largeActions)
            }, e.prototype.updateShareActionsVisibility = function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                toggle(this._actions, !this.getVar("nolikes") && t)
            }, e.prototype.isStretchMode = function() {
                return !1
            }, e
        }(yt);
        var ae = function(t) {
            function e(i, n, r, o) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var s = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return s._nextVideosData = n, s._fromSuggestions = o, setStyle(s._actions, {
                    marginTop: "-110px"
                }), r && (s.buildNextBlock(), i.nextTimerStopped || s.startTimer()), s.buildSuggestionsBlock(), r || s.showSuggestions(), s.playerListen(w, s.resetTimer), s.playerListen(S, s.startTimer), s
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.buildNextBlock = function() {
                var t = this._nextVideosData[0];
                this._nextBlock = se('\n<div class="videoplayer_end_next_block">\n  <div class="_caption">' + this.getLang("next") + '</div>\n  <div class="_thumb" style="background-image:url(' + t.thumb + ')"></div>\n  <div class="_thumb_darken"></div>\n  <div class="_timer">\n    <canvas class="_timer_canvas" width="100" height="100"></canvas>\n    ' + Ft("_timer_play_icon") + '\n  </div>\n  <div class="_description">\n    <div class="_title">' + t.title + '</div>\n    <div class="_views">' + t.views + '</div>\n  </div>\n  <div class="_cancel"></div>\n</div>\n    '), this.domListen(this._nextBlock, "click", this.onNextClick), this.domListen(domByClass(this._nextBlock, "_cancel"), "click", this.onNextCancelClick), this.el.appendChild(this._nextBlock)
            }, e.prototype.buildSuggestionsBlock = function() {
                var t = this,
                    e = this.player.getVideoId();
                this._suggestionsBlock = ce("div", {
                    className: "videoplayer_end_suggestions _before_intro"
                }), each(this._nextVideosData, function(i, n) {
                    var r = n.href || "/video" + n.vid,
                        o = se('\n<a class="_item" href="' + r + '">\n  <div class="_item_thumb" style="background-image:url(' + n.thumb + ');"></div>\n  <div class="_item_title">' + n.title + '</div>\n  <div class="_item_views">' + n.views + "</div>\n</a>\n      ");
                    n.vid == e && domByClass(o, "_item_thumb").appendChild(se('\n<div class="_item_replay">\n  <div class="_item_replay_text">' + Ft("_item_replay_icon") + t.getLang("replay") + "</div>\n</div>\n        ")), t.domListen(o, "click", t.onSuggestionClick.bind(t, n.vid, i + 1)), t._suggestionsBlock.appendChild(o)
                }), this.el.appendChild(this._suggestionsBlock)
            }, e.prototype.startTimer = function() {
                var t = this;
                if (this._nextBlock && !this.minMode && window.CanvasRenderingContext2D) {
                    var e = domByClass(this._nextBlock, "_timer_canvas"),
                        i = e.getContext("2d");
                    i.lineWidth = 6, i.lineCap = "round", i.strokeStyle = "#fff";
                    var n = Date.now();
                    show(e), this.timerInProgress = !0,
                        function e() {
                            var r = (Date.now() - n) / 5e3;
                            r < 1 ? (i.clearRect(0, 0, 100, 100), i.beginPath(), i.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * r), i.stroke(), t._nextTO = setTimeout(e, 16)) : t.player.nextVideo(t._nextVideosData[0].vid, !0, !0)
                        }()
                }
            }, e.prototype.resetTimer = function() {
                this._nextBlock && window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this._nextBlock, "_timer_canvas")))
            }, e.prototype.showSuggestions = function() {
                removeClass(this._suggestionsBlock, "_before_intro");
                var t = this.isStretchMode.apply(this, function(t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                        return i
                    }
                    return Array.from(t)
                }(this.player.getSize()));
                this.player.onSuggestionsShown(t, this._fromSuggestions)
            }, e.prototype.onNextClick = function() {
                var t = this._nextVideosData[0];
                this.player.nextVideo(t.vid, !0)
            }, e.prototype.onNextCancelClick = function(t) {
                t.stopPropagation(), this.resetTimer(), re(this._nextBlock), this._nextBlock = null, this.showSuggestions()
            }, e.prototype.onSuggestionClick = function(t, e, i) {
                i.ctrlKey || browser.mac && i.metaKey || (i.preventDefault(), i.stopPropagation(), this.player.getVideoId() == t ? (this.player.onTouchedByUser(), this.player.onSuggestionsReplayClicked()) : t && (this.getVar("is_embed") ? window.open(i.currentTarget.href, "_blank") : this._fromSuggestions ? this.player.onSuggestionClicked(t, this._stretchMode, e) : this.player.nextVideo(t)), this.player.el.focus())
            }, e.prototype.resize = function(t, e) {
                var i = t < 600 || e < 350;
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
                return !!this._suggestionsBlock && 400 <= t && t <= 600 && 250 <= e && e <= 510
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.resetTimer()
            }, e
        }(oe);
        var le = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = se('\n<div class="videoplayer_end_screen">\n  <div class="videoplayer_end_actions">\n    <div class="_replay">\n    </div>\n    <a class="_go" ' + n.getVar("link_attr") + '>\n      <div class="go_button_title">' + n.getVar("ads_snippet_video_button_title") + '</div>\n      <div class="go_button_domain">' + n.getVar("ads_snippet_video_button_domain") + "</div>\n    </a>\n  </div>\n</div>\n    "), n.domListen("_replay", "click", function() {
                    i.play()
                }), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.resize = function() {}, e.prototype.isStretchMode = function() {
                return !1
            }, e
        }(yt);
        var ue = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n.el = se('\n<div class="videoplayer_tooltip">\n  <div class="_text"></div>\n  <div class="_arrow"></div>\n</div>\n    '), n._text = domByClass(n.el, "_text"), n._arrow = domByClass(n.el, "_arrow"), n._shown = !1, n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.show = function(t) {
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
                        r = void 0 !== n && n,
                        o = t.offsetXpercent,
                        s = void 0 === o ? .5 : o,
                        a = t.offsetY,
                        l = void 0 === a ? 9 : a;
                    if (i = isFunction(i) ? i() : i) {
                        show(this.el), val(this._text, i);
                        var u = this.player.el.getBoundingClientRect(),
                            h = e.getBoundingClientRect(),
                            c = this.el.getBoundingClientRect(),
                            d = h.left - u.left + Math.round(h.width * s) - Math.round(c.width / 2),
                            p = (r ? h.bottom : h.top) - u.top - (r ? 0 : c.height) + l * (r ? 1 : -1),
                            f = void 0;
                        d < 10 ? (f = d - 10 - 6, d = 10) : d + c.width > u.width - 10 && (f = d + c.width - (u.width - 10) - 6, d = u.width - c.width - 10), setStyle(this.el, {
                            left: d + "px",
                            top: p + "px"
                        }), setStyle(this._arrow, {
                            marginLeft: f ? f + "px" : null
                        }), toggleClass(this._arrow, "_arrow_up", r), this.undelay(this._hideDelayedTimeout), this.undelay(this._hideTimeout), this._hideTimeout = this.delay(this.hide, 3e3), this._shown = !0
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
            }(yt),
            he = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            n = !0,
                            r = !1,
                            o = void 0;
                        try {
                            for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                        } catch (t) {
                            r = !0, o = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var de = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_donations_layer"
                }), n._currentItems = [], n._queuedItems = [], n._supportsTransitions = "transition" == Pt("transition"), n.resize.apply(n, function(t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                        return i
                    }
                    return Array.from(t)
                }(i.getSize())), n.playerListen(A, n.pushDonation), n.playerListen(d, n.onStateChange), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.pushDonation = function(t, e) {
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
                if (this._currentItems.length >= 3) this._queuedItems.push(t);
                else if (this._currentItems.push(t), "gift" == t.type) {
                    var n = new Image;
                    n.onload = function() {
                        return e.insertItem(t)
                    }, n.src = this.giftImgSrc(t.giftId)
                } else this.insertItem(t)
            }, e.prototype.insertItem = function(t) {
                var e = this;
                t.timeout = this.delay(function() {
                    return e.removeItem(t)
                }, 5e3), t.inserted = !0, this.el.insertBefore(t.el, domFC(this.el)), this._supportsTransitions && (setStyle(t.el, {
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
                for (; this._currentItems.length < 3 && this._queuedItems.length;) {
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
                } catch (t) {
                    n = !0, r = t
                } finally {
                    try {
                        !i && s.return && s.return()
                    } finally {
                        if (n) throw r
                    }
                }
            }, e.prototype.increaseGiftCount = function(t) {
                var e = this;
                t.count += 1;
                var i = domByClass(t.el, "_gift_count");
                val(i, function(t) {
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
                }(t.count, "_gift_count_icon")), t.inserted && (this._supportsTransitions && !this._hidden && (setStyle(i, {
                    transform: "scale(1.5)"
                }), this.domListenOnce(i, "transitionend", function() {
                    setStyle(i, {
                        transform: ""
                    })
                })), this.undelay(t.timeout), t.timeout = this.delay(function() {
                    return e.removeItem(t)
                }, 5e3))
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
                    }) + function() {
                        return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="230 33 12 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="#99C5FF" fill-rule="evenodd">\n    <path d="M234.665 47.746c-.367.416-.563.32-.435-.22L236.006 40h4.478c.556 0 .712.333.34.754l-6.16 6.992z"/>\n    <path d="M237.337 34.254c.366-.416.56-.32.433.22L235.998 42h-4.466c-.554 0-.7-.344-.34-.754l6.145-6.992z"/>\n  </g>\n</svg>\n  '
                    }("_comment_icon"),
                    i = '<div class="_comment_text">' + t.commentText + "</div>";
                return this.donationTpl("comment", t, e, i)
            }, e.prototype.giftTpl = function(t) {
                var e = this.getLang("live_user_sent_gift", !1, {
                        sex: t.senderSex
                    }),
                    i = '<img class="_gift_img" src="' + this.giftImgSrc(t.giftId) + '"/><div class="_gift_count"></div>';
                return this.donationTpl("gift", t, e, i)
            }, e.prototype.giftImgSrc = function(t) {
                return "/images/gift/" + t + "/" + (isRetina() ? 256 : 96) + ".png"
            }, e.prototype.updateVisibility = function() {
                var t = this.player.getSize(),
                    e = he(t, 2),
                    i = e[0],
                    n = e[1],
                    r = this.player.getState();
                this._hidden = i < 640 || n < 360 || r !== a.PLAYING && r !== a.PAUSED, toggle(this.el, !this._hidden)
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
        }(yt);
        var pe = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_timed_buttons_conatainer"
                }), n.playerListen(x, n.onTimeupdate), n.playerListen(d, n.onStatChange), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.initVideo = function(t) {
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
                t !== a.ENDED && t !== a.ERROR || this.hideButton()
            }, e.prototype.showButton = function(t, e) {
                var i = this;
                this.hideButton(), this._curIndex = t;
                var n = this.getLang("timed_button_" + e.text);
                "link" === e.type && (n = function() {
                    return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M2.587 2.587L0 0h7v7L4.61 4.61c-.564.644-1.144 1.47-1.408 2.367C2.865 8.652 4.135 10 4.135 10S1 9.66 1 5.965c0-1.355.797-2.538 1.587-3.378z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
                }("_link_icon") + n), this._curButton = ce("a", {
                    className: "videoplayer_timed_button hidden",
                    innerHTML: n,
                    href: "/away.php?to=" + encodeURIComponent(e.url),
                    target: "_blank"
                }), this.domListen(this._curButton, "click", function(t) {
                    ! function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            blank: !0,
                            throughAway: !0
                        };
                        e.throughAway && !/\/away\.php/.test(t) && (t = "/away.php?to=" + encodeURIComponent(t)), window.open(t, e.blank ? "_blank" : "").opener = null
                    }(t.currentTarget.href), i.player.pause(), t.preventDefault(), t.stopPropagation()
                }), this.el.appendChild(this._curButton), this._curButton.offsetHeight, removeClass(this._curButton, "hidden")
            }, e.prototype.hideButton = function() {
                if (null != this._curIndex) {
                    var t = this._curButton;
                    this._curButton = this._curIndex = null, addClass(t, "hidden"), setTimeout(function() {
                        return re(t)
                    }, 150)
                }
            }, e
        }(yt);
        var fe = "bottom",
            ye = "top",
            ve = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n.el = se('\n<div class="videoplayer_subtitle_layer">\n    <div class="videoplayer_subtitle_layer__region_top"></div>\n    <div class="videoplayer_subtitle_layer__region_bottom"></div>\n</div>\n    '), n._bottomRegion = domByClass(n.el, "videoplayer_subtitle_layer__region_" + fe), n._topRegion = domByClass(n.el, "videoplayer_subtitle_layer__region_" + ye), n.playerListen(X, n._showTip), n.playerListen(G, n._updateMargins), n.playerListen(Y, n._updateMargins), n.playerListen(N, function() {
                        n.clear()
                    }), n.playerListen(j, function() {
                        n.clear()
                    }), n.playerListen(v, function() {
                        n.clear()
                    }), n._updateMargins(), n.resize.apply(n, function(t) {
                        if (Array.isArray(t)) {
                            for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                            return i
                        }
                        return Array.from(t)
                    }(n.player.getSize())), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype._addToRegion = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : fe,
                        i = this._getRegionEl(e);
                    i && i.appendChild(t)
                }, e.prototype._buildCueEl = function(t) {
                    return se('\n      <div>\n        <span class="videoplayer_subtitle_layer__cue">' + t.text + "</span>\n      </div>\n    ")
                }, e.prototype._getRegionEl = function(t) {
                    var e = null;
                    switch (t) {
                        case fe:
                            e = this._bottomRegion;
                            break;
                        case ye:
                            e = this._topRegion
                    }
                    return e
                }, e.prototype._showTip = function(t) {
                    var e = this;
                    if (t) {
                        var i = clean(t.name).replace(/&amp;/g, "&");
                        if (t.lang) {
                            var n = this.getVar("subtitles_langs")[t.lang].name;
                            n !== t.name && (i = n + " (" + i + ")")
                        }
                        var r = this.getLang("subtitles_enabled_tip");
                        r = (r = r.replace("{current}", i)).replace("{icon}", '<span class="videoplayer_subtitle_layer__tip_icon"></span>');
                        var o = this._buildCueEl({
                            text: r
                        });
                        this.clear(ye), this._addToRegion(o, ye), setTimeout(function() {
                            e.clear(ye)
                        }, 2e3)
                    }
                }, e.prototype._updateMargins = function() {
                    toggleClass(this._bottomRegion, "_controls_offset", this.player.isControlsVisible())
                }, e.prototype.clear = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : fe,
                        e = this._getRegionEl(t);
                    e && val(e, "")
                }, e.prototype.update = function(t) {
                    if (this.clear(), t.length) {
                        for (var e = document.createDocumentFragment(), i = 0; i < t.length; i++) {
                            var n = t[i];
                            e.appendChild(this._buildCueEl(n))
                        }
                        this._addToRegion(e)
                    }
                }, e.prototype.destroy = function() {
                    t.prototype.destroy.call(this), re(this.el)
                }, e.prototype.resize = function(t, e) {
                    var i = Math.floor(29 * Math.max(0, t - 350) / 1650),
                        n = Math.min(40, 11 + i),
                        r = .5 * Math.max(0, 2e3 - t) / 1650,
                        o = Math.min(1.9, 1.4 + r);
                    setStyle(this.el, {
                        fontSize: n + "px",
                        lineHeight: "" + o
                    })
                }, e
            }(yt);
        var _e = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n.el = se('\n<a class="videoplayer_action_button" target="_blank" href=""></a>\n    '), hide(n.el), n.playerListen(G, n._updateMargins), n.playerListen(Y, n._updateMargins), n.domListen(n.el, "click", function() {
                        n._onLinkOpened()
                    }), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.deinitVideo = function() {
                    hide(this.el)
                }, e.prototype.initVideo = function(t) {
                    var e = t.action_button;
                    this.setLink(e), this._updateMargins()
                }, e.prototype.setLink = function(t) {
                    if (this.domUnlisten(this.el, "mouseenter"), this.domUnlisten(this.el, "mouseleave"), removeClass(this.el, "_opened"), t) {
                        switch (t.type) {
                            case "app":
                                this._linkTitle = this.getLang("action_button_open_app");
                                break;
                            case "article":
                                this._linkTitle = this.getLang("action_button_open_article");
                                break;
                            case "group":
                                this._linkTitle = this.getLang("action_button_open_group");
                                break;
                            case "page":
                                this._linkTitle = this.getLang("action_button_open_page");
                                break;
                            case "poll":
                                this._linkTitle = this.getLang("action_button_open_poll");
                                break;
                            case "product":
                                this._linkTitle = this.getLang("action_button_open_product");
                                break;
                            case "post":
                                this._linkTitle = this.getLang("action_button_open_post");
                                break;
                            case "user":
                                this._linkTitle = this.getLang("action_button_open_user");
                                break;
                            case "link":
                            default:
                                this._linkTitle = this.getLang("action_button_open_link")
                        }
                        val(this.el, this._linkTitle), this.el.setAttribute("href", t.url), show(this.el), this.player.trigger(Z, {
                            data: t
                        })
                    } else hide(this.el)
                }, e.prototype._onLinkOpened = function() {
                    this.player.trigger(J), hasClass(this.el, "_opened") || (addClass(this.el, "_opened"), this.attachTooltip())
                }, e.prototype._onMouseEnter = function() {
                    Date.now() - this.tooltip.lastShown < 50 ? this._showTooltip() : this._tooltipTimeout = setTimeout(this._showTooltip.bind(this), 500)
                }, e.prototype._onMouseLeave = function() {
                    this.tooltip.hide(), clearTimeout(this._tooltipTimeout)
                }, e.prototype._showTooltip = function() {
                    var t = this;
                    this.tooltip.show({
                        el: this.el,
                        text: function() {
                            return t._linkTitle
                        },
                        offsetY: 10
                    })
                }, e.prototype._updateMargins = function() {
                    toggleClass(this.el, "_controls_offset", this.player.isControlsVisible())
                }, e
            }(yt),
            me = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            n = !0,
                            r = !1,
                            o = void 0;
                        try {
                            for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                        } catch (t) {
                            r = !0, o = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function be(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
            return Array.from(t)
        }
        var we = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
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
                    innerHTML: '<div class="videoplayer_big_play_btn"><div class="videoplayer_big_play_btn_bg"></div>' + Ft("videoplayer_big_play_icon") + "</div>"
                }), n.el.appendChild(n.thumb), n.controls = new Jt(i), n.el.appendChild(n.controls.el), n.shareActions = new ee(i), n.el.appendChild(n.shareActions.el), n.contextMenu = new ne(i), n.el.appendChild(n.contextMenu.el), n.playerTooltip = new ue(i), n.el.appendChild(n.playerTooltip.el), n.actionButton = new _e(n.player), n.el.appendChild(n.actionButton.el), n.autoplayTimer = ce("div", {
                    className: "videoplayer_autoplay_timer hidden",
                    innerHTML: '<div class="videoplayer_autoplay_timer_equalizer" style="display:none;"><div class="_col"></div><div class="_col"></div><div class="_col"></div></div><span class="videoplayer_autoplay_timer_text"></span>'
                }), n.autoplayTimerEqualizer = domByClass(n.autoplayTimer, "videoplayer_autoplay_timer_equalizer"), n.autoplayTimerText = domByClass(n.autoplayTimer, "videoplayer_autoplay_timer_text"), n.el.appendChild(n.autoplayTimer), n.autoplayHint = ce("div", {
                    className: "videoplayer_autoplay_hint hidden"
                }), n.el.appendChild(n.autoplayHint), n.timedButtons = new pe(i), n.el.appendChild(n.timedButtons.el), n.domListen(i.el, "keydown", n.onKeyDown), n.domListen(i.el, "keyup", n.onKeyUp), n.domListen(i.el, "blur", n.onBlur), n.domListen(i.el, "mousedown", n.onMouseDown), n.domListen(i.el, "click", n.onClick), n.domListen(i.el, "dblclick", n.onDoubleClick), n.domListen(i.el, "mouseenter", n.onMouseEnter), n.domListen(i.el, "mousemove", n.onMouseMove), n.domListen(i.el, "mouseleave", n.onMouseLeave), n.playerListen(d, n.onStateChange), n.playerListen(_, n.onFullscreenChange), n.playerListen(P, n.onLivePhaseChange), n.playerListen(O, n.onMediaPlaying), n.playerListen(x, n.onMediaTimeupdate), n.playerListen(R, n.updateWaiting), n.playerListen(U, n.showLiveWarning), n.playerListen($, n.updateWaiting), n.playerListen(et, n.onLinearAdStarted), n.playerListen(it, n.onLinearAdCompleted), n.playerListen(b, n.onPlayerExpanded), n.playerListen(g, n._onSubtitleCueChange), n.playerListen(v, n._onSubtitlesSwitched), n.playerListen(f, n._showSubtitlesIntro), n._mouseInside = !1, n._lastUserActivity = Date.now(), n._checkUserActivityInterval = setInterval(n.checkUserActivity.bind(n), 100), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.initVideo = function(t) {
                if (setStyle(this.thumb, {
                        backgroundImage: "url(" + this.player.getThumbSrc() + ")"
                    }), t.stretch_vertical && !t.is_aurora) {
                    var e = this.calculateBackgroundSizeForVerticalThumb();
                    setStyle(this.thumb, {
                        backgroundSize: e
                    })
                }
                if (this.updateTitle(t.md_title, t.explicit), toggleClass(this.titleLink, "_right_offset", !t.nolikes), toggleClass(this.titleLink, "_clickable", !!t.is_embed), t.live && this.onLivePhaseChange(t.live), t.stickers_promo && this.buildStickersPromo.apply(this, be(t.stickers_promo.split("|"))), this._mouseInside = isHover(this.el), this._lastUserActivity = Date.now(), this.updateWaiting(), this.player.isAutoplay()) {
                    var i = this.player.isActiveLive() ? '<span class="videoplayer_autoplay_timer_live_icon"></span>' : formatTime(this.player.getDuration());
                    val(this.autoplayTimerText, i), toggleClass(this.autoplayTimer, "_live", this.player.isActiveLive()), t.ads_snippet_video || val(this.autoplayHint, this.getLang("autoplay_expand_hint")), this._mouseInside || this.player.getState() !== a.PLAYING || this.hideUI({
                        noTransition: !0
                    })
                }
                "apps_slider" === t.module && (this._uiDisabled = !0, this.hideUI({
                    hideCursor: !1,
                    noTransition: !0
                })), "story" === t.module && (this._uiDisabled = !0, this.hideUI({
                    hideCursor: !1,
                    noTransition: !0
                }), this.controls.destroy(), this.shareActions.destroy(), this.contextMenu.destroy(), re(this.controls.el), re(this.shareActions.el)), t.is_aurora && this.player.isActiveLive() && (this.donationsLayer = new de(this.player), this.el.appendChild(this.donationsLayer.el)), this.adsClickOverlay && re(this.adsClickOverlay), t.ads_snippet_video && (this._adsSnippetsVideo = !0, addClass(this.el, "no_gradient"), this.adsClickOverlay = se('<a class="videoplayer_ads_click_overlay" ' + t.link_attr + "></a>"), this.el.appendChild(this.adsClickOverlay)), this._ignoreNoticeTypes = [], this._ignoreLiveWarning = !1
            }, e.prototype.deinitVideo = function() {
                this.endScreen && this.removeEndScreen(), this.donationsLayer && (clearTimeout(this._randDonationTimeout), this.donationsLayer.destroy(), this.donationsLayer = null), this._subtitleLayer && (this._subtitleLayer.destroy(), this._subtitleLayer = null), this.tooltip.hide(), this.toggleLiveDummy(!1), this.updateWaiting(), this.removeStickersPromo(), this.removeNotice(), this.hideLiveWarning(), this.undelay(this._featureSubtitlesTimeout)
            }, e.prototype._showSubtitlesIntro = function() {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.player.getAvailableSubtitleTracksInfo();
                if (this.player.isInLayer() && e.length) {
                    var i = St.getPref("video_feature_subtitles") || 0;
                    i >= 5 || (this.showUI(), this._featureSubtitlesTimeout = this.delay(function() {
                        if (cur.featurePlayerSubtitlesTT || t.player.isMinimized() || t.player.isFullscreen()) return t._featureSubtitlesTimeout = null, t.hideUI(), !1;
                        St.savePref("video_feature_subtitles", ++i), t.player.externalCall("showSubtitlesIntro", domByClass(t.el, "videoplayer_btn_subtitles"), t.getLang("subtitles_intro_tooltip"))
                    }, 2500))
                }
            }, e.prototype.onTouchedByUser = function() {
                addClass(this.autoplayHint, "hidden"), addClass(this.autoplayTimer, "hidden"), setStyle(this.player.el, {
                    cursor: ""
                })
            }, e.prototype.onMouseDown = function(t) {
                this.onKeyboardFocus(!1), this._clickTarget = t.target
            }, e.prototype.onClick = function(t) {
                if (t.stopPropagation(), this._lastUserActivity = Date.now(), !this.contextMenu.isVisible() && !this._uiDisabled) {
                    var e = this.isBackgroundElement(this._clickTarget);
                    this.player.isAutoplay() && !this._adsSnippetsVideo ? (e && this.player.expand(), this.player.onTouchedByUser()) : e && this.player.togglePlay()
                }
            }, e.prototype.onDoubleClick = function(t) {
                t.target != this.player.el && t.target != this.player.media.el || this._adsSnippetsVideo || this.player.toggleFullscreen()
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
                        this._keyboardFocus ? (this.onKeyboardFocus(!0), t.target === this.controls.btnSettings.el || t.target === this.controls.timelineSlider.el && this.keyboardSlideProgress(i, t.altKey)) : this.keyboardSlideVolume(i), t.preventDefault();
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
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (e && !this.frameSeeking && (this.frameSeeking = !0, this.player.trigger(W, !0)), this.player.getState() != a.UNSTARTED && !this.player.isPlayingLinearAd()) {
                    var i = e ? 1 / 24 : 10;
                    this.player.seekBy(i * t)
                }
            }, e.prototype.keyboardSlideVolume = function(t) {
                var e = .05 * t;
                this.player.setVolume(this.player.getVolume() + e)
            }, e.prototype.onKeyUp = function(t) {
                t.keyCode == KEY.ALT && this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(q))
            }, e.prototype.onKeyboardFocus = function(t) {
                this._keyboardFocus = t, toggleClass(this.el, "_keyboard_focus", t)
            }, e.prototype.onBlur = function(t) {
                this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(q))
            }, e.prototype.onMouseEnter = function(t) {
                this._mouseInside = !0, this.showUI()
            }, e.prototype.onMouseLeave = function(t) {
                this._mouseInside = !1;
                var e = this.player.getState() === a.PLAYING,
                    i = this.player.getState() == a.PAUSED && this.player.isAutoplay();
                !e && !i || this.controls.isActive() || this._adsSnippetsVideo || this.hideUI()
            }, e.prototype.onMouseMove = function(t) {
                if (this._lastUserActivity = Date.now(), this.showUI(), !this._uiDisabled && this.player.isAutoplay()) {
                    var e = this.player.getState();
                    e !== a.ENDED && e !== a.ERROR && toggleClass(this.autoplayHint, "hidden", !this.isBackgroundElement(t.target))
                }
            }, e.prototype.onWheel = function(t) {
                if (!browser.mac && this.player.isFullscreen()) {
                    var e = t.deltaY > 0 ? -1 : 1;
                    this.player.setVolume(this.player.getVolume() + .05 * e), this._lastUserActivity = Date.now(), this.showUI()
                }
            }, e.prototype.hideUI = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = t.hideCursor,
                    i = void 0 === e || e,
                    n = t.noTransition,
                    r = void 0 !== n && n;
                this._featureSubtitlesTimeout || domByClass(ge("mv_box"), "feature_intro_subtitles") || this._controlsHidden || (r && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), this.shareActions.hide(), this.controls.hide(), addClass(this.title, "hidden"), this.player.isAutoplay() && (removeClass(this.autoplayTimer, "hidden"), addClass(this.autoplayHint, "hidden")), this.toggleStickersPromo(!1), setStyle(this.player.el, {
                    cursor: i ? "none" : ""
                }), this._controlsHidden = !0, this.player.trigger(G))
            }, e.prototype.showUI = function() {
                this._uiDisabled || this._controlsHiddenByAd || !this._controlsHidden || (this.shareActions.show(), this.controls.show(), removeClass(this.title, "hidden"), this.player.isAutoplay() ? (addClass(this.autoplayTimer, "hidden"), removeClass(this.autoplayHint, "hidden"), setStyle(this.player.el, {
                    cursor: "pointer"
                })) : setStyle(this.player.el, {
                    cursor: ""
                }), this.toggleStickersPromo(!0), this._controlsHidden = !1, this.player.trigger(Y))
            }, e.prototype.updateWaiting = function() {
                var t = this.player,
                    e = (!t.isInited() || t.isBuffering() || t.isLoadingAds()) && !t.isPlayingLinearAd() && this.player.getState() !== a.ERROR && t.getLivePhase() !== ut;
                toggle(this.waiting, e), attr(this.player.el, "aria-busy", e ? "true" : "false")
            }, e.prototype.updateTitle = function(t, e) {
                void 0 !== t && (toggleClass(this.title, "videoplayer_title_explicit", Boolean(e)), val(this.titleLink, t), attr(this.titleLink, "href", "/video" + this.player.getVideoId()));
                var i = this.player.isInited(),
                    n = this.player.isPlayingLinearAd(),
                    r = this.player.isFullscreen(),
                    o = this.getVar("is_embed") || this.getVar("is_inline") && "videocat" == this.getVar("module"),
                    s = i && !this.getVar("no_title") && !n && !this.endScreen && (r || o);
                toggle(this.title, !!s)
            }, e.prototype.showError = function(t) {
                var e = t.message,
                    i = t.waiting,
                    n = "";
                n += void 0 !== i && i ? getProgressHtml("", "_error_progress_icon pr_big") : '<div class="_error_icon"></div>', n = '<div class="_error_msg">' + (n += '<div class="_text">' + e + "</div>") + "</div>", n = '<div class="_background" style="background-image:url(' + (this.getVar("first_frame_800") || this.getVar("first_frame_320") || this.getVar("jpg") || "") + ')"></div>' + n, val(this.error, n), removeClass(this.error, "hidden"), attr(this.error, "aria-hidden", !1)
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
                if (t === a.PLAYING || i && t == a.PAUSED || this.showUI(), t !== a.PLAYING || !i || this._mouseInside || this._adsSnippetsVideo || this.hideUI({
                        noTransition: !0
                    }), this.endScreen && t !== a.ENDED && (this.removeEndScreen(), this._controlsHidden || this.controls.show()), t === a.ENDED && this.canShowEndScreen() && this.buildEndScreen(), i && !this.player.isStartedPlaying()) {
                    var n = t === a.ENDED && !this.endScreen;
                    this.toggleThumb(!0, n)
                } else {
                    var r = t === a.UNSTARTED && !this.getVar("autoplay") || t === a.ENDED,
                        o = !this.endScreen;
                    this.toggleThumb(r, o)
                }
                if (i) {
                    var s = t !== a.ENDED && t !== a.ERROR;
                    toggle(this.autoplayTimer, s), toggle(this.autoplayHint, s)
                }
                t === a.ERROR ? (this.showError(this.player.getErrorData()), this.showUI(), this.toggleThumb(!1), this.toggleLiveDummy(!1), addClass(this.autoplayHint, "hidden")) : this.hideError(), this.updateTitle(), this.updateWaiting(), this.updateShareActions()
            }, e.prototype.toggleThumb = function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                toggleClass(this.thumb, "hidden", !t), t && toggle(domByClass(this.thumb, "videoplayer_big_play_btn"), e)
            }, e.prototype.onFullscreenChange = function(t) {
                if (toggleClass(this.el, "_fullscreen", t), this.updateTitle(), browser.mac || (t ? this.domListen(this.player.el, "wheel", this.onWheel) : this.domUnlisten(this.player.el, "wheel", this.onWheel)), this.player.isInited()) {
                    var e = this.player.getVars();
                    if (e.stretch_vertical && !e.is_aurora) {
                        var i = this.calculateBackgroundSizeForVerticalThumb(t);
                        setStyle(this.thumb, {
                            backgroundSize: i
                        })
                    }
                }
            }, e.prototype.onLivePhaseChange = function(t) {
                var e = !1;
                t == ut && this.getVar("live_start"), t == ut ? (val(this.liveWaiting, this.getLang("live_starting_soon")), e = !0) : e = !1, this.player.getState() === a.ERROR && (e = !1), this.toggleLiveDummy(e), this.updateWaiting(), this.player.isAutoplay() && !this.player.isActiveLive() && (removeClass(this.autoplayTimer, "_live"), val(this.autoplayTimerText, formatTime(this.player.getDuration())), this.resizeAutoplayTimer())
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
                    Ct(this.autoplayTimerText, t.replace(/\d/g, "8")), setStyle(this.autoplayTimerText, {
                        minWidth: this.autoplayTimerText.offsetWidth + "px"
                    }), Ct(this.autoplayTimerText, e)
                }
                setStyle(this.autoplayTimerEqualizer, {
                    display: ""
                })
            }, e.prototype.onLinearAdStarted = function(t, e) {
                e.duration;
                var i = e.hideControls;
                this.updateTitle(), this.updateShareActions(), this.player.isAutoplay() && (hide(this.autoplayTimer), hide(this.autoplayHint)), i && (this._controlsHiddenByAd = !0, this.hideUI({
                    hideCursor: !1
                })), this.updateWaiting()
            }, e.prototype.onLinearAdCompleted = function(t) {
                this.updateTitle(), this.updateShareActions(), this.player.isAutoplay() && (show(this.autoplayTimer), show(this.autoplayHint)), this._controlsHiddenByAd && (this._controlsHiddenByAd = !1, this.showUI()), this.updateWaiting()
            }, e.prototype.checkUserActivity = function() {
                var t = this;
                if (!this._controlsHidden) {
                    var e = this.player;
                    this.player.getState() !== a.PLAYING || this._mouseInside && !e.isFullscreen() || !(Date.now() - t._lastUserActivity > 3e3) || t.controls.isActive() || isHover(t.controls.el) || isHover(t.shareActions.el) || this._adsSnippetsVideo || this.hideUI({
                        hideCursor: this.player.isFullscreen()
                    })
                }
            }, e.prototype.canShowEndScreen = function() {
                return (!this.getVar("live") || this.getVar("live") === at) && (!this.getVar("nolikes") || (this.getVar("show_next") && this.player.getNextVideos().length || this.getVar("show_suggestions") && this.player.getSuggestions().length))
            }, e.prototype.buildEndScreen = function() {
                var t, e, i = [],
                    n = !1,
                    r = !1;
                (i = this.player.getNextVideos()).length && (n = this.player.nextTimerEnabled()), this.getVar("show_suggestions") && !i.length && (i = this.player.getSuggestions(), r = !0, n = !1), this._adsSnippetsVideo ? this.endScreen = new le(this.player) : i.length ? this.endScreen = new ae(this.player, i, n, r) : this.endScreen = new oe(this.player), this.el.appendChild(this.endScreen.el);
                var o = this.player.getSize();
                (t = this.endScreen).resize.apply(t, be(o)), (e = this.endScreen).isStretchMode.apply(e, be(o)) && this.controls.hide()
            }, e.prototype.removeEndScreen = function() {
                re(this.endScreen.el), this.endScreen.destroy(), delete this.endScreen
            }, e.prototype.buildStickersPromo = function(t, e, i, n) {
                var r = "/images/gift/-" + t + "/" + (isRetina() ? 256 : 96) + ".png";
                this.stickersPromo = ce("div", {
                    className: "videoplayer_stickers_promo"
                }), domData(this.stickersPromo, "pack-id", t);
                var o = se('\n<a href="/stickers/' + e + '" target="_blank" class="videoplayer_stickers_promo__link">\n  <div class="videoplayer_stickers_promo__title">' + i + '</div>\n  <div class="videoplayer_stickers_promo__price">' + n + '</div>\n  <img src="' + r + '" class="videoplayer_stickers_promo__img"/>\n</a>');
                this.domListen(o, "click", this.onStickersPromoClick.bind(this, t, e));
                var s = ce("div", {
                    className: "videoplayer_sticker_promo__close"
                });
                this.domListen(s, "click", this.removeStickersPromo), this.stickersPromo.appendChild(o), this.stickersPromo.appendChild(s), this.el.appendChild(this.stickersPromo)
            }, e.prototype.toggleStickersPromo = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (this.stickersPromo && (e ? toggleClass(this.stickersPromo, "unshown", !t) : toggleClass(this.stickersPromo, "hidden", !t), !domData(this.stickersPromo, "shown") && !hasClass(this.stickersPromo, "unshown") && !hasClass(this.stickersPromo, "hidden"))) {
                    var i = domData(this.stickersPromo, "pack-id");
                    this.player.trigger(K, {
                        packId: i,
                        event: "show"
                    }), domData(this.stickersPromo, "shown", 1)
                }
            }, e.prototype.onStickersPromoClick = function(t, e, i) {
                this.player.isFullscreen() && this.player.toggleFullscreen(), Emoji.previewSticker(t, this, {
                    name: e,
                    sticker_referrer: "video_live"
                }, i), this.player.trigger(K, {
                    packId: t,
                    event: "click"
                })
            }, e.prototype.onStickersPurchased = function(t) {
                domData(this.stickersPromo, "pack-id") == t && (this.removeStickersPromo(), this.player.trigger(K, {
                    packId: t,
                    event: "purchase"
                }))
            }, e.prototype.removeStickersPromo = function() {
                this.stickersPromo && (re(this.stickersPromo), this.domUnlisten(domFC(this.stickersPromo)), this.domUnlisten(domLC(this.stickersPromo)), delete this.stickersPromo)
            }, e.prototype.pushNotice = function(t) {
                var e = this,
                    i = t.type,
                    n = t.image,
                    r = t.text;
                if (!inArray(i, this._ignoreNoticeTypes) && this.player.isActiveLive()) {
                    var o = this.player.getSize(),
                        s = me(o, 2),
                        a = s[0],
                        l = s[1];
                    if (!(a <= 510 || l <= 287)) {
                        this.removeNotice(), this._noticeEl = se('\n<div class="videoplayer_notice hidden">\n  <img src="' + n + '" class="videoplayer_notice__image"/>\n  <div class="videoplayer_notice__text">' + r + "</div>\n  " + function() {
                            return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M5 3.69L1.578.27C1.22-.09.635-.09.273.272-.09.637-.09 1.22.27 1.578L3.69 5 .27 8.422c-.358.357-.358.943.003 1.305.364.364.946.363 1.305.004L5 6.31l3.422 3.42c.357.358.943.358 1.305-.003.364-.364.363-.946.004-1.305L6.31 5l3.42-3.422c.358-.357.358-.943-.003-1.305C9.363-.09 8.78-.09 8.422.27L5 3.69z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
                        }("videoplayer_notice__close") + "\n</div>\n    "), this.domListen(this._noticeEl, "mouseenter", function() {
                            var t = domData(e._noticeEl, "timeoutId");
                            e.undelay(t)
                        }), this.domListen(this._noticeEl, "mouseleave", function() {
                            var t = e.delay(e.removeNotice, 2e3);
                            domData(e._noticeEl, "timeoutId", t)
                        }), this.domListen(domByClass(this._noticeEl, "videoplayer_notice__close"), "click", function() {
                            e.removeNotice(), e._ignoreNoticeTypes.push(i)
                        }), this.el.appendChild(this._noticeEl), this._noticeEl.offsetHeight, removeClass(this._noticeEl, "hidden");
                        var u = this.delay(this.removeNotice, 5e3);
                        domData(this._noticeEl, "timeoutId", u)
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
                if (toggleClass(this.el, "_minimized", this.player.isMinimized()), toggleClass(this.error, "_min_size", t < 720 || e < 405), toggleClass(this.liveWaiting, "_min_size", t < 720 || e < 405), this.updateShareActions(), this.endScreen && (this.endScreen.isStretchMode(t, e) ? this.controls.hide() : this.controls.show()), this.stickersPromo) {
                    var i = t >= 640 && e >= 360;
                    this.toggleStickersPromo(i, !0)
                }
            }, e.prototype.updateShareActions = function() {
                var t, e = !!this.endScreen && (t = this.endScreen).isStretchMode.apply(t, be(this.player.getSize()));
                this.shareActions.updateVisibility(e)
            }, e.prototype.onPlayerExpanded = function() {
                this._showSubtitlesIntro(), this.updateTitle(), setStyle(this.thumb, {
                    backgroundImage: "url(" + this.player.getThumbSrc() + ")",
                    backgroundSize: "cover"
                })
            }, e.prototype._onSubtitleCueChange = function(t) {
                t && t.length || this._subtitleLayer.clear(), this._subtitleLayer.update(t)
            }, e.prototype._onSubtitlesSwitched = function(t, e) {
                e ? (this._subtitleLayer = new ve(this.player), this.el.appendChild(this._subtitleLayer.el), this.undelay(this._featureSubtitlesTimeout)) : this._subtitleLayer && this._subtitleLayer.destroy()
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), clearInterval(this._checkUserActivityInterval)
            }, e.prototype.calculateBackgroundSizeForVerticalThumb = function(t) {
                var e = this.player.getVars();
                return e.is_inline && !t && e.thumb_ratio && e.aspect_ratio ? e.thumb_ratio * (1 / e.aspect_ratio) * 100 + 2 + "%" : "cover"
            }, e
        }(yt);
        var Se = function(t) {
            function e(i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }(this, t.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_ads"
                }), n.videoEl = ce("video", {
                    className: "videoplayer_ads_media_el"
                }), n.el.appendChild(n.videoEl), n.pauseLayer = ce("div", {
                    className: "videoplayer_ads_pause_layer"
                }), n.domListen(n.pauseLayer, "click", function() {
                    return n.player.play()
                }), n.el.appendChild(n.pauseLayer), n.buildActions(), n.playerListen(b, n.onPlayerExpanded), n.playerListen(_, n.onFullscreenChange), n.playerListen(d, n.onStateChange), n.playerListen(G, n.updateOverlay), n.playerListen(Y, n.updateOverlay), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.buildActions = function() {
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
                    timeout: 2e3,
                    onLoad: function() {
                        return t.onAdmanLoaded()
                    },
                    onError: function() {
                        return t.onAdmanLoadingError()
                    }
                }), this.player.stats.sendAdsEvent("AdmanLoadStart")
            }, e.prototype.onAdmanLoaded = function() {
                window.AdmanHTML ? (this._admanLoader = null, this._needInit && this.initAdman(), this.player.stats.sendAdsEvent("AdmanLoaded")) : this.onAdmanLoadingError()
            }, e.prototype.onAdmanLoadingError = function() {
                this._admanLoader = null, this._admanLoadingError = !0, this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null), this.player.trigger($, !1), this.player.stats.sendAdsEvent("AdmanLoadError")
            }, e.prototype.initAdman = function() {
                var t, e, i = this.player.getVars(),
                    n = this.player.getSize(),
                    r = {
                        _SITEZONE: i.ads_sitezone || "",
                        vk_catid: i.ads_cat || "",
                        vk_id: i.viewer_id || "",
                        pl: i.ads_pl,
                        video_id: i.ads_eid1 || "",
                        content_id: function(t, e) {
                            var i = (t >>> 0).toString(16),
                                n = e.toString(16);
                            for (; n.length < 8;) n = "0" + n;
                            return i + n
                        }(i.oid, i.vid),
                        dl: encodeURIComponent(i.embed_referer || function(t) {
                            if ("string" != typeof t) return t;
                            return t.replace(new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1").replace(new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1")
                        }(document.URL)),
                        duration: i.duration,
                        g: i.g,
                        a: i.a,
                        os: i.target_mob_os || "no",
                        lang: 3 == vk.lang && i.cis ? 1 : 0,
                        autoplay: this.player.isAutoplay() ? 1 : 0,
                        player_width: n[0],
                        player_height: n[1],
                        puid1: i.ads_puid1 || "",
                        puid2: i.ads_puid2 || "",
                        puid3: this._isLiveMidroll ? 2 : 1,
                        puid4: i.ads_puid4 || "",
                        puid5: i.ads_puid5 || "",
                        puid6: i.ads_puid6 || "",
                        puid7: i.ads_puid7 || 1,
                        puid8: i.ads_puid8 || "",
                        puid9: function(t) {
                            return t.is_embed ? t.autoplay ? 3 : 1 : 0
                        }(i),
                        puid10: function(t, e) {
                            return t < 400 || e < 225 ? 5 : t < 640 || e < 360 ? 0 : t < 960 || e < 540 ? 1 : t < 1280 || e < 720 ? 2 : 3
                        }.apply(void 0, function(t) {
                            if (Array.isArray(t)) {
                                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                                return i
                            }
                            return Array.from(t)
                        }(n)),
                        puid11: this.player.isFullscreen() ? 0 : 1,
                        puid12: 16,
                        puid13: (e = i.g, 1 == e ? 2 : 2 == e ? 1 : 3),
                        puid14: (t = i.a, t < 18 ? 1 : t < 22 ? 2 : t < 25 ? 3 : t < 28 ? 4 : t < 31 ? 5 : t < 35 ? 6 : t < 40 ? 7 : t < 45 ? 8 : t < 50 ? 9 : t < 55 ? 10 : 11),
                        puid15: i.ads_puid15 || "",
                        puid18: i.ads_puid18 || 0,
                        puid21: i.ads_puid21 || "",
                        puid22: i.ads_puid22 || ""
                    }; - 1 == i.ads_type && (r.is_xz_video = 1);
                var o = St.getPref("preroll_progress");
                o && (St.deletePref("preroll_progress"), this.player.getVideoId() === o.video && o.time > Date.now() - 6e4 && (r.refr = 1)), nav.objLoc.preview && (r.preview = intval(nav.objLoc.preview));
                var s = {
                    slot: 6531,
                    wrapper: this.el,
                    videoEl: this.videoEl,
                    videoQuality: n[1],
                    params: r,
                    browser: ke,
                    config: Le
                };
                this.adman && this.adman.destroy(), this.adman = new window.AdmanHTML, this.adman.setDebug(!1), this.adman.onReady(this.onAdsReady.bind(this)), this.adman.onStarted(this.onAdStarted.bind(this)), this.adman.onPaused(this.onAdPaused.bind(this)), this.adman.onPlayed(this.onAdPlayed.bind(this)), this.adman.onCompleted(this.onAdCompleted.bind(this)), this.adman.onTimeRemained(this.onAdTimeRemained.bind(this)), this.adman.onClicked(this.onAdClicked.bind(this)), this.adman.onClosed(this.onAdClosed.bind(this)), this.adman.onError(this.onAdError.bind(this)), this.adman.init(s), this.player.stats.sendAdsLoadStarted(), this.player.stats.sendAdsEvent("AdmanInit")
            }, e.prototype.start = function(t, e) {
                this.player.isInited() && !this._admanLoadingError ? ("_live_midroll" == t ? (this.cancelAds(), t = "preroll", this._isLiveMidroll = !0) : this._isLiveMidroll = !1, this._sectionToPlay = t, this._sectionCallback = e, window.AdmanHTML ? this._adsReady ? this.adman.start(t) : this.adman || this.initAdman() : (this._needInit = !0, this._admanLoader || this.loadAdman()), this.player.trigger($, !0)) : e && e()
            }, e.prototype.play = function() {
                this.adman && this.adman.resume()
            }, e.prototype.pause = function() {
                this.adman && this.adman.pause()
            }, e.prototype.stop = function() {
                this.adman && this.adman.stop()
            }, e.prototype.setVolume = function(t) {
                this.isPlayingLinear() && this.adman.setVolume(t)
            }, e.prototype.onAdsReady = function() {
                this._adsReady = !0, this._sectionToPlay && this.adman.start(this._sectionToPlay), this.player.trigger($, !1), this.player.stats.sendAdsEvent("AdmanReady")
            }, e.prototype.onAdStarted = function(t, e) {
                this._curSection = t, this._curBanner = e, show(this.el), "preroll" == t || "postroll" == t ? (this._actionsInited = !1, "VPAID" == e.apiFramework && "application/javascript" != e.type || show(this.videoEl), this.player.trigger(et, t, {
                    duration: e.duration,
                    hideControls: !1 === e.showControls
                }), this.adman.setVolume(this.player.isMuted() ? 0 : this.player.getVolume())) : (addClass(this.el, "no_transition"), addClass(this.el, "_overlay"), removeClassDelayed(this.el, "no_transition"), this.updateOverlay(), this.player.trigger(nt)), "preroll" == t && St.savePref("preroll_progress", {
                    video: this.player.getVideoId(),
                    time: Date.now()
                }), this.player.stats.sendAdShown(t, "start"), this.player.stats.sendAdsEvent("AdmanAdStarted", t)
            }, e.prototype.onAdPaused = function() {
                this.player.pause()
            }, e.prototype.onAdPlayed = function() {
                this.player.play()
            }, e.prototype.onAdCompleted = function() {
                var t = this._curSection,
                    e = this._sectionToPlay;
                this._curSection = null, this._sectionToPlay = null, this._curBanner = null, this._curTime = null, t ? (hide(this.el), "preroll" == t || "postroll" == t ? (hide(this.videoEl), hide(this.actions), hide(this.pauseLayer), this.player.trigger(it, t)) : (removeClass(this.el, "_overlay"), this.player.trigger(rt)), this.player.stats.sendAdShown(t, "end"), this.player.stats.sendAdsEvent("AdmanAdCompleted", t)) : this.player.stats.sendAdsEvent("AdmanAdEmpty", e), "preroll" == t && St.deletePref("preroll_progress"), this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null), this.player.play()
            }, e.prototype.onAdTimeRemained = function(t) {
                var e = t.currentTime,
                    i = t.duration,
                    n = t.remained,
                    r = this._curBanner,
                    o = this._curSection;
                if (this._curTime = e, r && !1 !== r.showControls && -1 !== e) {
                    n = intval(n), val(this.actionsTimer, '<span class="_caption">' + this.getLang("ads") + '</span> <span class="_remained">' + formatTime(n) + "</span>");
                    var s = !1;
                    if (r.allowClose && (e < r.allowCloseDelay ? (val(this.actionsSkip, this.getLang("ads_skip_time", {
                            time: "<b>" + Math.ceil(r.allowCloseDelay - e) + "</b>"
                        })), removeClass(this.actionsSkip, "_can_skip")) : (val(this.actionsSkip, '<span class="_skip_text">' + this.getLang("ads_skip") + "</span>" + function() {
                            return '\n<svg class="' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + '" viewBox="163 11 8 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M165 13l5 5.5-5 5.5"/>\n</svg>\n  '
                        }("_skip_icon")), addClass(this.actionsSkip, "_can_skip"), s = !0)), "preroll" == o && s && St.deletePref("preroll_progress"), !this._actionsInited) {
                        show(this.actions);
                        var a = r.allowClose && r.allowCloseDelay < i && n < i;
                        toggleClass(this.actionsSkip, "unshown", !a), this._actionsInited = !0
                    }
                    this.player.trigger(tt, e, i, n)
                }
            }, e.prototype.onAdClicked = function() {
                this.player.stats.sendAdsEvent("AdmanClicked", this._curSection), this.player.pause()
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
                toggleClass(this.actions, "_min_size", t < 400), this.updateOverlay()
            }, e.prototype.canShowOverlay = function() {
                var t = this.player.getSize(),
                    e = t[0] >= 500 && t[1] >= 280,
                    i = this.player.getState() === a.PLAYING,
                    n = this.player.isControlsVisible();
                return e && i && n
            }, e.prototype.updateOverlay = function() {
                this.canShowOverlay() ? (this.isPlayingOverlay() && this.adman.resume(), removeClass(this.el, "_overlay_hidden")) : (this.isPlayingOverlay() && this.adman.pause(), addClass(this.el, "_overlay_hidden"))
            }, e.prototype.onPlayerExpanded = function() {
                this.adman && this.adman.resume()
            }, e.prototype.onFullscreenChange = function(t) {
                (this.isPlayingLinear() || this.isPlayingOverlay()) && this.adman.setFullscreen(t)
            }, e.prototype.onStateChange = function(t) {
                this.updateOverlay(), this.isPlayingLinear() && toggle(this.pauseLayer, t !== a.PLAYING)
            }, e
        }(yt);
        var ke = {
                mobile: browser.mobile,
                FLASH_BLOCKED: 0,
                FLASH_READY: 1,
                FLASH_UNKNOWN: 2,
                checkFlashStatus: function(t) {
                    t(browser.flash ? this.FLASH_READY : this.FLASH_BLOCKED)
                }
            },
            Le = {
                vpaidJsInterface: locProtocol + "//ad.mail.ru/static/vpaid-js-interface.swf"
            },
            Te = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
                }
                return t
            };
        var Ee = "videoplayer_track_events",
            Ce = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n.playerListen(v, n._onSubtitleTrackChanged), n.playerListen(J, n._onActionButtonClicked), n.playerListen(Z, n._onActionButtonShown), n._storageKey = Ee + irand(1, 1e9), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.initVideo = function(t) {
                    this._flushStorageEvents(), t.embed_referer ? this._refDomain = ce("a", {
                        href: t.embed_referer
                    }).hostname : this._refDomain = ""
                }, e.prototype._onSubtitleTrackChanged = function(t, e) {
                    var i = e && e.lang || "undefined",
                        n = e ? i : "off",
                        r = {};
                    e && !this._subtitlesFirstEnabled && (this._subtitlesFirstEnabled = !0, r.first = !0), this.trackPlayerEvent("subtitles", n, r)
                }, e.prototype._onActionButtonClicked = function() {
                    this.trackLiveAction("open_link")
                }, e.prototype._onActionButtonShown = function(t) {
                    var e = t.data;
                    this.trackLiveAction("show_link", {
                        link: e.url,
                        link_type: e.type
                    })
                }, e.prototype.trackVideoPlay = function(t) {
                    var e = {
                        position: t
                    };
                    this._pushEvent("video_play", e)
                }, e.prototype.trackPlayerEvent = function(t, e) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        n = Te({
                            event: t,
                            value: e
                        }, i);
                    this._pushEvent("video_event", n)
                }, e.prototype.trackLiveAction = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = Te({
                            action_type: t
                        }, e);
                    this._pushEvent("live_action", i)
                }, e.prototype._pushEvent = function(t, e) {
                    var i = this,
                        n = this.player,
                        r = this.getVars(),
                        o = Te({
                            ts: Math.round(Date.now() / 1e3),
                            video_id: n.getVideoId(),
                            position: n.curTime(),
                            player_type: n.getEnvLayoutType(),
                            ref: r.module || n.getEnvModule(),
                            volume: Math.round(100 * n.getVolume()) / 100,
                            quality: n.getQuality(),
                            speed: n.getPlaybackRate(),
                            e: t
                        }, e);
                    n.isFromAutoplay() && (o.autoplay = 1), r.post_id && (o.post_id = r.post_id), this._refDomain && (o.ref_domain = this._refDomain);
                    var s = this._getFromStorage();
                    s.push(o), this._saveToStorage(s);
                    var a = function() {
                        i._sendEvents(s), i._saveToStorage([])
                    };
                    clearTimeout(this._flushTimeout), s.length >= 30 ? a() : this._flushTimeout = setTimeout(a, 500)
                }, e.prototype._sendEvents = function(t) {
                    var e = this.getVars(),
                        i = [e.action_hash, e.oid, e.vid, e.viewer_id].join("_");
                    ajax.post("al_video.php?act=track_player_events", {
                        events: JSON.stringify(t),
                        sig: i
                    })
                }, e.prototype._saveToStorage = function(t) {
                    this._storageKey && (t.length ? St.set(this._storageKey, {
                        events: t,
                        updated: Date.now()
                    }) : St.remove(this._storageKey))
                }, e.prototype._getFromStorage = function() {
                    if (this._storageKey) {
                        var t = St.get(this._storageKey);
                        if (t) return t.events
                    }
                    return []
                }, e.prototype._flushStorageEvents = function() {
                    var t = this,
                        e = St.getByPrefix(Ee);
                    each(e, function(e, i) {
                        i.updated + 5e3 < Date.now() && (t._sendEvents(i.events, i.hash), St.remove(e))
                    })
                }, e
            }(yt);
        var Pe = function(t) {
                function e(i) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, t.call(this, i));
                    return n.trackEvents = new Ce(i), n.playerListen(x, n.onMediaTimeupdate), n.playerListen(O, n.onMediaPlaying), n.playerListen(R, n.onMediaWaiting), n.playerListen(N, n.onMediaSeeking), n.playerListen(j, n.onMediaSeeked), n.playerListen(B, n.onMediaEnded), n.playerListen(I, n.onMediaVolumeChange), n.playerListen(z, n.onMediaHlsLevelLoaded), n.playerListen(Q, n.onMediaHlsFragLoaded), n.playerListen(_, n.onFullscreenChange), n.playerListen(y, n.onQualityChange), n.playerListen(d, n.onStateChange), n.playerListen(et, n.onLinearAdStarted), n.playerListen(it, n.onLinearAdCompleted), n.playerListen(K, n.onUiStickersPromoEvent), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, t), e.prototype.initVideo = function(t) {
                    this.initTime = Date.now(), this.viewCounterIncremented = !1, this.lastPlayProgressSent = 0, this.needViewSegments = !(!t.vsegs_size || !t.vsegs_hash), this.playFinishedSent = !1, this.requestedPlay = 0, this.startedPlay = 0, this.startQuality = 0, this.pausedBeforeStart = !1, this.stallsCount = 0, this.seekDurations = [], this.hlsFirstLevelLoadTime = 0, this.hlsFirstFragLoadTime = 0, this.collectWatchStat = !0, this.maxTimePosition = 0, this.maxTimePercent = 0, this.lastVolume = this.player.isMuted() ? 0 : this.player.getVolume(), this.liveHeartbeatEventsQueue = [], this.ownerId = t.oid, this.videoId = t.vid, this.initViewSegments(t), this.flushWatchData(), this.flushCandyData(), this.sendTnsStat("init")
                }, e.prototype.deinitVideo = function() {
                    this._bigTvTimeout && (clearTimeout(this._bigTvTimeout), this._bigTvTimeout = null), this.flushWatchData(), this.flushCandyData()
                }, e.prototype.initViewSegments = function(t) {
                    this.curSegments = t.vsegs ? t.vsegs.split("|").pop() : ""
                }, e.prototype.initBigTvStats = function() {
                    var t = this,
                        e = this.getVar("stats_bigtv");
                    if (e) {
                        ! function i() {
                            var n = Math.floor(t.player.isActiveLive() ? Date.now() / 1e3 - t.getVar("date") : t.player.curTime()),
                                r = Math.floor(Date.now() / 1e3);
                            vkImage().src = e.replace("FTS", n).replace("VTS", r), t._bigTvTimeout = t.delay(i, 3e4)
                        }()
                    }
                }, e.prototype.saveWatchData = function() {
                    this.collectWatchStat && this.requestedPlay && this.startedPlay && St.set("video_last_watch_stat", {
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
                        is_active_live: this.getVar("live") && this.getVar("live") != at ? 1 : 0,
                        last_pos: this.player.curTime(),
                        post_id: this.getVar("post_id"),
                        module: this.getVar("module"),
                        hls_candy: "hls" == this.player.getMediaProviderType() && this.getVar("hls_candy_server") ? 1 : 0
                    })
                }, e.prototype.flushWatchData = function() {
                    var t = St.get("video_last_watch_stat");
                    t && (ajax.post("al_video.php?act=watch_stat", t, {}), this.clearWatchData())
                }, e.prototype.clearWatchData = function() {
                    St.remove("video_last_watch_stat")
                }, e.prototype.flushCandyData = function() {
                    var t = St.get("video_live_candy_stat");
                    t && (ajax.post("al_video.php?act=live_candy_stat", t, {}), St.remove("video_live_candy_stat"))
                }, e.prototype.onMediaPlaying = function() {
                    if (!this.startedPlay) {
                        this.startedPlay = Date.now(), this.getVar("hls") || (this.startQuality = this.player.getQuality());
                        var t = this.player.curTime(),
                            e = this.player.isActiveLive();
                        e && this.addLiveHeartbeatStatsEvent("play_started");
                        var i = t < 1 || e ? "start" : "continue";
                        this.trackEvents.trackVideoPlay(i), this.saveWatchData(), this.sendPlayStarted(), this.sendPladformStat(), this.sendAdPostStatEvent("video_start"), this.sendTnsStat("started"), this.sendMediascopeStat("started"), this.initBigTvStats()
                    }
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
                    this.playFinishedSent || (this.playFinishedSent = !0, this.sendPlayFinished(), this.sendTnsStat("ended"), this.sendMediascopeStat("ended")), this.saveWatchData()
                }, e.prototype.onMediaTimeupdate = function(t) {
                    var e = this;
                    if (this.viewCounterIncremented || this.player.isPlayingLinearAd() || (this.player.getPlayedSeconds() > 5 || this.player.getDuration() < 5) && (this.sendIncViewCounter(), this.viewCounterIncremented = !0), !this.player.isActiveLive() && Date.now() - this.lastPlayProgressSent > 1e3 && (this.lastPlayProgressSent = Date.now(), this.sendPlayProgress(t), this.saveWatchData(), this.needViewSegments)) {
                        var i = this.getViewSegments();
                        i != this.curSegments && (this.curSegments = i, this.sendViewSegments(i))
                    }
                    if (!this.player.isActiveLive() && t > this.maxTimePosition) {
                        var n = this.player.getDuration() || 1,
                            r = this.maxTimePosition,
                            o = this.maxTimePercent,
                            s = t / n * 100;
                        this.player.isLooped() && n - t < .5 && (s = 100), t >= 3 && r < 3 && (this.trackEvents.trackVideoPlay("3s"), this.sendAdPostStatEvent("video_play_3s")), t >= 10 && r < 10 && this.trackEvents.trackVideoPlay("10s"), each([25, 50, 75, 95, 100], function(t, i) {
                            s >= i && o < i && (e.trackEvents.trackVideoPlay(i), e.sendAdPostStatEvent("video_play_" + i), e.sendMediascopeStat(i + "%"))
                        }), this.maxTimePosition = t, this.maxTimePercent = s
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
                    var e = St.get("video_live_candy_stat") || {
                        p2p_bytes: 0,
                        cdn_bytes: 0,
                        video: this.player.getVideoId(),
                        hash: this.getVar("action_hash")
                    };
                    e.p2p_bytes += t.p2pBytes, e.cdn_bytes += t.cdnBytes, St.set("video_live_candy_stat", e)
                }, e.prototype.onStateChange = function(t, e) {
                    this.requestedPlay || t !== a.PLAYING || (this.requestedPlay = Date.now()), this.startedPlay || t != a.PAUSED || (this.collectWatchStat = !1, this.pausedBeforeStart = !0), this.player.isTouchedByUser() && (t === a.PAUSED && this.sendAdPostStatEvent("video_pause"), t === a.PLAYING && e === a.PAUSED && this.sendAdPostStatEvent("video_resume"))
                }, e.prototype.onQualityChange = function() {
                    this.player.externalCall("onVideoResolutionChanged", this.getVar("oid"), this.getVar("vid"), this.getVar("action_hash"), this.player.getQualityIndex())
                }, e.prototype.onFullscreenChange = function(t) {
                    this.sendAdPostStatEvent(t ? "video_fullscreen_on" : "video_fullscreen_off")
                }, e.prototype.onLinearAdStarted = function(t) {
                    this.sendAdsPlayStarted(), "preroll" == t && (this.clearWatchData(), this.collectWatchStat = !1)
                }, e.prototype.onLinearAdCompleted = function() {
                    this.sendAdsPlayFinished()
                }, e.prototype.onUiStickersPromoEvent = function(t) {
                    var e = t.packId,
                        i = t.event;
                    ajax.post("video?act=player_stickers_promo_event", {
                        event: i,
                        pack_id: e,
                        owner_id: this.getVar("oid"),
                        video_id: this.getVar("vid"),
                        hash: this.getVar("action_hash")
                    })
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
                }, e.prototype.sendTnsStat = function(t) {
                    var e = this.getVar("stats_tns");
                    if (e) {
                        var i = {
                            ru: {
                                init: "https://www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videoload/",
                                started: "https://www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videostart/",
                                ended: "https://www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videoend/"
                            },
                            ru_1: {
                                init: "https://www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerload/",
                                started: "https://www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerstart/",
                                ended: "https://www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerend/"
                            },
                            ru_2: {
                                init: "https://www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=platform_videovk-playerload/",
                                started: "https://www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=platform_videovk-playerstart/",
                                ended: "https://www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=platform_videovk-playerend/"
                            },
                            kz: {
                                init: "https://www.tns-counter.ru/V13a****vk_kz/ru/CP1251/tmsec=vkkz_videoloading/",
                                started: "https://www.tns-counter.ru/V13a****vk_kz/ru/CP1251/tmsec=vkkz_videostart/",
                                ended: "https://www.tns-counter.ru/V13a****vk_kz/ru/CP1251/tmsec=vkkz_videoend/"
                            }
                        };
                        i[e] && i[e][t] && (vkImage().src = i[e][t] + irand(1, 1e9))
                    }
                }, e.prototype.sendMediascopeStat = function(t) {
                    var e = {
                        "-169824905_456239043": "86529522-456239302",
                        "-169824905_456239042": "86529522-456239303",
                        "-169824905_456239041": "86529522-456239304",
                        "-169824905_456239039": "86529522-456239305",
                        "-169824905_456239040": "86529522-456239306"
                    }[this.player.getVideoId()];
                    if (e) {
                        var i = {
                            started: 1,
                            "25%": 2,
                            "50%": 3,
                            "75%": 4,
                            "100%": 5
                        }[t];
                        i && (vkImage().src = "https://www.tns-counter.ru/V13a****vk_test/ru/CP1251/tmsec=vkvideo_" + e + "-" + i + "/" + irand(1, 1e9))
                    }
                }, e.prototype.getViewSegments = function() {
                    if (this.getVar("vsegs_size")) {
                        var t = this.player.getPlayedRanges(),
                            e = this.getVar("vsegs_size"),
                            i = Math.ceil(this.getVar("duration") / e),
                            n = Et(new Array(i), 0);
                        this.curSegments && this.unpackViewSegments(this.curSegments, n);
                        for (var r = 0; r < t.length; ++r)
                            for (var o = Math.round(t.start(r)), s = Math.round(t.end(r)), a = Math.floor(o / e), l = Math.floor(s / e), u = a; u <= l; ++u) {
                                var h = e * u,
                                    c = Math.min(this.getVar("duration"), h + e);
                                n[u] += (Math.min(c, s) - Math.max(h, o)) / (c - h)
                            }
                        return this.packViewSegments(n)
                    }
                }, e.prototype.packViewSegments = function(t) {
                    for (var e = [], i = 0, n = !0, r = 0; r < t.length; ++r) {
                        var o = t[r] >= .5;
                        o == n ? ++i : (e.push(i), n = o, i = 1)
                    }
                    n && e.push(i);
                    var s = e.join(",");
                    return "0" === s ? "" : s
                }, e.prototype.unpackViewSegments = function(t, e) {
                    t = t.split(",");
                    for (var i = 0, n = 0; i < t.length; ++i) {
                        var r = i % 2 == 0,
                            o = +t[i];
                        Et(e, r ? 1 : 0, n, n + o), n += o
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
            }(yt),
            Ae = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            n = !0,
                            r = !1,
                            o = void 0;
                        try {
                            for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                        } catch (t) {
                            r = !0, o = t
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            xe = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();

        function Ve(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
            return Array.from(t)
        }
        var Ie = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), e = clone(e), this.setLangVars(e), this.el = ce("div", {
                        className: "videoplayer"
                    }), attr(this.el, "tabindex", -1), attr(this.el, "role", "complementary"), attr(this.el, "aria-label", this.langVars.aria_videoplayer), this.state = a.EMPTY, this._volume = this.preferredVolume, this._muted = !this._volume, this._events = new EventEmitter, this.media = new Bt(this), this.el.appendChild(this.media.el), this.ads = new Se(this), this.el.appendChild(this.ads.el), this.ui = new we(this), this.el.appendChild(this.ui.el), this.stats = new Pe(this), this.on(O, this.onMediaPlaying.bind(this)).on(D, this.onMediaPause.bind(this)).on(x, this.checkSuggestionQuarterWatched.bind(this)).on(B, this.onEnded.bind(this)).on(F, this.onError.bind(this)).on(W, this.onUiSeekStart.bind(this)).on(et, this.onLinearAdsStarted.bind(this)).on(it, this.onLinearAdsCompleted.bind(this)), window.addEventListener("resize", this._resizeHandler = this.resize.bind(this)), Kt.a && document.addEventListener(Kt.a.raw.fullscreenchange, this._fsChangeHandler = this.onFullscreenChange.bind(this)), VideoPlayer._instances && VideoPlayer._instances.add(this), this.initVideo(e)
                }
                return t.prototype.initVideo = function(t) {
                    var e = this;
                    t = clone(t, !0), this.vars = t, this.changeState(a.UNSTARTED, !0), this.videoLiked = t.liked, this.videoAdded = t.added, this.isSubscribed = t.is_subscribed, this._livePhase = t.live, this.videoBookmarked = t.bookmarked, this.trigger(l, t), t.from_autoplay && this.toggleMute(!0, !1), this.isActiveLive() && this.startLiveHeartbeat(), t.show_suggestions && this.loadSuggestions(), (window.requestAnimationFrame || window.setTimeout)(function() {
                        e.externalCall("onInitialized"), e.resize(), t.autoplay && e.play()
                    }, 0)
                }, t.prototype.deinitVideo = function() {
                    this.stopLiveHeartbeat(), this.changeState(a.EMPTY), this._quality = null, this._livePhase = null, this._startedPlaying = !1, this._didEnded = !1, this._suggestions = null, this._suggestionsQid = null, this.trigger(u), this.vars = null
                }, t.prototype.reinitWithoutHls = function() {
                    var t = this.vars;
                    this.deinitVideo(), delete t.hls, this.initVideo(t)
                }, t.prototype.setLangVars = function(t) {
                    var e = this;
                    this.langVars = {}, each(t, function(t, i) {
                        "lang_" === t.substr(0, 5) && (e.langVars[t.substr(5)] = i)
                    })
                }, t.prototype.loadSuggestions = function() {
                    var t, e = (t = regeneratorRuntime.mark(function t() {
                        var e, i, n, r, o, s, a, l, u;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (e = this.getVideoId(), i = this.vars.suggestions_sig) {
                                        t.next = 4;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 4:
                                    return n = {
                                        id: e,
                                        t_sex: this.vars.g || null,
                                        t_age: this.vars.a || null,
                                        uid: this.vars.viewer_id || null,
                                        sig: i
                                    }, r = pt("//vk.go.mail.ru/vk/video_recommend?" + ajx2q(n)), t.next = 8, r.promise;
                                case 8:
                                    o = t.sent, s = o.response, a = JSON.parse(s), this.getVideoId() === e && a && a.results && a.results.length && (this._suggestionsQid = a.qid, l = a.results, u = !(!this.vars.is_inline && !this.vars.is_embed), this.externalCall("fetchSuggestions", l.join(","), u));
                                case 12:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    }), function() {
                        var e = t.apply(this, arguments);
                        return new Promise(function(t, i) {
                            return function n(r, o) {
                                try {
                                    var s = e[r](o),
                                        a = s.value
                                } catch (t) {
                                    return void i(t)
                                }
                                if (!s.done) return Promise.resolve(a).then(function(t) {
                                    n("next", t)
                                }, function(t) {
                                    n("throw", t)
                                });
                                t(a)
                            }("next")
                        })
                    });
                    return function() {
                        return e.apply(this, arguments)
                    }
                }(), t.prototype.checkSuggestionQuarterWatched = function(t) {
                    this.isInited() && this.vars.suggestions_qid && !this._suggestionQuartedWatched && !this.isPlayingLinearAd() && t / this.getDuration() > .25 && (this._suggestionQuartedWatched = !0, this.onSuggestionQuarterWatched())
                }, t.prototype.isInited = function() {
                    return this.getState() !== a.EMPTY
                }, t.prototype.getVars = function() {
                    return this.vars ? clone(this.vars) : null
                }, t.prototype.getVideoId = function() {
                    return this.isInited() ? this.vars.oid + "_" + this.vars.vid : null
                }, t.prototype.getVideoLink = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = "https://vk.com/video" + this.getVideoId();
                    return t && (e += "?t=" + Rt(this.curTime())), e
                }, t.prototype.getEmbedCode = function() {
                    var t = this.vars;
                    return '<iframe src="' + ("https://vk.com/video_ext.php?oid=" + t.oid + "&id=" + t.vid + "&hash=" + t.embed_hash) + '" width="640" height="360" frameborder="0" allowfullscreen></iframe>'
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
                    return function(t) {
                        for (var e = 0; e < ht.length; e++)
                            if (t <= ht[e].height) return e;
                        return ht.length - 1
                    }(this.getQuality())
                }, t.prototype.setQuality = function(t) {
                    var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).setPreferred,
                        i = void 0 === e || e;
                    if ((inArray(t, this.getAvailableQualities()) || -1 === t) && (-1 !== t || !this.isAutoQualityEnabled()) && (t !== this._quality || this.isAutoQualityEnabled())) {
                        if (this.media.setQuality(t), this.onQualityChanged(-1 === t ? this.getQuality() : t), -1 !== t && i)(t < Math.max.apply(Math, this.getAvailableQualities()) || t > this.preferredQuality) && (this.preferredQuality = t);
                        this.getState() === a.ERROR && this.changeState(a.PLAYING)
                    }
                }, t.prototype.onQualityChanged = function(t) {
                    var e = this.isAutoQualityEnabled(),
                        i = this._quality;
                    this._quality = t, this.trigger(y, t, i, e)
                }, t.prototype.getAvailableSubtitleTracksInfo = function() {
                    return this.media.getAvailableSubtitleTracksInfo()
                }, t.prototype.getSubtitleTrack = function() {
                    return this.media.getSubtitleTrack()
                }, t.prototype.getPreferredSubtitleTrack = function() {
                    var t = this.getAvailableSubtitleTracksInfo();
                    if (!t.length) return null;
                    if (1 === t.length) return t[0];
                    var e = this.vars.subtitles_langs,
                        i = this.preferredSubtitleLang,
                        n = vk.lang,
                        r = null,
                        o = null,
                        s = null,
                        a = null,
                        l = !0,
                        u = !1,
                        h = void 0;
                    try {
                        for (var c, d = t[Symbol.iterator](); !(l = (c = d.next()).done); l = !0) {
                            var p = c.value,
                                f = p.lang;
                            r || 3 !== e[f].lang_id || (r = p), o || 0 !== e[f].lang_id || (o = p), s || e[f].lang_id !== i || (s = p), a || e[f].lang_id !== n || (a = p)
                        }
                    } catch (t) {
                        u = !0, h = t
                    } finally {
                        try {
                            !l && d.return && d.return()
                        } finally {
                            if (u) throw h
                        }
                    }
                    return s || a || this.vars.cis && o || r || t[0]
                }, t.prototype.switchSubtitleTrack = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        i = this.getAvailableSubtitleTracksInfo();
                    if (i.length)
                        if (-1 === t || null === t && this.getSubtitleTrack() > -1) this.media.switchSubtitleTrack({
                            trackId: -1
                        });
                        else {
                            null === t && (t = this.getPreferredSubtitleTrack().id);
                            var n = !0,
                                r = !1,
                                o = void 0;
                            try {
                                for (var s, a = i[Symbol.iterator](); !(n = (s = a.next()).done); n = !0) {
                                    var l = s.value;
                                    if (t === l.id) {
                                        var u = this.vars.subtitles_langs[l.lang].lang_id;
                                        return this.media.switchSubtitleTrack({
                                            trackId: t
                                        }), this.preferredSubtitleLang = u, void(e && this.trigger(X, l))
                                    }
                                }
                            } catch (t) {
                                r = !0, o = t
                            } finally {
                                try {
                                    !n && a.return && a.return()
                                } finally {
                                    if (r) throw o
                                }
                            }
                        }
                }, t.prototype.play = function() {
                    this.getState() !== a.PLAYING && this.getState() !== a.ERROR && this.isInited() && (this.getState() === a.UNSTARTED && this.requestPlayAds(), this.changeState(a.PLAYING), this.isPlayingLinearAd() ? this.ads.play() : this.media.play(), this.externalCall("onVideoStreamPlaying", this.vars.oid, this.vars.vid))
                }, t.prototype.pause = function() {
                    this.getState() === a.PLAYING && this.getState() !== a.ERROR && (this.isPlayingLinearAd() ? this.ads.pause() : this.media.pause(), this.changeState(a.PAUSED))
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
                        this._livePhase = t, this.trigger(P, t, e), this.isActiveLive() || this.stopLiveHeartbeat()
                    }
                }, t.prototype.isActiveLive = function() {
                    var t = this.getLivePhase();
                    return t == ot || t == st
                }, t.prototype.isInLayer = function() {
                    return !!this.externalCall("isInLayer", this.getVideoId())
                }, t.prototype.startLiveHeartbeat = function() {
                    var t = this,
                        e = [],
                        i = {};
                    ! function n() {
                        var r = t.isInLayer(),
                            o = t.stats.getLiveHeartbeatStats();
                        ajax.post("al_video.php?act=live_heartbeat", {
                            oid: t.vars.oid,
                            vid: t.vars.vid,
                            user_id: t.vars.viewer_id,
                            need_friends: r ? 1 : 0,
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
                        }), t._liveHeartbeatTimeout = setTimeout(n, 5e3)
                    }()
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
                    void 0 === t && (t = this.getState() !== a.PLAYING), t ? this.play() : this.pause()
                }, t.prototype.getMediaProviderType = function() {
                    return this.media.providerType()
                }, t.prototype.requestPlayAds = function() {
                    var t = this,
                        e = this.vars.live && this.vars.live != at;
                    this.canShowAds() && !e && (this.media.preload(), this.media.disablePlayback(), this.ads.start("preroll", function() {
                        t.isInited() && setTimeout(function() {
                            t.media.enablePlayback(), t.ads.start("overlay")
                        })
                    }))
                }, t.prototype.onMediaPlaying = function() {
                    this._startedPlaying = !0, this.changeState(a.PLAYING)
                }, t.prototype.onMediaPause = function() {
                    this.changeState(a.PAUSED)
                }, t.prototype.onEnded = function() {
                    var t = this;
                    this.isPlayingOverlayAd() && this.ads.stop();
                    var e = this.vars.live && this.vars.live != at;
                    !this.canShowAds() || e || this._didEnded ? (this.changeState(a.ENDED), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler(null, !0)) : (this.media.disablePlayback(), this.ads.start("postroll", function() {
                        t.changeState(a.ENDED), t.media.enablePlayback()
                    })), this._didEnded = !0
                }, t.prototype.onError = function(t) {
                    this.errorData = t, this.changeState(a.ERROR), this.ads.cancelAds(), this.externalCall("onVideoPlayError")
                }, t.prototype.onUiSeekStart = function() {
                    this.getState() === a.ENDED && this.changeState(a.PAUSED)
                }, t.prototype.canShowAds = function() {
                    var t = browser.msie && browser.version <= 10;
                    return !this.vars.no_ads && !t && this.getLivePhase() !== ut
                }, t.prototype.curTime = function() {
                    return this.isInited() ? this.isPlayingLinearAd() ? this.ads.curTime() : this.media.curTime() : 0
                }, t.prototype.seekTo = function(t) {
                    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (this.getState() !== a.ERROR) {
                        var i = this.getLivePhase();
                        i && i !== at || (t = Math.max(0, Math.min(this.getDuration(), t))) !== this.media.curTime() && (this.media.seekTo(t), this.trigger(m, t), e && this.getState() === a.UNSTARTED && this.play(), this.getState() === a.ENDED && this.changeState(a.PAUSED))
                    }
                }, t.prototype.seekToPercent = function(t) {
                    var e = this.getDuration() * t;
                    return this.seekTo(e)
                }, t.prototype.seekBy = function(t) {
                    return this.seekTo(this.curTime() + t)
                }, t.prototype.getVolume = function() {
                    return this._volume
                }, t.prototype.setVolume = function(t) {
                    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    t = Math.max(0, Math.min(1, t)), this.media.setVolume(t), this.ads.setVolume(t), this._volume = t, this._muted = !t, e && (this.preferredVolume = t)
                }, t.prototype.toggleMute = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !this.isMuted(),
                        e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        i = t ? 0 : this._volume || 1;
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
                    this.isAutoplay() && (this.expandFromAutoplay = !0, this.pause());
                    var t = this.vars.list_id,
                        e = Rt(this.curTime());
                    this.externalCall("onOpenInPopup", this.getVideoId(), t, e)
                }, t.prototype.onExpanded = function() {
                    var t = this,
                        e = this.expandFromAutoplay || this.isAutoplay();
                    this.vars.is_inline = 0, setTimeout(function() {
                        t.onTouchedByUser(), t.resize(), t.isPlayingLinearAd() ? t.ads.play() : t.media.play(), t.play(), t.trigger(b), e && t.vars.autoplay_expand_restart && !t.isActiveLive() && (t.ads.cancelAds(), t.seekTo(0), t.requestPlayAds())
                    }, 0)
                }, t.prototype.toggleFullscreen = function() {
                    Kt.a && (this.isFullscreen() ? Kt.a.exit() : Kt.a.request(this.el))
                }, t.prototype.isFullscreen = function() {
                    return Kt.a.element === this.el
                }, t.prototype.onFullscreenChange = function() {
                    this.trigger(_, this.isFullscreen()), this.resize(), this.externalCall("fullscreen", this.isFullscreen())
                }, t.prototype.getSize = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (!this._size || t) {
                        var e = this.el.getBoundingClientRect();
                        this._size = [e.width, e.height]
                    }
                    return this._size
                }, t.prototype.resize = function() {
                    addClass(this.el, "no_transition");
                    var t = this.getSize(!0);
                    this.trigger.apply(this, [h].concat(Ve(t))), removeClassDelayed(this.el, "no_transition")
                }, t.prototype.isMinimized = function() {
                    return !(!window.Videoview || !Videoview.isMinimized())
                }, t.prototype.getEnvLayoutType = function() {
                    return window.Videoview ? Videoview.getLayoutType() : ""
                }, t.prototype.getEnvModule = function() {
                    if (window.Videoview) {
                        var t = Videoview.getVideoModule(this.getVideoId());
                        if (t) return t
                    }
                    return cur.module || ""
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
                    this.isTouchedByUser() || (this.touchedByUser = !0, this.isFromAutoplay() && (this.ui.onTouchedByUser(), this.externalCall("onPlayerTouchedByUser"), setTimeout(function() {
                        t.toggleMute(!1), t.getState() === a.PLAYING && t.externalCall("onVideoStreamPlaying", t.vars.oid, t.vars.vid)
                    }, 0)))
                }, t.prototype.isTouchedByUser = function() {
                    return !!this.touchedByUser
                }, t.prototype.onSuggestionsShown = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? this._suggestionsQid : null;
                    this.externalCall("onSuggestionsShown", e, this.getVideoId(), t)
                }, t.prototype.onSuggestionClicked = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
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
                    this.onLiked(!this.videoLiked), this.externalCall("onLike", t)
                }, t.prototype.onLiked = function(t) {
                    this.videoLiked = !!t, this.trigger(k, this.videoLiked)
                }, t.prototype.shareVideo = function(t) {
                    this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onShare", t)
                }, t.prototype.addVideo = function(t) {
                    this.onAdded(), this.videoAdded ? this.externalCall("onAdd", this.getVideoId(), this.vars.add_hash, t) : this.externalCall("onRemove", t)
                }, t.prototype.donate = function(t) {
                    this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onDonate", t)
                }, t.prototype.bookmark = function(t) {
                    this.videoBookmarked ? this.externalCall("onRemoveBookmark", t) : this.externalCall("onAddBookmark", t), this.onBookmarked()
                }, t.prototype.onBookmarked = function() {
                    this.videoBookmarked = !this.videoBookmarked, this.trigger(E, this.videoBookmarked)
                }, t.prototype.onAdded = function() {
                    this.videoAdded = !this.videoAdded, this.trigger(T, this.videoAdded)
                }, t.prototype.subscribeToAuthor = function(t) {
                    var e = !this.isSubscribed;
                    this.externalCall("onSubscribe", e, t)
                }, t.prototype.onSubscribed = function(t) {
                    this.isSubscribed = !!t, this.trigger(C, this.isSubscribed)
                }, t.prototype.nextTimerReset = function() {
                    this.nextTimerStopped || (this.nextTimerStopped = !0, this.trigger(w))
                }, t.prototype.nextTimerStart = function() {
                    this.nextTimerStopped && (this.nextTimerStopped = !1, this.trigger(S))
                }, t.prototype.setSuggestions = function(t) {
                    this._suggestions = t
                }, t.prototype.pushDonation = function(t, e) {
                    this.isActiveLive() && this.trigger(A, t, e)
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
                    return !!window.VideoPlaylist && VideoPlaylist.isAutoplayEnabled()
                }, t.prototype.externalCall = function(t) {
                    try {
                        for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) i[n - 1] = arguments[n];
                        return window.videoCallback && videoCallback([t].concat(i))
                    } catch (e) {
                        this.debugLog(["error calling callback " + t, e], {
                            type: "warn"
                        })
                    }
                }, t.prototype.debugLog = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = e.type,
                        n = void 0 === i ? "log" : i,
                        r = e.force,
                        o = void 0 !== r && r;
                    if (this.isInited() && (window.__dev || o)) try {
                        var s;
                        (s = console)[n].apply(s, Ve(["%c videoplayer ", "background:#9ddcf7;"].concat(t)))
                    } catch (t) {}
                }, t.prototype.changeState = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (this.isInited() || e)
                        if (t) {
                            if (t === this.state) {
                                if (t != a.ERROR) return
                            } else this.prevState = this.state, this.state = t, t != a.ERROR && (this.errorData = null);
                            this.trigger(d, t, this.prevState)
                        } else this.debugLog("trying to change state to undefined", {
                            type: "warn"
                        })
                }, t.prototype.getState = function() {
                    return this.state
                }, t.prototype.getErrorData = function() {
                    return this.errorData || ""
                }, t.prototype.trigger = function(t) {
                    var e;
                    if (void 0 !== t) {
                        for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) n[r - 1] = arguments[r];
                        (e = this._events).emit.apply(e, [t].concat(n))
                    } else this.debugLog("trying to trigger undefined event", {
                        type: "warn"
                    })
                }, t.prototype.on = function(t, e) {
                    if (void 0 !== t) return this._events.on(t, e);
                    this.debugLog("trying to set listener to undefined event", {
                        type: "warn"
                    })
                }, t.prototype.off = function(t, e) {
                    if (void 0 !== t) return this._events.off(t, e);
                    this.debugLog("trying to unset listener from undefined event", {
                        type: "warn"
                    })
                }, t.prototype.destroy = function() {
                    this.deinitVideo(), this.trigger(c), this._events.removeAllListeners(), window.removeEventListener("resize", this._resizeHandler), Kt.a && document.removeEventListener(Kt.a.raw.fullscreenchange, this._fsChangeHandler)
                }, t.prototype.getDebugData = function() {
                    if (!this.isInited()) return "";
                    var t = [];
                    return t.push(["Video ID", this.getVideoId()]), t.push(["Content host", this.media.getContentHost()]), t.push(["Media provider", this.media.providerType() || "none"]), t.push(["Quality", this.getQuality()]), t.push(["Auto quality", this.isAutoQualityAvailable() ? this.isAutoQualityEnabled() ? "enabled" : "disabled" : null]), t.push(["Position", this.curTime()]), t.push(["Player state", this.getState()]), t.push(["Live Phase", this.getLivePhase()]), t.push(["Player size", this.getSize().join("x")]), t.push(["Module", window.Videoview ? Videoview.getVideoModule() : cur.module]), t.push(["Error code", this.media.getErrorCode()]), t.push(["Errors log", this.media.getErrorsLog()]), this.vars.live ? (t.push(["Live HLS", this.vars.hls]), t.push(["Live RTMP", this.vars.rtmp]), t.push(["Postlive MP4", this.vars.postlive_mp4])) : t.push(["Hls manifest", this.vars.hls]), t.filter(function(t) {
                        var e = Ae(t, 2);
                        e[0];
                        return null != e[1]
                    }).map(function(t) {
                        return t.join(": ")
                    }).join("\n")
                }, t.prototype.isHlsSupported = function() {
                    return window.MediaSource && MediaSource.isTypeSupported && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                }, t.prototype.isFlashSupported = function() {
                    return browser.flash >= 24
                }, t.prototype.getPreloadedQuality = function() {
                    return Re[this.getVideoId()]
                }, t.prototype.setActionButton = function(t) {
                    this.ui.actionButton.setLink(t)
                }, t.preload = function(t) {
                    var e = t.oid + "_" + t.vid;
                    if (t.hls_raw && !Re[e]) {
                        for (var i, n = [], r = {}, o = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g; i = o.exec(t.hls_raw);) {
                            var s = Ae(i, 3),
                                a = s[1],
                                l = s[2];
                            if ((a = _(a)).RESOLUTION) {
                                var u = a.RESOLUTION.split("x"),
                                    h = Ae(u, 2),
                                    c = ct(+h[0], +h[1]);
                                n.push(c), r[c] = l
                            }
                        }
                        if (n.length) {
                            var d = Math.min.apply(Math, n),
                                p = Math.max.apply(Math, n),
                                f = St.getPref("abr_quality") || 480,
                                y = Math.max(d, Math.min(f, p, 480)),
                                v = r[y];
                            if (v) {
                                var g = v.replace(/index-(.+).m3u8/, "seg-1-$1.ts");
                                pt(v), pt(g), Re[e] = y
                            }
                        }
                    }

                    function _(t) {
                        var e = {};
                        return t.split(",").forEach(function(t) {
                            var i = t.split("="),
                                n = Ae(i, 2),
                                r = n[0],
                                o = n[1];
                            e[r] = o
                        }), e
                    }
                }, t.dispatchEventFromId = function(t, e, i) {
                    var n = ge(t),
                        r = void 0;
                    if (n) {
                        try {
                            r = new Event(e)
                        } catch (t) {
                            (r = document.createEvent("Event")).initEvent(e, !1, !1)
                        }
                        n.dispatchEvent(r)
                    }
                }, xe(t, [{
                    key: "preferredVolume",
                    get: function() {
                        var t = St.getPref("volume");
                        return "number" == typeof t ? Math.min(1, Math.max(0, t)) : 1
                    },
                    set: function(t) {
                        St.savePref("volume", t)
                    }
                }, {
                    key: "preferredQuality",
                    get: function() {
                        return this.vars && this.vars.hd_def >= 0 ? dt(this.vars.hd_def) : St.getPref("quality") || 480
                    },
                    set: function(t) {
                        St.savePref("quality", t)
                    }
                }, {
                    key: "preferredSubtitleLang",
                    get: function() {
                        return St.getPref("subtitle_lang")
                    },
                    set: function(t) {
                        St.savePref("subtitle_lang", t)
                    }
                }], [{
                    key: "Events",
                    get: function() {
                        return n
                    }
                }, {
                    key: "States",
                    get: function() {
                        return a
                    }
                }, {
                    key: "LivePhases",
                    get: function() {
                        return r
                    }
                }]), t
            }(),
            Me = Ie;
        window.WeakSet && (Ie._instances = new window.WeakSet);
        var Re = {};
        window.Promise || (window.Promise = o), window.Symbol || (window.Symbol = s), window.VideoPlayer = Me;
        try {
            stManager.done("videoplayer.js")
        } catch (t) {}
    },
    ccE7: function(t, e, i) {
        var n = i("Ojgd"),
            r = i("Jes0");
        t.exports = function(t) {
            return function(e, i) {
                var o, s, a = String(r(e)),
                    l = n(i),
                    u = a.length;
                return l < 0 || l >= u ? t ? "" : void 0 : (o = a.charCodeAt(l)) < 55296 || o > 56319 || l + 1 === u || (s = a.charCodeAt(l + 1)) < 56320 || s > 57343 ? t ? a.charAt(l) : o : t ? a.slice(l, l + 2) : s - 56320 + (o - 55296 << 10) + 65536
            }
        }
    },
    eUtF: function(t, e, i) {
        t.exports = !i("jmDH") && !i("KUxP")(function() {
            return 7 != Object.defineProperty(i("Hsns")("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    eaoh: function(t, e) {
        t.exports = function(t) {
            if ("function" != typeof t) throw TypeError(t + " is not a function!");
            return t
        }
    },
    fNZA: function(t, e, i) {
        var n = i("QMMT"),
            r = i("UWiX")("iterator"),
            o = i("SBuE");
        t.exports = i("WEpk").getIteratorMethod = function(t) {
            if (void 0 != t) return t[r] || t["@@iterator"] || o[n(t)]
        }
    },
    fpC5: function(t, e, i) {
        var n = i("2faE"),
            r = i("5K7Z"),
            o = i("w6GO");
        t.exports = i("jmDH") ? Object.defineProperties : function(t, e) {
            r(t);
            for (var i, s = o(e), a = s.length, l = 0; a > l;) n.f(t, i = s[l++], e[i]);
            return t
        }
    },
    hDam: function(t, e) {
        t.exports = function() {}
    },
    j2DC: function(t, e, i) {
        "use strict";
        var n = i("oVml"),
            r = i("rr1i"),
            o = i("RfKB"),
            s = {};
        i("NegM")(s, i("UWiX")("iterator"), function() {
            return this
        }), t.exports = function(t, e, i) {
            t.prototype = n(s, {
                next: r(1, i)
            }), o(t, e + " Iterator")
        }
    },
    jmDH: function(t, e, i) {
        t.exports = !i("KUxP")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    kAMH: function(t, e, i) {
        var n = i("a0xu");
        t.exports = Array.isArray || function(t) {
            return "Array" == n(t)
        }
    },
    kTiW: function(t, e, i) {
        t.exports = i("NegM")
    },
    ls82: function(t, e, i) {
        (function(e) {
            ! function(e) {
                "use strict";
                var i, n = Object.prototype,
                    r = n.hasOwnProperty,
                    o = "function" == typeof Symbol ? Symbol : {},
                    s = o.iterator || "@@iterator",
                    a = o.asyncIterator || "@@asyncIterator",
                    l = o.toStringTag || "@@toStringTag",
                    u = "object" == typeof t,
                    h = e.regeneratorRuntime;
                if (h) u && (t.exports = h);
                else {
                    (h = e.regeneratorRuntime = u ? t.exports : {}).wrap = b;
                    var c = "suspendedStart",
                        d = "suspendedYield",
                        p = "executing",
                        f = "completed",
                        y = {},
                        v = {};
                    v[s] = function() {
                        return this
                    };
                    var g = Object.getPrototypeOf,
                        _ = g && g(g(V([])));
                    _ && _ !== n && r.call(_, s) && (v = _);
                    var m = L.prototype = S.prototype = Object.create(v);
                    k.prototype = m.constructor = L, L.constructor = k, L[l] = k.displayName = "GeneratorFunction", h.isGeneratorFunction = function(t) {
                        var e = "function" == typeof t && t.constructor;
                        return !!e && (e === k || "GeneratorFunction" === (e.displayName || e.name))
                    }, h.mark = function(t) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(t, L) : (t.__proto__ = L, l in t || (t[l] = "GeneratorFunction")), t.prototype = Object.create(m), t
                    }, h.awrap = function(t) {
                        return {
                            __await: t
                        }
                    }, T(E.prototype), E.prototype[a] = function() {
                        return this
                    }, h.AsyncIterator = E, h.async = function(t, e, i, n) {
                        var r = new E(b(t, e, i, n));
                        return h.isGeneratorFunction(e) ? r : r.next().then(function(t) {
                            return t.done ? t.value : r.next()
                        })
                    }, T(m), m[l] = "Generator", m[s] = function() {
                        return this
                    }, m.toString = function() {
                        return "[object Generator]"
                    }, h.keys = function(t) {
                        var e = [];
                        for (var i in t) e.push(i);
                        return e.reverse(),
                            function i() {
                                for (; e.length;) {
                                    var n = e.pop();
                                    if (n in t) return i.value = n, i.done = !1, i
                                }
                                return i.done = !0, i
                            }
                    }, h.values = V, x.prototype = {
                        constructor: x,
                        reset: function(t) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = i, this.done = !1, this.delegate = null, this.method = "next", this.arg = i, this.tryEntries.forEach(A), !t)
                                for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = i)
                        },
                        stop: function() {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ("throw" === t.type) throw t.arg;
                            return this.rval
                        },
                        dispatchException: function(t) {
                            if (this.done) throw t;
                            var e = this;

                            function n(n, r) {
                                return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = i), !!r
                            }
                            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                                var s = this.tryEntries[o],
                                    a = s.completion;
                                if ("root" === s.tryLoc) return n("end");
                                if (s.tryLoc <= this.prev) {
                                    var l = r.call(s, "catchLoc"),
                                        u = r.call(s, "finallyLoc");
                                    if (l && u) {
                                        if (this.prev < s.catchLoc) return n(s.catchLoc, !0);
                                        if (this.prev < s.finallyLoc) return n(s.finallyLoc)
                                    } else if (l) {
                                        if (this.prev < s.catchLoc) return n(s.catchLoc, !0)
                                    } else {
                                        if (!u) throw new Error("try statement without catch or finally");
                                        if (this.prev < s.finallyLoc) return n(s.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function(t, e) {
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var n = this.tryEntries[i];
                                if (n.tryLoc <= this.prev && r.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                    var o = n;
                                    break
                                }
                            }
                            o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                            var s = o ? o.completion : {};
                            return s.type = t, s.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, y) : this.complete(s)
                        },
                        complete: function(t, e) {
                            if ("throw" === t.type) throw t.arg;
                            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y
                        },
                        finish: function(t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var i = this.tryEntries[e];
                                if (i.finallyLoc === t) return this.complete(i.completion, i.afterLoc), A(i), y
                            }
                        },
                        catch: function(t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var i = this.tryEntries[e];
                                if (i.tryLoc === t) {
                                    var n = i.completion;
                                    if ("throw" === n.type) {
                                        var r = n.arg;
                                        A(i)
                                    }
                                    return r
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function(t, e, n) {
                            return this.delegate = {
                                iterator: V(t),
                                resultName: e,
                                nextLoc: n
                            }, "next" === this.method && (this.arg = i), y
                        }
                    }
                }

                function b(t, e, i, n) {
                    var r = e && e.prototype instanceof S ? e : S,
                        o = Object.create(r.prototype),
                        s = new x(n || []);
                    return o._invoke = function(t, e, i) {
                        var n = c;
                        return function(r, o) {
                            if (n === p) throw new Error("Generator is already running");
                            if (n === f) {
                                if ("throw" === r) throw o;
                                return I()
                            }
                            for (i.method = r, i.arg = o;;) {
                                var s = i.delegate;
                                if (s) {
                                    var a = C(s, i);
                                    if (a) {
                                        if (a === y) continue;
                                        return a
                                    }
                                }
                                if ("next" === i.method) i.sent = i._sent = i.arg;
                                else if ("throw" === i.method) {
                                    if (n === c) throw n = f, i.arg;
                                    i.dispatchException(i.arg)
                                } else "return" === i.method && i.abrupt("return", i.arg);
                                n = p;
                                var l = w(t, e, i);
                                if ("normal" === l.type) {
                                    if (n = i.done ? f : d, l.arg === y) continue;
                                    return {
                                        value: l.arg,
                                        done: i.done
                                    }
                                }
                                "throw" === l.type && (n = f, i.method = "throw", i.arg = l.arg)
                            }
                        }
                    }(t, i, s), o
                }

                function w(t, e, i) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, i)
                        }
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        }
                    }
                }

                function S() {}

                function k() {}

                function L() {}

                function T(t) {
                    ["next", "throw", "return"].forEach(function(e) {
                        t[e] = function(t) {
                            return this._invoke(e, t)
                        }
                    })
                }

                function E(t) {
                    function i(e, n, o, s) {
                        var a = w(t[e], t, n);
                        if ("throw" !== a.type) {
                            var l = a.arg,
                                u = l.value;
                            return u && "object" == typeof u && r.call(u, "__await") ? Promise.resolve(u.__await).then(function(t) {
                                i("next", t, o, s)
                            }, function(t) {
                                i("throw", t, o, s)
                            }) : Promise.resolve(u).then(function(t) {
                                l.value = t, o(l)
                            }, s)
                        }
                        s(a.arg)
                    }
                    var n;
                    "object" == typeof e.process && e.process.domain && (i = e.process.domain.bind(i)), this._invoke = function(t, e) {
                        function r() {
                            return new Promise(function(n, r) {
                                i(t, e, n, r)
                            })
                        }
                        return n = n ? n.then(r, r) : r()
                    }
                }

                function C(t, e) {
                    var n = t.iterator[e.method];
                    if (n === i) {
                        if (e.delegate = null, "throw" === e.method) {
                            if (t.iterator.return && (e.method = "return", e.arg = i, C(t, e), "throw" === e.method)) return y;
                            e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return y
                    }
                    var r = w(n, t.iterator, e.arg);
                    if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, y;
                    var o = r.arg;
                    return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = i), e.delegate = null, y) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, y)
                }

                function P(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                }

                function A(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e
                }

                function x(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], t.forEach(P, this), this.reset(!0)
                }

                function V(t) {
                    if (t) {
                        var e = t[s];
                        if (e) return e.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var n = -1,
                                o = function e() {
                                    for (; ++n < t.length;)
                                        if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                                    return e.value = i, e.done = !0, e
                                };
                            return o.next = o
                        }
                    }
                    return {
                        next: I
                    }
                }

                function I() {
                    return {
                        value: i,
                        done: !0
                    }
                }
            }("object" == typeof e ? e : "object" == typeof window ? window : "object" == typeof self ? self : this)
        }).call(this, i("yLpj"))
    },
    mqlF: function(t, e) {
        e.f = Object.getOwnPropertySymbols
    },
    oVml: function(t, e, i) {
        var n = i("5K7Z"),
            r = i("fpC5"),
            o = i("FpHa"),
            s = i("VVlx")("IE_PROTO"),
            a = function() {},
            l = function() {
                var t, e = i("Hsns")("iframe"),
                    n = o.length;
                for (e.style.display = "none", i("MvwC").appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), l = t.F; n--;) delete l.prototype[o[n]];
                return l()
            };
        t.exports = Object.create || function(t, e) {
            var i;
            return null !== t ? (a.prototype = n(t), i = new a, a.prototype = null, i[s] = t) : i = l(), void 0 === e ? i : r(i, e)
        }
    },
    oioR: function(t, e, i) {
        var n = i("2GTP"),
            r = i("sNwI"),
            o = i("NwJ3"),
            s = i("5K7Z"),
            a = i("tEej"),
            l = i("fNZA");
        t.exports = function(t, e, i, u, h) {
            var c, d, p, f = h ? function() {
                    return t
                } : l(t),
                y = n(i, u, e ? 2 : 1),
                v = 0;
            if ("function" != typeof f) throw TypeError(t + " is not iterable!");
            if (o(f))
                for (c = a(t.length); c > v; v++) e ? y(s(d = t[v])[0], d[1]) : y(t[v]);
            else
                for (p = f.call(t); !(d = p.next()).done;) r(p, y, d.value, e)
        }
    },
    q6LJ: function(t, e, i) {
        var n, r, o, s = i("5T2Y"),
            a = i("QXhf").set,
            l = s.MutationObserver || s.WebKitMutationObserver,
            u = s.process,
            h = s.Promise,
            c = "process" == i("a0xu")(u),
            d = function() {
                var t;
                for (c && (t = u.domain) && t.exit(); n;)(0, n.fn)(), n = n.next;
                r = void 0, t && t.enter()
            };
        if (c) o = function() {
            u.nextTick(d)
        };
        else if (l) {
            var p = !0,
                f = document.createTextNode("");
            new l(d).observe(f, {
                characterData: !0
            }), o = function() {
                f.data = p = !p
            }
        } else o = h && h.resolve ? function() {
            h.resolve().then(d)
        } : function() {
            a.call(s, d)
        };
        t.exports = function(t) {
            var e = {
                fn: t,
                next: void 0
            };
            r && (r.next = e), n || (n = e, o()), r = e
        }
    },
    rr1i: function(t, e) {
        t.exports = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        }
    },
    sNwI: function(t, e, i) {
        var n = i("5K7Z");
        t.exports = function(t, e, i, r) {
            try {
                return r ? e(n(i)[0], i[1]) : e(i)
            } catch (e) {
                var o = t.return;
                throw void 0 !== o && n(o.call(t)), e
            }
        }
    },
    tEej: function(t, e, i) {
        var n = i("Ojgd"),
            r = Math.min;
        t.exports = function(t) {
            return t > 0 ? r(n(t), 9007199254740991) : 0
        }
    },
    uOPS: function(t, e) {
        t.exports = !0
    },
    vwuL: function(t, e, i) {
        var n = i("NV0k"),
            r = i("rr1i"),
            o = i("NsO/"),
            s = i("G8Mo"),
            a = i("B+OT"),
            l = i("eUtF"),
            u = Object.getOwnPropertyDescriptor;
        e.f = i("jmDH") ? u : function(t, e) {
            if (t = o(t), e = s(e, !0), l) try {
                return u(t, e)
            } catch (t) {}
            if (a(t, e)) return r(!n.f.call(t, e), t[e])
        }
    },
    "w2d+": function(t, e, i) {
        "use strict";
        var n = i("hDam"),
            r = i("UO39"),
            o = i("SBuE"),
            s = i("NsO/");
        t.exports = i("MPFp")(Array, "Array", function(t, e) {
            this._t = s(t), this._i = 0, this._k = e
        }, function() {
            var t = this._t,
                e = this._k,
                i = this._i++;
            return !t || i >= t.length ? (this._t = void 0, r(1)) : r(0, "keys" == e ? i : "values" == e ? t[i] : [i, t[i]])
        }, "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries")
    },
    w6GO: function(t, e, i) {
        var n = i("5vMV"),
            r = i("FpHa");
        t.exports = Object.keys || function(t) {
            return n(t, r)
        }
    },
    wgeU: function(t, e) {}
});