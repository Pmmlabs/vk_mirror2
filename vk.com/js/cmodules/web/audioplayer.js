﻿! function(t) {
    function e(e) {
        for (var r, o, s = e[0], d = e[1], u = e[2], c = 0, l = []; c < s.length; c++) o = s[c], n[o] && l.push(n[o][0]), n[o] = 0;
        for (r in d) Object.prototype.hasOwnProperty.call(d, r) && (t[r] = d[r]);
        for (f && f(e); l.length;) l.shift()();
        return a.push.apply(a, u || []), i()
    }

    function i() {
        for (var t, e = 0; e < a.length; e++) {
            for (var i = a[e], r = !0, s = 1; s < i.length; s++) {
                var d = i[s];
                0 !== n[d] && (r = !1)
            }
            r && (a.splice(e--, 1), t = o(o.s = i[0]))
        }
        return t
    }
    var r = {},
        n = {
            "web/audioplayer": 0
        },
        a = [];

    function o(e) {
        if (r[e]) return r[e].exports;
        var i = r[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = t, o.c = r, o.d = function(t, e, i) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) o.d(i, r, function(e) {
                return t[e]
            }.bind(null, r));
        return i
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        d = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var u = 0; u < s.length; u++) e(s[u]);
    var f = d;
    a.push([59, "common"]), i()
}({
    "+qE3": function(t, e) {
        function i() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function r(t) {
            return "function" == typeof t
        }

        function n(t) {
            return "object" == typeof t && null !== t
        }

        function a(t) {
            return void 0 === t
        }
        t.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(t) {
            if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this
        }, i.prototype.emit = function(t) {
            var e, i, o, s, d, u;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
                if ((e = arguments[1]) instanceof Error) throw e;
                var f = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                throw f.context = e, f
            }
            if (a(i = this._events[t])) return !1;
            if (r(i)) switch (arguments.length) {
                case 1:
                    i.call(this);
                    break;
                case 2:
                    i.call(this, arguments[1]);
                    break;
                case 3:
                    i.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    s = Array.prototype.slice.call(arguments, 1), i.apply(this, s)
            } else if (n(i))
                for (s = Array.prototype.slice.call(arguments, 1), o = (u = i.slice()).length, d = 0; d < o; d++) u[d].apply(this, s);
            return !0
        }, i.prototype.addListener = function(t, e) {
            var o;
            if (!r(e)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? n(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, n(this._events[t]) && !this._events[t].warned && (o = a(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[t].length > o && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this
        }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(t, e) {
            if (!r(e)) throw TypeError("listener must be a function");
            var i = !1;

            function n() {
                this.removeListener(t, n), i || (i = !0, e.apply(this, arguments))
            }
            return n.listener = e, this.on(t, n), this
        }, i.prototype.removeListener = function(t, e) {
            var i, a, o, s;
            if (!r(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (o = (i = this._events[t]).length, a = -1, i === e || r(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
            else if (n(i)) {
                for (s = o; s-- > 0;)
                    if (i[s] === e || i[s].listener && i[s].listener === e) {
                        a = s;
                        break
                    }
                if (a < 0) return this;
                1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(a, 1), this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }, i.prototype.removeAllListeners = function(t) {
            var e, i;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) {
                for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (r(i = this._events[t])) this.removeListener(t, i);
            else if (i)
                for (; i.length;) this.removeListener(t, i[i.length - 1]);
            return delete this._events[t], this
        }, i.prototype.listeners = function(t) {
            return this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }, i.prototype.listenerCount = function(t) {
            if (this._events) {
                var e = this._events[t];
                if (r(e)) return 1;
                if (e) return e.length
            }
            return 0
        }, i.listenerCount = function(t, e) {
            return t.listenerCount(e)
        }
    },
    "/ab2": function(t, e, i) {
        var r = i("iUdu"),
            n = i("QihY"),
            a = i("6F8h");
        e.createCipher = e.Cipher = r.createCipher, e.createCipheriv = e.Cipheriv = r.createCipheriv, e.createDecipher = e.Decipher = n.createDecipher, e.createDecipheriv = e.Decipheriv = n.createDecipheriv, e.listCiphers = e.getCiphers = function() {
            return Object.keys(a)
        }
    },
    "/ayr": function(t, e, i) {
        var r;

        function n(t) {
            this.rand = t
        }
        if (t.exports = function(t) {
                return r || (r = new n(null)), r.generate(t)
            }, t.exports.Rand = n, n.prototype.generate = function(t) {
                return this._rand(t)
            }, n.prototype._rand = function(t) {
                if (this.rand.getBytes) return this.rand.getBytes(t);
                for (var e = new Uint8Array(t), i = 0; i < e.length; i++) e[i] = this.rand.getByte();
                return e
            }, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? n.prototype._rand = function(t) {
            var e = new Uint8Array(t);
            return self.crypto.getRandomValues(e), e
        } : self.msCrypto && self.msCrypto.getRandomValues ? n.prototype._rand = function(t) {
            var e = new Uint8Array(t);
            return self.msCrypto.getRandomValues(e), e
        } : "object" == typeof window && (n.prototype._rand = function() {
            throw new Error("Not implemented yet")
        });
        else try {
            var a = i(63);
            if ("function" != typeof a.randomBytes) throw new Error("Not supported");
            n.prototype._rand = function(t) {
                return a.randomBytes(t)
            }
        } catch (t) {}
    },
    "0XuU": function(t, e, i) {
        t.exports = i("43KI").Transform
    },
    "0cit": function(t, e, i) {
        var r = i("P7XM");

        function n(t) {
            this._reporterState = {
                obj: null,
                path: [],
                options: t || {},
                errors: []
            }
        }

        function a(t, e) {
            this.path = t, this.rethrow(e)
        }
        e.Reporter = n, n.prototype.isError = function(t) {
            return t instanceof a
        }, n.prototype.save = function() {
            var t = this._reporterState;
            return {
                obj: t.obj,
                pathLen: t.path.length
            }
        }, n.prototype.restore = function(t) {
            var e = this._reporterState;
            e.obj = t.obj, e.path = e.path.slice(0, t.pathLen)
        }, n.prototype.enterKey = function(t) {
            return this._reporterState.path.push(t)
        }, n.prototype.exitKey = function(t) {
            var e = this._reporterState;
            e.path = e.path.slice(0, t - 1)
        }, n.prototype.leaveKey = function(t, e, i) {
            var r = this._reporterState;
            this.exitKey(t), null !== r.obj && (r.obj[e] = i)
        }, n.prototype.path = function() {
            return this._reporterState.path.join("/")
        }, n.prototype.enterObject = function() {
            var t = this._reporterState,
                e = t.obj;
            return t.obj = {}, e
        }, n.prototype.leaveObject = function(t) {
            var e = this._reporterState,
                i = e.obj;
            return e.obj = t, i
        }, n.prototype.error = function(t) {
            var e, i = this._reporterState,
                r = t instanceof a;
            if (e = r ? t : new a(i.path.map(function(t) {
                    return "[" + JSON.stringify(t) + "]"
                }).join(""), t.message || t, t.stack), !i.options.partial) throw e;
            return r || i.errors.push(e), e
        }, n.prototype.wrapResult = function(t) {
            var e = this._reporterState;
            return e.options.partial ? {
                result: this.isError(t) ? null : t,
                errors: e.errors
            } : t
        }, r(a, Error), a.prototype.rethrow = function(t) {
            if (this.message = t + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, a), !this.stack) try {
                throw new Error(this.message)
            } catch (t) {
                this.stack = t.stack
            }
            return this
        }
    },
    "1CSz": function(t, e, i) {
        "use strict";
        var r = i("P7XM"),
            n = i("hwdV").Buffer,
            a = i("ZDAU"),
            o = n.alloc(128),
            s = 64;

        function d(t, e) {
            a.call(this, "digest"), "string" == typeof e && (e = n.from(e)), this._alg = t, this._key = e, e.length > s ? e = t(e) : e.length < s && (e = n.concat([e, o], s));
            for (var i = this._ipad = n.allocUnsafe(s), r = this._opad = n.allocUnsafe(s), d = 0; d < s; d++) i[d] = 54 ^ e[d], r[d] = 92 ^ e[d];
            this._hash = [i]
        }
        r(d, a), d.prototype._update = function(t) {
            this._hash.push(t)
        }, d.prototype._final = function() {
            var t = this._alg(n.concat(this._hash));
            return this._alg(n.concat([this._opad, t]))
        }, t.exports = d
    },
    "1IWx": function(t, e, i) {
        t.exports = n;
        var r = i("+qE3").EventEmitter;

        function n() {
            r.call(this)
        }
        i("P7XM")(n, r), n.Readable = i("43KI"), n.Writable = i("LGOv"), n.Duplex = i("CWBI"), n.Transform = i("0XuU"), n.PassThrough = i("wq4j"), n.Stream = n, n.prototype.pipe = function(t, e) {
            var i = this;

            function n(e) {
                t.writable && !1 === t.write(e) && i.pause && i.pause()
            }

            function a() {
                i.readable && i.resume && i.resume()
            }
            i.on("data", n), t.on("drain", a), t._isStdio || e && !1 === e.end || (i.on("end", s), i.on("close", d));
            var o = !1;

            function s() {
                o || (o = !0, t.end())
            }

            function d() {
                o || (o = !0, "function" == typeof t.destroy && t.destroy())
            }

            function u(t) {
                if (f(), 0 === r.listenerCount(this, "error")) throw t
            }

            function f() {
                i.removeListener("data", n), t.removeListener("drain", a), i.removeListener("end", s), i.removeListener("close", d), i.removeListener("error", u), t.removeListener("error", u), i.removeListener("end", f), i.removeListener("close", f), t.removeListener("close", f)
            }
            return i.on("error", u), t.on("error", u), i.on("end", f), i.on("close", f), t.on("close", f), t.emit("pipe", i), t
        }
    },
    "1w4i": function(t) {
        t.exports = {
            "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
            "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
            "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
            "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
            "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
            "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
            "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
            "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
            "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
            "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
            "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
            "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
        }
    },
    "2j6C": function(t, e) {
        function i(t, e) {
            if (!t) throw new Error(e || "Assertion failed")
        }
        t.exports = i, i.equal = function(t, e, i) {
            if (t != e) throw new Error(i || "Assertion failed: " + t + " != " + e)
        }
    },
    "3BRs": function(t, e, i) {
        "use strict";
        (function(e, r, n) {
            var a = i("acAU");

            function o(t) {
                var e = this;
                this.next = null, this.entry = null, this.finish = function() {
                    ! function(t, e, i) {
                        var r = t.entry;
                        t.entry = null;
                        for (; r;) {
                            var n = r.callback;
                            e.pendingcb--, n(i), r = r.next
                        }
                        e.corkedRequestsFree ? e.corkedRequestsFree.next = t : e.corkedRequestsFree = t
                    }(e, t)
                }
            }
            t.exports = g;
            var s, d = !e.browser && ["v0.10", "v0.9."].indexOf(e.version.slice(0, 5)) > -1 ? r : a.nextTick;
            g.WritableState = b;
            var u = i("Onz0");
            u.inherits = i("P7XM");
            var f = {
                    deprecate: i("t9FE")
                },
                c = i("QpuX"),
                l = i("hwdV").Buffer,
                h = n.Uint8Array || function() {};
            var p, _ = i("RoFp");

            function y() {}

            function b(t, e) {
                s = s || i("sZro"), t = t || {};
                var r = e instanceof s;
                this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.writableObjectMode);
                var n = t.highWaterMark,
                    u = t.writableHighWaterMark,
                    f = this.objectMode ? 16 : 16384;
                this.highWaterMark = n || 0 === n ? n : r && (u || 0 === u) ? u : f, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                var c = !1 === t.decodeStrings;
                this.decodeStrings = !c, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
                    ! function(t, e) {
                        var i = t._writableState,
                            r = i.sync,
                            n = i.writecb;
                        if (function(t) {
                                t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
                            }(i), e) ! function(t, e, i, r, n) {
                            --e.pendingcb, i ? (a.nextTick(n, r), a.nextTick(P, t, e), t._writableState.errorEmitted = !0, t.emit("error", r)) : (n(r), t._writableState.errorEmitted = !0, t.emit("error", r), P(t, e))
                        }(t, i, r, e, n);
                        else {
                            var o = w(i);
                            o || i.corked || i.bufferProcessing || !i.bufferedRequest || A(t, i), r ? d(m, t, i, o, n) : m(t, i, o, n)
                        }
                    }(e, t)
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this)
            }

            function g(t) {
                if (s = s || i("sZro"), !(p.call(g, this) || this instanceof s)) return new g(t);
                this._writableState = new b(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), c.call(this)
            }

            function v(t, e, i, r, n, a, o) {
                e.writelen = r, e.writecb = o, e.writing = !0, e.sync = !0, i ? t._writev(n, e.onwrite) : t._write(n, a, e.onwrite), e.sync = !1
            }

            function m(t, e, i, r) {
                i || function(t, e) {
                    0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
                }(t, e), e.pendingcb--, r(), P(t, e)
            }

            function A(t, e) {
                e.bufferProcessing = !0;
                var i = e.bufferedRequest;
                if (t._writev && i && i.next) {
                    var r = e.bufferedRequestCount,
                        n = new Array(r),
                        a = e.corkedRequestsFree;
                    a.entry = i;
                    for (var s = 0, d = !0; i;) n[s] = i, i.isBuf || (d = !1), i = i.next, s += 1;
                    n.allBuffers = d, v(t, e, !0, e.length, n, "", a.finish), e.pendingcb++, e.lastBufferedRequest = null, a.next ? (e.corkedRequestsFree = a.next, a.next = null) : e.corkedRequestsFree = new o(e), e.bufferedRequestCount = 0
                } else {
                    for (; i;) {
                        var u = i.chunk,
                            f = i.encoding,
                            c = i.callback;
                        if (v(t, e, !1, e.objectMode ? 1 : u.length, u, f, c), i = i.next, e.bufferedRequestCount--, e.writing) break
                    }
                    null === i && (e.lastBufferedRequest = null)
                }
                e.bufferedRequest = i, e.bufferProcessing = !1
            }

            function w(t) {
                return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing
            }

            function E(t, e) {
                t._final(function(i) {
                    e.pendingcb--, i && t.emit("error", i), e.prefinished = !0, t.emit("prefinish"), P(t, e)
                })
            }

            function P(t, e) {
                var i = w(e);
                return i && (! function(t, e) {
                    e.prefinished || e.finalCalled || ("function" == typeof t._final ? (e.pendingcb++, e.finalCalled = !0, a.nextTick(E, t, e)) : (e.prefinished = !0, t.emit("prefinish")))
                }(t, e), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"))), i
            }
            u.inherits(g, c), b.prototype.getBuffer = function() {
                    for (var t = this.bufferedRequest, e = []; t;) e.push(t), t = t.next;
                    return e
                },
                function() {
                    try {
                        Object.defineProperty(b.prototype, "buffer", {
                            get: f.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (t) {}
                }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (p = Function.prototype[Symbol.hasInstance], Object.defineProperty(g, Symbol.hasInstance, {
                    value: function(t) {
                        return !!p.call(this, t) || this === g && (t && t._writableState instanceof b)
                    }
                })) : p = function(t) {
                    return t instanceof this
                }, g.prototype.pipe = function() {
                    this.emit("error", new Error("Cannot pipe, not readable"))
                }, g.prototype.write = function(t, e, i) {
                    var r, n = this._writableState,
                        o = !1,
                        s = !n.objectMode && (r = t, l.isBuffer(r) || r instanceof h);
                    return s && !l.isBuffer(t) && (t = function(t) {
                        return l.from(t)
                    }(t)), "function" == typeof e && (i = e, e = null), s ? e = "buffer" : e || (e = n.defaultEncoding), "function" != typeof i && (i = y), n.ended ? function(t, e) {
                        var i = new Error("write after end");
                        t.emit("error", i), a.nextTick(e, i)
                    }(this, i) : (s || function(t, e, i, r) {
                        var n = !0,
                            o = !1;
                        return null === i ? o = new TypeError("May not write null values to stream") : "string" == typeof i || void 0 === i || e.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")), o && (t.emit("error", o), a.nextTick(r, o), n = !1), n
                    }(this, n, t, i)) && (n.pendingcb++, o = function(t, e, i, r, n, a) {
                        if (!i) {
                            var o = function(t, e, i) {
                                t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = l.from(e, i));
                                return e
                            }(e, r, n);
                            r !== o && (i = !0, n = "buffer", r = o)
                        }
                        var s = e.objectMode ? 1 : r.length;
                        e.length += s;
                        var d = e.length < e.highWaterMark;
                        d || (e.needDrain = !0);
                        if (e.writing || e.corked) {
                            var u = e.lastBufferedRequest;
                            e.lastBufferedRequest = {
                                chunk: r,
                                encoding: n,
                                isBuf: i,
                                callback: a,
                                next: null
                            }, u ? u.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1
                        } else v(t, e, !1, s, r, n, a);
                        return d
                    }(this, n, s, t, e, i)), o
                }, g.prototype.cork = function() {
                    this._writableState.corked++
                }, g.prototype.uncork = function() {
                    var t = this._writableState;
                    t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || A(this, t))
                }, g.prototype.setDefaultEncoding = function(t) {
                    if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
                    return this._writableState.defaultEncoding = t, this
                }, Object.defineProperty(g.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }), g.prototype._write = function(t, e, i) {
                    i(new Error("_write() is not implemented"))
                }, g.prototype._writev = null, g.prototype.end = function(t, e, i) {
                    var r = this._writableState;
                    "function" == typeof t ? (i = t, t = null, e = null) : "function" == typeof e && (i = e, e = null), null !== t && void 0 !== t && this.write(t, e), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || function(t, e, i) {
                        e.ending = !0, P(t, e), i && (e.finished ? a.nextTick(i) : t.once("finish", i));
                        e.ended = !0, t.writable = !1
                    }(this, r, i)
                }, Object.defineProperty(g.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(t) {
                        this._writableState && (this._writableState.destroyed = t)
                    }
                }), g.prototype.destroy = _.destroy, g.prototype._undestroy = _.undestroy, g.prototype._destroy = function(t, e) {
                    this.end(), e(t)
                }
        }).call(this, i("8oxB"), i("URgk").setImmediate, i("yLpj"))
    },
    "43KI": function(t, e, i) {
        (e = t.exports = i("rXFu")).Stream = e, e.Readable = e, e.Writable = i("3BRs"), e.Duplex = i("sZro"), e.Transform = i("J78i"), e.PassThrough = i("eA/Y")
    },
    "49sm": function(t, e) {
        var i = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == i.call(t)
        }
    },
    "4Hv8": function(t, e, i) {
        var r = i("WnY+"),
            n = i("tcrS"),
            a = i("afKu"),
            o = i("fSpj"),
            s = i("n53Y"),
            d = i("hwdV").Buffer,
            u = d.alloc(128),
            f = {
                md5: 16,
                sha1: 20,
                sha224: 28,
                sha256: 32,
                sha384: 48,
                sha512: 64,
                rmd160: 20,
                ripemd160: 20
            };

        function c(t, e, i) {
            var o = function(t) {
                    return "rmd160" === t || "ripemd160" === t ? n : "md5" === t ? r : function(e) {
                        return a(t).update(e).digest()
                    }
                }(t),
                s = "sha512" === t || "sha384" === t ? 128 : 64;
            e.length > s ? e = o(e) : e.length < s && (e = d.concat([e, u], s));
            for (var c = d.allocUnsafe(s + f[t]), l = d.allocUnsafe(s + f[t]), h = 0; h < s; h++) c[h] = 54 ^ e[h], l[h] = 92 ^ e[h];
            var p = d.allocUnsafe(s + i + 4);
            c.copy(p, 0, 0, s), this.ipad1 = p, this.ipad2 = c, this.opad = l, this.alg = t, this.blocksize = s, this.hash = o, this.size = f[t]
        }
        c.prototype.run = function(t, e) {
            return t.copy(e, this.blocksize), this.hash(e).copy(this.opad, this.blocksize), this.hash(this.opad)
        }, t.exports = function(t, e, i, r, n) {
            o(t, e, i, r), d.isBuffer(t) || (t = d.from(t, s)), d.isBuffer(e) || (e = d.from(e, s));
            var a = new c(n = n || "sha1", t, e.length),
                u = d.allocUnsafe(r),
                l = d.allocUnsafe(e.length + 4);
            e.copy(l, 0, 0, e.length);
            for (var h = 0, p = f[n], _ = Math.ceil(r / p), y = 1; y <= _; y++) {
                l.writeUInt32BE(y, e.length);
                for (var b = a.run(l, a.ipad1), g = b, v = 1; v < i; v++) {
                    g = a.run(g, a.ipad2);
                    for (var m = 0; m < p; m++) b[m] ^= g[m]
                }
                b.copy(u, h), h += p
            }
            return u
        }
    },
    "4bNW": function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return onRowOver
        });
        var _slicedToArray = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var i = [],
                        r = !0,
                        n = !1,
                        a = void 0;
                    try {
                        for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (i.push(o.value), !e || i.length !== e); r = !0);
                    } catch (t) {
                        n = !0, a = t
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw a
                        }
                    }
                    return i
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

        function onRowOver(audioEl, event, forceRedraw) {
            var _this = this;
            hasClass(audioEl, "podcast_list_snippet") || hasClass(audioEl, "podcast_snippet__controls") || (data(audioEl, "leaved", !1), data(audioEl, "actions") && !forceRedraw || hasClass(audioEl, "no_extra") || (clearTimeout(window.audioRowHoverTO), window.audioRowHoverTO = setTimeout(function() {
                var audio = AudioUtils.getAudioFromEl(audioEl),
                    audioObject = AudioUtils.getAudioFromEl(audioEl, !0),
                    actions = [],
                    moreActions = [],
                    context = AudioUtils.getContextPlaylist(audioEl, !0),
                    _AudioUtils$contextSp = AudioUtils.contextSplit(context),
                    _AudioUtils$contextSp2 = _slicedToArray(_AudioUtils$contextSp, 1),
                    contextSection = _AudioUtils$contextSp2[0],
                    extra = AudioUtils.getAudioExtra(audioObject);
                if (audioObject.isDeleted)
                    if (AudioUtils.isPodcast(audioObject)) actions.push(["add", AudioUtils.restoreEpisode, "", 'onmouseover="audioShowActionTooltip(this)"']);
                    else if ("recoms_recoms" == contextSection) actions.push(["restore_recoms", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                else {
                    var deleteRestoreInfo = AudioUtils.getAddRestoreInfo();
                    deleteRestoreInfo[audioObject.fullId] && deleteRestoreInfo[audioObject.fullId].deleteAll && actions.push(["delete", AudioUtils.deleteAudio, "", 'onmouseover="audioShowActionTooltip(this)"']), actions.push(["add", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"'])
                } else {
                    var actionsList = ["next", "add", "share", "open_album", "add_to_playlist"];
                    if (extra.claim && nav.objLoc.claim || audioObject.isReplaceable) actionsList = [];
                    else if (AudioUtils.isPodcast(audioObject)) actionsList = hasClass(audioEl, "audio_podcast_no_actions") ? [] : ["fave", "edit", "delete", "open_episode", "share"];
                    else if (audioObject.isFromCurrentPlaylist) actionsList = ["recoms", "add", !audioObject.isCurrent && "current_delete", "share", "open_album", "add_to_playlist"];
                    else if (audioObject.isInSnippet) actionsList = ["recoms", "next", "edit", "add", "share", "open_album", "add_to_playlist"];
                    else if (audioObject.isInEditBox) actionsList = [];
                    else if (audioObject.isInFastChat) actionsList = ["add"];
                    else if (vk.widget) actionsList = vk.id ? ["add"] : [];
                    else if (contextSection) switch (contextSection) {
                        case "my":
                        case "search_owned_audios":
                        case "user_list":
                        case "group_list":
                            actionsList = ["recoms", "edit", "next", "add", "delete", "share", "open_album", "add_to_playlist"];
                            break;
                        case "edit_playlist":
                            actionsList = ["add", "next", "edit"];
                            break;
                        case "recoms_recoms":
                            actionsList = ["recoms", "next", "add", "recoms_delete", "share", "open_album", "add_to_playlist"];
                            break;
                        case "recoms_recent_audios":
                            actionsList = ["recoms", "edit", "next", "add", "listened_delete", "share", "open_album", "add_to_playlist"];
                            break;
                        case "module":
                            actionsList = [];
                            break;
                        case "attach":
                        case "attach_preview":
                        case "podcast":
                            actionsList = [];
                            break;
                        default:
                            audioObject.isCurrent && audioObject.withInlinePlayer && (actionsList = ["recoms", "add", "share", "open_album", "add_to_playlist"])
                    }
                    actionsList.push("uma"), audioObject.isReplaceable && actionsList.push("replace"), extra.moder_actions && each(extra.moder_actions, function(i, act) {
                        moreActions.push(["moder_" + i, function(audioEl, audio) {
                            eval(act[1])
                        }, act[2]])
                    });
                    var ap = getAudioPlayer();
                    each(actionsList, function(t, e) {
                        switch (e) {
                            case "next":
                                audioObject.isCurrent || audioObject.isClaimed || AudioUtils.isPodcast(audioObject) || actions.push(["next", ap.setNext.bind(ap), "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "restore_recoms":
                                actions.push(["restore_recoms", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "add":
                                var i = vk.id;
                                cur.audioPage && cur.audioPage.canAddToGroup() && (i = cur.audioPage.getOwnerId()), !audioObject.isClaimed && audioObject.canAdd && audioObject.ownerId != i && actions.push(["add", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "recoms":
                                !audioObject.isClaimed && cur.audioPage && actions.push(["recoms", AudioUtils.showRecoms, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "uma":
                                audioObject.isUMA && actions.push(["uma", AudioUtils.getUMAInfo, "UMA"]);
                                break;
                            case "replace":
                                audioObject.isReplaceable && actions.push(["replace", function() {
                                    showAudioClaimWarning(audioObject, extra.claim, AudioUtils.replaceWithOriginal.bind(AudioUtils, audioEl, audioObject))
                                }, getLang("global_audio_replace")]);
                                break;
                            case "edit":
                                audioObject.canEdit && !vk.widget && (AudioUtils.isPodcast(audioObject) || inArray(contextSection, ["my", "group_list", "search_owned_audios"])) && actions.push(["edit", AudioUtils.isPodcast(audioObject) ? AudioUtils.editEpisode : AudioUtils.editAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "delete":
                                !audioObject.canDelete || audioObject.isInRecomsBlock || vk.widget || actions.push(["delete", AudioUtils.isPodcast(audioObject) ? AudioUtils.deleteEpisode : AudioUtils.deleteAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "current_delete":
                                actions.push(["current_delete", AudioUtils.deleteCurrentAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "recoms_delete":
                                audioObject.isInRecomsBlock || actions.push(["recoms_delete", AudioUtils.deleteRecomsAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "listened_delete":
                                audioObject.isInRecomsBlock || actions.push(["listened_delete", AudioUtils.deleteListenedAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "fave":
                                AudioUtils.isPodcast(audioObject) && actions.push(["fave", AudioUtils.faveEpisode, "", 'onmouseover="audioShowActionTooltip(this)"', AudioUtils.getAudioExtra(audioObject).fave ? " activated" : ""]);
                                break;
                            case "share":
                                audioObject.isClaimed || moreActions.push(["share", AudioUtils.shareAudio, getLang("audio_share_audio")]);
                                break;
                            case "add_to_playlist":
                                audioObject.isClaimed || cur.viewAsBox || moreActions.push(["add_to_playlist", "", getLang("audio_add_to_playlist")]);
                                break;
                            case "open_album":
                                audioObject.album && moreActions.push(["open_album", AudioUtils.showAudioAlbum, getLang("audio_open_album")]);
                                break;
                            case "open_episode":
                                AudioUtils.isPodcast(audioObject) && moreActions.push(["open_episode", AudioUtils.openEpisode, getLang("audio_podcast_open_episode")])
                        }
                    }), extra.claim && nav.objLoc.claim && (audioObject.isSetClaimed ? actions.push(["claim_btn", AudioUtils.unclaim.bind(_this, audio, audioEl, extra.claim), "Unclaim"]) : actions.push(["claim_btn", AudioUtils.claim.bind(_this, audio, audioEl, extra.claim), "Claim"]))
                }
                if (moreActions.length && actions.push(["more"]), actions.length) {
                    var actionsEl = se('<div class="_audio_row__actions audio_row__actions"></div>');
                    each(actions, function(t, e) {
                        var i = AudioUtils.getRowActionName(e[0], audioObject, audioEl),
                            r = se('<button aria-label="' + i + '" data-action="' + e[0] + '" class="audio_row__action audio_row__action_' + e[0] + " _audio_row__action_" + e[0] + (e[4] || "") + '" ' + (e[3] || "") + ">" + (e[2] || "") + "</button>");
                        r.addEventListener("click", function(t) {
                            return e[1] && e[1].call(window, audioEl, audioObject, audio), cancelEvent(t)
                        }), actionsEl.appendChild(r)
                    });
                    var rowInfoEl = geByClass1("_audio_row__info", audioEl),
                        rowDurationEl = geByClass1("_audio_row__duration", audioEl),
                        rowAlreadyActionsEl = geByClass1("_audio_row__actions", audioEl);
                    if (!rowInfoEl) return;
                    re(rowAlreadyActionsEl), setStyle(rowDurationEl, "visibility", "hidden"), rowInfoEl.appendChild(actionsEl);
                    var moreActionsBtnEl = geByClass1("_audio_row__action_more", actionsEl);
                    if (moreActions.length && moreActionsBtnEl) {
                        var classicImEl = gpeByClass("im-page_classic", audioEl),
                            imWEl = gpeByClass("_im_peer_history_w", audioEl),
                            imEl = gpeByClass("_im_peer_history", audioEl),
                            imWrapEl = gpeByClass("_im_chat_body_abs", audioEl),
                            moreActionsContentEls = se('<div class="_audio_row__more_actions audio_row__more_actions"></div>'),
                            extendedOptions = imEl ? {
                                getWrapEl: function() {
                                    return classicImEl ? null : imWrapEl
                                },
                                appendTo: imEl
                            } : {
                                appendToParent: !0
                            },
                            tooltipGap = 150,
                            moreTooltip = new ElementTooltip(moreActionsBtnEl, extend({
                                cls: "_audio_row__tt",
                                defaultSide: "bottom",
                                rightShift: 20,
                                content: moreActionsContentEls,
                                bottomGap: classicImEl && imWEl ? parseInt(getStyle(imWEl, "border-bottom-width")) + 30 + tooltipGap : tooltipGap,
                                preventSideChange: !0,
                                autoShow: !0,
                                onFirstTimeShow: function(t, e) {
                                    domData(e, "nodrag", 1), setTimeout(function() {
                                        this.getOptions().bottomGap = 0
                                    }.bind(this))
                                },
                                onHide: function() {
                                    data(audioEl, "leaved") && AudioUtils.onRowLeave(audioEl)
                                }
                            }, extendedOptions));
                        each(moreActions, function(t, e) {
                            var i = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, e));
                            if ("add_to_playlist" == e[0]) {
                                var r = void 0,
                                    n = void 0;
                                i.addEventListener("mouseenter", r = function() {
                                    clearTimeout(n), n = setTimeout(function() {
                                        i.removeEventListener("mouseenter", r), AudioUtils.initRowPlaylistsChooser(audio, i, moreTooltip)
                                    }, 150)
                                }), i.addEventListener("mouseleave", function() {
                                    clearTimeout(n)
                                })
                            } else i.addEventListener("click", function(t) {
                                return e[1].call(window, audioEl, audioObject), cancelEvent(t)
                            });
                            moreActionsContentEls.appendChild(i)
                        }), data(audioEl, "tt", moreTooltip)
                    }
                    data(audioEl, "actions", 1)
                }
            }, forceRedraw ? 0 : 10)))
        }
    },
    "4dMO": function(t, e, i) {
        (function(e) {
            var r = i("MzeL"),
                n = i("OZ/i");
            t.exports = function(t) {
                return new o(t)
            };
            var a = {
                secp256k1: {
                    name: "secp256k1",
                    byteLength: 32
                },
                secp224r1: {
                    name: "p224",
                    byteLength: 28
                },
                prime256v1: {
                    name: "p256",
                    byteLength: 32
                },
                prime192v1: {
                    name: "p192",
                    byteLength: 24
                },
                ed25519: {
                    name: "ed25519",
                    byteLength: 32
                },
                secp384r1: {
                    name: "p384",
                    byteLength: 48
                },
                secp521r1: {
                    name: "p521",
                    byteLength: 66
                }
            };

            function o(t) {
                this.curveType = a[t], this.curveType || (this.curveType = {
                    name: t
                }), this.curve = new r.ec(this.curveType.name), this.keys = void 0
            }

            function s(t, i, r) {
                Array.isArray(t) || (t = t.toArray());
                var n = new e(t);
                if (r && n.length < r) {
                    var a = new e(r - n.length);
                    a.fill(0), n = e.concat([a, n])
                }
                return i ? n.toString(i) : n
            }
            a.p224 = a.secp224r1, a.p256 = a.secp256r1 = a.prime256v1, a.p192 = a.secp192r1 = a.prime192v1, a.p384 = a.secp384r1, a.p521 = a.secp521r1, o.prototype.generateKeys = function(t, e) {
                return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, e)
            }, o.prototype.computeSecret = function(t, i, r) {
                return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), s(this.curve.keyFromPublic(t).getPublic().mul(this.keys.getPrivate()).getX(), r, this.curveType.byteLength)
            }, o.prototype.getPublicKey = function(t, e) {
                var i = this.keys.getPublic("compressed" === e, !0);
                return "hybrid" === e && (i[i.length - 1] % 2 ? i[0] = 7 : i[0] = 6), s(i, t)
            }, o.prototype.getPrivateKey = function(t) {
                return s(this.keys.getPrivate(), t)
            }, o.prototype.setPublicKey = function(t, i) {
                return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this.keys._importPublic(t), this
            }, o.prototype.setPrivateKey = function(t, i) {
                i = i || "utf8", e.isBuffer(t) || (t = new e(t, i));
                var r = new n(t);
                return r = r.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(r), this
            }
        }).call(this, i("tjlA").Buffer)
    },
    "4e3S": function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("98sY");

        function _classCallCheck(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var AudioLayer = function() {
            function AudioLayer() {
                _classCallCheck(this, AudioLayer), this._els = {
                    layerPlace: ge("top_audio_layer_place"),
                    topPlayBtn: geByClass1("_top_audio_player_play"),
                    topNotaBtn: geByClass1("_top_nav_audio_btn"),
                    topNotaBtnGroup: ge("top_audio_btn_group")
                }
            }
            return AudioLayer.prepare = function(t) {
                stManager.add(["audio.js", "audioplayer.js", "audio.css", "suggester.js", "auto_list.js", "indexer.js"], function() {
                    t && t()
                })
            }, AudioLayer.prototype.toggle = function(t, e) {
                var i = this;
                this._initTooltip();
                var r = this._els.tooltip,
                    n = void 0 !== t ? t : !r.isShown();
                n ? (r.show(), cancelStackPush("top_audio", function() {
                    i.toggle(!1, !0)
                }, !0)) : (e || cancelStackPop(), r.hide()), toggleClass(this._els.topNotaBtn, "active", n)
            }, AudioLayer.prototype.hide = function() {
                this._els.tooltip.hide()
            }, AudioLayer.prototype.isShown = function() {
                return this._els.tooltip && this._els.tooltip.isShown()
            }, AudioLayer.prototype.updatePosition = function() {
                return this._els.tooltip && this._els.tooltip.updatePosition()
            }, AudioLayer.prototype._layerPosition = function() {
                var t = getXY(this._els.layerPlace),
                    e = getXY("ts_wrap")[0] - t[0] - 1,
                    i = 0;
                isVisible(this._els.topNotaBtnGroup) ? i = -e + (getXY(this._els.topNotaBtn)[0] - t[0]) + 15 : i = -e + (getXY(this._els.topPlayBtn)[0] - t[0]) + 3;
                return {
                    left: e,
                    top: 0,
                    arrowPosition: i
                }
            }, AudioLayer.prototype.getPageInstance = function() {
                return this._page
            }, AudioLayer.prototype.getTemplate = function() {
                return '\n      <div class="audio_layer_container">\n        <div class="top_audio_loading">\n          ' + rs(vk.pr_tpl, {
                    id: "",
                    cls: "pr_big"
                }) + "\n        </div>\n      </div>\n    "
            }, AudioLayer.prototype._initTooltip = function _initTooltip() {
                var _this2 = this;
                this._els.tooltip || (this._els.container = se(this.getTemplate()), this._els.tooltip = new ElementTooltip(this._els.layerPlace, {
                    id: "audio_layer_tt",
                    content: this._els.container,
                    width: 660,
                    offset: [22, 5],
                    autoShow: !1,
                    customShow: !0,
                    setPos: this._layerPosition.bind(this),
                    forceSide: "bottom",
                    onHide: function() {
                        _this2._page && _this2._page.onLayerHide()
                    },
                    onShow: function() {
                        _this2._page && _this2._page.onLayerShow(_this2._initSection)
                    }
                }), ajax.post("al_audio.php", {
                    act: "layer",
                    is_layer: 1,
                    is_current_playlist: ap.getCurrentPlaylist() ? 1 : 0
                }, {
                    onDone: function onDone(html, data, templatesScript) {
                        try {
                            eval(templatesScript)
                        } catch (t) {
                            Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.d)(t, templatesScript)
                        }
                        _this2._els.container.innerHTML = html, _this2._page = new AudioPage(geByClass1("_audio_page_layout", _this2._els.container), data), _this2._initSection = "recoms" == data.initSection ? data.initSection : void 0, _this2._page.onLayerShow(_this2._initSection)
                    }
                }))
            }, AudioLayer
        }();
        __webpack_exports__.a = AudioLayer
    },
    59: function(t, e, i) {
        t.exports = i("cul0")
    },
    60: function(t, e) {},
    61: function(t, e) {},
    62: function(t, e) {},
    63: function(t, e) {},
    "6F8h": function(t) {
        t.exports = {
            "aes-128-ecb": {
                cipher: "AES",
                key: 128,
                iv: 0,
                mode: "ECB",
                type: "block"
            },
            "aes-192-ecb": {
                cipher: "AES",
                key: 192,
                iv: 0,
                mode: "ECB",
                type: "block"
            },
            "aes-256-ecb": {
                cipher: "AES",
                key: 256,
                iv: 0,
                mode: "ECB",
                type: "block"
            },
            "aes-128-cbc": {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "CBC",
                type: "block"
            },
            "aes-192-cbc": {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "CBC",
                type: "block"
            },
            "aes-256-cbc": {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "CBC",
                type: "block"
            },
            aes128: {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "CBC",
                type: "block"
            },
            aes192: {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "CBC",
                type: "block"
            },
            aes256: {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "CBC",
                type: "block"
            },
            "aes-128-cfb": {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "CFB",
                type: "stream"
            },
            "aes-192-cfb": {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "CFB",
                type: "stream"
            },
            "aes-256-cfb": {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "CFB",
                type: "stream"
            },
            "aes-128-cfb8": {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "CFB8",
                type: "stream"
            },
            "aes-192-cfb8": {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "CFB8",
                type: "stream"
            },
            "aes-256-cfb8": {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "CFB8",
                type: "stream"
            },
            "aes-128-cfb1": {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "CFB1",
                type: "stream"
            },
            "aes-192-cfb1": {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "CFB1",
                type: "stream"
            },
            "aes-256-cfb1": {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "CFB1",
                type: "stream"
            },
            "aes-128-ofb": {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "OFB",
                type: "stream"
            },
            "aes-192-ofb": {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "OFB",
                type: "stream"
            },
            "aes-256-ofb": {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "OFB",
                type: "stream"
            },
            "aes-128-ctr": {
                cipher: "AES",
                key: 128,
                iv: 16,
                mode: "CTR",
                type: "stream"
            },
            "aes-192-ctr": {
                cipher: "AES",
                key: 192,
                iv: 16,
                mode: "CTR",
                type: "stream"
            },
            "aes-256-ctr": {
                cipher: "AES",
                key: 256,
                iv: 16,
                mode: "CTR",
                type: "stream"
            },
            "aes-128-gcm": {
                cipher: "AES",
                key: 128,
                iv: 12,
                mode: "GCM",
                type: "auth"
            },
            "aes-192-gcm": {
                cipher: "AES",
                key: 192,
                iv: 12,
                mode: "GCM",
                type: "auth"
            },
            "aes-256-gcm": {
                cipher: "AES",
                key: 256,
                iv: 12,
                mode: "GCM",
                type: "auth"
            }
        }
    },
    "6lN/": function(t, e, i) {
        "use strict";
        var r = i("OZ/i"),
            n = i("MzeL").utils,
            a = n.getNAF,
            o = n.getJSF,
            s = n.assert;

        function d(t, e) {
            this.type = t, this.p = new r(e.p, 16), this.red = e.prime ? r.red(e.prime) : r.mont(this.p), this.zero = new r(0).toRed(this.red), this.one = new r(1).toRed(this.red), this.two = new r(2).toRed(this.red), this.n = e.n && new r(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4);
            var i = this.n && this.p.div(this.n);
            !i || i.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
        }

        function u(t, e) {
            this.curve = t, this.type = e, this.precomputed = null
        }
        t.exports = d, d.prototype.point = function() {
            throw new Error("Not implemented")
        }, d.prototype.validate = function() {
            throw new Error("Not implemented")
        }, d.prototype._fixedNafMul = function(t, e) {
            s(t.precomputed);
            var i = t._getDoubles(),
                r = a(e, 1),
                n = (1 << i.step + 1) - (i.step % 2 == 0 ? 2 : 1);
            n /= 3;
            for (var o = [], d = 0; d < r.length; d += i.step) {
                var u = 0;
                for (e = d + i.step - 1; e >= d; e--) u = (u << 1) + r[e];
                o.push(u)
            }
            for (var f = this.jpoint(null, null, null), c = this.jpoint(null, null, null), l = n; l > 0; l--) {
                for (d = 0; d < o.length; d++) {
                    (u = o[d]) === l ? c = c.mixedAdd(i.points[d]) : u === -l && (c = c.mixedAdd(i.points[d].neg()))
                }
                f = f.add(c)
            }
            return f.toP()
        }, d.prototype._wnafMul = function(t, e) {
            var i = 4,
                r = t._getNAFPoints(i);
            i = r.wnd;
            for (var n = r.points, o = a(e, i), d = this.jpoint(null, null, null), u = o.length - 1; u >= 0; u--) {
                for (e = 0; u >= 0 && 0 === o[u]; u--) e++;
                if (u >= 0 && e++, d = d.dblp(e), u < 0) break;
                var f = o[u];
                s(0 !== f), d = "affine" === t.type ? f > 0 ? d.mixedAdd(n[f - 1 >> 1]) : d.mixedAdd(n[-f - 1 >> 1].neg()) : f > 0 ? d.add(n[f - 1 >> 1]) : d.add(n[-f - 1 >> 1].neg())
            }
            return "affine" === t.type ? d.toP() : d
        }, d.prototype._wnafMulAdd = function(t, e, i, r, n) {
            for (var s = this._wnafT1, d = this._wnafT2, u = this._wnafT3, f = 0, c = 0; c < r; c++) {
                var l = (S = e[c])._getNAFPoints(t);
                s[c] = l.wnd, d[c] = l.points
            }
            for (c = r - 1; c >= 1; c -= 2) {
                var h = c - 1,
                    p = c;
                if (1 === s[h] && 1 === s[p]) {
                    var _ = [e[h], null, null, e[p]];
                    0 === e[h].y.cmp(e[p].y) ? (_[1] = e[h].add(e[p]), _[2] = e[h].toJ().mixedAdd(e[p].neg())) : 0 === e[h].y.cmp(e[p].y.redNeg()) ? (_[1] = e[h].toJ().mixedAdd(e[p]), _[2] = e[h].add(e[p].neg())) : (_[1] = e[h].toJ().mixedAdd(e[p]), _[2] = e[h].toJ().mixedAdd(e[p].neg()));
                    var y = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                        b = o(i[h], i[p]);
                    f = Math.max(b[0].length, f), u[h] = new Array(f), u[p] = new Array(f);
                    for (var g = 0; g < f; g++) {
                        var v = 0 | b[0][g],
                            m = 0 | b[1][g];
                        u[h][g] = y[3 * (v + 1) + (m + 1)], u[p][g] = 0, d[h] = _
                    }
                } else u[h] = a(i[h], s[h]), u[p] = a(i[p], s[p]), f = Math.max(u[h].length, f), f = Math.max(u[p].length, f)
            }
            var A = this.jpoint(null, null, null),
                w = this._wnafT4;
            for (c = f; c >= 0; c--) {
                for (var E = 0; c >= 0;) {
                    var P = !0;
                    for (g = 0; g < r; g++) w[g] = 0 | u[g][c], 0 !== w[g] && (P = !1);
                    if (!P) break;
                    E++, c--
                }
                if (c >= 0 && E++, A = A.dblp(E), c < 0) break;
                for (g = 0; g < r; g++) {
                    var S, I = w[g];
                    0 !== I && (I > 0 ? S = d[g][I - 1 >> 1] : I < 0 && (S = d[g][-I - 1 >> 1].neg()), A = "affine" === S.type ? A.mixedAdd(S) : A.add(S))
                }
            }
            for (c = 0; c < r; c++) d[c] = null;
            return n ? A : A.toP()
        }, d.BasePoint = u, u.prototype.eq = function() {
            throw new Error("Not implemented")
        }, u.prototype.validate = function() {
            return this.curve.validate(this)
        }, d.prototype.decodePoint = function(t, e) {
            t = n.toArray(t, e);
            var i = this.p.byteLength();
            if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * i) return 6 === t[0] ? s(t[t.length - 1] % 2 == 0) : 7 === t[0] && s(t[t.length - 1] % 2 == 1), this.point(t.slice(1, 1 + i), t.slice(1 + i, 1 + 2 * i));
            if ((2 === t[0] || 3 === t[0]) && t.length - 1 === i) return this.pointFromX(t.slice(1, 1 + i), 3 === t[0]);
            throw new Error("Unknown point format")
        }, u.prototype.encodeCompressed = function(t) {
            return this.encode(t, !0)
        }, u.prototype._encode = function(t) {
            var e = this.curve.p.byteLength(),
                i = this.getX().toArray("be", e);
            return t ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", e))
        }, u.prototype.encode = function(t, e) {
            return n.encode(this._encode(e), t)
        }, u.prototype.precompute = function(t) {
            if (this.precomputed) return this;
            var e = {
                doubles: null,
                naf: null,
                beta: null
            };
            return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
        }, u.prototype._hasDoubles = function(t) {
            if (!this.precomputed) return !1;
            var e = this.precomputed.doubles;
            return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
        }, u.prototype._getDoubles = function(t, e) {
            if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
            for (var i = [this], r = this, n = 0; n < e; n += t) {
                for (var a = 0; a < t; a++) r = r.dbl();
                i.push(r)
            }
            return {
                step: t,
                points: i
            }
        }, u.prototype._getNAFPoints = function(t) {
            if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
            for (var e = [this], i = (1 << t) - 1, r = 1 === i ? null : this.dbl(), n = 1; n < i; n++) e[n] = e[n - 1].add(r);
            return {
                wnd: t,
                points: e
            }
        }, u.prototype._getBeta = function() {
            return null
        }, u.prototype.dblp = function(t) {
            for (var e = this, i = 0; i < t; i++) e = e.dbl();
            return e
        }
    },
    "7ckf": function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("2j6C");

        function a() {
            this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
        }
        e.BlockHash = a, a.prototype.update = function(t, e) {
            if (t = r.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
                var i = (t = this.pending).length % this._delta8;
                this.pending = t.slice(t.length - i, t.length), 0 === this.pending.length && (this.pending = null), t = r.join32(t, 0, t.length - i, this.endian);
                for (var n = 0; n < t.length; n += this._delta32) this._update(t, n, n + this._delta32)
            }
            return this
        }, a.prototype.digest = function(t) {
            return this.update(this._pad()), n(null === this.pending), this._digest(t)
        }, a.prototype._pad = function() {
            var t = this.pendingTotal,
                e = this._delta8,
                i = e - (t + this.padLength) % e,
                r = new Array(i + this.padLength);
            r[0] = 128;
            for (var n = 1; n < i; n++) r[n] = 0;
            if (t <<= 3, "big" === this.endian) {
                for (var a = 8; a < this.padLength; a++) r[n++] = 0;
                r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = t >>> 24 & 255, r[n++] = t >>> 16 & 255, r[n++] = t >>> 8 & 255, r[n++] = 255 & t
            } else
                for (r[n++] = 255 & t, r[n++] = t >>> 8 & 255, r[n++] = t >>> 16 & 255, r[n++] = t >>> 24 & 255, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, a = 8; a < this.padLength; a++) r[n++] = 0;
            return r
        }
    },
    "7jRU": function(t, e) {
        var i = [].indexOf;
        t.exports = function(t, e) {
            if (i) return t.indexOf(e);
            for (var r = 0; r < t.length; ++r)
                if (t[r] === e) return r;
            return -1
        }
    },
    "7zrB": function(t, e, i) {
        var r = i("f3pb"),
            n = i("P7XM");

        function a(t, e) {
            this.name = t, this.body = e, this.decoders = {}, this.encoders = {}
        }
        e.define = function(t, e) {
            return new a(t, e)
        }, a.prototype._createNamed = function(t) {
            var e;
            try {
                e = i("BwZh").runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})")
            } catch (t) {
                e = function(t) {
                    this._initNamed(t)
                }
            }
            return n(e, t), e.prototype._initNamed = function(e) {
                t.call(this, e)
            }, new e(this)
        }, a.prototype._getDecoder = function(t) {
            return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(r.decoders[t])), this.decoders[t]
        }, a.prototype.decode = function(t, e, i) {
            return this._getDecoder(e).decode(t, i)
        }, a.prototype._getEncoder = function(t) {
            return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(r.encoders[t])), this.encoders[t]
        }, a.prototype.encode = function(t, e, i) {
            return this._getEncoder(e).encode(t, i)
        }
    },
    "86MQ": function(t, e, i) {
        "use strict";
        var r = e,
            n = i("OZ/i"),
            a = i("2j6C"),
            o = i("dlgc");
        r.assert = a, r.toArray = o.toArray, r.zero2 = o.zero2, r.toHex = o.toHex, r.encode = o.encode, r.getNAF = function(t, e) {
            for (var i = [], r = 1 << e + 1, n = t.clone(); n.cmpn(1) >= 0;) {
                var a;
                if (n.isOdd()) {
                    var o = n.andln(r - 1);
                    a = o > (r >> 1) - 1 ? (r >> 1) - o : o, n.isubn(a)
                } else a = 0;
                i.push(a);
                for (var s = 0 !== n.cmpn(0) && 0 === n.andln(r - 1) ? e + 1 : 1, d = 1; d < s; d++) i.push(0);
                n.iushrn(s)
            }
            return i
        }, r.getJSF = function(t, e) {
            var i = [
                [],
                []
            ];
            t = t.clone(), e = e.clone();
            for (var r = 0, n = 0; t.cmpn(-r) > 0 || e.cmpn(-n) > 0;) {
                var a, o, s, d = t.andln(3) + r & 3,
                    u = e.andln(3) + n & 3;
                3 === d && (d = -1), 3 === u && (u = -1), a = 0 == (1 & d) ? 0 : 3 != (s = t.andln(7) + r & 7) && 5 !== s || 2 !== u ? d : -d, i[0].push(a), o = 0 == (1 & u) ? 0 : 3 != (s = e.andln(7) + n & 7) && 5 !== s || 2 !== d ? u : -u, i[1].push(o), 2 * r === a + 1 && (r = 1 - r), 2 * n === o + 1 && (n = 1 - n), t.iushrn(1), e.iushrn(1)
            }
            return i
        }, r.cachedProperty = function(t, e, i) {
            var r = "_" + e;
            t.prototype[e] = function() {
                return void 0 !== this[r] ? this[r] : this[r] = i.call(this)
            }
        }, r.parseBytes = function(t) {
            return "string" == typeof t ? r.toArray(t, "hex") : t
        }, r.intFromLE = function(t) {
            return new n(t, "hex", "le")
        }
    },
    "9GDS": function(t, e, i) {
        (function(e) {
            var r = i("mObS");

            function n(t) {
                var i = new e(4);
                return i.writeUInt32BE(t, 0), i
            }
            t.exports = function(t, i) {
                for (var a, o = new e(""), s = 0; o.length < i;) a = n(s++), o = e.concat([o, r("sha1").update(t).update(a).digest()]);
                return o.slice(0, i)
            }
        }).call(this, i("tjlA").Buffer)
    },
    "9XZ3": function(t, e, i) {
        "use strict";
        (function(e) {
            var r = i("P7XM"),
                n = i("k+aG"),
                a = new Array(16);

            function o() {
                n.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
            }

            function s(t, e) {
                return t << e | t >>> 32 - e
            }

            function d(t, e, i, r, n, a, o) {
                return s(t + (e & i | ~e & r) + n + a | 0, o) + e | 0
            }

            function u(t, e, i, r, n, a, o) {
                return s(t + (e & r | i & ~r) + n + a | 0, o) + e | 0
            }

            function f(t, e, i, r, n, a, o) {
                return s(t + (e ^ i ^ r) + n + a | 0, o) + e | 0
            }

            function c(t, e, i, r, n, a, o) {
                return s(t + (i ^ (e | ~r)) + n + a | 0, o) + e | 0
            }
            r(o, n), o.prototype._update = function() {
                for (var t = a, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
                var i = this._a,
                    r = this._b,
                    n = this._c,
                    o = this._d;
                r = c(r = c(r = c(r = c(r = f(r = f(r = f(r = f(r = u(r = u(r = u(r = u(r = d(r = d(r = d(r = d(r, n = d(n, o = d(o, i = d(i, r, n, o, t[0], 3614090360, 7), r, n, t[1], 3905402710, 12), i, r, t[2], 606105819, 17), o, i, t[3], 3250441966, 22), n = d(n, o = d(o, i = d(i, r, n, o, t[4], 4118548399, 7), r, n, t[5], 1200080426, 12), i, r, t[6], 2821735955, 17), o, i, t[7], 4249261313, 22), n = d(n, o = d(o, i = d(i, r, n, o, t[8], 1770035416, 7), r, n, t[9], 2336552879, 12), i, r, t[10], 4294925233, 17), o, i, t[11], 2304563134, 22), n = d(n, o = d(o, i = d(i, r, n, o, t[12], 1804603682, 7), r, n, t[13], 4254626195, 12), i, r, t[14], 2792965006, 17), o, i, t[15], 1236535329, 22), n = u(n, o = u(o, i = u(i, r, n, o, t[1], 4129170786, 5), r, n, t[6], 3225465664, 9), i, r, t[11], 643717713, 14), o, i, t[0], 3921069994, 20), n = u(n, o = u(o, i = u(i, r, n, o, t[5], 3593408605, 5), r, n, t[10], 38016083, 9), i, r, t[15], 3634488961, 14), o, i, t[4], 3889429448, 20), n = u(n, o = u(o, i = u(i, r, n, o, t[9], 568446438, 5), r, n, t[14], 3275163606, 9), i, r, t[3], 4107603335, 14), o, i, t[8], 1163531501, 20), n = u(n, o = u(o, i = u(i, r, n, o, t[13], 2850285829, 5), r, n, t[2], 4243563512, 9), i, r, t[7], 1735328473, 14), o, i, t[12], 2368359562, 20), n = f(n, o = f(o, i = f(i, r, n, o, t[5], 4294588738, 4), r, n, t[8], 2272392833, 11), i, r, t[11], 1839030562, 16), o, i, t[14], 4259657740, 23), n = f(n, o = f(o, i = f(i, r, n, o, t[1], 2763975236, 4), r, n, t[4], 1272893353, 11), i, r, t[7], 4139469664, 16), o, i, t[10], 3200236656, 23), n = f(n, o = f(o, i = f(i, r, n, o, t[13], 681279174, 4), r, n, t[0], 3936430074, 11), i, r, t[3], 3572445317, 16), o, i, t[6], 76029189, 23), n = f(n, o = f(o, i = f(i, r, n, o, t[9], 3654602809, 4), r, n, t[12], 3873151461, 11), i, r, t[15], 530742520, 16), o, i, t[2], 3299628645, 23), n = c(n, o = c(o, i = c(i, r, n, o, t[0], 4096336452, 6), r, n, t[7], 1126891415, 10), i, r, t[14], 2878612391, 15), o, i, t[5], 4237533241, 21), n = c(n, o = c(o, i = c(i, r, n, o, t[12], 1700485571, 6), r, n, t[3], 2399980690, 10), i, r, t[10], 4293915773, 15), o, i, t[1], 2240044497, 21), n = c(n, o = c(o, i = c(i, r, n, o, t[8], 1873313359, 6), r, n, t[15], 4264355552, 10), i, r, t[6], 2734768916, 15), o, i, t[13], 1309151649, 21), n = c(n, o = c(o, i = c(i, r, n, o, t[4], 4149444226, 6), r, n, t[11], 3174756917, 10), i, r, t[2], 718787259, 15), o, i, t[9], 3951481745, 21), this._a = this._a + i | 0, this._b = this._b + r | 0, this._c = this._c + n | 0, this._d = this._d + o | 0
            }, o.prototype._digest = function() {
                this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
                var t = new e(16);
                return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t
            }, t.exports = o
        }).call(this, i("tjlA").Buffer)
    },
    ANxK: function(t, e, i) {
        (function(t) {
            var r = i("WKKt"),
                n = i("wk3p"),
                a = i("Vh22");
            var o = {
                binary: !0,
                hex: !0,
                base64: !0
            };
            e.DiffieHellmanGroup = e.createDiffieHellmanGroup = e.getDiffieHellman = function(e) {
                var i = new t(n[e].prime, "hex"),
                    r = new t(n[e].gen, "hex");
                return new a(i, r)
            }, e.createDiffieHellman = e.DiffieHellman = function e(i, n, s, d) {
                return t.isBuffer(n) || void 0 === o[n] ? e(i, "binary", n, s) : (n = n || "binary", d = d || "binary", s = s || new t([2]), t.isBuffer(s) || (s = new t(s, d)), "number" == typeof i ? new a(r(i, s), s, !0) : (t.isBuffer(i) || (i = new t(i, n)), new a(i, s, !0)))
            }
        }).call(this, i("tjlA").Buffer)
    },
    AUX7: function(t, e) {
        e.encrypt = function(t, e) {
            return t._cipher.encryptBlock(e)
        }, e.decrypt = function(t, e) {
            return t._cipher.decryptBlock(e)
        }
    },
    AYSA: function(t, e, i) {
        "use strict";
        var r = i("2j6C");

        function n(t) {
            this.options = t, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0
        }
        t.exports = n, n.prototype._init = function() {}, n.prototype.update = function(t) {
            return 0 === t.length ? [] : "decrypt" === this.type ? this._updateDecrypt(t) : this._updateEncrypt(t)
        }, n.prototype._buffer = function(t, e) {
            for (var i = Math.min(this.buffer.length - this.bufferOff, t.length - e), r = 0; r < i; r++) this.buffer[this.bufferOff + r] = t[e + r];
            return this.bufferOff += i, i
        }, n.prototype._flushBuffer = function(t, e) {
            return this._update(this.buffer, 0, t, e), this.bufferOff = 0, this.blockSize
        }, n.prototype._updateEncrypt = function(t) {
            var e = 0,
                i = 0,
                r = (this.bufferOff + t.length) / this.blockSize | 0,
                n = new Array(r * this.blockSize);
            0 !== this.bufferOff && (e += this._buffer(t, e), this.bufferOff === this.buffer.length && (i += this._flushBuffer(n, i)));
            for (var a = t.length - (t.length - e) % this.blockSize; e < a; e += this.blockSize) this._update(t, e, n, i), i += this.blockSize;
            for (; e < t.length; e++, this.bufferOff++) this.buffer[this.bufferOff] = t[e];
            return n
        }, n.prototype._updateDecrypt = function(t) {
            for (var e = 0, i = 0, r = Math.ceil((this.bufferOff + t.length) / this.blockSize) - 1, n = new Array(r * this.blockSize); r > 0; r--) e += this._buffer(t, e), i += this._flushBuffer(n, i);
            return e += this._buffer(t, e), n
        }, n.prototype.final = function(t) {
            var e, i;
            return t && (e = this.update(t)), i = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt(), e ? e.concat(i) : i
        }, n.prototype._pad = function(t, e) {
            if (0 === e) return !1;
            for (; e < t.length;) t[e++] = 0;
            return !0
        }, n.prototype._finalEncrypt = function() {
            if (!this._pad(this.buffer, this.bufferOff)) return [];
            var t = new Array(this.blockSize);
            return this._update(this.buffer, 0, t, 0), t
        }, n.prototype._unpad = function(t) {
            return t
        }, n.prototype._finalDecrypt = function() {
            r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
            var t = new Array(this.blockSize);
            return this._flushBuffer(t, 0), this._unpad(t)
        }
    },
    AhHn: function(t, e, i) {
        var r = e;
        r._reverse = function(t) {
            var e = {};
            return Object.keys(t).forEach(function(i) {
                (0 | i) == i && (i |= 0);
                var r = t[i];
                e[r] = i
            }), e
        }, r.der = i("i3FT")
    },
    "B/J0": function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("bu2F");

        function a() {
            if (!(this instanceof a)) return new a;
            n.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
        }
        r.inherits(a, n), t.exports = a, a.blockSize = 512, a.outSize = 224, a.hmacStrength = 192, a.padLength = 64, a.prototype._digest = function(t) {
            return "hex" === t ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big")
        }
    },
    BwZh: function(module, exports, __webpack_require__) {
        var indexOf = __webpack_require__("7jRU"),
            Object_keys = function(t) {
                if (Object.keys) return Object.keys(t);
                var e = [];
                for (var i in t) e.push(i);
                return e
            },
            forEach = function(t, e) {
                if (t.forEach) return t.forEach(e);
                for (var i = 0; i < t.length; i++) e(t[i], i, t)
            },
            defineProp = function() {
                try {
                    return Object.defineProperty({}, "_", {}),
                        function(t, e, i) {
                            Object.defineProperty(t, e, {
                                writable: !0,
                                enumerable: !1,
                                configurable: !0,
                                value: i
                            })
                        }
                } catch (t) {
                    return function(t, e, i) {
                        t[e] = i
                    }
                }
            }(),
            globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];

        function Context() {}
        Context.prototype = {};
        var Script = exports.Script = function(t) {
            if (!(this instanceof Script)) return new Script(t);
            this.code = t
        };
        Script.prototype.runInContext = function(t) {
            if (!(t instanceof Context)) throw new TypeError("needs a 'context' argument.");
            var e = document.createElement("iframe");
            e.style || (e.style = {}), e.style.display = "none", document.body.appendChild(e);
            var i = e.contentWindow,
                r = i.eval,
                n = i.execScript;
            !r && n && (n.call(i, "null"), r = i.eval), forEach(Object_keys(t), function(e) {
                i[e] = t[e]
            }), forEach(globals, function(e) {
                t[e] && (i[e] = t[e])
            });
            var a = Object_keys(i),
                o = r.call(i, this.code);
            return forEach(Object_keys(i), function(e) {
                (e in t || -1 === indexOf(a, e)) && (t[e] = i[e])
            }), forEach(globals, function(e) {
                e in t || defineProp(t, e, i[e])
            }), document.body.removeChild(e), o
        }, Script.prototype.runInThisContext = function() {
            return eval(this.code)
        }, Script.prototype.runInNewContext = function(t) {
            var e = Script.createContext(t),
                i = this.runInContext(e);
            return forEach(Object_keys(e), function(i) {
                t[i] = e[i]
            }), i
        }, forEach(Object_keys(Script.prototype), function(t) {
            exports[t] = Script[t] = function(e) {
                var i = Script(e);
                return i[t].apply(i, [].slice.call(arguments, 1))
            }
        }), exports.createScript = function(t) {
            return exports.Script(t)
        }, exports.createContext = Script.createContext = function(t) {
            var e = new Context;
            return "object" == typeof t && forEach(Object_keys(t), function(i) {
                e[i] = t[i]
            }), e
        }
    },
    "C+gy": function(t, e) {
        e["des-ecb"] = {
            key: 8,
            iv: 0
        }, e["des-cbc"] = e.des = {
            key: 8,
            iv: 8
        }, e["des-ede3-cbc"] = e.des3 = {
            key: 24,
            iv: 8
        }, e["des-ede3"] = {
            key: 24,
            iv: 0
        }, e["des-ede-cbc"] = {
            key: 16,
            iv: 8
        }, e["des-ede"] = {
            key: 16,
            iv: 0
        }
    },
    CH9F: function(t, e, i) {
        var r = i("P7XM"),
            n = i("tnIz"),
            a = i("hwdV").Buffer,
            o = [1518500249, 1859775393, -1894007588, -899497514],
            s = new Array(80);

        function d() {
            this.init(), this._w = s, n.call(this, 64, 56)
        }

        function u(t) {
            return t << 30 | t >>> 2
        }

        function f(t, e, i, r) {
            return 0 === t ? e & i | ~e & r : 2 === t ? e & i | e & r | i & r : e ^ i ^ r
        }
        r(d, n), d.prototype.init = function() {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
        }, d.prototype._update = function(t) {
            for (var e, i = this._w, r = 0 | this._a, n = 0 | this._b, a = 0 | this._c, s = 0 | this._d, d = 0 | this._e, c = 0; c < 16; ++c) i[c] = t.readInt32BE(4 * c);
            for (; c < 80; ++c) i[c] = i[c - 3] ^ i[c - 8] ^ i[c - 14] ^ i[c - 16];
            for (var l = 0; l < 80; ++l) {
                var h = ~~(l / 20),
                    p = 0 | ((e = r) << 5 | e >>> 27) + f(h, n, a, s) + d + i[l] + o[h];
                d = s, s = a, a = u(n), n = r, r = p
            }
            this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = a + this._c | 0, this._d = s + this._d | 0, this._e = d + this._e | 0
        }, d.prototype._hash = function() {
            var t = a.allocUnsafe(20);
            return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
        }, t.exports = d
    },
    CWBI: function(t, e, i) {
        t.exports = i("sZro")
    },
    CfXC: function(t, e, i) {
        var r = i("OfWw"),
            n = i("hwdV").Buffer,
            a = i("ZDAU");

        function o(t, e, i, o) {
            a.call(this), this._cipher = new r.AES(e), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = o, this._mode = t
        }
        i("P7XM")(o, a), o.prototype._update = function(t) {
            return this._mode.encrypt(this, t, this._decrypt)
        }, o.prototype._final = function() {
            this._cipher.scrub()
        }, t.exports = o
    },
    D33C: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return AudioPlaylist
        });
        var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pp2G"),
            _playlist_loadAllPlaylistAudios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("PMB/");

        function _classCallCheck(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var AudioPlaylist = function() {
            function AudioPlaylist(t, e, i) {
                _classCallCheck(this, AudioPlaylist), getAudioPlayer().addPlaylist(this);
                var r = {};
                if (t && isFunction(t.getId)) return this._ref = t, void getAudioPlayer().addPlaylist(this);
                isObject(t) ? r = t : (r.ownerId = e, r.type = t, r.albumId = i || ++AudioPlaylist.plIndex), this._type = r.type, this._ownerId = r.ownerId || vk.id, this._albumId = r.albumId || 0, this._fromId = r.fromId || 0, this._list = [], this.mergeWith(r)
            }
            return AudioPlaylist.prototype.getId = function() {
                return this.getType() + "_" + this.getOwnerId() + "_" + this.getAlbumId()
            }, AudioPlaylist.prototype.getFullId = function() {
                return this.getOwnerId() + "_" + this.getAlbumId() + (this.getAccessHash() ? "_" + this.getAccessHash() : "")
            }, AudioPlaylist.prototype.isReference = function() {
                return !!this._ref
            }, AudioPlaylist.prototype.getSelf = function() {
                return this._ref && isObject(this._ref) ? this._ref : this
            }, AudioPlaylist.prototype.getType = function() {
                return this.getSelf()._type
            }, AudioPlaylist.prototype.getOwnerId = function() {
                return this.getSelf()._ownerId
            }, AudioPlaylist.prototype.getAlbumId = function() {
                return this.getSelf()._albumId
            }, AudioPlaylist.prototype.getPlaylistId = function() {
                return this.getSelf()._albumId
            }, AudioPlaylist.prototype.getOriginalPlaylistRawId = function() {
                return this.getSelf()._originalPlaylistRawId
            }, AudioPlaylist.prototype.getFollowHash = function() {
                return this.getSelf()._followHash
            }, AudioPlaylist.prototype.getRawId = function() {
                return this.getSelf()._rawId
            }, AudioPlaylist.prototype.getGridCovers = function() {
                return this.getSelf()._gridCovers || ""
            }, AudioPlaylist.prototype.getTitle = function() {
                return this.getSelf()._title || ""
            }, AudioPlaylist.prototype.getSubtitle = function() {
                return this.getSelf()._subTitle || ""
            }, AudioPlaylist.prototype.getDescription = function() {
                return this.getSelf()._description || ""
            }, AudioPlaylist.prototype.getRawDescription = function() {
                return this.getSelf()._rawDescription || ""
            }, AudioPlaylist.prototype.getAccessHash = function() {
                return this.getSelf()._accessHash || ""
            }, AudioPlaylist.prototype.getFromId = function() {
                return this.getSelf()._fromId || 0
            }, AudioPlaylist.prototype.getAuthorLine = function() {
                return this.getSelf()._authorLine || ""
            }, AudioPlaylist.prototype.getAuthorHref = function() {
                return this.getSelf()._authorHref || ""
            }, AudioPlaylist.prototype.getAuthorName = function() {
                return this.getSelf()._authorName || ""
            }, AudioPlaylist.prototype.getInfoLine1 = function() {
                return this.getSelf()._infoLine1 || ""
            }, AudioPlaylist.prototype.getInfoLine2 = function() {
                return this.getSelf()._infoLine2 || ""
            }, AudioPlaylist.prototype.getListens = function() {
                return this.getSelf()._listens || 0
            }, AudioPlaylist.prototype.getAddClasses = function() {
                return this.getSelf()._addClasses || ""
            }, AudioPlaylist.prototype.getLastUpdated = function() {
                return this.getSelf()._lastUpdated || ""
            }, AudioPlaylist.prototype.getEditHash = function() {
                return this.getSelf()._editHash || ""
            }, AudioPlaylist.prototype.getDeleteHash = function() {
                return this.getSelf()._deleteHash || ""
            }, AudioPlaylist.prototype.getReplaceHash = function() {
                return this.getSelf()._replaceHash || ""
            }, AudioPlaylist.prototype.getCoverUrl = function() {
                return this.getSelf()._coverUrl || ""
            }, AudioPlaylist.prototype.getBlocks = function() {
                return this.getSelf()._blocks || {}
            }, AudioPlaylist.prototype.getFeedFrom = function() {
                return this.getSelf()._feedFrom
            }, AudioPlaylist.prototype.getFeedOffset = function() {
                return this.getSelf()._feedOffset
            }, AudioPlaylist.prototype.getSearchParams = function() {
                return this.getSelf()._searchParams || null
            }, AudioPlaylist.prototype.getSearchQid = function() {
                return this.getSelf()._searchQid || null
            }, AudioPlaylist.prototype.getLocalFoundCount = function() {
                return this.getSelf()._localFoundTotal || 0
            }, AudioPlaylist.prototype.getTotalCount = function() {
                return this.getSelf()._totalCount
            }, AudioPlaylist.prototype.getTotalCountHash = function() {
                return this.getSelf()._totalCountHash
            }, AudioPlaylist.prototype.getShuffle = function() {
                return this.getSelf()._shuffle
            }, AudioPlaylist.prototype.getFriendId = function() {
                return this.getSelf()._friend
            }, AudioPlaylist.prototype.getNextOffset = function() {
                var t = this.getSelf();
                return t._forceReload ? (t._forceReload = !1, 0) : t._nextOffset || this.getAudiosCount()
            }, AudioPlaylist.prototype.getAudiosList = function() {
                return this.getSelf()._list || []
            }, AudioPlaylist.prototype.getSortedAudiosList = function() {
                return this.getSelf()._sortedList || this.getAudiosList() || []
            }, AudioPlaylist.prototype.getUnshuffledAudiosList = function() {
                var t = this.getSelf();
                return t._originalList ? t._originalList : t._list
            }, AudioPlaylist.prototype.getItemsList = function() {
                return this.getSelf()._items || []
            }, AudioPlaylist.prototype.getPostId = function() {
                return this.getSelf()._postId
            }, AudioPlaylist.prototype.getWallQuery = function() {
                return this.getSelf()._wallQuery
            }, AudioPlaylist.prototype.getWallType = function() {
                return this.getSelf()._wallType
            }, AudioPlaylist.prototype.getCommunititesBlock = function() {
                return this.getSelf()._communitiesBlock
            }, AudioPlaylist.prototype.getArtistsBlock = function() {
                return this.getSelf()._artistsBlock
            }, AudioPlaylist.prototype.getPlaylistsBlock = function() {
                return this.getSelf()._playlistsBlock
            }, AudioPlaylist.prototype.getLiveInfo = function() {
                var t = this.getSelf()._live;
                return !!t && {
                    hostId: (t = t.split(","))[0],
                    audioId: t[1],
                    hash: t[2]
                }
            }, AudioPlaylist.prototype.getAudioAt = function(t) {
                return this.getSelf()._list.length > t ? this.getSelf()._list[t] : null
            }, AudioPlaylist.prototype.getAudiosCount = function() {
                return this.getSelf()._list.length
            }, AudioPlaylist.prototype.getTotalDuration = function() {
                var t = this.getAudiosList(),
                    e = 0;
                return each(t, function(t, i) {
                    e += i[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_DURATION]
                }), e
            }, AudioPlaylist.prototype.getItemsCount = function() {
                var t = this.getSelf();
                return t._items = t._items || [], t._items.length
            }, AudioPlaylist.prototype.setForceReload = function(t) {
                this.getSelf()._forceReload = t
            }, AudioPlaylist.prototype.setLocalFoundCount = function(t) {
                this.getSelf()._localFoundTotal = t
            }, AudioPlaylist.prototype.setAdsAllowed = function(t) {
                return this.getSelf()._isAdsAllowed = t
            }, AudioPlaylist.prototype.setFollowed = function(t) {
                var e = this.getAddClasses() || "";
                return e = e.replace("audio_playlist__followed", ""), t && (e += " audio_playlist__followed"), this.getSelf()._addClasses = e, this.getSelf()._isFollowed = t
            }, AudioPlaylist.prototype.isBlocked = function() {
                return !!this.getSelf()._isBlocked
            }, AudioPlaylist.prototype.hasMore = function() {
                return !!this.getSelf()._hasMore
            }, AudioPlaylist.prototype.isOfficial = function() {
                return !!this.getSelf()._isOfficial
            }, AudioPlaylist.prototype.isFollowed = function() {
                return this.getSelf()._isFollowed
            }, AudioPlaylist.prototype.isShuffled = function() {
                return !!this.getShuffle()
            }, AudioPlaylist.prototype.isAdsAllowed = function() {
                return !!this.getSelf()._isAdsAllowed
            }, AudioPlaylist.prototype.isInitedSortedList = function() {
                return !!this.getSelf()._sorted
            }, AudioPlaylist.prototype.isFullyLoadable = function() {
                return this.getType() === AudioPlaylist.TYPE_PLAYLIST
            }, AudioPlaylist.prototype.isLive = function() {
                return !!this.getLiveInfo()
            }, AudioPlaylist.prototype._unref = function() {
                var t = this._ref;
                if (isObject(t)) {
                    var e = {};
                    for (var i in t)
                        if (t.hasOwnProperty(i) && !isFunction(t[i]) && 0 === i.indexOf("_")) {
                            var r = t[i];
                            e[i.substr(1)] = isObject(r) ? clone(r) : r
                        }
                    e.hasMore = !1, delete e.ownerId, delete this._ref, this._type = AudioPlaylist.TYPE_TEMP, this._ownerId = e.ownerId || vk.id, this._albumId = AudioPlaylist.plIndex++, this._list = [], this.mergeWith(e)
                }
            }, AudioPlaylist.prototype.equals = function(t) {
                return this.getSelf() === t.getSelf()
            }, AudioPlaylist.prototype.serialize = function() {
                var t = {},
                    e = getAudioPlayer().getCurrentAudio(),
                    i = Math.max(0, this.indexOfAudio(e));
                return t.list = clone(this.getAudiosList().slice(Math.max(0, i - 100), i + 300), !0), each(t.list, function(t, e) {
                    e[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_URL] = ""
                }), t.type = AudioPlaylist.TYPE_TEMP, t.ownerId = vk.id, t.albumId = irand(1, 999), t.hasMore = !1, t.title = this.getTitle(), t.context = getAudioPlayer()._getPlayingContext(), t.originalPlaylistRawId = this.getOriginalPlaylistRawId(), this.getType() === AudioPlaylist.TYPE_PLAYLIST && this.getAlbumId() > 0 && (t.originalPlaylistRawId = this.getOwnerId() + "_" + this.getAlbumId() + "_" + this.getAccessHash()), JSON.stringify(t)
            }, AudioPlaylist.prototype.toString = function() {
                return this.getId()
            }, AudioPlaylist.prototype._moveCurrentAudioAtFirstPosition = function() {
                var t = getAudioPlayer().getCurrentAudio(),
                    e = this.getSelf(),
                    i = this.indexOfAudio(t); - 1 !== i && (e._list.splice(i, 1), e._list.unshift(t), e._movedAudioToFirstPos = i)
            }, AudioPlaylist.prototype._resetMovedAudioToInitialPosition = function() {
                var t = this.getSelf();
                if (t._movedAudioToFirstPos) {
                    var e = t._list.splice(0, 1);
                    t._list.splice(t._movedAudioToFirstPos, 0, e[0]), delete t._movedAudioToFirstPos
                }
            }, AudioPlaylist.prototype._ensureIndex = function(t) {
                var e = this.getSelf();
                if (e._index) t && t();
                else {
                    var i = function(t, e) {
                        var i = intval(e);
                        return i >= 33 && i < 48 ? String.fromCharCode(i) : t
                    };
                    e._index = new vkIndexer(e._list, function(t) {
                        return (t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_PERFORMER] + " " + t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_TITLE]).replace(/\&\#(\d+);?/gi, i)
                    }, t)
                }
            }, AudioPlaylist.prototype.clean = function(t) {
                t || this._unref();
                var e = this.getSelf();
                e._hasMore = !0, e._list = [], e._items = [], e._feedOffset = e._feedFrom = 0, e._nextOffset = 0
            }, AudioPlaylist.prototype.initSortedList = function(t) {
                var e = this.getSelf();
                e._originalList || (e._originalList = [].concat(e._list)), e._sorted = !0, e._list = t
            }, AudioPlaylist.prototype.removeSortedList = function() {
                var t = this.getSelf();
                t._originalList && (t._list = [].concat(t._originalList)), t._sorted = !1
            }, AudioPlaylist.prototype.shuffle = function(t) {
                function e(e, i) {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }, e
            }(function(t, e) {
                if (!(this.isShuffled() && t || !this.isShuffled() && !t)) {
                    var i = this.getSelf();
                    if (delete i._sorted, t) {
                        var r = !1;
                        if (this.hasMore())
                            if (this.getType() === AudioPlaylist.TYPE_SEARCH) i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), r = !0;
                            else if (inArray(this.getType(), [AudioPlaylist.TYPE_RECOM])) {
                            var n = getAudioPlayer().getCurrentAudio(),
                                a = this.indexOfAudio(n);
                            this.clean(!0), a >= 0 && i.addAudio(n, 0), r = !0
                        } else this._unref(), (i = this.getSelf())._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), r = !0;
                        else i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), r = !0;
                        r && (i._shuffle = t)
                    } else i._originalList ? i._list = i._originalList : this.clean(!0), delete i._shuffle, delete i._originalList;
                    return !0
                }
            }), AudioPlaylist.prototype.getNextAudio = function(t, e) {
                if (!t) return t = this.getAudioAt(0), e && _utils__WEBPACK_IMPORTED_MODULE_0__.a.asObject(t).isClaimed ? this.getNextAudio(t, !0) : t;
                var i = this.indexOfAudio(t);
                if (i < 0) return !1;
                if (i + 1 < this.getAudiosCount()) {
                    var r = this.getAudioAt(i + 1);
                    return e && _utils__WEBPACK_IMPORTED_MODULE_0__.a.asObject(r).isClaimed ? this.getNextAudio(r, !0) : r
                }
                return !1
            }, AudioPlaylist.prototype.removeAudio = function(t) {
                var e = this.indexOfAudio(t);
                if (e >= 0) {
                    this._unref();
                    var i = this._list.splice(e, 1);
                    return this._index && this._index.remove(i[0]), e
                }
                return -1
            }, AudioPlaylist.prototype.addAudio = function(t, e) {
                var i = this;
                this._unref();
                var r = void 0 === e,
                    n = function(t) {
                        var n = i.getUnshuffledAudiosList(),
                            a = i.indexOfAudio(t);
                        if (a >= 0) {
                            if (r) return;
                            n.splice(a, 1)
                        }(t = clone(t))[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_TITLE] = clean(replaceEntities(t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_TITLE]).replace(/(<em>|<\/em>)/g, "")), t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_PERFORMER] = clean(replaceEntities(t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_PERFORMER]).replace(/(<em>|<\/em>)/g, "")), r ? n.push(t) : n.splice(e, 0, t), i._index && i._index.add(t)
                    };
                if (isArray(t) && isArray(t[0]))
                    for (var a = 0, o = t.length; a < o; a++) n(t[a]);
                else t.length && n(t)
            }, AudioPlaylist.prototype.moveAudio = function(t, e) {
                this._unref();
                var i = this._list.splice(t, 1);
                t < e && (e -= 1), this._list.splice(e, 0, i[0])
            }, AudioPlaylist.prototype.indexOfAudio = function(t) {
                if (!t) return -1;
                var e = void 0;
                isString(t) ? e = t.split("_") : isObject(t) ? e = [t.ownerId, t.id] : isArray(t) && (e = [t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_OWNER_ID], t[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_ID]]);
                for (var i = this.getSelf()._list, r = 0, n = i.length; r < n; r++)
                    if (i[r] && e[0] == i[r][_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_OWNER_ID] && e[1] == i[r][_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_ID]) return r;
                return -1
            }, AudioPlaylist.prototype.getAudio = function(t) {
                var e = this.getSelf();
                t = t.split("_");
                for (var i = 0, r = e._list.length; i < r; i++)
                    if (t[0] == e._list[i][_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_OWNER_ID] && t[1] == e._list[i][_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_ID]) return e._list[i];
                return null
            }, AudioPlaylist.prototype.loadAll = function(t) {
                if (!this.isFullyLoadable()) return t && t();
                this.load(0, t, !0)
            }, AudioPlaylist.prototype.load = function load(offset, onDone, needAll) {
                var _this2 = this,
                    trackType = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "default";
                isFunction(offset) && (onDone = offset, offset = 0);
                var searchParams = this.getSearchParams();
                offset = intval(offset);
                var countAvailable = this.getType() === AudioPlaylist.TYPE_FEED ? this.getItemsCount() : this.getAudiosCount(),
                    isGoingToLoadAll = this.isFullyLoadable() && needAll && this.hasMore();
                if (offset < countAvailable && !isGoingToLoadAll) return onDone && onDone(this);
                var callOnDones = function(t, e) {
                    var i = _this2._onDoneLoading;
                    delete _this2._onDoneLoading, delete _this2._loadingAll, each(i || [], function(t, i) {
                        i && i(_this2, e)
                    })
                };
                if (!this.hasMore()) return onDone && onDone(this);
                if (searchParams && this.getType() === AudioPlaylist.TYPE_SEARCH && !searchParams.globalQuery) return onDone && onDone(this);
                if (this._onDoneLoading = this._onDoneLoading || [], this._onDoneLoading.push(onDone), !this._loadingAll) {
                    if (needAll) return this._loadingAll = !0, void Object(_playlist_loadAllPlaylistAudios__WEBPACK_IMPORTED_MODULE_1__.a)(this, callOnDones);
                    offset = this.getNextOffset(), offset === this.getLocalFoundCount() && (offset -= this.getLocalFoundCount()), offset || clearTimeout(this._sendSearchStatsTimeout);
                    var ownerId = cur.audioPage && this.getType() === AudioPlaylist.TYPE_SEARCH ? cur.audioPage.getOwnerId() : this.getOwnerId();
                    ajax.post("al_audio.php", {
                        act: "load_section",
                        type: this.getType(),
                        owner_id: ownerId,
                        playlist_id: this.getPlaylistId(),
                        offset: offset,
                        access_hash: this.getAccessHash(),
                        search_q: searchParams ? searchParams.globalQuery : null,
                        search_performer: searchParams ? searchParams.performer : null,
                        search_lyrics: searchParams ? searchParams.lyrics : null,
                        search_sort: searchParams ? searchParams.sort : null,
                        search_history: searchParams ? intval(searchParams.fromHistory) : null,
                        search_qid: this.getSearchQid(),
                        feed_from: this.getFeedFrom(),
                        feed_offset: this.getFeedOffset(),
                        shuffle: this.getShuffle(),
                        post_id: this.getPostId(),
                        wall_query: this.getWallQuery(),
                        wall_type: this.getWallType(),
                        claim: intval(nav.objLoc.claim),
                        track_type: trackType
                    }, {
                        onDone: function onDone(loadedPlaylist, tpl, langs, templatesScript) {
                            addTemplates({
                                audio_playlist_snippet: tpl
                            }), extend(cur.lang, langs), templatesScript && eval(templatesScript), _this2._loadingAll && !needAll || (getAudioPlayer().mergePlaylistData(_this2, loadedPlaylist), callOnDones(), getAudioPlayer().saveStateCurrentPlaylist(), offset || (clearTimeout(_this2._sendSearchStatsTimeout), _this2._sendSearchStatsTimeout = setTimeout(_this2.sendSearchStats.bind(_this2, "search_view"), 3e3), _this2._searchPlayStatsSent = !1))
                        }
                    })
                }
            }, AudioPlaylist.prototype.mergeWith = function(t) {
                var e = this;
                if (!isObject(this._ref)) {
                    var i = t.list;
                    if (i) {
                        var r = getAudioPlayer().getCurrentAudio();
                        if (r && this.indexOfAudio(r) >= 0) {
                            for (var n = -1, a = 0, o = i.length; a < o; a++)
                                if (r[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_OWNER_ID] == i[a][_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_OWNER_ID] && r[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_ID] == i[a][_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_ID]) {
                                    n = a;
                                    break
                                }
                            n >= 0 && this.clean()
                        }
                        this.addAudio(t.list)
                    }
                    if (t.items) {
                        this._items = this._items || [];
                        for (var s = 0, d = t.items.length; s < d; s++) this._items.push(t.items[s])
                    }
                    each(["accessHash", "addClasses", "artistsBlock", "authorLine", "authorHref", "authorName", "communitiesBlock", "coverUrl", "description", "gridCovers", "editHash", "feedFrom", "feedOffset", "followHash", "hasMore", "infoLine1", "infoLine2", "isAdsAllowed", "isFollowed", "isOfficial", "isBlocked", "lastUpdated", "listens", "live", "nextOffset", "originalList", "playlistsBlock", "postId", "rawId", "rawDescription", "searchQid", "searchParams", "shuffle", "subTitle", "title", "totalCount", "totalCountHash", "wallQuery", "wallType"], function(i, r) {
                        void 0 !== t[r] && (e["_" + r] = t[r])
                    })
                }
            }, AudioPlaylist.prototype.search = function(t, e) {
                var i = this.getSelf();
                isObject(t) || (t = {
                    q: t
                }), this._ensureIndex(function() {
                    var r = i._index ? i._index.search(t.q) : [];
                    return r = r.filter(function(e) {
                        return !t.lyrics || !!intval(e[_utils__WEBPACK_IMPORTED_MODULE_0__.a.AUDIO_ITEM_INDEX_LYRICS])
                    }), e(r)
                })
            }, AudioPlaylist.prototype.sendSearchStats = function(t) {
                if ("search_play" == t) {
                    if (this._searchPlayStatsSent) return;
                    this._searchPlayStatsSent = !0
                }
                ajax.post("al_audio.php?act=search_stats", {
                    event_type: t,
                    search_type: this.getSearchQid() ? "external" : "internal",
                    search_params: JSON.stringify(this.getSearchParams()),
                    results_count: this.getTotalCount()
                })
            }, AudioPlaylist.prototype.fetchNextLiveAudio = function(t) {
                var e = this,
                    i = this.getLiveInfo();
                ajax.post("al_audio.php", {
                    act: "a_get_audio_status",
                    host_id: i.hostId,
                    hash: i.hash
                }, {
                    onDone: function(i) {
                        if (i) {
                            var r = e.indexOfAudio(i);
                            r >= 0 ? e.moveAudio(r, e.getAudiosCount() - 1) : e.addAudio(i)
                        }
                        t && t(i)
                    }
                })
            }, AudioPlaylist
        }();
        AudioPlaylist.plIndex = 0, AudioPlaylist.TYPE_CURRENT = "current", AudioPlaylist.TYPE_PLAYLIST = "playlist", AudioPlaylist.TYPE_ALBUM = "album", AudioPlaylist.TYPE_TEMP = "temp", AudioPlaylist.TYPE_RECOM = "recoms", AudioPlaylist.TYPE_SEARCH = "search", AudioPlaylist.TYPE_FEED = "feed", AudioPlaylist.TYPE_LIVE = "live", AudioPlaylist.TYPE_WALL = "wall", AudioPlaylist.TYPE_RECENT = "recent", AudioPlaylist.DEFAULT_PLAYLIST_ID = -1
    },
    DLvh: function(t, e, i) {
        "use strict";
        var r, n = e,
            a = i("fZJM"),
            o = i("MzeL"),
            s = o.utils.assert;

        function d(t) {
            "short" === t.type ? this.curve = new o.curve.short(t) : "edwards" === t.type ? this.curve = new o.curve.edwards(t) : this.curve = new o.curve.mont(t), this.g = this.curve.g, this.n = this.curve.n, this.hash = t.hash, s(this.g.validate(), "Invalid curve"), s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
        }

        function u(t, e) {
            Object.defineProperty(n, t, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    var i = new d(e);
                    return Object.defineProperty(n, t, {
                        configurable: !0,
                        enumerable: !0,
                        value: i
                    }), i
                }
            })
        }
        n.PresetCurve = d, u("p192", {
            type: "short",
            prime: "p192",
            p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
            b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
            n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
            hash: a.sha256,
            gRed: !1,
            g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
        }), u("p224", {
            type: "short",
            prime: "p224",
            p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
            b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
            n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
            hash: a.sha256,
            gRed: !1,
            g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
        }), u("p256", {
            type: "short",
            prime: null,
            p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
            a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
            b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
            n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
            hash: a.sha256,
            gRed: !1,
            g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
        }), u("p384", {
            type: "short",
            prime: null,
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
            a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
            b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
            n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
            hash: a.sha384,
            gRed: !1,
            g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
        }), u("p521", {
            type: "short",
            prime: null,
            p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
            a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
            b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
            n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
            hash: a.sha512,
            gRed: !1,
            g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
        }), u("curve25519", {
            type: "mont",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "76d06",
            b: "1",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: a.sha256,
            gRed: !1,
            g: ["9"]
        }), u("ed25519", {
            type: "edwards",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "-1",
            c: "1",
            d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: a.sha256,
            gRed: !1,
            g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
        });
        try {
            r = i("QJsb")
        } catch (t) {
            r = void 0
        }
        u("secp256k1", {
            type: "short",
            prime: "k256",
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            a: "0",
            b: "7",
            n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
            h: "1",
            hash: a.sha256,
            beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
            lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
            basis: [{
                a: "3086d221a7d46bcde86c90e49284eb15",
                b: "-e4437ed6010e88286f547fa90abfe4c3"
            }, {
                a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                b: "3086d221a7d46bcde86c90e49284eb15"
            }],
            gRed: !1,
            g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", r]
        })
    },
    DaRl: function(t, e, i) {
        "use strict";
        var r = i("2j6C"),
            n = i("P7XM"),
            a = {};
        e.instantiate = function(t) {
            function e(e) {
                t.call(this, e), this._cbcInit()
            }
            n(e, t);
            for (var i = Object.keys(a), r = 0; r < i.length; r++) {
                var o = i[r];
                e.prototype[o] = a[o]
            }
            return e.create = function(t) {
                return new e(t)
            }, e
        }, a._cbcInit = function() {
            var t = new function(t) {
                r.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
                for (var e = 0; e < this.iv.length; e++) this.iv[e] = t[e]
            }(this.options.iv);
            this._cbcState = t
        }, a._update = function(t, e, i, r) {
            var n = this._cbcState,
                a = this.constructor.super_.prototype,
                o = n.iv;
            if ("encrypt" === this.type) {
                for (var s = 0; s < this.blockSize; s++) o[s] ^= t[e + s];
                a._update.call(this, o, 0, i, r);
                for (s = 0; s < this.blockSize; s++) o[s] = i[r + s]
            } else {
                a._update.call(this, t, e, i, r);
                for (s = 0; s < this.blockSize; s++) i[r + s] ^= o[s];
                for (s = 0; s < this.blockSize; s++) o[s] = t[e + s]
            }
        }
    },
    DyzK: function(t, e, i) {
        (function(e) {
            var r = i("Ku4m"),
                n = i("9GDS"),
                a = i("g9U9"),
                o = i("OZ/i"),
                s = i("qVij"),
                d = i("mObS"),
                u = i("UpF+");
            t.exports = function(t, i, f) {
                var c;
                c = t.padding ? t.padding : f ? 1 : 4;
                var l, h = r(t),
                    p = h.modulus.byteLength();
                if (i.length > p || new o(i).cmp(h.modulus) >= 0) throw new Error("decryption error");
                l = f ? u(new o(i), h) : s(i, h);
                var _ = new e(p - l.length);
                if (_.fill(0), l = e.concat([_, l], p), 4 === c) return function(t, i) {
                    t.modulus;
                    var r = t.modulus.byteLength(),
                        o = (i.length, d("sha1").update(new e("")).digest()),
                        s = o.length;
                    if (0 !== i[0]) throw new Error("decryption error");
                    var u = i.slice(1, s + 1),
                        f = i.slice(s + 1),
                        c = a(u, n(f, s)),
                        l = a(f, n(c, r - s - 1));
                    if (function(t, i) {
                            t = new e(t), i = new e(i);
                            var r = 0,
                                n = t.length;
                            t.length !== i.length && (r++, n = Math.min(t.length, i.length));
                            var a = -1;
                            for (; ++a < n;) r += t[a] ^ i[a];
                            return r
                        }(o, l.slice(0, s))) throw new Error("decryption error");
                    var h = s;
                    for (; 0 === l[h];) h++;
                    if (1 !== l[h++]) throw new Error("decryption error");
                    return l.slice(h)
                }(h, l);
                if (1 === c) return function(t, e, i) {
                    var r = e.slice(0, 2),
                        n = 2,
                        a = 0;
                    for (; 0 !== e[n++];)
                        if (n >= e.length) {
                            a++;
                            break
                        }
                    var o = e.slice(2, n - 1);
                    e.slice(n - 1, n);
                    ("0002" !== r.toString("hex") && !i || "0001" !== r.toString("hex") && i) && a++;
                    o.length < 8 && a++;
                    if (a) throw new Error("decryption error");
                    return e.slice(n)
                }(0, l, f);
                if (3 === c) return l;
                throw new Error("unknown padding")
            }
        }).call(this, i("tjlA").Buffer)
    },
    "E+IA": function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("7ckf"),
            a = i("qlaj"),
            o = r.rotl32,
            s = r.sum32,
            d = r.sum32_5,
            u = a.ft_1,
            f = n.BlockHash,
            c = [1518500249, 1859775393, 2400959708, 3395469782];

        function l() {
            if (!(this instanceof l)) return new l;
            f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
        }
        r.inherits(l, f), t.exports = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 80, l.padLength = 64, l.prototype._update = function(t, e) {
            for (var i = this.W, r = 0; r < 16; r++) i[r] = t[e + r];
            for (; r < i.length; r++) i[r] = o(i[r - 3] ^ i[r - 8] ^ i[r - 14] ^ i[r - 16], 1);
            var n = this.h[0],
                a = this.h[1],
                f = this.h[2],
                l = this.h[3],
                h = this.h[4];
            for (r = 0; r < i.length; r++) {
                var p = ~~(r / 20),
                    _ = d(o(n, 5), u(p, a, f, l), h, i[r], c[p]);
                h = l, l = f, f = o(a, 30), a = n, n = _
            }
            this.h[0] = s(this.h[0], n), this.h[1] = s(this.h[1], a), this.h[2] = s(this.h[2], f), this.h[3] = s(this.h[3], l), this.h[4] = s(this.h[4], h)
        }, l.prototype._digest = function(t) {
            return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
        }
    },
    EW2V: function(t, e, i) {
        t.exports = i("tOiH")
    },
    Edxu: function(t, e, i) {
        "use strict";
        (function(e, r) {
            var n = i("hwdV").Buffer,
                a = e.crypto || e.msCrypto;
            a && a.getRandomValues ? t.exports = function(t, i) {
                if (t > 65536) throw new Error("requested too many random bytes");
                var o = new e.Uint8Array(t);
                t > 0 && a.getRandomValues(o);
                var s = n.from(o.buffer);
                if ("function" == typeof i) return r.nextTick(function() {
                    i(null, s)
                });
                return s
            } : t.exports = function() {
                throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
            }
        }).call(this, i("yLpj"), i("8oxB"))
    },
    FUXG: function(t, e, i) {
        "use strict";
        e.utils = i("Xudb"), e.Cipher = i("AYSA"), e.DES = i("Titl"), e.CBC = i("DaRl"), e.EDE = i("H+yo")
    },
    Giow: function(t, e, i) {
        "use strict";
        var r = i("P7XM"),
            n = i("1CSz"),
            a = i("ZDAU"),
            o = i("hwdV").Buffer,
            s = i("WnY+"),
            d = i("tcrS"),
            u = i("afKu"),
            f = o.alloc(128);

        function c(t, e) {
            a.call(this, "digest"), "string" == typeof e && (e = o.from(e));
            var i = "sha512" === t || "sha384" === t ? 128 : 64;
            (this._alg = t, this._key = e, e.length > i) ? e = ("rmd160" === t ? new d : u(t)).update(e).digest(): e.length < i && (e = o.concat([e, f], i));
            for (var r = this._ipad = o.allocUnsafe(i), n = this._opad = o.allocUnsafe(i), s = 0; s < i; s++) r[s] = 54 ^ e[s], n[s] = 92 ^ e[s];
            this._hash = "rmd160" === t ? new d : u(t), this._hash.update(r)
        }
        r(c, a), c.prototype._update = function(t) {
            this._hash.update(t)
        }, c.prototype._final = function() {
            var t = this._hash.digest();
            return ("rmd160" === this._alg ? new d : u(this._alg)).update(this._opad).update(t).digest()
        }, t.exports = function(t, e) {
            return "rmd160" === (t = t.toLowerCase()) || "ripemd160" === t ? new c("rmd160", e) : "md5" === t ? new n(s, e) : new c(t, e)
        }
    },
    "H+yo": function(t, e, i) {
        "use strict";
        var r = i("2j6C"),
            n = i("P7XM"),
            a = i("FUXG"),
            o = a.Cipher,
            s = a.DES;

        function d(t) {
            o.call(this, t);
            var e = new function(t, e) {
                r.equal(e.length, 24, "Invalid key length");
                var i = e.slice(0, 8),
                    n = e.slice(8, 16),
                    a = e.slice(16, 24);
                this.ciphers = "encrypt" === t ? [s.create({
                    type: "encrypt",
                    key: i
                }), s.create({
                    type: "decrypt",
                    key: n
                }), s.create({
                    type: "encrypt",
                    key: a
                })] : [s.create({
                    type: "decrypt",
                    key: a
                }), s.create({
                    type: "encrypt",
                    key: n
                }), s.create({
                    type: "decrypt",
                    key: i
                })]
            }(this.type, this.options.key);
            this._edeState = e
        }
        n(d, o), t.exports = d, d.create = function(t) {
            return new d(t)
        }, d.prototype._update = function(t, e, i, r) {
            var n = this._edeState;
            n.ciphers[0]._update(t, e, i, r), n.ciphers[1]._update(i, r, i, r), n.ciphers[2]._update(i, r, i, r)
        }, d.prototype._pad = s.prototype._pad, d.prototype._unpad = s.prototype._unpad
    },
    H7XF: function(t, e, i) {
        "use strict";
        e.byteLength = function(t) {
            var e = u(t),
                i = e[0],
                r = e[1];
            return 3 * (i + r) / 4 - r
        }, e.toByteArray = function(t) {
            for (var e, i = u(t), r = i[0], o = i[1], s = new a(function(t, e, i) {
                    return 3 * (e + i) / 4 - i
                }(0, r, o)), d = 0, f = o > 0 ? r - 4 : r, c = 0; c < f; c += 4) e = n[t.charCodeAt(c)] << 18 | n[t.charCodeAt(c + 1)] << 12 | n[t.charCodeAt(c + 2)] << 6 | n[t.charCodeAt(c + 3)], s[d++] = e >> 16 & 255, s[d++] = e >> 8 & 255, s[d++] = 255 & e;
            2 === o && (e = n[t.charCodeAt(c)] << 2 | n[t.charCodeAt(c + 1)] >> 4, s[d++] = 255 & e);
            1 === o && (e = n[t.charCodeAt(c)] << 10 | n[t.charCodeAt(c + 1)] << 4 | n[t.charCodeAt(c + 2)] >> 2, s[d++] = e >> 8 & 255, s[d++] = 255 & e);
            return s
        }, e.fromByteArray = function(t) {
            for (var e, i = t.length, n = i % 3, a = [], o = 0, s = i - n; o < s; o += 16383) a.push(f(t, o, o + 16383 > s ? s : o + 16383));
            1 === n ? (e = t[i - 1], a.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === n && (e = (t[i - 2] << 8) + t[i - 1], a.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
            return a.join("")
        };
        for (var r = [], n = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, d = o.length; s < d; ++s) r[s] = o[s], n[o.charCodeAt(s)] = s;

        function u(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var i = t.indexOf("=");
            return -1 === i && (i = e), [i, i === e ? 0 : 4 - i % 4]
        }

        function f(t, e, i) {
            for (var n, a, o = [], s = e; s < i; s += 3) n = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), o.push(r[(a = n) >> 18 & 63] + r[a >> 12 & 63] + r[a >> 6 & 63] + r[63 & a]);
            return o.join("")
        }
        n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
    },
    HEbw: function(t, e, i) {
        "use strict";
        e.randomBytes = e.rng = e.pseudoRandomBytes = e.prng = i("Edxu"), e.createHash = e.Hash = i("mObS"), e.createHmac = e.Hmac = i("Giow");
        var r = i("EW2V"),
            n = Object.keys(r),
            a = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(n);
        e.getHashes = function() {
            return a
        };
        var o = i("oJl4");
        e.pbkdf2 = o.pbkdf2, e.pbkdf2Sync = o.pbkdf2Sync;
        var s = i("lWpZ");
        e.Cipher = s.Cipher, e.createCipher = s.createCipher, e.Cipheriv = s.Cipheriv, e.createCipheriv = s.createCipheriv, e.Decipher = s.Decipher, e.createDecipher = s.createDecipher, e.Decipheriv = s.Decipheriv, e.createDecipheriv = s.createDecipheriv, e.getCiphers = s.getCiphers, e.listCiphers = s.listCiphers;
        var d = i("ANxK");
        e.DiffieHellmanGroup = d.DiffieHellmanGroup, e.createDiffieHellmanGroup = d.createDiffieHellmanGroup, e.getDiffieHellman = d.getDiffieHellman, e.createDiffieHellman = d.createDiffieHellman, e.DiffieHellman = d.DiffieHellman;
        var u = i("tpL1");
        e.createSign = u.createSign, e.Sign = u.Sign, e.createVerify = u.createVerify, e.Verify = u.Verify, e.createECDH = i("4dMO");
        var f = i("ZEK9");
        e.publicEncrypt = f.publicEncrypt, e.privateEncrypt = f.privateEncrypt, e.publicDecrypt = f.publicDecrypt, e.privateDecrypt = f.privateDecrypt;
        var c = i("dcwN");
        e.randomFill = c.randomFill, e.randomFillSync = c.randomFillSync, e.createCredentials = function() {
            throw new Error(["sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify"].join("\n"))
        }, e.constants = {
            DH_CHECK_P_NOT_SAFE_PRIME: 2,
            DH_CHECK_P_NOT_PRIME: 1,
            DH_UNABLE_TO_CHECK_GENERATOR: 4,
            DH_NOT_SUITABLE_GENERATOR: 8,
            NPN_ENABLED: 1,
            ALPN_ENABLED: 1,
            RSA_PKCS1_PADDING: 1,
            RSA_SSLV23_PADDING: 2,
            RSA_NO_PADDING: 3,
            RSA_PKCS1_OAEP_PADDING: 4,
            RSA_X931_PADDING: 5,
            RSA_PKCS1_PSS_PADDING: 6,
            POINT_CONVERSION_COMPRESSED: 2,
            POINT_CONVERSION_UNCOMPRESSED: 4,
            POINT_CONVERSION_HYBRID: 6
        }
    },
    Hjy1: function(t, e, i) {
        (function(e) {
            var r = i("ZDAU"),
                n = i("FUXG"),
                a = i("P7XM"),
                o = {
                    "des-ede3-cbc": n.CBC.instantiate(n.EDE),
                    "des-ede3": n.EDE,
                    "des-ede-cbc": n.CBC.instantiate(n.EDE),
                    "des-ede": n.EDE,
                    "des-cbc": n.CBC.instantiate(n.DES),
                    "des-ecb": n.DES
                };

            function s(t) {
                r.call(this);
                var i, n = t.mode.toLowerCase(),
                    a = o[n];
                i = t.decrypt ? "decrypt" : "encrypt";
                var s = t.key;
                "des-ede" !== n && "des-ede-cbc" !== n || (s = e.concat([s, s.slice(0, 8)]));
                var d = t.iv;
                this._des = a.create({
                    key: s,
                    iv: d,
                    type: i
                })
            }
            o.des = o["des-cbc"], o.des3 = o["des-ede3-cbc"], t.exports = s, a(s, r), s.prototype._update = function(t) {
                return new e(this._des.update(t))
            }, s.prototype._final = function() {
                return new e(this._des.final())
            }
        }).call(this, i("tjlA").Buffer)
    },
    IG1u: function(t, e, i) {
        (function(e, r) {
            var n, a = i("fSpj"),
                o = i("n53Y"),
                s = i("4Hv8"),
                d = i("hwdV").Buffer,
                u = e.crypto && e.crypto.subtle,
                f = {
                    sha: "SHA-1",
                    "sha-1": "SHA-1",
                    sha1: "SHA-1",
                    sha256: "SHA-256",
                    "sha-256": "SHA-256",
                    sha384: "SHA-384",
                    "sha-384": "SHA-384",
                    "sha-512": "SHA-512",
                    sha512: "SHA-512"
                },
                c = [];

            function l(t, e, i, r, n) {
                return u.importKey("raw", t, {
                    name: "PBKDF2"
                }, !1, ["deriveBits"]).then(function(t) {
                    return u.deriveBits({
                        name: "PBKDF2",
                        salt: e,
                        iterations: i,
                        hash: {
                            name: n
                        }
                    }, t, r << 3)
                }).then(function(t) {
                    return d.from(t)
                })
            }
            t.exports = function(t, i, h, p, _, y) {
                "function" == typeof _ && (y = _, _ = void 0);
                var b = f[(_ = _ || "sha1").toLowerCase()];
                if (!b || "function" != typeof e.Promise) return r.nextTick(function() {
                    var e;
                    try {
                        e = s(t, i, h, p, _)
                    } catch (t) {
                        return y(t)
                    }
                    y(null, e)
                });
                if (a(t, i, h, p), "function" != typeof y) throw new Error("No callback provided to pbkdf2");
                d.isBuffer(t) || (t = d.from(t, o)), d.isBuffer(i) || (i = d.from(i, o)),
                    function(t, e) {
                        t.then(function(t) {
                            r.nextTick(function() {
                                e(null, t)
                            })
                        }, function(t) {
                            r.nextTick(function() {
                                e(t)
                            })
                        })
                    }(function(t) {
                        if (e.process && !e.process.browser) return Promise.resolve(!1);
                        if (!u || !u.importKey || !u.deriveBits) return Promise.resolve(!1);
                        if (void 0 !== c[t]) return c[t];
                        var i = l(n = n || d.alloc(8), n, 10, 128, t).then(function() {
                            return !0
                        }).catch(function() {
                            return !1
                        });
                        return c[t] = i, i
                    }(b).then(function(e) {
                        return e ? l(t, i, h, p, b) : s(t, i, h, p, _)
                    }), y)
            }
        }).call(this, i("yLpj"), i("8oxB"))
    },
    IPZY: function(t, e, i) {
        var r = e;
        r.der = i("z71Z"), r.pem = i("jfd1")
    },
    ITfd: function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("2j6C");

        function a(t, e, i) {
            if (!(this instanceof a)) return new a(t, e, i);
            this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(e, i))
        }
        t.exports = a, a.prototype._init = function(t) {
            t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), n(t.length <= this.blockSize);
            for (var e = t.length; e < this.blockSize; e++) t.push(0);
            for (e = 0; e < t.length; e++) t[e] ^= 54;
            for (this.inner = (new this.Hash).update(t), e = 0; e < t.length; e++) t[e] ^= 106;
            this.outer = (new this.Hash).update(t)
        }, a.prototype.update = function(t, e) {
            return this.inner.update(t, e), this
        }, a.prototype.digest = function(t) {
            return this.outer.update(this.inner.digest()), this.outer.digest(t)
        }
    },
    J78i: function(t, e, i) {
        "use strict";
        t.exports = a;
        var r = i("sZro"),
            n = i("Onz0");

        function a(t) {
            if (!(this instanceof a)) return new a(t);
            r.call(this, t), this._transformState = {
                afterTransform: function(t, e) {
                    var i = this._transformState;
                    i.transforming = !1;
                    var r = i.writecb;
                    if (!r) return this.emit("error", new Error("write callback called multiple times"));
                    i.writechunk = null, i.writecb = null, null != e && this.push(e), r(t);
                    var n = this._readableState;
                    n.reading = !1, (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
                }.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null
            }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.on("prefinish", o)
        }

        function o() {
            var t = this;
            "function" == typeof this._flush ? this._flush(function(e, i) {
                s(t, e, i)
            }) : s(this, null, null)
        }

        function s(t, e, i) {
            if (e) return t.emit("error", e);
            if (null != i && t.push(i), t._writableState.length) throw new Error("Calling transform done when ws.length != 0");
            if (t._transformState.transforming) throw new Error("Calling transform done when still transforming");
            return t.push(null)
        }
        n.inherits = i("P7XM"), n.inherits(a, r), a.prototype.push = function(t, e) {
            return this._transformState.needTransform = !1, r.prototype.push.call(this, t, e)
        }, a.prototype._transform = function(t, e, i) {
            throw new Error("_transform() is not implemented")
        }, a.prototype._write = function(t, e, i) {
            var r = this._transformState;
            if (r.writecb = i, r.writechunk = t, r.writeencoding = e, !r.transforming) {
                var n = this._readableState;
                (r.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
            }
        }, a.prototype._read = function(t) {
            var e = this._transformState;
            null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
        }, a.prototype._destroy = function(t, e) {
            var i = this;
            r.prototype._destroy.call(this, t, function(t) {
                e(t), i.emit("close")
            })
        }
    },
    KAEN: function(t) {
        t.exports = {
            name: "elliptic",
            version: "6.4.0",
            description: "EC cryptography",
            main: "lib/elliptic.js",
            files: ["lib"],
            scripts: {
                jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                lint: "npm run jscs && npm run jshint",
                unit: "istanbul test _mocha --reporter=spec test/index.js",
                test: "npm run lint && npm run unit",
                version: "grunt dist && git add dist/"
            },
            repository: {
                type: "git",
                url: "git@github.com:indutny/elliptic"
            },
            keywords: ["EC", "Elliptic", "curve", "Cryptography"],
            author: "Fedor Indutny <fedor@indutny.com>",
            license: "MIT",
            bugs: {
                url: "https://github.com/indutny/elliptic/issues"
            },
            homepage: "https://github.com/indutny/elliptic",
            devDependencies: {
                brfs: "^1.4.3",
                coveralls: "^2.11.3",
                grunt: "^0.4.5",
                "grunt-browserify": "^5.0.0",
                "grunt-cli": "^1.2.0",
                "grunt-contrib-connect": "^1.0.0",
                "grunt-contrib-copy": "^1.0.0",
                "grunt-contrib-uglify": "^1.0.1",
                "grunt-mocha-istanbul": "^3.0.1",
                "grunt-saucelabs": "^8.6.2",
                istanbul: "^0.4.2",
                jscs: "^2.9.0",
                jshint: "^2.6.0",
                mocha: "^2.1.0"
            },
            dependencies: {
                "bn.js": "^4.4.0",
                brorand: "^1.0.1",
                "hash.js": "^1.0.0",
                "hmac-drbg": "^1.0.0",
                inherits: "^2.0.1",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.0"
            }
        }
    },
    Ku4m: function(t, e, i) {
        (function(e) {
            var r = i("QRH4"),
                n = i("1w4i"),
                a = i("TdD3"),
                o = i("/ab2"),
                s = i("oJl4");

            function d(t) {
                var i;
                "object" != typeof t || e.isBuffer(t) || (i = t.passphrase, t = t.key), "string" == typeof t && (t = new e(t));
                var d, u, f = a(t, i),
                    c = f.tag,
                    l = f.data;
                switch (c) {
                    case "CERTIFICATE":
                        u = r.certificate.decode(l, "der").tbsCertificate.subjectPublicKeyInfo;
                    case "PUBLIC KEY":
                        switch (u || (u = r.PublicKey.decode(l, "der")), d = u.algorithm.algorithm.join(".")) {
                            case "1.2.840.113549.1.1.1":
                                return r.RSAPublicKey.decode(u.subjectPublicKey.data, "der");
                            case "1.2.840.10045.2.1":
                                return u.subjectPrivateKey = u.subjectPublicKey, {
                                    type: "ec",
                                    data: u
                                };
                            case "1.2.840.10040.4.1":
                                return u.algorithm.params.pub_key = r.DSAparam.decode(u.subjectPublicKey.data, "der"), {
                                    type: "dsa",
                                    data: u.algorithm.params
                                };
                            default:
                                throw new Error("unknown key id " + d)
                        }
                        throw new Error("unknown key type " + c);
                    case "ENCRYPTED PRIVATE KEY":
                        l = function(t, i) {
                            var r = t.algorithm.decrypt.kde.kdeparams.salt,
                                a = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
                                d = n[t.algorithm.decrypt.cipher.algo.join(".")],
                                u = t.algorithm.decrypt.cipher.iv,
                                f = t.subjectPrivateKey,
                                c = parseInt(d.split("-")[1], 10) / 8,
                                l = s.pbkdf2Sync(i, r, a, c),
                                h = o.createDecipheriv(d, l, u),
                                p = [];
                            return p.push(h.update(f)), p.push(h.final()), e.concat(p)
                        }(l = r.EncryptedPrivateKey.decode(l, "der"), i);
                    case "PRIVATE KEY":
                        switch (d = (u = r.PrivateKey.decode(l, "der")).algorithm.algorithm.join(".")) {
                            case "1.2.840.113549.1.1.1":
                                return r.RSAPrivateKey.decode(u.subjectPrivateKey, "der");
                            case "1.2.840.10045.2.1":
                                return {
                                    curve: u.algorithm.curve,
                                    privateKey: r.ECPrivateKey.decode(u.subjectPrivateKey, "der").privateKey
                                };
                            case "1.2.840.10040.4.1":
                                return u.algorithm.params.priv_key = r.DSAparam.decode(u.subjectPrivateKey, "der"), {
                                    type: "dsa",
                                    params: u.algorithm.params
                                };
                            default:
                                throw new Error("unknown key id " + d)
                        }
                        throw new Error("unknown key type " + c);
                    case "RSA PUBLIC KEY":
                        return r.RSAPublicKey.decode(l, "der");
                    case "RSA PRIVATE KEY":
                        return r.RSAPrivateKey.decode(l, "der");
                    case "DSA PRIVATE KEY":
                        return {
                            type: "dsa",
                            params: r.DSAPrivateKey.decode(l, "der")
                        };
                    case "EC PRIVATE KEY":
                        return {
                            curve: (l = r.ECPrivateKey.decode(l, "der")).parameters.value,
                            privateKey: l.privateKey
                        };
                    default:
                        throw new Error("unknown key type " + c)
                }
            }
            t.exports = d, d.signature = r.signature
        }).call(this, i("tjlA").Buffer)
    },
    LGOv: function(t, e, i) {
        t.exports = i("3BRs")
    },
    MwBp: function(t, e, i) {
        "use strict";
        var r = i("QTa/"),
            n = i("MzeL"),
            a = i("OZ/i"),
            o = i("P7XM"),
            s = r.base,
            d = n.utils.assert;

        function u(t) {
            s.call(this, "short", t), this.a = new a(t.a, 16).toRed(this.red), this.b = new a(t.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(t), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
        }

        function f(t, e, i, r) {
            s.BasePoint.call(this, t, "affine"), null === e && null === i ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new a(e, 16), this.y = new a(i, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
        }

        function c(t, e, i, r) {
            s.BasePoint.call(this, t, "jacobian"), null === e && null === i && null === r ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new a(0)) : (this.x = new a(e, 16), this.y = new a(i, 16), this.z = new a(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
        }
        o(u, s), t.exports = u, u.prototype._getEndomorphism = function(t) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                var e, i;
                if (t.beta) e = new a(t.beta, 16).toRed(this.red);
                else {
                    var r = this._getEndoRoots(this.p);
                    e = (e = r[0].cmp(r[1]) < 0 ? r[0] : r[1]).toRed(this.red)
                }
                if (t.lambda) i = new a(t.lambda, 16);
                else {
                    var n = this._getEndoRoots(this.n);
                    0 === this.g.mul(n[0]).x.cmp(this.g.x.redMul(e)) ? i = n[0] : (i = n[1], d(0 === this.g.mul(i).x.cmp(this.g.x.redMul(e))))
                }
                return {
                    beta: e,
                    lambda: i,
                    basis: t.basis ? t.basis.map(function(t) {
                        return {
                            a: new a(t.a, 16),
                            b: new a(t.b, 16)
                        }
                    }) : this._getEndoBasis(i)
                }
            }
        }, u.prototype._getEndoRoots = function(t) {
            var e = t === this.p ? this.red : a.mont(t),
                i = new a(2).toRed(e).redInvm(),
                r = i.redNeg(),
                n = new a(3).toRed(e).redNeg().redSqrt().redMul(i);
            return [r.redAdd(n).fromRed(), r.redSub(n).fromRed()]
        }, u.prototype._getEndoBasis = function(t) {
            for (var e, i, r, n, o, s, d, u, f, c = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), l = t, h = this.n.clone(), p = new a(1), _ = new a(0), y = new a(0), b = new a(1), g = 0; 0 !== l.cmpn(0);) {
                var v = h.div(l);
                u = h.sub(v.mul(l)), f = y.sub(v.mul(p));
                var m = b.sub(v.mul(_));
                if (!r && u.cmp(c) < 0) e = d.neg(), i = p, r = u.neg(), n = f;
                else if (r && 2 == ++g) break;
                d = u, h = l, l = u, y = p, p = f, b = _, _ = m
            }
            o = u.neg(), s = f;
            var A = r.sqr().add(n.sqr());
            return o.sqr().add(s.sqr()).cmp(A) >= 0 && (o = e, s = i), r.negative && (r = r.neg(), n = n.neg()), o.negative && (o = o.neg(), s = s.neg()), [{
                a: r,
                b: n
            }, {
                a: o,
                b: s
            }]
        }, u.prototype._endoSplit = function(t) {
            var e = this.endo.basis,
                i = e[0],
                r = e[1],
                n = r.b.mul(t).divRound(this.n),
                a = i.b.neg().mul(t).divRound(this.n),
                o = n.mul(i.a),
                s = a.mul(r.a),
                d = n.mul(i.b),
                u = a.mul(r.b);
            return {
                k1: t.sub(o).sub(s),
                k2: d.add(u).neg()
            }
        }, u.prototype.pointFromX = function(t, e) {
            (t = new a(t, 16)).red || (t = t.toRed(this.red));
            var i = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
                r = i.redSqrt();
            if (0 !== r.redSqr().redSub(i).cmp(this.zero)) throw new Error("invalid point");
            var n = r.fromRed().isOdd();
            return (e && !n || !e && n) && (r = r.redNeg()), this.point(t, r)
        }, u.prototype.validate = function(t) {
            if (t.inf) return !0;
            var e = t.x,
                i = t.y,
                r = this.a.redMul(e),
                n = e.redSqr().redMul(e).redIAdd(r).redIAdd(this.b);
            return 0 === i.redSqr().redISub(n).cmpn(0)
        }, u.prototype._endoWnafMulAdd = function(t, e, i) {
            for (var r = this._endoWnafT1, n = this._endoWnafT2, a = 0; a < t.length; a++) {
                var o = this._endoSplit(e[a]),
                    s = t[a],
                    d = s._getBeta();
                o.k1.negative && (o.k1.ineg(), s = s.neg(!0)), o.k2.negative && (o.k2.ineg(), d = d.neg(!0)), r[2 * a] = s, r[2 * a + 1] = d, n[2 * a] = o.k1, n[2 * a + 1] = o.k2
            }
            for (var u = this._wnafMulAdd(1, r, n, 2 * a, i), f = 0; f < 2 * a; f++) r[f] = null, n[f] = null;
            return u
        }, o(f, s.BasePoint), u.prototype.point = function(t, e, i) {
            return new f(this, t, e, i)
        }, u.prototype.pointFromJSON = function(t, e) {
            return f.fromJSON(this, t, e)
        }, f.prototype._getBeta = function() {
            if (this.curve.endo) {
                var t = this.precomputed;
                if (t && t.beta) return t.beta;
                var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                if (t) {
                    var i = this.curve,
                        r = function(t) {
                            return i.point(t.x.redMul(i.endo.beta), t.y)
                        };
                    t.beta = e, e.precomputed = {
                        beta: null,
                        naf: t.naf && {
                            wnd: t.naf.wnd,
                            points: t.naf.points.map(r)
                        },
                        doubles: t.doubles && {
                            step: t.doubles.step,
                            points: t.doubles.points.map(r)
                        }
                    }
                }
                return e
            }
        }, f.prototype.toJSON = function() {
            return this.precomputed ? [this.x, this.y, this.precomputed && {
                doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1)
                }
            }] : [this.x, this.y]
        }, f.fromJSON = function(t, e, i) {
            "string" == typeof e && (e = JSON.parse(e));
            var r = t.point(e[0], e[1], i);
            if (!e[2]) return r;

            function n(e) {
                return t.point(e[0], e[1], i)
            }
            var a = e[2];
            return r.precomputed = {
                beta: null,
                doubles: a.doubles && {
                    step: a.doubles.step,
                    points: [r].concat(a.doubles.points.map(n))
                },
                naf: a.naf && {
                    wnd: a.naf.wnd,
                    points: [r].concat(a.naf.points.map(n))
                }
            }, r
        }, f.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
        }, f.prototype.isInfinity = function() {
            return this.inf
        }, f.prototype.add = function(t) {
            if (this.inf) return t;
            if (t.inf) return this;
            if (this.eq(t)) return this.dbl();
            if (this.neg().eq(t)) return this.curve.point(null, null);
            if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
            var e = this.y.redSub(t.y);
            0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
            var i = e.redSqr().redISub(this.x).redISub(t.x),
                r = e.redMul(this.x.redSub(i)).redISub(this.y);
            return this.curve.point(i, r)
        }, f.prototype.dbl = function() {
            if (this.inf) return this;
            var t = this.y.redAdd(this.y);
            if (0 === t.cmpn(0)) return this.curve.point(null, null);
            var e = this.curve.a,
                i = this.x.redSqr(),
                r = t.redInvm(),
                n = i.redAdd(i).redIAdd(i).redIAdd(e).redMul(r),
                a = n.redSqr().redISub(this.x.redAdd(this.x)),
                o = n.redMul(this.x.redSub(a)).redISub(this.y);
            return this.curve.point(a, o)
        }, f.prototype.getX = function() {
            return this.x.fromRed()
        }, f.prototype.getY = function() {
            return this.y.fromRed()
        }, f.prototype.mul = function(t) {
            return t = new a(t, 16), this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t)
        }, f.prototype.mulAdd = function(t, e, i) {
            var r = [this, e],
                n = [t, i];
            return this.curve.endo ? this.curve._endoWnafMulAdd(r, n) : this.curve._wnafMulAdd(1, r, n, 2)
        }, f.prototype.jmulAdd = function(t, e, i) {
            var r = [this, e],
                n = [t, i];
            return this.curve.endo ? this.curve._endoWnafMulAdd(r, n, !0) : this.curve._wnafMulAdd(1, r, n, 2, !0)
        }, f.prototype.eq = function(t) {
            return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))
        }, f.prototype.neg = function(t) {
            if (this.inf) return this;
            var e = this.curve.point(this.x, this.y.redNeg());
            if (t && this.precomputed) {
                var i = this.precomputed,
                    r = function(t) {
                        return t.neg()
                    };
                e.precomputed = {
                    naf: i.naf && {
                        wnd: i.naf.wnd,
                        points: i.naf.points.map(r)
                    },
                    doubles: i.doubles && {
                        step: i.doubles.step,
                        points: i.doubles.points.map(r)
                    }
                }
            }
            return e
        }, f.prototype.toJ = function() {
            return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
        }, o(c, s.BasePoint), u.prototype.jpoint = function(t, e, i) {
            return new c(this, t, e, i)
        }, c.prototype.toP = function() {
            if (this.isInfinity()) return this.curve.point(null, null);
            var t = this.z.redInvm(),
                e = t.redSqr(),
                i = this.x.redMul(e),
                r = this.y.redMul(e).redMul(t);
            return this.curve.point(i, r)
        }, c.prototype.neg = function() {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
        }, c.prototype.add = function(t) {
            if (this.isInfinity()) return t;
            if (t.isInfinity()) return this;
            var e = t.z.redSqr(),
                i = this.z.redSqr(),
                r = this.x.redMul(e),
                n = t.x.redMul(i),
                a = this.y.redMul(e.redMul(t.z)),
                o = t.y.redMul(i.redMul(this.z)),
                s = r.redSub(n),
                d = a.redSub(o);
            if (0 === s.cmpn(0)) return 0 !== d.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var u = s.redSqr(),
                f = u.redMul(s),
                c = r.redMul(u),
                l = d.redSqr().redIAdd(f).redISub(c).redISub(c),
                h = d.redMul(c.redISub(l)).redISub(a.redMul(f)),
                p = this.z.redMul(t.z).redMul(s);
            return this.curve.jpoint(l, h, p)
        }, c.prototype.mixedAdd = function(t) {
            if (this.isInfinity()) return t.toJ();
            if (t.isInfinity()) return this;
            var e = this.z.redSqr(),
                i = this.x,
                r = t.x.redMul(e),
                n = this.y,
                a = t.y.redMul(e).redMul(this.z),
                o = i.redSub(r),
                s = n.redSub(a);
            if (0 === o.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var d = o.redSqr(),
                u = d.redMul(o),
                f = i.redMul(d),
                c = s.redSqr().redIAdd(u).redISub(f).redISub(f),
                l = s.redMul(f.redISub(c)).redISub(n.redMul(u)),
                h = this.z.redMul(o);
            return this.curve.jpoint(c, l, h)
        }, c.prototype.dblp = function(t) {
            if (0 === t) return this;
            if (this.isInfinity()) return this;
            if (!t) return this.dbl();
            if (this.curve.zeroA || this.curve.threeA) {
                for (var e = this, i = 0; i < t; i++) e = e.dbl();
                return e
            }
            var r = this.curve.a,
                n = this.curve.tinv,
                a = this.x,
                o = this.y,
                s = this.z,
                d = s.redSqr().redSqr(),
                u = o.redAdd(o);
            for (i = 0; i < t; i++) {
                var f = a.redSqr(),
                    c = u.redSqr(),
                    l = c.redSqr(),
                    h = f.redAdd(f).redIAdd(f).redIAdd(r.redMul(d)),
                    p = a.redMul(c),
                    _ = h.redSqr().redISub(p.redAdd(p)),
                    y = p.redISub(_),
                    b = h.redMul(y);
                b = b.redIAdd(b).redISub(l);
                var g = u.redMul(s);
                i + 1 < t && (d = d.redMul(l)), a = _, s = g, u = b
            }
            return this.curve.jpoint(a, u.redMul(n), s)
        }, c.prototype.dbl = function() {
            return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
        }, c.prototype._zeroDbl = function() {
            var t, e, i;
            if (this.zOne) {
                var r = this.x.redSqr(),
                    n = this.y.redSqr(),
                    a = n.redSqr(),
                    o = this.x.redAdd(n).redSqr().redISub(r).redISub(a);
                o = o.redIAdd(o);
                var s = r.redAdd(r).redIAdd(r),
                    d = s.redSqr().redISub(o).redISub(o),
                    u = a.redIAdd(a);
                u = (u = u.redIAdd(u)).redIAdd(u), t = d, e = s.redMul(o.redISub(d)).redISub(u), i = this.y.redAdd(this.y)
            } else {
                var f = this.x.redSqr(),
                    c = this.y.redSqr(),
                    l = c.redSqr(),
                    h = this.x.redAdd(c).redSqr().redISub(f).redISub(l);
                h = h.redIAdd(h);
                var p = f.redAdd(f).redIAdd(f),
                    _ = p.redSqr(),
                    y = l.redIAdd(l);
                y = (y = y.redIAdd(y)).redIAdd(y), t = _.redISub(h).redISub(h), e = p.redMul(h.redISub(t)).redISub(y), i = (i = this.y.redMul(this.z)).redIAdd(i)
            }
            return this.curve.jpoint(t, e, i)
        }, c.prototype._threeDbl = function() {
            var t, e, i;
            if (this.zOne) {
                var r = this.x.redSqr(),
                    n = this.y.redSqr(),
                    a = n.redSqr(),
                    o = this.x.redAdd(n).redSqr().redISub(r).redISub(a);
                o = o.redIAdd(o);
                var s = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),
                    d = s.redSqr().redISub(o).redISub(o);
                t = d;
                var u = a.redIAdd(a);
                u = (u = u.redIAdd(u)).redIAdd(u), e = s.redMul(o.redISub(d)).redISub(u), i = this.y.redAdd(this.y)
            } else {
                var f = this.z.redSqr(),
                    c = this.y.redSqr(),
                    l = this.x.redMul(c),
                    h = this.x.redSub(f).redMul(this.x.redAdd(f));
                h = h.redAdd(h).redIAdd(h);
                var p = l.redIAdd(l),
                    _ = (p = p.redIAdd(p)).redAdd(p);
                t = h.redSqr().redISub(_), i = this.y.redAdd(this.z).redSqr().redISub(c).redISub(f);
                var y = c.redSqr();
                y = (y = (y = y.redIAdd(y)).redIAdd(y)).redIAdd(y), e = h.redMul(p.redISub(t)).redISub(y)
            }
            return this.curve.jpoint(t, e, i)
        }, c.prototype._dbl = function() {
            var t = this.curve.a,
                e = this.x,
                i = this.y,
                r = this.z,
                n = r.redSqr().redSqr(),
                a = e.redSqr(),
                o = i.redSqr(),
                s = a.redAdd(a).redIAdd(a).redIAdd(t.redMul(n)),
                d = e.redAdd(e),
                u = (d = d.redIAdd(d)).redMul(o),
                f = s.redSqr().redISub(u.redAdd(u)),
                c = u.redISub(f),
                l = o.redSqr();
            l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
            var h = s.redMul(c).redISub(l),
                p = i.redAdd(i).redMul(r);
            return this.curve.jpoint(f, h, p)
        }, c.prototype.trpl = function() {
            if (!this.curve.zeroA) return this.dbl().add(this);
            var t = this.x.redSqr(),
                e = this.y.redSqr(),
                i = this.z.redSqr(),
                r = e.redSqr(),
                n = t.redAdd(t).redIAdd(t),
                a = n.redSqr(),
                o = this.x.redAdd(e).redSqr().redISub(t).redISub(r),
                s = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(a)).redSqr(),
                d = r.redIAdd(r);
            d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
            var u = n.redIAdd(o).redSqr().redISub(a).redISub(s).redISub(d),
                f = e.redMul(u);
            f = (f = f.redIAdd(f)).redIAdd(f);
            var c = this.x.redMul(s).redISub(f);
            c = (c = c.redIAdd(c)).redIAdd(c);
            var l = this.y.redMul(u.redMul(d.redISub(u)).redISub(o.redMul(s)));
            l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
            var h = this.z.redAdd(o).redSqr().redISub(i).redISub(s);
            return this.curve.jpoint(c, l, h)
        }, c.prototype.mul = function(t, e) {
            return t = new a(t, e), this.curve._wnafMul(this, t)
        }, c.prototype.eq = function(t) {
            if ("affine" === t.type) return this.eq(t.toJ());
            if (this === t) return !0;
            var e = this.z.redSqr(),
                i = t.z.redSqr();
            if (0 !== this.x.redMul(i).redISub(t.x.redMul(e)).cmpn(0)) return !1;
            var r = e.redMul(this.z),
                n = i.redMul(t.z);
            return 0 === this.y.redMul(n).redISub(t.y.redMul(r)).cmpn(0)
        }, c.prototype.eqXToP = function(t) {
            var e = this.z.redSqr(),
                i = t.toRed(this.curve.red).redMul(e);
            if (0 === this.x.cmp(i)) return !0;
            for (var r = t.clone(), n = this.curve.redN.redMul(e);;) {
                if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
                if (i.redIAdd(n), 0 === this.x.cmp(i)) return !0
            }
            return !1
        }, c.prototype.inspect = function() {
            return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
        }, c.prototype.isInfinity = function() {
            return 0 === this.z.cmpn(0)
        }
    },
    MzeL: function(t, e, i) {
        "use strict";
        var r = e;
        r.version = i("KAEN").version, r.utils = i("86MQ"), r.rand = i("/ayr"), r.curve = i("QTa/"), r.curves = i("DLvh"), r.ec = i("uagp"), r.eddsa = i("lF1L")
    },
    N2jm: function(t, e, i) {
        var r = i("P7XM"),
            n = i("tjlA").Buffer,
            a = i("f3pb"),
            o = a.base,
            s = a.constants.der;

        function d(t) {
            this.enc = "der", this.name = t.name, this.entity = t, this.tree = new u, this.tree._init(t.body)
        }

        function u(t) {
            o.Node.call(this, "der", t)
        }

        function f(t) {
            return t < 10 ? "0" + t : t
        }
        t.exports = d, d.prototype.encode = function(t, e) {
            return this.tree._encode(t, e).join()
        }, r(u, o.Node), u.prototype._encodeComposite = function(t, e, i, r) {
            var a, o = function(t, e, i, r) {
                var n;
                "seqof" === t ? t = "seq" : "setof" === t && (t = "set");
                if (s.tagByName.hasOwnProperty(t)) n = s.tagByName[t];
                else {
                    if ("number" != typeof t || (0 | t) !== t) return r.error("Unknown tag: " + t);
                    n = t
                }
                if (n >= 31) return r.error("Multi-octet tag encoding unsupported");
                e || (n |= 32);
                return n |= s.tagClassByName[i || "universal"] << 6
            }(t, e, i, this.reporter);
            if (r.length < 128) return (a = new n(2))[0] = o, a[1] = r.length, this._createEncoderBuffer([a, r]);
            for (var d = 1, u = r.length; u >= 256; u >>= 8) d++;
            (a = new n(2 + d))[0] = o, a[1] = 128 | d;
            u = 1 + d;
            for (var f = r.length; f > 0; u--, f >>= 8) a[u] = 255 & f;
            return this._createEncoderBuffer([a, r])
        }, u.prototype._encodeStr = function(t, e) {
            if ("bitstr" === e) return this._createEncoderBuffer([0 | t.unused, t.data]);
            if ("bmpstr" === e) {
                for (var i = new n(2 * t.length), r = 0; r < t.length; r++) i.writeUInt16BE(t.charCodeAt(r), 2 * r);
                return this._createEncoderBuffer(i)
            }
            return "numstr" === e ? this._isNumstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === e ? this._isPrintstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(e) ? this._createEncoderBuffer(t) : "objDesc" === e ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: " + e + " unsupported")
        }, u.prototype._encodeObjid = function(t, e, i) {
            if ("string" == typeof t) {
                if (!e) return this.reporter.error("string objid given, but no values map found");
                if (!e.hasOwnProperty(t)) return this.reporter.error("objid not found in values map");
                t = e[t].split(/[\s\.]+/g);
                for (var r = 0; r < t.length; r++) t[r] |= 0
            } else if (Array.isArray(t)) {
                t = t.slice();
                for (r = 0; r < t.length; r++) t[r] |= 0
            }
            if (!Array.isArray(t)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(t));
            if (!i) {
                if (t[1] >= 40) return this.reporter.error("Second objid identifier OOB");
                t.splice(0, 2, 40 * t[0] + t[1])
            }
            var a = 0;
            for (r = 0; r < t.length; r++) {
                var o = t[r];
                for (a++; o >= 128; o >>= 7) a++
            }
            var s = new n(a),
                d = s.length - 1;
            for (r = t.length - 1; r >= 0; r--) {
                o = t[r];
                for (s[d--] = 127 & o;
                    (o >>= 7) > 0;) s[d--] = 128 | 127 & o
            }
            return this._createEncoderBuffer(s)
        }, u.prototype._encodeTime = function(t, e) {
            var i, r = new Date(t);
            return "gentime" === e ? i = [f(r.getFullYear()), f(r.getUTCMonth() + 1), f(r.getUTCDate()), f(r.getUTCHours()), f(r.getUTCMinutes()), f(r.getUTCSeconds()), "Z"].join("") : "utctime" === e ? i = [f(r.getFullYear() % 100), f(r.getUTCMonth() + 1), f(r.getUTCDate()), f(r.getUTCHours()), f(r.getUTCMinutes()), f(r.getUTCSeconds()), "Z"].join("") : this.reporter.error("Encoding " + e + " time is not supported yet"), this._encodeStr(i, "octstr")
        }, u.prototype._encodeNull = function() {
            return this._createEncoderBuffer("")
        }, u.prototype._encodeInt = function(t, e) {
            if ("string" == typeof t) {
                if (!e) return this.reporter.error("String int or enum given, but no values map");
                if (!e.hasOwnProperty(t)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(t));
                t = e[t]
            }
            if ("number" != typeof t && !n.isBuffer(t)) {
                var i = t.toArray();
                !t.sign && 128 & i[0] && i.unshift(0), t = new n(i)
            }
            if (n.isBuffer(t)) {
                var r = t.length;
                0 === t.length && r++;
                var a = new n(r);
                return t.copy(a), 0 === t.length && (a[0] = 0), this._createEncoderBuffer(a)
            }
            if (t < 128) return this._createEncoderBuffer(t);
            if (t < 256) return this._createEncoderBuffer([0, t]);
            r = 1;
            for (var o = t; o >= 256; o >>= 8) r++;
            for (o = (a = new Array(r)).length - 1; o >= 0; o--) a[o] = 255 & t, t >>= 8;
            return 128 & a[0] && a.unshift(0), this._createEncoderBuffer(new n(a))
        }, u.prototype._encodeBool = function(t) {
            return this._createEncoderBuffer(t ? 255 : 0)
        }, u.prototype._use = function(t, e) {
            return "function" == typeof t && (t = t(e)), t._getEncoder("der").tree
        }, u.prototype._skipDefault = function(t, e, i) {
            var r, n = this._baseState;
            if (null === n.default) return !1;
            var a = t.join();
            if (void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, e, i).join()), a.length !== n.defaultBuffer.length) return !1;
            for (r = 0; r < a.length; r++)
                if (a[r] !== n.defaultBuffer[r]) return !1;
            return !0
        }
    },
    ND7S: function(t, e, i) {
        var r = e;
        r.der = i("N2jm"), r.pem = i("hbMA")
    },
    NQVK: function(t, e, i) {
        var r = i("hwdV").Buffer,
            n = i("jIre");

        function a(t, e, i) {
            var a = e.length,
                o = n(e, t._cache);
            return t._cache = t._cache.slice(a), t._prev = r.concat([t._prev, i ? e : o]), o
        }
        e.encrypt = function(t, e, i) {
            for (var n, o = r.allocUnsafe(0); e.length;) {
                if (0 === t._cache.length && (t._cache = t._cipher.encryptBlock(t._prev), t._prev = r.allocUnsafe(0)), !(t._cache.length <= e.length)) {
                    o = r.concat([o, a(t, e, i)]);
                    break
                }
                n = t._cache.length, o = r.concat([o, a(t, e.slice(0, n), i)]), e = e.slice(n)
            }
            return o
        }
    },
    "OA+I": function(t, e, i) {
        "use strict";
        var r = i("MzeL").utils,
            n = r.assert,
            a = r.parseBytes,
            o = r.cachedProperty;

        function s(t, e) {
            this.eddsa = t, this._secret = a(e.secret), t.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = a(e.pub)
        }
        s.fromPublic = function(t, e) {
            return e instanceof s ? e : new s(t, {
                pub: e
            })
        }, s.fromSecret = function(t, e) {
            return e instanceof s ? e : new s(t, {
                secret: e
            })
        }, s.prototype.secret = function() {
            return this._secret
        }, o(s, "pubBytes", function() {
            return this.eddsa.encodePoint(this.pub())
        }), o(s, "pub", function() {
            return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
        }), o(s, "privBytes", function() {
            var t = this.eddsa,
                e = this.hash(),
                i = t.encodingLength - 1,
                r = e.slice(0, t.encodingLength);
            return r[0] &= 248, r[i] &= 127, r[i] |= 64, r
        }), o(s, "priv", function() {
            return this.eddsa.decodeInt(this.privBytes())
        }), o(s, "hash", function() {
            return this.eddsa.hash().update(this.secret()).digest()
        }), o(s, "messagePrefix", function() {
            return this.hash().slice(this.eddsa.encodingLength)
        }), s.prototype.sign = function(t) {
            return n(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
        }, s.prototype.verify = function(t, e) {
            return this.eddsa.verify(t, e, this)
        }, s.prototype.getSecret = function(t) {
            return n(this._secret, "KeyPair is public only"), r.encode(this.secret(), t)
        }, s.prototype.getPublic = function(t) {
            return r.encode(this.pubBytes(), t)
        }, t.exports = s
    },
    "OZ/i": function(t, e, i) {
        (function(t) {
            ! function(t, e) {
                "use strict";

                function r(t, e) {
                    if (!t) throw new Error(e || "Assertion failed")
                }

                function n(t, e) {
                    t.super_ = e;
                    var i = function() {};
                    i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
                }

                function a(t, e, i) {
                    if (a.isBN(t)) return t;
                    this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (i = e, e = 10), this._init(t || 0, e || 10, i || "be"))
                }
                var o;
                "object" == typeof t ? t.exports = a : e.BN = a, a.BN = a, a.wordSize = 26;
                try {
                    o = i(62).Buffer
                } catch (t) {}

                function s(t, e, i) {
                    for (var r = 0, n = Math.min(t.length, i), a = e; a < n; a++) {
                        var o = t.charCodeAt(a) - 48;
                        r <<= 4, r |= o >= 49 && o <= 54 ? o - 49 + 10 : o >= 17 && o <= 22 ? o - 17 + 10 : 15 & o
                    }
                    return r
                }

                function d(t, e, i, r) {
                    for (var n = 0, a = Math.min(t.length, i), o = e; o < a; o++) {
                        var s = t.charCodeAt(o) - 48;
                        n *= r, n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                    }
                    return n
                }
                a.isBN = function(t) {
                    return t instanceof a || null !== t && "object" == typeof t && t.constructor.wordSize === a.wordSize && Array.isArray(t.words)
                }, a.max = function(t, e) {
                    return t.cmp(e) > 0 ? t : e
                }, a.min = function(t, e) {
                    return t.cmp(e) < 0 ? t : e
                }, a.prototype._init = function(t, e, i) {
                    if ("number" == typeof t) return this._initNumber(t, e, i);
                    if ("object" == typeof t) return this._initArray(t, e, i);
                    "hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
                    var n = 0;
                    "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === i && this._initArray(this.toArray(), e, i)
                }, a.prototype._initNumber = function(t, e, i) {
                    t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === i && this._initArray(this.toArray(), e, i)
                }, a.prototype._initArray = function(t, e, i) {
                    if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                    this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                    for (var n = 0; n < this.length; n++) this.words[n] = 0;
                    var a, o, s = 0;
                    if ("be" === i)
                        for (n = t.length - 1, a = 0; n >= 0; n -= 3) o = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[a] |= o << s & 67108863, this.words[a + 1] = o >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, a++);
                    else if ("le" === i)
                        for (n = 0, a = 0; n < t.length; n += 3) o = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[a] |= o << s & 67108863, this.words[a + 1] = o >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, a++);
                    return this.strip()
                }, a.prototype._parseHex = function(t, e) {
                    this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) this.words[i] = 0;
                    var r, n, a = 0;
                    for (i = t.length - 6, r = 0; i >= e; i -= 6) n = s(t, i, i + 6), this.words[r] |= n << a & 67108863, this.words[r + 1] |= n >>> 26 - a & 4194303, (a += 24) >= 26 && (a -= 26, r++);
                    i + 6 !== e && (n = s(t, e, i + 6), this.words[r] |= n << a & 67108863, this.words[r + 1] |= n >>> 26 - a & 4194303), this.strip()
                }, a.prototype._parseBase = function(t, e, i) {
                    this.words = [0], this.length = 1;
                    for (var r = 0, n = 1; n <= 67108863; n *= e) r++;
                    r--, n = n / e | 0;
                    for (var a = t.length - i, o = a % r, s = Math.min(a, a - o) + i, u = 0, f = i; f < s; f += r) u = d(t, f, f + r, e), this.imuln(n), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                    if (0 !== o) {
                        var c = 1;
                        for (u = d(t, f, t.length, e), f = 0; f < o; f++) c *= e;
                        this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                    }
                }, a.prototype.copy = function(t) {
                    t.words = new Array(this.length);
                    for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                    t.length = this.length, t.negative = this.negative, t.red = this.red
                }, a.prototype.clone = function() {
                    var t = new a(null);
                    return this.copy(t), t
                }, a.prototype._expand = function(t) {
                    for (; this.length < t;) this.words[this.length++] = 0;
                    return this
                }, a.prototype.strip = function() {
                    for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                    return this._normSign()
                }, a.prototype._normSign = function() {
                    return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                }, a.prototype.inspect = function() {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                };
                var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                    f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                function l(t, e, i) {
                    i.negative = e.negative ^ t.negative;
                    var r = t.length + e.length | 0;
                    i.length = r, r = r - 1 | 0;
                    var n = 0 | t.words[0],
                        a = 0 | e.words[0],
                        o = n * a,
                        s = 67108863 & o,
                        d = o / 67108864 | 0;
                    i.words[0] = s;
                    for (var u = 1; u < r; u++) {
                        for (var f = d >>> 26, c = 67108863 & d, l = Math.min(u, e.length - 1), h = Math.max(0, u - t.length + 1); h <= l; h++) {
                            var p = u - h | 0;
                            f += (o = (n = 0 | t.words[p]) * (a = 0 | e.words[h]) + c) / 67108864 | 0, c = 67108863 & o
                        }
                        i.words[u] = 0 | c, d = 0 | f
                    }
                    return 0 !== d ? i.words[u] = 0 | d : i.length--, i.strip()
                }
                a.prototype.toString = function(t, e) {
                    var i;
                    if (t = t || 10, e = 0 | e || 1, 16 === t || "hex" === t) {
                        i = "";
                        for (var n = 0, a = 0, o = 0; o < this.length; o++) {
                            var s = this.words[o],
                                d = (16777215 & (s << n | a)).toString(16);
                            i = 0 !== (a = s >>> 24 - n & 16777215) || o !== this.length - 1 ? u[6 - d.length] + d + i : d + i, (n += 2) >= 26 && (n -= 26, o--)
                        }
                        for (0 !== a && (i = a.toString(16) + i); i.length % e != 0;) i = "0" + i;
                        return 0 !== this.negative && (i = "-" + i), i
                    }
                    if (t === (0 | t) && t >= 2 && t <= 36) {
                        var l = f[t],
                            h = c[t];
                        i = "";
                        var p = this.clone();
                        for (p.negative = 0; !p.isZero();) {
                            var _ = p.modn(h).toString(t);
                            i = (p = p.idivn(h)).isZero() ? _ + i : u[l - _.length] + _ + i
                        }
                        for (this.isZero() && (i = "0" + i); i.length % e != 0;) i = "0" + i;
                        return 0 !== this.negative && (i = "-" + i), i
                    }
                    r(!1, "Base should be between 2 and 36")
                }, a.prototype.toNumber = function() {
                    var t = this.words[0];
                    return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                }, a.prototype.toJSON = function() {
                    return this.toString(16)
                }, a.prototype.toBuffer = function(t, e) {
                    return r(void 0 !== o), this.toArrayLike(o, t, e)
                }, a.prototype.toArray = function(t, e) {
                    return this.toArrayLike(Array, t, e)
                }, a.prototype.toArrayLike = function(t, e, i) {
                    var n = this.byteLength(),
                        a = i || Math.max(1, n);
                    r(n <= a, "byte array longer than desired length"), r(a > 0, "Requested array length <= 0"), this.strip();
                    var o, s, d = "le" === e,
                        u = new t(a),
                        f = this.clone();
                    if (d) {
                        for (s = 0; !f.isZero(); s++) o = f.andln(255), f.iushrn(8), u[s] = o;
                        for (; s < a; s++) u[s] = 0
                    } else {
                        for (s = 0; s < a - n; s++) u[s] = 0;
                        for (s = 0; !f.isZero(); s++) o = f.andln(255), f.iushrn(8), u[a - s - 1] = o
                    }
                    return u
                }, Math.clz32 ? a.prototype._countBits = function(t) {
                    return 32 - Math.clz32(t)
                } : a.prototype._countBits = function(t) {
                    var e = t,
                        i = 0;
                    return e >= 4096 && (i += 13, e >>>= 13), e >= 64 && (i += 7, e >>>= 7), e >= 8 && (i += 4, e >>>= 4), e >= 2 && (i += 2, e >>>= 2), i + e
                }, a.prototype._zeroBits = function(t) {
                    if (0 === t) return 26;
                    var e = t,
                        i = 0;
                    return 0 == (8191 & e) && (i += 13, e >>>= 13), 0 == (127 & e) && (i += 7, e >>>= 7), 0 == (15 & e) && (i += 4, e >>>= 4), 0 == (3 & e) && (i += 2, e >>>= 2), 0 == (1 & e) && i++, i
                }, a.prototype.bitLength = function() {
                    var t = this.words[this.length - 1],
                        e = this._countBits(t);
                    return 26 * (this.length - 1) + e
                }, a.prototype.zeroBits = function() {
                    if (this.isZero()) return 0;
                    for (var t = 0, e = 0; e < this.length; e++) {
                        var i = this._zeroBits(this.words[e]);
                        if (t += i, 26 !== i) break
                    }
                    return t
                }, a.prototype.byteLength = function() {
                    return Math.ceil(this.bitLength() / 8)
                }, a.prototype.toTwos = function(t) {
                    return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                }, a.prototype.fromTwos = function(t) {
                    return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                }, a.prototype.isNeg = function() {
                    return 0 !== this.negative
                }, a.prototype.neg = function() {
                    return this.clone().ineg()
                }, a.prototype.ineg = function() {
                    return this.isZero() || (this.negative ^= 1), this
                }, a.prototype.iuor = function(t) {
                    for (; this.length < t.length;) this.words[this.length++] = 0;
                    for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                    return this.strip()
                }, a.prototype.ior = function(t) {
                    return r(0 == (this.negative | t.negative)), this.iuor(t)
                }, a.prototype.or = function(t) {
                    return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                }, a.prototype.uor = function(t) {
                    return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                }, a.prototype.iuand = function(t) {
                    var e;
                    e = this.length > t.length ? t : this;
                    for (var i = 0; i < e.length; i++) this.words[i] = this.words[i] & t.words[i];
                    return this.length = e.length, this.strip()
                }, a.prototype.iand = function(t) {
                    return r(0 == (this.negative | t.negative)), this.iuand(t)
                }, a.prototype.and = function(t) {
                    return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                }, a.prototype.uand = function(t) {
                    return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                }, a.prototype.iuxor = function(t) {
                    var e, i;
                    this.length > t.length ? (e = this, i = t) : (e = t, i = this);
                    for (var r = 0; r < i.length; r++) this.words[r] = e.words[r] ^ i.words[r];
                    if (this !== e)
                        for (; r < e.length; r++) this.words[r] = e.words[r];
                    return this.length = e.length, this.strip()
                }, a.prototype.ixor = function(t) {
                    return r(0 == (this.negative | t.negative)), this.iuxor(t)
                }, a.prototype.xor = function(t) {
                    return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                }, a.prototype.uxor = function(t) {
                    return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                }, a.prototype.inotn = function(t) {
                    r("number" == typeof t && t >= 0);
                    var e = 0 | Math.ceil(t / 26),
                        i = t % 26;
                    this._expand(e), i > 0 && e--;
                    for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                    return i > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - i), this.strip()
                }, a.prototype.notn = function(t) {
                    return this.clone().inotn(t)
                }, a.prototype.setn = function(t, e) {
                    r("number" == typeof t && t >= 0);
                    var i = t / 26 | 0,
                        n = t % 26;
                    return this._expand(i + 1), this.words[i] = e ? this.words[i] | 1 << n : this.words[i] & ~(1 << n), this.strip()
                }, a.prototype.iadd = function(t) {
                    var e, i, r;
                    if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                    if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                    this.length > t.length ? (i = this, r = t) : (i = t, r = this);
                    for (var n = 0, a = 0; a < r.length; a++) e = (0 | i.words[a]) + (0 | r.words[a]) + n, this.words[a] = 67108863 & e, n = e >>> 26;
                    for (; 0 !== n && a < i.length; a++) e = (0 | i.words[a]) + n, this.words[a] = 67108863 & e, n = e >>> 26;
                    if (this.length = i.length, 0 !== n) this.words[this.length] = n, this.length++;
                    else if (i !== this)
                        for (; a < i.length; a++) this.words[a] = i.words[a];
                    return this
                }, a.prototype.add = function(t) {
                    var e;
                    return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                }, a.prototype.isub = function(t) {
                    if (0 !== t.negative) {
                        t.negative = 0;
                        var e = this.iadd(t);
                        return t.negative = 1, e._normSign()
                    }
                    if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                    var i, r, n = this.cmp(t);
                    if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                    n > 0 ? (i = this, r = t) : (i = t, r = this);
                    for (var a = 0, o = 0; o < r.length; o++) a = (e = (0 | i.words[o]) - (0 | r.words[o]) + a) >> 26, this.words[o] = 67108863 & e;
                    for (; 0 !== a && o < i.length; o++) a = (e = (0 | i.words[o]) + a) >> 26, this.words[o] = 67108863 & e;
                    if (0 === a && o < i.length && i !== this)
                        for (; o < i.length; o++) this.words[o] = i.words[o];
                    return this.length = Math.max(this.length, o), i !== this && (this.negative = 1), this.strip()
                }, a.prototype.sub = function(t) {
                    return this.clone().isub(t)
                };
                var h = function(t, e, i) {
                    var r, n, a, o = t.words,
                        s = e.words,
                        d = i.words,
                        u = 0,
                        f = 0 | o[0],
                        c = 8191 & f,
                        l = f >>> 13,
                        h = 0 | o[1],
                        p = 8191 & h,
                        _ = h >>> 13,
                        y = 0 | o[2],
                        b = 8191 & y,
                        g = y >>> 13,
                        v = 0 | o[3],
                        m = 8191 & v,
                        A = v >>> 13,
                        w = 0 | o[4],
                        E = 8191 & w,
                        P = w >>> 13,
                        S = 0 | o[5],
                        I = 8191 & S,
                        T = S >>> 13,
                        M = 0 | o[6],
                        C = 8191 & M,
                        k = M >>> 13,
                        D = 0 | o[7],
                        L = 8191 & D,
                        O = D >>> 13,
                        x = 0 | o[8],
                        R = 8191 & x,
                        U = x >>> 13,
                        N = 0 | o[9],
                        B = 8191 & N,
                        j = N >>> 13,
                        F = 0 | s[0],
                        V = 8191 & F,
                        q = F >>> 13,
                        H = 0 | s[1],
                        X = 8191 & H,
                        z = H >>> 13,
                        W = 0 | s[2],
                        Y = 8191 & W,
                        K = W >>> 13,
                        G = 0 | s[3],
                        Z = 8191 & G,
                        J = G >>> 13,
                        Q = 0 | s[4],
                        $ = 8191 & Q,
                        tt = Q >>> 13,
                        et = 0 | s[5],
                        it = 8191 & et,
                        rt = et >>> 13,
                        nt = 0 | s[6],
                        at = 8191 & nt,
                        ot = nt >>> 13,
                        st = 0 | s[7],
                        dt = 8191 & st,
                        ut = st >>> 13,
                        ft = 0 | s[8],
                        ct = 8191 & ft,
                        lt = ft >>> 13,
                        ht = 0 | s[9],
                        pt = 8191 & ht,
                        _t = ht >>> 13;
                    i.negative = t.negative ^ e.negative, i.length = 19;
                    var yt = (u + (r = Math.imul(c, V)) | 0) + ((8191 & (n = (n = Math.imul(c, q)) + Math.imul(l, V) | 0)) << 13) | 0;
                    u = ((a = Math.imul(l, q)) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, r = Math.imul(p, V), n = (n = Math.imul(p, q)) + Math.imul(_, V) | 0, a = Math.imul(_, q);
                    var bt = (u + (r = r + Math.imul(c, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, z) | 0) + Math.imul(l, X) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, z) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, r = Math.imul(b, V), n = (n = Math.imul(b, q)) + Math.imul(g, V) | 0, a = Math.imul(g, q), r = r + Math.imul(p, X) | 0, n = (n = n + Math.imul(p, z) | 0) + Math.imul(_, X) | 0, a = a + Math.imul(_, z) | 0;
                    var gt = (u + (r = r + Math.imul(c, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, K) | 0) + Math.imul(l, Y) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, K) | 0) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, r = Math.imul(m, V), n = (n = Math.imul(m, q)) + Math.imul(A, V) | 0, a = Math.imul(A, q), r = r + Math.imul(b, X) | 0, n = (n = n + Math.imul(b, z) | 0) + Math.imul(g, X) | 0, a = a + Math.imul(g, z) | 0, r = r + Math.imul(p, Y) | 0, n = (n = n + Math.imul(p, K) | 0) + Math.imul(_, Y) | 0, a = a + Math.imul(_, K) | 0;
                    var vt = (u + (r = r + Math.imul(c, Z) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, J) | 0) + Math.imul(l, Z) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, J) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, r = Math.imul(E, V), n = (n = Math.imul(E, q)) + Math.imul(P, V) | 0, a = Math.imul(P, q), r = r + Math.imul(m, X) | 0, n = (n = n + Math.imul(m, z) | 0) + Math.imul(A, X) | 0, a = a + Math.imul(A, z) | 0, r = r + Math.imul(b, Y) | 0, n = (n = n + Math.imul(b, K) | 0) + Math.imul(g, Y) | 0, a = a + Math.imul(g, K) | 0, r = r + Math.imul(p, Z) | 0, n = (n = n + Math.imul(p, J) | 0) + Math.imul(_, Z) | 0, a = a + Math.imul(_, J) | 0;
                    var mt = (u + (r = r + Math.imul(c, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, tt) | 0) + Math.imul(l, $) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, tt) | 0) + (n >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, r = Math.imul(I, V), n = (n = Math.imul(I, q)) + Math.imul(T, V) | 0, a = Math.imul(T, q), r = r + Math.imul(E, X) | 0, n = (n = n + Math.imul(E, z) | 0) + Math.imul(P, X) | 0, a = a + Math.imul(P, z) | 0, r = r + Math.imul(m, Y) | 0, n = (n = n + Math.imul(m, K) | 0) + Math.imul(A, Y) | 0, a = a + Math.imul(A, K) | 0, r = r + Math.imul(b, Z) | 0, n = (n = n + Math.imul(b, J) | 0) + Math.imul(g, Z) | 0, a = a + Math.imul(g, J) | 0, r = r + Math.imul(p, $) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(_, $) | 0, a = a + Math.imul(_, tt) | 0;
                    var At = (u + (r = r + Math.imul(c, it) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, rt) | 0) + Math.imul(l, it) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, rt) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, r = Math.imul(C, V), n = (n = Math.imul(C, q)) + Math.imul(k, V) | 0, a = Math.imul(k, q), r = r + Math.imul(I, X) | 0, n = (n = n + Math.imul(I, z) | 0) + Math.imul(T, X) | 0, a = a + Math.imul(T, z) | 0, r = r + Math.imul(E, Y) | 0, n = (n = n + Math.imul(E, K) | 0) + Math.imul(P, Y) | 0, a = a + Math.imul(P, K) | 0, r = r + Math.imul(m, Z) | 0, n = (n = n + Math.imul(m, J) | 0) + Math.imul(A, Z) | 0, a = a + Math.imul(A, J) | 0, r = r + Math.imul(b, $) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(g, $) | 0, a = a + Math.imul(g, tt) | 0, r = r + Math.imul(p, it) | 0, n = (n = n + Math.imul(p, rt) | 0) + Math.imul(_, it) | 0, a = a + Math.imul(_, rt) | 0;
                    var wt = (u + (r = r + Math.imul(c, at) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ot) | 0) + Math.imul(l, at) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, ot) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, r = Math.imul(L, V), n = (n = Math.imul(L, q)) + Math.imul(O, V) | 0, a = Math.imul(O, q), r = r + Math.imul(C, X) | 0, n = (n = n + Math.imul(C, z) | 0) + Math.imul(k, X) | 0, a = a + Math.imul(k, z) | 0, r = r + Math.imul(I, Y) | 0, n = (n = n + Math.imul(I, K) | 0) + Math.imul(T, Y) | 0, a = a + Math.imul(T, K) | 0, r = r + Math.imul(E, Z) | 0, n = (n = n + Math.imul(E, J) | 0) + Math.imul(P, Z) | 0, a = a + Math.imul(P, J) | 0, r = r + Math.imul(m, $) | 0, n = (n = n + Math.imul(m, tt) | 0) + Math.imul(A, $) | 0, a = a + Math.imul(A, tt) | 0, r = r + Math.imul(b, it) | 0, n = (n = n + Math.imul(b, rt) | 0) + Math.imul(g, it) | 0, a = a + Math.imul(g, rt) | 0, r = r + Math.imul(p, at) | 0, n = (n = n + Math.imul(p, ot) | 0) + Math.imul(_, at) | 0, a = a + Math.imul(_, ot) | 0;
                    var Et = (u + (r = r + Math.imul(c, dt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ut) | 0) + Math.imul(l, dt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, ut) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, r = Math.imul(R, V), n = (n = Math.imul(R, q)) + Math.imul(U, V) | 0, a = Math.imul(U, q), r = r + Math.imul(L, X) | 0, n = (n = n + Math.imul(L, z) | 0) + Math.imul(O, X) | 0, a = a + Math.imul(O, z) | 0, r = r + Math.imul(C, Y) | 0, n = (n = n + Math.imul(C, K) | 0) + Math.imul(k, Y) | 0, a = a + Math.imul(k, K) | 0, r = r + Math.imul(I, Z) | 0, n = (n = n + Math.imul(I, J) | 0) + Math.imul(T, Z) | 0, a = a + Math.imul(T, J) | 0, r = r + Math.imul(E, $) | 0, n = (n = n + Math.imul(E, tt) | 0) + Math.imul(P, $) | 0, a = a + Math.imul(P, tt) | 0, r = r + Math.imul(m, it) | 0, n = (n = n + Math.imul(m, rt) | 0) + Math.imul(A, it) | 0, a = a + Math.imul(A, rt) | 0, r = r + Math.imul(b, at) | 0, n = (n = n + Math.imul(b, ot) | 0) + Math.imul(g, at) | 0, a = a + Math.imul(g, ot) | 0, r = r + Math.imul(p, dt) | 0, n = (n = n + Math.imul(p, ut) | 0) + Math.imul(_, dt) | 0, a = a + Math.imul(_, ut) | 0;
                    var Pt = (u + (r = r + Math.imul(c, ct) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, lt) | 0) + Math.imul(l, ct) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, lt) | 0) + (n >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, r = Math.imul(B, V), n = (n = Math.imul(B, q)) + Math.imul(j, V) | 0, a = Math.imul(j, q), r = r + Math.imul(R, X) | 0, n = (n = n + Math.imul(R, z) | 0) + Math.imul(U, X) | 0, a = a + Math.imul(U, z) | 0, r = r + Math.imul(L, Y) | 0, n = (n = n + Math.imul(L, K) | 0) + Math.imul(O, Y) | 0, a = a + Math.imul(O, K) | 0, r = r + Math.imul(C, Z) | 0, n = (n = n + Math.imul(C, J) | 0) + Math.imul(k, Z) | 0, a = a + Math.imul(k, J) | 0, r = r + Math.imul(I, $) | 0, n = (n = n + Math.imul(I, tt) | 0) + Math.imul(T, $) | 0, a = a + Math.imul(T, tt) | 0, r = r + Math.imul(E, it) | 0, n = (n = n + Math.imul(E, rt) | 0) + Math.imul(P, it) | 0, a = a + Math.imul(P, rt) | 0, r = r + Math.imul(m, at) | 0, n = (n = n + Math.imul(m, ot) | 0) + Math.imul(A, at) | 0, a = a + Math.imul(A, ot) | 0, r = r + Math.imul(b, dt) | 0, n = (n = n + Math.imul(b, ut) | 0) + Math.imul(g, dt) | 0, a = a + Math.imul(g, ut) | 0, r = r + Math.imul(p, ct) | 0, n = (n = n + Math.imul(p, lt) | 0) + Math.imul(_, ct) | 0, a = a + Math.imul(_, lt) | 0;
                    var St = (u + (r = r + Math.imul(c, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, _t) | 0) + Math.imul(l, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(l, _t) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, r = Math.imul(B, X), n = (n = Math.imul(B, z)) + Math.imul(j, X) | 0, a = Math.imul(j, z), r = r + Math.imul(R, Y) | 0, n = (n = n + Math.imul(R, K) | 0) + Math.imul(U, Y) | 0, a = a + Math.imul(U, K) | 0, r = r + Math.imul(L, Z) | 0, n = (n = n + Math.imul(L, J) | 0) + Math.imul(O, Z) | 0, a = a + Math.imul(O, J) | 0, r = r + Math.imul(C, $) | 0, n = (n = n + Math.imul(C, tt) | 0) + Math.imul(k, $) | 0, a = a + Math.imul(k, tt) | 0, r = r + Math.imul(I, it) | 0, n = (n = n + Math.imul(I, rt) | 0) + Math.imul(T, it) | 0, a = a + Math.imul(T, rt) | 0, r = r + Math.imul(E, at) | 0, n = (n = n + Math.imul(E, ot) | 0) + Math.imul(P, at) | 0, a = a + Math.imul(P, ot) | 0, r = r + Math.imul(m, dt) | 0, n = (n = n + Math.imul(m, ut) | 0) + Math.imul(A, dt) | 0, a = a + Math.imul(A, ut) | 0, r = r + Math.imul(b, ct) | 0, n = (n = n + Math.imul(b, lt) | 0) + Math.imul(g, ct) | 0, a = a + Math.imul(g, lt) | 0;
                    var It = (u + (r = r + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, _t) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(_, _t) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, r = Math.imul(B, Y), n = (n = Math.imul(B, K)) + Math.imul(j, Y) | 0, a = Math.imul(j, K), r = r + Math.imul(R, Z) | 0, n = (n = n + Math.imul(R, J) | 0) + Math.imul(U, Z) | 0, a = a + Math.imul(U, J) | 0, r = r + Math.imul(L, $) | 0, n = (n = n + Math.imul(L, tt) | 0) + Math.imul(O, $) | 0, a = a + Math.imul(O, tt) | 0, r = r + Math.imul(C, it) | 0, n = (n = n + Math.imul(C, rt) | 0) + Math.imul(k, it) | 0, a = a + Math.imul(k, rt) | 0, r = r + Math.imul(I, at) | 0, n = (n = n + Math.imul(I, ot) | 0) + Math.imul(T, at) | 0, a = a + Math.imul(T, ot) | 0, r = r + Math.imul(E, dt) | 0, n = (n = n + Math.imul(E, ut) | 0) + Math.imul(P, dt) | 0, a = a + Math.imul(P, ut) | 0, r = r + Math.imul(m, ct) | 0, n = (n = n + Math.imul(m, lt) | 0) + Math.imul(A, ct) | 0, a = a + Math.imul(A, lt) | 0;
                    var Tt = (u + (r = r + Math.imul(b, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, _t) | 0) + Math.imul(g, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(g, _t) | 0) + (n >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, r = Math.imul(B, Z), n = (n = Math.imul(B, J)) + Math.imul(j, Z) | 0, a = Math.imul(j, J), r = r + Math.imul(R, $) | 0, n = (n = n + Math.imul(R, tt) | 0) + Math.imul(U, $) | 0, a = a + Math.imul(U, tt) | 0, r = r + Math.imul(L, it) | 0, n = (n = n + Math.imul(L, rt) | 0) + Math.imul(O, it) | 0, a = a + Math.imul(O, rt) | 0, r = r + Math.imul(C, at) | 0, n = (n = n + Math.imul(C, ot) | 0) + Math.imul(k, at) | 0, a = a + Math.imul(k, ot) | 0, r = r + Math.imul(I, dt) | 0, n = (n = n + Math.imul(I, ut) | 0) + Math.imul(T, dt) | 0, a = a + Math.imul(T, ut) | 0, r = r + Math.imul(E, ct) | 0, n = (n = n + Math.imul(E, lt) | 0) + Math.imul(P, ct) | 0, a = a + Math.imul(P, lt) | 0;
                    var Mt = (u + (r = r + Math.imul(m, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, _t) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(A, _t) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, r = Math.imul(B, $), n = (n = Math.imul(B, tt)) + Math.imul(j, $) | 0, a = Math.imul(j, tt), r = r + Math.imul(R, it) | 0, n = (n = n + Math.imul(R, rt) | 0) + Math.imul(U, it) | 0, a = a + Math.imul(U, rt) | 0, r = r + Math.imul(L, at) | 0, n = (n = n + Math.imul(L, ot) | 0) + Math.imul(O, at) | 0, a = a + Math.imul(O, ot) | 0, r = r + Math.imul(C, dt) | 0, n = (n = n + Math.imul(C, ut) | 0) + Math.imul(k, dt) | 0, a = a + Math.imul(k, ut) | 0, r = r + Math.imul(I, ct) | 0, n = (n = n + Math.imul(I, lt) | 0) + Math.imul(T, ct) | 0, a = a + Math.imul(T, lt) | 0;
                    var Ct = (u + (r = r + Math.imul(E, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(E, _t) | 0) + Math.imul(P, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(P, _t) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, r = Math.imul(B, it), n = (n = Math.imul(B, rt)) + Math.imul(j, it) | 0, a = Math.imul(j, rt), r = r + Math.imul(R, at) | 0, n = (n = n + Math.imul(R, ot) | 0) + Math.imul(U, at) | 0, a = a + Math.imul(U, ot) | 0, r = r + Math.imul(L, dt) | 0, n = (n = n + Math.imul(L, ut) | 0) + Math.imul(O, dt) | 0, a = a + Math.imul(O, ut) | 0, r = r + Math.imul(C, ct) | 0, n = (n = n + Math.imul(C, lt) | 0) + Math.imul(k, ct) | 0, a = a + Math.imul(k, lt) | 0;
                    var kt = (u + (r = r + Math.imul(I, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, _t) | 0) + Math.imul(T, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(T, _t) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, r = Math.imul(B, at), n = (n = Math.imul(B, ot)) + Math.imul(j, at) | 0, a = Math.imul(j, ot), r = r + Math.imul(R, dt) | 0, n = (n = n + Math.imul(R, ut) | 0) + Math.imul(U, dt) | 0, a = a + Math.imul(U, ut) | 0, r = r + Math.imul(L, ct) | 0, n = (n = n + Math.imul(L, lt) | 0) + Math.imul(O, ct) | 0, a = a + Math.imul(O, lt) | 0;
                    var Dt = (u + (r = r + Math.imul(C, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(C, _t) | 0) + Math.imul(k, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(k, _t) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863, r = Math.imul(B, dt), n = (n = Math.imul(B, ut)) + Math.imul(j, dt) | 0, a = Math.imul(j, ut), r = r + Math.imul(R, ct) | 0, n = (n = n + Math.imul(R, lt) | 0) + Math.imul(U, ct) | 0, a = a + Math.imul(U, lt) | 0;
                    var Lt = (u + (r = r + Math.imul(L, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, _t) | 0) + Math.imul(O, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(O, _t) | 0) + (n >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, r = Math.imul(B, ct), n = (n = Math.imul(B, lt)) + Math.imul(j, ct) | 0, a = Math.imul(j, lt);
                    var Ot = (u + (r = r + Math.imul(R, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(R, _t) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                    u = ((a = a + Math.imul(U, _t) | 0) + (n >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863;
                    var xt = (u + (r = Math.imul(B, pt)) | 0) + ((8191 & (n = (n = Math.imul(B, _t)) + Math.imul(j, pt) | 0)) << 13) | 0;
                    return u = ((a = Math.imul(j, _t)) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, d[0] = yt, d[1] = bt, d[2] = gt, d[3] = vt, d[4] = mt, d[5] = At, d[6] = wt, d[7] = Et, d[8] = Pt, d[9] = St, d[10] = It, d[11] = Tt, d[12] = Mt, d[13] = Ct, d[14] = kt, d[15] = Dt, d[16] = Lt, d[17] = Ot, d[18] = xt, 0 !== u && (d[19] = u, i.length++), i
                };

                function p(t, e, i) {
                    return (new _).mulp(t, e, i)
                }

                function _(t, e) {
                    this.x = t, this.y = e
                }
                Math.imul || (h = l), a.prototype.mulTo = function(t, e) {
                    var i = this.length + t.length;
                    return 10 === this.length && 10 === t.length ? h(this, t, e) : i < 63 ? l(this, t, e) : i < 1024 ? function(t, e, i) {
                        i.negative = e.negative ^ t.negative, i.length = t.length + e.length;
                        for (var r = 0, n = 0, a = 0; a < i.length - 1; a++) {
                            var o = n;
                            n = 0;
                            for (var s = 67108863 & r, d = Math.min(a, e.length - 1), u = Math.max(0, a - t.length + 1); u <= d; u++) {
                                var f = a - u,
                                    c = (0 | t.words[f]) * (0 | e.words[u]),
                                    l = 67108863 & c;
                                s = 67108863 & (l = l + s | 0), n += (o = (o = o + (c / 67108864 | 0) | 0) + (l >>> 26) | 0) >>> 26, o &= 67108863
                            }
                            i.words[a] = s, r = o, o = n
                        }
                        return 0 !== r ? i.words[a] = r : i.length--, i.strip()
                    }(this, t, e) : p(this, t, e)
                }, _.prototype.makeRBT = function(t) {
                    for (var e = new Array(t), i = a.prototype._countBits(t) - 1, r = 0; r < t; r++) e[r] = this.revBin(r, i, t);
                    return e
                }, _.prototype.revBin = function(t, e, i) {
                    if (0 === t || t === i - 1) return t;
                    for (var r = 0, n = 0; n < e; n++) r |= (1 & t) << e - n - 1, t >>= 1;
                    return r
                }, _.prototype.permute = function(t, e, i, r, n, a) {
                    for (var o = 0; o < a; o++) r[o] = e[t[o]], n[o] = i[t[o]]
                }, _.prototype.transform = function(t, e, i, r, n, a) {
                    this.permute(a, t, e, i, r, n);
                    for (var o = 1; o < n; o <<= 1)
                        for (var s = o << 1, d = Math.cos(2 * Math.PI / s), u = Math.sin(2 * Math.PI / s), f = 0; f < n; f += s)
                            for (var c = d, l = u, h = 0; h < o; h++) {
                                var p = i[f + h],
                                    _ = r[f + h],
                                    y = i[f + h + o],
                                    b = r[f + h + o],
                                    g = c * y - l * b;
                                b = c * b + l * y, y = g, i[f + h] = p + y, r[f + h] = _ + b, i[f + h + o] = p - y, r[f + h + o] = _ - b, h !== s && (g = d * c - u * l, l = d * l + u * c, c = g)
                            }
                }, _.prototype.guessLen13b = function(t, e) {
                    var i = 1 | Math.max(e, t),
                        r = 1 & i,
                        n = 0;
                    for (i = i / 2 | 0; i; i >>>= 1) n++;
                    return 1 << n + 1 + r
                }, _.prototype.conjugate = function(t, e, i) {
                    if (!(i <= 1))
                        for (var r = 0; r < i / 2; r++) {
                            var n = t[r];
                            t[r] = t[i - r - 1], t[i - r - 1] = n, n = e[r], e[r] = -e[i - r - 1], e[i - r - 1] = -n
                        }
                }, _.prototype.normalize13b = function(t, e) {
                    for (var i = 0, r = 0; r < e / 2; r++) {
                        var n = 8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + i;
                        t[r] = 67108863 & n, i = n < 67108864 ? 0 : n / 67108864 | 0
                    }
                    return t
                }, _.prototype.convert13b = function(t, e, i, n) {
                    for (var a = 0, o = 0; o < e; o++) a += 0 | t[o], i[2 * o] = 8191 & a, a >>>= 13, i[2 * o + 1] = 8191 & a, a >>>= 13;
                    for (o = 2 * e; o < n; ++o) i[o] = 0;
                    r(0 === a), r(0 == (-8192 & a))
                }, _.prototype.stub = function(t) {
                    for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0;
                    return e
                }, _.prototype.mulp = function(t, e, i) {
                    var r = 2 * this.guessLen13b(t.length, e.length),
                        n = this.makeRBT(r),
                        a = this.stub(r),
                        o = new Array(r),
                        s = new Array(r),
                        d = new Array(r),
                        u = new Array(r),
                        f = new Array(r),
                        c = new Array(r),
                        l = i.words;
                    l.length = r, this.convert13b(t.words, t.length, o, r), this.convert13b(e.words, e.length, u, r), this.transform(o, a, s, d, r, n), this.transform(u, a, f, c, r, n);
                    for (var h = 0; h < r; h++) {
                        var p = s[h] * f[h] - d[h] * c[h];
                        d[h] = s[h] * c[h] + d[h] * f[h], s[h] = p
                    }
                    return this.conjugate(s, d, r), this.transform(s, d, l, a, r, n), this.conjugate(l, a, r), this.normalize13b(l, r), i.negative = t.negative ^ e.negative, i.length = t.length + e.length, i.strip()
                }, a.prototype.mul = function(t) {
                    var e = new a(null);
                    return e.words = new Array(this.length + t.length), this.mulTo(t, e)
                }, a.prototype.mulf = function(t) {
                    var e = new a(null);
                    return e.words = new Array(this.length + t.length), p(this, t, e)
                }, a.prototype.imul = function(t) {
                    return this.clone().mulTo(t, this)
                }, a.prototype.imuln = function(t) {
                    r("number" == typeof t), r(t < 67108864);
                    for (var e = 0, i = 0; i < this.length; i++) {
                        var n = (0 | this.words[i]) * t,
                            a = (67108863 & n) + (67108863 & e);
                        e >>= 26, e += n / 67108864 | 0, e += a >>> 26, this.words[i] = 67108863 & a
                    }
                    return 0 !== e && (this.words[i] = e, this.length++), this
                }, a.prototype.muln = function(t) {
                    return this.clone().imuln(t)
                }, a.prototype.sqr = function() {
                    return this.mul(this)
                }, a.prototype.isqr = function() {
                    return this.imul(this.clone())
                }, a.prototype.pow = function(t) {
                    var e = function(t) {
                        for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++) {
                            var r = i / 26 | 0,
                                n = i % 26;
                            e[i] = (t.words[r] & 1 << n) >>> n
                        }
                        return e
                    }(t);
                    if (0 === e.length) return new a(1);
                    for (var i = this, r = 0; r < e.length && 0 === e[r]; r++, i = i.sqr());
                    if (++r < e.length)
                        for (var n = i.sqr(); r < e.length; r++, n = n.sqr()) 0 !== e[r] && (i = i.mul(n));
                    return i
                }, a.prototype.iushln = function(t) {
                    r("number" == typeof t && t >= 0);
                    var e, i = t % 26,
                        n = (t - i) / 26,
                        a = 67108863 >>> 26 - i << 26 - i;
                    if (0 !== i) {
                        var o = 0;
                        for (e = 0; e < this.length; e++) {
                            var s = this.words[e] & a,
                                d = (0 | this.words[e]) - s << i;
                            this.words[e] = d | o, o = s >>> 26 - i
                        }
                        o && (this.words[e] = o, this.length++)
                    }
                    if (0 !== n) {
                        for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                        for (e = 0; e < n; e++) this.words[e] = 0;
                        this.length += n
                    }
                    return this.strip()
                }, a.prototype.ishln = function(t) {
                    return r(0 === this.negative), this.iushln(t)
                }, a.prototype.iushrn = function(t, e, i) {
                    var n;
                    r("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                    var a = t % 26,
                        o = Math.min((t - a) / 26, this.length),
                        s = 67108863 ^ 67108863 >>> a << a,
                        d = i;
                    if (n -= o, n = Math.max(0, n), d) {
                        for (var u = 0; u < o; u++) d.words[u] = this.words[u];
                        d.length = o
                    }
                    if (0 === o);
                    else if (this.length > o)
                        for (this.length -= o, u = 0; u < this.length; u++) this.words[u] = this.words[u + o];
                    else this.words[0] = 0, this.length = 1;
                    var f = 0;
                    for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
                        var c = 0 | this.words[u];
                        this.words[u] = f << 26 - a | c >>> a, f = c & s
                    }
                    return d && 0 !== f && (d.words[d.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
                }, a.prototype.ishrn = function(t, e, i) {
                    return r(0 === this.negative), this.iushrn(t, e, i)
                }, a.prototype.shln = function(t) {
                    return this.clone().ishln(t)
                }, a.prototype.ushln = function(t) {
                    return this.clone().iushln(t)
                }, a.prototype.shrn = function(t) {
                    return this.clone().ishrn(t)
                }, a.prototype.ushrn = function(t) {
                    return this.clone().iushrn(t)
                }, a.prototype.testn = function(t) {
                    r("number" == typeof t && t >= 0);
                    var e = t % 26,
                        i = (t - e) / 26,
                        n = 1 << e;
                    return !(this.length <= i) && !!(this.words[i] & n)
                }, a.prototype.imaskn = function(t) {
                    r("number" == typeof t && t >= 0);
                    var e = t % 26,
                        i = (t - e) / 26;
                    if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= i) return this;
                    if (0 !== e && i++, this.length = Math.min(i, this.length), 0 !== e) {
                        var n = 67108863 ^ 67108863 >>> e << e;
                        this.words[this.length - 1] &= n
                    }
                    return this.strip()
                }, a.prototype.maskn = function(t) {
                    return this.clone().imaskn(t)
                }, a.prototype.iaddn = function(t) {
                    return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                }, a.prototype._iaddn = function(t) {
                    this.words[0] += t;
                    for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                    return this.length = Math.max(this.length, e + 1), this
                }, a.prototype.isubn = function(t) {
                    if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
                    if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                    if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                    else
                        for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                    return this.strip()
                }, a.prototype.addn = function(t) {
                    return this.clone().iaddn(t)
                }, a.prototype.subn = function(t) {
                    return this.clone().isubn(t)
                }, a.prototype.iabs = function() {
                    return this.negative = 0, this
                }, a.prototype.abs = function() {
                    return this.clone().iabs()
                }, a.prototype._ishlnsubmul = function(t, e, i) {
                    var n, a, o = t.length + i;
                    this._expand(o);
                    var s = 0;
                    for (n = 0; n < t.length; n++) {
                        a = (0 | this.words[n + i]) + s;
                        var d = (0 | t.words[n]) * e;
                        s = ((a -= 67108863 & d) >> 26) - (d / 67108864 | 0), this.words[n + i] = 67108863 & a
                    }
                    for (; n < this.length - i; n++) s = (a = (0 | this.words[n + i]) + s) >> 26, this.words[n + i] = 67108863 & a;
                    if (0 === s) return this.strip();
                    for (r(-1 === s), s = 0, n = 0; n < this.length; n++) s = (a = -(0 | this.words[n]) + s) >> 26, this.words[n] = 67108863 & a;
                    return this.negative = 1, this.strip()
                }, a.prototype._wordDiv = function(t, e) {
                    var i = (this.length, t.length),
                        r = this.clone(),
                        n = t,
                        o = 0 | n.words[n.length - 1];
                    0 !== (i = 26 - this._countBits(o)) && (n = n.ushln(i), r.iushln(i), o = 0 | n.words[n.length - 1]);
                    var s, d = r.length - n.length;
                    if ("mod" !== e) {
                        (s = new a(null)).length = d + 1, s.words = new Array(s.length);
                        for (var u = 0; u < s.length; u++) s.words[u] = 0
                    }
                    var f = r.clone()._ishlnsubmul(n, 1, d);
                    0 === f.negative && (r = f, s && (s.words[d] = 1));
                    for (var c = d - 1; c >= 0; c--) {
                        var l = 67108864 * (0 | r.words[n.length + c]) + (0 | r.words[n.length + c - 1]);
                        for (l = Math.min(l / o | 0, 67108863), r._ishlnsubmul(n, l, c); 0 !== r.negative;) l--, r.negative = 0, r._ishlnsubmul(n, 1, c), r.isZero() || (r.negative ^= 1);
                        s && (s.words[c] = l)
                    }
                    return s && s.strip(), r.strip(), "div" !== e && 0 !== i && r.iushrn(i), {
                        div: s || null,
                        mod: r
                    }
                }, a.prototype.divmod = function(t, e, i) {
                    return r(!t.isZero()), this.isZero() ? {
                        div: new a(0),
                        mod: new a(0)
                    } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e), "mod" !== e && (n = s.div.neg()), "div" !== e && (o = s.mod.neg(), i && 0 !== o.negative && o.iadd(t)), {
                        div: n,
                        mod: o
                    }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e), "mod" !== e && (n = s.div.neg()), {
                        div: n,
                        mod: s.mod
                    }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e), "div" !== e && (o = s.mod.neg(), i && 0 !== o.negative && o.isub(t)), {
                        div: s.div,
                        mod: o
                    }) : t.length > this.length || this.cmp(t) < 0 ? {
                        div: new a(0),
                        mod: this
                    } : 1 === t.length ? "div" === e ? {
                        div: this.divn(t.words[0]),
                        mod: null
                    } : "mod" === e ? {
                        div: null,
                        mod: new a(this.modn(t.words[0]))
                    } : {
                        div: this.divn(t.words[0]),
                        mod: new a(this.modn(t.words[0]))
                    } : this._wordDiv(t, e);
                    var n, o, s
                }, a.prototype.div = function(t) {
                    return this.divmod(t, "div", !1).div
                }, a.prototype.mod = function(t) {
                    return this.divmod(t, "mod", !1).mod
                }, a.prototype.umod = function(t) {
                    return this.divmod(t, "mod", !0).mod
                }, a.prototype.divRound = function(t) {
                    var e = this.divmod(t);
                    if (e.mod.isZero()) return e.div;
                    var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                        r = t.ushrn(1),
                        n = t.andln(1),
                        a = i.cmp(r);
                    return a < 0 || 1 === n && 0 === a ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                }, a.prototype.modn = function(t) {
                    r(t <= 67108863);
                    for (var e = (1 << 26) % t, i = 0, n = this.length - 1; n >= 0; n--) i = (e * i + (0 | this.words[n])) % t;
                    return i
                }, a.prototype.idivn = function(t) {
                    r(t <= 67108863);
                    for (var e = 0, i = this.length - 1; i >= 0; i--) {
                        var n = (0 | this.words[i]) + 67108864 * e;
                        this.words[i] = n / t | 0, e = n % t
                    }
                    return this.strip()
                }, a.prototype.divn = function(t) {
                    return this.clone().idivn(t)
                }, a.prototype.egcd = function(t) {
                    r(0 === t.negative), r(!t.isZero());
                    var e = this,
                        i = t.clone();
                    e = 0 !== e.negative ? e.umod(t) : e.clone();
                    for (var n = new a(1), o = new a(0), s = new a(0), d = new a(1), u = 0; e.isEven() && i.isEven();) e.iushrn(1), i.iushrn(1), ++u;
                    for (var f = i.clone(), c = e.clone(); !e.isZero();) {
                        for (var l = 0, h = 1; 0 == (e.words[0] & h) && l < 26; ++l, h <<= 1);
                        if (l > 0)
                            for (e.iushrn(l); l-- > 0;)(n.isOdd() || o.isOdd()) && (n.iadd(f), o.isub(c)), n.iushrn(1), o.iushrn(1);
                        for (var p = 0, _ = 1; 0 == (i.words[0] & _) && p < 26; ++p, _ <<= 1);
                        if (p > 0)
                            for (i.iushrn(p); p-- > 0;)(s.isOdd() || d.isOdd()) && (s.iadd(f), d.isub(c)), s.iushrn(1), d.iushrn(1);
                        e.cmp(i) >= 0 ? (e.isub(i), n.isub(s), o.isub(d)) : (i.isub(e), s.isub(n), d.isub(o))
                    }
                    return {
                        a: s,
                        b: d,
                        gcd: i.iushln(u)
                    }
                }, a.prototype._invmp = function(t) {
                    r(0 === t.negative), r(!t.isZero());
                    var e = this,
                        i = t.clone();
                    e = 0 !== e.negative ? e.umod(t) : e.clone();
                    for (var n, o = new a(1), s = new a(0), d = i.clone(); e.cmpn(1) > 0 && i.cmpn(1) > 0;) {
                        for (var u = 0, f = 1; 0 == (e.words[0] & f) && u < 26; ++u, f <<= 1);
                        if (u > 0)
                            for (e.iushrn(u); u-- > 0;) o.isOdd() && o.iadd(d), o.iushrn(1);
                        for (var c = 0, l = 1; 0 == (i.words[0] & l) && c < 26; ++c, l <<= 1);
                        if (c > 0)
                            for (i.iushrn(c); c-- > 0;) s.isOdd() && s.iadd(d), s.iushrn(1);
                        e.cmp(i) >= 0 ? (e.isub(i), o.isub(s)) : (i.isub(e), s.isub(o))
                    }
                    return (n = 0 === e.cmpn(1) ? o : s).cmpn(0) < 0 && n.iadd(t), n
                }, a.prototype.gcd = function(t) {
                    if (this.isZero()) return t.abs();
                    if (t.isZero()) return this.abs();
                    var e = this.clone(),
                        i = t.clone();
                    e.negative = 0, i.negative = 0;
                    for (var r = 0; e.isEven() && i.isEven(); r++) e.iushrn(1), i.iushrn(1);
                    for (;;) {
                        for (; e.isEven();) e.iushrn(1);
                        for (; i.isEven();) i.iushrn(1);
                        var n = e.cmp(i);
                        if (n < 0) {
                            var a = e;
                            e = i, i = a
                        } else if (0 === n || 0 === i.cmpn(1)) break;
                        e.isub(i)
                    }
                    return i.iushln(r)
                }, a.prototype.invm = function(t) {
                    return this.egcd(t).a.umod(t)
                }, a.prototype.isEven = function() {
                    return 0 == (1 & this.words[0])
                }, a.prototype.isOdd = function() {
                    return 1 == (1 & this.words[0])
                }, a.prototype.andln = function(t) {
                    return this.words[0] & t
                }, a.prototype.bincn = function(t) {
                    r("number" == typeof t);
                    var e = t % 26,
                        i = (t - e) / 26,
                        n = 1 << e;
                    if (this.length <= i) return this._expand(i + 1), this.words[i] |= n, this;
                    for (var a = n, o = i; 0 !== a && o < this.length; o++) {
                        var s = 0 | this.words[o];
                        a = (s += a) >>> 26, s &= 67108863, this.words[o] = s
                    }
                    return 0 !== a && (this.words[o] = a, this.length++), this
                }, a.prototype.isZero = function() {
                    return 1 === this.length && 0 === this.words[0]
                }, a.prototype.cmpn = function(t) {
                    var e, i = t < 0;
                    if (0 !== this.negative && !i) return -1;
                    if (0 === this.negative && i) return 1;
                    if (this.strip(), this.length > 1) e = 1;
                    else {
                        i && (t = -t), r(t <= 67108863, "Number is too big");
                        var n = 0 | this.words[0];
                        e = n === t ? 0 : n < t ? -1 : 1
                    }
                    return 0 !== this.negative ? 0 | -e : e
                }, a.prototype.cmp = function(t) {
                    if (0 !== this.negative && 0 === t.negative) return -1;
                    if (0 === this.negative && 0 !== t.negative) return 1;
                    var e = this.ucmp(t);
                    return 0 !== this.negative ? 0 | -e : e
                }, a.prototype.ucmp = function(t) {
                    if (this.length > t.length) return 1;
                    if (this.length < t.length) return -1;
                    for (var e = 0, i = this.length - 1; i >= 0; i--) {
                        var r = 0 | this.words[i],
                            n = 0 | t.words[i];
                        if (r !== n) {
                            r < n ? e = -1 : r > n && (e = 1);
                            break
                        }
                    }
                    return e
                }, a.prototype.gtn = function(t) {
                    return 1 === this.cmpn(t)
                }, a.prototype.gt = function(t) {
                    return 1 === this.cmp(t)
                }, a.prototype.gten = function(t) {
                    return this.cmpn(t) >= 0
                }, a.prototype.gte = function(t) {
                    return this.cmp(t) >= 0
                }, a.prototype.ltn = function(t) {
                    return -1 === this.cmpn(t)
                }, a.prototype.lt = function(t) {
                    return -1 === this.cmp(t)
                }, a.prototype.lten = function(t) {
                    return this.cmpn(t) <= 0
                }, a.prototype.lte = function(t) {
                    return this.cmp(t) <= 0
                }, a.prototype.eqn = function(t) {
                    return 0 === this.cmpn(t)
                }, a.prototype.eq = function(t) {
                    return 0 === this.cmp(t)
                }, a.red = function(t) {
                    return new w(t)
                }, a.prototype.toRed = function(t) {
                    return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                }, a.prototype.fromRed = function() {
                    return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                }, a.prototype._forceRed = function(t) {
                    return this.red = t, this
                }, a.prototype.forceRed = function(t) {
                    return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
                }, a.prototype.redAdd = function(t) {
                    return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                }, a.prototype.redIAdd = function(t) {
                    return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                }, a.prototype.redSub = function(t) {
                    return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                }, a.prototype.redISub = function(t) {
                    return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                }, a.prototype.redShl = function(t) {
                    return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                }, a.prototype.redMul = function(t) {
                    return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                }, a.prototype.redIMul = function(t) {
                    return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                }, a.prototype.redSqr = function() {
                    return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                }, a.prototype.redISqr = function() {
                    return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                }, a.prototype.redSqrt = function() {
                    return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                }, a.prototype.redInvm = function() {
                    return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                }, a.prototype.redNeg = function() {
                    return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                }, a.prototype.redPow = function(t) {
                    return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                };
                var y = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null
                };

                function b(t, e) {
                    this.name = t, this.p = new a(e, 16), this.n = this.p.bitLength(), this.k = new a(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                }

                function g() {
                    b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                }

                function v() {
                    b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                }

                function m() {
                    b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                }

                function A() {
                    b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                }

                function w(t) {
                    if ("string" == typeof t) {
                        var e = a._prime(t);
                        this.m = e.p, this.prime = e
                    } else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                }

                function E(t) {
                    w.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new a(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                }
                b.prototype._tmp = function() {
                    var t = new a(null);
                    return t.words = new Array(Math.ceil(this.n / 13)), t
                }, b.prototype.ireduce = function(t) {
                    var e, i = t;
                    do {
                        this.split(i, this.tmp), e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength()
                    } while (e > this.n);
                    var r = e < this.n ? -1 : i.ucmp(this.p);
                    return 0 === r ? (i.words[0] = 0, i.length = 1) : r > 0 ? i.isub(this.p) : i.strip(), i
                }, b.prototype.split = function(t, e) {
                    t.iushrn(this.n, 0, e)
                }, b.prototype.imulK = function(t) {
                    return t.imul(this.k)
                }, n(g, b), g.prototype.split = function(t, e) {
                    for (var i = Math.min(t.length, 9), r = 0; r < i; r++) e.words[r] = t.words[r];
                    if (e.length = i, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                    var n = t.words[9];
                    for (e.words[e.length++] = 4194303 & n, r = 10; r < t.length; r++) {
                        var a = 0 | t.words[r];
                        t.words[r - 10] = (4194303 & a) << 4 | n >>> 22, n = a
                    }
                    n >>>= 22, t.words[r - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
                }, g.prototype.imulK = function(t) {
                    t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                    for (var e = 0, i = 0; i < t.length; i++) {
                        var r = 0 | t.words[i];
                        e += 977 * r, t.words[i] = 67108863 & e, e = 64 * r + (e / 67108864 | 0)
                    }
                    return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                }, n(v, b), n(m, b), n(A, b), A.prototype.imulK = function(t) {
                    for (var e = 0, i = 0; i < t.length; i++) {
                        var r = 19 * (0 | t.words[i]) + e,
                            n = 67108863 & r;
                        r >>>= 26, t.words[i] = n, e = r
                    }
                    return 0 !== e && (t.words[t.length++] = e), t
                }, a._prime = function(t) {
                    if (y[t]) return y[t];
                    var e;
                    if ("k256" === t) e = new g;
                    else if ("p224" === t) e = new v;
                    else if ("p192" === t) e = new m;
                    else {
                        if ("p25519" !== t) throw new Error("Unknown prime " + t);
                        e = new A
                    }
                    return y[t] = e, e
                }, w.prototype._verify1 = function(t) {
                    r(0 === t.negative, "red works only with positives"), r(t.red, "red works only with red numbers")
                }, w.prototype._verify2 = function(t, e) {
                    r(0 == (t.negative | e.negative), "red works only with positives"), r(t.red && t.red === e.red, "red works only with red numbers")
                }, w.prototype.imod = function(t) {
                    return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
                }, w.prototype.neg = function(t) {
                    return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                }, w.prototype.add = function(t, e) {
                    this._verify2(t, e);
                    var i = t.add(e);
                    return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
                }, w.prototype.iadd = function(t, e) {
                    this._verify2(t, e);
                    var i = t.iadd(e);
                    return i.cmp(this.m) >= 0 && i.isub(this.m), i
                }, w.prototype.sub = function(t, e) {
                    this._verify2(t, e);
                    var i = t.sub(e);
                    return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
                }, w.prototype.isub = function(t, e) {
                    this._verify2(t, e);
                    var i = t.isub(e);
                    return i.cmpn(0) < 0 && i.iadd(this.m), i
                }, w.prototype.shl = function(t, e) {
                    return this._verify1(t), this.imod(t.ushln(e))
                }, w.prototype.imul = function(t, e) {
                    return this._verify2(t, e), this.imod(t.imul(e))
                }, w.prototype.mul = function(t, e) {
                    return this._verify2(t, e), this.imod(t.mul(e))
                }, w.prototype.isqr = function(t) {
                    return this.imul(t, t.clone())
                }, w.prototype.sqr = function(t) {
                    return this.mul(t, t)
                }, w.prototype.sqrt = function(t) {
                    if (t.isZero()) return t.clone();
                    var e = this.m.andln(3);
                    if (r(e % 2 == 1), 3 === e) {
                        var i = this.m.add(new a(1)).iushrn(2);
                        return this.pow(t, i)
                    }
                    for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1);) o++, n.iushrn(1);
                    r(!n.isZero());
                    var s = new a(1).toRed(this),
                        d = s.redNeg(),
                        u = this.m.subn(1).iushrn(1),
                        f = this.m.bitLength();
                    for (f = new a(2 * f * f).toRed(this); 0 !== this.pow(f, u).cmp(d);) f.redIAdd(d);
                    for (var c = this.pow(f, n), l = this.pow(t, n.addn(1).iushrn(1)), h = this.pow(t, n), p = o; 0 !== h.cmp(s);) {
                        for (var _ = h, y = 0; 0 !== _.cmp(s); y++) _ = _.redSqr();
                        r(y < p);
                        var b = this.pow(c, new a(1).iushln(p - y - 1));
                        l = l.redMul(b), c = b.redSqr(), h = h.redMul(c), p = y
                    }
                    return l
                }, w.prototype.invm = function(t) {
                    var e = t._invmp(this.m);
                    return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                }, w.prototype.pow = function(t, e) {
                    if (e.isZero()) return new a(1).toRed(this);
                    if (0 === e.cmpn(1)) return t.clone();
                    var i = new Array(16);
                    i[0] = new a(1).toRed(this), i[1] = t;
                    for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t);
                    var n = i[0],
                        o = 0,
                        s = 0,
                        d = e.bitLength() % 26;
                    for (0 === d && (d = 26), r = e.length - 1; r >= 0; r--) {
                        for (var u = e.words[r], f = d - 1; f >= 0; f--) {
                            var c = u >> f & 1;
                            n !== i[0] && (n = this.sqr(n)), 0 !== c || 0 !== o ? (o <<= 1, o |= c, (4 === ++s || 0 === r && 0 === f) && (n = this.mul(n, i[o]), s = 0, o = 0)) : s = 0
                        }
                        d = 26
                    }
                    return n
                }, w.prototype.convertTo = function(t) {
                    var e = t.umod(this.m);
                    return e === t ? e.clone() : e
                }, w.prototype.convertFrom = function(t) {
                    var e = t.clone();
                    return e.red = null, e
                }, a.mont = function(t) {
                    return new E(t)
                }, n(E, w), E.prototype.convertTo = function(t) {
                    return this.imod(t.ushln(this.shift))
                }, E.prototype.convertFrom = function(t) {
                    var e = this.imod(t.mul(this.rinv));
                    return e.red = null, e
                }, E.prototype.imul = function(t, e) {
                    if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                    var i = t.imul(e),
                        r = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = i.isub(r).iushrn(this.shift),
                        a = n;
                    return n.cmp(this.m) >= 0 ? a = n.isub(this.m) : n.cmpn(0) < 0 && (a = n.iadd(this.m)), a._forceRed(this)
                }, E.prototype.mul = function(t, e) {
                    if (t.isZero() || e.isZero()) return new a(0)._forceRed(this);
                    var i = t.mul(e),
                        r = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = i.isub(r).iushrn(this.shift),
                        o = n;
                    return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
                }, E.prototype.invm = function(t) {
                    return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                }
            }(void 0 === t || t, this)
        }).call(this, i("YuTi")(t))
    },
    OfWw: function(t, e, i) {
        var r = i("hwdV").Buffer;

        function n(t) {
            r.isBuffer(t) || (t = r.from(t));
            for (var e = t.length / 4 | 0, i = new Array(e), n = 0; n < e; n++) i[n] = t.readUInt32BE(4 * n);
            return i
        }

        function a(t) {
            for (; 0 < t.length; t++) t[0] = 0
        }

        function o(t, e, i, r, n) {
            for (var a, o, s, d, u = i[0], f = i[1], c = i[2], l = i[3], h = t[0] ^ e[0], p = t[1] ^ e[1], _ = t[2] ^ e[2], y = t[3] ^ e[3], b = 4, g = 1; g < n; g++) a = u[h >>> 24] ^ f[p >>> 16 & 255] ^ c[_ >>> 8 & 255] ^ l[255 & y] ^ e[b++], o = u[p >>> 24] ^ f[_ >>> 16 & 255] ^ c[y >>> 8 & 255] ^ l[255 & h] ^ e[b++], s = u[_ >>> 24] ^ f[y >>> 16 & 255] ^ c[h >>> 8 & 255] ^ l[255 & p] ^ e[b++], d = u[y >>> 24] ^ f[h >>> 16 & 255] ^ c[p >>> 8 & 255] ^ l[255 & _] ^ e[b++], h = a, p = o, _ = s, y = d;
            return a = (r[h >>> 24] << 24 | r[p >>> 16 & 255] << 16 | r[_ >>> 8 & 255] << 8 | r[255 & y]) ^ e[b++], o = (r[p >>> 24] << 24 | r[_ >>> 16 & 255] << 16 | r[y >>> 8 & 255] << 8 | r[255 & h]) ^ e[b++], s = (r[_ >>> 24] << 24 | r[y >>> 16 & 255] << 16 | r[h >>> 8 & 255] << 8 | r[255 & p]) ^ e[b++], d = (r[y >>> 24] << 24 | r[h >>> 16 & 255] << 16 | r[p >>> 8 & 255] << 8 | r[255 & _]) ^ e[b++], [a >>>= 0, o >>>= 0, s >>>= 0, d >>>= 0]
        }
        var s = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
            d = function() {
                for (var t = new Array(256), e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
                for (var i = [], r = [], n = [
                        [],
                        [],
                        [],
                        []
                    ], a = [
                        [],
                        [],
                        [],
                        []
                    ], o = 0, s = 0, d = 0; d < 256; ++d) {
                    var u = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
                    u = u >>> 8 ^ 255 & u ^ 99, i[o] = u, r[u] = o;
                    var f = t[o],
                        c = t[f],
                        l = t[c],
                        h = 257 * t[u] ^ 16843008 * u;
                    n[0][o] = h << 24 | h >>> 8, n[1][o] = h << 16 | h >>> 16, n[2][o] = h << 8 | h >>> 24, n[3][o] = h, h = 16843009 * l ^ 65537 * c ^ 257 * f ^ 16843008 * o, a[0][u] = h << 24 | h >>> 8, a[1][u] = h << 16 | h >>> 16, a[2][u] = h << 8 | h >>> 24, a[3][u] = h, 0 === o ? o = s = 1 : (o = f ^ t[t[t[l ^ f]]], s ^= t[t[s]])
                }
                return {
                    SBOX: i,
                    INV_SBOX: r,
                    SUB_MIX: n,
                    INV_SUB_MIX: a
                }
            }();

        function u(t) {
            this._key = n(t), this._reset()
        }
        u.blockSize = 16, u.keySize = 32, u.prototype.blockSize = u.blockSize, u.prototype.keySize = u.keySize, u.prototype._reset = function() {
            for (var t = this._key, e = t.length, i = e + 6, r = 4 * (i + 1), n = [], a = 0; a < e; a++) n[a] = t[a];
            for (a = e; a < r; a++) {
                var o = n[a - 1];
                a % e == 0 ? (o = o << 8 | o >>> 24, o = d.SBOX[o >>> 24] << 24 | d.SBOX[o >>> 16 & 255] << 16 | d.SBOX[o >>> 8 & 255] << 8 | d.SBOX[255 & o], o ^= s[a / e | 0] << 24) : e > 6 && a % e == 4 && (o = d.SBOX[o >>> 24] << 24 | d.SBOX[o >>> 16 & 255] << 16 | d.SBOX[o >>> 8 & 255] << 8 | d.SBOX[255 & o]), n[a] = n[a - e] ^ o
            }
            for (var u = [], f = 0; f < r; f++) {
                var c = r - f,
                    l = n[c - (f % 4 ? 0 : 4)];
                u[f] = f < 4 || c <= 4 ? l : d.INV_SUB_MIX[0][d.SBOX[l >>> 24]] ^ d.INV_SUB_MIX[1][d.SBOX[l >>> 16 & 255]] ^ d.INV_SUB_MIX[2][d.SBOX[l >>> 8 & 255]] ^ d.INV_SUB_MIX[3][d.SBOX[255 & l]]
            }
            this._nRounds = i, this._keySchedule = n, this._invKeySchedule = u
        }, u.prototype.encryptBlockRaw = function(t) {
            return o(t = n(t), this._keySchedule, d.SUB_MIX, d.SBOX, this._nRounds)
        }, u.prototype.encryptBlock = function(t) {
            var e = this.encryptBlockRaw(t),
                i = r.allocUnsafe(16);
            return i.writeUInt32BE(e[0], 0), i.writeUInt32BE(e[1], 4), i.writeUInt32BE(e[2], 8), i.writeUInt32BE(e[3], 12), i
        }, u.prototype.decryptBlock = function(t) {
            var e = (t = n(t))[1];
            t[1] = t[3], t[3] = e;
            var i = o(t, this._invKeySchedule, d.INV_SUB_MIX, d.INV_SBOX, this._nRounds),
                a = r.allocUnsafe(16);
            return a.writeUInt32BE(i[0], 0), a.writeUInt32BE(i[3], 4), a.writeUInt32BE(i[2], 8), a.writeUInt32BE(i[1], 12), a
        }, u.prototype.scrub = function() {
            a(this._keySchedule), a(this._invKeySchedule), a(this._key)
        }, t.exports.AES = u
    },
    Onz0: function(t, e, i) {
        (function(t) {
            function i(t) {
                return Object.prototype.toString.call(t)
            }
            e.isArray = function(t) {
                return Array.isArray ? Array.isArray(t) : "[object Array]" === i(t)
            }, e.isBoolean = function(t) {
                return "boolean" == typeof t
            }, e.isNull = function(t) {
                return null === t
            }, e.isNullOrUndefined = function(t) {
                return null == t
            }, e.isNumber = function(t) {
                return "number" == typeof t
            }, e.isString = function(t) {
                return "string" == typeof t
            }, e.isSymbol = function(t) {
                return "symbol" == typeof t
            }, e.isUndefined = function(t) {
                return void 0 === t
            }, e.isRegExp = function(t) {
                return "[object RegExp]" === i(t)
            }, e.isObject = function(t) {
                return "object" == typeof t && null !== t
            }, e.isDate = function(t) {
                return "[object Date]" === i(t)
            }, e.isError = function(t) {
                return "[object Error]" === i(t) || t instanceof Error
            }, e.isFunction = function(t) {
                return "function" == typeof t
            }, e.isPrimitive = function(t) {
                return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
            }, e.isBuffer = t.isBuffer
        }).call(this, i("tjlA").Buffer)
    },
    P2KE: function(t, e, i) {
        var r = i("hwdV").Buffer,
            n = r.alloc(16, 0);

        function a(t) {
            var e = r.allocUnsafe(16);
            return e.writeUInt32BE(t[0] >>> 0, 0), e.writeUInt32BE(t[1] >>> 0, 4), e.writeUInt32BE(t[2] >>> 0, 8), e.writeUInt32BE(t[3] >>> 0, 12), e
        }

        function o(t) {
            this.h = t, this.state = r.alloc(16, 0), this.cache = r.allocUnsafe(0)
        }
        o.prototype.ghash = function(t) {
            for (var e = -1; ++e < t.length;) this.state[e] ^= t[e];
            this._multiply()
        }, o.prototype._multiply = function() {
            for (var t, e, i, r = [(t = this.h).readUInt32BE(0), t.readUInt32BE(4), t.readUInt32BE(8), t.readUInt32BE(12)], n = [0, 0, 0, 0], o = -1; ++o < 128;) {
                for (0 != (this.state[~~(o / 8)] & 1 << 7 - o % 8) && (n[0] ^= r[0], n[1] ^= r[1], n[2] ^= r[2], n[3] ^= r[3]), i = 0 != (1 & r[3]), e = 3; e > 0; e--) r[e] = r[e] >>> 1 | (1 & r[e - 1]) << 31;
                r[0] = r[0] >>> 1, i && (r[0] = r[0] ^ 225 << 24)
            }
            this.state = a(n)
        }, o.prototype.update = function(t) {
            var e;
            for (this.cache = r.concat([this.cache, t]); this.cache.length >= 16;) e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(e)
        }, o.prototype.final = function(t, e) {
            return this.cache.length && this.ghash(r.concat([this.cache, n], 16)), this.ghash(a([0, t, 0, e])), this.state
        }, t.exports = o
    },
    P7XM: function(t, e) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(t, e) {
            t.super_ = e;
            var i = function() {};
            i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
        }
    },
    "PMB/": function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return loadAllPlaylistAudios
        });
        var AUDIO_LOAD_CHUNK_SIZE = 2e3;

        function loadAllPlaylistAudios(playlist, onDone) {
            if (!playlist.hasMore() || !playlist.isFullyLoadable()) return onDone && onDone();
            var chunks = [],
                totalCount = playlist.getTotalCount(),
                isDeleted = !1,
                onAllLoaded = function() {
                    if (isDeleted) return onDone && onDone(null, isDeleted);
                    var t = [];
                    each(chunks, function(e, i) {
                        i && (t = t.concat(i))
                    }), each(getAudioPlayer().getPlaylists(), function(e, i) {
                        i.getId() === playlist.getId() && (i._list = t)
                    }), getAudioPlayer().mergePlaylistData(playlist, {
                        hasMore: !1
                    }), onDone && onDone(playlist)
                },
                loadChunk = function loadChunk(chunkIndex, _cb) {
                    ajax.post("al_audio.php", {
                        act: "load_section",
                        type: playlist.getType(),
                        owner_id: playlist.getOwnerId(),
                        playlist_id: playlist.getPlaylistId(),
                        access_hash: playlist.getAccessHash(),
                        from_id: playlist.getFromId(),
                        offset: chunkIndex * AUDIO_LOAD_CHUNK_SIZE,
                        is_loading_all: 1,
                        claim: intval(nav.objLoc.claim)
                    }, {
                        onDone: function onDone(data, tpl, langs, templatesScript) {
                            if (0 === chunkIndex) {
                                if (addTemplates({
                                        audio_playlist_snippet: tpl
                                    }), extend(cur.lang, langs), templatesScript && eval(templatesScript), !data) return isDeleted = !0, _cb();
                                totalCount = data.totalCount, getAudioPlayer().mergePlaylistData(playlist, data)
                            }
                            chunks[chunkIndex] = data.list, _cb()
                        }
                    })
                },
                loadAllChunks = function(t, e) {
                    e = e || 0;
                    var i = Math.max(0, Math.ceil(totalCount / AUDIO_LOAD_CHUNK_SIZE));
                    i - e <= 0 ? t() : function() {
                        for (var r = new CallHub(t, i - e), n = e; n < i; n++) loadChunk(n, function() {
                            r.done()
                        })
                    }()
                };
            void 0 === totalCount ? loadChunk(0, function() {
                isDeleted ? onAllLoaded() : loadAllChunks(onAllLoaded, 1)
            }) : loadAllChunks(onAllLoaded, 0)
        }
    },
    "Pa+m": function(t, e, i) {
        "use strict";
        var r = i("QTa/"),
            n = i("MzeL"),
            a = i("OZ/i"),
            o = i("P7XM"),
            s = r.base,
            d = n.utils.assert;

        function u(t) {
            this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, s.call(this, "edwards", t), this.a = new a(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new a(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new a(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), d(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | t.c)
        }

        function f(t, e, i, r, n) {
            s.BasePoint.call(this, t, "projective"), null === e && null === i && null === r ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new a(e, 16), this.y = new a(i, 16), this.z = r ? new a(r, 16) : this.curve.one, this.t = n && new a(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
        }
        o(u, s), t.exports = u, u.prototype._mulA = function(t) {
            return this.mOneA ? t.redNeg() : this.a.redMul(t)
        }, u.prototype._mulC = function(t) {
            return this.oneC ? t : this.c.redMul(t)
        }, u.prototype.jpoint = function(t, e, i, r) {
            return this.point(t, e, i, r)
        }, u.prototype.pointFromX = function(t, e) {
            (t = new a(t, 16)).red || (t = t.toRed(this.red));
            var i = t.redSqr(),
                r = this.c2.redSub(this.a.redMul(i)),
                n = this.one.redSub(this.c2.redMul(this.d).redMul(i)),
                o = r.redMul(n.redInvm()),
                s = o.redSqrt();
            if (0 !== s.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
            var d = s.fromRed().isOdd();
            return (e && !d || !e && d) && (s = s.redNeg()), this.point(t, s)
        }, u.prototype.pointFromY = function(t, e) {
            (t = new a(t, 16)).red || (t = t.toRed(this.red));
            var i = t.redSqr(),
                r = i.redSub(this.one),
                n = i.redMul(this.d).redAdd(this.one),
                o = r.redMul(n.redInvm());
            if (0 === o.cmp(this.zero)) {
                if (e) throw new Error("invalid point");
                return this.point(this.zero, t)
            }
            var s = o.redSqrt();
            if (0 !== s.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
            return s.isOdd() !== e && (s = s.redNeg()), this.point(s, t)
        }, u.prototype.validate = function(t) {
            if (t.isInfinity()) return !0;
            t.normalize();
            var e = t.x.redSqr(),
                i = t.y.redSqr(),
                r = e.redMul(this.a).redAdd(i),
                n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(i)));
            return 0 === r.cmp(n)
        }, o(f, s.BasePoint), u.prototype.pointFromJSON = function(t) {
            return f.fromJSON(this, t)
        }, u.prototype.point = function(t, e, i, r) {
            return new f(this, t, e, i, r)
        }, f.fromJSON = function(t, e) {
            return new f(t, e[0], e[1], e[2])
        }, f.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }, f.prototype.isInfinity = function() {
            return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
        }, f.prototype._extDbl = function() {
            var t = this.x.redSqr(),
                e = this.y.redSqr(),
                i = this.z.redSqr();
            i = i.redIAdd(i);
            var r = this.curve._mulA(t),
                n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
                a = r.redAdd(e),
                o = a.redSub(i),
                s = r.redSub(e),
                d = n.redMul(o),
                u = a.redMul(s),
                f = n.redMul(s),
                c = o.redMul(a);
            return this.curve.point(d, u, c, f)
        }, f.prototype._projDbl = function() {
            var t, e, i, r = this.x.redAdd(this.y).redSqr(),
                n = this.x.redSqr(),
                a = this.y.redSqr();
            if (this.curve.twisted) {
                var o = (u = this.curve._mulA(n)).redAdd(a);
                if (this.zOne) t = r.redSub(n).redSub(a).redMul(o.redSub(this.curve.two)), e = o.redMul(u.redSub(a)), i = o.redSqr().redSub(o).redSub(o);
                else {
                    var s = this.z.redSqr(),
                        d = o.redSub(s).redISub(s);
                    t = r.redSub(n).redISub(a).redMul(d), e = o.redMul(u.redSub(a)), i = o.redMul(d)
                }
            } else {
                var u = n.redAdd(a);
                s = this.curve._mulC(this.c.redMul(this.z)).redSqr(), d = u.redSub(s).redSub(s);
                t = this.curve._mulC(r.redISub(u)).redMul(d), e = this.curve._mulC(u).redMul(n.redISub(a)), i = u.redMul(d)
            }
            return this.curve.point(t, e, i)
        }, f.prototype.dbl = function() {
            return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
        }, f.prototype._extAdd = function(t) {
            var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
                i = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
                r = this.t.redMul(this.curve.dd).redMul(t.t),
                n = this.z.redMul(t.z.redAdd(t.z)),
                a = i.redSub(e),
                o = n.redSub(r),
                s = n.redAdd(r),
                d = i.redAdd(e),
                u = a.redMul(o),
                f = s.redMul(d),
                c = a.redMul(d),
                l = o.redMul(s);
            return this.curve.point(u, f, l, c)
        }, f.prototype._projAdd = function(t) {
            var e, i, r = this.z.redMul(t.z),
                n = r.redSqr(),
                a = this.x.redMul(t.x),
                o = this.y.redMul(t.y),
                s = this.curve.d.redMul(a).redMul(o),
                d = n.redSub(s),
                u = n.redAdd(s),
                f = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(a).redISub(o),
                c = r.redMul(d).redMul(f);
            return this.curve.twisted ? (e = r.redMul(u).redMul(o.redSub(this.curve._mulA(a))), i = d.redMul(u)) : (e = r.redMul(u).redMul(o.redSub(a)), i = this.curve._mulC(d).redMul(u)), this.curve.point(c, e, i)
        }, f.prototype.add = function(t) {
            return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
        }, f.prototype.mul = function(t) {
            return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
        }, f.prototype.mulAdd = function(t, e, i) {
            return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !1)
        }, f.prototype.jmulAdd = function(t, e, i) {
            return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !0)
        }, f.prototype.normalize = function() {
            if (this.zOne) return this;
            var t = this.z.redInvm();
            return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
        }, f.prototype.neg = function() {
            return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
        }, f.prototype.getX = function() {
            return this.normalize(), this.x.fromRed()
        }, f.prototype.getY = function() {
            return this.normalize(), this.y.fromRed()
        }, f.prototype.eq = function(t) {
            return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
        }, f.prototype.eqXToP = function(t) {
            var e = t.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(e)) return !0;
            for (var i = t.clone(), r = this.curve.redN.redMul(this.z);;) {
                if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0) return !1;
                if (e.redIAdd(r), 0 === this.x.cmp(e)) return !0
            }
            return !1
        }, f.prototype.toP = f.prototype.normalize, f.prototype.mixedAdd = f.prototype.add
    },
    QJsb: function(t, e) {
        t.exports = {
            doubles: {
                step: 4,
                points: [
                    ["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],
                    ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],
                    ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],
                    ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],
                    ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],
                    ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],
                    ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],
                    ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],
                    ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],
                    ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],
                    ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],
                    ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],
                    ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],
                    ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],
                    ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],
                    ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],
                    ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],
                    ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],
                    ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],
                    ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],
                    ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],
                    ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],
                    ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],
                    ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],
                    ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],
                    ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],
                    ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],
                    ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],
                    ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],
                    ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],
                    ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],
                    ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],
                    ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],
                    ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],
                    ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],
                    ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],
                    ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],
                    ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],
                    ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],
                    ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],
                    ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],
                    ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],
                    ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],
                    ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],
                    ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],
                    ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],
                    ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],
                    ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],
                    ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],
                    ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],
                    ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],
                    ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],
                    ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],
                    ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],
                    ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],
                    ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],
                    ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],
                    ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],
                    ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],
                    ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],
                    ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],
                    ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],
                    ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],
                    ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],
                    ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]
                ]
            },
            naf: {
                wnd: 7,
                points: [
                    ["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],
                    ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],
                    ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],
                    ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],
                    ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],
                    ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],
                    ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],
                    ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],
                    ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],
                    ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],
                    ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],
                    ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],
                    ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],
                    ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],
                    ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],
                    ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],
                    ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],
                    ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],
                    ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],
                    ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],
                    ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],
                    ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],
                    ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],
                    ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],
                    ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],
                    ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],
                    ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],
                    ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],
                    ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],
                    ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],
                    ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],
                    ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],
                    ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],
                    ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],
                    ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],
                    ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],
                    ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],
                    ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],
                    ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],
                    ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],
                    ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],
                    ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],
                    ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],
                    ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],
                    ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],
                    ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],
                    ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],
                    ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],
                    ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],
                    ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],
                    ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],
                    ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],
                    ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],
                    ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],
                    ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],
                    ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],
                    ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],
                    ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],
                    ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],
                    ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],
                    ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],
                    ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],
                    ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],
                    ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],
                    ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],
                    ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],
                    ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],
                    ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],
                    ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],
                    ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],
                    ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],
                    ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],
                    ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],
                    ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],
                    ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],
                    ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],
                    ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],
                    ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],
                    ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],
                    ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],
                    ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],
                    ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],
                    ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],
                    ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],
                    ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],
                    ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],
                    ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],
                    ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],
                    ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],
                    ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],
                    ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],
                    ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],
                    ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],
                    ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],
                    ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],
                    ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],
                    ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],
                    ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],
                    ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],
                    ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],
                    ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],
                    ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],
                    ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],
                    ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],
                    ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],
                    ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],
                    ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],
                    ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],
                    ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],
                    ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],
                    ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],
                    ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],
                    ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],
                    ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],
                    ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],
                    ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],
                    ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],
                    ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],
                    ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],
                    ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],
                    ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],
                    ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],
                    ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],
                    ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],
                    ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],
                    ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],
                    ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]
                ]
            }
        }
    },
    QRH4: function(t, e, i) {
        "use strict";
        var r = i("f3pb");
        e.certificate = i("VrUr");
        var n = r.define("RSAPrivateKey", function() {
            this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int())
        });
        e.RSAPrivateKey = n;
        var a = r.define("RSAPublicKey", function() {
            this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int())
        });
        e.RSAPublicKey = a;
        var o = r.define("SubjectPublicKeyInfo", function() {
            this.seq().obj(this.key("algorithm").use(s), this.key("subjectPublicKey").bitstr())
        });
        e.PublicKey = o;
        var s = r.define("AlgorithmIdentifier", function() {
                this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional())
            }),
            d = r.define("PrivateKeyInfo", function() {
                this.seq().obj(this.key("version").int(), this.key("algorithm").use(s), this.key("subjectPrivateKey").octstr())
            });
        e.PrivateKey = d;
        var u = r.define("EncryptedPrivateKeyInfo", function() {
            this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr())
        });
        e.EncryptedPrivateKey = u;
        var f = r.define("DSAPrivateKey", function() {
            this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int())
        });
        e.DSAPrivateKey = f, e.DSAparam = r.define("DSAparam", function() {
            this.int()
        });
        var c = r.define("ECPrivateKey", function() {
            this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(l), this.key("publicKey").optional().explicit(1).bitstr())
        });
        e.ECPrivateKey = c;
        var l = r.define("ECParameters", function() {
            this.choice({
                namedCurve: this.objid()
            })
        });
        e.signature = r.define("signature", function() {
            this.seq().obj(this.key("r").int(), this.key("s").int())
        })
    },
    "QTa/": function(t, e, i) {
        "use strict";
        var r = e;
        r.base = i("6lN/"), r.short = i("MwBp"), r.mont = i("Z2+3"), r.edwards = i("Pa+m")
    },
    "Qd/k": function(t, e, i) {
        var r = e;
        r.Reporter = i("0cit").Reporter, r.DecoderBuffer = i("YoN+").DecoderBuffer, r.EncoderBuffer = i("YoN+").EncoderBuffer, r.Node = i("g2Dh")
    },
    QihY: function(t, e, i) {
        var r = i("gvAe"),
            n = i("hwdV").Buffer,
            a = i("usKN"),
            o = i("CfXC"),
            s = i("ZDAU"),
            d = i("OfWw"),
            u = i("roQf");

        function f(t, e, i) {
            s.call(this), this._cache = new c, this._last = void 0, this._cipher = new d.AES(e), this._prev = n.from(i), this._mode = t, this._autopadding = !0
        }

        function c() {
            this.cache = n.allocUnsafe(0)
        }

        function l(t, e, i) {
            var s = a[t.toLowerCase()];
            if (!s) throw new TypeError("invalid suite type");
            if ("string" == typeof i && (i = n.from(i)), "GCM" !== s.mode && i.length !== s.iv) throw new TypeError("invalid iv length " + i.length);
            if ("string" == typeof e && (e = n.from(e)), e.length !== s.key / 8) throw new TypeError("invalid key length " + e.length);
            return "stream" === s.type ? new o(s.module, e, i, !0) : "auth" === s.type ? new r(s.module, e, i, !0) : new f(s.module, e, i)
        }
        i("P7XM")(f, s), f.prototype._update = function(t) {
            var e, i;
            this._cache.add(t);
            for (var r = []; e = this._cache.get(this._autopadding);) i = this._mode.decrypt(this, e), r.push(i);
            return n.concat(r)
        }, f.prototype._final = function() {
            var t = this._cache.flush();
            if (this._autopadding) return function(t) {
                var e = t[15];
                if (e < 1 || e > 16) throw new Error("unable to decrypt data");
                var i = -1;
                for (; ++i < e;)
                    if (t[i + (16 - e)] !== e) throw new Error("unable to decrypt data");
                if (16 === e) return;
                return t.slice(0, 16 - e)
            }(this._mode.decrypt(this, t));
            if (t) throw new Error("data not multiple of block length")
        }, f.prototype.setAutoPadding = function(t) {
            return this._autopadding = !!t, this
        }, c.prototype.add = function(t) {
            this.cache = n.concat([this.cache, t])
        }, c.prototype.get = function(t) {
            var e;
            if (t) {
                if (this.cache.length > 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e
            } else if (this.cache.length >= 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e;
            return null
        }, c.prototype.flush = function() {
            if (this.cache.length) return this.cache
        }, e.createDecipher = function(t, e) {
            var i = a[t.toLowerCase()];
            if (!i) throw new TypeError("invalid suite type");
            var r = u(e, !1, i.key, i.iv);
            return l(t, r.key, r.iv)
        }, e.createDecipheriv = l
    },
    QpuX: function(t, e, i) {
        t.exports = i("+qE3").EventEmitter
    },
    RKMU: function(t, e, i) {
        "use strict";
        var r = i("OZ/i"),
            n = i("MzeL").utils,
            a = n.assert,
            o = n.cachedProperty,
            s = n.parseBytes;

        function d(t, e) {
            this.eddsa = t, "object" != typeof e && (e = s(e)), Array.isArray(e) && (e = {
                R: e.slice(0, t.encodingLength),
                S: e.slice(t.encodingLength)
            }), a(e.R && e.S, "Signature without R or S"), t.isPoint(e.R) && (this._R = e.R), e.S instanceof r && (this._S = e.S), this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded, this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded
        }
        o(d, "S", function() {
            return this.eddsa.decodeInt(this.Sencoded())
        }), o(d, "R", function() {
            return this.eddsa.decodePoint(this.Rencoded())
        }), o(d, "Rencoded", function() {
            return this.eddsa.encodePoint(this.R())
        }), o(d, "Sencoded", function() {
            return this.eddsa.encodeInt(this.S())
        }), d.prototype.toBytes = function() {
            return this.Rencoded().concat(this.Sencoded())
        }, d.prototype.toHex = function() {
            return n.encode(this.toBytes(), "hex").toUpperCase()
        }, t.exports = d
    },
    RbYe: function(t, e, i) {
        "use strict";

        function r(t) {
            var e = window.getSelection();
            return e.removeAllRanges(), e.addRange(t), t
        }

        function n(t, e, i, n) {
            var a = document.createRange();
            return a.setStart(t, e), a.setEnd(i, n), r(a)
        }

        function a(t, e) {
            if (e = e ? e + "" : "", !browser.msie && document.execCommand) document.execCommand("insertHTML", !1, e);
            else if (t) {
                t.deleteContents();
                var i = cf(e),
                    n = i.lastChild;
                t.insertNode(i), n && ((t = t.cloneRange()).setStartAfter(n), t.collapse(!0), r(t))
            }
            return t
        }
        var o = i("E2g8");
        i.d(e, "c", function() {
            return u
        }), i.d(e, "a", function() {
            return l
        }), i.d(e, "b", function() {
            return h
        });
        var s = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            r = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (i.push(o.value), !e || i.length !== e); r = !0);
                        } catch (t) {
                            n = !0, a = t
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            d = o.Promise;

        function u(t) {
            var e = function(t) {
                return t && t.clipboardData ? t.clipboardData : t && t.originalEvent && t.originalEvent.clipboardData ? t.originalEvent.clipboardData : window.clipboardData
            }(t);
            if (!e) return [];
            var i = e.items;
            if (!i) return [];
            for (var r = [], n = 0; n < i.length; n++) 0 == i[n].type.indexOf("image") && r.push(i[n].getAsFile());
            return r
        }
        var f = !1,
            c = null;

        function l(t) {
            return new d(function(e, i) {
                if (f) return cancelEvent(t), i();
                var r = function() {
                        var t = null,
                            e = window.getSelection();
                        e.getRangeAt && e.rangeCount && (t = e.getRangeAt(0));
                        var i = null,
                            r = null,
                            n = 0,
                            a = 0,
                            o = document.activeElement;
                        return t && ("selectionStart" in o ? (i = o, r = o, n = o.selectionStart, a = o.selectionEnd) : e.rangeCount && (i = t.startContainer, r = t.endContainer, n = t.startOffset, a = t.endOffset)), [t, i, n, r, a]
                    }(),
                    o = s(r, 5),
                    u = o[0],
                    l = o[1],
                    h = o[2],
                    p = o[3],
                    _ = o[4];
                if (u) {
                    if ("paste" === t.type) {
                        var y = t.clipboardData || t.originalEvent && t.originalEvent.clipboardData;
                        if (y && y.types && y.getData) {
                            cancelEvent(t), f = !0;
                            var b = y.getData("text/html") || clean(y.getData("text/plain")) || "";
                            return e([b, function(t) {
                                a(u, t), f = !1
                            }])
                        }
                        for (var g = cf(), v = t.target || window.event.srcElement; v.firstChild;) g.appendChild(v.firstChild);
                        return new d(function(t) {
                            return setTimeout(function() {
                                var e = v.innerHTML || "";
                                v.innerHTML = "", v.appendChild(g), t([e, function(t) {
                                    a(u = n(l, h, p, _), t), f = !1
                                }])
                            }, 0)
                        })
                    }
                    if ("beforepaste" === t.type) return f = !0,
                        function() {
                            if (!c) {
                                var t = ge("utils");
                                c = ce("div", {}, {
                                    width: "10px",
                                    height: "10px",
                                    overflow: "hidden"
                                }), attr(c, "contenteditable", "true"), t.appendChild(c)
                            }
                        }(), c.focus(), void(c.onpaste = function() {
                            setTimeout(function() {
                                var t = c.innerHTML || "";
                                c.innerHTML = "", delete c.onpaste, e([t, function(t) {
                                    a(u = n(l, h, p, _), t), f = !1
                                }])
                            }, 0)
                        })
                }
                return i()
            })
        }

        function h(t) {
            var e = document.createElement("input"),
                i = document.activeElement;
            e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), i.focus()
        }
    },
    RoFp: function(t, e, i) {
        "use strict";
        var r = i("acAU");

        function n(t, e) {
            t.emit("error", e)
        }
        t.exports = {
            destroy: function(t, e) {
                var i = this,
                    a = this._readableState && this._readableState.destroyed,
                    o = this._writableState && this._writableState.destroyed;
                return a || o ? (e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || r.nextTick(n, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(t) {
                    !e && t ? (r.nextTick(n, i, t), i._writableState && (i._writableState.errorEmitted = !0)) : e && e(t)
                }), this)
            },
            undestroy: function() {
                this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
            }
        }
    },
    T9HO: function(t, e, i) {
        var r = i("P7XM"),
            n = i("tnIz"),
            a = i("hwdV").Buffer,
            o = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
            s = new Array(160);

        function d() {
            this.init(), this._w = s, n.call(this, 128, 112)
        }

        function u(t, e, i) {
            return i ^ t & (e ^ i)
        }

        function f(t, e, i) {
            return t & e | i & (t | e)
        }

        function c(t, e) {
            return (t >>> 28 | e << 4) ^ (e >>> 2 | t << 30) ^ (e >>> 7 | t << 25)
        }

        function l(t, e) {
            return (t >>> 14 | e << 18) ^ (t >>> 18 | e << 14) ^ (e >>> 9 | t << 23)
        }

        function h(t, e) {
            return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ t >>> 7
        }

        function p(t, e) {
            return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ (t >>> 7 | e << 25)
        }

        function _(t, e) {
            return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ t >>> 6
        }

        function y(t, e) {
            return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ (t >>> 6 | e << 26)
        }

        function b(t, e) {
            return t >>> 0 < e >>> 0 ? 1 : 0
        }
        r(d, n), d.prototype.init = function() {
            return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
        }, d.prototype._update = function(t) {
            for (var e = this._w, i = 0 | this._ah, r = 0 | this._bh, n = 0 | this._ch, a = 0 | this._dh, s = 0 | this._eh, d = 0 | this._fh, g = 0 | this._gh, v = 0 | this._hh, m = 0 | this._al, A = 0 | this._bl, w = 0 | this._cl, E = 0 | this._dl, P = 0 | this._el, S = 0 | this._fl, I = 0 | this._gl, T = 0 | this._hl, M = 0; M < 32; M += 2) e[M] = t.readInt32BE(4 * M), e[M + 1] = t.readInt32BE(4 * M + 4);
            for (; M < 160; M += 2) {
                var C = e[M - 30],
                    k = e[M - 30 + 1],
                    D = h(C, k),
                    L = p(k, C),
                    O = _(C = e[M - 4], k = e[M - 4 + 1]),
                    x = y(k, C),
                    R = e[M - 14],
                    U = e[M - 14 + 1],
                    N = e[M - 32],
                    B = e[M - 32 + 1],
                    j = L + U | 0,
                    F = D + R + b(j, L) | 0;
                F = (F = F + O + b(j = j + x | 0, x) | 0) + N + b(j = j + B | 0, B) | 0, e[M] = F, e[M + 1] = j
            }
            for (var V = 0; V < 160; V += 2) {
                F = e[V], j = e[V + 1];
                var q = f(i, r, n),
                    H = f(m, A, w),
                    X = c(i, m),
                    z = c(m, i),
                    W = l(s, P),
                    Y = l(P, s),
                    K = o[V],
                    G = o[V + 1],
                    Z = u(s, d, g),
                    J = u(P, S, I),
                    Q = T + Y | 0,
                    $ = v + W + b(Q, T) | 0;
                $ = ($ = ($ = $ + Z + b(Q = Q + J | 0, J) | 0) + K + b(Q = Q + G | 0, G) | 0) + F + b(Q = Q + j | 0, j) | 0;
                var tt = z + H | 0,
                    et = X + q + b(tt, z) | 0;
                v = g, T = I, g = d, I = S, d = s, S = P, s = a + $ + b(P = E + Q | 0, E) | 0, a = n, E = w, n = r, w = A, r = i, A = m, i = $ + et + b(m = Q + tt | 0, Q) | 0
            }
            this._al = this._al + m | 0, this._bl = this._bl + A | 0, this._cl = this._cl + w | 0, this._dl = this._dl + E | 0, this._el = this._el + P | 0, this._fl = this._fl + S | 0, this._gl = this._gl + I | 0, this._hl = this._hl + T | 0, this._ah = this._ah + i + b(this._al, m) | 0, this._bh = this._bh + r + b(this._bl, A) | 0, this._ch = this._ch + n + b(this._cl, w) | 0, this._dh = this._dh + a + b(this._dl, E) | 0, this._eh = this._eh + s + b(this._el, P) | 0, this._fh = this._fh + d + b(this._fl, S) | 0, this._gh = this._gh + g + b(this._gl, I) | 0, this._hh = this._hh + v + b(this._hl, T) | 0
        }, d.prototype._hash = function() {
            var t = a.allocUnsafe(64);

            function e(e, i, r) {
                t.writeInt32BE(e, r), t.writeInt32BE(i, r + 4)
            }
            return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), e(this._gh, this._gl, 48), e(this._hh, this._hl, 56), t
        }, t.exports = d
    },
    TdD3: function(t, e, i) {
        (function(e) {
            var r = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,
                n = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----/m,
                a = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,
                o = i("roQf"),
                s = i("/ab2");
            t.exports = function(t, i) {
                var d, u = t.toString(),
                    f = u.match(r);
                if (f) {
                    var c = "aes" + f[1],
                        l = new e(f[2], "hex"),
                        h = new e(f[3].replace(/[\r\n]/g, ""), "base64"),
                        p = o(i, l.slice(0, 8), parseInt(f[1], 10)).key,
                        _ = [],
                        y = s.createDecipheriv(c, p, l);
                    _.push(y.update(h)), _.push(y.final()), d = e.concat(_)
                } else {
                    var b = u.match(a);
                    d = new e(b[2].replace(/[\r\n]/g, ""), "base64")
                }
                return {
                    tag: u.match(n)[1],
                    data: d
                }
            }
        }).call(this, i("tjlA").Buffer)
    },
    Titl: function(t, e, i) {
        "use strict";
        var r = i("2j6C"),
            n = i("P7XM"),
            a = i("FUXG"),
            o = a.utils,
            s = a.Cipher;

        function d(t) {
            s.call(this, t);
            var e = new function() {
                this.tmp = new Array(2), this.keys = null
            };
            this._desState = e, this.deriveKeys(e, t.key)
        }
        n(d, s), t.exports = d, d.create = function(t) {
            return new d(t)
        };
        var u = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
        d.prototype.deriveKeys = function(t, e) {
            t.keys = new Array(32), r.equal(e.length, this.blockSize, "Invalid key length");
            var i = o.readUInt32BE(e, 0),
                n = o.readUInt32BE(e, 4);
            o.pc1(i, n, t.tmp, 0), i = t.tmp[0], n = t.tmp[1];
            for (var a = 0; a < t.keys.length; a += 2) {
                var s = u[a >>> 1];
                i = o.r28shl(i, s), n = o.r28shl(n, s), o.pc2(i, n, t.keys, a)
            }
        }, d.prototype._update = function(t, e, i, r) {
            var n = this._desState,
                a = o.readUInt32BE(t, e),
                s = o.readUInt32BE(t, e + 4);
            o.ip(a, s, n.tmp, 0), a = n.tmp[0], s = n.tmp[1], "encrypt" === this.type ? this._encrypt(n, a, s, n.tmp, 0) : this._decrypt(n, a, s, n.tmp, 0), a = n.tmp[0], s = n.tmp[1], o.writeUInt32BE(i, a, r), o.writeUInt32BE(i, s, r + 4)
        }, d.prototype._pad = function(t, e) {
            for (var i = t.length - e, r = e; r < t.length; r++) t[r] = i;
            return !0
        }, d.prototype._unpad = function(t) {
            for (var e = t[t.length - 1], i = t.length - e; i < t.length; i++) r.equal(t[i], e);
            return t.slice(0, t.length - e)
        }, d.prototype._encrypt = function(t, e, i, r, n) {
            for (var a = e, s = i, d = 0; d < t.keys.length; d += 2) {
                var u = t.keys[d],
                    f = t.keys[d + 1];
                o.expand(s, t.tmp, 0), u ^= t.tmp[0], f ^= t.tmp[1];
                var c = o.substitute(u, f),
                    l = s;
                s = (a ^ o.permute(c)) >>> 0, a = l
            }
            o.rip(s, a, r, n)
        }, d.prototype._decrypt = function(t, e, i, r, n) {
            for (var a = i, s = e, d = t.keys.length - 2; d >= 0; d -= 2) {
                var u = t.keys[d],
                    f = t.keys[d + 1];
                o.expand(a, t.tmp, 0), u ^= t.tmp[0], f ^= t.tmp[1];
                var c = o.substitute(u, f),
                    l = a;
                a = (s ^ o.permute(c)) >>> 0, s = l
            }
            o.rip(a, s, r, n)
        }
    },
    URgk: function(t, e, i) {
        (function(t) {
            var r = void 0 !== t && t || "undefined" != typeof self && self || window,
                n = Function.prototype.apply;

            function a(t, e) {
                this._id = t, this._clearFn = e
            }
            e.setTimeout = function() {
                return new a(n.call(setTimeout, r, arguments), clearTimeout)
            }, e.setInterval = function() {
                return new a(n.call(setInterval, r, arguments), clearInterval)
            }, e.clearTimeout = e.clearInterval = function(t) {
                t && t.close()
            }, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
                this._clearFn.call(r, this._id)
            }, e.enroll = function(t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e
            }, e.unenroll = function(t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
            }, e._unrefActive = e.active = function(t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                    t._onTimeout && t._onTimeout()
                }, e))
            }, i("YBdB"), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
        }).call(this, i("yLpj"))
    },
    UWVS: function(t, e, i) {
        (function(t) {
            var r = i("jIre");

            function n(t) {
                return t._prev = t._cipher.encryptBlock(t._prev), t._prev
            }
            e.encrypt = function(e, i) {
                for (; e._cache.length < i.length;) e._cache = t.concat([e._cache, n(e)]);
                var a = e._cache.slice(0, i.length);
                return e._cache = e._cache.slice(i.length), r(i, a)
            }
        }).call(this, i("tjlA").Buffer)
    },
    Ujlg: function(t, e, i) {
        var r = i("hwdV").Buffer;

        function n(t, e, i) {
            for (var r, n, o, s = -1, d = 0; ++s < 8;) r = t._cipher.encryptBlock(t._prev), n = e & 1 << 7 - s ? 128 : 0, d += (128 & (o = r[0] ^ n)) >> s % 8, t._prev = a(t._prev, i ? n : o);
            return d
        }

        function a(t, e) {
            var i = t.length,
                n = -1,
                a = r.allocUnsafe(t.length);
            for (t = r.concat([t, r.from([e])]); ++n < i;) a[n] = t[n] << 1 | t[n + 1] >> 7;
            return a
        }
        e.encrypt = function(t, e, i) {
            for (var a = e.length, o = r.allocUnsafe(a), s = -1; ++s < a;) o[s] = n(t, e[s], i);
            return o
        }
    },
    "UpF+": function(t, e, i) {
        (function(e) {
            var r = i("OZ/i");
            t.exports = function(t, i) {
                return new e(t.toRed(r.mont(i.modulus)).redPow(new r(i.publicExponent)).fromRed().toArray())
            }
        }).call(this, i("tjlA").Buffer)
    },
    Vh22: function(t, e, i) {
        (function(e) {
            var r = i("OZ/i"),
                n = new(i("ehAg")),
                a = new r(24),
                o = new r(11),
                s = new r(10),
                d = new r(3),
                u = new r(7),
                f = i("WKKt"),
                c = i("Edxu");

            function l(t, i) {
                return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this._pub = new r(t), this
            }

            function h(t, i) {
                return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this._priv = new r(t), this
            }
            t.exports = _;
            var p = {};

            function _(t, e, i) {
                this.setGenerator(e), this.__prime = new r(t), this._prime = r.mont(this.__prime), this._primeLen = t.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, i ? (this.setPublicKey = l, this.setPrivateKey = h) : this._primeCode = 8
            }

            function y(t, i) {
                var r = new e(t.toArray());
                return i ? r.toString(i) : r
            }
            Object.defineProperty(_.prototype, "verifyError", {
                enumerable: !0,
                get: function() {
                    return "number" != typeof this._primeCode && (this._primeCode = function(t, e) {
                        var i = e.toString("hex"),
                            r = [i, t.toString(16)].join("_");
                        if (r in p) return p[r];
                        var c, l = 0;
                        if (t.isEven() || !f.simpleSieve || !f.fermatTest(t) || !n.test(t)) return l += 1, l += "02" === i || "05" === i ? 8 : 4, p[r] = l, l;
                        switch (n.test(t.shrn(1)) || (l += 2), i) {
                            case "02":
                                t.mod(a).cmp(o) && (l += 8);
                                break;
                            case "05":
                                (c = t.mod(s)).cmp(d) && c.cmp(u) && (l += 8);
                                break;
                            default:
                                l += 4
                        }
                        return p[r] = l, l
                    }(this.__prime, this.__gen)), this._primeCode
                }
            }), _.prototype.generateKeys = function() {
                return this._priv || (this._priv = new r(c(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey()
            }, _.prototype.computeSecret = function(t) {
                var i = (t = (t = new r(t)).toRed(this._prime)).redPow(this._priv).fromRed(),
                    n = new e(i.toArray()),
                    a = this.getPrime();
                if (n.length < a.length) {
                    var o = new e(a.length - n.length);
                    o.fill(0), n = e.concat([o, n])
                }
                return n
            }, _.prototype.getPublicKey = function(t) {
                return y(this._pub, t)
            }, _.prototype.getPrivateKey = function(t) {
                return y(this._priv, t)
            }, _.prototype.getPrime = function(t) {
                return y(this.__prime, t)
            }, _.prototype.getGenerator = function(t) {
                return y(this._gen, t)
            }, _.prototype.setGenerator = function(t, i) {
                return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this.__gen = t, this._gen = new r(t), this
            }
        }).call(this, i("tjlA").Buffer)
    },
    VrUr: function(t, e, i) {
        "use strict";
        var r = i("f3pb"),
            n = r.define("Time", function() {
                this.choice({
                    utcTime: this.utctime(),
                    generalTime: this.gentime()
                })
            }),
            a = r.define("AttributeTypeValue", function() {
                this.seq().obj(this.key("type").objid(), this.key("value").any())
            }),
            o = r.define("AlgorithmIdentifier", function() {
                this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional())
            }),
            s = r.define("SubjectPublicKeyInfo", function() {
                this.seq().obj(this.key("algorithm").use(o), this.key("subjectPublicKey").bitstr())
            }),
            d = r.define("RelativeDistinguishedName", function() {
                this.setof(a)
            }),
            u = r.define("RDNSequence", function() {
                this.seqof(d)
            }),
            f = r.define("Name", function() {
                this.choice({
                    rdnSequence: this.use(u)
                })
            }),
            c = r.define("Validity", function() {
                this.seq().obj(this.key("notBefore").use(n), this.key("notAfter").use(n))
            }),
            l = r.define("Extension", function() {
                this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr())
            }),
            h = r.define("TBSCertificate", function() {
                this.seq().obj(this.key("version").explicit(0).int(), this.key("serialNumber").int(), this.key("signature").use(o), this.key("issuer").use(f), this.key("validity").use(c), this.key("subject").use(f), this.key("subjectPublicKeyInfo").use(s), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(l).optional())
            }),
            p = r.define("X509Certificate", function() {
                this.seq().obj(this.key("tbsCertificate").use(h), this.key("signatureAlgorithm").use(o), this.key("signatureValue").bitstr())
            });
        t.exports = p
    },
    WKKt: function(t, e, i) {
        var r = i("Edxu");
        t.exports = g, g.simpleSieve = y, g.fermatTest = b;
        var n = i("OZ/i"),
            a = new n(24),
            o = new(i("ehAg")),
            s = new n(1),
            d = new n(2),
            u = new n(5),
            f = (new n(16), new n(8), new n(10)),
            c = new n(3),
            l = (new n(7), new n(11)),
            h = new n(4),
            p = (new n(12), null);

        function _() {
            if (null !== p) return p;
            var t = [];
            t[0] = 2;
            for (var e = 1, i = 3; i < 1048576; i += 2) {
                for (var r = Math.ceil(Math.sqrt(i)), n = 0; n < e && t[n] <= r && i % t[n] != 0; n++);
                e !== n && t[n] <= r || (t[e++] = i)
            }
            return p = t, t
        }

        function y(t) {
            for (var e = _(), i = 0; i < e.length; i++)
                if (0 === t.modn(e[i])) return 0 === t.cmpn(e[i]);
            return !0
        }

        function b(t) {
            var e = n.mont(t);
            return 0 === d.toRed(e).redPow(t.subn(1)).fromRed().cmpn(1)
        }

        function g(t, e) {
            if (t < 16) return new n(2 === e || 5 === e ? [140, 123] : [140, 39]);
            var i, p;
            for (e = new n(e);;) {
                for (i = new n(r(Math.ceil(t / 8))); i.bitLength() > t;) i.ishrn(1);
                if (i.isEven() && i.iadd(s), i.testn(1) || i.iadd(d), e.cmp(d)) {
                    if (!e.cmp(u))
                        for (; i.mod(f).cmp(c);) i.iadd(h)
                } else
                    for (; i.mod(a).cmp(l);) i.iadd(h);
                if (y(p = i.shrn(1)) && y(i) && b(p) && b(i) && o.test(p) && o.test(i)) return i
            }
        }
    },
    WRkp: function(t, e, i) {
        "use strict";
        e.sha1 = i("E+IA"), e.sha224 = i("B/J0"), e.sha256 = i("bu2F"), e.sha384 = i("i5UE"), e.sha512 = i("tSWc")
    },
    "WnY+": function(t, e, i) {
        var r = i("9XZ3");
        t.exports = function(t) {
            return (new r).update(t).digest()
        }
    },
    Xhqo: function(t, e, i) {
        "use strict";
        var r = i("hwdV").Buffer,
            n = i(61);
        t.exports = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.head = null, this.tail = null, this.length = 0
            }
            return t.prototype.push = function(t) {
                var e = {
                    data: t,
                    next: null
                };
                this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
            }, t.prototype.unshift = function(t) {
                var e = {
                    data: t,
                    next: this.head
                };
                0 === this.length && (this.tail = e), this.head = e, ++this.length
            }, t.prototype.shift = function() {
                if (0 !== this.length) {
                    var t = this.head.data;
                    return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
                }
            }, t.prototype.clear = function() {
                this.head = this.tail = null, this.length = 0
            }, t.prototype.join = function(t) {
                if (0 === this.length) return "";
                for (var e = this.head, i = "" + e.data; e = e.next;) i += t + e.data;
                return i
            }, t.prototype.concat = function(t) {
                if (0 === this.length) return r.alloc(0);
                if (1 === this.length) return this.head.data;
                for (var e, i, n, a = r.allocUnsafe(t >>> 0), o = this.head, s = 0; o;) e = o.data, i = a, n = s, e.copy(i, n), s += o.data.length, o = o.next;
                return a
            }, t
        }(), n && n.inspect && n.inspect.custom && (t.exports.prototype[n.inspect.custom] = function() {
            var t = n.inspect({
                length: this.length
            });
            return this.constructor.name + " " + t
        })
    },
    Xudb: function(t, e, i) {
        "use strict";
        e.readUInt32BE = function(t, e) {
            return (t[0 + e] << 24 | t[1 + e] << 16 | t[2 + e] << 8 | t[3 + e]) >>> 0
        }, e.writeUInt32BE = function(t, e, i) {
            t[0 + i] = e >>> 24, t[1 + i] = e >>> 16 & 255, t[2 + i] = e >>> 8 & 255, t[3 + i] = 255 & e
        }, e.ip = function(t, e, i, r) {
            for (var n = 0, a = 0, o = 6; o >= 0; o -= 2) {
                for (var s = 0; s <= 24; s += 8) n <<= 1, n |= e >>> s + o & 1;
                for (s = 0; s <= 24; s += 8) n <<= 1, n |= t >>> s + o & 1
            }
            for (o = 6; o >= 0; o -= 2) {
                for (s = 1; s <= 25; s += 8) a <<= 1, a |= e >>> s + o & 1;
                for (s = 1; s <= 25; s += 8) a <<= 1, a |= t >>> s + o & 1
            }
            i[r + 0] = n >>> 0, i[r + 1] = a >>> 0
        }, e.rip = function(t, e, i, r) {
            for (var n = 0, a = 0, o = 0; o < 4; o++)
                for (var s = 24; s >= 0; s -= 8) n <<= 1, n |= e >>> s + o & 1, n <<= 1, n |= t >>> s + o & 1;
            for (o = 4; o < 8; o++)
                for (s = 24; s >= 0; s -= 8) a <<= 1, a |= e >>> s + o & 1, a <<= 1, a |= t >>> s + o & 1;
            i[r + 0] = n >>> 0, i[r + 1] = a >>> 0
        }, e.pc1 = function(t, e, i, r) {
            for (var n = 0, a = 0, o = 7; o >= 5; o--) {
                for (var s = 0; s <= 24; s += 8) n <<= 1, n |= e >> s + o & 1;
                for (s = 0; s <= 24; s += 8) n <<= 1, n |= t >> s + o & 1
            }
            for (s = 0; s <= 24; s += 8) n <<= 1, n |= e >> s + o & 1;
            for (o = 1; o <= 3; o++) {
                for (s = 0; s <= 24; s += 8) a <<= 1, a |= e >> s + o & 1;
                for (s = 0; s <= 24; s += 8) a <<= 1, a |= t >> s + o & 1
            }
            for (s = 0; s <= 24; s += 8) a <<= 1, a |= t >> s + o & 1;
            i[r + 0] = n >>> 0, i[r + 1] = a >>> 0
        }, e.r28shl = function(t, e) {
            return t << e & 268435455 | t >>> 28 - e
        };
        var r = [14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24];
        e.pc2 = function(t, e, i, n) {
            for (var a = 0, o = 0, s = r.length >>> 1, d = 0; d < s; d++) a <<= 1, a |= t >>> r[d] & 1;
            for (d = s; d < r.length; d++) o <<= 1, o |= e >>> r[d] & 1;
            i[n + 0] = a >>> 0, i[n + 1] = o >>> 0
        }, e.expand = function(t, e, i) {
            var r = 0,
                n = 0;
            r = (1 & t) << 5 | t >>> 27;
            for (var a = 23; a >= 15; a -= 4) r <<= 6, r |= t >>> a & 63;
            for (a = 11; a >= 3; a -= 4) n |= t >>> a & 63, n <<= 6;
            n |= (31 & t) << 1 | t >>> 31, e[i + 0] = r >>> 0, e[i + 1] = n >>> 0
        };
        var n = [14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11];
        e.substitute = function(t, e) {
            for (var i = 0, r = 0; r < 4; r++) {
                i <<= 4, i |= n[64 * r + (t >>> 18 - 6 * r & 63)]
            }
            for (r = 0; r < 4; r++) {
                i <<= 4, i |= n[256 + 64 * r + (e >>> 18 - 6 * r & 63)]
            }
            return i >>> 0
        };
        var a = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7];
        e.permute = function(t) {
            for (var e = 0, i = 0; i < a.length; i++) e <<= 1, e |= t >>> a[i] & 1;
            return e >>> 0
        }, e.padSplit = function(t, e, i) {
            for (var r = t.toString(2); r.length < e;) r = "0" + r;
            for (var n = [], a = 0; a < e; a += i) n.push(r.slice(a, a + i));
            return n.join(" ")
        }
    },
    YBdB: function(t, e, i) {
        (function(t, e) {
            ! function(t, i) {
                "use strict";
                if (!t.setImmediate) {
                    var r, n, a, o, s, d = 1,
                        u = {},
                        f = !1,
                        c = t.document,
                        l = Object.getPrototypeOf && Object.getPrototypeOf(t);
                    l = l && l.setTimeout ? l : t, "[object process]" === {}.toString.call(t.process) ? r = function(t) {
                        e.nextTick(function() {
                            p(t)
                        })
                    } : ! function() {
                        if (t.postMessage && !t.importScripts) {
                            var e = !0,
                                i = t.onmessage;
                            return t.onmessage = function() {
                                e = !1
                            }, t.postMessage("", "*"), t.onmessage = i, e
                        }
                    }() ? t.MessageChannel ? ((a = new MessageChannel).port1.onmessage = function(t) {
                        p(t.data)
                    }, r = function(t) {
                        a.port2.postMessage(t)
                    }) : c && "onreadystatechange" in c.createElement("script") ? (n = c.documentElement, r = function(t) {
                        var e = c.createElement("script");
                        e.onreadystatechange = function() {
                            p(t), e.onreadystatechange = null, n.removeChild(e), e = null
                        }, n.appendChild(e)
                    }) : r = function(t) {
                        setTimeout(p, 0, t)
                    } : (o = "setImmediate$" + Math.random() + "$", s = function(e) {
                        e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(o) && p(+e.data.slice(o.length))
                    }, t.addEventListener ? t.addEventListener("message", s, !1) : t.attachEvent("onmessage", s), r = function(e) {
                        t.postMessage(o + e, "*")
                    }), l.setImmediate = function(t) {
                        "function" != typeof t && (t = new Function("" + t));
                        for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++) e[i] = arguments[i + 1];
                        var n = {
                            callback: t,
                            args: e
                        };
                        return u[d] = n, r(d), d++
                    }, l.clearImmediate = h
                }

                function h(t) {
                    delete u[t]
                }

                function p(t) {
                    if (f) setTimeout(p, 0, t);
                    else {
                        var e = u[t];
                        if (e) {
                            f = !0;
                            try {
                                ! function(t) {
                                    var e = t.callback,
                                        r = t.args;
                                    switch (r.length) {
                                        case 0:
                                            e();
                                            break;
                                        case 1:
                                            e(r[0]);
                                            break;
                                        case 2:
                                            e(r[0], r[1]);
                                            break;
                                        case 3:
                                            e(r[0], r[1], r[2]);
                                            break;
                                        default:
                                            e.apply(i, r)
                                    }
                                }(e)
                            } finally {
                                h(t), f = !1
                            }
                        }
                    }
                }
            }("undefined" == typeof self ? void 0 === t ? this : t : self)
        }).call(this, i("yLpj"), i("8oxB"))
    },
    "YoN+": function(t, e, i) {
        var r = i("P7XM"),
            n = i("Qd/k").Reporter,
            a = i("tjlA").Buffer;

        function o(t, e) {
            n.call(this, e), a.isBuffer(t) ? (this.base = t, this.offset = 0, this.length = t.length) : this.error("Input not Buffer")
        }

        function s(t, e) {
            if (Array.isArray(t)) this.length = 0, this.value = t.map(function(t) {
                return t instanceof s || (t = new s(t, e)), this.length += t.length, t
            }, this);
            else if ("number" == typeof t) {
                if (!(0 <= t && t <= 255)) return e.error("non-byte EncoderBuffer value");
                this.value = t, this.length = 1
            } else if ("string" == typeof t) this.value = t, this.length = a.byteLength(t);
            else {
                if (!a.isBuffer(t)) return e.error("Unsupported type: " + typeof t);
                this.value = t, this.length = t.length
            }
        }
        r(o, n), e.DecoderBuffer = o, o.prototype.save = function() {
            return {
                offset: this.offset,
                reporter: n.prototype.save.call(this)
            }
        }, o.prototype.restore = function(t) {
            var e = new o(this.base);
            return e.offset = t.offset, e.length = this.offset, this.offset = t.offset, n.prototype.restore.call(this, t.reporter), e
        }, o.prototype.isEmpty = function() {
            return this.offset === this.length
        }, o.prototype.readUInt8 = function(t) {
            return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(t || "DecoderBuffer overrun")
        }, o.prototype.skip = function(t, e) {
            if (!(this.offset + t <= this.length)) return this.error(e || "DecoderBuffer overrun");
            var i = new o(this.base);
            return i._reporterState = this._reporterState, i.offset = this.offset, i.length = this.offset + t, this.offset += t, i
        }, o.prototype.raw = function(t) {
            return this.base.slice(t ? t.offset : this.offset, this.length)
        }, e.EncoderBuffer = s, s.prototype.join = function(t, e) {
            return t || (t = new a(this.length)), e || (e = 0), 0 === this.length ? t : (Array.isArray(this.value) ? this.value.forEach(function(i) {
                i.join(t, e), e += i.length
            }) : ("number" == typeof this.value ? t[e] = this.value : "string" == typeof this.value ? t.write(this.value, e) : a.isBuffer(this.value) && this.value.copy(t, e), e += this.length), t)
        }
    },
    YskG: function(t, e, i) {
        var r = i("hwdV").Buffer;

        function n(t, e, i) {
            var n = t._cipher.encryptBlock(t._prev)[0] ^ e;
            return t._prev = r.concat([t._prev.slice(1), r.from([i ? e : n])]), n
        }
        e.encrypt = function(t, e, i) {
            for (var a = e.length, o = r.allocUnsafe(a), s = -1; ++s < a;) o[s] = n(t, e[s], i);
            return o
        }
    },
    YuTi: function(t, e) {
        t.exports = function(t) {
            return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function() {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function() {
                    return t.i
                }
            }), t.webpackPolyfill = 1), t
        }
    },
    "Z2+3": function(t, e, i) {
        "use strict";
        var r = i("QTa/"),
            n = i("OZ/i"),
            a = i("P7XM"),
            o = r.base,
            s = i("MzeL").utils;

        function d(t) {
            o.call(this, "mont", t), this.a = new n(t.a, 16).toRed(this.red), this.b = new n(t.b, 16).toRed(this.red), this.i4 = new n(4).toRed(this.red).redInvm(), this.two = new n(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
        }

        function u(t, e, i) {
            o.BasePoint.call(this, t, "projective"), null === e && null === i ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new n(e, 16), this.z = new n(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
        }
        a(d, o), t.exports = d, d.prototype.validate = function(t) {
            var e = t.normalize().x,
                i = e.redSqr(),
                r = i.redMul(e).redAdd(i.redMul(this.a)).redAdd(e);
            return 0 === r.redSqrt().redSqr().cmp(r)
        }, a(u, o.BasePoint), d.prototype.decodePoint = function(t, e) {
            return this.point(s.toArray(t, e), 1)
        }, d.prototype.point = function(t, e) {
            return new u(this, t, e)
        }, d.prototype.pointFromJSON = function(t) {
            return u.fromJSON(this, t)
        }, u.prototype.precompute = function() {}, u.prototype._encode = function() {
            return this.getX().toArray("be", this.curve.p.byteLength())
        }, u.fromJSON = function(t, e) {
            return new u(t, e[0], e[1] || t.one)
        }, u.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }, u.prototype.isInfinity = function() {
            return 0 === this.z.cmpn(0)
        }, u.prototype.dbl = function() {
            var t = this.x.redAdd(this.z).redSqr(),
                e = this.x.redSub(this.z).redSqr(),
                i = t.redSub(e),
                r = t.redMul(e),
                n = i.redMul(e.redAdd(this.curve.a24.redMul(i)));
            return this.curve.point(r, n)
        }, u.prototype.add = function() {
            throw new Error("Not supported on Montgomery curve")
        }, u.prototype.diffAdd = function(t, e) {
            var i = this.x.redAdd(this.z),
                r = this.x.redSub(this.z),
                n = t.x.redAdd(t.z),
                a = t.x.redSub(t.z).redMul(i),
                o = n.redMul(r),
                s = e.z.redMul(a.redAdd(o).redSqr()),
                d = e.x.redMul(a.redISub(o).redSqr());
            return this.curve.point(s, d)
        }, u.prototype.mul = function(t) {
            for (var e = t.clone(), i = this, r = this.curve.point(null, null), n = []; 0 !== e.cmpn(0); e.iushrn(1)) n.push(e.andln(1));
            for (var a = n.length - 1; a >= 0; a--) 0 === n[a] ? (i = i.diffAdd(r, this), r = r.dbl()) : (r = i.diffAdd(r, this), i = i.dbl());
            return r
        }, u.prototype.mulAdd = function() {
            throw new Error("Not supported on Montgomery curve")
        }, u.prototype.jumlAdd = function() {
            throw new Error("Not supported on Montgomery curve")
        }, u.prototype.eq = function(t) {
            return 0 === this.getX().cmp(t.getX())
        }, u.prototype.normalize = function() {
            return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
        }, u.prototype.getX = function() {
            return this.normalize(), this.x.fromRed()
        }
    },
    ZDAU: function(t, e, i) {
        var r = i("hwdV").Buffer,
            n = i("1IWx").Transform,
            a = i("qiJe").StringDecoder;

        function o(t) {
            n.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
        }
        i("P7XM")(o, n), o.prototype.update = function(t, e, i) {
            "string" == typeof t && (t = r.from(t, e));
            var n = this._update(t);
            return this.hashMode ? this : (i && (n = this._toString(n, i)), n)
        }, o.prototype.setAutoPadding = function() {}, o.prototype.getAuthTag = function() {
            throw new Error("trying to get auth tag in unsupported state")
        }, o.prototype.setAuthTag = function() {
            throw new Error("trying to set auth tag in unsupported state")
        }, o.prototype.setAAD = function() {
            throw new Error("trying to set aad in unsupported state")
        }, o.prototype._transform = function(t, e, i) {
            var r;
            try {
                this.hashMode ? this._update(t) : this.push(this._update(t))
            } catch (t) {
                r = t
            } finally {
                i(r)
            }
        }, o.prototype._flush = function(t) {
            var e;
            try {
                this.push(this.__final())
            } catch (t) {
                e = t
            }
            t(e)
        }, o.prototype._finalOrDigest = function(t) {
            var e = this.__final() || r.alloc(0);
            return t && (e = this._toString(e, t, !0)), e
        }, o.prototype._toString = function(t, e, i) {
            if (this._decoder || (this._decoder = new a(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");
            var r = this._decoder.write(t);
            return i && (r += this._decoder.end()), r
        }, t.exports = o
    },
    ZEK9: function(t, e, i) {
        e.publicEncrypt = i("rSVQ"), e.privateDecrypt = i("DyzK"), e.privateEncrypt = function(t, i) {
            return e.publicEncrypt(t, i, !0)
        }, e.publicDecrypt = function(t, i) {
            return e.privateDecrypt(t, i, !0)
        }
    },
    acAU: function(t, e, i) {
        "use strict";
        (function(e) {
            !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
                nextTick: function(t, i, r, n) {
                    if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
                    var a, o, s = arguments.length;
                    switch (s) {
                        case 0:
                        case 1:
                            return e.nextTick(t);
                        case 2:
                            return e.nextTick(function() {
                                t.call(null, i)
                            });
                        case 3:
                            return e.nextTick(function() {
                                t.call(null, i, r)
                            });
                        case 4:
                            return e.nextTick(function() {
                                t.call(null, i, r, n)
                            });
                        default:
                            for (a = new Array(s - 1), o = 0; o < a.length;) a[o++] = arguments[o];
                            return e.nextTick(function() {
                                t.apply(null, a)
                            })
                    }
                }
            } : t.exports = e
        }).call(this, i("8oxB"))
    },
    afKu: function(t, e, i) {
        (e = t.exports = function(t) {
            t = t.toLowerCase();
            var i = e[t];
            if (!i) throw new Error(t + " is not supported (we accept pull requests)");
            return new i
        }).sha = i("CH9F"), e.sha1 = i("fnjI"), e.sha224 = i("cqoG"), e.sha256 = i("olUY"), e.sha384 = i("uDfV"), e.sha512 = i("T9HO")
    },
    "aqI/": function(t, e, i) {
        "use strict";
        var r = i("fZJM"),
            n = i("dlgc"),
            a = i("2j6C");

        function o(t) {
            if (!(this instanceof o)) return new o(t);
            this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
            var e = n.toArray(t.entropy, t.entropyEnc || "hex"),
                i = n.toArray(t.nonce, t.nonceEnc || "hex"),
                r = n.toArray(t.pers, t.persEnc || "hex");
            a(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(e, i, r)
        }
        t.exports = o, o.prototype._init = function(t, e, i) {
            var r = t.concat(e).concat(i);
            this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
            for (var n = 0; n < this.V.length; n++) this.K[n] = 0, this.V[n] = 1;
            this._update(r), this._reseed = 1, this.reseedInterval = 281474976710656
        }, o.prototype._hmac = function() {
            return new r.hmac(this.hash, this.K)
        }, o.prototype._update = function(t) {
            var e = this._hmac().update(this.V).update([0]);
            t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
        }, o.prototype.reseed = function(t, e, i, r) {
            "string" != typeof e && (r = i, i = e, e = null), t = n.toArray(t, e), i = n.toArray(i, r), a(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i || [])), this._reseed = 1
        }, o.prototype.generate = function(t, e, i, r) {
            if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
            "string" != typeof e && (r = i, i = e, e = null), i && (i = n.toArray(i, r || "hex"), this._update(i));
            for (var a = []; a.length < t;) this.V = this._hmac().update(this.V).digest(), a = a.concat(this.V);
            var o = a.slice(0, t);
            return this._update(i), this._reseed++, n.encode(o, e)
        }
    },
    at63: function(t, e, i) {
        var r = i("jIre"),
            n = i("hwdV").Buffer,
            a = i("vZ2G");

        function o(t) {
            var e = t._cipher.encryptBlockRaw(t._prev);
            return a(t._prev), e
        }
        e.encrypt = function(t, e) {
            var i = Math.ceil(e.length / 16),
                a = t._cache.length;
            t._cache = n.concat([t._cache, n.allocUnsafe(16 * i)]);
            for (var s = 0; s < i; s++) {
                var d = o(t),
                    u = a + 16 * s;
                t._cache.writeUInt32BE(d[0], u + 0), t._cache.writeUInt32BE(d[1], u + 4), t._cache.writeUInt32BE(d[2], u + 8), t._cache.writeUInt32BE(d[3], u + 12)
            }
            var f = t._cache.slice(0, e.length);
            return t._cache = t._cache.slice(e.length), r(e, f)
        }
    },
    "b+dc": function(t, e, i) {
        (function(e) {
            var r = i("Giow"),
                n = i("qVij"),
                a = i("MzeL").ec,
                o = i("OZ/i"),
                s = i("Ku4m"),
                d = i("zZGF");

            function u(t, i, n, a) {
                if ((t = new e(t.toArray())).length < i.byteLength()) {
                    var o = new e(i.byteLength() - t.length);
                    o.fill(0), t = e.concat([o, t])
                }
                var s = n.length,
                    d = function(t, i) {
                        t = (t = f(t, i)).mod(i);
                        var r = new e(t.toArray());
                        if (r.length < i.byteLength()) {
                            var n = new e(i.byteLength() - r.length);
                            n.fill(0), r = e.concat([n, r])
                        }
                        return r
                    }(n, i),
                    u = new e(s);
                u.fill(1);
                var c = new e(s);
                return c.fill(0), c = r(a, c).update(u).update(new e([0])).update(t).update(d).digest(), u = r(a, c).update(u).digest(), {
                    k: c = r(a, c).update(u).update(new e([1])).update(t).update(d).digest(),
                    v: u = r(a, c).update(u).digest()
                }
            }

            function f(t, e) {
                var i = new o(t),
                    r = (t.length << 3) - e.bitLength();
                return r > 0 && i.ishrn(r), i
            }

            function c(t, i, n) {
                var a, o;
                do {
                    for (a = new e(0); 8 * a.length < t.bitLength();) i.v = r(n, i.k).update(i.v).digest(), a = e.concat([a, i.v]);
                    o = f(a, t), i.k = r(n, i.k).update(i.v).update(new e([0])).digest(), i.v = r(n, i.k).update(i.v).digest()
                } while (-1 !== o.cmp(t));
                return o
            }

            function l(t, e, i, r) {
                return t.toRed(o.mont(i)).redPow(e).fromRed().mod(r)
            }
            t.exports = function(t, i, r, h, p) {
                var _ = s(i);
                if (_.curve) {
                    if ("ecdsa" !== h && "ecdsa/rsa" !== h) throw new Error("wrong private key type");
                    return function(t, i) {
                        var r = d[i.curve.join(".")];
                        if (!r) throw new Error("unknown curve " + i.curve.join("."));
                        var n = new a(r).keyFromPrivate(i.privateKey).sign(t);
                        return new e(n.toDER())
                    }(t, _)
                }
                if ("dsa" === _.type) {
                    if ("dsa" !== h) throw new Error("wrong private key type");
                    return function(t, i, r) {
                        for (var n, a = i.params.priv_key, s = i.params.p, d = i.params.q, h = i.params.g, p = new o(0), _ = f(t, d).mod(d), y = !1, b = u(a, d, t, r); !1 === y;) n = c(d, b, r), p = l(h, n, s, d), 0 === (y = n.invm(d).imul(_.add(a.mul(p))).mod(d)).cmpn(0) && (y = !1, p = new o(0));
                        return function(t, i) {
                            t = t.toArray(), i = i.toArray(), 128 & t[0] && (t = [0].concat(t)), 128 & i[0] && (i = [0].concat(i));
                            var r = [48, t.length + i.length + 4, 2, t.length];
                            return r = r.concat(t, [2, i.length], i), new e(r)
                        }(p, y)
                    }(t, _, r)
                }
                if ("rsa" !== h && "ecdsa/rsa" !== h) throw new Error("wrong private key type");
                t = e.concat([p, t]);
                for (var y = _.modulus.byteLength(), b = [0, 1]; t.length + b.length + 1 < y;) b.push(255);
                b.push(0);
                for (var g = -1; ++g < t.length;) b.push(t[g]);
                return n(b, _)
            }, t.exports.getKey = u, t.exports.makeKey = c
        }).call(this, i("tjlA").Buffer)
    },
    bu2F: function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("7ckf"),
            a = i("qlaj"),
            o = i("2j6C"),
            s = r.sum32,
            d = r.sum32_4,
            u = r.sum32_5,
            f = a.ch32,
            c = a.maj32,
            l = a.s0_256,
            h = a.s1_256,
            p = a.g0_256,
            _ = a.g1_256,
            y = n.BlockHash,
            b = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

        function g() {
            if (!(this instanceof g)) return new g;
            y.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = b, this.W = new Array(64)
        }
        r.inherits(g, y), t.exports = g, g.blockSize = 512, g.outSize = 256, g.hmacStrength = 192, g.padLength = 64, g.prototype._update = function(t, e) {
            for (var i = this.W, r = 0; r < 16; r++) i[r] = t[e + r];
            for (; r < i.length; r++) i[r] = d(_(i[r - 2]), i[r - 7], p(i[r - 15]), i[r - 16]);
            var n = this.h[0],
                a = this.h[1],
                y = this.h[2],
                b = this.h[3],
                g = this.h[4],
                v = this.h[5],
                m = this.h[6],
                A = this.h[7];
            for (o(this.k.length === i.length), r = 0; r < i.length; r++) {
                var w = u(A, h(g), f(g, v, m), this.k[r], i[r]),
                    E = s(l(n), c(n, a, y));
                A = m, m = v, v = g, g = s(b, w), b = y, y = a, a = n, n = s(w, E)
            }
            this.h[0] = s(this.h[0], n), this.h[1] = s(this.h[1], a), this.h[2] = s(this.h[2], y), this.h[3] = s(this.h[3], b), this.h[4] = s(this.h[4], g), this.h[5] = s(this.h[5], v), this.h[6] = s(this.h[6], m), this.h[7] = s(this.h[7], A)
        }, g.prototype._digest = function(t) {
            return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
        }
    },
    cqoG: function(t, e, i) {
        var r = i("P7XM"),
            n = i("olUY"),
            a = i("tnIz"),
            o = i("hwdV").Buffer,
            s = new Array(64);

        function d() {
            this.init(), this._w = s, a.call(this, 64, 56)
        }
        r(d, n), d.prototype.init = function() {
            return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
        }, d.prototype._hash = function() {
            var t = o.allocUnsafe(28);
            return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t
        }, t.exports = d
    },
    cul0: function(t, e, i) {
        "use strict";
        i.r(e);
        var r = i("pp2G");
        var n = function() {
            function t(e, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.ap = getAudioPlayer(), this._el = e, this._playIconBtn = ge("top_audio"), this._audioBtnGroup = ge("top_audio_btn_group"), this.init()
            }
            return t.init = function() {
                var e = ge("top_audio_player"),
                    i = data(e, "object");
                i || (i = new t(e), data(e, "object", i))
            }, t.prototype.init = function() {
                var t = this;

                function e(e) {
                    return hasClass(this, "top_audio_player_play") ? (t.ap.podcastSetActionRef(t.ap.getCurrentAudio(), t.ap.isPlaying() ? r.a.PodcastsLogs.ACTION_PAUSE : r.a.PodcastsLogs.ACTION_PLAY, "top_player"), t.ap.isPlaying() ? t.ap.pause() : t.ap.play(), !1) : hasClass(this, "top_audio_player_prev") ? (t.ap.playPrev(), !1) : hasClass(this, "top_audio_player_next") ? (t.ap.playNext(), !1) : void 0
                }
                this.ap.on(this, AudioPlayer.EVENT_UPDATE, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PLAY, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PAUSE, this.onPause.bind(this)), this.ap.top = this, each(["prev", "play", "next"], function(i, r) {
                    addEvent(geByClass1("top_audio_player_" + r, t._el), "click", e)
                }), addEvent(this._el, "mousedown", function(t) {
                    if (!hasClass(domPN(t.target), "top_audio_player_btn")) return 1 != t.which || hasClass(t.target, "top_audio_player_btn") || hasClass(t.target, "top_audio_player_act_icon") || r.a.getLayer().toggle(), cancelEvent(t)
                }), addEvent(ge("top_audio"), "mousedown", function(t) {
                    return !0 !== checkEvent(t) && (r.a.getLayer().toggle(), cancelEvent(t))
                }), browser.safari || addEvent(document, "keydown keyup", function(t) {
                    toggleClass(ge("top_audio_play"), "shuffle", t.shiftKey)
                }), this.onPlay(this.ap.getCurrentAudio())
            }, t.prototype.onPlay = function(e, i, n) {
                var a = this,
                    o = "top_audio_player_enabled";
                if (e) {
                    var s = function() {
                        var i = getAudioPlayer();
                        setTimeout(function() {
                            var t = r.a.getLayer();
                            t && t.isShown() && t.updatePosition()
                        }, 1), toggleClass(a._el, "audio_player_podcast", r.a.isPodcast(i.getCurrentAudio())), addClass(a._el, o), toggleClass(a._el, "top_audio_player_playing", i.isPlaying());
                        var s = geByClass1("_top_audio_player_play_blind_label");
                        s && (s.innerHTML = i.isPlaying() ? getLang("global_audio_pause") : getLang("global_audio_play")), e = r.a.asObject(e), clearTimeout(a._currTitleReTO);
                        var d = geByClass1("top_audio_player_title_out", a._el);
                        re(d);
                        var u = geByClass1("top_audio_player_title", a._el);
                        if (0 != n) {
                            var f = n < 0 ? -10 : 10,
                                c = "opacity: 0; top: " + f + "px; left: " + u.offsetLeft + "px",
                                l = e.performer + " &ndash; " + e.title,
                                h = se('<div class="top_audio_player_title top_audio_player_title_next" style="' + c + '">' + l + "</div>");
                            h.setAttribute("onmouseover", "setTitle(this)"), n > 0 ? domInsertAfter(h, u) : domInsertBefore(h, u), addClass(u, "top_audio_player_title_out"), setStyle(u, {
                                top: -f,
                                opacity: 0
                            }), setTimeout(function() {
                                setStyle(h, {
                                    top: 0,
                                    opacity: 1
                                })
                            }, 10), clearTimeout(a._currTitleReTO), a._currTitleReTO = setTimeout(function() {
                                re(u), removeClass(h, "top_audio_player_title_next")
                            }, t.TITLE_CHANGE_ANIM_SPEED)
                        } else u && (u.innerHTML = e.performer + " &ndash; " + e.title, u.titleSet = 0, u.setAttribute("onmouseover", "setTitle(this)"))
                    };
                    n = intval(n), hasClass(this._playIconBtn, o) ? s() : (addClass(this._playIconBtn, o), setTimeout(function() {
                        hide(a._audioBtnGroup), s()
                    }, 150))
                } else {
                    removeClass(this._playIconBtn, o), removeClass(this._el, o), removeClass(this._el, "top_audio_player_playing"), removeClass(this._el, "audio_player_podcast"), show(this._audioBtnGroup);
                    var d = geByClass1("top_audio_play__button", this._audioBtnGroup);
                    d && removeClass(d, "loading");
                    var u = r.a.getLayer();
                    u && u.isShown() && u.updatePosition()
                }
            }, t.prototype.onPause = function() {
                removeClass(this._el, "top_audio_player_playing");
                var t = geByClass1("_top_audio_player_play_blind_label");
                t && (t.innerHTML = getLang("global_audio_play"))
            }, t.prototype.onNext = function() {}, t
        }();
        n.TITLE_CHANGE_ANIM_SPEED = 190;
        var a = i("D33C"),
            o = i("fs/A");

        function s(t, e) {
            if (!window.Worker || !window.Blob) return setTimeout(t, e);
            var i = new Blob(["\n      var timeout;\n      onmessage = function(e) {\n        clearTimeout(timeout);\n        if (e.data == 'start') {\n          timeout = setTimeout(function() { postMessage({}); }, \" + delay + \");\n        }\n      }\n    "]);
            try {
                var r = new Worker(window.URL.createObjectURL(i));
                return r.onmessage = function() {
                    r.terminate(), t()
                }, r.postMessage("start"), r
            } catch (i) {
                return setTimeout(t, e)
            }
        }
        var d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
            u = {
                v: function(t) {
                    return t.split("").reverse().join("")
                },
                r: function(t, e) {
                    t = t.split("");
                    for (var i, r = d + d, n = t.length; n--;) ~(i = r.indexOf(t[n])) && (t[n] = r.substr(i - e, 1));
                    return t.join("")
                },
                s: function(t, e) {
                    var i = t.length;
                    if (i) {
                        var r = function(t, e) {
                                var i = t.length,
                                    r = [];
                                if (i) {
                                    var n = i;
                                    for (e = Math.abs(e); n--;) e = (i * (n + 1) ^ e + n) % i, r[n] = e
                                }
                                return r
                            }(t, e),
                            n = 0;
                        for (t = t.split(""); ++n < i;) t[n] = t.splice(r[i - 1 - n], 1, t[n])[0];
                        t = t.join("")
                    }
                    return t
                },
                i: function(t, e) {
                    return u.s(t, e ^ vk.id)
                },
                x: function(t, e) {
                    var i = [];
                    return e = e.charCodeAt(0), each(t.split(""), function(t, r) {
                        i.push(String.fromCharCode(r.charCodeAt(0) ^ e))
                    }), i.join("")
                }
            };

        function f(t) {
            if ((!window.wbopen || !~(window.open + "").indexOf("wbopen")) && ~t.indexOf("audio_api_unavailable")) {
                var e = t.split("?extra=")[1].split("#"),
                    i = "" === e[1] ? "" : c(e[1]);
                if (e = c(e[0]), "string" != typeof i || !e) return t;
                for (var r, n, a = (i = i ? i.split(String.fromCharCode(9)) : []).length; a--;) {
                    if (r = (n = i[a].split(String.fromCharCode(11))).splice(0, 1, e)[0], !u[r]) return t;
                    e = u[r].apply(null, n)
                }
                if (e && "http" === e.substr(0, 4)) return e
            }
            return t
        }

        function c(t) {
            if (!t || t.length % 4 == 1) return !1;
            for (var e, i, r = 0, n = 0, a = ""; i = t.charAt(n++);) ~(i = d.indexOf(i)) && (e = r % 4 ? 64 * e + i : i, r++ % 4) && (a += String.fromCharCode(255 & e >> (-2 * r & 6)));
            return a
        }
        var l = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
            h = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.type = "html5", this.opts = e || {}, this._audioNodes = [], this._currentAudioEl = this._createAudioNode(), this._prefetchAudioEl = this._createAudioNode()
                }
                return t.prototype.destroy = function() {}, t.prototype.getPlayedTime = function() {
                    for (var t = this._currentAudioEl.played, e = 0, i = 0; i < t.length; i++) e += t.end(i) - t.start(i);
                    return e
                }, t.prototype._setAudioNodeUrl = function(t, e) {
                    var i = f(e);
                    data(t, "setUrlTime", i == l ? 0 : vkNow()), this._currentHls && t === this._currentAudioEl && (this._currentHls.destroy(), this._currentHls = null), this._isHlsUrl(i) ? this._initHls(t, i) : t.src = i
                }, t.prototype._isHlsUrl = function(t) {
                    return /\.m3u8/.test(f(t))
                }, t.prototype._initHls = function(t, e) {
                    var i = this;
                    if (window.Hls) {
                        var r = new Hls({
                            debug: !!ls.get("audio_hls_debug"),
                            maxBufferHole: 3,
                            nudgeOffset: .5,
                            nudgeMaxRetry: 5
                        });
                        r.attachMedia(t), r.loadSource(e), this._currentHls = r, this._hlsError = null, r.on(Hls.Events.ERROR, function(t, e) {
                            e.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR && (r.stopLoad(), r.startLoad()), e.fatal && (console.log("audio hls error", t, e), i._hlsError = {
                                type: e.type,
                                details: e.details,
                                url: e.frag && e.frag.url || e.context && e.context.url,
                                code: e.networkDetails ? e.networkDetails.status : 0
                            }, i.opts.onFail && i.opts.onFail())
                        });
                        var n = getAudioPlayer();
                        n.isPlaying() && !n.isAdPlaying() && this.play(e)
                    } else stManager.add("hls.min.js", function() {
                        i._currentAudioEl === t && i._initHls(t, e)
                    })
                }, t.prototype._createAudioNode = function(t) {
                    var e = this,
                        i = new Audio;
                    return this.opts.onBufferUpdate && addEvent(i, "progress", function() {
                        e._currentAudioEl === i && e.opts.onBufferUpdate(e.getCurrentBuffered());
                        var t = i.buffered;
                        1 === t.length && 0 === t.start(0) && t.end(0) === i.duration && (i._fullyLoaded = !0)
                    }), this.opts.onProgressUpdate && addEvent(i, "timeupdate", function() {
                        e._currentAudioEl === i && e.opts.onProgressUpdate(e.getCurrentProgress(), e.getPlayedTime())
                    }), this.opts.onEnd && addEvent(i, "ended", function() {
                        e._currentAudioEl === i && e.opts.onEnd()
                    }), this.opts.onSeeked && addEvent(i, "seeked", function() {
                        e._currentAudioEl === i && e.opts.onSeeked()
                    }), this.opts.onSeek && addEvent(i, "seeking", function() {
                        e._currentAudioEl === i && e.opts.onSeek()
                    }), addEvent(i, "error", function() {
                        AudioUtils.debugLog("HTML5 error track loading"), e._prefetchAudioEl === i ? e._prefetchAudioEl = e._createAudioNode() : e._currentAudioEl === i && i.src !== l && e.opts.onFail && e.opts.onFail()
                    }), addEvent(i, "canplay", function() {
                        var t = data(i, "setUrlTime");
                        t && (cur.audioLoadTimings = cur.audioLoadTimings || [], cur.audioLoadTimings.push(vkNow() - t), data(i, "setUrlTime", 0)), e._currentAudioEl === i && (e.opts.onCanPlay && e.opts.onCanPlay(), data(i, "canplay", !0))
                    }), addEvent(i, "durationchange", function() {
                        e._currentAudioEl === i && e._seekOnReady && isFinite(i.duration) && (e.seek(e._seekOnReady), e._seekOnReady = !1)
                    }), i.crossOrigin = "anonymous", t && (this._setAudioNodeUrl(i, t), i.preload = "auto", i.volume = this._volume || 1, i.load()), this._audioNodes.push(i), this._audioNodes.length > 10 && this._audioNodes.splice(0, 5), i
                }, t.prototype.onReady = function(t) {
                    t(!0)
                }, t.prototype.prefetch = function(t) {
                    this._isHlsUrl(t) || (this._prefetchAudioEl && this._setAudioNodeUrl(this._prefetchAudioEl, l), this._prefetchAudioEl = this._createAudioNode(t))
                }, t.prototype.seek = function(t) {
                    var e = this._currentAudioEl;
                    isFinite(e.duration) ? e.currentTime = e.duration * t : this._seekOnReady = t
                }, t.prototype.setVolume = function(t) {
                    void 0 === t && (t = this._currentAudioEl.volume), this._currentAudioEl.volume = t, this._prefetchAudioEl && (this._prefetchAudioEl.volume = t), this._volume = t
                }, t.prototype.setPlaybackRate = function(t) {
                    this._currentAudioEl.playbackRate = t
                }, t.prototype.getCurrentProgress = function() {
                    var t = this._currentAudioEl;
                    return isNaN(t.duration) ? 0 : Math.max(0, Math.min(1, t.currentTime / t.duration))
                }, t.prototype.getCurrentBuffered = function() {
                    var t = this._currentAudioEl;
                    return t && t.buffered.length ? Math.min(1, t.buffered.end(0) / t.duration) : 0
                }, t.prototype.isFullyLoaded = function() {
                    return this._currentAudioEl._fullyLoaded
                }, t.prototype.setUrl = function(t, e) {
                    var i = this;
                    if (!t) return e && e(!1);
                    var r = f(t),
                        n = this._currentAudioEl;
                    return this._seekOnReady = !1, n.src === r || this._currentHls && this._currentHls.url === r ? (this.opts.onCanPlay && this.opts.onCanPlay(), e && e(!0)) : (this._prefetchAudioEl && this._prefetchAudioEl.readyState > 0 && (this._prefetchAudioEl.src === r ? (this._currentAudioEl.pause(0), this._setAudioNodeUrl(this._currentAudioEl, l), this._prefetchAudioEl.readyState >= 3 && setTimeout(function() {
                        return i.opts.onCanPlay && i.opts.onCanPlay()
                    }), this._currentAudioEl = this._prefetchAudioEl, n = this._currentAudioEl, this._prefetchAudioEl = !1) : this._prefetchAudioEl.src && this._setAudioNodeUrl(this._prefetchAudioEl, l)), n.src !== r && (this._setAudioNodeUrl(n, r), n.load(), data(this._currentAudioEl, "canplay", null), this._stopFrequencyAnalise()), e && e(!0))
                }, t.prototype.playAudioEl = function(t) {
                    var e = t.play();
                    isUndefined(e) || e.catch(function(e) {
                        e.code !== e.ABORT_ERR && s(function() {
                            return triggerEvent(t, "error", !1, !0)
                        }, 10)
                    })
                }, t.prototype.play = function(t) {
                    this._stopFrequencyAnalise(), this._prefetchAudioEl.src === f(t) && this._prefetchAudioEl.readyState > 0 && (this._setAudioNodeUrl(this._currentAudioEl, l), this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = this._createAudioNode(), this.opts.onCanPlay && this.opts.onCanPlay());
                    var e = this._currentAudioEl;
                    e.src && (this.playAudioEl(e), this._startFrequencyAnalise())
                }, t.prototype.preparePlay = function() {
                    if (browser.safari) {
                        var t = this._currentAudioEl;
                        this.playAudioEl(t)
                    }
                }, t.prototype._startFrequencyAnalise = function() {
                    var t = this;

                    function e(t, e, i, r) {
                        return (i - e) * t / r + e
                    }

                    function i(t, e) {
                        return Math.random() * (e - t) + t
                    }
                    this._stopFrequencyAnalise();
                    var r = 999,
                        n = null,
                        a = null;
                    this._freqUpdateInterval = setInterval(function() {
                        var o = void 0;
                        t._currentAudioEl.paused || !data(t._currentAudioEl, "canplay") ? o = [0, 0, 0, 0] : (++r > 3 && (r = 0, n = a, a = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), o = [e(r, n[0], a[0], 3), e(r, n[1], a[1], 3), e(r, n[2], a[2], 3), e(r, n[3], a[3], 3)]), t.opts && t.opts.onFrequency(o)
                    }, 50)
                }, t.prototype._stopFrequencyAnalise = function() {
                    this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts && this.opts.onFrequency([0, 0, 0, 0])
                }, t.prototype.pause = function() {
                    var t = this._currentAudioEl;
                    if (t.src) {
                        var e = t.pause();
                        void 0 != e && e.catch(function() {})
                    }
                    this._stopFrequencyAnalise()
                }, t.prototype.stop = function() {
                    this._currentAudioEl.pause(), this._currentAudioEl = this._createAudioNode(l), this._stopFrequencyAnalise()
                }, t.prototype._setFadeVolumeInterval = function(t) {
                    if (t) {
                        if (!this._fadeVolumeWorker && window.Worker && window.Blob) {
                            var e = new Blob(["\n          var interval;\n          onmessage = function(e) {\n            clearInterval(interval);\n            if (e.data == 'start') {\n              interval = setInterval(function() { postMessage({}); }, 20);\n            }\n          }\n        "]);
                            try {
                                this._fadeVolumeWorker = new Worker(window.URL.createObjectURL(e))
                            } catch (t) {
                                this._fadeVolumeWorker = !1
                            }
                        }
                        this._fadeVolumeWorker ? (this._fadeVolumeWorker.onmessage = t, this._fadeVolumeWorker.postMessage("start")) : this._fadeVolumeInterval = setInterval(t, 60)
                    } else this._fadeVolumeWorker && (this._fadeVolumeWorker.terminate(), this._fadeVolumeWorker = null), this._fadeVolumeInterval && clearInterval(this._fadeVolumeInterval)
                }, t.prototype.fadeVolume = function(t, e) {
                    var i = this;
                    t = Math.max(0, Math.min(1, t));
                    var r = this._currentAudioEl,
                        n = 0;
                    if (n = t < r.volume ? -.06 : .001, Math.abs(t - r.volume) <= .001) return this._setFadeVolumeInterval(), e && e();
                    var a = r.volume;
                    this._setFadeVolumeInterval(function() {
                        n > 0 && (n *= 1.35), a += n;
                        if (n < 0 ? a <= t : a >= t) return i.setVolume(t), i._setFadeVolumeInterval(), e && e();
                        i.setVolume(a)
                    })
                }, t.prototype.getErrorData = function() {
                    var t = this._currentAudioEl.error || {};
                    return {
                        is_hls: this._currentHls ? 1 : 0,
                        url: this._currentHls ? this._currentHls.url : this._currentAudioEl.currentSrc,
                        error_code: t.code,
                        error_message: t.message,
                        hls_error: this._hlsError ? JSON.stringify(this._hlsError) : null
                    }
                }, t
            }();
        h.isSupported = function() {
            var t = "undefined" != typeof navigator ? navigator.userAgent : "";
            if (/(Windows NT 5.1|Windows XP)/.test(t) && (browser.vivaldi || browser.opera || browser.mozilla)) return AudioUtils.debugLog("Force no HTML5 (xp vivaldi / opera / mozilla)"), !1;
            if (/(Windows 7|Windows NT 6.1)/.test(t) && (browser.vivaldi || browser.opera)) return AudioUtils.debugLog("Force no HTML5 (win7 vivaldi / opera)"), !1;
            var e = document.createElement("audio");
            if (e.canPlayType) {
                var i = e.canPlayType('audio/mpeg; codecs="mp3"'),
                    r = !!i.replace(/no/, "");
                return AudioUtils.debugLog("HTML5 browser support " + (r ? "yes" : "no"), i, t), r
            }
            return AudioUtils.debugLog("audio.canPlayType is not available", t), !1
        };
        var p = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.type = "flash", this.opts = e || {}, window._flashAudioInstance = this
            }
            return t.onAudioFinishCallback = function() {
                var t = window._flashAudioInstance;
                t.opts.onEnd && t.opts.onEnd()
            }, t.onAudioProgressCallback = function(t, e) {
                if (e) {
                    var i = window._flashAudioInstance;
                    i._total = e, i._currProgress = t / e, i.opts.onProgressUpdate && i.opts.onProgressUpdate(i._currProgress, t)
                }
            }, t.onAudioLoadProgressCallback = function(t, e) {
                var i = window._flashAudioInstance;
                i._currBuffered = t / e, i.opts.onBufferUpdate && i.opts.onBufferUpdate(i._currBuffered)
            }, t.prototype.fadeVolume = function(t, e) {
                return this.setVolume(t), e()
            }, t.prototype._startFrequencyAnalise = function() {
                var t = this;

                function e(t, e, i, r) {
                    return (i - e) * t / r + e
                }

                function i(t, e) {
                    return Math.random() * (e - t) + t
                }
                this._stopFrequencyAnalise();
                var r = 999,
                    n = null,
                    a = null;
                this._freqUpdateInterval = setInterval(function() {
                    var o;
                    ++r > 3 && (r = 0, n = a, a = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), o = [e(r, n[0], a[0], 3), e(r, n[1], a[1], 3), e(r, n[2], a[2], 3), e(r, n[3], a[3], 3)], t.opts.onFrequency(o)
                }, 50)
            }, t.prototype._stopFrequencyAnalise = function() {
                this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
            }, t.prototype.destroy = function() {
                re("flash_audio")
            }, t.prototype.onReady = function(t) {
                var e = this;
                if (this._player) return t(!0);
                if (!1 === this._player) return t(!1);
                this._onReady = t;
                ge("flash_audio") || document.body.appendChild(ce("div", {
                    id: "flash_audio",
                    className: "fixed"
                })), renderFlash("flash_audio", {
                    url: "/swf/audio_lite.swf",
                    id: "player",
                    height: 2
                }, {
                    swliveconnect: "true",
                    allowscriptaccess: "always",
                    wmode: "opaque"
                }, {
                    onPlayFinish: "AudioPlayerFlash.onAudioFinishCallback",
                    onLoadProgress: "AudioPlayerFlash.onAudioLoadProgressCallback",
                    onPlayProgress: "AudioPlayerFlash.onAudioProgressCallback"
                }) && setTimeout(function() {
                    return e._checkFlashLoaded()
                }, 50)
            }, t.prototype.setUrl = function(t, e) {
                var i = f(t);
                this._url !== i ? (this._url = i, this._player && this._player.loadAudio(i), e && e(!0)) : e && e(!0)
            }, t.prototype.setVolume = function(t) {
                this._player && this._player.setVolume && this._player.setVolume(t)
            }, t.prototype.setPlaybackRate = function() {
                return !1
            }, t.prototype.play = function() {
                this._player && this._player.playAudio(), this._startFrequencyAnalise()
            }, t.prototype.seek = function(t) {
                var e = (this._total || 0) * t;
                this._player && this._player.playAudio(e)
            }, t.prototype.pause = function() {
                this._player && this._player.pauseAudio(), this._stopFrequencyAnalise()
            }, t.prototype.isFullyLoaded = function() {
                return !1
            }, t.prototype.getPlayedTime = function() {
                return 0
            }, t.prototype.getCurrentProgress = function() {
                return this._currProgress || 0
            }, t.prototype.getCurrentBuffered = function() {
                return this._currBuffered || 0
            }, t.prototype._checkFlashLoaded = function() {
                var t = this,
                    e = ge("player");
                if (this._checks = this._checks || 0, this._checks++, this._checks > 10) return this._player = !1, this._onReady && this._onReady(!1);
                e && e.paused ? (this._player = e, this._onReady && this._onReady(!0), this._onReady = null) : setTimeout(function() {
                    return t._checkFlashLoaded()
                }, 100)
            }, t.prototype.getErrorData = function() {
                return {
                    url: this._url
                }
            }, t
        }();
        var _ = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.player = e, this.listeners = []
            }
            return t.prototype.listen = function(t, e, i) {
                var r = e.bind(i || this);
                this.listeners.push({
                    event: t,
                    fn: e,
                    listener: r
                }), this.playerListen(t, r)
            }, t.prototype.unListen = function(t, e) {
                var i = -1;
                if (each(this.listeners, function(r, n) {
                        if (n.event === t && n.listener === e) return i = r, !1
                    }), !(i < 0)) {
                    var r = this.listeners[i];
                    this.playerUnListen(t, r.listener), this.listeners.splice(i, 1)
                }
            }, t.prototype.unListenAll = function() {
                for (var t; t = this.listeners[0];) this.unListen(t.event, t.listener)
            }, t.prototype.listenPlay = function(t, e) {
                this.listen("play", t, e)
            }, t.prototype.listenPause = function(t, e) {
                this.listen("pause", t, e)
            }, t.prototype.listenProgress = function(t, e) {
                this.listen("progress", t, e)
            }, t.prototype.listenVolume = function(t, e) {
                this.listen("volume", t, e)
            }, t.prototype.listenSeek = function(t, e) {
                this.listen("seek", t, e)
            }, t.prototype.listenPlaylistChanged = function(t, e) {
                this.listen("pl_changed", t, e)
            }, t.prototype.listenEnded = function(t, e) {
                this.listen("ended", t, e)
            }, t.prototype.listenPlayNext = function(t, e) {
                this.listen("play_next", t, e)
            }, t.prototype.listenAdCompleted = function(t, e) {
                this.listen("ad_completed", t, e)
            }, t.prototype.playerListen = function(t, e) {
                this.player.on(t, e)
            }, t.prototype.playerUnListen = function(t, e) {
                this.player.off(t, e)
            }, t.prototype.useNewStats = function() {
                return !1
            }, t.prototype.getPausedBy = function() {
                return null
            }, t.prototype.getState = function() {
                return document.hidden ? 1 : 3
            }, t.prototype.getProgress = function() {
                return this.player.playerGetProgress()
            }, t.prototype.getProgressInSeconds = function() {
                return this.player.getProgressInSeconds()
            }, t.prototype.getVolume = function() {
                return this.player.getVolume()
            }, t.prototype.getAudioId = function() {
                return this.player.getAudioId()
            }, t.prototype.getAudioTrackCode = function() {
                return this.player.getAudioTrackCode()
            }, t.prototype.getPrevAudioId = function() {
                return this.player.getPrevAudioId()
            }, t.prototype.getPrevPlaylistId = function() {
                return this.player.getPrevPlaylistId()
            }, t.prototype.getPlaylistId = function() {
                return this.player.getPlaylistId()
            }, t.prototype.getContext = function() {
                return this.player.getContext()
            }, t.prototype.getSequence = function() {
                return this.player.getSequence()
            }, t.prototype.getType = function() {
                return this.player.getType()
            }, t.prototype.getListenedTime = function() {
                return this.player.getListenedTime()
            }, t.prototype.getSearchParams = function() {
                return this.player.getSearchParams()
            }, t.prototype.isPlaying = function() {
                return this.player.isPlaying()
            }, t.prototype.isAutoPlayed = function() {
                return this.player.isAutoPlayed()
            }, t.prototype.isRepeatCurrentAudio = function() {
                return this.player.isRepeatCurrentAudio()
            }, t.prototype.isRepeatAll = function() {
                return this.player.isRepeatAll()
            }, t.prototype.isShuffledPlaylist = function() {
                return this.player.isShuffledPlaylist()
            }, t.prototype.isRealPlaylist = function() {
                return this.player.isRealPlaylist()
            }, t.prototype.isRealPrevPlaylist = function() {
                return this.player.isRealPrevPlaylist()
            }, t.prototype.isPodcast = function() {
                return this.player.isPodcast()
            }, t.prototype.isAdPlaying = function() {
                return this.player.isAdPlaying()
            }, t.prototype.isLastTrack = function() {
                return this.player.isLastTrack()
            }, t.prototype.hasPrevAudio = function() {
                return this.player.hasPrevAudio()
            }, t.prototype.hasPrevPlaylist = function() {
                return this.player.hasPrevPlaylist()
            }, t.prototype.hasPlaylist = function() {
                return this.player.hasPlaylist()
            }, t.prototype.hasSearchParams = function() {
                return this.player.hasSearchParams()
            }, t.prototype.isDebug = function() {
                return !1
            }, t.prototype.sendListenedData = function(t) {
                return this.player.sendListenedData(t)
            }, t
        }();
        var y, b, g = window,
            v = g.ge,
            m = g.geByClass,
            A = function(t) {
                function e() {
                    return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.apply(this, arguments))
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
                }(e, t), e.prototype.playerListen = function(t, e) {
                    this.player.on(e, t, e)
                }, e.prototype.playerUnListen = function(t, e) {
                    this.player.off(e)
                }, e.prototype.listenPlay = function(t, e) {
                    this.listen(AudioPlayer.EVENT_PLAY, t, e)
                }, e.prototype.listenPause = function(t, e) {
                    this.listen(AudioPlayer.EVENT_PAUSE, t, e)
                }, e.prototype.listenProgress = function(t, e) {
                    this.listen(AudioPlayer.EVENT_PROGRESS, t, e)
                }, e.prototype.listenVolume = function(t, e) {
                    this.listen(AudioPlayer.EVENT_VOLUME, t, e)
                }, e.prototype.listenSeek = function(t, e) {
                    this.listen(AudioPlayer.EVENT_SEEK, t, e)
                }, e.prototype.listenPlaylistChanged = function(t, e) {
                    this.listen(AudioPlayer.EVENT_PLAYLIST_CHANGED, t, e)
                }, e.prototype.listenEnded = function(t, e) {
                    this.listen(AudioPlayer.EVENT_ENDED, t, e)
                }, e.prototype.listenPlayNext = function(t, e) {
                    this.listen(AudioPlayer.EVENT_PLAY_NEXT, t, e)
                }, e.prototype.listenAdCompleted = function(t, e) {
                    this.listen(AudioPlayer.EVENT_AD_COMPLETED, t, e)
                }, e.prototype.useNewStats = function() {
                    var t = this.player.getCurrentAudio();
                    return !!t && Boolean(t[r.a.AUDIO_ITEM_INDEX_NEW_STATS])
                }, e.prototype.getPausedBy = function(t) {
                    var e = this.player,
                        i = e.pausedByVideo,
                        r = e.pausedByStories,
                        n = e.pausedByAudio,
                        a = e.pausedByQueue;
                    return i && t < i || window.Videoview && Videoview.isLayerShown() ? "video" : r && t < r || window.cur && cur.storyLayer ? "stories" : n && t < n ? "audio" : a && t < a ? "queue" : null
                }, e.prototype.getState = function() {
                    var e = t.prototype.getState.call(this),
                        i = this.getAudioId();
                    if (i) {
                        var r = m("_audio_row_" + i + " audio_row__current", v("page_layout"));
                        if (r && r.length) return 2
                    }
                    return e
                }, e.prototype.getProgress = function() {
                    return this.player.getCurrentProgress()
                }, e.prototype.getProgressInSeconds = function() {
                    var t = this.player.getCurrentAudio();
                    return t ? Math.round(this.player.getCurrentProgress() * t[r.a.AUDIO_ITEM_INDEX_DURATION]) : 0
                }, e.prototype.getVolume = function() {
                    return Math.round(100 * (t = this.player.getVolume(), Math.log(1 + 34 * t) / Math.log(35)));
                    var t
                }, e.prototype.getAudioId = function() {
                    var t = this.player.getCurrentAudio();
                    if (t) return t[r.a.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[r.a.AUDIO_ITEM_INDEX_ID]
                }, e.prototype.getAudioTrackCode = function() {
                    var t = this.player.getCurrentAudio();
                    if (t) return t[r.a.AUDIO_ITEM_INDEX_TRACK_CODE]
                }, e.prototype.getPrevAudioId = function() {
                    var t = this.player._prevAudio;
                    if (t) return t[r.a.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[r.a.AUDIO_ITEM_INDEX_ID]
                }, e.prototype.getPrevPlaylistId = function() {
                    var t = this.player._prevPlaylist;
                    if (t) return t.getFullId()
                }, e.prototype.getPlaylistId = function() {
                    var t = this.player.getCurrentPlaylist();
                    if (t) return t.getFullId()
                }, e.prototype.getContext = function() {
                    return this.player._getPlayingContext()
                }, e.prototype.getSequence = function() {
                    return this.player._seq
                }, e.prototype.getType = function() {
                    if (this.player._impl) return this.player._impl.type
                }, e.prototype.getListenedTime = function() {
                    var t = Math.round(this.player._listenedTime);
                    return isNaN(t) ? 0 : t || 0
                }, e.prototype.getSearchParams = function() {
                    var t = this.player.getCurrentPlaylist();
                    if (t) return t.getSearchParams()
                }, e.prototype.isShuffledPlaylist = function() {
                    var t = this.player.getCurrentPlaylist();
                    if (t) return t.isShuffled()
                }, e.prototype.isRealPlaylist = function() {
                    var t = this.player.getCurrentPlaylist();
                    return !!t && t.getType() === AudioPlaylist.TYPE_PLAYLIST
                }, e.prototype.isRealPrevPlaylist = function() {
                    var t = this.player._prevPlaylist;
                    return !!t && t.getType() === AudioPlaylist.TYPE_PLAYLIST
                }, e.prototype.isPodcast = function() {
                    var t = this.player.getCurrentAudio();
                    return r.a.isPodcast(t)
                }, e.prototype.isLastTrack = function() {
                    var t = this.player.getCurrentAudio(),
                        e = this.player.getCurrentPlaylist();
                    return !!t && (!(!t || e) || e.indexOfAudio(t) + 1 === e.getAudiosCount())
                }, e.prototype.hasPlaylist = function() {
                    return Boolean(this.player.getCurrentPlaylist())
                }, e.prototype.hasSearchParams = function() {
                    return this.getContext() === AudioPlaylist.TYPE_SEARCH
                }, e.prototype.isDebug = function() {
                    return Boolean(ls.get(AudioPlayer.LS_PREFIX + "stats_debug"))
                }, e.prototype.sendListenedData = function(t) {
                    var e = this,
                        i = extend({
                            act: "listened_data",
                            impl: this.getType(),
                            hash: this.player.getListenedHash(),
                            v: 5,
                            loc: nav.strLoc
                        }, t);
                    isArray(cur.audioLoadTimings) && (i.timings = cur.audioLoadTimings.join(","), cur.audioLoadTimings = []), ajax.post("al_audio.php", i, {
                        onDone: function(t) {
                            e.player._adsConfig = t
                        }
                    })
                }, e
            }(_),
            w = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                }
                return t
            },
            E = function() {
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function(t, e) {
                        var i = [],
                            r = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (i.push(o.value), !e || i.length !== e); r = !0);
                        } catch (t) {
                            n = !0, a = t
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                        return i
                    }(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function P(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i, t
        }
        var S = window.debounce,
            I = (P(y = {}, "start", 1), P(y, "stop", 2), P(y, "volume", 3), P(y, "rewind", 4), P(y, "play_further", 5), y),
            T = (P(b = {}, "default", 1), P(b, "next_track", 2), P(b, "prev_track", 3), P(b, "auto", 4), P(b, "interruption", 5), P(b, "pause", 6), P(b, "new", 7), P(b, "close_app", 8), P(b, "queue", 9), P(b, "pause", 10), b),
            M = 300,
            C = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.playerAdapter = e, this.listenedData = null, this.sendTimeout = null, this.currentAudioId = null, this.currentAudioTrackCode = null, this.pausedAudioId = null, this.playlistChanged = !1, this.currentPosition = 0, this.currentListened = 0, this.playedTime = 0, this.adsCompleted = !1, this.listenedDelta = 0, this.debug = e.isDebug(), this.onVolume = S(this.onVolume.bind(this), M), this.playerAdapter.listenPlay(this.onPlay, this), this.playerAdapter.listenPause(this.onPause, this), this.playerAdapter.listenProgress(this.onProgress, this), this.playerAdapter.listenVolume(this.onVolume, this), this.playerAdapter.listenSeek(this.onSeek, this), this.playerAdapter.listenPlaylistChanged(this.onPlaylistChanged, this), this.playerAdapter.listenEnded(this.onEnded, this), this.playerAdapter.listenPlayNext(this.onPlayNext, this), this.playerAdapter.listenAdCompleted(this.onAdCompleted, this), this.onPageClose = this.onPageClose.bind(this), addEvent(window, "beforeunload", this.onPageClose)
                }
                return t.prototype.canOperate = function() {
                    return !this.playerAdapter.isPodcast() && !this.playerAdapter.isAdPlaying() && this.playerAdapter.useNewStats()
                }, t.prototype.getCurrentAudioParams = function() {
                    var t = this.currentAudioId || this.playerAdapter.getAudioId();
                    if (t) {
                        var e = t.split("_"),
                            i = E(e, 2);
                        return {
                            ownerId: i[0],
                            audioId: i[1],
                            trackCode: this.currentAudioTrackCode || this.playerAdapter.getAudioTrackCode()
                        }
                    }
                    return {}
                }, t.prototype.getEnvParams = function() {
                    return {
                        state: this.playerAdapter.getState(),
                        context: this.playerAdapter.getContext(),
                        ref: window.cur && vk.widget ? String(cur.widgetReferrer || "").substring(0, 20) : ""
                    }
                }, t.prototype.getListenedTime = function() {
                    return Math.round(this.playerAdapter.getListenedTime()) || 0
                }, t.prototype.getListenedTimeSegment = function(t) {
                    return void 0 === t ? Math.max(this.getListenedTime() - this.listenedDelta, 0) : Math.max(t - this.listenedDelta, 0)
                }, t.prototype.getPlaySubtype = function() {
                    if (this.playerAdapter.isAutoPlayed()) return "auto";
                    var t = this.playerAdapter.getSequence();
                    if (t) return t > 0 ? "next_track" : "prev_track";
                    var e = this.pausedAudioId,
                        i = this.playerAdapter.getAudioId();
                    return e && i === e ? "pause" : "new"
                }, t.prototype.onPlay = function() {
                    if (this.canOperate()) {
                        var t = this.playerAdapter.getAudioId(),
                            e = this.currentAudioId === t,
                            i = this.playerAdapter.getListenedTime();
                        e || this.onTrackSwitch(this.currentAudioId, this.currentAudioTrackCode, this.currentPlaylistId, t), this.playedTime = vkNow(), this.currentAudioId = t, this.currentAudioTrackCode = this.playerAdapter.getAudioTrackCode(), this.currentPlaylistId = this.playerAdapter.getPlaylistId(), !this.playerAdapter.hasPrevAudio() || this.pausedAudioId && !this.playerAdapter.isAutoPlayed() ? this.currentPosition = this.playerAdapter.getProgressInSeconds() : (this.currentPosition = 0, i = 0), this.currentListened = i, this.sendCurrentAudioEvent({
                            type: "start",
                            subtype: this.getPlaySubtype(),
                            position: this.currentPosition,
                            listened: 0
                        }), this.pausedAudioId = null, this.playlistChanged = !1
                    }
                }, t.prototype.onPause = function() {
                    var t = this;
                    this.canOperate() && (this.pausedAudioId = this.playerAdapter.getAudioId(), this.collectListenedData(), this.sendListenedDataDelayed(1e3), setTimeout(function() {
                        if (!(vkNow() - t.playedTime < 50)) {
                            var e = t.playerAdapter.getPausedBy(t.playedTime);
                            t.sendCurrentAudioEvent({
                                type: "stop",
                                subtype: e ? "queue" === e ? "queue" : "interruption" : "pause"
                            }), t.listenedDelta = t.playerAdapter.getListenedTime()
                        }
                    }))
                }, t.prototype.onProgress = function() {
                    this.currentPosition = this.playerAdapter.getProgressInSeconds(), this.currentListened = this.playerAdapter.getListenedTime(), !this.pausedAudioId && vkNow() - this.playedTime > 50 && this.collectListenedData(), this.adsCompleted && (this.sendCurrentAudioEvent({
                        type: "start",
                        subtype: this.getPlaySubtype(),
                        position: this.currentPosition
                    }), this.adsCompleted = !1)
                }, t.prototype.onVolume = function() {
                    this.canOperate() && this.sendCurrentAudioEvent({
                        type: "volume",
                        subtype: "default"
                    })
                }, t.prototype.onSeek = function() {
                    if (this.canOperate()) {
                        var t = {
                            position: this.currentPosition,
                            positionTo: this.playerAdapter.getProgressInSeconds()
                        };
                        t.position !== t.positionTo && this.sendCurrentAudioEvent(w({
                            type: "rewind",
                            subtype: "default"
                        }, t))
                    }
                }, t.prototype.onPlaylistChanged = function() {
                    this.canOperate() && (this.playlistChanged = !0)
                }, t.prototype.onEnded = function() {
                    this.listenedData && this.playerAdapter.isLastTrack() && (this.listenedData.end_stream_reason = "session_end"), this.playerAdapter.isRepeatCurrentAudio() ? (this.collectListenedData(), this.listenedDelta = this.getListenedTime(), this.sendListenedData()) : this.sendListenedDataDelayed(150)
                }, t.prototype.onPlayNext = function(t, e) {
                    if (this.canOperate()) {
                        var i = e.split("_"),
                            r = E(i, 2),
                            n = r[0],
                            a = r[1];
                        this.sendAudioEvent({
                            type: "play_further",
                            subtype: "default",
                            ownerId: n,
                            audioId: a
                        })
                    }
                }, t.prototype.onAdCompleted = function() {
                    this.playerAdapter.useNewStats() && (this.adsCompleted = !0)
                }, t.prototype.onTrackSwitch = function(t, e, i) {
                    if (t) {
                        var r = "default",
                            n = this.playerAdapter.getSequence(),
                            a = t.split("_"),
                            o = E(a, 2),
                            s = o[0],
                            d = o[1];
                        n && !this.playerAdapter.isAutoPlayed() && (r = n > 0 ? "next_track" : "prev_track"), this.sendCurrentAudioEvent({
                            type: "stop",
                            subtype: r,
                            position: this.currentPosition,
                            listened: this.getListenedTimeSegment(this.currentListened),
                            trackCode: e,
                            playlistId: i,
                            ownerId: s,
                            audioId: d
                        })
                    }
                    this.collectListenedDataSwitch(), this.sendListenedData(), this.listenedDelta = 0
                }, t.prototype.onPageClose = function() {
                    this.playerAdapter.isPlaying() && (this.sendCurrentAudioEvent({
                        type: "stop",
                        subtype: "close_app"
                    }), this.sendListenedData())
                }, t.prototype.collectListenedDataSwitch = function() {
                    if (this.listenedData) {
                        if ("session_end" === this.listenedData.end_stream_reason) return;
                        var t = this.playerAdapter.isAutoPlayed(),
                            e = this.getListenedTime(),
                            i = this.playerAdapter.getSequence(),
                            r = null;
                        i && !t ? r = i > 0 ? "next_btn" : "prev" : this.playlistChanged && (r = "playlist_change"), !r && t && (r = "playlist_next"), this.listenedData.end_stream_reason = r || "unknown", e && (this.listenedData.listened = this.getListenedTimeSegment(e))
                    }
                }, t.prototype.collectListenedData = function() {
                    if (this.canOperate()) {
                        var t = this.playerAdapter.getAudioId(),
                            e = this.playerAdapter.getAudioTrackCode(),
                            i = this.getListenedTimeSegment();
                        if (i) {
                            var r = {
                                audio_id: t,
                                listened: i,
                                context: this.playerAdapter.getContext()
                            };
                            window.cur && vk.widget && (r.ref = cur.widgetReferrer || ""), this.playerAdapter.hasSearchParams() && (r.search_params = JSON.stringify(this.playerAdapter.getSearchParams())), this.playerAdapter.hasPlaylist() && (this.playerAdapter.isRealPlaylist() && (r.playlist_id = this.playerAdapter.getPlaylistId()), this.playerAdapter.isShuffledPlaylist() && (r.shuffled = 1)), e && (r.track_code = e), this.playerAdapter.isRepeatCurrentAudio() ? r.repeat = "one" : this.playerAdapter.isRepeatAll() && (r.repeat = "all"), this.playerAdapter.isAutoPlayed() && (r.auto = 1), this.playerAdapter.hasPrevAudio() && (r.prev_audio_id = this.playerAdapter.getPrevAudioId()), this.playerAdapter.hasPrevPlaylist() && this.playerAdapter.isRealPrevPlaylist() && (r.prev_playlist_id = this.playerAdapter.getPrevPlaylistId()), this.playerAdapter.isPlaying() || (r.end_stream_reason = "stop_btn"), r.state = document.hidden ? "background" : "app", this.listenedData = r, this.sendListenedDataDelayed(1e4)
                        }
                    }
                }, t.prototype.sendListenedData = function() {
                    clearTimeout(this.sendTimeout);
                    var t = this.listenedData;
                    this.listenedData = null, t && t.listened && this.playerAdapter.sendListenedData(t)
                }, t.prototype.sendListenedDataDelayed = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    clearTimeout(this.sendTimeout), this.sendTimeout = setTimeout(function() {
                        return t.sendListenedData()
                    }, e)
                }, t.prototype.serializeEvent = function(t) {
                    var e = [I[t.type], T[t.subtype], 1];
                    return t.audioId ? e.push(t.ownerId + "_" + t.audioId) : e.push(0), t.trackCode ? e.push(t.trackCode) : e.push(0), t.state ? e.push(t.state) : e.push(0), t.ref ? e.push(t.ref) : e.push(""), t.context ? e.push(t.context) : e.push("other"), t.volume || 0 === t.volume ? e.push(t.volume) : e.push(this.playerAdapter.getVolume()), t.position || 0 === t.position ? e.push(t.position) : e.push(this.playerAdapter.getProgressInSeconds()), t.shuffle ? e.push(t.shuffle ? 1 : 0) : e.push(0), t.repeat ? e.push(t.repeat) : e.push(0), t.listened ? e.push(Math.max(t.listened, 0)) : e.push(0), t.playlistId ? e.push(t.playlistId) : e.push(0), t.positionTo && e.push(t.positionTo), e
                }, t.prototype.sendEvent = function(t) {
                    this.debug && console.log("audio stats event", t.type, t.subtype, t), statlogsValueEvent.apply(void 0, ["audio_sts"].concat(function(t) {
                        if (Array.isArray(t)) {
                            for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                            return i
                        }
                        return Array.from(t)
                    }(this.serializeEvent(t))))
                }, t.prototype.sendCurrentAudioEvent = function(t) {
                    this.sendEvent(w({
                        shuffle: this.playerAdapter.isShuffledPlaylist(),
                        repeat: this.playerAdapter.isRepeatCurrentAudio() ? 1 : this.playerAdapter.isRepeatAll() ? 2 : 0,
                        volume: this.playerAdapter.getVolume(),
                        position: this.playerAdapter.getProgressInSeconds(),
                        listened: this.getListenedTimeSegment(),
                        playlistId: this.playerAdapter.getPlaylistId()
                    }, this.getEnvParams(), this.getCurrentAudioParams(), t))
                }, t.prototype.sendAudioEvent = function(t) {
                    this.sendEvent(w({}, t, this.getEnvParams()))
                }, t.prototype.destroy = function() {
                    this.playerAdapter.unListenAll(), removeEvent(window, "beforeunload", this.onPageClose), this.playerAdapter = null, this.listenedData = null, clearTimeout(this.sendTimeout)
                }, t
            }();

        function k(t, e, i) {
            var r = t.getContext("2d");
            r.clearRect(0, 0, t.width, t.height), r.fillStyle = i ? "#3D6899" : "#ffffff";
            for (var n = 0; n < 4; n++) {
                var a = 2 + 12 * e[n];
                r.fillRect(13 + 4 * n, 12 - a + 14, 2, a)
            }
        }
        window.AudioPlayer || (window.TopAudioPlayer = n, window.AudioPlaylist = a.a, window.AudioPlayerHTML5 = h, window.AudioPlayerFlash = p, window.AudioPlayer = function() {
            var t = this;
            if (this._currentAudio = !1, this._isPlaying = !1, this._prevPlaylist = null, this._currentPlaylist = null, this._playlists = [], this.subscribers = [], this._tasks = [], this._statusExport = {}, this._currentPlayingRows = [], this._podcastsActionRef = {}, this._podcastsActionLastId = {}, this._allowPrefetchNext = !1, !vk.isBanned) {
                r.a.debugLog("Player creation");
                var e = new A(this);
                this.stats = new C(e), this._initImpl(), this._initEvents(), this._restoreVolumeState(), this._podcastCleanStates(), setTimeout(function() {
                    t.restoreState(), r.a.toggleAudioHQBodyClass(), t.updateCurrentPlaying()
                })
            }
        }), AudioPlayer.prototype.getVersion = function() {
            return 15
        }, AudioPlayer.prototype._initImpl = function(t) {
            var e = this;
            this._impl && this._impl.destroy();
            var i = 0,
                n = function(t) {
                    if (-1 != i) {
                        if (t && (i++, this._implSetDelay(200), i > 3)) {
                            i = -1;
                            var e = new MessageBox({
                                title: getLang("global_error")
                            }).content(getLang("audio_error_loading")).setButtons("Ok", function() {
                                i = 0, curBox().hide()
                            });
                            return e.show(), s(function() {
                                i = 0, e.hide()
                            }, 3e3), this.notify(AudioPlayer.EVENT_ENDED), void this.notify(AudioPlayer.EVENT_FAILED)
                        }
                        r.a.isPodcast(this.getCurrentAudio()) ? (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.stop()) : this._repeatCurrent ? (this.notify(AudioPlayer.EVENT_ENDED), this.notify(AudioPlayer.EVENT_PLAY), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._implSeekImmediate(0), this._implPlay()) : (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.playNext(!0)), this._sendListenedData()
                    }
                }.bind(this),
                a = {
                    onBufferUpdate: function(t) {
                        this.notify(AudioPlayer.EVENT_BUFFERED, t)
                    }.bind(this),
                    onEnd: function() {
                        0,
                        n()
                    },
                    onFail: function() {
                        e._sendPlayerErrorStats(e._impl), 0, n(!0)
                    },
                    onCanPlay: function() {
                        this.notify(AudioPlayer.EVENT_CAN_PLAY)
                    }.bind(this),
                    onProgressUpdate: function(t, e) {
                        var i = this.getCurrentAudio();
                        !this._muteProgressEvents && i && this.notify(AudioPlayer.EVENT_PROGRESS, t, i[r.a.AUDIO_ITEM_INDEX_DURATION], e)
                    }.bind(this),
                    onFrequency: function(t) {
                        e.notify(AudioPlayer.EVENT_FREQ_UPDATE, t)
                    }
                };
            r.a.debugLog("Implementation init"), r.a.debugLog("param browser.flash", browser.flash), r.a.debugLog("param force HTML5", !!t), t ? this._impl = new h(a) : h.isSupported() ? this._impl = new h(a) : browser.flash && (this._impl = new p(a)), this._implSetVolume(0)
        }, AudioPlayer.EVENT_CURRENT_CHANGED = "curr", AudioPlayer.EVENT_PLAY = "start", AudioPlayer.EVENT_PAUSE = "pause", AudioPlayer.EVENT_STOP = "stop", AudioPlayer.EVENT_UPDATE = "update", AudioPlayer.EVENT_LOADED = "loaded", AudioPlayer.EVENT_ENDED = "ended", AudioPlayer.EVENT_FAILED = "failed", AudioPlayer.EVENT_BUFFERED = "buffered", AudioPlayer.EVENT_PROGRESS = "progress", AudioPlayer.EVENT_VOLUME = "volume", AudioPlayer.EVENT_PLAYLIST_CHANGED = "plchange", AudioPlayer.EVENT_ADDED = "added", AudioPlayer.EVENT_REMOVED = "removed", AudioPlayer.EVENT_FREQ_UPDATE = "freq", AudioPlayer.EVENT_SEEK = "seek", AudioPlayer.EVENT_PLAY_NEXT = "play_next", AudioPlayer.EVENT_AD_READY = "ad_ready", AudioPlayer.EVENT_AD_DEINITED = "ad_deinit", AudioPlayer.EVENT_AD_STARTED = "ad_started", AudioPlayer.EVENT_AD_COMPLETED = "ad_completed", AudioPlayer.EVENT_START_LOADING = "start_load", AudioPlayer.EVENT_CAN_PLAY = "actual_start", AudioPlayer.LS_VER = "v20", AudioPlayer.LS_KEY_PREFIX = "audio", AudioPlayer.LS_PREFIX = AudioPlayer.LS_KEY_PREFIX + "_" + AudioPlayer.LS_VER + "_", AudioPlayer.LS_VOLUME = "vol", AudioPlayer.LS_PL = "pl", AudioPlayer.LS_TRACK = "track", AudioPlayer.LS_SAVED = "saved", AudioPlayer.LS_PROGRESS = "progress", AudioPlayer.LS_PODCASTS = "podcasts", AudioPlayer.LS_DURATION_TYPE = "dur_type", AudioPlayer.LS_UUID = "uuid", AudioPlayer.LS_ADS_CURRENT_DELAY = "ads_current_delay_v4", AudioPlayer.PLAYBACK_RATE_STEP = .5, AudioPlayer.PLAYBACK_RATE_MAX = 3, AudioPlayer.DEFAULT_VOLUME = .8, AudioPlayer.AD_TYPE = "preroll", window.audioIconSuffix = window.devicePixelRatio >= 2 ? "_2x" : "", AudioPlayer.tabIcons = {
            def: "/images/icons/favicons/fav_logo" + audioIconSuffix + ".ico",
            play: "/images/icons/favicons/fav_play" + audioIconSuffix + ".ico",
            pause: "/images/icons/favicons/fav_pause" + audioIconSuffix + ".ico"
        }, AudioPlayer.getLang = function(t) {
            var e = getAudioPlayer();
            return e && e.langs ? e.langs[t] : t
        }, AudioPlayer.clearDeprecatedCacheKeys = function() {
            AudioPlayer._iterateCacheKeys(function(t) {
                return t == AudioPlayer.LS_VER
            })
        }, AudioPlayer.clearOutdatedCacheKeys = function() {
            (ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_SAVED) || 0) < vkNow() - 72e5 && AudioPlayer._iterateCacheKeys(function(t, e) {
                return !inArray(e, [AudioPlayer.LS_PL, AudioPlayer.LS_TRACK, AudioPlayer.LS_PROGRESS])
            })
        }, AudioPlayer.clearAllCacheKeys = function() {
            AudioPlayer._iterateCacheKeys(function() {
                return !1
            }), setCookie("remixcurr_audio", "", -1)
        }, AudioPlayer._iterateCacheKeys = function(t) {
            for (var e in window.localStorage)
                if (0 === e.indexOf(AudioPlayer.LS_KEY_PREFIX + "_")) {
                    var i = e.split("_");
                    t(i[1], i[2]) || localStorage.removeItem(e)
                }
        }, AudioPlayer.prototype.onMediaKeyPressedEvent = function(t) {
            var e = this.getCurrentAudio();
            this.getCurrentPlaylist();
            if (e) switch (t.keyCode) {
                case 179:
                    this.isPlaying() ? this.pause() : this.play();
                    break;
                case 178:
                    this.seek(0), this.pause();
                    break;
                case 177:
                    this.playPrev();
                    break;
                case 176:
                    this.playNext()
            }
        }, AudioPlayer.prototype.deletePlaylist = function(t) {
            for (var e = 0; e < this._playlists.length; e++) this._playlists[e] == t && this._playlists.splice(e, 1)
        }, AudioPlayer.prototype.mergePlaylistData = function(t, e) {
            if (!t.hasMore()) return t;
            each(this._playlists, function(i, r) {
                r.getId() == t.getId() && r.mergeWith(e)
            })
        }, AudioPlayer.prototype.deleteCurrentPlaylist = function() {
            this.stop(), delete this._currentAudio, delete this._currentPlaylist, this.notify(AudioPlayer.EVENT_UPDATE), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED), this.updateCurrentPlaying()
        }, AudioPlayer.prototype.updateCurrentPlaying = function(t) {
            t = !!t;
            var e = r.a.asObject(this.getCurrentAudio()),
                i = [];
            if (e) {
                var n = geByClass("_audio_row_" + e.fullId);
                i = i.concat([].slice.call(n))
            }
            for (var a = 0, o = this._currentPlayingRows.length; a < o; a++) {
                (s = this._currentPlayingRows[a]) && !inArray(s, i) && this.toggleCurrentAudioRow(s, !1, t)
            }
            if (e)
                for (a = 0, o = i.length; a < o; a++) {
                    var s;
                    if (s = i[a]) {
                        if (gpeByClass("article_editor_canvas", s)) continue;
                        this.toggleCurrentAudioRow(s, !0, t)
                    }
                }
            this._currentPlayingRows = i, each(geByClass("_audio_pl"), function() {
                removeClass(this, "audio_pl__playing")
            });
            var d, u = this.isPlaying(),
                f = this.getCurrentPlaylist();
            u && f && ((d = geByClass("_audio_pl_" + f.getOwnerId() + "_" + f.getPlaylistId())) && each(d, function() {
                addClass(this, "audio_pl__playing")
            }))
        }, AudioPlayer.prototype.toggleCurrentAudioRow = function(t, e, i) {
            var n = r.a.getAudioFromEl(t, !0);
            if (n.isCurrent != e) {
                addClass(t, r.a.AUDIO_CURRENT_CLS);
                var a = geByClass1("_audio_row__title", t),
                    o = geByClass1("_audio_row__duration", t),
                    s = geByClass1("_audio_row__play_btn", t),
                    d = r.a.getDurationMod(e ? n.duration : n.duration * this.getCurrentProgress()),
                    u = function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                        if (o) {
                            var i = r.a.getDurationMod(t);
                            o.innerHTML = e + formatTime(t), i !== d && (replaceClass(o, r.a.AUDIO_DURATION_CLS + "-" + d, r.a.AUDIO_DURATION_CLS + "-" + i), d = i)
                        }
                    };
                n.withInlinePlayer && toggleClass(t, "audio_row__player_transition", i), (i = !!n.withInlinePlayer && i) ? setTimeout(f.bind(this), 0) : f.call(this)
            }

            function f() {
                var o = this;
                if (n.withInlinePlayer && (e ? this._addRowPlayer(t, i) : this._removeRowPlayer(t)), e) {
                    this.on(t, AudioPlayer.EVENT_PLAY, function(e) {
                        r.a.asObject(e).fullId == n.fullId && (addClass(t, r.a.AUDIO_PLAYING_CLS), s && attr(s, "aria-label", getLang("global_audio_pause")), a && attr(a, "role", "heading"))
                    }), this.on(t, AudioPlayer.EVENT_PROGRESS, function(t, e, i) {
                        if (n.withInlinePlayer || !o.isAdPlaying()) {
                            i = intval(i);
                            var r = 0,
                                a = "";
                            o.getDurationType() ? (r = Math.round(i - e * i), a = "-") : r = Math.round(e * i), u(r, a)
                        } else u(n.duration)
                    }), this.on(t, [AudioPlayer.EVENT_PAUSE, AudioPlayer.EVENT_ENDED], function() {
                        removeClass(t, r.a.AUDIO_PLAYING_CLS), s && attr(s, "aria-label", getLang("global_audio_play")), a && attr(a, "role", "")
                    });
                    var d = data(t, "bars");
                    if (!d && (n.isWithCovers || n.isNumeric || n.isPodcastListSnippet)) {
                        if (d = se('<canvas class="audio_row__sound_bars"></canvas>'), n.isPodcastListSnippet ? geByClass1("podcast_list_snippet__cover", t).appendChild(d) : t.appendChild(d), d.width = r.a.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), d.height = r.a.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), d.style.width = r.a.AUDIO_ROW_COVER_SIZE, d.style.height = r.a.AUDIO_ROW_COVER_SIZE, isRetina()) d.getContext("2d").scale(2, 2);
                        var f = n.isNumeric;
                        this.on(t, AudioPlayer.EVENT_FREQ_UPDATE, function(t, e) {
                            k(d, e, f)
                        }), k(d, [0, 0, 0, 0], f), data(t, "bars", d)
                    }
                    toggleClass(t, r.a.AUDIO_PLAYING_CLS, this.isPlaying())
                } else {
                    this.off(t), removeClass(t, r.a.AUDIO_PLAYING_CLS), removeClass(t, r.a.AUDIO_CURRENT_CLS), u(n.duration), s && attr(s, "aria-label", getLang("global_audio_play")), a && attr(a, "role", "");
                    var c = data(t, "bars");
                    c && (re(c), data(t, "bars", null))
                }
                i ? setTimeout(function() {
                    var e = r.a.getAudioFromEl(t, !0);
                    toggleClass(t, r.a.AUDIO_CURRENT_CLS, !!e.isCurrent)
                }, 0) : toggleClass(t, r.a.AUDIO_CURRENT_CLS, e)
            }
        }, AudioPlayer.prototype._removeRowPlayer = function(t) {
            removeClass(t, r.a.AUDIO_CURRENT_CLS);
            var e = data(t, "player_inited");
            if (e) {
                setTimeout(function() {
                    re(geByClass1("_audio_inline_player", t))
                }, 200);
                var i = geByClass1("_audio_duration", t);
                i && (i.innerHTML = formatTime(r.a.getAudioFromEl(t, !0).duration)), this.off(t), each(e.sliders, function() {
                    this.destroy()
                }), data(t, "player_inited", !1);
                var n = geByClass1("has_audio_player", t);
                n && removeClass(n, "has_audio_player")
            }
        }, AudioPlayer.prototype._addRowPlayer = function(t, e) {
            if (!(geByClass1("_audio_inline_player", t) || hasClass(t, "podcast_list_snippet") || hasClass(t, "podcast_snippet__controls"))) {
                var i = this,
                    n = se(vk.audioInlinePlayerTpl || getTemplate("audio_inline_player")),
                    a = geByClass1("_audio_player__place", t);
                a.appendChild(n), addClass(a, "has_audio_player");
                var o = new Slider(geByClass1("audio_inline_player_volume", n), {
                        value: i.getVolume(),
                        backValue: 0,
                        size: 1,
                        hintClass: "audio_player_hint",
                        withBackLine: !0,
                        log: !0,
                        formatHint: function(t) {
                            return Math.round(100 * t) + "%"
                        },
                        onChange: function(t) {
                            i.setVolume(t)
                        }
                    }),
                    s = new Slider(geByClass1("audio_inline_player_progress", n), {
                        value: 0,
                        backValue: 0,
                        size: 1,
                        hintClass: "audio_player_hint",
                        withBackLine: !0,
                        formatHint: function(t) {
                            var e = r.a.asObject(i.getCurrentAudio());
                            return formatTime(Math.round(t * e.duration))
                        },
                        onEndDragging: function(t) {
                            var e = r.a.asObject(i.getCurrentAudio());
                            e && r.a.isPodcast(e) && i.podcastSetActionRef(e, r.a.PodcastsLogs.ACTION_SEEK, "", n), i.seek(t)
                        }
                    });
                i.isAdPlaying() && s.toggleAdState(!0), i.on(t, AudioPlayer.EVENT_AD_DEINITED, function() {}), i.on(t, AudioPlayer.EVENT_AD_READY, function() {}), i.on(t, AudioPlayer.EVENT_AD_STARTED, function() {
                    s.toggleAdState(!0), s.setBackValue(0)
                }), i.on(t, AudioPlayer.EVENT_AD_COMPLETED, function() {
                    s.toggleAdState(!1)
                }), i.on(t, AudioPlayer.EVENT_START_LOADING, function() {
                    s.toggleLoading(!0)
                }), i.on(t, AudioPlayer.EVENT_CAN_PLAY, function() {
                    s.toggleLoading(!1)
                }), i.on(t, AudioPlayer.EVENT_BUFFERED, function(t, e) {
                    s.setBackValue(e)
                }), i.on(t, AudioPlayer.EVENT_PROGRESS, function(t, e) {
                    s.toggleLoading(!1), s.setValue(e)
                }), i.on(t, AudioPlayer.EVENT_VOLUME, function(t, e) {
                    o.setValue(e)
                }), data(t, "player_inited", {
                    sliders: [o, s]
                })
            }
        }, AudioPlayer.prototype.hasStatusExport = function() {
            for (var t in this._statusExport)
                if (this._statusExport[t]) return !0;
            return !1
        }, AudioPlayer.prototype.getStatusExportInfo = function() {
            return this._statusExport
        }, AudioPlayer.prototype.setStatusExportInfo = function(t) {
            this._statusExport = t
        }, AudioPlayer.prototype.deleteAudioFromAllPlaylists = function(t) {
            t = isObject(t) || isArray(t) ? r.a.asObject(t).fullId : t, each(this._playlists, function(e, i) {
                i.removeAudio(t)
            })
        }, AudioPlayer.prototype.updateAudio = function(t, e) {
            var i = "";
            if (isString(t) ? i = t : isArray(t) && (i = r.a.asObject(t).fullId), e || (e = t), each(this._playlists, function(t, n) {
                    for (var a = n.getAudiosList(), o = 0, s = a.length; o < s; o++)
                        if (a[o][r.a.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + a[o][r.a.AUDIO_ITEM_INDEX_ID] == i) return isObject(e) && each(e, function(t, e) {
                            a[o][t] = e
                        }), void(isArray(e) && (a[o] = e))
                }), this._currentAudio[r.a.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[r.a.AUDIO_ITEM_INDEX_ID] == i) {
                if (isObject(e)) {
                    var n = this;
                    each(e, function(t, e) {
                        n._currentAudio[t] = e
                    })
                }
                isArray(e) && (this._currentAudio = e, this.notify(AudioPlayer.EVENT_CURRENT_CHANGED))
            }
            return this.notify(AudioPlayer.EVENT_UPDATE), t
        }, AudioPlayer.prototype._triggerTNSPixel = function() {
            var t = this._lsGet("tns_triggered_time_v3") || 0;
            vkNow() - t < 864e5 || (this._lsSet("tns_triggered_time_v3", vkNow()), vkImage().src = "https://www.tns-counter.ru/V13a****mail_ru/ru/CP1251/tmsec=mail_audiostart/" + irand(1, 1e9))
        }, AudioPlayer.prototype._sendLCNotification = function() {
            var t = window.Notifier;
            t && t.lcSend("audio_start");
            try {
                window.Videoview && Videoview.togglePlay(!1)
            } catch (t) {}
        }, AudioPlayer.prototype.showHQLabel = function(t) {
            var e = "_audio_show_hq_label";
            return void 0 === t ? !!ls.get(e) : (t = !!t, ls.set(e, t), r.a.toggleAudioHQBodyClass(), t)
        }, AudioPlayer.prototype._restoreVolumeState = function() {
            AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys();
            var t = this._lsGet(AudioPlayer.LS_VOLUME);
            this._userVolume = void 0 == t || !1 === t ? AudioPlayer.DEFAULT_VOLUME : t
        }, AudioPlayer.prototype.restoreState = function() {
            if (!vk.widget && (AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys(), !window.cur.audioPreventRestoreTrack)) {
                this._currentAudio = this._lsGet(AudioPlayer.LS_TRACK);
                var t = this._lsGet(AudioPlayer.LS_PL);
                t && (t = JSON.parse(t), this._currentPlaylist = new a.a(t), this._initPlayingContext(t.context), t.originalPlaylistRawId && (this._currentPlaylist._originalPlaylistRawId = t.originalPlaylistRawId)), this._currentPlaylist && this._currentAudio ? this.notify(AudioPlayer.EVENT_UPDATE) : this._currentPlaylist = this._currentAudio = !1;
                var e = 0;
                if (r.a.isPodcast(this._currentAudio)) e = ((this._podcastGetStates()[this._currentAudio[r.a.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[r.a.AUDIO_ITEM_INDEX_ID]] || {}).position || 0) / this._currentAudio[r.a.AUDIO_ITEM_INDEX_DURATION];
                else e = this._lsGet(AudioPlayer.LS_PROGRESS) || 0;
                this._currentAudio && e && this._impl && 0 === this._impl.type.indexOf("html5") && (this._implSetUrl(this._currentAudio, !0), e < 1 && this._implSeek(e), this._implSetVolume(0)), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this._updatePlaybackRate()
            }
        }, AudioPlayer.prototype._ensureImplReady = function(t) {
            var e = this;
            this._impl && this._impl.onReady(function(i) {
                if (i) return t();
                "flash" == e._impl.type && (r.a.debugLog("Flash not initialized, lets try HTML5 as desperate way"), e._initImpl(!0))
            })
        }, AudioPlayer.prototype._implNewTask = function(t, e) {
            this._taskIDCounter = this._taskIDCounter || 1, this._tasks = this._tasks || [], this._tasks.push({
                name: t,
                cb: e,
                id: t + "_" + this._taskIDCounter++
            }), this._implDoTasks()
        }, AudioPlayer.prototype._implDoTasks = function() {
            if (this._tasks = this._tasks || [], !this._taskInProgress) {
                var t = this._tasks.shift();
                if (t) {
                    var e = this;
                    t = clone(t), this._taskInProgress = t.id, this._ensureImplReady(function() {
                        t.cb.call(e, function() {
                            e._taskAbort != t.id ? (e._taskInProgress = !1, e._implDoTasks()) : e._taskAbort = !1
                        })
                    })
                }
            }
        }, AudioPlayer.prototype._implClearAllTasks = function() {
            this._taskAbort = this._taskInProgress, this._taskInProgress = !1, this._tasks = []
        }, AudioPlayer.prototype._implClearTask = function(t) {
            this._tasks = this._tasks || [], this._tasks = this._tasks.filter(function(e) {
                return e.name != t
            })
        }, AudioPlayer.prototype._implSetDelay = function(t) {
            this._implNewTask("delay", function t(e) {
                s(e, t)
            })
        }, AudioPlayer.prototype.getDeviceId = function() {
            var t = ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_UUID);
            return t || (t = o(), ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_UUID, t)), t
        }, AudioPlayer.prototype._implPlay = function() {
            var t = this;
            this._implNewTask("play", function(e) {
                var i = r.a.asObject(t.getCurrentAudio());
                if (t._impl.play(i.url), t._muteProgressEvents = !1, t._allowPrefetchNext = !0, i.actionHash && (r.a.connectListenQueue(), ajax.post("al_audio.php", {
                        act: "start_playback",
                        audio_id: i.id,
                        owner_id: i.owner_id,
                        hash: i.actionHash,
                        uuid: t.getDeviceId()
                    })), r.a.isPodcast(i)) {
                    var n = t._podcastRestoreState();
                    t._podcastUpdateState(i, n, 0, r.a.PodcastsLogs.ACTION_PLAY)
                }
                e()
            })
        }, AudioPlayer.prototype._implSeekImmediate = function(t) {
            this._impl && this._impl.seek(t)
        }, AudioPlayer.prototype._implSeek = function(t) {
            var e = this;
            this._implClearTask("seek"), this._implNewTask("seek", function(i) {
                e._impl.seek(t), i()
            })
        }, AudioPlayer.prototype._implPause = function() {
            var t = this;
            this._implNewTask("pause", function(e) {
                t._impl.pause(), e()
            })
        }, AudioPlayer.prototype._implSetVolume = function(t, e) {
            if (this._impl) {
                var i = this;
                if (e) {
                    var r = 0 == t ? "vol_down" : "vol_up";
                    this._implNewTask(r, function(e) {
                        i._impl.fadeVolume(t, function() {
                            e()
                        })
                    })
                } else this._implNewTask("vol_set", function(e) {
                    i._impl.setVolume(t), e()
                })
            }
        }, AudioPlayer.prototype._implSetUrl = function(t, e) {
            var i = this;
            this._implClearTask("url"), this._implNewTask("url", function(n) {
                e || i.notify(AudioPlayer.EVENT_START_LOADING);
                var a = i._taskInProgress;
                i._ensureHasURL(t, function(t) {
                    a == i._taskInProgress && (t = r.a.asObject(t), i._impl.setUrl(t.url, function(t) {
                        t || (i._implClearAllTasks(), i._onFailedUrl()), n()
                    }))
                })
            })
        }, AudioPlayer.prototype.showSubscriptionPopup = function() {
            showBox("/al_audio.php", {
                act: "subscription_box"
            }, {
                params: {
                    containerClass: "audio_subscription_popup",
                    grey: !0,
                    width: 520
                }
            })
        }, AudioPlayer.prototype.toggleDurationType = function() {
            var t = intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE));
            t = !t, ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE, t), this.notify(AudioPlayer.EVENT_UPDATE, this.getCurrentProgress())
        }, AudioPlayer.prototype.getDurationType = function() {
            return intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE))
        }, AudioPlayer.prototype.getCurrentProgress = function() {
            return this._impl ? this._impl.getCurrentProgress() : 0
        }, AudioPlayer.prototype.getCurrentBuffered = function() {
            return this._impl ? this._impl.getCurrentBuffered() : 0
        }, AudioPlayer.prototype._initEvents = function() {
            var t = window.Notifier,
                e = this;
            t && (t.addRecvClbk("audio_start", "audio", function(t) {
                e.isPlaying() && (e.pausedByAudio = vkNow(), e.pause(!1, !e._fadeVolumeWorker)), delete e.pausedByVideo
            }), t.addRecvClbk("video_start", "audio", function(t) {
                e.isPlaying() && (e.pause(), e.pausedByVideo = vkNow())
            }), t.addRecvClbk("video_hide", "audio", function(t) {
                !e.isPlaying() && e.pausedByVideo && (vkNow() - e.pausedByVideo < 18e4 && e.play(), delete e.pausedByVideo)
            }), t.addRecvClbk("logged_off", "audio", function() {
                cur.loggingOff = !0, AudioPlayer.clearAllCacheKeys(), e.stop()
            }), t.addRecvClbk("stories_video_start", "audio", function() {
                e.isPlaying() && (e.pause(), e.pausedByStories = vkNow())
            }), t.addRecvClbk("stories_video_end", "audio", function() {
                !e.isPlaying() && e.pausedByStories && (vkNow() - e.pausedByStories < 18e4 && e.play(), delete e.pausedByStories)
            }))
        }, AudioPlayer.prototype.addPlaylist = function(t) {
            this.hasPlaylist(t.getId()) || this._playlists.push(t)
        }, AudioPlayer.prototype._cleanUpPlaylists = function() {
            for (var t = 0, e = -1, i = this._playlists.length - 1; i >= 0; i--) {
                if (!(d = this._playlists[i]).isReference() && (t += d.getAudiosCount()) > 4e3) {
                    e = i;
                    break
                }
            }
            if (-1 != e) {
                e += 1;
                var r = this._playlists.slice(0, e),
                    n = this.getCurrentPlaylist(),
                    a = [];
                for (i = 0; i < r.length; i++) {
                    var o = r[i];
                    if (n == o && (o = !1), o && !o.isReference())
                        for (var s = e; s < this._playlists.length; s++) {
                            var d;
                            (d = this._playlists[s]).isReference() && d.getSelf() == o && (o = !1)
                        }
                    o && a.push(i)
                }
                for (i = 0; i < a.length; i++) {
                    e = a[i];
                    this._playlists.splice(e, 1)
                }
                a.length && debugLog("AudioPlayer - " + a.length + " playlists removed")
            }
        }, AudioPlayer.prototype.hasPlaylist = function(t, e, i) {
            var r;
            r = void 0 !== e && void 0 !== i ? t + "_" + e + "_" + i : t;
            for (var n = 0; n < this._playlists.length; n++) {
                var a = this._playlists[n];
                if (!a.isReference() && a.getId() == r) return a
            }
            return !1
        }, AudioPlayer.prototype.getPlaylist = function(t, e, i, r) {
            if (t && !e && !i) {
                var n = t.split("_");
                t = n[0], e = n[1], i = n[2]
            }
            var o = this.hasPlaylist(t, e, i);
            return o ? (o.mergeWith({
                accessHash: r
            }), o) : new a.a({
                type: t,
                ownerId: e,
                albumId: i,
                hasMore: t != a.a.TYPE_TEMP,
                accessHash: r
            })
        }, AudioPlayer.prototype.isFromNextSequence = function() {
            return 1 === this._seq
        }, AudioPlayer.prototype.isFromPrevSequence = function() {
            return -1 === this._seq
        }, AudioPlayer.prototype.isAutoPlayed = function() {
            return !!this._autoNext
        }, AudioPlayer.prototype.hasPrevAudio = function() {
            return !(!this._prevAudio || r.a.getAudioFullId(this._currentAudio) === r.a.getAudioFullId(this._prevAudio))
        }, AudioPlayer.prototype.hasPrevPlaylist = function() {
            return !!this._prevPlaylist
        }, AudioPlayer.prototype.toggleRepeatCurrentAudio = function() {
            this._repeatCurrent = !this._repeatCurrent, this._repeatAll = !1
        }, AudioPlayer.prototype.isRepeatCurrentAudio = function() {
            return !!this._repeatCurrent
        }, AudioPlayer.prototype.toggleRepeatAll = function() {
            this._repeatAll = !this._repeatAll, this._repeatCurrent = !1
        }, AudioPlayer.prototype.isRepeatAll = function() {
            return !!this._repeatAll
        }, AudioPlayer.prototype.setNext = function(t, e, i) {
            if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
            if (!hasClass(t, "audio_row__added_next")) {
                addClass(t, "audio_row__added_next");
                var n = this.getCurrentPlaylist();
                if (n) {
                    var a = r.a.asObject(this.getCurrentAudio());
                    if (a && e.fullId == a.fullId) return;
                    var o = n.indexOfAudio(a);
                    if (-1 == o) return;
                    this.notify(AudioPlayer.EVENT_PLAY_NEXT, e.fullId);
                    var s = n.indexOfAudio(e); - 1 != s ? n.moveAudio(s, o + 1) : n.addAudio(i, o + 1)
                } else {
                    var d = r.a.getContextPlaylist(t);
                    this.play(i, d.playlist, d.context)
                }
                var u = window.AudioPage && currentAudioPage(t);
                if (u) {
                    var f = u.getPageCurrentPlaylist();
                    f && u.onUserAction(e, f)
                }
            }
        }, AudioPlayer.prototype._setTabIcon = function(t) {
            setFavIcon(AudioPlayer.tabIcons[t])
        }, AudioPlayer.prototype.on = function(t, e, i) {
            isArray(e) || (e = [e]), each(e, function(e, r) {
                this.subscribers.push({
                    context: t,
                    et: r,
                    cb: i
                })
            }.bind(this))
        }, AudioPlayer.prototype.off = function(t) {
            this.subscribers = this.subscribers.filter(function(e) {
                return e.context != t
            })
        }, AudioPlayer.prototype.notify = function(t, e, i, n) {
            var a = this.getCurrentAudio(),
                o = r.a.asObject(a);
            if (this._impl && (this.isAdPlaying() || !this._muteProgressEvents || !inArray(t, [AudioPlayer.EVENT_BUFFERED, AudioPlayer.EVENT_PROGRESS]))) switch (inArray(t, [AudioPlayer.EVENT_PLAY, AudioPlayer.EVENT_PAUSE]) && (this.subscribers = this.subscribers.filter(function(t) {
                return !(t.context instanceof Element) || bodyNode.contains(t.context)
            }), this.updateCurrentPlaying(!0)), each(this.subscribers || [], function(r, o) {
                o.et == t && o.cb(a, e, i, n)
            }), t) {
                case AudioPlayer.EVENT_VOLUME:
                    this._lsSet(AudioPlayer.LS_VOLUME, this._userVolume);
                    break;
                case AudioPlayer.EVENT_PLAY:
                    this.saveStateCurrentPlaylist(), this._saveStateCurrentAudio(), this._setTabIcon("play"), this._sendStatusExport();
                    break;
                case AudioPlayer.EVENT_PLAYLIST_CHANGED:
                    this.saveStateCurrentPlaylist(), this._saveStateCurrentAudio();
                    break;
                case AudioPlayer.EVENT_PROGRESS:
                    if (this._listenedTime = n, r.a.isPodcast(o)) e && n && this._podcastUpdateState(o, e, n, r.a.PodcastsLogs.ACTION_HEARTBEAT);
                    else if (!this._adsIsAdPlaying()) {
                        var s = this.getCurrentPlaylist(),
                            d = this._impl.getCurrentProgress();
                        if (vk.widget || this._lsSet(AudioPlayer.LS_PROGRESS, d), this._trackListenedData(o, s, n, this._getPlayingContext()), !vk.widget && this._allowPrefetchNext && d >= .8) {
                            var u = s.getNextAudio(a);
                            u && this._impl.isFullyLoaded() && (this._allowPrefetchNext = !1, this._prefetchAudio(u))
                        }
                    }
                    break;
                case AudioPlayer.EVENT_PAUSE:
                    r.a.isPodcast(o) && this._podcastUpdateState(o, this.getCurrentProgress(), this._impl.getPlayedTime(), r.a.PodcastsLogs.ACTION_PAUSE);
                    var f = this.getCurrentPlaylist();
                    this._trackListenedData(o, f, n, this._getPlayingContext()), this._setTabIcon("pause");
                    break;
                case AudioPlayer.EVENT_SEEK:
                    r.a.isPodcast(o) && this._podcastUpdateState(o, this.getCurrentProgress(), this._impl.getPlayedTime(), r.a.PodcastsLogs.ACTION_SEEK);
                    break;
                case AudioPlayer.EVENT_ENDED:
                    r.a.isPodcast(o) && this._podcastUpdateState(o, this.getCurrentProgress(), this._impl.getPlayedTime(), r.a.PodcastsLogs.ACTION_HEARTBEAT)
            }
        }, AudioPlayer.prototype._trackListenedDataSwitch = function(t, e, i) {
            if (this._currentAudioListenData) {
                this._switchPlaylistRef || (this._switchPlaylistRef = this._currentPlaylist);
                var r = 0,
                    n = this.isAutoPlayed(),
                    a = e && this._prevContext !== e,
                    o = this._switchPlaylistRef && i && this._switchPlaylistRef.getId() !== i.getId();
                this._seq && !n ? r = "next_btn" : (a || o) && (r = "playlist_change"), !r && n && (r = "playlist_next"), this._currentAudioListenData.end_stream_reason = r || "unknown", this._switchPlaylistRef = i
            }
        }, AudioPlayer.prototype._trackListenedData = function(t, e, i, n) {
            var o = this;
            if (i = Math.round(i) || 0) {
                var s = r.a.asObject(t);
                if (!s.useNewStats) {
                    var d = {
                        audio_id: s.fullId,
                        listened: i,
                        context: n
                    };
                    vk.widget && (d.ref = cur.widgetReferrer || ""), n === a.a.TYPE_SEARCH && e && (d.search_params = JSON.stringify(e.getSearchParams())), e && (e.getType() === a.a.TYPE_PLAYLIST && (d.playlist_id = e.getFullId && e.getFullId()), e.isShuffled() && (d.shuffled = 1)), t.trackCode && (d.track_code = t.trackCode), this.isRepeatCurrentAudio() && (d.repeat = "one"), this.isAutoPlayed() && (d.auto = 1), this.hasPrevAudio() && (d.prev_audio_id = r.a.asObject(this._prevAudio).fullId), this.hasPrevPlaylist() && this._prevPlaylist.getType() === a.a.TYPE_PLAYLIST && (d.prev_playlist_id = this._prevPlaylist.getFullId && this._prevPlaylist.getFullId()), this.isPlaying() || (d.end_stream_reason = "stop_btn"), d.state = document.hidden ? "background" : "app", this._currentAudioListenData = d, clearTimeout(this._sendListenedTO), this._sendListenedTO = setTimeout(function() {
                        o._sendListenedData()
                    }, 1e4)
                }
            }
        }, AudioPlayer.prototype._sendListenedData = function() {
            var t = this;
            clearTimeout(this._sendListenedTO);
            var e = this._currentAudioListenData;
            if (this._currentAudioListenData = !1, e && e.listened && this.getListenedHash()) {
                var i = extend({
                    act: "listened_data",
                    impl: this._impl.type,
                    hash: this.getListenedHash(),
                    v: 5,
                    loc: nav.strLoc
                }, e);
                isArray(cur.audioLoadTimings) && (i.timings = cur.audioLoadTimings.join(","), cur.audioLoadTimings = []), ajax.post("al_audio.php", i, {
                    onDone: function(e) {
                        t._adsConfig = e
                    }
                })
            }
        }, AudioPlayer.prototype._sendPlayerErrorStats = function(t) {
            var e = r.a.asObject(this.getCurrentAudio()).full_id,
                i = extend({
                    audio: e,
                    impl_type: t.type,
                    progress: this.getCurrentProgress(),
                    buffered: this.getCurrentBuffered()
                }, t.getErrorData());
            ajax.post("al_audio.php?act=player_error_stats", i)
        }, AudioPlayer.prototype.playLive = function(t, e) {
            var i = this.getPlaylist(a.a.TYPE_LIVE, vk.id, data[0]);
            i.mergeWith({
                live: t,
                hasMore: !1
            }), t = i.getLiveInfo();
            var r = this;
            ajax.post("al_audio.php", {
                act: "a_play_audio_status",
                audio_id: t.audioId,
                host_id: t.hostId,
                hash: t.hash
            }, extend(e, {
                onDone: function(t, e, n) {
                    i.mergeWith({
                        title: e.title,
                        list: [t]
                    }), r.play(t, i, n)
                }
            }))
        }, AudioPlayer.prototype._sendStatusExport = function() {
            var t = this.getCurrentAudio();
            if (t) {
                t = r.a.asObject(t);
                var e = this.statusSent ? this.statusSent.split(",") : [!1, 0],
                    i = vkNow() - intval(e[1]);
                if (this.hasStatusExport() && !r.a.isPodcast(t) && (t.id != e[0] || i > 3e5)) {
                    var n = this.getCurrentPlaylist(),
                        a = n ? n.playbackParams : null;
                    setTimeout(ajax.post.pbind("al_audio.php", {
                        act: "audio_status",
                        full_id: t.fullId,
                        hash: vk.statusExportHash,
                        top: intval(a && (a.top_audio || a.top))
                    }), 0), this.statusSent = t.id + "," + vkNow()
                }
            }
        }, AudioPlayer.prototype.saveStateCurrentPlaylist = function() {
            if (!vk.widget) {
                var t = this.getCurrentPlaylist();
                if (t) {
                    var e = t.serialize();
                    this._lsSet(AudioPlayer.LS_PL, e)
                } else this._lsSet(AudioPlayer.LS_PL, null);
                this._lsSet(AudioPlayer.LS_SAVED, vkNow())
            }
        }, AudioPlayer.prototype._saveStateCurrentAudio = function() {
            if (!vk.widget) {
                var t = this.getCurrentAudio();
                if (t) {
                    var e = clone(t);
                    e[r.a.AUDIO_ITEM_INDEX_URL] = "", this._lsSet(AudioPlayer.LS_TRACK, e), setCookie("remixcurr_audio", t[r.a.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[r.a.AUDIO_ITEM_INDEX_ID], 1)
                } else this._lsSet(AudioPlayer.LS_TRACK, null), setCookie("remixcurr_audio", null, 1)
            }
        }, AudioPlayer.prototype.seekCurrentAudio = function(t) {
            if (this._adsIsAdPlaying()) return !1;
            var e = 10 / r.a.asObject(this.getCurrentAudio()).duration,
                i = this.getCurrentProgress() + (t ? e : -e);
            i = Math.max(0, Math.min(1, i)), this.seek(i)
        }, AudioPlayer.prototype._lsGet = function(t) {
            return ls.get(AudioPlayer.LS_PREFIX + t)
        }, AudioPlayer.prototype._lsSet = function(t, e) {
            ls.set(AudioPlayer.LS_PREFIX + t, e)
        }, AudioPlayer.prototype.setVolume = function(t) {
            t = Math.min(1, Math.max(0, t)), this._userVolume = t, this._implSetVolume(t), this._adsUpdateVolume(), this.notify(AudioPlayer.EVENT_VOLUME, t)
        }, AudioPlayer.prototype.getVolume = function() {
            return void 0 === this._userVolume ? .8 : this._userVolume
        }, AudioPlayer.prototype.seek = function(t) {
            this._implSeekImmediate(t), this.notify(AudioPlayer.EVENT_SEEK)
        }, AudioPlayer.prototype.seekToTime = function(t, e) {
            var i = this.getCurrentAudio();
            if (!i) return 0;
            var n = t / i[r.a.AUDIO_ITEM_INDEX_DURATION];
            if (n = Math.max(0, n), n = Math.min(n, 1), this.seek(n), r.a.isPodcast(i)) {
                var a = "",
                    o = r.a.asObject(i);
                e && (a = r.a.PodcastsLogs.ACTION_TIME_MARKER, this.podcastSetActionRef(o, r.a.PodcastsLogs.ACTION_SEEK, e)), this._podcastUpdateState(o, n, 0, a)
            }
            return n
        }, AudioPlayer.prototype._ensureHasURL = function(t, e) {
            var i = [];
            this._currentUrlEnsure = this._currentUrlEnsure || {};
            var n = r.a.asObject(t);
            if (n.url) return e && e(t);
            var a = this.getCurrentPlaylist(),
                o = a.indexOfAudio(t);
            if (o >= 0)
                for (var s = o; s < o + 5; s++) {
                    var d = r.a.asObject(a.getAudioAt(s));
                    !d || d.url || this._currentUrlEnsure[d.fullId] || (i.push(d.fullId + "_" + d.actionHash + "_" + d.urlHash), this._currentUrlEnsure[d.fullId] = !0)
                }
            if (i.push(n.fullId), i.length) {
                var u = this;
                ajax.post("al_audio.php", {
                    act: "reload_audio",
                    ids: i.join(",")
                }, {
                    onDone: function(i, a, o, s) {
                        getAudioPlayer().setStatusExportInfo(a), u._listenedHash = o, s && getAudioPlayer()._podcastSaveData(s), each(i, function(e, i) {
                            i = r.a.asObject(i);
                            var a = {};
                            a[r.a.AUDIO_ITEM_INDEX_URL] = i.url, a[r.a.AUDIO_ITEM_INDEX_ADS] = i.ads, n.fullId == i.fullId && (a[r.a.AUDIO_ITEM_INDEX_FLAGS] = i.flags, a[r.a.AUDIO_ITEM_INDEX_EXTRA] = i.extra), u.updateAudio(i.fullId, a), n.fullId == i.fullId && (t[r.a.AUDIO_ITEM_INDEX_URL] = i.url, t[r.a.AUDIO_ITEM_INDEX_ADS] = i.ads, t[r.a.AUDIO_ITEM_INDEX_FLAGS] = i.flags, t[r.a.AUDIO_ITEM_INDEX_EXTRA] = i.extra), u._currentAudio && r.a.asObject(u._currentAudio).fullId == i.fullId && (u._currentAudio[r.a.AUDIO_ITEM_INDEX_URL] = i.url, u._currentAudio[r.a.AUDIO_ITEM_INDEX_ADS] = i.ads, u._currentAudio[r.a.AUDIO_ITEM_INDEX_FLAGS] = i.flags, u._currentAudio[r.a.AUDIO_ITEM_INDEX_EXTRA] = i.extra), delete u._currentUrlEnsure[i.fullId]
                        }), e && e(t)
                    }
                })
            }
        }, AudioPlayer.prototype.toggleAudio = function(t, e) {
            if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
            if (domClosest("_audio_row__tt", e.target)) return cancelEvent(e);
            var i = domClosest("_audio_row", t),
                n = r.a.getAudioFromEl(i, !0);
            if (window.getSelection && window.getSelection().rangeCount) {
                var a = window.getSelection().getRangeAt(0);
                if (a) {
                    var o = a.commonAncestorContainer;
                    if (o && domClosest("_audio_row", o) === i && a.startOffset !== a.endOffset) return !1
                }
            }
            if (e && hasClass(e.target, "mem_link")) return nav.go(attr(e.target, "href"), e, {
                navigateToUploader: !0
            }), cancelEvent(e);
            if (hasClass(e.target, "_audio_row__title_inner")) {
                if (r.a.isPodcast(n)) return showPodcast(i, n.fullId), cancelEvent(e);
                if (n.lyrics && !n.isInAttach) return r.a.toggleAudioLyrics(i, n), cancelEvent(e)
            }
            if (hasClass(e.target.parentNode, "audio_row__performers")) {
                if (checkEvent(e) || vk.widget) return !0;
                if (!gpeByClass("_ape_audio_item", e.target)) {
                    var s = domData(e.target, "performer");
                    if (s) return r.a.audioSearchPerformer(e.target, s, e), cancelEvent(e)
                }
                return !0
            }
            var d = cur.cancelClick || e && (hasClass(e.target, "audio_lyrics") || domClosest("_audio_duration_wrap", e.target) || domClosest("_audio_inline_player", e.target) || domClosest("audio_performer", e.target)),
                u = hasClass(e.target, "slider") || domClosest("slider", e.target),
                f = cur._sliderMouseUpNowEl && cur._sliderMouseUpNowEl === geByClass1("audio_inline_player_progress", i);
            if (u && f && (d = !0), delete cur.cancelClick, delete cur._sliderMouseUpNowEl, d) return !0;
            if (r.a.isClaimedAudio(n) || n.isReplaceable) {
                var c = r.a.getAudioExtra(n).claim;
                if (c) return void(hasClass(i, "no_actions") || n.isInEditBox || showAudioClaimWarning(n, c, r.a.replaceWithOriginal.bind(r.a, i, n)))
            }
            if (this.podcastSetActionRef(n, n.isPlaying ? r.a.PodcastsLogs.ACTION_PAUSE : r.a.PodcastsLogs.ACTION_PLAY, "", i), n.isPlaying) this.pause();
            else {
                var l = r.a.getContextPlaylist(i);
                this.play(n.fullId, l.playlist, n.context || l.context), cur.audioPage && cur.audioPage.onUserAction(n, l.playlist)
            }
            r.a.onRowOver(i, !1, !0)
        }, AudioPlayer.prototype._onFailedUrl = function(t) {
            this.notify(AudioPlayer.EVENT_FAILED), this.isPlaying() && (this.pause(), this.playNext(!0, !0))
        }, AudioPlayer.prototype._startAdsPlay = function(t, e, i, n) {
            function a() {
                var i = this._getPlayingContextSection(),
                    a = this._adsIsAllowed(t, e),
                    o = a.type,
                    s = a.reason,
                    d = function() {
                        return n && n()
                    };
                switch (t = r.a.asObject(t), o) {
                    case AudioPlayer.ADS_ALLOW_ALLOWED:
                        this._adsFetchAd(t, i, !1, d);
                        break;
                    case AudioPlayer.ADS_ALLOW_DISABLED:
                        d();
                        break;
                    case AudioPlayer.ADS_ALLOW_REJECT:
                        this._adsFetchAd(t, i, !0, !1, s), d()
                }
            }
            this._startAdsTO && function(t) {
                if (!t) return !1;
                isNumeric(t) ? clearTimeout(t) : t.terminate()
            }(this._startAdsTO), i ? this._startAdsTO = s(a.bind(this), 200) : a.call(this)
        }, AudioPlayer.prototype.playNextPlaylist = function(t, e, i) {
            var r = this,
                n = this.getPlaylist(a.a.TYPE_PLAYLIST, t, e, i);
            n.loadAll(function() {
                var t = r.getCurrentPlaylist();
                if (t) t.addAudio(n.getAudiosList());
                else {
                    r._currentPlaylist = new a.a(n);
                    var e = n.getAudioAt(0);
                    e && (r._currentAudio = e, r.notify(AudioPlayer.EVENT_UPDATE), r.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED), r.updateCurrentPlaying())
                }
            }), boxQueue && boxQueue.hideAll(), layers && layers.fullhide && layers.fullhide()
        }, AudioPlayer.prototype.playPlaylist = function(t, e, i, r, n) {
            if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
            this.playNextInPlaylist(t, e, i, r, {
                shuffled: n,
                preDoPlay: function(t) {
                    n && (t.isShuffled() && t.shuffle(0), t.shuffle(irand(1, 999999), !0))
                }
            })
        }, AudioPlayer.prototype.playBlock = function(t, e, i, r, n) {
            var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "default";
            this.playNextInPlaylist(t, e, i, r, {
                type: n,
                trackType: a,
                shuffled: !1
            })
        }, AudioPlayer.prototype.playNextInPlaylist = function(t, e, i, r) {
            var n = this,
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                s = this.getCurrentPlaylist(),
                d = this.getPlaylist(o.type || a.a.TYPE_PLAYLIST, t, e, i);
            if (s && s.getId() === d.getId() && this.isPlaying() && !o.shuffled) this.pause();
            else {
                var u = function() {
                    o.preDoPlay && o.preDoPlay(d);
                    var t = d.getNextAudio(!1, !0);
                    t && n.play(t, d, r)
                };
                d.load(0, u, null, o.trackType), d.getAudiosCount() && !o.shuffled ? u() : this._impl.preparePlay && !this.isAdPlaying() && this._impl.preparePlay()
            }
        }, AudioPlayer.prototype._initPlayingContext = function(t) {
            this._playingContext = t
        }, AudioPlayer.prototype.getListenedHash = function() {
            return this._listenedHash || ""
        }, AudioPlayer.prototype._getPlayingContext = function() {
            return this._playingContext || ""
        }, AudioPlayer.prototype._getPlayingContextSection = function() {
            return this._getPlayingContext().split(":")[0]
        }, AudioPlayer.prototype.play = function(t, e, i, n, o) {
            if (!cur.loggingOff)
                if (this._impl) {
                    this._seq = n, this._autoNext = o, this._prevAudio = this._currentAudio, this._cleanUpPlaylists(), (isObject(t) || isArray(t)) && (t = r.a.asObject(t)) && (t = t.fullId);
                    var s = r.a.asObject(this._currentAudio),
                        d = this.getCurrentPlaylist();
                    !t && s && (t = s.fullId);
                    var u = !1,
                        f = t && s && t == s.fullId;
                    e ? d && (u = e == d.getSelf() || e == d) : (e = d, u = !0), u || i || debugLog("New playlist play init without context"), i && (this._prevContext = this._playingContext, this._initPlayingContext(i));
                    var c = e.getAudio(t);
                    c && e.load(e.indexOfAudio(c) + 3), f || (this._trackListenedDataSwitch(s, i, e), this._sendListenedData(), e.getType() == a.a.TYPE_SEARCH && e.indexOfAudio(c) >= e.getLocalFoundCount() && e.sendSearchStats("search_play"), s && r.a.isPodcast(s) && this.isPlaying() && this._podcastUpdateState(s, this.getCurrentProgress(), this._impl.getPlayedTime(), r.a.PodcastsLogs.ACTION_PAUSE, {
                        needResetListen: !0
                    })), f || this._adsIsAdPlaying() || this._adsDeinit(), f && u ? this._adsIsAdPlaying() ? this._adsResumeAd() : this.isPlaying() || (this._isPlaying = !0, this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY), f || this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._implClearAllTasks(), this._implSetVolume(0), this._implSetUrl(c), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume(), !0), r.a.isPodcast(c) && this._podcastUpdateState(r.a.asObject(c), this.getCurrentProgress(), this._impl.getPlayedTime())) : t && c && (this._currentAudio = c, u || (this._currentPlaylist && (this._prevPlaylist = this._currentPlaylist, this._prevAudio = this._currentAudio), this._currentPlaylist = new a.a(e), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED)), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this._isPlaying = !0, this.updateCurrentPlaying(!0), this._adsIsAdPlaying() ? (this.notify(AudioPlayer.EVENT_PLAY, !0), this._adsResumeAd()) : (this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY, !0, intval(n), o), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._muteProgressEvents = !0, this._implClearAllTasks(), this._impl.preparePlay && this._impl.preparePlay(), o ? this._startAdsPlay(c, e, !1, function() {
                        (c = this.getCurrentAudio()) && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(c), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                    }.bind(this)) : (this._implSetVolume(0, !0), this._implPause(), this._startAdsPlay(c, e, !0, function() {
                        (c = this.getCurrentAudio()) && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(c), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                    }.bind(this)))))
                } else r.a.showNeedFlashBox()
        }, AudioPlayer.prototype.preloadDefaultPlaylist = function(t) {
            browser.safari && !this._lsGet(AudioPlayer.LS_TRACK) && this.getPlaylist(a.a.TYPE_PLAYLIST, vk.id, a.a.DEFAULT_PLAYLIST_ID, t).load()
        }, AudioPlayer.prototype.instantPlay = function(t, e, i) {
            var r = !browser.safari && e && e.shiftKey;
            this.playPlaylist(vk.id, a.a.DEFAULT_PLAYLIST_ID, i, "header", r), statlogsValueEvent("client_header_play_button", r ? "shuffle" : "play"), setTimeout(function() {
                addClass(t, "loading")
            }, 400)
        }, AudioPlayer.prototype._prefetchAudio = function(t) {
            (t = r.a.asObject(t)) && t.url && this._impl.prefetch && this._impl.prefetch(t.url)
        }, AudioPlayer.prototype.getCurrentPlaylist = function() {
            return this._currentPlaylist
        }, AudioPlayer.prototype.getPlaylists = function() {
            return clone(this._playlists)
        }, AudioPlayer.prototype.pause = function() {
            this._adsIsAdPlaying() && this._adsPauseAd(), this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this._implSetVolume(0, !0), this._implPause()
        }, AudioPlayer.prototype.stop = function() {
            this._isPlaying = !1, this._impl.stop(), this.notify(AudioPlayer.EVENT_STOP)
        }, AudioPlayer.prototype.isPlaying = function() {
            return this._isPlaying
        }, AudioPlayer.prototype.getCurrentAudio = function() {
            return this._currentAudio
        }, AudioPlayer.prototype.playNext = function(t, e) {
            this._playNext(1, t)
        }, AudioPlayer.prototype.playPrev = function() {
            this._playNext(-1)
        }, AudioPlayer.prototype._playNext = function(t, e) {
            var i = this;
            if (!this._adsIsAdPlaying()) {
                var n = 10,
                    a = this.getCurrentAudio(),
                    o = this.getCurrentPlaylist(),
                    s = function(t, n) {
                        r.a.isClaimedAudio(t) || i.play(t, o, !1, n, e)
                    };
                if (a && o)
                    if (t > 0) {
                        for (var d = o.getNextAudio(a); n && d && r.a.isClaimedAudio(d);) d = o.getNextAudio(d), n--;
                        if (d) s(d, 1);
                        else if (o.isLive()) this._muteProgressEvents = !0, o.fetchNextLiveAudio(function(t) {
                            return s(t, 1)
                        });
                        else {
                            if (d = o.getAudioAt(0), r.a.isClaimedAudio(d))
                                for (var u = o.getAudiosList(), f = o.getAudiosCount(), c = 0; c < f; c++) {
                                    var l = u[c];
                                    if (!r.a.isClaimedAudio(l)) {
                                        d = l;
                                        break
                                    }
                                }
                            if (!this.isRepeatAll())
                                if (o.indexOfAudio(a) + 1 === o.getAudiosCount()) return void(r.a.isClaimedAudio(d) ? this._implSeekImmediate(0) : (this._currentAudio = d, this._implSeekImmediate(0), this.updateCurrentPlaying(!0), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this.notify(AudioPlayer.EVENT_UPDATE)));
                            s(d, 1)
                        }
                    } else {
                        var h = o.indexOfAudio(this._currentAudio) - 1;
                        if (h < 0) this.seek(0);
                        else {
                            for (var p = o.getAudioAt(h); n && p && r.a.isClaimedAudio(p);) p = o.getAudioAt(--h), n--;
                            p ? s(p, -1) : this.seek(0)
                        }
                    }
            }
        }, AudioPlayer.prototype._adsPlayAd = function(t, e, i) {
            this._adman.onCompleted(function() {
                this._adsDeinit(!0), t ? this._adsSendAdEvent("statistics", e) : (this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_COMPLETED), delete this._adsPlaying, delete this._adsCurrentProgress, this._adsSendAdEvent("completed", e), setDocumentTitle(this._adsPrevTitle), i && i())
            }.bind(this)), this._adman.onStarted(function() {
                t || (this._isPlaying = !0, this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_STARTED), this._adsUpdateVolume(), this._adsSendAdEvent("started", e))
            }.bind(this));
            var r = [.25, .5, .75];
            if (this._adman.onTimeRemained(function(t) {
                    this._adsCurrentProgress = t.percent / 100, this.notify(AudioPlayer.EVENT_PROGRESS, t.percent / 100, t.duration), each(r, function(t, i) {
                        if (this._adsCurrentProgress >= i) return r.shift(), this._adsSendAdEvent("progress_" + intval(100 * i), e), !1
                    }.bind(this))
                }.bind(this)), this._adman.start(AudioPlayer.AD_TYPE), t) return i && i();
            this._adsPlaying = !0, this.notify(AudioPlayer.EVENT_PLAY), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._adsPrevTitle = document.title, setDocumentTitle(getLang("global_audio_ad"))
        }, AudioPlayer.prototype._adsUpdateVolume = function() {
            this._adman && this._adman.setVolume(.7 * this.getVolume())
        }, AudioPlayer.prototype._adsSendAdEvent = function(t, e, i, r) {
            var n = i ? "/" + i : "",
                a = r ? "/" + r : "";
            this._adEvents = this._adEvents || [], this._adEvents.push(t + "/" + e + n + a), clearTimeout(this._adEventDelay), this._adEventDelay = setTimeout(function() {
                ajax.post("al_audio.php", {
                    act: "ad_event",
                    events: this._adEvents.join(","),
                    v: this.getVersion(),
                    abp: intval(window.abp)
                }), this._adEvents = []
            }.bind(this), 500)
        }, AudioPlayer.prototype.adsGetCurrentProgress = function() {
            return this._adsCurrentProgress || 0
        }, AudioPlayer.prototype._adsPauseAd = function() {
            this._adman && (this._isPlaying = !1, this._adman.pause(), this.notify(AudioPlayer.EVENT_PAUSE))
        }, AudioPlayer.prototype._adsResumeAd = function() {
            this._adman && (this._isPlaying = !0, this._adman.resume(), this.notify(AudioPlayer.EVENT_PLAY))
        }, AudioPlayer.prototype._adsIsAdPlaying = function() {
            return this._adsPlaying
        }, AudioPlayer.prototype.isAdPlaying = function() {
            return this._adsIsAdPlaying()
        }, AudioPlayer.prototype._adsDeinit = function(t) {
            this._adman = null, !t && this.notify(AudioPlayer.EVENT_AD_DEINITED)
        }, AudioPlayer.ADS_ALLOW_DISABLED = 1, AudioPlayer.ADS_ALLOW_ALLOWED = 2, AudioPlayer.ADS_ALLOW_REJECT = 3, AudioPlayer.REJECT_REASON_UNKNOWN = "unknown", AudioPlayer.REJECT_REASON_LIMIT = "track_limit_exceeded", AudioPlayer.REJECT_REASON_SECTION = "section_not_allowed", AudioPlayer.prototype._adsIsAllowed = function(t, e) {
            if (vk.widget) return {
                type: AudioPlayer.ADS_ALLOW_DISABLED
            };
            if (r.a.isPodcast(t)) return {
                type: AudioPlayer.ADS_ALLOW_DISABLED
            };
            if (cur.adsPreview) return {
                type: AudioPlayer.ADS_ALLOW_ALLOWED
            };
            if (window.browser && window.browser.safari) return {
                type: AudioPlayer.ADS_ALLOW_DISABLED
            };
            var i = this._adsConfig || vk.audioAdsConfig;
            return i ? i.enabled ? i.day_limit_reached ? {
                type: AudioPlayer.ADS_ALLOW_REJECT,
                reason: AudioPlayer.REJECT_REASON_LIMIT
            } : inArray(this._getPlayingContextSection(), i.sections) ? {
                type: AudioPlayer.ADS_ALLOW_ALLOWED
            } : {
                type: AudioPlayer.ADS_ALLOW_REJECT,
                reason: AudioPlayer.REJECT_REASON_SECTION
            } : {
                type: AudioPlayer.ADS_ALLOW_DISABLED
            } : {
                type: AudioPlayer.ADS_ALLOW_REJECT,
                reason: AudioPlayer.REJECT_REASON_UNKNOWN
            }
        }, AudioPlayer.prototype._adsFetchAd = function(t, e, i, r, n) {
            this._loadAdman(function(a) {
                if (!window.AdmanHTML) return this._adsSendAdEvent("no_adman", e, AudioPlayer.AD_TYPE, a), r && r();
                var o = {
                    my: 101,
                    my_playlists: 101,
                    audio_feed: 109,
                    recent: 113,
                    user_wall: 104,
                    group_wall: 104,
                    user_list: 102,
                    group_list: 103,
                    user_playlists: 102,
                    group_playlists: 103,
                    feed: 105,
                    search: 110,
                    global_search: 110,
                    replies: 104,
                    im: 106,
                    group_status: 104,
                    user_status: 104,
                    recs: 107,
                    recs_audio: 107,
                    recs_album: 107,
                    other: 114
                };
                this._adman = new AdmanHTML;
                var s = {
                    _SITEID: 276,
                    ver: 251116,
                    vk_id: vk.id,
                    duration: t.duration,
                    content_id: function(t, e) {
                        for (var i = (t >>> 0).toString(16), r = e.toString(16); r.length < 8;) r = "0" + r;
                        return i + r
                    }(t.ownerId, t.id),
                    vk_catid: o[e] || o.other
                };
                extend(s, t.ads || {}), nav.objLoc.preview && (s.preview = intval(nav.objLoc.preview)), cur.adsPreview && (s.preview = 1), this._adman.setDebug(!!s.preview), this._adman.onError(function() {
                    r && r()
                }), this._adman.onReady(function() {
                    if (this._adman) {
                        var t = this._adman.getBannersForSection(AudioPlayer.AD_TYPE);
                        t && t.length ? "statistics" == t[0].type ? (this._adsPlayAd(!0, e), r && r()) : (this._adsSendAdEvent("received", e), i ? (this._adsSendAdEvent("rejected", e, AudioPlayer.AD_TYPE, n), this._adsDeinit(), r && r()) : (this._adsSendAdEvent("ready", e), this.notify(AudioPlayer.EVENT_AD_READY), this._adsPlayAd(!1, e, r))) : (i || this._adsSendAdEvent("not_received", e), r && r())
                    }
                }.bind(this)), this._adman.init({
                    slot: 3514,
                    wrapper: se("<div></div>"),
                    params: s,
                    browser: {
                        adBlock: !!window.abp,
                        mobile: !1
                    }
                }), this._adsSendAdEvent("requested", e)
            }.bind(this))
        }, AudioPlayer.prototype._loadAdman = function(t) {
            var e = this,
                i = function(e) {
                    return t && t(e)
                };
            if (this._admanLoaded) return i();
            loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
                onLoad: function() {
                    e._admanLoaded = !0, i()
                },
                onError: function() {
                    window.abp ? (e._admanLoaded = !0, i()) : (e._admanRetry = e._admanRetry ? e._admanRetry + 1 : 1, e._admanRetry >= 3 && (e._admanLoaded = !0), i("script_load_fail"))
                }
            })
        }, AudioPlayer.prototype._podcastUpdateState = function(t, e, i, r, n) {
            var a = this._podcastGetStates(),
                o = Math.round(t.duration * e);
            a[t.fullId] = {
                t: vkNow(),
                position: o
            }, this._podcastSetStates(a), r && this._podcastSendLogs(r, t, i, o, n)
        }, AudioPlayer.prototype._podcastSendLogs = function(t, e, i, n, a) {
            if (e && t && r.a.isPodcast(e) && (!cur._podcastsActionId || !cur._podcastsActionId[t] || this._podcastsActionLastId[t] !== cur._podcastsActionId[t])) {
                var o = this._podcastsActionRef[e.fullId] || {},
                    s = o[t] || {};
                r.a.PodcastsLogs.log(t, extend({
                    audio: e,
                    position: n,
                    listen: i
                }, s, a || {})), delete o[t], this._podcastsActionLastId[t] = cur._podcastsActionId ? cur._podcastsActionId[t] : null
            }
        }, AudioPlayer.prototype.podcastSetActionRef = function(t, e, i, n) {
            t = r.a.asObject(t), e && r.a.isPodcast(t) && (this._podcastsActionRef[t.fullId] = this._podcastsActionRef[t.fullId] || {}, this._podcastsActionRef[t.fullId][e] = {
                ref: i,
                refEl: n
            }, cur._podcastsActionId = cur._podcastsActionId || {}, cur._podcastsActionId[e] = irand(0, 1e6))
        }, AudioPlayer.prototype._podcastCleanStates = function() {
            var t = this._podcastGetStates(),
                e = !1;
            return each(t, function(i, r) {
                Date.now() - r.t > 2419200 && (delete t[i], e = !0)
            }), e && this._podcastSetStates(t), t
        }, AudioPlayer.prototype._podcastSaveData = function(t) {
            var e = this._podcastGetStates();
            each(t, function(t, i) {
                var r = i.state;
                if (r) {
                    var n = +r[1];
                    (!e[t] || !e[t][1] || n && n > e[t][1]) && (e[t] = {
                        position: +r[0],
                        t: Date.now()
                    })
                }
            }), this._podcastSetStates(e)
        }, AudioPlayer.prototype._podcastRestoreState = function() {
            var t = r.a.asObject(this.getCurrentAudio());
            if (!r.a.isPodcast(t)) return 0;
            var e = 0;
            cur.podcastSeekToTime ? (e = this.seekToTime(cur.podcastSeekToTime, cur.podcastSeekToTimeRef), delete cur.podcastSeekToTime, delete cur.podcastSeekToTimeRef) : (e = ((this._podcastGetStates()[t.fullId] || {}).position || 0) / t.duration) && e < 1 && this._implSeek(e);
            return e && e < 1 ? (this.updateCurrentPlaying(), e) : 0
        }, AudioPlayer.prototype.getCurrentFaveStatus = function() {
            return !!r.a.isPodcast(this._currentAudio) && r.a.getAudioExtra(this._currentAudio).fave
        }, AudioPlayer.prototype._podcastGetStates = function() {
            return (this._lsGet(AudioPlayer.LS_PODCASTS) || {}).states || {}
        }, AudioPlayer.prototype._podcastSetStates = function(t) {
            var e = this._lsGet(AudioPlayer.LS_PODCASTS) || {};
            e.states = t, this._lsSet(AudioPlayer.LS_PODCASTS, e)
        }, AudioPlayer.prototype.podcastToggleFave = function(t, e) {
            if (e) {
                e = r.a.asObject(e);
                var i = r.a.getAudioExtra(e).faveHash;
                i && bookmarkPodcast(t, e.fullId, i)
            }
        }, AudioPlayer.prototype._updatePlaybackRate = function() {
            var t = this;
            this._implNewTask("playback_rate", function(e) {
                var i = !t._adsIsAdPlaying() && r.a.isPodcast(t._currentAudio) ? t.podcastGetPlaybackRate() : 1;
                t._impl.setPlaybackRate(i), e()
            })
        }, AudioPlayer.prototype.podcastGetPlaybackRate = function() {
            return (this._lsGet(AudioPlayer.LS_PODCASTS) || {}).rate || 1
        }, AudioPlayer.prototype.podcastChangePlaybackRate = function(t) {
            var e = this._lsGet(AudioPlayer.LS_PODCASTS) || {},
                i = e.rate || 1;
            t ? i -= AudioPlayer.PLAYBACK_RATE_STEP : i += AudioPlayer.PLAYBACK_RATE_STEP, !t && i > AudioPlayer.PLAYBACK_RATE_MAX ? i = 1 : t && i < 1 && (i = AudioPlayer.PLAYBACK_RATE_MAX), e.rate = i, this._lsSet(AudioPlayer.LS_PODCASTS, e), this._updatePlaybackRate()
        }, AudioPlayer.prototype.playAudio = function(t) {
            var e = new a.a(a.a.TYPE_TEMP);
            e.mergeWith({
                list: [t]
            }), this.play(t, e)
        };
        try {
            stManager.done("audioplayer.js")
        } catch (t) {}
    },
    dcwN: function(t, e, i) {
        "use strict";
        (function(t, r) {
            function n() {
                throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
            }
            var a = i("hwdV"),
                o = i("Edxu"),
                s = a.Buffer,
                d = a.kMaxLength,
                u = t.crypto || t.msCrypto,
                f = Math.pow(2, 32) - 1;

            function c(t, e) {
                if ("number" != typeof t || t != t) throw new TypeError("offset must be a number");
                if (t > f || t < 0) throw new TypeError("offset must be a uint32");
                if (t > d || t > e) throw new RangeError("offset out of range")
            }

            function l(t, e, i) {
                if ("number" != typeof t || t != t) throw new TypeError("size must be a number");
                if (t > f || t < 0) throw new TypeError("size must be a uint32");
                if (t + e > i || t > d) throw new RangeError("buffer too small")
            }

            function h(t, e, i, n) {
                if (r.browser) {
                    var a = t.buffer,
                        s = new Uint8Array(a, e, i);
                    return u.getRandomValues(s), n ? void r.nextTick(function() {
                        n(null, t)
                    }) : t
                }
                if (!n) return o(i).copy(t, e), t;
                o(i, function(i, r) {
                    if (i) return n(i);
                    r.copy(t, e), n(null, t)
                })
            }
            u && u.getRandomValues || !r.browser ? (e.randomFill = function(e, i, r, n) {
                if (!(s.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
                if ("function" == typeof i) n = i, i = 0, r = e.length;
                else if ("function" == typeof r) n = r, r = e.length - i;
                else if ("function" != typeof n) throw new TypeError('"cb" argument must be a function');
                return c(i, e.length), l(r, i, e.length), h(e, i, r, n)
            }, e.randomFillSync = function(e, i, r) {
                void 0 === i && (i = 0);
                if (!(s.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
                c(i, e.length), void 0 === r && (r = e.length - i);
                return l(r, i, e.length), h(e, i, r)
            }) : (e.randomFill = n, e.randomFillSync = n)
        }).call(this, i("yLpj"), i("8oxB"))
    },
    dlgc: function(t, e, i) {
        "use strict";
        var r = e;

        function n(t) {
            return 1 === t.length ? "0" + t : t
        }

        function a(t) {
            for (var e = "", i = 0; i < t.length; i++) e += n(t[i].toString(16));
            return e
        }
        r.toArray = function(t, e) {
            if (Array.isArray(t)) return t.slice();
            if (!t) return [];
            var i = [];
            if ("string" != typeof t) {
                for (var r = 0; r < t.length; r++) i[r] = 0 | t[r];
                return i
            }
            if ("hex" === e)
                for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), r = 0; r < t.length; r += 2) i.push(parseInt(t[r] + t[r + 1], 16));
            else
                for (r = 0; r < t.length; r++) {
                    var n = t.charCodeAt(r),
                        a = n >> 8,
                        o = 255 & n;
                    a ? i.push(a, o) : i.push(o)
                }
            return i
        }, r.zero2 = n, r.toHex = a, r.encode = function(t, e) {
            return "hex" === e ? a(t) : t
        }
    },
    "eA/Y": function(t, e, i) {
        "use strict";
        t.exports = a;
        var r = i("J78i"),
            n = i("Onz0");

        function a(t) {
            if (!(this instanceof a)) return new a(t);
            r.call(this, t)
        }
        n.inherits = i("P7XM"), n.inherits(a, r), a.prototype._transform = function(t, e, i) {
            i(null, t)
        }
    },
    ehAg: function(t, e, i) {
        var r = i("OZ/i"),
            n = i("/ayr");

        function a(t) {
            this.rand = t || new n.Rand
        }
        t.exports = a, a.create = function(t) {
            return new a(t)
        }, a.prototype._randbelow = function(t) {
            var e = t.bitLength(),
                i = Math.ceil(e / 8);
            do {
                var n = new r(this.rand.generate(i))
            } while (n.cmp(t) >= 0);
            return n
        }, a.prototype._randrange = function(t, e) {
            var i = e.sub(t);
            return t.add(this._randbelow(i))
        }, a.prototype.test = function(t, e, i) {
            var n = t.bitLength(),
                a = r.mont(t),
                o = new r(1).toRed(a);
            e || (e = Math.max(1, n / 48 | 0));
            for (var s = t.subn(1), d = 0; !s.testn(d); d++);
            for (var u = t.shrn(d), f = s.toRed(a); e > 0; e--) {
                var c = this._randrange(new r(2), s);
                i && i(c);
                var l = c.toRed(a).redPow(u);
                if (0 !== l.cmp(o) && 0 !== l.cmp(f)) {
                    for (var h = 1; h < d; h++) {
                        if (0 === (l = l.redSqr()).cmp(o)) return !1;
                        if (0 === l.cmp(f)) break
                    }
                    if (h === d) return !1
                }
            }
            return !0
        }, a.prototype.getDivisor = function(t, e) {
            var i = t.bitLength(),
                n = r.mont(t),
                a = new r(1).toRed(n);
            e || (e = Math.max(1, i / 48 | 0));
            for (var o = t.subn(1), s = 0; !o.testn(s); s++);
            for (var d = t.shrn(s), u = o.toRed(n); e > 0; e--) {
                var f = this._randrange(new r(2), o),
                    c = t.gcd(f);
                if (0 !== c.cmpn(1)) return c;
                var l = f.toRed(n).redPow(d);
                if (0 !== l.cmp(a) && 0 !== l.cmp(u)) {
                    for (var h = 1; h < s; h++) {
                        if (0 === (l = l.redSqr()).cmp(a)) return l.fromRed().subn(1).gcd(t);
                        if (0 === l.cmp(u)) break
                    }
                    if (h === s) return (l = l.redSqr()).fromRed().subn(1).gcd(t)
                }
            }
            return !1
        }
    },
    f3pb: function(t, e, i) {
        var r = e;
        r.bignum = i("OZ/i"), r.define = i("7zrB").define, r.base = i("Qd/k"), r.constants = i("AhHn"), r.decoders = i("IPZY"), r.encoders = i("ND7S")
    },
    fSpj: function(t, e, i) {
        (function(e) {
            var i = Math.pow(2, 30) - 1;

            function r(t, i) {
                if ("string" != typeof t && !e.isBuffer(t)) throw new TypeError(i + " must be a buffer or string")
            }
            t.exports = function(t, e, n, a) {
                if (r(t, "Password"), r(e, "Salt"), "number" != typeof n) throw new TypeError("Iterations not a number");
                if (n < 0) throw new TypeError("Bad iterations");
                if ("number" != typeof a) throw new TypeError("Key length not a number");
                if (a < 0 || a > i || a != a) throw new TypeError("Bad key length")
            }
        }).call(this, i("tjlA").Buffer)
    },
    fZJM: function(t, e, i) {
        var r = e;
        r.utils = i("w8CP"), r.common = i("7ckf"), r.sha = i("WRkp"), r.ripemd = i("u0Sq"), r.hmac = i("ITfd"), r.sha1 = r.sha.sha1, r.sha256 = r.sha.sha256, r.sha224 = r.sha.sha224, r.sha384 = r.sha.sha384, r.sha512 = r.sha.sha512, r.ripemd160 = r.ripemd.ripemd160
    },
    fnjI: function(t, e, i) {
        var r = i("P7XM"),
            n = i("tnIz"),
            a = i("hwdV").Buffer,
            o = [1518500249, 1859775393, -1894007588, -899497514],
            s = new Array(80);

        function d() {
            this.init(), this._w = s, n.call(this, 64, 56)
        }

        function u(t) {
            return t << 5 | t >>> 27
        }

        function f(t) {
            return t << 30 | t >>> 2
        }

        function c(t, e, i, r) {
            return 0 === t ? e & i | ~e & r : 2 === t ? e & i | e & r | i & r : e ^ i ^ r
        }
        r(d, n), d.prototype.init = function() {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
        }, d.prototype._update = function(t) {
            for (var e, i = this._w, r = 0 | this._a, n = 0 | this._b, a = 0 | this._c, s = 0 | this._d, d = 0 | this._e, l = 0; l < 16; ++l) i[l] = t.readInt32BE(4 * l);
            for (; l < 80; ++l) i[l] = (e = i[l - 3] ^ i[l - 8] ^ i[l - 14] ^ i[l - 16]) << 1 | e >>> 31;
            for (var h = 0; h < 80; ++h) {
                var p = ~~(h / 20),
                    _ = u(r) + c(p, n, a, s) + d + i[h] + o[p] | 0;
                d = s, s = a, a = f(n), n = r, r = _
            }
            this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = a + this._c | 0, this._d = s + this._d | 0, this._e = d + this._e | 0
        }, d.prototype._hash = function() {
            var t = a.allocUnsafe(20);
            return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
        }, t.exports = d
    },
    "fs/A": function(t, e, i) {
        (function(r) {
            var n;
            ! function(a) {
                "use strict";
                var o, s, d, u;
                a ? function() {
                    var t = a.crypto || a.msCrypto;
                    if (!o && t && t.getRandomValues) try {
                        var e = new Uint8Array(16);
                        u = o = function() {
                            return t.getRandomValues(e), e
                        }, o()
                    } catch (t) {}
                    if (!o) {
                        var i = new Array(16);
                        s = o = function() {
                            for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), i[e] = t >>> ((3 & e) << 3) & 255;
                            return i
                        }, "undefined" != typeof console && console.warn && console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()")
                    }
                }() : function() {
                    try {
                        var t = i("HEbw").randomBytes;
                        d = o = t && function() {
                            return t(16)
                        }, o()
                    } catch (t) {}
                }();
                for (var f = "function" == typeof r ? r : Array, c = [], l = {}, h = 0; h < 256; h++) c[h] = (h + 256).toString(16).substr(1), l[c[h]] = h;

                function p(t, e) {
                    var i = e || 0,
                        r = c;
                    return r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]]
                }
                var _ = o(),
                    y = [1 | _[0], _[1], _[2], _[3], _[4], _[5]],
                    b = 16383 & (_[6] << 8 | _[7]),
                    g = 0,
                    v = 0;

                function m(t, e, i) {
                    var r = e && i || 0;
                    "string" == typeof t && (e = "binary" === t ? new f(16) : null, t = null);
                    var n = (t = t || {}).random || (t.rng || o)();
                    if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, e)
                        for (var a = 0; a < 16; a++) e[r + a] = n[a];
                    return e || p(n)
                }
                var A = m;
                A.v1 = function(t, e, i) {
                    var r = e && i || 0,
                        n = e || [],
                        a = null != (t = t || {}).clockseq ? t.clockseq : b,
                        o = null != t.msecs ? t.msecs : (new Date).getTime(),
                        s = null != t.nsecs ? t.nsecs : v + 1,
                        d = o - g + (s - v) / 1e4;
                    if (d < 0 && null == t.clockseq && (a = a + 1 & 16383), (d < 0 || o > g) && null == t.nsecs && (s = 0), s >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                    g = o, v = s, b = a;
                    var u = (1e4 * (268435455 & (o += 122192928e5)) + s) % 4294967296;
                    n[r++] = u >>> 24 & 255, n[r++] = u >>> 16 & 255, n[r++] = u >>> 8 & 255, n[r++] = 255 & u;
                    var f = o / 4294967296 * 1e4 & 268435455;
                    n[r++] = f >>> 8 & 255, n[r++] = 255 & f, n[r++] = f >>> 24 & 15 | 16, n[r++] = f >>> 16 & 255, n[r++] = a >>> 8 | 128, n[r++] = 255 & a;
                    for (var c = t.node || y, l = 0; l < 6; l++) n[r + l] = c[l];
                    return e || p(n)
                }, A.v4 = m, A.parse = function(t, e, i) {
                    var r = e && i || 0,
                        n = 0;
                    for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function(t) {
                            n < 16 && (e[r + n++] = l[t])
                        }); n < 16;) e[r + n++] = 0;
                    return e
                }, A.unparse = p, A.BufferClass = f, A._rng = o, A._mathRNG = s, A._nodeRNG = d, A._whatwgRNG = u, void 0 !== t && t.exports ? t.exports = A : void 0 === (n = function() {
                    return A
                }.call(e, i, e, t)) || (t.exports = n)
            }("undefined" != typeof window ? window : null)
        }).call(this, i("tjlA").Buffer)
    },
    g2Dh: function(t, e, i) {
        var r = i("Qd/k").Reporter,
            n = i("Qd/k").EncoderBuffer,
            a = i("Qd/k").DecoderBuffer,
            o = i("2j6C"),
            s = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"],
            d = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"].concat(s);

        function u(t, e) {
            var i = {};
            this._baseState = i, i.enc = t, i.parent = e || null, i.children = null, i.tag = null, i.args = null, i.reverseArgs = null, i.choice = null, i.optional = !1, i.any = !1, i.obj = !1, i.use = null, i.useDecoder = null, i.key = null, i.default = null, i.explicit = null, i.implicit = null, i.contains = null, i.parent || (i.children = [], this._wrap())
        }
        t.exports = u;
        var f = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"];
        u.prototype.clone = function() {
            var t = this._baseState,
                e = {};
            f.forEach(function(i) {
                e[i] = t[i]
            });
            var i = new this.constructor(e.parent);
            return i._baseState = e, i
        }, u.prototype._wrap = function() {
            var t = this._baseState;
            d.forEach(function(e) {
                this[e] = function() {
                    var i = new this.constructor(this);
                    return t.children.push(i), i[e].apply(i, arguments)
                }
            }, this)
        }, u.prototype._init = function(t) {
            var e = this._baseState;
            o(null === e.parent), t.call(this), e.children = e.children.filter(function(t) {
                return t._baseState.parent === this
            }, this), o.equal(e.children.length, 1, "Root node can have only one child")
        }, u.prototype._useArgs = function(t) {
            var e = this._baseState,
                i = t.filter(function(t) {
                    return t instanceof this.constructor
                }, this);
            t = t.filter(function(t) {
                return !(t instanceof this.constructor)
            }, this), 0 !== i.length && (o(null === e.children), e.children = i, i.forEach(function(t) {
                t._baseState.parent = this
            }, this)), 0 !== t.length && (o(null === e.args), e.args = t, e.reverseArgs = t.map(function(t) {
                if ("object" != typeof t || t.constructor !== Object) return t;
                var e = {};
                return Object.keys(t).forEach(function(i) {
                    i == (0 | i) && (i |= 0);
                    var r = t[i];
                    e[r] = i
                }), e
            }))
        }, ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"].forEach(function(t) {
            u.prototype[t] = function() {
                var e = this._baseState;
                throw new Error(t + " not implemented for encoding: " + e.enc)
            }
        }), s.forEach(function(t) {
            u.prototype[t] = function() {
                var e = this._baseState,
                    i = Array.prototype.slice.call(arguments);
                return o(null === e.tag), e.tag = t, this._useArgs(i), this
            }
        }), u.prototype.use = function(t) {
            o(t);
            var e = this._baseState;
            return o(null === e.use), e.use = t, this
        }, u.prototype.optional = function() {
            return this._baseState.optional = !0, this
        }, u.prototype.def = function(t) {
            var e = this._baseState;
            return o(null === e.default), e.default = t, e.optional = !0, this
        }, u.prototype.explicit = function(t) {
            var e = this._baseState;
            return o(null === e.explicit && null === e.implicit), e.explicit = t, this
        }, u.prototype.implicit = function(t) {
            var e = this._baseState;
            return o(null === e.explicit && null === e.implicit), e.implicit = t, this
        }, u.prototype.obj = function() {
            var t = this._baseState,
                e = Array.prototype.slice.call(arguments);
            return t.obj = !0, 0 !== e.length && this._useArgs(e), this
        }, u.prototype.key = function(t) {
            var e = this._baseState;
            return o(null === e.key), e.key = t, this
        }, u.prototype.any = function() {
            return this._baseState.any = !0, this
        }, u.prototype.choice = function(t) {
            var e = this._baseState;
            return o(null === e.choice), e.choice = t, this._useArgs(Object.keys(t).map(function(e) {
                return t[e]
            })), this
        }, u.prototype.contains = function(t) {
            var e = this._baseState;
            return o(null === e.use), e.contains = t, this
        }, u.prototype._decode = function(t, e) {
            var i = this._baseState;
            if (null === i.parent) return t.wrapResult(i.children[0]._decode(t, e));
            var r, n = i.default,
                o = !0,
                s = null;
            if (null !== i.key && (s = t.enterKey(i.key)), i.optional) {
                var d = null;
                if (null !== i.explicit ? d = i.explicit : null !== i.implicit ? d = i.implicit : null !== i.tag && (d = i.tag), null !== d || i.any) {
                    if (o = this._peekTag(t, d, i.any), t.isError(o)) return o
                } else {
                    var u = t.save();
                    try {
                        null === i.choice ? this._decodeGeneric(i.tag, t, e) : this._decodeChoice(t, e), o = !0
                    } catch (t) {
                        o = !1
                    }
                    t.restore(u)
                }
            }
            if (i.obj && o && (r = t.enterObject()), o) {
                if (null !== i.explicit) {
                    var f = this._decodeTag(t, i.explicit);
                    if (t.isError(f)) return f;
                    t = f
                }
                var c = t.offset;
                if (null === i.use && null === i.choice) {
                    if (i.any) u = t.save();
                    var l = this._decodeTag(t, null !== i.implicit ? i.implicit : i.tag, i.any);
                    if (t.isError(l)) return l;
                    i.any ? n = t.raw(u) : t = l
                }
                if (e && e.track && null !== i.tag && e.track(t.path(), c, t.length, "tagged"), e && e.track && null !== i.tag && e.track(t.path(), t.offset, t.length, "content"), n = i.any ? n : null === i.choice ? this._decodeGeneric(i.tag, t, e) : this._decodeChoice(t, e), t.isError(n)) return n;
                if (i.any || null !== i.choice || null === i.children || i.children.forEach(function(i) {
                        i._decode(t, e)
                    }), i.contains && ("octstr" === i.tag || "bitstr" === i.tag)) {
                    var h = new a(n);
                    n = this._getUse(i.contains, t._reporterState.obj)._decode(h, e)
                }
            }
            return i.obj && o && (n = t.leaveObject(r)), null === i.key || null === n && !0 !== o ? null !== s && t.exitKey(s) : t.leaveKey(s, i.key, n), n
        }, u.prototype._decodeGeneric = function(t, e, i) {
            var r = this._baseState;
            return "seq" === t || "set" === t ? null : "seqof" === t || "setof" === t ? this._decodeList(e, t, r.args[0], i) : /str$/.test(t) ? this._decodeStr(e, t, i) : "objid" === t && r.args ? this._decodeObjid(e, r.args[0], r.args[1], i) : "objid" === t ? this._decodeObjid(e, null, null, i) : "gentime" === t || "utctime" === t ? this._decodeTime(e, t, i) : "null_" === t ? this._decodeNull(e, i) : "bool" === t ? this._decodeBool(e, i) : "objDesc" === t ? this._decodeStr(e, t, i) : "int" === t || "enum" === t ? this._decodeInt(e, r.args && r.args[0], i) : null !== r.use ? this._getUse(r.use, e._reporterState.obj)._decode(e, i) : e.error("unknown tag: " + t)
        }, u.prototype._getUse = function(t, e) {
            var i = this._baseState;
            return i.useDecoder = this._use(t, e), o(null === i.useDecoder._baseState.parent), i.useDecoder = i.useDecoder._baseState.children[0], i.implicit !== i.useDecoder._baseState.implicit && (i.useDecoder = i.useDecoder.clone(), i.useDecoder._baseState.implicit = i.implicit), i.useDecoder
        }, u.prototype._decodeChoice = function(t, e) {
            var i = this._baseState,
                r = null,
                n = !1;
            return Object.keys(i.choice).some(function(a) {
                var o = t.save(),
                    s = i.choice[a];
                try {
                    var d = s._decode(t, e);
                    if (t.isError(d)) return !1;
                    r = {
                        type: a,
                        value: d
                    }, n = !0
                } catch (e) {
                    return t.restore(o), !1
                }
                return !0
            }, this), n ? r : t.error("Choice not matched")
        }, u.prototype._createEncoderBuffer = function(t) {
            return new n(t, this.reporter)
        }, u.prototype._encode = function(t, e, i) {
            var r = this._baseState;
            if (null === r.default || r.default !== t) {
                var n = this._encodeValue(t, e, i);
                if (void 0 !== n && !this._skipDefault(n, e, i)) return n
            }
        }, u.prototype._encodeValue = function(t, e, i) {
            var n = this._baseState;
            if (null === n.parent) return n.children[0]._encode(t, e || new r);
            var a = null;
            if (this.reporter = e, n.optional && void 0 === t) {
                if (null === n.default) return;
                t = n.default
            }
            var o = null,
                s = !1;
            if (n.any) a = this._createEncoderBuffer(t);
            else if (n.choice) a = this._encodeChoice(t, e);
            else if (n.contains) o = this._getUse(n.contains, i)._encode(t, e), s = !0;
            else if (n.children) o = n.children.map(function(i) {
                if ("null_" === i._baseState.tag) return i._encode(null, e, t);
                if (null === i._baseState.key) return e.error("Child should have a key");
                var r = e.enterKey(i._baseState.key);
                if ("object" != typeof t) return e.error("Child expected, but input is not object");
                var n = i._encode(t[i._baseState.key], e, t);
                return e.leaveKey(r), n
            }, this).filter(function(t) {
                return t
            }), o = this._createEncoderBuffer(o);
            else if ("seqof" === n.tag || "setof" === n.tag) {
                if (!n.args || 1 !== n.args.length) return e.error("Too many args for : " + n.tag);
                if (!Array.isArray(t)) return e.error("seqof/setof, but data is not Array");
                var d = this.clone();
                d._baseState.implicit = null, o = this._createEncoderBuffer(t.map(function(i) {
                    var r = this._baseState;
                    return this._getUse(r.args[0], t)._encode(i, e)
                }, d))
            } else null !== n.use ? a = this._getUse(n.use, i)._encode(t, e) : (o = this._encodePrimitive(n.tag, t), s = !0);
            if (!n.any && null === n.choice) {
                var u = null !== n.implicit ? n.implicit : n.tag,
                    f = null === n.implicit ? "universal" : "context";
                null === u ? null === n.use && e.error("Tag could be omitted only for .use()") : null === n.use && (a = this._encodeComposite(u, s, f, o))
            }
            return null !== n.explicit && (a = this._encodeComposite(n.explicit, !1, "context", a)), a
        }, u.prototype._encodeChoice = function(t, e) {
            var i = this._baseState,
                r = i.choice[t.type];
            return r || o(!1, t.type + " not found in " + JSON.stringify(Object.keys(i.choice))), r._encode(t.value, e)
        }, u.prototype._encodePrimitive = function(t, e) {
            var i = this._baseState;
            if (/str$/.test(t)) return this._encodeStr(e, t);
            if ("objid" === t && i.args) return this._encodeObjid(e, i.reverseArgs[0], i.args[1]);
            if ("objid" === t) return this._encodeObjid(e, null, null);
            if ("gentime" === t || "utctime" === t) return this._encodeTime(e, t);
            if ("null_" === t) return this._encodeNull();
            if ("int" === t || "enum" === t) return this._encodeInt(e, i.args && i.reverseArgs[0]);
            if ("bool" === t) return this._encodeBool(e);
            if ("objDesc" === t) return this._encodeStr(e, t);
            throw new Error("Unsupported tag: " + t)
        }, u.prototype._isNumstr = function(t) {
            return /^[0-9 ]*$/.test(t)
        }, u.prototype._isPrintstr = function(t) {
            return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(t)
        }
    },
    g9U9: function(t, e) {
        t.exports = function(t, e) {
            for (var i = t.length, r = -1; ++r < i;) t[r] ^= e[r];
            return t
        }
    },
    gvAe: function(t, e, i) {
        var r = i("OfWw"),
            n = i("hwdV").Buffer,
            a = i("ZDAU"),
            o = i("P7XM"),
            s = i("P2KE"),
            d = i("jIre"),
            u = i("vZ2G");

        function f(t, e, i, o) {
            a.call(this);
            var d = n.alloc(4, 0);
            this._cipher = new r.AES(e);
            var f = this._cipher.encryptBlock(d);
            this._ghash = new s(f), i = function(t, e, i) {
                if (12 === e.length) return t._finID = n.concat([e, n.from([0, 0, 0, 1])]), n.concat([e, n.from([0, 0, 0, 2])]);
                var r = new s(i),
                    a = e.length,
                    o = a % 16;
                r.update(e), o && (o = 16 - o, r.update(n.alloc(o, 0))), r.update(n.alloc(8, 0));
                var d = 8 * a,
                    f = n.alloc(8);
                f.writeUIntBE(d, 0, 8), r.update(f), t._finID = r.state;
                var c = n.from(t._finID);
                return u(c), c
            }(this, i, f), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = o, this._alen = 0, this._len = 0, this._mode = t, this._authTag = null, this._called = !1
        }
        o(f, a), f.prototype._update = function(t) {
            if (!this._called && this._alen) {
                var e = 16 - this._alen % 16;
                e < 16 && (e = n.alloc(e, 0), this._ghash.update(e))
            }
            this._called = !0;
            var i = this._mode.encrypt(this, t);
            return this._decrypt ? this._ghash.update(t) : this._ghash.update(i), this._len += t.length, i
        }, f.prototype._final = function() {
            if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
            var t = d(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
            if (this._decrypt && function(t, e) {
                    var i = 0;
                    t.length !== e.length && i++;
                    for (var r = Math.min(t.length, e.length), n = 0; n < r; ++n) i += t[n] ^ e[n];
                    return i
                }(t, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
            this._authTag = t, this._cipher.scrub()
        }, f.prototype.getAuthTag = function() {
            if (this._decrypt || !n.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
            return this._authTag
        }, f.prototype.setAuthTag = function(t) {
            if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
            this._authTag = t
        }, f.prototype.setAAD = function(t) {
            if (this._called) throw new Error("Attempting to set AAD in unsupported state");
            this._ghash.update(t), this._alen += t.length
        }, t.exports = f
    },
    hbMA: function(t, e, i) {
        var r = i("P7XM"),
            n = i("N2jm");

        function a(t) {
            n.call(this, t), this.enc = "pem"
        }
        r(a, n), t.exports = a, a.prototype.encode = function(t, e) {
            for (var i = n.prototype.encode.call(this, t).toString("base64"), r = ["-----BEGIN " + e.label + "-----"], a = 0; a < i.length; a += 64) r.push(i.slice(a, a + 64));
            return r.push("-----END " + e.label + "-----"), r.join("\n")
        }
    },
    hwdV: function(t, e, i) {
        var r = i("tjlA"),
            n = r.Buffer;

        function a(t, e) {
            for (var i in t) e[i] = t[i]
        }

        function o(t, e, i) {
            return n(t, e, i)
        }
        n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (a(r, e), e.Buffer = o), a(n, o), o.from = function(t, e, i) {
            if ("number" == typeof t) throw new TypeError("Argument must not be a number");
            return n(t, e, i)
        }, o.alloc = function(t, e, i) {
            if ("number" != typeof t) throw new TypeError("Argument must be a number");
            var r = n(t);
            return void 0 !== e ? "string" == typeof i ? r.fill(e, i) : r.fill(e) : r.fill(0), r
        }, o.allocUnsafe = function(t) {
            if ("number" != typeof t) throw new TypeError("Argument must be a number");
            return n(t)
        }, o.allocUnsafeSlow = function(t) {
            if ("number" != typeof t) throw new TypeError("Argument must be a number");
            return r.SlowBuffer(t)
        }
    },
    i3FT: function(t, e, i) {
        var r = i("AhHn");
        e.tagClass = {
            0: "universal",
            1: "application",
            2: "context",
            3: "private"
        }, e.tagClassByName = r._reverse(e.tagClass), e.tag = {
            0: "end",
            1: "bool",
            2: "int",
            3: "bitstr",
            4: "octstr",
            5: "null_",
            6: "objid",
            7: "objDesc",
            8: "external",
            9: "real",
            10: "enum",
            11: "embed",
            12: "utf8str",
            13: "relativeOid",
            16: "seq",
            17: "set",
            18: "numstr",
            19: "printstr",
            20: "t61str",
            21: "videostr",
            22: "ia5str",
            23: "utctime",
            24: "gentime",
            25: "graphstr",
            26: "iso646str",
            27: "genstr",
            28: "unistr",
            29: "charstr",
            30: "bmpstr"
        }, e.tagByName = r._reverse(e.tag)
    },
    i5UE: function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("tSWc");

        function a() {
            if (!(this instanceof a)) return new a;
            n.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
        }
        r.inherits(a, n), t.exports = a, a.blockSize = 1024, a.outSize = 384, a.hmacStrength = 192, a.padLength = 128, a.prototype._digest = function(t) {
            return "hex" === t ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big")
        }
    },
    iUdu: function(t, e, i) {
        var r = i("usKN"),
            n = i("gvAe"),
            a = i("hwdV").Buffer,
            o = i("CfXC"),
            s = i("ZDAU"),
            d = i("OfWw"),
            u = i("roQf");

        function f(t, e, i) {
            s.call(this), this._cache = new l, this._cipher = new d.AES(e), this._prev = a.from(i), this._mode = t, this._autopadding = !0
        }
        i("P7XM")(f, s), f.prototype._update = function(t) {
            var e, i;
            this._cache.add(t);
            for (var r = []; e = this._cache.get();) i = this._mode.encrypt(this, e), r.push(i);
            return a.concat(r)
        };
        var c = a.alloc(16, 16);

        function l() {
            this.cache = a.allocUnsafe(0)
        }

        function h(t, e, i) {
            var s = r[t.toLowerCase()];
            if (!s) throw new TypeError("invalid suite type");
            if ("string" == typeof e && (e = a.from(e)), e.length !== s.key / 8) throw new TypeError("invalid key length " + e.length);
            if ("string" == typeof i && (i = a.from(i)), "GCM" !== s.mode && i.length !== s.iv) throw new TypeError("invalid iv length " + i.length);
            return "stream" === s.type ? new o(s.module, e, i) : "auth" === s.type ? new n(s.module, e, i) : new f(s.module, e, i)
        }
        f.prototype._final = function() {
            var t = this._cache.flush();
            if (this._autopadding) return t = this._mode.encrypt(this, t), this._cipher.scrub(), t;
            if (!t.equals(c)) throw this._cipher.scrub(), new Error("data not multiple of block length")
        }, f.prototype.setAutoPadding = function(t) {
            return this._autopadding = !!t, this
        }, l.prototype.add = function(t) {
            this.cache = a.concat([this.cache, t])
        }, l.prototype.get = function() {
            if (this.cache.length > 15) {
                var t = this.cache.slice(0, 16);
                return this.cache = this.cache.slice(16), t
            }
            return null
        }, l.prototype.flush = function() {
            for (var t = 16 - this.cache.length, e = a.allocUnsafe(t), i = -1; ++i < t;) e.writeUInt8(t, i);
            return a.concat([this.cache, e])
        }, e.createCipheriv = h, e.createCipher = function(t, e) {
            var i = r[t.toLowerCase()];
            if (!i) throw new TypeError("invalid suite type");
            var n = u(e, !1, i.key, i.iv);
            return h(t, n.key, n.iv)
        }
    },
    jIre: function(t, e, i) {
        (function(e) {
            t.exports = function(t, i) {
                for (var r = Math.min(t.length, i.length), n = new e(r), a = 0; a < r; ++a) n[a] = t[a] ^ i[a];
                return n
            }
        }).call(this, i("tjlA").Buffer)
    },
    jfd1: function(t, e, i) {
        var r = i("P7XM"),
            n = i("tjlA").Buffer,
            a = i("z71Z");

        function o(t) {
            a.call(this, t), this.enc = "pem"
        }
        r(o, a), t.exports = o, o.prototype.decode = function(t, e) {
            for (var i = t.toString().split(/[\r\n]+/g), r = e.label.toUpperCase(), o = /^-----(BEGIN|END) ([^-]+)-----$/, s = -1, d = -1, u = 0; u < i.length; u++) {
                var f = i[u].match(o);
                if (null !== f && f[2] === r) {
                    if (-1 !== s) {
                        if ("END" !== f[1]) break;
                        d = u;
                        break
                    }
                    if ("BEGIN" !== f[1]) break;
                    s = u
                }
            }
            if (-1 === s || -1 === d) throw new Error("PEM section not found for: " + r);
            var c = i.slice(s + 1, d).join("");
            c.replace(/[^a-z0-9\+\/=]+/gi, "");
            var l = new n(c, "base64");
            return a.prototype.decode.call(this, l, e)
        }
    },
    "k+aG": function(t, e, i) {
        "use strict";
        var r = i("hwdV").Buffer,
            n = i("1IWx").Transform;

        function a(t) {
            n.call(this), this._block = r.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
        }
        i("P7XM")(a, n), a.prototype._transform = function(t, e, i) {
            var r = null;
            try {
                this.update(t, e)
            } catch (t) {
                r = t
            }
            i(r)
        }, a.prototype._flush = function(t) {
            var e = null;
            try {
                this.push(this.digest())
            } catch (t) {
                e = t
            }
            t(e)
        }, a.prototype.update = function(t, e) {
            if (function(t, e) {
                    if (!r.isBuffer(t) && "string" != typeof t) throw new TypeError(e + " must be a string or a buffer")
                }(t, "Data"), this._finalized) throw new Error("Digest already called");
            r.isBuffer(t) || (t = r.from(t, e));
            for (var i = this._block, n = 0; this._blockOffset + t.length - n >= this._blockSize;) {
                for (var a = this._blockOffset; a < this._blockSize;) i[a++] = t[n++];
                this._update(), this._blockOffset = 0
            }
            for (; n < t.length;) i[this._blockOffset++] = t[n++];
            for (var o = 0, s = 8 * t.length; s > 0; ++o) this._length[o] += s, (s = this._length[o] / 4294967296 | 0) > 0 && (this._length[o] -= 4294967296 * s);
            return this
        }, a.prototype._update = function() {
            throw new Error("_update is not implemented")
        }, a.prototype.digest = function(t) {
            if (this._finalized) throw new Error("Digest already called");
            this._finalized = !0;
            var e = this._digest();
            void 0 !== t && (e = e.toString(t)), this._block.fill(0), this._blockOffset = 0;
            for (var i = 0; i < 4; ++i) this._length[i] = 0;
            return e
        }, a.prototype._digest = function() {
            throw new Error("_digest is not implemented")
        }, t.exports = a
    },
    "kVK+": function(t, e) {
        e.read = function(t, e, i, r, n) {
            var a, o, s = 8 * n - r - 1,
                d = (1 << s) - 1,
                u = d >> 1,
                f = -7,
                c = i ? n - 1 : 0,
                l = i ? -1 : 1,
                h = t[e + c];
            for (c += l, a = h & (1 << -f) - 1, h >>= -f, f += s; f > 0; a = 256 * a + t[e + c], c += l, f -= 8);
            for (o = a & (1 << -f) - 1, a >>= -f, f += r; f > 0; o = 256 * o + t[e + c], c += l, f -= 8);
            if (0 === a) a = 1 - u;
            else {
                if (a === d) return o ? NaN : 1 / 0 * (h ? -1 : 1);
                o += Math.pow(2, r), a -= u
            }
            return (h ? -1 : 1) * o * Math.pow(2, a - r)
        }, e.write = function(t, e, i, r, n, a) {
            var o, s, d, u = 8 * a - n - 1,
                f = (1 << u) - 1,
                c = f >> 1,
                l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                h = r ? 0 : a - 1,
                p = r ? 1 : -1,
                _ = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = f) : (o = Math.floor(Math.log(e) / Math.LN2), e * (d = Math.pow(2, -o)) < 1 && (o--, d *= 2), (e += o + c >= 1 ? l / d : l * Math.pow(2, 1 - c)) * d >= 2 && (o++, d /= 2), o + c >= f ? (s = 0, o = f) : o + c >= 1 ? (s = (e * d - 1) * Math.pow(2, n), o += c) : (s = e * Math.pow(2, c - 1) * Math.pow(2, n), o = 0)); n >= 8; t[i + h] = 255 & s, h += p, s /= 256, n -= 8);
            for (o = o << n | s, u += n; u > 0; t[i + h] = 255 & o, h += p, o /= 256, u -= 8);
            t[i + h - p] |= 128 * _
        }
    },
    lF1L: function(t, e, i) {
        "use strict";
        var r = i("fZJM"),
            n = i("MzeL"),
            a = n.utils,
            o = a.assert,
            s = a.parseBytes,
            d = i("OA+I"),
            u = i("RKMU");

        function f(t) {
            if (o("ed25519" === t, "only tested with ed25519 so far"), !(this instanceof f)) return new f(t);
            t = n.curves[t].curve;
            this.curve = t, this.g = t.g, this.g.precompute(t.n.bitLength() + 1), this.pointClass = t.point().constructor, this.encodingLength = Math.ceil(t.n.bitLength() / 8), this.hash = r.sha512
        }
        t.exports = f, f.prototype.sign = function(t, e) {
            t = s(t);
            var i = this.keyFromSecret(e),
                r = this.hashInt(i.messagePrefix(), t),
                n = this.g.mul(r),
                a = this.encodePoint(n),
                o = this.hashInt(a, i.pubBytes(), t).mul(i.priv()),
                d = r.add(o).umod(this.curve.n);
            return this.makeSignature({
                R: n,
                S: d,
                Rencoded: a
            })
        }, f.prototype.verify = function(t, e, i) {
            t = s(t), e = this.makeSignature(e);
            var r = this.keyFromPublic(i),
                n = this.hashInt(e.Rencoded(), r.pubBytes(), t),
                a = this.g.mul(e.S());
            return e.R().add(r.pub().mul(n)).eq(a)
        }, f.prototype.hashInt = function() {
            for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
            return a.intFromLE(t.digest()).umod(this.curve.n)
        }, f.prototype.keyFromPublic = function(t) {
            return d.fromPublic(this, t)
        }, f.prototype.keyFromSecret = function(t) {
            return d.fromSecret(this, t)
        }, f.prototype.makeSignature = function(t) {
            return t instanceof u ? t : new u(this, t)
        }, f.prototype.encodePoint = function(t) {
            var e = t.getY().toArray("le", this.encodingLength);
            return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
        }, f.prototype.decodePoint = function(t) {
            var e = (t = a.parseBytes(t)).length - 1,
                i = t.slice(0, e).concat(-129 & t[e]),
                r = 0 != (128 & t[e]),
                n = a.intFromLE(i);
            return this.curve.pointFromY(n, r)
        }, f.prototype.encodeInt = function(t) {
            return t.toArray("le", this.encodingLength)
        }, f.prototype.decodeInt = function(t) {
            return a.intFromLE(t)
        }, f.prototype.isPoint = function(t) {
            return t instanceof this.pointClass
        }
    },
    lWpZ: function(t, e, i) {
        var r = i("Hjy1"),
            n = i("/ab2"),
            a = i("usKN"),
            o = i("C+gy"),
            s = i("roQf");

        function d(t, e, i) {
            if (t = t.toLowerCase(), a[t]) return n.createCipheriv(t, e, i);
            if (o[t]) return new r({
                key: e,
                iv: i,
                mode: t
            });
            throw new TypeError("invalid suite type")
        }

        function u(t, e, i) {
            if (t = t.toLowerCase(), a[t]) return n.createDecipheriv(t, e, i);
            if (o[t]) return new r({
                key: e,
                iv: i,
                mode: t,
                decrypt: !0
            });
            throw new TypeError("invalid suite type")
        }
        e.createCipher = e.Cipher = function(t, e) {
            var i, r;
            if (t = t.toLowerCase(), a[t]) i = a[t].key, r = a[t].iv;
            else {
                if (!o[t]) throw new TypeError("invalid suite type");
                i = 8 * o[t].key, r = o[t].iv
            }
            var n = s(e, !1, i, r);
            return d(t, n.key, n.iv)
        }, e.createCipheriv = e.Cipheriv = d, e.createDecipher = e.Decipher = function(t, e) {
            var i, r;
            if (t = t.toLowerCase(), a[t]) i = a[t].key, r = a[t].iv;
            else {
                if (!o[t]) throw new TypeError("invalid suite type");
                i = 8 * o[t].key, r = o[t].iv
            }
            var n = s(e, !1, i, r);
            return u(t, n.key, n.iv)
        }, e.createDecipheriv = e.Decipheriv = u, e.listCiphers = e.getCiphers = function() {
            return Object.keys(o).concat(n.getCiphers())
        }
    },
    mAz1: function(t, e, i) {
        (function(e) {
            var r = i("OZ/i"),
                n = i("MzeL").ec,
                a = i("Ku4m"),
                o = i("zZGF");

            function s(t, e) {
                if (t.cmpn(0) <= 0) throw new Error("invalid sig");
                if (t.cmp(e) >= e) throw new Error("invalid sig")
            }
            t.exports = function(t, i, d, u, f) {
                var c = a(d);
                if ("ec" === c.type) {
                    if ("ecdsa" !== u && "ecdsa/rsa" !== u) throw new Error("wrong public key type");
                    return function(t, e, i) {
                        var r = o[i.data.algorithm.curve.join(".")];
                        if (!r) throw new Error("unknown curve " + i.data.algorithm.curve.join("."));
                        var a = new n(r),
                            s = i.data.subjectPrivateKey.data;
                        return a.verify(e, t, s)
                    }(t, i, c)
                }
                if ("dsa" === c.type) {
                    if ("dsa" !== u) throw new Error("wrong public key type");
                    return function(t, e, i) {
                        var n = i.data.p,
                            o = i.data.q,
                            d = i.data.g,
                            u = i.data.pub_key,
                            f = a.signature.decode(t, "der"),
                            c = f.s,
                            l = f.r;
                        s(c, o), s(l, o);
                        var h = r.mont(n),
                            p = c.invm(o);
                        return 0 === d.toRed(h).redPow(new r(e).mul(p).mod(o)).fromRed().mul(u.toRed(h).redPow(l.mul(p).mod(o)).fromRed()).mod(n).mod(o).cmp(l)
                    }(t, i, c)
                }
                if ("rsa" !== u && "ecdsa/rsa" !== u) throw new Error("wrong public key type");
                i = e.concat([f, i]);
                for (var l = c.modulus.byteLength(), h = [1], p = 0; i.length + h.length + 2 < l;) h.push(255), p++;
                h.push(0);
                for (var _ = -1; ++_ < i.length;) h.push(i[_]);
                h = new e(h);
                var y = r.mont(c.modulus);
                t = (t = new r(t).toRed(y)).redPow(new r(c.publicExponent)), t = new e(t.fromRed().toArray());
                var b = p < 8 ? 1 : 0;
                for (l = Math.min(t.length, h.length), t.length !== h.length && (b = 1), _ = -1; ++_ < l;) b |= t[_] ^ h[_];
                return 0 === b
            }
        }).call(this, i("tjlA").Buffer)
    },
    mObS: function(t, e, i) {
        "use strict";
        var r = i("P7XM"),
            n = i("9XZ3"),
            a = i("tcrS"),
            o = i("afKu"),
            s = i("ZDAU");

        function d(t) {
            s.call(this, "digest"), this._hash = t
        }
        r(d, s), d.prototype._update = function(t) {
            this._hash.update(t)
        }, d.prototype._final = function() {
            return this._hash.digest()
        }, t.exports = function(t) {
            return "md5" === (t = t.toLowerCase()) ? new n : "rmd160" === t || "ripemd160" === t ? new a : new d(o(t))
        }
    },
    n53Y: function(t, e, i) {
        (function(e) {
            var i;
            e.browser ? i = "utf-8" : i = parseInt(e.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary";
            t.exports = i
        }).call(this, i("8oxB"))
    },
    oJl4: function(t, e, i) {
        e.pbkdf2 = i("IG1u"), e.pbkdf2Sync = i("4Hv8")
    },
    olUY: function(t, e, i) {
        var r = i("P7XM"),
            n = i("tnIz"),
            a = i("hwdV").Buffer,
            o = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
            s = new Array(64);

        function d() {
            this.init(), this._w = s, n.call(this, 64, 56)
        }

        function u(t, e, i) {
            return i ^ t & (e ^ i)
        }

        function f(t, e, i) {
            return t & e | i & (t | e)
        }

        function c(t) {
            return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
        }

        function l(t) {
            return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
        }

        function h(t) {
            return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
        }
        r(d, n), d.prototype.init = function() {
            return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
        }, d.prototype._update = function(t) {
            for (var e, i = this._w, r = 0 | this._a, n = 0 | this._b, a = 0 | this._c, s = 0 | this._d, d = 0 | this._e, p = 0 | this._f, _ = 0 | this._g, y = 0 | this._h, b = 0; b < 16; ++b) i[b] = t.readInt32BE(4 * b);
            for (; b < 64; ++b) i[b] = 0 | (((e = i[b - 2]) >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>> 10) + i[b - 7] + h(i[b - 15]) + i[b - 16];
            for (var g = 0; g < 64; ++g) {
                var v = y + l(d) + u(d, p, _) + o[g] + i[g] | 0,
                    m = c(r) + f(r, n, a) | 0;
                y = _, _ = p, p = d, d = s + v | 0, s = a, a = n, n = r, r = v + m | 0
            }
            this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = a + this._c | 0, this._d = s + this._d | 0, this._e = d + this._e | 0, this._f = p + this._f | 0, this._g = _ + this._g | 0, this._h = y + this._h | 0
        }, d.prototype._hash = function() {
            var t = a.allocUnsafe(32);
            return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
        }, t.exports = d
    },
    pp2G: function(t, e, i) {
        "use strict";
        var r = {};
        i.r(r), i.d(r, "ACTION_PLAY", function() {
            return y
        }), i.d(r, "ACTION_PAUSE", function() {
            return b
        }), i.d(r, "ACTION_SEEK", function() {
            return g
        }), i.d(r, "ACTION_HEARTBEAT", function() {
            return v
        }), i.d(r, "ACTION_TIME_MARKER", function() {
            return m
        }), i.d(r, "log", function() {
            return A
        });
        var n = {
            AUDIO_ITEM_INDEX_ID: 0,
            AUDIO_ITEM_INDEX_OWNER_ID: 1,
            AUDIO_ITEM_INDEX_URL: 2,
            AUDIO_ITEM_INDEX_TITLE: 3,
            AUDIO_ITEM_INDEX_PERFORMER: 4,
            AUDIO_ITEM_INDEX_DURATION: 5,
            AUDIO_ITEM_INDEX_ALBUM_ID: 6,
            AUDIO_ITEM_INDEX_AUTHOR_LINK: 8,
            AUDIO_ITEM_INDEX_LYRICS: 9,
            AUDIO_ITEM_INDEX_FLAGS: 10,
            AUDIO_ITEM_INDEX_CONTEXT: 11,
            AUDIO_ITEM_INDEX_EXTRA: 12,
            AUDIO_ITEM_INDEX_HASHES: 13,
            AUDIO_ITEM_INDEX_COVER_URL: 14,
            AUDIO_ITEM_INDEX_ADS: 15,
            AUDIO_ITEM_INDEX_SUBTITLE: 16,
            AUDIO_ITEM_INDEX_MAIN_ARTISTS: 17,
            AUDIO_ITEM_INDEX_FEAT_ARTISTS: 18,
            AUDIO_ITEM_INDEX_ALBUM: 19,
            AUDIO_ITEM_INDEX_TRACK_CODE: 20,
            AUDIO_ITEM_INDEX_RESTRICTION: 21,
            AUDIO_ITEM_INDEX_ALBUM_PART: 22,
            AUDIO_ITEM_INDEX_NEW_STATS: 23,
            AUDIO_ITEM_HAS_LYRICS_BIT: 1,
            AUDIO_ITEM_CAN_ADD_BIT: 2,
            AUDIO_ITEM_CLAIMED_BIT: 4,
            AUDIO_ITEM_HQ_BIT: 16,
            AUDIO_ITEM_LONG_PERFORMER_BIT: 32,
            AUDIO_ITEM_UMA_BIT: 128,
            AUDIO_ITEM_REPLACEABLE: 512,
            AUDIO_ITEM_EXPLICIT_BIT: 1024,
            AUDIO_ENOUGH_LOCAL_SEARCH_RESULTS: 500,
            AUDIO_RECOMS_TYPE_LISTENED: "recoms6",
            AUDIO_PLAYING_CLS: "audio_row__playing",
            AUDIO_CURRENT_CLS: "audio_row__current",
            AUDIO_DURATION_CLS: "audio_row__duration",
            AUDIO_LAYER_HEIGHT: 550,
            AUDIO_LAYER_MIN_WIDTH: 400,
            AUDIO_LAYER_MAX_WIDTH: 1e3,
            AUDIO_HQ_LABEL_CLS: "audio_hq_label_show",
            AUDIO_MAX_AUDIOS_IN_SNIPPET: 5,
            AUDIO_ROW_COVER_SIZE: 40,
            AUDIO_ROW_PLAY_SIZE: 24,
            AUDIO_ROW_ACTION_ROW_ITEM: '<div role="button" class="audio_row__more_action audio_row__more_action_%0% _audio_row__more_action_%0% %3%">%2%</div>',
            LOG_LS_KEY: "audiolog"
        };
        var a = i("4bNW");
        var o = [];

        function s(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                i = "";
            if (e = !AudioUtils.isPodcast(t) && e, isArray(t[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS]) && (i = AudioUtils.getAudioArtistsString(t[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS], e)), isArray(t[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS]) && (i += " feat. ", i += AudioUtils.getAudioArtistsString(t[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS], e)), !i) {
                var r = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(/<\/?em>/g, "");
                if (e) i = '<a class="artist_link" data-performer="' + r + '" href="' + ("/audio?performer=1&q=" + encodeURIComponent(r)) + '">' + r + "</a>";
                else i = r
            }
            return i
        }
        var d = 600,
            u = 3600,
            f = 36e3;

        function c(t) {
            return t < d ? "s" : t < u ? "m" : t < f ? "l" : "n"
        }

        function l(t, e) {
            for (var i = JSON.parse(getTemplate("audio_bits_to_cls")), r = t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS], n = [], a = 0; a < 32; a++) {
                var o = 1 << a;
                r & o && n.push(i[o])
            }
            AudioUtils.isPodcast(t) && (n.push("audio_podcast"), AudioUtils.isPrivatePodcast(t) && n.push("audio_podcast_private")), e && n.push(e);
            var s = "";
            if (t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL]) {
                var d = t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL].split(",");
                s = "background-image: url(" + d[0] + ")"
            }
            var u = AudioUtils.getAudioPerformers(t),
                f = t[AudioUtils.AUDIO_ITEM_INDEX_DURATION],
                l = formatTime(f),
                h = clean(JSON.stringify(t)),
                p = getTemplate("audio_row", t);
            return p = (p = (p = (p = (p = (p = p.replace(/%cls%/, function() {
                return n.join(" ")
            })).replace(/%duration%/, function() {
                return l
            })).replace(/%serialized%/, function() {
                return h
            })).replace(/%cover_style%/, function() {
                return s
            })).replace(/%performers%/, function() {
                return u
            })).replace(/%duration_mod%/, function() {
                return c(f)
            })
        }
        var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };

        function p(t) {
            if (!t) return null;
            if (isObject(t)) return t;
            if ("string" == typeof t) return {
                id: t
            };
            var e = (t[n.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
                i = (t[n.AUDIO_ITEM_INDEX_COVER_URL] || "").split(","),
                r = s(t, !1);
            return {
                id: intval(t[n.AUDIO_ITEM_INDEX_ID]),
                owner_id: intval(t[n.AUDIO_ITEM_INDEX_OWNER_ID]),
                ownerId: t[n.AUDIO_ITEM_INDEX_OWNER_ID],
                fullId: t[n.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[n.AUDIO_ITEM_INDEX_ID],
                title: t[n.AUDIO_ITEM_INDEX_TITLE],
                subTitle: t[n.AUDIO_ITEM_INDEX_SUBTITLE],
                performer: r,
                duration: intval(t[n.AUDIO_ITEM_INDEX_DURATION]),
                lyrics: intval(t[n.AUDIO_ITEM_INDEX_LYRICS]),
                url: t[n.AUDIO_ITEM_INDEX_URL],
                flags: t[n.AUDIO_ITEM_INDEX_FLAGS],
                context: t[n.AUDIO_ITEM_INDEX_CONTEXT],
                extra: t[n.AUDIO_ITEM_INDEX_EXTRA],
                addHash: e[0] || "",
                editHash: e[1] || "",
                actionHash: e[2] || "",
                deleteHash: e[3] || "",
                replaceHash: e[4] || "",
                urlHash: e[5] || "",
                restoreHash: e[6] || "",
                canEdit: !!e[1],
                canDelete: !!e[3],
                isLongPerformer: t[n.AUDIO_ITEM_INDEX_FLAGS] & n.AUDIO_ITEM_LONG_PERFORMER_BIT,
                canAdd: !!(t[n.AUDIO_ITEM_INDEX_FLAGS] & n.AUDIO_ITEM_CAN_ADD_BIT),
                coverUrl_s: i[0],
                coverUrl_p: i[1],
                isClaimed: !!(t[n.AUDIO_ITEM_INDEX_FLAGS] & n.AUDIO_ITEM_CLAIMED_BIT),
                isExplicit: !!(t[n.AUDIO_ITEM_INDEX_FLAGS] & n.AUDIO_ITEM_EXPLICIT_BIT),
                isUMA: !!(t[n.AUDIO_ITEM_INDEX_FLAGS] & n.AUDIO_ITEM_UMA_BIT),
                isReplaceable: !!(t[n.AUDIO_ITEM_INDEX_FLAGS] & n.AUDIO_ITEM_REPLACEABLE),
                ads: t[n.AUDIO_ITEM_INDEX_ADS],
                album: t[n.AUDIO_ITEM_INDEX_ALBUM],
                albumId: intval(t[n.AUDIO_ITEM_INDEX_ALBUM_ID]),
                albumPart: intval(t[n.AUDIO_ITEM_INDEX_ALBUM_PART]),
                trackCode: t[n.AUDIO_ITEM_INDEX_TRACK_CODE],
                restrictionStatus: t[n.AUDIO_ITEM_INDEX_RESTRICTION],
                useNewStats: Boolean(t[n.AUDIO_ITEM_INDEX_NEW_STATS])
            }
        }
        var _ = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var i = [],
                        r = !0,
                        n = !1,
                        a = void 0;
                    try {
                        for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (i.push(o.value), !e || i.length !== e); r = !0);
                    } catch (t) {
                        n = !0, a = t
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw a
                        }
                    }
                    return i
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        var y = "play",
            b = "pause",
            g = "seek",
            v = "heartbeat",
            m = "time_marker";

        function A(t, e) {
            var i = e.audio;
            AudioUtils.isPodcast(i) && stManager.add([jsc("web/podcast.js")], function() {
                Podcast.log(t, e)
            })
        }
        var w = i("RbYe");
        var E = 25e3,
            P = null,
            S = null,
            I = null;

        function T(t) {
            window.Notifier && P !== t.key && (I && clearTimeout(I), P = t.key, Notifier.addKey({
                key: t.key,
                ts: t.timestamp
            }, function(e, i) {
                return function(t, e) {
                    if (t === P)
                        if (e.failed) M(!0);
                        else
                            for (var i = getAudioPlayer(), r = i.isPlaying(), n = i.getCurrentAudio(), a = AudioUtils.isPodcast(n), o = 0; o < e.events.length; o++) {
                                var s = e.events[o].data;
                                if ("start" === s.type && i.getDeviceId() !== s.uuid && !S && !a && r) {
                                    i.pausedByQueue = vkNow(), i.pause(), S = showBox("al_audio.php", {
                                        act: "start_playback_box",
                                        uuid: s.uuid,
                                        device_name: s.device_name
                                    }, {
                                        params: {
                                            hideButtons: !0,
                                            onHide: function() {
                                                S = !1
                                            }
                                        },
                                        containerClass: "audio_playback_box"
                                    });
                                    break
                                }
                            }
                }(t.key, i)
            }), I = setTimeout(function() {
                return M(!0)
            }, E))
        }

        function M(t) {
            var e = getAudioPlayer().getCurrentAudio(),
                i = window.Notifier && e && !vk.widget,
                r = !t && P,
                n = AudioUtils.isPodcast(e);
            !i || n || r || e && (e = AudioUtils.asObject(e), ajax.post("al_audio.php", {
                act: "queue_params",
                audio_id: e.id,
                owner_id: e.owner_id,
                hash: e.actionHash
            }, {
                onDone: function(t) {
                    if (t && t.errors && !t.errors.length) {
                        var e = t.data.queues[0];
                        e && T(e)
                    }
                }
            }))
        }
        var C = window,
            k = C.parseJSON,
            D = C.domData,
            L = C.getAudioPlayer;

        function O(t) {
            showFastBox({
                hideButtons: !0,
                title: !1,
                containerClass: "audio_restriction_box",
                onHide: function() {
                    statlogsValueEvent("audio_restriction_popup", "hide", t.restrictionStatus)
                }
            }, '\n    <button class="audio_restriction_box__close" onclick="curBox().hide()">' + getLang("global_close") + '</button>\n    <div class="audio_restriction_box__icon audio_restriction_box__icon_pensive_face"></div>\n    <div class="audio_restriction_box__title">' + getLang("audio_restriction_title_claim") + '</div>\n    <div class="audio_restriction_box__controls">\n        <button class="flat_button" onclick="curBox().hide()">' + getLang("global_close") + "</button>\n    </div>\n  ")
        }
        var x = i("4e3S");
        i.d(e, "a", function() {
            return U
        });
        var R = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
            }
            return t
        };
        window.AudioLayer = x.a, window.AudioUtils = R({}, n, {
            audioSearchPerformer: function(t, e, i) {
                var r = !!window.AudioPage && currentAudioPage(t),
                    n = window.AudioPage && currentAudioPage(t) || cur.audioPage;
                layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                    r && n ? (e = unclean(e).replace(/<em>|<\/em>/g, ""), nav.change({
                        q: e,
                        performer: 1
                    }, i, {
                        searchPerformer: !0,
                        nav: !0,
                        isLayer: r.isLayer()
                    })) : nav.go(t, i)
                }, 50)
            },
            toggleAudioLyrics: function(t, e) {
                var i = geByClass1("_audio_row__lyrics", t);
                if (i)
                    if (toggle(i)) {
                        var r = getSize(t)[1],
                            n = getSize(i)[1];
                        setStyle(t, "height", r + n), data(t, "prevHeight", r)
                    } else {
                        var a = data(t, "prevHeight");
                        setStyle(t, "height", a)
                    }
                else {
                    addClass(t, "audio_loading");
                    var o = {
                        act: "get_lyrics",
                        aid: e.fullId,
                        lid: e.lyrics
                    };
                    AudioUtils.isPodcast(e) && (o.podcast = !0), ajax.post("al_audio.php", o, {
                        onDone: function(r) {
                            removeClass(t, "audio_loading"), i = se('<div class="_audio_row__lyrics audio_row__lyrics" data-nodrag="1" style="display:none;"><div class="audio_row__lyrics_inner">' + r + "</div></div>"), geByClass1("_audio_row_content", t).appendChild(i), AudioUtils.toggleAudioLyrics(t, e)
                        }
                    })
                }
            },
            getRowActionName: function(t, e, i) {
                var r = void 0,
                    n = AudioUtils.getAddRestoreInfo();
                switch (t) {
                    case "current_delete":
                        r = getLang("audio_delete_from_current");
                        break;
                    case "recoms_delete":
                        r = getLang("audio_dont_show");
                        break;
                    case "listened_delete":
                        r = getLang("audio_remove_from_list");
                        break;
                    case "delete":
                        if (AudioUtils.isPodcast(e)) r = getLang("audio_podcast_delete_episode");
                        else if (window.AudioPage && AudioPage.isInRecentPlayed(i)) r = getLang("audio_remove_from_list");
                        else {
                            var a = n[e.fullId];
                            r = a && a.deleteAll ? a.deleteAll.text : getLang("global_delete_audio")
                        }
                        break;
                    case "restore_recoms":
                        r = getLang("audio_restore_audio");
                        break;
                    case "add":
                        var o = n[e.fullId];
                        if (AudioUtils.isPodcast(e)) r = getLang("audio_podcast_restore_episode");
                        else if (o && "deleted" == o.state) r = getLang("audio_restore_audio");
                        else if (o && "added" == o.state) r = getLang("global_delete_audio");
                        else {
                            var s = !!window.AudioPage && currentAudioPage(i);
                            r = s && s.getOwnerId() < 0 && s.canAddToGroup() ? getLang("audio_add_to_group") : getLang("audio_add_to_audio")
                        }
                        break;
                    case "edit":
                        r = AudioUtils.isPodcast(e) ? getLang("audio_podcast_edit_episode") : getLang("audio_edit_audio");
                        break;
                    case "next":
                        r = cur.lang && cur.lang.global_audio_set_next_audio || getLang("audio_set_next_audio");
                        break;
                    case "recoms":
                        r = getLang("audio_show_recommendations");
                        break;
                    case "fave":
                        r = AudioUtils.isPodcast(e) ? getLang("audio_podcast_listen_later") : "";
                        break;
                    default:
                        r = ""
                }
                return r
            },
            initRowPlaylistsChooser: function(t, e, i) {
                var r = AudioUtils.asObject(t),
                    n = void 0;
                n = cur.audioPage && cur.audioPage.getOwnerId() < 0 && cur.audioPage.canEditGroup() ? cur.audioPage.getOwnerId() : vk.id, AudioUtils.playlistsByAudioDataCache = AudioUtils.playlistsByAudioDataCache || {};
                var a = AudioUtils.playlistsByAudioDataCache,
                    o = n + "_" + r.ownerId + "_" + r.id;
                a[o] ? AudioUtils._showPlaylistsChooser(i, e, a[o], n, r, t) : ajax.post("al_audio.php", {
                    act: "playlists_by_audio",
                    owner_id: n,
                    audio_owner_id: r.ownerId,
                    audio_id: r.id
                }, {
                    onDone: function(s, d, u) {
                        var f = a[o] = {
                            playlists: s,
                            morePlaylists: d,
                            newPlaylistHash: u
                        };
                        AudioUtils._showPlaylistsChooser(i, e, f, n, r, t)
                    }
                })
            },
            addToPlaylistsBoxInit: function t(e, i, r, n, a) {
                if ("undefined" == typeof AutoList) return stManager.add("auto_list.js", function() {
                    t(e, i, r, n, a)
                });
                var o = curBox(),
                    s = geByClass1("_audio_atp_content", o.bodyNode),
                    d = geByClass1("_audio_atp_list", o.bodyNode),
                    u = ge("audio_atp_search"),
                    f = geByClass1("_audio_atp_empty"),
                    c = getSize(s)[1];
                setStyle(d, {
                    height: c - getSize(u)[1]
                });
                var l = "",
                    h = void 0;

                function p() {
                    h && h.destroy(), d.innerHTML = "";
                    var t = [];
                    t = l ? n.filter(function(t) {
                        return t[2].toLowerCase().indexOf(l) >= 0
                    }) : n, toggle(d, 0 != t.length), toggle(f, 0 == t.length), h = new AutoList(d, {
                        onNeedRows: function(e, i) {
                            for (var r = [], n = i, a = Math.min(t.length, i + 30), o = n; o < a; o++) {
                                var s = t[o];
                                if (s) {
                                    var d = '<div class="ape_pl_item _ape_pl_item ' + (s[4] ? "ape_selected" : "") + '" data-id="' + s[1] + '"><div class="ape_check"><div class="ape_check_icon"></div></div><div class="ape_pl_item_inner"><span class="ape_pl_title">' + s[2] + '</span> <span class="ape_pl_size">' + s[3] + "</span></div></div>";
                                    r.push(d)
                                }
                            }
                            e(r)
                        }
                    })
                }
                p(), cur.addToPlaylistSearch = debounce(function(t) {
                    l = trim(t).toLowerCase(), p()
                }, 200);
                var _ = {},
                    y = {};
                addEvent(d, "click", function(t) {
                    var e = domClosest("_ape_pl_item", t.target),
                        i = domData(e, "id");
                    toggleClass(e, "ape_selected") ? (y[i] = !0, delete _[i]) : (_[i] = !0, delete y[i])
                }), o.removeButtons(), o.addButton(getLang("global_save"), function(t) {
                    var n = Object.keys(y),
                        s = Object.keys(_);
                    ajax.post("al_audio.php", {
                        act: "save_audio_in_playlists",
                        add_pl_ids: n.join(","),
                        remove_pl_ids: s.join(","),
                        owner_id: e,
                        audio_owner_id: i,
                        audio_id: r,
                        hash: a
                    }, {
                        showProgress: lockButton.pbind(t),
                        hideProgress: unlockButton.pbind(t),
                        onDone: function() {
                            o.hide()
                        }
                    })
                }, "ok", !0), o.addButton(getLang("global_cancel"), o.hide.bind(this), "no", !0)
            },
            showRecoms: function(t, e) {
                cur.audioPage && cur.audioPage.showRecoms(!1, e.fullId)
            },
            shareAudio: function(t, e) {
                if (cur.viewAsBox) return cur.viewAsBox();
                if (e = e || getAudioPlayer().getCurrentAudio()) {
                    e = AudioUtils.asObject(e);
                    var i = AudioUtils.isPodcast(e) ? "podcast" : "audio";
                    return !showBox("like.php", {
                        act: "publish_box",
                        object: i + e.fullId,
                        list: e.actionHash,
                        to: "mail"
                    }, {
                        stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"],
                        onFail: function(t) {
                            return showDoneBox(t), !0
                        }
                    })
                }
            },
            showAudioAlbum: function(t, e) {
                if (cur.viewAsBox) return cur.viewAsBox();
                e = AudioUtils.asObject(e), layers.fullhide && layers.fullhide(), AudioUtils.showAudioPlaylist(e.album[0], e.album[1], e.album[2])
            },
            openEpisode: function(t, e) {
                e = AudioUtils.asObject(e), AudioUtils.isPodcast(e) && showPodcast(t, e.fullId, null, "audio")
            },
            replaceWithOriginal: function(t, e, i) {
                (e = e || getAudioPlayer().getCurrentAudio()) && (e = AudioUtils.asObject(e), ajax.post("al_audio.php", {
                    act: "replace_with_original",
                    hash: e.replaceHash,
                    audio_id: e.fullId
                }, {
                    onDone: function(r) {
                        var n = JSON.parse(e.extra).claim.original;
                        n[AudioUtils.AUDIO_ITEM_INDEX_ID] = r, n[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] = e.ownerId;
                        var a = se(AudioUtils.drawAudio(n));
                        t.parentElement.insertBefore(a, t), t.parentElement.removeChild(t), i && i()
                    },
                    onFail: i
                }))
            },
            editAudio: function(t, e, i) {
                showBox("al_audio.php", {
                    act: "edit_audio_box",
                    aid: e.fullId,
                    force_edit_hash: i
                }, {
                    params: {
                        width: "456px",
                        bodyStyle: "padding: 20px; background-color: #F7F7F7;",
                        hideButtons: 1
                    },
                    dark: 1
                })
            },
            editEpisode: function(t, e) {
                AudioUtils.isPodcast(e) && (cur.podcastEditData = {
                    audioId: e.fullId
                }, stManager.add([jsc("web/podcast.js")], function() {
                    Podcast.edit(e.fullId)
                }))
            },
            deleteCurrentAudio: function(t, e) {
                var i = getAudioPlayer().getCurrentPlaylist();
                i && i.removeAudio(e.fullId), re(t)
            },
            deleteRecomsAudio: function(t, e) {
                AudioUtils.deleteAudio(t, e, !1, !0)
            },
            deleteListenedAudio: function(t, e) {
                AudioUtils.deleteAudio(t, e, !1, !1, !0)
            },
            deleteAudio: function(t, e, i, r, n) {
                function a(e) {
                    return domData(t, "in-progress", intval(e))
                }
                if (window.tooltips && tooltips.hideAll(), !intval(domData(t, "in-progress"))) {
                    a(!0);
                    var o = !1;
                    e.isClaimed && (o = !0);
                    var s = AudioUtils.getAddRestoreInfo(),
                        d = s[e.fullId];
                    if (d && d.deleteAll) showFastBox({
                        title: getLang("audio_delete_all_title"),
                        dark: 1
                    }, d.deleteConfirmMsg || "", getLang("global_delete"), function(t) {
                        var e = extend({
                            act: "delete_all"
                        }, d.deleteAll);
                        ajax.post("al_audio.php", e, {
                            showProgress: lockButton.pbind(t),
                            onDone: function() {
                                var t = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, d.deleteAll.from_id, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                                getAudioPlayer().deletePlaylist(t), nav.reload()
                            }
                        })
                    }, getLang("global_cancel"));
                    else {
                        if (o ? re(t) : addClass(t, "audio_row__deleted"), n) {
                            ajax.post("al_audio.php", {
                                act: "remove_listened",
                                audio_id: e.id,
                                audio_owner_id: e.ownerId,
                                hash: e.actionHash
                            }), re(t);
                            var u = getAudioPlayer().getCurrentPlaylist();
                            u.getType() == AudioPlaylist.TYPE_RECOM && u.getAlbumId() == AudioUtils.AUDIO_RECOMS_TYPE_LISTENED && u.removeAudio(e.fullId)
                        } else if (r) {
                            var f = {
                                act: "hide_recommendation",
                                hash: AudioUtils.getAudioExtra(e).recom.hash,
                                audio_id: e.fullId
                            };
                            nav.objLoc.audio_id && (f.recommendation_type = "query"), ajax.post("al_audio.php", f, {
                                onDone: function() {
                                    a(!1)
                                }
                            }), s[e.fullId] = {
                                state: "recom_hidden"
                            };
                            var c = getAudioPlayer().getCurrentPlaylist();
                            c && c.getType() == AudioPlaylist.TYPE_RECOM && (s[e.fullId].removedCurrentPos = c.removeAudio(e))
                        } else ajax.post("al_audio.php", {
                            act: "delete_audio",
                            oid: e.ownerId,
                            aid: e.id,
                            hash: e.deleteHash,
                            restore: 1,
                            track_code: e.trackCode
                        }, {
                            onDone: function(i, r) {
                                o || a(!1), s[e.fullId] = {
                                    state: "deleted",
                                    deleteAll: i,
                                    deleteConfirmMsg: r
                                }, o && AudioUtils.deleteDeletedAudios(), AudioUtils.onRowOver(t, !1, !0)
                            }
                        });
                        AudioUtils.onRowOver(t, !1, !0)
                    }
                }
            },
            deleteEpisode: function(t, e) {
                AudioUtils.isPodcast(e) && stManager.add([jsc("web/podcast.js")], function() {
                    Podcast.deleteEpisode(e.fullId, e.deleteHash)
                })
            },
            restoreEpisode: function(t, e) {
                AudioUtils.isPodcast(e) && stManager.add([jsc("web/podcast.js")], function() {
                    Podcast.restoreEpisode(e.fullId, e.editHash)
                })
            },
            deleteDeletedAudios: function() {
                each(AudioUtils._audioAddRestoreInfo || {}, function(t, e) {
                    "deleted" != e.state && "recom_hidden" != e.state || getAudioPlayer().deleteAudioFromAllPlaylists(t)
                })
            },
            faveEpisode: function(t, e) {
                if (AudioUtils.isPodcast(e)) {
                    var i = AudioUtils.getAudioExtra(e).faveHash;
                    bookmarkPodcast(geByClass1("audio_row__action_fave", t), e.fullId, i)
                }
            },
            contextSplit: function(t) {
                return isObject(t) && (t = t.context), (t || "").split(":")
            },
            showAudioPlaylist: function(t, e, i, r, n, a) {
                if (cur.apLayer) return cancelEvent(n);
                if (vk.widget) return !0;
                if (!n || !(n.metaKey && browser.mac || n.ctrlKey)) {
                    var o = null;
                    return window.Photoview && window.cur && cur.pvShown && (o = clone(nav.objLoc), Photoview.hide(!0)), boxRefreshCoords(boxLoader), show(boxLoader), show(boxLayerWrap), stManager.add(["auto_list.js", "audio.css"], function() {
                        new AudioPlaylist({
                            type: AudioPlaylist.TYPE_PLAYLIST,
                            ownerId: t,
                            albumId: e,
                            hasMore: !0,
                            accessHash: i,
                            fromId: cur.oid
                        }).loadAll(function(u, f) {
                            if (hide(boxLoader), hide(boxLayerWrap), f) {
                                var c = getLang("audio_error_deleted_playlist_box").split("/");
                                return new MessageBox({
                                    title: c[0]
                                }).content(c[1]).setButtons(getLang("global_close"), function() {
                                    curBox().hide(), o && nav.change(o)
                                }).show(), void nav.setLoc(extend(nav.objLoc, {
                                    z: !1
                                }))
                            }
                            var l = extend(nav.objLoc, {
                                z: "audio_playlist" + t + "_" + e + (i ? "/" + i : "")
                            });
                            nav.setLoc(l), window.audioPlaylistLayerWrap || (window.audioPlaylistLayerWrap = se('<div class="ap_layer_wrap"></div>'), bodyNode.appendChild(window.audioPlaylistLayerWrap)), window.audioPlaylistLayerWrap.innerHTML = "";
                            var h = u.getAudiosList().length,
                                p = u.isBlocked && u.isBlocked(),
                                _ = getTemplate("audio_playlist_snippet", {
                                    title: u.getTitle(),
                                    subTitle: u.getSubtitle(),
                                    description: u.getDescription(),
                                    coverStyle: u.getCoverUrl() ? "background-image:url('" + u.getCoverUrl() + "'); background-size: cover;" : "",
                                    authorLine: u.getAuthorLine(),
                                    infoLine1: u.getInfoLine1(),
                                    infoLine2: u.getInfoLine2(),
                                    id: u.getPlaylistId(),
                                    ownerId: u.getOwnerId(),
                                    href: "/audio?z=audio_playlist" + u.getOwnerId() + "_" + u.getPlaylistId() + "/" + u.getAccessHash(),
                                    addCls: u.getAddClasses(),
                                    followHash: u.getFollowHash(),
                                    accessHash: u.getAccessHash(),
                                    editHash: u.getEditHash(),
                                    deleteHash: u.getDeleteHash(),
                                    replaceHash: u.getReplaceHash(),
                                    gridCovers: u.getGridCovers(),
                                    type: u.getType(),
                                    context: r,
                                    followButtonText: u.isFollowed() ? getLang("audio_playlist_btn_added") : getLang("audio_playlist_btn_add")
                                });
                            if (cur.apLayer = se('\n        <div class="ap_layer">\n          <div class="ap_layer__content">\n            ' + _ + '\n          </div>\n          <div class="ap_layer__close _ap_layer__close"></div>\n        </div>\n      '), p) {
                                var y = geByClass1("audio_pl_snippet__body", cur.apLayer);
                                y.innerHTML = getTemplate("playlist_snippet_stub")
                            }
                            window.audioPlaylistLayerWrap.appendChild(cur.apLayer), addEvent(window.audioPlaylistLayerWrap, "click", n = function(t) {
                                t.target != window.audioPlaylistLayerWrap && t.target != geByClass1("_ap_layer__close", cur.apLayer) || layers.fullhide()
                            }), addEvent(bodyNode, "keydown", s = function(t) {
                                if (27 == t.keyCode) return layers.fullhide(), cancelEvent(t)
                            }), layerQueue.push(), layerQueue.hide(), boxQueue.hideAll(), layers.wrapshow(window.audioPlaylistLayerWrap, .7), addClass(layerBG, "ap_layer_bg_dark");
                            var b = geByClass1("_audio_pl_snippet__list", cur.apLayer),
                                g = AudioUtils.getAlbumParts(u),
                                v = 0;
                            h && !p && (cur.apLayerAutoList = new AutoList(b, {
                                scrollNode: window.audioPlaylistLayerWrap,
                                onNeedRows: function(t, e) {
                                    for (var i = [], r = u.getUnshuffledAudiosList(), n = e -= v; n < e + 30; n++) {
                                        var a = r[n];
                                        if (!a) break;
                                        if (g && g.length && g[0].offset === n) {
                                            var o = g.shift();
                                            v++, i.push(AudioUtils.drawAlbumPartRow(o.number))
                                        }
                                        i.push(AudioUtils.drawAudio(a))
                                    }
                                    t(i)
                                }
                            })), boxRefreshCoords(cur.apLayer), getAudioPlayer().updateCurrentPlaying(), layers.fullhide = d, cur.apLayerPlaylistId = [t, e], a && a(), cur.articleLayer && cur.articleLayer.audioPlaylistOpened()
                        });
                        var n = void 0,
                            s = void 0;

                        function d(t) {
                            boxQueue.hideAll(), cur.apLayerAutoList && (cur.apLayerAutoList.destroy(), cur.apLayerAutoList = null), layers.wraphide(window.audioPlaylistLayerWrap), layers.fullhide = !1, n && removeEvent(window.audioPlaylistLayerWrap, "click", n), s && removeEvent(bodyNode, "keydown", s), delete cur.apLayer, delete cur.apLayerPlaylistId, removeClass(layerBG, "ap_layer_bg_dark"), o ? nav.change(o) : nav.change({
                                z: !1
                            }), layerQueue.pop()
                        }
                    }), !1
                }
            },
            editPlaylist: function(t, e, i, r) {
                stManager.add(["audio.js", "audio.css", "auto_list.js"], function() {
                    ajax.post("al_audio.php", {
                        act: "playlists_edit_data",
                        owner_id: t
                    }, {
                        onDone: function(n) {
                            n.audio_playlist_cover_upload_options && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[t] = n.audio_playlist_cover_upload_options), AudioPage.editPlaylist(t, e, i, r)
                        }
                    })
                })
            },
            followPlaylist: function(t, e, i, r) {
                var n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;

                function a(r) {
                    var n = domData(t, "text-followed"),
                        a = domData(t, "text-follow");
                    domData(t, "tooltip-text", r ? n : a), t.innerHTML = r ? n : a, f.setFollowed(r);
                    var o = f.getAddClasses() || "";
                    o = o.replace("audio_pl__followed", ""), r && (o += " audio_pl__followed"), f.mergeWith({
                        addClasses: o
                    }), each(geByClass("_audio_pl_" + e + "_" + i), function(e, i) {
                        toggleClass(i, "audio_pl__followed", r);
                        var n = i.querySelectorAll(".audio_pl_snippet__action_btn_add")[0];
                        n && (n.innerHTML = t.innerHTML)
                    })
                }

                function s(t) {
                    if (cur.audioPage && cur.audioPage.updatePlaylistsCounter && "playlists" === cur.audioPage._currentSection) {
                        if (t) {
                            var r = null;
                            o = o.filter(function(t) {
                                var n = t.playlistId === i && t.playlistOwnerId === e;
                                return n && (r = t.pl), !n
                            }), r && cur.audioPage._data.playlists.push(r)
                        } else cur.audioPage._data.playlists = cur.audioPage._data.playlists.filter(function(t) {
                            var r = t.id === i && t.owner_id === e;
                            return r && o.push({
                                playlistId: i,
                                playlistOwnerId: e,
                                pl: t
                            }), !r
                        });
                        cur.audioPage.updatePlaylistsCounter && cur.audioPage.updatePlaylistsCounter(vk.id)
                    }
                }
                var d = gpeByClass("_audio_pl", t),
                    u = toggleClass(d, "audio_pl__followed"),
                    f = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, i);
                a(u), s(u), ajax.post("al_audio.php", {
                    act: "follow_playlist",
                    playlist_owner_id: e,
                    playlist_id: i,
                    hash: r,
                    showcase: n
                }, {
                    onFail: function(t) {
                        return new MessageBox({
                            title: getLang("global_error")
                        }).content(t).setButtons("Ok", function() {
                            curBox().hide()
                        }).show(), a(!1), s(!1), !0
                    }
                })
            },
            getLayer: function() {
                var t = window.audioLayer;
                return t || (window.audioLayer = t = new AudioLayer), t
            },
            updateQueueReceivedPost: function(t) {
                t && each(geByClass("_audio_row", t), function() {
                    domData(this, "new-post", "groups" == cur.module ? "wall" : "feed")
                })
            },
            toggleAudioHQBodyClass: function() {
                var t = getAudioPlayer().showHQLabel();
                toggleClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS, t)
            },
            hasAudioHQBodyClass: function() {
                return hasClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS)
            },
            showNeedFlashBox: function() {
                var t = getLang("global_audio_flash_required").replace("{link}", '<a target=_blank href="https://get.adobe.com/flashplayer">').replace("{/link}", "</a>");
                new MessageBox({
                    title: getLang("audio_need_flash_title")
                }).content(t).setButtons("Ok", function() {
                    curBox().hide()
                }).show()
            },
            getAddRestoreInfo: function() {
                return AudioUtils._audioAddRestoreInfo = AudioUtils._audioAddRestoreInfo || {}, AudioUtils._audioAddRestoreInfo
            },
            addAudio: function(t, e) {
                if (cur.viewAsBox) return cur.viewAsBox();
                if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;

                function i(e) {
                    return domData(t, "in-progress", intval(e))
                }
                if (!intval(domData(t, "in-progress"))) {
                    i(!0), e || (e = AudioUtils.getAudioFromEl(t, !0));
                    var r = window.AudioPage && currentAudioPage(t),
                        n = r && r.getOwnerId() < 0 && r.canAddToGroup() ? -r.getOwnerId() : 0,
                        a = AudioUtils.getAddRestoreInfo(),
                        o = a[e.fullId],
                        s = geByClass1("_audio_row_" + e.fullId);
                    s = s != t && s;
                    var d = r && r.getPageCurrentPlaylist(),
                        u = void 0,
                        f = AudioUtils.getContextPlaylist(t, !0);
                    f && (u = (f = AudioUtils.contextSplit(f))[0]), ("search" == u && d && d.getSearchQid() || "search" == cur.module && cur.qid) && (u = "search:external");
                    var c = {
                        act: "add",
                        group_id: n,
                        audio_owner_id: e.ownerId,
                        audio_id: e.id,
                        hash: e.addHash,
                        from: u || "",
                        track_code: e.trackCode
                    };
                    o ? "recom_hidden" == o.state ? (r && (r.restoreRecommendation(t), i(!1)), AudioUtils.onRowOver(t, !1, !0)) : "deleted" == o.state ? (ajax.post("al_audio.php", {
                        act: "restore_audio",
                        oid: e.ownerId,
                        aid: e.id,
                        hash: e.restoreHash,
                        track_code: e.trackCode
                    }, {
                        onDone: function() {
                            i(!1)
                        }
                    }), removeClass(t, "audio_row__deleted"), delete a[e.fullId], AudioUtils.onRowOver(t, !1, !0)) : "added" == o.state && (ajax.post("al_audio.php", {
                        act: "delete_audio",
                        oid: o.audio.ownerId,
                        aid: o.audio.id,
                        hash: o.audio.deleteHash,
                        track_code: e.trackCode
                    }, {
                        onDone: function() {
                            r && getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, n ? -n : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID).removeAudio(o.addedFullId), i(!1)
                        }
                    }), removeClass(t, "audio_row__added"), s && removeClass(s, "audio_row__added"), delete a[e.fullId], getAudioPlayer().notify(AudioPlayer.EVENT_REMOVED, e.fullId, o.addedFullId)) : (ajax.post("al_audio.php", c, {
                        onDone: function(t) {
                            if (t) {
                                var r = t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID];
                                a[e.fullId] = {
                                    state: "added",
                                    addedFullId: r,
                                    audio: AudioUtils.asObject(t)
                                }, getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, n ? -n : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID).addAudio(t, 0), d && d.getType() == AudioPlaylist.TYPE_SEARCH && d.sendSearchStats("search_add")
                            }
                            i(!1)
                        },
                        onFail: function(e) {
                            return e && new MessageBox({
                                title: getLang("global_error")
                            }).content(e).setButtons("Ok", function() {
                                curBox().hide()
                            }).show(), removeClass(t, "audio_row__added"), i(!1), !0
                        }
                    }), addClass(t, "audio_row__added"), s && addClass(s, "audio_row__added"), getAudioPlayer().notify(AudioPlayer.EVENT_ADDED, e.fullId), r && d && r.onUserAction(e, d))
                }
            },
            addAudioToOwner: function(t, e) {
                return window.onAudioPageLoaded = function() {
                    return this.uploadAudio({})
                }, nav.go("audios" + t), cancelEvent(e)
            },
            chooseAudioBox: function(t, e, i) {
                if (void 0 !== t.selected) cur.lastAddMedia.unchooseMedia(t.selected), t.selected = void 0, removeClass(domPN(t), "audio_selected"), t.innerHTML = e.labels.add;
                else {
                    var r = cur.attachCount && cur.attachCount() || 0;
                    cur.chooseMedia("audio", e.owner_id + "_" + e.id, e.info), (!cur.attachCount || cur.attachCount() > r) && cur.lastAddMedia && (t.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(t), "audio_selected"), t.innerHTML = e.labels.cancel)
                }
                return cancelEvent(i)
            },
            getAudioArtistsString: function(t, e) {
                var i = "";
                return t.forEach(function(r, n) {
                    var a = "/audio?performer=1&q=" + encodeURIComponent(r.name);
                    r.id && (a = "/artist/" + r.id), i += e ? '<a class="artist_link" href="' + a + '">' + r.name + "</a>" : r.name, n < t.length - 1 && (i += ", ")
                }), i
            },
            getAudioPerformers: s,
            drawAudio: l,
            isClaimedAudio: function(t) {
                return !!t && (t = AudioUtils.asObject(t)).flags & AudioUtils.AUDIO_ITEM_CLAIMED_BIT
            },
            getDurationMod: c,
            getAudioExtra: function(t) {
                return t = AudioUtils.asObject(t), "object" === h(t.extra) ? t.extra : JSON.parse(t.extra || "{}")
            },
            getAudioFromEl: function(t, e) {
                t = domClosest("_audio_row", t);
                var i = data(t, "audio");
                return i || (i = JSON.parse(domData(t, "audio"))), e && ((i = AudioUtils.asObject(i)).isDeleted = hasClass(t, "audio_row__deleted"), i.isCurrent = hasClass(t, AudioUtils.AUDIO_CURRENT_CLS), i.isPlaying = hasClass(t, AudioUtils.AUDIO_PLAYING_CLS), i.isFromCurrentPlaylist = !!gpeByClass("_audio_section__current", t), i.isNumeric = !!gpeByClass("audio_numeric", t), i.isWithCovers = !!gpeByClass("audio_w_covers", t), i.withInlinePlayer = !i.isWithCovers && !gpeByClass("audio_no_inline_player", t), i.isInSnippet = !!gpeByClass("_audio_pl_snippet__list", t), i.isInEditBox = !!gpeByClass("_audio_pl_edit_box", t), i.isInRecomsBlock = !!gpeByClass("_audio_recoms_blocks", t), i.isInFastChat = !!gpeByClass("fc_tab", t), i.isInAttach = !!gpeByClass("media_preview", t), i.isSetClaimed = hasClass(t, "audio_moder_claimed"), i.isPodcastListSnippet = hasClass(t, "podcast_list_snippet")), i
            },
            getAudioFullId: function(t) {
                return t[n.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[n.AUDIO_ITEM_INDEX_ID]
            },
            asObject: p,
            initDomPlaylist: function(t, e) {
                var i = [];
                return each(e, function(t, e) {
                    e && each(geByClass("_audio_row", e), function(t) {
                        i.push(AudioUtils.getAudioFromEl(this))
                    })
                }), t.addAudio(i), t
            },
            getContextPlaylist: function(t, e) {
                var i = getAudioPlayer(),
                    r = AudioUtils.getAudioFromEl(t, !0);

                function n(t) {
                    return [].slice.call(t)
                }
                var a = null,
                    o = [],
                    s = domData(t, "new-post"),
                    d = !1,
                    u = null,
                    f = AudioPlaylist.TYPE_TEMP,
                    c = vk.id,
                    l = void 0,
                    h = {},
                    p = window.AudioPage && currentAudioPage(t);
                if ((window.traverseParent || function(t, e) {
                        for (t = ge(t); t && !e(t) && (t = domPN(t)) != document;);
                        return null
                    })(t, function(t) {
                        return d = domData(t, "audio-context")
                    }), d = (d = r.context || d) || ("audio" == cur.module ? cur.submodule : cur.module), e) return {
                    context: d
                };
                var y = AudioUtils.contextSplit(d),
                    b = _(y, 2),
                    g = b[0],
                    v = b[1],
                    m = gpeByClass("_audio_pl", t);
                if (m) {
                    var A = (domData(m, "playlist-id") || "").split("_");
                    u = i.getPlaylist.apply(i, A);
                    var w = domData(m, "title") || "";
                    w && u.mergeWith({
                        title: clean(w)
                    });
                    var E = domData(m, "access-hash") || "";
                    E && u.mergeWith({
                        accessHash: E
                    }), p && p.getPageCurrentPlaylist() == u && p.getSortedList() ? u.initSortedList(p.getSortedList()) : r.isFromCurrentPlaylist || (u.removeSortedList(), u.shuffle(0)), "music_2018_top_audios" === d && (o = [geByClass1("audio_recoms_audios_block")])
                } else if (p && p.getPageCurrentPlaylist()) u = p.getPageCurrentPlaylist();
                else if ("module" == g) {
                    var P = v;
                    u = i.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, P || cur.oid || vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID), o = [a]
                } else if (0 === r.context.indexOf("admin"))(u = i.getPlaylist.apply(i, [AudioPlaylist.TYPE_PLAYLIST].concat(function(t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                        return i
                    }
                    return Array.from(t)
                }(r.album)))).getAudiosCount() || u.setForceReload(!0);
                else if (0 === r.context.indexOf("im")) a = (a = gpeByClass("_im_peer_history", t)) || gpeByClass("_fc_tab_log_msgs", t), l = "im" + (cur.peer || "");
                else if (0 === r.context.indexOf("board")) l = r.context, o = n(geByClass("_wall_audio_rows", a));
                else if (0 === r.context.indexOf("widget")) l = r.context;
                else if (0 === r.context.indexOf("wiki")) l = "wiki";
                else if (0 === r.context.indexOf("post")) {
                    f = AudioPlaylist.TYPE_WALL, l = r.context;
                    var S = r.context.replace("post", "").split("_");
                    c = S[0], h = {
                        postId: S[1]
                    }
                } else if (0 === r.context.indexOf("choose")) l = r.context;
                else if ("feed" == s || 0 === r.context.indexOf("feed") || 0 === r.context.indexOf("feedsearch")) l = "feed", o = n(geByClass("wall_text", a));
                else if ("group_wall" == g || "user_wall" == g || 0 === r.context.indexOf("reply") || "wall" == s) {
                    f = AudioPlaylist.TYPE_WALL, c = cur.oid;
                    var I = (v || "").split("_")[1],
                        T = cur.wallQuery || "",
                        M = ge("wall_search"),
                        C = inArray(cur.wallType, ["own", "full_own"]) ? "own" : "all";
                    l = hashCode(C + "_" + T), "wall" == cur.module && val(M) && (T = val(M)), I && (h = {
                        postId: I,
                        wallQuery: T,
                        wallType: C
                    }), 0 === r.context.indexOf("reply") && (o = n([gpeByClass("_replies_list", t)]), l = "reply" + l), o = o.concat(n([a]))
                } else "article" == g && (u = cur.articlePlaylist);
                return a || (a = domPN(t)), (o = o.filter(function(t) {
                    return !!t
                })) && 0 != o.length || (o = [a]), (u = (u = u || i.getPlaylist(f, c, l)).getAudiosCount() ? u : AudioUtils.initDomPlaylist(u, o)).mergeWith(h || {}), -1 == u.indexOfAudio(r) && (u = AudioUtils.initDomPlaylist(u, [domPN(t)])), {
                    playlist: u,
                    context: d
                }
            },
            renderAudioDiag: function() {
                var t = ge("audio_diag_log"),
                    e = ls.get(AudioUtils.LOG_LS_KEY) || [];
                t && each(e, function(e, i) {
                    var r = new Date(i.shift()).toUTCString();
                    i = i.join(", "), t.appendChild(se('<div class="audio_diag_log_row"><span class="audio_diag_log_time">' + r + "</span>" + i + "</div>"))
                })
            },
            claim: function(t, e, i) {
                addClass(e, "audio_moder_claimed"), AudioUtils.onRowOver(e, !1, !0), t = AudioUtils.asObject(t), ajax.post("al_claims.php", {
                    act: "a_claim",
                    claim_id: i,
                    type: "audio",
                    id: t.id,
                    owner_id: t.ownerId
                })
            },
            unclaim: function(t, e, i) {
                removeClass(e, "audio_moder_claimed"), AudioUtils.onRowOver(e, !1, !0), t = AudioUtils.asObject(t), ajax.post("al_claims.php", {
                    act: "a_unclaim",
                    claim_id: i,
                    type: "audio",
                    id: t.id,
                    owner_id: t.ownerId,
                    hash: t.actionHash
                })
            },
            getUMAInfo: function(t, e) {
                e.isInEditBox || showBox("al_audio.php", {
                    act: "get_uma_restrictions",
                    id: e.id,
                    owner_id: e.owner_id,
                    hash: e.actionHash
                }, {
                    params: {
                        width: 750
                    }
                })
            },
            getUMAInfoAlbum: function(t, e) {
                e.isInEditBox || showBox("al_audio.php", {
                    act: "get_uma_restrictions_album",
                    playlist_raw_id: t
                }, {
                    params: {
                        width: 750
                    }
                })
            },
            cancelReplacement: function(t, e, i) {
                ajax.post("al_audio.php", {
                    act: "cancel_replacement",
                    hash: e,
                    audio_id: t
                }), re(i)
            },
            removeFromGroup: function(t, e, i) {
                var r = t + "_" + e;
                if (cur.audioPage._ownerId < 0) var n = window.showBox("al_audio.php", {
                    act: "delete_from_group_box",
                    playlist_id: r,
                    group_id: -cur.audioPage._ownerId
                }).setButtons(getLang("global_yes"), function() {
                    ajax.post("al_audio.php", {
                        act: "delete_from_group",
                        group_id: -cur.audioPage._ownerId,
                        hash: i,
                        playlist_id: r
                    }, {
                        onDone: function(t) {
                            n.hide(), showDoneBox(t)
                        },
                        onFail: function(t) {
                            return n.hide(), showDoneBox(t), !0
                        }
                    })
                }, getLang("global_cancel"), function() {
                    return n.hide()
                }).show()
            },
            addToGroupBox: function(t, e, i) {
                var r = t + "_" + e,
                    n = window.showBox("al_audio.php", {
                        act: "add_to_groups_box",
                        playlist_id: r,
                        access_hash: i
                    }).setButtons(getLang("Save"), function() {
                        var t = [];
                        for (var e in cur.wdd.follow_playlist_wwd.selected) t.push(cur.wdd.follow_playlist_wwd.selected[e][0]);
                        t.length && (ge("add_playlist_to_group_fail").innerHTML = "", ajax.post("al_audio.php", {
                            act: "add_to_group",
                            group_ids: t,
                            hash: ge("add_playlist_to_group_hash").value,
                            playlist_id: r
                        }, {
                            onDone: function(t) {
                                n.hide(), showDoneBox(t)
                            },
                            onFail: function(t) {
                                return ge("add_playlist_to_group_fail").innerHTML = t, !0
                            }
                        }))
                    })
            },
            showAudioRestriction: function(t) {
                if (!t) return !1;
                if ((t = p(t)).restrictionStatus) {
                    if (t.actionHash) {
                        statlogsValueEvent("audio_restriction_popup", "show", t.restrictionStatus);
                        var e = showBox("al_audio.php", {
                            act: "restriction_box",
                            audio_id: t.id,
                            owner_id: t.owner_id,
                            hash: t.actionHash
                        }, {
                            params: {
                                hideButtons: !0,
                                onShow: function() {
                                    var e = curBox();
                                    e && e.once("click:ok", function() {
                                        statlogsValueEvent("audio_restriction_popup", "click", t.restrictionStatus)
                                    })
                                },
                                onHide: function(e) {
                                    e || statlogsValueEvent("audio_restriction_popup", "hide", t.restrictionStatus)
                                }
                            },
                            containerClass: "audio_restriction_box audio_restriction_box_type_" + t.restrictionStatus,
                            onDone: function(e, i) {
                                if (i && i.play) {
                                    e.hide();
                                    var r = function(t) {
                                            var e = geByClass("_audio_row_" + t.fullId);
                                            if (!e || !e.length) return !1;
                                            var i = k(D(e[0], "audio"));
                                            if (!i) return !1;
                                            var r = k(i[n.AUDIO_ITEM_INDEX_EXTRA]);
                                            r && delete r.claim, i[n.AUDIO_ITEM_INDEX_RESTRICTION] = 0, i[n.AUDIO_ITEM_INDEX_FLAGS] &= ~n.AUDIO_ITEM_CLAIMED_BIT, i[n.AUDIO_ITEM_INDEX_EXTRA] = JSON.stringify(r);
                                            var a = L().getCurrentPlaylist(),
                                                o = se(l(i, "no_extra"));
                                            if (a) {
                                                var s = i[n.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + i[n.AUDIO_ITEM_INDEX_ID],
                                                    d = a.getAudio(s);
                                                d && (d[n.AUDIO_ITEM_INDEX_RESTRICTION] = i[n.AUDIO_ITEM_INDEX_RESTRICTION], d[n.AUDIO_ITEM_INDEX_FLAGS] = i[n.AUDIO_ITEM_INDEX_FLAGS], d[n.AUDIO_ITEM_INDEX_EXTRA] = i[n.AUDIO_ITEM_INDEX_EXTRA])
                                            }
                                            return each(e, function(t, e) {
                                                var r = t > 0 ? se(l(i, "no_extra")) : o;
                                                e.parentElement.insertBefore(r, e), e.parentElement.removeChild(e)
                                            }), o
                                        }(i.audio ? p(i.audio) : t),
                                        a = L();
                                    r && a.toggleAudio(r, {
                                        target: r
                                    })
                                }
                            },
                            onFail: function() {
                                e && e.hide(), O(t)
                            }
                        })
                    } else O(t);
                    return !0
                }
                return !1
            },
            isPodcast: function(t) {
                if (!t) return !1;
                var e = isObject(t) ? t.extra : t[AudioUtils.AUDIO_ITEM_INDEX_EXTRA];
                return isObject(e) || (e = JSON.parse(e || "{}")), !!e.podcast
            },
            isPrivatePodcast: function(t) {
                return !(!AudioUtils.isPodcast(t) || !AudioUtils.getAudioExtra(t).private)
            },
            PodcastsLogs: r,
            copyPlaylistLink: function(t, e, i) {
                var r = location.protocol + "//" + location.host + "/music?z=audio_playlist" + t + "_" + e;
                i && (r += "/" + i), statlogsValueEvent("audio_copy_link", vk.id), Object(w.b)(r), showDoneBox(getLang("audio_playlist_link_copied"))
            },
            connectListenQueue: M,
            getAlbumParts: function(t) {
                if (t && t.getAudiosCount() && t.isFullyLoadable() && !t.hasMore()) {
                    for (var e = t.getAudiosList(), i = t.getAudiosCount(), r = [], a = 0, o = 0; o < i; o++) {
                        var s = e[o][n.AUDIO_ITEM_INDEX_ALBUM_PART];
                        s > a && (a = s, r.push({
                            number: s,
                            offset: o
                        }))
                    }
                    if (r.length > 1) return r
                }
                return !1
            },
            drawAlbumPartRow: function(t) {
                return '<div class="audio_album_part_row">' + getLang("audio_album_part").replace("{part}", t) + "</div>"
            },
            onRowOver: a.a,
            onRowLeave: function(t) {
                data(t, "leaved", !0);
                var e = data(t, "tt");
                if ((!e || !e.isShown()) && (clearTimeout(window.audioRowHoverTO), data(t, "actions"))) {
                    var i = geByClass1("_audio_row__actions", t),
                        r = geByClass1("_audio_row__duration", t);
                    re(i), setStyle(r, "visibility", "visible"), data(t, "actions", 0)
                }
            },
            onAudioAddedToPlaylist: function(t, e, i, r) {
                getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, e).addAudio(r, 0), each(geByClass("_audio_pl_" + t + "_" + e), function(t, e) {
                    domReplaceEl(e, se(i))
                })
            },
            onAudioChoose: function(t, e, i, r) {
                if (isUndefined(e.selected)) {
                    var n = cur.attachCount && cur.attachCount() || 0;
                    if (cur.chooseMedia("audio", i.fullId, r), (!cur.attachCount || cur.attachCount() > n) && cur.lastAddMedia) {
                        e.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(e), "audio_selected");
                        var a = getSize(e)[0];
                        setStyle(e, "width", a), e.innerHTML = getLang("global_cancel")
                    }
                } else cur.lastAddMedia.unchooseMedia(e.selected), e.selected = void 0, removeClass(domPN(e), "audio_selected"), e.innerHTML = getLang("global_add_media");
                return cancelEvent(t)
            },
            onPlaylistChoose: function(t, e) {
                var i = e.getAccessHash();
                cur.chooseMedia("audio_playlist", e.getOwnerId() + "_" + e.getPlaylistId() + (i ? ":" + i : ""), {
                    id: e.getPlaylistId(),
                    ownerId: e.getOwnerId(),
                    coverUrl: e.getCoverUrl(),
                    gridCovers: e.getGridCovers(),
                    title: e.getTitle(),
                    authorName: e.getAuthorName(),
                    authorHref: e.getAuthorHref(),
                    accessHash: e.getAccessHash()
                })
            },
            _showPlaylistsChooser: function(t, e, i, r, n, a) {
                var o = i.playlists,
                    s = i.newPlaylistHash,
                    d = i.morePlaylists;
                AudioUtils.copiedToPlaylistAudios = AudioUtils.copiedToPlaylistAudios || {}, AudioUtils.copiedToPlaylistAudiosHashes = AudioUtils.copiedToPlaylistAudiosHashes || {};
                var u = e,
                    f = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_new", 0, getLang("audio_add_to_new_pl"), "audio_row__action_playlist"]));
                if (domInsertAfter(f, u), u = f, f.addEventListener("click", function() {
                        AudioUtils.editPlaylist(r, !1, "edit", {
                            addAudio: a,
                            newPlaylistHash: s
                        })
                    }), each(o, function(t, e) {
                        var i = !0,
                            r = e[0] + "_" + e[1] + "_" + n.fullId,
                            a = AudioUtils.copiedToPlaylistAudios[r],
                            o = "audio_row__action_playlist";
                        (e[3] || a) && (i = !1, o += " audio_row__more_playlist_added");
                        var s = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_" + e[0] + "_" + e[1], 0, e[2], o]));
                        domInsertAfter(s, u), u = s;
                        var d = !1;
                        s.addEventListener("click", function() {
                            if (!d) {
                                d = !0;
                                var t = n.ownerId,
                                    a = n.id,
                                    o = AudioUtils.copiedToPlaylistAudios[r];
                                o && (t = (o = o.split("_"))[0], a = o[1]), i && (AudioUtils.copiedToPlaylistAudiosHashes[r] = e[4]), ajax.post("al_audio.php", {
                                    act: "add_audio_to_playlist",
                                    hash: e[4],
                                    playlist_id: e[1],
                                    playlist_owner_id: e[0],
                                    audio_owner_id: t,
                                    audio_id: a,
                                    do_add: intval(i)
                                }, {
                                    onDone: function(t, n, a) {
                                        AudioUtils.copiedToPlaylistAudios[r] = !!i && a, e[4] = i ? t : AudioUtils.copiedToPlaylistAudiosHashes[r], i = !i, d = !1
                                    }
                                }), toggleClass(s, "audio_row__more_playlist_added", i)
                            }
                        })
                    }), d) {
                    var c = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_more", 0, getLang("audio_row_show_all_playlists"), "audio_row__action_playlist"]));
                    c.addEventListener("click", function() {
                        showBox("al_audio.php?act=more_playlists_add", {
                            owner_id: r,
                            audio_owner_id: n.ownerId,
                            audio_id: n.id
                        }, {
                            params: {
                                bodyStyle: "padding: 0px",
                                width: 560
                            }
                        })
                    }), domInsertAfter(c, u), u = c
                }
                t.updatePosition()
            },
            debugLog: function() {}
        });
        var U = window.AudioUtils
    },
    qVij: function(t, e, i) {
        (function(e) {
            var r = i("OZ/i"),
                n = i("Edxu");

            function a(t, i) {
                var n = function(t) {
                        var e = o(t);
                        return {
                            blinder: e.toRed(r.mont(t.modulus)).redPow(new r(t.publicExponent)).fromRed(),
                            unblinder: e.invm(t.modulus)
                        }
                    }(i),
                    a = i.modulus.byteLength(),
                    s = (r.mont(i.modulus), new r(t).mul(n.blinder).umod(i.modulus)),
                    d = s.toRed(r.mont(i.prime1)),
                    u = s.toRed(r.mont(i.prime2)),
                    f = i.coefficient,
                    c = i.prime1,
                    l = i.prime2,
                    h = d.redPow(i.exponent1),
                    p = u.redPow(i.exponent2);
                h = h.fromRed(), p = p.fromRed();
                var _ = h.isub(p).imul(f).umod(c);
                return _.imul(l), p.iadd(_), new e(p.imul(n.unblinder).umod(i.modulus).toArray(!1, a))
            }

            function o(t) {
                for (var e = t.modulus.byteLength(), i = new r(n(e)); i.cmp(t.modulus) >= 0 || !i.umod(t.prime1) || !i.umod(t.prime2);) i = new r(n(e));
                return i
            }
            t.exports = a, a.getr = o
        }).call(this, i("tjlA").Buffer)
    },
    qiJe: function(t, e, i) {
        "use strict";
        var r = i("hwdV").Buffer,
            n = r.isEncoding || function(t) {
                switch ((t = "" + t) && t.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return !0;
                    default:
                        return !1
                }
            };

        function a(t) {
            var e;
            switch (this.encoding = function(t) {
                var e = function(t) {
                    if (!t) return "utf8";
                    for (var e;;) switch (t) {
                        case "utf8":
                        case "utf-8":
                            return "utf8";
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return "utf16le";
                        case "latin1":
                        case "binary":
                            return "latin1";
                        case "base64":
                        case "ascii":
                        case "hex":
                            return t;
                        default:
                            if (e) return;
                            t = ("" + t).toLowerCase(), e = !0
                    }
                }(t);
                if ("string" != typeof e && (r.isEncoding === n || !n(t))) throw new Error("Unknown encoding: " + t);
                return e || t
            }(t), this.encoding) {
                case "utf16le":
                    this.text = d, this.end = u, e = 4;
                    break;
                case "utf8":
                    this.fillLast = s, e = 4;
                    break;
                case "base64":
                    this.text = f, this.end = c, e = 3;
                    break;
                default:
                    return this.write = l, void(this.end = h)
            }
            this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(e)
        }

        function o(t) {
            return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2
        }

        function s(t) {
            var e = this.lastTotal - this.lastNeed,
                i = function(t, e, i) {
                    if (128 != (192 & e[0])) return t.lastNeed = 0, "�";
                    if (t.lastNeed > 1 && e.length > 1) {
                        if (128 != (192 & e[1])) return t.lastNeed = 1, "�";
                        if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�"
                    }
                }(this, t);
            return void 0 !== i ? i : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void(this.lastNeed -= t.length))
        }

        function d(t, e) {
            if ((t.length - e) % 2 == 0) {
                var i = t.toString("utf16le", e);
                if (i) {
                    var r = i.charCodeAt(i.length - 1);
                    if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], i.slice(0, -1)
                }
                return i
            }
            return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
        }

        function u(t) {
            var e = t && t.length ? this.write(t) : "";
            if (this.lastNeed) {
                var i = this.lastTotal - this.lastNeed;
                return e + this.lastChar.toString("utf16le", 0, i)
            }
            return e
        }

        function f(t, e) {
            var i = (t.length - e) % 3;
            return 0 === i ? t.toString("base64", e) : (this.lastNeed = 3 - i, this.lastTotal = 3, 1 === i ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - i))
        }

        function c(t) {
            var e = t && t.length ? this.write(t) : "";
            return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
        }

        function l(t) {
            return t.toString(this.encoding)
        }

        function h(t) {
            return t && t.length ? this.write(t) : ""
        }
        e.StringDecoder = a, a.prototype.write = function(t) {
            if (0 === t.length) return "";
            var e, i;
            if (this.lastNeed) {
                if (void 0 === (e = this.fillLast(t))) return "";
                i = this.lastNeed, this.lastNeed = 0
            } else i = 0;
            return i < t.length ? e ? e + this.text(t, i) : this.text(t, i) : e || ""
        }, a.prototype.end = function(t) {
            var e = t && t.length ? this.write(t) : "";
            return this.lastNeed ? e + "�" : e
        }, a.prototype.text = function(t, e) {
            var i = function(t, e, i) {
                var r = e.length - 1;
                if (r < i) return 0;
                var n = o(e[r]);
                if (n >= 0) return n > 0 && (t.lastNeed = n - 1), n;
                if (--r < i || -2 === n) return 0;
                if ((n = o(e[r])) >= 0) return n > 0 && (t.lastNeed = n - 2), n;
                if (--r < i || -2 === n) return 0;
                if ((n = o(e[r])) >= 0) return n > 0 && (2 === n ? n = 0 : t.lastNeed = n - 3), n;
                return 0
            }(this, t, e);
            if (!this.lastNeed) return t.toString("utf8", e);
            this.lastTotal = i;
            var r = t.length - (i - this.lastNeed);
            return t.copy(this.lastChar, 0, r), t.toString("utf8", e, r)
        }, a.prototype.fillLast = function(t) {
            if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
        }
    },
    qlaj: function(t, e, i) {
        "use strict";
        var r = i("w8CP").rotr32;

        function n(t, e, i) {
            return t & e ^ ~t & i
        }

        function a(t, e, i) {
            return t & e ^ t & i ^ e & i
        }

        function o(t, e, i) {
            return t ^ e ^ i
        }
        e.ft_1 = function(t, e, i, r) {
            return 0 === t ? n(e, i, r) : 1 === t || 3 === t ? o(e, i, r) : 2 === t ? a(e, i, r) : void 0
        }, e.ch32 = n, e.maj32 = a, e.p32 = o, e.s0_256 = function(t) {
            return r(t, 2) ^ r(t, 13) ^ r(t, 22)
        }, e.s1_256 = function(t) {
            return r(t, 6) ^ r(t, 11) ^ r(t, 25)
        }, e.g0_256 = function(t) {
            return r(t, 7) ^ r(t, 18) ^ t >>> 3
        }, e.g1_256 = function(t) {
            return r(t, 17) ^ r(t, 19) ^ t >>> 10
        }
    },
    rSVQ: function(t, e, i) {
        (function(e) {
            var r = i("Ku4m"),
                n = i("Edxu"),
                a = i("mObS"),
                o = i("9GDS"),
                s = i("g9U9"),
                d = i("OZ/i"),
                u = i("UpF+"),
                f = i("qVij");
            t.exports = function(t, i, c) {
                var l;
                l = t.padding ? t.padding : c ? 1 : 4;
                var h, p = r(t);
                if (4 === l) h = function(t, i) {
                    var r = t.modulus.byteLength(),
                        u = i.length,
                        f = a("sha1").update(new e("")).digest(),
                        c = f.length,
                        l = 2 * c;
                    if (u > r - l - 2) throw new Error("message too long");
                    var h = new e(r - u - l - 2);
                    h.fill(0);
                    var p = r - c - 1,
                        _ = n(c),
                        y = s(e.concat([f, h, new e([1]), i], p), o(_, p)),
                        b = s(_, o(y, c));
                    return new d(e.concat([new e([0]), b, y], r))
                }(p, i);
                else if (1 === l) h = function(t, i, r) {
                    var a, o = i.length,
                        s = t.modulus.byteLength();
                    if (o > s - 11) throw new Error("message too long");
                    r ? (a = new e(s - o - 3)).fill(255) : a = function(t, i) {
                        var r, a = new e(t),
                            o = 0,
                            s = n(2 * t),
                            d = 0;
                        for (; o < t;) d === s.length && (s = n(2 * t), d = 0), (r = s[d++]) && (a[o++] = r);
                        return a
                    }(s - o - 3);
                    return new d(e.concat([new e([0, r ? 1 : 2]), a, new e([0]), i], s))
                }(p, i, c);
                else {
                    if (3 !== l) throw new Error("unknown padding");
                    if ((h = new d(i)).cmp(p.modulus) >= 0) throw new Error("data too long for modulus")
                }
                return c ? f(h, p) : u(h, p)
            }
        }).call(this, i("tjlA").Buffer)
    },
    rXFu: function(t, e, i) {
        "use strict";
        (function(e, r) {
            var n = i("acAU");
            t.exports = v;
            var a, o = i("49sm");
            v.ReadableState = g;
            i("+qE3").EventEmitter;
            var s = function(t, e) {
                    return t.listeners(e).length
                },
                d = i("QpuX"),
                u = i("hwdV").Buffer,
                f = e.Uint8Array || function() {};
            var c = i("Onz0");
            c.inherits = i("P7XM");
            var l = i(60),
                h = void 0;
            h = l && l.debuglog ? l.debuglog("stream") : function() {};
            var p, _ = i("Xhqo"),
                y = i("RoFp");
            c.inherits(v, d);
            var b = ["error", "close", "destroy", "pause", "resume"];

            function g(t, e) {
                a = a || i("sZro"), t = t || {};
                var r = e instanceof a;
                this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
                var n = t.highWaterMark,
                    o = t.readableHighWaterMark,
                    s = this.objectMode ? 16 : 16384;
                this.highWaterMark = n || 0 === n ? n : r && (o || 0 === o) ? o : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new _, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (p || (p = i("qiJe").StringDecoder), this.decoder = new p(t.encoding), this.encoding = t.encoding)
            }

            function v(t) {
                if (a = a || i("sZro"), !(this instanceof v)) return new v(t);
                this._readableState = new g(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), d.call(this)
            }

            function m(t, e, i, r, n) {
                var a, o = t._readableState;
                null === e ? (o.reading = !1, function(t, e) {
                    if (e.ended) return;
                    if (e.decoder) {
                        var i = e.decoder.end();
                        i && i.length && (e.buffer.push(i), e.length += e.objectMode ? 1 : i.length)
                    }
                    e.ended = !0, P(t)
                }(t, o)) : (n || (a = function(t, e) {
                    var i;
                    r = e, u.isBuffer(r) || r instanceof f || "string" == typeof e || void 0 === e || t.objectMode || (i = new TypeError("Invalid non-string/buffer chunk"));
                    var r;
                    return i
                }(o, e)), a ? t.emit("error", a) : o.objectMode || e && e.length > 0 ? ("string" == typeof e || o.objectMode || Object.getPrototypeOf(e) === u.prototype || (e = function(t) {
                    return u.from(t)
                }(e)), r ? o.endEmitted ? t.emit("error", new Error("stream.unshift() after end event")) : A(t, o, e, !0) : o.ended ? t.emit("error", new Error("stream.push() after EOF")) : (o.reading = !1, o.decoder && !i ? (e = o.decoder.write(e), o.objectMode || 0 !== e.length ? A(t, o, e, !1) : I(t, o)) : A(t, o, e, !1))) : r || (o.reading = !1));
                return function(t) {
                    return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
                }(o)
            }

            function A(t, e, i, r) {
                e.flowing && 0 === e.length && !e.sync ? (t.emit("data", i), t.read(0)) : (e.length += e.objectMode ? 1 : i.length, r ? e.buffer.unshift(i) : e.buffer.push(i), e.needReadable && P(t)), I(t, e)
            }
            Object.defineProperty(v.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._readableState && this._readableState.destroyed
                },
                set: function(t) {
                    this._readableState && (this._readableState.destroyed = t)
                }
            }), v.prototype.destroy = y.destroy, v.prototype._undestroy = y.undestroy, v.prototype._destroy = function(t, e) {
                this.push(null), e(t)
            }, v.prototype.push = function(t, e) {
                var i, r = this._readableState;
                return r.objectMode ? i = !0 : "string" == typeof t && ((e = e || r.defaultEncoding) !== r.encoding && (t = u.from(t, e), e = ""), i = !0), m(this, t, e, !1, i)
            }, v.prototype.unshift = function(t) {
                return m(this, t, null, !0, !1)
            }, v.prototype.isPaused = function() {
                return !1 === this._readableState.flowing
            }, v.prototype.setEncoding = function(t) {
                return p || (p = i("qiJe").StringDecoder), this._readableState.decoder = new p(t), this._readableState.encoding = t, this
            };
            var w = 8388608;

            function E(t, e) {
                return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = function(t) {
                    return t >= w ? t = w : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t
                }(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
            }

            function P(t) {
                var e = t._readableState;
                e.needReadable = !1, e.emittedReadable || (h("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? n.nextTick(S, t) : S(t))
            }

            function S(t) {
                h("emit readable"), t.emit("readable"), k(t)
            }

            function I(t, e) {
                e.readingMore || (e.readingMore = !0, n.nextTick(T, t, e))
            }

            function T(t, e) {
                for (var i = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (h("maybeReadMore read 0"), t.read(0), i !== e.length);) i = e.length;
                e.readingMore = !1
            }

            function M(t) {
                h("readable nexttick read 0"), t.read(0)
            }

            function C(t, e) {
                e.reading || (h("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), k(t), e.flowing && !e.reading && t.read(0)
            }

            function k(t) {
                var e = t._readableState;
                for (h("flow", e.flowing); e.flowing && null !== t.read(););
            }

            function D(t, e) {
                return 0 === e.length ? null : (e.objectMode ? i = e.buffer.shift() : !t || t >= e.length ? (i = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : i = function(t, e, i) {
                    var r;
                    t < e.head.data.length ? (r = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : r = t === e.head.data.length ? e.shift() : i ? function(t, e) {
                        var i = e.head,
                            r = 1,
                            n = i.data;
                        t -= n.length;
                        for (; i = i.next;) {
                            var a = i.data,
                                o = t > a.length ? a.length : t;
                            if (o === a.length ? n += a : n += a.slice(0, t), 0 === (t -= o)) {
                                o === a.length ? (++r, i.next ? e.head = i.next : e.head = e.tail = null) : (e.head = i, i.data = a.slice(o));
                                break
                            }++r
                        }
                        return e.length -= r, n
                    }(t, e) : function(t, e) {
                        var i = u.allocUnsafe(t),
                            r = e.head,
                            n = 1;
                        r.data.copy(i), t -= r.data.length;
                        for (; r = r.next;) {
                            var a = r.data,
                                o = t > a.length ? a.length : t;
                            if (a.copy(i, i.length - t, 0, o), 0 === (t -= o)) {
                                o === a.length ? (++n, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = a.slice(o));
                                break
                            }++n
                        }
                        return e.length -= n, i
                    }(t, e);
                    return r
                }(t, e.buffer, e.decoder), i);
                var i
            }

            function L(t) {
                var e = t._readableState;
                if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                e.endEmitted || (e.ended = !0, n.nextTick(O, e, t))
            }

            function O(t, e) {
                t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
            }

            function x(t, e) {
                for (var i = 0, r = t.length; i < r; i++)
                    if (t[i] === e) return i;
                return -1
            }
            v.prototype.read = function(t) {
                h("read", t), t = parseInt(t, 10);
                var e = this._readableState,
                    i = t;
                if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return h("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? L(this) : P(this), null;
                if (0 === (t = E(t, e)) && e.ended) return 0 === e.length && L(this), null;
                var r, n = e.needReadable;
                return h("need readable", n), (0 === e.length || e.length - t < e.highWaterMark) && h("length less than watermark", n = !0), e.ended || e.reading ? h("reading or ended", n = !1) : n && (h("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = E(i, e))), null === (r = t > 0 ? D(t, e) : null) ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), i !== t && e.ended && L(this)), null !== r && this.emit("data", r), r
            }, v.prototype._read = function(t) {
                this.emit("error", new Error("_read() is not implemented"))
            }, v.prototype.pipe = function(t, e) {
                var i = this,
                    a = this._readableState;
                switch (a.pipesCount) {
                    case 0:
                        a.pipes = t;
                        break;
                    case 1:
                        a.pipes = [a.pipes, t];
                        break;
                    default:
                        a.pipes.push(t)
                }
                a.pipesCount += 1, h("pipe count=%d opts=%j", a.pipesCount, e);
                var d = (!e || !1 !== e.end) && t !== r.stdout && t !== r.stderr ? f : v;

                function u(e, r) {
                    h("onunpipe"), e === i && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, h("cleanup"), t.removeListener("close", b), t.removeListener("finish", g), t.removeListener("drain", c), t.removeListener("error", y), t.removeListener("unpipe", u), i.removeListener("end", f), i.removeListener("end", v), i.removeListener("data", _), l = !0, !a.awaitDrain || t._writableState && !t._writableState.needDrain || c())
                }

                function f() {
                    h("onend"), t.end()
                }
                a.endEmitted ? n.nextTick(d) : i.once("end", d), t.on("unpipe", u);
                var c = function(t) {
                    return function() {
                        var e = t._readableState;
                        h("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && s(t, "data") && (e.flowing = !0, k(t))
                    }
                }(i);
                t.on("drain", c);
                var l = !1;
                var p = !1;

                function _(e) {
                    h("ondata"), p = !1, !1 !== t.write(e) || p || ((1 === a.pipesCount && a.pipes === t || a.pipesCount > 1 && -1 !== x(a.pipes, t)) && !l && (h("false write response, pause", i._readableState.awaitDrain), i._readableState.awaitDrain++, p = !0), i.pause())
                }

                function y(e) {
                    h("onerror", e), v(), t.removeListener("error", y), 0 === s(t, "error") && t.emit("error", e)
                }

                function b() {
                    t.removeListener("finish", g), v()
                }

                function g() {
                    h("onfinish"), t.removeListener("close", b), v()
                }

                function v() {
                    h("unpipe"), i.unpipe(t)
                }
                return i.on("data", _),
                    function(t, e, i) {
                        if ("function" == typeof t.prependListener) return t.prependListener(e, i);
                        t._events && t._events[e] ? o(t._events[e]) ? t._events[e].unshift(i) : t._events[e] = [i, t._events[e]] : t.on(e, i)
                    }(t, "error", y), t.once("close", b), t.once("finish", g), t.emit("pipe", i), a.flowing || (h("pipe resume"), i.resume()), t
            }, v.prototype.unpipe = function(t) {
                var e = this._readableState,
                    i = {
                        hasUnpiped: !1
                    };
                if (0 === e.pipesCount) return this;
                if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, i), this);
                if (!t) {
                    var r = e.pipes,
                        n = e.pipesCount;
                    e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                    for (var a = 0; a < n; a++) r[a].emit("unpipe", this, i);
                    return this
                }
                var o = x(e.pipes, t);
                return -1 === o ? this : (e.pipes.splice(o, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this, i), this)
            }, v.prototype.on = function(t, e) {
                var i = d.prototype.on.call(this, t, e);
                if ("data" === t) !1 !== this._readableState.flowing && this.resume();
                else if ("readable" === t) {
                    var r = this._readableState;
                    r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && P(this) : n.nextTick(M, this))
                }
                return i
            }, v.prototype.addListener = v.prototype.on, v.prototype.resume = function() {
                var t = this._readableState;
                return t.flowing || (h("resume"), t.flowing = !0, function(t, e) {
                    e.resumeScheduled || (e.resumeScheduled = !0, n.nextTick(C, t, e))
                }(this, t)), this
            }, v.prototype.pause = function() {
                return h("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (h("pause"), this._readableState.flowing = !1, this.emit("pause")), this
            }, v.prototype.wrap = function(t) {
                var e = this,
                    i = this._readableState,
                    r = !1;
                for (var n in t.on("end", function() {
                        if (h("wrapped end"), i.decoder && !i.ended) {
                            var t = i.decoder.end();
                            t && t.length && e.push(t)
                        }
                        e.push(null)
                    }), t.on("data", function(n) {
                        (h("wrapped data"), i.decoder && (n = i.decoder.write(n)), !i.objectMode || null !== n && void 0 !== n) && ((i.objectMode || n && n.length) && (e.push(n) || (r = !0, t.pause())))
                    }), t) void 0 === this[n] && "function" == typeof t[n] && (this[n] = function(e) {
                    return function() {
                        return t[e].apply(t, arguments)
                    }
                }(n));
                for (var a = 0; a < b.length; a++) t.on(b[a], this.emit.bind(this, b[a]));
                return this._read = function(e) {
                    h("wrapped _read", e), r && (r = !1, t.resume())
                }, this
            }, Object.defineProperty(v.prototype, "readableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._readableState.highWaterMark
                }
            }), v._fromList = D
        }).call(this, i("yLpj"), i("8oxB"))
    },
    roQf: function(t, e, i) {
        var r = i("hwdV").Buffer,
            n = i("9XZ3");
        t.exports = function(t, e, i, a) {
            if (r.isBuffer(t) || (t = r.from(t, "binary")), e && (r.isBuffer(e) || (e = r.from(e, "binary")), 8 !== e.length)) throw new RangeError("salt should be Buffer with 8 byte length");
            for (var o = i / 8, s = r.alloc(o), d = r.alloc(a || 0), u = r.alloc(0); o > 0 || a > 0;) {
                var f = new n;
                f.update(u), f.update(t), e && f.update(e), u = f.digest();
                var c = 0;
                if (o > 0) {
                    var l = s.length - o;
                    c = Math.min(o, u.length), u.copy(s, l, 0, c), o -= c
                }
                if (c < u.length && a > 0) {
                    var h = d.length - a,
                        p = Math.min(a, u.length - c);
                    u.copy(d, h, c, c + p), a -= p
                }
            }
            return u.fill(0), {
                key: s,
                iv: d
            }
        }
    },
    sZro: function(t, e, i) {
        "use strict";
        var r = i("acAU"),
            n = Object.keys || function(t) {
                var e = [];
                for (var i in t) e.push(i);
                return e
            };
        t.exports = c;
        var a = i("Onz0");
        a.inherits = i("P7XM");
        var o = i("rXFu"),
            s = i("3BRs");
        a.inherits(c, o);
        for (var d = n(s.prototype), u = 0; u < d.length; u++) {
            var f = d[u];
            c.prototype[f] || (c.prototype[f] = s.prototype[f])
        }

        function c(t) {
            if (!(this instanceof c)) return new c(t);
            o.call(this, t), s.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", l)
        }

        function l() {
            this.allowHalfOpen || this._writableState.ended || r.nextTick(h, this)
        }

        function h(t) {
            t.end()
        }
        Object.defineProperty(c.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function() {
                return this._writableState.highWaterMark
            }
        }), Object.defineProperty(c.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
            },
            set: function(t) {
                void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t)
            }
        }), c.prototype._destroy = function(t, e) {
            this.push(null), this.end(), r.nextTick(e, t)
        }
    },
    t9FE: function(t, e, i) {
        (function(e) {
            function i(t) {
                try {
                    if (!e.localStorage) return !1
                } catch (t) {
                    return !1
                }
                var i = e.localStorage[t];
                return null != i && "true" === String(i).toLowerCase()
            }
            t.exports = function(t, e) {
                if (i("noDeprecation")) return t;
                var r = !1;
                return function() {
                    if (!r) {
                        if (i("throwDeprecation")) throw new Error(e);
                        i("traceDeprecation") ? console.trace(e) : console.warn(e), r = !0
                    }
                    return t.apply(this, arguments)
                }
            }
        }).call(this, i("yLpj"))
    },
    tOiH: function(t) {
        t.exports = {
            sha224WithRSAEncryption: {
                sign: "rsa",
                hash: "sha224",
                id: "302d300d06096086480165030402040500041c"
            },
            "RSA-SHA224": {
                sign: "ecdsa/rsa",
                hash: "sha224",
                id: "302d300d06096086480165030402040500041c"
            },
            sha256WithRSAEncryption: {
                sign: "rsa",
                hash: "sha256",
                id: "3031300d060960864801650304020105000420"
            },
            "RSA-SHA256": {
                sign: "ecdsa/rsa",
                hash: "sha256",
                id: "3031300d060960864801650304020105000420"
            },
            sha384WithRSAEncryption: {
                sign: "rsa",
                hash: "sha384",
                id: "3041300d060960864801650304020205000430"
            },
            "RSA-SHA384": {
                sign: "ecdsa/rsa",
                hash: "sha384",
                id: "3041300d060960864801650304020205000430"
            },
            sha512WithRSAEncryption: {
                sign: "rsa",
                hash: "sha512",
                id: "3051300d060960864801650304020305000440"
            },
            "RSA-SHA512": {
                sign: "ecdsa/rsa",
                hash: "sha512",
                id: "3051300d060960864801650304020305000440"
            },
            "RSA-SHA1": {
                sign: "rsa",
                hash: "sha1",
                id: "3021300906052b0e03021a05000414"
            },
            "ecdsa-with-SHA1": {
                sign: "ecdsa",
                hash: "sha1",
                id: ""
            },
            sha256: {
                sign: "ecdsa",
                hash: "sha256",
                id: ""
            },
            sha224: {
                sign: "ecdsa",
                hash: "sha224",
                id: ""
            },
            sha384: {
                sign: "ecdsa",
                hash: "sha384",
                id: ""
            },
            sha512: {
                sign: "ecdsa",
                hash: "sha512",
                id: ""
            },
            "DSA-SHA": {
                sign: "dsa",
                hash: "sha1",
                id: ""
            },
            "DSA-SHA1": {
                sign: "dsa",
                hash: "sha1",
                id: ""
            },
            DSA: {
                sign: "dsa",
                hash: "sha1",
                id: ""
            },
            "DSA-WITH-SHA224": {
                sign: "dsa",
                hash: "sha224",
                id: ""
            },
            "DSA-SHA224": {
                sign: "dsa",
                hash: "sha224",
                id: ""
            },
            "DSA-WITH-SHA256": {
                sign: "dsa",
                hash: "sha256",
                id: ""
            },
            "DSA-SHA256": {
                sign: "dsa",
                hash: "sha256",
                id: ""
            },
            "DSA-WITH-SHA384": {
                sign: "dsa",
                hash: "sha384",
                id: ""
            },
            "DSA-SHA384": {
                sign: "dsa",
                hash: "sha384",
                id: ""
            },
            "DSA-WITH-SHA512": {
                sign: "dsa",
                hash: "sha512",
                id: ""
            },
            "DSA-SHA512": {
                sign: "dsa",
                hash: "sha512",
                id: ""
            },
            "DSA-RIPEMD160": {
                sign: "dsa",
                hash: "rmd160",
                id: ""
            },
            ripemd160WithRSA: {
                sign: "rsa",
                hash: "rmd160",
                id: "3021300906052b2403020105000414"
            },
            "RSA-RIPEMD160": {
                sign: "rsa",
                hash: "rmd160",
                id: "3021300906052b2403020105000414"
            },
            md5WithRSAEncryption: {
                sign: "rsa",
                hash: "md5",
                id: "3020300c06082a864886f70d020505000410"
            },
            "RSA-MD5": {
                sign: "rsa",
                hash: "md5",
                id: "3020300c06082a864886f70d020505000410"
            }
        }
    },
    tSWc: function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("7ckf"),
            a = i("2j6C"),
            o = r.rotr64_hi,
            s = r.rotr64_lo,
            d = r.shr64_hi,
            u = r.shr64_lo,
            f = r.sum64,
            c = r.sum64_hi,
            l = r.sum64_lo,
            h = r.sum64_4_hi,
            p = r.sum64_4_lo,
            _ = r.sum64_5_hi,
            y = r.sum64_5_lo,
            b = n.BlockHash,
            g = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

        function v() {
            if (!(this instanceof v)) return new v;
            b.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = g, this.W = new Array(160)
        }

        function m(t, e, i, r, n) {
            var a = t & i ^ ~t & n;
            return a < 0 && (a += 4294967296), a
        }

        function A(t, e, i, r, n, a) {
            var o = e & r ^ ~e & a;
            return o < 0 && (o += 4294967296), o
        }

        function w(t, e, i, r, n) {
            var a = t & i ^ t & n ^ i & n;
            return a < 0 && (a += 4294967296), a
        }

        function E(t, e, i, r, n, a) {
            var o = e & r ^ e & a ^ r & a;
            return o < 0 && (o += 4294967296), o
        }

        function P(t, e) {
            var i = o(t, e, 28) ^ o(e, t, 2) ^ o(e, t, 7);
            return i < 0 && (i += 4294967296), i
        }

        function S(t, e) {
            var i = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
            return i < 0 && (i += 4294967296), i
        }

        function I(t, e) {
            var i = o(t, e, 14) ^ o(t, e, 18) ^ o(e, t, 9);
            return i < 0 && (i += 4294967296), i
        }

        function T(t, e) {
            var i = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
            return i < 0 && (i += 4294967296), i
        }

        function M(t, e) {
            var i = o(t, e, 1) ^ o(t, e, 8) ^ d(t, e, 7);
            return i < 0 && (i += 4294967296), i
        }

        function C(t, e) {
            var i = s(t, e, 1) ^ s(t, e, 8) ^ u(t, e, 7);
            return i < 0 && (i += 4294967296), i
        }

        function k(t, e) {
            var i = o(t, e, 19) ^ o(e, t, 29) ^ d(t, e, 6);
            return i < 0 && (i += 4294967296), i
        }

        function D(t, e) {
            var i = s(t, e, 19) ^ s(e, t, 29) ^ u(t, e, 6);
            return i < 0 && (i += 4294967296), i
        }
        r.inherits(v, b), t.exports = v, v.blockSize = 1024, v.outSize = 512, v.hmacStrength = 192, v.padLength = 128, v.prototype._prepareBlock = function(t, e) {
            for (var i = this.W, r = 0; r < 32; r++) i[r] = t[e + r];
            for (; r < i.length; r += 2) {
                var n = k(i[r - 4], i[r - 3]),
                    a = D(i[r - 4], i[r - 3]),
                    o = i[r - 14],
                    s = i[r - 13],
                    d = M(i[r - 30], i[r - 29]),
                    u = C(i[r - 30], i[r - 29]),
                    f = i[r - 32],
                    c = i[r - 31];
                i[r] = h(n, a, o, s, d, u, f, c), i[r + 1] = p(n, a, o, s, d, u, f, c)
            }
        }, v.prototype._update = function(t, e) {
            this._prepareBlock(t, e);
            var i = this.W,
                r = this.h[0],
                n = this.h[1],
                o = this.h[2],
                s = this.h[3],
                d = this.h[4],
                u = this.h[5],
                h = this.h[6],
                p = this.h[7],
                b = this.h[8],
                g = this.h[9],
                v = this.h[10],
                M = this.h[11],
                C = this.h[12],
                k = this.h[13],
                D = this.h[14],
                L = this.h[15];
            a(this.k.length === i.length);
            for (var O = 0; O < i.length; O += 2) {
                var x = D,
                    R = L,
                    U = I(b, g),
                    N = T(b, g),
                    B = m(b, g, v, M, C),
                    j = A(b, g, v, M, C, k),
                    F = this.k[O],
                    V = this.k[O + 1],
                    q = i[O],
                    H = i[O + 1],
                    X = _(x, R, U, N, B, j, F, V, q, H),
                    z = y(x, R, U, N, B, j, F, V, q, H);
                x = P(r, n), R = S(r, n), U = w(r, n, o, s, d), N = E(r, n, o, s, d, u);
                var W = c(x, R, U, N),
                    Y = l(x, R, U, N);
                D = C, L = k, C = v, k = M, v = b, M = g, b = c(h, p, X, z), g = l(p, p, X, z), h = d, p = u, d = o, u = s, o = r, s = n, r = c(X, z, W, Y), n = l(X, z, W, Y)
            }
            f(this.h, 0, r, n), f(this.h, 2, o, s), f(this.h, 4, d, u), f(this.h, 6, h, p), f(this.h, 8, b, g), f(this.h, 10, v, M), f(this.h, 12, C, k), f(this.h, 14, D, L)
        }, v.prototype._digest = function(t) {
            return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
        }
    },
    tcrS: function(t, e, i) {
        "use strict";
        var r = i("tjlA").Buffer,
            n = i("P7XM"),
            a = i("k+aG"),
            o = new Array(16),
            s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
            d = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
            u = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
            f = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
            c = [0, 1518500249, 1859775393, 2400959708, 2840853838],
            l = [1352829926, 1548603684, 1836072691, 2053994217, 0];

        function h() {
            a.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
        }

        function p(t, e) {
            return t << e | t >>> 32 - e
        }

        function _(t, e, i, r, n, a, o, s) {
            return p(t + (e ^ i ^ r) + a + o | 0, s) + n | 0
        }

        function y(t, e, i, r, n, a, o, s) {
            return p(t + (e & i | ~e & r) + a + o | 0, s) + n | 0
        }

        function b(t, e, i, r, n, a, o, s) {
            return p(t + ((e | ~i) ^ r) + a + o | 0, s) + n | 0
        }

        function g(t, e, i, r, n, a, o, s) {
            return p(t + (e & r | i & ~r) + a + o | 0, s) + n | 0
        }

        function v(t, e, i, r, n, a, o, s) {
            return p(t + (e ^ (i | ~r)) + a + o | 0, s) + n | 0
        }
        n(h, a), h.prototype._update = function() {
            for (var t = o, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
            for (var i = 0 | this._a, r = 0 | this._b, n = 0 | this._c, a = 0 | this._d, h = 0 | this._e, m = 0 | this._a, A = 0 | this._b, w = 0 | this._c, E = 0 | this._d, P = 0 | this._e, S = 0; S < 80; S += 1) {
                var I, T;
                S < 16 ? (I = _(i, r, n, a, h, t[s[S]], c[0], u[S]), T = v(m, A, w, E, P, t[d[S]], l[0], f[S])) : S < 32 ? (I = y(i, r, n, a, h, t[s[S]], c[1], u[S]), T = g(m, A, w, E, P, t[d[S]], l[1], f[S])) : S < 48 ? (I = b(i, r, n, a, h, t[s[S]], c[2], u[S]), T = b(m, A, w, E, P, t[d[S]], l[2], f[S])) : S < 64 ? (I = g(i, r, n, a, h, t[s[S]], c[3], u[S]), T = y(m, A, w, E, P, t[d[S]], l[3], f[S])) : (I = v(i, r, n, a, h, t[s[S]], c[4], u[S]), T = _(m, A, w, E, P, t[d[S]], l[4], f[S])), i = h, h = a, a = p(n, 10), n = r, r = I, m = P, P = E, E = p(w, 10), w = A, A = T
            }
            var M = this._b + n + E | 0;
            this._b = this._c + a + P | 0, this._c = this._d + h + m | 0, this._d = this._e + i + A | 0, this._e = this._a + r + w | 0, this._a = M
        }, h.prototype._digest = function() {
            this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
            var t = r.alloc ? r.alloc(20) : new r(20);
            return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t.writeInt32LE(this._e, 16), t
        }, t.exports = h
    },
    tjlA: function(t, e, i) {
        "use strict";
        (function(t) {
            var r = i("H7XF"),
                n = i("kVK+"),
                a = i("49sm");

            function o() {
                return d.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function s(t, e) {
                if (o() < e) throw new RangeError("Invalid typed array length");
                return d.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = d.prototype : (null === t && (t = new d(e)), t.length = e), t
            }

            function d(t, e, i) {
                if (!(d.TYPED_ARRAY_SUPPORT || this instanceof d)) return new d(t, e, i);
                if ("number" == typeof t) {
                    if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                    return c(this, t)
                }
                return u(this, t, e, i)
            }

            function u(t, e, i, r) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, i, r) {
                    if (e.byteLength, i < 0 || e.byteLength < i) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < i + (r || 0)) throw new RangeError("'length' is out of bounds");
                    e = void 0 === i && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, i) : new Uint8Array(e, i, r);
                    d.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = d.prototype : t = l(t, e);
                    return t
                }(t, e, i, r) : "string" == typeof e ? function(t, e, i) {
                    "string" == typeof i && "" !== i || (i = "utf8");
                    if (!d.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | p(e, i),
                        n = (t = s(t, r)).write(e, i);
                    n !== r && (t = t.slice(0, n));
                    return t
                }(t, e, i) : function(t, e) {
                    if (d.isBuffer(e)) {
                        var i = 0 | h(e.length);
                        return 0 === (t = s(t, i)).length ? t : (e.copy(t, 0, 0, i), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? s(t, 0) : l(t, e);
                        if ("Buffer" === e.type && a(e.data)) return l(t, e.data)
                    }
                    var r;
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }(t, e)
            }

            function f(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative')
            }

            function c(t, e) {
                if (f(e), t = s(t, e < 0 ? 0 : 0 | h(e)), !d.TYPED_ARRAY_SUPPORT)
                    for (var i = 0; i < e; ++i) t[i] = 0;
                return t
            }

            function l(t, e) {
                var i = e.length < 0 ? 0 : 0 | h(e.length);
                t = s(t, i);
                for (var r = 0; r < i; r += 1) t[r] = 255 & e[r];
                return t
            }

            function h(t) {
                if (t >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
                return 0 | t
            }

            function p(t, e) {
                if (d.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var i = t.length;
                if (0 === i) return 0;
                for (var r = !1;;) switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return i;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return F(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * i;
                    case "hex":
                        return i >>> 1;
                    case "base64":
                        return V(t).length;
                    default:
                        if (r) return F(t).length;
                        e = ("" + e).toLowerCase(), r = !0
                }
            }

            function _(t, e, i) {
                var r = t[e];
                t[e] = t[i], t[i] = r
            }

            function y(t, e, i, r, n) {
                if (0 === t.length) return -1;
                if ("string" == typeof i ? (r = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = n ? 0 : t.length - 1), i < 0 && (i = t.length + i), i >= t.length) {
                    if (n) return -1;
                    i = t.length - 1
                } else if (i < 0) {
                    if (!n) return -1;
                    i = 0
                }
                if ("string" == typeof e && (e = d.from(e, r)), d.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, i, r, n);
                if ("number" == typeof e) return e &= 255, d.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : b(t, [e], i, r, n);
                throw new TypeError("val must be string, number or Buffer")
            }

            function b(t, e, i, r, n) {
                var a, o = 1,
                    s = t.length,
                    d = e.length;
                if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    o = 2, s /= 2, d /= 2, i /= 2
                }

                function u(t, e) {
                    return 1 === o ? t[e] : t.readUInt16BE(e * o)
                }
                if (n) {
                    var f = -1;
                    for (a = i; a < s; a++)
                        if (u(t, a) === u(e, -1 === f ? 0 : a - f)) {
                            if (-1 === f && (f = a), a - f + 1 === d) return f * o
                        } else -1 !== f && (a -= a - f), f = -1
                } else
                    for (i + d > s && (i = s - d), a = i; a >= 0; a--) {
                        for (var c = !0, l = 0; l < d; l++)
                            if (u(t, a + l) !== u(e, l)) {
                                c = !1;
                                break
                            }
                        if (c) return a
                    }
                return -1
            }

            function g(t, e, i, r) {
                i = Number(i) || 0;
                var n = t.length - i;
                r ? (r = Number(r)) > n && (r = n) : r = n;
                var a = e.length;
                if (a % 2 != 0) throw new TypeError("Invalid hex string");
                r > a / 2 && (r = a / 2);
                for (var o = 0; o < r; ++o) {
                    var s = parseInt(e.substr(2 * o, 2), 16);
                    if (isNaN(s)) return o;
                    t[i + o] = s
                }
                return o
            }

            function v(t, e, i, r) {
                return q(F(e, t.length - i), t, i, r)
            }

            function m(t, e, i, r) {
                return q(function(t) {
                    for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                    return e
                }(e), t, i, r)
            }

            function A(t, e, i, r) {
                return m(t, e, i, r)
            }

            function w(t, e, i, r) {
                return q(V(e), t, i, r)
            }

            function E(t, e, i, r) {
                return q(function(t, e) {
                    for (var i, r, n, a = [], o = 0; o < t.length && !((e -= 2) < 0); ++o) i = t.charCodeAt(o), r = i >> 8, n = i % 256, a.push(n), a.push(r);
                    return a
                }(e, t.length - i), t, i, r)
            }

            function P(t, e, i) {
                return 0 === e && i === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, i))
            }

            function S(t, e, i) {
                i = Math.min(t.length, i);
                for (var r = [], n = e; n < i;) {
                    var a, o, s, d, u = t[n],
                        f = null,
                        c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                    if (n + c <= i) switch (c) {
                        case 1:
                            u < 128 && (f = u);
                            break;
                        case 2:
                            128 == (192 & (a = t[n + 1])) && (d = (31 & u) << 6 | 63 & a) > 127 && (f = d);
                            break;
                        case 3:
                            a = t[n + 1], o = t[n + 2], 128 == (192 & a) && 128 == (192 & o) && (d = (15 & u) << 12 | (63 & a) << 6 | 63 & o) > 2047 && (d < 55296 || d > 57343) && (f = d);
                            break;
                        case 4:
                            a = t[n + 1], o = t[n + 2], s = t[n + 3], 128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && (d = (15 & u) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) > 65535 && d < 1114112 && (f = d)
                    }
                    null === f ? (f = 65533, c = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), r.push(f), n += c
                }
                return function(t) {
                    var e = t.length;
                    if (e <= I) return String.fromCharCode.apply(String, t);
                    var i = "",
                        r = 0;
                    for (; r < e;) i += String.fromCharCode.apply(String, t.slice(r, r += I));
                    return i
                }(r)
            }
            e.Buffer = d, e.SlowBuffer = function(t) {
                +t != t && (t = 0);
                return d.alloc(+t)
            }, e.INSPECT_MAX_BYTES = 50, d.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                } catch (t) {
                    return !1
                }
            }(), e.kMaxLength = o(), d.poolSize = 8192, d._augment = function(t) {
                return t.__proto__ = d.prototype, t
            }, d.from = function(t, e, i) {
                return u(null, t, e, i)
            }, d.TYPED_ARRAY_SUPPORT && (d.prototype.__proto__ = Uint8Array.prototype, d.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && d[Symbol.species] === d && Object.defineProperty(d, Symbol.species, {
                value: null,
                configurable: !0
            })), d.alloc = function(t, e, i) {
                return function(t, e, i, r) {
                    return f(e), e <= 0 ? s(t, e) : void 0 !== i ? "string" == typeof r ? s(t, e).fill(i, r) : s(t, e).fill(i) : s(t, e)
                }(null, t, e, i)
            }, d.allocUnsafe = function(t) {
                return c(null, t)
            }, d.allocUnsafeSlow = function(t) {
                return c(null, t)
            }, d.isBuffer = function(t) {
                return !(null == t || !t._isBuffer)
            }, d.compare = function(t, e) {
                if (!d.isBuffer(t) || !d.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var i = t.length, r = e.length, n = 0, a = Math.min(i, r); n < a; ++n)
                    if (t[n] !== e[n]) {
                        i = t[n], r = e[n];
                        break
                    }
                return i < r ? -1 : r < i ? 1 : 0
            }, d.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, d.concat = function(t, e) {
                if (!a(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return d.alloc(0);
                var i;
                if (void 0 === e)
                    for (e = 0, i = 0; i < t.length; ++i) e += t[i].length;
                var r = d.allocUnsafe(e),
                    n = 0;
                for (i = 0; i < t.length; ++i) {
                    var o = t[i];
                    if (!d.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                    o.copy(r, n), n += o.length
                }
                return r
            }, d.byteLength = p, d.prototype._isBuffer = !0, d.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var e = 0; e < t; e += 2) _(this, e, e + 1);
                return this
            }, d.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var e = 0; e < t; e += 4) _(this, e, e + 3), _(this, e + 1, e + 2);
                return this
            }, d.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var e = 0; e < t; e += 8) _(this, e, e + 7), _(this, e + 1, e + 6), _(this, e + 2, e + 5), _(this, e + 3, e + 4);
                return this
            }, d.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : function(t, e, i) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
                    if ((i >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return C(this, e, i);
                        case "utf8":
                        case "utf-8":
                            return S(this, e, i);
                        case "ascii":
                            return T(this, e, i);
                        case "latin1":
                        case "binary":
                            return M(this, e, i);
                        case "base64":
                            return P(this, e, i);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return k(this, e, i);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }.apply(this, arguments)
            }, d.prototype.equals = function(t) {
                if (!d.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === d.compare(this, t)
            }, d.prototype.inspect = function() {
                var t = "",
                    i = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, i).match(/.{2}/g).join(" "), this.length > i && (t += " ... ")), "<Buffer " + t + ">"
            }, d.prototype.compare = function(t, e, i, r, n) {
                if (!d.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === i && (i = t ? t.length : 0), void 0 === r && (r = 0), void 0 === n && (n = this.length), e < 0 || i > t.length || r < 0 || n > this.length) throw new RangeError("out of range index");
                if (r >= n && e >= i) return 0;
                if (r >= n) return -1;
                if (e >= i) return 1;
                if (e >>>= 0, i >>>= 0, r >>>= 0, n >>>= 0, this === t) return 0;
                for (var a = n - r, o = i - e, s = Math.min(a, o), u = this.slice(r, n), f = t.slice(e, i), c = 0; c < s; ++c)
                    if (u[c] !== f[c]) {
                        a = u[c], o = f[c];
                        break
                    }
                return a < o ? -1 : o < a ? 1 : 0
            }, d.prototype.includes = function(t, e, i) {
                return -1 !== this.indexOf(t, e, i)
            }, d.prototype.indexOf = function(t, e, i) {
                return y(this, t, e, i, !0)
            }, d.prototype.lastIndexOf = function(t, e, i) {
                return y(this, t, e, i, !1)
            }, d.prototype.write = function(t, e, i, r) {
                if (void 0 === e) r = "utf8", i = this.length, e = 0;
                else if (void 0 === i && "string" == typeof e) r = e, i = this.length, e = 0;
                else {
                    if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e |= 0, isFinite(i) ? (i |= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
                }
                var n = this.length - e;
                if ((void 0 === i || i > n) && (i = n), t.length > 0 && (i < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var a = !1;;) switch (r) {
                    case "hex":
                        return g(this, t, e, i);
                    case "utf8":
                    case "utf-8":
                        return v(this, t, e, i);
                    case "ascii":
                        return m(this, t, e, i);
                    case "latin1":
                    case "binary":
                        return A(this, t, e, i);
                    case "base64":
                        return w(this, t, e, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return E(this, t, e, i);
                    default:
                        if (a) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), a = !0
                }
            }, d.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var I = 4096;

            function T(t, e, i) {
                var r = "";
                i = Math.min(t.length, i);
                for (var n = e; n < i; ++n) r += String.fromCharCode(127 & t[n]);
                return r
            }

            function M(t, e, i) {
                var r = "";
                i = Math.min(t.length, i);
                for (var n = e; n < i; ++n) r += String.fromCharCode(t[n]);
                return r
            }

            function C(t, e, i) {
                var r = t.length;
                (!e || e < 0) && (e = 0), (!i || i < 0 || i > r) && (i = r);
                for (var n = "", a = e; a < i; ++a) n += j(t[a]);
                return n
            }

            function k(t, e, i) {
                for (var r = t.slice(e, i), n = "", a = 0; a < r.length; a += 2) n += String.fromCharCode(r[a] + 256 * r[a + 1]);
                return n
            }

            function D(t, e, i) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
            }

            function L(t, e, i, r, n, a) {
                if (!d.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > n || e < a) throw new RangeError('"value" argument is out of bounds');
                if (i + r > t.length) throw new RangeError("Index out of range")
            }

            function O(t, e, i, r) {
                e < 0 && (e = 65535 + e + 1);
                for (var n = 0, a = Math.min(t.length - i, 2); n < a; ++n) t[i + n] = (e & 255 << 8 * (r ? n : 1 - n)) >>> 8 * (r ? n : 1 - n)
            }

            function x(t, e, i, r) {
                e < 0 && (e = 4294967295 + e + 1);
                for (var n = 0, a = Math.min(t.length - i, 4); n < a; ++n) t[i + n] = e >>> 8 * (r ? n : 3 - n) & 255
            }

            function R(t, e, i, r, n, a) {
                if (i + r > t.length) throw new RangeError("Index out of range");
                if (i < 0) throw new RangeError("Index out of range")
            }

            function U(t, e, i, r, a) {
                return a || R(t, 0, i, 4), n.write(t, e, i, r, 23, 4), i + 4
            }

            function N(t, e, i, r, a) {
                return a || R(t, 0, i, 8), n.write(t, e, i, r, 52, 8), i + 8
            }
            d.prototype.slice = function(t, e) {
                var i, r = this.length;
                if (t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), d.TYPED_ARRAY_SUPPORT)(i = this.subarray(t, e)).__proto__ = d.prototype;
                else {
                    var n = e - t;
                    i = new d(n, void 0);
                    for (var a = 0; a < n; ++a) i[a] = this[a + t]
                }
                return i
            }, d.prototype.readUIntLE = function(t, e, i) {
                t |= 0, e |= 0, i || D(t, e, this.length);
                for (var r = this[t], n = 1, a = 0; ++a < e && (n *= 256);) r += this[t + a] * n;
                return r
            }, d.prototype.readUIntBE = function(t, e, i) {
                t |= 0, e |= 0, i || D(t, e, this.length);
                for (var r = this[t + --e], n = 1; e > 0 && (n *= 256);) r += this[t + --e] * n;
                return r
            }, d.prototype.readUInt8 = function(t, e) {
                return e || D(t, 1, this.length), this[t]
            }, d.prototype.readUInt16LE = function(t, e) {
                return e || D(t, 2, this.length), this[t] | this[t + 1] << 8
            }, d.prototype.readUInt16BE = function(t, e) {
                return e || D(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, d.prototype.readUInt32LE = function(t, e) {
                return e || D(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, d.prototype.readUInt32BE = function(t, e) {
                return e || D(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, d.prototype.readIntLE = function(t, e, i) {
                t |= 0, e |= 0, i || D(t, e, this.length);
                for (var r = this[t], n = 1, a = 0; ++a < e && (n *= 256);) r += this[t + a] * n;
                return r >= (n *= 128) && (r -= Math.pow(2, 8 * e)), r
            }, d.prototype.readIntBE = function(t, e, i) {
                t |= 0, e |= 0, i || D(t, e, this.length);
                for (var r = e, n = 1, a = this[t + --r]; r > 0 && (n *= 256);) a += this[t + --r] * n;
                return a >= (n *= 128) && (a -= Math.pow(2, 8 * e)), a
            }, d.prototype.readInt8 = function(t, e) {
                return e || D(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }, d.prototype.readInt16LE = function(t, e) {
                e || D(t, 2, this.length);
                var i = this[t] | this[t + 1] << 8;
                return 32768 & i ? 4294901760 | i : i
            }, d.prototype.readInt16BE = function(t, e) {
                e || D(t, 2, this.length);
                var i = this[t + 1] | this[t] << 8;
                return 32768 & i ? 4294901760 | i : i
            }, d.prototype.readInt32LE = function(t, e) {
                return e || D(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, d.prototype.readInt32BE = function(t, e) {
                return e || D(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, d.prototype.readFloatLE = function(t, e) {
                return e || D(t, 4, this.length), n.read(this, t, !0, 23, 4)
            }, d.prototype.readFloatBE = function(t, e) {
                return e || D(t, 4, this.length), n.read(this, t, !1, 23, 4)
            }, d.prototype.readDoubleLE = function(t, e) {
                return e || D(t, 8, this.length), n.read(this, t, !0, 52, 8)
            }, d.prototype.readDoubleBE = function(t, e) {
                return e || D(t, 8, this.length), n.read(this, t, !1, 52, 8)
            }, d.prototype.writeUIntLE = function(t, e, i, r) {
                (t = +t, e |= 0, i |= 0, r) || L(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                var n = 1,
                    a = 0;
                for (this[e] = 255 & t; ++a < i && (n *= 256);) this[e + a] = t / n & 255;
                return e + i
            }, d.prototype.writeUIntBE = function(t, e, i, r) {
                (t = +t, e |= 0, i |= 0, r) || L(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                var n = i - 1,
                    a = 1;
                for (this[e + n] = 255 & t; --n >= 0 && (a *= 256);) this[e + n] = t / a & 255;
                return e + i
            }, d.prototype.writeUInt8 = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 1, 255, 0), d.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
            }, d.prototype.writeUInt16LE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : O(this, t, e, !0), e + 2
            }, d.prototype.writeUInt16BE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : O(this, t, e, !1), e + 2
            }, d.prototype.writeUInt32LE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : x(this, t, e, !0), e + 4
            }, d.prototype.writeUInt32BE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : x(this, t, e, !1), e + 4
            }, d.prototype.writeIntLE = function(t, e, i, r) {
                if (t = +t, e |= 0, !r) {
                    var n = Math.pow(2, 8 * i - 1);
                    L(this, t, e, i, n - 1, -n)
                }
                var a = 0,
                    o = 1,
                    s = 0;
                for (this[e] = 255 & t; ++a < i && (o *= 256);) t < 0 && 0 === s && 0 !== this[e + a - 1] && (s = 1), this[e + a] = (t / o >> 0) - s & 255;
                return e + i
            }, d.prototype.writeIntBE = function(t, e, i, r) {
                if (t = +t, e |= 0, !r) {
                    var n = Math.pow(2, 8 * i - 1);
                    L(this, t, e, i, n - 1, -n)
                }
                var a = i - 1,
                    o = 1,
                    s = 0;
                for (this[e + a] = 255 & t; --a >= 0 && (o *= 256);) t < 0 && 0 === s && 0 !== this[e + a + 1] && (s = 1), this[e + a] = (t / o >> 0) - s & 255;
                return e + i
            }, d.prototype.writeInt8 = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 1, 127, -128), d.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
            }, d.prototype.writeInt16LE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : O(this, t, e, !0), e + 2
            }, d.prototype.writeInt16BE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : O(this, t, e, !1), e + 2
            }, d.prototype.writeInt32LE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 4, 2147483647, -2147483648), d.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : x(this, t, e, !0), e + 4
            }, d.prototype.writeInt32BE = function(t, e, i) {
                return t = +t, e |= 0, i || L(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : x(this, t, e, !1), e + 4
            }, d.prototype.writeFloatLE = function(t, e, i) {
                return U(this, t, e, !0, i)
            }, d.prototype.writeFloatBE = function(t, e, i) {
                return U(this, t, e, !1, i)
            }, d.prototype.writeDoubleLE = function(t, e, i) {
                return N(this, t, e, !0, i)
            }, d.prototype.writeDoubleBE = function(t, e, i) {
                return N(this, t, e, !1, i)
            }, d.prototype.copy = function(t, e, i, r) {
                if (i || (i = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < i && (r = i), r === i) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
                if (r < 0) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), t.length - e < r - i && (r = t.length - e + i);
                var n, a = r - i;
                if (this === t && i < e && e < r)
                    for (n = a - 1; n >= 0; --n) t[n + e] = this[n + i];
                else if (a < 1e3 || !d.TYPED_ARRAY_SUPPORT)
                    for (n = 0; n < a; ++n) t[n + e] = this[n + i];
                else Uint8Array.prototype.set.call(t, this.subarray(i, i + a), e);
                return a
            }, d.prototype.fill = function(t, e, i, r) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (r = e, e = 0, i = this.length) : "string" == typeof i && (r = i, i = this.length), 1 === t.length) {
                        var n = t.charCodeAt(0);
                        n < 256 && (t = n)
                    }
                    if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !d.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                } else "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
                if (i <= e) return this;
                var a;
                if (e >>>= 0, i = void 0 === i ? this.length : i >>> 0, t || (t = 0), "number" == typeof t)
                    for (a = e; a < i; ++a) this[a] = t;
                else {
                    var o = d.isBuffer(t) ? t : F(new d(t, r).toString()),
                        s = o.length;
                    for (a = 0; a < i - e; ++a) this[a + e] = o[a % s]
                }
                return this
            };
            var B = /[^+\/0-9A-Za-z-_]/g;

            function j(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16)
            }

            function F(t, e) {
                var i;
                e = e || 1 / 0;
                for (var r = t.length, n = null, a = [], o = 0; o < r; ++o) {
                    if ((i = t.charCodeAt(o)) > 55295 && i < 57344) {
                        if (!n) {
                            if (i > 56319) {
                                (e -= 3) > -1 && a.push(239, 191, 189);
                                continue
                            }
                            if (o + 1 === r) {
                                (e -= 3) > -1 && a.push(239, 191, 189);
                                continue
                            }
                            n = i;
                            continue
                        }
                        if (i < 56320) {
                            (e -= 3) > -1 && a.push(239, 191, 189), n = i;
                            continue
                        }
                        i = 65536 + (n - 55296 << 10 | i - 56320)
                    } else n && (e -= 3) > -1 && a.push(239, 191, 189);
                    if (n = null, i < 128) {
                        if ((e -= 1) < 0) break;
                        a.push(i)
                    } else if (i < 2048) {
                        if ((e -= 2) < 0) break;
                        a.push(i >> 6 | 192, 63 & i | 128)
                    } else if (i < 65536) {
                        if ((e -= 3) < 0) break;
                        a.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                    } else {
                        if (!(i < 1114112)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        a.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                    }
                }
                return a
            }

            function V(t) {
                return r.toByteArray(function(t) {
                    if ((t = function(t) {
                            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                        }(t).replace(B, "")).length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }(t))
            }

            function q(t, e, i, r) {
                for (var n = 0; n < r && !(n + i >= e.length || n >= t.length); ++n) e[n + i] = t[n];
                return n
            }
        }).call(this, i("yLpj"))
    },
    tnIz: function(t, e, i) {
        var r = i("hwdV").Buffer;

        function n(t, e) {
            this._block = r.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0
        }
        n.prototype.update = function(t, e) {
            "string" == typeof t && (e = e || "utf8", t = r.from(t, e));
            for (var i = this._block, n = this._blockSize, a = t.length, o = this._len, s = 0; s < a;) {
                for (var d = o % n, u = Math.min(a - s, n - d), f = 0; f < u; f++) i[d + f] = t[s + f];
                s += u, (o += u) % n == 0 && this._update(i)
            }
            return this._len += a, this
        }, n.prototype.digest = function(t) {
            var e = this._len % this._blockSize;
            this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0));
            var i = 8 * this._len;
            if (i <= 4294967295) this._block.writeUInt32BE(i, this._blockSize - 4);
            else {
                var r = (4294967295 & i) >>> 0,
                    n = (i - r) / 4294967296;
                this._block.writeUInt32BE(n, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4)
            }
            this._update(this._block);
            var a = this._hash();
            return t ? a.toString(t) : a
        }, n.prototype._update = function() {
            throw new Error("_update must be implemented by subclass")
        }, t.exports = n
    },
    tpL1: function(t, e, i) {
        (function(e) {
            var r = i("mObS"),
                n = i("1IWx"),
                a = i("P7XM"),
                o = i("b+dc"),
                s = i("mAz1"),
                d = i("tOiH");

            function u(t) {
                n.Writable.call(this);
                var e = d[t];
                if (!e) throw new Error("Unknown message digest");
                this._hashType = e.hash, this._hash = r(e.hash), this._tag = e.id, this._signType = e.sign
            }

            function f(t) {
                n.Writable.call(this);
                var e = d[t];
                if (!e) throw new Error("Unknown message digest");
                this._hash = r(e.hash), this._tag = e.id, this._signType = e.sign
            }

            function c(t) {
                return new u(t)
            }

            function l(t) {
                return new f(t)
            }
            Object.keys(d).forEach(function(t) {
                d[t].id = new e(d[t].id, "hex"), d[t.toLowerCase()] = d[t]
            }), a(u, n.Writable), u.prototype._write = function(t, e, i) {
                this._hash.update(t), i()
            }, u.prototype.update = function(t, i) {
                return "string" == typeof t && (t = new e(t, i)), this._hash.update(t), this
            }, u.prototype.sign = function(t, e) {
                this.end();
                var i = this._hash.digest(),
                    r = o(i, t, this._hashType, this._signType, this._tag);
                return e ? r.toString(e) : r
            }, a(f, n.Writable), f.prototype._write = function(t, e, i) {
                this._hash.update(t), i()
            }, f.prototype.update = function(t, i) {
                return "string" == typeof t && (t = new e(t, i)), this._hash.update(t), this
            }, f.prototype.verify = function(t, i, r) {
                "string" == typeof i && (i = new e(i, r)), this.end();
                var n = this._hash.digest();
                return s(i, n, t, this._signType, this._tag)
            }, t.exports = {
                Sign: c,
                Verify: l,
                createSign: c,
                createVerify: l
            }
        }).call(this, i("tjlA").Buffer)
    },
    "tz+M": function(t, e, i) {
        "use strict";
        var r = i("OZ/i"),
            n = i("MzeL").utils,
            a = n.assert;

        function o(t, e) {
            if (t instanceof o) return t;
            this._importDER(t, e) || (a(t.r && t.s, "Signature without r or s"), this.r = new r(t.r, 16), this.s = new r(t.s, 16), void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
        }

        function s(t, e) {
            var i = t[e.place++];
            if (!(128 & i)) return i;
            for (var r = 15 & i, n = 0, a = 0, o = e.place; a < r; a++, o++) n <<= 8, n |= t[o];
            return e.place = o, n
        }

        function d(t) {
            for (var e = 0, i = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < i;) e++;
            return 0 === e ? t : t.slice(e)
        }

        function u(t, e) {
            if (e < 128) t.push(e);
            else {
                var i = 1 + (Math.log(e) / Math.LN2 >>> 3);
                for (t.push(128 | i); --i;) t.push(e >>> (i << 3) & 255);
                t.push(e)
            }
        }
        t.exports = o, o.prototype._importDER = function(t, e) {
            t = n.toArray(t, e);
            var i = new function() {
                this.place = 0
            };
            if (48 !== t[i.place++]) return !1;
            if (s(t, i) + i.place !== t.length) return !1;
            if (2 !== t[i.place++]) return !1;
            var a = s(t, i),
                o = t.slice(i.place, a + i.place);
            if (i.place += a, 2 !== t[i.place++]) return !1;
            var d = s(t, i);
            if (t.length !== d + i.place) return !1;
            var u = t.slice(i.place, d + i.place);
            return 0 === o[0] && 128 & o[1] && (o = o.slice(1)), 0 === u[0] && 128 & u[1] && (u = u.slice(1)), this.r = new r(o), this.s = new r(u), this.recoveryParam = null, !0
        }, o.prototype.toDER = function(t) {
            var e = this.r.toArray(),
                i = this.s.toArray();
            for (128 & e[0] && (e = [0].concat(e)), 128 & i[0] && (i = [0].concat(i)), e = d(e), i = d(i); !(i[0] || 128 & i[1]);) i = i.slice(1);
            var r = [2];
            u(r, e.length), (r = r.concat(e)).push(2), u(r, i.length);
            var a = r.concat(i),
                o = [48];
            return u(o, a.length), o = o.concat(a), n.encode(o, t)
        }
    },
    u0Sq: function(t, e, i) {
        "use strict";
        var r = i("w8CP"),
            n = i("7ckf"),
            a = r.rotl32,
            o = r.sum32,
            s = r.sum32_3,
            d = r.sum32_4,
            u = n.BlockHash;

        function f() {
            if (!(this instanceof f)) return new f;
            u.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
        }

        function c(t, e, i, r) {
            return t <= 15 ? e ^ i ^ r : t <= 31 ? e & i | ~e & r : t <= 47 ? (e | ~i) ^ r : t <= 63 ? e & r | i & ~r : e ^ (i | ~r)
        }

        function l(t) {
            return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838
        }

        function h(t) {
            return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0
        }
        r.inherits(f, u), e.ripemd160 = f, f.blockSize = 512, f.outSize = 160, f.hmacStrength = 192, f.padLength = 64, f.prototype._update = function(t, e) {
            for (var i = this.h[0], r = this.h[1], n = this.h[2], u = this.h[3], f = this.h[4], g = i, v = r, m = n, A = u, w = f, E = 0; E < 80; E++) {
                var P = o(a(d(i, c(E, r, n, u), t[p[E] + e], l(E)), y[E]), f);
                i = f, f = u, u = a(n, 10), n = r, r = P, P = o(a(d(g, c(79 - E, v, m, A), t[_[E] + e], h(E)), b[E]), w), g = w, w = A, A = a(m, 10), m = v, v = P
            }
            P = s(this.h[1], n, A), this.h[1] = s(this.h[2], u, w), this.h[2] = s(this.h[3], f, g), this.h[3] = s(this.h[4], i, v), this.h[4] = s(this.h[0], r, m), this.h[0] = P
        }, f.prototype._digest = function(t) {
            return "hex" === t ? r.toHex32(this.h, "little") : r.split32(this.h, "little")
        };
        var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
            _ = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
            y = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
            b = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
    },
    uDfV: function(t, e, i) {
        var r = i("P7XM"),
            n = i("T9HO"),
            a = i("tnIz"),
            o = i("hwdV").Buffer,
            s = new Array(160);

        function d() {
            this.init(), this._w = s, a.call(this, 128, 112)
        }
        r(d, n), d.prototype.init = function() {
            return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
        }, d.prototype._hash = function() {
            var t = o.allocUnsafe(48);

            function e(e, i, r) {
                t.writeInt32BE(e, r), t.writeInt32BE(i, r + 4)
            }
            return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), t
        }, t.exports = d
    },
    uagp: function(t, e, i) {
        "use strict";
        var r = i("OZ/i"),
            n = i("aqI/"),
            a = i("MzeL"),
            o = a.utils.assert,
            s = i("uzSA"),
            d = i("tz+M");

        function u(t) {
            if (!(this instanceof u)) return new u(t);
            "string" == typeof t && (o(a.curves.hasOwnProperty(t), "Unknown curve " + t), t = a.curves[t]), t instanceof a.curves.PresetCurve && (t = {
                curve: t
            }), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash
        }
        t.exports = u, u.prototype.keyPair = function(t) {
            return new s(this, t)
        }, u.prototype.keyFromPrivate = function(t, e) {
            return s.fromPrivate(this, t, e)
        }, u.prototype.keyFromPublic = function(t, e) {
            return s.fromPublic(this, t, e)
        }, u.prototype.genKeyPair = function(t) {
            t || (t = {});
            for (var e = new n({
                    hash: this.hash,
                    pers: t.pers,
                    persEnc: t.persEnc || "utf8",
                    entropy: t.entropy || a.rand(this.hash.hmacStrength),
                    entropyEnc: t.entropy && t.entropyEnc || "utf8",
                    nonce: this.n.toArray()
                }), i = this.n.byteLength(), o = this.n.sub(new r(2));;) {
                var s = new r(e.generate(i));
                if (!(s.cmp(o) > 0)) return s.iaddn(1), this.keyFromPrivate(s)
            }
        }, u.prototype._truncateToN = function(t, e) {
            var i = 8 * t.byteLength() - this.n.bitLength();
            return i > 0 && (t = t.ushrn(i)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
        }, u.prototype.sign = function(t, e, i, a) {
            "object" == typeof i && (a = i, i = null), a || (a = {}), e = this.keyFromPrivate(e, i), t = this._truncateToN(new r(t, 16));
            for (var o = this.n.byteLength(), s = e.getPrivate().toArray("be", o), u = t.toArray("be", o), f = new n({
                    hash: this.hash,
                    entropy: s,
                    nonce: u,
                    pers: a.pers,
                    persEnc: a.persEnc || "utf8"
                }), c = this.n.sub(new r(1)), l = 0;; l++) {
                var h = a.k ? a.k(l) : new r(f.generate(this.n.byteLength()));
                if (!((h = this._truncateToN(h, !0)).cmpn(1) <= 0 || h.cmp(c) >= 0)) {
                    var p = this.g.mul(h);
                    if (!p.isInfinity()) {
                        var _ = p.getX(),
                            y = _.umod(this.n);
                        if (0 !== y.cmpn(0)) {
                            var b = h.invm(this.n).mul(y.mul(e.getPrivate()).iadd(t));
                            if (0 !== (b = b.umod(this.n)).cmpn(0)) {
                                var g = (p.getY().isOdd() ? 1 : 0) | (0 !== _.cmp(y) ? 2 : 0);
                                return a.canonical && b.cmp(this.nh) > 0 && (b = this.n.sub(b), g ^= 1), new d({
                                    r: y,
                                    s: b,
                                    recoveryParam: g
                                })
                            }
                        }
                    }
                }
            }
        }, u.prototype.verify = function(t, e, i, n) {
            t = this._truncateToN(new r(t, 16)), i = this.keyFromPublic(i, n);
            var a = (e = new d(e, "hex")).r,
                o = e.s;
            if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
            if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
            var s, u = o.invm(this.n),
                f = u.mul(t).umod(this.n),
                c = u.mul(a).umod(this.n);
            return this.curve._maxwellTrick ? !(s = this.g.jmulAdd(f, i.getPublic(), c)).isInfinity() && s.eqXToP(a) : !(s = this.g.mulAdd(f, i.getPublic(), c)).isInfinity() && 0 === s.getX().umod(this.n).cmp(a)
        }, u.prototype.recoverPubKey = function(t, e, i, n) {
            o((3 & i) === i, "The recovery param is more than two bits"), e = new d(e, n);
            var a = this.n,
                s = new r(t),
                u = e.r,
                f = e.s,
                c = 1 & i,
                l = i >> 1;
            if (u.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l) throw new Error("Unable to find sencond key candinate");
            u = l ? this.curve.pointFromX(u.add(this.curve.n), c) : this.curve.pointFromX(u, c);
            var h = e.r.invm(a),
                p = a.sub(s).mul(h).umod(a),
                _ = f.mul(h).umod(a);
            return this.g.mulAdd(p, u, _)
        }, u.prototype.getKeyRecoveryParam = function(t, e, i, r) {
            if (null !== (e = new d(e, r)).recoveryParam) return e.recoveryParam;
            for (var n = 0; n < 4; n++) {
                var a;
                try {
                    a = this.recoverPubKey(t, e, n)
                } catch (t) {
                    continue
                }
                if (a.eq(i)) return n
            }
            throw new Error("Unable to find valid recovery factor")
        }
    },
    usKN: function(t, e, i) {
        var r = {
                ECB: i("AUX7"),
                CBC: i("wRn4"),
                CFB: i("NQVK"),
                CFB8: i("YskG"),
                CFB1: i("Ujlg"),
                OFB: i("UWVS"),
                CTR: i("at63"),
                GCM: i("at63")
            },
            n = i("6F8h");
        for (var a in n) n[a].module = r[n[a].mode];
        t.exports = n
    },
    uzSA: function(t, e, i) {
        "use strict";
        var r = i("OZ/i"),
            n = i("MzeL").utils.assert;

        function a(t, e) {
            this.ec = t, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this._importPublic(e.pub, e.pubEnc)
        }
        t.exports = a, a.fromPublic = function(t, e, i) {
            return e instanceof a ? e : new a(t, {
                pub: e,
                pubEnc: i
            })
        }, a.fromPrivate = function(t, e, i) {
            return e instanceof a ? e : new a(t, {
                priv: e,
                privEnc: i
            })
        }, a.prototype.validate = function() {
            var t = this.getPublic();
            return t.isInfinity() ? {
                result: !1,
                reason: "Invalid public key"
            } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
                result: !0,
                reason: null
            } : {
                result: !1,
                reason: "Public key * N != O"
            } : {
                result: !1,
                reason: "Public key is not a point"
            }
        }, a.prototype.getPublic = function(t, e) {
            return "string" == typeof t && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), e ? this.pub.encode(e, t) : this.pub
        }, a.prototype.getPrivate = function(t) {
            return "hex" === t ? this.priv.toString(16, 2) : this.priv
        }, a.prototype._importPrivate = function(t, e) {
            this.priv = new r(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n)
        }, a.prototype._importPublic = function(t, e) {
            if (t.x || t.y) return "mont" === this.ec.curve.type ? n(t.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || n(t.x && t.y, "Need both x and y coordinate"), void(this.pub = this.ec.curve.point(t.x, t.y));
            this.pub = this.ec.curve.decodePoint(t, e)
        }, a.prototype.derive = function(t) {
            return t.mul(this.priv).getX()
        }, a.prototype.sign = function(t, e, i) {
            return this.ec.sign(t, this, e, i)
        }, a.prototype.verify = function(t, e) {
            return this.ec.verify(t, e, this)
        }, a.prototype.inspect = function() {
            return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
        }
    },
    vZ2G: function(t, e) {
        t.exports = function(t) {
            for (var e, i = t.length; i--;) {
                if (255 !== (e = t.readUInt8(i))) {
                    e++, t.writeUInt8(e, i);
                    break
                }
                t.writeUInt8(0, i)
            }
        }
    },
    w8CP: function(t, e, i) {
        "use strict";
        var r = i("2j6C"),
            n = i("P7XM");

        function a(t) {
            return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
        }

        function o(t) {
            return 1 === t.length ? "0" + t : t
        }

        function s(t) {
            return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
        }
        e.inherits = n, e.toArray = function(t, e) {
            if (Array.isArray(t)) return t.slice();
            if (!t) return [];
            var i = [];
            if ("string" == typeof t)
                if (e) {
                    if ("hex" === e)
                        for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), r = 0; r < t.length; r += 2) i.push(parseInt(t[r] + t[r + 1], 16))
                } else
                    for (var r = 0; r < t.length; r++) {
                        var n = t.charCodeAt(r),
                            a = n >> 8,
                            o = 255 & n;
                        a ? i.push(a, o) : i.push(o)
                    } else
                        for (r = 0; r < t.length; r++) i[r] = 0 | t[r];
            return i
        }, e.toHex = function(t) {
            for (var e = "", i = 0; i < t.length; i++) e += o(t[i].toString(16));
            return e
        }, e.htonl = a, e.toHex32 = function(t, e) {
            for (var i = "", r = 0; r < t.length; r++) {
                var n = t[r];
                "little" === e && (n = a(n)), i += s(n.toString(16))
            }
            return i
        }, e.zero2 = o, e.zero8 = s, e.join32 = function(t, e, i, n) {
            var a = i - e;
            r(a % 4 == 0);
            for (var o = new Array(a / 4), s = 0, d = e; s < o.length; s++, d += 4) {
                var u;
                u = "big" === n ? t[d] << 24 | t[d + 1] << 16 | t[d + 2] << 8 | t[d + 3] : t[d + 3] << 24 | t[d + 2] << 16 | t[d + 1] << 8 | t[d], o[s] = u >>> 0
            }
            return o
        }, e.split32 = function(t, e) {
            for (var i = new Array(4 * t.length), r = 0, n = 0; r < t.length; r++, n += 4) {
                var a = t[r];
                "big" === e ? (i[n] = a >>> 24, i[n + 1] = a >>> 16 & 255, i[n + 2] = a >>> 8 & 255, i[n + 3] = 255 & a) : (i[n + 3] = a >>> 24, i[n + 2] = a >>> 16 & 255, i[n + 1] = a >>> 8 & 255, i[n] = 255 & a)
            }
            return i
        }, e.rotr32 = function(t, e) {
            return t >>> e | t << 32 - e
        }, e.rotl32 = function(t, e) {
            return t << e | t >>> 32 - e
        }, e.sum32 = function(t, e) {
            return t + e >>> 0
        }, e.sum32_3 = function(t, e, i) {
            return t + e + i >>> 0
        }, e.sum32_4 = function(t, e, i, r) {
            return t + e + i + r >>> 0
        }, e.sum32_5 = function(t, e, i, r, n) {
            return t + e + i + r + n >>> 0
        }, e.sum64 = function(t, e, i, r) {
            var n = t[e],
                a = r + t[e + 1] >>> 0,
                o = (a < r ? 1 : 0) + i + n;
            t[e] = o >>> 0, t[e + 1] = a
        }, e.sum64_hi = function(t, e, i, r) {
            return (e + r >>> 0 < e ? 1 : 0) + t + i >>> 0
        }, e.sum64_lo = function(t, e, i, r) {
            return e + r >>> 0
        }, e.sum64_4_hi = function(t, e, i, r, n, a, o, s) {
            var d = 0,
                u = e;
            return d += (u = u + r >>> 0) < e ? 1 : 0, d += (u = u + a >>> 0) < a ? 1 : 0, t + i + n + o + (d += (u = u + s >>> 0) < s ? 1 : 0) >>> 0
        }, e.sum64_4_lo = function(t, e, i, r, n, a, o, s) {
            return e + r + a + s >>> 0
        }, e.sum64_5_hi = function(t, e, i, r, n, a, o, s, d, u) {
            var f = 0,
                c = e;
            return f += (c = c + r >>> 0) < e ? 1 : 0, f += (c = c + a >>> 0) < a ? 1 : 0, f += (c = c + s >>> 0) < s ? 1 : 0, t + i + n + o + d + (f += (c = c + u >>> 0) < u ? 1 : 0) >>> 0
        }, e.sum64_5_lo = function(t, e, i, r, n, a, o, s, d, u) {
            return e + r + a + s + u >>> 0
        }, e.rotr64_hi = function(t, e, i) {
            return (e << 32 - i | t >>> i) >>> 0
        }, e.rotr64_lo = function(t, e, i) {
            return (t << 32 - i | e >>> i) >>> 0
        }, e.shr64_hi = function(t, e, i) {
            return t >>> i
        }, e.shr64_lo = function(t, e, i) {
            return (t << 32 - i | e >>> i) >>> 0
        }
    },
    wRn4: function(t, e, i) {
        var r = i("jIre");
        e.encrypt = function(t, e) {
            var i = r(e, t._prev);
            return t._prev = t._cipher.encryptBlock(i), t._prev
        }, e.decrypt = function(t, e) {
            var i = t._prev;
            t._prev = e;
            var n = t._cipher.decryptBlock(e);
            return r(n, i)
        }
    },
    wk3p: function(t) {
        t.exports = {
            modp1: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
            },
            modp2: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
            },
            modp5: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
            },
            modp14: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
            },
            modp15: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
            },
            modp16: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
            },
            modp17: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
            },
            modp18: {
                gen: "02",
                prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
            }
        }
    },
    wq4j: function(t, e, i) {
        t.exports = i("43KI").PassThrough
    },
    z71Z: function(t, e, i) {
        var r = i("P7XM"),
            n = i("f3pb"),
            a = n.base,
            o = n.bignum,
            s = n.constants.der;

        function d(t) {
            this.enc = "der", this.name = t.name, this.entity = t, this.tree = new u, this.tree._init(t.body)
        }

        function u(t) {
            a.Node.call(this, "der", t)
        }

        function f(t, e) {
            var i = t.readUInt8(e);
            if (t.isError(i)) return i;
            var r = s.tagClass[i >> 6],
                n = 0 == (32 & i);
            if (31 == (31 & i)) {
                var a = i;
                for (i = 0; 128 == (128 & a);) {
                    if (a = t.readUInt8(e), t.isError(a)) return a;
                    i <<= 7, i |= 127 & a
                }
            } else i &= 31;
            return {
                cls: r,
                primitive: n,
                tag: i,
                tagStr: s.tag[i]
            }
        }

        function c(t, e, i) {
            var r = t.readUInt8(i);
            if (t.isError(r)) return r;
            if (!e && 128 === r) return null;
            if (0 == (128 & r)) return r;
            var n = 127 & r;
            if (n > 4) return t.error("length octect is too long");
            r = 0;
            for (var a = 0; a < n; a++) {
                r <<= 8;
                var o = t.readUInt8(i);
                if (t.isError(o)) return o;
                r |= o
            }
            return r
        }
        t.exports = d, d.prototype.decode = function(t, e) {
            return t instanceof a.DecoderBuffer || (t = new a.DecoderBuffer(t, e)), this.tree._decode(t, e)
        }, r(u, a.Node), u.prototype._peekTag = function(t, e, i) {
            if (t.isEmpty()) return !1;
            var r = t.save(),
                n = f(t, 'Failed to peek tag: "' + e + '"');
            return t.isError(n) ? n : (t.restore(r), n.tag === e || n.tagStr === e || n.tagStr + "of" === e || i)
        }, u.prototype._decodeTag = function(t, e, i) {
            var r = f(t, 'Failed to decode tag of "' + e + '"');
            if (t.isError(r)) return r;
            var n = c(t, r.primitive, 'Failed to get length of "' + e + '"');
            if (t.isError(n)) return n;
            if (!i && r.tag !== e && r.tagStr !== e && r.tagStr + "of" !== e) return t.error('Failed to match tag: "' + e + '"');
            if (r.primitive || null !== n) return t.skip(n, 'Failed to match body of: "' + e + '"');
            var a = t.save(),
                o = this._skipUntilEnd(t, 'Failed to skip indefinite length body: "' + this.tag + '"');
            return t.isError(o) ? o : (n = t.offset - a.offset, t.restore(a), t.skip(n, 'Failed to match body of: "' + e + '"'))
        }, u.prototype._skipUntilEnd = function(t, e) {
            for (;;) {
                var i = f(t, e);
                if (t.isError(i)) return i;
                var r, n = c(t, i.primitive, e);
                if (t.isError(n)) return n;
                if (r = i.primitive || null !== n ? t.skip(n) : this._skipUntilEnd(t, e), t.isError(r)) return r;
                if ("end" === i.tagStr) break
            }
        }, u.prototype._decodeList = function(t, e, i, r) {
            for (var n = []; !t.isEmpty();) {
                var a = this._peekTag(t, "end");
                if (t.isError(a)) return a;
                var o = i.decode(t, "der", r);
                if (t.isError(o) && a) break;
                n.push(o)
            }
            return n
        }, u.prototype._decodeStr = function(t, e) {
            if ("bitstr" === e) {
                var i = t.readUInt8();
                return t.isError(i) ? i : {
                    unused: i,
                    data: t.raw()
                }
            }
            if ("bmpstr" === e) {
                var r = t.raw();
                if (r.length % 2 == 1) return t.error("Decoding of string type: bmpstr length mismatch");
                for (var n = "", a = 0; a < r.length / 2; a++) n += String.fromCharCode(r.readUInt16BE(2 * a));
                return n
            }
            if ("numstr" === e) {
                var o = t.raw().toString("ascii");
                return this._isNumstr(o) ? o : t.error("Decoding of string type: numstr unsupported characters")
            }
            if ("octstr" === e) return t.raw();
            if ("objDesc" === e) return t.raw();
            if ("printstr" === e) {
                var s = t.raw().toString("ascii");
                return this._isPrintstr(s) ? s : t.error("Decoding of string type: printstr unsupported characters")
            }
            return /str$/.test(e) ? t.raw().toString() : t.error("Decoding of string type: " + e + " unsupported")
        }, u.prototype._decodeObjid = function(t, e, i) {
            for (var r, n = [], a = 0; !t.isEmpty();) {
                var o = t.readUInt8();
                a <<= 7, a |= 127 & o, 0 == (128 & o) && (n.push(a), a = 0)
            }
            128 & o && n.push(a);
            var s = n[0] / 40 | 0,
                d = n[0] % 40;
            if (r = i ? n : [s, d].concat(n.slice(1)), e) {
                var u = e[r.join(" ")];
                void 0 === u && (u = e[r.join(".")]), void 0 !== u && (r = u)
            }
            return r
        }, u.prototype._decodeTime = function(t, e) {
            var i = t.raw().toString();
            if ("gentime" === e) var r = 0 | i.slice(0, 4),
                n = 0 | i.slice(4, 6),
                a = 0 | i.slice(6, 8),
                o = 0 | i.slice(8, 10),
                s = 0 | i.slice(10, 12),
                d = 0 | i.slice(12, 14);
            else {
                if ("utctime" !== e) return t.error("Decoding " + e + " time is not supported yet");
                r = 0 | i.slice(0, 2), n = 0 | i.slice(2, 4), a = 0 | i.slice(4, 6), o = 0 | i.slice(6, 8), s = 0 | i.slice(8, 10), d = 0 | i.slice(10, 12);
                r = r < 70 ? 2e3 + r : 1900 + r
            }
            return Date.UTC(r, n - 1, a, o, s, d, 0)
        }, u.prototype._decodeNull = function(t) {
            return null
        }, u.prototype._decodeBool = function(t) {
            var e = t.readUInt8();
            return t.isError(e) ? e : 0 !== e
        }, u.prototype._decodeInt = function(t, e) {
            var i = t.raw(),
                r = new o(i);
            return e && (r = e[r.toString(10)] || r), r
        }, u.prototype._use = function(t, e) {
            return "function" == typeof t && (t = t(e)), t._getDecoder("der").tree
        }
    },
    zZGF: function(t) {
        t.exports = {
            "1.3.132.0.10": "secp256k1",
            "1.3.132.0.33": "p224",
            "1.2.840.10045.3.1.1": "p192",
            "1.2.840.10045.3.1.7": "p256",
            "1.3.132.0.34": "p384",
            "1.3.132.0.35": "p521"
        }
    }
});